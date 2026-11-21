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

/* Field: General_Awareness · Subject: Medieval_India · Chapter: Vijayanagar_and_Bahmani_Kingdoms · 15 concept pages (+ overview) · 30 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "VIJAYANAGARA",
      line2: "BAHMANI SULTANATE",
      line3: "MEDIEVAL INDIA",
      badge: "FULL CLASS",
      ribbon: "DATES • RULERS • TRAPS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Vijayanagara & Bahmani Kingdoms Full Class | Medieval India SSC CGL",
      altTitles: ["Krishnadeva Raya and Battle of Talikota in One Class", "Five Deccan Sultanates and Bahmani Empire Made Easy"],
      description: "Vijayanagara and Bahmani kingdoms give a steady set of marks in SSC CGL, Railways and Banking exams. In this simple class we move step by step from Jaunpur to the five Deccan Sultanates.\n\n📌 IN THIS CLASS\n✅ Sharqi dynasty of Jaunpur\n✅ Sangama, Saluva, Tuluva and Aravidu dynasties\n✅ Krishnadeva Raya and Bannihatti 1565\n✅ Vijayanagara administration and society\n✅ Bahmani Sultanate and the five Deccan Sultanates\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\nSee the chapter list below.\n\n👍 Like, share, subscribe.\n\n#SSCCGL #MedievalIndia #Vijayanagara",
      tags: ["vijayanagara empire", "bahmani kingdom", "krishnadeva raya", "battle of talikota", "bannihatti 1565", "sangama dynasty", "tuluva dynasty", "aravidu dynasty", "jaunpur sharqi", "mahmud gawan", "five deccan sultanates", "hasan gangu", "iyengar system", "medieval india", "ssc cgl history", "ssc cgl 2026", "general awareness", "indian history for ssc", "history mcq", "railway exam history", "banking exam gk", "static gk", "history tricks", "hampi vijayanagara", "gol gumbaz bijapur", "competitive exams", "previous year questions", "important questions", ""],
      hashtags: ["SSCCGL", "MedievalIndia", "Vijayanagara"],
      thumbText: "VIJAYANAGARA + BAHMANI",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏰 New class is live: Vijayanagar and Bahmani Kingdoms. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Jaunpur Sharqi dynasty\n00:00 Vijayanagara Empire\n00:00 Sangama dynasty\n00:00 Krishnadeva Raya\n00:00 Bannihatti and Aravidu\n00:00 Administration and society\n00:00 Bahmani and Deccan Sultanates",
      playlist: "Medieval India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Sharqi kingdom of Jaunpur, the Vijayanagara Empire and the Bahmani Sultanate</u>. We will learn who ruled, how they governed, and how the great Deccan powers rose and fell.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>15</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>30</b><span>Questions</span></div>
        <div class="cp-stat"><b>~60 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Jaunpur — the Sharqi Dynasty</b><br>How the Sharqis ruled Jaunpur, why it was called the Shiraz of India, and how Bahlol Lodi ended their rule.</li>
        <li><b>The Deccan and the Vijayanagara Empire</b><br>Why the Hindu Vijayanagara Empire and the Persian-style Bahmani Sultanate fought for over 200 years, and how Vijayanagara began in 1336.</li>
        <li><b>Sangama Dynasty</b><br>The rulers from Harihara I to Deva Raya II and what each one is known for.</li>
        <li><b>Saluva and Tuluva Dynasties</b><br>Krishnadeva Raya, the greatest ruler, his wars, his poets and his temples.</li>
        <li><b>Battle of Bannihatti and the Aravidu Dynasty</b><br>How the great empire fell in 1565 and how the last dynasty carried on.</li>
        <li><b>Administration, Land and Society</b><br>How the empire was governed, how land was held and which coins were used.</li>
        <li><b>Bahmani Empire and the Five Deccan Sultanates</b><br>How the Bahmani Sultanate began in 1347, its great minister Mahmud Gawan, and the five states that rose from its ruins.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Krishnadeva Raya, the Battle of Bannihatti, the Iyengar system and the five Deccan Sultanates are asked in almost every SSC CGL paper that has medieval history.</div>
    `
  },
  2: {
    type: "concept", icon: "🕌", accent: "#22c55e", pauseTimer: true,
    title: "Jaunpur — the Sharqi Dynasty",
    html: `
      <p class="cp-lead"><b>Jaunpur</b> became an independent Muslim kingdom in the north while the Delhi Sultanate was weak. Its rulers were called the <b>Sharqi</b> (eastern) dynasty. <u>Jaunpur was so rich in art and learning that it was called the 'Shiraz of India'.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/1.png" alt="Atala Masjid Jaunpur photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The city was founded by <b>Firuz Shah Tughlaq</b> on the banks of the <b>Gomti</b> for his cousin <b>Muhammad Jauna Khan</b>. Later, <b>Malik Sarwar</b>, who was a governor and minister under Muhammad Shah (a son of Firuz Tughlaq), made it independent. He died in <b>1399</b>.</p>
      <table><thead><tr><th>Years</th><th>Ruler</th></tr></thead><tbody><tr><td>1399–1402</td><td>Mubarak Shah Sharqi</td></tr><tr><td>1402–1440</td><td>Ibrahim Sharqi, the time of greatest expansion; he won Kannauj in 1406</td></tr><tr><td>1440–1479</td><td>Mahmud (1440–57), Muhammad (1457–58) and then Hussain Shah Sharqi (1458–79)</td></tr></tbody></table>
      <p class="cp-lead"><b>Ibrahim Sharqi</b> built the <b>Atala Masjid</b> in <b>1408</b>. It is a fine example of Sharqi architecture. <b>Hussain Shah Sharqi</b> built the <b>Jama Masjid</b> of Jaunpur in <b>1470</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/2.png" alt="Timeline with four boxes: 1399 Malik Sarwar dies, 1406 Ibrahim wins Kannauj, 1408 Atala Ma" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Bahlol Lodi</b> attacked the Sharqi kingdom. Hussain Shah fled to <b>Bihar</b>, and Bahlol made his son <b>Barbak Shah</b> the ruler.</p>
      <div class="cp-note trap">The Atala Masjid (1408) was built by Ibrahim Sharqi, and the Jama Masjid (1470) was built by Hussain Shah Sharqi. Do not swap the builders.</div>
      <div class="cp-note exam">Remember the Gomti, the nickname Shiraz of India, Ibrahim Sharqi with the Atala Masjid, and Bahlol Lodi as the ender of Sharqi rule.</div>
    `
  },
  3: {
    questext: "The city of Jaunpur was founded by Firuz Shah Tughlaq on the banks of which river?",
    options: ["Ganga", "Yamuna", "Gomti", "Ghaghra"],
    correct: "3",
    exptext: "✅ Jaunpur lies on the Gomti. 📌 Gomti and Jaunpur are always together in maps. ❌ The Ganga is wrong because Jaunpur is not on its main bank."
  },
  4: {
    questext: "The Atala Masjid of Jaunpur, built in 1408, was constructed by",
    options: ["Hussain Shah Sharqi", "Malik Sarwar", "Mahmud Sharqi", "Ibrahim Sharqi"],
    correct: "4",
    exptext: "✅ Ibrahim Sharqi built the Atala Masjid. 📌 Both Ibrahim and Atala start with a vowel sound. ❌ Hussain Shah Sharqi is wrong because he built the Jama Masjid in 1470."
  },
  5: {
    type: "concept", icon: "🌄", accent: "#f59e0b", pauseTimer: true,
    title: "The Deccan — Two Rival Powers and the Vijayanagara Empire (1336–1652)",
    html: `
      <p class="cp-lead">Two great powers rose in the Deccan in the 14th century: the Hindu <b>Vijayanagara Empire</b> and the Muslim <b>Bahmani Sultanate</b>. They ruled side by side for over <b>200 years</b> and fought each other again and again.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/3.png" alt="Schematic, not a map: two big boxes side by side. Left box: Vijayanagara, Hindu, south of " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The Bahmani Sultanate faded by the end of the 15th century. The great age of Vijayanagara ended at <b>Bannihatti</b> in <b>1565</b>.</p>
      <p class="cp-lead"><b>Harihara</b> and <b>Bukka</b> founded Vijayanagara in <b>1336</b> on the <b>Tungabhadra</b>. Its capital was <b>Hampi</b> (Hastinavathi), also called the <b>'City of Victory'</b>. Portuguese, Arab and Persian travellers praised its wealth.</p>
      <table><thead><tr><th>Dynasty</th><th>Years</th><th>Founder</th></tr></thead><tbody><tr><td>Sangama</td><td>1336–1485</td><td>Harihara and Bukka</td></tr><tr><td>Saluva</td><td>1485–1505</td><td>Saluva Narasimha</td></tr><tr><td>Tuluva</td><td>1505–1570</td><td>Veera Narasimha (Narasa Nayaka)</td></tr><tr><td>Aravidu</td><td>1570–about 1650</td><td>Tirumala II</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/4.png" alt="Hampi Virupaksha Temple Tungabhadra photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The brothers were first feudatories of the <b>Kakatiyas of Warangal</b>, and later ministers at <b>Kampili</b> in Karnataka. <b>Muhammad bin Tughlaq</b> attacked Kampili for sheltering a Muslim rebel. The brothers were captured, converted to Islam and sent against rebels. Later they returned to Hinduism with the help of the guru <b>Vidyaranya</b>. The <b>Sangama</b> dynasty is named after their father. Writings of that time call the empire <b>'Karnataka Samrajyamu'</b> and not Vijayanagara Empire.</p>
      <div class="cp-note trap">The four dynasties came in the order Sangama, Saluva, Tuluva, Aravidu. Do not push Aravidu earlier.</div>
      <div class="cp-note exam">Remember 1336, the Tungabhadra, Hampi as 'City of Victory', the guru Vidyaranya and the order of the four dynasties.</div>
    `
  },
  6: {
    questext: "The Vijayanagara Empire was founded in 1336 by",
    options: ["Harihara and Bukka", "Krishnadeva Raya", "Saluva Narasimha", "Tirumala II"],
    correct: "1",
    exptext: "✅ The brothers Harihara and Bukka founded the empire on the Tungabhadra. 📌 Hari and Bukka started the Sangama line. ❌ Krishnadeva Raya is wrong because he ruled much later in the Tuluva line."
  },
  7: {
    questext: "The founders of Vijayanagara returned to Hinduism with the help of which guru?",
    options: ["Ramananda", "Vidyaranya", "Chaitanya", "Kabir"],
    correct: "2",
    exptext: "✅ The guru Vidyaranya helped them return to Hinduism. 📌 Vidya means knowledge, a teacher's name. ❌ Ramananda is wrong because he was a bhakti saint of North India."
  },
  8: {
    type: "concept", icon: "🏛️", accent: "#ef4444", pauseTimer: true,
    title: "Sangama Dynasty: Harihara I and Bukka I (1336–1379)",
    html: `
      <p class="cp-lead">The <b>Sangama dynasty</b> was the first dynasty of Vijayanagara. At first it was a kind of <b>cooperative commonwealth</b>, which means the brothers and their family shared power.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/5.png" alt="Anegundi Anagundi Fort Karnataka photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Harihara I</b> (1336–56) founded the city <b>Vidyanagar</b>, which was later renamed <b>Vijayanagara</b>. His first capital was <b>Anagundi</b>. In <b>1346</b> he annexed the <b>Hoysala</b> kingdom and killed <b>Vir Ballal III</b>. He also defeated the Sultan of <b>Madurai</b>.</p>
      <table><thead><tr><th>Ruler</th><th>Key facts</th></tr></thead><tbody><tr><td>Harihara I (1336–56)</td><td>Founded Vidyanagar; capital Anagundi; annexed Hoysala in 1346; beat the Sultan of Madurai</td></tr><tr><td>Bukka I (1356–79)</td><td>Hard fight with the Bahmanis; royal capital Gutti; empire spread to Rameshwaram</td></tr></tbody></table>
      <p class="cp-lead"><b>Bukka I</b> (1356–79) had a hard fight with the <b>Bahmanis</b> and defeated the Sultans of Madurai, his southern rivals. His royal capital was <b>Gutti</b>. The empire spread over the whole South to <b>Rameshwaram</b>, including the Tamil country and the <b>Cheras</b> (Kerala).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/6.png" alt="Simple schematic, not a map: a line running from Anagundi at the top to Rameshwaram at the" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Harihara I annexed the Hoysala kingdom in 1346, and Bukka I added the far south. Do not give the southern wars to Harihara.</div>
      <div class="cp-note exam">Remember Anagundi as the first capital, Vir Ballal III as the Hoysala king killed in 1346, and Rameshwaram as the southern limit under Bukka.</div>
    `
  },
  9: {
    questext: "Harihara I annexed the Hoysala kingdom and killed Vir Ballal III in which year?",
    options: ["1336", "1327", "1346", "1356"],
    correct: "3",
    exptext: "✅ The year was 1346. 📌 Ten years after the founding in 1336. ❌ 1336 is wrong because that was the founding year of the empire."
  },
  10: {
    questext: "The first capital of the Vijayanagara rulers, before the city of Vijayanagara, was",
    options: ["Penugonda", "Chandragiri", "Gutti", "Anagundi"],
    correct: "4",
    exptext: "✅ Anagundi was the early capital. 📌 Anagundi lies across the river from Hampi. ❌ Penugonda is wrong because the Aravidu rulers moved there much later."
  },
  11: {
    type: "concept", icon: "📜", accent: "#8b5cf6", pauseTimer: true,
    title: "Sangama Dynasty: Harihara II and Deva Raya I (1379–1422)",
    html: `
      <p class="cp-lead">The next two Sangama rulers made the empire stronger in the east and the west. They also fought over the rich land between two rivers.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/7.png" alt="Tungabhadra Dam river Hampi irrigation canal photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Harihara II</b> (1379–1404) was the first to take the royal titles <b>Raja Parmeshwara</b> and <b>Maharajadhiraja</b>. He allied with the Bahmanis at first. He took land from the <b>Gajapatis</b> and <b>Reddis</b> to the east. His greatest success was to win <b>Belgaum</b> and <b>Goa</b> from the Bahmanis. He also sent an expedition to <b>Ceylon</b> (Sri Lanka).</p>
      <table><thead><tr><th>Ruler</th><th>Key facts</th></tr></thead><tbody><tr><td>Harihara II (1379–1404)</td><td>First to take Raja Parmeshwara and Maharajadhiraja; won Belgaum and Goa</td></tr><tr><td>Deva Raya I (1406–22)</td><td>Beaten by Bahmani Sultan Firuz Shah; built a dam across the Tungabhadra in 1410; Hazar Rama Temple</td></tr></tbody></table>
      <p class="cp-lead"><b>Deva Raya I</b> (1406–22) renewed the fight for the <b>Tungabhadra Doab</b>. He was beaten by the Bahmani Sultan <b>Firuz Shah</b>, paid a huge sum of money and gave his daughter in marriage. In <b>1410</b> he built a <b>dam across the Tungabhadra</b> and the <b>Hazar Rama Temple</b>. The <b>Sri Rangam Inscription</b> belongs to his reign. The Venetian traveller <b>Nicolo De Conti</b> visited him.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/8.png" alt="Three-box timeline: Harihara II titles and Goa, Deva Raya I defeat by Firuz Shah and marri" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix the conflict areas. The Tungabhadra Doab lies between the Krishna and the Tungabhadra. The Krishna–Godavari delta is a separate fertile land.</div>
      <div class="cp-note exam">Remember Harihara II as the first to take royal titles, and Deva Raya I with the dam of 1410 and Nicolo De Conti.</div>
    `
  },
  12: {
    questext: "Which Vijayanagara ruler was the first to take the titles Raja Parmeshwara and Maharajadhiraja?",
    options: ["Harihara II", "Harihara I", "Bukka I", "Deva Raya I"],
    correct: "1",
    exptext: "✅ Harihara II was the first to take these royal titles. 📌 The second Harihara took the higher titles. ❌ Harihara I is wrong because he only founded the city and the early kingdom."
  },
  13: {
    questext: "The Venetian traveller Nicolo De Conti visited Vijayanagara in the reign of",
    options: ["Deva Raya II", "Deva Raya I", "Krishnadeva Raya", "Achyuta Deva Raya"],
    correct: "2",
    exptext: "✅ Nicolo De Conti visited in the time of Deva Raya I. 📌 Conti and Deva Raya I both come early in the list. ❌ Krishnadeva Raya is wrong because Domingo Paes visited his court about 1520."
  },
  14: {
    type: "concept", icon: "🐘", accent: "#14b8a6", pauseTimer: true,
    title: "Sangama Dynasty: Deva Raya II (1422–1446)",
    html: `
      <p class="cp-lead"><b>Deva Raya II</b> was the greatest ruler of the Sangama dynasty. He ruled from 1422 to 1446 and made the empire reach the shores of <b>Ceylon</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/9.png" alt="Vijayanagara Elephant Stable Hampi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He took titles such as <b>Immadi Devaraya</b>, <b>Proudha Devaraya</b> and <b>Gajabetekara</b>, which means the <b>Hunter of Elephants</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Titles</td><td>Immadi Devaraya, Proudha Devaraya, Gajabetekara (Hunter of Elephants)</td></tr><tr><td>Army</td><td>Reorganised on Delhi Sultanate lines; many Muslims recruited; Arab horses bought in bulk</td></tr><tr><td>Visitor</td><td>Abdur Razzaq of Persia</td></tr><tr><td>Writer</td><td>Mahanataka Sudhanidhi; commentary on Badarayana's Brahmasutras</td></tr></tbody></table>
      <p class="cp-lead">He reorganised the army on the lines of the Delhi Sultanate. He recruited many Muslims and bought <b>Arab horses</b> in bulk, since horses were a big need of the army. The Persian traveller <b>Abdur Razzaq</b> visited his court in 1442–43.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/10.png" alt="Mind map with Deva Raya II in the centre and four branches: Ceylon shores, army with Musli" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He was a scholar and wrote the Sanskrit play <b>Mahanataka Sudhanidhi</b> and a commentary on <b>Badarayana's Brahmasutras</b>.</p>
      <div class="cp-note trap">Abdur Razzaq was a Persian envoy of the Timurid ruler Shah Rukh, who visited in 1442–43. He was not Portuguese.</div>
      <div class="cp-note exam">Remember Gajabetekara, the Arab horses and Abdur Razzaq with Deva Raya II.</div>
    `
  },
  15: {
    questext: "Which Vijayanagara ruler took the title Gajabetekara?",
    options: ["Harihara II", "Bukka I", "Deva Raya II", "Achyuta Deva Raya"],
    correct: "3",
    exptext: "✅ Deva Raya II took the title Gajabetekara, meaning Hunter of Elephants. 📌 Gaja means elephant. ❌ Harihara II is wrong because he took the titles Raja Parmeshwara and Maharajadhiraja."
  },
  16: {
    questext: "The Persian envoy Abdur Razzaq visited the court of",
    options: ["Harihara I", "Krishnadeva Raya", "Deva Raya I", "Deva Raya II"],
    correct: "4",
    exptext: "✅ Abdur Razzaq visited Deva Raya II in 1442–43. 📌 Razzaq and Deva Raya II both come from the middle of the list. ❌ Krishnadeva Raya is wrong because the Portuguese traveller Domingo Paes visited him."
  },
  17: {
    type: "concept", icon: "🌟", accent: "#ec4899", pauseTimer: true,
    title: "Saluva and Tuluva Dynasties: Krishnadeva Raya's Wars (1485–1530)",
    html: `
      <p class="cp-lead">After Deva Raya II, civil wars broke the Sangama rule. <b>Saluva Narasimha</b> (1485–91), the Governor of <b>Chandragiri</b>, took the throne and brought peace. <b>Veera Narasimha</b> then founded the <b>Tuluva</b> dynasty.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/11.png" alt="Krishnadeva Raya statue portrait Hampi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Krishnadeva Raya</b> (1509–30) was the greatest Tuluva ruler. In seven years of war he forced <b>Orissa</b> to give back all land up to the <b>Krishna</b>. This led to a hostile alliance of <b>Bijapur and Orissa</b>.</p>
      <table><thead><tr><th>Event</th><th>Fact</th></tr></thead><tbody><tr><td>Saluva Narasimha</td><td>Governor of Chandragiri; founded the Saluva dynasty</td></tr><tr><td>Veera Narasimha</td><td>Founded the Tuluva dynasty</td></tr><tr><td>1520</td><td>Battle of Raichur: Krishnadeva Raya beat Ismail Adil Shah of Bijapur and won the Raichur doab</td></tr><tr><td>Portuguese</td><td>Friendly with Albuquerque; Friar Louis was his ambassador</td></tr></tbody></table>
      <p class="cp-lead">In <b>1520</b> he won the <b>Battle of Raichur</b> against <b>Ismail Adil Shah</b> of Bijapur and recovered the <b>Raichur doab</b>. For some time he held <b>Bijapur and Belgaum</b> before a truce was made. <b>Babur</b> praised him as a very powerful ruler, and Vijayanagara became the strongest military power in South India.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/12.png" alt="Flow picture: Orissa returns land up to the Krishna, then Bijapur and Orissa join against " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Against the Portuguese trade danger he stayed friendly with the governor <b>Albuquerque</b>, whose ambassador <b>Friar Louis</b> lived at his court.</p>
      <div class="cp-note trap">Do not confuse the two conflict regions. The Raichur doab lies between the Krishna and the Tungabhadra rivers.</div>
      <div class="cp-note exam">Remember 1520 for Raichur, Ismail Adil Shah as his opponent, and Albuquerque with Friar Louis.</div>
    `
  },
  18: {
    questext: "The Saluva dynasty of Vijayanagara was founded by",
    options: ["Saluva Narasimha", "Veera Narasimha", "Tirumala II", "Harihara I"],
    correct: "1",
    exptext: "✅ Saluva Narasimha, the Governor of Chandragiri, founded it. 📌 The name of the founder is the name of the dynasty. ❌ Veera Narasimha is wrong because he founded the Tuluva dynasty."
  },
  19: {
    questext: "In the Battle of Raichur in 1520, Krishnadeva Raya defeated",
    options: ["Ibrahim Lodi", "Ismail Adil Shah of Bijapur", "Quli Qutb Shah", "Hussain Nizam Shah"],
    correct: "2",
    exptext: "✅ He defeated Ismail Adil Shah of Bijapur and won the Raichur doab. 📌 Raichur and Ismail share the same ending sound. ❌ Ibrahim Lodi is wrong because he ruled in North India."
  },
  20: {
    type: "concept", icon: "📚", accent: "#3b82f6", pauseTimer: true,
    title: "Krishnadeva Raya: Scholar and Builder",
    html: `
      <p class="cp-lead"><b>Krishnadeva Raya</b> was not only a warrior but also a great scholar, poet and builder. His court was full of poets and artists.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/13.png" alt="Vitthala Temple Stone Chariot Hampi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He wrote in Telugu and Sanskrit. His Telugu work <b>Amuktamalyada</b> tells the story of Andal and also gives advice on statecraft (<b>rajaniti</b>). His Sanskrit works are <b>Ushaparinayam</b> and <b>Jambavati Kalyanam</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Amuktamalyada</td><td>Telugu, story of Andal and statecraft</td></tr><tr><td>Ushaparinayam, Jambavati Kalyanam</td><td>Sanskrit</td></tr><tr><td>Titles</td><td>Yavanaraja Sthapanacharya (restorer of the Yavana, that is, Bahmani, kingdom), Abhinava Bhoja, Andhra Bhoja</td></tr><tr><td>Temples</td><td>Vitthalaswamy, Tirupati; expanded Hazara Rama</td></tr><tr><td>Court poets</td><td>The Ashtadiggajas, the eight poets</td></tr></tbody></table>
      <p class="cp-lead">His titles were <b>Yavanaraja Sthapanacharya</b>, <b>Abhinava Bhoja</b> and <b>Andhra Bhoja</b>. He built the <b>Vitthalaswamy</b> and <b>Tirupati</b> temples and expanded the <b>Hazara Rama</b> temple. His court held the eight poets known as the <b>Ashtadiggajas</b>, and their chief was <b>Allasani Peddana</b>, who wrote <b>Manucharitam</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/14.png" alt="Simple picture with three boxes: Poet with Amuktamalyada Telugu, Builder with Vitthalaswam" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Amuktamalyada is in Telugu. Ushaparinayam and Jambavati Kalyanam are in Sanskrit. Do not swap them.</div>
      <div class="cp-note exam">Remember Telugu for Amuktamalyada, the Ashtadiggajas and the Vitthalaswamy temple at Hampi.</div>
    `
  },
  21: {
    questext: "The Amuktamalyada, written by Krishnadeva Raya, is in which language?",
    options: ["Sanskrit", "Tamil", "Telugu", "Kannada"],
    correct: "3",
    exptext: "✅ Amuktamalyada is a Telugu work. 📌 Amukta sounds like a Telugu name. ❌ Sanskrit is wrong because his Sanskrit works are Ushaparinayam and Jambavati Kalyanam."
  },
  22: {
    questext: "The Ashtadiggajas, the eight poets, were part of the court of",
    options: ["Deva Raya II", "Harihara II", "Achyuta Deva Raya", "Krishnadeva Raya"],
    correct: "4",
    exptext: "✅ The eight poets adorned the court of Krishnadeva Raya. 📌 Ashta means eight. ❌ Deva Raya II is wrong because he was a Sangama king known for a Sanskrit play."
  },
  23: {
    type: "concept", icon: "⚔️", accent: "#f97316", pauseTimer: true,
    title: "Achyuta Deva Raya, Sadashiva Raya and the Battle of Bannihatti (1530–1565)",
    html: `
      <p class="cp-lead">After Krishnadeva Raya, Vijayanagara had weak kings and a strong minister, <b>Rama Raya</b>. This ended in the great defeat at <b>Bannihatti (Talikota)</b> in <b>1565</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/15.png" alt="Talikota battle 1565 Vijayanagara ruins Hampi photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Achyuta Deva Raya</b> (1530–42) took the throne after a struggle for power. He built the <b>Tiruvengalanatha</b> temple at Hampi. He ruled for 12 years and was then imprisoned by his chief minister <b>Rama Raya</b>, with whom he had agreed to share power.</p>
      <table><thead><tr><th>Sultanate</th><th>Ruler at Bannihatti</th></tr></thead><tbody><tr><td>Ahmednagar</td><td>Hussain Nizam Shah I</td></tr><tr><td>Bijapur</td><td>Ali Adil Shah I</td></tr><tr><td>Bidar</td><td>Ali Barid Shah</td></tr><tr><td>Golconda</td><td>Ibrahim Quli Qutb Shah</td></tr></tbody></table>
      <p class="cp-lead"><b>Sadashiva Raya</b> (1543–67) was the nominal ruler. The real power lay with <b>Rama Raja</b>, who played the Muslim powers against each other.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/16.png" alt="Simple picture: Rama Raja at the centre, four arrows coming from Ahmednagar, Bijapur, Bida" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>January 1565</b> four Sultans fought him at <b>Bannihatti</b>: <b>Hussain Nizam Shah I</b> of Ahmednagar, <b>Ali Adil Shah I</b> of Bijapur, <b>Ali Barid Shah</b> of Bidar and <b>Ibrahim Quli Qutb Shah</b> of Golconda. Rama Raja was surrounded, captured and executed. This was the <b>end of the great age of Vijayanagara</b>.</p>
      <div class="cp-note trap">Only four Sultanates fought at Bannihatti. The Sultan of Berar was absent.</div>
      <div class="cp-note exam">Remember January 1565, the name Rama Raya, and the four Sultanates that joined: Ahmednagar, Bijapur, Bidar and Golconda.</div>
    `
  },
  24: {
    questext: "Which of the following Deccan Sultanates did not fight against Rama Raja at Bannihatti in 1565?",
    options: ["Ahmednagar", "Berar", "Bijapur", "Golconda"],
    correct: "2",
    exptext: "✅ Berar did not take part. The other four Sultanates joined the fight. 📌 Remember the four names Ahmednagar, Bijapur, Bidar and Golconda. ❌ Ahmednagar is wrong because its Sultan took part."
  },
  25: {
    questext: "The Tiruvengalanatha temple at Hampi was built by",
    options: ["Krishnadeva Raya", "Sadashiva Raya", "Achyuta Deva Raya", "Rama Raya"],
    correct: "3",
    exptext: "✅ Achyuta Deva Raya built the temple. 📌 The names Achyuta and Tiruvengalanatha both belong to Vishnu. ❌ Krishnadeva Raya is wrong because he built the Vitthalaswamy temple."
  },
  26: {
    questext: "Consider the following statements about the Battle of Bannihatti:\n1. It was fought in January 1565.\n2. The Sultan of Berar fought against Rama Raja in this battle.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because the battle was fought in January 1565. 📌 Four Sultanates joined and Berar was absent. ❌ Statement 2 is wrong because Berar did not take part."
  },
  27: {
    type: "concept", icon: "🏯", accent: "#84cc16", pauseTimer: true,
    title: "Aravidu Dynasty (1570–1650)",
    html: `
      <p class="cp-lead">The <b>Aravidu dynasty</b> was the last dynasty of Vijayanagara. After the defeat at Bannihatti, the empire was much smaller, but it still lasted for about eighty years.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/17.png" alt="Penugonda Fort Andhra Pradesh photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It was founded by <b>Tirumala II</b>, the brother of Rama Raya, around 1570. He moved the capital from <b>Hampi</b> to <b>Penugonda</b>, since Hampi had been ruined.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Founder</td><td>Tirumala II, brother of Rama Raya</td></tr><tr><td>New capital</td><td>Penugonda (moved from Hampi)</td></tr><tr><td>Famous ruler</td><td>Venkata II (1586–1614)</td></tr><tr><td>Last ruler</td><td>Sri Ranga III (1642–46)</td></tr></tbody></table>
      <p class="cp-lead">His successors were <b>Sri Ranga</b>, then <b>Venkata II</b> (1586–1614), and the last ruler was <b>Sri Ranga III</b> (1642–46).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/18.png" alt="Simple chain: Tirumala II, Sri Ranga, Venkata II 1586-1614, Sri Ranga III 1642-46, each in" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Aravidu founder was Tirumala II, not Rama Raya. Rama Raya died at Bannihatti, but his brother Tirumala II founded the dynasty.</div>
      <div class="cp-note exam">Remember Tirumala II as founder, Penugonda as capital and Sri Ranga III as the last ruler.</div>
    `
  },
  28: {
    questext: "The founder of the Aravidu dynasty of Vijayanagara was",
    options: ["Rama Raya", "Sadashiva Raya", "Venkata II", "Tirumala II"],
    correct: "4",
    exptext: "✅ Tirumala II founded the Aravidu dynasty. 📌 Tirumala was the brother who lived on after Rama Raya. ❌ Rama Raya is wrong because he died at Bannihatti."
  },
  29: {
    questext: "After the defeat of 1565, the Aravidu rulers moved the capital from Hampi to",
    options: ["Penugonda", "Gutti", "Anagundi", "Warangal"],
    correct: "1",
    exptext: "✅ The capital moved to Penugonda. 📌 Hampi ruined, so a new fort. ❌ Gutti is wrong because that was the royal capital of Bukka I."
  },
  30: {
    type: "concept", icon: "🗂️", accent: "#06b6d4", pauseTimer: true,
    title: "Vijayanagara Administration",
    html: `
      <p class="cp-lead">The Vijayanagara government was a <b>monarchy</b>, and its plan followed the <b>Saptanga</b> idea (seven parts of a state) of the Mauryas. <u>The king was called 'Rai'.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/19.png" alt="Pyramid diagram with the King (Rai) at the top, then Council with Pradhanni at the head an" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Nayaks</b> (military chiefs) mattered a great deal in choosing the king. The state was <b>secular in religion</b>, and it followed the tradition of <b>joint rule</b> as under the Kushans. The head of the council was the <b>Pradhanni</b> (<b>Mahapradhani</b>), and its president was the <b>Sabhanayak</b>.</p>
      <table><thead><tr><th>Level</th><th>Name</th></tr></thead><tbody><tr><td>Empire</td><td>Whole kingdom</td></tr><tr><td>Province</td><td>Rajya (Mandalam)</td></tr><tr><td>District</td><td>Kottam or Valnadu</td></tr><tr><td>Pargana</td><td>Nadu</td></tr><tr><td>Group of 50 villages</td><td>Melagram</td></tr><tr><td>Village</td><td>Gram or Ur</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/20.png" alt="Hampi Mahanavami Dibba platform photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Iyengar system</b> had <b>12 hereditary village officers</b>. They were paid in <b>tax-free land</b> and not in salary.</p>
      <div class="cp-note trap">Do not mix the village-level words. The Gram (Ur) is the village, and the Melagram is a group of about 50 villages.</div>
      <div class="cp-note exam">Remember Rai for the king, Pradhanni as head of the council, and Iyengar system with 12 officers paid in tax-free land.</div>
    `
  },
  31: {
    questext: "Under the Iyengar system in Vijayanagara, village officers were",
    options: ["Paid in gold coins", "Twelve hereditary officers paid in tax-free land", "Chosen by the Sultan", "Paid by traders"],
    correct: "2",
    exptext: "✅ The Iyengar system had 12 hereditary village officers who were paid in tax-free land. 📌 Twelve officers and land in place of salary. ❌ Paid in gold coins is wrong because they were not given a salary."
  },
  32: {
    type: "concept", icon: "🌾", accent: "#a855f7", pauseTimer: true,
    title: "Land, Revenue and Society in Vijayanagara",
    html: `
      <p class="cp-lead">Land in the Vijayanagara empire was given out in different ways. Each type of land had its own name, and exams ask you to match them.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/21.png" alt="Four boxes in a row: Bhandarwad direct state control, Brahmadeya tax-free grants, Amaram l" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Land type</th><th>Description</th></tr></thead><tbody><tr><td>Bhandarwad</td><td>Under direct state control; smallest</td></tr><tr><td>Brahmadeya, Devadeya, Mathapur</td><td>Tax-free grants to Brahmins, temples and monasteries</td></tr><tr><td>Amaram</td><td>Largest; given to the Nayaks</td></tr><tr><td>Rattakodaigai</td><td>Tax-free land given for bravery in war</td></tr></tbody></table>
      <p class="cp-lead">The land revenue was <b>1/6</b> of the produce. The gold coin was the <b>Varaha</b> (52 grains), which foreign traders called the <b>Pagoda</b>, and the silver coin was the <b>Taar</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/22.png" alt="Vijayanagara gold varaha coin Pagoda photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In society there was <b>no Kshatriya varna</b> in the usual form. <b>Chettis</b> (<b>Shettis</b>), the merchants, held the second place after Brahmins. The main festivals were <b>Ramnavami</b>, <b>Mahanavami</b> (the biggest, in which the king's presence was compulsory) and <b>Navratri</b>.</p>
      <div class="cp-note trap">Amaram land was the largest and went to the Nayaks, while Bhandarwad was the smallest and was under the state.</div>
      <div class="cp-note exam">Remember revenue of one sixth, the Varaha called Pagoda, and Mahanavami as the biggest festival.</div>
    `
  },
  33: {
    questext: "The gold coin of the Vijayanagara empire, called the Pagoda by foreign traders, was known as",
    options: ["Taar", "Tanka", "Varaha", "Dam"],
    correct: "3",
    exptext: "✅ The gold coin was the Varaha of 52 grains, also called the Pagoda. 📌 Varaha is the boar, the symbol on the coin. ❌ Taar is wrong because it was the silver coin."
  },
  34: {
    questext: "The largest type of land held by the Nayaks in the Vijayanagara empire was",
    options: ["Amaram", "Bhandarwad", "Rattakodaigai", "Devadeya"],
    correct: "1",
    exptext: "✅ Amaram was the largest land type and was given to the Nayaks. 📌 Amaram sounds like a big grant. ❌ Bhandarwad is wrong because it was the smallest, under the state."
  },
  35: {
    type: "concept", icon: "🌙", accent: "#e11d48", pauseTimer: true,
    title: "Bahmani Empire (1347–1527): Early Rulers",
    html: `
      <p class="cp-lead">The <b>Bahmani Sultanate</b> was founded in <b>1347</b> by <b>Zafar Khan</b>, also called <b>Hasan Gangu</b>. He took the title <b>Alauddin Hasan Bahman Shah</b>. He was born during a long rebellion in the time of <b>Muhammad bin Tughlaq</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/23.png" alt="Gulbarga Fort Jama Masjid Karnataka photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Years</th><th>Ruler and fact</th></tr></thead><tbody><tr><td>1347–58</td><td>Alauddin Hasan Bahman Shah: capital Gulbarga, renamed Ahsanabad; liberal to Hindus; banned Jaziya</td></tr><tr><td>1358–75</td><td>Muhammad Shah I: constant wars with Vijayanagara and Warangal</td></tr><tr><td>1422–36</td><td>Shihabuddin Ahmed I: capital moved to Bidar, renamed Muhammadabad; called 'Ahmed Shah Wali' or Saint Ahmed</td></tr><tr><td>1458–61</td><td>Humayun Shah: called 'Zalim' (cruel) and 'Nero of the Deccan'</td></tr></tbody></table>
      <p class="cp-lead">The first capital was <b>Gulbarga</b>, renamed <b>Ahsanabad</b>. The first ruler was liberal to Hindus and <b>banned Jaziya</b>. His successor <b>Muhammad Shah I</b> was at war with Vijayanagara and Warangal again and again.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/24.png" alt="Timeline with four boxes: 1347 Gulbarga capital, 1358 Muhammad Shah I wars, 1422 capital m" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Shihabuddin Ahmed I</b> (1422–36) moved the capital to <b>Bidar</b> and renamed it <b>Muhammadabad</b>. People called him <b>'Ahmed Shah Wali'</b> (Saint Ahmed). <b>Humayun Shah</b> (1458–61) was so cruel that he was called <b>'Zalim'</b> and the <b>'Nero of the Deccan'</b>. After him a minister, <b>Mahmud Gawan</b>, ran the state.</p>
      <div class="cp-note trap">Gulbarga was the first capital (Ahsanabad), and Bidar was the second (Muhammadabad). Do not swap them.</div>
      <div class="cp-note exam">Remember 1347, Hasan Gangu, Gulbarga then Bidar, and Humayun Shah as the Nero of the Deccan.</div>
    `
  },
  36: {
    questext: "The Bahmani Sultanate was founded in 1347 by",
    options: ["Malik Ahmed", "Zafar Khan (Hasan Gangu)", "Yusuf Adil Shah", "Fateh Ullad Imad"],
    correct: "2",
    exptext: "✅ Zafar Khan, also called Hasan Gangu, founded it with the title Alauddin Hasan Bahman Shah. 📌 Gangu with Gulbarga. ❌ Yusuf Adil Shah is wrong because he founded the Bijapur Sultanate later."
  },
  37: {
    questext: "Which Bahmani ruler moved the capital from Gulbarga to Bidar?",
    options: ["Shihabuddin Ahmed I", "Hasan Gangu", "Muhammad Shah I", "Humayun Shah"],
    correct: "1",
    exptext: "✅ Shihabuddin Ahmed I moved the capital to Bidar and renamed it Muhammadabad. 📌 Ahmed moved to Bidar. ❌ Hasan Gangu is wrong because he had made Gulbarga his capital."
  },
  38: {
    questext: "The Bahmani ruler Humayun Shah, who was extremely cruel, was called",
    options: ["Wali", "Khan-e-Khana", "Gajabetekara", "Nero of the Deccan"],
    correct: "4",
    exptext: "✅ Humayun Shah was called Zalim and the Nero of the Deccan. 📌 Nero was a cruel Roman ruler. ❌ Wali is wrong because that name belongs to Ahmed Shah, the Saint."
  },
  39: {
    type: "concept", icon: "🎓", accent: "#10b981", pauseTimer: true,
    title: "Mahmud Gawan and the End of the Bahmani Sultanate",
    html: `
      <p class="cp-lead"><b>Mahmud Gawan</b> was a Persian who became the prime minister of the Bahmani ruler <b>Muhammad Shah III</b>. He was the most able man in the Bahmani court.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/25.png" alt="Mahmud Gawan Madrasa Bidar photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">He built a <b>madrasa at Bidar</b> in <b>1472</b>. He also divided the kingdom into <b>eight tarafs</b> (provinces). In <b>1481</b> he was executed. After this the Sultanate broke up, and by about 1527 it had ended.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Origin</td><td>Persian</td></tr><tr><td>Post</td><td>Prime minister of Muhammad Shah III</td></tr><tr><td>1472</td><td>Madrasa at Bidar</td></tr><tr><td>Provinces</td><td>Eight tarafs</td></tr><tr><td>1481</td><td>Executed</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/26.png" alt="Simple picture: a large circle labelled Bahmani kingdom divided into eight equal slices la" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Mahmud Gawan was a prime minister and not a Sultan. He ran the state under Humayun Shah's successors, but was executed in 1481.</div>
      <div class="cp-note exam">Remember the madrasa at Bidar in 1472, eight tarafs and the date of his execution, 1481.</div>
    `
  },
  40: {
    questext: "Who built a famous madrasa at Bidar in 1472 and divided the Bahmani kingdom into eight provinces called tarafs?",
    options: ["Hasan Gangu", "Ahmed Shah Wali", "Mahmud Gawan", "Yusuf Adil Shah"],
    correct: "3",
    exptext: "✅ Mahmud Gawan built the madrasa and made eight tarafs. 📌 Gawan and Gulbarga both start with a G, but he is the Bidar minister. ❌ Ahmed Shah Wali is wrong because he moved the capital to Bidar but did not make the tarafs."
  },
  41: {
    type: "concept", icon: "🏙️", accent: "#eab308", pauseTimer: true,
    title: "The Five Deccan Sultanates",
    html: `
      <p class="cp-lead">After the Bahmani Sultanate broke up, <b>five</b> successor Sultanates rose from its ruins.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/27.png" alt="Gol Gumbaz Bijapur Karnataka photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Successor state</th><th>Dynasty</th><th>Year</th><th>Founder</th></tr></thead><tbody><tr><td>Bijapur</td><td>Adilshahi</td><td>1489</td><td>Yusuf Adil Shah</td></tr><tr><td>Ahmednagar</td><td>Nizamshahi</td><td>1490</td><td>Malik Ahmed</td></tr><tr><td>Berar</td><td>Imadshahi</td><td>declared 1484, independent 1490</td><td>Fateh Ullad Imad</td></tr><tr><td>Golconda</td><td>Qutubshahi</td><td>1518</td><td>Quli Qutub Shah</td></tr><tr><td>Bidar</td><td>Baridshahi</td><td>1526</td><td>Amir Ali Barid</td></tr></tbody></table>
      <p class="cp-lead">Learn each state with its dynasty and founder. For example, <b>Bijapur</b> goes with the <b>Adilshahi</b> dynasty and <b>Yusuf Adil Shah</b>, and <b>Golconda</b> goes with the <b>Qutubshahi</b> dynasty and <b>Quli Qutub Shah</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/28.png" alt="Five boxes in a row, each with the state, dynasty and founder: Bijapur Adilshahi Yusuf Adi" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Four of these states fought at Bannihatti in 1565. Berar did not.</div>
      <div class="cp-note exam">Remember Adil, Nizam, Imad, Qutub and Barid as the second part of the dynasty name, each with its state.</div>
    `
  },
  42: {
    questext: "The Adilshahi dynasty, founded in 1489 by Yusuf Adil Shah, ruled which Deccan Sultanate?",
    options: ["Bijapur", "Ahmednagar", "Berar", "Golconda"],
    correct: "1",
    exptext: "✅ The Adilshahi dynasty ruled Bijapur. 📌 Adil and Bijapur together. ❌ Ahmednagar is wrong because it was ruled by the Nizamshahi dynasty."
  },
  43: {
    questext: "Quli Qutub Shah founded the Qutubshahi dynasty in 1518 at",
    options: ["Bidar", "Berar", "Ahmednagar", "Golconda"],
    correct: "4",
    exptext: "✅ The Qutubshahi dynasty ruled Golconda. 📌 Qutub and Golconda both have a strong sound. ❌ Bidar is wrong because it was ruled by the Baridshahi dynasty."
  },
  44: {
    type: "concept", icon: "🗺️", accent: "#0ea5e9", pauseTimer: true,
    title: "Foreign Travellers and Famous Monuments",
    html: `
      <p class="cp-lead">Foreign visitors wrote about the empires of the Deccan. Matching each traveller with a ruler is a favourite exam question.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/29.png" alt="Charminar Hyderabad photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Traveller</th><th>Ruler visited</th></tr></thead><tbody><tr><td>Nicolo De Conti</td><td>Deva Raya I</td></tr><tr><td>Abdur Razzaq (1442–43, envoy of Shah Rukh)</td><td>Deva Raya II</td></tr><tr><td>Domingo Paes (about 1520)</td><td>Krishnadeva Raya</td></tr><tr><td>Friar Louis (ambassador of Albuquerque)</td><td>Krishnadeva Raya</td></tr></tbody></table>
      <p class="cp-lead"><b>Fernao Nuniz</b> wrote a chronicle about <b>1535–37</b> in the time of Achyuta Deva Raya. <b>Domingo Paes</b>, a Portuguese traveller, saw the court of Krishnadeva Raya about <b>1520</b> and said that Vijayanagara was as grand as <b>Rome</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/30.png" alt="Matching picture with four boxes on the left (De Conti, Razzaq, Paes, Louis) and three on " style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Gol Gumbaz</b> at Bijapur is the tomb of <b>Muhammad Adil Shah</b> (1656). It has one of the world's largest domes and a <b>whispering gallery</b>. The <b>Charminar</b> in Hyderabad was built by <b>Muhammad Quli Qutub Shah</b> in <b>1591</b>. <b>Hampi</b> became a World Heritage Site of the United Nations Educational, Scientific and Cultural Organization (UNESCO) in <b>1986</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/31.png" alt="Hampi UNESCO World Heritage Site ruins photo" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Nicolo De Conti visited Deva Raya I, Abdur Razzaq visited Deva Raya II, and Domingo Paes and Friar Louis were linked to Krishnadeva Raya. Do not shift them between rulers.</div>
      <div class="cp-note exam">Remember Gol Gumbaz for Bijapur, Charminar for Hyderabad (1591) and Hampi as a World Heritage Site in 1986.</div>
    `
  },
  45: {
    questext: "The Gol Gumbaz, with its whispering gallery, is the tomb of Muhammad Adil Shah in which city?",
    options: ["Golconda", "Bijapur", "Bidar", "Ahmednagar"],
    correct: "2",
    exptext: "✅ The Gol Gumbaz stands at Bijapur. 📌 Gol Gumbaz and Bijapur both end with a hard sound. ❌ Golconda is wrong because the Charminar is linked to that region."
  },
  46: {
    questext: "Hampi was declared a World Heritage Site by the United Nations Educational, Scientific and Cultural Organization in",
    options: ["1978", "1983", "1986", "1992"],
    correct: "3",
    exptext: "✅ Hampi became a World Heritage Site in 1986. 📌 Hampi 1986. ❌ 1978 is wrong because that year was before the Hampi listing."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gold-lined stone chariot of Hampi, a Gol Gumbaz style dome and an old gold coin" },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Atala Masjid Jaunpur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/1.png. the Atala Masjid of Jaunpur, with its large central gateway",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/2.png": { t: "fig", about: "Timeline with four boxes: 1399 Malik Sarwar dies, 1406 Ibrahim wins Kannauj, 1408 Atala Masjid, 1470 Jama Masjid." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/3.png": { t: "fig", about: "Schematic, not a map: two big boxes side by side. Left box: Vijayanagara, Hindu, south of the Tungabhadra. Right box: Bahmani, Muslim Sultanate, north of it. A zigzag line between them labelled constant war." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hampi Virupaksha Temple Tungabhadra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/4.png. Hampi and the Tungabhadra river",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Anegundi Anagundi Fort Karnataka photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/5.png. the hills and ruins of Anegundi near Hampi",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/6.png": { t: "fig", about: "Simple schematic, not a map: a line running from Anagundi at the top to Rameshwaram at the bottom, with Hoysala 1346 marked on the upper part and Madurai and Cheras on the lower part." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tungabhadra Dam river Hampi irrigation canal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/7.png. the Tungabhadra river with a canal or dam",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/8.png": { t: "fig", about: "Three-box timeline: Harihara II titles and Goa, Deva Raya I defeat by Firuz Shah and marriage, 1410 dam on the Tungabhadra." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vijayanagara Elephant Stable Hampi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/9.png. the Elephant Stables at Hampi",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/10.png": { t: "fig", about: "Mind map with Deva Raya II in the centre and four branches: Ceylon shores, army with Muslim soldiers, Arab horses, Sanskrit writer." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Krishnadeva Raya statue portrait Hampi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/11.png. a statue or painting of Krishnadeva Raya",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/12.png": { t: "fig", about: "Flow picture: Orissa returns land up to the Krishna, then Bijapur and Orissa join against him, then 1520 Raichur victory, then Vijayanagara becomes strongest." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vitthala Temple Stone Chariot Hampi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/13.png. the stone chariot of the Vitthala temple at Hampi",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/14.png": { t: "fig", about: "Simple picture with three boxes: Poet with Amuktamalyada Telugu, Builder with Vitthalaswamy and Tirupati temples, Court with eight poets Ashtadiggajas." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Talikota battle 1565 Vijayanagara ruins Hampi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/15.png. the ruins of Hampi after the defeat of 1565",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/16.png": { t: "fig", about: "Simple picture: Rama Raja at the centre, four arrows coming from Ahmednagar, Bijapur, Bidar and Golconda, and a small cross mark over Berar with the label absent." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Penugonda Fort Andhra Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/17.png. the hill fort of Penugonda",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/18.png": { t: "fig", about: "Simple chain: Tirumala II, Sri Ranga, Venkata II 1586-1614, Sri Ranga III 1642-46, each in its own box, with a note Capital moved to Penugonda." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/19.png": { t: "fig", about: "Pyramid diagram with the King (Rai) at the top, then Council with Pradhanni at the head and Sabhanayak as president, then Nayaks, then provinces and villages." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hampi Mahanavami Dibba platform photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/20.png. the Mahanavami Dibba platform at Hampi",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/21.png": { t: "fig", about: "Four boxes in a row: Bhandarwad direct state control, Brahmadeya tax-free grants, Amaram large land to Nayaks, Rattakodaigai tax-free for bravery." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vijayanagara gold varaha coin Pagoda photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/22.png. a gold varaha or pagoda coin of Vijayanagara",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gulbarga Fort Jama Masjid Karnataka photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/23.png. the old fort and mosque of Gulbarga",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/24.png": { t: "fig", about: "Timeline with four boxes: 1347 Gulbarga capital, 1358 Muhammad Shah I wars, 1422 capital moves to Bidar, 1458 Humayun Shah cruel ruler." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahmud Gawan Madrasa Bidar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/25.png. the ruined Mahmud Gawan madrasa at Bidar",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/26.png": { t: "fig", about: "Simple picture: a large circle labelled Bahmani kingdom divided into eight equal slices labelled tarafs, with a small label Mahmud Gawan at the centre." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gol Gumbaz Bijapur Karnataka photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/27.png. the huge dome of Gol Gumbaz at Bijapur",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/28.png": { t: "fig", about: "Five boxes in a row, each with the state, dynasty and founder: Bijapur Adilshahi Yusuf Adil Shah, Ahmednagar Nizamshahi Malik Ahmed, Berar Imadshahi Fateh Ullad Imad, Golconda Qutubshahi Quli Qutub Shah, Bidar Baridshahi Amir Ali Barid." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Charminar Hyderabad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/29.png. Charminar in Hyderabad",
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/30.png": { t: "fig", about: "Matching picture with four boxes on the left (De Conti, Razzaq, Paes, Louis) and three on the right (Deva Raya I, Deva Raya II, Krishnadeva Raya) joined with lines." },
  "images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hampi UNESCO World Heritage Site ruins photo\". Download a clear, suitable photo and save it as images/General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms/31.png. wide view of the ruins of Hampi"
});

/* CHANGE LOG
   - Fernao Nuniz wrote his chronicle about 1535–37 in the time of Achyuta Deva Raya, so he is not linked to Deva Raya II. Domingo Paes (about 1520) is linked to Krishnadeva Raya.
   - Sadashiva Raya is written as a Tuluva prince who ruled in name while Rama Raya held the real power; he is not named as a son of Krishnadeva Raya.
   - The title 'Andhra Pitamaha' is left out of Krishnadeva Raya's titles because it is usually given to the poet Allasani Peddana.
   - The Aravidu dynasty is given as about 1570 to 1650, since the end year varies.
   - Short forms such as c., PM and UNESCO were written in full.
*/
