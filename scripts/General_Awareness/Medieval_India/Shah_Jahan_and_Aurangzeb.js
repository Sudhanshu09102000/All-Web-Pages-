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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Shah_Jahan_and_Aurangzeb · 14 concept pages (+ overview) · 50 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Shah Jahan and Aurangzeb",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/thumbnail.png",
      banner: "SSC CGL 2026",
      line1: "SHAH JAHAN",
      line2: "AURANGZEB",
      line3: "MEDIEVAL INDIA",
      badge: "FULL CLASS",
      ribbon: "REVOLTS • SUCCESSION • DECCAN",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Shah Jahan & Aurangzeb Full Chapter | Medieval India for SSC CGL",
      altTitles: ["War of Succession 1657 and Aurangzeb Deccan Policy in One Class", "Shah Jahan and Aurangzeb: Dates, Battles and Tricks"],
      description: "Shah Jahan and Aurangzeb is one of the most asked chapters of Medieval India. In this full class we learn the revolts, the Deccan and Kandahar, the war of succession, the Golden Age of architecture, the Rajput policy, the Maratha wars and the Jat, Bundela and Sikh revolts, all in simple steps.\n\n📌 IN THIS CLASS\n✅ Shah Jahan: revolts, policy, court and capital\n✅ War of Succession: Dharmat, Samugarh, Khajwa, Deorai\n✅ Aurangzeb: religion, Rajputs, Deccan and Marathas\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Shah Jahan\n00:00 Major Revolts\n00:00 South India and Kandahar\n00:00 Policy, Court and Capital\n00:00 War of Succession\n00:00 Dara Shikoh and Jahanara\n00:00 Mughal Architecture\n00:00 Aurangzeb\n00:00 Rajputs\n00:00 Deccan\n00:00 Marathas\n00:00 Marathas After 1681\n00:00 Jat and Bundela Revolts\n00:00 Sikh Revolts\n\n👍 Like, share, subscribe.\n\n#MedievalIndia #SSCCGL #Mughals",
      tags: ["shah jahan and aurangzeb", "mughal empire", "medieval india", "medieval history", "ssc cgl history", "war of succession 1657", "aurangzeb deccan policy", "shivaji and aurangzeb", "taj mahal facts", "dara shikoh", "jizya 1679", "mughal architecture", "sikh gurus and mughals", "jat revolt", "bundela revolt", "treaty of purandar", "kandahar mughals", "rajput policy of aurangzeb", "history one shot", "static gk", "competitive exams history", "history tricks", "railways history", "banking history gk", "SSC CGL", "UPSC", "Shah Jahan and Aurangzeb class"],
      hashtags: ["MedievalIndia", "SSCCGL", "Mughals"],
      thumbText: "SHAH JAHAN + AURANGZEB",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📚 New class is live: Shah Jahan and Aurangzeb, the full chapter. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Shah Jahan\n00:00 Major Revolts\n00:00 South India and Kandahar\n00:00 Policy, Court and Capital\n00:00 War of Succession\n00:00 Dara Shikoh and Jahanara\n00:00 Mughal Architecture\n00:00 Aurangzeb\n00:00 Rajputs\n00:00 Deccan\n00:00 Marathas\n00:00 Marathas After 1681\n00:00 Jat and Bundela Revolts\n00:00 Sikh Revolts",
      playlist: "Medieval India — Full Chapter Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the last two great Mughal emperors, Shah Jahan and Aurangzeb</u>. This chapter is asked again and again in competitive exams, so we will learn every date, name and event slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>14</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>50</b><span>Questions</span></div>
        <div class="cp-stat"><b>~78 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Shah Jahan (1627–1658)</b><br>Who Shah Jahan was, how he became emperor, and the family he came from.</li>
        <li><b>Major Revolts</b><br>The Bundela revolt, the Afghan governor Khan-e-Jahan Lodi, the Portuguese at Hooghly and the early clashes with the Sikh Guru.</li>
        <li><b>South India and Kandahar</b><br>How Shah Jahan dealt with the three Deccan kingdoms, and how Kandahar was lost to Persia.</li>
        <li><b>Policy, Court and Capital</b><br>His religious policy, the new court customs, the great court writers and the new capital city.</li>
        <li><b>War of Succession (1657–1659)</b><br>The fight of the four brothers for the throne, battle by battle, with dates.</li>
        <li><b>Dara Shikoh and Jahanara</b><br>The thinker prince, his famous works, his sister, and the foreign travellers of the age.</li>
        <li><b>Golden Age of Mughal Architecture</b><br>The Taj Mahal, the Red Fort, the Jama Masjid and the Peacock Throne.</li>
        <li><b>Aurangzeb (1658–1707)</b><br>His life, his two coronations, his religious policy and the writers of his time.</li>
        <li><b>Rajputs</b><br>Why the quarrel with Marwar and Mewar weakened the empire.</li>
        <li><b>Deccan</b><br>The long campaigns against Bijapur and Golconda.</li>
        <li><b>Marathas</b><br>Shivaji, his battles with the Mughals and his coronation.</li>
        <li><b>Aurangzeb Against the Marathas After 1681</b><br>Sambhaji, Rajaram, Tarabai and the last years of Aurangzeb.</li>
        <li><b>Jat and Bundela Revolts</b><br>The Jat leaders and the Bundela leaders who rose against Aurangzeb.</li>
        <li><b>Sikh Revolts</b><br>Guru Teg Bahadur, Guru Gobind Singh, the Khalsa and the battles of Anandpur.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on the war of succession, the Deccan, Shivaji and the Sikh Gurus come almost every year, and the same dates and names are repeated with small changes in the options.</div>
    `
  },
  2: {
    type: "concept", icon: "👑", accent: "#0ea5e9", pauseTimer: true,
    title: "Shah Jahan (1627–1658)",
    html: `
      <p class="cp-lead"><u>Shah Jahan</u> was the fifth Mughal emperor, and his rule is remembered as the age of the most splendid Mughal buildings.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/1.png" alt="Shah Jahan Mughal emperor portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His birth name was <b>Khurram</b>. He was the son of Emperor Jahangir, who had four sons: Khusrau, Parvez, Khurram and Shahryar. Khurram was born in 1592 at Lahore, and his mother was Jagat Gosain.</p>
      <p class="cp-lead">After Jahangir died, there was a fight for the throne. Nur Jahan, the wife of Jahangir, wanted Shahryar to rule, because he was her son-in-law. Khurram defeated Shahryar and became emperor in 1628 at Agra.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Birth name</td><td>Khurram</td></tr><tr><td>Accession</td><td>1628, at Agra</td></tr><tr><td>Accession title</td><td>Abul Muzaffar Shahabuddin Muhammad Sahib Kiran-e-Sani</td></tr><tr><td>Rival defeated</td><td>Shahryar, the candidate of Nur Jahan</td></tr><tr><td>Wife</td><td>Arjumand Bano Begum, daughter of Asaf Khan</td></tr><tr><td>Famous as</td><td>Mumtaz Mahal, titled Malika-e-Zamani</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/2.png" alt="Family tree: Jahangir at the top with four sons Khusrau, Parvez, Khurram (highlighted as S" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Arjumand Bano Begum was the daughter of Asaf Khan and the niece of Nur Jahan. She was not the daughter of Nur Jahan.</div>
      <div class="cp-note exam">Sahib Kiran-e-Sani is the accession title of Shah Jahan, while Malika-e-Zamani is the title of Mumtaz Mahal.</div>
    `
  },
  3: {
    questext: "What was the birth name of the Mughal emperor Shah Jahan?",
    options: ["Khusrau", "Parvez", "Khurram", "Shahryar"],
    correct: "3",
    exptext: "✅ Shah Jahan was born as Khurram, a son of Jahangir. 📌 Khurram became Shah Jahan, the king of the world. ❌ Shahryar is wrong because he was the rival whom Nur Jahan supported."
  },
  4: {
    questext: "After the death of Jahangir, whom did Nur Jahan want to make the next emperor?",
    options: ["Khurram", "Shahryar", "Khusrau", "Parvez"],
    correct: "2",
    exptext: "✅ Nur Jahan supported Shahryar, her son-in-law. 📌 The throne was kept in the family, which was her aim. ❌ Khurram is wrong because he was the winner, who became Shah Jahan in 1628."
  },
  5: {
    questext: "Consider the following statements about Mumtaz Mahal:\n1. She was the daughter of Asaf Khan.\n2. She was the daughter of Nur Jahan.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because Mumtaz Mahal was born as Arjumand Bano Begum, daughter of Asaf Khan. 📌 She was the niece of Nur Jahan. ❌ Statement 2 is wrong because Nur Jahan was her aunt."
  },
  6: {
    type: "concept", icon: "⚔️", accent: "#ef4444", pauseTimer: true,
    title: "Major Revolts",
    html: `
      <p class="cp-lead">In the early years of Shah Jahan, several groups rose against the empire. Every revolt was crushed, but each one shows a weak point of the empire.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/3.png" alt="Orchha Fort Madhya Pradesh Bundela palace photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Revolt</th><th>Leader or target</th><th>What happened</th></tr></thead><tbody><tr><td>Bundela revolt, 1628 to 1635</td><td>Jujhar Singh</td><td>Crushed by Aurangzeb, who first demolished temples and built mosques here</td></tr><tr><td>Revolt of a governor</td><td>Khan-e-Jahan Lodi</td><td>Fled to Ahmednagar and was killed in 1631</td></tr><tr><td>Portuguese settlement</td><td>Hooghly in Bengal</td><td>Taken by the Mughals in 1632</td></tr><tr><td>Sikh clashes</td><td>Guru Hargobind</td><td>Three clashes with the Mughal army</td></tr></tbody></table>
      <p class="cp-lead"><b>Jujhar Singh</b> of Orchha surrendered in 1629 and served the Mughals for five years. In 1634 he returned to Orchha and took Chauragarh in Gondwana, killing its ruler Premnarayan. He refused to accept a jagir (a land grant) equal to this gain, so Aurangzeb was sent against him and crushed the revolt in 1635.</p>
      <p class="cp-lead"><b>Khan-e-Jahan Lodi</b> was an Afghan noble and the governor (subedar) of the Deccan. He rebelled, fled to Ahmednagar and was killed in 1631.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/4.png" alt="Simple timeline from 1628 to 1635 with four boxes: 1628 Bundela revolt begins; 1631 Khan-e" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Portuguese</b> at Hooghly held a monopoly (sole control) of the salt trade. They forced people to change their religion and looted them. Shah Jahan took Hooghly in 1632 after a long siege.</p>
      <p class="cp-lead"><b>Guru Hargobind</b>, the sixth Sikh Guru, had three clashes with the Mughals, the first in 1628. One was over a royal hawk that had strayed to the Guru, who refused to return it; it was fought near Sri Gobindpur, and the Mughal army lost. Another was over two royal horses taken for the Guru by Bidhichandra, and again the Mughal army lost.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/5.png" alt="Bandel Church Hooghly Portuguese heritage photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Jujhar Singh revolted in the time of Shah Jahan. Champat Rai and Chhatrasal belong to the time of Aurangzeb.</div>
      <div class="cp-note exam">Remember three dates: Khan-e-Jahan Lodi was killed in 1631, Hooghly was taken in 1632, and the Bundela revolt ended in 1635, which was the first victory of Aurangzeb.</div>
    `
  },
  7: {
    questext: "Who led the Bundela revolt against Shah Jahan in 1628?",
    options: ["Champat Rai", "Chhatrasal", "Premnarayan", "Jujhar Singh"],
    correct: "4",
    exptext: "✅ Jujhar Singh of Orchha led the revolt and was crushed by Aurangzeb. 📌 Think of Jujhar as the Bundela of Shah Jahan. ❌ Champat Rai is wrong because he revolted later, in 1661, against Aurangzeb."
  },
  8: {
    questext: "Shah Jahan captured the settlement of Hooghly in 1632 from which European power?",
    options: ["The Portuguese", "The Dutch", "The French", "The English"],
    correct: "1",
    exptext: "✅ The Portuguese held Hooghly, controlled the salt trade and forced conversions, so Shah Jahan took it in 1632. 📌 Portuguese and Hooghly go together. ❌ The English are wrong because they became strong in Bengal only later."
  },
  9: {
    questext: "Khan-e-Jahan Lodi, the Afghan governor of the Deccan who rebelled against Shah Jahan, was killed in which year?",
    options: ["1628", "1629", "1631", "1635"],
    correct: "3",
    exptext: "✅ He fled to Ahmednagar and was killed in 1631. 📌 The order is 1631 for Lodi, 1632 for Hooghly. ❌ 1635 is wrong because that is the year the Bundela revolt was crushed."
  },
  10: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Jujhar Singh – Bundela revolt", "Premnarayan – ruler of Orchha", "Guru Hargobind – Sixth Sikh Guru", "Khan-e-Jahan Lodi – Afghan noble of the Deccan"],
    correct: "2",
    exptext: "✅ Premnarayan was the ruler of Chauragarh in Gondwana, not of Orchha. 📌 Jujhar Singh belonged to Orchha. ❌ The other pairs are correct, so they cannot be the answer."
  },
  11: {
    type: "concept", icon: "🗺️", accent: "#14b8a6", pauseTimer: true,
    title: "South India and Kandahar",
    html: `
      <p class="cp-lead">Shah Jahan wanted to bring the three Deccan kingdoms of Ahmednagar, Bijapur and Golconda under Mughal control. In the northwest, he lost the fortress of Kandahar to Persia.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/6.png" alt="Schematic, not a map: three boxes named Ahmednagar, Bijapur and Golconda around a box name" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Kingdom</th><th>Key person</th><th>Outcome</th></tr></thead><tbody><tr><td>Ahmednagar</td><td>Murtaza Nizam Shah, who had helped Khan-e-Jahan Lodi</td><td>Attacked by Mahabat Khan in 1633, and Sultan Hussain Shah was jailed in Gwalior Fort</td></tr><tr><td>Golconda</td><td>Sheikh Abdullah Qutub Shah</td><td>Signed a treaty in 1636, and his minister Mir Jumla (Muhammad Saeed) presented the Kohinoor diamond</td></tr><tr><td>Bijapur</td><td>Its Shah, backed by Ahmednagar</td><td>Besieged by Asaf Khan, but saved by Maratha soldiers; Shah Jahan went to Daulatabad and Bijapur then submitted</td></tr></tbody></table>
      <p class="cp-lead">Ahmednagar had helped the rebel Khan-e-Jahan Lodi, so the Mughals attacked it. Bijapur had supported Ahmednagar, and Golconda finally agreed to a treaty. This is how the three kingdoms were forced to accept Mughal power.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/7.png" alt="Kohinoor diamond crown Tower of London photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Kandahar</b> passed to Persia in 1622, in the time of Jahangir. Shah Jahan won it back, but Persia took it again in 1649. Three attempts to win it back failed: two under Aurangzeb (1649 and 1652) and one under Dara Shikoh (1653). After that, Kandahar was lost to India forever.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/8.png" alt="Kandahar old city Afghanistan historic photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix up the princes. Aurangzeb tried twice to recapture Kandahar, and Dara Shikoh tried once.</div>
      <div class="cp-note exam">Remember the dates 1633 for Ahmednagar, 1636 for Golconda and Bijapur, and 1649 for the final loss of Kandahar.</div>
    `
  },
  12: {
    questext: "Which Deccan kingdom was attacked by Mahabat Khan in 1633, and its Sultan Hussain Shah was jailed in Gwalior Fort?",
    options: ["Golconda", "Bijapur", "Ahmednagar", "Berar"],
    correct: "3",
    exptext: "✅ Ahmednagar was conquered in 1633, and its Sultan Hussain Shah was jailed in Gwalior Fort. 📌 The Mughals punished it for helping Khan-e-Jahan Lodi. ❌ Bijapur is wrong because it submitted later, after Shah Jahan went to Daulatabad."
  },
  13: {
    questext: "Which minister of Golconda presented the Kohinoor diamond to Shah Jahan?",
    options: ["Asaf Khan", "Mir Jumla", "Mahabat Khan", "Jai Singh"],
    correct: "2",
    exptext: "✅ Mir Jumla, whose real name was Muhammad Saeed, served as the minister of Golconda and presented the Kohinoor. 📌 Think of Mir Jumla as the man of the diamond. ❌ Asaf Khan is wrong because he led the siege of Bijapur."
  },
  14: {
    questext: "Consider the following statements about the recapture of Kandahar:\n1. Aurangzeb led two failed attempts to recapture it.\n2. Dara Shikoh led one failed attempt to recapture it.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. Aurangzeb failed in 1649 and 1652, and Dara Shikoh failed in 1653. 📌 Two attempts for Aurangzeb, one for Dara. ❌ Choosing a single statement is wrong because both are true."
  },
  15: {
    type: "concept", icon: "🏛️", accent: "#8b5cf6", pauseTimer: true,
    title: "Policy, Court and Capital",
    html: `
      <p class="cp-lead">The rule of Shah Jahan was stricter about religious matters than the rule of Akbar. He gave up some of the customs that Akbar had started.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/9.png" alt="Two-column comparison picture: left column Akbar's customs: Sijda (prostration) and Ilahi " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Area</th><th>What Shah Jahan did</th></tr></thead><tbody><tr><td>Temples</td><td>In 1632 he ordered the demolition of temples built in the reign of Jahangir</td></tr><tr><td>Marriage</td><td>Marriage of Muslim girls to Hindus was banned</td></tr><tr><td>Court salute</td><td>Sijda (full prostration), begun in the time of Akbar, was abolished and replaced by Chahar-e-Tasleem</td></tr><tr><td>Calendar</td><td>The Hijri Samvat was adopted again in place of the Ilahi Samvat</td></tr><tr><td>Capital</td><td>Moved from Agra to a new city at Delhi called Shahjahanabad</td></tr></tbody></table>
      <p class="cp-lead"><b>Sijda</b> means lying flat on the ground before the ruler. Shah Jahan thought this was wrong for a human ruler, so he replaced it with a bowing salute called <b>Chahar-e-Tasleem</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/10.png" alt="Shahjahanabad Old Delhi Mughal city painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Many scholars lived at his court. <b>Abdul Hamid Lahori</b> was the court historian, and <b>Sadullah Khan</b> was the Diwan, the chief minister of revenue. <b>Qudsi</b> and later <b>Abukalin</b> were the court poets, and <b>Pandit Jagannath</b>, who wrote the Gangalahari, was given the title Mahakavi Rai.</p>
      <div class="cp-note trap">Both changes, the end of Sijda and the return of the Hijri Samvat, were made by Shah Jahan. Do not give one of them to Akbar.</div>
      <div class="cp-note exam">The capital Shahjahanabad was founded in 1639, and its fort, the Red Fort, was completed in 1648.</div>
    `
  },
  16: {
    questext: "Which new salute did Shah Jahan introduce in place of the Sijda?",
    options: ["Taslim", "Chahar-e-Tasleem", "Zaminbos", "Kurnish"],
    correct: "2",
    exptext: "✅ Shah Jahan abolished Sijda and brought in Chahar-e-Tasleem. 📌 Chahar means four, a bowing salute. ❌ Zaminbos is wrong because that was kissing the ground, and it is not the replacement."
  },
  17: {
    questext: "Shah Jahan brought back which calendar in place of the Ilahi Samvat of Akbar?",
    options: ["Vikram Samvat", "Saka Samvat", "Hijri Samvat", "Gregorian calendar"],
    correct: "3",
    exptext: "✅ The Hijri Samvat, the Islamic calendar, was adopted again. 📌 Hijri is linked with Islam. ❌ Vikram Samvat is wrong because it is a Hindu calendar and was not chosen."
  },
  18: {
    questext: "Who was the court historian of Shah Jahan?",
    options: ["Abdul Hamid Lahori", "Sadullah Khan", "Khafi Khan", "Mirza Muhammad Kazim"],
    correct: "1",
    exptext: "✅ Abdul Hamid Lahori was the court historian of Shah Jahan. 📌 Lahori and Shah Jahan go together. ❌ Sadullah Khan is wrong because he was the Diwan, and Khafi Khan wrote in the time of Aurangzeb."
  },
  19: {
    type: "concept", icon: "🏰", accent: "#f97316", pauseTimer: true,
    title: "War of Succession (1657–1659)",
    html: `
      <p class="cp-lead">In September 1657, Shah Jahan fell ill. His four sons, Dara Shikoh, Shuja, Aurangzeb and Murad, began a fight for the throne. This fight is called the <b>War of Succession</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/11.png" alt="Four boxes in a row for the four sons with their provinces: Dara Shikoh (eldest, favourite" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Date</th><th>Event</th><th>Result</th></tr></thead><tbody><tr><td>September 1657</td><td>Shah Jahan fell ill and wished Dara Shikoh, the eldest, to inherit</td><td>Dara Punjab, Murad Gujarat, Aurangzeb Deccan, Shuja Bengal</td></tr><tr><td>November 1657</td><td>Shuja crowned himself in Bengal and marched on Agra</td><td>Beaten by Dara</td></tr><tr><td>December 1657</td><td>Murad crowned himself in Gujarat</td><td>Joined Aurangzeb</td></tr><tr><td>April 1658</td><td>Battle of Dharmat: Aurangzeb and Murad against the army of Dara led by Jaswant Singh of Jodhpur and Qasim Khan</td><td>Dara defeated</td></tr><tr><td>May 1658</td><td>Battle of Samugarh</td><td>Dara defeated again, Agra Fort taken and Shah Jahan imprisoned</td></tr><tr><td>1658 to 1659</td><td>Aurangzeb imprisoned Murad by deceit and crowned himself at Delhi</td><td>Shuja beaten at Khajwa, near Allahabad</td></tr><tr><td>March 1659</td><td>Battle of Deorai, in the Valley of Devrai</td><td>Dara fled and was captured</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/12.png" alt="Samugarh battle Mughal painting Dara Shikoh Aurangzeb" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Why Aurangzeb won:</b> he was the most skilled commander and he moved fast. He first joined Murad, so that two armies fought together, and then he removed Murad by deceit.</p>
      <p class="cp-lead">After the war, Dara Shikoh and Murad were executed. Shuja died in unknown circumstances. Dara's son Suleman Shikoh fled to Garhwal, but he was caught and poisoned.</p>
      <p class="cp-lead">Shah Jahan was kept a prisoner in the Shah Burj of Agra Fort. He died in January 1666 and was buried in the Taj Mahal.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/13.png" alt="Shah Burj Agra Fort Musamman Burj Shah Jahan prison photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Dharmat (April 1658) and Samugarh (May 1658) were both fought against Dara. Khajwa (1659) was fought against Shuja, and Deorai (March 1659) ended with the capture of Dara.</div>
      <div class="cp-mnemonic">Remember the order of the battles by their first letters: Dharmat, Samugarh, Khajwa, Deorai spell D, S, K, D.</div>
    `
  },
  20: {
    questext: "Which battle, fought in May 1658, ended with the defeat of Dara and the capture of Agra Fort?",
    options: ["Dharmat", "Khajwa", "Deorai", "Samugarh"],
    correct: "4",
    exptext: "✅ Dara was defeated at Samugarh and Shah Jahan was then imprisoned. 📌 Samugarh was the second defeat of Dara. ❌ Dharmat is wrong because it was fought earlier, in April 1658."
  },
  21: {
    questext: "Which of the following pairs of a prince and the province he governed before the war of succession is NOT correct?",
    options: ["Dara Shikoh – Punjab", "Murad – Gujarat", "Aurangzeb – Punjab", "Shuja – Bengal"],
    correct: "3",
    exptext: "✅ Aurangzeb governed the Deccan, and Punjab was with Dara Shikoh. 📌 Remember Dara with the north and Shuja with the east. ❌ The other pairs are correct, so they cannot be the answer."
  },
  22: {
    questext: "Arrange these battles in the correct order, earliest first.",
    options: ["Dharmat, Samugarh, Khajwa, Deorai", "Samugarh, Dharmat, Deorai, Khajwa", "Dharmat, Samugarh, Deorai, Khajwa", "Khajwa, Dharmat, Samugarh, Deorai"],
    correct: "1",
    exptext: "✅ The order is Dharmat in April 1658, Samugarh in May 1658, Khajwa in 1659 and Deorai in March 1659. 📌 D, S, K, D. ❌ The third option is wrong because Khajwa came before Deorai."
  },
  23: {
    questext: "Consider the following statements about the war of succession:\n1. Jaswant Singh of Jodhpur led the army of Dara at Dharmat.\n2. Shuja was defeated at Khajwa, near Allahabad.\n3. Murad crowned himself in Gujarat.\nWhich of the statements given above are correct?",
    options: ["Only 1 and 2", "Only 2 and 3", "Only 1 and 3", "1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three statements are correct. 📌 Jodhpur fought for Dara, Khajwa was against Shuja, and Murad crowned himself in Gujarat. ❌ The other options are wrong because they leave out a true statement."
  },
  24: {
    questext: "Where was Shah Jahan kept as a prisoner until his death?",
    options: ["Lahore Fort", "Shah Burj of Agra Fort", "Red Fort of Delhi", "Allahabad Fort"],
    correct: "2",
    exptext: "✅ After Samugarh, Aurangzeb kept his father in the Shah Burj of Agra Fort. 📌 He was buried later in the Taj Mahal at Agra. ❌ The Red Fort of Delhi is wrong because that was his own palace, and he never returned to it."
  },
  25: {
    type: "concept", icon: "🕊️", accent: "#ec4899", pauseTimer: true,
    title: "Dara Shikoh and Jahanara",
    html: `
      <p class="cp-lead"><u>Dara Shikoh</u> was the eldest son of Shah Jahan, and the most educated and the most liberal of the brothers. Shah Jahan loved him and gave him the title <b>Bahadur</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/14.png" alt="Dara Shikoh Mughal prince portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Dara followed the Qadiri Sufi order, and his spiritual guide was Mullah Shah Badakshi. He wanted Hindus and Muslims to understand each other, so he studied the ideas of both religions.</p>
      <table><thead><tr><th>Work or title</th><th>What it is</th></tr></thead><tbody><tr><td>Majma-ul-Bahrain</td><td>His work that compares Hindu and Sufi ideas; the name means Meeting of Two Seas</td></tr><tr><td>Sirr-e-Akbar</td><td>His Persian translation of 52 Upanishads</td></tr><tr><td>Safinat-ul-Auliya and Sakinat-ul-Auliya</td><td>His works on the lives of Sufi saints</td></tr><tr><td>Translations</td><td>He had the Yoga Vashishtha and the Bhagavad Gita put into Persian</td></tr><tr><td>Titles</td><td>Laghu Akbar and Shah-e-Buland Iqbal</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/15.png" alt="Mind-map with Dara Shikoh in the centre, linked to: Qadiri order, Mullah Shah Badakshi, Ma" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Jahanara Begum</b>, the daughter of Shah Jahan, backed Dara in the war of succession. She never married, and she was known as the First Lady of the Empire. Aurangzeb later gave her the title Sahibat-uz-Zamani.</p>
      <p class="cp-lead">Foreign travellers also visited India in this age. <b>Jean Baptiste Tavernier</b>, a French jeweller, and <b>Francis Bernier</b>, a French physician, wrote about the Mughal court. <b>Peter Mundy</b> was an English traveller, and <b>Nicolao Manucci</b>, an Italian, wrote the Storia do Mogor and was an eyewitness of the war of succession.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/16.png" alt="Jean-Baptiste Tavernier French traveller portrait engraving" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Sirr-e-Akbar means the Greatest Secret. It has nothing to do with Emperor Akbar, and it is the Persian Upanishads of Dara Shikoh.</div>
      <div class="cp-mnemonic">Majma means meeting and Bahrain means two seas: two faiths meeting like two seas.</div>
    `
  },
  26: {
    questext: "Which work of Dara Shikoh is known as the Meeting of Two Seas?",
    options: ["Sirr-e-Akbar", "Safinat-ul-Auliya", "Majma-ul-Bahrain", "Sakinat-ul-Auliya"],
    correct: "3",
    exptext: "✅ Majma-ul-Bahrain means Meeting of Two Seas, and it compares Hindu and Sufi thought. 📌 Two seas stand for two faiths. ❌ Sirr-e-Akbar is wrong because it is the Persian translation of the Upanishads."
  },
  27: {
    questext: "Dara Shikoh was a follower of which Sufi order?",
    options: ["Chishti", "Suhrawardi", "Naqshbandi", "Qadiri"],
    correct: "4",
    exptext: "✅ Dara Shikoh followed the Qadiri order, and his guide was Mullah Shah Badakshi. 📌 Remember the pair Dara and Qadiri. ❌ Chishti is wrong because Dara did not belong to that order, even though it was popular in India."
  },
  28: {
    questext: "Consider the following statements about Jahanara Begum:\n1. She supported Dara Shikoh in the war of succession.\n2. Aurangzeb gave her the title Sahibat-uz-Zamani.\n3. She was married to a Mughal noble.\nWhich of the statements given above are correct?",
    options: ["Only 1 and 2", "Only 2 and 3", "Only 1 and 3", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 She was the First Lady of the Empire and never married. ❌ Statement 3 is wrong because Jahanara stayed unmarried for life."
  },
  29: {
    type: "concept", icon: "🕌", accent: "#a855f7", pauseTimer: true,
    title: "Golden Age of Mughal Architecture",
    html: `
      <p class="cp-lead">The rule of Shah Jahan is called the <u>golden age of Mughal architecture</u>, because he built many grand buildings in white marble and red sandstone.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/17.png" alt="Taj Mahal Agra front view photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Building</th><th>Place and facts</th></tr></thead><tbody><tr><td>Taj Mahal</td><td>Agra; begun in 1632, main building finished about 1643, whole complex about 1653; architect Ustad Ahmad Lahauri; a United Nations Educational, Scientific and Cultural Organization (UNESCO) World Heritage Site since 1983</td></tr><tr><td>Red Fort (Lal Qila)</td><td>Delhi; completed in 1648; has the Diwan-i-Khas and the Diwan-i-Am</td></tr><tr><td>Jama Masjid</td><td>Delhi; completed in 1656; the largest mosque of the Mughal age</td></tr><tr><td>Moti Masjid and Sheesh Mahal</td><td>Inside Agra Fort</td></tr><tr><td>Shahjahanabad</td><td>The new capital city at Delhi, founded in 1639</td></tr><tr><td>Peacock Throne</td><td>Takht-e-Taous, studded with the Kohinoor, made under Beg Badal Khan</td></tr></tbody></table>
      <p class="cp-lead">The Diwan-i-Am was the hall of public audience, where the emperor met the common people. The Diwan-i-Khas was the hall of private audience, for nobles and special guests.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/18.png" alt="Red Fort Delhi Lal Qila front gate photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Many of his buildings use <b>pietra dura</b>, the art of fixing small coloured stones into marble to make flowers and patterns. The Taj Mahal and the Agra Fort both show this inlay work.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/19.png" alt="Peacock Throne Takht-e-Taous Mughal painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix up the dates: Shahjahanabad was founded in 1639, the Red Fort was completed in 1648, and the Jama Masjid of Delhi was completed in 1656.</div>
      <div class="cp-note exam">The Taj Mahal was begun in 1632, the same year in which Shah Jahan ordered the demolition of new temples.</div>
    `
  },
  30: {
    questext: "Who was the architect of the Taj Mahal?",
    options: ["Ustad Ahmad Lahauri", "Abdul Hamid Lahori", "Mir Jumla", "Beg Badal Khan"],
    correct: "1",
    exptext: "✅ Ustad Ahmad Lahauri was the architect of the Taj Mahal. 📌 Lahauri comes from Lahore, his home city. ❌ Abdul Hamid Lahori is wrong because he was the court historian, and Beg Badal Khan is linked with the Peacock Throne."
  },
  31: {
    questext: "In which year was the Taj Mahal declared a World Heritage Site by the United Nations Educational, Scientific and Cultural Organization?",
    options: ["1972", "1978", "1983", "1986"],
    correct: "3",
    exptext: "✅ The Taj Mahal became a World Heritage Site in 1983. 📌 Think of 1983 as the year the world honoured the Taj. ❌ 1632 is the year the Taj Mahal was begun, not the year of this honour."
  },
  32: {
    questext: "Which city did Shah Jahan found in 1639 as his new capital?",
    options: ["Fatehpur Sikri", "Shahjahanabad", "Lahore", "Ahmedabad"],
    correct: "2",
    exptext: "✅ Shahjahanabad, the walled city of Delhi, was founded in 1639. 📌 The name itself says the city of Shah Jahan. ❌ Fatehpur Sikri is wrong because it was the capital of Akbar."
  },
  33: {
    questext: "Consider the following statements about the buildings of Shah Jahan:\n1. The Red Fort of Delhi was completed in 1648.\n2. The Moti Masjid and the Sheesh Mahal are in Agra Fort.\n3. The whole complex of the Taj Mahal was completed about 1653.\nWhich of the statements given above are correct?",
    options: ["Only 1 and 2", "Only 2 and 3", "Only 1 and 3", "1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three statements are correct. 📌 Delhi 1648, Agra Fort for the Moti Masjid, and 1653 for the Taj complex. ❌ The other options are wrong because each of them leaves out one true statement."
  },
  34: {
    type: "concept", icon: "🌙", accent: "#22c55e", pauseTimer: true,
    title: "Aurangzeb (1658–1707)",
    html: `
      <p class="cp-lead"><u>Aurangzeb</u> was the sixth Mughal emperor, and he ruled for 49 years. He was born in 1618 at Dohad, near Ujjain, to Shah Jahan and Mumtaz Mahal.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/20.png" alt="Aurangzeb Mughal emperor portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">His wife was Dilras Bano Begum, also called Rabiya Bibi, the daughter of Shahnawaz. He is the <b>only Mughal emperor who was crowned twice</b>, because he first took the crown while the fight was still going on.</p>
      <table><thead><tr><th>Event</th><th>Details</th></tr></thead><tbody><tr><td>First coronation</td><td>31 July 1658, at Delhi, after the battle of Samugarh</td></tr><tr><td>Second coronation</td><td>5 June 1659, after the battle of Deorai, when he took the title Alamgir</td></tr><tr><td>Full title</td><td>Abul Muzaffar Muhiuddin Muhammad Aurangzeb Bahadur Alamgir Padshah Ghazi</td></tr><tr><td>Death</td><td>1707, after a reign of 49 years</td></tr><tr><td>Burial</td><td>In an open grave at Khuldabad, near Aurangabad</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/21.png" alt="Aurangzeb tomb Khuldabad open grave photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Religion:</b> Aurangzeb was a strict Sunni Muslim, and he ruled by the Quran (the Sharia, the Islamic law) on the advice of the Ulema, the Muslim scholars. He banned the festival of Nowruz and favoured the idea of Dar-ul-Islam, the land under Islamic rule, over Dar-ul-Harb, the land of war.</p>
      <p class="cp-lead">Officers called <b>Muhtasib</b> watched over public morals. He revived the pilgrimage tax, brought back the jizya (the tax on non-Muslims) in 1679, demolished temples and discouraged music and the arts.</p>
      <p class="cp-lead">His reign produced the <b>Fatawa-i-Alamgiri</b>, a digest of Islamic law. The official history, the Alamgirnama by Mirza Muhammad Kazim, was stopped after the tenth year, so <b>Khafi Khan</b> wrote the Muntakhab-ul-Lubab in secret.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/22.png" alt="Timeline strip: 1658 Samugarh, first coronation on 31 July 1658 at Delhi; 1659 Deorai, sec" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The first coronation was on 31 July 1658 at Delhi, and the second was on 5 June 1659. Only Aurangzeb was crowned twice.</div>
      <div class="cp-note exam">Remember that the Alamgirnama stopped after ten years, and that Khafi Khan wrote the Muntakhab-ul-Lubab secretly.</div>
    `
  },
  35: {
    questext: "Which Mughal emperor was crowned twice?",
    options: ["Humayun", "Shah Jahan", "Jahangir", "Aurangzeb"],
    correct: "4",
    exptext: "✅ Aurangzeb was crowned on 31 July 1658 and again on 5 June 1659. 📌 Only one emperor, Aurangzeb, had two coronations. ❌ Humayun is wrong because he regained his throne, but he was not crowned twice."
  },
  36: {
    questext: "Where is Aurangzeb buried?",
    options: ["Khuldabad, near Aurangabad", "Sikandra, near Agra", "Delhi", "Lahore"],
    correct: "1",
    exptext: "✅ Aurangzeb was buried in a simple open grave at Khuldabad, near Aurangabad. 📌 He wished for a simple grave. ❌ Sikandra is wrong because that is the place of the tomb of Akbar."
  },
  37: {
    questext: "Who secretly wrote the Muntakhab-ul-Lubab in the time of Aurangzeb?",
    options: ["Mirza Muhammad Kazim", "Khafi Khan", "Abdul Hamid Lahori", "Sadullah Khan"],
    correct: "2",
    exptext: "✅ Khafi Khan wrote it in secret after the official Alamgirnama was stopped. 📌 Khafi means hidden. ❌ Mirza Muhammad Kazim is wrong because he wrote the Alamgirnama, which stopped after ten years."
  },
  38: {
    questext: "Consider the following statements about Aurangzeb:\n1. He banned the festival of Nowruz.\n2. He brought back the jizya in 1679.\n3. He abolished the Muhtasib officers who watched public morals.\nWhich of the statements given above are correct?",
    options: ["Only 1", "Only 2 and 3", "Only 1 and 2", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Nowruz banned, jizya back in 1679. ❌ Statement 3 is wrong because Muhtasib officers were appointed to watch morals, not removed."
  },
  39: {
    questext: "Aurangzeb took the title Alamgir at his second coronation, which followed which battle?",
    options: ["Samugarh", "Dharmat", "Khajwa", "Deorai"],
    correct: "4",
    exptext: "✅ The second coronation on 5 June 1659 came after the battle of Deorai. 📌 The first coronation followed Samugarh. ❌ Samugarh is wrong because it led to the first coronation, in July 1658."
  },
  40: {
    type: "concept", icon: "🛡️", accent: "#eab308", pauseTimer: true,
    title: "Rajputs",
    html: `
      <p class="cp-lead">The Rajputs had been loyal friends of the Mughals since the time of Akbar. Aurangzeb's quarrel with Marwar and Mewar turned these friends into enemies, and this became a <u>major cause of Mughal decline</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/23.png" alt="Relationship diagram: Jaswant Singh of Marwar with son Ajit Singh; Raj Singh of Mewar help" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Person</th><th>Role</th></tr></thead><tbody><tr><td>Jaswant Singh</td><td>Raja of Marwar (Jodhpur)</td></tr><tr><td>Ajit Singh</td><td>His son, who was told to convert before he could be recognised as ruler</td></tr><tr><td>Raj Singh</td><td>Ruler of Mewar, who revolted in support of Ajit Singh</td></tr><tr><td>Prince Akbar</td><td>Son of Aurangzeb, who declared himself emperor with the backing of Marwar and Mewar</td></tr></tbody></table>
      <p class="cp-lead">Ajit Singh was the young son of Raja Jaswant Singh of Marwar. Aurangzeb told him to change his religion before he would be accepted as the ruler, and the Mughal army went to Marwar. Raj Singh of Mewar then revolted for him.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/24.png" alt="Mehrangarh Fort Jodhpur Marwar photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Prince Akbar joined the Rajputs and declared himself emperor, but the revolt failed and he fled to the court of Sambhaji in 1681. In the same year, the Treaty of Udaipur was made with Jai Singh of Mewar. The jizya had already been brought back in 1679, during the Marwar campaign.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/25.png" alt="Udaipur City Palace Mewar Rajasthan photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix three treaties and dates: jizya in 1679 during the Marwar campaign, Purandar in 1665 with Shivaji, and Udaipur in 1681 with Mewar.</div>
      <div class="cp-note exam">Prince Akbar of the Rajput revolt is the same Akbar who fled to Sambhaji in 1681, and this brought Aurangzeb into the Deccan.</div>
    `
  },
  41: {
    questext: "Ajit Singh, who was told to convert before being recognised as a ruler, was the son of which Rajput ruler?",
    options: ["Jai Singh of Amber", "Raj Singh of Mewar", "Man Singh of Amber", "Jaswant Singh of Marwar"],
    correct: "4",
    exptext: "✅ Ajit Singh was the son of Raja Jaswant Singh of Marwar. 📌 Ajit belongs to Marwar, and Raj Singh helped him from Mewar. ❌ Raj Singh is wrong because he was only the helper from Mewar."
  },
  42: {
    questext: "The Treaty of Udaipur of 1681 was made with which ruler?",
    options: ["Jai Singh of Mewar", "Shivaji", "Sambhaji", "Ajit Singh"],
    correct: "1",
    exptext: "✅ The Treaty of Udaipur was made with Jai Singh of Mewar in 1681. 📌 Udaipur belongs to Mewar. ❌ Shivaji is wrong because the treaty with him was the Treaty of Purandar in 1665."
  },
  43: {
    questext: "Which son of Aurangzeb declared himself emperor with the backing of Marwar and Mewar?",
    options: ["Muazzam", "Azam", "Akbar", "Kam Bakhsh"],
    correct: "3",
    exptext: "✅ Prince Akbar declared himself emperor with the help of the Rajputs, and later fled to Sambhaji. 📌 The rebel prince had the same name as the great emperor. ❌ Muazzam is wrong because he served Aurangzeb in the Deccan."
  },
  44: {
    type: "concept", icon: "🧭", accent: "#3b82f6", pauseTimer: true,
    title: "Deccan",
    html: `
      <p class="cp-lead">In the last 26 years of his life, Aurangzeb stayed in the Deccan. These long wars ended the kingdoms of Bijapur and Golconda, but they also drained the empire of men and money.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/26.png" alt="Timeline from 1660 to 1707: 1660 to 1681 commanders send in turn; 1681 Aurangzeb leads in " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Event</th><th>Details</th></tr></thead><tbody><tr><td>1660 to 1681</td><td>Commanders sent in turn: Shaista Khan, Jai Singh, Muazzam (Shah Alam) and Bahadur Khan</td></tr><tr><td>1666</td><td>The campaign of Jai Singh against Bijapur failed, because Golconda and the Marathas helped Bijapur</td></tr><tr><td>1681</td><td>Aurangzeb himself took charge of the war</td></tr><tr><td>1685</td><td>Golconda first attacked under Muazzam and Khan-e-Jahan</td></tr><tr><td>1686</td><td>Bijapur annexed</td></tr><tr><td>1687</td><td>Golconda annexed</td></tr></tbody></table>
      <p class="cp-lead">Aurangzeb knew the Deccan well. He was the governor of the Deccan twice, from 1636 to 1644 and from 1653 to 1656. This is why the Deccan was always his main aim.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/27.png" alt="Golconda Fort Hyderabad ramparts photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Bijapur fell in 1686 and Golconda in 1687. After these conquests, the Marathas were the only strong enemy left in the south.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/28.png" alt="Gol Gumbaz Bijapur Karnataka photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">Bijapur 1686 and Golconda 1687: the alphabetical order, B before G, matches the order of the years.</div>
      <div class="cp-note trap">Do not swap the years. Bijapur was annexed in 1686, and Golconda in 1687.</div>
      <div class="cp-note exam">Aurangzeb was governor of the Deccan twice, in 1636 to 1644 and in 1653 to 1656, and he led the Deccan war in person from 1681.</div>
    `
  },
  45: {
    questext: "In which year was Bijapur annexed by Aurangzeb?",
    options: ["1685", "1687", "1681", "1686"],
    correct: "4",
    exptext: "✅ Bijapur was annexed in 1686. 📌 B for Bijapur comes before G for Golconda, which fell in 1687. ❌ 1687 is wrong because that is the year of Golconda."
  },
  46: {
    questext: "From which year did Aurangzeb lead the Deccan campaigns in person?",
    options: ["1666", "1681", "1685", "1689"],
    correct: "2",
    exptext: "✅ From 1681 Aurangzeb led the campaign himself, after Prince Akbar fled to Sambhaji. 📌 The year 1681 also brings the Treaty of Udaipur. ❌ 1685 is wrong because that is the year when Golconda was first attacked."
  },
  47: {
    questext: "Golconda was first attacked in 1685 by an army led by Khan-e-Jahan and which prince?",
    options: ["Muazzam", "Azam", "Akbar", "Kam Bakhsh"],
    correct: "1",
    exptext: "✅ Prince Muazzam, also called Shah Alam, led the attack with Khan-e-Jahan. 📌 Muazzam, also called Shah Alam, appears again in the Deccan list. ❌ Akbar is wrong because he had fled to Sambhaji in 1681."
  },
  48: {
    type: "concept", icon: "🚩", accent: "#e11d48", pauseTimer: true,
    title: "Marathas",
    html: `
      <p class="cp-lead">The conflict of the Mughals with the Marathas began with <u>Shivaji</u>, who built a new kingdom in western India. He fought Mughal generals and sultans, and in the end he was crowned a sovereign king.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/29.png" alt="Shivaji Maharaj statue Raigad Fort photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1663</td><td>Shivaji attacked Shaista Khan at Pune</td></tr><tr><td>1664</td><td>Shivaji sacked the port of Surat</td></tr><tr><td>1665</td><td>Treaty of Purandar with Jai Singh of Amber</td></tr><tr><td>1666</td><td>Called to Agra, confined, but he escaped</td></tr><tr><td>1674</td><td>Crowned Chhatrapati at Raigad</td></tr><tr><td>1680</td><td>Death of Shivaji</td></tr></tbody></table>
      <p class="cp-lead"><b>Shaista Khan</b> was the Mughal governor of the Deccan, and he was camping in Pune. Shivaji made a night attack on him in 1663. In 1664 he sacked Surat, the rich port of the Mughals.</p>
      <p class="cp-lead">Aurangzeb then sent Jai Singh of Amber. In 1665 the Treaty of Purandar was made, and Shivaji agreed to give up many forts. In 1666 he was called to Agra and confined there, but he escaped and returned home.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/30.png" alt="Timeline strip of Shivaji: 1663 Pune attack; 1664 Surat sacked; 1665 Purandar; 1666 Agra a" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In 1674 Shivaji was crowned <b>Chhatrapati</b> at Raigad, which made his kingdom a sovereign state. He died in 1680.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/31.png" alt="Raigad Fort Maharashtra ropeway view photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Treaty of Purandar was made with Jai Singh of Amber in 1665, not with Shaista Khan. Shaista Khan was attacked at Pune in 1663.</div>
      <div class="cp-note exam">Remember the order: Pune 1663, Surat 1664, Purandar 1665, Agra 1666, Raigad 1674.</div>
    `
  },
  49: {
    questext: "The Treaty of Purandar of 1665 was made between Shivaji and which person?",
    options: ["Shaista Khan", "Aurangzeb", "Jaswant Singh", "Jai Singh of Amber"],
    correct: "4",
    exptext: "✅ Aurangzeb sent Jai Singh of Amber, who made the Treaty of Purandar with Shivaji. 📌 Purandar belongs to Jai Singh. ❌ Shaista Khan is wrong because he was only attacked at Pune in 1663."
  },
  50: {
    questext: "In which year did Shivaji sack the port of Surat?",
    options: ["1663", "1664", "1665", "1674"],
    correct: "2",
    exptext: "✅ Shivaji sacked Surat in 1664. 📌 Pune 1663 is followed by Surat 1664. ❌ 1674 is wrong because that is the year of his coronation at Raigad."
  },
  51: {
    questext: "Arrange these events in the correct order, earliest first. A. Treaty of Purandar. B. Sack of Surat. C. Coronation at Raigad. D. Attack on Shaista Khan at Pune.",
    options: ["D, B, A, C", "B, D, A, C", "D, A, B, C", "A, D, B, C"],
    correct: "1",
    exptext: "✅ The order is Pune in 1663, Surat in 1664, Purandar in 1665 and Raigad in 1674. 📌 Pune, Surat, Purandar, Raigad. ❌ The second option is wrong because it puts Surat before Pune."
  },
  52: {
    questext: "Where was Shivaji crowned Chhatrapati in 1674?",
    options: ["Pune", "Torna", "Raigad", "Purandar"],
    correct: "3",
    exptext: "✅ Shivaji was crowned at Raigad in 1674. 📌 Raigad was his capital. ❌ Purandar is wrong because it is the place of the treaty of 1665."
  },
  53: {
    type: "concept", icon: "🔥", accent: "#d946ef", pauseTimer: true,
    title: "Aurangzeb Against the Marathas After 1681",
    html: `
      <p class="cp-lead">Shivaji died in 1680, but the Maratha struggle did not end. When Prince Akbar fled to the court of Sambhaji in 1681, Aurangzeb turned his army on the Marathas, after he had dealt with Bijapur and Golconda.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/32.png" alt="Timeline: 1681 Akbar at Sambhaji's court; 1689 Sambhaji killed and Sahu arrested; 1698 Jin" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1681</td><td>Prince Akbar fled to the court of Sambhaji</td></tr><tr><td>1689</td><td>Sambhaji was killed and Sahu was arrested</td></tr><tr><td>1689 to 1698</td><td>Zulfikar Khan besieged Jinji for eight years, and it fell in 1698</td></tr><tr><td>1700</td><td>Rajaram died aged 30, and Tarabai made her four-year-old son Shivaji III the successor</td></tr><tr><td>January 1706</td><td>Aurangzeb returned to Ahmednagar</td></tr><tr><td>1707</td><td>Aurangzeb died after a reign of 49 years</td></tr></tbody></table>
      <p class="cp-lead">After Sambhaji was killed, the Marathas had no single leader, but ordinary people fought the Mughals in many places. This is why it became a <b>people's war</b> under <b>Rajaram</b> and <b>Tarabai</b>.</p>
      <p class="cp-lead">Rajaram escaped from Jinji to Maharashtra, and he died in 1700. Tarabai then freed most Maratha land and raided Malwa and Gujarat, which were Mughal provinces.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/33.png" alt="Gingee Fort Tamil Nadu Jinji hill fort photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Aurangzeb returned to Ahmednagar in January 1706 and died there in 1707. The southern wars are said to have ruined the empire, and after this the Mughal decline became irreversible.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/34.png" alt="Tarabai Maratha queen statue painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Jinji was besieged for eight years and fell in 1698. Rajaram died in 1700, not in 1698.</div>
      <div class="cp-note exam">Remember the pairs: Sambhaji killed and Sahu arrested in 1689, and Tarabai ruling for her son Shivaji III.</div>
    `
  },
  54: {
    questext: "After Rajaram died in 1700, who made her four-year-old son Shivaji III the successor?",
    options: ["Tarabai", "Jijabai", "Sahu", "Yesubai"],
    correct: "1",
    exptext: "✅ Tarabai made her young son Shivaji III the successor and led the Marathas. 📌 Rajaram and Tarabai were husband and wife. ❌ Jijabai is wrong because she was the mother of Shivaji and died in 1674."
  },
  55: {
    questext: "Which Mughal commander besieged the fort of Jinji for eight years?",
    options: ["Muazzam", "Zulfikar Khan", "Shaista Khan", "Bahadur Khan"],
    correct: "2",
    exptext: "✅ Zulfikar Khan besieged Jinji, which fell in 1698. 📌 Remember the pair Zulfikar and Jinji. ❌ Shaista Khan is wrong because he was attacked by Shivaji at Pune."
  },
  56: {
    questext: "Aurangzeb died in 1707 after a reign of how many years?",
    options: ["39 years", "44 years", "52 years", "49 years"],
    correct: "4",
    exptext: "✅ Aurangzeb ruled from 1658 to 1707, which is 49 years. 📌 Subtract 1658 from 1707. ❌ 52 years is wrong because it is more than the true length of the reign."
  },
  57: {
    type: "concept", icon: "✊", accent: "#10b981", pauseTimer: true,
    title: "Jat and Bundela Revolts",
    html: `
      <p class="cp-lead">While Aurangzeb was busy in the Deccan, other groups in the north also rose against him. The most important were the Jats and the Bundelas.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/35.png" alt="Chain of Jat leaders left to right: Gokul Jat, Rajaram Jat, Chudaman, then later Surajmal " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Group</th><th>Leader</th><th>Facts</th></tr></thead><tbody><tr><td>Jats</td><td>Gokul Jat of Tilpat</td><td>The first Jat leader to revolt</td></tr><tr><td>Jats</td><td>Rajaram Jat</td><td>Killed a Mughal commander and looted the tomb of Akbar at Sikandra</td></tr><tr><td>Jats</td><td>Chudaman</td><td>Nephew of Rajaram, who was not put down because Aurangzeb was in the south</td></tr><tr><td>Bundelas</td><td>Champat Rai Bundela</td><td>Revolted in 1661</td></tr><tr><td>Bundelas</td><td>Chhatrasal</td><td>Son of Champat Rai, revolted again, made a treaty in 1705 and ruled Bundelkhand after 1707</td></tr></tbody></table>
      <p class="cp-lead">The Jats were led in turn by Gokul, Rajaram and Chudaman. Later, Surajmal made Bharatpur a strong Jat state.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/36.png" alt="Akbar tomb Sikandra Agra gateway photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Bundelas were led first by Champat Rai, who revolted in 1661. His son Chhatrasal revolted again and finally made a treaty with the Mughals in 1705. He then ruled Bundelkhand after 1707.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/37.png" alt="Chhatrasal Bundela king portrait painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not confuse Jujhar Singh and Champat Rai. Jujhar Singh revolted under Shah Jahan, and Champat Rai revolted in 1661 under Aurangzeb.</div>
      <div class="cp-note exam">Remember the Jat chain: Gokul, then Rajaram, then Chudaman, and later Surajmal of Bharatpur.</div>
    `
  },
  58: {
    questext: "Who looted the tomb of Akbar at Sikandra?",
    options: ["Gokul Jat", "Rajaram Jat", "Chudaman", "Surajmal"],
    correct: "2",
    exptext: "✅ Rajaram Jat killed a Mughal commander and looted the tomb of Akbar at Sikandra. 📌 Rajaram is the second Jat leader. ❌ Gokul is wrong because he was the first Jat leader."
  },
  59: {
    questext: "Which Bundela leader revolted in 1661 in the time of Aurangzeb?",
    options: ["Jujhar Singh", "Chhatrasal", "Champat Rai", "Premnarayan"],
    correct: "3",
    exptext: "✅ Champat Rai Bundela revolted in 1661, and his son Chhatrasal continued the fight. 📌 Champat came before Chhatrasal. ❌ Jujhar Singh is wrong because he revolted in the time of Shah Jahan."
  },
  60: {
    questext: "What is the correct order of the Jat leaders who rose against the Mughals?",
    options: ["Chudaman, Rajaram, Gokul, Surajmal", "Rajaram, Gokul, Surajmal, Chudaman", "Gokul, Chudaman, Rajaram, Surajmal", "Gokul, Rajaram, Chudaman, Surajmal"],
    correct: "4",
    exptext: "✅ The order is Gokul, Rajaram, Chudaman and then Surajmal. 📌 G, R, C, S. ❌ The third option is wrong because Chudaman was the nephew of Rajaram and came after him."
  },
  61: {
    type: "concept", icon: "✨", accent: "#84cc16", pauseTimer: true,
    title: "Sikh Revolts",
    html: `
      <p class="cp-lead">The Sikhs became a military power in the time of Aurangzeb. Each Guru of this time met a different Mughal ruler, so it is useful to learn them in order.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/38.png" alt="Gurudwara Sis Ganj Sahib Chandni Chowk Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Guru</th><th>Ruler</th><th>What happened</th></tr></thead><tbody><tr><td>Guru Hargobind, the sixth Guru</td><td>Shah Jahan</td><td>Clashed with the Mughal army in the time of Shah Jahan</td></tr><tr><td>Guru Teg Bahadur, the ninth Guru</td><td>Aurangzeb</td><td>Criticised the anti-Hindu policy, urged Kashmiri Brahmins to resist, and was killed in Delhi in November 1675</td></tr><tr><td>Guru Gobind Singh, the tenth Guru</td><td>Aurangzeb and later Bahadur Shah I</td><td>Made the Sikhs a military community and founded the Khalsa at Anandpur in 1699</td></tr></tbody></table>
      <p class="cp-lead"><b>Guru Teg Bahadur</b> was summoned to Delhi, tortured and killed. The Gurudwara Sisganj in Chandni Chowk, Delhi, stands on the place of his execution.</p>
      <p class="cp-lead"><b>Guru Gobind Singh</b> founded the Khalsa at Anandpur on Baisakhi in 1699. The first battle of Anandpur, in 1700, ended in a Mughal defeat. After the second battle, in 1704, he escaped to the Deccan. Later, Bahadur Shah I made peace with him.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/39.png" alt="Anandpur Sahib Khalsa Heritage Complex Punjab photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/40.png" alt="Timeline strip: November 1675 Guru Teg Bahadur killed; 1699 Khalsa founded at Anandpur; 17" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Guru Hargobind clashed with Shah Jahan, and Guru Teg Bahadur was executed by Aurangzeb in November 1675. Guru Gobind Singh fought at Anandpur in 1700 and 1704.</div>
      <div class="cp-mnemonic">The sixth Guru met Shah Jahan, and the ninth Guru met Aurangzeb.</div>
    `
  },
  62: {
    questext: "Which Sikh Guru was executed by Aurangzeb at the place now marked by Gurudwara Sisganj in Delhi?",
    options: ["Guru Hargobind", "Guru Arjan Dev", "Guru Teg Bahadur", "Guru Gobind Singh"],
    correct: "3",
    exptext: "✅ Guru Teg Bahadur was killed in Delhi in November 1675. 📌 Sisganj marks the place of his execution. ❌ Guru Arjan Dev is wrong because he was executed earlier, in the time of Jahangir."
  },
  63: {
    questext: "In which year did Guru Gobind Singh found the Khalsa at Anandpur?",
    options: ["1675", "1699", "1704", "1708"],
    correct: "2",
    exptext: "✅ The Khalsa was founded at Anandpur on Baisakhi in 1699. 📌 The year 1699 comes just before 1700, the first battle of Anandpur. ❌ 1675 is wrong because that is the year of the death of Guru Teg Bahadur."
  },
  64: {
    questext: "Consider the following statements about the Sikh Gurus:\n1. Guru Hargobind clashed with Shah Jahan.\n2. Guru Teg Bahadur was executed in 1699.\n3. Guru Gobind Singh fought at Anandpur in 1700 and 1704.\nWhich of the statements given above are correct?",
    options: ["Only 1 and 2", "Only 2 and 3", "Only 1 and 3", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 3 are correct. 📌 Guru Teg Bahadur was killed in November 1675, not 1699. ❌ Statement 2 is wrong because 1699 is the year of the Khalsa."
  },
  65: {
    questext: "Which Mughal ruler later made peace with Guru Gobind Singh?",
    options: ["Farrukhsiyar", "Bahadur Shah I", "Jahandar Shah", "Muhammad Shah"],
    correct: "2",
    exptext: "✅ Bahadur Shah I, the son of Aurangzeb, made peace with Guru Gobind Singh. 📌 He was the next emperor after Aurangzeb. ❌ Farrukhsiyar is wrong because he ruled later and was hostile to the Sikhs."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "the Taj Mahal in white marble, a golden Mughal crown and a gold-and-ruby Peacock Throne" },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shah Jahan Mughal emperor portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/1.png. a portrait of Shah Jahan, so the learner can recognise him",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/2.png": { t: "fig", about: "Family tree: Jahangir at the top with four sons Khusrau, Parvez, Khurram (highlighted as Shah Jahan) and Shahryar; Khurram joined by a line to Arjumand Bano Begum (Mumtaz Mahal), whose father is Asaf Khan and whose aunt is Nur Jahan." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Orchha Fort Madhya Pradesh Bundela palace photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/3.png. the fort town of Orchha, the home of the Bundela rulers",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/4.png": { t: "fig", about: "Simple timeline from 1628 to 1635 with four boxes: 1628 Bundela revolt begins; 1631 Khan-e-Jahan Lodi killed; 1632 Hooghly taken; 1635 Bundela revolt crushed." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bandel Church Hooghly Portuguese heritage photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/5.png. an old Portuguese building near Hooghly in Bengal",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/6.png": { t: "fig", about: "Schematic, not a map: three boxes named Ahmednagar, Bijapur and Golconda around a box named Mughal Empire; labels 1633 Ahmednagar attacked, 1636 Bijapur and Golconda accept Mughal rule." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kohinoor diamond crown Tower of London photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/7.png. the Kohinoor diamond, which was presented to Shah Jahan by Mir Jumla",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kandahar old city Afghanistan historic photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/8.png. the historic city of Kandahar in Afghanistan",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/9.png": { t: "fig", about: "Two-column comparison picture: left column Akbar's customs: Sijda (prostration) and Ilahi Samvat; right column Shah Jahan's changes: Chahar-e-Tasleem and Hijri Samvat; arrows from left to right." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shahjahanabad Old Delhi Mughal city painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/10.png. an old painting of the city of Shahjahanabad",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/11.png": { t: "fig", about: "Four boxes in a row for the four sons with their provinces: Dara Shikoh (eldest, favourite) - Punjab; Murad - Gujarat; Aurangzeb - Deccan; Shuja - Bengal." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Samugarh battle Mughal painting Dara Shikoh Aurangzeb\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/12.png. a Mughal painting of the battle of Samugarh",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shah Burj Agra Fort Musamman Burj Shah Jahan prison photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/13.png. the tower of Agra Fort where Shah Jahan was kept as a prisoner",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dara Shikoh Mughal prince portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/14.png. a portrait of Dara Shikoh",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/15.png": { t: "fig", about: "Mind-map with Dara Shikoh in the centre, linked to: Qadiri order, Mullah Shah Badakshi, Majma-ul-Bahrain (Meeting of Two Seas), Sirr-e-Akbar (52 Upanishads), Yoga Vashishtha, Bhagavad Gita." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jean-Baptiste Tavernier French traveller portrait engraving\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/16.png. a portrait of the French traveller Tavernier",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Taj Mahal Agra front view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/17.png. the Taj Mahal, the tomb of Mumtaz Mahal",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Red Fort Delhi Lal Qila front gate photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/18.png. the Red Fort of Delhi, built by Shah Jahan",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Peacock Throne Takht-e-Taous Mughal painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/19.png. the Peacock Throne, which Shah Jahan had made",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aurangzeb Mughal emperor portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/20.png. a portrait of Aurangzeb",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aurangzeb tomb Khuldabad open grave photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/21.png. the simple open grave of Aurangzeb at Khuldabad",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/22.png": { t: "fig", about: "Timeline strip: 1658 Samugarh, first coronation on 31 July 1658 at Delhi; 1659 Deorai, second coronation on 5 June 1659 with the title Alamgir; 1679 jizya brought back; 1707 death." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/23.png": { t: "fig", about: "Relationship diagram: Jaswant Singh of Marwar with son Ajit Singh; Raj Singh of Mewar helping Ajit Singh; Prince Akbar joining them against Aurangzeb; labels Marwar and Mewar." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mehrangarh Fort Jodhpur Marwar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/24.png. the fort of Jodhpur, the capital of Marwar",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Udaipur City Palace Mewar Rajasthan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/25.png. the City Palace of Udaipur, the capital of Mewar",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/26.png": { t: "fig", about: "Timeline from 1660 to 1707: 1660 to 1681 commanders send in turn; 1681 Aurangzeb leads in person; 1686 Bijapur annexed; 1687 Golconda annexed; 1707 death." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Golconda Fort Hyderabad ramparts photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/27.png. the fort of Golconda near Hyderabad",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gol Gumbaz Bijapur Karnataka photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/28.png. the Gol Gumbaz of Bijapur",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shivaji Maharaj statue Raigad Fort photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/29.png. a statue of Shivaji at Raigad Fort",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/30.png": { t: "fig", about: "Timeline strip of Shivaji: 1663 Pune attack; 1664 Surat sacked; 1665 Purandar; 1666 Agra and escape; 1674 coronation at Raigad; 1680 death." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Raigad Fort Maharashtra ropeway view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/31.png. the hill fort of Raigad, where Shivaji was crowned",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/32.png": { t: "fig", about: "Timeline: 1681 Akbar at Sambhaji's court; 1689 Sambhaji killed and Sahu arrested; 1698 Jinji falls; 1700 Rajaram dies; 1706 Aurangzeb at Ahmednagar; 1707 death." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gingee Fort Tamil Nadu Jinji hill fort photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/33.png. the hill fort of Jinji in Tamil Nadu",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tarabai Maratha queen statue painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/34.png. a portrait or statue of Tarabai",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/35.png": { t: "fig", about: "Chain of Jat leaders left to right: Gokul Jat, Rajaram Jat, Chudaman, then later Surajmal of Bharatpur, each in a rounded box with an arrow to the next." },
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Akbar tomb Sikandra Agra gateway photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/36.png. the tomb of Akbar at Sikandra, which Rajaram Jat looted",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chhatrasal Bundela king portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/37.png. a portrait of Chhatrasal Bundela",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gurudwara Sis Ganj Sahib Chandni Chowk Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/38.png. the Gurudwara Sis Ganj in Chandni Chowk, Delhi",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Anandpur Sahib Khalsa Heritage Complex Punjab photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/39.png. the place where the Khalsa was founded",
  "images/General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb/40.png": { t: "fig", about: "Timeline strip: November 1675 Guru Teg Bahadur killed; 1699 Khalsa founded at Anandpur; 1700 first battle of Anandpur; 1704 second battle of Anandpur." }
});

/* CHANGE LOG
   - Foreign travellers: Jean Baptiste Tavernier and Francis Bernier were French, Peter Mundy was English, and only Nicolao Manucci was Italian; the work of Manucci is titled Storia do Mogor.
   - Jahanara Begum supported Dara Shikoh and stayed with Shah Jahan in captivity; the claim that she was arrested by Aurangzeb was dropped, and the title Sahibat-uz-Zamani was kept.
   - Clarified the unclear line about Jai Singh's 1666 campaign: it failed against Bijapur because Golconda and the Marathas helped Bijapur; Bijapur was annexed in 1686.
   - Kandahar: Persia took it in 1622, Shah Jahan won it back, and Persia took it again in 1649; the three failed recapture attempts were 1649 and 1652 under Aurangzeb and 1653 under Dara Shikoh.
   - The Peacock Throne is described as made under Beg Badal Khan; spellings of Bhagavad Gita and Sikandra were standardised.
*/
