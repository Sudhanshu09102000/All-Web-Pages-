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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Bhakti_Sufi_and_Maratha · 13 concept pages (+ overview) · 43 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "BHAKTI • SUFI",
      line2: "MARATHA EMPIRE",
      line3: "SAINTS • SHIVAJI • PESHWAS",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Bhakti, Sufi and Maratha Full Class | Medieval India | SSC CGL",
      altTitles: ["Bhakti Saints and Sufi Orders Made Easy", "Shivaji, Peshwas and Panipat in One Class"],
      description: "Bhakti saints, Sufi orders and the Maratha empire are favourite topics in Medieval India. In this class you learn them step by step, from Moinuddin Chishti to the last Peshwa, Bajirao II.\n\n📌 IN THIS CLASS\n✅ Sufi orders, founders and centres\n✅ Bhakti saints, their works and their Gods\n✅ Shivaji, the Ashtapradhan and his conquests\n✅ Peshwas, the Third Battle of Panipat and the Anglo-Maratha Wars\n✅ Practice questions in the SSC CGL style\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Sufi Movement\n00:00 Bhakti Movement\n00:00 Shivaji\n00:00 Peshwa Era\n\n👍 Like, share and subscribe.\n\n#SSCCGL #MedievalIndia #Maratha",
      tags: ["bhakti movement", "sufi movement", "bhakti saints", "sufi silsilas", "medieval india", "medieval india for ssc cgl", "shivaji ashtapradhan", "maratha empire", "peshwas list", "third battle of panipat", "anglo maratha wars", "kabir guru nanak", "chishti order", "bhakti saints and works", "treaty of purandar", "treaty of salbai", "general awareness", "indian history for ssc", "ssc cgl history", "history mcq", "history tricks", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "Bhakti Sufi and Maratha tricks"],
      hashtags: ["SSCCGL", "MedievalIndia", "Maratha"],
      thumbText: "BHAKTI SUFI MARATHA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Bhakti, Sufi and Maratha, from Moinuddin Chishti to the last Peshwa. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Sufi Movement\n00:00 Bhakti Movement\n00:00 Major Bhakti Saints\n00:00 Leading Saints in Detail\n00:00 Bhakti Saints by Region\n00:00 Maratha Empire — Shivaji\n00:00 Shivaji's Administration\n00:00 Successors of Shivaji\n00:00 Peshwa Era\n00:00 Third Battle of Panipat\n00:00 Later Peshwas and Decline\n00:00 Added Exam Facts\n00:00 2-Minute Revision",
      playlist: "Competitive exams General Awareness — Medieval India"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on Sufi saints, Bhakti saints and the Maratha empire</u>. We will meet the great saints and their teachings, then follow Shivaji, his successors and the Peshwas up to the year 1818.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>43</b><span>Questions</span></div>
        <div class="cp-stat"><b>~69 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Sufi Movement</b><br>The four Sufi orders, their founders and centres, and the famous Chishti saints.</li>
        <li><b>Bhakti Movement</b><br>How devotion spread in the south and the north, and the five schools of thought of the great teachers.</li>
        <li><b>Major Bhakti Saints</b><br>A quick table of the saints with their time, region, works and the God they worshipped.</li>
        <li><b>Leading Saints in Detail</b><br>Kabir, Guru Nanak, Chaitanya, Mirabai, Tulsidas and Surdas, with their works.</li>
        <li><b>Bhakti Saints by Region</b><br>Saints of Maharashtra and of other parts of India, with their years.</li>
        <li><b>Maratha Empire — Shivaji</b><br>His early life, his conquests in order, his coronation and the Treaty of Purandar.</li>
        <li><b>Shivaji's Administration</b><br>The eight ministers, the army, the navy, the forts and the revenue system.</li>
        <li><b>Successors of Shivaji</b><br>Sambhaji, Rajaram, Tarabai and Shahu, and how the family fought for power.</li>
        <li><b>Peshwa Era</b><br>The seven Peshwas, and the work of Balaji Vishwanath, Bajirao I and Nana Saheb.</li>
        <li><b>Third Battle of Panipat</b><br>Why it was fought, who fought on each side, and why the Marathas lost.</li>
        <li><b>Later Peshwas and Decline</b><br>The Anglo-Maratha Wars, the four Maratha houses and the end of the Peshwa.</li>
        <li><b>Added Exam Facts</b><br>Extra facts on Amir Khusro, the Sikh Gurus, Fatehpur Sikri, Pandharpur and Shivaji.</li>
        <li><b>2-Minute Revision</b><br>One quick table of titles, works, treaties and places to read before the exam.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> saints and their works, the Ashtapradhan, the Peshwas and the Panipat battle are asked in almost every General Awareness paper, and the same facts also help in Art and Culture.</div>
    `
  },
  2: {
    type: "concept", icon: "🕌", accent: "#22c55e", pauseTimer: true,
    title: "Sufi Movement",
    html: `
      <p class="cp-lead"><b>Sufism</b> is Islamic mysticism, which means love of God and a direct, personal experience of God. <u>Sufis lived in orders called silsilas. A teacher was called a pir and his student was called a murid.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/1.png" alt="Ajmer Sharif Dargah Moinuddin Chishti photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A Sufi centre was called a <b>Khanqah</b>. Sufis practised <b>Zikr</b>, which is the repeated chanting of God's name, and <b>Sama</b>, which is devotional music.</p>
      <table><thead><tr><th>Silsila</th><th>Founder in India</th><th>Centre</th></tr></thead><tbody><tr><td>Chishti</td><td>Moinuddin Chishti</td><td>Ajmer</td></tr><tr><td>Suhrawardi</td><td>Bahauddin Zakaria</td><td>Multan</td></tr><tr><td>Qadiri</td><td>Abdul Qadir Jilani (Baghdad)</td><td>Punjab</td></tr><tr><td>Naqshbandi</td><td>Khwaja Bahauddin Naqshband</td><td>Delhi and north-western India</td></tr></tbody></table>
      <p class="cp-lead"><b>Chishti order:</b> Moinuddin Chishti came to India with Muhammad Ghori in the year 1192, and his dargah (tomb) is at Ajmer. The chain of Chishti saints is Sheikh Usman, Moinuddin, Qutbuddin Bakhtiyar Kaki, Baba Farid and Nizamuddin Auliya.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/2.png" alt="A chain of five boxes in order: Sheikh Usman, Moinuddin Chishti, Qutbuddin Bakhtiyar Kaki," style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Baba Farid</b> is called <b>Ganj-e-Shakar</b>, and his sayings are in the Guru Granth Sahib, which was compiled by Guru Arjun Dev. <b>Nizamuddin Auliya</b> is called <b>Mehboob-e-Ilahi</b>. He saw seven Delhi Sultans but never attended a royal court. His disciple <b>Nasiruddin Mahmud</b> is called <b>Chirag-e-Delhi</b>. Akbar respected Sheikh Salim Chishti of Fatehpur Sikri and named his son Jahangir after receiving the saint's blessing.</p>
      <p class="cp-lead">The <b>Suhrawardi</b> order was founded by Sheikh Shihabuddin Suhrawardi of Baghdad. Bahauddin Zakaria supported Iltutmish against Qubacha and received the title Sheikh-ul-Islam. Other saints were Hamiduddin Nagauri and Sheikh Ruknuddin, and the order accepted state patronage.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/3.png" alt="Nizamuddin Dargah Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Qadiri</b> order was founded at Baghdad in the twelfth century. Its Indian saint was Sheikh Mir Muhammad (Miyan Mir), and Dara Shikoh, the eldest son of Shah Jahan, was his follower. The <b>Naqshbandi</b> order was brought to India by Khwaja Baqi Billah. Its saint Sheikh Ahmad Sirhindi, called Mujaddid Alf Sani, opposed the liberal ideas of Akbar and favoured the strict orthodoxy of Aurangzeb.</p>
      <div class="cp-note trap">The Chishtis liked music and avoided kings, the Suhrawardis accepted state patronage, and the Naqshbandis were the most orthodox and strictly against music.</div>
      <div class="cp-note exam">Remember the three titles: Baba Farid is Ganj-e-Shakar, Nizamuddin Auliya is Mehboob-e-Ilahi, and Nasiruddin Mahmud is Chirag-e-Delhi.</div>
    `
  },
  3: {
    questext: "Which Sufi saint is known by the title 'Mehboob-e-Ilahi'?",
    options: ["Baba Farid", "Nizamuddin Auliya", "Nasiruddin Mahmud", "Qutbuddin Bakhtiyar Kaki"],
    correct: "2",
    exptext: "✅ Nizamuddin Auliya is called Mehboob-e-Ilahi, which means the beloved of God. 📌 Farid is Ganj-e-Shakar, and Nasiruddin is Chirag-e-Delhi. ❌ Baba Farid is wrong because his title is Ganj-e-Shakar."
  },
  4: {
    questext: "Which pair of Sufi order and its centre is NOT correctly matched?",
    options: ["Chishti and Ajmer", "Suhrawardi and Multan", "Qadiri and Punjab", "Naqshbandi and Ajmer"],
    correct: "4",
    exptext: "✅ The Naqshbandi centre was Delhi and north-western India, while Ajmer is the centre of the Chishti order. 📌 Ajmer always goes with Moinuddin Chishti. ❌ The other three pairs are correct."
  },
  5: {
    questext: "Consider the following statements about Sufi saints:\n1. Nasiruddin Mahmud is known as Chirag-e-Delhi.\n2. The Suhrawardi order refused all state patronage.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. The Suhrawardi saints accepted state patronage. 📌 Chishtis kept away from kings, but Suhrawardis stayed close to them. ❌ Statement 2 is wrong because it states the opposite."
  },
  6: {
    questext: "Dara Shikoh, the eldest son of Shah Jahan, was a follower of which Sufi order?",
    options: ["Chishti", "Suhrawardi", "Qadiri", "Naqshbandi"],
    correct: "3",
    exptext: "✅ Dara Shikoh followed the Qadiri saint Miyan Mir. 📌 Qadiri goes with Dara Shikoh, and Naqshbandi goes with Aurangzeb's orthodoxy. ❌ Naqshbandi is wrong because that order was strict and orthodox."
  },
  7: {
    type: "concept", icon: "🙏", accent: "#f59e0b", pauseTimer: true,
    title: "Bhakti Movement",
    html: `
      <p class="cp-lead"><b>Bhakti</b> means loving devotion to God. <u>The Bhakti movement taught that God can be reached by devotion, without heavy rituals and without caste barriers.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/4.png" alt="Basavanna Basaveshwara statue Basavakalyan photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In the south, the Bhakti movement was led by the <b>Alvars</b>, who were devotees of Vishnu, and the <b>Nayanars</b>, who were devotees of Shiva, in Tamil Nadu. <b>Basavanna</b> (1106 to 1168) founded the <b>Veer Shaiva or Lingayat</b> sect in Karnataka. He was once a Jain and a minister at a Chalukya court. He believed in one God, Shiva, and opposed caste and Vedic rituals.</p>
      <p class="cp-lead">In the north, <b>Ramanand</b> (fourteenth century) taught devotion over ritual, equality of all castes, God for all, and the use of regional languages.</p>
      <table><thead><tr><th>School</th><th>Acharya</th><th>Idea</th></tr></thead><tbody><tr><td>Advaita</td><td>Shankaracharya</td><td>Only Brahman is real, and the world is maya (illusion)</td></tr><tr><td>Vishishtadvaita</td><td>Ramanujacharya</td><td>All is real, and God is supreme</td></tr><tr><td>Dvaita</td><td>Madhvacharya</td><td>God and soul are different</td></tr><tr><td>Shuddhadvaita</td><td>Vallabhacharya</td><td>Pure non-dualism; the path is Pushtimarg</td></tr><tr><td>Dvaitadvaita</td><td>Nimbarkacharya</td><td>God and soul are the same and also different</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/5.png" alt="A chart of the five schools in five boxes: Advaita (Shankaracharya), Vishishtadvaita (Rama" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The four new schools after Advaita were started by Vaishnava saints of the south, who opposed Shankaracharya's idea that the world is only maya. Shankaracharya also set up four maths (monasteries) in four directions.</p>
      <table><thead><tr><th>Math</th><th>Place (direction)</th></tr></thead><tbody><tr><td>Vedanta Math</td><td>Shringeri (South India)</td></tr><tr><td>Govardhan Math</td><td>Jagannathpuri or Puri (East India)</td></tr><tr><td>Sharada Math</td><td>Dwarka (West India)</td></tr><tr><td>Jyotirmath</td><td>Badrikashram (North India)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/6.png" alt="A schematic, not a map: a compass cross with South Shringeri, East Puri, West Dwarka and N" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Alvars worship Vishnu, while Nayanars worship Shiva.</div>
      <div class="cp-note exam">The four maths of Shankaracharya are Shringeri in the south, Puri in the east, Dwarka in the west and Badrikashram in the north.</div>
    `
  },
  8: {
    questext: "Which acharya is linked with the school of Vishishtadvaita?",
    options: ["Ramanujacharya", "Madhvacharya", "Nimbarkacharya", "Vallabhacharya"],
    correct: "1",
    exptext: "✅ Ramanujacharya taught Vishishtadvaita, which says that all is real and God is supreme. 📌 Ramanuja and Vishnu go together. ❌ Madhvacharya is wrong because he taught Dvaita, where God and soul are different."
  },
  9: {
    questext: "Which pair of school and acharya is NOT correctly matched?",
    options: ["Advaita and Shankaracharya", "Dvaita and Madhvacharya", "Dvaitadvaita and Nimbarkacharya", "Shuddhadvaita and Ramanujacharya"],
    correct: "4",
    exptext: "✅ Shuddhadvaita was taught by Vallabhacharya, not by Ramanujacharya. 📌 Vallabhacharya goes with Pushtimarg. ❌ The other three pairs are correct."
  },
  10: {
    questext: "Which of the four maths of Shankaracharya is located at Puri?",
    options: ["Vedanta Math", "Sharada Math", "Govardhan Math", "Jyotirmath"],
    correct: "3",
    exptext: "✅ The Govardhan Math is at Puri, also called Jagannathpuri, in the east. 📌 Shringeri is south, Dwarka is west and Badrikashram is north. ❌ Sharada Math is wrong because it is at Dwarka."
  },
  11: {
    type: "concept", icon: "📜", accent: "#3b82f6", pauseTimer: true,
    title: "Major Bhakti Saints",
    html: `
      <p class="cp-lead">Bhakti saints are easiest to learn in one table. <u>For every saint, note the period, the region, the main work and the God he or she worshipped.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/7.png" alt="Kabir Das portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Saint</th><th>Period</th><th>Region</th><th>Key contribution</th><th>Deity</th></tr></thead><tbody><tr><td>Shankaracharya</td><td>8th century</td><td>Kerala</td><td>Advaita; four maths</td><td>Vedanta and Upanishads</td></tr><tr><td>Ramanujacharya</td><td>11th to 12th century</td><td>Sriperumbudur (Tamil Nadu)</td><td>Vishishtadvaita; <b>Shri Bhashya</b></td><td>Vishnu or Ram</td></tr><tr><td>Nimbarkacharya</td><td>12th century</td><td>—</td><td>Dvaitadvaita</td><td>Krishna</td></tr><tr><td>Madhvacharya</td><td>13th century</td><td>—</td><td>Dvaita (Tattvavada)</td><td>Vishnu</td></tr><tr><td>Vallabhacharya</td><td>15th to 16th century</td><td>Telangana</td><td>Shuddhadvaita; Pushtimarg; Ashtachhaap</td><td>Krishna</td></tr><tr><td>Ramanand</td><td>14th century</td><td>Allahabad</td><td>Took Bhakti to North India, in Hindi</td><td>Ram</td></tr><tr><td>Kabir</td><td>15th to 16th century</td><td>Varanasi</td><td><b>Bijak</b> (Ramaini, Sabad, Sakhi); Sadhukkadi language</td><td>Nirguna</td></tr><tr><td>Raidas or Ravidas</td><td>15th to 16th century</td><td>Varanasi</td><td>Hymns in the Guru Granth Sahib; Mirabai's guru</td><td>Nirguna</td></tr><tr><td>Dadu Dayal</td><td>16th century</td><td>Ahmedabad</td><td><b>Hardevaani</b>; Brij language; discussed with Akbar</td><td>Nirguna</td></tr><tr><td>Guru Nanak</td><td>1469 to 1539</td><td>Talwandi (Pakistan)</td><td><b>Japuji, Asadivar</b>; Pangat, Sangat, Langar</td><td>Nirguna</td></tr><tr><td>Chaitanya</td><td>15th to 16th century</td><td>Navadwip (West Bengal)</td><td>Gaudiya Vaishnavism; <b>Chaitanya Charitamrita</b></td><td>Krishna (Saguna)</td></tr><tr><td>Mirabai</td><td>16th century</td><td>Merta (Rajasthan)</td><td><b>Padavali</b>; married Bhojraj of Mewar</td><td>Krishna</td></tr><tr><td>Shankar Dev</td><td>15th to 16th century</td><td>Assam</td><td>Called the Chaitanya of Assam</td><td>Vishnu</td></tr><tr><td>Tukaram</td><td>17th century</td><td>Maharashtra</td><td>Warkari sect; Hindu–Muslim unity; contemporary of Shivaji</td><td>Vithoba</td></tr><tr><td>Ramdas</td><td>17th century</td><td>Maharashtra</td><td>Dharkari sect; Shivaji's guru</td><td>Ram</td></tr></tbody></table>
      <p class="cp-lead"><b>Nirguna</b> means God without any form, and <b>Saguna</b> means God with a form, such as Krishna or Ram. The saints of the Nirguna path rejected idol worship.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/8.png" alt="A two-column chart: Nirguna (Kabir, Raidas, Dadu Dayal, Guru Nanak) on the left and Saguna" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/9.png" alt="Tukaram Dehu Maharashtra temple photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Nirguna saints are Kabir, Raidas, Dadu Dayal and Guru Nanak. Saguna saints are Mirabai, Surdas, Tulsidas and Chaitanya.</div>
      <div class="cp-note exam">Chaitanya is called Gauranga and is linked with Krishna. Tukaram's sect is Warkari, and Ramdas's sect is Dharkari.</div>
    `
  },
  12: {
    questext: "The Bijak, a collection of verses in three parts, is linked with which saint?",
    options: ["Raidas", "Kabir", "Dadu Dayal", "Guru Nanak"],
    correct: "2",
    exptext: "✅ The Bijak is the work of Kabir, and its three parts are Ramaini, Sabad and Sakhi. 📌 Bijak and Kabir both sound like short, sharp words. ❌ Dadu Dayal is wrong because his work is the Hardevaani."
  },
  13: {
    questext: "Which saint and work are correctly paired?",
    options: ["Kabir and Japuji", "Guru Nanak and Padavali", "Mirabai and Padavali", "Dadu Dayal and Bijak"],
    correct: "3",
    exptext: "✅ Mirabai wrote the Padavali, and she was a devotee of Krishna. 📌 Japuji belongs to Guru Nanak and Hardevaani to Dadu Dayal. ❌ Kabir and Japuji is wrong because Japuji was composed by Guru Nanak."
  },
  14: {
    questext: "Consider the following statements:\n1. Shankar Dev of Assam is called the Chaitanya of Assam.\n2. Tukaram belonged to the Dharkari sect.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. Tukaram belonged to the Warkari sect, while Ramdas belonged to the Dharkari sect. 📌 W for Warkari and Tukaram, D for Dharkari and Ramdas. ❌ Statement 2 mixes up the two saints."
  },
  15: {
    questext: "Who was the guru of the Bhakti saint Mirabai?",
    options: ["Kabir", "Dadu Dayal", "Surdas", "Raidas"],
    correct: "4",
    exptext: "✅ Raidas, also called Ravidas, was the guru of Mirabai. 📌 Raidas has hymns in the Guru Granth Sahib. ❌ Kabir is tempting because he also lived in Varanasi, but he was not her guru."
  },
  16: {
    type: "concept", icon: "🪔", accent: "#ef4444", pauseTimer: true,
    title: "Leading Saints in Detail",
    html: `
      <p class="cp-lead">Six saints are asked again and again. <u>For each one, remember the birthplace or family, the God worshipped and the main works.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/10.png" alt="Nankana Sahib Gurdwara Guru Nanak birthplace photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Saint</th><th>Key facts</th></tr></thead><tbody><tr><td>Kabir</td><td>A weaver and a disciple of Ramanand; contemporary of Sikandar Lodi; his ideas drew on Advaita, Nathpanthi mysticism and Sufi belief in one God</td></tr><tr><td>Guru Nanak</td><td>Born at Talwandi (now in Pakistan); contemporary of Sikandar Lodi; founded Sikhism; also composed the Rahiras and Sohila</td></tr><tr><td>Chaitanya Mahaprabhu</td><td>Of Nadia in West Bengal; called Gauranga Mahaprabhu; seen as an incarnation of Krishna</td></tr><tr><td>Mirabai</td><td>Daughter of the king of Merta; married Bhojraj, the eldest son of Rana Sanga of Mewar; sang in Rajasthani and Braj</td></tr><tr><td>Tulsidas</td><td>Contemporary of Akbar; devotee of Ram; wrote Ramcharitmanas, Vinaypatrika, Kavitavali, Dohavali, Geetavali, Barvain Ramayana and Ramlala Nahchhu</td></tr><tr><td>Surdas</td><td>Also lived under Akbar; devotee of Krishna and Radha; disciple of Vallabhacharya; wrote Sursagar, Sahitya Lahari and Sursaravali</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/11.png" alt="A matching chart with six saints on the left and their works on the right: Tulsidas with R" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Kabir and Guru Nanak lived in the time of Sikandar Lodi, while Tulsidas and Surdas lived in the time of Akbar. This simple time link helps in questions on contemporaries.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/12.png" alt="Ramcharitmanas Tulsidas manuscript photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Tulsidas worshipped Ram, while Surdas worshipped Krishna.</div>
      <div class="cp-note exam">Mirabai was linked with the royal family of Mewar through her marriage to Bhojraj, son of Rana Sanga.</div>
    `
  },
  17: {
    questext: "Which pair of saints were contemporaries of Sikandar Lodi?",
    options: ["Tulsidas and Surdas", "Kabir and Guru Nanak", "Mirabai and Tulsidas", "Surdas and Chaitanya"],
    correct: "2",
    exptext: "✅ Kabir and Guru Nanak lived in the time of Sikandar Lodi. 📌 Tulsidas and Surdas belong to the time of Akbar. ❌ Tulsidas and Surdas is tempting, but they came later."
  },
  18: {
    questext: "Consider the following statements:\n1. Mirabai married Bhojraj, the eldest son of Rana Sanga of Mewar.\n2. Chaitanya Mahaprabhu was born at Talwandi.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. Talwandi is the birthplace of Guru Nanak, while Chaitanya belonged to Nadia in West Bengal. 📌 Talwandi means Nanak. ❌ Statement 2 is wrong because it mixes up two saints."
  },
  19: {
    questext: "Which of the following is a work of Tulsidas?",
    options: ["Sursagar", "Padavali", "Vinaypatrika", "Bijak"],
    correct: "3",
    exptext: "✅ Vinaypatrika was written by Tulsidas, who also wrote the Ramcharitmanas. 📌 Tulsidas wrote about Ram. ❌ Sursagar is tempting, but it was written by Surdas."
  },
  20: {
    type: "concept", icon: "🗺️", accent: "#8b5cf6", pauseTimer: true,
    title: "Bhakti Saints by Region",
    html: `
      <p class="cp-lead">Bhakti spread to every part of India, and each saint sang in the language of his own people. <u>Learn the saints region by region, with their years.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/13.png" alt="Pandharpur Vitthal temple photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Region</th><th>Saint</th><th>Years</th><th>What to remember</th></tr></thead><tbody><tr><td>Maharashtra</td><td>Jnanesvara (Jnanadeva)</td><td>1271 to 1296</td><td>A pioneer; wrote verses called Abhangas</td></tr><tr><td>Maharashtra</td><td>Namadeva</td><td>1270 to 1350</td><td>Varkari sect; devotee of Vitthal</td></tr><tr><td>Maharashtra</td><td>Ramdas</td><td>1608 to 1681</td><td>Shivaji's guru</td></tr><tr><td>Telangana</td><td>Vallabhacharya</td><td>1479 to 1531</td><td>Pushti Marg</td></tr><tr><td>Bihar and Bengal</td><td>Vidyapati</td><td>14th to 15th century</td><td>Padavali on Krishna and Radha</td></tr><tr><td>Rajasthan</td><td>Dadu Dayal</td><td>1544 to 1603</td><td>Dadu Panth</td></tr><tr><td>Tamil Nadu</td><td>Thyagaraja</td><td>1767 to 1847</td><td>Songs on Rama</td></tr><tr><td>Karnataka</td><td>Purandar Das</td><td>1480 to 1564</td><td>Father of Carnatic Music</td></tr><tr><td>Assam</td><td>Sankaradeva</td><td>1449 to 1568</td><td>Sattriya dance and Borgeet</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/14.png" alt="A timeline of the saints by year: Namadeva 1270, Jnanesvara 1271, Vallabhacharya 1479, Pur" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Notice that the Maharashtra saints came early and the great musical saints of the south came later. This helps you place each saint in time.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/15.png" alt="Sattriya dance Assam performance photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Namadeva belongs to the Varkari sect, and Ramdas belongs to the Dharkari sect, so do not mix up the two Maharashtra sects.</div>
      <div class="cp-note exam">Purandar Das is called the Father of Carnatic Music, and Sankaradeva gave Assam the Sattriya dance and the Borgeet.</div>
    `
  },
  21: {
    questext: "Which saint is linked with the Sattriya dance and the Borgeet of Assam?",
    options: ["Vidyapati", "Purandar Das", "Vallabhacharya", "Sankaradeva"],
    correct: "4",
    exptext: "✅ Sankaradeva of Assam gave the Sattriya dance and the Borgeet. 📌 Sattriya and Sankaradeva both start with S. ❌ Purandar Das is tempting because he is also linked with music, but his music is Carnatic."
  },
  22: {
    questext: "Who is known as the Father of Carnatic Music?",
    options: ["Purandar Das", "Thyagaraja", "Namadeva", "Jnanesvara"],
    correct: "1",
    exptext: "✅ Purandar Das (1480 to 1564) is called the Father of Carnatic Music. 📌 Purandar Das came before Thyagaraja. ❌ Thyagaraja is tempting, but he lived much later, from 1767 to 1847."
  },
  23: {
    type: "concept", icon: "🚩", accent: "#f97316", pauseTimer: true,
    title: "Maratha Empire — Shivaji",
    html: `
      <p class="cp-lead"><b>Shivaji</b> was born in <b>1630</b> at the Shivner fort near Pune. <u>He built a free Maratha kingdom and was crowned in 1674.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/16.png" alt="Raigad Fort Maharashtra photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His father <b>Shahaji Bhosale</b> was a general of Bijapur and earlier served Ahmednagar. After Ahmednagar fell to Shah Jahan in 1633, Shahaji gave Shivaji the Pune jagir. His mother was <b>Jijabai</b>, his guardian was <b>Dadoji Konddev</b> and his guru was <b>Samarth Ramdas</b>.</p>
      <p class="cp-lead">Shivaji was crowned at <b>Raigad</b>, his capital, in <b>1674</b> by <b>Pandit Gangabhatt of Kashi</b>. His titles were <b>Chhatrapati, Haindav Dharmoddharak</b> and <b>Gau-Brahmin Pratipalak</b>. He called himself a Suryavanshi Kshatriya of the Sisodia Rajput lineage. He died in <b>1680</b>.</p>
      <table><thead><tr><th>Year</th><th>Conquest or event</th></tr></thead><tbody><tr><td>1646</td><td>Captured Toran (Torna) fort, near Pune</td></tr><tr><td>1648</td><td>Captured Purandar fort</td></tr><tr><td>1656</td><td>Captured Javli from Chandrarao More</td></tr><tr><td>1659</td><td>Killed Afzal Khan at Pratapgarh, then took Panhala, Kolhapur and the North Konkan</td></tr><tr><td>1663</td><td>Wounded Shaista Khan, who was then shifted to Bengal</td></tr><tr><td>1665</td><td>Jaisingh of Amer besieged Purandar, and a treaty followed</td></tr><tr><td>1666</td><td>Imprisoned at Agra by Aurangzeb, and escaped</td></tr><tr><td>1670</td><td>Looted Surat for the second time</td></tr><tr><td>1674</td><td>Coronation at Raigad</td></tr><tr><td>1677</td><td>Campaign in Karnataka with Golconda; took Gingee and Vellore</td></tr><tr><td>1680</td><td>Death</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/17.png" alt="A vertical timeline of Shivaji's life with these years and events: 1630 birth, 1646 Torna," style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">By the <b>Treaty of Purandar (1665)</b> Shivaji surrendered 23 forts, which gave an income of 4 lakh Huns, and kept 12 forts, which gave an income of 1 lakh Huns. His son Sambhaji was sent to the Mughal court with a mansab of 5,000.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/18.png" alt="Pratapgarh Fort Maharashtra photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix up the Treaty of Purandar (1665) with the Treaty of Salbai (1782).</div>
      <div class="cp-note exam">Raigad was the capital and the place of the coronation in 1674, and the ceremony was performed by Pandit Gangabhatt.</div>
    `
  },
  24: {
    questext: "Who performed the coronation of Shivaji at Raigad in 1674?",
    options: ["Dadoji Konddev", "Samarth Ramdas", "Pandit Gangabhatt", "Jijabai"],
    correct: "3",
    exptext: "✅ Pandit Gangabhatt of Kashi crowned Shivaji at Raigad in 1674. 📌 Gangabhatt came from Kashi, the holy city. ❌ Samarth Ramdas is tempting because he was Shivaji's guru, but he did not perform the ceremony."
  },
  25: {
    questext: "By the Treaty of Purandar in 1665, how many forts did Shivaji surrender to the Mughals?",
    options: ["12", "23", "30", "35"],
    correct: "2",
    exptext: "✅ Shivaji surrendered 23 forts and kept 12. 📌 Remember 23 given and 12 kept. ❌ Twelve is wrong because that is the number of forts he kept."
  },
  26: {
    questext: "Shivaji captured Javli in 1656 from which ruler?",
    options: ["Chandrarao More", "Afzal Khan", "Shaista Khan", "Jaisingh"],
    correct: "1",
    exptext: "✅ Shivaji took Javli from Chandrarao More in 1656. 📌 Javli and More both have a short, sharp sound. ❌ Afzal Khan is tempting, but Shivaji killed him at Pratapgarh in 1659."
  },
  27: {
    questext: "Consider the following statements about Shivaji:\n1. Shivaji was crowned at Raigad in 1664.\n2. His father Shahaji Bhosale was a general of Bijapur.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. The coronation took place in 1674, not 1664. 📌 Coronation 1674, death 1680. ❌ Choosing both fails because of the wrong year."
  },
  28: {
    type: "concept", icon: "🏛️", accent: "#14b8a6", pauseTimer: true,
    title: "Shivaji's Administration",
    html: `
      <p class="cp-lead">Shivaji ruled as the supreme <b>Chhatrapati</b>, helped by a council of eight ministers called the <b>Ashtapradhan</b>. <u>The ministers only advised the king, and he took the final decision.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/19.png" alt="A circle of eight boxes around a king: Peshwa, Sar-e-Naubat, Amatya, Sachiv, Sumant, Mantr" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Minister</th><th>Function</th></tr></thead><tbody><tr><td>Peshwa</td><td>Prime Minister</td></tr><tr><td>Sar-e-Naubat</td><td>Commander-in-Chief</td></tr><tr><td>Amatya or Majumdar</td><td>Finance</td></tr><tr><td>Sachiv or Shuru-Navis</td><td>State correspondence</td></tr><tr><td>Sumant or Dabir</td><td>Foreign affairs</td></tr><tr><td>Mantri or Wakia-Navis</td><td>The king's daily record</td></tr><tr><td>Pandit Rao</td><td>Religious affairs</td></tr><tr><td>Nyayadhish</td><td>Chief Justice</td></tr></tbody></table>
      <p class="cp-lead">The kingdom had three provinces: the northern (Surat to Pune), the southern (the coast and the South Konkan) and the south-eastern (Satara, Kolhapur and Dalnaun). The land under his direct rule was called <b>Swaraj</b>. The units were <b>Mahal</b> (state), <b>Pargana</b> (province), <b>Taraf</b> (district) and <b>Mauza</b> (village). Each village had a <b>Patel</b>, a <b>Kulkarni</b>, and twelve Alute and twelve Balute workers.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/20.png" alt="A ladder of units from top to bottom: Swaraj, Mahal, Pargana, Taraf, Mauza, village with P" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The army had infantry called <b>Paik</b> and cavalry. The <b>Paga</b> was the regular cavalry and the <b>Silahdar</b> was the irregular cavalry. The navy base was <b>Kalyan</b> (1658) and the main centre was <b>Colaba</b>, and the naval sailors were Agris. Each fort had three officers of equal power: the <b>Havaldar</b> for administration, the <b>Sar-e-Naubat</b> for the garrison (a Maratha) and the <b>Sabnis</b> for correspondence (a Brahmin).</p>
      <p class="cp-lead">For revenue, <b>Annaji Datto</b> carried out a survey on the system of Malik Ambar of Ahmednagar. The state took one third of the produce (33 percent), later raised to 40 percent. This was a <b>Ryotwari</b> system, in which the Patel collected the revenue and the Kulkarni kept the record.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/21.png" alt="Sindhudurg sea fort Malvan photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Peshwa was the Prime Minister, and the Sar-e-Naubat was the Commander-in-Chief. Do not swap the two.</div>
      <div class="cp-note exam">Shivaji's three equal fort officers were the Havaldar, the Sar-e-Naubat and the Sabnis.</div>
    `
  },
  29: {
    questext: "In Shivaji's Ashtapradhan, what was the role of the Peshwa?",
    options: ["Chief Justice", "Finance minister", "Prime Minister", "Commander-in-Chief"],
    correct: "3",
    exptext: "✅ The Peshwa was the Prime Minister of Shivaji's council. 📌 Peshwa means chief. ❌ Commander-in-Chief is wrong because that was the Sar-e-Naubat."
  },
  30: {
    questext: "Which pair of Ashtapradhan minister and duty is NOT correctly matched?",
    options: ["Pandit Rao and Chief Justice", "Amatya and Finance", "Sumant and Foreign affairs", "Sar-e-Naubat and Commander-in-Chief"],
    correct: "1",
    exptext: "✅ Pandit Rao looked after religious affairs, while the Nyayadhish was the Chief Justice. 📌 Pandit means a learned person, so think of religion. ❌ The other three pairs are correct."
  },
  31: {
    questext: "Annaji Datto carried out the land revenue survey of Shivaji on the system of which ruler or minister?",
    options: ["Todar Mal", "Malik Ambar", "Sher Shah", "Akbar"],
    correct: "2",
    exptext: "✅ The survey followed the system of Malik Ambar of Ahmednagar. 📌 Annaji Datto and Malik Ambar are both from the Deccan. ❌ Todar Mal is tempting because he is famous for Akbar's revenue system, but Shivaji used the Deccan system."
  },
  32: {
    type: "concept", icon: "👑", accent: "#ec4899", pauseTimer: true,
    title: "Successors of Shivaji",
    html: `
      <p class="cp-lead">After Shivaji died in 1680, his family fought over the throne, and the Mughals took advantage. <u>Learn the rulers in order, with the key event of each.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/22.png" alt="A family line from left to right: Shivaji, Sambhaji, Rajaram, Shivaji II under Tarabai, Sh" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Years</th><th>Key facts</th></tr></thead><tbody><tr><td>Sambhaji</td><td>1680 to 1689</td><td>Took power with the help of Hamir Mohite after Soyarabai crowned Rajaram; Nilopant was his Peshwa and Kavi Kalash his chief advisor; scrapped the Ashtapradhan; sheltered Aurangzeb's rebel son Prince Akbar; killed at Sangameshwar in 1689 by Muqarrab Khan; Kavi Kalash was killed, and Yesubai and her son Shahu were imprisoned</td></tr><tr><td>Rajaram</td><td>1689 to 1700</td><td>Ruled in the name of Shahu and never took the throne himself; fled from Pratapgarh to Panhala, Gingee and Satara; advisors Prahlad Niraji and Ramchandra Pant; generals Santaji Ghorpade and Dhanaji Jadav</td></tr><tr><td>Shivaji II</td><td>1700 to 1707</td><td>Ruled under the regent Tarabai; this period is the Maratha struggle for independence</td></tr><tr><td>Shahu</td><td>1707 to 1749</td><td>Raised in a Mughal prison by Zeenat-un-Nisa and freed by Prince Azam Shah; beat Tarabai at Khed in 1707 with Balaji Vishwanath; Tarabai went to Kolhapur and Shahu ruled from Satara</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/23.png" alt="Panhala Fort Kolhapur photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Notice how the Maratha house split in two. Tarabai ruled from Kolhapur and Shahu ruled from Satara. This split later helped the Peshwas become the real rulers.</p>
      <div class="cp-note trap">Do not confuse the battle of Khed (1707), where Shahu beat Tarabai, with the battle of Palkhed (1728), where Bajirao I beat the Nizam.</div>
      <div class="cp-note exam">Sambhaji was killed in 1689, and Shahu ruled for the long period from 1707 to 1749.</div>
    `
  },
  33: {
    questext: "In which battle did Shahu defeat Tarabai in 1707 with the help of Balaji Vishwanath?",
    options: ["Palkhed", "Bhalaki", "Udgir", "Khed"],
    correct: "4",
    exptext: "✅ Shahu beat Tarabai at Khed in 1707. 📌 Khed 1707, Palkhed 1728. ❌ Palkhed is tempting because the names sound alike, but that battle was against the Nizam."
  },
  34: {
    questext: "Consider the following statements:\n1. Sambhaji sheltered Aurangzeb's rebel son Prince Akbar.\n2. Rajaram fled to Gingee during the Mughal attack.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. Sambhaji gave shelter to Prince Akbar, and Rajaram moved to Gingee in the south. 📌 Sambhaji sheltered, Rajaram fled. ❌ Choosing only one fails because both match the facts."
  },
  35: {
    type: "concept", icon: "🐎", accent: "#84cc16", pauseTimer: true,
    title: "Peshwa Era",
    html: `
      <p class="cp-lead">After Shahu, the real power passed to the Peshwas, who were the Prime Ministers and became hereditary rulers in practice. <u>Learn the seven Peshwas in order and the main work of the first three.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/24.png" alt="Shaniwar Wada Pune photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Peshwa</th><th>Period</th></tr></thead><tbody><tr><td>Balaji Vishwanath</td><td>1713 to 1720</td></tr><tr><td>Bajirao I</td><td>1720 to 1740</td></tr><tr><td>Balaji Bajirao (Nana Saheb)</td><td>1740 to 1761</td></tr><tr><td>Madhav Rao I</td><td>1761 to 1772</td></tr><tr><td>Narayan Rao</td><td>1772 to 1773</td></tr><tr><td>Madhav Narayan Rao (a minor)</td><td>1774 to 1795</td></tr><tr><td>Bajirao II</td><td>1796 to 1818</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/25.png" alt="A bar timeline of the seven Peshwas from 1713 to 1818, each bar labelled with the name and" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Balaji Vishwanath</b> was the first Maratha to reach Delhi. He created a new post, <b>Senakarte</b>, and backed the Sayyid Brothers against Farrukhsiyar in 1719. By a treaty with Rafi-ud-Darajat, Swaraj was given to Shahu, and the Marathas got <b>chauth and sardeshmukhi</b> over the Deccan, with 15,000 cavalry and a tribute of 10 lakh rupees. Shahu's mother was also freed. He is called the <b>second founder</b> of the Maratha state.</p>
      <p class="cp-lead"><b>Bajirao I</b> became Peshwa at 20 and is the greatest Maratha after Shivaji and the best guerrilla commander. His idea was <b>Hindu Pad Padshahi</b>. He helped Chhatrasal Bundela against the Mughals and the Rohillas, and he met Mastanibai. He beat the Nizam at <b>Palkhed</b> (1728), which led to the Treaty of Mungi Shivgaon, and again at Bhopal (1737 to 1738), which led to the Treaty of Durrai-Sarai. In 1737 he attacked Delhi with only 500 soldiers, and Muhammad Shah Rangeela fled. In 1731, at Varna, Kolhapur was placed under Satara. He took Salsette and Bassein from the Portuguese, spread Maratha power in Gujarat, Malwa and Bundelkhand, and began the federal structure.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/26.png" alt="Bajirao I statue Pune photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Balaji Bajirao (Nana Saheb)</b> made the Peshwa the real ruler by the Treaty of Sangola (1750). The capital moved from Satara to Poona. The empire reached its maximum size, but he went against the idea of Hindu Pad Padshahi. He lost to the Nizam at Bhalaki (1752), Sindkhed (1757) and Udgir (1760), and he died in 1761 after Panipat.</p>
      <div class="cp-note trap">Do not mix up Khed (1707, Shahu against Tarabai) with Palkhed (1728, Bajirao I against the Nizam).</div>
      <div class="cp-note exam">Balaji Vishwanath is the second founder, Bajirao I is the champion of Hindu Pad Padshahi, and Nana Saheb ruled at the time of Panipat.</div>
    `
  },
  36: {
    questext: "Who is called the second founder of the Maratha state?",
    options: ["Bajirao I", "Nana Saheb", "Balaji Vishwanath", "Madhav Rao I"],
    correct: "3",
    exptext: "✅ Balaji Vishwanath is called the second founder of the Maratha state. 📌 Shivaji was the first founder and Balaji Vishwanath the second. ❌ Bajirao I is tempting because he expanded the empire, but he is not called the founder."
  },
  37: {
    questext: "The Treaty of Mungi Shivgaon was signed after Bajirao I defeated the Nizam in which battle?",
    options: ["Bhopal", "Palkhed", "Panipat", "Udgir"],
    correct: "2",
    exptext: "✅ Bajirao I beat the Nizam at Palkhed in 1728, and the Treaty of Mungi Shivgaon followed. 📌 Palkhed 1728 and Mungi Shivgaon go together. ❌ Bhopal is wrong because that battle of 1737 to 1738 led to the Treaty of Durrai-Sarai."
  },
  38: {
    questext: "Which Peshwa is linked with the idea of Hindu Pad Padshahi?",
    options: ["Balaji Vishwanath", "Madhav Rao I", "Nana Saheb", "Bajirao I"],
    correct: "4",
    exptext: "✅ Bajirao I followed the idea of Hindu Pad Padshahi. 📌 Bajirao I was the best guerrilla commander after Shivaji. ❌ Nana Saheb is wrong because he is said to have gone against this idea."
  },
  39: {
    questext: "Consider the following statements:\n1. Balaji Vishwanath was the first Maratha to reach Delhi.\n2. Bajirao I became Peshwa at the age of 30.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. Bajirao I became Peshwa at the age of 20. 📌 Twenty years old, twenty years as Peshwa, from 1720 to 1740. ❌ Statement 2 is wrong because of the wrong age."
  },
  40: {
    type: "concept", icon: "⚔️", accent: "#e11d48", pauseTimer: true,
    title: "Third Battle of Panipat, 1761",
    html: `
      <p class="cp-lead">The Third Battle of Panipat was fought on <b>14 January 1761</b> between the Marathas and <b>Ahmad Shah Abdali</b>. <u>It was a heavy defeat for the Marathas.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/27.png" alt="Panipat Kala Aam memorial Haryana photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>cause</b> was that the Marathas removed <b>Prince Timur</b>, the man of Ahmad Shah Abdali, from Punjab. The Maratha army was led by <b>Sadashivrao Bhau</b>, a cousin of Balaji Bajirao, with <b>Vishwas Rao</b>, the Peshwa's son, and the artillery of <b>Ibrahim Gardi</b>.</p>
      <table><thead><tr><th>Side</th><th>Leaders</th></tr></thead><tbody><tr><td>Marathas</td><td>Sadashivrao Bhau, Vishwas Rao, Ibrahim Gardi (artillery)</td></tr><tr><td>Abdali and his allies</td><td>Ahmad Shah Abdali, Shuja-ud-Daula (Awadh), Najib-ud-Daula Ruhela, Hafiz Rahmat Khan, Dundi Khan, Sadullah Khan</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/28.png" alt="Two sides facing each other: on the left Marathas with Bhau, Vishwas Rao and Ibrahim Gardi" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">An eyewitness, <b>Kashiraj Pandit</b>, described the huge loss of Maratha leaders and wealth. The Marathas lost for several reasons. Bhau's pride turned away <b>Malhar Rao Holkar</b>, the Marathas fought a head-on battle instead of their usual guerrilla war, they used heavy cannon, they carried women and camp followers with them, and they had no major ally except <b>Surajmal Jat</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/29.png" alt="Sadashivrao Bhau portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Panipat 1761 was a defeat of the Marathas by Abdali, while Panipat 1526 was Babur's victory. Do not mix up the two.</div>
      <div class="cp-note exam">Remember the names Bhau, Vishwas Rao and Ibrahim Gardi for the Marathas, and Shuja-ud-Daula and Najib-ud-Daula for Abdali.</div>
    `
  },
  41: {
    questext: "Who was the commander of the Maratha army at the Third Battle of Panipat?",
    options: ["Vishwas Rao", "Malhar Rao Holkar", "Ibrahim Gardi", "Sadashivrao Bhau"],
    correct: "4",
    exptext: "✅ Sadashivrao Bhau, the cousin of Balaji Bajirao, led the Marathas. 📌 Bhau led, and Vishwas Rao was the Peshwa's son. ❌ Ibrahim Gardi is tempting, but he led only the artillery."
  },
  42: {
    questext: "Who among the following was NOT an ally of Ahmad Shah Abdali at Panipat in 1761?",
    options: ["Surajmal Jat", "Najib-ud-Daula", "Shuja-ud-Daula", "Hafiz Rahmat Khan"],
    correct: "1",
    exptext: "✅ Surajmal Jat was the only notable ally of the Marathas, not of Abdali. 📌 Surajmal Jat stood with the Marathas. ❌ The other three leaders were on the side of Abdali."
  },
  43: {
    questext: "Consider the following statements:\n1. The Third Battle of Panipat was fought in 1757.\n2. Ibrahim Gardi led the Maratha artillery.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. The battle was fought in 1761, not in 1757. 📌 Panipat III is 1761, the year Nana Saheb died. ❌ Choosing both fails because of the wrong year."
  },
  44: {
    type: "concept", icon: "📉", accent: "#0ea5e9", pauseTimer: true,
    title: "Later Peshwas and Decline",
    html: `
      <p class="cp-lead">After Panipat the Peshwas slowly lost power, and the British stepped in. <u>Follow the story in order, from Madhav Rao I to Bajirao II.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/30.png" alt="A timeline from 1761 to 1818: 1761 Panipat, 1771 Shah Alam II returns to Delhi, 1782 Treat" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Madhav Rao I</b> became Peshwa as a teenager, beat the Nizam of Hyderabad and Hyder Ali of Mysore, and in <b>1771</b> brought Shah Alam II back to Delhi, so the Mughals became Maratha pensioners. He died of tuberculosis in <b>1772</b>, and the historian Grant Duff called this a worse loss than Panipat. <b>Narayan Rao</b> was murdered by his uncle <b>Raghunath Rao</b>.</p>
      <p class="cp-lead"><b>Madhav Narayan Rao</b> was a minor, so the <b>Bara Bhai Parishad</b> (Council of Twelve), headed by <b>Nana Fadnavis</b>, ruled for him. Raghunath Rao fled to the British, and this led to the <b>First Anglo-Maratha War (1775 to 1782)</b> and the <b>Treaty of Salbai (1782)</b>. Mahadji Scindia got Shah Alam II to give the Peshwa the title Nayab-e-Gunaib. Madhav Narayan Rao killed himself in 1795, Mahadji died in 1794 and Nana Fadnavis died in 1800.</p>
      <table><thead><tr><th>House</th><th>Seat</th></tr></thead><tbody><tr><td>Gaekwad</td><td>Baroda</td></tr><tr><td>Holkar</td><td>Indore</td></tr><tr><td>Bhonsle</td><td>Nagpur</td></tr><tr><td>Scindia</td><td>Gwalior</td></tr></tbody></table>
      <p class="cp-lead"><b>Bajirao II</b> was incompetent. By the <b>Treaty of Bassein (1802)</b> he put the Peshwa under British protection. Scindia and Bhonsle opposed this, which led to the <b>Second Anglo-Maratha War (1803 to 1805)</b>, a British victory in which territories were absorbed. The <b>Third Anglo-Maratha War (1816 to 1819)</b> ended the Peshwa for ever in 1818. Bajirao II was exiled to <b>Bithur</b> near Kanpur on a pension and died in 1851. The pension was refused to his son <b>Nana Saheb (Dhondu Pant)</b>, who took part in 1857 and fled to Nepal.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/31.png" alt="Bithur Kanpur Nana Saheb palace ruins photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Salbai 1782 ended the First Anglo-Maratha War, and Bassein 1802 began the road to the Second. The Peshwa was abolished in 1818.</div>
      <div class="cp-note exam">The four semi-independent Maratha houses kept their own armies and showed only nominal loyalty to the Peshwa.</div>
    `
  },
  45: {
    questext: "The Treaty of Salbai of 1782 ended which war?",
    options: ["Second Anglo-Maratha War", "Third Anglo-Maratha War", "First Anglo-Maratha War", "Anglo-Mysore War"],
    correct: "3",
    exptext: "✅ The Treaty of Salbai ended the First Anglo-Maratha War, which ran from 1775 to 1782. 📌 First war, Salbai, 1782. ❌ The Second war is wrong because it ended in 1805."
  },
  46: {
    questext: "By which treaty did Peshwa Bajirao II accept British protection in 1802?",
    options: ["Salbai", "Purandar", "Allahabad", "Bassein"],
    correct: "4",
    exptext: "✅ By the Treaty of Bassein in 1802, the Peshwa came under British protection. 📌 Bassein 1802 started the Second Anglo-Maratha War. ❌ Salbai is tempting, but it belongs to 1782."
  },
  47: {
    questext: "Which pair of Maratha house and its seat is NOT correctly matched?",
    options: ["Gaekwad and Baroda", "Holkar and Indore", "Bhonsle and Nagpur", "Scindia and Indore"],
    correct: "4",
    exptext: "✅ The Scindia house ruled from Gwalior, while Indore belonged to the Holkars. 📌 Gwalior goes with Scindia. ❌ The other three pairs are correct."
  },
  48: {
    questext: "Consider the following statements:\n1. The Peshwa post was abolished after the Third Anglo-Maratha War.\n2. Bajirao II was exiled to Nagpur.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. Bajirao II was exiled to Bithur near Kanpur. 📌 Bithur and Nana Saheb go together. ❌ Statement 2 is wrong because Nagpur was the seat of the Bhonsle house."
  },
  49: {
    type: "concept", icon: "📌", accent: "#a855f7", pauseTimer: true,
    title: "Added Exam Facts",
    html: `
      <p class="cp-lead">These extra facts are often asked in exams. <u>Read each row once and fix the key word in your mind.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/32.png" alt="Buland Darwaza Fatehpur Sikri photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Amir Khusro (1253 to 1325)</td><td>Called Tuti-i-Hind; disciple of Nizamuddin and buried beside him; served seven Sultans; wrote Khazain-ul-Futuh, Tughlaqnama and Nuh Sipihr</td></tr><tr><td>Adi Granth</td><td>Compiled by Guru Arjan Dev in 1604 and installed in the Harmandir Sahib at Amritsar</td></tr><tr><td>Khalsa</td><td>Founded by Guru Gobind Singh, the tenth Guru, in 1699</td></tr><tr><td>Salim Chishti's tomb</td><td>A marble tomb in the courtyard of the Jama Masjid at Fatehpur Sikri</td></tr><tr><td>Buland Darwaza</td><td>Built by Akbar in 1601 for the victory over Gujarat</td></tr><tr><td>Varkari saints</td><td>Worship Vithoba (Vitthal) at Pandharpur on the Bhima river, also called the Chandrabhaga; the wari ends on Ashadhi Ekadashi</td></tr><tr><td>Shivaji</td><td>Father of the Indian Navy; built the sea fort Sindhudurg at Malvan (1664 to 1667); escaped from Agra in August 1666 in sweet baskets</td></tr><tr><td>Bajirao I</td><td>Died on 28 April 1740 at Raverkhedi on the Narmada</td></tr><tr><td>Panipat III</td><td>14 January 1761</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/33.png" alt="Harmandir Sahib Amritsar Golden Temple photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">These facts connect the Sufi, Sikh, Bhakti and Maratha parts of the chapter. For example, the Sikh Gurus and Amir Khusro both belong to the period of the saints.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/34.png" alt="Pandharpur wari pilgrimage procession photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Salim Chishti's tomb is at Fatehpur Sikri, while the dargah of Moinuddin Chishti is at Ajmer.</div>
      <div class="cp-note exam">Remember Amir Khusro as Tuti-i-Hind, Shivaji as the Father of the Indian Navy and Guru Arjan Dev as the compiler of the Adi Granth.</div>
    `
  },
  50: {
    questext: "Which Sufi poet is known as 'Tuti-i-Hind', the Parrot of India?",
    options: ["Ganj-e-Shakar", "Amir Khusro", "Chirag-e-Delhi", "Nizamuddin Auliya"],
    correct: "2",
    exptext: "✅ Amir Khusro is called Tuti-i-Hind. 📌 Khusro is the parrot, and he is buried beside his master Nizamuddin. ❌ Nizamuddin Auliya is wrong because he was Khusro's teacher, not the poet."
  },
  51: {
    questext: "The Buland Darwaza at Fatehpur Sikri was built by Akbar in 1601 to celebrate his victory over which region?",
    options: ["Bengal", "The Deccan", "Gujarat", "Mewar"],
    correct: "3",
    exptext: "✅ Akbar built the Buland Darwaza in 1601 for the Gujarat victory. 📌 Buland means high, and Gujarat was a high point of his rule. ❌ Mewar is tempting, but the gate is not linked with it."
  },
  52: {
    questext: "Consider the following statements:\n1. Guru Arjan Dev compiled the Adi Granth in 1604.\n2. The Buland Darwaza was built by Shah Jahan.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. Akbar, not Shah Jahan, built the Buland Darwaza in 1601. 📌 Fatehpur Sikri belongs to Akbar. ❌ Statement 2 is wrong because it names the wrong builder."
  },
  53: {
    type: "concept", icon: "⏱️", accent: "#eab308", pauseTimer: true,
    title: "2-Minute Revision",
    html: `
      <p class="cp-lead">Read this table slowly once before the exam. <u>Each row is one fact that exams like to ask.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/35.png" alt="A three-part chart of the Bijak: Ramaini, Sabad and Sakhi, each in its own box under the n" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>'Two doors' remark</td><td>Made to Alauddin Khilji by Nizamuddin Auliya</td></tr><tr><td>Chishti order taken to South India by</td><td>Sheikh Burhanuddin Garib</td></tr><tr><td>Saadi of India and Parrot of India</td><td>Amir Khusro</td></tr><tr><td>Ramayana in Tamil</td><td>Kamban</td></tr><tr><td>Kabir's language</td><td>Sadhukkadi or Panchmel Khichdi, a mix of Hindi, Awadhi and Punjabi</td></tr><tr><td>Bijak</td><td>Three parts: Ramaini, Sabad and Sakhi</td></tr><tr><td>Chaitanya's real name</td><td>Vishwambhar; called the King of Gaudiya</td></tr><tr><td>Chaitanya Charitamrita</td><td>Written by Krishnadas Kaviraj in Bengali</td></tr><tr><td>Bhavarthadipika (on the Bhagavad Gita) and Dasabodha</td><td>Jnanesvara and Ramdas</td></tr><tr><td>Father of Carnatic Music</td><td>Purandar Das</td></tr><tr><td>Ship of Pushtimarg</td><td>Surdas (Sursagar)</td></tr><tr><td>Mirabai's guru</td><td>Raidas</td></tr><tr><td>Shivaji's three provincial chiefs</td><td>Moropant Pingle, Annaji Datto and Dattaji Pant</td></tr><tr><td>Ministers with no military duty</td><td>Pandit Rao and Nyayadhish</td></tr><tr><td>Chauth and Sardeshmukhi</td><td>One fourth of a neighbour's revenue, and one tenth as the chief Deshmukh</td></tr><tr><td>Magna Carta of the Marathas</td><td>The Treaty of 1719, a name used by Richard Temple</td></tr><tr><td>Treaty of Salbai (1782) gave the British</td><td>Salsette and Thana</td></tr><tr><td>Maratha artillery at Panipat</td><td>Ibrahim Gardi</td></tr><tr><td>Gaekwad, Holkar, Bhonsle and Scindia</td><td>Baroda, Indore, Nagpur and Gwalior</td></tr><tr><td>Bajirao II was exiled to</td><td>Bithur, and his son Nana Saheb took part in 1857</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/36.png" alt="A chain of key treaties in order: Purandar 1665, the Treaty of 1719, Salbai 1782, Bassein " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Notice that the Maratha story moves from treaties of strength under Shivaji to treaties of weakness under Bajirao II. Each treaty marks a turning point.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/37.png" alt="Kamban Ramavataram Tamil palm leaf manuscript photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">The Treaty of 1719 is called the Magna Carta of the Marathas, and the Treaty of Salbai gave the British Salsette and Thana.</div>
      <div class="cp-note trap">Chauth was one fourth of the revenue of a neighbouring land, and Sardeshmukhi was one tenth as the chief Deshmukh. Do not swap the two shares.</div>
    `
  },
  54: {
    questext: "Who wrote the Ramayana in Tamil?",
    options: ["Kamban", "Tulsidas", "Valmiki", "Jnanesvara"],
    correct: "1",
    exptext: "✅ Kamban wrote the Ramayana in Tamil. 📌 Kamban is the Tamil Ramayana poet. ❌ Tulsidas is wrong because he wrote the Ramcharitmanas in Awadhi."
  },
  55: {
    questext: "By the Treaty of Salbai in 1782, which places did the British get?",
    options: ["Bassein and Surat", "Poona and Satara", "Baroda and Indore", "Salsette and Thana"],
    correct: "4",
    exptext: "✅ The British got Salsette and Thana by the Treaty of Salbai. 📌 Salbai, Salsette and Thana all begin with S or T. ❌ Bassein and Surat is wrong because the Treaty of Bassein belongs to 1802."
  },
  56: {
    questext: "Which two ministers of Shivaji's Ashtapradhan had no military duty?",
    options: ["Peshwa and Amatya", "Sar-e-Naubat and Sumant", "Pandit Rao and Nyayadhish", "Sachiv and Mantri"],
    correct: "3",
    exptext: "✅ Pandit Rao and Nyayadhish dealt with religion and justice and had no military duty. 📌 Priest and judge do not fight. ❌ Sar-e-Naubat is wrong because he was the Commander-in-Chief."
  },
  57: {
    questext: "What was the real name of the Bhakti saint Chaitanya?",
    options: ["Gauranga", "Vishwambhar", "Nimai Das", "Krishnadas"],
    correct: "2",
    exptext: "✅ Chaitanya's real name was Vishwambhar. 📌 Gauranga is only his title. ❌ Krishnadas is tempting, but Krishnadas Kaviraj wrote the Chaitanya Charitamrita."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined lotus, a Maratha hill fort silhouette and a few real-looking gold coins" },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ajmer Sharif Dargah Moinuddin Chishti photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/1.png. the tomb of Moinuddin Chishti at Ajmer",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/2.png": { t: "fig", about: "A chain of five boxes in order: Sheikh Usman, Moinuddin Chishti, Qutbuddin Bakhtiyar Kaki, Baba Farid, Nizamuddin Auliya." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nizamuddin Dargah Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/3.png. the dargah of Nizamuddin Auliya in Delhi",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Basavanna Basaveshwara statue Basavakalyan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/4.png. the statue of Basavanna, the founder of the Veer Shaiva sect",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/5.png": { t: "fig", about: "A chart of the five schools in five boxes: Advaita (Shankaracharya), Vishishtadvaita (Ramanujacharya), Dvaita (Madhvacharya), Shuddhadvaita (Vallabhacharya), Dvaitadvaita (Nimbarkacharya)." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/6.png": { t: "fig", about: "A schematic, not a map: a compass cross with South Shringeri, East Puri, West Dwarka and North Badrikashram, each with its math name." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kabir Das portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/7.png. a portrait of Kabir, the weaver saint of Varanasi",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/8.png": { t: "fig", about: "A two-column chart: Nirguna (Kabir, Raidas, Dadu Dayal, Guru Nanak) on the left and Saguna (Mirabai, Chaitanya, Surdas, Tulsidas) on the right." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tukaram Dehu Maharashtra temple photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/9.png. the temple at Dehu, the home of the saint Tukaram",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nankana Sahib Gurdwara Guru Nanak birthplace photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/10.png. the gurdwara at Talwandi, the birthplace of Guru Nanak",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/11.png": { t: "fig", about: "A matching chart with six saints on the left and their works on the right: Tulsidas with Ramcharitmanas, Surdas with Sursagar, Mirabai with Padavali, Guru Nanak with Japuji, Kabir with Bijak, Chaitanya with Chaitanya Charitamrita." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ramcharitmanas Tulsidas manuscript photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/12.png. an old copy of the Ramcharitmanas written by Tulsidas",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pandharpur Vitthal temple photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/13.png. the Vitthal temple at Pandharpur, the main centre of the Varkari sect",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/14.png": { t: "fig", about: "A timeline of the saints by year: Namadeva 1270, Jnanesvara 1271, Vallabhacharya 1479, Purandar Das 1480, Sankaradeva 1449, Dadu Dayal 1544, Ramdas 1608, Thyagaraja 1767." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sattriya dance Assam performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/15.png. a Sattriya dance performance, the art form begun by Sankaradeva",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Raigad Fort Maharashtra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/16.png. Raigad, the capital of Shivaji",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/17.png": { t: "fig", about: "A vertical timeline of Shivaji's life with these years and events: 1630 birth, 1646 Torna, 1659 Afzal Khan, 1665 Purandar, 1666 Agra, 1674 coronation, 1680 death." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pratapgarh Fort Maharashtra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/18.png. Pratapgarh, where Shivaji killed Afzal Khan in 1659",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/19.png": { t: "fig", about: "A circle of eight boxes around a king: Peshwa, Sar-e-Naubat, Amatya, Sachiv, Sumant, Mantri, Pandit Rao, Nyayadhish." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/20.png": { t: "fig", about: "A ladder of units from top to bottom: Swaraj, Mahal, Pargana, Taraf, Mauza, village with Patel and Kulkarni." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sindhudurg sea fort Malvan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/21.png. the sea fort of Shivaji built to guard the coast",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/22.png": { t: "fig", about: "A family line from left to right: Shivaji, Sambhaji, Rajaram, Shivaji II under Tarabai, Shahu, each with the years." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Panhala Fort Kolhapur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/23.png. Panhala, one of the forts where the Maratha family took shelter",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shaniwar Wada Pune photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/24.png. the palace fort of the Peshwas at Pune",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/25.png": { t: "fig", about: "A bar timeline of the seven Peshwas from 1713 to 1818, each bar labelled with the name and the years." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bajirao I statue Pune photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/26.png. the statue of Peshwa Bajirao I",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Panipat Kala Aam memorial Haryana photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/27.png. the memorial at Panipat for the battle of 1761",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/28.png": { t: "fig", about: "Two sides facing each other: on the left Marathas with Bhau, Vishwas Rao and Ibrahim Gardi, on the right Abdali with Shuja-ud-Daula and Najib-ud-Daula; the label 14 January 1761 in the middle." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sadashivrao Bhau portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/29.png. the Maratha commander at Panipat",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/30.png": { t: "fig", about: "A timeline from 1761 to 1818: 1761 Panipat, 1771 Shah Alam II returns to Delhi, 1782 Treaty of Salbai, 1802 Treaty of Bassein, 1803 to 1805 Second Anglo-Maratha War, 1818 Peshwa abolished." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bithur Kanpur Nana Saheb palace ruins photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/31.png. Bithur, where Bajirao II lived in exile",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Buland Darwaza Fatehpur Sikri photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/32.png. the gateway built by Akbar to celebrate the victory over Gujarat",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Harmandir Sahib Amritsar Golden Temple photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/33.png. the Harmandir Sahib, where the Adi Granth was installed",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pandharpur wari pilgrimage procession photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/34.png. the wari procession of the Varkari pilgrims going to Pandharpur",
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/35.png": { t: "fig", about: "A three-part chart of the Bijak: Ramaini, Sabad and Sakhi, each in its own box under the name Kabir." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/36.png": { t: "fig", about: "A chain of key treaties in order: Purandar 1665, the Treaty of 1719, Salbai 1782, Bassein 1802, Peshwa abolished 1818." },
  "images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kamban Ramavataram Tamil palm leaf manuscript photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha/37.png. an old Tamil manuscript of the Ramayana of Kamban"
});

/* CHANGE LOG
   - Naqshbandi order: the century was removed; it is stated only that Khwaja Baqi Billah brought it to India.
   - Sambhaji sheltered Prince Akbar, the rebel son of Aurangzeb (the name Akbar II was a mistake and is not used).
   - Sambhaji was captured at Sangameshwar in 1689 by Muqarrab Khan (earlier written as Mubarak Khan).
   - Mahadji Scindia died in 1794 (earlier written as 1795).
   - Ramanand is listed as a devotee of Ram and is removed from the list of Nirguna saints.
   - Years 1659 (Afzal Khan) and 1663 (Shaista Khan) added to the table of Shivaji's conquests.
   - Madhav Rao I became Peshwa as a teenager (the exact age was left out).
   - Kashiraj Pandit's remark on Panipat is described in words and not quoted.
*/
