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

/* Field: General_Science · Subject: Environmental_Science · Chapter: Pollution · 10 concept pages (+ overview) · 24 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏭", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Pollution",
    thumb: {
      image: "images/General_Science/Environmental_Science/Pollution/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "ENVIRONMENTAL SCIENCE",
      line2: "POLLUTION",
      line3: "AIR • WATER • SOIL • NOISE",
      badge: "PART 2",
      ribbon: "LAWS • CAUSES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Pollution: Air, Water, Soil & Noise | Environmental Science for SSC & Railway",
      altTitles: ["Pollution Laws and Acid Rain Made Easy", "Air, Water, Noise Pollution Full Class for SSC CGL"],
      description: "Pollution is a high scoring topic of Environmental Science. In this class you learn each kind of pollution step by step, in very simple words.\n\n📌 IN THIS CLASS\n✅ Pollution, pollutants and the Environment (Protection) Act\n✅ Air pollution, smog and acid rain\n✅ Noise pollution and the decibel\n✅ Water pollution, eutrophication and biochemical oxygen demand\n✅ Soil and land pollution, e-waste and the three Rs\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #EnvironmentalScience #Pollution",
      tags: ["pollution for ssc cgl", "air pollution", "water pollution", "noise pollution", "soil pollution", "acid rain", "smog", "eutrophication", "biochemical oxygen demand", "bod meaning", "e waste management", "3r reduce reuse recycle", "air act 1981", "water act 1974", "general science for ssc", "environment for railway exams", "marble cancer taj mahal", "decibel unit of noise", "carbon monoxide pollution", "sulphur dioxide", "biodegradable waste", "non biodegradable waste", "social pollution", "environment mcq", "ssc chsl environment", "concept class"],
      hashtags: ["SSCCGL", "EnvironmentalScience", "Pollution"],
      thumbText: "POLLUTION: AIR WATER SOIL NOISE",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏭 New class is live: Pollution, Acid Rain, Eutrophication and E-waste. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Environmental Science — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on pollution</u>: what it is, its main kinds, what causes each kind, and how it can be controlled. Laws, gases, units and examples from this chapter are asked in almost every General Science paper.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>10</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>24</b><span>Questions</span></div>
        <div class="cp-stat"><b>~44 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Pollution and Pollutants</b><br>What pollution means, what a pollutant is, the four types of pollution and the law that protects our environment.</li>
        <li><b>Air Pollution</b><br>How the air gets contaminated, and the difference between natural and man-made sources.</li>
        <li><b>Pollutants from Vehicles and Industries</b><br>Carbon monoxide, smog, sulphur dioxide and other harmful gases, and the damage they do.</li>
        <li><b>Acid Rain</b><br>How rain becomes acidic, which gases cause it, and how it harms buildings, water and soil.</li>
        <li><b>Noise Pollution</b><br>The unit of sound, the main causes of noise and what it does to our health.</li>
        <li><b>Water Pollution</b><br>The sources of water pollution, the law for water, and the diseases that dirty water spreads.</li>
        <li><b>Eutrophication and Biochemical Oxygen Demand</b><br>Why too many nutrients choke a lake, and how oxygen demand tells us how polluted water is.</li>
        <li><b>Soil and Land Pollution</b><br>Types of waste, the causes of soil pollution and its effects.</li>
        <li><b>Control of Land Pollution</b><br>Electronic waste, the three Rs and simple steps that protect the land.</li>
        <li><b>Social Pollution</b><br>What social pollution means and a clear example.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> the years of the three pollution laws, the gases behind smog and acid rain, the unit of noise and the meaning of biochemical oxygen demand are asked again and again in Staff Selection Commission and Railway exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🏭", accent: "#0ea5e9", pauseTimer: true,
    title: "Pollution and Pollutants",
    html: `
      <p class="cp-lead">Human population has grown enormously. More people need more food, water, homes, electricity, roads and vehicles. <u>This puts heavy pressure on natural resources and also causes pollution of air, water and soil.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/1.png" alt="factory chimney smoke over city photo" data-caption="Factory chimneys release smoke and gases that pollute the air." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/2.png" alt="A cycle: More people, More demand for food, water and goods, More waste and smoke, Pollute" data-caption="A growing population increases demand, waste and pollution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Pollution</b> is any undesirable change in the physical, chemical or biological characteristics of air, land, water or soil. The agents that cause such a change are called <b>pollutants</b>. Carbon dioxide, carbon monoxide, sulphur dioxide and lead are examples of pollutants.</p>
      <table><thead><tr><th>Type of pollution</th><th>What is polluted</th></tr></thead><tbody><tr><td>Air pollution</td><td>The air</td></tr><tr><td>Water pollution</td><td>Rivers, lakes, seas and groundwater</td></tr><tr><td>Soil and land pollution</td><td>The soil and the land</td></tr><tr><td>Noise pollution</td><td>The sound around us</td></tr></tbody></table>
      <p class="cp-lead">To control pollution, the Government of India passed the Environment (Protection) Act in 1986. Its aim is to protect and improve the quality of our air, water and soil.</p>
      <div class="cp-example"><b>Example:</b> Smoke from a factory is a pollutant. It changes the chemical make-up of the air, and that undesirable change is air pollution.</div>
      <div class="cp-note trap">A pollutant is the harmful agent, and pollution is the harmful change it causes. Do not swap the two words.</div>
      <div class="cp-note exam">The Environment (Protection) Act belongs to 1986. The Air Act is of 1981 and the Water Act is of 1974.</div>
    `
  },
  3: {
    questext: "The Environment (Protection) Act was passed in India in the year",
    options: ["1974", "1981", "1986", "1991"],
    correct: "3",
    exptext: "✅ The Environment (Protection) Act was passed in 1986 to protect air, water and soil. 📌 Remember the order 74, 81, 86. ❌ 1974 is the year of the Water Act and 1981 is the year of the Air Act."
  },
  4: {
    questext: "Which of the following gives the correct order of these Indian laws, from the earliest to the latest?",
    options: ["Water Act, Air Act, Environment (Protection) Act", "Air Act, Water Act, Environment (Protection) Act", "Environment (Protection) Act, Water Act, Air Act", "Water Act, Environment (Protection) Act, Air Act"],
    correct: "1",
    exptext: "✅ The Water Act came in 1974, the Air Act in 1981 and the Environment (Protection) Act in 1986. 📌 Water first, then Air, then Environment. ❌ Option 2 swaps the Water Act and the Air Act."
  },
  5: {
    type: "concept", icon: "💨", accent: "#22c55e", pauseTimer: true,
    title: "Air Pollution",
    html: `
      <p class="cp-lead">Air is a mixture of gases. About 78 percent of it is nitrogen and about 21 percent is oxygen, and very small amounts of carbon dioxide, argon, methane, ozone and water vapour are also present. <u>When unwanted substances spoil the air and harm living and non-living things, it is called air pollution.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/3.png" alt="smog covered city skyline photo" data-caption="A city skyline hidden under thick polluted air." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/4.png" alt="Two-column chart: Natural sources (volcano, forest fire, fog, plant compounds, sea salt) a" data-caption="Natural and man-made sources of air pollution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The substances that contaminate the air are called <b>air pollutants</b>. In India, the Air (Prevention and Control of Pollution) Act came into force in 1981 to control air pollution.</p>
      <table><thead><tr><th>Source</th><th>Examples</th></tr></thead><tbody><tr><td>Natural</td><td>Volcanic eruptions, forest fires, fog, organic compounds from plants, sea salt</td></tr><tr><td>Man-made</td><td>Burning of fuel in factories, vehicles and power plants</td></tr></tbody></table>
      <p class="cp-lead">Natural sources have always existed, but man-made sources have grown very fast. Burning fuel in factories, vehicles and power plants is the main man-made cause, and it adds harmful gases to the air every day.</p>
      <div class="cp-example"><b>Example:</b> A volcanic eruption throws ash and gases into the air, and that is natural pollution. A bus burning diesel adds smoke to the air, and that is man-made pollution.</div>
      <div class="cp-note trap">A volcano is a natural source of pollution. Vehicles and factories are man-made sources.</div>
      <div class="cp-note exam">The Air (Prevention and Control of Pollution) Act came into force in 1981.</div>
    `
  },
  6: {
    questext: "Which of the following is a natural source of air pollution?",
    options: ["Vehicle exhaust", "Volcanic eruption", "Power plant", "Factory chimney"],
    correct: "2",
    exptext: "✅ A volcanic eruption releases ash and gases without any human action. 📌 Nature does it means natural source. ❌ Vehicles, power plants and factories are all made by humans."
  },
  7: {
    questext: "The Air (Prevention and Control of Pollution) Act came into force in India in the year",
    options: ["1974", "1986", "1991", "1981"],
    correct: "4",
    exptext: "✅ The Air Act came into force in 1981. 📌 Water 1974, Air 1981, Environment 1986. ❌ 1986 is the year of the Environment (Protection) Act."
  },
  8: {
    type: "concept", icon: "🚗", accent: "#f59e0b", pauseTimer: true,
    title: "Pollutants from Vehicles and Industries",
    html: `
      <p class="cp-lead">Vehicles, factories and power plants release many harmful gases. <u>Each gas has its own bad effect, and exams ask which gas causes what.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/5.png" alt="heavy traffic vehicle exhaust smoke road photo" data-caption="Vehicle exhaust adds carbon monoxide and nitrogen oxides to the air." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/6.png" alt="Taj Mahal marble yellowing pollution photo" data-caption="The marble of the Taj Mahal has turned yellowish because of air pollution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Pollutant</th><th>Where it comes from</th><th>Harm it does</th></tr></thead><tbody><tr><td>Carbon monoxide</td><td>Incomplete burning of petrol and diesel</td><td>Poisonous gas that lowers the oxygen-carrying capacity of the blood</td></tr><tr><td>Smog</td><td>Smoke and fog joined with oxides of nitrogen</td><td>Asthma, cough and wheezing, mostly in children</td></tr><tr><td>Sulphur dioxide</td><td>Burning of coal in power plants and petroleum refineries</td><td>Breathing problems and permanent lung damage</td></tr><tr><td>Ammonia</td><td>Synthetic fertilizer factories</td><td>Harms the human breathing tract</td></tr><tr><td>Hydrocarbons</td><td>Burning of coal and petroleum products</td><td>Air pollutant</td></tr><tr><td>Chlorofluorocarbons</td><td>Once used in refrigerators</td><td>Damage the ozone layer</td></tr></tbody></table>
      <p class="cp-lead">Carbon monoxide forms when fuel does not burn fully, because there is not enough air. It is the major pollutant in the exhaust of automobiles.</p>
      <p class="cp-lead">Smog is a joining of the words smoke and fog. Smoke has oxides of nitrogen, and these mix with other pollutants and fog to make a thick haze that makes breathing hard.</p>
      <div class="cp-note trap">Carbon monoxide is made by incomplete burning. Complete burning gives carbon dioxide.</div>
      <div class="cp-note exam">The air around the Taj Mahal has a lot of sulphur dioxide, and this has turned the marble yellowish.</div>
    `
  },
  9: {
    questext: "Carbon monoxide is dangerous to humans because it",
    options: ["Reduces the oxygen-carrying capacity of the blood", "Damages the ozone layer", "Makes rain acidic", "Causes smog only"],
    correct: "1",
    exptext: "✅ Carbon monoxide is a poisonous gas that reduces the oxygen-carrying capacity of the blood. 📌 It forms from incomplete burning. ❌ Damaging the ozone layer is the work of chlorofluorocarbons."
  },
  10: {
    questext: "Smog is a mixture of",
    options: ["Dust and rain", "Steam and smoke", "Smoke and fog", "Ash and clouds"],
    correct: "3",
    exptext: "✅ The word smog joins smoke and fog. 📌 Smoke plus fog gives smog. ❌ Steam and clouds are only water vapour and do not form smog."
  },
  11: {
    questext: "The outer surface of the Taj Mahal has been turning yellowish mainly because of the high presence of which gas in the air?",
    options: ["Carbon monoxide", "Sulphur dioxide", "Ammonia", "Methane"],
    correct: "2",
    exptext: "✅ Sulphur dioxide from nearby industries and burning fuel attacks the marble and makes it yellowish. 📌 Sulphur dioxide equals Taj damage. ❌ Carbon monoxide harms blood, not marble."
  },
  12: {
    type: "concept", icon: "🌧️", accent: "#ef4444", pauseTimer: true,
    title: "Acid Rain",
    html: `
      <p class="cp-lead">When the pH value of rainwater falls below 5.6, it is called <b>acid rain</b>. The pH value is a number that tells how acidic a liquid is. <u>Lower numbers mean more acid.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/7.png" alt="Flow: Factories and vehicles burn coal and petrol, Sulphur dioxide and nitrogen oxides go " data-caption="Gases from burning fuel mix with rain and fall as acid rain." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/8.png" alt="acid rain damage marble statue corrosion photo" data-caption="A statue worn away by acid rain." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Burning fossil fuels such as coal, oil and petrol gives off sulphur dioxide and nitrogen dioxide. These gases rise into the air and mix with water in the clouds, which makes the rain acidic.</p>
      <table><thead><tr><th>Effect of acid rain</th><th>What happens</th></tr></thead><tbody><tr><td>On people and animals</td><td>Causes breathing problems</td></tr><tr><td>On water pipes</td><td>Corrodes them, so iron, lead and copper leach into drinking water</td></tr><tr><td>On buildings</td><td>Damages stone and metal; the Taj Mahal has been affected</td></tr><tr><td>On soil</td><td>Washes away basic nutrients such as calcium</td></tr></tbody></table>
      <p class="cp-lead">Acid rain eats away the marble of monuments. This is also called <b>marble cancer</b>.</p>
      <div class="cp-note trap">Normal rain is slightly acidic. It becomes acid rain only when the pH value goes below 5.6.</div>
      <div class="cp-note exam">Acid rain is caused by emissions of sulphur dioxide and oxides of nitrogen.</div>
    `
  },
  13: {
    questext: "Rain is called acid rain when its pH value falls below",
    options: ["7.0", "6.5", "4.5", "5.6"],
    correct: "4",
    exptext: "✅ Rainwater with a pH value below 5.6 is called acid rain. 📌 Remember 5.6. ❌ A value of 7.0 is neutral, and 6.5 is not low enough."
  },
  14: {
    questext: "Acid rain is mainly caused by the emissions of oxides of",
    options: ["Sulphur and nitrogen", "Carbon and hydrogen", "Calcium and iron", "Argon and neon"],
    correct: "1",
    exptext: "✅ Sulphur dioxide and nitrogen oxides mix with water in the air and make it acidic. 📌 Sulphur plus nitrogen. ❌ Carbon and hydrogen are not the main acid-rain gases."
  },
  15: {
    questext: "The damage of marble monuments by acid rain is popularly called",
    options: ["Marble fever", "Stone blindness", "Marble cancer", "Rock rust"],
    correct: "3",
    exptext: "✅ Acid rain corrodes marble, and this is called marble cancer. 📌 Marble plus cancer means eaten marble. ❌ The other three are not used for this damage."
  },
  16: {
    type: "concept", icon: "🔊", accent: "#a855f7", pauseTimer: true,
    title: "Noise Pollution",
    html: `
      <p class="cp-lead"><b>Noise pollution</b> is the release of loud sound that harms human health and the activities of animals. <u>Sound is measured in decibels.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/9.png" alt="noisy city traffic jam horns photo" data-caption="A busy road with many vehicles is a main source of noise in cities." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/10.png" alt="A scale of loudness: Whisper, Normal talk, Traffic, Loud speaker, Aeroplane, with a bar ri" data-caption="Loudness rises from a whisper to an aeroplane." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">In India, the Air (Prevention and Control of Pollution) Act came into force in 1981. It was amended in 1987 to include noise as an air pollutant.</p>
      <table><thead><tr><th>Causes of noise pollution</th><th>Effects of noise pollution</th></tr></thead><tbody><tr><td>Transport systems, the main source in cities</td><td>Permanent hearing loss</td></tr><tr><td>Aircraft noise</td><td>Insomnia, which means loss of sleep</td></tr><tr><td>Construction work</td><td>Depression-related diseases</td></tr><tr><td>Industries, loudspeakers and firecrackers</td><td>Stress and poor health</td></tr></tbody></table>
      <p class="cp-lead">The loudness of sound that a person can bear without discomfort is about 80 decibels. Beyond this level, sound begins to cause harm.</p>
      <div class="cp-note trap">Decibel is the unit of sound. The Dobson unit measures the ozone layer, so do not confuse them.</div>
      <div class="cp-note exam">Noise became an air pollutant in India by the amendment of 1987.</div>
    `
  },
  17: {
    questext: "The unit of loudness of sound is",
    options: ["Dobson", "Decibel", "Joule", "Watt"],
    correct: "2",
    exptext: "✅ Decibel is the unit used to measure the loudness of sound. 📌 Sound means decibel. ❌ Dobson is the unit for ozone thickness."
  },
  18: {
    questext: "Noise was included as an air pollutant in India through an amendment in the year",
    options: ["1974", "1981", "1986", "1987"],
    correct: "4",
    exptext: "✅ The Air Act of 1981 was amended in 1987 to include noise. 📌 Noise came six years after the Air Act. ❌ 1981 is when the Air Act itself began."
  },
  19: {
    questext: "Consider the following statements about noise pollution:\n1. Transport systems are the main source of noise pollution in urban areas.\n2. Noise pollution can never cause permanent hearing loss.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because roads, trains and aircraft are the largest noise makers in cities. 📌 Loud noise can harm ears for ever. ❌ Statement 2 is wrong because permanent hearing loss is a known effect."
  },
  20: {
    type: "concept", icon: "🌊", accent: "#06b6d4", pauseTimer: true,
    title: "Water Pollution",
    html: `
      <p class="cp-lead">People have been misusing rivers, lakes and seas by throwing all kinds of waste into them. <u>When water is spoiled in this way, it is called water pollution.</u> To protect our water, the Government of India passed the Water (Prevention and Control of Pollution) Act in 1974.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/11.png" alt="polluted river industrial waste discharge photo" data-caption="A river polluted by waste from a nearby factory." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/12.png" alt="A river in the middle with five arrows pointing to it: Industrial wastes, Surface run-off," data-caption="Five main sources that pollute rivers, lakes and seas." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Source of water pollution</th><th>Meaning</th></tr></thead><tbody><tr><td>Industrial wastes</td><td>Chemicals and waste from factories</td></tr><tr><td>Surface run-off</td><td>Rain water that washes dirt and chemicals from land into water</td></tr><tr><td>Thermal and nuclear power stations</td><td>Release hot water into rivers and seas</td></tr><tr><td>Oil spills</td><td>Oil leaking from ships and pipes</td></tr><tr><td>Domestic sewage</td><td>Waste water from homes and hospitals</td></tr></tbody></table>
      <p class="cp-lead">Sewage from homes and hospitals often has harmful germs that cause disease. If it is let into water without proper treatment, serious diseases such as dysentery, typhoid, jaundice and cholera can spread.</p>
      <div class="cp-example"><b>Example:</b> A town drains its sewage into a river without treating it. People downstream drink the same water and many fall ill with cholera.</div>
      <div class="cp-note trap">Planting trees on a riverbank does not pollute water. It protects the river.</div>
      <div class="cp-note exam">The Water (Prevention and Control of Pollution) Act belongs to 1974.</div>
    `
  },
  21: {
    questext: "Which of the following diseases can spread through untreated sewage in water?",
    options: ["Asthma", "Cataract", "Cholera", "Snow-blindness"],
    correct: "3",
    exptext: "✅ Cholera spreads when germs from sewage enter drinking water. 📌 Dirty water gives stomach diseases such as cholera, typhoid and dysentery. ❌ Asthma is linked to air pollution and cataract to ultraviolet rays."
  },
  22: {
    questext: "Which of the following is NOT a source of water pollution?",
    options: ["Oil spills", "Planting trees along riverbanks", "Industrial wastes", "Domestic sewage"],
    correct: "2",
    exptext: "✅ Trees on riverbanks hold the soil and protect the water. 📌 Waste going into water pollutes, and plants protect. ❌ Oil spills, industrial wastes and sewage all pour harmful things into water."
  },
  23: {
    type: "concept", icon: "🦠", accent: "#84cc16", pauseTimer: true,
    title: "Eutrophication and Biochemical Oxygen Demand",
    html: `
      <p class="cp-lead"><b>Eutrophication</b> happens when a water body gets too many dissolved nutrients such as phosphates and nitrates. These nutrients make water plants and algae grow very fast. <u>As a result, the dissolved oxygen in the water drops.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/13.png" alt="algal bloom green lake pond photo" data-caption="A lake covered with algae because of too many nutrients." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/14.png" alt="Flow: Fertilizer and sewage add nitrates and phosphates, Algae grow very fast, Algae die a" data-caption="How extra nutrients lead to fish deaths in a lake." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">When the extra algae die, bacteria break them down and use up much of the oxygen in the water. Fish and other water animals then cannot breathe.</p>
      <p class="cp-lead"><b>Biochemical oxygen demand</b> is the amount of dissolved oxygen that tiny living things need to break down the organic waste in a water sample, at a set temperature, over a set time. <u>The more organic waste there is, the higher the demand for oxygen.</u></p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Eutrophication</td><td>Water body enriched with plant nutrients, mostly nitrogen and phosphorus</td></tr><tr><td>High biochemical oxygen demand</td><td>Much organic waste in water, so water is highly polluted</td></tr><tr><td>Low biochemical oxygen demand</td><td>Little organic waste in water, so water is cleaner</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> Two river samples are tested. Sample A needs a lot of oxygen to clear its waste, and sample B needs very little. Sample A is the more polluted river.</div>
      <div class="cp-note trap">High oxygen demand means dirtier water, not cleaner water.</div>
      <div class="cp-note exam">Biochemical oxygen demand is the usual test for how polluted river water is.</div>
    `
  },
  24: {
    questext: "Eutrophication in a lake is caused by an excess of",
    options: ["Oxygen and carbon dioxide", "Sodium and chlorine", "Calcium and iron", "Nitrates and phosphates"],
    correct: "4",
    exptext: "✅ Excess nitrates and phosphates make algae grow too fast. 📌 Plant food in water means eutrophication. ❌ Oxygen is actually lost in this process, not added."
  },
  25: {
    questext: "A river with a high biochemical oxygen demand value is",
    options: ["Highly polluted", "Very clean", "Rich in oxygen", "Free from organic waste"],
    correct: "1",
    exptext: "✅ High demand means there is a lot of organic waste for microbes to break down. 📌 High demand means more dirt. ❌ A clean river has a low value and plenty of oxygen."
  },
  26: {
    questext: "A major result of eutrophication in a water body is",
    options: ["Increase in dissolved oxygen", "Depletion of dissolved oxygen", "Fall in algae", "Clearer water"],
    correct: "2",
    exptext: "✅ Fast-growing algae die and rot, and this uses up the oxygen in the water. 📌 Too many nutrients, then too little oxygen. ❌ Algae increase, not fall, during eutrophication."
  },
  27: {
    type: "concept", icon: "🌍", accent: "#ec4899", pauseTimer: true,
    title: "Soil and Land Pollution",
    html: `
      <p class="cp-lead"><b>Soil pollution</b> is a change in the physical, chemical and biological condition of the soil caused by human activities. <u>It lowers the quality and the productivity of the soil.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/15.png" alt="plastic waste garbage dump landfill photo" data-caption="A garbage dump full of plastic waste that spoils the land." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/16.png" alt="Three boxes: Biodegradable (food waste, paper, animal waste), Recyclable (paper, glass, me" data-caption="The three kinds of waste and an example of each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">All the waste we make can be grouped into three types: biodegradable, recyclable and non-biodegradable. Biodegradable waste rots naturally, and non-biodegradable waste does not.</p>
      <table><thead><tr><th>Type of waste</th><th>Examples</th></tr></thead><tbody><tr><td>Biodegradable</td><td>Human and animal waste, food waste, paper waste, remains of dead living things</td></tr><tr><td>Non-biodegradable</td><td>Polyethylene bags, glass, metals such as aluminium, copper, zinc and iron, electronic devices, computer parts, batteries, medical waste, plastic bottles</td></tr></tbody></table>
      <table><thead><tr><th>Causes of soil pollution</th><th>Effects of soil pollution</th></tr></thead><tbody><tr><td>Acid rain, deforestation, industrial and mining activities</td><td>Lower soil fertility</td></tr><tr><td>Accidental oil spills, modern farming practices</td><td>Less nitrogen fixation</td></tr><tr><td>Electronic waste, disposal of coal ash</td><td>Public health problems and poisonous chemicals entering groundwater</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A plastic bag buried in soil stays there for many years. It blocks water and air from reaching the roots, so the soil slowly loses fertility.</div>
      <div class="cp-note trap">Paper and food waste are biodegradable. Plastic, glass and batteries are not.</div>
    `
  },
  28: {
    questext: "Which of the following is a non-biodegradable waste?",
    options: ["Food waste", "Paper", "Plastic bottle", "Animal waste"],
    correct: "3",
    exptext: "✅ A plastic bottle cannot be broken down by microbes. 📌 Plastic stays for ever. ❌ Food, paper and animal waste are all biodegradable."
  },
  29: {
    questext: "Which of the following is NOT a cause of soil pollution?",
    options: ["Mining activities", "Acid rain", "Disposal of coal ash", "Afforestation"],
    correct: "4",
    exptext: "✅ Afforestation means planting trees, which protects the soil. 📌 Trees save soil, and waste spoils it. ❌ Mining, acid rain and coal ash all damage the soil."
  },
  30: {
    questext: "Consider the following statements about waste:\n1. Glass and batteries are biodegradable.\n2. Polyethylene bags are non-biodegradable.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct, because microbes cannot break down polyethylene. 📌 Man-made items such as glass and plastic last long. ❌ Statement 1 is wrong because glass and batteries are non-biodegradable."
  },
  31: {
    type: "concept", icon: "♻️", accent: "#14b8a6", pauseTimer: true,
    title: "Control of Land Pollution",
    html: `
      <p class="cp-lead"><b>Electronic waste</b> means broken or useless computers and other electronic goods that cannot be repaired. <u>Recycling is the best way to treat it,</u> because it recovers useful materials and keeps harmful chemicals out of the soil.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/17.png" alt="electronic waste recycling pile old computers photo" data-caption="A pile of electronic waste waiting to be recycled." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/18.png" alt="A triangle of three arrows: Reduce, Reuse, Recycle, each with a short plain meaning." data-caption="The three Rs: reduce, reuse and recycle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>three Rs</b> are reduce, reuse and recycle. Reduce means use less, reuse means use the same thing again, and recycle means turn old things into new ones.</p>
      <table><thead><tr><th>Step</th><th>How it helps</th></tr></thead><tbody><tr><td>Use natural fertilizers</td><td>Keeps chemicals out of the soil</td></tr><tr><td>Afforestation</td><td>Trees hold the soil and stop it from washing away</td></tr><tr><td>Follow the three Rs</td><td>Cuts down the amount of waste</td></tr><tr><td>Use less dangerous chemicals</td><td>Lowers soil poison</td></tr><tr><td>Solid waste management</td><td>Prevents land pollution</td></tr><tr><td>Carry cloth bags and refuse polythene bags</td><td>Cuts plastic waste</td></tr></tbody></table>
      <p class="cp-lead">Hospitals produce dangerous waste that has disinfectants, harmful chemicals and germs. This waste needs careful treatment and safe disposal.</p>
      <div class="cp-example"><b>Example:</b> Instead of buying a new plastic bag every time, a shopper carries one cloth bag. Over a year, hundreds of plastic bags are saved.</div>
      <div class="cp-note trap">Burning or burying electronic waste releases poisons. Recycling is the proper method.</div>
      <div class="cp-note exam">The three Rs of waste control are reduce, reuse and recycle.</div>
    `
  },
  32: {
    questext: "The three Rs for controlling waste stand for",
    options: ["Reduce, reuse, recycle", "Remove, repair, recycle", "Reduce, refill, return", "Rethink, reuse, remove"],
    correct: "1",
    exptext: "✅ The three Rs are reduce, reuse and recycle. 📌 Use less, use again, make new. ❌ The other options mix in words that are not part of the rule."
  },
  33: {
    questext: "The best way to treat electronic waste is",
    options: ["Burning it in the open", "Burying it in fields", "Recycling", "Dumping it in rivers"],
    correct: "3",
    exptext: "✅ Recycling recovers useful metals and keeps poisons out of nature. 📌 E-waste goes to recycling. ❌ Burning, burying and dumping all spread poisons into air, soil or water."
  },
  34: {
    type: "concept", icon: "👥", accent: "#8b5cf6", pauseTimer: true,
    title: "Social Pollution",
    html: `
      <p class="cp-lead"><b>Social pollution</b> means a harmful change in the social structure of a country. <u>It is not caused by gases or waste, but by problems inside society.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/19.png" alt="slum housing poverty urban India photo" data-caption="Crowded low-income housing is an example of the problems of social pollution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Science/Environmental_Science/Pollution/20.png" alt="Mind-map: centre Social pollution, branches Poverty, Overcrowding, Lack of education, Unhe" data-caption="Problems in society that are grouped as social pollution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Poverty is the clearest example. When many people cannot get food, clean water and good homes, society itself becomes unhealthy.</p>
      <div class="cp-note trap">Social pollution is about society, not about air, water or soil.</div>
      <div class="cp-note exam">Poverty is the standard example of social pollution.</div>
    `
  },
  35: {
    questext: "Which of the following is an example of social pollution?",
    options: ["Smog", "Poverty", "Acid rain", "Eutrophication"],
    correct: "2",
    exptext: "✅ Poverty is a harmful problem of social structure, so it is social pollution. 📌 Social means society. ❌ Smog, acid rain and eutrophication are physical or chemical pollution."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Science/Environmental_Science/Pollution/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a factory chimney with soft grey smoke, a clean water drop and a green leaf, drawn in a realistic elegant style" },
  "images/General_Science/Environmental_Science/Pollution/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"factory chimney smoke over city photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/1.png. a factory with tall chimneys releasing smoke into the sky",
  "images/General_Science/Environmental_Science/Pollution/2.png": { t: "fig", about: "A cycle: More people, More demand for food, water and goods, More waste and smoke, Polluted air, water and soil. Arrows in a circle." },
  "images/General_Science/Environmental_Science/Pollution/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"smog covered city skyline photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/3.png. a city skyline covered in grey haze",
  "images/General_Science/Environmental_Science/Pollution/4.png": { t: "fig", about: "Two-column chart: Natural sources (volcano, forest fire, fog, plant compounds, sea salt) and Man-made sources (factories, vehicles, power plants)." },
  "images/General_Science/Environmental_Science/Pollution/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"heavy traffic vehicle exhaust smoke road photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/5.png. cars and trucks in traffic with visible exhaust smoke",
  "images/General_Science/Environmental_Science/Pollution/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Taj Mahal marble yellowing pollution photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/6.png. the white marble of the Taj Mahal looking pale yellow",
  "images/General_Science/Environmental_Science/Pollution/7.png": { t: "fig", about: "Flow: Factories and vehicles burn coal and petrol, Sulphur dioxide and nitrogen oxides go up, They mix with rain, Acid rain falls on buildings, water and soil." },
  "images/General_Science/Environmental_Science/Pollution/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"acid rain damage marble statue corrosion photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/8.png. a marble statue with eaten, rough and stained surface",
  "images/General_Science/Environmental_Science/Pollution/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"noisy city traffic jam horns photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/9.png. a crowded city road with many vehicles stuck in traffic",
  "images/General_Science/Environmental_Science/Pollution/10.png": { t: "fig", about: "A scale of loudness: Whisper, Normal talk, Traffic, Loud speaker, Aeroplane, with a bar rising from low to high." },
  "images/General_Science/Environmental_Science/Pollution/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"polluted river industrial waste discharge photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/11.png. a river with dirty foamy water near a factory outlet",
  "images/General_Science/Environmental_Science/Pollution/12.png": { t: "fig", about: "A river in the middle with five arrows pointing to it: Industrial wastes, Surface run-off, Thermal and nuclear power stations, Oil spills, Domestic sewage." },
  "images/General_Science/Environmental_Science/Pollution/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"algal bloom green lake pond photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/13.png. a lake covered by a thick green layer of algae",
  "images/General_Science/Environmental_Science/Pollution/14.png": { t: "fig", about: "Flow: Fertilizer and sewage add nitrates and phosphates, Algae grow very fast, Algae die and rot, Oxygen in water falls, Fish die." },
  "images/General_Science/Environmental_Science/Pollution/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"plastic waste garbage dump landfill photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/15.png. a large garbage dump covered in plastic waste",
  "images/General_Science/Environmental_Science/Pollution/16.png": { t: "fig", about: "Three boxes: Biodegradable (food waste, paper, animal waste), Recyclable (paper, glass, metal), Non-biodegradable (plastic, batteries, medical waste)." },
  "images/General_Science/Environmental_Science/Pollution/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"electronic waste recycling pile old computers photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/17.png. a heap of old computers and electronic parts",
  "images/General_Science/Environmental_Science/Pollution/18.png": { t: "fig", about: "A triangle of three arrows: Reduce, Reuse, Recycle, each with a short plain meaning." },
  "images/General_Science/Environmental_Science/Pollution/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"slum housing poverty urban India photo\". Download a clear, suitable photo and save it as images/General_Science/Environmental_Science/Pollution/19.png. crowded low-income homes in an Indian city",
  "images/General_Science/Environmental_Science/Pollution/20.png": { t: "fig", about: "Mind-map: centre Social pollution, branches Poverty, Overcrowding, Lack of education, Unhealthy living conditions." }
});

/* CHANGE LOG
   - Vehicle exhaust is described as a major source of air pollution; the unsupported figure of 50 percent was removed.
   - Recycling is described as the best and main way to treat electronic waste, instead of the only way.
   - Social pollution is explained with poverty as the example; the unclear example 'increasing pollution' was removed.
   - The yellowing of the Taj Mahal is described as partly due to air pollution such as sulphur dioxide, not only the Mathura refinery.
   - Chlorofluorocarbons are described as chemicals once widely used in refrigerators and air coolers; their use is now phased out under the Montreal Protocol.
*/
