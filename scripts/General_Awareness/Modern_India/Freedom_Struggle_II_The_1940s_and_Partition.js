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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Freedom_Struggle_II_The_1940s_and_Partition · 9 concept pages (+ overview) · 25 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🇮🇳", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Freedom Struggle II: The 1940s and Partition (Part 1)",
    thumb: {
      image: "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/thumbnail.png",
      banner: "MODERN INDIA 2026",
      line1: "FREEDOM STRUGGLE II",
      line2: "1940s",
      line3: "QUIT INDIA TO INA",
      badge: "PART 1",
      ribbon: "PLANS • DATES • LEADERS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Freedom Struggle II Part 1 | Quit India, Cripps, INA, Wavell Plan | SSC CGL",
      altTitles: ["Quit India Movement and Cripps Mission Explained Simply", "Subhas Chandra Bose and INA with August Offer and Wavell Plan"],
      description: "The 1940s are a high-scoring part of Modern India. In this class we study the demand for Pakistan, the August Offer, the Cripps Mission, the Quit India Movement, the Indian National Army, the C. R. Formula and the Wavell Plan, step by step, in very simple words.\n\n📌 IN THIS CLASS\n✅ Demand for Pakistan\n✅ August Offer 1940 and Individual Satyagraha\n✅ Cripps Mission 1942\n✅ Quit India and parallel governments\n✅ Indian National Army\n✅ Wavell Plan and Shimla Conference\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernIndia #QuitIndia",
      tags: ["freedom struggle 1940s", "demand for pakistan", "august offer 1940", "individual satyagraha", "cripps mission 1942", "quit india movement", "indian national army", "subhas chandra bose ina", "azad hind government", "c rajagopalachari formula", "wavell plan", "shimla conference 1945", "modern india history", "ssc cgl history", "history for ssc", "static gk", "general awareness", "railway ntpc history", "banking exams gk", "modern india one shot", "important dates modern india", "SSC CGL", "UPSC", "Banking", "Railways", "Freedom Struggle II The 1"],
      hashtags: ["SSCCGL", "ModernIndia", "QuitIndia"],
      thumbText: "FREEDOM STRUGGLE II PART 1",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Freedom Struggle II Part 1, from Pakistan demand to the Wavell Plan. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the last years of the freedom struggle</u>. We start with the demand for Pakistan and follow the Second World War, the Cripps Mission, the Quit India Movement, the Indian National Army and the Wavell Plan.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>9</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>25</b><span>Questions</span></div>
        <div class="cp-stat"><b>~43 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Demand for Pakistan</b><br>How the idea of a separate Muslim state grew from 1930 to 1940.</li>
        <li><b>Second World War and India</b><br>Why Congress and the Muslim League took different paths when the war began.</li>
        <li><b>August Offer and Individual Satyagraha</b><br>The British offer of 1940 and Gandhi's symbolic protest.</li>
        <li><b>Cripps Mission</b><br>The proposals of 1942 and why they failed.</li>
        <li><b>Quit India Movement</b><br>The last great mass movement, its stages and its parallel governments.</li>
        <li><b>Indian National Army</b><br>Subhas Chandra Bose and the army that fought for freedom.</li>
        <li><b>C. R. Formula and Wavell Plan</b><br>Two attempts to end the deadlock between Congress and the League.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Staff Selection Commission papers ask many direct questions on the dates, plans and leaders of the 1940s.</div>
    `
  },
  2: {
    type: "concept", icon: "🌙", accent: "#ef4444", pauseTimer: true,
    title: "Demand for Pakistan",
    html: `
      <p class="cp-lead">The idea of a separate Muslim state grew slowly over ten years. <u>It ended in the Lahore Resolution of 1940.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/1.png" alt="Allama Muhammad Iqbal portrait photo" data-caption="Allama Muhammad Iqbal, who spoke of a Muslim state at Allahabad in 1930." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/2.png" alt="Chaudhary Rahmat Ali Cambridge portrait photo" data-caption="Chaudhary Rahmat Ali, who gave the name Pakistan in 1933." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/3.png" alt="Timeline: 29 December 1930 Iqbal at Allahabad; 1933 Now or Never; 1937 election; 23 March " data-caption="The main steps in the demand for Pakistan in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Allama Muhammad Iqbal</b> spoke at the Muslim League session at <b>Allahabad on 29 December 1930</b>. He wanted the North-West Muslim states of Punjab, North-West Frontier Province, Sindh and Baluchistan joined together. This is called the Two-Nation Theory.</p>
      <p class="cp-lead">In 1933 <b>Chaudhary Rahmat Ali</b>, a student at Cambridge, published the pamphlet <b>Now or Never</b>. The name Pakistan is made from the letters of Punjab, Kashmir, Sindh, North-West Frontier Province and Baluchistan.</p>
      <p class="cp-lead">The elections of 1937 gave the League few Muslim seats. Jinnah blamed Congress for pressing Hinduism under the garb of independence. The Second World War helped the League because the British backed it as part of their policy of Divide and Rule.</p>
      <table><thead><tr><th>Date</th><th>Event</th></tr></thead><tbody><tr><td>29 December 1930</td><td>Iqbal's idea at Allahabad</td></tr><tr><td>1933</td><td>Rahmat Ali's pamphlet Now or Never</td></tr><tr><td>23 and 24 March 1940</td><td>Pakistan Resolution at the Lahore session, Jinnah presiding</td></tr><tr><td>23 March 1943</td><td>Pakistan Day</td></tr></tbody></table>
      <div class="cp-note trap">Iqbal gave the idea in 1930, Rahmat Ali gave the name in 1933 and the League adopted the demand in 1940. Do not swap the three.</div>
    `
  },
  3: {
    questext: "Who gave the idea of a separate Muslim state in the Muslim League session at Allahabad in 1930?",
    options: ["Chaudhary Rahmat Ali", "Muhammad Ali Jinnah", "Liaquat Ali Khan", "Allama Muhammad Iqbal"],
    correct: "4",
    exptext: "✅ Allama Muhammad Iqbal spoke of a Muslim state in the North-West on 29 December 1930. 📌 Iqbal, idea. ❌ Rahmat Ali is tempting because he is linked to Pakistan, but he gave the name three years later."
  },
  4: {
    questext: "The name Pakistan was first given by whom?",
    options: ["Fazlul Haq", "Muhammad Iqbal", "Sir Syed Ahmad Khan", "Chaudhary Rahmat Ali"],
    correct: "4",
    exptext: "✅ Chaudhary Rahmat Ali coined the name in the pamphlet Now or Never in 1933. 📌 Rahmat Ali, name. ❌ Iqbal is tempting because he gave the idea, not the name."
  },
  5: {
    questext: "The Pakistan Resolution was passed at which place in March 1940?",
    options: ["Allahabad", "Delhi", "Karachi", "Lahore"],
    correct: "4",
    exptext: "✅ The Lahore session of the Muslim League passed it on 23 and 24 March 1940 under Jinnah. 📌 Lahore Resolution. ❌ Allahabad is tempting because Iqbal spoke there in 1930."
  },
  6: {
    type: "concept", icon: "⚔️", accent: "#f97316", pauseTimer: true,
    title: "Second World War and India",
    html: `
      <p class="cp-lead">The war began in September 1939. <u>The Viceroy declared India at war without asking any Indian.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/4.png" alt="Subhas Chandra Bose Berlin 1941 photo" data-caption="Subhas Chandra Bose in Germany during the Second World War." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/5.png" alt="Three-column chart: Congress conditional support; Muslim League full support; Hindu Mahasa" data-caption="The views of three Indian groups on the Second World War." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Britain dragged India into the war from September 1939 to 1945 <b>without consultation or consent</b>. Subhas Chandra Bose said that <u>Britain's crisis is India's opportunity</u>. He escaped to Berlin and then to Tokyo, and raised the Indian National Army.</p>
      <p class="cp-lead">Gandhi and Nehru wanted to oppose Fascism and Nazism, but they said that the war was an imperialist war. On <b>10 October 1939</b> the Congress Working Committee and the All India Congress Committee gave only conditional support: India should be declared independent and a provisional National Government should be formed, with freedom after the war.</p>
      <p class="cp-lead">The Muslim League, with ministries in Punjab, Sindh and Bengal, gave full support. The Hindu Mahasabha gave unconditional support. The Communist Party of India backed Britain after Germany attacked Russia.</p>
      <p class="cp-lead">After Pearl Harbour the United States of America pressed Britain to settle with India, and the Cripps Mission was sent. Malaya, Singapore, Burma and the Andaman and Nicobar Islands fell to Japan. Gandhi said that the British presence was an invitation to Japan to invade.</p>
      <div class="cp-note trap">Congress gave conditional support on 10 October 1939. The League gave full support, and Bose went abroad. Do not mix the three.</div>
    `
  },
  7: {
    questext: "Which group gave unconditional support to Britain in the Second World War?",
    options: ["Congress", "Khaksars", "Forward Bloc", "Hindu Mahasabha"],
    correct: "4",
    exptext: "✅ The Hindu Mahasabha gave unconditional support. 📌 Congress asked for a price. ❌ Congress is tempting but it gave only conditional support."
  },
  8: {
    questext: "Who said, 'Britain's crisis is India's opportunity'?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Sardar Patel"],
    correct: "3",
    exptext: "✅ Subhas Chandra Bose said this and went abroad to raise an army. 📌 Bose and opportunity. ❌ Nehru is tempting because he opposed Fascism, but he did not leave India."
  },
  9: {
    type: "concept", icon: "📨", accent: "#10b981", pauseTimer: true,
    title: "August Offer (1940)",
    html: `
      <p class="cp-lead">In 1940 Britain was in danger, and it needed Indian support. <u>Lord Linlithgow made an offer on 8 August 1940.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/6.png" alt="Lord Linlithgow Viceroy portrait photo" data-caption="Lord Linlithgow, the Viceroy who made the August Offer in 1940." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/7.png" alt="Chart: left side Offer items (expanded Executive Council, War Advisory Council, post-war c" data-caption="What the August Offer gave and how it was received." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">After the ministries resigned there was a deadlock. At the <b>Ramgarh session</b> of March 1940 (then in Bihar), Congress asked for an interim government at the Centre and a Constituent Assembly on adult suffrage. Linlithgow's reply is called the <b>August Proposal</b>, made on <b>8 August 1940</b>.</p>
      <table><thead><tr><th>Proposal</th><th>Detail</th></tr></thead><tbody><tr><td>Executive Council</td><td>Viceroy's Council to be expanded</td></tr><tr><td>War Advisory Council</td><td>Of British India and Princely states</td></tr><tr><td>Post-war body</td><td>A constitution-making body, mainly Indian</td></tr><tr><td>Conditions</td><td>Defence, minority rights, treaties with states and all-India services protected</td></tr><tr><td>Minorities</td><td>No constitution without their consent</td></tr></tbody></table>
      <p class="cp-lead">The offer rested on <b>Dominion Status</b>. Nehru called it <u>dead as a rusty door nail</u>, and Gandhi said it had widened the gulf. The League also rejected it.</p>
      <p class="cp-lead">Its gains were that the right to frame a constitution was recognised and a Constituent Assembly was conceded, with Dominion Status offered. In July 1941 the Executive Council had eight Indians out of twelve members, with the Defence, Finance and Home posts still British, and a National Defence Council was formed.</p>
      <div class="cp-note trap">Do not mix the August Offer (1940, Linlithgow) with the Cripps proposals (1942).</div>
    `
  },
  10: {
    questext: "The August Offer of 1940 was made by whom?",
    options: ["Lord Wavell", "Lord Mountbatten", "Stafford Cripps", "Lord Linlithgow"],
    correct: "4",
    exptext: "✅ Viceroy Linlithgow announced it on 8 August 1940. 📌 August, Lin. ❌ Stafford Cripps is tempting because he also brought an offer, but that was in 1942."
  },
  11: {
    questext: "Which leader called the August Offer 'dead as a rusty door nail'?",
    options: ["Jawaharlal Nehru", "Gandhi", "Jinnah", "Patel"],
    correct: "1",
    exptext: "✅ Nehru used these words, and Gandhi said it widened the gulf. 📌 Nehru, rusty nail. ❌ Gandhi is tempting because he also rejected it, but his words were different."
  },
  12: {
    type: "concept", icon: "🧘", accent: "#8b5cf6", pauseTimer: true,
    title: "Individual Satyagraha (1940)",
    html: `
      <p class="cp-lead">Gandhi wanted a protest that was symbolic and non-violent. <u>He did not want a mass movement while Britain was fighting.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/8.png" alt="Vinoba Bhave portrait photo" data-caption="Vinoba Bhave, the first individual satyagrahi in October 1940." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/9.png" alt="Chart with three boxes: First Satyagrahi Vinoba Bhave; Second Jawaharlal Nehru; Third Brah" data-caption="The first three individual satyagrahis chosen by Gandhi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Individual Satyagraha was Gandhi's symbolic protest, with non-violence at its centre, and it went against the demand of the leftists for Civil Disobedience. It began at <b>Pavnar Ashram in Maharashtra on 17 October 1940</b>. The second phase began in January 1941, when about <b>25000</b> persons went to jail. It is also called the <b>Dilli Chalo Movement</b>.</p>
      <table><thead><tr><th>Order</th><th>Satyagrahi</th></tr></thead><tbody><tr><td>First</td><td>Acharya Vinoba Bhave</td></tr><tr><td>Second</td><td>Jawaharlal Nehru</td></tr><tr><td>Third</td><td>Brahma Dutt</td></tr></tbody></table>
      <div class="cp-note trap">Individual Satyagraha was in 1940, the Quit India Movement in 1942. Do not mix them.</div>
    `
  },
  13: {
    questext: "Who was chosen as the first individual satyagrahi in 1940?",
    options: ["Jawaharlal Nehru", "Brahma Dutt", "Sardar Patel", "Vinoba Bhave"],
    correct: "4",
    exptext: "✅ Vinoba Bhave was the first and Nehru the second. 📌 Vinoba first, Nehru next. ❌ Nehru is tempting because he was famous, but he was the second."
  },
  14: {
    questext: "The Individual Satyagraha began at which place on 17 October 1940?",
    options: ["Pavnar Ashram", "Sabarmati Ashram", "Sevagram", "Tolstoy Farm"],
    correct: "1",
    exptext: "✅ It began at Pavnar Ashram in Maharashtra. 📌 Pavnar, Vinoba. ❌ Sabarmati is tempting because it was Gandhi's older ashram, but the movement did not start there."
  },
  15: {
    type: "concept", icon: "📮", accent: "#eab308", pauseTimer: true,
    title: "Cripps Mission (1942)",
    html: `
      <p class="cp-lead">By 1942 the war was at India's door. <u>Britain sent Sir Stafford Cripps with an offer.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/10.png" alt="Stafford Cripps 1942 India arrival photo" data-caption="Sir Stafford Cripps in India in March 1942." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/11.png" alt="Flow: Japan takes Singapore and Burma, Churchill announces Cripps 11 March, Cripps arrives" data-caption="The steps of the Cripps Mission in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Germany attacked Russia on 22 June 1941. Japan took Pearl Harbour, Malaya, Singapore and Burma. Under pressure from the United States of America, Churchill announced the mission on <b>11 March 1942</b>, and <b>Sir Stafford Cripps</b>, a left-wing Labour member of the War Cabinet, reached India on <b>22 March 1942</b>.</p>
      <table><thead><tr><th>Proposal</th><th>Detail</th></tr></thead><tbody><tr><td>Status</td><td>Indian Union with Dominion Status</td></tr><tr><td>Ties</td><td>Free to leave the Commonwealth and join the United Nations</td></tr><tr><td>Constituent Assembly</td><td>After the war, partly elected by provincial assemblies by proportional representation and partly nominated by Princes</td></tr><tr><td>Opt-out</td><td>A province unwilling to join could secede into a separate union</td></tr><tr><td>Defence</td><td>Stays with Britain, with the Governor-General's powers intact</td></tr></tbody></table>
      <p class="cp-lead">Congress and the League both rejected it. Gandhi called the offer a <u>post-dated cheque on a crashing bank</u>. The opt-out clause conceded Pakistan, and the Viceroy and the Secretary of State sabotaged the talks under Churchill.</p>
      <div class="cp-note trap">Cripps was announced on 11 March 1942 and arrived on 22 March 1942. Do not swap the dates.</div>
    `
  },
  16: {
    questext: "On which date did Stafford Cripps reach India in 1942?",
    options: ["11 March", "9 August", "8 August", "22 March"],
    correct: "4",
    exptext: "✅ Cripps reached India on 22 March 1942, after the announcement on 11 March. 📌 Announce 11, arrive 22. ❌ 11 March is tempting because it was the announcement date."
  },
  17: {
    questext: "Gandhi described the Cripps proposals as what?",
    options: ["A rusty door nail", "A post-dated cheque on a crashing bank", "A union of two Mahatmas", "A stone for bread"],
    correct: "2",
    exptext: "✅ Gandhi called them a post-dated cheque on a crashing bank. 📌 Cheque, bank. ❌ A stone for bread is tempting but that was about the salt law."
  },
  18: {
    questext: "Why did Congress object to the Cripps proposals?",
    options: ["Dominion Status was offered", "The opt-out clause conceded Pakistan", "A Constituent Assembly was promised", "India could leave the Commonwealth"],
    correct: "2",
    exptext: "✅ The right of provinces to secede conceded Pakistan. 📌 Opt-out equals Pakistan. ❌ Dominion Status is tempting but Congress by now wanted full independence."
  },
  19: {
    type: "concept", icon: "🗣️", accent: "#14b8a6", pauseTimer: true,
    title: "Quit India Movement (1942): Causes and Outbreak",
    html: `
      <p class="cp-lead">This was the last big mass movement. <u>Its slogan was Do or Die.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/12.png" alt="Gowalia Tank Maidan Bombay August Kranti Maidan photo" data-caption="Gowalia Tank Maidan in Bombay, where the Quit India Resolution was passed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/13.png" alt="Aruna Asaf Ali hoisting flag Gowalia Tank photo" data-caption="Aruna Asaf Ali, who hoisted the tricolour at Gowalia Tank on 9 August 1942." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/14.png" alt="Timeline: 14 July 1942 Wardha; 8 August Gowalia Tank; 9 August Operation Zero Hour." data-caption="The three key dates of the start of the Quit India Movement." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The causes were the failure of Cripps, the Japanese threat, price rise and scarcity, and the fear of the scorched-earth policy in Assam, Bengal and Orissa, with deposits withdrawn from banks and post offices.</p>
      <table><thead><tr><th>Date</th><th>Event</th></tr></thead><tbody><tr><td>14 July 1942</td><td>Wardha, Congress Working Committee resolution for complete independence</td></tr><tr><td>8 August 1942</td><td>Gowalia Tank, Bombay, All India Congress Committee passed the Quit India Resolution; Gandhi said Do or Die</td></tr><tr><td>9 August 1942</td><td>Operation Zero Hour: Gandhi, Nehru and others arrested; Congress made illegal</td></tr></tbody></table>
      <p class="cp-lead">Gandhi, Sarojini Naidu and Kasturba were held at the Aga Khan Palace. Others were held at Ahmednagar Fort, and Rajendra Prasad at Bankipur Jail. Jayaprakash Narayan escaped from Hazaribagh and formed the <b>Azad Dasta</b>.</p>
      <p class="cp-lead">The first stage, 9 to 15 August 1942, was urban and the most violent in Delhi, Mumbai, Pune and Ahmedabad. It is called the Great August Revolt and resembled 1857. The second stage, August to September 1942, was in the countryside. The third stage, October to December 1942, was an underground movement of youth.</p>
      <div class="cp-note trap">Wardha was the plan (14 July), Gowalia Tank was the resolution (8 August), and the arrests were on 9 August. Do not swap them.</div>
    `
  },
  20: {
    questext: "The Quit India Resolution was ratified by the All India Congress Committee at which place?",
    options: ["Wardha", "Gowalia Tank, Bombay", "Haripura", "Tripuri"],
    correct: "2",
    exptext: "✅ It was passed at Gowalia Tank, Bombay, on 8 August 1942. 📌 Gowalia Tank is also called August Kranti Ground. ❌ Wardha is tempting because the Working Committee passed its first resolution there on 14 July."
  },
  21: {
    questext: "Who gave the call 'Do or Die' in 1942?",
    options: ["Subhas Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru", "Vallabhbhai Patel"],
    correct: "2",
    exptext: "✅ Gandhi gave the call at Gowalia Tank. 📌 Do or Die, Gandhi. ❌ Bose is tempting because his slogan was Give me blood and I shall give you freedom."
  },
  22: {
    questext: "Consider the following statements:\n1. Quit India was launched in 1942, and Gandhi gave the slogan Do or Die.\n2. Jayaprakash Narayan escaped from Hazaribagh Jail and formed the Azad Dasta.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. 📌 1942, Do or Die, Azad Dasta. ❌ Only one is a tempting answer, but both facts are standard."
  },
  23: {
    type: "concept", icon: "🏴", accent: "#ec4899", pauseTimer: true,
    title: "Quit India Movement (1942): Parallel Governments and Appraisal",
    html: `
      <p class="cp-lead">The leaders were in jail, but the people kept the movement alive. <u>In some places they even set up their own governments.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/15.png" alt="Usha Mehta Congress Radio 1942 photo" data-caption="Usha Mehta, who ran the secret Congress Radio in Bombay in 1942." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/16.png" alt="Table-style picture: three rows Ballia 1942, Tamluk 1942-44, Satara 1943-45 with leaders." data-caption="The three famous parallel governments of the Quit India Movement." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Place</th><th>Detail</th></tr></thead><tbody><tr><td>Ballia (Uttar Pradesh)</td><td>August 1942, the first, under Chittu Pandey, lasted about a week</td></tr><tr><td>Tamluk (Midnapore)</td><td>December 1942 to September 1944, called the Jatiya Sarkar; cyclone relief, school grants, Bidyut Bahinis</td></tr><tr><td>Satara</td><td>Mid-1943 to 1945, called the Prati Sarkar, led by Y. B. Chavan and Nana Patil; the longest</td></tr><tr><td>Talcher (Odisha)</td><td>Briefly</td></tr></tbody></table>
      <p class="cp-lead">The underground leaders were Ram Manohar Lohia, Jayaprakash Narayan, Aruna Asaf Ali, Biju Patnaik, Achyut Patwardhan, Sucheta Kripalani and R. P. Goenka. Usha Mehta ran the <b>Congress Radio</b> from Bombay on <b>42.34 metres</b>, from August to November 1942.</p>
      <p class="cp-lead">In February 1943 Gandhi kept a 21-day fast, and it ended on 7 March 1943. In May 1944 he was released, and Kasturba and Mahadev Desai died in prison.</p>
      <p class="cp-lead">The base of the movement was youth, students, women and peasants. There was no attack on landlords and no communal clash. It was opposed by the League (Divide and Quit, Karachi, December 1943), the Communist Party of India, the Hindu Mahasabha and Ambedkar.</p>
      <p class="cp-lead">The Government fired on 538 occasions, and about 900 persons died. Quit India was called the <b>last mass people's movement</b>.</p>
      <div class="cp-note trap">Ballia was the first parallel government (a week), and Satara was the longest.</div>
    `
  },
  24: {
    questext: "Which was the longest-running parallel government of the Quit India Movement?",
    options: ["Ballia", "Tamluk", "Satara", "Talcher"],
    correct: "3",
    exptext: "✅ The Prati Sarkar of Satara lasted from 1943 to 1945. 📌 S for Satara, S for survived. ❌ Tamluk is tempting but it ended in 1944."
  },
  25: {
    questext: "Who ran the Congress Radio from Bombay during the Quit India Movement?",
    options: ["Aruna Asaf Ali", "Sucheta Kripalani", "Usha Mehta", "Sarojini Naidu"],
    correct: "3",
    exptext: "✅ Usha Mehta ran the secret radio on 42.34 metres. 📌 U for Usha, U for underground. ❌ Aruna Asaf Ali is tempting because she was also underground, but she hoisted the flag."
  },
  26: {
    questext: "The first parallel government in the Quit India Movement was set up at which place?",
    options: ["Ballia", "Satara", "Midnapore", "Talcher"],
    correct: "1",
    exptext: "✅ Ballia in Uttar Pradesh, under Chittu Pandey, was the first, in August 1942. 📌 B for Ballia, B for the beginning. ❌ Satara is tempting but it came later and lasted longer."
  },
  27: {
    type: "concept", icon: "🪖", accent: "#06b6d4", pauseTimer: true,
    title: "Indian National Army and Subhas Chandra Bose",
    html: `
      <p class="cp-lead">The Indian National Army was an army of Indian prisoners of war and civilians in South-East Asia. <u>Its leader was Subhas Chandra Bose.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/17.png" alt="Subhas Chandra Bose Netaji INA uniform photo" data-caption="Subhas Chandra Bose in the uniform of the Indian National Army." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/18.png" alt="Rani of Jhansi Regiment Lakshmi Sahgal photo" data-caption="Captain Lakshmi Sahgal, who led the Rani Jhansi Regiment of the Indian National Army." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/19.png" alt="Timeline: 1 Sep 1942 Mohan Singh INA; Jul 1943 Bose takes command; 21 Oct 1943 Azad Hind; " data-caption="The main dates of the Indian National Army in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Subhas Chandra Bose</b> was born in 1897 in Bengal, studied at Calcutta University and Cambridge, cleared the Indian Civil Service exam and resigned, refusing the emblem of servitude. His guru was Chittaranjan Das. In 1928 he demanded complete independence. He was president at <b>Haripura in 1938</b>, and re-elected at <b>Tripuri in 1939</b> over Pattabhi Sitaramayya. Tagore called him <b>Deshnayak</b>.</p>
      <p class="cp-lead"><b>Captain Mohan Singh</b> founded the Indian National Army at <b>Singapore on 1 September 1942</b> with Indian prisoners of war, encouraged by Major Fujiwara. At the Tokyo Conference, Rash Behari Bose formed the Indian Independence League and the army; Bose took command in <b>July 1943</b>.</p>
      <p class="cp-lead">On <b>21 October 1943</b> Bose announced the <b>Provisional Government of Free India (Azad Hind)</b>, recognised by <b>nine governments</b>, with headquarters at Rangoon and Singapore. The slogans were <b>Delhi Chalo</b> and <b>Give me blood and I shall give you freedom</b>. Japan gave the Andaman and Nicobar Islands, renamed Shahid and Swaraj. The Rani Jhansi Regiment was led by Captain Lakshmi Sahgal. There were brigades named after Subhas, Nehru and Gandhi, and the flag was hoisted at <b>Moirang, Manipur, in April 1944</b>.</p>
      <p class="cp-lead">On 18 August 1945, after Hiroshima and Nagasaki, Bose's aircraft reportedly crashed in Formosa (Taiwan). His death remains a mystery. At the <b>Red Fort trials</b> from November 1945 to May 1946, Shah Nawaz Khan, Prem Sahgal and Gurbaksh Singh Dhillon were defended by Nehru, Bhulabhai Desai and Tej Bahadur Sapru, and public support forced their release.</p>
      <div class="cp-note trap">Mohan Singh founded the army on 1 September 1942, but Bose took command in July 1943, and Azad Hind was declared on 21 October 1943.</div>
    `
  },
  28: {
    questext: "Who founded the Indian National Army at Singapore on 1 September 1942?",
    options: ["Rash Behari Bose", "Subhas Chandra Bose", "Captain Mohan Singh", "Major Fujiwara"],
    correct: "3",
    exptext: "✅ Captain Mohan Singh founded the first army with Indian prisoners of war. 📌 Mohan Singh first, Subhas later. ❌ Subhas Chandra Bose is tempting because he is famous, but he took command in 1943."
  },
  29: {
    questext: "The Provisional Government of Free India (Azad Hind) was announced on which date?",
    options: ["1 September 1942", "21 October 1943", "18 August 1945", "8 August 1942"],
    correct: "2",
    exptext: "✅ Bose announced it on 21 October 1943. 📌 21 October, Azad Hind. ❌ 1 September 1942 is tempting because that was the founding of the army."
  },
  30: {
    questext: "Who led the Rani Jhansi Regiment of the Indian National Army?",
    options: ["Captain Lakshmi Sahgal", "Aruna Asaf Ali", "Sarojini Naidu", "Usha Mehta"],
    correct: "1",
    exptext: "✅ Captain Lakshmi Sahgal (Swaminathan) led the regiment. 📌 Rani, Lakshmi, the queen's name. ❌ Aruna Asaf Ali is tempting but she was in Quit India."
  },
  31: {
    questext: "Which of the following were defended by Nehru, Bhulabhai Desai and Tej Bahadur Sapru at the Red Fort trials?",
    options: ["Rash Behari Bose and Mohan Singh", "Shah Nawaz Khan, Prem Sahgal and Gurbaksh Singh Dhillon", "Bhagat Singh and Sukhdev", "Surya Sen and Pritilata"],
    correct: "2",
    exptext: "✅ These three Indian National Army officers were tried at the Red Fort. 📌 Shah Nawaz, Sahgal and Dhillon. ❌ Rash Behari Bose is tempting but he was not tried."
  },
  32: {
    type: "concept", icon: "🧩", accent: "#84cc16", pauseTimer: true,
    title: "C. R. Formula (1944) and Wavell Plan (1945)",
    html: `
      <p class="cp-lead">By 1944 Congress and the League were deadlocked. <u>Two plans tried to break the deadlock.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/20.png" alt="C. Rajagopalachari portrait photo" data-caption="C. Rajagopalachari, who put forward the formula of 1944." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/21.png" alt="Shimla Conference 1945 Wavell Jinnah Azad photo" data-caption="Leaders at the Shimla Conference in June 1945." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/22.png" alt="Flow: C. R. Formula 1944, Gandhi-Jinnah talks fail; Wavell Plan 14 June 1945, Shimla Confe" data-caption="The two attempts to end the political deadlock in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>C. Rajagopalachari (Rajaji)</b>, with Gandhi's approval, put a plan in 1944. The League would endorse independence and join a provisional government at the Centre. A post-war plebiscite would be held in the Muslim-majority areas of the North-West and North-East, and there would be joint safeguards for defence, commerce and communications. It would be valid only if England transferred full powers.</p>
      <p class="cp-lead">The Gandhi–Jinnah talks failed in two weeks, and Jinnah refused a termite-infested, rotten Pakistan.</p>
      <p class="cp-lead"><b>Lord Wavell</b> replaced Linlithgow in October 1943, and announced the <b>Wavell Plan</b> on <b>14 June 1945</b>. A new Executive Council would have all Indians except the Viceroy and the Commander-in-Chief, with equal caste Hindus and Muslims, an Indian member for Foreign Affairs and Defence under a British general, within the Act of 1935.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Shimla Conference</td><td>25 June 1945, 21 leaders</td></tr><tr><td>Congress</td><td>Maulana Azad</td></tr><tr><td>League</td><td>Jinnah, claiming to be the sole representative of Muslims</td></tr><tr><td>Result</td><td>Failed on 14 July 1945</td></tr></tbody></table>
      <p class="cp-lead">Gandhi was not at the conference although he was in Shimla. The British general election of 1945 brought the Labour Party to power, which sent the Cabinet Mission.</p>
      <div class="cp-note trap">The Wavell Plan was announced on 14 June 1945, the Shimla Conference began on 25 June, and it failed on 14 July.</div>
    `
  },
  33: {
    questext: "The C. R. Formula of 1944 was put forward by whom?",
    options: ["C. Rajagopalachari", "Jawaharlal Nehru", "Jinnah", "Lord Wavell"],
    correct: "1",
    exptext: "✅ C. Rajagopalachari, with Gandhi's approval, put the plan to Jinnah. 📌 C. R. is the name of the formula. ❌ Wavell is tempting but his plan came a year later."
  },
  34: {
    questext: "The Shimla Conference of 1945 failed because of which demand?",
    options: ["The League claimed to be the sole representative of Muslims", "Congress refused to attend", "Gandhi refused to speak", "The Princes left"],
    correct: "1",
    exptext: "✅ Jinnah insisted that only the League could name Muslim members. 📌 Sole voice, no deal. ❌ Congress refusal is tempting but Maulana Azad attended."
  },
  35: {
    questext: "Consider the following statements:\n1. The Wavell Plan proposed equal representation of caste Hindus and Muslims in the Executive Council.\n2. Lord Wavell replaced Lord Linlithgow in October 1943.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Wavell came in 1943, his plan in 1945. ❌ Only one is a tempting answer but both facts are standard."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a vintage microphone with a radio dial, a rolled parchment and a faded tricolour flag in warm light" },
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Allama Muhammad Iqbal portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/1.png. clear portrait of Allama Muhammad Iqbal",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chaudhary Rahmat Ali Cambridge portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/2.png. portrait of Chaudhary Rahmat Ali",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/3.png": { t: "fig", about: "Timeline: 29 December 1930 Iqbal at Allahabad; 1933 Now or Never; 1937 election; 23 March 1940 Lahore Resolution; 23 March 1943 Pakistan Day." },
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Subhas Chandra Bose Berlin 1941 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/4.png. Subhas Chandra Bose in Germany",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/5.png": { t: "fig", about: "Three-column chart: Congress conditional support; Muslim League full support; Hindu Mahasabha unconditional support." },
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Linlithgow Viceroy portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/6.png. portrait of Lord Linlithgow",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/7.png": { t: "fig", about: "Chart: left side Offer items (expanded Executive Council, War Advisory Council, post-war constitution body); right side Congress, League response: rejected." },
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vinoba Bhave portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/8.png. portrait of Vinoba Bhave",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/9.png": { t: "fig", about: "Chart with three boxes: First Satyagrahi Vinoba Bhave; Second Jawaharlal Nehru; Third Brahma Dutt." },
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Stafford Cripps 1942 India arrival photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/10.png. Stafford Cripps in India",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/11.png": { t: "fig", about: "Flow: Japan takes Singapore and Burma, Churchill announces Cripps 11 March, Cripps arrives 22 March, talks fail." },
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gowalia Tank Maidan Bombay August Kranti Maidan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/12.png. the ground at Mumbai",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aruna Asaf Ali hoisting flag Gowalia Tank photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/13.png. Aruna Asaf Ali",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/14.png": { t: "fig", about: "Timeline: 14 July 1942 Wardha; 8 August Gowalia Tank; 9 August Operation Zero Hour." },
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Usha Mehta Congress Radio 1942 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/15.png. Usha Mehta at the underground radio",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/16.png": { t: "fig", about: "Table-style picture: three rows Ballia 1942, Tamluk 1942-44, Satara 1943-45 with leaders." },
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Subhas Chandra Bose Netaji INA uniform photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/17.png. Netaji in INA uniform",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rani of Jhansi Regiment Lakshmi Sahgal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/18.png. Captain Lakshmi Sahgal",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/19.png": { t: "fig", about: "Timeline: 1 Sep 1942 Mohan Singh INA; Jul 1943 Bose takes command; 21 Oct 1943 Azad Hind; 18 Aug 1945 air crash." },
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"C. Rajagopalachari portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/20.png. clear portrait of C. Rajagopalachari",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shimla Conference 1945 Wavell Jinnah Azad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/21.png. leaders at the Shimla Conference",
  "images/General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition/22.png": { t: "fig", about: "Flow: C. R. Formula 1944, Gandhi-Jinnah talks fail; Wavell Plan 14 June 1945, Shimla Conference 25 June, failure 14 July." }
});

/* CHANGE LOG
   - Ramgarh session of March 1940 is placed in Bihar at the time (today in Jharkhand).
   - Subhas Chandra Bose is given as born in 1897 in Cuttack, in the Bengal Presidency of that time.
*/