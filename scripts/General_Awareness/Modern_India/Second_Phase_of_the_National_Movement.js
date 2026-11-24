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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Second_Phase_of_the_National_Movement · 15 concept pages (+ overview) · 41 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🔥", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "SECOND PHASE OF",
      line2: "NATIONAL MOVEMENT",
      line3: "1905 TO 1919",
      badge: "FULL CLASS",
      ribbon: "SWADESHI • SURAT • LUCKNOW",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Second Phase of National Movement | Swadeshi, Surat Split, Home Rule | SSC CGL",
      altTitles: ["Partition of Bengal to Lucknow Pact in One Class", "Extremists, Swadeshi and Home Rule Full Chapter"],
      description: "The Second Phase of the Indian National Movement is one of the most repeated chapters of Modern India. In this class we learn every fact slowly and clearly, from the rise of the Extremists and the Partition of Bengal to the Swadeshi Movement, the Surat Split, the Muslim League, the Morley-Minto Reforms, the Home Rule Leagues, the Lucknow Pact and the Montagu Declaration. Each part ends with exam style questions.\n\n📌 IN THIS CLASS\n✅ Moderates and Extremists\n✅ Partition of Bengal and Swadeshi\n✅ Surat Split and Morley-Minto Reforms\n✅ Home Rule and Lucknow Pact\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Background\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernIndia #History",
      tags: ["second phase national movement", "swadeshi movement 1905", "partition of bengal 1905", "surat split 1907", "morley minto reforms 1909", "home rule movement 1916", "lucknow pact 1916", "montagu declaration 1917", "ghadar party", "komagata maru", "muslim league 1906", "lal bal pal", "modern india history", "ssc cgl history", "delhi durbar 1911", "moderates vs extremists", "general awareness", "history for competitive exams", "ssc cgl 2026", "modern india one shot", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "Second Phase of the National"],
      hashtags: ["SSCCGL", "ModernIndia", "History"],
      thumbText: "SECOND PHASE OF NATIONAL MOVEMENT",
      pinnedComment: "📌 Solve all the questions and write your score below 👇",
      communityPost: "🔥 New class is live: Second Phase of the National Movement, from Swadeshi to the Lucknow Pact. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Moderates and Extremists\n00:00 Partition of Bengal\n00:00 Swadeshi Movement\n00:00 Delhi Durbars\n00:00 Muslim League\n00:00 Surat Split\n00:00 Morley-Minto Reforms\n00:00 World War I\n00:00 Revolutionaries\n00:00 Home Rule\n00:00 Lucknow Pact\n00:00 Montagu Declaration",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Second Phase of the Indian National Movement</u>, from 1905 to 1919. We learn how the Extremists rose, how Bengal was divided and how the movement grew stronger.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>15</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>41</b><span>Questions</span></div>
        <div class="cp-stat"><b>~71 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Moderates and Extremists</b><br>Why a bolder group rose in the Congress, what they believed and how they differed from the Moderates.</li>
        <li><b>Partition of Bengal and Swadeshi</b><br>How the division of Bengal in 1905 led to the first great mass movement.</li>
        <li><b>Durbars, Capital and Muslim League</b><br>The three Delhi Durbars, the shift of the capital, and the birth of the Muslim League.</li>
        <li><b>Surat Split and Morley-Minto Reforms</b><br>How the Congress broke in 1907 and what the reforms of 1909 gave.</li>
        <li><b>War, Revolutionaries and Home Rule</b><br>India during World War I, revolutionary groups abroad and the Home Rule Leagues.</li>
        <li><b>Lucknow Pact and Montagu Declaration</b><br>The pact of 1916 and the promise of 1917.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> dates, names and first facts of this chapter are asked again and again in Staff Selection Commission papers.</div>
    `
  },
  2: {
    type: "concept", icon: "🌱", accent: "#22c55e", pauseTimer: true,
    title: "Background: The Moderate Phase and the Extremist Phase",
    html: `
      <p class="cp-lead">The first twenty years of the Congress, from 1885 to 1905, are called the <b>Moderate Phase</b>. <u>From 1905 to 1919, a bolder group called the Extremists guided the Congress.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/1.png" alt="Two long boxes side by side: left box labelled Moderate Phase 1885 to 1905 with words Peti" data-caption="The Moderate Phase used petitions, and the Extremist Phase used mass movements." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/2.png" alt="Lal Bal Pal Lala Lajpat Rai Bal Gangadhar Tilak Bipin Chandra Pal photo" data-caption="Lala Lajpat Rai, Bal Gangadhar Tilak and Bipin Chandra Pal, the leaders known as Lal, Bal and Pal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Moderate politics stayed within <b>constitutional limits</b>. The Moderates used <b>petitions, prayers and memoranda</b>, which means written requests to the government. They complained only against "un-British" rule, which means rule that did not follow British ideas of justice, and they had full faith in the British Parliament. They did not wish to separate from the Empire.</p>
      <p class="cp-lead">A new, younger group began to criticise the old leaders. This group was called the <b>Extremists</b>. Their goal was <b>Swaraj</b>, to be won by self-reliant and independent methods. They had no faith in British goodwill, so petitions and memoranda were dropped for <b>mass movements</b>.</p>
      <table><thead><tr><th>Leader</th><th>Region</th></tr></thead><tbody><tr><td>Lala Lajpat Rai</td><td>Punjab</td></tr><tr><td>Bal Gangadhar Tilak</td><td>Maharashtra</td></tr><tr><td>Bipin Chandra Pal</td><td>Bengal</td></tr></tbody></table>
      <p class="cp-lead"><b>Aurobindo Ghose</b> was the leading Extremist thinker, and Tilak was the most outstanding representative of the school. The immediate cause of the rise of the Extremists was the <b>Partition of Bengal in 1905</b>.</p>
      <div class="cp-note trap">Lal-Bal-Pal means Lala Lajpat Rai, Bal Gangadhar Tilak and Bipin Chandra Pal. Aurobindo Ghose is a separate thinker and is not part of this trio.</div>
      <div class="cp-note exam">Moderate Phase is 1885 to 1905. Extremist Phase is 1905 to 1919. The immediate cause of the Extremist rise was the Partition of Bengal.</div>
    `
  },
  3: {
    questext: "Which of the following leaders of the Lal-Bal-Pal trio belonged to Bengal?",
    options: ["Lala Lajpat Rai", "Bal Gangadhar Tilak", "Aurobindo Ghose", "Bipin Chandra Pal"],
    correct: "4",
    exptext: "✅ Bipin Chandra Pal belonged to Bengal. 📌 Lal is Punjab, Bal is Maharashtra and Pal is Bengal. ❌ Aurobindo Ghose is tempting because he was also from Bengal, but he is not part of the trio."
  },
  4: {
    questext: "What was the immediate cause of the rise of the Extremist school in the Congress?",
    options: ["The Indian Councils Act of 1892", "The Ilbert Bill of 1883", "The Calcutta Corporation Act of 1899", "The Partition of Bengal in 1905"],
    correct: "4",
    exptext: "✅ The Partition of Bengal in 1905 was the immediate cause. 📌 Other events built up anger over years, but Partition was the final spark. ❌ The Calcutta Corporation Act is tempting, but it was only one of the earlier causes."
  },
  5: {
    type: "concept", icon: "🔥", accent: "#f59e0b", pauseTimer: true,
    title: "Factors Behind the Rise of the Extremists",
    html: `
      <p class="cp-lead">Many disappointments and new ideas together made the Extremists strong. <u>Anger at British policy, pride in Indian culture and news from other countries all played a part.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/3.png" alt="Aurobindo Ghose young portrait photo" data-caption="Aurobindo Ghose, who attacked the Moderate leadership in his articles." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/4.png" alt="Battle of Tsushima Japanese fleet Russo-Japanese War painting" data-caption="Japan defeated Russia in 1905, which broke the myth of European strength." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Disappointment with British laws.</b> The Indian Councils Act of 1892 was a complete disappointment. The <b>Calcutta Corporation Act of 1899</b> cut the number of Indian members from 75 to 50. The <b>Indian Universities Act of 1904</b> gave the government official control over universities. Together with the <b>Partition of Bengal in 1905</b>, these were the high point of Lord Curzon's anti-people policies.</p>
      <p class="cp-lead"><b>New ideas and events abroad.</b> Reform movements such as the Arya Samaj and Swami Vivekananda gave Indians pride and self-respect. Aurobindo Ghose wrote an article called <b>New Lamps for Old</b> in the journal Indu Prakash, which attacked the Moderate leadership. Events in Egypt, Persia, Turkey and Russia inspired Indians. Japan rose after 1868, Ethiopia defeated Italy in 1895 and 1896, and Japan defeated Russia in 1904 and 1905, so the myth of European invincibility was broken.</p>
      <table><thead><tr><th>Cause</th><th>Effect</th></tr></thead><tbody><tr><td>Famine of 1896 to 1897 and plague in the Bombay Presidency</td><td>Relief machinery was inadequate</td></tr><tr><td>Extremist school already present</td><td>Raj Narain Bose, Ashwini Kumar Dutt, Aurobindo Ghose and Bipin Chandra Pal in Bengal; Vishnu Shastri Chiplunkar and Tilak in Maharashtra; Lala Lajpat Rai in Punjab</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix the acts. The Calcutta Corporation Act of 1899 cut the number of Indian members from 75 to 50, and the Indian Universities Act of 1904 controlled universities.</div>
      <div class="cp-note exam">New Lamps for Old was written by Aurobindo Ghose in the journal Indu Prakash.</div>
    `
  },
  6: {
    questext: "Who wrote the article 'New Lamps for Old' in the journal Indu Prakash, attacking the Moderate leadership?",
    options: ["Bipin Chandra Pal", "Aurobindo Ghose", "Lala Lajpat Rai", "Bal Gangadhar Tilak"],
    correct: "2",
    exptext: "✅ Aurobindo Ghose wrote New Lamps for Old. 📌 Old lamps meant the Moderate leaders, and new lamps meant fresh nationalist leaders. ❌ Tilak is tempting because he led the Extremists, but the article was written by Aurobindo."
  },
  7: {
    questext: "The Calcutta Corporation Act of 1899 reduced the number of Indian members from 75 to what?",
    options: ["25", "40", "50", "60"],
    correct: "3",
    exptext: "✅ The number of Indian members fell from 75 to 50. 📌 Think 75 to 50, a cut of one third. ❌ 60 is tempting because it looks like a small cut, but the actual figure was 50."
  },
  8: {
    questext: "Which of the following events inspired Indians because an Asian country defeated a European power?",
    options: ["The defeat of Russia by Japan in 1905", "The defeat of Italy by Ethiopia in 1896", "The Revolt in Egypt in 1882", "The rise of Turkey in 1908"],
    correct: "1",
    exptext: "✅ Japan defeated Russia in 1904 and 1905, which proved that an Asian country could defeat a European power. 📌 Asian win, European loss. ❌ Ethiopia defeating Italy is tempting, but Ethiopia is in Africa, not Asia."
  },
  9: {
    type: "concept", icon: "🎭", accent: "#ef4444", pauseTimer: true,
    title: "Ideology and Methods of the Extremists",
    html: `
      <p class="cp-lead">The Extremists wanted to build self-respect through <b>pride in Indian culture</b>. <u>Their methods were bold and based on the strength of the masses.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/5.png" alt="Ganesh Chaturthi festival Pune procession old photo" data-caption="The Ganesh festival, which Tilak made a public celebration in 1893." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/6.png" alt="Five labelled boxes in a row: Boycott, Swadeshi, National education, Non-cooperation, Dhar" data-caption="The Extremists used five main methods of protest." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Cultural pride.</b> Bankim Chandra Chatterjee, Vivekananda, Aurobindo Ghose and Tilak revived the Vedic past, Ashoka, Chandragupta, Rana Pratap, Shivaji and Rani Laxmibai. Aurobindo said that his country was not a piece of earth but a mighty Shakti. <b>Tilak</b> made the Ganpati festival popular in 1893 and began Shivaji Jayanti in 1895.</p>
      <p class="cp-lead"><b>Methods.</b> The Extremists used boycott, Swadeshi, national education, non-cooperation, <b>dharna</b> (sitting in protest), demonstrations and the violation of unjust laws. They called Moderate methods "political beggary" and Western idealisation "cultural capitulation".</p>
      <table><thead><tr><th>Leader</th><th>Famous remark</th></tr></thead><tbody><tr><td>Bipin Chandra Pal</td><td>The government offers "political lollipops"</td></tr><tr><td>Lala Lajpat Rai</td><td>Begging for rights is different from claiming them</td></tr><tr><td>Bal Gangadhar Tilak</td><td>"Swaraj is my birth right, and I will have it"</td></tr></tbody></table>
      <p class="cp-lead"><b>National education.</b> Sir Gurudas Banerjee formed the <b>Bengal National Education Council</b> under the National Education Plan. The DAV movement in Punjab spread alongside it.</p>
      <p class="cp-lead"><b>Achievements.</b> The Extremists spread new ideas and built agitation on past glory. They made the country act as a whole, and coined <b>Bharat Mata</b> and <b>Swaraj</b>. The Swadeshi Movement was the <b>first mass movement</b> led by nationalists, and <b>women</b> took active part.</p>
      <p class="cp-lead"><b>Limitations.</b> Ganesh Utsav and Shivaji Jayanti bred factionalism and communalism, which distanced Muslims.</p>
      <div class="cp-note trap">Ganpati festival began in 1893 and Shivaji Jayanti in 1895. Both were started by Tilak, and both later raised communal concerns.</div>
      <div class="cp-note exam">Remember the quotes: "political lollipops" is Bipin Chandra Pal and "Swaraj is my birth right" is Tilak.</div>
    `
  },
  10: {
    questext: "Which leader started the Ganpati festival in 1893 and the Shivaji Jayanti in 1895 as public celebrations?",
    options: ["Bipin Chandra Pal", "Lala Lajpat Rai", "Aurobindo Ghose", "Bal Gangadhar Tilak"],
    correct: "4",
    exptext: "✅ Bal Gangadhar Tilak made both festivals public to awaken national pride. 📌 Ganpati 1893, Shivaji 1895, both by Tilak. ❌ Aurobindo Ghose is tempting because he spoke about cultural pride, but he did not start these festivals."
  },
  11: {
    questext: "The phrase 'political lollipops' for the reforms offered by the British is linked with which leader?",
    options: ["Lala Lajpat Rai", "Bipin Chandra Pal", "Gopal Krishna Gokhale", "Dadabhai Naoroji"],
    correct: "2",
    exptext: "✅ Bipin Chandra Pal used this phrase for small reforms. 📌 Pal gave lollipops, Rai spoke of claiming rights. ❌ Lala Lajpat Rai is tempting, but his famous remark was about begging for rights versus claiming them."
  },
  12: {
    questext: "Consider the following statements:\n1. The Swadeshi Movement was the first mass movement led by nationalists, and women took an active part in it.\n2. The use of Ganesh Utsav and Shivaji Jayanti for public pride had no effect on relations with Muslims.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Mass movement with women is a success, but religious symbols were a limit. ❌ Statement 2 is wrong because these festivals bred communalism and distanced Muslims."
  },
  13: {
    type: "concept", icon: "⚖️", accent: "#8b5cf6", pauseTimer: true,
    title: "Moderates versus Extremists",
    html: `
      <p class="cp-lead">The two groups had the same final aim of a free India, but they were very different in thinking. <u>The table below shows exactly how they differed.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/7.png" alt="Two columns with a balance in the middle; left column header Moderates with the words Peti" data-caption="The Moderates and the Extremists compared on method and goal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/8.png" alt="Gopal Krishna Gokhale and Bal Gangadhar Tilak portrait photo" data-caption="Gopal Krishna Gokhale, a Moderate, and Bal Gangadhar Tilak, an Extremist." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Moderates</th><th>Extremists</th></tr></thead><tbody><tr><td>Social base</td><td>Zamindars and upper middle classes in towns</td><td>Educated and lower middle classes in towns</td></tr><tr><td>Inspiration</td><td>Western liberal thought and European history</td><td>Indian history, cultural heritage and Hindu traditional symbols</td></tr><tr><td>Goal and method</td><td>Constitutional reforms and a larger share in services, by constitutional methods only</td><td>Swaraj, which Tilak called a birth right, and a new India through self-reliance</td></tr><tr><td>The Crown</td><td>Loyal to the Crown; the movement was limited to the middle-class intelligentsia, and the masses were not ready</td><td>The Crown was unworthy of loyalty; they had immense faith in the masses' capacity to sacrifice</td></tr><tr><td>Providential mission</td><td>They firmly believed that the British connection served India's social, political and cultural interests</td><td>It was an illusion that would only continue exploitation</td></tr></tbody></table>
      <p class="cp-lead">In simple words, the Moderates believed that British rule was good for India with some faults that could be corrected. The Extremists believed that British rule was harmful and that only self-reliance would free India.</p>
      <div class="cp-note trap">Both groups wanted a better India. The Moderates sought reforms by constitutional methods, while the Extremists wanted Swaraj through mass action.</div>
      <div class="cp-note exam">Providential mission means the belief that Britain came to India for its good. Moderates accepted it and Extremists rejected it as an illusion.</div>
    `
  },
  14: {
    questext: "Which of the following was a source of inspiration for the Extremists?",
    options: ["Western liberal thought", "European history", "Indian history and cultural heritage", "British parliamentary practice"],
    correct: "3",
    exptext: "✅ The Extremists drew inspiration from Indian history and cultural heritage. 📌 Extremists looked at their own past, Moderates at the West. ❌ Western liberal thought is tempting, but it inspired the Moderates."
  },
  15: {
    questext: "Consider the following statements:\n1. The Moderates had faith in the British providential mission.\n2. The Extremists believed that the providential mission was an illusion.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Moderates believed and Extremists rejected the idea. ❌ Choosing only one is tempting because it is easy to forget which group held which view."
  },
  16: {
    type: "concept", icon: "🗺️", accent: "#14b8a6", pauseTimer: true,
    title: "Partition of Bengal (1905)",
    html: `
      <p class="cp-lead">In 1905 Lord Curzon divided Bengal into two parts. <u>The main reason was religion, although the official reason was administration.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/9.png" alt="Lord Curzon Viceroy of India portrait" data-caption="Lord Curzon, the Viceroy who partitioned Bengal in 1905." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/10.png" alt="Simple schematic, not a map: two boxes labelled East Bengal and Assam with capital Dhaka a" data-caption="A schematic of Bengal divided into East Bengal and West Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Lord Curzon</b> partitioned Bengal mainly along <b>religious lines</b>. <b>East Bengal</b> was Muslim-majority, and its capital was Dhaka. It also included Bengali-speaking districts of Assam such as Sylhet. <b>West Bengal</b> had Calcutta as its capital and received Darjeeling.</p>
      <p class="cp-lead">The <b>official reason</b> was that Bengal was too large to be governed by one man from one centre, which Curzon called <b>administrative convenience</b>. The <b>real reason</b> was to destroy the growing nationalist spirit through communal division, in line with <b>Divide and Rule</b>. The British hoped to please Muslims, build a Muslim bloc against Hindus and weaken the Congress.</p>
      <table><thead><tr><th>Date</th><th>Event</th></tr></thead><tbody><tr><td>July 1905</td><td>Partition announced (19 or 20 July)</td></tr><tr><td>7 August 1905</td><td>Calcutta Town Hall meeting, boycott resolution passed and Swadeshi declared</td></tr><tr><td>16 October 1905</td><td>Partition implemented; observed as a Day of Mourning with fasts, Vande Mataram and Rakhi tied for unity</td></tr><tr><td>1905</td><td>Benares session of the Congress endorsed Swadeshi and Boycott</td></tr><tr><td>1911</td><td>Partition annulled, announced at the Delhi Durbar</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix three dates: announced in July 1905, boycott resolution on 7 August 1905, and implemented on 16 October 1905.</div>
      <div class="cp-note exam">Curzon's official reason was administrative convenience. The real reason was to weaken nationalism through religious division.</div>
    `
  },
  17: {
    questext: "The Partition of Bengal was implemented on which date?",
    options: ["20 July 1905", "7 August 1905", "30 December 1906", "16 October 1905"],
    correct: "4",
    exptext: "✅ Partition took effect on 16 October 1905 and was observed as a Day of Mourning. 📌 July is the announcement, August is the boycott, October is the action. ❌ 7 August is tempting, but that was the boycott resolution."
  },
  18: {
    questext: "What was the capital of East Bengal after the Partition of 1905?",
    options: ["Dhaka", "Calcutta", "Darjeeling", "Sylhet"],
    correct: "1",
    exptext: "✅ Dhaka became the capital of the new East Bengal. 📌 Dhaka for the Muslim-majority east, Calcutta for the west. ❌ Calcutta is tempting because it was the old capital, but it stayed with West Bengal."
  },
  19: {
    questext: "Consider the following statements about the Partition of Bengal:\n1. The official reason given by Curzon was administrative convenience.\n2. The Partition was annulled at the Delhi Durbar of 1911.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Reason in 1905, reversal in 1911. ❌ Choosing only one is tempting, but both facts are standard."
  },
  20: {
    type: "concept", icon: "🔥", accent: "#f97316", pauseTimer: true,
    title: "The Swadeshi Movement (1905)",
    html: `
      <p class="cp-lead">The Swadeshi Movement began as a protest against the Partition of Bengal. <u>It became the first great mass movement of the nationalists.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/11.png" alt="Swadeshi movement bonfire of foreign cloth Bengal 1905 illustration" data-caption="A bonfire of foreign cloth during the Swadeshi Movement in Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/12.png" alt="Rabindranath Tagore Rakhi Bandhan Swadeshi Bengal partition 1905" data-caption="Rabindranath Tagore, who proposed the Rakhi-Bandhan programme for Hindu and Muslim unity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/13.png" alt="A timeline with boxes labelled 7 August 1905 Boycott resolution, 16 October 1905 General s" data-caption="The Swadeshi Movement moved from the boycott resolution to the annulment of Partition." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">On <b>7 August 1905</b>, at the Calcutta Town Hall, Aurobindo Ghose rejected constitutional agitation and a <b>boycott resolution</b> was passed. From 1905 to 1906, the protest remained in Bengal. In 1906 to 1907, it came under the Extremists <b>Bipin Chandra Pal and Aurobindo Ghose</b>, and it became a full mass political struggle. On <b>16 October 1905</b>, the first Bengal-wide general strike was held, and <b>Vande Mataram</b> was adopted as the national song.</p>
      <p class="cp-lead">Methods included picketing, bonfires of foreign goods, jailed volunteers and expelled students. The boycott spread to <b>schools, courts, titles and government jobs</b>. <b>Rabindranath Tagore</b> proposed the <b>Rakhi-Bandhan</b> programme for Hindu and Muslim unity.</p>
      <table><thead><tr><th>Leaders</th><th>Region</th></tr></thead><tbody><tr><td>Tilak</td><td>Bombay and Pune</td></tr><tr><td>Ajit Singh and Lala Lajpat Rai</td><td>Punjab and United Provinces</td></tr><tr><td>Syed Haider Raza</td><td>Delhi</td></tr><tr><td>Chidambaram Pillai, Subrahmanya Iyer, P. Anand Chalu, T. M. Nayak</td><td>Madras Presidency</td></tr></tbody></table>
      <p class="cp-lead"><b>Valentine Chirol</b> called Tilak the <b>Father of Indian Unrest</b>. <b>Abanindranath Tagore</b> broke Western dominance over Indian art, using Mughal art, indigenous traditions and Ajanta paintings. The science of <b>Jagadish Chandra Bose</b> and <b>P. C. Roy</b> strengthened the movement. Gandhi said in 1908 that the real awakening came after the Partition of Bengal.</p>
      <p class="cp-lead"><b>Impact:</b> it was the first movement of national consciousness after the Congress was formed, and the <b>only successful one</b>, because the partition was <b>annulled in 1911</b>. It had extensive student participation, brought workers in through <b>industrial strikes</b>, and boosted indigenous industry, banks and literature.</p>
      <div class="cp-note trap">Valentine Chirol gave Tilak the title Father of Indian Unrest. Do not give this title to Lajpat Rai or Aurobindo.</div>
      <div class="cp-note exam">The Swadeshi Movement began on 7 August 1905 at the Calcutta Town Hall, and Vande Mataram became the national song on 16 October 1905.</div>
    `
  },
  21: {
    questext: "Who proposed the Rakhi-Bandhan programme during the Swadeshi Movement to promote Hindu-Muslim unity?",
    options: ["Surendranath Banerjee", "Rabindranath Tagore", "Aurobindo Ghose", "Bipin Chandra Pal"],
    correct: "2",
    exptext: "✅ Rabindranath Tagore proposed the Rakhi-Bandhan programme. 📌 Tagore tied rakhis to tie hearts. ❌ Surendranath Banerjee is tempting because he led the Bengal protest, but Rakhi-Bandhan was Tagore's idea."
  },
  22: {
    questext: "Which of the following called Tilak the 'Father of Indian Unrest'?",
    options: ["Lord Curzon", "Lord Minto", "Valentine Chirol", "William Wedderburn"],
    correct: "3",
    exptext: "✅ Valentine Chirol, a British journalist, gave Tilak this title. 📌 Chirol and the Father of Indian Unrest go together. ❌ Lord Curzon is tempting because he opposed nationalists, but the title was given by Chirol."
  },
  23: {
    questext: "Which of the following was a result of the Swadeshi Movement?",
    options: ["The Partition of Bengal was annulled", "The Rowlatt Act was repealed", "India became independent", "The Lucknow Pact was signed"],
    correct: "1",
    exptext: "✅ The Partition of Bengal was annulled in 1911, which made Swadeshi the only successful movement of its time. 📌 Swadeshi won back Bengal. ❌ The Lucknow Pact is tempting, but it was a separate event of 1916."
  },
  24: {
    type: "concept", icon: "🏰", accent: "#84cc16", pauseTimer: true,
    title: "The Delhi Durbars and the Transfer of the Capital",
    html: `
      <p class="cp-lead">A durbar is a grand royal gathering. <u>Three Delhi Durbars were held, and the third one announced two big changes.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/14.png" alt="Delhi Durbar 1911 King George V Queen Mary photo" data-caption="The Delhi Durbar of 1911, where the capital shift was announced." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/15.png" alt="Three boxes in a row labelled 1877 Lytton, 1903 Curzon, 1911 Hardinge, with a short fact u" data-caption="The three Delhi Durbars of 1877, 1903 and 1911." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Durbar</th><th>Key facts</th></tr></thead><tbody><tr><td>First, 1 January 1877</td><td>Viceroy Lord Lytton; Queen Victoria was proclaimed Empress of India with the title Kaiser-i-Hind; severe famine in South India</td></tr><tr><td>Second, 1903</td><td>Curzon; held for the succession of Edward VII and Alexandra; Edward was absent and his brother, the Duke of Connaught, represented him; Bengal famine</td></tr><tr><td>Third, 12 December 1911</td><td>Lord Hardinge; coronation of King George V and Queen Mary; announced the annulment of the Partition of Bengal and the shift of the capital from Calcutta to Delhi</td></tr></tbody></table>
      <p class="cp-lead">After 1911, <b>Orissa and Bihar</b> were separated from Bengal, and <b>Sylhet</b> was merged with Assam as a separate province.</p>
      <p class="cp-lead"><b>Capital shift.</b> Calcutta was the capital from 1772 to 21 December 1912, and Delhi became the capital from 22 December 1912. The reasons were geographic, political, historical and practical.</p>
      <table><thead><tr><th>Reason</th><th>Meaning</th></tr></thead><tbody><tr><td>Geographic</td><td>Delhi is more central than Calcutta, though this reason was weak</td></tr><tr><td>Political</td><td>Calcutta had become hostile after the partition</td></tr><tr><td>Historical</td><td>To please Muslims, since Delhi was the old Muslim capital and the British saw themselves as Mughal successors</td></tr><tr><td>Practical</td><td>Delhi is near Shimla</td></tr></tbody></table>
      <p class="cp-lead"><b>Delhi Conspiracy Case.</b> On 23 December 1912, a bomb was thrown at Viceroy Lord Hardinge in Chandni Chowk. Basant Biswas, Amir Chand, Awadh Bihari and Bal Mukund worked under <b>Rasbihari Bose</b> and <b>Sachin Sanyal</b>, and all four were hanged.</p>
      <div class="cp-note trap">The announcement was on 12 December 1911, the transfer on 22 December 1912, and the bomb on 23 December 1912. Do not mix these three dates.</div>
      <div class="cp-note exam">Lytton 1877 Kaiser-i-Hind, Curzon 1903 Edward VII, Hardinge 1911 George V.</div>
    `
  },
  25: {
    questext: "At which Delhi Durbar was the annulment of the Partition of Bengal announced?",
    options: ["The Durbar of 1877", "The Durbar of 1903", "The Durbar of 1905", "The Durbar of 1911"],
    correct: "4",
    exptext: "✅ The Durbar of 12 December 1911, held under Lord Hardinge for King George V, announced it. 📌 Hardinge and George V, 1911. ❌ The Durbar of 1903 is tempting because Curzon was the partitioner, but it was a durbar for Edward VII."
  },
  26: {
    questext: "Queen Victoria was proclaimed Empress of India with the title 'Kaiser-i-Hind' at which event?",
    options: ["Durbar of 1877 under Lytton", "Durbar of 1903 under Curzon", "Durbar of 1911 under Hardinge", "Partition of Bengal"],
    correct: "1",
    exptext: "✅ The first Durbar of 1 January 1877 under Lord Lytton proclaimed her Empress. 📌 First Durbar, first Empress, Lytton. ❌ The Durbar of 1903 is tempting, but it was for Edward VII."
  },
  27: {
    questext: "The bomb attack on Viceroy Lord Hardinge in the Delhi Conspiracy Case took place at which place?",
    options: ["Lal Chowk", "Chandni Chowk", "Connaught Place", "Red Fort"],
    correct: "2",
    exptext: "✅ The bomb was thrown at Chandni Chowk on 23 December 1912. 📌 Chandni Chowk, 23 December, one day after the capital became Delhi. ❌ The Red Fort is tempting because of its link with Delhi, but the attack was on Chandni Chowk."
  },
  28: {
    type: "concept", icon: "🕌", accent: "#06b6d4", pauseTimer: true,
    title: "The Muslim League (1906)",
    html: `
      <p class="cp-lead">The All India Muslim League was founded in 1906. <u>Its leaders asked for the protection of Muslim political rights under British rule.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/16.png" alt="Aga Khan III portrait photo first president Muslim League" data-caption="The Aga Khan, the first president of the All India Muslim League." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/17.png" alt="A timeline with boxes labelled October 1906 Simla deputation, 30 December 1906 Muslim Leag" data-caption="The Simla deputation led to the founding of the Muslim League." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">In 1906, a Muslim delegation under the <b>Aga Khan</b> met Viceroy <b>Lord Minto</b> at Simla. This was the <b>Simla deputation</b>. It complained about low Muslim representation in jobs and the army. Lord Curzon had earlier encouraged <b>Nawab Salimullah of Dhaka</b> to support the partition.</p>
      <p class="cp-lead">The <b>All India Muslim League</b> was founded on <b>30 December 1906</b> at Dhaka. Its founders were the Aga Khan, Nawab Salimullah of Dhaka and Mohsin-ul-Mulk. The Aga Khan was the first president, and Nawab Salimullah was the founder who hosted it.</p>
      <table><thead><tr><th>Aim of the League</th><th>Meaning</th></tr></thead><tbody><tr><td>Support for the British Government</td><td>Loyalty to British rule</td></tr><tr><td>Protect political rights</td><td>Guard Muslim interests</td></tr><tr><td>Friendly relations</td><td>Cordial ties with other communities</td></tr></tbody></table>
      <p class="cp-lead">Some nationalist Muslims opposed the separatist direction of the League. They formed the <b>Ahrar Movement</b>, led by Maulana Mohammad Ali, Hakim Ajmal Khan, Maulana Zafar Ali Khan, Hasan Imam and Mazharul Haq.</p>
      <div class="cp-note trap">Founder and first president are different: Nawab Salimullah of Dhaka was the founder, and the Aga Khan was the first president.</div>
      <div class="cp-note exam">The first annual session of the League was at Karachi in December 1907, presided over by Adamjee Peerbhoy.</div>
    `
  },
  29: {
    questext: "Where and when was the All India Muslim League founded?",
    options: ["Lucknow, 1916", "Karachi, 1907", "Dhaka, 30 December 1906", "Simla, 1906"],
    correct: "3",
    exptext: "✅ The League was founded at Dhaka on 30 December 1906. 📌 Dhaka and the last days of 1906. ❌ Simla is tempting because the deputation met there, but the League itself began at Dhaka."
  },
  30: {
    questext: "Who was the first president of the All India Muslim League?",
    options: ["Nawab Salimullah of Dhaka", "Mohsin-ul-Mulk", "Muhammad Ali Jinnah", "The Aga Khan"],
    correct: "4",
    exptext: "✅ The Aga Khan was the first president. 📌 Salimullah founded, Aga Khan led. ❌ Nawab Salimullah is tempting because he is called the founder, but he was not the first president."
  },
  31: {
    type: "concept", icon: "🗳️", accent: "#a855f7", pauseTimer: true,
    title: "Calcutta Session (1906) and the Surat Split (1907)",
    html: `
      <p class="cp-lead">The Congress broke into two groups at Surat in 1907. <u>The break was the result of a long fight over how far the movement should go.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/18.png" alt="Dadabhai Naoroji Calcutta Congress 1906 president photo" data-caption="Dadabhai Naoroji, who presided over the Calcutta session of 1906 and used the word Swaraj." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/19.png" alt="Branching tree: one trunk labelled Banaras 1905, Calcutta 1906, then splitting into two br" data-caption="The Congress split into two groups after the Banaras and Calcutta sessions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Calcutta 1906.</b> The dispute over the president was settled by electing <b>Dadabhai Naoroji</b>, who demanded <b>Swaraj</b>, though its meaning was left undefined. Four resolutions, backed by the Extremists, were passed: <b>Swadeshi, Boycott, National Education and Self-Government</b>.</p>
      <p class="cp-lead"><b>Differences surfaced</b> at the Banaras session of December 1905, presided over by <b>Gopal Krishna Gokhale</b>. The issues were whether to extend Boycott and Swadeshi beyond Bengal, who should preside in 1906 (Tilak or Lajpat Rai for the Extremists, and Naoroji for the Moderates), and the reception of the Prince of Wales in 1905, which Extremists opposed and Moderates favoured.</p>
      <p class="cp-lead"><b>Surat 1907.</b> The Extremists wanted the session at Nagpur, but the Moderates wanted Surat, Tilak's home province, so that he could be excluded by convention. <b>Rash Behari Ghosh</b> was the president, and the resolutions on Swadeshi, Boycott and National Education were dropped.</p>
      <table><thead><tr><th>Repressive law</th><th>Year</th></tr></thead><tbody><tr><td>Seditious Meetings Act</td><td>1907</td></tr><tr><td>Indian Newspapers (Incitement to Offences) Act</td><td>1908</td></tr><tr><td>Criminal Law Amendment Act</td><td>1908</td></tr><tr><td>Indian Press Act</td><td>1910</td></tr><tr><td>Prevention of Seditious Meetings Act</td><td>1911</td></tr></tbody></table>
      <p class="cp-lead">Lala Lajpat Rai and Ajit Singh were arrested in 1907. <b>1908 was called the Black Year.</b> Tilak got <b>six years in Mandalay</b>, Burma, B. C. Pal retired, Lajpat Rai left for the United States, and Aurobindo Ghose was tried in the <b>Alipore Conspiracy Case</b>. The Congress stayed Moderate-dominated from 1908 to 1915, and the vacuum bred revolutionary movements. Tilak was released in 1914.</p>
      <table><thead><tr><th>Revolutionary event</th><th>Key facts</th></tr></thead><tbody><tr><td>Muzaffarpur bomb</td><td>30 April 1908; Khudiram Bose and Prafulla Chaki</td></tr><tr><td>Khudiram Bose</td><td>Hanged on 11 August 1908</td></tr><tr><td>Aurobindo Ghose</td><td>Defended by C. R. Das</td></tr></tbody></table>
      <div class="cp-note trap">Banaras 1905 was presided over by Gokhale, Calcutta 1906 by Naoroji and Surat 1907 by Rash Behari Ghosh. Do not mix these three presidents.</div>
      <div class="cp-note exam">Calcutta 1906 gave four resolutions: Swadeshi, Boycott, National Education and Self-Government.</div>
    `
  },
  32: {
    questext: "Who presided over the Banaras session of the Congress in December 1905?",
    options: ["Dadabhai Naoroji", "Rash Behari Ghosh", "Gopal Krishna Gokhale", "Bal Gangadhar Tilak"],
    correct: "3",
    exptext: "✅ Gopal Krishna Gokhale presided over the Banaras session of 1905. 📌 Gokhale at Banaras, Naoroji at Calcutta, Ghosh at Surat. ❌ Naoroji is tempting, but he presided at Calcutta in 1906."
  },
  33: {
    questext: "Which of the following was NOT one of the four resolutions passed at the Calcutta session of 1906?",
    options: ["Swadeshi", "Boycott", "National Education", "Separate Electorates"],
    correct: "4",
    exptext: "✅ Separate Electorates was not among the four. 📌 The four are Swadeshi, Boycott, National Education and Self-Government. ❌ Boycott is tempting as a wrong choice, but it was actually passed."
  },
  34: {
    questext: "Who was sentenced to six years of imprisonment in Mandalay in 1908, the 'Black Year'?",
    options: ["Lala Lajpat Rai", "Bal Gangadhar Tilak", "Bipin Chandra Pal", "Aurobindo Ghose"],
    correct: "2",
    exptext: "✅ Bal Gangadhar Tilak got six years in Mandalay in 1908. 📌 Black Year, six years, Tilak. ❌ Aurobindo Ghose is tempting because he was also tried in 1908, but he was tried in the Alipore Conspiracy Case."
  },
  35: {
    questext: "Consider the following statements about the Surat session of 1907:\n1. Rash Behari Ghosh presided over the Surat session.\n2. The Extremists wanted the session to be held at Surat, and the Moderates wanted Nagpur.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Extremists wanted Nagpur, but Moderates chose Surat, Tilak's home province. ❌ Statement 2 is wrong because the places are reversed."
  },
  36: {
    type: "concept", icon: "📘", accent: "#e11d48", pauseTimer: true,
    title: "Morley-Minto Reforms (Indian Councils Act, 1909)",
    html: `
      <p class="cp-lead">The Indian Councils Act of 1909 is also called the Morley-Minto Reforms. <u>It gave a little representation, but it also planted the seeds of communal division.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/20.png" alt="John Morley Secretary of State for India portrait" data-caption="Lord Morley, the Secretary of State for India during the 1909 reforms." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/21.png" alt="Satyendra Prasanna Sinha portrait photo Lord Sinha" data-caption="Satyendra Prasanna Sinha, the first Indian member of the Viceroy's Executive Council." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The reforms were prepared by Viceroy <b>Lord Minto</b> and Secretary of State <b>Lord Morley</b> to reform the Indian Councils. They fell far short of <b>representative government</b>.</p>
      <table><thead><tr><th>Feature</th><th>Details</th></tr></thead><tbody><tr><td>Separate Electorates</td><td>Introduced for Muslims, which meant that Muslims voted only for Muslim candidates; this planted the seeds of Hindu-Muslim division</td></tr><tr><td>Executive Council</td><td>Satyendra Prasanna Sinha became the first Indian member of the Viceroy's Executive Council as Law Member in 1909</td></tr><tr><td>Congress reaction</td><td>The Congress denounced the separate electorates at its Lahore session in 1909</td></tr></tbody></table>
      <p class="cp-lead">Muslim League leaders welcomed the separate electorates, but the Congress rejected them. Separate electorates were first demanded at Amritsar in 1908 and granted by Morley-Minto in 1909.</p>
      <div class="cp-note trap">Morley was the Secretary of State and Minto was the Viceroy. Do not swap these two. Hardinge was the Viceroy of 1911.</div>
      <div class="cp-note exam">Separate electorates: demanded at Amritsar 1908, granted 1909, denounced by the Congress at Lahore 1909.</div>
    `
  },
  37: {
    questext: "Which feature of the Morley-Minto Reforms of 1909 is seen as the root of communal politics in India?",
    options: ["Separate electorates for Muslims", "Indirect election", "Right to discuss the budget", "Appointment of an Indian Law Member"],
    correct: "1",
    exptext: "✅ Separate electorates for Muslims divided voters on religious lines. 📌 Separate electorates, separate politics. ❌ Appointing an Indian Law Member is tempting, but it was a reform, not a cause of division."
  },
  38: {
    questext: "Who became the first Indian member of the Viceroy's Executive Council in 1909?",
    options: ["Satyendra Prasanna Sinha", "Gopal Krishna Gokhale", "Dadabhai Naoroji", "Surendranath Banerjee"],
    correct: "1",
    exptext: "✅ Satyendra Prasanna Sinha became the Law Member in 1909. 📌 Sinha means Law Member, first Indian. ❌ Gokhale is tempting because he was a prominent councillor, but he was not on the Executive Council."
  },
  39: {
    questext: "In the Morley-Minto Reforms, who held which post?",
    options: ["Morley was the Viceroy and Minto was the Secretary of State", "Morley was the Secretary of State and Minto was the Viceroy", "Both were Viceroys", "Both were Secretaries of State"],
    correct: "2",
    exptext: "✅ Morley was the Secretary of State and Minto was the Viceroy. 📌 Think of Morley as the minister in London and Minto as the Viceroy in India. ❌ The reversed pairing is tempting because the two names are easy to swap."
  },
  40: {
    type: "concept", icon: "🌍", accent: "#10b981", pauseTimer: true,
    title: "World War I and Its Impact (1914–1919)",
    html: `
      <p class="cp-lead">World War I changed India in many ways. <u>The war drained India's wealth, but it also helped new industries and new political unity.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/22.png" alt="Two opposing groups of boxes: left Allied Powers Britain, Russia, Italy, France, Japan; ri" data-caption="The two sides of World War I: the Allied Powers and the Central Powers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/23.png" alt="Indian soldiers World War I Western Front photo" data-caption="Indian soldiers fought for Britain on the Western Front in World War I." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The war was fought between the <b>Allied Powers</b> (Britain, Russia, Italy, France and Japan) and the <b>Central Powers</b> (Germany, Austria, Hungary and Turkey). India's manpower, money and resources were fully used.</p>
      <p class="cp-lead">Except the revolutionary groups, most sections, <b>including Gandhi</b>, supported Britain in the hope of getting concessions after the war. This hope was dashed.</p>
      <table><thead><tr><th>Effect</th><th>Details</th></tr></thead><tbody><tr><td>Economic</td><td>Defence spending and taxes rose, imports fell short and prices were high</td></tr><tr><td>Industrial</td><td>Modern Indian industries emerged during the war</td></tr><tr><td>Labour</td><td>The trade union movement began in 1917 to 1918</td></tr><tr><td>Political</td><td>The myth of Western military superiority was weakened</td></tr><tr><td>Turkey</td><td>Turkey's defeat threatened the Ottoman Empire and its Sultan, called the Caliph</td></tr></tbody></table>
      <p class="cp-lead">Indian Muslims opposed the harm to the Caliph, and the Congress backed the League in this stand. This brought about the <b>Lucknow Pact of 1916</b>, and the two cooperated until 1922.</p>
      <div class="cp-note trap">Gandhi supported Britain in World War I, in the hope of reward after the war. Do not call him a war opponent.</div>
      <div class="cp-note exam">Remember the birth of the trade union movement (1917 to 1918) and of modern industries during the war.</div>
    `
  },
  41: {
    questext: "Which of the following was a result of World War I in India?",
    options: ["The decline of trade unions", "The rise of modern Indian industries", "A fall in prices", "A fall in taxes"],
    correct: "2",
    exptext: "✅ Modern Indian industries emerged as imports ran short. 📌 War gaps in imports gave Indian factories a chance. ❌ A fall in prices is tempting, but prices were high during the war."
  },
  42: {
    questext: "Which of the following were Central Powers in World War I?",
    options: ["Britain and France", "Russia and Japan", "Germany and Turkey", "Italy and France"],
    correct: "3",
    exptext: "✅ Germany, Austria, Hungary and Turkey were the Central Powers. 📌 Central means Germany at the centre. ❌ Russia and Japan are tempting, but they were Allied Powers."
  },
  43: {
    type: "concept", icon: "🛡️", accent: "#eab308", pauseTimer: true,
    title: "Revolutionaries during the War",
    html: `
      <p class="cp-lead">Some Indian revolutionaries tried to use the war to free India. <u>They looked for economic and military help from Britain's enemies, Germany and Turkey.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/24.png" alt="Ghadar Party San Francisco Yugantar Ashram Lala Hardayal photo" data-caption="Members of the Ghadar Party, founded in the United States in 1913." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/25.png" alt="Komagata Maru ship Vancouver 1914 photo" data-caption="The Komagata Maru ship at Vancouver in 1914 with Indian passengers on board." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/26.png" alt="Two boxes: Berlin with Indian Independence Committee under Lala Hardayal and Virendranath " data-caption="The two centres of revolutionary work abroad: Berlin and Kabul." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Berlin</b> was an important centre. Virendranath Chattopadhyaya worked there from 1909, and <b>Lala Hardayal</b> formed the <b>Indian Independence Committee</b> in Berlin. In December 1915, a <b>provisional government at Kabul</b> was formed in Afghanistan, with <b>Mahendra Pratap</b> as president and <b>Maulana Barkatullah</b> as Prime Minister.</p>
      <p class="cp-lead">The <b>Ghadar Party</b> was set up on <b>1 November 1913</b> at San Francisco in the United States by Lala Hardayal. Other leaders were Ramchandra, Barkatullah, Ramdas Puri, Sohan Singh Bhakna, Kartar Singh Sarabha, Bhai Parmanand and Bhagwan Singh. Its weekly paper <b>Ghadar</b> was first published in Urdu on 1 November 1913. Its members were mainly Punjabi farmers and ex-servicemen in Canada and America, who used <b>guerrilla techniques</b>.</p>
      <p class="cp-lead"><b>Komagata Maru, 1914.</b> Canada barred Indians who did not arrive directly from India. <b>Gurdit Singh</b> chartered the Japanese ship Komagata Maru with about <b>376 passengers</b> from South-East Asia to Vancouver, but re-entry was barred. The ship was ordered to Calcutta, and clashes there killed about <b>18 passengers</b>; the rest were jailed.</p>
      <table><thead><tr><th>Group</th><th>Role</th></tr></thead><tbody><tr><td>Shore Committee</td><td>Husain Rahim, Balwant Singh and Sohan Lal Pathak raised funds for a legal battle</td></tr><tr><td>Overseas supporters</td><td>Bhagwan Singh, Barkatullah, Ramchandra and Sohan Singh in America</td></tr></tbody></table>
      <div class="cp-note trap">In the Kabul government, Mahendra Pratap was president and Barkatullah was Prime Minister. Do not swap them.</div>
      <div class="cp-note exam">Ghadar Party: 1 November 1913, San Francisco, Lala Hardayal. Komagata Maru: 1914, Gurdit Singh, 376 passengers.</div>
    `
  },
  44: {
    questext: "Where and when was the Ghadar Party founded?",
    options: ["Berlin, 1914", "Kabul, 1915", "Vancouver, 1914", "San Francisco, 1 November 1913"],
    correct: "4",
    exptext: "✅ The Ghadar Party was set up at San Francisco on 1 November 1913. 📌 Ghadar means revolt, born in the United States. ❌ Berlin is tempting because Indian revolutionaries worked there, but the Ghadar Party was American."
  },
  45: {
    questext: "Who chartered the Japanese ship Komagata Maru in 1914 to take Indians to Vancouver?",
    options: ["Gurdit Singh", "Sohan Singh Bhakna", "Lala Hardayal", "Kartar Singh Sarabha"],
    correct: "1",
    exptext: "✅ Gurdit Singh chartered the ship, which carried about 376 passengers. 📌 Gurdit Singh and the ship go together. ❌ Sohan Singh Bhakna is tempting because he led the Ghadar Party, but he did not charter the ship."
  },
  46: {
    questext: "Who was the President of the Provisional Government of India set up at Kabul in December 1915?",
    options: ["Maulana Barkatullah", "Lala Hardayal", "Raja Mahendra Pratap", "Rasbihari Bose"],
    correct: "3",
    exptext: "✅ Raja Mahendra Pratap was the President. 📌 Pratap as President, Barkatullah as Prime Minister. ❌ Barkatullah is tempting because he was in the government, but as Prime Minister."
  },
  47: {
    type: "concept", icon: "🏠", accent: "#0ea5e9", pauseTimer: true,
    title: "Home Rule Movement (1916)",
    html: `
      <p class="cp-lead">The Home Rule Movement demanded self-rule within the British Empire. <u>Tilak and Annie Besant each set up a separate League in 1916.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/27.png" alt="Annie Besant Home Rule League portrait photo" data-caption="Annie Besant, who started the Home Rule League at Madras in September 1916." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/28.png" alt="Bal Gangadhar Tilak Home Rule League 1916 photo" data-caption="Bal Gangadhar Tilak, who started the Home Rule League in April 1916." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/29.png" alt="Two columns: Tilak's League April 1916 with six branches, and Besant's League September 19" data-caption="The two Home Rule Leagues compared by month and number of branches." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The aim was <b>self-rule within the British Empire</b>, inspired by the <b>Irish Home Rule Movement</b> of Redmond. Tilak, released in 1914, and Annie Besant failed to compromise at the 1915 Lahore session, so they set up <b>two separate Leagues</b>.</p>
      <table><thead><tr><th>Point</th><th>Tilak's League</th><th>Besant's League</th></tr></thead><tbody><tr><td>Date</td><td>April 1916</td><td>September 1916</td></tr><tr><td>Place</td><td>Launched at Poona</td><td>Madras, at Adyar, on 3 September 1916</td></tr><tr><td>Area</td><td>Maharashtra (excluding Bombay city), Karnataka, Central Provinces and Berar</td><td>Rest of India, including Bombay city</td></tr><tr><td>Branches</td><td>6, tightly organised</td><td>200, loosely organised</td></tr><tr><td>Demands</td><td>Swaraj, linguistic states, education in vernacular languages</td><td>Organising secretary George Arundale, with B. W. Wadia and C. P. Ramaswamy Aiyer</td></tr></tbody></table>
      <p class="cp-lead">The slogan "<b>Swaraj is my birth right, and I will have it</b>" was given at the April 1916 Belgaum conference. Many joined, such as Motilal Nehru, Jawaharlal Nehru, Bhulabhai Desai, Chittaranjan Das, Madan Mohan Malaviya, Mohammad Ali Jinnah, Tej Bahadur Sapru and Lala Lajpat Rai. Anglo-Indians, most Muslims and non-Brahmins of the South stayed away, fearing upper-caste rule.</p>
      <p class="cp-lead"><b>Government response.</b> Tilak's case was rescinded by the High Court, but he was barred from Punjab and Delhi. In June 1917, Annie Besant, B. P. Wadia and George Arundale were arrested, and Sir S. Subramania Aiyer renounced his knighthood. <b>Achievements:</b> a new generation of militant nationalists, the Montagu Manifesto of August 1917, the Moderate-Extremist compromise at Lucknow in 1916, and the first local committees for an all-India movement.</p>
      <div class="cp-note trap">Tilak's League came first (April 1916), then Besant's (September 1916). Tilak's was smaller with 6 branches and Besant's was larger with 200.</div>
      <div class="cp-note exam">Besant's papers were New India (daily) and Commonweal (weekly). Tilak's were Maratha (English) and Kesari (Marathi).</div>
    `
  },
  48: {
    questext: "The Home Rule League of Annie Besant was launched in which city in September 1916?",
    options: ["Poona", "Madras", "Calcutta", "Lahore"],
    correct: "2",
    exptext: "✅ It was launched at Madras, at Adyar, on 3 September 1916. 📌 Besant at Adyar, Madras. ❌ Poona is tempting because it was the base of Tilak's League."
  },
  49: {
    questext: "Which of the following is correct about the Home Rule Leagues?",
    options: ["Tilak's League had 200 branches", "Besant's League had 200 branches", "Both Leagues had 6 branches", "Both Leagues were launched in 1914"],
    correct: "2",
    exptext: "✅ Besant's League had about 200 branches, while Tilak's had 6. 📌 Besant's loose and wide, Tilak's tight and small. ❌ Giving Tilak 200 branches is tempting because the two numbers are easy to swap."
  },
  50: {
    questext: "The slogan 'Swaraj is my birth right, and I will have it' was raised by Tilak at which conference?",
    options: ["Lahore, 1915", "Lucknow, December 1916", "Surat, 1907", "Belgaum, April 1916"],
    correct: "4",
    exptext: "✅ Tilak gave the slogan at the Belgaum conference in April 1916. 📌 Belgaum and April 1916 for the slogan. ❌ Lucknow is tempting because it was an important 1916 session, but the slogan was earlier."
  },
  51: {
    type: "concept", icon: "🤝", accent: "#d946ef", pauseTimer: true,
    title: "Lucknow Pact (1916)",
    html: `
      <p class="cp-lead">In 1916 the Congress and the Muslim League met together at Lucknow and made a pact. <u>It was the high point of Hindu-Muslim cooperation in this period.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/30.png" alt="Muhammad Ali Jinnah young portrait photo Lucknow 1916" data-caption="Muhammad Ali Jinnah, who helped to bring the Congress and the Muslim League together in 1916." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/31.png" alt="Three boxes in a row labelled Congress Lucknow 1916, Muslim League Lucknow 1916, and Luckn" data-caption="Both the Congress and the League met at Lucknow in 1916 and signed a pact." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Ambika Charan Majumdar</b> presided over the 1916 Congress session at Lucknow. This was the first joint session after <b>nine years</b>, so the Extremists expelled at Surat were readmitted.</p>
      <p class="cp-lead">The <b>Muslim League</b> met at Lucknow at the same time. This brought the <b>League-Congress Pact, also called the Lucknow Pact of 1916</b>. The initiative came from <b>Jinnah, Tilak and Mrs Besant</b>. The Congress accepted the demand for a <b>separate communal electorate</b>, which <b>Madan Mohan Malaviya</b> opposed.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Congress session</td><td>Lucknow, 1916, president A. C. Majumdar</td></tr><tr><td>League session</td><td>Lucknow, 1916, president Jinnah</td></tr><tr><td>Result</td><td>Moderate and Extremist wings reunited; League and Congress cooperated</td></tr><tr><td>Cost</td><td>Congress accepted separate electorates</td></tr></tbody></table>
      <p class="cp-lead">The closeness lasted until the suspension of <b>Non-Cooperation</b>. It was then dissolved. The <b>Khilafat issue</b> later brought the League close to the Congress again. The League's riots continued until the <b>Partition of India</b>.</p>
      <div class="cp-note trap">The Surat session of 1907 split the Congress, and the Lucknow session of 1916 reunited it. Do not reverse these.</div>
      <div class="cp-note exam">At Lucknow 1916, the League session was presided over by Jinnah, and Sarojini Naidu called him the Ambassador of Hindu-Muslim Unity.</div>
    `
  },
  52: {
    questext: "Who presided over the Lucknow session of the Congress in 1916?",
    options: ["Annie Besant", "Ambika Charan Majumdar", "Dadabhai Naoroji", "Rash Behari Ghosh"],
    correct: "2",
    exptext: "✅ Ambika Charan Majumdar presided at Lucknow in 1916. 📌 Majumdar at Lucknow, Besant at Calcutta 1917. ❌ Annie Besant is tempting because she led the Home Rule League, but she presided in 1917."
  },
  53: {
    questext: "Which of the following was accepted by the Congress in the Lucknow Pact of 1916?",
    options: ["A separate communal electorate for Muslims", "A joint electorate", "Complete independence", "A boycott of councils"],
    correct: "1",
    exptext: "✅ The Congress accepted a separate electorate for Muslims. 📌 The price of unity was separate electorates. ❌ A joint electorate is tempting because many people hope for it, but it was not accepted."
  },
  54: {
    questext: "Which of the following leaders opposed the separate electorates accepted in the Lucknow Pact?",
    options: ["Mohammad Ali Jinnah", "Bal Gangadhar Tilak", "Annie Besant", "Madan Mohan Malaviya"],
    correct: "4",
    exptext: "✅ Madan Mohan Malaviya opposed the separate electorate. 📌 Malaviya said no to a communal divide. ❌ Tilak is tempting, but he supported the Pact."
  },
  55: {
    type: "concept", icon: "📜", accent: "#3b82f6", pauseTimer: true,
    title: "Montagu (August) Declaration, 1917",
    html: `
      <p class="cp-lead">In August 1917 the British promised self-governing institutions in India. <u>It was called the Magna Carta of India, but its real result fell short.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/32.png" alt="Edwin Montagu Secretary of State for India portrait" data-caption="Edwin Montagu, the Secretary of State for India who made the August Declaration of 1917." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/33.png" alt="Three boxes in a row: Montagu Declaration August 1917, Montagu-Chelmsford Reforms, Governm" data-caption="The Declaration of 1917 led to the Government of India Act of 1919." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Prime Minister <b>David Lloyd George</b> appointed <b>Edwin Montagu</b> as Secretary of State for India. His resolution in the British Parliament in <b>1917</b> promised the gradual development of free institutions with a view to ultimate self-government. It was hailed as the <b>Magna Carta of India</b>.</p>
      <p class="cp-lead">It was the basis of the <b>Government of India Act, 1919</b>, also called the Montagu-Chelmsford Reforms. This Act was guided by British interests. Its <b>diarchy</b>, a system of dual government, fell short of self-government. <b>Separate electorates</b> were continued and extended. The Act failed to meet Britain's wartime promises.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Montagu Declaration</td><td>August 1917; called the Magna Carta of India</td></tr><tr><td>Government of India Act</td><td>1919; diarchy and extended separate electorates</td></tr><tr><td>Related events</td><td>Lucknow Pact 1916; Montagu Manifesto promised responsible government</td></tr></tbody></table>
      <div class="cp-note trap">The Montagu Declaration of August 1917 is not the same as the Government of India Act of 1919. The Declaration was the promise, and the Act was its result.</div>
      <div class="cp-note exam">Remember: Montagu Declaration 1917, Magna Carta of India, diarchy in 1919.</div>
    `
  },
  56: {
    questext: "The Montagu Declaration of 1917 is often called what?",
    options: ["The Charter Act of India", "The Lucknow Charter", "The Magna Carta of India", "The Declaration of Rights"],
    correct: "3",
    exptext: "✅ It is called the Magna Carta of India for promising self-governing institutions. 📌 Montagu equals Magna. ❌ The Charter Act is tempting because of its similar name, but it is unrelated."
  },
  57: {
    questext: "The Government of India Act of 1919 introduced which system?",
    options: ["Federation", "Diarchy", "Provincial autonomy", "Communal Award"],
    correct: "2",
    exptext: "✅ It introduced diarchy, a dual system in the provinces. 📌 1919 means diarchy. ❌ Provincial autonomy is tempting, but that came with the Act of 1935."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an elegant gold-lined spinning wheel, a burning torch, and a rolled parchment scroll with a quill" },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/1.png": { t: "fig", about: "Two long boxes side by side: left box labelled Moderate Phase 1885 to 1905 with words Petitions, Prayers, Memoranda; right box labelled Extremist Phase 1905 to 1919 with words Swaraj, Self-reliance, Mass movements." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lal Bal Pal Lala Lajpat Rai Bal Gangadhar Tilak Bipin Chandra Pal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/2.png. a group portrait of the three leaders",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aurobindo Ghose young portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/3.png. a portrait of Aurobindo Ghose",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Battle of Tsushima Japanese fleet Russo-Japanese War painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/4.png. a painting of the Russo-Japanese War",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ganesh Chaturthi festival Pune procession old photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/5.png. a photo of the Ganesh festival procession",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/6.png": { t: "fig", about: "Five labelled boxes in a row: Boycott, Swadeshi, National education, Non-cooperation, Dharna." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/7.png": { t: "fig", about: "Two columns with a balance in the middle; left column header Moderates with the words Petitions and Reforms, right column header Extremists with the words Swaraj and Self-reliance." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gopal Krishna Gokhale and Bal Gangadhar Tilak portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/8.png. portraits of a Moderate and an Extremist leader",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Curzon Viceroy of India portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/9.png. a portrait of Lord Curzon",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/10.png": { t: "fig", about: "Simple schematic, not a map: two boxes labelled East Bengal and Assam with capital Dhaka and West Bengal with capital Calcutta, with a line between them." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Swadeshi movement bonfire of foreign cloth Bengal 1905 illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/11.png. an illustration of foreign cloth being burnt",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rabindranath Tagore Rakhi Bandhan Swadeshi Bengal partition 1905\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/12.png. a photo of Rabindranath Tagore",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/13.png": { t: "fig", about: "A timeline with boxes labelled 7 August 1905 Boycott resolution, 16 October 1905 General strike, 1906 to 1907 Extremist leadership, 1911 Partition annulled." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Delhi Durbar 1911 King George V Queen Mary photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/14.png. a photo of the 1911 durbar",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/15.png": { t: "fig", about: "Three boxes in a row labelled 1877 Lytton, 1903 Curzon, 1911 Hardinge, with a short fact under each." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aga Khan III portrait photo first president Muslim League\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/16.png. a portrait of the Aga Khan",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/17.png": { t: "fig", about: "A timeline with boxes labelled October 1906 Simla deputation, 30 December 1906 Muslim League founded at Dhaka, December 1907 First session at Karachi." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dadabhai Naoroji Calcutta Congress 1906 president photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/18.png. a portrait of Dadabhai Naoroji",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/19.png": { t: "fig", about: "Branching tree: one trunk labelled Banaras 1905, Calcutta 1906, then splitting into two branches labelled Moderates and Extremists at Surat 1907." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"John Morley Secretary of State for India portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/20.png. a portrait of Lord Morley",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Satyendra Prasanna Sinha portrait photo Lord Sinha\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/21.png. a portrait of Satyendra Prasanna Sinha",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/22.png": { t: "fig", about: "Two opposing groups of boxes: left Allied Powers Britain, Russia, Italy, France, Japan; right Central Powers Germany, Austria, Hungary, Turkey." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian soldiers World War I Western Front photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/23.png. a photo of Indian soldiers in World War I",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ghadar Party San Francisco Yugantar Ashram Lala Hardayal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/24.png. a photo of the Ghadar Party members",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Komagata Maru ship Vancouver 1914 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/25.png. a photograph of the Komagata Maru ship",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/26.png": { t: "fig", about: "Two boxes: Berlin with Indian Independence Committee under Lala Hardayal and Virendranath Chattopadhyaya, Kabul with Provisional Government under Mahendra Pratap and Barkatullah." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Annie Besant Home Rule League portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/27.png. a portrait of Annie Besant",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bal Gangadhar Tilak Home Rule League 1916 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/28.png. a portrait of Bal Gangadhar Tilak",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/29.png": { t: "fig", about: "Two columns: Tilak's League April 1916 with six branches, and Besant's League September 1916 with two hundred branches." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Muhammad Ali Jinnah young portrait photo Lucknow 1916\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/30.png. a portrait of Jinnah in 1916",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/31.png": { t: "fig", about: "Three boxes in a row labelled Congress Lucknow 1916, Muslim League Lucknow 1916, and Lucknow Pact." },
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Edwin Montagu Secretary of State for India portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/32.png. a portrait of Edwin Montagu",
  "images/General_Awareness/Modern_India/Second_Phase_of_the_National_Movement/33.png": { t: "fig", about: "Three boxes in a row: Montagu Declaration August 1917, Montagu-Chelmsford Reforms, Government of India Act 1919 with the word Diarchy." }
});

/* CHANGE LOG
   - Partition announcement dated July 1905 (19 or 20 July); boycott resolution 7 August 1905; implemented 16 October 1905.
   - Kabul provisional government corrected: Raja Mahendra Pratap was president and Maulana Barkatullah was Prime Minister (the source swapped the posts).
   - Prime Minister who appointed Montagu corrected to David Lloyd George.
   - Ahrar Movement leader Nazrul Haq corrected to Mazharul Haq, and the movement is left undated.
   - Muslim League first president is the Aga Khan; Nawab Salimullah is described as the founder who hosted it.
   - Tilak's Home Rule League dated April 1916 and the Belgaum slogan placed in the same month.
*/