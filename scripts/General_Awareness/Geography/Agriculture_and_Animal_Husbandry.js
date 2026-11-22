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

/* Field: General_Awareness · Subject: Geography · Chapter: Agriculture_and_Animal_Husbandry · 20 concept pages (+ overview) · 42 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌾", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Agriculture and Animal Husbandry",
    thumb: {
      image: "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/thumbnail.png",
      banner: "GEOGRAPHY FOR COMPETITIVE EXAMS 2026",
      line1: "AGRICULTURE",
      line2: "CROPS AND FARMING",
      line3: "OF INDIA",
      badge: "FULL CLASS",
      ribbon: "KHARIF • RABI • CROPS • MCQ",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Agriculture of India | Crops, Farming Types, Revolutions | SSC CGL Geography",
      altTitles: ["Kharif Rabi Zaid Crops and Types of Farming in One Class", "Colour Revolutions of India Trick for SSC CGL"],
      description: "Agriculture is a favourite topic in General Awareness. In this class we learn the crop seasons, the types of farming, the major crops of India and the colour revolutions step by step in simple words.\n\n📌 IN THIS CLASS\n✅ Kharif, Rabi and Zaid crops\n✅ Types of farming\n✅ Rice, wheat, pulses, oilseeds, tea, coffee, cotton, sugarcane and jute\n✅ Cropping intensity and revolutions\n✅ Practice questions with easy explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Crop seasons\n00:00 Types of farming\n00:00 Major crops\n00:00 Revolutions\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Agriculture #Geography",
      tags: ["agriculture of india", "indian agriculture", "kharif rabi zaid crops", "types of farming", "organic farming", "major crops of india", "rice wheat cotton", "tea coffee jute", "sugarcane crop", "pulses and oilseeds", "cropping intensity", "agricultural revolutions", "green revolution", "white revolution", "ssc cgl geography", "general awareness", "static gk", "indian geography", "agriculture tricks", "geography mcq", "geography for ssc", "competitive exams", "upsc geography", "banking exams", "railway exams", "defence exams", "Agriculture and Anima"],
      hashtags: ["SSCCGL", "Agriculture", "Geography"],
      thumbText: "AGRICULTURE OF INDIA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🌾 New class is live: Agriculture of India, crops, farming types and revolutions. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Crop seasons\n00:00 Types of farming\n00:00 Major crops\n00:00 Revolutions",
      playlist: "General Awareness — Geography Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on Indian agriculture</u>: the crop seasons, the types of farming, the major crops and the colour revolutions. Agriculture questions are asked in almost every General Awareness paper, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>20</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>42</b><span>Questions</span></div>
        <div class="cp-stat"><b>~82 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Introduction and Crop Seasons</b><br>Why Indian farming depends on the monsoon, and what Kharif, Rabi and Zaid crops are.</li>
        <li><b>Types of Farming</b><br>Subsistence, shifting, extensive, commercial, plantation, organic, aquaculture, contract, cooperative, truck and mixed farming.</li>
        <li><b>Food Crops</b><br>Rice, wheat, millets, maize, pulses and oilseeds: soil, climate, states and diseases.</li>
        <li><b>Cash and Fibre Crops</b><br>Tea, coffee, cotton, sugarcane and jute, with the Boards and soils connected to them.</li>
        <li><b>Cropping Intensity and Revolutions</b><br>How many crops a field gives in a year, and the colour names of the revolutions.</li>
        <li><b>Practice</b><br>After each topic you will solve questions, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> crop seasons, crop soils, top states, boards and revolution names are asked again and again, so learning them in pairs gives sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🌾", accent: "#22c55e", pauseTimer: true,
    title: "General Introduction to Indian Agriculture",
    html: `
      <p class="cp-lead">India is an <b>agricultural country</b>. About 55 percent of the population depends on farming and related work, and agriculture and its allied sectors gave about 17.1 percent of the country's gross value added in 2017-18.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/1.png" alt="Indian farmers working in a green paddy field photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Indian agriculture depends mainly on the monsoon rains. If the rains fail, crops fail, so it is often called a <b>gamble of the monsoon</b>.</p>
      <p class="cp-lead">Indian crops are sown in three seasons: <b>Kharif</b>, <b>Rabi</b> and <b>Zaid</b>. We will learn each one in turn.</p>
      <table><thead><tr><th>Season</th><th>Sowing</th><th>Harvest</th></tr></thead><tbody><tr><td>Kharif</td><td>June to July</td><td>September to October</td></tr><tr><td>Rabi</td><td>October to November</td><td>April to May</td></tr><tr><td>Zaid</td><td>March</td><td>June</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/2.png" alt="Calendar wheel of the year with three coloured arcs labelled Kharif (June to October), Rab" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The word allied sector means related work such as animal husbandry and fishing. It is not only crop farming.</div>
      <div class="cp-note exam">Questions often ask for the season of a crop or the share of agriculture in the economy.</div>
    `
  },
  3: {
    questext: "Indian agriculture is called a gamble of the",
    options: ["market", "river", "monsoon", "soil"],
    correct: "3",
    exptext: "✅ Indian farming depends mainly on monsoon rains, so a poor monsoon spoils the crops. 📌 No rain, no grain. ❌ Market is wrong because the name is about rainfall."
  },
  4: {
    questext: "Indian agriculture mainly depends on",
    options: ["the monsoon rains", "canals only", "glaciers", "tube wells only"],
    correct: "1",
    exptext: "✅ A large part of Indian farming still depends on monsoon rainfall. 📌 India is a monsoon farmland. ❌ Canals only is wrong because many farms get no canal water."
  },
  5: {
    type: "concept", icon: "☔", accent: "#f59e0b", pauseTimer: true,
    title: "Kharif Crops",
    html: `
      <p class="cp-lead"><b>Kharif crops</b> are sown in June to July and harvested in September to October. They are the rainy-season crops.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/3.png" alt="Paddy rice field monsoon rain India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The south-west monsoon rains help their growth. At the time of sowing, they need higher temperature and more humidity.</p>
      <table><thead><tr><th>Kharif crops</th><th>Examples</th></tr></thead><tbody><tr><td>Cereals and millets</td><td>Paddy, jowar, bajra, ragi, maize</td></tr><tr><td>Pulses</td><td>Pigeon pea, moong, urad, cowpea</td></tr><tr><td>Oilseeds</td><td>Soybean, sesame, groundnut</td></tr><tr><td>Cash crops</td><td>Cotton, tobacco</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/4.png" alt="A picture grid of nine Kharif crops with labels: paddy, soybean, pigeon pea, sesame, moong" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not put cotton and groundnut in the Rabi list. They are Kharif crops.</div>
      <div class="cp-note exam">Paddy, maize, cotton, soybean and groundnut are the standard Kharif crops.</div>
      <div class="cp-mnemonic">Kharif is Khana plus Rain: paddy and cotton.</div>
    `
  },
  6: {
    questext: "Kharif crops are sown and harvested in",
    options: ["October to November and April to May", "March and June", "January and March", "June to July and September to October"],
    correct: "4",
    exptext: "✅ Kharif crops are sown with the monsoon and harvested in autumn. 📌 Kharif is the rainy crop. ❌ October to November is wrong because that is the Rabi sowing time."
  },
  7: {
    questext: "Which of the following is a Kharif crop?",
    options: ["Wheat", "Paddy", "Mustard", "Barley"],
    correct: "2",
    exptext: "✅ Paddy needs heat and rain, so it is a Kharif crop. 📌 Rainy crop, rice crop. ❌ Wheat is wrong because it is a winter crop."
  },
  8: {
    type: "concept", icon: "❄️", accent: "#ef4444", pauseTimer: true,
    title: "Rabi Crops",
    html: `
      <p class="cp-lead"><b>Rabi crops</b> are sown in October to November and harvested in April to May. They are the winter crops.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/5.png" alt="Wheat field green winter India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Winter rain, brought by western disturbances, helps Rabi crops. They need a low temperature for growing and a high temperature and long daylight for ripening.</p>
      <table><thead><tr><th>Rabi crops</th><th>Examples</th></tr></thead><tbody><tr><td>Cereals</td><td>Wheat, barley</td></tr><tr><td>Pulses</td><td>Gram, peas, lentils</td></tr><tr><td>Oilseeds</td><td>Mustard, linseed</td></tr><tr><td>Others</td><td>Potato, rye</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/6.png" alt="A picture grid of nine Rabi crops with labels: wheat, barley, peas, gram, mustard, potato," style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Western disturbances are winter winds that bring rain from the west. They are not the monsoon.</div>
      <div class="cp-note exam">Wheat, barley, gram, peas and mustard are the standard Rabi crops.</div>
    `
  },
  9: {
    questext: "Which of the following is a Rabi crop?",
    options: ["Paddy", "Cotton", "Mustard", "Groundnut"],
    correct: "3",
    exptext: "✅ Mustard is sown in winter and harvested in spring. 📌 Mustard likes the cold. ❌ Paddy is wrong because it is a Kharif crop."
  },
  10: {
    questext: "Rainfall caused by western disturbances in winter helps which crops?",
    options: ["Rabi crops", "Kharif crops", "Zaid crops", "Jute"],
    correct: "1",
    exptext: "✅ Winter rain from western disturbances helps wheat and other Rabi crops. 📌 Western winds, winter crops. ❌ Kharif crops is wrong because they grow with the summer monsoon."
  },
  11: {
    type: "concept", icon: "🍉", accent: "#8b5cf6", pauseTimer: true,
    title: "Zaid Crops",
    html: `
      <p class="cp-lead"><b>Zaid crops</b> are grown in the short season between Rabi and Kharif. They are sown in March and harvested by June. They are mainly summer crops.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/7.png" alt="Watermelon cucumber summer crop field India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Cucumber, watermelon, melon and bitter gourd are the major Zaid crops.</p>
      <table><thead><tr><th>Season</th><th>Time</th><th>Crops</th></tr></thead><tbody><tr><td>Kharif</td><td>June to October</td><td>Paddy, cotton</td></tr><tr><td>Rabi</td><td>October to May</td><td>Wheat, mustard</td></tr><tr><td>Zaid</td><td>March to June</td><td>Cucumber, watermelon, melon, bitter gourd</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/8.png" alt="Picture grid of five Zaid crops with labels: cucumber, long bean, watermelon, melon and bi" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Zaid is the gap season. Farmers use it for quick crops that need heat and little time.</div>
      <div class="cp-note trap">Do not mix Zaid with Rabi. Zaid comes after Rabi, in the hot weather.</div>
      <div class="cp-note exam">Watermelon, cucumber, melon and bitter gourd are asked as Zaid crops.</div>
    `
  },
  12: {
    questext: "Which of the following is a Zaid crop?",
    options: ["Wheat", "Rice", "Mustard", "Watermelon"],
    correct: "4",
    exptext: "✅ Watermelon grows in the hot dry months between Rabi and Kharif. 📌 Hot and quick, Zaid. ❌ Wheat is wrong because it is a winter crop."
  },
  13: {
    questext: "Zaid crops are grown in the period between",
    options: ["Kharif and Rabi seasons", "Rabi and Kharif seasons", "two Kharif crops", "two monsoons"],
    correct: "2",
    exptext: "✅ Zaid crops fill the gap after Rabi harvest and before Kharif sowing. 📌 Rabi, Zaid, Kharif is the order. ❌ Kharif and Rabi is wrong because that gap is autumn."
  },
  14: {
    type: "concept", icon: "🌱", accent: "#14b8a6", pauseTimer: true,
    title: "Subsistence Farming and Shifting Cultivation",
    html: `
      <p class="cp-lead"><b>Subsistence farming</b> is also called intensive farming. The farmer grows crops mostly for the family's own food on a small plot. Almost half of the world's people depend on this farming.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/9.png" alt="Subsistence farming paddy planting small farm photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>shifting cultivation</b>, the trees and plants of a place are cut or burned and crops are grown on the cleared land. After a few years the farmer moves to a new place.</p>
      <table><thead><tr><th>Region</th><th>Local name of shifting cultivation</th></tr></thead><tbody><tr><td>North-eastern states</td><td>Jhum or Jhumming</td></tr><tr><td>Madhya Pradesh and Chhattisgarh</td><td>Deppa, Dahiya or Bewar</td></tr><tr><td>Rajasthan</td><td>Valre or Valtare</td></tr><tr><td>Western Ghats</td><td>Kumari</td></tr><tr><td>Odisha</td><td>Podu, Pamadabi, Koman or Bringa</td></tr><tr><td>Jharkhand</td><td>Kuruwa</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/10.png" alt="Jhum shifting cultivation burning forest hill Nagaland photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not think subsistence farming makes goods for sale. It mainly feeds the farmer's own family.</div>
      <div class="cp-note exam">Jhum is the famous name from the north-east, and Kumari is the name from the Western Ghats.</div>
      <div class="cp-mnemonic">Jhum for North-east, Kumari for Western Ghats, Podu for Odisha.</div>
    `
  },
  15: {
    questext: "Shifting cultivation is called Jhum in",
    options: ["Rajasthan", "Western Ghats", "north-eastern states", "Jharkhand"],
    correct: "3",
    exptext: "✅ Jhum is the name used in the north-eastern states. 📌 J for Jhum, J for the north-east hills. ❌ Rajasthan is wrong because it uses Valre."
  },
  16: {
    questext: "Shifting cultivation is known as Kumari in",
    options: ["the Western Ghats", "Odisha", "Rajasthan", "Jharkhand"],
    correct: "1",
    exptext: "✅ Kumari is the local name in the Western Ghats. 📌 Kumari goes with the Ghats. ❌ Odisha is wrong because it uses Podu."
  },
  17: {
    type: "concept", icon: "🚜", accent: "#ec4899", pauseTimer: true,
    title: "Extensive, Commercial and Plantation Farming",
    html: `
      <p class="cp-lead"><b>Extensive cultivation</b> is farming on very large farms with machines. It is common in developed countries such as the United States. After the Green Revolution, India has also stressed it in Punjab and Haryana.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/11.png" alt="Combine harvester large wheat farm Punjab Haryana photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Commercial farming</b> grows crops to sell in the market, so it depends on market demand.</p>
      <p class="cp-lead"><b>Plantation or horticulture farming</b> grows a single crop on a big estate, such as rubber, coconut, cashew, tea, coffee and banana. It is also a type of commercial farming.</p>
      <table><thead><tr><th>Type</th><th>Main idea</th><th>Examples</th></tr></thead><tbody><tr><td>Extensive</td><td>Big farms, machines</td><td>Wheat in Punjab and Haryana</td></tr><tr><td>Commercial</td><td>Crops for sale</td><td>Cotton, sugarcane</td></tr><tr><td>Plantation</td><td>One crop on a big estate</td><td>Tea, rubber, coffee, coconut</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/12.png" alt="Three-column comparison picture: Extensive with a tractor on a large field, Commercial wit" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Plantation farming is a type of commercial farming, not a separate one.</div>
      <div class="cp-note exam">Tea, coffee, rubber, coconut and banana are the standard plantation crops.</div>
    `
  },
  18: {
    questext: "Which of the following is a plantation crop?",
    options: ["Wheat", "Barley", "Gram", "Rubber"],
    correct: "4",
    exptext: "✅ Rubber is grown in big estates as a single crop. 📌 Plantation means rubber, tea and coffee. ❌ Wheat is wrong because it is a field crop of the Rabi season."
  },
  19: {
    questext: "After the Green Revolution, extensive farming was stressed in",
    options: ["Kerala", "Punjab and Haryana", "Assam", "Goa"],
    correct: "2",
    exptext: "✅ Punjab and Haryana have large flat farms suited to machines. 📌 Green Revolution happened here. ❌ Kerala is wrong because its farms are small and used for plantations."
  },
  20: {
    type: "concept", icon: "🍃", accent: "#3b82f6", pauseTimer: true,
    title: "Organic Farming",
    html: `
      <p class="cp-lead"><b>Organic farming</b> avoids chemical pesticides and weedkillers. Instead it uses natural methods, such as the bio-pesticide <b>Chrysopa</b>, which is an insect that eats pests.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/13.png" alt="Organic farm vermicompost vegetable field India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Cow dung compost, vermicompost, green manure, mixed crops and farm waste are used to feed the soil.</p>
      <p class="cp-lead">Albert Howard is considered the father of modern organic farming, and Cuba is considered the first country to adopt it on a large scale.</p>
      <p class="cp-lead"><b>Sikkim</b> became the first fully organic state in India in 2016, with about 75,000 hectares of organic farmland.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Bio-pesticide</td><td>Chrysopa</td></tr><tr><td>Inputs</td><td>Cow dung compost, vermicompost, green manure</td></tr><tr><td>Father of organic farming</td><td>Albert Howard</td></tr><tr><td>First organic state</td><td>Sikkim, 2016</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/14.png" alt="Simple loop diagram: farm waste to compost, compost to soil, soil to crops, crops to farm " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not say Kerala or Himachal Pradesh is the first fully organic state. It is Sikkim.</div>
      <div class="cp-note exam">Sikkim, Albert Howard and Chrysopa are the three facts asked most.</div>
    `
  },
  21: {
    questext: "Which state became the first fully organic farming state of India?",
    options: ["Kerala", "Himachal Pradesh", "Sikkim", "Mizoram"],
    correct: "3",
    exptext: "✅ Sikkim became fully organic in 2016. 📌 Sikkim is the organic state. ❌ Kerala is wrong because it grows plantation crops with chemicals too."
  },
  22: {
    questext: "Which of the following is a bio-pesticide used in organic farming?",
    options: ["Chrysopa", "Urea", "Potash", "Phosphate"],
    correct: "1",
    exptext: "✅ Chrysopa is a helpful insect that eats crop pests. 📌 Chrysopa is nature's pest guard. ❌ Urea is wrong because it is a chemical fertiliser."
  },
  23: {
    type: "concept", icon: "🐟", accent: "#06b6d4", pauseTimer: true,
    title: "Aquaculture and Aquaponic Farming",
    html: `
      <p class="cp-lead"><b>Aquaculture</b> means rearing and growing water animals and plants. It is different from fishing because the organisms are raised under controlled conditions.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/15.png" alt="Fish farming pond aquaculture India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It can be done in the sea, rivers, ponds and tanks. Its forms include algae farming, shrimp farming, pearl farming and shellfish farming.</p>
      <p class="cp-lead">In <b>aquaponic farming</b>, fish and plants grow together in the same system. The fish waste feeds the plants, and the plants clean the water for the fish.</p>
      <table><thead><tr><th>Type</th><th>Main idea</th></tr></thead><tbody><tr><td>Aquaculture</td><td>Rearing water organisms under control</td></tr><tr><td>Aquaponic farming</td><td>Fish and plants grown together in one tank</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/16.png" alt="Loop diagram of an aquaponic tank: fish give waste to water, water feeds plants, plants cl" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Fishing takes wild fish from water, but aquaculture raises fish in a controlled place.</div>
      <div class="cp-note exam">Aquaponic means fish plus plants in the same tank.</div>
    `
  },
  24: {
    questext: "In which type of farming do fish and plants grow together in the same tank?",
    options: ["Contract farming", "Truck farming", "Mixed farming", "Aquaponic farming"],
    correct: "4",
    exptext: "✅ In aquaponic farming, fish waste feeds the plants and the plants clean the water. 📌 Aqua means water, ponic means growing. ❌ Mixed farming is wrong because it combines crops with animals on land."
  },
  25: {
    questext: "Aquaculture is different from fishing because in aquaculture",
    options: ["fish are caught from the wild", "water organisms are raised under controlled conditions", "only the sea is used", "no water is needed"],
    correct: "2",
    exptext: "✅ Aquaculture is the rearing and growing of water organisms under control. 📌 Culture means to grow. ❌ Fish caught from the wild is wrong because that is fishing."
  },
  26: {
    type: "concept", icon: "🤝", accent: "#a855f7", pauseTimer: true,
    title: "Contract, Cooperative, Truck and Mixed Farming",
    html: `
      <p class="cp-lead">In <b>contract farming</b>, a farmer grows crops for a company under an agreement. The farmer delivers a set quality of produce in a fixed time.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/17.png" alt="Farmer and company agent handshake contract farming field photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>cooperative farming</b>, farmers join together, form an organisation and farm their land together. The produce can be for the market or for their own use.</p>
      <p class="cp-lead"><b>Truck farming</b> means growing vegetables, fruits and flowers and sending them by trucks to far markets. The term is mostly used in the United States.</p>
      <p class="cp-lead"><b>Mixed farming</b> means keeping animals along with growing crops at the same place.</p>
      <table><thead><tr><th>Type</th><th>Main idea</th></tr></thead><tbody><tr><td>Contract</td><td>Farmer grows for a company as per agreement</td></tr><tr><td>Cooperative</td><td>Farmers farm together through an organisation</td></tr><tr><td>Truck</td><td>Vegetables and fruits sent by truck to markets</td></tr><tr><td>Mixed</td><td>Crops plus animal husbandry</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/18.png" alt="Four small pictures: a handshake labelled Contract, a group of farmers labelled Cooperativ" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Mixed farming is crops plus animals. It is not mixing two crops in one field.</div>
      <div class="cp-note exam">Contract means a company agreement, and cooperative means farmers working as a group.</div>
    `
  },
  27: {
    questext: "In which type of farming does a farmer grow produce for a company under an agreement?",
    options: ["Cooperative farming", "Truck farming", "Contract farming", "Mixed farming"],
    correct: "3",
    exptext: "✅ Under contract farming, the farmer supplies produce of an agreed quality to a company. 📌 Contract means a signed agreement. ❌ Cooperative farming is wrong because farmers there work together, not for a company."
  },
  28: {
    questext: "Mixed farming means",
    options: ["crop farming along with animal husbandry", "only fish farming", "only tree growing", "only flower farming"],
    correct: "1",
    exptext: "✅ Mixed farming joins crop growing and animal rearing on the same farm. 📌 Crops mix with cows. ❌ Only fish farming is wrong because that is aquaculture."
  },
  29: {
    type: "concept", icon: "🍚", accent: "#e11d48", pauseTimer: true,
    title: "Rice",
    html: `
      <p class="cp-lead"><b>Rice</b> is mainly a Kharif crop. In Tamil Nadu, Andhra Pradesh, Odisha and West Bengal it grows in all three seasons because the climate is friendly. In West Bengal the three rice crops are called Aus (autumn), Aman (winter) and Boro (summer).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/19.png" alt="Rice paddy harvest India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Rice needs fertile soil, an average temperature of about 25 degrees Celsius and yearly rain of 100 centimetres or more.</p>
      <p class="cp-lead"><b>Golden Rice</b> is a yellow rice made by gene science. It carries <b>beta carotene</b> to fight the lack of Vitamin A.</p>
      <p class="cp-lead">India is the second largest rice producer in the world after China. Khaira is a major disease of paddy.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Season</td><td>Kharif mainly</td></tr><tr><td>Rain needed</td><td>100 centimetres or more</td></tr><tr><td>Rank of India</td><td>Second, after China</td></tr><tr><td>Disease</td><td>Khaira</td></tr><tr><td>Disease from lack of Vitamin B</td><td>Beri-beri</td></tr></tbody></table>
      <p class="cp-lead">The upper layer of rice that is removed by polishing holds Vitamin B (thiamine). Too much washing and polishing destroys it, and lack of Vitamin B causes the disease <b>beri-beri</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/20.png" alt="Two-bowl picture: polished white rice with a label Vitamin B lost, and brown rice with a l" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Golden Rice fights Vitamin A deficiency, not Vitamin B deficiency.</div>
      <div class="cp-note exam">Golden Rice means beta carotene, and beri-beri means Vitamin B.</div>
    `
  },
  30: {
    questext: "Golden Rice has been made to overcome the deficiency of which vitamin?",
    options: ["Vitamin C", "Vitamin D", "Vitamin E", "Vitamin A"],
    correct: "4",
    exptext: "✅ Golden Rice contains beta carotene, which the body changes into Vitamin A. 📌 Golden is yellow, yellow is carotene. ❌ Vitamin C is wrong because it is found in citrus fruits."
  },
  31: {
    questext: "Beri-beri is caused by the lack of which vitamin?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correct: "2",
    exptext: "✅ Lack of Vitamin B (thiamine) causes beri-beri, and polished rice loses it. 📌 Beri-beri begins with B. ❌ Vitamin A is wrong because its lack causes night blindness."
  },
  32: {
    questext: "India ranks which in the world in rice production?",
    options: ["First", "Third", "Second", "Fourth"],
    correct: "3",
    exptext: "✅ India is the second largest producer of rice after China. 📌 China one, India two. ❌ First is wrong because China is first."
  },
  33: {
    type: "concept", icon: "🌾", accent: "#10b981", pauseTimer: true,
    title: "Wheat",
    html: `
      <p class="cp-lead"><b>Wheat</b> is a Rabi crop. It grows best in fertile loamy soil, a cool climate and yearly rain of about 50 to 75 centimetres.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/21.png" alt="Wheat crop ripening Punjab field photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It needs about 10 degrees Celsius at sowing, 15 degrees Celsius in growth, and 20 to 25 degrees Celsius at ripening.</p>
      <p class="cp-lead">It is the second main crop after rice in the cultivated land of India.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Season</td><td>Rabi</td></tr><tr><td>Rain needed</td><td>About 50 to 75 centimetres</td></tr><tr><td>Main states</td><td>Uttar Pradesh, Punjab, Haryana, Madhya Pradesh, Rajasthan, Bihar, Gujarat, Maharashtra</td></tr><tr><td>Diseases</td><td>Karnal bunt and rust</td></tr><tr><td>World rank</td><td>China first, India second, Russia third</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/22.png" alt="A bar chart with three bars: China tallest, India second and Russia third, with the title " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Wheat is a cool-weather crop, but it needs warmth at the time of ripening.</div>
      <div class="cp-note exam">Karnal bunt and rust are the wheat diseases, and Uttar Pradesh is a top wheat state.</div>
    `
  },
  34: {
    questext: "Karnal bunt is a disease of which crop?",
    options: ["Wheat", "Rice", "Cotton", "Sugarcane"],
    correct: "1",
    exptext: "✅ Karnal bunt and rust are the main diseases of wheat. 📌 Karnal, a wheat town. ❌ Rice is wrong because its disease is Khaira."
  },
  35: {
    questext: "Which country is the largest wheat producer in the world?",
    options: ["India", "Russia", "United States", "China"],
    correct: "4",
    exptext: "✅ China is first, India second and Russia third in wheat production. 📌 China tops wheat and rice. ❌ India is wrong because it is second."
  },
  36: {
    type: "concept", icon: "🌽", accent: "#eab308", pauseTimer: true,
    title: "Millets and Maize",
    html: `
      <p class="cp-lead">Jowar, bajra and ragi are the major <b>millets</b> grown in India. They are rich in nutrients. India celebrated 2018 as the National Year of Millets, and the United Nations declared 2023 the International Year of Millets.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/23.png" alt="Bajra jowar ragi millet grains photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Maize</b> is mainly a Kharif crop, and it is grown in all three seasons. It is a C4 plant, which means it uses sunlight very well.</p>
      <p class="cp-lead">Maize needs a temperature of 21 to 27 degrees Celsius and 50 to 70 centimetres of yearly rain.</p>
      <p class="cp-lead">Maize came from America. The Portuguese brought it to India.</p>
      <table><thead><tr><th>Crop</th><th>Fact</th></tr></thead><tbody><tr><td>Millets</td><td>Jowar, bajra, ragi, rich in nutrients</td></tr><tr><td>Maize</td><td>Kharif, C4 plant, American origin</td></tr><tr><td>Maize states</td><td>Karnataka, Madhya Pradesh, Maharashtra, Bihar</td></tr><tr><td>International Year of Millets</td><td>2023</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/24.png" alt="Timeline with two dots: 2018 National Year of Millets in India and 2023 International Year" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Maize is a cereal, not a millet.</div>
      <div class="cp-note exam">The International Year of Millets was 2023, and maize was brought by the Portuguese.</div>
    `
  },
  37: {
    questext: "The International Year of Millets was celebrated in",
    options: ["2018", "2023", "2020", "2025"],
    correct: "2",
    exptext: "✅ The United Nations declared 2023 as the International Year of Millets. 📌 India started with 2018, the world followed in 2023. ❌ 2018 is wrong because that was the National Year of Millets in India."
  },
  38: {
    questext: "Maize was brought to India by the",
    options: ["British", "Dutch", "Portuguese", "French"],
    correct: "3",
    exptext: "✅ Maize is of American origin, and the Portuguese brought it to India. 📌 Portuguese carried maize. ❌ British is wrong because they started tea planting."
  },
  39: {
    type: "concept", icon: "🥜", accent: "#0ea5e9", pauseTimer: true,
    title: "Pulses and Oilseeds",
    html: `
      <p class="cp-lead"><b>Pulses</b> are grown in both Rabi and Kharif seasons. They include arhar or pigeon pea, gram, moong, lentil and urad. India is the largest producer, consumer and importer of pulses in the world.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/25.png" alt="Mixed pulses dal lentils moong gram photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Oilseeds</b> are grown in both Kharif and Rabi seasons. Main crops are mustard, soybean, sunflower, groundnut, cottonseed, linseed and sesame.</p>
      <p class="cp-lead">The Malwa Plateau, Madhya Pradesh, Marathwada, Gujarat, dry parts of Rajasthan, Telangana and Andhra Pradesh are the major oilseed regions. <b>Groundnut</b> is the most important oilseed crop of India.</p>
      <table><thead><tr><th>Crop group</th><th>Examples</th></tr></thead><tbody><tr><td>Pulses</td><td>Pigeon pea, gram, moong, lentil, urad</td></tr><tr><td>Oilseeds</td><td>Mustard, soybean, sunflower, groundnut, sesame, linseed</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/26.png" alt="Groundnut mustard oilseed crop field India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Pulses and oilseeds grow in both main seasons. They are not Rabi only or Kharif only.</div>
      <div class="cp-note exam">Groundnut is the most important oilseed, and India is the largest producer of pulses.</div>
    `
  },
  40: {
    questext: "Which is the most prominent oilseed crop of India?",
    options: ["Groundnut", "Mustard", "Soybean", "Sesame"],
    correct: "1",
    exptext: "✅ Groundnut is the most important oilseed crop of India. 📌 Groundnut leads the oilseeds. ❌ Mustard is wrong because it is a Rabi oilseed grown less widely."
  },
  41: {
    questext: "India is the largest producer, consumer and importer of which of the following?",
    options: ["Wheat", "Rice", "Cotton", "Pulses"],
    correct: "4",
    exptext: "✅ India produces, eats and imports more pulses than any other country. 📌 Pulses make dal. ❌ Rice is wrong because China produces more."
  },
  42: {
    type: "concept", icon: "🍵", accent: "#d946ef", pauseTimer: true,
    title: "Tea",
    html: `
      <p class="cp-lead"><b>Tea</b> is a plant of Chinese origin. The British started tea planting in India. It is a plantation crop.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/27.png" alt="Tea garden plantation workers picking leaves Assam photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It grows in tropical and subtropical climates, on sloping land with good drainage and laterite soil rich in humus. It needs a temperature of about 24 to 30 degrees Celsius and 150 to 250 centimetres of yearly rain.</p>
      <p class="cp-lead">Two varieties are grown in India: <b>Bohiya</b> or Chinese, and <b>Assamika</b> or Assam.</p>
      <p class="cp-lead">The main tea areas are Assam, West Bengal, Tamil Nadu, the Nilgiri Hills and Kerala. Tea needs a lot of cheap and skilled labour.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Origin</td><td>China</td></tr><tr><td>Soil</td><td>Laterite, rich in humus</td></tr><tr><td>Main areas</td><td>Assam, West Bengal, Tamil Nadu, Nilgiri Hills, Kerala</td></tr><tr><td>Tea Board</td><td>Kolkata</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/28.png" alt="Map of India with four tea regions shaded: Assam, West Bengal (Darjeeling), Nilgiri Hills " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Tea grows on slopes because standing water kills its roots.</div>
      <div class="cp-note exam">The Tea Board is in Kolkata, and tea suits laterite soil.</div>
    `
  },
  43: {
    questext: "The head office of the Tea Board of India is in",
    options: ["Mumbai", "Kolkata", "Chennai", "Delhi"],
    correct: "2",
    exptext: "✅ The Tea Board is based in Kolkata. 📌 Tea and Kolkata, both with a famous cup. ❌ Chennai is wrong because the Tea Board is not based there."
  },
  44: {
    questext: "Tea grows best in which type of soil and land?",
    options: ["Black soil on flat land", "Desert soil on dunes", "Laterite soil on slopes", "Saline soil on marsh"],
    correct: "3",
    exptext: "✅ Tea needs laterite soil with good drainage, so slopes suit it. 📌 Tea likes slopes. ❌ Black soil is wrong because it holds too much water and suits cotton."
  },
  45: {
    type: "concept", icon: "☕", accent: "#f97316", pauseTimer: true,
    title: "Coffee",
    html: `
      <p class="cp-lead"><b>Coffee</b>, called Kahwa in Hindi, needs a warm and humid climate, a temperature of 16 to 28 degrees Celsius and 150 to 250 centimetres of yearly rain. It grows on sloping land with deep, loose loamy or lava-formed soil.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/29.png" alt="Coffee plantation red berries Karnataka Coorg photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Coffee growing in India began in the <b>Baba Budan Hills</b>. Today it is grown mainly in Karnataka, Kerala and Tamil Nadu, near the Nilgiri Hills.</p>
      <p class="cp-lead">Two varieties are grown: <b>Arabica</b> and <b>Robusta</b>. Robusta is grown in large quantities in India.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Cradle of coffee in India</td><td>Baba Budan Hills</td></tr><tr><td>Main states</td><td>Karnataka, Kerala, Tamil Nadu</td></tr><tr><td>Varieties</td><td>Arabica and Robusta</td></tr><tr><td>Coffee Board</td><td>Bengaluru</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/30.png" alt="Map of south India with coffee regions shaded: Karnataka (Coorg and Chikmagalur), Kerala (" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Coffee and tea are both plantation crops on hill slopes, but coffee prefers a little less rain.</div>
      <div class="cp-note exam">Coffee started at Baba Budan Hills, and its Board is in Bengaluru.</div>
    `
  },
  46: {
    questext: "Coffee growing in India started from which hills?",
    options: ["Baba Budan Hills", "Nilgiri Hills", "Cardamom Hills", "Garo Hills"],
    correct: "1",
    exptext: "✅ Coffee farming began in the Baba Budan Hills of Karnataka. 📌 Baba Budan means the first coffee. ❌ Nilgiri Hills is wrong because they are known for tea."
  },
  47: {
    questext: "The Coffee Board of India is located in",
    options: ["Chennai", "Kochi", "Mysuru", "Bengaluru"],
    correct: "4",
    exptext: "✅ The Coffee Board is based in Bengaluru, Karnataka. 📌 Karnataka makes the most coffee, so its capital hosts the Board. ❌ Kochi is wrong because the Spices Board is there."
  },
  48: {
    type: "concept", icon: "🧵", accent: "#84cc16", pauseTimer: true,
    title: "Cotton",
    html: `
      <p class="cp-lead"><b>Cotton</b> is mainly grown in the north-western and western parts of India: Gujarat, Maharashtra, Telangana, Andhra Pradesh, Haryana, Karnataka and Madhya Pradesh.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/31.png" alt="Cotton field ripe white bolls India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Cotton is a native plant of India, and it is mentioned in the Rigveda. India was the first country in the world to develop a hybrid variety of cotton.</p>
      <p class="cp-lead">Black soil suits cotton best. The cotton fibre grows on the seed. Cotton is called <b>white gold</b>. India is the largest producer of cotton in the world.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Soil</td><td>Black soil</td></tr><tr><td>Main states</td><td>Gujarat, Maharashtra, Telangana, Andhra Pradesh</td></tr><tr><td>Nickname</td><td>White gold</td></tr><tr><td>Special</td><td>First hybrid cotton in India</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/32.png" alt="Map of India with Gujarat, Maharashtra, Telangana and Andhra Pradesh shaded as cotton area" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Cotton is not a jute-like stem fibre. Its fibre grows on the seed.</div>
      <div class="cp-note exam">Cotton means black soil and white gold.</div>
    `
  },
  49: {
    questext: "Cotton is also known as",
    options: ["black gold", "white gold", "green gold", "golden fibre"],
    correct: "2",
    exptext: "✅ Cotton is called white gold. 📌 White fibre, white gold. ❌ Golden fibre is wrong because that name belongs to jute."
  },
  50: {
    questext: "Cotton grows best in which soil?",
    options: ["Laterite soil", "Alluvial soil", "Black soil", "Desert soil"],
    correct: "3",
    exptext: "✅ Black soil holds water well and suits cotton. 📌 Black cotton soil. ❌ Laterite soil is wrong because it suits tea and coffee."
  },
  51: {
    type: "concept", icon: "🍬", accent: "#64748b", pauseTimer: true,
    title: "Sugarcane",
    html: `
      <p class="cp-lead"><b>Sugarcane</b> is a tropical and subtropical crop. It needs a temperature of 21 to 27 degrees Celsius and 75 to 150 centimetres of yearly rain.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/33.png" alt="Sugarcane field tall green stalks India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It is a <b>cash crop</b>, which means it is grown mainly to be sold. It stays in the field for most of the year, and frost harms it badly.</p>
      <p class="cp-lead">The major sugarcane producing states are Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu, Andhra Pradesh, Bihar, Gujarat, Punjab and Haryana.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Crop type</td><td>Cash crop</td></tr><tr><td>Temperature</td><td>21 to 27 degrees Celsius</td></tr><tr><td>Rain needed</td><td>75 to 150 centimetres</td></tr><tr><td>Top states</td><td>Uttar Pradesh, Maharashtra, Karnataka</td></tr><tr><td>Harmful</td><td>Frost</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/34.png" alt="Bar chart of three states Uttar Pradesh, Maharashtra and Karnataka as the top sugarcane pr" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Sugarcane is not a Rabi or Kharif crop only. It stands in the field for most of the year.</div>
      <div class="cp-note exam">Sugarcane is a cash crop, and frost is harmful to it.</div>
    `
  },
  52: {
    questext: "Sugarcane is a",
    options: ["cash crop", "pulse", "oilseed", "fodder crop"],
    correct: "1",
    exptext: "✅ Sugarcane is grown mainly to sell to sugar mills, so it is a cash crop. 📌 Cane means cash. ❌ Pulse is wrong because pulses are grown for their seeds."
  },
  53: {
    questext: "Which of the following is harmful to sugarcane?",
    options: ["Rain", "Heat", "Humidity", "Frost"],
    correct: "4",
    exptext: "✅ Frost damages sugarcane stalks. 📌 Cane hates cold. ❌ Heat is wrong because sugarcane likes warm weather."
  },
  54: {
    type: "concept", icon: "🧶", accent: "#fb7185", pauseTimer: true,
    title: "Jute",
    html: `
      <p class="cp-lead"><b>Jute</b> is a non-edible Kharif crop. It is called the <b>Golden Fibre of India</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/35.png" alt="Jute plants field West Bengal photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It needs a hot and very humid climate, new loamy soil, a temperature of 25 to 30 degrees Celsius, 160 to 200 centimetres of yearly rain and cheap labour.</p>
      <p class="cp-lead">It is a commercial crop of West Bengal, Bihar, Assam and the nearby eastern parts of India.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Season</td><td>Kharif</td></tr><tr><td>Nickname</td><td>Golden Fibre</td></tr><tr><td>Soil</td><td>New loamy soil</td></tr><tr><td>Main states</td><td>West Bengal, Bihar, Assam</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/36.png" alt="Picture sequence: jute plant, soaked stems, fibre strips and jute bags, with labels for ea" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Jute is a fibre crop, not a food crop, so it is non-edible.</div>
      <div class="cp-note exam">Jute means golden fibre and West Bengal.</div>
    `
  },
  55: {
    questext: "Jute is called the",
    options: ["White gold", "Golden Fibre of India", "Green gold", "Black gold"],
    correct: "2",
    exptext: "✅ Jute is known as the Golden Fibre of India. 📌 Golden colour, golden name. ❌ White gold is wrong because that is cotton."
  },
  56: {
    questext: "Jute is mainly grown in which state?",
    options: ["Punjab", "Rajasthan", "West Bengal", "Kerala"],
    correct: "3",
    exptext: "✅ West Bengal is the main jute state, along with Bihar and Assam. 📌 Jute follows the Ganga delta. ❌ Punjab is wrong because it grows wheat and rice."
  },
  57: {
    type: "concept", icon: "🔁", accent: "#2dd4bf", pauseTimer: true,
    title: "Cropping Intensity",
    html: `
      <p class="cp-lead"><b>Cropping intensity</b> means the number of crops grown on the same land in one year.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/37.png" alt="Farmer sowing second crop after harvest India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">If a farmer grows two crops on the same field in a year, the intensity is high. If only one, it is low.</p>
      <p class="cp-lead">Among the Indian states, Punjab has the highest cropping intensity, followed by Haryana and West Bengal.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Cropping intensity</td><td>Number of crops on a field in a year</td></tr><tr><td>Highest state</td><td>Punjab</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/38.png" alt="Two fields side by side: one with a single crop labelled Low intensity, another with two c" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">High cropping intensity does not mean a big field. It means many crops in a year.</div>
      <div class="cp-note exam">Punjab is the state with the highest cropping intensity.</div>
    `
  },
  58: {
    questext: "The number of crops grown on a piece of land in a year is called",
    options: ["cropping intensity", "crop rotation", "land holding", "crop yield"],
    correct: "1",
    exptext: "✅ This number is called cropping intensity. 📌 Intensity means how heavily land is used. ❌ Crop rotation is wrong because it means changing crops each year."
  },
  59: {
    questext: "Which state has the highest cropping intensity in India?",
    options: ["Haryana", "West Bengal", "Uttar Pradesh", "Punjab"],
    correct: "4",
    exptext: "✅ Punjab has the highest cropping intensity because of irrigation and wheat and rice together. 📌 Punjab grows the most per field. ❌ Haryana is wrong because it comes second."
  },
  60: {
    type: "concept", icon: "🔄", accent: "#c026d3", pauseTimer: true,
    title: "Nicknames of Agricultural Revolutions",
    html: `
      <p class="cp-lead">In India, the names of colours are used for the revolutions in different farm products.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/39.png" alt="Colour wheel of revolutions: green, white, blue, yellow, red, round, silver fibre, grey an" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Revolution</th><th>Product</th></tr></thead><tbody><tr><td>Green</td><td>Food grain production</td></tr><tr><td>White</td><td>Milk production</td></tr><tr><td>Blue</td><td>Fish production</td></tr><tr><td>Silver</td><td>Egg and poultry production</td></tr><tr><td>Yellow</td><td>Oilseed production</td></tr><tr><td>Red</td><td>Tomato and meat production</td></tr><tr><td>Pink</td><td>Onion and prawn production</td></tr><tr><td>Round</td><td>Potato production</td></tr><tr><td>Silver Fibre</td><td>Cotton production</td></tr><tr><td>Grey</td><td>Fertiliser production</td></tr><tr><td>Green Gold</td><td>Bamboo production</td></tr><tr><td>Evergreen</td><td>Lasting growth with fair prices to farmers</td></tr></tbody></table>
      <p class="cp-lead">The White Revolution is also called Operation Flood. The Green Revolution brought high-yielding seeds, mainly for wheat and rice.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/40.png" alt="Milk dairy cooperative collection India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix the Yellow and Blue revolutions. Yellow is oilseeds and Blue is fish.</div>
      <div class="cp-note exam">Questions give a colour and ask for the product. Learn the pairs.</div>
      <div class="cp-mnemonic">Green grains, White milk, Blue fish, Yellow oil, Red tomato.</div>
    `
  },
  61: {
    questext: "The White Revolution is related to the production of",
    options: ["milk", "fish", "oilseeds", "wheat"],
    correct: "1",
    exptext: "✅ The White Revolution means more milk production. 📌 White is milk. ❌ Fish is wrong because that is the Blue Revolution."
  },
  62: {
    questext: "The Blue Revolution is related to the production of",
    options: ["milk", "oilseeds", "fish", "potatoes"],
    correct: "3",
    exptext: "✅ The Blue Revolution means more fish production. 📌 Blue is water. ❌ Oilseeds is wrong because that is the Yellow Revolution."
  },
  63: {
    questext: "The Yellow Revolution is related to the production of",
    options: ["tomatoes", "potatoes", "cotton", "oilseeds"],
    correct: "4",
    exptext: "✅ The Yellow Revolution means more oilseed production, such as mustard. 📌 Yellow mustard flowers. ❌ Cotton is wrong because it is the Silver Fibre Revolution."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "golden wheat ears, a cotton boll, a tea leaf and a small tractor on a green field" },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian farmers working in a green paddy field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/1.png. farmers at work in a green field",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/2.png": { t: "fig", about: "Calendar wheel of the year with three coloured arcs labelled Kharif (June to October), Rabi (October to May) and Zaid (March to June)." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Paddy rice field monsoon rain India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/3.png. green paddy plants growing in rain",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/4.png": { t: "fig", about: "A picture grid of nine Kharif crops with labels: paddy, soybean, pigeon pea, sesame, moong, urad, ragi, groundnut and cotton." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Wheat field green winter India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/5.png. a green wheat field in winter",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/6.png": { t: "fig", about: "A picture grid of nine Rabi crops with labels: wheat, barley, peas, gram, mustard, potato, lentil, linseed and rye." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Watermelon cucumber summer crop field India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/7.png. watermelons growing in a summer field",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/8.png": { t: "fig", about: "Picture grid of five Zaid crops with labels: cucumber, long bean, watermelon, melon and bitter gourd." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Subsistence farming paddy planting small farm photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/9.png. farmers planting rice by hand",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jhum shifting cultivation burning forest hill Nagaland photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/10.png. smoke over a hillside cleared for jhum farming",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Combine harvester large wheat farm Punjab Haryana photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/11.png. a combine harvester in a large field",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/12.png": { t: "fig", about: "Three-column comparison picture: Extensive with a tractor on a large field, Commercial with bags going to a market, Plantation with rows of tea bushes." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Organic farm vermicompost vegetable field India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/13.png. a farmer with vermicompost in an organic field",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/14.png": { t: "fig", about: "Simple loop diagram: farm waste to compost, compost to soil, soil to crops, crops to farm waste, with a crossed-out chemical bottle on the side." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fish farming pond aquaculture India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/15.png. a fish farm pond with workers",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/16.png": { t: "fig", about: "Loop diagram of an aquaponic tank: fish give waste to water, water feeds plants, plants clean water and return it to fish." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Farmer and company agent handshake contract farming field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/17.png. a farmer and a company agent agreeing a deal",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/18.png": { t: "fig", about: "Four small pictures: a handshake labelled Contract, a group of farmers labelled Cooperative, a truck of vegetables labelled Truck, and a field with a cow labelled Mixed." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rice paddy harvest India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/19.png. golden rice plants ready for harvest",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/20.png": { t: "fig", about: "Two-bowl picture: polished white rice with a label Vitamin B lost, and brown rice with a label Vitamin B kept, and an arrow to the word Beri-beri." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Wheat crop ripening Punjab field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/21.png. golden wheat ripening in a field",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/22.png": { t: "fig", about: "A bar chart with three bars: China tallest, India second and Russia third, with the title Wheat producers." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bajra jowar ragi millet grains photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/23.png. bowls of millet grains",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/24.png": { t: "fig", about: "Timeline with two dots: 2018 National Year of Millets in India and 2023 International Year of Millets by the United Nations." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mixed pulses dal lentils moong gram photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/25.png. a pile of different pulses",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Groundnut mustard oilseed crop field India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/26.png. a field of yellow mustard flowers",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tea garden plantation workers picking leaves Assam photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/27.png. workers picking tea leaves in a tea garden",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/28.png": { t: "fig", about: "Map of India with four tea regions shaded: Assam, West Bengal (Darjeeling), Nilgiri Hills of Tamil Nadu and Kerala." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Coffee plantation red berries Karnataka Coorg photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/29.png. red coffee berries on a branch",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/30.png": { t: "fig", about: "Map of south India with coffee regions shaded: Karnataka (Coorg and Chikmagalur), Kerala (Wayanad) and Tamil Nadu (Nilgiris), with Baba Budan Hills marked." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cotton field ripe white bolls India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/31.png. white cotton bolls on plants",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/32.png": { t: "fig", about: "Map of India with Gujarat, Maharashtra, Telangana and Andhra Pradesh shaded as cotton areas and a small black soil patch on the Deccan." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sugarcane field tall green stalks India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/33.png. tall green sugarcane stalks",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/34.png": { t: "fig", about: "Bar chart of three states Uttar Pradesh, Maharashtra and Karnataka as the top sugarcane producers, with a snowflake icon crossed out." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jute plants field West Bengal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/35.png. tall jute plants in a field",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/36.png": { t: "fig", about: "Picture sequence: jute plant, soaked stems, fibre strips and jute bags, with labels for each step." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Farmer sowing second crop after harvest India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/37.png. a farm with two crops growing in a year",
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/38.png": { t: "fig", about: "Two fields side by side: one with a single crop labelled Low intensity, another with two crops in a year labelled High intensity." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/39.png": { t: "fig", about: "Colour wheel of revolutions: green, white, blue, yellow, red, round, silver fibre, grey and green gold, each segment with its product word." },
  "images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Milk dairy cooperative collection India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Agriculture_and_Animal_Husbandry/40.png. milk cans at a dairy collection centre"
});

/* CHANGE LOG
   - Millets are limited to jowar, bajra and ragi; barley and maize are not called millets, because they are cereals.
   - Major maize states are given as Karnataka, Madhya Pradesh, Maharashtra and Bihar.
   - The claim that Africa is the birthplace of pigeon pea was left out because its origin is disputed.
   - India is described as the largest producer of pulses, and groundnut as the most important oilseed; the claim that India is the largest oilseed producer was left out.
   - Rice crops of West Bengal are written Aus, Aman and Boro.
   - The rain, temperature and height figures for sugarcane are corrected to 21 to 27 degrees Celsius and 75 to 150 centimetres of rain.
   - Pink Revolution is given as onion and prawn production, and Round Revolution as potato production.
   - Silent Revolution and the drug meaning of Pink Revolution are left out because they are not standard.
   - Shifting cultivation names are written Jhum, Deppa, Dahiya, Bewar, Valre, Kumari, Podu and Kuruwa.
   - Population share and gross value added figures are kept as given for the census of 2011 and the year 2017-18.
*/
