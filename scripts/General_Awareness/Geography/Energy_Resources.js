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

/* Field: General_Awareness · Subject: Geography · Chapter: Energy_Resources · 15 concept pages (+ overview) · 31 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "⚡", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Energy Resources",
    thumb: {
      image: "images/General_Awareness/Geography/Energy_Resources/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "FAST TRICKS",
      line2: "ENERGY",
      line3: "RESOURCES",
      badge: "FULL CLASS",
      ribbon: "COAL • OIL • NUCLEAR • WIND",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Energy Resources of India | Coal, Oil, Nuclear, Wind | Geography Fast Class",
      altTitles: ["Types of Coal and Coalfields of India in One Class", "Nuclear Power Stations of India Trick"],
      description: "Energy Resources is a scoring Geography topic. In this full class we learn it step by step, from the four types of coal to nuclear power stations and wind energy.\n\n📌 IN THIS CLASS\n✅ Share of each energy source in India\n✅ Types of coal and the coalfields\n✅ Oil, natural gas and refineries\n✅ Uranium and nuclear power stations\n✅ Geothermal, wind, hydro and bio-energy\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Coal\n00:00 Oil and natural gas\n00:00 Nuclear energy\n00:00 Other energy sources\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Geography #EnergyResources",
      tags: ["energy resources of india", "types of coal", "coalfields of india", "oil refineries of india", "natural gas in india", "nuclear power stations", "uranium fields india", "geothermal energy india", "wind energy india", "hydroelectric energy", "bio energy india", "jharia coalfield", "mumbai high oil field", "india geography", "indian geography", "upsc geography", "ssc cgl geography", "general awareness", "static gk geography", "geography mcq", "important questions", "previous year questions", "competitive exams", "peat lignite anthracite", "UPSC"],
      hashtags: ["SSCCGL", "Geography", "EnergyResources"],
      thumbText: "ENERGY RESOURCES",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "⚡ New class is live: Energy Resources of India. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Coal\n00:00 Oil and natural gas\n00:00 Nuclear energy\n00:00 Other energy sources",
      playlist: "Competitive exams Geography — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the energy resources of India</u>: coal, oil and gas, nuclear power, and the cleaner sources like wind, water and plants. These facts are matched with places again and again in exams, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>15</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>31</b><span>Questions</span></div>
        <div class="cp-stat"><b>~61 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Installed Energy Sources</b><br>How much of the electricity capacity of India comes from coal, renewable energy, water, gas, nuclear power and oil.</li>
        <li><b>Coal</b><br>The four types of coal, how good each one is, and the coalfields of the Damodar, Son, Mahanadi and Godavari valleys.</li>
        <li><b>Mineral Oil and Natural Gas</b><br>The first oil wells, the first refineries and the main oil and gas fields of the country.</li>
        <li><b>Nuclear Energy</b><br>Who started nuclear power in India, where uranium is found and where the nuclear power stations stand.</li>
        <li><b>Other Energy Sources</b><br>Geothermal, wind, hydroelectric and bio-energy, with the places linked to each one.</li>
        <li><b>Practice</b><br>Exam style questions with short explanations in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> energy questions are mostly about matching a place with a fact, such as a coalfield, an oil field or a nuclear power station, so each place is worth learning with its state.</div>
    `
  },
  2: {
    type: "concept", icon: "🔌", accent: "#22c55e", pauseTimer: true,
    title: "Installed Energy Sources in India",
    html: `
      <p class="cp-lead">Installed capacity tells us how much electricity the power plants of a country can make at most. <u>In India, coal gives by far the largest share of the installed capacity.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/1.png" alt="Six horizontal bars of different length: Coal 58.9 percent, Renewable energy 17.6 percent," data-caption="A bar picture of how each energy source contributes to the electricity capacity of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Source</th><th>Share of installed capacity</th></tr></thead><tbody><tr><td>Coal</td><td>58.9 percent</td></tr><tr><td>Renewable energy</td><td>17.6 percent</td></tr><tr><td>Hydroelectricity</td><td>13.5 percent</td></tr><tr><td>Natural gas</td><td>7.6 percent</td></tr><tr><td>Nuclear energy</td><td>2.1 percent</td></tr><tr><td>Oil</td><td>0.3 percent</td></tr></tbody></table>
      <p class="cp-lead">The six shares add up to 100 percent. Coal alone is more than half, and oil is almost nothing.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/2.png" alt="coal fired thermal power plant chimneys India photo" data-caption="A coal fired thermal power plant, the biggest source of electricity capacity in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Out of every 100 units of power plant capacity, about 59 units come from coal and only a fraction of one unit comes from oil.</div>
      <div class="cp-mnemonic">Read the order as Coal, Renewable, Hydro, Natural gas, Nuclear and Oil.</div>
      <div class="cp-note trap">Renewable energy at 17.6 percent is larger than hydroelectricity at 13.5 percent, so do not put hydro second.</div>
      <div class="cp-note exam">Remember coal first and oil last, with nuclear energy at only 2.1 percent.</div>
    `
  },
  3: {
    questext: "Consider the following statements about the installed energy sources of India:\n1. Coal gives the largest share of the installed capacity.\n2. Hydroelectricity has a larger share than renewable energy.\n3. Nuclear energy has a share of about 2.1 percent.\nWhich of the statements given above is/are correct?",
    options: ["1 and 3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 3 are correct. 📌 Coal is first and nuclear is small. ❌ Statement 2 is wrong because renewable energy has 17.6 percent while hydroelectricity has 13.5 percent."
  },
  4: {
    questext: "Which one of the following energy sources has the smallest share in the installed capacity of India?",
    options: ["Natural gas", "Oil", "Nuclear energy", "Hydroelectricity"],
    correct: "2",
    exptext: "✅ Oil has the smallest share, only 0.3 percent. 📌 Oil is last in the order. ❌ Nuclear energy is tempting because it sounds rare, but it has 2.1 percent."
  },
  5: {
    type: "concept", icon: "⚫", accent: "#f59e0b", pauseTimer: true,
    title: "Coal",
    html: `
      <p class="cp-lead">Coal is a black rock that burns and gives heat, and it is made from plants that were buried for millions of years. <u>The most important and largest coal field area of India is the Upper Damodar Valley, which gives about 35 percent of the coal of the country.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/3.png" alt="black coal lumps close up photo" data-caption="Lumps of black coal, the fuel that gives India most of its electricity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Coal is divided into four main types: peat, lignite, bituminous and anthracite. The more carbon a coal has, the better is its quality, so peat is the weakest and anthracite is the best.</p>
      <table><thead><tr><th>Order of quality</th><th>Type of coal</th></tr></thead><tbody><tr><td>Lowest</td><td>Peat coal</td></tr><tr><td>Second</td><td>Lignite coal</td></tr><tr><td>Third</td><td>Bituminous coal</td></tr><tr><td>Highest</td><td>Anthracite coal</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/4.png" alt="A four step staircase going up: Peat at the bottom, then Lignite, then Bituminous, then An" data-caption="The four types of coal placed on a staircase from the weakest to the best." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">Pick Lemons, Buy Apples gives the order Peat, Lignite, Bituminous, Anthracite.</div>
      <div class="cp-example"><b>Example:</b> A coal with very little carbon, like peat, burns badly, while anthracite with the most carbon burns with a hot and clean flame.</div>
      <div class="cp-note trap">Anthracite is the best coal, not bituminous, even though bituminous is the one found most in India.</div>
      <div class="cp-note exam">Remember the order of quality: peat, lignite, bituminous and anthracite.</div>
    `
  },
  6: {
    questext: "About 35 percent of the coal of India is obtained from which one of the following valleys?",
    options: ["Godavari Valley", "Mahanadi Valley", "Damodar Valley", "Son Valley"],
    correct: "3",
    exptext: "✅ The Upper Damodar Valley gives about 35 percent of the coal of India. 📌 Damodar means the largest coal region. ❌ Mahanadi and Godavari valleys are important, but their share is smaller."
  },
  7: {
    questext: "Arrange the following types of coal in order from the lowest quality to the highest quality:\n1. Anthracite coal\n2. Peat coal\n3. Bituminous coal\n4. Lignite coal\nSelect the correct answer using the codes given below:",
    options: ["1, 3, 4, 2", "2, 3, 4, 1", "4, 2, 3, 1", "2, 4, 3, 1"],
    correct: "4",
    exptext: "✅ The order is peat, lignite, bituminous and anthracite, which is 2, 4, 3 and 1. 📌 Pick Lemons, Buy Apples. ❌ Putting bituminous before lignite forgets that lignite has less carbon."
  },
  8: {
    type: "concept", icon: "🪨", accent: "#ef4444", pauseTimer: true,
    title: "Peat, Lignite, Bituminous and Anthracite Coal",
    html: `
      <p class="cp-lead">Each type of coal has its own carbon content and its own special fact. <u>Learn the carbon range and the place that goes with each type.</u></p>
      <table><thead><tr><th>Type</th><th>Carbon content</th><th>Key fact</th></tr></thead><tbody><tr><td>Peat coal</td><td>About 40 percent</td><td>Low quality coal</td></tr><tr><td>Lignite coal</td><td>About 40 to 55 percent</td><td>Brown coal; Tamil Nadu (Neyveli region) is first in storage and production</td></tr><tr><td>Bituminous coal</td><td>About 50 to 80 percent</td><td>About 80 percent of the coal reserves of India; coal of the Gondwana period</td></tr><tr><td>Anthracite coal</td><td>About 80 to 95 percent</td><td>Best coal; found in the Reasi region of Jammu and Kashmir</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/5.png" alt="brown coal lignite lump photo" data-caption="Lignite, a soft brown coal, which is why it is also called brown coal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Bituminous coal is found in the Damodar, Godavari, Son, Mahanadi and Wardha river valleys.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/6.png" alt="Four stacked boxes with carbon amounts: Peat 40 percent, Lignite 40 to 55 percent, Bitumin" data-caption="The amount of carbon found in each of the four types of coal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that mentions Neyveli in Tamil Nadu is pointing to lignite, the brown coal.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/7.png" alt="anthracite coal shiny black piece photo" data-caption="A shiny piece of anthracite, the best quality coal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Most of the coal of India is bituminous, not anthracite, because anthracite is found only in a small part of Jammu and Kashmir.</div>
      <div class="cp-note exam">Remember lignite with Neyveli, bituminous with Gondwana and anthracite with Reasi.</div>
    `
  },
  9: {
    questext: "Consider the following pairs of coal type and fact:\n1. Lignite coal : Neyveli region of Tamil Nadu\n2. Anthracite coal : Reasi region of Jammu and Kashmir\n3. Bituminous coal : About 20 percent of the coal reserves of India\nWhich of the pairs given above is/are correctly matched?",
    options: ["2 and 3 only", "1 and 2 only", "1 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Bituminous is the bulk of the reserves. ❌ Pair 3 is wrong because bituminous coal makes up about 80 percent of the coal reserves of India."
  },
  10: {
    questext: "The coal of the Gondwana period found in India belongs to which one of the following types?",
    options: ["Bituminous coal", "Anthracite coal", "Lignite coal", "Peat coal"],
    correct: "1",
    exptext: "✅ The coal of the Gondwana period is bituminous. 📌 Gondwana goes with bituminous. ❌ Lignite is tempting because it is brown coal, but it is a younger and weaker coal."
  },
  11: {
    type: "concept", icon: "⛏️", accent: "#8b5cf6", pauseTimer: true,
    title: "Damodar River Valley and Son River Valley Coal",
    html: `
      <p class="cp-lead">A coal region is named after the river valley in which the coalfields lie. <u>The Damodar Valley is the main one, and Jharia in Jharkhand is the largest coal mining area of India.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/8.png" alt="Jharia coalfield open mine Jharkhand photo" data-caption="The Jharia coalfield in Jharkhand, the largest coal mining area of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Valley</th><th>States</th><th>Main coal centres</th></tr></thead><tbody><tr><td>Damodar River Valley</td><td>Jharkhand and West Bengal</td><td>Jharkhand: Chandrapura, Jharia, Bokaro, Giridih, Karanpura and Ramgarh; West Bengal: Raniganj</td></tr><tr><td>Son River Valley</td><td>Madhya Pradesh and Uttar Pradesh</td><td>Madhya Pradesh: Singrauli, Sohagpur and Umaria</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/9.png" alt="Two panels: left panel Damodar Valley listing Jharia, Bokaro, Giridih, Raniganj; right pan" data-caption="Two coal valleys and some of their main coal centres." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that mentions Raniganj is asking for West Bengal, while one that mentions Jharia is asking for Jharkhand.</div>
      <div class="cp-note trap">Raniganj is in West Bengal, not in Jharkhand, even though it lies in the same Damodar Valley.</div>
      <div class="cp-note exam">Jharia is the largest coal mining area of India.</div>
    `
  },
  12: {
    questext: "Jharia, the largest coal mining area of India, is located in which one of the following states?",
    options: ["West Bengal", "Odisha", "Jharkhand", "Chhattisgarh"],
    correct: "3",
    exptext: "✅ Jharia is in Jharkhand in the Damodar Valley. 📌 Jharia goes with Jharkhand. ❌ West Bengal is tempting because Raniganj is also a Damodar coalfield, but Jharia is in Jharkhand."
  },
  13: {
    questext: "Consider the following pairs of coal centre and state:\n1. Raniganj : West Bengal\n2. Sohagpur : Madhya Pradesh\n3. Giridih : Odisha\nWhich of the pairs given above is/are correctly matched?",
    options: ["2 and 3 only", "1 and 3 only", "1, 2 and 3", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Giridih is a Jharkhand centre of the Damodar Valley. ❌ Pair 3 is wrong because Giridih lies in Jharkhand, not Odisha."
  },
  14: {
    type: "concept", icon: "🌄", accent: "#14b8a6", pauseTimer: true,
    title: "Mahanadi Valley and Godavari Valley Coal",
    html: `
      <p class="cp-lead">The Mahanadi Valley coalfields lie in Chhattisgarh and Odisha, and the Godavari Valley coalfields lie mostly in Telangana. <u>Both regions are important because they add large amounts of coal to the country.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/10.png" alt="Korba coal mine Chhattisgarh photo" data-caption="A large open coal mine at Korba in the Mahanadi Valley of Chhattisgarh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Valley</th><th>State</th><th>Main coal centres</th></tr></thead><tbody><tr><td>Mahanadi Valley</td><td>Chhattisgarh</td><td>Korba, Vishrampur and Chirimiri</td></tr><tr><td>Mahanadi Valley</td><td>Odisha</td><td>Talcher, Sundargarh and Sambalpur</td></tr><tr><td>Godavari Valley</td><td>Telangana</td><td>Singareni, Warangal, Khammam and Karimnagar</td></tr></tbody></table>
      <p class="cp-lead">Among the states, the order of the highest coal reserves is Jharkhand, Odisha and Chhattisgarh. Chhattisgarh, Jharkhand and Odisha are the three leading producers of coal.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/11.png" alt="Three stacked bars for coal reserves in order: Jharkhand, Odisha, Chhattisgarh, with Jhark" data-caption="The three states with the highest coal reserves, shown from largest to smallest." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that mentions Singareni is pointing to the Godavari Valley and the state of Telangana.</div>
      <div class="cp-note trap">Reserves and production are different. The order of reserves is Jharkhand, Odisha and Chhattisgarh.</div>
      <div class="cp-note exam">Remember Korba with Chhattisgarh, Talcher with Odisha and Singareni with Telangana.</div>
    `
  },
  15: {
    questext: "The Singareni coalfield belongs to which one of the following river valleys?",
    options: ["Mahanadi Valley", "Godavari Valley", "Son Valley", "Damodar Valley"],
    correct: "2",
    exptext: "✅ Singareni is in the Godavari Valley in Telangana. 📌 Singareni goes with Godavari. ❌ Damodar is tempting because it is the best known coal valley, but Singareni is in Telangana."
  },
  16: {
    questext: "Consider the following statements about the coal valleys of India:\n1. Korba, Vishrampur and Chirimiri are coal centres of Chhattisgarh.\n2. Talcher, Sundargarh and Sambalpur are coal centres of Odisha.\n3. The Godavari Valley coalfields are spread mostly in Odisha.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Mahanadi covers Chhattisgarh and Odisha. ❌ Statement 3 is wrong because the Godavari Valley coal is spread mostly in Telangana."
  },
  17: {
    questext: "Which one of the following gives the states in the correct order of highest coal reserves in India?",
    options: ["Jharkhand, Odisha, Chhattisgarh", "Odisha, Jharkhand, Chhattisgarh", "Chhattisgarh, Jharkhand, Odisha", "Jharkhand, Chhattisgarh, Odisha"],
    correct: "1",
    exptext: "✅ The order of reserves is Jharkhand, Odisha and Chhattisgarh. 📌 J, O and C. ❌ Option 3 is the order that is often given for production, not for reserves."
  },
  18: {
    type: "concept", icon: "🛢️", accent: "#ec4899", pauseTimer: true,
    title: "Mineral Oil and Natural Gas",
    html: `
      <p class="cp-lead">Mineral oil, also called petroleum, and natural gas are fuels found under the ground and under the sea. <u>The first mineral oil well in India was dug in the Makum area of Upper Assam in 1867, and the Digboi well was dug in 1889.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/12.png" alt="oil pumpjack Assam oil field photo" data-caption="An oil pump at work in an oil field of Assam, where oil was first found in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>First oil well in India</td><td>Makum area of Upper Assam, 1867</td></tr><tr><td>Digboi oil well</td><td>1889</td></tr><tr><td>States that store petroleum</td><td>Rajasthan, Gujarat and Assam</td></tr><tr><td>Order of petroleum storage</td><td>Rajasthan first, Gujarat second, Assam third</td></tr></tbody></table>
      <p class="cp-lead">Assam, Gujarat and Rajasthan are the three states that are linked with petroleum storage, and the order among them is Rajasthan, Gujarat and Assam.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/13.png" alt="A vertical ranking card: first Rajasthan, second Gujarat, third Assam, under the title Sta" data-caption="The three states of India that store petroleum, in order from first to third." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks for the oldest oil area of India is pointing to Assam, where the first well was dug at Makum.</div>
      <div class="cp-note trap">The first oil well came in 1867 at Makum, and the Digboi well came later in 1889. Do not swap the two years.</div>
      <div class="cp-note exam">Remember 1867 for Makum and 1889 for Digboi.</div>
    `
  },
  19: {
    questext: "The first mineral oil well in India was dug in the Makum area of Upper Assam in which one of the following years?",
    options: ["1889", "1901", "1954", "1867"],
    correct: "4",
    exptext: "✅ The first oil well at Makum was dug in 1867. 📌 Makum is 1867 and Digboi is 1889. ❌ The year 1889 is tempting because it belongs to the Digboi well, which came later."
  },
  20: {
    questext: "Consider the following statements about mineral oil in India:\n1. The first mineral oil well was dug in the Makum area of Upper Assam in 1867.\n2. The Digboi oil well was dug in 1889.\n3. Assam is first among the states that store petroleum.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Rajasthan is first, Gujarat is second and Assam is third. ❌ Statement 3 is wrong because Assam is only third in petroleum storage."
  },
  21: {
    type: "concept", icon: "🏭", accent: "#3b82f6", pauseTimer: true,
    title: "Oil Refinery in India",
    html: `
      <p class="cp-lead">An oil refinery cleans crude oil and turns it into petrol, diesel and other fuels. <u>The first refinery of India was set up at Digboi in Assam in 1901.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/14.png" alt="Digboi oil refinery Assam old photo" data-caption="The old oil refinery at Digboi in Assam, the oldest refinery of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Refinery</th><th>State</th><th>Year</th></tr></thead><tbody><tr><td>Digboi</td><td>Assam</td><td>1901</td></tr><tr><td>Mumbai</td><td>Maharashtra</td><td>1954</td></tr></tbody></table>
      <p class="cp-lead">The first oil refinery of independent India was set up in Mumbai in the year 1954.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/15.png" alt="Horizontal timeline with three markers: 1867 first oil well at Makum, 1901 Digboi refinery" data-caption="A timeline from the first oil well to the first refinery of independent India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks for the first refinery after independence wants Mumbai in Maharashtra and the year 1954.</div>
      <div class="cp-note trap">Digboi is the oldest refinery, but Mumbai is the first refinery of independent India.</div>
      <div class="cp-note exam">Remember Digboi with 1901 and Mumbai with 1954.</div>
    `
  },
  22: {
    questext: "Which one of the following was the first oil refinery of independent India?",
    options: ["Digboi", "Mumbai", "Barauni", "Koyali"],
    correct: "2",
    exptext: "✅ The first refinery of independent India was set up in Mumbai in 1954. 📌 Mumbai is the first after 1947. ❌ Digboi is tempting because it is older, but it was set up in 1901 before independence."
  },
  23: {
    questext: "Consider the following statements about oil refineries in India:\n1. A refinery was set up at Digboi in Assam in 1901.\n2. The first refinery of independent India was set up in Mumbai in 1954.\n3. The first oil well of India was dug at Digboi in 1867.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Digboi 1901, Mumbai 1954. ❌ Statement 3 is wrong because the first well was dug at Makum in 1867, and the Digboi well came in 1889."
  },
  24: {
    type: "concept", icon: "📍", accent: "#f97316", pauseTimer: true,
    title: "Major Oil Fields and Natural Gas Fields",
    html: `
      <p class="cp-lead">Oil fields are the places where crude oil is taken out of the ground. <u>India has oil fields in the Brahmaputra Valley, Gujarat, Maharashtra, Rajasthan and the Kaveri and Krishna-Godavari basins.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/16.png" alt="Mumbai High offshore oil platform photo" data-caption="An offshore oil platform at Mumbai High, the great oil and gas field in the Arabian Sea." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Region</th><th>Oil fields</th></tr></thead><tbody><tr><td>Assam in the Brahmaputra Valley</td><td>Digboi, Naharkatiya and Surma Valley</td></tr><tr><td>Arunachal Pradesh in the Brahmaputra Valley</td><td>Nigru region</td></tr><tr><td>Gujarat</td><td>Ankleshwar, Khambhat, Kalol, Mehsana and Aliya Bet</td></tr><tr><td>Maharashtra</td><td>Mumbai High</td></tr><tr><td>Rajasthan</td><td>Barmer (Mangala, Aishwarya and Shakti), Jaisalmer and Bikaner</td></tr><tr><td>Other basins</td><td>Kaveri River basin and Krishna-Godavari River basin</td></tr></tbody></table>
      <p class="cp-lead">The main natural gas fields lie in Mumbai High, Gujarat, Assam, Andhra Pradesh and Tamil Nadu.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/17.png" alt="Five cards in a row for natural gas fields: Mumbai High, Gujarat, Assam, Andhra Pradesh, T" data-caption="The five main natural gas field regions of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that mentions Ankleshwar or Kalol is pointing to Gujarat, and one that mentions Barmer is pointing to Rajasthan.</div>
      <div class="cp-note trap">Naharkatiya is an oil field of Assam, not of Gujarat, even though Gujarat has many oil fields.</div>
      <div class="cp-note exam">Match each oil field with its state: Ankleshwar with Gujarat and Barmer with Rajasthan.</div>
    `
  },
  25: {
    questext: "Consider the following pairs of oil field and state:\n1. Ankleshwar : Gujarat\n2. Naharkatiya : Assam\n3. Barmer : Maharashtra\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 and 3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Barmer goes with Rajasthan, and Mumbai High goes with Maharashtra. ❌ Pair 3 is wrong because Barmer is an oil field of Rajasthan."
  },
  26: {
    questext: "Which one of the following is NOT an oil field of Gujarat?",
    options: ["Ankleshwar", "Kalol", "Mehsana", "Naharkatiya"],
    correct: "4",
    exptext: "✅ Naharkatiya is an oil field of Assam. 📌 Naharkatiya goes with Assam and Digboi. ❌ Ankleshwar, Kalol and Mehsana are all oil fields of Gujarat."
  },
  27: {
    type: "concept", icon: "⚛️", accent: "#84cc16", pauseTimer: true,
    title: "Nuclear Energy",
    html: `
      <p class="cp-lead">Nuclear energy is the energy that comes from nuclear minerals such as uranium, thorium, beryllium, zirconium and lithium. <u>Homi Jahangir Bhabha is called the father of nuclear power in India.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/18.png" alt="Homi Jahangir Bhabha portrait photo" data-caption="Homi Jahangir Bhabha, the scientist called the father of nuclear power in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Atomic Energy Commission set up</td><td>1948, under Homi Jahangir Bhabha</td></tr><tr><td>Department of Atomic Energy set up</td><td>1954</td></tr><tr><td>Mineral with better prospects</td><td>Thorium</td></tr><tr><td>Where thorium is found</td><td>Monazite sand of Kerala and Banswara in Rajasthan</td></tr></tbody></table>
      <p class="cp-lead">Thorium has better prospects in India because the monazite sand of the Kerala coast holds a large amount of it.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/19.png" alt="Horizontal timeline with two markers: 1948 Atomic Energy Commission, 1954 Department of At" data-caption="The two early steps of nuclear energy in India placed in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks for the year of the Atomic Energy Commission wants 1948, and the Department of Atomic Energy came six years later, in 1954.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/20.png" alt="monazite sand Kerala beach black sand photo" data-caption="Dark monazite sand on a beach in Kerala, the main source of thorium in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Atomic Energy Commission came in 1948 and the Department of Atomic Energy in 1954. Do not swap the two years.</div>
      <div class="cp-note exam">Remember Bhabha, 1948 and 1954, and thorium with Kerala.</div>
    `
  },
  28: {
    questext: "In which one of the following years was the Department of Atomic Energy established in India?",
    options: ["1948", "1956", "1954", "1969"],
    correct: "3",
    exptext: "✅ The Department of Atomic Energy was set up in 1954. 📌 The Commission came in 1948 and the Department in 1954. ❌ The year 1948 is tempting because it belongs to the Atomic Energy Commission."
  },
  29: {
    questext: "Consider the following statements about nuclear energy in India:\n1. The Atomic Energy Commission was set up in 1948 under Homi Jahangir Bhabha.\n2. The Department of Atomic Energy was set up in 1954.\n3. Thorium has poor prospects in India.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1, 2 and 3", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Thorium is found in the monazite sand of Kerala. ❌ Statement 3 is wrong because thorium has better prospects in India."
  },
  30: {
    type: "concept", icon: "🧪", accent: "#06b6d4", pauseTimer: true,
    title: "Major Uranium Fields in India and Uranium",
    html: `
      <p class="cp-lead">Uranium is the main fuel of a nuclear power plant. <u>It is found in Jharkhand, Meghalaya, Rajasthan and Uttar Pradesh, and the Jaduguda area of Jharkhand is famous for producing it.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/21.png" alt="Jaduguda uranium mine Jharkhand photo" data-caption="The uranium mining area of Jaduguda in the Singhbhum district of Jharkhand." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>State</th><th>Uranium fields</th></tr></thead><tbody><tr><td>Jharkhand</td><td>Singhbhum district: Jaduguda, Bhatin, Narwapahar and Turamdih</td></tr><tr><td>Meghalaya</td><td>Domiasiat</td></tr><tr><td>Rajasthan</td><td>Rohil-Ghateshwar in Sikar district, Udaipur, Alwar, Jhunjhunu, Bhilwara and Bundi</td></tr><tr><td>Uttar Pradesh</td><td>Lalitpur</td></tr></tbody></table>
      <p class="cp-lead">The main ores of uranium are pitchblende, thorianite and samarskite.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/22.png" alt="Four state boxes with uranium places: Jharkhand with Jaduguda, Meghalaya with Domiasiat, R" data-caption="The four states with uranium fields and a famous place in each one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks for the uranium field of Meghalaya wants Domiasiat.</div>
      <div class="cp-note trap">Lalitpur is in Uttar Pradesh, not in Rajasthan, even though Rajasthan has many other uranium places.</div>
      <div class="cp-note exam">Jaduguda goes with Jharkhand and Domiasiat goes with Meghalaya.</div>
    `
  },
  31: {
    questext: "Consider the following pairs of uranium field and state:\n1. Domiasiat : Meghalaya\n2. Jaduguda in Singhbhum : Jharkhand\n3. Lalitpur : Rajasthan\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Lalitpur is in Uttar Pradesh. ❌ Pair 3 is wrong because Lalitpur lies in Uttar Pradesh."
  },
  32: {
    questext: "Which one of the following is NOT a major ore of uranium?",
    options: ["Pitchblende", "Bauxite", "Thorianite", "Samarskite"],
    correct: "2",
    exptext: "✅ Bauxite is the ore of aluminium. 📌 Uranium ores are pitchblende, thorianite and samarskite. ❌ Pitchblende, thorianite and samarskite are all uranium ores."
  },
  33: {
    type: "concept", icon: "🏭", accent: "#a855f7", pauseTimer: true,
    title: "Nuclear Power Stations",
    html: `
      <p class="cp-lead">A nuclear power station makes electricity from the heat of nuclear fuel. <u>India has stations in Maharashtra, Tamil Nadu, Rajasthan, Uttar Pradesh, Karnataka and Gujarat.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/23.png" alt="Kudankulam nuclear power plant Tamil Nadu photo" data-caption="The Kudankulam nuclear power plant in Tamil Nadu, built with the help of Russia." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Station</th><th>State</th><th>Fact</th></tr></thead><tbody><tr><td>Tarapur</td><td>Maharashtra</td><td>Built with the help of the United States</td></tr><tr><td>Kudankulam</td><td>Tamil Nadu</td><td>Built with the help of Russia</td></tr><tr><td>Rawatbhata</td><td>Rajasthan</td><td>Built with the help of Canada</td></tr><tr><td>Narora</td><td>Uttar Pradesh</td><td>Power station</td></tr><tr><td>Kaiga</td><td>Karnataka</td><td>Power station</td></tr><tr><td>Kakrapar</td><td>Gujarat</td><td>Power station</td></tr><tr><td>Kalpakkam</td><td>Tamil Nadu</td><td>Power station</td></tr><tr><td>Jaitapur</td><td>Maharashtra</td><td>Planned power station</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/24.png" alt="Three country flags in a row each joined to a station: United States to Tarapur, Russia to" data-caption="Three nuclear power stations and the foreign country that helped to build each one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">Think T for Tarapur and the United States, K for Kudankulam and Russia, and R for Rawatbhata and Canada.</div>
      <div class="cp-example"><b>Example:</b> A question that mentions help from Canada is pointing to the Rawatbhata station in Rajasthan.</div>
      <div class="cp-note trap">Tamil Nadu has two stations, Kudankulam and Kalpakkam, so do not give Kalpakkam to Karnataka, which has Kaiga.</div>
      <div class="cp-note exam">Match each foreign helper with its station: the United States with Tarapur, Russia with Kudankulam and Canada with Rawatbhata.</div>
    `
  },
  34: {
    questext: "Consider the following pairs of nuclear power station and state:\n1. Tarapur : Maharashtra\n2. Kakrapar : Gujarat\n3. Kaiga : Gujarat\nWhich of the pairs given above is/are correctly matched?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Kaiga is in Karnataka. ❌ Pair 3 is wrong because Kaiga stands in Karnataka, not in Gujarat."
  },
  35: {
    questext: "The Rawatbhata nuclear power station in Rajasthan was built with the help of which one of the following countries?",
    options: ["Canada", "Russia", "United States", "France"],
    correct: "1",
    exptext: "✅ Rawatbhata was built with the help of Canada. 📌 R with Canada, T with the United States, K with Russia. ❌ Russia is tempting because it helped at Kudankulam, which is in Tamil Nadu."
  },
  36: {
    type: "concept", icon: "🌋", accent: "#e11d48", pauseTimer: true,
    title: "Geothermal Energy Sector in India",
    html: `
      <p class="cp-lead">Geothermal energy is the heat that comes from deep inside the earth, and hot springs bring it to the surface. <u>India has geothermal fields in Ladakh, Chhattisgarh and Odisha.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/25.png" alt="Puga Valley hot springs Ladakh steam photo" data-caption="Steam rising from the hot springs of the Puga Valley in Ladakh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Place</th><th>State or region</th></tr></thead><tbody><tr><td>Puga Valley</td><td>Ladakh</td></tr><tr><td>Tatapani in Balrampur</td><td>Chhattisgarh</td></tr><tr><td>Taptapani</td><td>Odisha</td></tr></tbody></table>
      <p class="cp-lead">Hot springs are the signs that heat from the earth is close to the surface, and that is why these three places are named for geothermal energy.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/26.png" alt="Three place cards in a row: Puga Valley in Ladakh, Tatapani in Chhattisgarh, Taptapani in " data-caption="Three geothermal places of India and the region of each one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question about the geothermal field in the high mountains of Ladakh is pointing to the Puga Valley.</div>
      <div class="cp-note trap">Tatapani is in Chhattisgarh and Taptapani is in Odisha, and the two names look very alike.</div>
      <div class="cp-note exam">Remember Puga with Ladakh.</div>
    `
  },
  37: {
    questext: "The Puga Valley geothermal field is located in which one of the following?",
    options: ["Himachal Pradesh", "Odisha", "Chhattisgarh", "Ladakh"],
    correct: "4",
    exptext: "✅ The Puga Valley is in Ladakh. 📌 Puga goes with Ladakh. ❌ Himachal Pradesh is tempting because it also has hot springs, but the Puga Valley is in Ladakh."
  },
  38: {
    questext: "Consider the following pairs of geothermal place and state:\n1. Tatapani : Chhattisgarh\n2. Taptapani : Odisha\n3. Puga Valley : Himachal Pradesh\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 and 3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 The names Tatapani and Taptapani look alike, but the states are different. ❌ Pair 3 is wrong because the Puga Valley is in Ladakh."
  },
  39: {
    type: "concept", icon: "🌬️", accent: "#10b981", pauseTimer: true,
    title: "Wind Energy",
    html: `
      <p class="cp-lead">Wind energy is electricity made by wind turbines that are turned by moving air. <u>India is the fourth largest wind energy producing country in the world, after China, America and Germany.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/27.png" alt="wind turbines Kutch Gujarat photo" data-caption="Tall wind turbines in a row, turning in the wind of Gujarat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Rank of India in the world</td><td>Fourth, after China, America and Germany</td></tr><tr><td>Wind research institute</td><td>National Institute of Wind Energy, Chennai</td></tr><tr><td>Big project</td><td>1,100 megawatt wind power project in the Kutch region of Gujarat</td></tr><tr><td>Leading wind states</td><td>Tamil Nadu, Maharashtra, Gujarat, Rajasthan and Karnataka</td></tr></tbody></table>
      <p class="cp-lead">The 1,100 megawatt Kutch project was described as the largest wind power project of Asia.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/28.png" alt="Four cards: World rank fourth after China, America and Germany; Institute at Chennai; Kutc" data-caption="Four wind energy facts of India shown as cards." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks where the National Institute of Wind Energy stands wants Chennai.</div>
      <div class="cp-note trap">India is fourth in the world in wind energy, not first, because China, America and Germany are ahead.</div>
      <div class="cp-note exam">Remember Chennai for the wind institute and Kutch for the big project.</div>
    `
  },
  40: {
    questext: "The National Institute of Wind Energy is located in which one of the following cities?",
    options: ["Mumbai", "Hyderabad", "Chennai", "Bengaluru"],
    correct: "3",
    exptext: "✅ The National Institute of Wind Energy is in Chennai. 📌 Wind and Chennai go together. ❌ Mumbai is tempting because it is a big coastal city, but the institute is in Chennai."
  },
  41: {
    questext: "Consider the following statements about wind energy in India:\n1. India is the fourth largest wind energy producing country in the world.\n2. The National Institute of Wind Energy is located in Chennai.\n3. India is the largest wind energy producer in the world.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 China, America and Germany come before India. ❌ Statement 3 is wrong because India is fourth, not first."
  },
  42: {
    type: "concept", icon: "💦", accent: "#eab308", pauseTimer: true,
    title: "Hydroelectric Energy",
    html: `
      <p class="cp-lead">Hydroelectric energy is electricity made from falling water, usually at a dam. <u>It gives 13.5 percent of the installed capacity of India, which is more than natural gas, nuclear energy and oil.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/29.png" alt="hydroelectric power house turbines dam photo" data-caption="Water falling from a dam to turn the turbines of a hydroelectric power house." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Source</th><th>Share of installed capacity</th></tr></thead><tbody><tr><td>Renewable energy</td><td>17.6 percent</td></tr><tr><td>Hydroelectricity</td><td>13.5 percent</td></tr><tr><td>Natural gas</td><td>7.6 percent</td></tr><tr><td>Nuclear energy</td><td>2.1 percent</td></tr></tbody></table>
      <p class="cp-lead">Dams of the multipurpose projects, such as Bhakra, Tehri and Hirakud, make electricity from the water they store.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/30.png" alt="A dam with water falling onto a turbine, a power line leaving it, and the label Hydroelect" data-caption="How falling water at a dam is turned into electricity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Water stored behind the Bhakra Dam falls through pipes, turns a turbine and makes electricity for towns far away.</div>
      <div class="cp-note trap">Hydroelectricity is third in size, below coal and renewable energy, so do not put it second.</div>
      <div class="cp-note exam">Remember 13.5 percent for hydroelectricity.</div>
    `
  },
  43: {
    questext: "Consider the following statements about hydroelectricity in India:\n1. It gives 13.5 percent of the installed capacity.\n2. Its share is larger than that of renewable energy.\n3. Its share is larger than that of natural gas.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1, 2 and 3", "1 and 3 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 3 are correct, because 13.5 percent is more than the 7.6 percent of natural gas. 📌 Order: coal, renewable, hydro. ❌ Statement 2 is wrong because renewable energy has 17.6 percent."
  },
  44: {
    type: "concept", icon: "🌿", accent: "#64748b", pauseTimer: true,
    title: "Biomass or Bio-Energy",
    html: `
      <p class="cp-lead">Bio-energy is the energy we get from organic things such as crop waste, plants and garbage. <u>Paddy husk, sugarcane bagasse, crop residues, plants like Jatropha, urban garbage and other waste are the main sources.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/31.png" alt="biogas plant green domes farm photo" data-caption="A biogas plant with green domes beside a field, making energy from farm waste." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Plant used for biodiesel</td><td>Jatropha, also called Ratanjot</td></tr><tr><td>Biodiesel plant</td><td>Kakinada, Andhra Pradesh</td></tr><tr><td>Second generation bio-energy plant</td><td>Bhatinda, Punjab</td></tr><tr><td>Leading states</td><td>Maharashtra, Uttar Pradesh, Karnataka, Tamil Nadu and Andhra Pradesh</td></tr></tbody></table>
      <p class="cp-lead">Bagasse is the dry waste left after sugarcane juice is taken out, and it can be burned to make power.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/32.png" alt="Four input pictures joined to one box: paddy husk, sugarcane bagasse, Jatropha seeds, urba" data-caption="Four kinds of waste and plants that are used to make bio-energy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A sugar mill can burn the bagasse left from sugarcane to make electricity for its own use.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Energy_Resources/33.png" alt="Jatropha plant seeds biodiesel photo" data-caption="Green fruits of the Jatropha plant, called Ratanjot, whose seeds are used to make biodiesel." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Jatropha biodiesel plant is at Kakinada in Andhra Pradesh, while the second generation bio-energy plant is at Bhatinda in Punjab.</div>
      <div class="cp-note exam">Remember Jatropha with Ratanjot and Kakinada.</div>
    `
  },
  45: {
    questext: "The biodiesel plant that uses Jatropha, also called Ratanjot, has been set up at which one of the following places?",
    options: ["Bhatinda", "Kakinada", "Chennai", "Kutch"],
    correct: "2",
    exptext: "✅ The Jatropha biodiesel plant is at Kakinada in Andhra Pradesh. 📌 Jatropha goes with Kakinada. ❌ Bhatinda is tempting because it also has a bio-energy plant, but it is a second generation one."
  },
  46: {
    questext: "Consider the following statements about bio-energy in India:\n1. Crop residues like paddy husk and sugarcane bagasse are sources of bio-energy.\n2. Jatropha is also called Ratanjot.\n3. The Jatropha biodiesel plant has been set up at Bhatinda.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Kakinada has the Jatropha plant. ❌ Statement 3 is wrong because the Jatropha biodiesel plant is at Kakinada."
  },
  47: {
    questext: "The second generation bio-energy plant of India has been set up at Bhatinda in which one of the following states?",
    options: ["Punjab", "Haryana", "Rajasthan", "Gujarat"],
    correct: "1",
    exptext: "✅ Bhatinda is in Punjab. 📌 Bhatinda goes with Punjab. ❌ Haryana is tempting because it is a neighbour of Punjab, but Bhatinda is in Punjab."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Energy_Resources/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a glowing lump of black coal, a golden oil drop, a tall white wind turbine and an elegant atom symbol" },
  "images/General_Awareness/Geography/Energy_Resources/1.png": { t: "fig", about: "Six horizontal bars of different length: Coal 58.9 percent, Renewable energy 17.6 percent, Hydroelectricity 13.5 percent, Natural gas 7.6 percent, Nuclear energy 2.1 percent, Oil 0.3 percent." },
  "images/General_Awareness/Geography/Energy_Resources/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"coal fired thermal power plant chimneys India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/2.png. a coal power plant",
  "images/General_Awareness/Geography/Energy_Resources/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"black coal lumps close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/3.png. lumps of black coal",
  "images/General_Awareness/Geography/Energy_Resources/4.png": { t: "fig", about: "A four step staircase going up: Peat at the bottom, then Lignite, then Bituminous, then Anthracite at the top, with the label quality rises." },
  "images/General_Awareness/Geography/Energy_Resources/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"brown coal lignite lump photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/5.png. brown coal",
  "images/General_Awareness/Geography/Energy_Resources/6.png": { t: "fig", about: "Four stacked boxes with carbon amounts: Peat 40 percent, Lignite 40 to 55 percent, Bituminous 50 to 80 percent, Anthracite 80 to 95 percent." },
  "images/General_Awareness/Geography/Energy_Resources/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"anthracite coal shiny black piece photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/7.png. a shiny anthracite piece",
  "images/General_Awareness/Geography/Energy_Resources/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jharia coalfield open mine Jharkhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/8.png. a large coal mining area",
  "images/General_Awareness/Geography/Energy_Resources/9.png": { t: "fig", about: "Two panels: left panel Damodar Valley listing Jharia, Bokaro, Giridih, Raniganj; right panel Son Valley listing Singrauli, Sohagpur, Umaria." },
  "images/General_Awareness/Geography/Energy_Resources/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Korba coal mine Chhattisgarh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/10.png. a large open coal mine",
  "images/General_Awareness/Geography/Energy_Resources/11.png": { t: "fig", about: "Three stacked bars for coal reserves in order: Jharkhand, Odisha, Chhattisgarh, with Jharkhand the longest." },
  "images/General_Awareness/Geography/Energy_Resources/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"oil pumpjack Assam oil field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/12.png. an oil pump at work",
  "images/General_Awareness/Geography/Energy_Resources/13.png": { t: "fig", about: "A vertical ranking card: first Rajasthan, second Gujarat, third Assam, under the title States that store petroleum." },
  "images/General_Awareness/Geography/Energy_Resources/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Digboi oil refinery Assam old photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/14.png. the old refinery at Digboi",
  "images/General_Awareness/Geography/Energy_Resources/15.png": { t: "fig", about: "Horizontal timeline with three markers: 1867 first oil well at Makum, 1901 Digboi refinery in Assam, 1954 Mumbai refinery in Maharashtra." },
  "images/General_Awareness/Geography/Energy_Resources/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mumbai High offshore oil platform photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/16.png. an oil platform in the sea",
  "images/General_Awareness/Geography/Energy_Resources/17.png": { t: "fig", about: "Five cards in a row for natural gas fields: Mumbai High, Gujarat, Assam, Andhra Pradesh, Tamil Nadu." },
  "images/General_Awareness/Geography/Energy_Resources/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Homi Jahangir Bhabha portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/18.png. the scientist who led nuclear work",
  "images/General_Awareness/Geography/Energy_Resources/19.png": { t: "fig", about: "Horizontal timeline with two markers: 1948 Atomic Energy Commission, 1954 Department of Atomic Energy, and a portrait label Homi Jahangir Bhabha." },
  "images/General_Awareness/Geography/Energy_Resources/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"monazite sand Kerala beach black sand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/20.png. dark monazite sand on a beach",
  "images/General_Awareness/Geography/Energy_Resources/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jaduguda uranium mine Jharkhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/21.png. the mine at Jaduguda",
  "images/General_Awareness/Geography/Energy_Resources/22.png": { t: "fig", about: "Four state boxes with uranium places: Jharkhand with Jaduguda, Meghalaya with Domiasiat, Rajasthan with Rohil-Ghateshwar, Uttar Pradesh with Lalitpur." },
  "images/General_Awareness/Geography/Energy_Resources/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kudankulam nuclear power plant Tamil Nadu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/23.png. the nuclear plant with domes",
  "images/General_Awareness/Geography/Energy_Resources/24.png": { t: "fig", about: "Three country flags in a row each joined to a station: United States to Tarapur, Russia to Kudankulam, Canada to Rawatbhata." },
  "images/General_Awareness/Geography/Energy_Resources/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Puga Valley hot springs Ladakh steam photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/25.png. steam rising from hot springs",
  "images/General_Awareness/Geography/Energy_Resources/26.png": { t: "fig", about: "Three place cards in a row: Puga Valley in Ladakh, Tatapani in Chhattisgarh, Taptapani in Odisha, each with a small hot spring sign." },
  "images/General_Awareness/Geography/Energy_Resources/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"wind turbines Kutch Gujarat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/27.png. tall wind turbines in a row",
  "images/General_Awareness/Geography/Energy_Resources/28.png": { t: "fig", about: "Four cards: World rank fourth after China, America and Germany; Institute at Chennai; Kutch project of 1,100 megawatts; Five leading states." },
  "images/General_Awareness/Geography/Energy_Resources/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hydroelectric power house turbines dam photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/29.png. water falling from a dam",
  "images/General_Awareness/Geography/Energy_Resources/30.png": { t: "fig", about: "A dam with water falling onto a turbine, a power line leaving it, and the label Hydroelectricity 13.5 percent." },
  "images/General_Awareness/Geography/Energy_Resources/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"biogas plant green domes farm photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/31.png. a biogas plant beside a field",
  "images/General_Awareness/Geography/Energy_Resources/32.png": { t: "fig", about: "Four input pictures joined to one box: paddy husk, sugarcane bagasse, Jatropha seeds, urban garbage, all pointing to Bio-energy." },
  "images/General_Awareness/Geography/Energy_Resources/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jatropha plant seeds biodiesel photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Energy_Resources/33.png. green Jatropha fruits"
});

/* CHANGE LOG
   - Wrote Digboi refinery as set up in 1901 and removed the words Independence Day, which do not fit that year.
   - Left out the unreliable year-wise ranking of states for natural gas, wind energy, hydroelectric energy and bio-energy, because these rankings change.
   - Production order of coal states is written without a fixed order because the order changes from year to year.
   - Wrote Narwapahar, Karimnagar, Singrauli, Samarskite and Homi Jahangir Bhabha in place of the spoilt spellings.
   - Left out the Borholla field under Nagaland and the Madhya Pradesh geothermal line, which were unclear.
   - Wrote the Puga Valley as being in Ladakh, and described the 1,100 megawatt Kutch wind project as a planned project.
   - Removed the metal of hope line for uranium and trimmed the list of nuclear minerals to well known ones.
   - Filled the blank line for the largest coalfield with Jharia.
*/
