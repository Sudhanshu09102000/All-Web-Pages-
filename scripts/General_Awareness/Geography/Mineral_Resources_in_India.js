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

/* Field: General_Awareness · Subject: Geography · Chapter: Mineral_Resources_in_India · 14 concept pages (+ overview) · 29 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "⛏️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Mineral Resources in India",
    thumb: {
      image: "images/General_Awareness/Geography/Mineral_Resources_in_India/thumbnail.png",
      banner: "GEOGRAPHY FOR COMPETITIVE EXAMS 2026",
      line1: "MINERAL RESOURCES",
      line2: "OF INDIA",
      line3: "BELTS • ORES • STATES",
      badge: "FULL CLASS",
      ribbon: "IRON • COPPER • GOLD • MCQ",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Mineral Resources of India | Iron, Copper, Gold, Bauxite | SSC CGL Geography",
      altTitles: ["Minerals of India State Wise Trick for SSC CGL", "Mineral Belts of India in One Class"],
      description: "Minerals are a favourite topic in General Awareness. In this class we learn how minerals are grouped, the four mineral belts of India, and where iron ore, copper, manganese, bauxite, gold, silver, diamond and graphite are found, step by step in simple words.\n\n📌 IN THIS CLASS\n✅ Classification of minerals\n✅ Mineral belts of India\n✅ Major minerals and their states\n✅ Storage, production and institutions\n✅ Practice questions with easy explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Classification\n00:00 Mineral belts\n00:00 Major minerals\n00:00 Institutions\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Minerals #Geography",
      tags: ["mineral resources of india", "minerals of india", "mineral belts of india", "iron ore in india", "copper in india", "manganese in india", "bauxite in india", "gold in india", "silver in india", "diamond in india", "graphite", "minerals state wise", "ssc cgl geography", "general awareness", "static gk", "indian geography", "minerals tricks", "geography mcq", "geography for ssc", "competitive exams", "upsc geography", "banking exams", "railway exams", "defence exams", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "full class", "eral Resources in Ind"],
      hashtags: ["SSCCGL", "Minerals", "Geography"],
      thumbText: "MINERAL RESOURCES OF INDIA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "⛏️ New class is live: Mineral Resources of India, belts, ores and states. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Classification\n00:00 Mineral belts\n00:00 Major minerals\n00:00 Institutions",
      playlist: "General Awareness — Geography Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the minerals of India</u>: how minerals are grouped, where the mineral belts lie, and where each major mineral is found. Mineral questions come in almost every General Awareness paper, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>14</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>29</b><span>Questions</span></div>
        <div class="cp-stat"><b>~57 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Classification of Minerals</b><br>Metallic and non-metallic minerals, and ferrous and non-ferrous metals.</li>
        <li><b>Mineral Belts of India</b><br>The four belts of the Peninsular Plateau and what each belt is rich in.</li>
        <li><b>Iron Ore, Copper, Manganese and Bauxite</b><br>Types, colours, ores, and the states and places where each is found.</li>
        <li><b>Gold, Silver, Diamond and Graphite</b><br>Where each is mined and what it is used for.</li>
        <li><b>Chromite and Marble</b><br>The states and towns linked with them.</li>
        <li><b>Storage, Production and Institutions</b><br>Which states lead in each mineral, and which institution sits in which town.</li>
        <li><b>Practice</b><br>After each topic you will solve questions, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> mineral and state pairs, ores, belts and institution towns are asked again and again, so learning them in pairs gives sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🪨", accent: "#22c55e", pauseTimer: true,
    title: "Classification of Minerals",
    html: `
      <p class="cp-lead">A <b>mineral</b> is a natural substance found in the earth's crust. Minerals are first divided into <b>metallic</b> and <b>non-metallic</b> minerals.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/1.png" alt="Mineral rock samples collection geology photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Metallic minerals are again divided into <b>ferrous</b> minerals, which contain iron, and <b>non-ferrous</b> minerals, which do not.</p>
      <table><thead><tr><th>Group</th><th>Minerals</th></tr></thead><tbody><tr><td>Metallic, ferrous</td><td>Iron ore, manganese, chromium, nickel, cobalt, tungsten</td></tr><tr><td>Metallic, non-ferrous</td><td>Copper, aluminium, tin, lead, silver, platinum, zinc</td></tr><tr><td>Non-metallic</td><td>Diamond, marble, limestone, granite, mica, gypsum, sulphur, pyrite, asbestos</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/2.png" alt="Tree diagram with Minerals at the top, two branches Metallic and Non-metallic, and under M" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Gold is a precious metal. It also belongs to the non-ferrous group, because it contains no iron.</p>
      <div class="cp-note tip">Ferrous comes from the Latin word for iron. So a ferrous mineral has iron or is used with iron to make steel.</div>
      <div class="cp-note trap">Do not put manganese with copper. Manganese is ferrous, because it is mixed with iron to make steel.</div>
      <div class="cp-note exam">Copper, aluminium, tin, lead and zinc are asked as non-ferrous, and mica, gypsum and diamond as non-metallic.</div>
      <div class="cp-mnemonic">Ferrous: Iron, Manganese, Chromium, Nickel, Cobalt, Tungsten.</div>
    `
  },
  3: {
    questext: "Which of the following is a non-ferrous metallic mineral?",
    options: ["Iron ore", "Manganese", "Copper", "Chromium"],
    correct: "3",
    exptext: "✅ Copper contains no iron, so it is non-ferrous. 📌 Copper, tin, lead, zinc are non-ferrous. ❌ Manganese is wrong because it is a ferrous mineral used for steel."
  },
  4: {
    questext: "Which of the following is a non-metallic mineral?",
    options: ["Mica", "Zinc", "Tin", "Lead"],
    correct: "1",
    exptext: "✅ Mica is a non-metallic mineral. 📌 Mica is not a metal. ❌ Zinc is wrong because it is a non-ferrous metal."
  },
  5: {
    type: "concept", icon: "🗺️", accent: "#f59e0b", pauseTimer: true,
    title: "Mineral Belts: North-Eastern Plateau and Middle Belt",
    html: `
      <p class="cp-lead">Most of the mineral wealth of India lies in the Peninsular Plateau. It is divided into four mineral belts: the <b>North-Eastern Plateau belt</b>, the <b>Middle belt</b>, the <b>North-Western or Aravali belt</b>, and the <b>Southern and South-Western belt</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/3.png" alt="Outline map of peninsular India with four coloured belts: North-Eastern Plateau, Middle, N" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>North-Eastern Plateau belt</b> covers the Chotanagpur region and nearby plateaus. It is called the <b>Mineral Heartland of India</b>. It has rocks of the Dharwar and Gondwana systems and the Cuddapah structure.</p>
      <p class="cp-lead">Iron and steel and heavy engineering industries are built here. The Chotanagpur plateau is called the <b>Ruhr of India</b>.</p>
      <p class="cp-lead">The <b>Middle belt</b> extends through Madhya Pradesh, eastern Maharashtra, Chhattisgarh and Telangana. It is the second most important region of India for mineral reserves, with iron ore, coal and copper.</p>
      <table><thead><tr><th>Belt</th><th>Where</th><th>Remember</th></tr></thead><tbody><tr><td>North-Eastern Plateau</td><td>Chotanagpur and nearby plateaus</td><td>Mineral Heartland of India, Ruhr of India</td></tr><tr><td>Middle</td><td>Madhya Pradesh, eastern Maharashtra, Chhattisgarh, Telangana</td><td>Second most important, iron, coal and copper</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/4.png" alt="Jharkhand Chotanagpur plateau open cast coal mine photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Ruhr is a famous industrial region of Germany, and Chotanagpur is called the Ruhr of India for the same reason.</div>
      <div class="cp-note exam">Mineral Heartland of India means the North-Eastern Plateau belt.</div>
    `
  },
  6: {
    questext: "Which mineral belt is called the Mineral Heartland of India?",
    options: ["Middle belt", "Aravali belt", "South-Western belt", "North-Eastern Plateau belt"],
    correct: "4",
    exptext: "✅ The North-Eastern Plateau belt, with Chotanagpur, is the Mineral Heartland of India. 📌 Heart is at the north-eastern plateau. ❌ Middle belt is wrong because it is the second most important belt."
  },
  7: {
    questext: "The Chotanagpur plateau is called the",
    options: ["Silicon Valley of India", "Ruhr of India", "Manchester of India", "Detroit of India"],
    correct: "2",
    exptext: "✅ Chotanagpur is called the Ruhr of India because of its minerals and heavy industries. 📌 Ruhr means coal and steel. ❌ Manchester of India is wrong because that name belongs to Ahmedabad for cotton cloth."
  },
  8: {
    type: "concept", icon: "🧭", accent: "#ef4444", pauseTimer: true,
    title: "Mineral Belts: Aravali and South-Western Belt",
    html: `
      <p class="cp-lead">The <b>North-Western or Aravali belt</b> covers the Aravali mountain region of Gujarat and Rajasthan. Because of the Dharwar and Cuddapah rocks here, it has plenty of metallic and non-metallic minerals.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/5.png" alt="Aravali hills Rajasthan marble mine photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It is rich in copper, zinc, sandstone, granite, marble and gypsum. It also has large deposits of Multani Mitti, which is fuller's earth.</p>
      <p class="cp-lead">The <b>Southern and South-Western belt</b> covers Goa, the plateau of Karnataka and the higher parts of Tamil Nadu. It is the third most important mineral region of the Peninsular Plateau.</p>
      <p class="cp-lead">Because of the Dharwar structure here, it has the largest reserve of iron ore. Kudremukh in the Baba Budan hills of Karnataka and Goa are the most important iron ore areas. Kerala has reserves of <b>monazite</b>, which gives thorium.</p>
      <table><thead><tr><th>Belt</th><th>Where</th><th>Remember</th></tr></thead><tbody><tr><td>North-Western or Aravali</td><td>Gujarat and Rajasthan</td><td>Copper, zinc, marble, Multani Mitti</td></tr><tr><td>Southern and South-Western</td><td>Goa, Karnataka plateau, Tamil Nadu highlands</td><td>Iron ore, Kudremukh, monazite of Kerala</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/6.png" alt="Map of south-west India with Goa, Karnataka and Kerala marked, and mineral icons: iron ore" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Monazite is in Kerala and gives thorium, which is used for atomic energy.</div>
      <div class="cp-note exam">Multani Mitti goes with the Aravali belt, and Kudremukh goes with the Southern belt.</div>
    `
  },
  9: {
    questext: "Multani Mitti is found in which mineral belt?",
    options: ["Middle belt", "North-Eastern Plateau belt", "North-Western or Aravali belt", "Southern belt"],
    correct: "3",
    exptext: "✅ Large Multani Mitti deposits are found in the Aravali belt of Rajasthan and Gujarat. 📌 Multani goes west. ❌ Southern belt is wrong because it is known for iron ore and monazite."
  },
  10: {
    questext: "Monazite, which gives thorium, is found in",
    options: ["Kerala", "Rajasthan", "Odisha", "Gujarat"],
    correct: "1",
    exptext: "✅ Kerala has reserves of monazite, which gives thorium. 📌 Monazite, thorium, Kerala. ❌ Rajasthan is wrong because it is known for copper and zinc."
  },
  11: {
    type: "concept", icon: "🔩", accent: "#8b5cf6", pauseTimer: true,
    title: "Iron Ore",
    html: `
      <p class="cp-lead"><b>Iron ore</b> is found in large amounts in India. About 95 percent of the total reserves lie in Odisha, Jharkhand, Chhattisgarh, Karnataka, Goa, Andhra Pradesh and Tamil Nadu.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/7.png" alt="Iron ore raw rock sample photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Four types of iron ore are found. They are ranked by the amount of iron in them.</p>
      <table><thead><tr><th>Name</th><th>Colour</th><th>Iron content</th></tr></thead><tbody><tr><td>Magnetite</td><td>Black</td><td>About 72 percent, the best</td></tr><tr><td>Haematite</td><td>Red</td><td>About 60 to 70 percent</td></tr><tr><td>Limonite</td><td>Yellow</td><td>About 40 to 60 percent</td></tr><tr><td>Siderite</td><td>Brown</td><td>Up to about 40 percent, more impurities</td></tr></tbody></table>
      <table><thead><tr><th>State</th><th>Major regions</th></tr></thead><tbody><tr><td>Odisha</td><td>Gurumahisani, Badampahad, Banspani</td></tr><tr><td>Chhattisgarh</td><td>Bailadila, Dantewada, Bastar</td></tr><tr><td>Jharkhand</td><td>Noamundi, Palamu</td></tr><tr><td>Karnataka</td><td>Bellary, Shimoga, Chitradurga, Kudremukh, Baba Budan</td></tr><tr><td>Maharashtra</td><td>Ratnagiri</td></tr><tr><td>Gujarat</td><td>Bhavnagar, Porbandar, Junagadh</td></tr><tr><td>Rajasthan</td><td>Udaipur</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/8.png" alt="Bar chart of the four iron ores in order of iron content: Magnetite about 72 percent (blac" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Black is the best and brown is the weakest. The order follows the colour: black, red, yellow, brown.</div>
      <div class="cp-note trap">Haematite is the most used iron ore in India, but magnetite is the richest in iron.</div>
      <div class="cp-note exam">Questions give a colour and ask the ore, or ask where Bailadila and Gurumahisani are.</div>
      <div class="cp-mnemonic">Magnetite Has Little Strength: Magnetite, Haematite, Limonite, Siderite.</div>
    `
  },
  12: {
    questext: "Which iron ore has the highest iron content?",
    options: ["Siderite", "Limonite", "Haematite", "Magnetite"],
    correct: "4",
    exptext: "✅ Magnetite is black and has about 72 percent iron. 📌 Black is best. ❌ Haematite is wrong because it has 60 to 70 percent."
  },
  13: {
    questext: "What is the colour of haematite iron ore?",
    options: ["Black", "Red", "Yellow", "Brown"],
    correct: "2",
    exptext: "✅ Haematite is red. 📌 Haem means blood, and blood is red. ❌ Black is wrong because that is magnetite."
  },
  14: {
    questext: "The Bailadila iron ore deposits are in",
    options: ["Odisha", "Jharkhand", "Chhattisgarh", "Karnataka"],
    correct: "3",
    exptext: "✅ Bailadila is in the Bastar region of Chhattisgarh. 📌 Bailadila means Bastar. ❌ Odisha is wrong because it has Gurumahisani and Badampahad."
  },
  15: {
    type: "concept", icon: "🟠", accent: "#14b8a6", pauseTimer: true,
    title: "Copper",
    html: `
      <p class="cp-lead">In India, <b>copper</b> is found in the ancient rocks of the Dharwar and Cuddapah systems.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/9.png" alt="Copper ore raw native copper rock photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It is mined in Jharkhand, Andhra Pradesh, Rajasthan and Madhya Pradesh. India imports a large amount of copper from other countries.</p>
      <table><thead><tr><th>State</th><th>Major regions</th></tr></thead><tbody><tr><td>Jharkhand</td><td>Ghatsila, Surda (East Singhbhum), Sonamakhi, Mosabani, Rajdah, Palamu, Santhal Pargana</td></tr><tr><td>Rajasthan</td><td>Alwar, Jhunjhunu, Udaipur, Bhilwara</td></tr><tr><td>Andhra Pradesh</td><td>Guntur, Kurnool, Nellore, Anantapur</td></tr><tr><td>Madhya Pradesh</td><td>Balaghat, Betul</td></tr></tbody></table>
      <p class="cp-lead">Khetri in Jhunjhunu district of Rajasthan is the famous copper mining area.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/10.png" alt="Map of India with four copper areas marked: Singhbhum in Jharkhand, Khetri in Rajasthan, B" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Copper is a non-ferrous metal and good for electric wires. Do not call it a ferrous mineral.</div>
      <div class="cp-note exam">Khetri in Rajasthan and Singhbhum in Jharkhand are the main copper areas.</div>
    `
  },
  16: {
    questext: "Copper in India is found in which ancient rock structures?",
    options: ["Dharwar and Cuddapah", "Gondwana only", "Deccan Trap", "Siwalik"],
    correct: "1",
    exptext: "✅ Copper occurs in the old Dharwar and Cuddapah rocks. 📌 Old rocks hold metals. ❌ Siwalik is wrong because it is young and sandy."
  },
  17: {
    questext: "The Khetri copper mines are in which state?",
    options: ["Madhya Pradesh", "Jharkhand", "Andhra Pradesh", "Rajasthan"],
    correct: "4",
    exptext: "✅ Khetri is in the Jhunjhunu district of Rajasthan. 📌 Khetri means Rajasthan. ❌ Jharkhand is wrong because its copper is in Singhbhum."
  },
  18: {
    type: "concept", icon: "⚫", accent: "#ec4899", pauseTimer: true,
    title: "Manganese",
    html: `
      <p class="cp-lead"><b>Manganese</b> is a hard black metal found in the Dharwar rocks. It is used to harden steel.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/11.png" alt="Manganese ore pyrolusite rock photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Its main ores are <b>pyrolusite</b>, psilomelane and braunite.</p>
      <p class="cp-lead">India is a major producer of manganese, and it exports mostly raw manganese.</p>
      <table><thead><tr><th>State</th><th>Major regions</th></tr></thead><tbody><tr><td>Odisha</td><td>Kalahandi, Mayurbhanj, Koraput</td></tr><tr><td>Maharashtra</td><td>Nagpur, Ratnagiri</td></tr><tr><td>Madhya Pradesh</td><td>Balaghat, Chhindwara, Jhabua</td></tr><tr><td>Karnataka</td><td>Bellary, Chitradurga, Dharwad, Shimoga</td></tr><tr><td>Gujarat</td><td>Banaskantha, Sabarkantha</td></tr><tr><td>Rajasthan</td><td>Banswara</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/12.png" alt="Map of India with six manganese states marked as dots: Odisha, Maharashtra, Madhya Pradesh" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Manganese is a ferrous mineral, because it is used mostly in steel making.</div>
      <div class="cp-note exam">Pyrolusite is the main ore of manganese.</div>
    `
  },
  19: {
    questext: "Which of the following is an ore of manganese?",
    options: ["Magnetite", "Pyrolusite", "Bauxite", "Argentite"],
    correct: "2",
    exptext: "✅ Pyrolusite is the main ore of manganese. 📌 Pyrolusite starts with P, like pyro. ❌ Magnetite is wrong because it is an ore of iron."
  },
  20: {
    questext: "Manganese in India is found in which rock formation?",
    options: ["Vindhyan", "Tertiary", "Dharwar", "Alluvium"],
    correct: "3",
    exptext: "✅ Manganese is found in the Dharwar structures. 📌 Dharwar is the mineral house. ❌ Alluvium is wrong because it is young and loose soil."
  },
  21: {
    type: "concept", icon: "🔴", accent: "#3b82f6", pauseTimer: true,
    title: "Bauxite",
    html: `
      <p class="cp-lead"><b>Bauxite</b> is the ore of aluminium. It is reddish and found in clay-like lumps.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/13.png" alt="Bauxite ore red rock lumps mine photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Kalahandi and Koraput</b> districts of Odisha are the largest bauxite fields in India. High-grade bauxite is found in Palamu and Lohardaga in Jharkhand.</p>
      <table><thead><tr><th>State</th><th>Major regions</th></tr></thead><tbody><tr><td>Odisha</td><td>Kalahandi, Koraput, Balgir</td></tr><tr><td>Gujarat</td><td>Bhavnagar, Junagadh, Jamnagar</td></tr><tr><td>Jharkhand</td><td>Palamu, Lohardaga</td></tr><tr><td>Maharashtra</td><td>Kolhapur, Ratnagiri, Satara</td></tr><tr><td>Chhattisgarh</td><td>Surguja, Raipur, Bilaspur, Rajnandgaon</td></tr><tr><td>Tamil Nadu</td><td>Nilgiri Hills, Madurai</td></tr><tr><td>Madhya Pradesh</td><td>Maikal range</td></tr><tr><td>Karnataka</td><td>Dakshina Kannada, Baba Budan hills, Belagavi</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/14.png" alt="Flow diagram: red bauxite rock, then crushing, then alumina, then aluminium metal, with th" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Bauxite is not aluminium itself. It is the ore from which aluminium is made.</div>
      <div class="cp-note exam">Odisha is the top bauxite state, and Kalahandi and Koraput are the largest fields.</div>
    `
  },
  22: {
    questext: "The largest bauxite fields of India are in",
    options: ["Kalahandi and Koraput", "Panna and Satna", "Kolar and Hutti", "Bellary and Hospet"],
    correct: "1",
    exptext: "✅ Kalahandi and Koraput in Odisha are the largest bauxite fields. 📌 Bauxite means Odisha. ❌ Kolar and Hutti is wrong because they are gold areas."
  },
  23: {
    questext: "Aluminium is made from which ore?",
    options: ["Haematite", "Pyrolusite", "Galena", "Bauxite"],
    correct: "4",
    exptext: "✅ Aluminium is obtained from bauxite. 📌 Bauxite gives aluminium. ❌ Haematite is wrong because it gives iron."
  },
  24: {
    type: "concept", icon: "🥇", accent: "#f97316", pauseTimer: true,
    title: "Gold",
    html: `
      <p class="cp-lead">In India, <b>gold</b> is found in two ways: inside the rocks of the Dharwar formation, and as tiny grains called <b>placer deposits</b> in the sand of rivers.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/15.png" alt="Gold grains nuggets sample photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It is mainly found in Karnataka and Andhra Pradesh. In Karnataka it is found at Kolar, at the Champion Reef, and at Hutti in the Raichur district.</p>
      <p class="cp-lead">Gold particles are also found in the sand of the Swarnarekha river in Jharkhand, and in Anantapur and Chittoor in Andhra Pradesh.</p>
      <table><thead><tr><th>State</th><th>Major regions</th></tr></thead><tbody><tr><td>Karnataka</td><td>Kolar, Raichur</td></tr><tr><td>Andhra Pradesh</td><td>Anantapur</td></tr><tr><td>Jharkhand</td><td>Swarnarekha river</td></tr></tbody></table>
      <p class="cp-lead">Gold is a major mineral that India imports, because home production is small.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/16.png" alt="Map of India with three gold areas marked: Kolar and Hutti in Karnataka, Anantapur in Andh" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not think India is a big gold producer. India produces little and imports much.</div>
      <div class="cp-note exam">Kolar is the famous gold field of Karnataka, and Swarnarekha means gold line.</div>
    `
  },
  25: {
    questext: "Kolar gold fields are in which state?",
    options: ["Andhra Pradesh", "Karnataka", "Jharkhand", "Rajasthan"],
    correct: "2",
    exptext: "✅ Kolar is in Karnataka. 📌 Kolar means Karnataka. ❌ Andhra Pradesh is wrong because its gold is in Anantapur."
  },
  26: {
    questext: "Gold is found in the sand of the Swarnarekha river in which state?",
    options: ["Rajasthan", "Karnataka", "Jharkhand", "Odisha"],
    correct: "3",
    exptext: "✅ The Swarnarekha river, whose name means gold line, carries gold grains in Jharkhand. 📌 Swarna means gold. ❌ Karnataka is wrong because its gold is in rocks, mostly at Kolar and Hutti."
  },
  27: {
    type: "concept", icon: "🥈", accent: "#84cc16", pauseTimer: true,
    title: "Silver",
    html: `
      <p class="cp-lead">India has enough <b>silver</b> reserves in Andhra Pradesh, Rajasthan and Jharkhand. Its main ores are argentite, pyrargyrite and horn silver.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/17.png" alt="Raw silver ore sample photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The most silver is produced in Rajasthan. The zinc mines of Udaipur and Chittorgarh give silver as well, because silver is found along with zinc and lead.</p>
      <table><thead><tr><th>State</th><th>Major regions</th></tr></thead><tbody><tr><td>Karnataka</td><td>Chitradurga, Bellary</td></tr><tr><td>Andhra Pradesh</td><td>Cuddapah, Guntur, Kurnool</td></tr><tr><td>Rajasthan</td><td>Jawar</td></tr><tr><td>Uttarakhand</td><td>Almora</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/18.png" alt="Map of India with silver areas marked: Jawar in Rajasthan, Chitradurga and Bellary in Karn" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Silver in India is mostly a by-product of zinc and lead mining, not mined alone.</div>
      <div class="cp-note exam">Rajasthan produces the most silver, and Jawar is in Udaipur.</div>
    `
  },
  28: {
    questext: "Which state produces the most silver in India?",
    options: ["Rajasthan", "Karnataka", "Bihar", "Uttar Pradesh"],
    correct: "1",
    exptext: "✅ Rajasthan gives the most silver, from the zinc mines of Udaipur and Chittorgarh. 📌 Zinc mines give silver. ❌ Karnataka is wrong because it is second in production."
  },
  29: {
    questext: "Which of the following is an ore of silver?",
    options: ["Bauxite", "Pyrolusite", "Magnetite", "Argentite"],
    correct: "4",
    exptext: "✅ Argentite is an ore of silver. 📌 Argentum means silver. ❌ Magnetite is wrong because it is iron ore."
  },
  30: {
    type: "concept", icon: "💎", accent: "#06b6d4", pauseTimer: true,
    title: "Diamond",
    html: `
      <p class="cp-lead"><b>Diamond</b> is the purest form of carbon. It is the hardest natural substance.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/19.png" alt="Rough uncut diamond crystals photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Black diamond is used in industry for cutting glass and making holes in rocks.</p>
      <table><thead><tr><th>State</th><th>Major regions</th></tr></thead><tbody><tr><td>Madhya Pradesh</td><td>Panna</td></tr><tr><td>Andhra Pradesh</td><td>Golconda</td></tr><tr><td>Chhattisgarh</td><td>Raipur, Gariaband</td></tr></tbody></table>
      <p class="cp-lead">Panna in Madhya Pradesh is the main diamond area, and Madhya Pradesh is the top diamond producing state.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/20.png" alt="Three-part picture of carbon: a black lump labelled Graphite, a clear crystal labelled Dia" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Diamond and graphite are both pure carbon. They differ only in the way the atoms are arranged.</div>
      <div class="cp-note exam">Panna is the diamond area of Madhya Pradesh.</div>
    `
  },
  31: {
    questext: "Panna, famous for diamonds, is in",
    options: ["Chhattisgarh", "Madhya Pradesh", "Andhra Pradesh", "Odisha"],
    correct: "2",
    exptext: "✅ Panna is in Madhya Pradesh. 📌 Panna and Madhya Pradesh both have the letter M and the letter P. ❌ Chhattisgarh is wrong because it has smaller diamond areas at Raipur and Gariaband."
  },
  32: {
    questext: "The purest form of carbon is",
    options: ["graphite", "coal", "diamond", "charcoal"],
    correct: "3",
    exptext: "✅ Diamond is the purest form of carbon. 📌 Diamond is pure carbon, graphite is soft carbon. ❌ Graphite is wrong because it is also carbon but less pure and soft."
  },
  33: {
    type: "concept", icon: "✏️", accent: "#a855f7", pauseTimer: true,
    title: "Graphite",
    html: `
      <p class="cp-lead"><b>Graphite</b> is mainly found in igneous and metamorphic rocks. It is also called <b>crystalline carbon</b> and <b>black lead</b>. It is a form of carbon.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/21.png" alt="Graphite mineral black shiny lump photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It is used to make pencil lead. In nuclear reactors it is used as a moderator, which slows down the reaction.</p>
      <table><thead><tr><th>State</th><th>Major regions</th></tr></thead><tbody><tr><td>Tamil Nadu</td><td>Madurai</td></tr><tr><td>Odisha</td><td>Kalahandi, Balangir</td></tr><tr><td>Rajasthan</td><td>Ajmer, Alwar, Banswara</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/22.png" alt="Picture of a pencil with its tip labelled Graphite, and a nuclear reactor box with rods la" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Graphite is called black lead, but it has no lead metal in it.</div>
      <div class="cp-note exam">Black lead, crystalline carbon, pencil and moderator all go with graphite.</div>
    `
  },
  34: {
    questext: "Which mineral is also called black lead?",
    options: ["Graphite", "Diamond", "Coal", "Mica"],
    correct: "1",
    exptext: "✅ Graphite is called black lead and is used in pencils. 📌 Pencil lead is graphite. ❌ Diamond is wrong because it is a clear crystal of carbon."
  },
  35: {
    questext: "In a nuclear reactor, graphite is used as a",
    options: ["fuel", "coolant", "shield", "moderator"],
    correct: "4",
    exptext: "✅ Graphite slows down the fast particles, so it works as a moderator. 📌 Moderator calms the reaction. ❌ Fuel is wrong because uranium is the fuel."
  },
  36: {
    type: "concept", icon: "🏛️", accent: "#e11d48", pauseTimer: true,
    title: "Chromite and Marble",
    html: `
      <p class="cp-lead"><b>Chromite</b> is the ore of chromium, which is used to make stainless steel. Most of it is produced in Odisha.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/23.png" alt="Chromite ore rock sample photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Cuttack and Keonjhar districts of Odisha are famous for chromite. It is also produced in the Hassan district of Karnataka.</p>
      <p class="cp-lead"><b>Marble</b> is a metamorphic rock, made when limestone is changed by heat and pressure. It is used mainly in building.</p>
      <p class="cp-lead">The Makrana region of Rajasthan is famous for the best quality marble.</p>
      <table><thead><tr><th>Mineral</th><th>Facts</th></tr></thead><tbody><tr><td>Chromite</td><td>Mostly Odisha, Cuttack and Keonjhar, also Hassan in Karnataka</td></tr><tr><td>Marble</td><td>Metamorphic rock, Makrana in Rajasthan</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/24.png" alt="Makrana white marble quarry Rajasthan photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Marble is not an igneous rock. It is metamorphic.</div>
      <div class="cp-note exam">Makrana marble belongs to Rajasthan, and chromite belongs to Odisha.</div>
    `
  },
  37: {
    questext: "Makrana, famous for marble, is in",
    options: ["Gujarat", "Rajasthan", "Madhya Pradesh", "Karnataka"],
    correct: "2",
    exptext: "✅ Makrana in Rajasthan gives the best quality marble. 📌 Makrana means marble, and the Taj is made of Makrana marble. ❌ Gujarat is wrong because it is known for limestone and granite."
  },
  38: {
    questext: "Which state produces the most chromite in India?",
    options: ["Karnataka", "Jharkhand", "Odisha", "Andhra Pradesh"],
    correct: "3",
    exptext: "✅ Odisha produces the most chromite, mainly in Cuttack and Keonjhar. 📌 Chromite is Odisha. ❌ Karnataka is wrong because it gives only a small share from Hassan."
  },
  39: {
    type: "concept", icon: "📊", accent: "#10b981", pauseTimer: true,
    title: "Mineral Storage and Production in India",
    html: `
      <p class="cp-lead">This table shows which states have the largest storage, or reserves, of a mineral and which states produce the most of it.</p>
      <table><thead><tr><th>Mineral</th><th>Top states in storage</th><th>Top states in production</th></tr></thead><tbody><tr><td>Iron ore, haematite</td><td>Odisha, Jharkhand, Chhattisgarh</td><td>Odisha, Karnataka, Chhattisgarh</td></tr><tr><td>Iron ore, magnetite</td><td>Karnataka, Andhra Pradesh, Rajasthan</td><td>Odisha, Karnataka, Chhattisgarh</td></tr><tr><td>Gold</td><td>Karnataka, Rajasthan, Bihar</td><td>Karnataka, Jharkhand</td></tr><tr><td>Silver</td><td>Rajasthan, Jharkhand, Andhra Pradesh</td><td>Rajasthan, Karnataka</td></tr><tr><td>Diamond</td><td>Madhya Pradesh, Andhra Pradesh, Chhattisgarh</td><td>Madhya Pradesh</td></tr><tr><td>Copper</td><td>Rajasthan, Jharkhand, Madhya Pradesh</td><td>Madhya Pradesh, Rajasthan, Jharkhand</td></tr><tr><td>Bauxite</td><td>Odisha, Andhra Pradesh, Gujarat</td><td>Odisha, Gujarat, Maharashtra</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/25.png" alt="A grid with seven mineral names on the left and three state names to their right for stora" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Odisha is first in the storage and production of iron ore and bauxite. Madhya Pradesh is first in diamond production.</p>
      <div class="cp-note trap">The state with the largest storage is not always the state with the largest production. Copper is an example.</div>
      <div class="cp-note exam">Odisha for iron ore and bauxite, Rajasthan for silver, Madhya Pradesh for diamond and copper production.</div>
    `
  },
  40: {
    questext: "Which state is first in the production of bauxite?",
    options: ["Gujarat", "Odisha", "Maharashtra", "Jharkhand"],
    correct: "2",
    exptext: "✅ Odisha is first in both storage and production of bauxite. 📌 Bauxite and Odisha go together. ❌ Gujarat is wrong because it is second in production."
  },
  41: {
    questext: "Which state is first in the production of copper?",
    options: ["Rajasthan", "Jharkhand", "Karnataka", "Madhya Pradesh"],
    correct: "4",
    exptext: "✅ Madhya Pradesh leads copper production, while Rajasthan leads storage. 📌 Storage is Rajasthan, production is Madhya Pradesh. ❌ Rajasthan is wrong because it is second in production."
  },
  42: {
    type: "concept", icon: "🏢", accent: "#eab308", pauseTimer: true,
    title: "Major Mineral Institutions",
    html: `
      <p class="cp-lead">Several institutions explore, study and mine minerals in India. Each is linked with one town.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/26.png" alt="Jamshedpur National Metallurgical Laboratory building photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Institution</th><th>Town</th></tr></thead><tbody><tr><td>Mineral Exploration Corporation Limited</td><td>Nagpur</td></tr><tr><td>Indian Bureau of Mines</td><td>Nagpur</td></tr><tr><td>Central Institute of Mining and Fuel Research</td><td>Dhanbad</td></tr><tr><td>National Metallurgical Laboratory</td><td>Jamshedpur</td></tr><tr><td>Hindustan Zinc Limited</td><td>Udaipur</td></tr><tr><td>Hindustan Copper Limited</td><td>Khetri mines in Rajasthan</td></tr></tbody></table>
      <p class="cp-lead">Nagpur has two bodies: the Mineral Exploration Corporation Limited and the Indian Bureau of Mines.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Mineral_Resources_in_India/27.png" alt="Map of central and eastern India with six towns marked: Nagpur (two institutions), Dhanbad" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix Dhanbad and Jamshedpur. Dhanbad is for mining and fuel, and Jamshedpur is for metal research.</div>
      <div class="cp-note exam">Questions give an institution and ask for the town.</div>
      <div class="cp-mnemonic">Nagpur has Two, Dhanbad Digs, Jamshedpur Joins Metal, Udaipur Uses Zinc.</div>
    `
  },
  43: {
    questext: "The head office of Hindustan Zinc Limited is at",
    options: ["Nagpur", "Dhanbad", "Jamshedpur", "Udaipur"],
    correct: "4",
    exptext: "✅ Hindustan Zinc Limited is based at Udaipur, near the Zawar mines. 📌 Zinc and Udaipur. ❌ Nagpur is wrong because it hosts the Indian Bureau of Mines."
  },
  44: {
    questext: "The National Metallurgical Laboratory is in",
    options: ["Dhanbad", "Jamshedpur", "Nagpur", "Khetri"],
    correct: "2",
    exptext: "✅ The National Metallurgical Laboratory is in Jamshedpur. 📌 Metal research, steel city. ❌ Dhanbad is wrong because it has the mining and fuel institute."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Mineral_Resources_in_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a lump of iron ore, a copper nugget, a rough diamond and a small outline map of India" },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mineral rock samples collection geology photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/1.png. a tray of different mineral rock samples",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/2.png": { t: "fig", about: "Tree diagram with Minerals at the top, two branches Metallic and Non-metallic, and under Metallic two branches Ferrous and Non-ferrous, each with its mineral names listed." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/3.png": { t: "fig", about: "Outline map of peninsular India with four coloured belts: North-Eastern Plateau, Middle, North-Western Aravali and Southern and South-Western, each labelled." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jharkhand Chotanagpur plateau open cast coal mine photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/4.png. a large open mine in the Chotanagpur plateau",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aravali hills Rajasthan marble mine photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/5.png. a marble quarry in the Aravali hills",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/6.png": { t: "fig", about: "Map of south-west India with Goa, Karnataka and Kerala marked, and mineral icons: iron ore at Kudremukh and Goa, monazite at Kerala." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Iron ore raw rock sample photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/7.png. a lump of raw iron ore",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/8.png": { t: "fig", about: "Bar chart of the four iron ores in order of iron content: Magnetite about 72 percent (black), Haematite 60 to 70 percent (red), Limonite 40 to 60 percent (yellow) and Siderite up to 40 percent (brown)." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Copper ore raw native copper rock photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/9.png. a lump of copper ore with green marks",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/10.png": { t: "fig", about: "Map of India with four copper areas marked: Singhbhum in Jharkhand, Khetri in Rajasthan, Balaghat in Madhya Pradesh and Guntur in Andhra Pradesh." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manganese ore pyrolusite rock photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/11.png. a dark manganese ore sample",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/12.png": { t: "fig", about: "Map of India with six manganese states marked as dots: Odisha, Maharashtra, Madhya Pradesh, Karnataka, Gujarat and Rajasthan." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bauxite ore red rock lumps mine photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/13.png. red bauxite rock in a worker's hands",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/14.png": { t: "fig", about: "Flow diagram: red bauxite rock, then crushing, then alumina, then aluminium metal, with the label Aluminium comes from bauxite." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gold grains nuggets sample photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/15.png. grains of raw gold",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/16.png": { t: "fig", about: "Map of India with three gold areas marked: Kolar and Hutti in Karnataka, Anantapur in Andhra Pradesh and Swarnarekha river sand in Jharkhand." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Raw silver ore sample photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/17.png. a raw silver sample",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/18.png": { t: "fig", about: "Map of India with silver areas marked: Jawar in Rajasthan, Chitradurga and Bellary in Karnataka, Cuddapah and Kurnool in Andhra Pradesh, and Almora in Uttarakhand." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rough uncut diamond crystals photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/19.png. rough diamond crystals",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/20.png": { t: "fig", about: "Three-part picture of carbon: a black lump labelled Graphite, a clear crystal labelled Diamond, and the words Both are carbon with different structures." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Graphite mineral black shiny lump photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/21.png. a shiny black lump of graphite",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/22.png": { t: "fig", about: "Picture of a pencil with its tip labelled Graphite, and a nuclear reactor box with rods labelled Graphite moderator." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chromite ore rock sample photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/23.png. a lump of dark chromite ore",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Makrana white marble quarry Rajasthan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/24.png. a quarry cut in white marble",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/25.png": { t: "fig", about: "A grid with seven mineral names on the left and three state names to their right for storage and for production, with the first state in each row printed in bold." },
  "images/General_Awareness/Geography/Mineral_Resources_in_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jamshedpur National Metallurgical Laboratory building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Mineral_Resources_in_India/26.png. a laboratory building of a metal research institute",
  "images/General_Awareness/Geography/Mineral_Resources_in_India/27.png": { t: "fig", about: "Map of central and eastern India with six towns marked: Nagpur (two institutions), Dhanbad, Jamshedpur, Udaipur and Khetri, each with its institution name." }
});

/* CHANGE LOG
   - Ferrous and non-ferrous groups are explained; gold is added to the non-ferrous group, and manganese is kept in the ferrous group.
   - The name Rur Pradesh is written correctly as the Ruhr of India for the Chotanagpur plateau.
   - Gypsum is no longer called a building stone; it is listed as a mineral of the Aravali belt.
   - Manganese ore names are written correctly as pyrolusite, psilomelane and braunite.
   - Pyrazyrite is written as pyrargyrite, and the state table that followed the bauxite heading is placed under manganese and bauxite according to its states.
   - Graphite is described as a moderator in nuclear reactors, not as a fuel.
   - Black diamond is described as an industrial stone used for cutting and drilling.
   - Manganite in the storage table is written as magnetite.
   - Hindustan Copper Limited is placed at the Khetri mines, and Central Mining and Fuel Research Institute is written as Central Institute of Mining and Fuel Research.
   - The storage and production rankings are kept as given and may change with new surveys.
*/
