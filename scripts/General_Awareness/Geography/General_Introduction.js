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

/* Field: General_Awareness · Subject: Geography · Chapter: Introduction_to_Geography · 9 concept pages (+ overview) · 35 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Geography/Introduction_to_Geography/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "INDIAN GEOGRAPHY",
      line2: "INTRODUCTION",
      line3: "EXTREME POINTS • BORDERS",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Indian Geography Introduction Full Class | Extreme Points, Borders, Straits | SSC CGL",
      altTitles: ["India's Size, Location and Neighbours Made Easy", "Indian Geography Introduction Important Facts for Competitive Exams"],
      description: "Every Indian Geography course starts with the general introduction, and the facts in it are asked again and again. In this fast-track class you learn them step by step.\n\n📌 IN THIS CLASS\n✅ Area, extent and extreme points of India\n✅ Standard meridian and the Tropic of Cancer\n✅ States, union territories and zones\n✅ Neighbouring countries, borders and straits\n✅ Practice questions in the SSC CGL style\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 General Introduction\n00:00 Size and Location\n00:00 Neighbouring Countries\n\n👍 Like, share and subscribe.\n\n#SSCCGL #IndianGeography #GeneralAwareness",
      tags: ["indian geography", "geography introduction", "india size and location", "extreme points of india", "indira point", "standard meridian of india", "tropic of cancer india", "states and union territories", "india border length", "palk strait", "ten degree channel", "geography for ssc cgl", "geography tricks", "general awareness", "ssc cgl geography", "geography mcq", "static gk", "india geography notes", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "Introdu"],
      hashtags: ["SSCCGL", "IndianGeography", "GeneralAwareness"],
      thumbText: "INDIAN GEOGRAPHY INTRO",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🌏 New class is live: Indian Geography Introduction, with extreme points, borders and straits. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 General Introduction\n00:00 Size and Geographical Location\n00:00 Standard Meridian and Tropic of Cancer\n00:00 States and Zones of India\n00:00 Borders and Coastline of States\n00:00 Neighboring Country\n00:00 Major Channels and Straits\n00:00 Foreign Ruled Areas\n00:00 Other Important Facts",
      playlist: "Competitive exams General Awareness — Geography"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the general introduction to Indian Geography</u>. We will learn where India lies, how big it is, who its neighbours are and which records it holds.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>9</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>35</b><span>Questions</span></div>
        <div class="cp-stat"><b>~53 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>General Introduction</b><br>The old names of India, such as Aryavarta and Hindustan, and who used them.</li>
        <li><b>Size and Geographical Location</b><br>The area of India, its length and width, its coastline and its four extreme points.</li>
        <li><b>Standard Meridian and Tropic of Cancer</b><br>The line used for Indian Standard Time and the eight states crossed by the Tropic of Cancer.</li>
        <li><b>States and Zones of India</b><br>The number of states and union territories, the six zones and the largest and smallest of each kind.</li>
        <li><b>Borders and Coastline of States</b><br>Which state touches the most states, which district touches four, and which states have a sea coast.</li>
        <li><b>Neighboring Country</b><br>The countries around India, the dividing lines and the length of each border.</li>
        <li><b>Major Channels and Straits</b><br>The narrow seas that separate India from its island neighbours.</li>
        <li><b>Foreign Ruled Areas Joined After Independence</b><br>The Portuguese and French areas that joined India, with their years.</li>
        <li><b>Other Important Facts Related to India</b><br>India's rank in area, its share of world population and the time difference between its two ends.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> extreme points, records of states, borders and straits are asked in almost every General Awareness paper, and the same facts also help in Indian Polity and Current Affairs.</div>
    `
  },
  2: {
    type: "concept", icon: "📛", accent: "#22c55e", pauseTimer: true,
    title: "General Introduction",
    html: `
      <p class="cp-lead">India was once the southern part of an ancient land called <b>Jambu dweep</b>. <u>Two old names of India are easy marks in exams: Aryavarta and Hindustan.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/1.png" alt="Old map of India Hindustan Mughal era map" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">India was the home of the Aryans, so it was named <b>Aryavarta</b>, which means the land of the Aryans. Persian and Arab historians of the medieval period called the country <b>Hind</b> or <b>Hindustan</b>.</p>
      <table><thead><tr><th>Name</th><th>Who used it</th></tr></thead><tbody><tr><td>Aryavarta</td><td>The ancient name, because India was the home of the Aryans</td></tr><tr><td>Hind or Hindustan</td><td>Persian and Arab historians of the medieval period</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/2.png" alt="Three name cards side by side: Jambu dweep (the ancient land), Aryavarta (home of the Arya" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> If a question mentions Persian and Arab writers, think of the name Hindustan. If it mentions the home of the Aryans, think of Aryavarta.</div>
      <div class="cp-note trap">Do not mix up the two names. Aryavarta is the older name, and Hind or Hindustan came from the medieval writers.</div>
      <div class="cp-note exam">Remember that India was the southern part of Jambu dweep.</div>
    `
  },
  3: {
    questext: "Which name was used for India by the Persian and Arab historians of the medieval period?",
    options: ["Aryavarta", "Jambu dweep", "Bharatvarsha", "Hind or Hindustan"],
    correct: "4",
    exptext: "✅ Persian and Arab historians called India Hind or Hindustan. 📌 Hindustan came with the medieval writers. ❌ Aryavarta is wrong because it is the older name, linked with the Aryans."
  },
  4: {
    questext: "India was the southern part of which ancient land?",
    options: ["Angaraland", "Gondwanaland", "Jambu dweep", "Pangea"],
    correct: "3",
    exptext: "✅ India was the southern part of Jambu dweep. 📌 Jambu dweep and Aryavarta are the old names to remember. ❌ Gondwanaland is tempting, but that name belongs to a very old landmass in geology."
  },
  5: {
    type: "concept", icon: "📏", accent: "#3b82f6", pauseTimer: true,
    title: "Size and Geographical Location",
    html: `
      <p class="cp-lead">Size and location are the base of Indian Geography. <u>Learn the numbers once and the extreme points with the places.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/3.png" alt="A schematic, not a map: a four-sided shape of India with a vertical arrow labelled 3,214 k" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The total area of India is about <b>32,87,263 square kilometres</b>, which is <b>2.4 percent</b> of the total area of the world. The shape of India is almost quadrangular, which means four-sided. India lies completely in the north-eastern hemisphere.</p>
      <table><thead><tr><th>Measure</th><th>Value</th></tr></thead><tbody><tr><td>Total area</td><td>32,87,263 square kilometres (2.4 percent of the world)</td></tr><tr><td>Maximum north-south extension</td><td>3,214 kilometres</td></tr><tr><td>Maximum east-west extension</td><td>2,933 kilometres</td></tr><tr><td>Coastline</td><td>About 7,517 kilometres</td></tr><tr><td>Latitude</td><td>8°4′ North to 37°6′ North</td></tr><tr><td>Longitude</td><td>68°7′ East to 97°25′ East</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/4.png" alt="Indira Point lighthouse Great Nicobar photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">India has four extreme points. The southernmost point is <b>Indira Point</b>, also called <b>Pygmalion Point</b>, on Great Nicobar Island, which lies away from the mainland. The northernmost point is <b>Indira Col</b>. The easternmost point is <b>Kibithu</b> in Arunachal Pradesh, and the westernmost point is <b>Guhar Moti</b> in the Kutch district of Gujarat.</p>
      <table><thead><tr><th>Direction</th><th>Point</th><th>Place</th></tr></thead><tbody><tr><td>South</td><td>Indira Point (Pygmalion Point)</td><td>Great Nicobar Island</td></tr><tr><td>North</td><td>Indira Col</td><td>Northern mountains</td></tr><tr><td>East</td><td>Kibithu</td><td>Arunachal Pradesh</td></tr><tr><td>West</td><td>Guhar Moti</td><td>Kutch district, Gujarat</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/5.png" alt="Kibithu Arunachal Pradesh easternmost village photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Indira Point and Indira Col both begin with Indira. Point is in the far south, and Col is in the far north.</div>
      <div class="cp-note exam">Remember the order S, N, E, W as Indira Point, Indira Col, Kibithu and Guhar Moti.</div>
    `
  },
  6: {
    questext: "Which of the following is the northernmost point of India?",
    options: ["Indira Point", "Indira Col", "Kibithu", "Guhar Moti"],
    correct: "2",
    exptext: "✅ Indira Col is the northernmost point of India. 📌 Col means a mountain pass, so think of the northern mountains. ❌ Indira Point is wrong because it is the southernmost point."
  },
  7: {
    questext: "The total area of India is about 32,87,263 square kilometres. What share of the world's total area is this?",
    options: ["2.4 percent", "4.2 percent", "17.5 percent", "7.5 percent"],
    correct: "1",
    exptext: "✅ India has 2.4 percent of the area of the world. 📌 Area 2.4 percent and population 17.5 percent are easy to confuse, so keep them apart. ❌ 17.5 percent is wrong because that is India's share of world population."
  },
  8: {
    questext: "Kibithu, the easternmost point of India, lies in which state?",
    options: ["Assam", "Nagaland", "Arunachal Pradesh", "Manipur"],
    correct: "3",
    exptext: "✅ Kibithu is in Arunachal Pradesh. 📌 East means the first rays of the sun, and Arunachal means the land of the dawn-lit mountains. ❌ Assam is tempting because it is also in the east, but it does not hold the extreme point."
  },
  9: {
    questext: "Which pair of point and direction is NOT correctly matched?",
    options: ["Indira Point and southernmost", "Indira Col and northernmost", "Kibithu and easternmost", "Guhar Moti and northernmost"],
    correct: "4",
    exptext: "✅ Guhar Moti in the Kutch district is the westernmost point, not the northernmost. 📌 Guhar Moti is in Gujarat, which is in the west. ❌ The other three pairs are correct."
  },
  10: {
    type: "concept", icon: "🧭", accent: "#84cc16", pauseTimer: true,
    title: "Standard Meridian and Tropic of Cancer",
    html: `
      <p class="cp-lead">Two imaginary lines run through India. <u>One line gives the time for the whole country, and the other marks the middle of the tropics.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/6.png" alt="Tropic of Cancer sign board India photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>82 degrees 30 minutes East</b> longitude is the standard meridian of India. It is used to find <b>Indian Standard Time</b>. It passes through <b>Mirzapur</b> in Uttar Pradesh. Some sources say it passes through Naini near Prayagraj, which was earlier called Allahabad.</p>
      <p class="cp-lead">The <b>Tropic of Cancer</b> is at 23 degrees 30 minutes North latitude. It passes through <b>eight states</b> of India. The Standard Time Line and the Tropic of Cancer cross each other in <b>Chhattisgarh</b>.</p>
      <table><thead><tr><th>Line</th><th>Value</th><th>Fact</th></tr></thead><tbody><tr><td>Standard meridian</td><td>82°30′ East</td><td>Used for Indian Standard Time; passes through Mirzapur in Uttar Pradesh</td></tr><tr><td>Tropic of Cancer</td><td>23°30′ North</td><td>Passes through Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura and Mizoram</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/7.png" alt="A schematic, not a map: a horizontal line from west to east with eight boxes in order: Guj" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">India is the only country after which an ocean has been named, the Indian Ocean. The Eastern Ghats and the Western Ghats meet in the Nilgiri hills.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/8.png" alt="Mirzapur Uttar Pradesh clock tower photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Rajasthan and Madhya Pradesh are on the Tropic of Cancer, but Maharashtra and Odisha are not.</div>
      <div class="cp-note exam">The Tropic of Cancer passes through eight states, and the Standard Time Line crosses it in Chhattisgarh.</div>
    `
  },
  11: {
    questext: "Consider the following statements:\n1. The standard meridian of India is 78 degrees 30 minutes East.\n2. The Tropic of Cancer passes through Chhattisgarh and Tripura.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. The standard meridian is 82 degrees 30 minutes East. 📌 Eighty-two and a half, passing through Mirzapur. ❌ Choosing both fails because of the wrong longitude."
  },
  12: {
    questext: "Through how many Indian states does the Tropic of Cancer pass?",
    options: ["6", "7", "8", "9"],
    correct: "3",
    exptext: "✅ The Tropic of Cancer passes through eight states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura and Mizoram. 📌 Learn them from west to east. ❌ Seven and nine are common wrong counts."
  },
  13: {
    questext: "In which state do the Standard Time Line and the Tropic of Cancer cross each other?",
    options: ["Madhya Pradesh", "Jharkhand", "Odisha", "Chhattisgarh"],
    correct: "4",
    exptext: "✅ The two lines cross in Chhattisgarh. 📌 Standard line and Tropic line meet at the centre of India. ❌ Madhya Pradesh is tempting because the Tropic passes through it, but the crossing is in Chhattisgarh."
  },
  14: {
    type: "concept", icon: "🗂️", accent: "#f59e0b", pauseTimer: true,
    title: "States and Zones of India",
    html: `
      <p class="cp-lead">India has <b>28 states</b> and <b>8 union territories</b>, and they are mainly divided into <b>six zones</b>. <u>Learn the zone table once, and then the records of largest and smallest.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/9.png" alt="A schematic, not a map: six coloured boxes labelled East Zone, West Zone, North Zone, Sout" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Zone</th><th>Included states and union territories</th></tr></thead><tbody><tr><td>East Zone</td><td>Bihar, Odisha, Jharkhand, West Bengal</td></tr><tr><td>West Zone</td><td>Rajasthan, Gujarat, Maharashtra, Goa, Dadra and Nagar Haveli and Daman and Diu</td></tr><tr><td>North Zone</td><td>Jammu and Kashmir, Ladakh, Himachal Pradesh, Punjab, Uttarakhand, Haryana, Uttar Pradesh, Delhi</td></tr><tr><td>South Zone</td><td>Andhra Pradesh, Karnataka, Kerala, Tamil Nadu, Telangana, Lakshadweep, Andaman and Nicobar Islands, Puducherry</td></tr><tr><td>Central Zone</td><td>Madhya Pradesh, Chhattisgarh</td></tr><tr><td>North-East Zone</td><td>Assam, Sikkim, Meghalaya, Tripura, Manipur, Mizoram, Nagaland, Arunachal Pradesh</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/10.png" alt="Ladakh Pangong Tso lake landscape photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Record</th><th>Largest</th><th>Smallest</th></tr></thead><tbody><tr><td>State by area</td><td>Rajasthan</td><td>Goa</td></tr><tr><td>Union territory by area</td><td>Ladakh</td><td>Lakshadweep</td></tr><tr><td>State by population</td><td>Uttar Pradesh</td><td>Sikkim</td></tr><tr><td>Union territory by population</td><td>Delhi</td><td>Lakshadweep</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/11.png" alt="A chart with four rows of largest and smallest: state by area (Rajasthan, Goa), union terr" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The largest union territory by area is Ladakh, but by population it is Delhi. Lakshadweep is the smallest union territory in both area and population.</div>
      <div class="cp-note exam">Rajasthan is the largest state by area and Goa is the smallest. Uttar Pradesh is the largest by population and Sikkim is the smallest.</div>
    `
  },
  15: {
    questext: "What are the largest state by area and the smallest state by area in India?",
    options: ["Madhya Pradesh and Goa", "Rajasthan and Sikkim", "Uttar Pradesh and Goa", "Rajasthan and Goa"],
    correct: "4",
    exptext: "✅ Rajasthan is the largest state by area and Goa is the smallest. 📌 R for Rajasthan means Royal and large, and G for Goa means Great but tiny. ❌ Rajasthan and Sikkim is wrong because Sikkim is the smallest by population, not by area."
  },
  16: {
    questext: "Which is the largest union territory of India by area?",
    options: ["Ladakh", "Andaman and Nicobar Islands", "Delhi", "Jammu and Kashmir"],
    correct: "1",
    exptext: "✅ Ladakh, which became a union territory in 2019, is the largest union territory by area. 📌 Ladakh is a wide land of high mountains. ❌ Delhi is tempting because it is the largest by population, not by area."
  },
  17: {
    questext: "Which pair gives the largest state and the smallest state of India by population?",
    options: ["Maharashtra and Sikkim", "Bihar and Mizoram", "Uttar Pradesh and Goa", "Uttar Pradesh and Sikkim"],
    correct: "4",
    exptext: "✅ Uttar Pradesh is the largest state by population and Sikkim is the smallest. 📌 Goa is smallest by area, but Sikkim is smallest by population. ❌ Uttar Pradesh and Goa is wrong because Goa is the smallest only by area."
  },
  18: {
    questext: "Consider the following statements:\n1. Delhi is the largest union territory of India by population.\n2. Lakshadweep is the smallest union territory by area and by population.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. Delhi has the largest population among union territories, and Lakshadweep is the smallest in both area and population. 📌 Delhi is big in people, Lakshadweep is small in everything. ❌ Choosing only one fails because both match the facts."
  },
  19: {
    questext: "Which of the following states belongs to the Central Zone?",
    options: ["Bihar", "Rajasthan", "Chhattisgarh", "Odisha"],
    correct: "3",
    exptext: "✅ The Central Zone has only two states: Madhya Pradesh and Chhattisgarh. 📌 Central means two states at the centre. ❌ Bihar and Odisha belong to the East Zone, and Rajasthan to the West Zone."
  },
  20: {
    questext: "How many states and union territories does India have at present?",
    options: ["29 and 7", "28 and 9", "27 and 8", "28 and 8"],
    correct: "4",
    exptext: "✅ India has 28 states and 8 union territories. 📌 Ladakh joined the union territories in 2019. ❌ 29 states and 7 union territories is an old count from before 2019."
  },
  21: {
    type: "concept", icon: "🌊", accent: "#14b8a6", pauseTimer: true,
    title: "Borders and Coastline of States",
    html: `
      <p class="cp-lead">Some states touch many neighbours, and some touch the sea. <u>Learn the names that hold a record.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/12.png" alt="A schematic, not a map: Uttar Pradesh in the centre with eight state boxes around it (Utta" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Uttar Pradesh</b> shares its border with the maximum number of states. It touches eight states and one union territory, which is Delhi. Its longest border is with Madhya Pradesh and its shortest border is with Himachal Pradesh.</p>
      <p class="cp-lead"><b>Sonbhadra</b> of Uttar Pradesh is the only district in the country that touches the border of four states, which are Chhattisgarh, Madhya Pradesh, Bihar and Jharkhand.</p>
      <table><thead><tr><th>Topic</th><th>Answer</th></tr></thead><tbody><tr><td>State touching the most states</td><td>Uttar Pradesh</td></tr><tr><td>Longest and shortest border of Uttar Pradesh</td><td>Madhya Pradesh and Himachal Pradesh</td></tr><tr><td>District touching four states</td><td>Sonbhadra (Uttar Pradesh)</td></tr><tr><td>States and union territories with a sea coast</td><td>9 states and 4 union territories</td></tr><tr><td>Longest sea coast</td><td>Gujarat</td></tr><tr><td>Shortest sea coast</td><td>Goa</td></tr><tr><td>Union territory spread across three states</td><td>Puducherry</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/13.png" alt="Gujarat coastline Dwarka beach photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The union territory of <b>Puducherry</b> is spread across three states because its parts lie inside Tamil Nadu, Kerala and Andhra Pradesh.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/14.png" alt="Goa beach coast aerial photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Gujarat has the longest coast, but Goa has the shortest. Do not swap the two.</div>
      <div class="cp-note exam">Sonbhadra is the only district touching four states, and Uttar Pradesh touches the most states.</div>
    `
  },
  22: {
    questext: "Which state of India shares its border with the maximum number of states?",
    options: ["Uttar Pradesh", "Madhya Pradesh", "Bihar", "Maharashtra"],
    correct: "1",
    exptext: "✅ Uttar Pradesh touches eight states and one union territory. 📌 Uttar Pradesh sits at the centre of the north. ❌ Madhya Pradesh is tempting, but it touches fewer states."
  },
  23: {
    questext: "Which district of Uttar Pradesh touches the borders of four states?",
    options: ["Mirzapur", "Varanasi", "Chandauli", "Sonbhadra"],
    correct: "4",
    exptext: "✅ Sonbhadra touches Chhattisgarh, Madhya Pradesh, Bihar and Jharkhand. 📌 Sonbhadra is the four-state district. ❌ Mirzapur is tempting because it is next to Sonbhadra, but it does not touch four states."
  },
  24: {
    questext: "Which states have the longest and the shortest sea coast in India?",
    options: ["Maharashtra and Goa", "Gujarat and Kerala", "Gujarat and Goa", "Andhra Pradesh and Goa"],
    correct: "3",
    exptext: "✅ Gujarat has the longest coast and Goa has the shortest. 📌 G and G: Gujarat is great, and Goa is a gem of a small coast. ❌ Andhra Pradesh is wrong because the longest coast is in Gujarat."
  },
  25: {
    questext: "Consider the following statements:\n1. Eight states and four union territories of India have a sea coast.\n2. Puducherry is a union territory spread across three states.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. Nine states and four union territories have a sea coast. 📌 Nine states, four union territories. ❌ Statement 1 is wrong because it gives eight states."
  },
  26: {
    type: "concept", icon: "🌍", accent: "#ef4444", pauseTimer: true,
    title: "Neighboring Country",
    html: `
      <p class="cp-lead">India has many neighbours by land and by sea. <u>Learn the subcontinent, the dividing lines and the length of each border.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/15.png" alt="Adam's Bridge Ram Setu aerial photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Pakistan, Nepal, Bhutan, Bangladesh and India are included in the Indian subcontinent. India is the largest country in South Asia in area and in population. India and Sri Lanka are connected by the <b>Palk Strait</b>, and <b>Adam's Bridge</b> lies between Tamil Nadu of India and Sri Lanka.</p>
      <table><thead><tr><th>Dividing line</th><th>Related border</th></tr></thead><tbody><tr><td>Radcliffe Line</td><td>India and Pakistan, and India and Bangladesh</td></tr><tr><td>McMahon Line</td><td>India and China</td></tr><tr><td>Durand Line</td><td>Afghanistan and Pakistan (it was the old border of British India with Afghanistan)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/16.png" alt="A chart of three dividing lines with their countries: Radcliffe Line with Pakistan and Ban" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Neighbouring country</th><th>Length of border (kilometres)</th><th>Number of Indian states and union territories</th></tr></thead><tbody><tr><td>Bangladesh</td><td>4,096.7</td><td>5</td></tr><tr><td>China</td><td>3,488</td><td>5</td></tr><tr><td>Pakistan</td><td>3,323</td><td>4</td></tr><tr><td>Nepal</td><td>1,751</td><td>5</td></tr><tr><td>Myanmar</td><td>1,643</td><td>4</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/17.png" alt="A bar chart of border lengths in kilometres in order from the longest: Bangladesh 4,096.7," style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Radcliffe Line is not the border with China. China's border is the McMahon Line.</div>
      <div class="cp-note exam">Bangladesh has the longest border with India, and Myanmar has the shortest among the five countries in the table.</div>
    `
  },
  27: {
    questext: "India and Sri Lanka are connected by which strait?",
    options: ["Great Channel", "Coco Strait", "Ten Degree Channel", "Palk Strait"],
    correct: "4",
    exptext: "✅ The Palk Strait connects India and Sri Lanka, and Adam's Bridge lies in it. 📌 Palk and Sri Lanka go together. ❌ Great Channel is wrong because it lies near the Nicobar Islands."
  },
  28: {
    questext: "The McMahon Line is the dividing line between India and which country?",
    options: ["Pakistan", "Bangladesh", "China", "Afghanistan"],
    correct: "3",
    exptext: "✅ The McMahon Line divides India and China. 📌 Mc for Mountains and China. ❌ Pakistan is wrong because the Radcliffe Line is its boundary with India."
  },
  29: {
    questext: "Which neighbouring country has the longest border with India?",
    options: ["Bangladesh", "China", "Pakistan", "Nepal"],
    correct: "1",
    exptext: "✅ Bangladesh has the longest border with India, about 4,096.7 kilometres. 📌 Bangladesh is longest, and Myanmar is shortest in the table. ❌ China is tempting because it is a big country, but its border is shorter."
  },
  30: {
    questext: "Consider the following statements:\n1. Adam's Bridge lies between Tamil Nadu and Sri Lanka.\n2. The Radcliffe Line is the boundary between India and China.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. The Radcliffe Line separates India from Pakistan and Bangladesh. 📌 Radcliffe, Pakistan and Bangladesh, partition. ❌ Statement 2 is wrong because the China border is the McMahon Line."
  },
  31: {
    type: "concept", icon: "🌀", accent: "#0ea5e9", pauseTimer: true,
    title: "Major Channels and Straits",
    html: `
      <p class="cp-lead">A channel or strait is a narrow water body between two lands. <u>The numbers in their names are the latitude lines on which they lie.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/18.png" alt="A schematic, not a map: a vertical ladder from north to south with Nine Degree Channel bet" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Channel or strait</th><th>Divided area</th></tr></thead><tbody><tr><td>8° Channel</td><td>Maldives and Minicoy (India)</td></tr><tr><td>9° Channel</td><td>Minicoy and Lakshadweep</td></tr><tr><td>6° Channel</td><td>Great Nicobar and Sumatra (Indonesia)</td></tr><tr><td>10° Channel</td><td>Little Andaman (Andaman) and Nicobar</td></tr><tr><td>Great Channel</td><td>Indira Point and Indonesia</td></tr><tr><td>Coco Strait</td><td>Andaman and the Coco Islands (Myanmar)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/19.png" alt="A schematic of the Andaman and Nicobar Islands from north to south: Coco Strait at the top" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Eight Degree and Nine Degree channels lie in the Arabian Sea, near Lakshadweep. The Ten Degree Channel, the Six Degree Channel, the Great Channel and the Coco Strait lie near the Andaman and Nicobar Islands in the Bay of Bengal.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/20.png" alt="Minicoy island lighthouse photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Eight Degree Channel separates India from the Maldives, while Great Channel separates Indira Point from Indonesia.</div>
      <div class="cp-note exam">Ten Degree Channel lies between Little Andaman and the Nicobar Islands.</div>
    `
  },
  32: {
    questext: "The 8 Degree Channel separates Minicoy of India from which country?",
    options: ["Maldives", "Sri Lanka", "Indonesia", "Myanmar"],
    correct: "1",
    exptext: "✅ The 8 Degree Channel separates Minicoy of India from the Maldives. 📌 Eight and Maldives, both in the Arabian Sea. ❌ Sri Lanka is tempting, but the Palk Strait is linked with it."
  },
  33: {
    questext: "The Great Channel separates Indira Point from which country?",
    options: ["Myanmar", "Sri Lanka", "Indonesia", "Thailand"],
    correct: "3",
    exptext: "✅ The Great Channel separates Indira Point of India from Indonesia. 📌 Great Channel, Great Nicobar and Indonesia go together. ❌ Myanmar is wrong because Myanmar is linked with the Coco Strait."
  },
  34: {
    questext: "Which channel lies between Little Andaman and the Nicobar Islands?",
    options: ["Eight Degree Channel", "Nine Degree Channel", "Six Degree Channel", "Ten Degree Channel"],
    correct: "4",
    exptext: "✅ The Ten Degree Channel lies between Little Andaman and the Nicobar Islands. 📌 Ten, and Andaman starts at the top. ❌ Eight and Nine Degree channels lie near Lakshadweep."
  },
  35: {
    questext: "Which pair of channel and divided area is NOT correctly matched?",
    options: ["Great Channel and Andaman and the Coco Islands", "Eight Degree Channel and Maldives and Minicoy", "Nine Degree Channel and Minicoy and Lakshadweep", "Six Degree Channel and Great Nicobar and Sumatra"],
    correct: "1",
    exptext: "✅ The Great Channel lies between Indira Point and Indonesia. It is the Coco Strait that lies between Andaman and the Coco Islands. 📌 Coco goes with Coco Islands. ❌ The other three pairs are correct."
  },
  36: {
    type: "concept", icon: "🏴", accent: "#8b5cf6", pauseTimer: true,
    title: "Foreign Ruled Areas Joined After Independence",
    html: `
      <p class="cp-lead">When India became free in 1947, Portugal and France still ruled some small areas. <u>These areas joined India later, and the years are asked often.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/21.png" alt="A timeline with three markers: 1950 Chandannagar, 1954 Dadra and Nagar Haveli with the Fre" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Territory</th><th>Year</th></tr></thead><tbody><tr><td>Portugal</td><td>Dadra and Nagar Haveli</td><td>1954</td></tr><tr><td>Portugal</td><td>Daman and Diu</td><td>1961</td></tr><tr><td>Portugal</td><td>Goa</td><td>1961</td></tr><tr><td>France</td><td>Chandannagar</td><td>1950 (merged with West Bengal in 1954)</td></tr><tr><td>France</td><td>Pondicherry (present-day Puducherry)</td><td>1954</td></tr><tr><td>France</td><td>Karaikal</td><td>1954</td></tr><tr><td>France</td><td>Mahe</td><td>1954</td></tr><tr><td>France</td><td>Yanam</td><td>1954</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/22.png" alt="Pondicherry French quarter White Town street photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A simple way to learn the table is this: Portugal gave up three areas, and France gave up five. Goa, Daman and Diu came in 1961, and almost everything else came in 1954.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/23.png" alt="Chandannagar Strand French colonial building photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Dadra and Nagar Haveli came in 1954, but Goa, Daman and Diu came in 1961. Do not put all Portuguese areas in one year.</div>
      <div class="cp-note exam">Karaikal, Mahe and Yanam were French areas that joined in 1954 with Pondicherry.</div>
    `
  },
  37: {
    questext: "In which year was Goa freed from Portuguese rule and joined India?",
    options: ["1947", "1961", "1954", "1950"],
    correct: "2",
    exptext: "✅ Goa, with Daman and Diu, joined India in 1961. 📌 Goa 1961, Dadra and Nagar Haveli 1954. ❌ 1954 is tempting, but that year belongs to Dadra and Nagar Haveli and the French areas."
  },
  38: {
    questext: "Which of the following was a French territory that joined India?",
    options: ["Daman", "Goa", "Mahe", "Diu"],
    correct: "3",
    exptext: "✅ Mahe was a French territory and joined India in 1954. 📌 Mahe, Karaikal, Yanam and Pondicherry were French. ❌ Daman, Goa and Diu were Portuguese."
  },
  39: {
    questext: "Consider the following statements:\n1. Daman and Diu became part of India in 1954.\n2. Karaikal, Mahe and Yanam joined India in 1954.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. Daman and Diu joined India in 1961. 📌 Only Dadra and Nagar Haveli came in 1954 among the Portuguese areas. ❌ Statement 1 gives the wrong year."
  },
  40: {
    type: "concept", icon: "🏆", accent: "#ec4899", pauseTimer: true,
    title: "Other Important Facts Related to India",
    html: `
      <p class="cp-lead">These last facts give India's place in the world. <u>Learn the rank in area, the share of population and the time difference.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/24.png" alt="A bar chart of the ten largest countries by area in order: Russia, Canada, United States o" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Rank in area</th><th>Country</th></tr></thead><tbody><tr><td>1</td><td>Russia</td></tr><tr><td>2</td><td>Canada</td></tr><tr><td>3</td><td>United States of America</td></tr><tr><td>4</td><td>China</td></tr><tr><td>5</td><td>Brazil</td></tr><tr><td>6</td><td>Australia</td></tr><tr><td>7</td><td>India</td></tr><tr><td>8</td><td>Argentina</td></tr><tr><td>9</td><td>Kazakhstan</td></tr><tr><td>10</td><td>Algeria</td></tr></tbody></table>
      <p class="cp-lead">India ranks <b>seventh</b> in the world by area. India has <b>17.5 percent</b> of the world population. The time difference between the eastern and the western ends of India is <b>two hours</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_to_Geography/25.png" alt="A schematic of India with two clocks: one at the eastern end and one at the western end, w" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix up the area share, which is 2.4 percent, with the population share, which is 17.5 percent.</div>
      <div class="cp-note exam">Six countries are larger than India: Russia, Canada, the United States of America, China, Brazil and Australia.</div>
    `
  },
  41: {
    questext: "What is the rank of India in the world on the basis of area?",
    options: ["7th", "5th", "6th", "8th"],
    correct: "1",
    exptext: "✅ India ranks seventh in area, after Russia, Canada, the United States of America, China, Brazil and Australia. 📌 Seven for India, as in the seven largest. ❌ Eighth belongs to Argentina."
  },
  42: {
    questext: "What percent of the world population lives in India?",
    options: ["12.5 percent", "17.5 percent", "20 percent", "15 percent"],
    correct: "2",
    exptext: "✅ India has 17.5 percent of the world population. 📌 Area is 2.4 percent, and population is 17.5 percent. ❌ 2.4 percent is wrong because that is the share of area."
  },
  43: {
    questext: "Which country has the eighth largest area in the world, just after India?",
    options: ["Kazakhstan", "Algeria", "Brazil", "Argentina"],
    correct: "4",
    exptext: "✅ Argentina is eighth, just after India. 📌 After India, the order is Argentina, Kazakhstan and Algeria. ❌ Kazakhstan is ninth, and Algeria is tenth."
  },
  44: {
    questext: "Which of the following countries is NOT larger than India in area?",
    options: ["Brazil", "Australia", "Argentina", "China"],
    correct: "3",
    exptext: "✅ Argentina is smaller than India and ranks eighth. 📌 The six larger countries are Russia, Canada, the United States of America, China, Brazil and Australia. ❌ Brazil, Australia and China are all larger than India."
  },
  45: {
    questext: "What is the time difference between the eastern and the western ends of India?",
    options: ["1 hour", "2 hours", "3 hours", "4 hours"],
    correct: "2",
    exptext: "✅ The two ends of India differ by two hours. 📌 One standard time is used for the whole country. ❌ One hour is wrong because the country is wide, about 2,933 kilometres from east to west."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Introduction_to_Geography/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined globe, a vintage brass compass and a few real-looking gold coins" },
  "images/General_Awareness/Geography/Introduction_to_Geography/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Old map of India Hindustan Mughal era map\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/1.png. an old map that shows the land of Hindustan",
  "images/General_Awareness/Geography/Introduction_to_Geography/2.png": { t: "fig", about: "Three name cards side by side: Jambu dweep (the ancient land), Aryavarta (home of the Aryans), Hind or Hindustan (medieval Persian and Arab historians)." },
  "images/General_Awareness/Geography/Introduction_to_Geography/3.png": { t: "fig", about: "A schematic, not a map: a four-sided shape of India with a vertical arrow labelled 3,214 kilometres north to south and a horizontal arrow labelled 2,933 kilometres east to west." },
  "images/General_Awareness/Geography/Introduction_to_Geography/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indira Point lighthouse Great Nicobar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/4.png. the lighthouse at Indira Point, the southernmost point of India",
  "images/General_Awareness/Geography/Introduction_to_Geography/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kibithu Arunachal Pradesh easternmost village photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/5.png. Kibithu, the easternmost point of India",
  "images/General_Awareness/Geography/Introduction_to_Geography/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tropic of Cancer sign board India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/6.png. a signboard that marks the Tropic of Cancer in India",
  "images/General_Awareness/Geography/Introduction_to_Geography/7.png": { t: "fig", about: "A schematic, not a map: a horizontal line from west to east with eight boxes in order: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram." },
  "images/General_Awareness/Geography/Introduction_to_Geography/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mirzapur Uttar Pradesh clock tower photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/8.png. Mirzapur, the city through which the standard meridian passes",
  "images/General_Awareness/Geography/Introduction_to_Geography/9.png": { t: "fig", about: "A schematic, not a map: six coloured boxes labelled East Zone, West Zone, North Zone, South Zone, Central Zone and North-East Zone." },
  "images/General_Awareness/Geography/Introduction_to_Geography/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ladakh Pangong Tso lake landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/10.png. Ladakh, the largest union territory of India by area",
  "images/General_Awareness/Geography/Introduction_to_Geography/11.png": { t: "fig", about: "A chart with four rows of largest and smallest: state by area (Rajasthan, Goa), union territory by area (Ladakh, Lakshadweep), state by population (Uttar Pradesh, Sikkim), union territory by population (Delhi, Lakshadweep)." },
  "images/General_Awareness/Geography/Introduction_to_Geography/12.png": { t: "fig", about: "A schematic, not a map: Uttar Pradesh in the centre with eight state boxes around it (Uttarakhand, Himachal Pradesh, Haryana, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, Bihar) and one union territory box (Delhi)." },
  "images/General_Awareness/Geography/Introduction_to_Geography/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gujarat coastline Dwarka beach photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/13.png. the long coast of Gujarat, the state with the longest coastline",
  "images/General_Awareness/Geography/Introduction_to_Geography/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Goa beach coast aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/14.png. Goa, the state with the shortest sea coast",
  "images/General_Awareness/Geography/Introduction_to_Geography/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Adam's Bridge Ram Setu aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/15.png. Adam's Bridge, the chain of shoals between India and Sri Lanka",
  "images/General_Awareness/Geography/Introduction_to_Geography/16.png": { t: "fig", about: "A chart of three dividing lines with their countries: Radcliffe Line with Pakistan and Bangladesh, McMahon Line with China, Durand Line with Afghanistan and Pakistan." },
  "images/General_Awareness/Geography/Introduction_to_Geography/17.png": { t: "fig", about: "A bar chart of border lengths in kilometres in order from the longest: Bangladesh 4,096.7, China 3,488, Pakistan 3,323, Nepal 1,751, Myanmar 1,643." },
  "images/General_Awareness/Geography/Introduction_to_Geography/18.png": { t: "fig", about: "A schematic, not a map: a vertical ladder from north to south with Nine Degree Channel between Minicoy and the rest of Lakshadweep, and Eight Degree Channel between Minicoy and the Maldives." },
  "images/General_Awareness/Geography/Introduction_to_Geography/19.png": { t: "fig", about: "A schematic of the Andaman and Nicobar Islands from north to south: Coco Strait at the top, Ten Degree Channel in the middle, and Great Channel at the bottom near Indira Point." },
  "images/General_Awareness/Geography/Introduction_to_Geography/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Minicoy island lighthouse photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/20.png. Minicoy, the island between the Eight Degree and Nine Degree channels",
  "images/General_Awareness/Geography/Introduction_to_Geography/21.png": { t: "fig", about: "A timeline with three markers: 1950 Chandannagar, 1954 Dadra and Nagar Haveli with the French areas, 1961 Goa, Daman and Diu." },
  "images/General_Awareness/Geography/Introduction_to_Geography/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pondicherry French quarter White Town street photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/22.png. the French quarter of Puducherry",
  "images/General_Awareness/Geography/Introduction_to_Geography/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chandannagar Strand French colonial building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Introduction_to_Geography/23.png. the old French buildings of Chandannagar in West Bengal",
  "images/General_Awareness/Geography/Introduction_to_Geography/24.png": { t: "fig", about: "A bar chart of the ten largest countries by area in order: Russia, Canada, United States of America, China, Brazil, Australia, India (highlighted), Argentina, Kazakhstan, Algeria." },
  "images/General_Awareness/Geography/Introduction_to_Geography/25.png": { t: "fig", about: "A schematic of India with two clocks: one at the eastern end and one at the western end, with the label Time difference 2 hours." }
});

/* CHANGE LOG
   - India has 28 states and 8 union territories (earlier written as 29 states and 7 union territories). The zone table now shows Jammu and Kashmir and Ladakh as union territories and the merged union territory of Dadra and Nagar Haveli and Daman and Diu.
   - Largest union territory by area is Ladakh (earlier written as Andaman and Nicobar Islands).
   - Durand Line is the boundary between Afghanistan and Pakistan (earlier linked with India and Afghanistan).
   - It is the Eastern Ghats and the Western Ghats that meet in the Nilgiri hills (earlier written as the eastern and western coasts).
   - Chandannagar joined India in 1950 and merged with West Bengal in 1954 (earlier written as 1946).
   - Area share corrected to 2.4 percent of the world's total area, and the western longitude written as 68 degrees 7 minutes east.
   - The count of 17 states sharing borders with neighbours was removed because Ladakh is now a separate union territory.
*/
