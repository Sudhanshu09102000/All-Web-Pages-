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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Post_Mughal_Period_Later_Mughals · 5 concept pages (+ overview) · 19 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "LATER MUGHALS",
      line2: "1707 TO 1857",
      line3: "KING MAKERS • INVASIONS",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Later Mughals 1707-1857 Full Class | Medieval India | SSC CGL",
      altTitles: ["Sayyid Brothers, Nadir Shah and Abdali in One Class", "Post Mughal Period Important Facts for Competitive Exams"],
      description: "After Aurangzeb died in 1707, the Mughal empire slowly broke apart. In this fast-track class you learn the Later Mughals in simple steps, from Bahadur Shah I to Bahadur Shah Zafar.\n\n📌 IN THIS CLASS\n✅ Every later emperor with his years, nickname and key fact\n✅ The Sayyid Brothers, the King Makers, and the court factions\n✅ Nadir Shah, Ahmed Shah Abdali and the Third Battle of Panipat\n✅ The Treaty of Allahabad and other added exam facts\n✅ Practice questions in the SSC CGL style\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 The Later Mughals, 1707–1857\n00:00 Court Factions\n00:00 Invasions\n00:00 Added Exam Facts\n00:00 2-Minute Revision\n\n👍 Like, share and subscribe.\n\n#SSCCGL #LaterMughals #MedievalIndia",
      tags: ["later mughals", "post mughal period", "medieval india", "medieval india for ssc cgl", "sayyid brothers", "king makers", "nadir shah invasion", "battle of karnal", "ahmed shah abdali", "third battle of panipat", "treaty of allahabad", "bahadur shah zafar", "muhammad shah rangeela", "mughal emperors nicknames", "mughal emperors in order", "farrukhsiyar farman 1717", "general awareness", "indian history for ssc", "ssc cgl history", "history mcq", "history tricks", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "concept class"],
      hashtags: ["SSCCGL", "LaterMughals", "MedievalIndia"],
      thumbText: "LATER MUGHALS 1707-1857",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Later Mughals, from Bahadur Shah I to Bahadur Shah Zafar. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 The Later Mughals, 1707–1857\n00:00 Court Factions\n00:00 Invasions\n00:00 Added Exam Facts\n00:00 2-Minute Revision",
      playlist: "Competitive exams General Awareness — Medieval India"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Later Mughals, from 1707 to 1857</u>. We will see how a great empire slowly lost its power, and who the key emperors, nobles and invaders were.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>5</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>19</b><span>Questions</span></div>
        <div class="cp-stat"><b>~29 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Later Mughals, 1707–1857</b><br>Every later emperor in order, with his years, his nickname and one key fact. We also see why the empire became weaker with each reign.</li>
        <li><b>Court Factions</b><br>The Sayyid Brothers, who were called the King Makers, and the Turani, Irani and Afghan groups of nobles who fought for power.</li>
        <li><b>Invasions</b><br>How Nadir Shah and Ahmed Shah Abdali attacked India, and what happened at Karnal and at the Third Battle of Panipat.</li>
        <li><b>Added Exam Facts</b><br>The Treaty of Allahabad and the other events from 1739 to 1803 that exams ask again and again.</li>
        <li><b>2-Minute Revision</b><br>A quick table of the break-away states, the important names and the last days of Bahadur Shah Zafar.</li>
        <li><b>Practice</b><br>Nineteen questions, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on emperor nicknames, the Sayyid Brothers, Nadir Shah and the Treaty of Allahabad are asked almost every year, and the same facts also help you in Modern History.</div>
    `
  },
  2: {
    type: "concept", icon: "👑", accent: "#ef4444", pauseTimer: true,
    title: "The Later Mughals, 1707–1857",
    html: `
      <p class="cp-lead">The Mughal empire became strong under <b>Akbar</b>, but it began to decline after the death of <b>Aurangzeb</b> in <b>1707</b>. <u>For each later emperor, learn the years, the nickname and one key fact.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/1.png" alt="Bahadur Shah Zafar last Mughal emperor portrait photograph" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">After Aurangzeb died, his sons fought for the throne. <b>Muazzam</b> won and became <b>Bahadur Shah I</b>. After him the emperors were weak, and powerful nobles ruled in their name. A <i>mansab</i> means an official rank, and a <i>farman</i> means a royal order.</p>
      <table><thead><tr><th>Emperor</th><th>Reign</th><th>Key fact</th></tr></thead><tbody><tr><td>Bahadur Shah I (Muazzam), nickname Shah-e-Bekhabar, the Uninformed King</td><td>1707 to 1712</td><td>Gave the high mansab to Guru Gobind Singh, the tenth Sikh Guru. After the Guru died, Banda Bahadur led the Sikh revolt in Punjab.</td></tr><tr><td>Jahandar Shah, nickname Lampat Murkh, the Foolish Man of Loose Habits</td><td>1712 to 1713</td><td>Raised by Zulfiqar Khan of the Irani group. Friendly to Hindu and Maratha kings. Abolished jizya. Killed in 1713 by his nephew Farrukhsiyar with the help of the Sayyid Brothers.</td></tr><tr><td>Farrukhsiyar</td><td>1713 to 1719</td><td>Raised by the Sayyid Brothers, who abolished jizya and the pilgrimage tax. His farman of 1717 gave trade concessions to the English East India Company and is called its Magna Carta. Banda Bahadur was executed. He was deposed and murdered in 1719.</td></tr><tr><td>Rafi-ud-Darajat and Rafi-ud-Daula (Shahjahan II)</td><td>1719</td><td>Puppets of the Sayyid Brothers. The first died of illness, and the second was an opium addict. Then Roshan Akhtar, son of Rafi-ud-Daula, became Muhammad Shah.</td></tr><tr><td>Muhammad Shah, nickname Rangeela</td><td>1719 to 1748</td><td>The empire declined fastest in his reign. His life of luxury gave him the nickname.</td></tr><tr><td>Ahmad Shah Bahadur</td><td>1748 to 1754</td><td>Faced repeated invasions by Ahmed Shah Abdali. Deposed in 1754 by the wazir Imad-ul-Mulk with Maratha help.</td></tr><tr><td>Alamgir II</td><td>1754 to 1759</td><td>Puppet of Imad-ul-Mulk. The Battle of Plassey was fought in 1757, when the British beat Siraj-ud-Daula. He was murdered in 1759.</td></tr><tr><td>Shah Alam II (Ali Gauhar)</td><td>1759 to 1806</td><td>Fought the Company at Buxar in 1764 and became a British pensioner by the Treaty of Allahabad in 1765.</td></tr><tr><td>Akbar II</td><td>1806 to 1837</td><td>His power was limited to the Red Fort (Lal Qila) in Delhi. First Mughal crowned under British protection. Gave the title Raja to Ram Mohan Roy.</td></tr><tr><td>Bahadur Shah II Zafar</td><td>1837 to 1857</td><td>The last Mughal. A Urdu poet with the pen name Zafar. Backed the rebels in the Revolt of 1857, the First War of Indian Independence. Exiled to Rangoon (Yangon, Burma) and died in 1862, which ended the Mughal empire.</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/2.png" alt="A timeline from 1707 to 1857 with the nine main emperors in order as small boxes: Bahadur " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Look at the pattern. In the early years strong nobles made and removed emperors. Later the emperors had no real power outside the Red Fort in Delhi.</p>
      <div class="cp-example"><b>Example:</b> The Battle of Plassey was fought in 1757. Look at the table: 1757 falls between 1754 and 1759, so the emperor at that time was Alamgir II.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/3.png" alt="Three cards side by side: Bahadur Shah I is Shah-e-Bekhabar, Jahandar Shah is Lampat Murkh" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The three nicknames are easy to mix up. <b>Shah-e-Bekhabar</b> is Bahadur Shah I, <b>Lampat Murkh</b> is Jahandar Shah, and <b>Rangeela</b> is Muhammad Shah.</div>
      <div class="cp-note trap">Match each event with its emperor: the farman of 1717 with Farrukhsiyar, Plassey in 1757 with Alamgir II, and Buxar in 1764 and the Treaty of Allahabad in 1765 with Shah Alam II.</div>
      <div class="cp-note exam">Jizya is a tax on non-Muslims. It was abolished first by Jahandar Shah, and then again by the Sayyid Brothers under Farrukhsiyar.</div>
    `
  },
  3: {
    questext: "Which Later Mughal emperor is known by the nickname 'Lampat Murkh'?",
    options: ["Bahadur Shah I", "Jahandar Shah", "Farrukhsiyar", "Muhammad Shah"],
    correct: "2",
    exptext: "✅ Jahandar Shah is called Lampat Murkh, which means a foolish man of loose habits. 📌 Bekhabar goes with Bahadur Shah I, Lampat Murkh with Jahandar Shah, and Rangeela with Muhammad Shah. ❌ Muhammad Shah is wrong because he is known as Rangeela."
  },
  4: {
    questext: "The farman of 1717, which gave trade concessions to the English East India Company, was issued by which emperor?",
    options: ["Jahandar Shah", "Muhammad Shah", "Farrukhsiyar", "Alamgir II"],
    correct: "3",
    exptext: "✅ Farrukhsiyar issued the farman of 1717, and it is called the Magna Carta of the Company. 📌 Farman and Farrukhsiyar both start with the letter F. ❌ Alamgir II is wrong because his reign is linked with the Battle of Plassey in 1757."
  },
  5: {
    questext: "Which of the following pairs of emperor and nickname is NOT correctly matched?",
    options: ["Bahadur Shah I and Shah-e-Bekhabar", "Jahandar Shah and Lampat Murkh", "Muhammad Shah and Rangeela", "Farrukhsiyar and Shah-e-Bekhabar"],
    correct: "4",
    exptext: "✅ Shah-e-Bekhabar was the nickname of Bahadur Shah I, so pairing it with Farrukhsiyar is wrong. 📌 Farrukhsiyar is remembered for the farman of 1717, not for a nickname. ❌ Option 2 looks strange but is correct."
  },
  6: {
    questext: "The Battle of Plassey in 1757 was fought during the reign of which Mughal emperor?",
    options: ["Alamgir II", "Muhammad Shah", "Shah Alam II", "Akbar II"],
    correct: "1",
    exptext: "✅ Alamgir II ruled from 1754 to 1759, so the year 1757 falls in his reign. 📌 Remember Plassey 1757 with Alamgir II, and Buxar 1764 with Shah Alam II. ❌ Shah Alam II is tempting, but he came to the throne only in 1759."
  },
  7: {
    questext: "Consider the following statements about the Later Mughals:\n1. Jahandar Shah was killed in 1713 by his nephew Farrukhsiyar.\n2. Muhammad Shah was placed on the throne by the Sayyid Brothers after the two puppet emperors died.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. Farrukhsiyar killed Jahandar Shah in 1713 with the help of the Sayyid Brothers, and the Sayyids later made Roshan Akhtar emperor as Muhammad Shah. 📌 The Sayyid Brothers made four emperors. ❌ Choosing only one statement fails because both match the facts."
  },
  8: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "Court Factions",
    html: `
      <p class="cp-lead">A faction is a group of nobles who work together to gain power. <u>After Aurangzeb, the court was split into factions, and the emperor depended on whichever group was strongest.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/4.png" alt="A throne in the centre with three coloured boxes around it labelled Turani, Irani and Afgh" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Sayyid Brothers</b>, <b>Abdullah Khan</b> and <b>Hussain Ali Barah</b>, are famous as the <b>King Makers</b>, because they raised and removed emperors at will. The Turani leaders <b>Chinkilich Khan</b> (<b>Nizam-ul-Mulk</b>) and <b>Amin Khan</b> opposed them, and they got both brothers killed during the reign of Muhammad Shah.</p>
      <table><thead><tr><th>Group</th><th>Who they were</th><th>Key figures</th></tr></thead><tbody><tr><td>Turani</td><td>Sunni Muslims from Central Asia, who became the strongest group after the Sayyids fell</td><td>Nizam-ul-Mulk (Chinkilich Khan), Amin Khan, Zakaria Khan</td></tr><tr><td>Irani</td><td>Shia Muslims from Iran</td><td>Zulfiqar Khan, Saadat Khan, Amir Khan, Ishaq Khan</td></tr><tr><td>Afghan</td><td>Nobles of Afghan origin</td><td>Ali Muhammad Khan, Muhammad Bangash</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/5.png" alt="Red Fort Delhi Diwan-i-Khas hall interior photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Notice the simple idea behind the names. Turani nobles came from Central Asia, and Irani nobles came from Iran.</p>
      <div class="cp-note exam">Abdullah Khan was the wazir (chief minister), and Hussain Ali was the Mir Bakshi (chief paymaster of the army).</div>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/6.png" alt="A simple flow in five boxes: Sayyid Brothers make Farrukhsiyar emperor, they remove him in" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix up the groups. Nizam-ul-Mulk is Turani, while Zulfiqar Khan and Saadat Khan are Irani.</div>
      <div class="cp-mnemonic">Turani means Central Asia, and Irani means Iran.</div>
    `
  },
  9: {
    questext: "The Sayyid Brothers, Abdullah Khan and Hussain Ali Barah, were famous by which title?",
    options: ["Peacock Rulers", "King Makers", "Twin Wazirs", "Court Guardians"],
    correct: "2",
    exptext: "✅ They raised and removed emperors at will, so they were called the King Makers. 📌 A king maker is a person who makes kings. ❌ Twin Wazirs is wrong because only Abdullah Khan was the wazir, while Hussain Ali was the Mir Bakshi."
  },
  10: {
    questext: "Which of the following was a leader of the Turani group in the Mughal court?",
    options: ["Zulfiqar Khan", "Saadat Khan", "Chinkilich Khan (Nizam-ul-Mulk)", "Abdullah Khan"],
    correct: "3",
    exptext: "✅ Chinkilich Khan, also called Nizam-ul-Mulk, led the Turani group of Central Asian Sunni Muslims. 📌 Turani means Central Asia, and Irani means Iran. ❌ Zulfiqar Khan and Saadat Khan belonged to the Irani group."
  },
  11: {
    questext: "Consider the following statements about the Mughal court:\n1. Abdullah Khan was the Mir Bakshi and Hussain Ali Barah was the wazir.\n2. The Irani group was made up of Shia Muslims from Iran.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. Statement 1 swaps the posts, because Abdullah Khan was the wazir and Hussain Ali was the Mir Bakshi. 📌 The wazir is the higher post, and it went to Abdullah Khan, who is named first. ❌ Choosing both fails because of the swapped posts."
  },
  12: {
    type: "concept", icon: "⚔️", accent: "#8b5cf6", pauseTimer: true,
    title: "Invasions",
    html: `
      <p class="cp-lead">Weak emperors could not defend their land, so foreign rulers attacked. <u>Two names matter most: Nadir Shah and Ahmed Shah Abdali.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/7.png" alt="Peacock Throne Takht-e-Taus Mughal throne illustration" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Nadir Shah</b> of Iran, called the <b>Napoleon of Iran</b>, defeated Muhammad Shah in the <b>Battle of Karnal</b> on <b>24 February 1739</b>. Delhi was sacked in <b>March 1739</b>. He took away the <b>Peacock Throne</b> (Takht-e-Taus), which had been built for <b>Shah Jahan</b>, together with the Kohinoor diamond.</p>
      <p class="cp-lead"><b>Ahmed Shah Abdali</b>, the successor of Nadir Shah, invaded <b>Punjab</b> with a large army. He first invaded in <b>1748</b> and came again and again. He fought the <b>Third Battle of Panipat</b> against the Marathas on <b>14 January 1761</b>, during the reign of Shah Alam II.</p>
      <table><thead><tr><th>Invader</th><th>Year</th><th>What happened</th></tr></thead><tbody><tr><td>Nadir Shah</td><td>1739</td><td>Battle of Karnal, sack of Delhi, and the Peacock Throne and Kohinoor taken away</td></tr><tr><td>Ahmed Shah Abdali</td><td>1748</td><td>First invasion, followed by repeated invasions</td></tr><tr><td>Ahmed Shah Abdali</td><td>1761</td><td>Third Battle of Panipat against the Marathas</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/8.png" alt="A timeline with three markers: 1739 Karnal and the sack of Delhi, 1748 first invasion of A" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Delhi was sacked in 1739. Look at the earlier table: 1739 falls between 1719 and 1748, so Nadir Shah attacked in the reign of Muhammad Shah.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/9.png" alt="Third Battle of Panipat 1761 painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Nadir Shah took the Peacock Throne and the Kohinoor, while Abdali fought the Third Battle of Panipat.</div>
      <div class="cp-note exam">Nadir Shah is called the Napoleon of Iran, and the Peacock Throne was originally built for Shah Jahan.</div>
      <div class="cp-mnemonic">Nadir took the Throne, and Abdali fought Panipat.</div>
    `
  },
  13: {
    questext: "In the Battle of Karnal in 1739, Nadir Shah defeated which Mughal emperor?",
    options: ["Jahandar Shah", "Farrukhsiyar", "Alamgir II", "Muhammad Shah"],
    correct: "4",
    exptext: "✅ Muhammad Shah was defeated at Karnal on 24 February 1739, and Delhi was sacked in March. 📌 Nadir Shah's invasion goes with Muhammad Shah Rangeela. ❌ Farrukhsiyar is wrong because he was murdered in 1719."
  },
  14: {
    questext: "Which of the following was taken away from Delhi by Nadir Shah in 1739?",
    options: ["The Peacock Throne and the Kohinoor", "The Ain-i-Akbari and the royal library", "The gates of the Red Fort", "The crown of Akbar"],
    correct: "1",
    exptext: "✅ Nadir Shah took away the Peacock Throne, built for Shah Jahan, and the Kohinoor. 📌 Nadir took the throne, while Abdali fought Panipat. ❌ The other options are not linked with his invasion."
  },
  15: {
    questext: "Ahmed Shah Abdali fought the Third Battle of Panipat on 14 January 1761 against which power?",
    options: ["Sikhs", "Jats", "Marathas", "Rohillas"],
    correct: "3",
    exptext: "✅ Abdali fought the Marathas at Panipat in the reign of Shah Alam II. 📌 Panipat III, Abdali, Marathas, 1761. ❌ Sikhs are tempting because Abdali also invaded Punjab, but Panipat was fought against the Marathas."
  },
  16: {
    questext: "In which year did Ahmed Shah Abdali first invade India?",
    options: ["1739", "1761", "1757", "1748"],
    correct: "4",
    exptext: "✅ Abdali first invaded in 1748 and then came again and again. 📌 Remember Nadir Shah in 1739 and Abdali in 1748. ❌ The year 1739 is tempting because it is Nadir Shah's invasion, and 1761 is the Third Battle of Panipat."
  },
  17: {
    type: "concept", icon: "📌", accent: "#14b8a6", pauseTimer: true,
    title: "Added Exam Facts",
    html: `
      <p class="cp-lead">These facts are asked again and again in exams. <u>Learn them as a short chain of events from 1739 to 1803.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/10.png" alt="Treaty of Allahabad 1765 painting Shah Alam Robert Clive" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Event</th><th>What to remember</th></tr></thead><tbody><tr><td>1739</td><td>Battle of Karnal</td><td>Nadir Shah beat Muhammad Shah, Delhi was sacked, and the Peacock Throne built for Shah Jahan was taken away</td></tr><tr><td>1765</td><td>Treaty of Allahabad</td><td>Shah Alam II granted the Diwani of Bengal, Bihar and Orissa to the Company, through Robert Clive, for 26 lakh rupees a year</td></tr><tr><td>1772</td><td>Return to Delhi</td><td>Shah Alam II was restored at Delhi by the Maratha chief Mahadji Scindia</td></tr><tr><td>1788</td><td>Blinding of Shah Alam II</td><td>The Rohilla chief Ghulam Qadir blinded him</td></tr><tr><td>1803</td><td>Lord Lake</td><td>Lord Lake occupied Delhi in the Second Anglo-Maratha War</td></tr></tbody></table>
      <p class="cp-lead">The Diwani means the right to collect land revenue. With this treaty the English East India Company, and not the emperor, controlled the money of three rich provinces.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/11.png" alt="A chain of five boxes in order: 1739 Karnal, 1765 Treaty of Allahabad, 1772 Scindia restor" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-example"><b>Example:</b> Shah Alam II ruled from 1759 to 1806, so the years 1765, 1772, 1788 and 1803 all fall in his reign.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/12.png" alt="Mahadji Scindia Maratha ruler portrait" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not confuse the two Company documents. The farman of 1717 under Farrukhsiyar gave trade concessions, and the Treaty of Allahabad in 1765 under Shah Alam II gave the Diwani.</div>
      <div class="cp-note exam">The Company paid 26 lakh rupees a year to Shah Alam II for the Diwani, and Robert Clive arranged the treaty.</div>
    `
  },
  18: {
    questext: "Under the Treaty of Allahabad in 1765, Shah Alam II gave the Diwani of Bengal, Bihar and Orissa to the Company. How much money was he to receive every year?",
    options: ["26 lakh rupees", "12 lakh rupees", "30 lakh rupees", "50 lakh rupees"],
    correct: "1",
    exptext: "✅ Shah Alam II was to get 26 lakh rupees a year for the Diwani, which is the right to collect land revenue. 📌 Treaty of Allahabad, 1765, Robert Clive, 26 lakh. ❌ The other amounts are not linked with the treaty."
  },
  19: {
    questext: "Who blinded the Mughal emperor Shah Alam II in 1788?",
    options: ["Imad-ul-Mulk", "Najib-ud-Daula", "Ahmed Shah Abdali", "Ghulam Qadir"],
    correct: "4",
    exptext: "✅ The Rohilla chief Ghulam Qadir blinded Shah Alam II in 1788. 📌 Shah Alam II was blinded in 1788, and Lord Lake took Delhi fifteen years later, in 1803. ❌ Imad-ul-Mulk is wrong because he was the wazir who deposed Ahmad Shah Bahadur in 1754."
  },
  20: {
    questext: "Lord Lake occupied Delhi in 1803 during which war?",
    options: ["Second Anglo-Maratha War", "First Anglo-Maratha War", "Third Anglo-Mysore War", "Revolt of 1857"],
    correct: "1",
    exptext: "✅ Lord Lake occupied Delhi in 1803 during the Second Anglo-Maratha War. 📌 Second war, year 1803. ❌ The Revolt of 1857 is wrong because it came fifty-four years later."
  },
  21: {
    type: "concept", icon: "⏱️", accent: "#ec4899", pauseTimer: true,
    title: "2-Minute Revision",
    html: `
      <p class="cp-lead">Read this table slowly once before the exam. <u>Each row is one fact that exams like to ask.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/13.png" alt="Humayun's Tomb Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Aurangzeb's three sons</td><td>Muazzam (Kabul), Azam (Gujarat) and Kambakhsh (Bijapur)</td></tr><tr><td>Battle of Jajau</td><td>June 1707, between Agra and Dholpur</td></tr><tr><td>Sayyid Brothers' posts</td><td>Abdullah Khan was the wazir, and Hussain Ali was the Mir Bakshi</td></tr><tr><td>Four emperors the Sayyids made</td><td>Farrukhsiyar, Rafi-ud-Darajat, Rafi-ud-Daula and Muhammad Shah</td></tr><tr><td>Emperor when the Sayyids were murdered</td><td>Muhammad Shah</td></tr><tr><td>Break-away states</td><td>Bengal under Murshid Quli Khan, Awadh under Saadat Khan, Hyderabad under Nizam-ul-Mulk, and Bharatpur under Choodaman and Badan Singh</td></tr><tr><td>Dates of the successor states</td><td>Bengal around 1717, Awadh in 1722 (Burhan-ul-Mulk), and Hyderabad in 1724 (Asaf Jah)</td></tr><tr><td>Abdali first invaded</td><td>1748</td></tr><tr><td>Third Battle of Panipat</td><td>14 January 1761 against the Marathas, in the reign of Shah Alam II</td></tr><tr><td>Shah Alam II's real name</td><td>Ali Gauhar, son of Alamgir II, who was declared emperor in Bihar</td></tr><tr><td>Allies at Buxar</td><td>Mir Qasim of Bengal and Shuja-ud-Daula of Awadh</td></tr><tr><td>Longest-reigning Later Mughal</td><td>Muhammad Shah Rangeela</td></tr><tr><td>Shahjahan III (1758 to 1759)</td><td>The grandson of Bahadur Shah I</td></tr><tr><td>Governor of Malwa</td><td>Jai Singh of Amber (Amer), known as Mirza Raja Sawai Jai Singh</td></tr><tr><td>Qibla-e-Alam and Nawab Bahadur</td><td>Rajmata Udhambai (the queen mother) and Javed Khan (the chief of the eunuchs)</td></tr><tr><td>Title Raja given to Ram Mohan Roy</td><td>Akbar II, whose power was only in the Red Fort</td></tr><tr><td>Takht-e-Taus</td><td>The Peacock Throne, taken away with the Kohinoor</td></tr><tr><td>Zafar captured at</td><td>Humayun's Tomb, by Major Hodson, in September 1857</td></tr><tr><td>Zafar tried at</td><td>The Red Fort, in 1858</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/14.png" alt="A simple diagram with four boxes, not a map: Bengal with Murshid Quli Khan, Awadh with Saa" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Notice that the break-away states were set up by governors and chiefs who were once servants of the empire. They kept the power in their own hands when the emperors became weak.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/15.png" alt="Bahadur Shah Zafar grave dargah Yangon Myanmar photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Zafar was captured at Humayun's Tomb in September 1857, tried at the Red Fort in 1858, and exiled to Rangoon, where he died in 1862.</div>
      <div class="cp-note trap">Do not mix up Hodson and Lake. Major Hodson captured Zafar in 1857, while Lord Lake occupied Delhi in 1803.</div>
    `
  },
  22: {
    questext: "Bahadur Shah II Zafar was captured at Humayun's Tomb in September 1857 by whom?",
    options: ["Lord Lake", "Major Hodson", "Robert Clive", "Imad-ul-Mulk"],
    correct: "2",
    exptext: "✅ Major Hodson captured Zafar at Humayun's Tomb, and Zafar was tried at the Red Fort in 1858. 📌 Hodson caught Zafar. ❌ Lord Lake is tempting because he took Delhi, but that was in 1803."
  },
  23: {
    questext: "Which break-away state was founded by Saadat Khan?",
    options: ["Bengal", "Hyderabad", "Awadh", "Bharatpur"],
    correct: "3",
    exptext: "✅ Saadat Khan founded Awadh around 1722. 📌 Hyderabad belongs to Nizam-ul-Mulk, and Bengal to Murshid Quli Khan. ❌ Hyderabad is wrong because it was founded by Nizam-ul-Mulk in 1724."
  },
  24: {
    questext: "Which pair of break-away state and founder is NOT correctly matched?",
    options: ["Bengal and Murshid Quli Khan", "Awadh and Saadat Khan", "Hyderabad and Nizam-ul-Mulk", "Bharatpur and Murshid Quli Khan"],
    correct: "4",
    exptext: "✅ Bharatpur was founded by Choodaman and Badan Singh, while Murshid Quli Khan ruled Bengal. 📌 Match Bengal, Awadh, Hyderabad and Bharatpur with Murshid, Saadat, Nizam and Choodaman. ❌ The other three pairs are correct."
  },
  25: {
    questext: "Ali Gauhar was the real name of which emperor?",
    options: ["Alamgir II", "Shah Alam II", "Akbar II", "Ahmad Shah Bahadur"],
    correct: "2",
    exptext: "✅ Ali Gauhar, son of Alamgir II, ruled as Shah Alam II from 1759 to 1806. 📌 Shah Alam II fought at Buxar in 1764. ❌ Alamgir II is tempting because he was the father, but the name Ali Gauhar belongs to the son."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined Peacock Throne outline, the Red Fort silhouette and a few real-looking gold coins" },
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bahadur Shah Zafar last Mughal emperor portrait photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/1.png. the last Mughal emperor, to give a face to the end of the empire",
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/2.png": { t: "fig", about: "A timeline from 1707 to 1857 with the nine main emperors in order as small boxes: Bahadur Shah I, Jahandar Shah, Farrukhsiyar, Muhammad Shah, Ahmad Shah Bahadur, Alamgir II, Shah Alam II, Akbar II, Bahadur Shah II, each with its start year." },
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/3.png": { t: "fig", about: "Three cards side by side: Bahadur Shah I is Shah-e-Bekhabar, Jahandar Shah is Lampat Murkh, Muhammad Shah is Rangeela, each card with its reign years." },
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/4.png": { t: "fig", about: "A throne in the centre with three coloured boxes around it labelled Turani, Irani and Afghan, and a separate box for the Sayyid Brothers labelled King Makers." },
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Red Fort Delhi Diwan-i-Khas hall interior photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/5.png. the royal hall where the emperor held court and the nobles gathered",
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/6.png": { t: "fig", about: "A simple flow in five boxes: Sayyid Brothers make Farrukhsiyar emperor, they remove him in 1719, they make two puppet emperors, then Muhammad Shah is crowned, and the Turani group removes the Sayyid Brothers." },
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Peacock Throne Takht-e-Taus Mughal throne illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/7.png. the famous throne that was taken away from Delhi",
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/8.png": { t: "fig", about: "A timeline with three markers: 1739 Karnal and the sack of Delhi, 1748 first invasion of Ahmed Shah Abdali, 1761 Third Battle of Panipat." },
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Third Battle of Panipat 1761 painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/9.png. the painting of the battle between Ahmed Shah Abdali and the Marathas",
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Treaty of Allahabad 1765 painting Shah Alam Robert Clive\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/10.png. the painting of Shah Alam II giving the Diwani to Robert Clive",
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/11.png": { t: "fig", about: "A chain of five boxes in order: 1739 Karnal, 1765 Treaty of Allahabad, 1772 Scindia restores Shah Alam II, 1788 Ghulam Qadir blinds him, 1803 Lord Lake occupies Delhi." },
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahadji Scindia Maratha ruler portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/12.png. the Maratha chief who restored Shah Alam II at Delhi in 1772",
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Humayun's Tomb Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/13.png. the tomb in Delhi where the last Mughal emperor was captured in 1857",
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/14.png": { t: "fig", about: "A simple diagram with four boxes, not a map: Bengal with Murshid Quli Khan, Awadh with Saadat Khan, Hyderabad with Nizam-ul-Mulk, Bharatpur with Choodaman and Badan Singh." },
  "images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bahadur Shah Zafar grave dargah Yangon Myanmar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals/15.png. the burial place of the last Mughal emperor, who died in exile in 1862"
});

/* CHANGE LOG
   - Alamgir II: reign corrected to 1754 to 1759 and year of murder corrected to 1759 (earlier given as 1758).
   - Court Factions: the line about the Turani leaders was unclear; written clearly that the Turani leaders got both Sayyid Brothers killed in the reign of Muhammad Shah.
   - Spelling made uniform: Ahmed Shah Abdali for the invader, Ahmad Shah Bahadur for the emperor.
*/
