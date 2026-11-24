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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Governor_Generals_and_Viceroys_of_India · 12 concept pages (+ overview) · 37 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "👑", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Governor-Generals and Viceroys of India",
    thumb: {
      image: "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/thumbnail.png",
      banner: "MODERN INDIA 2026",
      line1: "GOVERNOR-GENERALS",
      line2: "& VICEROYS",
      line3: "1757 TO 1947",
      badge: "FULL CLASS",
      ribbon: "WHO DID WHAT • ACTS • YEARS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Governor Generals and Viceroys of India | Clive to Mountbatten | SSC CGL",
      altTitles: ["All Viceroys of India with Acts and Events in One Class", "Governor General vs Viceroy Which Act Created Which Office"],
      description: "Governor-Generals and Viceroys is one of the most repeated topics in Staff Selection Commission papers. In this class we go from Robert Clive to Lord Mountbatten and learn the wars, laws and reforms of each ruler, step by step, in very simple words.\n\n📌 IN THIS CLASS\n✅ Governors of Bengal\n✅ Governor-Generals of Bengal and of India\n✅ All Viceroys with events\n✅ Which Act created which office\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernIndia #Viceroys",
      tags: ["governor generals of india", "viceroys of india", "list of viceroys", "warren hastings", "lord cornwallis", "lord wellesley", "william bentinck", "lord dalhousie", "doctrine of lapse", "lord canning", "lord curzon", "lord ripon", "lord mountbatten", "regulating act 1773", "charter act 1833", "modern india history", "ssc cgl history", "history for ssc", "static gk", "general awareness", "railway ntpc history", "banking exams gk", "modern india one shot", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "Governor Generals and Vic"],
      hashtags: ["SSCCGL", "ModernIndia", "Viceroys"],
      thumbText: "VICEROYS OF INDIA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Governor-Generals and Viceroys, from Clive to Mountbatten. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the rulers of British India from Robert Clive to Lord Mountbatten</u>. For each ruler we learn the wars, the laws and the reforms linked to his name, because this is how the exam asks the questions.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>12</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>37</b><span>Questions</span></div>
        <div class="cp-stat"><b>~61 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Governors of Bengal (1757–1773)</b><br>Robert Clive, the Battle of Plassey and dual government.</li>
        <li><b>Governor-Generals of Bengal (1773–1833)</b><br>From Warren Hastings to Lord William Bentinck: wars, treaties and reforms.</li>
        <li><b>Governor-Generals of India (1833–1858)</b><br>Lord Dalhousie and Lord Canning, and the Revolt of 1857.</li>
        <li><b>Viceroys of India (1858–1947)</b><br>From Lord Canning to Lord Mountbatten, grouped by era.</li>
        <li><b>Acts, Offices and Exam Facts</b><br>Which Act created which office, and the traps to avoid.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Staff Selection Commission papers ask 'Who was the Viceroy when this happened?' almost every year, so this one chapter gives you easy marks across History.</div>
    `
  },
  2: {
    type: "concept", icon: "🏰", accent: "#ef4444", pauseTimer: true,
    title: "Governors of Bengal (1757–1773)",
    html: `
      <p class="cp-lead">After the Battle of Plassey the Company's servants in Bengal were headed by a <b>Governor of Bengal</b>. <u>He answered only to the Court of Directors in London.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/1.png" alt="Robert Clive portrait painting" data-caption="Robert Clive, the first Governor of Bengal after the Battle of Plassey." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/2.png" alt="Battle of Plassey 1757 painting Clive Mir Jafar" data-caption="Robert Clive meeting Mir Jafar after the Battle of Plassey in 1757." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/3.png" alt="Timeline: 1757 Plassey; 1764 Buxar; 1765 Treaty of Allahabad and dual government; 1767 Cli" data-caption="Main events of Robert Clive's time in Bengal in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Robert Clive</b> served twice, from 1757 to 1760 and from 1765 to 1767. He won the <b>Battle of Plassey in 1757</b>. The <b>Battle of Buxar</b> was fought in 1764 when Vansittart was governor, and the <b>Treaty of Allahabad in 1765</b> gave the Company the right to collect revenue.</p>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>First tenure</td><td>1757 to 1760</td></tr><tr><td>Second tenure</td><td>1765 to 1767</td></tr><tr><td>Government system</td><td>Dual governance in Bengal, 1765</td></tr><tr><td>Rule for employees</td><td>Gifts from Indians were banned</td></tr><tr><td>Trade</td><td>A society for trade founded in Bengal, 1767</td></tr><tr><td>Death</td><td>Clive died by suicide in 1774</td></tr></tbody></table>
      <div class="cp-note tip">Dual governance means the Company had the real power of revenue, while the Nawab had the duty of law and order, without the power to do it.</div>
      <div class="cp-note trap">Plassey (1757) was fought by Clive, but Buxar (1764) was under Vansittart. Do not give both to Clive.</div>
    `
  },
  3: {
    questext: "Which Governor of Bengal won the Battle of Plassey in 1757?",
    options: ["Robert Clive", "Warren Hastings", "Vansittart", "Lord Cornwallis"],
    correct: "1",
    exptext: "✅ Robert Clive led the Company to victory at Plassey in 1757. 📌 Clive, Plassey. ❌ Vansittart is tempting because he was governor during Buxar, but the battle of Plassey was before him."
  },
  4: {
    questext: "Dual governance in Bengal was introduced in which year?",
    options: ["1757", "1764", "1765", "1773"],
    correct: "3",
    exptext: "✅ After the Treaty of Allahabad, Clive introduced dual governance in 1765. 📌 1765, Allahabad, dual. ❌ 1764 is tempting because it is the year of Buxar."
  },
  5: {
    type: "concept", icon: "📘", accent: "#f97316", pauseTimer: true,
    title: "Governor-Generals of Bengal: Warren Hastings, Cornwallis and Shore",
    html: `
      <p class="cp-lead">The Regulating Act of 1773 made the Governor of Bengal into the <b>Governor-General of Bengal</b>. <u>The Presidencies of Bombay and Madras were placed under him.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/4.png" alt="Warren Hastings portrait painting" data-caption="Warren Hastings, the first Governor-General of Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/5.png" alt="Lord Cornwallis portrait painting" data-caption="Lord Cornwallis, who introduced the Permanent Settlement in 1793." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/6.png" alt="Three-column chart: Hastings 1772-85; Cornwallis 1786-93; Shore 1793-98, each with two key" data-caption="The key events of the first three Governor-Generals of Bengal side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Governor-General</th><th>Key events, Acts and reforms</th></tr></thead><tbody><tr><td>Warren Hastings, 1772–1785</td><td>Regulating Act 1773; Act of 1781; Pitt's India Act 1784; Rohilla War 1774; First Maratha War 1775–82 and Treaty of Salbai 1782; Second Mysore War 1780–84; strained relations with Chait Singh, Maharaja of Benaras; impeached in England; Asiatic Society of Bengal 1784</td></tr><tr><td>Lord Cornwallis, 1786–1793</td><td>Third Mysore War 1790–92 and Treaty of Seringapatam 1792; Cornwallis Code 1793; judicial reforms separating revenue administration from civil jurisdiction; Permanent Settlement of Bengal 1793; Europeanisation of the administrative machinery and the civil services</td></tr><tr><td>Sir John Shore, 1793–1798</td><td>Charter Act 1793; Battle of Kharda between the Nizam and the Marathas, 1795</td></tr></tbody></table>
      <div class="cp-note trap">The first Maratha War was fought under Warren Hastings and the Second Mysore War too, but the Third Mysore War was under Cornwallis.</div>
    `
  },
  6: {
    questext: "Who founded the Asiatic Society of Bengal in 1784?",
    options: ["Lord Cornwallis", "Lord Bentinck", "Lord Wellesley", "Sir William Jones, in the time of Warren Hastings"],
    correct: "4",
    exptext: "✅ It was founded in 1784 in the time of Warren Hastings. 📌 Hastings and scholars. ❌ Cornwallis is tempting but he is known for the Permanent Settlement."
  },
  7: {
    questext: "The Treaty of Seringapatam of 1792 ended which war?",
    options: ["First Mysore War", "Third Mysore War", "Second Mysore War", "Fourth Mysore War"],
    correct: "2",
    exptext: "✅ Cornwallis fought the Third Mysore War, from 1790 to 1792. 📌 Cornwallis, third. ❌ The Fourth Mysore War is tempting but it ended with the death of Tipu in 1799."
  },
  8: {
    questext: "The Permanent Settlement of Bengal was introduced in which year by Lord Cornwallis?",
    options: ["1793", "1784", "1773", "1798"],
    correct: "1",
    exptext: "✅ The Permanent Settlement was introduced in 1793. 📌 Permanent, 1793. ❌ 1784 is tempting because it was Pitt's India Act."
  },
  9: {
    type: "concept", icon: "⚔️", accent: "#10b981", pauseTimer: true,
    title: "Governor-Generals of Bengal: Wellesley, Barlow and Minto I",
    html: `
      <p class="cp-lead">The next three Governor-Generals used war and treaties to spread British power. <u>Lord Wellesley was the main empire-builder.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/7.png" alt="Lord Wellesley portrait painting" data-caption="Lord Wellesley, who began the Subsidiary Alliance system in 1798." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/8.png" alt="Vellore Fort Tamil Nadu photo" data-caption="Vellore Fort, where sepoys mutinied against the British in 1806." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/9.png" alt="Flow: Subsidiary Alliance 1798 with the Nizam; Fourth Mysore War 1799; Second Maratha War " data-caption="The main steps of Lord Wellesley's expansion in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Governor-General</th><th>Key events</th></tr></thead><tbody><tr><td>Lord Wellesley, 1798–1805</td><td>Subsidiary Alliance 1798, first with the Nizam of Hyderabad; Fourth Mysore War 1799; Second Maratha War 1803–05; took over Tanjore 1799, Surat 1800, Carnatic 1801; Treaty of Bassein 1802</td></tr><tr><td>Sir George Barlow, 1805–1807</td><td>Vellore Mutiny 1806</td></tr><tr><td>Lord Minto I, 1807–1813</td><td>Treaty of Amritsar with Ranjit Singh, 1809</td></tr></tbody></table>
      <div class="cp-note trap">Minto I (1807–13, Treaty of Amritsar 1809) is different from Minto II (1905–10, Surat Split). Do not mix them.</div>
    `
  },
  10: {
    questext: "The Subsidiary Alliance system was introduced by whom?",
    options: ["Lord Cornwallis", "Lord Dalhousie", "Lord Wellesley", "Lord Hastings"],
    correct: "3",
    exptext: "✅ Lord Wellesley began it in 1798, first with the Nizam of Hyderabad. 📌 Wellesley, wealth of states. ❌ Dalhousie is tempting because he used the Doctrine of Lapse, a different tool."
  },
  11: {
    questext: "The Treaty of Amritsar of 1809 was signed with whom?",
    options: ["Tipu Sultan", "Daulat Rao Sindhia", "The Nizam", "Ranjit Singh"],
    correct: "4",
    exptext: "✅ Lord Minto I signed it with Maharaja Ranjit Singh, fixing the Sutlej as a border. 📌 Amritsar, Ranjit Singh. ❌ Sindhia is tempting because of the Maratha wars."
  },
  12: {
    questext: "The Vellore Mutiny of 1806 took place during whose time?",
    options: ["Lord Wellesley", "Sir George Barlow", "Lord Amherst", "Lord Bentinck"],
    correct: "2",
    exptext: "✅ Sir George Barlow was Governor-General in 1806. 📌 Barlow, Vellore. ❌ Lord Bentinck is tempting because the Vellore Mutiny involved dress and customs, but he was Governor of Madras then, not Governor-General."
  },
  13: {
    type: "concept", icon: "🛡️", accent: "#8b5cf6", pauseTimer: true,
    title: "Governor-Generals of Bengal: Hastings, Amherst and Bentinck",
    html: `
      <p class="cp-lead">These three ruled in the years of peace and reform. <u>Lord William Bentinck became the last Governor-General of Bengal and the first of India.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/10.png" alt="Lord William Bentinck portrait painting" data-caption="Lord William Bentinck, who abolished sati in 1829." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/11.png" alt="Sati abolition 1829 Raja Ram Mohan Roy illustration" data-caption="Raja Ram Mohan Roy, whose campaign helped Bentinck to abolish sati." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/12.png" alt="Timeline: 1813-23 Hastings; 1823-28 Amherst; 1829 sati abolished; 1830 thugi suppressed; 1" data-caption="Key years of the last three Governor-Generals of Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Governor-General</th><th>Key events</th></tr></thead><tbody><tr><td>Lord Hastings, 1813–1823</td><td>Anglo-Nepal War 1814–16 and Treaty of Sangauli 1816; Third Maratha War 1817–19; Maratha Confederacy dissolved 1818; Bombay Presidency created 1818; fight against the Pindaris 1817–18; Treaty with Sindhia 1817; Ryotwari System established by Thomas Munro, Governor of Madras, 1820</td></tr><tr><td>Lord Amherst, 1823–1828</td><td>First Burmese War 1824–26; capture of Bharatpur 1826</td></tr><tr><td>Lord William Bentinck, 1828–1835</td><td>Abolition of Sati 1829; suppression of thugi 1830; Charter Act 1833; Resolution of 1835 with English as the official language; annexation of Mysore 1831, Coorg 1834 and Central Cachar 1834</td></tr></tbody></table>
      <div class="cp-note trap">Warren Hastings (1772–85, Regulating Act) is different from Lord Hastings (1813–23, Sangauli, Third Maratha War).</div>
    `
  },
  14: {
    questext: "Sati was abolished in which year by Lord William Bentinck?",
    options: ["1829", "1813", "1835", "1856"],
    correct: "1",
    exptext: "✅ Bentinck abolished Sati in 1829. 📌 Sati stopped, 1829. ❌ 1856 is tempting because it was the year of the Widow Remarriage Act under Dalhousie."
  },
  15: {
    questext: "The Treaty of Sangauli of 1816 ended which war?",
    options: ["First Afghan War", "First Burmese War", "Anglo-Nepal War", "Third Mysore War"],
    correct: "3",
    exptext: "✅ The Anglo-Nepal War, from 1814 to 1816, ended with the Treaty of Sangauli under Lord Hastings. 📌 Sangauli, Nepal. ❌ The First Burmese War is tempting but it was under Amherst."
  },
  16: {
    questext: "Who was the last Governor-General of Bengal and the first Governor-General of India?",
    options: ["Lord Cornwallis", "Lord Wellesley", "Lord Dalhousie", "Lord William Bentinck"],
    correct: "4",
    exptext: "✅ The Charter Act of 1833 made Bentinck the Governor-General of India. 📌 Bentinck is last and first. ❌ Dalhousie is tempting because he came right after, but he was the Governor-General of India only."
  },
  17: {
    type: "concept", icon: "🔥", accent: "#eab308", pauseTimer: true,
    title: "Governor-Generals of India: Lord Dalhousie (1848–1856)",
    html: `
      <p class="cp-lead">Lord Dalhousie changed India more than any other ruler. <u>He used the Doctrine of Lapse to take over states and brought railways, telegraph and post.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/13.png" alt="Lord Dalhousie portrait painting" data-caption="Lord Dalhousie, Governor-General of India from 1848 to 1856." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/14.png" alt="First train Bombay Thane 1853 illustration" data-caption="The first train in India ran from Bombay to Thane in 1853." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/15.png" alt="Map-style schematic, not a map: states annexed by the Doctrine of Lapse with years: Satara" data-caption="The states taken over by the Doctrine of Lapse with their years." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Area</th><th>Key events</th></tr></thead><tbody><tr><td>Doctrine of Lapse</td><td>Satara 1848; Jaitpur and Sambalpur 1849; Udaipur 1852; Jhansi 1853; Nagpur 1854; Awadh 1856 (taken for misrule, not lapse)</td></tr><tr><td>Education</td><td>Wood's Educational Despatch 1854 (Charles Wood, President of the Board of Control); Anglo-vernacular schools and government colleges; universities plan</td></tr><tr><td>Communications</td><td>Telegraph; 4,000 miles linking Calcutta with Bombay, Madras and Peshawar; Post Office Act 1854; first railway 1853</td></tr><tr><td>Social</td><td>Widow Remarriage Act 1856</td></tr></tbody></table>
      <div class="cp-note trap">Wood's Despatch 1854, Post Office Act 1854 and Widow Remarriage Act 1856 are all Dalhousie's. The three universities of 1857 came under Canning.</div>
    `
  },
  18: {
    questext: "Which Governor-General introduced the Doctrine of Lapse?",
    options: ["Lord Wellesley", "Lord Dalhousie", "Lord Canning", "Lord Hastings"],
    correct: "2",
    exptext: "✅ Lord Dalhousie used it from 1848 to take states without a natural heir. 📌 Dalhousie, dying states. ❌ Wellesley is tempting but his tool was the Subsidiary Alliance."
  },
  19: {
    questext: "Which of the following was annexed through the Doctrine of Lapse in 1854?",
    options: ["Nagpur", "Jhansi", "Satara", "Sambalpur"],
    correct: "1",
    exptext: "✅ Nagpur was annexed in 1854. 📌 Nagpur 54. ❌ Jhansi is tempting but it was taken in 1853."
  },
  20: {
    questext: "Wood's Educational Despatch was issued in which year?",
    options: ["1835", "1857", "1854", "1882"],
    correct: "3",
    exptext: "✅ It was issued in 1854 under Lord Dalhousie. 📌 Wood, 1854. ❌ 1835 is tempting because it was Macaulay's English education decision under Bentinck."
  },
  21: {
    type: "concept", icon: "🌪️", accent: "#14b8a6", pauseTimer: true,
    title: "Governor-Generals of India: Lord Canning and the Revolt of 1857",
    html: `
      <p class="cp-lead">Lord Canning was the last Governor-General of India and the first Viceroy. <u>He ruled through the Revolt of 1857 and the change from Company rule to Crown rule.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/16.png" alt="Lord Canning portrait painting" data-caption="Lord Canning, the last Governor-General and first Viceroy of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/17.png" alt="Revolt of 1857 Lucknow Residency ruins photo" data-caption="The ruined Residency at Lucknow, a place of fighting in the Revolt of 1857." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Under Canning (1856–1862) the universities of <b>Calcutta, Madras and Bombay</b> were founded in 1857, and the <b>Revolt of 1857</b> broke out. Control passed from the East India Company to the Crown by the <b>Government of India Act, 1858</b>. The White Mutiny of European troops came in 1859, and the <b>Indian Councils Act, 1861</b> was passed.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1856</td><td>Canning becomes Governor-General</td></tr><tr><td>1857</td><td>Three universities; Revolt</td></tr><tr><td>1858</td><td>Government of India Act; Canning is called Viceroy</td></tr><tr><td>1859</td><td>White Mutiny by European troops</td></tr><tr><td>1861</td><td>Indian Councils Act</td></tr></tbody></table>
      <div class="cp-note tip">From 1858 the Governor-General also carried the title Viceroy, which means a ruler who represents the Crown directly. Canning was the same man under a new title.</div>
    `
  },
  22: {
    questext: "The universities of Calcutta, Madras and Bombay were established in which year?",
    options: ["1854", "1882", "1861", "1857"],
    correct: "4",
    exptext: "✅ They were founded in 1857 during Canning's time. 📌 Three universities, three presidency cities, 1857. ❌ 1854 is tempting because of Wood's Despatch, which only planned them."
  },
  23: {
    questext: "Who was the first Viceroy of India?",
    options: ["Lord Dalhousie", "Lord Canning", "Lord Lawrence", "Lord Mayo"],
    correct: "2",
    exptext: "✅ Lord Canning was the first Viceroy, from 1858. 📌 Canning, last Governor-General, first Viceroy. ❌ Dalhousie is tempting but he left before the Crown took over."
  },
  24: {
    type: "concept", icon: "🏛️", accent: "#0ea5e9", pauseTimer: true,
    title: "Viceroys of India: Lawrence to Lansdowne (1863–1894)",
    html: `
      <p class="cp-lead">These six Viceroys were important because of laws that touched the press, local government and the Indian National Congress. <u>Learn them in order.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/18.png" alt="Lord Ripon portrait painting" data-caption="Lord Ripon, called the Father of Local Self-Government in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/19.png" alt="Row of six boxes: Lawrence 1863-69; Mayo 1869-72; Northbrook 1872-76; Lytton 1876-80; Ripo" data-caption="Seven Viceroys in order with one key word each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Viceroy</th><th>Key events</th></tr></thead><tbody><tr><td>Sir John Lawrence, 1863–1869</td><td>High Courts at Calcutta, Bombay and Madras, 1865</td></tr><tr><td>Lord Mayo, 1869–1872</td><td>Statistical Survey of India; State Railways; assassinated in office at Port Blair in 1872 by Sher Ali Afridi</td></tr><tr><td>Lord Northbrook, 1872–1876</td><td>Kuka Movement in Punjab</td></tr><tr><td>Lord Lytton, 1876–1880</td><td>Delhi Durbar 1877, when Queen Victoria was proclaimed Kaiser-i-Hind; Vernacular Press Act 1878; Arms Act 1878; Second Afghan War 1878–80</td></tr><tr><td>Lord Ripon, 1880–1884</td><td>Repeal of Vernacular Press Act 1882; first Factory Act 1881; first regular Census 1881; Local Self-Government Resolution 1882; Ilbert Bill controversy 1883–84</td></tr><tr><td>Lord Dufferin, 1884–1888</td><td>Indian National Congress established 1885</td></tr><tr><td>Lord Lansdowne, 1888–1894</td><td>Indian Councils Act 1892</td></tr></tbody></table>
      <div class="cp-note trap">Lytton imposed the Vernacular Press Act in 1878, and Ripon repealed it in 1882.</div>
    `
  },
  25: {
    questext: "The Vernacular Press Act of 1878 was passed under which Viceroy?",
    options: ["Lord Lytton", "Lord Ripon", "Lord Dufferin", "Lord Mayo"],
    correct: "1",
    exptext: "✅ Lord Lytton passed it in 1878, and Ripon repealed it. 📌 Lytton, lock on press. ❌ Ripon is tempting because he is linked to the same Act, but he repealed it."
  },
  26: {
    questext: "Who is known as the Father of Local Self-Government in India?",
    options: ["Lord Mayo", "Lord Curzon", "Lord Ripon", "Lord Dufferin"],
    correct: "3",
    exptext: "✅ Lord Ripon passed the Local Self-Government Resolution in 1882. 📌 Ripon, local. ❌ Lord Mayo is tempting because he began financial decentralisation, but the title is Ripon's."
  },
  27: {
    questext: "The Indian National Congress was established in 1885 during the Viceroyalty of whom?",
    options: ["Lord Lansdowne", "Lord Ripon", "Lord Curzon", "Lord Dufferin"],
    correct: "4",
    exptext: "✅ Lord Dufferin was Viceroy in 1885. 📌 Dufferin, Congress. ❌ Lansdowne is tempting but the Indian Councils Act of 1892 was his work."
  },
  28: {
    questext: "Which Viceroy was assassinated at Port Blair in 1872?",
    options: ["Lord Northbrook", "Lord Mayo", "Lord Lytton", "Lord Lawrence"],
    correct: "2",
    exptext: "✅ Lord Mayo was killed by Sher Ali Afridi and was the only Viceroy assassinated in office. 📌 Mayo, murdered. ❌ Northbrook is tempting because he followed him in office."
  },
  29: {
    type: "concept", icon: "🧭", accent: "#ec4899", pauseTimer: true,
    title: "Viceroys of India: Curzon, Minto II and Hardinge II (1899–1916)",
    html: `
      <p class="cp-lead">These three Viceroys ruled in the years of the Swadeshi and nationalist movements. <u>The Partition of Bengal was the turning point.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/20.png" alt="Lord Curzon portrait Viceroy photo" data-caption="Lord Curzon, the Viceroy who divided Bengal in 1905." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/21.png" alt="Delhi Durbar 1911 King George V photo" data-caption="The Delhi Durbar of 1911, where the capital was moved from Calcutta to Delhi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/22.png" alt="Timeline: 1905 Partition of Bengal; 1906 Muslim League; 1907 Surat Split; 1911 capital shi" data-caption="Key events from 1905 to 1915 in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Viceroy</th><th>Key events</th></tr></thead><tbody><tr><td>Lord Curzon, 1899–1905</td><td>Partition of Bengal 1905; Ancient Monuments Preservation Act and Indian Universities Act, both 1904</td></tr><tr><td>Lord Minto II, 1905–1910</td><td>Anti-partition and Swadeshi movements; Surat Split of Congress 1907; Muslim League founded at Dhaka 1906 (Aga Khan first president)</td></tr><tr><td>Lord Hardinge II, 1910–1916</td><td>Capital shifted from Calcutta to Delhi 1911; Hindu Mahasabha 1915 by Madan Mohan Malaviya; coronation Durbar of King George V, Delhi 1911</td></tr></tbody></table>
      <div class="cp-note trap">Minto I (1807–13) and Minto II (1905–10) are different, and so are Hardinge I (1844–48) and Hardinge II (1910–16).</div>
    `
  },
  30: {
    questext: "The Partition of Bengal in 1905 was done by which Viceroy?",
    options: ["Lord Curzon", "Lord Minto II", "Lord Hardinge II", "Lord Ripon"],
    correct: "1",
    exptext: "✅ Lord Curzon divided Bengal in 1905. 📌 Curzon cut Bengal. ❌ Minto II is tempting because he ruled during the protests, but he did not divide it."
  },
  31: {
    questext: "The capital of British India was shifted from Calcutta to Delhi in which year?",
    options: ["1905", "1916", "1911", "1919"],
    correct: "3",
    exptext: "✅ It was shifted in 1911 under Lord Hardinge II. 📌 Durbar and capital in 1911. ❌ 1905 is tempting because of the Partition of Bengal."
  },
  32: {
    questext: "The Surat Split of the Indian National Congress took place in which Viceroyalty?",
    options: ["Lord Curzon", "Lord Dufferin", "Lord Chelmsford", "Lord Minto II"],
    correct: "4",
    exptext: "✅ The Surat Split of 1907 came when Lord Minto II was Viceroy. 📌 Minto II, Surat. ❌ Curzon is tempting because the anger started with him."
  },
  33: {
    type: "concept", icon: "📜", accent: "#84cc16", pauseTimer: true,
    title: "Viceroys of India: Chelmsford and Reading (1916–1926)",
    html: `
      <p class="cp-lead">These years saw the Home Rule League, Gandhi's first movements and the Non-Cooperation Movement. <u>Gandhi became the national leader in this time.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/23.png" alt="Lord Chelmsford Viceroy portrait photo" data-caption="Lord Chelmsford, Viceroy of India from 1916 to 1921." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/24.png" alt="Jallianwala Bagh memorial Amritsar photo" data-caption="The memorial at Jallianwala Bagh, Amritsar, where the massacre took place in 1919." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/25.png" alt="Timeline: 1916 Home Rule and Lucknow Pact; 1919 Rowlatt and Jallianwala Bagh; 1920 Non-Coo" data-caption="Key events from 1916 to 1925 in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Viceroy</th><th>Key events</th></tr></thead><tbody><tr><td>Lord Chelmsford, 1916–1921</td><td>Home Rule Leagues 1916 by Annie Besant and Tilak; Lucknow Pact with the Muslim League 1916; Rowlatt Act 1919; Jallianwala Bagh Massacre 1919; Sabarmati Ashram 1916; Champaran 1916, Kheda 1918 and Ahmedabad 1918 Satyagrahas; Montagu's August Declaration 1917; Government of India Act 1919; Non-Cooperation and Khilafat Movements; death of Tilak 1 August 1920; S. P. Sinha, first Indian governor (Bihar)</td></tr><tr><td>Lord Reading, 1921–1926</td><td>Chauri Chaura 5 February 1922 and withdrawal of Non-Cooperation; Moplah rebellion in Kerala 1921; repeal of the Press Act of 1910 and the Rowlatt Act of 1919; Kakori Train Robbery 1925; Swaraj Party 1923; simultaneous Indian Civil Service examinations in Delhi and London from 1923</td></tr></tbody></table>
      <div class="cp-note trap">Chauri Chaura (1922) happened under Reading, but the Rowlatt Act and Jallianwala Bagh (1919) were under Chelmsford.</div>
    `
  },
  34: {
    questext: "The Jallianwala Bagh Massacre took place under which Viceroy?",
    options: ["Lord Reading", "Lord Chelmsford", "Lord Irwin", "Lord Minto II"],
    correct: "2",
    exptext: "✅ It took place in 1919 when Lord Chelmsford was Viceroy. 📌 Chelmsford, 1919. ❌ Reading is tempting because he followed him, but Chauri Chaura was his event."
  },
  35: {
    questext: "The Chauri Chaura incident, after which Non-Cooperation was withdrawn, took place under which Viceroy?",
    options: ["Lord Reading", "Lord Chelmsford", "Lord Irwin", "Lord Willingdon"],
    correct: "1",
    exptext: "✅ Lord Reading was Viceroy in 1922. 📌 Reading, Chauri. ❌ Chelmsford is tempting because the movement started under him."
  },
  36: {
    questext: "Who was the first Indian governor of a province?",
    options: ["Motilal Nehru", "Surendranath Banerjea", "Satyendra Prasanno Sinha", "Badruddin Tyabji"],
    correct: "3",
    exptext: "✅ S. P. Sinha became Governor of Bihar during Chelmsford's time. 📌 Sinha, Bihar. ❌ Motilal Nehru is tempting but he was a Congress leader."
  },
  37: {
    type: "concept", icon: "🧂", accent: "#f43f5e", pauseTimer: true,
    title: "Viceroys of India: Irwin and Willingdon (1926–1936)",
    html: `
      <p class="cp-lead">These two Viceroys faced the Simon Commission, the Dandi March and the Round Table Conferences. <u>Almost every event from 1928 to 1935 belongs to them.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/26.png" alt="Lord Irwin Viceroy portrait photo" data-caption="Lord Irwin, Viceroy of India from 1926 to 1931." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/27.png" alt="Lord Willingdon Viceroy portrait photo" data-caption="Lord Willingdon, Viceroy of India from 1931 to 1936." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/28.png" alt="Two-column chart: Irwin 1926-31 and Willingdon 1931-36, each with four key events." data-caption="The main events of Lord Irwin and Lord Willingdon side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Viceroy</th><th>Key events</th></tr></thead><tbody><tr><td>Lord Irwin, 1926–1931</td><td>Simon Commission visit 1928 and its boycott; Nehru Report 1928; murder of Saunders; bomb in the Assembly Hall, Delhi 1929; Lahore Conspiracy Case and death of Jatin Das after a hunger strike 1929; Lahore Session 1929 and the Purna Swaraj Resolution; Dandi March 12 March 1930; boycott of the First Round Table Conference 1930; Gandhi–Irwin Pact 1931 and suspension of the Civil Disobedience Movement</td></tr><tr><td>Lord Willingdon, 1931–1936</td><td>Second Round Table Conference 1931; Communal Award 1932; Poona Pact 1932; Third Round Table Conference 1932; Civil Disobedience 1932 to 1934; Congress Socialist Party 1934; Government of India Act 1935; All India Kisan Sabha 1936; Burma separated under the 1935 Act</td></tr></tbody></table>
      <div class="cp-note trap">The Dandi March (1930) was under Irwin, and the Poona Pact (1932) was under Willingdon.</div>
    `
  },
  38: {
    questext: "The Gandhi–Irwin Pact was signed in which year?",
    options: ["1929", "1930", "1932", "1931"],
    correct: "4",
    exptext: "✅ It was signed on 5 March 1931. 📌 Irwin, 1931. ❌ 1930 is tempting because it was the year of the Dandi March."
  },
  39: {
    questext: "The Poona Pact of 1932 was signed under which Viceroy?",
    options: ["Lord Irwin", "Lord Willingdon", "Lord Linlithgow", "Lord Wavell"],
    correct: "2",
    exptext: "✅ Lord Willingdon was Viceroy from 1931 to 1936. 📌 Willingdon, Poona. ❌ Irwin is tempting because of the pact with Gandhi, but that was a year before."
  },
  40: {
    questext: "The Government of India Act, 1935, was passed during the Viceroyalty of whom?",
    options: ["Lord Willingdon", "Lord Irwin", "Lord Linlithgow", "Lord Reading"],
    correct: "1",
    exptext: "✅ It was passed when Willingdon was Viceroy. 📌 Willingdon, 1935. ❌ Linlithgow is tempting because he worked it out after."
  },
  41: {
    type: "concept", icon: "🏁", accent: "#06b6d4", pauseTimer: true,
    title: "Viceroys of India: Linlithgow, Wavell and Mountbatten (1936–1948)",
    html: `
      <p class="cp-lead">These last three Viceroys ruled during the Second World War and the end of British rule. <u>Mountbatten was the last Viceroy and the first Governor-General of free India.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/29.png" alt="Lord Linlithgow Viceroy portrait photo" data-caption="Lord Linlithgow, Viceroy of India from 1936 to 1944." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/30.png" alt="Lord Mountbatten Viceroy portrait photo 1947" data-caption="Lord Mountbatten, the last Viceroy of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/31.png" alt="Timeline: 1940 August Offer; 1942 Quit India; 1944 CR Formula; 1945 Wavell Plan; 1946 Cabi" data-caption="Key events of the last three Viceroys in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Viceroy</th><th>Key events</th></tr></thead><tbody><tr><td>Lord Linlithgow, 1936–1944</td><td>First general elections 1936–37; Congress ministries resigned 1939; Subhas Chandra Bose, Congress President at Haripura (51st session), 1938, and the Forward Bloc 1939; Lahore Resolution 1940; August Offer 1940; Churchill Prime Minister of England 1940; Bose's escape 1941 and the Indian National Army; Cripps Plan 1942; Quit India 1942; Divide and Quit at Karachi, December 1943</td></tr><tr><td>Lord Wavell, 1943–1947</td><td>Rajagopalachari's CR Formula 1944; Gandhi–Jinnah talks 1944; Wavell Plan and Shimla Conference 1945; end of the Second World War 1945; Cabinet Mission 1946; Direct Action Day, 16 August 1946; Attlee's announcement of the end of British rule on 20 February 1947</td></tr><tr><td>Lord Mountbatten, 1947–1948</td><td>June Third Plan, 3 June 1947; Indian Independence Bill introduced in the House of Commons; two boundary commissions under Sir Cyril Radcliffe for the partition of Bengal and Punjab</td></tr></tbody></table>
      <div class="cp-note trap">Wavell began in October 1943 and the Wavell Plan was 1945. Do not date the Shimla Conference to 1942.</div>
    `
  },
  42: {
    questext: "The Cripps Mission came to India during the Viceroyalty of whom?",
    options: ["Lord Wavell", "Lord Willingdon", "Lord Linlithgow", "Lord Mountbatten"],
    correct: "3",
    exptext: "✅ Linlithgow was Viceroy in 1942, during the Cripps Mission and Quit India. 📌 Linlithgow, 1942. ❌ Wavell is tempting because he followed soon, but he came in 1943."
  },
  43: {
    questext: "The Cabinet Mission of 1946 and the Direct Action Day were during whose time?",
    options: ["Lord Linlithgow", "Lord Mountbatten", "Lord Irwin", "Lord Wavell"],
    correct: "4",
    exptext: "✅ Wavell was Viceroy in 1946. 📌 Wavell, Cabinet Mission. ❌ Mountbatten is tempting because partition followed, but he came in 1947."
  },
  44: {
    questext: "Who was the last Viceroy of India?",
    options: ["Lord Wavell", "Lord Mountbatten", "Lord Linlithgow", "C. Rajagopalachari"],
    correct: "2",
    exptext: "✅ Lord Mountbatten was the last Viceroy and then the Governor-General of free India. 📌 Mountbatten, last. ❌ Rajagopalachari is tempting because he was the last Governor-General, but not a Viceroy."
  },
  45: {
    type: "concept", icon: "🗂️", accent: "#a16207", pauseTimer: true,
    title: "Acts, Offices and Exam Facts",
    html: `
      <p class="cp-lead">Many questions ask which Act created which office, and who the ruler was when the Act was passed. <u>This one page keeps the answers together.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/32.png" alt="Three-step chart: Regulating Act 1773 gives Governor-General of Bengal; Charter Act 1833 g" data-caption="Which Act created which office, shown as three steps." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/33.png" alt="Government House Calcutta photo old" data-caption="Government House in Calcutta, seat of the Governor-General until 1911." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Act</th><th>Year</th><th>Viceroy or Governor-General</th></tr></thead><tbody><tr><td>Government of India Act (Company to Crown)</td><td>1858</td><td>Canning</td></tr><tr><td>Indian Councils Act</td><td>1861</td><td>Canning</td></tr><tr><td>Vernacular Press Act and Arms Act</td><td>1878</td><td>Lytton</td></tr><tr><td>Repeal of Vernacular Press Act</td><td>1882</td><td>Ripon</td></tr><tr><td>Indian Councils Act</td><td>1892</td><td>Lansdowne</td></tr><tr><td>Government of India Act</td><td>1919</td><td>Chelmsford</td></tr><tr><td>Government of India Act</td><td>1935</td><td>Willingdon</td></tr></tbody></table>
      <p class="cp-lead"><b>Regulating Act, 1773</b>: the Governor of Bengal became the Governor-General of Bengal, and Warren Hastings was the first. <b>Charter Act, 1833</b>: the Governor-General of India was created, and Bentinck was the first. <b>Government of India Act, 1858</b>: the Viceroy became the Crown's representative, with Canning first and Mountbatten last.</p>
      <p class="cp-lead">Other rulers to know: Sir Charles Metcalfe, 1835–36, the Liberator of the Indian Press; Lord Auckland, 1836–42, the First Afghan War; Lord Ellenborough, 1842–44, who annexed Sindh in 1843; Lord Hardinge I, 1844–48, the First Anglo-Sikh War; Elgin I, 1862–63; and Elgin II, 1894–99.</p>
      <p class="cp-lead">Dalhousie began the first railway, from Bombay to Thane in 1853, and the first telegraph line, from Calcutta to Diamond Harbour in 1851. C. Rajagopalachari, 1948–50, was the first and only Indian Governor-General, and the office ended on 26 January 1950.</p>
      <div class="cp-note trap">Do not mix Warren Hastings and Lord Hastings, Minto I and Minto II, Hardinge I and Hardinge II, or Elgin I and Elgin II.</div>
    `
  },
  46: {
    questext: "Which Act made the Governor of Bengal the Governor-General of Bengal?",
    options: ["Regulating Act 1773", "Pitt's India Act 1784", "Charter Act 1833", "Government of India Act 1858"],
    correct: "1",
    exptext: "✅ The Regulating Act of 1773 created the post. 📌 Regulating, first. ❌ The Charter Act of 1833 is tempting but it made the post Governor-General of India."
  },
  47: {
    questext: "Who was the first and only Indian Governor-General of free India?",
    options: ["Rajendra Prasad", "Jawaharlal Nehru", "C. Rajagopalachari", "Vallabhbhai Patel"],
    correct: "3",
    exptext: "✅ Rajagopalachari served from 1948 to 1950, and the office ended on 26 January 1950. 📌 Rajaji, last Governor-General. ❌ Rajendra Prasad is tempting but he became the first President."
  },
  48: {
    questext: "Which of the following pairs is correct?",
    options: ["Lord Lytton, repeal of the Vernacular Press Act", "Lord Ripon, Delhi Durbar of 1877", "Lord Dalhousie, Government of India Act 1858", "Lord Curzon, Partition of Bengal"],
    correct: "4",
    exptext: "✅ Curzon divided Bengal in 1905. 📌 Curzon, Bengal. ❌ Lytton did the Durbar and the Press Act, and Ripon repealed it."
  },
  49: {
    questext: "Lord Ellenborough annexed which region in 1843?",
    options: ["Punjab", "Sindh", "Awadh", "Nagpur"],
    correct: "2",
    exptext: "✅ Sindh was annexed in 1843. 📌 Ellenborough, Sindh. ❌ Punjab is tempting but it was annexed in 1849 under Dalhousie."
  },
  50: {
    questext: "Consider the following statements:\n1. Lord Bentinck was the last Governor-General of Bengal and the first Governor-General of India.\n2. Lord Canning was the last Governor-General of India and the first Viceroy.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. 📌 Bentinck: Bengal to India. Canning: Governor-General to Viceroy. ❌ Only one is a tempting answer, but both facts are standard."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an old government house building, a quill with a rolled parchment seal and an antique brass crown ornament" },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Robert Clive portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/1.png. portrait of Robert Clive",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Battle of Plassey 1757 painting Clive Mir Jafar\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/2.png. Clive meeting Mir Jafar after Plassey",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/3.png": { t: "fig", about: "Timeline: 1757 Plassey; 1764 Buxar; 1765 Treaty of Allahabad and dual government; 1767 Clive leaves." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Warren Hastings portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/4.png. portrait of Warren Hastings",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Cornwallis portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/5.png. portrait of Lord Cornwallis",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/6.png": { t: "fig", about: "Three-column chart: Hastings 1772-85; Cornwallis 1786-93; Shore 1793-98, each with two key events." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Wellesley portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/7.png. portrait of Lord Wellesley",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vellore Fort Tamil Nadu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/8.png. Vellore Fort walls",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/9.png": { t: "fig", about: "Flow: Subsidiary Alliance 1798 with the Nizam; Fourth Mysore War 1799; Second Maratha War 1803-05; Treaty of Bassein 1802." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord William Bentinck portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/10.png. portrait of Lord William Bentinck",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sati abolition 1829 Raja Ram Mohan Roy illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/11.png. Raja Ram Mohan Roy",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/12.png": { t: "fig", about: "Timeline: 1813-23 Hastings; 1823-28 Amherst; 1829 sati abolished; 1830 thugi suppressed; 1835 English made official language." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Dalhousie portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/13.png. portrait of Lord Dalhousie",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"First train Bombay Thane 1853 illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/14.png. first Indian train",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/15.png": { t: "fig", about: "Map-style schematic, not a map: states annexed by the Doctrine of Lapse with years: Satara 1848, Jaitpur and Sambalpur 1849, Udaipur 1852, Jhansi 1853, Nagpur 1854, Awadh 1856." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Canning portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/16.png. portrait of Lord Canning",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Revolt of 1857 Lucknow Residency ruins photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/17.png. Lucknow Residency ruins",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Ripon portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/18.png. portrait of Lord Ripon",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/19.png": { t: "fig", about: "Row of six boxes: Lawrence 1863-69; Mayo 1869-72; Northbrook 1872-76; Lytton 1876-80; Ripon 1880-84; Dufferin 1884-88; Lansdowne 1888-94, each with one key word." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Curzon portrait Viceroy photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/20.png. portrait of Lord Curzon",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Delhi Durbar 1911 King George V photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/21.png. the Delhi Durbar of 1911",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/22.png": { t: "fig", about: "Timeline: 1905 Partition of Bengal; 1906 Muslim League; 1907 Surat Split; 1911 capital shifted to Delhi; 1915 Hindu Mahasabha." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Chelmsford Viceroy portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/23.png. portrait of Lord Chelmsford",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jallianwala Bagh memorial Amritsar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/24.png. the memorial at Jallianwala Bagh",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/25.png": { t: "fig", about: "Timeline: 1916 Home Rule and Lucknow Pact; 1919 Rowlatt and Jallianwala Bagh; 1920 Non-Cooperation; 1922 Chauri Chaura; 1925 Kakori." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Irwin Viceroy portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/26.png. portrait of Lord Irwin",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Willingdon Viceroy portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/27.png. portrait of Lord Willingdon",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/28.png": { t: "fig", about: "Two-column chart: Irwin 1926-31 and Willingdon 1931-36, each with four key events." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Linlithgow Viceroy portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/29.png. portrait of Lord Linlithgow",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Mountbatten Viceroy portrait photo 1947\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/30.png. portrait of Lord Mountbatten",
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/31.png": { t: "fig", about: "Timeline: 1940 August Offer; 1942 Quit India; 1944 CR Formula; 1945 Wavell Plan; 1946 Cabinet Mission; 3 June 1947 plan." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/32.png": { t: "fig", about: "Three-step chart: Regulating Act 1773 gives Governor-General of Bengal; Charter Act 1833 gives Governor-General of India; Government of India Act 1858 gives Viceroy." },
  "images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Government House Calcutta photo old\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India/33.png. Government House in Calcutta"
});

/* CHANGE LOG
   - Robert Clive is described as dying by suicide in 1774, after his time as Governor, instead of as the only governor to commit suicide.
   - Lord Wavell's tenure is given as October 1943 to 1947, and the Wavell Plan and Shimla Conference as 1945, not 1942.
   - The Muslim League is stated as founded at Dhaka in 1906, with Aga Khan as its first president and Nawab Salimullah as a leading founder.
   - The Swaraj Party is dated 1923, formed after the decision at the Gaya session of December 1922.
   - The Divide and Quit slogan of the Karachi session is dated December 1943 (one table gave 1944).
   - The separation of Burma is described as made under the Government of India Act, 1935.
*/