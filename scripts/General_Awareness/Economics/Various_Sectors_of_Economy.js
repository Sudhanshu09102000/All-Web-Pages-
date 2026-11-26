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

/* Field: General_Awareness · Subject: Economics · Chapter: Various_Sectors_of_Economy · 6 concept pages (+ overview) · 12 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏚️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Poverty",
    thumb: {
      image: "images/General_Awareness/Economics/Various_Sectors_of_Economy/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "POVERTY",
      line2: "MPI • BPL • COMMITTEES",
      line3: "FULL CHAPTER",
      badge: "COMPLETE",
      ribbon: "NOTES • FACTS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Poverty Complete Chapter | MPI, BPL, Tendulkar, Rangarajan | General Awareness",
      altTitles: ["Poverty Line Committees in One Video for All Government Exams", "Multidimensional Poverty Index and Poverty Committees Made Easy"],
      description: "Poverty is a short and scoring topic of Economics in General Awareness. In this class we learn it step by step in simple words.\n\n📌 IN THIS CLASS\n✅ Absolute and relative poverty\n✅ Multidimensional Poverty Index: 10 indicators\n✅ Alagh, Lakdawala, Tendulkar, Rangarajan and Panagariya\n✅ Rural and urban poverty line numbers\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Poverty #GeneralAwareness #Economics",
      tags: ["poverty in india", "poverty line committees", "tendulkar committee", "rangarajan committee", "alagh committee", "lakdawala committee", "panagariya task force", "multidimensional poverty index", "mpi indicators", "absolute poverty", "relative poverty", "bpl families", "below poverty line", "calorie based poverty line", "poverty tricks", "unemployment and poverty", "economics for ssc", "general awareness", "static gk economics", "government exam economics", "indian economy basics", "niti aayog", "planning commission", "undp mpi", "concept class"],
      hashtags: ["Poverty", "GeneralAwareness", "Economics"],
      thumbText: "POVERTY FULL CHAPTER",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏚️ New class is live: Poverty complete chapter. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Economics — General Awareness Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on poverty</u>: its types, how the Multidimensional Poverty Index works, and how the committees of India drew the poverty line. Numbers, years and committee names are asked directly in exams.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>6</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>12</b><span>Questions</span></div>
        <div class="cp-stat"><b>~24 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Types of Poverty</b><br>The difference between absolute poverty and relative poverty, with where each is found.</li>
        <li><b>Multidimensional Poverty Index</b><br>The ten indicators in three dimensions: health, education and living standard.</li>
        <li><b>Committees for Measuring Poverty</b><br>Who formed which committee, in which year, and which body formed it.</li>
        <li><b>Poverty Line Criteria</b><br>The calorie basis of the Alagh Committee, the daily limit of the Tendulkar Committee and the monthly limit of the Rangarajan Committee.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> The committee table, the rural and urban limits and the count of indicators in the Multidimensional Poverty Index are repeated almost every year.</div>
    `
  },
  2: {
    type: "concept", icon: "🧺", accent: "#22c55e", pauseTimer: true,
    title: "Types of Poverty: Absolute and Relative",
    html: `
      <p class="cp-lead">Poverty can be seen in two ways. <u>Absolute poverty means a family cannot meet its basic needs, while relative poverty compares one group with others in the same society.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/1.png" alt="Two panels. Left: Absolute Poverty with three icons: Food (roti), Clothing (kapda), Shelte" data-caption="Absolute poverty is about unmet basic needs; relative poverty is about the gap between groups." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/2.png" alt="Two world cards. Card 1: Developing nations and Least Developed Countries marked Absolute " data-caption="Absolute poverty is common in poor countries and relative poverty in rich countries." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Absolute poverty</th><th>Relative poverty</th></tr></thead><tbody><tr><td>Meaning</td><td>Very low income families who cannot meet even basic needs</td><td>Poverty measured by income inequality within a society</td></tr><tr><td>Basic idea</td><td>Food, clothing and shelter are not fulfilled</td><td>Basic needs are met but inequality stays high</td></tr><tr><td>Pattern</td><td>Not enough to live on</td><td>Rich, richer, richest: a growing income gap</td></tr><tr><td>Found in</td><td>Developing nations and Least Developed Countries</td><td>Developed or rich countries</td></tr><tr><td>Example</td><td>Below Poverty Line (BPL) families in India</td><td>The poor of a rich country who are better off than many in poor countries</td></tr></tbody></table>
      <p class="cp-lead">Roti, kapda and makan mean food, clothing and shelter. If a family has none of these in enough quantity, it is in absolute poverty. In relative poverty the person has basic needs, but is much poorer than others around.</p>
      <div class="cp-note trap">A poor person in a rich country may live better than a middle-class person in a poor country. Relative poverty is a comparison, not a fixed standard.</div>
      <div class="cp-note exam">Key words: absolute means basic needs; relative means inequality.</div>
    `
  },
  3: {
    questext: "Poverty measured by income inequality within a society is called:",
    options: ["Relative poverty", "Absolute poverty", "Chronic poverty", "Rural poverty"],
    correct: "1",
    exptext: "✅ Relative poverty compares the income of people within the same society. 📌 Relative means comparison. ❌ Absolute poverty is wrong because that is about basic needs."
  },
  4: {
    questext: "Which of the following is an example of absolute poverty in India?",
    options: ["Millionaires with unequal wealth", "Middle-class savers", "Families below the poverty line who cannot meet basic needs", "Large businesses with debt"],
    correct: "2",
    exptext: "✅ Below Poverty Line families cannot meet food, clothing and shelter. 📌 Roti, kapda, makan. ❌ Unequal wealth of millionaires is wrong because that is a matter of inequality."
  },
  5: {
    type: "concept", icon: "🔟", accent: "#f59e0b", pauseTimer: true,
    title: "Multidimensional Poverty Index (MPI)",
    html: `
      <p class="cp-lead">The Multidimensional Poverty Index looks at poverty beyond income. <u>It uses 10 indicators in 3 dimensions: health, education and living standard.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/3.png" alt="Three coloured columns. Health, 2 indicators: Nutrition, Child Mortality. Education, 2 ind" data-caption="The ten indicators of the Multidimensional Poverty Index in three dimensions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/4.png" alt="Equation picture: 2 plus 2 plus 6 equals 10 indicators, with three coloured blocks of size" data-caption="Two health, two education and six living standard indicators make ten in total." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-formula" translate="no"><small>Count of indicators</small>2 (Health) + 2 (Education) + 6 (Living standard) = 10</div>
      <table><thead><tr><th>Dimension</th><th>Number of indicators</th><th>Indicators</th></tr></thead><tbody><tr><td>Health</td><td>2</td><td>Child mortality, nutrition</td></tr><tr><td>Education</td><td>2</td><td>Years of schooling, school attendance</td></tr><tr><td>Living standard</td><td>6</td><td>Drinking water, sanitation, electricity, cooking fuel, housing, assets</td></tr></tbody></table>
      <p class="cp-lead">The index is released by the United Nations Development Programme (UNDP) together with the Oxford Poverty and Human Development Initiative. A person is counted as poor when the person lacks many of these items together, not only money.</p>
      <div class="cp-note trap">Living standard has the most indicators (6), while health and education have two each.</div>
      <div class="cp-note exam">Remember 3 dimensions, 10 indicators, and the split 2 : 2 : 6.</div>
    `
  },
  6: {
    questext: "How many indicators are there in the Multidimensional Poverty Index?",
    options: ["6", "8", "10", "12"],
    correct: "2",
    exptext: "✅ There are 10 indicators in 3 dimensions. 📌 Two plus two plus six. ❌ Eight is wrong because it leaves out two of the living standard indicators."
  },
  7: {
    questext: "Which dimension of the Multidimensional Poverty Index has the maximum number of indicators?",
    options: ["Health", "Education", "Income", "Living standard"],
    correct: "4",
    exptext: "✅ Living standard has six indicators. 📌 Six for the standard of living. ❌ Health is wrong because it has only two indicators."
  },
  8: {
    questext: "Consider the following statements about the Multidimensional Poverty Index:\n1. It is released by the United Nations Development Programme.\n2. It has three dimensions and twelve indicators.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 3 dimensions, 10 indicators. ❌ Statement 2 is wrong because the number of indicators is ten, not twelve."
  },
  9: {
    type: "concept", icon: "🗓️", accent: "#ef4444", pauseTimer: true,
    title: "Committees for Measuring Poverty in India",
    html: `
      <p class="cp-lead">Many committees have been formed to define the poverty line, which is called the BPL line. <u>Most were formed by the Planning Commission, and the last one by NITI Aayog.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/5.png" alt="Timeline with five markers: 1977 Alagh, 1989 Lakdawala, 2005 Tendulkar, 2012 Rangarajan, 2" data-caption="The five poverty line committees arranged by the year they were formed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/6.png" alt="Two-box banner: Planning Commission formed Alagh, Lakdawala, Tendulkar, Rangarajan; NITI A" data-caption="Four committees were formed by the Planning Commission and one by NITI Aayog." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Committee</th><th>Formed</th><th>Report</th><th>Formed by</th></tr></thead><tbody><tr><td>Dr. Y. K. Alagh</td><td>1977</td><td>1979</td><td>Planning Commission</td></tr><tr><td>Lakdawala</td><td>1989</td><td>1993</td><td>Planning Commission</td></tr><tr><td>Suresh Tendulkar</td><td>2005</td><td>2009</td><td>Planning Commission</td></tr><tr><td>C. Rangarajan</td><td>2012</td><td>2014</td><td>Planning Commission</td></tr><tr><td>Arvind Panagariya</td><td>2015</td><td>Not applicable</td><td>NITI Aayog</td></tr></tbody></table>
      <p class="cp-lead">The BPL line is the Below Poverty Line mark. A person whose consumption falls below it is counted as poor. The Lakdawala Committee kept the calorie basis but fixed separate poverty lines for each state. The Panagariya group was the Task Force on Eliminating Poverty of NITI Aayog.</p>
      <div class="cp-note trap">Only the Panagariya group belongs to NITI Aayog. The other four belong to the Planning Commission.</div>
      <div class="cp-note exam">Remember the years: 1977, 1989, 2005, 2012, 2015, and the report years 1979, 1993, 2009, 2014.</div>
    `
  },
  10: {
    questext: "The Tendulkar Committee to measure poverty was formed in which year?",
    options: ["1977", "1989", "2005", "2012"],
    correct: "2",
    exptext: "✅ The Tendulkar Committee was formed in 2005 and gave its report in 2009. 📌 05 formed, 09 reported. ❌ 2012 is wrong because that is the year the Rangarajan Committee was formed."
  },
  11: {
    questext: "Which of the following committees on poverty was formed by NITI Aayog?",
    options: ["Alagh Committee", "Lakdawala Committee", "Panagariya Task Force", "Rangarajan Committee"],
    correct: "2",
    exptext: "✅ The Panagariya group of 2015 was formed under NITI Aayog. 📌 Panagariya came after the Planning Commission. ❌ The Rangarajan Committee is wrong because it was formed by the Planning Commission."
  },
  12: {
    questext: "The Rangarajan Committee gave its report on poverty in which year?",
    options: ["2009", "2011", "2014", "2016"],
    correct: "3",
    exptext: "✅ It was formed in 2012 and gave its report in 2014. 📌 12 formed, 14 reported. ❌ 2009 is wrong because that is the report year of the Tendulkar Committee."
  },
  13: {
    type: "concept", icon: "🍞", accent: "#8b5cf6", pauseTimer: true,
    title: "Poverty Line: Calorie Basis (Alagh Committee)",
    html: `
      <p class="cp-lead">The Alagh Committee defined the poverty line by the food energy a person eats. <u>A person who eats fewer calories than the limit is counted as Below Poverty Line.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/7.png" alt="Two bowls. Rural bowl labelled 2400 calories per day per person. Urban bowl labelled 2100 " data-caption="The calorie limits for rural and urban India under the calorie basis." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/8.png" alt="Arrow line: calorie intake per day per person, with a mark at the limit. Left of the mark " data-caption="A person below the calorie limit is counted as Below Poverty Line." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Area</th><th>Calories per day per person</th></tr></thead><tbody><tr><td>Rural India</td><td>2400</td></tr><tr><td>Urban India</td><td>2100</td></tr></tbody></table>
      <p class="cp-lead">Rural people do heavy physical work, such as farming, so their calorie limit is higher. Urban people work less physically, so the limit is lower.</p>
      <div class="cp-note trap">Rural is 2400 and urban is 2100. Do not swap them, because the rural limit is higher.</div>
      <div class="cp-note exam">Key words: calorie basis, 2400 rural, 2100 urban.</div>
    `
  },
  14: {
    questext: "According to the calorie basis of the Alagh Committee, what is the poverty line for rural India per person per day?",
    options: ["2100 calories", "2700 calories", "2000 calories", "2400 calories"],
    correct: "4",
    exptext: "✅ The rural limit is 2400 calories per day per person. 📌 Rural is higher because of heavy work. ❌ 2100 is wrong because that is the urban limit."
  },
  15: {
    type: "concept", icon: "📅", accent: "#14b8a6", pauseTimer: true,
    title: "Poverty Line: Per Day Basis (Tendulkar Committee)",
    html: `
      <p class="cp-lead">The Tendulkar Committee fixed the poverty line by the money a person spends each day. <u>The rural limit is 27 rupees and the urban limit is 33 rupees per day.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/9.png" alt="Two price tags. Rural India: 27 rupees per day per person, below this BPL. Urban India: 33" data-caption="The Tendulkar Committee limits for rural and urban India per day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/10.png" alt="Comparison bar: urban bar taller than rural bar with labels 33 and 27 rupees." data-caption="The urban limit is higher than the rural limit because city prices are higher." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Area</th><th>Limit per day per person (2011-12 prices)</th></tr></thead><tbody><tr><td>Rural India</td><td>27 rupees</td></tr><tr><td>Urban India</td><td>33 rupees</td></tr></tbody></table>
      <p class="cp-lead">This limit is based on spending per person on consumption. It is higher in cities because things cost more in cities.</p>
      <div class="cp-note trap">In this committee, the urban limit is higher than the rural limit, which is the opposite of the calorie rule of the Alagh Committee.</div>
      <div class="cp-note exam">Key words: per day, 27 rural, 33 urban.</div>
    `
  },
  16: {
    questext: "According to the Tendulkar Committee, the poverty line for urban India is:",
    options: ["27 rupees per day", "47 rupees per day", "33 rupees per day", "972 rupees per day"],
    correct: "3",
    exptext: "✅ The urban limit is 33 rupees per person per day. 📌 City costs more: 33 beats 27. ❌ 27 rupees is wrong because that is the rural limit."
  },
  17: {
    type: "concept", icon: "🗒️", accent: "#3b82f6", pauseTimer: true,
    title: "Poverty Line: Monthly Basis (Rangarajan Committee)",
    html: `
      <p class="cp-lead">The Rangarajan Committee fixed the poverty line by the money a person spends each month. <u>The rural limit is 972 rupees and the urban limit is 1407 rupees per month.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/11.png" alt="Two wallet cards. Rural India: 972 rupees per month per person. Urban India: 1407 rupees p" data-caption="The Rangarajan Committee monthly limits for rural and urban India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Various_Sectors_of_Economy/12.png" alt="Staircase of three committees: Alagh calorie basis, Tendulkar per day basis, Rangarajan pe" data-caption="Three committees used three different bases to set the poverty line." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Area</th><th>Limit per month per person (2011-12 prices)</th></tr></thead><tbody><tr><td>Rural India</td><td>972 rupees</td></tr><tr><td>Urban India</td><td>1407 rupees</td></tr></tbody></table>
      <table><thead><tr><th>Committee</th><th>Basis</th><th>Rural</th><th>Urban</th></tr></thead><tbody><tr><td>Alagh</td><td>Calories per day</td><td>2400</td><td>2100</td></tr><tr><td>Tendulkar</td><td>Spending per day</td><td>27 rupees</td><td>33 rupees</td></tr><tr><td>Rangarajan</td><td>Spending per month</td><td>972 rupees</td><td>1407 rupees</td></tr></tbody></table>
      <p class="cp-lead">Spending per month is simply the daily limit seen over a month, which suits how most households plan their budgets.</p>
      <div class="cp-note trap">Do not mix the three bases. Calories belong to Alagh, per day to Tendulkar and per month to Rangarajan.</div>
      <div class="cp-note exam">Remember 972 rural and 1407 urban for Rangarajan.</div>
    `
  },
  18: {
    questext: "What is the rural poverty line per person per month according to the Rangarajan Committee?",
    options: ["972 rupees", "1407 rupees", "816 rupees", "1000 rupees"],
    correct: "1",
    exptext: "✅ The rural limit is 972 rupees per month. 📌 Nine-seven-two for the village. ❌ 1407 rupees is wrong because that is the urban limit."
  },
  19: {
    questext: "Match the committee with its basis of the poverty line:\n1. Alagh Committee used calorie intake per day.\n2. Rangarajan Committee used calorie intake per day.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Alagh equals calories. ❌ Statement 2 is wrong because the Rangarajan Committee used spending per month."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a simple village house, a few real-looking gold coins and a subtle rising chart line" },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/1.png": { t: "fig", about: "Two panels. Left: Absolute Poverty with three icons: Food (roti), Clothing (kapda), Shelter (makan), crossed out as not fulfilled. Right: Relative Poverty with a staircase of Rich, Richer, Richest and a growing gap." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/2.png": { t: "fig", about: "Two world cards. Card 1: Developing nations and Least Developed Countries marked Absolute poverty. Card 2: Developed and rich countries marked Relative poverty." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/3.png": { t: "fig", about: "Three coloured columns. Health, 2 indicators: Nutrition, Child Mortality. Education, 2 indicators: Years of Schooling, School Attendance. Living Standard, 6 indicators: Water, Sanitation, Electricity, Cooking Fuel, Housing, Assets." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/4.png": { t: "fig", about: "Equation picture: 2 plus 2 plus 6 equals 10 indicators, with three coloured blocks of size 2, 2 and 6." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/5.png": { t: "fig", about: "Timeline with five markers: 1977 Alagh, 1989 Lakdawala, 2005 Tendulkar, 2012 Rangarajan, 2015 Panagariya." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/6.png": { t: "fig", about: "Two-box banner: Planning Commission formed Alagh, Lakdawala, Tendulkar, Rangarajan; NITI Aayog formed Panagariya." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/7.png": { t: "fig", about: "Two bowls. Rural bowl labelled 2400 calories per day per person. Urban bowl labelled 2100 calories per day per person." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/8.png": { t: "fig", about: "Arrow line: calorie intake per day per person, with a mark at the limit. Left of the mark labelled Below this: BPL." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/9.png": { t: "fig", about: "Two price tags. Rural India: 27 rupees per day per person, below this BPL. Urban India: 33 rupees per day per person, below this BPL." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/10.png": { t: "fig", about: "Comparison bar: urban bar taller than rural bar with labels 33 and 27 rupees." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/11.png": { t: "fig", about: "Two wallet cards. Rural India: 972 rupees per month per person. Urban India: 1407 rupees per month per person. Both say Below this: BPL." },
  "images/General_Awareness/Economics/Various_Sectors_of_Economy/12.png": { t: "fig", about: "Staircase of three committees: Alagh calorie basis, Tendulkar per day basis, Rangarajan per month basis." }
});

/* CHANGE LOG
   - Multidimensional Poverty Index is released by the United Nations Development Programme together with the Oxford Poverty and Human Development Initiative. The education indicators are years of schooling and school attendance, and the health indicators are nutrition and child mortality.
   - Tendulkar and Rangarajan limits are described as based on spending per person at 2011-12 prices.
   - Lakdawala Committee sentence added (state-wise poverty lines on the calorie basis) to complete the committee list.
   - The Panagariya group is described as the Task Force on Eliminating Poverty of NITI Aayog.
*/