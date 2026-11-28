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

/* Field: General_Science · Subject: Environmental_Science · Chapter: Greenhouse_Ozone_and_Protocols · 8 concept pages (+ overview) · 22 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌡️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Greenhouse Effect, Ozone Layer and Protocols",
    thumb: {
      image: "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "ENVIRONMENTAL SCIENCE",
      line2: "GLOBAL WARMING + OZONE",
      line3: "MONTREAL & KYOTO",
      badge: "PART 3",
      ribbon: "GASES • TREATIES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Greenhouse Effect, Ozone Layer, Montreal & Kyoto Protocol | SSC & Railway Environment",
      altTitles: ["Global Warming and Ozone Depletion in One Class", "Montreal vs Kyoto Protocol Made Easy"],
      description: "Global warming and the ozone layer are favourite topics of Environmental Science. In this class you learn them step by step, in very simple words.\n\n📌 IN THIS CLASS\n✅ Greenhouse effect and greenhouse gases\n✅ Global warming, its effects and control\n✅ Ozone layer, ozone hole and ozone depleting substances\n✅ Effects of ozone depletion\n✅ Montreal Protocol and Kyoto Protocol with dates\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #EnvironmentalScience #GlobalWarming",
      tags: ["greenhouse effect", "greenhouse gases", "global warming", "ozone layer depletion", "ozone hole", "montreal protocol", "kyoto protocol", "montreal vs kyoto protocol", "ozone depleting substances", "cfc and ozone layer", "dobson unit ozone", "effects of global warming", "control of global warming", "environment for ssc cgl", "environmental science for ssc", "general science for ssc", "environment for railway exams", "rrb ntpc environment", "ssc chsl environment", "unfccc kyoto", "kyoto protocol 1997", "montreal protocol 1987", "Greenhouse O"],
      hashtags: ["SSCCGL", "EnvironmentalScience", "GlobalWarming"],
      thumbText: "GLOBAL WARMING + OZONE + PROTOCOLS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🌡️ New class is live: Greenhouse Effect, Ozone Layer, Montreal and Kyoto Protocols. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Environmental Science — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on global warming, the ozone layer and two famous international agreements</u>. These topics join science with current affairs, so they are asked often in General Science and General Awareness papers.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>8</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>22</b><span>Questions</span></div>
        <div class="cp-stat"><b>~38 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Greenhouse Effect</b><br>How the atmosphere keeps Earth warm, and what Earth would be like without it.</li>
        <li><b>Greenhouse Gases</b><br>Which gases trap heat and which human activity adds the most of them.</li>
        <li><b>Global Warming and Its Control</b><br>Why Earth is heating up, what happens to ice and sea level, and what we can do.</li>
        <li><b>Ozone Layer</b><br>What ozone is, where it is found and how it shields us from the sun.</li>
        <li><b>Ozone Layer Depletion</b><br>How chlorofluorocarbons thin the ozone layer, what the ozone hole is and how ozone is measured.</li>
        <li><b>Effects of Ozone Layer Depletion</b><br>What extra ultraviolet rays do to our skin, eyes, immunity and plants.</li>
        <li><b>Montreal Protocol</b><br>The treaty that protects the ozone layer, with its year and purpose.</li>
        <li><b>Kyoto Protocol</b><br>The treaty that sets limits on greenhouse gases, with its dates, place and purpose.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on the gases of the greenhouse effect, the unit of ozone thickness, and the years of the Montreal and Kyoto Protocols come up almost every year in Staff Selection Commission and Railway exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🌡️", accent: "#0ea5e9", pauseTimer: true,
    title: "Greenhouse Effect",
    html: `
      <p class="cp-lead">The <b>greenhouse effect</b> is a natural process that warms the surface and the atmosphere of Earth. <u>Without it, life as we know it would not be possible.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/1.png" alt="glass greenhouse plants inside photo" data-caption="A glass greenhouse traps warmth, in the same way that gases trap heat around Earth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/2.png" alt="Earth with sunlight arriving, a layer of gases around it, and heat arrows reflected back d" data-caption="Greenhouse gases trap part of the heat and keep Earth warm." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Sunlight warms the ground, and the ground sends heat back upwards. Some gases in the air catch part of this heat and send it back down, like a blanket around Earth.</p>
      <table><thead><tr><th>Situation</th><th>Average temperature of Earth</th></tr></thead><tbody><tr><td>Without the greenhouse effect</td><td>About minus 18 degrees Celsius</td></tr><tr><td>With the greenhouse effect (present)</td><td>About 15 degrees Celsius (59 degrees Fahrenheit)</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> On a cold night, a thick blanket keeps your body warm because it stops heat from escaping. The gases around Earth act like that blanket.</div>
      <div class="cp-note trap">The greenhouse effect itself is natural and useful. The problem is the extra heating that happens when too many greenhouse gases are added.</div>
      <div class="cp-note exam">Remember the two numbers: minus 18 degrees Celsius without the effect and 15 degrees Celsius with it.</div>
    `
  },
  3: {
    questext: "Without the greenhouse effect, the average surface temperature of Earth would be about",
    options: ["0 degrees Celsius", "Minus 8 degrees Celsius", "Minus 18 degrees Celsius", "15 degrees Celsius"],
    correct: "3",
    exptext: "✅ Without the greenhouse effect, Earth would be about minus 18 degrees Celsius. 📌 Minus 18 without, plus 15 with. ❌ 15 degrees Celsius is the present average, with the effect."
  },
  4: {
    questext: "The greenhouse effect is best described as",
    options: ["A natural process that warms the surface and atmosphere of Earth", "A man-made process that only cools Earth", "The thinning of the ozone layer", "The release of heat by the ocean floor"],
    correct: "1",
    exptext: "✅ The greenhouse effect is natural, because gases trap heat and keep Earth warm. 📌 Think of it as a blanket. ❌ Thinning of the ozone layer is a different problem, called ozone depletion."
  },
  5: {
    type: "concept", icon: "💨", accent: "#22c55e", pauseTimer: true,
    title: "Greenhouse Gases",
    html: `
      <p class="cp-lead"><b>Greenhouse gases</b> are gases that trap heat in the atmosphere. <u>The more of them there are, the warmer Earth becomes.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/3.png" alt="A row of five labelled gas bubbles: Water vapour, Carbon dioxide, Methane, Nitrous oxide, " data-caption="The five important greenhouse gases." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/4.png" alt="power plant chimney emissions coal photo" data-caption="Burning fossil fuels in power plants releases carbon dioxide." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Greenhouse gas</th><th>Note</th></tr></thead><tbody><tr><td>Water vapour</td><td>Contributes about 30 to 70 percent of the effect</td></tr><tr><td>Carbon dioxide</td><td>Contributes about 9 to 26 percent of the effect</td></tr><tr><td>Methane</td><td>The amount in the air has more than doubled since the 1700s</td></tr><tr><td>Nitrous oxide</td><td>A strong heat-trapping gas</td></tr><tr><td>Chlorofluorocarbons</td><td>Chemicals once widely used in refrigerators</td></tr></tbody></table>
      <p class="cp-lead">The largest source of greenhouse gas from human activity is the burning of fossil fuels. This releases carbon dioxide from industries, automobiles and homes.</p>
      <div class="cp-example"><b>Example:</b> A car burns petrol and releases carbon dioxide through its exhaust pipe. Millions of cars together add a huge amount of this gas every day.</div>
      <div class="cp-note trap">Nitrogen and oxygen, which make up most of the air, are not greenhouse gases.</div>
      <div class="cp-note exam">Burning fossil fuels, which releases carbon dioxide, is the largest human source of greenhouse gas.</div>
    `
  },
  6: {
    questext: "Which of the following is NOT a greenhouse gas?",
    options: ["Methane", "Nitrous oxide", "Water vapour", "Nitrogen"],
    correct: "4",
    exptext: "✅ Nitrogen does not trap heat, so it is not a greenhouse gas. 📌 The big two gases of air are not greenhouse gases. ❌ Methane, nitrous oxide and water vapour all trap heat."
  },
  7: {
    questext: "The largest human source of greenhouse gas emission is",
    options: ["Photosynthesis", "Burning of fossil fuels", "Planting forests", "Use of cloth bags"],
    correct: "2",
    exptext: "✅ Burning fossil fuels releases a large amount of carbon dioxide. 📌 Fuel burning means carbon dioxide. ❌ Photosynthesis and forests take carbon dioxide out of the air."
  },
  8: {
    questext: "Consider the following statements about greenhouse gases:\n1. Chlorofluorocarbons are greenhouse gases.\n2. Water vapour is not a greenhouse gas.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because chlorofluorocarbons trap heat. 📌 Water vapour is the biggest natural contributor. ❌ Statement 2 is wrong because water vapour is a greenhouse gas."
  },
  9: {
    type: "concept", icon: "🔥", accent: "#f59e0b", pauseTimer: true,
    title: "Global Warming and Its Control",
    html: `
      <p class="cp-lead">Too many greenhouse gases trap extra heat, and the planet warms more than normal. <u>This rise in the temperature of Earth is called global warming.</u> Earth has warmed by about 1.1 degrees Celsius since the late 1800s, and most of this rise has happened in recent decades.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/5.png" alt="melting glacier ice sea photo" data-caption="A melting glacier: warming is shrinking ice on Earth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/6.png" alt="Cause and effect chain: More greenhouse gases, Higher temperature, Ice caps and snow caps " data-caption="Global warming melts ice, raises the sea level and floods coasts." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Scientists say that this warming is causing odd changes in climate, such as the El Nino effect. It is also melting polar ice caps and the Himalayan snow caps. Over many years the sea level will rise and may submerge many coastal areas.</p>
      <table><thead><tr><th>Ways to control global warming</th><th>How it helps</th></tr></thead><tbody><tr><td>Use less fossil fuel</td><td>Fewer greenhouse gases are released</td></tr><tr><td>Improve energy efficiency</td><td>Less fuel is needed for the same work</td></tr><tr><td>Reduce deforestation and plant trees</td><td>Trees take in carbon dioxide</td></tr><tr><td>Slow down population growth</td><td>Lower demand for fuel and goods</td></tr><tr><td>International agreements</td><td>Countries together cut emissions</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> If a town switches its street lights to energy-saving bulbs, the power plant burns less coal, and less carbon dioxide reaches the air.</div>
      <div class="cp-note trap">Planting trees helps cool the planet. Burning more fossil fuel makes warming worse.</div>
    `
  },
  10: {
    questext: "Rise in sea level due to global warming is mainly caused by",
    options: ["Melting of ice caps and snow caps", "More rainfall in deserts", "Fall in ocean temperature", "Drying of rivers"],
    correct: "1",
    exptext: "✅ Melting polar ice and snow adds water to the oceans. 📌 Warming means melting, and melting means rising sea. ❌ A fall in ocean temperature would not raise the sea."
  },
  11: {
    questext: "Which of the following is NOT a measure to control global warming?",
    options: ["Planting trees", "Reducing deforestation", "Burning more fossil fuels", "Improving energy efficiency"],
    correct: "3",
    exptext: "✅ Burning more fossil fuels adds carbon dioxide and increases warming. 📌 Less fuel, more trees. ❌ The other three actions all reduce greenhouse gases."
  },
  12: {
    questext: "Consider the following statements about global warming:\n1. Burning fossil fuels is the largest human source of greenhouse gas.\n2. Planting trees helps to reduce carbon dioxide in the air.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. Fossil fuels give off carbon dioxide and trees take it in. 📌 Fuel adds, trees remove. ❌ Choosing only one statement ignores that both facts are true."
  },
  13: {
    type: "concept", icon: "🛡️", accent: "#ef4444", pauseTimer: true,
    title: "Ozone Layer",
    html: `
      <p class="cp-lead"><b>Ozone</b> is a form of oxygen in which each molecule has three oxygen atoms. <u>The ozone layer in the stratosphere works as a shield that absorbs the harmful ultraviolet rays of the sun.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/7.png" alt="Layers of the atmosphere shown as horizontal bands: Troposphere at the bottom, Stratospher" data-caption="The ozone layer in the stratosphere stops harmful ultraviolet rays." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/8.png" alt="Earth layers of atmosphere from space photo" data-caption="A thin blue band of atmosphere above Earth, where the ozone layer lies." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Ozone gas is formed all the time when ultraviolet rays act on oxygen molecules, and it is also broken back into oxygen in the stratosphere. Nature keeps a balance between making and breaking ozone.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Chemical formula</td><td>O3, three oxygen atoms</td></tr><tr><td>Normal oxygen</td><td>Two oxygen atoms in a molecule</td></tr><tr><td>Where it forms a layer</td><td>Stratosphere</td></tr><tr><td>What it absorbs</td><td>Ultraviolet radiation of the sun</td></tr><tr><td>Nature of the gas</td><td>Poisonous, unlike normal oxygen</td></tr></tbody></table>
      <div class="cp-note trap">The lowest layer of the atmosphere is the troposphere, and the ozone layer is in the stratosphere above it.</div>
      <div class="cp-note exam">Ozone is made of three oxygen atoms.</div>
    `
  },
  14: {
    questext: "Ozone is made up of",
    options: ["Two oxygen atoms", "Three oxygen atoms", "One oxygen atom", "Four oxygen atoms"],
    correct: "2",
    exptext: "✅ A molecule of ozone has three oxygen atoms. 📌 Ozone is O three. ❌ Two atoms is normal oxygen, which we breathe."
  },
  15: {
    questext: "The ozone layer is found in which layer of the atmosphere?",
    options: ["Troposphere", "Mesosphere", "Exosphere", "Stratosphere"],
    correct: "4",
    exptext: "✅ The ozone layer forms in the stratosphere. 📌 Ozone sits above the layer where weather happens. ❌ The troposphere is the lowest layer, where we live."
  },
  16: {
    questext: "Consider the following statements about ozone:\n1. The ozone layer absorbs the ultraviolet radiation of the sun.\n2. Ozone is the normal two-atom form of oxygen.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because ozone absorbs ultraviolet rays. 📌 Ozone is the shield. ❌ Statement 2 is wrong because ozone has three atoms, not two."
  },
  17: {
    type: "concept", icon: "🕳️", accent: "#a855f7", pauseTimer: true,
    title: "Ozone Layer Depletion",
    html: `
      <p class="cp-lead">Ozone is made and broken down in the stratosphere at the same rate, so the layer stays steady. <u>This balance has been disturbed because chlorofluorocarbons break ozone down faster than nature can make it.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/9.png" alt="NASA ozone hole Antarctica satellite image" data-caption="A satellite image of the ozone hole over Antarctica." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/10.png" alt="Flow: Chlorofluorocarbons leak from refrigerators, They rise to the stratosphere, They bre" data-caption="How chlorofluorocarbons create the ozone hole." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Chlorofluorocarbons were widely used as refrigerants, which are the cooling chemicals inside refrigerators. They have made a large area of thin ozone layer, commonly called the <b>ozone hole</b>.</p>
      <p class="cp-lead">The thickness of the ozone in a column of air, from the ground to the top of the atmosphere, is measured in <b>Dobson units</b>.</p>
      <table><thead><tr><th>Ozone depleting substances</th></tr></thead><tbody><tr><td>Chlorofluorocarbons</td></tr><tr><td>Hydrochlorofluorocarbons</td></tr><tr><td>Hydrobromofluorocarbons</td></tr><tr><td>Halons</td></tr><tr><td>Methyl bromide</td></tr><tr><td>Carbon tetrachloride</td></tr><tr><td>Methyl chloroform</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A broken old refrigerator that leaks its coolant sends chlorofluorocarbons into the air. Over time they reach the stratosphere and destroy ozone.</div>
      <div class="cp-note trap">Dobson unit measures ozone thickness. Decibel measures sound.</div>
      <div class="cp-note exam">Chlorofluorocarbons are the best known ozone depleting substance. Ozone thickness is measured in Dobson units.</div>
    `
  },
  18: {
    questext: "The thickness of the ozone layer is measured in",
    options: ["Decibel", "Pascal", "Dobson unit", "Joule"],
    correct: "3",
    exptext: "✅ Ozone thickness is measured in Dobson units. 📌 Dobson means ozone. ❌ Decibel is for sound, so it is a common trap."
  },
  19: {
    questext: "The main chemicals responsible for the depletion of the ozone layer are",
    options: ["Carbon dioxide", "Chlorofluorocarbons", "Nitrogen", "Argon"],
    correct: "2",
    exptext: "✅ Chlorofluorocarbons break down ozone in the stratosphere. 📌 Chlorofluorocarbons are the ozone killers. ❌ Carbon dioxide causes global warming, not ozone depletion."
  },
  20: {
    questext: "Which of the following is NOT an ozone depleting substance?",
    options: ["Halons", "Methyl bromide", "Carbon tetrachloride", "Carbon dioxide"],
    correct: "4",
    exptext: "✅ Carbon dioxide is a greenhouse gas and does not destroy ozone. 📌 Halons, bromides and chlorine chemicals hurt ozone. ❌ The other three are listed ozone depleting substances."
  },
  21: {
    type: "concept", icon: "🧴", accent: "#06b6d4", pauseTimer: true,
    title: "Effects of Ozone Layer Depletion",
    html: `
      <p class="cp-lead">When the ozone layer gets thin, more ultraviolet rays reach the ground. <u>These rays are harmful to people, animals and plants.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/11.png" alt="A human face and eye with ultraviolet arrows, and a plant, with labels Skin cancer, Snow-b" data-caption="Extra ultraviolet rays harm the skin, eyes, immunity and plants." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/12.png" alt="sun protection sunscreen beach person photo" data-caption="Sunscreen helps protect skin from harmful ultraviolet rays." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Part affected</th><th>Effect</th></tr></thead><tbody><tr><td>Skin</td><td>Early ageing, damage to skin cells and several types of skin cancer</td></tr><tr><td>Immunity</td><td>Immune deficiency disorders</td></tr><tr><td>Eyes</td><td>A high dose of ultraviolet B rays inflames the cornea, causing snow-blindness, and cataract</td></tr><tr><td>Plants</td><td>Ultraviolet rays reduce plant growth and lower farm output</td></tr></tbody></table>
      <p class="cp-lead">The cornea is the clear front layer of the human eye. It absorbs ultraviolet B rays, and a high dose of them makes it swollen and painful. This is called snow-blindness.</p>
      <div class="cp-note trap">More ultraviolet radiation lowers farm output. It does not raise it.</div>
      <div class="cp-note exam">Skin cancer, cataract and immune deficiency are the effects most often asked.</div>
    `
  },
  22: {
    questext: "A high dose of ultraviolet B radiation causes inflammation of the cornea. This condition is called",
    options: ["Snow-blindness", "Night blindness", "Colour blindness", "Jaundice"],
    correct: "1",
    exptext: "✅ A high dose of ultraviolet B rays inflames the cornea and causes snow-blindness. 📌 Ultraviolet plus snow gives snow-blindness. ❌ Night and colour blindness have other causes."
  },
  23: {
    questext: "Which of the following is NOT an effect of ozone layer depletion?",
    options: ["Skin cancer", "Cataract", "Increase in crop productivity", "Immune deficiency disorders"],
    correct: "3",
    exptext: "✅ More ultraviolet rays reduce plant growth and lower crop output. 📌 More ultraviolet means more harm. ❌ Skin cancer, cataract and weak immunity are all known effects."
  },
  24: {
    type: "concept", icon: "🤝", accent: "#84cc16", pauseTimer: true,
    title: "Montreal Protocol",
    html: `
      <p class="cp-lead">The world understood how harmful ozone depletion is. So countries made an international treaty called the <b>Montreal Protocol</b>. <u>Its aim is to control the emission of ozone depleting substances.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/13.png" alt="A timeline with two points: 1987 Montreal Protocol signed in Montreal, Canada; 1989 Protoc" data-caption="The Montreal Protocol was signed in 1987 and took effect in 1989." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/14.png" alt="Montreal Canada city skyline photo" data-caption="Montreal, the Canadian city where the ozone treaty was signed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Name</td><td>Montreal Protocol</td></tr><tr><td>Place of signing</td><td>Montreal, Canada</td></tr><tr><td>Year of signing</td><td>1987</td></tr><tr><td>Year it took effect</td><td>1989</td></tr><tr><td>Aim</td><td>Control emission of ozone depleting substances</td></tr><tr><td>Later change</td><td>The Kigali Amendment of 2016 phases down hydrofluorocarbons</td></tr></tbody></table>
      <p class="cp-lead">The Montreal Protocol is a global agreement to protect the stratospheric ozone layer. Thanks to it, the use of chlorofluorocarbons has been phased out, and the ozone layer is slowly recovering.</p>
      <div class="cp-note trap">The Montreal Protocol is about ozone. The Kyoto Protocol is about greenhouse gases.</div>
      <div class="cp-note exam">Remember the pair: Montreal, 1987, ozone layer.</div>
    `
  },
  25: {
    questext: "The Montreal Protocol was signed in the year",
    options: ["1985", "1987", "1989", "1997"],
    correct: "2",
    exptext: "✅ The Montreal Protocol was signed in 1987. 📌 Montreal 87, Kyoto 97. ❌ 1989 is the year it took effect, and 1997 belongs to the Kyoto Protocol."
  },
  26: {
    questext: "The Montreal Protocol is related to",
    options: ["Greenhouse gas targets for rich countries", "Protection of biodiversity", "Control of noise pollution", "Protection of the ozone layer"],
    correct: "4",
    exptext: "✅ The Montreal Protocol controls substances that harm the ozone layer. 📌 Montreal means ozone. ❌ Greenhouse gas targets belong to the Kyoto Protocol."
  },
  27: {
    type: "concept", icon: "📜", accent: "#ec4899", pauseTimer: true,
    title: "Kyoto Protocol",
    html: `
      <p class="cp-lead">The <b>Kyoto Protocol</b> is an international agreement that sets targets for industrialized countries to cut their greenhouse gas emissions. <u>Gases such as carbon dioxide, methane and hydrofluorocarbons are partly responsible for global warming.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/15.png" alt="A timeline with three points: 11 December 1997 Protocol adopted in Kyoto, Japan; 16 Februa" data-caption="The Kyoto Protocol was adopted in 1997 and began in 2005." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/16.png" alt="Kyoto International Conference Center Japan photo" data-caption="The conference centre in Kyoto, Japan, near where the protocol was adopted." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Name</td><td>Kyoto Protocol</td></tr><tr><td>Place</td><td>Kyoto, Japan</td></tr><tr><td>Adopted</td><td>11 December 1997</td></tr><tr><td>Entered into force</td><td>16 February 2005</td></tr><tr><td>Based on</td><td>The principles of the United Nations Framework Convention on Climate Change</td></tr><tr><td>Aim</td><td>Cut greenhouse gas emissions of industrialized countries</td></tr></tbody></table>
      <table><thead><tr><th>Treaty</th><th>Concern</th><th>Year</th></tr></thead><tbody><tr><td>Montreal Protocol</td><td>Ozone layer</td><td>1987</td></tr><tr><td>Kyoto Protocol</td><td>Greenhouse gases</td><td>1997</td></tr></tbody></table>
      <p class="cp-lead">A later climate agreement, the Paris Agreement of 2015, carries forward the world effort against global warming.</p>
      <div class="cp-mnemonic">Montreal means ozone, Kyoto means heat-trapping gases.</div>
      <div class="cp-note trap">Adopted and entered into force are not the same date. The Kyoto Protocol was adopted in 1997 but began in 2005.</div>
      <div class="cp-note exam">Remember the dates 11 December 1997 and 16 February 2005.</div>
    `
  },
  28: {
    questext: "The Kyoto Protocol was adopted in the year",
    options: ["1997", "1987", "2005", "2015"],
    correct: "1",
    exptext: "✅ The Kyoto Protocol was adopted in Kyoto, Japan on 11 December 1997. 📌 Kyoto 97. ❌ 2005 is the year it entered into force, and 1987 is the Montreal Protocol."
  },
  29: {
    questext: "The Kyoto Protocol sets targets for industrialized countries to reduce their",
    options: ["Noise levels", "Plastic waste", "Greenhouse gas emissions", "Water use"],
    correct: "3",
    exptext: "✅ The Kyoto Protocol asks rich countries to cut greenhouse gas emissions. 📌 Kyoto means heat-trapping gases. ❌ The other options are not its aim."
  },
  30: {
    questext: "Which of the following pairs is correctly matched?",
    options: ["Montreal Protocol, greenhouse gas targets and Kyoto Protocol, ozone layer", "Montreal Protocol, ozone layer and Kyoto Protocol, greenhouse gases", "Montreal Protocol, ozone layer and Kyoto Protocol, ozone layer", "Montreal Protocol, greenhouse gases and Kyoto Protocol, greenhouse gases"],
    correct: "2",
    exptext: "✅ Montreal protects the ozone layer, and Kyoto controls greenhouse gases. 📌 Montreal means ozone, Kyoto means gases. ❌ Option 1 swaps the two treaties."
  },
  31: {
    questext: "The Kyoto Protocol entered into force on",
    options: ["11 December 1997", "1 January 2000", "16 February 1989", "16 February 2005"],
    correct: "4",
    exptext: "✅ The Kyoto Protocol entered into force on 16 February 2005. 📌 Adopted 1997, started 2005. ❌ 11 December 1997 is the date it was adopted."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a softly glowing planet Earth inside a thin protective blue layer, a small thermometer and a melting ice block" },
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"glass greenhouse plants inside photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/1.png. a glass greenhouse with green plants growing inside",
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/2.png": { t: "fig", about: "Earth with sunlight arriving, a layer of gases around it, and heat arrows reflected back down to the surface. Labels: Sunlight, Greenhouse gases, Heat trapped." },
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/3.png": { t: "fig", about: "A row of five labelled gas bubbles: Water vapour, Carbon dioxide, Methane, Nitrous oxide, Chlorofluorocarbons." },
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"power plant chimney emissions coal photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/4.png. a coal power plant with large chimneys releasing smoke",
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"melting glacier ice sea photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/5.png. a glacier melting into meltwater at its edge",
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/6.png": { t: "fig", about: "Cause and effect chain: More greenhouse gases, Higher temperature, Ice caps and snow caps melt, Sea level rises, Coastal areas flooded." },
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/7.png": { t: "fig", about: "Layers of the atmosphere shown as horizontal bands: Troposphere at the bottom, Stratosphere above it with the Ozone layer marked, and the Sun with ultraviolet rays arrows stopped at the ozone layer." },
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Earth layers of atmosphere from space photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/8.png. a thin blue band of the atmosphere along the edge of Earth",
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"NASA ozone hole Antarctica satellite image\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/9.png. a satellite picture with a large blue patch over Antarctica showing thin ozone",
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/10.png": { t: "fig", about: "Flow: Chlorofluorocarbons leak from refrigerators, They rise to the stratosphere, They break ozone down, A thin patch forms called the ozone hole." },
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/11.png": { t: "fig", about: "A human face and eye with ultraviolet arrows, and a plant, with labels Skin cancer, Snow-blindness, Cataract, Weak immunity, Poor plant growth." },
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sun protection sunscreen beach person photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/12.png. a person applying sunscreen on a sunny day",
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/13.png": { t: "fig", about: "A timeline with two points: 1987 Montreal Protocol signed in Montreal, Canada; 1989 Protocol takes effect." },
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Montreal Canada city skyline photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/14.png. the skyline of Montreal city in Canada",
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/15.png": { t: "fig", about: "A timeline with three points: 11 December 1997 Protocol adopted in Kyoto, Japan; 16 February 2005 Protocol enters into force. A base bar labelled Based on the Framework Convention on Climate Change." },
  "images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kyoto International Conference Center Japan photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Greenhouse_Ozone_and_Protocols/16.png. the building in Kyoto, Japan where the protocol was adopted"
});

/* CHANGE LOG
   - Rise in the temperature of Earth is written as about 1.1 degrees Celsius since the late 1800s; the older figure of 0.6 degrees Celsius is outdated.
   - Chlorofluorocarbons are described as chemicals once widely used in refrigerators; their use is now phased out.
   - Kigali Amendment (2016) to the Montreal Protocol, which phases down hydrofluorocarbons, added.
   - Paris Agreement (2015) added as the later global climate agreement after the Kyoto Protocol.
   - Ozone is described as a form of oxygen with three atoms in each molecule; the phrase 'three molecules of oxygen combine' was corrected, because ozone forms from oxygen molecules and atoms.
*/
