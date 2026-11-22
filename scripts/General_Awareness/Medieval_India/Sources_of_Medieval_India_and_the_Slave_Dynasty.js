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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Sources_of_Medieval_India_and_the_Slave_Dynasty · 19 concept pages (+ overview) · 56 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏰", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/thumbnail.png",
      banner: "SSC CGL 2026",
      line1: "SLAVE DYNASTY",
      line2: "MEDIEVAL INDIA",
      line3: "SOURCES + RULERS",
      badge: "FULL CLASS",
      ribbon: "BOOKS • RULERS • REFORMS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Slave Dynasty & Sources of Medieval India | SSC CGL History",
      altTitles: ["Aibak, Iltutmish, Razia, Balban in One Class", "Medieval India Sources: Book and Author Table"],
      description: "Medieval India questions are easy marks when the facts are clear. In this class we cover the sources of medieval Indian history, the five dynasties of the Delhi Sultanate, and the full Slave Dynasty from Qutbuddin Aibak to Shamsuddin Kayumars.\n\n📌 IN THIS CLASS\n✅ Foreign travellers and monuments\n✅ Book and author table\n✅ Administrative terms\n✅ Razia, Nasiruddin Mahmud and Balban\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #MedievalIndia #History",
      tags: ["slave dynasty", "medieval india", "delhi sultanate", "qutbuddin aibak", "iltutmish", "razia sultan", "balban", "sources of medieval india", "ibn battuta", "alberuni", "qutub minar", "book and author", "ssc cgl history", "ssc cgl", "static gk", "history for all exams", "railway history", "banking history", "upsc history", "medieval history tricks", "iqta system", "turkan-e-chahalgani", "mamluk dynasty", "history mcq", "crash course history", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "Medieval_India class"],
      hashtags: ["SSCCGL", "MedievalIndia", "History"],
      thumbText: "SLAVE DYNASTY + SOURCES",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏰 New class is live: Sources of Medieval India and the Slave Dynasty. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Medieval India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the sources of medieval Indian history and on the Slave Dynasty of the Delhi Sultanate</u>. We will learn who the rulers were, what they did, and which books and buildings tell us their story.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>19</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>56</b><span>Questions</span></div>
        <div class="cp-stat"><b>~94 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Sources of Medieval Indian History</b><br>Foreign travellers, monuments and the important books with their writers. You will learn who wrote what, and why examiners love this list.</li>
        <li><b>Delhi Sultanate</b><br>The five dynasties from 1206 to 1526 and the year the Sultanate ended.</li>
        <li><b>Slave (Mamluk) Dynasty</b><br>Qutbuddin Aibak, Aramshah and Iltutmish, and how a group of slave commanders built an empire.</li>
        <li><b>Key Administrative Terms</b><br>Words such as iqta, muqti, khalisa and Diwan-i-Ariz, each explained in plain language.</li>
        <li><b>Razia to the End of the Dynasty</b><br>Razia Sultan, Nasiruddin Mahmud, Balban and the last rulers, with their reforms and their mistakes.</li>
        <li><b>Practice</b><br>Exam style questions after every topic, each with a short explanation.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Staff Selection Commission papers regularly ask who wrote which book, who founded which dynasty, and which ruler introduced which reform, so these names and dates fetch sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🧳", accent: "#22c55e", pauseTimer: true,
    title: "Sources of Medieval Indian History — Foreign Travellers",
    html: `
      <p class="cp-lead">We learn medieval history from <b>three streams</b>: literary sources such as court chronicles, royal autobiographies and regional books; the writings of <b>foreign travellers</b>; and <b>monuments</b> found by archaeologists.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/1.png" alt="Three boxes joined to a centre circle labelled Medieval India: Literary sources, Foreign t" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Foreign travellers saw India with fresh eyes, so they wrote about courts, markets and customs that Indian writers took for granted.</p>
      <table><thead><tr><th>Traveller</th><th>Home land</th><th>Time in India</th><th>Key fact</th></tr></thead><tbody><tr><td>Alberuni</td><td>Central Asia (Khwarezm)</td><td>Came with Mahmud Ghaznavi</td><td>Wrote Tarikh-ul-Hind, the most famous account of eleventh-century Hindu literature, science and religion</td></tr><tr><td>Ibn Battuta</td><td>Morocco, Africa</td><td>1333 to 1342</td><td>Served as Qazi (judge) under Muhammad bin Tughlaq; wrote Kitab-ul-Rehla</td></tr><tr><td>Marco Polo</td><td>Venice, Italy</td><td>Thirteenth century</td><td>Visited the court of the Pandya king; called the Prince of Medieval Travellers</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/2.png" alt="Ibn Battuta traveller portrait illustration" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Marco Polo went to the Pandya kingdom in the far south. He did not come to the Delhi court.</div>
      <div class="cp-note exam">Match each traveller with his book: Alberuni with Tarikh-ul-Hind, and Ibn Battuta with Kitab-ul-Rehla.</div>
    `
  },
  3: {
    questext: "Which traveller from Morocco served as a Qazi under Muhammad bin Tughlaq?",
    options: ["Alberuni", "Ibn Battuta", "Marco Polo", "Abdur Razzaq"],
    correct: "2",
    exptext: "✅ Ibn Battuta stayed in India from 1333 to 1342 and served as a judge under Muhammad bin Tughlaq. 📌 Remember Battuta with Rehla, his travel book. ❌ Marco Polo is wrong because he visited only the Pandya court in the south."
  },
  4: {
    questext: "Alberuni, the writer of Tarikh-ul-Hind, came to India with which ruler?",
    options: ["Muhammad Ghori", "Babur", "Mahmud Ghaznavi", "Timur"],
    correct: "3",
    exptext: "✅ Alberuni came with Mahmud Ghaznavi and wrote about Hindu science, literature and religion. 📌 Think of Ghazni and Alberuni together. ❌ Muhammad Ghori is wrong because he lived about two centuries later."
  },
  5: {
    questext: "Consider the following statements about foreign travellers:\n1. Ibn Battuta visited India between 1333 and 1342.\n2. Marco Polo visited the court of the Delhi Sultan.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Marco Polo is linked with the Pandya kingdom. ❌ Statement 2 is wrong because Marco Polo travelled to the south, not to Delhi."
  },
  6: {
    type: "concept", icon: "🏯", accent: "#f59e0b", pauseTimer: true,
    title: "Sources of Medieval Indian History — Travellers at Vijayanagara",
    html: `
      <p class="cp-lead">The Vijayanagara empire in the south was visited by Persian and European travellers. Their accounts describe the capital city, its markets and its kings.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/3.png" alt="Hampi Vijayanagara ruins Virupaksha temple photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Traveller</th><th>Home land</th><th>Time and king</th><th>Key fact</th></tr></thead><tbody><tr><td>Niccolo de Conti</td><td>Italy</td><td>1420 to 1421, Devaraya I</td><td>Saw Vijayanagara in the earliest period</td></tr><tr><td>Abdur Razzaq</td><td>Timurid (Persian)</td><td>1442 to 1443, Devaraya II</td><td>Came as the ambassador of Shahrukh</td></tr><tr><td>Domingo Paes</td><td>Portugal</td><td>Krishnadevaraya</td><td>Gave a detailed account of Hampi and Vijayanagara</td></tr><tr><td>Fernao Nuniz</td><td>Portugal</td><td>Achyutaraya</td><td>Horse trader and historian; spent 3 years at Vijayanagara</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/4.png" alt="Horizontal timeline with four dots: 1420 Conti (Devaraya I), 1442 Razzaq (Devaraya II), Pa" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Conti and Razzaq came first, in the early fifteenth century. Paes and Nuniz came later, in the time of Krishnadevaraya and Achyutaraya.</div>
      <div class="cp-mnemonic">Conti, Razzaq, Paes, Nuniz — the order of their visits.</div>
    `
  },
  7: {
    questext: "Which traveller came to Vijayanagara in 1442 as the ambassador of Shahrukh?",
    options: ["Niccolo de Conti", "Domingo Paes", "Fernao Nuniz", "Abdur Razzaq"],
    correct: "4",
    exptext: "✅ Abdur Razzaq came in 1442 to 1443 in the time of Devaraya II. 📌 Razzaq means the Persian envoy. ❌ Conti is wrong because he came much earlier, in 1420 to 1421."
  },
  8: {
    questext: "Which Portuguese traveller was a horse trader and a historian and spent three years at Vijayanagara?",
    options: ["Fernao Nuniz", "Domingo Paes", "Niccolo de Conti", "Marco Polo"],
    correct: "1",
    exptext: "✅ Fernao Nuniz came in the time of Achyutaraya and stayed for three years. 📌 Nuniz means the horse trader. ❌ Paes is wrong because he is known for his account of Hampi in the time of Krishnadevaraya."
  },
  9: {
    type: "concept", icon: "🕌", accent: "#ef4444", pauseTimer: true,
    title: "Sources of Medieval Indian History — Monuments of the Early Sultanate",
    html: `
      <p class="cp-lead">Buildings also tell history. Early Sultanate buildings join Indian and Islamic styles, which is called the <b>Indo-Islamic style</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/5.png" alt="Qutub Minar Mehrauli Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Monument</th><th>Place</th><th>Key fact</th></tr></thead><tbody><tr><td>Quwwat-ul-Islam Mosque</td><td>Mehrauli, Delhi</td><td>Built by Aibak; the first mosque built after the Muslim conquest</td></tr><tr><td>Adhai Din Ka Jhopra</td><td>Ajmer</td><td>Built by Aibak; Indo-Islamic style</td></tr><tr><td>Qutb Minar</td><td>Mehrauli, Delhi</td><td>Begun in 1199 by Aibak; about 73 metres high</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/6.png" alt="Quwwat-ul-Islam mosque screen Qutb complex photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Qutb Minar was named in memory of the Sufi saint Qutbuddin Bakhtiyar Kaki. Iltutmish completed it, and later Firoz Shah Tughlaq, Sikandar Lodi and Major Smith repaired it.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/7.png" alt="Adhai Din Ka Jhopra Ajmer arches photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Aibak only began the Qutb Minar in 1199. Iltutmish completed it.</div>
      <div class="cp-note exam">The first mosque built in India after the Muslim conquest is Quwwat-ul-Islam at Mehrauli.</div>
    `
  },
  10: {
    questext: "Which was the first mosque built in India after the Muslim conquest?",
    options: ["Adhai Din Ka Jhopra", "Jama Masjid", "Moth ki Masjid", "Quwwat-ul-Islam"],
    correct: "4",
    exptext: "✅ Aibak built Quwwat-ul-Islam at Mehrauli, Delhi. 📌 Quwwat means the power of Islam. ❌ Adhai Din Ka Jhopra is wrong because it is at Ajmer and was built after it."
  },
  11: {
    questext: "The Qutb Minar was begun in 1199 by Aibak in memory of which Sufi saint?",
    options: ["Nizamuddin Auliya", "Qutbuddin Bakhtiyar Kaki", "Moinuddin Chishti", "Baba Farid"],
    correct: "2",
    exptext: "✅ The tower was named in memory of Qutbuddin Bakhtiyar Kaki. 📌 The tower carries the saint's name, Qutb. ❌ Moinuddin Chishti is wrong because his dargah is at Ajmer."
  },
  12: {
    questext: "Which ruler completed the Qutb Minar after Aibak began it?",
    options: ["Balban", "Iltutmish", "Firoz Shah Tughlaq", "Alauddin Khilji"],
    correct: "2",
    exptext: "✅ Iltutmish completed the tower that Aibak began. 📌 Aibak began it and Iltutmish finished it. ❌ Firoz Shah Tughlaq is wrong because he only repaired it later."
  },
  13: {
    type: "concept", icon: "🏰", accent: "#8b5cf6", pauseTimer: true,
    title: "Sources of Medieval Indian History — Monuments of Later Rulers",
    html: `
      <p class="cp-lead">Every dynasty left its own buildings. Seeing which monument belongs to which ruler helps us answer match-the-following questions.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/8.png" alt="Four columns for Khilji, Tughlaq, Lodi and Balban, each with a small box listing the monum" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler or dynasty</th><th>Monuments</th></tr></thead><tbody><tr><td>Balban</td><td>Lal Mahal</td></tr><tr><td>Alauddin Khilji</td><td>Alai Darwaza</td></tr><tr><td>Mubarak Shah Khilji</td><td>Ukha Masjid at Bayana, Rajasthan</td></tr><tr><td>Tughlaq period</td><td>Tughlaqabad Fort, Jahanpanah Nagar, Ghiyasuddin's Tomb, Kotla Firoz Shah</td></tr><tr><td>Lodi period</td><td>Sikandar Lodi's Tomb, Moth ki Masjid</td></tr></tbody></table>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/9.png" alt="Tughlaqabad Fort Delhi ruins photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/10.png" alt="Alai Darwaza Qutb complex Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-note trap">The Alai Darwaza belongs to Alauddin Khilji. Do not link it with the Slave Dynasty ruler Aibak.</div>
      <div class="cp-note tip">Remember one monument for each dynasty: Balban with Lal Mahal, Khilji with Alai Darwaza, Tughlaq with Tughlaqabad, and Lodi with Moth ki Masjid.</div>
    `
  },
  14: {
    questext: "Tughlaqabad Fort belongs to which period?",
    options: ["Khilji", "Lodi", "Tughlaq", "Sayyid"],
    correct: "3",
    exptext: "✅ Tughlaqabad Fort was built in the Tughlaq period. 📌 The name itself carries Tughlaq. ❌ Lodi is wrong because the Lodis are known for Moth ki Masjid and the tomb of Sikandar Lodi."
  },
  15: {
    questext: "Lal Mahal in Delhi is linked with which ruler?",
    options: ["Balban", "Iltutmish", "Alauddin Khilji", "Aibak"],
    correct: "1",
    exptext: "✅ Lal Mahal, the Red Palace, is linked with Balban. 📌 Lal means red and Balban begins with B for building. ❌ Alauddin Khilji is wrong because he is linked with the Alai Darwaza."
  },
  16: {
    type: "concept", icon: "📜", accent: "#14b8a6", pauseTimer: true,
    title: "Delhi Sultanate (1206–1526)",
    html: `
      <p class="cp-lead">The Delhi Sultanate lasted for <b>320 years</b> and was ruled by <b>five dynasties</b>, one after the other.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/11.png" alt="Vertical timeline with five bars: Slave 1206-1290, Khilji 1290-1320, Tughlaq 1320-1414, Sa" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Years</th><th>Dynasty</th><th>Founder</th></tr></thead><tbody><tr><td>1206 to 1290</td><td>Slave (Mamluk)</td><td>Qutbuddin Aibak</td></tr><tr><td>1290 to 1320</td><td>Khilji</td><td>Jalal-ud-din Firoz Khilji</td></tr><tr><td>1320 to 1414</td><td>Tughlaq</td><td>Ghiyasuddin Tughlaq</td></tr><tr><td>1414 to 1451</td><td>Sayyid</td><td>Khizr Khan</td></tr><tr><td>1451 to 1526</td><td>Lodi</td><td>Bahlol Lodi</td></tr></tbody></table>
      <p class="cp-lead">The Sultanate ended in 1526, when Babur defeated Ibrahim Lodi in the First Battle of Panipat. The Mughal Empire began after that.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/12.png" alt="First Battle of Panipat 1526 Babur Ibrahim Lodi painting" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Delhi Sultanate ended in 1526, but the Slave Dynasty ended much earlier, in 1290.</div>
      <div class="cp-mnemonic">Some Kings Take Strong Lands — Slave, Khilji, Tughlaq, Sayyid, Lodi.</div>
    `
  },
  17: {
    questext: "Who was the founder of the Sayyid dynasty?",
    options: ["Bahlol Lodi", "Ghiyasuddin Tughlaq", "Khizr Khan", "Jalal-ud-din Firoz Khilji"],
    correct: "3",
    exptext: "✅ Khizr Khan founded the Sayyid dynasty in 1414. 📌 Sayyid and Khizr both have a soft sound. ❌ Bahlol Lodi is wrong because he founded the Lodi dynasty, the last one."
  },
  18: {
    questext: "The Delhi Sultanate came to an end in 1526 when Babur defeated which ruler?",
    options: ["Ibrahim Lodi", "Bahlol Lodi", "Sikandar Lodi", "Mahmud Tughlaq"],
    correct: "1",
    exptext: "✅ Babur defeated Ibrahim Lodi in the First Battle of Panipat. 📌 Panipat 1526 ended the Sultanate. ❌ Bahlol Lodi is wrong because he was the founder, not the last ruler."
  },
  19: {
    questext: "Which of the following dynasties of the Delhi Sultanate is in the correct time order?",
    options: ["Slave, Tughlaq, Khilji, Sayyid, Lodi", "Khilji, Slave, Tughlaq, Lodi, Sayyid", "Slave, Khilji, Tughlaq, Sayyid, Lodi", "Slave, Khilji, Sayyid, Tughlaq, Lodi"],
    correct: "3",
    exptext: "✅ The order is Slave, Khilji, Tughlaq, Sayyid and Lodi. 📌 Use the mnemonic Some Kings Take Strong Lands. ❌ Option 4 is wrong because it puts the Sayyids before the Tughlaqs."
  },
  20: {
    type: "concept", icon: "👑", accent: "#ec4899", pauseTimer: true,
    title: "Slave (Mamluk) Dynasty — Qutbuddin Aibak",
    html: `
      <p class="cp-lead">The Slave Dynasty is also called the <b>Ilbari dynasty</b>, though not all its rulers belonged to the Ilbari tribe. It ruled from 1206 to 1290.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/13.png" alt="Tomb of Qutbuddin Aibak Lahore photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Qutbuddin Aibak was the slave and commander of Muhammad Ghori. When Ghori died in 1206, Aibak founded the dynasty and cut all ties with the Ghurid empire.</p>
      <table><thead><tr><th>Marriage</th><th>Purpose</th></tr></thead><tbody><tr><td>Married the daughter of Tajuddin Yaldoz</td><td>Friendship with the governor of Ghazni</td></tr><tr><td>Married his sister to Nasiruddin Qubacha</td><td>Friendship with the governor of Sindh and Multan</td></tr><tr><td>Married his daughter to Iltutmish</td><td>Loyalty of a strong commander</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/14.png" alt="Aibak in the centre with three arrows to Yaldoz, Qubacha and Iltutmish, each labelled with" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Aibak made Lahore his capital. He used the titles <b>Malik</b> and <b>Sipahsalar</b> and never took the title Sultan. He died in 1210 when he fell from his horse while playing Chaugan (polo), and he is buried at Lahore.</p>
      <div class="cp-note trap">Aibak is the founder of the Slave Dynasty, but Iltutmish is the real founder of the Delhi Sultanate.</div>
      <div class="cp-note exam">Aibak was called Lakh Bakhsh, the giver of lakhs, for his generosity. Hasan Nizami (Taj-ul-Masir) and Fakhruddin were patronised by him.</div>
    `
  },
  21: {
    questext: "Qutbuddin Aibak died in 1210 while playing which game?",
    options: ["Chess", "Chaugan (polo)", "Archery", "Wrestling"],
    correct: "2",
    exptext: "✅ Aibak fell from his horse during a game of Chaugan, which is polo, and died in 1210. 📌 Horse game, horse fall. ❌ Archery is wrong because no horse accident is linked with it."
  },
  22: {
    questext: "Which title did Qutbuddin Aibak never use?",
    options: ["Malik", "Sipahsalar", "Sultan", "Lakh Bakhsh"],
    correct: "3",
    exptext: "✅ Aibak never took the title Sultan; he used Malik and Sipahsalar. 📌 Commander, not king. ❌ Lakh Bakhsh is wrong because people gave it to him for his generosity."
  },
  23: {
    questext: "The capital of Qutbuddin Aibak was",
    options: ["Delhi", "Lahore", "Ghazni", "Badaun"],
    correct: "2",
    exptext: "✅ Aibak ruled from Lahore and is buried there. 📌 Iltutmish later moved the capital to Delhi. ❌ Delhi is wrong because it became the capital only under Iltutmish."
  },
  24: {
    type: "concept", icon: "⚔️", accent: "#3b82f6", pauseTimer: true,
    title: "Slave (Mamluk) Dynasty — Aramshah and the Rise of Iltutmish",
    html: `
      <p class="cp-lead">After Aibak died in 1210, the chieftains made his son <b>Aramshah</b> the ruler, but the people of Delhi did not accept him. He ruled for only <b>about 8 months</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/15.png" alt="Short timeline: 1210 Aibak dies, Aramshah rules 8 months, Iltutmish defeats him at Jud nea" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The people of Delhi invited <b>Iltutmish</b>, the governor of Badaun, to rule. He defeated Aramshah at <b>Jud</b>, near Delhi, and became the new ruler in 1211.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1210</td><td>Aibak dies; Aramshah is crowned</td></tr><tr><td>1211</td><td>Iltutmish defeats Aramshah at Jud</td></tr><tr><td>1211 to 1236</td><td>Iltutmish rules</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/16.png" alt="Qutub Minar complex Iltutmish tomb Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Aramshah was the son of Aibak, not of Iltutmish.</div>
      <div class="cp-note exam">Iltutmish was the governor of Badaun before he became the Sultan.</div>
    `
  },
  25: {
    questext: "Who defeated Aramshah at the battle of Jud?",
    options: ["Balban", "Qubacha", "Yaldoz", "Iltutmish"],
    correct: "4",
    exptext: "✅ Iltutmish, the governor of Badaun, defeated Aramshah at Jud. 📌 Jud is near Delhi, and Iltutmish took Delhi. ❌ Qubacha is wrong because he ruled Sindh and Multan."
  },
  26: {
    questext: "For how long did Aramshah rule?",
    options: ["About 8 months", "Two years", "Ten years", "Twenty years"],
    correct: "1",
    exptext: "✅ Aramshah ruled for only about eight months in 1210 to 1211. 📌 He was a weak and short-lived ruler. ❌ Two years is wrong because the people of Delhi rejected him quickly."
  },
  27: {
    type: "concept", icon: "🔱", accent: "#f97316", pauseTimer: true,
    title: "Slave (Mamluk) Dynasty — Iltutmish and His Early Wars",
    html: `
      <p class="cp-lead"><b>Shams-ud-din Iltutmish</b> was an Ilbari Turk. He was the slave of Aibak, who was the slave of Ghori, so he is called the <b>Slave of slaves</b>. He moved the capital from Lahore to Delhi.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/17.png" alt="Three linked boxes: Ghori, Aibak, Iltutmish, each with the word slave of, and the label Sl" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1215</td><td>Iltutmish defeats Yaldoz at the Battle of Tarain</td></tr><tr><td>1225</td><td>Iltutmish crushes and kills Qubacha; Bengal under Ghiyasuddin accepts his control</td></tr><tr><td>1229</td><td>Letter of investiture (Mansur) arrives from the Abbasid Caliph of Baghdad</td></tr></tbody></table>
      <p class="cp-lead">The Caliph's letter gave him the title <b>Sultan-e-Azam</b>. This made Iltutmish the <b>first legally recognised sultan</b> of the Delhi Sultanate.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/18.png" alt="Abbasid Caliph Baghdad medieval illustration" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Battle of Tarain of 1215 was fought between Iltutmish and Yaldoz. It is different from the earlier Tarain battles of Ghori and Prithviraj Chauhan.</div>
      <div class="cp-note exam">Remember the dates: 1215 Yaldoz, 1225 Qubacha, 1229 recognition from the Caliph.</div>
    `
  },
  28: {
    questext: "Who is called the first legally recognised sultan of Delhi?",
    options: ["Qutbuddin Aibak", "Balban", "Iltutmish", "Razia"],
    correct: "3",
    exptext: "✅ Iltutmish received the Caliph's letter of investiture in 1229 and became the legal sultan. 📌 Legal sultan, Iltutmish. ❌ Aibak is wrong because he used only the titles Malik and Sipahsalar."
  },
  29: {
    questext: "The Battle of Tarain of 1215 was fought between Iltutmish and",
    options: ["Prithviraj Chauhan", "Qubacha", "Yaldoz", "Aramshah"],
    correct: "3",
    exptext: "✅ Iltutmish beat Tajuddin Yaldoz in 1215. 📌 Yaldoz was the governor of Ghazni. ❌ Prithviraj Chauhan is wrong because he fought Ghori in 1191 and 1192."
  },
  30: {
    questext: "Consider the following statements about Iltutmish:\n1. He moved the capital from Lahore to Delhi.\n2. He received a letter of investiture from the Abbasid Caliph in 1229.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Capital to Delhi and legal title from the Caliph. ❌ Neither is wrong because both are well known facts of his rule."
  },
  31: {
    type: "concept", icon: "🏛️", accent: "#84cc16", pauseTimer: true,
    title: "Slave (Mamluk) Dynasty — Iltutmish and His Administration",
    html: `
      <p class="cp-lead">Iltutmish made the young Sultanate strong. He built an administration that later rulers followed.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/19.png" alt="Flow chart: Sultan, then muqti holding iqta, then army, tax collection, with Khalisa and A" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Idea</th><th>Meaning</th></tr></thead><tbody><tr><td>Turkan-e-Chahalgani</td><td>Corps of Forty: forty loyal Turkish officers who held all the high offices</td></tr><tr><td>Iqta</td><td>Land or revenue given to an officer in place of salary</td></tr><tr><td>Muqti</td><td>The holder of an iqta; he collected tax, kept the army and ruled the area</td></tr><tr><td>Tanka and jital</td><td>Silver and copper coins of the Sultanate</td></tr></tbody></table>
      <p class="cp-lead">A land that was not given as an iqta was called <b>Khalisa</b>. The Sultan's own officers, the amils, collected its revenue directly.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/20.png" alt="Iltutmish silver tanka coin photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Historian <b>Minhaj-us-Siraj</b>, the writer of Tabakat-i-Nasiri, lived at his court. His wazir was <b>Nizam-ul-Mulk Junaidi</b>. Iltutmish completed the Qutb Minar and built the reservoir Hauz-i-Sultani (also called Hauz-i-Shamsi).</p>
      <div class="cp-note trap">The Turkan-e-Chahalgani was created by Iltutmish and destroyed by Balban.</div>
      <div class="cp-note exam">Sultan Garhi (1231), built for his eldest son Nasiruddin Mahmud, is the first Islamic tomb in India. The silver tanka weighed about 175 grains.</div>
    `
  },
  32: {
    questext: "The Turkan-e-Chahalgani, the Corps of Forty, was created by",
    options: ["Balban", "Iltutmish", "Aibak", "Alauddin Khilji"],
    correct: "2",
    exptext: "✅ Iltutmish created the Corps of Forty, a group of loyal Turkish officers. 📌 Forty officers, Iltutmish. ❌ Balban is wrong because he destroyed this group."
  },
  33: {
    questext: "Which Sultan introduced the silver tanka and the copper jital?",
    options: ["Iltutmish", "Razia", "Balban", "Aibak"],
    correct: "1",
    exptext: "✅ Iltutmish introduced the silver tanka and the copper jital as the two basic coins. 📌 Tanka, silver; jital, copper. ❌ Razia is wrong because she only issued coins with her own title."
  },
  34: {
    questext: "The first Islamic tomb in India, Sultan Garhi, was built by Iltutmish for his son",
    options: ["Rukunuddin Firoz", "Bahram Shah", "Nasiruddin Mahmud", "Alauddin Masood Shah"],
    correct: "3",
    exptext: "✅ Sultan Garhi was built in 1231 for his eldest son Nasiruddin Mahmud. 📌 First tomb, first son. ❌ Rukunuddin Firoz is wrong because he was a later son who became ruler."
  },
  35: {
    type: "concept", icon: "📚", accent: "#06b6d4", pauseTimer: true,
    title: "Literary Sources — Work and Author (Sultanate Period)",
    html: `
      <p class="cp-lead">Many books of the Sultanate were written by courtiers. Exams usually ask us to match the book with its writer.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/21.png" alt="Two-column match chart: books on the left (Tarikh-ul-Hind, Taj-ul-Masir, Tabakat-i-Nasiri," style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Work</th><th>Writer and key detail</th></tr></thead><tbody><tr><td>Tarikh-ul-Hind (Kitab-ul-Hind)</td><td>Alberuni, who came with Mahmud Ghaznavi; English translation by Edward Sachau</td></tr><tr><td>Kitab-ul-Yamini</td><td>Utbi; the campaigns of Mahmud Ghaznavi</td></tr><tr><td>Chachnama</td><td>Muhammad Ali bin Abu Bakr Kufi; the Arab conquest of Sindh; translated in the time of Nasiruddin Qubacha</td></tr><tr><td>Taj-ul-Masir</td><td>Hasan Nizami; Indian events from 1192 to 1228</td></tr><tr><td>Tabakat-i-Nasiri</td><td>Minhaj-us-Siraj; the history of Ghori's conquests up to 1259 to 1260</td></tr><tr><td>Tarikh-e-Firozshahi</td><td>Ziauddin Barani; he lived in the Tughlaq period</td></tr><tr><td>Fatwa-e-Jahandari</td><td>Ziauddin Barani; a political book on statecraft</td></tr><tr><td>Futuhat-e-Firozshahi</td><td>Firoz Shah Tughlaq himself</td></tr><tr><td>Tughlaqnama</td><td>Amir Khusro; the Tughlaq dynasty</td></tr></tbody></table>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/22.png" alt="Tabakat-i-Nasiri Persian manuscript photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/23.png" alt="Alberuni Tarikh-ul-Hind manuscript photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-note trap">Barani wrote both Tarikh-e-Firozshahi and Fatwa-e-Jahandari. Futuhat-e-Firozshahi was written by Firoz Shah Tughlaq himself.</div>
      <div class="cp-note exam">Taj-ul-Masir is the writing of Hasan Nizami, who covered events from 1192 to 1228.</div>
    `
  },
  36: {
    questext: "Who wrote Tabakat-i-Nasiri?",
    options: ["Ziauddin Barani", "Hasan Nizami", "Utbi", "Minhaj-us-Siraj"],
    correct: "4",
    exptext: "✅ Minhaj-us-Siraj wrote Tabakat-i-Nasiri, which covers Ghori's conquests up to 1259 to 1260. 📌 Nasiri, Siraj; both end in an I sound. ❌ Barani is wrong because he wrote Tarikh-e-Firozshahi."
  },
  37: {
    questext: "Which of the following books was written by Hasan Nizami?",
    options: ["Taj-ul-Masir", "Kitab-ul-Yamini", "Tughlaqnama", "Chachnama"],
    correct: "1",
    exptext: "✅ Taj-ul-Masir by Hasan Nizami records events from 1192 to 1228. 📌 Taj, Hasan. ❌ Kitab-ul-Yamini is wrong because Utbi wrote it about Mahmud Ghaznavi."
  },
  38: {
    questext: "Futuhat-e-Firozshahi was written by",
    options: ["Ziauddin Barani", "Amir Khusro", "Ibn Battuta", "Firoz Shah Tughlaq"],
    correct: "4",
    exptext: "✅ Firoz Shah Tughlaq wrote Futuhat-e-Firozshahi himself. 📌 The name of the book carries the name of the writer. ❌ Barani is wrong because he wrote Tarikh-e-Firozshahi."
  },
  39: {
    questext: "Chachnama is a Persian work on the Arab conquest of",
    options: ["Gujarat", "Bengal", "Sindh", "Kashmir"],
    correct: "3",
    exptext: "✅ Chachnama tells the story of the Arab conquest of Sindh. 📌 Ch for Chach, S for Sindh. ❌ Kashmir is wrong because Kalhan wrote the chronicle of Kashmir, Rajatarangini."
  },
  40: {
    type: "concept", icon: "📖", accent: "#a855f7", pauseTimer: true,
    title: "Literary Sources — Regional and Early Mughal Works",
    html: `
      <p class="cp-lead">Writers in other regions and in the early Mughal period also left important books. Learn the writer with each book.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/24.png" alt="Two-column match chart: Rajatarangini, Prithviraj Raso, Hammir Mahakavya, Baburnama, Humay" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Work</th><th>Writer and key detail</th></tr></thead><tbody><tr><td>Rajatarangini</td><td>Kalhan; the chronicle of Kashmir's history</td></tr><tr><td>Prithviraj Raso</td><td>Chandbardai; a heroic account of Prithviraj Chauhan</td></tr><tr><td>Hammir Mahakavya</td><td>Nayanchandra Suri; about Rana Hammir of Ranthambore</td></tr><tr><td>Tuzuk-e-Babri (Baburnama)</td><td>Babur; his autobiography, written in Turkish</td></tr><tr><td>Humayunama</td><td>Gulbadan Begum, the sister of Humayun; written in Persian</td></tr><tr><td>Tarikh-e-Rashidi</td><td>Mirza Haider Dughlat; the last days of Babur, and Humayun and Sher Shah</td></tr><tr><td>Tarikh-e-Shershahi</td><td>Abbas Khan Sherwani; the reign of Sher Shah Suri</td></tr><tr><td>Tarikh-e-Farishta</td><td>Muhammad Qasim Farishta; a general history of Muslim rule</td></tr></tbody></table>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/25.png" alt="Baburnama illustrated manuscript Mughal painting photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/26.png" alt="Rajatarangini Kalhana Kashmir manuscript photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-note trap">Babur wrote in Turkish, but Humayun's sister Gulbadan Begum wrote the Humayunama in Persian.</div>
      <div class="cp-note exam">Rajatarangini by Kalhan is the best known chronicle of Kashmir.</div>
    `
  },
  41: {
    questext: "Rajatarangini, the chronicle of Kashmir, was written by",
    options: ["Kalhan", "Chandbardai", "Abul Fazal", "Barani"],
    correct: "1",
    exptext: "✅ Kalhan wrote Rajatarangini about the history of Kashmir. 📌 Kalhan, Kashmir; both start with K. ❌ Chandbardai is wrong because he wrote Prithviraj Raso."
  },
  42: {
    questext: "Which book was written by Gulbadan Begum?",
    options: ["Baburnama", "Humayunama", "Tarikh-e-Rashidi", "Tarikh-e-Shershahi"],
    correct: "2",
    exptext: "✅ Gulbadan Begum, the sister of Humayun, wrote the Humayunama in Persian. 📌 Humayun's sister, Humayunama. ❌ Baburnama is wrong because Babur wrote it himself in Turkish."
  },
  43: {
    questext: "Who wrote Tarikh-e-Shershahi?",
    options: ["Mirza Haider Dughlat", "Muhammad Qasim Farishta", "Abbas Khan Sherwani", "Khafi Khan"],
    correct: "3",
    exptext: "✅ Abbas Khan Sherwani wrote about the reign of Sher Shah Suri. 📌 Shershahi, Sherwani. ❌ Mirza Haider Dughlat is wrong because he wrote Tarikh-e-Rashidi."
  },
  44: {
    type: "concept", icon: "🗂️", accent: "#e11d48", pauseTimer: true,
    title: "Literary Sources — Akbar to Aurangzeb",
    html: `
      <p class="cp-lead">The Mughal court used many writers. The book names often include the name of the king they describe.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/27.png" alt="Timeline with four boxes: Akbar (Akbarnama, Tabakat-e-Akbari), Jahangir (Tuzuk-e-Jahangiri" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Work</th><th>Writer</th></tr></thead><tbody><tr><td>Akbar</td><td>Tabakat-e-Akbari</td><td>Khwaja Nizamuddin Ahmad</td></tr><tr><td>Akbar</td><td>Akbarnama (3 volumes)</td><td>Abul Fazal; the third volume is the Ain-e-Akbari, the book of administration</td></tr><tr><td>Jahangir</td><td>Tuzuk-e-Jahangiri</td><td>Jahangir, completed by Mutamid Khan</td></tr><tr><td>Shah Jahan</td><td>Padshahnama / Shahjahannama</td><td>Qazvini and Inayat Khan</td></tr><tr><td>Shah Jahan</td><td>Badshahnama</td><td>Abdul Hamid Lahori</td></tr><tr><td>Aurangzeb</td><td>Muntakhab-ul-Lubab</td><td>Khafi Khan</td></tr><tr><td>Aurangzeb</td><td>Alamgirnama and Maasir-e-Alamgiri</td><td>Muhammad Kazim and Saqi Mustad Khan</td></tr><tr><td>Aurangzeb</td><td>Futuhat-e-Alamgiri and Nushra-e-Dilkusha</td><td>Ishwar Das Nagar and Bhimsen</td></tr></tbody></table>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/28.png" alt="Akbarnama illustrated manuscript Abul Fazal painting photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/29.png" alt="Ain-e-Akbari manuscript Abul Fazal photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-note trap">Abul Fazal wrote the Akbarnama, but Khwaja Nizamuddin Ahmad wrote Tabakat-e-Akbari.</div>
      <div class="cp-note exam">Ain-e-Akbari is the third volume of the Akbarnama and records the administration of Akbar.</div>
    `
  },
  45: {
    questext: "Ain-e-Akbari is the third volume of the Akbarnama written by",
    options: ["Abul Fazal", "Badauni", "Khafi Khan", "Abdul Hamid Lahori"],
    correct: "1",
    exptext: "✅ Abul Fazal wrote the Akbarnama; its third volume is the Ain-e-Akbari. 📌 Fazal, Akbar. ❌ Abdul Hamid Lahori is wrong because he wrote Badshahnama on Shah Jahan."
  },
  46: {
    questext: "Badshahnama is the work of",
    options: ["Qazvini", "Abdul Hamid Lahori", "Inayat Khan", "Muhammad Kazim"],
    correct: "2",
    exptext: "✅ Abdul Hamid Lahori wrote Badshahnama about Shah Jahan's reign. 📌 Lahori, Shah Jahan. ❌ Muhammad Kazim is wrong because he wrote Alamgirnama about Aurangzeb."
  },
  47: {
    questext: "Which work is linked with the reign of Aurangzeb?",
    options: ["Tabakat-e-Akbari", "Tuzuk-e-Jahangiri", "Muntakhab-ul-Lubab", "Padshahnama"],
    correct: "3",
    exptext: "✅ Khafi Khan wrote Muntakhab-ul-Lubab about Aurangzeb's reign. 📌 Aurangzeb and Khafi Khan. ❌ Padshahnama is wrong because it belongs to Shah Jahan."
  },
  48: {
    type: "concept", icon: "🧾", accent: "#10b981", pauseTimer: true,
    title: "Key Administrative Terms — Land, Revenue and Officers",
    html: `
      <p class="cp-lead">The Sultans ruled through a group of officers and a system of land grants. Each word below has a simple meaning.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/30.png" alt="Flow: Sultan, nobles with iqta, Muqti, Amil collecting revenue, with Khalisa land shown as" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Iqta</td><td>Land revenue given to nobles or officers in place of salary</td></tr><tr><td>Muqti (Wali)</td><td>Holder of an iqta; he collected tax, kept the army and worked as commander</td></tr><tr><td>Khalisa</td><td>Land kept directly by the Sultan; amils collect its revenue</td></tr><tr><td>Amil</td><td>Collector of revenue</td></tr><tr><td>Amir</td><td>Governor of a pargana</td></tr><tr><td>Mustaufi</td><td>Auditor General</td></tr><tr><td>Khwaza or Musharaf</td><td>Accountant</td></tr><tr><td>Zakat</td><td>A religious tax on wealthy Muslims</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/31.png" alt="Medieval Delhi Sultanate court painting photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Bandagan</b> were slaves bought for military service, <b>Ulema</b> were learned theologians and jurists, and the <b>Wazir</b> was the chief minister.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/32.png" alt="Map style box: Sultan at the top, Wazir below him, then Mustaufi and Amils." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Muqti held an iqta, but khalisa was land of the Sultan himself.</div>
      <div class="cp-note exam">Turkan-e-Chahalgani was a corps of forty loyal Turkish officers under Iltutmish.</div>
    `
  },
  49: {
    questext: "Land revenue given to an officer in place of a salary was called",
    options: ["Khalisa", "Zakat", "Iqta", "Jizya"],
    correct: "3",
    exptext: "✅ An iqta was land revenue assigned to an officer instead of a salary. 📌 Iqta means assignment. ❌ Khalisa is wrong because it was land kept directly by the Sultan."
  },
  50: {
    questext: "The holder of an iqta was known as",
    options: ["Amil", "Mustaufi", "Barid", "Muqti"],
    correct: "4",
    exptext: "✅ The holder of an iqta was the muqti, who also collected tax and led the army. 📌 Muqti, iqta; both carry a q. ❌ Amil is wrong because he only collected revenue."
  },
  51: {
    questext: "Which of the following officers was the Auditor General?",
    options: ["Mustaufi", "Barid", "Amir", "Amil"],
    correct: "1",
    exptext: "✅ The mustaufi was the Auditor General of the Sultanate. 📌 Mustaufi, accounts. ❌ Barid is wrong because he was a spy."
  },
  52: {
    type: "concept", icon: "🏫", accent: "#eab308", pauseTimer: true,
    title: "Key Administrative Terms — Departments and Court Practices",
    html: `
      <p class="cp-lead">The Sultanate had separate departments, each led by an officer. Balban also added strict customs for the royal court.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/33.png" alt="Four boxes joined to the Sultan: Diwan-i-Arz (military), Diwan-i-Insha (letters), Diwan-i-" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Diwan-i-Arz</td><td>Military department, reorganised by Balban</td></tr><tr><td>Diwan-i-Insha</td><td>State letters; its head was the Dabir-i-Khas</td></tr><tr><td>Diwan-i-Risalat</td><td>Appeals and religious affairs</td></tr><tr><td>Diwan-i-Khairat</td><td>Department of charity</td></tr><tr><td>Barid-e-Mumalik</td><td>Intelligence department; its officers were called Barid</td></tr><tr><td>Amir-i-Hajib</td><td>The queen's chamberlain</td></tr><tr><td>Amira-khur</td><td>Master of the horses</td></tr><tr><td>Naib</td><td>In charge of all departments except finance</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/34.png" alt="Medieval court Persian miniature Sultan Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Balban introduced <b>Sijda</b>, bowing before the Sultan, <b>Paibos</b>, kissing the Sultan's feet, and <b>Nauroz</b>, the Persian new year festival.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/35.png" alt="Three small panels labelled Sijda (prostration), Paibos (kissing the feet), Nauroz (Persia" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Diwan-i-Arz is the military department, while Diwan-i-Insha deals with letters. The names are close, so read them with care.</div>
      <div class="cp-note exam">Balban gave Sijda, Paibos and Nauroz to the Sultanate court from Persia.</div>
    `
  },
  53: {
    questext: "Which department was in charge of military affairs in the Delhi Sultanate?",
    options: ["Diwan-i-Arz", "Diwan-i-Insha", "Diwan-i-Risalat", "Diwan-i-Khairat"],
    correct: "1",
    exptext: "✅ Diwan-i-Arz was the military department, reorganised by Balban. 📌 Arz, army. ❌ Diwan-i-Insha is wrong because it handled state letters."
  },
  54: {
    questext: "Which of the following was the Persian new year festival introduced in the court of Balban?",
    options: ["Sijda", "Paibos", "Nauroz", "Zakat"],
    correct: "3",
    exptext: "✅ Nauroz is the Persian new year festival that Balban introduced. 📌 Nauroz, new year. ❌ Sijda is wrong because it means bowing before the ruler."
  },
  55: {
    questext: "Paibos means",
    options: ["Kissing the feet of the Sultan", "Bowing before the Sultan", "A tax on land", "The queen's chamber"],
    correct: "1",
    exptext: "✅ Paibos means kissing the monarch's feet. 📌 Pai means foot. ❌ Sijda is wrong because it means falling flat before the ruler."
  },
  56: {
    type: "concept", icon: "👸", accent: "#0ea5e9", pauseTimer: true,
    title: "Razia Sultan (1236–1240) — First Female Sultan of India",
    html: `
      <p class="cp-lead">Iltutmish named his daughter <b>Razia</b> as his heir, but the Turkan-e-Chahalgani put his son <b>Rukunuddin Firoz</b> on the throne. His mother, <b>Shah Turkan</b>, a Turkish maid, ran the affairs and crushed her rivals, which caused unrest.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/36.png" alt="Razia Sultan coin Delhi Sultanate photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In 1236 Razia overthrew Rukunuddin with the support of the people of Delhi. The nobles wanted a ruler they could control, and the orthodox Muslims did not like a female ruler.</p>
      <table><thead><tr><th>Bold step</th><th>What she did</th></tr></thead><tbody><tr><td>Dress</td><td>Gave up the purdah and wore male dress</td></tr><tr><td>Army</td><td>Led the army herself</td></tr><tr><td>Appointments</td><td>Gave high posts to non-Turkish nobles</td></tr><tr><td>Favourite</td><td>Raised Jamal-ud-din Yaqut, an Abyssinian, to Amir-khur (master of the horses)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/37.png" alt="Five-box flow: Rukunuddin falls 1236, Razia rules, Yaqut made Amir-khur, nobles angry, Raz" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Her rule ended in a plot led by <b>Aitigin</b> (the Amir-i-Hajib), with <b>Malik Altunia</b>, the governor of Bhatinda, and <b>Kabir Khan</b>, the governor of Lahore.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/38.png" alt="Bhatinda Fort Qila Mubarak photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Razia married Altunia to save herself and marched on Delhi, but on <b>13 October 1240</b> her brother Bahram defeated them near <b>Kaithal</b>, and both were killed. On her coins she called herself <b>Sultan Jalalat-al-Din Raziya</b>, not Sultana.</p>
      <div class="cp-note trap">Amir-khur, master of the horses, was Yaqut. Amir-i-Hajib, the chamberlain who led the plot, was Aitigin. Altunia was her husband and the governor of Bhatinda.</div>
      <div class="cp-note exam">Razia was the first and only female Sultan of Delhi, and the Turkan-e-Chahalgani opposed her.</div>
    `
  },
  57: {
    questext: "Who was the first female Sultan of Delhi?",
    options: ["Razia", "Shah Turkan", "Nur Jahan", "Gulbadan Begum"],
    correct: "1",
    exptext: "✅ Razia ruled from 1236 to 1240 and was the first female Sultan of Delhi. 📌 Razia, the first lady Sultan. ❌ Shah Turkan is wrong because she was only the mother of Rukunuddin Firoz."
  },
  58: {
    questext: "Razia appointed which Abyssinian to the post of Amir-khur?",
    options: ["Aitigin", "Altunia", "Kabir Khan", "Jamal-ud-din Yaqut"],
    correct: "4",
    exptext: "✅ Jamal-ud-din Yaqut became the master of the horses. 📌 Yaqut and the horses. ❌ Altunia is wrong because he was the governor of Bhatinda and later her husband."
  },
  59: {
    questext: "Razia married which governor to save herself?",
    options: ["Malik Altunia", "Kabir Khan", "Balban", "Aitigin"],
    correct: "1",
    exptext: "✅ Razia married Malik Altunia, the governor of Bhatinda. 📌 Altunia, Bhatinda. ❌ Kabir Khan is wrong because he was the governor of Lahore who joined the plot."
  },
  60: {
    questext: "Razia was defeated and killed near",
    options: ["Panipat", "Kaithal", "Tarain", "Jud"],
    correct: "2",
    exptext: "✅ Razia and Altunia were killed near Kaithal on 13 October 1240. 📌 Kaithal ended her story. ❌ Tarain is wrong because it is linked with the battles of Ghori and Iltutmish."
  },
  61: {
    type: "concept", icon: "🌿", accent: "#d946ef", pauseTimer: true,
    title: "Nasiruddin Mahmud (1246–1266) — The Darvesh King",
    html: `
      <p class="cp-lead">After the weak rulers Bahram Shah and Alauddin Masood Shah, <b>Nasiruddin Mahmud</b>, a young prince of Iltutmish's family, was placed on the throne by the Corps of Forty in 1246.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/39.png" alt="Succession line: Razia, Bahram Shah (brother), Alauddin Masood Shah (nephew), Nasiruddin M" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He was called the <b>Darvesh King</b> for his simple and pious life. He was only a nominal ruler and handed the government to <b>Balban</b>.</p>
      <table><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody><tr><td>Who was the real ruler?</td><td>Balban</td></tr><tr><td>Title given to Balban</td><td>Ulug Khan</td></tr><tr><td>Balban's relation to the Sultan</td><td>Father in law</td></tr><tr><td>How long he ruled</td><td>20 years, until 1266</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/40.png" alt="Darvesh sufi simple clothes medieval illustration photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Nasiruddin gave Balban the title <b>Ulug Khan</b>, and Balban married his daughter to the Sultan. Many historians believe that Balban poisoned him in 1266 to take the throne.</p>
      <div class="cp-note trap">Ulug Khan was a title given to Balban by Nasiruddin Mahmud. It is not Balban's own name.</div>
      <div class="cp-note exam">Succession order after Razia: Bahram Shah, Alauddin Masood Shah, Nasiruddin Mahmud.</div>
    `
  },
  62: {
    questext: "Which Sultan was called the Darvesh King?",
    options: ["Razia", "Balban", "Nasiruddin Mahmud", "Iltutmish"],
    correct: "3",
    exptext: "✅ Nasiruddin Mahmud was called the Darvesh King for his pious and simple life. 📌 Darvesh, simple king. ❌ Balban is wrong because he was a strong, proud ruler."
  },
  63: {
    questext: "Which title did Nasiruddin Mahmud give to Balban?",
    options: ["Zil-i-Ilahi", "Sultan-e-Azam", "Lakh Bakhsh", "Ulug Khan"],
    correct: "4",
    exptext: "✅ Nasiruddin Mahmud gave Balban the title Ulug Khan. 📌 Ulug, big Khan. ❌ Zil-i-Ilahi is wrong because Balban took it himself after becoming Sultan."
  },
  64: {
    questext: "Who was the real ruler during the reign of Nasiruddin Mahmud?",
    options: ["Aitigin", "Balban", "Yaqut", "Altunia"],
    correct: "2",
    exptext: "✅ Balban, the Ulug Khan, ran the government while the Sultan prayed. 📌 Sultan Darvesh, ruler Balban. ❌ Yaqut is wrong because he served under Razia."
  },
  65: {
    type: "concept", icon: "🛡️", accent: "#64748b", pauseTimer: true,
    title: "Ghiyasuddin Balban (1266–1287) — From Slave to Sultan",
    html: `
      <p class="cp-lead">Balban was born as <b>Bahauddin</b>, an Ilbari Turk. The Mongols captured him as a child and sold him to the Sufi Khwaja Jamal-ud-din of Basra, who brought him to Delhi in 1232. There Iltutmish bought him.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/41.png" alt="Journey chain: Captured by Mongols, sold at Basra, brought to Delhi 1232, bought by Iltutm" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He rose through the ranks and joined the Corps of Forty. Under Razia he served as chief huntsman, helped to dethrone her, and then helped to place Nasiruddin on the throne.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/42.png" alt="Balban tomb Mehrauli Archaeological Park Delhi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Idea</th><th>Meaning</th></tr></thead><tbody><tr><td>Zil-i-Ilahi</td><td>Shadow of God, Balban's own title</td></tr><tr><td>Niyabat-i-Khudai</td><td>Kingship as God's vice-regency on earth, second only to prophethood</td></tr><tr><td>Corps of Forty</td><td>Destroyed by Balban; junior Turks promoted instead</td></tr><tr><td>Sijda, Paibos, Nauroz</td><td>Persian court customs that Balban introduced</td></tr></tbody></table>
      <p class="cp-lead">Balban claimed descent from the Iranian hero <b>Afrasiyab</b>. He banned wine at court and kept a strict, formal court.</p>
      <div class="cp-note trap">The Corps of Forty was created by Iltutmish and destroyed by Balban.</div>
      <div class="cp-note exam">Balban's own title was Zil-i-Ilahi, but Ulug Khan was given to him by Nasiruddin Mahmud.</div>
    `
  },
  66: {
    questext: "Which Sultan introduced the customs of Sijda, Paibos and Nauroz?",
    options: ["Aibak", "Balban", "Iltutmish", "Razia"],
    correct: "2",
    exptext: "✅ Balban introduced these Persian customs to raise the dignity of the Sultan. 📌 B for Balban, B for bowing. ❌ Iltutmish is wrong because he created the Corps of Forty."
  },
  67: {
    questext: "Under Razia, Balban served as",
    options: ["Amir-khur", "Amir-i-Hajib", "Chief huntsman", "Wazir"],
    correct: "3",
    exptext: "✅ Balban served Razia as chief huntsman before he helped to remove her. 📌 Hunt, then plot. ❌ Amir-khur is wrong because Yaqut held that post."
  },
  68: {
    questext: "Consider the following statements about Balban:\n1. He destroyed the Corps of Forty.\n2. He took the title Zil-i-Ilahi.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. 📌 He destroyed his rivals and called himself the Shadow of God. ❌ Neither is wrong because both are well known features of his rule."
  },
  69: {
    type: "concept", icon: "⚙️", accent: "#fb7185", pauseTimer: true,
    title: "Balban's Reforms and the Mongol Crisis",
    html: `
      <p class="cp-lead">Balban believed that a strong king must be feared. His policy is called <b>Blood and Iron</b>: rebels were killed and their wives and children were made slaves.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/43.png" alt="Four boxes around Balban: Diwan-i-Ariz, Barid-e-Mumalik spies, Frontier garrisons, Blood a" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Reform</th><th>What it was</th></tr></thead><tbody><tr><td>Diwan-i-Ariz</td><td>A military department created against the Mongol threat</td></tr><tr><td>Barid-e-Mumalik</td><td>Intelligence department; its officers were Barid</td></tr><tr><td>Frontier garrison</td><td>A garrison line on the north-west frontier under Sher Khan, then his sons Muhammad Khan and Bughra Khan</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/44.png" alt="Medieval Mongol cavalry warriors illustration photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>1285</b> came the biggest Mongol invasion. The Mongols were finally defeated, but his eldest son <b>Muhammad Khan</b> was killed. Balban died in <b>1287</b> and is buried at Mehrauli Archaeological Park. His court poet was <b>Amir Khusrau</b>, called Tuti-i-Hind (Parrot of India), who began at the court of Prince Muhammad in Multan.</p>
      <div class="cp-note trap">Balban's head of the Diwan-i-Ariz was called Imad-ul-Mulk. Diwan-i-Ariz is military, Barid-e-Mumalik is spies.</div>
      <div class="cp-note exam">Balban's eldest son Muhammad Khan was killed in the Mongol invasion of 1285.</div>
    `
  },
  70: {
    questext: "Balban's policy towards rebels is known as",
    options: ["Blood and Iron", "Divide and Rule", "Iron and Coal", "Peace and Trade"],
    correct: "1",
    exptext: "✅ Balban killed rebels and enslaved their families under his Blood and Iron policy. 📌 Strong king, strong policy. ❌ Divide and Rule is wrong because it describes a different idea."
  },
  71: {
    questext: "Who was killed in the Mongol invasion of 1285 during the reign of Balban?",
    options: ["Bughra Khan", "Kai Khusrau", "Sher Khan", "Muhammad Khan"],
    correct: "4",
    exptext: "✅ Balban's eldest son Muhammad Khan died fighting the Mongols in 1285. 📌 Mongols, Muhammad. ❌ Bughra Khan is wrong because he lived on and ruled Bengal."
  },
  72: {
    questext: "Balban created the Diwan-i-Ariz mainly to",
    options: ["Collect taxes", "Run charity", "Control the Mongol threat", "Keep court letters"],
    correct: "3",
    exptext: "✅ Diwan-i-Ariz, the military department, was created against the Mongol threat. 📌 Ariz means army. ❌ Collecting taxes is wrong because that was the work of amils."
  },
  73: {
    type: "concept", icon: "🏁", accent: "#2dd4bf", pauseTimer: true,
    title: "End of the Slave Dynasty",
    html: `
      <p class="cp-lead">Balban wanted his grandson <b>Kai Khusrau</b> to be the next ruler, but the nobles crowned <b>Qaiqabad</b> (1287 to 1290).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/45.png" alt="Short chain: Balban dies 1287, Qaiqabad 1287-1290, Kayumars (3 years old), Khilji takes ov" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Qaiqabad was a weak ruler. After a stroke he passed the rule to his three-year-old son <b>Shamsuddin Kayumars</b>, who became the last Slave ruler.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1287</td><td>Balban dies; Qaiqabad is crowned</td></tr><tr><td>1290</td><td>Jalal-ud-din Firoz Khilji overthrows Kayumars</td></tr><tr><td>1290</td><td>The Slave Dynasty ends and the Khilji Dynasty begins</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/46.png" alt="Khilji dynasty Jalaluddin Khilji Delhi coin photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The last Slave ruler was Shamsuddin Kayumars, not Qaiqabad. The dynasty ended in 1290, but the Sultanate itself ended only in 1526.</div>
      <div class="cp-note exam">Jalal-ud-din Firoz Khilji founded the Khilji Dynasty in 1290.</div>
    `
  },
  74: {
    questext: "Who was the last ruler of the Slave Dynasty?",
    options: ["Qaiqabad", "Kai Khusrau", "Shamsuddin Kayumars", "Nasiruddin Mahmud"],
    correct: "3",
    exptext: "✅ The three-year-old Shamsuddin Kayumars was the last Slave ruler. 📌 Qaiqabad passed the rule to Kayumars. ❌ Qaiqabad is wrong because he handed power to his son."
  },
  75: {
    questext: "Who overthrew Kayumars and founded the Khilji Dynasty in 1290?",
    options: ["Alauddin Khilji", "Ghiyasuddin Tughlaq", "Bahlol Lodi", "Jalal-ud-din Firoz Khilji"],
    correct: "4",
    exptext: "✅ Jalal-ud-din Firoz Khilji overthrew Kayumars in 1290. 📌 The first Khilji, Jalal-ud-din. ❌ Alauddin Khilji is wrong because he came to the throne after him."
  },
  76: {
    questext: "Which grandson of Balban did he want as heir, though the nobles crowned another ruler?",
    options: ["Kayumars", "Kai Khusrau", "Qaiqabad", "Bughra Khan"],
    correct: "2",
    exptext: "✅ Balban wanted Kai Khusrau, but the nobles crowned Qaiqabad. 📌 Khusrau was the choice, Qaiqabad the result. ❌ Kayumars is wrong because he was the son of Qaiqabad."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "the Qutub Minar tower in warm sandstone, an old Persian manuscript with a quill, and a few gold tanka coins" },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/1.png": { t: "fig", about: "Three boxes joined to a centre circle labelled Medieval India: Literary sources, Foreign travellers, Monuments." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ibn Battuta traveller portrait illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/2.png. a portrait or statue of Ibn Battuta",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hampi Vijayanagara ruins Virupaksha temple photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/3.png. the stone ruins of Hampi, the old Vijayanagara capital",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/4.png": { t: "fig", about: "Horizontal timeline with four dots: 1420 Conti (Devaraya I), 1442 Razzaq (Devaraya II), Paes (Krishnadevaraya), Nuniz (Achyutaraya)." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Qutub Minar Mehrauli Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/5.png. the full red sandstone tower in Mehrauli",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Quwwat-ul-Islam mosque screen Qutb complex photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/6.png. the carved arches beside the Qutb Minar",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Adhai Din Ka Jhopra Ajmer arches photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/7.png. the arched screen of the mosque at Ajmer",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/8.png": { t: "fig", about: "Four columns for Khilji, Tughlaq, Lodi and Balban, each with a small box listing the monuments named in the table." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tughlaqabad Fort Delhi ruins photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/9.png. the massive stone walls of Tughlaqabad",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Alai Darwaza Qutb complex Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/10.png. the Alai Darwaza gateway",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/11.png": { t: "fig", about: "Vertical timeline with five bars: Slave 1206-1290, Khilji 1290-1320, Tughlaq 1320-1414, Sayyid 1414-1451, Lodi 1451-1526, each with its founder's name." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"First Battle of Panipat 1526 Babur Ibrahim Lodi painting\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/12.png. a Mughal painting of the battle",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tomb of Qutbuddin Aibak Lahore photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/13.png. the tomb of Aibak in Anarkali, Lahore",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/14.png": { t: "fig", about: "Aibak in the centre with three arrows to Yaldoz, Qubacha and Iltutmish, each labelled with the marriage link." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/15.png": { t: "fig", about: "Short timeline: 1210 Aibak dies, Aramshah rules 8 months, Iltutmish defeats him at Jud near Delhi." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Qutub Minar complex Iltutmish tomb Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/16.png. the tomb of Iltutmish in the Qutb complex",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/17.png": { t: "fig", about: "Three linked boxes: Ghori, Aibak, Iltutmish, each with the word slave of, and the label Slave of slaves below." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Abbasid Caliph Baghdad medieval illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/18.png. a painting of the Abbasid court",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/19.png": { t: "fig", about: "Flow chart: Sultan, then muqti holding iqta, then army, tax collection, with Khalisa and Amils shown on the side." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Iltutmish silver tanka coin photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/20.png. a silver tanka coin with Arabic writing",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/21.png": { t: "fig", about: "Two-column match chart: books on the left (Tarikh-ul-Hind, Taj-ul-Masir, Tabakat-i-Nasiri, Chachnama) joined by lines to writers on the right." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tabakat-i-Nasiri Persian manuscript photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/22.png. an old Persian manuscript page",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Alberuni Tarikh-ul-Hind manuscript photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/23.png. a manuscript page or an Alberuni portrait",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/24.png": { t: "fig", about: "Two-column match chart: Rajatarangini, Prithviraj Raso, Hammir Mahakavya, Baburnama, Humayunama joined to their writers." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Baburnama illustrated manuscript Mughal painting photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/25.png. a Mughal painting from the Baburnama",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rajatarangini Kalhana Kashmir manuscript photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/26.png. a Rajatarangini manuscript or a Kalhana portrait",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/27.png": { t: "fig", about: "Timeline with four boxes: Akbar (Akbarnama, Tabakat-e-Akbari), Jahangir (Tuzuk-e-Jahangiri), Shah Jahan (Padshahnama, Badshahnama), Aurangzeb (Alamgirnama, Maasir-e-Alamgiri)." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Akbarnama illustrated manuscript Abul Fazal painting photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/28.png. a page from the Akbarnama",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ain-e-Akbari manuscript Abul Fazal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/29.png. the book of Akbar's administration",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/30.png": { t: "fig", about: "Flow: Sultan, nobles with iqta, Muqti, Amil collecting revenue, with Khalisa land shown as direct Sultan land." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Medieval Delhi Sultanate court painting photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/31.png. a painting of a Sultan with nobles",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/32.png": { t: "fig", about: "Map style box: Sultan at the top, Wazir below him, then Mustaufi and Amils." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/33.png": { t: "fig", about: "Four boxes joined to the Sultan: Diwan-i-Arz (military), Diwan-i-Insha (letters), Diwan-i-Risalat (appeals), Diwan-i-Khairat (charity)." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Medieval court Persian miniature Sultan Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/34.png. a Persian painting of a royal court",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/35.png": { t: "fig", about: "Three small panels labelled Sijda (prostration), Paibos (kissing the feet), Nauroz (Persian new year)." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Razia Sultan coin Delhi Sultanate photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/36.png. a silver coin of Razia",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/37.png": { t: "fig", about: "Five-box flow: Rukunuddin falls 1236, Razia rules, Yaqut made Amir-khur, nobles angry, Razia falls 1240." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhatinda Fort Qila Mubarak photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/38.png. the old fort at Bhatinda, where Razia was held",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/39.png": { t: "fig", about: "Succession line: Razia, Bahram Shah (brother), Alauddin Masood Shah (nephew), Nasiruddin Mahmud." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Darvesh sufi simple clothes medieval illustration photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/40.png. a painting of a pious king",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/41.png": { t: "fig", about: "Journey chain: Captured by Mongols, sold at Basra, brought to Delhi 1232, bought by Iltutmish." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Balban tomb Mehrauli Archaeological Park Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/42.png. the tomb of Balban at Mehrauli",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/43.png": { t: "fig", about: "Four boxes around Balban: Diwan-i-Ariz, Barid-e-Mumalik spies, Frontier garrisons, Blood and Iron policy." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Medieval Mongol cavalry warriors illustration photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/44.png. an illustration of Mongol horsemen",
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/45.png": { t: "fig", about: "Short chain: Balban dies 1287, Qaiqabad 1287-1290, Kayumars (3 years old), Khilji takes over 1290." },
  "images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Khilji dynasty Jalaluddin Khilji Delhi coin photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty/46.png. a coin or portrait linked with Jalal-ud-din Khilji"
});

/* CHANGE LOG
   - Qutb Minar: the tower was begun by Aibak, completed by Iltutmish and repaired by later rulers; the figure of four storeys was removed because the tower has five storeys.
   - Nasiruddin Qubacha: both spellings (Qubacha and Quwacha) appeared; the standard spelling Qubacha is used everywhere.
   - Nasiruddin Mahmud: described as a prince of Iltutmish's family, because historians differ on whether he was a son or a grandson.
   - Hauz-i-Sultani is the older name of the reservoir now known as Hauz-i-Shamsi; both names are given.
   - The 1191 and 1192 battles of Tarain (Ghori) are kept separate from the 1215 Tarain battle of Iltutmish.
*/
