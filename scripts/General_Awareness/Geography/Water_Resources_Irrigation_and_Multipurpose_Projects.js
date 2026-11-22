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

/* Field: General_Awareness · Subject: Geography · Chapter: Water_Resources_Irrigation_and_Multipurpose_Projects · 15 concept pages (+ overview) · 33 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "💧", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Water Resources, Irrigation and Multipurpose Projects",
    thumb: {
      image: "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "FAST TRICKS",
      line2: "IRRIGATION & DAMS",
      line3: "MULTIPURPOSE PROJECTS",
      badge: "FULL CLASS",
      ribbon: "CANALS • DAMS • RIVER DISPUTES",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Irrigation, Dams and Multipurpose Projects | Geography Fast Class",
      altTitles: ["Major Canals and Dams of India With Rivers Trick", "River Water Disputes of India in One Class"],
      description: "Irrigation and multipurpose projects bring easy marks in Geography. In this full class we learn them step by step, from wells and canals to the big dams and river disputes.\n\n📌 IN THIS CLASS\n✅ Sources of irrigation and their shares\n✅ Major canals and the rivers that feed them\n✅ Drip, sprinkler and fertigation\n✅ Damodar, Bhakra Nangal, Hirakud, Tehri and Narmada projects\n✅ River water disputes\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Sources of irrigation\n00:00 Canals and modern methods\n00:00 Multipurpose projects\n00:00 River water disputes\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Geography #Irrigation",
      tags: ["irrigation in india", "multipurpose projects", "river valley projects", "dams of india", "major canals of india", "bhakra nangal dam", "hirakud dam", "tehri dam", "narmada valley project", "damodar valley project", "river water disputes", "drip irrigation", "kaveri river dispute", "india geography", "indian geography", "upsc geography", "ssc cgl geography", "general awareness", "static gk geography", "geography mcq", "important questions", "previous year questions", "competitive exams", "sardar sarovar dam", "polavaram project", "Water Resource"],
      hashtags: ["SSCCGL", "Geography", "Irrigation"],
      thumbText: "IRRIGATION & DAMS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "💧 New class is live: Irrigation, Dams and Multipurpose Projects. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Sources of irrigation\n00:00 Canals and modern methods\n00:00 Multipurpose projects\n00:00 River water disputes",
      playlist: "Competitive exams Geography — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how India waters its fields and how big dams are used</u>. We learn the sources of irrigation, the famous canals, the multipurpose projects and the river water disputes, because Geography papers ask them again and again.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>15</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>33</b><span>Questions</span></div>
        <div class="cp-stat"><b>~63 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Sources of Irrigation</b><br>How wells, tube wells, canals and ponds share the irrigated land of India, and which states depend on each one.</li>
        <li><b>Major Canals</b><br>Which canal takes its water from which river, and in which state it runs.</li>
        <li><b>Modern Methods of Irrigation</b><br>Drip irrigation, sprinkler irrigation and fertigation, and why they save water.</li>
        <li><b>Multipurpose Projects</b><br>What a multipurpose project is, and the dams of the Damodar, Sutlej, Mahanadi, Bhagirathi and Narmada rivers.</li>
        <li><b>Project and River Tables</b><br>A clear list of projects with their rivers and the states that gain from them.</li>
        <li><b>River Water Disputes</b><br>The main quarrels between states over the Kaveri, Krishna, Yamuna and Periyar rivers and the Sutlej-Yamuna Link Canal.</li>
        <li><b>Practice</b><br>Exam style questions with short explanations in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on dams, rivers and states are mostly matching questions, so learning each project with its river and state gives quick and sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "💧", accent: "#22c55e", pauseTimer: true,
    title: "Sources of Irrigation and Well and Tubewell Irrigation",
    html: `
      <p class="cp-lead">Irrigation means giving water to crops by human effort when rain is not enough. <u>In India, wells and tube wells give the biggest share of irrigation, and canals come second.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/1.png" alt="Four horizontal bars of different length: Wells and tube wells 61.58 percent, Canals 24.54" data-caption="A bar picture of how much irrigated land each source of water serves in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Source of irrigation</th><th>Share of total irrigated area</th></tr></thead><tbody><tr><td>Wells and tube wells</td><td>61.58 percent</td></tr><tr><td>Canals</td><td>24.54 percent</td></tr><tr><td>Ponds</td><td>2.97 percent</td></tr><tr><td>Other sources</td><td>10.91 percent</td></tr></tbody></table>
      <p class="cp-lead">Wells and tube wells are the main means of irrigation in Gujarat, Maharashtra, Punjab, Rajasthan and Uttar Pradesh. Uttar Pradesh has the highest number of tube wells, and they have spread most in the Saryupar plain.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/2.png" alt="tube well pump irrigating wheat field India photo" data-caption="A tube well pumping water into a field, the most common way of irrigating land in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Out of every 100 hectares of irrigated land, about 62 hectares get water from wells and tube wells and about 25 from canals.</div>
      <div class="cp-mnemonic">Wells win, canals come second, and ponds are last.</div>
      <div class="cp-note trap">Canals are only the second source of irrigation, even though they look more famous than wells.</div>
      <div class="cp-note exam">Remember the order of the four shares: 61.58, 24.54, 10.91 and 2.97 percent.</div>
    `
  },
  3: {
    questext: "Consider the following statements about irrigation in India:\n1. Wells and tube wells irrigate about 61.58 percent of the irrigated land.\n2. Canals are the second most important source of irrigation.\n3. Ponds irrigate more land than canals.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct, because wells and tube wells lead and canals follow. 📌 Wells first, canals second, ponds last. ❌ Statement 3 is wrong because ponds irrigate only 2.97 percent of the land."
  },
  4: {
    questext: "Which one of the following states has the highest number of tube wells in India?",
    options: ["Punjab", "Gujarat", "Maharashtra", "Uttar Pradesh"],
    correct: "4",
    exptext: "✅ Uttar Pradesh has the highest number of tube wells. 📌 Its tube wells are most spread in the Saryupar plain. ❌ Punjab is tempting because it is famous for irrigation, but it does not have the highest number."
  },
  5: {
    type: "concept", icon: "🚰", accent: "#f59e0b", pauseTimer: true,
    title: "Canal Irrigation",
    html: `
      <p class="cp-lead">A canal is a man-made channel that carries river water to the fields. <u>Canal irrigation is the second main means of irrigation in India, and it waters 24.54 percent of the irrigated land.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/3.png" alt="irrigation canal beside green farm fields India photo" data-caption="A canal carrying river water beside crop fields in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Canal irrigation is more common in northern India. Uttar Pradesh has the largest area irrigated by canals, and canals also serve Madhya Pradesh, Andhra Pradesh, Haryana, Punjab and Bihar.</p>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Share of irrigated land</td><td>24.54 percent</td></tr><tr><td>Rank among sources of irrigation</td><td>Second</td></tr><tr><td>Region where canals are more common</td><td>Northern India</td></tr><tr><td>State with the largest canal irrigated area</td><td>Uttar Pradesh</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/4.png" alt="Schematic, not a map: a large box for Uttar Pradesh in the middle, with smaller boxes for " data-caption="Uttar Pradesh leads in canal irrigation, and five other states also use canals widely." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A farmer in the plains of Uttar Pradesh who gets water from a canal belongs to the largest canal irrigated area of the country.</div>
      <div class="cp-note trap">Canals are second after wells and tube wells, so do not call canals the first source of irrigation.</div>
      <div class="cp-note exam">Questions ask which state has the largest canal irrigated area. The answer is Uttar Pradesh.</div>
    `
  },
  6: {
    questext: "In which one of the following states is the largest area irrigated through canals?",
    options: ["Uttar Pradesh", "Punjab", "Rajasthan", "Andhra Pradesh"],
    correct: "1",
    exptext: "✅ Uttar Pradesh has the largest canal irrigated area in the country. 📌 Uttar Pradesh leads in both tube wells and canals. ❌ Punjab is tempting because of its canal network, but its total area is smaller."
  },
  7: {
    questext: "Consider the following statements about canal irrigation in India:\n1. It is the second major means of irrigation.\n2. It is more common in northern India.\n3. Canals are the main means of irrigation in Gujarat, Maharashtra and Punjab.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 2 only", "1 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Canals are second and northern. ❌ Statement 3 is wrong because wells and tube wells are the main means in Gujarat, Maharashtra and Punjab."
  },
  8: {
    type: "concept", icon: "🛶", accent: "#ef4444", pauseTimer: true,
    title: "Major Canals of the Country",
    html: `
      <p class="cp-lead">Every canal takes its water from a river. <u>The river that feeds a canal is the fact that exams ask most often.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/5.png" alt="Four rows joining a canal to its river: Sirhind Canal to Sutlej, Upper Ganga Canal to Gang" data-caption="Four famous canals linked to the rivers or barrages that feed them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>State</th><th>Canal</th><th>River or source</th></tr></thead><tbody><tr><td>Punjab</td><td>Sirhind Canal</td><td>Sutlej River</td></tr><tr><td>Punjab</td><td>Nangal Dam Canal</td><td>Sutlej River</td></tr><tr><td>Punjab</td><td>Bhakra Canal</td><td>Sutlej River</td></tr><tr><td>Uttar Pradesh and Uttarakhand</td><td>Upper Ganga Canal</td><td>Ganga River near Haridwar</td></tr><tr><td>Uttar Pradesh and Uttarakhand</td><td>Lower Ganga Canal</td><td>Ganga River at Narora in Bulandshahr</td></tr><tr><td>Uttar Pradesh and Uttarakhand</td><td>Sharda Canal</td><td>Sharda River</td></tr><tr><td>Uttar Pradesh and Uttarakhand</td><td>Betwa Canal</td><td>Betwa River at Parichha near Jhansi</td></tr><tr><td>Rajasthan</td><td>Indira Gandhi Canal</td><td>Harike Barrage at the meeting point of the Sutlej and Beas rivers</td></tr><tr><td>Tamil Nadu</td><td>Mettur Project</td><td>Kaveri River</td></tr><tr><td>Kerala</td><td>Malampuzha Dam</td><td>Malampuzha River in the Malabar region</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/6.png" alt="Indira Gandhi Canal Rajasthan desert photo" data-caption="The Indira Gandhi Canal carrying river water through the dry land of Rajasthan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> If a question names the Harike Barrage, it is pointing to the Indira Gandhi Canal of Rajasthan.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/7.png" alt="Upper Ganga Canal Haridwar head photo" data-caption="The Upper Ganga Canal taking water from the Ganga River near Haridwar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Upper Ganga Canal starts near Haridwar, while the Lower Ganga Canal starts at Narora. Do not swap them.</div>
      <div class="cp-note exam">Punjab has three canals on the Sutlej, and the Indira Gandhi Canal starts at the Harike Barrage.</div>
    `
  },
  9: {
    questext: "Consider the following pairs of canal and its source:\n1. Sirhind Canal : Sutlej River\n2. Indira Gandhi Canal : Harike Barrage\n3. Upper Ganga Canal : Narora in Bulandshahr\nWhich of the pairs given above is/are correctly matched?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Upper Ganga starts near Haridwar. ❌ Pair 3 is wrong because Narora in Bulandshahr is the source of the Lower Ganga Canal."
  },
  10: {
    questext: "The Betwa Canal takes water from the Betwa River at Parichha, which is near which city?",
    options: ["Kanpur", "Agra", "Lalitpur", "Jhansi"],
    correct: "4",
    exptext: "✅ Parichha is near Jhansi. 📌 Betwa and Jhansi go together. ❌ Lalitpur is also on the Betwa River but it is not the place named for the Parichha source."
  },
  11: {
    questext: "Consider the following pairs of project and river:\n1. Mettur Project : Kaveri River\n2. Malampuzha Dam : Malampuzha River\n3. Sharda Canal : Ganga River\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Remember Mettur with Kaveri. ❌ Pair 3 is wrong because the Sharda Canal takes water from the Sharda River."
  },
  12: {
    type: "concept", icon: "🌊", accent: "#8b5cf6", pauseTimer: true,
    title: "Pond Irrigation",
    html: `
      <p class="cp-lead">A pond or tank holds rain water and river water so that farmers can use it later. <u>In India both natural and artificial ponds are used for irrigation, and they water about 2.97 percent of the irrigated land.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/8.png" alt="village pond tank irrigation Tamil Nadu photo" data-caption="A village tank in Tamil Nadu, where pond irrigation is most important." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Pond irrigation is most used in the peninsular states of Tamil Nadu, Karnataka, Telangana and Andhra Pradesh. Ponds are also used in Bihar, Madhya Pradesh and Rajasthan, and Tamil Nadu has the maximum pond irrigation.</p>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Share of irrigated land</td><td>2.97 percent</td></tr><tr><td>State with maximum pond irrigation</td><td>Tamil Nadu</td></tr><tr><td>Other peninsular states</td><td>Karnataka, Telangana and Andhra Pradesh</td></tr><tr><td>Other states using ponds</td><td>Bihar, Madhya Pradesh and Rajasthan</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/9.png" alt="Schematic, not a map: a large box for Tamil Nadu with a star, and four smaller boxes for K" data-caption="Tamil Nadu is the leading state for pond irrigation, followed by other southern states." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> In a dry southern district, a village stores monsoon rain in a tank and uses it for its fields after the rain stops.</div>
      <div class="cp-note trap">Pond irrigation is strongest in the south, so do not give the first place to Punjab or Uttar Pradesh.</div>
      <div class="cp-note exam">Remember pond irrigation with Tamil Nadu.</div>
    `
  },
  13: {
    questext: "Maximum irrigation through ponds in India takes place in which one of the following states?",
    options: ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana"],
    correct: "2",
    exptext: "✅ Tamil Nadu has the maximum pond irrigation. 📌 Pond with Tamil Nadu. ❌ Karnataka, Andhra Pradesh and Telangana also use ponds widely, but Tamil Nadu is first."
  },
  14: {
    questext: "Consider the following statements about pond irrigation in India:\n1. About 2.97 percent of the irrigated land is watered through ponds.\n2. It is most used in the peninsular states.\n3. Ponds irrigate more land than canals.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Ponds are the smallest main source. ❌ Statement 3 is wrong because canals irrigate 24.54 percent, which is far more than ponds."
  },
  15: {
    type: "concept", icon: "🌱", accent: "#14b8a6", pauseTimer: true,
    title: "Modern Methods of Irrigation",
    html: `
      <p class="cp-lead">Modern methods use water carefully, so that very little is wasted. <u>Three methods to learn are drip irrigation, sprinkler irrigation and fertigation.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/10.png" alt="Three panels: Drip irrigation with drops falling beside plant roots, Sprinkler irrigation " data-caption="Three modern irrigation methods shown side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Method</th><th>How it works</th><th>Fact to remember</th></tr></thead><tbody><tr><td>Drip irrigation</td><td>Water falls drop by drop near the plant roots</td><td>Believed to have been invented by Israel</td></tr><tr><td>Sprinkler irrigation</td><td>Water is sprayed over the crop under pressure like fountains or rain drops</td><td>Water spreads all around the field</td></tr><tr><td>Fertigation</td><td>Fertilisers are mixed with the irrigation water</td><td>Modern discovery came from Israel</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/11.png" alt="drip irrigation pipe plant roots photo" data-caption="A drip irrigation pipe giving water drop by drop at the base of a plant." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Fertigation gives the best use of both water and fertilisers, because the fertilisers used are fully soluble and do not react with water.</p>
      <div class="cp-example"><b>Example:</b> A farmer who feeds the plants through the same pipe that waters them, with fertiliser dissolved in the water, is using fertigation.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/12.png" alt="sprinkler irrigation field spraying water photo" data-caption="A sprinkler spraying water over a crop field like gentle rain." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Drip irrigation gives water at the roots, while sprinkler irrigation sprays water over the whole crop.</div>
      <div class="cp-note exam">All three modern methods are linked with Israel in exam questions.</div>
    `
  },
  16: {
    questext: "Which one of the following methods of irrigation mixes fertilisers with the irrigation water?",
    options: ["Fertigation", "Drip irrigation", "Sprinkler irrigation", "Canal irrigation"],
    correct: "1",
    exptext: "✅ Fertigation mixes fertilisers with water. 📌 Fertilisers plus irrigation makes fertigation. ❌ Drip irrigation is tempting, but it only describes how the water is delivered."
  },
  17: {
    questext: "Consider the following statements about modern irrigation methods:\n1. Drip irrigation is believed to have been invented by Israel.\n2. In sprinkler irrigation, water is sprayed on the crop under pressure.\n3. In fertigation, the fertilisers used must be insoluble in water.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1, 2 and 3", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Israel and drip go together. ❌ Statement 3 is wrong because fertigation uses fertilisers that dissolve fully in water and do not react with it."
  },
  18: {
    type: "concept", icon: "🏗️", accent: "#ec4899", pauseTimer: true,
    title: "Multipurpose Projects",
    html: `
      <p class="cp-lead">A multipurpose project is a big dam project that serves many needs at the same time. <u>Jawaharlal Nehru, the first Prime Minister of India, called such projects the temples of modern India.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/13.png" alt="large dam spillway gates water release India photo" data-caption="A large dam releasing water through its gates, the kind of structure built in multipurpose projects." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Purpose</th><th>What it gives</th></tr></thead><tbody><tr><td>Irrigation</td><td>Water for crops</td></tr><tr><td>Hydropower</td><td>Electricity from falling water</td></tr><tr><td>Flood control</td><td>Protection of towns and fields</td></tr><tr><td>Drinking water</td><td>Water supply for people</td></tr><tr><td>Boating and fisheries</td><td>Fish and water travel</td></tr><tr><td>Conservation and tourism</td><td>Safe soil, wildlife and visitors</td></tr></tbody></table>
      <p class="cp-lead">Because one dam can do all these jobs together, the money spent on it gives many benefits, and that is why the projects are called multipurpose.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/14.png" alt="A dam in the centre with six labelled arrows going out: irrigation, hydropower, flood cont" data-caption="One dam in the middle serving many purposes at the same time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> One dam can store water for farms in summer, make electricity all year and hold back flood water in the rainy season.</div>
      <div class="cp-note trap">Multipurpose does not mean only irrigation. Irrigation is just one of the many purposes.</div>
      <div class="cp-note exam">The phrase temples of modern India always points to Jawaharlal Nehru.</div>
    `
  },
  19: {
    questext: "Who described the multipurpose projects as the temples of modern India?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Rajendra Prasad"],
    correct: "2",
    exptext: "✅ Jawaharlal Nehru called multipurpose projects the temples of modern India. 📌 Nehru and temples of modern India go together. ❌ Mahatma Gandhi is tempting because of the many sayings linked with him, but this one belongs to Nehru."
  },
  20: {
    questext: "Which one of the following is NOT a purpose of a multipurpose project?",
    options: ["Manufacture of steel", "Flood control", "Hydropower generation", "Fisheries"],
    correct: "1",
    exptext: "✅ Making steel is not a purpose of a dam project. 📌 Dams serve water, power, floods, fish, soil and tourism. ❌ Flood control, hydropower and fisheries are all listed purposes."
  },
  21: {
    type: "concept", icon: "🌿", accent: "#3b82f6", pauseTimer: true,
    title: "Damodar Valley Project",
    html: `
      <p class="cp-lead">This is the first multipurpose project of independent India. <u>Dams have been built on the Damodar River and on its tributaries Barakar, Konar and Bokaro.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/15.png" alt="Maithon dam Damodar Valley photo" data-caption="A dam of the Damodar Valley Project, the first multipurpose project of independent India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The project was planned on the model of the Tennessee Valley Project of the United States. It is spread over the states of Jharkhand and West Bengal, and the Damodar River is also called the Sorrow of Bengal because it used to flood.</p>
      <table><thead><tr><th>Feature</th><th>Answer</th></tr></thead><tbody><tr><td>Rank</td><td>First multipurpose project of independent India</td></tr><tr><td>Model</td><td>Tennessee Valley Project of the United States</td></tr><tr><td>States</td><td>Jharkhand and West Bengal</td></tr><tr><td>Major dams</td><td>Tilaiya, Maithon, Konar and Panchet Hill</td></tr><tr><td>Thermal power houses</td><td>Bokaro, Durgapur and Chandrapura</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/16.png" alt="Schematic, not a map: the Damodar River in the middle with tributaries Barakar, Konar and " data-caption="The Damodar River, its three tributaries and the four main dams of the project." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks for the first multipurpose project of independent India wants the Damodar Valley Project.</div>
      <div class="cp-note trap">Hirakud and Bhakra are also famous projects, but the first project of independent India is the Damodar Valley Project.</div>
      <div class="cp-note exam">Remember the model, the two states and the dam names Tilaiya, Maithon, Konar and Panchet Hill.</div>
    `
  },
  22: {
    questext: "Consider the following statements about the Damodar Valley Project:\n1. It is the first multipurpose project of independent India.\n2. It was planned on the model of the Tennessee Valley Project of the United States.\n3. It is spread over the states of Jharkhand and Odisha.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Damodar means first and Tennessee model. ❌ Statement 3 is wrong because the project is spread over Jharkhand and West Bengal, not Odisha."
  },
  23: {
    questext: "Which one of the following dams is NOT a part of the Damodar Valley Project?",
    options: ["Tilaiya", "Maithon", "Panchet Hill", "Hirakud"],
    correct: "4",
    exptext: "✅ Hirakud is on the Mahanadi River in Odisha. 📌 Tilaiya, Maithon, Konar and Panchet Hill belong to the Damodar. ❌ Tilaiya, Maithon and Panchet Hill are all dams of the Damodar Valley Project."
  },
  24: {
    type: "concept", icon: "🛶", accent: "#f97316", pauseTimer: true,
    title: "Polavaram Irrigation Project",
    html: `
      <p class="cp-lead">The Polavaram project is built on the <b>Godavari River</b> in Andhra Pradesh. <u>It is disputed among four states: Odisha, Chhattisgarh, Telangana and Andhra Pradesh.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/17.png" alt="Polavaram project Godavari river dam site photo" data-caption="The Polavaram project site on the Godavari River in Andhra Pradesh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Answer</th></tr></thead><tbody><tr><td>River</td><td>Godavari</td></tr><tr><td>Main state</td><td>Andhra Pradesh</td></tr><tr><td>States in the dispute</td><td>Odisha, Chhattisgarh, Telangana and Andhra Pradesh</td></tr></tbody></table>
      <p class="cp-lead">The dispute arises because the Godavari flows through many states, so a big dam in one state can affect land and water in the others.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/18.png" alt="Four boxes around a central dam: Odisha, Chhattisgarh, Telangana and Andhra Pradesh, each " data-caption="Four states joined by one project and one dispute on the Godavari River." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> When a question asks which river carries the Polavaram project, the answer is the Godavari and not the Krishna.</div>
      <div class="cp-note trap">Do not confuse the Godavari of Polavaram with the Krishna of Nagarjuna Sagar and Almatti.</div>
      <div class="cp-note exam">Remember Polavaram with Godavari and with four disputing states.</div>
    `
  },
  25: {
    questext: "The Polavaram Irrigation Project is built on which one of the following rivers?",
    options: ["Krishna", "Godavari", "Mahanadi", "Kaveri"],
    correct: "2",
    exptext: "✅ The Polavaram project is on the Godavari River. 📌 Polavaram and Godavari both begin with a strong P and G sound. ❌ Krishna is tempting because Nagarjuna Sagar in the same region is on the Krishna."
  },
  26: {
    questext: "The Polavaram Irrigation Project is disputed among which of the following states?",
    options: ["Odisha, Chhattisgarh, Telangana and Andhra Pradesh", "Karnataka, Kerala, Tamil Nadu and Puducherry", "Punjab, Haryana, Delhi and Rajasthan", "Gujarat, Maharashtra, Madhya Pradesh and Rajasthan"],
    correct: "1",
    exptext: "✅ The dispute is among Odisha, Chhattisgarh, Telangana and Andhra Pradesh. 📌 These are the Godavari states. ❌ Option 2 lists the states of the Kaveri dispute, which is a different river."
  },
  27: {
    type: "concept", icon: "🏔️", accent: "#84cc16", pauseTimer: true,
    title: "Bhakra Nangal Project",
    html: `
      <p class="cp-lead">The Bhakra Nangal Project is built on the <b>Sutlej River</b> and is the largest multipurpose project of the country. <u>Bhakra Dam is the highest gravity dam in India and one of the highest in the world.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/19.png" alt="Bhakra Dam Govind Sagar reservoir photo" data-caption="The huge Bhakra Dam wall holding back the Govind Sagar reservoir on the Sutlej River." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Answer</th></tr></thead><tbody><tr><td>River</td><td>Sutlej</td></tr><tr><td>Type of dam</td><td>Gravity dam</td></tr><tr><td>Lake behind the dam</td><td>Govind Sagar in Himachal Pradesh</td></tr><tr><td>States that gain</td><td>Delhi, Himachal Pradesh, Punjab, Haryana and Rajasthan</td></tr></tbody></table>
      <p class="cp-lead">A gravity dam stays in place by its own heavy weight, and the lake behind it is called Govind Sagar.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/20.png" alt="A dam wall on the Sutlej River with the lake Govind Sagar behind it and five labels for th" data-caption="Bhakra Dam, its lake and the five states that gain from the project." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Water stored in Govind Sagar lets farms in Punjab, Haryana and Rajasthan get water even when the river is low.</div>
      <div class="cp-note trap">The lake Govind Sagar lies in Himachal Pradesh, not in Punjab.</div>
      <div class="cp-note exam">Remember Bhakra Nangal with the Sutlej, Govind Sagar and five gaining states.</div>
    `
  },
  28: {
    questext: "The lake created behind the Bhakra Dam is called which one of the following?",
    options: ["Hirakud", "Swami Ramtirtha Sagar", "Govind Sagar", "Nagarjuna Sagar"],
    correct: "3",
    exptext: "✅ Govind Sagar is the lake behind the Bhakra Dam. 📌 Govind Sagar with Bhakra. ❌ Swami Ramtirtha Sagar is the lake of the Tehri Dam, not of Bhakra."
  },
  29: {
    questext: "Consider the following statements about the Bhakra Nangal Project:\n1. It is built on the Sutlej River.\n2. Rajasthan is one of the states that gain from the project.\n3. The lake behind the dam lies in Punjab.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1, 2 and 3", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Sutlej, Govind Sagar and five states. ❌ Statement 3 is wrong because Govind Sagar lies in Himachal Pradesh."
  },
  30: {
    type: "concept", icon: "🏞️", accent: "#06b6d4", pauseTimer: true,
    title: "Hirakud Project",
    html: `
      <p class="cp-lead">The Hirakud Project is built on the <b>Mahanadi River</b> in Odisha. <u>Hirakud Dam is about 26 kilometres long with its dykes, and it is the longest dam in India.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/21.png" alt="Hirakud Dam Sambalpur Odisha aerial photo" data-caption="The long Hirakud Dam stretching across the Mahanadi River in Odisha." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Answer</th></tr></thead><tbody><tr><td>River</td><td>Mahanadi</td></tr><tr><td>State</td><td>Odisha</td></tr><tr><td>Special fact</td><td>One of the longest earthen dams in the world</td></tr></tbody></table>
      <p class="cp-lead">An earthen dam is built mostly of soil and rock, and it can be made very long across a wide valley.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/22.png" alt="A very long horizontal dam drawn across a river with the labels Mahanadi River, Odisha and" data-caption="Hirakud Dam is shown as a very long dam across the Mahanadi River." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks which river carries the longest dam of India wants the Mahanadi and the Hirakud Dam.</div>
      <div class="cp-note trap">Hirakud is famous for its length, while Tehri is famous for its height. Do not swap them.</div>
      <div class="cp-note exam">Remember Hirakud with Mahanadi, Odisha and length.</div>
    `
  },
  31: {
    questext: "Consider the following statements about the Hirakud Project:\n1. It is built on the Mahanadi River in Odisha.\n2. Hirakud Dam is one of the longest earthen dams in the world.\n3. It is built on the Godavari River.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 2 only", "1 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Hirakud means length and Mahanadi. ❌ Statement 3 is wrong because the Godavari carries the Polavaram project."
  },
  32: {
    type: "concept", icon: "⛰️", accent: "#a855f7", pauseTimer: true,
    title: "Tehri Dam Project",
    html: `
      <p class="cp-lead">The Tehri Dam stands in Uttarakhand at the meeting point of the <b>Bhagirathi and Bhilangana rivers</b>. <u>It is the highest dam in India.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/23.png" alt="Tehri Dam Uttarakhand reservoir photo" data-caption="The Tehri Dam and its large lake in the hills of Uttarakhand." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Answer</th></tr></thead><tbody><tr><td>Meeting point of rivers</td><td>Bhagirathi and Bhilangana</td></tr><tr><td>Earthquake zone</td><td>Zone V</td></tr><tr><td>Reservoir</td><td>Swami Ramtirtha Sagar</td></tr><tr><td>Safety concern</td><td>Considered weak from the earthquake point of view</td></tr></tbody></table>
      <p class="cp-lead">Zone V is the most earthquake prone zone of India, so a dam built there needs special care, and that is why people worry about its safety.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/24.png" alt="A dam between two joining rivers labelled Bhagirathi and Bhilangana, with a lake named Swa" data-caption="The Tehri Dam at the meeting point of two rivers, in the most earthquake prone zone." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that mentions Zone V and the Bhilangana River is pointing to the Tehri Dam.</div>
      <div class="cp-note trap">Swami Ramtirtha Sagar belongs to Tehri, while Govind Sagar belongs to Bhakra. Do not swap the two lakes.</div>
      <div class="cp-note exam">Remember Tehri with Bhagirathi, Bhilangana, Zone V and Swami Ramtirtha Sagar.</div>
    `
  },
  33: {
    questext: "The reservoir built behind the Tehri Dam has been named which one of the following?",
    options: ["Govind Sagar", "Gandhi Sagar", "Swami Ramtirtha Sagar", "Indira Sagar"],
    correct: "3",
    exptext: "✅ The Tehri reservoir is called Swami Ramtirtha Sagar. 📌 Tehri with Ramtirtha. ❌ Govind Sagar is tempting, but it is the lake of the Bhakra Dam."
  },
  34: {
    questext: "Consider the following statements about the Tehri Dam:\n1. It stands at the meeting point of the Bhagirathi and Bhilangana rivers.\n2. It has been built in Zone V of the earthquake zones.\n3. It is located in Himachal Pradesh.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Tehri is in the hills of Uttarakhand. ❌ Statement 3 is wrong because the dam is in Uttarakhand, and Himachal Pradesh has the Bhakra lake."
  },
  35: {
    type: "concept", icon: "🌅", accent: "#e11d48", pauseTimer: true,
    title: "Narmada Valley Project",
    html: `
      <p class="cp-lead">The Narmada Valley Project has two famous dams on the <b>Narmada River</b>. <u>The Sardar Sarovar Dam is in Gujarat and the Narmada Sagar Dam is in Madhya Pradesh.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/25.png" alt="Sardar Sarovar Dam Narmada river Gujarat photo" data-caption="The Sardar Sarovar Dam on the Narmada River in Gujarat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Dam</th><th>State</th><th>River</th></tr></thead><tbody><tr><td>Sardar Sarovar Dam</td><td>Gujarat</td><td>Narmada</td></tr><tr><td>Narmada Sagar Dam</td><td>Madhya Pradesh</td><td>Narmada</td></tr></tbody></table>
      <p class="cp-lead">The Sardar Sarovar Project is a joint project of four states: Madhya Pradesh, Gujarat, Maharashtra and Rajasthan.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/26.png" alt="Four state boxes joined to the Sardar Sarovar Project on the Narmada River: Madhya Pradesh" data-caption="The four states that share the Sardar Sarovar Project." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> When a question asks which river has the Sardar Sarovar and Narmada Sagar dams, the answer is the Narmada.</div>
      <div class="cp-note trap">Sardar Sarovar is in Gujarat and Narmada Sagar is in Madhya Pradesh, so do not swap the two states.</div>
      <div class="cp-note exam">Remember four partner states: Madhya Pradesh, Gujarat, Maharashtra and Rajasthan.</div>
    `
  },
  36: {
    questext: "The Sardar Sarovar Dam has been built in which one of the following states?",
    options: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Gujarat"],
    correct: "4",
    exptext: "✅ The Sardar Sarovar Dam is in Gujarat on the Narmada River. 📌 Sardar Sarovar and Gujarat go together. ❌ Madhya Pradesh is tempting because the Narmada Sagar Dam is there, but that is the other dam."
  },
  37: {
    questext: "Consider the following statements about the Narmada Valley Project:\n1. The Sardar Sarovar Dam and the Narmada Sagar Dam have been built on the Narmada River.\n2. The Sardar Sarovar Project is a joint project of Madhya Pradesh, Gujarat, Maharashtra and Rajasthan.\n3. The Narmada Sagar Dam is in Gujarat.\nWhich of the statements given above is/are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Four states share Sardar Sarovar. ❌ Statement 3 is wrong because the Narmada Sagar Dam is in Madhya Pradesh."
  },
  38: {
    type: "concept", icon: "🗂️", accent: "#10b981", pauseTimer: true,
    title: "Major Multipurpose Projects of India (Part 1)",
    html: `
      <p class="cp-lead">Each project is learned with its river and with the states that gain from it. <u>This first table covers eight projects of the south, the centre and the east.</u></p>
      <table><thead><tr><th>Project</th><th>River</th><th>Beneficiary state</th></tr></thead><tbody><tr><td>Nagarjuna Sagar Project</td><td>Krishna River</td><td>Andhra Pradesh and Telangana</td></tr><tr><td>Pochampad Project</td><td>Godavari River</td><td>Telangana</td></tr><tr><td>Idukki (Periyar) Project</td><td>Periyar River</td><td>Kerala</td></tr><tr><td>Bansagar Project</td><td>Son River</td><td>Bihar, Uttar Pradesh and Madhya Pradesh</td></tr><tr><td>Tilaiya Project</td><td>Barakar River</td><td>Jharkhand</td></tr><tr><td>Almatti Dam Project</td><td>Krishna River</td><td>Andhra Pradesh, Karnataka and Maharashtra</td></tr><tr><td>Rihand Project</td><td>Rihand River</td><td>Uttar Pradesh</td></tr><tr><td>Gandhi Sagar Dam</td><td>Chambal River</td><td>Madhya Pradesh</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/27.png" alt="Eight rows joining a project to its river: Nagarjuna Sagar to Krishna, Pochampad to Godava" data-caption="Eight projects joined to the rivers on which they are built." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Two projects stand on the Krishna River, which are Nagarjuna Sagar and Almatti. Two projects carry the name of their own river, which are Idukki on the Periyar and Rihand on the Rihand River.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/28.png" alt="Nagarjuna Sagar Dam Krishna river photo" data-caption="The Nagarjuna Sagar Dam across the Krishna River." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks for the project that serves Bihar, Uttar Pradesh and Madhya Pradesh wants the Bansagar Project on the Son River.</div>
      <div class="cp-note trap">Do not give the Chambal to Bansagar or the Son to Gandhi Sagar. Gandhi Sagar is on the Chambal and Bansagar is on the Son.</div>
      <div class="cp-note exam">Remember the two Krishna projects: Nagarjuna Sagar and Almatti.</div>
    `
  },
  39: {
    questext: "Consider the following pairs of project and river:\n1. Nagarjuna Sagar Project : Krishna River\n2. Pochampad Project : Krishna River\n3. Idukki Project : Periyar River\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 and 3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Pairs 1 and 3 are correct. 📌 Pochampad goes with the Godavari. ❌ Pair 2 is wrong because the Pochampad Project is on the Godavari River."
  },
  40: {
    questext: "The Gandhi Sagar Dam is built on which one of the following rivers?",
    options: ["Betwa", "Chambal", "Son", "Rihand"],
    correct: "2",
    exptext: "✅ The Gandhi Sagar Dam is on the Chambal River in Madhya Pradesh. 📌 Gandhi Sagar with Chambal. ❌ Betwa is tempting because it also flows in Madhya Pradesh, but it carries the Matatila Dam."
  },
  41: {
    questext: "Which one of the following projects benefits Bihar, Uttar Pradesh and Madhya Pradesh?",
    options: ["Rihand Project", "Tilaiya Project", "Gandhi Sagar Dam", "Bansagar Project"],
    correct: "4",
    exptext: "✅ The Bansagar Project on the Son River serves all three states. 📌 Bansagar means three states. ❌ Rihand is tempting because it is also near the Son area, but it serves only Uttar Pradesh."
  },
  42: {
    type: "concept", icon: "🗺️", accent: "#eab308", pauseTimer: true,
    title: "Major Multipurpose Projects of India (Part 2)",
    html: `
      <p class="cp-lead">This second table covers eight more projects, from the north and the west and the islands. <u>Learn the river first, and the state will follow.</u></p>
      <table><thead><tr><th>Project</th><th>River</th><th>Beneficiary state</th></tr></thead><tbody><tr><td>Mettur Project</td><td>Kaveri River</td><td>Tamil Nadu</td></tr><tr><td>Kakrapar Project</td><td>Tapti River</td><td>Gujarat</td></tr><tr><td>Ranjeet Sagar (Thein) Dam Project</td><td>Ravi River</td><td>Punjab</td></tr><tr><td>Pong Dam Project</td><td>Beas River</td><td>Himachal Pradesh</td></tr><tr><td>Dulhasti Project</td><td>Chenab River</td><td>Jammu and Kashmir</td></tr><tr><td>Koyna Project</td><td>Koyna River</td><td>Maharashtra</td></tr><tr><td>Matatila Dam</td><td>Betwa River</td><td>Uttar Pradesh and Madhya Pradesh</td></tr><tr><td>Kalpong Dam</td><td>Kalpong River</td><td>Andaman and Nicobar Islands</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/29.png" alt="Eight rows joining a project to its river: Mettur to Kaveri, Kakrapar to Tapti, Ranjeet Sa" data-caption="Eight projects joined to the rivers on which they are built." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In the north, the Ranjeet Sagar Dam is on the Ravi, the Pong Dam is on the Beas and the Dulhasti Project is on the Chenab.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/30.png" alt="Pong Dam Beas river Himachal Pradesh lake photo" data-caption="The wide lake behind the Pong Dam on the Beas River in Himachal Pradesh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question that asks which project of Jammu and Kashmir is on the Chenab River wants the Dulhasti Project.</div>
      <div class="cp-note trap">The Pong Dam is on the Beas and the Ranjeet Sagar Dam is on the Ravi. Do not swap the two northern rivers.</div>
      <div class="cp-note exam">Remember Kakrapar with Tapti and Gujarat, and Koyna with Maharashtra.</div>
    `
  },
  43: {
    questext: "Consider the following pairs of project and river:\n1. Kakrapar Project : Tapti River\n2. Ranjeet Sagar Dam Project : Ravi River\n3. Pong Dam Project : Chenab River\nWhich of the pairs given above is/are correctly matched?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Pong goes with the Beas. ❌ Pair 3 is wrong because the Pong Dam is on the Beas River and the Chenab carries the Dulhasti Project."
  },
  44: {
    questext: "The Dulhasti Project has been built on which one of the following rivers?",
    options: ["Chenab", "Ravi", "Beas", "Sutlej"],
    correct: "1",
    exptext: "✅ The Dulhasti Project is on the Chenab River in Jammu and Kashmir. 📌 Dulhasti and Chenab. ❌ Ravi and Beas are tempting because they carry the Ranjeet Sagar and Pong dams."
  },
  45: {
    questext: "The Matatila Dam, which benefits Uttar Pradesh and Madhya Pradesh, is built on which river?",
    options: ["Chambal", "Betwa", "Son", "Kalpong"],
    correct: "2",
    exptext: "✅ The Matatila Dam is on the Betwa River. 📌 Matatila goes with Betwa. ❌ Kalpong is tempting because of the table, but the Kalpong Dam is in the Andaman and Nicobar Islands."
  },
  46: {
    type: "concept", icon: "⚖️", accent: "#0ea5e9", pauseTimer: true,
    title: "Some Major Inter-State River Water Disputes",
    html: `
      <p class="cp-lead">A river water dispute begins when states that share one river quarrel over how its water should be used. <u>The main ones to learn are the Kaveri, Krishna, Yamuna, Periyar and Sutlej-Yamuna Link disputes.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/31.png" alt="Five boxes in a column, each with a dispute and its states: Kaveri with Karnataka, Tamil N" data-caption="Five river water disputes with the states that take part in each one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Dispute</th><th>States involved</th><th>Main issue</th></tr></thead><tbody><tr><td>Kaveri river water dispute</td><td>Puducherry, Karnataka, Tamil Nadu and Kerala</td><td>Sharing of river water</td></tr><tr><td>Krishna river water dispute</td><td>Telangana, Andhra Pradesh, Karnataka and Maharashtra</td><td>Height of the Almatti Dam</td></tr><tr><td>Yamuna river water dispute</td><td>Uttar Pradesh, Haryana and Delhi</td><td>Hathnikund barrage in Haryana</td></tr><tr><td>Periyar river water dispute</td><td>Tamil Nadu and Kerala</td><td>Height of the Mullaperiyar Dam</td></tr><tr><td>Sutlej-Yamuna Link Canal dispute</td><td>Punjab and Haryana</td><td>Canal water</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/32.png" alt="Mullaperiyar dam Kerala Tamil Nadu photo" data-caption="The Mullaperiyar Dam on the Periyar River, which Tamil Nadu and Kerala dispute." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> A question about the height of the Almatti Dam is pointing to the Krishna river water dispute.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/33.png" alt="Krishna river Almatti dam reservoir photo" data-caption="The Almatti Dam on the Krishna River, whose height is at the centre of the Krishna dispute." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">Kaveri has four parties, Krishna has four states, Yamuna has three, and Periyar and Sutlej-Yamuna Link have two each.</div>
      <div class="cp-note trap">The Periyar dispute is only between Tamil Nadu and Kerala, so do not add Karnataka, which belongs to the Kaveri and Krishna disputes.</div>
      <div class="cp-note exam">Questions often ask which dam or project is linked with which dispute.</div>
    `
  },
  47: {
    questext: "The dispute over the height of the Almatti Dam is related to which one of the following rivers?",
    options: ["Kaveri", "Yamuna", "Krishna", "Periyar"],
    correct: "3",
    exptext: "✅ The Almatti Dam dispute belongs to the Krishna River. 📌 Almatti and Krishna. ❌ Kaveri is tempting because Karnataka is involved in both, but the Almatti Dam is on the Krishna."
  },
  48: {
    questext: "Consider the following pairs of river water dispute and the states involved:\n1. Mullaperiyar Dam dispute : Tamil Nadu and Kerala\n2. Sutlej-Yamuna Link Canal dispute : Punjab and Haryana\n3. Hathnikund barrage dispute : Karnataka and Maharashtra\nWhich of the pairs given above is/are correctly matched?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Pairs 1 and 2 are correct. 📌 Mullaperiyar is the Periyar dispute. ❌ Pair 3 is wrong because the Hathnikund dispute is among Uttar Pradesh, Haryana and Delhi."
  },
  49: {
    questext: "Which one of the following Union Territories is a party to the Kaveri river water dispute?",
    options: ["Delhi", "Chandigarh", "Ladakh", "Puducherry"],
    correct: "4",
    exptext: "✅ Puducherry is a party to the Kaveri dispute, along with Karnataka, Tamil Nadu and Kerala. 📌 Kaveri has a Union Territory too. ❌ Delhi is tempting because it is a party to the Yamuna dispute, not the Kaveri."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a tall curved concrete dam with water falling from its gates, a flowing canal between green fields, and a drop of water" },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/1.png": { t: "fig", about: "Four horizontal bars of different length: Wells and tube wells 61.58 percent, Canals 24.54 percent, Other sources 10.91 percent, Ponds 2.97 percent." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tube well pump irrigating wheat field India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/2.png. a tube well watering a field",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"irrigation canal beside green farm fields India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/3.png. a canal running beside crop fields",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/4.png": { t: "fig", about: "Schematic, not a map: a large box for Uttar Pradesh in the middle, with smaller boxes for Madhya Pradesh, Andhra Pradesh, Haryana, Punjab and Bihar around it." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/5.png": { t: "fig", about: "Four rows joining a canal to its river: Sirhind Canal to Sutlej, Upper Ganga Canal to Ganga at Haridwar, Sharda Canal to Sharda, Indira Gandhi Canal to Harike Barrage." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indira Gandhi Canal Rajasthan desert photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/6.png. a long canal in the desert",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Upper Ganga Canal Haridwar head photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/7.png. the canal near Haridwar",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"village pond tank irrigation Tamil Nadu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/8.png. a village tank",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/9.png": { t: "fig", about: "Schematic, not a map: a large box for Tamil Nadu with a star, and four smaller boxes for Karnataka, Telangana, Andhra Pradesh and Bihar." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/10.png": { t: "fig", about: "Three panels: Drip irrigation with drops falling beside plant roots, Sprinkler irrigation with water spraying like rain, Fertigation with a fertiliser tank joined to a water pipe." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"drip irrigation pipe plant roots photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/11.png. water drops at the base of a plant",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sprinkler irrigation field spraying water photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/12.png. water sprayed over a crop",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"large dam spillway gates water release India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/13.png. a big dam releasing water",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/14.png": { t: "fig", about: "A dam in the centre with six labelled arrows going out: irrigation, hydropower, flood control, drinking water, fisheries and boating, soil and wildlife conservation." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Maithon dam Damodar Valley photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/15.png. a dam on the Damodar river system",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/16.png": { t: "fig", about: "Schematic, not a map: the Damodar River in the middle with tributaries Barakar, Konar and Bokaro joining it, and dam labels Tilaiya, Maithon, Konar and Panchet Hill." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Polavaram project Godavari river dam site photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/17.png. the dam site on the Godavari",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/18.png": { t: "fig", about: "Four boxes around a central dam: Odisha, Chhattisgarh, Telangana and Andhra Pradesh, each joined to the Polavaram Project on the Godavari River." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhakra Dam Govind Sagar reservoir photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/19.png. the huge dam wall and lake",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/20.png": { t: "fig", about: "A dam wall on the Sutlej River with the lake Govind Sagar behind it and five labels for the gaining states: Delhi, Himachal Pradesh, Punjab, Haryana, Rajasthan." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hirakud Dam Sambalpur Odisha aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/21.png. the long dam across the Mahanadi",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/22.png": { t: "fig", about: "A very long horizontal dam drawn across a river with the labels Mahanadi River, Odisha and Longest dam in India." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tehri Dam Uttarakhand reservoir photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/23.png. the tall dam and its lake",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/24.png": { t: "fig", about: "A dam between two joining rivers labelled Bhagirathi and Bhilangana, with a lake named Swami Ramtirtha Sagar and a warning mark Zone V earthquake zone." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sardar Sarovar Dam Narmada river Gujarat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/25.png. the giant dam on the Narmada",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/26.png": { t: "fig", about: "Four state boxes joined to the Sardar Sarovar Project on the Narmada River: Madhya Pradesh, Gujarat, Maharashtra and Rajasthan." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/27.png": { t: "fig", about: "Eight rows joining a project to its river: Nagarjuna Sagar to Krishna, Pochampad to Godavari, Idukki to Periyar, Bansagar to Son, Tilaiya to Barakar, Almatti to Krishna, Rihand to Rihand, Gandhi Sagar to Chambal." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nagarjuna Sagar Dam Krishna river photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/28.png. the dam across the Krishna",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/29.png": { t: "fig", about: "Eight rows joining a project to its river: Mettur to Kaveri, Kakrapar to Tapti, Ranjeet Sagar to Ravi, Pong to Beas, Dulhasti to Chenab, Koyna to Koyna, Matatila to Betwa, Kalpong to Kalpong." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pong Dam Beas river Himachal Pradesh lake photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/30.png. the lake behind the Pong Dam",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/31.png": { t: "fig", about: "Five boxes in a column, each with a dispute and its states: Kaveri with Karnataka, Tamil Nadu, Kerala and Puducherry; Krishna with Telangana, Andhra Pradesh, Karnataka and Maharashtra; Yamuna with Uttar Pradesh, Haryana and Delhi; Periyar with Tamil Nadu and Kerala; Sutlej-Yamuna Link with Punjab and Haryana." },
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mullaperiyar dam Kerala Tamil Nadu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/32.png. the old dam in the hills",
  "images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Krishna river Almatti dam reservoir photo\". Download a clear, suitable photo and save it as images/General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects/33.png. the dam on the Krishna"
});

/* CHANGE LOG
   - Wrote Maithon for the dam that was spelt Methan.
   - Corrected the second Matatila Dam row to the Kalpong Dam on the Kalpong River in the Andaman and Nicobar Islands.
   - Bhakra Dam is described as the highest gravity dam in India and one of the highest in the world, not simply the world's highest.
   - Hirakud Dam is described as one of the longest earthen dams in the world and the longest dam in India.
   - Wrote the river Beas instead of Vyas for the Pong Dam, and wrote Jammu and Kashmir in full.
   - Hathnikund is described as a barrage in Haryana without the words under construction.
   - Added that the Tehri Dam is in Uttarakhand and is the highest dam in India, and that the Damodar River is called the Sorrow of Bengal.
*/
