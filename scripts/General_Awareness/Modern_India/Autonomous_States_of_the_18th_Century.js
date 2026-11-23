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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Autonomous_States_of_the_18th_Century · 11 concept pages (+ overview) · 33 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏯", accent: "#0ea5e9", pauseTimer: true,
    title: "Class Overview — Autonomous States of the 18th Century",
    thumb: {
      image: "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/thumbnail.png",
      banner: "MODERN INDIA 2026",
      line1: "AUTONOMOUS STATES",
      line2: "OF THE 18TH CENTURY",
      line3: "FOUNDERS • CAPITALS",
      badge: "FULL CLASS",
      ribbon: "BATTLES • NAWABS • SIKH GURUS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Autonomous States of the 18th Century | Hyderabad Bengal Awadh Mysore Sikhs | Modern India",
      altTitles: ["18th Century Indian States in One Class", "Founders, Capitals and Battles of Autonomous States"],
      description: "After the death of Aurangzeb in 1707, the Mughal emperors became symbolic and new states appeared across India. In this class we learn every major state, step by step, in simple words.\n\n📌 IN THIS CLASS\n✅ Hyderabad, Carnatic, Bengal and Awadh\n✅ Mysore, Kerala, Jat state and Rohilkhand\n✅ Sikh Misls and the ten Sikh Gurus\n✅ Battles, founders, capitals and years\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share and subscribe.\n\n#SSCCGL #ModernIndia #History",
      tags: ["18th century india", "modern india history", "hyderabad nizam", "bengal nawabs", "awadh nawabs", "hyder ali tipu sultan", "mysore state", "marthanda varma", "jat state surajmal", "rohilkhand", "sikh misls", "ranjit singh", "ten sikh gurus", "battle of buxar", "battle of plassey", "ssc cgl history", "ssc cgl modern history", "indian history for ssc", "static gk for ssc", "general awareness ssc", "railway ntpc history", "history mcq", "history crash course", "history one shot", "mughal decline", "SSC CGL", "UPSC", "Banking", "Modern_India for all exams"],
      hashtags: ["SSCCGL", "ModernIndia", "History"],
      thumbText: "AUTONOMOUS STATES OF THE 18TH CENTURY",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏯 New class is live: Autonomous States of the 18th Century. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how new states rose when the Mughal Empire grew weak after 1707</u>. We will learn who founded each state, where its capital was and which battles shaped it.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>11</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>33</b><span>Questions</span></div>
        <div class="cp-stat"><b>~55 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Background</b><br>Why the Mughal emperors became symbolic after Aurangzeb died and how provinces began to break away.</li>
        <li><b>Hyderabad</b><br>How Nizam-ul-Mulk founded the Asaf Jahi state in 1724 and why it lasted until 1948.</li>
        <li><b>Carnatic (Karnatak)</b><br>The Nawab of Carnatic at Arcot and how succession disputes invited the English and the French.</li>
        <li><b>Bengal</b><br>Murshid Quli Khan, the line of Nawabs, and the battles of Plassey and Buxar.</li>
        <li><b>Awadh</b><br>The rise of the Nawab Wazirs of Awadh, their culture and the annexation of 1856.</li>
        <li><b>Mysore</b><br>How Hyder Ali took power from the Wadiyars and how Tipu Sultan fell in 1799.</li>
        <li><b>Kerala</b><br>Marthanda Varma of Travancore and the victory over the Dutch at Colachel.</li>
        <li><b>Jat State</b><br>The farming Jat community of Bharatpur and its famous ruler Surajmal.</li>
        <li><b>Rohilkhand</b><br>The state of Ali Muhammad Khan and the battle of Miranpur Katra.</li>
        <li><b>Punjab — Sikh Misls</b><br>From Banda Bahadur to the twelve Misls and Maharaja Ranjit Singh.</li>
        <li><b>The Sikh Gurus</b><br>A short, clear list of all ten Gurus with the one fact that each is known for.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Staff Selection Commission papers love founders, capitals, battle years and the order of events from this chapter, and the same facts connect to the rise of British power in Bengal.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "Background",
    html: `
      <p class="cp-lead">Aurangzeb died in 1707, and after him the Mughal emperors became only symbols of power. <u>Real power passed to nobles and governors, and provinces slowly became independent states.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/1.png" alt="Charminar Hyderabad photo" data-caption="The Charminar in Hyderabad recalls the independent state that rose after Mughal decline." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/2.png" alt="Schematic, not a map: a big Mughal crown in the centre cracking, with small states named H" data-caption="As Mughal power cracked, provinces such as Hyderabad, Bengal, Awadh and Mysore broke away." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Group</th><th>Meaning</th></tr></thead><tbody><tr><td>Irani and Turani factions</td><td>Rival groups of nobles at the Mughal court who fought for power</td></tr><tr><td>Sayyid Brothers</td><td>Hindustani nobles who controlled the court as powerful kingmakers</td></tr><tr><td>Autonomous states</td><td>Provinces that ruled themselves while still showing respect to the emperor</td></tr></tbody></table>
      <p class="cp-lead">After 1707 the real fight at Delhi was between the Irani and Turani nobles and the Hindustani Sayyid Brothers. While they fought, governors of the far provinces made their own rule strong and passed it on to their sons.</p>
      <div class="cp-note trap">Learn the founding order of the three early states: Bengal in 1717, Awadh in 1722 and Hyderabad in 1724.</div>
      <div class="cp-note exam">Questions often ask which Mughal emperor died in 1707 and what happened next. The answer is Aurangzeb, and the emperors became symbolic.</div>
    `
  },
  3: {
    questext: "Who were the Sayyid Brothers during the decline of the Mughal Empire?",
    options: ["Hindustani nobles who controlled the Mughal court", "Rulers of Awadh", "Leaders of the Sikh Misls", "Governors of Bengal"],
    correct: "1",
    exptext: "✅ The Sayyid Brothers were Hindustani nobles who held real power at the court. 📌 Sayyid means kingmakers at Delhi. ❌ Awadh and Bengal had separate rulers, not these brothers."
  },
  4: {
    questext: "Which of the following is the correct order of the founding of states in the 18th century?",
    options: ["Hyderabad, Awadh, Bengal", "Awadh, Bengal, Hyderabad", "Bengal, Awadh, Hyderabad", "Bengal, Hyderabad, Awadh"],
    correct: "3",
    exptext: "✅ Bengal was founded in 1717, Awadh in 1722 and Hyderabad in 1724. 📌 Remember 17, 22, 24. ❌ The other orders mix up these three years."
  },
  5: {
    type: "concept", icon: "🏹", accent: "#ef4444", pauseTimer: true,
    title: "Hyderabad",
    html: `
      <p class="cp-lead">Hyderabad was the largest state to break away from the Mughals in the south. <u>Its founder Nizam-ul-Mulk made the Deccan his own in 1724 and his dynasty ruled until 1948.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/3.png" alt="Hyderabad Nizam Chowmahalla Palace photo" data-caption="The Chowmahalla Palace was the royal home of the Nizams of Hyderabad." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/4.png" alt="Short timeline with four boxes: 1724 Shakar Kheda, 1748 Nizam dies, 1948 Operation Polo me" data-caption="Key dates of Hyderabad: 1724 battle, 1748 death of the founder and the 1948 merger." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Founder</td><td>Nizam-ul-Mulk, also called Chin Kilich Khan and Mir Qamar-ud-din, of the Turani faction</td></tr><tr><td>Year</td><td>1724</td></tr><tr><td>Capital</td><td>Hyderabad</td></tr><tr><td>Dynasty</td><td>Asaf Jahi</td></tr><tr><td>Prime minister</td><td>Puran Chand, a Hindu</td></tr></tbody></table>
      <p class="cp-lead">Nizam-ul-Mulk was Deccan Subedar under Emperor Muhammad Shah and helped to break the power of the Sayyid Brothers. In 1724 he defeated Mubariz Khan at Shakar Kheda and took the title Asaf Jah as the Viceroy of the Deccan.</p>
      <p class="cp-lead">He died in 1748, and after his death the English and the French took sides in the quarrel for the throne. The Asaf Jahi rule ended only in 1948, when Hyderabad was merged with India in Operation Polo.</p>
      <div class="cp-note trap">Shakar Kheda was fought in 1724, but Giriya was fought in 1740 and Plassey in 1757. Do not mix the years.</div>
    `
  },
  6: {
    questext: "Who founded the independent state of Hyderabad in 1724?",
    options: ["Saadat Khan", "Murshid Quli Khan", "Nizam-ul-Mulk", "Hyder Ali"],
    correct: "3",
    exptext: "✅ Nizam-ul-Mulk, also known as Asaf Jah, founded Hyderabad in 1724. 📌 Nizam means Hyderabad. ❌ Saadat Khan founded Awadh, Murshid Quli Khan founded Bengal and Hyder Ali ruled Mysore."
  },
  7: {
    questext: "The battle of Shakar Kheda in 1724 was fought between Nizam-ul-Mulk and which opponent?",
    options: ["Mubariz Khan", "Alivardi Khan", "Nadir Shah", "Ahmad Shah Abdali"],
    correct: "1",
    exptext: "✅ Nizam-ul-Mulk defeated Mubariz Khan at Shakar Kheda and became the Asaf Jah. 📌 Shakar Kheda 1724 gave Hyderabad its founder. ❌ Alivardi Khan fought at Giriya, and Nadir Shah and Abdali came from outside India."
  },
  8: {
    questext: "Which operation of 1948 ended the Asaf Jahi rule of Hyderabad?",
    options: ["Operation Vijay", "Operation Polo", "Operation Blue Star", "Operation Trident"],
    correct: "2",
    exptext: "✅ Operation Polo merged Hyderabad with the Indian Union in 1948. 📌 Polo is the horse sport, but here it ended the Nizam. ❌ Operation Vijay freed Goa in 1961."
  },
  9: {
    type: "concept", icon: "🏰", accent: "#f97316", pauseTimer: true,
    title: "Carnatic (Karnatak)",
    html: `
      <p class="cp-lead">The Carnatic was a province of the Mughal Deccan, and its ruler was called the Nawab of Carnatic. <u>His throne was weak, and quarrels over the succession brought in the English and the French.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/5.png" alt="Arcot Fort Tamil Nadu photo" data-caption="Arcot was the capital of the Nawabs of Carnatic." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/6.png" alt="Simple diagram: Mughal subah at the top, Deputy governor Nawab of Carnatic in the middle, " data-caption="The Nawab of Carnatic served the Mughals, and later the English and French took sides in his succession." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Founder</td><td>Saadatullah Khan</td></tr><tr><td>Capital</td><td>Arcot</td></tr><tr><td>Position</td><td>Deputy governor of the Mughal Deccan province</td></tr><tr><td>Title</td><td>Nawab of Carnatic</td></tr></tbody></table>
      <p class="cp-lead">The Nawab ruled as the deputy governor under the Mughal governor of the Deccan. When he died, rival claimants fought for the throne. The English and the French each supported one side, and this started the Anglo-French rivalry in South India.</p>
      <div class="cp-note exam">Remember Arcot as the capital of the Carnatic. The famous English hero of Arcot in 1751 was Robert Clive.</div>
    `
  },
  10: {
    questext: "What was the capital of the Nawabs of Carnatic?",
    options: ["Hyderabad", "Arcot", "Madras", "Srirangapatna"],
    correct: "2",
    exptext: "✅ The capital of the Nawab of Carnatic was Arcot. 📌 Carnatic and Arcot start with similar sounds. ❌ Hyderabad was the Nizam capital, and Srirangapatna was linked to Tipu Sultan."
  },
  11: {
    questext: "Which founder is associated with the independent state of Carnatic?",
    options: ["Saadatullah Khan", "Nizam-ul-Mulk", "Marthanda Varma", "Churaman"],
    correct: "1",
    exptext: "✅ Saadatullah Khan is named as the founder of the Carnatic state with Arcot as capital. 📌 Saadatullah goes with Arcot. ❌ Nizam-ul-Mulk founded Hyderabad, and Marthanda Varma founded the Travancore state."
  },
  12: {
    type: "concept", icon: "🌾", accent: "#3b82f6", pauseTimer: true,
    title: "Bengal",
    html: `
      <p class="cp-lead">Bengal was the richest province of the Mughal Empire. <u>Murshid Quli Khan made it almost independent in 1717, and the line of Nawabs ended with the English winning at Plassey and Buxar.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/7.png" alt="Hazarduari Palace Murshidabad photo" data-caption="Murshidabad was the capital of the Nawabs of Bengal after Dhaka." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/8.png" alt="Plassey battle monument Palashi West Bengal photo" data-caption="The monument at Palashi marks the battlefield of Plassey in 1757." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/9.png" alt="Timeline with boxes: 1717 Murshid Quli Khan, 1740 Giriya, 1757 Plassey, 1764 Buxar, 1765 A" data-caption="Key dates of Bengal from 1717 to 1765." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Nawab</th><th>Period</th></tr></thead><tbody><tr><td>Murshid Quli Khan</td><td>1717 to 1727</td></tr><tr><td>Shujauddin</td><td>1727 to 1739</td></tr><tr><td>Sarfaraz Khan</td><td>1739 to 1740</td></tr><tr><td>Alivardi Khan</td><td>1740 to 1756</td></tr><tr><td>Siraj-ud-Daula</td><td>1756 to 1757</td></tr><tr><td>Mir Jafar</td><td>1757 to 1760</td></tr><tr><td>Mir Qasim</td><td>1760 to 1763</td></tr><tr><td>Mir Jafar, second time</td><td>1763 to 1765</td></tr><tr><td>Najmuddaula</td><td>1765 to 1766</td></tr><tr><td>Saif-ud-Daula</td><td>1766 to 1770</td></tr><tr><td>Mubarak-ud-Daula</td><td>1770 to 1775</td></tr></tbody></table>
      <p class="cp-lead">Murshid Quli Khan was the Diwan of Bengal from 1700 and became Nawab in 1717 under Emperor Farrukhsiyar. His real name was Mohammad Hadi. He moved the capital from Dhaka to Murshidabad, which he named after himself, and he introduced the ijara system of revenue farming.</p>
      <p class="cp-lead">In 1740 Alivardi Khan, the deputy governor of Bihar, killed Sarfaraz Khan at Giriya and became Nawab. His grandson Siraj-ud-Daula was betrayed at Plassey in 1757 by his commander Mir Jafar and other enemies who favoured the English. Mir Jafar is called Clive's Jackal.</p>
      <p class="cp-lead">In 1764 Mir Qasim, Shuja-ud-Daula and Emperor Shah Alam the Second were defeated by Hector Munro at Buxar on 22 October. The Treaty of Allahabad in 1765 gave the Diwani of Bengal, Bihar and Odisha to the English company.</p>
      <div class="cp-note trap">The Black Hole Incident is dated 20 June 1756, where 146 were locked up and 23 survived,. It happened under Siraj-ud-Daula, not under Alivardi Khan.</div>
    `
  },
  13: {
    questext: "Who became the Nawab of Bengal in 1717 and shifted the capital from Dhaka to Murshidabad?",
    options: ["Alivardi Khan", "Siraj-ud-Daula", "Mir Jafar", "Murshid Quli Khan"],
    correct: "4",
    exptext: "✅ Murshid Quli Khan became Nawab in 1717 and named Murshidabad after himself. 📌 Murshid made Murshidabad. ❌ Alivardi Khan came later in 1740 after Giriya."
  },
  14: {
    questext: "Where did Alivardi Khan defeat Sarfaraz Khan in 1740?",
    options: ["Plassey", "Giriya", "Buxar", "Panipat"],
    correct: "2",
    exptext: "✅ Alivardi Khan won at Giriya and became Nawab of Bengal. 📌 Giriya 1740 gave Alivardi the throne. ❌ Plassey was 1757, Buxar was 1764 and Panipat was 1761."
  },
  15: {
    questext: "Mir Jafar is famously called which of the following?",
    options: ["Clive's Jackal", "The Tiger of Mysore", "The Nawab Wazir", "The Plato of the Jats"],
    correct: "1",
    exptext: "✅ Mir Jafar helped the English at Plassey and is called Clive's Jackal. 📌 Jackal means helper of the English. ❌ The Tiger of Mysore was Tipu, and the Nawab Wazir was a title of Awadh."
  },
  16: {
    questext: "Consider the following statements about Bengal in the 18th century:\n1. The Treaty of Allahabad in 1765 gave the Diwani of Bengal, Bihar and Odisha to the English company.\n2. The battle of Buxar was fought in 1757.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Plassey is 1757 and Buxar is 1764. ❌ Statement 2 is wrong because Buxar was fought on 22 October 1764."
  },
  17: {
    questext: "Which of the following is the correct order of battles?",
    options: ["Plassey, Buxar, Giriya", "Giriya, Plassey, Buxar", "Buxar, Plassey, Giriya", "Giriya, Buxar, Plassey"],
    correct: "2",
    exptext: "✅ Giriya was in 1740, Plassey in 1757 and Buxar in 1764. 📌 Remember 40, 57, 64. ❌ The other orders reverse Plassey and Buxar."
  },
  18: {
    type: "concept", icon: "🕌", accent: "#10b981", pauseTimer: true,
    title: "Awadh",
    html: `
      <p class="cp-lead">Awadh was a rich state in the Ganga plains. <u>Its Nawabs were called Nawab Wazirs, and their court at Lucknow became famous for culture, buildings and manners.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/10.png" alt="Bada Imambara Lucknow photo" data-caption="The Bada Imambara in Lucknow was built by Asaf-ud-Daula." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/11.png" alt="Succession chain of boxes: Saadat Khan 1722, Safdarjung, Shuja-ud-Daula, Asaf-ud-Daula, Wa" data-caption="The line of rulers of Awadh from its founder to its last Nawab." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Ruler</th><th>Key fact</th></tr></thead><tbody><tr><td>Saadat Khan (Burhan-ul-Mulk)</td><td>Founded Awadh in 1722; a Shia from Nishapur in Persia</td></tr><tr><td>Safdarjung</td><td>Became Wazir in 1748, so the rulers were called Nawab Wazirs</td></tr><tr><td>Shuja-ud-Daula</td><td>Sheltered Shah Alam the Second; helped Abdali at Panipat in 1761; fought at Buxar in 1764</td></tr><tr><td>Asaf-ud-Daula</td><td>Ruled 1775 to 1797; built the Bada Imambara</td></tr><tr><td>Wajid Ali Shah</td><td>Ruled 1847 to 1856; the last Nawab</td></tr></tbody></table>
      <p class="cp-lead">Saadat Khan held a high rank of 7000 and was sent to Delhi in 1739 to face Nadir Shah. Faizabad was the early capital, and later Lucknow became the centre of the rich Lucknowi culture.</p>
      <p class="cp-lead">Dalhousie annexed Awadh in 1856 on the report of Outram, saying the Nawab ruled badly. This was one cause of unrest that led to the revolt of 1857.</p>
      <div class="cp-note trap">Do not confuse Saadat Khan with Safdarjung. Saadat Khan was the founder in 1722, and Safdarjung was his nephew and son-in-law who became the Wazir in 1748.</div>
    `
  },
  19: {
    questext: "Who was the founder of the independent state of Awadh in 1722?",
    options: ["Shuja-ud-Daula", "Asaf-ud-Daula", "Saadat Khan", "Safdarjung"],
    correct: "3",
    exptext: "✅ Saadat Khan, also called Burhan-ul-Mulk, founded Awadh in 1722. 📌 Saadat starts with Awadh in 1722. ❌ Safdarjung came after him and became Wazir in 1748."
  },
  20: {
    questext: "Which Nawab of Awadh built the Bada Imambara at Lucknow?",
    options: ["Wajid Ali Shah", "Shuja-ud-Daula", "Safdarjung", "Asaf-ud-Daula"],
    correct: "4",
    exptext: "✅ Asaf-ud-Daula, who ruled from 1775 to 1797, built the Bada Imambara. 📌 Asaf built the Imambara. ❌ Wajid Ali Shah was the last Nawab and lost the throne in 1856."
  },
  21: {
    questext: "Awadh was annexed by Lord Dalhousie in which year?",
    options: ["1848", "1856", "1857", "1865"],
    correct: "2",
    exptext: "✅ Dalhousie annexed Awadh in 1856 on the report of Outram. 📌 Awadh was annexed one year before the revolt. ❌ 1857 is the year of the revolt, not the annexation."
  },
  22: {
    type: "concept", icon: "🐅", accent: "#8b5cf6", pauseTimer: true,
    title: "Mysore",
    html: `
      <p class="cp-lead">Mysore began as a small Hindu kingdom of the Wadiyar family. <u>Hyder Ali, a soldier, took real power in 1761, and his son Tipu Sultan fought the English until 1799.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/12.png" alt="Srirangapatna Tipu Sultan Summer Palace photo" data-caption="The Daria Daulat palace at Srirangapatna was a summer palace of Tipu Sultan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/13.png" alt="Timeline: 1755 Dindigul, 1761 Hyder takes power, 1782 Hyder dies, 1799 Tipu falls." data-caption="Key dates of Mysore from 1755 to 1799." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Original rulers</td><td>The Wadiyar family</td></tr><tr><td>Founder of the new rule</td><td>Hyder Ali, in 1761</td></tr><tr><td>Capital</td><td>Mysore, with Srirangapatna as the fort</td></tr><tr><td>Successor</td><td>Tipu Sultan</td></tr></tbody></table>
      <p class="cp-lead">After the fall of Vijayanagara at Talikota, the Wadiyars ruled Mysore, but the last Wadiyar, Chikka Krishnaraja, was only a nominal king. The ministers Nanjaraj and Devaraj held the real power.</p>
      <p class="cp-lead">Hyder Ali was born near Kolar and in 1755 became the Faujdar of Dindigul, where he built an armoury with French training. In 1761 he removed Nanjaraj and seized power. He died in 1782 during the Second Anglo-Mysore War, and Tipu Sultan died defending Srirangapatna in 1799 in the Fourth war.</p>
      <div class="cp-note exam">The Fourth Anglo-Mysore War ended in 1799 with the death of Tipu Sultan at Srirangapatna.</div>
    `
  },
  23: {
    questext: "Who took real power in Mysore in 1761 from the ministers of the Wadiyars?",
    options: ["Tipu Sultan", "Hyder Ali", "Nanjaraj", "Chikka Krishnaraja"],
    correct: "2",
    exptext: "✅ Hyder Ali removed Nanjaraj in 1761 and became the real ruler. 📌 Hyder came first, Tipu second. ❌ Tipu Sultan was his son and ruled later."
  },
  24: {
    questext: "In which Anglo-Mysore War did Tipu Sultan die defending Srirangapatna in 1799?",
    options: ["First", "Second", "Third", "Fourth"],
    correct: "4",
    exptext: "✅ Tipu Sultan fell at Srirangapatna in 1799 in the Fourth war. 📌 Fourth means 1799. ❌ Hyder Ali died in the Second war in 1782."
  },
  25: {
    questext: "Hyder Ali held which post at Dindigul in 1755, where he built an armoury?",
    options: ["Diwan", "Faujdar", "Subedar", "Wazir"],
    correct: "2",
    exptext: "✅ Hyder Ali became the Faujdar of Dindigul in 1755. 📌 Faujdar means military officer. ❌ Wazir was a title of the Nawabs of Awadh."
  },
  26: {
    type: "concept", icon: "🌴", accent: "#14b8a6", pauseTimer: true,
    title: "Kerala",
    html: `
      <p class="cp-lead">Kerala was split into small states, and the strongest was Travancore. <u>Its king, Marthanda Varma, built a strong army and defeated the Dutch at Colachel in 1741.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/14.png" alt="Padmanabhaswamy Temple Thiruvananthapuram photo" data-caption="Travancore was dedicated to Sri Padmanabha, shown by the temple at Thiruvananthapuram." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/15.png" alt="Schematic, not a map: four labelled boxes Calicut, Chirakkal, Cochin, Travancore with Trav" data-caption="Kerala had four states, and Travancore was the strongest." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Founder</td><td>Marthanda Varma of Travancore</td></tr><tr><td>Capital</td><td>Trivandrum, also called Thiruvananthapuram</td></tr><tr><td>Four states of Kerala</td><td>Calicut, Chirakkal, Cochin and Travancore</td></tr><tr><td>Famous victory</td><td>Colachel in 1741 over the Dutch</td></tr><tr><td>Dedication</td><td>Tripadidanam in 1750 to Sri Padmanabha</td></tr></tbody></table>
      <p class="cp-lead">Marthanda Varma ended Dutch power in Kerala. The victory at Colachel in 1741 is remembered as the first defeat of a European naval power by an Indian state. In 1750 he dedicated Travancore to Sri Padmanabha in the Tripadidanam.</p>
      <p class="cp-lead">Karthik Tirunal Rama Varma was a scholar king, fluent in English, and he read newspapers from London, Calcutta and Madras. Malayalam literature grew under him, and Trivandrum became a centre of Sanskrit.</p>
      <div class="cp-note trap">Colachel in 1741 was a Travancore victory over the Dutch. Bedara in 1759 was the English victory over the Dutch. Do not mix them.</div>
    `
  },
  27: {
    questext: "Which ruler of Travancore defeated the Dutch at Colachel in 1741?",
    options: ["Marthanda Varma", "Hyder Ali", "Karthik Tirunal Rama Varma", "Churaman"],
    correct: "1",
    exptext: "✅ Marthanda Varma defeated the Dutch at Colachel in 1741. 📌 Colachel means Marthanda. ❌ Karthik Tirunal Rama Varma was a later scholar king."
  },
  28: {
    questext: "The Tripadidanam of 1750 dedicated Travancore to which deity?",
    options: ["Lord Venkateswara", "Lord Jagannath", "Sri Padmanabha", "Lord Guruvayurappan"],
    correct: "3",
    exptext: "✅ Marthanda Varma dedicated the state to Sri Padmanabha. 📌 Padmanabha means Travancore. ❌ The other three are famous deities but are not linked to this dedication."
  },
  29: {
    questext: "Consider the following statements about Kerala in the 18th century:\n1. Calicut, Chirakkal, Cochin and Travancore were the four states of Kerala.\n2. The victory at Colachel was the first defeat of a European naval power by an Indian state.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Four states, one big victory. ❌ Choosing only one fails because both facts are true."
  },
  30: {
    type: "concept", icon: "🌿", accent: "#ec4899", pauseTimer: true,
    title: "Jat State",
    html: `
      <p class="cp-lead">The Jats were a hardworking farming community around Delhi, Agra and Mathura. <u>Under strong leaders they built a new state with its capital at Bharatpur.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/16.png" alt="Lohagarh Fort Bharatpur photo" data-caption="Lohagarh Fort at Bharatpur was the stronghold of the Jat rulers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/17.png" alt="Schematic, not a map: a triangle with Delhi, Agra and Mathura at its corners and a fort ma" data-caption="The Jat region lay between Delhi, Agra and Mathura, with Bharatpur as its capital." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Founders</td><td>Churaman and Badan Singh</td></tr><tr><td>Capital</td><td>Bharatpur</td></tr><tr><td>Famous ruler</td><td>Surajmal, called the Plato of the Jats</td></tr><tr><td>Decline</td><td>After the death of Surajmal in 1763</td></tr></tbody></table>
      <p class="cp-lead">The Jats were farmers who grew strong in the area from Delhi to Agra and Mathura. Surajmal was the ablest ruler and was praised as the Plato, or Aflatoon, of the Jats. The state declined after his death in 1763.</p>
      <div class="cp-note exam">Remember Bharatpur as the capital of the Jats and Surajmal as the Plato of the Jats.</div>
    `
  },
  31: {
    questext: "Which ruler is known as the Plato of the Jats?",
    options: ["Churaman", "Badan Singh", "Surajmal", "Ranjit Singh"],
    correct: "3",
    exptext: "✅ Surajmal was praised as the Plato of the Jats. 📌 Surajmal means Plato. ❌ Churaman and Badan Singh were the founders, and Ranjit Singh was a Sikh ruler."
  },
  32: {
    questext: "What was the capital of the Jat state?",
    options: ["Lahore", "Aonla", "Bharatpur", "Lucknow"],
    correct: "3",
    exptext: "✅ Bharatpur was the Jat capital. 📌 Jat goes with Bharatpur. ❌ Lahore was Sikh, Aonla was Rohilla and Lucknow was Awadh."
  },
  33: {
    type: "concept", icon: "⚔️", accent: "#84cc16", pauseTimer: true,
    title: "Rohilkhand",
    html: `
      <p class="cp-lead">Rohilkhand was a state of Afghan settlers who rose in the area east of Delhi. <u>It was ended by Awadh and the English in 1774, and only Rampur was left.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/18.png" alt="Rampur Raza Library Uttar Pradesh photo" data-caption="Rampur was the only part of Rohilkhand that survived after 1774." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/19.png" alt="Schematic, not a map: three boxes Marathas, Awadh with the British, Rohilla leader, with a" data-caption="In 1773 and 1774 Awadh and the British pressed the Rohilla leader for money." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Founder</td><td>Ali Muhammad Khan</td></tr><tr><td>Capitals</td><td>Aonla, later Rampur</td></tr><tr><td>Rohilla leader</td><td>Hafiz Rahmat Khan</td></tr><tr><td>Final battle</td><td>Miranpur Katra, April 1774</td></tr><tr><td>Survivor</td><td>Rampur, under Faizullah Khan</td></tr></tbody></table>
      <p class="cp-lead">In 1773 the Marathas invaded Rohilkhand. The Rohillas had promised money to Awadh's Nawab Wazir for help, and the English demanded payment. Hafiz Rahmat Khan refused. He died fighting at Miranpur Katra in April 1774.</p>
      <p class="cp-lead">The Rohillas were driven out, and all of the state except Rampur went to Shuja-ud-Daula. The English company made the son of Ali Muhammad Khan, Faizullah Khan, ruler of Rampur.</p>
      <div class="cp-note trap">The battle of Miranpur Katra was fought in 1774, after Panipat in 1761 and Buxar in 1764.</div>
    `
  },
  34: {
    questext: "Who died fighting at the battle of Miranpur Katra in April 1774?",
    options: ["Faizullah Khan", "Hafiz Rahmat Khan", "Ali Muhammad Khan", "Najib-ud-Daula"],
    correct: "2",
    exptext: "✅ The Rohilla leader Hafiz Rahmat Khan died at Miranpur Katra in 1774. 📌 Hafiz fell at Miranpur. ❌ Faizullah Khan survived and was made the ruler of Rampur."
  },
  35: {
    questext: "Which part of Rohilkhand survived under Faizullah Khan after 1774?",
    options: ["Bareilly", "Aonla", "Rampur", "Faizabad"],
    correct: "3",
    exptext: "✅ Only Rampur was left to Faizullah Khan. 📌 Rampur remained. ❌ Aonla was the early capital, and Faizabad belonged to Awadh."
  },
  36: {
    type: "concept", icon: "🦁", accent: "#eab308", pauseTimer: true,
    title: "Punjab — Sikh Misls",
    html: `
      <p class="cp-lead">In Punjab the Sikhs rose against the Mughals and later formed a strong state. <u>It began with Banda Bahadur, grew under the Misls, and became a great kingdom under Ranjit Singh.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/20.png" alt="Golden Temple Amritsar photo" data-caption="The Golden Temple in Amritsar is the holiest shrine of the Sikhs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/21.png" alt="Maharaja Ranjit Singh portrait painting" data-caption="Maharaja Ranjit Singh united the Sikh Misls and ruled from Lahore." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/22.png" alt="Flow of four boxes: Banda Bahadur, Jassa Singh and twelve Misls, Ranjit Singh takes Lahore" data-caption="The rise of the Sikh state from Banda Bahadur to the Treaty of Amritsar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Leader</th><th>Role</th></tr></thead><tbody><tr><td>Banda Bahadur</td><td>Born Lakshman Dev; fought the Mughals for eight years; called Sachcha Badshah</td></tr><tr><td>Jassa Singh</td><td>Led the Sikhs when they formed twelve Misls</td></tr><tr><td>Ranjit Singh</td><td>Of the Sukarchakia Misl; took Lahore in 1799; called Sher-e-Punjab</td></tr></tbody></table>
      <p class="cp-lead">Banda Bahadur was killed with his son by Emperor Farrukhsiyar in 1716. Under Jassa Singh the Sikhs formed twelve Misls, each with its own flag, name and symbol. A joint committee settled common matters.</p>
      <p class="cp-lead">Ranjit Singh, a leader of the Sukarchakia Misl, took Lahore in 1799 and united the Misls into one kingdom. By the Treaty of Amritsar in 1809 with the English, the river Sutlej became the boundary.</p>
      <div class="cp-note trap">Do not mix who killed whom. Banda Bahadur was killed by Farrukhsiyar, Guru Arjan Dev by Jahangir and Guru Tegh Bahadur by Aurangzeb.</div>
    `
  },
  37: {
    questext: "Who is called Sher-e-Punjab?",
    options: ["Jassa Singh", "Banda Bahadur", "Ranjit Singh", "Guru Gobind Singh"],
    correct: "3",
    exptext: "✅ Ranjit Singh is called Sher-e-Punjab, the Lion of Punjab. 📌 Sher means Ranjit. ❌ Banda Bahadur is called Sachcha Badshah."
  },
  38: {
    questext: "How many Misls did the Sikhs have under Jassa Singh?",
    options: ["Ten", "Twelve", "Fourteen", "Sixteen"],
    correct: "2",
    exptext: "✅ There were twelve Misls, each with its own flag. 📌 Twelve Misls, twelve flags. ❌ Ten is the number of Sikh Gurus, so it is a common mistake."
  },
  39: {
    questext: "The Treaty of Amritsar of 1809 made which river the boundary between Ranjit Singh and the English?",
    options: ["Ravi", "Beas", "Sutlej", "Jhelum"],
    correct: "3",
    exptext: "✅ The Sutlej was fixed as the boundary in 1809. 📌 Amritsar 1809 means Sutlej. ❌ The Ravi flows by Lahore but was not the treaty line."
  },
  40: {
    questext: "Banda Bahadur was killed in 1716 by which Mughal emperor?",
    options: ["Aurangzeb", "Jahangir", "Farrukhsiyar", "Muhammad Shah"],
    correct: "3",
    exptext: "✅ Farrukhsiyar had Banda Bahadur killed in 1716. 📌 Banda goes with Farrukhsiyar. ❌ Aurangzeb killed Guru Tegh Bahadur and Jahangir killed Guru Arjan Dev."
  },
  41: {
    type: "concept", icon: "🪔", accent: "#6366f1", pauseTimer: true,
    title: "The Sikh Gurus",
    html: `
      <p class="cp-lead">Sikhism had ten Gurus, from Guru Nanak to Guru Gobind Singh. <u>Learn each Guru with one key fact and the exam becomes easy.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/23.png" alt="Akal Takht Amritsar photo" data-caption="The Akal Takht in Amritsar was founded by Guru Hargobind." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/24.png" alt="Ladder of ten steps numbered 1 to 10, each step with the Guru name from Nanak at the botto" data-caption="The ten Sikh Gurus in order, from Guru Nanak to Guru Gobind Singh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Guru</th><th>Key fact</th></tr></thead><tbody><tr><td>1 Nanak</td><td>Founder of Sikhism</td></tr><tr><td>2 Angad</td><td>Gurmukhi script; spread Sikhism</td></tr><tr><td>3 Amardas</td><td>Made langar permanent; expanded the Manji system; opposed Sati</td></tr><tr><td>4 Ramdas</td><td>Founded Amritsar; friendly with Akbar</td></tr><tr><td>5 Arjan Dev</td><td>Compiled the Adi Granth; Tarn Taran and Kartarpur; killed by Jahangir</td></tr><tr><td>6 Hargobind</td><td>Akal Takht; made the Sikhs a fighting community; Kiratpur</td></tr><tr><td>9 Tegh Bahadur</td><td>Anandpur Sahib; supporter of Hindus; killed by Aurangzeb</td></tr><tr><td>10 Gobind Singh</td><td>Founded the Khalsa Panth; last Guru; wrote the Zafarnama in Persian</td></tr></tbody></table>
      <p class="cp-lead">Gurus 7 and 8, Har Rai and Harkishan, are rarely asked. Guru Gobind Singh gave the five Ks: Kesh, Kangha, Kirpan, Kara and Kachha.</p>
      <div class="cp-note remember">The Adi Granth is the holy book of the Sikhs. Guru Gobind Singh was the last human Guru, and the Granth is the guide after him.</div>
    `
  },
  42: {
    questext: "Who founded the city of Amritsar?",
    options: ["Guru Nanak", "Guru Angad", "Guru Ramdas", "Guru Arjan Dev"],
    correct: "3",
    exptext: "✅ Guru Ramdas, the fourth Guru, founded Amritsar. 📌 Ram, 4, Amritsar. ❌ Arjan Dev compiled the Adi Granth."
  },
  43: {
    questext: "Which Guru compiled the Adi Granth and was killed by Jahangir?",
    options: ["Guru Hargobind", "Guru Tegh Bahadur", "Guru Amardas", "Guru Arjan Dev"],
    correct: "4",
    exptext: "✅ Guru Arjan Dev compiled the Adi Granth and was killed by Jahangir. 📌 Arjan, Adi Granth, Jahangir. ❌ Tegh Bahadur was killed by Aurangzeb."
  },
  44: {
    questext: "Which Guru introduced the Gurmukhi script among the Sikhs?",
    options: ["Guru Angad", "Guru Nanak", "Guru Hargobind", "Guru Gobind Singh"],
    correct: "1",
    exptext: "✅ Guru Angad, the second Guru, spread the Gurmukhi script. 📌 Angad, second, script. ❌ Guru Nanak founded Sikhism but did not introduce the script."
  },
  45: {
    questext: "Consider the following statements about the Sikh Gurus:\n1. Guru Gobind Singh founded the Khalsa Panth and wrote the Zafarnama in Persian.\n2. Guru Tegh Bahadur was killed by Jahangir.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Tegh Bahadur and Aurangzeb go together. ❌ Statement 2 is wrong because Jahangir killed Guru Arjan Dev."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/thumbnail.png": { t: "thumb", accent: "#0ea5e9", objects: "an elegant old Indian fort gateway, a rolled antique map of eighteenth-century India and a gold-lined sword" },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Charminar Hyderabad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/1.png. the Charminar monument in Hyderabad",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/2.png": { t: "fig", about: "Schematic, not a map: a big Mughal crown in the centre cracking, with small states named Hyderabad, Bengal, Awadh, Mysore breaking away." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hyderabad Nizam Chowmahalla Palace photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/3.png. the Chowmahalla Palace of the Nizams in Hyderabad",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/4.png": { t: "fig", about: "Short timeline with four boxes: 1724 Shakar Kheda, 1748 Nizam dies, 1948 Operation Polo merger." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Arcot Fort Tamil Nadu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/5.png. the Arcot Fort in Tamil Nadu",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/6.png": { t: "fig", about: "Simple diagram: Mughal subah at the top, Deputy governor Nawab of Carnatic in the middle, and two arrows to English and French." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hazarduari Palace Murshidabad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/7.png. the Hazarduari Palace in Murshidabad",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Plassey battle monument Palashi West Bengal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/8.png. the monument at the Plassey battlefield",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/9.png": { t: "fig", about: "Timeline with boxes: 1717 Murshid Quli Khan, 1740 Giriya, 1757 Plassey, 1764 Buxar, 1765 Allahabad." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bada Imambara Lucknow photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/10.png. the Bada Imambara in Lucknow",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/11.png": { t: "fig", about: "Succession chain of boxes: Saadat Khan 1722, Safdarjung, Shuja-ud-Daula, Asaf-ud-Daula, Wajid Ali Shah 1856." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Srirangapatna Tipu Sultan Summer Palace photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/12.png. the Daria Daulat palace at Srirangapatna",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/13.png": { t: "fig", about: "Timeline: 1755 Dindigul, 1761 Hyder takes power, 1782 Hyder dies, 1799 Tipu falls." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Padmanabhaswamy Temple Thiruvananthapuram photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/14.png. Padmanabhaswamy Temple in Thiruvananthapuram",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/15.png": { t: "fig", about: "Schematic, not a map: four labelled boxes Calicut, Chirakkal, Cochin, Travancore with Travancore in a bold border." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lohagarh Fort Bharatpur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/16.png. Lohagarh Fort at Bharatpur",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/17.png": { t: "fig", about: "Schematic, not a map: a triangle with Delhi, Agra and Mathura at its corners and a fort marked Bharatpur inside." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rampur Raza Library Uttar Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/18.png. the Rampur Raza Library building",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/19.png": { t: "fig", about: "Schematic, not a map: three boxes Marathas, Awadh with the British, Rohilla leader, with arrows and the date 1774." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Golden Temple Amritsar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/20.png. the Golden Temple in Amritsar",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Maharaja Ranjit Singh portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/21.png. a portrait painting of Ranjit Singh",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/22.png": { t: "fig", about: "Flow of four boxes: Banda Bahadur, Jassa Singh and twelve Misls, Ranjit Singh takes Lahore 1799, Treaty of Amritsar 1809." },
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Akal Takht Amritsar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/23.png. the Akal Takht in Amritsar",
  "images/General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century/24.png": { t: "fig", about: "Ladder of ten steps numbered 1 to 10, each step with the Guru name from Nanak at the bottom to Gobind Singh at the top." }
});

/* CHANGE LOG
   - No corrections to the book's content.
*/