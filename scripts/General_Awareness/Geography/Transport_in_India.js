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

/* Field: General_Awareness · Subject: Geography · Chapter: Transport_in_India · 21 concept pages (+ overview) · 65 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🛣️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Transport in India",
    thumb: {
      image: "images/General_Awareness/Geography/Transport_in_India/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "TRANSPORT",
      line2: "IN INDIA",
      line3: "ROADS • RAIL • PORTS",
      badge: "FULL CLASS",
      ribbon: "GEOGRAPHY • FACTS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Transport in India | Roads, Railways, Ports, Pipelines | Geography for all exams",
      altTitles: ["Transport in India in One Class: Highways, Railways and Ports", "Indian Geography Transport Chapter: All Important Facts and Questions"],
      description: "Transport in India is one of the most scoring chapters in Indian Geography. In this full class we cover roads, national highways, the Border Roads Organisation, Bharatmala, railways, dedicated freight corridors, railway zones, metro, the bullet train, pipelines, waterways and major ports.\n\n📌 IN THIS CLASS\n✅ Road transport and national highways\n✅ Rail transport and railway zones\n✅ Pipelines, waterways and ports\n✅ Practice questions with simple explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Geography #TransportInIndia",
      tags: ["transport in india", "indian geography", "geography for all exams", "national highways in india", "indian railways zones", "major ports of india", "Bharatmala project", "Sagarmala project", "dedicated freight corridor", "national waterways", "pipelines in india", "SSC CGL geography", "static GK", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "important questions", "concept class", "one shot", "Transport in India Geography T", "Transpor"],
      hashtags: ["SSCCGL", "Geography", "TransportInIndia"],
      thumbText: "TRANSPORT IN INDIA",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🛣️ New class is live: Transport in India — roads, rail, ports and pipelines. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Indian Geography — Full Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on Transport in India</u>: roads, railways, pipelines, waterways and ports. Every year, competitive exams ask several fact-based questions from this chapter, so we will learn the names, numbers and places clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>21</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>65</b><span>Questions</span></div>
        <div class="cp-stat"><b>~107 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Classification of Means of Transport</b><br>How transport is divided into land, water and air, and where roads, railways, inland waterways and sea transport fit.</li>
        <li><b>Road Transport</b><br>The size of India's road network, national highways, the Border Roads Organisation, the National Highways Development Project, Bharatmala, Setu Bharatam, state highways, rural roads and road density.</li>
        <li><b>Rail Transport</b><br>The history of Indian Railways, dedicated freight corridors, railway zones, mountain and tourist trains, metro rail and the bullet train.</li>
        <li><b>Pipeline Transport</b><br>Which pipelines carry crude oil, petroleum products and gas, and which places they join.</li>
        <li><b>Water Transport</b><br>National waterways, major ports, the Sagarmala Project and the Kaladan project.</li>
        <li><b>Other Related Facts</b><br>A quick list of India's longest, highest and fastest transport records.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> this chapter is full of one-line facts such as a place, a year or a length, and exams love to test them. It also links with Current Affairs, because new highways, trains and ports are announced every year.</div>
    `
  },
  2: {
    type: "concept", icon: "🚦", accent: "#22c55e", pauseTimer: true,
    title: "Classification of Means of Transport",
    html: `
      <p class="cp-lead">Transport means moving people and goods from one place to another. In India it is divided into <b>three main kinds</b>: land transport, water transport and air transport.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/1.png" alt="Tree diagram: top oval Transport; three branches Land Transport, Water Transport, Air Tran" data-caption="A tree showing transport divided into land, water and air, with road, rail, inland and maritime below." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Main kind</th><th>Types inside it</th></tr></thead><tbody><tr><td>Land transport</td><td>Road and rail</td></tr><tr><td>Water transport</td><td>Inland waterways and maritime (sea) transport</td></tr><tr><td>Air transport</td><td>Aeroplanes and helicopters</td></tr></tbody></table>
      <p class="cp-lead">Land transport has two types: roads and railways. Water transport also has two types: inland water transport uses rivers and canals, while maritime transport uses the sea and the ocean.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/2.png" alt="Mumbai Pune Expressway aerial view photo" data-caption="A wide expressway full of vehicles, an example of road transport in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Think of the tree from top to bottom. First the three big branches, then two small branches under land and under water.</div>
      <div class="cp-mnemonic">Land, Water, Air: three big branches, two small ones under land and two under water.</div>
    `
  },
  3: {
    questext: "Water transport in India is divided into which two main classes?",
    options: ["River and air", "Road and rail", "Coastal and aerial", "Inland and maritime"],
    correct: "4",
    exptext: "✅ Water transport is divided into inland waterways (rivers and canals) and maritime transport (sea routes). 📌 Inland means inside the country, maritime means the sea. ❌ Road and rail belong to land transport."
  },
  4: {
    questext: "Which of the following is NOT a type of land transport?",
    options: ["Road transport", "Rail transport", "Metro rail", "Inland waterways"],
    correct: "4",
    exptext: "✅ Inland waterways use rivers and canals, so they belong to water transport. 📌 Land transport moves on the ground: roads and rails. ❌ Metro rail runs on rails, so it is land transport."
  },
  5: {
    type: "concept", icon: "🛣️", accent: "#f59e0b", pauseTimer: true,
    title: "Road Transport",
    html: `
      <p class="cp-lead">Road transport is an important base for economic growth because roads reach almost every town and village, and goods can be carried from door to door.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/3.png" alt="Indian national highway traffic trucks aerial photo" data-caption="Trucks and cars on a busy national highway in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Type of road</th><th>Simple meaning</th></tr></thead><tbody><tr><td>National highways</td><td>Join states, big cities and ports</td></tr><tr><td>State highways</td><td>Join towns and cities inside one state</td></tr><tr><td>Other roads</td><td>District roads, rural roads and village roads</td></tr></tbody></table>
      <p class="cp-lead">India has a road network of about 54.72 lakh kilometres, which is the <b>second largest road network in the world</b>. Only the United States has a longer network.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/4.png" alt="Three-level ladder: top step National Highways, middle step State Highways, bottom step Di" data-caption="A ladder of roads: village roads join state highways, which join national highways." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Road transport carries about two thirds of the freight and most of the passenger traffic of the country. Exams ask about the rank of the road network (second largest).</div>
    `
  },
  6: {
    questext: "India has the ___ largest road network in the world.",
    options: ["first", "second", "third", "fourth"],
    correct: "2",
    exptext: "✅ India's road network of about 54.72 lakh kilometres is the second largest in the world. 📌 Only the United States is ahead. ❌ First is wrong because India does not have the longest network."
  },
  7: {
    questext: "Consider the following statements about road transport in India:\n1. India has the second largest road network in the world.\n2. Road transport carries a smaller share of freight than railways.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Roads carry about two thirds of freight, more than railways. ❌ Statement 2 is wrong because roads, not railways, carry the larger share of goods."
  },
  8: {
    type: "concept", icon: "🏁", accent: "#ef4444", pauseTimer: true,
    title: "National Highway",
    html: `
      <p class="cp-lead">National highways are the main roads of the country. They are only about <b>2 percent</b> of the total road length, but they carry about <b>40 percent</b> of all road traffic.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/5.png" alt="Two vertical bars side by side: first bar short labelled 2 percent of road length, second " data-caption="Two bars: national highways are about 2 percent of road length but carry about 40 percent of traffic." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The state with the <b>longest length of national highways is Uttar Pradesh</b>, followed by Rajasthan, Madhya Pradesh, Maharashtra and Karnataka.</p>
      <table><thead><tr><th>National Highway number</th><th>Route</th></tr></thead><tbody><tr><td>NH-1</td><td>New Delhi to Attari (Indo-Pak border)</td></tr><tr><td>NH-1A</td><td>Jalandhar to Uri</td></tr><tr><td>NH-2</td><td>New Delhi to Kolkata</td></tr><tr><td>NH-3</td><td>Agra to Mumbai</td></tr><tr><td>NH-4</td><td>Thane (Mumbai) to Chennai</td></tr><tr><td>NH-5</td><td>Chennai to Jharpokharia</td></tr><tr><td>NH-6</td><td>Hazira to Kolkata</td></tr><tr><td>NH-8</td><td>New Delhi to Mumbai</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/6.png" alt="National Highway 44 Srinagar Kanyakumari road photo" data-caption="A stretch of National Highway 44, the longest national highway in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>National Highway 44</b> from Srinagar to Kanyakumari is the longest national highway, and <b>National Highway 47A</b> on Willingdon Island, Kerala, is the shortest.</p>
      <div class="cp-note trap">Many students mix up the numbers because routes are renumbered. Learn each route as a pair of cities, and remember the longest and the shortest.</div>
    `
  },
  9: {
    questext: "Which state has the longest length of national highways in India?",
    options: ["Rajasthan", "Uttar Pradesh", "Maharashtra", "Madhya Pradesh"],
    correct: "2",
    exptext: "✅ Uttar Pradesh has the longest national highway length, followed by Rajasthan and Madhya Pradesh. 📌 Remember the order: Uttar Pradesh, Rajasthan, Madhya Pradesh, Maharashtra, Karnataka. ❌ Rajasthan is second, not first."
  },
  10: {
    questext: "National Highway 44, the longest national highway of India, connects which two places?",
    options: ["Delhi and Mumbai", "Delhi and Kolkata", "Chennai and Jharpokharia", "Srinagar and Kanyakumari"],
    correct: "4",
    exptext: "✅ National Highway 44 runs from Srinagar in the north to Kanyakumari in the south. 📌 It joins the top and the bottom of India. ❌ Delhi to Kolkata was National Highway 2."
  },
  11: {
    questext: "Where is National Highway 47A, the smallest national highway of India, located?",
    options: ["Attari", "Willingdon Island (Kerala)", "Uri", "Hazira"],
    correct: "2",
    exptext: "✅ National Highway 47A is on Willingdon Island in Kochi, Kerala, and it is the shortest national highway. 📌 Shortest road, small island. ❌ Attari and Uri are ends of other highways."
  },
  12: {
    questext: "Consider the following statements about national highways:\n1. National highways are about 2 percent of the total road length of India.\n2. National highways carry about 40 percent of the total road traffic.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Remember 2 and 40: a small share of length carries a very large share of traffic. ❌ Choosing only one statement forgets that both numbers are correct."
  },
  13: {
    questext: "National Highway 2 joins which two places?",
    options: ["New Delhi and Mumbai", "Agra and Mumbai", "Hazira and Kolkata", "New Delhi and Kolkata"],
    correct: "4",
    exptext: "✅ National Highway 2 runs from New Delhi to Kolkata. 📌 It follows the old Grand Trunk Road. ❌ Agra to Mumbai was National Highway 3, and Hazira to Kolkata was National Highway 6."
  },
  14: {
    type: "concept", icon: "🪖", accent: "#8b5cf6", pauseTimer: true,
    title: "Border Roads Organisation",
    html: `
      <p class="cp-lead">The Border Roads Organisation builds and maintains roads in border areas and hill regions, so that the army and the local people can travel easily. It was set up in <b>1960</b> by the first Prime Minister, Pandit Jawaharlal Nehru.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/7.png" alt="Border Roads Organisation road Ladakh mountain pass photo" data-caption="A mountain road in Ladakh built and kept open by the Border Roads Organisation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Project</th><th>Where it works</th></tr></thead><tbody><tr><td>Project Beacon</td><td>Jammu and Kashmir (Sonamarg to Kargil to Leh, and Leh to Upshi to Sarchu road)</td></tr><tr><td>Project Dantak</td><td>Bhutan</td></tr><tr><td>Project Hirak</td><td>Road building in Naxal-affected areas</td></tr></tbody></table>
      <p class="cp-lead">Project Beacon is called the <b>lifeline of Jammu and Kashmir</b>, because it keeps the roads to Ladakh open. Project Dantak builds roads in the neighbouring country of Bhutan.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/8.png" alt="Three signboards in a row: Project Beacon with text Jammu and Kashmir; Project Dantak with" data-caption="Three project signboards: Beacon in Jammu and Kashmir, Dantak in Bhutan, Hirak in Naxal-affected areas." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trick">Beacon is a light that guides, like a lamp on the Kashmir road. Dantak sounds like a Bhutanese name, so it belongs to Bhutan.</div>
    `
  },
  15: {
    questext: "Project Dantak of the Border Roads Organisation is related to road building in which country?",
    options: ["Nepal", "Myanmar", "Sri Lanka", "Bhutan"],
    correct: "4",
    exptext: "✅ Project Dantak builds roads and bridges in Bhutan. 📌 Dantak is the Bhutan project. ❌ Nepal and Myanmar are neighbours, but the project is not there."
  },
  16: {
    questext: "Which project of the Border Roads Organisation is called the lifeline of Jammu and Kashmir?",
    options: ["Project Hirak", "Project Dantak", "Project Vartak", "Project Beacon"],
    correct: "4",
    exptext: "✅ Project Beacon develops the Sonamarg-Kargil-Leh road and the Leh-Upshi-Sarchu road, and is called the lifeline of Jammu and Kashmir. 📌 A beacon guides travellers. ❌ Dantak is in Bhutan."
  },
  17: {
    questext: "In which year was the Border Roads Organisation established?",
    options: ["1950", "1960", "1971", "1984"],
    correct: "2",
    exptext: "✅ The Border Roads Organisation was established in 1960 under Prime Minister Jawaharlal Nehru. 📌 It began soon after the 1950s border worries. ❌ 1971 is the year of the Bangladesh war."
  },
  18: {
    type: "concept", icon: "🛤️", accent: "#14b8a6", pauseTimer: true,
    title: "National Highways Development Project",
    html: `
      <p class="cp-lead">The National Highways Development Project (NHDP) was started to speed up economic growth through better roads. It was carried out by the <b>National Highways Authority of India</b>, which was created by an Act in <b>1988</b>, and it has <b>seven phases</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/9.png" alt="Seven small boxes in a row numbered Phase 1 to Phase 7, with Phase 1 highlighted as Golden" data-caption="Seven phases of the project: Phase 1 is the Golden Quadrilateral and Phase 2 is the two corridors." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Phase</th><th>Main work</th></tr></thead><tbody><tr><td>Phase 1</td><td>Golden Quadrilateral joining Delhi, Mumbai, Chennai and Kolkata with 4 to 6 lane roads</td></tr><tr><td>Phase 2</td><td>North-South corridor and East-West corridor</td></tr></tbody></table>
      <p class="cp-lead">The <b>Golden Quadrilateral</b> joins the four big metropolitan cities: Delhi, Mumbai, Chennai and Kolkata. A quadrilateral is a shape with four sides, like a rectangle.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/10.png" alt="Schematic, not a map: a four-sided shape with corners labelled Delhi, Kolkata, Chennai and" data-caption="A four-sided shape joining Delhi, Kolkata, Chennai and Mumbai, called the Golden Quadrilateral." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/11.png" alt="Golden Quadrilateral highway India photo" data-caption="A multi-lane section of the Golden Quadrilateral highway in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The North-South corridor and the East-West corridor belong to the second phase, not to the first. The first phase is only the Golden Quadrilateral.</div>
    `
  },
  19: {
    questext: "The Golden Quadrilateral project connects which four metropolitan cities?",
    options: ["Mumbai, Chennai, Jaipur and Kolkata", "Delhi, Mumbai, Bengaluru and Hyderabad", "Delhi, Chennai, Pune and Kolkata", "Delhi, Mumbai, Chennai and Kolkata"],
    correct: "4",
    exptext: "✅ The Golden Quadrilateral joins Delhi, Mumbai, Chennai and Kolkata. 📌 The four old metros make four corners. ❌ Bengaluru, Hyderabad and Pune are not corners of this shape."
  },
  20: {
    questext: "The National Highways Development Project has how many phases?",
    options: ["Three", "Five", "Six", "Seven"],
    correct: "4",
    exptext: "✅ The project has a total of seven phases. 📌 Phase 1 is the Golden Quadrilateral, phase 2 the two corridors. ❌ Five and six are close numbers but wrong."
  },
  21: {
    questext: "Consider the following statements about the National Highways Development Project:\n1. The Golden Quadrilateral was launched in the first phase.\n2. The North-South and East-West corridors were launched in the second phase.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Phase 1 is the Golden Quadrilateral and phase 2 is the two corridors. ❌ Choosing only one statement misses the second phase."
  },
  22: {
    type: "concept", icon: "🌉", accent: "#ec4899", pauseTimer: true,
    title: "Bharatmala Project and Setu Bharatam Project",
    html: `
      <p class="cp-lead"><b>Bharatmala</b> is a large umbrella programme of the Ministry of Road Transport and Highways. An umbrella programme brings many road projects under one plan.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/12.png" alt="A big umbrella labelled Bharatmala, with raindrop-like small boxes under it labelled Many " data-caption="An umbrella showing that Bharatmala brings many road projects under one plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Setu Bharatam</b> was launched by Prime Minister Narendra Modi in New Delhi on <b>4 March 2016</b>. Its aim is to stop accidents and loss of life at railway crossings, by making national highways free of railway level crossings, with a target of 2019.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/13.png" alt="road over bridge railway level crossing India photo" data-caption="A road over-bridge built above a railway line so that vehicles do not cross the track." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Scheme</th><th>Main idea</th></tr></thead><tbody><tr><td>Bharatmala</td><td>Umbrella programme for roads under the Ministry of Road Transport and Highways</td></tr><tr><td>Setu Bharatam</td><td>Make national highways free of railway crossings (setu means bridge)</td></tr></tbody></table>
      <div class="cp-note exam">Setu means bridge. So Setu Bharatam is about bridges and railway crossings, and Bharatmala is about the garland of roads.</div>
    `
  },
  23: {
    questext: "The Setu Bharatam Project was launched mainly to ___.",
    options: ["connect all villages by road", "join all major ports", "build roads in Bhutan", "make national highways free of railway crossings"],
    correct: "4",
    exptext: "✅ Setu Bharatam aims to make national highways free of railway crossings and stop accidents. 📌 Setu means bridge. ❌ Connecting villages is the work of the Pradhan Mantri Gram Sadak Yojana."
  },
  24: {
    questext: "Bharatmala is an umbrella scheme under which ministry?",
    options: ["Ministry of Shipping", "Ministry of Railways", "Ministry of Defence", "Ministry of Road Transport and Highways"],
    correct: "4",
    exptext: "✅ Bharatmala is an umbrella scheme under the Ministry of Road Transport and Highways. 📌 Bharatmala means a garland of roads. ❌ The Ministry of Shipping runs the Sagarmala Project."
  },
  25: {
    type: "concept", icon: "🏙️", accent: "#3b82f6", pauseTimer: true,
    title: "State Highway",
    html: `
      <p class="cp-lead">State highways join the important towns and cities inside one state. They also link with the national highways, so that goods and people can move across the state.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/14.png" alt="Schematic, not a map: a state outline with four towns joined by thick lines labelled State" data-caption="Towns inside a state joined by state highways, with one national highway leading out of the state." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>state government</b> is responsible for building and maintaining state highways. Among all states, <b>Maharashtra</b> has the highest length of state highways.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/15.png" alt="state highway road signboard India photo" data-caption="A state highway signboard on an Indian road." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">National highways are looked after by the central government, but state highways are looked after by the state government. Exams often swap these two.</div>
    `
  },
  26: {
    questext: "Who is responsible for the maintenance and upkeep of state highways?",
    options: ["Central government", "State government", "Border Roads Organisation", "Railway Board"],
    correct: "2",
    exptext: "✅ State highways are maintained by the state government. 📌 State road, state responsibility. ❌ The central government looks after national highways."
  },
  27: {
    questext: "Which state has the highest length of state highways in India?",
    options: ["Maharashtra", "Kerala", "Punjab", "Assam"],
    correct: "1",
    exptext: "✅ Maharashtra has the highest length of state highways. 📌 Big state, many towns, many roads. ❌ Kerala has a very high road density but a smaller total length."
  },
  28: {
    type: "concept", icon: "🏘️", accent: "#f97316", pauseTimer: true,
    title: "Pradhan Mantri Gram Sadak Yojana and Road Density",
    html: `
      <p class="cp-lead">The <b>Pradhan Mantri Gram Sadak Yojana</b> was started on <b>25 December 2000</b>. It is a scheme fully funded by the Central Government, and its main aim is to give good, all-year road connection to villages that have none.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/16.png" alt="Pradhan Mantri Gram Sadak Yojana village road photo" data-caption="A paved village road built to connect a village with the nearest town." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Road density</b> is the length of roads per hundred square kilometres of an area. The more roads in a small area, the higher the density.</p>
      <table><thead><tr><th>Place</th><th>Road density fact</th></tr></thead><tbody><tr><td>Kerala, Tripura and Goa</td><td>Among the states with the highest road density</td></tr><tr><td>National Capital Territory of Delhi</td><td>Highest road density among all states and union territories</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/17.png" alt="Two squares of equal size: left square with many road lines labelled High road density; ri" data-caption="Two equal areas, one with many roads and one with few, showing high and low road density." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Road density is about roads per area, not about the total length. A small place like Delhi can have a higher density than a huge state.</div>
    `
  },
  29: {
    questext: "The Pradhan Mantri Gram Sadak Yojana was launched on ___.",
    options: ["15 August 1947", "25 December 2000", "2 October 2014", "26 January 1950"],
    correct: "2",
    exptext: "✅ The scheme was started on 25 December 2000. 📌 Christmas Day of the year 2000. ❌ The other dates are famous national days, not this scheme."
  },
  30: {
    questext: "Which place has the highest road density among all states and union territories of India?",
    options: ["Kerala", "Goa", "Delhi", "Tripura"],
    correct: "3",
    exptext: "✅ The National Capital Territory of Delhi has the highest road density among states and union territories. 📌 Small area, many roads. ❌ Kerala, Tripura and Goa are high among states but not the top overall."
  },
  31: {
    questext: "Road density is defined as the length of roads per ___.",
    options: ["hundred square kilometres of area", "thousand people", "national highway", "district"],
    correct: "1",
    exptext: "✅ Road density is the average length of roads per hundred square kilometres of an area. 📌 Density always means per area. ❌ Roads per thousand people measures a different idea."
  },
  32: {
    type: "concept", icon: "🚂", accent: "#84cc16", pauseTimer: true,
    title: "Rail Transport",
    html: `
      <p class="cp-lead">India has the <b>fourth largest railway network in the world</b>, after the United States, China and Russia. Railways are the backbone of long-distance travel and goods transport in the country.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/18.png" alt="Indian Railways train passing over bridge photo" data-caption="A passenger train of Indian Railways running across a long bridge." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1853</td><td>First train ran between Mumbai and Thane</td></tr><tr><td>1854</td><td>Calcutta was joined to Hooghly by rail</td></tr><tr><td>1856</td><td>Madras was joined to Arcot by rail</td></tr></tbody></table>
      <p class="cp-lead">The first train ran in <b>1853 between Mumbai (then Bombay) and Thane</b>. The first lines in the eastern and southern parts of the country followed within three years.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/19.png" alt="Horizontal timeline with three dots: 1853 Mumbai to Thane, 1854 Calcutta to Hooghly, 1856 " data-caption="A timeline of the first railway lines: 1853, 1854 and 1856." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Remember the order of years 1853, 1854, 1856 and the first line, Mumbai to Thane.</div>
    `
  },
  33: {
    questext: "India has the ___ largest railway network in the world.",
    options: ["second", "third", "fourth", "fifth"],
    correct: "3",
    exptext: "✅ India has the fourth largest railway network, after the United States, China and Russia. 📌 Three countries are ahead of India. ❌ Third is wrong because Russia comes before India."
  },
  34: {
    questext: "The first passenger train in India ran between which two places in 1853?",
    options: ["Calcutta and Hooghly", "Madras and Arcot", "Delhi and Agra", "Mumbai and Thane"],
    correct: "4",
    exptext: "✅ The first train ran between Mumbai and Thane in 1853. 📌 Calcutta-Hooghly came in 1854 and Madras-Arcot in 1856. ❌ Delhi to Agra was not the first line."
  },
  35: {
    questext: "Arrange the following railway lines in the order in which they were opened: 1. Madras to Arcot  2. Mumbai to Thane  3. Calcutta to Hooghly",
    options: ["2, 3, 1", "1, 2, 3", "3, 2, 1", "2, 1, 3"],
    correct: "1",
    exptext: "✅ The order is Mumbai to Thane (1853), Calcutta to Hooghly (1854), and Madras to Arcot (1856). 📌 West, east, then south. ❌ Madras to Arcot came last."
  },
  36: {
    type: "concept", icon: "📦", accent: "#06b6d4", pauseTimer: true,
    title: "Dedicated Freight Corridor",
    html: `
      <p class="cp-lead">A dedicated freight corridor is a railway line used only for goods trains. Goods trains do not have to wait for passenger trains, so goods move faster.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/20.png" alt="Two parallel railway tracks: top track labelled Passenger trains, bottom track labelled Go" data-caption="Two separate tracks: one for passenger trains and one only for goods trains." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Corridor</th><th>Route</th></tr></thead><tbody><tr><td>Eastern</td><td>Ludhiana (Punjab) to Dankuni (West Bengal), 1,856 km</td></tr><tr><td>Western</td><td>Jawaharlal Nehru Port (Mumbai) to Dadri (Uttar Pradesh), 1,504 km</td></tr><tr><td>East-West</td><td>Kolkata to Mumbai, 2,328 km</td></tr><tr><td>North-South</td><td>Delhi to Chennai, 2,343 km</td></tr><tr><td>East Coast</td><td>Kharagpur to Vijayawada, 1,100 km</td></tr><tr><td>Southern</td><td>Chennai to Goa, 899 km</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/21.png" alt="Dedicated Freight Corridor goods train double stack container photo" data-caption="A long goods train carrying containers on a dedicated freight corridor." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix the two longest: the North-South corridor (2,343 km) is longer than the East-West corridor (2,328 km). The Eastern and Western corridors are the two that are already built.</div>
    `
  },
  37: {
    questext: "The Eastern Dedicated Freight Corridor runs between which two places?",
    options: ["Ludhiana and Dankuni", "Mumbai and Dadri", "Delhi and Chennai", "Kharagpur and Vijayawada"],
    correct: "1",
    exptext: "✅ The Eastern corridor runs from Ludhiana in Punjab to Dankuni in West Bengal. 📌 East side, Punjab to Bengal. ❌ Mumbai to Dadri is the Western corridor."
  },
  38: {
    questext: "The Western Dedicated Freight Corridor joins Jawaharlal Nehru Port in Mumbai with which place?",
    options: ["Dankuni", "Ludhiana", "Dadri", "Vijayawada"],
    correct: "3",
    exptext: "✅ The Western corridor runs from Jawaharlal Nehru Port to Dadri in Uttar Pradesh. 📌 West coast to Uttar Pradesh. ❌ Dankuni and Ludhiana are on the Eastern corridor."
  },
  39: {
    questext: "Which dedicated freight corridor joins Delhi and Chennai?",
    options: ["East-West corridor", "North-South corridor", "Southern corridor", "East Coast corridor"],
    correct: "2",
    exptext: "✅ The North-South corridor joins Delhi and Chennai and is about 2,343 kilometres long. 📌 Delhi is north and Chennai is south. ❌ The Southern corridor joins Chennai and Goa."
  },
  40: {
    type: "concept", icon: "🏢", accent: "#a855f7", pauseTimer: true,
    title: "Railway Zones and Divisions",
    html: `
      <p class="cp-lead">For easy running, Indian Railways is divided into <b>zones</b>, and each zone has a headquarters city. Each zone is further divided into <b>divisions</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/22.png" alt="Schematic, not a map: a big box labelled Railway Zone with an arrow down to three smaller " data-caption="A zone is divided into smaller parts called divisions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Railway zone</th><th>Headquarters</th></tr></thead><tbody><tr><td>Central Railway</td><td>Mumbai</td></tr><tr><td>Western Railway</td><td>Mumbai (Churchgate)</td></tr><tr><td>Northern Railway</td><td>New Delhi</td></tr><tr><td>Eastern Railway</td><td>Kolkata</td></tr><tr><td>South Eastern Railway</td><td>Garden Reach, Kolkata</td></tr><tr><td>East Central Railway</td><td>Hajipur</td></tr><tr><td>North Central Railway</td><td>Prayagraj (Allahabad)</td></tr><tr><td>North Eastern Railway</td><td>Gorakhpur</td></tr><tr><td>North Western Railway</td><td>Jaipur</td></tr><tr><td>Southern Railway</td><td>Chennai</td></tr><tr><td>South Central Railway</td><td>Secunderabad</td></tr><tr><td>South Western Railway</td><td>Hubballi</td></tr><tr><td>West Central Railway</td><td>Jabalpur</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/23.png" alt="Churchgate railway station Mumbai building photo" data-caption="The Churchgate railway station building in Mumbai, headquarters of Western Railway." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A useful pair to remember: both the Central Railway and the Western Railway have their headquarters in Mumbai, but at different stations.</p>
      <div class="cp-note trap">Western Railway headquarters is Churchgate, while the Central Railway headquarters is Chhatrapati Shivaji Maharaj Terminus. Also, South Eastern Railway is in Kolkata and South Central Railway is in Secunderabad.</div>
    `
  },
  41: {
    questext: "What is the headquarters of the North Eastern Railway zone?",
    options: ["Hajipur", "Gorakhpur", "Jaipur", "Jabalpur"],
    correct: "2",
    exptext: "✅ The North Eastern Railway has its headquarters at Gorakhpur. 📌 North Eastern means Gorakhpur. ❌ Hajipur is the East Central zone and Jaipur is the North Western zone."
  },
  42: {
    questext: "The headquarters of the East Central Railway is at ___.",
    options: ["Kolkata", "Hajipur", "Gorakhpur", "Secunderabad"],
    correct: "2",
    exptext: "✅ East Central Railway is headquartered at Hajipur in Bihar. 📌 Hajipur sounds like a central point in the east. ❌ Kolkata is the Eastern Railway headquarters."
  },
  43: {
    questext: "Match the railway zone with its headquarters. 1. West Central Railway  2. South Western Railway  3. North Western Railway",
    options: ["1 Jabalpur, 2 Hubballi, 3 Jaipur", "1 Jaipur, 2 Hubballi, 3 Jabalpur", "1 Hubballi, 2 Jabalpur, 3 Jaipur", "1 Jabalpur, 2 Jaipur, 3 Hubballi"],
    correct: "1",
    exptext: "✅ West Central is Jabalpur, South Western is Hubballi, and North Western is Jaipur. 📌 J for Jabalpur and Jaipur, H for Hubballi. ❌ Other options swap the three cities."
  },
  44: {
    type: "concept", icon: "🏔️", accent: "#e11d48", pauseTimer: true,
    title: "Mountain Railway and Tourist Trains",
    html: `
      <p class="cp-lead">India has five famous <b>mountain railways</b>, built in the hills during the British period. Three of them are UNESCO World Heritage Sites.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/24.png" alt="Darjeeling Himalayan Railway toy train photo" data-caption="The Darjeeling Himalayan Railway toy train passing through the hill town." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Mountain railway</th><th>Year opened</th></tr></thead><tbody><tr><td>Darjeeling Himalayan</td><td>1881</td></tr><tr><td>Kalka-Shimla</td><td>1903</td></tr><tr><td>Neral-Matheran</td><td>1907</td></tr><tr><td>Nilgiri Mountain</td><td>1908</td></tr><tr><td>Kangra Valley</td><td>1929</td></tr></tbody></table>
      <p class="cp-lead">The <b>Darjeeling Himalayan Railway</b>, the <b>Kalka-Shimla Railway</b> and the <b>Nilgiri Mountain Railway</b> are in the UNESCO World Heritage List.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/25.png" alt="Three medal-like badges labelled Darjeeling, Kalka-Shimla, Nilgiri, each with the words UN" data-caption="Three badges: the Darjeeling, Kalka-Shimla and Nilgiri mountain railways are World Heritage Sites." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/26.png" alt="Palace on Wheels luxury tourist train photo" data-caption="The Palace on Wheels, a luxury tourist train of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Tourist trains: Palace on Wheels, Royal Rajasthan on Wheels, The Golden Chariot, Deccan Odyssey, Maharajas' Express and Mahaparinirvan Express.</div>
    `
  },
  45: {
    questext: "Which of the following mountain railways is NOT included in the UNESCO World Heritage List?",
    options: ["Darjeeling Himalayan Railway", "Kalka-Shimla Railway", "Nilgiri Mountain Railway", "Kangra Valley Railway"],
    correct: "4",
    exptext: "✅ Darjeeling, Kalka-Shimla and Nilgiri are World Heritage railways, but the Kangra Valley Railway is not. 📌 Remember the three: D, K, N. ❌ The other three are on the list."
  },
  46: {
    questext: "The Darjeeling Himalayan Railway was opened in which year?",
    options: ["1881", "1903", "1908", "1929"],
    correct: "1",
    exptext: "✅ The Darjeeling Himalayan Railway opened in 1881, the oldest of the five. 📌 Darjeeling is first, then Kalka-Shimla (1903). ❌ 1908 is the Nilgiri Mountain Railway."
  },
  47: {
    questext: "Which of the following is a tourist train of India?",
    options: ["Gatimaan Express", "Palace on Wheels", "Rajdhani Express", "Vivek Express"],
    correct: "2",
    exptext: "✅ Palace on Wheels is a luxury tourist train. 📌 Tourist trains have special names like Wheels, Chariot, Odyssey. ❌ The others are regular passenger trains."
  },
  48: {
    type: "concept", icon: "🚇", accent: "#10b981", pauseTimer: true,
    title: "Metro Rail",
    html: `
      <p class="cp-lead">The first metro railway project in India began in <b>Kolkata</b>. The foundation stone was laid by Prime Minister Indira Gandhi on <b>29 December 1972</b>, and the first part started running in 1984.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/27.png" alt="Kolkata Metro train Esplanade station photo" data-caption="A train of the Kolkata Metro, the first metro rail system of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Metro fact</th><th>Detail</th></tr></thead><tbody><tr><td>First metro project</td><td>Kolkata</td></tr><tr><td>Foundation stone</td><td>29 December 1972 by Indira Gandhi</td></tr><tr><td>First partly commercial run</td><td>1984</td></tr><tr><td>First water metro</td><td>Kochi (Kerala), inaugurated in April 2023</td></tr></tbody></table>
      <p class="cp-lead">A <b>water metro</b> is a ferry service that works like a metro on water. India's first water metro is in <b>Kochi</b>, Kerala.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/28.png" alt="Kochi Water Metro boat photo" data-caption="An electric boat of the Kochi Water Metro in Kerala." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Kolkata first for metro, Kochi first for water metro. Both are asked often.</div>
    `
  },
  49: {
    questext: "In which city was the first metro railway project of India started?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    correct: "4",
    exptext: "✅ The first metro project was started in Kolkata, and the foundation stone was laid in 1972. 📌 Kolkata is first, Delhi is later. ❌ Delhi Metro started in 2002."
  },
  50: {
    questext: "The foundation stone of the first metro project in India was laid by which Prime Minister?",
    options: ["Indira Gandhi", "Jawaharlal Nehru", "Rajiv Gandhi", "Lal Bahadur Shastri"],
    correct: "1",
    exptext: "✅ Prime Minister Indira Gandhi laid the foundation stone in Kolkata on 29 December 1972. 📌 Indira and 1972. ❌ Nehru was no longer Prime Minister in 1972."
  },
  51: {
    questext: "India's first water metro was started in which city?",
    options: ["Kolkata", "Kochi", "Mumbai", "Visakhapatnam"],
    correct: "2",
    exptext: "✅ India's first water metro runs in Kochi, Kerala. 📌 Kochi has many backwaters, so boats suit it. ❌ Kolkata has the first metro on land."
  },
  52: {
    type: "concept", icon: "🚄", accent: "#eab308", pauseTimer: true,
    title: "Bullet Train",
    html: `
      <p class="cp-lead">India's first bullet train (high-speed train) will run between <b>Mumbai and Ahmedabad</b>. It uses Japanese Shinkansen technology, and it passes through Maharashtra, Gujarat and Dadra and Nagar Haveli.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/29.png" alt="Mumbai Ahmedabad bullet train corridor viaduct photo" data-caption="An elevated track under construction for the Mumbai to Ahmedabad bullet train." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Route</td><td>Mumbai to Ahmedabad</td></tr><tr><td>Stations</td><td>12 in all</td></tr><tr><td>Mumbai station</td><td>Underground</td></tr><tr><td>Other stations</td><td>Elevated</td></tr><tr><td>Sea tunnel</td><td>About 7 km under the sea</td></tr><tr><td>Second bullet train plan</td><td>Delhi to Varanasi</td></tr></tbody></table>
      <p class="cp-lead">The 12 stations are Mumbai, Thane, Virar, Boisar, Vapi, Bilimora, Surat, Bharuch, Vadodara, Anand, Ahmedabad and Sabarmati. The Mumbai station is under the ground, and all others are above the ground.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/30.png" alt="Schematic, not a map: a straight line from Mumbai to Sabarmati with 12 dots labelled Mumba" data-caption="A line of twelve stations from Mumbai to Sabarmati on the bullet train route." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The bullet train does not use Maglev. It runs on steel rails with Japanese high-speed rail technology. Maglev trains float on magnets.</div>
    `
  },
  53: {
    questext: "India's first bullet train is planned between which two cities?",
    options: ["Delhi and Varanasi", "Mumbai and Ahmedabad", "Chennai and Bengaluru", "Kolkata and Patna"],
    correct: "2",
    exptext: "✅ The first bullet train will run between Mumbai and Ahmedabad. 📌 Delhi to Varanasi is the second plan. ❌ The other pairs have only been discussed."
  },
  54: {
    questext: "How many stations are there on the Mumbai-Ahmedabad bullet train corridor?",
    options: ["8", "10", "12", "14"],
    correct: "3",
    exptext: "✅ There are 12 stations on the corridor. 📌 Mumbai is the only underground station and the rest are elevated. ❌ Eight and ten stations are less than the total."
  },
  55: {
    questext: "Consider the following statements about the Mumbai-Ahmedabad bullet train:\n1. The Mumbai station will be underground.\n2. The line has a sea tunnel about 7 kilometres long.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Mumbai is under the ground, and the line also goes through a sea tunnel. ❌ Choosing only one misses the second fact."
  },
  56: {
    type: "concept", icon: "🛢️", accent: "#0ea5e9", pauseTimer: true,
    title: "Pipeline Transport",
    html: `
      <p class="cp-lead">A pipeline carries oil, gas and some other materials through long underground pipes. It is a cheap and safe way to move liquids and gases over long distances.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/31.png" alt="A long horizontal pipe from an oil field on the left to a refinery on the right, with a sm" data-caption="A pipeline carrying crude oil from an oil field to a refinery." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Pipeline</th><th>What it carries</th></tr></thead><tbody><tr><td>Naharkatiya-Nunmati-Barauni</td><td>Petroleum (crude oil from Assam to Barauni refinery)</td></tr><tr><td>Hazira-Vijaipur-Jagdishpur</td><td>Natural gas</td></tr><tr><td>Haldia-Barauni</td><td>Petroleum</td></tr><tr><td>Jamnagar-Loni</td><td>Liquefied petroleum gas</td></tr><tr><td>Kandla-Bhatinda</td><td>Petroleum products</td></tr><tr><td>Salaya-Koyali-Mathura</td><td>Petroleum</td></tr><tr><td>Mumbai-Pune</td><td>Petroleum</td></tr><tr><td>Turkmenistan-Afghanistan-Pakistan-India (proposed)</td><td>Natural gas</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/32.png" alt="oil pipeline laid underground refinery India photo" data-caption="Oil pipelines running to a refinery in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Hazira-Vijaipur-Jagdishpur</b> pipeline is about 1,730 kilometres long and carries natural gas on the west coast route. Iron ore travels as slurry in a pipeline from <b>Kudremukh to Mangaluru port</b>.</p>
      <div class="cp-note exam">Under the <b>Pradhan Mantri Urja Ganga</b> project, a pipeline of about 2,650 kilometres is being built from Jagdishpur to Haldia and from Bokaro to Dhamra. It passes through Uttar Pradesh, Bihar, Jharkhand, Odisha and West Bengal and will carry piped natural gas to homes.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/33.png" alt="Schematic, not a map: a line with dots labelled Jagdishpur, Bokaro, Dhamra, Haldia and a l" data-caption="A chain of places on the Urja Ganga pipeline that will carry gas to homes in eastern India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
    `
  },
  57: {
    questext: "Which pipeline carries natural gas?",
    options: ["Haldia-Barauni", "Hazira-Vijaipur-Jagdishpur", "Mumbai-Pune", "Salaya-Koyali-Mathura"],
    correct: "2",
    exptext: "✅ The Hazira-Vijaipur-Jagdishpur pipeline carries natural gas. 📌 HVJ means gas. ❌ The other three carry petroleum."
  },
  58: {
    questext: "The Jamnagar-Loni pipeline is mainly used to carry ___.",
    options: ["crude oil", "iron ore", "liquefied petroleum gas", "diesel"],
    correct: "3",
    exptext: "✅ The Jamnagar-Loni pipeline carries liquefied petroleum gas. 📌 Jamnagar to Loni, cooking gas. ❌ Crude oil goes through the Salaya-Mathura line."
  },
  59: {
    questext: "Iron ore is carried by pipeline from Kudremukh to which port?",
    options: ["Mormugao", "Visakhapatnam", "Mangaluru", "Kochi"],
    correct: "3",
    exptext: "✅ Iron ore slurry flows from Kudremukh to Mangaluru port. 📌 Both places are in Karnataka. ❌ Mormugao is a port in Goa."
  },
  60: {
    questext: "The Pradhan Mantri Urja Ganga pipeline project will pass through which of the following states?",
    options: ["Punjab and Haryana", "Gujarat and Rajasthan", "Kerala and Tamil Nadu", "Uttar Pradesh, Bihar, Jharkhand, Odisha and West Bengal"],
    correct: "4",
    exptext: "✅ The pipeline runs from Jagdishpur to Haldia and from Bokaro to Dhamra through Uttar Pradesh, Bihar, Jharkhand, Odisha and West Bengal. 📌 Ganga means the Ganga plain in the east. ❌ The other states are away from the route."
  },
  61: {
    type: "concept", icon: "🚢", accent: "#d946ef", pauseTimer: true,
    title: "Water Transport and National Waterways Act, 2016",
    html: `
      <p class="cp-lead">Water transport is the <b>oldest means of transport</b> in India. It is the cheapest and the most environment-friendly way to carry heavy goods.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/34.png" alt="cargo barge on river Ganga Varanasi photo" data-caption="A cargo barge moving on the Ganga river, an example of inland water transport." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Water transport has two classes: <b>inland waterways</b> (rivers and canals) and <b>ocean or sea waterways</b>. Rivers, canals and lakes can be used for boats, while the sea is used by ships.</p>
      <p class="cp-lead">The <b>National Waterways Act, 2016</b> allows 106 more waterways to be declared national waterways. Before it, there were 5 national waterways, so the total becomes <b>111</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/35.png" alt="Simple sum picture: a box labelled 5 existing waterways, a plus sign, a box labelled 106 n" data-caption="The sum 5 plus 106 equals 111 national waterways under the Act of 2016." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Remember the sum: 5 + 106 = 111.</div>
    `
  },
  62: {
    questext: "What is the total number of national waterways after the National Waterways Act, 2016?",
    options: ["106", "101", "111", "120"],
    correct: "3",
    exptext: "✅ Five existing waterways plus 106 new ones make 111. 📌 5 plus 106 equals 111. ❌ 106 is only the number of new waterways."
  },
  63: {
    questext: "Water transport is considered the ___ means of transport.",
    options: ["newest and costliest", "oldest and cheapest", "fastest and costliest", "slowest and most polluting"],
    correct: "2",
    exptext: "✅ Water transport is the oldest means of transport, and it is the cheapest and environment-friendly for heavy goods. 📌 Old and cheap. ❌ It is not the fastest and it is not the costliest."
  },
  64: {
    type: "concept", icon: "🌊", accent: "#64748b", pauseTimer: true,
    title: "Inland Water Transport",
    html: `
      <p class="cp-lead">India has five old national waterways. Each one is a stretch of a river or canal that is used for carrying goods and passengers.</p>
      <table><thead><tr><th>Waterway</th><th>Year</th><th>Route</th><th>Length</th></tr></thead><tbody><tr><td>NW-1</td><td>1986</td><td>Ganga-Bhagirathi-Hooghly, Prayagraj (Uttar Pradesh) to Haldia (West Bengal)</td><td>1,620 km</td></tr><tr><td>NW-2</td><td>1988</td><td>Brahmaputra, Sadiya to Dhubri (Assam)</td><td>891 km</td></tr><tr><td>NW-3</td><td>1993</td><td>West Coast Canal, Udyogmandal and Champakara canals (Kerala)</td><td>about 205 km</td></tr><tr><td>NW-4</td><td>2008</td><td>Kakinada-Puducherry canals with the Krishna and Godavari rivers</td><td>about 1,078 km</td></tr><tr><td>NW-5</td><td>2008</td><td>East Coast Canal with the Matai, Brahmani and Mahanadi delta (Odisha and West Bengal)</td><td>about 623 km</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/36.png" alt="Five boxes in a row labelled NW-1 Ganga, NW-2 Brahmaputra, NW-3 Kerala canals, NW-4 Godava" data-caption="Five national waterways in a row, each linked with a river or canal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/37.png" alt="Brahmaputra river Dibrugarh cargo ship photo" data-caption="A cargo vessel sailing on the Brahmaputra river in Assam." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>National Waterway 1</b> on the Ganga is the longest and the oldest of the five. National Waterway 3 is in Kerala and is the shortest.</p>
      <div class="cp-note exam">Do not mix the numbers: NW-1 is the Ganga, NW-2 is the Brahmaputra, NW-3 is in Kerala, NW-4 is Godavari and Krishna with canals, and NW-5 is in Odisha and West Bengal.</div>
      <p class="cp-lead">The <b>Kaladan Multi-Modal Transit Transport Project</b> is built on the Kaladan river. It has a waterway of 158 kilometres from Sittwe to Paletwa in Myanmar, and a road of 109 kilometres from Paletwa to Zorinpui on the India-Myanmar border in Mizoram.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/38.png" alt="Schematic, not a map: a left-to-right line with four dots labelled Kolkata, Sittwe, Paletw" data-caption="The Kaladan route: a waterway from Sittwe to Paletwa and a road from Paletwa to Zorinpui." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
    `
  },
  65: {
    questext: "National Waterway 1 is located on which river system?",
    options: ["Brahmaputra", "Ganga-Bhagirathi-Hooghly", "Godavari", "Krishna"],
    correct: "2",
    exptext: "✅ National Waterway 1 runs on the Ganga-Bhagirathi-Hooghly river system from Prayagraj to Haldia. 📌 Number one, the Ganga. ❌ The Brahmaputra is National Waterway 2."
  },
  66: {
    questext: "National Waterway 2 runs along which river between Sadiya and Dhubri?",
    options: ["Ganga", "Mahanadi", "Brahmaputra", "Godavari"],
    correct: "3",
    exptext: "✅ National Waterway 2 runs along the Brahmaputra from Sadiya to Dhubri in Assam. 📌 Two is the second great river. ❌ The Ganga belongs to National Waterway 1."
  },
  67: {
    questext: "The Kaladan Multi-Modal Transit Transport Project connects India with which country?",
    options: ["Bangladesh", "Bhutan", "Nepal", "Myanmar"],
    correct: "4",
    exptext: "✅ The Kaladan project links the ports of eastern India with Mizoram through Myanmar. 📌 Sittwe and Paletwa are towns in Myanmar. ❌ The route does not go through Bangladesh."
  },
  68: {
    questext: "Consider the following statements about the Kaladan project:\n1. It includes a 158 kilometre waterway on the Kaladan river from Sittwe to Paletwa.\n2. Its road part runs from Paletwa to the India-Myanmar border in Mizoram.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct: the waterway is 158 kilometres and the road is 109 kilometres. 📌 Water first, then road. ❌ Choosing only one statement misses the other half of the project."
  },
  69: {
    type: "concept", icon: "⚓", accent: "#fb7185", pauseTimer: true,
    title: "Maritime Transport",
    html: `
      <p class="cp-lead">Maritime transport uses the sea. India's coastline is about <b>7,516.6 kilometres</b> long. India has 13 major ports and about 200 non-major ports.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/39.png" alt="Jawaharlal Nehru Port container terminal aerial photo" data-caption="Container cranes and stacks at a busy Indian port." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Coast</th><th>Major ports</th></tr></thead><tbody><tr><td>West coast</td><td>Kandla, Mumbai, Jawaharlal Nehru Port, Mormugao, New Mangalore, Cochin</td></tr><tr><td>East coast</td><td>Tuticorin, Chennai, Ennore, Visakhapatnam, Paradip, Haldia (Kolkata)</td></tr><tr><td>Bay of Bengal island</td><td>Port Blair</td></tr></tbody></table>
      <p class="cp-lead">Different ports have different features. <b>Mormugao</b> in Goa is at the mouth of the Zuari river and is known for iron ore export. <b>Cochin</b> is a natural harbour and has the largest shipyard. <b>Visakhapatnam</b> is the deepest natural port.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/40.png" alt="Six small cards with an anchor icon: Mormugao Goa iron ore export; Cochin natural harbour " data-caption="Six ports and the special feature that each is known for." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/41.png" alt="Alang ship breaking yard Gujarat photo" data-caption="A ship being recycled at the Alang ship-breaking yard in Gujarat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Ennore is the only corporate port among the major ports. Kandla and Diamond Harbour are tidal ports. Alang in Gujarat has India's largest ship recycling yard.</div>
    `
  },
  70: {
    questext: "Which Indian port is famous for iron ore export and lies at the mouth of the Zuari river?",
    options: ["Mormugao", "Kandla", "Paradip", "Tuticorin"],
    correct: "1",
    exptext: "✅ Mormugao in Goa is at the mouth of the Zuari river and exports iron ore. 📌 Zuari, Goa, iron ore. ❌ Kandla is a tidal port in Gujarat."
  },
  71: {
    questext: "Which Indian port is the deepest natural port and has Dolphin's Nose?",
    options: ["Paradip", "Cochin", "Visakhapatnam", "Chennai"],
    correct: "3",
    exptext: "✅ Visakhapatnam is the deepest natural port, and Dolphin's Nose is a rock near it. 📌 Visakhapatnam equals deepest. ❌ Paradip is deep, but it is a lagoon-like port."
  },
  72: {
    questext: "Which of the following is a tidal port of India?",
    options: ["Cochin", "Kandla", "Visakhapatnam", "Chennai"],
    correct: "2",
    exptext: "✅ Kandla in Gujarat and Diamond Harbour in West Bengal are examples of tidal ports. 📌 Kandla has big tides in the Gulf of Kutch. ❌ Cochin is a natural harbour and Chennai is artificial."
  },
  73: {
    questext: "Ennore (Kamarajar) Port is a ___ port.",
    options: ["corporate", "tidal", "riverine", "fishing"],
    correct: "1",
    exptext: "✅ Ennore, about 20 kilometres from Chennai, is the corporate major port of the country. 📌 Ennore is the only one run as a company. ❌ Tidal and riverine are other types of ports."
  },
  74: {
    questext: "Where is India's largest ship recycling yard located?",
    options: ["Kandla", "Kochi", "Visakhapatnam", "Alang"],
    correct: "4",
    exptext: "✅ Alang in Gujarat has India's largest ship recycling yard. 📌 Alang, old ships. ❌ Kochi is known for shipbuilding, not recycling."
  },
  75: {
    type: "concept", icon: "🗺️", accent: "#2dd4bf", pauseTimer: true,
    title: "Major Ports of India",
    html: `
      <p class="cp-lead">Every major port has a special place. The best way to remember them is to learn each port with its place, river or sea.</p>
      <table><thead><tr><th>Port</th><th>Location</th></tr></thead><tbody><tr><td>Kolkata Port</td><td>Left bank of the Hooghly river (West Bengal)</td></tr><tr><td>Paradip Port</td><td>Coast of Odisha</td></tr><tr><td>Visakhapatnam Port</td><td>Andhra Pradesh</td></tr><tr><td>Chennai Port (artificial)</td><td>Tamil Nadu</td></tr><tr><td>Ennore (Kamarajar) Port</td><td>Tamil Nadu, about 20 km from Chennai</td></tr><tr><td>Tuticorin (V.O. Chidambaranar) Port</td><td>Gulf of Mannar (Tamil Nadu)</td></tr><tr><td>Cochin Port</td><td>Mouth of Vembanad Kayal (Kerala)</td></tr><tr><td>New Mangalore Port</td><td>9 km north of Mangaluru (Karnataka)</td></tr><tr><td>Mormugao Port</td><td>Left bank of the Zuari river (Goa)</td></tr><tr><td>Mumbai Port</td><td>Mumbai</td></tr><tr><td>Jawaharlal Nehru Port</td><td>Near Panvel, Navi Mumbai</td></tr><tr><td>Kandla Port</td><td>Gulf of Kutch (Gujarat)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/42.png" alt="Schematic, not a map: a rough coast outline of India with dots for the 12 major ports in o" data-caption="A simple coast outline with dots showing where the major ports lie." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/43.png" alt="Cochin Port Vembanad lake Kochi harbour photo" data-caption="Cochin Port on the Vembanad backwaters in Kerala." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Jawaharlal Nehru Port at Navi Mumbai (Nhava Sheva) is the largest container port of India. Chennai Port is an artificial port.</div>
    `
  },
  76: {
    questext: "Which major port is located in the Gulf of Mannar in Tamil Nadu?",
    options: ["Chennai", "Ennore", "Tuticorin", "Visakhapatnam"],
    correct: "3",
    exptext: "✅ Tuticorin (V.O. Chidambaranar Port) is located in the Gulf of Mannar. 📌 Mannar means south-east Tamil Nadu. ❌ Chennai and Ennore are on the Bay of Bengal."
  },
  77: {
    questext: "Which port is also known as Nhava Sheva Port?",
    options: ["Mumbai Port", "Jawaharlal Nehru Port", "Kandla Port", "Mormugao Port"],
    correct: "2",
    exptext: "✅ Jawaharlal Nehru Port near Panvel is also called Nhava Sheva Port. 📌 Nehru equals Nhava. ❌ Mumbai Port is a separate older port."
  },
  78: {
    questext: "Kandla Port is located in which gulf?",
    options: ["Gulf of Mannar", "Gulf of Khambhat", "Gulf of Kutch", "Palk Bay"],
    correct: "3",
    exptext: "✅ Kandla Port lies in the Gulf of Kutch in Gujarat. 📌 K for Kandla and K for Kutch. ❌ The Gulf of Mannar is in the south near Tuticorin."
  },
  79: {
    type: "concept", icon: "🌐", accent: "#c026d3", pauseTimer: true,
    title: "Sagarmala Project",
    html: `
      <p class="cp-lead"><b>Sagarmala</b> means a garland of seas. It is a project of the Ministry of Shipping to promote development around ports and to increase sea trade.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/44.png" alt="Ministry of Shipping Sagarmala port modernisation photo" data-caption="A modern Indian port that is improving under the Sagarmala Project." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The idea was announced by Prime Minister Atal Bihari Vajpayee on 15 August 2003. The project was started in 2014-15 by Prime Minister Narendra Modi's government.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/45.png" alt="Four pillars with titles: Port modernisation, Port connectivity, Port-led industrialisatio" data-caption="Four pillars of the Sagarmala Project, ranging from port modernisation to the development of coastal communities." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Sagarmala belongs to the Ministry of Shipping, and Bharatmala belongs to the Ministry of Road Transport and Highways. Do not mix the two.</div>
    `
  },
  80: {
    questext: "Sagarmala Project is mainly related to which of the following?",
    options: ["Road building", "Railway lines", "Port-led development and sea trade", "River linking"],
    correct: "3",
    exptext: "✅ Sagarmala promotes port-led development and maritime trade. 📌 Sagar means sea. ❌ Road building is covered by Bharatmala."
  },
  81: {
    questext: "The Sagarmala Project was announced by which Prime Minister on 15 August 2003?",
    options: ["Atal Bihari Vajpayee", "Manmohan Singh", "Narendra Modi", "P. V. Narasimha Rao"],
    correct: "1",
    exptext: "✅ Prime Minister Atal Bihari Vajpayee announced the Sagarmala idea on 15 August 2003. 📌 Announced in 2003, started in 2014-15. ❌ Narendra Modi's government started the project later."
  },
  82: {
    type: "concept", icon: "🏆", accent: "#0891b2", pauseTimer: true,
    title: "Other Related Facts",
    html: `
      <p class="cp-lead">Exams often ask for India's <b>longest, highest and fastest</b> in transport. Learn them as one-line pairs.</p>
      <table><thead><tr><th>Record</th><th>Answer</th></tr></thead><tbody><tr><td>Longest road tunnel</td><td>Chenani-Nashri Tunnel (about 9 km)</td></tr><tr><td>Longest road bridge</td><td>Bhupen Hazarika (Dhola-Sadiya) Bridge, 9.15 km, on the Lohit river, between Assam and Arunachal Pradesh</td></tr><tr><td>Longest west coast highway</td><td>NH-17 (now NH-66)</td></tr><tr><td>Longest east coast highway</td><td>NH-5 (now NH-16)</td></tr><tr><td>Longest western highway</td><td>NH-15</td></tr><tr><td>Longest railway route</td><td>Dibrugarh to Kanyakumari (4,286 km)</td></tr><tr><td>Longest distance train</td><td>Vivek Express</td></tr><tr><td>Fastest train</td><td>Gatimaan Express (160 km/h)</td></tr><tr><td>Longest railway platform</td><td>Hubballi</td></tr><tr><td>Largest container port</td><td>Jawaharlal Nehru Port</td></tr><tr><td>Highest airport</td><td>Leh (Ladakh)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/46.png" alt="Bhupen Hazarika Setu Dhola Sadiya bridge Lohit river photo" data-caption="The Bhupen Hazarika Bridge over the Lohit river, the longest road bridge in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/47.png" alt="Chenani Nashri tunnel Jammu Kashmir photo" data-caption="The Chenani-Nashri tunnel, the longest road tunnel of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Transport_in_India/48.png" alt="Six small record cards with icons: Longest road bridge, Longest road tunnel, Longest rail " data-caption="A set of six record cards for the longest, largest and highest in Indian transport." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Bhupen Hazarika Bridge is a road bridge over the Lohit river, not the Brahmaputra itself. Chenani-Nashri is a road tunnel, not a railway tunnel.</div>
    `
  },
  83: {
    questext: "India's longest road tunnel is ___.",
    options: ["Chenani-Nashri Tunnel", "Pir Panjal Tunnel", "Jawahar Tunnel", "Banihal Tunnel"],
    correct: "1",
    exptext: "✅ The Chenani-Nashri Tunnel in Jammu and Kashmir is about 9 kilometres long. 📌 Chenani to Nashri, 9 kilometres. ❌ Pir Panjal is a railway tunnel."
  },
  84: {
    questext: "The Bhupen Hazarika Bridge, India's longest road bridge, is built over which river?",
    options: ["Lohit", "Ganga", "Yamuna", "Hooghly"],
    correct: "1",
    exptext: "✅ It is built over the Lohit river, a tributary of the Brahmaputra, between Assam and Arunachal Pradesh. 📌 Dhola-Sadiya on the Lohit. ❌ Ganga and Yamuna are far away."
  },
  85: {
    questext: "India's longest-distance train is the ___.",
    options: ["Gatimaan Express", "Rajdhani Express", "Vivek Express", "Duronto Express"],
    correct: "3",
    exptext: "✅ The Vivek Express runs from Dibrugarh to Kanyakumari, about 4,286 kilometres. 📌 Vivek is the long-distance train. ❌ Gatimaan is known for speed."
  },
  86: {
    questext: "Which is the largest container port of India?",
    options: ["Kandla", "Chennai", "Visakhapatnam", "Jawaharlal Nehru Port"],
    correct: "4",
    exptext: "✅ Jawaharlal Nehru Port at Navi Mumbai is the largest container port. 📌 Think of Nehru and containers. ❌ Kandla handles bulk cargo."
  },
  87: {
    questext: "Where is India's highest airport located?",
    options: ["Leh", "Shimla", "Srinagar", "Dehradun"],
    correct: "1",
    exptext: "✅ The airport at Leh in Ladakh is the highest airport of India. 📌 Leh is high in the mountains. ❌ Shimla, Srinagar and Dehradun are lower."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Transport_in_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a realistic highway with a curved flyover, a modern passenger train and a container ship at a port, in a neat row" },
  "images/General_Awareness/Geography/Transport_in_India/1.png": { t: "fig", about: "Tree diagram: top oval Transport; three branches Land Transport, Water Transport, Air Transport; under Land two boxes Road and Rail; under Water two boxes Inland and Maritime. A different colour for each branch." },
  "images/General_Awareness/Geography/Transport_in_India/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mumbai Pune Expressway aerial view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/2.png. a wide highway with many vehicles",
  "images/General_Awareness/Geography/Transport_in_India/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian national highway traffic trucks aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/3.png. a busy highway with trucks",
  "images/General_Awareness/Geography/Transport_in_India/4.png": { t: "fig", about: "Three-level ladder: top step National Highways, middle step State Highways, bottom step District and Village Roads, with arrows showing a village road joining a state highway and then a national highway." },
  "images/General_Awareness/Geography/Transport_in_India/5.png": { t: "fig", about: "Two vertical bars side by side: first bar short labelled 2 percent of road length, second bar tall labelled 40 percent of traffic. Title: Small length, big traffic." },
  "images/General_Awareness/Geography/Transport_in_India/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"National Highway 44 Srinagar Kanyakumari road photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/6.png. the longest national highway of India",
  "images/General_Awareness/Geography/Transport_in_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Border Roads Organisation road Ladakh mountain pass photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/7.png. a mountain road built by the organisation",
  "images/General_Awareness/Geography/Transport_in_India/8.png": { t: "fig", about: "Three signboards in a row: Project Beacon with text Jammu and Kashmir; Project Dantak with text Bhutan; Project Hirak with text Naxal-affected areas." },
  "images/General_Awareness/Geography/Transport_in_India/9.png": { t: "fig", about: "Seven small boxes in a row numbered Phase 1 to Phase 7, with Phase 1 highlighted as Golden Quadrilateral and Phase 2 highlighted as North-South and East-West corridors." },
  "images/General_Awareness/Geography/Transport_in_India/10.png": { t: "fig", about: "Schematic, not a map: a four-sided shape with corners labelled Delhi, Kolkata, Chennai and Mumbai, and a thick gold line along the sides." },
  "images/General_Awareness/Geography/Transport_in_India/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Golden Quadrilateral highway India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/11.png. a four-lane section of the highway",
  "images/General_Awareness/Geography/Transport_in_India/12.png": { t: "fig", about: "A big umbrella labelled Bharatmala, with raindrop-like small boxes under it labelled Many road projects." },
  "images/General_Awareness/Geography/Transport_in_India/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"road over bridge railway level crossing India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/13.png. a road bridge built above a railway line",
  "images/General_Awareness/Geography/Transport_in_India/14.png": { t: "fig", about: "Schematic, not a map: a state outline with four towns joined by thick lines labelled State Highway, and one line leaving the state labelled National Highway." },
  "images/General_Awareness/Geography/Transport_in_India/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"state highway road signboard India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/15.png. a state highway signboard",
  "images/General_Awareness/Geography/Transport_in_India/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pradhan Mantri Gram Sadak Yojana village road photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/16.png. a new village road built under the scheme",
  "images/General_Awareness/Geography/Transport_in_India/17.png": { t: "fig", about: "Two squares of equal size: left square with many road lines labelled High road density; right square with a few road lines labelled Low road density." },
  "images/General_Awareness/Geography/Transport_in_India/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian Railways train passing over bridge photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/18.png. an Indian passenger train",
  "images/General_Awareness/Geography/Transport_in_India/19.png": { t: "fig", about: "Horizontal timeline with three dots: 1853 Mumbai to Thane, 1854 Calcutta to Hooghly, 1856 Madras to Arcot." },
  "images/General_Awareness/Geography/Transport_in_India/20.png": { t: "fig", about: "Two parallel railway tracks: top track labelled Passenger trains, bottom track labelled Goods trains only, with a small clock showing faster." },
  "images/General_Awareness/Geography/Transport_in_India/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dedicated Freight Corridor goods train double stack container photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/21.png. a goods train on the corridor",
  "images/General_Awareness/Geography/Transport_in_India/22.png": { t: "fig", about: "Schematic, not a map: a big box labelled Railway Zone with an arrow down to three smaller boxes labelled Division 1, Division 2, Division 3." },
  "images/General_Awareness/Geography/Transport_in_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Churchgate railway station Mumbai building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/23.png. headquarters of Western Railway",
  "images/General_Awareness/Geography/Transport_in_India/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Darjeeling Himalayan Railway toy train photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/24.png. the toy train of Darjeeling",
  "images/General_Awareness/Geography/Transport_in_India/25.png": { t: "fig", about: "Three medal-like badges labelled Darjeeling, Kalka-Shimla, Nilgiri, each with the words UNESCO World Heritage." },
  "images/General_Awareness/Geography/Transport_in_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Palace on Wheels luxury tourist train photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/26.png. a luxury tourist train",
  "images/General_Awareness/Geography/Transport_in_India/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kolkata Metro train Esplanade station photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/27.png. the first metro of India",
  "images/General_Awareness/Geography/Transport_in_India/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kochi Water Metro boat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/28.png. a boat of the water metro",
  "images/General_Awareness/Geography/Transport_in_India/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mumbai Ahmedabad bullet train corridor viaduct photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/29.png. an elevated track of the bullet train project",
  "images/General_Awareness/Geography/Transport_in_India/30.png": { t: "fig", about: "Schematic, not a map: a straight line from Mumbai to Sabarmati with 12 dots labelled Mumbai, Thane, Virar, Boisar, Vapi, Bilimora, Surat, Bharuch, Vadodara, Anand, Ahmedabad, Sabarmati." },
  "images/General_Awareness/Geography/Transport_in_India/31.png": { t: "fig", about: "A long horizontal pipe from an oil field on the left to a refinery on the right, with a small label Crude oil flows and an arrow." },
  "images/General_Awareness/Geography/Transport_in_India/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"oil pipeline laid underground refinery India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/32.png. a pipeline near a refinery",
  "images/General_Awareness/Geography/Transport_in_India/33.png": { t: "fig", about: "Schematic, not a map: a line with dots labelled Jagdishpur, Bokaro, Dhamra, Haldia and a label Pradhan Mantri Urja Ganga pipeline carries piped natural gas." },
  "images/General_Awareness/Geography/Transport_in_India/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"cargo barge on river Ganga Varanasi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/34.png. a cargo barge on a river",
  "images/General_Awareness/Geography/Transport_in_India/35.png": { t: "fig", about: "Simple sum picture: a box labelled 5 existing waterways, a plus sign, a box labelled 106 new waterways, an equals sign, and a big box labelled 111 national waterways." },
  "images/General_Awareness/Geography/Transport_in_India/36.png": { t: "fig", about: "Five boxes in a row labelled NW-1 Ganga, NW-2 Brahmaputra, NW-3 Kerala canals, NW-4 Godavari and Krishna, NW-5 Odisha canals, with years under each box." },
  "images/General_Awareness/Geography/Transport_in_India/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Brahmaputra river Dibrugarh cargo ship photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/37.png. a ship on the Brahmaputra",
  "images/General_Awareness/Geography/Transport_in_India/38.png": { t: "fig", about: "Schematic, not a map: a left-to-right line with four dots labelled Kolkata, Sittwe, Paletwa, Zorinpui (Mizoram); the Sittwe to Paletwa part labelled Waterway 158 km and the Paletwa to Zorinpui part labelled Road 109 km." },
  "images/General_Awareness/Geography/Transport_in_India/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jawaharlal Nehru Port container terminal aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/39.png. a busy container port",
  "images/General_Awareness/Geography/Transport_in_India/40.png": { t: "fig", about: "Six small cards with an anchor icon: Mormugao Goa iron ore export; Cochin natural harbour shipyard; Visakhapatnam deepest port; Paradip deep lagoon-like port; Kolkata-Haldia riverine port; Kandla tidal port." },
  "images/General_Awareness/Geography/Transport_in_India/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Alang ship breaking yard Gujarat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/41.png. ships being broken at a yard",
  "images/General_Awareness/Geography/Transport_in_India/42.png": { t: "fig", about: "Schematic, not a map: a rough coast outline of India with dots for the 12 major ports in order from Kandla around to Kolkata, each with a short label." },
  "images/General_Awareness/Geography/Transport_in_India/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cochin Port Vembanad lake Kochi harbour photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/43.png. a harbour on a backwater",
  "images/General_Awareness/Geography/Transport_in_India/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ministry of Shipping Sagarmala port modernisation photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/44.png. a modern port",
  "images/General_Awareness/Geography/Transport_in_India/45.png": { t: "fig", about: "Four pillars with titles: Port modernisation, Port connectivity, Port-led industrialisation, Coastal community development." },
  "images/General_Awareness/Geography/Transport_in_India/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhupen Hazarika Setu Dhola Sadiya bridge Lohit river photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/46.png. the longest road bridge",
  "images/General_Awareness/Geography/Transport_in_India/47.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chenani Nashri tunnel Jammu Kashmir photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Transport_in_India/47.png. the longest road tunnel",
  "images/General_Awareness/Geography/Transport_in_India/48.png": { t: "fig", about: "Six small record cards with icons: Longest road bridge, Longest road tunnel, Longest rail route, Longest distance train, Largest container port, Highest airport." }
});

/* CHANGE LOG
   - Railway zones: Western Railway headquarters corrected to Churchgate, Mumbai (Chhatrapati Shivaji Maharaj Terminus is the headquarters of Central Railway); Allahabad is now Prayagraj; Sikanderabad corrected to Secunderabad.
   - Water metro: Kochi Water Metro was inaugurated in April 2023, not in 2016.
   - Bullet train: the Mumbai-Ahmedabad line uses Shinkansen (high-speed rail) technology, not Maglev; the station list uses Vapi (not Wani) and the line has 12 stations.
   - National waterway lengths corrected to the official figures (NW-3 about 205 km, NW-4 about 1,078 km, NW-5 about 623 km).
   - Kaladan project: place name corrected to Zorinpui. Willingdon Island spelling corrected.
   - Longest railway platform: Hubballi has held the record since 2023 (Gorakhpur held it earlier).
   - Ports: India has 13 major ports (12 government-owned and Ennore as a company-owned port); Jawaharlal Nehru Port is at Navi Mumbai.
   - Rail Transport: first train ran on 16 April 1853 between Bombay (Bori Bunder) and Thane.
   - Vague or outdated figures (road length by type, share of freight, hydro and bio-energy rankings) were left out or stated generally; the energy topics at the start of the source are outside this chapter.
*/