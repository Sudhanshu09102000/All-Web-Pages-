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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Peasant_and_Tribal_Movements · 8 concept pages (+ overview) · 36 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌾", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Peasant and Tribal Movements",
    thumb: {
      image: "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "MODERN INDIA",
      line2: "PEASANT & TRIBAL",
      line3: "MOVEMENTS",
      badge: "FULL CHAPTER",
      ribbon: "LEADERS • YEARS • LAWS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Peasant and Tribal Movements | Modern India Complete Chapter",
      altTitles: ["Indigo to Telangana: All Peasant Movements in One Class", "Santhal, Munda, Bardoli, Tebhaga: Tribal and Peasant Revolts"],
      description: "Peasant and tribal movements are full of names, years and places that are easy to mix up. In this class we put every rising in order and learn it in simple steps.\n\n📌 IN THIS CLASS\n✅ Land revenue background and the three streams of revolt\n✅ Indigo, Pabna, Deccan, Moplah\n✅ Champaran, Kheda, Bardoli\n✅ Santhal, Munda, Rampa, Naga\n✅ Table of every movement with leaders and results\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#ModernIndia #TribalMovements #GeneralAwareness",
      tags: ["peasant movements", "tribal movements", "modern india history", "indigo revolt", "santhal rebellion", "munda rebellion", "birsa munda", "champaran satyagraha", "bardoli satyagraha", "kheda satyagraha", "tebhaga movement", "telangana rebellion", "deccan riots", "moplah rebellion", "pabna uprising", "kisan sabha", "ssc cgl history", "ssc history", "railway history", "general awareness", "history tricks", "tribal revolts table", "all india kisan sabha", "indian history for exams", "SSC CGL", "UPSC", "Banking", "Railways", "Peasant and Tribal Movements M"],
      hashtags: ["ModernIndia", "TribalMovements", "GeneralAwareness"],
      thumbText: "PEASANT & TRIBAL MOVEMENTS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Peasant and Tribal Movements. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Background\n00:00 Peasant Movements: Indigo, Pabna, Deccan, Moplah\n00:00 Peasant Movements: Satyagrahas and Kisan Sabha\n00:00 Tribal Movements\n00:00 Movements at a Glance: Early Risings\n00:00 Movements at a Glance: 1855 to 1900\n00:00 Movements at a Glance: Twentieth Century\n00:00 Terms and Systems",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the peasant and tribal movements against colonial rule</u>. From the Sanyasi Revolt of 1763 to the Telangana Rebellion, these risings give many sure marks in the General Awareness paper.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>8</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>36</b><span>Questions</span></div>
        <div class="cp-stat"><b>~52 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Background — Land, Revenue and Resistance</b><br>Why the land laws and the greed of landlords and moneylenders pushed farmers and tribes to revolt.</li>
        <li><b>Peasant Movements</b><br>Indigo, Pabna, Deccan and Moplah, and then the Gandhian satyagrahas and the Kisan Sabha era.</li>
        <li><b>Tribal Movements</b><br>The Santhal Hul, the Munda Ulgulan, the Rampa Revolt and the Naga movement.</li>
        <li><b>Every Movement at a Glance</b><br>Clear tables of year, region, leaders, cause and outcome for every important rising.</li>
        <li><b>Terms and Systems</b><br>Words such as Kamiauti, Dadni, Dubla-Hali and Tinkathia, explained in plain words.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> leaders, years, regions and the laws that followed each rising are asked again and again in the Staff Selection Commission, Railways and Banking exams, so these facts are easy marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🏞️", accent: "#f59e0b", pauseTimer: true,
    title: "Background — Land, Revenue and Resistance",
    html: `
      <p class="cp-lead">Under British rule, the old village life of India broke down. <u>Farmers, tribes and dispossessed rulers rose again and again between the Battle of Plassey in 1757 and the Revolt of 1857.</u></p>
      <p class="cp-lead">Two land laws did the most harm. The Permanent Settlement of 1793, brought by Lord Cornwallis, fixed the revenue that landlords must pay, and landlords then squeezed the farmers. The Ryotwari Settlement, linked with Thomas Munro and Alexander Read, took revenue straight from each farmer at a high rate. Both laws made exploitation a fixed system and broke the old farming order.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/1.png" alt="Lord Cornwallis portrait Permanent Settlement 1793" data-caption="Lord Cornwallis, who brought the Permanent Settlement of 1793 to Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/2.png" alt="Three-box diagram with a central arrow. Left boxes: British rulers, Zamindars, Moneylender" data-caption="Who oppressed the people, and which groups rose against them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Stream</th><th>Who they were</th><th>Example</th></tr></thead><tbody><tr><td>Peasants</td><td>Farmers hurt by rent, debt and forced crops</td><td>Indigo Revolt</td></tr><tr><td>Tribals</td><td>Forest communities who lost their common land</td><td>Santhal Hul</td></tr><tr><td>Dispossessed groups</td><td>Rulers, soldiers and ascetics who lost status</td><td>Sanyasi Revolt</td></tr></tbody></table>
      <div class="cp-note trap">Both British and native groups oppressed the people. The enemies were not only the British, but also Indian zamindars, moneylenders and capitalists.</div>
      <div class="cp-note exam">Tribals lost their common land and became labourers, sharecroppers or rack-rented tenants, which means they paid a very high rent on land that was once theirs.</div>
    `
  },
  3: {
    questext: "The Permanent Settlement was introduced in Bengal in which year?",
    options: ["1773", "1784", "1793", "1813"],
    correct: "3",
    exptext: "Lord Cornwallis introduced the Permanent Settlement in 1793. Remember 1793 with Cornwallis. The year 1773 belongs to the Regulating Act, so it is the tempting wrong option."
  },
  4: {
    questext: "The Ryotwari Settlement is linked with which pair of officials?",
    options: ["Thomas Munro and Alexander Read", "Lord Cornwallis and Warren Hastings", "Lord Dalhousie and Lord Canning", "Lord Bentinck and Colonel Sleeman"],
    correct: "1",
    exptext: "Thomas Munro and Alexander Read worked out the Ryotwari Settlement, taking revenue straight from the farmer. Remember Munro with the farmer. Cornwallis is linked with the Permanent Settlement, so that option is wrong."
  },
  5: {
    questext: "Consider the following statements about the background of peasant and tribal movements:\n1. Both British and native zamindars and moneylenders oppressed the people.\n2. The Permanent Settlement was brought by Lord Dalhousie.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Both 1 and 2", "Neither 1 nor 2", "Only 1"],
    correct: "4",
    exptext: "Only statement 1 is correct. The Permanent Settlement was brought by Lord Cornwallis in 1793 and not by Dalhousie. Remember that landlords and moneylenders also oppressed the farmers."
  },
  6: {
    type: "concept", icon: "🌿", accent: "#3b82f6", pauseTimer: true,
    title: "Peasant Movements — Indigo, Pabna, Deccan and Moplah",
    html: `
      <p class="cp-lead">The first big peasant risings came in Bengal, Maharashtra and Kerala. <u>Each one was against a different kind of oppressor, but all of them led to a law or a commission.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/3.png" alt="Neel Darpan Dinabandhu Mitra book cover" data-caption="The play Neel Darpan, which showed the cruelty of indigo planters." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/4.png" alt="Indigo factory Bengal 19th century historic photo" data-caption="An indigo factory in Bengal, where farmers were forced to grow the crop." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/5.png" alt="Four-row table-like picture: Indigo 1860, Bengal, ended by Indigo Commission; Pabna 1873 t" data-caption="The four early peasant risings compared by year, region and result." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">In the Indigo Revolt of 1860, Bengal farmers refused to grow indigo. It was a non-cultivation movement with complete Hindu-Muslim unity, and it was the first successful organised strike of Indian peasants. The same unrest returned at Champaran in Bihar in 1867 and 1868. Harish Chandra Mukherji, editor of Hindu Patriot, backed the farmers, and Dinabandhu Mitra wrote the play Neel Darpan, which Michael Madhusudan Dutt translated into English. The Reverend James Long was jailed in 1861 for the English translation, and an Indigo Commission reported in 1860.</p>
      <p class="cp-lead">In the Pabna Uprising of 1873 to 1876, farmers asked to be subjects of the Queen and only the Queen, not of landlords. Bankim Chandra Chatterjee, Romesh Chunder Dutt and the Indian Association, led by Surendranath Banerjee, Anand Mohan Bose and Dwarkanath Ganguly, backed them, and the Bengal Tenancy Act of 1885 followed.</p>
      <p class="cp-lead">The Deccan Riots of 1874 and 1875 spread over 33 places in six talukas, and about 1,000 people were arrested. The Commission blamed the farmers' debt. The Moplah rising joined the Khilafat movement in 1921. Gandhi, Shaukat Ali and Maulana Azad addressed Mappila meetings, but the Congress kept away from the rising.</p>
      <div class="cp-note trap">Match each movement with its law. Pabna led to the Bengal Tenancy Act of 1885, and the Deccan Riots led to the Deccan Agriculturists Relief Act of 1879. Do not swap them.</div>
      <div class="cp-note exam">Indigo began in 1859 and 1860 at Govindpur in Nadia district of Bengal.</div>
    `
  },
  7: {
    questext: "The Indigo Revolt of 1860 was mainly started in which region?",
    options: ["Bihar", "Bengal", "Punjab", "Gujarat"],
    correct: "2",
    exptext: "The Indigo Revolt began in Bengal, at Govindpur in Nadia district, in 1859 and 1860. Remember Bengal for the first and Bihar for the later Champaran movement. Bihar is the tempting wrong option."
  },
  8: {
    questext: "Who wrote the play Neel Darpan?",
    options: ["Bankim Chandra Chatterjee", "Harish Chandra Mukherji", "Dinabandhu Mitra", "Michael Madhusudan Dutt"],
    correct: "3",
    exptext: "Dinabandhu Mitra wrote Neel Darpan, and Michael Madhusudan Dutt translated it. Remember Mitra as the writer and Dutt as the translator. Dutt is the tempting wrong option for this reason."
  },
  9: {
    questext: "The Pabna Uprising of 1873 to 1876 finally led to which law?",
    options: ["Deccan Agriculturists Relief Act", "Bengal Tenancy Act", "Chotanagpur Tenancy Act", "Bargadar Act"],
    correct: "2",
    exptext: "The Pabna Uprising led to the Bengal Tenancy Act of 1885. Remember Pabna with Bengal. The Relief Act came after the Deccan Riots, so that option is wrong."
  },
  10: {
    questext: "Consider the following statements about the Deccan Riots of 1874 and 1875:\n1. They began at Sirur taluka in December 1874 against moneylenders.\n2. They led to the Deccan Agriculturists Relief Act of 1879.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Neither 1 nor 2", "Both 1 and 2"],
    correct: "4",
    exptext: "Both statements are correct. The riots began at Sirur in Poona district in December 1874 and the Relief Act followed in 1879. Remember Deccan with moneylenders and the Relief Act of 1879."
  },
  11: {
    questext: "The Moplah rising of 1921 took place in which region?",
    options: ["Malabar", "Awadh", "Chotanagpur", "Khandesh"],
    correct: "1",
    exptext: "The Moplah or Mappila rising of 1921 took place in Malabar in Kerala. Remember Malabar with Moplah. Awadh is the tempting wrong option because the Kisan Sabha movement was there."
  },
  12: {
    type: "concept", icon: "🚩", accent: "#10b981", pauseTimer: true,
    title: "Peasant Movements — Satyagrahas and the Kisan Sabha Era",
    html: `
      <p class="cp-lead">After 1917, peasant movements joined the national movement. <u>Gandhi led the first three satyagrahas, and then the Kisan Sabha took over from the 1930s.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/6.png" alt="Mahatma Gandhi Champaran 1917 photo" data-caption="Mahatma Gandhi at Champaran in 1917, his first satyagraha in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/7.png" alt="Vallabhbhai Patel Bardoli 1928 photo" data-caption="Vallabhbhai Patel, who received the title Sardar during the Bardoli Satyagraha." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/8.png" alt="Timeline with five boxes: 1917 Champaran, 1918 Kheda, 1918 Awadh Kisan Sabha, 1928 Bardoli" data-caption="Five peasant movements in order of year, from 1917 to 1936." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Champaran in 1917 was Gandhi's first satyagraha in India. Rajkumar Shukla invited him, and Rajendra Prasad, Mahadev Desai, Narhari Parikh and Jivatram Bhagwandas Kripalani helped him. Rabindranath Tagore gave him the name Mahatma. The Tinkathia system, which forced indigo on three twentieths of the land, was abolished by the Champaran Agrarian Act of 1918. At Kheda in Gujarat in 1918, Kunbi-Patidar farmers refused to pay revenue after their crops failed, and Gandhi, Vallabhbhai Patel and Indulal Yagnik guided them until a secret order spared those unable to pay.</p>
      <p class="cp-lead">At Bardoli in 1928, Vallabhbhai Patel led the Bardoli Satyagraha. The Bardoli Satyagraha Patrika carried news, Kanaiyalal Maneklal Munshi and Lalji Naranji resigned from the Bombay Legislative Council, and the women gave Patel the title Sardar. The tax rise of 22 percent was cut to 6.03 percent after the Maxwell-Broomfield enquiry.</p>
      <p class="cp-lead">In Awadh, Baba Ramchandra and the Home Rule League first united the farmers against landlords, and the Uttar Pradesh Kisan Sabha began in February 1918. The Eka Movement of 1921 and 1922, led by Madari Pasi, was against high rents. The All India Kisan Sabha was set up at Lucknow in April 1936 with Swami Sahajanand Saraswati as president and Professor Gogineni Ranga Nayukulu as general secretary, and Jawaharlal Nehru opened it.</p>
      <p class="cp-lead">Late peasant risings were fierce. The Tebhaga Movement of 1946 in northern Bengal demanded two thirds of the crop for sharecroppers, with the slogans Tebhaga Chai and Inquilab Zindabad, and it led to the Bargadar Act of 1949. The Telangana Rebellion of 1946 to 1951, in Hyderabad state, was against forced labour and the Razakars, and it was the fiercest from August 1947 to September 1948.</p>
      <div class="cp-note trap">Champaran came in 1917, Kheda in 1918 and Bardoli in 1928. Remember them in this order of the three Gandhian peasant satyagrahas.</div>
      <div class="cp-note exam">The Bihar Provincial Kisan Sabha was founded in 1929 by Swami Sahajanand Saraswati.</div>
      <div class="cp-mnemonic">C-K-B: Champaran, Kheda, Bardoli.</div>
    `
  },
  13: {
    questext: "Which was Gandhi's first satyagraha in India?",
    options: ["Kheda", "Bardoli", "Champaran", "Awadh"],
    correct: "3",
    exptext: "Champaran in 1917 was Gandhi's first satyagraha in India. Remember Champaran, Kheda, Bardoli in order. Kheda came a year later, which makes it the tempting wrong option."
  },
  14: {
    questext: "Who was given the title Sardar by the women of Bardoli in 1928?",
    options: ["Vallabhbhai Patel", "Mahatma Gandhi", "Rajendra Prasad", "Indulal Yagnik"],
    correct: "1",
    exptext: "The women of Bardoli gave Vallabhbhai Patel the title Sardar during the Bardoli Satyagraha. Remember Sardar with Bardoli. Gandhi is the tempting wrong option as he guided Champaran and Kheda."
  },
  15: {
    questext: "The Tinkathia system was abolished by which Act?",
    options: ["Bengal Tenancy Act, 1885", "Chotanagpur Tenancy Act, 1908", "Bargadar Act, 1949", "Champaran Agrarian Act, 1918"],
    correct: "4",
    exptext: "The Champaran Agrarian Act of 1918 formally abolished Tinkathia, the system that forced indigo on three twentieths of the land. Remember Tinkathia with Champaran. The other Acts deal with other regions."
  },
  16: {
    questext: "The All India Kisan Sabha was founded at Lucknow in April 1936 with whom as president?",
    options: ["Jawaharlal Nehru", "Swami Sahajanand Saraswati", "Indulal Yagnik", "Ram Manohar Lohia"],
    correct: "2",
    exptext: "Swami Sahajanand Saraswati was the first president, and Professor Gogineni Ranga Nayukulu the general secretary. Remember Sahajanand with the Kisan Sabha. Nehru only opened the meeting, which makes him the tempting wrong option."
  },
  17: {
    questext: "Consider the following statements about the Tebhaga Movement:\n1. It was a movement of sharecroppers in northern Bengal in 1946.\n2. It demanded two thirds of the crop for the sharecroppers.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "Both statements are correct. Tebhaga means two thirds, and the Bargadar Act of 1949 followed. Remember Tebhaga with Bengal. The Telangana movement was in Hyderabad, so that region is a common trap."
  },
  18: {
    questext: "The Kheda Satyagraha of 1918 took place in which present-day state?",
    options: ["Gujarat", "Bihar", "Uttar Pradesh", "Maharashtra"],
    correct: "1",
    exptext: "Kheda is in Gujarat, where Kunbi-Patidar farmers refused to pay revenue in 1918. Remember Kheda and Bardoli with Gujarat. Bihar is the tempting wrong option because Champaran is there."
  },
  19: {
    type: "concept", icon: "🏹", accent: "#ef4444", pauseTimer: true,
    title: "Tribal Movements — What to Remember",
    html: `
      <p class="cp-lead">Tribal people lived by the forest and their common land. <u>When British laws and outside landlords took that land, they rose in revolt.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/9.png" alt="Birsa Munda statue Ranchi photo" data-caption="A statue of Birsa Munda, leader of the Munda Ulgulan of 1899 and 1900." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/10.png" alt="Santhal Hul Sidhu Kanhu memorial Bhognadih photo" data-caption="The memorial of Sidhu and Kanhu, leaders of the Santhal Hul of 1855." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/11.png" alt="Two-column comparison. Left Santhal Hul 1855 to 1856: leaders Sidhu, Kanhu, Chand, Bhairav" data-caption="The Santhal and Munda risings compared by leaders, place and result." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Santhal Hul of 1855 and 1856 was the most serious challenge to the East India Company in its first century, and it is often called the first peasant revolt in India. It was tied to the Permanent Settlement of 1793, and the Damin-i-Koh area was marked out for the Santhals by 1832. The Hul Diwas is still kept on 30 June.</p>
      <p class="cp-lead">Birsa Munda's call, the Ulgulan or Great Upheaval, began on Christmas Eve in 1899, to bring back Munda rule. Women took a big part. Birsa was arrested in February 1900 at Singhbhum and died in Ranchi jail in June 1900.</p>
      <p class="cp-lead">Among the Koyas, Raja Ananta Ayyar rose again in 1886 and asked the King of Jaipur for help. The Rampa Revolt began in 1879, and the rebels were sent to the Andaman jail. In 1922, Alluri Sitarama Raju claimed magical powers and led the same region. In Manipur, the seventeen year old Gaidinliu joined the Naga movement with the Civil Disobedience Movement, and Jawaharlal Nehru gave her the title Rani.</p>
      <table><thead><tr><th>Movement</th><th>Leaders</th><th>Key point</th></tr></thead><tbody><tr><td>Santhal Hul 1855 to 1856</td><td>Sidhu and Kanhu, with Chand and Bhairav</td><td>Raised at Bhognadih</td></tr><tr><td>Munda Ulgulan 1899 to 1900</td><td>Birsa Munda</td><td>Called Dharti Aba</td></tr><tr><td>Koya and Rampa</td><td>Tomma Sora, Raja Ananta Ayyar, Alluri Sitarama Raju</td><td>Forest rights lost</td></tr><tr><td>Naga movement</td><td>Jadonang and Gaidinliu</td><td>Naga rule</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse the Santhal Hul of 1855 with the Munda Ulgulan of 1899. The first was led by Sidhu and Kanhu, and the second by Birsa Munda.</div>
      <div class="cp-note exam">Gaidinliu was only seventeen years old when she took part, and Nehru gave her the title Rani.</div>
    `
  },
  20: {
    questext: "Who led the Santhal Hul of 1855?",
    options: ["Birsa Munda", "Tilka Manjhi", "Alluri Sitarama Raju", "Sidhu and Kanhu"],
    correct: "4",
    exptext: "Sidhu and Kanhu led the Santhal Hul, with Chand and Bhairav. Remember Hul with Santhal and Sidhu. Birsa led the Munda rising, which makes him the tempting wrong option."
  },
  21: {
    questext: "Birsa Munda is also known as which name?",
    options: ["Rani", "Dharti Aba", "Sardar", "Mahatma"],
    correct: "2",
    exptext: "Birsa Munda is called Dharti Aba, the father of the earth. Remember Birsa with Dharti Aba. Gaidinliu received the title Rani and Vallabhbhai Patel the title Sardar, so these are wrong."
  },
  22: {
    questext: "The Ulgulan or Great Upheaval was begun in which year?",
    options: ["1855", "1886", "1899", "1922"],
    correct: "3",
    exptext: "Birsa Munda began the Ulgulan on Christmas Eve of 1899. Remember Ulgulan with 1899 and 1900. The year 1855 is the Santhal Hul, which is a common trap."
  },
  23: {
    questext: "Which Act followed the Munda rising and ended forced labour and gave rights over land?",
    options: ["Chotanagpur Tenancy Act", "Santhal Pargana Tenancy Act", "Bengal Tenancy Act", "Bargadar Act"],
    correct: "1",
    exptext: "The Chotanagpur Tenancy Act followed the Munda rising and ended begari and the khunti-katti rights. Remember Munda with Chotanagpur. The Santhal Pargana Tenancy Act followed the Santhal Hul, so it fails."
  },
  24: {
    questext: "Consider the following statements about the Santhal Hul:\n1. It took place in 1855 and 1856.\n2. It was led by Birsa Munda.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Neither 1 nor 2", "Only 2", "Only 1"],
    correct: "4",
    exptext: "Only statement 1 is correct. The Santhal Hul was led by Sidhu and Kanhu, while Birsa Munda led the later Munda rising. Remember the two names apart."
  },
  25: {
    questext: "Which Naga leader was given the title Rani by Jawaharlal Nehru?",
    options: ["Rani Chennamma", "Gaidinliu", "Rani Lakshmibai", "Jadonang"],
    correct: "2",
    exptext: "Gaidinliu was given the title Rani by Nehru. Remember Gaidinliu with the Naga movement. Jadonang is the tempting wrong option because he was her teacher, and he was hanged in 1931."
  },
  26: {
    type: "concept", icon: "🗡️", accent: "#8b5cf6", pauseTimer: true,
    title: "Every Movement at a Glance — Early Risings, 1763 to 1833",
    html: `
      <p class="cp-lead">These are the earliest risings against the Company. <u>Learn each by its year, region and leader.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/12.png" alt="Horizontal timeline with ten stops: 1763 Sanyasi, 1770s Paharia, 1770 Fakir, 1808 Velu Tha" data-caption="The early risings against the Company arranged in order of year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/13.png" alt="Rani Chennamma Kittur fort statue photo" data-caption="A statue of Rani Chennamma of Kittur, who fought the British in 1824." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Movement</th><th>Year</th><th>Region</th><th>Leaders</th><th>Cause and outcome</th></tr></thead><tbody><tr><td>Sanyasi Revolt</td><td>1763 to 1800</td><td>Bengal, Dhaka, Rangpur, Mymensingh</td><td>Kena Sarkar, Dirji Narayan Chaudhrani, Manju Shah, Devi Chaudhrani</td><td>Curbs on pilgrims and the famine of 1770; crushed by Warren Hastings; Anand Math</td></tr><tr><td>Paharia Revolt</td><td>1770s</td><td>Rajmahal hills, Jharkhand</td><td>Tilka Manjhi (Jabra Paharia), the first Adivasi in arms</td><td>British revenue system; hanged at Bhagalpur</td></tr><tr><td>Fakir Resistance</td><td>1770 to 1777</td><td>Bengal</td><td>Majnu Shah, Chirag Ali Shah, Bhavani Pathak</td><td>Nomadic Muslim fakirs against the British; controlled by the early 1800s</td></tr><tr><td>Velu Thampi Dalawa Revolt</td><td>1808 to 1809</td><td>Travancore</td><td>Velu Thampi, Diwan</td><td>Money burden and his removal; died in the jungles</td></tr><tr><td>Paika Rebellion</td><td>1817 to 1825</td><td>Odisha, Khurda</td><td>Bakshi Jagabandhu</td><td>Paika militia lost lands; he died a prisoner at Cuttack in 1829</td></tr><tr><td>Bhil Uprisings</td><td>1818, 1825, 1831, 1846</td><td>Western Ghats, Khandesh</td><td>Sevaram in 1825</td><td>Khandesh occupied in 1818; crushed</td></tr><tr><td>Ramosi Rebellion</td><td>1822, 1825 to 1826, 1839 to 1841</td><td>Western Ghats, Maharashtra</td><td>Chittar Singh, Narsingh Dattatreya Petkar</td><td>Heavy taxes and famine after the Maratha fall; Satara looted in 1822</td></tr><tr><td>Kittur Rebellion</td><td>1824 to 1829</td><td>Kittur, Karnataka</td><td>Rani Kittur Chennamma, Sangoli Rayanna</td><td>Doctrine of Lapse refused her adopted heir; Rayanna hanged, Chennamma died at Bailhongal fort</td></tr><tr><td>Pagalpanthi Rebellion</td><td>from 1825</td><td>North Bengal, Sherpur to Garo hills</td><td>Karam Shah, son Tipu Shah</td><td>Landlord exploitation; suppressed</td></tr><tr><td>Khasi Revolt</td><td>1827 to 1833</td><td>Khasi and Jaintia hills, Meghalaya</td><td>U Tirot Singh</td><td>Forced labour on the Sylhet to Brahmaputra road; crushed by 1833</td></tr></tbody></table>
      <div class="cp-note trap">The Sanyasi were Hindu Naga and Giri monks of the Maratha and Rajput armies led by Manju Shah, while the Fakirs were Muslim fakirs led by Majnu Shah. They were different men in the same years of Bengal.</div>
    `
  },
  27: {
    questext: "Who was the first Adivasi to take up arms against the British and was hanged at Bhagalpur?",
    options: ["Sidhu", "Tilka Manjhi", "Birsa Munda", "Budhu Bhagat"],
    correct: "3",
    exptext: "Tilka Manjhi, also called Jabra Paharia, was the first Adivasi in arms and was hanged at Bhagalpur. Remember Tilka with the Paharia Revolt. Birsa is the tempting wrong option, as he came much later."
  },
  28: {
    questext: "The novel Anand Math by Bankim Chandra Chatterjee is based on which revolt?",
    options: ["Sanyasi Revolt", "Fakir Resistance", "Paharia Revolt", "Santhal Hul"],
    correct: "1",
    exptext: "Anand Math is based on the Sanyasi Revolt of Bengal in the years after the famine of 1770. Remember Sanyasi with Anand Math. The Fakirs were a different group, so that option fails."
  },
  29: {
    questext: "Rani Kittur Chennamma rose against the British in which state?",
    options: ["Gujarat", "Maharashtra", "Odisha", "Karnataka"],
    correct: "4",
    exptext: "Rani Chennamma of Kittur in Karnataka rose in 1824 when the Doctrine of Lapse refused her adopted heir. Remember Kittur with Karnataka. Maharashtra is the tempting wrong option, because the Ramosi rising was in the Western Ghats."
  },
  30: {
    questext: "The Paika Rebellion of 1817 was led by whom?",
    options: ["Sevaram", "Bakshi Jagabandhu", "Velu Thampi", "U Tirot Singh"],
    correct: "2",
    exptext: "Bakshi Jagabandhu led the Paika militia of the Gajapati rulers of Khurda in Odisha. Remember Paika with Odisha. The others led other risings."
  },
  31: {
    type: "concept", icon: "📅", accent: "#14b8a6", pauseTimer: true,
    title: "Every Movement at a Glance — Risings from 1827 to 1900",
    html: `
      <p class="cp-lead">This table covers the middle risings, from the Ahom Revolt to the Munda Rebellion. <u>Each row gives year, region, leader, cause and outcome.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/14.png" alt="Horizontal timeline with eleven stops: 1827 Visakhapatnam, 1828 Ahom, 1831 Kol, 1840 Kuka," data-caption="The risings from 1827 to 1900 arranged in order of year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/15.png" alt="Santhal rebellion Damin-i-Koh memorial photo" data-caption="A Santhal memorial in Jharkhand remembering the rebellion of 1855 and 1856." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Movement</th><th>Year</th><th>Region</th><th>Leaders</th><th>Cause and outcome</th></tr></thead><tbody><tr><td>Visakhapatnam Revolt</td><td>1827 to 1830</td><td>Visakhapatnam, Andhra</td><td>Birbhadra and local zamindars</td><td>Property seized; crushed</td></tr><tr><td>Ahom Revolt</td><td>1828</td><td>Assam</td><td>Gomdhar Konwar</td><td>Land not returned after the Burma War; conciliatory policy</td></tr><tr><td>Kol Rebellion</td><td>1831 to 1832</td><td>Chota Nagpur plateau</td><td>Budhu Bhagat in 1831, Ganga Narayan in 1832</td><td>Steep land tax by outsiders; thousands killed</td></tr><tr><td>Moplah Rebellion</td><td>1836 and 1921</td><td>Malabar, Kerala</td><td>Ali Musaliar, arrested August 1921</td><td>Insecure tenure and high rents; martial law, crushed December 1921</td></tr><tr><td>Kuka (Namdhari) Revolt</td><td>1840 to 1872</td><td>Punjab, headquarters at Hajro</td><td>Bhagat Jawahar Mal, Balak Singh, Ram Singh Kuka</td><td>Sikh religious reform turned anti-British; Ram Singh deported to Rangoon in 1872, died 1885</td></tr><tr><td>Gadkari Revolt</td><td>1844</td><td>Kolhapur, Deccan</td><td>Daji Krishna Pandit</td><td>Lost service and land; crushed</td></tr><tr><td>Sawantwadi Revolt</td><td>1844</td><td>Deccan</td><td>Phond Sawant</td><td>Dispossession; rebels fled to Goa</td></tr><tr><td>Khond Revolt</td><td>1846 and 1855</td><td>Odisha and Andhra</td><td>Chakra Bisoi, later Radhakrishna Dandasena</td><td>Ban on Meriah sacrifice, new taxes; Dandasena hanged 1857</td></tr><tr><td>Santhal Revolt (Hul)</td><td>1855 to 1856</td><td>Damin-i-Koh, Santhal Pargana</td><td>Sidhu, Kanhu, Chand, Bhairav</td><td>Heavy taxes and dikus; Santhal Pargana Tenancy Act, 5,500 square miles</td></tr><tr><td>Indigo Revolt</td><td>1859 to 1860</td><td>Bengal, Govindpur, Nadia</td><td>Digambar Biswas, Vishnu Biswas</td><td>Forced indigo, Dadni system; Indigo Commission under Walter Seton-Karr</td></tr><tr><td>Pabna Uprising</td><td>1873 to 1876</td><td>Yusufshahi, Pabna</td><td>Isan Chandra Rai, Keshab Chandra Rai, Shambhunath Pal</td><td>Evictions and rent rise; Bengal Tenancy Act, 1885</td></tr><tr><td>Deccan Riots</td><td>1874 to 1875</td><td>Ryotwari Poona and Ahmadnagar</td><td>Anti-sahukar riots</td><td>High revenue, cotton boom collapse; Deccan Agriculturists Relief Act, 1879</td></tr><tr><td>Koya Revolt</td><td>1879 to 1880</td><td>East Godavari, Malkangiri, Rampa</td><td>Tomma Sora, Raja Ananta Ayyar in 1886</td><td>Loss of forest rights, toddy excise; Tomma Sora shot dead</td></tr><tr><td>Rampa Revolt</td><td>1879 and 1922</td><td>Visakhapatnam hills, Godavari</td><td>Alluri Sitarama Raju in 1922</td><td>British oppression; Raju captured and killed in May 1924</td></tr><tr><td>Munda Rebellion (Ulgulan)</td><td>1899 to 1900</td><td>South of Ranchi, Chotanagpur</td><td>Birsa Munda</td><td>Oppression and loss of culture; Chotanagpur Tenancy Act</td></tr></tbody></table>
      <div class="cp-note trap">A Koya leader and a Rampa leader appear in the same hills at different years. Raja Ananta Ayyar rose in 1886, and Alluri Sitarama Raju rose in 1922.</div>
    `
  },
  32: {
    questext: "The Kol Rebellion of 1831 and 1832 took place in which region?",
    options: ["Malabar", "Chota Nagpur plateau", "Khandesh", "Assam"],
    correct: "2",
    exptext: "The Kol Rebellion took place on the Chota Nagpur plateau. Remember that Munda, Oraon, Ho and Mahali were all called Kol. Assam was the place of the Ahom Revolt, so it fails."
  },
  33: {
    questext: "Which leader of the Ahom Revolt of 1828 led the rising in Assam?",
    options: ["U Tirot Singh", "Gomdhar Konwar", "Jabra Paharia", "Sevaram"],
    correct: "2",
    exptext: "Gomdhar Konwar led the Ahom Revolt of 1828 after the land was not returned following the Burma War. Remember Ahom with Gomdhar. Tirot Singh led the Khasi revolt, so that option is wrong."
  },
  34: {
    questext: "The Kuka or Namdhari movement was led by whom?",
    options: ["Ali Musaliar", "Ram Singh Kuka", "Karam Shah", "Jatra Bhagat"],
    correct: "2",
    exptext: "Ram Singh Kuka led the Kuka movement in Punjab and was deported to Rangoon in 1872. Remember Kuka with Punjab. Ali Musaliar led the Moplah rising of Kerala, so he is wrong."
  },
  35: {
    questext: "The Indigo Commission of 1860 was headed by whom?",
    options: ["Walter Seton-Karr", "Lord Dalhousie", "James Long", "William Maxwell"],
    correct: "1",
    exptext: "Walter Seton-Karr headed the Indigo Commission, which reported in 1860. Remember him with Indigo. James Long was jailed for the Neel Darpan translation, so he is the tempting wrong option."
  },
  36: {
    type: "concept", icon: "🗓️", accent: "#f97316", pauseTimer: true,
    title: "Every Movement at a Glance — Twentieth Century Movements",
    html: `
      <p class="cp-lead">The risings of the twentieth century joined the national movement. <u>The three Gandhian satyagrahas and the Kisan Sabha movements are the most asked.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/16.png" alt="Horizontal timeline with nine stops: 1910s Tana Bhagat, 1917 Champaran, 1918 Kheda, 1918 A" data-caption="The twentieth century peasant movements arranged in order of year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/17.png" alt="Telangana rebellion peasants guerrilla photo" data-caption="Peasants of the Telangana rebellion, who fought for land against Razakars." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Movement</th><th>Year</th><th>Region</th><th>Leaders</th><th>Cause and outcome</th></tr></thead><tbody><tr><td>Tana Bhagat Movement</td><td>1910s</td><td>Chotanagpur, Jharkhand</td><td>Jatra Bhagat</td><td>Taxes; non-violent, Gandhi's followers</td></tr><tr><td>Champaran Satyagraha</td><td>1917</td><td>Champaran, Bihar</td><td>Mahatma Gandhi, invited by Rajkumar Shukla</td><td>Tinkathia abolished</td></tr><tr><td>Kheda Satyagraha</td><td>1918</td><td>Kheda, Gujarat</td><td>Gandhi, Vallabhbhai Patel, Indulal Yagnik, Mohanlal Pandya</td><td>Revenue despite crop loss; withdrawn after secret order</td></tr><tr><td>Kisan Sabha Movement (Awadh)</td><td>1918 to 1921</td><td>Awadh, Rure, Pratapgarh</td><td>Gauri Shankar Mishra, Indra Narayan Dwivedi, Baba Ramchandra</td><td>Eviction and forced labour; Awadh Kisan Sabha 1920</td></tr><tr><td>Eka (Unity) Movement</td><td>1921 to 1922</td><td>Hardoi, Bahraich, Sitapur</td><td>Madari Pasi</td><td>Rent fifty percent above record; ended March 1922 by repression</td></tr><tr><td>Mewar Peasant Movement</td><td>1920s</td><td>Mewar, Rajasthan</td><td>Vijay Singh Pathik, Manik Lal Verma</td><td>High land revenue and taxes</td></tr><tr><td>Bardoli Satyagraha</td><td>1928</td><td>Bardoli, Surat, Gujarat</td><td>Vallabhbhai Patel, Mehta brothers, Dayalji Desai</td><td>Tax raised 22 percent; Maxwell-Broomfield enquiry gave 6.03 percent</td></tr><tr><td>Manipur or Naga Movement</td><td>1931 onward</td><td>Manipur and Naga hills</td><td>Jadonang, Rani Gaidinliu</td><td>Independent Naga rule; Jadonang hanged 1931</td></tr><tr><td>Bakasht Agitation</td><td>1936</td><td>Bihar</td><td>Not named</td><td>Landlords evicting tenants; zamindari abolition followed after Independence</td></tr><tr><td>All India Kisan Sabha</td><td>1936</td><td>Lucknow</td><td>Swami Sahajanand Saraswati, Professor Gogineni Ranga Nayukulu</td><td>Save farmers from the landlord class</td></tr><tr><td>Tebhaga Movement</td><td>1946</td><td>Northern Bengal</td><td>Compram Singh, Bhawan Singh</td><td>Two thirds of the produce; Bargadar Act 1949</td></tr><tr><td>Punnapra-Vayalar Uprising</td><td>1946</td><td>Travancore, Kerala</td><td>Communist-led peasants</td><td>Against Dewan Sir Chetpat Pattabhirama Ramaswami Iyer; Travancore joined the Indian Union</td></tr><tr><td>Telangana Rebellion</td><td>1946 to 1951</td><td>Hyderabad, about 3,000 villages</td><td>Communist Party and Andhra Sabha</td><td>Forced labour by Razakars; guerrilla war until 1951</td></tr></tbody></table>
      <div class="cp-note trap">Mixing up regions is the commonest mistake. Remember Champaran for Bihar, Kheda and Bardoli for Gujarat, Awadh for Uttar Pradesh, Tebhaga for Bengal and Telangana for Hyderabad.</div>
    `
  },
  37: {
    questext: "Which movement of Chotanagpur was led by Jatra Bhagat and followed non-violence?",
    options: ["Tana Bhagat Movement", "Eka Movement", "Kol Rebellion", "Mewar Movement"],
    correct: "1",
    exptext: "Jatra Bhagat led the Tana Bhagat Movement, which was non-violent and followed Gandhi. Remember Tana with Jatra. Eka was led by Madari Pasi in Uttar Pradesh and so is wrong."
  },
  38: {
    questext: "The Eka or Unity Movement of 1921 and 1922 was led by whom?",
    options: ["Baba Ramchandra", "Madari Pasi", "Vijay Singh Pathik", "Manik Lal Verma"],
    correct: "2",
    exptext: "Madari Pasi, a low-caste leader, led the Eka Movement in Hardoi, Bahraich and Sitapur. Remember Eka with Madari Pasi. Baba Ramchandra led the Awadh Kisan Sabha, so he is the tempting wrong option."
  },
  39: {
    questext: "The Mewar Peasant Movement of the 1920s was led by whom?",
    options: ["Madari Pasi", "Jatra Bhagat", "Swami Sahajanand Saraswati", "Vijay Singh Pathik"],
    correct: "4",
    exptext: "Vijay Singh Pathik, with Manik Lal Verma, led the Mewar movement in Rajasthan. Remember Mewar with Pathik. Swami Sahajanand worked in Bihar, so that option fails."
  },
  40: {
    questext: "The Punnapra-Vayalar Uprising of 1946 was against which Dewan?",
    options: ["Sir Mirza Ismail", "Sir Chetpat Pattabhirama Ramaswami Iyer", "Sir Akbar Hydari", "Sir Purushottamdas Thakurdas"],
    correct: "2",
    exptext: "The Uprising of 1946 was against Dewan Sir Chetpat Pattabhirama Ramaswami Iyer of Travancore. Remember Travancore with Kerala. The other options were not the Dewan of Travancore."
  },
  41: {
    questext: "Which movement of 1946 to 1951 was fought in Hyderabad against forced labour by Razakars?",
    options: ["Tebhaga Movement", "Bardoli Satyagraha", "Telangana Rebellion", "Eka Movement"],
    correct: "3",
    exptext: "The Telangana Rebellion was fought in Hyderabad state against forced labour and the Razakars. Remember Telangana with Hyderabad. Tebhaga was in Bengal, so it is the tempting wrong option."
  },
  42: {
    type: "concept", icon: "📖", accent: "#ec4899", pauseTimer: true,
    title: "Terms and Systems",
    html: `
      <p class="cp-lead">Many movements fought special systems of land and money. <u>These terms are asked directly, so learn them with their regions.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/18.png" alt="Four-card picture. Card 1 Kamiauti: Odisha and Bihar, lifelong service for debt. Card 2 Da" data-caption="Four old systems of bondage and forced crops, with their regions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/19.png" alt="Neel Darpan indigo planters farmers Bengal illustration" data-caption="An old illustration of farmers forced to grow indigo under planters." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Term</th><th>Region</th><th>Meaning</th></tr></thead><tbody><tr><td>Kamiauti</td><td>Odisha and Bihar</td><td>A Kamiya was bound to lifelong service for interest on debt</td></tr><tr><td>Dadni</td><td>Bengal</td><td>British advances to merchants to get goods from producers</td></tr><tr><td>Dubla-Hali</td><td>Western India, Surat</td><td>Labourers who were bound to the owner's property</td></tr><tr><td>Tinkathia</td><td>Bihar, Champaran</td><td>Indigo forced on three twentieths of the land for mill owners</td></tr></tbody></table>
      <div class="cp-note trap">Match each movement with its Act. Pabna led to the Bengal Tenancy Act 1885, the Deccan Riots to the Relief Act 1879, Tebhaga to the Bargadar Act 1949, the Munda to the Chotanagpur Tenancy Act, the Santhal to the Santhal Pargana Tenancy Act and Champaran to the Agrarian Act 1918.</div>
      <div class="cp-note exam">The Hul Diwas is on 30 June, Birsa died on 9 June 1900, the Malerkotla Kuka blowing of 65 Kukas was in January 1872, and the Namdhari movement began on 12 April 1857 with Baba Ram Singh.</div>
      <div class="cp-note remember">Alluri Sitarama Raju, called Manyam Veerudu, was shot on 7 May 1924. His rising is the Manyam or Rampa Rebellion of 1922 to 1924.</div>
    `
  },
  43: {
    questext: "The Tinkathia system was found in which region?",
    options: ["Champaran", "Awadh", "Malabar", "Khandesh"],
    correct: "1",
    exptext: "Tinkathia forced farmers of Champaran to grow indigo on three twentieths of their land. Remember Tinkathia with Champaran. Awadh is the tempting wrong option as it had a different issue of forced labour."
  },
  44: {
    questext: "What does the term Kamiauti mean?",
    options: ["Rent in kind", "Forced indigo cultivation", "A British land tax", "Lifelong service by a person bound by debt"],
    correct: "4",
    exptext: "Kamiauti was a system in Odisha and Bihar in which a Kamiya was bound to lifelong service for the interest on a debt. Remember Kamiya as a debt servant. Tinkathia is the forced indigo system, which is the tempting wrong option."
  },
  45: {
    questext: "The Dadni system was practised in which region?",
    options: ["Gujarat", "Bengal", "Punjab", "Kerala"],
    correct: "2",
    exptext: "Dadni was practised in Bengal, where merchants gave advance money to producers to get goods from them. Remember Dadni with Bengal. Gujarat is linked with the Dubla-Hali system, which is why it is the tempting wrong option."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a wooden plough, a sheaf of wheat and a traditional bow and arrow, in warm earthy tones" },
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Cornwallis portrait Permanent Settlement 1793\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/1.png. a portrait of Lord Cornwallis",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/2.png": { t: "fig", about: "Three-box diagram with a central arrow. Left boxes: British rulers, Zamindars, Moneylenders, Capitalists labelled Oppressors. Right boxes: Peasants, Tribals, Dispossessed rulers and soldiers labelled Rebels." },
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Neel Darpan Dinabandhu Mitra book cover\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/3.png. the book Neel Darpan",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indigo factory Bengal 19th century historic photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/4.png. an indigo factory with vats",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/5.png": { t: "fig", about: "Four-row table-like picture: Indigo 1860, Bengal, ended by Indigo Commission; Pabna 1873 to 1876, Bengal, led to Bengal Tenancy Act 1885; Deccan 1874 to 1875, Maharashtra, led to Deccan Agriculturists Relief Act 1879; Moplah 1921, Kerala, crushed by martial law." },
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahatma Gandhi Champaran 1917 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/6.png. Gandhi at Champaran",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vallabhbhai Patel Bardoli 1928 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/7.png. Sardar Patel at Bardoli",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/8.png": { t: "fig", about: "Timeline with five boxes: 1917 Champaran, 1918 Kheda, 1918 Awadh Kisan Sabha, 1928 Bardoli, 1936 All India Kisan Sabha at Lucknow." },
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Birsa Munda statue Ranchi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/9.png. a statue of Birsa Munda",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Santhal Hul Sidhu Kanhu memorial Bhognadih photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/10.png. the Sidhu Kanhu memorial",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/11.png": { t: "fig", about: "Two-column comparison. Left Santhal Hul 1855 to 1856: leaders Sidhu, Kanhu, Chand, Bhairav; place Damin-i-Koh; result Santhal Pargana Tenancy Act. Right Munda Ulgulan 1899 to 1900: leader Birsa Munda; place Ranchi; result Chotanagpur Tenancy Act." },
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/12.png": { t: "fig", about: "Horizontal timeline with ten stops: 1763 Sanyasi, 1770s Paharia, 1770 Fakir, 1808 Velu Thampi, 1817 Paika, 1818 Bhil, 1822 Ramosi, 1824 Kittur, 1825 Pagalpanthi, 1827 Khasi." },
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rani Chennamma Kittur fort statue photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/13.png. a statue of Rani Chennamma",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/14.png": { t: "fig", about: "Horizontal timeline with eleven stops: 1827 Visakhapatnam, 1828 Ahom, 1831 Kol, 1840 Kuka, 1844 Gadkari and Sawantwadi, 1846 Khond, 1855 Santhal, 1859 Indigo, 1873 Pabna, 1874 Deccan, 1899 Munda." },
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Santhal rebellion Damin-i-Koh memorial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/15.png. a memorial to the Santhal rebellion",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/16.png": { t: "fig", about: "Horizontal timeline with nine stops: 1910s Tana Bhagat, 1917 Champaran, 1918 Kheda, 1918 Awadh, 1921 Eka, 1928 Bardoli, 1936 All India Kisan Sabha, 1946 Tebhaga, 1946 Telangana." },
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Telangana rebellion peasants guerrilla photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/17.png. peasants of the Telangana rebellion",
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/18.png": { t: "fig", about: "Four-card picture. Card 1 Kamiauti: Odisha and Bihar, lifelong service for debt. Card 2 Dadni: Bengal, advance money for goods. Card 3 Dubla-Hali: Surat, labourers bound to owners. Card 4 Tinkathia: Champaran, indigo on three twentieths of land." },
  "images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Neel Darpan indigo planters farmers Bengal illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Peasant_and_Tribal_Movements/19.png. an old illustration of indigo planters"
});

/* CHANGE LOG
   - Bakasht agitation of Bihar (1936) is described as leading to zamindari abolition after Independence, without naming a single Act year, because zamindari abolition laws were passed state by state.
   - Dates and names such as Walter Seton-Karr, Professor Gogineni Ranga Nayukulu and Sir Chetpat Pattabhirama Ramaswami Iyer are written in full.
*/