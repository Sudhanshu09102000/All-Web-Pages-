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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Revolt_of_1857 · 8 concept pages (+ overview) · 35 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🔥", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — The Revolt of 1857",
    thumb: {
      image: "images/General_Awareness/Modern_India/Revolt_of_1857/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "MODERN INDIA",
      line2: "REVOLT OF 1857",
      line3: "CAUSES • CENTRES • RESULTS",
      badge: "FULL CHAPTER",
      ribbon: "TABLES • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Revolt of 1857 | Causes, Centres, Leaders and Results | Modern India",
      altTitles: ["Revolt of 1857 Centres and Leaders Table in One Class", "1857 Revolt: Greased Cartridge to Queen's Proclamation"],
      description: "The Revolt of 1857 is full of names, places and dates that are easy to mix up. In this class we put everything in order and learn it in simple steps.\n\n📌 IN THIS CLASS\n✅ Background and causes, including Awadh\n✅ Greased cartridge and the chronology of the outbreak\n✅ Centres, leaders and suppressors table\n✅ Why the revolt failed\n✅ Consequences and the Queen's Proclamation\n✅ Books and opinions\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#RevoltOf1857 #ModernIndia #GeneralAwareness",
      tags: ["revolt of 1857", "1857 revolt", "sepoy mutiny", "first war of independence", "modern india history", "mangal pandey", "rani lakshmi bai", "bahadur shah zafar", "tatya tope", "nana sahib", "kunwar singh", "queens proclamation 1858", "government of india act 1858", "greased cartridge", "doctrine of lapse", "awadh annexation", "ssc cgl history", "ssc history", "railway history", "general awareness", "history tricks", "1857 centres and leaders", "indian history for exams", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "Revolt of 1857 for all exams"],
      hashtags: ["RevoltOf1857", "ModernIndia", "GeneralAwareness"],
      thumbText: "REVOLT OF 1857",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Revolt of 1857. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Background\n00:00 Causes: Political and Awadh\n00:00 Causes: Administrative, Social, Religious, Military\n00:00 Spark and Outbreak\n00:00 Centres, Leaders and Suppressors\n00:00 Why the Revolt Failed\n00:00 Consequences\n00:00 Books and Opinions",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Revolt of 1857</u>, the great rising against Company rule. From the greased cartridge to the Queen's Proclamation, this chapter brings sure marks in every General Awareness paper.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>8</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>35</b><span>Questions</span></div>
        <div class="cp-stat"><b>~51 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Background</b><br>How earlier mutinies and the growing anger of sepoys and farmers prepared the ground.</li>
        <li><b>Causes of the Revolt</b><br>The political, administrative, economic, social, religious and military causes, with the story of Awadh.</li>
        <li><b>Spark and Outbreak</b><br>The greased cartridge, Mangal Pandey and the day-by-day chronology to Delhi.</li>
        <li><b>Centres, Leaders and Suppressors</b><br>A clear table of Delhi, Lucknow, Kanpur, Jhansi and the other centres.</li>
        <li><b>Why the Revolt Failed</b><br>The weaknesses that doomed the rising.</li>
        <li><b>Consequences</b><br>Crown rule, the Queen's Proclamation and the changes in the government and the army.</li>
        <li><b>Books and Opinions</b><br>Who wrote what, and what different historians called the revolt.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> leaders, places, dates and suppressors from this chapter are asked again and again in the Staff Selection Commission, Railways and Banking exams, so these facts are easy marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "Background",
    html: `
      <p class="cp-lead">From 1757 to 1857, Company rule was challenged by many local revolts. <u>The Revolt of 1857 was the first that truly shook British rule.</u></p>
      <p class="cp-lead">The Company turned India into a seller of raw material and a buyer of finished goods. Indian industry declined, so more people had to depend on farming. Farmers were forced to grow indigo, cotton, opium, tea, jute and coffee in place of food crops, and food grain output fell. Famines became common, which caused deep anger among the public. The revolt began at Meerut and spread to Kanpur, Bareilly, Jhansi, Delhi, Awadh and other places.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/1.png" alt="Flow diagram in four boxes joined by arrows: Raw material exported, Industry declines, Mor" data-caption="How British economic policy led step by step to public anger." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/2.png" alt="Vellore Fort Tamil Nadu photo" data-caption="Vellore Fort in Tamil Nadu, where the sepoys mutinied in 1806." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Year</th><th>Early mutiny</th></tr></thead><tbody><tr><td>1764</td><td>Bengal Sepoy Mutiny</td></tr><tr><td>1806</td><td>Vellore Mutiny, when the turban was replaced by a leather cockade</td></tr><tr><td>1824</td><td>Mutiny of the 47th Native Infantry</td></tr><tr><td>1825</td><td>Mutiny of the Grenadier Company in Assam</td></tr><tr><td>1838</td><td>Sholapur Mutiny</td></tr></tbody></table>
      <p class="cp-lead">The sepoys had their own anger. Europeans were treated as superior in pay and promotion. The sepoys' demands were ignored, and there was no allowance for service in far places. The General Service Enlistment Act of 1856, brought by Lord Canning, forced them to serve both within and outside India. Interference with religion also caused the Vellore Mutiny of 1806.</p>
      <div class="cp-note trap">All the early mutinies were local and were quickly crushed. Do not call them part of 1857, which was far wider.</div>
      <div class="cp-note exam">The Vellore Mutiny of 1806 began because the turban was replaced by a leather cockade.</div>
    `
  },
  3: {
    questext: "Which mutiny of 1806 was caused when the turban was replaced by a leather cockade?",
    options: ["Barrackpore Mutiny", "Vellore Mutiny", "Sholapur Mutiny", "Meerut Mutiny"],
    correct: "4",
    exptext: "The mutiny at Vellore in 1806 began over the new turban and the leather cockade, which hurt religious feelings. Remember Vellore with the turban. Meerut was the outbreak of 1857, so the Meerut option is wrong."
  },
  4: {
    questext: "The General Service Enlistment Act, which forced sepoys to serve overseas, was passed in which year?",
    options: ["1854", "1856", "1850", "1861"],
    correct: "2",
    exptext: "The General Service Enlistment Act was passed in 1856 under Lord Canning. Crossing the sea was believed to cause loss of caste, so sepoys feared it. The year 1854 is the Post Office Act, which makes it the tempting wrong option."
  },
  5: {
    questext: "Consider the following statements about the pre-1857 mutinies:\n1. The Vellore Mutiny took place in 1806.\n2. The Sholapur Mutiny took place in 1764.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "Only statement 1 is correct. The Sholapur Mutiny was in 1838, and 1764 was the Bengal Sepoy Mutiny. Remember Vellore as 1806 and Sholapur as 1838."
  },
  6: {
    type: "concept", icon: "👑", accent: "#ef4444", pauseTimer: true,
    title: "Causes of the Revolt — Political Causes and the Annexation of Awadh",
    html: `
      <p class="cp-lead">The princes of India feared losing their kingdoms. <u>Two policies caused most of this fear: the Doctrine of Lapse and the Subsidiary Alliance.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/3.png" alt="Lord Dalhousie portrait Doctrine of Lapse" data-caption="Lord Dalhousie, the Governor-General who used the Doctrine of Lapse." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/4.png" alt="Four-box map-like chart: Satara, Sambalpur, Jhansi, Nagpur, each with the label Annexed by" data-caption="The states annexed by the Doctrine of Lapse." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Doctrine of Lapse, used by Lord Dalhousie, said that a state with no natural heir would pass to the Company, and the Subsidiary Alliance of Lord Wellesley had already taken the independence of many rulers. Sambalpur, Jhansi, Satara and Nagpur were annexed by Lapse. The displaced rulers and chiefs later led the revolt.</p>
      <p class="cp-lead">Awadh was annexed in 1856 on the ground of maladministration, because the Doctrine of Lapse could not be used there. Resident Sleeman refused to give a report that would justify the annexation, so Outram was sent, and Awadh was merged on his report. Nawab Wajid Ali Shah was removed by Dalhousie, and Henry Lawrence was made Resident. Most Company sepoys came from Awadh, and they saw the annexation as a betrayal. Lakshmibai and Nana Sahib became bitter enemies.</p>
      <table><thead><tr><th>Policy or event</th><th>Leader</th><th>Effect</th></tr></thead><tbody><tr><td>Subsidiary Alliance</td><td>Lord Wellesley</td><td>Rulers lost independence</td></tr><tr><td>Doctrine of Lapse</td><td>Lord Dalhousie</td><td>Sambalpur, Jhansi, Satara, Nagpur annexed</td></tr><tr><td>Annexation of Awadh</td><td>Lord Dalhousie, 1856</td><td>Sepoys of Awadh felt betrayed</td></tr></tbody></table>
      <div class="cp-note trap">Awadh was annexed for maladministration, not by the Doctrine of Lapse. Sleeman refused to support it, and Outram justified it.</div>
      <div class="cp-note exam">Nawab Wajid Ali Shah was removed in 1856, and Henry Lawrence was made Resident of Awadh.</div>
    `
  },
  7: {
    questext: "Who used the Doctrine of Lapse to annex Indian states?",
    options: ["Lord Wellesley", "Lord Cornwallis", "Lord Dalhousie", "Lord Canning"],
    correct: "3",
    exptext: "Lord Dalhousie used the Doctrine of Lapse. Remember Wellesley with the Subsidiary Alliance and Dalhousie with Lapse. Wellesley is the tempting wrong option because he used the other policy."
  },
  8: {
    questext: "Awadh was annexed by the British in 1856 on what ground?",
    options: ["Doctrine of Lapse", "Subsidiary Alliance", "Revolt of the Nawab", "Maladministration"],
    correct: "4",
    exptext: "Awadh was annexed on the ground of maladministration. Remember that Lapse could not be applied there. The Doctrine of Lapse is the tempting wrong option, but the Nawab had an heir."
  },
  9: {
    questext: "Which British Resident refused to give a report justifying the annexation of Awadh?",
    options: ["Outram", "Sleeman", "Henry Lawrence", "Hearsey"],
    correct: "2",
    exptext: "Resident Sleeman refused to support the annexation, so Outram was sent and justified it. Remember Sleeman refused and Outram agreed. Outram is the tempting wrong option."
  },
  10: {
    questext: "Consider the following statements about the Doctrine of Lapse:\n1. It was used by Lord Dalhousie.\n2. Sambalpur, Jhansi, Satara and Nagpur were annexed under it.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Only 1", "Neither 1 nor 2", "Only 2"],
    correct: "1",
    exptext: "Both statements are correct. Dalhousie annexed these states when the rulers had no natural heir. Remember the four states by their first letters, S-J-S-N, and Dalhousie as the user."
  },
  11: {
    type: "concept", icon: "⚙️", accent: "#3b82f6", pauseTimer: true,
    title: "Causes of the Revolt — Administrative, Economic, Social, Religious and Military",
    html: `
      <p class="cp-lead">Anger had many parts. <u>Land, justice, religion and the army were all hurt at the same time.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/5.png" alt="Five-column chart with headers Administrative, Economic, Social and Religious, Military, a" data-caption="The five groups of causes of the revolt, each with one key example." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/6.png" alt="Enfield rifle cartridge 1857 museum photo" data-caption="An old Enfield rifle with paper cartridges, the spark of the revolt." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Administration and economy: the revenue systems, the Permanent Settlement and the Ryotwari, brought mass poverty. There were twelve major famines between 1770 and 1857. The Sunset Clause made big zamindars and taluqdars lose land, nobles lost privileges, and artisans were ruined by lost patronage and unfair trade policy. Police, officials and lower courts were corrupt, and an Indian judge could not try a Briton.</p>
      <p class="cp-lead">Social and religious: reforms such as the Abolition of Sati in 1829 and the Widow Remarriage Act of 1856 upset orthodox groups, and the Charter Acts of 1813 and 1833 allowed missionaries to preach and convert. The Religious Disabilities Act of 1850 let Christian converts inherit ancestral property. Many saw these as attacks on their own culture.</p>
      <p class="cp-lead">Military: Indian sepoys could not rise above the rank of Subedar, and their pay was low. The Post Office Act of 1854 withdrew the free postal facility, and the General Service Enlistment Act of 1856 made overseas service compulsory. The ban on wearing caste and sectarian symbols added to the anger.</p>
      <table><thead><tr><th>Act</th><th>Year</th><th>Effect</th></tr></thead><tbody><tr><td>Abolition of Sati</td><td>1829</td><td>Opposed by orthodox sections</td></tr><tr><td>Religious Disabilities Act</td><td>1850</td><td>Converts to Christianity could inherit ancestral property</td></tr><tr><td>Post Office Act</td><td>1854</td><td>Free postal facility for sepoys withdrawn</td></tr><tr><td>General Service Enlistment Act</td><td>1856</td><td>Overseas service compulsory</td></tr><tr><td>Hindu Widow Remarriage Act</td><td>1856</td><td>Opposed by orthodox sections</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix the Acts. The Post Office Act is 1854, the Religious Disabilities Act is 1850, and the General Service Enlistment Act is 1856.</div>
    `
  },
  12: {
    questext: "The Post Office Act, which withdrew the free postal facility of sepoys, was passed in which year?",
    options: ["1850", "1854", "1856", "1861"],
    correct: "3",
    exptext: "The Post Office Act of 1854 withdrew the free postal facility. Remember 1850 for religion, 1854 for the post and 1856 for overseas service. The year 1856 is the tempting wrong option."
  },
  13: {
    questext: "The Religious Disabilities Act of 1850 allowed which group to inherit ancestral property?",
    options: ["Widows", "Zamindars", "Missionaries", "Converts to Christianity"],
    correct: "4",
    exptext: "The Act allowed converts to Christianity to inherit ancestral property, and many felt it supported conversion. Remember it as a law about religion. Widows were helped by the Act of 1856, which makes that option wrong."
  },
  14: {
    questext: "Which of the following was a military cause of the revolt?",
    options: ["Sunset Clause", "No promotion above the rank of Subedar", "Charter Act of 1833", "Abolition of Sati"],
    correct: "2",
    exptext: "Indian sepoys could not rise above Subedar, which was a military grievance. The Sunset Clause concerned land, and the Charter Act and Sati concerned religion and society, so they are wrong."
  },
  15: {
    questext: "Consider the following statements about the causes of the revolt:\n1. The Sunset Clause took land from big zamindars and taluqdars.\n2. There were twelve major famines between 1770 and 1857.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "Both statements are correct. The Sunset Clause made big landlords lose land, and twelve famines hit India in those years. Remember both as economic causes."
  },
  16: {
    type: "concept", icon: "🔫", accent: "#10b981", pauseTimer: true,
    title: "Spark and Outbreak",
    html: `
      <p class="cp-lead">The immediate spark of the revolt was a new rifle cartridge. <u>The rumour about the cartridge made sepoys believe that the Company wanted to destroy their religion.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/7.png" alt="Enfield P-53 rifle cartridge 1857 photo" data-caption="An Enfield P-53 rifle with its paper cartridges, introduced in 1856." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/8.png" alt="Mangal Pandey statue Barrackpore photo" data-caption="A statue of Mangal Pandey, who fired the first shot at Barrackpore." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/9.png" alt="Vertical timeline with six dated boxes: 29 March 1857 Mangal Pandey at Barrackpore, 8 Apri" data-caption="The first six weeks of the revolt, from Barrackpore to Delhi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The new Enfield P-53 rifle came in 1856. Its cartridge cover had to be bitten off before loading. A rumour spread that the grease was made of cow fat, which Hindus held sacred, and pig fat, which Muslims could not touch. The sepoys believed the aim was to destroy their religion and convert them, and this was the immediate spark. The rumour first rose at the Dum Dum arsenal near Calcutta in January 1857.</p>
      <table><thead><tr><th>Date</th><th>Event</th></tr></thead><tbody><tr><td>29 March 1857</td><td>Mangal Pandey of the 34th Native Infantry, at Barrackpore, shot Lieutenant Baugh and Sergeant-Major Hewson</td></tr><tr><td>8 April 1857</td><td>Mangal Pandey hanged, regiment disbanded; he is called the first martyr of 1857</td></tr><tr><td>24 April 1857</td><td>Eighty-five sepoys of the 3rd Bengal Light Cavalry refused drill and got ten years in jail</td></tr><tr><td>10 May 1857</td><td>Revolt began at Meerut, with the 20th Native Infantry and the 3rd Light Cavalry</td></tr><tr><td>11 to 12 May 1857</td><td>Rebels reached Delhi on the 11th and captured it on the 12th</td></tr></tbody></table>
      <div class="cp-note trap">Mangal Pandey did not start the revolt at Meerut. He acted at Barrackpore on 29 March, while the real outbreak was at Meerut on 10 May. The commanding officer at Barrackpore was Hearsey.</div>
      <div class="cp-note exam">Chapatis passed from village to village, and the red lotus passed among the regiments, to spread word of the rising.</div>
    `
  },
  17: {
    questext: "The cartridge of which rifle caused the spark of 1857?",
    options: ["Enfield P-53", "Brown Bess", "Martini Henry", "Lee Enfield"],
    correct: "1",
    exptext: "The cartridge of the new Enfield P-53 rifle of 1856 caused the spark, because it was rumoured to contain cow and pig fat. Remember Enfield with 1857. The other rifles were not used in the revolt."
  },
  18: {
    questext: "Mangal Pandey attacked British officers at which place on 29 March 1857?",
    options: ["Meerut", "Delhi", "Barrackpore", "Kanpur"],
    correct: "4",
    exptext: "Mangal Pandey acted at Barrackpore near Calcutta. Remember Barrackpore for 29 March. Meerut is the tempting wrong option, because the real outbreak was there on 10 May."
  },
  19: {
    questext: "The revolt actually began at which place on 10 May 1857?",
    options: ["Barrackpore", "Delhi", "Meerut", "Jhansi"],
    correct: "2",
    exptext: "The revolt began at Meerut on 10 May 1857, when sepoys rose and marched to Delhi. Remember the order Meerut, then Delhi. Barrackpore is the tempting wrong option as it was only an early incident."
  },
  20: {
    questext: "The rebels captured Delhi on which date?",
    options: ["12 May 1857", "10 May 1857", "11 May 1857", "20 September 1857"],
    correct: "1",
    exptext: "The rebels reached Delhi on 11 May and captured it on 12 May 1857. Remember the 11th reached, the 12th captured. The date 20 September 1857 is when the British retook Delhi, so it is the trap."
  },
  21: {
    questext: "Consider the following statements about the outbreak of 1857:\n1. Mangal Pandey was hanged on 8 April 1857.\n2. The revolt began at Barrackpore on 10 May 1857.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Neither 1 nor 2", "Only 1", "Only 2"],
    correct: "3",
    exptext: "Only statement 1 is correct. The revolt began at Meerut on 10 May 1857, not at Barrackpore. Remember Barrackpore as the early incident and Meerut as the true outbreak."
  },
  22: {
    type: "concept", icon: "🗺️", accent: "#8b5cf6", pauseTimer: true,
    title: "Centres, Leaders and Suppressors",
    html: `
      <p class="cp-lead">The revolt had many centres in North and Central India. <u>For each centre, learn the leader, the date of the rising and the officer who crushed it.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/10.png" alt="Delhi Red Fort Bahadur Shah Zafar trial 1858 photo" data-caption="The Red Fort of Delhi, where Bahadur Shah Zafar was tried in 1858." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/11.png" alt="Schematic, not a map: eight labelled boxes arranged roughly north to south: Delhi, Lucknow" data-caption="The main centres of the revolt arranged in a simple chart." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Centre</th><th>Indian leaders</th><th>Date</th><th>Suppressed by</th><th>Key fact</th></tr></thead><tbody><tr><td>Delhi</td><td>Bahadur Shah II Zafar (symbolic), Bakht Khan (real leader from 3 July 1857)</td><td>11 to 12 May 1857</td><td>John Nicholson, Hudson, Lawrence</td><td>Retaken on 20 September 1857; Nicholson was killed; Hudson shot two sons and one grandson of Zafar; Zafar was caught at Humayun's Tomb and sent to Rangoon, where he died in 1862; the Kashmiri Gate was breached</td></tr><tr><td>Lucknow</td><td>Begum Hazrat Mahal (her son Birjis Qadr made Nawab)</td><td>4 June 1857</td><td>Colin Campbell</td><td>Henry Lawrence was killed in the Residency; the English were defeated near Chinhat under Tatya Tope; Havelock and Neill died; Campbell won Lucknow back in November</td></tr><tr><td>Kanpur</td><td>Nana Sahib, Tatya Tope (Ramchandra Pandurang)</td><td>5 June 1857</td><td>Colin Campbell</td><td>Retaken in December 1857; Nana Sahib fled to Nepal; Tatya Tope was betrayed by Man Singh in April 1859; Sati-Chaura Ghat massacre; Nana Sahib declared himself Peshwa</td></tr><tr><td>Jhansi and Gwalior</td><td>Rani Lakshmibai, Tatya Tope</td><td>5 June 1857</td><td>General Hugh Rose</td><td>Revolted after the refusal of an adopted heir; Lakshmibai died fighting in June 1858</td></tr><tr><td>Faizabad</td><td>Maulvi Ahmadullah (Ahmad Shah)</td><td>June 1857</td><td>General Renaud</td><td>Issued a fatwa for jihad; reward of 50,000 rupees; shot on the Rohilkhand border on 5 June 1858</td></tr><tr><td>Bareilly</td><td>Khan Bahadur Khan, who declared himself Nawab</td><td>June 1857</td><td>Colin Campbell</td><td>Defeated and sentenced to death</td></tr><tr><td>Bihar, Jagdishpur</td><td>Kunwar Singh, with brother Amar Singh</td><td>12 June 1857</td><td>William Taylor, Vincent Eyre</td><td>Fought well until his death on 26 April 1858</td></tr><tr><td>Allahabad and Banaras</td><td>Maulvi Liyakat Ali</td><td>June 1857</td><td>Colonel Neill</td><td>Canning made Allahabad his emergency headquarters</td></tr><tr><td>Fatehpur</td><td>Azimullah Khan</td><td>Not given</td><td>Not given</td><td>Wrote the flag song of the revolt</td></tr></tbody></table>
      <p class="cp-lead">Other centres were smaller. In Assam, Maniram Dutt proclaimed the grandson of the last Ahom king as ruler and was arrested and hanged. In Odisha, Surendra Shahi and Ujjawal Shahi rose at Sambalpur, and Surendra Shahi surrendered in 1862. In Kota in Rajasthan, Jai Dayal and Hardayal led the rising, and Jai Dayal was blown apart by a cannon. William Howard Russell of The Times gave a vivid report of the revolt. Bengal, Punjab, Rajputana, Patiala, Jind, Hyderabad and Madras stayed calm, since their rulers and landlords helped the British.</p>
      <div class="cp-note trap">Delhi was reached on 11 May, captured on 12 May and retaken by the British on 20 September 1857. The symbolic leader was Bahadur Shah II, and the real leader was Bakht Khan.</div>
      <div class="cp-note exam">Jhansi and Gwalior were crushed by Hugh Rose, Lucknow, Kanpur and Bareilly by Colin Campbell, Allahabad by Neill, and Bihar by Taylor and Eyre.</div>
    `
  },
  23: {
    questext: "Who was the real leader of the rebels at Delhi?",
    options: ["Bahadur Shah II", "Bakht Khan", "Nana Sahib", "Khan Bahadur Khan"],
    correct: "3",
    exptext: "Bakht Khan was the real leader at Delhi from 3 July 1857, while Bahadur Shah II was only the symbolic head. Remember Zafar as the symbol and Bakht as the force. Zafar is the tempting wrong option."
  },
  24: {
    questext: "Who led the revolt at Lucknow, and made her son Birjis Qadr Nawab?",
    options: ["Rani Lakshmibai", "Begum Hazrat Mahal", "Maulvi Ahmadullah", "Nana Sahib"],
    correct: "4",
    exptext: "Begum Hazrat Mahal led the revolt at Lucknow and made her son Birjis Qadr the Nawab. Remember Hazrat Mahal with Lucknow. Lakshmibai led at Jhansi, so she is the tempting wrong option."
  },
  25: {
    questext: "Which British general crushed the revolt at Jhansi and Gwalior?",
    options: ["General Hugh Rose", "Sir Colin Campbell", "General Renaud", "Colonel Neill"],
    correct: "1",
    exptext: "General Hugh Rose crushed the rising at Jhansi and Gwalior. Remember Rose with Jhansi, and Campbell with Lucknow, Kanpur and Bareilly. Campbell is the tempting wrong option."
  },
  26: {
    questext: "Who was betrayed by his friend Man Singh in April 1859?",
    options: ["Nana Sahib", "Kunwar Singh", "Tatya Tope", "Khan Bahadur Khan"],
    correct: "3",
    exptext: "Tatya Tope was betrayed by his friend Man Singh in April 1859, and he was hanged at Shivpuri. Remember Tatya with betrayal. Nana Sahib fled to Nepal, so he is the tempting wrong option."
  },
  27: {
    questext: "Who led the revolt at Jagdishpur in Bihar?",
    options: ["Maulvi Liyakat Ali", "Kunwar Singh", "Maniram Dutt", "Azimullah Khan"],
    correct: "2",
    exptext: "Kunwar Singh, the zamindar of Jagdishpur, led the revolt in Bihar and died on 26 April 1858. Remember Kunwar with Jagdishpur. Liyakat Ali led at Allahabad, so he is the tempting wrong option."
  },
  28: {
    questext: "Which leader issued a fatwa for jihad and was shot on 5 June 1858?",
    options: ["Khan Bahadur Khan", "Maulvi Ahmadullah", "Bakht Khan", "Jai Dayal"],
    correct: "2",
    exptext: "Maulvi Ahmadullah of Faizabad issued a fatwa for jihad and was shot on the Rohilkhand border. Remember him with a reward of 50,000 rupees. Khan Bahadur Khan led at Bareilly, so he is wrong."
  },
  29: {
    questext: "Consider the following statements about the centres of the revolt:\n1. Bakht Khan was the real leader at Delhi.\n2. Bareilly was led by Khan Bahadur Khan, who declared himself Nawab.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Neither 1 nor 2", "Both 1 and 2"],
    correct: "4",
    exptext: "Both statements are correct. Bakht Khan led at Delhi from 3 July 1857, and Khan Bahadur Khan made himself Nawab at Bareilly. Remember each centre with one name."
  },
  30: {
    type: "concept", icon: "💔", accent: "#0ea5e9", pauseTimer: true,
    title: "Why the Revolt Failed",
    html: `
      <p class="cp-lead">Even though the revolt was fierce, it failed. <u>It was local, short of money and weapons, and it had no single capable leader.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/12.png" alt="Six-box chart with a short label in each box: Localised, Feudal and limited aims, No intel" data-caption="The six main reasons why the revolt of 1857 failed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/13.png" alt="Enfield and Brown Bess musket comparison museum photo" data-caption="Old muskets and swords of the period, which were weak against British artillery." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The revolt was limited to a few centres of North India, mainly Rohilkhand, while the South, West and East stayed quiet. It was mostly a reaction of the local feudal class, with no fixed aim or common goal, and Jind, Patiala, Hyderabad and Nabha helped the British. The educated upper and middle classes feared its feudal character, so there was no intelligentsia behind it.</p>
      <p class="cp-lead">Moneylenders, called mahajans, and bankers were chief targets, so they backed the British, and traders also helped the British for profit. The British had advanced artillery, while Indians used swords and spears. The army did not revolt as a whole, since soldiers from Punjab, the Gorkhas and the Madras army helped crush the Bengal sepoys. John Lawrence said that a single capable leader among the rebels would have defeated the British for ever.</p>
      <table><thead><tr><th>Reason</th><th>Meaning</th></tr></thead><tbody><tr><td>Localised</td><td>Only a few centres of North India</td></tr><tr><td>Feudal, limited aims</td><td>Local feudal class, no common goal</td></tr><tr><td>No intelligentsia</td><td>Educated classes stayed away</td></tr><tr><td>No finance</td><td>Moneylenders and bankers backed the British</td></tr><tr><td>Inferior arms</td><td>Swords and spears against artillery</td></tr><tr><td>No capable leader</td><td>Said by John Lawrence</td></tr></tbody></table>
      <div class="cp-note trap">The revolt did not spread to Bengal, Punjab, Rajputana, Patiala, Jind, Hyderabad or Madras. Do not call it an all-India revolt.</div>
    `
  },
  31: {
    questext: "Who said that, if even one capable leader had been among the rebels, the British would have been defeated for ever?",
    options: ["John Lawrence", "Benjamin Disraeli", "Lord Canning", "Henry Lawrence"],
    correct: "1",
    exptext: "John Lawrence said that a single capable rebel leader would have defeated the British. Remember Lawrence with the lack of a leader. Henry Lawrence was killed at Lucknow, so he is the tempting wrong option."
  },
  32: {
    questext: "Which of the following helped the British during the revolt?",
    options: ["The Peshwa", "Rani of Jhansi", "Rulers of Patiala, Jind and Hyderabad", "Begum of Awadh"],
    correct: "3",
    exptext: "The rulers of Patiala, Jind, Nabha and Hyderabad helped the British. Remember them as the loyal states. The others were leaders of the rising, so they fail."
  },
  33: {
    questext: "Which of the following was NOT a reason for the failure of the revolt?",
    options: ["Lack of a capable leader", "Inferior arms", "Support of moneylenders for the rebels", "Localised nature"],
    correct: "2",
    exptext: "Moneylenders backed the British and not the rebels, so option 3 is the false reason. The other three were real reasons. Remember that mahajans were targets of the rebels."
  },
  34: {
    type: "concept", icon: "👑", accent: "#14b8a6", pauseTimer: true,
    title: "Consequences",
    html: `
      <p class="cp-lead">The revolt ended Company rule. <u>Britain took India under the direct rule of the Crown, and the army and government were remodelled.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/14.png" alt="Queen Victoria portrait 1858 photo" data-caption="Queen Victoria, in whose name the Proclamation of 1858 was issued." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/15.png" alt="Lord Canning portrait first Viceroy of India" data-caption="Lord Canning, the first Viceroy of India and the reader of the Proclamation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/16.png" alt="Flow chart: Cause (economic exploitation, annexations, religious fear), Event (Revolt of 1" data-caption="How the causes led to the revolt and then to Crown rule." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Government of India Act of 1858 ended Company rule and began direct rule by the British Crown. The Queen's Proclamation was read by Lord Canning at a Durbar in Allahabad on 1 November 1858. Queen Victoria promised to honour treaties with princely states and to give up further expansion. The Governor-General was now called Viceroy, and Lord Canning became the first Viceroy of India. Canning was nicknamed Clemency Canning, and the Proclamation is called the Magna Carta of the Indian people.</p>
      <p class="cp-lead">The Board of Control and the Court of Directors were abolished. A new post of Secretary of State for India was created with a Council of 15 members. The Indian Councils Act of 1861 limited Indian representation, and in 1862 Canning nominated three Indians to the Imperial Legislative Council. The Indian Civil Services Act of 1861 promised a competitive examination in India.</p>
      <p class="cp-lead">The army changed too. The share of British soldiers was raised, so the ratio of Indian to British soldiers became 2 to 1 in the Bengal Army and 5 to 2 in the Madras and Bombay armies. Artillery was handed entirely to European soldiers, and recruitment shifted from Bengal and Awadh to Sikhs and Gurkhas.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Government of India Act</td><td>1858, direct Crown rule</td></tr><tr><td>Queen's Proclamation</td><td>1 November 1858, Allahabad Durbar</td></tr><tr><td>First Viceroy</td><td>Lord Canning</td></tr><tr><td>Secretary of State</td><td>Council of 15 members</td></tr><tr><td>Indian Councils Act</td><td>1861</td></tr><tr><td>Indian Civil Services Act</td><td>1861</td></tr><tr><td>Three Indians nominated</td><td>1862</td></tr><tr><td>Army ratio</td><td>2 to 1 in Bengal, 5 to 2 in Madras and Bombay</td></tr></tbody></table>
      <div class="cp-note trap">The Queen's Proclamation was read at Allahabad on 1 November 1858, not at Delhi. Lord Canning was the last Governor-General and first Viceroy.</div>
    `
  },
  35: {
    questext: "The Queen's Proclamation was announced at Allahabad in which year?",
    options: ["1857", "1858", "1861", "1862"],
    correct: "1",
    exptext: "The Queen's Proclamation was announced on 1 November 1858. Remember 1858 for the Government of India Act and the Proclamation. The year 1857 is the revolt itself, and 1861 is the Councils Act, so they are wrong."
  },
  36: {
    questext: "Who was the first Viceroy of India?",
    options: ["Lord Dalhousie", "Lord Canning", "Lord Lytton", "Lord Ripon"],
    correct: "2",
    exptext: "Lord Canning became the first Viceroy of India after the Government of India Act of 1858. Remember Canning as the last Governor-General and the first Viceroy. Dalhousie is the tempting wrong option, as he served before."
  },
  37: {
    questext: "Which Act ended the rule of the East India Company in 1858?",
    options: ["Indian Councils Act, 1861", "Charter Act, 1833", "Government of India Act, 1858", "Regulating Act, 1773"],
    correct: "3",
    exptext: "The Government of India Act of 1858 ended Company rule and began Crown rule. Remember 1858 with the Crown. The Indian Councils Act of 1861 only limited Indian representation, so it is wrong."
  },
  38: {
    questext: "After 1858, a new post was created to help rule India. What was it?",
    options: ["Governor-General", "Chief Commissioner", "Resident", "Secretary of State for India"],
    correct: "4",
    exptext: "The Secretary of State for India, with a Council of 15 members, took over the work of the Board of Control. Remember Secretary of State as the new head in London. The others were older posts."
  },
  39: {
    questext: "Consider the following statements about the consequences of the revolt:\n1. Recruitment shifted from Bengal and Awadh to Sikhs and Gurkhas.\n2. The Court of Directors continued after 1858.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "Only statement 1 is correct. The Court of Directors and the Board of Control were abolished in 1858. Remember that Sikhs and Gurkhas became the favourite recruits after the revolt."
  },
  40: {
    type: "concept", icon: "📚", accent: "#f97316", pauseTimer: true,
    title: "Books and Opinions",
    html: `
      <p class="cp-lead">Many writers have given their own views on 1857. <u>Learn each book with its author, and each opinion with its historian.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/17.png" alt="Two-column chart. Left column Books: Eighteen Fifty-Seven, The Sepoy Mutiny and the Revolt" data-caption="Four well-known books on the revolt and their authors." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolt_of_1857/18.png" alt="Vinayak Damodar Savarkar portrait photo" data-caption="Vinayak Damodar Savarkar, who called the revolt the first war of Indian independence." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Book</th><th>Author</th></tr></thead><tbody><tr><td>Eighteen Fifty-Seven</td><td>Surendra Nath Sen</td></tr><tr><td>The Sepoy Mutiny and the Revolt of 1857</td><td>Ramesh Chandra Majumdar</td></tr><tr><td>The First War of Indian Independence</td><td>Vinayak Damodar Savarkar</td></tr><tr><td>1857: The Great Revolt</td><td>Ashok Mehta</td></tr><tr><td>The History of the Sepoy War in India</td><td>John William Kaye</td></tr><tr><td>The First Indian War of Independence, 1857 to 1859</td><td>Karl Marx and Friedrich Engels</td></tr><tr><td>The Causes of the Indian Revolt</td><td>Sir Syed Ahmad Khan</td></tr></tbody></table>
      <table><thead><tr><th>Historian or writer</th><th>Called the revolt</th></tr></thead><tbody><tr><td>Sir John Lawrence, Sir John Seeley</td><td>A sepoy mutiny</td></tr><tr><td>Benjamin Disraeli</td><td>A national revolt</td></tr><tr><td>James Outram, William Taylor</td><td>A Hindu-Muslim conspiracy</td></tr><tr><td>Rees</td><td>A religious war against Christianity</td></tr><tr><td>Thomas Rice Holmes</td><td>Civilisation versus barbarity</td></tr><tr><td>Savarkar, Ashok Mehta</td><td>An organised war for national independence</td></tr><tr><td>Ramesh Chandra Majumdar</td><td>Not a national freedom struggle</td></tr></tbody></table>
      <div class="cp-note trap">Do not swap Majumdar and Savarkar. Majumdar said the revolt was not a national freedom struggle, and Savarkar called it the first war of Indian independence.</div>
      <div class="cp-note exam">Savarkar's book, written in Marathi, was banned by the British before it was published, and the Causes of the Indian Revolt was written by Sir Syed Ahmad Khan in 1858.</div>
    `
  },
  41: {
    questext: "Who wrote The First War of Indian Independence?",
    options: ["Ashok Mehta", "Surendra Nath Sen", "Ramesh Chandra Majumdar", "Vinayak Damodar Savarkar"],
    correct: "4",
    exptext: "Vinayak Damodar Savarkar called the revolt the first war of Indian independence. Remember Savarkar with the first war. Ashok Mehta wrote 1857: The Great Revolt, which makes him the tempting wrong option."
  },
  42: {
    questext: "Who wrote the book Eighteen Fifty-Seven?",
    options: ["Ramesh Chandra Majumdar", "Surendra Nath Sen", "Ashok Mehta", "John William Kaye"],
    correct: "2",
    exptext: "Surendra Nath Sen wrote Eighteen Fifty-Seven. Remember Sen with Eighteen Fifty-Seven. Majumdar wrote The Sepoy Mutiny and the Revolt of 1857, so he is the tempting wrong option."
  },
  43: {
    questext: "Which historian said the revolt was not a national freedom struggle?",
    options: ["Ashok Mehta", "Vinayak Damodar Savarkar", "Ramesh Chandra Majumdar", "Benjamin Disraeli"],
    correct: "3",
    exptext: "Ramesh Chandra Majumdar said that the revolt was not a national freedom struggle. Remember Majumdar with the opposite view to Savarkar. Disraeli called it a national revolt, so he is the tempting wrong option."
  },
  44: {
    questext: "Which British leader called the revolt a national revolt?",
    options: ["Sir John Lawrence", "James Outram", "Sir John Seeley", "Benjamin Disraeli"],
    correct: "4",
    exptext: "Benjamin Disraeli called it a national revolt. Remember Disraeli as a national revolt. Lawrence and Seeley called it a sepoy mutiny, which makes them the tempting wrong options."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Revolt_of_1857/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an old Enfield rifle, a red lotus flower and a stack of chapati bread, in smoky dark orange tones" },
  "images/General_Awareness/Modern_India/Revolt_of_1857/1.png": { t: "fig", about: "Flow diagram in four boxes joined by arrows: Raw material exported, Industry declines, More dependence on farming, Famines and anger." },
  "images/General_Awareness/Modern_India/Revolt_of_1857/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vellore Fort Tamil Nadu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/2.png. Vellore fort",
  "images/General_Awareness/Modern_India/Revolt_of_1857/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Dalhousie portrait Doctrine of Lapse\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/3.png. a portrait of Lord Dalhousie",
  "images/General_Awareness/Modern_India/Revolt_of_1857/4.png": { t: "fig", about: "Four-box map-like chart: Satara, Sambalpur, Jhansi, Nagpur, each with the label Annexed by Doctrine of Lapse." },
  "images/General_Awareness/Modern_India/Revolt_of_1857/5.png": { t: "fig", about: "Five-column chart with headers Administrative, Economic, Social and Religious, Military, and one short key phrase under each: Indian judge could not try a Briton; Sunset Clause; Charter Acts and missionaries; No promotion above Subedar." },
  "images/General_Awareness/Modern_India/Revolt_of_1857/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Enfield rifle cartridge 1857 museum photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/6.png. an old rifle and paper cartridges",
  "images/General_Awareness/Modern_India/Revolt_of_1857/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Enfield P-53 rifle cartridge 1857 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/7.png. an Enfield rifle with paper cartridges",
  "images/General_Awareness/Modern_India/Revolt_of_1857/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mangal Pandey statue Barrackpore photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/8.png. a statue of Mangal Pandey",
  "images/General_Awareness/Modern_India/Revolt_of_1857/9.png": { t: "fig", about: "Vertical timeline with six dated boxes: 29 March 1857 Mangal Pandey at Barrackpore, 8 April Pandey hanged, 24 April eighty-five sepoys refuse drill, 10 May Meerut outbreak, 11 May rebels reach Delhi, 12 May Delhi captured." },
  "images/General_Awareness/Modern_India/Revolt_of_1857/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Delhi Red Fort Bahadur Shah Zafar trial 1858 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/10.png. the Red Fort of Delhi",
  "images/General_Awareness/Modern_India/Revolt_of_1857/11.png": { t: "fig", about: "Schematic, not a map: eight labelled boxes arranged roughly north to south: Delhi, Lucknow, Kanpur, Jhansi, Faizabad, Bareilly, Jagdishpur, Allahabad." },
  "images/General_Awareness/Modern_India/Revolt_of_1857/12.png": { t: "fig", about: "Six-box chart with a short label in each box: Localised, Feudal and limited aims, No intelligentsia, No finance, Inferior arms, No capable leader." },
  "images/General_Awareness/Modern_India/Revolt_of_1857/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Enfield and Brown Bess musket comparison museum photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/13.png. muskets and swords of the period",
  "images/General_Awareness/Modern_India/Revolt_of_1857/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Queen Victoria portrait 1858 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/14.png. a portrait of Queen Victoria",
  "images/General_Awareness/Modern_India/Revolt_of_1857/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Canning portrait first Viceroy of India\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/15.png. a portrait of Lord Canning",
  "images/General_Awareness/Modern_India/Revolt_of_1857/16.png": { t: "fig", about: "Flow chart: Cause (economic exploitation, annexations, religious fear), Event (Revolt of 1857), Result (Government of India Act 1858, direct Crown rule)." },
  "images/General_Awareness/Modern_India/Revolt_of_1857/17.png": { t: "fig", about: "Two-column chart. Left column Books: Eighteen Fifty-Seven, The Sepoy Mutiny and the Revolt of 1857, The First War of Indian Independence, 1857: The Great Revolt. Right column Authors: Surendra Nath Sen, Ramesh Chandra Majumdar, Vinayak Damodar Savarkar, Ashok Mehta." },
  "images/General_Awareness/Modern_India/Revolt_of_1857/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vinayak Damodar Savarkar portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolt_of_1857/18.png. a portrait of Savarkar"
});

/* CHANGE LOG
   - The eighty-five sepoys who refused drill on 24 April 1857 belonged to the 3rd Bengal Light Cavalry (not the Light Infantry); the pages state Light Cavalry.
   - Bareilly was reconquered by Colin Campbell; Vincent Eyre is named only for Bihar, since the two tables differed.
   - Lucknow was reconquered by Colin Campbell; Henry Lawrence was killed in the siege of the Residency and is not listed as a suppressor.
   - The death of Rani Lakshmibai is given as June 1858 without a single day, because sources differ between 17 and 18 June.
   - The Subedar rank limit for Indian soldiers is stated without naming the Charter Act of 1793.
   - Full names of authors and historians are written out in place of initials.
*/