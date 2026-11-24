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

/* Field: General_Awareness · Subject: Modern_India · Chapter: Socio_Religious_Reform_Movements · 14 concept pages (+ overview) · 53 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🪔", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Socio-Religious Reform Movements",
    thumb: {
      image: "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "MODERN INDIA",
      line2: "REFORM MOVEMENTS",
      line3: "FOUNDERS • YEARS • LAWS",
      badge: "FULL CHAPTER",
      ribbon: "TABLES • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Socio-Religious Reform Movements | Modern India Complete Chapter",
      altTitles: ["Reform Movements Founders and Years in One Class", "Brahmo Samaj to Ambedkar: Modern India Reform Movements"],
      description: "Reform movements give you sure marks in General Awareness, but only if the founders, years and places are clear. In this class we cover the whole chapter in simple steps.\n\n📌 IN THIS CLASS\n✅ Brahmo Samaj, Prarthana Samaj, Arya Samaj, Ramakrishna Mission\n✅ Founder, year, place and journal table\n✅ Social reform laws with years\n✅ Anti-caste movements, Gandhi and Ambedkar\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#ModernIndia #ReformMovements #GeneralAwareness",
      tags: ["reform movements", "modern india history", "brahmo samaj", "raja ram mohan roy", "arya samaj", "prarthana samaj", "ramakrishna mission", "theosophical society", "jyotiba phule", "ambedkar", "poona pact", "social reform acts", "ssc cgl history", "ssc history", "railway history", "general awareness", "history tricks", "reform organisations table", "sir syed ahmad khan", "annie besant", "derozio young bengal", "temple entry", "indian history for exams", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "Socio Religious Reform Movem"],
      hashtags: ["ModernIndia", "ReformMovements", "GeneralAwareness"],
      thumbText: "REFORM MOVEMENTS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📚 New class is live: Socio-Religious Reform Movements. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Why Reform Movements Began\n00:00 Brahmo Samaj and Raja Ram Mohan Roy\n00:00 Young Bengal and Derozio\n00:00 Prarthana Samaj and Jyotiba Phule\n00:00 Reform Organisations\n00:00 Social Reform Legislation\n00:00 Arya Samaj\n00:00 Ramakrishna Mission\n00:00 Theosophical Society\n00:00 Sikh and Parsi Reform\n00:00 Anti-Caste Movements\n00:00 Gandhi and Ambedkar\n00:00 Islamic Reform",
      playlist: "Modern India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the social and religious reform movements of modern India</u>. Every year this chapter gives several sure marks in the General Awareness paper, so we will learn it slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>14</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>53</b><span>Questions</span></div>
        <div class="cp-stat"><b>~81 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Why Reform Movements Began</b><br>The harmful customs of the nineteenth century and why thinking Indians decided to change them.</li>
        <li><b>Brahmo Samaj and Raja Ram Mohan Roy</b><br>The first great reform movement, its founder, his work and how the Brahmo Samaj split.</li>
        <li><b>Young Bengal and Derozio</b><br>The bold student group that questioned old beliefs at Hindu College.</li>
        <li><b>Prarthana Samaj and Jyotiba Phule</b><br>Reform in western India and the first movement of the lower castes.</li>
        <li><b>Reform Organisations</b><br>A clear table of founders, years, places and journals that exams love to ask.</li>
        <li><b>Social Reform Legislation</b><br>The laws that ended sati and allowed widow remarriage, with their years.</li>
        <li><b>Arya Samaj, Ramakrishna Mission and Theosophical Society</b><br>Three movements that gave Hindu society new pride and new service.</li>
        <li><b>Sikh, Parsi and Islamic Reform</b><br>How reform reached other communities.</li>
        <li><b>Anti-Caste Movements, Gandhi and Ambedkar</b><br>The long fight against untouchability, from temple entry to the Poona Pact.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> founders, years, places, journals and laws from this chapter are asked again and again in the Staff Selection Commission, Railways and Banking exams, so these facts are easy marks once you learn them.</div>
    `
  },
  2: {
    type: "concept", icon: "🌅", accent: "#f59e0b", pauseTimer: true,
    title: "Why Reform Movements Began",
    html: `
      <p class="cp-lead">In the nineteenth century, many thinking Indians saw that their society was held back by harmful customs. <u>They decided to change these customs, and this effort is called the reform movement.</u></p>
      <p class="cp-lead">Western education brought new ideas such as liberty, reason and equality. When Indians compared these ideas with their own society, they found cruel practices that did not match them. Women suffered the most, because a husband's death could leave a widow with no rights at all.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/1.png" alt="Two-column picture. Left column titled Social Evils with items: Untouchability, Superstiti" data-caption="The main social evils and the problems faced by women in that age." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/2.png" alt="Sati practice 19th century India old painting" data-caption="An old painting about the practice of sati, which reformers worked to end." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Evil</th><th>What it meant</th></tr></thead><tbody><tr><td>Untouchability</td><td>Treating some castes as impure and keeping them apart</td></tr><tr><td>Purdah</td><td>Keeping women covered and away from public life</td></tr><tr><td>Polygamy</td><td>A man having more than one wife</td></tr><tr><td>Polytheism</td><td>Worship of many gods and many images</td></tr><tr><td>Sati</td><td>A widow being burned on her husband's funeral fire</td></tr></tbody></table>
      <div class="cp-note trap">Women's position fell because of polygamy, sati and the ban on widow remarriage. Do not mix these with the evils of the caste system, such as untouchability.</div>
      <div class="cp-note exam">Questions often ask which evil belongs to which group, so keep the two groups clear in your mind.</div>
    `
  },
  3: {
    questext: "Which of the following was a social evil that nineteenth century reformers opposed strongly?",
    options: ["Education for girls", "Widow remarriage", "Untouchability", "Freedom of the press"],
    correct: "3",
    exptext: "Untouchability was a social evil that reformers fought. Remember that education, remarriage and a free press were things reformers wanted, not things they opposed. A wrong option fails because it names a reform goal instead of an evil."
  },
  4: {
    questext: "Consider the following statements about the position of women in the nineteenth century:\n1. Sati and the ban on widow remarriage lowered the position of women.\n2. Reformers supported polygamy and purdah.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "Only statement 1 is correct, because sati and the ban on widow remarriage hurt women. Reformers opposed polygamy and purdah, so statement 2 is wrong. Remember that reformers fought every custom that kept women low."
  },
  5: {
    type: "concept", icon: "🌟", accent: "#3b82f6", pauseTimer: true,
    title: "Brahmo Samaj and Raja Ram Mohan Roy",
    html: `
      <p class="cp-lead">The <u>Brahmo Samaj</u> was the first great reform movement of modern India. Its founder, Raja Ram Mohan Roy, is called the Father of the Indian Renaissance and the Morning Star of reform.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/3.png" alt="Raja Ram Mohan Roy portrait statue Bristol photo" data-caption="Raja Ram Mohan Roy, founder of the Brahmo Samaj and a great social reformer." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/4.png" alt="Brahmo Samaj temple Kolkata photo" data-caption="A Brahmo Samaj prayer hall in Kolkata where followers worship one God." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/5.png" alt="Timeline of the Brahmo splits with five boxes: 1842 Debendranath joins, 1858 Keshub made A" data-caption="The Brahmo Samaj split step by step, from 1842 to 1878." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Brahmo Samaj believed in one God called Brahma, with no priest between God and the worshipper. It drew its ideas from reason and from the Vedas and Upanishads, and it also took Western ideas of liberty and equality. It opposed sati, polygamy, child marriage and female infanticide, and it supported widow remarriage and education for women.</p>
      <p class="cp-lead">Raja Ram Mohan Roy was born at Radhanagar in Hooghly and worked for the East India Company. He started the Atmiya Sabha in 1814, and the Brahmo Sabha first met on 20 August 1828. The Trust Deed of 1830 allowed no images and no animal sacrifice in its worship.</p>
      <table><thead><tr><th>Work</th><th>Detail</th></tr></thead><tbody><tr><td>Tuhfat-ul-Muwahhidin</td><td>A Persian book meaning Gift to Monotheists</td></tr><tr><td>Precepts of Jesus</td><td>Published in 1820</td></tr><tr><td>Samvad Kaumudi</td><td>Bengali newspaper of 1821</td></tr><tr><td>Mirat-ul-Akhbar</td><td>Persian newspaper of 1822</td></tr><tr><td>Anti-sati law</td><td>Regulation XVII of 4 December 1829 under Lord William Bentinck</td></tr></tbody></table>
      <p class="cp-lead">When the law of 1823 limited the press, Roy closed his Persian paper in protest. Akbar II, the Mughal emperor, gave him the title Raja and sent him to England, where he died at Bristol on 27 September 1833.</p>
      <div class="cp-note trap">Do not confuse the years. Brahmo Sabha 1828, Brahmo Samaj of India 1866 under Keshub Chandra Sen, Adi Brahmo Samaj 1866 under Debendranath Tagore, and Sadharana Brahmo Samaj 1878.</div>
      <div class="cp-note exam">The Brahmo Marriage Act of 1872 barred girls below 14 and boys below 18 from marriage and ended polygamy among Brahmos.</div>
      <div class="cp-mnemonic">Brahmo = One God, no priest, no images.</div>
    `
  },
  6: {
    questext: "Who started the Atmiya Sabha in Calcutta in 1814?",
    options: ["Debendranath Tagore", "Raja Ram Mohan Roy", "Keshub Chandra Sen", "Ishwar Chandra Vidyasagar"],
    correct: "2",
    exptext: "Raja Ram Mohan Roy began the Atmiya Sabha in 1814 to speak against idol worship. Remember that Roy came first, Debendranath next and Keshub after him. The other leaders worked later and are wrong."
  },
  7: {
    questext: "The Brahmo Sabha, which later became the Brahmo Samaj, first met in which year?",
    options: ["1814", "1828", "1866", "1878"],
    correct: "2",
    exptext: "The Brahmo Sabha first met on 20 August 1828. Remember 1828 for Roy's Brahmo Sabha and 1878 for the later Sadharana Brahmo Samaj. The year 1814 belongs to the Atmiya Sabha, so it is wrong."
  },
  8: {
    questext: "Consider the following statements about Raja Ram Mohan Roy:\n1. He wrote Tuhfat-ul-Muwahhidin in Persian.\n2. He died in Calcutta in 1833.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Both 1 and 2", "Neither 1 nor 2", "Only 1"],
    correct: "4",
    exptext: "Only statement 1 is correct, because Roy wrote Tuhfat-ul-Muwahhidin in Persian. He died at Bristol in England in 1833, not in Calcutta. Remember that Roy died abroad after being sent to England."
  },
  9: {
    questext: "Which Governor-General passed Regulation XVII of 1829 that made sati a crime?",
    options: ["Lord Dalhousie", "Lord Canning", "Lord William Bentinck", "Lord Hardinge"],
    correct: "3",
    exptext: "Lord William Bentinck passed the law on 4 December 1829 with strong help from Roy. Remember Bentinck for sati. Dalhousie and Canning are linked with other reforms, so they fail here."
  },
  10: {
    questext: "Under the Brahmo Marriage Act of 1872, what was the minimum age of marriage for girls?",
    options: ["12 years", "14 years", "16 years", "18 years"],
    correct: "2",
    exptext: "The Act of 1872 barred girls below 14 and boys below 18. Remember 14 and 18, with polygamy abolished. The figure 12 belongs to the Age of Consent Act of 1891, so it is wrong."
  },
  11: {
    questext: "The Sadharana Brahmo Samaj was formed in 1878 after which event?",
    options: ["Sati was banned", "Keshub Chandra Sen's minor daughter was married to the Maharaja of Cooch-Behar", "Roy died in England", "The Hindu College was founded"],
    correct: "2",
    exptext: "Keshub's thirteen year old daughter was married to the minor Maharaja of Cooch-Behar, against his own cause. Many followers left and formed the Sadharana Brahmo Samaj. Remember it as the split over the Cooch-Behar marriage."
  },
  12: {
    type: "concept", icon: "🔥", accent: "#ef4444", pauseTimer: true,
    title: "Young Bengal and Derozio",
    html: `
      <p class="cp-lead">Young Bengal was a group of bold students who followed the teacher <u>Henry Louis Vivian Derozio</u> at Hindu College in Calcutta. They asked questions about every old belief.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/6.png" alt="Henry Louis Vivian Derozio portrait Hindu College" data-caption="Henry Louis Vivian Derozio, teacher at Hindu College and first nationalist poet of modern India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/7.png" alt="Presidency College Kolkata building photo" data-caption="The Presidency College building, which grew out of the old Hindu College." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Derozio taught English literature and history at Hindu College from 1826. He is called the first nationalist poet of modern India, and one of his famous poems is To India – My Native Land. He was expelled for his daring ideas and died of cholera in 1831.</p>
      <p class="cp-lead">His students, called Derozians, asked for the revision of the Company's Charter, a free press and trial by jury. They also wanted Indians in government service, fair treatment of Indian labour abroad, women's rights and justice for farmers against landlords. The French Revolution inspired them.</p>
      <table><thead><tr><th>Derozian</th><th>Known as</th></tr></thead><tbody><tr><td>Ram Gopal Ghosh</td><td>Disciple of Derozio</td></tr><tr><td>Krishna Mohan Banerjee</td><td>Disciple of Derozio</td></tr><tr><td>Mahesh Chandra Ghosh</td><td>Disciple of Derozio</td></tr><tr><td>Dakshinaranjan Mukherjee</td><td>Disciple of Derozio</td></tr><tr><td>Surendranath Banerjee</td><td>Mentioned with them as pioneers of modern Bengal</td></tr></tbody></table>
      <div class="cp-note trap">Young Bengal began in 1826 at Hindu College, and Derozio died in 1831. Do not date it to the Brahmo Samaj years.</div>
    `
  },
  13: {
    questext: "Henry Louis Vivian Derozio taught at which college in Calcutta?",
    options: ["Fort William College", "Presidency College", "Hindu College", "Sanskrit College"],
    correct: "3",
    exptext: "Derozio taught at Hindu College from 1826. Remember Derozio with Hindu College and Young Bengal. Presidency College was only the later name of the same institution, which makes that option the tempting wrong one."
  },
  14: {
    questext: "Who is called the first nationalist poet of modern India?",
    options: ["Henry Louis Vivian Derozio", "Raja Ram Mohan Roy", "Bankim Chandra Chatterjee", "Rabindranath Tagore"],
    correct: "1",
    exptext: "Derozio is called the first nationalist poet of modern India. Remember his poem To India – My Native Land. Roy was a reformer and not a poet, so that option fails."
  },
  15: {
    type: "concept", icon: "🏛️", accent: "#10b981", pauseTimer: true,
    title: "Prarthana Samaj and Jyotiba Phule",
    html: `
      <p class="cp-lead">In western India, two reform streams grew side by side. The <u>Prarthana Samaj</u> worked for social reform in the upper castes, while <u>Jyotiba Phule</u> led a movement of the lower castes.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/8.png" alt="Jyotiba Phule portrait statue photo" data-caption="Jyotiba Phule, who led a movement against caste and for women's education." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/9.png" alt="Mahadev Govind Ranade portrait" data-caption="Mahadev Govind Ranade, the judge who guided the Prarthana Samaj." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Prarthana Samaj was founded in Bombay in 1867 by Atmaram Pandurang, after Keshub Chandra Sen visited Maharashtra. Justice Mahadev Govind Ranade joined it in 1870 and gave it an all-India character. It fought caste and child marriage, and it worked for women's education and widow remarriage, even setting up widow homes. Ranade wrote A Theist's Confession of Faith with 39 articles, and Dhondo Keshav Karve and Vishnu Shastri joined his widow remarriage movement.</p>
      <p class="cp-lead">Jyotiba Phule was born in 1828 in the Mali caste. He believed that there was no difference between Brahmins and untouchables, started schools, and opened an orphanage for the children of widows. He once met the Duke of Connaught in a simple loincloth to speak for the poor farmers. He also blamed the Indian National Congress for forgetting the weaker sections.</p>
      <table><thead><tr><th>Book or body</th><th>Year or detail</th></tr></thead><tbody><tr><td>Prarthana Samaj</td><td>Founded 1867 in Bombay</td></tr><tr><td>Gulamgiri</td><td>Book of 1872</td></tr><tr><td>Satya Shodhak Samaj</td><td>Founded 1873</td></tr><tr><td>Sarvajanik Satyadharma Pustak</td><td>Phule's book</td></tr><tr><td>Dharma Tritiya Ratna, Ishara, Life of Shivaji</td><td>Other works of Phule</td></tr></tbody></table>
      <div class="cp-note trap">Atmaram Pandurang founded both the Prarthana Samaj (1867) and the Paramahamsa Mandali (1849 to 1850). Do not give Ranade the credit for starting it, because he joined in 1870.</div>
      <div class="cp-note exam">Remember the order: Prarthana Samaj 1867, Gulamgiri 1872, Satya Shodhak Samaj 1873.</div>
    `
  },
  16: {
    questext: "Who founded the Prarthana Samaj in Bombay in 1867?",
    options: ["Mahadev Govind Ranade", "Dayanand Saraswati", "Vishnu Shastri", "Atmaram Pandurang"],
    correct: "4",
    exptext: "Atmaram Pandurang founded the Prarthana Samaj in 1867. Remember that Ranade joined it in 1870 and made it popular, which is why Ranade is the tempting wrong option."
  },
  17: {
    questext: "Which book was written by Jyotiba Phule in 1872?",
    options: ["Gulamgiri", "Satyarth Prakash", "Hesperus", "Tahzeeb-ul-Akhlaq"],
    correct: "1",
    exptext: "Gulamgiri was written by Phule in 1872 to speak for the lower castes. Remember Gulamgiri with Phule and Satyarth Prakash with Dayanand. The other books belong to Dayanand, Derozio and Syed Ahmad Khan."
  },
  18: {
    questext: "Consider the following statements about the Prarthana Samaj:\n1. It was founded in 1867 in Bombay.\n2. Justice Mahadev Govind Ranade was its founder.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Only 2", "Only 1", "Neither 1 nor 2"],
    correct: "3",
    exptext: "Only statement 1 is correct, as the Samaj began in 1867 in Bombay. Its founder was Atmaram Pandurang, and Ranade joined in 1870. Remember Ranade as the leader who made it famous, not the founder."
  },
  19: {
    questext: "The Satya Shodhak Samaj was founded in which year?",
    options: ["1867", "1875", "1873", "1885"],
    correct: "3",
    exptext: "Jyotiba Phule founded the Satya Shodhak Samaj in 1873. Remember Phule after Gulamgiri of 1872. The year 1867 belongs to the Prarthana Samaj and so is the tempting wrong option."
  },
  20: {
    type: "concept", icon: "📋", accent: "#0ea5e9", pauseTimer: true,
    title: "Reform Organisations — Bengal and Western India",
    html: `
      <p class="cp-lead">Each reform body can be remembered by four things: <u>founder, year, place and journal</u>. This table covers the bodies of Bengal, Bombay and nearby regions.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/10.png" alt="Simple map-style schematic, not a map: three boxes labelled Calcutta, Bombay, Madras, each" data-caption="Reform bodies grouped by the city where they began." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/11.png" alt="Hindu College Kolkata historic building photo" data-caption="The historic Hindu College building in Calcutta, one of the first modern colleges." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Organisation</th><th>Founder</th><th>Year</th><th>Place</th></tr></thead><tbody><tr><td>Atmiya Sabha</td><td>Raja Ram Mohan Roy</td><td>1814</td><td>Calcutta</td></tr><tr><td>Hindu College</td><td>David Hare, helped by Ram Mohan Roy</td><td>1817</td><td>Calcutta</td></tr><tr><td>Calcutta Unitarian Committee</td><td>Roy, Dwarkanath Tagore, William Adam</td><td>1823</td><td>Calcutta</td></tr><tr><td>Vedanta College</td><td>Raja Ram Mohan Roy</td><td>1825</td><td>Calcutta</td></tr><tr><td>Brahmo Sabha</td><td>Raja Ram Mohan Roy</td><td>1828</td><td>Calcutta</td></tr><tr><td>Academic Association</td><td>Henry Louis Vivian Derozio</td><td>1826</td><td>Calcutta</td></tr><tr><td>Tattvabodhini Sabha</td><td>Debendranath Tagore</td><td>1839</td><td>Calcutta</td></tr><tr><td>Bethune School</td><td>John Elliot Drinkwater Bethune, Ishwar Chandra Vidyasagar</td><td>1849</td><td>Calcutta</td></tr><tr><td>Paramahamsa Mandali</td><td>Atmaram Pandurang and others</td><td>1849 to 1850</td><td>Bombay</td></tr><tr><td>Widow Remarriage Society</td><td>Vishnu Parshuram Pandit</td><td>1850</td><td>Maharashtra</td></tr><tr><td>Rahnumai Mazdayasnan Sabha</td><td>Naoroji Furdonji, Dadabhai Naoroji</td><td>1851</td><td>Bombay</td></tr><tr><td>Brahmo Samaj of India</td><td>Keshub Chandra Sen</td><td>1866</td><td>Calcutta</td></tr><tr><td>Adi Brahmo Samaj</td><td>Debendranath Tagore</td><td>1866</td><td>Calcutta</td></tr><tr><td>Sadharana Brahmo Samaj</td><td>Anand Mohan Bose, Shivnath Shastri</td><td>1878</td><td>Calcutta</td></tr></tbody></table>
      <table><thead><tr><th>Journal</th><th>Linked body</th></tr></thead><tbody><tr><td>Samvad Kaumudi 1821 and Mirat-ul-Akhbar 1822</td><td>Raja Ram Mohan Roy</td></tr><tr><td>Tattvabodhini Patrika and Indian Mirror 1861</td><td>Tattvabodhini Sabha and Brahmo leaders</td></tr><tr><td>Hesperus and Calcutta Literary Gazette</td><td>Derozio</td></tr><tr><td>Rast Goftar</td><td>Parsi reform</td></tr><tr><td>Gulamgiri 1872</td><td>Satya Shodhak Samaj</td></tr></tbody></table>
      <div class="cp-note trap">Hindu College (1817) was founded by David Hare with Roy's support, and it later became Presidency College in 1855. Do not give the founding to Roy alone.</div>
      <div class="cp-note exam">Remember that the Brahmo Samaj of India and the Adi Brahmo Samaj both date from 1866.</div>
    `
  },
  21: {
    questext: "Who founded the Tattvabodhini Sabha in Calcutta in 1839?",
    options: ["Keshub Chandra Sen", "Raja Ram Mohan Roy", "Debendranath Tagore", "Henry Louis Vivian Derozio"],
    correct: "3",
    exptext: "Debendranath Tagore founded the Tattvabodhini Sabha in 1839. Remember him as the leader of the Adi Brahmo Samaj. Keshub is the tempting wrong option because he led the other Brahmo body."
  },
  22: {
    questext: "Which of the following was founded by Raja Ram Mohan Roy?",
    options: ["Tattvabodhini Sabha", "Atmiya Sabha", "Paramahamsa Mandali", "Widow Remarriage Society"],
    correct: "2",
    exptext: "Roy started the Atmiya Sabha in 1814. Remember Atmiya for Roy and Paramahamsa Mandali for Atmaram Pandurang. The other bodies were set up by different founders."
  },
  23: {
    questext: "The journal Rast Goftar was linked with the reform of which community?",
    options: ["Sikhs", "Parsis", "Muslims", "Brahmos"],
    correct: "2",
    exptext: "Rast Goftar was a Parsi journal of the Rahnumai Mazdayasnan Sabha, founded in 1851 to restore Zoroastrian religion. Remember Rast means truth, a Parsi word. Brahmos used different journals, so that option fails."
  },
  24: {
    questext: "Hindu College in Calcutta was established in 1817 by whom?",
    options: ["Henry Louis Vivian Derozio", "Raja Ram Mohan Roy alone", "Debendranath Tagore", "David Hare, with the support of Raja Ram Mohan Roy"],
    correct: "4",
    exptext: "David Hare, with Roy's help, founded Hindu College in 1817. Remember it as Asia's earliest modern college, which became Presidency College in 1855. Derozio only taught there, so he is wrong."
  },
  25: {
    type: "concept", icon: "🗂️", accent: "#8b5cf6", pauseTimer: true,
    title: "Reform Organisations — North India, South India and Others",
    html: `
      <p class="cp-lead">This table covers the Parsi, Sikh, Muslim, South Indian and anti-caste bodies. <u>Learn each body together with its leader and year.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/12.png" alt="Timeline strip with six labelled stops: 1864 Veda Samaj, 1873 Singh Sabha, 1875 Arya Samaj" data-caption="Important reform bodies placed in order of year, from 1864 to 1905." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/13.png" alt="Aligarh Muslim University Bab-e-Syed gate photo" data-caption="The old Aligarh college, started by Sir Syed Ahmad Khan for modern education." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/14.png" alt="Ramakrishna Mission Belur Math photo" data-caption="Belur Math near Calcutta, headquarters of the Ramakrishna Mission." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Organisation</th><th>Founder</th><th>Year</th><th>Place</th></tr></thead><tbody><tr><td>Veda Samaj</td><td>Kandukuri Sridharalu Naidu</td><td>1864</td><td>Madras</td></tr><tr><td>Scientific Society</td><td>Sir Syed Ahmad Khan</td><td>1864</td><td>Aligarh</td></tr><tr><td>Deoband Movement</td><td>Mohammad Qasim Nanotavi, Rashid Ahmad Gangohi</td><td>1866</td><td>Saharanpur</td></tr><tr><td>Singh Sabha</td><td>Thakur Singh Sandhawalia, Gyan Singh</td><td>1873</td><td>Amritsar</td></tr><tr><td>Arya Samaj</td><td>Dayanand Saraswati</td><td>1875</td><td>Bombay</td></tr><tr><td>Theosophical Society</td><td>Madame Helena Petrovna Blavatsky, Colonel Henry Steel Olcott</td><td>1875</td><td>New York</td></tr><tr><td>Aligarh school</td><td>Sir Syed Ahmad Khan</td><td>1875</td><td>Aligarh</td></tr><tr><td>Cow Protection Association</td><td>Arya Samaj</td><td>1882</td><td>North India</td></tr><tr><td>Deccan Education Society</td><td>Bal Gangadhar Tilak, Mahadev Ballal Namjoshi, Vishnushastri Chiplunkar</td><td>1884</td><td>Maharashtra</td></tr><tr><td>Dayanand Anglo-Vedic School</td><td>Lala Hansraj</td><td>1886</td><td>Lahore</td></tr><tr><td>Aruvipuram Shri Narayana Dharma Paripalana Yogam</td><td>Sri Narayana Guru</td><td>1888</td><td>Aruvipuram, Kerala</td></tr><tr><td>Ahmadiya Movement</td><td>Mirza Ghulam Ahmad</td><td>1889</td><td>Qadian</td></tr><tr><td>Ramakrishna Mission</td><td>Swami Vivekananda</td><td>1897</td><td>Belur</td></tr><tr><td>Central Hindu College</td><td>Annie Besant</td><td>1898</td><td>Banaras</td></tr></tbody></table>
      <table><thead><tr><th>Body</th><th>Founder</th><th>Year</th></tr></thead><tbody><tr><td>Gurukul Kangri</td><td>Swami Shraddhanand</td><td>1902</td></tr><tr><td>Servants of India Society</td><td>Gopal Krishna Gokhale</td><td>1905</td></tr><tr><td>Depressed Classes Mission</td><td>Vitthal Ramji Shinde</td><td>1906</td></tr><tr><td>Justice Party</td><td>Doctor Taravath Madhavan Nair and Sir Pitti Theagaraya Chetty</td><td>1916</td></tr><tr><td>Jat-Pat Todak Mandal</td><td>Bhai Parmanand</td><td>1922</td></tr><tr><td>Bahishkrit Hitakarini Sabha</td><td>Bhimrao Ramji Ambedkar</td><td>1924</td></tr><tr><td>Self-Respect Movement</td><td>Erode Venkatappa Ramasamy Naicker</td><td>1925</td></tr><tr><td>Samaj Samata Sangh</td><td>Bhimrao Ramji Ambedkar</td><td>1927</td></tr><tr><td>Harijan Sevak Sangh</td><td>Mahatma Gandhi</td><td>1932</td></tr><tr><td>Independent Labour Party</td><td>Bhimrao Ramji Ambedkar</td><td>1936</td></tr><tr><td>All-India Scheduled Castes Federation</td><td>Bhimrao Ramji Ambedkar</td><td>1942</td></tr></tbody></table>
      <div class="cp-note trap">Sir Syed started the Scientific Society in 1864 and the Aligarh school in 1875. The Mohammedan Anglo-Oriental College became Aligarh Muslim University in 1920.</div>
    `
  },
  26: {
    questext: "The Servants of India Society was founded in 1905 by whom?",
    options: ["Bal Gangadhar Tilak", "Lala Lajpat Rai", "Dadabhai Naoroji", "Gopal Krishna Gokhale"],
    correct: "4",
    exptext: "Gopal Krishna Gokhale founded the Servants of India Society in 1905. Remember it as a society of selfless workers who served the nation. Tilak is the tempting wrong option because he opposed Gokhale's moderate ideas."
  },
  27: {
    questext: "Which body was founded by Bhimrao Ramji Ambedkar in 1924?",
    options: ["Harijan Sevak Sangh", "Jat-Pat Todak Mandal", "Bahishkrit Hitakarini Sabha", "Depressed Classes Mission"],
    correct: "3",
    exptext: "Ambedkar set up the Bahishkrit Hitakarini Sabha in Bombay in 1924. Remember Hitakarini as welfare of the excluded. Gandhi founded the Harijan Sevak Sangh in 1932, which is a common trap."
  },
  28: {
    questext: "The Ramakrishna Mission was founded in which year?",
    options: ["1875", "1897", "1882", "1905"],
    correct: "2",
    exptext: "Swami Vivekananda founded the Ramakrishna Mission in 1897. Remember 1897 with Belur. The year 1875 belongs to the Arya Samaj and the Theosophical Society, so that option fails."
  },
  29: {
    questext: "Who started the Self-Respect Movement in 1925?",
    options: ["Erode Venkatappa Ramasamy Naicker", "Sri Narayana Guru", "Bhimrao Ramji Ambedkar", "Jyotiba Phule"],
    correct: "1",
    exptext: "Erode Venkatappa Ramasamy Naicker, known as Periyar, began the Self-Respect Movement in 1925. Remember Periyar with Tamil Nadu. Sri Narayana Guru worked in Kerala, so he is the tempting wrong option."
  },
  30: {
    questext: "Which of the following was founded by Sir Syed Ahmad Khan?",
    options: ["Deoband Movement", "Scientific Society", "Ahmadiya Movement", "Singh Sabha"],
    correct: "2",
    exptext: "Sir Syed Ahmad Khan founded the Scientific Society in 1864 at Aligarh. Remember Syed with Aligarh and Scientific Society. Deoband and Ahmadiya came from other leaders, so they fail."
  },
  31: {
    type: "concept", icon: "⚖️", accent: "#14b8a6", pauseTimer: true,
    title: "Social Reform Legislation",
    html: `
      <p class="cp-lead">Reformers wanted the government to make laws against harmful customs. <u>Each law below is linked to a year, a provision and the person behind it.</u></p>
      <p class="cp-lead">Before these laws, reformers could only persuade people. A law made the custom a crime or gave women a legal right, which is why these years are important in every exam.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/15.png" alt="Staircase picture with six steps in order, each with a year and a short label: 1829 Sati b" data-caption="The main social reform laws arranged in order of their years." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/16.png" alt="Ishwar Chandra Vidyasagar portrait photo" data-caption="Ishwar Chandra Vidyasagar, whose efforts led to the Hindu Widow Remarriage Act." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Reform or Act</th><th>Year</th><th>Provision</th><th>People behind it</th></tr></thead><tbody><tr><td>Sati abolished, Regulation XVII</td><td>4 December 1829</td><td>Sati became a crime in Bengal first, then Madras and Bombay in 1830</td><td>Lord William Bentinck and Raja Ram Mohan Roy</td></tr><tr><td>Thuggee suppressed</td><td>by 1837</td><td>Ended the robber bands that killed travellers</td><td>Bentinck and Colonel Sleeman</td></tr><tr><td>Meriah human sacrifice ended</td><td>1844 to 1845</td><td>Ended the human sacrifice of the Khond tribe</td><td>Lord Hardinge and Campbell</td></tr><tr><td>Hindu Widow Remarriage Act</td><td>1856</td><td>Made widow remarriage legal</td><td>Lord Canning and Ishwar Chandra Vidyasagar</td></tr><tr><td>Minimum marriage age for girls</td><td>1860</td><td>Ten years</td><td>Ishwar Chandra Vidyasagar</td></tr><tr><td>Native Marriage Act (Brahmo)</td><td>1872</td><td>Girls 14 and boys 18, polygamy abolished</td><td>Keshub Chandra Sen</td></tr><tr><td>Age of Consent Act</td><td>1891</td><td>Girls 12</td><td>Behramji Malabari, opposed by Bal Gangadhar Tilak</td></tr><tr><td>Child Marriage Restraint Act (Sharda Act)</td><td>1929</td><td>Girls 14 and boys 18, changed in 1978 to 18 and 21</td><td>Harbilas Sarda of Ajmer</td></tr></tbody></table>
      <div class="cp-note trap">Marriage ages change with each law: 1860 was 10, 1872 was 14 and 18, 1891 was 12, and the Sharda Act of 1929 was 14 and 18. Keep each age with its year.</div>
      <div class="cp-note exam">Sati 1829 and Thuggee 1837 both belong to Bentinck, and the Khond human sacrifice belongs to Hardinge and Campbell.</div>
    `
  },
  32: {
    questext: "Which Act made widow remarriage legal in 1856?",
    options: ["Hindu Widow Remarriage Act", "Age of Consent Act", "Native Marriage Act", "Sharda Act"],
    correct: "1",
    exptext: "The Hindu Widow Remarriage Act of 1856 made widow remarriage legal, with Lord Canning signing it after the efforts of Ishwar Chandra Vidyasagar. Remember 1856 for widows. The Sharda Act deals with child marriage and so is wrong."
  },
  33: {
    questext: "The Age of Consent Act of 1891 raised the age of consent for girls to how many years?",
    options: ["10 years", "14 years", "16 years", "12 years"],
    correct: "4",
    exptext: "The Age of Consent Act of 1891 set the age for girls at 12, after the efforts of Behramji Malabari. Remember 10 in 1860, 12 in 1891 and 14 in 1929. The figure 14 is wrong because it belongs to the Sharda Act."
  },
  34: {
    questext: "Consider the following statements about social reform laws:\n1. The Sharda Act of 1929 set the marriage age at 14 for girls and 18 for boys.\n2. The Native Marriage Act of 1872 was supported by Keshub Chandra Sen.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Only 2", "Only 1", "Neither 1 nor 2"],
    correct: "1",
    exptext: "Both statements are correct. The Sharda Act of 1929, named after Harbilas Sarda, fixed the ages at 14 and 18, and Keshub Chandra Sen worked for the Act of 1872. Remember each age with its year."
  },
  35: {
    questext: "Which pair is correctly matched?",
    options: ["Sati ban, 1856", "Thuggee, Colonel Sleeman", "Age of Consent, Vidyasagar", "Meriah sacrifice, Bentinck"],
    correct: "2",
    exptext: "Colonel Sleeman, known as Thuggee Sleeman, suppressed the Thugs by 1837 under Bentinck. Remember Sleeman with Thuggee. Sati was banned in 1829, Age of Consent was linked to Malabari, and the Meriah sacrifice to Hardinge, so the others fail."
  },
  36: {
    questext: "Who is known for the effort that led to the Hindu Widow Remarriage Act of 1856?",
    options: ["Behramji Malabari", "Dayanand Saraswati", "Atmaram Pandurang", "Ishwar Chandra Vidyasagar"],
    correct: "4",
    exptext: "Ishwar Chandra Vidyasagar fought for widow remarriage, and the law followed in 1856. Remember Vidyasagar with widows. Malabari is the tempting wrong option because he worked for the Age of Consent Act."
  },
  37: {
    type: "concept", icon: "📜", accent: "#f97316", pauseTimer: true,
    title: "Arya Samaj and Dayanand Saraswati",
    html: `
      <p class="cp-lead">The <u>Arya Samaj</u> was founded by Swami Dayanand Saraswati, who gave the call Go Back to the Vedas. He called the Vedas the Rock of Ages and the source of all knowledge.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/17.png" alt="Swami Dayanand Saraswati portrait photo" data-caption="Swami Dayanand Saraswati, founder of the Arya Samaj in 1875." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/18.png" alt="Three-box diagram: Left box Rejected with items Idol worship, Animal sacrifice, Shraddha, " data-caption="What the Arya Samaj rejected and what it accepted." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Dayanand was born as Mulshankar and founded the Arya Samaj on 10 April 1875 in Bombay, with its later centre at Lahore in 1877. His book Satyarth Prakash was written in 1875. He believed that people are high or low by their work, not by birth, and that Shudras may study the scripture. He fixed the marriage age at 25 for boys and 16 for girls.</p>
      <p class="cp-lead">The Samaj rejected the Puranas, image worship, many gods, animal sacrifice, shraddha rites, the power of priests and caste by birth. It was the first body to talk of Swadeshi and Hindi, with the idea that India is for Indians, and 1863 saw its first call of Swaraj in the Pakhand-Khandini Pataka. Dayanand died in 1883.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Founder</td><td>Dayanand Saraswati (Mulshankar)</td></tr><tr><td>Founded</td><td>10 April 1875, Girgaon, Bombay</td></tr><tr><td>Headquarters</td><td>Lahore, 1877</td></tr><tr><td>Book</td><td>Satyarth Prakash, 1875</td></tr><tr><td>Special work</td><td>Shuddhi, the return of converts</td></tr><tr><td>Cow Protection Association</td><td>1882</td></tr></tbody></table>
      <div class="cp-note trap">Shuddhi and cow protection brought riots, so the Arya Samaj was controversial. Do not confuse the Arya Samaj of 1875 with the Brahmo Samaj of 1828.</div>
      <div class="cp-note exam">Leaders such as Bal Gangadhar Tilak, Lala Lajpat Rai and Gopal Krishna Gokhale were influenced by Dayanand's ideas.</div>
    `
  },
  38: {
    questext: "Who wrote Satyarth Prakash?",
    options: ["Swami Vivekananda", "Raja Ram Mohan Roy", "Jyotiba Phule", "Swami Dayanand Saraswati"],
    correct: "4",
    exptext: "Swami Dayanand Saraswati wrote Satyarth Prakash in 1875. Remember Satyarth Prakash with Dayanand and Gulamgiri with Phule. Vivekananda wrote on yoga, so he is the tempting wrong option."
  },
  39: {
    questext: "The Arya Samaj was founded in which year and place?",
    options: ["1875, Bombay", "1828, Calcutta", "1867, Bombay", "1897, Belur"],
    correct: "1",
    exptext: "The Arya Samaj was founded on 10 April 1875 at Girgaon, Bombay. Remember 1875 for both the Arya Samaj and the Theosophical Society. The year 1867 is the Prarthana Samaj, so it fails."
  },
  40: {
    questext: "What was the main slogan of Dayanand Saraswati?",
    options: ["One Religion, One Caste, One God", "Service to man is service to God", "Go Back to the Vedas", "Do or die"],
    correct: "3",
    exptext: "Dayanand's call was Go Back to the Vedas. Remember him with the Vedas. One Religion, One Caste, One God belongs to Sri Narayana Guru, which is the tempting wrong option."
  },
  41: {
    questext: "Which pair of Arya Samaj ideas is correct?",
    options: ["It supported idol worship and caste by birth", "It supported Varna by merit and Hindi", "It supported animal sacrifice and shraddha", "It supported priests as middlemen"],
    correct: "2",
    exptext: "The Arya Samaj supported varna by merit and Hindi. It rejected idol worship, caste by birth, animal sacrifice, shraddha and priests. Remember its slogan that India is for Indians."
  },
  42: {
    type: "concept", icon: "🕉️", accent: "#ec4899", pauseTimer: true,
    title: "Ramakrishna Mission and Vivekananda",
    html: `
      <p class="cp-lead"><u>Swami Vivekananda</u> carried the message of his teacher Ramakrishna Paramahansa across India and the world. He taught that service to man is service to God.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/19.png" alt="Swami Vivekananda Chicago 1893 photo" data-caption="Swami Vivekananda at the Parliament of the World's Religions in Chicago in 1893." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/20.png" alt="Belur Math Howrah temple photo" data-caption="Belur Math near Calcutta, headquarters of the Ramakrishna Mission since 1897." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Ramakrishna Paramahansa was a mystic of the Kali temple at Dakshineswar, on the Hooghly. He taught that all religions are one, and that people should not show mercy to others but serve them as God.</p>
      <p class="cp-lead">Vivekananda (1863 to 1902) was born Narendranath Dutta and took his new name on the suggestion of the Maharaja of Khetri. At the Parliament of the World's Religions in Chicago on 11 September 1893, he began with the words Sisters and Brothers of America. He founded the Ramakrishna Mission in 1897.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Ramakrishna Paramahansa</td><td>Mystic of Dakshineswar</td></tr><tr><td>Ramakrishna Mission</td><td>Founded 1897, Baranagar then Belur</td></tr><tr><td>Journals</td><td>Prabuddha Bharat (English), Udbodhan (Bengali)</td></tr><tr><td>Books of Vivekananda</td><td>Raja Yoga, Gyana Yoga, Karma Yoga, Vedanta Philosophy</td></tr><tr><td>Irish disciple</td><td>Sister Nivedita (Margaret Noble)</td></tr><tr><td>National Youth Day</td><td>12 January, since 1985</td></tr></tbody></table>
      <div class="cp-note trap">Ramakrishna Paramahansa (teacher) and Vivekananda (disciple) are two people, and the Mission was founded by Vivekananda, not by Ramakrishna.</div>
      <div class="cp-note exam">Subhash Chandra Bose called Vivekananda the spiritual father of the modern national movement.</div>
      <div class="cp-mnemonic">Ram's teacher, Viv's mission.</div>
    `
  },
  43: {
    questext: "Swami Vivekananda attended the Parliament of Religions at which city in 1893?",
    options: ["Chicago", "London", "Paris", "New York"],
    correct: "1",
    exptext: "Vivekananda spoke at the Parliament of the World's Religions at Chicago on 11 September 1893. Remember Chicago with the words Sisters and Brothers of America. New York is wrong, though the Theosophical Society began there."
  },
  44: {
    questext: "Who was the Irish disciple of Swami Vivekananda?",
    options: ["Annie Besant", "Sister Nivedita", "Madame Blavatsky", "Sarada Devi"],
    correct: "2",
    exptext: "Margaret Noble, called Sister Nivedita, was the Irish disciple of Vivekananda. Remember Nivedita as his Irish disciple. Annie Besant tempts as an option, but she led the Theosophical Society."
  },
  45: {
    questext: "Consider the following statements about the Ramakrishna Mission:\n1. It was founded in 1897.\n2. It was founded by Ramakrishna Paramahansa.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Neither 1 nor 2", "Only 1", "Only 2"],
    correct: "3",
    exptext: "Only statement 1 is correct, as the Mission began in 1897. It was founded by Vivekananda and not by Ramakrishna Paramahansa. Remember Paramahansa as the teacher and the Mission as the work of his disciple."
  },
  46: {
    questext: "National Youth Day in India is celebrated on which date?",
    options: ["2 October", "15 August", "5 September", "12 January"],
    correct: "4",
    exptext: "National Youth Day is celebrated on 12 January, the birthday of Vivekananda, since 1985. Remember 12 January with Vivekananda. The other dates are different national days."
  },
  47: {
    type: "concept", icon: "🔮", accent: "#84cc16", pauseTimer: true,
    title: "Theosophical Society and Annie Besant",
    html: `
      <p class="cp-lead">The <u>Theosophical Society</u> taught that all religions share one truth and that all people are brothers. It also helped Indians feel proud of their own ancient wisdom.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/21.png" alt="Annie Besant portrait photo Theosophical Society" data-caption="Annie Besant, leader of the Theosophical Society and first woman president of the Indian National Congress." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/22.png" alt="Theosophical Society Adyar headquarters photo" data-caption="The Adyar headquarters of the Theosophical Society in Madras." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Madame Helena Petrovna Blavatsky and Colonel Henry Steel Olcott founded it in New York in 1875. The headquarters came to India in 1879 and moved to Adyar, Madras, in 1882. Annie Besant became its leader in 1907. Its main beliefs were karma, rebirth and universal brotherhood, and it drew on the Upanishads, Samkhya, Yoga and Vedanta. It worked to revive Hinduism, Zoroastrianism and Buddhism, and it opposed caste and untouchability.</p>
      <p class="cp-lead">Annie Besant (1847 to 1933) was a socialist who came to India in 1893. She started the Central Hindu College at Banaras in 1898, which became the Banaras Hindu University in 1916 with Madan Mohan Malviya. She joined Tilak in the Home Rule Movement in 1916, used her papers Commonweal and New India, and became the first woman president of the Indian National Congress at Calcutta in 1917. She opposed non-cooperation, saw the Montagu-Chelmsford plan as a step to freedom, and died in 1933. She also supported the Boy Scout movement.</p>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Founded</td><td>1875, New York</td></tr><tr><td>Arrived in India</td><td>1879</td></tr><tr><td>Headquarters</td><td>Adyar, Madras, 1882</td></tr><tr><td>Annie Besant leads</td><td>1907</td></tr><tr><td>Congress president</td><td>Calcutta, 1917</td></tr><tr><td>Home Rule League</td><td>1916 with Tilak</td></tr></tbody></table>
      <div class="cp-note trap">Annie Besant was the first woman president of the Indian National Congress, but the first Indian woman president was Sarojini Naidu in 1925.</div>
    `
  },
  48: {
    questext: "Who was the first woman president of the Indian National Congress?",
    options: ["Sarojini Naidu", "Annie Besant", "Nellie Sengupta", "Vijaya Lakshmi Pandit"],
    correct: "2",
    exptext: "Annie Besant presided at Calcutta in 1917 and so was the first woman president. Remember Besant as first and Sarojini Naidu as first Indian woman in 1925. Naidu is the tempting wrong option."
  },
  49: {
    questext: "The headquarters of the Theosophical Society in India is at which place?",
    options: ["Banaras", "Belur", "Adyar", "Aligarh"],
    correct: "3",
    exptext: "The headquarters of the Theosophical Society is at Adyar in Madras, set up in 1882. Remember Adyar with the Theosophists and Belur with the Ramakrishna Mission, since both are easy to swap."
  },
  50: {
    questext: "The Central Hindu College was started by whom in 1898?",
    options: ["Madan Mohan Malviya", "Sir Syed Ahmad Khan", "Lala Hansraj", "Annie Besant"],
    correct: "4",
    exptext: "Annie Besant started the Central Hindu College at Banaras in 1898, and it later became the Banaras Hindu University. Remember Besant with Banaras. Malviya is the tempting wrong option as he helped in 1916."
  },
  51: {
    type: "concept", icon: "🌸", accent: "#d946ef", pauseTimer: true,
    title: "Sikh and Parsi Reform",
    html: `
      <p class="cp-lead">The Sikh and Parsi communities also had their own reform movements. <u>Both aimed to bring back the pure faith and to spread modern education.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/23.png" alt="Golden Temple Amritsar photo" data-caption="The Golden Temple at Amritsar, central to Sikh reform movements." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/24.png" alt="Two-column comparison. Left column Sikh reform with items Singh Sabha 1873, Khalsa schools" data-caption="The main Sikh and Parsi reform bodies compared side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Singh Sabha was founded in 1873 at Amritsar by Thakur Singh Sandhawalia and Gyan Singh. It brought back the core Sikh values against the efforts of Christian missionaries and Hindu influence, edited the Guru Granth Sahib and opened Khalsa schools. The Akali movement, which began after 1920, freed the gurdwaras from corrupt mahants through peaceful satyagraha, and its result was the Sikh Gurdwaras Act of 1925 and the Shiromani Gurdwara Parbandhak Committee.</p>
      <p class="cp-lead">Among the Parsis, educated men formed the Rahnumai Mazdayasnan Sabha in Bombay in 1851. Naoroji Furdonji, Dadabhai Naoroji, Kharshedji Rustomji Cama and Sorabji Shapurji Bengali worked to restore the Zoroastrian religion, and their journal was Rast Goftar.</p>
      <div class="cp-note trap">The Singh Sabha began in 1873, but the Akali movement began after 1920. Do not give the Singh Sabha the credit for the Gurdwara Act.</div>
    `
  },
  52: {
    questext: "The Singh Sabha was founded at which place in 1873?",
    options: ["Lahore", "Delhi", "Ludhiana", "Amritsar"],
    correct: "4",
    exptext: "The Singh Sabha was founded at Amritsar on 1 October 1873. Remember Singh with Amritsar. Lahore is the tempting wrong option because the Dayanand Anglo-Vedic School was there."
  },
  53: {
    questext: "Which journal was linked with the Parsi reform body Rahnumai Mazdayasnan Sabha?",
    options: ["Rast Goftar", "Hesperus", "Sanjibani", "Indian Mirror"],
    correct: "1",
    exptext: "Rast Goftar was the journal of the Parsi reform body of 1851. Remember it as the Parsi journal. The other journals belong to Derozio and the Brahmo leaders."
  },
  54: {
    type: "concept", icon: "✊", accent: "#06b6d4", pauseTimer: true,
    title: "Anti-Caste and Depressed-Class Movements",
    html: `
      <p class="cp-lead">The fight against caste grew strongest in South India and Maharashtra. <u>Leaders such as Sri Narayana Guru, Periyar and Ambedkar worked to give the lower castes equal rights.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/25.png" alt="Sri Narayana Guru portrait Aruvipuram photo" data-caption="Sri Narayana Guru, the Kerala saint who opposed caste discrimination." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/26.png" alt="Vaikom temple Kerala photo" data-caption="The Vaikom temple in Kerala, where the temple entry satyagraha took place." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/27.png" alt="Three-column comparison of slogans: Sri Narayana Guru - One Religion, One Caste, One God; " data-caption="The slogans of three South Indian anti-caste leaders compared." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Sri Narayana Guru consecrated a Shiva idol at Aruvipuram on Shivaratri in 1888, though he belonged to the Ezhava community, and his slogan was One Religion, One Caste, One God. His disciple Sahodaran Ayyappan raised the slogan No Religion, No Caste, No God. The temple entry movement of Kerala was backed by Sri Narayana Guru, N. Kumaran Asan and T. K. Madhavan, and by the Nair Service Society and the Nambudiri Yogakshema Sabha.</p>
      <p class="cp-lead">Gandhi spoke to the Queen of Travancore in March 1925, and in November 1936 the Maharaja of Travancore opened all government temples to every Hindu. Madras followed in 1938 under Rajagopalachari. Erode Venkatappa Ramasamy Naicker, called Periyar, left the Indian National Congress in 1925 and started the Self-Respect Movement for Dravidian pride. The Justice Party, formed on 20 November 1916, won the 1920 Madras Council election, and its Non-Brahmin Manifesto was the first demand for reservation.</p>
      <table><thead><tr><th>Leader or body</th><th>Work</th></tr></thead><tbody><tr><td>Sri Narayana Guru</td><td>Aruvipuram 1888, One Religion, One Caste, One God</td></tr><tr><td>Sahodaran Ayyappan</td><td>No Religion, No Caste, No God</td></tr><tr><td>Periyar</td><td>Self-Respect Movement 1925, Sachchi Ramayana</td></tr><tr><td>Justice Party</td><td>Formed 20 November 1916, journal Paper Justice</td></tr><tr><td>Temple Entry Proclamation</td><td>Travancore, November 1936</td></tr></tbody></table>
      <div class="cp-note trap">One Religion, One Caste, One God belongs to Sri Narayana Guru, but No Religion, No Caste, No God belongs to Sahodaran Ayyappan.</div>
    `
  },
  55: {
    questext: "Who gave the slogan One Religion, One Caste, One God?",
    options: ["Periyar", "Jyotiba Phule", "Sri Narayana Guru", "Sahodaran Ayyappan"],
    correct: "3",
    exptext: "Sri Narayana Guru gave this slogan. Remember that Sahodaran Ayyappan changed it to No Religion, No Caste, No God. Ayyappan is the tempting wrong option."
  },
  56: {
    questext: "The Temple Entry Proclamation of 1936 was issued by the ruler of which state?",
    options: ["Cochin", "Mysore", "Madras", "Travancore"],
    correct: "4",
    exptext: "The Maharaja of Travancore opened all government temples to every Hindu in November 1936. Remember Travancore with Kerala. Madras followed in 1938, but it was a province and not a princely state."
  },
  57: {
    questext: "The Justice Party of Madras was formed in which year?",
    options: ["1916", "1920", "1925", "1932"],
    correct: "1",
    exptext: "The Justice Party was formed on 20 November 1916 and won the 1920 Madras Council election. Remember 1916 for formation and 1920 for victory. The year 1925 is the Self-Respect Movement, which is a tempting wrong option."
  },
  58: {
    type: "concept", icon: "🤝", accent: "#eab308", pauseTimer: true,
    title: "Congress, Gandhi and Ambedkar",
    html: `
      <p class="cp-lead">By the twentieth century, the fight against untouchability moved from reformers to national leaders. <u>The two great names are Mahatma Gandhi and Bhimrao Ramji Ambedkar.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/28.png" alt="Bhimrao Ramji Ambedkar portrait photo" data-caption="Bhimrao Ramji Ambedkar, leader of the depressed classes and chairman of the Drafting Committee." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/29.png" alt="Poona Pact 1932 Gandhi Ambedkar photo" data-caption="Gandhi and Ambedkar, whose agreement in 1932 is called the Poona Pact." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/30.png" alt="Timeline with five boxes: 1917 First Depressed Classes Conference, 1918 First All-India De" data-caption="Key steps in the fight against untouchability, from 1917 to 1932." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Congress slowly took up the cause. In 1917 the first Depressed Classes Conference was held in Bombay, and in 1921 and 1923 Congress asked for the removal of untouchability. In 1931 the Karachi Session promised equal access to jobs, roads and schools as fundamental rights.</p>
      <p class="cp-lead">Bhimrao Ramji Ambedkar (1891 to 1956) was born a Mahar and was the first to study untouchability scientifically. He led the Mahad satyagraha for water from a public tank in 1927, burnt the Manusmriti, and led the Kalaram Temple satyagraha at Nasik in 1930. At the first Round Table Conference in London in November 1930, he demanded the end of untouchability, equal citizenship and constitutional safeguards.</p>
      <p class="cp-lead">In August 1932, Ramsay MacDonald announced the Communal Award, which gave separate electorates to the depressed classes. Gandhi began a fast unto death on 20 September, and the Poona Pact was signed on 24 September 1932 with a joint Hindu electorate and reserved seats. Gandhi then formed the Harijan Sevak Sangh in September 1932, started the weekly Harijan in 1933 and made a 12,500 mile tour in 1933 and 1934.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1924</td><td>Bahishkrit Hitakarini Sabha, Bombay</td></tr><tr><td>1927</td><td>Samaj Samata Sangh; Bahishkrit Bharat fortnightly</td></tr><tr><td>1930</td><td>Kalaram Temple satyagraha, Nasik</td></tr><tr><td>1932</td><td>Communal Award and Poona Pact</td></tr><tr><td>1936</td><td>Independent Labour Party; Annihilation of Caste</td></tr><tr><td>1956</td><td>Ambedkar takes Buddhism and dies on 6 December</td></tr></tbody></table>
      <div class="cp-note trap">The Communal Award came first, with separate electorates. The Poona Pact came after Gandhi's fast and replaced them with reserved seats in a joint electorate.</div>
      <div class="cp-note exam">Ambedkar chaired the Drafting Committee of the Constitution, Article 17 abolished untouchability, and he received the Bharat Ratna in 1990.</div>
    `
  },
  59: {
    questext: "The Poona Pact was signed in which year?",
    options: ["1930", "1931", "1932", "1935"],
    correct: "3",
    exptext: "The Poona Pact was signed on 24 September 1932 after Gandhi's fast. Remember 1932 for both the Communal Award and the Poona Pact. The year 1931 is the Karachi Session, so it is wrong."
  },
  60: {
    questext: "Who announced the Communal Award in 1932?",
    options: ["Lord Irwin", "Ramsay MacDonald", "Clement Attlee", "Winston Churchill"],
    correct: "2",
    exptext: "Prime Minister Ramsay MacDonald announced the Communal Award in August 1932. Remember MacDonald with the Award. Attlee is linked with the Cabinet Mission and Irwin with the Gandhi-Irwin Pact, so they are wrong."
  },
  61: {
    questext: "Which Article of the Constitution abolished untouchability?",
    options: ["Article 14", "Article 15", "Article 21", "Article 17"],
    correct: "4",
    exptext: "Article 17 abolished untouchability. Remember 17 with untouchability. Article 14 is equality before law and Article 15 forbids discrimination, so they fail."
  },
  62: {
    questext: "Consider the following statements about Gandhi and the Poona Pact:\n1. Gandhi began a fast unto death on 20 September 1932 against separate electorates for the depressed classes.\n2. The Poona Pact gave the depressed classes separate electorates.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "Only statement 1 is correct. The Poona Pact gave a joint electorate with reserved seats, not separate electorates, so statement 2 is wrong. Remember that the fast was to stop separate electorates."
  },
  63: {
    questext: "Which was the journal started by Gandhi for the uplift of the Harijans in 1933?",
    options: ["Young India", "Bahishkrit Bharat", "Harijan", "Mooknayak"],
    correct: "3",
    exptext: "Gandhi started the weekly Harijan in 1933. Remember the Harijan Sevak Sangh in 1932 and the journal Harijan in 1933. Bahishkrit Bharat was Ambedkar's, so it is the tempting wrong option."
  },
  64: {
    type: "concept", icon: "🌙", accent: "#f43f5e", pauseTimer: true,
    title: "Islamic Reform Movements",
    html: `
      <p class="cp-lead">The Revolt of 1857 was a watershed for Muslim reform. After it, the community split between fundamentalist and modern reform movements. <u>Sir Syed Ahmad Khan led the modern path, and Deoband led the orthodox path.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/31.png" alt="Sir Syed Ahmad Khan portrait Aligarh photo" data-caption="Sir Syed Ahmad Khan, founder of the Aligarh movement for modern education." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/32.png" alt="Darul Uloom Deoband building photo" data-caption="The Darul Uloom seminary at Deoband, centre of orthodox Islamic revival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/33.png" alt="Four-column comparison of Islamic movements, each with leader and aim: Aligarh (Sir Syed, " data-caption="The four main Islamic reform movements, their leaders and their aims." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Sir Syed Ahmad Khan stayed loyal in 1857 and served in the Company's judicial service. He wrote Asbab-e-Baghawat-e-Hind (Causes of the Indian Revolt) in 1859, was knighted in 1888 and said that Hindus and Muslims are two eyes of India. He feared that a Hindu-Muslim alliance would harm the smaller and educationally backward Muslim community, so he promoted Western education and opposed the Congress, with the British following a policy of divide and rule.</p>
      <p class="cp-lead">The Aligarh school was started on 24 May 1875, and Sir Syed's journal Tahzeeb-ul-Akhlaq came in 1870. The Mohammedan Anglo-Oriental College became Aligarh Muslim University in 1920.</p>
      <table><thead><tr><th>Movement</th><th>Founder</th><th>Year</th><th>Key point</th></tr></thead><tbody><tr><td>Aligarh</td><td>Sir Syed Ahmad Khan</td><td>1875</td><td>Western education, Tahzeeb-ul-Akhlaq</td></tr><tr><td>Deoband</td><td>Qasim Nanotavi, Rashid Ahmad Gangohi</td><td>1866</td><td>Pure Quran and Hadith, backed Congress</td></tr><tr><td>Nadwatul Ulama</td><td>Shibli Numani</td><td>1894 to 1896</td><td>Orthodox education</td></tr><tr><td>Ahmadiya</td><td>Mirza Ghulam Ahmad</td><td>1889</td><td>Qadian, defended Islam against Arya Samaj</td></tr><tr><td>Wahabi</td><td>Syed Ahmad of Rae Bareli</td><td>1830s to 1860s</td><td>Patna, jihad first against Sikhs, then the British</td></tr><tr><td>Faraizi</td><td>Haji Shariatullah</td><td>19th century</td><td>Bengal, obligatory duties of Allah</td></tr></tbody></table>
      <div class="cp-note trap">Deoband followed pure Quran and Hadith and still backed the Congress, but Aligarh supported Western education and opposed the Congress. Do not swap them.</div>
      <div class="cp-note exam">Sir Syed and Raja Shiv Prasad Singh started the United Indian Patriotic Association, which opposed the Congress and Badruddin Tyabji's presidency in 1887.</div>
    `
  },
  65: {
    questext: "Who wrote Asbab-e-Baghawat-e-Hind in 1859?",
    options: ["Sir Syed Ahmad Khan", "Mirza Ghulam Ahmad", "Shibli Numani", "Haji Shariatullah"],
    correct: "1",
    exptext: "Sir Syed Ahmad Khan wrote Asbab-e-Baghawat-e-Hind, which means Causes of the Indian Revolt. Remember it with the Revolt of 1857. Numani is the tempting wrong option because he led the Nadwatul Ulama."
  },
  66: {
    questext: "Which movement was started by Mirza Ghulam Ahmad at Qadian in 1889?",
    options: ["Deoband", "Aligarh", "Faraizi", "Ahmadiya"],
    correct: "4",
    exptext: "Mirza Ghulam Ahmad began the Ahmadiya Movement at Qadian in 1889. Remember Qadian with Ahmadiya. Deoband is at Saharanpur and so is wrong."
  },
  67: {
    questext: "The Deoband movement was best known for which approach?",
    options: ["Opposing the Congress", "Pure Quran and Hadith, with support for the Congress", "Accepting Western education", "Starting the Scientific Society"],
    correct: "2",
    exptext: "Deoband stressed pure Quran and Hadith and still backed the Congress. Remember that Deoband stayed orthodox but political. Aligarh, led by Sir Syed, held the other views, which is why the other options fail."
  },
  68: {
    questext: "Which movement of Patna, led by Syed Ahmad of Rae Bareli, first proclaimed jihad against the Sikhs?",
    options: ["Faraizi", "Ahmadiya", "Wahabi", "Deoband"],
    correct: "3",
    exptext: "The Wahabi Movement, led by Syed Ahmad of Rae Bareli, first fought the Sikh state in Punjab and then the British. Remember Wahabi with Patna and Rae Bareli. The Faraizi movement was in Bengal, so it is wrong."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an old palm-leaf manuscript, a brass oil lamp (diya) and a delicate lotus, in warm gold tones" },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/1.png": { t: "fig", about: "Two-column picture. Left column titled Social Evils with items: Untouchability, Superstition, Purdah, Polytheism. Right column titled Position of Women with items: Sati, No widow remarriage, Polygamy." },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sati practice 19th century India old painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/2.png. an old engraving or painting about sati",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Raja Ram Mohan Roy portrait statue Bristol photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/3.png. a portrait or statue of Raja Ram Mohan Roy",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Brahmo Samaj temple Kolkata photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/4.png. the Brahmo Samaj prayer hall",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/5.png": { t: "fig", about: "Timeline of the Brahmo splits with five boxes: 1842 Debendranath joins, 1858 Keshub made Acharya, 1865 Keshub dismissed, 1866 Brahmo Samaj of India and Adi Brahmo Samaj, 1878 Sadharana Brahmo Samaj." },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Henry Louis Vivian Derozio portrait Hindu College\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/6.png. a portrait of Derozio",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Presidency College Kolkata building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/7.png. the Hindu College building, now Presidency",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jyotiba Phule portrait statue photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/8.png. a portrait or statue of Jyotiba Phule",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahadev Govind Ranade portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/9.png. a portrait of Ranade",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/10.png": { t: "fig", about: "Simple map-style schematic, not a map: three boxes labelled Calcutta, Bombay, Madras, each with two short bullet labels (Calcutta: Brahmo Sabha 1828, Tattvabodhini Sabha 1839; Bombay: Prarthana Samaj 1867, Arya Samaj 1875; Madras: Veda Samaj 1864, Theosophical Society 1882)." },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hindu College Kolkata historic building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/11.png. the building of Hindu College Calcutta",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/12.png": { t: "fig", about: "Timeline strip with six labelled stops: 1864 Veda Samaj, 1873 Singh Sabha, 1875 Arya Samaj, 1882 Theosophical Society at Adyar, 1897 Ramakrishna Mission, 1905 Servants of India Society." },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aligarh Muslim University Bab-e-Syed gate photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/13.png. the Bab-e-Syed gate of Aligarh",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ramakrishna Mission Belur Math photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/14.png. the main temple of Belur Math",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/15.png": { t: "fig", about: "Staircase picture with six steps in order, each with a year and a short label: 1829 Sati banned, 1856 Widow remarriage legal, 1860 Marriage age 10, 1872 Native Marriage Act, 1891 Age of Consent 12, 1929 Sharda Act." },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ishwar Chandra Vidyasagar portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/16.png. a portrait of Ishwar Chandra Vidyasagar",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Swami Dayanand Saraswati portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/17.png. a portrait of Swami Dayanand Saraswati",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/18.png": { t: "fig", about: "Three-box diagram: Left box Rejected with items Idol worship, Animal sacrifice, Shraddha, Caste by birth. Middle box Accepted with items Vedas, Varna by merit, Swadeshi. Right box Method with item Shuddhi." },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Swami Vivekananda Chicago 1893 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/19.png. Swami Vivekananda at the Parliament of Religions",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Belur Math Howrah temple photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/20.png. the Belur Math temple",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Annie Besant portrait photo Theosophical Society\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/21.png. a portrait of Annie Besant",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Theosophical Society Adyar headquarters photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/22.png. the Adyar headquarters building",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Golden Temple Amritsar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/23.png. the Golden Temple at Amritsar",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/24.png": { t: "fig", about: "Two-column comparison. Left column Sikh reform with items Singh Sabha 1873, Khalsa schools, Akali movement, Shiromani Gurdwara Parbandhak Committee. Right column Parsi reform with items Rahnumai Mazdayasnan Sabha 1851, Rast Goftar journal, Zoroastrian faith restored." },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sri Narayana Guru portrait Aruvipuram photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/25.png. a portrait of Sri Narayana Guru",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vaikom temple Kerala photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/26.png. the Vaikom Mahadeva temple",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/27.png": { t: "fig", about: "Three-column comparison of slogans: Sri Narayana Guru - One Religion, One Caste, One God; Sahodaran Ayyappan - No Religion, No Caste, No God; Periyar - Self-Respect Movement." },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhimrao Ramji Ambedkar portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/28.png. a portrait of Ambedkar",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Poona Pact 1932 Gandhi Ambedkar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/29.png. Gandhi and Ambedkar at the time of the Poona Pact",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/30.png": { t: "fig", about: "Timeline with five boxes: 1917 First Depressed Classes Conference, 1918 First All-India Depressed Classes Conference, 1931 Karachi Fundamental Rights, 1932 Communal Award, 1932 Poona Pact on 24 September." },
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sir Syed Ahmad Khan portrait Aligarh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/31.png. a portrait of Sir Syed Ahmad Khan",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Darul Uloom Deoband building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/32.png. the Deoband seminary",
  "images/General_Awareness/Modern_India/Socio_Religious_Reform_Movements/33.png": { t: "fig", about: "Four-column comparison of Islamic movements, each with leader and aim: Aligarh (Sir Syed, modern education), Deoband (Qasim Nanotavi, pure Quran and Hadith), Ahmadiya (Mirza Ghulam Ahmad, defend Islam), Wahabi (Syed Ahmad of Rae Bareli, purify Islam)." }
});

/* CHANGE LOG
   - Jyotiba Phule met the Duke of Connaught (1888), not the Duke of York; page text states Duke of Connaught.
   - Parvati temple entry satyagraha dated 1929 (not 1928); the date is left out of the pages to avoid confusion.
   - Phule's Gulamgiri (1872) and Satya Shodhak Samaj (1873) kept in the correct order; Prarthana Samaj founded in 1867 by Atmaram Pandurang.
   - Periyar left the Indian National Congress in 1925 (not 1924); the page states 1925.
   - The Sikh Gurdwaras Act is dated 1925 and linked to the Shiromani Gurdwara Parbandhak Committee formed in 1920.
   - Annie Besant's birthplace is not stated on the pages, as her family was Irish but she was born in London.
*/