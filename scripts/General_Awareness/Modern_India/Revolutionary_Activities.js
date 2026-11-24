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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Revolutionary_Activities · 15 concept pages (+ overview) · 40 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Revolutionary Activities",
    thumb: {
      image: "images/General_Awareness/Modern_India/Revolutionary_Activities/thumbnail.png",
      banner: "MODERN INDIA 2026",
      line1: "REVOLUTIONARY",
      line2: "ACTIVITIES",
      line3: "FULL CHAPTER",
      badge: "FULL CLASS",
      ribbon: "NAMES • YEARS • CASES",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Revolutionary Activities Modern India | Kakori, HSRA, Ghadar, Chittagong | SSC CGL",
      altTitles: ["Revolutionary Activities Complete Chapter in One Class", "Kakori to Chittagong: Revolutionaries Tricks and Tables"],
      description: "Revolutionary Activities is a favourite chapter in Staff Selection Commission papers. In this class we learn the secret societies, the famous cases, the groups abroad and the later phase step by step, in very simple words.\n\n📌 IN THIS CLASS\n✅ Early phase in Maharashtra, Bengal, Punjab and Madras\n✅ India House, Ghadar Party and Komagata Maru\n✅ Kakori, Saunders murder and Chittagong Armoury Raid\n✅ Organisation and publication tables\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernIndia #Revolutionaries",
      tags: ["revolutionary activities", "revolutionary movement india", "modern india history", "ssc cgl history", "kakori conspiracy", "hsra bhagat singh", "ghadar party", "india house london", "chittagong armoury raid", "surya sen", "alipore conspiracy case", "anushilan samiti", "komagata maru", "abhinav bharat society", "history for ssc", "static gk", "general awareness", "railway ntpc history", "banking exams gk", "modern india one shot", "revolutionaries of india", "important conspiracy cases", "SSC CGL", "UPSC", "Banking", "Revolutionary Activities Mo"],
      hashtags: ["SSCCGL", "ModernIndia", "Revolutionaries"],
      thumbText: "REVOLUTIONARY ACTIVITIES",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Revolutionary Activities, from Chapekar brothers to Chittagong. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Indian revolutionaries who tried to end British rule by force</u>. We will learn who they were, where they worked, what they did and why their movement faded.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>15</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>40</b><span>Questions</span></div>
        <div class="cp-stat"><b>~70 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Revolutionary Extremism</b><br>What the revolutionaries believed and why the movement began.</li>
        <li><b>Early Phase Before 1920</b><br>The secret societies and famous attacks in Maharashtra, Bengal, Punjab and Madras.</li>
        <li><b>Revolutionary Movements Abroad</b><br>India House in London, the Ghadar Party in America, and the first government of free India in Kabul.</li>
        <li><b>Revolutionary Organisations</b><br>One table of groups, years, founders and places.</li>
        <li><b>Later Phase After 1920</b><br>The communists, the Hindustan Republican Association, the Hindustan Socialist Republican Association and the Chittagong Armoury Raid.</li>
        <li><b>Publications, Decline and Significance</b><br>The newspapers that spread the ideas, and why the movement ended.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Staff Selection Commission papers repeat names, years, places and organisations from this chapter again and again, so a clear table in your mind gives you easy marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🔥", accent: "#ef4444", pauseTimer: true,
    title: "Revolutionary Extremism",
    html: `
      <p class="cp-lead">Revolutionary extremists believed that British rule could be removed only by <b>violent methods</b>. <u>They were young people who had lost faith in petitions and speeches.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/1.png" alt="Mind-map: centre box Revolutionary Extremism; four branches labelled Belief, Objectives, C" data-caption="The main ideas of revolutionary extremism gathered in one mind-map." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/2.png" alt="Partition of Bengal 1905 protest Swadeshi photo" data-caption="People protesting against the Partition of Bengal in 1905, which angered young Indians." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Their <b>objectives</b> were an armed overthrow of British rule, <b>political dacoities</b> (robberies to collect money for the cause) and the killing of hostile officials. Their main centres were Punjab, Bengal and Maharashtra.</p>
      <table><thead><tr><th>Cause</th><th>Why it mattered</th></tr></thead><tbody><tr><td>Disillusionment with the Moderates</td><td>Prayers and petitions had brought very little result</td></tr><tr><td>Congress Extremists</td><td>Bold nationalism taught the young to act</td></tr><tr><td>Cultural revivalism</td><td>Pride in India's past made foreign rule feel shameful</td></tr><tr><td>Partition of Bengal, 1905</td><td>The division of Bengal and the Swadeshi movement stirred anger</td></tr><tr><td>Economic Drain Theory</td><td>It showed that India's wealth was flowing to Britain</td></tr><tr><td>Distress after the First World War</td><td>Poverty and unemployment made youth restless</td></tr><tr><td>Italian secret societies and the Russian Nihilist Movement</td><td>Their secret and violent methods were models to copy</td></tr></tbody></table>
      <div class="cp-note tip">The Russian Nihilist Movement was a group of young Russians who used violence against the Tsar. Indian youth copied its secret methods.</div>
      <div class="cp-note exam">Questions often ask which factor was NOT a cause. Remember that the Partition of Bengal, 1905, is a cause, but the Government of India Act, 1935, came much later.</div>
    `
  },
  3: {
    questext: "Which of the following was NOT a cause of the rise of revolutionary extremism in India?",
    options: ["Partition of Bengal in 1905", "Disillusionment with the Moderates", "Economic Drain Theory", "Government of India Act of 1935"],
    correct: "4",
    exptext: "✅ The Government of India Act of 1935 came long after the movement began. 📌 Causes must come before the effect. ❌ The Partition of Bengal in 1905 is tempting because it sounds like a late event, but it was a major early cause."
  },
  4: {
    questext: "Which Russian movement served as a model for Indian revolutionary extremists?",
    options: ["Nihilist Movement", "Luddite Movement", "Chartist Movement", "Suffragette Movement"],
    correct: "1",
    exptext: "✅ The Russian Nihilist Movement used secret and violent methods that Indian youth admired. 📌 Nihilist means Russian rebels. ❌ The Chartist Movement is tempting but it was a British peaceful reform movement."
  },
  5: {
    type: "concept", icon: "🏹", accent: "#f97316", pauseTimer: true,
    title: "Early Phase: Maharashtra",
    html: `
      <p class="cp-lead">Maharashtra was the first home of revolutionary violence. <u>It began with the Chapekar brothers in 1897.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/3.png" alt="Timeline with three points: 1897 Chapekar brothers shoot Rand; 1899 Mitra Mela; 1909 Nasik" data-caption="Key events of the revolutionary movement in Maharashtra in order of time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/4.png" alt="Vinayak Damodar Savarkar portrait photo" data-caption="Vinayak Damodar Savarkar, leader of Mitra Mela and Abhinav Bharat Society." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/5.png" alt="Cellular Jail Port Blair photo" data-caption="The Cellular Jail at Port Blair in the Andaman Islands, where many revolutionaries were sent." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">On 22 June 1897, the night of Queen Victoria's Diamond Jubilee celebration at Pune, the <b>Chapekar brothers</b>, Damodar and Balkrishna, shot Walter Charles Rand, the Chairman of the Plague Committee, and his escort Lieutenant Ayerst. They belonged to the Hindu Dharma Sangha and were hanged. Bal Gangadhar Tilak was jailed for 18 months for articles in his newspaper Kesari.</p>
      <p class="cp-lead">In 1899 Vinayak Damodar Savarkar and Ganesh Savarkar began <b>Mitra Mela</b>. In 1904 it became the <b>Abhinav Bharat Society</b>, which spread in Maharashtra and the Central Provinces and was linked to the Indian Home Rule Society in London.</p>
      <table><thead><tr><th>Event</th><th>Details</th></tr></thead><tbody><tr><td>Nasik Conspiracy Case, 1909</td><td>Anant Kanhere killed Jackson, the Collector of Nasik; 27 persons were jailed</td></tr><tr><td>Babarao (Ganesh) Savarkar</td><td>Sent to the Andaman Islands for life</td></tr><tr><td>Vinayak Damodar Savarkar</td><td>Given two life terms (50 years) in 1911 and sent to the Cellular Jail</td></tr><tr><td>His escape, 1910</td><td>He jumped ship at Marseilles; the case went to the Permanent Court of Arbitration at The Hague</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse Mitra Mela, 1899, with the Abhinav Bharat Society, 1904. They are the same group with a new name.</div>
    `
  },
  6: {
    questext: "Who shot Walter Charles Rand, the Plague Committee chairman at Pune, in 1897?",
    options: ["Chapekar brothers", "Anant Kanhere", "Madan Lal Dhingra", "Khudi Ram Bose"],
    correct: "1",
    exptext: "✅ Damodar and Balkrishna Chapekar shot Rand on 22 June 1897. 📌 Chapekar means Pune, 1897. ❌ Anant Kanhere is tempting because he also belonged to Maharashtra, but he killed Collector Jackson in 1909."
  },
  7: {
    questext: "The Nasik Conspiracy Case of 1909 was linked to the killing of which officer?",
    options: ["Ashe", "Kingsford", "Curzon Wylie", "Jackson"],
    correct: "4",
    exptext: "✅ Anant Kanhere shot Jackson, the Collector of Nasik. 📌 Nasik and Jackson both have the sound of a short word pair. ❌ Ashe is tempting but he was killed at Tirunelveli in Madras."
  },
  8: {
    questext: "Consider the following statements about Maharashtra:\n1. Mitra Mela was founded in 1899.\n2. The Abhinav Bharat Society was founded by Aurobindo Ghosh.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Savarkar means Mitra Mela. ❌ Statement 2 is wrong because the Savarkar brothers led the Abhinav Bharat Society, while Aurobindo Ghosh worked in Bengal."
  },
  9: {
    type: "concept", icon: "🌿", accent: "#10b981", pauseTimer: true,
    title: "Early Phase: Bengal, Secret Societies and the Alipore Case",
    html: `
      <p class="cp-lead">Bengal became the strongest centre of revolutionary work. <u>Secret societies trained young people, and their first famous action was the Alipore bomb of 1908.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/6.png" alt="Timeline: 1901 Anushilan Samiti; 1905 Bhawani Mandir; 1907 attempt on the Lieutenant Gover" data-caption="Main events of the early Bengal revolutionaries arranged in time order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/7.png" alt="Khudiram Bose portrait photo" data-caption="Khudiram Bose, the young revolutionary hanged in 1908 at the age of eighteen." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/8.png" alt="Aurobindo Ghosh young portrait photo" data-caption="Aurobindo Ghosh, who was tried in the Alipore case and acquitted." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Item</th><th>Facts</th></tr></thead><tbody><tr><td>Anushilan Samiti, 1901</td><td>Had 1,400 branches and 84,000 members; leaders were Chittaranjan Das, Surendranath Tagore, Bagha Jatin, Bhupendra Nath Datta and Barindra Ghosh; the Dhaka wing was led by Pulin Behari Das</td></tr><tr><td>Bhawani Mandir, 1905</td><td>A pamphlet by Barindra Kumar Ghosh, written by Aurobindo</td></tr><tr><td>Newspapers</td><td>Vartaman Rananiti, Yugantar and Sandhya</td></tr><tr><td>1907</td><td>A failed attempt on the Lieutenant Governor of Eastern Bengal</td></tr></tbody></table>
      <p class="cp-lead">On <b>30 April 1908</b>, Prafulla Chaki and Khudi Ram Bose threw a bomb at the carriage of Kingsford, the unpopular judge of Muzaffarpur. It was the wrong carriage, and two ladies were killed.</p>
      <p class="cp-lead">Chaki shot himself when caught, and Bose was hanged on 11 August 1908. The Anushilan group was arrested in the <b>Alipore Conspiracy Case</b>: <b>Aurobindo was acquitted</b> and Barindra was given a life sentence.</p>
      <div class="cp-note trap">Some sources give 1902 for the Anushilan Samiti, but 1901 is the date to remember.</div>
    `
  },
  10: {
    questext: "The Alipore bomb of 30 April 1908 was thrown at the carriage of which judge?",
    options: ["Kingsford", "Rand", "Jackson", "Ashe"],
    correct: "1",
    exptext: "✅ The target was Kingsford, the judge of Muzaffarpur, but the wrong carriage was hit. 📌 K for Kingsford, K for Khudi Ram. ❌ Jackson is tempting but he was killed in Nasik in 1909."
  },
  11: {
    questext: "In the Alipore Conspiracy Case, which leader was acquitted?",
    options: ["Aurobindo Ghosh", "Barindra Kumar Ghosh", "Prafulla Chaki", "Bagha Jatin"],
    correct: "1",
    exptext: "✅ Aurobindo Ghosh was acquitted, while his brother Barindra got a life sentence. 📌 Brothers, one free and one jailed. ❌ Barindra is tempting because he was also tried, but he was sentenced."
  },
  12: {
    questext: "Which was a revolutionary pamphlet written by Aurobindo and published by Barindra Kumar Ghosh in 1905?",
    options: ["Bandi Jivan", "Bharat Mata", "Pather Dabi", "Bhawani Mandir"],
    correct: "4",
    exptext: "✅ Bhawani Mandir was published by Barindra Kumar Ghosh in 1905. 📌 B for Barindra, B for Bhawani. ❌ Bandi Jivan is tempting but it was written by Sachindranath Sanyal."
  },
  13: {
    type: "concept", icon: "💣", accent: "#8b5cf6", pauseTimer: true,
    title: "Early Phase: Bengal, Delhi Case and the German Plan",
    html: `
      <p class="cp-lead">After 1908 the government passed harsh laws, but the revolutionaries struck again at the top. <u>The Delhi Conspiracy Case of 1912 aimed at the Viceroy himself.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/9.png" alt="Rash Behari Bose portrait photo" data-caption="Rash Behari Bose, who planned the bomb attack on Viceroy Lord Hardinge in 1912." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/10.png" alt="Bagha Jatin Jatindranath Mukherjee portrait photo" data-caption="Bagha Jatin, who died fighting the police at Balasore in 1915." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">In 1912 <b>Rash Behari Bose</b> threw a bomb at Lord Hardinge when the capital was shifted from Calcutta to Delhi. The attempt failed, and Bose escaped to Japan. Bal Mukund, Awadh Bihari, Basant Kumar Biswas and Amir Chandra were tried.</p>
      <p class="cp-lead">The government replied with the <b>Explosive Substances Act, 1908</b> and the <b>Newspaper Act, 1910</b>. Many revolutionaries went underground or abroad. Aurobindo went to a Pondicherry ashram, and Brahmabandhab Bandyopadhyay joined the Ramakrishna Math.</p>
      <p class="cp-lead"><b>Bagha Jatin</b> of the Anushilan and Yugantar groups organised the <b>Hindu–German Conspiracy</b>, also called the Zimmermann Plan. It leaked, and Bagha Jatin died in an encounter on <b>9 September 1915</b> at Balasore in Odisha.</p>
      <table><thead><tr><th>Law or event</th><th>Year</th></tr></thead><tbody><tr><td>Explosive Substances Act</td><td>1908</td></tr><tr><td>Newspaper Act</td><td>1910</td></tr><tr><td>Delhi Conspiracy Case</td><td>1912</td></tr><tr><td>Death of Bagha Jatin at Balasore</td><td>1915</td></tr></tbody></table>
      <div class="cp-note trap">The Delhi Conspiracy Case, 1912, is about Lord Hardinge. Do not mix it with the Lahore Conspiracy Case of 1929.</div>
    `
  },
  14: {
    questext: "Who threw the bomb at Viceroy Lord Hardinge in 1912?",
    options: ["Bhagat Singh", "Surya Sen", "Sohan Singh Bhakna", "Rash Behari Bose"],
    correct: "4",
    exptext: "✅ Rash Behari Bose threw the bomb during the Delhi entry procession. 📌 H for Hardinge, H for Hindustan's Rash Behari. ❌ Bhagat Singh is tempting but he threw bombs in the Assembly in 1929."
  },
  15: {
    questext: "Bagha Jatin died in 1915 in an encounter at which place?",
    options: ["Kanpur", "Pune", "Lahore", "Balasore"],
    correct: "4",
    exptext: "✅ Bagha Jatin died fighting the police at Balasore in Odisha on 9 September 1915. 📌 B for Bagha, B for Balasore. ❌ Lahore is tempting because many cases happened there, but it is not linked to him."
  },
  16: {
    type: "concept", icon: "🌾", accent: "#eab308", pauseTimer: true,
    title: "Early Phase: Punjab and Madras",
    html: `
      <p class="cp-lead">In Punjab the revolutionary mood grew out of peasant anger. <u>In Madras the best known act was the killing of a District Magistrate.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/11.png" alt="Lala Lajpat Rai portrait photo" data-caption="Lala Lajpat Rai, deported to Mandalay in 1907 without trial." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/12.png" alt="Two-column chart: Punjab column lists Bharat Mata Society, Anjuman-i-Mohibban-i-Watan, Bha" data-caption="Groups and events of Punjab placed beside those of Madras." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Jatin Mohan Chatterjee ran the <b>Bharat Mata Society</b> at Saharanpur, which later moved to Punjab. It was the Punjab counterpart of the Ghadar movement, and for its activity Punjab was placed under Martial Law before Jallianwala Bagh.</p>
      <p class="cp-lead"><b>Ajit Singh</b>, uncle of Bhagat Singh, ran the Anjuman-i-Mohibban-i-Watan at Lahore and the journal Bharat Mata. He later went to America and founded the Ghadar Party along with Lala Hardayal.</p>
      <p class="cp-lead">In 1907 <b>Lala Lajpat Rai and Ajit Singh were deported to Mandalay in Burma</b> without trial because of the peasant agitation called Pagri Sambhal Jatta. After that, the extremist mood in Punjab cooled for a time.</p>
      <p class="cp-lead">The <b>First Lahore Conspiracy Case, 1915</b> was a plan by revolutionaries of Bengal, Punjab, the United States of America, Canada and Germany to start a rising in North India. It leaked, and Prithvi Singh, Kartar Singh Sarabha and Parmanand were jailed or executed.</p>
      <p class="cp-lead">In Madras, the <b>Bharat Mata Samiti, 1904</b>, was led by Nilkanth Brahmchari and Vanchi Iyer. Vanchi Iyer killed Ashe, the District Magistrate of Tirunelveli, and then shot himself.</p>
      <div class="cp-note trap">Bharat Mata Society (Saharanpur, Punjab) and Bharat Mata Samiti (Madras, 1904) have almost the same name but are different groups.</div>
    `
  },
  17: {
    questext: "Who was killed by Vanchi Iyer in Madras, who then ended his own life?",
    options: ["Jackson", "Ashe", "Rand", "Saunders"],
    correct: "2",
    exptext: "✅ Vanchi Iyer killed Ashe, the District Magistrate of Tirunelveli. 📌 Ashe sounds like ash after the shot. ❌ Jackson is tempting but he was the Collector of Nasik."
  },
  18: {
    questext: "The peasant agitation called Pagri Sambhal Jatta led to the deportation of which leaders to Mandalay in 1907?",
    options: ["Bhagat Singh and Sukhdev", "Lala Lajpat Rai and Ajit Singh", "Lala Hardayal and Ramchandra", "Sohan Singh and Kartar Singh"],
    correct: "2",
    exptext: "✅ Lala Lajpat Rai and Ajit Singh were sent to Mandalay without trial. 📌 Two L and A leaders, Mandalay in Burma. ❌ Lala Hardayal is tempting because he is also called Lala, but he worked in America."
  },
  19: {
    type: "concept", icon: "🏛️", accent: "#0ea5e9", pauseTimer: true,
    title: "Revolutionary Movements Abroad: England",
    html: `
      <p class="cp-lead">Indian students in London began a revolutionary centre in 1905. <u>It was called India House.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/13.png" alt="India House Highgate London photo" data-caption="India House in London, the centre of Indian revolutionaries in England." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/14.png" alt="Shyamji Krishna Varma portrait photo" data-caption="Shyamji Krishna Varma, who started the Indian Home Rule Society and India House." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/15.png" alt="Madame Bhikaiji Cama Stuttgart flag photo" data-caption="Madame Bhikaiji Cama, who raised an Indian flag at Stuttgart in Germany." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Shyamji Krishna Varma</b> gave scholarships to Indian students, and so India House was set up in London in <b>February 1905</b>. Its aim was home rule through propaganda in Britain, and its paper was <b>Indian Sociologist</b>. The absolute aim was freedom.</p>
      <p class="cp-lead">The London Times attacked him, so he moved to Paris. There <b>Madame Bhikaiji Cama</b>, called the Mother of Indian Revolutionaries, worked with him. At the International Socialist Conference at Stuttgart she raised the tricolour flag of green, yellow and red.</p>
      <p class="cp-lead"><b>Madan Lal Dhingra</b> shot Curzon Wylie, an official of the Council of the Secretary of State for India, in London, and was hanged. Savarkar was arrested in London in 1910, and the revolutionary movement in Britain then lost its leader.</p>
      <table><thead><tr><th>Person or place</th><th>Role</th></tr></thead><tbody><tr><td>Shyamji Krishna Varma</td><td>Founder of India House and Indian Sociologist</td></tr><tr><td>Madame Cama</td><td>Raised the flag at Stuttgart; Paris Indian Society</td></tr><tr><td>Madan Lal Dhingra</td><td>Shot Curzon Wylie and was hanged</td></tr><tr><td>V. D. Savarkar</td><td>Leader of the youth at India House</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix the Indian Sociologist (Shyamji Krishna Varma, London) with the weekly Ghadar (Lala Hardayal, San Francisco).</div>
    `
  },
  20: {
    questext: "Who shot Curzon Wylie in London?",
    options: ["Udham Singh", "Madan Lal Dhingra", "Khudi Ram Bose", "Kartar Singh Sarabha"],
    correct: "2",
    exptext: "✅ Madan Lal Dhingra shot Curzon Wylie and was hanged. 📌 Dhingra and Wylie both end with a hard sound. ❌ Udham Singh is tempting because he killed an official in London, but that was Michael O'Dwyer in 1940."
  },
  21: {
    questext: "Madame Bhikaiji Cama is known for which act?",
    options: ["Founding the Ghadar Party", "Founding India House", "Hitting Lord Hardinge", "Raising the Indian flag at Stuttgart"],
    correct: "4",
    exptext: "✅ She raised the flag of green, yellow and red at the International Socialist Conference at Stuttgart. 📌 Cama and colours. ❌ Founding India House is tempting but that was done by Shyamji Krishna Varma."
  },
  22: {
    type: "concept", icon: "⚓", accent: "#14b8a6", pauseTimer: true,
    title: "Revolutionary Movements Abroad: America, Canada and Singapore",
    html: `
      <p class="cp-lead">Many Indian workers who went to the Pacific coast met racism and became revolutionaries. <u>Their party was the Ghadar Party.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/16.png" alt="Komagata Maru Vancouver 1914 photo" data-caption="The ship Komagata Maru at Vancouver in 1914 with Indian passengers on board." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/17.png" alt="Lala Har Dayal portrait photo" data-caption="Lala Hardayal, chief editor of the Ghadar weekly." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/18.png" alt="Timeline: 1906 Indians active in United States; 1908 Free Hindustan; 1913 Ghadar Party; 19" data-caption="Key events of Indian revolutionaries in North America and Singapore." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">From about 1906 Indians were active in the United States of America and Canada. <b>Taraknath Das</b> started the paper <b>Free Hindustan</b> in 1908. Canada also made rules to stop Indian immigration, and ships were halted at Japan and Hawaii.</p>
      <p class="cp-lead">In 1913 <b>Sohan Singh Bhakna</b> founded the <b>Hind Association</b> at San Francisco. It issued the weekly <b>Ghadar</b> (Hindustan Ghadar) in <b>February 1913</b>, whose chief editor was <b>Lala Hardayal</b>. The movement took its name from the paper.</p>
      <p class="cp-lead">In 1914 the Germans gave contact to the Indian Independence Committee in Berlin and the German Union of Friends of India (1915). The Ghadar rising was fixed for <b>21 February 1915</b> in Punjab through the 23rd Cavalry, and in Singapore through the 5th Light Infantry. When the United States entered the First World War in 1917 as Britain's ally, the movement collapsed.</p>
      <p class="cp-lead">The <b>Komagata Maru</b> was a Japanese ship hired by <b>Baba Gurdit Singh</b>. It carried 376 travellers from South-East Asia, was refused docking at Vancouver, and was forced back to Kolkata on <b>23 May 1914</b>. In the Budge Budge riot 18 were killed and the rest were detained till the end of the war.</p>
      <p class="cp-lead">In the <b>Singapore Mutiny, 1915</b>, the 5th Native Light Infantry under Dunde Khan, Chisti Khan and Ali Khan was crushed by Japanese, Russian and French soldiers, and the rebels were executed.</p>
      <div class="cp-note trap">The Ghadar rising date is 21 February 1915, and the Komagata Maru was sent back from Vancouver on 23 May 1914. Do not swap the years.</div>
    `
  },
  23: {
    questext: "The Komagata Maru incident of 1914 was linked to which Indian leader who hired the ship?",
    options: ["Lala Hardayal", "Sohan Singh Bhakna", "Baba Gurdit Singh", "Taraknath Das"],
    correct: "3",
    exptext: "✅ Baba Gurdit Singh hired the Japanese ship Komagata Maru, which Vancouver refused to admit. 📌 G for Gurdit, G for the ship that went to Canada. ❌ Sohan Singh Bhakna is tempting because he led the Hind Association, but he was in San Francisco."
  },
  24: {
    questext: "Who was the chief editor of the weekly Ghadar, which gave its name to the movement?",
    options: ["Lala Hardayal", "Ajit Singh", "Taraknath Das", "Barkatullah"],
    correct: "1",
    exptext: "✅ Lala Hardayal was the chief editor of the weekly Ghadar, started in February 1913. 📌 Hardayal and Ghadar both have a hard sound. ❌ Taraknath Das is tempting but he ran Free Hindustan in 1908."
  },
  25: {
    questext: "Consider the following statements:\n1. The Hind Association was founded by Sohan Singh Bhakna at San Francisco in 1913.\n2. The Singapore Mutiny of 1915 was by the 5th Light Infantry.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Ghadar means 1913 San Francisco and 1915 Singapore. ❌ A tempting wrong choice is that only one place matters, but the movement worked in both America and Singapore."
  },
  26: {
    type: "concept", icon: "🕌", accent: "#ec4899", pauseTimer: true,
    title: "Revolutionary Movements Abroad: Afghanistan",
    html: `
      <p class="cp-lead">In Afghanistan Indian revolutionaries formed the first free government of India, long before independence. <u>It was set up at Kabul.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/19.png" alt="Raja Mahendra Pratap Provisional Government Kabul photo" data-caption="Raja Mahendra Pratap, head of the Provisional Government of India set up in Kabul in 1915." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/20.png" alt="Flow: Kabul 1915, Provisional Government of India, President Raja Mahendra Pratap, Prime M" data-caption="The leaders of the first Provisional Government of India formed at Kabul." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">At Kabul <b>Raja Mahendra Pratap</b> declared jihad and set up the <b>first free Provisional Government of India</b> in 1915. <b>Barkatullah</b> was Prime Minister and <b>Maulvi Ubaidullah Sindhi</b> was Home Minister. British pressure forced them out.</p>
      <p class="cp-lead">The <b>Silk Letter Conspiracy, 1915</b>: Sindhi and the Deoband leaders asked the Amir of Afghanistan for help. The Punjab Criminal Investigation Department caught the silk cloth letters passing between Sindhi and Mahmud al Hasan in Arabia.</p>
      <table><thead><tr><th>Name</th><th>Role</th></tr></thead><tbody><tr><td>Raja Mahendra Pratap</td><td>President of the Provisional Government, Kabul</td></tr><tr><td>Barkatullah</td><td>Prime Minister</td></tr><tr><td>Maulvi Ubaidullah Sindhi</td><td>Home Minister</td></tr><tr><td>Mahmud al Hasan</td><td>Leader of the Deoband group, in Arabia</td></tr></tbody></table>
      <div class="cp-note trap">Barkatullah is Prime Minister of the Kabul government, while Raja Mahendra Pratap is its head.</div>
    `
  },
  27: {
    questext: "Who was the Prime Minister of the first Provisional Government of India formed at Kabul in 1915?",
    options: ["Maulvi Ubaidullah Sindhi", "Raja Mahendra Pratap", "Barkatullah", "Mohan Singh"],
    correct: "3",
    exptext: "✅ Barkatullah was the Prime Minister, and Raja Mahendra Pratap led the government. 📌 B for Barkatullah, B for Prime Minister's number one. ❌ Maulvi Sindhi is tempting but he was the Home Minister."
  },
  28: {
    questext: "The Silk Letter Conspiracy of 1915 was carried out between which two groups?",
    options: ["Ghadar leaders and Germans", "Sindhi and the Deoband leaders, and the Amir of Afghanistan", "Communists and Moscow", "Hindustan Republican Association and Russia"],
    correct: "2",
    exptext: "✅ Sindhi and Deoband leaders sought help from the Amir of Afghanistan using silk letters. 📌 Silk letters are silk cloth messages. ❌ Ghadar and Germans is tempting but that was the Berlin plan."
  },
  29: {
    type: "concept", icon: "🗂️", accent: "#64748b", pauseTimer: true,
    title: "Revolutionary Organisations",
    html: `
      <p class="cp-lead">A clear table of organisations is one of the easiest ways to score marks in this chapter. <u>Learn the group, year, founder and place together.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/21.png" alt="Table-style picture: three columns Group, Year, Place with eight famous groups as rows." data-caption="A table of famous revolutionary groups with their years and places." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/22.png" alt="Chandrashekhar Azad portrait photo" data-caption="Chandrashekhar Azad, a leader of the Hindustan Socialist Republican Association." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Organisation</th><th>Year</th><th>Founders or notable members</th><th>Place</th></tr></thead><tbody><tr><td>Mitra Mela, later Abhinav Bharat Society</td><td>1899, 1904</td><td>V. D. Savarkar, Ganesh Savarkar</td><td>Maharashtra</td></tr><tr><td>Anushilan Samiti</td><td>1901–02</td><td>Satish Chandra Basu, Pramath Nath Mitra, Aurobindo Ghosh, Barindra Kumar Ghosh</td><td>Bengal, Uttar Pradesh, Bihar</td></tr><tr><td>Yugantar</td><td>1906</td><td>Aurobindo Ghosh, Barindra Ghosh, Bhupendranath Datta</td><td>Calcutta</td></tr><tr><td>Anjuman-i-Mohibban-i-Watan</td><td>Not given</td><td>Ajit Singh</td><td>Lahore</td></tr><tr><td>Hindustan Republican Association</td><td>1924</td><td>Sachindranath Sanyal, Ramprasad Bismil, Jogesh Chandra Chatterjee</td><td>Kanpur</td></tr><tr><td>Hindustan Socialist Republican Association</td><td>1928</td><td>Chandrashekhar Azad, Bhagat Singh, Sukhdev</td><td>Firozshah Kotla, Delhi</td></tr><tr><td>Indian Republican Army</td><td>1930</td><td>Surya Sen</td><td>Chittagong</td></tr><tr><td>India House</td><td>1905</td><td>Shyamji Krishna Varma</td><td>England</td></tr><tr><td>Paris Indian Society</td><td>1905</td><td>Madame Cama</td><td>Paris</td></tr><tr><td>Indian Independence League</td><td>1907</td><td>Taraknath Das</td><td>America</td></tr><tr><td>Hind Association, Pacific Coast</td><td>1913</td><td>Sohan Singh Bhakna</td><td>America</td></tr><tr><td>Ghadar Party</td><td>1913</td><td>Lala Hardayal, Barkatullah, Ramchandra</td><td>San Francisco</td></tr><tr><td>Provisional Government of India</td><td>1915</td><td>Raja Mahendra Pratap</td><td>Afghanistan</td></tr><tr><td>Indian Independence League</td><td>1942</td><td>Rash Behari Bose</td><td>Japan</td></tr><tr><td>Indian National Army</td><td>1942</td><td>Mohan Singh</td><td>Japan</td></tr></tbody></table>
      <div class="cp-note exam">The Hindustan Socialist Republican Association was formed in 1928, so it cannot include Ashfaqulla Khan, who was hanged in 1927.</div>
    `
  },
  30: {
    questext: "Which organisation was founded at Firozshah Kotla, Delhi, in 1928?",
    options: ["Hindustan Republican Association", "Anushilan Samiti", "Hindustan Socialist Republican Association", "Ghadar Party"],
    correct: "3",
    exptext: "✅ The Hindustan Socialist Republican Association was formed in Delhi in 1928. 📌 Socialist was added in 1928. ❌ The Hindustan Republican Association is tempting but it was formed at Kanpur in 1924."
  },
  31: {
    questext: "Match the founder with the organisation: who founded the Indian Republican Army in 1930 at Chittagong?",
    options: ["Chandrashekhar Azad", "Taraknath Das", "Rash Behari Bose", "Surya Sen"],
    correct: "4",
    exptext: "✅ Surya Sen, known as Master Da, led the Indian Republican Army. 📌 Sen and Chittagong. ❌ Chandrashekhar Azad is tempting but he led the Delhi group."
  },
  32: {
    type: "concept", icon: "☭", accent: "#dc2626", pauseTimer: true,
    title: "Later Phase After 1920: Communists",
    html: `
      <p class="cp-lead">After the Non-Cooperation Movement ended, a new generation of youth was disillusioned with Gandhian politics. <u>They looked to the Russian Revolution for a new path.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/23.png" alt="M. N. Roy portrait photo" data-caption="Manabendra Nath Roy, a founder of the Communist Party of India at Tashkent in 1920." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/24.png" alt="Timeline: 1920 Tashkent; 1924 Satyabhakt at Kanpur; December 1925 Kanpur conference; 1934 " data-caption="Key dates in the early history of the Communist Party of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">These youth admired the Russian Revolution, Ireland, China, Turkey and Egypt. Their centres were Bengal, Punjab, Delhi and the United Provinces, and socialism was spread by Jawaharlal Nehru and Subhas Chandra Bose.</p>
      <p class="cp-lead">In <b>1920 at Tashkent</b>, M. N. Roy, Abani Mukherjee, Muhammad Ali and Muhammad Shafiq founded the <b>Communist Party of India</b> after the second Comintern session. In <b>1924</b> Satyabhakt founded the party in Uttar Pradesh, and in <b>December 1925 at Kanpur</b> Singaravelu Chettiar merged the groups, with the head office moved from Kanpur to Bombay.</p>
      <p class="cp-lead">The party's aims were complete independence, an end to British rule and a government like Soviet Russia with collective ownership of production and distribution. It was the <b>first party to demand complete independence</b>.</p>
      <table><thead><tr><th>Case</th><th>Details</th></tr></thead><tbody><tr><td>Peshawar, 1922–23</td><td>Communists arriving from Moscow were put on trial</td></tr><tr><td>Kanpur Bolshevik Conspiracy, 1924</td><td>S. A. Dange, Muzaffar Ahmed, Shaukat Usmani and Nalini Gupta were sentenced</td></tr><tr><td>Meerut, 1929–33</td><td>On 20 March 1929, 32 communists were arrested; the Central Security Committee and the Public Safety Bill; the party was made illegal in 1934</td></tr></tbody></table>
      <div class="cp-note trap">The Communist Party of India was founded twice: at Tashkent in 1920 (M. N. Roy) and in Uttar Pradesh in 1924 (Satyabhakt). It was organised at Kanpur in December 1925.</div>
    `
  },
  33: {
    questext: "The first group of the Communist Party of India was founded in 1920 at which place?",
    options: ["Kanpur", "Tashkent", "Bombay", "Meerut"],
    correct: "2",
    exptext: "✅ M. N. Roy and others founded the party at Tashkent in 1920. 📌 T for Tashkent, T for the first thread. ❌ Kanpur is tempting because of the 1925 conference, but the first founding was at Tashkent."
  },
  34: {
    questext: "The Meerut Conspiracy Case began in which year?",
    options: ["1922", "1924", "1925", "1929"],
    correct: "4",
    exptext: "✅ Thirty-two communists were arrested on 20 March 1929 and tried till 1933. 📌 Meerut and 1929 both have nine at the end. ❌ 1924 is tempting but that was the Kanpur case."
  },
  35: {
    questext: "Consider the following statements:\n1. Singaravelu Chettiar organised the Communist Party of India at Kanpur in December 1925.\n2. The Communist Party of India was made illegal in 1934.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Kanpur in 1925 and a ban in 1934. ❌ Neither is a tempting answer if one forgets the later ban, but the ban followed the Meerut Case."
  },
  36: {
    type: "concept", icon: "🔫", accent: "#84cc16", pauseTimer: true,
    title: "Hindustan Republican Association (1924) and the Kakori Case",
    html: `
      <p class="cp-lead">The Hindustan Republican Association, also called Sena, was formed to win freedom through revolution. <u>Its most famous act was the Kakori train action of 1925.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/25.png" alt="Ram Prasad Bismil portrait photo" data-caption="Ram Prasad Bismil, the leader of the Kakori train action." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/26.png" alt="Kakori Train Action memorial photo" data-caption="A memorial to the Kakori train action of 9 August 1925 near Lucknow." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/27.png" alt="Flow: October 1924 Kanpur conference, 9 August 1925 Kakori train stopped, trial, December " data-caption="The path from founding of the Hindustan Republican Association to the Kakori hangings." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">In <b>October 1924 at Kanpur</b> an all-party revolutionary conference formed the association. Its leaders were Sachindranath Sanyal, Yogesh Chatterjee, Ram Prasad Bismil and young Bhagat Singh, Shiv Verma, Sukhdev, Bhagwati Charan Bohra and Chandrashekhar Azad. It followed the Russian Revolution and socialist ideas.</p>
      <p class="cp-lead">Its aims were to oppose Gandhian non-violence, to use direct action and to build a <b>federal republic of the United States of India</b>.</p>
      <p class="cp-lead"><b>Kakori Conspiracy Case, 9 August 1925</b>: Bismil raised funds through political dacoities. With him were Ashfaqulla Khan, Rajendra Lahiri, Chandrashekhar Azad and Sachindra Bakshi. Ten men stopped a train at Kakori, 16 km from Lucknow, and looted the government treasure. A passenger was killed, and 40 members were booked.</p>
      <table><thead><tr><th>Person</th><th>Place of hanging, December 1927</th></tr></thead><tbody><tr><td>Ram Prasad Bismil</td><td>Gorakhpur</td></tr><tr><td>Roshan Singh</td><td>Naini, Allahabad</td></tr><tr><td>Rajendra Nath Lahiri</td><td>Gonda</td></tr><tr><td>Ashfaqullah Khan</td><td>Faizabad</td></tr></tbody></table>
      <p class="cp-lead">Four were sentenced to death, and the rest went to the Kala Pani (Cellular Jail). Madan Mohan Malaviya sent a mercy memorandum signed by 78 Central Legislature members to Viceroy Lord Irwin, but it was rejected. Azad alone escaped arrest.</p>
      <div class="cp-note trap">The Hindustan Republican Association (1924, Kanpur) did the Kakori action. The Hindustan Socialist Republican Association (1928, Delhi) killed Saunders.</div>
    `
  },
  37: {
    questext: "The Kakori train action took place on which date?",
    options: ["17 December 1928", "8 April 1929", "9 August 1925", "23 March 1931"],
    correct: "3",
    exptext: "✅ The Hindustan Republican Association looted the treasure train on 9 August 1925. 📌 Kakori, 9 August. ❌ 8 April 1929 is tempting but that is the Assembly bomb date."
  },
  38: {
    questext: "Who among the following was hanged at Faizabad in December 1927 in the Kakori case?",
    options: ["Ram Prasad Bismil", "Roshan Singh", "Ashfaqullah Khan", "Rajendra Nath Lahiri"],
    correct: "3",
    exptext: "✅ Ashfaqullah Khan was hanged at Faizabad. 📌 Ashfaq and Faiz both start with a similar sound. ❌ Bismil is tempting because he was the chief, but he was hanged at Gorakhpur."
  },
  39: {
    questext: "Which of the following were the aims of the Hindustan Republican Association?",
    options: ["Rule of princes", "Federal republic of the United States of India", "Dominion status", "Home rule under the Crown"],
    correct: "2",
    exptext: "✅ The association aimed at a federal republic called the United States of India. 📌 Republic is in its name. ❌ Dominion status is tempting because it was a Congress demand, but the revolutionaries wanted complete freedom."
  },
  40: {
    type: "concept", icon: "🔥", accent: "#f43f5e", pauseTimer: true,
    title: "Hindustan Socialist Republican Association (1928)",
    html: `
      <p class="cp-lead">After the Kakori hangings the party was reborn with a new name. <u>The word Socialist was added in 1928.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/28.png" alt="Bhagat Singh portrait photo" data-caption="Bhagat Singh, a leader of the Hindustan Socialist Republican Association." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/29.png" alt="Central Legislative Assembly Delhi Parliament House old photo" data-caption="The old Central Legislative Assembly building in Delhi where bombs were thrown in 1929." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/30.png" alt="Timeline: Dec 1928 Saunders shot; 8 April 1929 Assembly bomb; 1929 Lahore Conspiracy Case;" data-caption="The main events of the Hindustan Socialist Republican Association in time order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Chandrashekhar Azad</b> founded it at Firozshah Kotla, Delhi, for a socialist republican state. The leaders were Vijay Kumar Sinha, Shiv Verma, Jaidev Kapoor, Bhagat Singh, Bhagwati Charan Bohra and Sukhdev.</p>
      <p class="cp-lead">On <b>17 December 1928</b> Bhagat Singh, Rajguru and Azad shot <b>Saunders</b> at Lahore Police Station. It was revenge for Lala Lajpat Rai, who died of lathi-charge injuries in the anti-Simon Commission procession at Lahore.</p>
      <p class="cp-lead">On <b>8 April 1929</b> Bhagat Singh and Batukeshwar Dutt threw harmless bombs in the Central Legislative Assembly, Delhi, to make the deaf hear. They opposed the Public Safety Bill and the Trade Disputes Bill, and courted arrest with the cry Inquilab Zindabad.</p>
      <p class="cp-lead">In 1929 the Lahore bomb factory was raided in the <b>Lahore Conspiracy Case</b>. In the prisoners' fast, the Bengali Jatin Das died on the 63rd or 64th day. <b>Bhagat Singh, Sukhdev and Rajguru were hanged on 23 March 1931</b>. Azad was traced and shot himself at Alfred Park, Allahabad, on <b>27 February 1931</b>.</p>
      <div class="cp-note trap">Azad died on 27 February 1931, and the three hangings happened on 23 March 1931. The Saunders murder was in 1928, and the Assembly bomb in 1929.</div>
    `
  },
  41: {
    questext: "Who was shot by Bhagat Singh, Rajguru and Azad on 17 December 1928 at Lahore?",
    options: ["Saunders", "Kingsford", "Rand", "Jackson"],
    correct: "1",
    exptext: "✅ Saunders was shot to take revenge for the death of Lala Lajpat Rai. 📌 S for Saunders, S for Simon Commission. ❌ Kingsford is tempting but he was the Muzaffarpur judge in 1908."
  },
  42: {
    questext: "The Central Assembly Bomb Case of 8 April 1929 was carried out against which Bill?",
    options: ["Rowlatt Bill", "Public Safety Bill and Trade Disputes Bill", "Ilbert Bill", "Indian Arms Bill"],
    correct: "2",
    exptext: "✅ The harmless bombs were thrown against the Public Safety Bill and the Trade Disputes Bill. 📌 Safety and disputes, two Bills. ❌ The Rowlatt Bill is tempting but it is from 1919."
  },
  43: {
    questext: "Where did Chandrashekhar Azad shoot himself on 27 February 1931?",
    options: ["Alfred Park, Allahabad", "Lahore Fort", "Kakori", "Chittagong"],
    correct: "1",
    exptext: "✅ Azad was traced at Alfred Park in Allahabad and fought till his last bullet. 📌 A for Azad, A for Alfred, A for Allahabad. ❌ Lahore is tempting because the Saunders case was there, but he died in Allahabad."
  },
  44: {
    questext: "Consider the following statements:\n1. The Hindustan Socialist Republican Association was formed in 1928 at Firozshah Kotla, Delhi.\n2. Jatin Das died in 1929 after a long hunger strike in Lahore Jail.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct, and Jatin Das died on 13 September 1929 after 63 days. 📌 Delhi 1928 and Lahore 1929. ❌ Only one statement is tempting but both facts are standard."
  },
  45: {
    type: "concept", icon: "⚔️", accent: "#06b6d4", pauseTimer: true,
    title: "Bengal After 1920: Chittagong",
    html: `
      <p class="cp-lead">Bengal again became a centre of action in the 1930s. <u>The Chittagong Armoury Raid of 1930 was its greatest event.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/31.png" alt="Surya Sen Master Da portrait photo" data-caption="Surya Sen, known as Master Da, leader of the Chittagong Armoury Raid." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/32.png" alt="Pritilata Waddedar portrait photo" data-caption="Pritilata Waddedar, who died after a raid in 1932." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/33.png" alt="Map-style schematic, not a map: Chittagong raid targets listed as armoury, telephone, tele" data-caption="The four targets seized during the Chittagong Armoury Raid of 1930." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">New bodies formed in Bengal: the Bengal Volunteers Party (Leela Roy, Hemchandra Ghosh) and Shree Sangha (Anil Roy). The chief was <b>Surya Sen</b>, with the <b>Indian Republican Army, 1930</b>, to free Chittagong.</p>
      <p class="cp-lead">In the <b>Chittagong Armoury Raid, 18 April 1930</b> the revolutionaries seized police and auxiliary arms, cut telephone, telegraph and railway lines, hoisted the National Flag and proclaimed a Provisional Revolutionary Government. <b>Surya Sen, called Master Da</b>, a National School teacher, had been a Non-Cooperation man.</p>
      <p class="cp-lead">Members were Ananta Singh, Ambika Chakraborty, Lokenath, Pritilata Wadekar, Ganesh Ghosh and Kalpana Dutta. They were driven to the forests and arrested. <b>Pritilata Waddedar died</b> raiding, and <b>Kalpana Dutta</b> got life.</p>
      <p class="cp-lead">In December 1931 schoolgirls Shanti Ghosh and Suniti Chaudhury shot Stevens, the District Magistrate of Comilla. Bina Das attacked the Governor of Bengal at a convocation. <b>Surya Sen was arrested on 16 February 1933 and hanged on 12 January 1934</b>, so the movement in Bengal nearly ended.</p>
      <div class="cp-note trap">Do not mix the date of the raid (18 April 1930) with the Assembly bomb date (8 April 1929). They are close but they are different events.</div>
    `
  },
  46: {
    questext: "Who led the Chittagong Armoury Raid of 18 April 1930?",
    options: ["Bagha Jatin", "Chandrashekhar Azad", "Surya Sen", "Rash Behari Bose"],
    correct: "3",
    exptext: "✅ Surya Sen, known as Master Da, led the raid and proclaimed the Provisional Revolutionary Government. 📌 Sen and Chittagong. ❌ Azad is tempting but he worked at Delhi and Allahabad."
  },
  47: {
    questext: "Which woman revolutionary died during a raid in the Chittagong movement?",
    options: ["Kalpana Dutta", "Bina Das", "Pritilata Waddedar", "Madame Cama"],
    correct: "3",
    exptext: "✅ Pritilata Waddedar died during a raid. 📌 P for Pritilata, P for the pain of loss. ❌ Kalpana Dutta is tempting because she was also in the raid, but she was given a life sentence."
  },
  48: {
    questext: "Surya Sen was hanged in which year?",
    options: ["1930", "1931", "1933", "1934"],
    correct: "4",
    exptext: "✅ Surya Sen was arrested on 16 February 1933 and hanged on 12 January 1934. 📌 Arrested 33, hanged 34. ❌ 1933 is tempting but that was the year of his arrest."
  },
  49: {
    type: "concept", icon: "📰", accent: "#a16207", pauseTimer: true,
    title: "Publications and Their Founders",
    html: `
      <p class="cp-lead">Revolutionaries used newspapers and books to spread their ideas. <u>Learn each paper with its founder.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/34.png" alt="Two-column picture: left column paper names Yugantar, Bharat Mata, Ghadar, Bandi Jivan; ri" data-caption="A matching chart of revolutionary publications and their founders." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/35.png" alt="Old Ghadar newspaper front page photo" data-caption="The front page of the Ghadar weekly, which spread the revolutionary message." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Publication</th><th>Publisher or founder</th></tr></thead><tbody><tr><td>Yugantar</td><td>Barindra Kumar Ghosh, Bhupendranath Dutta</td></tr><tr><td>Bande Mataram, Bhawani Mandir</td><td>Aurobindo Ghosh</td></tr><tr><td>Bharat Mata</td><td>Ajit Singh</td></tr><tr><td>Indian Sociologist</td><td>Shyamji Krishna Varma</td></tr><tr><td>Vande Mataram</td><td>Madame Cama (London)</td></tr><tr><td>Ghadar</td><td>Lala Hardayal</td></tr><tr><td>Pather Dabi</td><td>Sharatchandra Chattopadhyay</td></tr><tr><td>Bandi Jivan</td><td>Sachindranath Sanyal</td></tr><tr><td>Indian War of Independence</td><td>V. D. Savarkar</td></tr></tbody></table>
      <div class="cp-note trap">Bande Mataram (Aurobindo) and Vande Mataram (Madame Cama, London) have almost the same name but are different papers.</div>
    `
  },
  50: {
    questext: "Bandi Jivan was written by which revolutionary?",
    options: ["Sachindranath Sanyal", "Ajit Singh", "Aurobindo Ghosh", "Lala Hardayal"],
    correct: "1",
    exptext: "✅ Sachindranath Sanyal wrote Bandi Jivan. 📌 Bandi means prisoner, and he was a prisoner. ❌ Aurobindo is tempting because he published Bande Mataram."
  },
  51: {
    questext: "The paper Bharat Mata was run by which leader?",
    options: ["Ajit Singh", "Shyamji Krishna Varma", "V. D. Savarkar", "Sharatchandra Chattopadhyay"],
    correct: "1",
    exptext: "✅ Ajit Singh ran the paper Bharat Mata at Lahore. 📌 Ajit and Anjuman, A for A. ❌ Savarkar is tempting but he wrote the Indian War of Independence."
  },
  52: {
    questext: "Which book was written by V. D. Savarkar?",
    options: ["Pather Dabi", "Indian War of Independence", "Indian Sociologist", "Vartaman Rananiti"],
    correct: "2",
    exptext: "✅ Savarkar wrote The Indian War of Independence. 📌 Savarkar means 1857 war. ❌ Pather Dabi is tempting but it is a novel by Sharatchandra Chattopadhyay."
  },
  53: {
    type: "concept", icon: "📉", accent: "#7c3aed", pauseTimer: true,
    title: "Decline and Significance",
    html: `
      <p class="cp-lead">The revolutionary movement faded in the 1930s. <u>It left a very strong example of sacrifice.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/36.png" alt="Two-sided picture: left Reasons for decline listed; right Significance listed." data-caption="The reasons for the decline and the importance of the revolutionary movement." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Revolutionary_Activities/37.png" alt="Cellular Jail National Memorial Port Blair photo" data-caption="The Cellular Jail, built 1896 to 1906 with seven wings, now a National Memorial." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Decline</b>: the base was limited, organisation was poor, there was no match for British military and administrative might, there was no Congress support, and world events such as the entry of the United States of America into the First World War harmed it. The <b>ultimate factor</b> was the popularity of Gandhian Satyagraha.</p>
      <p class="cp-lead"><b>Significance</b>: Gandhi and Congressmen admired their nationalistic commitment. They gave energy to the struggle's passive stage, took India's cause abroad, spread a fear psychosis among officials, roused the youth at Bhagat Singh's trial and became national heroes of self-sacrifice.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Khudiram Bose</td><td>Hanged 11 August 1908 at age 18; Prafulla Chaki shot himself at Mokama station</td></tr><tr><td>Kartar Singh Sarabha</td><td>Hanged at Lahore, 16 November 1915, aged 19</td></tr><tr><td>Jatin Das</td><td>Died 13 September 1929 after a 63-day hunger strike</td></tr><tr><td>Cellular Jail</td><td>Built 1896–1906, seven wings, National Memorial in 1979</td></tr><tr><td>Bhagwati Charan Vohra</td><td>Wrote The Philosophy of the Bomb in 1930</td></tr></tbody></table>
      <div class="cp-note trap">Anushilan Samiti 1901, Yugantar 1906, Bharat Mata Samiti 1904 (Madras) is not the same as the Bharat Mata Society of Saharanpur.</div>
    `
  },
  54: {
    questext: "What was the ultimate reason for the decline of the revolutionary movement?",
    options: ["Lack of weapons", "Popularity of Gandhian Satyagraha", "Support of Congress", "End of British rule"],
    correct: "2",
    exptext: "✅ The popularity of Gandhian Satyagraha drew the masses away. 📌 Gandhi was the mass hero. ❌ Lack of weapons is tempting but it was a smaller factor."
  },
  55: {
    questext: "The Cellular Jail at Port Blair was built in which period?",
    options: ["1857–1862", "1896–1906", "1919–1925", "1930–1934"],
    correct: "2",
    exptext: "✅ It was built from 1896 to 1906 with seven wings. 📌 Seven wings, about ten years. ❌ 1919 to 1925 is tempting because many revolutionaries were sent there later."
  },
  56: {
    questext: "Which book on the use of bombs did Bhagwati Charan Vohra write in 1930?",
    options: ["Bandi Jivan", "Pather Dabi", "Bharat Mata", "The Philosophy of the Bomb"],
    correct: "4",
    exptext: "✅ Vohra wrote The Philosophy of the Bomb in 1930. 📌 Vohra and bomb. ❌ Bandi Jivan is tempting because it is also a revolutionary book, but Sanyal wrote it."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Revolutionary_Activities/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an old Indian tricolour-style flag in soft light, a vintage revolver silhouette and a rolled parchment with a quill" },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/1.png": { t: "fig", about: "Mind-map: centre box Revolutionary Extremism; four branches labelled Belief, Objectives, Centres, Causes." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Partition of Bengal 1905 protest Swadeshi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/2.png. crowd or leaders protesting the Partition of Bengal",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/3.png": { t: "fig", about: "Timeline with three points: 1897 Chapekar brothers shoot Rand; 1899 Mitra Mela; 1909 Nasik Conspiracy Case." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vinayak Damodar Savarkar portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/4.png. clear portrait of Vinayak Damodar Savarkar",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cellular Jail Port Blair photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/5.png. the Cellular Jail building with its wings",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/6.png": { t: "fig", about: "Timeline: 1901 Anushilan Samiti; 1905 Bhawani Mandir; 1907 attempt on the Lieutenant Governor; 1908 Alipore bomb." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Khudiram Bose portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/7.png. clear photo of Khudiram Bose",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aurobindo Ghosh young portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/8.png. photo of Aurobindo Ghosh in his younger years",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rash Behari Bose portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/9.png. clear portrait of Rash Behari Bose",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bagha Jatin Jatindranath Mukherjee portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/10.png. portrait of Bagha Jatin",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lala Lajpat Rai portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/11.png. clear portrait of Lala Lajpat Rai",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/12.png": { t: "fig", about: "Two-column chart: Punjab column lists Bharat Mata Society, Anjuman-i-Mohibban-i-Watan, Bharat Mata; Madras column lists Bharat Mata Samiti, Ashe killed at Tirunelveli." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"India House Highgate London photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/13.png. the house in Highgate, London",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shyamji Krishna Varma portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/14.png. portrait of Shyamji Krishna Varma",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Madame Bhikaiji Cama Stuttgart flag photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/15.png. Madame Cama or the flag she raised",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Komagata Maru Vancouver 1914 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/16.png. the ship Komagata Maru in Vancouver harbour",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lala Har Dayal portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/17.png. portrait of Lala Hardayal",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/18.png": { t: "fig", about: "Timeline: 1906 Indians active in United States; 1908 Free Hindustan; 1913 Ghadar Party; 1914 Komagata Maru; 1915 Singapore Mutiny." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Raja Mahendra Pratap Provisional Government Kabul photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/19.png. portrait of Raja Mahendra Pratap",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/20.png": { t: "fig", about: "Flow: Kabul 1915, Provisional Government of India, President Raja Mahendra Pratap, Prime Minister Barkatullah, Home Minister Maulvi Ubaidullah Sindhi." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/21.png": { t: "fig", about: "Table-style picture: three columns Group, Year, Place with eight famous groups as rows." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chandrashekhar Azad portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/22.png. clear portrait of Chandrashekhar Azad",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"M. N. Roy portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/23.png. clear portrait of Manabendra Nath Roy",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/24.png": { t: "fig", about: "Timeline: 1920 Tashkent; 1924 Satyabhakt at Kanpur; December 1925 Kanpur conference; 1934 party made illegal." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ram Prasad Bismil portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/25.png. clear portrait of Ram Prasad Bismil",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kakori Train Action memorial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/26.png. monument or old photo of the Kakori action",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/27.png": { t: "fig", about: "Flow: October 1924 Kanpur conference, 9 August 1925 Kakori train stopped, trial, December 1927 hangings." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhagat Singh portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/28.png. clear portrait of Bhagat Singh",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Central Legislative Assembly Delhi Parliament House old photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/29.png. the building in Delhi",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/30.png": { t: "fig", about: "Timeline: Dec 1928 Saunders shot; 8 April 1929 Assembly bomb; 1929 Lahore Conspiracy Case; Feb 1931 Azad dies; 23 Mar 1931 hangings." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Surya Sen Master Da portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/31.png. clear portrait of Surya Sen",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pritilata Waddedar portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/32.png. portrait of Pritilata Waddedar",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/33.png": { t: "fig", about: "Map-style schematic, not a map: Chittagong raid targets listed as armoury, telephone, telegraph, railway." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/34.png": { t: "fig", about: "Two-column picture: left column paper names Yugantar, Bharat Mata, Ghadar, Bandi Jivan; right column their founders." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Old Ghadar newspaper front page photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/35.png. front page of the Ghadar paper",
  "images/General_Awareness/Modern_India/Revolutionary_Activities/36.png": { t: "fig", about: "Two-sided picture: left Reasons for decline listed; right Significance listed." },
  "images/General_Awareness/Modern_India/Revolutionary_Activities/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cellular Jail National Memorial Port Blair photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Revolutionary_Activities/37.png. the memorial building"
});

/* CHANGE LOG
   - Anushilan Samiti is dated 1901 on the pages; some sources give 1902, so the table notes both.
   - Ashfaqulla Khan is shown as a founder of the Hindustan Socialist Republican Association in one table, but he was hanged in December 1927, before it was formed in 1928; the page says so correctly.
   - The name Pritilata Waddedar is written in one standard form (some sources spell it Wadekar).
   - The unclear line about Savarkar's arrest is replaced by the clear fact: after Curzon Wylie's murder, the Nasik arrest of Savarkar's group followed, and Savarkar was himself arrested in London in 1910.
   - The Silk Letter plan: Mahmud al Hasan was in Arabia (Hijaz), not Persia.
   - The Communist Party conference of December 1925 is placed at Kanpur, with the head office later moved to Bombay.
*/