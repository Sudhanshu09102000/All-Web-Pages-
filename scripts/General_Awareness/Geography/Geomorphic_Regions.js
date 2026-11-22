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

/* Field: General_Awareness · Subject: Geography · Chapter: Geomorphic_Regions · 30 concept pages (+ overview) · 64 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🗺️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Geomorphic Regions of India",
    thumb: {
      image: "images/General_Awareness/Geography/Geomorphic_Regions/thumbnail.png",
      banner: "GEOGRAPHY FOR COMPETITIVE EXAMS 2026",
      line1: "GEOMORPHIC",
      line2: "REGIONS OF INDIA",
      line3: "HIMALAYA TO ISLANDS",
      badge: "FULL CLASS",
      ribbon: "MAPS • FACTS • MCQ PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Geomorphic Regions of India | Himalayas to Islands | SSC CGL Geography",
      altTitles: ["Himalayas, Plains, Plateau and Coasts of India in One Class", "India Physical Geography for SSC CGL: Complete Chapter"],
      description: "Geomorphic Regions of India is one of the most asked chapters in General Awareness. In this class we learn it step by step in simple words, from the Himalayas in the north to the islands in the sea.\n\n📌 IN THIS CLASS\n✅ Himalayas, passes and glaciers\n✅ Northern Plains and the Indian Desert\n✅ Peninsular Plateau, Western Ghats and Eastern Ghats\n✅ Coastal Plains and Islands of India\n✅ Practice questions with easy explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Himalayas\n00:00 Plains and Deserts\n00:00 Plateau and Ghats\n00:00 Coasts and Islands\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Geography #GeneralAwareness",
      tags: ["geomorphic regions of india", "indian geography", "himalayas", "himalayan passes", "himalayan glaciers", "northern plains of india", "peninsular plateau", "western ghats", "eastern ghats", "coastal plains of india", "islands of india", "indian desert", "deccan plateau", "aravalli range", "ssc cgl geography", "general awareness", "static gk", "physical geography india", "geography mcq", "geography for ssc", "competitive exams", "upsc geography", "banking exams", "railway exams", "defence exams", "SSC CGL", "UPSC", "Banking", "Geomorphic Regions tricks"],
      hashtags: ["SSCCGL", "Geography", "GeneralAwareness"],
      thumbText: "GEOMORPHIC REGIONS OF INDIA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🗺️ New class is live: Geomorphic Regions of India, from the Himalayas to the islands. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Himalayas\n00:00 Plains and Deserts\n00:00 Plateau and Ghats\n00:00 Coasts and Islands",
      playlist: "General Awareness — Geography Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the physical regions of India</u>: the Himalayas, the Northern Plains, the Indian Desert, the Peninsular Plateau, the Coastal Plains and the Islands. Every year the Staff Selection Commission asks several questions from this chapter, so we will learn it slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>30</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>64</b><span>Questions</span></div>
        <div class="cp-stat"><b>~124 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Himalayas</b><br>How the mountains are divided from north to south and by river valleys, and which range is the highest, the lowest and the outermost.</li>
        <li><b>Passes and Glaciers</b><br>Which gap in the mountains joins which two places, and where the famous glaciers are found.</li>
        <li><b>The Great Plains of Northern India</b><br>Bhabar, Terai, Bangar, Khadar and Delta, and the doabs of the Punjab Plain, the Ganga Plain, the Rajasthan Plain and the Brahmaputra Plain.</li>
        <li><b>The Indian Deserts</b><br>Where the Thar Desert and the White Desert lie, and why they are special.</li>
        <li><b>The Peninsular Plateau</b><br>The Aravalli, Malwa, Vindhya, Satpura, Chotanagpur, Meghalaya, Deccan and Karnataka plateaus, and the southern mountains.</li>
        <li><b>The Western and Eastern Ghats</b><br>Their passes, peaks and hills in order from north to south.</li>
        <li><b>The Coastal Plains</b><br>The parts of the west coast and the east coast, with their deltas, kayals and famous places.</li>
        <li><b>The Islands of India</b><br>Andaman and Nicobar, Lakshadweep, and single islands such as Majuli, Pamban and Sriharikota.</li>
        <li><b>Practice</b><br>After each topic you will solve questions, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> physical geography facts such as peaks, passes, plateaus, channels and islands are asked again and again in General Awareness, so learning them in order gives sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🏔️", accent: "#22c55e", pauseTimer: true,
    title: "Northern and North-Eastern Himalayas",
    html: `
      <p class="cp-lead">The Himalayas are the great mountain wall in the north of India. They are <u>young fold mountains</u> that stretch from Jammu and Kashmir in the north-west to Arunachal Pradesh in the east for about <b>2,500 kilometres</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/1.png" alt="Himalayas snow covered mountain range aerial photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The range is wider in the west than in the east. In the west it is about 400 kilometres wide, and in the east it is only about 160 kilometres wide.</p>
      <p class="cp-lead">The mountains bend like a bow. They curve outward towards India (convex) and inward towards Tibet (concave).</p>
      <p class="cp-lead">From north to south, the Himalayas are divided into four main parts, and a fifth part lies in the far north-east.</p>
      <table><thead><tr><th>Part</th><th>What to remember</th></tr></thead><tbody><tr><td>Trans Himalaya</td><td>Northernmost, mostly in Tibet</td></tr><tr><td>Greater Himalaya</td><td>Highest range, always snow-covered</td></tr><tr><td>Lesser Himalaya</td><td>Middle range with hill stations</td></tr><tr><td>Shivalik</td><td>Outermost and lowest range</td></tr><tr><td>North-Eastern Himalaya</td><td>Hills of the far east</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/2.png" alt="Cross-section of the Himalayas from north to south with bands labelled Tibet Plateau, Tran" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Long cracks in the rocks, called faults, separate one range from the next. Each fault has a short name that the exam often uses, and we will learn them one by one.</p>
      <div class="cp-note tip">Think of walking from Tibet down to the plains of Punjab. You cross the Trans, Greater, Lesser and Shivalik ranges in this order.</div>
      <div class="cp-note trap">Do not think the Himalayas are old. They are among the youngest fold mountains in the world, so they are still rising.</div>
      <div class="cp-note exam">Questions often ask which range is the outermost or the highest. Shivalik is the outermost and lowest, and Greater Himalaya is the highest.</div>
      <div class="cp-mnemonic">Trans, Greater, Lesser, Shivalik: from north to south.</div>
    `
  },
  3: {
    questext: "Which of the following is the outermost and lowest range of the Himalayas?",
    options: ["Greater Himalaya", "Lesser Himalaya", "Shivalik", "Trans Himalaya"],
    correct: "3",
    exptext: "✅ Shivalik is the outermost and lowest range, nearest to the plains. 📌 Outer means closest to the plains. ❌ Greater Himalaya is wrong because it is the highest and lies far inside."
  },
  4: {
    questext: "The Himalayas stretch from Jammu and Kashmir to Arunachal Pradesh for a length of about",
    options: ["2,500 kilometres", "1,500 kilometres", "3,500 kilometres", "4,000 kilometres"],
    correct: "1",
    exptext: "✅ The Himalayan arc is about 2,500 kilometres long. 📌 Remember the number 2,500 along with 400 and 160 for the width. ❌ 1,500 kilometres is too short for a range that spans the whole northern border."
  },
  5: {
    type: "concept", icon: "🗺️", accent: "#f59e0b", pauseTimer: true,
    title: "Regional Division of the Himalayas by River Valleys",
    html: `
      <p class="cp-lead">The Himalayas can also be divided from west to east by big river valleys. Each part is named after the two rivers that mark its edges.</p>
      <table><thead><tr><th>Part</th><th>Between rivers</th><th>Length</th><th>Famous for</th></tr></thead><tbody><tr><td>Punjab Himalaya</td><td>Indus and Sutlej</td><td>About 560 kilometres</td><td>Karakoram, Ladakh, Zaskar, Pir Panjal, Dhauladhar</td></tr><tr><td>Kumaon Himalaya</td><td>Sutlej and Kali</td><td>About 320 kilometres</td><td>Nanda Devi</td></tr><tr><td>Nepal Himalaya</td><td>Kali and Teesta</td><td>About 800 kilometres</td><td>Everest, Kanchenjunga, Dhaulagiri, Makalu</td></tr><tr><td>Assam Himalaya</td><td>Teesta and Dihang</td><td>About 750 kilometres</td><td>Kula Kangri and Namcha Barwa</td></tr></tbody></table>
      <p class="cp-lead">The Punjab Himalaya includes both the Kashmir Himalaya and the Himachal Himalaya.</p>
      <p class="cp-lead">The Dihang is the name of the Brahmaputra river as it flows through Arunachal Pradesh.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/3.png" alt="Outline sketch of the Himalayas in four vertical bands labelled Punjab Himalaya, Kumaon Hi" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Nanda Devi is the highest peak of the Kumaon Himalaya, and the highest of the Himalayan peaks that lie fully inside India.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/4.png" alt="Nanda Devi peak Uttarakhand photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Nepal Himalaya is named after the country because it stretches for about 800 kilometres along Nepal. It is not a part of India only.</div>
      <div class="cp-note exam">Questions give two rivers and ask for the Himalayan part. Learn the pairs in order from west to east.</div>
      <div class="cp-mnemonic">Indus-Sutlej, Sutlej-Kali, Kali-Teesta, Teesta-Dihang: Punjab, Kumaon, Nepal, Assam.</div>
    `
  },
  6: {
    questext: "The Kumaon Himalaya lies between which two rivers?",
    options: ["Indus and Sutlej", "Kali and Teesta", "Teesta and Dihang", "Sutlej and Kali"],
    correct: "4",
    exptext: "✅ The Kumaon Himalaya lies between the Sutlej and the Kali rivers. 📌 Kumaon is the second part from the west. ❌ Kali and Teesta is wrong because that is the Nepal Himalaya."
  },
  7: {
    questext: "Mount Everest and Kanchenjunga lie in which regional division of the Himalayas?",
    options: ["Punjab Himalaya", "Nepal Himalaya", "Kumaon Himalaya", "Assam Himalaya"],
    correct: "2",
    exptext: "✅ Everest and Kanchenjunga lie in the Nepal Himalaya, between the Kali and Teesta rivers. 📌 Nepal Himalaya holds the tallest giants. ❌ Kumaon Himalaya is wrong because its highest peak is Nanda Devi."
  },
  8: {
    type: "concept", icon: "❄️", accent: "#ef4444", pauseTimer: true,
    title: "Trans Himalaya",
    html: `
      <p class="cp-lead">The Trans Himalaya lies to the north of the Greater Himalaya. Most of it is in Tibet, so it is also called the <b>Tibetan Himalaya</b> or the Para Himalaya.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/5.png" alt="Karakoram range K2 mountain peak photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It includes the ranges Karakoram, Ladakh, Zaskar and Kailash.</p>
      <table><thead><tr><th>Range</th><th>What to remember</th></tr></thead><tbody><tr><td>Karakoram</td><td>Home of K2 and giant glaciers</td></tr><tr><td>Ladakh</td><td>Cut by the Indus river</td></tr><tr><td>Zaskar</td><td>Lies near the Indus river</td></tr><tr><td>Kailash</td><td>Sacred mountain in Tibet</td></tr></tbody></table>
      <p class="cp-lead">Its highest peak is <b>Godwin Austen, also called K2</b>, at 8,611 metres. It is in the Karakoram range and is the second highest peak in the world.</p>
      <p class="cp-lead">The Karakoram range is called the <b>Backbone of High Asia</b>.</p>
      <p class="cp-lead">Many famous glaciers lie here, such as Siachen, Baltoro, Biafo and Hispar.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/6.png" alt="Siachen glacier Karakoram photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Trans Himalaya is separated from the Greater Himalaya by the Indus-Tsangpo Suture Zone (ITSZ).</p>
      <p class="cp-lead">The Indus river flows between the Zaskar and Ladakh ranges.</p>
      <div class="cp-note trap">Do not mix the Trans Himalaya with the Greater Himalaya. The Trans Himalaya is farther north, beyond the Indus-Tsangpo Suture Zone.</div>
      <div class="cp-note exam">K2 is in the Karakoram range and is the second highest peak of the world. Siachen is a Karakoram glacier.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/7.png" alt="Simple sketch map of the far north showing the Karakoram, Ladakh, Zaskar and Kailash range" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
    `
  },
  9: {
    questext: "Which range is known as the Backbone of High Asia?",
    options: ["Ladakh", "Karakoram", "Zaskar", "Kailash"],
    correct: "2",
    exptext: "✅ The Karakoram range is called the Backbone of High Asia because it holds the highest peaks and longest glaciers. 📌 Karakoram means K2 plus glaciers. ❌ Ladakh range is wrong because the Indus river cuts it and it has lower peaks."
  },
  10: {
    questext: "The Indus-Tsangpo Suture Zone separates the Trans Himalaya from the",
    options: ["Lesser Himalaya", "Shivalik", "Northern Plains", "Greater Himalaya"],
    correct: "4",
    exptext: "✅ This suture zone lies between the Trans Himalaya and the Greater Himalaya. 📌 ITSZ is the first of four faults, counted from the north. ❌ Lesser Himalaya is wrong because the Main Central Thrust separates it from the Greater Himalaya."
  },
  11: {
    type: "concept", icon: "🗻", accent: "#8b5cf6", pauseTimer: true,
    title: "Greater Himalayas",
    html: `
      <p class="cp-lead">The Greater Himalaya is always covered with snow, so it is called <b>Himadri</b> or the Snowy Himalaya. It is the highest range of the Himalayas.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/8.png" alt="Mount Everest Himalaya summit photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It runs from the gorge of the Indus river in the west to Namcha Barwa in Arunachal Pradesh in the east.</p>
      <p class="cp-lead">It is separated from the Lesser Himalaya by the Main Central Thrust (MCT).</p>
      <p class="cp-lead">The highest peaks of the world are in this range. Mount Everest, called Sagarmatha in Nepal, is the highest of all.</p>
      <table><thead><tr><th>Peak</th><th>Height in metres</th></tr></thead><tbody><tr><td>Mount Everest</td><td>8,848</td></tr><tr><td>Kanchenjunga</td><td>8,586</td></tr><tr><td>Makalu</td><td>8,485</td></tr><tr><td>Dhaulagiri</td><td>8,167</td></tr><tr><td>Nanga Parbat</td><td>8,126</td></tr><tr><td>Annapurna</td><td>8,091</td></tr><tr><td>Nanda Devi</td><td>7,816</td></tr><tr><td>Namcha Barwa</td><td>7,782</td></tr></tbody></table>
      <p class="cp-lead">Kanchenjunga, on the border of Sikkim and Nepal, is the highest peak seen from India and the third highest in the world.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/9.png" alt="Kanchenjunga peak Sikkim photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/10.png" alt="Bar chart of the eight peaks in order of height, Everest tallest on the left and Namcha Ba" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-note trap">Everest is the highest peak of the world, but it is not in India. It lies on the border of Nepal and Tibet.</div>
      <div class="cp-note exam">Remember the order Everest, Kanchenjunga, Makalu, Dhaulagiri. Questions often ask which is the third or fourth highest.</div>
      <div class="cp-mnemonic">Every Kind Man Does Not Ask Nobody Nothing: Everest, Kanchenjunga, Makalu, Dhaulagiri, Nanga Parbat, Annapurna, Nanda Devi, Namcha Barwa.</div>
    `
  },
  12: {
    questext: "Which Himalayan range is also known as Himadri?",
    options: ["Greater Himalaya", "Lesser Himalaya", "Shivalik", "Trans Himalaya"],
    correct: "1",
    exptext: "✅ The Greater Himalaya is called Himadri because it stays under snow all year. 📌 Himadri means home of snow. ❌ Lesser Himalaya is wrong because it is lower and mostly snow-free."
  },
  13: {
    questext: "Consider the following statements about the Greater Himalaya:\n1. It is known as Himadri because it is always covered with snow.\n2. Mount Everest is the highest peak of this range.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are true. The range is snow-covered, and Everest at 8,848 metres is its highest peak. 📌 Himadri and Everest go together. ❌ Neither is wrong because both facts are standard."
  },
  14: {
    type: "concept", icon: "🌲", accent: "#14b8a6", pauseTimer: true,
    title: "Lesser Himalayas",
    html: `
      <p class="cp-lead">The Lesser Himalaya, also called the <b>Middle Himalaya</b>, lies to the south of the Greater Himalaya. It is also known as the Himachal range or the Mahabharat range.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/11.png" alt="Gulmarg meadow Kashmir Pir Panjal photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Between the Greater and Lesser Himalaya lie lovely valleys such as the Kashmir valley, Lahaul-Spiti, Kullu and Kangra.</p>
      <p class="cp-lead">The Kashmir valley has thick layers of old lake mud, called <b>Karewa</b>. This land is famous for growing saffron.</p>
      <table><thead><tr><th>Range</th><th>Where it is</th></tr></thead><tbody><tr><td>Pir Panjal</td><td>Jammu and Kashmir, the longest range of the Lesser Himalaya</td></tr><tr><td>Dhauladhar</td><td>Himachal Pradesh, with the Kangra and Kullu valleys</td></tr><tr><td>Mussoorie</td><td>Uttarakhand</td></tr><tr><td>Mahabharat</td><td>Nepal</td></tr></tbody></table>
      <p class="cp-lead">Small grasslands on the slopes are called <b>Marg</b> in Kashmir, such as Sonamarg and Gulmarg, and <b>Bugyal</b> or <b>Payar</b> in Uttarakhand.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/12.png" alt="Dhauladhar range Dharamshala Kangra photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Many hill stations lie in this range, such as Shimla, Mussoorie, Nainital, Ranikhet and Darjeeling.</p>
      <p class="cp-lead">The Kathmandu valley lies between the Lesser Himalaya and the Greater Himalaya.</p>
      <div class="cp-note tip">Marg means meadow. For example, Gulmarg means a meadow of flowers.</div>
      <div class="cp-note trap">Saffron grows on the Karewa land of the Kashmir valley. Karewa is old lake mud, not rock.</div>
      <div class="cp-note exam">Pir Panjal is the longest range of the Lesser Himalaya, and Dhauladhar is the range of Himachal Pradesh.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/13.png" alt="Saffron flowers Pampore Kashmir field photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
    `
  },
  15: {
    questext: "Which is the longest range of the Lesser Himalaya?",
    options: ["Dhauladhar", "Mussoorie", "Pir Panjal", "Mahabharat"],
    correct: "3",
    exptext: "✅ The Pir Panjal range in Jammu and Kashmir is the longest range of the Lesser Himalaya. 📌 Pir Panjal means the longest. ❌ Dhauladhar is wrong because it is a shorter range in Himachal Pradesh."
  },
  16: {
    questext: "Small mountain grasslands called Marg are found in",
    options: ["Kashmir", "Uttarakhand", "Sikkim", "Arunachal Pradesh"],
    correct: "1",
    exptext: "✅ Marg is the local word for a meadow in Kashmir, as in Sonamarg and Gulmarg. 📌 Marg means meadow. ❌ Uttarakhand is wrong because meadows there are called Bugyal or Payar."
  },
  17: {
    type: "concept", icon: "🏞️", accent: "#ec4899", pauseTimer: true,
    title: "Shivalik or Brahma Himalayas",
    html: `
      <p class="cp-lead">The Shivalik range, also called the <b>Outer Himalaya</b>, is the outermost and lowest range. It stretches from the Potwar region of Pakistan to Assam.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/14.png" alt="Shivalik hills Himachal Haridwar foothills photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Between the Shivalik and the Lesser Himalaya there are many flat valleys. In the west they are called <b>Doon</b> and in the east they are called <b>Dwar</b>. For example, Dehradun is in a Doon.</p>
      <p class="cp-lead">Each range is separated from the next by a fault. Four faults are important.</p>
      <table><thead><tr><th>Fault</th><th>Short name</th><th>Separates</th></tr></thead><tbody><tr><td>Indus-Tsangpo Suture Zone</td><td>ITSZ</td><td>Trans Himalaya from Greater Himalaya</td></tr><tr><td>Main Central Thrust</td><td>MCT</td><td>Greater Himalaya from Lesser Himalaya</td></tr><tr><td>Main Boundary Fault</td><td>MBF</td><td>Lesser Himalaya from Shivalik</td></tr><tr><td>Himalayan Frontal Fault</td><td>HFF</td><td>Shivalik from the Northern Plains</td></tr></tbody></table>
      <p class="cp-lead">The Himalayan Frontal Fault marks the point where the mountains stop and the flat plains begin.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/15.png" alt="Cross-section from north to south showing Trans Himalaya, Greater Himalaya, Lesser Himalay" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Main Boundary Fault and the Himalayan Frontal Fault are easy to mix up. MBF is between the Lesser Himalaya and Shivalik, and HFF is between Shivalik and the plains.</div>
      <div class="cp-note exam">Doon valleys are in the west, such as Dehradun, and Dwar valleys are in the east, such as the Duars of Bengal and Assam.</div>
      <div class="cp-mnemonic">In Mid-Morning, Have Food: ITSZ, MCT, MBF, HFF from north to south.</div>
    `
  },
  18: {
    questext: "The Himalayan Frontal Fault separates the Shivalik range from the",
    options: ["Greater Himalaya", "Lesser Himalaya", "Trans Himalaya", "Northern Plains"],
    correct: "4",
    exptext: "✅ The Himalayan Frontal Fault lies at the foot of the Shivalik and meets the plains. 📌 Frontal means front or edge. ❌ Lesser Himalaya is wrong because the Main Boundary Fault separates it from the Shivalik."
  },
  19: {
    questext: "The flat structural valleys between the Shivalik and the Lesser Himalaya in the west are called",
    options: ["Dwar", "Doon", "Marg", "Bugyal"],
    correct: "2",
    exptext: "✅ These valleys are called Doon in the west, such as Dehradun. 📌 Doon in the west, Dwar in the east. ❌ Dwar is wrong because it is the name used in the east."
  },
  20: {
    type: "concept", icon: "🧭", accent: "#3b82f6", pauseTimer: true,
    title: "North-Eastern Himalayas",
    html: `
      <p class="cp-lead">In the north-east, the Himalayan ranges have different local names in different states. Together, the hills of Nagaland, Manipur and Mizoram are called the Purvanchal hills.</p>
      <table><thead><tr><th>Hills</th><th>State</th></tr></thead><tbody><tr><td>Dafla, Miri, Abor, Mishmi, Patkai Bum</td><td>Arunachal Pradesh</td></tr><tr><td>Naga Hills</td><td>Nagaland</td></tr><tr><td>Manipur Hills</td><td>Manipur</td></tr><tr><td>Mizo Hills</td><td>Mizoram</td></tr><tr><td>Tripura Hills</td><td>Tripura</td></tr><tr><td>Garo, Khasi, Jaintia Hills</td><td>Meghalaya</td></tr><tr><td>Mikir Hills</td><td>Assam</td></tr><tr><td>Barail Range</td><td>Assam, Manipur and Nagaland</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/16.png" alt="Outline map of north-east India with the hill names Dafla, Miri, Abor, Mishmi, Patkai Bum," style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The hills of Arunachal Pradesh lie in the north, close to the border with China.</p>
      <p class="cp-lead">The Naga, Manipur and Mizo hills run from north to south in the far east.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/17.png" alt="Mizo Hills Mizoram green hills landscape photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Learn the pairs by name. The Naga Hills belong to Nagaland, the Mizo Hills belong to Mizoram, and the Tripura Hills belong to Tripura.</div>
      <div class="cp-note trap">The Mikir Hills are in Assam, not in Meghalaya. Meghalaya has Garo, Khasi and Jaintia hills.</div>
      <div class="cp-note exam">Questions give a hill and ask for the state. Match the hill name with the state name.</div>
      <div class="cp-mnemonic">Dafla, Miri, Abor, Mishmi: the hills of Arunachal Pradesh.</div>
    `
  },
  21: {
    questext: "The Mizo Hills are located in",
    options: ["Manipur", "Mizoram", "Tripura", "Nagaland"],
    correct: "2",
    exptext: "✅ The Mizo Hills lie in Mizoram. 📌 Mizo hills means Mizoram. ❌ Manipur is wrong because its own hills are called the Manipur Hills."
  },
  22: {
    questext: "Which of the following hills is NOT located in Meghalaya?",
    options: ["Garo Hills", "Khasi Hills", "Jaintia Hills", "Mikir Hills"],
    correct: "4",
    exptext: "✅ The Mikir Hills are in Assam. 📌 Meghalaya has three hills: Garo, Khasi and Jaintia. ❌ Garo Hills is wrong because it is in Meghalaya."
  },
  23: {
    type: "concept", icon: "🌸", accent: "#84cc16", pauseTimer: true,
    title: "Regional Division of the Himalayas by Land Form",
    html: `
      <p class="cp-lead">The Himalayas are also divided into five regions on the basis of land form: Kashmir, Himachal and Uttarakhand, Darjeeling and Sikkim, Arunachal, and the Eastern Hills.</p>
      <table><thead><tr><th>Region</th><th>Key facts</th></tr></thead><tbody><tr><td>Kashmir or North-Western Himalaya</td><td>Karakoram, Jaskar, Ladakh and Pir Panjal ranges. Dal and Wular lakes have fresh water. Pangong and Tso Moriri lakes have salty water. Vaishno Devi and Amarnath are pilgrimage sites</td></tr><tr><td>Himachal and Uttarakhand Himalaya</td><td>Between the Ravi river and the Kali river. Valley of Flowers, Gangotri, Yamunotri, Kedarnath, Badrinath and Hemkund Sahib</td></tr><tr><td>Darjeeling and Sikkim Himalaya</td><td>Between the Nepal Himalaya and the Bhutan Himalaya. The Lepcha tribe lives in the high north</td></tr><tr><td>Arunachal Himalaya</td><td>From the Bhutan Himalaya to the Diphu Pass. Namcha Barwa and Kangto peaks. Tribes such as Monpa, Dafla, Abor, Mishmi and Nishi</td></tr><tr><td>Eastern Hills</td><td>Patkai Bum, Naga, Manipur, Mizo and Lushai hills. Loktak Lake in Manipur. Mizoram is made of soft rocks</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/18.png" alt="Pangong Lake Ladakh blue salt water photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A <b>prayag</b> is a place where two rivers meet. Devprayag, Karnaprayag, Vishnuprayag and Rudraprayag are the major prayags of Uttarakhand.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/19.png" alt="Valley of Flowers Uttarakhand photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Loktak Lake lies in the middle of the Manipur valley and is surrounded by hills on all sides.</p>
      <p class="cp-lead">Mizoram is also called the <b>Molasses Basin</b> because it is made of soft and loose rocks.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/20.png" alt="Loktak Lake Manipur floating islands photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Dal and Wular lakes are fresh water lakes, but Pangong and Tso Moriri lakes are salty. Do not mix them.</div>
      <div class="cp-note exam">Loktak Lake is in Manipur, and the Lepcha tribe lives in Sikkim and Darjeeling.</div>
    `
  },
  24: {
    questext: "Loktak Lake is located in",
    options: ["Manipur", "Mizoram", "Nagaland", "Tripura"],
    correct: "1",
    exptext: "✅ Loktak Lake lies in the middle of the Manipur valley. 📌 Loktak and Manipur both have the letter M inside. ❌ Mizoram is wrong because it is known for the Molasses Basin."
  },
  25: {
    questext: "Consider the following statements:\n1. Dal Lake and Wular Lake in Kashmir have fresh water.\n2. Pangong Lake has salty water.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Dal and Wular have fresh water, while Pangong is a salty lake. 📌 Valley lakes are fresh, high mountain lakes are salty. ❌ Only 1 is wrong because Pangong is also described correctly."
  },
  26: {
    type: "concept", icon: "🛣️", accent: "#06b6d4", pauseTimer: true,
    title: "Major Passes of the Himalayas",
    html: `
      <p class="cp-lead">A <b>pass</b> is a gap between mountains that people use to cross them. In Tibetan languages the word <b>La</b> means a pass.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/21.png" alt="Nathu La pass Sikkim India China border photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Pass</th><th>Range or region</th><th>State</th><th>Connects</th></tr></thead><tbody><tr><td>Banihal</td><td>Pir Panjal, Lesser Himalaya</td><td>Jammu and Kashmir</td><td>Jammu and Srinagar</td></tr><tr><td>Zoji La</td><td>Zaskar range, Greater Himalaya</td><td>Jammu and Kashmir</td><td>Srinagar, Kargil and Leh</td></tr><tr><td>Burzil (Burji La)</td><td>Greater Himalaya</td><td>Jammu and Kashmir</td><td>Srinagar and Gilgit</td></tr><tr><td>Karakoram Pass</td><td>Karakoram range</td><td>Ladakh</td><td>India and China</td></tr><tr><td>Rohtang</td><td>Pir Panjal, Lesser Himalaya</td><td>Himachal Pradesh</td><td>Kullu and Lahaul-Spiti, on the Manali to Leh road</td></tr><tr><td>Shipki La</td><td>Greater Himalaya</td><td>Himachal Pradesh</td><td>India and Tibet</td></tr><tr><td>Niti, Mana and Lipu Lekh</td><td>Greater Himalaya</td><td>Uttarakhand</td><td>India and Tibet</td></tr><tr><td>Nathu La and Jelep La</td><td>Greater Himalaya</td><td>Sikkim</td><td>Gangtok and Lhasa</td></tr><tr><td>Bomdi La</td><td>North-Eastern Himalaya</td><td>Arunachal Pradesh</td><td>Arunachal Pradesh and Lhasa in Tibet</td></tr><tr><td>Diphu</td><td>North-Eastern Himalaya</td><td>Arunachal Pradesh</td><td>Near the borders of India, China and Myanmar</td></tr></tbody></table>
      <p class="cp-lead">Banihal is on the road between Srinagar and Jammu. Rohtang is called the gateway to the Lahaul-Spiti district.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/22.png" alt="Rohtang Pass Manali snow road photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Nathu La was once a branch of the ancient Silk Route between India and China.</p>
      <div class="cp-note tip">Match the pass to its state first, then to its route. For example, Nathu La and Jelep La both lead from Sikkim to Lhasa.</div>
      <div class="cp-note trap">Nathu La is in Sikkim, not in Arunachal Pradesh. The pass of Arunachal Pradesh to Lhasa is Bomdi La.</div>
      <div class="cp-note exam">Banihal is in the Pir Panjal range. Zoji La links Srinagar, Kargil and Leh.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/23.png" alt="Zoji La pass road Kashmir Ladakh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
    `
  },
  27: {
    questext: "Which pass connects Gangtok in Sikkim with Lhasa in Tibet?",
    options: ["Rohtang", "Banihal", "Nathu La", "Zoji La"],
    correct: "3",
    exptext: "✅ Nathu La in Sikkim links Gangtok with Lhasa. 📌 Nathu La means Sikkim. ❌ Rohtang is wrong because it is in Himachal Pradesh."
  },
  28: {
    questext: "Zoji La lies in which mountain range?",
    options: ["Zaskar", "Pir Panjal", "Dhauladhar", "Karakoram"],
    correct: "1",
    exptext: "✅ Zoji La lies in the Zaskar range and links Srinagar, Kargil and Leh. 📌 Zoji means Zaskar. ❌ Pir Panjal is wrong because Banihal lies there."
  },
  29: {
    questext: "Banihal Pass lies in which mountain range?",
    options: ["Zaskar", "Karakoram", "Ladakh", "Pir Panjal"],
    correct: "4",
    exptext: "✅ Banihal Pass lies in the Pir Panjal range and connects Jammu with Srinagar. 📌 Banihal and Pir Panjal both belong to the Lesser Himalaya. ❌ Zaskar is wrong because Zoji La is there."
  },
  30: {
    type: "concept", icon: "🧊", accent: "#a855f7", pauseTimer: true,
    title: "Major Glaciers of the Himalayas",
    html: `
      <p class="cp-lead">A glacier is a huge slow-moving river of ice. In the Himalayas, glaciers feed the rivers, so many Himalayan rivers flow all year.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/24.png" alt="Siachen glacier long ice river photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Glacier</th><th>Location</th></tr></thead><tbody><tr><td>Siachen</td><td>Karakoram</td></tr><tr><td>Baltoro</td><td>Karakoram</td></tr><tr><td>Biafo</td><td>Karakoram</td></tr><tr><td>Hispar</td><td>Karakoram</td></tr><tr><td>Zemu</td><td>Kanchenjunga region, Sikkim</td></tr><tr><td>Gangotri</td><td>Garhwal, Uttarakhand</td></tr><tr><td>Pindari</td><td>Kumaon, Uttarakhand</td></tr><tr><td>Milam</td><td>Kumaon, Uttarakhand</td></tr><tr><td>Chorabari</td><td>Uttarakhand</td></tr></tbody></table>
      <p class="cp-lead">Siachen is one of the longest glaciers outside the polar regions. It lies in the Karakoram range.</p>
      <p class="cp-lead">Gangotri is the glacier from which the river Bhagirathi starts. The Bhagirathi later becomes the Ganga.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/25.png" alt="Gangotri glacier Gaumukh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Zemu is the largest glacier of the eastern Himalaya, close to Kanchenjunga.</p>
      <p class="cp-lead">The glaciers of the Karakoram are longer than those of the other Himalayan ranges.</p>
      <div class="cp-note trap">Gangotri, Pindari and Milam are in Uttarakhand, not in the Karakoram.</div>
      <div class="cp-note exam">Four Karakoram glaciers are asked again and again: Siachen, Baltoro, Biafo and Hispar.</div>
      <div class="cp-mnemonic">Karakoram glaciers: SBBH, that is Siachen, Baltoro, Biafo, Hispar.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/26.png" alt="Sketch map of the Himalayas with glaciers marked: Siachen, Baltoro, Biafo and Hispar in th" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
    `
  },
  31: {
    questext: "Which glacier is located in Sikkim?",
    options: ["Siachen", "Zemu", "Milam", "Biafo"],
    correct: "2",
    exptext: "✅ Zemu lies near Kanchenjunga in Sikkim. 📌 Z for Zemu, Z for Zero in the east. ❌ Milam is wrong because it is in Kumaon, Uttarakhand."
  },
  32: {
    questext: "Which of the following glaciers is NOT in the Karakoram range?",
    options: ["Siachen", "Milam", "Biafo", "Hispar"],
    correct: "2",
    exptext: "✅ Milam is a Kumaon glacier in Uttarakhand. 📌 Milam is Kumaon, so not Karakoram. ❌ Biafo is wrong because it is a Karakoram glacier."
  },
  33: {
    type: "concept", icon: "🌾", accent: "#e11d48", pauseTimer: true,
    title: "The Great Plains of Northern India",
    html: `
      <p class="cp-lead">The plains of north India were made by the soil, sand and mud that the Indus, Ganga and Brahmaputra rivers and their tributaries carried from the mountains.</p>
      <p class="cp-lead">On the basis of land form, they are divided into five parts: <b>Bhabar, Terai, Bangar, Khadar and Delta</b>.</p>
      <table><thead><tr><th>Part</th><th>Where it lies</th><th>What it is like</th></tr></thead><tbody><tr><td>Bhabar</td><td>At the foot of the Shivalik hills, about 8 to 16 kilometres wide</td><td>Full of pebbles, so rivers sink underground. Not good for farming</td></tr><tr><td>Terai</td><td>South of the Bhabar</td><td>Marshy land where the lost rivers come up again. Good for sugarcane, rice and wheat</td></tr><tr><td>Bangar</td><td>High land of the plain</td><td>Old alluvial soil, mainly in Punjab and Uttar Pradesh</td></tr><tr><td>Khadar</td><td>Low land near rivers</td><td>New alluvial soil, very fertile, in eastern Uttar Pradesh, Bihar and West Bengal</td></tr><tr><td>Delta</td><td>Lower Ganga region</td><td>Built where the river meets the sea, in West Bengal</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/27.png" alt="Cross-section from the Himalaya to a river valley showing Bhabar, Terai, Bangar and Khadar" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Rivers drop heavy pebbles at the foot of the hills. The water sinks into these pebbles in the Bhabar and comes out again in the Terai.</p>
      <p class="cp-lead">Bangar has small patches of salty land, called Reh or Kallar, in dry areas.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/28.png" alt="Terai grassland Dudhwa forest Uttar Pradesh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Think of water moving south. It sinks at Bhabar, rises at Terai, and then flows across the plain.</div>
      <div class="cp-note trap">Bangar is old and high, while Khadar is new and low. Floods bring fresh soil to Khadar, not to Bangar.</div>
      <div class="cp-note exam">Bhabar has pebbles, Terai is marshy, and Khadar is the most fertile part.</div>
    `
  },
  34: {
    questext: "The marshy region to the south of the Bhabar is called",
    options: ["Bangar", "Khadar", "Delta", "Terai"],
    correct: "4",
    exptext: "✅ The Terai is the marshy belt where the rivers lost in the Bhabar reappear. 📌 Bhabar sinks, Terai rises. ❌ Bangar is wrong because it is old high land, not a marsh."
  },
  35: {
    questext: "Which part of the northern plains is made of new alluvial soil?",
    options: ["Khadar", "Bangar", "Bhabar", "Terai"],
    correct: "1",
    exptext: "✅ Khadar is the low land made of new alluvium that floods renew every year. 📌 Khadar is fresh, Bangar is old. ❌ Bangar is wrong because it is made of old alluvium."
  },
  36: {
    type: "concept", icon: "🌱", accent: "#10b981", pauseTimer: true,
    title: "Punjab Plain",
    html: `
      <p class="cp-lead">The plain made by the Indus and its tributaries, the Jhelum, Chenab, Ravi, Beas and Sutlej, is the <b>Punjab Plain</b>. Most of it lies in Pakistan, and only a part lies in India.</p>
      <p class="cp-lead">In India, the Bari and Bist Doabs are the most important parts. They are well developed for farming.</p>
      <p class="cp-lead">A <b>Doab</b> is the land between two rivers. The word means two waters.</p>
      <table><thead><tr><th>Doab</th><th>Between the rivers</th></tr></thead><tbody><tr><td>Bist</td><td>Beas and Sutlej</td></tr><tr><td>Bari</td><td>Beas and Ravi</td></tr><tr><td>Rachna</td><td>Ravi and Chenab</td></tr><tr><td>Chaj</td><td>Chenab and Jhelum</td></tr><tr><td>Sindh Sagar</td><td>Indus on one side, Jhelum and Chenab on the other</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/29.png" alt="Sketch map of the five Punjab rivers Sutlej, Beas, Ravi, Chenab and Jhelum and the Indus, " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The old alluvial land, called Bangar, in Punjab is sometimes called badland because it is less fertile.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/30.png" alt="Wheat fields Punjab green farmland photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Walk west from the Sutlej and you meet the doabs in this order: Bist, Bari, Rachna, Chaj, Sindh Sagar.</div>
      <div class="cp-note trap">Do not mix the Bari Doab and the Bist Doab. Bari lies between Beas and Ravi, and Bist lies between Beas and Sutlej.</div>
      <div class="cp-note exam">Questions give two rivers and ask for the doab.</div>
      <div class="cp-mnemonic">Sutlej, Beas, Ravi, Chenab, Jhelum, Indus: the rivers in order from east to west.</div>
    `
  },
  37: {
    questext: "The Bari Doab lies between which two rivers?",
    options: ["Sutlej and Beas", "Ravi and Chenab", "Beas and Ravi", "Chenab and Jhelum"],
    correct: "3",
    exptext: "✅ The Bari Doab lies between the Beas and the Ravi. 📌 Bari means Beas plus Ravi. ❌ Sutlej and Beas is wrong because that is the Bist Doab."
  },
  38: {
    questext: "Which doab lies between the Chenab and the Jhelum?",
    options: ["Bist", "Rachna", "Chaj", "Sindh Sagar"],
    correct: "3",
    exptext: "✅ The Chaj Doab lies between the Chenab and the Jhelum. 📌 Chaj and Chenab both start with C. ❌ Rachna is wrong because it lies between the Ravi and the Chenab."
  },
  39: {
    type: "concept", icon: "🌊", accent: "#eab308", pauseTimer: true,
    title: "Ganga Plain",
    html: `
      <p class="cp-lead">The Ganga Plain spreads across Uttar Pradesh, Bihar and West Bengal. It is divided into three parts.</p>
      <table><thead><tr><th>Part</th><th>Regions in it</th></tr></thead><tbody><tr><td>Upper Ganga Plain</td><td>Rohilkhand and Awadh plains</td></tr><tr><td>Middle Ganga Plain</td><td>Eastern Uttar Pradesh and Bihar, including the Saran, Magadha and Mithila plains</td></tr><tr><td>Lower Ganga Plain</td><td>West Bengal plain</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/31.png" alt="Tree diagram with Ganga Plain at the top and three branches: Upper (Rohilkhand, Awadh), Mi" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Middle Ganga Plain is the area that floods the most, because many big rivers meet here and the land is almost flat.</p>
      <p class="cp-lead">Low, wet hollows appear in the plain. They are called <b>Jala</b> near Patna, <b>Taal</b> near Mokama, and in West Bengal the water-filled hollows are called <b>Beel</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/32.png" alt="Ganga river Varanasi ghats morning photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Because the land is flat, floodwater spreads wide and stays long. That is why the Middle Ganga Plain is troubled by floods.</div>
      <div class="cp-note trap">Awadh belongs to the Upper Ganga Plain, and Magadha and Mithila belong to the Middle Ganga Plain.</div>
      <div class="cp-note exam">The most flood-affected part of the plain is the Middle Ganga Plain.</div>
    `
  },
  40: {
    questext: "Which part of the Ganga Plain is most affected by floods?",
    options: ["Upper Ganga Plain", "Lower Ganga Plain", "Punjab Plain", "Middle Ganga Plain"],
    correct: "4",
    exptext: "✅ The Middle Ganga Plain is flat, and many rivers meet there, so floods are common. 📌 Middle means most floods. ❌ Lower Ganga Plain is wrong because it is better drained near the sea."
  },
  41: {
    questext: "Rohilkhand belongs to which part of the Ganga Plain?",
    options: ["Middle Ganga Plain", "Upper Ganga Plain", "Lower Ganga Plain", "Brahmaputra Plain"],
    correct: "2",
    exptext: "✅ Rohilkhand and Awadh make the Upper Ganga Plain. 📌 Rohilkhand and Awadh are the upper pair. ❌ Middle Ganga Plain is wrong because it has the Bihar plains."
  },
  42: {
    type: "concept", icon: "🐪", accent: "#0ea5e9", pauseTimer: true,
    title: "Rajasthan Plain and Brahmaputra Plain",
    html: `
      <p class="cp-lead">The <b>Rajasthan Plain</b> lies to the west of the Aravalli Mountains, up to the India-Pakistan border. It has the plains of Punjab and Haryana in the north and the plains of Gujarat in the south.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/33.png" alt="Sketch map of Rajasthan with the Aravalli line running from south-west to north-east and a" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The line of 25 centimetres of yearly rainfall divides the Thar Desert in the west from the semi-dry land of Rajasthan Bagar in the east. The fertile land of the Bagar is called <b>Rohi</b>.</p>
      <p class="cp-lead">The Thar Desert is important for mineral oil, gypsum and salt. The Indira Gandhi Canal brings water here for farming.</p>
      <p class="cp-lead"><b>Sambhar Lake</b> is the largest inland salt water lake in India, and the <b>Luni</b> is the major river of this plain.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/34.png" alt="Sambhar Salt Lake Rajasthan photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Brahmaputra Plain</b> is the far eastern part of the great northern plain. It is drained by the Brahmaputra river and its tributaries.</p>
      <p class="cp-lead">The slope is very gentle, so many river islands have formed here, such as Majuli Island.</p>
      <p class="cp-lead">This plain is one of the most fertile in India, and rice and jute are the main crops.</p>
      <table><thead><tr><th>Plain</th><th>Key facts</th></tr></thead><tbody><tr><td>Rajasthan Plain</td><td>Thar Desert, Rohi, Sambhar Lake, Luni river, Indira Gandhi Canal</td></tr><tr><td>Brahmaputra Plain</td><td>Gentle slope, river islands, rice and jute</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/35.png" alt="Brahmaputra river Assam plain boats photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Rajasthan Plain lies west of the Aravalli, not east. The Aravalli forms its eastern edge.</div>
      <div class="cp-note exam">Sambhar is the largest inland salt lake, and the 25 centimetre rainfall line divides the desert from the Bagar.</div>
    `
  },
  43: {
    questext: "Which is the largest inland salt water lake of India?",
    options: ["Chilika", "Sambhar", "Loktak", "Pulicat"],
    correct: "2",
    exptext: "✅ Sambhar Lake in Rajasthan is the largest inland salt water lake in India. 📌 Sambhar means salt. ❌ Chilika is wrong because it is a lagoon by the sea, not an inland lake."
  },
  44: {
    questext: "The main river of the Rajasthan Plain is",
    options: ["Chambal", "Banas", "Sabarmati", "Luni"],
    correct: "4",
    exptext: "✅ The Luni is the major river of the Rajasthan Plain and flows through the Thar Desert. 📌 Luni is the lone river of the desert. ❌ Chambal is wrong because it flows in eastern Rajasthan."
  },
  45: {
    type: "concept", icon: "🏜️", accent: "#d946ef", pauseTimer: true,
    title: "Indian Deserts",
    html: `
      <p class="cp-lead">An area that receives 25 centimetres or less of yearly rain is called a <b>desert</b>.</p>
      <p class="cp-lead">The <b>Thar Desert</b> lies to the north-west and west of the Aravalli hills. It is a rolling plain covered with sand dunes.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/36.png" alt="Thar Desert Jaisalmer sand dunes photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Most of the Thar Desert is in Rajasthan, but some parts spread into Punjab, Haryana and Gujarat.</p>
      <p class="cp-lead">Among all the deserts of the world, the Thar Desert has the highest number of people living in each square kilometre.</p>
      <table><thead><tr><th>Desert</th><th>State</th><th>Special feature</th></tr></thead><tbody><tr><td>Thar Desert</td><td>Mostly Rajasthan</td><td>Sand dunes and the Luni river</td></tr><tr><td>Rann of Kutch</td><td>Gujarat</td><td>White salt marsh</td></tr><tr><td>Cold desert</td><td>Ladakh</td><td>High, cold and dry</td></tr></tbody></table>
      <p class="cp-lead">The <b>Rann of Kutch</b> is also called the <b>White Desert</b>. It is made of salt marshes that spread over thousands of square kilometres.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/37.png" alt="Rann of Kutch white salt desert Gujarat photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Luni is the main river of this region, and it ends in the Rann of Kutch.</p>
      <div class="cp-note trap">The Rann of Kutch is a salt marsh, not a sand desert. That is why it looks white.</div>
      <div class="cp-note exam">Thar has the highest population density among world deserts. Rann of Kutch is the White Desert.</div>
    `
  },
  46: {
    questext: "Which desert has the highest density of population among the deserts of the world?",
    options: ["Thar", "Sahara", "Gobi", "Kalahari"],
    correct: "1",
    exptext: "✅ The Thar Desert is the most thickly populated desert in the world. 📌 Thar is the crowded desert. ❌ Sahara is wrong because it is vast but has very few people per square kilometre."
  },
  47: {
    questext: "The Rann of Kutch is also known as the",
    options: ["Black Desert", "Cold Desert", "White Desert", "Red Desert"],
    correct: "3",
    exptext: "✅ The Rann of Kutch is a salt marsh that looks white, so it is called the White Desert. 📌 Salt means white. ❌ Cold Desert is wrong because that name is used for Ladakh."
  },
  48: {
    type: "concept", icon: "🔺", accent: "#64748b", pauseTimer: true,
    title: "Peninsular Plateau",
    html: `
      <p class="cp-lead">The Peninsular Plateau is an irregular triangle of old land. It reaches from the Aravalli range and Delhi in the north-west to the Rajmahal hills in the east, the Gir hills in the west, the Cardamom hills in the south, and the Shillong plateau in the north-east.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/38.png" alt="Outline map of peninsular India as a triangle with the Aravalli, Rajmahal hills, Gir hills" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It was formed when the old super-continent Gondwanaland broke up. It is made of very old crystalline, igneous and metamorphic rocks.</p>
      <p class="cp-lead">The land slopes from west to east, so most peninsular rivers flow east into the Bay of Bengal. Godavari, Krishna, Mahanadi and Kaveri are examples.</p>
      <p class="cp-lead">In the north, the slope is towards the north and east, so the Son, Chambal and Damodar flow that way.</p>
      <p class="cp-lead">The <b>Narmada and Tapi</b> flow from east to west. They flow in rift valleys, which are long cracks in the land.</p>
      <table><thead><tr><th>Part of the plateau</th><th>What it includes</th></tr></thead><tbody><tr><td>Central Highlands</td><td>Malwa, Bundelkhand and Vindhya region</td></tr><tr><td>Eastern Plateau</td><td>Chotanagpur, Chhattisgarh Basin and Dandakaranya</td></tr><tr><td>North-Eastern Plateau</td><td>Meghalaya or Shillong plateau</td></tr><tr><td>Deccan Plateau</td><td>Deccan Trap, Karnataka and Andhra plateaus</td></tr></tbody></table>
      <p class="cp-lead">It is called the <b>plateau of plateaus</b> because it is made up of many smaller plateaus.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/39.png" alt="Deccan Plateau landscape Maharashtra rocky hills photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Most peninsular rivers flow east, but Narmada and Tapi flow west because of their rift valleys.</div>
      <div class="cp-note exam">Questions ask which rivers flow westwards. The answer is Narmada and Tapi.</div>
    `
  },
  49: {
    questext: "Which two rivers of the Peninsular Plateau flow towards the west through rift valleys?",
    options: ["Godavari and Krishna", "Narmada and Tapi", "Mahanadi and Kaveri", "Son and Damodar"],
    correct: "2",
    exptext: "✅ Narmada and Tapi flow west in rift valleys. 📌 Most rivers go east, only these two go west. ❌ Godavari and Krishna are wrong because they flow east into the Bay of Bengal."
  },
  50: {
    questext: "The Peninsular Plateau was formed after the breaking of",
    options: ["Laurasia", "Tethys Sea", "Angaraland", "Gondwanaland"],
    correct: "4",
    exptext: "✅ The plateau is a part of the old super-continent Gondwanaland. 📌 Gondwana means the southern land. ❌ Laurasia is wrong because it was the northern land."
  },
  51: {
    type: "concept", icon: "⛰️", accent: "#fb7185", pauseTimer: true,
    title: "Aravalli Mountain Range",
    html: `
      <p class="cp-lead">The Aravalli is the oldest fold mountain range of India. It is now worn down by time, so it is called a <b>residual mountain</b>. It began in the Pre-Cambrian period.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/40.png" alt="Aravalli hills Rajasthan range photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It stretches for about 800 kilometres from Delhi in the north-east to Palanpur in Gujarat in the south-west.</p>
      <p class="cp-lead">It separates the Rajasthan Bagar from the central highlands, and it is the main <b>water divide</b> of western India. This means rivers on one side flow towards the desert and rivers on the other side flow towards the Ganga plain.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Age</td><td>Pre-Cambrian, the oldest fold mountains</td></tr><tr><td>Length</td><td>About 800 kilometres, Delhi to Palanpur</td></tr><tr><td>Highest peak</td><td>Guru Shikhar on Mount Abu</td></tr><tr><td>Minerals</td><td>Copper, lead, zinc, mica and limestone</td></tr></tbody></table>
      <p class="cp-lead">The Luni river starts here and flows through the Rajasthan Bagar and the Thar Desert. It ends in the Rann of Kutch without reaching the sea, so it is an example of inland drainage.</p>
      <p class="cp-lead">Sukri and Jawai are important tributaries of the Luni.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/41.png" alt="Guru Shikhar Mount Abu highest peak Aravalli photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The famous Dilwara Jain temples are on Mount Abu.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/42.png" alt="Dilwara Jain temple Mount Abu marble photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Aravalli is a fold mountain but not young like the Himalayas. It is very old and low.</div>
      <div class="cp-note exam">Guru Shikhar is its highest peak, and the Luni river starts here.</div>
    `
  },
  52: {
    questext: "Which is the highest peak of the Aravalli range?",
    options: ["Guru Shikhar", "Dhoopgarh", "Doddabetta", "Parasnath"],
    correct: "1",
    exptext: "✅ Guru Shikhar on Mount Abu is the highest peak of the Aravalli. 📌 Guru means the highest teacher peak. ❌ Dhoopgarh is wrong because it is the highest peak of the Satpura range."
  },
  53: {
    questext: "The Luni river originates from which hills?",
    options: ["Vindhya", "Satpura", "Aravalli", "Western Ghats"],
    correct: "3",
    exptext: "✅ The Luni starts in the Aravalli hills and flows through the Thar Desert. 📌 Luni and Aravalli are both in Rajasthan. ❌ Vindhya is wrong because rivers like the Chambal start there."
  },
  54: {
    type: "concept", icon: "🌋", accent: "#2dd4bf", pauseTimer: true,
    title: "Malwa Plateau, Vindhya Range and Satpura Range",
    html: `
      <p class="cp-lead">The <b>Malwa Plateau</b> in Madhya Pradesh is made of basalt rock. In Rajasthan it is called the Hadauti Plateau.</p>
      <p class="cp-lead">The Chambal, Narmada and Tapi are the major rivers here. The Chambal valley has deep gullies cut by running water, which are called <b>ravines</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/43.png" alt="Chambal ravines badlands Madhya Pradesh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Vindhya Range</b> runs from Gujarat through Madhya Pradesh, Uttar Pradesh and Chhattisgarh to Bihar. It is called the Jobat hills in Gujarat and the Kaimur hills in Bihar.</p>
      <p class="cp-lead">The <b>Satpura Range</b> runs from Gujarat through Madhya Pradesh and Maharashtra to Chhattisgarh and the Chotanagpur plateau. It forms the Rajpipla hills, the Mahadeo hills and the Maikal range from west to east.</p>
      <p class="cp-lead">Its highest peak is <b>Dhoopgarh</b> (1,350 metres) on the Mahadeo hills. Amarkantak, on the Maikal range, is where the Narmada and Son rivers begin.</p>
      <table><thead><tr><th>Range</th><th>Where it is</th><th>Special fact</th></tr></thead><tbody><tr><td>Vindhya</td><td>Gujarat to Bihar</td><td>Lies north of the Narmada</td></tr><tr><td>Satpura</td><td>Gujarat to Chotanagpur</td><td>Block mountain, highest peak Dhoopgarh</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/44.png" alt="Sketch map of central India showing Aravalli, Vindhya and Satpura ranges, with the Narmada" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Satpura is a <b>block mountain</b>, formed when land between two cracks was lifted.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/45.png" alt="Pachmarhi Satpura hills Dhoopgarh view photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Dhoopgarh is the highest peak, but Amarkantak is the place where Narmada and Son begin. Do not mix the two.</div>
      <div class="cp-note exam">Chambal valley has ravines, and Dhoopgarh is the highest peak of the Satpura.</div>
    `
  },
  55: {
    questext: "Which is the highest peak of the Satpura range?",
    options: ["Amarkantak", "Dhoopgarh", "Guru Shikhar", "Mahendragiri"],
    correct: "2",
    exptext: "✅ Dhoopgarh (1,350 metres) on the Mahadeo hills is the highest peak of the Satpura. 📌 Dhoop means sun, the top gets the first sun. ❌ Amarkantak is wrong because it is the source of the Narmada."
  },
  56: {
    questext: "The Chambal river valley is the most affected area by gully erosion, which is known as",
    options: ["Duar", "Dhand", "Dune", "Ravine"],
    correct: "4",
    exptext: "✅ Running water cuts deep gullies called ravines in the Chambal valley. 📌 Ravine means river-cut gully. ❌ Dune is wrong because dunes are heaps of sand in deserts."
  },
  57: {
    type: "concept", icon: "💎", accent: "#c026d3", pauseTimer: true,
    title: "Chotanagpur Plateau and the Eastern Plateau",
    html: `
      <p class="cp-lead">The Eastern Plateau has three parts: the <b>Chotanagpur Plateau</b>, the Chhattisgarh Basin (also called the Mahanadi Basin), and the Dandakaranya Plateau.</p>
      <p class="cp-lead">The Chotanagpur Plateau is mainly in Jharkhand. It also covers parts of southern Bihar, northern Chhattisgarh, the Purulia district of West Bengal and northern Odisha.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/46.png" alt="Outline map of Jharkhand region showing three sub-plateaus: Rajmahal hills in the north-ea" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It has the Rajmahal hills in the north-east, the Hazaribagh plateau in the north and the Ranchi plateau in the south.</p>
      <p class="cp-lead">The <b>Damodar river</b> separates the Ranchi plateau from the Hazaribagh plateau. It is the largest river of the Chotanagpur Plateau, and its basin is the most important coal region of India.</p>
      <p class="cp-lead"><b>Parasnath Hill</b> in the Hazaribagh plateau is the highest peak of the Chotanagpur Plateau. It is a famous pilgrimage place of the Jains.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/47.png" alt="Parasnath Hill Jharkhand Jain temples mountain photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Swarnarekha river</b> starts on the Ranchi plateau and is the second largest river of Chotanagpur. The Hundru Falls on this river are near Ranchi.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Main state</td><td>Jharkhand</td></tr><tr><td>Largest river</td><td>Damodar, rich in coal</td></tr><tr><td>Highest peak</td><td>Parasnath Hill</td></tr><tr><td>Waterfall</td><td>Hundru Falls on the Swarnarekha</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/48.png" alt="Hundru Falls Ranchi Swarnarekha waterfall photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Parasnath Hill is in Jharkhand, and not in Rajasthan, where Guru Shikhar is the famous peak.</div>
      <div class="cp-note exam">Damodar basin is the main coal area, and Hundru Falls is on the Swarnarekha.</div>
    `
  },
  58: {
    questext: "The highest peak of the Chotanagpur Plateau is",
    options: ["Parasnath Hill", "Dhoopgarh", "Amarkantak", "Nokrek"],
    correct: "1",
    exptext: "✅ Parasnath Hill in the Hazaribagh plateau is the highest peak of Chotanagpur. 📌 Parasnath is both highest and holy. ❌ Dhoopgarh is wrong because it is in the Satpura range."
  },
  59: {
    questext: "The Hundru Falls are on which river?",
    options: ["Damodar", "Son", "Swarnarekha", "Mahanadi"],
    correct: "3",
    exptext: "✅ The Hundru Falls are on the Swarnarekha river near Ranchi. 📌 Hundru is near Ranchi, and the Swarnarekha starts at Ranchi. ❌ Damodar is wrong because it is famous for coal, not for this fall."
  },
  60: {
    type: "concept", icon: "🌧️", accent: "#16a34a", pauseTimer: true,
    title: "Meghalaya Plateau",
    html: `
      <p class="cp-lead">The Meghalaya Plateau is the eastern extension of the Peninsular Plateau. It is separated from the Chotanagpur Plateau by the <b>Rajmahal-Garo Gap</b>, which is also called the <b>Malda Gap</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/49.png" alt="Sketch map showing Chotanagpur plateau on the left, Meghalaya plateau on the right, and th" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">From west to east, the Garo, Khasi, Jaintia and Mikir hills lie on this plateau. They are made of very old rocks.</p>
      <p class="cp-lead">Mawsynram and Cherrapunji, to the south of the Khasi Hills, are among the wettest places in the world.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/50.png" alt="Cherrapunji Meghalaya waterfall rain clouds photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Moist winds from the Bay of Bengal are forced up the Khasi hills and give heavy rain.</p>
      <p class="cp-lead">The plateau is also known as the <b>Shillong Plateau</b>. Shillong Peak in the Khasi Hills is its highest point, and Nokrek is the highest peak of the Garo Hills.</p>
      <table><thead><tr><th>Hills</th><th>Position from west to east</th></tr></thead><tbody><tr><td>Garo</td><td>First</td></tr><tr><td>Khasi</td><td>Second, with Mawsynram and Cherrapunji</td></tr><tr><td>Jaintia</td><td>Third</td></tr><tr><td>Mikir</td><td>Fourth, near Assam</td></tr></tbody></table>
      <p class="cp-lead">Laterite soil and evergreen forests have developed here because of the heavy rain.</p>
      <div class="cp-note trap">This plateau lies in the north-east, but it is a part of the Peninsular Plateau, not of the Himalayas.</div>
      <div class="cp-note exam">The Malda Gap separates Meghalaya from Chotanagpur, and Cherrapunji and Mawsynram are in the Khasi Hills.</div>
    `
  },
  61: {
    questext: "The gap that separates the Meghalaya Plateau from the Chotanagpur Plateau is the",
    options: ["Palghat Gap", "Rajmahal-Garo Gap", "Bhor Ghat", "Thal Ghat"],
    correct: "2",
    exptext: "✅ The Rajmahal-Garo Gap, also called the Malda Gap, separates the two plateaus. 📌 Raj-Mahal to Garo shows the east-west gap. ❌ Palghat Gap is wrong because it is in Kerala."
  },
  62: {
    questext: "Mawsynram and Cherrapunji lie in which hills?",
    options: ["Garo Hills", "Jaintia Hills", "Mikir Hills", "Khasi Hills"],
    correct: "4",
    exptext: "✅ Both places lie to the south of the Khasi Hills. 📌 Khasi means the rain wall. ❌ Garo Hills is wrong because they are in the west of the plateau."
  },
  63: {
    type: "concept", icon: "🪨", accent: "#d97706", pauseTimer: true,
    title: "Deccan Plateau and Deccan Traps",
    html: `
      <p class="cp-lead">The Deccan Plateau has three main parts: the <b>Deccan Trap</b>, the Karnataka Plateau and the Andhra Plateau.</p>
      <p class="cp-lead">The Deccan Trap region in Maharashtra was formed when lava cooled into <b>basalt rock</b>. Basalt breaks into <b>black soil</b>, which is very good for cotton.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/51.png" alt="Deccan Traps basalt layers lava rock hills photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Godavari river flows from this plateau region. The Satmala, Ajanta, Balaghat and Harishchandra hills also spread here.</p>
      <p class="cp-lead">The <b>Andhra Plateau</b> includes the Rayalaseema Plateau and the Telangana Plateau. The Velikonda, Palakonda and Nallamalai hills spread here.</p>
      <table><thead><tr><th>Part</th><th>What to remember</th></tr></thead><tbody><tr><td>Deccan Trap</td><td>Basalt rock and black soil in Maharashtra</td></tr><tr><td>Karnataka Plateau</td><td>Iron ore and gold-bearing rocks</td></tr><tr><td>Andhra Plateau</td><td>Rayalaseema and Telangana</td></tr><tr><td>Kolleru Lake</td><td>Between the Godavari and Krishna delta regions</td></tr></tbody></table>
      <p class="cp-lead"><b>Kolleru Lake</b> lies between the Krishna and Godavari deltas in Andhra Pradesh. It is one of the largest freshwater lakes in India.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/52.png" alt="Kolleru Lake Andhra Pradesh birds wetland photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/53.png" alt="Outline map of the Deccan with the three parts coloured and labelled: Deccan Trap in the n" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-note trap">Black soil forms from basalt rock, not from granite or sandstone.</div>
      <div class="cp-note exam">Questions ask the rock behind black soil. The answer is basalt, in Maharashtra.</div>
    `
  },
  64: {
    questext: "The black soil of Maharashtra has been formed from which rock?",
    options: ["Basalt", "Granite", "Sandstone", "Limestone"],
    correct: "1",
    exptext: "✅ Cooled lava formed basalt, and basalt weathers into black soil. 📌 Black soil is baked lava. ❌ Granite is wrong because it makes light-coloured, gritty soil."
  },
  65: {
    questext: "Kolleru Lake lies between which two rivers?",
    options: ["Mahanadi and Godavari", "Krishna and Kaveri", "Godavari and Krishna", "Pennar and Kaveri"],
    correct: "3",
    exptext: "✅ Kolleru Lake lies between the Godavari and Krishna delta regions in Andhra Pradesh. 📌 Kolleru lies in the middle of the two. ❌ Mahanadi and Godavari is wrong because the Mahanadi is far north in Odisha."
  },
  66: {
    type: "concept", icon: "🌿", accent: "#dc2626", pauseTimer: true,
    title: "Karnataka Plateau",
    html: `
      <p class="cp-lead">In Karnataka, the hilly land next to the Western Ghats is called <b>Malnad</b>. The Baba Budan hills are the highest part here, and <b>Mullayanagiri</b> is the highest peak.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/54.png" alt="Mullayanagiri peak Chikmagalur Baba Budan hills photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The plateau is also called the Mysore Plateau or the Bangalore Plateau.</p>
      <p class="cp-lead">Old Dharwar rocks lie here, so the plateau is rich in metal minerals. It has the largest reserves of iron ore, especially in the Baba Budan hills.</p>
      <p class="cp-lead">Krishna, Kaveri, Tungabhadra, Sharavati and Bhima are the major rivers here.</p>
      <table><thead><tr><th>Waterfall</th><th>River</th><th>Fact</th></tr></thead><tbody><tr><td>Jog Falls, also called Gersoppa</td><td>Sharavati</td><td>Famous waterfall of Karnataka</td></tr><tr><td>Kunchikal Falls</td><td>Varahi, in Shivamogga district</td><td>Highest waterfall in India at 455 metres</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/55.png" alt="Jog Falls Sharavati river Karnataka waterfall photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Jog Falls is on the Sharavati river and is also called Gersoppa.</p>
      <p class="cp-lead">Kunchikal Falls, on the Varahi river in Shivamogga district, is counted as the highest waterfall in India.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/56.png" alt="Kunchikal Falls Shivamogga Varahi river photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Jog Falls is the most famous, but Kunchikal Falls is the highest.</div>
      <div class="cp-note exam">Jog is on the Sharavati and Kunchikal is on the Varahi.</div>
    `
  },
  67: {
    questext: "Jog Falls is on which river?",
    options: ["Kaveri", "Sharavati", "Bhima", "Tungabhadra"],
    correct: "2",
    exptext: "✅ Jog Falls is on the Sharavati river in Karnataka. 📌 Jog and Sharavati go together. ❌ Kaveri is wrong because its fall is Shivanasamudra."
  },
  68: {
    questext: "Which is the highest waterfall of India at 455 metres?",
    options: ["Jog Falls", "Hundru Falls", "Dudhsagar Falls", "Kunchikal Falls"],
    correct: "4",
    exptext: "✅ Kunchikal Falls on the Varahi river is counted as the highest at 455 metres. 📌 Highest fall is on the Varahi river. ❌ Jog Falls is wrong because it is famous but shorter."
  },
  69: {
    type: "concept", icon: "🌄", accent: "#7c3aed", pauseTimer: true,
    title: "Southern Mountainous Region",
    html: `
      <p class="cp-lead">The southern mountains include the Nilgiri, Annamalai and Cardamom hills on the border of Kerala and Tamil Nadu, and the Palani Hills in Tamil Nadu.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/57.png" alt="Nilgiri hills Ooty tea gardens landscape photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Doddabetta</b> is the highest peak of the Nilgiri Mountains. The famous hill station Udagamandalam, or Ooty, is in the Nilgiris.</p>
      <p class="cp-lead"><b>Anaimudi</b> (2,695 metres) in the Annamalai hills is the highest peak of South India.</p>
      <p class="cp-lead">The Cardamom hills are the southernmost mountain range of the peninsular region. They lie on the border of Kerala and Tamil Nadu.</p>
      <table><thead><tr><th>Mountains</th><th>State</th></tr></thead><tbody><tr><td>Nilgiri, Annamalai and Cardamom</td><td>Kerala and Tamil Nadu</td></tr><tr><td>Palani, Shevroy and Jawadi</td><td>Tamil Nadu</td></tr><tr><td>Palakonda and Velikonda</td><td>Andhra Pradesh</td></tr><tr><td>Nallamalai</td><td>Andhra Pradesh and Telangana</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/58.png" alt="Anamudi peak Eravikulam Munnar photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The famous hill station Kodaikanal is in the Palani Hills.</p>
      <p class="cp-lead">Silent Valley in the Nilgiri hills of Kerala is one of the richest places for plants and animals.</p>
      <div class="cp-note trap">Doddabetta is the highest peak of the Nilgiris, but Anaimudi is the highest of all South India.</div>
      <div class="cp-note exam">Anaimudi is in the Annamalai hills, and Kodaikanal is in the Palani Hills.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/59.png" alt="Silent Valley National Park Kerala forest photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
    `
  },
  70: {
    questext: "Which is the highest peak of South India?",
    options: ["Anaimudi", "Doddabetta", "Mahendragiri", "Mullayanagiri"],
    correct: "1",
    exptext: "✅ Anaimudi (2,695 metres) in the Annamalai hills is the highest in South India. 📌 Anaimudi is the anchor of the south. ❌ Doddabetta is wrong because it is only the highest in the Nilgiris."
  },
  71: {
    questext: "The hill station Kodaikanal is in which hills?",
    options: ["Nilgiri Hills", "Annamalai Hills", "Palani Hills", "Cardamom Hills"],
    correct: "3",
    exptext: "✅ Kodaikanal lies in the Palani Hills of Tamil Nadu. 📌 Kodai and Palani both are Tamil. ❌ Nilgiri Hills is wrong because Ooty is there."
  },
  72: {
    type: "concept", icon: "🌴", accent: "#f97316", pauseTimer: true,
    title: "Western Ghats",
    html: `
      <p class="cp-lead">The Western Ghats run parallel to the Arabian Sea coast for about <b>1,600 kilometres</b>. They are also called the <b>Sahyadri</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/60.png" alt="Western Ghats Sahyadri monsoon green hills photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">They begin near the mouth of the Tapi river, close to the Maharashtra and Gujarat border, and end at Kanyakumari. They pass through Gujarat, Maharashtra, Goa, Karnataka, Kerala and Tamil Nadu.</p>
      <p class="cp-lead">Mahabaleshwar, Kalsubai and Harishchandragad are major peaks. Kalsubai is the highest peak of Maharashtra.</p>
      <p class="cp-lead">Rivers that flow west from these hills reach the sea in estuaries, not in deltas.</p>
      <table><thead><tr><th>Pass</th><th>State</th><th>Connects</th></tr></thead><tbody><tr><td>Thal Ghat</td><td>Maharashtra</td><td>Mumbai and Nashik</td></tr><tr><td>Bhor Ghat</td><td>Maharashtra</td><td>Mumbai and Pune</td></tr><tr><td>Pal Ghat</td><td>Kerala</td><td>Palakkad and Coimbatore, between the Nilgiri and Annamalai hills</td></tr><tr><td>Senkota Gap</td><td>Kerala and Tamil Nadu</td><td>Kollam and Madurai</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/61.png" alt="Sketch of the west coast with the Western Ghats as a strip and four passes marked: Thal Gh" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Western Ghats are considered one of the richest areas for plant and animal life in the world. The United Nations Educational, Scientific and Cultural Organization (UNESCO) declared them a World Heritage Site in 2012.</p>
      <p class="cp-lead">The major hills from north to south are the Nilgiri, Annamalai and Cardamom hills.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/62.png" alt="Kalsubai peak Maharashtra highest peak photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Thal Ghat is for Nashik and Bhor Ghat is for Pune. Do not swap them.</div>
      <div class="cp-note exam">Pal Ghat is the gap in Kerala between the Nilgiri and Annamalai hills, and Kalsubai is the highest peak of Maharashtra.</div>
      <div class="cp-mnemonic">Thal to Nashik, Bhor to Pune, Pal to Palakkad.</div>
    `
  },
  73: {
    questext: "Which pass connects Mumbai with Pune?",
    options: ["Thal Ghat", "Bhor Ghat", "Pal Ghat", "Senkota Gap"],
    correct: "2",
    exptext: "✅ Bhor Ghat connects Mumbai and Pune. 📌 Bhor means Pune, Thal means Nashik. ❌ Thal Ghat is wrong because it connects Mumbai and Nashik."
  },
  74: {
    questext: "The highest peak of Maharashtra is",
    options: ["Mahabaleshwar", "Harishchandragad", "Anaimudi", "Kalsubai"],
    correct: "4",
    exptext: "✅ Kalsubai in the Western Ghats is the highest peak of Maharashtra. 📌 Kalsubai is the king of Maharashtra. ❌ Mahabaleshwar is wrong because it is famous but lower."
  },
  75: {
    questext: "Pal Ghat connects Palakkad with",
    options: ["Coimbatore", "Nashik", "Pune", "Madurai"],
    correct: "1",
    exptext: "✅ Pal Ghat connects Palakkad in Kerala with Coimbatore in Tamil Nadu. 📌 Pal Ghat is Palakkad to Coimbatore. ❌ Madurai is wrong because the Senkota Gap leads that way."
  },
  76: {
    type: "concept", icon: "🌄", accent: "#0d9488", pauseTimer: true,
    title: "Eastern Ghats",
    html: `
      <p class="cp-lead">The Eastern Ghats are a broken range of hills that run from Odisha to Tamil Nadu. They are <b>discontinuous</b> because big rivers, such as the Godavari, Krishna and Kaveri, have cut through them.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/63.png" alt="Eastern Ghats Araku Valley hills Andhra Pradesh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">They are lower and more broken than the Western Ghats.</p>
      <p class="cp-lead">The highest peak of the Eastern Ghats is <b>Arma Konda</b>, also called Jindhagada, in Andhra Pradesh. Mahendragiri in Odisha is also a well-known peak.</p>
      <table><thead><tr><th>State</th><th>Hills from north to south</th></tr></thead><tbody><tr><td>Andhra Pradesh</td><td>Nallamalai, Velikonda, Palakonda and Nagari</td></tr><tr><td>Tamil Nadu</td><td>Javadi, Shevaroy, Panchamalai and Sirumalai</td></tr></tbody></table>
      <p class="cp-lead">The Eastern Ghats and Western Ghats come close together in the Nilgiri Hills.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/64.png" alt="Sketch map of the east coast showing the Eastern Ghats as a broken ribbon, with the hills " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Mahendragiri is famous, but Arma Konda is higher. Do not choose Mahendragiri for the highest peak.</div>
      <div class="cp-note exam">The Western Ghats are continuous, but the Eastern Ghats are discontinuous.</div>
      <div class="cp-mnemonic">Nal Vel Pal Nag, then Java Shev Pancha Siru.</div>
    `
  },
  77: {
    questext: "The Eastern Ghats extend as a broken range from",
    options: ["Gujarat to Kerala", "Punjab to Goa", "Odisha to Tamil Nadu", "Assam to Odisha"],
    correct: "3",
    exptext: "✅ The Eastern Ghats run from Odisha through Andhra Pradesh to Tamil Nadu. 📌 East coast from Odisha to Tamil Nadu. ❌ Gujarat to Kerala is wrong because that is the Western side."
  },
  78: {
    questext: "Which is the highest peak of the Eastern Ghats?",
    options: ["Mahendragiri", "Arma Konda", "Kalsubai", "Mullayanagiri"],
    correct: "2",
    exptext: "✅ Arma Konda, also called Jindhagada, in Andhra Pradesh is the highest peak. 📌 Arma Konda is above Mahendragiri. ❌ Mahendragiri is wrong because it is lower."
  },
  79: {
    type: "concept", icon: "🏖️", accent: "#db2777", pauseTimer: true,
    title: "Western Coastal Plain",
    html: `
      <p class="cp-lead">The Western Coastal Plain lies between the Western Ghats and the Arabian Sea. It runs from Surat in Gujarat to Kanyakumari in Tamil Nadu and is divided into four parts.</p>
      <table><thead><tr><th>Part</th><th>Lies between</th></tr></thead><tbody><tr><td>Gujarat Coast</td><td>Coast of Kutch and Kathiawar</td></tr><tr><td>Konkan Coast</td><td>Daman and Goa</td></tr><tr><td>Kannada Coast</td><td>Goa and Mangaluru</td></tr><tr><td>Malabar Coast</td><td>Mangaluru and Kanyakumari</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/65.png" alt="A long thin map of the west coast split into four coloured parts named Gujarat, Konkan, Ka" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The plain is widest in Gujarat. It becomes narrower towards the south but widens again in Kerala.</p>
      <p class="cp-lead">Spices, betel nut and coconut grow in the Kannada coastal plain.</p>
      <p class="cp-lead"><b>Kayals</b>, or lagoons, are found on the Malabar coast. They are used for fishing, boat travel and tourism.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/66.png" alt="Kerala backwaters Alappuzha houseboat photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Nehru Trophy Boat Race is held every year at Punnamada Kayal in Kerala.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/67.png" alt="Nehru Trophy Boat Race Punnamada Lake Alappuzha photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Konkan lies between Daman and Goa, but Malabar lies between Mangaluru and Kanyakumari.</div>
      <div class="cp-note exam">Kayals belong to the Malabar coast.</div>
    `
  },
  80: {
    questext: "The Konkan Coast lies between",
    options: ["Surat and Mumbai", "Goa and Mangaluru", "Mangaluru and Kanyakumari", "Daman and Goa"],
    correct: "4",
    exptext: "✅ The Konkan Coast lies between Daman and Goa. 📌 Konkan is the upper west coast. ❌ Goa and Mangaluru is wrong because that is the Kannada Coast."
  },
  81: {
    questext: "Kayals, or lagoons, are found on which coast?",
    options: ["Malabar Coast", "Konkan Coast", "Coromandel Coast", "Utkal Coast"],
    correct: "1",
    exptext: "✅ Kayals are found on the Malabar Coast of Kerala. 📌 Malabar means backwaters. ❌ Utkal Coast is wrong because it is in Odisha on the east."
  },
  82: {
    type: "concept", icon: "🌅", accent: "#2563eb", pauseTimer: true,
    title: "Eastern Coastal Plain",
    html: `
      <p class="cp-lead">The Eastern Coastal Plain lies between the Eastern Ghats and the Bay of Bengal. It runs from the Swarnarekha river to Kanyakumari and is divided into three parts.</p>
      <table><thead><tr><th>Part</th><th>Lies between</th><th>States</th></tr></thead><tbody><tr><td>Utkal Coast</td><td>Swarnarekha and Mahanadi</td><td>Odisha</td></tr><tr><td>Northern Circars</td><td>Mahanadi and Krishna</td><td>Odisha and Andhra Pradesh</td></tr><tr><td>Coromandel Coast</td><td>Krishna and Kanyakumari</td><td>Andhra Pradesh and Tamil Nadu</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/68.png" alt="A long thin map of the east coast split into three coloured parts named Utkal, Northern Ci" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The plain gets rain from both the south-west monsoon and the north-east monsoon.</p>
      <p class="cp-lead">It is wider than the west coast because the rivers form <b>deltas</b> at their mouths, not estuaries.</p>
      <table><thead><tr><th>Delta</th><th>State</th></tr></thead><tbody><tr><td>Mahanadi Delta</td><td>Odisha</td></tr><tr><td>Godavari Delta</td><td>Andhra Pradesh</td></tr><tr><td>Krishna Delta</td><td>Andhra Pradesh</td></tr><tr><td>Kaveri Delta</td><td>Tamil Nadu</td></tr></tbody></table>
      <p class="cp-lead">Rice is grown widely here because the soil has a lot of clay and holds water.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/69.png" alt="Kaveri delta paddy fields Thanjavur green rice photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The east coast has deltas and the west coast has estuaries. Do not swap them.</div>
      <div class="cp-note exam">Remember the order Utkal, Northern Circars, Coromandel from north to south.</div>
    `
  },
  83: {
    questext: "The Northern Circars lie between which two rivers?",
    options: ["Swarnarekha and Mahanadi", "Krishna and Kanyakumari", "Mahanadi and Krishna", "Narmada and Tapi"],
    correct: "3",
    exptext: "✅ The Northern Circars lie between the Mahanadi and the Krishna. 📌 Middle part of the east coast. ❌ Swarnarekha and Mahanadi is wrong because that is the Utkal Coast."
  },
  84: {
    questext: "The Kaveri Delta is in which state?",
    options: ["Odisha", "Tamil Nadu", "Andhra Pradesh", "Kerala"],
    correct: "2",
    exptext: "✅ The Kaveri Delta lies in Tamil Nadu. 📌 Kaveri is the Tamil river. ❌ Andhra Pradesh is wrong because it has the Godavari and Krishna deltas."
  },
  85: {
    type: "concept", icon: "🏝️", accent: "#ea580c", pauseTimer: true,
    title: "Andaman and Nicobar Islands",
    html: `
      <p class="cp-lead">The Andaman and Nicobar Islands lie in the Bay of Bengal. They are made of about 572 small and big islands, which are the tops of mountains that are mostly under the sea.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/70.png" alt="Andaman Nicobar islands aerial photo Bay of Bengal" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Ten Degree Channel</b> separates the Andaman Islands from the Nicobar Islands. The Andaman group has North, Middle, South and Little Andaman.</p>
      <p class="cp-lead">The capital is <b>Port Blair</b> on South Andaman, where the famous <b>Cellular Jail</b> stands.</p>
      <table><thead><tr><th>Water body</th><th>Separates</th></tr></thead><tbody><tr><td>Ten Degree Channel</td><td>Andaman from Nicobar</td></tr><tr><td>Duncan Passage</td><td>South Andaman from Little Andaman</td></tr><tr><td>Coco Strait</td><td>Andaman from the Coco Islands of Myanmar</td></tr><tr><td>Six Degree Channel</td><td>Great Nicobar from Sumatra of Indonesia</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/71.png" alt="Sketch of the island chain with Andaman islands in the north and Nicobar islands in the so" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Barren Island</b>, east of Middle Andaman, is the only active volcano of India. Narcondam, east of North Andaman, is a sleeping volcanic island.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/72.png" alt="Barren Island volcano Andaman active volcano photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Saddle Peak in North Andaman is the highest peak of the islands.</p>
      <p class="cp-lead">The Nicobar group has Car Nicobar, Little Nicobar and Great Nicobar. <b>Indira Point</b>, in the south of Great Nicobar, is the southernmost point of India, and it was damaged by the 2004 tsunami.</p>
      <p class="cp-lead">Tribes such as the Jarawa and the Shompen still live in their old way of life. In the 2014 Lok Sabha election, the Shompen voted for the first time.</p>
      <div class="cp-note trap">Ten Degree Channel is between Andaman and Nicobar, but the Six Degree Channel is between Great Nicobar and Sumatra.</div>
      <div class="cp-note exam">Barren Island is India's only active volcano, and Port Blair holds the Cellular Jail.</div>
    `
  },
  86: {
    questext: "The Ten Degree Channel separates",
    options: ["Minicoy from Maldives", "Lakshadweep from Kerala", "Sri Lanka from India", "Andaman from Nicobar"],
    correct: "4",
    exptext: "✅ The Ten Degree Channel runs between the Andaman and Nicobar Islands. 📌 Ten divides Andaman from Nicobar. ❌ Minicoy from Maldives is wrong because that is the Eight Degree Channel."
  },
  87: {
    questext: "Which is the only active volcano of India?",
    options: ["Barren Island", "Narcondam", "Saddle Peak", "Mount Diavolo"],
    correct: "1",
    exptext: "✅ Barren Island east of Middle Andaman is the only active volcano of India. 📌 Barren is the burning one. ❌ Narcondam is wrong because it is a sleeping volcano."
  },
  88: {
    questext: "The Cellular Jail is located in",
    options: ["Car Nicobar", "Great Nicobar", "Port Blair", "Little Andaman"],
    correct: "3",
    exptext: "✅ The Cellular Jail stands at Port Blair on South Andaman. 📌 Port Blair holds the jail. ❌ Great Nicobar is wrong because it is the southern end of the islands."
  },
  89: {
    type: "concept", icon: "🐠", accent: "#65a30d", pauseTimer: true,
    title: "Lakshadweep",
    html: `
      <p class="cp-lead">Lakshadweep is a group of islands built by <b>coral reefs</b> in the Arabian Sea. It has 36 islands, but only 10 of them have people living on them.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/73.png" alt="Lakshadweep Kavaratti lagoon coral island photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Kavaratti</b> is the capital of Lakshadweep, and it lies to the north of the Nine Degree Channel.</p>
      <p class="cp-lead">The <b>Nine Degree Channel</b> separates Minicoy from the other islands of Lakshadweep.</p>
      <p class="cp-lead">The <b>Eight Degree Channel</b> separates Minicoy from the Maldives.</p>
      <table><thead><tr><th>Channel</th><th>Separates</th></tr></thead><tbody><tr><td>Nine Degree Channel</td><td>Minicoy from main Lakshadweep</td></tr><tr><td>Eight Degree Channel</td><td>Minicoy from the Maldives</td></tr></tbody></table>
      <p class="cp-lead">Androth is the largest island of Lakshadweep, and Minicoy is the southernmost island.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/74.png" alt="Sketch of Lakshadweep with Kavaratti and Androth in the north, the Nine Degree Channel in " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix the islands. Andaman and Nicobar are tops of mountains under the sea, but Lakshadweep is built of coral.</div>
      <div class="cp-note exam">The Nine Degree Channel and the Eight Degree Channel both separate Minicoy, from two different sides.</div>
    `
  },
  90: {
    questext: "The Nine Degree Channel separates",
    options: ["Minicoy from Maldives", "Minicoy from the other islands of Lakshadweep", "Andaman from Nicobar", "India from Sri Lanka"],
    correct: "2",
    exptext: "✅ The Nine Degree Channel separates Minicoy from the rest of Lakshadweep. 📌 Nine is the near side, Eight is the far side. ❌ Minicoy from Maldives is wrong because the Eight Degree Channel does that."
  },
  91: {
    questext: "Lakshadweep is an island group formed by",
    options: ["volcanic eruptions", "folding of rocks", "river deposits", "coral reefs"],
    correct: "4",
    exptext: "✅ Lakshadweep is made by tiny sea creatures that build coral reefs. 📌 Lakshadweep means coral. ❌ Volcanic eruptions is wrong because Barren Island in Andaman is the volcano."
  },
  92: {
    type: "concept", icon: "🚀", accent: "#0891b2", pauseTimer: true,
    title: "Other Islands and Related Facts",
    html: `
      <p class="cp-lead">Besides the two big groups, India has several important single islands.</p>
      <table><thead><tr><th>Island</th><th>Fact</th></tr></thead><tbody><tr><td>Sriharikota</td><td>Off the coast of Andhra Pradesh. India's only satellite launch centre, the Satish Dhawan Space Centre, is here</td></tr><tr><td>Pamban Island</td><td>Part of the Adam's Bridge or Ram Setu in the Gulf of Mannar. Rameswaram is on it</td></tr><tr><td>New Moore Island</td><td>In the Bay of Bengal on the border of India and Bangladesh. It has gone under the sea</td></tr><tr><td>Abdul Kalam Island, or Wheeler Island</td><td>Off the coast of Odisha. Used as a missile test centre</td></tr><tr><td>Majuli Island</td><td>World's largest river island in the Brahmaputra in Assam. It became the first island district of India</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/75.png" alt="Sriharikota Satish Dhawan Space Centre rocket launch photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Sriharikota separates the <b>Pulicat Lake</b> from the Bay of Bengal. Pulicat Lake lies on the border of Andhra Pradesh and Tamil Nadu.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/76.png" alt="Majuli island Assam Brahmaputra river photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Gulf of Kutch separates the Kutch and Kathiawar peninsulas.</p>
      <p class="cp-lead">The Gulf of Khambhat separates the Kathiawar peninsula from the mainland of Gujarat.</p>
      <p class="cp-lead">Aliabet and Khadiabet are islands at the mouths of the Narmada and Tapi rivers.</p>
      <p class="cp-lead">Wellington Island is part of Kochi city in Kerala.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Geomorphic_Regions/77.png" alt="Pamban bridge Rameswaram Pamban Island photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Majuli is a river island in Assam, but Pamban is a sea island near Rameswaram. Do not swap them.</div>
      <div class="cp-note exam">Sriharikota holds the space centre, Majuli is the largest river island, and the Gulf of Kutch separates Kutch from Kathiawar.</div>
    `
  },
  93: {
    questext: "The world's largest river island, Majuli, lies in which river?",
    options: ["Brahmaputra", "Ganga", "Godavari", "Narmada"],
    correct: "1",
    exptext: "✅ Majuli lies in the middle of the Brahmaputra river in Assam. 📌 Majuli means Brahmaputra. ❌ Ganga is wrong because it has no such large island."
  },
  94: {
    questext: "The Satish Dhawan Space Centre is on which island?",
    options: ["Pamban", "Majuli", "Sriharikota", "Wheeler"],
    correct: "3",
    exptext: "✅ The space centre is on Sriharikota off Andhra Pradesh. 📌 Sriharikota means rockets. ❌ Wheeler Island is wrong because it is used for missile tests."
  },
  95: {
    questext: "Which water body separates the Kutch and Kathiawar peninsulas?",
    options: ["Gulf of Khambhat", "Gulf of Kutch", "Gulf of Mannar", "Palk Strait"],
    correct: "2",
    exptext: "✅ The Gulf of Kutch lies between the two peninsulas. 📌 Kutch gulf divides Kutch from Kathiawar. ❌ Gulf of Khambhat is wrong because it separates Kathiawar from the Gujarat mainland."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Geomorphic_Regions/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a detailed relief map of India with snow-capped Himalayan peaks, a golden desert dune, a green plateau and a blue coastline" },
  "images/General_Awareness/Geography/Geomorphic_Regions/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Himalayas snow covered mountain range aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/1.png. the snow-covered Himalayan wall seen from above",
  "images/General_Awareness/Geography/Geomorphic_Regions/2.png": { t: "fig", about: "Cross-section of the Himalayas from north to south with bands labelled Tibet Plateau, Trans Himalaya, Greater Himalaya, Lesser Himalaya, Shivalik and Northern Plains, and the faults ITSZ, MCT, MBF and HFF marked between them." },
  "images/General_Awareness/Geography/Geomorphic_Regions/3.png": { t: "fig", about: "Outline sketch of the Himalayas in four vertical bands labelled Punjab Himalaya, Kumaon Himalaya, Nepal Himalaya and Assam Himalaya, with the river names Indus, Sutlej, Kali, Teesta and Dihang at the band edges." },
  "images/General_Awareness/Geography/Geomorphic_Regions/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nanda Devi peak Uttarakhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/4.png. the snow peak of Nanda Devi in the Kumaon Himalaya",
  "images/General_Awareness/Geography/Geomorphic_Regions/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Karakoram range K2 mountain peak photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/5.png. the rocky snow peaks of the Karakoram range",
  "images/General_Awareness/Geography/Geomorphic_Regions/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Siachen glacier Karakoram photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/6.png. a long river of ice among the Karakoram peaks",
  "images/General_Awareness/Geography/Geomorphic_Regions/7.png": { t: "fig", about: "Simple sketch map of the far north showing the Karakoram, Ladakh, Zaskar and Kailash ranges as labelled bands, with the Indus river flowing between the Zaskar and Ladakh ranges." },
  "images/General_Awareness/Geography/Geomorphic_Regions/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mount Everest Himalaya summit photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/8.png. the summit of Mount Everest",
  "images/General_Awareness/Geography/Geomorphic_Regions/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kanchenjunga peak Sikkim photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/9.png. the three snow summits of Kanchenjunga at sunrise",
  "images/General_Awareness/Geography/Geomorphic_Regions/10.png": { t: "fig", about: "Bar chart of the eight peaks in order of height, Everest tallest on the left and Namcha Barwa shortest on the right, each bar labelled with its name." },
  "images/General_Awareness/Geography/Geomorphic_Regions/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gulmarg meadow Kashmir Pir Panjal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/11.png. a green meadow with pine trees and hills",
  "images/General_Awareness/Geography/Geomorphic_Regions/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dhauladhar range Dharamshala Kangra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/12.png. the snow-topped Dhauladhar range above green hills",
  "images/General_Awareness/Geography/Geomorphic_Regions/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Saffron flowers Pampore Kashmir field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/13.png. purple saffron flowers in a field",
  "images/General_Awareness/Geography/Geomorphic_Regions/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shivalik hills Himachal Haridwar foothills photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/14.png. low green Shivalik hills near the plains",
  "images/General_Awareness/Geography/Geomorphic_Regions/15.png": { t: "fig", about: "Cross-section from north to south showing Trans Himalaya, Greater Himalaya, Lesser Himalaya, Shivalik and Plains, with four labelled fault lines ITSZ, MCT, MBF and HFF between them." },
  "images/General_Awareness/Geography/Geomorphic_Regions/16.png": { t: "fig", about: "Outline map of north-east India with the hill names Dafla, Miri, Abor, Mishmi, Patkai Bum, Naga, Manipur, Mizo, Tripura, Garo, Khasi, Jaintia, Mikir and Barail placed on their states." },
  "images/General_Awareness/Geography/Geomorphic_Regions/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mizo Hills Mizoram green hills landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/17.png. green forested hills of Mizoram",
  "images/General_Awareness/Geography/Geomorphic_Regions/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pangong Lake Ladakh blue salt water photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/18.png. the blue salty water of Pangong Lake",
  "images/General_Awareness/Geography/Geomorphic_Regions/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Valley of Flowers Uttarakhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/19.png. flowers blooming across the Valley of Flowers",
  "images/General_Awareness/Geography/Geomorphic_Regions/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Loktak Lake Manipur floating islands photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/20.png. floating green islands on Loktak Lake",
  "images/General_Awareness/Geography/Geomorphic_Regions/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nathu La pass Sikkim India China border photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/21.png. the road and border gate at Nathu La",
  "images/General_Awareness/Geography/Geomorphic_Regions/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rohtang Pass Manali snow road photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/22.png. snow on the Rohtang Pass road",
  "images/General_Awareness/Geography/Geomorphic_Regions/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Zoji La pass road Kashmir Ladakh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/23.png. the narrow mountain road of Zoji La",
  "images/General_Awareness/Geography/Geomorphic_Regions/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Siachen glacier long ice river photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/24.png. the long white tongue of Siachen glacier",
  "images/General_Awareness/Geography/Geomorphic_Regions/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gangotri glacier Gaumukh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/25.png. the snout of the Gangotri glacier",
  "images/General_Awareness/Geography/Geomorphic_Regions/26.png": { t: "fig", about: "Sketch map of the Himalayas with glaciers marked: Siachen, Baltoro, Biafo and Hispar in the north-west, Gangotri, Pindari and Milam in Uttarakhand, and Zemu in Sikkim." },
  "images/General_Awareness/Geography/Geomorphic_Regions/27.png": { t: "fig", about: "Cross-section from the Himalaya to a river valley showing Bhabar, Terai, Bangar and Khadar in order, with Bangar as high land and Khadar as low land near the river." },
  "images/General_Awareness/Geography/Geomorphic_Regions/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Terai grassland Dudhwa forest Uttar Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/28.png. green marshy Terai grassland",
  "images/General_Awareness/Geography/Geomorphic_Regions/29.png": { t: "fig", about: "Sketch map of the five Punjab rivers Sutlej, Beas, Ravi, Chenab and Jhelum and the Indus, with the five doabs shown as labelled bands between them." },
  "images/General_Awareness/Geography/Geomorphic_Regions/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Wheat fields Punjab green farmland photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/30.png. green wheat fields of Punjab",
  "images/General_Awareness/Geography/Geomorphic_Regions/31.png": { t: "fig", about: "Tree diagram with Ganga Plain at the top and three branches: Upper (Rohilkhand, Awadh), Middle (Eastern Uttar Pradesh, Bihar with Saran, Magadha and Mithila) and Lower (West Bengal)." },
  "images/General_Awareness/Geography/Geomorphic_Regions/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ganga river Varanasi ghats morning photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/32.png. the Ganga river at Varanasi",
  "images/General_Awareness/Geography/Geomorphic_Regions/33.png": { t: "fig", about: "Sketch map of Rajasthan with the Aravalli line running from south-west to north-east and a dotted line marking 25 centimetres of rainfall, showing Thar Desert on the west side and semi-dry Bagar land on the east side." },
  "images/General_Awareness/Geography/Geomorphic_Regions/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sambhar Salt Lake Rajasthan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/34.png. the white salt flats of Sambhar Lake",
  "images/General_Awareness/Geography/Geomorphic_Regions/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Brahmaputra river Assam plain boats photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/35.png. the wide Brahmaputra river in Assam",
  "images/General_Awareness/Geography/Geomorphic_Regions/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Thar Desert Jaisalmer sand dunes photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/36.png. rolling sand dunes in the Thar Desert",
  "images/General_Awareness/Geography/Geomorphic_Regions/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rann of Kutch white salt desert Gujarat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/37.png. the white salt flat of the Rann of Kutch",
  "images/General_Awareness/Geography/Geomorphic_Regions/38.png": { t: "fig", about: "Outline map of peninsular India as a triangle with the Aravalli, Rajmahal hills, Gir hills, Cardamom hills and Shillong plateau marked at its corners and edges." },
  "images/General_Awareness/Geography/Geomorphic_Regions/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Deccan Plateau landscape Maharashtra rocky hills photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/39.png. a rocky plateau landscape of peninsular India",
  "images/General_Awareness/Geography/Geomorphic_Regions/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aravalli hills Rajasthan range photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/40.png. low rocky Aravalli hills",
  "images/General_Awareness/Geography/Geomorphic_Regions/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Guru Shikhar Mount Abu highest peak Aravalli photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/41.png. the top of Guru Shikhar on Mount Abu",
  "images/General_Awareness/Geography/Geomorphic_Regions/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dilwara Jain temple Mount Abu marble photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/42.png. the white marble carvings of the Dilwara temple",
  "images/General_Awareness/Geography/Geomorphic_Regions/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chambal ravines badlands Madhya Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/43.png. deep gullies cut into soft land",
  "images/General_Awareness/Geography/Geomorphic_Regions/44.png": { t: "fig", about: "Sketch map of central India showing Aravalli, Vindhya and Satpura ranges, with the Narmada river flowing west in the valley between Vindhya in the north and Satpura in the south." },
  "images/General_Awareness/Geography/Geomorphic_Regions/45.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pachmarhi Satpura hills Dhoopgarh view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/45.png. green hills around Pachmarhi",
  "images/General_Awareness/Geography/Geomorphic_Regions/46.png": { t: "fig", about: "Outline map of Jharkhand region showing three sub-plateaus: Rajmahal hills in the north-east, Hazaribagh plateau in the north and Ranchi plateau in the south, with the Damodar river between Hazaribagh and Ranchi." },
  "images/General_Awareness/Geography/Geomorphic_Regions/47.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Parasnath Hill Jharkhand Jain temples mountain photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/47.png. the temples on the top of Parasnath Hill",
  "images/General_Awareness/Geography/Geomorphic_Regions/48.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hundru Falls Ranchi Swarnarekha waterfall photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/48.png. the Hundru Falls dropping over rocks",
  "images/General_Awareness/Geography/Geomorphic_Regions/49.png": { t: "fig", about: "Sketch map showing Chotanagpur plateau on the left, Meghalaya plateau on the right, and the flat Malda gap between them filled by the Ganga-Brahmaputra plain." },
  "images/General_Awareness/Geography/Geomorphic_Regions/50.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cherrapunji Meghalaya waterfall rain clouds photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/50.png. clouds and waterfalls at Cherrapunji",
  "images/General_Awareness/Geography/Geomorphic_Regions/51.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Deccan Traps basalt layers lava rock hills photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/51.png. layers of dark basalt rock on a hillside",
  "images/General_Awareness/Geography/Geomorphic_Regions/52.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kolleru Lake Andhra Pradesh birds wetland photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/52.png. birds on Kolleru Lake",
  "images/General_Awareness/Geography/Geomorphic_Regions/53.png": { t: "fig", about: "Outline map of the Deccan with the three parts coloured and labelled: Deccan Trap in the north-west, Karnataka Plateau in the south-west and Andhra Plateau in the east, with the Godavari river marked." },
  "images/General_Awareness/Geography/Geomorphic_Regions/54.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mullayanagiri peak Chikmagalur Baba Budan hills photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/54.png. green grass hills at Mullayanagiri",
  "images/General_Awareness/Geography/Geomorphic_Regions/55.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jog Falls Sharavati river Karnataka waterfall photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/55.png. the Jog Falls dropping in the rainy season",
  "images/General_Awareness/Geography/Geomorphic_Regions/56.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kunchikal Falls Shivamogga Varahi river photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/56.png. the tall Kunchikal waterfall",
  "images/General_Awareness/Geography/Geomorphic_Regions/57.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nilgiri hills Ooty tea gardens landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/57.png. green tea gardens on the Nilgiri hills",
  "images/General_Awareness/Geography/Geomorphic_Regions/58.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Anamudi peak Eravikulam Munnar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/58.png. the high grassy hills near Anamudi",
  "images/General_Awareness/Geography/Geomorphic_Regions/59.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Silent Valley National Park Kerala forest photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/59.png. thick evergreen forest of Silent Valley",
  "images/General_Awareness/Geography/Geomorphic_Regions/60.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Western Ghats Sahyadri monsoon green hills photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/60.png. green Western Ghats hills covered in monsoon clouds",
  "images/General_Awareness/Geography/Geomorphic_Regions/61.png": { t: "fig", about: "Sketch of the west coast with the Western Ghats as a strip and four passes marked: Thal Ghat linking Mumbai and Nashik, Bhor Ghat linking Mumbai and Pune, Pal Ghat linking Palakkad and Coimbatore, Senkota Gap linking Kollam and Madurai." },
  "images/General_Awareness/Geography/Geomorphic_Regions/62.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kalsubai peak Maharashtra highest peak photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/62.png. the top of Kalsubai, the highest peak of Maharashtra",
  "images/General_Awareness/Geography/Geomorphic_Regions/63.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Eastern Ghats Araku Valley hills Andhra Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/63.png. green hills of the Eastern Ghats",
  "images/General_Awareness/Geography/Geomorphic_Regions/64.png": { t: "fig", about: "Sketch map of the east coast showing the Eastern Ghats as a broken ribbon, with the hills named in order from north to south and Andhra Pradesh and Tamil Nadu labelled." },
  "images/General_Awareness/Geography/Geomorphic_Regions/65.png": { t: "fig", about: "A long thin map of the west coast split into four coloured parts named Gujarat, Konkan, Kannada and Malabar with the city names Daman, Goa, Mangaluru and Kanyakumari at their edges." },
  "images/General_Awareness/Geography/Geomorphic_Regions/66.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kerala backwaters Alappuzha houseboat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/66.png. a houseboat on the Kerala backwaters",
  "images/General_Awareness/Geography/Geomorphic_Regions/67.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nehru Trophy Boat Race Punnamada Lake Alappuzha photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/67.png. snake boats racing on Punnamada Lake",
  "images/General_Awareness/Geography/Geomorphic_Regions/68.png": { t: "fig", about: "A long thin map of the east coast split into three coloured parts named Utkal, Northern Circars and Coromandel with the river names Swarnarekha, Mahanadi and Krishna and the city of Kanyakumari at the edges." },
  "images/General_Awareness/Geography/Geomorphic_Regions/69.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kaveri delta paddy fields Thanjavur green rice photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/69.png. green rice fields in the Kaveri delta",
  "images/General_Awareness/Geography/Geomorphic_Regions/70.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Andaman Nicobar islands aerial photo Bay of Bengal\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/70.png. green islands surrounded by blue sea",
  "images/General_Awareness/Geography/Geomorphic_Regions/71.png": { t: "fig", about: "Sketch of the island chain with Andaman islands in the north and Nicobar islands in the south, and four labelled water gaps: Coco Strait, Duncan Passage, Ten Degree Channel and Six Degree Channel." },
  "images/General_Awareness/Geography/Geomorphic_Regions/72.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Barren Island volcano Andaman active volcano photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/72.png. smoke rising from the volcano of Barren Island",
  "images/General_Awareness/Geography/Geomorphic_Regions/73.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lakshadweep Kavaratti lagoon coral island photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/73.png. a coral island with a blue lagoon",
  "images/General_Awareness/Geography/Geomorphic_Regions/74.png": { t: "fig", about: "Sketch of Lakshadweep with Kavaratti and Androth in the north, the Nine Degree Channel in the middle and Minicoy in the south, with the Eight Degree Channel at the bottom leading to the Maldives." },
  "images/General_Awareness/Geography/Geomorphic_Regions/75.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sriharikota Satish Dhawan Space Centre rocket launch photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/75.png. a rocket launching from Sriharikota",
  "images/General_Awareness/Geography/Geomorphic_Regions/76.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Majuli island Assam Brahmaputra river photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/76.png. a village on the river island of Majuli",
  "images/General_Awareness/Geography/Geomorphic_Regions/77.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pamban bridge Rameswaram Pamban Island photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Geomorphic_Regions/77.png. the bridge to Pamban Island"
});

/* CHANGE LOG
   - Mountain peak heights are given in their current standard values: Kanchenjunga 8,586, Makalu 8,485, Dhaulagiri 8,167, Annapurna 8,091, Nanda Devi 7,816 and Namcha Barwa 7,782 metres.
   - Kanchenjunga is described as the highest peak seen from India. K2 is described as the highest peak of the Trans Himalaya and second highest in the world.
   - The Karewa deposits of the Kashmir valley are described as old lake mud, not as moraine deposits.
   - The Bhabar width is given as 8 to 16 kilometres, and the claim that Char is a high land of the delta and that the delta has four sub-classes was removed because those four are the divisions of the plain.
   - The Rajasthan Plain is placed to the west of the Aravalli, with the Aravalli on its eastern edge.
   - Rohtang Pass is described as connecting Kullu and Lahaul-Spiti on the Manali to Leh road, and Burzil Pass as connecting Srinagar and Gilgit.
   - Rimo glacier is not listed under Kashmir; the Karakoram glaciers are listed together, and Zemu is given for the Kanchenjunga region of Sikkim.
   - The highest peak of Meghalaya is given as Shillong Peak, and Nokrek is given as the highest peak of the Garo Hills.
   - The highest peak of the Eastern Ghats is given as Arma Konda (Jindhagada) in Andhra Pradesh, not Mahendragiri.
   - Kolleru Lake is described as one of the largest freshwater lakes in India, not the largest marshland in Asia.
   - Androth is given as the largest island of Lakshadweep, and Minicoy as the southernmost island.
   - Senkota Gap is given as connecting Kollam and Madurai.
   - Indira Point is described as damaged by the 2004 tsunami, and New Moore Island as having gone under the sea.
   - Repeated lines about the Rann of Kutch and Aravalli peaks were merged, and the Parasnath Hill is placed in the Chotanagpur Plateau, not the Vindhya Range.
*/
