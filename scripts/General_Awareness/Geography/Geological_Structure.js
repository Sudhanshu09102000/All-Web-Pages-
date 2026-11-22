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
    var D = /* ═══ SNIPPET 4 — put right after SNIPPET 3 ═══ */
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

window.TEST_DATA || {};
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

/* Field: General_Awareness · Subject: Geography · Chapter: Geological_Structure · 10 concept pages (+ overview) · 30 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Geography/Geological_Structure/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "GEOLOGICAL STRUCTURE",
      line2: "ARCHEAN TO HIMALAYA",
      line3: "ROCKS • ERAS • TRICKS",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Geological Structure of India Full Class | Archean, Dharwar, Gondwana, Deccan Trap | SSC CGL",
      altTitles: ["Indian Rock Systems in One Class", "How the Himalaya Was Formed Step by Step"],
      description: "The geological structure of India is a favourite Geography topic. In this fast-track class you learn the rock systems of India from the oldest to the youngest, step by step.\n\n📌 IN THIS CLASS\n✅ Pangea, Angaraland and Gondwanaland\n✅ Eras and periods of the Earth\n✅ Archean, Dharwar, Cuddapah and Vindhyan rocks\n✅ Gondwana coal and the Deccan Trap\n✅ How the Himalaya was formed\n✅ Practice questions in the SSC CGL style\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Pangea\n00:00 Eras and periods\n00:00 Rock systems\n00:00 Himalaya\n\n👍 Like, share and subscribe.\n\n#SSCCGL #IndianGeography #GeologicalStructure",
      tags: ["geological structure of india", "geological structure", "archean rocks", "dharwar system", "cuddapah system", "vindhyan system", "gondwana system", "deccan trap", "formation of himalaya", "pangea and gondwanaland", "geologic time scale", "indian geography", "geography for ssc cgl", "geography tricks", "general awareness", "ssc cgl geography", "geography mcq", "static gk", "indian rock systems", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation"],
      hashtags: ["SSCCGL", "IndianGeography", "GeologicalStructure"],
      thumbText: "GEOLOGICAL STRUCTURE OF INDIA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🪨 New class is live: Geological Structure of India, from the oldest rocks to the Himalaya. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Division of Pangea\n00:00 Geologic Time Scale\n00:00 Precambrian Era\n00:00 Archean\n00:00 Dharwar\n00:00 Cuddapah\n00:00 Vindhyan\n00:00 Palaeozoic Era — Gondwana\n00:00 Mesozoic Era — Deccan Trap\n00:00 Cenozoic Era — Formation of the Himalaya",
      playlist: "Competitive exams General Awareness — Geography"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Geological Structure of India</u>. We will learn how the land was formed, which rocks are the oldest, and how the Himalaya rose from the sea.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>10</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>30</b><span>Questions</span></div>
        <div class="cp-stat"><b>~50 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Division of Pangea</b><br>How one giant landmass split into Angaraland and Gondwanaland, and which lands belong to each.</li>
        <li><b>Geologic Time Scale</b><br>The four eras of the Earth and the periods inside each of them.</li>
        <li><b>Precambrian Era</b><br>The four oldest rock systems of India in their correct order.</li>
        <li><b>Archean</b><br>The oldest rocks of India, made of granite and gneiss.</li>
        <li><b>Dharwar</b><br>The oldest sedimentary rocks, and the home of most of India's metallic minerals.</li>
        <li><b>Cuddapah</b><br>The limestone-rich rocks, and where they are found.</li>
        <li><b>Vindhyan</b><br>The red sandstone and limestone rocks, and the diamond mines of Panna.</li>
        <li><b>Palaeozoic Era — Gondwana</b><br>The rocks that hold most of India's bituminous coal.</li>
        <li><b>Mesozoic Era — Deccan Trap</b><br>The basalt rocks formed by lava, and the black soil that grew on them.</li>
        <li><b>Cenozoic Era — Formation of the Himalaya</b><br>How the Himalaya was built step by step, from the Eocene to the Pliocene.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on the oldest rocks, coal, diamonds, the Deccan Trap and the formation of the Himalaya come in almost every Geography paper, and they also help you in the Minerals and Soils chapters.</div>
    `
  },
  2: {
    type: "concept", icon: "🌐", accent: "#22c55e", pauseTimer: true,
    title: "Division of Pangea",
    html: `
      <p class="cp-lead">Long ago all the land of the Earth was joined in one giant landmass called <b>Pangea</b>. <u>Pangea split into two parts, Angaraland in the north and Gondwanaland in the south.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/1.png" alt="A picture in four stages: 225 million years ago one landmass called Pangea with the Tethys" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The northern part is <b>Angaraland</b>, which is also called <b>Laurentia</b>. The southern part is <b>Gondwanaland</b>. Peninsular India was part of Gondwanaland, so the plateau of India is very old.</p>
      <table><thead><tr><th>Landmass</th><th>Lands that belonged to it</th></tr></thead><tbody><tr><td>Angaraland (Laurentia)</td><td>Europe, Asia, North America, Greenland</td></tr><tr><td>Gondwanaland</td><td>Peninsular India, Africa, Australia, South America, Antarctica, Madagascar</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/2.png" alt="A two-box chart: the box Angaraland in the north with Europe, Asia, North America and Gree" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not put India in Angaraland. Peninsular India belongs to Gondwanaland.</div>
      <div class="cp-note exam">Gondwanaland means the southern landmass, and it holds six lands: Peninsular India, Africa, Australia, South America, Antarctica and Madagascar.</div>
    `
  },
  3: {
    questext: "Which of the following lands was part of Gondwanaland?",
    options: ["Europe", "Greenland", "Peninsular India", "North America"],
    correct: "3",
    exptext: "✅ Peninsular India was part of Gondwanaland, along with Africa, Australia, South America, Antarctica and Madagascar. 📌 Gondwanaland is the southern landmass. ❌ Europe, Greenland and North America belonged to Angaraland."
  },
  4: {
    questext: "Which of the following was NOT part of Angaraland (Laurentia)?",
    options: ["Europe", "Asia", "Greenland", "Madagascar"],
    correct: "4",
    exptext: "✅ Madagascar was part of Gondwanaland, not of Angaraland. 📌 Angaraland is the north and Gondwanaland is the south. ❌ Europe, Asia and Greenland were all part of Angaraland."
  },
  5: {
    questext: "Consider the following statements:\n1. Angaraland, also called Laurentia, included Europe, Asia, North America and Greenland.\n2. Antarctica was part of Angaraland.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. Antarctica was part of Gondwanaland. 📌 Antarctica is in the far south, so it belongs to the southern landmass. ❌ Statement 2 is wrong because it puts Antarctica in the north."
  },
  6: {
    type: "concept", icon: "⏳", accent: "#3b82f6", pauseTimer: true,
    title: "Geologic Time Scale",
    html: `
      <p class="cp-lead">The long history of the Earth is divided into <b>four eras</b>, and each era is divided into periods. <u>The Cenozoic era is the newest, and the Precambrian era is the oldest.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/3.png" alt="A vertical time ladder from the newest at the top to the oldest at the bottom: Cenozoic, M" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Era</th><th>Time</th><th>Periods</th></tr></thead><tbody><tr><td>Cenozoic</td><td>From 65 million (6.5 crore) years ago to today</td><td>Quaternary, Tertiary</td></tr><tr><td>Mesozoic</td><td>245 to 65 million years ago</td><td>Cretaceous, Jurassic, Triassic</td></tr><tr><td>Palaeozoic</td><td>57 crore to 24.5 crore years ago</td><td>Permian, Carboniferous, Devonian, Silurian, Ordovician, Cambrian</td></tr><tr><td>Precambrian</td><td>About 460 crore to 57 crore years ago</td><td>The oldest era; no periods are named here</td></tr></tbody></table>
      <p class="cp-lead">Read the table from the top, and the time goes back from the present to the oldest past. The Palaeozoic era has six periods, the Mesozoic has three and the Cenozoic has two.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/4.png" alt="A card chart of the periods inside each era, with the numbers of periods: Cenozoic 2, Meso" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">Palaeozoic periods from the oldest: Can Only Smart Dogs Count Peas, for Cambrian, Ordovician, Silurian, Devonian, Carboniferous, Permian.</div>
      <div class="cp-note trap">The Triassic, Jurassic and Cretaceous periods belong to the Mesozoic era, while the Permian belongs to the Palaeozoic era.</div>
      <div class="cp-note exam">The Cenozoic era has only two periods: Tertiary and Quaternary.</div>
    `
  },
  7: {
    questext: "Which is the most recent era of the geologic history of the Earth?",
    options: ["Palaeozoic", "Mesozoic", "Precambrian", "Cenozoic"],
    correct: "4",
    exptext: "✅ The Cenozoic era began about 65 million years ago and continues today. 📌 Cenozoic means the recent era. ❌ The Precambrian era is the oldest, not the newest."
  },
  8: {
    questext: "Which of the following periods belongs to the Mesozoic era?",
    options: ["Permian", "Jurassic", "Tertiary", "Devonian"],
    correct: "2",
    exptext: "✅ The Jurassic period belongs to the Mesozoic era, with the Triassic and the Cretaceous. 📌 The Mesozoic has three periods that end in the Cretaceous. ❌ The Permian and the Devonian are Palaeozoic, and the Tertiary is Cenozoic."
  },
  9: {
    questext: "Which of the following periods does NOT belong to the Palaeozoic era?",
    options: ["Silurian", "Ordovician", "Triassic", "Permian"],
    correct: "3",
    exptext: "✅ The Triassic belongs to the Mesozoic era. 📌 Triassic, Jurassic and Cretaceous are the Mesozoic trio. ❌ Silurian, Ordovician and Permian are all Palaeozoic periods."
  },
  10: {
    type: "concept", icon: "🪨", accent: "#f59e0b", pauseTimer: true,
    title: "Precambrian Era",
    html: `
      <p class="cp-lead">The Precambrian era holds the <b>oldest rocks</b> of India. <u>There are four rock systems in this era, and their order from oldest to youngest is Archean, Dharwar, Cuddapah and Vindhyan.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/5.png" alt="A four-step ladder from the oldest at the bottom to the youngest at the top: Archean, Dhar" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>System</th><th>Type of rock</th><th>Main regions</th></tr></thead><tbody><tr><td>Archean</td><td>Igneous rock that was later transformed (metamorphic)</td><td>Southern mountainous region, Aravalli Range, Bundelkhand plateau</td></tr><tr><td>Dharwar</td><td>Ancient sedimentary rock; fossil-free</td><td>Shillong Range, Aravalli, Chotanagpur, Dharwad</td></tr><tr><td>Cuddapah</td><td>Limestone-rich</td><td>Cuddapah district (Andhra Pradesh), Shevaroy and Javadi hills (Tamil Nadu), Chotanagpur plateau, Aravalli Range</td></tr><tr><td>Vindhyan</td><td>Fossilized sedimentary structure</td><td>Red sandstone and limestone</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/6.png" alt="Aravalli hills Rajasthan landscape photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The geological map of India shows the rocks in colours. The Precambrian rocks cover much of the Peninsular region.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/7.png" alt="A colour legend chart for the geological map of India: Recent and Pleistocene in yellow, T" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix up the order. The Archean system is the oldest, and the Vindhyan system is the youngest of the four.</div>
      <div class="cp-note exam">Archean and Dharwar are fossil-free, and Vindhyan has fossils in some places.</div>
    `
  },
  11: {
    questext: "Which is the oldest rock system of India?",
    options: ["Archean", "Dharwar", "Cuddapah", "Vindhyan"],
    correct: "1",
    exptext: "✅ The Archean system is the oldest rock system of India. 📌 A comes first in the alphabet, and Archean is the first and oldest. ❌ Dharwar is the second system, so it is younger."
  },
  12: {
    questext: "Which is the correct order of the Precambrian rock systems from oldest to youngest?",
    options: ["Dharwar, Archean, Cuddapah, Vindhyan", "Archean, Cuddapah, Dharwar, Vindhyan", "Vindhyan, Cuddapah, Dharwar, Archean", "Archean, Dharwar, Cuddapah, Vindhyan"],
    correct: "4",
    exptext: "✅ The order is Archean, Dharwar, Cuddapah and Vindhyan. 📌 A, D, C, V is the order in which the four systems were formed. ❌ The third option is the reverse order."
  },
  13: {
    questext: "Which pair of rock system and rock type is correctly matched?",
    options: ["Archean and fossil-rich sedimentary rock", "Dharwar and ancient fossil-free sedimentary rock", "Cuddapah and granite and gneiss", "Vindhyan and lava basalt"],
    correct: "2",
    exptext: "✅ Dharwar is an ancient sedimentary rock system without fossils. 📌 Dharwar means the oldest sedimentary rocks. ❌ Archean is igneous and metamorphic, and basalt belongs to the Deccan Trap."
  },
  14: {
    type: "concept", icon: "🌋", accent: "#ef4444", pauseTimer: true,
    title: "Archean",
    html: `
      <p class="cp-lead">The <b>Archean</b> system is the oldest structure of India. <u>It was formed from lava and magma, and it is made of granite and gneiss rock.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/8.png" alt="Granite gneiss rock outcrop photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Archean rocks are the base rocks of most of the Peninsular Plateau, but they lie in the lower layers there. They are seen on the surface only in the southern mountainous region, the Bundelkhand plateau and the Aravalli mountainous region. They are also found in the roots of the Himalayan mountainous region.</p>
      <table><thead><tr><th>Feature</th><th>Fact</th></tr></thead><tbody><tr><td>Rock type</td><td>Igneous rock, later transformed (metamorphic)</td></tr><tr><td>Main rocks</td><td>Granite and gneiss</td></tr><tr><td>Fossils</td><td>Not found</td></tr><tr><td>Seen on the surface</td><td>Southern mountainous region, Bundelkhand plateau, Aravalli Range</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/9.png" alt="Bundelkhand plateau granite rocks photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Because the Archean rocks are igneous, they are very important for deposits of both metallic and non-metallic minerals. The <b>Aravalli hills</b> were formed as folded mountains in the Precambrian period, and they are one of the oldest folded mountains in the world.</p>
      <div class="cp-note trap">Do not look for fossils in the Archean rocks. Fossils are not found in them.</div>
      <div class="cp-note exam">Archean rocks are made of granite and gneiss, and the Aravalli hills are among the oldest folded mountains in the world.</div>
    `
  },
  15: {
    questext: "Archean rocks are mainly made of which rocks?",
    options: ["Sandstone and limestone", "Basalt only", "Granite and gneiss", "Coal and shale"],
    correct: "3",
    exptext: "✅ The Archean system is made of granite and gneiss. 📌 Archean, Granite and Gneiss all have hard, old sounds. ❌ Sandstone and limestone are sedimentary rocks of the Vindhyan system."
  },
  16: {
    questext: "Consider the following statements about the Archean system:\n1. Fossils are not found in Archean rocks.\n2. The Archean system is the youngest rock system of India.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. The Archean system is the oldest, not the youngest. 📌 Archean means ancient. ❌ Statement 2 is wrong because it reverses the age."
  },
  17: {
    questext: "Archean rocks are seen on the surface in which of the following regions?",
    options: ["Northern plains", "Deccan Trap region", "Thar desert", "Bundelkhand plateau"],
    correct: "4",
    exptext: "✅ Archean rocks appear on the surface in the Bundelkhand plateau, the Aravalli region and the southern mountainous region. 📌 Bundelkhand and Archean go together. ❌ The northern plains are covered by new soil, so old rocks lie deep below."
  },
  18: {
    type: "concept", icon: "🏔️", accent: "#8b5cf6", pauseTimer: true,
    title: "Dharwar",
    html: `
      <p class="cp-lead">The <b>Dharwar</b> system is a fossil-free sedimentary rock system, and it is the oldest sedimentary rock of India. <u>It is the richest system for metallic minerals.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/10.png" alt="Dharwad Karnataka rocky landscape photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Dharwar rocks were once sedimentary rocks that were transformed by heat and pressure, and they have no fossils. The most developed Dharwar structure is found in the <b>Dharwad region of Karnataka</b>. They are also found in the Aravalli mountainous region, the Chotanagpur plateau and the <b>Shillong Range of Meghalaya</b>.</p>
      <table><thead><tr><th>Feature</th><th>Fact</th></tr></thead><tbody><tr><td>Rock type</td><td>Ancient sedimentary rock, transformed; fossil-free</td></tr><tr><td>Best developed</td><td>Dharwad region of Karnataka</td></tr><tr><td>Other regions</td><td>Aravalli Range, Chotanagpur plateau, Shillong Range (Meghalaya)</td></tr><tr><td>Importance</td><td>The highest quantity of India's metallic minerals</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/11.png" alt="Shillong Plateau Meghalaya landscape photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Archean and Dharwar are both fossil-free, but Archean is igneous and Dharwar is sedimentary.</div>
      <div class="cp-note exam">India's metallic mineral resources are found in the highest quantity in the Dharwar system, and the system takes its name from Dharwad.</div>
    `
  },
  19: {
    questext: "The most developed Dharwar structure is found in which state?",
    options: ["Andhra Pradesh", "Karnataka", "Tamil Nadu", "Meghalaya"],
    correct: "2",
    exptext: "✅ The Dharwar structure is most developed in the Dharwad region of Karnataka. 📌 Dharwar and Dharwad sound alike. ❌ Andhra Pradesh is the home of the Cuddapah system."
  },
  20: {
    questext: "Which rock system holds the highest quantity of India's metallic minerals?",
    options: ["Vindhyan", "Cuddapah", "Dharwar", "Gondwana"],
    correct: "3",
    exptext: "✅ The Dharwar system has the highest quantity of metallic minerals in India. 📌 Dharwar is the metal storehouse. ❌ Vindhyan rocks lack metallic minerals and are useful for building material."
  },
  21: {
    questext: "Consider the following statements about the Dharwar system:\n1. Dharwar rocks are the oldest sedimentary rocks of India.\n2. Dharwar rocks are rich in fossils.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. Dharwar rocks are fossil-free. 📌 Dharwar is old and has no fossils. ❌ Statement 2 is wrong because it says the rocks are rich in fossils."
  },
  22: {
    type: "concept", icon: "🧱", accent: "#14b8a6", pauseTimer: true,
    title: "Cuddapah",
    html: `
      <p class="cp-lead">The <b>Cuddapah</b> system has the largest reserve of limestone, and it also has no fossils. <u>It is named after the Cuddapah region of Andhra Pradesh.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/12.png" alt="Cuddapah Andhra Pradesh limestone quarry photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The most developed Cuddapah structure is in the <b>Cuddapah region of Andhra Pradesh</b>. It has also developed in the Shevaroy and Javadi hills of Tamil Nadu, in the Krishna River area, in the Papaghni and Cheyyar valleys, in the Aravalli mountainous region and in the Chotanagpur plateau.</p>
      <table><thead><tr><th>Feature</th><th>Fact</th></tr></thead><tbody><tr><td>Main resource</td><td>The largest reserve of limestone</td></tr><tr><td>Fossils</td><td>Not found</td></tr><tr><td>Best developed</td><td>Cuddapah region of Andhra Pradesh</td></tr><tr><td>Other regions</td><td>Shevaroy and Javadi hills (Tamil Nadu), Krishna River area, Papaghni and Cheyyar valleys, Aravalli Range, Chotanagpur plateau</td></tr><tr><td>Famous for</td><td>Sandstone, limestone, asbestos and marble</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/13.png" alt="Javadi Hills Tamil Nadu forest landscape photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not confuse Cuddapah with Dharwar. Dharwar is famous for metallic minerals, while Cuddapah is famous for limestone, asbestos and marble.</div>
      <div class="cp-note exam">Remember the four famous rocks of Cuddapah: sandstone, limestone, asbestos and marble.</div>
    `
  },
  23: {
    questext: "The Cuddapah rock system is mainly famous for which of the following?",
    options: ["Bituminous coal", "Black soil", "Diamonds", "Limestone and asbestos"],
    correct: "4",
    exptext: "✅ The Cuddapah system is famous for limestone, asbestos, sandstone and marble. 📌 Cuddapah and limestone go together. ❌ Bituminous coal belongs to the Gondwana system, and diamonds to the Vindhyan system."
  },
  24: {
    questext: "The most developed Cuddapah structure is found in which state?",
    options: ["Karnataka", "Andhra Pradesh", "Meghalaya", "Rajasthan"],
    correct: "2",
    exptext: "✅ The Cuddapah structure is best developed in the Cuddapah region of Andhra Pradesh. 📌 The system takes its name from the place. ❌ Karnataka is tempting because it holds the best Dharwar rocks, not Cuddapah."
  },
  25: {
    type: "concept", icon: "💎", accent: "#0ea5e9", pauseTimer: true,
    title: "Vindhyan",
    html: `
      <p class="cp-lead">The <b>Vindhyan</b> system is made of sedimentary rocks, mainly red sandstone and limestone. <u>It is rich in building material, and the famous diamond mines of Panna are found in it.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/14.png" alt="A schematic, not a map: a box showing the spread of the Vindhyan rocks with four labels: S" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Vindhyan rocks are spread from <b>Sasaram and Rohtas</b> in Bihar in the east to <b>Chittorgarh</b> in Rajasthan in the west. In the north they reach Agra, and in the south they reach <b>Hoshangabad</b> of Madhya Pradesh.</p>
      <table><thead><tr><th>Feature</th><th>Fact</th></tr></thead><tbody><tr><td>Rock type</td><td>Sedimentary rock</td></tr><tr><td>Fossils</td><td>Found at some places</td></tr><tr><td>Main rocks</td><td>Red sandstone and limestone</td></tr><tr><td>Minerals</td><td>No metallic minerals; rich in building material</td></tr><tr><td>Famous for</td><td>The diamond mines of Panna and Golconda</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/15.png" alt="Red sandstone quarry Rajasthan photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Because the Vindhyan rocks lack metallic minerals, their value is in building materials such as red sandstone.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/16.png" alt="Panna diamond mine Madhya Pradesh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Vindhyan has fossils at some places, but Archean and Dharwar have none.</div>
      <div class="cp-note exam">Remember the Vindhyan system with red sandstone, limestone and the diamond mines of Panna and Golconda.</div>
    `
  },
  26: {
    questext: "The famous diamond mines of Panna are found in which rock system?",
    options: ["Archean", "Gondwana", "Vindhyan", "Dharwar"],
    correct: "3",
    exptext: "✅ The diamond mines of Panna are found in the Vindhyan system. 📌 Vindhyan and diamonds go together. ❌ Gondwana is famous for bituminous coal, not diamonds."
  },
  27: {
    questext: "Which of the following is a feature of the Vindhyan system?",
    options: ["It is rich in building materials such as red sandstone and limestone", "It is rich in bituminous coal", "It is rich in black soil", "It is rich in metallic minerals"],
    correct: "1",
    exptext: "✅ The Vindhyan system is useful for building materials such as red sandstone and limestone. 📌 Vindhyan means stone for buildings. ❌ Metallic minerals are not found in it."
  },
  28: {
    questext: "Which statement about the Vindhyan system is NOT correct?",
    options: ["It is made of sedimentary rocks", "Fossils are found at some places", "It is useful for building materials", "It is rich in metallic minerals"],
    correct: "4",
    exptext: "✅ The Vindhyan system lacks metallic minerals, so the last statement is wrong. 📌 Vindhyan gives stone, not metal. ❌ The first three statements are true."
  },
  29: {
    type: "concept", icon: "⛏️", accent: "#84cc16", pauseTimer: true,
    title: "Palaeozoic Era — Gondwana",
    html: `
      <p class="cp-lead">The <b>Gondwana</b> system was formed in the Carboniferous and Permian periods of the Palaeozoic era. <u>It is the most important system of India for bituminous coal.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/17.png" alt="Damodar valley coal mine Jharkhand photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In that time the Earth's movement made deep basins by sinking of the land. Sediments settled in these basins and formed fossil-rich sedimentary rock, which is the Gondwana system.</p>
      <table><thead><tr><th>Feature</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>Carboniferous and Permian</td></tr><tr><td>Rock type</td><td>Fossil-rich sedimentary rock</td></tr><tr><td>Famous for</td><td>Bituminous coal</td></tr><tr><td>River basins</td><td>Damodar, Mahanadi, Godavari, Son and Narmada</td></tr><tr><td>Best developed in</td><td>The Damodar river basin</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/18.png" alt="A chart of five river basins, with the Damodar basin highlighted: Damodar, Mahanadi, Godav" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Gondwana structure is linked with the basins of the <b>Damodar, Mahanadi, Godavari, Son and Narmada</b>, and it is most developed in the <b>Damodar river basin</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/19.png" alt="Bituminous coal sample photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Gondwana rocks are fossil-rich, while Archean and Dharwar rocks are fossil-free.</div>
      <div class="cp-note exam">Gondwana is the most important system for bituminous coal, and the Damodar basin has it in the highest development.</div>
    `
  },
  30: {
    questext: "Which rock system is the most important for the reserves of bituminous coal in India?",
    options: ["Vindhyan", "Gondwana", "Cuddapah", "Deccan Trap"],
    correct: "2",
    exptext: "✅ The Gondwana system holds the bituminous coal of India. 📌 Gondwana means coal. ❌ The Deccan Trap is made of basalt and has no coal."
  },
  31: {
    questext: "The Gondwana structure is most developed in which river basin?",
    options: ["Godavari", "Narmada", "Damodar", "Mahanadi"],
    correct: "3",
    exptext: "✅ The Gondwana structure is most developed in the Damodar river basin. 📌 Damodar and coal go together. ❌ Godavari, Narmada and Mahanadi also have Gondwana rocks, but less developed."
  },
  32: {
    questext: "Consider the following statements about the Gondwana system:\n1. It developed in the Carboniferous and Permian periods.\n2. It is made of fossil-free rocks.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. The Gondwana rocks are fossil-rich. 📌 Coal comes from old plants, so fossils are many. ❌ Statement 2 is wrong because it says the rocks have no fossils."
  },
  33: {
    type: "concept", icon: "🌋", accent: "#ec4899", pauseTimer: true,
    title: "Mesozoic Era — Deccan Trap",
    html: `
      <p class="cp-lead">The <b>Deccan Trap</b> was formed in the Cretaceous period of the Mesozoic era. <u>It is made of basalt rock from lava that flowed out of cracks in the Earth.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/20.png" alt="Deccan Trap basalt layers hillside photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The lava came out in a calm way through a quiescent-rift type of volcanic process. The Deccan Trap is also found in the Kathiawar peninsula of Gujarat, the Bangalore-Mysore plateau of Karnataka, the Coimbatore-Madurai plateau of Tamil Nadu, the plateaus of Andhra Pradesh and Telangana and the Rajmahal hills of Chotanagpur.</p>
      <table><thead><tr><th>Feature</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>Cretaceous (Mesozoic era)</td></tr><tr><td>Rock</td><td>Basalt, from a quiescent-rift type of volcanic process</td></tr><tr><td>Regions</td><td>Kathiawar (Gujarat), Bangalore-Mysore plateau, Coimbatore-Madurai plateau, plateaus of Andhra Pradesh and Telangana, Rajmahal hills</td></tr><tr><td>Soil</td><td>Black soil</td></tr><tr><td>Minerals</td><td>A mineral-rich region of India</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/21.png" alt="Black soil cotton field Maharashtra photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The erosion and weathering of basalt rocks made the <b>black soil</b>, so black soil has developed most here. The Deccan Trap is also one of the mineral-rich regions of India.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/22.png" alt="A schematic of lava layers stacked one over another, with labels: basalt layers, weatherin" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Deccan Trap is basalt, which is igneous, and it is not a sedimentary rock like the Gondwana system.</div>
      <div class="cp-note exam">Remember Deccan Trap with Cretaceous, basalt and black soil.</div>
    `
  },
  34: {
    questext: "The Deccan Trap was formed in which period?",
    options: ["Permian", "Triassic", "Tertiary", "Cretaceous"],
    correct: "4",
    exptext: "✅ The Deccan Trap was formed in the Cretaceous period of the Mesozoic era. 📌 Deccan Trap is Cretaceous and Mesozoic. ❌ The Permian belongs to the Palaeozoic era, and the Tertiary to the Cenozoic."
  },
  35: {
    questext: "Which rock forms the Deccan Trap?",
    options: ["Granite", "Basalt", "Sandstone", "Limestone"],
    correct: "2",
    exptext: "✅ The Deccan Trap is made of basalt rock. 📌 Trap rocks are lava rocks. ❌ Granite is the rock of the Archean system, and sandstone and limestone belong to the Vindhyan system."
  },
  36: {
    questext: "Which soil has developed most on the weathered rocks of the Deccan Trap?",
    options: ["Red soil", "Alluvial soil", "Black soil", "Laterite soil"],
    correct: "3",
    exptext: "✅ Black soil has developed most from the weathering of basalt. 📌 Black rock gives black soil. ❌ Alluvial soil is made by rivers in the plains."
  },
  37: {
    type: "concept", icon: "⛰️", accent: "#e11d48", pauseTimer: true,
    title: "Cenozoic Era — Formation of the Himalaya",
    html: `
      <p class="cp-lead">The Himalaya was formed in the Tertiary period of the Cenozoic era. <u>The Indian plate pushed into the Eurasian plate, and the land between them folded upward.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/23.png" alt="A tree chart: Cenozoic splits into Tertiary and Quaternary; Quaternary splits into Pleisto" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Himalaya originated by folding, because of the compressional force that came from the collision of the Indian and Eurasian plates. After that the Himalaya rose in steps, and each step is tied to a period.</p>
      <table><thead><tr><th>Period</th><th>Event</th><th>Fault line or zone</th></tr></thead><tbody><tr><td>Middle Eocene</td><td>The Tethys Sea shrank</td><td>Indus Tsangpo Suture Zone (ITSZ)</td></tr><tr><td>Oligocene</td><td>The Greater Himalaya was folded</td><td>Main Central Thrust (MCT) at the end</td></tr><tr><td>Miocene</td><td>The Lesser or Middle Himalaya was formed</td><td>Main Boundary Fault (MBF) at the end</td></tr><tr><td>Pliocene</td><td>The Shivalik Himalaya was formed</td><td>Himalayan Frontal Fault (HFF) at the end</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/24.png" alt="A cross-section from north to south: Tibet plateau, Trans Himalaya, ITSZ, Greater Himalaya" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">The order is E, O, M, P: Eocene, Oligocene, Miocene, Pliocene, and the Himalaya grows from north to south.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geological_Structure/25.png" alt="Himalaya mountain range snow peaks photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The oldest range is the Greater Himalaya, and the youngest is the Shivalik. Do not reverse them.</div>
      <div class="cp-note exam">The Holocene period formed the northern plains and the coastal plains of India.</div>
    `
  },
  38: {
    questext: "The Himalaya originated from the collision of which plates?",
    options: ["Indian and Eurasian", "Indian and African", "Pacific and Eurasian", "African and Eurasian"],
    correct: "1",
    exptext: "✅ The collision of the Indian plate and the Eurasian plate folded the Himalaya. 📌 India pushed north into Eurasia. ❌ The African plate is not linked with the Himalaya."
  },
  39: {
    questext: "Which is the correct order of formation of the Himalayan ranges from the oldest to the youngest?",
    options: ["Shivalik, Lesser, Greater", "Lesser, Greater, Shivalik", "Lesser, Shivalik, Greater", "Greater, Lesser, Shivalik"],
    correct: "4",
    exptext: "✅ The Greater Himalaya formed in the Oligocene, the Lesser in the Miocene and the Shivalik in the Pliocene. 📌 Oligocene, Miocene, Pliocene go in alphabet order. ❌ The first option is the reverse order."
  },
  40: {
    questext: "Which fault was formed at the end of the Miocene period?",
    options: ["Main Central Thrust", "Main Boundary Fault", "Himalayan Frontal Fault", "Indus Tsangpo Suture Zone"],
    correct: "2",
    exptext: "✅ The Main Boundary Fault developed at the end of the Miocene. 📌 Miocene and Main Boundary both begin with M. ❌ The Main Central Thrust was formed at the end of the Oligocene."
  },
  41: {
    questext: "Consider the following statements:\n1. The Lesser Himalaya was formed in the Miocene period.\n2. The Himalayan Frontal Fault developed at the end of the Pliocene period.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. The Lesser Himalaya formed in the Miocene, and the Himalayan Frontal Fault came at the end of the Pliocene. 📌 Miocene with Lesser, Pliocene with Shivalik. ❌ Choosing one statement fails because both match the facts."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Geological_Structure/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "layered rock strata with a thin gold edge, a vintage brass compass and a few real-looking gold coins" },
  "images/General_Awareness/Geography/Geological_Structure/1.png": { t: "fig", about: "A picture in four stages: 225 million years ago one landmass called Pangea with the Tethys Ocean, 135 million years ago Laurasia and Gondwana apart, 65 million years ago the continents drifting, and the present day." },
  "images/General_Awareness/Geography/Geological_Structure/2.png": { t: "fig", about: "A two-box chart: the box Angaraland in the north with Europe, Asia, North America and Greenland, and the box Gondwanaland in the south with Peninsular India, Africa, Australia, South America, Antarctica and Madagascar." },
  "images/General_Awareness/Geography/Geological_Structure/3.png": { t: "fig", about: "A vertical time ladder from the newest at the top to the oldest at the bottom: Cenozoic, Mesozoic, Palaeozoic, Precambrian, each with its time in years." },
  "images/General_Awareness/Geography/Geological_Structure/4.png": { t: "fig", about: "A card chart of the periods inside each era, with the numbers of periods: Cenozoic 2, Mesozoic 3, Palaeozoic 6." },
  "images/General_Awareness/Geography/Geological_Structure/5.png": { t: "fig", about: "A four-step ladder from the oldest at the bottom to the youngest at the top: Archean, Dharwar, Cuddapah, Vindhyan." },
  "images/General_Awareness/Geography/Geological_Structure/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aravalli hills Rajasthan landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/6.png. the Aravalli hills, which are among the oldest mountains of India",
  "images/General_Awareness/Geography/Geological_Structure/7.png": { t: "fig", about: "A colour legend chart for the geological map of India: Recent and Pleistocene in yellow, Tertiary in orange, Deccan Trap in green, Gondwana and Vindhyan in pink, Precambrian in brown." },
  "images/General_Awareness/Geography/Geological_Structure/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Granite gneiss rock outcrop photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/8.png. an outcrop of granite and gneiss, the rocks of the Archean system",
  "images/General_Awareness/Geography/Geological_Structure/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bundelkhand plateau granite rocks photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/9.png. the granite rocks of the Bundelkhand plateau",
  "images/General_Awareness/Geography/Geological_Structure/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dharwad Karnataka rocky landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/10.png. the region of Dharwad in Karnataka, where the Dharwar rocks are best developed",
  "images/General_Awareness/Geography/Geological_Structure/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shillong Plateau Meghalaya landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/11.png. the Shillong Plateau in Meghalaya, where Dharwar rocks are found",
  "images/General_Awareness/Geography/Geological_Structure/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cuddapah Andhra Pradesh limestone quarry photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/12.png. a limestone quarry in the Cuddapah region",
  "images/General_Awareness/Geography/Geological_Structure/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Javadi Hills Tamil Nadu forest landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/13.png. the Javadi hills of Tamil Nadu, where Cuddapah rocks are found",
  "images/General_Awareness/Geography/Geological_Structure/14.png": { t: "fig", about: "A schematic, not a map: a box showing the spread of the Vindhyan rocks with four labels: Sasaram and Rohtas in the east, Chittorgarh in the west, Agra in the north, Hoshangabad in the south." },
  "images/General_Awareness/Geography/Geological_Structure/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Red sandstone quarry Rajasthan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/15.png. a red sandstone quarry, the building stone of the Vindhyan system",
  "images/General_Awareness/Geography/Geological_Structure/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Panna diamond mine Madhya Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/16.png. the diamond mine at Panna in Madhya Pradesh",
  "images/General_Awareness/Geography/Geological_Structure/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Damodar valley coal mine Jharkhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/17.png. a coal mine in the Damodar valley, where Gondwana coal is found",
  "images/General_Awareness/Geography/Geological_Structure/18.png": { t: "fig", about: "A chart of five river basins, with the Damodar basin highlighted: Damodar, Mahanadi, Godavari, Son, Narmada." },
  "images/General_Awareness/Geography/Geological_Structure/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bituminous coal sample photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/19.png. a piece of bituminous coal",
  "images/General_Awareness/Geography/Geological_Structure/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Deccan Trap basalt layers hillside photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/20.png. the flat layers of basalt in the Deccan Trap",
  "images/General_Awareness/Geography/Geological_Structure/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Black soil cotton field Maharashtra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/21.png. a cotton field on black soil, which grows on weathered basalt",
  "images/General_Awareness/Geography/Geological_Structure/22.png": { t: "fig", about: "A schematic of lava layers stacked one over another, with labels: basalt layers, weathering, black soil on top." },
  "images/General_Awareness/Geography/Geological_Structure/23.png": { t: "fig", about: "A tree chart: Cenozoic splits into Tertiary and Quaternary; Quaternary splits into Pleistocene (the Himalaya goes on rising) and Holocene (formation of the northern plains and coastal plains of India)." },
  "images/General_Awareness/Geography/Geological_Structure/24.png": { t: "fig", about: "A cross-section from north to south: Tibet plateau, Trans Himalaya, ITSZ, Greater Himalaya, MCT, Lesser Himalaya, MBF, Shivalik, HFF, Northern Plains." },
  "images/General_Awareness/Geography/Geological_Structure/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Himalaya mountain range snow peaks photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geological_Structure/25.png. the high peaks of the Himalaya"
});

/* CHANGE LOG
   - Time scale: the last period of the Palaeozoic era was written twice as Carboniferous; it is corrected to Cambrian, and Silurian is spelled in the standard way.
   - Time scale: the start of the Precambrian era is written as about 460 crore years ago, and the stray word Mammals beside the Mesozoic era was removed.
   - Cenozoic chart: the Himalaya originated in the Tertiary period; the Pleistocene is shown as the time when the Himalaya went on rising.
   - Dharwar: the line that sedimentary rocks are easy to exploit economically was removed because it is not a rule.
   - Names written in standard form: Shevaroy, Javadi and Papaghni hills and rivers.
*/
