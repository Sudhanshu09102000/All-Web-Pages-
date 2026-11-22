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

/* Field: General_Awareness · Subject: Geography · Chapter: State_and_Union_Territory_of_India · 35 concept pages (+ overview) · 98 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🗺️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — States and Union Territories of India",
    thumb: {
      image: "images/General_Awareness/Geography/State_and_Union_Territory_of_India/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "STATES OF INDIA",
      line2: "CAPITALS • PARKS",
      line3: "RIVERS • FACTS",
      badge: "FULL CHAPTER",
      ribbon: "GEOGRAPHY • FAST REVISION • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "States and Union Territories of India | Full Chapter | Geography for SSC CGL",
      altTitles: ["Indian States Capitals Rivers Parks in One Class", "States and Union Territories of India Geography Fast Revision"],
      description: "Learn all the states and union territories of India in one simple class. For every state and union territory we cover the capital, main languages, rivers, national parks, ports and famous places, with practice questions for SSC CGL and other exams.\n\n📌 IN THIS CLASS\n✅ Capitals, rivers and wildlife areas\n✅ Formation dates and special facts\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #IndianGeography #States",
      tags: ["states of india", "indian geography", "states and union territories", "geography for ssc cgl", "india states capitals", "state capitals of india", "national parks of india", "rivers of india", "arunachal pradesh", "assam geography", "bihar geography", "chhattisgarh", "goa liberation 1961", "gujarat formation", "haryana panipat", "himachal pradesh capital", "general awareness", "static gk", "ssc cgl geography", "competitive exams", "union territories", "uttar pradesh geography", "tamil nadu facts", "west bengal facts", "andaman and nicobar", "St"],
      hashtags: ["SSCCGL", "IndianGeography", "States"],
      thumbText: "STATES AND UNION TERRITORIES",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🗺️ New class is live: all States and Union Territories of India. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "General Awareness — Indian Geography"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on all the states and union territories of India</u>, in alphabetical order. For every place we learn the capital, the main languages, the rivers, the wildlife areas and the famous places that exams ask again and again.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>35</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>98</b><span>Questions</span></div>
        <div class="cp-stat"><b>~168 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Arunachal Pradesh</b><br>Capital, old name, High Court, rivers and national parks.</li>
        <li><b>Assam</b><br>Tea, rhinoceros and tiger parks, oil refineries and silk.</li>
        <li><b>Bihar</b><br>Oil refinery and the ancient centres of Buddhism and Jainism.</li>
        <li><b>Chhattisgarh</b><br>Formation, coal, tin and waterfalls.</li>
        <li><b>Goa</b><br>Freedom from Portuguese rule, statehood, rivers and port.</li>
        <li><b>Gujarat</b><br>Formation day, cotton, ports and wildlife sanctuaries.</li>
        <li><b>Haryana</b><br>The shared capital and the handloom city of Panipat.</li>
        <li><b>Himachal Pradesh</b><br>Two capitals, full statehood and hot water springs.</li>
        <li><b>Jammu and Kashmir</b><br>Two capitals, the tulip garden and the Land of Temples.</li>
        <li><b>Jharkhand</b><br>Formation, copper, steel, uranium and coal.</li>
        <li><b>Karnataka</b><br>Coffee, the first hydroelectric plant and heritage sites.</li>
        <li><b>Kerala</b><br>The digital state, the boat race and Onam.</li>
        <li><b>Madhya Pradesh</b><br>National parks, waterfalls and world famous temples.</li>
        <li><b>Maharashtra</b><br>Port, High Court and the famous caves.</li>
        <li><b>Manipur</b><br>The rice bowl, the Dzukou Lily and the dancing deer.</li>
        <li><b>Meghalaya</b><br>Abode of clouds, tribes, parks and festival.</li>
        <li><b>Mizoram</b><br>Festivals, airport and tourist places.</li>
        <li><b>Nagaland</b><br>The highest hill and Jhum farming.</li>
        <li><b>Odisha</b><br>Temples, port, lakes and the Hirakud Dam.</li>
        <li><b>Punjab</b><br>Capital and the main crops.</li>
        <li><b>Rajasthan</b><br>Largest state, fairs and national parks.</li>
        <li><b>Sikkim</b><br>Kanchenjunga, cardamom and organic farming.</li>
        <li><b>Tamil Nadu</b><br>Crops, ports, Pongal, Jallikattu and hill stations.</li>
        <li><b>Tripura</b><br>Capital, languages and tourist places.</li>
        <li><b>Andhra Pradesh</b><br>Ratna Garbha, port and temples.</li>
        <li><b>Telangana</b><br>The 29th state and its flower festival.</li>
        <li><b>Uttar Pradesh</b><br>Buddhist sites, Kumbh Mela and famous places.</li>
        <li><b>Uttarakhand</b><br>The 27th state, Devbhoomi and pilgrimage sites.</li>
        <li><b>West Bengal</b><br>Plassey, crops and tourist centres.</li>
        <li><b>Andaman and Nicobar Islands</b><br>The latitude line, tribes and tourism.</li>
        <li><b>Chandigarh</b><br>The planned city and its architect.</li>
        <li><b>Dadra and Nagar Haveli and Daman and Diu</b><br>Portuguese rule and the merger.</li>
        <li><b>Lakshadweep</b><br>Coral islands and coconut.</li>
        <li><b>Delhi</b><br>Capital shift, union territory status and monuments.</li>
        <li><b>Puducherry</b><br>French rule, merger and the Ashram.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on states, capitals, rivers, parks and festivals come in almost every Staff Selection Commission paper, so these facts give quick and sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🌄", accent: "#22c55e", pauseTimer: true,
    title: "Arunachal Pradesh",
    html: `
      <p class="cp-lead">Arunachal Pradesh is a state in the far north-east of India. Its capital is <b>Itanagar</b>, and <u>its old name was North East Frontier Agency</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/1.png" alt="Arunachal Pradesh highlighted on India map with neighbouring states" data-caption="Arunachal Pradesh marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/2.png" alt="Arunachal Pradesh political map capital districts" data-caption="A political map of Arunachal Pradesh, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/3.png" alt="Namdapha National Park Arunachal Pradesh forest photo" data-caption="Thick forest inside Namdapha National Park, a major protected area of Arunachal Pradesh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Exams ask the same few facts about every state: the capital, the High Court, the rivers and the wildlife areas. For Arunachal Pradesh, they are collected in the table below.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Itanagar</td></tr><tr><td>Earlier name</td><td>North East Frontier Agency (NEFA)</td></tr><tr><td>High Court</td><td>Gauhati High Court</td></tr><tr><td>Main languages</td><td>English, Monpa and Aka, among others</td></tr><tr><td>Protected areas</td><td>Namdapha National Park, Mouling National Park, Sesa Orchid Sanctuary, Dihang-Dibang Biosphere Reserve</td></tr><tr><td>Major rivers</td><td>Kameng, Subansiri, Siang (Brahmaputra), Lohit and Tirap</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/4.png" alt="Five rounded boxes in a row with the heading Major rivers: Kameng, Subansiri, Siang (Brahm" data-caption="The five major rivers of Arunachal Pradesh gathered in one simple chart." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/5.png" alt="Arunachal Pradesh rivers map Siang Lohit Kameng Subansiri" data-caption="The major rivers of Arunachal Pradesh marked on a map of the state." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Brahmaputra is called the <b>Siang</b> when it flows through Arunachal Pradesh. It is not a different river.</div>
      <div class="cp-note exam">Arunachal Pradesh comes under the Gauhati High Court, which is located in Assam. This is a favourite exam question.</div>
      <div class="cp-mnemonic">Rivers in order: K-S-S-L-T, that is Kameng, Subansiri, Siang, Lohit, Tirap.</div>
    `
  },
  3: {
    questext: "What was the earlier name of Arunachal Pradesh?",
    options: ["North East Frontier Agency", "North Eastern Hill Territory", "Naga Hills Tuensang Area", "Assam Frontier Tract"],
    correct: "1",
    exptext: "✅ The earlier name was North East Frontier Agency. 📌 Remember the short form NEFA with the word frontier, because the area lay on the border. ❌ North Eastern Hill Territory is wrong because it is a different name for a group of hill areas."
  },
  4: {
    questext: "The Siang river of Arunachal Pradesh is the local name of which major river?",
    options: ["Ganga", "Teesta", "Brahmaputra", "Godavari"],
    correct: "3",
    exptext: "✅ The Brahmaputra is called the Siang in Arunachal Pradesh. 📌 The same river gets different names in different places, so link Siang with Brahmaputra. ❌ Teesta is wrong because it flows through Sikkim and West Bengal."
  },
  5: {
    questext: "Which one of the following is NOT located in Arunachal Pradesh?",
    options: ["Namdapha National Park", "Kaziranga National Park", "Mouling National Park", "Dihang-Dibang Biosphere Reserve"],
    correct: "2",
    exptext: "✅ Kaziranga National Park is in Assam. 📌 Kaziranga means rhinoceros, and the rhinoceros belongs to Assam. ❌ Namdapha is wrong because it is a famous national park of Arunachal Pradesh."
  },
  6: {
    type: "concept", icon: "🦏", accent: "#f59e0b", pauseTimer: true,
    title: "Assam",
    html: `
      <p class="cp-lead">Assam is called the <b>sentinel of North-East India</b> and the <b>gateway to the North-Eastern states</b>. Its capital is <b>Dispur</b>, and tea is the most famous industry of the state.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/6.png" alt="Assam highlighted on India map with neighbouring states" data-caption="Assam marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/7.png" alt="Assam political map capital districts" data-caption="A political map of Assam, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/8.png" alt="Kaziranga National Park one-horned rhinoceros photo" data-caption="A one-horned rhinoceros in the grassland of Kaziranga National Park." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Assam is rich in wildlife, oil and silk. The table gives the facts in a clear order so that you can learn them quickly.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Dispur</td></tr><tr><td>Main languages</td><td>Assamese, Bodo and Karbi</td></tr><tr><td>Major festival</td><td>Bihu</td></tr><tr><td>One-horned rhinoceros</td><td>Kaziranga National Park</td></tr><tr><td>Royal Bengal Tiger</td><td>Manas National Park</td></tr><tr><td>Oil refineries</td><td>Four in the state, one of them at Digboi</td></tr><tr><td>Silk</td><td>Eri, Muga and Tussar</td></tr><tr><td>Famous temple</td><td>Kamakhya Temple</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/9.png" alt="Kamakhya Temple Guwahati Nilachal Hill photo" data-caption="The Kamakhya Temple on Nilachal Hill in Guwahati, a famous place of pilgrimage." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/10.png" alt="Two boxes side by side: left box Kaziranga with the word Rhinoceros, right box Manas with " data-caption="Two famous national parks of Assam and the animal each one is best known for." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/11.png" alt="Assam national parks map Kaziranga Manas" data-caption="The national parks of Assam, including Kaziranga and Manas, marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Kaziranga is best known for the one-horned rhinoceros, while Manas is best known for the Royal Bengal Tiger. Exam options often swap them.</div>
      <div class="cp-note exam">Assam is a leading producer of tea and has four oil refineries, one of which is at Digboi.</div>
      <div class="cp-mnemonic">Kaziranga = Rhino, Manas = Tiger.</div>
    `
  },
  7: {
    questext: "Which national park of Assam is world famous for the one-horned rhinoceros?",
    options: ["Manas", "Namdapha", "Keibul Lamjao", "Kaziranga"],
    correct: "4",
    exptext: "✅ Kaziranga National Park is world famous for the one-horned rhinoceros. 📌 Link Kaziranga with rhinoceros. ❌ Manas is wrong because it is best known for the Royal Bengal Tiger."
  },
  8: {
    questext: "In which town of Assam is one of its oil refineries located?",
    options: ["Silchar", "Tezpur", "Digboi", "Jorhat"],
    correct: "3",
    exptext: "✅ Digboi has an oil refinery, and Assam has four refineries in all. 📌 Digboi is the oil town of Assam. ❌ Tezpur is wrong because it is known for tea gardens and not for a refinery."
  },
  9: {
    questext: "Consider the following statements about Assam:\n1. Bihu is a major festival of Assam.\n2. Assam has only one oil refinery.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Four refineries work in Assam, so the word only makes statement 2 wrong. ❌ Choosing both statements is wrong because Assam has four oil refineries."
  },
  10: {
    type: "concept", icon: "🛕", accent: "#ef4444", pauseTimer: true,
    title: "Bihar",
    html: `
      <p class="cp-lead">Bihar has <b>Patna</b> as its capital. Its main source of income is agriculture, and it is a land of very old centres of Buddhism and Jainism.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/12.png" alt="Bihar highlighted on India map with neighbouring states" data-caption="Bihar marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/13.png" alt="Bihar political map capital districts" data-caption="A political map of Bihar, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/14.png" alt="Nalanda ancient university ruins Bihar photo" data-caption="The ruins of the ancient Nalanda university, an old centre of learning in Bihar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The ruins of Nalanda are included in the World Heritage List of the United Nations Educational, Scientific and Cultural Organization. Many other tourist places in Bihar are linked with the lives of the Buddha and Mahavira.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Patna</td></tr><tr><td>Main languages</td><td>Hindi and Urdu</td></tr><tr><td>Regional languages</td><td>Bhojpuri, Magahi and Maithili</td></tr><tr><td>Main source of economy</td><td>Agriculture</td></tr><tr><td>Oil refinery</td><td>Barauni, run by Indian Oil Corporation</td></tr><tr><td>Buddhism and Jainism</td><td>Rajgir, Nalanda, Vaishali, Pawapuri, Bodh Gaya</td></tr><tr><td>Other places</td><td>Vikramshila, Sher Shah's tomb at Sasaram, Lauria Nandangarh</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/15.png" alt="Mahabodhi Temple Bodh Gaya photo" data-caption="The Mahabodhi Temple at Bodh Gaya, where the Buddha is said to have gained enlightenment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/16.png" alt="Sher Shah Suri tomb Sasaram lake photo" data-caption="The tomb of Sher Shah Suri at Sasaram, built in the middle of a lake." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/17.png" alt="Bihar Buddhist circuit map Rajgir Nalanda Bodh Gaya Vaishali" data-caption="The places of Buddhism and Jainism in Bihar marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Sher Shah's tomb is at <b>Sasaram</b> in Bihar, not in Delhi or Agra. The oil refinery is at <b>Barauni</b>, not at Patna.</div>
      <div class="cp-note exam">Nalanda is the ancient centre of learning of Bihar, and its ruins are a World Heritage Site.</div>
      <div class="cp-mnemonic">Bihar places for Buddha and Mahavira: Rajgir, Vaishali, Pawapuri, Bodh Gaya.</div>
    `
  },
  11: {
    questext: "Where is the oil refinery of Indian Oil Corporation located in Bihar?",
    options: ["Sasaram", "Gaya", "Vaishali", "Barauni"],
    correct: "4",
    exptext: "✅ The refinery is at Barauni. 📌 Link Barauni with the word barrel of oil. ❌ Gaya is wrong because it is known for pilgrimage and not for a refinery."
  },
  12: {
    questext: "The tomb of Sher Shah is located at which place in Bihar?",
    options: ["Sasaram", "Rajgir", "Vaishali", "Pawapuri"],
    correct: "1",
    exptext: "✅ The tomb of Sher Shah is at Sasaram. 📌 Sher Shah, Sasaram: both words begin with the sound S. ❌ Rajgir is wrong because it is linked with Buddhism and Jainism."
  },
  13: {
    questext: "Which one of the following is NOT a tourist place of Bihar?",
    options: ["Rajgir", "Pawapuri", "Hampi", "Vaishali"],
    correct: "3",
    exptext: "✅ Hampi is in Karnataka. 📌 Hampi belongs to the Vijayanagara kingdom of the south. ❌ Pawapuri is wrong because it is a famous place of Jainism in Bihar."
  },
  14: {
    type: "concept", icon: "💎", accent: "#8b5cf6", pauseTimer: true,
    title: "Chhattisgarh",
    html: `
      <p class="cp-lead">Chhattisgarh came into existence on <b>1 November 2000</b> as the <u>26th state of India</u>. It was separated from Madhya Pradesh, and its capital is <b>Raipur</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/18.png" alt="Chhattisgarh highlighted on India map with neighbouring states" data-caption="Chhattisgarh marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/19.png" alt="Chhattisgarh political map capital districts" data-caption="A political map of Chhattisgarh, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/20.png" alt="A simple timeline box: 1 November 2000, Madhya Pradesh splits, Chhattisgarh becomes the 26" data-caption="Chhattisgarh was carved out of Madhya Pradesh and became the twenty-sixth state of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In ancient times this region was known as Dakshin Kosala. The land is rich in minerals, and paddy is the major crop.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Raipur</td></tr><tr><td>Main languages</td><td>Hindi and Chhattisgarhi</td></tr><tr><td>Ancient name</td><td>Dakshin Kosala</td></tr><tr><td>Major crop</td><td>Paddy</td></tr><tr><td>Coal districts</td><td>Surguja, Raigarh, Korea and Bilaspur</td></tr><tr><td>Other minerals</td><td>Iron ore, limestone, bauxite, dolomite and tin</td></tr><tr><td>Special mineral</td><td>Only state in the country to produce raw tin</td></tr><tr><td>Coal</td><td>One of the leading coal producing states, third largest reserves after Jharkhand and Odisha</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/21.png" alt="Chitrakote Falls Indravati River Chhattisgarh photo" data-caption="Chitrakote Falls on the Indravati River, a wide waterfall of Chhattisgarh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/22.png" alt="Korba coal mine Chhattisgarh photo" data-caption="A large open coal mine in Korba, one of the main coal areas of Chhattisgarh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/23.png" alt="Chhattisgarh mineral resources map coal tin iron ore" data-caption="The mineral areas of Chhattisgarh, such as coal and tin, marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Chhattisgarh has the <b>third largest</b> coal reserves, after Jharkhand and Odisha. Do not call it the first in coal reserves.</div>
      <div class="cp-note exam">Chhattisgarh is the only state that produces raw tin. Waterfalls: Chitrakote on the Indravati River, Tirathgarh on the Kanger River, and Kendai in Korba district.</div>
      <div class="cp-mnemonic">Tin is the Tiny secret of Chhattisgarh.</div>
    `
  },
  15: {
    questext: "Chhattisgarh became which state of India on 1 November 2000?",
    options: ["25th", "27th", "28th", "26th"],
    correct: "4",
    exptext: "✅ It became the 26th state. 📌 Chhattisgarh 26 comes first, then Uttarakhand 27 and Jharkhand 28 in the same year. ❌ 27th is wrong because that number belongs to Uttarakhand."
  },
  16: {
    questext: "Chitrakote Falls is situated on which river?",
    options: ["Kanger", "Indravati", "Mahanadi", "Hasdeo"],
    correct: "2",
    exptext: "✅ Chitrakote Falls is on the Indravati River. 📌 Link the letter I of Indravati with the I in Chitrakote. ❌ Kanger is wrong because Tirathgarh Falls is on the Kanger River."
  },
  17: {
    questext: "Which state is the only one in India that produces raw tin?",
    options: ["Jharkhand", "Odisha", "Chhattisgarh", "Karnataka"],
    correct: "3",
    exptext: "✅ Chhattisgarh is the only tin producing state. 📌 Remember tin with Chhattisgarh as the only one. ❌ Jharkhand is wrong because it is known for coal, copper and uranium."
  },
  18: {
    type: "concept", icon: "🏖️", accent: "#14b8a6", pauseTimer: true,
    title: "Goa",
    html: `
      <p class="cp-lead">Goa has <b>Panaji</b> as its capital, and its main languages are Konkani and Marathi. <u>Goa was freed from Portuguese rule on 19 December 1961.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/24.png" alt="Goa highlighted on India map with neighbouring states" data-caption="Goa marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/25.png" alt="Goa political map capital districts" data-caption="A political map of Goa, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/26.png" alt="A vertical timeline with three boxes: 19 December 1961 freed and joined with Daman and Diu" data-caption="Goa moved from Portuguese rule to a union territory and then to a full state." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">After freedom, Goa was joined with Daman and Diu to form one union territory. It became a full state on 30 May 1987, and then Daman and Diu became a separate union territory.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Panaji</td></tr><tr><td>Main languages</td><td>Konkani and Marathi</td></tr><tr><td>Freed from Portuguese rule</td><td>19 December 1961</td></tr><tr><td>Full statehood</td><td>30 May 1987</td></tr><tr><td>High Court</td><td>Bombay High Court</td></tr><tr><td>Major port</td><td>Mormugao</td></tr><tr><td>River that separates Goa from Maharashtra</td><td>Terekhol</td></tr><tr><td>Other major rivers</td><td>Mandovi, Zuari, Chapora and Sal</td></tr><tr><td>Famous places</td><td>Dudhsagar Falls, Arvalem Falls, Mollem National Park, Salim Ali Bird Sanctuary, Bhagwan Mahavir Wildlife Sanctuary</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/27.png" alt="Dudhsagar Falls Goa waterfall photo" data-caption="Dudhsagar Falls in Goa, a tall waterfall that looks like a stream of milk." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/28.png" alt="Mormugao Port Goa harbour photo" data-caption="Ships and cranes at Mormugao Port, the major port of Goa." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/29.png" alt="Goa rivers map Mandovi Zuari Terekhol Chapora Sal" data-caption="The rivers of Goa, including the Terekhol on the northern border, marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Goa was freed in 1961 but became a full state only in <b>1987</b>. Do not mix the two dates.</div>
      <div class="cp-note exam">The river <b>Terekhol</b> separates Goa from Maharashtra, and Goa comes under the Bombay High Court.</div>
      <div class="cp-mnemonic">61 for freedom, 87 for statehood: Goa got free first and grew up later.</div>
    `
  },
  19: {
    questext: "From which colonial power was Goa freed on 19 December 1961?",
    options: ["France", "Portugal", "Britain", "the Netherlands"],
    correct: "2",
    exptext: "✅ Goa was freed from Portuguese rule. 📌 Portuguese rule in Goa lasted until 1961, long after British rule ended. ❌ France is wrong because the French held Puducherry and not Goa."
  },
  20: {
    questext: "Which river separates Goa from Maharashtra?",
    options: ["Mandovi", "Zuari", "Terekhol", "Chapora"],
    correct: "3",
    exptext: "✅ The Terekhol river forms the northern border of Goa with Maharashtra. 📌 Terekhol means the top border river. ❌ Mandovi is wrong because it flows inside Goa."
  },
  21: {
    questext: "Consider the following statements about Goa:\n1. Goa got full statehood on 30 May 1987.\n2. Goa comes under the jurisdiction of the Calcutta High Court.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Goa is linked with Bombay, as Mumbai was once called. ❌ Statement 2 is wrong because Goa comes under the Bombay High Court."
  },
  22: {
    questext: "Which one of the following is the major port of Goa?",
    options: ["Kandla", "Paradip", "Kochi", "Mormugao"],
    correct: "4",
    exptext: "✅ Mormugao is the major port of Goa. 📌 Kandla belongs to Gujarat, Paradip to Odisha and Kochi to Kerala. ❌ Kochi is wrong because it is the major port of Kerala."
  },
  23: {
    type: "concept", icon: "🦁", accent: "#ec4899", pauseTimer: true,
    title: "Gujarat",
    html: `
      <p class="cp-lead">Gujarat came into existence on <b>1 May 1960</b>. Its capital is <b>Gandhinagar</b>, and its language is Gujarati.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/30.png" alt="Gujarat highlighted on India map with neighbouring states" data-caption="Gujarat marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/31.png" alt="Gujarat political map capital districts" data-caption="A political map of Gujarat, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/32.png" alt="Asiatic lion Gir forest Gujarat photo" data-caption="An Asiatic lion in the Gir forest of Gujarat, the home of the sanctuary built for lions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Gujarat is a state of farms, ports and wildlife. It is the largest cotton producing state of India, and it has a long coast with busy ports.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Gandhinagar</td></tr><tr><td>Main language</td><td>Gujarati</td></tr><tr><td>Formation day</td><td>1 May 1960</td></tr><tr><td>Farm crop</td><td>Largest cotton producing state of India</td></tr><tr><td>Major port</td><td>Kandla (now called Deendayal Port)</td></tr><tr><td>Special step</td><td>First state to create a separate department for climate change</td></tr><tr><td>Lion sanctuary</td><td>Gir forests</td></tr><tr><td>Wild ass sanctuary</td><td>Little Rann of Kutch</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/33.png" alt="Indian wild ass Little Rann of Kutch photo" data-caption="Indian wild asses on the dry salt land of the Little Rann of Kutch." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/34.png" alt="Deendayal Port Kandla photo" data-caption="Ships at Kandla, now called Deendayal Port, a major port of Gujarat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/35.png" alt="Gujarat national parks wildlife sanctuaries map Gir Kutch" data-caption="The wildlife areas of Gujarat, such as Gir and Kutch, marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The lion sanctuary is in the <b>Gir forests</b>, and the wild ass sanctuary is in <b>Kutch</b>. Exam options often swap these two.</div>
      <div class="cp-note exam">Gujarat was the first state to create a separate department to deal with climate change and global warming.</div>
      <div class="cp-mnemonic">Gir for Lions, Kutch for Donkeys: G-L, K-D.</div>
    `
  },
  24: {
    questext: "Gujarat came into existence on which date?",
    options: ["1 November 1956", "15 August 1960", "26 January 1960", "1 May 1960"],
    correct: "4",
    exptext: "✅ Gujarat was formed on 1 May 1960. 📌 May Day is also the formation day of Gujarat. ❌ 1 November 1956 is wrong because that was the big reorganisation of states."
  },
  25: {
    questext: "Which state was the first in the country to create a separate department to deal with climate change?",
    options: ["Kerala", "Gujarat", "Odisha", "Tamil Nadu"],
    correct: "2",
    exptext: "✅ Gujarat was the first state to do so. 📌 Link Gujarat with the first steps in climate action. ❌ Kerala is wrong because it is known for being the first digital state."
  },
  26: {
    questext: "Which is the largest cotton producing state of India?",
    options: ["Gujarat", "Punjab", "Haryana", "Odisha"],
    correct: "1",
    exptext: "✅ Gujarat is the largest cotton producing state. 📌 Cotton and Gujarat go together, like lions and Gir. ❌ Punjab is wrong because wheat and rice are its main crops."
  },
  27: {
    questext: "The sanctuary for wild donkeys is found in which region of Gujarat?",
    options: ["Gir forests", "Saurashtra coast", "Kutch", "Gulf of Khambhat"],
    correct: "3",
    exptext: "✅ The wild ass sanctuary is in Kutch. 📌 Gir is for lions and Kutch is for wild asses. ❌ Gir forests is wrong because it is the home of the lions."
  },
  28: {
    type: "concept", icon: "🧶", accent: "#3b82f6", pauseTimer: true,
    title: "Haryana",
    html: `
      <p class="cp-lead">Haryana has <b>Chandigarh</b> as its capital, and its main language is Hindi. <u>Most of its people depend on agriculture.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/36.png" alt="Haryana highlighted on India map with neighbouring states" data-caption="Haryana marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/37.png" alt="Haryana political map capital districts" data-caption="A political map of Haryana, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/38.png" alt="Three boxes joined by lines: Chandigarh in the centre, Punjab on one side and Haryana on t" data-caption="Chandigarh is the shared capital of two states, Punjab and Haryana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Chandigarh is also a union territory, so one city serves as the capital of two states. Haryana is also famous for the handloom industry of Panipat.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Chandigarh</td></tr><tr><td>Main language</td><td>Hindi</td></tr><tr><td>Economy</td><td>Agriculture</td></tr><tr><td>Famous city</td><td>Panipat</td></tr><tr><td>Famous goods</td><td>Handloom items and carpets</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/39.png" alt="Panipat handloom carpets weaving photo" data-caption="A weaver making a carpet on a handloom in Panipat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/40.png" alt="Haryana Punjab Chandigarh location map Panipat" data-caption="Chandigarh and Panipat shown on a map of Haryana and Punjab." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Chandigarh is the capital of both <b>Haryana</b> and <b>Punjab</b>. Do not think it belongs to only one state.</div>
      <div class="cp-note exam">Panipat handloom items and carpets are famous all over the world.</div>
      <div class="cp-mnemonic">Panipat = Pattern on the loom.</div>
    `
  },
  29: {
    questext: "Which city is the shared capital of Punjab and Haryana?",
    options: ["Chandigarh", "Shimla", "Dehradun", "Gurugram"],
    correct: "1",
    exptext: "✅ Chandigarh is the capital of both states. 📌 One city, two capitals. ❌ Gurugram is wrong because it is a big city of Haryana but not its capital."
  },
  30: {
    questext: "The city of Panipat in Haryana is famous for which of the following?",
    options: ["Silk sarees", "Zari work", "Pottery", "Handloom items and carpets"],
    correct: "4",
    exptext: "✅ Panipat is famous all over the world for handloom items and carpets. 📌 Panipat and pattern both start with P. ❌ Silk sarees is wrong because they are linked with places like Varanasi."
  },
  31: {
    type: "concept", icon: "♨️", accent: "#f97316", pauseTimer: true,
    title: "Himachal Pradesh",
    html: `
      <p class="cp-lead">Himachal Pradesh is known as <b>Devbhoomi</b>, which means the land of the gods. It has two capitals: <b>Shimla</b> in summer and <b>Dharamshala</b> in winter.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/41.png" alt="Himachal Pradesh highlighted on India map with neighbouring states" data-caption="Himachal Pradesh marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/42.png" alt="Himachal Pradesh political map capital districts" data-caption="A political map of Himachal Pradesh, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/43.png" alt="Two boxes side by side: Summer capital Shimla and Winter capital Dharamshala, joined by a " data-caption="Himachal Pradesh has one capital for summer and another capital for winter." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The state got the status of a full state in 1971. Most people work in agriculture, and the mountains have many natural hot water springs.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capitals</td><td>Shimla (summer) and Dharamshala (winter)</td></tr><tr><td>Main languages</td><td>Hindi, Dogri and Pahadi</td></tr><tr><td>Nickname</td><td>Devbhoomi</td></tr><tr><td>Full statehood</td><td>1971</td></tr><tr><td>Main occupation</td><td>Agriculture</td></tr><tr><td>Hot water sources</td><td>Vashisht Kund, Manikaran, Tattapani and Kheer Ganga</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/44.png" alt="Manikaran hot spring Himachal Pradesh photo" data-caption="Steam rising from the hot water spring at Manikaran in Himachal Pradesh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/45.png" alt="Shimla Ridge Christ Church photo" data-caption="The hill town of Shimla, the summer capital of Himachal Pradesh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The winter capital is <b>Dharamshala</b>, not Shimla. Another state, Uttarakhand, is also called Devbhoomi.</div>
      <div class="cp-note exam">Remember the hot water sources of the state: Vashisht Kund, Manikaran, Tattapani and Kheer Ganga.</div>
      <div class="cp-mnemonic">Summer in Shimla, winter in Dharamshala: S-S, W-D.</div>
    `
  },
  32: {
    questext: "Which is the winter capital of Himachal Pradesh?",
    options: ["Dharamshala", "Shimla", "Mandi", "Solan"],
    correct: "1",
    exptext: "✅ Dharamshala is the winter capital. 📌 Shimla is cool in summer, so it is the summer capital. ❌ Shimla is wrong because it is the summer capital."
  },
  33: {
    questext: "Himachal Pradesh got the status of a full state in which year?",
    options: ["1966", "1971", "1956", "1987"],
    correct: "2",
    exptext: "✅ Himachal Pradesh became a full state in 1971. 📌 Himachal 1971, Goa 1987: do not mix them. ❌ 1987 is wrong because that is the year Goa became a full state."
  },
  34: {
    questext: "Manikaran in Himachal Pradesh is famous for which of the following?",
    options: ["Tulip gardens", "Coal mines", "Salt lakes", "Hot water springs"],
    correct: "4",
    exptext: "✅ Manikaran is famous for hot water springs. 📌 Manikaran, Tattapani and Kheer Ganga are the hot places. ❌ Tulip gardens is wrong because the famous tulip garden is in Srinagar."
  },
  35: {
    type: "concept", icon: "🌷", accent: "#84cc16", pauseTimer: true,
    title: "Jammu and Kashmir",
    html: `
      <p class="cp-lead">Jammu and Kashmir has two capitals: <b>Srinagar</b> in summer and <b>Jammu</b> in winter. The Kashmir Valley is known as <u>Heaven on Earth</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/46.png" alt="Jammu and Kashmir highlighted on India map with neighbouring states" data-caption="Jammu and Kashmir marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/47.png" alt="Jammu and Kashmir political map capital districts" data-caption="A political map of Jammu and Kashmir, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/48.png" alt="Indira Gandhi Memorial Tulip Garden Srinagar photo" data-caption="Rows of tulips in the Srinagar tulip garden, the largest tulip garden in Asia." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The economy is mainly agricultural. The Jammu region is called the Land of Temples, and Ladakh, which is now a separate union territory, is a thrilling place for tourists.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capitals</td><td>Srinagar (summer) and Jammu (winter)</td></tr><tr><td>Main languages</td><td>Urdu, Dogri, Kashmiri, Ladakhi, Balti, Pahadi, Gojri and Dadri</td></tr><tr><td>Economy</td><td>Mainly agriculture</td></tr><tr><td>Tulip garden</td><td>Sirajbagh, Srinagar, the largest in Asia</td></tr><tr><td>Kashmir Valley</td><td>Heaven on Earth</td></tr><tr><td>Jammu region</td><td>Land of Temples</td></tr><tr><td>Famous temple</td><td>Vaishno Devi, in the Jammu region</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/49.png" alt="Vaishno Devi Katra Jammu pilgrimage photo" data-caption="Pilgrims climbing the mountain path to the Vaishno Devi shrine near Katra." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/50.png" alt="Jammu Kashmir Ladakh map Srinagar Jammu Leh" data-caption="The Jammu region, the Kashmir Valley and Ladakh shown on one map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The summer capital is <b>Srinagar</b> and the winter capital is <b>Jammu</b>. Do not swap them.</div>
      <div class="cp-note exam">The Vaishno Devi temple is in the Jammu region, and lakhs of tourists visit it every year.</div>
    `
  },
  36: {
    questext: "Which is the winter capital of Jammu and Kashmir?",
    options: ["Srinagar", "Jammu", "Leh", "Kargil"],
    correct: "2",
    exptext: "✅ Jammu is the winter capital. 📌 Winter moves the government to the warmer south. ❌ Srinagar is wrong because it is the summer capital."
  },
  37: {
    questext: "The Kashmir Valley is popularly known as which of the following?",
    options: ["Land of Temples", "Abode of Clouds", "Heaven on Earth", "Land of Rising Sun"],
    correct: "3",
    exptext: "✅ The Kashmir Valley is called Heaven on Earth. 📌 The Jammu region is the one called Land of Temples. ❌ Land of Temples is wrong because it names the Jammu region."
  },
  38: {
    questext: "The largest tulip garden of Asia is located at which place?",
    options: ["Nishat Bagh, Srinagar", "Sirajbagh, Srinagar", "Shalimar Bagh, Srinagar", "Pahalgam"],
    correct: "2",
    exptext: "✅ Asia's largest tulip garden is at Sirajbagh in Srinagar. 📌 Tulips bloom in spring, so visit in April. ❌ Shalimar Bagh is wrong because it is a Mughal garden and not the tulip garden."
  },
  39: {
    type: "concept", icon: "🏭", accent: "#06b6d4", pauseTimer: true,
    title: "Jharkhand",
    html: `
      <p class="cp-lead">Jharkhand was carved out of the southern part of Bihar on <b>15 November 2000</b> and became the <u>28th state</u> of India. Its capital is <b>Ranchi</b>, and its main language is Hindi.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/51.png" alt="Jharkhand highlighted on India map with neighbouring states" data-caption="Jharkhand marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/52.png" alt="Jharkhand political map capital districts" data-caption="A political map of Jharkhand, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/53.png" alt="A timeline box: 15 November 2000, southern Bihar becomes Jharkhand, the 28th state." data-caption="Jharkhand was formed from the southern part of Bihar as the twenty-eighth state." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Agriculture is the base of the economy, but Jharkhand is best known for its minerals and its factories.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Ranchi</td></tr><tr><td>Formation</td><td>15 November 2000, the 28th state</td></tr><tr><td>Economy</td><td>Agriculture is the main basis</td></tr><tr><td>First copper smelting plant</td><td>Ghatsila</td></tr><tr><td>Public sector steel plant</td><td>Bokaro Steel Plant</td></tr><tr><td>Uranium</td><td>Uranium Corporation of India Limited at Jaduguda</td></tr><tr><td>Coal</td><td>Jharia is famous for rich coal</td></tr><tr><td>Tourist places</td><td>Tilaiya Dam (Koderma), Betla National Park (Palamu), Hazaribagh National Park, Parasnath Hill, Vaidyanath Temple (Deoghar)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/54.png" alt="Jharia coalfield Jharkhand photo" data-caption="The Jharia coalfield, one of the richest coal areas of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/55.png" alt="Betla National Park Palamu photo" data-caption="A forest scene in Betla National Park in Palamu district." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/56.png" alt="Jharkhand mineral and industries map Jharia Bokaro Ghatsila" data-caption="The mineral and industrial places of Jharkhand marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix the states formed in 2000: Chhattisgarh is the 26th, Uttarakhand the 27th and Jharkhand the 28th.</div>
      <div class="cp-note exam">Remember the industry places: Ghatsila for copper, Bokaro for steel, Jaduguda for uranium, Jharia for coal.</div>
      <div class="cp-mnemonic">Ghatsila Copper, Bokaro Steel, Jaduguda Uranium, Jharia Coal: G-C, B-S, J-U, J-C.</div>
    `
  },
  40: {
    questext: "Where was India's first copper smelting plant established in Jharkhand?",
    options: ["Bokaro", "Jaduguda", "Jharia", "Ghatsila"],
    correct: "4",
    exptext: "✅ The first copper smelting plant was at Ghatsila. 📌 Ghatsila and copper both have a hard sound. ❌ Jaduguda is wrong because it is known for uranium."
  },
  41: {
    questext: "Jharkhand became which state of the Indian Union on 15 November 2000?",
    options: ["26th", "27th", "28th", "29th"],
    correct: "3",
    exptext: "✅ Jharkhand is the 28th state. 📌 The three states of 2000 come in order of date: 26, 27, 28. ❌ 27th is wrong because that is Uttarakhand."
  },
  42: {
    questext: "Jharia in Jharkhand is famous for which resource?",
    options: ["Coal", "Uranium", "Copper", "Mica"],
    correct: "1",
    exptext: "✅ Jharia is famous for its rich coal. 📌 Jharia has the J of coal fields. ❌ Uranium is wrong because it is mined at Jaduguda."
  },
  43: {
    type: "concept", icon: "☕", accent: "#a855f7", pauseTimer: true,
    title: "Karnataka",
    html: `
      <p class="cp-lead">Karnataka has <b>Bengaluru</b> as its capital, and its language is Kannada. It ranks <u>first in coffee production</u> in the country.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/57.png" alt="Karnataka highlighted on India map with neighbouring states" data-caption="Karnataka marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/58.png" alt="Karnataka political map capital districts" data-caption="A political map of Karnataka, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/59.png" alt="Coffee plantation Coorg Karnataka photo" data-caption="A coffee plantation in Karnataka, the top coffee producing state." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Asia's first hydroelectric power plant was built at Shivasamudram in 1902. The state also has many old temples and monuments.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Bengaluru</td></tr><tr><td>Language</td><td>Kannada</td></tr><tr><td>National parks</td><td>Anshi, Bandipur, Bannerghatta, Kudremukh and Nagarhole (Rajiv Gandhi)</td></tr><tr><td>Coffee</td><td>First in the country</td></tr><tr><td>Hydroelectric plant</td><td>Shivasamudram, 1902, the first in Asia</td></tr><tr><td>Tourism</td><td>Srirangapatna, Nagarhole National Park, Hoysala architecture, Shravanabelagola (Gomateshwara statue), Halebidu, Hampi, Badami, Pattadakal</td></tr><tr><td>World Heritage Sites</td><td>Hampi and Pattadakal</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/60.png" alt="Hampi Vijayanagara ruins Karnataka photo" data-caption="The stone chariot at Hampi, a World Heritage Site of Karnataka." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/61.png" alt="Gomateshwara statue Shravanabelagola photo" data-caption="The giant Gomateshwara statue at Shravanabelagola." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/62.png" alt="Karnataka national parks map Bandipur Nagarhole Kudremukh" data-caption="The five national parks of Karnataka marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Karnataka has <b>five</b> national parks, and Nagarhole is also named after Rajiv Gandhi.</div>
      <div class="cp-note exam">Hampi and Pattadakal are World Heritage Sites of Karnataka.</div>
    `
  },
  44: {
    questext: "Which state ranks first in coffee production in India?",
    options: ["Kerala", "Karnataka", "Tamil Nadu", "Assam"],
    correct: "2",
    exptext: "✅ Karnataka is first in coffee. 📌 Coffee comes from the hills of Coorg in Karnataka. ❌ Kerala is wrong because it is better known for spices and rubber."
  },
  45: {
    questext: "Asia's first hydroelectric power plant was established in 1902 at which place?",
    options: ["Tilaiya", "Bhakra", "Hirakud", "Shivasamudram"],
    correct: "4",
    exptext: "✅ Shivasamudram in Karnataka had the first hydroelectric plant of Asia. 📌 Shivasamudram on the Cauvery, 1902. ❌ Hirakud is wrong because it is a dam in Odisha built much later."
  },
  46: {
    questext: "Which one of the following is a World Heritage Site of Karnataka?",
    options: ["Pattadakal", "Khajuraho", "Konark", "Ajanta"],
    correct: "1",
    exptext: "✅ Pattadakal is a World Heritage Site of Karnataka. 📌 Hampi and Pattadakal are the two for Karnataka. ❌ Khajuraho is wrong because it is in Madhya Pradesh."
  },
  47: {
    type: "concept", icon: "🛶", accent: "#e11d48", pauseTimer: true,
    title: "Kerala",
    html: `
      <p class="cp-lead">Kerala has <b>Thiruvananthapuram</b> as its capital, and its language is Malayalam. It was the first state declared as a <u>digital state</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/63.png" alt="Kerala highlighted on India map with neighbouring states" data-caption="Kerala marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/64.png" alt="Kerala political map capital districts" data-caption="A political map of Kerala, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/65.png" alt="Nehru Trophy Boat Race Punnamada Lake Alappuzha photo" data-caption="Long snake boats racing in the Nehru Trophy Boat Race at Punnamada Lake." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Kerala is a land of festivals and boat races. The union territory Lakshadweep also comes under the Kerala High Court at Ernakulam.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Thiruvananthapuram</td></tr><tr><td>Language</td><td>Malayalam</td></tr><tr><td>High Court</td><td>Kerala High Court at Ernakulam, which also serves Lakshadweep</td></tr><tr><td>Digital state</td><td>First state declared digital</td></tr><tr><td>Major port</td><td>Kochi</td></tr><tr><td>Main festival</td><td>Onam, celebrated in the harvest season</td></tr><tr><td>Boat race</td><td>Nehru Trophy, at Punnamada Lake in Alappuzha</td></tr><tr><td>Temple festival</td><td>Sabarimala, Makaravilakku</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/66.png" alt="Onam Pookalam flower carpet Kerala photo" data-caption="A flower carpet made for Onam, the main festival of Kerala." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/67.png" alt="Kochi port Cochin harbour photo" data-caption="The harbour at Kochi, the major port of Kerala." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/68.png" alt="Kerala rivers and backwaters map Alappuzha Kochi Ernakulam" data-caption="The backwaters, Alappuzha and Kochi marked on a map of Kerala." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Nehru Trophy boat race is held at <b>Punnamada Lake</b> in Alappuzha district.</div>
      <div class="cp-note exam">Lakshadweep comes under the Kerala High Court.</div>
    `
  },
  48: {
    questext: "The Nehru Trophy boat race is held at which lake?",
    options: ["Vembanad Lake", "Ashtamudi Lake", "Punnamada Lake", "Periyar Lake"],
    correct: "3",
    exptext: "✅ It is held at Punnamada Lake in Alappuzha. 📌 Nehru and Punnamada both fit the name of the race. ❌ Ashtamudi is wrong because it is a lake near Kollam."
  },
  49: {
    questext: "Which union territory comes under the jurisdiction of the Kerala High Court?",
    options: ["Puducherry", "Lakshadweep", "Andaman and Nicobar Islands", "Daman and Diu"],
    correct: "2",
    exptext: "✅ Lakshadweep comes under the Kerala High Court. 📌 Both are in the south-west near the Arabian Sea. ❌ Puducherry is wrong because it comes under the Madras High Court."
  },
  50: {
    questext: "Which is the major port of Kerala?",
    options: ["Mormugao", "Tuticorin", "Paradip", "Kochi"],
    correct: "4",
    exptext: "✅ Kochi is the major port of Kerala. 📌 Kochi is the Queen of the Arabian Sea. ❌ Tuticorin is wrong because it is a port of Tamil Nadu."
  },
  51: {
    questext: "Consider the following statements about Kerala:\n1. Kerala was declared the first digital state of the country.\n2. Kochi is a major port of Kerala.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Digital first, and Kochi for the port. ❌ Only 1 is wrong because Kochi is indeed a major port."
  },
  52: {
    type: "concept", icon: "🐅", accent: "#10b981", pauseTimer: true,
    title: "Madhya Pradesh",
    html: `
      <p class="cp-lead">Madhya Pradesh has <b>Bhopal</b> as its capital, and its main language is Hindi. Agriculture is the main source of its economy.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/69.png" alt="Madhya Pradesh highlighted on India map with neighbouring states" data-caption="Madhya Pradesh marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/70.png" alt="Madhya Pradesh political map capital districts" data-caption="A political map of Madhya Pradesh, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/71.png" alt="Khajuraho temples Madhya Pradesh photo" data-caption="The carved stone temples of Khajuraho, famous all over the world." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The state has many national parks, waterfalls and old temples, which draw tourists from all over the world.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Bhopal</td></tr><tr><td>Language</td><td>Hindi</td></tr><tr><td>Economy</td><td>Agriculture</td></tr><tr><td>Hill and waterfall places</td><td>Panchmarhi, Bhedaghat, Dhuandhar Falls</td></tr><tr><td>Kanha National Park</td><td>Barasingha (swamp deer) lives here</td></tr><tr><td>Bandhavgarh National Park</td><td>Ancient caves</td></tr><tr><td>World famous</td><td>Khajuraho Temple, Ujjain, Amarkantak, Omkareshwar</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/72.png" alt="Kanha National Park barasingha swamp deer photo" data-caption="A barasingha, the swamp deer found in Kanha National Park." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/73.png" alt="Madhya Pradesh national parks map Kanha Bandhavgarh" data-caption="The national parks of Madhya Pradesh, such as Kanha and Bandhavgarh, marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Kanha National Park is the home of the <b>barasingha</b>, a swamp deer.</div>
      <div class="cp-note exam">Khajuraho temples, Ujjain, Amarkantak and Omkareshwar are the world famous places of Madhya Pradesh.</div>
    `
  },
  53: {
    questext: "Which of the following is the capital of Madhya Pradesh?",
    options: ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
    correct: "2",
    exptext: "✅ Bhopal is the capital. 📌 Bhopal is the city of lakes. ❌ Indore is wrong because it is the biggest city but not the capital."
  },
  54: {
    questext: "The famous Khajuraho temples are located in which state?",
    options: ["Madhya Pradesh", "Odisha", "Rajasthan", "Karnataka"],
    correct: "1",
    exptext: "✅ Khajuraho is in Madhya Pradesh. 📌 Khajuraho and Madhya Pradesh both are in the heart of India. ❌ Odisha is wrong because its famous temples are Konark and Puri."
  },
  55: {
    questext: "Dhuandhar Falls is located near which place of Madhya Pradesh?",
    options: ["Panchmarhi", "Amarkantak", "Bhedaghat", "Ujjain"],
    correct: "3",
    exptext: "✅ Dhuandhar Falls is at Bhedaghat. 📌 Dhuandhar means smoke, as the water throws up mist. ❌ Panchmarhi is wrong because it is a hill station."
  },
  56: {
    type: "concept", icon: "🏛️", accent: "#eab308", pauseTimer: true,
    title: "Maharashtra",
    html: `
      <p class="cp-lead">Maharashtra has <b>Mumbai</b> as its capital, and its language is Marathi. Mumbai is also its major port.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/74.png" alt="Maharashtra highlighted on India map with neighbouring states" data-caption="Maharashtra marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/75.png" alt="Maharashtra political map capital districts" data-caption="A political map of Maharashtra, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/76.png" alt="Ajanta Caves Maharashtra photo" data-caption="The Ajanta Caves, cut into a rock cliff in Maharashtra." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Bombay High Court serves Maharashtra, Goa, and the union territory of Daman and Diu. The state is rich in cave temples and holy places.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Mumbai</td></tr><tr><td>Language</td><td>Marathi</td></tr><tr><td>High Court</td><td>Bombay High Court for Maharashtra, Goa and Daman and Diu</td></tr><tr><td>Major port</td><td>Mumbai</td></tr><tr><td>Caves</td><td>Ajanta, Ellora, Aurangabad, Elephanta, Kanheri and Karle</td></tr><tr><td>Religious places</td><td>Nashik, Shirdi, Trimbakeshwar</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/77.png" alt="Ellora Kailasa Temple Maharashtra photo" data-caption="The Kailasa Temple at Ellora, carved from a single rock." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/78.png" alt="Maharashtra caves map Ajanta Ellora Elephanta Kanheri Karle" data-caption="The cave sites of Maharashtra marked on a map of the state." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Elephanta Caves are on an island near Mumbai, and Ajanta and Ellora are near Aurangabad.</div>
      <div class="cp-note exam">Maharashtra has caves at Ajanta, Ellora, Aurangabad, Elephanta, Kanheri and Karle.</div>
    `
  },
  57: {
    questext: "Which of the following is a major port of Maharashtra?",
    options: ["Kandla", "Paradip", "Mormugao", "Mumbai"],
    correct: "4",
    exptext: "✅ Mumbai is the major port of Maharashtra. 📌 Mumbai is the capital and the port. ❌ Mormugao is wrong because it is a port of Goa."
  },
  58: {
    questext: "Which of the following cave groups is NOT located in Maharashtra?",
    options: ["Ajanta", "Ellora", "Udayagiri", "Kanheri"],
    correct: "3",
    exptext: "✅ Udayagiri caves are in Odisha. 📌 Ajanta, Ellora and Kanheri all belong to Maharashtra. ❌ Kanheri is wrong because it is a cave group near Mumbai."
  },
  59: {
    questext: "The Bombay High Court has jurisdiction over Maharashtra and which of the following?",
    options: ["Goa", "Kerala", "Gujarat", "Karnataka"],
    correct: "1",
    exptext: "✅ Goa comes under the Bombay High Court along with Daman and Diu. 📌 Goa and Maharashtra are neighbours on the west coast. ❌ Gujarat is wrong because it has its own High Court."
  },
  60: {
    type: "concept", icon: "🦌", accent: "#0ea5e9", pauseTimer: true,
    title: "Manipur",
    html: `
      <p class="cp-lead">Manipur has <b>Imphal</b> as its capital, and its language is Manipuri. Its valley is called the <u>rice bowl</u> of the state.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/79.png" alt="Manipur highlighted on India map with neighbouring states" data-caption="Manipur marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/80.png" alt="Manipur political map capital districts" data-caption="A political map of Manipur, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/81.png" alt="Sangai brow-antlered deer Keibul Lamjao National Park photo" data-caption="The Sangai, or dancing deer, on the floating grass of Keibul Lamjao National Park." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Manipur is famous for rare animals and flowers, which exams often ask about.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Imphal</td></tr><tr><td>Language</td><td>Manipuri</td></tr><tr><td>Valley</td><td>Called the rice bowl</td></tr><tr><td>Rare flower</td><td>Dzukou Lily, found in Dzukou Valley</td></tr><tr><td>Rare deer</td><td>Sangai, the brow-antlered deer, also called the dancing deer</td></tr><tr><td>Where Sangai lives</td><td>Bishnupur district</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/82.png" alt="Dzukou Valley lily flowers photo" data-caption="The green Dzukou Valley, where the rare Dzukou Lily grows." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/83.png" alt="Manipur map Imphal Loktak Lake Keibul Lamjao" data-caption="Imphal, Loktak Lake and the home of the Sangai deer marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The <b>Sangai</b> is the dancing deer. It is found only in Manipur.</div>
      <div class="cp-note exam">Sangai is the local name of the brow-antlered deer found in Bishnupur district.</div>
    `
  },
  61: {
    questext: "What is the local name of the brow-antlered deer of Manipur?",
    options: ["Barasingha", "Sangai", "Chital", "Sambar"],
    correct: "2",
    exptext: "✅ Sangai is the local name, also called the dancing deer. 📌 Sangai sings and dances. ❌ Barasingha is wrong because it is the swamp deer of Kanha."
  },
  62: {
    questext: "Which is the capital of Manipur?",
    options: ["Kohima", "Shillong", "Aizawl", "Imphal"],
    correct: "4",
    exptext: "✅ Imphal is the capital. 📌 Imphal is in the valley, so it is the rice bowl. ❌ Kohima is wrong because it is the capital of Nagaland."
  },
  63: {
    type: "concept", icon: "☁️", accent: "#d946ef", pauseTimer: true,
    title: "Meghalaya",
    html: `
      <p class="cp-lead">The word Meghalaya means <u>Abode of clouds</u>, that is, the home of clouds. Its capital is <b>Shillong</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/84.png" alt="Meghalaya highlighted on India map with neighbouring states" data-caption="Meghalaya marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/85.png" alt="Meghalaya political map capital districts" data-caption="A political map of Meghalaya, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/86.png" alt="Shillong Peak Meghalaya view photo" data-caption="Cloud-covered hills seen from Shillong Peak in Meghalaya." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Three tribal communities, the Garo, Khasi and Jaintia, live here. Meghalaya is mainly an agricultural state.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Shillong</td></tr><tr><td>Main languages</td><td>Khasi, Panar, Garo and English</td></tr><tr><td>Tribes</td><td>Garo, Khasi and Jaintia</td></tr><tr><td>National parks</td><td>Nokrek and Balpakram</td></tr><tr><td>Main festival</td><td>Pambalang-Nongkrem, of the Khasi tribe</td></tr><tr><td>Prominent places</td><td>Elephant Falls and Shillong Peak</td></tr><tr><td>Sport</td><td>Shillong golf course, one of the leading in the world</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/87.png" alt="Three boxes: Garo, Khasi and Jaintia, joined to a box named Meghalaya Abode of clouds." data-caption="The three tribal communities of Meghalaya and the meaning of its name." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/88.png" alt="Meghalaya hills map Garo Khasi Jaintia hills Shillong" data-caption="The Garo, Khasi and Jaintia hills of Meghalaya shown on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Meghalaya means Abode of clouds. Do not confuse it with Nagaland or Mizoram.</div>
      <div class="cp-note exam">Nokrek and Balpakram are the national parks of Meghalaya.</div>
    `
  },
  64: {
    questext: "What does the word Meghalaya mean?",
    options: ["Abode of clouds", "Land of rivers", "Land of hills", "Home of the brave"],
    correct: "1",
    exptext: "✅ Meghalaya means Abode of clouds. 📌 Megh means cloud. ❌ Land of hills is wrong because it is not the meaning of the name."
  },
  65: {
    questext: "Which of the following is a national park of Meghalaya?",
    options: ["Dachigam", "Kanha", "Nokrek", "Silent Valley"],
    correct: "3",
    exptext: "✅ Nokrek is a national park of Meghalaya. 📌 Nokrek and Balpakram go together. ❌ Kanha is wrong because it is in Madhya Pradesh."
  },
  66: {
    type: "concept", icon: "🎶", accent: "#64748b", pauseTimer: true,
    title: "Mizoram",
    html: `
      <p class="cp-lead">Mizoram has <b>Aizawl</b> as its capital. Its main languages are Mizo, English and Hindi, and agriculture is the mainstay of its economy.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/89.png" alt="Mizoram highlighted on India map with neighbouring states" data-caption="Mizoram marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/90.png" alt="Mizoram political map capital districts" data-caption="A political map of Mizoram, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/91.png" alt="Chapchar Kut festival Mizoram dance photo" data-caption="Mizo dancers in traditional dress during the Chapchar Kut festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Music and dance are an important part of Mizo life, and the state has three major festivals.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Aizawl</td></tr><tr><td>Main languages</td><td>Mizo, English and Hindi</td></tr><tr><td>Economy</td><td>Agriculture is the mainstay</td></tr><tr><td>Airport</td><td>Lengpui</td></tr><tr><td>Major festivals</td><td>Chapchar Kut, Mimkut and Pawl Kut</td></tr><tr><td>Tourist places</td><td>Champhai near the Myanmar border, Wantatang Falls</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/92.png" alt="Three festival boxes in a row: Chapchar Kut, Mimkut, Pawl Kut, under the title Festivals o" data-caption="The three major festivals of Mizoram shown together in one chart." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The airport of Aizawl is at <b>Lengpui</b>, not at Aizawl town.</div>
      <div class="cp-note exam">Mizoram has three major festivals: Chapchar Kut, Mimkut and Pawl Kut.</div>
    `
  },
  67: {
    questext: "Which of the following is a major festival of Mizoram?",
    options: ["Bihu", "Chapchar Kut", "Onam", "Baisakhi"],
    correct: "2",
    exptext: "✅ Chapchar Kut is a major festival of Mizoram. 📌 Mizoram has three Kut festivals. ❌ Bihu is wrong because it belongs to Assam."
  },
  68: {
    questext: "The airport of Mizoram is situated at which place?",
    options: ["Champhai", "Lunglei", "Serchhip", "Lengpui"],
    correct: "4",
    exptext: "✅ The airport is at Lengpui. 📌 Lengpui is near Aizawl. ❌ Champhai is wrong because it is a tourist place near the Myanmar border."
  },
  69: {
    type: "concept", icon: "🌾", accent: "#fb7185", pauseTimer: true,
    title: "Nagaland",
    html: `
      <p class="cp-lead">Nagaland has <b>Kohima</b> as its capital. Its main languages are English, Hindi and other tribal languages, and the economy is based on agriculture.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/93.png" alt="Nagaland highlighted on India map with neighbouring states" data-caption="Nagaland marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/94.png" alt="Nagaland political map capital districts" data-caption="A political map of Nagaland, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/95.png" alt="Mount Saramati Nagaland peak photo" data-caption="Mount Saramati, the highest hill of Nagaland." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Farmers here follow a very old method of farming, called slash and burn, which is known locally as Jhum farming.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Kohima</td></tr><tr><td>Main languages</td><td>English, Hindi and other tribal languages</td></tr><tr><td>Highest hill</td><td>Saramati</td></tr><tr><td>Economy</td><td>Agriculture based</td></tr><tr><td>Farming style</td><td>Slash and burn, locally called Jhum farming</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/96.png" alt="Three steps in boxes: Cut the trees, Burn the trees, Sow seeds in the ash, titled Jhum far" data-caption="The three steps of Jhum farming, which is slash and burn farming." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Jhum farming is a name for slash and burn farming, and it is used in Nagaland and other hill states.</div>
      <div class="cp-note exam">Saramati is the highest hill of Nagaland.</div>
    `
  },
  70: {
    questext: "Which is the highest hill of Nagaland?",
    options: ["Dapha Bum", "Saramati", "Blue Mountain", "Japfu"],
    correct: "2",
    exptext: "✅ Saramati is the highest hill. 📌 Saramati belongs to Nagaland. ❌ Dapha Bum is wrong because it is a peak in Arunachal Pradesh."
  },
  71: {
    questext: "What is slash and burn farming called in Nagaland?",
    options: ["Jhum farming", "Podu farming", "Bewar farming", "Kumari farming"],
    correct: "1",
    exptext: "✅ It is called Jhum farming. 📌 Jhum is the name for the hill. ❌ Bewar is wrong because it is the name used in Madhya Pradesh."
  },
  72: {
    type: "concept", icon: "🛕", accent: "#2dd4bf", pauseTimer: true,
    title: "Odisha",
    html: `
      <p class="cp-lead">Odisha has <b>Bhubaneswar</b> as its capital, and its language is Odia. Bhubaneswar is called the <u>city of temples</u> because of its many temples.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/97.png" alt="Odisha highlighted on India map with neighbouring states" data-caption="Odisha marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/98.png" alt="Odisha political map capital districts" data-caption="A political map of Odisha, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/99.png" alt="Konark Sun Temple Odisha photo" data-caption="The Konark Sun Temple, shaped like a giant stone chariot." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Agriculture is the mainstay of Odisha. Paradip is its most important port.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Bhubaneswar, the city of temples</td></tr><tr><td>Language</td><td>Odia</td></tr><tr><td>Main port</td><td>Paradip</td></tr><tr><td>Lakes</td><td>Chilika, Ansupa and Sara</td></tr><tr><td>Temples</td><td>Lingaraja, Antavasudeva, Jagannath at Puri, Sun Temple at Konark</td></tr><tr><td>Ashoka edicts</td><td>Dhauli</td></tr><tr><td>Dam</td><td>Hirakud on the Mahanadi, one of the longest dams of India</td></tr><tr><td>Chilika</td><td>India's largest saltwater lake</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/100.png" alt="Chilika Lake Odisha lagoon photo" data-caption="Boats on Chilika Lake, the largest saltwater lake in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/101.png" alt="Hirakud Dam Mahanadi Odisha photo" data-caption="The Hirakud Dam on the Mahanadi River." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/102.png" alt="Odisha tourist map Puri Konark Bhubaneswar Chilika Paradip" data-caption="The temples, Chilika Lake and Paradip port marked on a map of Odisha." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Hirakud Dam is built on the <b>Mahanadi</b>. Chilika is a saltwater lake, not a freshwater lake.</div>
      <div class="cp-note exam">Jagannath Temple is at Puri and the Sun Temple is at Konark.</div>
    `
  },
  73: {
    questext: "Which is the most important port of Odisha?",
    options: ["Kandla", "Kochi", "Paradip", "Chennai"],
    correct: "3",
    exptext: "✅ Paradip is the most important port. 📌 Paradip and Puri both start with P. ❌ Kandla is wrong because it is a port of Gujarat."
  },
  74: {
    questext: "Hirakud Dam is built on which river?",
    options: ["Godavari", "Krishna", "Cauvery", "Mahanadi"],
    correct: "4",
    exptext: "✅ Hirakud Dam is built on the Mahanadi. 📌 Hirakud and Mahanadi are both in Odisha. ❌ Godavari is wrong because it flows mostly through Maharashtra, Telangana and Andhra Pradesh."
  },
  75: {
    questext: "India's largest saltwater lake is located in which state?",
    options: ["Rajasthan", "Gujarat", "Odisha", "Tamil Nadu"],
    correct: "3",
    exptext: "✅ Chilika Lake is in Odisha. 📌 Chilika means a sea lake in Odisha. ❌ Rajasthan is wrong because Sambhar lake there is a salt lake but not the largest saltwater lake of the coast."
  },
  76: {
    questext: "Consider the following statements about Odisha:\n1. Hirakud Dam is built on the Mahanadi.\n2. Chilika is a freshwater lake.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Chilika is the saltwater lake. ❌ Statement 2 is wrong because Chilika is a saltwater lake."
  },
  77: {
    type: "concept", icon: "🌾", accent: "#c026d3", pauseTimer: true,
    title: "Punjab",
    html: `
      <p class="cp-lead">Punjab has <b>Chandigarh</b> as its capital, and its language is Punjabi. <u>Wheat, rice and cotton</u> are mainly produced here.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/103.png" alt="Punjab highlighted on India map with neighbouring states" data-caption="Punjab marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/104.png" alt="Punjab political map capital districts" data-caption="A political map of Punjab, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/105.png" alt="Punjab wheat field harvest photo" data-caption="A golden wheat field ready for harvest in Punjab." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Chandigarh</td></tr><tr><td>Language</td><td>Punjabi</td></tr><tr><td>Main crops</td><td>Wheat, rice and cotton</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/106.png" alt="Three boxes: Wheat, Rice, Cotton, all joined to a box Punjab." data-caption="The three main crops grown in Punjab." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Chandigarh is the capital of both Punjab and Haryana.</div>
      <div class="cp-note exam">Wheat, rice and cotton are the main crops of Punjab.</div>
    `
  },
  78: {
    questext: "Which of the following is the capital of Punjab?",
    options: ["Chandigarh", "Ludhiana", "Amritsar", "Patiala"],
    correct: "1",
    exptext: "✅ Chandigarh is the capital of Punjab. 📌 It is shared with Haryana. ❌ Amritsar is wrong because it is a holy city but not the capital."
  },
  79: {
    questext: "Which of the following crops is mainly produced in Punjab?",
    options: ["Tea, coffee and rubber", "Wheat, rice and cotton", "Jute, rice and tea", "Coconut, rice and cardamom"],
    correct: "2",
    exptext: "✅ Wheat, rice and cotton are the main crops. 📌 Punjab is the land of wheat. ❌ Jute, rice and tea is wrong because it fits West Bengal."
  },
  80: {
    type: "concept", icon: "🏜️", accent: "#65a30d", pauseTimer: true,
    title: "Rajasthan",
    html: `
      <p class="cp-lead">Rajasthan has <b>Jaipur</b> as its capital, and its main languages are Hindi and Rajasthani. It is the <u>largest state of India by area</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/107.png" alt="Rajasthan highlighted on India map with neighbouring states" data-caption="Rajasthan marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/108.png" alt="Rajasthan political map capital districts" data-caption="A political map of Rajasthan, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/109.png" alt="Ranthambore National Park tiger Rajasthan photo" data-caption="A tiger in Ranthambore National Park near Sawai Madhopur." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Rajasthan is famous for its big fairs and its national parks.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Jaipur</td></tr><tr><td>Languages</td><td>Hindi and Rajasthani</td></tr><tr><td>Size</td><td>Largest state by area</td></tr><tr><td>Fairs</td><td>Tribal Kumbh of Beneshwar (Dungarpur), Shri Mahavir Ji Fair (Karauli), Animal Fair (Pushkar, Ajmer), Khatu Shyam Ji Fair (Sikar)</td></tr><tr><td>National parks</td><td>Keoladeo (Bharatpur), Ranthambore (Sawai Madhopur)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/110.png" alt="Pushkar camel fair Rajasthan photo" data-caption="Camels at the Pushkar animal fair in Ajmer district." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/111.png" alt="Rajasthan national parks map Ranthambore Keoladeo Pushkar" data-caption="The national parks and fair towns of Rajasthan marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Tribal Kumbh is at <b>Beneshwar</b> in Dungarpur, and the Animal Fair is at <b>Pushkar</b>.</div>
      <div class="cp-note exam">Rajasthan is the largest state by area. Keoladeo National Park is in Bharatpur and Ranthambore in Sawai Madhopur.</div>
    `
  },
  81: {
    questext: "Which is the largest state of India by area?",
    options: ["Madhya Pradesh", "Maharashtra", "Uttar Pradesh", "Rajasthan"],
    correct: "4",
    exptext: "✅ Rajasthan is the largest state by area. 📌 Rajasthan means a big sandy land. ❌ Madhya Pradesh is wrong because it is the second largest."
  },
  82: {
    questext: "Keoladeo National Park is located in which district of Rajasthan?",
    options: ["Bharatpur", "Alwar", "Sawai Madhopur", "Kota"],
    correct: "1",
    exptext: "✅ It is in Bharatpur. 📌 Keoladeo is the bird park of Bharatpur. ❌ Sawai Madhopur is wrong because Ranthambore is located there."
  },
  83: {
    questext: "The Animal Fair is held every year at which place of Rajasthan?",
    options: ["Karauli", "Sikar", "Pushkar", "Dungarpur"],
    correct: "3",
    exptext: "✅ The Animal Fair is held at Pushkar in Ajmer. 📌 Pushkar and animals both start with the sound P. ❌ Sikar is wrong because the Khatu Shyam Ji Fair is held there."
  },
  84: {
    type: "concept", icon: "🏔️", accent: "#0891b2", pauseTimer: true,
    title: "Sikkim",
    html: `
      <p class="cp-lead">Sikkim has <b>Gangtok</b> as its capital. Its main languages are English, Lepcha, Bhutia, Nepali and Limbu.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/112.png" alt="Sikkim highlighted on India map with neighbouring states" data-caption="Sikkim marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/113.png" alt="Sikkim political map capital districts" data-caption="A political map of Sikkim, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/114.png" alt="Kanchenjunga peak Sikkim view photo" data-caption="Mount Kanchenjunga, the third highest peak of the world, seen from Sikkim." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Kanchenjunga, the world's third highest peak, is treated as the protector goddess of Sikkim. The economy is mainly agricultural.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Gangtok</td></tr><tr><td>Main languages</td><td>English, Lepcha, Bhutia, Nepali and Limbu</td></tr><tr><td>Kanchenjunga</td><td>The world's third highest peak, the protector goddess</td></tr><tr><td>Economy</td><td>Agriculture</td></tr><tr><td>Cardamom</td><td>Largest producer of big cardamom in India</td></tr><tr><td>Organic</td><td>India's first completely organic state</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/115.png" alt="Three badges: Third highest peak Kanchenjunga, Largest big cardamom producer, First comple" data-caption="Three special titles of Sikkim brought together on one picture." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/116.png" alt="Sikkim map Gangtok Kanchenjunga location" data-caption="Gangtok and Mount Kanchenjunga marked on a map of Sikkim." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Kanchenjunga is the <b>third</b> highest peak of the world, after Everest and K2.</div>
      <div class="cp-note exam">Sikkim is India's first completely organic state and the largest producer of big cardamom.</div>
    `
  },
  85: {
    questext: "Which is India's first completely organic state?",
    options: ["Kerala", "Sikkim", "Uttarakhand", "Himachal Pradesh"],
    correct: "2",
    exptext: "✅ Sikkim is the first completely organic state. 📌 Sikkim is small but clean. ❌ Kerala is wrong because it is the first digital state."
  },
  86: {
    questext: "Which state is the largest producer of big cardamom in India?",
    options: ["Kerala", "Karnataka", "Assam", "Sikkim"],
    correct: "4",
    exptext: "✅ Sikkim is the largest producer. 📌 Big cardamom grows in the cool hills of Sikkim. ❌ Kerala is wrong because it is known for small cardamom."
  },
  87: {
    questext: "Kanchenjunga is the world's which highest peak?",
    options: ["First", "Third", "Second", "Fourth"],
    correct: "2",
    exptext: "✅ It is the third highest peak. 📌 Everest, K2, then Kanchenjunga. ❌ Second is wrong because K2 holds the second place."
  },
  88: {
    type: "concept", icon: "🔥", accent: "#7c3aed", pauseTimer: true,
    title: "Tamil Nadu",
    html: `
      <p class="cp-lead">Tamil Nadu has <b>Chennai</b> as its capital, and its language is Tamil. Agriculture is the main occupation, and the main crops are rice and jowar.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/117.png" alt="Tamil Nadu highlighted on India map with neighbouring states" data-caption="Tamil Nadu marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/118.png" alt="Tamil Nadu political map capital districts" data-caption="A political map of Tamil Nadu, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/119.png" alt="Pongal festival Tamil Nadu kolam pot photo" data-caption="The Pongal pot boiling over, the sign of a good harvest in Tamil Nadu." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Tamil Nadu has a leading place in the production and use of bio-fertilizers.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Chennai</td></tr><tr><td>Language</td><td>Tamil</td></tr><tr><td>Main crops</td><td>Rice and jowar</td></tr><tr><td>Nuclear plant</td><td>Kudankulam, in Tirunelveli district</td></tr><tr><td>Major ports</td><td>Chennai and Tuticorin</td></tr><tr><td>Harvest festival</td><td>Pongal, in January, worships the sun, earth and animals</td></tr><tr><td>Jallikattu</td><td>Held after Pongal, Alanganallur is famous</td></tr><tr><td>Hill stations</td><td>Udagamandalam (Ooty), Kodaikanal, Yercaud</td></tr><tr><td>Other places</td><td>Fort St George, Marina Beach in Chennai</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/120.png" alt="Kudankulam Nuclear Power Plant photo" data-caption="The Kudankulam Nuclear Power Plant in Tirunelveli district." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/121.png" alt="Alanganallur Jallikattu bull photo" data-caption="A bull being let loose during Jallikattu at Alanganallur." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/122.png" alt="Tamil Nadu map ports Chennai Tuticorin Kudankulam Ooty" data-caption="The ports, the nuclear plant and the hill stations of Tamil Nadu marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Pongal is celebrated in <b>January</b>, and Jallikattu is held after Pongal.</div>
      <div class="cp-note exam">Kudankulam Nuclear Power Plant is in Tirunelveli district of Tamil Nadu.</div>
    `
  },
  89: {
    questext: "Kudankulam Nuclear Power Plant is located in which district of Tamil Nadu?",
    options: ["Tirunelveli", "Madurai", "Kanchipuram", "Salem"],
    correct: "1",
    exptext: "✅ It is in Tirunelveli district. 📌 Kudankulam is in the far south. ❌ Kanchipuram is wrong because Kalpakkam is the nuclear site near it."
  },
  90: {
    questext: "The harvest festival Pongal is celebrated in which month?",
    options: ["March", "August", "January", "October"],
    correct: "3",
    exptext: "✅ Pongal is celebrated in January. 📌 Pongal comes with the new year harvest. ❌ August is wrong because Onam is celebrated around that time."
  },
  91: {
    questext: "Alanganallur in Tamil Nadu is world famous for which event?",
    options: ["Boat race", "Kite festival", "Camel fair", "Jallikattu"],
    correct: "4",
    exptext: "✅ It is famous for Jallikattu, a bull taming event held after Pongal. 📌 Alanganallur is the home of Jallikattu. ❌ Boat race is wrong because it is linked with Kerala."
  },
  92: {
    type: "concept", icon: "🌿", accent: "#db2777", pauseTimer: true,
    title: "Tripura",
    html: `
      <p class="cp-lead">Tripura has <b>Agartala</b> as its capital. Its main languages are Bengali, Kokborok and English.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/123.png" alt="Tripura highlighted on India map with neighbouring states" data-caption="Tripura marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/124.png" alt="Tripura political map capital districts" data-caption="A political map of Tripura, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/125.png" alt="Unakoti rock carvings Tripura photo" data-caption="The giant rock carvings at Unakoti in Tripura." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The main airport of Tripura is in Agartala. The state also has many places for tourists.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Agartala</td></tr><tr><td>Main languages</td><td>Bengali, Kokborok and English</td></tr><tr><td>Main airport</td><td>Agartala</td></tr><tr><td>Tourist places</td><td>Sepahijala, Pilak, Deburjheel, Unakoti, Jampui Hill</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/126.png" alt="Neermahal palace Rudrasagar Lake Tripura photo" data-caption="Neermahal, a palace built in the middle of Rudrasagar Lake." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Kokborok is the tribal language of Tripura.</div>
      <div class="cp-note exam">Agartala is the capital and has the main airport of Tripura.</div>
    `
  },
  93: {
    questext: "Which is the capital of Tripura?",
    options: ["Imphal", "Aizawl", "Agartala", "Itanagar"],
    correct: "3",
    exptext: "✅ Agartala is the capital. 📌 Agartala starts with A, like Assam, but it is in Tripura. ❌ Imphal is wrong because it is the capital of Manipur."
  },
  94: {
    questext: "Kokborok is a language spoken in which state?",
    options: ["Tripura", "Manipur", "Assam", "Sikkim"],
    correct: "1",
    exptext: "✅ Kokborok is a language of Tripura. 📌 Kokborok is the Tripura language. ❌ Manipuri is the language of Manipur."
  },
  95: {
    type: "concept", icon: "💎", accent: "#059669", pauseTimer: true,
    title: "Andhra Pradesh",
    html: `
      <p class="cp-lead">Andhra Pradesh has <b>Amaravati</b> as its capital, and its main languages are Telugu and Urdu. The state is known as <u>Ratna Garbha</u>, the womb of gems, because of its rock and mineral variety.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/127.png" alt="Andhra Pradesh highlighted on India map with neighbouring states" data-caption="Andhra Pradesh marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/128.png" alt="Andhra Pradesh political map capital districts" data-caption="A political map of Andhra Pradesh, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/129.png" alt="Tirumala Venkateswara Temple Tirupati photo" data-caption="The Sri Venkateswara Temple at Tirumala near Tirupati." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In July 2013 the Government of India announced the separation of Telangana from Andhra Pradesh. The main basis of the economy is agriculture.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Amaravati</td></tr><tr><td>Main languages</td><td>Telugu and Urdu</td></tr><tr><td>Nickname</td><td>Ratna Garbha</td></tr><tr><td>Economy</td><td>Agriculture</td></tr><tr><td>Major port</td><td>Visakhapatnam</td></tr><tr><td>Temples</td><td>Sri Venkateshwara at Tirupati, Kanaka Durga at Vijayawada, Sri Satyanarayana Swamy at Annavaram, Sri Varaha Lakshmi Narasimha at Simhachalam</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/130.png" alt="Visakhapatnam port harbour photo" data-caption="The harbour of Visakhapatnam, the major port of Andhra Pradesh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Andhra Pradesh is Ratna Garbha, famous for its rock and mineral variety all over the world.</div>
      <div class="cp-note exam">Visakhapatnam is the major port, and Tirupati has the Sri Venkateshwara Temple.</div>
    `
  },
  96: {
    questext: "Which state is known as Ratna Garbha?",
    options: ["Jharkhand", "Andhra Pradesh", "Odisha", "Karnataka"],
    correct: "2",
    exptext: "✅ Andhra Pradesh is known as Ratna Garbha. 📌 Ratna means gem. ❌ Jharkhand is wrong because it is famous for coal and steel."
  },
  97: {
    questext: "Which is the major port of Andhra Pradesh?",
    options: ["Kochi", "Paradip", "Tuticorin", "Visakhapatnam"],
    correct: "4",
    exptext: "✅ Visakhapatnam is the major port. 📌 Vizag is the port city. ❌ Paradip is wrong because it is a port of Odisha."
  },
  98: {
    type: "concept", icon: "🌸", accent: "#ca8a04", pauseTimer: true,
    title: "Telangana",
    html: `
      <p class="cp-lead">Telangana has <b>Hyderabad</b> as its capital, and its languages are Telugu and Urdu. It was formed in <b>June 2014</b> as the <u>29th state</u> of India by dividing Andhra Pradesh.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/131.png" alt="Telangana highlighted on India map with neighbouring states" data-caption="Telangana marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/132.png" alt="Telangana political map capital districts" data-caption="A political map of Telangana, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/133.png" alt="A timeline: July 2013 separation announced, June 2014 Telangana formed as the 29th state." data-caption="Telangana was formed from Andhra Pradesh and became the twenty-ninth state of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The main food crop is rice, and the state is famous for a flower festival.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Hyderabad</td></tr><tr><td>Languages</td><td>Telugu and Urdu</td></tr><tr><td>Formation</td><td>June 2014, the 29th state</td></tr><tr><td>Main food crop</td><td>Rice</td></tr><tr><td>Festival</td><td>Baatukamma, a unique flower festival</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/134.png" alt="Bathukamma flower festival Telangana photo" data-caption="Women with stacked flower arrangements for the Bathukamma festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Telangana is the <b>29th</b> state, and the festival is of flowers, not of lamps.</div>
      <div class="cp-note exam">Telangana was formed in June 2014 by dividing Andhra Pradesh.</div>
    `
  },
  99: {
    questext: "Telangana was formed as which state of India in June 2014?",
    options: ["29th", "28th", "30th", "27th"],
    correct: "1",
    exptext: "✅ Telangana is the 29th state. 📌 2014, 29th. ❌ 28th is wrong because Jharkhand holds that number."
  },
  100: {
    questext: "Baatukamma is a unique flower festival celebrated in which state?",
    options: ["Kerala", "Karnataka", "Telangana", "Odisha"],
    correct: "3",
    exptext: "✅ It is celebrated in Telangana. 📌 Baatukamma means mother goddess of flowers. ❌ Kerala is wrong because its festival is Onam."
  },
  101: {
    type: "concept", icon: "🛕", accent: "#0284c7", pauseTimer: true,
    title: "Uttar Pradesh",
    html: `
      <p class="cp-lead">Uttar Pradesh has <b>Lucknow</b> as its capital, and its main languages are Hindi and Urdu. After independence, the United Province was named Uttar Pradesh.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/135.png" alt="Uttar Pradesh highlighted on India map with neighbouring states" data-caption="Uttar Pradesh marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/136.png" alt="Uttar Pradesh political map capital districts" data-caption="A political map of Uttar Pradesh, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/137.png" alt="Sarnath Dhamek Stupa Uttar Pradesh photo" data-caption="The Dhamek Stupa at Sarnath, where the Buddha gave his first sermon." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Gautam Buddha gave his first sermon at Sarnath and attained Mahaparinirvana at Kushinagar, both in this state.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Lucknow</td></tr><tr><td>Languages</td><td>Hindi and Urdu</td></tr><tr><td>Buddha</td><td>First sermon at Sarnath, Mahaparinirvana at Kushinagar</td></tr><tr><td>Technology</td><td>Software Technology Park at Kanpur</td></tr><tr><td>Kumbh Mela</td><td>Every 12th year at Prayagraj (Allahabad)</td></tr><tr><td>Kabir</td><td>Kabirdas died at Maghar</td></tr><tr><td>Lucknow</td><td>Imambara</td></tr><tr><td>Tourist places</td><td>Taj Mahal (Agra), Varanasi, Ayodhya, Mathura, Vrindavan, Fatehpur Sikri, Naimisharanya</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/138.png" alt="Bara Imambara Lucknow photo" data-caption="The Bara Imambara of Lucknow, a famous building of the city." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/139.png" alt="Taj Mahal Agra sunrise photo" data-caption="The Taj Mahal in Agra, the most famous monument of Uttar Pradesh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/140.png" alt="Uttar Pradesh Buddhist sites map Sarnath Kushinagar Prayagraj Agra" data-caption="Sarnath, Kushinagar, Prayagraj and Agra marked on a map of Uttar Pradesh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Buddha's first sermon was at <b>Sarnath</b>, and his Mahaparinirvana was at <b>Kushinagar</b>. Both are in Uttar Pradesh.</div>
      <div class="cp-note exam">Kumbh Mela at Prayagraj is held every 12th year, and Kabirdas died at Maghar.</div>
    `
  },
  102: {
    questext: "Where did Gautam Buddha attain Mahaparinirvana?",
    options: ["Sarnath", "Kushinagar", "Bodh Gaya", "Lumbini"],
    correct: "2",
    exptext: "✅ He attained Mahaparinirvana at Kushinagar in Uttar Pradesh. 📌 Kushinagar is the final stop. ❌ Sarnath is wrong because it is the place of his first sermon."
  },
  103: {
    questext: "Where did the saint Kabirdas die?",
    options: ["Varanasi", "Prayagraj", "Mathura", "Maghar"],
    correct: "4",
    exptext: "✅ Kabirdas died at Maghar. 📌 Maghar and Kabir both have a strong sound. ❌ Varanasi is wrong because he lived there."
  },
  104: {
    questext: "Consider the following statements about Uttar Pradesh:\n1. A Software Technology Park has been established in Kanpur.\n2. Kumbh Mela is organised every 12th year at Prayagraj.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Kanpur is for technology and Prayagraj is for the Kumbh. ❌ Choosing only one is wrong because both facts are true."
  },
  105: {
    type: "concept", icon: "🏔️", accent: "#9333ea", pauseTimer: true,
    title: "Uttarakhand",
    html: `
      <p class="cp-lead">Uttarakhand has <b>Dehradun</b> as its capital. Its main languages are Hindi, English, Gadhwali and Kumaouni. It is also known as <u>Devbhoomi</u> because of its holy pilgrimage sites.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/141.png" alt="Uttarakhand highlighted on India map with neighbouring states" data-caption="Uttarakhand marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/142.png" alt="Uttarakhand political map capital districts" data-caption="A political map of Uttarakhand, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/143.png" alt="Kedarnath Temple Uttarakhand Himalaya photo" data-caption="The Kedarnath Temple among the snowy mountains of Uttarakhand." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Uttarakhand became the 27th state of India on 9 November 2000. Before that it was part of Uttar Pradesh.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Dehradun</td></tr><tr><td>Languages</td><td>Hindi, English, Gadhwali and Kumaouni</td></tr><tr><td>Formation</td><td>9 November 2000, the 27th state</td></tr><tr><td>Nickname</td><td>Devbhoomi</td></tr><tr><td>Kumbh Mela</td><td>Haridwar, every 12 years</td></tr><tr><td>Fairs</td><td>Devidhura, Purnagiri (Champawat), Nandadevi (Almora), Gauchar, Baisakhi (Uttarkashi)</td></tr><tr><td>Tourist places</td><td>Gangotri, Yamunotri, Badrinath, Kedarnath, Haridwar, Rishikesh, Hemkund Sahib, Valley of Flowers, Nainital, Mussoorie</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/144.png" alt="Valley of Flowers National Park Uttarakhand photo" data-caption="The Valley of Flowers in Uttarakhand during the monsoon bloom." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/145.png" alt="Uttarakhand Char Dham map Gangotri Yamunotri Kedarnath Badrinath" data-caption="The four holy sites of Uttarakhand marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Himachal Pradesh and Uttarakhand are both called <b>Devbhoomi</b>. Uttarakhand is the 27th state.</div>
      <div class="cp-note exam">The four holy sites of Uttarakhand are Gangotri, Yamunotri, Badrinath and Kedarnath.</div>
    `
  },
  106: {
    questext: "Uttarakhand became which state of India on 9 November 2000?",
    options: ["26th", "27th", "28th", "25th"],
    correct: "2",
    exptext: "✅ Uttarakhand became the 27th state. 📌 The order of the year 2000 is 26, 27, 28. ❌ 26th is wrong because that is Chhattisgarh."
  },
  107: {
    questext: "Which of the following is a holy site in Uttarakhand?",
    options: ["Badrinath", "Konark", "Puri", "Tirupati"],
    correct: "1",
    exptext: "✅ Badrinath is in Uttarakhand. 📌 Badri and Kedar are the two famous ones. ❌ Puri is wrong because it is in Odisha."
  },
  108: {
    questext: "Consider the following statements:\n1. Uttarakhand was formed on 9 November 2000.\n2. Kumbh Mela is organised in Haridwar every 12 years.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Uttarakhand was formed in 2000 and Haridwar holds the Kumbh. ❌ Only 1 is wrong because statement 2 is also true."
  },
  109: {
    type: "concept", icon: "🏙️", accent: "#dc2626", pauseTimer: true,
    title: "West Bengal",
    html: `
      <p class="cp-lead">West Bengal has <b>Kolkata</b> as its capital, and its language is Bangla. After the Battle of Plassey in 1757, the British first established direct control over Bengal.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/146.png" alt="West Bengal highlighted on India map with neighbouring states" data-caption="West Bengal marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/147.png" alt="West Bengal political map capital districts" data-caption="A political map of West Bengal, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/148.png" alt="Victoria Memorial Kolkata photo" data-caption="The Victoria Memorial in Kolkata, a famous place for tourists." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Agriculture is the main basis of the economy, and jute and rice are the major crops.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Kolkata</td></tr><tr><td>Language</td><td>Bangla</td></tr><tr><td>Year of Plassey</td><td>1757</td></tr><tr><td>Major crops</td><td>Jute and rice, also tea, maize and sugarcane</td></tr><tr><td>Project</td><td>Teesta Barrage Project</td></tr><tr><td>IT hub</td><td>Salt Lake, India's first fully integrated electronic complex</td></tr><tr><td>Tourist places</td><td>Victoria Memorial, Science City, Dalhousie Square, Dakshineswar Kali Temple, Senchal Lake</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/149.png" alt="Howrah Bridge Kolkata photo" data-caption="The Howrah Bridge over the Hooghly River in Kolkata." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Jute and rice are the major crops of West Bengal, and tea is also grown in the north.</div>
      <div class="cp-note exam">The Salt Lake electronic complex is India's first fully integrated electronic complex.</div>
    `
  },
  110: {
    questext: "After which battle did the British establish direct control over Bengal?",
    options: ["Buxar", "Panipat", "Plassey", "Haldighati"],
    correct: "3",
    exptext: "✅ After the Battle of Plassey in 1757. 📌 Plassey 1757 started British rule. ❌ Buxar is wrong because it came in 1764."
  },
  111: {
    questext: "Which two crops are the major crops of West Bengal?",
    options: ["Wheat and cotton", "Coffee and rubber", "Jowar and bajra", "Jute and rice"],
    correct: "4",
    exptext: "✅ Jute and rice are the major crops. 📌 Bengal is the land of jute. ❌ Wheat and cotton is wrong because it fits Punjab."
  },
  112: {
    questext: "The Salt Lake electronic complex is located in which state?",
    options: ["Karnataka", "Telangana", "West Bengal", "Maharashtra"],
    correct: "3",
    exptext: "✅ It is in West Bengal. 📌 Salt Lake is a part of Kolkata. ❌ Karnataka is wrong because the IT hub there is at Bengaluru."
  },
  113: {
    type: "concept", icon: "🏝️", accent: "#0d9488", pauseTimer: true,
    title: "Andaman and Nicobar Islands",
    html: `
      <p class="cp-lead">The capital of the Andaman and Nicobar Islands is <b>Port Blair</b>. The islands north of <u>10 degrees north latitude</u> are the Andaman Islands, and those south of it are the Nicobar Islands.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/150.png" alt="Andaman and Nicobar Islands highlighted on India map with neighbouring states" data-caption="Andaman and Nicobar Islands marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/151.png" alt="Andaman and Nicobar Islands political map capital districts" data-caption="A political map of Andaman and Nicobar Islands, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/152.png" alt="A vertical line at 10 degrees north latitude, Andaman Islands above and Nicobar Islands be" data-caption="The Ten Degree Channel divides the Andaman Islands in the north from the Nicobar Islands in the south." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Four tribes of the Negrito community live in the Andaman Islands, and two main tribes live in the Nicobar Islands.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Port Blair</td></tr><tr><td>Main languages</td><td>Hindi, Andamani, Nicobari, Bangla, Tamil, Malayalam and Telugu</td></tr><tr><td>Andaman tribes</td><td>Great Andamanese, Onge, Jarawa and Sentinelese (Negrito community)</td></tr><tr><td>Nicobar tribes</td><td>Nicobarese and Shompen</td></tr><tr><td>Food crop</td><td>Paddy in Andaman; coconut and betel nut in Nicobar</td></tr><tr><td>Tourism</td><td>Cellular Jail, Ross Island, Havelock Island</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/153.png" alt="Cellular Jail Port Blair photo" data-caption="The Cellular Jail at Port Blair, a symbol of the freedom struggle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/154.png" alt="Havelock Island Radhanagar Beach photo" data-caption="The white sand beach of Havelock Island, now named Swaraj Dweep." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/155.png" alt="Andaman Nicobar Islands map Ten Degree Channel Port Blair" data-caption="The Andaman and Nicobar Islands with the Ten Degree Channel between them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Andaman Islands lie <b>north</b> of 10 degrees north latitude and the Nicobar Islands <b>south</b> of it.</div>
      <div class="cp-note exam">The Great Andamanese, Onge, Jarawa and Sentinelese are Negrito tribes of the Andaman Islands.</div>
    `
  },
  114: {
    questext: "The islands located south of 10 degrees north latitude are called which islands?",
    options: ["Nicobar Islands", "Andaman Islands", "Lakshadweep", "Minicoy"],
    correct: "1",
    exptext: "✅ They are the Nicobar Islands. 📌 North is Andaman and south is Nicobar. ❌ Andaman Islands is wrong because it lies north of the line."
  },
  115: {
    questext: "Which of the following tribes lives in the Nicobar Islands?",
    options: ["Onge", "Shompen", "Jarawa", "Sentinelese"],
    correct: "2",
    exptext: "✅ Shompen live in the Nicobar Islands. 📌 Nicobarese and Shompen are the two tribes of the south. ❌ Jarawa is wrong because it is an Andaman tribe."
  },
  116: {
    questext: "Which is the capital of the Andaman and Nicobar Islands?",
    options: ["Kavaratti", "Silvassa", "Puducherry", "Port Blair"],
    correct: "4",
    exptext: "✅ Port Blair is the capital. 📌 Port Blair is at South Andaman. ❌ Kavaratti is wrong because it is the capital of Lakshadweep."
  },
  117: {
    type: "concept", icon: "🏛️", accent: "#4f46e5", pauseTimer: true,
    title: "Chandigarh",
    html: `
      <p class="cp-lead">Chandigarh is a union territory, and it is the capital of both Punjab and Haryana. Its main languages are Hindi, Punjabi and English.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/156.png" alt="Chandigarh highlighted on India map with neighbouring states" data-caption="Chandigarh marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/157.png" alt="Chandigarh political map capital districts" data-caption="A political map of Chandigarh, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/158.png" alt="Rock Garden Chandigarh photo" data-caption="The Rock Garden of Chandigarh, made from waste and broken materials." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The city was built by the French architect Le Corbusier and is famous for its modern architecture and town planning. It was made a union territory on 1 November 1966.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Languages</td><td>Hindi, Punjabi and English</td></tr><tr><td>Architect</td><td>Le Corbusier, from France</td></tr><tr><td>Status</td><td>Union territory since 1 November 1966</td></tr><tr><td>Famous for</td><td>Modern architecture and town planning</td></tr><tr><td>Tourist places</td><td>Rock Garden, Capitol Complex, Rose Garden, Sukhna Lake</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/159.png" alt="Capitol Complex Chandigarh Le Corbusier photo" data-caption="The Capitol Complex, designed by Le Corbusier." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Chandigarh is not a state. It is a union territory and the shared capital of two states.</div>
      <div class="cp-note exam">Le Corbusier planned Chandigarh, and it became a union territory on 1 November 1966.</div>
    `
  },
  118: {
    questext: "Who built the city of Chandigarh as the architect?",
    options: ["Le Corbusier", "Edwin Lutyens", "Herbert Baker", "Laurie Baker"],
    correct: "1",
    exptext: "✅ Le Corbusier built Chandigarh. 📌 Corbusier is French. ❌ Edwin Lutyens is wrong because he designed New Delhi."
  },
  119: {
    questext: "When was Chandigarh made a union territory?",
    options: ["26 January 1950", "15 August 1947", "1 November 1966", "1 May 1960"],
    correct: "3",
    exptext: "✅ It was made a union territory on 1 November 1966. 📌 66 for Chandigarh. ❌ 1 May 1960 is wrong because it is the formation day of Gujarat."
  },
  120: {
    type: "concept", icon: "🏝️", accent: "#ea580c", pauseTimer: true,
    title: "Dadra and Nagar Haveli and Daman and Diu",
    html: `
      <p class="cp-lead">Dadra and Nagar Haveli and Daman and Diu are small areas on the west coast. They were under <u>Portuguese control</u> before they joined India, and now form one union territory.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/160.png" alt="Dadra and Nagar Haveli and Daman and Diu highlighted on India map with neighbouring states" data-caption="Dadra and Nagar Haveli and Daman and Diu marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/161.png" alt="Dadra and Nagar Haveli and Daman and Diu political map capital districts" data-caption="A political map of Dadra and Nagar Haveli and Daman and Diu, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/162.png" alt="Two timeline boxes: Dadra and Nagar Haveli free on 2 August 1954; Daman and Diu come under" data-caption="The two areas became free from Portuguese rule at different times." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Dadra and Nagar Haveli are surrounded by Gujarat and Maharashtra, and most of the people there belong to tribes. Daman and Diu became a separate union territory after Goa was given statehood in 1987.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Languages</td><td>Gujarati and Hindi</td></tr><tr><td>Dadra and Nagar Haveli</td><td>Under Portuguese control before 2 August 1954</td></tr><tr><td>Position</td><td>Surrounded by Gujarat and Maharashtra</td></tr><tr><td>People</td><td>Mostly tribal and rural</td></tr><tr><td>Main crop</td><td>Paddy</td></tr><tr><td>Daman and Diu</td><td>Came under the Government of India in 1961</td></tr><tr><td>After Goa statehood</td><td>Became a separate union territory on 30 May 1987</td></tr><tr><td>Airports</td><td>Both Daman and Diu have airports</td></tr><tr><td>Merger</td><td>The two union territories were joined as one in 2020, with Daman as capital</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/163.png" alt="Diu Fort Daman and Diu photo" data-caption="The old stone fort of Diu on the coast." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Daman and Diu came under Indian rule in <b>1961</b>, but Dadra and Nagar Haveli were free in <b>1954</b>.</div>
      <div class="cp-note exam">Daman and Diu became a separate union territory after Goa became a state on 30 May 1987.</div>
    `
  },
  121: {
    questext: "Before 2 August 1954, Dadra and Nagar Haveli were under whose control?",
    options: ["French", "Portuguese", "British", "Dutch"],
    correct: "2",
    exptext: "✅ They were under Portuguese control. 📌 Goa, Daman and Diu and Dadra were all Portuguese. ❌ French is wrong because France held Puducherry."
  },
  122: {
    questext: "Dadra and Nagar Haveli are surrounded by which two states?",
    options: ["Goa and Karnataka", "Gujarat and Rajasthan", "Maharashtra and Madhya Pradesh", "Gujarat and Maharashtra"],
    correct: "4",
    exptext: "✅ They are surrounded by Gujarat and Maharashtra. 📌 Both are west coast states. ❌ Gujarat and Rajasthan is wrong because Rajasthan is far to the north."
  },
  123: {
    questext: "Consider the following statements:\n1. Daman and Diu came under the rule of the Government of India in 1961.\n2. Daman and Diu was made a separate union territory after Goa became a state.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 First freedom in 1961, then separation after Goa became a state in 1987. ❌ Only 1 is wrong because statement 2 is also true."
  },
  124: {
    type: "concept", icon: "🥥", accent: "#16a34a", pauseTimer: true,
    title: "Lakshadweep",
    html: `
      <p class="cp-lead">Lakshadweep has <b>Kavaratti</b> as its capital. Its main languages are Jeseri, Mahl and Malayalam. It is a group of <u>coral islands</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/164.png" alt="Lakshadweep highlighted on India map with neighbouring states" data-caption="Lakshadweep marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/165.png" alt="Lakshadweep political map capital districts" data-caption="A political map of Lakshadweep, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/166.png" alt="A simple island group map as dots: Agatti, Bangaram, Kalpeni, Kadmat, Kavaratti, Minicoy i" data-caption="Some of the main tourist islands of Lakshadweep drawn as simple dots." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In 1973 the Laccadive, Minicoy and Amindivi groups were given the name Lakshadweep. The main crop is coconut.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Kavaratti</td></tr><tr><td>Main languages</td><td>Jeseri, Mahl and Malayalam</td></tr><tr><td>Name given</td><td>1973, for Laccadive, Minicoy and Amindivi</td></tr><tr><td>Type of islands</td><td>Coral islands</td></tr><tr><td>Main crop</td><td>Coconut</td></tr><tr><td>High Court</td><td>Kerala High Court</td></tr><tr><td>Tourist places</td><td>Agati, Bangaram, Kalpeni, Kadmat, Kavaratti, Minicoy</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/167.png" alt="Lakshadweep Agatti island lagoon coral photo" data-caption="The blue lagoon around Agatti island in Lakshadweep." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/168.png" alt="Lakshadweep islands map Kavaratti Minicoy Agatti" data-caption="The main islands of Lakshadweep marked on a map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Lakshadweep is a group of <b>coral</b> islands, not of volcanic islands.</div>
      <div class="cp-note exam">The name Lakshadweep was given in 1973.</div>
    `
  },
  125: {
    questext: "In which year were the Laccadive, Minicoy and Amindivi groups named Lakshadweep?",
    options: ["1956", "1973", "1961", "1987"],
    correct: "2",
    exptext: "✅ They were named Lakshadweep in 1973. 📌 Name given in 1973. ❌ 1956 is wrong because it is the year Delhi became a union territory."
  },
  126: {
    questext: "The islands of Lakshadweep are made of which of the following?",
    options: ["Coral", "Volcanic rock", "Granite", "Sand dunes"],
    correct: "1",
    exptext: "✅ They are coral islands. 📌 Coral islands rise in warm seas. ❌ Volcanic rock is wrong because Barren Island is the only volcano."
  },
  127: {
    type: "concept", icon: "🏙️", accent: "#b45309", pauseTimer: true,
    title: "Delhi",
    html: `
      <p class="cp-lead">Delhi has <b>New Delhi</b> as its capital, and its main languages are Hindi, Punjabi, Urdu and English. In <u>1911</u>, Delhi became the capital in place of Kolkata.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/169.png" alt="Delhi highlighted on India map with neighbouring states" data-caption="Delhi marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/170.png" alt="Delhi political map capital districts" data-caption="A political map of Delhi, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/171.png" alt="A timeline of three boxes: 1911 Delhi becomes the capital in place of Kolkata, 1956 union " data-caption="The key years in the political history of Delhi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Delhi was given the status of a union territory in 1956. A Legislative Assembly was formed after the National Capital Territory Act of 1991, which came from the 69th Constitutional Amendment.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>New Delhi</td></tr><tr><td>Languages</td><td>Hindi, Punjabi, Urdu and English</td></tr><tr><td>Capital shift</td><td>1911, from Kolkata</td></tr><tr><td>Union territory</td><td>1956</td></tr><tr><td>Legislative Assembly</td><td>After the National Capital Territory Act, 1991 (69th Amendment)</td></tr><tr><td>Tourist places</td><td>Red Fort, Jama Masjid, Qutub Minar, India Gate, Akshardham Temple, Lakshminarayan Temple, Humayun's Tomb, Lotus Temple</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/172.png" alt="Red Fort Delhi photo" data-caption="The Red Fort of Delhi, built of red sandstone." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/173.png" alt="Lotus Temple Delhi photo" data-caption="The Lotus Temple in Delhi, shaped like a lotus flower." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Legislative Assembly of Delhi came after the <b>69th Constitutional Amendment</b> and the 1991 Act, not in 1956.</div>
      <div class="cp-note exam">Delhi replaced Kolkata as the capital in 1911.</div>
    `
  },
  128: {
    questext: "In which year did Delhi become the capital in place of Kolkata?",
    options: ["1905", "1931", "1911", "1947"],
    correct: "3",
    exptext: "✅ Delhi became the capital in 1911. 📌 Nineteen eleven, a double one. ❌ 1931 is wrong because that is the year New Delhi was inaugurated."
  },
  129: {
    questext: "The Legislative Assembly of Delhi was formed after which Constitutional Amendment?",
    options: ["42nd", "73rd", "44th", "69th"],
    correct: "4",
    exptext: "✅ It was formed after the 69th Amendment. 📌 Sixty-nine and Delhi go with the 1991 Act. ❌ 73rd is wrong because it deals with Panchayati Raj."
  },
  130: {
    questext: "Consider the following statements about Delhi:\n1. Delhi was given the status of a union territory in 1956.\n2. The Legislative Assembly was formed in Delhi in 1911.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 1911 was the year of the capital shift. ❌ Statement 2 is wrong because the Assembly was formed after the 1991 Act."
  },
  131: {
    type: "concept", icon: "🇫🇷", accent: "#be185d", pauseTimer: true,
    title: "Puducherry",
    html: `
      <p class="cp-lead">Puducherry is a union territory with the same name for its capital, <b>Puducherry</b>. Its main languages are Tamil, Telugu, Malayalam, French and English.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/174.png" alt="Puducherry highlighted on India map with neighbouring states" data-caption="Puducherry marked on the map of India, with the states and seas around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/175.png" alt="Puducherry political map capital districts" data-caption="A political map of Puducherry, showing its boundary, neighbours and main towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/176.png" alt="Puducherry French Quarter street photo" data-caption="A quiet street of the French Quarter in Puducherry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The area was ruled by France for 138 years and merged with India on 1 November 1954.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Capital</td><td>Puducherry</td></tr><tr><td>Languages</td><td>Tamil, Telugu, Malayalam, French and English</td></tr><tr><td>Ruled by</td><td>France for 138 years</td></tr><tr><td>Merger</td><td>1 November 1954</td></tr><tr><td>Main crop</td><td>Paddy</td></tr><tr><td>Architecture</td><td>Meeting of French and Tamil styles</td></tr><tr><td>Special place</td><td>Aurobindo Ashram</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/State_and_Union_Territory_of_India/177.png" alt="Sri Aurobindo Ashram Puducherry photo" data-caption="The Sri Aurobindo Ashram in Puducherry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Puducherry was a <b>French</b> area, but Goa, Daman and Diu were <b>Portuguese</b>.</div>
      <div class="cp-note exam">Puducherry merged with India on 1 November 1954, and the Aurobindo Ashram is there.</div>
    `
  },
  132: {
    questext: "Puducherry was ruled by which European country?",
    options: ["Portugal", "Britain", "France", "Netherlands"],
    correct: "3",
    exptext: "✅ France ruled it for 138 years. 📌 French language, French Quarter. ❌ Portugal is wrong because it ruled Goa."
  },
  133: {
    questext: "Puducherry merged with India on which date?",
    options: ["1 November 1954", "19 December 1961", "2 August 1954", "30 May 1987"],
    correct: "1",
    exptext: "✅ It merged on 1 November 1954. 📌 Same date as Chandigarh's union territory day, but a different year. ❌ 19 December 1961 is wrong because it is the date of Goa's freedom."
  },
  134: {
    questext: "The Aurobindo Ashram is located in which union territory?",
    options: ["Delhi", "Puducherry", "Chandigarh", "Lakshadweep"],
    correct: "2",
    exptext: "✅ It is in Puducherry. 📌 Aurobindo and Puducherry both go with spirituality. ❌ Delhi is wrong because its famous temples are Akshardham and Lotus."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an elegant outline map of India with small gold pins, a compass and a few simple landmark silhouettes" },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Arunachal Pradesh highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/1.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Arunachal Pradesh political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/2.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Namdapha National Park Arunachal Pradesh forest photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/3.png. thick forest inside the national park",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/4.png": { t: "fig", about: "Five rounded boxes in a row with the heading Major rivers: Kameng, Subansiri, Siang (Brahmaputra), Lohit, Tirap." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Arunachal Pradesh rivers map Siang Lohit Kameng Subansiri\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/5.png. map marking the five major rivers",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Assam highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/6.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Assam political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/7.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kaziranga National Park one-horned rhinoceros photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/8.png. an Indian one-horned rhinoceros standing in grassland",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kamakhya Temple Guwahati Nilachal Hill photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/9.png. the main temple building on the hill",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/10.png": { t: "fig", about: "Two boxes side by side: left box Kaziranga with the word Rhinoceros, right box Manas with the words Royal Bengal Tiger." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Assam national parks map Kaziranga Manas\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/11.png. map marking Kaziranga and Manas",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bihar highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/12.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bihar political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/13.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nalanda ancient university ruins Bihar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/14.png. the red brick ruins of the ancient university",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahabodhi Temple Bodh Gaya photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/15.png. the tall temple with the pointed tower",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sher Shah Suri tomb Sasaram lake photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/16.png. the tomb standing in the middle of a lake",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bihar Buddhist circuit map Rajgir Nalanda Bodh Gaya Vaishali\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/17.png. map marking the places of Buddhism and Jainism",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chhattisgarh highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/18.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chhattisgarh political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/19.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/20.png": { t: "fig", about: "A simple timeline box: 1 November 2000, Madhya Pradesh splits, Chhattisgarh becomes the 26th state." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chitrakote Falls Indravati River Chhattisgarh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/21.png. the wide horseshoe shaped waterfall",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Korba coal mine Chhattisgarh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/22.png. a large open coal mine",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chhattisgarh mineral resources map coal tin iron ore\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/23.png. map marking coal and tin areas",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Goa highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/24.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Goa political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/25.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/26.png": { t: "fig", about: "A vertical timeline with three boxes: 19 December 1961 freed and joined with Daman and Diu as a union territory; 30 May 1987 full statehood; Daman and Diu made a separate union territory." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dudhsagar Falls Goa waterfall photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/27.png. the tall waterfall on a green hill",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mormugao Port Goa harbour photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/28.png. ships and cranes at the harbour",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Goa rivers map Mandovi Zuari Terekhol Chapora Sal\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/29.png. map marking the five rivers",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gujarat highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/30.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gujarat political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/31.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Asiatic lion Gir forest Gujarat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/32.png. a lion resting in the forest",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian wild ass Little Rann of Kutch photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/33.png. a wild ass standing on dry salt land",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Deendayal Port Kandla photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/34.png. a port with ships and cargo",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gujarat national parks wildlife sanctuaries map Gir Kutch\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/35.png. map marking Gir and the Kutch sanctuary",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Haryana highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/36.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Haryana political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/37.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/38.png": { t: "fig", about: "Three boxes joined by lines: Chandigarh in the centre, Punjab on one side and Haryana on the other, with the label Shared capital." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Panipat handloom carpets weaving photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/39.png. a weaver at a loom with a carpet",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Haryana Punjab Chandigarh location map Panipat\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/40.png. map marking Chandigarh and Panipat",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Himachal Pradesh highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/41.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Himachal Pradesh political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/42.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/43.png": { t: "fig", about: "Two boxes side by side: Summer capital Shimla and Winter capital Dharamshala, joined by a sun and a snowflake symbol." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manikaran hot spring Himachal Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/44.png. steam rising from a hot spring",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/45.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shimla Ridge Christ Church photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/45.png. a hill town with a church",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jammu and Kashmir highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/46.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/47.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jammu and Kashmir political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/47.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/48.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indira Gandhi Memorial Tulip Garden Srinagar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/48.png. rows of colourful tulips with mountains behind",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/49.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vaishno Devi Katra Jammu pilgrimage photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/49.png. pilgrims walking up the mountain path",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/50.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jammu Kashmir Ladakh map Srinagar Jammu Leh\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/50.png. map marking the two capitals and Ladakh",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/51.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jharkhand highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/51.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/52.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jharkhand political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/52.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/53.png": { t: "fig", about: "A timeline box: 15 November 2000, southern Bihar becomes Jharkhand, the 28th state." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/54.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jharia coalfield Jharkhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/54.png. an open coal mine and rail line",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/55.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Betla National Park Palamu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/55.png. an elephant in a forest",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/56.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jharkhand mineral and industries map Jharia Bokaro Ghatsila\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/56.png. map marking coal, steel, copper and uranium places",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/57.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Karnataka highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/57.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/58.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Karnataka political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/58.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/59.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Coffee plantation Coorg Karnataka photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/59.png. green coffee plants on a hill",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/60.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hampi Vijayanagara ruins Karnataka photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/60.png. a stone chariot temple",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/61.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gomateshwara statue Shravanabelagola photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/61.png. a tall stone statue on a hill",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/62.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Karnataka national parks map Bandipur Nagarhole Kudremukh\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/62.png. map marking the five national parks",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/63.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kerala highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/63.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/64.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kerala political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/64.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/65.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nehru Trophy Boat Race Punnamada Lake Alappuzha photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/65.png. long snake boats racing",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/66.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Onam Pookalam flower carpet Kerala photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/66.png. a round flower design on the ground",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/67.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kochi port Cochin harbour photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/67.png. ships at a busy harbour",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/68.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kerala rivers and backwaters map Alappuzha Kochi Ernakulam\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/68.png. map marking Alappuzha, Kochi and the backwaters",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/69.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Madhya Pradesh highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/69.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/70.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Madhya Pradesh political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/70.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/71.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Khajuraho temples Madhya Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/71.png. carved stone temples",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/72.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kanha National Park barasingha swamp deer photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/72.png. a swamp deer in grassland",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/73.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Madhya Pradesh national parks map Kanha Bandhavgarh\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/73.png. map marking Kanha and Bandhavgarh",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/74.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Maharashtra highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/74.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/75.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Maharashtra political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/75.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/76.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ajanta Caves Maharashtra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/76.png. cave rooms cut into a rock cliff",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/77.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ellora Kailasa Temple Maharashtra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/77.png. a temple carved from one rock",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/78.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Maharashtra caves map Ajanta Ellora Elephanta Kanheri Karle\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/78.png. map marking the cave sites",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/79.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manipur highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/79.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/80.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manipur political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/80.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/81.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sangai brow-antlered deer Keibul Lamjao National Park photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/81.png. a deer with curved antlers on floating grass",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/82.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dzukou Valley lily flowers photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/82.png. green valley with flowers",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/83.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manipur map Imphal Loktak Lake Keibul Lamjao\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/83.png. map marking Imphal and Keibul Lamjao",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/84.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Meghalaya highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/84.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/85.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Meghalaya political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/85.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/86.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shillong Peak Meghalaya view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/86.png. a green hilltop with clouds",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/87.png": { t: "fig", about: "Three boxes: Garo, Khasi and Jaintia, joined to a box named Meghalaya Abode of clouds." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/88.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Meghalaya hills map Garo Khasi Jaintia hills Shillong\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/88.png. map marking the three hill groups",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/89.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mizoram highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/89.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/90.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mizoram political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/90.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/91.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chapchar Kut festival Mizoram dance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/91.png. dancers in bright dress",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/92.png": { t: "fig", about: "Three festival boxes in a row: Chapchar Kut, Mimkut, Pawl Kut, under the title Festivals of Mizoram." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/93.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nagaland highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/93.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/94.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nagaland political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/94.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/95.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mount Saramati Nagaland peak photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/95.png. a high mountain peak with forest",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/96.png": { t: "fig", about: "Three steps in boxes: Cut the trees, Burn the trees, Sow seeds in the ash, titled Jhum farming." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/97.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Odisha highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/97.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/98.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Odisha political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/98.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/99.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Konark Sun Temple Odisha photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/99.png. a stone chariot shaped temple",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/100.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chilika Lake Odisha lagoon photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/100.png. a wide lake with boats",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/101.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hirakud Dam Mahanadi Odisha photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/101.png. a long dam with gates open",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/102.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Odisha tourist map Puri Konark Bhubaneswar Chilika Paradip\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/102.png. map marking temples, Chilika and Paradip",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/103.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Punjab highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/103.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/104.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Punjab political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/104.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/105.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Punjab wheat field harvest photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/105.png. golden wheat field and a tractor",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/106.png": { t: "fig", about: "Three boxes: Wheat, Rice, Cotton, all joined to a box Punjab." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/107.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rajasthan highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/107.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/108.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rajasthan political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/108.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/109.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ranthambore National Park tiger Rajasthan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/109.png. a tiger walking near a ruined fort",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/110.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pushkar camel fair Rajasthan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/110.png. camels and traders on a sandy field",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/111.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rajasthan national parks map Ranthambore Keoladeo Pushkar\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/111.png. map marking parks and fair towns",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/112.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sikkim highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/112.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/113.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sikkim political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/113.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/114.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kanchenjunga peak Sikkim view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/114.png. a snow peak at sunrise",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/115.png": { t: "fig", about: "Three badges: Third highest peak Kanchenjunga, Largest big cardamom producer, First completely organic state." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/116.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sikkim map Gangtok Kanchenjunga location\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/116.png. map marking Gangtok and Kanchenjunga",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/117.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tamil Nadu highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/117.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/118.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tamil Nadu political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/118.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/119.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pongal festival Tamil Nadu kolam pot photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/119.png. a pot of boiling rice with a sugarcane",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/120.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kudankulam Nuclear Power Plant photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/120.png. a large plant with domes near the sea",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/121.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Alanganallur Jallikattu bull photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/121.png. a bull and young men in a crowd",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/122.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tamil Nadu map ports Chennai Tuticorin Kudankulam Ooty\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/122.png. map marking ports, the nuclear plant and hill stations",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/123.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tripura highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/123.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/124.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tripura political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/124.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/125.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Unakoti rock carvings Tripura photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/125.png. huge rock carvings in a forest",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/126.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Neermahal palace Rudrasagar Lake Tripura photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/126.png. a white palace in the middle of a lake",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/127.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Andhra Pradesh highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/127.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/128.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Andhra Pradesh political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/128.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/129.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tirumala Venkateswara Temple Tirupati photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/129.png. the golden temple tower on a hill",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/130.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Visakhapatnam port harbour photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/130.png. ships and cranes at a port",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/131.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Telangana highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/131.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/132.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Telangana political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/132.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/133.png": { t: "fig", about: "A timeline: July 2013 separation announced, June 2014 Telangana formed as the 29th state." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/134.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bathukamma flower festival Telangana photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/134.png. women placing flower stacks",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/135.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Uttar Pradesh highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/135.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/136.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Uttar Pradesh political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/136.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/137.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sarnath Dhamek Stupa Uttar Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/137.png. a round brick stupa",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/138.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bara Imambara Lucknow photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/138.png. a large arched hall building",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/139.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Taj Mahal Agra sunrise photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/139.png. a white marble tomb",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/140.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Uttar Pradesh Buddhist sites map Sarnath Kushinagar Prayagraj Agra\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/140.png. map marking Sarnath, Kushinagar, Prayagraj and Agra",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/141.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Uttarakhand highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/141.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/142.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Uttarakhand political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/142.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/143.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kedarnath Temple Uttarakhand Himalaya photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/143.png. a stone temple in snowy mountains",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/144.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Valley of Flowers National Park Uttarakhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/144.png. a valley full of coloured flowers",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/145.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Uttarakhand Char Dham map Gangotri Yamunotri Kedarnath Badrinath\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/145.png. map marking the four holy sites",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/146.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"West Bengal highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/146.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/147.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"West Bengal political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/147.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/148.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Victoria Memorial Kolkata photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/148.png. a large white marble building with a garden",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/149.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Howrah Bridge Kolkata photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/149.png. a steel bridge over a river",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/150.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Andaman and Nicobar Islands highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/150.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/151.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Andaman and Nicobar Islands political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/151.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/152.png": { t: "fig", about: "A vertical line at 10 degrees north latitude, Andaman Islands above and Nicobar Islands below, labelled Ten Degree Channel." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/153.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cellular Jail Port Blair photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/153.png. a red brick jail with long wings",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/154.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Havelock Island Radhanagar Beach photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/154.png. white sand and clear blue sea",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/155.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Andaman Nicobar Islands map Ten Degree Channel Port Blair\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/155.png. map showing the Ten Degree Channel and Port Blair",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/156.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chandigarh highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/156.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/157.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chandigarh political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/157.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/158.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rock Garden Chandigarh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/158.png. sculptures made of waste pieces",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/159.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Capitol Complex Chandigarh Le Corbusier photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/159.png. large concrete government buildings",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/160.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dadra and Nagar Haveli and Daman and Diu highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/160.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/161.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dadra and Nagar Haveli and Daman and Diu political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/161.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/162.png": { t: "fig", about: "Two timeline boxes: Dadra and Nagar Haveli free on 2 August 1954; Daman and Diu come under Indian rule in 1961." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/163.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Diu Fort Daman and Diu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/163.png. an old stone fort by the sea",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/164.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lakshadweep highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/164.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/165.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lakshadweep political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/165.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/166.png": { t: "fig", about: "A simple island group map as dots: Agatti, Bangaram, Kalpeni, Kadmat, Kavaratti, Minicoy in the sea." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/167.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lakshadweep Agatti island lagoon coral photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/167.png. a blue lagoon and a white beach",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/168.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lakshadweep islands map Kavaratti Minicoy Agatti\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/168.png. map marking the main islands",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/169.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Delhi highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/169.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/170.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Delhi political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/170.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/171.png": { t: "fig", about: "A timeline of three boxes: 1911 Delhi becomes the capital in place of Kolkata, 1956 union territory, 1991 Legislative Assembly after the National Capital Territory Act." },
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/172.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Red Fort Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/172.png. a red sandstone fort wall",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/173.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lotus Temple Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/173.png. a white temple shaped like a lotus",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/174.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Puducherry highlighted on India map with neighbouring states\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/174.png. India map with only this state coloured, neighbouring states and seas visible",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/175.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Puducherry political map capital districts\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/175.png. clear map with the state boundary, capital and main towns in English labels",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/176.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Puducherry French Quarter street photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/176.png. yellow colonial houses on a quiet street",
  "images/General_Awareness/Geography/State_and_Union_Territory_of_India/177.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sri Aurobindo Ashram Puducherry photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/State_and_Union_Territory_of_India/177.png. a calm building with a courtyard"
});

/* CHANGE LOG
   - Arunachal Pradesh: the national park name is written as Mouling (not Malling).
   - Chhattisgarh: the line saying it ranks first in coal production is written as one of the leading coal producing states, with the third largest coal reserves after Jharkhand and Odisha. 'Pig iron' is written as iron ore, because pig iron is a product and not a mineral.
   - Goa: the capital is spelled Panaji (not Panji).
   - Gujarat: the sanctuary for wild asses is placed in the Little Rann of Kutch; Kandla Port is now called Deendayal Port.
   - Haryana: the farming line is written as most people depend on agriculture, because the exact share changes with each census.
   - Himachal Pradesh: Kasol is a village near the hot springs and not a hot spring itself, so the hot water sources listed are Vashisht, Manikaran, Tattapani and Kheer Ganga.
   - Andhra Pradesh: the capital is written as Amaravati (not Visakhapatnam, which is the major port).
   - Madhya Pradesh: Kanha National Park is written as the home of the barasingha (swamp deer), not reindeer.
   - Manipur: the rare lily is the Dzukou Lily of Dzukou Valley, the district is spelled Bishnupur, and the Sangai is the brow-antlered deer.
   - Mizoram: the nickname given for music and dance is left out because it is not an established name.
   - Odisha: Hirakud is written as one of the longest dams of India, and the Ashoka inscriptions are placed at Dhauli.
   - Tripura: the tourist place is spelled Unakoti.
   - West Bengal: only the Teesta Barrage Project is kept as the state's project, and the unclear tourist name was left out.
   - Jharkhand: Vaidyanath Temple is at Deoghar.
   - Andaman and Nicobar Islands: the Nicobar tribe is Shompen (not Champagne).
   - Dadra and Nagar Haveli and Daman and Diu: the two union territories were merged into one in 2020, with Daman as the capital.
   - Lakshadweep: the claim that its coconuts have more oil than any other coconut in the world is left out.
*/