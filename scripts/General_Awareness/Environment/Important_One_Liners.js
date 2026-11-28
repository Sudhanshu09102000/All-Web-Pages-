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

/* Field: General_Science · Subject: Environmental_Science · Chapter: Important_One_Liners · 12 concept pages (+ overview) · 35 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📌", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Important One-Liners of Environmental Science",
    thumb: {
      image: "images/General_Science/Environmental_Science/Important_One_Liners/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "ENVIRONMENT",
      line2: "79 IMPORTANT ONE-LINERS",
      line3: "LAST MINUTE REVISION",
      badge: "PART 4",
      ribbon: "FACTS • DATES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Environment Important One-Liners | Last Minute Revision for SSC & Railway",
      altTitles: ["79 Environmental Science One-Liners in One Class", "Environment Quick Revision for SSC CGL"],
      description: "Revise the most asked facts of Environmental Science in one class. Every fact is grouped by theme and explained in simple words.\n\n📌 IN THIS CLASS\n✅ Environment days and their dates\n✅ Ecosystem, atmosphere and food chain facts\n✅ Pollution indicators, pollutants and waste\n✅ Ozone, greenhouse gases and treaties\n✅ Conservation, energy and fuels\n✅ People, places and events\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #EnvironmentalScience #OneLiners",
      tags: ["environment one liners", "environment revision for ssc", "environment for ssc cgl", "environment for railway exams", "general science for ssc", "environment mcq", "world environment day date", "earth day date", "world wetlands day", "biodiversity day", "bod meaning", "in situ ex situ conservation", "geothermal energy", "cng clean fuel", "biogas methane percentage", "bhopal gas tragedy", "salim ali ornithologist", "green gold revolution bamboo", "mangroves indonesia", "ssc chsl environment", "rrb ntpc environment", "static gk environment"],
      hashtags: ["SSCCGL", "EnvironmentalScience", "OneLiners"],
      thumbText: "ENVIRONMENT ONE-LINERS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📌 New class is live: Environment Important One-Liners. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Environmental Science — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>quick, clear revision class of the most important one-line facts</u> of Environmental Science, grouped by theme so that they are easy to remember. These short facts are the ones most often asked as direct questions.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>12</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>35</b><span>Questions</span></div>
        <div class="cp-stat"><b>~59 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Important Environmental Days</b><br>The dates of the four environment days that exams ask again and again.</li>
        <li><b>Ecology and Ecosystem Facts</b><br>Key facts about ecosystems, trophic levels, energy and the pyramids.</li>
        <li><b>Spheres of Earth</b><br>The atmosphere, hydrosphere and biosphere, the lowest layer of air and where fresh water is stored.</li>
        <li><b>Gases of the Atmosphere and Nitrogen</b><br>Shares of the main gases, and how nitrogen reaches plants.</li>
        <li><b>Food Chain Facts</b><br>Producers, consumers, decomposers and where humans fit.</li>
        <li><b>Pollution Indicators and Water Quality</b><br>Lichens, dissolved oxygen, biochemical oxygen demand and the safe pH of drinking water.</li>
        <li><b>Primary and Secondary Pollutants</b><br>How pollutants are grouped, with clear examples.</li>
        <li><b>Waste, Sewage and Noise Facts</b><br>Electronic waste, recycling, sewage treatment and the harmful noise level.</li>
        <li><b>Greenhouse, Ozone and Deforestation Facts</b><br>One-line facts on the ozone layer, greenhouse gases, treaties and forests.</li>
        <li><b>Conservation Methods</b><br>In-situ and ex-situ conservation with their examples.</li>
        <li><b>Energy and Fuels</b><br>Geothermal energy, fossil fuels, clean fuels, hydrogen, biogas and energy saving.</li>
        <li><b>People, Places and Events</b><br>Salim Ali, the Green Gold revolution, savanna, mangroves, the Bhopal gas tragedy, estuary and the earthworm.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Staff Selection Commission and Railway papers often pick direct one-line facts from Environmental Science. Learning them by theme saves a lot of time before the exam.</div>
    `
  },
  2: {
    type: "concept", icon: "📅", accent: "#0ea5e9", pauseTimer: true,
    title: "Important Environmental Days",
    html: `
      <p class="cp-lead">Four environment days are asked again and again in exams. <u>Learn the date of each one together with its name.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/1.png" alt="A calendar strip with four marked dates: 2 February World Wetlands Day, 22 April Earth Day" data-caption="Four environment days on the calendar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/2.png" alt="Earth Day celebration people with banners photo" data-caption="Earth Day is celebrated around the world to support environmental protection." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Day</th><th>Date</th></tr></thead><tbody><tr><td>World Wetlands Day</td><td>2 February</td></tr><tr><td>Earth Day</td><td>22 April</td></tr><tr><td>International Day for Biodiversity</td><td>22 May</td></tr><tr><td>World Environment Day</td><td>5 June</td></tr></tbody></table>
      <p class="cp-lead">Earth Day is an annual event celebrated around the world to show support for environmental protection. Biodiversity means the variety of living things on Earth.</p>
      <div class="cp-mnemonic">Put the dates in order: February, April, May, June, which are the second, fourth, fifth and sixth months.</div>
      <div class="cp-note trap">Earth Day and the International Day for Biodiversity both fall on the 22nd. The month decides which is which: April for Earth Day and May for Biodiversity.</div>
      <div class="cp-note exam">World Environment Day is on 5 June and Earth Day is on 22 April.</div>
    `
  },
  3: {
    questext: "Earth Day is celebrated every year on",
    options: ["5 June", "22 April", "22 May", "2 February"],
    correct: "2",
    exptext: "✅ Earth Day is celebrated on 22 April. 📌 Earth Day comes in April. ❌ 5 June is World Environment Day, and 22 May is the day for biodiversity."
  },
  4: {
    questext: "The International Day for Biodiversity is observed on",
    options: ["2 February", "22 April", "5 June", "22 May"],
    correct: "4",
    exptext: "✅ The International Day for Biodiversity is on 22 May. 📌 Both Earth Day and Biodiversity Day fall on the 22nd, in April and May. ❌ 22 April is Earth Day."
  },
  5: {
    questext: "Which of the following pairs of day and date is correct?",
    options: ["World Wetlands Day, 2 February", "Earth Day, 5 June", "World Environment Day, 22 May", "International Day for Biodiversity, 22 April"],
    correct: "1",
    exptext: "✅ World Wetlands Day is on 2 February. 📌 February is the second month, and the date is 2. ❌ The other three pairs have the dates swapped."
  },
  6: {
    type: "concept", icon: "🌳", accent: "#22c55e", pauseTimer: true,
    title: "Ecology and Ecosystem Facts",
    html: `
      <p class="cp-lead">These facts join together the basic ideas of ecology. <u>Each row below is a one-line fact that exams like to ask directly.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/3.png" alt="A stacked set of four labelled boxes: Ecosystem, Biotic components, Abiotic components, Tr" data-caption="How ecosystem ideas connect with each other." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/4.png" alt="ocean coral reef underwater photo" data-caption="The ocean is considered the most stable ecosystem in nature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Two components of an ecosystem</td><td>Abiotic and biotic</td></tr><tr><td>An ecosystem consists of</td><td>Producers, consumers, decomposers and abiotic factors</td></tr><tr><td>Biotic components</td><td>Living things such as animals, plants, fungi and bacteria</td></tr><tr><td>Abiotic components</td><td>Non-living things such as temperature, air currents and minerals</td></tr><tr><td>Most stable ecosystem in nature</td><td>Oceans</td></tr><tr><td>A fish aquarium is an example of</td><td>An artificial (human-made) ecosystem</td></tr><tr><td>Trophic levels are formed by</td><td>Different organisms linked in a food chain</td></tr><tr><td>Flow of energy in an ecosystem</td><td>Always one-way, from producers to consumers</td></tr><tr><td>Pyramid of energy</td><td>Always upright</td></tr><tr><td>Picture of energy or biomass at levels of a food chain</td><td>Ecological pyramid</td></tr></tbody></table>
      <p class="cp-lead">Oceans are so large and have so much water that changes happen very slowly. That is why they are called the most stable ecosystem.</p>
      <div class="cp-example"><b>Example:</b> A pond is an ecosystem. Water and sunlight are abiotic, and fish and algae are biotic. The pond changes slowly, but an ocean changes even more slowly.</div>
      <div class="cp-note trap">Biotic means living and abiotic means non-living. Do not swap the two.</div>
    `
  },
  7: {
    questext: "Trophic levels are formed by different",
    options: ["Organisms linked in a food chain", "Rocks in the soil", "Layers of the atmosphere", "Types of rainfall"],
    correct: "1",
    exptext: "✅ Each step of a food chain is one trophic level. 📌 Troph means food. ❌ Rocks, air layers and rain are not related to feeding."
  },
  8: {
    questext: "Which of the following is the most stable ecosystem in nature?",
    options: ["Desert", "Pond", "Ocean", "Forest"],
    correct: "3",
    exptext: "✅ Oceans are huge and change very slowly, so they are the most stable ecosystem. 📌 Biggest is steadiest. ❌ A pond is small and changes quickly."
  },
  9: {
    questext: "Which of the following is an example of an abiotic component?",
    options: ["Fungi", "Bacteria", "Plants", "Air currents"],
    correct: "4",
    exptext: "✅ Air currents are non-living, so they are abiotic. 📌 Abiotic means without life. ❌ Fungi, bacteria and plants are living things."
  },
  10: {
    type: "concept", icon: "🌐", accent: "#f59e0b", pauseTimer: true,
    title: "Spheres of Earth",
    html: `
      <p class="cp-lead">Earth is made of different layers, and each one is called a sphere. <u>The atmosphere is air, the hydrosphere is water and the biosphere is life.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/5.png" alt="Concentric circles around Earth labelled Atmosphere, Hydrosphere, Lithosphere with a thin " data-caption="The spheres of Earth and the biosphere where all life lives." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/6.png" alt="Earth from space blue planet photo" data-caption="Earth seen from space shows air, water and land together." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>The huge blanket of air around Earth</td><td>Atmosphere</td></tr><tr><td>The part of Earth with water resources such as oceans, rivers, ponds and lakes</td><td>Hydrosphere</td></tr><tr><td>The part of Earth where all life is found</td><td>Biosphere</td></tr><tr><td>The lowest layer of the atmosphere</td><td>Troposphere</td></tr><tr><td>Where most fresh water is stored</td><td>About 69 percent in polar ice and glaciers, and about 30 percent in groundwater</td></tr></tbody></table>
      <p class="cp-lead">Most of the fresh water on Earth is frozen in ice, so very little is easily available in rivers and lakes. This is why saving water matters.</p>
      <div class="cp-note trap">Most fresh water is not in rivers and lakes. It is in polar ice and glaciers.</div>
      <div class="cp-note exam">Biosphere is the part of Earth where life exists.</div>
    `
  },
  11: {
    questext: "The part of Earth where all life is found is called the",
    options: ["Lithosphere", "Biosphere", "Hydrosphere", "Atmosphere"],
    correct: "2",
    exptext: "✅ The biosphere is where all life exists. 📌 Bio means life. ❌ The hydrosphere is only the water part of Earth."
  },
  12: {
    questext: "Most of the fresh water of the world is stored in",
    options: ["Rivers", "Lakes", "Polar ice and glaciers", "Clouds"],
    correct: "3",
    exptext: "✅ Polar ice and glaciers hold more than two thirds of all fresh water. 📌 Ice is the biggest fresh water store. ❌ Rivers and lakes hold only a tiny share."
  },
  13: {
    type: "concept", icon: "🫧", accent: "#ef4444", pauseTimer: true,
    title: "Gases of the Atmosphere and Nitrogen",
    html: `
      <p class="cp-lead">Nitrogen and oxygen are the two main gases of air. <u>Nitrogen is the largest in amount, and it reaches plants in special ways.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/7.png" alt="A bar chart of gases: Nitrogen 78 percent, Oxygen 21 percent, Carbon dioxide about 0.04 pe" data-caption="Shares of nitrogen, oxygen and carbon dioxide in the air." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/8.png" alt="Nitrogen reaching plants: Lightning turns nitrogen of air into nitrates, Bacteria in plant" data-caption="Two ways that nitrogen from air reaches plants." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Share of nitrogen in the atmosphere</td><td>78 percent</td></tr><tr><td>Share of oxygen in the atmosphere</td><td>21 percent</td></tr><tr><td>Share of carbon dioxide in the atmosphere</td><td>About 0.04 percent</td></tr><tr><td>Largest reservoir of nitrogen</td><td>The atmosphere</td></tr><tr><td>Average temperature of Earth</td><td>About 15 degrees Celsius</td></tr><tr><td>Plants make food with the help of the sun</td><td>Photosynthesis</td></tr><tr><td>Thunderstorm and lightning convert nitrogen of the air into</td><td>Nitrates</td></tr><tr><td>Plants whose roots hold nitrogen-fixing bacteria</td><td>Some plants such as pulses</td></tr></tbody></table>
      <p class="cp-lead">Nitrogen gas in the air cannot be used by plants directly. Lightning and root bacteria change it into forms such as nitrates that plants can take in.</p>
      <div class="cp-note trap">Oxygen is only 21 percent, but nitrogen is 78 percent. Many students think oxygen is the biggest.</div>
    `
  },
  14: {
    questext: "Thunderstorm and lightning convert nitrogen of the atmosphere into",
    options: ["Nitrates", "Carbon monoxide", "Ozone only", "Argon"],
    correct: "1",
    exptext: "✅ Lightning gives the energy that turns nitrogen into nitrates. 📌 Lightning feeds plants. ❌ Ozone is made from oxygen, not nitrogen."
  },
  15: {
    questext: "The largest reservoir of nitrogen is the",
    options: ["Soil", "Oceans", "Plants", "Atmosphere"],
    correct: "4",
    exptext: "✅ The atmosphere is about 78 percent nitrogen. 📌 Air holds the most nitrogen. ❌ Soil and plants hold only a small amount."
  },
  16: {
    questext: "Nitrogen-fixing bacteria that help plants such as pulses live in their",
    options: ["Leaves", "Roots", "Stems", "Flowers"],
    correct: "2",
    exptext: "✅ These bacteria live in small swellings on the roots and turn nitrogen into a usable form. 📌 Roots hold the helpers. ❌ Leaves make food but do not hold these bacteria."
  },
  17: {
    type: "concept", icon: "🔗", accent: "#a855f7", pauseTimer: true,
    title: "Food Chain Facts",
    html: `
      <p class="cp-lead">Every living thing in a food chain has a job. <u>Producers make food, consumers eat it, and decomposers clean up.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/9.png" alt="A straight line: Producers, Primary consumers, Secondary consumers, with a separate box De" data-caption="Producers make food, consumers eat it and decomposers break down the dead." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/10.png" alt="omnivore human eating vegetables fruits market photo" data-caption="Humans eat plants and animals, so they are omnivores." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>A food chain starts with</td><td>Producers</td></tr><tr><td>In a food chain, humans are</td><td>Primary and secondary consumers</td></tr><tr><td>Bacteria and fungi are called</td><td>Decomposers</td></tr><tr><td>A food web is</td><td>An interlinked arrangement of food chains</td></tr><tr><td>Consumers that eat both animals and plants</td><td>Omnivores</td></tr><tr><td>Most carnivorous animals are</td><td>Predators</td></tr></tbody></table>
      <p class="cp-lead">Humans eat plants such as rice, so they act as primary consumers. They also eat meat or eggs, so they act as secondary consumers too.</p>
      <div class="cp-note trap">Scavengers such as vultures are carnivores but not hunters, so not every carnivore is a predator.</div>
    `
  },
  18: {
    questext: "In a food chain, humans can be",
    options: ["Producers only", "Decomposers", "Primary and secondary consumers", "Tertiary consumers only"],
    correct: "3",
    exptext: "✅ Humans eat plants and animals, so they act as primary and secondary consumers. 📌 Omnivores take both steps. ❌ Humans cannot make their own food, so they are not producers."
  },
  19: {
    questext: "Consider the following statements:\n1. Bacteria and fungi are decomposers.\n2. A food chain starts with consumers.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because bacteria and fungi break down dead matter. 📌 Producers always start the chain. ❌ Statement 2 is wrong, because a chain starts with producers."
  },
  20: {
    type: "concept", icon: "🧪", accent: "#06b6d4", pauseTimer: true,
    title: "Pollution Indicators and Water Quality",
    html: `
      <p class="cp-lead">Some living things and some tests tell us how clean air or water is. <u>These are called indicators.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/11.png" alt="lichen growing on tree bark photo" data-caption="Lichens grow well only in clean air." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/12.png" alt="A scale from clean river to polluted river with Biochemical oxygen demand low on the left " data-caption="Higher biochemical oxygen demand means more polluted water." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Air pollution indicator</td><td>Lichens</td></tr><tr><td>Best indicator of sulphur dioxide pollution</td><td>Lichen</td></tr><tr><td>Pollution of river water is measured by</td><td>The amount of dissolved oxygen</td></tr><tr><td>Biochemical oxygen demand measures</td><td>The oxygen needed to break down organic waste in water</td></tr><tr><td>A river with high biochemical oxygen demand is</td><td>Highly polluted</td></tr><tr><td>Eutrophication means</td><td>Enrichment of water with plant nutrients, mainly nitrogen and phosphorus</td></tr><tr><td>The pH range of drinking water (Bureau of Indian Standards)</td><td>6.5 to 8.5</td></tr></tbody></table>
      <p class="cp-lead">Lichens are sensitive, and they die where there is too much sulphur dioxide. So if lichens grow well on trees, the air is clean.</p>
      <div class="cp-note trap">A high biochemical oxygen demand means dirty water. A river with a low value is clean.</div>
    `
  },
  21: {
    questext: "Which organism is the best indicator of sulphur dioxide pollution?",
    options: ["Fern", "Lichen", "Mushroom", "Algae"],
    correct: "2",
    exptext: "✅ Lichens are very sensitive to sulphur dioxide. 📌 Lichen shows clean air. ❌ Ferns and mushrooms are not used as the main indicator."
  },
  22: {
    questext: "As per the Bureau of Indian Standards, the pH range of drinking water should be",
    options: ["4.5 to 5.5", "5.5 to 6.5", "7.5 to 9.5", "6.5 to 8.5"],
    correct: "4",
    exptext: "✅ Safe drinking water has a pH between 6.5 and 8.5. 📌 It is close to neutral. ❌ A range of 4.5 to 5.5 is too acidic."
  },
  23: {
    questext: "Pollution of river water is measured by the amount of dissolved",
    options: ["Oxygen", "Nitrogen", "Argon", "Hydrogen"],
    correct: "1",
    exptext: "✅ Polluted water has less dissolved oxygen, so oxygen is the measure. 📌 Fish need oxygen. ❌ Nitrogen and argon do not show water quality."
  },
  24: {
    type: "concept", icon: "🧬", accent: "#84cc16", pauseTimer: true,
    title: "Primary and Secondary Pollutants",
    html: `
      <p class="cp-lead">Pollutants are grouped into two kinds, depending on how they enter the air. <u>A primary pollutant comes straight from a source, and a secondary pollutant forms later from other pollutants.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/13.png" alt="Two panels: Primary pollutant goes straight from a chimney into air; Secondary pollutant f" data-caption="Primary pollutants come directly from a source, and secondary ones form in the air." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/14.png" alt="car exhaust pipe smoke photo" data-caption="Exhaust pipe smoke carries primary pollutants straight into the air." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Primary pollutant</td><td>Emitted directly from a source</td><td>Hydrocarbons, carbon monoxide, sulphur oxides, nitrogen oxides, lead</td></tr><tr><td>Secondary pollutant</td><td>Not emitted directly; forms when primary pollutants react in the atmosphere</td><td>Ozone, nitrogen dioxide, sulphur trioxide</td></tr></tbody></table>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Main pollutant of automobile exhaust</td><td>Carbon monoxide</td></tr><tr><td>Acid rain is formed due to oxides of</td><td>Sulphur and nitrogen</td></tr><tr><td>A natural source of pollution</td><td>Volcano</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> Smoke from a chimney is a primary pollutant. When sunlight and other gases act on it and ozone forms near the ground, that ozone is a secondary pollutant.</div>
      <div class="cp-note trap">A secondary pollutant is never released directly. It is always made later in the air.</div>
    `
  },
  25: {
    questext: "Which of the following is a primary pollutant?",
    options: ["Ozone formed near the ground", "Sulphur trioxide", "Carbon monoxide", "A product formed by reaction of other pollutants"],
    correct: "3",
    exptext: "✅ Carbon monoxide is released directly from the exhaust, so it is primary. 📌 Direct means primary. ❌ Ozone and sulphur trioxide form later in the air."
  },
  26: {
    questext: "A secondary pollutant is one that",
    options: ["Is emitted directly from a chimney", "Forms when primary pollutants react in the atmosphere", "Comes only from volcanoes", "Is always a solid"],
    correct: "2",
    exptext: "✅ A secondary pollutant forms in the air by reaction of primary pollutants. 📌 Secondary means second step. ❌ Direct emission belongs to primary pollutants."
  },
  27: {
    questext: "The major pollutant in the exhaust of automobiles is",
    options: ["Argon", "Methane", "Ammonia", "Carbon monoxide"],
    correct: "4",
    exptext: "✅ Carbon monoxide is formed by the incomplete burning of petrol and diesel. 📌 Automobile equals carbon monoxide. ❌ Ammonia comes from fertilizer factories."
  },
  28: {
    type: "concept", icon: "🗑️", accent: "#ec4899", pauseTimer: true,
    title: "Waste, Sewage and Noise Facts",
    html: `
      <p class="cp-lead">Waste of every kind must be managed well. <u>These facts tell us how each kind of waste is grouped, treated or reduced.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/15.png" alt="recycling bins sorted waste photo" data-caption="Sorting waste into bins makes recycling possible." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/16.png" alt="Two columns: Biodegradable (sewage, paper products, vegetables, seeds, leaves) and Non-bio" data-caption="Biodegradable and non-biodegradable waste with examples." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Electronic waste is generated from</td><td>Discarded electronic equipment</td></tr><tr><td>Solid waste disposal problem can be reduced through</td><td>Recycling</td></tr><tr><td>Sewage treatment is the treatment of</td><td>Wastewater</td></tr><tr><td>Biodegradable pollutants</td><td>Broken down naturally by microorganisms, such as sewage, paper products, vegetables, seeds and leaves</td></tr><tr><td>Non-biodegradable pollutants</td><td>Cannot be broken down into smaller, harmless, simpler substances</td></tr><tr><td>Sound that a person can bear without discomfort</td><td>About 80 decibels</td></tr><tr><td>Noise becomes harmful pollution</td><td>When it goes beyond about 80 decibels</td></tr></tbody></table>
      <p class="cp-lead">Biodegradable things return to the soil on their own, but non-biodegradable things stay for years. That is why recycling is the best answer for the second kind.</p>
      <div class="cp-note trap">Sewage treatment is for water, not for solid waste.</div>
    `
  },
  29: {
    questext: "Electronic waste is generated from",
    options: ["Discarded electronic equipment", "Kitchen waste", "Garden leaves", "Paper mills only"],
    correct: "1",
    exptext: "✅ Electronic waste means old and broken electronic goods. 📌 Old and broken gadgets become electronic waste. ❌ Kitchen waste and leaves are biodegradable."
  },
  30: {
    questext: "The problem of solid waste disposal can be reduced through",
    options: ["Burning in the open", "Dumping in rivers", "Recycling", "Burying plastic"],
    correct: "3",
    exptext: "✅ Recycling turns old waste into useful new things. 📌 Recycle cuts the heap. ❌ Burning and dumping only move the pollution somewhere else."
  },
  31: {
    questext: "Sewage treatment is the process of treating",
    options: ["Solid waste", "Wastewater", "Air pollutants", "Radioactive waste"],
    correct: "2",
    exptext: "✅ Sewage is dirty water from homes and hospitals, and it is cleaned by treatment. 📌 Sewage means wastewater. ❌ Solid waste is handled by recycling."
  },
  32: {
    type: "concept", icon: "🛡️", accent: "#14b8a6", pauseTimer: true,
    title: "Greenhouse, Ozone and Deforestation Facts",
    html: `
      <p class="cp-lead">These one-liners bring together the main facts on the ozone layer, greenhouse gases and forests. <u>Each of them is a favourite exam fact.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/17.png" alt="Two shields: Ozone layer stops ultraviolet rays, Greenhouse gases trap heat. Short labels " data-caption="The ozone layer blocks ultraviolet rays and greenhouse gases trap heat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/18.png" alt="deforestation cleared forest land aerial photo" data-caption="Cleared forest land: deforestation harms soil, wildlife and water cycles." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>The Montreal Protocol is</td><td>A global agreement to protect the stratospheric ozone layer</td></tr><tr><td>The thickness of the ozone layer is measured in</td><td>Dobson units</td></tr><tr><td>The ozone layer is</td><td>A region of the stratosphere that absorbs ultraviolet radiation of the sun</td></tr><tr><td>The ozone layer is made up of</td><td>Three oxygen atoms</td></tr><tr><td>Gases that trap heat in the atmosphere</td><td>Greenhouse gases: water vapour, carbon dioxide, methane, nitrous oxide and chlorofluorocarbons</td></tr><tr><td>Chlorofluorocarbon, a greenhouse gas, is produced from</td><td>Refrigerators (older ones)</td></tr><tr><td>Ozone layer depletion raises ultraviolet radiation, which causes</td><td>Skin cancers, eye cataracts and immunodeficiency disorders</td></tr><tr><td>Deforestation causes</td><td>Soil erosion, loss of biodiversity and disturbance in the hydrological cycle</td></tr></tbody></table>
      <p class="cp-lead">The hydrological cycle is the movement of water between the sea, air and land. Forests help to bring rain, so cutting them disturbs this cycle.</p>
      <div class="cp-note trap">Chlorofluorocarbons are both ozone depleting substances and greenhouse gases.</div>
    `
  },
  33: {
    questext: "Deforestation causes",
    options: ["Soil erosion only", "Loss of biodiversity only", "Disturbance in the hydrological cycle only", "Soil erosion, loss of biodiversity and disturbance in the hydrological cycle"],
    correct: "4",
    exptext: "✅ Cutting forests causes all three problems together. 📌 Trees hold soil, shelter life and help rain. ❌ The first three options name only one effect each."
  },
  34: {
    questext: "The greenhouse gas chlorofluorocarbon is produced from",
    options: ["Vehicles", "Refrigerators", "Volcanoes", "Paddy fields"],
    correct: "2",
    exptext: "✅ Chlorofluorocarbons were widely used as coolants in refrigerators. 📌 Chlorofluorocarbons mean fridge. ❌ Paddy fields release methane, not chlorofluorocarbons."
  },
  35: {
    questext: "Consider the following statements:\n1. The Montreal Protocol is a global agreement to protect the stratospheric ozone layer.\n2. Ozone layer depletion lowers the ultraviolet radiation that reaches the ground.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 A thinner ozone layer lets more ultraviolet rays through. ❌ Statement 2 is wrong because depletion increases ultraviolet radiation at the ground."
  },
  36: {
    type: "concept", icon: "🦁", accent: "#8b5cf6", pauseTimer: true,
    title: "Conservation Methods",
    html: `
      <p class="cp-lead">Conservation means saving plants and animals from being lost. <u>It is done in two ways: inside the natural home of the species, or outside it.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/19.png" alt="Two boxes: In-situ conservation inside the natural habitat, Ex-situ conservation outside t" data-caption="In-situ means in the natural home, ex-situ means outside it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/20.png" alt="national park wildlife tiger forest India photo" data-caption="A national park protects animals in their natural habitat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/21.png" alt="botanical garden plants greenhouse photo" data-caption="A botanical garden keeps plants outside their natural habitat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Method</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>In-situ conservation</td><td>Conservation within the natural habitat</td><td>National parks, wildlife sanctuaries, biosphere reserves</td></tr><tr><td>Ex-situ conservation</td><td>Conservation of selected plants and animals in selected areas outside their natural habitat</td><td>Botanical gardens, zoological gardens, germplasm banks</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A tiger living inside a national park is protected in-situ. A tiger living in a zoo is protected ex-situ.</div>
      <div class="cp-mnemonic">In-situ means in place, so in the natural home.</div>
      <div class="cp-note trap">Do not swap the two. National parks are in-situ and zoos are ex-situ.</div>
    `
  },
  37: {
    questext: "Conservation of species within their natural habitat is known as",
    options: ["Ex-situ conservation", "Gene banking only", "In-situ conservation", "Seed banking only"],
    correct: "3",
    exptext: "✅ In-situ means in the natural place. 📌 In-situ means in place. ❌ Ex-situ means outside the natural habitat."
  },
  38: {
    questext: "Which of the following is an example of ex-situ conservation?",
    options: ["National park", "Wildlife sanctuary", "Biosphere reserve", "Zoological garden"],
    correct: "4",
    exptext: "✅ A zoological garden keeps animals outside their natural habitat. 📌 Zoo equals ex-situ. ❌ National parks, sanctuaries and biosphere reserves protect nature in its natural place."
  },
  39: {
    type: "concept", icon: "⛽", accent: "#f97316", pauseTimer: true,
    title: "Energy and Fuels",
    html: `
      <p class="cp-lead">Energy sources can be clean or dirty, and some are limited while others never run out. <u>These facts tell us which fuel and source is linked with which fact.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/22.png" alt="Row of four boxes: Geothermal energy from Earth, Fossil fuels (natural gas, coal, petroleu" data-caption="Four important energy sources and one key fact for each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/23.png" alt="geothermal power plant steam photo" data-caption="A geothermal plant uses heat from inside the Earth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>The source of geothermal energy</td><td>The Earth (heat from inside it)</td></tr><tr><td>Natural gas, coal and petroleum are examples of</td><td>Fossil fuels</td></tr><tr><td>The best environmentally clean alternative fuel</td><td>Compressed natural gas</td></tr><tr><td>The energy source of the future</td><td>Hydrogen</td></tr><tr><td>Hydrogen on Earth is found mainly</td><td>In combination with oxygen, as water</td></tr><tr><td>The main component of natural gas</td><td>Methane</td></tr><tr><td>Share of methane in biogas</td><td>50 to 75 percent</td></tr><tr><td>The three Rs of energy conservation</td><td>Reduce, reuse and recycle</td></tr></tbody></table>
      <p class="cp-lead">Hydrogen is called the fuel of the future because when it burns it makes only water. Most of the hydrogen on Earth is locked up inside water.</p>
      <div class="cp-note trap">Natural gas is a fossil fuel, but it is cleaner than coal and petroleum.</div>
    `
  },
  40: {
    questext: "The source of geothermal energy is",
    options: ["The sun", "The Earth", "The wind", "The ocean tide"],
    correct: "2",
    exptext: "✅ Geothermal energy is the heat that comes from inside the Earth. 📌 Geo means Earth. ❌ Solar energy comes from the sun."
  },
  41: {
    questext: "Most of the hydrogen on Earth is found in the form of",
    options: ["Water", "Air", "Rocks", "Coal"],
    correct: "1",
    exptext: "✅ Hydrogen joins with oxygen to make water. 📌 Water has hydrogen in it. ❌ Air has very little free hydrogen."
  },
  42: {
    questext: "The methane content of biogas is approximately",
    options: ["10 to 20 percent", "25 to 40 percent", "50 to 75 percent", "90 to 99 percent"],
    correct: "3",
    exptext: "✅ Biogas has about 50 to 75 percent methane. 📌 About half to three quarters. ❌ A very small share would not make biogas a useful fuel."
  },
  43: {
    questext: "Which of the following is considered the best environmentally clean alternative fuel?",
    options: ["Coal", "Petrol", "Diesel", "Compressed natural gas"],
    correct: "4",
    exptext: "✅ Compressed natural gas burns more cleanly than petrol and diesel. 📌 Compressed natural gas is the clean fuel. ❌ Coal, petrol and diesel give out more pollutants."
  },
  44: {
    type: "concept", icon: "🗺️", accent: "#3b82f6", pauseTimer: true,
    title: "People, Places and Events",
    html: `
      <p class="cp-lead">A few names, places and events are asked as direct facts. <u>Link each name to one clear fact.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/24.png" alt="Salim Ali ornithologist birdwatching portrait photo" data-caption="Salim Ali was a famous Indian ornithologist and naturalist." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/25.png" alt="mangrove forest Sundarbans roots photo" data-caption="Mangrove forests grow in muddy coastal water; Indonesia has the largest share." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Important_One_Liners/26.png" alt="Bhopal Union Carbide factory ruins photo" data-caption="The abandoned factory site linked to the Bhopal gas tragedy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Salim Ali was</td><td>An Indian ornithologist and naturalist</td></tr><tr><td>The Green Gold revolution is related to</td><td>The promotion and trade of bamboo</td></tr><tr><td>Savanna grasslands are found</td><td>Between tropical rainforest and desert, mostly near the equator</td></tr><tr><td>The largest savanna</td><td>Located in Africa</td></tr><tr><td>The largest share of the mangrove area of the world</td><td>Is found in Indonesia</td></tr><tr><td>Bhopal gas tragedy</td><td>Caused by leakage of methyl isocyanate on the night of 2 to 3 December 1984</td></tr><tr><td>An estuary is</td><td>The tidal mouth of a large river</td></tr><tr><td>The earthworm is called</td><td>The farmer's friend</td></tr></tbody></table>
      <p class="cp-lead">An ornithologist is a scientist who studies birds. The earthworm is the farmer's friend because it loosens the soil and mixes in nutrients.</p>
      <div class="cp-note trap">Salim Ali studied birds, so he was an ornithologist, not a botanist.</div>
    `
  },
  45: {
    questext: "The Bhopal gas tragedy happened due to the leakage of",
    options: ["Methane", "Methyl isocyanate", "Chlorine", "Carbon monoxide"],
    correct: "2",
    exptext: "✅ The gas that leaked in Bhopal in December 1984 was methyl isocyanate. 📌 Bhopal means methyl isocyanate. ❌ Methane and carbon monoxide did not cause the tragedy."
  },
  46: {
    questext: "Which country has the largest share of the mangrove areas of the world?",
    options: ["Indonesia", "Brazil", "Australia", "India"],
    correct: "1",
    exptext: "✅ Indonesia has the largest share of the global mangrove area. 📌 Indonesia is the mangrove leader. ❌ India has mangroves in the Sundarbans, but not the largest share."
  },
  47: {
    questext: "The Green Gold revolution is related to the promotion and trade of",
    options: ["Tea", "Silk", "Bamboo", "Rubber"],
    correct: "3",
    exptext: "✅ Bamboo is called green gold because of its many uses and value. 📌 Green gold is bamboo. ❌ Tea, silk and rubber have different names for their revolutions."
  },
  48: {
    questext: "Salim Ali was an Indian",
    options: ["Botanist", "Geologist", "Chemist", "Ornithologist and naturalist"],
    correct: "4",
    exptext: "✅ Salim Ali studied birds, so he was an ornithologist and naturalist. 📌 Salim Ali is the Birdman of India. ❌ A botanist studies plants, which is not his field."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Science/Environmental_Science/Important_One_Liners/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a green notebook with a pencil, a small potted plant and a softly glowing globe" },
  "images/General_Science/Environmental_Science/Important_One_Liners/1.png": { t: "fig", about: "A calendar strip with four marked dates: 2 February World Wetlands Day, 22 April Earth Day, 22 May International Day for Biodiversity, 5 June World Environment Day." },
  "images/General_Science/Environmental_Science/Important_One_Liners/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Earth Day celebration people with banners photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/2.png. people gathered with green banners and earth-shaped balloons",
  "images/General_Science/Environmental_Science/Important_One_Liners/3.png": { t: "fig", about: "A stacked set of four labelled boxes: Ecosystem, Biotic components, Abiotic components, Trophic levels, with short links between them." },
  "images/General_Science/Environmental_Science/Important_One_Liners/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ocean coral reef underwater photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/4.png. a rich coral reef with colourful fish in clear water",
  "images/General_Science/Environmental_Science/Important_One_Liners/5.png": { t: "fig", about: "Concentric circles around Earth labelled Atmosphere, Hydrosphere, Lithosphere with a thin ring labelled Biosphere where they meet." },
  "images/General_Science/Environmental_Science/Important_One_Liners/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Earth from space blue planet photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/6.png. the blue planet Earth seen from space with clouds",
  "images/General_Science/Environmental_Science/Important_One_Liners/7.png": { t: "fig", about: "A bar chart of gases: Nitrogen 78 percent, Oxygen 21 percent, Carbon dioxide about 0.04 percent." },
  "images/General_Science/Environmental_Science/Important_One_Liners/8.png": { t: "fig", about: "Nitrogen reaching plants: Lightning turns nitrogen of air into nitrates, Bacteria in plant roots fix nitrogen, Plants take up nitrates and nitrogen compounds." },
  "images/General_Science/Environmental_Science/Important_One_Liners/9.png": { t: "fig", about: "A straight line: Producers, Primary consumers, Secondary consumers, with a separate box Decomposers receiving arrows from all three." },
  "images/General_Science/Environmental_Science/Important_One_Liners/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"omnivore human eating vegetables fruits market photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/10.png. a person buying vegetables and fruits at a market",
  "images/General_Science/Environmental_Science/Important_One_Liners/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"lichen growing on tree bark photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/11.png. a patch of green and grey lichen on tree bark",
  "images/General_Science/Environmental_Science/Important_One_Liners/12.png": { t: "fig", about: "A scale from clean river to polluted river with Biochemical oxygen demand low on the left and high on the right." },
  "images/General_Science/Environmental_Science/Important_One_Liners/13.png": { t: "fig", about: "Two panels: Primary pollutant goes straight from a chimney into air; Secondary pollutant forms in the air when two primary pollutants react." },
  "images/General_Science/Environmental_Science/Important_One_Liners/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"car exhaust pipe smoke photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/14.png. smoke coming out of the exhaust pipe of a car",
  "images/General_Science/Environmental_Science/Important_One_Liners/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"recycling bins sorted waste photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/15.png. colourful bins for sorting paper, plastic and glass",
  "images/General_Science/Environmental_Science/Important_One_Liners/16.png": { t: "fig", about: "Two columns: Biodegradable (sewage, paper products, vegetables, seeds, leaves) and Non-biodegradable (cannot be broken down into harmless simple substances)." },
  "images/General_Science/Environmental_Science/Important_One_Liners/17.png": { t: "fig", about: "Two shields: Ozone layer stops ultraviolet rays, Greenhouse gases trap heat. Short labels under each." },
  "images/General_Science/Environmental_Science/Important_One_Liners/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"deforestation cleared forest land aerial photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/18.png. an aerial view of a forest with a large patch cleared of trees",
  "images/General_Science/Environmental_Science/Important_One_Liners/19.png": { t: "fig", about: "Two boxes: In-situ conservation inside the natural habitat, Ex-situ conservation outside the natural habitat." },
  "images/General_Science/Environmental_Science/Important_One_Liners/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"national park wildlife tiger forest India photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/20.png. a tiger standing in a forest national park in India",
  "images/General_Science/Environmental_Science/Important_One_Liners/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"botanical garden plants greenhouse photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/21.png. visitors walking among planted trees in a botanical garden",
  "images/General_Science/Environmental_Science/Important_One_Liners/22.png": { t: "fig", about: "Row of four boxes: Geothermal energy from Earth, Fossil fuels (natural gas, coal, petroleum), Biogas (methane 50 to 75 percent), Hydrogen (energy of the future)." },
  "images/General_Science/Environmental_Science/Important_One_Liners/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"geothermal power plant steam photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/23.png. a geothermal power plant with white steam rising from the ground",
  "images/General_Science/Environmental_Science/Important_One_Liners/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Salim Ali ornithologist birdwatching portrait photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/24.png. Salim Ali, the Indian ornithologist, with binoculars",
  "images/General_Science/Environmental_Science/Important_One_Liners/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"mangrove forest Sundarbans roots photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/25.png. tangled roots of mangrove trees standing in tidal water",
  "images/General_Science/Environmental_Science/Important_One_Liners/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhopal Union Carbide factory ruins photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Important_One_Liners/26.png. the old abandoned factory site in Bhopal"
});

/* CHANGE LOG
   - The pyramid that shows energy or biomass at each level of a food chain is called an ecological pyramid; the term 'biological pyramid' was corrected.
   - Carbon dioxide share of air written as about 0.04 percent instead of 0.0391 percent.
   - Average temperature of Earth written as about 15 degrees Celsius; the figure of 16.4 degrees Celsius was removed because it conflicts with the standard value.
   - Most carnivores are predators; the statement that all carnivores are predators was corrected because scavengers such as vultures are carnivores but not predators.
   - Fresh water: about 69 percent is in polar ice and glaciers and about 30 percent in groundwater; the rounded figure of 70 percent was refined.
   - Nitrogen-fixing bacteria are in the roots of some plants such as pulses, not in the roots of all plants.
   - Harmful noise level written as beyond about 80 decibels; the unclear range of 80 to 99 decibels was simplified.
   - Bhopal gas tragedy date written as the night of 2 to 3 December 1984; the older single date of 2 December 1984 was refined.
   - Humans are omnivores: they act as primary consumers when they eat plants and as secondary consumers when they eat animals.
*/
