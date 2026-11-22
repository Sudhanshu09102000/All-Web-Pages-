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

/* Field: General_Awareness · Subject: Geography · Chapter: Industry_in_India · 17 concept pages (+ overview) · 34 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏭", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Industry in India",
    thumb: {
      image: "images/General_Awareness/Geography/Industry_in_India/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "FAST TRICKS",
      line2: "INDUSTRY",
      line3: "IN INDIA",
      badge: "FULL CLASS",
      ribbon: "PLANTS • REGIONS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Industry in India | Steel, Textile, Jute, Industrial Regions | Geography",
      altTitles: ["Industrial Regions of India in One Class", "Steel Plants of India and Their Partner Countries Trick"],
      description: "Industry in India is a high scoring Geography topic. In this full class we learn it step by step, from the first cotton mill to the eight major industrial regions.\n\n📌 IN THIS CLASS\n✅ Industrial policies of 1948, 1956 and 1991\n✅ Steel plants and the countries that helped build them\n✅ Aluminium, cotton, jute, sugar and tobacco industries\n✅ Industrial regions and their main centres\n✅ Higher level practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Industry before and after independence\n00:00 Steel and aluminium\n00:00 Cotton, jute and sugar\n00:00 Industrial regions\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Geography #IndustryInIndia",
      tags: ["industry in india", "india geography", "industrial regions of india", "steel plants of india", "aluminium industry india", "cotton textile industry", "jute industry india", "sugar industry india", "tobacco industry india", "golden triangle tourism", "silicon valley of india", "footloose industry", "industrial policy 1991", "upsc geography", "ssc cgl geography", "general awareness", "static gk geography", "geography mcq", "indian geography", "important questions", "previous year questions", "competitive exams", "manchester of india", "tricks"],
      hashtags: ["SSCCGL", "Geography", "IndustryInIndia"],
      thumbText: "INDUSTRY IN INDIA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏭 New class is live: Industry in India. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Industry before and after independence\n00:00 Steel and aluminium\n00:00 Cotton, jute and sugar\n00:00 Industrial regions",
      playlist: "Competitive exams Geography — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on Industry in India</u>: how industry began, the main steel, aluminium, textile and farm based industries, and the industrial regions. Geography questions on these topics come again and again, so we will learn the facts slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>17</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>34</b><span>Questions</span></div>
        <div class="cp-stat"><b>~68 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Beginnings and Policies</b><br>How factory industry started before 1947 and how the three big industrial policies after 1947 changed it.</li>
        <li><b>Steel and Aluminium</b><br>The main steel plants and aluminium factories, the states they stand in and the countries that helped to build them.</li>
        <li><b>Cotton, Jute and Sugar</b><br>Where these industries grew, which cities have famous nicknames and which states lead.</li>
        <li><b>Information Technology and Footloose Industries</b><br>Why software firms can be set up almost anywhere and why Bengaluru became so famous.</li>
        <li><b>Tobacco and Tourism</b><br>How tobacco reached India, where it is grown and what the Golden Triangle is.</li>
        <li><b>Industrial Regions</b><br>The eight major and thirteen small industrial regions, their main centres and the reasons they grew.</li>
        <li><b>Practice</b><br>Exam style questions at a higher level, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on steel plants, city nicknames and industrial regions come often, and they mostly test whether you can match a place with the right fact.</div>
    `
  },
  2: {
    type: "concept", icon: "🏭", accent: "#22c55e", pauseTimer: true,
    title: "Industrial Development in Pre-Independence India",
    html: `
      <p class="cp-lead">Modern factory industry came to India in the nineteenth century, during British rule. <u>The first attempts were small or failed, and the first lasting success came in cotton textiles.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/1.png" alt="Bombay cotton mill nineteenth century historic photo" data-caption="An early cotton mill in Mumbai, where the first lasting factory industry of India grew." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">An early iron smelting plant that burned charcoal as fuel was tried, but it did not succeed. Making iron on a big scale was hard with charcoal alone, so this first attempt did not last.</p>
      <p class="cp-lead">The first modern cotton mill was set up in 1818 at Fort Gloster, near Kolkata. The first lasting success came in 1854, when Cowasji Nanabhai Davar started a cotton mill in Mumbai, which was then called Bombay.</p>
      <table><thead><tr><th>Year</th><th>Event</th><th>Place</th></tr></thead><tbody><tr><td>1818</td><td>First modern cotton mill</td><td>Fort Gloster, near Kolkata</td></tr><tr><td>1854</td><td>First successful cotton mill, by Cowasji Nanabhai Davar</td><td>Mumbai</td></tr><tr><td>1855</td><td>First jute mill</td><td>Rishra, near Kolkata</td></tr><tr><td>1907</td><td>Tata Iron and Steel Company set up</td><td>Sakchi, now Jamshedpur</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/2.png" alt="Horizontal timeline with four dots: 1818 first cotton mill, 1854 successful Mumbai cotton " data-caption="Four early steps of Indian factory industry placed in the order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Put the events on a line and you will see that textiles came first, then jute, and steel came last.</div>
      <div class="cp-note trap">Do not mix the first mill of 1818 near Kolkata with the successful mill of 1854 in Mumbai. The 1818 mill came first, but the 1854 mill began the lasting cotton industry.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/3.png" alt="Tata Steel Jamshedpur historic first plant photo" data-caption="The early steel works at Jamshedpur, which began as the small place called Sakchi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Questions often ask who started the first successful cotton mill and in which city. The answer is Cowasji Nanabhai Davar in Mumbai.</div>
    `
  },
  3: {
    questext: "Consider the following statements about early industry in India:\n1. The first modern cotton mill in India was set up near Kolkata in 1818.\n2. The first successful cotton mill in India was set up in Mumbai in 1818.\n3. Cowasji Nanabhai Davar started the successful cotton mill at Mumbai in 1854.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 3 are correct, because the 1818 mill was near Kolkata and the 1854 Mumbai mill was the first lasting success. 📌 Remember 1818 Kolkata first, 1854 Mumbai success. ❌ Statement 2 joins the early date with the wrong mill."
  },
  4: {
    questext: "Arrange the following events in the order in which they took place, from the earliest to the latest:\n1. Start of the Tata Iron and Steel Company at Sakchi\n2. First modern cotton mill at Fort Gloster\n3. First successful cotton mill in Mumbai\nSelect the correct answer using the codes given below:",
    options: ["2, 3, 1", "3, 2, 1", "2, 1, 3", "1, 3, 2"],
    correct: "1",
    exptext: "✅ The order is the Fort Gloster mill in 1818, the Mumbai mill in 1854 and the steel company in 1907. 📌 Remember textiles first and steel later. ❌ Putting the Mumbai mill first forgets that the Kolkata mill came earlier."
  },
  5: {
    type: "concept", icon: "📜", accent: "#f59e0b", pauseTimer: true,
    title: "Industrial Development in India After Independence",
    html: `
      <p class="cp-lead">After 1947 the government used industrial policies to decide <u>which industries the state would run and which the private sector could run</u>. Three announcements matter most for exams.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/4.png" alt="Syama Prasad Mukherjee portrait photo" data-caption="Syama Prasad Mukherjee, who announced the first Industrial Policy as Union Minister for Industries." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Policy</th><th>Date</th><th>Main idea</th></tr></thead><tbody><tr><td>First Industrial Policy</td><td>6 April 1948</td><td>Announced by Syama Prasad Mukherjee, then Union Minister for Industries</td></tr><tr><td>Second Industrial Policy</td><td>30 April 1956</td><td>Divided industries into three groups called schedules</td></tr><tr><td>Policy of Liberalisation, Privatisation and Globalisation</td><td>24 July 1991</td><td>Opened the economy to private and foreign business</td></tr></tbody></table>
      <p class="cp-lead"><b>Liberalisation</b> means removing licences and controls, <b>privatisation</b> means giving private business a larger role, and <b>globalisation</b> means joining the world economy more closely.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/5.png" alt="Three rounded cards in a row: Liberalisation with a crossed-out licence, Privatisation wit" data-caption="The three parts of the 1991 policy: fewer licences, more private business and closer links with the world." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A company that once needed a government licence to start a factory could begin work without that licence after 1991.</div>
      <div class="cp-mnemonic">Remember the three dates as 48, 56 and 91: the first policy, the second policy and the big economic reforms.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/6.png" alt="Horizontal timeline with three markers: 6 April 1948 First Industrial Policy, 30 April 195" data-caption="The three key industrial policy dates of independent India shown in order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Syama Prasad Mukherjee announced the policy of 1948, so do not give the policy of 1956 to him.</div>
      <div class="cp-note exam">The reforms of 1991 came under Prime Minister Narasimha Rao and Finance Minister Manmohan Singh.</div>
    `
  },
  6: {
    questext: "Consider the following statements about industrial policy in India:\n1. The first Industrial Policy was announced on 6 April 1948 by Syama Prasad Mukherjee.\n2. The policy of liberalisation, privatisation and globalisation was announced in July 1991.\n3. The Industrial Policy of 1956 was announced before the first Industrial Policy.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1, 2 and 3", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct, because the first policy came on 6 April 1948 and the new policy came in July 1991. 📌 Remember 48, 56, 91 in order. ❌ Statement 3 is wrong because 1956 came after 1948."
  },
  7: {
    questext: "Which one of the following is correct about the Industrial Policy of 1956?",
    options: ["It was announced by Syama Prasad Mukherjee in April 1956.", "It divided industries into three groups called schedules.", "It removed licences for all private business.", "It gave the private sector no role."],
    correct: "2",
    exptext: "✅ The 1956 policy divided industries into three groups called schedules. 📌 Remember 1956 as the policy of three schedules. ❌ Option 1 is wrong because Syama Prasad Mukherjee announced the policy of 1948, not 1956."
  },
  8: {
    questext: "Consider the following pairs of industrial policy and date:\n1. First Industrial Policy : 6 April 1948\n2. Second Industrial Policy : 30 April 1957\n3. Policy of Liberalisation, Privatisation and Globalisation : 24 July 1991\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 only", "1 and 2 only", "1 and 3 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Pairs 1 and 3 are correct, because the first policy came on 6 April 1948 and the new policy on 24 July 1991. 📌 Remember 48, 56, 91. ❌ Pair 2 is wrong because the second policy came on 30 April 1956."
  },
  9: {
    type: "concept", icon: "⚙️", accent: "#ef4444", pauseTimer: true,
    title: "Iron and Steel Plants of India",
    html: `
      <p class="cp-lead">Steel plants need iron ore, coal and water, so the big plants stand near mines or rivers. <u>After independence, India built several large steel plants with the help of foreign countries.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/7.png" alt="Bhilai Steel Plant blast furnace photo" data-caption="A blast furnace at the Bhilai Steel Plant, one of the first large plants built after independence." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Plant</th><th>State</th><th>Partner country</th><th>Year</th></tr></thead><tbody><tr><td>Bhilai</td><td>Chhattisgarh</td><td>Soviet Union</td><td>Agreement in 1955</td></tr><tr><td>Rourkela</td><td>Odisha</td><td>Germany</td><td>1959</td></tr><tr><td>Durgapur</td><td>West Bengal</td><td>Britain</td><td>1959</td></tr><tr><td>Bokaro</td><td>Jharkhand</td><td>Soviet Union</td><td>Agreement in 1964</td></tr><tr><td>Visakhapatnam</td><td>Andhra Pradesh</td><td>Soviet Union</td><td>Agreement in 1979, approved in 1982</td></tr></tbody></table>
      <p class="cp-lead">Rourkela stands at the meeting point of the Sankh and Koel rivers in Odisha. Durgapur is in the Bardhaman district, and Bokaro is on the bank of the Damodar River.</p>
      <p class="cp-lead">Visakhapatnam Steel Plant stands near Visakhapatnam port, so it is India's first coastal steel plant. Salem Steel Plant stands in the iron ore area of the Shevaroy Hills in Tamil Nadu.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/8.png" alt="Schematic, not a map: five boxes in a row for Bhilai, Rourkela, Durgapur, Bokaro and Visak" data-caption="Five large steel plants and the country that helped to build each one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">Bhilai, Rourkela and Durgapur went to Russia, Germany and Britain in that order, so think of the colours R, G and B.</div>
      <div class="cp-example"><b>Example:</b> A clue that says German help and the meeting point of the Sankh and Koel rivers is pointing to Rourkela in Odisha.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/9.png" alt="Visakhapatnam steel plant coast aerial photo" data-caption="The Visakhapatnam Steel Plant beside the sea, which makes it the first coastal steel plant of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Bhilai, Bokaro and Visakhapatnam all got Soviet help, so do not give Bokaro to Germany or Britain.</div>
      <div class="cp-note exam">Questions ask which plant is at the Sankh and Koel meeting point, which plant is the first coastal plant, and which country helped which plant.</div>
    `
  },
  10: {
    questext: "Consider the following pairs of steel plant and partner country:\n1. Rourkela : Germany\n2. Durgapur : Britain\n3. Bokaro : Germany\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Pairs 1 and 2 are correct, because Rourkela had German help and Durgapur had British help. 📌 Bhilai, Rourkela and Durgapur follow Russia, Germany and Britain. ❌ Bokaro is tempting for Germany, but it was built with Soviet help."
  },
  11: {
    questext: "Consider the following statements about steel plants of India:\n1. Visakhapatnam Steel Plant is the first coastal steel plant of India.\n2. Bokaro Steel Plant stands on the bank of the Brahmani River.\n3. Salem Steel Plant stands in the iron ore area of the Shevaroy Hills.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 1 and 3 are correct, because Visakhapatnam is the first coastal plant and Salem is in the Shevaroy Hills iron ore area. 📌 Remember Bokaro goes with the Damodar River. ❌ Statement 2 is wrong because the Brahmani belongs to the Rourkela side."
  },
  12: {
    questext: "Consider the following steel plants:\n1. Bhilai\n2. Rourkela\n3. Bokaro\n4. Visakhapatnam\nWhich of the plants given above were set up with the cooperation of the Soviet Union?",
    options: ["1 and 3 only", "2 and 4 only", "1, 2 and 3 only", "1, 3 and 4 only"],
    correct: "4",
    exptext: "✅ Bhilai, Bokaro and Visakhapatnam were set up with Soviet cooperation. 📌 Only Rourkela went to Germany and Durgapur to Britain. ❌ Including Rourkela is the common mistake, because it had German help."
  },
  13: {
    type: "concept", icon: "🥈", accent: "#8b5cf6", pauseTimer: true,
    title: "Aluminium Industry",
    html: `
      <p class="cp-lead">Aluminium is a light metal made from an ore called bauxite. India makes enough aluminium for its own needs, so India is <u>self-sufficient in aluminium</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/10.png" alt="bauxite ore red rock sample photo" data-caption="Bauxite, the red rock that is the raw material from which aluminium is made." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Company</th><th>Factory</th><th>State</th></tr></thead><tbody><tr><td>Hindustan Aluminium Corporation (Hindalco)</td><td>Renukoot, Sonbhadra</td><td>Uttar Pradesh</td></tr><tr><td>Bharat Aluminium Company (Balco)</td><td>Korba</td><td>Chhattisgarh</td></tr><tr><td>National Aluminium Company (Nalco)</td><td>Damanjodi, Koraput</td><td>Odisha</td></tr><tr><td>Madras Aluminium Company</td><td>Mettur</td><td>Tamil Nadu</td></tr></tbody></table>
      <p class="cp-lead">Foreign partners also matter for exams. Hindustan Aluminium Corporation worked with the United States, and National Aluminium Company worked with France.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/11.png" alt="Four company cards in a row: Hindustan Aluminium at Renukoot, Bharat Aluminium at Korba, N" data-caption="Four aluminium companies and the places where their main factories stand." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> If a question names Korba, you should think of Bharat Aluminium Company and the state Chhattisgarh.</div>
      <div class="cp-note trap">Do not give France to Hindustan Aluminium Corporation. Its partner was the United States, and the French partner belongs to National Aluminium Company.</div>
      <div class="cp-note exam">Damanjodi in Koraput district of Odisha is the place that is asked most often.</div>
    `
  },
  14: {
    questext: "Consider the following pairs of aluminium company and factory:\n1. National Aluminium Company : Damanjodi in Koraput\n2. Bharat Aluminium Company : Mettur\n3. Hindustan Aluminium Corporation : Renukoot in Sonbhadra\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 and 3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Pairs 1 and 3 are correct, because Damanjodi and Renukoot belong to those two companies. 📌 Mettur belongs to Madras Aluminium Company. ❌ Pair 2 is wrong because Bharat Aluminium Company works at Korba in Chhattisgarh."
  },
  15: {
    questext: "Which one of the following aluminium factories is wrongly paired with its state?",
    options: ["Renukoot : Uttar Pradesh", "Korba : Chhattisgarh", "Damanjodi : Odisha", "Mettur : Kerala"],
    correct: "4",
    exptext: "✅ Mettur is in Tamil Nadu, not in Kerala. 📌 Madras Aluminium Company points to Tamil Nadu. ❌ Korba may look odd to some learners, but it is correctly paired with Chhattisgarh."
  },
  16: {
    type: "concept", icon: "🧵", accent: "#14b8a6", pauseTimer: true,
    title: "Cotton Textile Industry",
    html: `
      <p class="cp-lead">Cotton textile is one of the oldest modern industries of India. <u>Tamil Nadu has the highest number of cotton textile mills in the country today.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/12.png" alt="Mumbai Lower Parel old textile mill chimney photo" data-caption="An old textile mill chimney in Mumbai, the city of the first lasting cotton mills." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The first modern mill was set up in 1818 near Kolkata, and the lasting industry began in Mumbai in 1854. Mumbai is so full of mills that it earned a famous nickname.</p>
      <table><thead><tr><th>City</th><th>Famous name</th></tr></thead><tbody><tr><td>Mumbai</td><td>Cottonopolis of India</td></tr><tr><td>Ahmedabad</td><td>Manchester of India</td></tr><tr><td>Coimbatore</td><td>Manchester of South India</td></tr><tr><td>Kanpur</td><td>Manchester of North India</td></tr></tbody></table>
      <p class="cp-lead">The nicknames come from Manchester, the English city that was famous for cotton cloth. So "Manchester of" simply means a great centre of cotton cloth.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/13.png" alt="Four city cards in a row: Mumbai Cottonopolis, Ahmedabad Manchester of India, Coimbatore M" data-caption="Four cotton textile cities and the famous name that each one carries." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Other cotton textile centres on the map are Surat, Indore and Madurai.</p>
      <div class="cp-mnemonic">Mumbai is the Cottonopolis, Ahmedabad is the plain Manchester, Coimbatore points South and Kanpur points North.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/14.png" alt="cotton plant bolls field photo" data-caption="Open cotton bolls on the plant, the raw material of the cotton textile industry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Tamil Nadu has the most cotton textile mills, but Maharashtra and Gujarat feel more famous because of Mumbai and Ahmedabad.</div>
      <div class="cp-note exam">Nickname matching is the favourite question: Coimbatore is the Manchester of South India and Kanpur is the Manchester of North India.</div>
    `
  },
  17: {
    questext: "Consider the following pairs of city and its famous name:\n1. Coimbatore : Manchester of South India\n2. Kanpur : Manchester of North India\n3. Ahmedabad : Cottonopolis of India\nWhich of the pairs given above is/are correctly matched?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Pairs 1 and 2 are correct, because Coimbatore is in the south and Kanpur is in the north. 📌 Cottonopolis belongs to Mumbai, while Ahmedabad is the Manchester of India. ❌ Pair 3 swaps the two cities."
  },
  18: {
    questext: "Which one of the following states has the highest number of cotton textile mills in India?",
    options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Uttar Pradesh"],
    correct: "2",
    exptext: "✅ Tamil Nadu has the highest number of cotton textile mills. 📌 Fame and number are different things. ❌ Maharashtra and Gujarat are tempting because Mumbai and Ahmedabad are famous mill cities."
  },
  19: {
    type: "concept", icon: "💻", accent: "#ec4899", pauseTimer: true,
    title: "Information Technology Industry",
    html: `
      <p class="cp-lead">The information technology industry makes software and gives computer services. <u>Bengaluru is its biggest centre in India and is called the Silicon Valley of India.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/15.png" alt="Electronic City Bengaluru information technology campus photo" data-caption="A large information technology campus in Bengaluru, the main software centre of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The name copies Silicon Valley in California, in the United States, which is a world famous centre of computer firms.</p>
      <table><thead><tr><th>Place</th><th>Description</th></tr></thead><tbody><tr><td>Bengaluru</td><td>Silicon Valley of India</td></tr><tr><td>Bangalore</td><td>Software capital of the country</td></tr></tbody></table>
      <p class="cp-lead">The Bangalore-Chennai region first grew with the cotton textile industry. After that the state developed at a very fast pace, and Bengaluru became the software capital.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/16.png" alt="Two boxes joined by an arrow: Silicon Valley in California, United States on the left and " data-caption="The famous nickname of Bengaluru is borrowed from the Silicon Valley of the United States." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> When a question says Silicon Valley of India, the answer is Bengaluru in Karnataka.</div>
      <div class="cp-note trap">The Silicon Valley of India is Bengaluru, not Hyderabad or Pune, even though both also have many software firms.</div>
      <div class="cp-note exam">Bengaluru is also named as the software capital of the country.</div>
    `
  },
  20: {
    questext: "Which one of the following pairs of city and its famous name is NOT correctly matched?",
    options: ["Kanpur : Manchester of South India", "Mumbai : Cottonopolis of India", "Ahmedabad : Manchester of India", "Bengaluru : Silicon Valley of India"],
    correct: "1",
    exptext: "✅ Kanpur is the Manchester of North India, not of South India. 📌 Coimbatore is South and Kanpur is North. ❌ Bengaluru is correctly paired with the Silicon Valley of India."
  },
  21: {
    type: "concept", icon: "🧭", accent: "#3b82f6", pauseTimer: true,
    title: "Footloose Industry",
    html: `
      <p class="cp-lead">A footloose industry is one that <u>can be set up almost anywhere</u>, because it is not tied to one place by raw materials or transport.</p>
      <p class="cp-lead">A steel plant must stand near iron ore, coal and water. A software firm needs mainly skilled people, so software industries are placed in the footloose group.</p>
      <table><thead><tr><th>Feature</th><th>Steel plant</th><th>Footloose industry</th></tr></thead><tbody><tr><td>Needs raw material close by</td><td>Yes</td><td>No</td></tr><tr><td>Depends on transport</td><td>Yes</td><td>Hardly</td></tr><tr><td>Example</td><td>Bhilai Steel Plant</td><td>Software industry</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/17.png" alt="Two panels: on the left a steel plant tied by arrows to iron ore, coal and a river; on the" data-caption="A steel plant is tied to its resources, while a footloose industry is free to choose its place." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A software company can open its office in a new city without worrying about where iron ore or coal is found.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/18.png" alt="software engineers working in modern office photo" data-caption="Software engineers at work in an office, a typical footloose industry that needs skills, not raw materials." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Footloose does not mean that the industry needs nothing. It means that raw materials and transport do not decide where it is placed.</div>
      <div class="cp-note exam">Software industry is the standard example of a footloose industry.</div>
    `
  },
  22: {
    questext: "Consider the following statements about footloose industries:\n1. They are not strongly tied to raw materials or transport.\n2. The software industry is included among them.\n3. Iron and steel is the best example of a footloose industry.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct, because footloose industries are free of raw material and transport limits. 📌 Footloose means free to move. ❌ Statement 3 is wrong because steel plants must stand near iron ore, coal and water."
  },
  23: {
    type: "concept", icon: "🌾", accent: "#f97316", pauseTimer: true,
    title: "Jute Industry",
    html: `
      <p class="cp-lead">Jute is a plant fibre used to make sacks, ropes and mats. <u>India is first in the world in producing jute and jute goods, and second in exporting them.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/19.png" alt="jute plants field West Bengal photo" data-caption="Tall jute plants growing in a field, the source of the golden fibre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody><tr><td>World rank of India in production of jute and jute goods</td><td>First</td></tr><tr><td>World rank of India in export</td><td>Second</td></tr><tr><td>Largest jute producing state</td><td>West Bengal</td></tr><tr><td>Second largest jute producing state</td><td>Bihar</td></tr></tbody></table>
      <p class="cp-lead">Jute mills crowd along the Hooghly River near Kolkata, because jute grows in the Bengal delta and the mills can use it close to where it grows. The first jute mill was set up at Rishra in 1855.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/20.png" alt="Ranking board with four rows: Production rank 1, Export rank 2, State rank 1 West Bengal, " data-caption="A simple rank board of India in jute, with the first two states." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks for the second largest jute producing state wants Bihar, because West Bengal is first.</div>
      <div class="cp-note trap">Do not say that India is first in jute exports. India is first in production but second in exports.</div>
      <div class="cp-note exam">Remember the pair first in making and second in selling abroad.</div>
    `
  },
  24: {
    questext: "Consider the following statements about the jute industry in India:\n1. India is the largest producer of jute and jute products in the world.\n2. India is the largest exporter of jute products in the world.\n3. Bihar is the second largest jute producing state after West Bengal.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1, 2 and 3", "1 and 3 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 3 are correct, because India leads in production and Bihar follows West Bengal. 📌 First in making, second in selling abroad. ❌ Statement 2 is wrong because India is only the second largest exporter."
  },
  25: {
    questext: "Which one of the following describes the position of India in jute correctly?",
    options: ["Largest producer and largest exporter", "Largest producer and second largest exporter", "Second largest producer and largest exporter", "Second largest producer and second largest exporter"],
    correct: "2",
    exptext: "✅ India is the largest producer and the second largest exporter of jute and jute goods. 📌 Production first, export second. ❌ Option 1 is tempting, but another country exports more jute goods than India."
  },
  26: {
    type: "concept", icon: "🍬", accent: "#84cc16", pauseTimer: true,
    title: "Sugar Industry",
    html: `
      <p class="cp-lead">Sugar is made from sugarcane. <u>India and Brazil are the two largest sugar producers in the world, and India is the largest user of sugar.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/21.png" alt="sugarcane field harvest India photo" data-caption="A field of tall sugarcane, the plant from which sugar is made." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>State</th></tr></thead><tbody><tr><td>Largest producer of sugarcane</td><td>Uttar Pradesh</td></tr><tr><td>Highest sugarcane yield per hectare</td><td>Tamil Nadu</td></tr><tr><td>Most sugar factories</td><td>Maharashtra</td></tr><tr><td>Largest sugar producing states</td><td>Uttar Pradesh and Maharashtra</td></tr></tbody></table>
      <p class="cp-lead">Yield per hectare means how much cane grows on one hectare of land, while production means the total cane grown in the whole state. That is why Tamil Nadu can lead in yield even though Uttar Pradesh leads in total.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/22.png" alt="Four rounded cards: Largest cane producer Uttar Pradesh, Highest yield per hectare Tamil N" data-caption="Four sugar facts and the state that goes with each fact." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A small state with rich fields, like Tamil Nadu, can top the yield list while Uttar Pradesh tops the production list.</div>
      <div class="cp-note trap">Yield and production are not the same thing. Tamil Nadu leads in yield, but Uttar Pradesh leads in total cane.</div>
      <div class="cp-note exam">Questions ask which state has the highest yield per hectare and which state has the most sugar factories.</div>
    `
  },
  27: {
    questext: "Consider the following statements about sugarcane in India:\n1. Tamil Nadu has the highest sugarcane yield per hectare.\n2. Uttar Pradesh is the largest sugarcane producing state.\n3. Maharashtra has the highest sugarcane yield per hectare.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct, because Tamil Nadu leads in yield and Uttar Pradesh in total cane. 📌 Yield is cane per hectare, and production is total cane. ❌ Statement 3 is wrong because Maharashtra has the most sugar factories, not the highest yield."
  },
  28: {
    questext: "Which one of the following states has the highest sugarcane yield per hectare, although it is not the largest producer of sugarcane?",
    options: ["Uttar Pradesh", "Maharashtra", "Tamil Nadu", "Karnataka"],
    correct: "3",
    exptext: "✅ Tamil Nadu has the highest yield per hectare, while Uttar Pradesh grows the most cane in total. 📌 Yield means cane per hectare. ❌ Uttar Pradesh is tempting, but it leads in total production, not in yield."
  },
  29: {
    type: "concept", icon: "🚬", accent: "#eab308", pauseTimer: true,
    title: "Tobacco Industry",
    html: `
      <p class="cp-lead">Tobacco is a gift of the Portuguese. <u>They brought it to India, and its farming and production began after the year 1508.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/23.png" alt="tobacco plant field Andhra Pradesh photo" data-caption="Broad tobacco leaves growing in a field in the leading tobacco state of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Brought to India by</td><td>The Portuguese</td></tr><tr><td>Farming began</td><td>After 1508</td></tr><tr><td>Leading state in production</td><td>Andhra Pradesh</td></tr><tr><td>Research institute</td><td>Central Tobacco Research Institute, Rajahmundry</td></tr></tbody></table>
      <p class="cp-lead">The Central Tobacco Research Institute studies how to grow better tobacco. It stands at Rajahmundry in Andhra Pradesh, the same state that leads in production.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/24.png" alt="Three step chain: Portuguese bring tobacco after 1508, then Andhra Pradesh leads in produc" data-caption="The story of tobacco in India told in three linked steps." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question about the research institute for tobacco should lead you to Rajahmundry, not to a city that only trades in tobacco.</div>
      <div class="cp-note trap">Guntur is famous for tobacco trade, but the Central Tobacco Research Institute is at Rajahmundry.</div>
      <div class="cp-note exam">Remember Portuguese, 1508, Andhra Pradesh and Rajahmundry as one chain.</div>
    `
  },
  30: {
    questext: "Where is the Central Tobacco Research Institute located?",
    options: ["Guntur", "Rajahmundry", "Hyderabad", "Anand"],
    correct: "2",
    exptext: "✅ The Central Tobacco Research Institute is at Rajahmundry in Andhra Pradesh. 📌 Rajahmundry goes with tobacco research. ❌ Guntur is tempting because it is a famous tobacco area, but the institute is not there."
  },
  31: {
    questext: "Consider the following statements about tobacco in India:\n1. Tobacco was brought to India by the Portuguese, and its farming began after 1508.\n2. Gujarat holds the leading position in tobacco production.\n3. The Central Tobacco Research Institute is at Rajahmundry.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1, 2 and 3", "1 and 3 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 3 are correct. 📌 The Portuguese brought tobacco, and Andhra Pradesh leads. ❌ Statement 2 is wrong because Andhra Pradesh, not Gujarat, holds the leading position."
  },
  32: {
    type: "concept", icon: "🔺", accent: "#06b6d4", pauseTimer: true,
    title: "Tourism Industry",
    html: `
      <p class="cp-lead">Tourism brings visitors and money to a country. <u>India has joined three famous cities into a tourist circuit called the Golden Triangle: Delhi, Agra and Jaipur.</u></p>
      <p class="cp-lead">The three cities form the corners of a triangle on the map. Each one holds a world famous monument: the India Gate in Delhi, the Taj Mahal in Agra and the Hawa Mahal in Jaipur.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/25.png" alt="Schematic, not a map: a triangle with Delhi at the top, Agra at the lower right and Jaipur" data-caption="The Golden Triangle shown as three cities joined by three lines." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>City</th><th>State or territory</th><th>Famous sight</th></tr></thead><tbody><tr><td>Delhi</td><td>Delhi</td><td>India Gate</td></tr><tr><td>Agra</td><td>Uttar Pradesh</td><td>Taj Mahal</td></tr><tr><td>Jaipur</td><td>Rajasthan</td><td>Hawa Mahal</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/26.png" alt="Taj Mahal Agra front view photo" data-caption="The Taj Mahal at Agra, the best known sight on the Golden Triangle circuit." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A tourist who flies into Delhi can visit Agra and Jaipur by road and so complete the whole circuit.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/27.png" alt="Hawa Mahal Jaipur pink palace photo" data-caption="The Hawa Mahal in Jaipur, the pink palace front with its many small windows." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The circuit has Delhi, Agra and Jaipur, so do not replace Jaipur with Jodhpur or Udaipur, which are also in Rajasthan.</div>
      <div class="cp-note exam">Golden Triangle means Delhi, Agra and Jaipur.</div>
    `
  },
  33: {
    questext: "The tourist circuit called the Golden Triangle joins which of the following cities?",
    options: ["Delhi, Agra and Jaipur", "Delhi, Agra and Jodhpur", "Delhi, Jaipur and Udaipur", "Agra, Jaipur and Mathura"],
    correct: "1",
    exptext: "✅ The Golden Triangle joins Delhi, Agra and Jaipur. 📌 Remember D, A and J. ❌ Jodhpur and Udaipur are famous Rajasthan cities, but they are not on this circuit."
  },
  34: {
    questext: "Consider the following statements about the Golden Triangle:\n1. It is a tourist circuit of Agra, Delhi and Jaipur.\n2. Agra is a city in Rajasthan.\n3. Jaipur is the capital of Rajasthan.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 3 are correct, because the circuit has those three cities and Jaipur is the capital of Rajasthan. 📌 Agra is in Uttar Pradesh. ❌ Statement 2 is wrong because Agra stands in Uttar Pradesh."
  },
  35: {
    type: "concept", icon: "🗺️", accent: "#d946ef", pauseTimer: true,
    title: "Industrial Region of India",
    html: `
      <p class="cp-lead">India's industrial regions are divided into <u>8 major regions and 13 small regions</u>. A region is a belt where many factories gather because raw materials, power, labour or ports are close by.</p>
      <table><thead><tr><th>Direction</th><th>Major industrial regions</th></tr></thead><tbody><tr><td>West</td><td>Mumbai-Pune and Gujarat</td></tr><tr><td>North</td><td>Gurugram-Delhi-Meerut</td></tr><tr><td>East</td><td>Kolkata-Hooghly and Chhotanagpur</td></tr><tr><td>South and east coast</td><td>Bangalore-Chennai, Visakhapatnam-Guntur and Kollam-Thiruvananthapuram</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/28.png" alt="Schematic, not a map: eight boxes grouped under West, North, East and South, each box hold" data-caption="The eight major industrial regions of India grouped by direction." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The small regions are listed separately and are named after their main towns, for example Ambala-Amritsar and Indore-Dewas-Ujjain.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/29.png" alt="Two groups of circles: eight large circles labelled Major regions and thirteen small circl" data-caption="A count picture showing eight large regions and thirteen small regions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Gujarat is a major region, but Ambala-Amritsar is only a small region, even though both have many factories.</div>
      <div class="cp-note trap">Do not count a small region such as Ambala-Amritsar among the eight major ones.</div>
      <div class="cp-note exam">Remember the numbers 8 and 13, and learn the eight major names well.</div>
    `
  },
  36: {
    questext: "Which one of the following is NOT among the eight major industrial regions of India?",
    options: ["Kolkata-Hooghly", "Ambala-Amritsar", "Chhotanagpur", "Gujarat"],
    correct: "2",
    exptext: "✅ Ambala-Amritsar is a small industrial region. 📌 Eight regions are major and thirteen are small. ❌ Kolkata-Hooghly, Chhotanagpur and Gujarat are all major regions."
  },
  37: {
    questext: "Consider the following statements about industrial regions of India:\n1. India has 8 major and 13 small industrial regions.\n2. Indore-Dewas-Ujjain is a major industrial region.\n3. Kollam-Thiruvananthapuram is a major industrial region.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1, 2 and 3", "1 and 3 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 3 are correct. 📌 Remember eight major and thirteen small. ❌ Statement 2 is wrong because Indore-Dewas-Ujjain is a small industrial region."
  },
  38: {
    type: "concept", icon: "🌆", accent: "#a855f7", pauseTimer: true,
    title: "Mumbai-Pune and Kolkata-Hooghly Industrial Regions",
    html: `
      <p class="cp-lead">The <b>Mumbai-Pune region</b> stretches from Mumbai and Thane to Pune and to the Nashik and Solapur districts. The <b>Kolkata-Hooghly region</b> grew because raw materials and workers were close by.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/30.png" alt="Schematic, not a map: a line of towns from Mumbai-Thane to Pune, then Nashik and Solapur, " data-caption="The Mumbai-Pune region reaches from Mumbai and Thane to Pune, Nashik and Solapur." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Need</th><th>Where it came from</th></tr></thead><tbody><tr><td>Jute</td><td>The Bengal delta</td></tr><tr><td>Iron ore</td><td>Chhotanagpur</td></tr><tr><td>Coal</td><td>Damodar Valley</td></tr><tr><td>Cheap labour</td><td>Bihar, Uttar Pradesh and other crowded areas</td></tr></tbody></table>
      <p class="cp-lead">The Kolkata-Hooghly region runs from Bansberia in the north to Birlanagar in the south. Its centres include Kolkata, Howrah, Haldia, Serampore, Rishra, Shivpur, Naihati, Guriya, Titagarh and Hooghly.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/31.png" alt="Four arrows pointing to one box: Jute from the Bengal delta, Iron ore from Chhotanagpur, C" data-caption="Four supplies that flow into the Kolkata-Hooghly region and made it grow." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A jute mill near Howrah can take jute from the delta, coal from the Damodar Valley and workers from nearby crowded areas.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/32.png" alt="Howrah Hooghly river industrial area photo" data-caption="Factories and ships along the Hooghly River near Howrah, the heart of an old industrial region." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix the two regions: Mumbai-Pune lies in Maharashtra, while Kolkata-Hooghly lies in West Bengal.</div>
      <div class="cp-note exam">Questions ask for the raw materials that helped the Kolkata-Hooghly region: jute, iron ore, coal and cheap labour.</div>
    `
  },
  39: {
    questext: "Consider the following statements about the Kolkata-Hooghly industrial region:\n1. Jute from the Bengal delta helped its growth.\n2. Iron ore from Chhotanagpur helped its growth.\n3. Hydroelectric power from Bhakra-Nangal helped its growth.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct, because jute and iron ore both helped the region. 📌 Hydroelectric power from Bhakra-Nangal belongs to the Delhi region. ❌ Statement 3 is wrong because Bhakra-Nangal is far from Kolkata."
  },
  40: {
    questext: "Which one of the following sets of places lies within the Mumbai-Pune industrial region?",
    options: ["Thane, Surat, Pune and Solapur", "Mumbai, Nashik, Rajkot and Pune", "Mumbai, Thane, Nashik and Solapur", "Thane, Pune, Vadodara and Nashik"],
    correct: "3",
    exptext: "✅ Mumbai, Thane, Nashik and Solapur all lie within the region. 📌 The region stretches from Mumbai-Thane towards Pune, Nashik and Solapur. ❌ Surat, Rajkot and Vadodara belong to the Gujarat region, not to Mumbai-Pune."
  },
  41: {
    type: "concept", icon: "🛢️", accent: "#e11d48", pauseTimer: true,
    title: "Bangalore-Chennai and Gujarat Industrial Regions",
    html: `
      <p class="cp-lead">The <b>Bangalore-Chennai region</b> began with the cotton textile industry, because it lies in a cotton growing area. It then grew very fast, and Bangalore became the software capital of the country.</p>
      <p class="cp-lead">The <b>Gujarat region</b> also began with cotton textiles, because Gujarat grows cotton. Later the Kandla Port and the petroleum refineries at Koyali and Jamnagar made it stronger.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/33.png" alt="Two step flow: cotton textile industry first, then very fast growth and Bangalore as the s" data-caption="The Bangalore-Chennai region began with cotton textiles and later became famous for software." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Gujarat region</th></tr></thead><tbody><tr><td>Core</td><td>Between Ahmedabad and Vadodara</td></tr><tr><td>Port that helped</td><td>Kandla</td></tr><tr><td>Refineries</td><td>Koyali and Jamnagar</td></tr><tr><td>Other centres</td><td>Bharuch, Anand, Kheda, Surendranagar, Valsad, Surat and Rajkot</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/34.png" alt="Kandla port Gujarat cargo ships photo" data-caption="Ships at Kandla Port, whose growth made the Gujarat industrial region stronger." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Cotton from Gujarat fields feeds the mills of Ahmedabad, and oil handled at the port feeds the refineries nearby.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/35.png" alt="Jamnagar oil refinery Gujarat aerial photo" data-caption="A large oil refinery at Jamnagar, one of the petroleum centres of the Gujarat region." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Both regions began with cotton textiles, so do not say that either one began with iron and steel.</div>
      <div class="cp-note exam">Remember cotton, Kandla Port and the refineries of Koyali and Jamnagar for Gujarat.</div>
    `
  },
  42: {
    questext: "Consider the following statements about the Gujarat industrial region:\n1. It grew mainly because Gujarat is a coal producing state.\n2. The development of Kandla Port made it stronger.\n3. Petroleum refineries stand at Koyali and Jamnagar.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 2 and 3 are correct, because Kandla Port and the refineries strengthened the region. 📌 Think cotton, port and petroleum. ❌ Statement 1 is wrong because the region began with cotton, not coal."
  },
  43: {
    questext: "Consider the following statements about the Bangalore-Chennai industrial region:\n1. Its development began with the cotton textile industry.\n2. Bangalore became the software capital of the country.\n3. Its development began with the iron and steel industry.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1, 2 and 3", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct, because the region began with cotton textiles and later Bangalore became the software capital. 📌 Cotton first, software later. ❌ Statement 3 is wrong because iron and steel did not start this region."
  },
  44: {
    type: "concept", icon: "⛏️", accent: "#10b981", pauseTimer: true,
    title: "Chhotanagpur and Visakhapatnam-Guntur Industrial Regions",
    html: `
      <p class="cp-lead">The Chhotanagpur plateau is rich in minerals, so large <b>integrated</b> iron and steel plants stand at Jamshedpur, Burnpur, Kulti, Bokaro and Rourkela. An integrated plant does every step from iron ore to finished steel in one place.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/36.png" alt="Dhanbad coal mine Jharkhand photo" data-caption="An open coal mine near Dhanbad, the kind of mineral wealth that built the Chhotanagpur region." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Region</th><th>Main centres</th></tr></thead><tbody><tr><td>Chhotanagpur</td><td>Ranchi, Dhanbad, Chaibasa, Sindri, Hazaribagh, Bokaro, Rourkela, Durgapur, Asansol and Dalmianagar</td></tr><tr><td>Visakhapatnam-Guntur</td><td>Visakhapatnam, Vijayanagaram, Rajahmundry, Vijayawada, Guntur, Kurnool and Eluru</td></tr></tbody></table>
      <p class="cp-lead">The Visakhapatnam-Guntur region is spread over the present state of Andhra Pradesh.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/37.png" alt="Two panels: left panel Chhotanagpur with the centres Ranchi, Dhanbad, Bokaro, Rourkela; ri" data-caption="Two industrial regions with a few of their main centres placed side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Kurnool belongs to the Visakhapatnam-Guntur region in Andhra Pradesh, while Dhanbad belongs to the Chhotanagpur region.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/38.png" alt="Visakhapatnam port harbour aerial photo" data-caption="The harbour at Visakhapatnam, the main port of the Visakhapatnam-Guntur industrial region." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not place Ranchi in the Andhra region, or Kurnool in Chhotanagpur, because the two lists are far apart.</div>
      <div class="cp-note exam">Questions ask for the odd centre out between the two lists.</div>
    `
  },
  45: {
    questext: "Which one of the following industrial centres is NOT part of the Chhotanagpur industrial region?",
    options: ["Dhanbad", "Hazaribagh", "Kurnool", "Chaibasa"],
    correct: "3",
    exptext: "✅ Kurnool belongs to the Visakhapatnam-Guntur region. 📌 Chhotanagpur centres lie around Jharkhand and nearby states. ❌ Dhanbad, Hazaribagh and Chaibasa are all listed centres of Chhotanagpur."
  },
  46: {
    questext: "Consider the following statements about the Visakhapatnam-Guntur industrial region:\n1. It is spread over the present state of Andhra Pradesh.\n2. Ranchi is one of its important centres.\n3. Rajahmundry and Eluru are among its centres.\nWhich of the statements given above is/are correct?",
    options: ["1 and 3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 3 are correct, because the region lies in Andhra Pradesh and includes Rajahmundry and Eluru. 📌 Think of the region as the coast of Andhra Pradesh. ❌ Statement 2 is wrong because Ranchi is a centre of Chhotanagpur."
  },
  47: {
    type: "concept", icon: "⚡", accent: "#0ea5e9", pauseTimer: true,
    title: "Gurugram-Delhi-Meerut and Kollam-Thiruvananthapuram Industrial Regions",
    html: `
      <p class="cp-lead">The <b>Gurugram-Delhi-Meerut region</b> grew with the help of labour and power. Hydroelectric power came from Bhakra-Nangal, and thermal electric power came from Panipat and Faridabad.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/39.png" alt="Bhakra Nangal dam Himachal photo" data-caption="The Bhakra Nangal dam, whose hydroelectric power helped the industries of the Delhi region." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Region</th><th>Power or main centres</th></tr></thead><tbody><tr><td>Gurugram-Delhi-Meerut</td><td>Hydroelectric power from Bhakra-Nangal; thermal power from Panipat and Faridabad</td></tr><tr><td>Kollam-Thiruvananthapuram</td><td>Kollam, Thiruvananthapuram, Aluva, Ernakulam, Kochi, Alappuzha and Punalur</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/40.png" alt="Three arrows pointing to one box: Hydroelectric power from Bhakra-Nangal, Thermal power fr" data-caption="Three power sources that supply the factories of the Gurugram-Delhi-Meerut region." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Kollam-Thiruvananthapuram region</b> lies in Kerala along the coast. Its main centres are Kollam, Thiruvananthapuram, Aluva, Ernakulam, Kochi, Alappuzha and Punalur.</p>
      <div class="cp-example"><b>Example:</b> A factory in Faridabad runs on thermal power, while a factory in Delhi may use hydroelectric power sent from Bhakra-Nangal.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/41.png" alt="Kochi harbour Ernakulam port photo" data-caption="The harbour at Kochi, a main centre of the Kollam-Thiruvananthapuram industrial region." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix hydroelectric and thermal power. Bhakra-Nangal gives hydroelectric power, while Panipat and Faridabad give thermal power.</div>
      <div class="cp-note exam">Questions ask which power sources supported the Delhi region and which towns lie in the Kerala region.</div>
    `
  },
  48: {
    questext: "In the Gurugram-Delhi-Meerut industrial region, thermal electric power is obtained from which of the following?",
    options: ["Bhakra and Nangal", "Panipat and Faridabad", "Korba and Singrauli", "Mettur and Neyveli"],
    correct: "2",
    exptext: "✅ Thermal power comes from Panipat and Faridabad. 📌 Bhakra-Nangal gives hydroelectric power, and Panipat and Faridabad give thermal power. ❌ Bhakra and Nangal are tempting, but they give hydroelectric power."
  },
  49: {
    questext: "Which one of the following is NOT a major industrial centre of the Kollam-Thiruvananthapuram region?",
    options: ["Aluva", "Punalur", "Alappuzha", "Coimbatore"],
    correct: "4",
    exptext: "✅ Coimbatore is not in the region, because it lies in Tamil Nadu. 📌 The region lies in Kerala. ❌ Aluva, Punalur and Alappuzha are all listed centres of the region."
  },
  50: {
    type: "concept", icon: "🧩", accent: "#64748b", pauseTimer: true,
    title: "Small Industrial Regions",
    html: `
      <p class="cp-lead">Besides the eight major regions, India has <u>thirteen small industrial regions</u>. They are named after their main towns or areas, and it helps to learn each one with its state.</p>
      <table><thead><tr><th>Small region</th><th>State</th></tr></thead><tbody><tr><td>Ambala-Amritsar</td><td>Punjab</td></tr><tr><td>Saharanpur-Muzaffarnagar-Bijnor</td><td>Uttar Pradesh</td></tr><tr><td>Indore-Dewas-Ujjain</td><td>Madhya Pradesh</td></tr><tr><td>Jaipur-Alwar</td><td>Rajasthan</td></tr><tr><td>Kolhapur-Dakshina Kannada</td><td>Maharashtra and Karnataka</td></tr><tr><td>North Malabar</td><td>Kerala</td></tr><tr><td>Central Malabar</td><td>Kerala</td></tr><tr><td>Adilabad-Nizamabad</td><td>Telangana</td></tr><tr><td>Allahabad (now Prayagraj)-Varanasi-Mirzapur</td><td>Uttar Pradesh</td></tr><tr><td>Bhojpur-Munger</td><td>Bihar</td></tr><tr><td>Durg-Raipur</td><td>Chhattisgarh</td></tr><tr><td>Bilaspur-Korba</td><td>Chhattisgarh</td></tr><tr><td>Brahmaputra Valley</td><td>Assam</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/42.png" alt="Schematic, not a map: state boxes with the number of small regions in each: Uttar Pradesh " data-caption="A count of the small industrial regions state by state." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Durg-Raipur and Bilaspur-Korba are two small regions, and both lie in Chhattisgarh.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Industry_in_India/43.png" alt="Brahmaputra river Assam Guwahati photo" data-caption="The wide Brahmaputra River in Assam, after which the valley industrial region is named." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Kolhapur-Dakshina Kannada is the only small region that spreads over two states, Maharashtra and Karnataka.</div>
      <div class="cp-note exam">Match each small region with its state, and remember that Adilabad-Nizamabad is in Telangana.</div>
    `
  },
  51: {
    questext: "Consider the following pairs of small industrial region and state:\n1. Kolhapur-Dakshina Kannada : Maharashtra and Karnataka\n2. Adilabad-Nizamabad : Andhra Pradesh\n3. Bhojpur-Munger : Bihar\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Pairs 1 and 3 are correct. 📌 Remember that Telangana is a separate state now. ❌ Pair 2 is wrong because Adilabad-Nizamabad lies in Telangana."
  },
  52: {
    questext: "The small industrial regions of North Malabar and Central Malabar lie in which one of the following states?",
    options: ["Kerala", "Karnataka", "Tamil Nadu", "Goa"],
    correct: "1",
    exptext: "✅ Both Malabar regions lie in Kerala. 📌 Malabar is a coastal region of Kerala. ❌ Karnataka is tempting because Dakshina Kannada has its own region."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Industry_in_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a glowing steel furnace ladle pouring molten metal, a cotton boll, and a thin gold outline of India with small industrial dots" },
  "images/General_Awareness/Geography/Industry_in_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bombay cotton mill nineteenth century historic photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/1.png. an early mill building in Mumbai",
  "images/General_Awareness/Geography/Industry_in_India/2.png": { t: "fig", about: "Horizontal timeline with four dots: 1818 first cotton mill, 1854 successful Mumbai cotton mill, 1855 first jute mill, 1907 Tata steel company." },
  "images/General_Awareness/Geography/Industry_in_India/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tata Steel Jamshedpur historic first plant photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/3.png. the early steel works",
  "images/General_Awareness/Geography/Industry_in_India/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Syama Prasad Mukherjee portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/4.png. the minister who announced the first policy",
  "images/General_Awareness/Geography/Industry_in_India/5.png": { t: "fig", about: "Three rounded cards in a row: Liberalisation with a crossed-out licence, Privatisation with a private company building, Globalisation with a globe and an arrow." },
  "images/General_Awareness/Geography/Industry_in_India/6.png": { t: "fig", about: "Horizontal timeline with three markers: 6 April 1948 First Industrial Policy, 30 April 1956 Second Industrial Policy, 24 July 1991 Liberalisation, Privatisation and Globalisation." },
  "images/General_Awareness/Geography/Industry_in_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhilai Steel Plant blast furnace photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/7.png. a large blast furnace",
  "images/General_Awareness/Geography/Industry_in_India/8.png": { t: "fig", about: "Schematic, not a map: five boxes in a row for Bhilai, Rourkela, Durgapur, Bokaro and Visakhapatnam, each showing its partner country: Soviet Union, Germany, Britain, Soviet Union, Soviet Union." },
  "images/General_Awareness/Geography/Industry_in_India/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Visakhapatnam steel plant coast aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/9.png. the plant beside the sea",
  "images/General_Awareness/Geography/Industry_in_India/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"bauxite ore red rock sample photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/10.png. the raw material of aluminium",
  "images/General_Awareness/Geography/Industry_in_India/11.png": { t: "fig", about: "Four company cards in a row: Hindustan Aluminium at Renukoot, Bharat Aluminium at Korba, National Aluminium at Damanjodi, Madras Aluminium at Mettur." },
  "images/General_Awareness/Geography/Industry_in_India/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mumbai Lower Parel old textile mill chimney photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/12.png. an old mill chimney in Mumbai",
  "images/General_Awareness/Geography/Industry_in_India/13.png": { t: "fig", about: "Four city cards in a row: Mumbai Cottonopolis, Ahmedabad Manchester of India, Coimbatore Manchester of South India, Kanpur Manchester of North India." },
  "images/General_Awareness/Geography/Industry_in_India/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"cotton plant bolls field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/14.png. open cotton bolls on the plant",
  "images/General_Awareness/Geography/Industry_in_India/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Electronic City Bengaluru information technology campus photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/15.png. a large technology campus",
  "images/General_Awareness/Geography/Industry_in_India/16.png": { t: "fig", about: "Two boxes joined by an arrow: Silicon Valley in California, United States on the left and Bengaluru in Karnataka, India on the right, with the label Silicon Valley of India." },
  "images/General_Awareness/Geography/Industry_in_India/17.png": { t: "fig", about: "Two panels: on the left a steel plant tied by arrows to iron ore, coal and a river; on the right a free office building with no arrows and the label can be set up anywhere." },
  "images/General_Awareness/Geography/Industry_in_India/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"software engineers working in modern office photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/18.png. people working at computers",
  "images/General_Awareness/Geography/Industry_in_India/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"jute plants field West Bengal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/19.png. tall jute plants growing in a field",
  "images/General_Awareness/Geography/Industry_in_India/20.png": { t: "fig", about: "Ranking board with four rows: Production rank 1, Export rank 2, State rank 1 West Bengal, State rank 2 Bihar." },
  "images/General_Awareness/Geography/Industry_in_India/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sugarcane field harvest India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/21.png. a field of tall sugarcane",
  "images/General_Awareness/Geography/Industry_in_India/22.png": { t: "fig", about: "Four rounded cards: Largest cane producer Uttar Pradesh, Highest yield per hectare Tamil Nadu, Most sugar factories Maharashtra, Top sugar states Uttar Pradesh and Maharashtra." },
  "images/General_Awareness/Geography/Industry_in_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tobacco plant field Andhra Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/23.png. tobacco leaves growing in a field",
  "images/General_Awareness/Geography/Industry_in_India/24.png": { t: "fig", about: "Three step chain: Portuguese bring tobacco after 1508, then Andhra Pradesh leads in production, then Central Tobacco Research Institute at Rajahmundry." },
  "images/General_Awareness/Geography/Industry_in_India/25.png": { t: "fig", about: "Schematic, not a map: a triangle with Delhi at the top, Agra at the lower right and Jaipur at the lower left, joined by three lines." },
  "images/General_Awareness/Geography/Industry_in_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Taj Mahal Agra front view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/26.png. the white marble tomb at Agra",
  "images/General_Awareness/Geography/Industry_in_India/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hawa Mahal Jaipur pink palace photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/27.png. the palace with many small windows",
  "images/General_Awareness/Geography/Industry_in_India/28.png": { t: "fig", about: "Schematic, not a map: eight boxes grouped under West, North, East and South, each box holding one major industrial region name." },
  "images/General_Awareness/Geography/Industry_in_India/29.png": { t: "fig", about: "Two groups of circles: eight large circles labelled Major regions and thirteen small circles labelled Small regions." },
  "images/General_Awareness/Geography/Industry_in_India/30.png": { t: "fig", about: "Schematic, not a map: a line of towns from Mumbai-Thane to Pune, then Nashik and Solapur, with the label Mumbai-Pune Industrial Region." },
  "images/General_Awareness/Geography/Industry_in_India/31.png": { t: "fig", about: "Four arrows pointing to one box: Jute from the Bengal delta, Iron ore from Chhotanagpur, Coal from Damodar Valley, Workers from Bihar and Uttar Pradesh, ending at Kolkata-Hooghly." },
  "images/General_Awareness/Geography/Industry_in_India/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Howrah Hooghly river industrial area photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/32.png. factories beside the river",
  "images/General_Awareness/Geography/Industry_in_India/33.png": { t: "fig", about: "Two step flow: cotton textile industry first, then very fast growth and Bangalore as the software capital, under the label Bangalore-Chennai Industrial Region." },
  "images/General_Awareness/Geography/Industry_in_India/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kandla port Gujarat cargo ships photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/34.png. ships at a busy port",
  "images/General_Awareness/Geography/Industry_in_India/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jamnagar oil refinery Gujarat aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/35.png. a large oil refinery",
  "images/General_Awareness/Geography/Industry_in_India/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dhanbad coal mine Jharkhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/36.png. an open coal mine",
  "images/General_Awareness/Geography/Industry_in_India/37.png": { t: "fig", about: "Two panels: left panel Chhotanagpur with the centres Ranchi, Dhanbad, Bokaro, Rourkela; right panel Visakhapatnam-Guntur with the centres Visakhapatnam, Vijayawada, Guntur, Kurnool." },
  "images/General_Awareness/Geography/Industry_in_India/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Visakhapatnam port harbour aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/38.png. the busy harbour",
  "images/General_Awareness/Geography/Industry_in_India/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhakra Nangal dam Himachal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/39.png. the huge concrete dam",
  "images/General_Awareness/Geography/Industry_in_India/40.png": { t: "fig", about: "Three arrows pointing to one box: Hydroelectric power from Bhakra-Nangal, Thermal power from Panipat, Thermal power from Faridabad, ending at Gurugram-Delhi-Meerut region." },
  "images/General_Awareness/Geography/Industry_in_India/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kochi harbour Ernakulam port photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/41.png. the harbour at Kochi",
  "images/General_Awareness/Geography/Industry_in_India/42.png": { t: "fig", about: "Schematic, not a map: state boxes with the number of small regions in each: Uttar Pradesh 2, Kerala 2, Chhattisgarh 2, and one each for Punjab, Madhya Pradesh, Rajasthan, Telangana, Bihar, Assam." },
  "images/General_Awareness/Geography/Industry_in_India/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Brahmaputra river Assam Guwahati photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Industry_in_India/43.png. the wide river and its valley"
});

/* CHANGE LOG
   - The early charcoal iron smelting attempt is described without a year, because the exact year is uncertain.
   - Corrected the date of the policy of liberalisation, privatisation and globalisation to 24 July 1991.
   - Corrected the name of the founder of the first successful Mumbai cotton mill to Cowasji Nanabhai Davar.
   - Removed the unusual nickname East Boston for Ahmedabad and kept Manchester of India.
   - Used the name Hindustan Aluminium Corporation and left out Ratnagiri as a Bharat Aluminium Company factory.
   - Steel plant years are written as agreement or setting up years to avoid confusion with the start of production.
   - Sugar ranking is written as India and Brazil being the two largest producers, because the first place changes between years.
   - Replaced East Bengal with the Bengal delta, and wrote Allahabad as Allahabad (now Prayagraj).
*/
