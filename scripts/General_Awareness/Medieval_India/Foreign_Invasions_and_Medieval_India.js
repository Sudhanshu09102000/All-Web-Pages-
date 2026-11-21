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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Foreign_Invasions_and_Medieval_India · 12 concept pages (+ overview) · 45 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏰", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Foreign Invasions and Medieval India",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/thumbnail.png",
      banner: "SSC CGL 2026",
      line1: "FOREIGN INVASIONS",
      line2: "MEDIEVAL INDIA",
      line3: "PERSIANS TO GHORI",
      badge: "FULL CLASS",
      ribbon: "DATES • BATTLES • TRAPS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Foreign Invasions & Medieval India | Persians to Muhammad Ghori | SSC CGL History",
      altTitles: ["Mahmud of Ghazni and Muhammad Ghori in One Class", "Tarain, Chandawar and Qasim: All Dates and Traps"],
      description: "Foreign invasions give sure marks in General Awareness. In this full class you learn the Persians, Alexander, Muhammad bin Qasim, Mahmud of Ghazni and Muhammad Ghori in the correct order.\n\n📌 IN THIS CLASS\n✅ Darius I, Alexander, the Battle of the Hydaspes\n✅ Qasim's march through Sindh\n✅ Mahmud's seventeen raids\n✅ First and Second Battle of Tarain, Chandawar\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Persian invasion\n00:00 Alexander\n00:00 Arabs in Sindh\n00:00 Ghaznavids\n00:00 Ghori\n\n👍 Like, share, subscribe.\n\n#SSCCGL #MedievalIndia #History",
      tags: ["mahmud of ghazni", "muhammad ghori", "muhammad bin qasim", "alexander invasion of india", "battle of tarain", "ssc cgl history", "ssc cgl general awareness", "medieval india for all exams", "arab conquest of sindh", "ghaznavid dynasty", "ghurid dynasty", "persian invasion of india", "battle of hydaspes", "battle of chandawar", "prithviraj chauhan", "history for ssc", "static gk history", "history tricks", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "Medieval_India for all exams"],
      hashtags: ["SSCCGL", "MedievalIndia", "History", "GeneralAwareness"],
      thumbText: "FOREIGN INVASIONS ON INDIA",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏰 New class is live: Foreign Invasions and Medieval India, from the Persians to Ghori. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Persian invasion\n00:00 Alexander\n00:00 Arabs in Sindh\n00:00 Ghaznavids\n00:00 Ghori",
      playlist: "SSC CGL General Awareness — Medieval India"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the foreign invasions of India</u>, from the Persians and Alexander to the Arabs, Mahmud of Ghazni and Muhammad Ghori. These topics give many direct questions in History every year, so we will learn each king, date and battle slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>12</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>45</b><span>Questions</span></div>
        <div class="cp-stat"><b>~69 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Persian (Achaemenid) Invasions</b><br>How the Persian emperors took the north-west of India, and what they left behind in script and trade.</li>
        <li><b>Greek Invasion — Alexander</b><br>How Alexander reached India, why he won, why his soldiers refused to go further, and what changed afterwards.</li>
        <li><b>Arab Conquest of Sindh</b><br>Why the Arabs attacked, and how India was divided into many powers at that time.</li>
        <li><b>Qasim's Campaign in Sindh</b><br>The march of Muhammad bin Qasim, town by town, in the correct order.</li>
        <li><b>Effects of the Sindh Conquest</b><br>Why the conquest had little political effect but passed Indian knowledge to the Arab world.</li>
        <li><b>The Turks and the Ghaznavids</b><br>How the Turks rose, and how Alptegin and Subuktagin built the Ghaznavid power.</li>
        <li><b>Mahmud of Ghazni</b><br>His seventeen raids on India, with the important years and places.</li>
        <li><b>Mahmud's Court, Character and End</b><br>The scholars of his court, his titles, and how the Ghaznavid power ended.</li>
        <li><b>Rise of the Ghurids and Muhammad Ghori</b><br>Who the Ghurids were and why Ghori is called the real founder of Muslim rule in India.</li>
        <li><b>Ghori's Campaigns, 1175–1191</b><br>His first attacks, his first defeat and the First Battle of Tarain.</li>
        <li><b>Second Tarain and Chandawar</b><br>The two battles that opened the Ganga valley to Turkish rule.</li>
        <li><b>The End of Ghori and the Slave Generals</b><br>How Ghori died and how his slaves, led by Aibak, began the Mamluk dynasty.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on first invaders, battle years, writers and titles come again and again in the General Awareness paper, so learning the order of events well gives you easy marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#22c55e", pauseTimer: true,
    title: "Persian (Achaemenid) Invasions",
    html: `
      <p class="cp-lead">The first foreign invasion of India came from <b>Persia</b> (modern Iran) in the <b>6th century BCE</b>. At that time the north-west of India was divided into many small states, such as <b>Gandhara</b> and <b>Kamboja</b>, while the kingdom of <b>Magadha</b> was growing under <b>Bimbisara</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/1.png" alt="Persepolis Achaemenid palace ruins Iran photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Years</th><th>What he did</th></tr></thead><tbody><tr><td>Cyrus II</td><td>558–529 BCE</td><td>Founder of the empire; his attempt on India failed, but he took the border lands west of Sindh</td></tr><tr><td>Darius I</td><td>522–486 BCE</td><td>First Achaemenid ruler to succeed in India; took Gandhara in 516 BCE</td></tr><tr><td>Xerxes (Kshayarsha)</td><td>486–465 BCE</td><td>Kept the empire together and used Indians in his army; was defeated by the Greeks</td></tr><tr><td>Darius III</td><td>336–330 BCE</td><td>Last Persian emperor; beaten by Alexander at Arbela (Gaugamela) in 331 BCE</td></tr></tbody></table>
      <p class="cp-lead"><u>Darius I was the grandson of Cyrus.</u> The Greek writer <b>Herodotus</b> wrote that the north-west of India became the <b>20th province</b> of the Persian empire, holding Kamboja and Gandhara. The Roman writer <b>Pliny</b> wrote that Cyrus destroyed the city of <b>Kapisha</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/2.png" alt="Straight timeline with four boxes: Cyrus II 558 BCE, Darius I 522 BCE with Gandhara 516 BC" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The conquest was easy because the Persian emperors were strong, while the north-western states were weak and often fought each other. The great northern trade road, called the <b>Uttarapatha</b>, gave the Persians a clear route.</p>
      <div class="cp-note trap">Herodotus speaks of the 20th province, but Pliny is the writer who speaks of Cyrus destroying Kapisha. Do not mix these two writers.</div>
      <p class="cp-lead">Persian rule opened new sea routes and trade links. The <b>Kharosthi</b> script, which is written from <b>right to left</b>, appears in some Ashokan inscriptions. It grew out of the Iranian <b>Aramaic</b> script. Some Iranian touches can also be seen in <b>Mauryan architecture</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/3.png" alt="Two boxes joined by a line: Aramaic script (Iran) on the left and Kharosthi script (writte" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Remember the three Persian gifts: new sea routes and trade, the Kharosthi script from Aramaic, and touches in Mauryan architecture.</div>
      <div class="cp-mnemonic">Cyrus tried, Darius won, Xerxes used soldiers, Darius III lost.</div>
    `
  },
  3: {
    questext: "Who was the first ruler of the Achaemenid dynasty to succeed in conquering a part of India?",
    options: ["Cyrus II", "Darius I", "Xerxes", "Darius III"],
    correct: "2",
    exptext: "✅ Darius I took Gandhara in 516 BCE. 📌 Cyrus tried, Darius won. ❌ Cyrus II is wrong because his attempt on India failed."
  },
  4: {
    questext: "Consider the following statements about the Persian invasion of India:\n1. The Kharosthi script is written from right to left.\n2. Herodotus wrote that the north-west of India became the 20th province of the Persian empire.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Kharosthi grew from the Aramaic script and runs from right to left, and Herodotus names the 20th province. 📌 Right to left is the special sign of Kharosthi. ❌ Choosing only one statement leaves out a true fact."
  },
  5: {
    questext: "Which writer wrote that Cyrus II destroyed the city of Kapisha?",
    options: ["Herodotus", "Ferishta", "Alberuni", "Pliny"],
    correct: "4",
    exptext: "✅ Pliny wrote this about Cyrus. 📌 Pliny goes with Kapisha, and Herodotus goes with the 20th province. ❌ Herodotus is the tempting choice, but he is linked to the 20th province."
  },
  6: {
    type: "concept", icon: "⚔️", accent: "#f59e0b", pauseTimer: true,
    title: "Greek Invasion — Alexander (356–323 BCE)",
    html: `
      <p class="cp-lead">Before Alexander came, the north-west of India was held by small kingdoms and tribal states. They were all busy fighting each other, so none of them could stand together against a strong outsider.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/4.png" alt="Alexander the Great marble bust museum photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler or state</th><th>What happened</th></tr></thead><tbody><tr><td>Ambhi of Taxila</td><td>Wanted help against his neighbours, so he surrendered without fighting</td></tr><tr><td>Abhisara</td><td>Its king also joined Alexander</td></tr><tr><td>Massaga</td><td>A frontier republic that resisted; Greek writers say the women took up arms after the men fell, and Alexander killed them</td></tr><tr><td>Porus</td><td>Fought Alexander at the Battle of the Hydaspes (Jhelum or Vitasta) in 326 BCE</td></tr></tbody></table>
      <p class="cp-lead">Alexander was the son of <b>Philip II</b> of Macedonia, who ruled from <b>359 BCE</b>. He was a student of the great thinker <b>Aristotle</b>. He took the throne in <b>336 BCE</b> at the age of 20 and invaded India in <b>326 BCE</b>, coming through Balkh (Bactria), Kabul, the Hindu Kush and the Khyber Pass.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/5.png" alt="Schematic, not a map: a chain of seven boxes joined in order - Balkh (Bactria), Kabul, Hin" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Porus</b> ruled the land between the <b>Jhelum</b> and the <b>Chenab</b>. He lost the battle, but Alexander was so impressed by his bravery that he gave him his kingdom back. On the Jhelum, Alexander founded <b>Nicaea</b> (Nike means victory) and <b>Bucephala</b> (named after his favourite horse, Bucephalus).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/6.png" alt="Jhelum River Pakistan landscape photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Alexander wanted to reach the Gangetic valley and <b>Magadha</b>. But after <b>19 months</b> in India, his tired soldiers refused to cross the <b>Beas (Vyas)</b>. He turned back, returned by land in <b>325 BCE</b>, and died at <b>Babylon in 323 BCE</b> at the age of 32. With him went the writers <b>Nearchus, Onesicritus and Aristobulus</b>.</p>
      <p class="cp-lead"><u>Why did he succeed?</u> There was no central authority in the north-west, he had fast horses, and Ambhi of Taxila helped him.</p>
      <div class="cp-note trap">Alexander turned back at the <b>Beas</b>, not at the Jhelum. The Jhelum is where he fought Porus. His battle with Darius III at Arbela was in 331 BCE, before he came to India.</div>
      <p class="cp-lead">The Greek invasion brought ancient Europe and ancient India face to face. The states of the north-west were reorganised, and the new routes later helped trade. The <b>Kshatrapa</b> system and <b>owl-type coins</b> were adopted, and <b>Gandhara art</b> blended Indian and Greek styles.</p>
      <div class="cp-note exam">Remember the three results: the Kshatrapa system, owl-type coins and Gandhara art.</div>
    `
  },
  7: {
    questext: "The Battle of the Hydaspes in 326 BCE was fought between Alexander and which Indian ruler?",
    options: ["Ambhi", "Dahir", "Porus", "Anandapala"],
    correct: "3",
    exptext: "✅ Porus fought Alexander at the Hydaspes, the Greek name of the Jhelum. 📌 Hydaspes means Jhelum, and Jhelum means Porus. ❌ Ambhi is wrong because he surrendered without fighting."
  },
  8: {
    questext: "At which river did the soldiers of Alexander refuse to march further into India?",
    options: ["Jhelum", "Chenab", "Sutlej", "Beas"],
    correct: "4",
    exptext: "✅ The tired soldiers refused to cross the Beas after 19 months in India. 📌 The march ended at the Beas. ❌ The Jhelum is wrong because that is where he fought Porus."
  },
  9: {
    questext: "Which ruler of Taxila surrendered to Alexander without fighting?",
    options: ["Porus", "Ambhi", "Abhisara", "Dahir"],
    correct: "2",
    exptext: "✅ Ambhi wanted help against his neighbours, so he welcomed Alexander. 📌 Ambhi goes with Taxila. ❌ Porus is wrong because he fought and lost."
  },
  10: {
    questext: "Which of the following was NOT a result of Alexander's invasion of India?",
    options: ["Adoption of owl-type coins", "Growth of Gandhara art", "Spread of the Chishti order", "Use of the Kshatrapa system"],
    correct: "3",
    exptext: "✅ The Chishti order came much later, in the time of Ghori. 📌 Alexander's results were coins, art and the Kshatrapa system. ❌ Owl-type coins are tempting, but they were adopted after the Greek invasion."
  },
  11: {
    type: "concept", icon: "🕌", accent: "#ef4444", pauseTimer: true,
    title: "Arab Conquest of Sindh",
    html: `
      <p class="cp-lead">The Arabs attacked Sindh to gain <b>wealth</b> and to spread <b>Islam</b>. Their first attacks in <b>711 CE</b>, under <b>Ubaidullah</b> and then <b>Budail</b>, both failed. The first successful attack came in <b>712 CE</b> under <b>Muhammad bin Qasim</b> against <b>Dahir</b>, the ruler of Sindh.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/7.png" alt="Banbhore ancient port ruins Sindh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Why could the Arabs succeed? New powers such as the <b>Gurjara-Pratiharas, Rashtrakutas and Chalukyas</b> rose and fought each other for around <b>300 years</b>, and India still had no single central power. Around <b>1000 CE</b> the same split let the Turks enter under Mahmud of Ghazni.</p>
      <table><thead><tr><th>Region</th><th>Situation on the eve of the Arab invasion</th></tr></thead><tbody><tr><td>India</td><td>No central power; only small states</td></tr><tr><td>Afghanistan</td><td>A Brahmin dynasty ruled the kingdom of Kabul (Jabul); Muslim writers call it the Hindushahi empire</td></tr><tr><td>Kashmir</td><td>Durlabhavardhana founded the Karkota dynasty in the 7th century; Lalitaditya Muktapida ruled from 724 CE and beat Yashovarman in 740 CE</td></tr><tr><td>Kannauj</td><td>Arjuna seized it after Harsha and opposed the Chinese envoy Wang Hiuen-tse, who beat him with help from Assam, Tibet and Nepal; Arjuna died in a Chinese prison; then Yashovarman ruled</td></tr><tr><td>Tripartite struggle</td><td>The Palas, Gurjara-Pratiharas and Rashtrakutas fought for Kannauj, and the Pratiharas won</td></tr><tr><td>Sindh</td><td>Ruled by the Rai dynasty, whose ruler Hiuen Tsang called a Shudra; the last Rai was Sahasi II, and then his minister Chach seized power</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/8.png" alt="Three boxes around one centre box labelled Kannauj: Palas, Gurjara-Pratiharas, Rashtrakuta" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">After Chach came <b>Chandar</b>, and then <b>Dahir</b>, who faced the Arab attack in 712 CE.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/9.png" alt="Chain of four boxes in order: Rai Sahasi II, Chach, Chandar, Dahir, with the title Rulers " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not confuse the early failed attacks of Ubaidullah and Budail with the successful attack of Muhammad bin Qasim in 712 CE.</div>
      <div class="cp-note exam">Remember the order of the Sindh rulers: Rai Sahasi II, then Chach, then Chandar, then Dahir.</div>
      <div class="cp-mnemonic">Chach first, Chandar second, Dahir last.</div>
    `
  },
  12: {
    questext: "Who led the first successful Arab attack on Sindh in 712 CE?",
    options: ["Ubaidullah", "Budail", "Hajjaj bin Yusuf", "Muhammad bin Qasim"],
    correct: "4",
    exptext: "✅ Muhammad bin Qasim led the first successful attack, in 712. 📌 The two early attacks under Ubaidullah and Budail failed. ❌ Hajjaj bin Yusuf only sent him and did not lead the army."
  },
  13: {
    questext: "Which dynasty finally won the struggle among the Palas, Gurjara-Pratiharas and Rashtrakutas for control of Kannauj?",
    options: ["Gurjara-Pratiharas", "Palas", "Rashtrakutas", "Karkotas"],
    correct: "1",
    exptext: "✅ The Gurjara-Pratiharas won the tripartite struggle for Kannauj. 📌 The Pratiharas took the final prize. ❌ The Rashtrakutas are wrong because they did not win in the end."
  },
  14: {
    questext: "Who founded the Karkota dynasty of Kashmir in the 7th century?",
    options: ["Lalitaditya Muktapida", "Yashovarman", "Arjuna", "Durlabhavardhana"],
    correct: "4",
    exptext: "✅ Durlabhavardhana founded the Karkota dynasty. 📌 The founder's name starts with Durlabha, and Lalitaditya came later. ❌ Lalitaditya is wrong because he was a later and more famous Karkota ruler."
  },
  15: {
    type: "concept", icon: "🗡️", accent: "#8b5cf6", pauseTimer: true,
    title: "Qasim's Campaign in Sindh, 712–713 CE",
    html: `
      <p class="cp-lead">Muhammad bin Qasim was sent to Sindh by <b>Hajjaj bin Yusuf</b>, the governor of Iraq, who served the Umayyad Caliph <b>Walid I</b>. The main account of this conquest is the Persian work <b>Chachnama</b>, written by <b>Ali Kufi</b> in the 13th century.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/10.png" alt="Banbhore Debal Sindh ruins photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Place</th><th>What happened</th></tr></thead><tbody><tr><td>Deval (Dewal)</td><td>First target, reached through Makran; the port was besieged in 712 CE; Dahir's nephew resisted; Brahmins backed Qasim</td></tr><tr><td>Nirun</td><td>Buddhist monks accepted his rule without war</td></tr><tr><td>Sehban</td><td>Dahir's cousin Majhra offered slight resistance, then submitted</td></tr><tr><td>Rawar (Raver)</td><td>Qasim crossed the Sindh river; fierce battle on 20 June 712 CE; Dahir died; his widow Ranbai held the fort, then performed jauhar</td></tr><tr><td>Brahmanabad</td><td>Dahir's son Jai Singh fled; about 20,000 died; Dahir's widow Lad Devi and daughters Surya Devi and Parmal Devi were sent to the Caliph at Damascus</td></tr><tr><td>Aror (Alor)</td><td>Capital of Sindh, held by another son of Dahir; conquered</td></tr><tr><td>Multan</td><td>Early 713 CE; main town of Upper Sindh, called the Golden City for its gold; the last major town of his march</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/11.png" alt="Schematic, not a map: a path of seven boxes in order - Deval, Nirun, Sehban, Rawar, Brahma" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Some towns fought hard and some gave up without war, so the order of the march is the most important thing to remember.</p>
      <div class="cp-note trap">Dahir died at <b>Rawar</b>, not at Brahmanabad or Aror. Aror was the capital of Sindh, and Rawar is where Ranbai performed jauhar.</div>
      <div class="cp-note exam">Remember the order of the march: Deval, Nirun, Sehban, Rawar, Brahmanabad, Aror, Multan.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/12.png" alt="Multan fort city Pakistan photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">Dogs Never See Rabbits Before A Meal (Deval, Nirun, Sehban, Rawar, Brahmanabad, Aror, Multan).</div>
    `
  },
  16: {
    questext: "Which Persian work is the main account of the Arab conquest of Sindh?",
    options: ["Kitab-ul-Hind", "Chachnama", "Shahnama", "Prithviraj Raso"],
    correct: "2",
    exptext: "✅ The Chachnama by Ali Kufi tells the story of the conquest of Sindh. 📌 Chach ruled Sindh, so Chachnama is its story. ❌ Kitab-ul-Hind is wrong because Alberuni wrote it about Indian society."
  },
  17: {
    questext: "Dahir was killed in the fierce battle of Rawar on 20 June of which year?",
    options: ["711 CE", "713 CE", "712 CE", "715 CE"],
    correct: "3",
    exptext: "✅ The battle of Rawar was fought on 20 June 712, and Dahir died there. 📌 Qasim's real work in Sindh begins in 712. ❌ 713 is wrong because that is the year of Multan."
  },
  18: {
    questext: "Which town of Upper Sindh, taken by Qasim in early 713 CE, was called the Golden City?",
    options: ["Multan", "Aror", "Brahmanabad", "Deval"],
    correct: "1",
    exptext: "✅ Multan was called the Golden City because of its gold. 📌 Multan means money and gold. ❌ Aror is wrong because it was the capital of Sindh, not the Golden City."
  },
  19: {
    questext: "Consider the following statements about Qasim's campaign in Sindh:\n1. Dahir's widow Ranbai held the fort of Rawar and then performed jauhar.\n2. Brahmanabad was the capital of Sindh.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Aror was the capital of Sindh. ❌ Statement 2 is wrong because Brahmanabad was not the capital; Aror was."
  },
  20: {
    questext: "Which town was the capital of Sindh when Qasim conquered it?",
    options: ["Deval", "Sehban", "Aror", "Nirun"],
    correct: "3",
    exptext: "✅ Aror (Alor) was the capital, held by another son of Dahir. 📌 Aror comes near the end of the march. ❌ Deval is wrong because it was only the first port that Qasim attacked."
  },
  21: {
    type: "concept", icon: "📜", accent: "#14b8a6", pauseTimer: true,
    title: "Effects of the Sindh Conquest",
    html: `
      <p class="cp-lead">The Arab conquest of Sindh stayed a <b>historical and Islamic event</b> with very little political impact on the rest of India. The historian <b>Lane-Poole</b> described it in this way.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/13.png" alt="Two columns: Political effect labelled Very small, and Cultural exchange labelled Large, w" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The real gain was in learning. Indian knowledge passed to the Arab world through scholars, and the Arabic names of these works are important for the exam.</p>
      <table><thead><tr><th>Indian work</th><th>What happened</th></tr></thead><tbody><tr><td>Panchatantra of Vishnu Sharma</td><td>Became the Arabic work Kalila wa Dimna</td></tr><tr><td>Brahmasiddhanta of Brahmagupta</td><td>Taken up by Arab scholars in the 8th century</td></tr><tr><td>Khandanakhandakhadya of Sri Harsha</td><td>Also taken up by Arab scholars</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/14.png" alt="Kalila wa Dimna illustrated Arabic manuscript photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/15.png" alt="Three boxes on the left - Panchatantra, Brahmasiddhanta, Khandanakhandakhadya - joined to " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Arab conquest of Sindh did not weaken the Indian powers. Muslim rule in India was truly established later by the Turks, not by the Arabs.</div>
      <div class="cp-note exam">Remember the sentence: the Panchatantra became Kalila wa Dimna.</div>
      <div class="cp-mnemonic">Panchatantra and Kalila wa Dimna: one story, two names.</div>
    `
  },
  22: {
    questext: "The Panchatantra was taken up by the Arabs under which name?",
    options: ["Chachnama", "Kalila wa Dimna", "Shahnama", "Kitab-ul-Hind"],
    correct: "2",
    exptext: "✅ Vishnu Sharma's Panchatantra became the Arabic work Kalila wa Dimna. 📌 One story, two names. ❌ Chachnama is wrong because it is a Persian account of the conquest of Sindh."
  },
  23: {
    questext: "Consider the following statements about the effects of the Arab conquest of Sindh:\n1. The conquest had a deep and lasting political impact on the rest of India.\n2. In the 8th century, Arab scholars took up Brahmagupta's Brahmasiddhanta.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 The gain was cultural, not political. ❌ Statement 1 is wrong because the conquest stayed a historical and Islamic event with little political impact."
  },
  24: {
    type: "concept", icon: "🏇", accent: "#ec4899", pauseTimer: true,
    title: "The Turks and the Ghaznavids",
    html: `
      <p class="cp-lead">The <b>Turks</b> came from the north-western borders of China and accepted Islam. Indian empires could not stop them, because there was <u>internal conflict and no central power</u>. The Turks used these struggles to build their own power.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/16.png" alt="Two boxes - Turks accept Islam, and Indian states fight each other - both pointing to a th" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Facts</th></tr></thead><tbody><tr><td>Alptegin</td><td>A Turk slave of Abdul Malik, the Samani ruler of Bukhara (954–961 CE); became governor of Khurasan in 956 CE; after a conflict in 961 CE he took about 800 soldiers to Ghazni</td></tr><tr><td>Ishaq, Balkatigin, Pirai</td><td>Held Ghazni after Alptegin; Subuktagin removed Pirai</td></tr><tr><td>Subuktagin (977–997 CE)</td><td>Slave and son-in-law of Alptegin; titled Amir-ul-Umara; the first Turkish ruler to attack India; the first Turk to beat Hindushahi Jaipal</td></tr></tbody></table>
      <p class="cp-lead">The <b>Ghaznavid dynasty</b> ruled from <b>977 to 1186 CE</b>. It was a Turkish dynasty that ruled over Khorasan, Afghanistan, and the north-west of India, which is now partly Pakistan.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/17.png" alt="Ghazni Afghanistan old citadel minaret photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/18.png" alt="Family chain of five boxes in order: Alptegin, Ishaq, Balkatigin, Pirai, Subuktagin, with " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The <b>first Muslim invader</b> of India is Qasim (712 CE), but the <b>first Turk to attack</b> India is Subuktagin. Do not mix the two.</div>
      <div class="cp-note exam">The Ghaznavid dynasty is counted from 977 CE, the year Subuktagin came to power.</div>
    `
  },
  25: {
    questext: "Who was the first Turkish ruler to attack India?",
    options: ["Alptegin", "Mahmud of Ghazni", "Subuktagin", "Muhammad Ghori"],
    correct: "3",
    exptext: "✅ Subuktagin was the first Turk to attack India and to beat Hindushahi Jaipal. 📌 The first Muslim is Qasim, and the first Turk is Subuktagin. ❌ Mahmud is wrong because he was the son of Subuktagin and came later."
  },
  26: {
    questext: "The Ghaznavid dynasty ruled from 977 CE until which year?",
    options: ["1030", "1040", "1206", "1186"],
    correct: "4",
    exptext: "✅ The Ghaznavid dynasty lasted from 977 to 1186. 📌 Remember the pair 977 and 1186. ❌ 1030 is wrong because that is the year Mahmud died."
  },
  27: {
    questext: "Which Hindushahi ruler was defeated by Subuktagin?",
    options: ["Jaipal", "Anandapala", "Trilochanapala", "Dahir"],
    correct: "1",
    exptext: "✅ Subuktagin was the first Turk to beat Jaipal. 📌 The father beat Jaipal first, and the son Mahmud beat him later near Peshawar. ❌ Anandapala is wrong because Mahmud fought him in 1008."
  },
  28: {
    type: "concept", icon: "💰", accent: "#3b82f6", pauseTimer: true,
    title: "Mahmud of Ghazni (998–1030 CE)",
    html: `
      <p class="cp-lead">Mahmud was the son of Subuktagin. He became the ruler of Ghazni in <b>998 CE</b> at the age of <b>27</b>. His empire stretched from the <b>Oxus</b> river to the <b>Indus valley</b> and the Indian Ocean. He made <b>17 attacks</b> on India between <b>1000 and 1027 CE</b>, and his aim was <u>plunder, not permanent rule</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/19.png" alt="Mahmud of Ghazni miniature painting photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>What happened</th></tr></thead><tbody><tr><td>1001</td><td>Defeated the Hindushahi ruler Jaipal near Peshawar; Jaipal was freed after paying money, felt humiliated, gave power to Anandapala and killed himself</td></tr><tr><td>1008</td><td>Beat Anandapala at Waihind (the Hindushahi capital), who was backed by Kannauj and Rajasthan; took much of Punjab</td></tr><tr><td>1011</td><td>Raided Nagarkot in the Punjab hills and Thaneshwar</td></tr><tr><td>1018</td><td>Plundered Mathura and attacked Kannauj; Hardatt of Baran (Bulandshahr) surrendered; Kulchand died; about 1,000 temples were razed</td></tr><tr><td>1019</td><td>Defeated the Hindushahi ruler Trilochanapala</td></tr><tr><td>1021–22</td><td>Besieged Kalinjar and forced a treaty, but did not take the fort</td></tr><tr><td>1025–26</td><td>His biggest campaign, on Somnath in Gujarat, in the time of Bhima I; over 50,000 killed; the temple was destroyed; he returned through the Sindh desert</td></tr><tr><td>1027–1030</td><td>Last attack, on the Jats who harmed him while he was returning from Somnath; Mahmud died in 1030</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/20.png" alt="Somnath temple Gujarat photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Somnath raid of 1025–26 was the biggest of all. This is why Mahmud is remembered in History, and why paper setters like to ask about it.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/21.png" alt="Timeline of six boxes: 1001 Peshawar, 1008 Waihind, 1018 Kannauj, 1019 Trilochanapala, 102" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Kalinjar was besieged but <b>not taken</b>. Kannauj was attacked in 1018, but it fell to the Turks only in 1198, under Ghori.</div>
      <div class="cp-note exam">Mahmud came for loot, so he did not set up lasting rule in India.</div>
      <div class="cp-mnemonic">Pe-Wai-Ka-So: Peshawar, Waihind, Kannauj, Somnath.</div>
    `
  },
  29: {
    questext: "How many times did Mahmud of Ghazni attack India between 1000 and 1027 CE?",
    options: ["12", "15", "17", "20"],
    correct: "3",
    exptext: "✅ Mahmud made 17 attacks on India between 1000 and 1027. 📌 Remember seventeen raids for loot. ❌ 20 is wrong because it is more than the real count."
  },
  30: {
    questext: "Mahmud attacked Somnath in Gujarat in 1025–26 CE in the time of which ruler?",
    options: ["Bhima I", "Mularaja II", "Jayachandra", "Anandapala"],
    correct: "1",
    exptext: "✅ Bhima I ruled Gujarat at that time. 📌 Bhima goes with Somnath. ❌ Mularaja II is wrong because he was a later ruler of Gujarat, from the time of Ghori."
  },
  31: {
    questext: "In 1018 CE Mahmud plundered Mathura and attacked which other city?",
    options: ["Somnath", "Kannauj", "Multan", "Peshawar"],
    correct: "2",
    exptext: "✅ Mahmud attacked Mathura and Kannauj in 1018. 📌 Mathura comes with Kannauj. ❌ Somnath is wrong because it was attacked later, in 1025–26."
  },
  32: {
    questext: "Arrange the following attacks of Mahmud in the correct order. A. Somnath  B. Waihind  C. Kannauj  D. Peshawar",
    options: ["D, B, C, A", "D, C, B, A", "B, D, C, A", "A, D, B, C"],
    correct: "1",
    exptext: "✅ Peshawar came in 1001, Waihind in 1008, Kannauj in 1018 and Somnath in 1025–26. 📌 Pe-Wai-Ka-So. ❌ Kannauj before Waihind is wrong because Waihind fell ten years earlier."
  },
  33: {
    questext: "Consider the following statements about Mahmud of Ghazni:\n1. He attacked India mainly to build a permanent empire in the Ganga valley.\n2. His last attack, in 1027, was against the Jats who had harmed him on his way back from Somnath.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Mahmud came for loot, not for rule. ❌ Statement 1 is wrong because his raids were made for plunder."
  },
  34: {
    type: "concept", icon: "📚", accent: "#f97316", pauseTimer: true,
    title: "Mahmud's Court, Character and End",
    html: `
      <p class="cp-lead">Mahmud's court was full of scholars. <b>Firdausi</b> completed the <b>Shahnama</b> (meaning Book of Kings), and <b>Alberuni, Utbi and Farrukhi</b> also lived there. Alberuni came to India during Mahmud's invasion. He learnt <b>Sanskrit</b> and wrote the <b>Kitab-ul-Hind</b> (Tahqiq-i-Hind) around 1030 CE, which describes Indian society.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/22.png" alt="Al-Biruni portrait statue photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Name</th><th>Fact</th></tr></thead><tbody><tr><td>Firdausi</td><td>Completed the Shahnama</td></tr><tr><td>Alberuni</td><td>Wrote the Kitab-ul-Hind and learnt Sanskrit</td></tr><tr><td>Mahmud</td><td>Called Butshikan (idol-breaker); the first ruler to take the title Sultan</td></tr><tr><td>Caliph al-Qadir Billah</td><td>Gave Mahmud the titles Yamin-ud-Daula and Amin-ul-Millat</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/23.png" alt="Four-cell grid: Firdausi - Shahnama, Alberuni - Kitab-ul-Hind, Mahmud - Sultan and Butshik" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">After Mahmud, his son <b>Masud I</b> (1031–1041 CE) lost the empire. The <b>Seljuk Turks</b> took Khorasan and Khwarazm and crushed him at the Battle of <b>Dandanaqan</b> in <b>1040 CE</b>. This ended Ghaznavid power in Central Asia.</p>
      <p class="cp-lead">Mahmud's raids exposed India's military weakness and disunity. They drained wealth, opened the way for later attacks, and damaged art. At the same time, Islam found a foothold, and the <b>Sufis</b> increased contact between Hindus and Muslims.</p>
      <div class="cp-note trap">Dandanaqan (1040 CE) was fought between Masud I and the Seljuk Turks, not against an Indian ruler.</div>
      <div class="cp-note exam">Mahmud is the first Sultan, Alberuni wrote the Kitab-ul-Hind, and Firdausi wrote the Shahnama.</div>
    `
  },
  35: {
    questext: "Who completed the Shahnama in the court of Mahmud of Ghazni?",
    options: ["Alberuni", "Utbi", "Farrukhi", "Firdausi"],
    correct: "4",
    exptext: "✅ Firdausi completed the Shahnama. 📌 Firdausi goes with the Shahnama, the story of kings. ❌ Alberuni is wrong because he wrote about Indian society."
  },
  36: {
    questext: "Which work of Alberuni describes Indian society?",
    options: ["Shahnama", "Kitab-ul-Hind", "Chachnama", "Kalila wa Dimna"],
    correct: "2",
    exptext: "✅ Alberuni wrote the Kitab-ul-Hind, also called Tahqiq-i-Hind, around 1030. 📌 Hind in the title means India. ❌ Shahnama is wrong because Firdausi wrote it."
  },
  37: {
    questext: "Which ruler was the first to take the title of Sultan?",
    options: ["Subuktagin", "Alptegin", "Mahmud of Ghazni", "Masud I"],
    correct: "3",
    exptext: "✅ Mahmud was the first ruler to take the title Sultan. 📌 The title Sultan starts with Mahmud. ❌ Subuktagin is wrong because he was only titled Amir-ul-Umara."
  },
  38: {
    questext: "In 1040 CE Masud I lost the Battle of Dandanaqan to whom?",
    options: ["Samanis", "Ghurids", "Rajputs", "Seljuk Turks"],
    correct: "4",
    exptext: "✅ The Seljuk Turks crushed Masud I at Dandanaqan and ended Ghaznavid power in Central Asia. 📌 Dandanaqan in 1040 goes with the Seljuks. ❌ The Rajputs are wrong because it was not an Indian battle."
  },
  39: {
    type: "concept", icon: "🏔️", accent: "#84cc16", pauseTimer: true,
    title: "Rise of the Ghurids and Muhammad Ghori",
    html: `
      <p class="cp-lead">The <b>Ghurids</b> rose in <b>Ghor</b> (Guhr), a hill land between the Ghaznavids and the Seljuks. The pressure of the Seljuks and the Turkish tribes from across the <b>Oxus</b> river pushed them towards India.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/24.png" alt="Three regions in a row: Seljuks, Ghor, Ghaznavids, with a thick label showing a push towar" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1163 CE</td><td>Ghiyasuddin Muhammad took Ghor and made his younger brother Muhammad Ghori the ruler of Ghazna</td></tr><tr><td>1173 CE</td><td>Ghori began to rule Ghazna</td></tr><tr><td>1175–1206 CE</td><td>Ghori attacked India</td></tr></tbody></table>
      <p class="cp-lead">His real name was <b>Muizz-ud-Din Muhammad bin Sam</b>. He is also called <b>Shihabuddin Muhammad Ghori</b>. He is called the <u>real founder of the Muslim empire in India</u>. His coins carried the <b>Kalma</b> on one side and the figure of <b>Goddess Lakshmi</b> on the other.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/25.png" alt="Muhammad Ghori gold coin Lakshmi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The saint <b>Moinuddin Chishti</b> came to India with Ghori and founded the <b>Chishti order</b> here.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/26.png" alt="Ajmer Sharif Dargah Moinuddin Chishti photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Qasim was the first Muslim invader (712 CE) and the first to collect Jizya. Subuktagin was the first Turk to attack India. Ghori was the real founder of Muslim rule in India. Muslim rule was established by the Turks, not by the Arabs.</div>
      <div class="cp-note exam">Remember the three firsts: Qasim the first Muslim invader, Subuktagin the first Turk to attack, and Ghori the real founder of Muslim rule.</div>
    `
  },
  40: {
    questext: "What was the real name of Muhammad Ghori?",
    options: ["Ghiyasuddin Muhammad", "Qutbuddin Aibak", "Muizz-ud-Din Muhammad bin Sam", "Subuktagin"],
    correct: "3",
    exptext: "✅ His real name was Muizz-ud-Din Muhammad bin Sam, and he was also called Shihabuddin. 📌 The name starts with Muizz. ❌ Ghiyasuddin Muhammad is wrong because he was his elder brother."
  },
  41: {
    questext: "Who made Muhammad Ghori the ruler of Ghazna?",
    options: ["His elder brother Ghiyasuddin Muhammad", "Mahmud of Ghazni", "Masud I", "Qutbuddin Aibak"],
    correct: "1",
    exptext: "✅ Ghiyasuddin Muhammad took Ghor in 1163 and made his younger brother ruler of Ghazna. 📌 The elder brother gave Ghazna to the younger one. ❌ Mahmud is wrong because he died in 1030, long before."
  },
  42: {
    questext: "The coins of Muhammad Ghori carried the Kalma on one side and which figure on the other side?",
    options: ["A lion", "Lord Shiva", "Goddess Parvati", "Goddess Lakshmi"],
    correct: "4",
    exptext: "✅ Ghori's coins showed Goddess Lakshmi on one side. 📌 Kalma on one side, Lakshmi on the other. ❌ Lord Shiva is wrong because the coins showed a goddess."
  },
  43: {
    type: "concept", icon: "🛡️", accent: "#06b6d4", pauseTimer: true,
    title: "Ghori's Campaigns in India, 1175–1191 CE",
    html: `
      <p class="cp-lead">Ghori's campaigns in India ran from <b>1175 to 1206 CE</b>. He first attacked Multan and Uch, then tried Gujarat, and later turned to the strong fort of Bhatinda in the north.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/27.png" alt="Timeline of four boxes: 1175 Multan and Uch, 1178 Kayadra defeat, 1189 Bhatinda, 1191 Firs" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Place</th><th>What happened</th></tr></thead><tbody><tr><td>1175</td><td>Multan and Uch</td><td>His first invasion of the subcontinent</td></tr><tr><td>1178</td><td>Gujarat (Kayadra)</td><td>He entered through the Rajasthan desert and failed; the Rajput Chalukyas (Solankis) of Anahilavada beat him; this was Ghori's first defeat in India</td></tr><tr><td>1189</td><td>Bhatinda</td><td>He took the fort under Prithviraj Chauhan; this was the immediate cause of Tarain</td></tr><tr><td>1191</td><td>First Tarain</td><td>Ghori took Tabarhinda (Bhatinda), the key to Delhi's defence; Prithviraj beat him; a Khilji horseman saved the wounded Ghori</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/28.png" alt="Mount Abu Rajasthan hills desert landscape photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Remember that Ghori's first defeat came in the west, in Gujarat, and not at Tarain. At Tarain he lost to Prithviraj Chauhan one year before he won.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/29.png" alt="Bathinda Qila Mubarak fort photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Ghori's first defeat in India was at <b>Kayadra</b> (1178 CE), not at Tarain.</div>
      <div class="cp-note exam">The immediate cause of the First Battle of Tarain was the capture of Bhatinda in 1189.</div>
      <div class="cp-mnemonic">75 Multan, 78 Kayadra, 89 Bhatinda, 91 Tarain.</div>
    `
  },
  44: {
    questext: "What was the target of Muhammad Ghori's first invasion of the subcontinent in 1175 CE?",
    options: ["Gujarat", "Multan and Uch", "Bhatinda", "Kannauj"],
    correct: "2",
    exptext: "✅ His first invasion in 1175 was against Multan and Uch. 📌 The year 1175 goes with Multan. ❌ Gujarat is wrong because it was attacked later, in 1178."
  },
  45: {
    questext: "Where did Muhammad Ghori suffer his first defeat in India in 1178 CE?",
    options: ["Tarain", "Chandawar", "Kayadra", "Damyak"],
    correct: "3",
    exptext: "✅ The Chalukyas of Anahilavada beat him at Kayadra in Gujarat. 📌 The first defeat was in the west, at Kayadra. ❌ Tarain is wrong because he lost the First Battle of Tarain in 1191, which was later."
  },
  46: {
    questext: "What was the immediate cause of the First Battle of Tarain?",
    options: ["Ghori's capture of Bhatinda in 1189", "Ghori's defeat at Kayadra", "The death of Jayachandra", "The raid on Somnath"],
    correct: "1",
    exptext: "✅ Ghori took the fort of Bhatinda in 1189, which led to Tarain. 📌 Bhatinda first, and Tarain after it. ❌ Kayadra is wrong because it was an earlier defeat in far-away Gujarat."
  },
  47: {
    questext: "Who won the First Battle of Tarain in 1191 CE?",
    options: ["Muhammad Ghori", "Jayachandra", "Bhima II", "Prithviraj Chauhan"],
    correct: "4",
    exptext: "✅ Prithviraj Chauhan won, and a Khilji horseman saved the wounded Ghori. 📌 The year 1191 goes with Prithviraj. ❌ Ghori is wrong because he won only in 1192."
  },
  48: {
    type: "concept", icon: "🐘", accent: "#e11d48", pauseTimer: true,
    title: "Second Tarain and Chandawar, 1192–1194 CE",
    html: `
      <p class="cp-lead">The <b>Second Battle of Tarain (1192 CE)</b> was a <u>turning point in Indian history</u>. The writer Minhaj-i-Siraj says Ghori had <b>120,000 armoured men</b>, and the writer Ferishta says Prithviraj had <b>3,000 elephants</b> and <b>300,000 cavalry</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/30.png" alt="Two armies facing each other: on the left the Rajput army with heavy elephants, on the rig" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Ghori's <b>light mounted archers</b> confused the slower Rajput army, and Prithviraj lost. <u>Speed beat size.</u></p>
      <table><thead><tr><th>Battle</th><th>Year</th><th>Winner and result</th></tr></thead><tbody><tr><td>Second Tarain</td><td>1192</td><td>Ghori won; he then took Hansi, Samana, Meerut and Aligarh, and Delhi came under Turkish rule</td></tr><tr><td>Chandawar</td><td>1194</td><td>Ghori, with 50,000 horsemen, beat Jayachandra, the Gahadavala king of Kannauj and Banaras; Varanasi was plundered</td></tr></tbody></table>
      <p class="cp-lead">At <b>Chandawar</b> (modern <b>Etawah</b>) Ghori fought <b>Jayachandra</b>, the Gahadavala king of Kannauj. <b>Varanasi</b>, an early Gahadavala city, was plundered. Kannauj itself fell only in <b>1198 CE</b>. Tarain and Chandawar together founded Turkish rule in the Ganga valley.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/31.png" alt="Prithviraj Chauhan statue Ajmer photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The story of Prithviraj is told in two famous works: the <b>Prithviraj Raso</b> by <b>Chand Bardai</b>, and the Sanskrit <b>Prithviraja Vijaya</b> by <b>Jayanaka</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/32.png" alt="Etawah Uttar Pradesh Yamuna river photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap"><b>First Tarain (1191)</b>: Prithviraj won. <b>Second Tarain (1192)</b>: Ghori won. <b>Chandawar (1194)</b>: Ghori beat Jayachandra, but Kannauj itself fell only in 1198.</div>
      <div class="cp-note exam">After Chandawar, the Gahadavalas were no longer a danger, and Turkish rule was now firm in the Ganga valley.</div>
      <div class="cp-mnemonic">91 Prithviraj wins, 92 Ghori wins, 94 Chandawar.</div>
    `
  },
  49: {
    questext: "Which battle of 1192 CE is called a turning point in Indian history?",
    options: ["Chandawar", "Dandanaqan", "Second Battle of Tarain", "Hydaspes"],
    correct: "3",
    exptext: "✅ In the Second Battle of Tarain, Ghori's light mounted archers beat Prithviraj. 📌 The year 1192 means Ghori wins. ❌ Chandawar is wrong because it was fought in 1194."
  },
  50: {
    questext: "In which year did Muhammad Ghori defeat the Gahadavala king Jayachandra at Chandawar?",
    options: ["1194", "1192", "1191", "1198"],
    correct: "1",
    exptext: "✅ The Battle of Chandawar was fought in 1194. 📌 The year 1194 goes with Chandawar. ❌ 1198 is wrong because that is the year Kannauj itself fell."
  },
  51: {
    questext: "Chandawar, the battlefield of 1194 CE, lies near which modern town?",
    options: ["Ajmer", "Meerut", "Aligarh", "Etawah"],
    correct: "4",
    exptext: "✅ Chandawar is near modern Etawah. 📌 Chandawar and Etawah go together. ❌ Meerut is wrong because Ghori took it after the Second Battle of Tarain."
  },
  52: {
    questext: "What helped Ghori to win the Second Battle of Tarain?",
    options: ["A large force of elephants", "Light mounted archers who confused the slower Rajput army", "Help from the Gahadavala king", "Ships on the river"],
    correct: "2",
    exptext: "✅ Quick mounted archers confused the heavier Rajput army. 📌 Speed beat size. ❌ Elephants are wrong because the elephants belonged to the army of Prithviraj."
  },
  53: {
    questext: "Which of the following pairs of battle and year is correct?",
    options: ["Chandawar — 1194", "Second Tarain — 1191", "Kayadra — 1189", "First Tarain — 1192"],
    correct: "1",
    exptext: "✅ Chandawar was fought in 1194. 📌 First Tarain 1191, Second Tarain 1192, Chandawar 1194. ❌ Second Tarain in 1191 is wrong because 1191 belongs to the first battle."
  },
  54: {
    type: "concept", icon: "🏁", accent: "#a855f7", pauseTimer: true,
    title: "The End of Ghori and the Slave Generals",
    html: `
      <p class="cp-lead">In <b>1205–1206 CE</b>, Ghori led his last campaign against the <b>Khokhar</b> tribes of Punjab. He was killed at <b>Damyak</b>, near the Sindh (Indus) river, in <b>1206 CE</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/33.png" alt="Muhammad Ghori tomb Sohawa Damik Pakistan photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">After his death, his trusted slaves took charge: <b>Yildiz (Yaldoz)</b>, <b>Qubacha</b> and <b>Qutbuddin Aibak</b>. Aibak founded the <b>Mamluk dynasty</b> at Delhi.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Slaves of Ghori</td><td>Yildiz, Qubacha and Qutbuddin Aibak</td></tr><tr><td>First Turkish dynasty at Delhi</td><td>Mamluk dynasty, founded by Aibak</td></tr><tr><td>Quwwat-ul-Islam mosque</td><td>Begun by Aibak at Delhi in 1192</td></tr><tr><td>Qutb Minar</td><td>Begun by Aibak at Delhi and completed by Iltutmish</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/34.png" alt="Simple tree: Muhammad Ghori at the top with three branches - Yildiz, Qubacha, Qutbuddin Ai" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Qutb Minar and the Quwwat-ul-Islam mosque are the best-known buildings of this early Turkish rule at Delhi.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/35.png" alt="Qutb Minar Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Ghori is the <b>real founder</b> of Muslim rule in India, but the <b>Mamluk dynasty at Delhi</b> was founded by Aibak, his slave.</div>
      <div class="cp-note exam">Remember that Aibak began the Quwwat-ul-Islam mosque (1192) and the Qutb Minar, and that Iltutmish completed the Qutb Minar.</div>
      <div class="cp-mnemonic">Aibak begins, Iltutmish finishes.</div>
    `
  },
  55: {
    questext: "Muhammad Ghori was killed at Damyak in 1206 CE while campaigning against which tribes?",
    options: ["Jats", "Khokhars", "Gahadavalas", "Chandelas"],
    correct: "2",
    exptext: "✅ Ghori was killed near the Sindh river on his campaign against the Khokhars of Punjab. 📌 Damyak goes with the Khokhars. ❌ The Jats are wrong because they troubled Mahmud, not Ghori."
  },
  56: {
    questext: "Which slave of Muhammad Ghori founded the Mamluk dynasty at Delhi?",
    options: ["Yildiz", "Qubacha", "Qutbuddin Aibak", "Chach"],
    correct: "3",
    exptext: "✅ Qutbuddin Aibak founded the Mamluk dynasty at Delhi. 📌 Aibak goes with Delhi. ❌ Qubacha is wrong because he was another slave of Ghori, not the founder."
  },
  57: {
    questext: "The Qutb Minar at Delhi, begun by Qutbuddin Aibak, was completed by whom?",
    options: ["Balban", "Alauddin Khalji", "Muhammad bin Tughluq", "Iltutmish"],
    correct: "4",
    exptext: "✅ Iltutmish completed the Qutb Minar. 📌 Aibak began it and Iltutmish finished it. ❌ Alauddin Khalji is wrong because he came much later."
  },
  58: {
    questext: "Who wrote the Prithviraj Raso, the story of Prithviraj Chauhan?",
    options: ["Chand Bardai", "Jayanaka", "Firdausi", "Ali Kufi"],
    correct: "1",
    exptext: "✅ Chand Bardai wrote the Prithviraj Raso. 📌 Bardai means the bard. ❌ Jayanaka is wrong because he wrote the Sanskrit work Prithviraja Vijaya."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an old gold coin showing a goddess figure, the outline of a medieval fort and a rolled parchment map of north India" },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Persepolis Achaemenid palace ruins Iran photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/1.png. the ruins of a great Persian royal city, to show the power of the Achaemenid empire",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/2.png": { t: "fig", about: "Straight timeline with four boxes: Cyrus II 558 BCE, Darius I 522 BCE with Gandhara 516 BCE, Xerxes 486 BCE, Darius III 331 BCE." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/3.png": { t: "fig", about: "Two boxes joined by a line: Aramaic script (Iran) on the left and Kharosthi script (written right to left) on the right, with the label Became." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Alexander the Great marble bust museum photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/4.png. a clear bust of Alexander, to show who he was",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/5.png": { t: "fig", about: "Schematic, not a map: a chain of seven boxes joined in order - Balkh (Bactria), Kabul, Hindu Kush, Khyber Pass, Taxila, Jhelum, Beas." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jhelum River Pakistan landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/6.png. the river Jhelum, where Alexander fought Porus",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Banbhore ancient port ruins Sindh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/7.png. the ruins of an early port town of Sindh",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/8.png": { t: "fig", about: "Three boxes around one centre box labelled Kannauj: Palas, Gurjara-Pratiharas, Rashtrakutas; the Gurjara-Pratiharas box is marked Winner." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/9.png": { t: "fig", about: "Chain of four boxes in order: Rai Sahasi II, Chach, Chandar, Dahir, with the title Rulers of Sindh." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Banbhore Debal Sindh ruins photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/10.png. the ruins of the old port town linked with Deval (Debal)",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/11.png": { t: "fig", about: "Schematic, not a map: a path of seven boxes in order - Deval, Nirun, Sehban, Rawar, Brahmanabad, Aror, Multan - with the years 712 and 713 marked." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Multan fort city Pakistan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/12.png. the city of Multan, called the Golden City",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/13.png": { t: "fig", about: "Two columns: Political effect labelled Very small, and Cultural exchange labelled Large, with a balance scale tilted towards cultural exchange." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kalila wa Dimna illustrated Arabic manuscript photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/14.png. an old Arabic manuscript of the animal fables",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/15.png": { t: "fig", about: "Three boxes on the left - Panchatantra, Brahmasiddhanta, Khandanakhandakhadya - joined to one box on the right labelled Arab scholars, with the title Indian ideas reach Arabia." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/16.png": { t: "fig", about: "Two boxes - Turks accept Islam, and Indian states fight each other - both pointing to a third box labelled Turkish advance." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ghazni Afghanistan old citadel minaret photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/17.png. the old city of Ghazni, the home of the Ghaznavid rulers",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/18.png": { t: "fig", about: "Family chain of five boxes in order: Alptegin, Ishaq, Balkatigin, Pirai, Subuktagin, with the title Rulers of Ghazni." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahmud of Ghazni miniature painting photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/19.png. an old painting of Mahmud of Ghazni",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Somnath temple Gujarat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/20.png. the Somnath temple, which Mahmud attacked in 1025–26",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/21.png": { t: "fig", about: "Timeline of six boxes: 1001 Peshawar, 1008 Waihind, 1018 Kannauj, 1019 Trilochanapala, 1025–26 Somnath, 1027 Jats." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Al-Biruni portrait statue photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/22.png. a portrait or statue of the scholar Alberuni",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/23.png": { t: "fig", about: "Four-cell grid: Firdausi - Shahnama, Alberuni - Kitab-ul-Hind, Mahmud - Sultan and Butshikan, Masud I - Dandanaqan 1040." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/24.png": { t: "fig", about: "Three regions in a row: Seljuks, Ghor, Ghaznavids, with a thick label showing a push towards India." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Muhammad Ghori gold coin Lakshmi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/25.png. a Ghori coin that shows the goddess Lakshmi on one side",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ajmer Sharif Dargah Moinuddin Chishti photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/26.png. the shrine of the saint at Ajmer",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/27.png": { t: "fig", about: "Timeline of four boxes: 1175 Multan and Uch, 1178 Kayadra defeat, 1189 Bhatinda, 1191 First Tarain." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mount Abu Rajasthan hills desert landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/28.png. the hill and desert country of Rajasthan that Ghori had to cross",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bathinda Qila Mubarak fort photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/29.png. the old fort of Bhatinda, taken by Ghori in 1189",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/30.png": { t: "fig", about: "Two armies facing each other: on the left the Rajput army with heavy elephants, on the right Ghori's light mounted archers, with the label Second Tarain 1192." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Prithviraj Chauhan statue Ajmer photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/31.png. the statue of the Chauhan king Prithviraj",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Etawah Uttar Pradesh Yamuna river photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/32.png. the Etawah region of Uttar Pradesh, where Chandawar lies",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Muhammad Ghori tomb Sohawa Damik Pakistan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/33.png. the tomb of Muhammad Ghori near the place where he was killed",
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/34.png": { t: "fig", about: "Simple tree: Muhammad Ghori at the top with three branches - Yildiz, Qubacha, Qutbuddin Aibak - and the Aibak branch labelled Mamluk dynasty at Delhi." },
  "images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Qutb Minar Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India/35.png. the Qutb Minar at Delhi, begun by Aibak and completed by Iltutmish"
});

/* CHANGE LOG
   - Darius III's reign is written as 336–330 BCE (it was shown as 360–330 BCE).
   - Alexander's age at death is written as 32 (it was shown as 33).
   - Statement about Harsha holding Sindh is left out because it is not certain.
   - Multan, 713 CE: the line that Qasim died soon after is replaced by a safe line, because his death is placed later, after his recall.
   - Kalinjar raid of 1021–22: the ruler's name is left out because it is not certain.
   - Gujarat battle of 1178: the ruler is written only as the Chalukya (Solanki) ruler of Anahilavada, because two names were printed and not settled; no question asks for this name.
   - Ghori's attacks are written as 1175–1206 CE (the period was printed both as 1175–1205 and 1175–1206).
   - After the Second Battle of Tarain, the line that Delhi became Ghori's capital is changed to Delhi coming under Turkish rule, because Ghori's own capital stayed Ghazni.
*/
