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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Economic_and_Administrative_Policies · 14 concept pages (+ overview) · 44 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "💰", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Economic and Administrative Policies of the British",
    thumb: {
      image: "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "BRITISH ECONOMIC",
      line2: "POLICIES",
      line3: "LAND REVENUE • DRAIN",
      badge: "FULL CLASS",
      ribbon: "SYSTEMS • ACTS • TRICKS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Economic & Administrative Policies of the British | Land Revenue, Drain Theory | SSC CGL",
      altTitles: ["Permanent Settlement, Ryotwari, Mahalwari in One Class", "Drain of Wealth and De-industrialisation Made Easy"],
      description: "Land revenue systems, the Drain of Wealth and the fathers of different services are favourite Modern History questions. In this class you learn the British economic and administrative policies in simple words.\n\n📌 IN THIS CLASS\n✅ Three phases of colonial exploitation\n✅ Permanent Settlement, Ryotwari and Mahalwari\n✅ Acts with years and provisions\n✅ Drain of Wealth and De-industrialisation\n✅ Railways, post, police and courts\n✅ Practice questions with easy explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernHistory #DrainTheory",
      tags: ["economic policies of british", "permanent settlement", "ryotwari system", "mahalwari system", "land revenue systems", "drain of wealth", "dadabhai naoroji drain theory", "de industrialisation india", "indigo revolt", "charter acts", "regulating act 1773", "pitt india act 1784", "railways in india history", "lord dalhousie railways", "civil services cornwallis", "local self government ripon", "modern history for ssc cgl", "ssc cgl history", "general awareness", "history for railway exams", "modern history tricks", "history one shot", "UPSC"],
      hashtags: ["SSCCGL", "ModernHistory", "DrainTheory"],
      thumbText: "BRITISH ECONOMIC POLICIES",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "💰 New class is live: Economic and Administrative Policies of the British. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Modern History — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">This class explains <u>how the British ran the economy and the government of India for their own profit</u>. We will learn the three phases of exploitation, the land-revenue systems, the drain of wealth and the new institutions such as railways, post, police and courts.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>14</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>44</b><span>Questions</span></div>
        <div class="cp-stat"><b>~72 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Colonial Economy and the Three Phases</b><br>How India became a colonial economy, and how British aims changed from plunder to free trade to finance.</li>
        <li><b>Land-Revenue Systems and the Acts</b><br>The Permanent Settlement, Ryotwari and Mahalwari systems, and the Acts that shaped British rule, with years and provisions.</li>
        <li><b>Commercialisation, Drain of Wealth and De-industrialisation</b><br>How farming was forced towards cash crops, how wealth flowed out of India and how old handicrafts were destroyed.</li>
        <li><b>New Industries</b><br>The first modern mills and factories and who started them.</li>
        <li><b>Administrative Machinery</b><br>Post and telegraph, local government, civil services, police and the courts.</li>
        <li><b>Railways and Added Exam Facts</b><br>How railways came to India and the small facts and traps that exams often ask.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> this chapter gives many direct questions on names, years and systems, such as the three land-revenue systems, the Drain Theory and the fathers of different services.</div>
    `
  },
  2: {
    type: "concept", icon: "🏭", accent: "#3b82f6", pauseTimer: true,
    title: "Colonial Economy and the Three Phases",
    html: `
      <p class="cp-lead">After the Battle of Plassey in 1757, the inland trade of Bengal fell into British hands. <u>India became a colonial economy: a land that supplied cheap raw material and bought finished goods.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/1.png" alt="Simple flow: India sends raw cotton, indigo and jute to Britain on one arrow; Britain send" data-caption="A colonial economy: raw material goes out, factory goods come in." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/2.png" alt="Bengal muslin weaver 19th century photograph" data-caption="A hand weaver of Bengal, whose cloth was once sold across the world." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The British first came as merchants and fought the French, Portuguese and Dutch for trade. Until the late eighteenth century, India was the largest producer and exporter of manufactured goods, especially textiles. Later it became a dependent colony.</p>
      <table><thead><tr><th>Phase</th><th>Period</th><th>Main aim</th></tr></thead><tbody><tr><td>Commercial or Mercantile Capitalism</td><td>1757–1813</td><td>Plunder and trade monopoly</td></tr><tr><td>Industrial Capitalism</td><td>1813–1858</td><td>Free trade and a market for British factory goods</td></tr><tr><td>Financial Capitalism</td><td>1858–1947</td><td>Investment of British money in India</td></tr></tbody></table>
      <p class="cp-lead">The author R. P. Dutt pictured the Indian colonial economy in his book India Today.</p>
      <div class="cp-note trap">The phases are not exact boundaries. The years 1813, 1858 and 1947 are only the turning points.</div>
      <div class="cp-note exam">Remember the three phase periods: 1757–1813, 1813–1858 and 1858–1947.</div>
    `
  },
  3: {
    questext: "Who pictured the Indian colonial economy in India Today?",
    options: ["R. P. Dutt", "K. M. Panikkar", "Dadabhai Naoroji", "Percival Spear"],
    correct: "1",
    exptext: "✅ R. P. Dutt wrote India Today and described India as a colonial economy. 📌 Dutt and Today both have the same sound at the end. ❌ K. M. Panikkar is tempting, but he is known for the phrase Robber State."
  },
  4: {
    questext: "Which is the correct order of the three phases of British economic exploitation in India?",
    options: ["Industrial, Commercial, Financial", "Commercial, Industrial, Financial", "Financial, Industrial, Commercial", "Commercial, Financial, Industrial"],
    correct: "2",
    exptext: "✅ The order is Commercial, Industrial and then Financial. 📌 Think of plunder first, factories next and finance last. ❌ Option 4 is tempting, but finance came after the factory phase."
  },
  5: {
    questext: "Consider the following statements:\n1. After 1757, India became a colonial economy that supplied cheap raw material to Britain.\n2. Until the late eighteenth century, India was the largest producer and exporter of manufactured goods, especially textiles.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 India first led in textile trade and then lost it. ❌ Choosing only one ignores that the second statement describes the time before the colonial change."
  },
  6: {
    type: "concept", icon: "🪙", accent: "#f59e0b", pauseTimer: true,
    title: "Phase 1 — Commercial or Mercantile Capitalism (1757–1813)",
    html: `
      <p class="cp-lead">In the first phase, the Company was a trader with an army. <u>Its aim was direct plunder and a trade monopoly.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/3.png" alt="Cycle diagram: Bengal land revenue collected, used to buy Indian goods, goods exported to " data-caption="The first phase: revenue of Bengal was used to buy goods for export." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/4.png" alt="East India Company warehouse Calcutta old engraving" data-caption="A Company warehouse, where goods bought for export were stored." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Company wanted to monopolise India's trade and collect revenue through political control. It bought goods cheap in India and sold them dear in Europe.</p>
      <p class="cp-lead">After 1765, the surplus revenue of Bengal was used to buy Indian goods for export. So the Company no longer needed to bring gold or silver from England. It had full control over the income of Bengal, Bihar and Orissa.</p>
      <p class="cp-lead">The historian K. M. Panikkar called the years 1765 to 1772 the period of the <b>Robber State</b>.</p>
      <div class="cp-note trap">Bullion means gold and silver. In this phase no new bullion came from England, because Bengal's own revenue paid for the goods.</div>
      <div class="cp-note exam">Robber State is the phrase of K. M. Panikkar for 1765–1772.</div>
    `
  },
  7: {
    questext: "K. M. Panikkar described the years from 1765 to 1772 as which kind of rule?",
    options: ["Dual State", "Welfare State", "Police State", "Robber State"],
    correct: "4",
    exptext: "✅ Panikkar called 1765 to 1772 the Robber State because the Company plundered Bengal. 📌 Robber matches plunder. ❌ Dual State is tempting, because the Dual Government was in the same period, but it is not Panikkar's phrase."
  },
  8: {
    questext: "In the first phase of British economic policy, Indian goods for export were bought mainly with which money?",
    options: ["Surplus revenue of Bengal", "Gold brought from England", "Silver brought from China", "Loans from Dutch traders"],
    correct: "1",
    exptext: "✅ The surplus revenue of Bengal paid for the exports, so no bullion came from England. 📌 India paid for its own plunder. ❌ Gold from England is tempting, but the Company stopped sending it."
  },
  9: {
    questext: "Consider the following statements:\n1. The main aim of the first phase was to sell British factory goods in India.\n2. The Company tried to monopolise India's trade in the first phase.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 The first phase was about trade monopoly and plunder. ❌ Statement 1 is wrong because factory goods were sold in the second phase."
  },
  10: {
    type: "concept", icon: "🚂", accent: "#ef4444", pauseTimer: true,
    title: "Phase 2 — Industrial Capitalism (1813–1858)",
    html: `
      <p class="cp-lead">In the second phase, Britain had become a land of factories. <u>It wanted India to buy British goods and to supply raw material.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/5.png" alt="Two arrows between Britain and India: British goods enter India with label duty-free; Indi" data-caption="The second phase: free entry for British goods, heavy tariffs on Indian goods." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/6.png" alt="Handloom weaver at pit loom India photograph" data-caption="A handloom weaver, who lost work when cheap mill cloth arrived." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>Charter Act of 1813</b> ended the Company's trade monopoly and opened India to every British merchant. This was the start of free trade for Britain.</p>
      <p class="cp-lead">Because of the Industrial Revolution in England, Indian goods faced heavy tariffs in Britain, while British goods entered India duty-free. Handicrafts were destroyed. Cheap mill-made British cloth beat hand-made Indian cloth, and the Indian textile industry collapsed.</p>
      <p class="cp-lead">Railways were built for British strategic and economic needs. They carried raw material out, brought British goods in and moved the army against revolts.</p>
      <div class="cp-note trap">Free trade here was one-sided. Indian goods were taxed in Britain, but British goods were not taxed in India.</div>
      <div class="cp-note exam">The Charter Act of 1813 is the starting point of this phase.</div>
    `
  },
  11: {
    questext: "Which Act ended the trade monopoly of the East India Company in India, except in tea and trade with China?",
    options: ["Regulating Act 1773", "Pitt's India Act 1784", "Charter Act 1813", "Charter Act 1833"],
    correct: "3",
    exptext: "✅ The Charter Act of 1813 ended the Company's trade monopoly except in tea and trade with China. 📌 The year 1813 begins the second phase. ❌ The Charter Act of 1833 is tempting, but it ended the Company's commercial role and the China trade."
  },
  12: {
    questext: "Which of the following was NOT a result of British policy in the second phase?",
    options: ["Indian goods faced heavy tariffs in Britain", "British goods entered India duty-free", "Handicrafts were destroyed", "Indian cloth was sold freely in Britain"],
    correct: "4",
    exptext: "✅ Indian cloth was not sold freely in Britain because of heavy tariffs. 📌 Tariffs kept Indian goods out. ❌ Option 2 is tempting as a wrong choice, but British goods did enter India duty-free."
  },
  13: {
    questext: "In this phase, railways in India were built mainly to serve which needs?",
    options: ["British strategic and economic needs", "The comfort of Indian farmers", "The growth of Indian industry", "Pilgrims and travellers"],
    correct: "1",
    exptext: "✅ Railways carried raw material out, British goods in and the army to trouble spots. 📌 Railways were for the rulers first. ❌ Option 3 is tempting, but railways did not help Indian industry in this phase."
  },
  14: {
    type: "concept", icon: "🏦", accent: "#8b5cf6", pauseTimer: true,
    title: "Phase 3 — Financial Capitalism (1858–1947)",
    html: `
      <p class="cp-lead">In the third phase, British investors had a lot of spare money and wanted a safe place to earn interest. <u>They chose the finance market in India.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/7.png" alt="Three boxes in a row: banks, insurance companies, loans to the government of India; arrows" data-caption="In the third phase, British money flowed into banks, insurance and loans." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/8.png" alt="Imperial Bank of India building old photograph" data-caption="An old bank building from the time of British rule in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">British investors chose <b>banks and insurance companies</b>. They avoided cotton textiles and steel, which could compete with British firms.</p>
      <p class="cp-lead">The economy was hollowed out further. Indians had to pay <b>interest on the public debt</b>, so more wealth left the country every year.</p>
      <div class="cp-note trap">In this phase the British did not want strong Indian industry. They put money into finance, not into factories that could compete.</div>
      <div class="cp-note exam">Third phase: 1858 to 1947, banks, insurance and interest on public debt.</div>
    `
  },
  15: {
    questext: "In the third phase of British economic policy, British investors mainly chose which field in India?",
    options: ["Cotton textiles", "Banks and insurance companies", "Handloom weaving", "Iron and steel"],
    correct: "2",
    exptext: "✅ They chose banks and insurance companies, which did not compete with British firms. 📌 Third phase means finance. ❌ Cotton textiles and steel are tempting, but those would have competed with British firms."
  },
  16: {
    questext: "In the third phase, Indians had to pay interest on which of the following?",
    options: ["Land revenue", "Salt tax", "Public debt", "Opium trade"],
    correct: "3",
    exptext: "✅ Indians paid interest on the public debt, which sent wealth out of India. 📌 Debt means the money the government owed to British lenders. ❌ Land revenue is tempting, but it was a tax and not a debt."
  },
  17: {
    type: "concept", icon: "🌾", accent: "#14b8a6", pauseTimer: true,
    title: "Land-Revenue Systems — the Comparison",
    html: `
      <p class="cp-lead">Land revenue was the biggest income of the Company, so the British tried four systems. <u>The main question in each system was: who owns the land and who pays the tax?</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/9.png" alt="Three-column chart: Permanent Settlement (zamindar pays, 19 percent), Ryotwari (cultivator" data-caption="Three land-revenue systems and the share of land each covered." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/10.png" alt="Zamindar and peasants India old photograph" data-caption="A zamindar with farmers, in the time of the Permanent Settlement." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/11.png" alt="Indian farmers ploughing field 19th century photograph" data-caption="Indian farmers at work, who paid the land revenue." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>System</th><th>Founder and year</th><th>Area</th><th>Owner of land</th><th>Coverage</th></tr></thead><tbody><tr><td>Permanent Settlement (Zamindari)</td><td>Lord Cornwallis, 1793</td><td>Bengal, Bihar, Odisha, Banaras and northern Karnataka</td><td>Zamindar</td><td>19 percent</td></tr><tr><td>Ryotwari</td><td>Munro and Reed, 1820 (Reed tried it in 1792)</td><td>Madras, Bombay, eastern Bengal, Assam and Coorg</td><td>Ryot (cultivator)</td><td>51 percent</td></tr><tr><td>Mahalwari</td><td>Holt Mackenzie, 1822</td><td>North-Western Provinces, Central India, Punjab and Ganga valley</td><td>Village (Mahal)</td><td>30 percent</td></tr><tr><td>Izaredari (farming)</td><td>Warren Hastings, 1772</td><td>Bengal</td><td>Highest bidder, who was only a collector</td><td>Not given</td></tr></tbody></table>
      <p class="cp-lead"><b>Izaredari, 1772:</b> collection was auctioned to the highest bidder, first for five years and from 1777 every year. Zamindars were only collectors and not owners, and were paid a commission.</p>
      <p class="cp-lead"><b>Permanent Settlement, 1793:</b> zamindars were made owners. They kept one eleventh of the revenue and paid ten eleventh to the Company. The <b>Sunset Law of 1794</b> said that if the revenue was not paid by sunset of the fixed date, the estate was auctioned. It was backed by R. C. Dutt and Raja Ram Mohan Roy. Zamindars stayed loyal, many stayed out of 1857, and their income was fixed, but the land was not improved.</p>
      <p class="cp-lead"><b>Ryotwari, 1820:</b> Thomas Munro and Captain Alexander Reed started it. The ryot was the owner and paid the revenue directly, between 45 and 55 percent of the produce. In Bombay, Elphinstone, Chaplin and Wingate introduced it in 1825, and the whole Deccan came under it by 1858. The revenue was not fixed, and the land was taken for non-payment.</p>
      <p class="cp-lead"><b>Mahalwari, 1822:</b> regulated by Holt Mackenzie. Mahal means village, and the agreement was made with the village head. Its best form was by Martin Bird and James Thomson in 1833.</p>
      <div class="cp-note trap">Coverage numbers are often asked: Permanent 19 percent, Mahalwari 30 percent and Ryotwari 51 percent.</div>
      <div class="cp-note exam">Permanent Settlement is Cornwallis in 1793, Ryotwari is Munro in 1820 and Mahalwari is Holt Mackenzie in 1822.</div>
      <div class="cp-mnemonic">P-R-M follows the years 1793, 1820, 1822.</div>
    `
  },
  18: {
    questext: "The Permanent Settlement was introduced in Bengal in which year by Lord Cornwallis?",
    options: ["1772", "1784", "1820", "1793"],
    correct: "4",
    exptext: "✅ Cornwallis introduced the Permanent Settlement in 1793. 📌 The year 1793 fits the late Cornwallis years. ❌ The year 1772 is tempting, but that is Izaredari under Warren Hastings."
  },
  19: {
    questext: "In which land-revenue system was the cultivator himself regarded as the owner and paid revenue directly to the government?",
    options: ["Ryotwari", "Permanent Settlement", "Mahalwari", "Izaredari"],
    correct: "1",
    exptext: "✅ In the Ryotwari system, the ryot was the owner and paid revenue directly. 📌 Ryot means farmer. ❌ Mahalwari is tempting, but there the village paid the revenue as one group."
  },
  20: {
    questext: "The Mahalwari system was introduced in 1822 under the guidance of whom?",
    options: ["Thomas Munro", "Holt Mackenzie", "Lord Cornwallis", "Warren Hastings"],
    correct: "2",
    exptext: "✅ Holt Mackenzie regulated the Mahalwari system in 1822. 📌 Mackenzie and Mahal both start with M. ❌ Thomas Munro is tempting, but his name goes with Ryotwari."
  },
  21: {
    questext: "Consider the following statements:\n1. The Permanent Settlement covered about 19 percent of the area under British rule.\n2. The Ryotwari system covered about 51 percent of the area.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Remember 19, 51 and 30 for the three systems. ❌ Choosing only one forgets that the numbers belong to the same list."
  },
  22: {
    type: "concept", icon: "📜", accent: "#ec4899", pauseTimer: true,
    title: "The Acts — Years and Provisions",
    html: `
      <p class="cp-lead">A series of Acts of Parliament shaped British rule in India. <u>Learn each Act with its year and its main provision.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/12.png" alt="Timeline with eight marks: 1773, 1784, 1813, 1833, 1853, 1861, 1935 with short labels." data-caption="The main Acts in order of their years." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/13.png" alt="Supreme Court Calcutta 18th century engraving" data-caption="The Supreme Court at Calcutta, set up by the Regulating Act." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Act</th><th>Year</th><th>Provisions</th></tr></thead><tbody><tr><td>Regulating Act</td><td>1773</td><td>Warren Hastings became the first Governor-General of Bengal; Supreme Court at Calcutta with original and appeal powers</td></tr><tr><td>Pitt's India Act</td><td>1784</td><td>Created the Board of Control</td></tr><tr><td>Charter Act</td><td>1813</td><td>Ended the trade monopoly except tea and the China trade</td></tr><tr><td>Charter Act</td><td>1833</td><td>William Bentinck became the first Governor-General of India; ended the Company's commercial role and China trade; Law Commission under Macaulay in 1834</td></tr><tr><td>Charter Act</td><td>1853</td><td>Open competition for the civil service; first Indian Civil Service examination in 1855</td></tr><tr><td>Indian High Courts Act</td><td>1861</td><td>High Courts at Calcutta, Bombay and Madras; Sadar Adalats abolished</td></tr><tr><td>Indian Police Act</td><td>1861</td><td>Uniform police administration after the Police Commission of 1860</td></tr><tr><td>Indian Civil Service Act</td><td>1861</td><td>Any person, Indian or European, could be appointed</td></tr><tr><td>Government of India Act</td><td>1935</td><td>Federal Court at Delhi; first Chief Justice Sir Maurice Gwyer</td></tr></tbody></table>
      <p class="cp-lead">In 1773, the Act began to control the Company. In 1784, the Board of Control brought the Company's political work under the British government. After 1813, the Company slowly stopped being a trader.</p>
      <div class="cp-note trap">Do not mix the two Charter Acts. The 1813 Act ended the monopoly except for tea and China, and the 1833 Act ended the Company's commercial role completely.</div>
      <div class="cp-note exam">Three Acts are dated 1861: High Courts, Police and Civil Service.</div>
    `
  },
  23: {
    questext: "Which Act created the Board of Control for the affairs of the East India Company?",
    options: ["Regulating Act 1773", "Charter Act 1813", "Charter Act 1833", "Pitt's India Act 1784"],
    correct: "4",
    exptext: "✅ Pitt's India Act of 1784 created the Board of Control. 📌 Pitt's Act made a Board that controlled. ❌ The Regulating Act is tempting, but it created the Supreme Court at Calcutta and the Governor-General of Bengal."
  },
  24: {
    questext: "Who became the first Governor-General of India under the Charter Act of 1833?",
    options: ["William Bentinck", "Warren Hastings", "Lord Cornwallis", "Lord Dalhousie"],
    correct: "1",
    exptext: "✅ William Bentinck became the first Governor-General of India in 1833. 📌 In 1773 Hastings was of Bengal; in 1833 Bentinck was of India. ❌ Warren Hastings is tempting, but he was the first Governor-General of Bengal."
  },
  25: {
    questext: "Which Act introduced open competition for the civil service?",
    options: ["Charter Act 1833", "Charter Act 1853", "Indian Civil Service Act 1861", "Government of India Act 1935"],
    correct: "2",
    exptext: "✅ The Charter Act of 1853 introduced open competition, and the first examination was held in 1855. 📌 The year 1853 comes before 1855. ❌ The Act of 1861 is tempting, but it allowed any person to be appointed."
  },
  26: {
    type: "concept", icon: "🧵", accent: "#f97316", pauseTimer: true,
    title: "Commercialisation of Agriculture",
    html: `
      <p class="cp-lead">Under the British, farming was forced to grow crops for sale and not for food. <u>This is called commercialisation of agriculture.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/14.png" alt="Pie-like picture with labels: crops grown for sale such as cotton, jute, sugarcane, indigo" data-caption="Cash crops grew while food grain farming shrank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/15.png" alt="Indigo plantation Bengal 19th century engraving" data-caption="Indigo being prepared in a plantation in Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A money economy was forced on farming through zamindars, planters and money-lenders, and often by force. The cash crops were cotton, jute, sugarcane, indigo, opium, tea and coffee.</p>
      <p class="cp-lead">The classic case was indigo, which was forced on the peasants of Bengal and Bihar. The demand for opium came from China, and the demand for sugar and indigo came from Europe. Tea was grown to end tea imports from China.</p>
      <p class="cp-lead">Food-grain area fell, so food became scarce and cereal prices rose. Peasants were squeezed by planters and money-lenders, which led to the drain of wealth and famines.</p>
      <p class="cp-lead">The <b>Indigo Revolt of 1859–60</b> was a revolt against the planters. The play <b>Nil Darpan</b> (1860) by Dinabandhu Mitra exposed their oppression.</p>
      <div class="cp-note trap">Cash crops are grown for sale. Food crops such as wheat and rice are grown for eating, and their area fell.</div>
      <div class="cp-note exam">The Indigo Revolt of Bengal took place in 1859–60, and Nil Darpan was written by Dinabandhu Mitra.</div>
    `
  },
  27: {
    questext: "Which crop was forced on the peasants of Bengal and Bihar by European planters?",
    options: ["Cotton", "Tea", "Indigo", "Jute"],
    correct: "3",
    exptext: "✅ Indigo was forced on the peasants of Bengal and Bihar. 📌 Indigo gave blue dye for European mills. ❌ Cotton is tempting, but it was a cash crop grown mainly in the south and west."
  },
  28: {
    questext: "The play Nil Darpan, which exposed the oppression of indigo planters, was written by whom?",
    options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Premchand", "Dinabandhu Mitra"],
    correct: "4",
    exptext: "✅ Dinabandhu Mitra wrote Nil Darpan in 1860. 📌 Nil means indigo and Darpan means mirror. ❌ Bankim Chandra Chatterjee is tempting, but he wrote Anandamath."
  },
  29: {
    questext: "Consider the following statements:\n1. Opium was grown for the market of China.\n2. Indigo was grown for the market of China.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Opium went to China, while indigo went to Europe. ❌ Statement 2 is wrong because indigo was in demand in Europe."
  },
  30: {
    type: "concept", icon: "💸", accent: "#84cc16", pauseTimer: true,
    title: "Drain of Wealth",
    html: `
      <p class="cp-lead">The Drain of Wealth means the continuous flow of India's wealth and bullion to Britain, with nothing coming back in return. <u>It was the central idea of Indian economic nationalism.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/16.png" alt="Arrow chart: India on the left, Britain on the right; a thick arrow labelled wealth and bu" data-caption="The drain: wealth flowed out of India without any return." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/17.png" alt="Dadabhai Naoroji portrait photograph" data-caption="Dadabhai Naoroji, the High Priest of the Drain Theory." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/18.png" alt="Romesh Chunder Dutt portrait photograph" data-caption="Romesh Chunder Dutt, author of the Economic History of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Dadabhai Naoroji</b> is called the High Priest of the Drain Theory. In 1867 he first exposed the drain in a paper called England's Debt to India. His famous book is <b>Poverty and Un-British Rule in India</b>, and in 1876 he wrote the draft Poverty of India. He called the drain the evil of all evils.</p>
      <p class="cp-lead">Others who took the idea forward were M. G. Ranade, Dinshaw Wacha, Surendranath Banerjee, R. C. Dutt (Economic History of India) and G. Subramania Iyer, founder of The Hindu (Some Economic Aspects of British Rule in India).</p>
      <table><thead><tr><th>Thinker</th><th>Estimate of the drain</th></tr></thead><tbody><tr><td>Dadabhai Naoroji</td><td>One fourth of the revenue</td></tr><tr><td>M. G. Ranade</td><td>One third of the national income</td></tr><tr><td>R. C. Dutt</td><td>One half of the revenue or income</td></tr></tbody></table>
      <p class="cp-lead">The Indian National Congress accepted the Drain Theory at its Calcutta session in 1896, with Rahimtulla Sayani as the President. This economic nationalism later armed the Swadeshi and Boycott movements.</p>
      <p class="cp-lead">Naoroji was born on 4 September 1825 in Bombay in a Parsi family and was called the Grand Old Man of India. He helped found the London India Society in 1865 and the East India Association in 1867, was a founder member of the Congress in 1885 with Dinshaw Wacha and A. O. Hume, and in 1892 became the first Asian in the British House of Commons from Finsbury Central as a Liberal Party member. In 1896 he was a member of the Royal Commission on Indian Expenditure.</p>
      <div class="cp-note trap">Do not mix the books. Poverty and Un-British Rule in India is by Naoroji, and the Economic History of India is by R. C. Dutt.</div>
      <div class="cp-note exam">The Congress accepted the Drain Theory in 1896 at Calcutta under Rahimtulla Sayani.</div>
    `
  },
  31: {
    questext: "Who among the following wrote the Economic History of India?",
    options: ["Dadabhai Naoroji", "R. C. Dutt", "M. G. Ranade", "G. Subramania Iyer"],
    correct: "2",
    exptext: "✅ R. C. Dutt wrote the Economic History of India. 📌 Dutt and Economic History both feel like a pair. ❌ Naoroji is tempting, but his main book is Poverty and Un-British Rule in India."
  },
  32: {
    questext: "Who is called the High Priest of the Drain Theory?",
    options: ["R. C. Dutt", "M. G. Ranade", "Dadabhai Naoroji", "Dinshaw Wacha"],
    correct: "3",
    exptext: "✅ Dadabhai Naoroji is called the High Priest of the Drain Theory. 📌 He first spoke of it in 1867. ❌ R. C. Dutt is tempting, but he carried the idea forward."
  },
  33: {
    questext: "At which Congress session was the Drain Theory accepted in 1896, under which President?",
    options: ["Calcutta, W. C. Bonnerjee", "Bombay, Badruddin Tyabji", "Madras, Surendranath Banerjee", "Calcutta, Rahimtulla Sayani"],
    correct: "4",
    exptext: "✅ The Congress session of 1896 at Calcutta, led by Rahimtulla Sayani, accepted the Drain Theory. 📌 Sayani and 1896 go together. ❌ W. C. Bonnerjee is tempting, but he led the first session in 1885."
  },
  34: {
    questext: "Who was the founder of The Hindu newspaper who wrote Some Economic Aspects of British Rule in India?",
    options: ["G. Subramania Iyer", "Dinshaw Wacha", "Surendranath Banerjee", "M. G. Ranade"],
    correct: "1",
    exptext: "✅ G. Subramania Iyer founded The Hindu and wrote about the economic effects of British rule. 📌 Iyer belongs to the Hindu in Madras. ❌ Surendranath Banerjee is tempting, but he is linked with the Bengalee."
  },
  35: {
    type: "concept", icon: "🧶", accent: "#06b6d4", pauseTimer: true,
    title: "De-industrialisation",
    html: `
      <p class="cp-lead">De-industrialisation means the decline of old industries without new ones taking their place. <u>It hit both the villages and the towns of India.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/19.png" alt="Two-way picture: old handicrafts destroyed on the left, modern industry denied on the righ" data-caption="De-industrialisation worked in two ways at the same time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/20.png" alt="Kashmir shawl weaver loom photograph" data-caption="A shawl weaver of Kashmir, whose craft lost buyers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The process worked in two ways. The old handicrafts were destroyed, and the growth of modern industry was denied. Because of this, India stayed dependent on Britain.</p>
      <table><thead><tr><th>Industry</th><th>What happened</th></tr></thead><tbody><tr><td>Cotton textiles</td><td>Biggest employer after agriculture; hit by British competition and unfair policy</td></tr><tr><td>Jute (Bengal)</td><td>Hit after 1835</td></tr><tr><td>Kashmir shawls</td><td>Beaten by Scottish products</td></tr><tr><td>Paper</td><td>Charles Wood's dictum said that official paper would come only from Britain</td></tr><tr><td>Iron and steel</td><td>Hit by imports of British machinery goods</td></tr></tbody></table>
      <p class="cp-lead">Millions of weavers and artisans lost work. They had nowhere to go but to the overcrowded land, so pressure on farming grew.</p>
      <div class="cp-note trap">De-industrialisation did not only mean factories closing. It also meant that new Indian factories were not allowed to grow.</div>
      <div class="cp-note exam">Charles Wood's dictum is linked with the paper industry.</div>
    `
  },
  36: {
    questext: "Which Indian industry was the biggest employer after agriculture and was destroyed by British competition?",
    options: ["Jute", "Cotton textiles", "Paper", "Iron and steel"],
    correct: "2",
    exptext: "✅ Cotton textiles employed the largest number after agriculture. 📌 Weavers were everywhere in India. ❌ Jute is tempting, but it was hit later and was smaller."
  },
  37: {
    questext: "Charles Wood's dictum, that official paper should come only from Britain, hurt which Indian industry?",
    options: ["Kashmir shawls", "Cotton textiles", "Paper", "Iron and steel"],
    correct: "3",
    exptext: "✅ The dictum hurt the Indian paper industry. 📌 Wood and paper go together. ❌ Cotton textiles is tempting, but Wood's dictum is about paper."
  },
  38: {
    questext: "Kashmir shawls lost their market because they were beaten by the products of which country?",
    options: ["France", "Germany", "Belgium", "Scotland"],
    correct: "4",
    exptext: "✅ Kashmir shawls were beaten by Scottish products. 📌 A shawl is warm, and Scotland is cold. ❌ France is tempting because France was famed for fashion, but the competition came from Scotland."
  },
  39: {
    type: "concept", icon: "🏗️", accent: "#a855f7", pauseTimer: true,
    title: "New Industries",
    html: `
      <p class="cp-lead">Modern industry came late to India, and it was mostly British-owned because investors wanted high returns. <u>After the Charter Act of 1833, foreign capital went mainly to plantations.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/21.png" alt="Timeline with seven boxes: 1830 Porto Novo iron, 1854 cotton mill, 1855 jute mill, 1874 ir" data-caption="First modern industries of India in order of year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/22.png" alt="Tata Steel Jamshedpur early plant photograph" data-caption="The early steel plant at Jamshedpur, started in 1907." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The first tea plantation came up in 1835, and the Assam Company was formed in 1839. Textiles was the only industry where Indian capitalists held more shares than the British.</p>
      <table><thead><tr><th>Year</th><th>Beginning</th></tr></thead><tbody><tr><td>1830</td><td>First iron and steel attempt by Joshua Marshal Heath at Porto Novo, on the Madras coast</td></tr><tr><td>1854</td><td>Bombay Spinning and Weaving Company, the first cotton mill, at Tardeo, Bombay, by Cowasjee Nanabhoy Davar</td></tr><tr><td>1854</td><td>First coalfield discovered at Raniganj</td></tr><tr><td>1855</td><td>First jute factory by George Auckland at Rishra, Bengal</td></tr><tr><td>1874</td><td>Bengal Iron and Works Company, the first modern iron and steel company</td></tr><tr><td>1903</td><td>First modern sugar mill in the United Provinces</td></tr><tr><td>1907</td><td>Tata Iron and Steel Company, the first private-sector steel plant</td></tr><tr><td>1916 and 1921</td><td>Industrial Commission (Thomas Holland) and Financial Commission (Ibrahim Rahimtulla)</td></tr><tr><td>1944</td><td>Bombay Plan by Thakurdas, Modi and Birla</td></tr></tbody></table>
      <div class="cp-note trap">The first cotton mill was in Bombay in 1854 and the first jute mill was in Bengal in 1855. Do not swap the cities.</div>
      <div class="cp-note exam">The Tata Iron and Steel Company began in 1907 and the Bombay Plan came in 1944.</div>
    `
  },
  40: {
    questext: "Who started the first cotton mill in Bombay in 1854?",
    options: ["Cowasjee Nanabhoy Davar", "Jamsetji Tata", "G. D. Birla", "Dwarkanath Tagore"],
    correct: "1",
    exptext: "✅ Cowasjee Nanabhoy Davar set up the Bombay Spinning and Weaving Company at Tardeo in 1854. 📌 Davar and Bombay start the first cotton mill. ❌ Jamsetji Tata is tempting, but he founded the steel firm later."
  },
  41: {
    questext: "In which year was the Tata Iron and Steel Company set up as the first private-sector steel plant?",
    options: ["1874", "1907", "1903", "1855"],
    correct: "2",
    exptext: "✅ The Tata Iron and Steel Company began in 1907. 📌 The 1874 iron works came before it. ❌ The year 1874 is tempting, but that was the Bengal Iron and Works Company."
  },
  42: {
    questext: "Who set up the first jute factory at Rishra in Bengal in 1855?",
    options: ["Jamsetji Tata", "Cowasjee Nanabhoy Davar", "George Auckland", "G. D. Birla"],
    correct: "3",
    exptext: "✅ George Auckland set up the first jute factory at Rishra. 📌 Auckland and jute both are linked with Bengal in 1855. ❌ Davar is tempting, but he started the cotton mill."
  },
  43: {
    type: "concept", icon: "📮", accent: "#eab308", pauseTimer: true,
    title: "Administrative Machinery (1) — Post, Public Works and Local Self-Government",
    html: `
      <p class="cp-lead">The British modernised the old Mughal system of rule to run India with fewer officers. <u>The new post, telegraph, public works and local bodies were all built to serve British control.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/23.png" alt="First postage stamp India 1854 Half Anna photo" data-caption="One of the first Indian postage stamps, issued in 1854." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/24.png" alt="Three boxes in a row: Post and telegraph (Dalhousie), Public Works Department (Dalhousie)," data-caption="Three new parts of the administration and the leader behind each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/25.png" alt="Lord Ripon Viceroy portrait painting" data-caption="Lord Ripon, the father of local self-government in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Post and telegraph:</b> Lord Dalhousie is called the father of the modern postal system. The Post Office Act was passed in 1854, and the first postage stamp was issued in 1854. The electric telegraph began in 1852, and by 1857 lines had reached Lahore and Peshawar.</p>
      <p class="cp-lead"><b>Public works:</b> Dalhousie set up a separate Public Works Department, started canal irrigation and built modern ports at Bombay, Calcutta and Karachi.</p>
      <p class="cp-lead"><b>Local self-government:</b> The first municipal corporation was set up at Madras in 1687. Calcutta and Bombay got theirs in 1726. Lord Mayo's Resolution of 1870 gave local bodies more power. In 1882, Lord Ripon, the father of local self-government, brought in elected municipal presidents.</p>
      <div class="cp-note trap">Dalhousie is the father of the postal system and also of the railways. Ripon is the father of local self-government, and Cornwallis is the father of the civil services.</div>
      <div class="cp-note exam">Madras 1687, Calcutta and Bombay 1726, Mayo 1870, Ripon 1882.</div>
    `
  },
  44: {
    questext: "Who is regarded as the father of local self-government in India?",
    options: ["Lord Mayo", "Lord Cornwallis", "Lord Dalhousie", "Lord Ripon"],
    correct: "4",
    exptext: "✅ Lord Ripon is the father of local self-government, and his resolution of 1882 brought in elected municipal presidents. 📌 Ripon means local. ❌ Lord Mayo is tempting, but his resolution of 1870 only began the idea."
  },
  45: {
    questext: "In which year was the first municipal corporation set up in India, at Madras?",
    options: ["1687", "1726", "1870", "1882"],
    correct: "1",
    exptext: "✅ The first municipal corporation was set up at Madras in 1687. 📌 It is the oldest of the dates. ❌ The year 1726 is tempting, but that is when Calcutta and Bombay got corporations."
  },
  46: {
    questext: "Who is called the father of the modern postal system in India?",
    options: ["Lord Cornwallis", "Lord Dalhousie", "Lord Ripon", "Lord Wellesley"],
    correct: "2",
    exptext: "✅ Lord Dalhousie started the modern postal system with the Post Office Act and the first stamp in 1854. 📌 Dalhousie also began the railways. ❌ Lord Ripon is tempting, but he is linked with local bodies."
  },
  47: {
    type: "concept", icon: "👮", accent: "#10b981", pauseTimer: true,
    title: "Administrative Machinery (2) — Civil Services, Police and Judiciary",
    html: `
      <p class="cp-lead">The British built a steel frame of officers, police and courts. <u>Each part was designed to keep control in British hands.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/26.png" alt="Fort William College Calcutta old engraving" data-caption="Fort William College at Calcutta, started by Wellesley in 1800." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/27.png" alt="Staircase of courts: Munsif Court, Register Court, District Court, Sadar Diwani Adalat, Ki" data-caption="Cornwallis's courts from the lowest to the highest in order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/28.png" alt="Thomas Babington Macaulay portrait painting" data-caption="Lord Macaulay, who led the Law Commission of 1834." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Civil services:</b> Lord Cornwallis is the Father of the Civil Services. He gave higher salaries, banned private trade and bribes, and made promotion by seniority. Wellesley opened Fort William College at Calcutta in 1800, and the East India College was opened at Haileybury in England in 1806. Satyendranath Tagore became the first Indian in the Indian Civil Service in 1863.</p>
      <p class="cp-lead"><b>Police:</b> Until 1765–72 the police was under zamindars. In 1791 Cornwallis organised the police. In 1828–35 William Bentinck abolished the post of Superintendent of Police, and the divisional Commissioner acted as the Superintendent. The Police Commission of 1902–03, headed by Sir Andrew Fraser, was appointed under Curzon.</p>
      <p class="cp-lead"><b>Judiciary:</b> The Cornwallis Code of 1793 separated revenue work from judicial work, said that officials were answerable to the civil courts and took away the magisterial powers of the Collector. Macaulay's Law Commission of 1834 led to the Civil Procedure Code of 1859, the Indian Penal Code of 1860 and the Criminal Procedure Code of 1861. Bentinck put Indian judges in the lower courts with wider powers and pay.</p>
      <p class="cp-lead">Cornwallis's courts from low to high were the Munsif Court (Indian judges), the Register Court (Europeans), the District Court with four Circuit Courts (civil servants), the Sadar Diwani Adalat at Calcutta and then the King-in-Council.</p>
      <div class="cp-note trap">The Civil Procedure Code is 1859, the Indian Penal Code is 1860 and the Criminal Procedure Code is 1861. Do not swap the years.</div>
      <div class="cp-note exam">Cornwallis is the Father of the Civil Services, and the first Indian in the Indian Civil Service was Satyendranath Tagore in 1863.</div>
    `
  },
  48: {
    questext: "Who is called the Father of the Civil Services in India?",
    options: ["Lord Wellesley", "Warren Hastings", "Lord Cornwallis", "William Bentinck"],
    correct: "3",
    exptext: "✅ Lord Cornwallis is the Father of the Civil Services because he gave high pay and stopped private trade and bribes. 📌 Cornwallis and Civil both start with C. ❌ Lord Wellesley is tempting, but he only founded Fort William College."
  },
  49: {
    questext: "Who was the first Indian to enter the Indian Civil Service, in 1863?",
    options: ["Surendranath Banerjee", "R. C. Dutt", "Aurobindo Ghose", "Satyendranath Tagore"],
    correct: "4",
    exptext: "✅ Satyendranath Tagore became the first Indian in the Indian Civil Service in 1863. 📌 Tagore leads the list of firsts. ❌ Surendranath Banerjee is tempting, but he passed the examination and was later removed."
  },
  50: {
    questext: "Fort William College at Calcutta was founded in 1800 by whom?",
    options: ["Lord Wellesley", "Lord Cornwallis", "Warren Hastings", "Lord Dalhousie"],
    correct: "1",
    exptext: "✅ Lord Wellesley founded Fort William College in 1800. 📌 Wellesley and William both start with W. ❌ Lord Cornwallis is tempting, but he is linked with the civil service reforms."
  },
  51: {
    questext: "Consider the following statements:\n1. The Munsif Court under Cornwallis's system was run by European judges.\n2. The Sadar Diwani Adalat at Calcutta was the highest civil court before the King-in-Council.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Munsifs were Indians and Registers were Europeans. ❌ Statement 1 is wrong because the Munsif Court had Indian judges."
  },
  52: {
    type: "concept", icon: "🚆", accent: "#e11d48", pauseTimer: true,
    title: "Railways",
    html: `
      <p class="cp-lead">Railways were the greatest change that the British brought to India's transport. <u>They were built for British needs, but they changed Indian life.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/29.png" alt="First train Bombay Thane 1853 painting" data-caption="The first train in India ran from Bombay to Thane in 1853." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/30.png" alt="Timeline with five boxes: 1846 proposal, 1853 Railway Minute and first train, 1905 Railway" data-caption="Main events in the history of Indian railways in order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Lord Hardinge first proposed railways in 1846. An earlier proposal for steam-engine railways had been made in 1834, mainly for what was called military traffic.</p>
      <p class="cp-lead"><b>Lord Dalhousie</b> is called the father of the railway system. In 1853 his Railway Minute allowed private companies to build railways with a guaranteed 5 percent interest. The first train ran between Bombay and Thane in 1853. A second line from Calcutta towards the Raniganj coalfields opened in 1854.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1853</td><td>Railway Minute; first train, Bombay to Thane</td></tr><tr><td>1854</td><td>Second line, Calcutta towards Raniganj</td></tr><tr><td>1903 and 1905</td><td>Robertson Committee report and then the Railway Board under Curzon</td></tr><tr><td>1921–22</td><td>Acworth Committee led to a re-made Railway Board</td></tr><tr><td>1924</td><td>Railway Budget separated from the General Budget</td></tr></tbody></table>
      <p class="cp-lead">Bal Gangadhar Tilak criticised railways and called them ornaments on another man's wife, because the profit and the use went to the British.</p>
      <div class="cp-note trap">The Railway Minute was in 1853, and the Railway Budget was separated in 1924. Do not mix the years.</div>
      <div class="cp-note exam">The first train ran in 1853 between Bombay and Thane.</div>
    `
  },
  53: {
    questext: "Who first proposed the building of railways in India in 1846?",
    options: ["Lord Dalhousie", "Lord Cornwallis", "Lord Hardinge", "Lord Curzon"],
    correct: "3",
    exptext: "✅ Lord Hardinge first proposed railways in 1846. 📌 Hardinge started and Dalhousie built. ❌ Lord Dalhousie is tempting, but he carried out the plan from 1853."
  },
  54: {
    questext: "Between which two places did the first passenger train in India run in 1853?",
    options: ["Calcutta and Raniganj", "Madras and Arkonam", "Delhi and Agra", "Bombay and Thane"],
    correct: "4",
    exptext: "✅ The first passenger train ran between Bombay and Thane in 1853. 📌 Bombay was the first big port. ❌ Calcutta and Raniganj is tempting, but that line opened later in 1854."
  },
  55: {
    questext: "Under the Railway Minute of 1853, private companies building railways were promised how much guaranteed interest?",
    options: ["5 percent", "3 percent", "7 percent", "10 percent"],
    correct: "1",
    exptext: "✅ Private companies were guaranteed 5 percent interest. 📌 The year 1853 and five go together. ❌ Ten percent is tempting, but it is too high and not the guarantee."
  },
  56: {
    type: "concept", icon: "📌", accent: "#0ea5e9", pauseTimer: true,
    title: "Added Exam Facts and Common Traps",
    html: `
      <p class="cp-lead">These small facts are often asked in the exam. <u>Learn them as pairs so that two similar things cannot confuse you.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/31.png" alt="Match chart: Cornwallis with civil services, Dalhousie with post and railways, Ripon with " data-caption="Match each father with the service he is known for." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/32.png" alt="Simon Commission 1927 India boycott photograph" data-caption="The protest against the Simon Commission in 1928." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Famine Commissions were set up after famines: Strachey in 1880 after the famine of 1876–78, Lyall in 1898 and MacDonnell in 1901. The Famine Code of 1883 followed the Strachey Commission.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>First Indian Civil Service examination</td><td>1855</td></tr><tr><td>Aitchison Commission</td><td>1886, on the public services</td></tr><tr><td>Islington Commission</td><td>1912, on Indian recruitment</td></tr><tr><td>Lee Commission</td><td>1924, which led to the Federal Public Service Commission in 1926</td></tr><tr><td>Simon Commission</td><td>1927 under Viceroy Irwin; boycotted because it had no Indian member</td></tr><tr><td>Bhore Committee</td><td>1943–46, on health</td></tr><tr><td>Sargent Plan</td><td>1944, on education</td></tr><tr><td>Imperial Bank of India</td><td>1921, merged the three Presidency Banks</td></tr><tr><td>Reserve Bank of India</td><td>Opened on 1 April 1935 after the Reserve Bank of India Act of 1934 and the Hilton Young Commission of 1926</td></tr></tbody></table>
      <div class="cp-note trap">Coverage of land systems: Permanent 19 percent, Mahalwari 30 percent and Ryotwari 51 percent.</div>
      <div class="cp-note trap">Three Acts are of 1861 (High Courts, Police and Civil Service), and three Codes are of 1859, 1860 and 1861.</div>
      <div class="cp-note trap">Fathers: Cornwallis for civil services, Dalhousie for the postal system and railways and Ripon for local self-government.</div>
    `
  },
  57: {
    questext: "The first Famine Commission, set up after the famine of 1876–78, was led by whom?",
    options: ["Lyall", "Strachey", "MacDonnell", "Hunter"],
    correct: "2",
    exptext: "✅ The Strachey Commission of 1880 was the first, and the Famine Code of 1883 followed it. 📌 Strachey comes first in the list S, L, M. ❌ MacDonnell is tempting, but his commission was in 1901."
  },
  58: {
    questext: "On which date did the Reserve Bank of India begin work?",
    options: ["1 January 1935", "1 April 1934", "1 April 1935", "1 April 1937"],
    correct: "3",
    exptext: "✅ The Reserve Bank of India opened on 1 April 1935, after the Act of 1934. 📌 The financial year begins on 1 April. ❌ The year 1934 is tempting, but that is the year of the Act."
  },
  59: {
    questext: "Why was the Simon Commission of 1927 boycotted in India?",
    options: ["It wanted to raise taxes", "It wanted to end the railways", "It came during a famine", "It had no Indian member"],
    correct: "4",
    exptext: "✅ The Simon Commission had no Indian member, so Indians boycotted it. 📌 Its work was about India, but it left Indians out. ❌ The raising of taxes is tempting, but the commission was about constitutional reform."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a stack of old silver coins, a miniature steam locomotive and a rolled land-record scroll" },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/1.png": { t: "fig", about: "Simple flow: India sends raw cotton, indigo and jute to Britain on one arrow; Britain sends factory cloth back on another arrow. Labels: raw material out, finished goods in." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bengal muslin weaver 19th century photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/2.png. a handloom weaver of Bengal",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/3.png": { t: "fig", about: "Cycle diagram: Bengal land revenue collected, used to buy Indian goods, goods exported to Europe, profit goes to Company." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"East India Company warehouse Calcutta old engraving\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/4.png. an old engraving of a Company warehouse",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/5.png": { t: "fig", about: "Two arrows between Britain and India: British goods enter India with label duty-free; Indian goods enter Britain with label heavy tariffs." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Handloom weaver at pit loom India photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/6.png. a hand weaver at a pit loom",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/7.png": { t: "fig", about: "Three boxes in a row: banks, insurance companies, loans to the government of India; arrows show interest flowing back to Britain." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Imperial Bank of India building old photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/8.png. an old photograph of a bank building",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/9.png": { t: "fig", about: "Three-column chart: Permanent Settlement (zamindar pays, 19 percent), Ryotwari (cultivator pays, 51 percent), Mahalwari (village pays, 30 percent)." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Zamindar and peasants India old photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/10.png. a zamindar with his peasants",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian farmers ploughing field 19th century photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/11.png. farmers ploughing a field",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/12.png": { t: "fig", about: "Timeline with eight marks: 1773, 1784, 1813, 1833, 1853, 1861, 1935 with short labels." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Supreme Court Calcutta 18th century engraving\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/13.png. an old picture of the Supreme Court at Calcutta",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/14.png": { t: "fig", about: "Pie-like picture with labels: crops grown for sale such as cotton, jute, sugarcane, indigo, opium, tea, coffee; food grains shown as a smaller slice." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indigo plantation Bengal 19th century engraving\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/15.png. an old picture of an indigo plantation",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/16.png": { t: "fig", about: "Arrow chart: India on the left, Britain on the right; a thick arrow labelled wealth and bullion going to Britain; a thin arrow labelled nothing in return." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dadabhai Naoroji portrait photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/17.png. a portrait of Dadabhai Naoroji",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Romesh Chunder Dutt portrait photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/18.png. a portrait of Romesh Chunder Dutt",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/19.png": { t: "fig", about: "Two-way picture: old handicrafts destroyed on the left, modern industry denied on the right, India kept dependent in the middle." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kashmir shawl weaver loom photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/20.png. a weaver making a Kashmir shawl",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/21.png": { t: "fig", about: "Timeline with seven boxes: 1830 Porto Novo iron, 1854 cotton mill, 1855 jute mill, 1874 iron works, 1903 sugar mill, 1907 Tata steel, 1944 Bombay Plan." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tata Steel Jamshedpur early plant photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/22.png. an early picture of the Tata steel plant",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"First postage stamp India 1854 Half Anna photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/23.png. the first Indian postage stamp",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/24.png": { t: "fig", about: "Three boxes in a row: Post and telegraph (Dalhousie), Public Works Department (Dalhousie), Local self-government (Ripon)." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Ripon Viceroy portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/25.png. a portrait of Lord Ripon",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fort William College Calcutta old engraving\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/26.png. an old picture of Fort William College",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/27.png": { t: "fig", about: "Staircase of courts: Munsif Court, Register Court, District Court, Sadar Diwani Adalat, King-in-Council." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Thomas Babington Macaulay portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/28.png. a portrait of Lord Macaulay",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"First train Bombay Thane 1853 painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/29.png. an old picture of the first train in India",
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/30.png": { t: "fig", about: "Timeline with five boxes: 1846 proposal, 1853 Railway Minute and first train, 1905 Railway Board, 1921 Acworth Committee, 1924 Railway Budget." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/31.png": { t: "fig", about: "Match chart: Cornwallis with civil services, Dalhousie with post and railways, Ripon with local self-government." },
  "images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Simon Commission 1927 India boycott photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Economic_and_Administrative_Policies/32.png. a picture of the Simon Commission protest"
});

/* CHANGE LOG
   - Post Office Act is dated 1854, the year the first postage stamps were issued, and the telegraph is described as running from 1852 with lines reaching Lahore and Peshawar by 1857.
   - The Assam Company (first major tea plantation company) is dated 1839.
   - Railways: the first passenger train between Bombay and Thane in 1853 is used as the starting point; the line of 1849 is left out. The Railway Budget was separated from the general budget in 1924, and the Railway Board was created in 1905.
   - The Butler Committee on princely states is dated 1927 under Viceroy Irwin; the doubtful commission entries for 1923, 1929 and 1935 are left out.
   - The doubtful reference to a police Superintendent under Lord Mayo in 1808 is left out.
   - The viceroy of the 1930s is spelled Willingdon where mentioned; the first Indian member of the Indian Civil Service is Satyendranath Tagore (1863).
*/