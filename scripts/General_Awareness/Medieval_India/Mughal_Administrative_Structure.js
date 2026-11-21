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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Mughal_Administrative_Structure · 9 concept pages (+ overview) · 37 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Mughal Administrative Structure",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/thumbnail.png",
      banner: "SSC CGL 2026",
      line1: "MUGHAL",
      line2: "ADMINISTRATION",
      line3: "MANSAB • REVENUE",
      badge: "FULL CLASS",
      ribbon: "SUBAS • MANSAB • TODAR MAL",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Mughal Administration Full Chapter | Mansabdari & Revenue | SSC CGL",
      altTitles: ["Mansabdari, Dahsala and Subas in One Class", "Mughal Central and Provincial Administration with Tricks"],
      description: "Mughal administration is a high-scoring chapter of Medieval India. In this full class we learn the central government, the provinces, the ladder of local rule, the mansabdari system, the land revenue systems of Todar Mal and the Mughal buildings, all in simple steps.\n\n📌 IN THIS CLASS\n✅ Central offices: Vakil, Diwan, Mir Bakhshi, Mir Saman, Sadr\n✅ Mansabdari: Zat, Sawar, Du-aspa Sih-aspa, Mashrut\n✅ Revenue: Dahsala, Zabti, Batai, Kankut, Nasaq\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Central Government\n00:00 Provincial Administration\n00:00 Subah to Village\n00:00 Mansabdari System\n00:00 Todar Mal Revenue\n00:00 Revenue Systems\n00:00 Architecture Babur to Jahangir\n00:00 Architecture Shah Jahan and Aurangzeb\n00:00 What Inspired the Taj Mahal\n\n👍 Like, share, subscribe.\n\n#MughalAdministration #SSCCGL #MedievalIndia",
      tags: ["mughal administration", "mansabdari system", "mughal central government", "todar mal dahsala", "mughal revenue system", "zat and sawar", "medieval india", "ssc cgl history", "mughal architecture", "taj mahal inspiration", "du aspa sih aspa", "mashrut mansab", "subah sarkar pargana", "akbar administration", "vakil e mutlak", "mir bakhshi", "diwan i khalisa", "static gk", "history one shot", "competitive exams history", "history tricks", "railways history", "banking history gk", "SSC CGL", "UPSC", "Banking", "Railways", "Mughal Administrative Structu"],
      hashtags: ["MughalAdministration", "SSCCGL", "MedievalIndia"],
      thumbText: "MUGHAL ADMINISTRATION",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📚 New class is live: Mughal Administrative Structure, the full chapter. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Central Government\n00:00 Provincial Administration\n00:00 Subah to Village\n00:00 Mansabdari System\n00:00 Todar Mal Revenue\n00:00 Revenue Systems\n00:00 Architecture Babur to Jahangir\n00:00 Architecture Shah Jahan and Aurangzeb\n00:00 What Inspired the Taj Mahal",
      playlist: "Medieval India — Full Chapter Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how the Mughal empire was governed</u>: the central government, the provinces, the mansabdari system, the land revenue system and the great buildings. Questions from this chapter come every year, so we will learn every office, term and date slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>9</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>37</b><span>Questions</span></div>
        <div class="cp-stat"><b>~55 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Central Government</b><br>The emperor and the great officers who helped him run the empire, and what each of them looked after.</li>
        <li><b>Provincial Administration</b><br>How the empire was divided into subas, and who governed each suba.</li>
        <li><b>Subah, Sarkar, Pargana and Village</b><br>The ladder of local rule, from the province down to the village.</li>
        <li><b>Mansabdari System</b><br>The rank system that fixed the salary, status and army of every officer, and the words Zat and Sawar.</li>
        <li><b>Revenue Administration (Todar Mal)</b><br>The four classes of land and the famous Dahsala system of Raja Todar Mal.</li>
        <li><b>Systems of Revenue Collection</b><br>The six ways in which land revenue was collected, and the chain of revenue officers.</li>
        <li><b>Mughal Architecture: Babur to Jahangir</b><br>The tombs, forts and mosques of the first four emperors.</li>
        <li><b>Mughal Architecture: Shah Jahan and Aurangzeb</b><br>The Taj Mahal, the Red Fort and the Jama Masjid at the peak, and the decline under Aurangzeb.</li>
        <li><b>What Inspired the Taj Mahal</b><br>The older buildings from which each feature of the Taj Mahal was borrowed.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on offices, the mansab system, land revenue terms and monuments come almost every year in static General Knowledge, and the options are built from look-alike terms that we will learn to separate.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#0ea5e9", pauseTimer: true,
    title: "Central Government",
    html: `
      <p class="cp-lead">The Mughal government had the emperor at the top and several great offices below him. <u>The emperor appointed, promoted, suspended and dismissed every mansabdar</u>, that is, every ranked officer of the empire.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/1.png" alt="Pyramid diagram: Emperor at the top; below him six boxes in a row named Vakil-e-Mutlak, Di" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Office</th><th>Charge</th></tr></thead><tbody><tr><td>Vakil-e-Mutlak</td><td>At first above the Wazir; appointed and dismissed ministers of all central departments</td></tr><tr><td>Diwan or Wazir</td><td>Revenue and finance; looked after Diwan-i-Tan (salaries) and Diwan-i-Khalisa (crown lands)</td></tr><tr><td>Mir Bakhshi</td><td>The military department</td></tr><tr><td>Mir Saman (Khan-i-Saman)</td><td>Karkhanas (royal workshops), stores, ordnance and communications; often senior to the Sadr</td></tr><tr><td>Sadr-us-Sadur</td><td>Religious department, also called Sadr-i-Kul or Sadr-i-Jahan; land endowments and charity</td></tr><tr><td>Chief Qazi (Qazi-ul-Quzat)</td><td>Justice at the capital and religious disputes under Islamic law</td></tr></tbody></table>
      <p class="cp-lead">At the start, the <b>Vakil-e-Mutlak</b> was a very powerful officer, like the Naib of the Delhi Sultanate. Bairam Khan held this post. After him, Akbar cut down its power, and the Diwan ranked next to the emperor. The new post that curbed the Vakil was the Diwan-e-Wazarat-e-Kul, created in the eighth regnal year of Akbar.</p>
      <p class="cp-lead">The <b>Mir Bakhshi</b> was like the Ariz-i-Mamlik of the Delhi Sultanate. Foreign travellers called him the Lieutenant-General or the Captain-General.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/2.png" alt="Diwan-i-Aam Red Fort Delhi hall of public audience photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Muhtasib</b>, who regulated morals, prices and weights, worked under the Chief Sadr. The Mufti advised the Qazi on Quranic law, and the emperor himself was the highest judge.</p>
      <div class="cp-note trap">Diwan-i-Tan means salaries, Diwan-i-Khalisa means crown lands, and Diwan-i-Buyutat is the provincial Khan-i-Saman. Do not mix them.</div>
      <div class="cp-note exam">Remember the pairs: Vakil-e-Mutlak with the Naib, Mir Bakhshi with the Ariz-i-Mamlik, and the Diwan-e-Wazarat-e-Kul with the cutting down of the Vakil.</div>
    `
  },
  3: {
    questext: "Which office of the Mughal government resembled the Naib of the Delhi Sultanate?",
    options: ["Mir Bakhshi", "Vakil-e-Mutlak", "Mir Saman", "Sadr-us-Sadur"],
    correct: "2",
    exptext: "✅ The Vakil-e-Mutlak was like the Naib, the deputy of the ruler. 📌 Vakil is the one who acts for the ruler. ❌ Mir Bakhshi is wrong because that office looked after the army."
  },
  4: {
    questext: "The Mir Bakhshi of the Mughals was similar to which officer of the Delhi Sultanate?",
    options: ["Ariz-i-Mamlik", "Naib", "Wazir", "Qazi"],
    correct: "1",
    exptext: "✅ The Mir Bakhshi was the head of the military department, like the Ariz-i-Mamlik. 📌 Both mean the army chief. ❌ Naib is wrong because that was the deputy of the ruler, which matches the Vakil."
  },
  5: {
    questext: "The crown lands, whose income went directly to the emperor, were called what?",
    options: ["Diwan-i-Tan", "Diwan-i-Buyutat", "Diwan-i-Khalisa", "Diwan-i-Ashraf"],
    correct: "3",
    exptext: "✅ Diwan-i-Khalisa means the crown lands. 📌 Khalisa means pure, that is, belonging to the crown. ❌ Diwan-i-Tan is wrong because it means the payment of salaries."
  },
  6: {
    questext: "Consider the following statements about the central government:\n1. The Mir Saman looked after the workshops, stores and ordnance.\n2. The Sadr-us-Sadur was in charge of the military department.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Saman means goods and stores. ❌ Statement 2 is wrong because the Sadr-us-Sadur ran the religious department, and the Mir Bakhshi ran the military department."
  },
  7: {
    type: "concept", icon: "🗂️", accent: "#14b8a6", pauseTimer: true,
    title: "Provincial Administration",
    html: `
      <p class="cp-lead">Akbar divided the empire into provinces called <b>subas</b>. Each suba had many officers, so that no single man held all the power.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/3.png" alt="Simple growth chart of provinces in three boxes: Akbar 12 subas; Akbar later 15 subas with" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Office</th><th>Work</th></tr></thead><tbody><tr><td>Subedar (Sipah Salar)</td><td>Governor of the suba</td></tr><tr><td>Provincial Diwan</td><td>Second in rank; not under the Subedar; reported to the Imperial Diwan</td></tr><tr><td>Faujdar</td><td>Head of the Sarkar (district); the emperor's appointee, working under the governor</td></tr><tr><td>Diwan-i-Buyutat</td><td>The Khan-i-Saman of the province, looking after roads, government buildings, imperial stores and workshops</td></tr><tr><td>Sadr and Qazi</td><td>Religious, educational and judicial work in the province</td></tr><tr><td>Kotwal</td><td>Not a provincial officer; a central appointee in provincial capitals and big cities, like a Police Commissioner</td></tr></tbody></table>
      <p class="cp-lead">The Provincial Diwan was kept outside the control of the Subedar on purpose. In this way the governor and the finance officer could watch each other.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/4.png" alt="Mughal empire provinces map Akbar subas" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Akbar began with 12 subas and added Berar, Khandesh and Ahmednagar to make 15. Under Aurangzeb the number rose to 20.</p>
      <div class="cp-note trap">The Provincial Diwan answers to the Imperial Diwan, not to the Subedar. The Kotwal is a central appointee, and the Thanedar serves under the Faujdar.</div>
      <div class="cp-note exam">Remember the numbers 12, 15 and 20 for the subas of Akbar at first, Akbar later and Aurangzeb.</div>
    `
  },
  8: {
    questext: "How many subas did the Mughal empire have under Aurangzeb?",
    options: ["12", "15", "20", "18"],
    correct: "3",
    exptext: "✅ The number rose to 20 under Aurangzeb. 📌 Akbar had 12 at first, then 15, and Aurangzeb 20. ❌ 15 is wrong because that was the number under Akbar at the end."
  },
  9: {
    questext: "Which three subas did Akbar add to raise the number from 12 to 15?",
    options: ["Bengal, Orissa and Bihar", "Kabul, Kashmir and Sind", "Berar, Khandesh and Ahmednagar", "Gujarat, Malwa and Ajmer"],
    correct: "3",
    exptext: "✅ Berar, Khandesh and Ahmednagar were the three added subas. 📌 All three lie in the Deccan. ❌ Gujarat, Malwa and Ajmer are wrong because they were among the first 12."
  },
  10: {
    questext: "To whom did the Provincial Diwan report?",
    options: ["The Subedar", "The Faujdar", "The Imperial Diwan", "The Kotwal"],
    correct: "3",
    exptext: "✅ The Provincial Diwan reported to the Imperial Diwan. 📌 He was second in rank, but not under the governor. ❌ The Subedar is wrong because the Diwan was kept free of his control."
  },
  11: {
    questext: "Which officer worked like a Police Commissioner in provincial capitals and big cities?",
    options: ["Kotwal", "Faujdar", "Thanedar", "Amil"],
    correct: "1",
    exptext: "✅ The Kotwal was a central appointee in capitals and big cities. 📌 Kotwal means the keeper of the town. ❌ Faujdar is wrong because he was the head of a Sarkar, the district."
  },
  12: {
    type: "concept", icon: "🪜", accent: "#8b5cf6", pauseTimer: true,
    title: "Subah, Sarkar, Pargana and Village",
    html: `
      <p class="cp-lead">Below the province, the empire was divided into smaller parts. The ladder goes from the subah to the sarkar, then to the pargana, and last to the village.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/5.png" alt="Four-step ladder from top to bottom with labels: Subah, Sarkar, Pargana, Village; each ste" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Level</th><th>Officers</th></tr></thead><tbody><tr><td>Subah</td><td>Subedar, Provincial Diwan, Bakhshi, Sadr and Qazi, Diwan-i-Buyutat, Kotwal and Mir Bahr</td></tr><tr><td>Sarkar</td><td>Faujdar, the administrative head, and Amalgujar, who supervised several Amils</td></tr><tr><td>Pargana</td><td>Amil (revenue collector), Bitikchi (assessment), Potahdar (treasury), Qanungo (records) and Thanedar (Thana)</td></tr><tr><td>Village</td><td>Patwari and Muqaddam, who were not state officials but were recognised by the state and paid a share of the revenue</td></tr></tbody></table>
      <p class="cp-lead">The Provincial Bakhshi worked as the paymaster of the province and looked after recruitment, training and pay. The Mir Bahr was the commissioner of ports and customs.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/6.png" alt="Indian village land record patwari register photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Patwari and the Muqaddam were village men, not state officials. The Thanedar served under the Faujdar.</div>
      <div class="cp-note exam">Remember the Pargana team: Amil collects, Bitikchi assesses, Potahdar keeps the treasury, and Qanungo keeps the records.</div>
    `
  },
  13: {
    questext: "Who was the administrative head of a Sarkar?",
    options: ["Amil", "Faujdar", "Qanungo", "Potahdar"],
    correct: "2",
    exptext: "✅ The Faujdar headed the Sarkar. 📌 Sarkar means district, and the Faujdar was its chief. ❌ Amil is wrong because he collected revenue at the lower level of the Pargana."
  },
  14: {
    questext: "Which officer of the Pargana kept the land records?",
    options: ["Potahdar", "Bitikchi", "Qanungo", "Amil"],
    correct: "3",
    exptext: "✅ The Qanungo kept the records of the Pargana. 📌 Think of the Qanungo as the keeper of the law and the record. ❌ Potahdar is wrong because he was the treasurer."
  },
  15: {
    questext: "Consider the following statements about local administration:\n1. The Patwari and the Muqaddam were salaried state officials.\n2. The Thanedar served under the Faujdar.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Thana belongs to the Faujdar. ❌ Statement 1 is wrong because the village men were recognised by the state but were not its officials, and were paid a share of the revenue."
  },
  16: {
    type: "concept", icon: "🎖️", accent: "#f59e0b", pauseTimer: true,
    title: "Mansabdari System",
    html: `
      <p class="cp-lead"><b>Mansab</b> is an Arabic word that means rank. Every civil and military officer held a mansab, and it fixed his salary, his status and the number of soldiers, horses and elephants he had to keep.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/7.png" alt="Mughal mansabdar on horseback with soldiers painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The idea can be traced to Genghis Khan. In North India it was first used by Babur, and it was made a full system by <u>Akbar</u>, who added <b>Zat</b> and <b>Sawar</b>. The historian Satish Chandra said that nothing like it existed outside India.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Zat</td><td>The personal rank, pay and status of the mansabdar</td></tr><tr><td>Sawar</td><td>The number of horsemen he had to maintain</td></tr><tr><td>Du-aspa Sih-aspa</td><td>Jahangir's rule, in which a part of the Sawar rank was doubled or trebled</td></tr><tr><td>Mashrut</td><td>Aurangzeb's conditional rank</td></tr><tr><td>Ahadi</td><td>A gentleman-trooper recruited by the emperor himself</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/8.png" alt="Diagram of one mansabdar split into two boxes: Zat (personal rank and pay) and Sawar (numb" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A mansabdar below 500 was simply called a mansabdar. One from 500 to 2500 was an amir, and one above 2500 was an amir-i-umda. The Ain-i-Akbari of Abul Fazl lists 66 grades, but not more than 33 were in use. The highest mansab was 7000 Zat, held by Raja Man Singh, and Bhagwan Das held 5000 Zat.</p>
      <p class="cp-lead">Akbar revived two rules of Alauddin Khalji. <b>Dagh</b> was the branding of horses, and <b>chehra</b> was the descriptive roll of each soldier. These stopped cheating about the number and quality of the horses.</p>
      <p class="cp-lead">A mansabdar was paid in <b>naqdi</b> (cash) or in <b>jagir</b> (a grant of land revenue). Jagirs were transferable, and in later times there were not enough good jagirs for all the mansabdars. This was the <b>jagirdari crisis</b>, a stock cause of Mughal decline.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/9.png" alt="Mughal soldiers horses branding dagh miniature painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Du-aspa Sih-aspa belongs to Jahangir, Mashrut belongs to Aurangzeb, and Zat and Sawar belong to Akbar.</div>
      <div class="cp-note exam">Remember the highest and the next: Raja Man Singh held 7000 Zat and Bhagwan Das held 5000 Zat.</div>
    `
  },
  17: {
    questext: "The mansab system was first brought into North India by which ruler?",
    options: ["Akbar", "Babur", "Humayun", "Jahangir"],
    correct: "2",
    exptext: "✅ Babur first used the mansab system in North India. 📌 Babur started it and Akbar made it complete. ❌ Akbar is wrong because he made it a full system and added Zat and Sawar."
  },
  18: {
    questext: "The Du-aspa Sih-aspa rank was introduced by which ruler?",
    options: ["Akbar", "Shah Jahan", "Jahangir", "Aurangzeb"],
    correct: "3",
    exptext: "✅ Jahangir brought in the Du-aspa Sih-aspa rank. 📌 Du means two and sih means three, for doubled or trebled horsemen. ❌ Aurangzeb is wrong because his rule was the Mashrut rank."
  },
  19: {
    questext: "In the mansabdari system, what did the term Sawar mean?",
    options: ["The personal rank and pay", "A grant of land", "The number of horsemen kept", "A salary in cash"],
    correct: "3",
    exptext: "✅ Sawar means the number of horsemen the mansabdar had to keep. 📌 Sawar is the rider. ❌ The personal rank and pay is wrong because that is Zat."
  },
  20: {
    questext: "Which noble held the highest mansab of 7000 Zat?",
    options: ["Todar Mal", "Bhagwan Das", "Raja Man Singh", "Birbal"],
    correct: "3",
    exptext: "✅ Raja Man Singh held 7000 Zat. 📌 Man Singh was the highest, and Bhagwan Das was next with 5000. ❌ Bhagwan Das is wrong because he held 5000 Zat."
  },
  21: {
    questext: "Consider the following statements about Akbar's military rules:\n1. Dagh was the branding of horses.\n2. Chehra was the descriptive roll of soldiers.\n3. Akbar revived both rules from Alauddin Khalji.\nWhich of the statements given above are correct?",
    options: ["Only 1 and 2", "Only 2 and 3", "Only 1 and 3", "1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three statements are correct. 📌 Dagh is for the horse, and chehra is for the soldier. ❌ The other options are wrong because each leaves out one true statement."
  },
  22: {
    type: "concept", icon: "🌾", accent: "#22c55e", pauseTimer: true,
    title: "Revenue Administration (Todar Mal)",
    html: `
      <p class="cp-lead">Land revenue was the main income of the Mughal empire. Raja Todar Mal, who had earlier served Sher Shah, helped Akbar to build a fair and clear system. His post was the Diwan-i-Ashraf.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/10.png" alt="Raja Todar Mal portrait painting Akbar minister" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">First, the land was divided into <b>four classes</b>, by how long it was used or left to rest. The longer the rest, the lower the tax.</p>
      <table><thead><tr><th>Class</th><th>Meaning</th></tr></thead><tbody><tr><td>Polaj</td><td>Land cultivated continuously, every year</td></tr><tr><td>Parauti</td><td>Land left fallow for one or two years</td></tr><tr><td>Chachar</td><td>Land left fallow for three or four years</td></tr><tr><td>Banjar</td><td>Land left uncultivated for more than five years</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/11.png" alt="Four steps of rest going down: Polaj (no rest), Parauti (rest 1 to 2 years), Chachar (rest" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The most famous system was <b>Dahsala</b>, also called Ain-i-Dahsala, introduced in 1580, the twenty-fourth regnal year of Akbar. The state found the average produce and the average prices of the last ten years. The state share was one third of the produce, paid in cash, and there was no jagirdar or zamindar standing in between.</p>
      <p class="cp-lead">The land was measured with the <b>Ilahi gaz</b>, a yard measure, and the <b>jarib</b>, a bamboo chain with iron rings. A fixed measure made the system fair for every farmer.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/12.png" alt="Dahsala picture: ten year boxes with produce and prices, an arrow to an average box, then " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">Polaj, Parauti, Chachar, Banjar: the rest of the land grows longer step by step, from none to more than five years.</div>
      <div class="cp-note trap">Polaj never rests, and Banjar rests the longest. Do not swap the two.</div>
      <div class="cp-note exam">Remember Dahsala for 1580, the twenty-fourth regnal year, with an average of ten years and one third paid in cash.</div>
    `
  },
  23: {
    questext: "Land that was cultivated continuously every year was known as what?",
    options: ["Parauti", "Polaj", "Chachar", "Banjar"],
    correct: "2",
    exptext: "✅ Polaj was land cultivated continuously. 📌 Polaj never rests. ❌ Parauti is wrong because that land was left fallow for one or two years."
  },
  24: {
    questext: "Which land class was left uncultivated for more than five years?",
    options: ["Banjar", "Chachar", "Parauti", "Polaj"],
    correct: "1",
    exptext: "✅ Banjar was land left uncultivated for more than five years. 📌 Banjar means barren. ❌ Chachar is wrong because that land rested only three or four years."
  },
  25: {
    questext: "The Dahsala system of Todar Mal was introduced in which year?",
    options: ["1563", "1570", "1575", "1580"],
    correct: "4",
    exptext: "✅ The Ain-i-Dahsala came in 1580. 📌 It was the twenty-fourth regnal year of Akbar. ❌ 1563 is wrong because that is the year Akbar abolished the pilgrim tax."
  },
  26: {
    questext: "In the Dahsala system, how much of the produce did the state take, and how was it paid?",
    options: ["One half, in kind", "One third, in cash", "One fourth, in kind", "One third, in kind"],
    correct: "2",
    exptext: "✅ The state took one third of the average produce, paid in cash. 📌 Dahsala means ten years, and cash makes the count simple. ❌ One third in kind is wrong because the Dahsala payment was in cash."
  },
  27: {
    type: "concept", icon: "🧮", accent: "#ef4444", pauseTimer: true,
    title: "Systems of Revenue Collection",
    html: `
      <p class="cp-lead">The Mughals used six main ways to collect land revenue. The method depended on the place and on the crop, so it is important to separate them clearly.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/13.png" alt="Six boxes in two rows: Dahshala, Zabti, Ghallabaksha or Batai, Kankut, Nasaq, Ryotwari, ea" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>System</th><th>How it worked</th></tr></thead><tbody><tr><td>Dahshala</td><td>Ten-year average of produce and prices; one third to the state, paid in cash</td></tr><tr><td>Zabti</td><td>Cultivated land was measured each season, and the Bitikchi applied the fixed rates</td></tr><tr><td>Ghallabaksha or Batai</td><td>The oldest and most common; the crop was heaped in three at the field, and one third went to the state</td></tr><tr><td>Kankut</td><td>Kan means grain and Kut means estimate; the crop was estimated by an on-the-spot inspection, and one third of it was demanded</td></tr><tr><td>Nasaq</td><td>Used in Bengal; based on the past revenue receipts of the farmer</td></tr><tr><td>Ryotwari</td><td>One third of the actual produce; farmers paid in cash or in kind</td></tr></tbody></table>
      <p class="cp-lead">In <b>Batai</b>, the state and the farmer shared the real crop, so the farmer paid only what the field gave. In <b>Zabti</b>, the land was measured, and the rate was fixed beforehand.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/14.png" alt="Mughal revenue collection peasants miniature painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The revenue officers formed a chain. The <b>Amil</b> of the Pargana reported to the <b>Amalgujar</b>, who reported to the Provincial Diwan, and he reported to the Imperial Diwan.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/15.png" alt="Four-step chain of boxes: Amil (pargana), Amalgujar (sarkar), Provincial Diwan (suba), Imp" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The historian Vincent Smith called the revenue system of Akbar admirable. Akbar also gave relief from religious taxes: he abolished the pilgrim tax in 1563 and the jizya in 1564, and Aurangzeb brought back the jizya in 1679.</p>
      <div class="cp-note trap">Do not mix the names. Nasaq belongs to Bengal, Kankut belongs to the on-the-spot estimate, and Batai belongs to sharing the crop.</div>
      <div class="cp-note exam">Remember the tax dates: pilgrim tax abolished in 1563, jizya abolished in 1564, jizya brought back in 1679.</div>
    `
  },
  28: {
    questext: "Which system of revenue collection was the oldest and the most common?",
    options: ["Zabti", "Kankut", "Nasaq", "Ghallabaksha or Batai"],
    correct: "4",
    exptext: "✅ Ghallabaksha, also called Batai, was the oldest and most common. 📌 Batai means sharing the crop. ❌ Zabti is wrong because it relied on measuring the land, and it was a later method."
  },
  29: {
    questext: "The Nasaq system of revenue collection was used mainly in which region?",
    options: ["Bengal", "Gujarat", "Punjab", "Bihar"],
    correct: "1",
    exptext: "✅ Nasaq was used in Bengal and used the past revenue receipts of the farmer. 📌 Nasaq and Bengal, N for the east. ❌ Gujarat is wrong because Nasaq is not linked with that region."
  },
  30: {
    questext: "What is the correct order of revenue officers from the Pargana up to the centre?",
    options: ["Amalgujar, Amil, Provincial Diwan, Imperial Diwan", "Amil, Amalgujar, Provincial Diwan, Imperial Diwan", "Amil, Provincial Diwan, Amalgujar, Imperial Diwan", "Imperial Diwan, Provincial Diwan, Amalgujar, Amil"],
    correct: "2",
    exptext: "✅ The chain is Amil, Amalgujar, Provincial Diwan and Imperial Diwan. 📌 It goes from the pargana up to the centre. ❌ The fourth option is wrong because it runs from the top down."
  },
  31: {
    questext: "Consider the following statements about religious taxes:\n1. Akbar abolished the pilgrim tax in 1563.\n2. Akbar abolished the jizya in 1564.\n3. Aurangzeb brought back the jizya in 1679.\nWhich of the statements given above are correct?",
    options: ["Only 1 and 2", "Only 2 and 3", "Only 1 and 3", "1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three statements are correct. 📌 The dates run 1563, 1564, 1679. ❌ The other options are wrong because each leaves out one true statement."
  },
  32: {
    type: "concept", icon: "🏯", accent: "#ec4899", pauseTimer: true,
    title: "Mughal Architecture: Babur to Jahangir",
    html: `
      <p class="cp-lead">Mughal architecture was the last stage of Indo-Islamic architecture. Builders used rough stone, red sandstone and marble, and <b>pietra dura</b> is the art of fixing jewels or coloured stones into marble.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/16.png" alt="Humayun's Tomb Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Reign</th><th>Monuments and key facts</th></tr></thead><tbody><tr><td>Babur, the beginning</td><td>Kabuli Bagh Mosque (Panipat), Jami Masjid (Sambhal), Babri Mosque (Ayodhya) built by Mir Baqi, and Rambagh (Agra)</td></tr><tr><td>Humayun</td><td>Preferred the Iranian style and laid the foundation of Dinpanah in Delhi</td></tr><tr><td>Jahangir, the rest period</td><td>Akbar's Tomb at Sikandra, built by Jahangir, and the Tomb of Mariam-uz-Zamani</td></tr></tbody></table>
      <p class="cp-lead"><b>Humayun's Tomb</b> (1570) was designed by the Persian architect Mirak Mirza Ghiyas and ordered by Hamida Bano Begum. It has red sandstone with marble, a double dome and a charbagh garden, and it was the model for the Taj Mahal. Agra city was founded by Sikandar Lodi in 1504.</p>
      <p class="cp-lead"><b>Akbar</b> built the Agra Fort (begun in 1565) with the Delhi Gate and the Amar Singh Gate, and the statues of the Rajput heroes Jaimal and Fatta of Mewar stood there. He also built the Lahore Fort and the Allahabad Fort.</p>
      <p class="cp-lead"><b>Fatehpur Sikri</b> was begun in 1571, a seven-mile fort of red sandstone, and was the capital until 1585. Its buildings include the Buland Darwaza, Diwan-e-Aam, Diwan-e-Khas, Jama Masjid, Ibadat-Khana, Panch Mahal (1583), the Tomb of Salim Chishti, Hiran Minar, Birbal Mahal and Jodha's Palace. The Buland Darwaza was built in 1575 to celebrate the Gujarat victory, and its designer was Bahauddin.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/17.png" alt="Fatehpur Sikri Buland Darwaza photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Jahangir</b> built little, and his reign is called the Rest Period of Architecture. The Tomb of Itmad-ud-Daulah at Agra, on the Yamuna, was built by Nur Jahan in 1626 to 1628 for her father Mirza Ghiyas Beg, in white marble. It is the first monument with pietra dura.</p>
      <p class="cp-lead">Other works are the Tomb of Abdurrahim Khankhana in Delhi, the Tomb of Jahangir and the Dilkusha Bagh at Lahore, and the Shalimar Bagh in Kashmir.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/18.png" alt="Itmad-ud-Daulah Tomb Agra marble pietra dura photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix the two Ghiyas names. Mirak Mirza Ghiyas designed Humayun's Tomb, and Mirza Ghiyas Beg is the father of Nur Jahan.</div>
      <div class="cp-note exam">Remember Hamida Bano Begum for Humayun's Tomb, and Bahauddin with the Buland Darwaza of 1575.</div>
    `
  },
  33: {
    questext: "Who ordered the building of Humayun's Tomb?",
    options: ["Nur Jahan", "Akbar", "Hamida Bano Begum", "Babur"],
    correct: "3",
    exptext: "✅ Hamida Bano Begum, the wife of Humayun, ordered the tomb. 📌 The widow built the tomb of her husband. ❌ Akbar is wrong because he was her son and was not the one who ordered it."
  },
  34: {
    questext: "The Buland Darwaza of Fatehpur Sikri was built to celebrate the victory over which region?",
    options: ["Gujarat", "Bengal", "Chittor", "Malwa"],
    correct: "1",
    exptext: "✅ The Buland Darwaza was built in 1575 to celebrate the Gujarat victory. 📌 Buland means high, and Gujarat was a high victory. ❌ Bengal is wrong because it has no link with this gate."
  },
  35: {
    questext: "Who built the Tomb of Itmad-ud-Daulah at Agra for her father?",
    options: ["Jahangir", "Shah Jahan", "Mumtaz Mahal", "Nur Jahan"],
    correct: "4",
    exptext: "✅ Nur Jahan built it in 1626 to 1628 for her father Mirza Ghiyas Beg. 📌 Itmad-ud-Daulah is the title of Nur Jahan's father. ❌ Mumtaz Mahal is wrong because she is the lady of the Taj Mahal."
  },
  36: {
    questext: "Which monument was the first to use pietra dura in India?",
    options: ["Taj Mahal", "Tomb of Itmad-ud-Daulah", "Humayun's Tomb", "Akbar's Tomb at Sikandra"],
    correct: "2",
    exptext: "✅ The Tomb of Itmad-ud-Daulah was the first monument with pietra dura. 📌 It came before the Taj Mahal and inspired it. ❌ The Taj Mahal is wrong because it came later and made much greater use of it."
  },
  37: {
    questext: "Which of the following pairs is NOT correct?",
    options: ["Kabuli Bagh Mosque – Panipat", "Jami Masjid – Sambhal", "Rambagh – Agra", "Babri Mosque – Delhi"],
    correct: "4",
    exptext: "✅ The Babri Mosque was at Ayodhya, built by Mir Baqi. 📌 Panipat, Sambhal, Agra and Ayodhya are the places of Babur. ❌ The other pairs are correct, so they cannot be the answer."
  },
  38: {
    type: "concept", icon: "🕌", accent: "#a855f7", pauseTimer: true,
    title: "Mughal Architecture: Shah Jahan and Aurangzeb",
    html: `
      <p class="cp-lead">The reign of Shah Jahan was the <u>peak</u> of Mughal architecture, and the reign of Aurangzeb was its decline.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/19.png" alt="Red Fort Delhi Lahori Gate front view photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Monument</th><th>Key facts</th></tr></thead><tbody><tr><td>Taj Mahal</td><td>On the Yamuna bank at Agra, built from 1631 to 1653 in 22 years for Mumtaz Mahal (Arjumand Bano Begum); architect Ustad Ahmad Lahauri and supervisor Ustad Isa Khan; white marble with pietra dura; a World Heritage Site of the United Nations Educational, Scientific and Cultural Organization (UNESCO), listed in 1983</td></tr><tr><td>Red Fort</td><td>Built from 1639 to 1648 in red sandstone; has the Rang Mahal, Heera Mahal, Naubatkhana, Diwan-e-Aam, Diwan-e-Khas and the Hayat Bakhsh Bagh with the Sawan and Bhado mandaps</td></tr><tr><td>Jama Masjid, Delhi</td><td>Completed in 1656; the largest mosque in India</td></tr><tr><td>Other works</td><td>Shahjahanabad, and the renovation of Agra Fort</td></tr><tr><td>Peacock Throne</td><td>Takht-i-Taus, made by Bebadal Khan</td></tr></tbody></table>
      <p class="cp-lead">On the wall of the Diwan-e-Khas there is a famous line: <i>If there is heaven on earth, it is here, here, here.</i></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/20.png" alt="Jama Masjid Delhi courtyard photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Under <b>Aurangzeb</b>, building almost stopped, and his main work was the <b>Moti Masjid</b> inside the Red Fort of Delhi. The Moti Masjid of Agra Fort belongs to Shah Jahan, so do not mix the two.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/21.png" alt="Moti Masjid Red Fort Delhi Aurangzeb photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">There are two Moti Masjids. The one in Agra Fort was built by Shah Jahan, and the one in the Red Fort of Delhi was built by Aurangzeb.</div>
      <div class="cp-note exam">Remember the timings: Taj Mahal 1631 to 1653, Red Fort 1639 to 1648, Jama Masjid 1656.</div>
    `
  },
  39: {
    questext: "For how many years was the Taj Mahal under construction?",
    options: ["12", "22", "17", "30"],
    correct: "2",
    exptext: "✅ The Taj Mahal was built from 1631 to 1653, which is 22 years. 📌 Subtract 1631 from 1653. ❌ 17 is wrong because it is too short for the whole complex."
  },
  40: {
    questext: "Who supervised the building of the Taj Mahal along with the architect Ustad Ahmad Lahauri?",
    options: ["Ustad Isa Khan", "Mir Baqi", "Mirak Mirza Ghiyas", "Bahauddin"],
    correct: "1",
    exptext: "✅ Ustad Isa Khan supervised the work. 📌 Two ustads, Ahmad and Isa, are named. ❌ Mirak Mirza Ghiyas is wrong because he designed Humayun's Tomb."
  },
  41: {
    questext: "The famous line \"If there is heaven on earth, it is here, here, here\" is written in which building?",
    options: ["Taj Mahal", "Moti Masjid, Agra Fort", "Jama Masjid, Delhi", "Diwan-e-Khas, Red Fort"],
    correct: "4",
    exptext: "✅ The line is on the Diwan-e-Khas of the Red Fort. 📌 The hall of private audience was the most beautiful. ❌ The Taj Mahal is wrong because the line is not written there."
  },
  42: {
    questext: "Who built the Moti Masjid inside the Red Fort of Delhi?",
    options: ["Shah Jahan", "Aurangzeb", "Jahangir", "Akbar"],
    correct: "2",
    exptext: "✅ Aurangzeb built it. 📌 It is the main building of the decline period. ❌ Shah Jahan is wrong because his Moti Masjid is in the Agra Fort."
  },
  43: {
    type: "concept", icon: "💎", accent: "#0d9488", pauseTimer: true,
    title: "What Inspired the Taj Mahal",
    html: `
      <p class="cp-lead">The Taj Mahal is the best example of Mughal art, but it did not appear suddenly. Each of its features was taken from an older building.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/22.png" alt="Taj Mahal Yamuna riverbank view photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature of the Taj</th><th>Inspiration</th></tr></thead><tbody><tr><td>Charbagh style</td><td>Humayun's Tomb</td></tr><tr><td>Islamic simplicity</td><td>Akbar's Tomb</td></tr><tr><td>Tomb design</td><td>Hoshang Shah's Tomb (Mandu)</td></tr><tr><td>Marble and pietra dura</td><td>Itmad-ud-Daulah's Tomb</td></tr><tr><td>Reflection in the lake</td><td>Sher Shah's Tomb (Sasaram)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/23.png" alt="Hub-and-spoke picture with the Taj Mahal in the centre and five spokes to: Humayun's Tomb " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Pietra dura</b> came to India from Rome in Italy, and it was known there in the sixteenth century. Mughal workers learned it and gave it Indian flowers and designs.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/24.png" alt="Hoshang Shah Tomb Mandu white marble photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The tomb that gave the charbagh is Humayun's Tomb, and the one that gave the lake reflection is Sher Shah's Tomb at Sasaram. Do not swap them.</div>
      <div class="cp-mnemonic">Remember the five by their place: Delhi, Sikandra, Mandu, Agra, Sasaram.</div>
    `
  },
  44: {
    questext: "The charbagh style of the Taj Mahal was inspired by which tomb?",
    options: ["Akbar's Tomb", "Itmad-ud-Daulah's Tomb", "Humayun's Tomb", "Hoshang Shah's Tomb"],
    correct: "3",
    exptext: "✅ The charbagh garden came from Humayun's Tomb. 📌 Char means four, and bagh means garden. ❌ Akbar's Tomb is wrong because it gave the idea of Islamic simplicity."
  },
  45: {
    questext: "The idea of the reflection of the tomb in a lake came from the tomb of which ruler?",
    options: ["Sher Shah at Sasaram", "Hoshang Shah at Mandu", "Humayun at Delhi", "Akbar at Sikandra"],
    correct: "1",
    exptext: "✅ The lake reflection came from the Tomb of Sher Shah at Sasaram. 📌 Sher Shah's tomb stands in a lake. ❌ Hoshang Shah's Tomb is wrong because it gave the design of the tomb."
  },
  46: {
    questext: "Marble work and pietra dura in the Taj Mahal were inspired by which monument?",
    options: ["Sher Shah's Tomb", "Humayun's Tomb", "Hoshang Shah's Tomb", "Itmad-ud-Daulah's Tomb"],
    correct: "4",
    exptext: "✅ Marble and pietra dura came from the Tomb of Itmad-ud-Daulah. 📌 This tomb was first to use pietra dura. ❌ Hoshang Shah's Tomb is wrong because it gave the design of the tomb."
  },
  47: {
    questext: "From which place did the art of pietra dura come to India?",
    options: ["Persia", "Rome in Italy", "Turkey", "Arabia"],
    correct: "2",
    exptext: "✅ Pietra dura came from Rome in Italy, in the sixteenth century. 📌 Pietra dura is an Italian name. ❌ Persia is wrong because it was not the home of this art."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a Mughal court throne, an old revenue scroll with a measuring chain, and a white marble arch" },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/1.png": { t: "fig", about: "Pyramid diagram: Emperor at the top; below him six boxes in a row named Vakil-e-Mutlak, Diwan or Wazir, Mir Bakhshi, Mir Saman, Sadr-us-Sadur, Chief Qazi." },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Diwan-i-Aam Red Fort Delhi hall of public audience photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/2.png. the hall where the emperor met his officers and the public",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/3.png": { t: "fig", about: "Simple growth chart of provinces in three boxes: Akbar 12 subas; Akbar later 15 subas with Berar, Khandesh and Ahmednagar added; Aurangzeb 20 subas." },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mughal empire provinces map Akbar subas\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/4.png. a map of the subas of the Mughal empire",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/5.png": { t: "fig", about: "Four-step ladder from top to bottom with labels: Subah, Sarkar, Pargana, Village; each step shows its main officer: Subedar, Faujdar, Amil, Patwari." },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian village land record patwari register photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/6.png. a village record keeper with his land register",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mughal mansabdar on horseback with soldiers painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/7.png. a Mughal officer with his horsemen",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/8.png": { t: "fig", about: "Diagram of one mansabdar split into two boxes: Zat (personal rank and pay) and Sawar (number of horsemen kept); below them three classes: Sawar equal to Zat; Sawar at least half of Zat; Sawar less than half of Zat." },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mughal soldiers horses branding dagh miniature painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/9.png. a painting of Mughal horsemen and their horses",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Raja Todar Mal portrait painting Akbar minister\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/10.png. a portrait of Raja Todar Mal",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/11.png": { t: "fig", about: "Four steps of rest going down: Polaj (no rest), Parauti (rest 1 to 2 years), Chachar (rest 3 to 4 years), Banjar (rest over 5 years)." },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/12.png": { t: "fig", about: "Dahsala picture: ten year boxes with produce and prices, an arrow to an average box, then one third of it going to the state in cash." },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/13.png": { t: "fig", about: "Six boxes in two rows: Dahshala, Zabti, Ghallabaksha or Batai, Kankut, Nasaq, Ryotwari, each with a two-word clue: ten-year average; measured land; crop sharing; estimate; Bengal past receipts; actual produce." },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mughal revenue collection peasants miniature painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/14.png. a painting of farmers and a Mughal revenue officer",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/15.png": { t: "fig", about: "Four-step chain of boxes: Amil (pargana), Amalgujar (sarkar), Provincial Diwan (suba), Imperial Diwan (centre)." },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Humayun's Tomb Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/16.png. Humayun's Tomb, the first great garden tomb",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fatehpur Sikri Buland Darwaza photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/17.png. the great gate of Fatehpur Sikri",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Itmad-ud-Daulah Tomb Agra marble pietra dura photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/18.png. the white marble tomb built by Nur Jahan",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Red Fort Delhi Lahori Gate front view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/19.png. the Red Fort of Delhi, built by Shah Jahan",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jama Masjid Delhi courtyard photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/20.png. the Jama Masjid of Delhi, the largest mosque in India",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Moti Masjid Red Fort Delhi Aurangzeb photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/21.png. the small marble mosque inside the Red Fort of Delhi",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Taj Mahal Yamuna riverbank view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/22.png. the Taj Mahal seen from the riverbank",
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/23.png": { t: "fig", about: "Hub-and-spoke picture with the Taj Mahal in the centre and five spokes to: Humayun's Tomb (charbagh), Akbar's Tomb (simplicity), Hoshang Shah's Tomb (design), Itmad-ud-Daulah's Tomb (marble and pietra dura), Sher Shah's Tomb (lake reflection)." },
  "images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hoshang Shah Tomb Mandu white marble photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Mughal_Administrative_Structure/24.png. the Tomb of Hoshang Shah at Mandu"
});

/* CHANGE LOG
   - Humayun's Tomb: the architect is given as Mirak Mirza Ghiyas, a Persian; Mirza Ghiyas Beg is the father of Nur Jahan, for whom the Tomb of Itmad-ud-Daulah was built. The unclear name of the architect was corrected.
   - Taj Mahal: built from 1631 to 1653, about 22 years; the earlier chapter on Shah Jahan gives 1632 as the year the work was begun.
   - Taj Mahal and the United Nations Educational, Scientific and Cultural Organization: only the year 1983 is kept; the claim that it was the first Indian monument was dropped, because other Indian sites were listed in the same year.
   - Peacock Throne maker is written as Bebadal Khan; Panch Mahal is listed with Fatehpur Sikri, where it stands.
   - Mansab grades: the Ain-i-Akbari lists 66 grades, but not more than 33 were in use.
*/
