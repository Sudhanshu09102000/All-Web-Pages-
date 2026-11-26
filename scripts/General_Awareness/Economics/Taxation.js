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

/* Field: General_Awareness · Subject: Economics · Chapter: Taxation · 21 concept pages (+ overview) · 55 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Economics/Taxation/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "TAXATION",
      line2: "DIRECT + INDIRECT",
      line3: "GST COUNCIL",
      badge: "FULL CLASS",
      ribbon: "TABLES • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Taxation Complete Chapter | Direct Tax, Indirect Tax, GST | Economics for SSC CGL",
      altTitles: ["Direct vs Indirect Tax and GST Council in One Class", "MAT, AMT, Professional Tax and GST Slabs Made Easy"],
      description: "Taxation is one of the most scoring chapters in Economics. In this class you learn who can impose taxes, how direct and indirect taxes differ, and how Goods and Services Tax works, step by step and in simple words.\n\n📌 IN THIS CLASS\n✅ Monetary policy and fiscal policy\n✅ Direct taxes: Income Tax, Corporate Tax, Capital Gain Tax, STT, MAT, AMT, Professional Tax\n✅ Abolished taxes and their years\n✅ GST types, merged taxes, GST Council and slabs\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Taxation\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Taxation #GST",
      tags: ["taxation", "taxation for ssc cgl", "direct tax", "indirect tax", "direct and indirect tax", "gst", "gst council", "gst slabs", "gst types", "cgst sgst igst", "gstn", "income tax", "corporate tax", "capital gain tax", "securities transaction tax", "stt", "mat", "minimum alternative tax", "amt", "alternate minimum tax", "professional tax", "cbdt", "cbic", "fiscal policy", "monetary policy", "abolished taxes", "economics for ssc", "ssc cgl economics", "general awareness", "economy gk", "taxes in india", "gst explained", "tax gk tricks", "Taxation Economics tricks"],
      hashtags: ["SSCCGL", "Taxation", "GST"],
      thumbText: "TAXATION COMPLETE CHAPTER",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📊 New class is live: Taxation, from Direct Tax to GST Council. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Economic policies\n00:00 Tax imposing authority\n00:00 Direct and indirect tax\n00:00 Types of direct tax\n00:00 GST\n00:00 GST Council and slabs",
      playlist: "Economics — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on Taxation</u>: who can impose taxes, the types of direct and indirect taxes, and Goods and Services Tax. Taxation is a favourite topic of the Staff Selection Commission, so we will learn every fact slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>21</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>55</b><span>Questions</span></div>
        <div class="cp-stat"><b>~97 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>What Are Economic Policies?</b><br>The two big policies of a government, monetary policy and fiscal policy, and why taxation belongs to fiscal policy.</li>
        <li><b>Tax Imposing Authority and Local Bodies</b><br>Who is allowed to impose taxes in India, the three levels of government, and the rural and urban local bodies.</li>
        <li><b>Types of Tax and Department of Revenue</b><br>The difference between direct and indirect tax, and the two boards that run them.</li>
        <li><b>Types of Direct Tax</b><br>Income Tax, Corporate Tax, Capital Gain Tax, Securities Transaction Tax, Minimum Alternative Tax, Professional Tax and Alternate Minimum Tax, plus the direct taxes that no longer exist.</li>
        <li><b>Types of Indirect Tax and Goods and Services Tax</b><br>How Goods and Services Tax works, its network, its three types, the taxes merged into it and the items kept outside it.</li>
        <li><b>GST Council and Tax Slabs</b><br>Who sits in the Goods and Services Tax Council, how voting works, and the four tax rates.</li>
        <li><b>Practice</b><br>Exam style questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on Professional Tax, Minimum Alternative Tax, the GST Council voting rule and the tax slabs come again and again in General Awareness papers, so every table in this class is worth remembering.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#0ea5e9", pauseTimer: true,
    title: "What Are Economic Policies?",
    html: `
      <p class="cp-lead">Economic policies are the plans that a government uses to manage the economy of the country. <u>There are two broad types: monetary policy and fiscal policy.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/1.png" alt="Two side-by-side columns: left column titled MONETARY POLICY with a bank building icon, ri" data-caption="Monetary policy and fiscal policy shown as two separate columns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/2.png" alt="Reserve Bank of India headquarters Mumbai building photo" data-caption="The Reserve Bank of India building, the maker of monetary policy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Monetary policy</th><th>Fiscal policy</th></tr></thead><tbody><tr><td>Formed by</td><td>Reserve Bank of India</td><td>Government of India and State Governments</td></tr><tr><td>Main components</td><td>Banking sector</td><td>Taxation and budget</td></tr></tbody></table>
      <p class="cp-lead">Monetary policy is about money and banks, for example how much money flows in the economy and what the interest rate is. Fiscal policy is about how the government earns money through taxes and how it spends that money through the budget.</p>
      <div class="cp-example"><b>Example:</b> When the Reserve Bank of India changes the interest rate on loans, that is monetary policy. When the Government of India changes the tax on a product, that is fiscal policy.</div>
      <div class="cp-note trap">Taxation is a part of fiscal policy, not monetary policy. Many students get this wrong because both policies sound similar.</div>
      <div class="cp-note exam">A question may ask which body forms each policy: the Reserve Bank of India forms monetary policy and the governments form fiscal policy.</div>
      <div class="cp-mnemonic">Monetary means Money and banks, so the Reserve Bank. Fiscal means Finance and tax, so the Government.</div>
    `
  },
  3: {
    questext: "Taxation is a part of which of the following policies?",
    options: ["Monetary policy", "Fiscal policy", "Trade policy", "Industrial policy"],
    correct: "2",
    exptext: "✅ Taxation is a part of fiscal policy, because fiscal policy deals with how the government earns and spends money. 📌 Fiscal means finance and tax. ❌ Monetary policy is wrong because it deals with banks and the money supply."
  },
  4: {
    questext: "Consider the following statements about economic policies:\n1. Monetary policy is formed by the Reserve Bank of India.\n2. Taxation and the budget are the components of monetary policy.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because the Reserve Bank of India forms monetary policy. 📌 Taxation and the budget belong to fiscal policy. ❌ Statement 2 is wrong because the components of monetary policy are linked to the banking sector."
  },
  5: {
    questext: "Which of the following pairs of policy and component is correctly matched?",
    options: ["Monetary policy and taxation", "Fiscal policy and banking sector", "Monetary policy and banking sector", "Fiscal policy and Reserve Bank of India"],
    correct: "3",
    exptext: "✅ Monetary policy has the banking sector as its component. 📌 Money and banks go together. ❌ Fiscal policy and banking sector is a tempting pair, but fiscal policy has taxation and budget as its components."
  },
  6: {
    type: "concept", icon: "🏢", accent: "#22c55e", pauseTimer: true,
    title: "Tax Imposing Authority",
    html: `
      <p class="cp-lead">A tax is a compulsory payment made to the government. <u>Only public authorities, that is, government bodies, can impose taxes.</u> No private person or company has this power.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/3.png" alt="Three-level pyramid: top box Government of India, middle box State Government, bottom box " data-caption="A pyramid of the three levels of government that impose taxes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/4.png" alt="Parliament House New Delhi photo" data-caption="The Parliament House in New Delhi, where central tax laws are made." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">In India, taxes are imposed at three levels. The Government of India taxes at the national level, the State Government taxes at the state level, and the local bodies tax at the city and village level.</p>
      <table><thead><tr><th>Level</th><th>Authority</th></tr></thead><tbody><tr><td>Centre</td><td>Government of India</td></tr><tr><td>State</td><td>State Government</td></tr><tr><td>Local</td><td>Municipal bodies and Panchayat bodies</td></tr></tbody></table>
      <div class="cp-note trap">A private company or a trader may collect tax for the government, but it cannot impose a tax on its own.</div>
      <div class="cp-note exam">The three-tier structure is a common question: Government of India, State Government and Local Bodies.</div>
    `
  },
  7: {
    questext: "Which of the following can impose taxes in India?",
    options: ["Any large private company", "Only public or government authorities", "Any non-government organisation", "Any registered trader"],
    correct: "2",
    exptext: "✅ Only public or government authorities can impose taxes. 📌 Tax power belongs only to the government. ❌ A private company is wrong because it can collect tax for the government but cannot impose it."
  },
  8: {
    questext: "Which of the following is NOT a part of the three-tier structure of tax imposing authorities in India?",
    options: ["Government of India", "State Government", "Local bodies", "Reserve Bank of India"],
    correct: "4",
    exptext: "✅ The three tiers are the Government of India, the State Government and the local bodies. 📌 The Reserve Bank of India handles money and banking, not taxes. ❌ Local bodies is wrong because municipal and Panchayat bodies do impose taxes."
  },
  9: {
    questext: "Consider the following statements about tax imposing authorities:\n1. Only public or government authorities can impose taxes.\n2. Local bodies such as municipal and Panchayat bodies are also tax imposing authorities.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Taxes are imposed only by public authorities, and local bodies are the third tier of such authorities. 📌 Think of three tiers: Centre, State and Local. ❌ Choosing only one statement forgets the local level."
  },
  10: {
    type: "concept", icon: "🏘️", accent: "#f59e0b", pauseTimer: true,
    title: "Local Bodies — Rural and Urban",
    html: `
      <p class="cp-lead">Local bodies are the governments closest to the people. <u>Rural areas have Panchayati Raj Institutions, and urban areas have Urban Local Bodies.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/5.png" alt="Two-column chart: left column RURAL with Gram Panchayat, Block Panchayat, Zila Panchayat s" data-caption="Rural and urban local bodies shown side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/6.png" alt="Gram Panchayat office village India photo" data-caption="A Gram Panchayat office in an Indian village." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/7.png" alt="Municipal Corporation building Nagar Nigam India photo" data-caption="A Nagar Nigam building that serves a large city." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Rural: Panchayati Raj Institutions</th><th>Urban: Urban Local Bodies</th></tr></thead><tbody><tr><td>Gram Panchayat</td><td>Nagar Panchayat</td></tr><tr><td>Block Panchayat</td><td>Nagar Palika</td></tr><tr><td>Zila Panchayat</td><td>Nagar Nigam</td></tr></tbody></table>
      <p class="cp-lead">A Gram Panchayat works at the village level, a Block Panchayat at the block level, and a Zila Panchayat at the district level. In the same way, a Nagar Panchayat serves a small town, a Nagar Palika serves a medium town, and a Nagar Nigam serves a big city.</p>
      <div class="cp-note tip">The word Panchayat is used for rural bodies, while Nagar means city, so the Nagar bodies are urban.</div>
    `
  },
  11: {
    questext: "Which of the following is an Urban Local Body?",
    options: ["Gram Panchayat", "Block Panchayat", "Zila Panchayat", "Nagar Nigam"],
    correct: "4",
    exptext: "✅ Nagar Nigam is an urban local body that serves a big city. 📌 Nagar means city. ❌ Gram, Block and Zila Panchayats are wrong because they are the three rural bodies."
  },
  12: {
    questext: "Which of the following is the odd one out?",
    options: ["Gram Panchayat", "Nagar Palika", "Block Panchayat", "Zila Panchayat"],
    correct: "2",
    exptext: "✅ Nagar Palika is an urban local body, while the other three are rural Panchayati Raj Institutions. 📌 Panchayat means rural and Nagar means urban. ❌ Block Panchayat is wrong because it is a rural body."
  },
  13: {
    type: "concept", icon: "⚖️", accent: "#ef4444", pauseTimer: true,
    title: "Types of Tax",
    html: `
      <p class="cp-lead">Taxes in India are divided into two types, direct tax and indirect tax. <u>The difference is about who finally bears the burden of the tax.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/8.png" alt="Two flow diagrams: top flow Taxpayer pays Government directly, label Burden on taxpayer; b" data-caption="Direct tax goes straight to the government; indirect tax passes through a seller." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/9.png" alt="Goods and Services Tax invoice shop bill photo" data-caption="A shop bill in which the tax is added to the price." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Direct tax</th><th>Indirect tax</th></tr></thead><tbody><tr><td>Who pays the government</td><td>Taxpayer pays directly</td><td>Taxpayer pays, but the consumer bears the burden</td></tr><tr><td>Burden of tax</td><td>Falls on the taxpayer himself</td><td>Falls on a different entity, the consumer</td></tr><tr><td>Administered by</td><td>Ministry of Finance through the Central Board of Direct Taxes</td><td>Ministry of Finance through the Central Board of Indirect Taxes and Customs</td></tr><tr><td>Examples</td><td>Income Tax, Corporate Tax, Capital Gain Tax, Securities Transaction Tax, Minimum Alternative Tax, Professional Tax, Alternate Minimum Tax</td><td>Goods and Services Tax, Customs Duty on export and import</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> You pay Income Tax from your own salary, so you bear the burden yourself. When you buy soap, the shop adds tax to the price and gives it to the government, but you are the one who finally pays it.</div>
      <div class="cp-note trap">In an indirect tax the seller deposits the tax, but the burden is shifted to the buyer. This shifting of burden is what makes a tax indirect.</div>
    `
  },
  14: {
    questext: "In which type of tax does the burden fall on the final buyer of goods?",
    options: ["Direct tax", "Indirect tax", "Income Tax", "Capital Gain Tax"],
    correct: "2",
    exptext: "✅ In an indirect tax the burden falls on the consumer, the final buyer. 📌 Indirect means the burden is passed on. ❌ Direct tax is wrong because the taxpayer himself bears the burden."
  },
  15: {
    questext: "Which of the following is an indirect tax?",
    options: ["Corporate Tax", "Securities Transaction Tax", "Minimum Alternative Tax", "Customs Duty"],
    correct: "4",
    exptext: "✅ Customs Duty on export and import is an indirect tax. 📌 Goods crossing a border carry customs duty, and the buyer finally pays it. ❌ Corporate Tax, Securities Transaction Tax and Minimum Alternative Tax are direct taxes."
  },
  16: {
    questext: "Consider the following statements about direct and indirect taxes:\n1. In a direct tax, the burden falls on the taxpayer himself.\n2. Goods and Services Tax is a direct tax.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 In direct tax, payer and bearer are the same person. ❌ Statement 2 is wrong because Goods and Services Tax is an indirect tax, as its burden falls on the consumer."
  },
  17: {
    type: "concept", icon: "📂", accent: "#8b5cf6", pauseTimer: true,
    title: "Department of Revenue",
    html: `
      <p class="cp-lead">The Department of Revenue, a part of the Ministry of Finance, looks after taxes through two boards. <u>One board handles direct taxes and the other handles indirect taxes.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/10.png" alt="Organisation chart: top box Ministry of Finance, below it Department of Revenue, below it " data-caption="The two tax boards under the Department of Revenue." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/11.png" alt="North Block New Delhi Ministry of Finance building photo" data-caption="North Block in New Delhi, home of the Ministry of Finance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>CBDT</th><th>CBIC</th></tr></thead><tbody><tr><td>Full name</td><td>Central Board of Direct Taxes</td><td>Central Board of Indirect Taxes and Customs</td></tr><tr><td>Responsible for</td><td>All direct tax affairs in India</td><td>All indirect tax affairs in India</td></tr><tr><td>Taxes covered</td><td>Income Tax, Corporate Tax, Capital Gain Tax, Professional Tax, Securities Transaction Tax, Minimum Alternative Tax, Alternate Minimum Tax</td><td>Goods and Services Tax, Customs Duty and all merged indirect taxes</td></tr></tbody></table>
      <p class="cp-lead">The first letter tells the story. D in the first board means Direct and I in the second board means Indirect.</p>
      <div class="cp-note remember">The Central Board of Indirect Taxes and Customs was earlier named the Central Board of Excise and Customs (CBEC).</div>
      <div class="cp-note exam">A common question asks which board administers a given tax. Match direct taxes with the first board and indirect taxes with the second.</div>
    `
  },
  18: {
    questext: "Which body is responsible for all direct tax affairs in India?",
    options: ["Central Board of Direct Taxes", "Central Board of Indirect Taxes and Customs", "Goods and Services Tax Council", "Reserve Bank of India"],
    correct: "1",
    exptext: "✅ The Central Board of Direct Taxes looks after all direct tax affairs. 📌 D in the board name stands for Direct. ❌ The Central Board of Indirect Taxes and Customs is wrong because it handles indirect taxes only."
  },
  19: {
    questext: "The Central Board of Indirect Taxes and Customs was earlier known as which of the following?",
    options: ["Central Board of Revenue", "Central Board of Trade and Tax", "Central Board of Customs and Income", "Central Board of Excise and Customs"],
    correct: "4",
    exptext: "✅ The earlier name was the Central Board of Excise and Customs, short form CBEC. 📌 Excise changed into the wider word Indirect Taxes. ❌ The other names are made-up combinations that never existed."
  },
  20: {
    questext: "Both the Central Board of Direct Taxes and the Central Board of Indirect Taxes and Customs work under which department of the Ministry of Finance?",
    options: ["Department of Economic Affairs", "Department of Expenditure", "Department of Revenue", "Department of Financial Services"],
    correct: "3",
    exptext: "✅ Both boards work under the Department of Revenue. 📌 Revenue means the money earned from taxes. ❌ The Department of Economic Affairs is wrong because it deals with economic policy, not tax collection."
  },
  21: {
    type: "concept", icon: "💼", accent: "#14b8a6", pauseTimer: true,
    title: "Income Tax",
    html: `
      <p class="cp-lead">Income Tax is a tax levied on the personal annual income of an individual. <u>It is the best known direct tax.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/12.png" alt="Salary slip diagram: a box Salary, a small slice cut out labelled TDS taken at payment, re" data-caption="Tax is cut from salary at payment and a return is filed yearly." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/13.png" alt="Income Tax Department building India photo" data-caption="An Income Tax Department office building in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Term</th><th>Full form</th><th>Meaning</th></tr></thead><tbody><tr><td>TDS</td><td>Tax Deduction at Source</td><td>Tax cut from income at the point of payment, such as salary or interest</td></tr><tr><td>ITR</td><td>Income Tax Return</td><td>The yearly statement of income that a taxpayer files with the government</td></tr></tbody></table>
      <p class="cp-lead">In Tax Deduction at Source, the person who pays you, such as your employer or your bank, cuts the tax first and deposits it with the government. You receive only the remaining amount.</p>
      <div class="cp-example"><b>Example:</b> If a bank pays interest on a fixed deposit, it may keep a small part as tax and give you the rest. That cut part is Tax Deduction at Source.</div>
      <div class="cp-note trap">Tax Deduction at Source and Income Tax Return are not the same. The first is a cut made at payment, and the second is a statement that you file once a year.</div>
    `
  },
  22: {
    questext: "Tax Deduction at Source is the tax that is deducted from income at which point?",
    options: ["At the point of payment, such as salary or interest", "Only at the end of ten years", "At the time of buying goods", "After the Income Tax Return is rejected"],
    correct: "1",
    exptext: "✅ Tax Deduction at Source is cut at the point of payment, such as salary or interest. 📌 The payer cuts it before you get the money. ❌ Buying goods is wrong because tax at the time of purchase belongs to indirect tax."
  },
  23: {
    questext: "What is an Income Tax Return?",
    options: ["A refund paid by a bank", "A tax paid on goods", "A yearly statement of income filed with the government", "A tax on company profit"],
    correct: "3",
    exptext: "✅ An Income Tax Return is the annual statement of income that a taxpayer files with the government. 📌 Return here means report, not refund. ❌ A refund is wrong because the word return is about reporting income."
  },
  24: {
    type: "concept", icon: "🏭", accent: "#ec4899", pauseTimer: true,
    title: "Corporate Tax",
    html: `
      <p class="cp-lead">Corporate Tax is a tax levied on the annual profit of a company. <u>It is charged on profit and not on turnover.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/14.png" alt="Step diagram: Turnover 100 minus Input and Operational Cost 70 equals Gross Profit 30; Gro" data-caption="From turnover to net profit in two simple steps." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/15.png" alt="Corporate office towers business district India photo" data-caption="Companies in a business district pay Corporate Tax on profit." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Step</th><th>Calculation</th><th>Result</th></tr></thead><tbody><tr><td>First</td><td>Turnover minus input or operational cost</td><td>Gross profit</td></tr><tr><td>Second</td><td>Gross profit minus Corporate Tax</td><td>Net profit</td></tr></tbody></table>
      <p class="cp-lead">Turnover means the total sales of a company. A company first removes its running costs from turnover to find the gross profit, and then pays Corporate Tax on the profit.</p>
      <div class="cp-example"><b>Example:</b> A company sells goods worth 100 crore rupees and spends 70 crore rupees on costs. Its gross profit is 30 crore rupees, and the tax is charged on this profit and not on the 100 crore rupees.</div>
      <div class="cp-note trap">Corporate Tax is not charged on turnover. A company with large sales but no profit does not pay Corporate Tax in this way.</div>
    `
  },
  25: {
    questext: "Corporate Tax is levied on which of the following?",
    options: ["The turnover of a company", "The annual profit of a company", "The number of employees of a company", "The shares held by a company"],
    correct: "2",
    exptext: "✅ Corporate Tax is levied on the annual profit of a company. 📌 Tax follows profit, not sales. ❌ Turnover is wrong because turnover is total sales before costs are removed."
  },
  26: {
    questext: "Which of the following correctly shows the path to net profit?",
    options: ["Turnover minus tax gives gross profit", "Gross profit plus Corporate Tax gives net profit", "Turnover minus cost gives gross profit, then gross profit minus Corporate Tax gives net profit", "Turnover minus Corporate Tax gives net profit"],
    correct: "3",
    exptext: "✅ Turnover minus input or operational cost gives gross profit, and gross profit minus Corporate Tax gives net profit. 📌 Cost first, tax second. ❌ Removing tax from turnover is wrong because tax is paid only on profit."
  },
  27: {
    type: "concept", icon: "📈", accent: "#f97316", pauseTimer: true,
    title: "Capital Gain Tax",
    html: `
      <p class="cp-lead">Capital Gain Tax is a tax on the return earned from an investment. <u>It is the profit you make when you sell an asset for more than you paid.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/16.png" alt="Timeline bar from 0 to 2 years with a divider at 1 year; left part labelled SHORT TERM (1 " data-caption="The one-year line that separates short term from long term." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/17.png" alt="Bombay Stock Exchange building Dalal Street Mumbai photo" data-caption="The Bombay Stock Exchange building, where shares are traded." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Rule for shares and similar investments</th></tr></thead><tbody><tr><td>Long term Capital Gain Tax</td><td>Investment held for more than 1 year</td></tr><tr><td>Short term Capital Gain Tax</td><td>Investment held for 1 year or less</td></tr></tbody></table>
      <p class="cp-lead">The assets that give a capital gain include shares, bonds, bank fixed deposits, bank deposits and real estate. The time for which you held the asset decides whether the gain is short term or long term.</p>
      <div class="cp-example"><b>Example:</b> If you buy a share and sell it after 8 months at a profit, the profit is a short term capital gain. If you sell it after 2 years, the profit is a long term capital gain.</div>
      <div class="cp-note trap">Exactly 1 year counts as short term. Long term starts only when the holding is for more than 1 year.</div>
    `
  },
  28: {
    questext: "A share is sold at a profit after being held for 8 months. How is this gain classified?",
    options: ["Long term capital gain", "Short term capital gain", "Corporate gain", "Income from salary"],
    correct: "2",
    exptext: "✅ Eight months is less than 1 year, so it is a short term capital gain. 📌 One year or less means short term. ❌ Long term is wrong because that needs a holding of more than 1 year."
  },
  29: {
    questext: "Which of the following is NOT an example of an asset that gives a capital gain?",
    options: ["Shares", "Bonds", "Real estate", "Monthly salary"],
    correct: "4",
    exptext: "✅ A monthly salary is earned for work and is taxed as income, not as a capital gain. 📌 Capital gain comes from selling an asset. ❌ Shares, bonds and real estate are wrong because they are assets whose sale gives a gain."
  },
  30: {
    questext: "Consider the following statements about Capital Gain Tax:\n1. It is a tax on the profit earned by selling an asset.\n2. A gain on an investment held for 1 year or less is a long term capital gain.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Long term means more than one year. ❌ Statement 2 is wrong because a holding of 1 year or less gives a short term gain."
  },
  31: {
    type: "concept", icon: "🧾", accent: "#84cc16", pauseTimer: true,
    title: "STT — Securities Transaction Tax",
    html: `
      <p class="cp-lead">Securities Transaction Tax is a tax on the buying and selling of securities. <u>It applies to transactions linked to a DEMAT account.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/18.png" alt="Flow diagram: Investor, then DEMAT Account box, then Buy or Sell Shares and Bonds, with a " data-caption="Tax is charged on each share transaction made through a DEMAT account." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/19.png" alt="Share trading screen stock market photo" data-caption="A trading screen where share transactions take place." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Details</th></tr></thead><tbody><tr><td>Full form</td><td>Securities Transaction Tax</td></tr><tr><td>Kind of tax</td><td>Direct tax</td></tr><tr><td>Charged on</td><td>Transactions of securities linked to a DEMAT account</td></tr><tr><td>Examples of securities</td><td>Shares and bonds</td></tr></tbody></table>
      <p class="cp-lead">A DEMAT account holds your shares in electronic form. Each time you buy or sell shares through it, Securities Transaction Tax is charged on that transaction.</p>
      <div class="cp-note trap">Capital Gain Tax is charged on the profit, while Securities Transaction Tax is charged on the transaction itself, even if there is no profit.</div>
      <div class="cp-note tip">A DEMAT account is a dematerialised account, which keeps shares in electronic form instead of paper certificates.</div>
    `
  },
  32: {
    questext: "Securities Transaction Tax is charged on transactions related to which of the following?",
    options: ["A savings account", "A DEMAT account", "A loan account", "An insurance policy"],
    correct: "2",
    exptext: "✅ Securities Transaction Tax is charged on transactions related to a DEMAT account. 📌 Share trading goes through DEMAT. ❌ A savings account is wrong because ordinary bank deposits are not securities transactions."
  },
  33: {
    questext: "Which of the following is a direct tax?",
    options: ["Customs Duty", "Securities Transaction Tax", "Goods and Services Tax", "Octroi"],
    correct: "2",
    exptext: "✅ Securities Transaction Tax is a direct tax, administered by the Central Board of Direct Taxes. 📌 STT sits in the direct tax list with Income Tax and Corporate Tax. ❌ Customs Duty and Goods and Services Tax are wrong because they are indirect taxes."
  },
  34: {
    type: "concept", icon: "🏢", accent: "#06b6d4", pauseTimer: true,
    title: "MAT — Minimum Alternative Tax",
    html: `
      <p class="cp-lead">Minimum Alternative Tax is a tax imposed on companies that show zero profit to avoid paying taxes. <u>It makes sure every company pays at least some tax.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/20.png" alt="Two-step picture: a company showing Profit shown as 0 with a question mark, then an arrow " data-caption="A company showing zero profit still pays Minimum Alternative Tax." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/21.png" alt="Ministry of Corporate Affairs office India photo" data-caption="The Ministry of Corporate Affairs, which looks after companies." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Details</th></tr></thead><tbody><tr><td>Full form</td><td>Minimum Alternative Tax</td></tr><tr><td>Why it exists</td><td>To stop companies from showing zero profit and paying no tax</td></tr><tr><td>Applied on</td><td>Companies registered under the Companies Act</td></tr><tr><td>Kind of tax</td><td>Direct tax</td></tr></tbody></table>
      <p class="cp-lead">Some companies use many deductions to show no profit on paper, even though they earn well. Minimum Alternative Tax closes this gap by asking such companies to pay a minimum amount.</p>
      <div class="cp-note remember">MAT is for Companies, and AMT is for LLPs. The next two pages tell you why.</div>
    `
  },
  35: {
    questext: "Minimum Alternative Tax is applied on which of the following?",
    options: ["Individuals", "Companies registered under the Companies Act", "Limited Liability Partnerships", "Government employees"],
    correct: "2",
    exptext: "✅ Minimum Alternative Tax is applied on companies registered under the Companies Act. 📌 MAT means Minimum for Companies. ❌ Limited Liability Partnerships are wrong because they pay the Alternate Minimum Tax."
  },
  36: {
    questext: "Why was Minimum Alternative Tax introduced?",
    options: ["To tax companies that show zero profit and avoid taxes", "To tax goods crossing the border", "To tax the sale of shares", "To tax professions"],
    correct: "1",
    exptext: "✅ It is imposed on companies that show zero profit to avoid paying taxes. 📌 Minimum means at least something must be paid. ❌ Taxing shares is wrong because that is done by the Securities Transaction Tax."
  },
  37: {
    type: "concept", icon: "👩‍⚕️", accent: "#a855f7", pauseTimer: true,
    title: "Professional Tax",
    html: `
      <p class="cp-lead">Professional Tax is a tax on various professions such as lawyers, teachers, doctors and engineers. <u>It is the only direct tax imposed by the State Government.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/22.png" alt="Left a State Government building box labelled PROFESSIONAL TAX, with four small profession" data-caption="Professional Tax is the only direct tax of the State Government." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/23.png" alt="State Secretariat building India photo" data-caption="A State Secretariat building, where state taxes are decided." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Details</th></tr></thead><tbody><tr><td>Imposed on</td><td>Professions such as lawyers, teachers, doctors and engineers</td></tr><tr><td>Imposed by</td><td>State Government</td></tr><tr><td>Special feature</td><td>The only direct tax imposed by the State Government</td></tr><tr><td>All other direct taxes</td><td>Imposed by the Income Tax Department of the Government of India</td></tr></tbody></table>
      <p class="cp-lead">Most direct taxes, such as Income Tax and Corporate Tax, are imposed by the Government of India. Professional Tax is the exception, because the State Government imposes it.</p>
      <div class="cp-note trap">Do not think that all direct taxes belong to the Centre. Professional Tax is a direct tax that belongs to the State.</div>
      <div class="cp-note exam">This is a favourite question: Which is the only direct tax imposed by the State Government? The answer is Professional Tax.</div>
    `
  },
  38: {
    questext: "Which is the only direct tax imposed by the State Government?",
    options: ["Income Tax", "Corporate Tax", "Professional Tax", "Capital Gain Tax"],
    correct: "3",
    exptext: "✅ Professional Tax is the only direct tax imposed by the State Government. 📌 State plus profession gives Professional Tax. ❌ Income Tax, Corporate Tax and Capital Gain Tax are wrong because the Government of India imposes them."
  },
  39: {
    questext: "Professional Tax is imposed on which of the following?",
    options: ["Companies", "Limited Liability Partnerships", "Imports", "Professions such as doctors and teachers"],
    correct: "4",
    exptext: "✅ Professional Tax is imposed on professions such as lawyers, teachers, doctors and engineers. 📌 Profession gives Professional Tax. ❌ Companies are wrong because they pay Corporate Tax or Minimum Alternative Tax."
  },
  40: {
    questext: "Consider the following statements about Professional Tax:\n1. It is a direct tax.\n2. It is imposed by the Government of India.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, as Professional Tax is a direct tax. 📌 It is the one direct tax of the State. ❌ Statement 2 is wrong because the State Government imposes it and not the Government of India."
  },
  41: {
    type: "concept", icon: "🤝", accent: "#e11d48", pauseTimer: true,
    title: "AMT — Alternate Minimum Tax",
    html: `
      <p class="cp-lead">Alternate Minimum Tax works in the same way as Minimum Alternative Tax. <u>The only difference is that it is applied on Limited Liability Partnerships instead of companies.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/24.png" alt="Two boxes side by side: MAT with the word Companies, AMT with the words Limited Liability " data-caption="The same minimum tax idea applied on two different business types." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/25.png" alt="Partners meeting business partnership office photo" data-caption="Partners in a Limited Liability Partnership running a business together." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Tax</th><th>Full form</th><th>Applied on</th></tr></thead><tbody><tr><td>MAT</td><td>Minimum Alternative Tax</td><td>Companies</td></tr><tr><td>AMT</td><td>Alternate Minimum Tax</td><td>Limited Liability Partnerships</td></tr></tbody></table>
      <p class="cp-lead">A Limited Liability Partnership is a business owned by two or more partners, where each partner is responsible only up to the money put in. Alternate Minimum Tax makes sure that such a firm also pays a minimum tax.</p>
      <div class="cp-note remember">MAT goes to Companies and AMT goes to LLPs.</div>
      <div class="cp-note trap">The two names look almost the same, so students swap them. Keep the pairs fixed: Minimum Alternative Tax goes with Companies, and Alternate Minimum Tax goes with Limited Liability Partnerships.</div>
    `
  },
  42: {
    questext: "Alternate Minimum Tax is applied on which of the following?",
    options: ["Companies", "Limited Liability Partnerships", "Individuals", "Local bodies"],
    correct: "2",
    exptext: "✅ Alternate Minimum Tax is applied on Limited Liability Partnerships. 📌 AMT goes to LLPs and MAT goes to companies. ❌ Companies is wrong because they pay the Minimum Alternative Tax."
  },
  43: {
    questext: "Which of the following pairs of tax and its application is correctly matched?",
    options: ["Minimum Alternative Tax and Limited Liability Partnerships", "Alternate Minimum Tax and Companies", "Alternate Minimum Tax and Individuals", "Minimum Alternative Tax and Companies"],
    correct: "4",
    exptext: "✅ Minimum Alternative Tax is applied on companies. 📌 MAT matches Companies and AMT matches LLPs. ❌ Options 1 and 2 are tempting but they swap the two pairs, and individuals do not pay either tax."
  },
  44: {
    type: "concept", icon: "🗑️", accent: "#10b981", pauseTimer: true,
    title: "Abolished Direct Taxes",
    html: `
      <p class="cp-lead">Some direct taxes were once collected but have now been stopped. <u>There are three important ones: Gift Tax, Fringe Benefit Tax and Wealth Tax.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/26.png" alt="Horizontal timeline with three markers: 1998 Gift Tax abolished, 2009 Fringe Benefit Tax a" data-caption="The three abolished direct taxes in order of the year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/27.png" alt="Three crossed-out tax tags labelled Gift Tax, Fringe Benefit Tax, Wealth Tax in a row, eac" data-caption="Memory picture for the three taxes that no longer exist." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Number</th><th>Tax name</th><th>Status</th><th>Year</th></tr></thead><tbody><tr><td>1</td><td>Gift Tax</td><td>Abolished</td><td>1998</td></tr><tr><td>2</td><td>Wealth Tax</td><td>Repealed</td><td>2015</td></tr><tr><td>3</td><td>Fringe Benefit Tax</td><td>Abolished</td><td>2009</td></tr></tbody></table>
      <p class="cp-lead">To remember the order of the years, think of the order of the taxes in time: Gift Tax first in 1998, Fringe Benefit Tax next in 2009, and Wealth Tax last in 2015.</p>
      <div class="cp-note tip">Gift Tax was a tax on gifts, Wealth Tax was a tax on the total wealth a person held, and Fringe Benefit Tax was a tax paid by employers on extra benefits given to workers.</div>
      <div class="cp-note exam">Questions often give the tax and ask for the year, or give the three years and ask for the correct order.</div>
    `
  },
  45: {
    questext: "In which year was Wealth Tax repealed?",
    options: ["1998", "2009", "2012", "2015"],
    correct: "4",
    exptext: "✅ Wealth Tax was repealed in 2015. 📌 It is the last of the three abolished taxes. ❌ 1998 is wrong because that is the year of the Gift Tax and 2009 belongs to the Fringe Benefit Tax."
  },
  46: {
    questext: "Which direct tax was abolished in the year 1998?",
    options: ["Gift Tax", "Fringe Benefit Tax", "Wealth Tax", "Professional Tax"],
    correct: "1",
    exptext: "✅ Gift Tax was abolished in 1998. 📌 Gift Tax is the oldest of the three stopped taxes. ❌ Professional Tax is wrong because it is still being collected by State Governments."
  },
  47: {
    questext: "Which of the following shows the abolished taxes from the earliest to the latest year?",
    options: ["Wealth Tax, Gift Tax, Fringe Benefit Tax", "Gift Tax, Fringe Benefit Tax, Wealth Tax", "Fringe Benefit Tax, Gift Tax, Wealth Tax", "Gift Tax, Wealth Tax, Fringe Benefit Tax"],
    correct: "2",
    exptext: "✅ Gift Tax ended in 1998, Fringe Benefit Tax in 2009 and Wealth Tax in 2015. 📌 Remember G, F, W. ❌ Option 4 is tempting but it puts Wealth Tax before Fringe Benefit Tax, which is the wrong order."
  },
  48: {
    type: "concept", icon: "🌐", accent: "#eab308", pauseTimer: true,
    title: "Types of Indirect Tax",
    html: `
      <p class="cp-lead">Indirect taxes are collected on goods and services and passed on to the consumer. <u>There are two major types: Goods and Services Tax, and Customs Duty on export and import.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/28.png" alt="Two boxes under a title INDIRECT TAX: left box GST with a shop icon labelled Goods and ser" data-caption="The two major indirect taxes and where each one applies." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/29.png" alt="Cargo ship container port India customs photo" data-caption="Imported goods at a port are charged Customs Duty." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Major type</th><th>Where it applies</th></tr></thead><tbody><tr><td>Goods and Services Tax</td><td>Sale of goods and services inside the country</td></tr><tr><td>Customs Duty on export and import</td><td>Goods that cross the border of the country</td></tr></tbody></table>
      <p class="cp-lead">Goods and Services Tax is charged when goods and services are bought and sold, and the buyer finally pays it. Customs Duty is charged when goods enter or leave the country.</p>
      <div class="cp-note trap">Both are indirect taxes, so both are administered by the Central Board of Indirect Taxes and Customs and not by the Central Board of Direct Taxes.</div>
    `
  },
  49: {
    questext: "Which of the following are the two major types of indirect tax?",
    options: ["Income Tax and Corporate Tax", "Goods and Services Tax and Customs Duty", "Professional Tax and Wealth Tax", "Capital Gain Tax and Gift Tax"],
    correct: "2",
    exptext: "✅ The two major indirect taxes are Goods and Services Tax and Customs Duty on export and import. 📌 Inside the country it is GST, and at the border it is Customs Duty. ❌ The other pairs are wrong because they are direct taxes."
  },
  50: {
    questext: "Customs Duty is levied on which of the following?",
    options: ["Profit of a company", "Salary of a worker", "Sale of shares", "Goods crossing the border of the country"],
    correct: "4",
    exptext: "✅ Customs Duty is charged on goods that are exported or imported. 📌 Customs means the border check. ❌ Profit of a company is wrong because that is taxed through Corporate Tax."
  },
  51: {
    type: "concept", icon: "🛒", accent: "#3b82f6", pauseTimer: true,
    title: "GST — Goods and Services Tax",
    html: `
      <p class="cp-lead">Goods and Services Tax, known as GST, is a single tax on the supply of goods and services. <u>The idea behind it is One Nation, One Tax.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/30.png" alt="Left side many small tags labelled Excise, Service Tax, VAT, Octroi, Entry Tax merging wit" data-caption="Many old indirect taxes combined into one tax." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/31.png" alt="GST launch midnight Parliament Central Hall 2017 photo" data-caption="The launch of Goods and Services Tax in Parliament in 2017." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/32.png" alt="Simple map schematic, not a map: a box State A labelled Goods made here and a box State B " data-caption="Destination based tax goes to the place where goods are used." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Key point</th><th>Details</th></tr></thead><tbody><tr><td>Introduced through</td><td>The 101st Constitutional Amendment Act, 2016</td></tr><tr><td>Nature</td><td>One Nation, One Indirect Tax; it replaced 17 major indirect taxes</td></tr><tr><td>Type</td><td>Consumption based and destination based tax</td></tr><tr><td>Enforcement date</td><td>1 July 2017</td></tr><tr><td>Collected by</td><td>The Centre collects CGST and IGST, and the States collect SGST</td></tr><tr><td>Filing platform</td><td>GSTN, the Goods and Services Tax Network, an online portal</td></tr></tbody></table>
      <p class="cp-lead">A consumption based tax means the tax is paid when goods are used by the consumer. A destination based tax means the tax goes to the state where the goods are finally used and not to the state where they are made.</p>
      <div class="cp-note trap">GST was enforced on 1 July 2017, not in 2016. The year 2016 is the year of the 101st Constitutional Amendment Act.</div>
      <div class="cp-note exam">Remember three facts: 101st Amendment, 1 July 2017, and the replacement of 17 major indirect taxes.</div>
    `
  },
  52: {
    questext: "Goods and Services Tax was introduced through which Constitutional Amendment Act?",
    options: ["99th Amendment Act", "100th Amendment Act", "101st Amendment Act", "102nd Amendment Act"],
    correct: "3",
    exptext: "✅ Goods and Services Tax was introduced through the 101st Constitutional Amendment Act, 2016. 📌 Think 101 for the first GST law. ❌ The 100th is tempting, but it is linked with the exchange of land with Bangladesh."
  },
  53: {
    questext: "On which date was Goods and Services Tax enforced in India?",
    options: ["1 April 2016", "1 July 2017", "1 January 2017", "1 April 2018"],
    correct: "2",
    exptext: "✅ Goods and Services Tax was enforced on 1 July 2017. 📌 July 2017 is the start day. ❌ 2016 is wrong because that is the year of the Amendment Act and not the enforcement."
  },
  54: {
    questext: "Consider the following statements about Goods and Services Tax:\n1. It is a consumption and destination based tax.\n2. It is a direct tax.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because the tax is collected where the goods are consumed. 📌 GST belongs to the indirect tax family. ❌ Statement 2 is wrong because the burden of Goods and Services Tax falls on the consumer."
  },
  55: {
    questext: "Goods and Services Tax is called One Nation, One Tax because it replaced how many major indirect taxes?",
    options: ["7", "13", "17", "25"],
    correct: "3",
    exptext: "✅ It replaced 17 major indirect taxes, which brought them into a single tax. 📌 Remember the number 17. ❌ The number 13 is tempting, but that is the number of cesses and not of the major taxes."
  },
  56: {
    type: "concept", icon: "🖥️", accent: "#d946ef", pauseTimer: true,
    title: "GSTN — Goods and Services Tax Network",
    html: `
      <p class="cp-lead">The Goods and Services Tax Network, known as GSTN, is the technology backbone for GST filing. <u>It runs the online portal on which taxpayers register, file returns and pay tax.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/33.png" alt="Hub diagram: a central circle labelled GSTN with four spokes to Taxpayer, Central Governme" data-caption="GSTN connects taxpayers, governments and banks on one portal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/34.png" alt="GST portal website homepage screenshot" data-caption="The Goods and Services Tax portal, where returns are filed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Period</th><th>Ownership of GSTN</th></tr></thead><tbody><tr><td>Earlier</td><td>51 percent private entities, 24.5 percent Government of India and 24.5 percent State Governments</td></tr><tr><td>Present</td><td>A fully government owned company, shared equally by the Centre and the States</td></tr></tbody></table>
      <p class="cp-lead">When GSTN was first set up, private financial institutions held the majority share. Later the government took over their share, so now it is owned only by the Centre and the States.</p>
      <div class="cp-note trap">GSTN is only the online platform. It does not decide tax rates. The rates are decided by the Goods and Services Tax Council.</div>
    `
  },
  57: {
    questext: "Which platform is used for online filing of Goods and Services Tax?",
    options: ["GSTN", "GST Council", "Central Board of Direct Taxes", "Reserve Bank of India"],
    correct: "1",
    exptext: "✅ The Goods and Services Tax Network, GSTN, is the online portal for GST filing. 📌 N stands for Network. ❌ The GST Council is wrong because it makes decisions and does not run the portal."
  },
  58: {
    type: "concept", icon: "🧩", accent: "#059669", pauseTimer: true,
    title: "Types of GST",
    html: `
      <p class="cp-lead">Goods and Services Tax has three types. <u>Which one applies depends on where the sale takes place.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/35.png" alt="Three-panel diagram: panel one a single state with CGST and SGST labels; panel two two dif" data-caption="Which type of GST applies in each kind of sale." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/36.png" alt="Formula picture: within one state, CGST plus SGST equals total GST; between two states, IG" data-caption="The two simple formulas for the three types of GST." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Full form</th><th>Applicability or share</th></tr></thead><tbody><tr><td>CGST</td><td>Central Goods and Services Tax</td><td>The Centre's share in GST, applied on sales inside a state</td></tr><tr><td>SGST</td><td>State Goods and Services Tax</td><td>The State's share in GST, applied on sales inside a state</td></tr><tr><td>IGST</td><td>Integrated Goods and Services Tax</td><td>Applied on export, import and inter-state trade</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Sale inside one state</small>Total GST = CGST + SGST</div>
      <p class="cp-lead">When goods are sold inside one state, the tax is split into two equal parts, one for the Centre and one for the State. When goods cross a state border or the country border, one tax, IGST, is charged.</p>
      <div class="cp-note trap">Do not confuse the word inter-state with intra-state. Intra means inside, so intra-state sales carry CGST and SGST, while inter-state sales carry IGST.</div>
    `
  },
  59: {
    questext: "Integrated Goods and Services Tax is applied on which of the following?",
    options: ["Sales inside one state only", "Salary income", "Export, import and inter-state trade", "Profit of a company"],
    correct: "3",
    exptext: "✅ Integrated Goods and Services Tax is applied on export, import and inter-state trade. 📌 Integrated means joining states and countries. ❌ Sales inside one state is wrong because that carries CGST and SGST."
  },
  60: {
    questext: "Which of the following taxes are charged together on a sale made inside one state?",
    options: ["IGST and CGST", "CGST and SGST", "IGST and SGST", "Only IGST"],
    correct: "2",
    exptext: "✅ A sale inside a state carries CGST and SGST. 📌 C is for Centre and S is for State, so the sale is shared between the two. ❌ Only IGST is wrong because it is for sales that cross a state or country border."
  },
  61: {
    questext: "Consider the following statements about the types of GST:\n1. State Goods and Services Tax is the State Government's share in GST.\n2. Central Goods and Services Tax is applied on export and import.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, as SGST is the share of the State Government. 📌 Export and import belong to IGST. ❌ Statement 2 is wrong because Central Goods and Services Tax is applied on sales inside a state."
  },
  62: {
    type: "concept", icon: "🔀", accent: "#dc2626", pauseTimer: true,
    title: "Taxes Merged Into GST",
    html: `
      <p class="cp-lead">Goods and Services Tax brought many old central and state taxes under one roof. <u>A few items, however, were kept outside it.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/37.png" alt="Two columns of tags flowing into one GST box: left column Central taxes (Central Excise Du" data-caption="Central and state taxes flowing into a single tax." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/38.png" alt="Four boxes outside a GST fence: Petroleum Products, Alcohol, Real Estate, Electricity, eac" data-caption="The four items that stay outside Goods and Services Tax." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Central taxes merged</th><th>State taxes merged</th></tr></thead><tbody><tr><td>Central Excise Duty</td><td>State Value Added Tax</td></tr><tr><td>Additional Excise Duty</td><td>Entry Tax</td></tr><tr><td>Service Tax</td><td>Luxury Tax</td></tr><tr><td>Central Sales Tax</td><td>Entertainment Tax</td></tr><tr><td>Additional Customs Duty, also called Countervailing Duty</td><td>Taxes on lottery, betting and gambling</td></tr><tr><td>Special Additional Duty of Customs</td><td>Octroi and Purchase Tax</td></tr></tbody></table>
      <p class="cp-lead">Before Goods and Services Tax, one product could carry many taxes, one after another. Now they are merged, so the buyer pays a single tax.</p>
      <table><thead><tr><th>Items kept outside Goods and Services Tax</th></tr></thead><tbody><tr><td>Petroleum products</td></tr><tr><td>Alcohol</td></tr><tr><td>Real estate or property</td></tr><tr><td>Electricity</td></tr></tbody></table>
      <div class="cp-note trap">Customs Duty on imports is still charged along with GST. The merged customs items are only the additional and special additional duties.</div>
      <div class="cp-note tip">Octroi was a tax on goods entering a city, and Entry Tax was a tax on goods entering a state.</div>
    `
  },
  63: {
    questext: "Which of the following taxes was merged into Goods and Services Tax?",
    options: ["Income Tax", "Corporate Tax", "Service Tax", "Professional Tax"],
    correct: "3",
    exptext: "✅ Service Tax was one of the central indirect taxes merged into Goods and Services Tax. 📌 Only indirect taxes were merged. ❌ Income Tax, Corporate Tax and Professional Tax are wrong because they are direct taxes."
  },
  64: {
    questext: "Which of the following items is outside the Goods and Services Tax?",
    options: ["Electricity", "Mobile phones", "Soap", "Packaged food"],
    correct: "1",
    exptext: "✅ Electricity is one of the items kept outside Goods and Services Tax. 📌 The four items are petroleum, alcohol, real estate and electricity. ❌ Mobile phones, soap and packaged food are wrong because they carry the tax."
  },
  65: {
    questext: "Consider the following statements:\n1. Octroi and Purchase Tax were merged into Goods and Services Tax.\n2. Alcohol is included in the Goods and Services Tax system.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because Octroi and Purchase Tax were state taxes that were merged. 📌 Alcohol, petroleum, real estate and electricity stay outside. ❌ Statement 2 is wrong because alcohol is outside the system."
  },
  66: {
    type: "concept", icon: "🏛️", accent: "#7c3aed", pauseTimer: true,
    title: "GST Council",
    html: `
      <p class="cp-lead">The Goods and Services Tax Council is the highest decision making body for all Goods and Services Tax matters in India. <u>It decides the rates, the rules and the changes in this tax.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/39.png" alt="GST Council meeting Finance Minister New Delhi photo" data-caption="A meeting of the Goods and Services Tax Council in New Delhi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/40.png" alt="Council table diagram: Chairperson at the head labelled Union Finance Minister, next to Vi" data-caption="Who sits at the head of the Goods and Services Tax Council." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Key point</th><th>Details</th></tr></thead><tbody><tr><td>Formed in</td><td>2016, under the 101st Constitutional Amendment Act, 2016</td></tr><tr><td>Nature</td><td>Highest decision making body for all GST affairs in India</td></tr><tr><td>Appointed by</td><td>President of India</td></tr><tr><td>Chairperson</td><td>Union Minister of Finance</td></tr><tr><td>Vice-Chairperson</td><td>Minister of Finance of any State</td></tr></tbody></table>
      <table><thead><tr><th>Members of the Council</th></tr></thead><tbody><tr><td>Minister of Finance of all States</td></tr><tr><td>Minister of Finance of 3 Union Territories: Delhi, Puducherry and Jammu and Kashmir</td></tr><tr><td>Minister of State for Finance of the Government of India</td></tr></tbody></table>
      <div class="cp-note trap">The Chairperson is the Union Finance Minister, but the Vice-Chairperson comes from the States. Do not reverse them.</div>
      <div class="cp-note exam">Remember the three Union Territories in the Council: Delhi, Puducherry and Jammu and Kashmir.</div>
    `
  },
  67: {
    questext: "Who is the Chairperson of the Goods and Services Tax Council?",
    options: ["Prime Minister of India", "Governor of the Reserve Bank of India", "Minister of Finance of any State", "Union Minister of Finance"],
    correct: "4",
    exptext: "✅ The Union Minister of Finance is the Chairperson of the Goods and Services Tax Council. 📌 Centre chairs and a State leads as Vice-Chairperson. ❌ A State Finance Minister is wrong because that person may only be the Vice-Chairperson."
  },
  68: {
    questext: "Which of the following Union Territories has a Finance Minister as a member of the Goods and Services Tax Council?",
    options: ["Chandigarh", "Ladakh", "Puducherry", "Lakshadweep"],
    correct: "3",
    exptext: "✅ Puducherry is one of the three Union Territories in the Council, along with Delhi and Jammu and Kashmir. 📌 Remember D, P and J. ❌ The other three Union Territories are wrong because they have no Finance Minister in the Council."
  },
  69: {
    questext: "Consider the following statements about the Goods and Services Tax Council:\n1. It is the highest decision making body related to all Goods and Services Tax affairs.\n2. The Vice-Chairperson is the Union Minister of Finance.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 The Chairperson is from the Centre and the Vice-Chairperson is from the States. ❌ Statement 2 is wrong because the Vice-Chairperson is the Minister of Finance of any State."
  },
  70: {
    type: "concept", icon: "🗳️", accent: "#0891b2", pauseTimer: true,
    title: "Voting Rights",
    html: `
      <p class="cp-lead">Every decision of the Goods and Services Tax Council is taken by vote. <u>The Centre holds one third of the votes and the States together hold two thirds.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/41.png" alt="Pie diagram split into two parts: one third labelled Central Government, two thirds labell" data-caption="The vote share of the Centre and the States in the Council." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/42.png" alt="Bar showing four equal parts, three coloured and one empty, labelled Three fourths needed " data-caption="A decision needs three fourths of the weighted votes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Details</th></tr></thead><tbody><tr><td>Votes of the Central Government</td><td>One third</td></tr><tr><td>Votes of the State Governments</td><td>Two thirds</td></tr><tr><td>Majority needed for a decision</td><td>Three fourths</td></tr></tbody></table>
      <p class="cp-lead">A decision needs three fourths of the votes. Since the Centre holds one third, which is more than one fourth, no decision can pass if the Centre says no. In the same way, the States cannot pass a decision alone, because they hold only two thirds, which is less than three fourths.</p>
      <div class="cp-formula" translate="no"><small>Voting in the Council</small>Centre = 1/3 &nbsp;|&nbsp; States = 2/3 &nbsp;|&nbsp; Decision = 3/4</div>
      <div class="cp-note trap">Do not mix the two ideas. One third and two thirds are the vote shares, while three fourths is the majority needed to pass a decision.</div>
    `
  },
  71: {
    questext: "What is the majority required for a decision in the Goods and Services Tax Council?",
    options: ["One half", "Two thirds", "Three fourths", "One third"],
    correct: "3",
    exptext: "✅ A decision needs a three fourths majority. 📌 Three fourths is the pass mark. ❌ Two thirds is tempting, but that is only the share of votes held by the States."
  },
  72: {
    questext: "What share of the votes in the Goods and Services Tax Council belongs to the State Governments?",
    options: ["Two thirds", "One third", "One half", "Three fourths"],
    correct: "1",
    exptext: "✅ The State Governments hold two thirds of the votes. 📌 States have the bigger share, the Centre has the smaller. ❌ One third is wrong because it is the share of the Central Government."
  },
  73: {
    questext: "Consider the following statements about voting in the Goods and Services Tax Council:\n1. The Central Government holds one third of the votes.\n2. A decision needs a majority of two thirds.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Only 1", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 1 is correct. 📌 One third for the Centre, two thirds for the States, and three fourths to decide. ❌ Statement 2 is wrong because the required majority is three fourths and not two thirds."
  },
  74: {
    type: "concept", icon: "🏷️", accent: "#ca8a04", pauseTimer: true,
    title: "GST Tax Slabs",
    html: `
      <p class="cp-lead">Goods and Services Tax is charged at four main rates, called slabs. <u>The rate depends on how necessary the goods are.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/43.png" alt="Four equal cards in a row: 0 percent Nil rate, 5 percent Low rate, 18 percent Standard rat" data-caption="The four Goods and Services Tax slabs in a single row." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Taxation/44.png" alt="Staircase diagram going up with four steps labelled 0, 5, 18, 40, with a note under the to" data-caption="The slabs rise from essential goods to luxury goods." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Slab</th><th>Name</th><th>Type of goods</th></tr></thead><tbody><tr><td>0 percent</td><td>Nil rate</td><td>Essential goods</td></tr><tr><td>5 percent</td><td>Low rate</td><td>Basic necessities</td></tr><tr><td>18 percent</td><td>Standard rate</td><td>Most goods</td></tr><tr><td>40 percent</td><td>Luxury rate</td><td>Demerit goods</td></tr></tbody></table>
      <p class="cp-lead">Demerit goods are goods that are harmful or are luxuries, so the government charges the highest tax on them. Essential goods carry no tax at all.</p>
      <div class="cp-note remember">The slabs in order are 0, 5, 18 and 40. A simple way is to remember zero for food, five for basics, eighteen for most and forty for luxury.</div>
      <div class="cp-note exam">The standard rate of 18 percent and the luxury rate of 40 percent are the numbers that appear most often.</div>
    `
  },
  75: {
    questext: "What is the standard rate of Goods and Services Tax charged on most goods?",
    options: ["5 percent", "12 percent", "40 percent", "18 percent"],
    correct: "4",
    exptext: "✅ The standard rate is 18 percent, which applies to most goods. 📌 Most goods mean eighteen. ❌ 5 percent is wrong because it is the low rate for basic necessities."
  },
  76: {
    questext: "Which slab is charged on luxury and demerit goods?",
    options: ["0 percent", "40 percent", "18 percent", "5 percent"],
    correct: "2",
    exptext: "✅ Luxury and demerit goods are charged the highest rate of 40 percent. 📌 Forty is the top step. ❌ 18 percent is wrong because that is the standard rate for most goods."
  },
  77: {
    questext: "Which slab is the nil rate meant for essential goods?",
    options: ["5 percent", "18 percent", "40 percent", "0 percent"],
    correct: "4",
    exptext: "✅ Essential goods fall under the nil rate of 0 percent. 📌 Zero is for the most basic goods. ❌ 5 percent is wrong because it is the low rate, charged on basic necessities."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Taxation/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined rupee sign, a few real-looking gold coins and a subtle rising chart line" },
  "images/General_Awareness/Economics/Taxation/1.png": { t: "fig", about: "Two side-by-side columns: left column titled MONETARY POLICY with a bank building icon, right column titled FISCAL POLICY with a tax and budget icon." },
  "images/General_Awareness/Economics/Taxation/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Reserve Bank of India headquarters Mumbai building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/2.png. the front of the Reserve Bank of India building in Mumbai",
  "images/General_Awareness/Economics/Taxation/3.png": { t: "fig", about: "Three-level pyramid: top box Government of India, middle box State Government, bottom box Local Bodies, each with a short label Imposes taxes." },
  "images/General_Awareness/Economics/Taxation/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Parliament House New Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/4.png. the Parliament House building in New Delhi",
  "images/General_Awareness/Economics/Taxation/5.png": { t: "fig", about: "Two-column chart: left column RURAL with Gram Panchayat, Block Panchayat, Zila Panchayat stacked from village to district; right column URBAN with Nagar Panchayat, Nagar Palika, Nagar Nigam stacked from small town to big city." },
  "images/General_Awareness/Economics/Taxation/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gram Panchayat office village India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/6.png. a village Panchayat office building",
  "images/General_Awareness/Economics/Taxation/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Municipal Corporation building Nagar Nigam India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/7.png. a city municipal corporation building",
  "images/General_Awareness/Economics/Taxation/8.png": { t: "fig", about: "Two flow diagrams: top flow Taxpayer pays Government directly, label Burden on taxpayer; bottom flow Consumer pays Seller, Seller pays Government, label Burden on consumer." },
  "images/General_Awareness/Economics/Taxation/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Goods and Services Tax invoice shop bill photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/9.png. a shop bill showing a tax amount",
  "images/General_Awareness/Economics/Taxation/10.png": { t: "fig", about: "Organisation chart: top box Ministry of Finance, below it Department of Revenue, below it two boxes CBDT on the left and CBIC on the right." },
  "images/General_Awareness/Economics/Taxation/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"North Block New Delhi Ministry of Finance building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/11.png. the North Block building in New Delhi that houses the Ministry of Finance",
  "images/General_Awareness/Economics/Taxation/12.png": { t: "fig", about: "Salary slip diagram: a box Salary, a small slice cut out labelled TDS taken at payment, remaining amount labelled Received by employee, and a form labelled ITR filed once a year." },
  "images/General_Awareness/Economics/Taxation/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Income Tax Department building India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/13.png. an Income Tax Department office building in India",
  "images/General_Awareness/Economics/Taxation/14.png": { t: "fig", about: "Step diagram: Turnover 100 minus Input and Operational Cost 70 equals Gross Profit 30; Gross Profit 30 minus Corporate Tax 6 equals Net Profit 24." },
  "images/General_Awareness/Economics/Taxation/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Corporate office towers business district India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/15.png. tall office towers of companies in an Indian business district",
  "images/General_Awareness/Economics/Taxation/16.png": { t: "fig", about: "Timeline bar from 0 to 2 years with a divider at 1 year; left part labelled SHORT TERM (1 year or less), right part labelled LONG TERM (more than 1 year)." },
  "images/General_Awareness/Economics/Taxation/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bombay Stock Exchange building Dalal Street Mumbai photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/17.png. the Bombay Stock Exchange building on Dalal Street",
  "images/General_Awareness/Economics/Taxation/18.png": { t: "fig", about: "Flow diagram: Investor, then DEMAT Account box, then Buy or Sell Shares and Bonds, with a small tax tag labelled STT on the transaction." },
  "images/General_Awareness/Economics/Taxation/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Share trading screen stock market photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/19.png. a share trading screen showing prices",
  "images/General_Awareness/Economics/Taxation/20.png": { t: "fig", about: "Two-step picture: a company showing Profit shown as 0 with a question mark, then an arrow to a tax tag labelled MAT, with the label Applied on COMPANIES." },
  "images/General_Awareness/Economics/Taxation/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ministry of Corporate Affairs office India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/21.png. the building of the Ministry of Corporate Affairs in India",
  "images/General_Awareness/Economics/Taxation/22.png": { t: "fig", about: "Left a State Government building box labelled PROFESSIONAL TAX, with four small profession icons: lawyer, teacher, doctor, engineer; right a large box labelled All other direct taxes: Income Tax Department, Government of India." },
  "images/General_Awareness/Economics/Taxation/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"State Secretariat building India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/23.png. a State Secretariat building where the state government works",
  "images/General_Awareness/Economics/Taxation/24.png": { t: "fig", about: "Two boxes side by side: MAT with the word Companies, AMT with the words Limited Liability Partnerships, joined by an equals sign and the label Same idea." },
  "images/General_Awareness/Economics/Taxation/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Partners meeting business partnership office photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/25.png. partners discussing business at a table in an office",
  "images/General_Awareness/Economics/Taxation/26.png": { t: "fig", about: "Horizontal timeline with three markers: 1998 Gift Tax abolished, 2009 Fringe Benefit Tax abolished, 2015 Wealth Tax repealed." },
  "images/General_Awareness/Economics/Taxation/27.png": { t: "fig", about: "Three crossed-out tax tags labelled Gift Tax, Fringe Benefit Tax, Wealth Tax in a row, each with a small icon: gift box, office bag, house." },
  "images/General_Awareness/Economics/Taxation/28.png": { t: "fig", about: "Two boxes under a title INDIRECT TAX: left box GST with a shop icon labelled Goods and services inside the country, right box CUSTOMS DUTY with a ship icon labelled Goods crossing the border." },
  "images/General_Awareness/Economics/Taxation/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cargo ship container port India customs photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/29.png. a container ship being unloaded at an Indian port",
  "images/General_Awareness/Economics/Taxation/30.png": { t: "fig", about: "Left side many small tags labelled Excise, Service Tax, VAT, Octroi, Entry Tax merging with arrows into one big tag labelled GST on the right." },
  "images/General_Awareness/Economics/Taxation/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"GST launch midnight Parliament Central Hall 2017 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/31.png. the launch event of Goods and Services Tax in Parliament",
  "images/General_Awareness/Economics/Taxation/32.png": { t: "fig", about: "Simple map schematic, not a map: a box State A labelled Goods made here and a box State B labelled Goods used here, with the tax coming to State B." },
  "images/General_Awareness/Economics/Taxation/33.png": { t: "fig", about: "Hub diagram: a central circle labelled GSTN with four spokes to Taxpayer, Central Government, State Governments, Banks." },
  "images/General_Awareness/Economics/Taxation/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"GST portal website homepage screenshot\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/34.png. the homepage of the Goods and Services Tax portal",
  "images/General_Awareness/Economics/Taxation/35.png": { t: "fig", about: "Three-panel diagram: panel one a single state with CGST and SGST labels; panel two two different states with IGST label on the arrow between them; panel three a ship with IGST label for export and import." },
  "images/General_Awareness/Economics/Taxation/36.png": { t: "fig", about: "Formula picture: within one state, CGST plus SGST equals total GST; between two states, IGST equals total GST." },
  "images/General_Awareness/Economics/Taxation/37.png": { t: "fig", about: "Two columns of tags flowing into one GST box: left column Central taxes (Central Excise Duty, Service Tax, Central Sales Tax), right column State taxes (State VAT, Entry Tax, Octroi)." },
  "images/General_Awareness/Economics/Taxation/38.png": { t: "fig", about: "Four boxes outside a GST fence: Petroleum Products, Alcohol, Real Estate, Electricity, each with a small icon." },
  "images/General_Awareness/Economics/Taxation/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"GST Council meeting Finance Minister New Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Taxation/39.png. members of the Goods and Services Tax Council sitting at a meeting",
  "images/General_Awareness/Economics/Taxation/40.png": { t: "fig", about: "Council table diagram: Chairperson at the head labelled Union Finance Minister, next to Vice-Chairperson labelled Finance Minister of a State, and a row of members around the table labelled State Finance Ministers." },
  "images/General_Awareness/Economics/Taxation/41.png": { t: "fig", about: "Pie diagram split into two parts: one third labelled Central Government, two thirds labelled State Governments, with a label Decision needs three fourths majority." },
  "images/General_Awareness/Economics/Taxation/42.png": { t: "fig", about: "Bar showing four equal parts, three coloured and one empty, labelled Three fourths needed for a decision." },
  "images/General_Awareness/Economics/Taxation/43.png": { t: "fig", about: "Four equal cards in a row: 0 percent Nil rate, 5 percent Low rate, 18 percent Standard rate, 40 percent Luxury rate, each with a small icon: grain bag, tea cup, TV, luxury car." },
  "images/General_Awareness/Economics/Taxation/44.png": { t: "fig", about: "Staircase diagram going up with four steps labelled 0, 5, 18, 40, with a note under the top step: Demerit goods." }
});

/* CHANGE LOG
   - Goods and Services Tax Network: the earlier structure was 51 percent private ownership; since 2019 it is a wholly government-owned company shared equally by the Centre and the States. The present position is written on the page.
   - Taxes merged into GST: Additional Customs Duty is the Countervailing Duty (CVD) and the second customs item is Special Additional Duty of Customs (SAD). Anti-dumping duty is not merged and the old expansion of ADD as Anti-Dumping Duty was removed.
   - GST collection: GST is a dual tax. The Centre collects CGST and IGST and the States collect SGST, so the single line saying the Government of India collects GST was corrected.
   - CBEC was renamed CBIC; the exact year differs between sources (2017 to 2018), so no year is written.
   - Capital gain: the one-year rule is stated for shares and similar investments only; the holding period differs for other assets such as land and unlisted shares.
   - Excluded items: the exclusion is for alcohol for human consumption and for petroleum products such as crude oil, petrol, diesel, natural gas and aviation turbine fuel.
   - GST Council: Article 279A of the Constitution added; the Council is constituted by the President on the basis of the 101st Constitutional Amendment Act, 2016.
*/