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

/* Field: General_Awareness · Subject: Geography · Chapter: Soils_of_India · 13 concept pages (+ overview) · 27 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌱", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Soils of India",
    thumb: {
      image: "images/General_Awareness/Geography/Soils_of_India/thumbnail.png",
      banner: "GEOGRAPHY FOR COMPETITIVE EXAMS 2026",
      line1: "SOILS OF INDIA",
      line2: "ALLUVIAL • BLACK • RED",
      line3: "LATERITE AND MORE",
      badge: "FULL CLASS",
      ribbon: "TYPES • CROPS • EROSION • MCQ",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Soils of India | Alluvial, Black, Red, Laterite | SSC CGL Geography",
      altTitles: ["Types of Soil in India Trick for SSC CGL", "Soil Erosion and Conservation Methods in One Class"],
      description: "Soils of India is a favourite topic in General Awareness. In this class we learn every soil type step by step in simple words, with the crops that suit each soil, and then we learn how soil is lost and how it can be saved.\n\n📌 IN THIS CLASS\n✅ Alluvial, red-yellow, black and laterite soils\n✅ Hilly, arid, saline and peat soils\n✅ Soil degradation and soil erosion\n✅ Methods of soil conservation\n✅ Practice questions with easy explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Major soils\n00:00 Minor soils\n00:00 Erosion and conservation\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Geography #Soils",
      tags: ["soils of india", "types of soil in india", "alluvial soil", "black soil regur", "red soil", "laterite soil", "arid soil", "saline soil", "peat soil", "soil erosion", "soil conservation", "soil degradation", "ssc cgl geography", "general awareness", "static gk", "indian geography", "soil tricks", "geography mcq", "geography for ssc", "competitive exams", "upsc geography", "banking exams", "railway exams", "defence exams", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "full class", "tricks", "questions", "MCQ", "previous year questions", "Soils of India MCQ"],
      hashtags: ["SSCCGL", "Geography", "Soils"],
      thumbText: "SOILS OF INDIA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🌱 New class is live: Soils of India, all soil types, erosion and conservation. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Major soils\n00:00 Minor soils\n00:00 Erosion and conservation",
      playlist: "General Awareness — Geography Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the soils of India</u>: how soils are grouped, the main soil types, and how soil is lost and saved. Soil questions come in almost every General Awareness paper, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>27</b><span>Questions</span></div>
        <div class="cp-stat"><b>~53 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Nutrients and Classification</b><br>Which nutrients a fertile soil needs, and how soils are grouped by origin and by spread.</li>
        <li><b>The Four Major Soils</b><br>Alluvial, red-yellow, black and laterite soils: where they are found, what they are rich in, and which crops suit them.</li>
        <li><b>The Minor Soils</b><br>Hilly, arid, saline and peat soils, with their local names.</li>
        <li><b>Soil Degradation and Erosion</b><br>What loss of fertility means, why the top layer is lost, and the five stages of erosion.</li>
        <li><b>Soil Conservation</b><br>The engineering, biological and social ways to save the soil.</li>
        <li><b>Practice</b><br>After each topic you will solve questions, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> soil type, colour, crop and local name questions are asked again and again in General Awareness, so learning them in pairs gives sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🌱", accent: "#22c55e", pauseTimer: true,
    title: "Major Elements of Fertile Soil",
    html: `
      <p class="cp-lead">Plants take food from the soil, and this food is called <b>nutrients</b>. A soil is called fertile when it holds enough of these nutrients in the right amount.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/1.png" alt="Three-tier picture of a plant with three labelled groups of nutrients: Primary (nitrogen, " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The three <b>primary nutrients</b> are needed in the largest amounts: nitrogen, phosphorus and potassium. Potassium is also called potash.</p>
      <p class="cp-lead">The <b>secondary nutrients</b> are needed in smaller amounts: calcium, magnesium and sulphur.</p>
      <p class="cp-lead">The <b>micronutrients</b> are needed in very small amounts: iron, manganese, zinc, copper, boron, molybdenum and chlorine.</p>
      <table><thead><tr><th>Group</th><th>Nutrients</th></tr></thead><tbody><tr><td>Primary</td><td>Nitrogen, phosphorus, potassium</td></tr><tr><td>Secondary</td><td>Calcium, magnesium, sulphur</td></tr><tr><td>Micro</td><td>Iron, manganese, zinc, copper, boron, molybdenum, chlorine</td></tr></tbody></table>
      <p class="cp-lead">Carbon, hydrogen and oxygen are also needed, but plants get them from air and water, not from the soil.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/2.png" alt="Healthy green crop plants growing in dark fertile soil photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Remember the names as 1, 2 and many: three primary, three secondary and then the micronutrients.</div>
      <div class="cp-note trap">Do not call a nutrient small just because it is needed in tiny amounts. A micronutrient is just as necessary for the plant.</div>
      <div class="cp-note exam">The primary nutrients are nitrogen, phosphorus and potassium, which is the NPK group on fertiliser bags.</div>
      <div class="cp-mnemonic">NPK: Nitrogen, Phosphorus, Potassium.</div>
    `
  },
  3: {
    questext: "Which three are the primary nutrients of the soil?",
    options: ["Calcium, magnesium and sulphur", "Iron, zinc and copper", "Nitrogen, phosphorus and potassium", "Boron, chlorine and cobalt"],
    correct: "3",
    exptext: "✅ Nitrogen, phosphorus and potassium are the primary nutrients. 📌 NPK is the main trio. ❌ Calcium, magnesium and sulphur is wrong because they are secondary nutrients."
  },
  4: {
    questext: "Which of the following are secondary nutrients?",
    options: ["Calcium, magnesium and sulphur", "Nitrogen, phosphorus and potassium", "Iron, zinc and copper", "Carbon, hydrogen and oxygen"],
    correct: "1",
    exptext: "✅ Calcium, magnesium and sulphur are the secondary nutrients. 📌 Secondary comes after primary, and needs less. ❌ Iron, zinc and copper is wrong because they are micronutrients."
  },
  5: {
    type: "concept", icon: "🗂️", accent: "#f59e0b", pauseTimer: true,
    title: "Classification of Soils",
    html: `
      <p class="cp-lead">Soils are grouped in two ways: by how they were formed, and by where they are spread in India.</p>
      <table><thead><tr><th>On the basis of origin</th><th>Kinds</th><th>Examples</th></tr></thead><tbody><tr><td>Local soil, zonal</td><td>Formed in the place where the rock broke up, in a particular climate</td><td>Red soil, laterite soil</td></tr><tr><td>Local soil, intrazonal</td><td>Formed by local conditions such as rock, slope or water</td><td>Black soil, mountain soil, saline soil, peat soil</td></tr><tr><td>Transported soil</td><td>Carried from another place by rivers or wind</td><td>Alluvial soil, desert soil</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/3.png" alt="Tree diagram with Soil at the top and two branches: On the basis of origin (Local soil wit" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In 1956 the Indian Council of Agricultural Research (ICAR) divided soils by their spread into <b>major</b> and <b>minor</b> soils.</p>
      <table><thead><tr><th>Group</th><th>Soils</th></tr></thead><tbody><tr><td>Major soils</td><td>Alluvial, red-yellow, black or regur, laterite</td></tr><tr><td>Minor soils</td><td>Mountain, dry or desert, saline, peat and organic</td></tr></tbody></table>
      <p class="cp-lead">Alluvial soil covers the largest area of India, followed by red soil and then black soil.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/4.png" alt="Soil layers cross section profile photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Red and laterite soils are zonal because they follow climate. Black soil is intrazonal because it depends on the rock.</div>
      <div class="cp-note exam">Alluvial and desert soils are transported soils. Questions often ask which soil is zonal.</div>
      <div class="cp-mnemonic">Zonal: Red, Laterite. Transported: Alluvial, Desert.</div>
    `
  },
  6: {
    questext: "Which of the following soils are zonal soils?",
    options: ["Alluvial and desert", "Black and peat", "Mountain and saline", "Red and laterite"],
    correct: "4",
    exptext: "✅ Red and laterite soils form in the place where rocks weather, in a set climate. 📌 Zonal soils follow zones of climate. ❌ Alluvial and desert is wrong because they are carried from elsewhere."
  },
  7: {
    questext: "Which of the following are transported soils?",
    options: ["Red and laterite", "Alluvial and desert", "Black and peat", "Saline and mountain"],
    correct: "2",
    exptext: "✅ Rivers carry alluvial soil and wind carries desert soil. 📌 Transported means carried. ❌ Red and laterite is wrong because they form in place."
  },
  8: {
    type: "concept", icon: "🌾", accent: "#ef4444", pauseTimer: true,
    title: "Alluvial Soil",
    html: `
      <p class="cp-lead"><b>Alluvial soil</b> is made of mud, silt and sand brought by rivers from the Himalayas, or left behind by the sea when it went back.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/5.png" alt="Alluvial soil Indo-Gangetic plain farm photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Most of it lies in the northern plains. It is also found in the coastal plains, river basins and deltas of the peninsula. It is the soil with the largest area in India.</p>
      <p class="cp-lead">It has plenty of potash and lime, but it lacks phosphorus, nitrogen and humus. Humus is the rotted plant and animal matter in the soil.</p>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Where</th></tr></thead><tbody><tr><td>Bangar</td><td>Old alluvial soil, higher land</td><td>Sutlej-Yamuna plain, Punjab, Haryana, upper Ganga plain</td></tr><tr><td>Khadar</td><td>New alluvial soil, renewed by floods</td><td>Middle and lower Ganga plain</td></tr></tbody></table>
      <p class="cp-lead">Floods renew the soil every year in the central and lower plains. This new soil is called Khadar.</p>
      <p class="cp-lead">Wheat, rice, sugarcane, barley, pulses, oilseeds and jute are grown in the Ganga and Brahmaputra valleys.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/6.png" alt="Two-part picture of the northern plain: Bangar as higher land with old soil and Khadar as " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Bhabar and Terai are parts of the plain, not types of alluvial soil. The two soil types are Bangar and Khadar.</div>
      <div class="cp-note exam">Alluvial soil is the most widespread, and Khadar is the new, more fertile type.</div>
    `
  },
  9: {
    questext: "Alluvial soil is rich in which two elements?",
    options: ["Nitrogen and humus", "Phosphorus and humus", "Potash and lime", "Iron oxide and aluminium"],
    correct: "3",
    exptext: "✅ Alluvial soil has plenty of potash and lime. 📌 Potash and lime are its gifts, nitrogen and phosphorus are its needs. ❌ Nitrogen and humus is wrong because it lacks them."
  },
  10: {
    questext: "The new alluvial soil renewed by floods is called",
    options: ["Khadar", "Bangar", "Bhabar", "Terai"],
    correct: "1",
    exptext: "✅ Khadar is the new alluvial soil that floods renew each year. 📌 Khadar is fresh, Bangar is old. ❌ Bangar is wrong because it is the older and higher soil."
  },
  11: {
    type: "concept", icon: "🟥", accent: "#8b5cf6", pauseTimer: true,
    title: "Red-Yellow Soil",
    html: `
      <p class="cp-lead"><b>Red-yellow soil</b> is the second largest soil of India. It forms in areas of low rain in the east and south of the Deccan Plateau, where hard rocks such as granite and gneiss are found.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/7.png" alt="Red soil Karnataka Tamil Nadu field photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It spreads over most of the Peninsular Plateau, so it is also called a <b>zonal soil</b>.</p>
      <p class="cp-lead">It is red because of <b>iron oxide</b>, mainly ferric oxide. It turns yellow when it holds water.</p>
      <p class="cp-lead">It is slightly acidic and poor in nitrogen, humus, phosphorus and lime.</p>
      <table><thead><tr><th>Land</th><th>Crops</th></tr></thead><tbody><tr><td>Higher land</td><td>Millet, groundnut, potato</td></tr><tr><td>Lower land</td><td>Rice, ragi, tobacco, vegetables</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/8.png" alt="Simple map of peninsular India shaded in red across the east and south, with labels Granit" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Red soil needs fertiliser and irrigation to give a good crop.</p>
      <div class="cp-note trap">The red colour does not come from humus. It comes from iron oxide.</div>
      <div class="cp-note exam">Red soil is the second major soil, formed on granite and gneiss, and it is a zonal soil.</div>
    `
  },
  12: {
    questext: "The red colour of red soil is due to",
    options: ["humus", "lime", "aluminium", "iron oxide"],
    correct: "4",
    exptext: "✅ Iron oxide, mainly ferric oxide, makes the soil red. 📌 Red equals rust. ❌ Humus is wrong because it makes soil dark."
  },
  13: {
    questext: "Red soil is also called a",
    options: ["Regur soil", "Zonal soil", "Kallar soil", "Khadar soil"],
    correct: "2",
    exptext: "✅ Red soil covers most of the Peninsular Plateau, so it is called a zonal soil. 📌 Red follows the zone. ❌ Regur soil is wrong because that is black soil."
  },
  14: {
    type: "concept", icon: "⬛", accent: "#14b8a6", pauseTimer: true,
    title: "Black or Regur Soil",
    html: `
      <p class="cp-lead"><b>Black soil</b> is made when basalt rock, thrown out by cracks in the earth as lava, breaks into small pieces. It is the third major soil of India.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/9.png" alt="Black cotton soil Maharashtra field cracks photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It is spread most in the Deccan Trap of Maharashtra. It is also found on the Malwa Plateau, in the Kathiawar Peninsula of Gujarat, in Karnataka, Tamil Nadu, Andhra Pradesh and Telangana.</p>
      <p class="cp-lead">It is best for <b>cotton</b>, so it is called black cotton soil or <b>Regur</b>. It is also called Tropical Chernozem.</p>
      <p class="cp-lead">It is also suited to sugarcane, wheat, onion and fruits.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Parent rock</td><td>Basalt</td></tr><tr><td>Water holding</td><td>Very high, so less irrigation is needed</td></tr><tr><td>Colour</td><td>Black, from compounds of iron and humus</td></tr><tr><td>Rich in</td><td>Lime, iron, magnesia and potash</td></tr><tr><td>Poor in</td><td>Nitrogen, phosphorus and humus</td></tr></tbody></table>
      <p class="cp-lead">It swells when wet and cracks when dry. The cracks let air in, so the soil is mixed by itself. That is why it is called <b>self-ploughing</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/10.png" alt="Two-picture sequence of black soil: wet soil swollen and sticky, and dry soil with deep cr" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Black soil is not black because of coal. It is black because of iron compounds and humus.</div>
      <div class="cp-note exam">Black soil means cotton, and it is the soil of the Deccan Trap.</div>
    `
  },
  15: {
    questext: "Which crop is the most famous for black soil?",
    options: ["Tea", "Rubber", "Cotton", "Jute"],
    correct: "3",
    exptext: "✅ Black soil holds water well and suits cotton, so it is called black cotton soil. 📌 Black is cotton. ❌ Tea is wrong because it grows in acidic laterite soil."
  },
  16: {
    questext: "Black soil is called self-ploughing because",
    options: ["it cracks in the dry season and gets mixed by itself", "it is dug by farmers", "it is carried by wind", "it is made of sand"],
    correct: "1",
    exptext: "✅ Deep cracks in the dry season let air in and mix the soil without a plough. 📌 Cracks do the ploughing. ❌ Carried by wind is wrong because it is not a desert soil."
  },
  17: {
    questext: "Which of the following is NOT a feature of black soil?",
    options: ["High water holding capacity", "Rich in lime", "Suitable for cotton", "Rich in nitrogen and humus"],
    correct: "4",
    exptext: "✅ Black soil is poor in nitrogen and humus. 📌 Lime yes, nitrogen no. ❌ High water holding is wrong because that is a true feature."
  },
  18: {
    type: "concept", icon: "🧱", accent: "#ec4899", pauseTimer: true,
    title: "Laterite Soil",
    html: `
      <p class="cp-lead"><b>Laterite soil</b> forms where it is hot and the rain is heavy.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/11.png" alt="Laterite soil red brown rubber plantation Kerala photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Heavy rain washes lime and silica out of the soil. This washing away is called <b>leaching</b>. Compounds of iron oxide and aluminium stay behind.</p>
      <p class="cp-lead">It is red-brown in colour. It is found as a long strip at the foot of the Western Ghats, and on plateaus in Kerala, Karnataka, Maharashtra and Odisha. It also spreads over the Rajmahal and Chotanagpur plateaus, the hilly areas of Assam, and the Meghalaya plateau.</p>
      <table><thead><tr><th>Crop</th><th>Use</th></tr></thead><tbody><tr><td>Tea, coffee</td><td>Plantation crops</td></tr><tr><td>Rubber, cashew</td><td>Best on laterite</td></tr><tr><td>Cinchona, spices</td><td>Also grown</td></tr><tr><td>Coarse grains</td><td>Grown with care</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/12.png" alt="Simple flow: Hot and heavy rain, then leaching of lime and silica, then iron and aluminium" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The word laterite comes from a Latin word for brick, because the soil hardens like brick when it dries. It is used to make bricks for houses.</p>
      <div class="cp-note trap">Laterite is not rich in lime. Heavy rain has already washed the lime away.</div>
      <div class="cp-note exam">Laterite soil goes with leaching, tea, coffee, rubber and cashew.</div>
    `
  },
  19: {
    questext: "Laterite soil forms in areas of",
    options: ["cold and dry climate", "high temperature and heavy rainfall", "desert", "cool mountains"],
    correct: "2",
    exptext: "✅ Heat and heavy rain wash out lime and silica and leave iron and aluminium. 📌 Hot plus wet equals laterite. ❌ Desert is wrong because that gives arid soil."
  },
  20: {
    questext: "Laterite soil is best suited for",
    options: ["wheat", "cotton", "rubber and coffee", "jute"],
    correct: "3",
    exptext: "✅ Rubber, coffee, tea and cashew grow well on laterite soil. 📌 Laterite means plantation crops. ❌ Cotton is wrong because it needs black soil."
  },
  21: {
    type: "concept", icon: "⛰️", accent: "#3b82f6", pauseTimer: true,
    title: "Hilly Soil",
    html: `
      <p class="cp-lead"><b>Hilly soil</b>, also called mountain soil, is found in the Himalayan mountain region, in the north-east and in the hilly areas of Peninsular India.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/13.png" alt="Himalayan hill terraced fields mountain soil Uttarakhand photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The soil is thin and stony on steep slopes because rain and gravity wash the soil away. In the forest areas of the valleys, it is rich in humus.</p>
      <p class="cp-lead">It is poor in potash, phosphorus and lime, so it needs care and manure.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Where</td><td>Himalayas, north-east, peninsular hills</td></tr><tr><td>Soil depth</td><td>Thin on slopes, deeper in valleys</td></tr><tr><td>Humus</td><td>More in forest areas</td></tr><tr><td>Use</td><td>Tea, fruits and spices on slopes</td></tr></tbody></table>
      <p class="cp-lead">In the Himalayan region, fruits such as apples and crops such as tea are grown on this soil.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/14.png" alt="Cross-section of a mountain: steep top with thin stony soil, middle slope with terraces an" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Hilly soil is different from laterite soil. Hilly soil depends on height and slope, and laterite soil depends on heat and heavy rain.</div>
      <div class="cp-note exam">Mountain soil is a minor soil of the ICAR classification.</div>
    `
  },
  22: {
    questext: "Hilly soil is found in",
    options: ["the Himalayan region", "the Thar Desert", "the Ganga delta", "the Rann of Kutch"],
    correct: "1",
    exptext: "✅ Hilly soil is found in the Himalayas, the north-east and peninsular hills. 📌 Hills mean hilly soil. ❌ Thar Desert is wrong because it has arid soil."
  },
  23: {
    type: "concept", icon: "🏜️", accent: "#f97316", pauseTimer: true,
    title: "Arid or Desert Soil",
    html: `
      <p class="cp-lead"><b>Arid or desert soil</b> is found in the dry regions of western Rajasthan, southern Punjab, western Haryana and northern Gujarat.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/15.png" alt="Thar Desert soil sandy land Rajasthan photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It lacks nitrogen and humus. It is also alkaline or salty, so it is not fertile for crops.</p>
      <p class="cp-lead">Only crops that need little water grow here, such as jowar, bajra, ragi and oilseeds.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Where</td><td>Western Rajasthan, southern Punjab, western Haryana, northern Gujarat</td></tr><tr><td>Problem</td><td>Lack of nitrogen and humus, and salty</td></tr><tr><td>Crops</td><td>Jowar, bajra, ragi, oilseeds</td></tr></tbody></table>
      <p class="cp-lead">With canal water, such as the Indira Gandhi Canal, this soil can give good crops.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/16.png" alt="Map of north-west India with the Thar region shaded yellow and labelled Arid soil, with ic" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Desert soil is not useless. With water and manure it can grow crops.</div>
      <div class="cp-note exam">Desert soil is a transported soil, carried by wind.</div>
    `
  },
  24: {
    questext: "Arid soil is found in which of the following areas?",
    options: ["Assam", "Kerala", "West Bengal", "Western Rajasthan"],
    correct: "4",
    exptext: "✅ Arid soil spreads over western Rajasthan and nearby dry areas. 📌 Arid means dry, like Rajasthan. ❌ Kerala is wrong because it has laterite soil."
  },
  25: {
    questext: "Which crops are generally grown in arid soil?",
    options: ["Rice and jute", "Jowar, bajra and ragi", "Tea and coffee", "Rubber and cashew"],
    correct: "2",
    exptext: "✅ Dry-land crops like jowar, bajra, ragi and oilseeds grow here. 📌 Dry soil means millets. ❌ Rice and jute is wrong because they need a lot of water."
  },
  26: {
    type: "concept", icon: "🧂", accent: "#84cc16", pauseTimer: true,
    title: "Saline Soil",
    html: `
      <p class="cp-lead"><b>Saline soil</b> forms in dry and semi-dry climates and in places where water stands for a long time. Salts rise to the top of the soil and make it white.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/17.png" alt="Saline soil white salt crust farm Punjab Haryana photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It is infertile, so it is counted as barren soil from the farming point of view.</p>
      <p class="cp-lead">In Punjab and Haryana, too much irrigation is spreading saline soil. Good alluvial soil is turning into barren soil. This soil is called <b>Reh, Usar or Kallar</b>.</p>
      <p class="cp-lead">In Green Revolution areas of India, saline and alkaline soils have increased fast near canals.</p>
      <table><thead><tr><th>Place</th><th>Local name</th></tr></thead><tbody><tr><td>Northern plains</td><td>Reh, Usar, Kallar</td></tr><tr><td>Cause</td><td>Too much irrigation and poor drainage</td></tr><tr><td>Result</td><td>Barren, white crust of salt</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/18.png" alt="Three-step picture: canal water soaks the field, water stands and then dries in the sun, a" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Saline soil is not caused by shortage of water alone. Too much irrigation with poor drainage also causes it.</div>
      <div class="cp-note exam">Reh, Usar and Kallar are the three local names of saline soil.</div>
      <div class="cp-mnemonic">Reh, Usar, Kallar: salt on the ground.</div>
    `
  },
  27: {
    questext: "Saline soil is locally called",
    options: ["Karewa", "Bhabar", "Reh, Usar or Kallar", "Regur"],
    correct: "3",
    exptext: "✅ Saline soil is known as Reh, Usar or Kallar in the northern plains. 📌 R-U-K is salt. ❌ Regur is wrong because that is black soil."
  },
  28: {
    questext: "The spread of saline soil in Punjab and Haryana is mainly due to",
    options: ["excessive irrigation", "heavy rain", "volcanic eruption", "glaciers"],
    correct: "1",
    exptext: "✅ Too much canal irrigation without drainage brings salts to the surface. 📌 Too much water, too much salt. ❌ Heavy rain is wrong because it usually washes salts away."
  },
  29: {
    type: "concept", icon: "🌿", accent: "#06b6d4", pauseTimer: true,
    title: "Peat and Marshy Soil",
    html: `
      <p class="cp-lead"><b>Peat soil</b> forms in areas of waterlogging, where plant matter rots slowly and piles up. It is found in some deltas and coastal marshes.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/19.png" alt="Peat soil dark organic soil photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Because the plant matter does not rot fully, the soil holds a very large amount of organic matter.</p>
      <p class="cp-lead">The soil is acidic, and in coastal areas it can be salty as well.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Formed by</td><td>Waterlogging, slow rotting of plants</td></tr><tr><td>Organic matter</td><td>Very high</td></tr><tr><td>Nature</td><td>Acidic, salty in coastal areas</td></tr><tr><td>Example</td><td>Kari soil of Kerala</td></tr></tbody></table>
      <p class="cp-lead">In Kerala, the peat soil is called <b>Kari soil</b>. It is also found in the Sundarbans and on the Odisha coast.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/20.png" alt="Cross-section of a marsh: water standing over a dark thick layer labelled Peat with rottin" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Peat soil is rich in organic matter, but it is not good for most crops because it is acidic and waterlogged.</div>
      <div class="cp-note exam">Peat is a minor soil, and Kari is its Kerala name.</div>
    `
  },
  30: {
    questext: "Which soil contains a very high amount of organic matter?",
    options: ["Red soil", "Laterite soil", "Desert soil", "Peat soil"],
    correct: "4",
    exptext: "✅ Peat soil is made of plant matter that rots slowly in waterlogged land. 📌 Peat means plant pile. ❌ Laterite soil is wrong because heavy rain washes out its organic matter."
  },
  31: {
    questext: "The peat soil of Kerala is known as",
    options: ["Regur", "Kari", "Reh", "Karewa"],
    correct: "2",
    exptext: "✅ Kari soil is the peat soil of Kerala. 📌 Kari goes with Kerala. ❌ Regur is wrong because it is black cotton soil."
  },
  32: {
    type: "concept", icon: "📉", accent: "#a855f7", pauseTimer: true,
    title: "Soil Degradation and Soil Erosion",
    html: `
      <p class="cp-lead"><b>Soil degradation</b> means loss of the soil's fertility. The soil loses nutrients, and its depth or thickness becomes less because of misuse and erosion.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/21.png" alt="Cracked dry degraded land farm drought photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Soil erosion</b> means the destruction of the top layer of the soil. The top layer is the most fertile part, so its loss hurts crops the most.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Soil degradation</td><td>Loss of fertility of the soil</td></tr><tr><td>Soil erosion</td><td>Removal of the upper layer of the soil</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/22.png" alt="Soil erosion gully farmland photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Degradation is the big problem, and erosion is one of its main causes.</p>
      <div class="cp-note trap">Soil degradation is wider than soil erosion. Erosion removes soil, but degradation can also happen by salt, acid or chemicals.</div>
      <div class="cp-note exam">Loss of fertility is degradation, and loss of the top layer is erosion.</div>
    `
  },
  33: {
    questext: "The loss of fertility of soil is called",
    options: ["soil erosion", "soil formation", "soil degradation", "soil mixing"],
    correct: "3",
    exptext: "✅ Loss of the soil's fertility is soil degradation. 📌 Degrade means go down. ❌ Soil erosion is wrong because it means the loss of the upper layer."
  },
  34: {
    questext: "The destruction of the upper layer of soil is called",
    options: ["soil erosion", "degradation", "leaching", "salinisation"],
    correct: "1",
    exptext: "✅ Soil erosion is the removal of the upper layer of soil. 📌 Erosion eats the top. ❌ Leaching is wrong because it means washing out of nutrients by water."
  },
  35: {
    type: "concept", icon: "🌧️", accent: "#e11d48", pauseTimer: true,
    title: "Causes and Types of Soil Erosion",
    html: `
      <p class="cp-lead">The main causes of soil erosion are <b>deforestation</b>, overgrazing, water erosion, wind erosion, glacier erosion, shifting cultivation and landslides.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/23.png" alt="Deforestation hill slope soil erosion photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Roots of trees hold the soil. When trees are cut, rain washes the soil away easily.</p>
      <p class="cp-lead">Water erosion happens in five stages, from small to big.</p>
      <table><thead><tr><th>Stage</th><th>What happens</th></tr></thead><tbody><tr><td>Splash erosion</td><td>Raindrops hit and loosen soil</td></tr><tr><td>Sheet erosion</td><td>Water removes a thin layer all over</td></tr><tr><td>Rill erosion</td><td>Small channels form</td></tr><tr><td>Gully erosion</td><td>Deep channels cut the land</td></tr><tr><td>Stream channel erosion</td><td>Water cuts stream banks and beds</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/24.png" alt="Five small pictures in a row showing the five stages of water erosion from left to right: " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Gully erosion makes land with deep ditches, called ravines, as in the Chambal valley.</p>
      <div class="cp-note trap">Wind erosion is mainly a problem in dry areas, and water erosion is the larger problem in rainy and hilly areas.</div>
      <div class="cp-note exam">Remember the order Splash, Sheet, Rill, Gully, Stream channel.</div>
      <div class="cp-mnemonic">Silly Sheep Run Great Speed: Splash, Sheet, Rill, Gully, Stream channel.</div>
    `
  },
  36: {
    questext: "Which of the following is a type of soil erosion?",
    options: ["Terrace", "Mulch", "Contour", "Rill erosion"],
    correct: "4",
    exptext: "✅ Rill erosion is a stage of water erosion in which small channels form. 📌 Rill is the little channel. ❌ Terrace is wrong because it is a way to save soil."
  },
  37: {
    questext: "Which type of erosion forms deep channels and ravines?",
    options: ["Sheet erosion", "Gully erosion", "Splash erosion", "Rill erosion"],
    correct: "2",
    exptext: "✅ Gully erosion cuts deep channels in the land and forms ravines. 📌 Gully means deep ditch. ❌ Sheet erosion is wrong because it removes a thin layer only."
  },
  38: {
    type: "concept", icon: "🛡️", accent: "#10b981", pauseTimer: true,
    title: "Methods of Soil Conservation",
    html: `
      <p class="cp-lead"><b>Soil conservation</b> means saving the soil from erosion and keeping it fertile. First the problem is identified, then a method is chosen that suits the social, economic and technical needs of the place.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/25.png" alt="Tree diagram with Methods for Soil Conservation at the top and three branches: Engineering" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Method</th><th>Examples</th></tr></thead><tbody><tr><td>Engineering method</td><td>Embankment, contour farming, rock dam</td></tr><tr><td>Biological method</td><td>Crop cycle, strip farming, mulching, vermicompost, green and organic manure, agroforestry, plantation</td></tr><tr><td>Social method</td><td>Ban on overgrazing, ban on cutting trees, ban on shifting cultivation, public participation</td></tr></tbody></table>
      <p class="cp-lead"><b>Mulching</b> means covering the soil with straw or leaves to hold the moisture and stop the soil from washing away.</p>
      <p class="cp-lead"><b>Strip farming</b> means growing crops in narrow bands across the slope.</p>
      <p class="cp-lead"><b>Agroforestry</b> means growing trees and crops together.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Soils_of_India/26.png" alt="Contour farming terraced fields hill slope photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Public participation, such as a ban on shifting cultivation, comes under the social method, not under the biological method.</div>
      <div class="cp-note exam">Mulching, strip farming and agroforestry are biological methods, and embankments and rock dams are engineering methods.</div>
    `
  },
  39: {
    questext: "Consider the following statements about soil conservation:\n1. Agroforestry is a biological method.\n2. A ban on shifting cultivation is a social method.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are true. Trees with crops are biological, and bans need people to agree, so they are social. 📌 Plants are biological, rules are social. ❌ Only 1 is wrong because statement 2 is also true."
  },
  40: {
    questext: "Mulching belongs to which method of soil conservation?",
    options: ["Biological method", "Engineering method", "Social method", "Legal method"],
    correct: "1",
    exptext: "✅ Mulching uses plant matter to cover soil, so it is a biological method. 📌 Mulch comes from plants. ❌ Engineering method is wrong because it uses built structures."
  },
  41: {
    questext: "Embankments and rock dams are examples of the",
    options: ["biological method", "social method", "chemical method", "engineering method"],
    correct: "4",
    exptext: "✅ Embankments and rock dams are built structures, so they are engineering methods. 📌 Built by engineers. ❌ Social method is wrong because it relies on rules and people."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Soils_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "handfuls of black, red and brown soil, a green seedling and a small outline map of India" },
  "images/General_Awareness/Geography/Soils_of_India/1.png": { t: "fig", about: "Three-tier picture of a plant with three labelled groups of nutrients: Primary (nitrogen, phosphorus, potassium), Secondary (calcium, magnesium, sulphur) and Micro (iron, manganese, zinc, copper, boron, molybdenum, chlorine)." },
  "images/General_Awareness/Geography/Soils_of_India/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Healthy green crop plants growing in dark fertile soil photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/2.png. young plants growing in rich soil",
  "images/General_Awareness/Geography/Soils_of_India/3.png": { t: "fig", about: "Tree diagram with Soil at the top and two branches: On the basis of origin (Local soil with zonal and intrazonal groups, and Transported soil) and On the basis of spread, with major and minor soils listed." },
  "images/General_Awareness/Geography/Soils_of_India/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Soil layers cross section profile photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/4.png. the layers of a soil seen in a cut",
  "images/General_Awareness/Geography/Soils_of_India/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Alluvial soil Indo-Gangetic plain farm photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/5.png. dark fertile soil of a northern plain farm",
  "images/General_Awareness/Geography/Soils_of_India/6.png": { t: "fig", about: "Two-part picture of the northern plain: Bangar as higher land with old soil and Khadar as low land next to a river with new soil, with crop icons for wheat, rice, sugarcane and jute." },
  "images/General_Awareness/Geography/Soils_of_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Red soil Karnataka Tamil Nadu field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/7.png. red coloured soil in a field",
  "images/General_Awareness/Geography/Soils_of_India/8.png": { t: "fig", about: "Simple map of peninsular India shaded in red across the east and south, with labels Granite and gneiss rocks, Low rain, Red-yellow soil, and four crop icons for millet, groundnut, rice and tobacco." },
  "images/General_Awareness/Geography/Soils_of_India/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Black cotton soil Maharashtra field cracks photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/9.png. dark soil with cracks in a dry field",
  "images/General_Awareness/Geography/Soils_of_India/10.png": { t: "fig", about: "Two-picture sequence of black soil: wet soil swollen and sticky, and dry soil with deep cracks, with the caption Self-ploughing soil." },
  "images/General_Awareness/Geography/Soils_of_India/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Laterite soil red brown rubber plantation Kerala photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/11.png. red-brown laterite soil in a plantation",
  "images/General_Awareness/Geography/Soils_of_India/12.png": { t: "fig", about: "Simple flow: Hot and heavy rain, then leaching of lime and silica, then iron and aluminium left behind, then red-brown laterite soil." },
  "images/General_Awareness/Geography/Soils_of_India/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Himalayan hill terraced fields mountain soil Uttarakhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/13.png. terraced fields on a Himalayan slope",
  "images/General_Awareness/Geography/Soils_of_India/14.png": { t: "fig", about: "Cross-section of a mountain: steep top with thin stony soil, middle slope with terraces and orchards, and valley floor with deep soil." },
  "images/General_Awareness/Geography/Soils_of_India/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Thar Desert soil sandy land Rajasthan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/15.png. sandy dry land in the Thar region",
  "images/General_Awareness/Geography/Soils_of_India/16.png": { t: "fig", about: "Map of north-west India with the Thar region shaded yellow and labelled Arid soil, with icons for jowar and bajra and a canal line." },
  "images/General_Awareness/Geography/Soils_of_India/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Saline soil white salt crust farm Punjab Haryana photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/17.png. a white salt crust on a farm field",
  "images/General_Awareness/Geography/Soils_of_India/18.png": { t: "fig", about: "Three-step picture: canal water soaks the field, water stands and then dries in the sun, and white salt crust is left on the surface." },
  "images/General_Awareness/Geography/Soils_of_India/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Peat soil dark organic soil photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/19.png. dark peat soil with plant matter",
  "images/General_Awareness/Geography/Soils_of_India/20.png": { t: "fig", about: "Cross-section of a marsh: water standing over a dark thick layer labelled Peat with rotting plant material, with a small paddy field on the right." },
  "images/General_Awareness/Geography/Soils_of_India/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cracked dry degraded land farm drought photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/21.png. cracked barren land",
  "images/General_Awareness/Geography/Soils_of_India/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Soil erosion gully farmland photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/22.png. a deep gully cut by running water",
  "images/General_Awareness/Geography/Soils_of_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Deforestation hill slope soil erosion photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/23.png. a bare slope after trees were cut",
  "images/General_Awareness/Geography/Soils_of_India/24.png": { t: "fig", about: "Five small pictures in a row showing the five stages of water erosion from left to right: Splash, Sheet, Rill, Gully, Stream channel, each with a label." },
  "images/General_Awareness/Geography/Soils_of_India/25.png": { t: "fig", about: "Tree diagram with Methods for Soil Conservation at the top and three branches: Engineering method, Biological method and Social method, each with its examples listed." },
  "images/General_Awareness/Geography/Soils_of_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Contour farming terraced fields hill slope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Soils_of_India/26.png. curved farm rows following the hill slope"
});

/* CHANGE LOG
   - Nutrients are regrouped correctly: nitrogen, phosphorus and potassium are primary; calcium, magnesium and sulphur are secondary; carbon, hydrogen and oxygen come from air and water and are not listed as soil nutrients.
   - Interspheric soil is written as intrazonal soil, the standard term.
   - Alluvial soil is described as having two types, Bangar and Khadar; Bhabar and Terai are parts of the plain and are not listed as soil classes.
   - Black soil is described as dark because of iron compounds and humus, and Karel is not used as a local name.
   - Hilly, saline and peat soils are given additional standard facts: hilly soil is thin and stony on slopes, saline soil forms a white salt crust, and peat soil is acidic and called Kari in Kerala.
   - Peat soil is described as acidic and salty only in coastal areas, not as a high-saline soil everywhere.
   - Reh, Usar and Kallar are given as the three local names of saline soil.
*/
