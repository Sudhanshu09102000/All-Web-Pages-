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

/* Field: General_Awareness · Subject: Geography · Chapter: Drainage_System · 19 concept pages (+ overview) · 42 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌊", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Drainage System of India",
    thumb: {
      image: "images/General_Awareness/Geography/Drainage_System/thumbnail.png",
      banner: "GEOGRAPHY FOR COMPETITIVE EXAMS 2026",
      line1: "DRAINAGE SYSTEM",
      line2: "RIVERS OF INDIA",
      line3: "LAKES AND WATERFALLS",
      badge: "FULL CLASS",
      ribbon: "SOURCES • TRIBUTARIES • MCQ PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Drainage System of India | Rivers, Lakes, Waterfalls | SSC CGL Geography",
      altTitles: ["Indian Rivers in One Class: Indus, Ganga, Brahmaputra and Peninsular", "Lakes and Waterfalls of India Trick for SSC CGL"],
      description: "Rivers are asked again and again in General Awareness. In this class we learn the drainage system of India step by step in simple words, from the Himalayan rivers to the Peninsular rivers, lakes and waterfalls.\n\n📌 IN THIS CLASS\n✅ Indus, Ganga and Brahmaputra systems\n✅ Narmada, Tapi, Godavari, Krishna, Mahanadi and Kaveri\n✅ Lakes and waterfalls of India\n✅ Practice questions with easy explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Himalayan rivers\n00:00 Peninsular rivers\n00:00 Lakes and waterfalls\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Geography #Rivers",
      tags: ["drainage system of india", "indian rivers", "rivers of india", "himalayan rivers", "peninsular rivers", "indus river system", "ganga river system", "brahmaputra river", "godavari river", "krishna river", "narmada and tapi", "lakes of india", "waterfalls of india", "ssc cgl geography", "general awareness", "static gk", "indian geography", "river tricks", "geography mcq", "geography for ssc", "competitive exams", "upsc geography", "banking exams", "railway exams", "defence exams", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "Drainage System tricks"],
      hashtags: ["SSCCGL", "Geography", "Rivers"],
      thumbText: "DRAINAGE SYSTEM OF INDIA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🌊 New class is live: Drainage System of India, rivers, lakes and waterfalls. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Himalayan rivers\n00:00 Peninsular rivers\n00:00 Lakes and waterfalls",
      playlist: "General Awareness — Geography Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the rivers and lakes of India</u>: the Himalayan rivers, the Peninsular rivers, the lakes and the waterfalls. Rivers are one of the most repeated topics in General Awareness, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>19</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>42</b><span>Questions</span></div>
        <div class="cp-stat"><b>~80 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Himalayan and Peninsular Rivers</b><br>How the two groups of rivers are different, and why one group flows all year and the other does not.</li>
        <li><b>The Indus System</b><br>The Indus and the five Punjab rivers: Jhelum, Chenab, Ravi, Beas and Sutlej, with their sources, projects and meeting places.</li>
        <li><b>The Ganga System</b><br>Headstreams, prayags, tributaries and the famous rivers called the sorrow of a state.</li>
        <li><b>The Brahmaputra System</b><br>Its different names, its tributaries and its waterway.</li>
        <li><b>Peninsular Rivers</b><br>Narmada, Tapi, Godavari, Krishna, Mahanadi and Kaveri, with their sources and dams.</li>
        <li><b>Lakes and Waterfalls</b><br>How lakes are formed, the famous lakes of India, and which waterfall belongs to which river and state.</li>
        <li><b>Practice</b><br>After each topic you will solve questions, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on river sources, tributaries, dams, lakes and waterfalls come in almost every General Awareness paper, so these facts give sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🌊", accent: "#22c55e", pauseTimer: true,
    title: "Drainage System of Indian Rivers",
    html: `
      <p class="cp-lead">The pattern of rivers and their streams in a region is called its <b>drainage system</b>. Indian rivers are divided into two groups: <b>Himalayan rivers</b> and <b>Peninsular rivers</b>.</p>
      <p class="cp-lead">The Himalayan rivers belong to three big systems: the <b>Indus</b>, the <b>Ganga</b> and the <b>Brahmaputra</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/1.png" alt="Ganga river Rishikesh Himalayan foothills photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Himalayan rivers</th><th>Peninsular rivers</th></tr></thead><tbody><tr><td>Long, with a large catchment area</td><td>Shorter, with a small catchment area</td></tr><tr><td>Fed by rain and snow, so they flow all year</td><td>Fed mostly by rain, so many dry up in summer</td></tr><tr><td>Cut deep valleys and gorges</td><td>Make shallow valleys</td></tr><tr><td>Form bends and often change their course</td><td>Follow a fairly straight path</td></tr><tr><td>Still young in their stage of development</td><td>Have reached maturity</td></tr><tr><td>Form large deltas, such as the Ganga-Brahmaputra delta</td><td>Form estuaries or small deltas</td></tr><tr><td>Good for navigation and irrigation</td><td>Less suitable for navigation</td></tr></tbody></table>
      <p class="cp-lead">A <b>catchment area</b> is the land from which a river collects its water. A river that flows all year is called <b>perennial</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/2.png" alt="Two-column comparison picture: left a long blue river from snow mountains to a big delta l" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not say that all Indian rivers are perennial. Only the Himalayan rivers get snow-melt water all year.</div>
      <div class="cp-note exam">Questions ask which feature belongs to Himalayan rivers. Remember snow, long, deep valleys and perennial.</div>
    `
  },
  3: {
    questext: "Which of the following is a feature of the Himalayan rivers?",
    options: ["They are seasonal", "They have shallow valleys", "They flow all year because of rain and snow", "They have small catchment areas"],
    correct: "3",
    exptext: "✅ Himalayan rivers get rain and snow-melt water, so they flow all year. 📌 Snow means perennial. ❌ Seasonal is wrong because that describes most peninsular rivers."
  },
  4: {
    questext: "Peninsular rivers such as the Narmada and the Tapi end in",
    options: ["estuaries", "large deltas", "lakes", "glaciers"],
    correct: "1",
    exptext: "✅ The Narmada and Tapi flow in rift valleys and open into the sea as estuaries. 📌 West-flowing rivers make estuaries. ❌ Large deltas is wrong because that describes the Ganga-Brahmaputra."
  },
  5: {
    type: "concept", icon: "🏔️", accent: "#f59e0b", pauseTimer: true,
    title: "Indus River",
    html: `
      <p class="cp-lead">The Indus starts from a glacier near <b>Bokhar Chu</b> in the Kailash range in Tibet, close to Lake Mansarovar. In Tibet it is called Singi Khamban, which means the Lion's Mouth.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/3.png" alt="Indus river Leh Ladakh valley photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It flows north-west between the Ladakh and Zaskar ranges and enters India near <b>Demchok</b>. It forms a gorge as it flows through Ladakh and Gilgit, and then enters Pakistan near Chillar.</p>
      <p class="cp-lead">Its total length is about 2,880 kilometres, of which about 1,114 kilometres lie in India.</p>
      <p class="cp-lead">The five rivers of Punjab, the Jhelum, Chenab, Ravi, Beas and Sutlej, together make the <b>Panchnad</b>. The Panchnad joins the Indus near <b>Mithankot</b> in Pakistan.</p>
      <table><thead><tr><th>Bank</th><th>Main tributaries</th></tr></thead><tbody><tr><td>Left bank</td><td>Shyok, Gilgit, Zaskar, Jhelum, Chenab, Ravi, Beas and Sutlej</td></tr><tr><td>Right bank</td><td>Kabul, Kurram, Tochi, Gomal, Viboa and Sangar</td></tr></tbody></table>
      <p class="cp-lead">The Indus finally falls into the Arabian Sea.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/4.png" alt="Simple map of the Indus system with the Indus as a thick line and five Punjab rivers Jhelu" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Panchnad is formed by the five Punjab rivers joining each other and then the Indus. It is not a sixth river.</div>
      <div class="cp-note exam">Indus enters India near Demchok, and the Panchnad meets it near Mithankot.</div>
    `
  },
  6: {
    questext: "The Indus river enters India near",
    options: ["Chillar", "Mithankot", "Shipki La", "Demchok"],
    correct: "4",
    exptext: "✅ The Indus enters Ladakh near Demchok. 📌 Demchok is the door of the Indus. ❌ Chillar is wrong because that is where it leaves India for Pakistan."
  },
  7: {
    questext: "The Panchnad rivers join the Indus near",
    options: ["Chillar", "Mithankot", "Demchok", "Akhnoor"],
    correct: "2",
    exptext: "✅ The Panchnad joins the Indus near Mithankot in Pakistan. 📌 Five rivers, one meeting, Mithankot. ❌ Akhnoor is wrong because the Chenab only enters the plain there."
  },
  8: {
    type: "concept", icon: "🌿", accent: "#ef4444", pauseTimer: true,
    title: "Jhelum River",
    html: `
      <p class="cp-lead">The Jhelum starts from a spring at <b>Verinag</b> in the Pir Panjal range in Jammu and Kashmir.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/5.png" alt="Verinag spring Kashmir Jhelum source photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It flows through the Kashmir valley and forms a bend, called a meander, near Srinagar. It then passes through <b>Wular Lake</b>.</p>
      <p class="cp-lead">Before it enters Pakistan it cuts a deep valley, and it flows along the India and Pakistan border from Muzaffarabad to Mirpur.</p>
      <p class="cp-lead">The Mangla Dam is built on the Jhelum in Pakistan. It joins the Chenab in Pakistan.</p>
      <p class="cp-lead">The Uri project is a power project on the Jhelum in Jammu and Kashmir.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Source</td><td>Verinag spring, Pir Panjal</td></tr><tr><td>Lake on the way</td><td>Wular Lake</td></tr><tr><td>Meets</td><td>Chenab, in Pakistan</td></tr><tr><td>Dam in Pakistan</td><td>Mangla Dam</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/6.png" alt="Simple sketch of the Jhelum flowing from Verinag through Srinagar and Wular Lake to the bo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not confuse the Jhelum with the Chenab. The Jhelum rises in the Kashmir valley, but the Chenab rises in Lahaul.</div>
      <div class="cp-note exam">Verinag is the source, and Wular Lake lies on its path.</div>
    `
  },
  9: {
    questext: "The Jhelum river originates at",
    options: ["Rakshas Tal", "Bokhar Chu", "Verinag", "Tandi"],
    correct: "3",
    exptext: "✅ The Jhelum rises from the Verinag spring in the Pir Panjal range. 📌 Verinag is the Jhelum's home. ❌ Tandi is wrong because the Chenab begins there."
  },
  10: {
    questext: "Through which lake does the Jhelum river pass?",
    options: ["Wular Lake", "Dal Lake", "Pangong Lake", "Loktak Lake"],
    correct: "1",
    exptext: "✅ The Jhelum flows through Wular Lake in the Kashmir valley. 📌 Jhelum and Wular both flow in Kashmir. ❌ Dal Lake is wrong because it does not lie on the river's path."
  },
  11: {
    type: "concept", icon: "🌀", accent: "#8b5cf6", pauseTimer: true,
    title: "Chenab River",
    html: `
      <p class="cp-lead">The Chenab is formed by the meeting of the <b>Chandra</b> and <b>Bhaga</b> rivers at <b>Tandi</b> near Keylong in Himachal Pradesh. The two rivers start on either side of the Baralacha La pass. In Himachal Pradesh it is called Chandrabhaga.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/7.png" alt="Chandra Bhaga river confluence Tandi Lahaul photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It is the largest tributary of the Indus in India.</p>
      <p class="cp-lead">It flows west for some distance parallel to the Pir Panjal range and forms a deep gorge near Kishtwar. It enters the plain near Akhnoor.</p>
      <table><thead><tr><th>Water project</th><th>River</th></tr></thead><tbody><tr><td>Baglihar Project</td><td>Chenab</td></tr><tr><td>Salal Project</td><td>Chenab</td></tr><tr><td>Dulhasti Project</td><td>Chenab</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/8.png" alt="Sketch of two small rivers Chandra and Bhaga meeting at Tandi to make the Chenab, then flo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Chenab is not formed in Kashmir. It is formed in Lahaul, Himachal Pradesh.</div>
      <div class="cp-note exam">Chandra plus Bhaga makes Chenab. Baglihar, Salal and Dulhasti are on the Chenab.</div>
      <div class="cp-mnemonic">Chandra and Bhaga marry at Tandi and give birth to the Chenab.</div>
    `
  },
  12: {
    questext: "The Chenab river is formed by the meeting of which two rivers?",
    options: ["Ravi and Beas", "Jhelum and Ravi", "Sutlej and Beas", "Chandra and Bhaga"],
    correct: "4",
    exptext: "✅ The Chandra and Bhaga meet at Tandi to form the Chenab. 📌 CB makes Chenab. ❌ Ravi and Beas is wrong because they are separate rivers of Punjab."
  },
  13: {
    questext: "The Baglihar Project is built on which river?",
    options: ["Jhelum", "Chenab", "Ravi", "Beas"],
    correct: "2",
    exptext: "✅ The Baglihar Project is on the Chenab in Jammu and Kashmir. 📌 Baglihar, Salal and Dulhasti all belong to the Chenab. ❌ Jhelum is wrong because the Uri project is there."
  },
  14: {
    type: "concept", icon: "🏞️", accent: "#14b8a6", pauseTimer: true,
    title: "Ravi and Beas Rivers",
    html: `
      <p class="cp-lead">The <b>Ravi</b> starts west of the Rohtang Pass in Himachal Pradesh and flows through the Chamba valley. It joins the Chenab in Pakistan.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/9.png" alt="Ranjit Sagar Dam Thein Ravi river photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Chamera and Thein (Ranjit Sagar) are the projects on the Ravi.</p>
      <p class="cp-lead">The <b>Beas</b> starts at Beas Kund near the Rohtang Pass and flows through the Kullu valley.</p>
      <p class="cp-lead">It forms gorges at Kati and Largi in the Dhauladhar range and enters the plain at Talwara in the Hoshiarpur district of Punjab.</p>
      <p class="cp-lead">It meets the Sutlej at Harike, where the Harike Barrage is built. The Indira Gandhi Canal, India's longest canal, starts from this barrage.</p>
      <table><thead><tr><th>River</th><th>Source</th><th>Special fact</th></tr></thead><tbody><tr><td>Ravi</td><td>West of Rohtang Pass</td><td>Flows in Chamba valley, projects Chamera and Thein</td></tr><tr><td>Beas</td><td>Beas Kund near Rohtang Pass</td><td>Only Panchnad river that flows only in India</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/10.png" alt="Sketch of Ravi and Beas starting near Rohtang Pass, with Beas flowing through Kullu and me" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Both the Ravi and the Beas start near Rohtang, but only the Beas flows fully inside India.</div>
      <div class="cp-note exam">Harike is where the Beas meets the Sutlej, and the Indira Gandhi Canal starts there.</div>
    `
  },
  15: {
    questext: "Which Panchnad river flows only in India?",
    options: ["Ravi", "Chenab", "Beas", "Jhelum"],
    correct: "3",
    exptext: "✅ The Beas starts and ends its journey in India before meeting the Sutlej. 📌 Beas stays in India. ❌ Ravi is wrong because it enters Pakistan."
  },
  16: {
    questext: "The Ranjit Sagar (Thein) Dam is built on the",
    options: ["Ravi", "Beas", "Sutlej", "Chenab"],
    correct: "1",
    exptext: "✅ Ranjit Sagar Dam, also called Thein, is on the Ravi. 📌 Ravi has Chamera and Thein. ❌ Beas is wrong because the Pong Dam is on it."
  },
  17: {
    type: "concept", icon: "💧", accent: "#ec4899", pauseTimer: true,
    title: "Sutlej River",
    html: `
      <p class="cp-lead">The Sutlej starts from <b>Rakshas Tal</b> on the Tibetan Plateau. In Tibet it is called Langchen Khambab.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/11.png" alt="Sutlej river Himachal Pradesh gorge photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It flows parallel to the Indus for about 400 kilometres in Tibet and then enters India through the <b>Shipki La</b> pass.</p>
      <p class="cp-lead">It flows west and cuts a deep valley in Himachal Pradesh. It also flows along the India and Pakistan border between Firozpur and Fazilka in Punjab.</p>
      <p class="cp-lead">The Sutlej is very important because the Bhakra-Nangal Project, the Harike Barrage and the Indira Gandhi Canal are linked with it.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Source</td><td>Rakshas Tal</td></tr><tr><td>Enters India</td><td>Shipki La</td></tr><tr><td>Important project</td><td>Bhakra-Nangal</td></tr><tr><td>Meets Beas</td><td>Harike</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/12.png" alt="Sketch of the Sutlej from Rakshas Tal through Shipki La, Bhakra-Nangal Dam and Harike Barr" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Rakshas Tal is the source of the Sutlej. Do not give Mansarovar as the source, even though both lakes are close.</div>
      <div class="cp-note exam">Sutlej enters through Shipki La and has the Bhakra-Nangal Project.</div>
    `
  },
  18: {
    questext: "The Sutlej river enters India through which pass?",
    options: ["Rohtang", "Banihal", "Nathu La", "Shipki La"],
    correct: "4",
    exptext: "✅ The Sutlej enters India through the Shipki La pass in Himachal Pradesh. 📌 Sutlej and Shipki both start with S. ❌ Rohtang is wrong because the Beas starts near it."
  },
  19: {
    questext: "The Bhakra-Nangal Project is on which river?",
    options: ["Beas", "Sutlej", "Ravi", "Jhelum"],
    correct: "2",
    exptext: "✅ The Bhakra-Nangal Project is built on the Sutlej. 📌 Bhakra belongs to Sutlej. ❌ Beas is wrong because the Pong Dam is built there."
  },
  20: {
    type: "concept", icon: "🛕", accent: "#3b82f6", pauseTimer: true,
    title: "Ganga River Drainage System",
    html: `
      <p class="cp-lead">The Ganga begins as the <b>Bhagirathi</b>, which comes out of the Gangotri glacier at Gaumukh in Uttarakhand. Another stream, the <b>Alaknanda</b>, starts near Badrinath.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/13.png" alt="Gaumukh Gangotri glacier source of Bhagirathi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Bhagirathi and the Alaknanda meet at <b>Devprayag</b>, and from there the river is called the <b>Ganga</b>. It enters the plain at Haridwar.</p>
      <p class="cp-lead">The Ganga flows towards the east up to <b>Farakka</b> in West Bengal, which is the northernmost point of the Ganga delta.</p>
      <p class="cp-lead">At Farakka it divides into two streams. One stream, the Bhagirathi-Hooghly, flows south through West Bengal. The main stream, the Padma, enters Bangladesh.</p>
      <p class="cp-lead">In Bangladesh the Padma meets the Brahmaputra, which is called the Jamuna there. The joined river is called the Meghna, and it falls into the Bay of Bengal.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Headstreams</td><td>Bhagirathi and Alaknanda</td></tr><tr><td>Meeting place</td><td>Devprayag</td></tr><tr><td>Enters the plain</td><td>Haridwar</td></tr><tr><td>Divides into two streams</td><td>Farakka, West Bengal</td></tr><tr><td>Waterway</td><td>National Waterway 1, from Prayagraj to Haldia</td></tr></tbody></table>
      <p class="cp-lead">The Ganga and the Brahmaputra together form the largest delta in the world, which has the Sundarbans mangrove forest.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/14.png" alt="Sketch of the Ganga from Gaumukh through Devprayag and Haridwar to Farakka, where it split" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Bhagirathi-Hooghly stream stays in India, but the Padma goes to Bangladesh.</div>
      <div class="cp-note exam">Devprayag is where the Ganga gets its name, and Farakka is where it splits.</div>
    `
  },
  21: {
    questext: "Farakka is the place where the Ganga divides into the Hooghly and the",
    options: ["Yamuna", "Kosi", "Padma", "Gandak"],
    correct: "3",
    exptext: "✅ At Farakka the main stream becomes the Padma and goes to Bangladesh. 📌 Hooghly stays in India, Padma leaves. ❌ Kosi is wrong because it joins the Ganga in Bihar."
  },
  22: {
    questext: "National Waterway 1 is on the river Ganga between",
    options: ["Prayagraj and Haldia", "Sadiya and Dhubri", "Kollam and Kottapuram", "Kakinada and Puducherry"],
    correct: "1",
    exptext: "✅ National Waterway 1 runs on the Ganga from Prayagraj, once called Allahabad, to Haldia. 📌 Ganga is Waterway number one. ❌ Sadiya and Dhubri is wrong because that is the Brahmaputra waterway."
  },
  23: {
    type: "concept", icon: "🔱", accent: "#f97316", pauseTimer: true,
    title: "Headstreams and Prayags of the Ganga",
    html: `
      <p class="cp-lead">A <b>prayag</b> is a place where two rivers meet. In the mountains of Uttarakhand the streams of the Ganga meet at five prayags.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/15.png" alt="Sketch of the Alaknanda river with five meeting points in order: Vishnuprayag with Dhaulig" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Prayag</th><th>The river that joins the Alaknanda</th></tr></thead><tbody><tr><td>Vishnuprayag</td><td>Dhauliganga</td></tr><tr><td>Nandprayag</td><td>Nandakini</td></tr><tr><td>Karnaprayag</td><td>Pindar</td></tr><tr><td>Rudraprayag</td><td>Mandakini</td></tr><tr><td>Devprayag</td><td>Bhagirathi</td></tr></tbody></table>
      <p class="cp-lead">The famous temple of Badrinath stands on the bank of the Alaknanda river.</p>
      <p class="cp-lead">Kedarnath temple is near the Mandakini river, and Gangotri is on the Bhagirathi.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/16.png" alt="Devprayag confluence Bhagirathi Alaknanda photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Bhagirathi comes from Gangotri, and the Alaknanda comes from Badrinath. Their meeting at Devprayag is the end of the five prayags.</p>
      <div class="cp-note tip">The order from the top downstream is Vishnu, Nand, Karna, Rudra and Dev. The name Dev means the last and the most famous.</div>
      <div class="cp-note trap">Rudraprayag is for the Mandakini, and Karnaprayag is for the Pindar. Do not swap them.</div>
      <div class="cp-note exam">Devprayag is where the Bhagirathi meets the Alaknanda.</div>
      <div class="cp-mnemonic">Very Nice Kids Really Dance: Vishnu, Nand, Karna, Rudra, Dev.</div>
    `
  },
  24: {
    questext: "The Alaknanda meets the Bhagirathi at",
    options: ["Rudraprayag", "Karnaprayag", "Vishnuprayag", "Devprayag"],
    correct: "4",
    exptext: "✅ The two main headstreams meet at Devprayag and form the Ganga. 📌 Dev is the last prayag. ❌ Rudraprayag is wrong because the Mandakini joins there."
  },
  25: {
    questext: "The Mandakini river meets the Alaknanda at",
    options: ["Karnaprayag", "Rudraprayag", "Nandprayag", "Devprayag"],
    correct: "2",
    exptext: "✅ The Mandakini meets the Alaknanda at Rudraprayag. 📌 Rudra goes with Mandakini. ❌ Karnaprayag is wrong because the Pindar meets there."
  },
  26: {
    questext: "Consider the following statements about the prayags of the Ganga:\n1. The Pindar river meets the Alaknanda at Karnaprayag.\n2. The Nandakini river meets the Alaknanda at Nandprayag.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are true. 📌 Karna with Pindar, Nand with Nandakini. ❌ Neither is wrong because both pairs are standard."
  },
  27: {
    type: "concept", icon: "🌱", accent: "#84cc16", pauseTimer: true,
    title: "Tributaries of the Ganga",
    html: `
      <p class="cp-lead">The Yamuna is the biggest tributary of the Ganga. It joins the Ganga at Prayagraj from the right side.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/17.png" alt="Yamuna Ganga confluence Prayagraj Sangam photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Side</th><th>Tributaries</th></tr></thead><tbody><tr><td>Right bank</td><td>Yamuna and Son</td></tr><tr><td>Left bank</td><td>Ramganga, Gomti, Ghaghara, Gandak, Kosi and Mahananda</td></tr><tr><td>Right bank of the Yamuna</td><td>Chambal, Sindh, Betwa and Ken</td></tr><tr><td>Tributaries of the Chambal</td><td>Banas, Kali Sindh and Parbati</td></tr></tbody></table>
      <p class="cp-lead">The <b>Kosi</b> joins the left bank of the Ganga. It changes its course very often and causes great floods, so it is called the <b>Sorrow of Bihar</b>.</p>
      <p class="cp-lead">The <b>Damodar</b> is a big river on the right bank of the Hooghly. It caused floods in the past, so it is called the <b>Sorrow of Bengal</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/18.png" alt="Tree diagram with Ganga in the centre, left branches Ramganga, Gomti, Ghaghara, Gandak, Ko" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix the two sorrow rivers. The Kosi belongs to Bihar and the Damodar belongs to Bengal.</div>
      <div class="cp-note exam">Chambal, Sindh, Betwa and Ken are Yamuna tributaries, and Banas and Kali Sindh are Chambal tributaries.</div>
    `
  },
  28: {
    questext: "Which river is called the Sorrow of Bihar?",
    options: ["Kosi", "Damodar", "Gandak", "Son"],
    correct: "1",
    exptext: "✅ The Kosi changes its course and floods Bihar, so it is called the Sorrow of Bihar. 📌 Kosi, Bihar, sorrow. ❌ Damodar is wrong because it is the Sorrow of Bengal."
  },
  29: {
    questext: "The Damodar river is known as the",
    options: ["Sorrow of Bihar", "Golden River", "Blood River", "Sorrow of Bengal"],
    correct: "4",
    exptext: "✅ The Damodar caused many floods in Bengal, so it is called the Sorrow of Bengal. 📌 Damodar belongs to Bengal. ❌ Sorrow of Bihar is wrong because that is the Kosi."
  },
  30: {
    type: "concept", icon: "🌄", accent: "#06b6d4", pauseTimer: true,
    title: "Brahmaputra River Drainage System",
    html: `
      <p class="cp-lead">The Brahmaputra starts from the <b>Chemayungdung</b> glacier in the Kailash range, near Lake Mansarovar. In Tibet it flows east and is called the <b>Tsangpo</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/19.png" alt="Brahmaputra river Assam wide river photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It cuts the Himalayas near Namcha Barwa in a sharp bend, turns south and enters Arunachal Pradesh as the <b>Siang or Dihang</b>. After the Dibang and the Lohit join it, it is called the Brahmaputra.</p>
      <table><thead><tr><th>Place</th><th>Name of the river</th></tr></thead><tbody><tr><td>Tibet</td><td>Tsangpo</td></tr><tr><td>Arunachal Pradesh</td><td>Siang or Dihang</td></tr><tr><td>Assam</td><td>Brahmaputra</td></tr><tr><td>Bangladesh</td><td>Jamuna</td></tr></tbody></table>
      <p class="cp-lead">Right bank tributaries include Subansiri, Kameng, Manas, Sankosh and Teesta. Left bank tributaries include Dibang, Lohit, Dhansiri and Kopili.</p>
      <p class="cp-lead">The Lohit is also called the Blood River. The Barak river, the main stream of the Meghna, starts in the Manipur hills.</p>
      <p class="cp-lead">National Waterway 2 is on the Brahmaputra between Sadiya and Dhubri. Majuli, the world's largest river island, lies in this river.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/20.png" alt="Sketch of the Brahmaputra from Tibet as Tsangpo, bend at Namcha Barwa, then Siang, Brahmap" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix the Dibang and the Lohit with the right bank rivers. They join from the left bank.</div>
      <div class="cp-note exam">Tsangpo, Dihang, Brahmaputra and Jamuna are one river in four countries or states.</div>
      <div class="cp-mnemonic">Tibet Tsangpo, Dihang, Brahmaputra, Jamuna: T-D-B-J.</div>
    `
  },
  31: {
    questext: "In Arunachal Pradesh the Brahmaputra is known as",
    options: ["Tsangpo", "Dihang", "Jamuna", "Padma"],
    correct: "2",
    exptext: "✅ In Arunachal Pradesh the river is called Siang or Dihang. 📌 Dihang is in the north-east. ❌ Tsangpo is wrong because that is its name in Tibet."
  },
  32: {
    questext: "The Lohit river is also called the",
    options: ["Golden River", "Sorrow River", "Blood River", "Black River"],
    correct: "3",
    exptext: "✅ The Lohit is called the Blood River. 📌 Lohit means red. ❌ Golden River is wrong because the Subarnarekha has that meaning."
  },
  33: {
    questext: "National Waterway 2 lies on the Brahmaputra between",
    options: ["Sadiya and Dhubri", "Prayagraj and Haldia", "Kollam and Kottapuram", "Kakinada and Puducherry"],
    correct: "1",
    exptext: "✅ National Waterway 2 runs on the Brahmaputra from Sadiya to Dhubri in Assam. 📌 Waterway 2 is in Assam. ❌ Prayagraj and Haldia is wrong because that is on the Ganga."
  },
  34: {
    type: "concept", icon: "🌴", accent: "#a855f7", pauseTimer: true,
    title: "Drainage System of Peninsular Rivers",
    html: `
      <p class="cp-lead">The Peninsular Plateau slopes towards the east and south-east. So most peninsular rivers start in the Western Ghats and flow east into the Bay of Bengal, where they form deltas.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/21.png" alt="Outline map of peninsular India with arrows showing most rivers flowing east to the Bay of" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Narmada and Tapi</b> are exceptions. They flow through old rift valleys, which are long cracks in the land, and fall into the Arabian Sea in estuaries.</p>
      <table><thead><tr><th>Falls into</th><th>Major rivers</th></tr></thead><tbody><tr><td>Arabian Sea</td><td>Narmada, Tapi, Mahi, Sabarmati, Periyar, Mandovi and Zuari</td></tr><tr><td>Bay of Bengal</td><td>Subarnarekha, Vaitarani, Brahmani, Mahanadi, Godavari, Krishna and Kaveri</td></tr></tbody></table>
      <p class="cp-lead">In length, the Godavari is the longest of the peninsular rivers at about 1,465 kilometres. The Krishna is about 1,400 kilometres, and the Narmada is about 1,312 kilometres.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/22.png" alt="Western Ghats river waterfall monsoon peninsular India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not think that all rivers of the west coast are short streams only. The Narmada and Tapi are long, but they flow west because of their rift valleys.</div>
      <div class="cp-note exam">Questions give a river and ask whether it falls into the Arabian Sea or the Bay of Bengal.</div>
      <div class="cp-mnemonic">Narmada, Tapi, Mahi, Sabarmati: the west-flowing big four.</div>
    `
  },
  35: {
    questext: "Which of the following rivers falls into the Arabian Sea?",
    options: ["Godavari", "Krishna", "Mahanadi", "Mahi"],
    correct: "4",
    exptext: "✅ The Mahi flows into the Gulf of Khambhat of the Arabian Sea. 📌 West side rivers: Narmada, Tapi, Mahi, Sabarmati. ❌ Godavari is wrong because it flows east."
  },
  36: {
    questext: "Which of the following rivers does NOT fall into the Arabian Sea?",
    options: ["Tapi", "Kaveri", "Sabarmati", "Mandovi"],
    correct: "2",
    exptext: "✅ The Kaveri falls into the Bay of Bengal. 📌 Kaveri goes east like most southern rivers. ❌ Tapi is wrong because it falls into the Arabian Sea."
  },
  37: {
    type: "concept", icon: "🏜️", accent: "#e11d48", pauseTimer: true,
    title: "Narmada and Tapi Rivers",
    html: `
      <p class="cp-lead">The <b>Narmada</b> starts on the Amarkantak hills in Madhya Pradesh. It flows west through a rift valley between the Vindhya range in the north and the Satpura range in the south.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/23.png" alt="Narmada river Bhedaghat marble rocks Dhuandhar Falls photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It falls into the Gulf of Khambhat in the Arabian Sea. The Sardar Sarovar Project is built on this river.</p>
      <p class="cp-lead">Near Jabalpur it cuts through the marble rocks of Bhedaghat and forms the <b>Dhuandhar Falls</b>.</p>
      <p class="cp-lead">The <b>Tapi</b> starts from Multai in the Satpura hills in the Betul district of Madhya Pradesh.</p>
      <p class="cp-lead">It also flows through a rift valley and falls into the Gulf of Khambhat in the Arabian Sea.</p>
      <table><thead><tr><th>River</th><th>Source</th><th>Flows between</th><th>Falls into</th></tr></thead><tbody><tr><td>Narmada</td><td>Amarkantak</td><td>Vindhya and Satpura</td><td>Gulf of Khambhat</td></tr><tr><td>Tapi</td><td>Multai, Betul</td><td>South of the Narmada, along the Satpura</td><td>Gulf of Khambhat</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/24.png" alt="Sketch of the Vindhya and Satpura ranges with the Narmada flowing west between them and th" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Narmada is born at Amarkantak, but the Tapi is born at Multai. Do not swap them.</div>
      <div class="cp-note exam">Dhuandhar Falls is on the Narmada, and Sardar Sarovar is also on the Narmada.</div>
    `
  },
  38: {
    questext: "The Narmada river originates at",
    options: ["Multai", "Trimbak", "Amarkantak", "Mahabaleshwar"],
    correct: "3",
    exptext: "✅ The Narmada starts on the Amarkantak hills in Madhya Pradesh. 📌 Narmada and Amarkantak both have the letter A. ❌ Multai is wrong because the Tapi starts there."
  },
  39: {
    questext: "The Tapi river originates from Multai in which hills?",
    options: ["Satpura", "Vindhya", "Aravalli", "Western Ghats"],
    correct: "1",
    exptext: "✅ The Tapi starts at Multai in the Satpura hills of the Betul district. 📌 Tapi lies to the south, so it goes with Satpura. ❌ Vindhya is wrong because the Narmada flows north of the Satpura."
  },
  40: {
    questext: "The Dhuandhar Falls is on the river",
    options: ["Godavari", "Chambal", "Tapi", "Narmada"],
    correct: "4",
    exptext: "✅ The Narmada cuts the marble rocks at Bhedaghat and forms the Dhuandhar Falls. 📌 Dhuandhar means falling smoke. ❌ Chambal is wrong because the Chulia Falls is on it."
  },
  41: {
    type: "concept", icon: "🏞️", accent: "#10b981", pauseTimer: true,
    title: "Godavari River",
    html: `
      <p class="cp-lead">The Godavari is the largest river of Peninsular India and has the largest drainage system. It starts at <b>Trimbak</b> in the Nashik district of Maharashtra.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/25.png" alt="Godavari river Nashik Trimbakeshwar origin photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Because of its large size, it is called the <b>Dakshin Ganga</b>, which means the Ganga of South India.</p>
      <p class="cp-lead">Its main tributaries are Pravara, Purna, Manjra, Penganga, Wardha, Wainganga, Pranhita, Indravati and Sabari.</p>
      <p class="cp-lead">Its basin lies in Maharashtra, which has about half of it, and also in Madhya Pradesh, Chhattisgarh, Odisha, Andhra Pradesh, Telangana and Karnataka.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Source</td><td>Trimbak, Nashik</td></tr><tr><td>Length</td><td>About 1,465 kilometres</td></tr><tr><td>Nickname</td><td>Dakshin Ganga</td></tr><tr><td>Falls into</td><td>Bay of Bengal</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/26.png" alt="Sketch of the Godavari from Nashik to the Bay of Bengal with tributaries Pravara, Manjra, " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not give Mahabaleshwar as the source of the Godavari. That is the source of the Krishna.</div>
      <div class="cp-note exam">Godavari is the largest peninsular river, with the source at Trimbak.</div>
    `
  },
  42: {
    questext: "The Godavari river starts from",
    options: ["Mahabaleshwar", "Trimbak", "Amarkantak", "Sihawa"],
    correct: "2",
    exptext: "✅ The Godavari starts at Trimbak in the Nashik district. 📌 Trimbak goes with Godavari, Mahabaleshwar goes with Krishna. ❌ Amarkantak is wrong because the Narmada starts there."
  },
  43: {
    questext: "Which is the largest river of Peninsular India?",
    options: ["Krishna", "Narmada", "Godavari", "Kaveri"],
    correct: "3",
    exptext: "✅ The Godavari has the largest drainage system of Peninsular India. 📌 Godavari is the Dakshin Ganga. ❌ Krishna is wrong because it is the second largest."
  },
  44: {
    type: "concept", icon: "⛰️", accent: "#eab308", pauseTimer: true,
    title: "Krishna River",
    html: `
      <p class="cp-lead">The Krishna is the second largest river of Peninsular India. It starts near <b>Mahabaleshwar</b> in the Western Ghats of Maharashtra.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/27.png" alt="Mahabaleshwar Krishna river source temple photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Tungabhadra</b> is its largest tributary. The Tunga and the Bhadra rivers join to form it, and the main tributary of the Tungabhadra is the Hagri. Bhima is another big tributary.</p>
      <p class="cp-lead">The Krishna and the Godavari form a large delta together in Andhra Pradesh.</p>
      <p class="cp-lead">The Krishna river water dispute is among Maharashtra, Karnataka, Telangana and Andhra Pradesh.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Source</td><td>Near Mahabaleshwar</td></tr><tr><td>Largest tributary</td><td>Tungabhadra</td></tr><tr><td>Other tributaries</td><td>Bhima, Koyna, Malaprabha</td></tr><tr><td>Falls into</td><td>Bay of Bengal</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/28.png" alt="Sketch of the Krishna from Mahabaleshwar to the Bay of Bengal with Bhima joining from the " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Tungabhadra is the largest tributary of the Krishna, not the Bhima.</div>
      <div class="cp-note exam">Krishna starts near Mahabaleshwar and its largest tributary is Tungabhadra.</div>
    `
  },
  45: {
    questext: "The Krishna river starts near",
    options: ["Mahabaleshwar", "Trimbak", "Amarkantak", "Brahmagiri"],
    correct: "1",
    exptext: "✅ The Krishna starts near Mahabaleshwar in the Western Ghats. 📌 Krishna starts in Mahabaleshwar. ❌ Brahmagiri is wrong because the Kaveri starts there."
  },
  46: {
    questext: "The largest tributary of the Krishna river is",
    options: ["Bhima", "Hagri", "Koyna", "Tungabhadra"],
    correct: "4",
    exptext: "✅ The Tungabhadra is the largest tributary of the Krishna. 📌 Tunga plus Bhadra makes the biggest one. ❌ Hagri is wrong because it is the main tributary of the Tungabhadra."
  },
  47: {
    type: "concept", icon: "🌾", accent: "#0ea5e9", pauseTimer: true,
    title: "Mahanadi River",
    html: `
      <p class="cp-lead">The Mahanadi starts near the <b>Sihawa hills</b> in the Dhamtari district of Chhattisgarh. It then flows through Odisha and falls into the Bay of Bengal near <b>Paradeep</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/29.png" alt="Hirakud Dam Mahanadi Sambalpur reservoir photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Hirakud and Tikarpara dams are important multipurpose projects on this river. A multipurpose project gives water for farms, power and flood control together.</p>
      <p class="cp-lead">The Mahanadi forms a delta on the Odisha coast.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Source</td><td>Sihawa hills, Dhamtari, Chhattisgarh</td></tr><tr><td>Main state</td><td>Odisha</td></tr><tr><td>Dam</td><td>Hirakud</td></tr><tr><td>Falls into</td><td>Bay of Bengal near Paradeep</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/30.png" alt="Sketch of the Mahanadi from Sihawa hills in Chhattisgarh through the Hirakud Dam in Odisha" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Mahanadi starts in Chhattisgarh, not in Odisha.</div>
      <div class="cp-note exam">Hirakud Dam is on the Mahanadi.</div>
    `
  },
  48: {
    questext: "The Hirakud Dam is built on which river?",
    options: ["Godavari", "Mahanadi", "Krishna", "Kaveri"],
    correct: "2",
    exptext: "✅ The Hirakud Dam is on the Mahanadi river in Odisha. 📌 Hirakud and Mahanadi both belong to Odisha. ❌ Godavari is wrong because it flows farther south."
  },
  49: {
    type: "concept", icon: "🌺", accent: "#d946ef", pauseTimer: true,
    title: "Kaveri River",
    html: `
      <p class="cp-lead">The Kaveri, also written Cauvery, starts from the <b>Brahmagiri hills</b> in the Kodagu district of Karnataka. It is called the <b>Ganga of the South</b> in some places.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/31.png" alt="Talakaveri Brahmagiri Kodagu Cauvery source photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It forms the famous <b>Shivasamudra Falls</b>, also written Sivasamudram, one of the biggest waterfalls in India.</p>
      <p class="cp-lead">On its way it forms the islands of Srirangapatna, Shivasamudra and Srirangam.</p>
      <p class="cp-lead">The Krishnarajasagar and Mettur dams are built on this river. It falls into the Bay of Bengal and forms a delta in Tamil Nadu.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Source</td><td>Brahmagiri hills, Kodagu</td></tr><tr><td>Waterfall</td><td>Shivasamudra Falls</td></tr><tr><td>Islands</td><td>Srirangapatna, Shivasamudra, Srirangam</td></tr><tr><td>Falls into</td><td>Bay of Bengal</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/32.png" alt="Sketch of the Kaveri from Kodagu through Krishnarajasagar and Mettur Dam to its delta, wit" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Kaveri starts in Karnataka, but its delta is in Tamil Nadu.</div>
      <div class="cp-note exam">Shivasamudra Falls and the islands of Srirangam are on the Kaveri.</div>
    `
  },
  50: {
    questext: "The Kaveri river starts from the Brahmagiri hills in which state?",
    options: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
    correct: "3",
    exptext: "✅ The Kaveri starts in the Kodagu district of Karnataka. 📌 Kodagu is in Karnataka. ❌ Tamil Nadu is wrong because only the delta lies there."
  },
  51: {
    questext: "The island of Srirangam is formed by which river?",
    options: ["Kaveri", "Krishna", "Godavari", "Mahanadi"],
    correct: "1",
    exptext: "✅ The Kaveri splits and forms the island of Srirangam. 📌 Kaveri has three islands. ❌ Krishna is wrong because it is far north."
  },
  52: {
    type: "concept", icon: "🏞️", accent: "#64748b", pauseTimer: true,
    title: "Types of Lakes of India",
    html: `
      <p class="cp-lead">A lake is a large body of water surrounded by land. Indian lakes are grouped by the way they were formed.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/33.png" alt="Six small pictures in a grid, each with a label: Tectonic lake, Lagoon lake, Glacial lake," style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Type of lake</th><th>How it forms</th><th>Examples</th></tr></thead><tbody><tr><td>Tectonic lake</td><td>Land sinks because of a crack or movement in the earth</td><td>Wular Lake</td></tr><tr><td>Lagoon lake</td><td>Sea water is trapped behind a sand bar</td><td>Chilika, Pulicat, Vembanad, Ashtamudi</td></tr><tr><td>Glacial lake</td><td>Made by glaciers</td><td>Nainital, Rakshastal, Khurpatal, Roopkund</td></tr><tr><td>Wind-formed lake</td><td>Made by wind in dry areas</td><td>Sambhar, Didwana, Panchbhadra, Lunkaransar</td></tr><tr><td>Deltaic lake</td><td>Made in a river delta</td><td>Kolleru Lake</td></tr><tr><td>Crater lake</td><td>Water fills the mouth of an old volcano</td><td>Lonar Lake in Buldhana, Maharashtra</td></tr></tbody></table>
      <p class="cp-lead">A lagoon is also called an Anoop lake in Hindi.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/34.png" alt="Lonar crater lake Buldhana Maharashtra photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Sambhar is not a lagoon. It is a salt lake in dry Rajasthan made by wind and sand.</div>
      <div class="cp-note exam">Wular is a tectonic lake, Lonar is a crater lake, and Chilika, Pulicat and Vembanad are lagoons.</div>
      <div class="cp-mnemonic">Wular tectonic, Lonar crater, Kolleru delta.</div>
    `
  },
  53: {
    questext: "Which of the following is a crater lake?",
    options: ["Wular", "Sambhar", "Chilika", "Lonar"],
    correct: "4",
    exptext: "✅ Lonar Lake in Buldhana, Maharashtra fills an old volcanic crater. 📌 Lonar means crater. ❌ Wular is wrong because it is a tectonic lake."
  },
  54: {
    questext: "Wular Lake is an example of a",
    options: ["lagoon lake", "tectonic lake", "glacial lake", "crater lake"],
    correct: "2",
    exptext: "✅ Wular Lake in Kashmir was formed when the land sank because of earth movement. 📌 Wular belongs to the tectonic group. ❌ Lagoon lake is wrong because Chilika and Pulicat are lagoons."
  },
  55: {
    type: "concept", icon: "🦌", accent: "#fb7185", pauseTimer: true,
    title: "Loktak, Pulicat, Vembanad and Chilika Lakes",
    html: `
      <p class="cp-lead"><b>Loktak Lake</b> in Manipur is the largest freshwater lake of north-eastern India. Floating islands on it are called <b>Phumdis</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/35.png" alt="Loktak Lake phumdi floating islands Manipur photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The world's only floating national park, <b>Keibul Lamjao National Park</b>, is on Loktak. It is the only natural home of the Sangai deer. Loktak is called the Lifeline of Manipur and is on the Ramsar list and the Montreux Record.</p>
      <p class="cp-lead"><b>Pulicat Lake</b> is a lagoon on the border of Andhra Pradesh and Tamil Nadu. Sriharikota Island separates it from the Bay of Bengal, and the Satish Dhawan Space Centre is on that island.</p>
      <p class="cp-lead"><b>Vembanad Lake</b> in Kerala is a lagoon and the longest lake of India. About ten rivers, such as the Pamba and the Periyar, end in it. It has the islands Wellington and Vallarpadam, and the Nehru Trophy Boat Race is held on it every year in August.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/36.png" alt="Vembanad Lake Kerala backwaters boat photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Chilika Lake</b> on the Odisha coast is the largest lagoon and salt water lake of India. It is on the Ramsar list, and the Nalaban island is famous for birds.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/37.png" alt="Chilika Lake Odisha lagoon dolphins boats photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Lake</th><th>State</th><th>Key fact</th></tr></thead><tbody><tr><td>Loktak</td><td>Manipur</td><td>Phumdis, Sangai deer</td></tr><tr><td>Pulicat</td><td>Andhra Pradesh and Tamil Nadu</td><td>Lagoon behind Sriharikota</td></tr><tr><td>Vembanad</td><td>Kerala</td><td>Longest lake of India</td></tr><tr><td>Chilika</td><td>Odisha</td><td>Largest lagoon of India</td></tr></tbody></table>
      <div class="cp-note trap">Pulicat and Chilika are both lagoons, but Chilika is bigger. Vembanad is the longest.</div>
      <div class="cp-note exam">Phumdis belong to Loktak, and Nalaban belongs to Chilika.</div>
    `
  },
  56: {
    questext: "The floating islands of Loktak Lake are called",
    options: ["Kayals", "Beels", "Phumdis", "Margs"],
    correct: "3",
    exptext: "✅ Phumdis are floating islands of weeds and soil in Loktak Lake. 📌 Phumdi means floating mass. ❌ Kayals is wrong because these are lagoons of Kerala."
  },
  57: {
    questext: "Which is the longest lake of India?",
    options: ["Vembanad", "Chilika", "Pulicat", "Loktak"],
    correct: "1",
    exptext: "✅ Vembanad Lake in Kerala is the longest lake of India. 📌 Vembanad is the long lake of Kerala. ❌ Chilika is wrong because it is the largest lagoon, not the longest lake."
  },
  58: {
    questext: "Which is the largest lagoon of India?",
    options: ["Pulicat", "Vembanad", "Loktak", "Chilika"],
    correct: "4",
    exptext: "✅ Chilika Lake in Odisha is the largest lagoon of India. 📌 Chilika is the big lagoon. ❌ Pulicat is wrong because it is smaller."
  },
  59: {
    type: "concept", icon: "💦", accent: "#2dd4bf", pauseTimer: true,
    title: "Waterfalls of India",
    html: `
      <p class="cp-lead">A waterfall forms where a river drops from a height over hard rock. Each famous fall belongs to one river and one state.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/38.png" alt="Chitrakote Falls Indravati river Chhattisgarh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Waterfall</th><th>River</th><th>State</th></tr></thead><tbody><tr><td>Jog or Gersoppa Falls</td><td>Sharavati</td><td>Karnataka</td></tr><tr><td>Dhuandhar, Dudhdhara and Kapildhara</td><td>Narmada</td><td>Madhya Pradesh</td></tr><tr><td>Dudma Falls</td><td>Machkund</td><td>Odisha</td></tr><tr><td>Chulia Falls</td><td>Chambal</td><td>Rajasthan</td></tr><tr><td>Chitrakote Falls, the Niagara of India</td><td>Indravati</td><td>Chhattisgarh</td></tr><tr><td>Hundru Falls</td><td>Subarnarekha</td><td>Jharkhand</td></tr><tr><td>Dudhsagar Falls</td><td>Mandovi</td><td>Goa</td></tr><tr><td>Kunchikal Falls</td><td>Varahi</td><td>Karnataka</td></tr><tr><td>Shivasamudra Falls</td><td>Kaveri</td><td>Karnataka</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/39.png" alt="Dudhsagar Falls Goa train bridge photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Mahi river</b> starts in the Vindhya range in the Dhar district of Madhya Pradesh. It cuts the Tropic of Cancer twice, flows through Madhya Pradesh, Rajasthan and Gujarat, and falls into the Gulf of Khambhat.</p>
      <p class="cp-lead">The Mahi is a good example of a river that crosses one line of latitude two times.</p>
      <div class="cp-note trap">Chitrakote is on the Indravati in Chhattisgarh, and Chulia is on the Chambal in Rajasthan. Do not swap them.</div>
      <div class="cp-note exam">Waterfall questions give a fall and ask for the river or the state. Learn them in pairs.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Drainage_System/40.png" alt="Map of India with nine waterfalls marked as numbered dots and a key matching each number t" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
    `
  },
  60: {
    questext: "Chitrakote Falls, the Niagara of India, is on which river?",
    options: ["Narmada", "Indravati", "Chambal", "Godavari"],
    correct: "2",
    exptext: "✅ Chitrakote Falls is on the Indravati river in Chhattisgarh. 📌 Niagara of India is Indravati. ❌ Chambal is wrong because the Chulia Falls is on it."
  },
  61: {
    questext: "Dudhsagar Falls is located in which state?",
    options: ["Karnataka", "Odisha", "Goa", "Rajasthan"],
    correct: "3",
    exptext: "✅ Dudhsagar Falls is on the Mandovi river in Goa. 📌 Dudh means milk, and Goa has milk-white falls. ❌ Karnataka is wrong because Jog and Kunchikal are there."
  },
  62: {
    questext: "Which river cuts the Tropic of Cancer twice?",
    options: ["Mahi", "Narmada", "Tapi", "Sabarmati"],
    correct: "1",
    exptext: "✅ The Mahi cuts the Tropic of Cancer twice on its way to the Gulf of Khambhat. 📌 Mahi crosses the line two times. ❌ Narmada is wrong because it is not the river known for this."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Drainage_System/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a winding blue river on a relief map of India, a rushing waterfall and a calm lake with floating islands" },
  "images/General_Awareness/Geography/Drainage_System/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ganga river Rishikesh Himalayan foothills photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/1.png. a fast river leaving the Himalayan hills",
  "images/General_Awareness/Geography/Drainage_System/2.png": { t: "fig", about: "Two-column comparison picture: left a long blue river from snow mountains to a big delta labelled Himalayan river, right a shorter river from low hills labelled Peninsular river, with the words perennial and seasonal." },
  "images/General_Awareness/Geography/Drainage_System/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indus river Leh Ladakh valley photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/3.png. the Indus flowing through the Ladakh valley",
  "images/General_Awareness/Geography/Drainage_System/4.png": { t: "fig", about: "Simple map of the Indus system with the Indus as a thick line and five Punjab rivers Jhelum, Chenab, Ravi, Beas and Sutlej joining it from the left, and Kabul from the right." },
  "images/General_Awareness/Geography/Drainage_System/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Verinag spring Kashmir Jhelum source photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/5.png. the clear water of Verinag spring",
  "images/General_Awareness/Geography/Drainage_System/6.png": { t: "fig", about: "Simple sketch of the Jhelum flowing from Verinag through Srinagar and Wular Lake to the border, then to Mangla Dam and the Chenab." },
  "images/General_Awareness/Geography/Drainage_System/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chandra Bhaga river confluence Tandi Lahaul photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/7.png. two mountain rivers meeting",
  "images/General_Awareness/Geography/Drainage_System/8.png": { t: "fig", about: "Sketch of two small rivers Chandra and Bhaga meeting at Tandi to make the Chenab, then flowing through Kishtwar gorge and Akhnoor plain, with three dam icons labelled Dulhasti, Salal and Baglihar." },
  "images/General_Awareness/Geography/Drainage_System/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ranjit Sagar Dam Thein Ravi river photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/9.png. the large reservoir of Ranjit Sagar Dam",
  "images/General_Awareness/Geography/Drainage_System/10.png": { t: "fig", about: "Sketch of Ravi and Beas starting near Rohtang Pass, with Beas flowing through Kullu and meeting Sutlej at Harike Barrage, from where the Indira Gandhi Canal begins." },
  "images/General_Awareness/Geography/Drainage_System/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sutlej river Himachal Pradesh gorge photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/11.png. the Sutlej in a deep Himachal valley",
  "images/General_Awareness/Geography/Drainage_System/12.png": { t: "fig", about: "Sketch of the Sutlej from Rakshas Tal through Shipki La, Bhakra-Nangal Dam and Harike Barrage, with the Beas joining it at Harike." },
  "images/General_Awareness/Geography/Drainage_System/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gaumukh Gangotri glacier source of Bhagirathi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/13.png. the ice cave at Gaumukh from where the Bhagirathi starts",
  "images/General_Awareness/Geography/Drainage_System/14.png": { t: "fig", about: "Sketch of the Ganga from Gaumukh through Devprayag and Haridwar to Farakka, where it splits into Hooghly and Padma, then Padma joins Jamuna to become Meghna flowing into the Bay of Bengal." },
  "images/General_Awareness/Geography/Drainage_System/15.png": { t: "fig", about: "Sketch of the Alaknanda river with five meeting points in order: Vishnuprayag with Dhauliganga, Nandprayag with Nandakini, Karnaprayag with Pindar, Rudraprayag with Mandakini and Devprayag with Bhagirathi." },
  "images/General_Awareness/Geography/Drainage_System/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Devprayag confluence Bhagirathi Alaknanda photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/16.png. two rivers meeting at Devprayag",
  "images/General_Awareness/Geography/Drainage_System/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Yamuna Ganga confluence Prayagraj Sangam photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/17.png. the meeting of two rivers at Prayagraj",
  "images/General_Awareness/Geography/Drainage_System/18.png": { t: "fig", about: "Tree diagram with Ganga in the centre, left branches Ramganga, Gomti, Ghaghara, Gandak, Kosi, right branches Yamuna and Son, and under Yamuna the branches Chambal, Sindh, Betwa and Ken." },
  "images/General_Awareness/Geography/Drainage_System/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Brahmaputra river Assam wide river photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/19.png. the broad Brahmaputra river in Assam",
  "images/General_Awareness/Geography/Drainage_System/20.png": { t: "fig", about: "Sketch of the Brahmaputra from Tibet as Tsangpo, bend at Namcha Barwa, then Siang, Brahmaputra in Assam and Jamuna in Bangladesh, with tributaries labelled on both banks." },
  "images/General_Awareness/Geography/Drainage_System/21.png": { t: "fig", about: "Outline map of peninsular India with arrows showing most rivers flowing east to the Bay of Bengal and two rivers, Narmada and Tapi, flowing west to the Arabian Sea." },
  "images/General_Awareness/Geography/Drainage_System/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Western Ghats river waterfall monsoon peninsular India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/22.png. a river leaving the Western Ghats in the monsoon",
  "images/General_Awareness/Geography/Drainage_System/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Narmada river Bhedaghat marble rocks Dhuandhar Falls photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/23.png. the Narmada falling at Dhuandhar near Jabalpur",
  "images/General_Awareness/Geography/Drainage_System/24.png": { t: "fig", about: "Sketch of the Vindhya and Satpura ranges with the Narmada flowing west between them and the Tapi flowing west south of Satpura, both ending in the Gulf of Khambhat." },
  "images/General_Awareness/Geography/Drainage_System/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Godavari river Nashik Trimbakeshwar origin photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/25.png. the temple town near the Godavari source",
  "images/General_Awareness/Geography/Drainage_System/26.png": { t: "fig", about: "Sketch of the Godavari from Nashik to the Bay of Bengal with tributaries Pravara, Manjra, Wardha, Wainganga, Indravati and Sabari labelled on both sides." },
  "images/General_Awareness/Geography/Drainage_System/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahabaleshwar Krishna river source temple photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/27.png. the Krishna source near Mahabaleshwar",
  "images/General_Awareness/Geography/Drainage_System/28.png": { t: "fig", about: "Sketch of the Krishna from Mahabaleshwar to the Bay of Bengal with Bhima joining from the north and Tungabhadra, made of Tunga and Bhadra, joining from the south." },
  "images/General_Awareness/Geography/Drainage_System/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hirakud Dam Mahanadi Sambalpur reservoir photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/29.png. the long Hirakud Dam on the Mahanadi",
  "images/General_Awareness/Geography/Drainage_System/30.png": { t: "fig", about: "Sketch of the Mahanadi from Sihawa hills in Chhattisgarh through the Hirakud Dam in Odisha to its delta near Paradeep." },
  "images/General_Awareness/Geography/Drainage_System/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Talakaveri Brahmagiri Kodagu Cauvery source photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/31.png. the Talakaveri temple tank in Kodagu",
  "images/General_Awareness/Geography/Drainage_System/32.png": { t: "fig", about: "Sketch of the Kaveri from Kodagu through Krishnarajasagar and Mettur Dam to its delta, with three islands marked: Srirangapatna, Shivasamudra and Srirangam." },
  "images/General_Awareness/Geography/Drainage_System/33.png": { t: "fig", about: "Six small pictures in a grid, each with a label: Tectonic lake, Lagoon lake, Glacial lake, Wind-formed lake, Deltaic lake and Crater lake, each showing a simple shape of how the lake forms." },
  "images/General_Awareness/Geography/Drainage_System/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lonar crater lake Buldhana Maharashtra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/34.png. the round green Lonar lake",
  "images/General_Awareness/Geography/Drainage_System/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Loktak Lake phumdi floating islands Manipur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/35.png. floating green islands on Loktak Lake",
  "images/General_Awareness/Geography/Drainage_System/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vembanad Lake Kerala backwaters boat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/36.png. boats on the wide Vembanad Lake",
  "images/General_Awareness/Geography/Drainage_System/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chilika Lake Odisha lagoon dolphins boats photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/37.png. boats on the wide Chilika Lake",
  "images/General_Awareness/Geography/Drainage_System/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chitrakote Falls Indravati river Chhattisgarh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/38.png. the wide Chitrakote Falls",
  "images/General_Awareness/Geography/Drainage_System/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dudhsagar Falls Goa train bridge photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Drainage_System/39.png. the four-step Dudhsagar Falls in Goa",
  "images/General_Awareness/Geography/Drainage_System/40.png": { t: "fig", about: "Map of India with nine waterfalls marked as numbered dots and a key matching each number to its river and state." }
});

/* CHANGE LOG
   - The Jhelum is described as starting from the Verinag spring in the Pir Panjal range, not from Sheshnag Lake.
   - The Ravi is described as joining the Chenab near Sarai Sidhu, and Verinag, Tandi and Rakshas Tal are given as the exact sources of the Jhelum, Chenab and Sutlej.
   - Length figures that differ between sources (Chenab and Sutlej) are left out; the Indus is given as about 2,880 kilometres in total and about 1,114 kilometres in India.
   - The Ganga splitting at Farakka is explained clearly: the Bhagirathi-Hooghly flows through West Bengal and the Padma enters Bangladesh, joins the Jamuna and then forms the Meghna.
   - Prayagraj is given as the new name of Allahabad for National Waterway 1.
   - The Krishna water dispute is listed with Telangana as well as Maharashtra, Karnataka and Andhra Pradesh.
   - The Nehru Trophy Boat Race is described as held every year in August on Vembanad Lake, not on the occasion of Onam.
   - Loktak and Chilika are described by their current facts; Chilika is the largest lagoon of India.
   - Waterfall names are matched with their rivers: Dudma Falls with the Machkund and Hundru Falls with the Subarnarekha.
   - Kaveri is described as called Ganga of the South in some places, while the Godavari is the Dakshin Ganga.
   - Repeated points about the Panchnad and the Ganga tributaries were merged.
*/
