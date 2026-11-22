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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Sayyid_and_Lodhi_Dynasties · 7 concept pages (+ overview) · 16 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "SAYYID & LODI",
      line2: "END OF SULTANATE",
      line3: "PANIPAT 1526",
      badge: "FULL CLASS",
      ribbon: "DATES • RULERS • TRAPS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Sayyid & Lodi Dynasties Full Class | Medieval India for SSC CGL",
      altTitles: ["Khizr Khan to Ibrahim Lodi in One Class", "First Battle of Panipat 1526 and End of Delhi Sultanate"],
      description: "Sayyid and Lodi dynasties close the story of the Delhi Sultanate and give many easy marks in SSC CGL, Railways and Banking exams. In this simple class we move step by step from Khizr Khan to the First Battle of Panipat.\n\n📌 IN THIS CLASS\n✅ Khizr Khan and the Sayyid rulers\n✅ Bahlol Lodi and Jaunpur\n✅ Sikandar Lodi and Agra\n✅ Ibrahim Lodi and Panipat 1526\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\nSee the chapter list below.\n\n👍 Like, share, subscribe.\n\n#SSCCGL #MedievalIndia #DelhiSultanate",
      tags: ["sayyid dynasty", "lodi dynasty", "khizr khan", "bahlol lodi", "sikandar lodi", "ibrahim lodi", "first battle of panipat", "panipat 1526", "delhi sultanate", "end of delhi sultanate", "medieval india", "ssc cgl history", "ssc cgl 2026", "general awareness", "indian history for ssc", "history mcq", "railway exam history", "banking exam gk", "static gk", "history tricks", "gaz-i-sikandari", "agra founded 1504", "babur and ibrahim lodi", "sayyid lodi full class", "competitive exams", "previous year questions", "important questions", "one shot history", ""],
      hashtags: ["SSCCGL", "MedievalIndia", "DelhiSultanate"],
      thumbText: "SAYYID + LODI",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏰 New class is live: Sayyid and Lodi Dynasties. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Sayyid Dynasty\n00:00 Bahlol Lodi\n00:00 Sikandar Lodi\n00:00 Ibrahim Lodi and Panipat",
      playlist: "Medieval India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the last two dynasties of the Delhi Sultanate, the Sayyids and the Lodis</u>. We will learn who ruled, what each ruler is famous for, and how the Sultanate ended at Panipat in 1526.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>7</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>16</b><span>Questions</span></div>
        <div class="cp-stat"><b>~30 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Sayyid Dynasty</b><br>How Khizr Khan founded the fourth dynasty in 1414, why he never took the title of Sultan, and how his successors Mubarak Shah, Muhammad Shah and Alauddin Alam Shah ruled.</li>
        <li><b>Bahlol Lodi</b><br>How the first Afghan Sultan took the throne in 1451 and won back Jaunpur.</li>
        <li><b>Sikandar Lodi</b><br>His new capital Agra, his land measure Gaz-i-Sikandari and the books of his time.</li>
        <li><b>Ibrahim Lodi and Panipat 1526</b><br>Why the last Lodi Sultan lost, how Babur won, and how the Mughal Empire began.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on Khizr Khan's title, Bahlol's coin, Sikandar's Agra and the First Battle of Panipat come again and again in SSC CGL and other exams.</div>
    `
  },
  2: {
    type: "concept", icon: "👑", accent: "#22c55e", pauseTimer: true,
    title: "Sayyid Dynasty and Khizr Khan (1414–1421)",
    html: `
      <p class="cp-lead">The <b>Sayyid dynasty</b> was the <b>fourth</b> dynasty of the Delhi Sultanate. It ruled from 1414 to 1451. <u>The word Sayyid means a person who claims to be a descendant of the Prophet.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/1.png" alt="Simple chain of four boxes: Sayyid dynasty ruled 1414 to 1451, then boxes for Khizr Khan 1" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Years</th><th>Ruler</th></tr></thead><tbody><tr><td>1414–21</td><td>Khizr Khan, the founder</td></tr><tr><td>1421–34</td><td>Mubarak Shah</td></tr><tr><td>1434–45</td><td>Muhammad Shah</td></tr><tr><td>1445–51</td><td>Alauddin Alam Shah, the last Sayyid</td></tr></tbody></table>
      <p class="cp-lead">Timur had sacked Delhi in 1398 and left the Sultanate very weak. <b>Khizr Khan</b> took Delhi in <b>1414</b> by defeating <b>Daulat Khan Lodi</b> (1413–14), the last ruler after the Tughlaqs.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/2.png" alt="Khizr Khan tomb Delhi Sayyid dynasty photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Before this he was the governor of <b>Multan</b> under Firuz Shah Tughlaq. He joined <b>Timur</b> when Timur invaded, and Timur made him governor of <b>Multan and Lahore</b>. He ruled in Timur's name and never became fully independent.</p>
      <p class="cp-lead">Khizr Khan did <b>not</b> take the title of Sultan. He called himself <b>'Raiyat-i-Aala'</b>, which means a subordinate of Timur. The <b>Khutbah</b> (the Friday prayer in which the ruler's name is read out) was read in the name of the Mongol ruler <b>Shah Rukh</b>, Timur's son and the Timurid ruler of Herat, with Khizr Khan's name added. This was a new practice.</p>
      <div class="cp-note trap">Do not call Khizr Khan a Sultan. He ruled in the name of Timur's family and used the title Raiyat-i-Aala.</div>
      <div class="cp-note exam">Remember 1414 for the start of the dynasty, the title Raiyat-i-Aala and the name of Shah Rukh in the Khutbah.</div>
    `
  },
  3: {
    questext: "Khizr Khan, the founder of the Sayyid dynasty, styled himself as",
    options: ["Sultan", "Ghazi", "Raiyat-i-Aala", "Sikander-i-Sani"],
    correct: "3",
    exptext: "✅ Khizr Khan used the title Raiyat-i-Aala, a subordinate of Timur's family. 📌 Raiyat means a subject, so he was a subject and not a king. ❌ Sultan is wrong because he never took that title."
  },
  4: {
    questext: "Khizr Khan became the ruler of Delhi in 1414 by defeating",
    options: ["Bahlol Lodi", "Daulat Khan Lodi", "Ibrahim Lodi", "Alam Khan"],
    correct: "2",
    exptext: "✅ He defeated Daulat Khan Lodi, who ruled in 1413 to 1414. 📌 Remember Khizr Khan with Daulat Khan Lodi, who held Delhi just before him. ❌ Bahlol Lodi is wrong because he came to power only in 1451."
  },
  5: {
    type: "concept", icon: "🪙", accent: "#f59e0b", pauseTimer: true,
    title: "Mubarak Shah and Muhammad Shah (1421–1445)",
    html: `
      <p class="cp-lead">The next two Sayyid rulers ruled for about twenty-four years. One is famous for his coins and city, and the other for his weakness against rebels.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/3.png" alt="Mubarakabad Yamuna Delhi Sayyid Mubarak Shah coin photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Mubarak Shah</b> (1421–34) was the son of Khizr Khan. He was the <b>first Sayyid to put his own name on coins</b>, as <b>'Muiz-ud-din Mubarak Shah'</b>. He founded the city of <b>Mubarakabad</b> on the Yamuna.</p>
      <table><thead><tr><th>Ruler</th><th>Key facts</th></tr></thead><tbody><tr><td>Mubarak Shah (1421–34)</td><td>First Sayyid to issue coins in his name; founded Mubarakabad; killed in February 1434</td></tr><tr><td>Muhammad Shah (1434–45)</td><td>Nephew of Mubarak Shah; faced invaders from Jaunpur and Malwa; saved by Bahlol Lodi</td></tr></tbody></table>
      <p class="cp-lead">He supported <b>Yahia bin Ahmad Sirhindi</b>, who wrote <b>'Tarikh-i-Mubarakshahi'</b>. This is the <b>main source for Sayyid history</b>. Mubarak Shah was killed by his own nobles in <b>February 1434</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/4.png" alt="Two boxes side by side. Left box: Mubarak Shah, first coins in his name, Mubarakabad, Tari" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Muhammad Shah</b> (1434–45) was the <b>nephew</b> of Mubarak Shah. He came to the throne with the help of <b>Sarwar ul Mulk</b>, but later tried to shake off his control through the wazir <b>Kamal ul Mulk</b>. He was attacked by <b>Ibrahim Sharki</b> of Jaunpur and <b>Mahmud Khilji</b> of Malwa. The Afghan governor <b>Bahlol Lodi</b> saved him, so he gave Bahlol the title <b>'Khan-e-Khana'</b> and called him his <b>'son'</b>. He died in <b>1445</b>.</p>
      <div class="cp-note trap">Muhammad Shah was a nephew and not a son of Mubarak Shah. The book Tarikh-i-Mubarakshahi is named after Mubarak Shah, but its writer is Yahia bin Ahmad Sirhindi.</div>
      <div class="cp-note exam">Remember the first coins of Mubarak Shah, the city Mubarakabad and the writer Sirhindi.</div>
    `
  },
  6: {
    questext: "Who was the first Sayyid ruler to put his own name on coins?",
    options: ["Khizr Khan", "Muhammad Shah", "Alauddin Alam Shah", "Mubarak Shah"],
    correct: "4",
    exptext: "✅ Mubarak Shah was the first Sayyid to put his own name on coins, as Muiz-ud-din Mubarak Shah. 📌 Mubarak Shah and Mubarakabad carry the same name. ❌ Khizr Khan is wrong because he ruled in the name of Timur's family."
  },
  7: {
    questext: "The book 'Tarikh-i-Mubarakshahi', the main source for the Sayyid period, was written by",
    options: ["Yahia bin Ahmad Sirhindi", "Ziauddin Barani", "Miyan Bhuan", "Ibn Battuta"],
    correct: "1",
    exptext: "✅ Yahia bin Ahmad Sirhindi wrote it. 📌 Sirhindi wrote about Sayyid rulers. ❌ Ziauddin Barani is wrong because he wrote about the Tughlaq period."
  },
  8: {
    questext: "Consider the following statements about the Sayyid ruler Muhammad Shah:\n1. He was the nephew of Mubarak Shah.\n2. He gave Bahlol Lodi the title Khan-e-Khana and called him his son.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Muhammad Shah was Mubarak Shah's nephew and he honoured Bahlol Lodi with this title. 📌 The Sayyid king owed his throne to Bahlol. ❌ Any option that says only one statement is correct is wrong, because both facts are true."
  },
  9: {
    type: "concept", icon: "🏁", accent: "#ef4444", pauseTimer: true,
    title: "Alauddin Alam Shah (1445–1451)",
    html: `
      <p class="cp-lead"><b>Alauddin Alam Shah</b> was the <b>last Sayyid</b> ruler. His weak rule ended the dynasty.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/5.png" alt="Badaun Uttar Pradesh old city Jama Masjid photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He was the son of Muhammad Shah. He took the title <b>'Alamshah'</b> in 1445. In <b>1447</b> he moved to <b>Badaun</b>. He preferred a quiet life there and invited <b>Bahlol Lodi</b> to Delhi.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Son of</td><td>Muhammad Shah</td></tr><tr><td>Title</td><td>Alamshah (1445)</td></tr><tr><td>Moved to</td><td>Badaun, 1447</td></tr><tr><td>Handed power to</td><td>Bahlol Lodi, April 1451</td></tr><tr><td>Died</td><td>1476 at Badaun</td></tr></tbody></table>
      <p class="cp-lead"><b>Bahlol Lodi</b> took the throne in <b>April 1451</b>. Alam Shah lived at Badaun till his death in <b>1476</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/6.png" alt="Simple flow: Weak Sayyids, then Depend on Timur's family, then Depend on Afghan nobles lik" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Sayyids were weak, since at first they were dependent on Timur's successors and later on Afghan nobles like Bahlol Lodi.</p>
      <div class="cp-note trap">Alauddin Alam Shah is not Alauddin Khilji. The first was the last Sayyid, and the second was the Khilji emperor.</div>
      <div class="cp-note exam">Remember Badaun, 1447 for the move, 1451 for the end and 1476 for his death.</div>
    `
  },
  10: {
    questext: "Where did the last Sayyid ruler, Alauddin Alam Shah, go to live after leaving Delhi?",
    options: ["Multan", "Lahore", "Sirhind", "Badaun"],
    correct: "4",
    exptext: "✅ He moved to Badaun in 1447 and lived there until 1476. 📌 Badaun and Alam Shah both are linked to the Sayyid end. ❌ Sirhind is wrong because that was the place Bahlol Lodi governed."
  },
  11: {
    type: "concept", icon: "🏹", accent: "#8b5cf6", pauseTimer: true,
    title: "Lodi Dynasty and Bahlol Lodi (1451–1489)",
    html: `
      <p class="cp-lead">The <b>Lodi dynasty</b> was the <b>first Afghan dynasty</b> of the Delhi Sultanate and also its <b>last</b>. It ruled for <b>75 years</b> (1451–1526) with three rulers: <b>Bahlol Lodi</b> (1451–89), <b>Sikandar Lodi</b> (1489–1517) and <b>Ibrahim Lodi</b> (1517–26).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/7.png" alt="Three boxes in a row with the years: Bahlol 1451-89, Sikandar 1489-1517, Ibrahim 1517-26, " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Afghans had joined the Sultanate army in large numbers from the later 13th century. Before he became Sultan, <b>Bahlol Lodi</b> was the governor of <b>Sirhind</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Founder</td><td>Bahlol Lodi, earlier governor of Sirhind</td></tr><tr><td>Greatest success</td><td>Defeated Hussain Shah Sharqi and re-annexed Jaunpur</td></tr><tr><td>Ruler of Jaunpur after that</td><td>His son Barbak Lodi</td></tr><tr><td>Coin</td><td>Silver 'Bahloli'</td></tr><tr><td>Last campaign</td><td>1486–87 against Rai Karna (Kirtidev) of Gwalior</td></tr><tr><td>Death</td><td>July 1489</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/8.png" alt="Bahloli silver coin Bahlol Lodi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His greatest success was the defeat of <b>Hussain Shah Sharqi</b>, the last Sharqi ruler of <b>Jaunpur</b>. He re-annexed Jaunpur and made his son <b>Barbak Lodi</b> its ruler. He issued the silver coin <b>'Bahloli'</b>.</p>
      <p class="cp-lead">In <b>1486–87</b> he defeated <b>Rai Karna (Kirtidev)</b> of <b>Gwalior</b>, his last campaign. He fell ill on the way back and died in <b>July 1489</b>. He treated Afghan nobles as equals and called them <b>'brothers'</b>. The nobles stayed loyal, but the Sultan's central power was limited.</p>
      <div class="cp-note trap">Bahlol was the first Afghan Sultan, but Jaunpur was not his home. It was a separate Sharqi kingdom that he took.</div>
      <div class="cp-note exam">Remember Sirhind, the Bahloli coin, Hussain Shah Sharqi and the year 1451.</div>
    `
  },
  12: {
    questext: "Bahlol Lodi won back the kingdom of Jaunpur by defeating Hussain Shah Sharqi. Jaunpur was the capital of which kingdom?",
    options: ["Malwa", "Jaunpur", "Mewar", "Multan"],
    correct: "2",
    exptext: "✅ Jaunpur was the Sharqi kingdom and Bahlol re-annexed it. 📌 Hussain Shah Sharqi and Jaunpur go together. ❌ Malwa is wrong because that was ruled by Mahmud Khilji."
  },
  13: {
    questext: "The silver coin issued by Bahlol Lodi was known as",
    options: ["Tanka", "Dam", "Jital", "Bahloli"],
    correct: "4",
    exptext: "✅ The silver coin of Bahlol Lodi was called the Bahloli. 📌 The name comes from Bahlol. ❌ Tanka is wrong because it was the common silver coin of earlier Sultans."
  },
  14: {
    type: "concept", icon: "🏰", accent: "#14b8a6", pauseTimer: true,
    title: "Sikandar Lodi (1489–1517)",
    html: `
      <p class="cp-lead"><b>Sikandar Lodi</b> was the second Lodi Sultan. He is remembered for founding <b>Agra</b>, for his land measure <b>Gaz-i-Sikandari</b> and for his strict religious policy.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/9.png" alt="Lodi Gardens Bara Gumbad Shish Gumbad Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His real name was <b>Nizam Khan</b>, and his title was <b>Sikandar Shah</b>. He was the second surviving son of Bahlol. His mother was a <b>Hindu</b>, so the nobles hesitated and he took a strict orthodox Muslim stance.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Real name</td><td>Nizam Khan</td></tr><tr><td>Capital</td><td>Agra, founded 1504–1506, first Sultanate capital outside Delhi</td></tr><tr><td>Campaigns</td><td>1492 dethroned Barbak Shah, re-annexed Jaunpur; 1494 beat Hussain Shah Sharqi near Banaras</td></tr><tr><td>Land measure</td><td>Gaz-i-Sikandari</td></tr><tr><td>Pen name</td><td>Gulrukhi</td></tr><tr><td>Death</td><td>1517, throat disease</td></tr></tbody></table>
      <p class="cp-lead">He founded <b>Agra</b> between <b>1504 and 1506</b> and made it his capital. It was the <b>first Sultanate capital outside Delhi</b>. Agra Fort was rebuilt in red sandstone by Akbar in 1565. In <b>1492</b> he dethroned <b>Barbak Shah</b>, who had failed to crush revolts, and re-annexed Jaunpur. In <b>1494</b> he beat Hussain Shah Sharqi near <b>Banaras</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/10.png" alt="Timeline with four boxes: 1489 Sikandar becomes Sultan, 1492 Jaunpur re-annexed, 1494 Bana" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He introduced the land measure <b>'Gaz-i-Sikandari'</b>. He also destroyed many Hindu temples, stopped <b>Tazia</b> processions at <b>Muharram</b>, and banned women from bathing in the Yamuna or cutting hair there.</p>
      <p class="cp-lead">He wrote Persian poetry under the pen name <b>'Gulrukhi'</b>. The music book <b>'Lajjat-e-Sikandershahi'</b> and the Persian Ayurveda book <b>'Farhang-e-Sikandari'</b> belong to his time. His minister <b>Miyan Bhuan</b> wrote the medical book <b>'Tibb-e-Sikandari'</b>. He died in <b>1517</b> of a throat disease. The octagonal tomb in <b>Lodi Gardens</b>, built by Ibrahim about <b>1517–18</b>, is his (<b>Bara Gumbad</b> and <b>Shish Gumbad</b> are also from the Lodi period).</p>
      <div class="cp-note trap">Gulrukhi is a pen name, not a book. The books are Lajjat-e-Sikandershahi (music), Farhang-e-Sikandari (Ayurveda in Persian) and Tibb-e-Sikandari (medicine by Miyan Bhuan).</div>
      <div class="cp-note exam">Remember Agra 1504, the Gaz-i-Sikandari, the pen name Gulrukhi and Nizam Khan as his real name.</div>
    `
  },
  15: {
    questext: "Which Sultan of Delhi founded the city of Agra in 1504?",
    options: ["Alauddin Khilji", "Bahlol Lodi", "Sikandar Lodi", "Ibrahim Lodi"],
    correct: "3",
    exptext: "✅ Sikandar Lodi founded Agra and made it his capital. 📌 Sikandar and Agra both start with an A sound in memory. ❌ Bahlol Lodi is wrong because he ruled from Delhi."
  },
  16: {
    questext: "Gulrukhi, linked with Sikandar Lodi, was",
    options: ["A book on music", "A pen name", "A land measure", "A tax"],
    correct: "2",
    exptext: "✅ Gulrukhi was the pen name under which Sikandar wrote Persian poems. 📌 Gul means flower, a poet's name. ❌ A book on music is wrong because that book is Lajjat-e-Sikandershahi."
  },
  17: {
    questext: "The land measure of the Lodi period was known as",
    options: ["Gaz-i-Sikandari", "Masahat", "Dag", "Chehra"],
    correct: "1",
    exptext: "✅ The land measure introduced by Sikandar Lodi was Gaz-i-Sikandari. 📌 Gaz means yard and Sikandari means of Sikandar. ❌ Masahat is wrong because it was the land measurement of Alauddin Khilji."
  },
  18: {
    type: "concept", icon: "⚔️", accent: "#ec4899", pauseTimer: true,
    title: "Ibrahim Lodi (1517–1526)",
    html: `
      <p class="cp-lead"><b>Ibrahim Lodi</b> was the eldest son of Sikandar Lodi and the <b>last Lodi ruler</b>. His reign was full of revolts by Afghan nobles.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/11.png" alt="Rana Sanga Mewar ruler portrait photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Some Afghan chiefs set up his younger brother <b>Jalal Khan</b> as a rival ruler at <b>Jaunpur</b>. Jalal Khan was later <b>poisoned in prison</b>. In <b>1518</b> Ibrahim conquered <b>Gwalior</b>.</p>
      <table><thead><tr><th>Event</th><th>Fact</th></tr></thead><tbody><tr><td>Rival at Jaunpur</td><td>Jalal Khan, later poisoned in prison</td></tr><tr><td>1518</td><td>Gwalior conquered</td></tr><tr><td>1517–18</td><td>Battle of Khatoli: Ibrahim defeated by Rana Sanga of Mewar</td></tr><tr><td>Nobles</td><td>Distrusted; many were imprisoned or killed</td></tr></tbody></table>
      <p class="cp-lead">Proud of this success, Ibrahim invaded <b>Mewar</b> but lost the <b>Battle of Khatoli (1517–18)</b> to <b>Rana Sanga</b>. The defeat showed that his army had limits.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/12.png" alt="Simple flow: Ibrahim invades Mewar, Battle of Khatoli 1517-18, Rana Sanga wins, Ibrahim's " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He distrusted his father's chiefs. He imprisoned or killed many of them, so they turned against him and invited Babur.</p>
      <div class="cp-note trap">Khatoli (1517–18) was a loss for Ibrahim against Rana Sanga. Panipat (1526) was a loss for Ibrahim against Babur. Do not mix them.</div>
      <div class="cp-note exam">Remember Jalal Khan at Jaunpur, Gwalior 1518 and the Battle of Khatoli with Rana Sanga.</div>
    `
  },
  19: {
    questext: "In the Battle of Khatoli (1517–18), Ibrahim Lodi was defeated by",
    options: ["Babur", "Hemu", "Rana Sanga", "Sher Shah"],
    correct: "3",
    exptext: "✅ Rana Sanga of Mewar defeated Ibrahim Lodi at Khatoli. 📌 Khatoli and Sanga share the same sound. ❌ Babur is wrong because he defeated Ibrahim later at Panipat in 1526."
  },
  20: {
    questext: "Who was set up as a rival ruler against Ibrahim Lodi at Jaunpur?",
    options: ["Alam Khan", "Daulat Khan Lodi", "Barbak Lodi", "Jalal Khan"],
    correct: "4",
    exptext: "✅ Afghan chiefs made his younger brother Jalal Khan the rival ruler at Jaunpur. 📌 Jalal Khan was Ibrahim's brother. ❌ Alam Khan is wrong because he was an uncle who later invited Babur."
  },
  21: {
    type: "concept", icon: "💥", accent: "#3b82f6", pauseTimer: true,
    title: "First Battle of Panipat (1526) and the End of the Sultanate",
    html: `
      <p class="cp-lead">In <b>1526</b> the Delhi Sultanate ended and the Mughal Empire began. This happened in the <b>First Battle of Panipat</b> on <b>21 April 1526</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/13.png" alt="First Battle of Panipat 1526 Babur Ibrahim Lodi painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Daulat Khan Lodi</b>, the Punjab governor, and <b>Alam Khan</b>, Ibrahim's uncle, invited <b>Babur</b> of Kabul. Babur defeated and killed Ibrahim at Panipat. This was the <b>end of the Lodi dynasty</b>, the <b>end of the Delhi Sultanate</b> and the <b>beginning of the Mughal Empire</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Date</td><td>21 April 1526</td></tr><tr><td>Result</td><td>Babur defeated and killed Ibrahim Lodi</td></tr><tr><td>Unique fact</td><td>Ibrahim was the only Sultan of medieval India killed on the battlefield</td></tr><tr><td>Babur's tactics</td><td>Gunpowder, field artillery, tulughma (flank attack), araba (cart line)</td></tr><tr><td>Babur's gunners</td><td>Ustad Ali Quli and Mustafa Rumi</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/14.png" alt="Battle plan picture, schematic: Babur's army with a cart line labelled araba in front, gun" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Babur used <b>gunpowder and field artillery</b>. He used the <b>tulughma</b>, a flank attack, and an Ottoman-style <b>araba</b>, a line of carts with matchlock guns behind them. His gunners were <b>Ustad Ali Quli</b> and <b>Mustafa Rumi</b>.</p>
      <p class="cp-lead"><b>Ibrahim Lodi</b> is the <b>only Sultan of medieval India killed on the battlefield</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/15.png" alt="Timeline: 1451 Lodi dynasty begins, 1504 Agra founded, 1517-18 Khatoli, 21 April 1526 Pani" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Two different people had the name Daulat Khan Lodi. One was defeated by Khizr Khan in 1413–14, and the other was the Punjab governor who invited Babur in 1526.</div>
      <div class="cp-note exam">Remember 21 April 1526, Ibrahim as the only Sultan killed on the battlefield, and tulughma and araba as Babur's tactics.</div>
    `
  },
  22: {
    questext: "Which Sultan of Delhi was the only Sultan of medieval India killed on the battlefield?",
    options: ["Ghiyasuddin Tughlaq", "Mubarak Shah", "Bahlol Lodi", "Ibrahim Lodi"],
    correct: "4",
    exptext: "✅ Ibrahim Lodi was killed at the First Battle of Panipat in 1526. 📌 The last Sultan fell in the last battle of the Sultanate. ❌ Ghiyasuddin Tughlaq is wrong because he died when a pavilion fell on him."
  },
  23: {
    questext: "Babur used a flank attack called tulughma in the First Battle of Panipat. Which of these was another part of his tactics?",
    options: ["Elephant charge", "Araba, a line of carts", "Fort siege", "Cavalry only"],
    correct: "2",
    exptext: "✅ Babur used the araba, a line of carts, with matchlock guns behind it. 📌 Cart line plus flank attack. ❌ Elephant charge is wrong because that was an old method used by Indian armies."
  },
  24: {
    questext: "Consider the following statements about the people named Daulat Khan Lodi:\n1. A Daulat Khan Lodi invited Babur as Punjab governor in 1526.\n2. He is the same person who was defeated by Khizr Khan in 1414.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because the Punjab governor invited Babur. 📌 There were two persons with the same name. ❌ Statement 2 is wrong because the Daulat Khan Lodi of 1413 to 1414 was a different person."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gold-lined octagonal Lodi-style tomb, an old silver coin and a crossed sword and matchlock" },
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/1.png": { t: "fig", about: "Simple chain of four boxes: Sayyid dynasty ruled 1414 to 1451, then boxes for Khizr Khan 1414-21, Mubarak Shah 1421-34, Muhammad Shah 1434-45, Alauddin Alam Shah 1445-51." },
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Khizr Khan tomb Delhi Sayyid dynasty photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/2.png. the tomb or a picture linked to the Sayyid rulers of Delhi",
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mubarakabad Yamuna Delhi Sayyid Mubarak Shah coin photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/3.png. a coin of Mubarak Shah or a view of the Yamuna bank near Delhi",
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/4.png": { t: "fig", about: "Two boxes side by side. Left box: Mubarak Shah, first coins in his name, Mubarakabad, Tarikh-i-Mubarakshahi. Right box: Muhammad Shah, nephew, two invaders, saved by Bahlol." },
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Badaun Uttar Pradesh old city Jama Masjid photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/5.png. a view of Badaun, where Alam Shah lived",
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/6.png": { t: "fig", about: "Simple flow: Weak Sayyids, then Depend on Timur's family, then Depend on Afghan nobles like Bahlol Lodi, then Bahlol takes throne April 1451." },
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/7.png": { t: "fig", about: "Three boxes in a row with the years: Bahlol 1451-89, Sikandar 1489-1517, Ibrahim 1517-26, and above them a bar labelled Lodi dynasty, 75 years, 3 rulers." },
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bahloli silver coin Bahlol Lodi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/8.png. the silver Bahloli coin",
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lodi Gardens Bara Gumbad Shish Gumbad Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/9.png. Bara Gumbad and Shish Gumbad in Lodi Gardens, Delhi",
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/10.png": { t: "fig", about: "Timeline with four boxes: 1489 Sikandar becomes Sultan, 1492 Jaunpur re-annexed, 1494 Banaras battle, 1504 Agra founded." },
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rana Sanga Mewar ruler portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/11.png. a painting of Rana Sanga of Mewar",
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/12.png": { t: "fig", about: "Simple flow: Ibrahim invades Mewar, Battle of Khatoli 1517-18, Rana Sanga wins, Ibrahim's weakness is exposed." },
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"First Battle of Panipat 1526 Babur Ibrahim Lodi painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/13.png. a painting of the First Battle of Panipat",
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/14.png": { t: "fig", about: "Battle plan picture, schematic: Babur's army with a cart line labelled araba in front, guns behind the carts, two flank groups labelled tulughma, and Ibrahim's large army facing them." },
  "images/General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties/15.png": { t: "fig", about: "Timeline: 1451 Lodi dynasty begins, 1504 Agra founded, 1517-18 Khatoli, 21 April 1526 Panipat, then Mughal Empire begins." }
});

/* CHANGE LOG
   - Short forms such as c. and etc. were written in full.
   - Daulat Khan Lodi who lost to Khizr Khan (1413–14) and Daulat Khan Lodi, governor of Punjab, who invited Babur are kept as two different persons.
*/
