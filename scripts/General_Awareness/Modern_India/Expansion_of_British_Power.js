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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Expansion_of_British_Power · 6 concept pages (+ overview) · 20 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Expansion of British Power",
    thumb: {
      image: "images/General_Awareness/Modern_India/Expansion_of_British_Power/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "EXPANSION OF",
      line2: "BRITISH POWER",
      line3: "ALLIANCE & LAPSE",
      badge: "FULL CLASS",
      ribbon: "TREATIES • STATES • TRICKS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Expansion of British Power | Subsidiary Alliance & Doctrine of Lapse | SSC CGL",
      altTitles: ["Subsidiary Alliance and Doctrine of Lapse Made Easy", "Dual Government to Equal Federation in One Class"],
      description: "Subsidiary Alliance and Doctrine of Lapse are favourite topics in Modern History. In this class you learn how the British expanded their power, with every state and year made simple.\n\n📌 IN THIS CLASS\n✅ Five architects of British rule\n✅ Clive's Dual Government\n✅ Wellesley's Subsidiary Alliance\n✅ Dalhousie's Doctrine of Lapse\n✅ Policy towards princely states\n✅ Practice questions with easy explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernHistory #SubsidiaryAlliance",
      tags: ["expansion of british power", "subsidiary alliance", "doctrine of lapse", "dual government bengal", "lord wellesley", "lord dalhousie", "robert clive diarchy", "princely states policy", "ring fence policy", "subordinate isolation", "subordinate union", "equal federation", "william lee warner", "modern history for ssc cgl", "ssc cgl history", "kaiser i hind", "annexation of awadh", "treaty of bassein", "general awareness", "history for railway exams", "modern history tricks", "ssc history revision", "history one shot", "Modern_India questions"],
      hashtags: ["SSCCGL", "ModernHistory", "SubsidiaryAlliance"],
      thumbText: "EXPANSION OF BRITISH POWER",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏛️ New class is live: Expansion of British Power, with Subsidiary Alliance and Doctrine of Lapse made easy. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Modern History — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">This class shows <u>how the East India Company turned its win in Bengal into control over the whole of India</u>. We will learn the Dual Government, the Subsidiary Alliance, the Doctrine of Lapse and the policy towards princely states.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>6</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>20</b><span>Questions</span></div>
        <div class="cp-stat"><b>~32 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Five Architects</b><br>Which five rulers built British power in India, and what each of them added to it.</li>
        <li><b>Clive's Dual Government</b><br>How the Company took the money and the real power in Bengal while the Nawab kept only the duties, and why this ruined Bengal.</li>
        <li><b>Wellesley's Subsidiary Alliance</b><br>The terms of the alliance, why Indian states accepted it, and what the Company and the states gained or lost.</li>
        <li><b>Dalhousie's Doctrine of Lapse</b><br>How states without a natural heir were taken over, the list of states year by year, and why it led to the Revolt of 1857.</li>
        <li><b>Policy towards the Princely States</b><br>The four phases of British policy, from the Ring Fence to the Equal Federation.</li>
        <li><b>Added Exam Facts and Traps</b><br>Small facts and common confusions that the Staff Selection Commission likes to ask.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> the Subsidiary Alliance and the Doctrine of Lapse give some of the most repeated Modern History questions, and the lists of states and years are asked again and again.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#3b82f6", pauseTimer: true,
    title: "The Five Architects",
    html: `
      <p class="cp-lead">British rule in India was built slowly, like a building made by five different builders. <u>Lord Clive laid the foundation, and Lord Dalhousie gave the building its final shape.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/1.png" alt="Building drawn in five levels from the bottom: Clive (foundation), Warren Hastings (streng" data-caption="Five builders of British power, shown as levels of a building." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/2.png" alt="Warren Hastings portrait painting" data-caption="Warren Hastings, who strengthened Company rule in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/3.png" alt="Lord Cornwallis portrait painting" data-caption="Lord Cornwallis, who began constructing the building of British rule." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">At first the East India Company only wanted to trade. After it won Bengal, it needed rulers who could manage land, taxes, courts and armies, and each Governor-General added something new.</p>
      <table><thead><tr><th>Builder</th><th>Work done</th></tr></thead><tbody><tr><td>Lord Clive</td><td>Laid the foundation of Company rule after Plassey and Buxar</td></tr><tr><td>Warren Hastings</td><td>Strengthened the rule</td></tr><tr><td>Lord Cornwallis</td><td>Began constructing the building of the administration</td></tr><tr><td>Lord Wellesley</td><td>Completed the building through the Subsidiary Alliance</td></tr><tr><td>Lord Dalhousie and later Governor-Generals</td><td>Gave the final shape, mainly through the Doctrine of Lapse</td></tr></tbody></table>
      <p class="cp-lead">A good way to remember this is to picture a house. First the base is laid, then it is made firm, then the walls go up, then the roof is finished, and last the painter gives it its final look.</p>
      <div class="cp-note tip">Remember the order of names by their first letters: C, H, C, W, D for Clive, Hastings, Cornwallis, Wellesley and Dalhousie.</div>
      <div class="cp-note trap">Lord Clive was a Governor of the Company and not a Governor-General. Warren Hastings was the first Governor-General of Bengal.</div>
      <div class="cp-note exam">Wellesley completed the building and Dalhousie gave the final shape. These two are often swapped in questions.</div>
      <div class="cp-mnemonic">C, H, C, W, D: Clive, Hastings, Cornwallis, Wellesley, Dalhousie.</div>
    `
  },
  3: {
    questext: "Who among the following is regarded as the one who completed the building of British power in India?",
    options: ["Lord Clive", "Lord Cornwallis", "Lord Wellesley", "Lord Dalhousie"],
    correct: "3",
    exptext: "✅ Lord Wellesley completed the building through the Subsidiary Alliance. 📌 Wellesley comes fourth and finishes the job. ❌ Lord Dalhousie is tempting, but he came last and gave only the final shape."
  },
  4: {
    questext: "Who among the following began constructing the building of British rule in India?",
    options: ["Lord Clive", "Lord Cornwallis", "Warren Hastings", "Lord Wellesley"],
    correct: "2",
    exptext: "✅ Lord Cornwallis began constructing the building. 📌 Cornwallis stands in the middle of the five names. ❌ Warren Hastings is tempting, but he only strengthened what Clive had laid."
  },
  5: {
    questext: "Consider the following statements:\n1. Lord Clive laid the foundation of British power in India.\n2. Warren Hastings completed the building of British power in India.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Clive is first, and the foundation comes first. ❌ Statement 2 is wrong because Hastings only strengthened the rule, and Wellesley completed it."
  },
  6: {
    type: "concept", icon: "⚖️", accent: "#f59e0b", pauseTimer: true,
    title: "Clive's Dual Government (1765–1772)",
    html: `
      <p class="cp-lead">After the Treaty of Allahabad, the Company got real power in Bengal but did not want to rule openly. <u>This system, called the Dual Government or Diarchy, gave power to the Company and duties to the Nawab.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/4.png" alt="Two boxes side by side: Company holds Diwani (land revenue and civil cases) and real power" data-caption="How the two rulers shared the work in Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/5.png" alt="Robert Clive portrait Nathaniel Dance painting" data-caption="Robert Clive, who started the Dual Government in Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Robert Clive beat Siraj-ud-Daulah at Plassey on 23 June 1757. The Battle of Buxar on 22 October 1764 was decisive. By the Treaty of Allahabad on 12 August 1765, the Company received the <b>Diwani</b>, that is, the right to collect land revenue and decide civil cases, in Bengal, Bihar and Orissa.</p>
      <p class="cp-lead">The <b>Nizamat</b>, that is, security, order, justice and the work of the faujdar, was obtained from Nawab Najm-ud-Daulah. The Nizamat was run by deputies who were Indian officials working for the Company.</p>
      <table><thead><tr><th>Province</th><th>Deputy Diwan</th></tr></thead><tbody><tr><td>Bengal</td><td>Raza Khan</td></tr><tr><td>Bihar</td><td>Shitab Rai</td></tr><tr><td>Orissa</td><td>Rai Durlabh</td></tr></tbody></table>
      <p class="cp-lead">It was called dual because the Company took the revenue and the real power, while the Nawab kept the duties and lost the rights. The Company did this to hide its imperial face, because it had too few officers and did not know the local customs and languages.</p>
      <p class="cp-lead">The result was power without responsibility. Farming was crushed because revenue was collected harshly, and this led to the Famine of 1770. Bengal's textile trade was also discouraged to protect England's industry. The historian Percival Spear described the rule as open and shameless plunder.</p>
      <div class="cp-note trap">Do not confuse Diwani and Nizamat. Diwani is revenue and civil cases and went to the Company. Nizamat is security and justice and was nominally with the Nawab.</div>
      <div class="cp-note exam">The Dual Government lasted from 1765 to 1772. The Company's tax-free trade privilege had come earlier, in 1717.</div>
    `
  },
  7: {
    questext: "From whom did the Company obtain the Nizamat of Bengal in the time of Clive's Dual Government?",
    options: ["Mir Jafar", "Mir Qasim", "Shuja-ud-Daula", "Nawab Najm-ud-Daulah"],
    correct: "4",
    exptext: "✅ The Nizamat was obtained from Nawab Najm-ud-Daulah. 📌 Najm sounds like the word for Nizamat. ❌ Mir Qasim is tempting, but he was removed and had fled long before."
  },
  8: {
    questext: "Which phrase best describes the effect of the Dual Government in Bengal?",
    options: ["Power with responsibility for the Company", "Responsibility and power for the Nawab", "Power without responsibility for the Company", "Responsibility without power for the Company"],
    correct: "3",
    exptext: "✅ The Company had the power but did not take responsibility for the people. 📌 The Company held power and the Nawab held the blame. ❌ Option 4 is wrong because it swaps the roles; the Nawab, not the Company, had only duty."
  },
  9: {
    questext: "Who was the Diwan of Bihar under the Dual Government?",
    options: ["Raza Khan", "Shitab Rai", "Rai Durlabh", "Najm-ud-Daulah"],
    correct: "2",
    exptext: "✅ Shitab Rai looked after Bihar. 📌 Shitab begins with S, and Bihar sits in the middle of the three provinces. ❌ Raza Khan is tempting, but he looked after Bengal."
  },
  10: {
    type: "concept", icon: "🤝", accent: "#ef4444", pauseTimer: true,
    title: "Wellesley's Subsidiary Alliance",
    html: `
      <p class="cp-lead">Lord Wellesley became Governor-General in 1798 and wanted the Company to be the paramount power. <u>His tool was the Subsidiary Alliance, in which a ruler paid the Company to protect him and lost his freedom.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/6.png" alt="Exchange diagram: Indian state gives money or territory and accepts a Resident; Company gi" data-caption="What the state gave and what the Company gave." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/7.png" alt="Marquess Wellesley Governor-General portrait painting" data-caption="Lord Wellesley, who spread the Subsidiary Alliance across India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/8.png" alt="British Residency Koti Hyderabad photo" data-caption="The British Residency at Hyderabad, the home of the Resident." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Wellesley feared that Indian rulers would join the French. The idea itself came from the French Governor Dupleix. An early treaty to keep British troops had been signed by the Nawab of Awadh in 1765, but the systematic Subsidiary Alliance began in 1798 with Hyderabad.</p>
      <table><thead><tr><th>Terms the state had to accept</th><th>Meaning</th></tr></thead><tbody><tr><td>British troops</td><td>The ruler kept British soldiers and paid for them in cash or in territory</td></tr><tr><td>Resident</td><td>A British Resident stayed at the court</td></tr><tr><td>No other allies</td><td>No alliance with any European power except the British</td></tr><tr><td>No war</td><td>No war could be fought without British permission</td></tr><tr><td>In return</td><td>Protection from outside and inside danger, and no interference in the state's own affairs</td></tr></tbody></table>
      <p class="cp-lead">The Company gained a huge army paid for by the states. French influence ended, and the Company became the mediator of disputes. The Company also got strategic places and the states could never unite against it.</p>
      <p class="cp-lead">The states lost their independence. Rulers became puppets, and they lost their army and foreign policy. They fell into debt, their economies broke down, the dismissed soldiers became unemployed, and handicrafts fell. Sir Thomas Munro said that the states bought security by selling their independence.</p>
      <table><thead><tr><th>State</th><th>Year</th></tr></thead><tbody><tr><td>Hyderabad (first state)</td><td>1798 and 1800</td></tr><tr><td>Mysore</td><td>1799</td></tr><tr><td>Tanjore</td><td>October 1799</td></tr><tr><td>Awadh</td><td>November 1801</td></tr><tr><td>Peshwa (Marathas)</td><td>December 1802</td></tr><tr><td>Bhonsle of Berar</td><td>December 1803</td></tr><tr><td>Scindia</td><td>February 1804</td></tr><tr><td>Rajput states (Jodhpur, Jaipur, Machheri, Bundi, Bharatpur)</td><td>1818</td></tr></tbody></table>
      <div class="cp-note trap">Awadh signed an early treaty in 1765, but the systematic alliance started in 1798. The first state of the Subsidiary Alliance was Hyderabad, not Awadh.</div>
      <div class="cp-note exam">Remember the order: Hyderabad, Mysore, Tanjore, Awadh, Peshwa, Bhonsle, Scindia.</div>
      <div class="cp-mnemonic">H, M, T, A, P, B, S: Hyderabad, Mysore, Tanjore, Awadh, Peshwa, Bhonsle, Scindia.</div>
    `
  },
  11: {
    questext: "Which was the first state to accept the Subsidiary Alliance of Lord Wellesley?",
    options: ["Hyderabad", "Mysore", "Awadh", "Tanjore"],
    correct: "1",
    exptext: "✅ The Nizam of Hyderabad signed first in 1798 and again in 1800. 📌 The alphabet starts with H in the list. ❌ Awadh is tempting, but it signed in 1801."
  },
  12: {
    questext: "Which Maratha ruler accepted the Subsidiary Alliance through the Treaty of Bassein signed on 31 December 1802?",
    options: ["Daulat Rao Scindia", "Jaswant Rao Holkar", "Raghuji Bhonsle", "Peshwa Bajirao II"],
    correct: "4",
    exptext: "✅ The Peshwa Bajirao II signed the Treaty of Bassein, which led to the Second Anglo-Maratha War. 📌 Bassein belongs to the Peshwa. ❌ Scindia is tempting, but he signed later, in 1804."
  },
  13: {
    questext: "Which one of the following was NOT a feature of the Subsidiary Alliance?",
    options: ["The ruler paid for British troops", "A British Resident stayed at the court", "The ruler could fight wars without British permission", "The ruler could not ally with other European powers"],
    correct: "3",
    exptext: "✅ The ruler could not fight wars without permission. 📌 All the terms took power away from the ruler. ❌ Option 2 is tempting as a wrong choice, but a Resident was indeed a main term."
  },
  14: {
    questext: "Consider the following statements:\n1. Awadh was the first state to accept the systematic Subsidiary Alliance in 1798.\n2. The idea of the Subsidiary Alliance was taken from the French Governor Dupleix.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Dupleix's idea, Wellesley's system. ❌ Statement 1 is wrong because Hyderabad was the first state in 1798, and Awadh signed in 1801."
  },
  15: {
    type: "concept", icon: "🚫", accent: "#8b5cf6", pauseTimer: true,
    title: "Dalhousie's Doctrine of Lapse",
    html: `
      <p class="cp-lead">Lord Dalhousie was Governor-General from 1848 to 1856. <u>His Doctrine of Lapse said that if a ruler died without a natural heir, the state lapsed, that is, passed to the Company.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/9.png" alt="Lord Dalhousie Governor-General portrait painting" data-caption="Lord Dalhousie, who applied the Doctrine of Lapse from 1848." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/10.png" alt="Three-column chart: First category states created by the Company, adoption prohibited; Sec" data-caption="The three kinds of states and their right to adopt an heir." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/11.png" alt="Jhansi Fort Uttar Pradesh photo" data-caption="The fort of Jhansi, linked with Rani Lakshmibai." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A natural heir means a son born to the ruler. Indian rulers had long adopted a son when they had no child. Dalhousie refused to accept the adopted son as the ruler and took over the state. The rule was framed by the Court of Directors of the Company in 1834, and Dalhousie applied it between 1848 and 1856.</p>
      <table><thead><tr><th>Year</th><th>State annexed</th></tr></thead><tbody><tr><td>1848</td><td>Satara</td></tr><tr><td>1849</td><td>Jaitpur and Sambalpur</td></tr><tr><td>1850</td><td>Baghat</td></tr><tr><td>1852</td><td>Udaipur</td></tr><tr><td>1853</td><td>Jhansi</td></tr><tr><td>1854</td><td>Nagpur</td></tr><tr><td>1856</td><td>Awadh (by mis-governance, not lapse)</td></tr></tbody></table>
      <p class="cp-lead">Awadh was taken over in 1856 on the excuse of mis-governance (kushasan), and not by lapse. Its last Nawab was Wajid Ali Shah.</p>
      <p class="cp-lead">The doctrine caused deep anger among Indian princes and their families. It became one of the major causes of the Great Revolt of 1857.</p>
      <div class="cp-note trap">Awadh in 1856 was annexed for mis-governance, not lapse. Many students wrongly count it as a lapse state.</div>
      <div class="cp-note exam">The Doctrine was framed in 1834 by the Court of Directors but applied by Dalhousie from 1848. The first state taken was Satara in 1848.</div>
      <div class="cp-mnemonic">Order of lapse: S, J, B, U, J, N for Satara, Jaitpur, Baghat, Udaipur, Jhansi, Nagpur.</div>
    `
  },
  16: {
    questext: "Which was the first state annexed by Lord Dalhousie under the Doctrine of Lapse?",
    options: ["Satara", "Jhansi", "Nagpur", "Sambalpur"],
    correct: "1",
    exptext: "✅ Satara was annexed in 1848, the first year of Dalhousie. 📌 Satara starts the list. ❌ Jhansi is tempting because it is famous, but it was annexed in 1853."
  },
  17: {
    questext: "On what ground was Awadh annexed by Lord Dalhousie in 1856?",
    options: ["Doctrine of Lapse", "Defeat in war", "Refusal of the Subsidiary Alliance", "Mis-governance"],
    correct: "4",
    exptext: "✅ Awadh was taken on the excuse of mis-governance, and its Nawab was Wajid Ali Shah. 📌 Lapse needs an adoption problem, which Awadh did not have. ❌ Lapse is tempting, but it is the common mistake."
  },
  18: {
    questext: "Which one of the following state and year pairs is NOT correct?",
    options: ["Jhansi — 1853", "Nagpur — 1856", "Satara — 1848", "Udaipur — 1852"],
    correct: "2",
    exptext: "✅ Nagpur was annexed in 1854 and not in 1856. 📌 The years 1853 and 1854 follow one another: Jhansi then Nagpur. ❌ Udaipur 1852 is tempting as a wrong pair, but it is correct."
  },
  19: {
    questext: "Consider the following statements:\n1. The Doctrine of Lapse was framed by the Court of Directors in 1834.\n2. Lord Dalhousie applied the Doctrine of Lapse between 1848 and 1856.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 The rule was framed in 1834 and used by Dalhousie later. ❌ Choosing only statement 2 forgets that the Court of Directors made the rule first."
  },
  20: {
    type: "concept", icon: "🏰", accent: "#14b8a6", pauseTimer: true,
    title: "British Policy towards the Princely States",
    html: `
      <p class="cp-lead">The British treated the princely states differently in different periods. <u>William Lee Warner, in his book The Native States of India, divided the policy into four phases.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/12.png" alt="Four steps going up: Ring Fence 1765-1813, Subordinate Isolation 1813-1858, Subordinate Un" data-caption="The four phases of British policy towards the princely states." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/13.png" alt="Queen Victoria Empress of India portrait painting" data-caption="Queen Victoria, proclaimed Empress of India in 1876." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/14.png" alt="Cabinet Mission 1946 Delhi photo" data-caption="The Cabinet Mission of 1946, which planned a future federation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Phase</th><th>Period</th><th>Main idea</th></tr></thead><tbody><tr><td>Ring Fence</td><td>1765–1813</td><td>Buffer states kept as a fence, and non-interference</td></tr><tr><td>Subordinate Isolation</td><td>1813–1858</td><td>Company paramount, states cut off from each other</td></tr><tr><td>Subordinate Union</td><td>1858–1935</td><td>Annexation dropped, rulers made partners of the Crown</td></tr><tr><td>Equal Federation</td><td>1935–1947</td><td>Federation planned but never realised</td></tr></tbody></table>
      <p class="cp-lead">In the <b>Ring Fence</b> period, the Company kept friendly states as buffers. Awadh was a buffer against the Marathas, and the policy was non-interference. Wellesley's siege of Mysore was a deviation from it.</p>
      <p class="cp-lead">In <b>Subordinate Isolation</b>, free trade needed control, so the Company became paramount. States gave up external sovereignty and were kept isolated. The Charter Act of 1833 ended the Company's trade monopoly, and the Doctrine of Lapse was devised in 1834.</p>
      <p class="cp-lead">After the Revolt of 1857, <b>Subordinate Union</b> began. Annexation was dropped, adoption was allowed again, but the ruler could be deposed. The British represented India abroad. In 1876 the Queen was proclaimed Empress of India, with the title Kaiser-i-Hind.</p>
      <p class="cp-lead">In the last phase, the Government of India Act 1935 planned a federation, but it was never realised. The Cripps Mission of 1942, the Wavell Plan of 1945, the Cabinet Mission of 1946, the Mountbatten Plan of 1947 and the Indian Independence Act of 1947 followed.</p>
      <div class="cp-note trap">The Ring Fence phase ended in 1813, and Subordinate Isolation did not end until 1858. Do not mix up the years.</div>
      <div class="cp-note exam">The turning points are 1813, 1833, 1858 and 1935. The classification of the four phases is by William Lee Warner.</div>
    `
  },
  21: {
    questext: "The four phases of British policy towards the princely states were classified by which writer?",
    options: ["Lord Dalhousie", "Percival Spear", "Thomas Munro", "William Lee Warner"],
    correct: "4",
    exptext: "✅ William Lee Warner wrote The Native States of India and divided the policy into four phases. 📌 Warner and phases both start with a W sound. ❌ Percival Spear is tempting, but he is known for his words on the Dual Government."
  },
  22: {
    questext: "The Ring Fence policy towards the princely states was followed in which period?",
    options: ["1765–1813", "1813–1858", "1858–1935", "1935–1947"],
    correct: "1",
    exptext: "✅ The Ring Fence policy ran from 1765 to 1813. 📌 It is the first phase and starts right after the Diwani of 1765. ❌ The period of 1813 to 1858 is tempting, but that is Subordinate Isolation."
  },
  23: {
    questext: "Consider the following statements:\n1. The policy of Subordinate Isolation lasted from 1858 to 1935.\n2. The Charter Act of 1833 ended the trade monopoly of the Company.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 The years 1858 to 1935 belong to Subordinate Union. ❌ Statement 1 is wrong because Subordinate Isolation ran from 1813 to 1858."
  },
  24: {
    type: "concept", icon: "📌", accent: "#10b981", pauseTimer: true,
    title: "Added Exam Facts and Common Traps",
    html: `
      <p class="cp-lead">These small facts are asked again and again. <u>Learn them in pairs so that two similar things cannot confuse you.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/15.png" alt="Match chart: Diarchy with Clive 1765, Subsidiary Alliance with Wellesley 1798, Doctrine of" data-caption="Match each policy with the Governor-General who used it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/16.png" alt="Delhi Durbar 1877 painting Lord Lytton" data-caption="The Delhi Durbar of 1877, held to proclaim the Queen as Empress." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Expansion_of_British_Power/17.png" alt="Thomas Munro statue Chennai photo" data-caption="Sir Thomas Munro, the Governor of Madras linked with the Ryotwari system." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Treaty of Bassein</td><td>31 December 1802, signed by the Peshwa, led to the Second Anglo-Maratha War</td></tr><tr><td>Fourth Anglo-Mysore War</td><td>Ended by Wellesley in 1799; Tipu died at Seringapatam and the Wodeyar family was restored under a subsidiary treaty</td></tr><tr><td>Conquest, not lapse</td><td>Sindh 1843 (Charles Napier under Lord Ellenborough), Punjab 1849, Lower Burma (Pegu) 1852</td></tr><tr><td>Queen's Proclamation</td><td>1 November 1858 at Allahabad, promising the rights and honour of native rulers</td></tr><tr><td>Kaiser-i-Hind</td><td>Royal Titles Act 1876; Delhi Durbar 1877 under Lord Lytton</td></tr><tr><td>Thomas Munro</td><td>Governor of Madras 1820–27, father of the Ryotwari settlement</td></tr></tbody></table>
      <p class="cp-lead">Lapse denied the adopted heirs of the Bhonsle Raja of Nagpur and Rani Lakshmibai of Jhansi. Nana Saheb, the adopted son of Baji Rao II, lost his pension. All three leaders took part in the Revolt of 1857.</p>
      <div class="cp-note trap">Diarchy is Clive in 1765, Subsidiary Alliance is Wellesley in 1798 and Doctrine of Lapse is Dalhousie in 1848.</div>
      <div class="cp-note trap">The first Subsidiary Alliance state was Hyderabad in 1798. The Doctrine of Lapse was framed in 1834 but applied by Dalhousie from 1848 to 1856.</div>
      <div class="cp-note trap">Awadh in 1856 was taken for mis-governance, Jhansi in 1853 and Nagpur in 1854 for lapse, and Satara in 1848.</div>
    `
  },
  25: {
    questext: "The Queen's Proclamation of 1 November 1858, which promised the rights and honour of native rulers, was read at which place?",
    options: ["Allahabad", "Calcutta", "Delhi", "Bombay"],
    correct: "1",
    exptext: "✅ The proclamation was read at Allahabad after the Revolt of 1857. 📌 Allahabad is where Lord Canning held a durbar. ❌ Delhi is tempting, but the Delhi Durbar of 1877 was a different event."
  },
  26: {
    questext: "Sir Thomas Munro, the Governor of Madras from 1820 to 1827, is known as the father of which settlement?",
    options: ["Permanent Settlement", "Zamindari", "Mahalwari", "Ryotwari"],
    correct: "4",
    exptext: "✅ Thomas Munro is the father of the Ryotwari settlement, in which each farmer pays directly. 📌 Munro and Madras both start with M. ❌ The Permanent Settlement is tempting, but it belongs to Cornwallis."
  },
  27: {
    questext: "The Delhi Durbar of 1877, which celebrated the title of Empress of India, was held under which Viceroy?",
    options: ["Lord Dalhousie", "Lord Ripon", "Lord Lytton", "Lord Curzon"],
    correct: "3",
    exptext: "✅ Lord Lytton held the Delhi Durbar of 1877. 📌 The Royal Titles Act of 1876 came just before it. ❌ Lord Curzon is tempting because he also held a famous Durbar, but that was in 1903."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an old rolled map of India with a wax seal, a brass quill pen and an antique inkwell" },
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/1.png": { t: "fig", about: "Building drawn in five levels from the bottom: Clive (foundation), Warren Hastings (strengthened), Cornwallis (began construction), Wellesley (completed), Dalhousie (final shape)." },
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Warren Hastings portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/2.png. a portrait of Warren Hastings",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Cornwallis portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/3.png. a portrait of Lord Cornwallis",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/4.png": { t: "fig", about: "Two boxes side by side: Company holds Diwani (land revenue and civil cases) and real power; Nawab holds Nizamat (security and justice) as duty only. A bridge labelled deputies." },
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Robert Clive portrait Nathaniel Dance painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/5.png. a portrait of Robert Clive",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/6.png": { t: "fig", about: "Exchange diagram: Indian state gives money or territory and accepts a Resident; Company gives soldiers and protection. Arrows between the two boxes with labels." },
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Marquess Wellesley Governor-General portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/7.png. a portrait of Lord Wellesley",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"British Residency Koti Hyderabad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/8.png. the British Residency building in Hyderabad",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Dalhousie Governor-General portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/9.png. a portrait of Lord Dalhousie",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/10.png": { t: "fig", about: "Three-column chart: First category states created by the Company, adoption prohibited; Second category subsidiary states, adoption only with permission; Third category never under British rule, free to adopt." },
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jhansi Fort Uttar Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/11.png. the fort of Jhansi",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/12.png": { t: "fig", about: "Four steps going up: Ring Fence 1765-1813, Subordinate Isolation 1813-1858, Subordinate Union 1858-1935, Equal Federation 1935-1947." },
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Queen Victoria Empress of India portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/13.png. a portrait of Queen Victoria",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cabinet Mission 1946 Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/14.png. members of the Cabinet Mission in India",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/15.png": { t: "fig", about: "Match chart: Diarchy with Clive 1765, Subsidiary Alliance with Wellesley 1798, Doctrine of Lapse with Dalhousie 1848." },
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Delhi Durbar 1877 painting Lord Lytton\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/16.png. a painting of the Delhi Durbar of 1877",
  "images/General_Awareness/Modern_India/Expansion_of_British_Power/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Thomas Munro statue Chennai photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Expansion_of_British_Power/17.png. the statue of Sir Thomas Munro"
});

/* CHANGE LOG
   - Awadh's treaty of 1765 is described as an early arrangement to keep British troops; the systematic Subsidiary Alliance began in 1798 with Hyderabad, the first state.
   - The Treaty of Allahabad is dated 12 August 1765 and the Nizamat is described as obtained from Nawab Najm-ud-Daulah, in line with the standard account.
*/