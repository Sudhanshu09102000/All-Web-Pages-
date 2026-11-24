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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Rise_of_Indian_Nationalism · 17 concept pages (+ overview) · 46 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🇮🇳", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "RISE OF INDIAN",
      line2: "NATIONALISM",
      line3: "CONGRESS 1885",
      badge: "FULL CLASS",
      ribbon: "FACTS • FIRSTS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Rise of Indian Nationalism | Modern India | Congress 1885 to Surat Split",
      altTitles: ["Indian National Congress 1885 Complete Chapter for SSC CGL", "Moderates, Drain Theory and Surat Split in One Class"],
      description: "Rise of Indian Nationalism is one of the most repeated chapters of Modern India. In this class we learn every fact slowly and clearly, from the reasons for nationalism and early associations to the first Congress session, the safety valve debate, the Moderates, the Drain Theory and the Surat Split. Each part ends with exam style questions, so you can test yourself at once.\n\n📌 IN THIS CLASS\n✅ Reasons for the growth of nationalism\n✅ Early associations and the Ilbert Bill\n✅ Congress 1885 and its sessions\n✅ Moderates and the Drain Theory\n✅ Surat Split 1907\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Background\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernIndia #History",
      tags: ["rise of indian nationalism", "indian national congress 1885", "modern india history", "ssc cgl history", "surat split 1907", "drain theory", "dadabhai naoroji", "moderates and extremists", "safety valve theory", "ilbert bill 1883", "early political associations", "congress sessions list", "w c bonnerjee", "a o hume", "indian councils act 1892", "general awareness", "history for competitive exams", "ssc cgl 2026", "modern india one shot", "congress presidents", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "Rise of Indi"],
      hashtags: ["SSCCGL", "ModernIndia", "History"],
      thumbText: "RISE OF INDIAN NATIONALISM",
      pinnedComment: "📌 Solve all the questions and write your score below 👇",
      communityPost: "🇮🇳 New class is live: Rise of Indian Nationalism, from the Congress of 1885 to the Surat Split. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Background\n00:00 Reasons for growth of nationalism\n00:00 Ilbert Bill\n00:00 Early associations\n00:00 Congress 1885\n00:00 Safety valve theory\n00:00 Congress sessions\n00:00 Moderate phase\n00:00 Drain theory\n00:00 Surat Split",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Rise of Indian Nationalism</u>, from the causes of the national spirit to the Surat Split of 1907. This chapter gives many repeated questions in the Staff Selection Commission Combined Graduate Level exam.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>17</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>46</b><span>Questions</span></div>
        <div class="cp-stat"><b>~80 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Background and Reasons for Growth</b><br>Why Indians began to feel like one nation after 1857, through unification, Western ideas, language, the press, reform and unfair rule.</li>
        <li><b>Ilbert Bill and Early Associations</b><br>How one law opened the eyes of Indians, and how local bodies prepared the ground for the Congress.</li>
        <li><b>The Indian National Congress, 1885</b><br>Who founded it, where and when, and the debate between the safety valve and lightning conductor views.</li>
        <li><b>Congress Sessions</b><br>The first presidents of each kind and the important sessions up to 1925.</li>
        <li><b>The Moderate Phase</b><br>The methods, demands, economic thinking, achievements and weaknesses of the early leaders.</li>
        <li><b>Towards the Surat Split</b><br>Why the Congress broke into two groups in 1907.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> names, years, places and 'first' facts of this chapter are asked again and again, so learning them well gives sure marks in History.</div>
    `
  },
  2: {
    type: "concept", icon: "🔥", accent: "#22c55e", pauseTimer: true,
    title: "Background",
    html: `
      <p class="cp-lead"><b>Nationalism</b> means the feeling of oneness among people who share the same land, history, culture and political goals. <u>It is the strong wish to free the motherland and to govern it ourselves.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/1.png" alt="Revolt of 1857 Delhi siege illustration" data-caption="The Revolt of 1857, after which the harsh nature of British rule became clear." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/2.png" alt="Four small boxes labelled Land, History, Culture, Political goals, each with an arrow into" data-caption="Shared land, history, culture and goals join together to form nationalism." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">British power grew in India at a time when there was no strong nationalistic spirit. Indians lived in many small kingdoms and regions and did not think of themselves as one nation, so a foreign power could defeat them one by one.</p>
      <p class="cp-lead">After the <b>Revolt of 1857</b>, the true nature of British rule became easy to see. It was <b>expansionist, exploitative, imperialist and oppressive</b>. This rule became the main obstacle to the development of India.</p>
      <table><thead><tr><th>Feature of British rule</th><th>What it meant</th></tr></thead><tbody><tr><td>Expansionist</td><td>The British kept adding more land to their empire</td></tr><tr><td>Exploitative</td><td>The wealth and labour of India were used for British gain</td></tr><tr><td>Imperialist</td><td>One country ruled another country for its own benefit</td></tr><tr><td>Oppressive</td><td>Indians had very little voice in how they were governed</td></tr></tbody></table>
      <p class="cp-lead">Slowly, Indians began to ask why a foreign power should rule them. This question is the seed from which the national movement grew.</p>
      <div class="cp-note trap">The Revolt of 1857 did not create nationalism in a single day. It made British rule clearly visible, and the national spirit then grew over the following years.</div>
      <div class="cp-note exam">Remember the four words used for British rule: expansionist, exploitative, imperialist and oppressive.</div>
    `
  },
  3: {
    questext: "Which of the following words is NOT used to describe the nature of British rule that blocked the development of India?",
    options: ["Expansionist", "Exploitative", "Philanthropic", "Oppressive"],
    correct: "3",
    exptext: "✅ Philanthropic is the odd word, because British rule is described as expansionist, exploitative, imperialist and oppressive. 📌 Think of the four words as the \"four wrongs\" of rule. ❌ Exploitative is tempting, but it is one of the standard descriptions."
  },
  4: {
    type: "concept", icon: "🛤️", accent: "#f59e0b", pauseTimer: true,
    title: "Reasons for the Growth of Nationalism: Unity and Western Ideas",
    html: `
      <p class="cp-lead">Many causes worked together to build the national spirit. The first three are <u>modern unification, contact with the West and Western education</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/3.png" alt="Three boxes in a row labelled Unification, Contact with the West, Western education, each " data-caption="Unification, Western contact and Western education together awakened the national spirit." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/4.png" alt="Storming of the Bastille French Revolution painting" data-caption="The French Revolution spread the ideas of liberty, equality and fraternity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Administrative and economic unification.</b> The British gave India one uniform modern government. Modern trade and industry joined far-away regions, and the old self-sufficient village economy was destroyed. People in different regions now faced the same problems, so they began to feel that they were one people.</p>
      <p class="cp-lead"><b>Contact with the West.</b> Educated Indians learned about the American and French Revolutions, which spread the ideas of liberty, equality and fraternity. They also learned how new nation-states rose in South America after the fall of the Spanish and Portuguese empires, and how people struggled for freedom in Greece, Italy and Ireland.</p>
      <table><thead><tr><th>Event or place</th><th>Idea it gave to Indians</th></tr></thead><tbody><tr><td>American Revolution</td><td>Liberty</td></tr><tr><td>French Revolution</td><td>Liberty, equality and fraternity</td></tr><tr><td>South America</td><td>New nation-states rose on the ruins of the Spanish and Portuguese empires</td></tr><tr><td>Greece, Italy and Ireland</td><td>Liberation movements against foreign or unjust rule</td></tr></tbody></table>
      <p class="cp-lead"><b>Western education.</b> After 1857, Western education grew fast, in the golden age of European liberalism. Indians read great writers such as John Milton and John Stuart Mill, who wrote about liberty, nationalism and democracy. Milton wrote that it is better to reign in Hell than to serve in Heaven, a line that shows how much freedom was valued.</p>
      <div class="cp-note trap">Do not mix the two revolutions. Liberty, equality and fraternity is the slogan of the French Revolution.</div>
      <div class="cp-note exam">Milton and Mill are the two thinkers most often named as sources of liberal ideas for Indians.</div>
    `
  },
  5: {
    questext: "Which of the following gave the slogan of liberty, equality and fraternity that influenced educated Indians?",
    options: ["The American Revolution", "The Russian Revolution", "The Revolt of 1857", "The French Revolution"],
    correct: "4",
    exptext: "✅ The French Revolution gave the slogan of liberty, equality and fraternity. 📌 Link France with all three words of the slogan. ❌ The American Revolution is tempting, but it is linked mainly with liberty."
  },
  6: {
    type: "concept", icon: "✍️", accent: "#ef4444", pauseTimer: true,
    title: "Reasons for the Growth of Nationalism: Literature, Press and Reformers",
    html: `
      <p class="cp-lead">Language, newspapers and reform movements carried the new ideas to ordinary people. <u>Writers, journalists and reformers made Indians proud of their land and aware of their rights.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/5.png" alt="Bankim Chandra Chatterjee portrait photo" data-caption="Bankim Chandra Chatterjee, author of the novel Anand Math and the song Vande Mataram." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/6.png" alt="Swami Vivekananda 1893 Chicago photo" data-caption="Swami Vivekananda, a reformer who made Indians proud of their culture." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/7.png" alt="Simple row of icons labelled Books, Newspapers, Reformers, with arrows leading to a box la" data-caption="Books, newspapers and reformers together built an all-India feeling." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Vernacular literature</b> means writing in Indian languages. It spread liberty, nationalism and democracy among people who did not read English. The main writers are shown below.</p>
      <table><thead><tr><th>Writer</th><th>Language</th></tr></thead><tbody><tr><td>Bankim Chandra Chatterjee (Anand Math and Vande Mataram)</td><td>Bengali</td></tr><tr><td>Bharatendu Harishchandra</td><td>Hindi</td></tr><tr><td>Vishnu Krishna Chiplunkar</td><td>Marathi</td></tr><tr><td>Subramanya Bharati</td><td>Tamil</td></tr><tr><td>Rabindranath Tagore</td><td>Bengali</td></tr><tr><td>Altaf Hussain Hali</td><td>Urdu</td></tr></tbody></table>
      <p class="cp-lead"><b>The Press</b> was the chief tool of patriotism and liberal ideas. Newspapers carried the same news and ideas to many regions, and this created an all-India consciousness.</p>
      <p class="cp-lead"><b>Socio-religious reform</b> made Indians question old customs and think about their own rights. The reformers include Raja Ram Mohan Roy, Keshab Chandra Sen, Debendranath Tagore, Ishwar Chandra Vidyasagar, Swami Dayanand Saraswati, Ramakrishna Paramahansa and Swami Vivekananda.</p>
      <div class="cp-note trap">Swami Dayanand Saraswati was the first person to use the word <b>Swaraj</b>. Do not give this credit to Tilak or Gandhi.</div>
      <div class="cp-note exam">Anand Math and the song Vande Mataram are linked with Bankim Chandra Chatterjee.</div>
    `
  },
  7: {
    questext: "Who was the first person to use the word 'Swaraj'?",
    options: ["Bal Gangadhar Tilak", "Swami Dayanand Saraswati", "Dadabhai Naoroji", "Swami Vivekananda"],
    correct: "2",
    exptext: "✅ Swami Dayanand Saraswati was the first to use the word Swaraj. 📌 Dayanand, the Arya Samaj founder, gave the first call for self-rule. ❌ Tilak is tempting because of his famous Swaraj slogan, but that came later."
  },
  8: {
    questext: "The song 'Vande Mataram' was written by which author?",
    options: ["Rabindranath Tagore", "Bharatendu Harishchandra", "Altaf Hussain Hali", "Bankim Chandra Chatterjee"],
    correct: "4",
    exptext: "✅ Bankim Chandra Chatterjee wrote Vande Mataram in his novel Anand Math. 📌 Remember the pair: Bankim, Anand Math, Vande Mataram. ❌ Tagore is tempting because he wrote the national anthem, but not this song."
  },
  9: {
    questext: "Bharatendu Harishchandra helped to spread nationalist ideas through his writings in which language?",
    options: ["Bengali", "Marathi", "Hindi", "Urdu"],
    correct: "3",
    exptext: "✅ Bharatendu Harishchandra wrote in Hindi. 📌 Bharatendu is known as the father of modern Hindi literature. ❌ Bengali is tempting because most early nationalist writers, such as Bankim, wrote in it."
  },
  10: {
    type: "concept", icon: "🏛️", accent: "#8b5cf6", pauseTimer: true,
    title: "Reasons for the Growth of Nationalism: Discrimination, Exploitation and Lytton",
    html: `
      <p class="cp-lead">The new middle class felt hurt by unfair treatment and rising poverty. <u>Broken promises, economic loss and the harsh policies of Lord Lytton pushed Indians towards a national movement.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/8.png" alt="Delhi Durbar 1877 Lytton Queen Victoria Empress illustration" data-caption="The grand Delhi Durbar of 1877, held while many Indians suffered from famine." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/9.png" alt="Queen Victoria Proclamation 1858 Allahabad durbar illustration" data-caption="The reading of the Proclamation of Queen Victoria in 1858." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/10.png" alt="Arrows going from India to Britain labelled Raw materials, and arrows going from Britain t" data-caption="India supplied raw materials and bought finished British goods." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Discrimination</b> existed in administration, in where people could live, in the economy and in jobs. The <b>Proclamation of Queen Victoria, 1858</b> had promised high posts to Indians on merit, but this promise was never carried out.</p>
      <p class="cp-lead">The <b>new middle class</b> was made up of educated townsmen. Because they were shut out of high posts, they became the leaders of the freedom struggle.</p>
      <p class="cp-lead"><b>Economic exploitation</b> ruined Indian industries. India became a supplier of raw materials and a market for British goods. The tools of this exploitation were trade, finance and industry.</p>
      <p class="cp-lead"><b>Lord Lytton</b> was the Viceroy whose policies angered Indians. The table shows the main ones.</p>
      <table><thead><tr><th>Policy of Lytton</th><th>Why Indians were angry</th></tr></thead><tbody><tr><td>Delhi Durbar, 1877</td><td>A grand show was held during a drought and famine</td></tr><tr><td>Vernacular Press Act, 1878</td><td>It controlled newspapers in Indian languages</td></tr><tr><td>Arms Act, 1878</td><td>It disarmed Indians</td></tr><tr><td>Second Afghan War</td><td>Its cost was charged to the Indian treasury</td></tr></tbody></table>
      <div class="cp-note trap">The Proclamation of 1858 made a promise of equal opportunity. The reason it matters is that the promise was never kept.</div>
      <div class="cp-note exam">Delhi Durbar 1877, Vernacular Press Act 1878 and Arms Act 1878 are all linked with Lord Lytton.</div>
    `
  },
  11: {
    questext: "Consider the following statements:\n1. The Proclamation of Queen Victoria of 1858 promised high posts to Indians on merit.\n2. The British fully carried out this promise in the years that followed.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because the promise was made in 1858 but never carried out. 📌 A promise made is not a promise kept. ❌ Statement 2 is wrong because Indians stayed out of high posts."
  },
  12: {
    questext: "Which of the following was NOT a policy of Lord Lytton?",
    options: ["Delhi Durbar of 1877", "Vernacular Press Act of 1878", "Arms Act of 1878", "Ilbert Bill of 1883"],
    correct: "4",
    exptext: "✅ The Ilbert Bill of 1883 came during the time of Lord Ripon, not Lord Lytton. 📌 Lytton ruled in the late 1870s, Ripon in the early 1880s. ❌ The Arms Act is tempting, but it was passed by Lytton in 1878."
  },
  13: {
    type: "concept", icon: "⚖️", accent: "#14b8a6", pauseTimer: true,
    title: "The Ilbert Bill Controversy, 1883",
    html: `
      <p class="cp-lead">In 1883 a small law about Indian judges showed Indians how unequal British justice was. <u>The Ilbert Bill became an eye-opener for educated Indians.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/11.png" alt="Lord Ripon Viceroy of India portrait" data-caption="Lord Ripon, the Viceroy of India at the time of the Ilbert Bill." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/12.png" alt="Simple timeline with three boxes: 1861 Law: Indian judge can try a European only at distri" data-caption="The Ilbert Bill moved from a proposal for equal powers to a compromise." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">After the uniform criminal law of <b>1861</b>, an Indian judge in the Presidencies could try a European only at the district level. This meant an Indian judge in a lower court had no power over a European, however serious the case.</p>
      <p class="cp-lead"><b>Sir Courtenay Peregrine Ilbert</b>, Law Member of the Council of Viceroy <b>Lord Ripon</b>, moved a Bill to give Indian judges equal powers. This was called the Ilbert Bill.</p>
      <p class="cp-lead">Europeans in India united against the Bill and began a strong agitation. Because of this pressure, the Bill was <b>amended</b>, which means it was changed to a weaker form, and a compromise was reached.</p>
      <table><thead><tr><th>Person</th><th>Role</th></tr></thead><tbody><tr><td>Lord Ripon</td><td>Viceroy of India; he also repealed the Vernacular Press Act in 1882</td></tr><tr><td>Sir Courtenay Ilbert</td><td>Law Member of the Viceroy's Council; the Bill carries his name</td></tr></tbody></table>
      <p class="cp-lead">The lesson for Indians was clear. Justice in India was ranked below the privileges of the ruling race, and Indians began to see the need for their own organised political body.</p>
      <div class="cp-note trap">The Bill is named after Ilbert, not Ripon. Ripon was the Viceroy; Ilbert was the Law Member who moved it.</div>
      <div class="cp-note exam">The Ilbert Bill is called an eye-opener for Indians because it exposed racial bias in justice.</div>
    `
  },
  14: {
    questext: "The Ilbert Bill of 1883 was related to which matter?",
    options: ["Control over the Indian language press", "The power of Indian judges to try Europeans", "The disarming of Indians", "The cost of the Afghan War"],
    correct: "2",
    exptext: "✅ The Bill aimed to give Indian judges equal power to try Europeans. 📌 Ilbert means judges and equal justice. ❌ Press control is tempting, but that was the Vernacular Press Act of Lytton."
  },
  15: {
    questext: "Who was the Viceroy of India when the Ilbert Bill was introduced in 1883?",
    options: ["Lord Lytton", "Lord Dufferin", "Lord Curzon", "Lord Ripon"],
    correct: "4",
    exptext: "✅ Lord Ripon was the Viceroy, and his Law Member Sir Courtenay Ilbert moved the Bill. 📌 Ripon is remembered as a friend of Indians. ❌ Lytton is tempting because he came just before, but his rule ended in 1880."
  },
  16: {
    type: "concept", icon: "🏘️", accent: "#ec4899", pauseTimer: true,
    title: "Early Political Associations, 1836–1885",
    html: `
      <p class="cp-lead">Before the Congress, many local bodies tried to speak for Indians. <u>They were the forerunners of the Congress, and each one worked in only one city or region.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/13.png" alt="Dadabhai Naoroji portrait photo Grand Old Man of India" data-caption="Dadabhai Naoroji, known as the Grand Old Man of India, who founded several associations." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/14.png" alt="Surendranath Banerjee portrait photo" data-caption="Surendranath Banerjee, who founded the Indian Association in Calcutta in 1876." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/15.png" alt="Horizontal timeline with dots labelled 1836, 1838, 1851, 1866, 1870, 1876, 1884, 1885." data-caption="Early associations appeared in Bengal, Bombay, Poona and Madras between 1836 and 1885." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The table lists the main associations. The <b>Landholders' Society</b> of 1838 was the first body in Bengal with a clear political aim, which was to protect the interests of landlords. The <b>Indian Association</b> of 1876 was the most important body before the Congress.</p>
      <table><thead><tr><th>Association</th><th>Founder or leader</th><th>Year</th><th>Place and key point</th></tr></thead><tbody><tr><td>Bangabhasha Prakashika Sabha</td><td>Associates of Raja Ram Mohan Roy</td><td>1836</td><td>Bengal; it reviewed government policies</td></tr><tr><td>Landholders' Society (Zamindari Association)</td><td>Dwarkanath Tagore, Prasanna Kumar Tagore, Radhakanta Deb</td><td>1838</td><td>Bengal; first Bengal body with a distinct political aim</td></tr><tr><td>Bengal British India Society</td><td>Indian and British reformers</td><td>1843</td><td>Bengal; it defended the rights of common citizens</td></tr><tr><td>British Indian Association</td><td>Merger of the Landholders' Society and the Bengal British India Society; led by Radhakanta Deb</td><td>1851</td><td>Bengal</td></tr><tr><td>Bombay Association</td><td>Jagannath Shankarseth, with Dadabhai Naoroji as a leading member</td><td>1852</td><td>Bombay</td></tr><tr><td>London Indian Society</td><td>Dadabhai Naoroji</td><td>1865</td><td>London</td></tr><tr><td>East India Association</td><td>Dadabhai Naoroji</td><td>1866</td><td>London; it told the British public about the plight of Indians</td></tr><tr><td>Poona Sarvajanik Sabha</td><td>Mahadev Govind Ranade, Ganesh Vasudev Joshi</td><td>1870</td><td>Poona; a bridge between the government and the people</td></tr><tr><td>Indian League</td><td>Sisir Kumar Ghosh</td><td>1875</td><td>It stimulated nationalism and political education</td></tr><tr><td>Calcutta Students Association</td><td>Anand Mohan Bose</td><td>1875</td><td>Calcutta</td></tr><tr><td>Indian Association</td><td>Surendranath Banerjee, Ananda Mohan Bose</td><td>1876</td><td>Calcutta; direct forerunner of the Congress</td></tr><tr><td>Madras Mahajan Sabha</td><td>M. Veeraraghavachariar, G. Subramania Iyer, P. Anand Charlu</td><td>1884</td><td>Madras; joined the regional bodies together</td></tr><tr><td>Bombay Presidency Association</td><td>Pherozeshah Mehta, K. T. Telang, Badruddin Tyabji</td><td>1885</td><td>Bombay; promoted public interests</td></tr></tbody></table>
      <div class="cp-note trap">The Indian Association merged with the Congress in 1886, not 1885. It is the body most often asked as the direct forerunner of the Congress.</div>
      <div class="cp-note exam">Dadabhai Naoroji founded three of these bodies, and he is called the Grand Old Man of India.</div>
    `
  },
  17: {
    questext: "Which was the most important political body before the Congress and its direct forerunner?",
    options: ["Landholders' Society", "British Indian Association", "Indian Association", "Bombay Association"],
    correct: "3",
    exptext: "✅ The Indian Association of 1876, led by Surendranath Banerjee, was the direct forerunner of the Congress. 📌 Remember: 1876 Calcutta Indian Association leads to 1885 Congress. ❌ The British Indian Association is tempting but it was dominated by landlords."
  },
  18: {
    questext: "The Indian Association was founded in Calcutta in 1876 by which pair of leaders?",
    options: ["Surendranath Banerjee and Ananda Mohan Bose", "Dadabhai Naoroji and Pherozeshah Mehta", "Mahadev Govind Ranade and Ganesh Vasudev Joshi", "Sisir Kumar Ghosh and Anand Mohan Bose"],
    correct: "1",
    exptext: "✅ Surendranath Banerjee and Ananda Mohan Bose founded the Indian Association in 1876. 📌 Both names are from Bengal. ❌ Ranade and Joshi are tempting, but they founded the Poona Sarvajanik Sabha."
  },
  19: {
    questext: "Which was the first Bengal body with a clear political aim, set up in 1838 to protect the interests of landlords?",
    options: ["Bangabhasha Prakashika Sabha", "Landholders' Society", "Bengal British India Society", "Indian League"],
    correct: "2",
    exptext: "✅ The Landholders' Society, also called the Zamindari Association, was set up in 1838 with a clear political aim. 📌 Landholders means zamindars protecting land interests. ❌ Bangabhasha Prakashika Sabha is earlier, but it only reviewed government policies."
  },
  20: {
    questext: "Consider the following statements:\n1. The East India Association was founded in London in 1866 by Dadabhai Naoroji.\n2. The Poona Sarvajanik Sabha was set up by Mahadev Govind Ranade and Ganesh Vasudev Joshi.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Naoroji worked in London, while Ranade and Joshi worked in Poona. ❌ Choosing only one is tempting if the two similar-looking bodies are mixed up."
  },
  21: {
    questext: "Arrange the following bodies in the order in which they were founded, earliest first: A. Indian Association  B. British Indian Association  C. Landholders' Society  D. Madras Mahajan Sabha",
    options: ["C, B, A, D", "B, C, A, D", "C, A, B, D", "C, B, D, A"],
    correct: "1",
    exptext: "✅ The order is Landholders' Society (1838), British Indian Association (1851), Indian Association (1876) and Madras Mahajan Sabha (1884). 📌 Think 38, 51, 76, 84. ❌ Option 2 is tempting because the British Indian Association came from the Landholders' Society."
  },
  22: {
    type: "concept", icon: "🏛️", accent: "#3b82f6", pauseTimer: true,
    title: "The Indian National Congress, 1885",
    html: `
      <p class="cp-lead">On <b>28 December 1885</b>, the Indian National Congress was born in Bombay. <u>It was the first all-India political body, set up when local bodies had shown their limits.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/16.png" alt="Gokuldas Tejpal Sanskrit College Bombay first Congress session 1885" data-caption="The Gokuldas Tejpal Sanskrit College in Bombay, where the first Congress session was held." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/17.png" alt="Allan Octavian Hume portrait photo" data-caption="Allan Octavian Hume, a retired civil servant who organised the first Congress session." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/18.png" alt="Womesh Chunder Bonnerjee portrait photo first Congress president" data-caption="Womesh Chunder Bonnerjee, the first president of the Indian National Congress." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Organiser and first General Secretary</td><td>Allan Octavian Hume (A. O. Hume), a retired officer of the Indian Civil Service; 9 resolutions were passed in the first session</td></tr><tr><td>First President</td><td>Womesh Chunder Bonnerjee (W. C. Bonnerjee), a Calcutta barrister</td></tr><tr><td>Planned venue</td><td>Pune; it was shifted to Bombay because of a plague</td></tr><tr><td>Delegates</td><td>72 delegates, mostly lawyers and journalists; the largest group of 38 came from Bombay</td></tr><tr><td>Original name</td><td>Indian National Union; it was renamed Indian National Congress on the suggestion of Dadabhai Naoroji</td></tr></tbody></table>
      <p class="cp-lead">Several events pushed Indians towards a national body. First, Indian-owned newspapers spread political ideas. Second, economists such as Romesh Chunder Dutt and Dadabhai Naoroji explained the Drain Theory, and the great famines of the 1860s and 1870s increased poverty. Third, the earlier bodies were local, limited to one city and run by a small elite, so Indians needed one body for all India.</p>
      <table><thead><tr><th>Newspaper</th><th>Leader linked with it</th></tr></thead><tbody><tr><td>Amrit Bazar Patrika</td><td>Sisir Kumar Ghosh</td></tr><tr><td>Bengalee</td><td>Surendranath Banerjee</td></tr><tr><td>Mahratta and Kesari</td><td>Bal Gangadhar Tilak</td></tr><tr><td>The Hindu</td><td>G. Subramania Iyer</td></tr></tbody></table>
      <div class="cp-note trap">Hume organised the Congress and Bonnerjee presided over it. Do not give the title of first president to Hume. The viceroy at the time was Lord Dufferin.</div>
      <div class="cp-note exam">Remember the numbers: 28 December 1885, 72 delegates, 9 resolutions, and 38 delegates from Bombay.</div>
    `
  },
  23: {
    questext: "Who was the first General Secretary and organiser of the Indian National Congress?",
    options: ["Allan Octavian Hume", "Womesh Chunder Bonnerjee", "Dadabhai Naoroji", "William Wedderburn"],
    correct: "1",
    exptext: "✅ Allan Octavian Hume, a retired civil servant, organised the Congress and was its first General Secretary. 📌 Hume held the pen, while Bonnerjee held the chair. ❌ Bonnerjee is tempting because he was the first president, a different post."
  },
  24: {
    questext: "The first session of the Indian National Congress was originally planned at which city?",
    options: ["Bombay", "Calcutta", "Pune", "Madras"],
    correct: "3",
    exptext: "✅ Pune was the planned venue, but the session was shifted to Bombay because of a plague. 📌 Plague pushed the meeting from Pune to Bombay. ❌ Bombay is tempting because the session was actually held there."
  },
  25: {
    questext: "How many delegates attended the first session of the Indian National Congress in 1885?",
    options: ["62", "72", "82", "92"],
    correct: "2",
    exptext: "✅ Seventy-two delegates attended, mostly lawyers and journalists. 📌 Link 72 with 1885 and nine resolutions. ❌ 82 is tempting because the digits look alike, but it is wrong."
  },
  26: {
    questext: "What was the original name of the Indian National Congress?",
    options: ["Indian National Union", "Indian National Association", "Indian Congress Committee", "National Indian League"],
    correct: "1",
    exptext: "✅ It was first called the Indian National Union and was renamed on the suggestion of Dadabhai Naoroji. 📌 Union first, Congress later. ❌ Indian National Association is tempting because Indian Association was a real earlier body."
  },
  27: {
    type: "concept", icon: "🎯", accent: "#f97316", pauseTimer: true,
    title: "Aims and Nature of the Congress",
    html: `
      <p class="cp-lead">The Congress was not a political party in the usual sense. <u>It was a broad national movement that tried to bring all Indians together.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/19.png" alt="Five labelled boxes around a centre labelled Congress: Democratic all-India movement, Educ" data-caption="The main aims of the Congress, drawn around one central circle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/20.png" alt="A circle diagram of three steps labelled Every December, Different region each time, Presi" data-caption="The annual Congress session moved to a new region each year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The main aims were a <b>democratic, all-India nationalist movement</b>, to politicise and educate the people, to make a headquarters for the movement, to build friendly relations among nationalist workers, to develop an <b>anti-colonial nationalist ideology</b>, and to create national unity across religion, caste and province.</p>
      <p class="cp-lead">It was a <b>movement, not a party</b>. A yearly session was held each December in a different region, and the president came from outside that region. This rule helped the Congress feel like a body of the whole country.</p>
      <table><thead><tr><th>Person</th><th>Link with the Congress</th></tr></thead><tbody><tr><td>Surendranath Banerjee</td><td>Missed the founding session because the second All-India Conference of his Indian Association clashed with it</td></tr><tr><td>Sir Sayyid Ahmad Khan</td><td>Was never associated with the Congress</td></tr><tr><td>Bal Gangadhar Tilak</td><td>Was a member, but was never elected president</td></tr></tbody></table>
      <div class="cp-note trap">Tilak was a member of the Congress but was never elected its president. Sir Sayyid Ahmad Khan was never a part of the Congress.</div>
      <div class="cp-note exam">The Congress is called a movement, not a party, because it held one annual session and welcomed people from every group.</div>
    `
  },
  28: {
    questext: "Which of the following leaders missed the founding session of the Congress because of a clash with his own conference?",
    options: ["Dadabhai Naoroji", "Surendranath Banerjee", "Pherozeshah Mehta", "Badruddin Tyabji"],
    correct: "2",
    exptext: "✅ Surendranath Banerjee missed the first session because his Indian Association was holding its own conference. 📌 Two meetings were held at the same time. ❌ Naoroji is tempting, but he was in Bombay and took part."
  },
  29: {
    questext: "Consider the following statements:\n1. Surendranath Banerjee attended the founding session of the Congress in 1885.\n2. Bal Gangadhar Tilak was a member of the Congress but was never elected its president.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Tilak joined the Congress but never presided over it. ❌ Statement 1 is wrong because Banerjee missed the first session."
  },
  30: {
    type: "concept", icon: "⚡", accent: "#84cc16", pauseTimer: true,
    title: "Safety Valve Theory versus Lightning Conductor",
    html: `
      <p class="cp-lead">Historians have long debated why Hume started the Congress. <u>One side says the British wanted a safety valve; the other says Indians used Hume as a lightning conductor.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/21.png" alt="Two side-by-side pictures: a steam kettle with a valve labelled Safety valve, and a house " data-caption="The two theories shown as a safety valve and a lightning conductor." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/22.png" alt="Lord Dufferin Viceroy of India portrait" data-caption="Lord Dufferin, the Viceroy of India when the Congress was founded." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>safety valve theory</b> says that the British, through Hume, created the Congress to give discontented educated Indians a way to speak, so that they would not join the discontented peasants. The supposed proof is that Hume read <b>seven volumes of secret reports</b> at Simla in 1878. The story first appeared in <b>William Wedderburn's</b> biography of Hume, written in 1913.</p>
      <p class="cp-lead">Some people accepted this view, including Romesh Chunder Dutt, Golwalkar of the Rashtriya Swayamsevak Sangh and C. F. Andrews. Lala Lajpat Rai, in the paper <b>Young India</b>, called the Congress the brainchild of Lord Dufferin.</p>
      <p class="cp-lead">The opposite view is the <b>lightning conductor theory</b>. Leaders used Hume to protect the new body from official hostility, as a conductor takes lightning safely to the ground. Gopal Krishna Gokhale used this phrase. <b>Bipin Chandra</b> said the Congress was the result of the awakening that had been growing since the 1870s, and was not a British creation.</p>
      <table><thead><tr><th>View</th><th>Who held it</th><th>Main idea</th></tr></thead><tbody><tr><td>Safety valve</td><td>Dutt, Andrews, Lala Lajpat Rai</td><td>The British created the Congress to protect their rule</td></tr><tr><td>Lightning conductor</td><td>Gokhale, Bipin Chandra</td><td>Indian leaders used Hume to avoid official hostility</td></tr></tbody></table>
      <p class="cp-lead">Viceroys were in fact hostile to the Congress. Lord Curzon mocked it as the Bengali Congress and as the voice of a microscopic educated minority. Civil servants were barred from its sessions, and Lord Dufferin advised Sir Sayyid Ahmad Khan to keep Muslims away.</p>
      <div class="cp-note trap">The safety valve idea is the charge against Hume. The lightning conductor idea is the answer given by the Moderate leaders.</div>
      <div class="cp-note exam">Remember the pairs: Wedderburn's 1913 biography, seven volumes of reports at Simla in 1878, and Gokhale's phrase lightning conductor.</div>
    `
  },
  31: {
    questext: "The safety valve story about the origin of the Congress first appeared in the biography of Hume written by whom?",
    options: ["Dadabhai Naoroji", "Bipin Chandra", "William Wedderburn", "Gopal Krishna Gokhale"],
    correct: "3",
    exptext: "✅ William Wedderburn wrote the biography of Hume in 1913 in which this story first appeared. 📌 Wedderburn, 1913, Hume's biographer. ❌ Gokhale is tempting because he is linked with the opposite phrase, lightning conductor."
  },
  32: {
    questext: "Which leader used the phrase 'lightning conductor' for Hume?",
    options: ["Lala Lajpat Rai", "Romesh Chunder Dutt", "Lord Dufferin", "Gopal Krishna Gokhale"],
    correct: "4",
    exptext: "✅ Gopal Krishna Gokhale called Hume a lightning conductor. 📌 The Moderates used Hume to avoid official anger. ❌ Lala Lajpat Rai is tempting, but he supported the safety valve view."
  },
  33: {
    questext: "Consider the following statements:\n1. Lala Lajpat Rai, in Young India, called the Congress the brainchild of Lord Dufferin.\n2. Bipin Chandra described the Congress as a culmination of the awakening since the 1870s.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Rai held the safety valve view, while Chandra held the awakening view. ❌ Choosing only one is tempting because the two historians disagree with each other."
  },
  34: {
    questext: "Which Viceroy mocked the Congress as the 'Bengali Congress'?",
    options: ["Lord Lytton", "Lord Ripon", "Lord Curzon", "Lord Dufferin"],
    correct: "3",
    exptext: "✅ Lord Curzon mocked the Congress as the Bengali Congress. 📌 Curzon was the harshest critic of the Congress. ❌ Dufferin is tempting because he also opposed the Congress, but his advice was to Sir Sayyid Ahmad Khan."
  },
  35: {
    type: "concept", icon: "📅", accent: "#06b6d4", pauseTimer: true,
    title: "Congress Sessions — Year, Place, President",
    html: `
      <p class="cp-lead">Many exam questions ask for the "first" president of each kind. <u>Learn the year, the place and the special fact of each session together.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/23.png" alt="Badruddin Tyabji portrait photo first Muslim Congress president" data-caption="Badruddin Tyabji, the first Muslim president of the Congress in 1887." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/24.png" alt="Annie Besant portrait photo Congress president 1917" data-caption="Annie Besant, the first woman president of the Congress in 1917." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/25.png" alt="Sarojini Naidu portrait photo Congress president 1925" data-caption="Sarojini Naidu, the first Indian woman president of the Congress in 1925." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Year</th><th>Place</th><th>President</th><th>Why it is asked</th></tr></thead><tbody><tr><td>1885</td><td>Bombay</td><td>W. C. Bonnerjee</td><td>First session; 72 delegates; Viceroy Lord Dufferin</td></tr><tr><td>1886</td><td>Calcutta</td><td>Dadabhai Naoroji</td><td>First Parsi president; the Indian Association merged with the Congress</td></tr><tr><td>1887</td><td>Madras</td><td>Badruddin Tyabji</td><td>First Muslim president</td></tr><tr><td>1888</td><td>Allahabad</td><td>George Yule</td><td>First Christian president</td></tr><tr><td>1889</td><td>Bombay</td><td>William Wedderburn</td><td>Hume's biographer</td></tr><tr><td>1890</td><td>Calcutta</td><td>Pherozeshah Mehta</td><td>Kadambini Ganguly, the first woman graduate of Calcutta University, addressed the session</td></tr><tr><td>1893</td><td>Lahore</td><td>Dadabhai Naoroji</td><td>Naoroji presided three times: 1886, 1893 and 1906</td></tr><tr><td>1906</td><td>Calcutta</td><td>Dadabhai Naoroji</td><td>His third term</td></tr><tr><td>1907</td><td>Surat</td><td>Rash Behari Ghosh</td><td>Surat Split; the Moderates and Extremists parted</td></tr><tr><td>1910</td><td>Allahabad</td><td>William Wedderburn</td><td>His second term</td></tr><tr><td>1916</td><td>Lucknow</td><td>Ambika Charan Majumdar</td><td>The two wings were reunited</td></tr><tr><td>1917</td><td>Calcutta</td><td>Annie Besant</td><td>First woman president</td></tr><tr><td>1925</td><td>Kanpur</td><td>Sarojini Naidu</td><td>First Indian woman president</td></tr></tbody></table>
      <div class="cp-note trap">Annie Besant in 1917 was the first woman president, while Sarojini Naidu in 1925 was the first Indian woman president. Do not mix them.</div>
      <div class="cp-note exam">Remember the "firsts": Parsi Naoroji 1886, Muslim Tyabji 1887, Christian Yule 1888, woman Besant 1917, Indian woman Naidu 1925.</div>
    `
  },
  36: {
    questext: "Who became the first Muslim president of the Indian National Congress in 1887?",
    options: ["Maulana Abul Kalam Azad", "Badruddin Tyabji", "Hakim Ajmal Khan", "Sir Sayyid Ahmad Khan"],
    correct: "2",
    exptext: "✅ Badruddin Tyabji presided over the Madras session of 1887. 📌 Think Tyabji, Madras, 1887. ❌ Sir Sayyid Ahmad Khan is tempting, but he never joined the Congress."
  },
  37: {
    questext: "Who was the first woman president of the Indian National Congress?",
    options: ["Sarojini Naidu", "Kadambini Ganguly", "Annie Besant", "Sucheta Kripalani"],
    correct: "3",
    exptext: "✅ Annie Besant presided over the 1917 Calcutta session. 📌 Besant came first, Naidu came eight years later. ❌ Sarojini Naidu is tempting, but she was the first Indian woman president in 1925."
  },
  38: {
    questext: "How many times did Dadabhai Naoroji preside over the Congress?",
    options: ["Once", "Twice", "Three times", "Four times"],
    correct: "3",
    exptext: "✅ Naoroji presided in 1886, 1893 and 1906. 📌 Count the years: 86, 93, 06. ❌ Twice is tempting because many people remember only 1886 and 1906."
  },
  39: {
    questext: "Which Congress session saw the Surat Split between the Moderates and the Extremists?",
    options: ["Calcutta, 1906", "Surat, 1907", "Lucknow, 1916", "Allahabad, 1910"],
    correct: "2",
    exptext: "✅ The Surat session of 1907, with Rash Behari Ghosh as president, saw the split. 📌 The place name is the clue: Surat Split at Surat. ❌ Lucknow is tempting, but that session reunited the two wings."
  },
  40: {
    type: "concept", icon: "🧭", accent: "#a855f7", pauseTimer: true,
    title: "The Moderate Phase, 1885–1905 — Who They Were",
    html: `
      <p class="cp-lead">The first twenty years of the Congress are called the <b>Moderate Phase</b>. <u>The Moderates believed in slow, peaceful and lawful methods.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/26.png" alt="Three stacked boxes labelled Prayers, Petitions, Protests with a small label 3 P politics " data-caption="The three methods of the Moderates: prayers, petitions and protests." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/27.png" alt="Gopal Krishna Gokhale portrait photo" data-caption="Gopal Krishna Gokhale, one of the best known Moderate leaders." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Moderates came from the <b>urban middle class and the educated elite</b>. They were purely secular and believed in liberalism, the rule of law, civil liberties and tolerance. They trusted the British sense of justice, so they used <b>constitutional agitation</b>, which means working within the law through resolutions, petitions and meetings, to persuade British opinion. This style is called the <b>3 P politics</b> of prayers, petitions and protests.</p>
      <table><thead><tr><th>Point</th><th>Moderates (1885–1905)</th><th>Extremists (1905–1918)</th></tr></thead><tbody><tr><td>Also known as</td><td>Early Nationalists</td><td>Militant Nationalists</td></tr><tr><td>Main belief</td><td>Constitutional agitation within the law</td><td>Constitutional methods had proved ineffective</td></tr><tr><td>Leaders</td><td>Dadabhai Naoroji, Pherozeshah Mehta, Surendranath Banerjee, Gokhale</td><td>Bal Gangadhar Tilak, Lala Lajpat Rai, Bipin Chandra Pal</td></tr></tbody></table>
      <p class="cp-lead">Other Moderate leaders were W. C. Bonnerjee, Rash Behari Ghosh, R. C. Dutt, Gopal Krishna Gokhale, Justice Ranade, P. R. Naidu, S. Subramania Iyer, Anandacharlu and Madan Mohan Malaviya.</p>
      <div class="cp-note trap">The Moderates did not demand full independence. Their demand was greater Indian share in government, within British rule.</div>
      <div class="cp-note exam">The Moderate Phase is 1885 to 1905, the Extremist Phase is 1905 to 1918, and the Gandhian Phase is 1919 to 1947.</div>
    `
  },
  41: {
    questext: "The three methods of the Moderates are popularly known as which of the following?",
    options: ["Boycott, Swadeshi and National education", "Prayers, Petitions and Protests", "Non-cooperation, Civil disobedience and Quit India", "Strikes, Marches and Fasts"],
    correct: "2",
    exptext: "✅ The Moderates used prayers, petitions and protests, which is called 3 P politics. 📌 Three P letters stand for prayers, petitions and protests. ❌ Boycott and Swadeshi are tempting, but they belong to the Extremist phase."
  },
  42: {
    questext: "Which of the following leaders was an Extremist and NOT a Moderate?",
    options: ["Gopal Krishna Gokhale", "Dadabhai Naoroji", "Pherozeshah Mehta", "Lala Lajpat Rai"],
    correct: "4",
    exptext: "✅ Lala Lajpat Rai was an Extremist, along with Tilak and Bipin Chandra Pal. 📌 Remember the trio Lal, Bal and Pal. ❌ Gokhale is tempting because he is famous, but he was a leading Moderate."
  },
  43: {
    type: "concept", icon: "📜", accent: "#e11d48", pauseTimer: true,
    title: "Demands of the Moderates",
    html: `
      <p class="cp-lead">The Moderates asked for reforms in three areas. <u>Their slogan was "no taxation without representation".</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/28.png" alt="Three columns labelled Constitutional, Administrative, Economic, each with two or three sh" data-caption="The Moderates' demands grouped into constitutional, administrative and economic." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/29.png" alt="Council chamber British India legislative council 1890s photo" data-caption="A legislative council hall of British India, where Moderates wanted more Indian members." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Area</th><th>Main demands</th></tr></thead><tbody><tr><td>Constitutional</td><td>More Indians in legislative and administrative bodies; expansion of councils, with seats for chambers of commerce and universities; control over public money; self-rule within the Empire, like Canada and Australia</td></tr><tr><td>Administrative</td><td>Simultaneous Indian Civil Service examinations in England and India; separation of the executive from the judiciary; more powers to municipal bodies; repeal of the Arms Act and the License Act; Indians in higher posts; fewer police</td></tr><tr><td>Economic</td><td>Lower land revenue and lower military expenditure; more spending on health and education; an enquiry into poverty and famines; cheap credit through agricultural banks; irrigation and medical facilities; protection for Indian industry through heavy import tax and loans for iron, coal, paper and sugar; abolition of the salt tax and the sugar duty</td></tr></tbody></table>
      <p class="cp-lead">The idea of <b>simultaneous examinations</b> matters because the Indian Civil Service test was held only in London, which made it very hard for Indians. The idea of <b>separating the executive from the judiciary</b> means that the person who arrests and the person who judges should not be the same.</p>
      <p class="cp-lead">The demand for "no taxation without representation" means that if people pay taxes, they must have a say in how the money is spent.</p>
      <div class="cp-note trap">The Moderates wanted self-rule within the British Empire, like Canada and Australia, and not a complete break from Britain.</div>
      <div class="cp-note exam">Simultaneous examinations in London and India is one of the most repeated Moderate demands.</div>
    `
  },
  44: {
    questext: "Which of the following was NOT a demand of the Moderates?",
    options: ["Separation of the executive from the judiciary", "Abolition of the salt tax", "Repeal of the Arms Act", "Complete independence through armed revolt"],
    correct: "4",
    exptext: "✅ The Moderates never asked for independence through armed revolt. 📌 They were lawful and peaceful, so armed revolt does not fit them. ❌ Repeal of the Arms Act is tempting, but it was actually one of their demands."
  },
  45: {
    questext: "'No taxation without representation' was a slogan of which group?",
    options: ["The Moderates", "The Extremists", "The Revolutionaries", "The Home Rule Leaguers"],
    correct: "1",
    exptext: "✅ The Moderates used it to ask for control over the public purse. 📌 Tax means a say in spending. ❌ The Extremists are tempting, but they wanted Swaraj through stronger action."
  },
  46: {
    type: "concept", icon: "💷", accent: "#10b981", pauseTimer: true,
    title: "Organisations and the Era of Economic Nationalism",
    html: `
      <p class="cp-lead">The Moderates studied how British rule affected the Indian economy. <u>This period is called the Era of Economic Nationalism.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/30.png" alt="Dinshaw Wacha Justice Ranade R C Dutt portrait photo" data-caption="Romesh Chunder Dutt, a retired civil servant who wrote the Economic History of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/31.png" alt="Three boxes in a row labelled Indian Reform Committee 1887, British Committee of India 188" data-caption="Three bodies in Britain that carried the Moderate demands to the British public." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Economic nationalism</b> means looking at India's economic problems from the point of view of the nation. Its leaders showed that British rule was draining the wealth of India, and they demanded modern industry and fair taxes.</p>
      <table><thead><tr><th>Body or event</th><th>Year</th><th>Key point</th></tr></thead><tbody><tr><td>Indian Reform Committee</td><td>1887</td><td>Formed in Britain under Dadabhai Naoroji</td></tr><tr><td>British Committee of India</td><td>1889</td><td>Formed in London; William Digby was secretary and its journal was called India; delegations were sent to England</td></tr></tbody></table>
      <p class="cp-lead"><b>Mahadev Govind Ranade</b> stressed modern industry. <b>Romesh Chunder Dutt</b>, a retired Indian Civil Service officer, wrote the <b>Economic History of India</b> in two volumes (1901–1903). Dinshaw Wacha and Justice Ranade also wrote on Indian economics, and Ranade's book was <b>Essays in Indian Economics</b> (1898).</p>
      <div class="cp-note trap">The two economic classics are not the same. Essays in Indian Economics is by Ranade, while Economic History of India is by R. C. Dutt.</div>
      <div class="cp-note exam">The British Committee of India was founded in 1889 in London, with William Digby as secretary and the journal India.</div>
    `
  },
  47: {
    questext: "Who was the secretary of the British Committee of India, founded in London in 1889?",
    options: ["Dadabhai Naoroji", "William Digby", "William Wedderburn", "Allan Octavian Hume"],
    correct: "2",
    exptext: "✅ William Digby was the secretary, and the Committee published a journal called India. 📌 Digby with Dadabhai means the Drain. ❌ Naoroji is tempting, but he led the Indian Reform Committee."
  },
  48: {
    questext: "Consider the following statements:\n1. The Economic History of India, in two volumes, was written by Romesh Chunder Dutt.\n2. Essays in Indian Economics was written by Dadabhai Naoroji.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Dutt wrote the history, and Ranade wrote the essays. ❌ Statement 2 is wrong because Essays in Indian Economics was written by Mahadev Govind Ranade."
  },
  49: {
    type: "concept", icon: "💰", accent: "#eab308", pauseTimer: true,
    title: "The Drain Theory",
    html: `
      <p class="cp-lead">The Drain Theory explains how the wealth of India flowed to Britain without any return. <u>It was the strongest economic argument of the Moderates against British rule.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/32.png" alt="A large arrow from a box labelled India to a box labelled England, with small labels Salar" data-caption="Wealth flowed from India to England as home charges without any return." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/33.png" alt="Dadabhai Naoroji Poverty and Un-British Rule in India book cover" data-caption="The book Poverty and Un-British Rule in India, written by Dadabhai Naoroji." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Dadabhai Naoroji</b> wrote <b>Poverty and Un-British Rule in India</b> and put forward the theory of the <b>Drain of Wealth</b>. He said India paid large <b>home charges</b>, meaning the salaries, savings, pensions and payments to British troops that were sent to England, together with the profits of British companies.</p>
      <p class="cp-lead">Naoroji estimated the drain at about <b>£12 million</b> a year. William Digby gave a higher figure of <b>£30 million</b>. Naoroji said British rule had caused only impoverishment, and described it as "the knife of sugar", which means it cuts but feels sweet.</p>
      <table><thead><tr><th>Leader</th><th>Work or idea</th></tr></thead><tbody><tr><td>Dadabhai Naoroji</td><td>Poverty and Un-British Rule in India; Drain of Wealth</td></tr><tr><td>Mahadev Govind Ranade</td><td>Essays in Indian Economics (1898)</td></tr><tr><td>Romesh Chunder Dutt</td><td>The Economic History of India, two volumes (1901–1903)</td></tr></tbody></table>
      <p class="cp-lead">The British were forced to appoint the <b>Welby Commission</b> in 1895, and <b>Naoroji</b> became its first Indian member. In 1892, he also became the first Indian elected to the House of Commons, from Finsbury Central.</p>
      <div class="cp-note trap">The drain estimates differ by person: Naoroji gave about £12 million a year, while Digby gave £30 million.</div>
      <div class="cp-note exam">Naoroji was the first Indian member of the Welby Commission and the first Indian elected to the British House of Commons.</div>
    `
  },
  50: {
    questext: "Who wrote 'Poverty and Un-British Rule in India', which presented the Drain Theory?",
    options: ["Romesh Chunder Dutt", "Mahadev Govind Ranade", "Dadabhai Naoroji", "Dinshaw Wacha"],
    correct: "3",
    exptext: "✅ Dadabhai Naoroji wrote this book and developed the Drain of Wealth idea. 📌 Poverty and Un-British Rule are Naoroji's own words. ❌ Dutt is tempting because he also wrote on the economy, but his work was the Economic History of India."
  },
  51: {
    questext: "The Welby Commission was appointed after pressure from Indian leaders. Who became its first Indian member?",
    options: ["Gopal Krishna Gokhale", "Surendranath Banerjee", "Pherozeshah Mehta", "Dadabhai Naoroji"],
    correct: "4",
    exptext: "✅ Dadabhai Naoroji was the first Indian member of the Welby Commission. 📌 He was the Grand Old Man, so he was first in many places. ❌ Gokhale is tempting because he later appeared before it, but he was not the first member."
  },
  52: {
    questext: "Dadabhai Naoroji was elected in 1892 to the British House of Commons from which place?",
    options: ["Finsbury Central", "Westminster", "Manchester", "Liverpool"],
    correct: "1",
    exptext: "✅ He was elected from Finsbury Central as a Liberal, and he was the first Indian to sit there. 📌 Finsbury begins with F, like the first. ❌ Westminster is tempting because Parliament sits there, but it is not his seat."
  },
  53: {
    questext: "Naoroji estimated the yearly drain of wealth from India at approximately how much?",
    options: ["£5 million", "£12 million", "£30 million", "£50 million"],
    correct: "2",
    exptext: "✅ Naoroji estimated about £12 million each year. 📌 Naoroji is twelve, Digby is thirty. ❌ £30 million is tempting, but it was the figure given by William Digby."
  },
  54: {
    type: "concept", icon: "🏆", accent: "#0ea5e9", pauseTimer: true,
    title: "Achievements of the Moderates",
    html: `
      <p class="cp-lead">The Moderates did not win freedom, but they built the base for the later movement. <u>Their gains were slow, but they were real.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/34.png" alt="A staircase with four steps labelled National awakening, Democratic ideas, Drain exposed, " data-caption="The achievements of the Moderates shown as steps of a staircase." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/35.png" alt="Indian Councils Act 1892 legislative council meeting photo" data-caption="A legislative council of British India after it was enlarged in 1892." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Moderates created a wide national awakening and spread the ideas of democracy and nationalism. They also exposed the economic exploitation of India through the Drain Theory. In 1893, the House of Commons passed a resolution for simultaneous examinations for the Indian Civil Service, which was a big moral victory, though it was never put into practice.</p>
      <p class="cp-lead">The most important constitutional result was the <b>Indian Councils Act of 1892</b>. It enlarged the councils, introduced the principle of <b>indirect election</b>, and gave members the <b>right to discuss the budget</b>. In 1895, the Welby Commission looked into Indian expenditure after demands from Indian leaders.</p>
      <table><thead><tr><th>Achievement</th><th>Details</th></tr></thead><tbody><tr><td>Indian Councils Act, 1892</td><td>Enlarged councils; indirect election; right to discuss the budget</td></tr><tr><td>Resolution of the House of Commons</td><td>Simultaneous examinations for the Indian Civil Service</td></tr><tr><td>Welby Commission</td><td>Inquiry into Indian expenditure; Naoroji was its first Indian member</td></tr><tr><td>Repeal of the Vernacular Press Act</td><td>Done by Lord Ripon in 1882</td></tr></tbody></table>
      <div class="cp-note trap">The Act of 1892 gave the right to discuss the budget, but not the right to vote on it. Election was indirect, not direct.</div>
      <div class="cp-note exam">Indian Councils Act 1892 means enlarged councils, indirect election, and the right to discuss the budget.</div>
    `
  },
  55: {
    questext: "Which of the following was a feature of the Indian Councils Act of 1892?",
    options: ["Direct election of all members", "Right to vote on the budget", "Right to discuss the budget", "Separate electorates for Muslims"],
    correct: "3",
    exptext: "✅ The Act gave members the right to discuss the budget, with indirect election. 📌 Discuss, not vote. ❌ Separate electorates is tempting, but that came with the Act of 1909."
  },
  56: {
    questext: "Consider the following statements:\n1. Lord Ripon repealed Lytton's Vernacular Press Act in 1882.\n2. The Indian Councils Act of 1892 introduced direct election in the councils.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Ripon the liberal undid Lytton's press law. ❌ Statement 2 is wrong because the Act introduced the indirect method of election."
  },
  57: {
    type: "concept", icon: "🧱", accent: "#d946ef", pauseTimer: true,
    title: "Weaknesses of the Moderates",
    html: `
      <p class="cp-lead">The Moderate leaders were honest, but their base was small. <u>They could not reach the masses, and that is why the next generation called their politics weak.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/36.png" alt="A bar chart with one tall bar labelled Lawyers 39.32 percent and several short bars labell" data-caption="Lawyers formed the largest group among Congress delegates between 1892 and 1909." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/37.png" alt="Lala Lajpat Rai portrait photo" data-caption="Lala Lajpat Rai, an Extremist leader who criticised the Moderates." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The social base was <b>narrow</b>. Most delegates were Hindus, with Badruddin Tyabji of Bombay as a notable exception, and most were from the upper castes. The property-owning class was strong: lawyers were about <b>39.32 percent</b> of the delegates from 1892 to 1909, and landlords, traders, journalists and teachers formed the rest.</p>
      <p class="cp-lead">The Moderates had <b>no mass roots</b>. They did not run an all-India campaign and had no hold over the peasants. They supported the <b>Permanent Settlement</b> and opposed the cadastral survey of 1893 to 1894, and they opposed the Mining Bill, which they said served the interests of Lancashire mill owners. After the famine of 1896 to 1900, they also opposed the costly <b>Second Delhi Durbar of 1903</b>.</p>
      <table><thead><tr><th>Weakness</th><th>Details</th></tr></thead><tbody><tr><td>Narrow social base</td><td>Mainly Hindu, upper caste, and educated townsmen</td></tr><tr><td>Property-owning class</td><td>Lawyers were 39.32 percent of delegates in 1892 to 1909</td></tr><tr><td>No mass roots</td><td>No all-India campaign; no hold over peasants</td></tr><tr><td>Faith in British justice</td><td>Methods of prayers and petitions gave poor results</td></tr></tbody></table>
      <p class="cp-lead">The Extremist leader <b>Lala Lajpat Rai</b> said that after twenty years of agitation the Moderates had given Indians "stones in place of bread". This was his way of saying that their results were very small.</p>
      <div class="cp-note trap">The cadastral survey of 1893 to 1894 was opposed by the Moderate-led Congress, in support of landlords. Do not treat it as a peasant movement.</div>
      <div class="cp-note exam">The phrase "stones in place of bread" is linked with Lala Lajpat Rai, and 39.32 percent with lawyers.</div>
    `
  },
  58: {
    questext: "Which Extremist leader said that the Moderates, after twenty years of agitation, had given 'stones in place of bread'?",
    options: ["Bal Gangadhar Tilak", "Bipin Chandra Pal", "Lala Lajpat Rai", "Aurobindo Ghose"],
    correct: "3",
    exptext: "✅ Lala Lajpat Rai used this phrase to criticise the poor results of the Moderates. 📌 Stones are what the Moderates gave. ❌ Tilak is tempting because he was a harsher critic, but this phrase is linked with Rai."
  },
  59: {
    questext: "Which group formed the largest share, about 39.32 percent, of Congress delegates between 1892 and 1909?",
    options: ["Landlords", "Lawyers", "Traders", "Teachers"],
    correct: "2",
    exptext: "✅ Lawyers formed about 39.32 percent of the delegates. 📌 Law-trained men led the early Congress. ❌ Landlords are tempting, but they came well below lawyers."
  },
  60: {
    type: "concept", icon: "💥", accent: "#64748b", pauseTimer: true,
    title: "Towards the Surat Split, 1907",
    html: `
      <p class="cp-lead">Bit by bit, the younger nationalists lost patience with the Moderates. <u>The result was the Surat Split of 1907, when the Congress broke into two parts.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/38.png" alt="A tree trunk labelled Congress splitting into two branches labelled Moderates and Extremis" data-caption="At Surat in 1907, the Congress divided into Moderate and Extremist groups." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/39.png" alt="Bal Gangadhar Tilak portrait photo" data-caption="Bal Gangadhar Tilak, the leader of the Extremists, who was jailed for sedition." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Many leaders openly criticised the Congress. Tilak and other nationalists were charged with <b>treason</b> and put in jail. Under Lord Curzon, the Calcutta Municipal Act of 1899 and the Indian Universities Act of 1904 angered nationalists. Such events widened the gap between the two wings, and in 1907 the split came at Surat.</p>
      <table><thead><tr><th>Speaker</th><th>Remark</th></tr></thead><tbody><tr><td>Bankim Chandra Chatterjee</td><td>The Congress was "hungry for posts"</td></tr><tr><td>Sir Sayyid Ahmad Khan</td><td>It was "neither inspired nor planned by the people"</td></tr><tr><td>Ashwini Kumar Dutt</td><td>It was a "three-day spectacle"</td></tr><tr><td>Lord Dufferin</td><td>It represented "a minority whose number is minute"</td></tr><tr><td>Lord Curzon</td><td>It was "on its deathbed" and he wished to help it die peacefully</td></tr><tr><td>Bal Gangadhar Tilak</td><td>"If we croak like frogs once a year, we get nothing"</td></tr></tbody></table>
      <p class="cp-lead">The wings were re-united at the Lucknow session in 1916, nine years after the split.</p>
      <div class="cp-note trap">Do not mix the sessions: 1907 at Surat was a split, and 1916 at Lucknow was a reunion.</div>
      <div class="cp-note exam">Remember the speakers: Bankim, Sir Sayyid, Ashwini Dutt, Dufferin, Curzon and Tilak, in that order.</div>
    `
  },
  61: {
    questext: "Who said that if we croak like frogs once a year, we get nothing, while criticising the style of the Moderate Congress?",
    options: ["Lala Lajpat Rai", "Bal Gangadhar Tilak", "Bipin Chandra Pal", "Aurobindo Ghose"],
    correct: "2",
    exptext: "✅ Bal Gangadhar Tilak criticised the yearly meetings of the Congress in this way. 📌 Frogs croak once a year, like annual Congress sessions. ❌ Lala Lajpat Rai is tempting because he also criticised the Moderates, but this line is Tilak's."
  },
  62: {
    questext: "Which Congress leader described the Congress as 'hungry for posts'?",
    options: ["Bankim Chandra Chatterjee", "Ashwini Kumar Dutt", "Sir Sayyid Ahmad Khan", "Lord Curzon"],
    correct: "1",
    exptext: "✅ Bankim Chandra Chatterjee made this remark about the Congress. 📌 Bankim means hungry for posts. ❌ Ashwini Kumar Dutt is tempting, but he called it a three-day spectacle."
  },
  63: {
    questext: "Which Viceroy said that the Congress was 'on its deathbed' and that he wished to help it die peacefully?",
    options: ["Lord Dufferin", "Lord Ripon", "Lord Curzon", "Lord Lytton"],
    correct: "3",
    exptext: "✅ Lord Curzon hoped the Congress would die peacefully. 📌 Curzon was the harshest critic. ❌ Dufferin is tempting, but he called it a minority whose number is minute."
  },
  64: {
    questext: "Consider the following statements:\n1. The Surat Split of 1907 divided the Congress into Moderates and Extremists.\n2. The two wings of the Congress were reunited at the Lucknow session of 1916.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Split in 1907, reunion in 1916. ❌ Choosing only one is tempting if the two dates are confused."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an elegant gold-lined tricolour flag, an old brass lamp, and a rolled parchment scroll with a quill" },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Revolt of 1857 Delhi siege illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/1.png. an old illustration of the Revolt of 1857",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/2.png": { t: "fig", about: "Four small boxes labelled Land, History, Culture, Political goals, each with an arrow into one large box labelled Nationalism." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/3.png": { t: "fig", about: "Three boxes in a row labelled Unification, Contact with the West, Western education, each with an arrow into one box labelled National awakening." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Storming of the Bastille French Revolution painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/4.png. a painting of the French Revolution",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bankim Chandra Chatterjee portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/5.png. a portrait of the Bengali novelist",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Swami Vivekananda 1893 Chicago photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/6.png. a portrait of Swami Vivekananda",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/7.png": { t: "fig", about: "Simple row of icons labelled Books, Newspapers, Reformers, with arrows leading to a box labelled All-India feeling." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Delhi Durbar 1877 Lytton Queen Victoria Empress illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/8.png. an illustration of the grand Delhi Durbar",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Queen Victoria Proclamation 1858 Allahabad durbar illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/9.png. an illustration of the 1858 proclamation",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/10.png": { t: "fig", about: "Arrows going from India to Britain labelled Raw materials, and arrows going from Britain to India labelled Finished goods." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Ripon Viceroy of India portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/11.png. a portrait of Lord Ripon",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/12.png": { t: "fig", about: "Simple timeline with three boxes: 1861 Law: Indian judge can try a European only at district level, 1883 Ilbert Bill: equal powers, then Amendment and compromise." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dadabhai Naoroji portrait photo Grand Old Man of India\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/13.png. a portrait of Dadabhai Naoroji",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Surendranath Banerjee portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/14.png. a portrait of Surendranath Banerjee",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/15.png": { t: "fig", about: "Horizontal timeline with dots labelled 1836, 1838, 1851, 1866, 1870, 1876, 1884, 1885." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gokuldas Tejpal Sanskrit College Bombay first Congress session 1885\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/16.png. a photo of the hall of the first session",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Allan Octavian Hume portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/17.png. a portrait of A. O. Hume",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Womesh Chunder Bonnerjee portrait photo first Congress president\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/18.png. a portrait of W. C. Bonnerjee",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/19.png": { t: "fig", about: "Five labelled boxes around a centre labelled Congress: Democratic all-India movement, Educate the people, Friendly workers, Anti-colonial ideology, National unity." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/20.png": { t: "fig", about: "A circle diagram of three steps labelled Every December, Different region each time, President from another region." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/21.png": { t: "fig", about: "Two side-by-side pictures: a steam kettle with a valve labelled Safety valve, and a house with a rod labelled Lightning conductor." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Dufferin Viceroy of India portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/22.png. a portrait of Lord Dufferin",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Badruddin Tyabji portrait photo first Muslim Congress president\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/23.png. a portrait of Badruddin Tyabji",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Annie Besant portrait photo Congress president 1917\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/24.png. a portrait of Annie Besant",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sarojini Naidu portrait photo Congress president 1925\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/25.png. a portrait of Sarojini Naidu",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/26.png": { t: "fig", about: "Three stacked boxes labelled Prayers, Petitions, Protests with a small label 3 P politics beside them." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gopal Krishna Gokhale portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/27.png. a portrait of Gopal Krishna Gokhale",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/28.png": { t: "fig", about: "Three columns labelled Constitutional, Administrative, Economic, each with two or three short bullet words below." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Council chamber British India legislative council 1890s photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/29.png. a photo of an old legislative council hall",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dinshaw Wacha Justice Ranade R C Dutt portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/30.png. portraits of Indian economic nationalists",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/31.png": { t: "fig", about: "Three boxes in a row labelled Indian Reform Committee 1887, British Committee of India 1889, Journal India, with arrows leading to Delegations to England." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/32.png": { t: "fig", about: "A large arrow from a box labelled India to a box labelled England, with small labels Salaries, Savings, Pensions, Army payments on the arrow." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dadabhai Naoroji Poverty and Un-British Rule in India book cover\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/33.png. the cover of Naoroji's book",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/34.png": { t: "fig", about: "A staircase with four steps labelled National awakening, Democratic ideas, Drain exposed, Councils expanded." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian Councils Act 1892 legislative council meeting photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/35.png. a photo of an early legislative council",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/36.png": { t: "fig", about: "A bar chart with one tall bar labelled Lawyers 39.32 percent and several short bars labelled other groups." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lala Lajpat Rai portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/37.png. a portrait of Lala Lajpat Rai",
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/38.png": { t: "fig", about: "A tree trunk labelled Congress splitting into two branches labelled Moderates and Extremists at the point marked Surat 1907." },
  "images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bal Gangadhar Tilak portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Rise_of_Indian_Nationalism/39.png. a portrait of Bal Gangadhar Tilak"
});

/* CHANGE LOG
   - Poona Sarvajanik Sabha year corrected to 1870 (the source gave 1867).
   - London Indian Society year corrected to 1865 (the source gave 1866).
   - Bombay Association founder written as Jagannath Shankarseth with Dadabhai Naoroji as a leading member; the Bengal British India Society founders written generally.
   - Calcutta Municipal Act is dated 1899 and the Indian Universities Act 1904; both are Curzon's measures that angered nationalists, and they are not listed as achievements of the Moderates.
   - Presidents added for sessions with blanks: 1890 Pherozeshah Mehta, 1916 Ambika Charan Majumdar; the 1893 session place added as Lahore; the Welby Commission dated 1895.
   - Placed the Simultaneous Examinations resolution of the House of Commons in 1893.
*/