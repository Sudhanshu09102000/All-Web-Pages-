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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Freedom_Struggle · 20 concept pages (+ overview) · 54 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🕊️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Freedom Struggle (1927 to 1939)",
    thumb: {
      image: "images/General_Awareness/Modern_India/Freedom_Struggle/thumbnail.png",
      banner: "MODERN INDIA 2026",
      line1: "FREEDOM",
      line2: "STRUGGLE",
      line3: "SIMON TO DANDI",
      badge: "FULL CLASS",
      ribbon: "DATES • PACTS • MARCHES",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Freedom Struggle Complete | Simon Commission to Tripuri Crisis | SSC CGL",
      altTitles: ["Dandi March, Salt Satyagraha and Round Table Conferences in One Class", "Simon Commission, Nehru Report, Lahore Session Explained Simply"],
      description: "Freedom Struggle is a high-scoring chapter in Staff Selection Commission papers. In this class we study the Simon Commission, Dandi March, Round Table Conferences, Poona Pact, the Act of 1935, Congress ministries and the Tripuri Crisis, step by step, in very simple words.\n\n📌 IN THIS CLASS\n✅ Simon Commission 1927\n✅ Nehru Report 1928 and Fourteen Points\n✅ Purna Swaraj 1929\n✅ Civil Disobedience Movement\n✅ First and Second Round Table Conferences\n✅ Poona Pact, Harijan work and the Act of 1935\n✅ Provincial elections and Tripuri Crisis\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernIndia #FreedomStruggle",
      tags: ["freedom struggle", "simon commission", "nehru report 1928", "jinnah fourteen points", "purna swaraj lahore session", "civil disobedience movement", "dandi march", "salt satyagraha", "round table conference", "gandhi irwin pact", "modern india history", "ssc cgl history", "history for ssc", "static gk", "general awareness", "indian national movement", "railway ntpc history", "banking exams gk", "modern india one shot", "important dates modern india", "poona pact", "communal award", "tripuri crisis", "provincial elections 1937", "Freedom Strugg"],
      hashtags: ["SSCCGL", "ModernIndia", "FreedomStruggle"],
      thumbText: "FREEDOM STRUGGLE PART 1",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Freedom Struggle Part 1, from Simon Commission to the Gandhi–Irwin Pact. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the national movement from the Simon Commission to the Congress ministries and the left</u>. We learn the commissions, reports, marches, pacts and parties in the order in which they happened.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>20</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>54</b><span>Questions</span></div>
        <div class="cp-stat"><b>~94 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Simon Commission and Nehru Report</b><br>Why an all-British commission was sent, and India's own draft constitution.</li>
        <li><b>Jinnah's Fourteen Points and the Lahore Session</b><br>The Muslim League's reply and the demand for complete independence.</li>
        <li><b>Civil Disobedience Movement</b><br>The Dandi March, the spread of the movement and its appraisal.</li>
        <li><b>Round Table Conferences and the Gandhi–Irwin Pact</b><br>Talks in London and the agreement of 5 March 1931.</li>
        <li><b>Communal Award, Poona Pact and the Act of 1935</b><br>Separate electorates, Gandhi's fast and the new constitution.</li>
        <li><b>Harijan Programme and Provincial Elections</b><br>Gandhi's work for the Depressed Classes, and the Congress ministries of 1937 to 1939.</li>
        <li><b>Tripuri Crisis, the Left and Labour</b><br>Subhas Chandra Bose and Gandhi, socialists, communists and trade unions.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Staff Selection Commission papers ask direct questions on dates, names, places and agreements from this chapter every year.</div>
    `
  },
  2: {
    type: "concept", icon: "🕶️", accent: "#ef4444", pauseTimer: true,
    title: "Simon Commission (1927)",
    html: `
      <p class="cp-lead">The Government of India Act, 1919, promised a review after ten years. <u>In 1927 the British sent a commission with no Indian member, and the whole country was angry.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/1.png" alt="Simon Commission Go Back protest 1928 photo" data-caption="Indians holding black flags and shouting against the Simon Commission in 1928." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/2.png" alt="Lala Lajpat Rai Simon Commission lathi charge photo" data-caption="Lala Lajpat Rai leading the Lahore protest against the Simon Commission." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/3.png" alt="Timeline: 8 Nov 1927 commission appointed; 27 Dec 1927 Madras boycott; 3 Feb 1928 Bombay a" data-caption="Main dates of the Simon Commission in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Conservative Government appointed the seven-member British Statutory Commission on <b>8 November 1927</b>, two years early, because it feared that a Labour Government would name members friendly to India. The Secretary of State was <b>Lord Birkenhead</b>, and the chairman was <b>Sir John Simon</b>. All seven members were British, so it was called the <b>White Commission</b>.</p>
      <p class="cp-lead">The commission visited India twice, in 1928 and 1929, and its report came in <b>May 1930</b>. It advised ending Diarchy, giving maximum provincial autonomy, separating Burma and spreading the vote, but it gave no Indian a place at the Centre and kept separate electorates.</p>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Appointed</td><td>8 November 1927</td></tr><tr><td>Chairman</td><td>Sir John Simon</td></tr><tr><td>Members</td><td>Seven, all British</td></tr><tr><td>Reached Bombay</td><td>3 February 1928</td></tr><tr><td>Boycott resolution</td><td>Madras session of Congress, 27 December 1927, president M. A. Ansari</td></tr><tr><td>Slogan</td><td>'Simon, Go Back', coined by Yusuf Meherali</td></tr><tr><td>Report</td><td>May 1930</td></tr></tbody></table>
      <p class="cp-lead">Congress, the Liberal Federation, the Hindu Mahasabha and the group of Jinnah boycotted the commission. The Shafi group of the Muslim League, the Justice Party and the Unionist Party of Punjab did not oppose it.</p>
      <p class="cp-lead">At Lahore on 30 October 1928, Lala Lajpat Rai was hit during a lathi charge ordered by Superintendent James A. Scott, and he died on 17 November 1928. To take revenge, Bhagat Singh and Rajguru, with Sukhdev, shot John Saunders by mistake on <b>17 December 1928</b>, and the three were hanged on 23 March 1931.</p>
      <div class="cp-note tip">Lord Birkenhead challenged Indians to frame a constitution acceptable to all parties. That challenge produced the Nehru Report.</div>
      <div class="cp-note trap">The Madras boycott was in December 1927, but the commission landed at Bombay in February 1928. Do not swap them.</div>
    `
  },
  3: {
    questext: "Who was the chairman of the Simon Commission?",
    options: ["Lord Birkenhead", "Sir John Simon", "Lord Irwin", "Clement Attlee"],
    correct: "2",
    exptext: "✅ Sir John Simon chaired the seven-member commission, which is why it is named after him. 📌 The name of the commission is the name of its chairman. ❌ Lord Birkenhead is tempting because he was the Secretary of State who appointed it."
  },
  4: {
    questext: "The slogan 'Simon, Go Back' was coined by whom?",
    options: ["Lala Lajpat Rai", "Subhas Chandra Bose", "Jawaharlal Nehru", "Yusuf Meherali"],
    correct: "4",
    exptext: "✅ Yusuf Meherali of Bombay coined the slogan in 1928. 📌 Meherali shouted it on the Bombay shore. ❌ Lajpat Rai is tempting because he led the Lahore protest, but he did not coin the words."
  },
  5: {
    questext: "Which Congress session voted to boycott the Simon Commission?",
    options: ["Lahore session, 1929", "Madras session, 1927", "Calcutta session, 1928", "Karachi session, 1931"],
    correct: "2",
    exptext: "✅ The Madras session of December 1927, under M. A. Ansari, voted for the boycott. 📌 Boycott came in Madras, before the commission arrived. ❌ Calcutta 1928 is tempting but that session dealt with the Nehru Report."
  },
  6: {
    questext: "Consider the following statements about the Simon Commission:\n1. All its seven members were British.\n2. It was appointed in 1927, two years before the date fixed in the Act of 1919.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. The Act of 1919 promised a review after ten years, but the commission came in 1927. 📌 White Commission, early commission. ❌ Only one is a tempting answer but both facts are standard."
  },
  7: {
    type: "concept", icon: "📜", accent: "#f97316", pauseTimer: true,
    title: "Nehru Report (1928)",
    html: `
      <p class="cp-lead">Lord Birkenhead had challenged Indians to write a constitution that all parties could accept. <u>The Nehru Report was India's answer to that challenge.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/4.png" alt="Motilal Nehru portrait photo" data-caption="Motilal Nehru, who headed the committee that drew up the Nehru Report." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/5.png" alt="Flow: Birkenhead's challenge, All-Party Conference at Delhi, Bombay committee under Motila" data-caption="How the Nehru Report was prepared, step by step." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The first All-Party Conference met at Delhi in <b>February 1928</b> and asked for fully responsible government. The second met at Bombay in May 1928 and formed an <b>eight-member committee under Motilal Nehru</b>. Its members were Tej Bahadur Sapru, Subhash Chandra Bose, M. S. Aney, Mangal Singh, Ali Imam, G. R. Pradhan and Shoaib Qureshi. The report came in <b>August 1928</b>.</p>
      <table><thead><tr><th>Recommendation</th><th>Detail</th></tr></thead><tbody><tr><td>Status</td><td>Dominion Status</td></tr><tr><td>State</td><td>Secular state</td></tr><tr><td>Rights</td><td>19 Fundamental Rights, equal rights for women, trade unions, universal adult suffrage</td></tr><tr><td>Government</td><td>Federation, a central legislature of two houses, Cabinet answerable to the House</td></tr><tr><td>Electorates</td><td>No separate electorates</td></tr><tr><td>Provinces</td><td>Linguistic provinces; Sindh separated from Bombay; the North-West Frontier Province given equal status</td></tr><tr><td>Courts</td><td>A Supreme Court and a Public Service Commission</td></tr></tbody></table>
      <p class="cp-lead">The Nehru Report said that minorities should get reserved seats of up to 10 percent in the central legislature, but there should be no separate electorates. The Governor-General was only a constitutional head.</p>
      <p class="cp-lead">Subhas Chandra Bose, Jawaharlal Nehru and Satyamurti wanted full independence instead of Dominion Status. The Calcutta Session of 1928 did not accept their view, so they founded the <b>All India Independence League</b> in 1928.</p>
      <div class="cp-note trap">The Nehru Report asked for Dominion Status, but Congress demanded Purna Swaraj in Lahore in 1929. Do not mix them.</div>
    `
  },
  8: {
    questext: "Who was the chairman of the committee that drew up the Nehru Report?",
    options: ["Jawaharlal Nehru", "Tej Bahadur Sapru", "Subhas Chandra Bose", "Motilal Nehru"],
    correct: "4",
    exptext: "✅ Motilal Nehru headed the committee. 📌 Motilal is the father, Jawaharlal is the son. ❌ Jawaharlal Nehru is tempting because of the name, but he was only secretary, and he wanted full independence."
  },
  9: {
    questext: "The Nehru Report of 1928 recommended which form of status for India?",
    options: ["Complete independence", "Colony status", "Dominion Status", "Princely rule"],
    correct: "3",
    exptext: "✅ It asked for Dominion Status, with 19 fundamental rights and no separate electorates. 📌 Nehru Report equals Dominion, Lahore equals Purna Swaraj. ❌ Complete independence is tempting but that came a year later."
  },
  10: {
    questext: "Consider the following statements about the Nehru Report:\n1. It rejected separate electorates.\n2. It was prepared before the Simon Commission was appointed.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 No separate electorates. ❌ Statement 2 is wrong because the Simon Commission came in November 1927, and the Nehru Report came in August 1928."
  },
  11: {
    type: "concept", icon: "🌙", accent: "#10b981", pauseTimer: true,
    title: "Jinnah's Fourteen Points (1929)",
    html: `
      <p class="cp-lead">Muslim leaders were not satisfied with the Nehru Report. <u>Muhammad Ali Jinnah replied with the Fourteen Points in March 1929.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/6.png" alt="Muhammad Ali Jinnah young portrait photo" data-caption="Muhammad Ali Jinnah, who put forward the Fourteen Points in March 1929." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/7.png" alt="Chart: left box Congress ultimatum; centre box All-Parties Conference Calcutta December 19" data-caption="The steps that led to Jinnah's Fourteen Points." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Congress gave an ultimatum to accept the Nehru Report by 31 December 1929, or face a popular movement. At the <b>All-Parties Conference, Calcutta, December 1928</b>, Jinnah asked for four changes: <b>separate electorates</b>, <b>one-third seats</b> for Muslims in the central legislature, reservation in Bengal and Punjab by population until adult suffrage, and <b>residual powers to provinces</b>.</p>
      <p class="cp-lead">His proposals were refused, so he joined the Shafi faction and gave the <b>Fourteen Points</b>.</p>
      <table><thead><tr><th>Demand</th><th>Detail</th></tr></thead><tbody><tr><td>Constitution</td><td>Federal, with residual powers to provinces</td></tr><tr><td>Electorates</td><td>Separate electorates</td></tr><tr><td>Provinces</td><td>Provincial autonomy; Sindh to be separated</td></tr><tr><td>Seats</td><td>One-third in the central and provincial cabinets and legislature</td></tr><tr><td>Majority</td><td>Muslim majorities in Punjab, Bengal and North-West Frontier Province not to be cut</td></tr><tr><td>Reforms</td><td>Reforms for North-West Frontier Province and Baluchistan</td></tr><tr><td>Rights</td><td>Religion, culture, education and language to be protected</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse the four amendments of December 1928 with the Fourteen Points of March 1929. The first came before the second.</div>
    `
  },
  12: {
    questext: "Jinnah's Fourteen Points were put forward in which year?",
    options: ["1929", "1928", "1930", "1927"],
    correct: "1",
    exptext: "✅ They were issued in March 1929 after his four amendments to the Nehru Report were refused. 📌 Fourteen Points, 1929. ❌ 1928 is tempting because the amendments were moved at Calcutta in December 1928."
  },
  13: {
    questext: "Which was NOT among the Fourteen Points of Jinnah?",
    options: ["Separate electorates", "Joint electorates", "Residual powers to provinces", "Separation of Sindh"],
    correct: "2",
    exptext: "✅ Jinnah demanded separate electorates, not joint ones. 📌 Fourteen Points means separate. ❌ Separation of Sindh is tempting but it was one of his demands."
  },
  14: {
    type: "concept", icon: "🔥", accent: "#8b5cf6", pauseTimer: true,
    title: "Lahore Session and Purna Swaraj (1929)",
    html: `
      <p class="cp-lead">Congress had given the British one year to accept Dominion Status. <u>At Lahore, in December 1929, it said that its goal was complete independence.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/8.png" alt="Lahore Congress session 1929 Ravi flag hoisting photo" data-caption="The tricolour hoisted on the bank of the river Ravi at Lahore in 1929." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/9.png" alt="Jawaharlal Nehru 1929 Lahore Congress president photo" data-caption="Jawaharlal Nehru, president of the Lahore session of Congress in 1929." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Lahore Session of <b>December 1929</b> was held under the president <b>Jawaharlal Nehru</b>. It made <b>Purna Swaraj</b>, or complete independence, the only goal in place of Dominion Status, and the Nehru Report lapsed.</p>
      <p class="cp-lead">At midnight on <b>31 December 1929</b>, on the bank of the river Ravi, the tricolour was hoisted amid the cries Purna Swaraj, Vande Mataram and Inquilab Zindabad. It was decided that <b>26 January</b> would be kept as Independence Day every year, and <b>26 January 1930</b> was kept as the first Purna Swaraj Day. India's Republic Day, 26 January 1950, comes from this choice.</p>
      <p class="cp-lead">The session also decided to start the Civil Disobedience Movement and gave Gandhi the right to fix its time and manner. It also boycotted the First Round Table Conference. On 31 January 1930 Gandhi sent his <b>Eleven Demands</b> to Viceroy Lord Irwin and Prime Minister Ramsay MacDonald in <b>Young India</b>.</p>
      <table><thead><tr><th>Event</th><th>Fact</th></tr></thead><tbody><tr><td>Place</td><td>Lahore, bank of the Ravi</td></tr><tr><td>President</td><td>Jawaharlal Nehru</td></tr><tr><td>Date of tricolour hoisting</td><td>31 December 1929</td></tr><tr><td>First Independence Day</td><td>26 January 1930</td></tr><tr><td>Eleven Demands</td><td>31 January 1930, in Young India</td></tr></tbody></table>
      <div class="cp-note trap">Lahore, 1929, is Purna Swaraj. The Dominion Status demand of the Nehru Report was only a year earlier. Do not mix the two.</div>
    `
  },
  15: {
    questext: "Who presided over the Lahore Session of Congress in 1929?",
    options: ["Motilal Nehru", "Sardar Patel", "Jawaharlal Nehru", "Subhas Chandra Bose"],
    correct: "3",
    exptext: "✅ Jawaharlal Nehru was president at Lahore, where Purna Swaraj became the goal. 📌 Lahore, Nehru, Purna Swaraj. ❌ Motilal Nehru is tempting because he led the report and was president in 1928."
  },
  16: {
    questext: "The tricolour was hoisted at midnight of 31 December 1929 on the bank of which river?",
    options: ["Yamuna", "Sabarmati", "Ganga", "Ravi"],
    correct: "4",
    exptext: "✅ It was hoisted on the bank of the Ravi at Lahore. 📌 Ravi flows at Lahore. ❌ The Sabarmati is tempting because Gandhi's ashram was there, but Lahore stands on the Ravi."
  },
  17: {
    questext: "Which date was kept as the first Purna Swaraj Day?",
    options: ["26 January 1930", "15 August 1930", "12 March 1930", "6 April 1930"],
    correct: "1",
    exptext: "✅ The first Purna Swaraj Day was 26 January 1930. 📌 26 January, later Republic Day. ❌ 12 March is tempting but that is the date of the Dandi March."
  },
  18: {
    type: "concept", icon: "🧂", accent: "#eab308", pauseTimer: true,
    title: "Civil Disobedience Movement (1930): Dandi March",
    html: `
      <p class="cp-lead">Gandhi chose a daily item of every house, salt, to break an unjust law. <u>The Dandi March began the Civil Disobedience Movement.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/10.png" alt="Dandi March 1930 Gandhi walking photo" data-caption="Gandhi and his followers walking on the Dandi March in 1930." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/11.png" alt="Dandi salt pan Gujarat coast photo" data-caption="Gandhi picking up a handful of salt at Dandi on 6 April 1930." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/12.png" alt="Timeline: 12 March 1930 Sabarmati; 5 April Dandi reached; 6 April salt law broken; 240 mil" data-caption="The Dandi March shown as a journey with its key facts." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The causes were the all-white Simon Commission, the ultimatum of 1928 that was ignored, the Great Depression of 1929, the Lahore goal and the rejection of Gandhi's Eleven Demands. When Irwin refused, Gandhi said, <u>I asked for bread and got a stone in return.</u></p>
      <p class="cp-lead">On <b>12 March 1930</b> Gandhi and <b>78 followers</b> marched from Sabarmati Ashram, Ahmedabad, to Dandi, on the coast of Gujarat. The padyatra of <b>240 miles</b> reached Dandi on <b>5 April 1930</b>, and on <b>6 April 1930</b> he broke the salt law by lifting a handful of salt. It is called the <b>Salt Satyagraha</b>.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Start</td><td>12 March 1930, Sabarmati Ashram, Ahmedabad</td></tr><tr><td>Followers</td><td>78</td></tr><tr><td>Distance</td><td>240 miles</td></tr><tr><td>Salt law broken</td><td>6 April 1930, Dandi</td></tr><tr><td>Salt tax</td><td>8.2 percent of the revenue of the Raj</td></tr></tbody></table>
      <p class="cp-lead">Gandhi's directions were to break the salt law, boycott foreign cloth, ask lawyers to leave practice, ask government servants to resign, and keep strictly to truth and non-violence. Subhas Chandra Bose compared the march to Napoleon's march from Elba to Paris.</p>
      <div class="cp-note tip">Salt was chosen because every person, rich or poor, used it, and the salt tax hurt the poor most.</div>
    `
  },
  19: {
    questext: "The Dandi March began from which place?",
    options: ["Champaran", "Bardoli", "Sabarmati Ashram, Ahmedabad", "Wardha"],
    correct: "3",
    exptext: "✅ The march began from Sabarmati Ashram, Ahmedabad, on 12 March 1930. 📌 Sabarmati is the start, Dandi is the end. ❌ Wardha is tempting because Gandhi lived there later."
  },
  20: {
    questext: "On which date did Gandhi break the salt law at Dandi?",
    options: ["12 March 1930", "6 April 1930", "26 January 1930", "5 April 1930"],
    correct: "2",
    exptext: "✅ Gandhi lifted salt on 6 April 1930, a day after reaching Dandi. 📌 Reached on the 5th, broke on the 6th. ❌ 12 March is tempting because it is the start date of the march."
  },
  21: {
    questext: "How many followers walked with Gandhi on the Dandi March?",
    options: ["72", "87", "82", "78"],
    correct: "4",
    exptext: "✅ Seventy-eight followers started the march. 📌 Seven eight, like a straight line of walkers. ❌ 72 is tempting because it looks close, but 78 is the figure."
  },
  22: {
    type: "concept", icon: "🚩", accent: "#14b8a6", pauseTimer: true,
    title: "Civil Disobedience Movement (1930): Spread and Programme",
    html: `
      <p class="cp-lead">After Dandi, the movement spread across India in many forms. <u>It drew women, students and merchants as never before.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/13.png" alt="Dharasana Salt Works satyagraha 1930 photo" data-caption="Volunteers at the Dharasana Salt Works in 1930." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/14.png" alt="Khan Abdul Ghaffar Khan Khudai Khidmatgar photo" data-caption="Khan Abdul Ghaffar Khan, called Frontier Gandhi, with his Red Shirts." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/15.png" alt="Rani Gaidinliu portrait photo" data-caption="Rani Gaidinliu, the young Naga woman called Rani by Nehru." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Region</th><th>Leader and event</th></tr></thead><tbody><tr><td>Tamil Nadu</td><td>C. Rajagopalachari, march from Trichy to Vedaranyam</td></tr><tr><td>Malabar</td><td>K. Kelappan, march from Calicut to Payyanur</td></tr><tr><td>Andhra Pradesh</td><td>Shivirams as bases</td></tr><tr><td>Dharasana</td><td>Sarojini Naidu, Manilal Gandhi and Imam Saheb led the raid on the salt works</td></tr><tr><td>North-West Frontier Province</td><td>Khan Abdul Ghaffar Khan, Red Shirts (Khudai Khidmatgar)</td></tr><tr><td>North-East</td><td>Rani Gaidinliu, aged thirteen</td></tr></tbody></table>
      <p class="cp-lead">The movement was strongest at <b>Dharasana Salt Works</b>, Gujarat, where thousands courted arrest. Another attempt ran from Sylhet in Assam to Noakhali in Bengal. In the North-West Frontier Province, <b>Khan Abdul Ghaffar Khan</b>, called the <b>Frontier Gandhi</b>, led the Khudai Khidmatgar, or Red Shirts, and published the magazine <b>Pakhtoon</b>. The Garhwal Regiment at Peshawar refused to fire on the crowd.</p>
      <p class="cp-lead">The social base was unprecedented: women and capitalists took part. Peasants took part less than in Non-Cooperation, and Muslims took part less outside the North-West. The Government used ordinances and press censorship, and in <b>July 1930</b> offered a Round Table Conference with Dominion Status.</p>
      <table><thead><tr><th>Gandhi's Eleven Demands</th><th>Programme of the movement</th></tr></thead><tbody><tr><td>Cut military spending and top salaries by 50 percent</td><td>Boycott of government-aided schools and offices</td></tr><tr><td>Pass the Postal Reservation Bill</td><td>Boycott of courts by lawyers</td></tr><tr><td>Complete prohibition of alcohol</td><td>Non-payment of taxes</td></tr><tr><td>Release political prisoners</td><td>Violation of unjust laws</td></tr><tr><td>Reform the Criminal Intelligence Department</td><td>Bonfires of foreign goods</td></tr><tr><td>Arms law licences for self-defence</td><td>Picketing of liquor shops</td></tr><tr><td>Rupee-sterling ratio of 1 shilling 4 pence</td><td>Protest marches</td></tr><tr><td>Protection of the textile industry</td><td>Non-payment of rent and revenue by farmers</td></tr><tr><td>Reserve coastal trade for Indians</td><td>Land tax cut</td></tr><tr><td>Salt tax and monopoly ended</td><td>Under council control</td></tr></tbody></table>
      <div class="cp-note trap">The Frontier Gandhi (Khan Abdul Ghaffar Khan) and Gandhi's own march were different events in different places.</div>
    `
  },
  23: {
    questext: "Who was known as the Frontier Gandhi?",
    options: ["Maulana Azad", "Khan Abdul Ghaffar Khan", "Hakim Ajmal Khan", "Syed Ahmad Khan"],
    correct: "2",
    exptext: "✅ Khan Abdul Ghaffar Khan led the Red Shirts in the North-West Frontier Province. 📌 Frontier equals Ghaffar Khan. ❌ Maulana Azad is tempting but he was a Congress leader in Bengal and Delhi."
  },
  24: {
    questext: "The Salt Satyagraha of Tamil Nadu under C. Rajagopalachari ended at which place?",
    options: ["Vedaranyam", "Dharasana", "Payyanur", "Noakhali"],
    correct: "1",
    exptext: "✅ Rajagopalachari marched from Trichy to Vedaranyam on the Tanjore coast. 📌 R for Rajagopalachari, V for the road. ❌ Payyanur is tempting but that was the Malabar march of K. Kelappan."
  },
  25: {
    questext: "Which woman, aged thirteen, joined the movement in the North-East and was titled Rani by Nehru?",
    options: ["Sarojini Naidu", "Kasturba Gandhi", "Rani Gaidinliu", "Aruna Asaf Ali"],
    correct: "3",
    exptext: "✅ Rani Gaidinliu was a young Naga woman. 📌 Rani is her title. ❌ Sarojini Naidu is tempting because she led at Dharasana, but she was not a teenager."
  },
  26: {
    type: "concept", icon: "🏛️", accent: "#0ea5e9", pauseTimer: true,
    title: "First Round Table Conference (1930)",
    html: `
      <p class="cp-lead">The British called Indian leaders to London to talk as equals. <u>Congress did not go, so the conference failed.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/16.png" alt="First Round Table Conference 1930 London group photo" data-caption="Delegates at the First Round Table Conference in London, 1930." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/17.png" alt="B. R. Ambedkar portrait photo 1930" data-caption="Bhimrao Ramji Ambedkar, who demanded separate electorates at the conference." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The conference ran from <b>12 November 1930 to 19 January 1931</b> in London. It was the <b>first conference of British and Indians as equals</b>, opened by Lord Irwin and chaired by Prime Minister <b>Ramsay MacDonald</b>, with <b>89 delegates</b>. Congress and the business leaders boycotted it. The Muslim League, Hindu Mahasabha, Liberals and Princes attended.</p>
      <table><thead><tr><th>Group</th><th>Delegates</th></tr></thead><tbody><tr><td>Hindu Mahasabha</td><td>M. R. Jayakar, B. S. Moonje</td></tr><tr><td>Liberals</td><td>C. Y. Chintamani, Tej Bahadur Sapru</td></tr><tr><td>Muslim League</td><td>Aga Khan, Muhammad Shafi, M. A. Jinnah, Fazlul Haq</td></tr><tr><td>Sikhs</td><td>Sardar Sampuran Singh</td></tr><tr><td>Anglo-Indians</td><td>K. T. Paul</td></tr><tr><td>Depressed Classes</td><td>Ambedkar</td></tr><tr><td>Princes</td><td>16</td></tr></tbody></table>
      <p class="cp-lead">The outcome was largely a failure. <b>Ambedkar</b> demanded separate electorates for the Depressed Classes. Tej Bahadur Sapru suggested an <b>All-India Federation</b>, which the Princes accepted if their internal sovereignty was kept, and the Muslim League supported it against a strong Centre. Britain conceded provincial representative government.</p>
      <div class="cp-note trap">Congress did not attend the First Round Table Conference, and Gandhi alone attended the Second.</div>
    `
  },
  27: {
    questext: "How many delegates attended the First Round Table Conference?",
    options: ["46", "16", "112", "89"],
    correct: "4",
    exptext: "✅ Eighty-nine delegates attended, and Ramsay MacDonald chaired it. 📌 89 in the first, one in the second, 46 in the third. ❌ 46 is tempting because it was the number in the third conference."
  },
  28: {
    questext: "Who suggested an All-India Federation at the First Round Table Conference?",
    options: ["Ambedkar", "Tej Bahadur Sapru", "Jinnah", "Aga Khan"],
    correct: "2",
    exptext: "✅ Tej Bahadur Sapru suggested it, and the Princes agreed if their internal sovereignty was kept. 📌 Sapru, federation. ❌ Ambedkar is tempting but he asked for separate electorates."
  },
  29: {
    questext: "Consider the following statements about the First Round Table Conference:\n1. It was presided by Ramsay MacDonald.\n2. Congress took part in it.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Congress did not attend. ❌ Statement 2 is wrong because Congress boycotted the conference, as decided at Lahore."
  },
  30: {
    type: "concept", icon: "🤝", accent: "#ec4899", pauseTimer: true,
    title: "Gandhi–Irwin Pact (5 March 1931)",
    html: `
      <p class="cp-lead">After the failure of the First Round Table Conference, the Government wanted Congress to join. <u>The Gandhi–Irwin Pact put Congress on an equal footing with the Government.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/18.png" alt="Gandhi Irwin Pact March 1931 photo" data-caption="Gandhi leaving the Viceroy's house in Delhi after the talks with Lord Irwin." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/19.png" alt="Karachi Congress session 1931 Vallabhbhai Patel photo" data-caption="Sardar Vallabhbhai Patel, president of the Karachi session of Congress in 1931." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The pact is also called the <b>Delhi Pact</b>. The Liberals Tej Bahadur Sapru and M. R. Jayakar brought Gandhi to Viceroy <b>Lord Irwin</b>, and talks began on 17 February 1931. The pact was signed on <b>5 March 1931</b>. Sarojini Naidu called it the <b>union of two Mahatmas</b>.</p>
      <table><thead><tr><th>The Government agreed to</th><th>Congress agreed to</th></tr></thead><tbody><tr><td>Release political prisoners not convicted of violence</td><td>Suspend the Civil Disobedience Movement</td></tr><tr><td>Remit fines and return unsold lands</td><td>Attend the next Round Table Conference</td></tr><tr><td>Show leniency to resigned officials</td><td>Talk on federation, Indian responsibility and minority safeguards</td></tr><tr><td>Allow salt-making in coastal villages for personal use</td><td>Not boycott British goods</td></tr><tr><td>Allow peaceful picketing</td><td>Stop its protests</td></tr><tr><td>Withdraw emergency ordinances</td><td>—</td></tr></tbody></table>
      <p class="cp-lead">The Government did not accept an inquiry into police excesses and did not review the death sentences of Bhagat Singh, Sukhdev and Rajguru. Nehru and Bose attacked the compromise, since it did not mention Purna Swaraj.</p>
      <p class="cp-lead">At <b>Karachi in March 1931</b>, under president <b>Sardar Vallabhbhai Patel</b>, Congress accepted the pact, and passed the first resolutions on fundamental rights and the national economic programme. K. M. Munshi called it an epoch-making event. Young men showed Gandhi black flags over the hanging of Bhagat Singh. Gandhi said, <u>Gandhi may die, but Gandhism cannot.</u></p>
      <div class="cp-note trap">The pact was signed on 5 March 1931, the hangings were on 23 March 1931, and the Karachi session came after both.</div>
    `
  },
  31: {
    questext: "The Gandhi–Irwin Pact is also known as which pact?",
    options: ["Delhi Pact", "Lucknow Pact", "Poona Pact", "Lahore Pact"],
    correct: "1",
    exptext: "✅ It is called the Delhi Pact because it was signed in Delhi. 📌 Irwin was in Delhi. ❌ The Poona Pact is tempting because it also involved Gandhi, but it was with Ambedkar in 1932."
  },
  32: {
    questext: "Who presided over the Karachi session of Congress in March 1931?",
    options: ["Jawaharlal Nehru", "Rajendra Prasad", "Sardar Vallabhbhai Patel", "Subhas Chandra Bose"],
    correct: "3",
    exptext: "✅ Vallabhbhai Patel was president at Karachi, where fundamental rights were adopted. 📌 Karachi, K for Patel. ❌ Jawaharlal Nehru is tempting because he presided at Lahore."
  },
  33: {
    questext: "Which of the following was NOT a term of the Gandhi–Irwin Pact?",
    options: ["Release of political prisoners", "Salt making for personal use", "Suspension of Civil Disobedience", "Inquiry into police excesses"],
    correct: "4",
    exptext: "✅ The Government refused an inquiry into police excesses. 📌 Police went free. ❌ Release of prisoners is tempting but the Government accepted that."
  },
  34: {
    type: "concept", icon: "🚢", accent: "#f43f5e", pauseTimer: true,
    title: "Second Round Table Conference (1931)",
    html: `
      <p class="cp-lead">Gandhi went to London alone as the sole voice of Congress. <u>He came back empty-handed.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/20.png" alt="Gandhi Second Round Table Conference 1931 London photo" data-caption="Gandhi in London during the Second Round Table Conference in 1931." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/21.png" alt="Flow: Rajputana ship, London, demands, deadlock, return to Bombay 28 December 1931." data-caption="The path of the Second Round Table Conference, from sailing to return." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The conference was held from <b>7 September to 1 December 1931</b> at St. James Palace, London. Under the Delhi Pact, Congress attended, and <b>Gandhi alone</b> represented it. Ramsay MacDonald was Prime Minister, Samuel Hoare was Secretary of State and Willingdon was Viceroy. Gandhi sailed on the ship Rajputana, with Mahadev Desai, Madan Mohan Malaviya, Devdas Gandhi, G. D. Birla, Mira Behn and Sarojini Naidu.</p>
      <p class="cp-lead">His demands were responsible government at the Centre and in the provinces, and recognition that Congress alone represented India. He said that Untouchables were Hindus, not a minority, and that there should be no separate electorates.</p>
      <p class="cp-lead"><b>Failure</b>: the Right Wing under Winston Churchill, who called Gandhi a <b>half-naked fakir</b>, refused to accept Congress as an equal. The Conservative cabinet was dominated by the Right, the Secretary of State was weak, and the minorities question caused a deadlock, since Muslims, Depressed Classes, Christians and Anglo-Indians all wanted separate electorates. Nothing was conceded on freedom.</p>
      <p class="cp-lead">On <b>28 December 1931</b> Gandhi reached Bombay and said, <u>I have returned empty-handed.</u> Willingdon refused to meet him, the Pact was buried, and the Congress Working Committee decided on the Second Civil Disobedience Movement on <b>29 December 1931</b>.</p>
      <div class="cp-note trap">The First Round Table Conference had 89 delegates and no Congress. The Second had Gandhi alone. Do not mix them.</div>
    `
  },
  35: {
    questext: "Who represented Congress alone at the Second Round Table Conference?",
    options: ["Mahatma Gandhi", "Sarojini Naidu", "Jawaharlal Nehru", "Madan Mohan Malaviya"],
    correct: "1",
    exptext: "✅ Gandhi was the only Congress representative in London. 📌 Alone means Gandhi. ❌ Sarojini Naidu is tempting because she travelled with him, but she was invited separately."
  },
  36: {
    questext: "Which British leader called Gandhi a 'half-naked fakir'?",
    options: ["Lord Irwin", "Winston Churchill", "Samuel Hoare", "Ramsay MacDonald"],
    correct: "2",
    exptext: "✅ Winston Churchill said it in disgust at Gandhi's simple dress. 📌 Churchill, fakir. ❌ Ramsay MacDonald is tempting because he chaired the conference."
  },
  37: {
    questext: "The Second Round Table Conference was held in which year?",
    options: ["1930", "1932", "1931", "1933"],
    correct: "3",
    exptext: "✅ It was held from 7 September to 1 December 1931. 📌 The Delhi Pact and the second conference are both 1931. ❌ 1932 is tempting because that was the third conference."
  },
  38: {
    type: "concept", icon: "⛓️", accent: "#84cc16", pauseTimer: true,
    title: "Civil Disobedience Movement (1932–34): Second Phase",
    html: `
      <p class="cp-lead">Gandhi came back from London to a Government that was ready to crush the movement. <u>Congress restarted the movement in January 1932.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/22.png" alt="Gandhi arrested Yerwada 1932 photo" data-caption="Yerwada Jail in Poona, where Gandhi was held in 1932." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/23.png" alt="Timeline: Jan 1932 restart; 1 lakh arrests in six months; April 1934 movement withdrawn." data-caption="The second phase of the Civil Disobedience Movement in time order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Willingdon disowned many terms of the pact, and Gandhi restarted the movement in <b>January 1932</b>. Congress was declared illegal, and Gandhi, Nehru, Patel and Khan Abdul Ghaffar Khan were arrested. More than <b>1 lakh</b> people were arrested in six months, and property was confiscated.</p>
      <p class="cp-lead">In the United Provinces there was non-payment of land revenue, and Red Shirts were active in the North-West Frontier Province. Willingdon called Gandhi the Mussolini of India. At its peak Ramsay MacDonald announced the Communal Award, and Gandhi postponed the movement in April 1934.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Restart</td><td>January 1932</td></tr><tr><td>Leaders arrested</td><td>Gandhi, Nehru, Patel, Khan Abdul Ghaffar Khan</td></tr><tr><td>Arrests</td><td>More than 1 lakh in six months</td></tr><tr><td>Viceroy</td><td>Willingdon</td></tr><tr><td>Withdrawn</td><td>April 1934</td></tr></tbody></table>
      <div class="cp-note trap">The first phase began in March 1930, the second in January 1932. Do not mix the dates.</div>
    `
  },
  39: {
    questext: "Who was the Viceroy when the Civil Disobedience Movement restarted in January 1932?",
    options: ["Lord Irwin", "Lord Linlithgow", "Lord Wavell", "Lord Willingdon"],
    correct: "4",
    exptext: "✅ Lord Willingdon was the Viceroy and he refused to meet Gandhi. 📌 W for Willingdon, W for the withdrawal of the pact. ❌ Lord Irwin is tempting because he signed the pact, but he was no longer the Viceroy."
  },
  40: {
    questext: "The Civil Disobedience Movement was finally withdrawn in which year?",
    options: ["1934", "1933", "1932", "1935"],
    correct: "1",
    exptext: "✅ Gandhi withdrew the movement in April 1934. 📌 Began 1930, ended 1934. ❌ 1933 is tempting because individual satyagraha was launched in August 1933."
  },
  41: {
    type: "concept", icon: "⚖️", accent: "#06b6d4", pauseTimer: true,
    title: "Communal Award (16 August 1932)",
    html: `
      <p class="cp-lead">After the Round Table Conferences failed to settle the minority question, the British Prime Minister gave his own decision. <u>It was called the Communal Award.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/24.png" alt="Ramsay MacDonald prime minister portrait photo" data-caption="Ramsay MacDonald, the British Prime Minister who announced the Communal Award." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/25.png" alt="Chart: centre box Communal Award; branches Muslims, Sikhs, Christians, Anglo-Indians, Euro" data-caption="The groups given separate electorates under the Communal Award." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Ramsay MacDonald's Award</b> gave separate electorates to Muslims, Sikhs, Christians, Anglo-Indians and Europeans. It also gave special constituencies to the <b>Depressed Classes</b>, communal constituencies for <b>women</b> in all provinces except the North-West Frontier Province, and seven seats for the Marathas.</p>
      <p class="cp-lead"><b>Gandhi objected</b>. He said that it attacked Indian unity and harmed Hinduism and the Depressed Classes, because a separate political body would weaken the fight against untouchability. He wanted a <b>joint electorate</b>, and did not object to more reserved seats. He began a fast unto death on <b>20 September 1932</b>.</p>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Date</td><td>16 August 1932</td></tr><tr><td>Announced by</td><td>Ramsay MacDonald</td></tr><tr><td>Gandhi's reaction</td><td>Fast unto death from 20 September 1932 at Yerwada Jail</td></tr><tr><td>Gandhi's demand</td><td>Joint electorate with reserved seats</td></tr></tbody></table>
      <div class="cp-note trap">The Communal Award was on 16 August 1932, the fast began on 20 September 1932, and the Poona Pact came on 26 September 1932.</div>
    `
  },
  42: {
    questext: "Who announced the Communal Award of 1932?",
    options: ["Samuel Hoare", "Ramsay MacDonald", "Lord Willingdon", "Winston Churchill"],
    correct: "2",
    exptext: "✅ Prime Minister Ramsay MacDonald announced it on 16 August 1932. 📌 MacDonald's Award. ❌ Willingdon is tempting because he was the Viceroy then, but the decision was the Prime Minister's."
  },
  43: {
    questext: "Why did Gandhi oppose the Communal Award?",
    options: ["It gave too few seats to Muslims", "It ended the Round Table Conference", "It gave separate electorates to the Depressed Classes", "It removed the Viceroy"],
    correct: "3",
    exptext: "✅ Gandhi feared that a separate political body would weaken the fight against untouchability. 📌 Joint, not separate. ❌ Seats for Muslims is tempting but Gandhi did not argue on that."
  },
  44: {
    type: "concept", icon: "🤲", accent: "#a16207", pauseTimer: true,
    title: "Poona Pact (26 September 1932)",
    html: `
      <p class="cp-lead">Gandhi's fast could have cost him his life. <u>The Poona Pact saved him and settled the question of the Depressed Classes.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/26.png" alt="Yerwada Jail Pune Gandhi fast 1932 photo" data-caption="Yerwada Jail in Pune, where Gandhi fasted in September 1932." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/27.png" alt="Poona Pact 1932 Ambedkar Gandhi photo" data-caption="Bhimrao Ramji Ambedkar, who signed the Poona Pact with Gandhi's followers in 1932." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/28.png" alt="Bar picture: provincial seats for Depressed Classes 71 in the Award and 147 in the Pact; c" data-caption="Seats for the Depressed Classes: 71 under the Award and 147 under the Pact." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>fast unto death</b> began in Yerwada Jail on <b>20 September 1932</b>. Rabindranath Tagore said, <u>This is a great sacrifice for the unity of India and its social integrity.</u> The pact was signed by Ambedkar and the leaders Madan Mohan Malaviya, Rajendra Prasad, Purushottam Das Tandon and C. Rajagopalachari on <b>26 September 1932</b>.</p>
      <table><thead><tr><th>Provision</th><th>Detail</th></tr></thead><tbody><tr><td>Electorate</td><td>Joint electorate with reserved seats</td></tr><tr><td>Provincial seats</td><td>Depressed Classes seats raised from 71 to 147</td></tr><tr><td>Central seats</td><td>18 percent of the Central Legislature</td></tr><tr><td>Result</td><td>Ambedkar dropped separate electorates</td></tr></tbody></table>
      <p class="cp-lead">Because Gandhi accepted an amendment to the Award and Ambedkar gave up separate electorates, Gandhi probably saved the country from a partition on caste lines.</p>
      <div class="cp-note trap">Do not swap the numbers: the Award gave 71 seats and the Poona Pact raised them to 147.</div>
    `
  },
  45: {
    questext: "The Poona Pact was signed between Gandhi's followers and whom?",
    options: ["Jinnah", "M. R. Jayakar", "Tej Bahadur Sapru", "B. R. Ambedkar"],
    correct: "4",
    exptext: "✅ Ambedkar signed on behalf of the Depressed Classes. 📌 Poona, Ambedkar. ❌ Jayakar is tempting because he helped arrange the Delhi Pact in 1931."
  },
  46: {
    questext: "Under the Poona Pact, how many seats were reserved for the Depressed Classes in provincial legislatures?",
    options: ["147", "100", "71", "187"],
    correct: "1",
    exptext: "✅ The seats were raised from 71 to 147. 📌 71 became 147, about double. ❌ 71 is tempting but that was the figure in the Award."
  },
  47: {
    type: "concept", icon: "🏛️", accent: "#64748b", pauseTimer: true,
    title: "Third Round Table Conference and the Government of India Act, 1935",
    html: `
      <p class="cp-lead">The third conference met without Congress and without most big Indian leaders. <u>Yet it led to the Act of 1935, the last big constitutional law before independence.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/29.png" alt="Government of India Act 1935 document photo" data-caption="The Government of India Act of 1935, the last constitutional Act before independence." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/30.png" alt="Reserve Bank of India 1935 old building photo" data-caption="The Reserve Bank of India, founded in 1935 under the new Act." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/31.png" alt="Flow: Third Round Table 1932, White Paper March 1933, Joint Select Committee under Linlith" data-caption="The steps that led to the Government of India Act, 1935." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>Third Round Table Conference</b> ran from 17 November to 24 December 1932 in London with only <b>46 delegates</b>, and Congress stayed away. It led to the <b>White Paper of March 1933</b>, which a Joint Select Committee under <b>Lord Linlithgow</b> studied. On its report Samuel Hoare's bill became the <b>Government of India Act, 1935</b>.</p>
      <table><thead><tr><th>Feature of the Act</th><th>Detail</th></tr></thead><tbody><tr><td>Federation</td><td>An All-India Federation, which was never formed</td></tr><tr><td>Centre</td><td>Dyarchy at the Centre</td></tr><tr><td>Provinces</td><td>Provincial autonomy in 11 provinces</td></tr><tr><td>Courts and bank</td><td>Federal Court (1937); Reserve Bank of India (1935)</td></tr><tr><td>New provinces</td><td>Burma separated; Sindh and Orissa created as provinces in 1936</td></tr></tbody></table>
      <p class="cp-lead">The Civil Disobedience Movement faded with less enthusiasm and firmer repression, and the Communal Award pulled it off course. <b>Individual Satyagraha</b> was launched on 1 August 1933, and by early 1934 the steam was lost. The Bihar earthquake turned Congress to relief work and Gandhi to the Harijans.</p>
      <div class="cp-note trap">The Third Round Table Conference had only 46 delegates, the First had 89, and Gandhi alone was at the Second.</div>
    `
  },
  48: {
    questext: "How many delegates attended the Third Round Table Conference?",
    options: ["16", "89", "46", "112"],
    correct: "3",
    exptext: "✅ Forty-six delegates attended, and most big Indian leaders were absent. 📌 89, one, 46. ❌ 89 is tempting because that was the First."
  },
  49: {
    questext: "Which feature was part of the Government of India Act, 1935?",
    options: ["Dyarchy in the provinces", "Abolition of the Viceroy", "Separate Indian army", "Provincial autonomy"],
    correct: "4",
    exptext: "✅ The Act gave provincial autonomy and put dyarchy at the Centre instead. 📌 Provinces got power, the Centre kept dyarchy. ❌ Dyarchy in provinces is tempting but that was the Act of 1919."
  },
  50: {
    questext: "Which of the following was established under the Government of India Act, 1935?",
    options: ["Imperial Bank", "Reserve Bank of India", "Supreme Court", "Planning Commission"],
    correct: "2",
    exptext: "✅ The Reserve Bank of India was founded in 1935 and the Federal Court in 1937. 📌 Reserve Bank, 1935. ❌ The Supreme Court is tempting but it came with the Constitution in 1950."
  },
  51: {
    type: "concept", icon: "🔎", accent: "#7c3aed", pauseTimer: true,
    title: "Civil Disobedience Movement: Appraisal",
    html: `
      <p class="cp-lead">The movement did not win Purna Swaraj. <u>But it made the demand for complete independence a mass demand.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/32.png" alt="Mind-map: centre Civil Disobedience Movement; branches First nationwide, Princely States r" data-caption="The four chief results of the Civil Disobedience Movement." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/33.png" alt="Tana Bhagat movement Jharkhand photo" data-caption="Members of the Tana Bhagat movement, who joined the national struggle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">It <b>began the struggle for complete independence</b>. Leftists, workers, peasants and tribals took part, including the <b>Tana Bhagats</b> and the <b>Naga movement under Rani Gaidinliu</b>. Jamnalal Bajaj, G. D. Birla and Khan Abdul Ghaffar Khan took part, and students were its backbone.</p>
      <p class="cp-lead">It was the first movement to reach the Princely States and the Praja Mandals, the first nationwide movement, and the longest until then.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Dandi March</td><td>About 385 km in 24 days</td></tr><tr><td>Gandhi's arrest</td><td>Night of 4 and 5 May 1930, at Karadi</td></tr><tr><td>Dharasana raid</td><td>21 May 1930, reported worldwide by the American journalist Webb Miller</td></tr><tr><td>Gandhi's second arrest</td><td>4 January 1932, held in Yerwada Jail</td></tr><tr><td>Indian Central Committee</td><td>Under Sir Sankaran Nair, 1928, worked beside the Simon Commission; the two-volume report is the Simon Report</td></tr></tbody></table>
      <div class="cp-note trap">The Dandi March was in March and April 1930, but the Dharasana raid came later, on 21 May 1930.</div>
    `
  },
  52: {
    questext: "Who reported the Dharasana raid to the world?",
    options: ["Louis Fischer", "Webb Miller", "Edwin Montagu", "William Digby"],
    correct: "2",
    exptext: "✅ The American journalist Webb Miller reported the raid of 21 May 1930. 📌 Miller, Dharasana. ❌ Louis Fischer is tempting because he wrote about Gandhi, but he did not report the raid."
  },
  53: {
    questext: "Which was the first movement to reach the Princely States and the Praja Mandals?",
    options: ["Civil Disobedience Movement", "Non-Cooperation Movement", "Quit India Movement", "Swadeshi Movement"],
    correct: "1",
    exptext: "✅ The Civil Disobedience Movement was the first to reach the states. 📌 Salt reached the states. ❌ Quit India is tempting because it was bigger, but it was later."
  },
  54: {
    type: "concept", icon: "🌱", accent: "#dc2626", pauseTimer: true,
    title: "Harijan Programme",
    html: `
      <p class="cp-lead">Gandhi gave the Depressed Classes the name Harijan, meaning People of God. <u>After the Poona Pact he spent the next years on their cause.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/34.png" alt="Harijan Sevak Sangh Gandhi Harijan Yatra photo" data-caption="Gandhi on the Harijan Yatra in 1933 and 1934." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/35.png" alt="Guruvayur Temple Kerala entrance photo" data-caption="Guruvayur Temple in Kerala, where the temple entry struggle took place in 1932 and 1933." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/36.png" alt="Timeline: Oct 1932 league renamed Harijan Sevak Sangh; Feb 1933 weekly Harijan; 1 Aug 1933" data-caption="The main steps of the Harijan programme in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">In October 1932 the <b>All India Anti-Untouchability League</b> was renamed the <b>Harijan Sevak Sangh</b>, with its central body in Mumbai and provincial branches. It gave aid and scholarships to Harijan students.</p>
      <p class="cp-lead">The weekly <b>Harijan</b> began in February 1933, with G. D. Birla, R. V. Sastri and Mahadev Desai, and vernacular editions followed by March. The <b>Harijan Yatra</b> began from Wardha on <b>7 November 1933</b> and covered <b>20,000 km</b> in nine months.</p>
      <table><thead><tr><th>Activity</th><th>Detail</th></tr></thead><tbody><tr><td>Training</td><td>Institutions for cottage industries</td></tr><tr><td>Education</td><td>Kasturba Balika Ashram (Delhi); Harijan Balika Vidyalaya</td></tr><tr><td>Temple entry</td><td>Guruvayur, Kerala; K. Kelappan fasted unto death from 1 January 1933</td></tr><tr><td>Sabarmati Ashram</td><td>Given to the Harijans on 1 August 1933</td></tr></tbody></table>
      <div class="cp-note trap">Gandhi's weekly Harijan began in February 1933 at Poona, and the Harijan Yatra began from Wardha in November 1933.</div>
    `
  },
  55: {
    questext: "Which organisation was formed in October 1932 for the upliftment of Harijans?",
    options: ["Servants of India Society", "Depressed Classes League", "Harijan Sevak Sangh", "Satyashodhak Samaj"],
    correct: "3",
    exptext: "✅ The Anti-Untouchability League was renamed the Harijan Sevak Sangh. 📌 Harijan, People of God. ❌ The Servants of India Society is tempting but it was founded by Gokhale in 1905."
  },
  56: {
    questext: "Who fasted for temple entry at Guruvayur in 1933?",
    options: ["Vinoba Bhave", "E. V. Ramaswami", "B. R. Ambedkar", "K. Kelappan"],
    correct: "4",
    exptext: "✅ K. Kelappan began a fast unto death on 1 January 1933. 📌 Kelappan, Guruvayur. ❌ Ambedkar is tempting because he worked for Dalit rights, but he was not at Guruvayur."
  },
  57: {
    questext: "The Harijan Yatra started from which place in November 1933?",
    options: ["Wardha", "Sabarmati", "Poona", "Bombay"],
    correct: "1",
    exptext: "✅ It began from Wardha on 7 November 1933 and covered 20,000 km. 📌 Wardha, Yatra. ❌ Sabarmati is tempting because the Ashram was given to the Harijans on 1 August 1933."
  },
  58: {
    type: "concept", icon: "🗳️", accent: "#22c55e", pauseTimer: true,
    title: "Provincial Elections (1937)",
    html: `
      <p class="cp-lead">The Government of India Act, 1935, started provincial autonomy in 1937. <u>Congress decided to contest even though it did not like the Act.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/37.png" alt="1937 Indian provincial elections poster photo" data-caption="A Congress election campaign in the provincial elections of 1937." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/38.png" alt="Sikandar Hyat Khan Unionist Party portrait photo" data-caption="Sikandar Hyat Khan, Unionist Party premier of Punjab in 1937." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/39.png" alt="Bar chart: Punjab Unionist Party 95 of 175; Bengal Congress 52, Krishak Praja Party 36; Am" data-caption="Key seat numbers of the 1937 provincial elections." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Jawaharlal Nehru said that Congress had to contest, but on a <b>negative manifesto</b> of hostility to the Act of 1935: not to gain power, but to teach the masses its programme and press for a new Constitution. At the Lucknow and Faizabad sessions of 1936 all factions agreed to contest.</p>
      <p class="cp-lead">Results came in <b>January and February 1937</b>. Congress won a majority in five provinces and was the largest party in several others. It had no majority in Bengal, Punjab and Sindh.</p>
      <table><thead><tr><th>Province</th><th>Result</th></tr></thead><tbody><tr><td>Punjab</td><td>Sikandar Hyat Khan's Unionist Party, 95 of 175</td></tr><tr><td>Bengal</td><td>Congress was largest with 52; A. K. Fazlul Huq's Krishak Praja Party (36) formed the coalition</td></tr><tr><td>Independent Labour Party of Ambedkar</td><td>14 of 17 contested; 11 of 13 reserved; 3 of 4 general</td></tr></tbody></table>
      <p class="cp-lead">Fazlul Huq founded the Krishak Praja Party, and Ambedkar founded the Independent Labour Party in the Central Provinces and Bengal. In July 1937 Congress formed ministries in Madras, United Provinces, Central Provinces, Bihar, Bombay and Orissa, and later North-West Frontier Province and Assam, making <b>eight provinces</b>.</p>
      <div class="cp-note trap">The elections were in January and February 1937, but the ministries began in July 1937.</div>
    `
  },
  59: {
    questext: "The provincial elections under the Government of India Act, 1935, were held in which year?",
    options: ["1935", "1937", "1936", "1939"],
    correct: "2",
    exptext: "✅ They were held in January and February 1937. 📌 Autonomy, 1937. ❌ 1935 is tempting because it is the year of the Act."
  },
  60: {
    questext: "Which party formed the government in Punjab after the 1937 elections?",
    options: ["Congress", "Muslim League", "Akali Dal", "Unionist Party"],
    correct: "4",
    exptext: "✅ Sikandar Hyat Khan's Unionist Party won 95 of 175 seats. 📌 Punjab, Unionist. ❌ The Muslim League is tempting but it did poorly in Punjab then."
  },
  61: {
    questext: "Who headed the coalition government in Bengal after the 1937 elections?",
    options: ["Subhas Chandra Bose", "Sarat Chandra Bose", "A. K. Fazlul Huq", "Jinnah"],
    correct: "3",
    exptext: "✅ Fazlul Huq's Krishak Praja Party formed the coalition although Congress was the largest. 📌 Huq, Bengal. ❌ Sarat Bose is tempting because he led Congress there."
  },
  62: {
    type: "concept", icon: "🏢", accent: "#d946ef", pauseTimer: true,
    title: "Congress Ministries (1937–39)",
    html: `
      <p class="cp-lead">For the first time Indians ran provincial governments. <u>The ministries did useful work, but they also made the Congress–League gap wider.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/40.png" alt="Congress ministry 1937 Govind Ballabh Pant C. Rajagopalachari photo" data-caption="Congress premiers who ran provincial governments in 1937." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/41.png" alt="Table-style picture: Premier names against provinces for Madras, Bombay, Bihar, Orissa, Ce" data-caption="Premiers of the provinces in 1937." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Province</th><th>Premier</th></tr></thead><tbody><tr><td>Madras</td><td>C. Rajagopalachari</td></tr><tr><td>Bombay</td><td>B. G. Kher</td></tr><tr><td>Bihar</td><td>Sri Krishna Sinha</td></tr><tr><td>Orissa</td><td>B. N. Das</td></tr><tr><td>Central Provinces</td><td>N. B. Khare, later Ravi Shankar Shukla</td></tr><tr><td>United Provinces</td><td>Govind Vallabh Pant</td></tr><tr><td>Assam</td><td>Saadulla, Gopinath Bardoloi (Congress)</td></tr><tr><td>North-West Frontier Province</td><td>Dr. Khan Sahib</td></tr><tr><td>Sindh</td><td>Allah Baksh</td></tr><tr><td>Bengal</td><td>Fazlul Huq</td></tr><tr><td>Punjab</td><td>Sikandar Hyat Khan</td></tr></tbody></table>
      <p class="cp-lead">A Central Control Council called the <b>Parliamentary Sub-Committee</b> of Sardar Patel, Maulana Abul Kalam Azad and Dr. Rajendra Prasad watched the ministries, and provincial chiefs were called <b>Prime Ministers</b>.</p>
      <p class="cp-lead">The ministries worked for elementary education, industrial wages, cottage industries, Harijan upliftment, relief from indebtedness, tenancy laws and the release of prisoners. They were criticised because Dalits were not impressed by a few caste disabilities and temple-entry bills, and capitalist ties brought unrest in Bombay, Gujarat, United Provinces and Bengal. The Bombay Trade Disputes Act of 1938 was anti-labour, and the League called them pro-Hindu.</p>
      <p class="cp-lead">The Congress–League rift widened, and Jinnah's offer of a coalition if Congress named no Muslim ministers was refused.</p>
      <p class="cp-lead"><b>End</b>: Viceroy Linlithgow declared India at war with the Axis Powers on <b>3 September 1939</b> without consulting Indians. Congress demanded independence after the war, while the League promised support at this critical juncture. Linlithgow refused, and the ministries resigned on <b>22 October 1939</b>. The League celebrated it as the <b>Day of Deliverance</b>.</p>
      <div class="cp-note trap">The war was declared on 3 September 1939, and the ministries resigned on 22 October 1939. Do not swap them.</div>
    `
  },
  63: {
    questext: "Who was the Premier of Madras in the Congress ministry of 1937?",
    options: ["C. Rajagopalachari", "Govind Vallabh Pant", "B. G. Kher", "Sri Krishna Sinha"],
    correct: "1",
    exptext: "✅ C. Rajagopalachari headed Madras. 📌 Rajaji, Madras. ❌ Pant is tempting but he was the Premier of the United Provinces."
  },
  64: {
    questext: "The Congress ministries resigned on which date?",
    options: ["3 September 1939", "22 December 1939", "22 October 1939", "8 August 1942"],
    correct: "3",
    exptext: "✅ They resigned on 22 October 1939 after the war was declared without their consent. 📌 22 October. ❌ 3 September is tempting because it is the date of the declaration of war."
  },
  65: {
    questext: "What did the Muslim League celebrate on the resignation of the Congress ministries?",
    options: ["Direct Action Day", "Day of Deliverance", "Pakistan Day", "Independence Day"],
    correct: "2",
    exptext: "✅ The League called it the Day of Deliverance. 📌 Deliverance from Congress rule. ❌ Pakistan Day is tempting but it was 23 March 1943."
  },
  66: {
    type: "concept", icon: "⚡", accent: "#f59e0b", pauseTimer: true,
    title: "Tripuri Crisis (1939)",
    html: `
      <p class="cp-lead">In 1939 the Congress president was elected against the wish of Gandhi. <u>It led to a crisis in the party.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/42.png" alt="Subhas Chandra Bose Tripuri Congress 1939 photo" data-caption="Subhas Chandra Bose at the Tripuri session of Congress in 1939." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/43.png" alt="Flow: 1938 Haripura unopposed; 1939 contest with Sitaramayya; Tripuri; Bose resigns April " data-caption="The steps of the Tripuri crisis in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Subhas Chandra Bose</b> was elected unopposed at Haripura in 1938. At <b>Tripuri in 1939</b> (a village in Jabalpur district, Madhya Pradesh) he won a second term by beating Gandhi's candidate <b>Pattabhi Sitaramayya</b>. Gandhi called that defeat <b>his own</b>.</p>
      <p class="cp-lead">A resolution asked him to form the Working Committee as Gandhi wished. Gandhi refused to advise, and Bose resigned in <b>April 1939</b>. <b>Dr. Rajendra Prasad</b> replaced him, and the Working Committee resigned. Bose founded the <b>Forward Bloc</b> in 1939 and was barred from Congress office for three years.</p>
      <table><thead><tr><th>Event</th><th>Fact</th></tr></thead><tbody><tr><td>Haripura, 1938</td><td>Bose president, unopposed</td></tr><tr><td>Tripuri, 1939</td><td>Bose beat Pattabhi Sitaramayya</td></tr><tr><td>April 1939</td><td>Bose resigned; Rajendra Prasad became president</td></tr><tr><td>1939</td><td>Forward Bloc founded</td></tr></tbody></table>
      <div class="cp-note trap">Haripura was in 1938 and Tripuri was in 1939.</div>
    `
  },
  67: {
    questext: "Who was defeated by Subhas Chandra Bose in the Congress presidential election of 1939?",
    options: ["Rajendra Prasad", "Jawaharlal Nehru", "Maulana Azad", "Pattabhi Sitaramayya"],
    correct: "4",
    exptext: "✅ Bose defeated Gandhi's candidate Pattabhi Sitaramayya. 📌 Sitaramayya, Gandhi's man. ❌ Rajendra Prasad is tempting because he replaced Bose after his resignation."
  },
  68: {
    questext: "Subhas Chandra Bose founded which party in 1939?",
    options: ["Forward Bloc", "Congress Socialist Party", "Swaraj Party", "Azad Hind"],
    correct: "1",
    exptext: "✅ Bose formed the Forward Bloc after he left Congress. 📌 Forward, Bose. ❌ The Congress Socialist Party is tempting but that was formed in 1934."
  },
  69: {
    type: "concept", icon: "🛠️", accent: "#3b82f6", pauseTimer: true,
    title: "Working Class and the Left",
    html: `
      <p class="cp-lead">Communism and socialism grew in India after the First World War. <u>Young leaders hoped to join freedom with a fair economic system.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/44.png" alt="Jayaprakash Narayan portrait photo" data-caption="Jayaprakash Narayan, a founder of the Congress Socialist Party in 1934." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/45.png" alt="Table-style picture: Left party, founder, year for Forward Bloc, Bolshevik Party, Revoluti" data-caption="Other left parties with their founders and years." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Communism grew after the First World War in Bombay, Calcutta, Madras, Lahore and Kanpur, spread by Ghulam Hussain (Inquilab), S. A. Dange (Socialist) and Muzaffar Ahmad (Navyug, Bengal). The causes were the Bolshevik Revolution in Russia, the burden of war, peasant and worker movements, middle-class unemployment and objection to Gandhian Swaraj.</p>
      <p class="cp-lead">The <b>Communist Party of India</b> was declared by M. N. Roy at Tashkent in October 1920, united at <b>Kanpur in December 1925</b> and <b>banned in 1934</b>, after which the communists entered Congress and ran strikes and worker movements.</p>
      <p class="cp-lead">The <b>Congress Socialist Party</b> was formed at Bombay in 1934 by Jayaprakash Narayan, Acharya Narendra Dev and Minoo Masani, with Ashok Mehta, Achyut Patwardhan, Dr. Ram Manohar Lohia. Moderates called them <b>internationalists</b> and the Communist Party of India called them <b>fake socialists</b>. In 1936 at Lucknow, Nehru's proposal for socialism as the goal was rejected by the Working Committee. At independence Narendra Dev, Patwardhan, Jayaprakash Narayan, Lohia, J. B. Kripalani and Ashok Mehta left for the Kisan Mazdoor Praja Party.</p>
      <table><thead><tr><th>Other left party</th><th>Founder</th><th>Year</th></tr></thead><tbody><tr><td>Forward Bloc</td><td>Subhas Chandra Bose</td><td>1939</td></tr><tr><td>Bolshevik Party</td><td>N. Dutt Mazumdar</td><td>1939</td></tr><tr><td>Revolutionary Communist Party</td><td>Saumyendranath Tagore</td><td>1942</td></tr><tr><td>Bolshevik Leninist Party</td><td>Ajit Roy and Indra Sen</td><td>Not given</td></tr><tr><td>Radical Democratic Party</td><td>M. N. Roy</td><td>1940</td></tr></tbody></table>
      <div class="cp-note trap">The Communist Party of India was declared in 1920, united in 1925 and banned in 1934. The Congress Socialist Party came in 1934 inside Congress.</div>
    `
  },
  70: {
    questext: "The Congress Socialist Party was formed in which year?",
    options: ["1925", "1934", "1930", "1939"],
    correct: "2",
    exptext: "✅ Jayaprakash Narayan, Narendra Dev and Minoo Masani formed it at Bombay in 1934. 📌 Socialists inside Congress, 1934. ❌ 1939 is tempting because that was the Forward Bloc."
  },
  71: {
    questext: "Who founded the Radical Democratic Party in 1940?",
    options: ["S. A. Dange", "Ram Manohar Lohia", "M. N. Roy", "Saumyendranath Tagore"],
    correct: "3",
    exptext: "✅ M. N. Roy founded it after he left the Communist Party. 📌 Roy, Radical. ❌ Saumyendranath Tagore is tempting but he founded the Revolutionary Communist Party."
  },
  72: {
    type: "concept", icon: "🏭", accent: "#059669", pauseTimer: true,
    title: "Labour and Trade Unions",
    html: `
      <p class="cp-lead">Workers began to organise as factories grew. <u>The first modern labour union was set up in Madras.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/46.png" alt="B. P. Wadia Madras Labour Union portrait photo" data-caption="B. P. Wadia, founder of the Madras Labour Union, the first modern labour union in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle/47.png" alt="Timeline: 1918 Madras Labour Union; 1919 International Labour Organisation; 31 Oct 1920 AI" data-caption="Key dates in the history of trade unions in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The first modern labour union was the <b>Madras Labour Union</b> of B. P. Wadia. The <b>International Labour Organisation</b> of 1919 had India as a member, and it led to the <b>All India Trade Union Congress</b>, founded on 31 October 1920 at Bombay, with its first session at Mumbai in 1922 under <b>Lala Lajpat Rai</b>. The general secretary was Dewan Chaman Lal.</p>
      <p class="cp-lead">Communists split the union twice. The moderates N. M. Joshi and V. V. Giri formed the <b>National Trade Unions Federation</b> in 1929. The extreme left, S. V. Deshpande and B. T. Ranadive, broke away at Calcutta in 1931 as the <b>All India Red Trade Union Congress</b>, the Period of Left-Wing Trade Unionism.</p>
      <table><thead><tr><th>Law or body</th><th>Year</th></tr></thead><tbody><tr><td>Trade Unions Act</td><td>1926</td></tr><tr><td>Trade Disputes Act</td><td>1929</td></tr><tr><td>Bombay Industrial Disputes Act</td><td>1938</td></tr><tr><td>National Trade Unions Federation joined AITUC</td><td>1938</td></tr><tr><td>Indian National Trade Union Congress, founded by Vallabhbhai Patel</td><td>3 May 1947</td></tr></tbody></table>
      <p class="cp-lead">The three laws helped the unions grow. The Red Trade Union Congress merged back into the All India Trade Union Congress in the mid-1930s.</p>
      <div class="cp-note trap">Trade Unions Act 1926, Trade Disputes Act 1929 and Bombay Industrial Disputes Act 1938 are three different laws.</div>
    `
  },
  73: {
    questext: "Who was the first president of the All India Trade Union Congress?",
    options: ["V. V. Giri", "B. P. Wadia", "N. M. Joshi", "Lala Lajpat Rai"],
    correct: "4",
    exptext: "✅ Lala Lajpat Rai presided over its first session. 📌 Lajpat Rai, labour. ❌ B. P. Wadia is tempting because he founded the Madras union, but he was not the president."
  },
  74: {
    questext: "The Indian National Trade Union Congress was founded in 1947 by whom?",
    options: ["Jawaharlal Nehru", "Vallabhbhai Patel", "Lala Lajpat Rai", "S. A. Dange"],
    correct: "2",
    exptext: "✅ Sardar Vallabhbhai Patel founded it on 3 May 1947. 📌 INTUC, Patel. ❌ Nehru is tempting because he was a labour supporter but not the founder."
  },
  75: {
    questext: "The Trade Unions Act was passed in which year?",
    options: ["1926", "1919", "1929", "1938"],
    correct: "1",
    exptext: "✅ The Trade Unions Act of 1926 gave legal status to unions. 📌 1926, Trade Unions. ❌ 1929 is tempting because it was the Trade Disputes Act."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Freedom_Struggle/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a pile of white salt crystals in a hand, a walking stick and a rolled parchment tied with a tricolour ribbon" },
  "images/General_Awareness/Modern_India/Freedom_Struggle/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Simon Commission Go Back protest 1928 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/1.png. black flag protest against Simon Commission",
  "images/General_Awareness/Modern_India/Freedom_Struggle/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lala Lajpat Rai Simon Commission lathi charge photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/2.png. Lala Lajpat Rai leading the Lahore procession",
  "images/General_Awareness/Modern_India/Freedom_Struggle/3.png": { t: "fig", about: "Timeline: 8 Nov 1927 commission appointed; 27 Dec 1927 Madras boycott; 3 Feb 1928 Bombay arrival; 17 Nov 1928 Lajpat Rai dies; May 1930 report." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Motilal Nehru portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/4.png. clear portrait of Motilal Nehru",
  "images/General_Awareness/Modern_India/Freedom_Struggle/5.png": { t: "fig", about: "Flow: Birkenhead's challenge, All-Party Conference at Delhi, Bombay committee under Motilal Nehru, report in August 1928." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Muhammad Ali Jinnah young portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/6.png. portrait of Muhammad Ali Jinnah",
  "images/General_Awareness/Modern_India/Freedom_Struggle/7.png": { t: "fig", about: "Chart: left box Congress ultimatum; centre box All-Parties Conference Calcutta December 1928; right box Fourteen Points March 1929." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lahore Congress session 1929 Ravi flag hoisting photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/8.png. Jawaharlal Nehru hoisting the tricolour on the bank of the Ravi",
  "images/General_Awareness/Modern_India/Freedom_Struggle/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jawaharlal Nehru 1929 Lahore Congress president photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/9.png. portrait of Jawaharlal Nehru in 1929",
  "images/General_Awareness/Modern_India/Freedom_Struggle/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dandi March 1930 Gandhi walking photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/10.png. Gandhi with followers on the Dandi March",
  "images/General_Awareness/Modern_India/Freedom_Struggle/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dandi salt pan Gujarat coast photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/11.png. Gandhi lifting salt at Dandi",
  "images/General_Awareness/Modern_India/Freedom_Struggle/12.png": { t: "fig", about: "Timeline: 12 March 1930 Sabarmati; 5 April Dandi reached; 6 April salt law broken; 240 miles; 78 followers." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dharasana Salt Works satyagraha 1930 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/13.png. volunteers at Dharasana Salt Works",
  "images/General_Awareness/Modern_India/Freedom_Struggle/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Khan Abdul Ghaffar Khan Khudai Khidmatgar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/14.png. Khan Abdul Ghaffar Khan with Red Shirts",
  "images/General_Awareness/Modern_India/Freedom_Struggle/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rani Gaidinliu portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/15.png. portrait of Rani Gaidinliu",
  "images/General_Awareness/Modern_India/Freedom_Struggle/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"First Round Table Conference 1930 London group photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/16.png. delegates in London",
  "images/General_Awareness/Modern_India/Freedom_Struggle/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"B. R. Ambedkar portrait photo 1930\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/17.png. portrait of B. R. Ambedkar",
  "images/General_Awareness/Modern_India/Freedom_Struggle/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gandhi Irwin Pact March 1931 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/18.png. Gandhi leaving the Viceroy House after talks",
  "images/General_Awareness/Modern_India/Freedom_Struggle/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Karachi Congress session 1931 Vallabhbhai Patel photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/19.png. Sardar Vallabhbhai Patel as president",
  "images/General_Awareness/Modern_India/Freedom_Struggle/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gandhi Second Round Table Conference 1931 London photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/20.png. Gandhi outside the conference in London",
  "images/General_Awareness/Modern_India/Freedom_Struggle/21.png": { t: "fig", about: "Flow: Rajputana ship, London, demands, deadlock, return to Bombay 28 December 1931." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gandhi arrested Yerwada 1932 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/22.png. Gandhi at Yerwada Jail",
  "images/General_Awareness/Modern_India/Freedom_Struggle/23.png": { t: "fig", about: "Timeline: Jan 1932 restart; 1 lakh arrests in six months; April 1934 movement withdrawn." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ramsay MacDonald prime minister portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/24.png. portrait of Ramsay MacDonald",
  "images/General_Awareness/Modern_India/Freedom_Struggle/25.png": { t: "fig", about: "Chart: centre box Communal Award; branches Muslims, Sikhs, Christians, Anglo-Indians, Europeans, Depressed Classes, Women, Marathas." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Yerwada Jail Pune Gandhi fast 1932 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/26.png. Yerwada Jail in Pune",
  "images/General_Awareness/Modern_India/Freedom_Struggle/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Poona Pact 1932 Ambedkar Gandhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/27.png. Ambedkar and Gandhi",
  "images/General_Awareness/Modern_India/Freedom_Struggle/28.png": { t: "fig", about: "Bar picture: provincial seats for Depressed Classes 71 in the Award and 147 in the Pact; central seats 18 percent." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Government of India Act 1935 document photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/29.png. the printed Act",
  "images/General_Awareness/Modern_India/Freedom_Struggle/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Reserve Bank of India 1935 old building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/30.png. the old Reserve Bank building",
  "images/General_Awareness/Modern_India/Freedom_Struggle/31.png": { t: "fig", about: "Flow: Third Round Table 1932, White Paper March 1933, Joint Select Committee under Linlithgow, Hoare's bill, Act 1935." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/32.png": { t: "fig", about: "Mind-map: centre Civil Disobedience Movement; branches First nationwide, Princely States reached, Women and workers joined, Longest until then." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tana Bhagat movement Jharkhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/33.png. Tana Bhagat men",
  "images/General_Awareness/Modern_India/Freedom_Struggle/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Harijan Sevak Sangh Gandhi Harijan Yatra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/34.png. Gandhi on the Harijan tour",
  "images/General_Awareness/Modern_India/Freedom_Struggle/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Guruvayur Temple Kerala entrance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/35.png. Guruvayur Temple",
  "images/General_Awareness/Modern_India/Freedom_Struggle/36.png": { t: "fig", about: "Timeline: Oct 1932 league renamed Harijan Sevak Sangh; Feb 1933 weekly Harijan; 1 Aug 1933 Sabarmati Ashram gifted; 7 Nov 1933 Harijan Yatra." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"1937 Indian provincial elections poster photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/37.png. a poster for the 1937 elections",
  "images/General_Awareness/Modern_India/Freedom_Struggle/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sikandar Hyat Khan Unionist Party portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/38.png. portrait of Sikandar Hyat Khan",
  "images/General_Awareness/Modern_India/Freedom_Struggle/39.png": { t: "fig", about: "Bar chart: Punjab Unionist Party 95 of 175; Bengal Congress 52, Krishak Praja Party 36; Ambedkar's Independent Labour Party 14 of 17 contested." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Congress ministry 1937 Govind Ballabh Pant C. Rajagopalachari photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/40.png. Congress premiers of 1937",
  "images/General_Awareness/Modern_India/Freedom_Struggle/41.png": { t: "fig", about: "Table-style picture: Premier names against provinces for Madras, Bombay, Bihar, Orissa, Central Provinces, United Provinces, Assam, North-West Frontier Province." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Subhas Chandra Bose Tripuri Congress 1939 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/42.png. Subhas Chandra Bose at Tripuri",
  "images/General_Awareness/Modern_India/Freedom_Struggle/43.png": { t: "fig", about: "Flow: 1938 Haripura unopposed; 1939 contest with Sitaramayya; Tripuri; Bose resigns April 1939; Forward Bloc." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jayaprakash Narayan portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/44.png. portrait of Jayaprakash Narayan",
  "images/General_Awareness/Modern_India/Freedom_Struggle/45.png": { t: "fig", about: "Table-style picture: Left party, founder, year for Forward Bloc, Bolshevik Party, Revolutionary Communist Party, Bolshevik Leninist Party, Radical Democratic Party." },
  "images/General_Awareness/Modern_India/Freedom_Struggle/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"B. P. Wadia Madras Labour Union portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle/46.png. portrait of B. P. Wadia",
  "images/General_Awareness/Modern_India/Freedom_Struggle/47.png": { t: "fig", about: "Timeline: 1918 Madras Labour Union; 1919 International Labour Organisation; 31 Oct 1920 AITUC; 1926 Trade Unions Act; 1929 Trade Disputes Act; 1938 Bombay Industrial Disputes Act; 1947 INTUC." }
});

/* CHANGE LOG
   - Simon Commission: Lala Lajpat Rai's injuries came from a lathi charge ordered by Superintendent James A. Scott; John Saunders was shot by mistake in his place on 17 December 1928. The page states this correctly.
   - Dandi March distance is given as 240 miles (about 385 kilometres) in one standard form.
   - Salt tax share of Raj revenue is written as 8.2 percent.
   - Congress's 1937 election result is stated as a majority in five provinces and the largest party in several others, with ministries in eight provinces, instead of an absolute majority in eleven provinces.
   - The Red Trade Union Congress is said to have merged back into the All India Trade Union Congress in the mid-1930s (the source gave two years).
   - The Communist Party conference of December 1925 is placed at Kanpur.
*/