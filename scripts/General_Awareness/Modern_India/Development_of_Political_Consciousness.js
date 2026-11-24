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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Development_of_Political_Consciousness · 7 concept pages (+ overview) · 33 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📰", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Development of Political Consciousness",
    thumb: {
      image: "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "MODERN INDIA",
      line2: "EDUCATION & PRESS",
      line3: "COMMISSIONS • PRESS ACTS",
      badge: "FULL CHAPTER",
      ribbon: "TABLES • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Development of Political Consciousness | Education and Press Acts | Modern India",
      altTitles: ["Macaulay, Wood's Despatch and Press Acts in One Class", "Education Commissions and Press Acts Year-Wise Table"],
      description: "Education commissions and Press Acts are full of years and names that look alike. In this class we put them in order and learn each with a simple memory trick.\n\n📌 IN THIS CLASS\n✅ Charter Act 1813 and Macaulay's Minute\n✅ Wood's Despatch 1854\n✅ Hunter, Sadler, Hartog, Wardha and Sargent plans\n✅ Origin of the Indian press\n✅ Press Acts from 1799 to 1921\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#ModernIndia #PressActs #GeneralAwareness",
      tags: ["political consciousness", "modern education india", "macaulay minute 1835", "woods despatch 1854", "hunter commission", "sadler commission", "wardha scheme", "sargent plan", "vernacular press act 1878", "press acts", "bengal gazette hickey", "modern india history", "ssc cgl history", "ssc history", "railway history", "general awareness", "history tricks", "charter act 1813", "indian history for exams", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "one shot"],
      hashtags: ["ModernIndia", "PressActs", "GeneralAwareness"],
      thumbText: "EDUCATION & PRESS ACTS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Development of Political Consciousness. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Early Beginnings and Charter Act 1813\n00:00 Macaulay's Minute\n00:00 Wood's Despatch\n00:00 Education Commissions and Plans\n00:00 Origin of the Press\n00:00 Press Acts 1799 to 1921\n00:00 The Acts in Action",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on modern education and the Indian press</u>. These two forces taught Indians to think about rights and freedom, and they give regular marks in the General Awareness paper.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>7</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>33</b><span>Questions</span></div>
        <div class="cp-stat"><b>~47 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Development of Modern Education</b><br>How colleges and societies began, what the Charter Act of 1813 did and why Macaulay's Minute changed education.</li>
        <li><b>Wood's Despatch, 1854</b><br>The great plan that gave India its education department and its first universities.</li>
        <li><b>Major Education Commissions and Plans</b><br>A clear table of the Hunter, Sadler, Hartog, Wardha and Sargent plans.</li>
        <li><b>Indian Newspapers</b><br>From the first printing press to the first Indian newspapers.</li>
        <li><b>Press Acts, 1799 to 1921</b><br>The laws that controlled the press and the laws that freed it, in order of year.</li>
        <li><b>The Acts in Action</b><br>How these laws affected real newspapers and leaders.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> years, heads of commissions and the Viceroys behind each Press Act are asked again and again in the Staff Selection Commission, Railways and Banking exams, so these facts are easy marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🎓", accent: "#f59e0b", pauseTimer: true,
    title: "Development of Modern Education — Early Beginnings and the Charter Act of 1813",
    html: `
      <p class="cp-lead">Modern education in India began slowly, with a few colleges and societies. <u>The Charter Act of 1813 made the government responsible for education for the first time.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/1.png" alt="Fort William College Calcutta 1800 historic photo" data-caption="Fort William College in Calcutta, set up in 1800 to train civil officers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/2.png" alt="Asiatic Society Kolkata building photo" data-caption="The Asiatic Society building in Kolkata, founded by Sir William Jones in 1784." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/3.png" alt="Timeline with five dated boxes: 1781 Calcutta Madrasa, 1784 Asiatic Society, 1791 Sanskrit" data-caption="The early steps in education, from 1781 to 1813." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Year</th><th>Institution</th><th>Founder</th></tr></thead><tbody><tr><td>1781</td><td>Calcutta Madrasa, for Arabic and Persian</td><td>Warren Hastings</td></tr><tr><td>1784</td><td>Asiatic Society of Bengal, Calcutta</td><td>Sir William Jones</td></tr><tr><td>1791</td><td>Sanskrit College, Banaras</td><td>Jonathan Duncan, the Resident</td></tr><tr><td>1800</td><td>Fort William College, Calcutta, for civil officers</td><td>Lord Wellesley</td></tr><tr><td>1817</td><td>Hindu College, Calcutta, the first Western-system college</td><td>Indian reformers with David Hare</td></tr></tbody></table>
      <p class="cp-lead">The Charter Act of 1813 told the Governor-General to spend one lakh rupees a year on reviving literature, helping native scholars and teaching science and philosophy. Three government Sanskrit Colleges were set up at Calcutta, Agra and Banaras.</p>
      <p class="cp-lead">A General Committee of Public Instruction of ten members was formed. It split into two groups. The Orientalists wanted education in Sanskrit, Arabic and Persian, and their leaders were Henry Thoby Prinsep, the Secretary, and Horace Hayman Wilson. The Anglicists wanted English education, and their leaders were Thomas Munro and Mountstuart Elphinstone, backed by Lord Macaulay.</p>
      <div class="cp-note trap">Orientalists favoured Sanskrit, Arabic and Persian, while Anglicists favoured English. Do not swap the names of Prinsep and Wilson with Munro and Elphinstone.</div>
      <div class="cp-note exam">Hindu College of 1817 was the first college on the Western system, and it later became Presidency College.</div>
    `
  },
  3: {
    questext: "The Charter Act of 1813 set aside how much money each year for education?",
    options: ["One thousand rupees", "Ten thousand rupees", "One lakh rupees", "One crore rupees"],
    correct: "3",
    exptext: "The Charter Act of 1813 set aside one lakh rupees a year for education. Remember 1813 with one lakh. The other amounts are far too small or too large for that time."
  },
  4: {
    questext: "Who founded the Asiatic Society of Bengal in 1784?",
    options: ["Sir William Jones", "Warren Hastings", "Lord Wellesley", "Jonathan Duncan"],
    correct: "1",
    exptext: "Sir William Jones founded the Asiatic Society of Bengal in Calcutta in 1784. Remember Jones with the Society. Hastings founded the Calcutta Madrasa in 1781, so he is the tempting wrong option."
  },
  5: {
    questext: "Fort William College was established in which year?",
    options: ["1781", "1791", "1813", "1800"],
    correct: "4",
    exptext: "Lord Wellesley set up Fort William College in 1800 to train civil officers. Remember 1800 with Wellesley. The year 1791 is the Sanskrit College at Banaras, which makes it the tempting wrong option."
  },
  6: {
    questext: "Which of the following was a leader of the Anglicists?",
    options: ["Henry Thoby Prinsep", "Thomas Munro", "Horace Hayman Wilson", "Jonathan Duncan"],
    correct: "2",
    exptext: "Thomas Munro was an Anglicist, who wanted English education. Remember that Prinsep and Wilson were Orientalists. Prinsep is the tempting wrong option as he led the other side."
  },
  7: {
    questext: "Consider the following statements about education before 1835:\n1. The Calcutta Madrasa was founded in 1781 by Warren Hastings.\n2. The Sanskrit College at Banaras was founded in 1791 by Jonathan Duncan.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "Both statements are correct. Hastings set up the Madrasa in 1781, and Duncan the Sanskrit College in 1791. Remember the years 1781 and 1791 by the founder's name."
  },
  8: {
    type: "concept", icon: "✍️", accent: "#ef4444", pauseTimer: true,
    title: "Macaulay's Minute, 1835",
    html: `
      <p class="cp-lead"><u>Macaulay's Minute of 2 February 1835 decided that English would be the medium of education in India.</u> It ended the long fight between the Orientalists and the Anglicists.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/4.png" alt="Thomas Babington Macaulay portrait" data-caption="Thomas Babington Macaulay, whose Minute of 1835 backed English education." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/5.png" alt="Flow diagram with four boxes and arrows: Educate the upper class, They teach the people, E" data-caption="The Downward Filtration Theory shown as a simple flow." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Macaulay backed the Anglicist group. He said that one shelf of a good European library was worth all the native literature of India and Arabia. English became the medium in schools and colleges, and mass education was neglected, since the aim was an English-educated upper class.</p>
      <p class="cp-lead">This idea is called the Downward Filtration Theory. It said that if the upper class was educated, the knowledge would filter down to the masses. Lord William Bentinck enforced the Minute through his resolution of 7 March 1835, known as the English Education Act. In 1844, Lord Hardinge said that English-knowing Indians would be preferred for government jobs.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Macaulay's Minute</td><td>2 February 1835</td></tr><tr><td>Bentinck's resolution (English Education Act)</td><td>7 March 1835</td></tr><tr><td>Theory</td><td>Downward Filtration</td></tr><tr><td>Hardinge's order</td><td>1844, English-knowing Indians preferred for jobs</td></tr><tr><td>Macaulay's post</td><td>Law Member under Bentinck</td></tr></tbody></table>
      <div class="cp-note trap">The Minute is dated 2 February 1835, and Bentinck's resolution is dated 7 March 1835. Do not mix the two dates.</div>
      <div class="cp-note exam">Macaulay was the law member in the council of Lord William Bentinck.</div>
    `
  },
  9: {
    questext: "Macaulay's Minute on education was written in which year?",
    options: ["1813", "1854", "1857", "1835"],
    correct: "4",
    exptext: "Macaulay's Minute was written on 2 February 1835. Remember 1835 with Macaulay. The year 1854 is Wood's Despatch, so it is the tempting wrong option."
  },
  10: {
    questext: "The Downward Filtration Theory meant which of the following?",
    options: ["Educating the upper class so that knowledge would reach the masses", "Educating all villagers at the same time", "Education only in Indian languages", "Education only for girls"],
    correct: "1",
    exptext: "The theory said that educating the upper class would let knowledge filter down to the masses. Remember it as education flowing from the top. The other options do not describe this policy."
  },
  11: {
    questext: "Who enforced Macaulay's Minute through a resolution on 7 March 1835?",
    options: ["Lord Dalhousie", "Lord Hardinge", "Lord Canning", "Lord William Bentinck"],
    correct: "4",
    exptext: "Lord William Bentinck passed the resolution of 7 March 1835, called the English Education Act. Remember Bentinck with the Minute. Hardinge is the tempting wrong option as his order came in 1844."
  },
  12: {
    questext: "Consider the following statements about Macaulay's Minute:\n1. It made English the medium of education.\n2. It supported the Orientalist group.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Neither 1 nor 2", "Both 1 and 2", "Only 1"],
    correct: "4",
    exptext: "Only statement 1 is correct. Macaulay supported the Anglicists and not the Orientalists. Remember Macaulay with English."
  },
  13: {
    questext: "The order that English-knowing Indians would be preferred for government jobs was given by whom in 1844?",
    options: ["Lord Hardinge", "Lord Macaulay", "Lord Wellesley", "Lord Curzon"],
    correct: "1",
    exptext: "Lord Hardinge gave this order in 1844 and it made English education popular for jobs. Remember Hardinge with 1844. Macaulay is the tempting wrong option because he wrote the Minute in 1835."
  },
  14: {
    type: "concept", icon: "📜", accent: "#3b82f6", pauseTimer: true,
    title: "Wood's Despatch, 1854 — Magna Carta of Indian Education",
    html: `
      <p class="cp-lead">Wood's Despatch of 1854 is called the Magna Carta of Indian Education. <u>It laid the plan for the whole system of education, from schools to universities.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/6.png" alt="Sir Charles Wood portrait" data-caption="Sir Charles Wood, head of the Board of Control, who prepared the Despatch of 1854." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/7.png" alt="Pyramid chart in three levels: University at the top, High school and college in the middl" data-caption="The three levels of the education plan recommended in 1854." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Despatch came in the time of Lord Dalhousie, and the plan was by Sir Charles Wood, who was head of the Board of Control. It said that the government must take responsibility for mass education. English would be the medium of higher education, while vernacular languages were encouraged. It recommended teacher-training institutes, women's education and schools through the help of people like Bethune.</p>
      <p class="cp-lead">A Public Education Department was to be set up in every province, and three universities were to be opened at Calcutta, Bombay and Madras on the model of the University of London. The Education Department was created in 1855, and the three universities began in 1857. It also introduced Grants-in-Aid for private schools.</p>
      <table><thead><tr><th>Recommendation</th><th>Detail</th></tr></thead><tbody><tr><td>Government responsibility</td><td>Mass education</td></tr><tr><td>Medium</td><td>English for higher education, vernaculars encouraged</td></tr><tr><td>Public Education Department</td><td>In every province, 1855</td></tr><tr><td>Universities</td><td>Calcutta, Bombay, Madras, 1857</td></tr><tr><td>Model</td><td>University of London</td></tr><tr><td>Grants-in-Aid</td><td>Support to private schools</td></tr></tbody></table>
      <div class="cp-note trap">The three universities of 1857 were Calcutta, Bombay and Madras. Do not add Delhi, Lahore or Allahabad, which came later.</div>
    `
  },
  15: {
    questext: "Wood's Despatch is called the Magna Carta of Indian Education because:",
    options: ["It ended English education", "It laid down a complete plan for education", "It closed the universities", "It banned vernacular languages"],
    correct: "2",
    exptext: "Wood's Despatch gave a full plan for education, from primary schools to universities. Remember it as the Magna Carta of education. The other options are the opposite of what it did."
  },
  16: {
    questext: "Wood's Despatch was announced in which year?",
    options: ["1835", "1857", "1854", "1882"],
    correct: "3",
    exptext: "Wood's Despatch came in 1854. Remember 1854 and Dalhousie. The year 1835 is Macaulay's Minute, and the year 1857 is when the universities began."
  },
  17: {
    questext: "The universities of 1857 were set up on the model of which university?",
    options: ["University of Oxford", "University of Cambridge", "University of Edinburgh", "University of London"],
    correct: "4",
    exptext: "The universities of Calcutta, Bombay and Madras followed the model of the University of London. Remember London with 1857. Oxford is the tempting wrong option because it is better known."
  },
  18: {
    questext: "Which of the following was recommended by Wood's Despatch?",
    options: ["Public Education Department in every province", "Closing all vernacular schools", "Ending teacher training", "Only religious education"],
    correct: "1",
    exptext: "A Public Education Department in every province was recommended, and it was created in 1855. Remember teacher training and women's education also came in the Despatch. The other options are false."
  },
  19: {
    type: "concept", icon: "🏫", accent: "#10b981", pauseTimer: true,
    title: "Major Education Commissions and Plans",
    html: `
      <p class="cp-lead">After Wood's Despatch, India had several commissions to improve education. <u>For each one, learn the year, the head and the main point.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/8.png" alt="Timeline with five dated boxes: 1882 Hunter Commission, 1904 Indian Universities Act, 1917" data-caption="The main education commissions and plans in order of year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/9.png" alt="Zakir Hussain Gandhi Wardha basic education photo" data-caption="Gandhi and Zakir Hussain at Wardha, where Basic Education was planned in 1937." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Commission or plan</th><th>Year</th><th>Head</th><th>Key points</th></tr></thead><tbody><tr><td>Hunter Commission</td><td>1882 to 1883</td><td>Sir William Wilson Hunter</td><td>Reviewed progress after Wood's Despatch; stressed primary education</td></tr><tr><td>Indian Universities Act</td><td>1904</td><td>Lord Curzon; Raleigh Commission of 1902 under Thomas Raleigh; Shimla conference of 1901</td><td>Veto over University Senate decisions and over college affiliation; tighter control of private colleges; Gopal Krishna Gokhale said it held back national education</td></tr><tr><td>Sadler Commission</td><td>1917</td><td>Sir Michael Sadler, with Ashutosh Mukherjee and Ziauddin Ahmed</td><td>Twelve years of school and then two years of Intermediate; High School Board and Intermediate Board in each province; degree of at most three years; suggested universities at Mysore, Patna, Banaras, Aligarh, Dhaka, Lucknow and Hyderabad</td></tr><tr><td>Hartog Committee</td><td>1929</td><td>Sir Philip Hartog</td><td>Quality of primary education over quantity; middle school, then industrial and vocational education</td></tr><tr><td>Wardha Plan (Basic Education)</td><td>1937</td><td>Zakir Hussain Committee, from Gandhi's ideas</td><td>Free and compulsory education in the mother tongue for seven years; based on Gandhi's Harijan articles and the Wardha conference of October 1937</td></tr><tr><td>Sargent Plan</td><td>1944</td><td>Sir John Sargent, educational adviser to the Government of India</td><td>Primary and high school across the country; free and compulsory education for children aged 6 to 11</td></tr></tbody></table>
      <div class="cp-note trap">The Hunter Commission of 1882 stressed primary education, and the Hartog Committee of 1929 also stressed primary education, but its aim was quality rather than quantity. Do not swap them with the Sadler Commission, which dealt with universities.</div>
      <div class="cp-note exam">The Indian Universities Act of 1904 followed the Raleigh Commission of 1902 and gave the government a veto over university decisions.</div>
    `
  },
  20: {
    questext: "The Hunter Commission on education was set up in which years?",
    options: ["1854 to 1855", "1882 to 1883", "1902", "1917"],
    correct: "2",
    exptext: "The Hunter Commission worked in 1882 and 1883. Remember Hunter with primary education. The year 1917 is the Sadler Commission, which makes it the tempting wrong option."
  },
  21: {
    questext: "The Indian Universities Act of 1904 was passed under which Viceroy?",
    options: ["Lord Curzon", "Lord Ripon", "Lord Lytton", "Lord Minto"],
    correct: "1",
    exptext: "Lord Curzon passed the Indian Universities Act of 1904, after the Raleigh Commission of 1902. Remember Curzon with 1904. Gopal Krishna Gokhale criticised it, so it was not popular."
  },
  22: {
    questext: "Which commission of 1917 recommended twelve years of school followed by an Intermediate course?",
    options: ["Hunter Commission", "Hartog Committee", "Sadler Commission", "Raleigh Commission"],
    correct: "3",
    exptext: "The Sadler Commission of 1917, led by Sir Michael Sadler, suggested twelve years of school and then two years of Intermediate. Remember Sadler with universities. The Raleigh Commission is the tempting wrong option as it came in 1902."
  },
  23: {
    questext: "The Wardha Plan of 1937 is also known as what?",
    options: ["Sargent Plan", "Basic Education", "Higher Education", "Women's Education"],
    correct: "2",
    exptext: "The Wardha Plan is also known as Basic Education, and it came from Gandhi's ideas. It urged free and compulsory education in the mother tongue for seven years. The Sargent Plan came in 1944, so it is wrong."
  },
  24: {
    questext: "Consider the following statements:\n1. The Hartog Committee of 1929 stressed quality of primary education.\n2. The Sargent Plan of 1944 proposed free and compulsory education for children aged 6 to 11.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Neither 1 nor 2", "Both 1 and 2"],
    correct: "4",
    exptext: "Both statements are correct. Hartog stressed quality of primary education, and Sargent proposed free and compulsory schooling from 6 to 11. Remember Hartog with 1929 and Sargent with 1944."
  },
  25: {
    questext: "Which pair is correctly matched?",
    options: ["Hunter Commission, emphasis on primary education", "Sadler Commission, 1929", "Hartog Committee, 1917", "Sargent Plan, 1937"],
    correct: "1",
    exptext: "The Hunter Commission stressed primary education. The Sadler Commission was in 1917, the Hartog Committee in 1929 and the Sargent Plan in 1944, so the other pairs fail. Remember each commission with its own year."
  },
  26: {
    type: "concept", icon: "🗞️", accent: "#8b5cf6", pauseTimer: true,
    title: "Indian Newspapers — Origin of the Press",
    html: `
      <p class="cp-lead">Printing and newspapers gave Indians a voice. <u>The Portuguese brought the first printing press, and a British man started the first newspaper.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/10.png" alt="Hickey's Bengal Gazette 1780 first newspaper India" data-caption="Hickey's Bengal Gazette of 1780, the first newspaper of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/11.png" alt="Serampore Baptist mission press historic photo" data-caption="The Serampore mission press, where Samachar Darpan was printed in 1818." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/12.png" alt="Timeline with six dated boxes: 1557 first book printed at Goa, 1684 Company press at Bomba" data-caption="The beginnings of printing and the press in India, in order of year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Portuguese first brought printing presses to India, and priests at Goa printed the first book in India in 1557. The East India Company set up its press at Bombay in 1684. James Augustus Hickey started The Bengal Gazette, also called The Calcutta General Advertiser, in 1780. It was the first newspaper of India, and it was shut down for criticising the government.</p>
      <p class="cp-lead">Samachar Darpan, a Bengali weekly of 1818, came from the Serampore Baptist missionaries and was among the first Indian-language papers. Raja Ram Mohan Roy then brought out Sambad Kaumudi in Bengali in 1821 and Mirat-ul-Akhbar in Persian in 1822.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1557</td><td>First book printed in India at Goa by the Portuguese</td></tr><tr><td>1684</td><td>Company press at Bombay</td></tr><tr><td>1780</td><td>Hickey's Bengal Gazette, first newspaper</td></tr><tr><td>1818</td><td>Samachar Darpan, Serampore Baptist missionaries</td></tr><tr><td>1821</td><td>Sambad Kaumudi, Raja Ram Mohan Roy</td></tr><tr><td>1822</td><td>Mirat-ul-Akhbar, Raja Ram Mohan Roy</td></tr></tbody></table>
      <div class="cp-note trap">The Bengal Gazette was started by an Englishman in 1780, while the first Indian-language paper by Indians, Roy's Sambad Kaumudi, came in 1821.</div>
    `
  },
  27: {
    questext: "Who started The Bengal Gazette, the first newspaper of India, in 1780?",
    options: ["Raja Ram Mohan Roy", "Warren Hastings", "James Augustus Hickey", "William Carey"],
    correct: "3",
    exptext: "James Augustus Hickey started The Bengal Gazette in 1780. Remember Hickey with the first newspaper. Roy started his papers in 1821 and 1822, so he is the tempting wrong option."
  },
  28: {
    questext: "The first book in India was printed at which place in 1557?",
    options: ["Bombay", "Goa", "Calcutta", "Madras"],
    correct: "2",
    exptext: "The first book in India was printed at Goa in 1557 by the Portuguese. Remember Goa with the Portuguese. Bombay is the place of the Company press of 1684, so it is the tempting wrong option."
  },
  29: {
    questext: "Samachar Darpan of 1818 was published by whom?",
    options: ["Serampore Baptist missionaries", "Raja Ram Mohan Roy", "Lord Wellesley", "Charles Metcalfe"],
    correct: "1",
    exptext: "The Serampore Baptist missionaries published Samachar Darpan as a Bengali weekly. Remember Serampore with Samachar Darpan. Roy published Sambad Kaumudi in 1821, which makes him the tempting wrong option."
  },
  30: {
    questext: "Consider the following statements about the early Indian press:\n1. Sambad Kaumudi was a Bengali paper started by Raja Ram Mohan Roy in 1821.\n2. Mirat-ul-Akhbar was a Persian paper started by Roy in 1822.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "Both statements are correct. Roy started Sambad Kaumudi in 1821 and Mirat-ul-Akhbar in 1822. Remember Bengali for 1821 and Persian for 1822."
  },
  31: {
    type: "concept", icon: "⛓️", accent: "#14b8a6", pauseTimer: true,
    title: "Timeline of Press Acts, 1799 to 1921",
    html: `
      <p class="cp-lead">The British rulers both controlled and freed the press many times. <u>Learn each Act with its year, the person behind it and its main point.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/13.png" alt="Timeline strip with eleven dated boxes: 1799, 1818, 1823, 1835, 1857, 1867, 1878, 1882, 19" data-caption="Press Acts from 1799 to 1921, with control years and freedom years marked." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/14.png" alt="Lord Lytton Viceroy portrait" data-caption="Lord Lytton, the Viceroy who passed the Vernacular Press Act of 1878." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Year</th><th>Act or event</th><th>Associated with</th><th>Key point</th></tr></thead><tbody><tr><td>1799</td><td>Censorship of Press Act</td><td>Lord Wellesley</td><td>Pre-censorship: papers went to the government secretary before printing; owner, editor and printer were named</td></tr><tr><td>1818</td><td>Pre-censorship abolished</td><td>Lord Hastings</td><td>A liberal and progressive attitude</td></tr><tr><td>1823</td><td>Licensing Regulations</td><td>John Adams, acting Governor-General</td><td>A licence was needed to set up a press; a magistrate could seize an unlicensed press</td></tr><tr><td>1835</td><td>Press Act, or Metcalfe Act</td><td>Charles Metcalfe</td><td>Repealed the Act of 1823 and earned him the name Liberator of the Indian Press; newspapers multiplied</td></tr><tr><td>1857</td><td>Licensing Act</td><td>Emergency of the Revolt of 1857</td><td>No press without a licence; lasted one year</td></tr><tr><td>1867</td><td>Press and Registration of Books Act</td><td>Government of India</td><td>Regulating, not restricting: printer's and publisher's name and place on every book</td></tr><tr><td>1878</td><td>Vernacular Press Act</td><td>Lord Lytton</td><td>Curbed Indian-language papers; the District Magistrate could stop publication and his decision was final</td></tr><tr><td>1882</td><td>Vernacular Press Act repealed</td><td>Lord Ripon</td><td>Press freedom restored</td></tr><tr><td>1908</td><td>Newspapers (Incitement to Offences) Act</td><td>After the Partition of Bengal</td><td>Suppressed extremist criticism</td></tr><tr><td>1910</td><td>Indian Press Act</td><td>Lord Minto</td><td>Revived Lytton's harsh provisions</td></tr><tr><td>1921</td><td>Press Inquiry Committee</td><td>Sir Tej Bahadur Sapru</td><td>The Acts of 1908 and 1910 were abolished</td></tr></tbody></table>
      <div class="cp-note trap">The Vernacular Press Act of 1878 was passed by Lord Lytton and repealed by Lord Ripon in 1882. The Press Act of 1835 was passed by Charles Metcalfe, who is called the Liberator of the Indian Press.</div>
      <div class="cp-note exam">The Vernacular Press Act of 1878 was nicknamed the Gagging Act, and it spared English-language papers.</div>
    `
  },
  32: {
    questext: "The Censorship of Press Act of 1799 was passed by whom?",
    options: ["Lord Hastings", "Lord Wellesley", "Lord Lytton", "Charles Metcalfe"],
    correct: "2",
    exptext: "Lord Wellesley brought the Censorship of Press Act of 1799. Remember Wellesley as the first to censor. Lord Hastings is the tempting wrong option, since he removed censorship in 1818."
  },
  33: {
    questext: "Who is called the Liberator of the Indian Press?",
    options: ["Charles Metcalfe", "Lord Ripon", "Lord Lytton", "Lord Curzon"],
    correct: "1",
    exptext: "Charles Metcalfe repealed the Act of 1823 through his Act of 1835. Remember Metcalfe as the Liberator. Ripon repealed the Vernacular Press Act, so he is the tempting wrong option."
  },
  34: {
    questext: "The Vernacular Press Act of 1878 was passed under which Viceroy?",
    options: ["Lord Ripon", "Lord Curzon", "Lord Lytton", "Lord Minto"],
    correct: "3",
    exptext: "Lord Lytton passed the Vernacular Press Act of 1878, which curbed Indian-language papers. Remember Lytton with the Gagging Act. Ripon repealed it in 1882, so he is the tempting wrong option."
  },
  35: {
    questext: "The Vernacular Press Act of 1878 was repealed in 1882 by whom?",
    options: ["Lord Lytton", "Lord Ripon", "Lord Curzon", "Lord Dufferin"],
    correct: "2",
    exptext: "Lord Ripon repealed the Act in 1882 and restored press freedom. Remember Lytton passed it and Ripon repealed it. Lytton is the tempting wrong option."
  },
  36: {
    questext: "Consider the following statements about Press Acts:\n1. The Licensing Act of 1857 was passed during the emergency of the Revolt and lasted one year.\n2. The Newspapers (Incitement to Offences) Act of 1908 was passed under Lord Curzon.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Only 2", "Neither 1 nor 2", "Only 1"],
    correct: "4",
    exptext: "Only statement 1 is correct. The Act of 1908 was passed under Lord Minto after the Partition of Bengal, as Curzon had left in 1905. Remember that the Licensing Act was an emergency law of one year."
  },
  37: {
    questext: "The Press Inquiry Committee of 1921 under Sir Tej Bahadur Sapru led to what?",
    options: ["Abolition of the Acts of 1908 and 1910", "The Vernacular Press Act", "The Licensing Act", "The Censorship Act of 1799"],
    correct: "1",
    exptext: "The Press Inquiry Committee led to the abolition of the Acts of 1908 and 1910. Remember Sapru with the end of those Acts. The others are older Acts."
  },
  38: {
    type: "concept", icon: "🔎", accent: "#f97316", pauseTimer: true,
    title: "The Acts in Action",
    html: `
      <p class="cp-lead">Press Acts were not only on paper. <u>They hit real newspapers and real leaders, and some even changed their language to escape them.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/15.png" alt="Amrita Bazar Patrika old newspaper photo" data-caption="An old copy of Amrita Bazar Patrika, which turned English overnight in 1878." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Development_of_Political_Consciousness/16.png" alt="Two-column chart. Left column Law with items 1823 Licensing Regulations, 1878 Vernacular P" data-caption="Two Press Acts and what they did to Indian newspapers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Because of the Licensing Regulations of 1823, Raja Ram Mohan Roy had to stop his Persian paper Mirat-ul-Akhbar. Under the Vernacular Press Act of 1878, cases were filed against Som Prakash, Bharat Mihir, Dhaka Prakash and Sahachar, and the Amrita Bazar Patrika turned English overnight to escape the Act.</p>
      <p class="cp-lead">The Press and Registration of Books Act of 1867 was regulatory and not restrictive, since it asked only for the printer's and publisher's name and the place of printing on every book and newspaper.</p>
      <div class="cp-note exam">John Elliot Drinkwater Bethune started a pioneer girls' school at Calcutta in 1849, and Ishwar Chandra Vidyasagar was its secretary. The first Indian Vice-Chancellor of Calcutta University was Sir Gurudas Banerjee in 1890, and Ashutosh Mukherjee served in 1906 to 1914 and 1921 to 1923.</div>
      <div class="cp-note trap">Do not confuse Macaulay's Minute of 2 February 1835 with Bentinck's resolution of 7 March 1835. The Licensing Act of 1857 was an emergency law and lapsed in a year.</div>
    `
  },
  39: {
    questext: "Which newspaper turned into an English paper overnight to escape the Vernacular Press Act?",
    options: ["Som Prakash", "Amrita Bazar Patrika", "Bharat Mihir", "Sahachar"],
    correct: "2",
    exptext: "The Amrita Bazar Patrika became an English paper overnight, as the Act spared English-language papers. Remember the Gagging Act and English. The other papers were Indian-language papers that were charged."
  },
  40: {
    questext: "Which Act asked for the name of the printer and publisher and the place of printing on every book?",
    options: ["Vernacular Press Act", "Licensing Act of 1857", "Press and Registration of Books Act of 1867", "Indian Press Act of 1910"],
    correct: "3",
    exptext: "The Press and Registration of Books Act of 1867 asked for these details and was regulatory, not restrictive. Remember 1867 with registration. The other Acts were restrictive."
  },
  41: {
    questext: "Who was the first Indian Vice-Chancellor of Calcutta University?",
    options: ["Ashutosh Mukherjee", "Raja Ram Mohan Roy", "Rabindranath Tagore", "Sir Gurudas Banerjee"],
    correct: "4",
    exptext: "Sir Gurudas Banerjee became the first Indian Vice-Chancellor of Calcutta University in 1890. Remember Gurudas as the first and Ashutosh Mukherjee as the later famous one. Mukherjee is the tempting wrong option."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an old iron hand printing press, a stack of newspapers and an open school slate, in warm sepia tones" },
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fort William College Calcutta 1800 historic photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Development_of_Political_Consciousness/1.png. an old picture of Fort William College",
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Asiatic Society Kolkata building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Development_of_Political_Consciousness/2.png. the Asiatic Society building",
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/3.png": { t: "fig", about: "Timeline with five dated boxes: 1781 Calcutta Madrasa, 1784 Asiatic Society, 1791 Sanskrit College Banaras, 1800 Fort William College, 1813 Charter Act grant." },
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Thomas Babington Macaulay portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Development_of_Political_Consciousness/4.png. a portrait of Thomas Babington Macaulay",
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/5.png": { t: "fig", about: "Flow diagram with four boxes and arrows: Educate the upper class, They teach the people, Education filters down, Masses educated." },
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sir Charles Wood portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Development_of_Political_Consciousness/6.png. a portrait of Sir Charles Wood",
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/7.png": { t: "fig", about: "Pyramid chart in three levels: University at the top, High school and college in the middle, Primary and vernacular school at the base, with a side label Grants-in-aid." },
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/8.png": { t: "fig", about: "Timeline with five dated boxes: 1882 Hunter Commission, 1904 Indian Universities Act, 1917 Sadler Commission, 1929 Hartog Committee, 1937 Wardha Plan, 1944 Sargent Plan." },
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Zakir Hussain Gandhi Wardha basic education photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Development_of_Political_Consciousness/9.png. Gandhi and Zakir Hussain at Wardha",
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hickey's Bengal Gazette 1780 first newspaper India\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Development_of_Political_Consciousness/10.png. a copy of Hickey's Bengal Gazette",
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Serampore Baptist mission press historic photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Development_of_Political_Consciousness/11.png. the Serampore mission press",
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/12.png": { t: "fig", about: "Timeline with six dated boxes: 1557 first book printed at Goa, 1684 Company press at Bombay, 1780 Bengal Gazette, 1818 Samachar Darpan, 1821 Sambad Kaumudi, 1822 Mirat-ul-Akhbar." },
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/13.png": { t: "fig", about: "Timeline strip with eleven dated boxes: 1799, 1818, 1823, 1835, 1857, 1867, 1878, 1882, 1908, 1910, 1921. Label the controlling years in red and the freeing years in green." },
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Lytton Viceroy portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Development_of_Political_Consciousness/14.png. a portrait of Lord Lytton",
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Amrita Bazar Patrika old newspaper photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Development_of_Political_Consciousness/15.png. an old copy of Amrita Bazar Patrika",
  "images/General_Awareness/Modern_India/Development_of_Political_Consciousness/16.png": { t: "fig", about: "Two-column chart. Left column Law with items 1823 Licensing Regulations, 1878 Vernacular Press Act. Right column Result with items Roy stopped Mirat-ul-Akhbar, Amrita Bazar Patrika became an English paper." }
});

/* CHANGE LOG
   - The Newspapers (Incitement to Offences) Act of 1908 and the Indian Press Act of 1910 were passed under Lord Minto, not Lord Curzon, who had left India in 1905; the pages say they followed the Partition of Bengal.
   - The Licensing Regulation of 1823 is linked with John Adams, the acting Governor-General.
   - Full names are written out in place of initials, for example Henry Thoby Prinsep and John Elliot Drinkwater Bethune.
*/