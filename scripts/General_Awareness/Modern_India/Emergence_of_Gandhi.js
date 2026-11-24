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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Emergence_of_Gandhi · 10 concept pages (+ overview) · 28 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🕊️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Modern_India/Emergence_of_Gandhi/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "EMERGENCE OF",
      line2: "GANDHI",
      line3: "1915 TO 1927",
      badge: "FULL CLASS",
      ribbon: "SATYAGRAHA • NON-COOPERATION • SWARAJ",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Emergence of Gandhi | Champaran to Non-Cooperation | Modern India SSC CGL",
      altTitles: ["Gandhi Era Full Chapter in One Class", "Rowlatt Act, Jallianwala Bagh and Non-Cooperation"],
      description: "Emergence of Gandhi is one of the most repeated chapters of Modern India. In this class we learn every fact slowly and clearly, from Gandhi's life in South Africa to the three Satyagrahas, the Rowlatt Act, Jallianwala Bagh, the Khilafat Movement, the Non-Cooperation Movement, the Swaraj Party and the Gandhi-Das Pact. Each part ends with exam style questions.\n\n📌 IN THIS CLASS\n✅ Early life and South Africa\n✅ Champaran, Ahmedabad and Kheda\n✅ Rowlatt Act and Jallianwala Bagh\n✅ Non-Cooperation and Swaraj Party\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Gandhi Era\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernIndia #History",
      tags: ["emergence of gandhi", "gandhi era 1919 1947", "champaran satyagraha 1917", "ahmedabad mill strike 1918", "kheda satyagraha 1918", "rowlatt act 1919", "jallianwala bagh massacre", "khilafat movement", "non cooperation movement", "chauri chaura 1922", "swaraj party 1923", "gandhi das pact", "modern india history", "ssc cgl history", "hunter commission", "general awareness", "history for competitive exams", "ssc cgl 2026", "modern india one shot", "gandhi first movements", "SSC CGL", "UPSC", "Banking", "Railways", "Emergence of Gandhi Modern_Ind"],
      hashtags: ["SSCCGL", "ModernIndia", "History"],
      thumbText: "EMERGENCE OF GANDHI",
      pinnedComment: "📌 Solve all the questions and write your score below 👇",
      communityPost: "🕊️ New class is live: Emergence of Gandhi, from Champaran to the Swaraj Party. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Gandhi Era and early life\n00:00 Three Satyagrahas\n00:00 Rowlatt Act\n00:00 Jallianwala Bagh\n00:00 Khilafat Movement\n00:00 Non-Cooperation Movement\n00:00 Chauri Chaura\n00:00 Swaraj Party\n00:00 Gandhi-Das Pact\n00:00 Other parties",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Emergence of Gandhi</u>, from his early life to the Swaraj Party. Gandhi's first movements are among the most repeated topics of Modern India.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>10</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>28</b><span>Questions</span></div>
        <div class="cp-stat"><b>~48 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Gandhi's Early Life</b><br>How a young lawyer was shaped by South Africa and why the third phase is called the Gandhi Era.</li>
        <li><b>The Three Satyagrahas</b><br>Champaran, Ahmedabad and Kheda, and the first that each one achieved.</li>
        <li><b>Rowlatt Act and Jallianwala Bagh</b><br>A harsh law, a peaceful protest and a terrible massacre.</li>
        <li><b>Khilafat and Non-Cooperation</b><br>How Gandhi joined Hindus and Muslims in the first mass movement for Swaraj.</li>
        <li><b>Swaraj Party and Gandhi-Das Pact</b><br>Why some leaders entered the councils, and how the Congress settled the dispute.</li>
        <li><b>Other Parties</b><br>The Muslim League, Hindu Mahasabha, Liberals and the Unionist Party.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> dates, places and the 'first' of each movement are asked again and again in Staff Selection Commission papers.</div>
    `
  },
  2: {
    type: "concept", icon: "🕊️", accent: "#22c55e", pauseTimer: true,
    title: "The 'Gandhi Era' (1919–1947) and Early Life, South Africa (1869–1915)",
    html: `
      <p class="cp-lead">From 1919 to 1947 the Congress followed one great leader. <u>This third phase is called the Gandhi Era, and his weapons were Satyagraha and Non-Cooperation.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/1.png" alt="Mahatma Gandhi young barrister South Africa photo" data-caption="Mohandas Karamchand Gandhi as a young lawyer in South Africa." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/2.png" alt="Timeline with six boxes: 1869 Born at Porbandar, 1891 Called to the Bar, 1893 Goes to Sout" data-caption="The main stages of Gandhi's early life, from birth to the beginning of the Gandhi Era." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Satyagraha</b> means insistence on truth. The word joins Satya (truth) and Agraha (insistence). It means non-violent civil resistance without hatred.</p>
      <p class="cp-lead">Gandhi was born on <b>2 October 1869</b> at Porbandar. His father was <b>Karamchand Uttamchand Gandhi</b>, Diwan of Porbandar and Rajkot, and his mother was <b>Putlibai</b>. He studied law at the <b>Inner Temple</b> in London and was called to the Bar in June 1891.</p>
      <p class="cp-lead">In <b>1893</b> he went to Natal for a year's contract with <b>Dada Abdulla and Company</b>. At <b>Pietermaritzburg</b> he was thrown off a train despite holding a valid first-class ticket. This was the turning point of his life.</p>
      <table><thead><tr><th>Year</th><th>Event in South Africa</th></tr></thead><tbody><tr><td>1894</td><td>Natal Indian Congress formed against racial discrimination</td></tr><tr><td>1904</td><td>Newspaper Indian Opinion started; Phoenix Ashram founded near Durban</td></tr><tr><td>1906</td><td>Asiatic Registration Act made registration compulsory for Indians and Chinese</td></tr><tr><td>11 September 1906</td><td>Satyagraha adopted for the first time, at Johannesburg</td></tr><tr><td>1909</td><td>Wrote Hind Swaraj, against Western values and for self-reliance</td></tr><tr><td>1910</td><td>Tolstoy Farm in Transvaal, with his German friend Kallenbach</td></tr></tbody></table>
      <p class="cp-lead">In <b>1915</b> Gandhi returned to India at the request of <b>Gopal Krishna Gokhale</b>, whom he called his political guru. He landed at Bombay on 9 January 1915, which is now celebrated as Pravasi Bharatiya Divas. He founded the Satyagraha Ashram, later at Sabarmati near Ahmedabad.</p>
      <p class="cp-lead">In World War I he backed the British and urged Indians to enlist, so he was called the <b>Army Recruiting Sergeant</b>. For his services he received the <b>Kaiser-e-Hind</b> medal in 1915 and returned it on 1 August 1920.</p>
      <div class="cp-note trap">Satyagraha was first used in South Africa on 11 September 1906, not in India. The first Satyagraha in India was Champaran in 1917.</div>
      <div class="cp-note exam">Remember the numbers: born 1869, Bar 1891, South Africa 1893, Satyagraha 1906, return 1915 on 9 January.</div>
    `
  },
  3: {
    questext: "In which year did Gandhi go to South Africa on a one-year contract with Dada Abdulla and Company?",
    options: ["1891", "1893", "1894", "1906"],
    correct: "2",
    exptext: "✅ Gandhi went to South Africa in 1893. 📌 Remember 1893 and the Pietermaritzburg train incident together. ❌ 1894 is tempting because that is when the Natal Indian Congress was formed."
  },
  4: {
    questext: "Where was Satyagraha adopted for the first time by Gandhi on 11 September 1906?",
    options: ["Durban", "Pietermaritzburg", "Champaran", "Johannesburg"],
    correct: "4",
    exptext: "✅ Satyagraha was adopted at Johannesburg in 1906 against the Asiatic Registration Act. 📌 Johannesburg and the 1906 law go together. ❌ Champaran is tempting, but that was the first Satyagraha in India."
  },
  5: {
    questext: "Who did Gandhi call his political guru?",
    options: ["Gopal Krishna Gokhale", "Dadabhai Naoroji", "Bal Gangadhar Tilak", "Leo Tolstoy"],
    correct: "1",
    exptext: "✅ Gandhi called Gopal Krishna Gokhale his political guru, and Gokhale asked him to return in 1915. 📌 Gokhale called, Gandhi came. ❌ Tolstoy is tempting because of Tolstoy Farm, but he was not Gandhi's political guru."
  },
  6: {
    type: "concept", icon: "🌾", accent: "#f59e0b", pauseTimer: true,
    title: "The Three Satyagrahas, 1917–18",
    html: `
      <p class="cp-lead">Gandhi's first three local struggles in India were Champaran, Ahmedabad and Kheda. <u>Each one is the first of its kind, so each is often asked in exams.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/3.png" alt="Champaran Satyagraha 1917 Gandhi Rajkumar Shukla indigo farmers photo" data-caption="Gandhi at Champaran in 1917, during the first Satyagraha in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/4.png" alt="Ambalal Sarabhai Anasuya Sarabhai Ahmedabad mill strike 1918 photo" data-caption="Anasuya Sarabhai, who stood with Gandhi in the Ahmedabad mill strike of 1918." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/5.png" alt="Three columns labelled Champaran 1917 Indigo, Ahmedabad 1918 Mill workers, Kheda 1918 Land" data-caption="The three Satyagrahas of 1917 and 1918 and the first that each one achieved." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Satyagraha</th><th>Cause</th><th>Course and leaders</th><th>Result and the first</th></tr></thead><tbody><tr><td>Champaran (Bihar), 1917</td><td>Tinkathia system: farmers had to grow indigo on 3 of every 20 parts of their land; high rents and illegal dues</td><td>Rajkumar Shukla brought Gandhi in at the Lucknow session of 1916; Gandhi defied the order to leave; an inquiry committee under F. G. Sly included Gandhi; helpers were Rajendra Prasad, Mazharul Haq, Mahadev Desai, Narhari Parekh and J. B. Kripalani</td><td>First Satyagraha in India; Tinkathia abolished; only 25 percent of illegal dues refunded; Champaran Agrarian Act 1918; Rabindranath Tagore first called Gandhi Mahatma</td></tr><tr><td>Ahmedabad mill strike, 1918</td><td>Mill owners withdrew the plague bonus; workers wanted 50 percent more pay because of war inflation</td><td>Workers struck for 35 percent; owners offered 20 percent; Gandhi began a fast; Anasuya Behn, sister of mill-owner Ambalal Sarabhai, was a chief helper</td><td>First hunger strike; settled after 21 days and the workers got 35 percent</td></tr><tr><td>Kheda (Gujarat), 1918</td><td>Crop was below one-fourth of normal, so full remission of revenue was legally due, but appeals were ignored</td><td>Cultivators withheld land revenue; Vallabhbhai Patel and Indulal Yagnik were helpers; the Gujarat Sabha supported it</td><td>First non-cooperation; the government secretly ordered that only those able to pay should pay, and Gandhi ended it; new followers included Vallabhbhai Patel and Indulal Yagnik</td></tr></tbody></table>
      <p class="cp-lead">The word <b>Tinkathia</b> means three parts in twenty. It shows how unfair the system was to Bihar's indigo farmers.</p>
      <div class="cp-note trap">Ahmedabad 1918 was the first hunger strike, and Champaran 1917 was the first Satyagraha. Do not give the title of first hunger strike to Champaran.</div>
      <div class="cp-note exam">Remember: Champaran 1917 first Satyagraha, Ahmedabad 1918 first hunger strike, Kheda 1918 first non-cooperation.</div>
    `
  },
  7: {
    questext: "Which Satyagraha is regarded as the first hunger strike of Gandhi in India?",
    options: ["Champaran, 1917", "Ahmedabad mill strike, 1918", "Kheda, 1918", "Rowlatt Satyagraha, 1919"],
    correct: "2",
    exptext: "✅ Gandhi fasted during the Ahmedabad mill strike in 1918 and the workers won 35 percent. 📌 Ahmedabad means hunger strike. ❌ Champaran is tempting because it was first in India, but it was a Satyagraha, not a fast."
  },
  8: {
    questext: "The Tinkathia system, against which Gandhi led a Satyagraha in 1917, was related to which crop?",
    options: ["Indigo", "Cotton", "Jute", "Opium"],
    correct: "1",
    exptext: "✅ Tinkathia forced farmers to grow indigo on 3 of every 20 parts of their land. 📌 Tin means three and Champaran means indigo. ❌ Opium is tempting because of the British trade, but Tinkathia was linked with indigo."
  },
  9: {
    questext: "Who brought Gandhi to Champaran after meeting him at the Lucknow session of 1916?",
    options: ["Rajendra Prasad", "J. B. Kripalani", "Rajkumar Shukla", "Mazharul Haq"],
    correct: "3",
    exptext: "✅ Rajkumar Shukla, a local farmer, brought Gandhi to Champaran. 📌 Shukla invited and Gandhi came. ❌ Rajendra Prasad is tempting, but he joined as a helper later."
  },
  10: {
    type: "concept", icon: "⚖️", accent: "#ef4444", pauseTimer: true,
    title: "Rowlatt Act (1919)",
    html: `
      <p class="cp-lead">The Rowlatt Act of 1919 gave the government power to jail Indians without trial. <u>Indians called it the Black Act, and it led to Gandhi's first all-India movement.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/6.png" alt="Rowlatt Act 1919 protest hartal India photo" data-caption="A hartal against the Rowlatt Act in 1919, India's first nationwide hartal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/7.png" alt="Three boxes in a row labelled Two Bills, One dropped One passed, Rowlatt Act March 1919, w" data-caption="The Rowlatt Act and its famous slogan of no argument, no lawyer and no appeal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A committee under <b>Justice Sydney Rowlatt</b> prepared two bills. The <b>Seditious and Disruptive Activities Bill</b> was dropped. The <b>Anarchical and Revolutionary Crimes Bill</b> was passed in <b>March 1919</b> as the <b>Rowlatt Act</b>. Its slogan was <b>No Dalil, No Vakil, No Appeal</b>, which means no argument, no lawyer and no appeal.</p>
      <table><thead><tr><th>Provision</th><th>Meaning</th></tr></thead><tbody><tr><td>Detention</td><td>Two years without trial on suspicion</td></tr><tr><td>Press</td><td>Control over newspapers</td></tr><tr><td>Arrest</td><td>Arrest and search without a warrant</td></tr><tr><td>Detention</td><td>Indefinite detention; the accused was denied the right to know his accusers and the evidence</td></tr></tbody></table>
      <p class="cp-lead">On <b>6 April 1919</b>, Gandhi launched the <b>Anti-Rowlatt Act Satyagraha</b>, his first all-India movement. It was India's first nationwide hartal, held on Anti-Rowlatt Act Day. A <b>Satyagraha Sabha</b> was formed by Jamnalal Bajaj, Shankarlal Banker and Omar Somani.</p>
      <p class="cp-lead">Gandhi was arrested on 8 or 9 April 1919 while entering Delhi. In Punjab, Doctor Satya Pal and Doctor Saifuddin Kitchlew were arrested on 10 April. After the violence, Gandhi withdrew the movement on <b>18 April 1919</b>. The Rowlatt Act, the Press Act and 22 other laws were repealed in March 1922. This agitation made Gandhi the undisputed leader of the nation.</p>
      <div class="cp-note trap">The Rowlatt Act was passed in March 1919, the hartal was on 6 April, and the Satyagraha was withdrawn on 18 April.</div>
      <div class="cp-note exam">The Rowlatt Act is also called the Black Act and its slogan is No Dalil, No Vakil, No Appeal.</div>
    `
  },
  11: {
    questext: "Which of the following was the slogan against the Rowlatt Act?",
    options: ["Do or Die", "Quit India", "Inquilab Zindabad", "No Dalil, No Vakil, No Appeal"],
    correct: "4",
    exptext: "✅ No Dalil, No Vakil, No Appeal described the Act, which denied argument, lawyer and appeal. 📌 Three nos for the Black Act. ❌ Do or Die is tempting, but it belongs to the Quit India Movement."
  },
  12: {
    questext: "Gandhi's Anti-Rowlatt Act Satyagraha of 1919 was his first of which kind?",
    options: ["Hunger strike", "All-India movement", "Non-cooperation", "Boycott of titles"],
    correct: "2",
    exptext: "✅ It was Gandhi's first all-India movement and the first nationwide hartal. 📌 Rowlatt takes Gandhi national. ❌ Hunger strike is tempting, but that was Ahmedabad."
  },
  13: {
    questext: "Consider the following statements:\n1. The Rowlatt Act allowed arrest and search without a warrant.\n2. Gandhi withdrew the Rowlatt Satyagraha on 18 April 1919.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Harsh law in March and withdrawal in April. ❌ Choosing only one is tempting because the second date is less known."
  },
  14: {
    type: "concept", icon: "🩸", accent: "#8b5cf6", pauseTimer: true,
    title: "Jallianwala Bagh — 13 April 1919",
    html: `
      <p class="cp-lead">On 13 April 1919, British soldiers fired on a peaceful crowd at Amritsar. <u>This massacre shocked the nation and ended Indian trust in British justice.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/8.png" alt="Jallianwala Bagh memorial Amritsar well bullet marks photo" data-caption="The Jallianwala Bagh in Amritsar, where the massacre took place on 13 April 1919." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/9.png" alt="Timeline of five boxes: 6 April 1919 Hartal, 13 April 1919 Massacre, 18 April 1919 Rowlatt" data-caption="The main dates of the Jallianwala Bagh events from 1919 to 1940." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">On <b>13 April 1919</b>, the festival of <b>Baisakhi</b>, an unarmed crowd gathered at Jallianwala Bagh in Amritsar to protest the arrest of <b>Doctor Kitchlew</b> and <b>Doctor Satyapal</b>. <b>Brigadier General R. E. H. Dyer</b> ordered firing without warning after blocking the only exit. The official toll was <b>379</b>. Punjab's Lieutenant Governor was <b>Michael O'Dwyer</b>, and martial law kept medical help away.</p>
      <table><thead><tr><th>Reaction</th><th>Person</th></tr></thead><tbody><tr><td>Renounced his knighthood</td><td>Rabindranath Tagore</td></tr><tr><td>Called it deliberate murder</td><td>Dinabandhu C. F. Andrews</td></tr><tr><td>Resigned from the Viceroy's Executive Council</td><td>Shankar Nair</td></tr><tr><td>Hunter Commission (14 October 1919)</td><td>Indian members: Sir Chimanlal Setalvad, Pandit Jagat Narayan, Sardar Sultan Ahmad Khan</td></tr></tbody></table>
      <p class="cp-lead">The <b>Hunter Commission</b>, also called the Disorders Inquiry Committee, was announced on <b>14 October 1919</b>. Dyer escaped penal action: he was called mistaken in his notion of duty and was relieved of command in 1920. An <b>Indemnity Bill</b> was passed to protect officials.</p>
      <p class="cp-lead">The Congress boycotted the Hunter Commission and set up its own inquiry under <b>Madan Mohan Malaviya</b>, with Gandhi, C. R. Das, Abbas Tyabji, Motilal Nehru and M. R. Jayakar. Udham Singh shot Michael O'Dwyer at Caxton Hall, London, on 13 March 1940.</p>
      <div class="cp-note trap">Dyer fired at Jallianwala Bagh, but Michael O'Dwyer was the Lieutenant Governor of Punjab. Udham Singh shot O'Dwyer, not Dyer.</div>
      <div class="cp-note exam">Remember the official toll of 379, and that Tagore renounced his knighthood and Shankar Nair resigned.</div>
    `
  },
  15: {
    questext: "Who ordered the firing at Jallianwala Bagh on 13 April 1919?",
    options: ["Michael O'Dwyer", "Lord Chelmsford", "Brigadier General R. E. H. Dyer", "Lord Hunter"],
    correct: "3",
    exptext: "✅ Brigadier General Dyer ordered the firing. 📌 Dyer fired and O'Dwyer governed. ❌ Michael O'Dwyer is tempting because he was the Governor and supported Dyer, but Dyer gave the order."
  },
  16: {
    questext: "Which leader renounced his knighthood in protest against the Jallianwala Bagh massacre?",
    options: ["Rabindranath Tagore", "Gopal Krishna Gokhale", "Sir Chimanlal Setalvad", "Shankar Nair"],
    correct: "1",
    exptext: "✅ Rabindranath Tagore renounced his knighthood. 📌 Poet gave up the title. ❌ Shankar Nair is tempting because he also protested, but he resigned from the Viceroy's Executive Council."
  },
  17: {
    questext: "Who shot Michael O'Dwyer at Caxton Hall in London in 1940?",
    options: ["Bhagat Singh", "Chandrashekhar Azad", "Rasbihari Bose", "Udham Singh"],
    correct: "4",
    exptext: "✅ Udham Singh shot Michael O'Dwyer on 13 March 1940. 📌 Udham Singh took revenge for Jallianwala Bagh. ❌ Bhagat Singh is tempting because he is a famous Punjab revolutionary, but he was hanged in 1931."
  },
  18: {
    type: "concept", icon: "🌙", accent: "#14b8a6", pauseTimer: true,
    title: "Khilafat Movement",
    html: `
      <p class="cp-lead">The Khilafat Movement began as Muslims' protest against the treatment of the Caliph of Turkey. <u>Gandhi saw it as a chance to bring Hindus and Muslims together.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/10.png" alt="Ali Brothers Shaukat Ali Muhammad Ali Jauhar Khilafat photo" data-caption="Muhammad Ali and Shaukat Ali, the Ali Brothers who led the Khilafat Movement." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/11.png" alt="Mustafa Kemal Ataturk portrait photo" data-caption="Mustafa Kemal, who abolished the Caliphate in Turkey in 1924." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>Caliph (Khalifa)</b> of the Ottoman Turkish Empire was the spiritual head of Muslims. He had been promised respect, but the <b>Treaty of Sevres of 1920</b> divided Turkey and abolished the post.</p>
      <p class="cp-lead">In October 1919 the <b>Khilafat Committee</b> was formed by the <b>Ali Brothers</b> (Shaukat Ali and Muhammad Ali), Maulana Azad, Hakim Ajmal Khan and Hasrat Mohani. Gandhi saw a chance to cement Hindu-Muslim unity, which the Lucknow Pact of 1916 had begun.</p>
      <table><thead><tr><th>Demand</th><th>Meaning</th></tr></thead><tbody><tr><td>Sacred places</td><td>The Khalifa should keep control of all Muslim sacred places</td></tr><tr><td>Territory</td><td>Enough territory left to defend the Islamic faith</td></tr><tr><td>Arab lands</td><td>Arabia, Syria, Iraq and Palestine under Muslim sovereignty</td></tr></tbody></table>
      <table><thead><tr><th>Event</th><th>Date</th></tr></thead><tbody><tr><td>All India Khilafat Conference, Delhi</td><td>November 1919, presided over by Gandhi</td></tr><tr><td>Allahabad Conference</td><td>June 1920; made Gandhi the leader of Non-Cooperation</td></tr><tr><td>Movement launched</td><td>1 August 1920</td></tr><tr><td>Calcutta special session</td><td>September 1920, president Lala Lajpat Rai; merged the Khilafat issue into the Non-Cooperation resolution</td></tr></tbody></table>
      <p class="cp-lead"><b>Decline.</b> The movement became fragmented and was overshadowed by Non-Cooperation. In 1924, <b>Mustafa Kemal</b> ended Ottoman rule, made Turkey a secular republic and abolished the Caliphate. It was called a <b>marriage of convenience</b>, and its gain was a joint Hindu-Muslim front.</p>
      <div class="cp-note trap">Treaty of Sevres was in 1920, and the Caliphate was abolished in 1924 by Mustafa Kemal. Do not mix the two events.</div>
      <div class="cp-note exam">The Khilafat Movement was launched on 1 August 1920, the day Tilak died.</div>
    `
  },
  19: {
    questext: "Which treaty divided Turkey and led to the Khilafat Movement in India?",
    options: ["Treaty of Versailles", "Treaty of Sevres", "Treaty of Lausanne", "Treaty of Amritsar"],
    correct: "2",
    exptext: "✅ The Treaty of Sevres of 1920 divided Turkey and abolished the Caliph's position. 📌 Sevres means Turkey broken. ❌ The Treaty of Lausanne is tempting because it also relates to Turkey, but it was signed later, in 1923."
  },
  20: {
    questext: "Who ended the Ottoman rule in Turkey and abolished the Caliphate in 1924?",
    options: ["Ismet Inonu", "Enver Pasha", "Mustafa Kemal", "Sultan Mehmed"],
    correct: "3",
    exptext: "✅ Mustafa Kemal made Turkey a secular republic and abolished the Caliphate. 📌 Kemal ended the Khilafat issue. ❌ Enver Pasha is tempting because he led Turkey in the war, but he did not abolish the Caliphate."
  },
  21: {
    questext: "Who presided over the All India Khilafat Conference at Delhi in November 1919?",
    options: ["Muhammad Ali", "Maulana Azad", "Hakim Ajmal Khan", "Mahatma Gandhi"],
    correct: "4",
    exptext: "✅ Gandhi presided over the Delhi conference of November 1919. 📌 Gandhi joined the Khilafat cause from the start. ❌ Muhammad Ali is tempting because he led the Khilafat Committee, but Gandhi presided."
  },
  22: {
    type: "concept", icon: "✊", accent: "#ec4899", pauseTimer: true,
    title: "Non-Cooperation Movement (1920–1922): Causes, Nagpur and Programme",
    html: `
      <p class="cp-lead">The Non-Cooperation Movement was the first mass movement for Swaraj under Gandhi. <u>It asked Indians to stop helping the British government.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/12.png" alt="Charkha spinning wheel Khadi Non-Cooperation Movement photo" data-caption="The charkha, the spinning wheel that became the symbol of Swadeshi and Khadi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/13.png" alt="Nagpur Congress session 1920 Gandhi photo" data-caption="The Nagpur session of the Congress in December 1920." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Causes.</b> The Rowlatt Act and Jallianwala Bagh, the Hunter Commission report, the treatment of the Khalifa, and the inadequacy of the Montagu-Chelmsford Reforms, especially <b>Dyarchy</b>. Bal Gangadhar Tilak, Bipin Chandra Pal and Annie Besant doubted the plan, and at first the Muslim League did too, but younger nationalists backed Gandhi.</p>
      <p class="cp-lead"><b>Nagpur Session, December 1920.</b> It ratified the Calcutta resolution and amended the constitution. The goal became <b>Swaraj</b>. A three-tier structure was set up with the <b>Congress Working Committee</b> and the <b>All-India Congress Committee</b> at the centre, and <b>Provincial Congress Committees</b> on linguistic lines. The membership fee was <b>four annas</b>, which is 25 paise.</p>
      <table><thead><tr><th>Three demands</th><th>Detail</th></tr></thead><tbody><tr><td>First</td><td>Redress of the Jallianwala Bagh wrong</td></tr><tr><td>Second</td><td>Justice on Khilafat (Treaty of Sevres)</td></tr><tr><td>Third</td><td>Grant of Swaraj</td></tr></tbody></table>
      <table><thead><tr><th>Part of programme</th><th>Detail</th></tr></thead><tbody><tr><td>Positive</td><td>National schools, Panchayat courts, removal of untouchability, Hindu-Muslim unity, Swadeshi and Khadi with 20 lakh charkhas, and a Swaraj Fund of 1 crore rupees</td></tr><tr><td>Boycott</td><td>Return of titles and honours; boycott of government schools, colleges and courts; foreign cloth shunned; lawyers and litigants boycott functions, elections and councils; liquor shops picketed</td></tr></tbody></table>
      <p class="cp-lead">The movement began on <b>1 August 1920</b>, when Gandhi returned the Kaiser-e-Hind medal and Jamnalal Bajaj returned his Rai Bahadur title. Lawyers <b>C. R. Das, Motilal Nehru, Vallabhbhai Patel and Rajendra Prasad</b> gave up practice. New institutions came up, such as Kashi, Gujarat and Bihar Vidyapeeths, National College at Lahore and <b>Jamia Millia Islamia</b> at Delhi.</p>
      <div class="cp-note trap">The Calcutta session of September 1920 passed the Non-Cooperation resolution, and the Nagpur session of December 1920 ratified it. Do not swap them.</div>
      <div class="cp-note exam">Nagpur 1920: goal Swaraj, fee four annas, three-tier structure with the Congress Working Committee and Provincial Congress Committees on linguistic lines.</div>
    `
  },
  23: {
    questext: "At which Congress session of December 1920 was the Non-Cooperation resolution ratified and the goal changed to Swaraj?",
    options: ["Nagpur", "Calcutta", "Lahore", "Gaya"],
    correct: "1",
    exptext: "✅ The Nagpur session ratified the Calcutta resolution and amended the constitution. 📌 Calcutta passed it, Nagpur confirmed it. ❌ Calcutta is tempting because it first passed the resolution in September."
  },
  24: {
    questext: "What was the membership fee of the Congress after the Nagpur session of 1920?",
    options: ["One rupee", "Eight annas", "Four annas", "Two annas"],
    correct: "3",
    exptext: "✅ The fee was four annas, or 25 paise, so that poor people could join. 📌 Four annas made it a mass body. ❌ Eight annas is tempting, but it was higher than the actual fee."
  },
  25: {
    questext: "Which of the following was NOT part of the positive programme of the Non-Cooperation Movement?",
    options: ["National schools", "Panchayat courts", "Removal of untouchability", "Armed revolt against the government"],
    correct: "4",
    exptext: "✅ Armed revolt was never part of the programme, which was non-violent. 📌 Positive means constructive work. ❌ Panchayat courts is tempting as an unusual choice, but they were part of it."
  },
  26: {
    type: "concept", icon: "🔥", accent: "#3b82f6", pauseTimer: true,
    title: "Non-Cooperation Movement (1920–1922): Course, Chauri Chaura and Appraisal",
    html: `
      <p class="cp-lead">The movement spread to many regions, but a violent event stopped it. <u>On 12 February 1922 Gandhi suspended it after Chauri Chaura.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/14.png" alt="Chauri Chaura incident 1922 police station memorial Gorakhpur photo" data-caption="The memorial at Chauri Chaura, where the violent incident of February 1922 took place." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/15.png" alt="Timeline with four boxes: 5 February 1922 Chauri Chaura, 12 February 1922 Movement suspend" data-caption="The events from Chauri Chaura to the release of Gandhi in 1924." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Spread of the movement.</b> Over 30,000 people were arrested. The visit of the Prince of Wales on 17 November 1921 met with a hartal. The peasants of Bardoli withheld revenue. The elections of 1920 were boycotted. <b>Lala Lajpat Rai</b> was jailed under the Seditious Meetings Act, and Jawaharlal Nehru for 18 months. The <b>Tilak Swaraj Fund</b> was raised after Tilak's death on 1 August 1920.</p>
      <table><thead><tr><th>Region</th><th>Impact</th></tr></thead><tbody><tr><td>Punjab</td><td>Gurudwara Reform or Akali Movement</td></tr><tr><td>Madras</td><td>Four-month labour strike</td></tr><tr><td>United Provinces, Bihar and parts of Andhra</td><td>Eka and Kisan Sabha Movement</td></tr><tr><td>Assam</td><td>Tea garden workers' movement</td></tr><tr><td>Princely States</td><td>Praja Mandal movements</td></tr></tbody></table>
      <p class="cp-lead"><b>Chauri Chaura, 5 February 1922.</b> About 2,500 people marched to picket a liquor shop near Gorakhpur in the United Provinces. The police fired, and the mob burnt the police chowki, killing about 22 or 23 policemen. Gandhi fasted for 5 days, and on <b>12 February 1922</b> the Congress Working Committee at <b>Bardoli</b> suspended the movement.</p>
      <p class="cp-lead">Gandhi was arrested on <b>10 March 1922</b>, got six years, and was freed in February 1924. In the Chauri Chaura case, 228 were tried, 172 were sentenced to death and 6 died in custody. <b>M. N. Roy</b> called the suspension a <b>legalised murder</b>. Motilal Nehru, C. R. Das, Jawaharlal Nehru and Subhash Chandra Bose attacked it.</p>
      <p class="cp-lead"><b>Appraisal.</b> No demand was met, and the unity of the Lucknow Pact was damaged by riots, so the pattern is called <b>Struggle-Truce-Struggle</b>. But it was a true mass movement of peasants, workers, merchants and students, and the <b>first mass-scale movement for Swaraj</b>.</p>
      <div class="cp-note trap">Chauri Chaura was on 5 February 1922, suspension on 12 February at Bardoli, and Gandhi's arrest on 10 March 1922.</div>
      <div class="cp-note exam">Gandhi suspended the movement at Bardoli on 12 February 1922, and M. N. Roy called it legalised murder.</div>
    `
  },
  27: {
    questext: "The Non-Cooperation Movement was suspended after which incident?",
    options: ["Jallianwala Bagh massacre", "Chauri Chaura incident", "Kakori conspiracy", "Moplah rebellion"],
    correct: "2",
    exptext: "✅ Gandhi suspended the movement after the Chauri Chaura violence in 1922. 📌 Chauri Chaura means stop. ❌ The Moplah rebellion is tempting because it also occurred in 1921, but it did not cause the suspension."
  },
  28: {
    questext: "Where did the Congress Working Committee meet on 12 February 1922 to suspend the Non-Cooperation Movement?",
    options: ["Bardoli", "Nagpur", "Gaya", "Belgaum"],
    correct: "1",
    exptext: "✅ The Congress Working Committee at Bardoli suspended the movement. 📌 Bardoli on 12 February. ❌ Gaya is tempting because it was the Congress session of December 1922."
  },
  29: {
    questext: "Who described Gandhi's suspension of the Non-Cooperation Movement as a 'legalised murder'?",
    options: ["C. R. Das", "M. N. Roy", "Subhash Chandra Bose", "Motilal Nehru"],
    correct: "2",
    exptext: "✅ M. N. Roy used the phrase. 📌 Roy and legalised murder go together. ❌ C. R. Das is tempting because he also opposed the suspension, but the phrase is Roy's."
  },
  30: {
    type: "concept", icon: "🧭", accent: "#f97316", pauseTimer: true,
    title: "Swaraj Party (March 1923)",
    html: `
      <p class="cp-lead">After the suspension of Non-Cooperation, one group of Congress wanted to enter the councils. <u>This group formed the Swaraj Party in 1923.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/16.png" alt="Chittaranjan Das Motilal Nehru Swaraj Party leaders photo" data-caption="Chittaranjan Das and Motilal Nehru, the founders of the Swaraj Party." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/17.png" alt="Two columns: Pro-changers Das, Motilal Nehru, Vitthalbhai Patel, Ajmal Khan enter councils" data-caption="The Congress split into Pro-changers and No-changers over entering the councils." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">At the <b>Gaya session of December 1922</b>, presided over by <b>C. R. Das</b>, the Congress split on whether to contest the elections of 1923.</p>
      <table><thead><tr><th>Group</th><th>Leaders</th><th>View</th></tr></thead><tbody><tr><td>Pro-changers</td><td>C. R. Das, Motilal Nehru, Vitthalbhai Patel, Hakim Ajmal Khan</td><td>Enter the legislatures</td></tr><tr><td>No-changers</td><td>C. Rajagopalachari, Rajendra Prasad, M. A. Ansari</td><td>Continue the boycott</td></tr></tbody></table>
      <p class="cp-lead">The <b>Congress-Khilafat Swaraj Party</b> was formed in <b>March 1923</b> with <b>C. R. Das as President</b> and <b>Motilal Nehru as General Secretary</b>. It was recognised at the special Congress session at Delhi in September 1923, presided over by <b>Maulana Azad</b>, which saved the Congress from a split.</p>
      <p class="cp-lead">Its manifesto demanded Swaraj, speedy full dominion status, provincial autonomy to replace Dyarchy, an Indian Constituent Assembly, release of political prisoners and repeal of repressive laws. It also wanted to obstruct the Government of India Act, 1919 from inside, and a Round Table Conference.</p>
      <p class="cp-lead">In the <b>1923 elections</b> it won <b>42 of 101</b> elected seats in the Central Legislature and a majority in the Central Provinces. It was largest in Bengal. City heads included C. R. Das at Calcutta, Vallabhbhai Patel at Ahmedabad and Jawaharlal Nehru at Allahabad. In <b>1925</b> Vitthalbhai Patel became Speaker of the Central Legislative Assembly.</p>
      <p class="cp-lead"><b>Downfall.</b> After the death of C. R. Das in 1925, the party split into <b>Responsivists</b> (Lala Lajpat Rai and Madan Mohan Malaviya, who wished to cooperate for Hindu interests) and <b>Non-Responsivists</b>. It lost the 1926 elections, and the Simon Commission and the 1927 Madras session left it in oblivion. Das was the political guru of Subhash Chandra Bose.</p>
      <div class="cp-note trap">C. R. Das was the President and Motilal Nehru the General Secretary of the Swaraj Party. Do not swap the posts.</div>
      <div class="cp-note exam">Swaraj Party won 42 of 101 seats in 1923, and Vitthalbhai Patel became Speaker in 1925.</div>
    `
  },
  31: {
    questext: "Who were the President and the General Secretary of the Swaraj Party founded in 1923?",
    options: ["C. R. Das and Motilal Nehru", "Motilal Nehru and C. R. Das", "Vitthalbhai Patel and Hakim Ajmal Khan", "Rajendra Prasad and C. Rajagopalachari"],
    correct: "1",
    exptext: "✅ C. R. Das was the President and Motilal Nehru was the General Secretary. 📌 Das first, Nehru second. ❌ The reversed pair is tempting because Nehru is often more famous."
  },
  32: {
    questext: "How many of the 101 elected seats did the Swaraj Party win in the Central Legislature in the 1923 elections?",
    options: ["32", "52", "42", "62"],
    correct: "3",
    exptext: "✅ The party won 42 of 101 seats. 📌 Forty-two in 1923. ❌ 52 is tempting because it looks like a majority, but it was far short of that."
  },
  33: {
    questext: "Which of the following was a No-changer in the Congress after the Gaya session of 1922?",
    options: ["C. R. Das", "Motilal Nehru", "Vitthalbhai Patel", "C. Rajagopalachari"],
    correct: "4",
    exptext: "✅ C. Rajagopalachari was a No-changer, who wanted to continue the boycott. 📌 No-changers said no to councils. ❌ Motilal Nehru is tempting because he is famous, but he was a Pro-changer."
  },
  34: {
    type: "concept", icon: "📝", accent: "#84cc16", pauseTimer: true,
    title: "Gandhi-Das Pact (November 1924)",
    html: `
      <p class="cp-lead">In November 1924 Gandhi and the Swaraj leaders came to an agreement. <u>It allowed the Swaraj Party to work in the councils in the name of the Congress.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/18.png" alt="Mahatma Gandhi and C. R. Das photo" data-caption="Mahatma Gandhi and C. R. Das, who agreed on the pact of November 1924." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/19.png" alt="Three boxes in a row: Joint statement November 1924 Gandhi Das Motilal, Swaraj Party works" data-caption="The Gandhi-Das Pact moved from a joint statement to confirmation at Belgaum." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A <b>joint statement</b> was issued by <b>Gandhi, C. R. Das and Motilal Nehru</b>. It said that the Swaraj Party could work in the legislatures in the Congress's name, as an integral part of the Congress.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Swaraj Party</td><td>Allowed to work in councils as part of the Congress</td></tr><tr><td>Non-Cooperation</td><td>No longer compulsory</td></tr><tr><td>Gandhi's work</td><td>He took up the All India Spinners' Association</td></tr><tr><td>Confirmed</td><td>Belgaum session, 1924, presided over by Gandhi</td></tr></tbody></table>
      <p class="cp-lead">This pact ended the quarrel between the Pro-changers and the No-changers. Gandhi became the president of the Congress only once, at <b>Belgaum in 1924</b>.</p>
      <div class="cp-note trap">The pact was agreed in November 1924 and confirmed at the Belgaum session in December 1924, presided over by Gandhi.</div>
      <div class="cp-note exam">Under the pact, Non-Cooperation ceased to be compulsory and Gandhi took the All India Spinners' Association.</div>
    `
  },
  35: {
    questext: "Where was the Gandhi-Das Pact confirmed in 1924?",
    options: ["Kanpur", "Belgaum", "Gaya", "Lahore"],
    correct: "2",
    exptext: "✅ The pact was confirmed at the Belgaum session of 1924, presided over by Gandhi. 📌 Belgaum is the only session Gandhi presided over. ❌ Gaya is tempting because the Swaraj Party was born after that session."
  },
  36: {
    questext: "Under the Gandhi-Das Pact, what did Gandhi take up after Non-Cooperation ceased to be compulsory?",
    options: ["The All India Spinners' Association", "The Home Rule League", "The Servants of India Society", "The Swaraj Party"],
    correct: "1",
    exptext: "✅ Gandhi took up the All India Spinners' Association. 📌 Gandhi turned to the spinning wheel. ❌ The Swaraj Party is tempting, but it was led by Das and Motilal."
  },
  37: {
    type: "concept", icon: "🧩", accent: "#06b6d4", pauseTimer: true,
    title: "Other Parties and Movements (1922–27)",
    html: `
      <p class="cp-lead">Besides the Congress, other parties became important after the Khilafat movement declined. <u>Each party spoke for a different group.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/20.png" alt="Muhammad Ali Jinnah portrait photo 1920s" data-caption="Muhammad Ali Jinnah, who led the Muslim League in the years after 1922." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/21.png" alt="Madan Mohan Malaviya portrait photo" data-caption="Madan Mohan Malaviya, who led the Hindu Mahasabha and became its president in 1924." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Emergence_of_Gandhi/22.png" alt="Four boxes labelled Muslim League 1906, Hindu Mahasabha 1915, Liberal group 1918, Unionist" data-caption="Four parties of the 1920s and the leader linked with each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Party</th><th>Year</th><th>Key facts</th></tr></thead><tbody><tr><td>All India Muslim League</td><td>1906</td><td>Prominent in 1922 to 1927 after the Khilafat decline, with Mohammad Ali Jinnah as leader</td></tr><tr><td>Hindu Mahasabha</td><td>1915</td><td>Madan Mohan Malaviya; prominent after he became President in 1924; the first conference at Haridwar was chaired by the Maharaja of Kasim Bazar</td></tr><tr><td>Liberal group</td><td>1918</td><td>Surendranath Banerjee; broke from the Congress and cooperated with the government</td></tr><tr><td>Unionist Party</td><td>1923</td><td>A secular party for Punjab's agriculturists (Muslims, Hindus and Sikhs); co-founders were Sir Sikandar Hyat Khan, Sir Fazl-i-Husain, Chaudhry Shahab-ud-Din and Sir Chhotu Ram</td></tr></tbody></table>
      <p class="cp-lead">Sir Chhotu Ram brought agrarian reform, approved the <b>Bhakra Dam</b> scheme and laid the foundation of the <b>Green Revolution</b>. The party's <b>Golden Bills</b> included the Indebtedness Bill and Debt Conciliation Boards in every district.</p>
      <div class="cp-note trap">The Unionist Party was secular and represented Punjab's agriculturists of all religions. Do not call it a Muslim party.</div>
      <div class="cp-note exam">Hindu Mahasabha 1915 (Malaviya, President in 1924), Liberal group 1918 (Surendranath Banerjee), Unionist Party 1923 (Chhotu Ram).</div>
    `
  },
  38: {
    questext: "Which party was founded in Punjab in 1923 for agriculturists of all religions, with Sir Chhotu Ram as a leader?",
    options: ["The Akali Dal", "The Hindu Mahasabha", "The Unionist Party", "The Muslim League"],
    correct: "3",
    exptext: "✅ The Unionist Party represented Punjab's Muslim, Hindu and Sikh farmers. 📌 Unionist means united farmers. ❌ The Akali Dal is tempting because it was also in Punjab, but it was a Sikh party."
  },
  39: {
    questext: "Who became the President of the Hindu Mahasabha in 1924, after which the party became prominent?",
    options: ["Lala Lajpat Rai", "V. D. Savarkar", "Surendranath Banerjee", "Madan Mohan Malaviya"],
    correct: "4",
    exptext: "✅ Madan Mohan Malaviya became the President in 1924. 📌 Malaviya with the Mahasabha. ❌ Lala Lajpat Rai is tempting because he supported it later, but he was not the president in 1924."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an elegant gold-lined spinning wheel, a pair of round spectacles, and a rolled parchment scroll with a quill" },
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahatma Gandhi young barrister South Africa photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/1.png. a young Gandhi in South Africa",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/2.png": { t: "fig", about: "Timeline with six boxes: 1869 Born at Porbandar, 1891 Called to the Bar, 1893 Goes to South Africa, 1906 First Satyagraha, 1915 Returns to India, 1919 Gandhi Era begins." },
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Champaran Satyagraha 1917 Gandhi Rajkumar Shukla indigo farmers photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/3.png. a photo of Gandhi at Champaran",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ambalal Sarabhai Anasuya Sarabhai Ahmedabad mill strike 1918 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/4.png. a photo of the Ahmedabad mill leaders",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/5.png": { t: "fig", about: "Three columns labelled Champaran 1917 Indigo, Ahmedabad 1918 Mill workers, Kheda 1918 Land revenue, each with the word First below: First Satyagraha, First hunger strike, First non-cooperation." },
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rowlatt Act 1919 protest hartal India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/6.png. a photo of the Rowlatt protests",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/7.png": { t: "fig", about: "Three boxes in a row labelled Two Bills, One dropped One passed, Rowlatt Act March 1919, with the slogan No Dalil No Vakil No Appeal." },
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jallianwala Bagh memorial Amritsar well bullet marks photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/8.png. a photo of the Jallianwala Bagh memorial",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/9.png": { t: "fig", about: "Timeline of five boxes: 6 April 1919 Hartal, 13 April 1919 Massacre, 18 April 1919 Rowlatt Satyagraha withdrawn, 14 October 1919 Hunter Commission announced, 1940 Udham Singh shoots O'Dwyer." },
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ali Brothers Shaukat Ali Muhammad Ali Jauhar Khilafat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/10.png. a photo of the Ali Brothers",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mustafa Kemal Ataturk portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/11.png. a portrait of Mustafa Kemal",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Charkha spinning wheel Khadi Non-Cooperation Movement photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/12.png. a photo of a charkha",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nagpur Congress session 1920 Gandhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/13.png. a photo of the Nagpur Congress session",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chauri Chaura incident 1922 police station memorial Gorakhpur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/14.png. a photo of the Chauri Chaura memorial",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/15.png": { t: "fig", about: "Timeline with four boxes: 5 February 1922 Chauri Chaura, 12 February 1922 Movement suspended at Bardoli, 10 March 1922 Gandhi arrested, February 1924 Gandhi released." },
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chittaranjan Das Motilal Nehru Swaraj Party leaders photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/16.png. a photo of C. R. Das and Motilal Nehru",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/17.png": { t: "fig", about: "Two columns: Pro-changers Das, Motilal Nehru, Vitthalbhai Patel, Ajmal Khan enter councils; No-changers Rajagopalachari, Rajendra Prasad, Ansari continue boycott." },
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahatma Gandhi and C. R. Das photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/18.png. a photo of Gandhi with C. R. Das",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/19.png": { t: "fig", about: "Three boxes in a row: Joint statement November 1924 Gandhi Das Motilal, Swaraj Party works in legislatures, Belgaum session 1924 confirms." },
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Muhammad Ali Jinnah portrait photo 1920s\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/20.png. a portrait of Jinnah in the 1920s",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Madan Mohan Malaviya portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Emergence_of_Gandhi/21.png. a portrait of Madan Mohan Malaviya",
  "images/General_Awareness/Modern_India/Emergence_of_Gandhi/22.png": { t: "fig", about: "Four boxes labelled Muslim League 1906, Hindu Mahasabha 1915, Liberal group 1918, Unionist Party 1923, each with its key leader below." }
});

/* CHANGE LOG
   - Brigadier General Dyer's removal from command is dated 1920 (the source gave only the day and month).
   - The Ahmedabad municipality head is written as Vallabhbhai Patel (the source gave Vitthalbhai Patel); the Patna mayor entry for Rajendra Prasad is left out.
   - The Liberal group of 1918 is described only as a body that broke from the Congress under Surendranath Banerjee.
   - The amount given for Dyer's sword and the House of Lords entry is left out because it could not be confirmed.
   - The weak regions of the Swaraj Party in 1923 are left out because the source was unclear.
*/