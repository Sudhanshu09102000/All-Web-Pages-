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

/* Field: General_Awareness · Subject: Physics · Chapter: Heat_and_Thermodynamics · 26 concept pages (+ overview) · 55 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🔥", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Heat and Thermodynamics",
    thumb: {
      image: "images/General_Awareness/Physics/Heat_and_Thermodynamics/thumbnail.png",
      banner: "SSC CGL 2026",
      line1: "HEAT & TEMPERATURE",
      line2: "THERMODYNAMICS",
      line3: "CONDUCTION • RADIATION",
      badge: "FULL CLASS",
      ribbon: "SCALES • LAWS • HEAT TRANSFER",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Heat, Temperature and Thermodynamics | Physics for SSC CGL General Science",
      altTitles: ["Conduction, Convection and Radiation with Examples", "Temperature Scales and Latent Heat Tricks for SSC CGL"],
      description: "Heat and thermodynamics give easy marks in General Science. In this class we learn temperature, expansion, specific heat, latent heat, the laws of thermodynamics and the three ways heat travels, in simple words.\n\n📌 IN THIS CLASS\n✅ Temperature scales and thermometers\n✅ Thermal expansion and anomalous expansion of water\n✅ Specific heat, latent heat and thermodynamics\n✅ Conduction, convection, radiation and the black body\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Physics #Heat",
      tags: ["ssc cgl physics", "heat and temperature", "thermodynamics", "temperature scales", "thermal expansion", "anomalous expansion of water", "specific heat", "latent heat", "kirchhoff law", "newton law of cooling", "general science physics", "physics for competitive exams", "humidity", "entropy and carnot", "ssc cgl general science", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "important questions", "concept class", "Heat and Thermodynamic"],
      hashtags: ["SSCCGL", "Physics", "Heat"],
      thumbText: "HEAT & THERMODYNAMICS",
      pinnedComment: "📌 Try the questions and write your score in the comments 👇",
      communityPost: "🔥 New Physics class is live: Heat and Thermodynamics. Solve the questions and share your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "SSC CGL General Science — Physics Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on heat, temperature, how things expand, and how heat travels</u>. This chapter gives many easy and direct questions in General Science.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>26</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>55</b><span>Questions</span></div>
        <div class="cp-stat"><b>~107 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Heat, Temperature and Their Scales</b><br>The difference between heat and temperature, the four temperature scales, and the thermometers we use.</li>
        <li><b>Thermal Expansion</b><br>How solids, liquids and gases expand when heated, the coefficients of expansion, and why water behaves oddly near 4 degrees Celsius.</li>
        <li><b>Calorimetry, Specific Heat and Latent Heat</b><br>How heat is measured, why water is a good coolant, and how heat changes the state of a substance.</li>
        <li><b>Laws of Thermodynamics</b><br>The zeroth, first and second laws, heat engines, refrigerators and entropy in plain words.</li>
        <li><b>Evaporation and Humidity</b><br>Why evaporation cools, and how moisture in the air affects comfort.</li>
        <li><b>Transmission of Heat</b><br>Conduction, convection and radiation, with the daily examples that exams ask.</li>
        <li><b>Newton's Law of Cooling and the Black Body</b><br>Why hot things cool, sea and land breezes, and why light clothes are comfortable in summer.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> temperature scales, the anomalous expansion of water, latent heat values and the three methods of heat transfer are favourite topics in the Staff Selection Commission exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🔥", accent: "#22c55e", pauseTimer: true,
    title: "Heat",
    html: `
      <p class="cp-lead">Heat is a form of energy that produces the feeling of warmth. Its unit in the International System is the joule, and another common unit is the calorie, where 1 calorie = 4.2 joule. <u>Heat always flows from a hotter body to a colder body.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/1.png" alt="Two blocks side by side. The left block is red and labelled hot. The right block is blue a" data-caption="Heat flows from the hot block to the cold block, never the other way by itself." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/2.png" alt="hot tea cup with steam rising photo" data-caption="A hot cup gives heat to the cooler air around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Heat is energy, but temperature is not energy. Do not mix the two.</div>
    `
  },
  3: {
    questext: "One calorie is equal to",
    options: ["2.4 joule", "4.2 joule", "42 joule", "0.42 joule"],
    correct: "2",
    exptext: "✅ One calorie equals 4.2 joule. 📌 Four point two. ❌ 2.4 is the digits reversed and wrong."
  },
  4: {
    questext: "The unit of heat in the International System is",
    options: ["calorie", "watt", "joule", "kelvin"],
    correct: "3",
    exptext: "✅ Heat is energy, so its unit is the joule. 📌 Energy means joule. ❌ Calorie is another unit, not the one in the International System."
  },
  5: {
    type: "concept", icon: "🌡️", accent: "#f59e0b", pauseTimer: true,
    title: "Temperature",
    html: `
      <p class="cp-lead">Temperature is the measure of the hotness or coldness of a body. Heat flows from one body to another because of the <u>difference in their temperatures</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/3.png" alt="Two beakers of water. One labelled 80 degrees Celsius and one labelled 20 degrees Celsius." data-caption="Heat flows because the two beakers are at different temperatures." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/4.png" alt="digital thermometer in glass of water photo" data-caption="A thermometer measures how hot or cold the water is." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Two bodies at the same temperature do not exchange heat, even if one of them holds more heat in total.</div>
    `
  },
  6: {
    questext: "Heat flows from one body to another because of the difference in their",
    options: ["temperature", "mass", "volume", "specific heat"],
    correct: "1",
    exptext: "✅ A difference in temperature makes heat flow. 📌 Temperature is the driver. ❌ Mass tells how much matter, not the direction of heat flow."
  },
  7: {
    type: "concept", icon: "📏", accent: "#ef4444", pauseTimer: true,
    title: "Scales of Temperature",
    html: `
      <p class="cp-lead">To measure the temperature of a body, we use temperature scales. Each scale fixes two points: the freezing point and the boiling point of water.</p>
      <table><thead><tr><th>Scale</th><th>Freezing point of water</th><th>Boiling point of water</th></tr></thead><tbody><tr><td>Celsius</td><td>0 °C</td><td>100 °C</td></tr><tr><td>Fahrenheit</td><td>32 °F</td><td>212 °F</td></tr><tr><td>Kelvin (absolute)</td><td>273 K</td><td>373 K</td></tr><tr><td>Reaumur</td><td>0 °R</td><td>80 °R</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/5.png" alt="Four thermometers side by side with their labels: Celsius 0 and 100, Fahrenheit 32 and 212" data-caption="Four thermometers show the freezing and boiling points of water on the four scales." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/6.png" alt="dual scale Celsius Fahrenheit glass thermometer close up photo" data-caption="Two scales on one thermometer show how the same temperature reads differently." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Kelvin scale is also called the absolute scale. Its freezing point of water is 273, and its boiling point is 373.</div>
      <div class="cp-mnemonic">Celsius 0-100, Fahrenheit 32-212, Kelvin 273-373, Reaumur 0-80.</div>
    `
  },
  8: {
    questext: "The boiling point of water on the Fahrenheit scale is",
    options: ["100", "180", "373", "212"],
    correct: "4",
    exptext: "✅ Water boils at 212 degrees Fahrenheit. 📌 Freezing 32 plus 180 gives 212. ❌ 100 is the Celsius value."
  },
  9: {
    questext: "The freezing point of water on the Kelvin scale is",
    options: ["0", "273", "373", "32"],
    correct: "2",
    exptext: "✅ Water freezes at 273 kelvin. 📌 Kelvin is Celsius plus 273. ❌ 373 is the boiling point."
  },
  10: {
    questext: "The boiling point of water on the Reaumur scale is",
    options: ["100", "212", "80", "373"],
    correct: "3",
    exptext: "✅ On the Reaumur scale, water freezes at 0 and boils at 80. 📌 Reaumur has 80 divisions. ❌ 100 is Celsius."
  },
  11: {
    type: "concept", icon: "🔁", accent: "#8b5cf6", pauseTimer: true,
    title: "Relation between Different Scales of Temperature",
    html: `
      <p class="cp-lead">The four scales are related by one chain of equal ratios. <u>If you know one reading, you can find all the others.</u></p>
      <div class="cp-formula" translate="no"><small>Scale relation</small><span class="cp-frac"><i>C</i><i>100</i></span> = <span class="cp-frac"><i>F − 32</i><i>180</i></span> = <span class="cp-frac"><i>R</i><i>80</i></span> = <span class="cp-frac"><i>K − 273</i><i>100</i></span></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/7.png" alt="A ladder diagram with the same height shown as 100 divisions on Celsius, 180 divisions on " data-caption="The same temperature gap has a different number of divisions on each scale." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Value</th></tr></thead><tbody><tr><td>Kelvin from Celsius</td><td>K = 273 + °C</td></tr><tr><td>Reading equal on Celsius and Fahrenheit</td><td>Minus 40 degrees</td></tr><tr><td>Triple point of water</td><td>273.16 K (all three phases in equilibrium)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/8.png" alt="liquid nitrogen frozen water cold temperature photo" data-caption="Very low temperatures such as minus 40 degrees are the same on the Celsius and Fahrenheit scales." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">For example, 50 °C = 50 × 9 ÷ 5 + 32 = 122 °F.</div>
    `
  },
  12: {
    questext: "At which temperature do the Celsius and Fahrenheit scales show the same reading?",
    options: ["−40 degrees", "0 degrees", "100 degrees", "273 degrees"],
    correct: "1",
    exptext: "✅ At minus 40 the two scales give the same reading. 📌 Minus forty meets minus forty. ❌ At 0 degrees Celsius the Fahrenheit value is 32."
  },
  13: {
    questext: "A temperature of 50 °C is equal to",
    options: ["90 °F", "82 °F", "122 °F", "112 °F"],
    correct: "3",
    exptext: "✅ F = 50 × 9 ÷ 5 + 32 = 122. 📌 Multiply by nine fifths and add 32. ❌ 82 comes from adding 32 without the nine fifths."
  },
  14: {
    questext: "The temperature at which the three phases of water remain in equilibrium is called the triple point of water. It is",
    options: ["273 K", "373 K", "0 K", "273.16 K"],
    correct: "4",
    exptext: "✅ The triple point of water is 273.16 kelvin. 📌 Just above freezing. ❌ 273 kelvin is the ordinary freezing point."
  },
  15: {
    type: "concept", icon: "🩺", accent: "#14b8a6", pauseTimer: true,
    title: "Thermometers",
    html: `
      <p class="cp-lead">The instruments used to measure the temperature of a body are called thermometers. <u>Each type has its own use and range.</u></p>
      <table><thead><tr><th>Type</th><th>Details</th></tr></thead><tbody><tr><td>Clinical thermometer</td><td>Measures human body temperature in degrees Fahrenheit, range 96 °F to 110 °F (35 °C to 43 °C)</td></tr><tr><td>Electronic thermometer</td><td>Basic parts are thermistors; range −40 to 450 °F</td></tr><tr><td>Others</td><td>Constant volume gas thermometer, platinum resistance thermometer</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/9.png" alt="Three boxes with labelled drawings: a clinical thermometer with range 35 to 43 degrees Cel" data-caption="Three types of thermometer and the range or part that defines each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Mercury is commonly used in thermometers over a wide range from −30 °C to 300 °C. The thermometer was developed by <b>Galileo</b>, who found that gases expand on heating.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/10.png" alt="clinical mercury thermometer close up photo" data-caption="A clinical thermometer reads only the narrow range of human body temperatures." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A clinical thermometer is marked in degrees Fahrenheit and has a short range. It cannot measure the boiling point of water.</div>
    `
  },
  16: {
    questext: "The range of a clinical thermometer is",
    options: ["0 °C to 100 °C", "35 °C to 43 °C", "−40 °C to 100 °C", "100 °C to 200 °C"],
    correct: "2",
    exptext: "✅ A clinical thermometer reads 35 to 43 degrees Celsius, that is 96 to 110 degrees Fahrenheit. 📌 Body temperature range. ❌ A range from 0 to 100 suits a laboratory thermometer."
  },
  17: {
    questext: "The thermometer was first developed by",
    options: ["Newton", "Kelvin", "Celsius", "Galileo"],
    correct: "4",
    exptext: "✅ Galileo developed the thermometer after finding that gases expand on heating. 📌 Galileo started it. ❌ Celsius and Kelvin gave temperature scales, not the instrument."
  },
  18: {
    type: "concept", icon: "📐", accent: "#ec4899", pauseTimer: true,
    title: "Thermal Expansion",
    html: `
      <p class="cp-lead">The expansion of a body caused by heat is called <b>thermal expansion</b>. <u>Almost all solids, liquids and gases expand on heating.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/11.png" alt="A metal ball and a ring. Left: the cold ball passes through the ring. Right: the heated ba" data-caption="A heated ball grows in size and no longer fits through the ring." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Everyday example</th><th>Reason</th></tr></thead><tbody><tr><td>A small gap is left between two iron rails</td><td>Otherwise the rails would bend in summer because of expansion</td></tr><tr><td>Telephone wires are not pulled tight on poles</td><td>In winter the wires contract, and tight wires would break</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/12.png" alt="railway track expansion joint gap photo" data-caption="A small gap in a railway track gives the rails room to expand in summer." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Wires are loose in summer so that they do not snap in winter, when they shrink.</div>
    `
  },
  19: {
    questext: "A small gap is left between two rails of a railway line because",
    options: ["rails expand on heating in summer", "rails are too heavy", "trains need the gap", "it saves iron"],
    correct: "1",
    exptext: "✅ Rails expand in summer, and the gap prevents them from bending. 📌 Heat means expansion. ❌ Trains do not need the gap; it is for expansion."
  },
  20: {
    questext: "Telephone wires are not tightened on poles because",
    options: ["wires are costly", "they contract in winter and may break", "wires expand in winter", "poles bend in winter"],
    correct: "2",
    exptext: "✅ In winter the wires contract, and a tight wire would break. 📌 Cold means contraction. ❌ Wires do not expand in winter."
  },
  21: {
    type: "concept", icon: "🔩", accent: "#3b82f6", pauseTimer: true,
    title: "Thermal Expansion of Solids",
    html: `
      <p class="cp-lead">Thermal expansion of solids is of three types: expansion in length, in area and in volume.</p>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Coefficient</th></tr></thead><tbody><tr><td>Linear expansion</td><td>Expansion in length</td><td>α = ΔL ÷ (L × Δt)</td></tr><tr><td>Superficial expansion</td><td>Expansion in area</td><td>β = ΔA ÷ (A × Δt)</td></tr><tr><td>Cubical (volume) expansion</td><td>Expansion in volume</td><td>γ = ΔV ÷ (V × Δt)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/13.png" alt="Three small drawings. A rod getting longer, labelled linear, alpha. A square getting large" data-caption="A rod grows in length, a plate in area and a cube in volume." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Each coefficient is the increase per unit original size per degree Celsius rise in temperature. The unit of each coefficient is per degree Celsius.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/14.png" alt="steel bridge expansion joint close up photo" data-caption="Bridges have gaps so that the steel can lengthen in hot weather." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix up the symbols: alpha for length, beta for area and gamma for volume.</div>
      <div class="cp-mnemonic">Alpha-Length, Beta-Area, Gamma-Volume.</div>
    `
  },
  22: {
    questext: "The coefficient of linear expansion is represented by",
    options: ["β", "γ", "α", "λ"],
    correct: "3",
    exptext: "✅ Alpha is the coefficient of linear expansion. 📌 A is for alpha and for a line. ❌ Beta is for area and gamma is for volume."
  },
  23: {
    type: "concept", icon: "🧮", accent: "#f97316", pauseTimer: true,
    title: "Relation between Coefficients of Expansions",
    html: `
      <p class="cp-lead">The three coefficients of expansion of a solid are related very simply. <u>Beta is twice alpha, and gamma is three times alpha.</u></p>
      <div class="cp-formula" translate="no"><small>Relations</small>β = 2α &nbsp; γ = 3α &nbsp; α : β : γ = 1 : 2 : 3</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/15.png" alt="Three bars of lengths 1, 2 and 3 units labelled alpha, beta, gamma." data-caption="The three coefficients stand in the ratio of 1 to 2 to 3." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">For example, if α is 12 × 10⁻⁶ per degree Celsius, then β is 24 × 10⁻⁶ and γ is 36 × 10⁻⁶.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/16.png" alt="A cube drawn with its length, area of one face and volume labelled. Under it the words one" data-caption="Expansion in one, two and three directions gives the ratio 1, 2 and 3." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The ratio is 1 : 2 : 3, not 1 : 2 : 4.</div>
    `
  },
  24: {
    questext: "The ratio of the coefficients of linear, superficial and cubical expansion α : β : γ is",
    options: ["1 : 3 : 2", "1 : 2 : 3", "3 : 2 : 1", "2 : 3 : 1"],
    correct: "2",
    exptext: "✅ β is 2α and γ is 3α, so the ratio is 1 : 2 : 3. 📌 One, two, three directions. ❌ The others change the order."
  },
  25: {
    questext: "If the coefficient of linear expansion of a solid is α, its coefficient of volume expansion is",
    options: ["α", "α squared", "2α", "3α"],
    correct: "4",
    exptext: "✅ The coefficient of volume expansion is three times α. 📌 Volume has three directions. ❌ 2α is the coefficient of area expansion."
  },
  26: {
    type: "concept", icon: "🧪", accent: "#84cc16", pauseTimer: true,
    title: "Thermal Expansion of Liquids",
    html: `
      <p class="cp-lead">In liquids, only expansion in volume takes place on heating. Expansion of liquids is of two types: apparent expansion and real expansion.</p>
      <table><thead><tr><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td>Apparent expansion</td><td>The expansion that we observe when the expansion of the container is not taken into account</td></tr><tr><td>Real expansion</td><td>The expansion observed when the expansion of the container is also taken into account</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Real and apparent expansion</small>γr = γa + γg</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/17.png" alt="A glass flask of coloured liquid with a thin neck. Labels: liquid level first drops a litt" data-caption="The liquid in a heated flask seems to rise less than it really does because the flask also expands." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Here γr and γa are the coefficients of real and apparent expansion of the liquid, and γg is the coefficient of cubical expansion of the container.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/18.png" alt="liquid thermometer bulb red alcohol rising close up photo" data-caption="A liquid thermometer works because the liquid in the bulb expands when heated." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Real expansion is always bigger than apparent expansion, because the container also expands.</div>
    `
  },
  27: {
    questext: "Real expansion of a liquid is equal to",
    options: ["apparent expansion plus the expansion of the container", "apparent expansion minus the expansion of the container", "only the expansion of the container", "twice the apparent expansion"],
    correct: "1",
    exptext: "✅ The real coefficient equals the apparent coefficient plus the coefficient of the container. 📌 Real equals apparent plus container. ❌ Subtracting would give a smaller value than the apparent one."
  },
  28: {
    questext: "On heating, the type of expansion that takes place in liquids is",
    options: ["linear expansion only", "superficial expansion only", "expansion in volume", "no expansion"],
    correct: "3",
    exptext: "✅ Liquids have no fixed shape, so only expansion in volume is meaningful. 📌 Liquids take the shape of the container. ❌ Linear or area expansion applies to solids."
  },
  29: {
    type: "concept", icon: "🧊", accent: "#06b6d4", pauseTimer: true,
    title: "Anomalous Expansion of Water",
    html: `
      <p class="cp-lead">When the temperature of water is raised from 0 °C, its volume does <b>decrease</b> up to 4 °C. At 4 °C the volume is minimum, and after that it increases. This unusual behaviour of water around 4 °C is called the <u>anomalous expansion of water</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/19.png" alt="A graph with temperature on the horizontal axis and volume of water on the vertical axis. " data-caption="Water shrinks until 4 degrees Celsius and then expands, so its volume is smallest at 4 degrees." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Because the volume is least at 4 °C, the density of water is greatest at 4 °C. This is why lakes freeze from the top and the fish below stay alive.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/20.png" alt="frozen lake surface ice fish winter photo" data-caption="In winter the top of a lake freezes first, while the water below stays near 4 degrees Celsius." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Water is densest at 4 °C, not at 0 °C.</div>
    `
  },
  30: {
    questext: "Water has maximum density at",
    options: ["0 °C", "100 °C", "4 °C", "−4 °C"],
    correct: "3",
    exptext: "✅ The volume of water is minimum at 4 °C, so the density is maximum. 📌 Four degrees, densest. ❌ At 0 °C water has expanded again and ice floats."
  },
  31: {
    questext: "Between 0 °C and 4 °C the volume of water decreases on heating. This behaviour is called",
    options: ["anomalous expansion of water", "normal expansion", "latent expansion", "apparent expansion"],
    correct: "1",
    exptext: "✅ This unusual behaviour is called the anomalous expansion of water. 📌 Anomalous means unusual. ❌ Apparent expansion is about the container."
  },
  32: {
    type: "concept", icon: "🎈", accent: "#a855f7", pauseTimer: true,
    title: "Thermal Expansion of Gases",
    html: `
      <p class="cp-lead">There are two types of coefficient of expansion in gases.</p>
      <table><thead><tr><th>Coefficient</th><th>Meaning</th></tr></thead><tbody><tr><td>Volume coefficient (γv)</td><td>At constant pressure, the change in volume per unit volume per degree Celsius</td></tr><tr><td>Pressure coefficient (γp)</td><td>At constant volume, the change in pressure per unit pressure per degree Celsius</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/21.png" alt="Two syringes. Left: pressure kept constant while volume grows on heating, labelled volume " data-caption="In one case the gas expands at steady pressure, and in the other the pressure rises in a sealed container." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/22.png" alt="hot air balloon inflating burner photo" data-caption="Heated air expands and becomes lighter, which lifts the balloon." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Volume coefficient is measured at constant pressure, and pressure coefficient is measured at constant volume.</div>
    `
  },
  33: {
    questext: "The change in volume per unit volume per degree Celsius at constant pressure for a gas is called its",
    options: ["pressure coefficient", "linear coefficient", "superficial coefficient", "volume coefficient"],
    correct: "4",
    exptext: "✅ This is the volume coefficient of a gas. 📌 Volume coefficient goes with constant pressure. ❌ Pressure coefficient goes with constant volume."
  },
  34: {
    type: "concept", icon: "⚖️", accent: "#e11d48", pauseTimer: true,
    title: "Calorimetry",
    html: `
      <p class="cp-lead"><b>Calorimetry</b> is the measurement of heat. The amount of heat required to raise the temperature of 1 gram of water by 1 °C is called 1 calorie.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/23.png" alt="A hot metal ball being dropped into cold water inside an insulated cup. Arrows labelled he" data-caption="The heat lost by the hot body equals the heat gained by the cold body." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Calorimetry states that the heat lost by the hotter body is equal to the heat gained by the colder body.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/24.png" alt="laboratory calorimeter copper vessel with thermometer photo" data-caption="A calorimeter keeps heat from escaping so that heat exchange can be measured." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">This law holds only when no heat escapes to the surroundings.</div>
    `
  },
  35: {
    questext: "One calorie is the heat required to raise the temperature of",
    options: ["1 kilogram of water by 1 °C", "1 gram of water by 1 °C", "1 gram of water by 10 °C", "1 litre of water by 1 °C"],
    correct: "2",
    exptext: "✅ One calorie is the heat needed to raise 1 gram of water by 1 °C. 📌 One gram, one degree. ❌ One kilogram of water needs a thousand calories."
  },
  36: {
    questext: "According to the principle of calorimetry",
    options: ["heat lost equals work done", "heat gained is always more than heat lost", "heat lost by the hotter body equals heat gained by the colder body", "heat lost is zero"],
    correct: "3",
    exptext: "✅ The heat given out by the hot body equals the heat taken in by the cold body. 📌 Give equals take. ❌ Heat gained cannot exceed heat lost if there is no outside source."
  },
  37: {
    type: "concept", icon: "🍵", accent: "#10b981", pauseTimer: true,
    title: "Specific Heat",
    html: `
      <p class="cp-lead">The amount of heat required to raise the temperature of unit mass of a substance by 1 °C is called its <b>specific heat</b> (s).</p>
      <div class="cp-formula" translate="no"><small>Heat given or taken</small>Q = m s Δθ</div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Unit of specific heat</td><td>Calorie per gram per degree Celsius, or joule per kilogram per degree Celsius</td></tr><tr><td>Specific heat of water</td><td>4200 joule per kilogram per degree Celsius (1 calorie per gram per degree Celsius)</td></tr><tr><td>Why it matters</td><td>Water has a high specific heat, so it is used as a coolant in vehicle radiators and hot water is used for fomentation</td></tr><tr><td>Molar specific heat</td><td>Heat required to raise the temperature of 1 mole of a gas by 1 °C</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/25.png" alt="Two identical beakers on identical burners. One with water and one with oil. After the sam" data-caption="Water heats up slowly because its specific heat is high." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/26.png" alt="car radiator coolant reservoir engine bay photo" data-caption="Water is used as a coolant because it can take in a lot of heat with a small rise in temperature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">For example, to heat 2 kilograms of water by 5 °C we need 2 × 4200 × 5 = 42,000 joule.</div>
    `
  },
  38: {
    questext: "Water is used as a coolant in the radiators of vehicles because",
    options: ["it has a high specific heat", "it has a low specific heat", "it is lighter than oil", "it freezes easily"],
    correct: "1",
    exptext: "✅ High specific heat lets water take in a lot of heat with a small rise in temperature. 📌 High specific heat means good coolant. ❌ Low specific heat would make the water hot quickly."
  },
  39: {
    questext: "How much heat is needed to raise the temperature of 2 kilograms of water by 5 °C? (specific heat of water is 4200 joule per kilogram per degree Celsius)",
    options: ["21,000 joule", "8,400 joule", "42,000 joule", "84,000 joule"],
    correct: "3",
    exptext: "✅ Heat equals 2 × 4200 × 5 = 42,000 joule. 📌 Use Q equals m s Δθ. ❌ 21,000 comes from forgetting a factor of 2."
  },
  40: {
    type: "concept", icon: "💧", accent: "#eab308", pauseTimer: true,
    title: "Latent Heat",
    html: `
      <p class="cp-lead">The heat energy absorbed or released at constant temperature for a change of state is called <b>latent heat</b> (L). Its unit is calorie per gram or kilocalorie per kilogram.</p>
      <div class="cp-formula" translate="no"><small>Heat for change of state</small>Q = m L</div>
      <table><thead><tr><th>Latent heat</th><th>Value</th></tr></thead><tbody><tr><td>Latent heat of fusion of ice</td><td>80 calorie per gram</td></tr><tr><td>Latent heat of vaporisation of steam</td><td>536 calorie per gram</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/27.png" alt="A graph of temperature against heat added for ice to water to steam. Two flat horizontal p" data-caption="During a change of state, the temperature stays flat while heat is still added." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/28.png" alt="ice cubes melting in glass of water photo" data-caption="Melting ice absorbs latent heat without any rise in its temperature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Latent heat does not change the temperature. It only changes the state.</div>
    `
  },
  41: {
    questext: "The latent heat of fusion of ice is",
    options: ["536 calorie per gram", "100 calorie per gram", "4.2 calorie per gram", "80 calorie per gram"],
    correct: "4",
    exptext: "✅ Ice needs 80 calorie per gram to melt into water at the same temperature. 📌 Eighty for ice. ❌ 536 is the value for turning water into steam."
  },
  42: {
    questext: "The latent heat of vaporisation of steam is",
    options: ["80 calorie per gram", "536 calorie per gram", "100 calorie per gram", "4.2 calorie per gram"],
    correct: "2",
    exptext: "✅ Steam gives out or takes in 536 calorie per gram during the change of state. 📌 Much larger than for ice. ❌ 80 is the value for melting of ice."
  },
  43: {
    questext: "How much heat is needed to melt 10 grams of ice at 0 °C into water at 0 °C? (latent heat of fusion of ice is 80 calorie per gram)",
    options: ["800 calorie", "80 calorie", "8 calorie", "8,000 calorie"],
    correct: "1",
    exptext: "✅ Heat equals mass times latent heat, that is 10 × 80 = 800 calorie. 📌 Q equals m L. ❌ 80 calorie is the heat for only one gram."
  },
  44: {
    type: "concept", icon: "♨️", accent: "#0ea5e9", pauseTimer: true,
    title: "Thermodynamics",
    html: `
      <p class="cp-lead">The branch of physics that deals with the relation between heat energy and other types of energy is called <b>thermodynamics</b>. It rests on a few simple laws.</p>
      <table><thead><tr><th>Law</th><th>In one line</th></tr></thead><tbody><tr><td>Zeroth law</td><td>Tells about thermal equilibrium</td></tr><tr><td>First law</td><td>Heat given equals the change in internal energy plus the work done</td></tr><tr><td>Second law</td><td>Heat cannot be completely turned into work, and heat does not flow by itself from cold to hot</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/29.png" alt="Three signposts labelled zeroth law thermal equilibrium, first law energy conservation, se" data-caption="The three laws that govern how heat and work are related." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/30.png" alt="steam engine locomotive wheels photo" data-caption="A steam engine is a machine that turns heat into mechanical work." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The zeroth law is about equilibrium, the first law is about energy conservation, and the second law is about the direction of heat flow.</div>
    `
  },
  45: {
    questext: "The branch of physics that studies the relation of heat energy with other types of energy is",
    options: ["optics", "kinematics", "thermodynamics", "acoustics"],
    correct: "3",
    exptext: "✅ Thermodynamics studies how heat energy is related to other forms of energy. 📌 Thermo means heat, dynamics means motion. ❌ Optics studies light."
  },
  46: {
    type: "concept", icon: "🤝", accent: "#d946ef", pauseTimer: true,
    title: "Zeroth Law of Thermodynamics",
    html: `
      <p class="cp-lead">The zeroth law of thermodynamics tells about <b>thermal equilibrium</b>. If two bodies are each in thermal equilibrium with a third body, they are in thermal equilibrium with each other.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/31.png" alt="Three blocks A, B and C in a row. Equals signs between A and C and between B and C, and a " data-caption="If A and B both match C in temperature, then A and B match each other." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/32.png" alt="thermometer touching two metal blocks temperature photo" data-caption="A thermometer works because two bodies in contact reach the same temperature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Thermal equilibrium means equal temperature, not equal amount of heat.</div>
    `
  },
  47: {
    questext: "The zeroth law of thermodynamics tells about",
    options: ["conservation of energy", "entropy", "the efficiency of engines", "thermal equilibrium"],
    correct: "4",
    exptext: "✅ The zeroth law defines thermal equilibrium and so the idea of temperature. 📌 Zero means equal temperature. ❌ Conservation of energy belongs to the first law."
  },
  48: {
    type: "concept", icon: "🔋", accent: "#64748b", pauseTimer: true,
    title: "First Law of Thermodynamics",
    html: `
      <p class="cp-lead">The first law is a law about energy. The heat given to a substance is equal to the sum of the change in its internal energy and the work done by it.</p>
      <div class="cp-formula" translate="no"><small>First law</small>Q = ΔU + W</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/33.png" alt="A box labelled heat given with an arrow to a cylinder. Out of it two arrows: one to a box " data-caption="Heat given to a gas is divided between raising its internal energy and doing work." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/34.png" alt="bicycle pump piston heating when pumping photo" data-caption="The pump warms up when pressed because work done on the air turns into heat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The first law is just the conservation of energy applied to heat and work.</div>
    `
  },
  49: {
    questext: "The first law of thermodynamics is the law of",
    options: ["conservation of energy", "conservation of mass", "heat flow from cold to hot", "entropy"],
    correct: "1",
    exptext: "✅ Heat given equals the change in internal energy plus the work done, which is energy conservation. 📌 First means energy. ❌ Heat flow direction is the second law."
  },
  50: {
    type: "concept", icon: "🚫", accent: "#fb7185", pauseTimer: true,
    title: "Second Law of Thermodynamics",
    html: `
      <p class="cp-lead">In the second law, work can be changed into heat and heat into work, but the change is never 100 percent efficient.</p>
      <table><thead><tr><th>Statement</th><th>Meaning</th></tr></thead><tbody><tr><td>Kelvin's statement</td><td>It is impossible for a machine working in a cycle to convert heat completely into work</td></tr><tr><td>Clausius statement</td><td>Heat by itself cannot flow from a colder body to a hotter body (a refrigerator is based on this)</td></tr><tr><td>Carnot's theorem</td><td>Tells about the maximum efficiency of a heat engine; it refers to the Carnot cycle</td></tr><tr><td>Entropy</td><td>Measures the molecular disorder of a system</td></tr><tr><td>Heat engine</td><td>A device that converts heat into mechanical work (internal combustion and external combustion engines)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/35.png" alt="A heat engine drawn as a box. Arrow in from a hot source labelled heat taken in. Arrow out" data-caption="A heat engine cannot turn all the heat it takes in into work, because some is rejected." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/36.png" alt="car engine cylinders pistons cutaway photo" data-caption="An internal combustion engine turns the heat of burning fuel into mechanical work." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A car engine uses a coolant added to water, such as ethylene glycol, to reduce harmful effects such as corrosion and rusting.</p>
      <div class="cp-note trap">Kelvin's statement is about turning heat into work. Clausius's statement is about heat flowing from cold to hot.</div>
    `
  },
  51: {
    questext: "The statement \"It is impossible for a machine working in a cyclic process to convert heat completely into work\" is known as",
    options: ["Clausius statement", "Carnot's theorem", "Kelvin's statement", "Joule's law"],
    correct: "3",
    exptext: "✅ This is the Kelvin statement of the second law. 📌 Kelvin means heat to work. ❌ Clausius's statement is about heat flowing from cold to hot."
  },
  52: {
    questext: "A refrigerator is based on",
    options: ["Kelvin's statement", "Clausius statement", "the zeroth law", "Joule's law"],
    correct: "2",
    exptext: "✅ A refrigerator uses outside work to move heat from cold to hot, which follows the Clausius statement. 📌 Clausius means cold to hot. ❌ Kelvin's statement is for heat engines."
  },
  53: {
    questext: "Carnot's theorem tells about",
    options: ["maximum efficiency of a heat engine", "minimum temperature", "the speed of sound", "specific heat"],
    correct: "1",
    exptext: "✅ Carnot's theorem gives the maximum possible efficiency of a heat engine. 📌 Carnot means best engine. ❌ The other options are unrelated."
  },
  54: {
    questext: "Entropy measures",
    options: ["the heat of a system", "the temperature of a system", "the mass of a system", "the molecular disorder of a system"],
    correct: "4",
    exptext: "✅ Entropy is a measure of molecular disorder. 📌 Entropy means disorder. ❌ Heat and temperature are different quantities."
  },
  55: {
    type: "concept", icon: "💨", accent: "#2dd4bf", pauseTimer: true,
    title: "Evaporation",
    html: `
      <p class="cp-lead"><b>Evaporation</b> is the process in which molecules escape slowly from the surface of a liquid. <u>It happens at every temperature and it causes cooling.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/37.png" alt="A shallow dish of water with arrows of molecules leaving the surface. Labels: warm gives f" data-caption="Evaporation is faster when the liquid is warm or has a wide surface." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The rate of evaporation depends on the temperature and on the area of the evaporating surface. A refrigerator is a device used for cooling things by the evaporation and compression of a volatile liquid inside a copper coil.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/38.png" alt="wet clothes drying on washing line sunlight photo" data-caption="Clothes dry faster in the sun and when spread wide, because evaporation is faster." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Evaporation takes place from the surface only and at any temperature, while boiling takes place throughout the liquid at one fixed temperature.</div>
    `
  },
  56: {
    questext: "The rate of evaporation of a liquid depends on",
    options: ["the temperature and area of the evaporating surface", "the colour of the liquid", "the height of the vessel", "the speed of sound"],
    correct: "1",
    exptext: "✅ A higher temperature and a larger surface area speed up evaporation. 📌 Warm and wide. ❌ Colour and height of the vessel do not matter."
  },
  57: {
    questext: "A refrigerator cools things by",
    options: ["conduction through iron", "radiation of light", "evaporation and compression of a volatile liquid", "convection of hot air"],
    correct: "3",
    exptext: "✅ A volatile liquid evaporates in a copper coil and takes heat from inside the refrigerator. 📌 Evaporation means cooling. ❌ The other options are not the working principle."
  },
  58: {
    type: "concept", icon: "💦", accent: "#c026d3", pauseTimer: true,
    title: "Humidity",
    html: `
      <p class="cp-lead">The presence of moisture in the atmosphere is called <b>humidity</b>. The amount of water vapour in a unit volume of air is the <b>absolute humidity</b>.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Relative humidity</td><td>Mass of water vapour in a volume of air divided by the mass needed to saturate the same volume at the same temperature, multiplied by 100</td></tr><tr><td>Hygrometer</td><td>Instrument that measures relative humidity</td></tr><tr><td>Comfortable humidity</td><td>About 50 percent at 22 °C to 25 °C</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/39.png" alt="A scale from dry to humid. Left end very low humidity with a label lips dry and cracked. M" data-caption="Very low humidity dries the lips, and very high humidity stops sweat from drying." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">If relative humidity is very high, the sweat from our body does not evaporate readily, so we feel uncomfortable. Air conditioning gives comfortable conditions by regulating both temperature and humidity.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/40.png" alt="hygrometer dial humidity meter photo" data-caption="A hygrometer measures how much moisture the air holds compared with the most it can hold." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Relative humidity is a ratio multiplied by 100, so it is given in percent.</div>
    `
  },
  59: {
    questext: "Relative humidity is measured by",
    options: ["barometer", "thermometer", "hygrometer", "lactometer"],
    correct: "3",
    exptext: "✅ A hygrometer measures relative humidity. 📌 Hygro means moisture. ❌ A barometer measures air pressure."
  },
  60: {
    questext: "A relative humidity of about what value is considered comfortable at 22 °C to 25 °C?",
    options: ["50 percent", "10 percent", "90 percent", "100 percent"],
    correct: "1",
    exptext: "✅ About 50 percent is comfortable. 📌 Half. ❌ 90 percent would make sweat unable to dry."
  },
  61: {
    questext: "If the relative humidity is very high, we feel uncomfortable because",
    options: ["the air is cold", "the air is dry", "lips crack", "sweat does not evaporate readily"],
    correct: "4",
    exptext: "✅ Air that already holds much moisture takes up little more, so sweat stays on the skin. 📌 Humid means sticky. ❌ Dry lips are a sign of low humidity."
  },
  62: {
    type: "concept", icon: "📡", accent: "#16a34a", pauseTimer: true,
    title: "Transmission of Heat",
    html: `
      <p class="cp-lead">Heat can be transferred from one place to another. This is called transmission of heat. <u>There are three methods: conduction, convection and radiation.</u></p>
      <table><thead><tr><th>Method</th><th>Where it happens</th></tr></thead><tbody><tr><td>Conduction</td><td>Mainly in solids, without movement of the particles</td></tr><tr><td>Convection</td><td>In liquids and gases, with movement of the particles</td></tr><tr><td>Radiation</td><td>In the form of electromagnetic waves, even through a vacuum</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/41.png" alt="Three small panels. Panel 1: a hot metal spoon in tea with heat travelling up the handle, " data-caption="Heat travels through a spoon by conduction, through water by convection and from the Sun by radiation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/42.png" alt="campfire heat spreading warm hands photo" data-caption="Standing near a fire, we feel heat by radiation and warm air rising by convection." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The three methods differ in the way the heat travels, not in the heat itself.</div>
    `
  },
  63: {
    questext: "Which of the following is NOT a method of transmission of heat?",
    options: ["Conduction", "Evaporation", "Convection", "Radiation"],
    correct: "2",
    exptext: "✅ The three methods are conduction, convection and radiation. 📌 CCR. ❌ Evaporation is a cooling process, not a method of heat transmission."
  },
  64: {
    type: "concept", icon: "🥄", accent: "#d97706", pauseTimer: true,
    title: "Conduction",
    html: `
      <p class="cp-lead">The mode of transmission of heat in solids from the hotter part to the colder part without actual movement of the particles is called <b>conduction</b>. In solids, heat is transmitted mainly by conduction.</p>
      <table><thead><tr><th>Type of material</th><th>Examples</th></tr></thead><tbody><tr><td>Good conductors of heat</td><td>Metals</td></tr><tr><td>Bad conductors of heat</td><td>Wood, cotton, wool, glass and dry air</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/43.png" alt="A metal rod with one end in a flame. Heat arrows along the rod. Particles drawn in a row p" data-caption="Heat passes along the rod from particle to particle without the rod moving." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Woollen clothes keep us warm because they do not allow the heat of our body to escape. On a cold night two thin blankets give more warmth than one thick blanket, because the layer of air between them is a better insulator. Refrigerators and ice boxes have double walls with thermocol between them to reduce heat gain by conduction.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/44.png" alt="woollen sweater and blankets winter folded photo" data-caption="Wool and trapped air are bad conductors of heat, so they keep body heat in." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Two thin blankets are warmer than one thick one because of the trapped air between them, not because they weigh more.</div>
    `
  },
  65: {
    questext: "Woollen clothes keep us warm in winter because",
    options: ["wool produces heat", "wool is a good conductor", "wool reflects the Sun", "wool does not allow the heat of our body to escape"],
    correct: "4",
    exptext: "✅ Wool is a bad conductor, so it keeps body heat in. 📌 Wool traps heat. ❌ A good conductor would let heat escape."
  },
  66: {
    questext: "On a cold night two thin blankets give more warmth than a single thick blanket because",
    options: ["thin blankets are lighter", "the layer of air between them is a better insulator", "they are made of wool", "they conduct heat better"],
    correct: "2",
    exptext: "✅ The air between the blankets is a bad conductor of heat. 📌 Air is the insulator. ❌ Conducting heat better would make us colder."
  },
  67: {
    questext: "Refrigerators and ice boxes have double walls with thermocol between them to",
    options: ["minimise heat gain by conduction", "increase weight", "make them look better", "speed up cooling"],
    correct: "1",
    exptext: "✅ Thermocol is a bad conductor, so heat does not easily enter. 📌 Insulation keeps heat out. ❌ Speeding up cooling is not the purpose."
  },
  68: {
    questext: "Which of the following is a bad conductor of heat?",
    options: ["Copper", "Silver", "Wood", "Iron"],
    correct: "3",
    exptext: "✅ Wood is a bad conductor of heat. 📌 Metals conduct, wood does not. ❌ Copper, silver and iron are metals and good conductors."
  },
  69: {
    type: "concept", icon: "🫕", accent: "#dc2626", pauseTimer: true,
    title: "Convection",
    html: `
      <p class="cp-lead">The mode of transmission of heat in fluids (liquids and gases) due to the actual movement of particles is called <b>convection</b>. Heat in liquids and gases is transmitted by convection.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/45.png" alt="A beaker of water heated at the bottom. Warm water rises in the middle as red arrows. Cool" data-caption="Warm water rises and cool water sinks, making a circulating current." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">When a liquid in a vessel is heated at the bottom, the liquid at the bottom gets heated and expands. Because of its lower density, the hot liquid rises and cold liquid from above takes its place. These convection currents continue until the whole liquid has the same temperature.</p>
      <table><thead><tr><th>Application</th><th>Reason</th></tr></thead><tbody><tr><td>Cooling unit of a refrigerator is fitted near the top</td><td>Cold air moves downward and keeps the whole interior cool</td></tr><tr><td>Radiator in a motor car</td><td>Works on the principle of convection</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/46.png" alt="car radiator coolant circulation engine photo" data-caption="Water circulates through a car radiator by convection and carries heat away." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Convection needs a fluid. It cannot happen in a solid.</div>
    `
  },
  70: {
    questext: "Heat is transmitted in liquids and gases mainly by",
    options: ["conduction", "radiation", "convection", "refraction"],
    correct: "3",
    exptext: "✅ In fluids the particles themselves move and carry the heat. 📌 Fluids mean convection. ❌ Conduction is for solids."
  },
  71: {
    questext: "The cooling unit of a refrigerator is fitted near the top because",
    options: ["cold air moves downward and keeps the whole interior cool", "it is easier to build", "hot air moves downward", "the freezer is heavy"],
    correct: "1",
    exptext: "✅ Cold air is heavy and sinks, so a cooler at the top cools everything below. 📌 Cold sinks. ❌ Hot air rises, so it does not move downward."
  },
  72: {
    type: "concept", icon: "🥶", accent: "#7c3aed", pauseTimer: true,
    title: "Newton's Law of Cooling",
    html: `
      <p class="cp-lead">The rate of loss of heat from a body is directly proportional to the difference between the temperature of the body and the temperature of its surroundings.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/47.png" alt="A graph of temperature against time for hot water. A curve that falls quickly at first and" data-caption="A hot body cools quickly at first and more slowly as it nears the room temperature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">If we put hot water and fresh tap water in a refrigerator, the hot water will cool faster than the fresh tap water at first, because it is farther from the temperature of the surroundings.</p>
      <table><thead><tr><th>Natural effect</th><th>Explanation</th></tr></thead><tbody><tr><td>Sea breeze (day)</td><td>The land warms faster than the sea, so hot air over the land rises and cooler air from the sea moves in</td></tr><tr><td>Land breeze (night)</td><td>The land cools faster than the sea, so hot air over the sea rises and cooler air from the land moves in</td></tr><tr><td>Cloudy nights are warmer</td><td>Clouds reflect the radiation emitted by the Earth back to the ground</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/48.png" alt="coastal beach evening breeze palm trees photo" data-caption="By day, the cooler sea air blows towards the warmer land as a sea breeze." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/49.png" alt="Two panels of a coast. Panel 1 daytime: arrows from the sea to the land, labelled sea bree" data-caption="The wind blows from sea to land by day and from land to sea at night." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The sea breeze blows during the day, and the land breeze blows at night.</div>
      <div class="cp-mnemonic">Day: Sea breeze. Night: Land breeze.</div>
    `
  },
  73: {
    questext: "The sea breeze blows",
    options: ["from the land to the sea during the night", "from the sea to the land during the day", "from the land to the sea during the day", "from the sea to the land during the night"],
    correct: "2",
    exptext: "✅ By day the land warms faster, so hot air rises over the land and cool sea air flows in. 📌 Day brings the sea breeze. ❌ Land to sea at night is the land breeze."
  },
  74: {
    questext: "Cloudy nights are warmer than clear nights because",
    options: ["clouds produce heat", "clouds reflect the radiation of the Earth back", "clouds absorb all sunlight", "clouds block the Moon"],
    correct: "2",
    exptext: "✅ Clouds send back the Earth's radiation, which keeps the ground warm. 📌 Clouds act as a blanket. ❌ Clouds do not produce heat."
  },
  75: {
    questext: "According to Newton's law of cooling, the rate of loss of heat of a body is proportional to",
    options: ["the mass of the body", "the colour of the body", "the size of the surroundings", "the difference between the temperature of the body and its surroundings"],
    correct: "4",
    exptext: "✅ The greater the temperature difference, the faster the body cools. 📌 Bigger gap, faster loss. ❌ Mass and colour do not appear in the law."
  },
  76: {
    type: "concept", icon: "☀️", accent: "#0d9488", pauseTimer: true,
    title: "Radiation",
    html: `
      <p class="cp-lead">The process of heat transmission in the form of electromagnetic waves is called <b>radiation</b>. <u>Radiation does not need any medium, and it travels without heating the medium in between.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/50.png" alt="The Sun on the left, the Earth on the right, empty space between with dotted rays, and a l" data-caption="Heat from the Sun crosses empty space by radiation and does not heat the space in between." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/51.png" alt="sunlight warming face sun heat photo" data-caption="We feel the warmth of the Sun on our face because of heat radiation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Radiation is the only method of heat transfer that works through a vacuum.</div>
    `
  },
  77: {
    questext: "Heat from the Sun reaches the Earth by",
    options: ["conduction", "convection", "radiation", "evaporation"],
    correct: "3",
    exptext: "✅ Space is a vacuum, and only radiation can cross it. 📌 Sun to Earth means radiation. ❌ Conduction and convection need matter."
  },
  78: {
    questext: "Which method of heat transmission does NOT need any medium?",
    options: ["Conduction", "Radiation", "Convection", "Evaporation"],
    correct: "2",
    exptext: "✅ Radiation travels as electromagnetic waves and needs no medium. 📌 No medium, so radiation. ❌ Conduction needs a solid and convection needs a fluid."
  },
  79: {
    type: "concept", icon: "⚫", accent: "#db2777", pauseTimer: true,
    title: "Black Body",
    html: `
      <p class="cp-lead">A body that absorbs all the radiation that falls on it is called a <b>perfectly black body</b>.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Absorptive power (a)</td><td>Ratio of the heat absorbed to the total radiation falling on the body; it has no unit</td></tr><tr><td>Emissive power</td><td>Amount of heat radiation per unit area of the surface in one second at a given temperature; its unit is joule per square metre per second</td></tr><tr><td>Kirchhoff's law</td><td>The ratio of emissive power to absorptive power of a body is always the same, and it is equal to the emissive power of a black body</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/52.png" alt="A box with a tiny hole labelled all radiation entering gets trapped, with arrows entering " data-caption="A small hole in a closed hollow body works like a black body, trapping the radiation that enters." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">White colour is a bad absorber and a good reflector of heat radiation. Black colour is a good absorber and a bad reflector. So light-coloured clothes feel better in summer, and dark-coloured clothes feel better in winter.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Heat_and_Thermodynamics/53.png" alt="person wearing white clothes in summer sun photo" data-caption="White clothes reflect heat, so they keep us cooler in summer." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The perfect black body is also the best emitter of radiation. Light clothes are for summer and dark clothes for winter.</div>
    `
  },
  80: {
    questext: "A body that absorbs all the radiation falling on it is called",
    options: ["a perfect reflector", "a white body", "a transparent body", "a perfectly black body"],
    correct: "4",
    exptext: "✅ A body that absorbs all the radiation is a perfectly black body. 📌 Black absorbs everything. ❌ A white body reflects most of the radiation."
  },
  81: {
    questext: "The ratio of emissive power to absorptive power of a body is equal to the emissive power of a black body. This is known as",
    options: ["Newton's law of cooling", "Stefan's law", "Kirchhoff's law", "Wien's law"],
    correct: "3",
    exptext: "✅ This is Kirchhoff's law of radiation. 📌 Kirchhoff means the ratio law. ❌ Newton's law of cooling is about the rate of loss of heat."
  },
  82: {
    questext: "Clothes of light colours give a better feeling in summer because",
    options: ["they absorb more heat", "they are good emitters", "they are bad absorbers and good reflectors of heat", "they are heavy"],
    correct: "3",
    exptext: "✅ Light colours reflect heat radiation and absorb little. 📌 White reflects. ❌ Absorbing more heat would make us warmer."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a glass thermometer, a copper kettle with steam, and a thin gold-lined flame icon" },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/1.png": { t: "fig", about: "Two blocks side by side. The left block is red and labelled hot. The right block is blue and labelled cold. A large arrow from left to right labelled heat flows." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hot tea cup with steam rising photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/2.png. A cup of hot tea with steam rising from it.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/3.png": { t: "fig", about: "Two beakers of water. One labelled 80 degrees Celsius and one labelled 20 degrees Celsius. An arrow of heat from the 80 beaker to the 20 beaker." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"digital thermometer in glass of water photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/4.png. A thermometer standing in a glass of water.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/5.png": { t: "fig", about: "Four thermometers side by side with their labels: Celsius 0 and 100, Fahrenheit 32 and 212, Kelvin 273 and 373, Reaumur 0 and 80." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"dual scale Celsius Fahrenheit glass thermometer close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/6.png. A thermometer with Celsius on one side and Fahrenheit on the other.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/7.png": { t: "fig", about: "A ladder diagram with the same height shown as 100 divisions on Celsius, 180 divisions on Fahrenheit, 80 on Reaumur, 100 on Kelvin." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"liquid nitrogen frozen water cold temperature photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/8.png. A frosty glass beaker standing in a very cold bath.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/9.png": { t: "fig", about: "Three boxes with labelled drawings: a clinical thermometer with range 35 to 43 degrees Celsius, an electronic thermometer with a thermistor, a platinum resistance thermometer." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"clinical mercury thermometer close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/10.png. A clinical thermometer showing a narrow range around body temperature.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/11.png": { t: "fig", about: "A metal ball and a ring. Left: the cold ball passes through the ring. Right: the heated ball is larger and stuck above the ring, labelled expanded." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"railway track expansion joint gap photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/12.png. A small gap between two lengths of steel railway track.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/13.png": { t: "fig", about: "Three small drawings. A rod getting longer, labelled linear, alpha. A square getting larger, labelled superficial, beta. A cube getting larger, labelled cubical, gamma." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"steel bridge expansion joint close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/14.png. A metal expansion joint on a bridge.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/15.png": { t: "fig", about: "Three bars of lengths 1, 2 and 3 units labelled alpha, beta, gamma." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/16.png": { t: "fig", about: "A cube drawn with its length, area of one face and volume labelled. Under it the words one direction, two directions, three directions linked to 1, 2 and 3." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/17.png": { t: "fig", about: "A glass flask of coloured liquid with a thin neck. Labels: liquid level first drops a little when the flask expands, then rises. Mark apparent rise and real rise." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"liquid thermometer bulb red alcohol rising close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/18.png. Coloured liquid rising up the thin tube of a thermometer.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/19.png": { t: "fig", about: "A graph with temperature on the horizontal axis and volume of water on the vertical axis. The curve falls from 0 to 4 degrees Celsius, touches a minimum at 4, then rises. Label: minimum volume at 4 degrees Celsius." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"frozen lake surface ice fish winter photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/20.png. A lake covered with ice in winter.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/21.png": { t: "fig", about: "Two syringes. Left: pressure kept constant while volume grows on heating, labelled volume coefficient. Right: volume fixed while pressure rises on heating, labelled pressure coefficient." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hot air balloon inflating burner photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/22.png. A hot air balloon being filled with heated air.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/23.png": { t: "fig", about: "A hot metal ball being dropped into cold water inside an insulated cup. Arrows labelled heat lost by the ball and heat gained by the water, with an equals sign." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"laboratory calorimeter copper vessel with thermometer photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/24.png. A copper calorimeter with a thermometer and stirrer.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/25.png": { t: "fig", about: "Two identical beakers on identical burners. One with water and one with oil. After the same time the oil thermometer reads higher. Label: water heats slowly because of high specific heat." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"car radiator coolant reservoir engine bay photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/26.png. The radiator and coolant tank in the engine of a car.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/27.png": { t: "fig", about: "A graph of temperature against heat added for ice to water to steam. Two flat horizontal parts labelled melting at 80 calorie per gram and boiling at 536 calorie per gram." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ice cubes melting in glass of water photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/28.png. Ice cubes melting slowly in a glass of water.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/29.png": { t: "fig", about: "Three signposts labelled zeroth law thermal equilibrium, first law energy conservation, second law direction of heat." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"steam engine locomotive wheels photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/30.png. A steam locomotive with its engine and wheels.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/31.png": { t: "fig", about: "Three blocks A, B and C in a row. Equals signs between A and C and between B and C, and a large equals sign linking A and B labelled same temperature." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"thermometer touching two metal blocks temperature photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/32.png. A thermometer reading the temperature of a metal block.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/33.png": { t: "fig", about: "A box labelled heat given with an arrow to a cylinder. Out of it two arrows: one to a box labelled rise in internal energy and another to a piston lifting a weight labelled work done." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"bicycle pump piston heating when pumping photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/34.png. A hand pumping a bicycle pump.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/35.png": { t: "fig", about: "A heat engine drawn as a box. Arrow in from a hot source labelled heat taken in. Arrow out to a cold sink labelled heat rejected. Arrow up labelled work done, smaller than heat in." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"car engine cylinders pistons cutaway photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/36.png. A cutaway view of a car engine showing the pistons.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/37.png": { t: "fig", about: "A shallow dish of water with arrows of molecules leaving the surface. Labels: warm gives faster, wide surface gives faster." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"wet clothes drying on washing line sunlight photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/38.png. Wet clothes hanging on a line in the sun.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/39.png": { t: "fig", about: "A scale from dry to humid. Left end very low humidity with a label lips dry and cracked. Middle 50 percent comfortable. Right end very high humidity with a label sweat does not dry." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hygrometer dial humidity meter photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/40.png. A round dial hygrometer showing percentage humidity.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/41.png": { t: "fig", about: "Three small panels. Panel 1: a hot metal spoon in tea with heat travelling up the handle, labelled conduction. Panel 2: a pot with arrows of rising and falling water, labelled convection. Panel 3: the Sun with rays towards the Earth, labelled radiation." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"campfire heat spreading warm hands photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/42.png. People warming their hands near a bright campfire.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/43.png": { t: "fig", about: "A metal rod with one end in a flame. Heat arrows along the rod. Particles drawn in a row passing vibrations along, labelled no particle moves along." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"woollen sweater and blankets winter folded photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/44.png. Warm woollen clothes and blankets stacked together.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/45.png": { t: "fig", about: "A beaker of water heated at the bottom. Warm water rises in the middle as red arrows. Cool water sinks along the sides as blue arrows. Labelled convection currents." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"car radiator coolant circulation engine photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/46.png. The radiator of a car with its cooling fins.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/47.png": { t: "fig", about: "A graph of temperature against time for hot water. A curve that falls quickly at first and then slowly towards the room temperature line. Labels: fast at first, slow later." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/48.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"coastal beach evening breeze palm trees photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/48.png. A sea coast with palm trees leaning in the breeze.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/49.png": { t: "fig", about: "Two panels of a coast. Panel 1 daytime: arrows from the sea to the land, labelled sea breeze. Panel 2 night: arrows from the land to the sea, labelled land breeze." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/50.png": { t: "fig", about: "The Sun on the left, the Earth on the right, empty space between with dotted rays, and a label heat travels through vacuum, space stays cold." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/51.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sunlight warming face sun heat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/51.png. A person with face turned to the warm sunlight.",
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/52.png": { t: "fig", about: "A box with a tiny hole labelled all radiation entering gets trapped, with arrows entering and not coming out. Title perfectly black body." },
  "images/General_Awareness/Physics/Heat_and_Thermodynamics/53.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"person wearing white clothes in summer sun photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Heat_and_Thermodynamics/53.png. People in white cotton clothes walking in strong sunlight."
});

/* CHANGE LOG
   - Specific heat of water is 4200 joule per kilogram per degree Celsius, or 1 calorie per gram per degree Celsius (the source line gave 1000 calorie per gram).
   - Hot water is used for fomentation (the source line said fermentation).
   - Entropy is described as a measure of molecular disorder, and a state function of the system (the source line said it depends only on temperature).
   - Typing errors in the definitions of thermal expansion, evaporation and relative humidity were silently corrected.
*/
