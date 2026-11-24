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

/* Field: General_Awareness · Subject: Modern_India · Chapter: The_British_Conquest_of_India · 12 concept pages (+ overview) · 43 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🗺️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — The British Conquest of India",
    thumb: {
      image: "images/General_Awareness/Modern_India/The_British_Conquest_of_India/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "BRITISH CONQUEST",
      line2: "OF INDIA",
      line3: "WARS & TREATIES",
      badge: "FULL CLASS",
      ribbon: "BATTLES • TREATIES • TRICKS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "British Conquest of India | Wars & Treaties Modern History | SSC CGL",
      altTitles: ["Plassey to Punjab: British Conquest of India in One Class", "All Carnatic, Maratha, Mysore & Sikh Wars with Treaties"],
      description: "Battles, treaties and dates decide your Modern History score. In this class you learn how the British East India Company conquered India, step by step and in simple words.\n\n📌 IN THIS CLASS\n✅ Carnatic Wars and the fall of the French\n✅ Plassey, Buxar, Allahabad and the Dual Government\n✅ Anglo-Maratha, Anglo-Mysore and Anglo-Sikh Wars\n✅ Nepal, Burma, Afghanistan and Tibet\n✅ Practice questions with easy explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #ModernHistory #BritishConquest",
      tags: ["british conquest of india", "modern history for ssc cgl", "carnatic wars", "battle of plassey", "battle of buxar", "treaty of allahabad", "dual government bengal", "anglo maratha wars", "anglo mysore wars", "anglo sikh wars", "tipu sultan", "ranjit singh", "treaty of bassein", "treaty of srirangapatna", "subsidiary alliance", "anglo burmese wars", "anglo afghan wars", "modern history tricks", "history for railway exams", "general awareness", "ssc cgl history", "ssc history revision", "wars and treaties", "history one shot", "competitive exams"],
      hashtags: ["SSCCGL", "ModernHistory", "BritishConquest"],
      thumbText: "BRITISH CONQUEST OF INDIA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🗺️ New class is live: The British Conquest of India, with every war and treaty made easy. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Modern History — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">This class tells the story of <u>how the British East India Company slowly became the ruler of India</u>, from the Carnatic Wars to the annexation of Punjab. We will also see how the borders of British India grew in Nepal, Burma, Afghanistan and Tibet.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>12</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>43</b><span>Questions</span></div>
        <div class="cp-stat"><b>~67 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>European Rivalry and the Carnatic Wars</b><br>Why only the British and the French were left in the race, and how the three Carnatic Wars ended French hopes in India.</li>
        <li><b>Acquisition of Bengal</b><br>How the Battles of Plassey and Buxar, the two Treaties of Allahabad and the Dual Government gave Bengal to the Company.</li>
        <li><b>Anglo-Maratha and Anglo-Mysore Wars</b><br>How the Marathas and the rulers of Mysore were defeated, and how the Subsidiary Alliance worked.</li>
        <li><b>Anglo-Sikh Relations</b><br>How the Sikh kingdom of Punjab fell after two wars and was annexed in 1849.</li>
        <li><b>Nepal, Burma, Afghanistan and Tibet</b><br>How the British pushed and protected the frontiers of India, with the treaty that ended each war.</li>
        <li><b>Tipu Sultan, Ranjit Singh and Exam Traps</b><br>Key facts about two famous rulers and the pairs that students most often mix up.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> every year the Staff Selection Commission asks several questions on battles, treaties, dates and rulers from this chapter, and the same facts also appear in Railways, Banking and Defence exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🌍", accent: "#3b82f6", pauseTimer: true,
    title: "Background — European Rivalry",
    html: `
      <p class="cp-lead">Many European trading companies came to India to earn money from trade. <u>In the end, only the British and the French were strong enough to fight for power.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/1.png" alt="Joseph Francois Dupleix portrait painting" data-caption="Dupleix, the French governor who first interfered in Indian politics." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/2.png" alt="Elimination chart: Portuguese, Dutch and Danish shown as faded boxes on the left; French a" data-caption="Only the French and the British remained as strong rivals." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Portuguese came first, but they slowly lost their strength. The Dutch were beaten by the British, and the Danish stayed as small traders who did not fight for power. So the real contest was between the British East India Company and the French company.</p>
      <table><thead><tr><th>Power</th><th>What happened</th></tr></thead><tbody><tr><td>Portuguese</td><td>Came first but lost their strength</td></tr><tr><td>Dutch</td><td>Beaten by the British, finally at Bedara in 1759</td></tr><tr><td>Danish</td><td>Stayed as small traders and sold their settlements to the British in 1845</td></tr><tr><td>French and British</td><td>Fought three Carnatic Wars for control of southern India</td></tr></tbody></table>
      <p class="cp-lead"><b>Joseph François Dupleix</b> became Governor of Chandernagore in 1730. In 1741 he became Director-General of the French colonies and Governor-General of Pondicherry. He was the first European to interfere in Indian politics, by helping one Indian ruler against another.</p>
      <p class="cp-lead">His method was later copied by the British as the <b>Subsidiary Alliance</b>, in which a ruler receives foreign soldiers and pays for them. The French government recalled Dupleix in <b>1754</b> because his plans had become too costly.</p>
      <div class="cp-note tip">Think of Dupleix as the teacher who showed the way. The British learned his lesson and used it better.</div>
      <div class="cp-note trap">The Danish did not leave India in 1745. They sold their last settlements to the British only in 1845.</div>
      <div class="cp-note exam">Remember three dates for Dupleix: Chandernagore in 1730, Pondicherry in 1741 and recall in 1754.</div>
    `
  },
  3: {
    questext: "Who among the following was the first European to interfere in Indian politics and became the brain behind the idea later known as the Subsidiary Alliance?",
    options: ["Robert Clive", "Joseph François Dupleix", "Count de Lally", "Charles Bussy"],
    correct: "2",
    exptext: "✅ Dupleix, the French governor at Pondicherry, was the first European to use troops to take sides among Indian rulers. 📌 Dupleix showed the way and the British followed. ❌ Robert Clive is tempting, but he came later and used the method for the British."
  },
  4: {
    questext: "Dupleix was recalled to France in which year?",
    options: ["1746", "1749", "1751", "1754"],
    correct: "4",
    exptext: "✅ Dupleix was recalled in 1754, and Godeheu was sent in his place. 📌 The Second Carnatic War ended in 1754 and his recall came in the same year. ❌ The year 1751 is wrong because that is when Clive held Arcot."
  },
  5: {
    questext: "Consider the following statements about European companies in India:\n1. Dupleix was the Governor of Chandernagore in 1730.\n2. The Danish sold their Indian settlements to the British in 1745.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 The Danish sold their settlements in 1845, exactly one hundred years after 1745. ❌ Statement 2 is wrong because the year given is a century too early."
  },
  6: {
    type: "concept", icon: "🏰", accent: "#f59e0b", pauseTimer: true,
    title: "The Carnatic Wars",
    html: `
      <p class="cp-lead">The Carnatic Wars were three wars fought between the British and the French on the south-east coast of India. <u>The British won, and French power in India came to an end.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/3.png" alt="Horizontal timeline with three boxes: First War 1746-48 (Aix-la-Chapelle), Second War 1749" data-caption="The three Carnatic Wars with their treaties in order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/4.png" alt="Robert Clive portrait painting" data-caption="Robert Clive, the British officer who held Arcot in 1751." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/5.png" alt="Wandiwash Fort Vandavasi Tamil Nadu photo" data-caption="The old fort at Wandiwash, near the battle of 1760." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Carnatic is the region of the south-east coast, ruled by a Nawab from Arcot. In each war the British and the French supported rival claimants and fought for trade and power.</p>
      <table><thead><tr><th>War</th><th>Main events</th><th>Treaty</th></tr></thead><tbody><tr><td>First (1746–48)</td><td>French force under La Bourdonnais took Madras in 1746. At Saint Thomé on the Adyar river, a small French force under Captain Paradise beat Mahfuz Khan, the Nawab's son.</td><td>Aix-la-Chapelle (1748)</td></tr><tr><td>Second (1749–54)</td><td>Dupleix backed Muzaffar Jung and Chanda Sahib. Robert Clive captured and held Arcot in 1751. Muhammad Ali Khan Walajah became Nawab of the Carnatic.</td><td>Pondicherry (1754)</td></tr><tr><td>Third (1758–63)</td><td>Count de Lally took Fort Saint David in 1758. Eyre Coote beat him at Wandiwash in 1760.</td><td>Paris (1763)</td></tr></tbody></table>
      <p class="cp-lead">The First War was part of the War of the Austrian Succession in Europe. It showed that a small army with European drill and artillery could defeat a much larger Indian army.</p>
      <p class="cp-lead">In the Second War, Anwaruddin was killed at Ambur in 1749, and Nasir Jung was killed in 1750. Clive's hold on Arcot turned the war, and Dupleix was recalled while Godeheu was sent to make peace.</p>
      <p class="cp-lead">The Third War was part of the Seven Years' War. Admiral Pocock beat the French fleet, Clive and Watson took Chandernagore, and the French lost Pondicherry. The Treaty of Paris left the French only with trading posts and no political power.</p>
      <div class="cp-note tip">The British won because they had a stronger navy and a rich base in Bengal, while the French government gave little support.</div>
      <div class="cp-note trap">The French captured Madras in 1746 but returned it in 1748. Do not think Madras was lost for good.</div>
      <div class="cp-note exam">Wandiwash 1760 is Eyre Coote against Lally, and Arcot 1751 is Clive.</div>
      <div class="cp-mnemonic">Treaties of the three wars, in order: A, P, P for Aix-la-Chapelle, Pondicherry, Paris.</div>
    `
  },
  7: {
    questext: "Which treaty ended the Third Carnatic War?",
    options: ["Aix-la-Chapelle", "Pondicherry", "Paris", "Madras"],
    correct: "3",
    exptext: "✅ The Treaty of Paris of 1763 ended the Third Carnatic War and French power in India. 📌 Treaties go A, P, P, so the last P is Paris. ❌ The Treaty of Madras of 1769 is tempting, but it ended the First Anglo-Mysore War."
  },
  8: {
    questext: "In the Battle of Wandiwash in 1760, who defeated the French commander Count de Lally?",
    options: ["Robert Clive", "Eyre Coote", "Hector Munro", "Arthur Wellesley"],
    correct: "2",
    exptext: "✅ Eyre Coote defeated Lally at Wandiwash and broke French strength in the south. 📌 Wandiwash and Coote both fit the Third War. ❌ Robert Clive is wrong because he was busy in Bengal at that time."
  },
  9: {
    questext: "Which one of the following pairs of the Carnatic Wars and the treaties that ended them is NOT correctly matched?",
    options: ["First War — Aix-la-Chapelle", "Second War — Pondicherry", "Third War — Paris", "First War — Pondicherry"],
    correct: "4",
    exptext: "✅ The pair in option 4 is wrong because the Treaty of Pondicherry ended the Second War. 📌 Use the A, P, P order for First, Second and Third. ❌ Option 1 is tempting but it is correct, because Aix-la-Chapelle ended the First War."
  },
  10: {
    questext: "Consider the following statements about the Second Carnatic War:\n1. Robert Clive captured and held Arcot in 1751.\n2. Muhammad Ali Khan Walajah became the Nawab of the Carnatic.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Clive's hold on Arcot helped the British side, and their candidate Walajah became Nawab. 📌 The winner of the war chooses the Nawab. ❌ Choosing only one statement forgets that both facts belong to the same war."
  },
  11: {
    type: "concept", icon: "⚔️", accent: "#ef4444", pauseTimer: true,
    title: "Acquisition of Bengal — Siraj-ud-Daula and Plassey",
    html: `
      <p class="cp-lead">Bengal was the richest province of the Mughal Empire. <u>The Battle of Plassey in 1757 made the Company a political power in India.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/6.png" alt="Plassey battlefield monument Murshidabad photo" data-caption="The memorial at Plassey, where the Company won in 1757." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/7.png" alt="Clive meets Mir Jafar after Plassey painting" data-caption="Clive meeting Mir Jafar after the Battle of Plassey." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/8.png" alt="Chain of five boxes: Calcutta captured 1756, Black Hole, Treaty of Alinagar Feb 1757, Plas" data-caption="The chain of events from Calcutta to Plassey." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Bengal then included present-day West Bengal, Bangladesh, Bihar and Odisha. About 60 percent of British imports from Asia came from Bengal. The Company had settlements at Balasore, Hooghly, Kasimbazar, Patna and Dacca.</p>
      <p class="cp-lead">Alivardi Khan died in April 1756, and his grandson <b>Siraj-ud-Daula</b> became Nawab. The Company was misusing the <b>Shahi Farman of 1717</b>, a royal order of Emperor Farrukhsiyar that gave it free trade. It also sheltered Krishna Das, son of Raj Ballabh, and fortified Calcutta without permission.</p>
      <p class="cp-lead">Siraj captured Calcutta (Fort William), and the British fled to Phulta Island. The Black Hole Tragedy then happened, in which Holwell said that 146 people were locked in a small room and 123 died. Siraj renamed Calcutta as <b>Alinagar</b>. Manik Chand took a bribe and returned the fort, and Robert Clive marched from Madras to take revenge.</p>
      <table><thead><tr><th>Item</th><th>Details</th></tr></thead><tbody><tr><td>Date</td><td>23 June 1757</td></tr><tr><td>Nawab's side</td><td>About 50,000 soldiers under Siraj-ud-Daula</td></tr><tr><td>Company's side</td><td>About 1,100 Europeans and 200 Indians under Robert Clive</td></tr><tr><td>Traitors</td><td>Mir Jafar (army chief), Manik Chand, Omichand, Jagat Seth and Rai Durlabh</td></tr><tr><td>Loyal to Siraj</td><td>Mir Madan and Mohanlal, who died fighting</td></tr></tbody></table>
      <p class="cp-lead">Before the battle, Clive and the Nawab signed the Treaty of Alinagar in February 1757, which gave the Company back Calcutta, the right to mint coins and compensation. After Plassey, Mir Jafar became Nawab and gave the Company the zamindari of 24 Parganas and free trade in Bengal, Bihar and Odisha.</p>
      <p class="cp-lead">Siraj was captured and killed at Murshidabad by Muhammad Beg on the orders of Miran, the son of Mir Jafar. The Company became a <b>King Maker</b>, because it could now put its own man on the throne.</p>
      <div class="cp-note trap">Plassey was won by treachery more than by fighting. Clive won because the Nawab's own commanders stayed out of the battle.</div>
      <div class="cp-note exam">Plassey was fought on 23 June 1757, and the Treaty of Alinagar was signed earlier, in February 1757.</div>
    `
  },
  12: {
    questext: "Who among the following was NOT a conspirator against Siraj-ud-Daula before the Battle of Plassey?",
    options: ["Mir Jafar", "Jagat Seth", "Rai Durlabh", "Mohanlal"],
    correct: "4",
    exptext: "✅ Mohanlal stayed loyal and died fighting for the Nawab. 📌 Mir Madan and Mohanlal are the loyal pair. ❌ Rai Durlabh is tempting, but he was an army commander who held back his troops."
  },
  13: {
    questext: "When the British were driven out of Calcutta in 1756, they fled to which place?",
    options: ["Phulta Island", "Chandernagore", "Madras", "Dacca"],
    correct: "1",
    exptext: "✅ The British fled to Phulta Island, a place downstream on the Hooghly river. 📌 Phulta sounds like \"flee\". ❌ Chandernagore is wrong because it was a French settlement."
  },
  14: {
    questext: "Siraj-ud-Daula renamed Calcutta as which name after capturing it?",
    options: ["Murshidabad", "Alinagar", "Islamabad", "Munger"],
    correct: "2",
    exptext: "✅ Siraj named Calcutta Alinagar, after his grandfather Alivardi Khan. 📌 Alivardi leads to Alinagar. ❌ Murshidabad is tempting, but it was the capital of Bengal and not a new name for Calcutta."
  },
  15: {
    questext: "Consider the following statements:\n1. The Shahi Farman of 1717 was issued by Emperor Farrukhsiyar.\n2. After Plassey, Mir Jafar gave the Company the zamindari of 24 Parganas.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 The Farman of 1717 gave free trade, and 24 Parganas was the reward for the Company in 1757. ❌ Choosing only one of them misses that both facts belong to the story of Bengal."
  },
  16: {
    type: "concept", icon: "🛡️", accent: "#8b5cf6", pauseTimer: true,
    title: "Mir Jafar to Mir Qasim and the Battle of Buxar",
    html: `
      <p class="cp-lead">Mir Jafar could not satisfy the Company's money demands, so the Company replaced him. <u>The Battle of Buxar in 1764 finished what Plassey had started.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/9.png" alt="Flow of three boxes: Plassey 1757 King Maker, Giria 1763 Mir Qasim flees, Buxar 1764 real " data-caption="From Plassey to Buxar: three steps to control of Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/10.png" alt="Battle of Buxar 1764 painting Hector Munro" data-caption="The Battle of Buxar, fought on 22 October 1764." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Mir Jafar leaned toward the Dutch, who were beaten at Bedara in November 1759. The Company then made <b>Mir Qasim</b> the Nawab. This change is called the <b>Revolution of 1760</b>, and it happened under Governor Vansittart.</p>
      <table><thead><tr><th>Step taken</th><th>Details</th></tr></thead><tbody><tr><td>Payments to the Company</td><td>Gave Burdwan, Midnapur and Chittagong, paid 5 lakh rupees for the war in south India and a tribute of 29 lakh rupees</td></tr><tr><td>New capital</td><td>Moved the capital from Murshidabad to Munger in Bihar, away from the Company</td></tr><tr><td>Army</td><td>Set up an ordnance factory and trained soldiers in European style</td></tr><tr><td>Trade</td><td>Abolished all internal trade duties</td></tr></tbody></table>
      <p class="cp-lead">A <b>dastak</b> was a duty-free pass for the Company's trade. Company servants, called Interlopers, misused it for their private trade, so Indian traders paid taxes and lost business. Mir Qasim removed all internal duties so that everyone paid the same. The Company was angry, and war began in July 1763.</p>
      <p class="cp-lead">At <b>Giria</b>, near Vardhaman, in 1763 the Company won. Mir Qasim fled to Awadh, and Mir Jafar was made Nawab again.</p>
      <p class="cp-lead">At <b>Buxar</b> on 22 October 1764, Hector Munro of the Company defeated the joint army of Mir Qasim (whose army chief was Gurgin Khan), Shuja-ud-Daula of Awadh and the Mughal emperor Shah Alam II. Shah Alam II took British protection, Shuja surrendered, and Mir Qasim fled to Delhi, where he died in 1777.</p>
      <div class="cp-note trap">Plassey made the Company a King Maker, but Buxar made it the real, or de facto, ruler of Bengal.</div>
      <div class="cp-note exam">Buxar was fought on 22 October 1764 and the British commander was Hector Munro.</div>
    `
  },
  17: {
    questext: "To get away from the Company's control, Mir Qasim shifted his capital from Murshidabad to which place?",
    options: ["Patna", "Dacca", "Munger", "Hooghly"],
    correct: "3",
    exptext: "✅ Mir Qasim moved to Munger in Bihar and built a gun factory there. 📌 Munger and Munition sound alike. ❌ Patna is tempting, but it was only a Company trading settlement."
  },
  18: {
    questext: "Which of the following was NOT a part of the alliance defeated by the Company at the Battle of Buxar?",
    options: ["Mir Qasim", "Shuja-ud-Daula", "Shah Alam II", "Mir Jafar"],
    correct: "4",
    exptext: "✅ Mir Jafar was on the Company's side and was made Nawab again in 1763. 📌 The three losers were the Nawab of Bengal, the Nawab of Awadh and the emperor. ❌ Shah Alam II is tempting, but he did fight at Buxar and lost."
  },
  19: {
    questext: "Consider the following statements:\n1. Mir Qasim abolished all internal trade duties.\n2. The Battle of Giria was fought in 1764.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Giria came in 1763 before Buxar in 1764. ❌ Statement 2 is wrong because 1764 is the year of Buxar, not Giria."
  },
  20: {
    type: "concept", icon: "📜", accent: "#14b8a6", pauseTimer: true,
    title: "Treaties of Allahabad and the Dual Government",
    html: `
      <p class="cp-lead">After Buxar, two treaties signed at Allahabad in 1765 gave the Company the right to collect the revenue of Bengal. <u>The Company then ruled through a system called the Dual Government.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/11.png" alt="Two-column chart: Treaty of Allahabad I, 12 August 1765, with Shah Alam II; Treaty of Alla" data-caption="The two Treaties of Allahabad and their main terms." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/12.png" alt="Robert Clive Shah Alam II Treaty of Allahabad painting" data-caption="Clive receiving the Diwani from Emperor Shah Alam II." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Treaty</th><th>Date</th><th>Main terms</th></tr></thead><tbody><tr><td>Allahabad I</td><td>12 August 1765</td><td>Shah Alam II gave the Diwani of Bengal, Bihar and Odisha to the Company. Kara and Allahabad were taken from Awadh and given to the emperor, who received a pension of 26 lakh rupees a year.</td></tr><tr><td>Allahabad II</td><td>16 August 1765</td><td>Shuja-ud-Daula got Awadh back except Kara and Allahabad. British soldiers stayed at the Nawab's cost, the Company got free trade and the Nawab paid 50 lakh rupees as indemnity.</td></tr></tbody></table>
      <p class="cp-lead"><b>Diwani</b> means the right to collect land revenue and settle civil cases. Robert Clive was the Governor of the Company when it received this right.</p>
      <p class="cp-lead">The Company also controlled criminal justice and defence, called the <b>Nizamat</b>, through deputies: Muhammad Raza Khan in Bengal, Shitab Rai in Bihar and Rai Durlabh in Odisha. This is called the <b>Dual Government</b> because there were two rulers, the Company and the Nawab.</p>
      <p class="cp-lead">In this system the Company had power without responsibility, while the Nawab had responsibility without power. Nobody cared for the farmers, and the Great Bengal Famine of 1770 caused terrible suffering. Warren Hastings ended the system in 1772.</p>
      <div class="cp-note trap">Do not mix up the dates. On 12 August the treaty was with Shah Alam II, and on 16 August it was with Shuja-ud-Daula.</div>
      <div class="cp-note exam">The Dual Government lasted from 1765 to 1772, and Warren Hastings ended it.</div>
    `
  },
  21: {
    questext: "By the First Treaty of Allahabad in 1765, Shah Alam II granted the Diwani of which provinces to the Company?",
    options: ["Awadh, Bihar and Odisha", "Bengal, Bihar and Odisha", "Bengal, Awadh and Bihar", "Bengal, Odisha and Allahabad"],
    correct: "2",
    exptext: "✅ The Company received the Diwani of Bengal, Bihar and Odisha. 📌 Awadh stayed with Shuja-ud-Daula. ❌ Option 3 is tempting, but the Awadh Nawab got his own land back in the second treaty."
  },
  22: {
    questext: "Under the Dual Government in Bengal, who was the deputy who looked after Bengal for the Company?",
    options: ["Shitab Rai", "Rai Durlabh", "Mir Jafar", "Muhammad Raza Khan"],
    correct: "4",
    exptext: "✅ Muhammad Raza Khan was the deputy for Bengal. 📌 Shitab Rai looked after Bihar and Rai Durlabh looked after Odisha. ❌ Mir Jafar is wrong because he died in 1765 and was not a deputy."
  },
  23: {
    questext: "Consider the following statements:\n1. Shuja-ud-Daula paid 50 lakh rupees as indemnity to the Company.\n2. The Dual Government was ended by Lord Cornwallis.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Warren Hastings ended the Dual Government in 1772. ❌ Statement 2 is wrong because Cornwallis came much later, in 1786."
  },
  24: {
    type: "concept", icon: "🚩", accent: "#ec4899", pauseTimer: true,
    title: "The Three Anglo-Maratha Wars",
    html: `
      <p class="cp-lead">The Marathas were the strongest Indian power after the Mughals. <u>Three wars, fought between 1775 and 1819, ended their rule and left the British as the main power of India.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/13.png" alt="Shaniwar Wada Pune fort gate photo" data-caption="Shaniwar Wada in Pune, the seat of the Peshwas." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/14.png" alt="Timeline with three boxes: First War 1775-82 ends with Salbai, Second War 1803-05 ends wit" data-caption="The three Anglo-Maratha Wars and their outcomes in order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/15.png" alt="Battle of Assaye 1803 painting Arthur Wellesley" data-caption="The Battle of Assaye, won by Wellesley in 1803." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Marathas lost badly at Panipat in 1761 but recovered under Madhav Rao. After his death in 1772 the Maratha state split among four chiefs: Scindia, Holkar, Gaikwad and Bhonsle. Their quarrels let the British step in.</p>
      <table><thead><tr><th>War</th><th>Cause</th><th>Treaties</th><th>Result</th></tr></thead><tbody><tr><td>First (1775–82)</td><td>Narayan Rao was murdered in 1773 by his uncle Raghunath Rao (Raghoba), who sought British help</td><td>Surat 1775, Purandar 1776, Wadgaon 1779, Salbai 1782</td><td>Peace for about twenty years; Salsette stayed with the British</td></tr><tr><td>Second (1803–05)</td><td>Peshwa Bajirao II was beaten by Holkar at Hadapsar and fled to Bassein</td><td>Bassein 1802, Deogaon 1803, Surji-Anjangaon 1803, Rajpurghat 1805</td><td>Subsidiary Alliance imposed</td></tr><tr><td>Third (1817–19)</td><td>Attacks of Lord Hastings on the Pindaris; the Marathas attacked the Poona Residency</td><td>Poona 1817</td><td>Peshwa abolished in 1818</td></tr></tbody></table>
      <p class="cp-lead">In the First War, the Bombay force lost at Talegaon in 1779 and signed the <b>Convention of Wadgaon</b>, but Warren Hastings refused it. The war ended with the <b>Treaty of Salbai</b> in 1782, helped by Mahadji Scindia. Raghoba was pensioned, and the infant Madhav Rao Narayan was accepted as Peshwa. The rivalry of Nana Phadnavis and Mahadji Scindia kept the Marathas divided.</p>
      <p class="cp-lead">In the Second War, Peshwa Bajirao II signed the <b>Treaty of Bassein</b> in 1802. He accepted a British army at Poona, gave up some land to pay for it, handed over his foreign relations and agreed to dismiss all Europeans from service. Arthur Wellesley beat Scindia and Raghuji Bhonsle II at Assaye on 23 September 1803, and General Lake took Delhi and Agra.</p>
      <p class="cp-lead">In the Third War, Bhonsle lost at Sitabuldi and Holkar lost at Mahidpur. The Peshwa's state was joined to the Bombay Presidency, and Bajirao II was sent to Bithur near Kanpur with a pension. A descendant of Shivaji became the nominal king of Satara, which was annexed in 1848 under the Doctrine of Lapse.</p>
      <div class="cp-note trap">Wadgaon (1779) was a Convention, not a treaty. No treaty ended the Fourth Anglo-Mysore War either.</div>
      <div class="cp-note exam">Remember the order of the treaties: Surat, Purandar, Wadgaon, Salbai, Bassein, Poona.</div>
      <div class="cp-mnemonic">Treaties in order: Surat, Purandar, Wadgaon, Salbai, Bassein, Poona.</div>
    `
  },
  25: {
    questext: "The Treaty of Salbai (1782), which ended the First Anglo-Maratha War, was mediated by which Maratha leader?",
    options: ["Nana Phadnavis", "Jaswant Rao Holkar", "Mahadji Scindia", "Raghuji Bhonsle"],
    correct: "3",
    exptext: "✅ Mahadji Scindia mediated the Treaty of Salbai, which brought peace for about twenty years. 📌 Salbai and Scindia both start with the letter S. ❌ Nana Phadnavis is tempting, but he was the rival minister at Poona."
  },
  26: {
    questext: "Through which treaty was the Subsidiary Alliance imposed on the Peshwa Bajirao II?",
    options: ["Bassein (1802)", "Poona (1817)", "Purandar (1776)", "Salbai (1782)"],
    correct: "1",
    exptext: "✅ The Peshwa accepted the Subsidiary Alliance in the Treaty of Bassein of 1802. 📌 Bassein is in the Second War, and Poona is in the Third. ❌ The Treaty of Poona is wrong because it came in 1817, after the Subsidiary Alliance."
  },
  27: {
    questext: "Consider the following statements:\n1. The Marathas won the Battle of Panipat in 1761.\n2. After the Third Anglo-Maratha War, Bajirao II was sent to Bithur with a pension.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Panipat 1761 was a heavy Maratha defeat, and the Peshwa was pensioned in 1818. ❌ Statement 1 is wrong because the Afghans under Ahmad Shah Abdali won at Panipat."
  },
  28: {
    questext: "After the Third Anglo-Maratha War, the last Peshwa Bajirao II was given a pension and settled at which place?",
    options: ["Satara", "Nagpur", "Indore", "Bithur"],
    correct: "4",
    exptext: "✅ Bajirao II lived at Bithur near Kanpur on a British pension. 📌 Bithur is also the home of Nana Sahib, his adopted son. ❌ Satara is tempting, but it was given to a descendant of Shivaji as a small kingdom."
  },
  29: {
    type: "concept", icon: "🐯", accent: "#f97316", pauseTimer: true,
    title: "The Four Anglo-Mysore Wars",
    html: `
      <p class="cp-lead">Mysore was the strongest power in the south during the rule of Hyder Ali and Tipu Sultan. <u>Four wars were fought, and the fourth one ended with the death of Tipu.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/16.png" alt="Srirangapatna Tipu Sultan fort ruins photo" data-caption="The fort of Srirangapatna, where Tipu Sultan died in 1799." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/17.png" alt="Flow of four boxes: Madras 1769, Mangalore 1784, Srirangapatna 1792, Tipu killed 1799, eac" data-caption="The four Mysore wars with their treaties in order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Mysore was ruled by the Wadiyar family. Hyder Ali rose as a general, became Faujdar of Dindigul in 1755 and the real ruler in 1761, and called himself king in 1776. He was helped by French-made weapons.</p>
      <table><thead><tr><th>War</th><th>Sides</th><th>Treaty</th><th>Result</th></tr></thead><tbody><tr><td>First (1767–69)</td><td>Hyder Ali against the British, the Nizam and the Marathas</td><td>Madras (1769)</td><td>Conquests returned; mutual help promised</td></tr><tr><td>Second (1780–84)</td><td>Hyder Ali and Tipu against Warren Hastings and Eyre Coote</td><td>Mangalore (1784)</td><td>Hyder died in 1782; the French withdrew</td></tr><tr><td>Third (1790–92)</td><td>Tipu against Cornwallis, the Marathas and the Nizam</td><td>Srirangapatna (1792)</td><td>Half the kingdom and 3 crore rupees lost</td></tr><tr><td>Fourth (1799)</td><td>Tipu against Wellesley, the Marathas and the Nizam</td><td>None</td><td>Tipu killed on 4 May 1799</td></tr></tbody></table>
      <p class="cp-lead">In the First War, Hyder Ali defeated the British and forced them to sign the Treaty of Madras. He is called the first Indian power to defeat the British. In the Second War, he was angry that the British did not help him against the Marathas in 1771. He beat Colonel Baillie, but Eyre Coote won at Porto Novo in November 1781.</p>
      <p class="cp-lead">In the Third War, Tipu attacked Travancore in April 1790 because it had bought Jalkottal and Cannanore from the Dutch. Cornwallis took Vellore and Bangalore and besieged Srirangapatna. By the Treaty of Srirangapatna, Tipu gave half his kingdom, paid 3 crore rupees and left two sons as hostages. The British got Baramahal, Dindigul and Malabar.</p>
      <p class="cp-lead">In the Fourth War, Tipu refused the Subsidiary Alliance of Wellesley and welcomed French soldiers. He joined the Jacobin Club, called himself <b>Citizen Tipu</b>, planted a Tree of Liberty at Seringapatam and wrote to Napoleon. He died fighting on 4 May 1799. Mysore was handed to the Wadiyar prince Krishnaraja III under a subsidiary treaty.</p>
      <div class="cp-note trap">No treaty ended the Fourth War, because Tipu died in battle. Do not write Srirangapatna for 1799.</div>
      <div class="cp-note exam">Treaties in order: Madras 1769, Mangalore 1784, Srirangapatna 1792.</div>
      <div class="cp-mnemonic">Treaties go M, M, S: Madras, Mangalore, Srirangapatna.</div>
    `
  },
  30: {
    questext: "Who among the following is regarded as the first Indian ruler to defeat the British in a war?",
    options: ["Tipu Sultan", "Hyder Ali", "Mahadji Scindia", "Siraj-ud-Daula"],
    correct: "2",
    exptext: "✅ Hyder Ali defeated the British in the First Anglo-Mysore War and forced the Treaty of Madras. 📌 The father was first and the son came later. ❌ Tipu Sultan is tempting, but he fought in the later wars and lost."
  },
  31: {
    questext: "Which treaty ended the Second Anglo-Mysore War?",
    options: ["Mangalore", "Madras", "Srirangapatna", "Bassein"],
    correct: "1",
    exptext: "✅ The Treaty of Mangalore of 1784 ended the Second War, and Tipu signed it. 📌 Treaties go M, M, S for the first three wars. ❌ The Treaty of Madras is tempting, but it ended the First War."
  },
  32: {
    questext: "Under the Treaty of Srirangapatna (1792), Tipu Sultan had to pay a war indemnity of how many crore rupees, along with giving half of his kingdom?",
    options: ["1 crore", "2 crore", "3 crore", "5 crore"],
    correct: "3",
    exptext: "✅ Tipu paid 3 crore rupees and gave half of his lands. 📌 Third War and three crore go together. ❌ The amount of 5 crore is wrong, because Tipu paid only three crore and gave two sons as hostages."
  },
  33: {
    questext: "Consider the following statements:\n1. The Fourth Anglo-Mysore War ended with a treaty signed by Tipu Sultan.\n2. The Third Anglo-Mysore War was fought between Tipu Sultan and Lord Wellesley.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "4",
    exptext: "✅ Neither statement is correct. Tipu died in the Fourth War without any treaty, and Cornwallis fought the Third War. 📌 Wellesley goes with the Fourth War. ❌ Choosing statement 2 mixes up Cornwallis and Wellesley."
  },
  34: {
    type: "concept", icon: "🦁", accent: "#84cc16", pauseTimer: true,
    title: "Anglo-Sikh Relations",
    html: `
      <p class="cp-lead">After the death of Maharaja Ranjit Singh, the Sikh kingdom fell into anarchy. <u>Two wars followed, and Punjab was annexed by the British in 1849.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/18.png" alt="Battle of Sobraon 1846 painting" data-caption="The Battle of Sobraon, the decisive fight of 1846." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/19.png" alt="Maharaja Duleep Singh portrait Winterhalter" data-caption="Maharaja Duleep Singh, the last Sikh ruler of Punjab." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/20.png" alt="Timeline with five boxes: Ranjit Singh dies 1839, First War 1845-46, Treaty of Lahore Marc" data-caption="From the death of Ranjit Singh to annexation in order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Ranjit Singh died in 1839. Kharak Singh and Nau Nihal Singh died soon after, and in September 1843 the child <b>Duleep Singh</b> became Maharaja with his mother <b>Rani Jindan</b> as regent. The army and the court fought for power, and the army became very strong.</p>
      <table><thead><tr><th>War</th><th>Main events</th><th>Treaty or result</th></tr></thead><tbody><tr><td>First (1845–46)</td><td>Governor-General Hardinge and Sir Hugh Gough. Battles at Mudki (December 1845), Ferozeshah (December 1845), Baddowal and Aliwal (January 1846), and decisive Sobraon (February 1846)</td><td>Treaty of Lahore, 9 March 1846</td></tr><tr><td>Second (1848–49)</td><td>Revolt of Mulraj, the governor of Multan. Dalhousie declared war. Ramnagar (November 1848), Chillianwala (January 1849), and decisive Gujrat (February 1849)</td><td>Punjab annexed on 29 March 1849</td></tr></tbody></table>
      <p class="cp-lead">By the <b>Treaty of Lahore</b> of March 1846, the Sikhs gave up the land south of the Sutlej river, kept Duleep Singh as Maharaja, and made Lal Singh the Wazir. By the Treaty of Bhairowal in December 1846, a British army stayed at Lahore until the Maharaja grew up, and a council of Sikh chiefs worked under the British Resident.</p>
      <p class="cp-lead">After the Second War, Lord Dalhousie annexed Punjab. Rani Jind Kaur was imprisoned, and the eleven-year-old Duleep Singh was sent to England with a pension of about 5 lakh rupees. The famous <b>Kohinoor</b> diamond was taken away.</p>
      <p class="cp-lead">Under the <b>Treaty of Amritsar</b> of 16 March 1846, Kashmir was sold to Gulab Singh of Jammu for 75 lakh rupees.</p>
      <div class="cp-note trap">The Treaty of Lahore (9 March 1846) and the Treaty of Amritsar (16 March 1846) are different. One ended the war and the other sold Kashmir.</div>
      <div class="cp-note exam">The decisive battle of the First War was Sobraon, and of the Second War it was Gujrat.</div>
    `
  },
  35: {
    questext: "Which battle was the decisive one in the First Anglo-Sikh War?",
    options: ["Mudki", "Ferozeshah", "Aliwal", "Sobraon"],
    correct: "4",
    exptext: "✅ The Battle of Sobraon in February 1846 broke the Sikh army, and the Treaty of Lahore followed. 📌 Sobraon is the last battle of the first war. ❌ Aliwal is tempting, but it was a smaller battle fought a month earlier."
  },
  36: {
    questext: "The Second Anglo-Sikh War began after a revolt led by the governor of which place?",
    options: ["Lahore under Lal Singh", "Multan under Mulraj", "Jammu under Gulab Singh", "Peshawar under Tej Singh"],
    correct: "2",
    exptext: "✅ Mulraj, the governor of Multan, revolted, and Dalhousie used it to declare war. 📌 Mulraj goes with Multan. ❌ Gulab Singh is tempting, but he sided with the British and got Kashmir."
  },
  37: {
    questext: "Consider the following statements:\n1. By the Treaty of Amritsar of 1846, Kashmir was sold to Gulab Singh for 75 lakh rupees.\n2. Punjab was annexed by Lord Dalhousie in 1849.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 The two facts are seven years apart, 1846 and 1849. ❌ Choosing only one forgets that Gulab Singh bought Kashmir first, and Punjab was annexed later."
  },
  38: {
    questext: "On which date was Punjab annexed by the British after the Second Anglo-Sikh War?",
    options: ["29 March 1849", "16 March 1846", "9 March 1846", "21 February 1849"],
    correct: "1",
    exptext: "✅ Punjab was annexed on 29 March 1849. 📌 The year 1849 follows the Gujrat battle of February 1849. ❌ The date of 16 March 1846 is tempting, but that is the Treaty of Amritsar."
  },
  39: {
    type: "concept", icon: "🌏", accent: "#06b6d4", pauseTimer: true,
    title: "Nepal and Burma",
    html: `
      <p class="cp-lead">The British pushed the frontier of India in the north and the east by fighting Nepal and Burma. <u>Each war ended with a treaty that gave the British land.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/21.png" alt="Two-column chart: Anglo-Nepalese War 1814-16 ends with Sugauli; Anglo-Burmese Wars 1824-26" data-caption="The Nepal and Burma wars with the treaties that ended them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/22.png" alt="Mandalay Palace Myanmar photo" data-caption="Mandalay Palace, home of the last Burmese king, Thibaw." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Nepal first met the Company during the time of Nawab Mir Qasim. In 1801 the British took Gorakhpur, which gave the two sides a common border. Under Lord Hastings (1813–23), Nepal seized Sheoraj and Butwal, and this led to the <b>Anglo-Nepalese (Gorkha) War of 1814–16</b>.</p>
      <p class="cp-lead">The war ended with the <b>Treaty of Sugauli</b> in 1816. Kumaon and Garhwal went to Britain, Nepal gave up its claim on Sikkim, and a British Resident was kept at Kathmandu.</p>
      <table><thead><tr><th>Burmese war</th><th>Cause</th><th>Result</th></tr></thead><tbody><tr><td>First (1824–26)</td><td>Burma took Assam, Manipur and Arakan and seized Shahpuri Island near Chittagong</td><td>Treaty of Yandabo (1826): Britain got Arakan, Tenasserim and Assam; Lord Amherst was titled Earl of Arakan</td></tr><tr><td>Second (1852–53)</td><td>The Burmese king Pagan Min rejected the Treaty of Yandabo; Commodore Lambert sent warships to Rangoon</td><td>Pegu annexed without any treaty</td></tr><tr><td>Third (1885–86)</td><td>Dispute with the Bombay-Burma Trading Corporation</td><td>All of Burma annexed in two months</td></tr></tbody></table>
      <p class="cp-lead">Burma was separated from British India in <b>1937</b> under the Government of India Act 1935.</p>
      <div class="cp-note trap">The Treaty of Yandabo (1826) belongs to Burma, and the Treaty of Sugauli (1816) belongs to Nepal.</div>
      <div class="cp-note exam">Pegu was annexed in 1852 without a treaty, in the time of Dalhousie.</div>
    `
  },
  40: {
    questext: "Which treaty ended the Anglo-Nepalese (Gorkha) War of 1814–16?",
    options: ["Yandabo", "Sugauli", "Gandamak", "Lhasa"],
    correct: "2",
    exptext: "✅ The Treaty of Sugauli of 1816 gave Kumaon and Garhwal to Britain. 📌 Sugauli starts with S, as does Sikkim, which Nepal gave up. ❌ Yandabo is tempting, but it ended the First Anglo-Burmese War."
  },
  41: {
    questext: "In which year was Burma separated from British India?",
    options: ["1886", "1926", "1937", "1947"],
    correct: "3",
    exptext: "✅ Burma was separated in 1937 under the Government of India Act 1935. 📌 The Act of 1935 took effect in 1937. ❌ The year 1886 is tempting, but that is the year when Burma was annexed."
  },
  42: {
    questext: "Consider the following statements:\n1. By the Treaty of Sugauli, Nepal gave up its claim on Sikkim.\n2. Pegu was annexed by Lord Dalhousie after the Third Anglo-Burmese War.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Pegu belongs to the Second War of 1852. ❌ Statement 2 is wrong because the Third War of 1885–86 ended with the annexation of all Burma, not Pegu."
  },
  43: {
    type: "concept", icon: "🧭", accent: "#a855f7", pauseTimer: true,
    title: "Afghanistan and Tibet",
    html: `
      <p class="cp-lead">The British feared that Russia would reach India through Afghanistan and Tibet. <u>To protect the north-west and the north, they fought three wars in Afghanistan and sent one army to Tibet.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/23.png" alt="Remnants of an Army painting First Afghan War retreat" data-caption="The retreat of the British army from Kabul in 1842." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/24.png" alt="Younghusband expedition Lhasa 1904 photo" data-caption="The British expedition entering Tibet in 1904." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/25.png" alt="Frontier match chart: Sugauli 1816 Nepal, Yandabo 1826 Burma, Gandamak 1879 Afghanistan, L" data-caption="Match each frontier with the treaty that settled it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>War</th><th>Main events</th><th>Result</th></tr></thead><tbody><tr><td>First Afghan (1839–42)</td><td>Lord Auckland feared Russia. Dost Mohammad refused to agree, and the Burnes mission failed. The Tripartite Treaty of June 1838 was signed by Ranjit Singh, Shah Shuja and the British.</td><td>The British entered Kabul in August 1839 but lost about 20,000 men and 1.5 crore rupees; Shah Shuja was killed</td></tr><tr><td>Second Afghan (1878–80)</td><td>Lord Lytton asked Amir Sher Ali to accept a British Resident; he refused and fled. His son Yakub Khan signed the Treaty of Gandamak on 26 May 1879</td><td>A British Resident at Kabul; Afghan foreign affairs under Britain</td></tr><tr><td>Third Afghan (1919)</td><td>Habibullah Khan was killed on 20 February 1919, and his son Amanullah Khan opposed the alliance</td><td>Afghans were beaten in 10 days; the Treaty of Rawalpindi gave full independence</td></tr></tbody></table>
      <p class="cp-lead">In the Second War, Major Cavagnari, the British Resident, was killed in September 1879, and the British marched into Kabul again. Yakub Khan was imprisoned at Dehradun. Abdur Rahman became the Amir, and under Lord Ripon, Afghanistan was kept as a buffer state between Russia and India. In 1891–92, Hunza and Nagar in Gilgit were taken, and the <b>Durand Line</b> was drawn as the border.</p>
      <p class="cp-lead"><b>Tibet</b> had a North-East Frontier Policy. The mission of Warren Hastings in 1775 failed, and an attack on Tibetans in Sikkim in 1888 did not give lasting results. In 1904, Lord Curzon sent Colonel Younghusband, afraid of Russian influence, and the <b>Treaty of Lhasa</b> ended his expedition. The <b>Shimla Accord of 1914</b> between Britain, China and Tibet split Tibet into Outer and Inner Tibet.</p>
      <div class="cp-note trap">The Treaty of Gandamak (1879) belongs to Afghanistan, and the Treaty of Lhasa (1904) belongs to Tibet. Do not swap them.</div>
      <div class="cp-note exam">The Second Afghan War brought the Durand Line, and the Third Afghan War of 1919 gave Afghanistan its independence.</div>
    `
  },
  44: {
    questext: "The Second Anglo-Afghan War ended with the Treaty of Gandamak, signed by which Afghan ruler?",
    options: ["Dost Mohammad", "Sher Ali", "Yakub Khan", "Amanullah Khan"],
    correct: "3",
    exptext: "✅ Yakub Khan, the son of Sher Ali, signed the Treaty of Gandamak in May 1879. 📌 Sher Ali fled and his son signed. ❌ Sher Ali is tempting, but he had fled before the treaty and died soon after."
  },
  45: {
    questext: "Which Afghan ruler was killed on 20 February 1919, which led to the Third Anglo-Afghan War?",
    options: ["Habibullah Khan", "Amanullah Khan", "Abdur Rahman", "Dost Mohammad"],
    correct: "1",
    exptext: "✅ The pro-British Habibullah Khan was killed, and his son Amanullah began the war. 📌 The father was killed and the son fought. ❌ Amanullah is tempting, but he came to the throne after the killing."
  },
  46: {
    questext: "The Tripartite Treaty of June 1838 was signed between the British, Ranjit Singh and which other person?",
    options: ["Dost Mohammad", "Shah Shuja", "Sher Ali", "Yakub Khan"],
    correct: "2",
    exptext: "✅ Shah Shuja, the exiled ruler, joined the treaty so that he could be put on the throne of Kabul. 📌 Tripartite means three, and Shah Shuja was the third. ❌ Dost Mohammad is wrong because he was the ruler that the treaty aimed to remove."
  },
  47: {
    questext: "Consider the following statements:\n1. The Treaty of Lhasa ended the British expedition to Tibet in 1904.\n2. The Shimla Accord of 1914 split Tibet into Outer and Inner Tibet.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Younghusband led the 1904 expedition and Shimla set up the Outer and Inner division. ❌ Choosing only one forgets that both facts are about Tibet."
  },
  48: {
    type: "concept", icon: "👑", accent: "#eab308", pauseTimer: true,
    title: "Tipu Sultan and Ranjit Singh",
    html: `
      <p class="cp-lead">Tipu Sultan and Ranjit Singh were two of the strongest Indian rulers who faced the British. <u>Both built modern armies, but both lost their states soon after.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/26.png" alt="Tipu Sultan portrait painting" data-caption="Tipu Sultan, the ruler of Mysore from 1782 to 1799." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/27.png" alt="Maharaja Ranjit Singh portrait painting" data-caption="Maharaja Ranjit Singh, who ruled Punjab from 1799 to 1839." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/28.png" alt="Two-column comparison: Tipu Sultan (Mysore, navy 1796, rockets, Badshah) and Ranjit Singh " data-caption="Tipu Sultan and Ranjit Singh compared in simple points." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Tipu Sultan</th><th>Ranjit Singh</th></tr></thead><tbody><tr><td>Languages and skills</td><td>Knew Arabic, Persian, Urdu and Kannada</td><td>Became a Misl chief at age twelve in 1792</td></tr><tr><td>Army</td><td>Trained in European style; started a navy in 1796</td><td>Trained by Allard, Ventura, Court and Gardner</td></tr><tr><td>Special steps</td><td>Took the title Badshah and issued coins in his own name</td><td>Took Lahore in 1799 and made it his capital</td></tr></tbody></table>
      <p class="cp-lead">Tipu was influenced by the French Revolution and sent envoys to France, Turkey, Iran, Pegu, Arabia, Constantinople, Kabul and Mauritius. The British called him the 'Monster Pure and Simple', but his people called him 'Sher-e-Mysore'. He used iron-cased rockets in war, and he built dockyards at Molidabad, Wajidabad and Mangalore.</p>
      <p class="cp-lead">Ranjit Singh was born in 1780 to Maha Singh, the chief of the Sukarchakia Misl. His kingdom lasted from 1799 to 1849. By the <b>Treaty of Amritsar of 1809</b> with Charles Metcalfe, the Sutlej river became his boundary with the British. His army, trained by French, Italian and American officers, was called a British-French military system with Indian background and was the second best army in Asia after the British. He got the Kohinoor diamond from Shah Shuja. The French traveller Victor Jacquemont compared him to Napoleon.</p>
      <div class="cp-note trap">Tipu's title was Badshah, but Ranjit Singh never took the title of Emperor. He was called Maharaja.</div>
      <div class="cp-note exam">Tipu started a navy in 1796, and Ranjit Singh signed the Treaty of Amritsar in 1809.</div>
    `
  },
  49: {
    questext: "The Treaty of Amritsar of 1809 fixed the Sutlej river as the boundary of Ranjit Singh's kingdom. Who signed it for the British?",
    options: ["Lord Minto", "Hector Munro", "Arthur Wellesley", "Charles Metcalfe"],
    correct: "4",
    exptext: "✅ Charles Metcalfe signed for the British, and Ranjit Singh accepted the Sutlej as the limit. 📌 Metcalfe goes with Sutlej. ❌ Lord Minto is tempting, because he was Governor-General then, but he did not sign it personally."
  },
  50: {
    questext: "Tipu Sultan was known in Mysore by which title among his people?",
    options: ["Monster Pure and Simple", "Citizen Tipu", "Sher-e-Mysore", "Badshah-e-Hind"],
    correct: "3",
    exptext: "✅ His people called him Sher-e-Mysore, the Tiger of Mysore. 📌 Sher means tiger. ❌ Monster Pure and Simple is wrong because it was the insulting name given by the British."
  },
  51: {
    questext: "Consider the following statements:\n1. Tipu Sultan took the title Badshah and issued coins in his own name.\n2. Ranjit Singh was the first to take Delhi, and his army was trained only by the British.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Ranjit Singh had European officers like Allard, Ventura, Court and Gardner. ❌ Statement 2 is wrong because he never took Delhi, and his trainers were not British."
  },
  52: {
    type: "concept", icon: "📌", accent: "#10b981", pauseTimer: true,
    title: "Added Exam Facts and Common Traps",
    html: `
      <p class="cp-lead">These are the small facts that the Staff Selection Commission likes to ask. <u>Learn each pair together so that two similar things cannot confuse you.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/29.png" alt="Two-column match chart: Plassey King Maker, Buxar real ruler; Wadgaon Convention; Sugauli " data-caption="Match each battle or treaty with its meaning." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Modern_India/The_British_Conquest_of_India/30.png" alt="Tipu's Tiger Victoria and Albert Museum London photo" data-caption="Tipu's Tiger, a toy that shows a tiger attacking a soldier." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Assaye</td><td>23 September 1803: Wellesley beat Scindia and Bhonsle</td></tr><tr><td>Laswari</td><td>1 November 1803: Lake beat Scindia</td></tr><tr><td>Bhima Koregaon</td><td>1 January 1818: a small Company force held off Bajirao II's army</td></tr><tr><td>Ashti</td><td>February 1818: the Peshwa's general Bapu Gokhale was killed</td></tr><tr><td>Regulating Act 1773</td><td>Warren Hastings became the first Governor-General of Bengal in 1774</td></tr><tr><td>Tipu's rockets</td><td>Inspired William Congreve's rockets</td></tr><tr><td>Tipu's Tiger</td><td>Kept in the Victoria and Albert Museum, London</td></tr><tr><td>Sindh</td><td>Annexed in 1843 by Charles Napier after Miani and Dabo, under Governor-General Ellenborough</td></tr></tbody></table>
      <p class="cp-lead"><b>Diwani</b> was received by Clive on 12 August 1765. The Great Bengal Famine came in 1770, and the Dual Government ended in 1772.</p>
      <p class="cp-lead">Dupleix, Hyder, Tipu and the Peshwa all relied on European-style troops. The British won mainly through better discipline, money and politics.</p>
      <div class="cp-note trap">Plassey 1757 made the Company a King Maker, and Buxar 1764 made it the real ruler. Do not swap them.</div>
      <div class="cp-note trap">Wadgaon 1779 was a Convention and not a treaty, and no treaty ended the Fourth Mysore War of 1799.</div>
      <div class="cp-note trap">Match the frontiers: Sugauli with Nepal, Yandabo with Burma, Gandamak with Afghanistan and Lhasa with Tibet.</div>
    `
  },
  53: {
    questext: "The Battle of Assaye in September 1803 was fought between Arthur Wellesley and which combined Maratha forces?",
    options: ["Scindia and Bhonsle", "Holkar and Gaikwad", "Peshwa and Holkar", "Bhonsle and Gaikwad"],
    correct: "1",
    exptext: "✅ Wellesley beat Daulat Rao Scindia and Raghuji Bhonsle II at Assaye. 📌 Assaye is in the Deccan, near the lands of Scindia and Bhonsle. ❌ Holkar is tempting, but he fought separately and lost later at Rajpurghat."
  },
  54: {
    questext: "Where is Tipu's Tiger, the toy tiger that attacks a soldier, kept today?",
    options: ["British Museum, London", "Victoria and Albert Museum, London", "National Museum, Delhi", "Mysore Palace"],
    correct: "2",
    exptext: "✅ Tipu's Tiger is kept in the Victoria and Albert Museum in London. 📌 The tiger went with the British after 1799. ❌ The British Museum is tempting, but it holds other items."
  },
  55: {
    questext: "Warren Hastings became the first Governor-General of Bengal in which year, under the Regulating Act of 1773?",
    options: ["1772", "1773", "1774", "1775"],
    correct: "3",
    exptext: "✅ Hastings became the first Governor-General of Bengal in 1774, after the Act of 1773. 📌 The Act came first and the post came a year later. ❌ The year 1772 is tempting, but that is when he ended the Dual Government."
  },
  56: {
    questext: "Which Governor-General's period saw the annexation of Sindh in 1843 by Charles Napier?",
    options: ["Lord Hardinge", "Lord Dalhousie", "Lord Auckland", "Lord Ellenborough"],
    correct: "4",
    exptext: "✅ Sindh was annexed in 1843 under Lord Ellenborough by Charles Napier after Miani and Dabo. 📌 Napier and Ellenborough fit the Sindh story. ❌ Lord Dalhousie is tempting, but he annexed Punjab in 1849."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an antique brass compass, an old iron cannon and a faded map of India" },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Joseph Francois Dupleix portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/1.png. a portrait of the French governor of Pondicherry",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/2.png": { t: "fig", about: "Elimination chart: Portuguese, Dutch and Danish shown as faded boxes on the left; French and British shown as two strong boxes facing each other on the right. Labels: Portuguese, Dutch, Danish, French, British." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/3.png": { t: "fig", about: "Horizontal timeline with three boxes: First War 1746-48 (Aix-la-Chapelle), Second War 1749-54 (Pondicherry), Third War 1758-63 (Paris). Winner label under each box." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Robert Clive portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/4.png. a portrait of Robert Clive",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Wandiwash Fort Vandavasi Tamil Nadu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/5.png. the ruins of the old fort at Wandiwash",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Plassey battlefield monument Murshidabad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/6.png. the memorial at the Plassey battlefield",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Clive meets Mir Jafar after Plassey painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/7.png. the painting of Clive and Mir Jafar",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/8.png": { t: "fig", about: "Chain of five boxes: Calcutta captured 1756, Black Hole, Treaty of Alinagar Feb 1757, Plassey 23 June 1757, Mir Jafar made Nawab." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/9.png": { t: "fig", about: "Flow of three boxes: Plassey 1757 King Maker, Giria 1763 Mir Qasim flees, Buxar 1764 real ruler." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Battle of Buxar 1764 painting Hector Munro\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/10.png. a painting of the Battle of Buxar",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/11.png": { t: "fig", about: "Two-column chart: Treaty of Allahabad I, 12 August 1765, with Shah Alam II; Treaty of Allahabad II, 16 August 1765, with Shuja-ud-Daula; each with its main term." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Robert Clive Shah Alam II Treaty of Allahabad painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/12.png. a painting of the Diwani grant",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shaniwar Wada Pune fort gate photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/13.png. the gate of the Peshwa palace in Pune",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/14.png": { t: "fig", about: "Timeline with three boxes: First War 1775-82 ends with Salbai, Second War 1803-05 ends with Bassein and Subsidiary Alliance, Third War 1817-19 ends with Peshwa abolished." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Battle of Assaye 1803 painting Arthur Wellesley\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/15.png. a painting of the Battle of Assaye",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Srirangapatna Tipu Sultan fort ruins photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/16.png. the fort of Srirangapatna",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/17.png": { t: "fig", about: "Flow of four boxes: Madras 1769, Mangalore 1784, Srirangapatna 1792, Tipu killed 1799, each with the British leader label." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Battle of Sobraon 1846 painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/18.png. a painting of the Battle of Sobraon",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Maharaja Duleep Singh portrait Winterhalter\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/19.png. a portrait of the young Duleep Singh",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/20.png": { t: "fig", about: "Timeline with five boxes: Ranjit Singh dies 1839, First War 1845-46, Treaty of Lahore March 1846, Second War 1848-49, Annexation 29 March 1849." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/21.png": { t: "fig", about: "Two-column chart: Anglo-Nepalese War 1814-16 ends with Sugauli; Anglo-Burmese Wars 1824-26 Yandabo, 1852-53 Pegu, 1885-86 all of Burma." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mandalay Palace Myanmar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/22.png. the royal palace at Mandalay",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Remnants of an Army painting First Afghan War retreat\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/23.png. a painting of the retreat from Kabul",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Younghusband expedition Lhasa 1904 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/24.png. the British expedition at Lhasa",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/25.png": { t: "fig", about: "Frontier match chart: Sugauli 1816 Nepal, Yandabo 1826 Burma, Gandamak 1879 Afghanistan, Lhasa 1904 Tibet." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tipu Sultan portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/26.png. a portrait of Tipu Sultan",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Maharaja Ranjit Singh portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/27.png. a portrait of Ranjit Singh",
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/28.png": { t: "fig", about: "Two-column comparison: Tipu Sultan (Mysore, navy 1796, rockets, Badshah) and Ranjit Singh (Lahore 1799, Treaty of Amritsar 1809, Kohinoor)." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/29.png": { t: "fig", about: "Two-column match chart: Plassey King Maker, Buxar real ruler; Wadgaon Convention; Sugauli Nepal; Yandabo Burma; Gandamak Afghanistan; Lhasa Tibet." },
  "images/General_Awareness/Modern_India/The_British_Conquest_of_India/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tipu's Tiger Victoria and Albert Museum London photo\". Download a clear, suitable photo and save it as images/General_Awareness/Modern_India/The_British_Conquest_of_India/30.png. the wooden toy tiger of Tipu"
});

/* CHANGE LOG
   - Danish settlements were sold to the British in 1845, not by 1745; the page now says only the British and the French remained serious rivals by about 1745.
   - Treaty of Salbai 1782: the Peshwa was not pensioned; Raghoba was pensioned and Madhav Rao Narayan was recognised as Peshwa.
   - First Anglo-Sikh War: the Battle of Mudki was fought in December 1845, not September 1845.
   - Mysore was handed to Krishnaraja Wadiyar III in 1799, not Krishnaraja II.
   - Treaty of Yandabo 1826: Britain gained Arakan, Tenasserim and Assam, and Burma gave up claims on Manipur; lower Burma was taken only in 1852.
   - Second Anglo-Burmese War: the Burmese king was Pagan Min, not Tharrawaddy.
   - Tipu Sultan is described as using iron-cased rockets in war rather than as the first ever user of rockets in India.
   - Third Anglo-Afghan War: the peace treaty was the Treaty of Rawalpindi of August 1919, which recognised Afghan independence.
*/