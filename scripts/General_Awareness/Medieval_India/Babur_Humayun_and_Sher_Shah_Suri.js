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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Babur_Humayun_and_Sher_Shah_Suri · 13 concept pages (+ overview) · 31 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "BABUR HUMAYUN",
      line2: "SHER SHAH SURI",
      line3: "MEDIEVAL INDIA",
      badge: "FULL CLASS",
      ribbon: "BATTLES • REFORMS • TRAPS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Babur, Humayun & Sher Shah Suri Full Class | Medieval India SSC CGL",
      altTitles: ["Battles of Babur and Humayun in One Class", "Sher Shah Suri Administration and Reforms Made Easy"],
      description: "Babur, Humayun and Sher Shah Suri are a sure shot topic in SSC CGL, Railways and Banking exams. In this simple class we move step by step from the First Battle of Panipat to the fall of the Sur empire.\n\n📌 IN THIS CLASS\n✅ Babur and his four great battles\n✅ Baburnama and Babur's legacy\n✅ Humayun's problems, exile and return\n✅ Sher Shah Suri's campaigns and administration\n✅ Purana Qila and the fall of the Surs\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\nSee the chapter list below.\n\n👍 Like, share, subscribe.\n\n#SSCCGL #MedievalIndia #Mughals",
      tags: ["babur", "humayun", "sher shah suri", "sur dynasty", "first battle of panipat", "battle of khanwa", "battle of chausa", "battle of kannauj", "baburnama", "mughal empire", "early mughals", "sher shah reforms", "grand trunk road", "medieval india", "ssc cgl history", "ssc cgl 2026", "general awareness", "indian history for ssc", "history mcq", "railway exam history", "banking exam gk", "static gk", "history tricks", "humayun tomb", "purana qila", "competitive exams", "previous year questions", "important questions", "one shot history", "Medieval_India MCQ"],
      hashtags: ["SSCCGL", "MedievalIndia", "Mughals"],
      thumbText: "BABUR + HUMAYUN + SHER SHAH",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏰 New class is live: Babur, Humayun and Sher Shah Suri. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Babur\n00:00 Babur's battles\n00:00 Baburnama and legacy\n00:00 Humayun\n00:00 Sher Shah Suri\n00:00 Sher Shah's administration\n00:00 Architecture and fall of the Surs",
      playlist: "Medieval India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on Babur, Humayun and Sher Shah Suri</u>. We will follow how the Mughal rule began in 1526, how it was lost in 1540, and how it came back in 1555.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>31</b><span>Questions</span></div>
        <div class="cp-stat"><b>~57 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Babur (1526–1530)</b><br>Who Babur was, why he came to India and how his early life shaped him.</li>
        <li><b>Babur's Battles in India</b><br>Panipat, Khanwa, Chanderi and Ghagra, with the date, the opponent and the result of each.</li>
        <li><b>Babur's Legacy and the Baburnama</b><br>What Babur gave India and why his autobiography is important.</li>
        <li><b>Humayun (1530–1540 and 1555–1556)</b><br>His early problems, his wars with Bahadur Shah and Sher Khan, his years in exile and his return.</li>
        <li><b>Sher Shah Suri and the Sur Dynasty</b><br>How Farid became Sher Shah and what he won in only five years.</li>
        <li><b>Sher Shah's Administration</b><br>His six departments, his land revenue system, his roads and his coins.</li>
        <li><b>Architecture and Fall of the Surs</b><br>The Purana Qila, the tomb at Sasaram and how the Sur empire broke up.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> the battles of Panipat, Khanwa, Chausa and Kannauj, and the reforms of Sher Shah, appear almost every year in SSC CGL, so each date and name here is worth remembering.</div>
    `
  },
  2: {
    type: "concept", icon: "🦅", accent: "#22c55e", pauseTimer: true,
    title: "Babur (1526–1530)",
    html: `
      <p class="cp-lead"><b>Zahiruddin Muhammad Babur</b> founded the <b>Mughal dynasty</b> in India. <u>He came to India only after he had lost his dream of ruling Central Asia.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/1.png" alt="Babur Mughal emperor portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He was born in <b>1483</b> at <b>Fergana</b> (today in Uzbekistan). His father came from the line of <b>Timur</b>, who had invaded India in 1398, and his mother came from the line of <b>Genghis Khan</b>. The dynasty is called Mughal, which comes from the word Mongol, and it is linked to <b>Chagatai</b>, the second son of Genghis Khan.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1483</td><td>Born at Fergana</td></tr><tr><td>1494</td><td>Became ruler of Fergana at the age of 11</td></tr><tr><td>1501</td><td>Held Samarkand for about 8 months</td></tr><tr><td>1504</td><td>Took Kabul and Ghazni</td></tr><tr><td>1507</td><td>Took the title Padshah (earlier Mirza)</td></tr></tbody></table>
      <p class="cp-lead">He became ruler of Fergana at the age of <b>11</b> in <b>1494</b>. He loved <b>Samarkand</b>, Timur's capital, but he held it for only about 8 months. The <b>Uzbeks</b> defeated him and pushed him from Central Asia towards India. He took <b>Kabul</b> and <b>Ghazni</b> in <b>1504</b> and the title <b>Padshah</b> in <b>1507</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/2.png" alt="Simple timeline with five boxes: 1483 Born at Fergana, 1494 Ruler at age 11, 1504 Kabul, 1" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His first Indian campaign was in <b>1518–19</b> against the <b>Yusufzais</b> at <b>Bajaur</b> and <b>Bhera</b>. The <b>Khyber Pass</b> was crossed in <b>1519</b> to reach Peshawar. In <b>1520</b> he retook both places, and also <b>Sialkot</b> and <b>Syedpur</b>. In <b>1524</b> <b>Daulat Khan</b>, the Governor of Punjab, invited him through his son <b>Dilawar Khan</b>. <b>Rana Sanga</b> is also said to have invited him at the same time.</p>
      <div class="cp-note trap">Babur was not the first to enter India. His first campaign was in 1518–19, while the decisive battle came in 1526.</div>
      <div class="cp-note exam">Remember Fergana for his birth, Kabul in 1504, Padshah in 1507 and the invitation of Daulat Khan.</div>
    `
  },
  3: {
    questext: "Babur became the ruler of Fergana in 1494 at the age of",
    options: ["9", "11", "14", "16"],
    correct: "2",
    exptext: "✅ Babur was only 11 years old when he took the throne of Fergana in 1494. 📌 Eleven years old and 1494. ❌ 14 is wrong because that would be too late for his accession."
  },
  4: {
    questext: "Babur took the title of Padshah in which year?",
    options: ["1501", "1504", "1507", "1526"],
    correct: "3",
    exptext: "✅ He took the title Padshah in 1507, after earlier being called Mirza. 📌 Kabul in 1504, then Padshah in 1507. ❌ 1526 is wrong because that is the year of the First Battle of Panipat."
  },
  5: {
    type: "concept", icon: "⚔️", accent: "#f59e0b", pauseTimer: true,
    title: "Babur's Battles in India",
    html: `
      <p class="cp-lead">Babur won four great battles in India. In each one he used <b>cannons and muskets</b> in large-scale Indian warfare for the first time.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/3.png" alt="First Battle of Panipat Babur cannon painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Battle</th><th>Date</th><th>Opponent</th><th>Result</th></tr></thead><tbody><tr><td>Panipat (First)</td><td>21 April 1526</td><td>Ibrahim Lodi</td><td>Lodi killed; Sultanate era ended; Delhi and Agra taken</td></tr><tr><td>Khanwa</td><td>March 1527</td><td>Rana Sanga, Rajputs and Afghan chiefs including Ibrahim Lodi's brother</td><td>Babur won; total ban on alcohol; slogan of Jihad; title Ghazi</td></tr><tr><td>Chanderi</td><td>January 1528</td><td>Medini Rai</td><td>Fort captured; Jauhar by Rajput women</td></tr><tr><td>Ghagra</td><td>May 1529</td><td>Mahmud Lodi and Afghans of Bihar</td><td>Near Patna; completed Mughal hold on North India</td></tr></tbody></table>
      <p class="cp-lead">At <b>Panipat</b>, Babur won with about <b>12,000</b> men against a much larger Afghan force, by using better tactics. At <b>Khanwa</b> he faced <b>Rana Sanga</b>, and after his win he took the title <b>Ghazi</b>. At <b>Chanderi</b>, <b>Medini Rai</b> refused his offer of talks and a <b>jagir</b> in place of Chanderi. The Rajputs fought to the end and their women performed <b>Jauhar</b>. After this no Rajput chief could challenge Babur.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/4.png" alt="Four boxes in a row with dates: 1526 Panipat Ibrahim Lodi, 1527 Khanwa Rana Sanga, 1528 Ch" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Khanwa was in March 1527 against Rana Sanga, and Chanderi was in January 1528 against Medini Rai. Do not mix the Rajput leaders.</div>
      <div class="cp-note exam">Remember the order Panipat, Khanwa, Chanderi, Ghagra with the year of each, and the title Ghazi after Khanwa.</div>
    `
  },
  6: {
    questext: "After the Battle of Khanwa in 1527, Babur took the title",
    options: ["Padshah", "Kalandar", "Alamgir", "Ghazi"],
    correct: "4",
    exptext: "✅ After defeating Rana Sanga, Babur took the title Ghazi. 📌 Ghazi means a warrior of the faith. ❌ Kalandar is wrong because that title was linked to Panipat and the gift of silver coins to Kabul residents."
  },
  7: {
    questext: "In January 1528 Babur captured the fort of Chanderi from",
    options: ["Medini Rai", "Rana Sanga", "Mahmud Lodi", "Ibrahim Lodi"],
    correct: "1",
    exptext: "✅ Medini Rai held Chanderi and refused a jagir in its place. 📌 Medini and Chanderi both fought to the end. ❌ Rana Sanga is wrong because Babur fought him at Khanwa in 1527."
  },
  8: {
    questext: "Consider the following statements about the battles of Babur:\n1. The Battle of Ghagra in 1529 was fought near Patna against the Afghans of Bihar.\n2. The Battle of Khanwa was fought in 1528.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because Ghagra was fought near Patna in 1529. 📌 Khanwa 1527, Chanderi 1528, Ghagra 1529. ❌ Statement 2 is wrong because Khanwa was fought in March 1527."
  },
  9: {
    type: "concept", icon: "📖", accent: "#ef4444", pauseTimer: true,
    title: "Babur's Legacy and the Baburnama",
    html: `
      <p class="cp-lead">Babur ruled India for only four years, but he left behind new war methods, gardens, a road measure and a famous autobiography.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/5.png" alt="Baburnama manuscript illustrated painting photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Artillery and Tulughma</td><td>First used on a large scale in India</td></tr><tr><td>Gaz-e-Babri</td><td>Road measure</td></tr><tr><td>Shahrukhi</td><td>Silver coin</td></tr><tr><td>Aram Bagh, Agra</td><td>First garden laid out in geometric style, first called Noor-e-Afghan</td></tr><tr><td>Kabuli Bagh Mosque</td><td>Built at Panipat</td></tr><tr><td>Ganjifa and Ishqbaazi</td><td>Card game and pigeon game brought by him</td></tr></tbody></table>
      <p class="cp-lead">His firsts in India were <b>artillery</b> and the <b>'Tulgama'</b> (<b>Tulughma</b>) flanking attack. He used the road measure <b>Gaz-e-Babri</b> and the silver coin <b>'Shahrukhi'</b>. He brought the games <b>Ganjifa</b> (cards) and <b>Ishqbaazi</b> (pigeons). He laid out <b>Aram Bagh</b> at Agra in a geometric plan and built the <b>Kabuli Bagh Mosque</b> at Panipat.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/6.png" alt="Mind map with Babur in the centre and four branches: Artillery and Tulughma, Gaz-e-Babri r" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His autobiography, the <b>Baburnama</b>, is written in <b>Turkish</b> and is also called <b>'Tuzuk-e-Babri'</b>. It was translated into Persian by <b>Abdur Rahim Khan-i-Khanana</b>, and into English by <b>Madam Beveridge</b>. He also wrote <b>'Risal-e-Usaj'</b> on rhetoric. He named <b>5 Muslim states</b> (Bengal, Delhi, Malwa, Gujarat, Bahamani) and <b>2 Hindu states</b> (Vijayanagara, Mewar). He called <b>Krishnadeva Raya</b> the most powerful ruler of the day.</p>
      <div class="cp-note trap">The Baburnama is in Turkish, not Persian. Persian is only the language of its translation by Abdur Rahim Khan-i-Khanana.</div>
      <div class="cp-note exam">Remember Turkish for the Baburnama, Madam Beveridge for the English version, and Krishnadeva Raya as the most powerful ruler he named.</div>
    `
  },
  10: {
    questext: "The Baburnama, the autobiography of Babur, was originally written in which language?",
    options: ["Persian", "Arabic", "Turkish", "Urdu"],
    correct: "3",
    exptext: "✅ The Baburnama was written in Turkish. 📌 Babur was a Turk-Mongol. ❌ Persian is wrong because that is only the language of a later translation."
  },
  11: {
    questext: "The Baburnama was translated into Persian by",
    options: ["Madam Beveridge", "Abdur Rahim Khan-i-Khanana", "Gulbadan Begum", "Abbas Khan Sarwani"],
    correct: "2",
    exptext: "✅ Abdur Rahim Khan-i-Khanana made the Persian translation. 📌 Beveridge is English, Khan-i-Khanana is Persian. ❌ Madam Beveridge is wrong because she translated it into English."
  },
  12: {
    questext: "Which ruler did Babur call the most powerful Hindu ruler of his time?",
    options: ["Rana Sanga", "Medini Rai", "Bahadur Shah", "Krishnadeva Raya"],
    correct: "4",
    exptext: "✅ Babur named Krishnadeva Raya of Vijayanagara as the most powerful ruler of the day. 📌 Babur counted two Hindu states, Vijayanagara and Mewar. ❌ Rana Sanga is wrong because he was the ruler of Mewar and was in the second place in that list."
  },
  13: {
    type: "concept", icon: "👑", accent: "#8b5cf6", pauseTimer: true,
    title: "Humayun (1530–1540): Early Problems",
    html: `
      <p class="cp-lead"><b>Nasir-ud-din Muhammad Humayun</b> was the eldest of Babur's four sons: <b>Humayun, Kamran, Askari</b> and <b>Hindal</b>. He was born in <b>1508</b> at Kabul, and his mother was <b>Maham Begum</b>. He was crowned at <b>Agra</b> on <b>30 December 1530</b> at the age of 22.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/7.png" alt="Humayun Mughal emperor portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Babur gave Humayun <b>Badakhshan</b> after Khanwa and then chose him as successor. Humayun faced <b>five early difficulties</b>.</p>
      <table><thead><tr><th>Difficulty</th><th>Detail</th></tr></thead><tbody><tr><td>Divided empire</td><td>Sambhal to Askari, Mewat to Hindal, Kabul and Kandahar to Kamran, who also seized Lahore and Multan</td></tr><tr><td>Empty treasury</td><td>The state had little money</td></tr><tr><td>Rajputs</td><td>Under Ratan Singh, son of Sanga</td></tr><tr><td>Bahadur Shah of Gujarat</td><td>Young and wealthy</td></tr><tr><td>Afghans</td><td>Mahmud Lodi with Bengal's help, Sher Khan in Bihar, and Alam Khan (Ibrahim's uncle) with Gujarat's support</td></tr></tbody></table>
      <p class="cp-lead">His biggest early mistake was to <b>divide the empire</b> among his brothers. <b>Kamran</b> kept Kabul and Kandahar and also seized <b>Lahore and Multan</b>, which cut off Humayun from his main source of soldiers.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/8.png" alt="Simple picture of the empire cut into slices labelled: Humayun (Delhi and Agra), Kamran (K" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not blame Humayun's fall only on Sher Shah. His division of the empire among brothers made him weak from the start.</div>
      <div class="cp-note exam">Remember the four brothers, their shares, and the date of Humayun's crowning, 30 December 1530.</div>
    `
  },
  14: {
    questext: "Which brother of Humayun received Kabul and Kandahar and also seized Lahore and Multan?",
    options: ["Kamran", "Askari", "Hindal", "Sher Khan"],
    correct: "1",
    exptext: "✅ Kamran received Kabul and Kandahar and took Lahore and Multan as well. 📌 K for Kamran and K for Kabul. ❌ Askari is wrong because he received Sambhal."
  },
  15: {
    questext: "Humayun was crowned at Agra in which year?",
    options: ["1526", "1527", "1530", "1540"],
    correct: "3",
    exptext: "✅ Humayun was crowned at Agra on 30 December 1530. 📌 Babur died in 1530 and his son followed at once. ❌ 1526 is wrong because that is the year of the First Battle of Panipat."
  },
  16: {
    type: "concept", icon: "🗡️", accent: "#14b8a6", pauseTimer: true,
    title: "Humayun's Wars: Gujarat, Chunar, Chausa and Kannauj (1531–1540)",
    html: `
      <p class="cp-lead">Humayun fought several wars in ten years. The last two, <b>Chausa</b> and <b>Kannauj</b>, cost him the throne.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/9.png" alt="Chunar Fort Uttar Pradesh Ganga photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1531</td><td>Kalinjar: a siege of about 6 months, the raja submitted and paid money</td></tr><tr><td>1532</td><td>Daurah: Humayun beat the Afghans; his 4-month siege of Chunar failed</td></tr><tr><td>1535–36</td><td>Gujarat: Bahadur Shah chased from Mandasor to Mandu, Champaner, Cambay and Goa</td></tr><tr><td>1537</td><td>Chunar taken after 6 months, called the 'Gateway to the East'</td></tr><tr><td>27 June 1539</td><td>Chausa, near Buxar: Sher Khan wins</td></tr><tr><td>17 May 1540</td><td>Kannauj (Bilgram): decisive defeat of Humayun</td></tr></tbody></table>
      <p class="cp-lead">In <b>Gujarat</b> Bahadur Shah had taken <b>Malwa, Chanderi</b> and <b>Ranthambore</b> and besieged <b>Chittor</b>. Humayun reached <b>Mandasor</b> and chased him <b>Mandu</b> to <b>Champaner</b> to <b>Cambay</b> to <b>Goa</b>. Both won and lost: the governor <b>Askari</b> was weak, and <b>Mallu Khan</b> retook Malwa.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/10.png" alt="Timeline with five boxes: 1531 Kalinjar, 1535-36 Gujarat, 1537 Chunar, 1539 Chausa, 1540 K" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>1537</b> he took <b>Chunar</b>, the <b>'Gateway to the East'</b>, and at <b>Gaur</b>, the capital of Bengal, the deaths were so many that he renamed it <b>'Jannatabad'</b>. At <b>Chausa</b> (27 June 1539) he delayed because of the rains, and his camp between the <b>Ganga</b> and <b>Karmanasa</b> was flooded. Sher Khan attacked with three divisions led by himself, <b>Jalal Khan</b> and <b>Khawas Khan</b>. At <b>Kannauj</b> on <b>17 May 1540</b> his camp on the south bank was flooded on 15 May, soldiers drowned and the defeat was complete.</p>
      <div class="cp-note trap">Kalinjar 1531 was Humayun's first expedition. Kalinjar 1545 was the place where Sher Shah died. Do not mix the two.</div>
      <div class="cp-note exam">Remember Chausa 1539 and Kannauj 1540 with Sher Khan, and the name Jannatabad for Gaur.</div>
    `
  },
  17: {
    questext: "Humayun renamed Gaur, the capital of Bengal, as",
    options: ["Firozabad", "Muhammadabad", "Jannatabad", "Fatehabad"],
    correct: "3",
    exptext: "✅ Humayun renamed Gaur as Jannatabad. 📌 Jannat means heaven. ❌ Firozabad is wrong because that city was built by Firuz Shah Tughlaq."
  },
  18: {
    questext: "The Battle of Chausa in June 1539 was fought near",
    options: ["Patna", "Buxar", "Kannauj", "Sirhind"],
    correct: "2",
    exptext: "✅ Chausa lies near Buxar between the Ganga and the Karmanasa. 📌 Chausa and Buxar are neighbours. ❌ Kannauj is wrong because the 1540 battle was fought there."
  },
  19: {
    questext: "Which battle of 17 May 1540 ended Humayun's first rule in India?",
    options: ["Kannauj (Bilgram)", "Chausa", "Daurah", "Ghagra"],
    correct: "1",
    exptext: "✅ The decisive defeat was at Kannauj, also called Bilgram. 📌 Chausa 1539 first, Kannauj 1540 last. ❌ Ghagra is wrong because it was a battle of Babur in 1529."
  },
  20: {
    type: "concept", icon: "🧭", accent: "#ec4899", pauseTimer: true,
    title: "Humayun in Exile and His Restoration (1540–1556)",
    html: `
      <p class="cp-lead">After 1540 Humayun lost his throne and wandered for about fifteen years. He came back in 1555 with the help of Persia, and died only a few months after.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/11.png" alt="Shah Tahmasp Safavid Persia portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He went to <b>Lahore</b> and then to <b>Sindh</b>, where the ruler <b>Shah Hussain</b> was hostile. <b>Kamran</b> fled to Kabul and <b>Askari</b> to Kandahar, and only <b>Hindal</b> stayed with him. <b>Maldev</b> of Marwar promised help and then refused. In <b>1541</b> he married <b>Hamida Banu</b> in Sindh and in <b>1542</b> <b>Akbar</b> was born at <b>Amarkot</b>.</p>
      <table><thead><tr><th>Event</th><th>Fact</th></tr></thead><tbody><tr><td>Persia</td><td>Shah Tahmasp gave three conditions: accept the Shia faith, make Shiaism India's state religion, surrender Kandahar</td></tr><tr><td>1545</td><td>Kabul and Kandahar won with Persian help</td></tr><tr><td>1551</td><td>Askari exiled to Mecca</td></tr><tr><td>1553</td><td>Kamran blinded and exiled to Mecca</td></tr><tr><td>Feb 1555</td><td>Lahore taken with general Bairam Khan</td></tr><tr><td>July 1555</td><td>Delhi regained after beating Sikandar Sur near Sirhind</td></tr></tbody></table>
      <p class="cp-lead"><b>Shah Tahmasp</b> of Persia helped him on three conditions: Humayun must accept the <b>Shia</b> faith, make Shiaism India's state religion and surrender <b>Kandahar</b>. In <b>1545</b> he won Kabul and Kandahar with Persian help. <b>Hindal</b> was killed in an Afghan night attack, <b>Askari</b> was exiled to Mecca in <b>1551</b>, and <b>Kamran</b> was blinded and exiled in <b>1553</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/12.png" alt="Timeline with five boxes: 1540 Loses throne, 1545 Kabul and Kandahar regained, Feb 1555 La" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>Feb 1555</b> he took <b>Lahore</b> with the general <b>Bairam Khan</b>, and at <b>Machhiwara</b> on the Sutlej (Haibat Khan and Tatar Khan) all Punjab fell to him. After the battle of <b>Sirhind</b> (1555) against <b>Sikandar Sur</b>, <b>Delhi</b> and <b>Agra</b> were retaken in <b>July 1555</b>. He died in <b>January 1556</b> after a fall from the stairs of the library building, <b>Sher Mandal</b>, in the Purana Qila. The historian Lane-Poole said that he stumbled through his life and died while stumbling.</p>
      <div class="cp-note trap">Humayun's tomb (1572) was built by his widow Hamida Banu Begum, and not by Akbar's treasury alone. Its architect was Mirza Giyas Beg, in Iranian style.</div>
      <div class="cp-note exam">Remember Shah Tahmasp, Bairam Khan, July 1555 for Delhi, and January 1556 for his death.</div>
    `
  },
  21: {
    questext: "Which Persian ruler helped Humayun during his exile?",
    options: ["Shah Rukh", "Shah Abbas", "Shah Ismail", "Shah Tahmasp"],
    correct: "4",
    exptext: "✅ Shah Tahmasp of Persia helped him and gave three conditions. 📌 Tahmasp ruled Persia while Humayun was in exile. ❌ Shah Abbas is wrong because he ruled much later."
  },
  22: {
    questext: "Humayun regained Delhi and Agra from the Surs in which year?",
    options: ["1545", "1555", "1556", "1540"],
    correct: "2",
    exptext: "✅ He regained Delhi in July 1555. 📌 Fifteen years after 1540. ❌ 1556 is wrong because that is the year he died."
  },
  23: {
    questext: "Akbar, the son of Humayun, was born in 1542 at",
    options: ["Lahore", "Kabul", "Amarkot", "Agra"],
    correct: "3",
    exptext: "✅ Akbar was born at Amarkot in Sindh. 📌 Amarkot lies in the house of Rana Virsala. ❌ Kabul is wrong because Humayun's own birth was there."
  },
  24: {
    questext: "Humayun died in 1556 after a fall from the stairs of which building in the Purana Qila?",
    options: ["Sher Mandal", "Qila-e-Kuhna", "Dinpanah", "Aram Bagh"],
    correct: "1",
    exptext: "✅ He fell from the stairs of Sher Mandal, the library pavilion. 📌 Sher Mandal, built by Sher Shah, caused the end of Humayun. ❌ Qila-e-Kuhna is wrong because it is a mosque in the same fort."
  },
  25: {
    type: "concept", icon: "🦁", accent: "#3b82f6", pauseTimer: true,
    title: "Sher Shah Suri and the Sur Dynasty (1540–1555)",
    html: `
      <p class="cp-lead"><b>Sher Shah Suri</b> was born with the name <b>'Farid'</b>. In only five years of rule he gave India some of its best-known reforms.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/13.png" alt="Sher Shah Suri portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He was the son of <b>Hasan Khan Sur</b>, who held the jagir of <b>Sasaram</b> in Bihar under the Lodis. In <b>1524</b>, after his father's death, <b>Ibrahim Lodi</b> gave him the jagir. He also served <b>Daulat Khan</b> at Agra.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1522</td><td>Killed a lion under Bahar Khan Lohani of South Bihar; got the title Sher Khan</td></tr><tr><td>1528</td><td>At Chanderi joined Mahmud Lodi at Ghagra but secretly promised Babur to stay inactive</td></tr><tr><td>Surajgarh</td><td>Beat Mahmud Shah of Bengal</td></tr><tr><td>1539</td><td>After Chausa took the title Sultan-e-Adil</td></tr><tr><td>1540</td><td>Took the throne of Delhi at age 68; founded the Sur dynasty, the Second Afghan Empire</td></tr></tbody></table>
      <p class="cp-lead">In <b>1522</b>, while under <b>Bahar Khan Lohani</b> of South Bihar, he killed a lion and got the title <b>'Sher Khan'</b>. He became guardian of Bahar Khan's son <b>Jalal Khan</b>. At <b>Surajgarh</b> he beat <b>Mahmud Shah</b> of Bengal and gained wealth and a larger army.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/14.png" alt="Timeline with five boxes: 1522 Sher Khan title, 1528 Joins Mahmud Lodi, Surajgarh Bengal, " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">After <b>Chausa</b> in <b>1539</b> he took the titles <b>Sher Shah</b> and <b>Sultan-e-Adil</b>. After <b>Kannauj</b> in <b>1540</b> he became the Sultan at Delhi, at the age of <b>68</b>. His dynasty, the <b>Sur dynasty</b>, is called the <b>'Second Afghan Empire'</b>.</p>
      <div class="cp-note trap">Sher Khan (1522) and Sultan-e-Adil (after Chausa 1539) are titles from different dates. At Delhi he became Sultan only after Kannauj in 1540.</div>
      <div class="cp-note exam">Remember Farid as his name, the lion story with Bahar Khan Lohani, and the Delhi throne at age 68 in 1540.</div>
    `
  },
  26: {
    questext: "The original name of Sher Shah Suri was",
    options: ["Hasan Khan", "Farid", "Jalal Khan", "Khawas Khan"],
    correct: "2",
    exptext: "✅ His original name was Farid. 📌 Farid became Sher Khan after a lion. ❌ Hasan Khan is wrong because that was his father's name."
  },
  27: {
    questext: "Farid received the title Sher Khan for killing a lion. Who gave it to him?",
    options: ["Ibrahim Lodi", "Daulat Khan", "Mahmud Lodi", "Bahar Khan Lohani"],
    correct: "4",
    exptext: "✅ Bahar Khan Lohani of South Bihar gave him the title in 1522. 📌 Bahar gave the title, Sher is a lion. ❌ Ibrahim Lodi is wrong because he gave only the jagir."
  },
  28: {
    questext: "Sher Shah took the throne of Delhi in",
    options: ["1526", "1539", "1540", "1555"],
    correct: "3",
    exptext: "✅ He became the Sultan of Delhi in 1540 after the Battle of Kannauj. 📌 Kannauj 1540 gave him Delhi. ❌ 1539 is wrong because that was the year of Chausa, where he took the title Sultan-e-Adil."
  },
  29: {
    type: "concept", icon: "🏹", accent: "#f97316", pauseTimer: true,
    title: "Sher Shah's Campaigns (1541–1545)",
    html: `
      <p class="cp-lead">Sher Shah ruled for only five years but fought many wars, and died during his last one.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/15.png" alt="Rohtas Fort Jhelum Pakistan gate photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Campaign</th></tr></thead><tbody><tr><td>1541</td><td>Gakkhars; Rohtasgarh Fort built on the north-west frontier</td></tr><tr><td>1542</td><td>Malwa captured</td></tr><tr><td>1543</td><td>Raisen: Puranmal treacherously killed, Jauhar; a blot on his character</td></tr><tr><td>1544</td><td>Marwar: hardest campaign; Maldev (held west and north Rajasthan since 1532), Jaita and Kumpa; won by diplomacy</td></tr><tr><td>1545</td><td>Kalinjar (Kirat Singh): a shell hit the ammunition depot; he died on 22 May 1545</td></tr></tbody></table>
      <p class="cp-lead">His hardest campaign was <b>Marwar</b> (1544) against <b>Maldev</b>, with the generals <b>Jaita</b> and <b>Kumpa</b>. He won more by clever diplomacy than by force. At <b>Raisen</b> (1543) <b>Puranmal</b> was killed by treachery and the women performed Jauhar, which is called a blot on his character.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/16.png" alt="Timeline with five boxes: 1541 Gakkhars Rohtas, 1542 Malwa, 1543 Raisen, 1544 Marwar, 1545" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">At <b>Kalinjar</b> (the ruler was <b>Kirat Singh</b>) a shell hit the ammunition depot, and Sher Shah died on <b>22 May 1545</b>.</p>
      <div class="cp-note trap">Raisen (1543) is remembered for the killing of Puranmal. Marwar (1544) was won by diplomacy. Do not swap the two.</div>
      <div class="cp-note exam">Remember Rohtasgarh 1541, Raisen 1543, Marwar 1544 with Maldev, and Kalinjar 22 May 1545.</div>
    `
  },
  30: {
    questext: "Sher Shah Suri died in 1545 during the siege of which fort?",
    options: ["Chanderi", "Kalinjar", "Raisen", "Rohtasgarh"],
    correct: "2",
    exptext: "✅ He died at Kalinjar after a shell hit the ammunition depot. 📌 Kalinjar, 1545, a shell. ❌ Raisen is wrong because the killing of Puranmal happened there in 1543."
  },
  31: {
    questext: "Which campaign of Sher Shah in 1543 is called a blot on his character?",
    options: ["Rohtas", "Malwa", "Marwar", "Raisen"],
    correct: "4",
    exptext: "✅ At Raisen Puranmal was killed by treachery. 📌 Raisen was a broken promise. ❌ Marwar is wrong because that was a hard campaign won by diplomacy."
  },
  32: {
    type: "concept", icon: "🏛️", accent: "#84cc16", pauseTimer: true,
    title: "Sher Shah's Administration: Departments and Divisions",
    html: `
      <p class="cp-lead">Sher Shah ran the empire through six central departments, called <b>Diwans</b>. Each had a clear head and a clear job.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/17.png" alt="Pyramid diagram with Sher Shah at the top and six boxes below: Wizarat, Insha, Barid, Ariz" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Diwan</th><th>Head and function</th></tr></thead><tbody><tr><td>Diwan-i-Wizarat</td><td>Wazir: revenue and finance</td></tr><tr><td>Diwan-i-Insha</td><td>Proclamations, letters to governors, records</td></tr><tr><td>Diwan-i-Barid</td><td>Intelligence; head is Barid-i-Mamalik</td></tr><tr><td>Diwan-i-Ariz</td><td>Ariz-i-Mamalik, army minister: recruitment, pay, discipline (not the commander-in-chief)</td></tr><tr><td>Diwan-i-Risalat (Diwan-i-Muhtasib)</td><td>Foreign minister: diplomacy and charity</td></tr><tr><td>Diwan-i-Qaza</td><td>Chief Qazi: justice</td></tr></tbody></table>
      <p class="cp-lead">The empire was divided into <b>Sarkar</b>, <b>Pargana</b> and <b>village</b>. The village head was called the <b>'Mukhiya'</b>, who was not a government official.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/18.png" alt="Sasaram Sher Shah Suri tomb photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Ariz-i-Mamalik was the army minister for recruitment, pay and discipline. He was not the commander-in-chief.</div>
      <div class="cp-note exam">Remember the six Diwans with their heads, and the order Sarkar, Pargana, village.</div>
    `
  },
  33: {
    questext: "Which department of Sher Shah looked after the recruitment, pay and discipline of the army?",
    options: ["Diwan-i-Insha", "Diwan-i-Barid", "Diwan-i-Ariz", "Diwan-i-Qaza"],
    correct: "3",
    exptext: "✅ The Diwan-i-Ariz, headed by the Ariz-i-Mamalik, looked after the army. 📌 Ariz and army, both start with A. ❌ Diwan-i-Barid is wrong because that was the intelligence department."
  },
  34: {
    type: "concept", icon: "🌾", accent: "#06b6d4", pauseTimer: true,
    title: "Sher Shah's Land Revenue System",
    html: `
      <p class="cp-lead">Land revenue was Sher Shah's most striking reform. The aim was to get more production, more revenue and better-off cultivators.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/19.png" alt="Sher Shah Suri land revenue patta farmer fields illustration" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Land was graded as <b>good, middle and bad</b>. The state took <b>1/3</b> of the produce. The system was mainly <b>Raiyatwari</b>, which means each cultivator dealt directly with the state.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Patta</td><td>Title deed with the state demand</td></tr><tr><td>Kabooliyat</td><td>The cultivator's agreement to pay</td></tr><tr><td>Jaribana</td><td>Surveyor's fee, an extra charge</td></tr><tr><td>Mahasilana</td><td>Collector's fee, an extra charge</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/20.png" alt="Three-box flow: Land measured and graded good, middle, bad; then State takes 1/3 of produc" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The cultivator received a <b>Patta</b>, a title deed with the state demand, and signed a <b>Kabooliyat</b>, an agreement to pay. Extra charges were <b>Jaribana</b>, a surveyor's fee, and <b>Mahasilana</b>, a collector's fee.</p>
      <div class="cp-note trap">Do not swap the two papers. The Patta was the title deed given by the state, and the Kabooliyat was the agreement given by the cultivator.</div>
      <div class="cp-note exam">Remember the three grades of land, one third of the produce, Patta, Kabooliyat, Jaribana and Mahasilana.</div>
    `
  },
  35: {
    questext: "What share of the produce did Sher Shah take as land revenue?",
    options: ["One third", "One half", "One sixth", "One tenth"],
    correct: "1",
    exptext: "✅ The state took one third of the produce. 📌 Sher Shah, third of the crop. ❌ One half is wrong because that was Alauddin Khilji's rate."
  },
  36: {
    questext: "The cultivator's written agreement to pay revenue under Sher Shah was called",
    options: ["Kabooliyat", "Patta", "Jaribana", "Mahasilana"],
    correct: "1",
    exptext: "✅ The Kabooliyat was the cultivator's agreement to pay. 📌 Kabooliyat means acceptance. ❌ Patta is wrong because it was the title deed issued by the state."
  },
  37: {
    type: "concept", icon: "🛣️", accent: "#a855f7", pauseTimer: true,
    title: "Sher Shah's Army, Roads and Currency",
    html: `
      <p class="cp-lead">Sher Shah built a strong army, long roads with rest houses and a stable coinage. Parts of this work remained in use for centuries.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/21.png" alt="Grand Trunk Road old Sher Shah milestone kos minar photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He revived <b>Alauddin Khilji's Dag</b> (branding of horses). Promotion was by merit and pay by qualification. He commanded and recruited soldiers personally.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Sadak-e-Azam</td><td>Sonargaon to Delhi to Lahore; later the Grand Trunk Road ('GT Road') under Lord Auckland</td></tr><tr><td>Other roads</td><td>Agra to Mandu and Burhanpur; Agra to Jodhpur to Chittor; Lahore to Multan</td></tr><tr><td>Sarais</td><td>About 1700, each under a 'Shikdar'</td></tr><tr><td>Rupee</td><td>About 178 grains (11.5 grams) of silver</td></tr><tr><td>Dam</td><td>Copper coin; Rupee to Dam was 1 to 64</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/22.png" alt="Simple picture with three boxes: Road labelled Sadak-e-Azam from Sonargaon to Lahore, Sara" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His main highway, <b>Sadak-e-Azam</b>, ran from <b>Sonargaon</b> through <b>Delhi</b> to <b>Lahore</b>, and was later called the <b>Grand Trunk Road</b>. He built about <b>1700 sarais</b> under a <b>'Shikdar'</b>. The silver <b>'Rupee'</b> and the copper <b>'Dam'</b> were fixed at <b>1 to 64</b>. The name <b>rupiya</b> comes from the Sanskrit <b>rupya</b>, meaning wrought silver. This is still the base of Indian currency.</p>
      <div class="cp-note trap">Sher Shah did not invent the idea of roads, but his Sadak-e-Azam became the Grand Trunk Road. Lord Auckland gave the later name.</div>
      <div class="cp-note exam">Remember Sonargaon to Lahore, 1700 sarais, the rupee of about 178 grains and the 1 to 64 ratio of rupee and dam.</div>
    `
  },
  38: {
    questext: "The Sadak-e-Azam of Sher Shah later came to be known as",
    options: ["Royal Road", "Silk Road", "Spice Road", "Grand Trunk Road"],
    correct: "4",
    exptext: "✅ The Sadak-e-Azam later became the Grand Trunk Road. 📌 Grand and Azam both mean great. ❌ Silk Road is wrong because that was an old trade route across Asia."
  },
  39: {
    questext: "In the coinage of Sher Shah, the silver Rupee was equal to how many copper Dams?",
    options: ["64", "40", "100", "16"],
    correct: "1",
    exptext: "✅ One silver Rupee was equal to 64 copper Dams. 📌 64 is the same as 8 times 8. ❌ 40 is wrong because that was the rate of a different period."
  },
  40: {
    type: "concept", icon: "🕌", accent: "#e11d48", pauseTimer: true,
    title: "Architecture and Fall of the Surs",
    html: `
      <p class="cp-lead">Sher Shah left two great buildings: the <b>Purana Qila</b> in Delhi and his <b>tomb at Sasaram</b>. The empire that he built broke up soon after his death.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/23.png" alt="Purana Qila Bara Darwaza Delhi red sandstone photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He pulled down Humayun's <b>'Dinpanah'</b> and built the <b>Purana Qila</b> in Delhi. Inside it he built the mosque <b>'Qila-e-Kuhna'</b>. The tomb at <b>Sasaram</b> was designed by <b>Aliwal Khan</b> and finished by <b>Islam Shah</b> in <b>1545</b>. Cunningham thought it was more beautiful than the Taj Mahal. <b>Abbas Khan Sarwani</b> said that Sher Shah was like the second <b>Haider</b> in experience and skill. He is seen as a forerunner of <b>Akbar</b>.</p>
      <table><thead><tr><th>Ruler or event</th><th>Fact</th></tr></thead><tbody><tr><td>Islam Shah</td><td>Ruled till October 1553</td></tr><tr><td>Firoz Khan</td><td>Murdered; Mubariz Khan became Muhammad Adil Shah</td></tr><tr><td>Sur split</td><td>Ibrahim Khan Sur (Delhi and Agra), Adil Shah (East), Sikandar Shah (Punjab)</td></tr><tr><td>Broke away</td><td>Malwa, Rajputana, Bengal, Bundelkhand</td></tr><tr><td>Result</td><td>Chaos let Humayun return</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/24.png" alt="Tree picture: Sher Shah at the top, Islam Shah below, then three branches Ibrahim Khan Sur" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Islam Shah</b> ruled until <b>October 1553</b>. <b>Firoz Khan</b> was then murdered by <b>Mubariz Khan</b>, who became <b>Muhammad Adil Shah</b>. The empire split, and <b>Malwa, Rajputana, Bengal</b> and <b>Bundelkhand</b> broke away. The chaos let Humayun return.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/25.png" alt="Sasaram Sher Shah tomb lake photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Muhammad Adil Shah ruled the East, and his prime minister was Hemu. Hemu was defeated by Akbar at the Second Battle of Panipat in 1556.</div>
      <div class="cp-note exam">Remember the Purana Qila with Qila-e-Kuhna, Aliwal Khan for the Sasaram tomb, and the three Sur rulers after Islam Shah.</div>
    `
  },
  41: {
    questext: "The Purana Qila in Delhi was built by Sher Shah on the site of Humayun's city of",
    options: ["Jahanpanah", "Siri", "Dinpanah", "Firozabad"],
    correct: "3",
    exptext: "✅ He pulled down Dinpanah and built the Purana Qila. 📌 Dinpanah was Humayun's city. ❌ Jahanpanah is wrong because it was built by Muhammad bin Tughlaq."
  },
  42: {
    questext: "Hemu, who was defeated by Akbar at the Second Battle of Panipat in 1556, was the prime minister of",
    options: ["Islam Shah", "Humayun", "Sikandar Sur", "Muhammad Adil Shah"],
    correct: "4",
    exptext: "✅ Hemu was the prime minister of Muhammad Adil Shah. 📌 Adil Shah and Hemu together. ❌ Humayun is wrong because he had died in January 1556."
  },
  43: {
    type: "concept", icon: "📚", accent: "#10b981", pauseTimer: true,
    title: "Important Books and Monuments of the Period",
    html: `
      <p class="cp-lead">Several books and buildings of this period are asked together in exams. Match each with its writer or builder.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/26.png" alt="Humayun's Tomb Delhi Mughal garden tomb photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Humayun-nama</td><td>Written by Gulbadan Begum, Babur's daughter, at Akbar's request; the main source on Humayun</td></tr><tr><td>Tarikh-i-Sher Shahi (Tuhfat-i-Akbar Shahi)</td><td>Written by Abbas Khan Sarwani under Akbar; chief source on Sher Shah</td></tr><tr><td>Humayun's Tomb (1572)</td><td>Built by Hamida Banu Begum; India's first charbagh garden-tomb; World Heritage Site of the United Nations Educational, Scientific and Cultural Organization in 1993</td></tr><tr><td>Sher Mandal</td><td>Octagonal library pavilion in the Purana Qila</td></tr></tbody></table>
      <p class="cp-lead"><b>Gulbadan Begum</b>, daughter of Babur, wrote the <b>Humayun-nama</b> at Akbar's request. It is the main source on Humayun. <b>Abbas Khan Sarwani</b> wrote the <b>Tarikh-i-Sher Shahi</b> (also called <b>Tuhfat-i-Akbar Shahi</b>) under Akbar, and it is the chief source on Sher Shah.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/27.png" alt="Matching picture: left column Gulbadan Begum and Abbas Khan Sarwani, right column Humayun-" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Humayun's Tomb</b> in Delhi was built in <b>1572</b> by <b>Hamida Banu Begum</b> with the Iranian architect <b>Mirza Giyas Beg</b>. It is India's first <b>charbagh</b> (four-part garden) tomb and a World Heritage Site since <b>1993</b>. <b>Sher Mandal</b> is an octagonal library pavilion in the Purana Qila.</p>
      <div class="cp-note trap">Gulbadan Begum wrote about Humayun, and Abbas Khan Sarwani wrote about Sher Shah. Do not swap them.</div>
      <div class="cp-note exam">Remember Gulbadan Begum for the Humayun-nama, Abbas Khan Sarwani for the Tarikh-i-Sher Shahi, and 1572 for Humayun's Tomb.</div>
    `
  },
  44: {
    questext: "The Humayun-nama, the main source on Humayun, was written by",
    options: ["Hamida Banu", "Gulbadan Begum", "Maham Begum", "Salima Sultan"],
    correct: "2",
    exptext: "✅ Gulbadan Begum, Babur's daughter, wrote it at Akbar's request. 📌 Humayun-nama by his half-sister. ❌ Hamida Banu is wrong because she was Humayun's wife."
  },
  45: {
    questext: "The Tarikh-i-Sher Shahi, the chief source on Sher Shah, was written by",
    options: ["Abul Fazl", "Badauni", "Yahia bin Ahmad Sirhindi", "Abbas Khan Sarwani"],
    correct: "4",
    exptext: "✅ Abbas Khan Sarwani wrote it under Akbar. 📌 Sher Shah and Sarwani both start with an S sound. ❌ Yahia bin Ahmad Sirhindi is wrong because he wrote about the Sayyid period."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gold-lined red sandstone gateway of the Purana Qila, a rolled scroll of the Baburnama and an old silver rupee coin" },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Babur Mughal emperor portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/1.png. a painting of the Mughal emperor Babur",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/2.png": { t: "fig", about: "Simple timeline with five boxes: 1483 Born at Fergana, 1494 Ruler at age 11, 1504 Kabul, 1507 Padshah, 1526 Panipat." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"First Battle of Panipat Babur cannon painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/3.png. a painting of Babur's artillery at Panipat",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/4.png": { t: "fig", about: "Four boxes in a row with dates: 1526 Panipat Ibrahim Lodi, 1527 Khanwa Rana Sanga, 1528 Chanderi Medini Rai, 1529 Ghagra Mahmud Lodi." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Baburnama manuscript illustrated painting photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/5.png. a page of an illustrated Baburnama manuscript",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/6.png": { t: "fig", about: "Mind map with Babur in the centre and four branches: Artillery and Tulughma, Gaz-e-Babri road measure, Aram Bagh garden, Baburnama autobiography." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Humayun Mughal emperor portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/7.png. a painting of the Mughal emperor Humayun",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/8.png": { t: "fig", about: "Simple picture of the empire cut into slices labelled: Humayun (Delhi and Agra), Kamran (Kabul, Kandahar, Lahore, Multan), Askari (Sambhal), Hindal (Mewat)." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chunar Fort Uttar Pradesh Ganga photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/9.png. the hill fort of Chunar on the Ganga",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/10.png": { t: "fig", about: "Timeline with five boxes: 1531 Kalinjar, 1535-36 Gujarat, 1537 Chunar, 1539 Chausa, 1540 Kannauj." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shah Tahmasp Safavid Persia portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/11.png. a painting of Shah Tahmasp of Persia",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/12.png": { t: "fig", about: "Timeline with five boxes: 1540 Loses throne, 1545 Kabul and Kandahar regained, Feb 1555 Lahore, July 1555 Delhi regained, Jan 1556 Dies." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sher Shah Suri portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/13.png. a painting of Sher Shah Suri",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/14.png": { t: "fig", about: "Timeline with five boxes: 1522 Sher Khan title, 1528 Joins Mahmud Lodi, Surajgarh Bengal, 1539 Chausa, 1540 Delhi throne." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rohtas Fort Jhelum Pakistan gate photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/15.png. the large Rohtasgarh Fort on the north-west frontier",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/16.png": { t: "fig", about: "Timeline with five boxes: 1541 Gakkhars Rohtas, 1542 Malwa, 1543 Raisen, 1544 Marwar, 1545 Kalinjar and death." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/17.png": { t: "fig", about: "Pyramid diagram with Sher Shah at the top and six boxes below: Wizarat, Insha, Barid, Ariz, Risalat, Qaza, each with a one-word job." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sasaram Sher Shah Suri tomb photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/18.png. the tomb of Sher Shah Suri at Sasaram",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sher Shah Suri land revenue patta farmer fields illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/19.png. a farmer at work in the fields",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/20.png": { t: "fig", about: "Three-box flow: Land measured and graded good, middle, bad; then State takes 1/3 of produce; then Cultivator gets Patta and signs Kabooliyat." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Grand Trunk Road old Sher Shah milestone kos minar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/21.png. an old Kos Minar milestone along the Grand Trunk Road",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/22.png": { t: "fig", about: "Simple picture with three boxes: Road labelled Sadak-e-Azam from Sonargaon to Lahore, Sarai with a Shikdar, Coins Rupee 1 to 64 Dam." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Purana Qila Bara Darwaza Delhi red sandstone photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/23.png. the Bara Darwaza gateway of the Purana Qila in Delhi",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/24.png": { t: "fig", about: "Tree picture: Sher Shah at the top, Islam Shah below, then three branches Ibrahim Khan Sur, Adil Shah, Sikandar Shah, each with its region." },
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sasaram Sher Shah tomb lake photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/25.png. the tomb of Sher Shah in the middle of a lake at Sasaram",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Humayun's Tomb Delhi Mughal garden tomb photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/26.png. Humayun's Tomb in Delhi",
  "images/General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri/27.png": { t: "fig", about: "Matching picture: left column Gulbadan Begum and Abbas Khan Sarwani, right column Humayun-nama and Tarikh-i-Sher Shahi, joined with lines." }
});

/* CHANGE LOG
   - The statement that Rana Sanga invited Babur is written as 'is also said to have invited him', because historians do not agree on it.
   - The spelling of Sher Shah's biographer is given as Abbas Khan Sarwani (also spelt Sherwani).
   - Short forms such as c., vs, and so on, and C-in-C were written in full.
*/
