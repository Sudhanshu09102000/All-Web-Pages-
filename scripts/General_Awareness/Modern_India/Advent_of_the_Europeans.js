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

/* ═══ SNIPPET 4 — put right after SNIPPET 3 ═══ */
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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Advent_of_the_Europeans · 7 concept pages (+ overview) · 28 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🚢", accent: "#0ea5e9", pauseTimer: true,
    title: "Class Overview — Advent of the Europeans",
    thumb: {
      image: "images/General_Awareness/Modern_India/Advent_of_the_Europeans/thumbnail.png",
      banner: "MODERN INDIA 2026",
      line1: "ADVENT OF",
      line2: "THE EUROPEANS",
      line3: "5 COMPANIES",
      badge: "FULL CLASS",
      ribbon: "DATES • FORTS • FACTORIES",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Advent of the Europeans | Portuguese Dutch English Danes French | Modern India",
      altTitles: ["Advent of Europeans in India in One Class", "Five European Companies in India: Dates, Forts, Factories"],
      description: "Advent of the Europeans is one of the most repeated chapters of Modern India. In this class we learn, step by step, why the Europeans searched for sea routes and how five nations reached India.\n\n📌 IN THIS CLASS\n✅ Fall of Constantinople and new sea routes\n✅ Portuguese: Vasco da Gama, Albuquerque, Goa\n✅ Dutch, English, Danes and French companies\n✅ First factories, forts, farmans and wars\n✅ Comparison table of all five nations\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share and subscribe.\n\n#SSCCGL #ModernIndia #History",
      tags: ["advent of europeans", "advent of europeans in india", "modern india history", "european companies in india", "portuguese in india", "vasco da gama", "dutch east india company", "british east india company", "french in india", "danes in india", "tranquebar", "pondicherry", "farrukhsiyar farman 1717", "ssc cgl history", "ssc cgl modern history", "indian history for ssc", "static gk for ssc", "general awareness ssc", "railway ntpc history", "banking history gk", "history mcq", "history one shot", "history crash course", "carnatic wars", "SSC CGL"],
      hashtags: ["SSCCGL", "ModernIndia", "History"],
      thumbText: "ADVENT OF THE EUROPEANS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🚢 New class is live: Advent of the Europeans. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how the Portuguese, Dutch, English, Danes and French came to India by sea</u>. This chapter gives many direct questions in every history paper, so we will learn the dates, places and rivalries one by one.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>7</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>28</b><span>Questions</span></div>
        <div class="cp-stat"><b>~42 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Why Europeans Needed New Sea Routes</b><br>How the fall of Constantinople and the trade monopoly of Venice and Genoa pushed Spain and Portugal to search for a sea route to India.</li>
        <li><b>Portuguese — First to Arrive</b><br>From Bartholomew Dias and Vasco da Gama to Albuquerque, Goa and the decline of Portuguese power.</li>
        <li><b>Dutch (Netherlands)</b><br>How the Dutch company was formed, what it traded, and why it left India for Indonesia.</li>
        <li><b>British East India Company</b><br>The charter of 1600, the early voyages, the first factories, forts and the famous farman of 1717.</li>
        <li><b>Danes (Denmark)</b><br>A small company with forts at Tranquebar and Serampore that sold everything to the British in 1845.</li>
        <li><b>French — Last to Arrive</b><br>The founding of Pondicherry, the Carnatic Wars and the towns France kept until 1954.</li>
        <li><b>The Five Companies at a Glance</b><br>A comparison of all five nations: company, year, first factory, main forts and final fate.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Staff Selection Commission papers repeat first factories, founding years, forts and battles from this chapter again and again, and the same ideas lead directly into the Carnatic Wars and the rise of British power.</div>
    `
  },
  2: {
    type: "concept", icon: "🧭", accent: "#f59e0b", pauseTimer: true,
    title: "Why Europeans Needed New Sea Routes",
    html: `
      <p class="cp-lead">Before 1453, spices and silk reached Europe by old land and sea routes controlled by others. <u>When those routes closed, Europe had to find a new way to India by sea.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/1.png" alt="Schematic world sketch with an old overland route in red marked BLOCKED at Constantinople " data-caption="Constantinople blocked the old overland route, so Europeans looked for a sea route to India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/2.png" alt="Constantinople Ottoman conquest 1453 painting" data-caption="The Ottoman Turks captured Constantinople in 1453 and closed the old overland route." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/3.png" alt="Simple picture of a cow in winter and a plate of spiced meat, with the words NO FODDER and" data-caption="In winter there was no fodder for cattle, so spices were needed to preserve and flavour meat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Reason</th><th>What happened</th></tr></thead><tbody><tr><td>Fall of Constantinople</td><td>In 1453 the Ottoman Turks captured it, and the overland route to Asia was blocked</td></tr><tr><td>Arab control</td><td>Arabs held the old East-West trade routes and charged high prices</td></tr><tr><td>Value of spices</td><td>Spices were precious because winter left cattle without food, so meat was preserved with spices</td></tr><tr><td>Italian monopoly</td><td>Venice and Genoa controlled Europe-Asia trade and would not share the routes</td></tr></tbody></table>
      <p class="cp-lead">Spain and Portugal were on the Atlantic coast and had no share in the old trade. So they decided to look for a sea route to India for themselves.</p>
      <div class="cp-note trap">The key year is 1453, the year Constantinople fell to the Ottoman Turks. Do not confuse it with 1498, the year Vasco da Gama reached Calicut.</div>
      <div class="cp-note exam">Questions often ask which two countries first sought a sea route to India. The answer is Spain and Portugal.</div>
    `
  },
  3: {
    questext: "In which year did the Ottoman Turks capture Constantinople, blocking the old overland route between Europe and Asia?",
    options: ["1453", "1492", "1498", "1526"],
    correct: "1",
    exptext: "✅ The Ottoman Turks captured Constantinople in 1453. 📌 Remember 1453 as the end of the old land route. ❌ 1498 is wrong because that is the year Vasco da Gama reached Calicut by sea."
  },
  4: {
    questext: "Which two Italian city states monopolised the trade between Europe and Asia and refused to share the trade routes?",
    options: ["Rome and Naples", "Venice and Genoa", "Milan and Florence", "Pisa and Turin"],
    correct: "2",
    exptext: "✅ Venice and Genoa controlled the trade between Europe and Asia. 📌 Think of Venice for its ships and Genoa for its sailors. ❌ Rome and Naples are Italian cities, but they did not hold the Asia trade."
  },
  5: {
    questext: "Consider the following statements about the search for new sea routes:\n1. Spain and Portugal were the first European countries to seek a sea route to India.\n2. Spices were valuable in Europe because they helped to preserve and flavour meat in winter.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Winter left cattle unfed, so meat was kept with spices. ❌ Saying only one is true is wrong because Spain and Portugal also led the search for the sea route."
  },
  6: {
    type: "concept", icon: "⛵", accent: "#ef4444", pauseTimer: true,
    title: "Portuguese — First to Arrive",
    html: `
      <p class="cp-lead">The Portuguese were the first Europeans to reach India by sea and the last to leave it. <u>Their story runs from Dias in 1487 to the recapture of Goa in 1961.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/4.png" alt="Vasco da Gama Calicut arrival painting" data-caption="Vasco da Gama landed at Calicut in 1498 and met the ruler called the Zamorin." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/5.png" alt="Goa Old Churches Basilica of Bom Jesus photo" data-caption="The Basilica of Bom Jesus in Old Goa recalls Portuguese rule in Goa." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/6.png" alt="Timeline with five boxes: 1487 Dias, 1498 Da Gama, 1510 Goa taken, 1661 Bombay dowry, 1961" data-caption="A timeline of the main Portuguese events in India from 1487 to 1961." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1487</td><td>Bartholomew Dias rounded the Cape of Good Hope</td></tr><tr><td>1494</td><td>Treaty of Tordesillas: Portugal east and Spain west of an Atlantic line</td></tr><tr><td>1498</td><td>Vasco da Gama reached Calicut, guided by the Gujarati merchant Abdul Majid</td></tr><tr><td>1500</td><td>Pedro Alvares Cabral set up the first Portuguese factory at Calicut</td></tr><tr><td>1510</td><td>Alfonso de Albuquerque took Goa from the Bijapur Sultan</td></tr><tr><td>1661</td><td>Bombay went to the English as the dowry of Catherine of Braganza</td></tr><tr><td>1961</td><td>The Government of India recaptured Goa, Daman and Diu</td></tr></tbody></table>
      <p class="cp-lead">Vasco da Gama was welcomed by the Hindu ruler called the Zamorin, though Arab traders opposed him. Spices sold at home for about 60 times the cost of the voyage, which made the trade hugely profitable.</p>
      <p class="cp-lead">Francisco de Almeida, the first Portuguese Viceroy, followed the Blue Water Policy, which meant ruling the sea instead of building many forts on land. Albuquerque is seen as the real founder of Portuguese power in India.</p>
      <div class="cp-note trap">Columbus reached America in 1492 while looking for India, but Vasco da Gama reached India in 1498. Do not mix the two.</div>
      <div class="cp-note remember">The Portuguese introduced tobacco, the potato, the tomato, shipbuilding and the printing press to India. They were the first to arrive and the last to leave.</div>
    `
  },
  7: {
    questext: "Who reached Calicut in 1498 and opened the sea route from Europe to India?",
    options: ["Bartholomew Dias", "Pedro Alvares Cabral", "Vasco da Gama", "Christopher Columbus"],
    correct: "3",
    exptext: "✅ Vasco da Gama reached Calicut on 20 May 1498. 📌 Da Gama means India by sea in 1498. ❌ Dias only reached the Cape of Good Hope in 1487, and Columbus sailed west to America."
  },
  8: {
    questext: "Which Portuguese governor captured Goa from the Bijapur Sultan in 1510?",
    options: ["Francisco de Almeida", "Nuno da Cunha", "Pedro Alvares Cabral", "Alfonso de Albuquerque"],
    correct: "4",
    exptext: "✅ Alfonso de Albuquerque took Goa in 1510 and made it the Portuguese capital in India. 📌 Albuquerque means Goa. ❌ Almeida was the first Viceroy, but his policy was the Blue Water Policy, not the capture of Goa."
  },
  9: {
    questext: "Which one of the following was given to the English by the Portuguese as the dowry of Catherine of Braganza in 1661?",
    options: ["Goa", "Bombay", "Diu", "Daman"],
    correct: "2",
    exptext: "✅ Bombay was given to Charles the Second of England as the dowry of Catherine of Braganza. 📌 Bombay came with the bride. ❌ Goa, Daman and Diu stayed with Portugal until 1961."
  },
  10: {
    questext: "Consider the following statements about the Portuguese in India:\n1. The Portuguese were the last European power to leave India.\n2. Vasco da Gama was guided to Calicut by the Gujarati merchant Abdul Majid.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct, because Goa, Daman and Diu were recaptured only in 1961. 📌 First to arrive, last to leave. ❌ Choosing only one fails, because Abdul Majid did guide Da Gama."
  },
  11: {
    questext: "The Treaty of Tordesillas of 1494 divided the newly found world between which two countries?",
    options: ["Spain and Portugal", "England and France", "Portugal and the Netherlands", "Spain and England"],
    correct: "1",
    exptext: "✅ The treaty set an Atlantic line, with Portugal to the east and Spain to the west. 📌 Tordesillas means two Iberian rivals. ❌ England and France were not part of this treaty."
  },
  12: {
    type: "concept", icon: "🌷", accent: "#f97316", pauseTimer: true,
    title: "Dutch (Netherlands)",
    html: `
      <p class="cp-lead">The Dutch came to India for trade, but their real interest was the spice islands of Indonesia. <u>They formed one strong company in 1602 and later left India to focus on Indonesia.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/7.png" alt="Dutch fort Pulicat Tamil Nadu ruins photo" data-caption="The Dutch fort at Pulicat was one of their main bases on the Coromandel coast." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/8.png" alt="Simple map-like schematic, not a map: Netherlands at left, arrow to India (textiles), arro" data-caption="The Dutch earned most from the spice islands of Indonesia, with Batavia as their capital." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1596</td><td>Cornelis de Houtman, the first Dutchman to reach Sumatra and Bantam</td></tr><tr><td>March 1602</td><td>The Dutch Parliament formed the Vereenigde Oostindische Compagnie, called the VOC</td></tr><tr><td>1605</td><td>First Dutch factory at Masulipatnam</td></tr><tr><td>1623</td><td>Amboyna Massacre: the Dutch killed 20 men, 10 of them English</td></tr><tr><td>1759</td><td>The English defeated the Dutch at Bedara, which ended Dutch power</td></tr></tbody></table>
      <p class="cp-lead">The Dutch ousted the Portuguese from the spice islands and renamed Jayakarta as Batavia, which is today called Jakarta. Their main exports from India were indigo, saltpetre and cotton textiles. They made Indian textiles an important export.</p>
      <p class="cp-lead">After the Amboyna Massacre of 1623 the English quit Indonesia and the Dutch quit India. In 1741 the Travancore ruler Marthand Varma defeated the Dutch at Colachel, and in 1759 the English finished the Dutch at Bedara, also called Chinsurah.</p>
      <div class="cp-note trap">The Dutch company (VOC) was formed in 1602 and the English company in 1600, so the English company is two years older. Do not reverse them.</div>
      <div class="cp-note exam">Batavia was the Dutch capital in Asia. Masulipatnam in 1605 was the first Dutch factory in India.</div>
    `
  },
  13: {
    questext: "Where was the first Dutch factory in India established in 1605?",
    options: ["Masulipatnam", "Calicut", "Surat", "Cochin"],
    correct: "1",
    exptext: "✅ The first Dutch factory was at Masulipatnam in 1605. 📌 Dutch, 1605, Masulipatnam. ❌ Surat held the first English factory in 1613, and Calicut held the first Portuguese factory in 1500."
  },
  14: {
    questext: "Which place served as the capital of the Dutch in Asia?",
    options: ["Pulicat", "Batavia", "Chinsurah", "Cochin"],
    correct: "2",
    exptext: "✅ The Dutch renamed Jayakarta as Batavia and made it their capital. 📌 Batavia is modern Jakarta. ❌ Pulicat and Cochin were only Indian bases, so they could not be the Asian capital."
  },
  15: {
    questext: "The battle that ended Dutch power in India was fought in 1759 at which place?",
    options: ["Swally", "Wandiwash", "Colachel", "Bedara"],
    correct: "4",
    exptext: "✅ The English won the battle at Bedara, also called Chinsurah, in November 1759. 📌 Bedara 1759 ended the Dutch. ❌ Colachel in 1741 was the earlier defeat by Marthand Varma, but it did not end Dutch power."
  },
  16: {
    questext: "Consider the following statements about the Dutch in India:\n1. The Dutch company was formed by the Dutch Parliament in 1602.\n2. After the Amboyna Massacre the Dutch left Indonesia and concentrated on India.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 After 1623 the Dutch left India and kept Indonesia. ❌ Statement 2 is reversed, because the English quit Indonesia and the Dutch quit India."
  },
  17: {
    type: "concept", icon: "🇬🇧", accent: "#3b82f6", pauseTimer: true,
    title: "British East India Company",
    html: `
      <p class="cp-lead">The English company began as a small band of merchants and slowly became the ruler of India. <u>We follow it through its charter, its first factories and the farman that gave it free trade.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/9.png" alt="Fort St George Chennai photo" data-caption="Fort St George at Madras was built in 1639 and became an English base." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/10.png" alt="Fort William Kolkata photo" data-caption="Fort William at Calcutta was built after 1698 and named after King William the Third." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/11.png" alt="Timeline of English steps: 1600 Charter, 1608 Hawkins, 1612 Swally, 1615 Roe, 1639 Madras," data-caption="The main early steps of the English company in India, from 1600 to 1717." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>31 Dec 1600</td><td>Elizabeth the First gave the Royal Charter, a 15-year monopoly; James the First made it indefinite in 1609</td></tr><tr><td>1608</td><td>William Hawkins reached the court of Jahangir</td></tr><tr><td>1612</td><td>Captain Best defeated the Portuguese at Swally near Surat</td></tr><tr><td>1613</td><td>First English factory at Surat by the farman of Jahangir</td></tr><tr><td>1615</td><td>Sir Thomas Roe reached court and won permission for factories</td></tr><tr><td>1639</td><td>Madras and Fort St George, land from the Chandragiri ruler</td></tr><tr><td>1651</td><td>Factories in Bengal, including Hooghly and Patna</td></tr><tr><td>1668</td><td>Bombay passed from the Crown to the company</td></tr><tr><td>1698</td><td>Zamindari of Sutanuti, Kalikata and Gobindpur; Fort William built</td></tr><tr><td>1700</td><td>Sir Charles Eyre became the first president of the Eastern Presidency</td></tr></tbody></table>
      <p class="cp-lead">In 1599 the Merchant Adventurers formed the Governor and Company of Merchants of London Trading to the East Indies. William Hawkins carried a letter from James the First and was given a high rank, but he left in 1611 without success.</p>
      <p class="cp-lead">Sir Thomas Roe stayed at the court of Jahangir from 1615 to 1619 and won permission for factories anywhere in the empire. By 1623 the English had factories at Agra and Ahmedabad. In 1651 they obtained a yearly payment of 3,000 rupees from Shah Shuja to trade freely in Bengal.</p>
      <div class="cp-formula" translate="no"><small>Farman of 1717 (Farrukhsiyar)</small>Free trade for a fixed payment of 3,000 rupees a year</div>
      <p class="cp-lead">The farman of 1717 gave free trade in return for a fixed payment of 3,000 rupees a year. It also allowed the company's coins, minted at Bombay, to be used across the empire. Historian Orme called it the Magna Carta of the Company.</p>
      <div class="cp-note trap">Two different firsts are asked at Surat. The English factory at Surat in 1613 came from Jahangir, but the French factory at Surat in 1667 was set up by Francis Caron.</div>
      <div class="cp-note exam">Calcutta became the capital of British India from 1774 to 1911. Fort William is named after King William the Third.</div>
    `
  },
  18: {
    questext: "The Royal Charter that gave the English East India Company a monopoly of eastern trade was granted by which ruler in 1600?",
    options: ["James the First", "Elizabeth the First", "Charles the Second", "Henry the Eighth"],
    correct: "2",
    exptext: "✅ Queen Elizabeth the First gave the charter on 31 December 1600. 📌 Elizabeth gave it and James made it endless in 1609. ❌ James the First is wrong because he only made the monopoly indefinite later."
  },
  19: {
    questext: "Which English envoy stayed at the court of Jahangir from 1615 to 1619 and obtained permission to set up factories?",
    options: ["William Hawkins", "Sir Thomas Roe", "Captain Best", "Sir Charles Eyre"],
    correct: "2",
    exptext: "✅ Sir Thomas Roe won the right to trade and set up factories across the empire. 📌 Roe means rights. ❌ Hawkins came earlier in 1608 but failed, and Captain Best won the sea fight at Swally."
  },
  20: {
    questext: "The Farman of 1717 giving the English company free trade for a fixed yearly payment of 3,000 rupees was issued by which Mughal emperor?",
    options: ["Jahangir", "Shah Jahan", "Farrukhsiyar", "Aurangzeb"],
    correct: "3",
    exptext: "✅ Emperor Farrukhsiyar issued it after a company doctor, William Hamilton, cured him. 📌 Farrukhsiyar means farman 1717. ❌ Jahangir gave only the earlier farman of 1613 for the Surat factory."
  },
  21: {
    questext: "Fort St George was built by the English in 1639 at which place?",
    options: ["Calcutta", "Bombay", "Surat", "Madras"],
    correct: "4",
    exptext: "✅ The English built Fort St George at Madras on land from the Chandragiri ruler. 📌 Madras, St George, 1639. ❌ Fort William belongs to Calcutta, and Surat had a factory, not this fort."
  },
  22: {
    questext: "Consider the following statements about the English company in India:\n1. Fort William at Calcutta is named after King William the Third.\n2. The first English factory in India was set up at Surat in 1613 with the permission of Jahangir.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 William three gave the name, Jahangir gave Surat. ❌ Only one is wrong because the fort was named after King William and the factory did come in 1613."
  },
  23: {
    questext: "Which of the following places was granted to the English as a zamindari in 1698 and later became the city of Calcutta?",
    options: ["Sutanuti, Kalikata and Gobindpur", "Hooghly, Patna and Dhaka", "Madras, Pulicat and Surat", "Bombay, Bassein and Diu"],
    correct: "1",
    exptext: "✅ Azim-ush-Shan granted the zamindari of these three villages, which grew into Calcutta. 📌 Three villages made one city. ❌ The other groups are real places, but they are not the villages that formed Calcutta."
  },
  24: {
    type: "concept", icon: "🏰", accent: "#ec4899", pauseTimer: true,
    title: "Danes (Denmark)",
    html: `
      <p class="cp-lead">The Danes were a small trading power with only a few settlements in India. <u>They never grew strong, and they sold everything to the British in 1845.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/12.png" alt="Fort Dansborg Tranquebar Tamil Nadu photo" data-caption="Fort Dansborg at Tranquebar was the main Danish fort on the Bay of Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/13.png" alt="Serampore College West Bengal photo" data-caption="Serampore in Bengal was the Danish headquarters and a centre of Christian missionary work." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1616</td><td>The Danish East India Company was formed; Admiral Ove Gjedde first led it to India</td></tr><tr><td>1620</td><td>Treaty with Raghunatha Nayak of Thanjavur; Tranquebar became a Danish base</td></tr><tr><td>1706</td><td>First Protestant missionaries in India, Ziegenbalg and Plutschau, reached Tranquebar</td></tr><tr><td>1800</td><td>William Carey worked at Serampore</td></tr><tr><td>1845</td><td>The Danes sold all their Indian settlements to the British</td></tr></tbody></table>
      <p class="cp-lead">The Danes built Fort Dansborg at Tranquebar in Tamil Nadu on the Bay of Bengal, after taking land from villages near it despite Portuguese resistance. Serampore near Calcutta was their headquarters.</p>
      <div class="cp-note exam">Tranquebar is linked with the Danes and with the first Protestant missionaries in India.</div>
    `
  },
  25: {
    questext: "Fort Dansborg, a fort of the Danes, was built at which place?",
    options: ["Pondicherry", "Serampore", "Tranquebar", "Chandernagore"],
    correct: "3",
    exptext: "✅ Fort Dansborg stands at Tranquebar in Tamil Nadu. 📌 Danes, Dansborg, Tranquebar. ❌ Serampore was their headquarters but not the site of this fort."
  },
  26: {
    questext: "The Danish settlements in India were sold to which power in 1845?",
    options: ["The French", "The Dutch", "The Portuguese", "The British"],
    correct: "4",
    exptext: "✅ The Danes never grew strong and sold all their Indian settlements to the British in 1845. 📌 1845 is the year the Danes left. ❌ The French and Dutch had their own settlements and did not buy these."
  },
  27: {
    type: "concept", icon: "🥐", accent: "#8b5cf6", pauseTimer: true,
    title: "French — Last to Arrive",
    html: `
      <p class="cp-lead">The French were the last major European company to come to India. <u>Their company was run and paid for by the king, and they lost the long fight against the English.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/14.png" alt="Pondicherry French Quarter street photo" data-caption="Pondicherry still shows French buildings and streets from its time as a French town." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/15.png" alt="Chandernagore Strand ghat West Bengal photo" data-caption="Chandernagore on the Hooghly river was a French town in Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/16.png" alt="Timeline: 1664 Company formed, 1667 Surat, 1673 Pondicherry, 1760 Wandiwash, 1954 towns re" data-caption="A timeline of French events in India from the company in 1664 to 1954." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1664</td><td>Compagnie des Indes Orientales formed by Colbert under Louis the Fourteenth</td></tr><tr><td>1667</td><td>Francis Caron set up the first French factory at Surat</td></tr><tr><td>1669</td><td>Factory at Masulipatnam with the permission of Golconda</td></tr><tr><td>1673</td><td>Pondicherry founded by Francois Martin, and Chandernagore founded</td></tr><tr><td>1760</td><td>Eyre Coote beat Lally at Wandiwash, deciding the Third Carnatic War</td></tr><tr><td>1954</td><td>Pondicherry, Karikal, Mahe, Yanam and Chandernagore passed to India</td></tr></tbody></table>
      <p class="cp-lead">Unlike the other companies, the French company was formed and controlled by the government. Francois Martin took villages from the Subedar of Valikondapuram and built Fort Louis at Pondicherry in 1673. Chandernagore, with Fort Orleans, was on land rented from the Nawab Shaista Khan.</p>
      <p class="cp-lead">The Dutch took Pondicherry in 1693 and the Treaty of Ryswick restored it. After 1742 Governor Dupleix took part in Indian affairs, and the rivalry with the English led to three Carnatic Wars in which France was defeated. France was left with only five towns.</p>
      <div class="cp-note trap">Two Surat firsts are easy to mix. The English came in 1613 under Jahangir and the French came in 1667 under Francis Caron.</div>
      <div class="cp-note remember">The Treaty of Paris in 1763 returned Pondicherry to France, but without fortifications.</div>
    `
  },
  28: {
    questext: "Who founded Pondicherry in 1673 and built Fort Louis there?",
    options: ["Joseph Dupleix", "Francois Martin", "Francis Caron", "Count Lally"],
    correct: "2",
    exptext: "✅ Francois Martin founded Pondicherry in 1673. 📌 Martin made Pondicherry. ❌ Francis Caron founded the Surat factory in 1667, and Dupleix came much later."
  },
  29: {
    questext: "The French company called the Compagnie des Indes Orientales was formed in 1664 under which ruler?",
    options: ["Louis the Fourteenth", "Napoleon", "Henry the Eighth", "Louis the Sixteenth"],
    correct: "1",
    exptext: "✅ Colbert formed the company under Louis the Fourteenth, and the state paid for it. 📌 Colbert plus Louis. ❌ Napoleon came much later."
  },
  30: {
    questext: "The Battle of Wandiwash in January 1760 decided which war in favour of the English?",
    options: ["The First Carnatic War", "The Second Carnatic War", "The Battle of Plassey", "The Third Carnatic War"],
    correct: "4",
    exptext: "✅ Eyre Coote beat Lally at Wandiwash, deciding the Third Carnatic War. 📌 Wandiwash is the third war. ❌ Plassey was a separate battle in Bengal in 1757."
  },
  31: {
    questext: "Consider the following statements about the French in India:\n1. The French company was formed and controlled by the government of France.\n2. Pondicherry, Karikal, Mahe, Yanam and Chandernagore were returned to India in 1954.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 The French company was a state company. ❌ Only one is wrong, because both facts are true."
  },
  32: {
    type: "concept", icon: "📊", accent: "#14b8a6", pauseTimer: true,
    title: "The Five Companies at a Glance",
    html: `
      <p class="cp-lead">Now we place all five companies side by side. <u>Compare them by year, first factory, forts and final fate to stop mixing them up.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/17.png" alt="Comparison chart with five rows: Portuguese 1498, Dutch 1602, English 1600, Danes 1616, Fr" data-caption="A comparison chart of the five European companies and their founding years." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Advent_of_the_Europeans/18.png" alt="Memory picture: a podium with the five flags in order of arrival, Portuguese first and Fre" data-caption="The order of arrival: Portuguese, Dutch, English, Danes and then French." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Nation</th><th>Company and year</th><th>First factory</th><th>Fate</th></tr></thead><tbody><tr><td>Portuguese</td><td>Royal enterprise; Cabral's mission in 1500</td><td>Calicut 1500</td><td>Lost Mughal favour; Goa freed in 1961</td></tr><tr><td>Dutch</td><td>VOC in March 1602</td><td>Masulipatnam 1605</td><td>Beaten at Bedara in 1759</td></tr><tr><td>English</td><td>Charter on 31 December 1600</td><td>Surat 1613</td><td>Won the Carnatic Wars and ruled India</td></tr><tr><td>Danes</td><td>Danish company in 1616</td><td>Tranquebar 1620</td><td>Sold to the British in 1845</td></tr><tr><td>French</td><td>Company in 1664</td><td>Surat 1667</td><td>Defeated in the Carnatic Wars; towns returned in 1954</td></tr></tbody></table>
      <p class="cp-lead">The Portuguese came first and left last. The English company was formed in 1600, before the Dutch in 1602, but the Dutch factory in 1605 came before the English factory in 1613.</p>
      <div class="cp-note trap">Do not mix the forts. Fort St George at Madras and Fort William at Calcutta are English. Fort Dansborg is Danish. Fort Louis is French, and Fort Orleans is also French.</div>
      <div class="cp-note exam">The order of company founding years is English 1600, Dutch 1602, Danish 1616 and French 1664.</div>
    `
  },
  33: {
    questext: "Which of the following European companies was formed first?",
    options: ["The Dutch company", "The English company", "The Danish company", "The French company"],
    correct: "2",
    exptext: "✅ The English company was formed in 1600, before the Dutch in 1602. 📌 Order is 1600, 1602, 1616, 1664. ❌ The Dutch company is tempting because it was larger, but it was formed two years later."
  },
  34: {
    questext: "Match the fort with the nation: Fort Dansborg is linked to which nation?",
    options: ["The English", "The French", "The Dutch", "The Danes"],
    correct: "4",
    exptext: "✅ Fort Dansborg is at Tranquebar and belonged to the Danes. 📌 Dansborg sounds like Danish. ❌ Fort St George was English and Fort Louis was French."
  },
  35: {
    questext: "Which of the following was NOT a first factory location of a European company in India?",
    options: ["Calicut", "Masulipatnam", "Surat", "Cuttack"],
    correct: "4",
    exptext: "✅ Cuttack is not a first factory site of any of the five companies. 📌 First factories were Calicut, Masulipatnam, Surat and Tranquebar. ❌ Calicut, Masulipatnam and Surat were first factories of the Portuguese, Dutch and English or French."
  },
  36: {
    questext: "Which one of the following correctly pairs the nation with its capital or headquarters?",
    options: ["The Danes, Serampore", "The Dutch, Pondicherry", "The French, Madras", "The English, Tranquebar"],
    correct: "1",
    exptext: "✅ Serampore was the Danish headquarters. 📌 Danes held Serampore. ❌ Pondicherry was French, Madras was English and Tranquebar was Danish."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/thumbnail.png": { t: "thumb", accent: "#0ea5e9", objects: "an elegant old wooden sailing ship, a vintage brass compass and a rolled antique map of the Indian Ocean" },
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/1.png": { t: "fig", about: "Schematic world sketch with an old overland route in red marked BLOCKED at Constantinople and a new sea route in green going around Africa to India." },
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Constantinople Ottoman conquest 1453 painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/2.png. a painting of the Ottoman army attacking the walls of Constantinople",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/3.png": { t: "fig", about: "Simple picture of a cow in winter and a plate of spiced meat, with the words NO FODDER and SPICES." },
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vasco da Gama Calicut arrival painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/4.png. a painting of Vasco da Gama arriving at Calicut in 1498",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Goa Old Churches Basilica of Bom Jesus photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/5.png. the Basilica of Bom Jesus in Old Goa",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/6.png": { t: "fig", about: "Timeline with five boxes: 1487 Dias, 1498 Da Gama, 1510 Goa taken, 1661 Bombay dowry, 1961 Goa freed." },
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dutch fort Pulicat Tamil Nadu ruins photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/7.png. the old Dutch fort at Pulicat near Chennai",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/8.png": { t: "fig", about: "Simple map-like schematic, not a map: Netherlands at left, arrow to India (textiles), arrow to Indonesia (spices), city label Batavia." },
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fort St George Chennai photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/9.png. Fort St George in Chennai",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fort William Kolkata photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/10.png. Fort William in Kolkata",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/11.png": { t: "fig", about: "Timeline of English steps: 1600 Charter, 1608 Hawkins, 1612 Swally, 1615 Roe, 1639 Madras, 1717 Farman." },
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fort Dansborg Tranquebar Tamil Nadu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/12.png. Fort Dansborg at Tranquebar",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Serampore College West Bengal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/13.png. Serampore College building",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pondicherry French Quarter street photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/14.png. a street in the French Quarter of Pondicherry",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chandernagore Strand ghat West Bengal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Advent_of_the_Europeans/15.png. the Strand riverside at Chandernagore",
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/16.png": { t: "fig", about: "Timeline: 1664 Company formed, 1667 Surat, 1673 Pondicherry, 1760 Wandiwash, 1954 towns returned." },
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/17.png": { t: "fig", about: "Comparison chart with five rows: Portuguese 1498, Dutch 1602, English 1600, Danes 1616, French 1664, with ship icons." },
  "images/General_Awareness/Modern_India/Advent_of_the_Europeans/18.png": { t: "fig", about: "Memory picture: a podium with the five flags in order of arrival, Portuguese first and French last." }
});

/* CHANGE LOG
   - No corrections to the book's content.
*/