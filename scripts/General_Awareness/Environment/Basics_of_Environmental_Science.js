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

/* Field: General_Science · Subject: Environmental_Science · Chapter: Basics_of_Environmental_Science · 10 concept pages (+ overview) · 25 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌍", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Basics of Environmental Science",
    thumb: {
      image: "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "ENVIRONMENTAL SCIENCE",
      line2: "ECOSYSTEM BASICS",
      line3: "FOOD CHAIN & PYRAMIDS",
      badge: "PART 1",
      ribbon: "FACTS • DIAGRAMS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Ecosystem, Food Chain & Ecological Pyramids | Environmental Science for SSC & Railway",
      altTitles: ["Ecosystem Basics for SSC CGL in One Class", "Food Chain, Food Web and Pyramids Made Easy"],
      description: "Environmental Science is a scoring part of General Science. In this class you learn the basics step by step, in very simple words.\n\n📌 IN THIS CLASS\n✅ Environment and ecology: who coined the terms\n✅ Ecosystem and its types, abiotic and biotic parts\n✅ Composition of the atmosphere\n✅ Producers, consumers and decomposers\n✅ Food chain, food web and energy flow\n✅ Ecological pyramids of energy, biomass and numbers\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #EnvironmentalScience #GeneralScience",
      tags: ["environmental science", "ecosystem for ssc cgl", "environment and ecology", "food chain and food web", "ecological pyramids", "abiotic and biotic components", "composition of atmosphere", "general science for ssc", "environment for railway exams", "ecology basics", "who coined ecosystem", "ernst haeckel ecology", "tansley ecosystem 1935", "pyramid of energy", "pyramid of biomass", "pyramid of numbers", "energy flow in ecosystem", "ecological balance", "hydrosphere lithosphere", "ssc cgl general science", "ssc chsl environment", "SSC CGL"],
      hashtags: ["SSCCGL", "EnvironmentalScience", "GeneralScience"],
      thumbText: "ECOSYSTEM + FOOD CHAIN + PYRAMIDS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🌍 New class is live: Ecosystem, Food Chain and Ecological Pyramids. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Environmental Science — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how nature is organised</u>: the environment, the ecosystem, its living and non-living parts, and how food and energy move through it. These ideas are asked again and again in General Science questions.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>10</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>25</b><span>Questions</span></div>
        <div class="cp-stat"><b>~45 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Environment and Ecology</b><br>What the environment is, what ecology studies, and who first used these words.</li>
        <li><b>Ecosystem and Its Types</b><br>How living things and non-living things work together as one unit, and the natural and human-made kinds of ecosystem.</li>
        <li><b>Abiotic Components</b><br>The six non-living groups of an ecosystem, from soil and rocks to water and air.</li>
        <li><b>Composition of the Atmosphere</b><br>Which gases make up the air and how much of each gas there is.</li>
        <li><b>Producers</b><br>How green plants make their own food and why every food chain starts with them.</li>
        <li><b>Consumers</b><br>How herbivores, carnivores and omnivores get their food.</li>
        <li><b>Decomposers</b><br>How bacteria and fungi clean up dead matter and return nutrients to the soil.</li>
        <li><b>Food Chain and Food Web</b><br>How food passes from one living thing to the next, and how chains link into a web.</li>
        <li><b>Energy Flow and Ecological Balance</b><br>Why energy moves in one direction only and what keeps nature in balance.</li>
        <li><b>Ecological Pyramids</b><br>The pyramids of energy, biomass and numbers, and which of them can be upside down.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> General Science papers in Staff Selection Commission, Railway and other exams repeat these facts every year: who coined which term, the share of each gas in air, and which pyramid is always upright.</div>
    `
  },
  2: {
    type: "concept", icon: "🌍", accent: "#0ea5e9", pauseTimer: true,
    title: "Environment and Ecology",
    html: `
      <p class="cp-lead">The <b>environment</b> is everything around us, whether it is alive or not. It includes land, water, air, plants and animals. <u>Every living thing depends on its environment to survive.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/1.png" alt="World Environment Day celebration tree planting photo" data-caption="People plant young trees to mark World Environment Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/2.png" alt="A circle labelled Environment with four small pictures around it: Land, Water, Air, Plants" data-caption="The environment is made of land, water, air, plants and animals." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Ecology</b> is the branch of science that studies how living things are connected to each other and to their surroundings. The word ecology was first used by the German scientist Ernst Haeckel.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Environment</td><td>Everything around us, living and non-living</td></tr><tr><td>Ecology</td><td>The study of how living things relate to each other and to their surroundings</td></tr><tr><td>World Environment Day</td><td>Celebrated every year on 5 June</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A pond has fish, plants and water. The pond is the environment. Ecology studies how the fish, plants and water depend on one another.</div>
      <div class="cp-note trap">Do not mix up the two words. The environment is the surroundings themselves, while ecology is the science that studies them.</div>
      <div class="cp-note exam">Two facts are asked often: Ernst Haeckel coined the word ecology, and World Environment Day is on 5 June.</div>
    `
  },
  3: {
    questext: "The term ecology was coined by",
    options: ["Ernst Haeckel", "Arthur George Tansley", "Charles Darwin", "Salim Ali"],
    correct: "1",
    exptext: "✅ Ernst Haeckel first used the word ecology. 📌 Remember: Haeckel for ecology, Tansley for ecosystem. ❌ Arthur George Tansley is tempting, but he coined the word ecosystem, not ecology."
  },
  4: {
    questext: "World Environment Day is celebrated every year on",
    options: ["22 April", "5 June", "22 May", "2 February"],
    correct: "2",
    exptext: "✅ World Environment Day falls on 5 June. 📌 Think of \"five-six\", the fifth day of the sixth month. ❌ 22 April is Earth Day, 22 May is the International Day for Biodiversity and 2 February is World Wetlands Day."
  },
  5: {
    type: "concept", icon: "🌳", accent: "#22c55e", pauseTimer: true,
    title: "Ecosystem and Its Types",
    html: `
      <p class="cp-lead">An <b>ecosystem</b> is a structural and functional unit of nature. In it, living things interact with each other and also with the non-living surroundings. <u>Living and non-living parts work together as one team.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/3.png" alt="A large rounded box labelled Ecosystem, split into two halves: Biotic (living) and Abiotic" data-caption="An ecosystem joins the living and non-living parts of an area." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/4.png" alt="pond ecosystem fish water plants photo" data-caption="A pond ecosystem with water plants, fish and sunlight." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The word ecosystem was coined by Arthur George Tansley in 1935. Every ecosystem has two kinds of parts: <b>biotic</b> (all living organisms) and <b>abiotic</b> (all non-living parts).</p>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Terrestrial</td><td>Ecosystem on land</td><td>Forest, grassland, desert</td></tr><tr><td>Aquatic</td><td>Ecosystem in water</td><td>Pond, river, lake, ocean</td></tr><tr><td>Human-made</td><td>Built and looked after by people</td><td>Aquarium, zoo, botanical garden, agricultural field, orchard</td></tr></tbody></table>
      <p class="cp-lead">Natural ecosystems form on their own, without human help. Human-made ecosystems are created and managed by people, so they need constant care.</p>
      <div class="cp-example"><b>Example:</b> A fish aquarium has fish, plants, water and light, just like a small pond. But people feed the fish and clean the tank, so it is a human-made ecosystem.</div>
      <div class="cp-note trap">A zoo, an orchard and an agricultural field look natural, but they are human-made ecosystems.</div>
      <div class="cp-note exam">The year 1935 and the name Arthur George Tansley go together with the word ecosystem.</div>
    `
  },
  6: {
    questext: "The term ecosystem was coined by",
    options: ["Ernst Haeckel in 1935", "Arthur George Tansley in 1866", "Arthur George Tansley in 1935", "Ernst Haeckel in 1866"],
    correct: "3",
    exptext: "✅ Arthur George Tansley coined the word ecosystem in 1935. 📌 Tansley has the ecosystem, Haeckel has ecology. ❌ Ernst Haeckel is the right person for ecology, and 1866 belongs to him, not to Tansley."
  },
  7: {
    questext: "Which of the following is a human-made ecosystem?",
    options: ["Tropical forest", "Ocean", "Grassland", "Botanical garden"],
    correct: "4",
    exptext: "✅ A botanical garden is planned, planted and looked after by people. 📌 If people build and maintain it, it is human-made. ❌ A forest, an ocean and a grassland form on their own in nature."
  },
  8: {
    questext: "Consider the following statements about an ecosystem:\n1. An ecosystem has both biotic and abiotic components.\n2. A zoo is a natural ecosystem.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because every ecosystem has living and non-living parts. 📌 A zoo is built and managed by people. ❌ Statement 2 is wrong because a zoo is a human-made ecosystem."
  },
  9: {
    type: "concept", icon: "🪨", accent: "#f59e0b", pauseTimer: true,
    title: "Abiotic Components",
    html: `
      <p class="cp-lead"><b>Abiotic components</b> are the non-living parts of an ecosystem. <u>They are grouped into six categories.</u> Sun, water, soil and air all belong here.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/5.png" alt="Mind-map with centre Abiotic Components and six branches: Inorganic substances, Organic su" data-caption="The six groups of abiotic components in an ecosystem." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/6.png" alt="rocky mountain landscape with soil and sky photo" data-caption="Rocks, soil, water and air together form the non-living part of nature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Group</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Inorganic substances</td><td>Non-living chemical substances</td><td>Carbon dioxide, nitrogen, oxygen, phosphorus, sulphur, water, rock, soil, minerals</td></tr><tr><td>Organic substances</td><td>Substances made by living things</td><td>Carbohydrates, proteins, lipids, humic substances</td></tr><tr><td>Physical factors</td><td>Conditions that affect growth of organisms</td><td>Sunlight, temperature, rainfall, humidity, pressure</td></tr><tr><td>Lithosphere</td><td>Outermost solid part of Earth, made of rocks and minerals, covered by a thin layer of soil</td><td>Rocks, soil</td></tr><tr><td>Hydrosphere</td><td>All the water on Earth, covering about 70 percent of its surface</td><td>Oceans, lakes, seas, clouds</td></tr><tr><td>Atmosphere</td><td>The blanket of gases around Earth</td><td>Nitrogen, oxygen</td></tr></tbody></table>
      <p class="cp-lead">Physical factors matter because they decide where a plant or animal can grow. A cactus needs little rain, but a rice plant needs a lot of water.</p>
      <div class="cp-note trap">Water, soil and rock are not alive, so they are abiotic even though living things cannot live without them.</div>
      <div class="cp-note exam">The hydrosphere covers about 70 percent of the surface of Earth. This number is asked often.</div>
    `
  },
  10: {
    questext: "Which of the following is NOT an abiotic component of an ecosystem?",
    options: ["Sunlight", "Fungi", "Rainfall", "Minerals"],
    correct: "2",
    exptext: "✅ Fungi are living organisms, so they are biotic. 📌 Abiotic means without life. ❌ Sunlight, rainfall and minerals are all non-living parts of the ecosystem."
  },
  11: {
    questext: "The hydrosphere covers approximately how much of the surface of Earth?",
    options: ["30 percent", "50 percent", "70 percent", "90 percent"],
    correct: "3",
    exptext: "✅ Water covers about 70 percent of the surface of Earth. 📌 Think of oceans as about seven parts in ten. ❌ 30 percent is close to the share of land, not water."
  },
  12: {
    questext: "Which of the following is a physical factor in an ecosystem?",
    options: ["Protein", "Phosphorus", "Humic substance", "Humidity"],
    correct: "4",
    exptext: "✅ Humidity is a condition of the air that affects living things, so it is a physical factor. 📌 Physical factors are sunlight, temperature, rainfall, humidity and pressure. ❌ Protein and humic substances are organic, and phosphorus is inorganic."
  },
  13: {
    type: "concept", icon: "🌫️", accent: "#06b6d4", pauseTimer: true,
    title: "Composition of the Atmosphere",
    html: `
      <p class="cp-lead">The <b>atmosphere</b> is a mixture of gases, water vapour and dust particles. It is held close to Earth by the pull of gravity. <u>Two gases, nitrogen and oxygen, make almost all of it.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/7.png" alt="A donut chart of air: Nitrogen 78 percent, Oxygen 21 percent, Argon 0.93 percent, Other ga" data-caption="Air is mostly nitrogen and oxygen; all other gases are a thin slice." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/8.png" alt="Earth atmosphere thin blue layer from space photo" data-caption="The thin blue layer of the atmosphere seen from space." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Gas</th><th>Share in air</th></tr></thead><tbody><tr><td>Nitrogen</td><td>78 percent</td></tr><tr><td>Oxygen</td><td>21 percent</td></tr><tr><td>Argon</td><td>0.93 percent</td></tr><tr><td>Carbon dioxide</td><td>About 0.04 percent</td></tr><tr><td>Neon</td><td>0.0018 percent</td></tr><tr><td>Helium</td><td>0.0005 percent</td></tr><tr><td>Ozone</td><td>0.00006 percent</td></tr><tr><td>Hydrogen</td><td>0.00005 percent</td></tr></tbody></table>
      <p class="cp-lead">Nitrogen and oxygen are the permanent gases of the atmosphere. Together they make 99 percent of the air, and their shares stay almost the same everywhere. All the other gases share the last one percent.</p>
      <div class="cp-example"><b>Example:</b> Add the two big shares: 78 plus 21 equals 99. So only 1 percent of the air is left for argon, carbon dioxide and all other gases.</div>
      <div class="cp-note tip">Nitrogen is the most abundant gas in the air, and the atmosphere is the largest storehouse of nitrogen. Bacteria in the roots of some plants fix this nitrogen for the plant.</div>
      <div class="cp-note trap">Argon, not carbon dioxide, is the third most abundant gas in the air. Carbon dioxide is much smaller.</div>
    `
  },
  14: {
    questext: "Which gas is present in the largest amount in the atmosphere of Earth?",
    options: ["Nitrogen", "Oxygen", "Argon", "Carbon dioxide"],
    correct: "1",
    exptext: "✅ Nitrogen makes about 78 percent of the air. 📌 Nitrogen is first, oxygen is second. ❌ Oxygen is tempting because we breathe it, but it is only about 21 percent."
  },
  15: {
    questext: "Together, nitrogen and oxygen make up approximately what share of the atmosphere?",
    options: ["90 percent", "99 percent", "78 percent", "100 percent"],
    correct: "2",
    exptext: "✅ Nitrogen is 78 percent and oxygen is 21 percent, which add up to 99 percent. 📌 Add 78 and 21. ❌ 100 percent is wrong because argon and other gases fill the last one percent."
  },
  16: {
    type: "concept", icon: "🌱", accent: "#84cc16", pauseTimer: true,
    title: "Producers",
    html: `
      <p class="cp-lead"><b>Producers</b> are living things that make their own food by photosynthesis. They are also called <b>autotrophs</b>, which means "self-feeders". <u>Green plants and trees are the main producers.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/9.png" alt="Photosynthesis picture: a green leaf in the centre, arrows in from Sunlight, Water and Car" data-caption="A leaf uses sunlight, water and carbon dioxide to make food and oxygen." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/10.png" alt="green paddy field in sunlight photo" data-caption="A green crop field where plants make food using sunlight." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Green plants take water and nutrients from the soil and carbon dioxide from the air. Then they capture energy from sunlight and use it to turn these into food.</p>
      <table><thead><tr><th>What the plant needs</th><th>Where it comes from</th></tr></thead><tbody><tr><td>Water and nutrients</td><td>Soil</td></tr><tr><td>Carbon dioxide</td><td>Air</td></tr><tr><td>Energy</td><td>Sunlight</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A mango tree needs no one to feed it. It makes its own food in its leaves, and then the fruit and leaves feed insects, birds and people.</div>
      <div class="cp-note trap">Animals cannot make food from sunlight, so they are never producers. Only green plants and similar organisms are.</div>
      <div class="cp-note exam">Every food chain starts with producers.</div>
    `
  },
  17: {
    questext: "Organisms that make their own food are called",
    options: ["Consumers", "Heterotrophs", "Autotrophs", "Decomposers"],
    correct: "3",
    exptext: "✅ Autotrophs, also called producers, make their own food. 📌 Auto means self. ❌ Heterotrophs depend on others for food, so they are the opposite."
  },
  18: {
    questext: "Which of the following is needed by green plants to make food?",
    options: ["Sunlight, water and carbon dioxide", "Oxygen, nitrogen and soil only", "Dead plants and bacteria", "Meat and milk"],
    correct: "1",
    exptext: "✅ Plants use sunlight, water and carbon dioxide in photosynthesis. 📌 Light, water and air make plant food. ❌ Oxygen and soil alone are not enough, because plants need energy from the sun."
  },
  19: {
    type: "concept", icon: "🐄", accent: "#ef4444", pauseTimer: true,
    title: "Consumers",
    html: `
      <p class="cp-lead"><b>Consumers</b> cannot make their own food, so they eat food made by producers, or they eat other animals. They are called <b>heterotrophs</b>. <u>There are three kinds: herbivores, carnivores and omnivores.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/11.png" alt="Three boxes in a row: Herbivore eats plants, Carnivore eats animals, Omnivore eats both pl" data-caption="Herbivores eat plants, carnivores eat animals and omnivores eat both." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/12.png" alt="deer grazing grass photo" data-caption="A deer grazing on grass is a herbivore." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/13.png" alt="eagle hunting prey photo" data-caption="An eagle hunts other animals, so it is a carnivore." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>What it eats</th><th>Examples</th></tr></thead><tbody><tr><td>Herbivores (primary consumers)</td><td>Plants</td><td>Cow, goat, horse, deer, rhinoceros, sheep, rabbit</td></tr><tr><td>Carnivores</td><td>Other animals, often herbivores</td><td>Spider, eagle, owl, cat, snake, lizard</td></tr><tr><td>Omnivores</td><td>Both plants and animals</td><td>Chicken, crow, human, bear, pig</td></tr></tbody></table>
      <p class="cp-lead">Herbivores are the first eaters of plant food, so they are called primary consumers. Carnivores that eat herbivores are called secondary consumers.</p>
      <div class="cp-example"><b>Example:</b> In the chain grass, rabbit, snake, the grass is the producer, the rabbit is the primary consumer and the snake is the secondary consumer.</div>
      <div class="cp-mnemonic">Herbivore eats herbs, carnivore eats carcass (meat), omnivore eats everything.</div>
      <div class="cp-note trap">Humans eat both plants and animal products, so humans are omnivores, not herbivores.</div>
    `
  },
  20: {
    questext: "Which of the following animals is an omnivore?",
    options: ["Cow", "Eagle", "Deer", "Crow"],
    correct: "4",
    exptext: "✅ A crow eats grains, fruits, insects and small animals, so it is an omnivore. 📌 Omnivores eat both plants and animals. ❌ Cow and deer eat only plants, and an eagle eats only animals."
  },
  21: {
    questext: "Primary consumers in a food chain are",
    options: ["Carnivores", "Herbivores", "Decomposers", "Producers"],
    correct: "2",
    exptext: "✅ Herbivores eat plants directly, so they are the first level of consumers. 📌 Primary means first eaters of plants. ❌ Carnivores come next, as secondary consumers."
  },
  22: {
    questext: "Consider the following statements about consumers:\n1. Consumers depend on food made by autotrophs.\n2. A rabbit is a secondary consumer.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because all consumers depend on producers, directly or through other animals. 📌 A rabbit eats plants. ❌ Statement 2 is wrong because a rabbit is a primary consumer."
  },
  23: {
    type: "concept", icon: "🍄", accent: "#a855f7", pauseTimer: true,
    title: "Decomposers",
    html: `
      <p class="cp-lead"><b>Decomposers</b> are living things that break down the bodies of dead plants and animals. <u>Bacteria and fungi are the main decomposers.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/14.png" alt="A circular cycle of four boxes with arrows: Dead plants and animals, Decomposers, Nutrient" data-caption="Decomposers turn dead matter into nutrients that plants use again." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/15.png" alt="mushrooms growing on rotting log photo" data-caption="Fungi growing on a rotting log break down dead wood." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">When a plant or animal dies, decomposers feed on it and break it into simple substances. These substances go back into the soil, and new plants take them up again.</p>
      <table><thead><tr><th>Decomposer</th><th>Role</th></tr></thead><tbody><tr><td>Bacteria</td><td>Break down dead plants and animals</td></tr><tr><td>Fungi</td><td>Break down dead plants and animals</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A fallen leaf slowly turns into soil. Fungi and bacteria are doing this work, and the nutrients help the next plant grow.</div>
      <div class="cp-note tip">The earthworm is called the farmer's friend, because it loosens and enriches the soil.</div>
      <div class="cp-note trap">Decomposers are not producers or consumers. They work on dead matter, not on living food.</div>
    `
  },
  24: {
    questext: "Which of the following are decomposers?",
    options: ["Green plants and trees", "Cow and goat", "Bacteria and fungi", "Eagles and owls"],
    correct: "3",
    exptext: "✅ Bacteria and fungi break down dead plants and animals. 📌 Decomposers are the cleaners of nature. ❌ Green plants are producers, and the animals are consumers."
  },
  25: {
    questext: "What would most likely happen if all decomposers disappeared from an ecosystem?",
    options: ["More oxygen would be made", "Plants would grow faster", "Herbivores would increase", "Dead matter would pile up and soil would lose nutrients"],
    correct: "4",
    exptext: "✅ Without decomposers, dead bodies would not break down and nutrients would not return to the soil. 📌 No decomposers means no recycling. ❌ Plants would not grow faster, because they would run short of nutrients."
  },
  26: {
    type: "concept", icon: "🔗", accent: "#ec4899", pauseTimer: true,
    title: "Food Chain and Food Web",
    html: `
      <p class="cp-lead">A <b>food chain</b> is a series of living things in which each one depends on the next one as food. <u>Every food chain starts with producers.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/16.png" alt="A vertical flow in rounded boxes: Water, minerals, sunlight and carbon dioxide; Producers " data-caption="A food chain begins with producers and ends with decomposers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/17.png" alt="A food web: Grass, Grasshopper, Rabbit, Frog, Snake, Eagle, with many crossing arrows show" data-caption="In a food web, several food chains cross and link together." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Trophic level</th><th>Type of organism</th><th>Example</th></tr></thead><tbody><tr><td>First</td><td>Producer</td><td>Grass</td></tr><tr><td>Second</td><td>Primary consumer</td><td>Grasshopper</td></tr><tr><td>Third</td><td>Secondary consumer</td><td>Frog</td></tr><tr><td>Fourth</td><td>Tertiary consumer</td><td>Snake</td></tr></tbody></table>
      <p class="cp-lead">Each step of a food chain is called a trophic level. Trophic levels are formed by different organisms linked together in a food chain.</p>
      <p class="cp-lead">In real nature, one animal usually eats many kinds of food. So food chains join together into a <b>food web</b>, which is an interlinked arrangement of food chains. <u>A food web is safer for nature, because if one food runs short, an animal can eat another.</u></p>
      <div class="cp-example"><b>Example:</b> A frog eats grasshoppers, but it can also eat beetles. If grasshoppers become few, the frog does not starve.</div>
      <div class="cp-note trap">A food chain is a single line. A food web is many chains joined together.</div>
      <div class="cp-note exam">Remember the order: producer, primary consumer, secondary consumer, tertiary consumer, then decomposers.</div>
    `
  },
  27: {
    questext: "A food chain always begins with",
    options: ["Herbivores", "Producers", "Carnivores", "Decomposers"],
    correct: "2",
    exptext: "✅ Producers make food from sunlight, so every chain starts with them. 📌 No producers means no food. ❌ Herbivores come second, because they eat the plants."
  },
  28: {
    questext: "A food web is best described as",
    options: ["An interlinked arrangement of food chains", "A single series of eaters", "A group of producers only", "A chain of decomposers"],
    correct: "1",
    exptext: "✅ A food web is made when many food chains link together. 📌 Chain is one line, web is many lines. ❌ A single series of eaters is a food chain, not a food web."
  },
  29: {
    questext: "In the food chain grass, grasshopper, frog, snake, the frog is a",
    options: ["Producer", "Primary consumer", "Secondary consumer", "Decomposer"],
    correct: "3",
    exptext: "✅ The frog eats the grasshopper, which is a herbivore, so the frog is a secondary consumer. 📌 Count the eaters: grasshopper first, frog second. ❌ The grasshopper is the primary consumer."
  },
  30: {
    type: "concept", icon: "⚡", accent: "#14b8a6", pauseTimer: true,
    title: "Energy Flow and Ecological Balance",
    html: `
      <p class="cp-lead">Energy in an ecosystem always moves in <b>one direction</b>. It starts from sunlight, goes to the producers, then to herbivores, then to carnivores and then to top carnivores. <u>It never goes back.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/18.png" alt="Left to right arrows: Sunlight, Producers, Herbivores, Carnivores, Top carnivores. Boxes g" data-caption="Energy passes from sunlight to producers and then to each higher level." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/19.png" alt="sunlight through green forest canopy photo" data-caption="Sunlight reaching the leaves of a forest is the source of energy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">At every step, living things use up most of the energy to move, grow and keep warm. Only a small part is left to pass on. So the energy available gets smaller at each higher level.</p>
      <p class="cp-lead"><b>Ecological balance</b> is a steady, equal state between living things, such as human beings, plants and animals, and their environment. <u>When one group becomes too many or too few, the balance is disturbed.</u></p>
      <div class="cp-example"><b>Example:</b> If people kill too many snakes, rats increase and eat the crops. Farmers lose their food, and the balance of the area is broken.</div>
      <div class="cp-note trap">Energy moves in one direction only, but nutrients go round and round, because decomposers return them to the soil.</div>
      <div class="cp-note exam">The word unidirectional is the key word for energy flow.</div>
    `
  },
  31: {
    questext: "The flow of energy in an ecosystem is",
    options: ["Cyclic", "Two-way", "Random", "Unidirectional"],
    correct: "4",
    exptext: "✅ Energy goes in one direction, from sunlight to producers and then to consumers. 📌 Unidirectional means one way. ❌ Cyclic is the path of nutrients, not of energy."
  },
  32: {
    questext: "Which of the following shows the correct order of energy flow?",
    options: ["Sunlight, herbivores, producers, carnivores", "Sunlight, producers, herbivores, carnivores", "Producers, sunlight, herbivores, carnivores", "Carnivores, herbivores, producers, sunlight"],
    correct: "2",
    exptext: "✅ Producers capture sunlight first, herbivores eat the producers, and carnivores eat the herbivores. 📌 Sun, plants, plant eaters, meat eaters. ❌ Option 4 is the reverse order, which energy never follows."
  },
  33: {
    type: "concept", icon: "🔺", accent: "#8b5cf6", pauseTimer: true,
    title: "Ecological Pyramids",
    html: `
      <p class="cp-lead">An <b>ecological pyramid</b> is a picture that shows the relationship between organisms at different levels of an ecosystem. <u>There are three types: pyramid of energy, pyramid of biomass and pyramid of numbers.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/20.png" alt="Three small pyramids side by side: Energy (always upright), Biomass (upright on land, may " data-caption="The three types of ecological pyramids and their shapes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Basics_of_Environmental_Science/21.png" alt="phytoplankton under microscope photo" data-caption="Tiny floating algae, which are the producers of ponds and oceans." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Pyramid</th><th>What it shows</th><th>Shape</th></tr></thead><tbody><tr><td>Energy</td><td>Amount of energy at each trophic level</td><td>Always upright</td></tr><tr><td>Biomass</td><td>Total mass of living matter at each level</td><td>Upright on land, may be inverted in water</td></tr><tr><td>Numbers</td><td>Number of organisms at each level</td><td>Can be upright or inverted</td></tr></tbody></table>
      <p class="cp-lead">The pyramid of energy is always upright, because energy decreases at each level as it moves up. Biomass means the total mass of all organisms at one level.</p>
      <p class="cp-lead">In water, the pyramid of biomass can be inverted, because tiny floating producers multiply fast and are eaten fast. So at any moment their total mass can be less than the mass of the animals that eat them.</p>
      <div class="cp-example"><b>Example:</b> One big tree can feed thousands of insects. Here the producer level has one organism and the next level has many, so the pyramid of numbers is inverted.</div>
      <div class="cp-mnemonic">Energy is always upright; biomass and numbers can turn upside down.</div>
      <div class="cp-note trap">Only the pyramid of energy is never inverted. Do not say this about biomass or numbers.</div>
    `
  },
  34: {
    questext: "Which of the following ecological pyramids is always upright?",
    options: ["Pyramid of numbers", "Pyramid of biomass in a pond", "Pyramid of energy", "Pyramid of numbers in a tree"],
    correct: "3",
    exptext: "✅ Energy decreases at every higher level, so the pyramid of energy is always upright. 📌 Energy only goes down. ❌ Biomass in a pond and numbers in a tree can both be inverted."
  },
  35: {
    questext: "The pyramid of biomass may be inverted in",
    options: ["Aquatic ecosystems", "Terrestrial ecosystems", "Forest ecosystems", "Desert ecosystems"],
    correct: "1",
    exptext: "✅ In water, tiny producers are eaten as fast as they multiply, so their mass can be less than the mass of consumers. 📌 Water can turn biomass upside down. ❌ On land the pyramid of biomass is mostly upright."
  },
  36: {
    questext: "Consider the following statements about ecological pyramids:\n1. The pyramid of energy can be inverted.\n2. The pyramid of numbers can be upright or inverted.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct, because the pyramid of numbers has two forms. 📌 Energy is the one pyramid that never flips. ❌ Statement 1 is wrong because the pyramid of energy is always upright."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a lush green tree with visible roots, a small pond with a fish, and a softly glowing sun" },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"World Environment Day celebration tree planting photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/1.png. people planting trees or holding green banners on World Environment Day",
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/2.png": { t: "fig", about: "A circle labelled Environment with four small pictures around it: Land, Water, Air, Plants and Animals. Plain labels, simple icons." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/3.png": { t: "fig", about: "A large rounded box labelled Ecosystem, split into two halves: Biotic (living) and Abiotic (non-living), joined by two-way arrows." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"pond ecosystem fish water plants photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/4.png. a clear pond with water plants, fish and sunlight",
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/5.png": { t: "fig", about: "Mind-map with centre Abiotic Components and six branches: Inorganic substances, Organic substances, Physical factors, Lithosphere, Hydrosphere, Atmosphere." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rocky mountain landscape with soil and sky photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/6.png. a landscape showing rocks, soil, water and sky together",
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/7.png": { t: "fig", about: "A donut chart of air: Nitrogen 78 percent, Oxygen 21 percent, Argon 0.93 percent, Other gases a thin slice. Clear labels." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Earth atmosphere thin blue layer from space photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/8.png. the thin blue glowing layer of air seen from space",
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/9.png": { t: "fig", about: "Photosynthesis picture: a green leaf in the centre, arrows in from Sunlight, Water and Carbon dioxide, arrows out to Food (glucose) and Oxygen." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"green paddy field in sunlight photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/10.png. a bright green crop field full of plants in sunlight",
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/11.png": { t: "fig", about: "Three boxes in a row: Herbivore eats plants, Carnivore eats animals, Omnivore eats both plants and animals. Small animal icons in each box." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"deer grazing grass photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/12.png. a deer eating grass in a meadow",
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"eagle hunting prey photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/13.png. an eagle gripping a small animal",
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/14.png": { t: "fig", about: "A circular cycle of four boxes with arrows: Dead plants and animals, Decomposers, Nutrients in soil, Plants grow." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"mushrooms growing on rotting log photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/15.png. fungi growing on a rotting tree log in a forest",
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/16.png": { t: "fig", about: "A vertical flow in rounded boxes: Water, minerals, sunlight and carbon dioxide; Producers (plants and trees); Herbivores (primary consumers); Secondary consumers; Tertiary consumers; Decomposers. Arrows downward." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/17.png": { t: "fig", about: "A food web: Grass, Grasshopper, Rabbit, Frog, Snake, Eagle, with many crossing arrows showing who eats whom." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/18.png": { t: "fig", about: "Left to right arrows: Sunlight, Producers, Herbivores, Carnivores, Top carnivores. Boxes get smaller from left to right. One label: Energy flows in one direction only." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sunlight through green forest canopy photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/19.png. sunbeams shining through the leaves of a green forest",
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/20.png": { t: "fig", about: "Three small pyramids side by side: Energy (always upright), Biomass (upright on land, may be inverted in water), Numbers (upright or inverted)." },
  "images/General_Science/Environmental_Science/Basics_of_Environmental_Science/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"phytoplankton under microscope photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Basics_of_Environmental_Science/21.png. tiny green floating algae seen under a microscope"
});

/* CHANGE LOG
   - Carbon dioxide share of air updated to about 0.04 percent (the old figure of 0.03 percent is outdated).
   - Carnivores are described as animals that eat other animals; a carnivore can be a secondary or a higher level consumer, not only a secondary consumer.
   - Natural ecosystems list (forest, grassland, desert, pond, river, lake, ocean) added because the source listed only human-made examples.
   - Hydrosphere share written as about 70 percent of Earth's surface (the exact figure is about 71 percent).
   - Ernst Haeckel's full name added for the term ecology; Arthur George Tansley's full name added for the term ecosystem.
*/
