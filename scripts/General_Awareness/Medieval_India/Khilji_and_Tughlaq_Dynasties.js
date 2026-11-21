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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Khilji_and_Tughlaq_Dynasties · 17 concept pages (+ overview) · 34 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "KHILJI & TUGHLAQ",
      line2: "DELHI SULTANATE",
      line3: "MEDIEVAL INDIA",
      badge: "FULL CLASS",
      ribbon: "DATES • REFORMS • TRAPS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Khilji & Tughlaq Dynasties Full Class | Medieval India for SSC CGL",
      altTitles: ["Alauddin Khilji Market Reforms and Muhammad bin Tughlaq Experiments", "Delhi Sultanate Khilji Tughlaq in One Class | SSC CGL History"],
      description: "Khilji and Tughlaq dynasties are a sure shot topic in SSC CGL, Railways and Banking exams. In this simple class we move step by step from Jalaluddin Khilji to Timur's invasion.\n\n📌 IN THIS CLASS\n✅ Alauddin Khilji: campaigns, army and market reforms\n✅ Malik Kafur and the Deccan\n✅ Ghiyasuddin Tughlaq and Muhammad bin Tughlaq's five experiments\n✅ Firuz Shah: canals and welfare departments\n✅ Timur's invasion of 1398\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\nSee the chapter list below.\n\n👍 Like, share, subscribe.\n\n#SSCCGL #MedievalIndia #DelhiSultanate",
      tags: ["khilji dynasty", "tughlaq dynasty", "delhi sultanate", "alauddin khilji", "muhammad bin tughlaq", "firuz shah tughlaq", "medieval india", "malik kafur", "market reforms", "ghiyasuddin tughlaq", "jalaluddin khilji", "timur invasion 1398", "ssc cgl history", "ssc cgl 2026", "general awareness", "indian history for ssc", "history mcq", "railway exam history", "banking exam gk", "static gk", "history tricks", "five experiments", "token currency", "khilji tughlaq full class", "competitive exams", "previous year questions", "important questions", "tricks"],
      hashtags: ["SSCCGL", "MedievalIndia", "DelhiSultanate"],
      thumbText: "KHILJI + TUGHLAQ",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏰 New class is live: Khilji and Tughlaq Dynasties. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Jalaluddin Khilji\n00:00 Alauddin Khilji\n00:00 Malik Kafur and the Deccan\n00:00 Reforms of Alauddin\n00:00 Decline of the Khiljis\n00:00 Ghiyasuddin Tughlaq\n00:00 Muhammad bin Tughlaq\n00:00 Firuz Shah Tughlaq\n00:00 Timur and the end",
      playlist: "Medieval India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Khilji and Tughlaq dynasties of the Delhi Sultanate</u>. We will meet the rulers, learn their wars and reforms, and remember the dates, names and traps that come again and again in exams.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>17</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>34</b><span>Questions</span></div>
        <div class="cp-stat"><b>~68 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Jalaluddin Khilji</b><br>How the first Khilji Sultan came to power, why his rule was gentle, and how he was killed by his own nephew.</li>
        <li><b>Alauddin Khilji — Rise and Northern Campaigns</b><br>How Alauddin became Sultan and how he conquered Gujarat, Ranthambore, Chittor, Malwa and Marwar.</li>
        <li><b>Deccan Campaigns of Malik Kafur</b><br>Why the Deccan was attacked for wealth and not for land, and which kingdoms paid tribute.</li>
        <li><b>Reforms of Alauddin</b><br>His control over nobles, his army, land revenue and the famous market system with fixed prices.</li>
        <li><b>Decline of the Khiljis</b><br>How the dynasty fell within four years of Alauddin's death.</li>
        <li><b>Ghiyasuddin Tughlaq</b><br>The founder of the Tughlaq dynasty, his policies and his sudden death.</li>
        <li><b>Muhammad bin Tughlaq</b><br>His five bold experiments and why most of them failed.</li>
        <li><b>Firuz Shah Tughlaq</b><br>A Sultan of canals, welfare departments and new cities.</li>
        <li><b>Successors and the End</b><br>Timur's attack on Delhi in 1398 and the end of the Tughlaqs.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Alauddin's market reforms, Muhammad bin Tughlaq's experiments and Firuz Shah's canals are asked almost every year in SSC CGL, so every date and name here is worth remembering.</div>
    `
  },
  2: {
    type: "concept", icon: "🏰", accent: "#22c55e", pauseTimer: true,
    title: "Jalaluddin Khilji (1290–1296)",
    html: `
      <p class="cp-lead">The <b>Khilji dynasty</b> ruled Delhi from 1290 to 1320. Its first Sultan was <b>Jalaluddin Khilji</b>, who ruled from 1290 to 1296.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/1.png" alt="Jalaluddin Khilji Delhi Sultan coin portrait photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Before he became Sultan, he served the last Mamluk Sultan, <b>Muizzuddin Kaikubad</b>. He was Governor of <b>Samana</b> and also <b>Sar-e-Jahandar</b>, the chief of the royal bodyguard. Kaikubad gave him the title <b>Shaista Khan</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Founder</td><td>Jalaluddin Khilji</td></tr><tr><td>Title given by Kaikubad</td><td>Shaista Khan</td></tr><tr><td>Capital</td><td>Kilokhari</td></tr><tr><td>Style of rule</td><td>Gentle, based on the will of the people</td></tr></tbody></table>
      <p class="cp-lead">Jalaluddin made <b>Kilokhari</b> his capital. He gave up the harsh <b>'blood and iron'</b> policy of the earlier Sultan Balban. He was the first medieval ruler to base his rule on the <b>'will of the people'</b>, which means he wanted the goodwill of the people and not only their fear.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/2.png" alt="Two boxes side by side. Left box: Balban, blood and iron, rule by fear. Right box: Jalalud" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Mongols attacked in 1292 under <b>Abdullah</b>, and again under <b>Ulugh Khan</b>, a grandson of Halaku. About <b>4,000</b> Mongols accepted Islam and settled near Delhi at <b>Mughalpur</b> (also called <b>Mongolpuri</b>). They were called the <b>'New Muslims' (Navi Musalman)</b>.</p>
      <p class="cp-lead">His nephew <b>Ali Gurshasp</b>, who later became Alauddin, raided <b>Bhilsa</b> in 1293 and <b>Devagiri</b> in 1296. After the Devagiri raid he killed Jalaluddin at <b>Kara-Manikpur</b> in <b>July 1296</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/3.png" alt="Simple timeline with four boxes in order: 1290 Jalaluddin crowned, 1292 Mongol attack, 129" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Shaista Khan was a title given to him before he became Sultan, while Kilokhari was the city he chose after he became Sultan. Do not mix the two.</div>
      <div class="cp-note exam">Questions often ask for the capital (Kilokhari), the title (Shaista Khan), the place of the New Muslims (Mughalpur) and the place of his murder (Kara-Manikpur).</div>
    `
  },
  3: {
    questext: "Which city was the capital of Jalaluddin Khilji?",
    options: ["Kilokhari", "Siri", "Tughlaqabad", "Daulatabad"],
    correct: "1",
    exptext: "✅ Kilokhari was his capital. 📌 Think of \"Khilji and Kilokhari\", both start with the same sound. ❌ Siri is wrong because it was built later by Alauddin Khilji."
  },
  4: {
    questext: "The Mongols who accepted Islam and settled near Delhi in the time of Jalaluddin Khilji were called",
    options: ["Turkish slaves", "Ulema", "New Muslims", "Amirs"],
    correct: "3",
    exptext: "✅ They were called New Muslims (Navi Musalman) and lived at Mughalpur. 📌 New faith, new name. ❌ Amirs is wrong because that word means nobles of the court."
  },
  5: {
    type: "concept", icon: "⚔️", accent: "#f59e0b", pauseTimer: true,
    title: "Alauddin Khilji (1296–1316)",
    html: `
      <p class="cp-lead"><b>Alauddin Khilji</b> was the greatest Sultan of the Khilji dynasty. He came to the throne by killing his own uncle, and later made the Sultanate strong with a big army and strict rules.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/4.png" alt="Alauddin Khilji historical painting Delhi Sultan" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He killed his uncle and father-in-law Jalaluddin in 1296 and took the title <b>'Sikander-i-Sani'</b>, which means the Second Alexander. In Delhi, Jalaluddin's widow <b>Malika-e-Jahan</b> made her younger son <b>Qadr Khan</b> (<b>Ruknuddin Ibrahim</b>) the Sultan.</p>
      <table><thead><tr><th>Event</th><th>What happened</th></tr></thead><tbody><tr><td>Alauddin's march</td><td>From Kara to Delhi, scattering gold and silver coins on the way</td></tr><tr><td>Ibrahim</td><td>Fled to Multan</td></tr><tr><td>Crowned</td><td>October 1296</td></tr><tr><td>Title taken</td><td>Sikander-i-Sani (Second Alexander)</td></tr></tbody></table>
      <p class="cp-lead">Alauddin marched from Kara to Delhi and scattered gold and silver coins along the road. This won the support of the people and the nobles. Ibrahim ran away to <b>Multan</b>, and Alauddin was crowned in <b>October 1296</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/5.png" alt="Simple route picture, schematic and not a map: a box Kara on the left, an arrow labelled g" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Jalaluddin was killed in July 1296, but Alauddin was crowned in October 1296. Do not use the two months as one date.</div>
      <div class="cp-note exam">Remember the title Sikander-i-Sani with the name Alauddin, and remember that Ibrahim fled to Multan.</div>
    `
  },
  6: {
    questext: "Which title did Alauddin Khilji take for himself?",
    options: ["Shaista Khan", "Ghazi", "Ulugh Khan", "Sikander-i-Sani"],
    correct: "4",
    exptext: "✅ Alauddin called himself Sikander-i-Sani, the Second Alexander. 📌 Alexander was a great conqueror, and so was Alauddin. ❌ Shaista Khan is wrong because that was the title of Jalaluddin Khilji."
  },
  7: {
    type: "concept", icon: "🗡️", accent: "#ef4444", pauseTimer: true,
    title: "Alauddin's Northern Campaigns (1298–1308)",
    html: `
      <p class="cp-lead">Alauddin conquered a large part of North India in ten years. Each campaign has a ruler, a year and one famous fact, and exams ask for all three.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/6.png" alt="Ranthambore Fort Rajasthan walls photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Campaign (year)</th><th>Ruler</th><th>What happened</th></tr></thead><tbody><tr><td>Gujarat (1298–99)</td><td>Raikarna</td><td>Somnath temple and Surat looted, capital Anhilwara taken. At Khambhat, Nusrat Khan bought the eunuch Malik Kafur, called 'Hazaar Dinaari'</td></tr><tr><td>Ranthambore (1301)</td><td>Hammirdev</td><td>Siege of about 1 year. Minister Ranmal turned against his king. Hammirdev died fighting and Nusrat Khan was killed. Queen Rang Devi and the Rajput women performed Jauhar</td></tr><tr><td>Chittor (1303)</td><td>Rana Ratan Singh</td><td>Amir Khusro was present. Malik Muhammad Jayasi wrote about it in Padmavat. The Mongol Taragi Beg attacked Delhi during the siege. Chittor was renamed Khijrabad and Khijr Khan was made ruler</td></tr><tr><td>Malwa (1305)</td><td>Mahalakdev</td><td>Most Rajputs submitted after Chittor, but Mahalakdev refused and was conquered</td></tr><tr><td>Marwar (1308)</td><td>None named</td><td>Conquered. This was the last northern campaign</td></tr></tbody></table>
      <p class="cp-lead"><b>Jauhar</b> means that Rajput women gave up their lives by fire to avoid capture. <b>Malik Kafur</b> was a slave of great talent who later became the chief commander of Alauddin.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/7.png" alt="Horizontal timeline of five boxes: 1298 Gujarat, 1301 Ranthambore, 1303 Chittor, 1305 Malw" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Mongols also attacked Delhi many times in this reign. Alauddin beat them at <b>Jalandhar (1298)</b>, <b>Kili (1299)</b>, <b>Amroha (1305)</b> and <b>Ravi (1306)</b>.</p>
      <div class="cp-note trap">In 1303 Alauddin won Chittor in the north, but in the same year his army lost to the Kakatiyas at Warangal in the south. Do not say that he won everywhere in 1303.</div>
      <div class="cp-note exam">Match each campaign with its ruler: Ranthambore with Hammirdev, Chittor with Ratan Singh, Malwa with Mahalakdev, Gujarat with Raikarna.</div>
    `
  },
  8: {
    questext: "Alauddin Khilji besieged Ranthambore in 1301. Which ruler defended it?",
    options: ["Raikarna", "Hammirdev", "Mahalakdev", "Ratan Singh"],
    correct: "2",
    exptext: "✅ Hammirdev was the ruler of Ranthambore and died fighting. 📌 Hammirdev goes with Ranthambore because both names are linked to a long siege. ❌ Ratan Singh is wrong because he ruled Chittor."
  },
  9: {
    questext: "The epic poem Padmavat, which tells the story of the siege of Chittor, was written by",
    options: ["Amir Khusro", "Ziauddin Barani", "Malik Muhammad Jayasi", "Ibn Battuta"],
    correct: "3",
    exptext: "✅ Malik Muhammad Jayasi wrote Padmavat. 📌 Jayasi and Chittor go together in one story. ❌ Amir Khusro is wrong because he was present at the siege but is known for other works."
  },
  10: {
    questext: "Consider the following statements about the campaigns of Alauddin Khilji:\n1. Malik Kafur was bought at Khambhat by Nusrat Khan.\n2. Ranthambore was conquered in 1303.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because Nusrat Khan bought Malik Kafur at Khambhat. 📌 Ranthambore is 1301 and Chittor is 1303. ❌ Statement 2 is wrong because Ranthambore fell in 1301."
  },
  11: {
    type: "concept", icon: "🧭", accent: "#8b5cf6", pauseTimer: true,
    title: "Deccan Campaigns of Malik Kafur",
    html: `
      <p class="cp-lead"><b>Malik Kafur</b> became the chief commander of Alauddin and led the army to South India. His aim was <u>wealth and tribute, not permanent rule</u>, so the Deccan policy was <b>economic</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/8.png" alt="Devagiri Daulatabad Fort Maharashtra photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Before the southern wars, Alauddin trusted a group of strong supporters: his brothers <b>Ulugh Khan</b>, <b>Nusrat Khan</b> and <b>Zafar Khan</b>, and his brother-in-law <b>Alp Khan</b>. In <b>1303</b> the <b>Kakatiyas</b> defeated Alauddin's army at <b>Warangal</b>, and this made him plan the later wars more carefully.</p>
      <table><thead><tr><th>Year</th><th>Place</th><th>Result</th></tr></thead><tbody><tr><td>1307</td><td>Devagiri (Yadava king Ramchandra Dev)</td><td>Yadavas forced to pay tribute</td></tr><tr><td>1309</td><td>Warangal (Kakatiya king Prataparudra)</td><td>Prataparudra paid tribute</td></tr><tr><td>1310</td><td>Dwarasamudra (Hoysala king Ballala III)</td><td>Hoysalas paid tribute</td></tr><tr><td>1311</td><td>Madurai (Pandya kingdom)</td><td>Pandya capital taken and temples looted</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/9.png" alt="Schematic, not a map: four boxes in a line from north to south with years: 1307 Devagiri, " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In the Pandya kingdom, <b>Sundara Pandya</b> asked for help against his brother, and Kafur used this chance to take the Pandya capital <b>Madurai</b>. In <b>1313</b> Ramchandra Dev's son <b>Shankardev</b> stopped paying tribute to Delhi, so Malik Kafur attacked Devagiri again and killed him.</p>
      <div class="cp-note trap">Do not think that the Deccan kingdoms were annexed. Most of them only paid tribute and kept their rulers.</div>
      <div class="cp-note exam">Learn the order Devagiri 1307, Warangal 1309, Dwarasamudra 1310, Madurai 1311 with the kings Ramchandra Dev, Prataparudra, Ballala III and Sundara Pandya.</div>
    `
  },
  12: {
    questext: "Which Kakatiya ruler paid tribute to Alauddin Khilji after the attack of Malik Kafur in 1309?",
    options: ["Ballala III", "Ramchandra Dev", "Sundara Pandya", "Prataparudra"],
    correct: "4",
    exptext: "✅ Prataparudra of Warangal paid tribute. 📌 Warangal and Kakatiya always go together. ❌ Ballala III is wrong because he ruled the Hoysalas at Dwarasamudra."
  },
  13: {
    questext: "Malik Kafur attacked Dwarasamudra in 1310. This was the capital of which kingdom?",
    options: ["Yadavas", "Hoysalas", "Kakatiyas", "Pandyas"],
    correct: "2",
    exptext: "✅ Dwarasamudra was the Hoysala capital. 📌 Hoysala and Dwarasamudra both have a \"sa\" sound. ❌ Pandyas is wrong because their capital was Madurai."
  },
  14: {
    type: "concept", icon: "🏛️", accent: "#14b8a6", pauseTimer: true,
    title: "Administrative Reforms of Alauddin",
    html: `
      <p class="cp-lead">Alauddin wanted all power in his own hands. He changed how the government worked so that no noble or religious leader could become stronger than the Sultan.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/10.png" alt="Pyramid diagram with the Sultan at the top, ministers in the middle layer, officials at th" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He was the first Sultan of Delhi to <b>ignore the Ulema</b> (Muslim religious scholars) and to put religion under state control. He called himself <b>'Yamin-ul-Khilafat Nasiri Amir-ul-Mumnin'</b>. He weakened the old nobles and raised ordinary men of ability to high posts.</p>
      <table><thead><tr><th>Post</th><th>Work</th></tr></thead><tbody><tr><td>Wazir</td><td>Highest minister, in charge of civil and military matters</td></tr><tr><td>Shahana-i-Mandi</td><td>Market inspector</td></tr><tr><td>Dewan-i-Riyasat</td><td>Minister who controlled the markets</td></tr><tr><td>Qazi-ul-Qazat (Sadr-i-Jahan)</td><td>Chief Justice</td></tr><tr><td>Sultan</td><td>Final court of appeal</td></tr></tbody></table>
      <p class="cp-lead">There were about <b>10 ministers</b>. The Sultan himself was the last court of appeal, and the <b>Qazi-ul-Qazat</b>, also called <b>Sadr-i-Jahan</b>, was the Chief Justice.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/11.png" alt="Alai Darwaza Qutub complex Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Alauddin also made strict social rules. He banned <b>liquor, cannabis, other intoxicants and gambling</b>. Drunkards, gamblers and sellers were sent out of Delhi. He banned <b>prostitution</b> too, and ordered prostitutes to marry.</p>
      <div class="cp-note trap">Alauddin was the first Sultan to ignore the Ulema in matters of state. Do not give this credit to Jalaluddin or to Balban.</div>
      <div class="cp-note exam">Remember his long title Yamin-ul-Khilafat Nasiri Amir-ul-Mumnin and the fact that the Sultan himself was the highest court of appeal.</div>
    `
  },
  15: {
    questext: "Which Sultan of Delhi was the first to keep religion under state control and ignore the Ulema in matters of government?",
    options: ["Jalaluddin Khilji", "Balban", "Alauddin Khilji", "Qutubuddin Mubarak Shah"],
    correct: "3",
    exptext: "✅ Alauddin Khilji ignored the Ulema and ruled through state control. 📌 A strong Sultan, a weak Ulema. ❌ Balban is wrong because he followed a strict rule of fear but did not put religion under state control."
  },
  16: {
    type: "concept", icon: "🪖", accent: "#ec4899", pauseTimer: true,
    title: "Army, Land and Revenue Reforms",
    html: `
      <p class="cp-lead">Alauddin needed a large army to stop the Mongols and win new lands. So he built a permanent army, checked its soldiers and horses, and collected more revenue to pay for it.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/12.png" alt="Three boxes in a row: Dag with a horse and a hot mark, Chehra with a soldier description r" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He was the first Sultan with a <b>permanent standing army</b> that stayed at the capital. The army minister was <b>Ariz-i-Mumalik</b>. The <b>Chehra</b> (also called <b>Huliya</b>) was a descriptive roll of each soldier. The <b>Dag</b> was the branding of horses, so that soldiers could not use weak horses or swap them. Records were kept in the <b>Diwan-i-Arz</b>. This was a first in India.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Dag</td><td>Branding of horses</td></tr><tr><td>Chehra / Huliya</td><td>Descriptive roll of each soldier</td></tr><tr><td>Masahat</td><td>Measurement of land</td></tr><tr><td>Kharaj</td><td>Land tax, 50 percent of the produce</td></tr><tr><td>Jizya</td><td>Tax on non-Muslims</td></tr><tr><td>Zakat</td><td>Tax on Muslims</td></tr><tr><td>Ghari</td><td>Tax on houses (residence)</td></tr><tr><td>Charai</td><td>Tax on grazing animals</td></tr></tbody></table>
      <p class="cp-lead">Land was measured (<b>Masahat</b>) and the department <b>Diwan-i-Mustakhraj</b> collected dues. The <b>Kharaj</b> was <b>50 percent</b> of the produce. <b>Ghari</b> and <b>Charai</b> were taxes outside Islamic law. The Sultan took <b>4/5th</b> (four fifths) of war spoils, not the traditional <b>1/5th</b> (<b>Khums</b>).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/13.png" alt="A circle divided into two parts: half labelled Farmer keeps 50 percent and half labelled S" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Under religious law the share of war spoils for the state is one fifth (Khums). Alauddin took four fifths, so do not pick one fifth as his rate.</div>
      <div class="cp-note exam">Questions ask for the 50 percent Kharaj, the four fifths of war spoils, and Dag and Chehra as first measures in India.</div>
    `
  },
  17: {
    questext: "Branding of horses in the army of Alauddin Khilji was known as",
    options: ["Dag", "Chehra", "Ghari", "Charai"],
    correct: "1",
    exptext: "✅ Branding of horses was called Dag. 📌 Dag leaves a mark on the horse. ❌ Chehra is wrong because it was the descriptive roll of soldiers."
  },
  18: {
    questext: "What share of the produce did Alauddin Khilji take as Kharaj?",
    options: ["10 percent", "25 percent", "33 percent", "50 percent"],
    correct: "4",
    exptext: "✅ The Kharaj was 50 percent of the produce. 📌 Half the crop to the state. ❌ 10 percent is wrong because that was the lower rate of Ghiyasuddin Tughlaq later."
  },
  19: {
    questext: "What part of the war spoils did Alauddin Khilji demand for the state, instead of the traditional one fifth?",
    options: ["One fifth", "One half", "Four fifths", "One tenth"],
    correct: "3",
    exptext: "✅ He demanded four fifths of the war spoils. 📌 The traditional one fifth is called Khums. ❌ One half is wrong because that was the Kharaj rate on land."
  },
  20: {
    type: "concept", icon: "🛒", accent: "#3b82f6", pauseTimer: true,
    title: "Market Reforms of Alauddin (Price Control)",
    html: `
      <p class="cp-lead">Alauddin kept the prices of daily goods low and fixed by law. <u>Cheap prices let him keep a huge army on low salaries.</u> This is the most famous reform of his reign.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/14.png" alt="medieval Indian market scene grain cloth merchants painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Two writers explain the reason. <b>Amir Khusro</b> and <b>Hamid Qalandar</b> say the aim was public welfare. <b>Barani</b> says cheap prices paid for a huge army at low salaries. Both views are asked in exams.</p>
      <table><thead><tr><th>Official</th><th>Work</th></tr></thead><tbody><tr><td>Shahna-i-Mandi</td><td>Market inspector</td></tr><tr><td>Barid</td><td>Intelligence officer</td></tr><tr><td>Munhiyan</td><td>Spies who reported on shopkeepers</td></tr><tr><td>Sadar-i-Riyasat</td><td>Head of the market department, appointed by the Sultan</td></tr></tbody></table>
      <p class="cp-lead">The <b>cloth market</b> was called <b>'Sarai-i-Adl'</b>. All cloth, Indian and foreign, had to be sold <b>only at government rates</b>. Grain merchants worked under the <b>Shahna-i-Mandi</b>. For this reason Alauddin is called the <b>'Father of the Public Distribution System'</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/15.png" alt="Flow picture: Sultan at the top, arrow to Sadar-i-Riyasat, arrow to Shahna-i-Mandi, arrow " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix up the officials. The Shahna-i-Mandi inspected the market, while the Barid and the Munhiyan worked as intelligence officers and spies.</div>
      <div class="cp-note exam">Remember Sarai-i-Adl for cloth and Shahna-i-Mandi for the market inspector, and the title Father of the Public Distribution System for Alauddin.</div>
    `
  },
  21: {
    questext: "Who was the market inspector in the price control system of Alauddin Khilji?",
    options: ["Shahna-i-Mandi", "Barid", "Munhiyan", "Ariz-i-Mumalik"],
    correct: "1",
    exptext: "✅ The Shahna-i-Mandi was the market inspector. 📌 Mandi means market, and the name holds the word. ❌ Ariz-i-Mumalik is wrong because he was the army minister."
  },
  22: {
    questext: "The cloth market of Alauddin Khilji, where all cloth was sold at government rates, was called",
    options: ["Sarai-i-Khas", "Sarai-i-Adl", "Diwan-i-Arz", "Mandi-i-Kohi"],
    correct: "2",
    exptext: "✅ The cloth market was Sarai-i-Adl. 📌 Adl means justice, so it was a \"market of justice\". ❌ Diwan-i-Arz is wrong because it was the army records department."
  },
  23: {
    type: "concept", icon: "📉", accent: "#f97316", pauseTimer: true,
    title: "Decline of the Khiljis",
    html: `
      <p class="cp-lead">The Khilji dynasty fell very quickly after the death of Alauddin. His successors were weak, and the nobles took control of the court.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/16.png" alt="Timeline with five boxes: Dec 1315 Alauddin dies, Malik Kafur rules briefly, Mubarak Shah " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Alauddin died in <b>December 1315</b>, and the court broke into plots. <b>Malik Kafur</b> became the Sultan but the nobles did not back him, and he was killed within months. The nobles then made a <b>6-year-old</b> boy, <b>Shihab-ud-din Omar</b>, the Sultan.</p>
      <table><thead><tr><th>Ruler</th><th>Fact</th></tr></thead><tbody><tr><td>Qutubuddin Mubarak Shah (1316–20)</td><td>Killed his younger brother, took the throne</td></tr><tr><td>Same ruler</td><td>First Sultan to declare himself Caliph</td></tr><tr><td>Same ruler</td><td>Wore women's clothes in court</td></tr><tr><td>Khusro Khan (Nasir-ud-din Khusro Shah)</td><td>Killed Mubarak Shah in 1320, styled 'Commander of the Prophet'</td></tr></tbody></table>
      <p class="cp-lead"><b>Qutubuddin Mubarak Shah</b> was the first Sultan of Delhi to <b>declare himself the Caliph</b>. He was killed in <b>1320</b> by his general <b>Khusro Khan</b>, who then took the name <b>Nasir-ud-din Khusro Shah</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/17.png" alt="Khilji dynasty coin Qutubuddin Mubarak Shah photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The nobles asked <b>Ghazi Malik</b>, the army commander of Punjab, for help. He beheaded Khusro Khan and became the Sultan <b>Ghiyasuddin Tughlaq</b>. This ended the Khilji dynasty.</p>
      <div class="cp-note trap">Khusro Khan was not Khusro of poetry. Amir Khusro was the famous poet, and Khusro Khan was a general who killed the last Khilji Sultan.</div>
      <div class="cp-note exam">Remember that Mubarak Shah was the first Sultan to declare himself Caliph and that Ghazi Malik ended the dynasty.</div>
    `
  },
  24: {
    questext: "Which Sultan of Delhi was the first to declare himself the Caliph?",
    options: ["Alauddin Khilji", "Ghiyasuddin Tughlaq", "Muhammad bin Tughlaq", "Qutubuddin Mubarak Shah"],
    correct: "4",
    exptext: "✅ Qutubuddin Mubarak Shah was the first to declare himself Caliph. 📌 The last Khilji king took the highest title. ❌ Alauddin is wrong because he used a long title but did not claim to be the Caliph."
  },
  25: {
    questext: "Khusro Khan, who killed the last Khilji Sultan in 1320, was in turn killed by",
    options: ["Alp Khan", "Ghazi Malik", "Malik Kafur", "Zafar Khan"],
    correct: "2",
    exptext: "✅ Ghazi Malik killed Khusro Khan and became Ghiyasuddin Tughlaq. 📌 The killer of a killer takes the crown. ❌ Malik Kafur is wrong because he died earlier, in 1316."
  },
  26: {
    type: "concept", icon: "🏯", accent: "#84cc16", pauseTimer: true,
    title: "Tughlaq Dynasty and Ghiyasuddin Tughlaq (1320–1325)",
    html: `
      <p class="cp-lead">The <b>Tughlaq dynasty</b> ruled Delhi from 1320 to 1414. Its founder was <b>Ghiyasuddin Tughlaq</b>, whose first name was <b>Ghazi Malik</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/18.png" alt="Tughlaqabad Fort Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The dynasty is also called the <b>'Karana Turk'</b> dynasty. His father was a Karana Turk, a Turkish slave of Balban. The line of rulers was <b>Ghiyasuddin, then Muhammad bin Tughlaq, then Firuz Shah, then weak successors</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Original name</td><td>Ghazi Malik</td></tr><tr><td>Titles</td><td>Tughlaq Shah; Malik-ul-Ghazi (for beating the Mongols)</td></tr><tr><td>Throne</td><td>3 September 1320</td></tr><tr><td>Earlier post</td><td>Governor of Punjab</td></tr><tr><td>Capital built</td><td>Tughlaqabad</td></tr><tr><td>Death</td><td>1325, at Afghanpura</td></tr></tbody></table>
      <p class="cp-lead">He was the <b>first Sultan titled 'Ghazi'</b>, which means a warrior of the faith. He cut the revenue from one half to <b>1/10</b> and revived the <b>Dag</b> and <b>Chehra</b>. He warned officers not to trouble the farmers.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/19.png" alt="Simple family-line chain of boxes: Ghiyasuddin Tughlaq, then Muhammad bin Tughlaq, then Fi" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>1321</b> his son <b>Jauna Khan</b> failed against <b>Prataparudra</b> of Warangal. In <b>1322–23</b> he succeeded, annexed the area and renamed Warangal <b>Sultanpur</b>. In <b>1324</b> Ghiyasuddin annexed <b>Bengal</b>.</p>
      <p class="cp-lead">In <b>1325</b> a pavilion at <b>Afghanpura</b> fell on the Sultan as he returned from Bengal, and he died. Jauna Khan was suspected. The Sufi saint <b>Nizamuddin Auliya</b>, who was on bad terms with the Sultan, had said <b>'Hunuz Delhi Durasht'</b>, which means Delhi is still far away.</p>
      <div class="cp-note trap">Alauddin had taken half of the produce, but Ghiyasuddin cut it to one tenth. Do not confuse the two rates.</div>
      <div class="cp-note exam">Remember Ghazi (first Sultan titled so), 3 September 1320, Tughlaqabad, Afghanpura 1325 and the line spoken by Nizamuddin Auliya.</div>
    `
  },
  27: {
    questext: "Which Sultan of Delhi was the first to take the title 'Ghazi'?",
    options: ["Ghiyasuddin Tughlaq", "Alauddin Khilji", "Firuz Shah Tughlaq", "Jalaluddin Khilji"],
    correct: "1",
    exptext: "✅ Ghiyasuddin Tughlaq was the first Sultan titled Ghazi, for beating the Mongols. 📌 Ghazi Malik became Ghazi. ❌ Alauddin is wrong because he is known as Sikander-i-Sani."
  },
  28: {
    questext: "Who is said to have spoken the words \"Hunuz Delhi Durasht\" about Ghiyasuddin Tughlaq?",
    options: ["Amir Khusro", "Ziauddin Barani", "Nizamuddin Auliya", "Ibn Battuta"],
    correct: "3",
    exptext: "✅ The Sufi saint Nizamuddin Auliya said it, meaning Delhi is still far away. 📌 He had bad relations with the Sultan. ❌ Ibn Battuta is wrong because he came later, in the time of Muhammad bin Tughlaq."
  },
  29: {
    questext: "Consider the following statements about Ghiyasuddin Tughlaq:\n1. He was the first Sultan of Delhi to be titled Ghazi.\n2. Warangal was annexed and renamed Sultanpur in his reign.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Ghiyasuddin was the first Ghazi, and Warangal became Sultanpur in 1322 to 1323. 📌 Warangal changed its name after Jauna Khan succeeded. ❌ Any option that says only one statement is correct is wrong, because both facts are true."
  },
  30: {
    type: "concept", icon: "👑", accent: "#06b6d4", pauseTimer: true,
    title: "Muhammad bin Tughlaq (1325–1351)",
    html: `
      <p class="cp-lead"><b>Muhammad bin Tughlaq</b> was the son of Ghiyasuddin Tughlaq. His reign is the <u>peak of the Delhi Sultanate in size and also the start of its decline</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/20.png" alt="Muhammad bin Tughlaq coin photo Al Sultan zilli Allah" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His first name was <b>Fakhruddin Muhammad Jauna Khan</b>, and his title was <b>Ulugh Khan</b>. He was the most educated Sultan of his time and was open in matters of religion. He was the <b>first Delhi Sultan to join Hindu festivals</b> such as <b>Holi</b>, and he welcomed the Jain scholars <b>Jinprabhu Suri</b> and <b>Rajasekhara</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Original name</td><td>Fakhruddin Muhammad Jauna Khan</td></tr><tr><td>Title before becoming Sultan</td><td>Ulugh Khan</td></tr><tr><td>Reign</td><td>1325 to 1351</td></tr><tr><td>Famous coin line</td><td>Al Sultan zilli Allah</td></tr><tr><td>Rebellions</td><td>22 (some say 27), the most in the Sultanate</td></tr></tbody></table>
      <p class="cp-lead">His plans were bold, but they failed because he did not give people time to accept them. There were <b>22 rebellions</b> in his reign, the most in the history of the Sultanate. Some writers say <b>27</b>, mostly in South India.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/21.png" alt="Simple balance picture. Left pan: Big plans, bold ideas, education. Right pan: Rebellions " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Ghiyasuddin Tughlaq was the founder, and Muhammad bin Tughlaq was his son. Do not give the founder's name Ghazi Malik to the son.</div>
      <div class="cp-note exam">Remember the original name Fakhruddin Muhammad Jauna Khan, the title Ulugh Khan, the first Sultan to join Holi, and the figure of 22 rebellions.</div>
    `
  },
  31: {
    questext: "What was the original name of Muhammad bin Tughlaq?",
    options: ["Ghazi Malik", "Ulugh Khan Ibrahim", "Malik Kafur", "Fakhruddin Muhammad Jauna Khan"],
    correct: "4",
    exptext: "✅ His original name was Fakhruddin Muhammad Jauna Khan. 📌 Jauna Khan is the name used in the story of the Tughlaqs. ❌ Ghazi Malik is wrong because that was the name of his father, Ghiyasuddin."
  },
  32: {
    questext: "The traveller Ibn Battuta, who visited India in the reign of Muhammad bin Tughlaq, came from which country?",
    options: ["Egypt", "Morocco", "Persia", "China"],
    correct: "2",
    exptext: "✅ Ibn Battuta was a Moroccan traveller. He served as Qazi of Delhi and wrote the Rihla. 📌 M for Morocco and M for Muhammad bin Tughlaq. ❌ Egypt is wrong because that was only a place he passed through."
  },
  33: {
    type: "concept", icon: "🔄", accent: "#a855f7", pauseTimer: true,
    title: "The Five Experiments: Doab Tax and Capital Shift",
    html: `
      <p class="cp-lead">Muhammad bin Tughlaq tried five big experiments. Four of them failed, and the failures hurt the Sultanate. Here we learn the first two.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/22.png" alt="Two panels side by side. Left panel: Doab tax, a farm with a coin and an upward arrow, lab" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Experiment 1: Doab tax.</b> He raised the tax rates in the rich <b>Ganga–Yamuna Doab</b> to pay for a large army. At the same time the rains failed and there was a near-famine. Farmers ran away and there were riots. The tax was <b>withdrawn</b> and relief was given.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Experiment 1</td><td>Doab tax raised, then withdrawn</td></tr><tr><td>Experiment 2</td><td>Capital moved from Delhi to Daulatabad in 1327</td></tr><tr><td>Daulatabad was earlier</td><td>Devagiri, renamed; the older name was Qutbabad (under Mubarak Shah)</td></tr><tr><td>Distance</td><td>About 700 miles from Delhi</td></tr><tr><td>Return</td><td>Capital brought back to Delhi in 1335</td></tr></tbody></table>
      <p class="cp-lead"><b>Experiment 2: capital shift.</b> In <b>1327</b> he moved the capital to <b>Daulatabad</b> (the old <b>Devagiri</b>), about <b>700 miles</b> away. Reasons given are: a central position (<b>Barani</b>), the danger from Mongols (<b>Gardner Brown</b>), poets like <b>Khusro</b> writing about it, more Muslims in the Deccan, and a check on the Mongols. The forced move was a blunder, and the capital went back to Delhi in <b>1335</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/23.png" alt="Daulatabad Fort Chand Minar Maharashtra photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Daulatabad was earlier called Devagiri (and Qutbabad by Qutubuddin Mubarak Shah). Do not call it a new city built from nothing.</div>
      <div class="cp-note exam">Remember 1327 for the shift to Daulatabad and 1335 for the return to Delhi, and the Doab as the land between the Ganga and the Yamuna.</div>
    `
  },
  34: {
    questext: "To which place did Muhammad bin Tughlaq shift his capital in 1327?",
    options: ["Daulatabad", "Kilokhari", "Firozabad", "Tughlaqabad"],
    correct: "1",
    exptext: "✅ He shifted the capital to Daulatabad, the old Devagiri. 📌 Daulat (wealth) was in the Deccan. ❌ Tughlaqabad is wrong because it was built by his father near Delhi."
  },
  35: {
    questext: "Muhammad bin Tughlaq raised the tax in the Doab. Between which two rivers does the Doab lie?",
    options: ["Indus and Jhelum", "Narmada and Tapti", "Krishna and Godavari", "Ganga and Yamuna"],
    correct: "4",
    exptext: "✅ The Doab lies between the Ganga and the Yamuna. 📌 Do means two and ab means water. ❌ Krishna and Godavari is wrong because those rivers lie in South India."
  },
  36: {
    type: "concept", icon: "🪙", accent: "#e11d48", pauseTimer: true,
    title: "The Five Experiments: Token Currency, Khurasan and Qarachil",
    html: `
      <p class="cp-lead">The last three experiments were token currency, a plan to attack Khurasan, and the Qarachil expedition. All three failed.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/24.png" alt="Three boxes in a row: Token currency with a copper coin marked Same value as silver, Khura" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Experiment</th><th>Year</th><th>Result</th></tr></thead><tbody><tr><td>Token currency</td><td>1329–30</td><td>Copper coins at the value of silver; fake coins ('jail') minted at home; withdrawn</td></tr><tr><td>Khurasan plan</td><td>Around 1329</td><td>3,37,000 troops paid a year in advance, army never left Delhi</td></tr><tr><td>Qarachil</td><td>Around 1330</td><td>Army destroyed in the cold; only a few survived</td></tr></tbody></table>
      <p class="cp-lead"><b>Token currency (1329–30):</b> he issued <b>copper</b> coins and gave them the same value as <b>silver</b> coins because silver was short. People minted fake coins at home, called <b>'jail'</b> coins, so the coins were <b>withdrawn</b>.</p>
      <p class="cp-lead"><b>Khurasan plan:</b> he planned to join <b>Tarmasharin</b> of Central Asia and the Sultan of Egypt against <b>Sultan Abu Sayyid</b>. <b>Barani</b> says he paid <b>3,37,000</b> troops a year in advance, but the army never left Delhi, so the plan wasted money. <b>Qarachil:</b> this was a state at the foot of the Himalayas, probably <b>Kumaon</b>. Ferishta says the real aim was <b>China</b>. The army perished in the cold, and only <b>3</b> survived (Ibn Battuta) or <b>10</b> (Barani).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/25.png" alt="Himalayan foothills Kumaon mountain range photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Token coins were made of copper, not paper or leather. Do not mix them with the paper money used in China.</div>
      <div class="cp-note exam">Remember copper at par with silver, the year 1329–30, the word 'jail' for fake coins and the figure of 3,37,000 troops.</div>
    `
  },
  37: {
    questext: "The token currency of Muhammad bin Tughlaq was made of which metal?",
    options: ["Gold", "Bronze", "Copper", "Iron"],
    correct: "3",
    exptext: "✅ The token coins were made of copper and given the value of silver. 📌 Copper in the place of silver. ❌ Bronze is wrong because it was not used for the token coins."
  },
  38: {
    questext: "The Qarachil expedition of Muhammad bin Tughlaq was sent to which region?",
    options: ["The Deccan plateau", "The Himalayan foothills", "The Vindhya range", "The Aravalli hills"],
    correct: "2",
    exptext: "✅ The army was sent to the Himalayan foothills, probably Kumaon, and it perished in the cold. 📌 Qarachil is a cold place. ❌ The Vindhya range is wrong because it is in central India and has no great cold."
  },
  39: {
    type: "concept", icon: "⚖️", accent: "#10b981", pauseTimer: true,
    title: "Other Works and End of Muhammad bin Tughlaq",
    html: `
      <p class="cp-lead">Besides the five experiments, the Sultan did some useful work for farmers and for justice. His end was sad, and writers judged him very differently.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/26.png" alt="Ibn Battuta traveller portrait illustration" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Diwan-i-Kohi</td><td>Department of agriculture</td></tr><tr><td>Sondhar</td><td>Farm loans for farmers</td></tr><tr><td>Diwan-i-Khas</td><td>Special courts on Monday and Thursday</td></tr><tr><td>Died</td><td>20 March 1351 near Thatta</td></tr><tr><td>Ibn Battuta</td><td>Moroccan, arrived around 1333, Qazi of Delhi, went to China in 1342, wrote Rihla</td></tr></tbody></table>
      <p class="cp-lead">He set up the <b>Diwan-i-Kohi</b>, a department for agriculture, and gave farm loans called <b>Sondhar</b>. He held special courts, <b>Diwan-i-Khas</b>, every <b>Monday and Thursday</b> to hear complaints.</p>
      <p class="cp-lead"><b>Elphinstone</b> said the Sultan showed 'some degree of madness'. Others call him the <b>'Unfortunate Idealist'</b>. He died on <b>20 March 1351</b> near <b>Thatta</b> while going to crush a rebellion in <b>Sindh</b>. <b>Badauni</b> wrote that the king was freed from his people and they from their king.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/27.png" alt="Timeline with four boxes: 1325 Becomes Sultan, 1327 Capital shift, 1335 Back to Delhi, 20 " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Ibn Battuta wrote the Rihla, while Ziauddin Barani wrote the Fatawa-i-Jahandari and Tarikh-i-Firuzshahi. Do not give one writer's works to the other.</div>
      <div class="cp-note exam">Remember Thatta and 1351 for the death, and Ibn Battuta as the Moroccan Qazi of Delhi.</div>
    `
  },
  40: {
    questext: "Muhammad bin Tughlaq died in 1351 near Thatta while going to crush a rebellion in which region?",
    options: ["Bengal", "Sindh", "Gujarat", "Deccan"],
    correct: "2",
    exptext: "✅ He died near Thatta while going to crush the rebellion in Sindh. 📌 Thatta lies in Sindh. ❌ Bengal is wrong because that was an earlier problem of his father's time."
  },
  41: {
    questext: "Which department of Muhammad bin Tughlaq looked after agriculture?",
    options: ["Diwan-i-Arz", "Diwan-i-Khairat", "Diwan-i-Kohi", "Diwan-i-Riyasat"],
    correct: "3",
    exptext: "✅ The Diwan-i-Kohi was the agriculture department. 📌 Kohi sounds like Kheti. ❌ Diwan-i-Riyasat is wrong because it controlled the markets in the time of Alauddin."
  },
  42: {
    type: "concept", icon: "🕌", accent: "#eab308", pauseTimer: true,
    title: "Firuz Shah Tughlaq (1351–1388)",
    html: `
      <p class="cp-lead"><b>Firuz Shah Tughlaq</b> was a cousin of Muhammad bin Tughlaq. He ruled from 1351 to 1388 and cared more for peace and welfare than for conquest. <u>Elphinstone called his time the 'Akbar of the Sultanate era'.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/28.png" alt="Firoz Shah Kotla Delhi Ashokan pillar photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He was the <b>first Muslim ruler to impose Jizya on Brahmins</b>. He levied <b>Haq-e-Sharb</b>, a tax on irrigation water, and he abolished about <b>24 taxes</b> that were not in religious law. He kept only the four taxes of religious law: <b>Kharaj, Khams, Jizya and Zakat</b>. He also gave <b>Taqavi</b> loans to farmers.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Rule</td><td>1351 to 1388</td></tr><tr><td>Called</td><td>'Akbar of the Sultanate era' (Elphinstone)</td></tr><tr><td>Autobiography</td><td>Futuhat-i-Firozshahi</td></tr><tr><td>Taxes kept</td><td>Kharaj, Khams, Jizya, Zakat</td></tr><tr><td>Water tax</td><td>Haq-e-Sharb</td></tr><tr><td>Loans</td><td>Taqavi</td></tr></tbody></table>
      <p class="cp-lead">He repaired the <b>Qutub Minar</b> and brought two <b>Ashokan pillars</b> to Delhi, from <b>Topra</b> and from <b>Meerut</b>. His autobiography is <b>Futuhat-i-Firozshahi</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/29.png" alt="Mind map with Firuz Shah in the centre and four branches: Jizya on Brahmins, Haq-e-Sharb w" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Firuz was the first to impose Jizya on Brahmins, but Jizya itself was an older tax on non-Muslims. Do not say that Firuz started Jizya.</div>
      <div class="cp-note exam">Remember Haq-e-Sharb, the abolition of 24 taxes, the book Futuhat-i-Firozshahi and the two Ashokan pillars from Topra and Meerut.</div>
    `
  },
  43: {
    questext: "Which Sultan of Delhi was called the 'Akbar of the Sultanate era' by Elphinstone?",
    options: ["Firuz Shah Tughlaq", "Alauddin Khilji", "Ghiyasuddin Tughlaq", "Muhammad bin Tughlaq"],
    correct: "1",
    exptext: "✅ Elphinstone gave the name to Firuz Shah Tughlaq for his welfare work. 📌 Akbar was kind, and so was Firuz. ❌ Muhammad bin Tughlaq is wrong because the same writer said he showed 'some degree of madness'."
  },
  44: {
    questext: "Haq-e-Sharb, a tax on irrigation water, was introduced by",
    options: ["Alauddin Khilji", "Ghiyasuddin Tughlaq", "Muhammad bin Tughlaq", "Firuz Shah Tughlaq"],
    correct: "4",
    exptext: "✅ Firuz Shah introduced Haq-e-Sharb as he built many canals. 📌 Canals and water tax go together. ❌ Alauddin is wrong because his main tax on land was the Kharaj."
  },
  45: {
    type: "concept", icon: "🌊", accent: "#0ea5e9", pauseTimer: true,
    title: "Firuz Shah: Canals, Campaigns and Welfare Departments",
    html: `
      <p class="cp-lead">Firuz Shah built canals and new cities, and set up departments to help the poor. These works are among the most asked facts of the Tughlaq period.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/30.png" alt="Firozabad Hissar Haryana Firoz Shah Palace photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He built about <b>11 canals</b> in Delhi and Haryana. Four were major: <b>Yamuna to Hissar</b> (150 miles, the longest), <b>Sutlej to Ghaghra</b> (about 100 miles), the <b>Mandvi and Sirmur hills to Hansi</b>, and <b>Ghaghra to Firozabad</b>. Famous canals were <b>Ulugkhani</b> and <b>Rajwahi</b>.</p>
      <table><thead><tr><th>Welfare department</th><th>Function</th></tr></thead><tbody><tr><td>Diwan-e-Khairat</td><td>Marriage bureau: grants for poor girls' marriages and help for the destitute</td></tr><tr><td>Dar-ul-Shifa</td><td>Hospitals in important towns</td></tr><tr><td>Sarais</td><td>About 200 rest houses for merchants and travellers</td></tr><tr><td>Diwan-e-Bandagan</td><td>Slaves; largest slave count in the Sultanate</td></tr><tr><td>Translation Department</td><td>Established by Firuz Shah</td></tr><tr><td>Public Works Department</td><td>Founding new cities</td></tr><tr><td>Daftar-e-Rozgar</td><td>Employment department</td></tr></tbody></table>
      <p class="cp-lead">He founded four cities: <b>Firozabad, Fatehabad, Jaunpur and Hissar Firoza</b>. His wars were small. He fought Bengal in <b>1353–54 and 1359–60</b> against <b>Haji Ilyas</b> and his son <b>Sikandar</b> with no clear result. He attacked <b>Jajnagar (1360)</b> and destroyed temples including <b>Jagannath</b>. He went to <b>Kangra in 1365</b> with success and to <b>Thatta in 1362–64</b>, which was his last war and was not a success.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/31.png" alt="Simple list picture with a small icon for each welfare department: Marriage bureau, Hospit" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Diwan-e-Khairat gave marriage grants, while Diwan-e-Bandagan dealt with slaves. Do not swap the functions.</div>
      <div class="cp-note exam">Remember Yamuna to Hissar as the longest canal at 150 miles, Diwan-e-Khairat for marriages and Firuz's four cities.</div>
    `
  },
  46: {
    questext: "Which canal of Firuz Shah Tughlaq was the longest, at about 150 miles?",
    options: ["Sutlej to Ghaghra", "Mandvi to Hansi", "Ghaghra to Firozabad", "Yamuna to Hissar"],
    correct: "4",
    exptext: "✅ The canal from the Yamuna to Hissar, about 150 miles, was the longest. 📌 Yamuna to Hissar is the number one canal. ❌ Sutlej to Ghaghra is wrong because it was only about 100 miles."
  },
  47: {
    questext: "Which department of Firuz Shah Tughlaq gave grants for the marriage of poor girls?",
    options: ["Diwan-e-Khairat", "Diwan-e-Bandagan", "Dar-ul-Shifa", "Daftar-e-Rozgar"],
    correct: "1",
    exptext: "✅ The Diwan-e-Khairat helped poor girls to marry. 📌 Khairat means charity. ❌ Diwan-e-Bandagan is wrong because it looked after slaves."
  },
  48: {
    type: "concept", icon: "⚡", accent: "#d946ef", pauseTimer: true,
    title: "Successors and End of the Tughlaqs (1388–1414)",
    html: `
      <p class="cp-lead">After Firuz Shah died in 1388, the Tughlaq dynasty became very weak. Then in 1398 a foreign invader, <b>Timur</b>, attacked Delhi and ended its power.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/32.png" alt="Timur Amir Timur Tamerlane portrait photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">After 1388 the Sultans were <b>Tughlaq Shah II</b>, then <b>Abu Bakr</b>, then <b>Muhammad Shah</b>, then <b>Nasiruddin Mahmud Shah</b> (1394–1413). Their courts were full of fights.</p>
      <table><thead><tr><th>Event</th><th>Detail</th></tr></thead><tbody><tr><td>Timur's invasion</td><td>1398, under Amir Timur ('Taimurlane')</td></tr><tr><td>Sultan of Delhi then</td><td>Nasiruddin Mahmud Shah, who fled and returned after Timur left</td></tr><tr><td>Timur's death</td><td>1405</td></tr><tr><td>Last Tughlaq king</td><td>Until about 1414</td></tr><tr><td>Timur's deputy</td><td>Khizr Khan, governor of Multan, took Delhi in 1414 and founded the Sayyid dynasty</td></tr></tbody></table>
      <p class="cp-lead"><b>Timur</b> plundered Delhi in <b>1398</b> while Mahmud Shah ruled. Mahmud Shah fled and returned only after Timur left. Timur died in <b>1405</b>. The dynasty ended, and its last king ruled until about <b>1414</b>. Timur's deputy <b>Khizr Khan</b>, the governor of Multan, took Delhi in <b>1414</b> and founded the <b>Sayyid dynasty</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/33.png" alt="Simple chain of boxes: Firuz Shah dies 1388, Weak Sultans, Timur invades 1398, Timur dies " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Timur invaded in 1398, but he died in 1405. Do not use the year of the invasion for his death.</div>
      <div class="cp-note exam">Remember 1398 for Timur's invasion of Delhi, 1405 for his death and Khizr Khan as the founder of the Sayyid dynasty in 1414.</div>
    `
  },
  49: {
    questext: "Timur invaded Delhi during the rule of which Tughlaq Sultan?",
    options: ["Abu Bakr", "Nasiruddin Mahmud Shah", "Firuz Shah", "Muhammad bin Tughlaq"],
    correct: "2",
    exptext: "✅ Timur attacked Delhi in 1398 when Nasiruddin Mahmud Shah was Sultan. 📌 Mahmud Shah was the Sultan who fled. ❌ Firuz Shah is wrong because he had died in 1388."
  },
  50: {
    type: "concept", icon: "🧱", accent: "#64748b", pauseTimer: true,
    title: "Capitals and Buildings of the Khilji and Tughlaq Age",
    html: `
      <p class="cp-lead">Each Sultan built his own city or monument. Remembering which Sultan built which place is an easy way to score marks.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/34.png" alt="Hauz Khas complex Delhi tank and madrasa photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Capital, city or building</th></tr></thead><tbody><tr><td>Alauddin Khilji</td><td>Siri (second city of Delhi), Alai Darwaza (1311, earliest true dome in India), Hauz-i-Alai (Hauz Khas), unfinished Alai Minar</td></tr><tr><td>Ghiyasuddin Tughlaq</td><td>Tughlaqabad and his own tomb</td></tr><tr><td>Muhammad bin Tughlaq</td><td>Adilabad and Jahanpanah (fourth city of Delhi)</td></tr><tr><td>Firuz Shah</td><td>Firozabad (Firoz Shah Kotla) where the Topra pillar was set up, and the Hauz Khas madrasa</td></tr></tbody></table>
      <p class="cp-lead"><b>Alai Darwaza</b>, built in <b>1311</b> as a gateway to the Quwwat-ul-Islam mosque, is the <b>earliest true dome in India</b>. <b>Hauz-i-Alai</b> is the old name of <b>Hauz Khas</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/35.png" alt="Row of four boxes for city numbers: Kilokhari (Jalaluddin), Siri (Alauddin), Tughlaqabad (" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not confuse the cities: Kilokhari with Jalaluddin, Siri with Alauddin, Tughlaqabad with Ghiyasuddin, Jahanpanah with Muhammad bin Tughlaq and Firozabad with Firuz Shah.</div>
      <div class="cp-note exam">Alai Darwaza is the earliest true dome in India, Siri was Alauddin's capital and Hauz Khas has Alauddin's tank and Firuz's madrasa.</div>
    `
  },
  51: {
    questext: "Which monument built by Alauddin Khilji in 1311 is called the earliest true dome in India?",
    options: ["Qutub Minar", "Hauz Khas", "Tughlaqabad Fort", "Alai Darwaza"],
    correct: "4",
    exptext: "✅ Alai Darwaza, built in 1311, has the earliest true dome in India. 📌 Alai is linked to Alauddin. ❌ Qutub Minar is wrong because it is a tower and not a dome."
  },
  52: {
    questext: "Which Sultan built the city of Jahanpanah, the fourth city of Delhi?",
    options: ["Firuz Shah", "Alauddin Khilji", "Muhammad bin Tughlaq", "Ghiyasuddin Tughlaq"],
    correct: "3",
    exptext: "✅ Muhammad bin Tughlaq built Jahanpanah. 📌 Jahan means world and panah means shelter, a city that shelters the world. ❌ Firuz Shah is wrong because he built Firozabad."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gold-lined fortress gateway with battered stone walls, an old copper token coin and a crossed Sultanate sword and scroll" },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jalaluddin Khilji Delhi Sultan coin portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/1.png. an old coin or picture linked to Jalaluddin Khilji, to put a face to the name",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/2.png": { t: "fig", about: "Two boxes side by side. Left box: Balban, blood and iron, rule by fear. Right box: Jalaluddin, will of the people, rule by goodwill. A line between them labelled Change of policy." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/3.png": { t: "fig", about: "Simple timeline with four boxes in order: 1290 Jalaluddin crowned, 1292 Mongol attack, 1293 Bhilsa raid, July 1296 Jalaluddin killed at Kara-Manikpur." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Alauddin Khilji historical painting Delhi Sultan\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/4.png. a painting or sketch of Alauddin Khilji",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/5.png": { t: "fig", about: "Simple route picture, schematic and not a map: a box Kara on the left, an arrow labelled gold and silver coins scattered, a box Delhi on the right, and a small box Multan above with a dotted arrow labelled Ibrahim flees." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ranthambore Fort Rajasthan walls photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/6.png. the walls of Ranthambore Fort",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/7.png": { t: "fig", about: "Horizontal timeline of five boxes: 1298 Gujarat, 1301 Ranthambore, 1303 Chittor, 1305 Malwa, 1308 Marwar, each with its ruler name below." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Devagiri Daulatabad Fort Maharashtra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/8.png. the large hill fort at Devagiri (Daulatabad)",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/9.png": { t: "fig", about: "Schematic, not a map: four boxes in a line from north to south with years: 1307 Devagiri, 1309 Warangal, 1310 Dwarasamudra, 1311 Madurai, and one arrow from Delhi at the top pointing down through all four." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/10.png": { t: "fig", about: "Pyramid diagram with the Sultan at the top, ministers in the middle layer, officials at the base, and a small side box labelled Ulema, kept outside state decisions." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Alai Darwaza Qutub complex Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/11.png. Alai Darwaza, built by Alauddin Khilji",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/12.png": { t: "fig", about: "Three boxes in a row: Dag with a horse and a hot mark, Chehra with a soldier description roll, Diwan-i-Arz with a record register. Each box has its label." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/13.png": { t: "fig", about: "A circle divided into two parts: half labelled Farmer keeps 50 percent and half labelled Sultan takes 50 percent as Kharaj. Beside it, a small bar showing 4/5 Sultan and 1/5 soldiers for war spoils." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"medieval Indian market scene grain cloth merchants painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/14.png. a painting of a medieval Indian market with grain and cloth sellers",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/15.png": { t: "fig", about: "Flow picture: Sultan at the top, arrow to Sadar-i-Riyasat, arrow to Shahna-i-Mandi, arrow to Shopkeepers, with a side arrow from Munhiyan and Barid back up to the Sultan labelled reports." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/16.png": { t: "fig", about: "Timeline with five boxes: Dec 1315 Alauddin dies, Malik Kafur rules briefly, Mubarak Shah 1316-1320, Khusro Khan 1320, Ghazi Malik crowned 1320." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Khilji dynasty coin Qutubuddin Mubarak Shah photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/17.png. a Khilji era coin or picture",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tughlaqabad Fort Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/18.png. the battered rubble walls and bastions of Tughlaqabad",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/19.png": { t: "fig", about: "Simple family-line chain of boxes: Ghiyasuddin Tughlaq, then Muhammad bin Tughlaq, then Firuz Shah Tughlaq, then Weak successors, with one arrow joining each pair." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Muhammad bin Tughlaq coin photo Al Sultan zilli Allah\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/20.png. a gold or copper coin of Muhammad bin Tughlaq",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/21.png": { t: "fig", about: "Simple balance picture. Left pan: Big plans, bold ideas, education. Right pan: Rebellions 22, poor results. The balance tilts towards the right pan." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/22.png": { t: "fig", about: "Two panels side by side. Left panel: Doab tax, a farm with a coin and an upward arrow, label Tax raised. Right panel: capital shift, Delhi to Daulatabad with an arrow, label 700 miles." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Daulatabad Fort Chand Minar Maharashtra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/23.png. the fort and tower at Daulatabad",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/24.png": { t: "fig", about: "Three boxes in a row: Token currency with a copper coin marked Same value as silver, Khurasan with a large army and a label 3,37,000 troops, Qarachil with a mountain and the label Army lost in the cold." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Himalayan foothills Kumaon mountain range photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/25.png. the Himalayan foothills in Kumaon",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ibn Battuta traveller portrait illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/26.png. a picture of Ibn Battuta, the Moroccan traveller",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/27.png": { t: "fig", about: "Timeline with four boxes: 1325 Becomes Sultan, 1327 Capital shift, 1335 Back to Delhi, 20 March 1351 Dies near Thatta." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Firoz Shah Kotla Delhi Ashokan pillar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/28.png. the Ashokan pillar on top of Firoz Shah Kotla, Delhi",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/29.png": { t: "fig", about: "Mind map with Firuz Shah in the centre and four branches: Jizya on Brahmins, Haq-e-Sharb water tax, 24 taxes abolished, Taqavi loans." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Firozabad Hissar Haryana Firoz Shah Palace photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/30.png. the ruins of Firuz Shah's palace at Hissar",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/31.png": { t: "fig", about: "Simple list picture with a small icon for each welfare department: Marriage bureau, Hospital, Rest house, Employment office, Translation desk, each in its own rounded box." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Timur Amir Timur Tamerlane portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/32.png. a portrait or statue of Timur",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/33.png": { t: "fig", about: "Simple chain of boxes: Firuz Shah dies 1388, Weak Sultans, Timur invades 1398, Timur dies 1405, Khizr Khan takes Delhi 1414 and starts Sayyid dynasty." },
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hauz Khas complex Delhi tank and madrasa photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/34.png. the Hauz Khas tank and ruined madrasa in Delhi",
  "images/General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties/35.png": { t: "fig", about: "Row of four boxes for city numbers: Kilokhari (Jalaluddin), Siri (Alauddin), Tughlaqabad (Ghiyasuddin), Jahanpanah (Muhammad bin Tughlaq), then Firozabad (Firuz Shah) in a fifth box." }
});

/* CHANGE LOG
   - Alauddin's list of ministers: the post of Amir-Kohi (agriculture minister) is a Muhammad bin Tughlaq era post (Diwan-i-Kohi), so it is not listed among Alauddin's ministers.
   - Spellings and short forms (percent, Muhammad bin Tughlaq, and so on) were written in full.
*/
