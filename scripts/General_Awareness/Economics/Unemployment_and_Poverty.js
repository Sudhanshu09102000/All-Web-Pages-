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

/* Field: General_Awareness · Subject: Economics · Chapter: Unemployment_and_Poverty · 9 concept pages (+ overview) · 13 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "👷", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Unemployment and Its Types",
    thumb: {
      image: "images/General_Awareness/Economics/Unemployment_and_Poverty/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "UNEMPLOYMENT",
      line2: "ALL 10 TYPES",
      line3: "WITH EXAMPLES",
      badge: "COMPLETE",
      ribbon: "NOTES • FACTS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Types of Unemployment | Disguised, Seasonal, Cyclical, Structural | General Awareness",
      altTitles: ["10 Types of Unemployment in One Video for All Government Exams", "Disguised vs Seasonal vs Frictional Unemployment Made Easy"],
      description: "Types of Unemployment is a short and scoring topic of Economics in General Awareness. In this class we learn every type with a simple example.\n\n📌 IN THIS CLASS\n✅ Rural unemployment: disguised and seasonal\n✅ Urban unemployment: industrial and educated\n✅ Cyclical, frictional and structural unemployment\n✅ Under-employment, voluntary and open unemployment\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Unemployment #GeneralAwareness #Economics",
      tags: ["types of unemployment", "disguised unemployment", "seasonal unemployment", "cyclical unemployment", "frictional unemployment", "structural unemployment", "educated unemployment", "industrial unemployment", "under employment", "voluntary unemployment", "open unemployment", "rural unemployment", "urban unemployment", "marginal productivity zero", "unemployment in india", "economics for ssc", "general awareness", "static gk economics", "government exam economics", "indian economy basics", "unemployment tricks", "unemployment and poverty", "U"],
      hashtags: ["Unemployment", "GeneralAwareness", "Economics"],
      thumbText: "ALL TYPES OF UNEMPLOYMENT",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "👷 New class is live: Types of Unemployment. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Economics — General Awareness Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on unemployment</u>: what it means, and the ten types that exams ask about again and again. Each type has one key word, and once you know it the answer comes quickly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>9</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>13</b><span>Questions</span></div>
        <div class="cp-stat"><b>~31 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Types of Unemployment: Overview</b><br>How unemployment is split into rural, urban and other types, and which type belongs where.</li>
        <li><b>Rural Unemployment</b><br>Disguised unemployment and seasonal unemployment in agriculture.</li>
        <li><b>Urban Unemployment</b><br>Industrial unemployment and educated unemployment in towns and cities.</li>
        <li><b>Other Types</b><br>Cyclical, frictional, under-employment, voluntary, open and structural unemployment, each with a simple example.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Questions give a short situation, such as a farmer idle in the off-season, and ask you to name the type of unemployment. A clear key word for each type solves these in seconds.</div>
    `
  },
  2: {
    type: "concept", icon: "🗺️", accent: "#22c55e", pauseTimer: true,
    title: "Types of Unemployment: Overview",
    html: `
      <p class="cp-lead">Unemployment means that a person who is able and willing to work cannot find work. <u>It is divided into rural and urban types, and into six other types.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/1.png" alt="Tree diagram: Unemployment at the top. Left branch Rural: Disguised, Seasonal. Right branc" data-caption="The ten types of unemployment grouped as rural, urban and other." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/2.png" alt="Mind map with the word Unemployment in the centre and ten small labelled bubbles around it" data-caption="A key word for each of the ten types of unemployment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Group</th><th>Types</th></tr></thead><tbody><tr><td>Rural unemployment</td><td>Disguised, Seasonal</td></tr><tr><td>Urban unemployment</td><td>Industrial, Educated</td></tr><tr><td>Other types</td><td>Cyclical, Frictional, Under-employment, Voluntary, Open, Structural</td></tr></tbody></table>
      <p class="cp-lead">A person is counted as unemployed only if he or she is able to work, wants to work, and cannot get work. A person who does not want to work is not unemployed in this sense.</p>
      <div class="cp-note trap">The first two groups are named by place (rural and urban). The other six are named by cause or by nature, not by place.</div>
      <div class="cp-note exam">Remember the count: 2 rural, 2 urban and 6 others make 10 types.</div>
    `
  },
  3: {
    questext: "Which of the following is a type of rural unemployment?",
    options: ["Educated unemployment", "Industrial unemployment", "Disguised unemployment", "Cyclical unemployment"],
    correct: "2",
    exptext: "✅ Disguised unemployment is found in the agricultural sector of rural areas. 📌 Rural has two: disguised and seasonal. ❌ Educated unemployment is wrong because it belongs to urban areas."
  },
  4: {
    type: "concept", icon: "🌾", accent: "#f59e0b", pauseTimer: true,
    title: "Disguised Unemployment",
    html: `
      <p class="cp-lead">Disguised unemployment means that more people are working than the job needs. <u>The extra workers look employed, but they add nothing to the total output.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/3.png" alt="Farm field with five people working on a small plot. Two are highlighted as needed, three " data-caption="Five people on a job that needs two: the extra three are disguisedly unemployed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/4.png" alt="Indian farmers working together in a small field photo" data-caption="Family members working together on a small Indian farm." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Area</td><td>Agricultural sector (rural India)</td></tr><tr><td>Marginal productivity</td><td>Zero</td></tr><tr><td>Key idea</td><td>More workers, but no change in total output</td></tr><tr><td>Example</td><td>Five people do a job that needs only two; the extra three are disguisedly unemployed</td></tr></tbody></table>
      <p class="cp-lead">Marginal productivity is the extra output that comes from adding one more worker. Here it is zero, which means that if the extra workers leave, the output does not fall. That is why they are called surplus labour.</p>
      <div class="cp-note trap">Disguised unemployment is hidden. The workers appear to have a job, so it does not show in simple counts of the unemployed.</div>
      <div class="cp-note exam">Key words: agriculture, surplus labour, zero marginal productivity.</div>
    `
  },
  5: {
    questext: "Disguised unemployment is a situation where the marginal productivity of extra labour is:",
    options: ["Zero", "Positive", "Very high", "Rising"],
    correct: "1",
    exptext: "✅ In disguised unemployment, extra workers add nothing to the output. 📌 Disguised means hidden, and the hidden workers produce zero. ❌ Positive is wrong because then the work would not be surplus."
  },
  6: {
    questext: "Five members of a family work on a small farm that needs only two workers. The extra three members are an example of:",
    options: ["Seasonal unemployment", "Voluntary unemployment", "Frictional unemployment", "Disguised unemployment"],
    correct: "4",
    exptext: "✅ The three extra workers add nothing, so this is disguised unemployment. 📌 Too many hands for the job. ❌ Seasonal unemployment is wrong because that depends on the season, not on surplus workers."
  },
  7: {
    type: "concept", icon: "🌦️", accent: "#ef4444", pauseTimer: true,
    title: "Seasonal Unemployment",
    html: `
      <p class="cp-lead">Seasonal unemployment means that work is available only in certain seasons. <u>The worker is jobless in the off-season.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/5.png" alt="Calendar-style bar of the year: sowing and harvesting months shown in green labelled Emplo" data-caption="Farm workers get work only in the sowing and harvesting seasons." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/6.png" alt="Two crop seasons side by side: Kharif crop season and Rabi crop season, with a gap between" data-caption="Farmers are employed in Kharif and Rabi crop seasons but idle in between." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Area</td><td>Agricultural sector (rural India)</td></tr><tr><td>Meaning</td><td>Work only in certain seasons such as sowing and harvesting</td></tr><tr><td>Off-season</td><td>The worker remains unemployed</td></tr><tr><td>Example</td><td>Farmers employed only during the Kharif and Rabi crop seasons</td></tr></tbody></table>
      <p class="cp-lead">Kharif crops are sown in the rainy season, and Rabi crops are sown in winter. Between the sowing and the harvest there are weeks when the field needs no work.</p>
      <div class="cp-note trap">Disguised unemployment is about too many workers on one job. Seasonal unemployment is about no work at certain times of the year.</div>
      <div class="cp-note exam">Key words: season, off-season, Kharif and Rabi.</div>
    `
  },
  8: {
    questext: "A farmer who has work only during the sowing and harvesting seasons and sits idle at other times faces:",
    options: ["Seasonal unemployment", "Cyclical unemployment", "Structural unemployment", "Open unemployment"],
    correct: "1",
    exptext: "✅ Work that exists only in some seasons gives seasonal unemployment. 📌 Season gives seasonal. ❌ Cyclical unemployment is wrong because it comes from booms and recessions, not seasons."
  },
  9: {
    type: "concept", icon: "🏙️", accent: "#8b5cf6", pauseTimer: true,
    title: "Urban Unemployment: Industrial and Educated",
    html: `
      <p class="cp-lead">In towns and cities there are two main types. <u>Industrial unemployment is about skilled workers without factory jobs, and educated unemployment is about degree holders without jobs.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/7.png" alt="Split picture. Left: skilled worker with tools standing outside a closed factory gate, lab" data-caption="Industrial unemployment affects skilled workers, while educated unemployment affects graduates." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/8.png" alt="Two cards. Card 1 Industrial: Area urban, industrial sector, skilled or semi-skilled worke" data-caption="The two kinds of urban unemployment compared." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Industrial unemployment</th><th>Educated unemployment</th></tr></thead><tbody><tr><td>Area</td><td>Urban or industrial sector</td><td>Urban India</td></tr><tr><td>Who</td><td>Skilled or semi-skilled workers</td><td>Graduates and post-graduates</td></tr><tr><td>Meaning</td><td>Available for work but not employed in industry</td><td>Qualified but unable to find employment</td></tr></tbody></table>
      <p class="cp-lead">In both cases the worker is ready to work. The difference is the group: the first group has trade skills, and the second group has academic degrees.</p>
      <div class="cp-note trap">Educated unemployment is an urban problem in this classification, not a rural one.</div>
      <div class="cp-note exam">Remember: Industrial means skilled workers, Educated means graduates.</div>
    `
  },
  10: {
    questext: "Graduates and post-graduates who are qualified but unable to find jobs in cities are an example of:",
    options: ["Disguised unemployment", "Seasonal unemployment", "Educated unemployment", "Frictional unemployment"],
    correct: "2",
    exptext: "✅ Qualified people without jobs show educated unemployment. 📌 Education plus no job. ❌ Disguised unemployment is wrong because that belongs to agriculture."
  },
  11: {
    questext: "Which of the following is a type of urban unemployment?",
    options: ["Seasonal unemployment", "Disguised unemployment", "Industrial unemployment", "Marginal unemployment"],
    correct: "2",
    exptext: "✅ Industrial and educated unemployment are the two urban types. 📌 Urban has two: industrial and educated. ❌ Seasonal and disguised are wrong because both are rural types."
  },
  12: {
    type: "concept", icon: "🔄", accent: "#14b8a6", pauseTimer: true,
    title: "Cyclical Unemployment",
    html: `
      <p class="cp-lead">Cyclical unemployment comes from the ups and downs of the economy. <u>When the economy shrinks in a recession, jobs are lost.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/9.png" alt="Wave line of the business cycle with Boom at the peak and Recession at the trough. Above t" data-caption="Unemployment rises in a recession and falls in a boom." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/10.png" alt="Two-row cause chain. Row 1: GDP growth rate rises, economy expands, employment increases. " data-caption="How a rising or falling growth rate changes employment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Cause</td><td>Ups and downs (boom and recession) in the economy</td></tr><tr><td>When GDP growth rises</td><td>The economy expands and employment increases</td></tr><tr><td>When GDP growth falls</td><td>The economy contracts and unemployment increases</td></tr><tr><td>Link</td><td>Directly linked to the business cycle</td></tr></tbody></table>
      <p class="cp-lead">The business cycle is the repeating pattern of boom, slowdown, recession and recovery. During a boom firms hire more workers. During a recession firms sell less and cut jobs.</p>
      <div class="cp-note trap">Cyclical unemployment is temporary in nature, because it eases when the economy recovers.</div>
      <div class="cp-note exam">Key words: business cycle, boom, recession.</div>
    `
  },
  13: {
    questext: "Unemployment caused by the fall of the economy in a recession is called:",
    options: ["Frictional unemployment", "Under-employment", "Voluntary unemployment", "Cyclical unemployment"],
    correct: "4",
    exptext: "✅ Cyclical unemployment follows the business cycle. 📌 Cycle gives cyclical. ❌ Frictional unemployment is wrong because it is about people moving between jobs."
  },
  14: {
    type: "concept", icon: "🔀", accent: "#3b82f6", pauseTimer: true,
    title: "Frictional Unemployment",
    html: `
      <p class="cp-lead">Frictional unemployment is the short gap when a person moves from one job to another. <u>It is temporary and lasts only a few days or weeks.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/11.png" alt="Timeline: Job A ends, short gap labelled Frictional unemployment, Job B begins. A skill de" data-caption="A short gap between two jobs is frictional unemployment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/12.png" alt="Road with two junctions labelled Job A and Job B, a car passing between them with a label " data-caption="Frictional unemployment is a temporary pause while changing jobs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Cause</td><td>A person switches jobs, or leaves a job to improve skills with a diploma or course</td></tr><tr><td>Nature</td><td>Temporary; unemployed for a few days while moving</td></tr><tr><td>Example</td><td>A person leaves Job A and joins a skill development course before joining Job B</td></tr></tbody></table>
      <p class="cp-lead">The word friction means a small resistance that slows movement. In the job market it is the small delay while workers and jobs find each other.</p>
      <div class="cp-note trap">Frictional unemployment is the mildest type and is found even in a healthy economy.</div>
      <div class="cp-note exam">Key words: switching jobs, temporary.</div>
    `
  },
  15: {
    questext: "A person who leaves one job and joins another after a gap of a few days is facing:",
    options: ["Structural unemployment", "Disguised unemployment", "Frictional unemployment", "Open unemployment"],
    correct: "2",
    exptext: "✅ A short gap between jobs is frictional unemployment. 📌 Friction is a short slowdown. ❌ Structural unemployment is wrong because it is long-term and deep-rooted."
  },
  16: {
    type: "concept", icon: "⏳", accent: "#ec4899", pauseTimer: true,
    title: "Under-employment",
    html: `
      <p class="cp-lead">A person is under-employed when he or she works for only part of the year or part of the time. <u>It is also called part-time employment or partial unemployment.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/13.png" alt="Twelve-box year strip: four boxes green labelled Employed, eight boxes grey labelled Idle." data-caption="A seasonal farm worker employed for four months and idle for eight months." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/14.png" alt="Comparison of two clocks: full-time clock fully shaded, part-time clock only partly shaded" data-caption="Under-employment means working less than the available time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Meaning</td><td>Employed for some time in the year and unemployed for the rest</td></tr><tr><td>Also called</td><td>Part-time employment or partial unemployment</td></tr><tr><td>Example</td><td>A seasonal farm worker employed for 4 months and idle for the other 8 months</td></tr></tbody></table>
      <p class="cp-lead">The person does have some work, so he or she is not fully unemployed. But the person wants more work than is available.</p>
      <div class="cp-note trap">Under-employment is not the same as voluntary unemployment. The under-employed person wants more work, but cannot get it.</div>
      <div class="cp-note exam">Key words: part-time, partial unemployment.</div>
    `
  },
  17: {
    questext: "Under-employment is also known as:",
    options: ["Full employment", "Cyclical unemployment", "Partial unemployment", "Voluntary unemployment"],
    correct: "3",
    exptext: "✅ Under-employment is also called part-time employment or partial unemployment. 📌 Under means less than full. ❌ Full employment is wrong because it is the opposite situation."
  },
  18: {
    type: "concept", icon: "🎓", accent: "#06b6d4", pauseTimer: true,
    title: "Voluntary Unemployment and Open Unemployment",
    html: `
      <p class="cp-lead">In voluntary unemployment the person chooses not to work. <u>In open unemployment the person tries hard but does not get a job.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/15.png" alt="Split picture. Left: student at a desk with books at home, labelled Voluntary Unemployment" data-caption="A student preparing at home by choice versus a job seeker who is searching without success." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/16.png" alt="Two arrows: one starting at a person turning away from an offered job, labelled By choice;" data-caption="Voluntary unemployment is by choice, and open unemployment is not by choice." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Voluntary unemployment</th><th>Open unemployment</th></tr></thead><tbody><tr><td>Meaning</td><td>A person chooses to stay unemployed for a specific job or a desired salary</td><td>A person actively and continuously tries for a job but does not get it</td></tr><tr><td>Nature</td><td>By own choice; other available jobs are refused</td><td>Most visible and countable form of unemployment</td></tr><tr><td>Example</td><td>A student at home preparing for government competitive examinations</td><td>A fresh graduate attending many job fairs and interviews without success</td></tr></tbody></table>
      <p class="cp-lead">The deciding question is choice. If the person is refusing work, it is voluntary. If the person is searching but failing, it is open.</p>
      <div class="cp-note trap">A person preparing for a government examination is voluntarily unemployed, even if the person is highly qualified.</div>
      <div class="cp-note exam">Key words: voluntary means by choice; open means openly visible and searching.</div>
    `
  },
  19: {
    questext: "A student who stays at home to prepare for competitive examinations and refuses other jobs is an example of:",
    options: ["Open unemployment", "Cyclical unemployment", "Structural unemployment", "Voluntary unemployment"],
    correct: "4",
    exptext: "✅ The student chooses to stay unemployed, so it is voluntary unemployment. 📌 Voluntary means by choice. ❌ Open unemployment is wrong because the person there is searching but not finding a job."
  },
  20: {
    questext: "Which type of unemployment is the most visible and countable form?",
    options: ["Disguised unemployment", "Under-employment", "Open unemployment", "Voluntary unemployment"],
    correct: "3",
    exptext: "✅ Open unemployment is visible because the person is actively seeking a job. 📌 Open means seen openly. ❌ Disguised unemployment is wrong because it is hidden."
  },
  21: {
    type: "concept", icon: "🧱", accent: "#84cc16", pauseTimer: true,
    title: "Structural Unemployment",
    html: `
      <p class="cp-lead">Structural unemployment is a long-term problem that comes from the way the economy is built. <u>It is deep-rooted and needs reforms to solve.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/17.png" alt="Two mismatched puzzle pieces: left piece labelled Skills of workers, right piece labelled " data-caption="Structural unemployment appears when the skills of workers do not match the jobs available." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Unemployment_and_Poverty/18.png" alt="Pyramid of causes: poor governance, political instability, law and order problems, outdate" data-caption="Deep-rooted problems of the economy can cause long-term unemployment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Cause</td><td>Structural problems in the economy; deep-rooted issues</td></tr><tr><td>Examples of causes</td><td>Mismatch of skills, changing technology, corruption, political instability, law and order problems, poor governance</td></tr><tr><td>Nature</td><td>Long-term and hard to solve; needs structural reforms</td></tr></tbody></table>
      <p class="cp-lead">Think of a factory that shuts down because of new machines. The old workers lose their jobs, and their skills are no longer needed. The economy must change its structure, train workers or create new jobs before they can be employed again.</p>
      <div class="cp-note trap">Structural unemployment is long term, while frictional unemployment is only for a few days.</div>
      <div class="cp-note exam">Key words: long-term, structural reforms.</div>
    `
  },
  22: {
    questext: "Which type of unemployment is long-term in nature and needs structural reforms in the economy?",
    options: ["Frictional unemployment", "Seasonal unemployment", "Voluntary unemployment", "Structural unemployment"],
    correct: "4",
    exptext: "✅ Structural unemployment is deep-rooted and needs reforms. 📌 Structure needs structural change. ❌ Frictional unemployment is wrong because it lasts only for a few days."
  },
  23: {
    questext: "Match the type of unemployment with its key idea:\n1. Cyclical unemployment is linked to boom and recession.\n2. Frictional unemployment is long-term and needs structural reforms.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Cyclical follows the cycle. ❌ Statement 2 is wrong because it describes structural unemployment, not frictional."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Unemployment_and_Poverty/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a crowd of job seekers silhouettes, a few real-looking gold coins and a subtle falling and rising chart line" },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/1.png": { t: "fig", about: "Tree diagram: Unemployment at the top. Left branch Rural: Disguised, Seasonal. Right branch Urban: Industrial, Educated. A third row labelled Other Types: Cyclical, Frictional, Under-employment, Voluntary, Open, Structural." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/2.png": { t: "fig", about: "Mind map with the word Unemployment in the centre and ten small labelled bubbles around it, each with one key word: Zero productivity, Off-season, Skilled idle, Degree holders, Boom and recession, Job switching, Part-time, By choice, Looking but not finding, Systemic." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/3.png": { t: "fig", about: "Farm field with five people working on a small plot. Two are highlighted as needed, three are shown faded and labelled Surplus, with a note Marginal productivity equals zero." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian farmers working together in a small field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Unemployment_and_Poverty/4.png. a photo of several family members working on a small farm",
  "images/General_Awareness/Economics/Unemployment_and_Poverty/5.png": { t: "fig", about: "Calendar-style bar of the year: sowing and harvesting months shown in green labelled Employed, remaining months shown in grey labelled Unemployed." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/6.png": { t: "fig", about: "Two crop seasons side by side: Kharif crop season and Rabi crop season, with a gap between them labelled Off-season idle time." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/7.png": { t: "fig", about: "Split picture. Left: skilled worker with tools standing outside a closed factory gate, labelled Industrial Unemployment. Right: graduate with a degree certificate and cap in an empty office queue, labelled Educated Unemployment." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/8.png": { t: "fig", about: "Two cards. Card 1 Industrial: Area urban, industrial sector, skilled or semi-skilled workers. Card 2 Educated: Area urban India, graduates and post-graduates." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/9.png": { t: "fig", about: "Wave line of the business cycle with Boom at the peak and Recession at the trough. Above the peak an upward arrow with Employment rises. Below the trough a downward arrow with Unemployment rises." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/10.png": { t: "fig", about: "Two-row cause chain. Row 1: GDP growth rate rises, economy expands, employment increases. Row 2: GDP growth rate falls, economy contracts, unemployment increases." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/11.png": { t: "fig", about: "Timeline: Job A ends, short gap labelled Frictional unemployment, Job B begins. A skill development course icon sits in the gap." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/12.png": { t: "fig", about: "Road with two junctions labelled Job A and Job B, a car passing between them with a label Temporary pause." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/13.png": { t: "fig", about: "Twelve-box year strip: four boxes green labelled Employed, eight boxes grey labelled Idle." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/14.png": { t: "fig", about: "Comparison of two clocks: full-time clock fully shaded, part-time clock only partly shaded, labelled Under-employment." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/15.png": { t: "fig", about: "Split picture. Left: student at a desk with books at home, labelled Voluntary Unemployment, by choice. Right: graduate in a long interview queue at a job fair, labelled Open Unemployment, actively searching." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/16.png": { t: "fig", about: "Two arrows: one starting at a person turning away from an offered job, labelled By choice; another starting at a person knocking at closed doors, labelled Not by choice." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/17.png": { t: "fig", about: "Two mismatched puzzle pieces: left piece labelled Skills of workers, right piece labelled Jobs available, a gap between them labelled Structural mismatch." },
  "images/General_Awareness/Economics/Unemployment_and_Poverty/18.png": { t: "fig", about: "Pyramid of causes: poor governance, political instability, law and order problems, outdated skills and technology, leading to Long-term unemployment." }
});

/* CHANGE LOG
   - Structural unemployment is explained as a long-term mismatch between the skills of workers and the jobs available, caused by changes in technology and in the structure of the economy; weak governance is mentioned only as one deep-rooted cause.
   - Only unemployment is covered; the pages supplied contain no poverty topics, so poverty is not included in this build.
*/