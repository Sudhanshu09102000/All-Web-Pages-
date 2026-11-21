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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Akbar_and_Jahangir · 13 concept pages (+ overview) · 31 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "AKBAR & JAHANGIR",
      line2: "THE GREAT MUGHALS",
      line3: "MEDIEVAL INDIA",
      badge: "FULL CLASS",
      ribbon: "NAVRATNAS • REFORMS • TRAPS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Akbar & Jahangir Full Class | Medieval India for SSC CGL",
      altTitles: ["Akbar Navratnas Din-e-Ilahi and Land Revenue in One Class", "Jahangir Noor Jahan and Foreign Visitors Made Easy"],
      description: "Akbar and Jahangir are among the most asked rulers in SSC CGL, Railways and Banking exams. In this simple class we move step by step from the Second Battle of Panipat to the death of Jahangir.\n\n📌 IN THIS CLASS\n✅ Akbar's conquests and Rajput policy\n✅ Navratnas and Din-e-Ilahi\n✅ Ain-e-Dahsala and Mansabdari\n✅ Jahangir, Noor Jahan and foreign visitors\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\nSee the chapter list below.\n\n👍 Like, share, subscribe.\n\n#SSCCGL #MedievalIndia #Mughals",
      tags: ["akbar", "jahangir", "noor jahan", "navratnas of akbar", "din-e-ilahi", "sulh-e-kul", "ibadat khana", "mansabdari system", "ain-e-dahsala", "todar mal", "battle of haldighati", "second battle of panipat", "fatehpur sikri", "mughal empire", "great mughals", "thomas roe hawkins", "medieval india", "ssc cgl history", "ssc cgl 2026", "general awareness", "indian history for ssc", "history mcq", "railway exam history", "banking exam gk", "static gk", "history tricks", "competitive exams", "previous year questions", "important questions", "one shot history", "A"],
      hashtags: ["SSCCGL", "MedievalIndia", "Mughals"],
      thumbText: "AKBAR + JAHANGIR",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏰 New class is live: Akbar and Jahangir. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Akbar early life\n00:00 Conquests of Akbar\n00:00 Navratnas\n00:00 Religious policy\n00:00 Land revenue and mansabdari\n00:00 Jahangir\n00:00 Books and dates",
      playlist: "Medieval India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Mughal emperors Akbar and Jahangir</u>. We will learn how Akbar built a strong empire, how he treated all religions, and how Jahangir ruled under the shadow of Noor Jahan.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>31</b><span>Questions</span></div>
        <div class="cp-stat"><b>~57 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Akbar's Early Life and Accession</b><br>How a boy of 13 became emperor, how Bairam Khan ruled for him and why the years after were called petticoat rule.</li>
        <li><b>Political Conquests of Akbar</b><br>The wars in Malwa, Rajasthan, Gujarat, Bengal, Kabul, Kashmir and the Deccan, with the year and ruler of each.</li>
        <li><b>The Navratnas</b><br>The nine gems of Akbar's court and what each is remembered for.</li>
        <li><b>Religious Policy of Akbar</b><br>Sulh-e-Kul, the Ibadat Khana, the Mahzar and the Din-e-Ilahi.</li>
        <li><b>Currency, Land Revenue, Art and Mansabdari</b><br>The Ain-e-Dahsala, land classes, Mughal painting, Fatehpur Sikri and the rank system.</li>
        <li><b>Jahangir (1605–1627)</b><br>His early life, the revolt of Khusrau, Noor Jahan, his wars and the foreign visitors.</li>
        <li><b>Important Books and Dates</b><br>The books of the age and the dates that exams love to mix up.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Akbar and Jahangir appear almost every year in SSC CGL, with questions on the Navratnas, the Din-e-Ilahi, Haldighati and the land revenue system.</div>
    `
  },
  2: {
    type: "concept", icon: "👶", accent: "#22c55e", pauseTimer: true,
    title: "Akbar (1556–1605): Early Life and Accession",
    html: `
      <p class="cp-lead"><b>Jalaluddin Muhammad Akbar</b> was born in <b>1542</b> at <b>Amarkot</b> in Sindh, in the house of <b>Rana Veersal</b>. His mother was <b>Hamida Bano Begum</b> and his father was <b>Humayun</b>. He later became Governor of <b>Ghazni</b> and then of <b>Punjab</b>, with <b>Bairam Khan</b> as his guardian.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/1.png" alt="Akbar Mughal emperor portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Akbar was crowned at <b>Kalanaur</b> (Gurdaspur, Punjab) in <b>February 1556</b>, on a brick throne, at the age of <b>13</b>. At that time <b>Hemu</b>, the prime minister of the Sur ruler <b>Adil Shah</b>, took Delhi and Agra.</p>
      <table><thead><tr><th>Event</th><th>Fact</th></tr></thead><tbody><tr><td>Birth</td><td>1542, Amarkot, house of Rana Veersal</td></tr><tr><td>Coronation</td><td>February 1556, Kalanaur, at the age of 13</td></tr><tr><td>Second Panipat</td><td>1556, Akbar against Hemu</td></tr><tr><td>Hemu's title</td><td>Vikramaditya (22 unbeaten battles)</td></tr><tr><td>Bairam Khan's title</td><td>Khan-e-Khana</td></tr></tbody></table>
      <p class="cp-lead">In the <b>Second Battle of Panipat (1556)</b> Hemu was struck by an arrow in the eye and fell from his <b>howdah</b> (the seat on the elephant). His army panicked and Akbar took Delhi and Agra. Hemu had earlier taken the title <b>Vikramaditya</b>, since he had won 22 battles.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/2.png" alt="Simple battle picture, schematic: an elephant with a howdah and a small arrow near the hea" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Bairam Khan</b>, titled <b>Khan-e-Khana</b>, ruled as regent from <b>1556 to 1560</b>. In <b>1561</b> he was sent to Mecca but was murdered at <b>Patan</b> by <b>Mubarak Khan</b>. Akbar then married his widow <b>Salima Begum</b>.</p>
      <p class="cp-lead">From <b>1560 to 1564</b> power was held by <b>Maham Anga</b> (his wet nurse), <b>Adham Khan</b> and <b>Jiji Anga</b>. This is called <b>petticoat (Parda) rule</b>. It ended with the execution of <b>Khawaja Muazzam</b> in <b>1564</b>. The Delhi governor of that time was <b>Shihabuddin</b>.</p>
      <div class="cp-note trap">Akbar was crowned in 1556 at Kalanaur and not at Delhi or Agra. He was only 13 years old.</div>
      <div class="cp-note exam">Remember Kalanaur, Hemu with the arrow in the eye, Bairam Khan as regent for four years and the Parda rule of 1560–64.</div>
    `
  },
  3: {
    questext: "In the Second Battle of Panipat in 1556, Akbar defeated",
    options: ["Muhammad Adil Shah", "Hemu", "Sikandar Sur", "Ibrahim Lodi"],
    correct: "2",
    exptext: "✅ Akbar's army defeated Hemu, who was the prime minister of Adil Shah. 📌 Hemu, the arrow and Panipat. ❌ Ibrahim Lodi is wrong because he was defeated by Babur in 1526."
  },
  4: {
    questext: "Bairam Khan, the regent of the young Akbar, was killed in 1561 at",
    options: ["Kalanaur", "Sirhind", "Patan", "Panipat"],
    correct: "3",
    exptext: "✅ Bairam Khan was murdered at Patan by Mubarak Khan on his way to Mecca. 📌 Patan sounds like the end of his power. ❌ Kalanaur is wrong because Akbar was crowned there."
  },
  5: {
    type: "concept", icon: "🏰", accent: "#f59e0b", pauseTimer: true,
    title: "Political Conquests of Akbar: Malwa, Rajasthan and Gondwana (1561–1573)",
    html: `
      <p class="cp-lead">Akbar began to take lands in Malwa and Rajasthan soon after he took control of the government. The Rajput states were a special target, and he used both force and marriage ties.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/3.png" alt="Chittorgarh Fort Rajasthan Vijay Stambh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1561–62</td><td>Malwa: Baz Bahadur, led by Adham Khan</td></tr><tr><td>1562</td><td>Amer: Raja Bharmal's daughter Harkhabai married Akbar; Merta: Jaimal Rathore fled to Rana Udai Singh of Mewar</td></tr><tr><td>1564</td><td>Gondwana (Garhkatanga): Rani Durgavati and her minor son Veer Narayan, led by Asaf Khan</td></tr><tr><td>1567–68</td><td>Mewar: Chittor fell in 1568; Udai Singh moved on to his new capital Udaipur</td></tr><tr><td>1569</td><td>Ranthambore (Surjan Rai) and Kalinjar (Raja Ramchandra)</td></tr><tr><td>1570</td><td>Marwar (Chandrasen), Bikaner (Kalyanmal), Jaisalmer (Harrai)</td></tr></tbody></table>
      <p class="cp-lead">In <b>Gondwana</b> (<b>Garhkatanga</b>) <b>Rani Durgavati</b> fought for her minor son <b>Veer Narayan</b> against the army led by <b>Asaf Khan</b>, and was killed in <b>1564</b>. In <b>Chittor (1568)</b> Akbar came in person. <b>Udai Singh</b> fought on from his new capital <b>Udaipur</b>. Akbar ordered a massacre. The heroes <b>Jaimal</b> and <b>Fatta</b> (Fateh Singh) were honoured with statues at the <b>Agra Fort</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/4.png" alt="Timeline with five boxes: 1562 Amer marriage, 1564 Gondwana Rani Durgavati, 1568 Chittor, " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>1572–73</b> he took <b>Gujarat</b> from <b>Muzaffar Shah III</b>. Akbar was invited by <b>Itmad Khan</b>, and <b>Mirza Aziz Koka</b> became governor. In 1573 he crushed a revolt by a quick return, and the historian <b>Smith</b> called it a <b>'historic rapid attack'</b>. This was the first Mughal contact with the <b>Portuguese</b>.</p>
      <div class="cp-note trap">Chittor fell in 1568, and Gujarat was taken in 1572–73. Do not swap the dates or say that Chittor was taken in 1572.</div>
      <div class="cp-note exam">Remember Gondwana and Rani Durgavati (1564), Chittor 1568, and the statues of Jaimal and Fatta at the Agra Fort.</div>
    `
  },
  6: {
    questext: "Rani Durgavati, who fought against the army of Akbar in 1564, was the ruler of",
    options: ["Mewar", "Malwa", "Gondwana (Garhkatanga)", "Gujarat"],
    correct: "3",
    exptext: "✅ Rani Durgavati ruled Gondwana (Garhkatanga) for her minor son Veer Narayan. 📌 Durga is the warrior goddess, so a warrior queen. ❌ Mewar is wrong because that was the kingdom of Udai Singh."
  },
  7: {
    questext: "Akbar captured the fort of Chittor in which year?",
    options: ["1556", "1568", "1576", "1582"],
    correct: "2",
    exptext: "✅ Chittor fell in 1568, after a long siege. 📌 Chittor 1568, Gujarat 1572. ❌ 1576 is wrong because that was the year of Haldighati."
  },
  8: {
    questext: "Consider the following statements about Akbar's early conquests:\n1. Harkhabai, daughter of Raja Bharmal of Amer, married Akbar in 1562.\n2. Chittor was captured in 1572.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because Harkhabai married Akbar in 1562. 📌 The marriage came first and Chittor six years later. ❌ Statement 2 is wrong because Chittor fell in 1568."
  },
  9: {
    type: "concept", icon: "🌍", accent: "#ef4444", pauseTimer: true,
    title: "Akbar's Conquests: Gujarat to the Deccan (1572–1601)",
    html: `
      <p class="cp-lead">After the Rajput wars Akbar looked to the east, the north-west and the south. By 1601 his empire reached from Kabul to Bengal and into the Deccan.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/5.png" alt="Buland Darwaza Fatehpur Sikri photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Conquest</th></tr></thead><tbody><tr><td>1572–73</td><td>Gujarat; Buland Darwaza built; sea first seen at Cambay</td></tr><tr><td>1574 and July 1576</td><td>Bihar and Bengal annexed</td></tr><tr><td>1581</td><td>Kabul: Hakim Mirza removed; later Kabul merged under Man Singh</td></tr><tr><td>1585–86</td><td>Kashmir: Raja Bhagwandas and Qasim Khan beat Yusuf Khan</td></tr><tr><td>1591</td><td>Sindh (Thatta): Abdurrahim Khankhana beat Janibeg</td></tr><tr><td>1593–1601</td><td>Deccan: Khandesh, Ahmednagar, Bijapur, Golconda</td></tr></tbody></table>
      <p class="cp-lead"><b>Bihar</b> was annexed in <b>1574</b> and <b>Bengal</b> in <b>July 1576</b>. In <b>1581</b> he removed his half-brother <b>Hakim Mirza</b> at <b>Kabul</b> and made his sister <b>Bakhtunnisa Begum</b> the governor. In <b>1585–86</b> he took <b>Kashmir</b>. In <b>1591</b> <b>Abdurrahim Khankhana</b> beat <b>Janibeg</b> in <b>Sindh (Thatta)</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/6.png" alt="Schematic, not a map: a ring of boxes around a centre labelled Agra: Kabul 1581 north-west" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Deccan</b> was the first Mughal campaign in the South (<b>1593–1601</b>). <b>Prince Murad</b> and <b>Khankhana</b> fought <b>Chandbibi</b> of <b>Ahmednagar</b>. The 1596 treaty gave <b>Berar</b> to the Mughals. Murad died of drink. <b>Asirgarh</b> was taken in 1601, as if it had been <b>'opened with a golden key'</b>. After the Deccan conquests, Akbar took the title <b>Emperor (Samrat)</b>.</p>
      <div class="cp-note trap">Chandbibi defended Ahmednagar against Mughals in the Deccan. Do not link her with the Rajput states.</div>
      <div class="cp-note exam">Remember Gujarat 1572–73 with the Buland Darwaza, Bengal 1576, Kabul 1581, Kashmir 1586 and the Deccan campaign of 1593–1601.</div>
    `
  },
  10: {
    questext: "The Buland Darwaza at Fatehpur Sikri was built to celebrate the conquest of",
    options: ["Bengal", "Malwa", "Kashmir", "Gujarat"],
    correct: "4",
    exptext: "✅ It marks Akbar's victory in Gujarat. 📌 Buland means high and Gujarat was a high prize. ❌ Bengal is wrong because it was taken later, in 1576."
  },
  11: {
    questext: "Chandbibi defended which Deccan kingdom against the Mughal army of Prince Murad?",
    options: ["Bijapur", "Golconda", "Ahmednagar", "Khandesh"],
    correct: "3",
    exptext: "✅ Chandbibi defended Ahmednagar, and the 1596 treaty gave Berar to the Mughals. 📌 Chandbibi and Ahmednagar go together. ❌ Bijapur is wrong because it was a separate Sultanate."
  },
  12: {
    type: "concept", icon: "🛡️", accent: "#8b5cf6", pauseTimer: true,
    title: "Haldighati and Akbar's Rajput Policy",
    html: `
      <p class="cp-lead">Maharana Pratap of Mewar never accepted Akbar's rule. The <b>Battle of Haldighati</b> in <b>1576</b> is the best-known fight between the two.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/7.png" alt="Maharana Pratap Haldighati battlefield memorial photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Man Singh</b> and <b>Asaf Khan</b> fought Pratap at <b>Haldighati</b> in <b>1576</b>. Pratap was beaten but he never submitted. The historian <b>Abul Fazl</b> called it the <b>'Battle of Khamnaur'</b>. Pratap's general was <b>Hakim Khan Sur</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Date</td><td>1576</td></tr><tr><td>Mughal side</td><td>Man Singh and Asaf Khan</td></tr><tr><td>Result</td><td>Pratap beaten, never submitted</td></tr><tr><td>Abul Fazl's name</td><td>Battle of Khamnaur</td></tr><tr><td>Pratap's capital</td><td>Moved from Udaipur to Kumbhalgarh; died stringing his bow</td></tr></tbody></table>
      <p class="cp-lead">Pratap shifted his capital from Udaipur to <b>Kumbhalgarh</b> and died while stringing his bow. His son <b>Amar Singh</b> also refused Akbar. A chain of guerrilla fighters followed: <b>Pratap, then Malik Ambar, then Shivaji, then Bajirao I</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/8.png" alt="Simple chain of four boxes labelled Pratap, Malik Ambar, Shivaji, Bajirao I, with the labe" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Akbar's marriages joined the Mughals with Rajput houses: <b>Harkhabai</b> of Amer, mother of <b>Salim</b>, and princesses of <b>Jodhpur</b> and <b>Jaisalmer</b>. His son Jahangir married the daughter of <b>Bhagwan Das</b>, and their son was <b>Khusrau</b>. His confidants were <b>Todar Mal, Raja Bhagwan Das</b> and <b>Man Singh</b>. Rajputs held over <b>20 percent</b> of army posts.</p>
      <div class="cp-note trap">At Haldighati the Mughal leader was Man Singh, a Rajput, and not Akbar himself. Pratap lost the battle but did not submit.</div>
      <div class="cp-note exam">Remember 1576, Man Singh and Asaf Khan, the name Khamnaur and Harkhabai as the mother of Salim.</div>
    `
  },
  13: {
    questext: "The Battle of Haldighati in 1576 was fought between Maharana Pratap and the Mughal army led by",
    options: ["Raja Todar Mal", "Birbal", "Abdurrahim Khankhana", "Man Singh"],
    correct: "4",
    exptext: "✅ The Mughal army was led by Man Singh and Asaf Khan. 📌 A Rajput led the army against a Rajput. ❌ Birbal is wrong because he was killed in the Yusufzai campaign."
  },
  14: {
    questext: "Abul Fazl called the Battle of Haldighati the Battle of",
    options: ["Khamnaur", "Kumbhalgarh", "Chittor", "Gogunda"],
    correct: "1",
    exptext: "✅ Abul Fazl named the battle Khamnaur. 📌 Haldighati is the common name, Khamnaur the writer's name. ❌ Kumbhalgarh is wrong because it was Pratap's later capital."
  },
  15: {
    type: "concept", icon: "💎", accent: "#14b8a6", pauseTimer: true,
    title: "Navratnas — the Nine Gems of Akbar",
    html: `
      <p class="cp-lead">Akbar's court had nine famous men, called the <b>Navratnas</b> (nine gems). Each was a master of his own field.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/9.png" alt="Navratnas Akbar court nine gems painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Gem</th><th>Identity and key facts</th></tr></thead><tbody><tr><td>Birbal</td><td>Brahmin of Kalpi, childhood name Maheshdas; orator and poet; the only Hindu to accept Din-e-Ilahi</td></tr><tr><td>Abul Fazal</td><td>Son of Sheikh Mubarak Nagori; wrote Ain-e-Akbari and Akbarnama; murdered by Salim</td></tr><tr><td>Todar Mal</td><td>Revenue minister; Zabti land reform; Diwan of Gujarat</td></tr><tr><td>Tansen</td><td>Music emperor of Gwalior, real name Ramtanu Pandey; Miyan ki Todi, Miyan ki Malhar</td></tr><tr><td>Man Singh</td><td>Kachchwaha Rajput, grandson of Raja Bharmal of Amer</td></tr><tr><td>Abdurrahim Khankhana</td><td>Son of Bairam Khan; titled Khankhana after Gujarat; translated the Baburnama into Persian</td></tr><tr><td>Faizi</td><td>Elder brother of Abul Fazal; court poet</td></tr><tr><td>Mullah Do Pyaza</td><td>Akbar's advisor</td></tr><tr><td>Hakim Humam</td><td>Head of the royal kitchen</td></tr></tbody></table>
      <p class="cp-lead"><b>Tansen</b>, whose real name was <b>Ramtanu Pandey</b>, was the music master of Akbar and created <b>Miyan ki Todi</b> and <b>Miyan ki Malhar</b>. <b>Birbal</b>, the childhood name <b>Maheshdas</b>, was the <b>only Hindu to accept Din-e-Ilahi</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/10.png" alt="Nine boxes in a three by three grid, each with a name and one word: Birbal wit, Abul Fazal" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Abul Fazl</b> wrote the <b>Ain-e-Akbari</b> (administration) and the <b>Akbarnama</b> (history). He was murdered by Salim. <b>Todar Mal</b> was the revenue minister and the man behind the <b>Zabti</b> reform.</p>
      <div class="cp-note trap">Abdurrahim Khankhana translated the Baburnama into Persian, and he was the son of Bairam Khan. Do not give his works to Abul Fazl.</div>
      <div class="cp-note exam">Remember Tansen with Miyan ki Malhar, Birbal as the only Hindu in Din-e-Ilahi, Todar Mal with revenue and Abul Fazl with the Ain-e-Akbari.</div>
    `
  },
  16: {
    questext: "Miyan ki Malhar, a famous raga, was created by which court musician of Akbar?",
    options: ["Baz Bahadur", "Abul Fazl", "Tansen", "Birbal"],
    correct: "3",
    exptext: "✅ Tansen created Miyan ki Malhar and Miyan ki Todi. 📌 Miyan was the name given by Akbar to Tansen. ❌ Baz Bahadur is wrong because he was a ruler of Malwa and a musician, but not of Akbar's court."
  },
  17: {
    questext: "Which of Akbar's Navratnas was the only Hindu to accept the Din-e-Ilahi?",
    options: ["Todar Mal", "Birbal", "Man Singh", "Bhagwan Das"],
    correct: "2",
    exptext: "✅ Birbal was the only Hindu who accepted the Din-e-Ilahi. 📌 Birbal and the Din-e-Ilahi both were close to Akbar's heart. ❌ Todar Mal is wrong because he refused it."
  },
  18: {
    questext: "Abdurrahim Khankhana, one of the Navratnas, was the son of",
    options: ["Humayun", "Adham Khan", "Maham Anga", "Bairam Khan"],
    correct: "4",
    exptext: "✅ Abdurrahim Khankhana was the son of Bairam Khan. 📌 Khan-e-Khana father, Khankhana son. ❌ Adham Khan is wrong because he was a son of Maham Anga."
  },
  19: {
    type: "concept", icon: "🕊️", accent: "#ec4899", pauseTimer: true,
    title: "Religious Policy of Akbar: Sulh-e-Kul, Ibadat Khana and Mahzar",
    html: `
      <p class="cp-lead">Akbar believed in <b>'Sulh-e-Kul'</b>, which means <b>universal tolerance</b> or peace with all. He wanted to rule all his people fairly, whatever their faith.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/11.png" alt="Ibadat Khana Fatehpur Sikri photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His ideas were shaped by <b>Bhakti and Sufi saints</b>, his mother <b>Hamida Bano</b>, <b>Bairam Khan</b>, his tutor <b>Abdul Latif</b>, <b>Shaikh Mubarak Nagori</b> and his sons <b>Abul Faizi</b> and <b>Abul Fazal</b>, and his Hindu wives.</p>
      <table><thead><tr><th>Year</th><th>Step</th></tr></thead><tbody><tr><td>1575</td><td>Ibadat Khana at Fatehpur Sikri, discussions on Thursdays</td></tr><tr><td>Later</td><td>Opened to all faiths: Hindus, Jains, Zoroastrians, Christians (Portuguese Jesuits)</td></tr><tr><td>1579</td><td>Mahzar issued by Sheikh Mubarak</td></tr><tr><td>Insan-e-Kamil</td><td>Akbar's aim</td></tr><tr><td>Imam-e-Adil</td><td>Title given by the Ulema</td></tr></tbody></table>
      <p class="cp-lead">In <b>1575</b> he built the <b>Ibadat Khana</b> (house of worship) at <b>Fatehpur Sikri</b>. At first only <b>Sunni</b> scholars came, and their quarrels displeased him. He then opened it to all faiths and gave churches to the Jesuits at <b>Lahore</b> and <b>Agra</b>. <b>8 of 12 Diwans</b> were Hindus.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/12.png" alt="Simple picture: a circular hall with discussion groups labelled Sunni Scholars, Hindus, Ja" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Mahzar</b> (1579) said that the ruler's own reading of the religious law is <b>final</b> in disputes. Akbar aimed to be <b>'Insan-e-Kamil'</b>, the perfect man. The Ulema called him <b>'Imam-e-Adil'</b>, a fair leader, and he called himself <b>'Amir-ul-Momineen'</b>.</p>
      <div class="cp-note trap">The Ibadat Khana was built in 1575 and the Mahzar was issued in 1579. Do not mix the two dates.</div>
      <div class="cp-note exam">Remember 1575 for the Ibadat Khana at Fatehpur Sikri, 1579 for the Mahzar and the role of Sheikh Mubarak.</div>
    `
  },
  20: {
    questext: "The Ibadat Khana, the house of worship of Akbar, was built in 1575 at",
    options: ["Fatehpur Sikri", "Agra", "Lahore", "Delhi"],
    correct: "1",
    exptext: "✅ It was built at Fatehpur Sikri. 📌 Fatehpur Sikri, Ibadat and Thursday. ❌ Agra is wrong because the Jesuits got a church there, but the hall was at Fatehpur Sikri."
  },
  21: {
    questext: "The Mahzar issued by Akbar in 1579 declared that",
    options: ["The decision of the Ulema is final", "Only the Quran is to be followed", "Jizya is to be restored", "The ruler's reading of religious disputes is final"],
    correct: "4",
    exptext: "✅ The Mahzar made the ruler's interpretation final in religious disputes. 📌 Mahzar and Akbar both settle a quarrel. ❌ The first option is wrong because the Mahzar took that power from the Ulema."
  },
  22: {
    type: "concept", icon: "☀️", accent: "#3b82f6", pauseTimer: true,
    title: "Din-e-Ilahi (1582)",
    html: `
      <p class="cp-lead">The <b>Din-e-Ilahi</b> (also called <b>Tauhid-e-Ilahi</b>) was announced by Akbar in <b>1582</b>. It was a <u>code of conduct and not a new religion</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/13.png" alt="Akbar Din-e-Ilahi court painting miniature" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Din-e-Ilahi was named so by <b>Badayuni</b> and <b>Abul Fazal</b>. The chief priest was <b>Abul Fazl</b>. A follower wore a turban with the words <b>'Allah-hu-Akbar'</b>. The greeting was <b>'Allah-hu-Akbar'</b>, and the reply was <b>'Jalle-Jalalahu'</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Year</td><td>1582</td></tr><tr><td>Other name</td><td>Tauhid-e-Ilahi</td></tr><tr><td>Head priest</td><td>Abul Fazl</td></tr><tr><td>Greeting</td><td>Allah-hu-Akbar, reply Jalle-Jalalahu</td></tr><tr><td>Only Hindu follower</td><td>Birbal</td></tr><tr><td>Refused</td><td>Todar Mal and Man Singh</td></tr><tr><td>Initiation</td><td>Sundays</td></tr></tbody></table>
      <p class="cp-lead">Its rules were public feasts, no meat on certain days and <b>no marriage with the very young or the very old</b>. <b>Birbal</b> was the only Hindu to accept it, while <b>Todar Mal</b> and <b>Man Singh</b> refused. In his reign <b>Bayazid Ansari</b> declared himself a prophet.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/14.png" alt="Simple timeline with four boxes: 1575 Ibadat Khana, 1579 Mahzar, 1582 Din-e-Ilahi, 1583 Il" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Din-e-Ilahi was a code of conduct, not a religion, and very few people joined it. Todar Mal and Man Singh refused it.</div>
      <div class="cp-note exam">Remember 1582, Abul Fazl as chief priest and Birbal as the only Hindu member.</div>
    `
  },
  23: {
    questext: "Consider the following statements about the Din-e-Ilahi:\n1. It was announced by Akbar in 1582.\n2. Todar Mal and Man Singh accepted it.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because Akbar announced it in 1582. 📌 1582 yes, but Todar Mal and Man Singh said no. ❌ Statement 2 is wrong because both refused it."
  },
  24: {
    questext: "Who was the chief priest of the Din-e-Ilahi?",
    options: ["Birbal", "Abul Fazl", "Faizi", "Badayuni"],
    correct: "2",
    exptext: "✅ Abul Fazl was the chief priest. 📌 Fazl was the thinker behind the new code. ❌ Birbal is wrong because he was only a follower, though the only Hindu one."
  },
  25: {
    type: "concept", icon: "🌾", accent: "#f97316", pauseTimer: true,
    title: "Akbar's Currency and Land Revenue",
    html: `
      <p class="cp-lead">Akbar made the land revenue system scientific. He fixed rates on the basis of land quality and past prices.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/15.png" alt="Mughal gold coin Akbar Ilahi coin photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>1580</b> the <b>Ain-e-Dahsala</b> was introduced by <b>Todar Mal</b> and <b>Muzaffar Khan</b>. It was Sher Shah's <b>Zabti</b> system, made more scientific by using the average of <b>10 years</b>.</p>
      <table><thead><tr><th>Land</th><th>Meaning</th></tr></thead><tbody><tr><td>Polaj</td><td>Cultivated every year</td></tr><tr><td>Parti</td><td>Polaj left fallow temporarily</td></tr><tr><td>Chachar</td><td>Uncultivated for 3 to 4 years</td></tr><tr><td>Banjar</td><td>Uncultivated for over 5 years</td></tr></tbody></table>
      <p class="cp-lead">Land was in four classes: <b>Polaj</b> (cultivated every year), <b>Parti</b> (left fallow for a while), <b>Chachar</b> (uncultivated 3–4 years) and <b>Banjar</b> (uncultivated over 5 years). Cultivators were <b>Khudkasht</b> (own village, owners called Malik-e-Zameen), <b>Pahikasht</b> (farmed in other villages) and <b>Mujariyan</b> (own land and rented land, also called Mujara).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/16.png" alt="Four boxes in a row: Polaj every year, Parti short fallow, Chachar 3-4 years, Banjar over " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Crori</b> officers collected <b>1 crore Daam</b> each across North India. The <b>Gaz-e-Ilahi</b> (1586–87, 41 Angul) replaced <b>Gaz-e-Sikandari</b>. <b>Patta and Kabuliyat</b> continued, while in the Deccan the <b>Hal</b> (ploughs) system was used. Under <b>Nabud</b>, land could be left uncultivated tax-free. Later <b>Shah Jahan</b> dropped Nabud for <b>Ijaradari</b>, and <b>Murshid Quli Khan</b> used Dahsala in the south and was called the <b>'Todarmal of the South'</b>.</p>
      <p class="cp-lead">In <b>1577</b> <b>Abdul Siraji</b> was made inspector of the <b>Delhi Mint</b>. The largest gold coin was the <b>Sansab</b> (over 100 tola), and the special <b>'Ram-Sita'</b> coins were engraved <b>'Ram-Siya'</b>. Gold coins were <b>Ilahi</b> (round, worth 10 rupees) and <b>Jalali</b> (square). <b>1 rupee = 40 Daam</b> under Akbar, but 64 under Sher Shah.</p>
      <div class="cp-note trap">One rupee was 40 Daam under Akbar and 64 under Sher Shah. Ilahi coins were round and Jalali were square.</div>
      <div class="cp-note exam">Remember 1580, the average of 10 years, the four land classes and 40 Daam to a rupee.</div>
    `
  },
  26: {
    questext: "The Ain-e-Dahsala, the ten-year revenue system of 1580, was designed by",
    options: ["Man Singh", "Birbal", "Todar Mal", "Faizi"],
    correct: "3",
    exptext: "✅ Todar Mal and Muzaffar Khan introduced the Ain-e-Dahsala. 📌 Todar Mal, revenue and Dahsala always go together. ❌ Man Singh is wrong because he was a general."
  },
  27: {
    questext: "In the land classes of Akbar, land that was cultivated every year was called",
    options: ["Polaj", "Parti", "Chachar", "Banjar"],
    correct: "1",
    exptext: "✅ Polaj was the land cultivated every year. 📌 Polaj is the land that is always ploughed. ❌ Banjar is wrong because it was land left for over five years."
  },
  28: {
    questext: "Under Akbar, one rupee was equal to how many Daam?",
    options: ["64", "40", "100", "20"],
    correct: "2",
    exptext: "✅ One rupee was equal to 40 Daam under Akbar. 📌 Akbar 40, Sher Shah 64. ❌ 64 is wrong because that was the rate of Sher Shah."
  },
  29: {
    type: "concept", icon: "🖼️", accent: "#84cc16", pauseTimer: true,
    title: "Art, Architecture and Mansabdari under Akbar",
    html: `
      <p class="cp-lead">Akbar's reign brought new buildings, new paintings and a new system of ranks for officers.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/17.png" alt="Fatehpur Sikri Panch Mahal Diwan-i-Khas photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He built the <b>Agra Fort</b> and <b>Fatehpur Sikri</b>, the Mughals' <b>first planned city</b>. At Fatehpur Sikri stands the <b>Buland Darwaza</b> (about <b>54 metres</b>), beside the tomb of <b>Sheikh Salim Chishti</b>. The <b>Diwan-i-Khas</b>, <b>Panch Mahal</b> and <b>Jodha Bai's palace</b> are also there.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Agra Fort</td><td>Built by Akbar</td></tr><tr><td>Fatehpur Sikri</td><td>First planned city of the Mughals</td></tr><tr><td>Painting</td><td>Hamzanama, Razmnama (Persian Mahabharata), Akbarnama</td></tr><tr><td>Music</td><td>Tansen, Abul Fazl, Abdurrahim Khankhana, Birbal</td></tr><tr><td>Mansabdari</td><td>Ranking system; ranks from 10 (dah) to 5,000; zat and sawar split in 1595</td></tr></tbody></table>
      <p class="cp-lead">In painting, the <b>Hamzanama</b>, the <b>Razmnama</b> (the Persian Mahabharata) and the <b>Akbarnama</b> were illustrated. <b>Mansabdari</b> was a ranking system, and mansabdars had both military and administrative duties.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/18.png" alt="Ladder picture with rungs from 10 (dah) at the bottom to 5000 at the top, each rung labell" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Ranks ran from <b>10 (dah) to 5,000</b>. The <b>zat</b> (personal rank) and <b>sawar</b> (cavalry) split came in <b>1595</b>.</p>
      <div class="cp-note trap">Fatehpur Sikri was the first planned city of the Mughals. Do not give this credit to Delhi or Agra.</div>
      <div class="cp-note exam">Remember Razmnama as the Persian Mahabharata, 5,000 as the highest rank and 1595 for the zat and sawar split.</div>
    `
  },
  30: {
    questext: "Which city was the first planned city of the Mughals?",
    options: ["Agra", "Delhi", "Lahore", "Fatehpur Sikri"],
    correct: "4",
    exptext: "✅ Fatehpur Sikri was the first planned city of the Mughals. 📌 Akbar planned it near the tomb of Sheikh Salim Chishti. ❌ Agra is wrong because it was an older city where Akbar built the fort."
  },
  31: {
    questext: "The Razmnama, translated under Akbar, is the Persian version of the",
    options: ["Mahabharata", "Ramayana", "Bhagavad Gita", "Panchatantra"],
    correct: "1",
    exptext: "✅ The Razmnama is the Persian Mahabharata. 📌 Razm means battle, so it is the book of the great war. ❌ Ramayana is wrong because that was translated separately."
  },
  32: {
    questext: "The split of the mansab into zat and sawar was made in which year?",
    options: ["1556", "1575", "1595", "1605"],
    correct: "3",
    exptext: "✅ The zat and sawar split came in 1595. 📌 Think of 1595 as just before the end of the century. ❌ 1575 is wrong because that is the year of the Ibadat Khana."
  },
  33: {
    type: "concept", icon: "👑", accent: "#06b6d4", pauseTimer: true,
    title: "Jahangir (1605–1627): Early Life and Khusrau's Revolt",
    html: `
      <p class="cp-lead"><b>Nuruddin Muhammad Jahangir Badshah Ghazi</b> was earlier called <b>Salim</b>. He was born in <b>August 1569</b> at <b>Fatehpur Sikri</b> and named after the saint <b>Sheikh Salim Chishti</b>. His mother was <b>Mariam Uzzamani</b> (<b>Harkhabai</b>), a princess of Jaipur (Amer).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/19.png" alt="Jahangir Mughal emperor portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>1605</b> <b>Akbar</b> crowned him himself, although the nobles <b>Raja Mansingh</b> and <b>Mirza Aziz Koka</b> had favoured Prince <b>Khusrau</b>.</p>
      <table><thead><tr><th>Event</th><th>Fact</th></tr></thead><tbody><tr><td>Birth</td><td>August 1569, Fatehpur Sikri</td></tr><tr><td>Mother</td><td>Mariam Uzzamani (Harkhabai)</td></tr><tr><td>Crowned</td><td>1605</td></tr><tr><td>Khusrau's revolt</td><td>1606: jailed in Agra Fort, escaped and revolted</td></tr><tr><td>Guru Arjun Dev</td><td>Fifth Sikh Guru, executed for backing Khusrau</td></tr><tr><td>Khusrau</td><td>Murdered later, buried at Allahabad</td></tr></tbody></table>
      <p class="cp-lead">In <b>1606</b> <b>Khusrau</b> was jailed in the Agra Fort, escaped and revolted. <b>Guru Arjun Dev</b>, the <b>fifth Sikh Guru</b>, backed him and was executed. This caused a lasting bitterness between the Sikhs and the Mughals. Khusrau was murdered later and buried at <b>Allahabad</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/20.png" alt="Simple flow: 1605 Jahangir crowned, 1606 Khusrau revolts, Guru Arjun Dev backs him, Guru A" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix Jahangir's mother with Akbar's mother. Jahangir's mother was Mariam Uzzamani (Harkhabai), and Akbar's mother was Hamida Bano.</div>
      <div class="cp-note exam">Remember 1605 for the crowning, 1606 for Khusrau's revolt, and Guru Arjun Dev as the Guru executed for backing him.</div>
    `
  },
  34: {
    questext: "Which Sikh Guru was executed in 1606 for supporting Prince Khusrau against Jahangir?",
    options: ["Guru Arjun Dev", "Guru Nanak", "Guru Hargobind", "Guru Tegh Bahadur"],
    correct: "1",
    exptext: "✅ Guru Arjun Dev, the fifth Guru, was executed in 1606. 📌 The fifth Guru and the fifth ruler of Hindustan in the early list. ❌ Guru Tegh Bahadur is wrong because he was executed later, under Aurangzeb."
  },
  35: {
    type: "concept", icon: "👸", accent: "#a855f7", pauseTimer: true,
    title: "Noor Jahan and the Wars of Jahangir",
    html: `
      <p class="cp-lead"><b>Noor Jahan</b> became the most powerful woman of the Mughal court. She married Jahangir in <b>1611</b>, and her family held great power for many years.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/21.png" alt="Noor Jahan Mughal empress portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Her first name was <b>Mehrunnisa</b>. Jahangir called her first <b>'Noormahal'</b> and then <b>'Noor Jahan'</b>, which means light of the world. Her father <b>Giyas Beg</b> became <b>Itmaduddaula</b>, her mother was <b>Asmat Begum</b> and her brother was <b>Asaf Khan</b>. They formed a clique, a close group, with <b>Khurram</b>. Later she backed <b>Shahriyar</b>, the husband of her daughter <b>Ladli Begum</b>, over Khurram, and she signed royal orders herself.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1605–1615</td><td>Mewar wars; Amar Singh surrendered in 1615</td></tr><tr><td>1617</td><td>Deccan treaty with Malik Ambar; Khurram got the title Shahjahan</td></tr><tr><td>1620</td><td>Kangra taken after a 4-month siege by Khurram</td></tr><tr><td>1622</td><td>Kandahar lost to Shah Abbas of Persia</td></tr><tr><td>1626</td><td>Malik Ambar died</td></tr></tbody></table>
      <p class="cp-lead">In <b>Mewar (1605–1615)</b> <b>Amar Singh</b> finally surrendered in <b>1615</b>. In <b>1620</b> Khurram took <b>Kangra</b> after a siege of <b>4 months</b>. In the South, <b>Malik Ambar</b>, the wazir of Ahmednagar, reorganised the state and used the rivalry of the Mughals. The <b>1617 treaty</b> was followed by gifts from the Bijapur ruler <b>Adil Shah</b>, who gave Khurram the title <b>'Farzand'</b>, and Khurram returned with the title <b>'Shahjahan'</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/22.png" alt="Timeline with five boxes: 1611 Noor Jahan marries, 1615 Mewar, 1617 Deccan treaty and Shah" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>1620</b> Malik Ambar broke the treaty and was crushed. In <b>1622</b> Khurram revolted and Ahmednagar slipped away, so <b>Mahabat Khan</b> was sent. Ambar died in <b>1626</b>. <b>Kandahar</b> was lost to <b>Shah Abbas</b> of Persia in <b>1622</b> and stayed Iranian for the rest of the reign.</p>
      <div class="cp-note trap">Noor Jahan is the only Mughal empress whose name appears on coins. She was not the wife of Akbar but of Jahangir.</div>
      <div class="cp-note exam">Remember Mehrunnisa, 1611, Itmaduddaula as her father, Kangra 1620 and Kandahar lost in 1622.</div>
    `
  },
  36: {
    questext: "Before her marriage to Jahangir in 1611, Noor Jahan was known as",
    options: ["Mumtaz Mahal", "Mehrunnisa", "Anarkali", "Ladli Begum"],
    correct: "2",
    exptext: "✅ Her first name was Mehrunnisa. 📌 Mehr means kindness, a soft name before the powerful title. ❌ Ladli Begum is wrong because that was her daughter."
  },
  37: {
    questext: "Which Mughal prince received the title Shahjahan after the Deccan campaign of 1617?",
    options: ["Khusrau", "Parviz", "Shahriyar", "Khurram"],
    correct: "4",
    exptext: "✅ Prince Khurram got the title Shahjahan. 📌 The same prince later ruled as Shah Jahan. ❌ Shahriyar is wrong because he was backed by Noor Jahan, against Khurram."
  },
  38: {
    questext: "Kandahar was lost by the Mughals to Persia in which year?",
    options: ["1622", "1605", "1615", "1627"],
    correct: "1",
    exptext: "✅ Shah Abbas of Persia took Kandahar in 1622. 📌 1622 was the year Khurram revolted. ❌ 1605 is wrong because that was the year of Jahangir's crowning."
  },
  39: {
    type: "concept", icon: "🌐", accent: "#e11d48", pauseTimer: true,
    title: "Jahangir: Religion, Foreign Visitors, Painting and Architecture",
    html: `
      <p class="cp-lead">Jahangir kept the policy of Sulh-e-Kul in public, but his reign also had some harsh acts. English and Dutch visitors came to ask for trade.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/23.png" alt="Sir Thomas Roe Jahangir durbar painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He abolished the <b>Din-e-Ilahi</b> but kept <b>Sulh-e-Kul</b>. He celebrated <b>Raksha Bandhan</b> in <b>1612</b>. At the same time he punished the Brahmins of <b>Rajouri</b> and the Jains of Gujarat, broke the <b>Varaha temple</b> at Ajmer and jailed the saint <b>Sheikh Ahmad Sirhindi</b>.</p>
      <table><thead><tr><th>Visitor</th><th>Fact</th></tr></thead><tbody><tr><td>Captain Hawkins</td><td>Carried King James I's letter, meant for Akbar who had died; spoke Persian; called 'English Khan'; Surat 1608, Agra 1609</td></tr><tr><td>Sir Thomas Roe</td><td>Sent by James I; won the farman for British trade at Surat in 1615</td></tr><tr><td>Francisco Pelsaert</td><td>Dutch visitor</td></tr><tr><td>Painters</td><td>Ustad Mansoor (Nadir-ul-Asr), Abul Hasan (Nadir-ul-Zaman), Bishan Das, Manohar, Goverdhan</td></tr></tbody></table>
      <p class="cp-lead"><b>Captain Hawkins</b> brought the letter of <b>King James I</b> to Akbar, who was already dead. He spoke <b>Persian</b> at court and was called <b>'English Khan'</b>. <b>Sir Thomas Roe</b>, also sent by James I, won the <b>farman</b> (royal order) for British trade at <b>Surat</b> in <b>1615</b>. <b>Francisco Pelsaert</b> from the Netherlands also visited.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/24.png" alt="Matching picture: left column Hawkins, Thomas Roe, Pelsaert, right column Surat 1608 and E" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His reign was the <b>golden age of Mughal painting</b>. <b>Ustad Mansoor</b> was called <b>Nadir-ul-Asr</b> (Wonder of the Age) and <b>Abul Hasan</b> was <b>Nadir-ul-Zaman</b> (Wonder of the Time). Other painters were <b>Bishan Das, Manohar</b> and <b>Goverdhan</b>. In architecture, <b>Akbar's tomb at Sikandra</b>, the <b>tomb of Itimad-ud-Daula</b> built by Noor Jahan, and the <b>Shalimar Bagh</b> gardens of Kashmir and Lahore belong to this period.</p>
      <p class="cp-lead">He died of alcohol addiction in <b>November 1627</b> at Bhimbar and was buried at <b>Shahdara</b> near Lahore, on the Ravi.</p>
      <div class="cp-note trap">Hawkins reached the court first (1608–09), and Roe came later (1615). Hawkins did not win trading rights. It was Roe who won the farman.</div>
      <div class="cp-note exam">Remember Hawkins as 'English Khan', Roe with the farman for Surat in 1615, and Ustad Mansoor as Nadir-ul-Asr.</div>
    `
  },
  40: {
    questext: "Sir Thomas Roe, the ambassador of King James I, won a farman from Jahangir in 1615 for English trade at",
    options: ["Calcutta", "Surat", "Madras", "Bombay"],
    correct: "2",
    exptext: "✅ The farman gave trading rights at Surat. 📌 Roe, 1615, Surat. ❌ Calcutta is wrong because it was founded much later."
  },
  41: {
    questext: "Which painter of Jahangir's court was given the title Nadir-ul-Asr?",
    options: ["Abul Hasan", "Bishan Das", "Manohar", "Ustad Mansoor"],
    correct: "4",
    exptext: "✅ Ustad Mansoor was Nadir-ul-Asr, the Wonder of the Age. 📌 Asr means age and Mansoor is the master of birds and animals. ❌ Abul Hasan is wrong because he was Nadir-ul-Zaman."
  },
  42: {
    type: "concept", icon: "📚", accent: "#10b981", pauseTimer: true,
    title: "Important Books and Dates of the Age",
    html: `
      <p class="cp-lead">Many exam questions ask you to match a book with its writer, or a date with an event. This page collects them.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/25.png" alt="Akbarnama manuscript painting Abul Fazl photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Muntakhab-ut-Tawarikh</td><td>Written by Badauni, critical of the reign</td></tr><tr><td>Ain-e-Akbari</td><td>Written by Abul Fazl; volume three of the Akbarnama</td></tr><tr><td>Tuzuk-i-Jahangiri (Jahangirnama)</td><td>Jahangir's memoir, in Persian</td></tr><tr><td>Zanjir-i-Adl</td><td>Golden Chain of Justice hung at the Agra Fort</td></tr><tr><td>Pilgrim tax</td><td>Abolished 1563</td></tr><tr><td>Jizya</td><td>Abolished 1564; Aurangzeb re-imposed it in 1679</td></tr></tbody></table>
      <p class="cp-lead"><b>Badauni</b> wrote the <b>Muntakhab-ut-Tawarikh</b>, which is critical of Akbar's reign. The <b>Ain-e-Akbari</b> is volume three of Abul Fazl's <b>Akbarnama</b>. Jahangir's memoir is the <b>Tuzuk-i-Jahangiri</b> (<b>Jahangirnama</b>), written in Persian. He hung a golden <b>Chain of Justice (Zanjir-i-Adl)</b> at the Agra Fort for petitioners.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/26.png" alt="Matching picture: left column Badauni, Abul Fazl, Jahangir; right column Muntakhab-ut-Tawa" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Akbar abolished the <b>pilgrim tax</b> in <b>1563</b> and the <b>Jizya</b> in <b>1564</b>. <b>Aurangzeb</b> re-imposed Jizya in <b>1679</b>. Jahangir also issued <b>zodiac-sign</b> gold and silver coins.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Akbar_and_Jahangir/27.png" alt="Timeline with six boxes: 1575 Ibadat Khana, 1579 Mahzar, 1580 Ain-e-Dahsala, 1582 Din-e-Il" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The dates are close together, so many students mix them: Ibadat Khana 1575, Mahzar 1579, Ain-e-Dahsala 1580, Din-e-Ilahi 1582, Ilahi Samvat 1583, Gaz-e-Ilahi 1586–87.</div>
      <div class="cp-note exam">Remember Badauni with the Muntakhab-ut-Tawarikh, Jahangir with the Tuzuk-i-Jahangiri, and 1563 and 1564 for the two taxes Akbar abolished.</div>
    `
  },
  43: {
    questext: "Akbar abolished the Jizya tax in which year?",
    options: ["1556", "1563", "1564", "1579"],
    correct: "3",
    exptext: "✅ He abolished the pilgrim tax in 1563 and Jizya in 1564. 📌 Pilgrim tax first, Jizya next. ❌ 1563 is wrong because that was the year of the pilgrim tax."
  },
  44: {
    questext: "The Golden Chain of Justice that Jahangir hung at the Agra Fort for petitioners was called",
    options: ["Diwan-i-Adl", "Sarai-i-Adl", "Zanjir-i-Adl", "Dar-ul-Adl"],
    correct: "3",
    exptext: "✅ The chain was called Zanjir-i-Adl. 📌 Zanjir means chain. ❌ Sarai-i-Adl is wrong because that was the cloth market of Alauddin Khilji."
  },
  45: {
    questext: "The Muntakhab-ut-Tawarikh, a history that was critical of Akbar's reign, was written by",
    options: ["Abul Fazl", "Badauni", "Faizi", "Abdul Latif"],
    correct: "2",
    exptext: "✅ Badauni wrote the Muntakhab-ut-Tawarikh. 📌 Badauni is the critic and Abul Fazl the praiser. ❌ Abul Fazl is wrong because he wrote the Akbarnama and the Ain-e-Akbari."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "the red sandstone Buland Darwaza of Fatehpur Sikri, a gold Mughal coin and a rolled painted manuscript" },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Akbar Mughal emperor portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/1.png. a painting of the Mughal emperor Akbar",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/2.png": { t: "fig", about: "Simple battle picture, schematic: an elephant with a howdah and a small arrow near the head labelled Hemu hit by arrow, with Akbar's army on one side and Hemu's army on the other." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chittorgarh Fort Rajasthan Vijay Stambh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/3.png. the fort of Chittor in Rajasthan",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/4.png": { t: "fig", about: "Timeline with five boxes: 1562 Amer marriage, 1564 Gondwana Rani Durgavati, 1568 Chittor, 1569 Ranthambore and Kalinjar, 1570 Marwar Bikaner Jaisalmer." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Buland Darwaza Fatehpur Sikri photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/5.png. the Buland Darwaza of Fatehpur Sikri, built after the Gujarat victory",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/6.png": { t: "fig", about: "Schematic, not a map: a ring of boxes around a centre labelled Agra: Kabul 1581 north-west, Kashmir 1586 north, Bengal 1576 east, Sindh 1591 south-west, Deccan 1593-1601 south." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Maharana Pratap Haldighati battlefield memorial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/7.png. the memorial at Haldighati in Rajasthan",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/8.png": { t: "fig", about: "Simple chain of four boxes labelled Pratap, Malik Ambar, Shivaji, Bajirao I, with the label Guerrilla chain above." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Navratnas Akbar court nine gems painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/9.png. a painting of Akbar's court with his courtiers",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/10.png": { t: "fig", about: "Nine boxes in a three by three grid, each with a name and one word: Birbal wit, Abul Fazal history, Todar Mal revenue, Tansen music, Man Singh army, Khankhana translator, Faizi poet, Mullah Do Pyaza advisor, Hakim Humam kitchen." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ibadat Khana Fatehpur Sikri photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/11.png. the building where the Ibadat Khana debates were held at Fatehpur Sikri",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/12.png": { t: "fig", about: "Simple picture: a circular hall with discussion groups labelled Sunni Scholars, Hindus, Jains, Zoroastrians, Jesuits, and a small Akbar in the centre." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Akbar Din-e-Ilahi court painting miniature\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/13.png. a miniature painting showing Akbar in discussion",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/14.png": { t: "fig", about: "Simple timeline with four boxes: 1575 Ibadat Khana, 1579 Mahzar, 1582 Din-e-Ilahi, 1583 Ilahi Samvat." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mughal gold coin Akbar Ilahi coin photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/15.png. a gold coin of Akbar",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/16.png": { t: "fig", about: "Four boxes in a row: Polaj every year, Parti short fallow, Chachar 3-4 years, Banjar over 5 years, each with a small field drawing." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fatehpur Sikri Panch Mahal Diwan-i-Khas photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/17.png. the Panch Mahal at Fatehpur Sikri",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/18.png": { t: "fig", about: "Ladder picture with rungs from 10 (dah) at the bottom to 5000 at the top, each rung labelled Mansab, and a side note: Zat is personal rank, Sawar is number of cavalry, split in 1595." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jahangir Mughal emperor portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/19.png. a painting of the Mughal emperor Jahangir",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/20.png": { t: "fig", about: "Simple flow: 1605 Jahangir crowned, 1606 Khusrau revolts, Guru Arjun Dev backs him, Guru Arjun Dev executed, Sikh-Mughal bitterness." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Noor Jahan Mughal empress portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/21.png. a painting of Noor Jahan",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/22.png": { t: "fig", about: "Timeline with five boxes: 1611 Noor Jahan marries, 1615 Mewar, 1617 Deccan treaty and Shahjahan title, 1620 Kangra, 1622 Kandahar lost." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sir Thomas Roe Jahangir durbar painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/23.png. a painting of Sir Thomas Roe at the court of Jahangir",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/24.png": { t: "fig", about: "Matching picture: left column Hawkins, Thomas Roe, Pelsaert, right column Surat 1608 and English Khan, Farman 1615, Dutch visitor, joined with lines." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Akbarnama manuscript painting Abul Fazl photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Akbar_and_Jahangir/25.png. a page from the Akbarnama",
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/26.png": { t: "fig", about: "Matching picture: left column Badauni, Abul Fazl, Jahangir; right column Muntakhab-ut-Tawarikh, Ain-e-Akbari, Tuzuk-i-Jahangiri; joined with lines." },
  "images/General_Awareness/Medieval_India/Akbar_and_Jahangir/27.png": { t: "fig", about: "Timeline with six boxes: 1575 Ibadat Khana, 1579 Mahzar, 1580 Ain-e-Dahsala, 1582 Din-e-Ilahi, 1583 Ilahi Samvat, 1586-87 Gaz-e-Ilahi." }
});

/* CHANGE LOG
   - The line about Jahangir celebrating the Kangra victory by slaughtering a cow is left out because it is not reliably supported.
   - Short forms such as c., PM, vs and etc. were written in full.
   - Percent signs and numbers such as 5th were written in words.
*/
