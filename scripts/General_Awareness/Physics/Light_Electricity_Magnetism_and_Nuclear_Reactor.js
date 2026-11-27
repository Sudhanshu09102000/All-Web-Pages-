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

/* Field: General_Awareness · Subject: General_Science · Chapter: Light_Electricity_Magnetism_and_Nuclear_Reactor · 31 concept pages (+ overview) · 73 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "💡", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Light, Electricity, Magnetism and the Nuclear Reactor",
    thumb: {
      image: "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/thumbnail.png",
      banner: "GENERAL SCIENCE 2026",
      line1: "LIGHT • ELECTRICITY",
      line2: "MAGNETISM",
      line3: "NUCLEAR REACTOR",
      badge: "FULL CLASS",
      ribbon: "CONCEPTS • DIAGRAMS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Light, Electricity, Magnetism & Nuclear Reactor | Physics for Competitive Exams",
      altTitles: ["Electricity and Magnetism Full Class for SSC CGL", "Light and Nuclear Reactor Physics in One Class"],
      description: "Light, electricity, magnetism and the nuclear reactor give many questions in the General Science section. In this class we learn every idea slowly, with simple diagrams and practice questions.\n\n📌 IN THIS CLASS\n✅ Mirrors, refraction, rainbow and total internal reflection\n✅ Coulomb's law, Ohm's law and resistors\n✅ Magnets, induction, transformer\n✅ Nuclear reactor parts\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Light\n00:00 Electricity\n00:00 Magnetism\n00:00 Nuclear reactor\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Physics #GeneralScience",
      tags: ["light physics", "electricity class", "magnetism class", "nuclear reactor", "general science", "physics for ssc cgl", "ssc cgl general science", "reflection of light", "refraction of light", "total internal reflection", "rainbow formation", "ohm's law", "coulomb's law", "electromagnetic induction", "transformer working", "fuse and resistance", "paramagnetic diamagnetic", "curie temperature", "defects of vision", "nuclear fission", "chain reaction", "moderator control rods", "competitive exams physics", "static gk science", "railway science", "Li"],
      hashtags: ["SSCCGL", "Physics", "GeneralScience"],
      thumbText: "LIGHT • ELECTRICITY • MAGNETISM",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "💡 New class is live: Light, Electricity, Magnetism and the Nuclear Reactor. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Light\n00:00 Electricity\n00:00 Magnetism\n00:00 Nuclear reactor",
      playlist: "General Science — Physics Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on Light, Electricity, Magnetism, Electromagnetic Induction and the Nuclear Reactor</u>. These topics give a steady number of questions in the General Science section, so we will learn each idea slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>31</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>73</b><span>Questions</span></div>
        <div class="cp-stat"><b>~135 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Light</b><br>Reflection, mirrors, refraction, the rainbow, twinkling of stars, scattering, total internal reflection and the defects of the eye, each explained in plain words.</li>
        <li><b>Static Electricity and Electric Fields</b><br>Charges, Coulomb's law, the electric field and its lines, electric potential, the dipole and the capacitor.</li>
        <li><b>Materials and Current</b><br>Conductors, insulators and semiconductors, direct and alternating current, resistance, resistivity and Ohm's law.</li>
        <li><b>Circuits and Effects of Current</b><br>Resistors in series and in parallel, cells and electromotive force, heating effect and fuse, electroplating, house wiring and the lightning conductor.</li>
        <li><b>Magnetism</b><br>Types of magnets, their properties, magnetic field, the earth's magnetism, magnetic storms, auroras, meters and the three kinds of magnetic substances.</li>
        <li><b>Electromagnetic Induction</b><br>Faraday's law, Lenz's law, eddy currents, self and mutual induction and alternating current.</li>
        <li><b>Machines</b><br>The dynamo, the motor and the transformer.</li>
        <li><b>The Nuclear Reactor</b><br>Fission, fuel, chain reaction, moderator, control rods, coolant and shield.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on the rainbow, mirrors, resistance, fuses, magnets, transformers and the nuclear reactor appear again and again in competitive exams, so learning them well saves time.</div>
    `
  },
  2: {
    type: "concept", icon: "🪞", accent: "#0ea5e9", pauseTimer: true,
    title: "Reflection of Light and Spherical Mirrors",
    html: `
      <p class="cp-lead"><u>Reflection</u> means that light bounces back when it hits a smooth, shiny surface. Mirrors work because of this simple idea.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/1.png" alt="Ray diagram of a plane mirror: incident ray, dotted normal line, reflected ray, angle i an" data-caption="Light striking a mirror: the angle of incidence equals the angle of reflection." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/2.png" alt="concave mirror and convex mirror side by side photo" data-caption="A concave mirror curves inward and a convex mirror curves outward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">There are two laws of reflection. First, the angle of incidence is equal to the angle of reflection. Second, the incident ray, the normal and the reflected ray all lie in the same plane.</p>
      <table><thead><tr><th>Mirror</th><th>Shape</th><th>Main uses</th></tr></thead><tbody><tr><td>Concave mirror</td><td>Curved inward</td><td>Torches, search-lights, vehicle headlights, shaving mirrors, dentist mirrors, solar furnaces</td></tr><tr><td>Convex mirror</td><td>Curved outward</td><td>Rear-view mirrors of vehicles</td></tr></tbody></table>
      <p class="cp-lead">A concave mirror gathers light and sends it out as a strong parallel beam, which is why headlights use it. A convex mirror always gives an upright but smaller image, and it covers a much wider area than a flat mirror, so the driver sees more traffic behind.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/3.png" alt="Two small diagrams: a concave mirror sending parallel light rays to one focus point, and a" data-caption="Concave mirrors gather light to a point; convex mirrors spread it out." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A convex mirror makes the image smaller, never larger. The mirror that shows a bigger face for shaving or tooth checking is the concave mirror.</div>
      <div class="cp-note exam">Rear-view mirror means convex. Shaving mirror, dentist mirror, headlight and solar furnace mean concave.</div>
    `
  },
  3: {
    questext: "Which mirror is used as the rear-view mirror in vehicles?",
    options: ["Plane mirror", "Concave mirror", "Convex mirror", "Cylindrical mirror"],
    correct: "3",
    exptext: "✅ A convex mirror is used because it gives an upright image and a wide field of view. 📌 Convex means wide view. ❌ A concave mirror is wrong because it can give inverted and magnified images."
  },
  4: {
    questext: "A dentist uses which type of mirror to see a large image of a patient's teeth?",
    options: ["Concave mirror", "Convex mirror", "Plane mirror", "Cylindrical mirror"],
    correct: "1",
    exptext: "✅ A concave mirror held close to an object gives a large, upright image. 📌 Concave mirrors enlarge, convex mirrors shrink. ❌ A convex mirror is wrong because it always shows a smaller image."
  },
  5: {
    type: "concept", icon: "🔦", accent: "#f59e0b", pauseTimer: true,
    title: "Refraction of Light",
    html: `
      <p class="cp-lead"><u>Refraction</u> is the bending of light when it passes from one transparent medium into another. It happens because light travels at different speeds in different media.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/4.png" alt="A light ray going from air into glass, bending towards the normal; angle i in air and smal" data-caption="A ray entering glass bends towards the normal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/5.png" alt="pencil partly immersed in water glass looks bent photo" data-caption="A pencil in water appears bent where air meets water." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">When light goes from a faster medium to a slower medium, the ray bends towards the normal. The medium with the larger refractive index is called the optically denser medium, and the one with the smaller refractive index is the optically rarer medium. Light travels faster in a rarer medium than in a denser medium.</p>
      <div class="cp-formula" translate="no"><small>Snell's law of refraction</small>sin i ÷ sin r = a constant</div>
      <p class="cp-lead">There are two laws of refraction. The incident ray, the refracted ray and the normal all lie in the same plane. And the ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant for a given pair of media. This second law is called Snell's law.</p>
      <table><thead><tr><th>Everyday example</th><th>Why it looks that way</th></tr></thead><tbody><tr><td>Pencil in a glass of water</td><td>The ray bends at the water surface, so the pencil looks displaced</td></tr><tr><td>Bottom of a pond or tank</td><td>It looks raised</td></tr><tr><td>Letters under a thick glass slab</td><td>They look raised</td></tr><tr><td>Lemon in a glass of water</td><td>It looks bigger when viewed from the side</td></tr></tbody></table>
      <div class="cp-note trap">Refraction is not reflection. In reflection the light comes back into the same medium; in refraction it goes into the new medium and changes direction.</div>
      <div class="cp-note exam">Snell's law is sin i ÷ sin r = constant. A denser medium means a higher refractive index and a slower speed of light.</div>
    `
  },
  6: {
    questext: "Consider the following statements about refraction of light:\n1. Light bends towards the normal when it goes from a rarer medium to a denser medium.\n2. The speed of light is higher in a denser medium than in a rarer medium.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Only 2", "Neither 1 nor 2", "Only 1"],
    correct: "4",
    exptext: "✅ Only statement 1 is correct. 📌 Slower medium means bending towards the normal. ❌ Statement 2 is wrong because light is slower in a denser medium."
  },
  7: {
    questext: "The law stating that the ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant is known as",
    options: ["Coulomb's law", "Snell's law", "Ohm's law", "Lenz's law"],
    correct: "2",
    exptext: "✅ This is Snell's law of refraction. 📌 Snell means sine ratio. ❌ Coulomb's law is about charges, Ohm's law about current and Lenz's law about induction."
  },
  8: {
    type: "concept", icon: "🌈", accent: "#8b5cf6", pauseTimer: true,
    title: "Dispersion of White Light by a Glass Prism and the Rainbow",
    html: `
      <p class="cp-lead"><u>Dispersion</u> is the splitting of white light into its colours. A glass prism does this because each colour bends by a different amount.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/6.png" alt="A white light ray entering a triangular glass prism and spreading into seven colours, viol" data-caption="A prism splits white light into a band of seven colours." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/7.png" alt="rainbow over green hills photo" data-caption="A rainbow is a natural spectrum seen after rain." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The seven colours always come in the order Violet, Indigo, Blue, Green, Yellow, Orange, Red. Red light bends the least and violet light bends the most. The band of colours that we see is called a spectrum.</p>
      <div class="cp-mnemonic">VIBGYOR gives the colours from violet to red.</div>
      <p class="cp-lead">A rainbow is a natural spectrum. Tiny water droplets in the air act like small prisms. They bend the sunlight, split it into colours, reflect it once inside the drop and bend it again as it comes out.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/8.png" alt="Cross-section of one raindrop: sunlight enters, splits into colours, reflects at the back," data-caption="Sunlight is bent, split and reflected inside a raindrop to make a rainbow." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A rainbow is always formed in the direction opposite to the Sun. You must stand with your back towards the Sun to see it.</div>
      <div class="cp-note exam">Red bends least, violet bends most. A rainbow needs dispersion, refraction and internal reflection in water droplets.</div>
    `
  },
  9: {
    questext: "In the spectrum formed by a glass prism, which colour bends the most?",
    options: ["Violet", "Red", "Green", "Yellow"],
    correct: "1",
    exptext: "✅ Violet bends the most and red bends the least. 📌 Violet is the most bent end of VIBGYOR. ❌ Red is wrong because it is the least bent."
  },
  10: {
    questext: "A rainbow is formed due to",
    options: ["Reflection and diffraction of sunlight", "Scattering and polarisation of sunlight", "Dispersion and internal reflection of sunlight in water droplets", "Interference of sunlight in clouds"],
    correct: "3",
    exptext: "✅ Water droplets bend, split and reflect sunlight inside them. 📌 Droplets act like tiny prisms. ❌ Scattering explains the blue sky, not the rainbow."
  },
  11: {
    questext: "A rainbow is always formed in a direction",
    options: ["Same as that of the Sun", "Opposite to that of the Sun", "At a right angle to the Sun", "Directly above the observer"],
    correct: "2",
    exptext: "✅ The rainbow appears opposite to the Sun, so the Sun is behind the observer. 📌 Back to the Sun, face the rainbow. ❌ A rainbow in the direction of the Sun is not possible."
  },
  12: {
    type: "concept", icon: "✨", accent: "#ef4444", pauseTimer: true,
    title: "Atmospheric Refraction",
    html: `
      <p class="cp-lead"><u>Atmospheric refraction</u> is the bending of light by the earth's atmosphere. Air is not still and its density keeps changing, so the path of light keeps changing too.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/9.png" alt="Starlight entering the atmosphere through layers of different density, bending slightly, w" data-caption="Starlight bends in the atmosphere, so a star appears slightly displaced." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/10.png" alt="star trails or twinkling stars night sky photo" data-caption="Stars seem to twinkle because of atmospheric refraction." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Air just above a fire is hotter, lighter and has a slightly smaller refractive index than the cooler air above it. As this air keeps moving, objects seen through it seem to waver.</p>
      <table><thead><tr><th>Effect</th><th>Reason</th></tr></thead><tbody><tr><td>Twinkling of stars</td><td>Starlight is refracted again and again as it passes through moving layers of air</td></tr><tr><td>Sun visible about 2 minutes before the actual sunrise</td><td>Atmospheric refraction lifts the Sun's image above the horizon</td></tr><tr><td>Sun visible about 2 minutes after the actual sunset</td><td>The same bending keeps the image above the horizon</td></tr></tbody></table>
      <p class="cp-lead">This is why the day appears about 4 minutes longer than it really is: about 2 minutes are gained at sunrise and about 2 minutes at sunset.</p>
      <div class="cp-note trap">Planets do not twinkle as strongly as stars because they are much closer and look like small discs, not points of light.</div>
      <div class="cp-note exam">Twinkling of stars, advance sunrise and delayed sunset are all caused by atmospheric refraction.</div>
    `
  },
  13: {
    questext: "The twinkling of stars is due to",
    options: ["Reflection of starlight", "Total internal reflection", "Scattering of starlight", "Atmospheric refraction of starlight"],
    correct: "4",
    exptext: "✅ Starlight is refracted again and again by moving layers of air. 📌 Moving air means twinkling. ❌ Scattering explains the blue sky and the red Sun."
  },
  14: {
    questext: "The Sun is visible about 2 minutes before the actual sunrise because of",
    options: ["Dispersion", "Scattering", "Atmospheric refraction", "Diffraction"],
    correct: "3",
    exptext: "✅ Atmospheric refraction bends the sunlight over the horizon before the Sun is really above it. 📌 The Sun is seen early and set late. ❌ Scattering is wrong because it changes colour, not position."
  },
  15: {
    type: "concept", icon: "🌤️", accent: "#14b8a6", pauseTimer: true,
    title: "Scattering of Light and the Tyndall Effect",
    html: `
      <p class="cp-lead"><u>Scattering</u> is the spreading of light in many directions when it strikes tiny particles of matter. Many beautiful sights of nature are caused by scattering.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/11.png" alt="Sunlight entering the atmosphere; blue light scattered strongly in all directions, red lig" data-caption="Blue light is scattered the most, so the sky looks blue." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/12.png" alt="sunbeams through forest trees mist photo" data-caption="Sunbeams are visible because fine particles scatter the light." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The blue colour of the sky, the colour of deep sea water and the red colour of the Sun at sunrise and sunset are all caused by scattering.</p>
      <p class="cp-lead">The <b>Tyndall effect</b> is the scattering of light by the particles of a colloid. The particles are large enough to scatter the light and make the path of the beam visible. A fine beam of sunlight entering a smoke-filled room through a small hole, or sunlight passing through a dense forest, shows this effect.</p>
      <table><thead><tr><th>Sight</th><th>Cause</th></tr></thead><tbody><tr><td>Blue sky</td><td>Scattering of light</td></tr><tr><td>Colour of deep sea</td><td>Scattering of light</td></tr><tr><td>Red Sun at sunrise and sunset</td><td>Scattering of light</td></tr><tr><td>Visible beam in a smoky room</td><td>Tyndall effect</td></tr></tbody></table>
      <div class="cp-note trap">Brilliance of a diamond is not scattering. It is caused by total internal reflection.</div>
      <div class="cp-note exam">Scattering gives the blue sky and the red Sun. The Tyndall effect shows a visible light path in a colloid.</div>
    `
  },
  16: {
    questext: "The blue colour of the sky is due to",
    options: ["Scattering of light", "Total internal reflection", "Dispersion of light", "Reflection of light from the sea"],
    correct: "1",
    exptext: "✅ Tiny particles in the air scatter blue light the most. 📌 Sky blue means scattering. ❌ Dispersion splits light into a spectrum, which is not what makes the sky blue."
  },
  17: {
    questext: "The Tyndall effect is the scattering of light by",
    options: ["A pure solid", "A true solution", "A vacuum", "The particles of a colloid"],
    correct: "4",
    exptext: "✅ Colloidal particles scatter the light and make its path visible. 📌 Tyndall means a visible beam. ❌ A true solution has particles too small to scatter light visibly."
  },
  18: {
    questext: "Which of the following is NOT due to scattering of light?",
    options: ["Reddening of the Sun at sunset", "Brilliance of a diamond", "Blue colour of deep sea", "Visible sunbeam in a smoky room"],
    correct: "2",
    exptext: "✅ The brilliance of a diamond is due to total internal reflection. 📌 Diamond means total internal reflection. ❌ The other three are all examples of scattering."
  },
  19: {
    type: "concept", icon: "💎", accent: "#ec4899", pauseTimer: true,
    title: "Total Internal Reflection",
    html: `
      <p class="cp-lead"><u>Total internal reflection</u> happens when light travels from a denser medium to a rarer medium and does not leave it, but reflects completely back inside. Examples are glass to air or water to air.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/13.png" alt="A ray inside glass hitting the glass-air boundary at a large angle and reflecting fully ba" data-caption="Light inside glass is reflected fully back when it hits the surface at a large angle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/14.png" alt="cut diamond sparkling brilliance photo" data-caption="A diamond sparkles because light is trapped by total internal reflection." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">This effect needs light to travel from a denser medium to a rarer medium. It cannot happen when light goes from a rarer medium to a denser medium.</p>
      <table><thead><tr><th>Example</th><th>How total internal reflection helps</th></tr></thead><tbody><tr><td>Mirage</td><td>Hot air near the ground is less dense, so light from the sky bends and is reflected up, and a patch of road looks wet</td></tr><tr><td>Diamond</td><td>Light is reflected many times inside it, which gives its brilliance</td></tr><tr><td>Optical fibre</td><td>Light is reflected again and again along the fibre with almost no loss</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/15.png" alt="optical fibre cable glowing ends close-up photo" data-caption="Optical fibres carry light signals by total internal reflection." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">In a mirage there is no real water. It is only the image of the sky, formed by the reflection of light.</div>
      <div class="cp-note exam">Mirage, brilliance of a diamond and optical fibres are the three standard examples of total internal reflection.</div>
    `
  },
  20: {
    questext: "The brilliance of a diamond is mainly due to",
    options: ["Total internal reflection of light inside it", "Scattering of light", "Diffraction of light", "Absorption of light"],
    correct: "1",
    exptext: "✅ Light is totally reflected many times inside a diamond. 📌 Diamond means total internal reflection. ❌ Scattering is wrong because it only spreads light."
  },
  21: {
    questext: "Total internal reflection can occur when light travels from",
    options: ["Air to glass", "Air to water", "A denser medium to a rarer medium", "A vacuum to water"],
    correct: "3",
    exptext: "✅ Light must go from a denser medium to a rarer medium. 📌 Dense to rare, it stays there. ❌ Air to glass is rarer to denser, so no total reflection is possible."
  },
  22: {
    questext: "Optical fibres work on the principle of",
    options: ["Refraction of light", "Total internal reflection", "Dispersion of light", "Scattering of light"],
    correct: "2",
    exptext: "✅ Light is reflected again and again along the fibre with almost no loss. 📌 Fibre means total internal reflection. ❌ Dispersion splits colours and would spoil the signal."
  },
  23: {
    type: "concept", icon: "👁️", accent: "#3b82f6", pauseTimer: true,
    title: "Power of Accommodation and Defects of Vision",
    html: `
      <p class="cp-lead">The <b>power of accommodation</b> is the ability of the eye lens to change its shape to focus both near and distant objects. A normal human eye can see clearly the objects that are between 25 centimetres and infinity.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/16.png" alt="Side view of a human eye with a labelled cornea, lens, retina, and a clear image focused e" data-caption="In a normal eye, light is focused exactly on the retina." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/17.png" alt="Two eye diagrams: myopia with the image formed in front of the retina and a concave lens c" data-caption="Myopia needs a concave lens and hypermetropia needs a convex lens." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Defect</th><th>Problem</th><th>Correction</th></tr></thead><tbody><tr><td>Nearsightedness (myopia)</td><td>Eyeball too long or lens too curved; the image forms in front of the retina; near objects are seen clearly</td><td>Concave lens</td></tr><tr><td>Farsightedness (hypermetropia)</td><td>Eyeball too short or lens too flat; the image forms behind the retina; distant objects are seen more clearly</td><td>Convex lens</td></tr><tr><td>Astigmatism</td><td>Cornea is not perfectly round, so the vision is blurred</td><td>Cylindrical lens</td></tr></tbody></table>
      <p class="cp-lead">In astigmatism the front surface of the eye is not perfectly round, so light from one object is not brought to a single focus. A cylindrical lens corrects this uneven curvature.</p>
      <div class="cp-note trap">Do not mix the two lenses. Concave lens for nearsightedness, convex lens for farsightedness.</div>
      <div class="cp-note exam">Myopia means a concave lens. Hypermetropia means a convex lens. Astigmatism means a cylindrical lens.</div>
    `
  },
  24: {
    questext: "Nearsightedness (myopia) is corrected by using a",
    options: ["Convex lens", "Cylindrical lens", "Plane glass", "Concave lens"],
    correct: "4",
    exptext: "✅ A concave lens spreads the rays so that the image falls on the retina. 📌 Near sight means concave. ❌ A convex lens corrects farsightedness."
  },
  25: {
    questext: "Astigmatism of the eye is corrected by using a",
    options: ["Convex lens", "Concave lens", "Cylindrical lens", "Plane mirror"],
    correct: "3",
    exptext: "✅ A cylindrical lens makes up for the uneven curvature of the cornea. 📌 Astigmatism means cylindrical. ❌ A concave lens is for nearsightedness."
  },
  26: {
    questext: "A normal human eye can see objects clearly if they are between",
    options: ["25 centimetres and infinity", "10 centimetres and 25 centimetres", "1 metre and infinity", "5 centimetres and 50 centimetres"],
    correct: "1",
    exptext: "✅ The least distance of clear vision is 25 centimetres, and the far limit is infinity. 📌 Remember 25 centimetres. ❌ 10 centimetres is too close for a normal eye."
  },
  27: {
    type: "concept", icon: "⚡", accent: "#f97316", pauseTimer: true,
    title: "Static Electricity and Coulomb's Law",
    html: `
      <p class="cp-lead"><u>Electricity is the flow of electric charge.</u> In metal wires the moving charges are electrons. Charges can also stay at rest on a body, and this is called static electricity.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/18.png" alt="balloon rubbed on hair sticking to wall photo" data-caption="A rubbed balloon holds static charge and sticks to a wall." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/19.png" alt="Two point charges q1 and q2 at a distance r, with arrows for the force between them; label" data-caption="Two charges push or pull each other with a force that depends on distance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The electricity produced by rubbing two suitable bodies together is called <b>static electricity</b> or frictional electricity.</p>
      <div class="cp-formula" translate="no"><small>Coulomb's law</small>F = K × q<sub>a</sub> × q<sub>b</sub> ÷ r<sup>2</sup></div>
      <p class="cp-lead">Coulomb's law says that the electrostatic force between two stationary point charges is directly proportional to the product of the two charges and inversely proportional to the square of the distance between them.</p>
      <p class="cp-lead"><b>Example:</b> if the distance between two charges is made twice as large, the force becomes one fourth of what it was, because two squared is four.</p>
      <div class="cp-note trap">The force depends on the square of the distance, not on the distance itself. Doubling the distance cuts the force to one fourth, not one half.</div>
      <div class="cp-note exam">Like charges repel, unlike charges attract. The force follows the inverse square law, just like gravitation.</div>
    `
  },
  28: {
    questext: "According to Coulomb's law, if the distance between two charges is doubled, the force between them becomes",
    options: ["Double", "Half", "Four times", "One fourth"],
    correct: "4",
    exptext: "✅ The force varies as one over the distance squared, so it becomes one fourth. 📌 Twice the distance means one fourth of the force. ❌ Half is wrong because the distance is squared."
  },
  29: {
    questext: "The electricity produced by friction between two suitable bodies is called",
    options: ["Current electricity", "Static electricity", "Thermoelectricity", "Alternating electricity"],
    correct: "2",
    exptext: "✅ Charge produced by rubbing stays on the body, so it is static or frictional electricity. 📌 Rub means static. ❌ Current electricity needs a continuous flow of charge."
  },
  30: {
    type: "concept", icon: "🧲", accent: "#84cc16", pauseTimer: true,
    title: "Electric Field and Electric Field Lines",
    html: `
      <p class="cp-lead">The space around a charge, in which its influence can be felt by another charge, is called an <u>electric field</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/20.png" alt="Electric field lines: from a positive charge radiating outward, into a negative charge fro" data-caption="Field lines start on a positive charge and end on a negative charge." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>electric field intensity</b> at a point is the electrostatic force acting on a unit positive test charge placed at that point. Its unit is newton per coulomb.</p>
      <div class="cp-formula" translate="no"><small>Electric field intensity</small>E = F ÷ q</div>
      <p class="cp-lead">For a point charge, the field intensity becomes smaller as you move away, because it is inversely proportional to the square of the distance from the charge.</p>
      <p class="cp-lead">An <b>electric field line</b> is an imaginary line whose tangent at any point shows the direction of the electric field at that point.</p>
      <table><thead><tr><th>Property of field lines</th><th>Meaning</th></tr></thead><tbody><tr><td>Start and end</td><td>They begin on a positive charge and end on a negative charge</td></tr><tr><td>Crossing</td><td>Two field lines never cross each other</td></tr><tr><td>In empty space</td><td>They do not start or stop in the middle of space</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/21.png" alt="iron filings pattern around bar magnet photo" data-caption="Iron filings show field lines around a magnet in a similar way." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Field lines are only imaginary lines. They are drawn to show the direction of the field, and they never cross.</div>
      <div class="cp-note exam">Unit of electric field intensity is newton per coulomb. Lines begin on positive and end on negative charges.</div>
    `
  },
  31: {
    questext: "The SI unit of electric field intensity is",
    options: ["Newton per coulomb", "Joule per coulomb", "Coulomb per newton", "Volt per ampere"],
    correct: "1",
    exptext: "✅ Field intensity is force per unit charge, so newton per coulomb. 📌 Force divided by charge. ❌ Joule per coulomb is the unit of potential."
  },
  32: {
    questext: "Consider the following statements about electric field lines:\n1. Two electric field lines can intersect each other.\n2. Electric field lines begin on a positive charge and end on a negative charge.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Both 1 and 2", "Only 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Only statement 2 is correct. 📌 Plus to minus, and never crossing. ❌ Statement 1 is wrong because crossing lines would give two directions of field at one point."
  },
  33: {
    type: "concept", icon: "🔋", accent: "#e11d48", pauseTimer: true,
    title: "Electric Potential and Potential Difference",
    html: `
      <p class="cp-lead"><u>Electric potential</u> at a point is the work done per unit charge in carrying a test charge from infinity to that point.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/22.png" alt="Water-tank analogy: a high tank connected by a pipe to a low tank, water arrow flowing dow" data-caption="Charge flows from high potential to low potential, like water flowing downhill." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-formula" translate="no"><small>Electric potential</small>V = W ÷ q &nbsp; (unit: joule per coulomb, called volt)</div>
      <p class="cp-lead"><b>Potential difference</b> is the quantity that decides the direction in which charge flows between two points. A positive charge always tends to move from higher potential towards lower potential.</p>
      <p class="cp-lead"><b>Example:</b> if 10 joules of work are done to bring 2 coulombs of charge to a point, the potential at that point is 10 divided by 2, which is 5 volts.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/23.png" alt="digital voltmeter measuring battery voltage photo" data-caption="A voltmeter measures the potential difference between two points." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not confuse joule with volt. One volt is one joule of work for every coulomb of charge.</div>
      <div class="cp-note exam">Unit of potential is joule per coulomb, which is the volt. Positive charge moves from high to low potential.</div>
    `
  },
  34: {
    questext: "The SI unit of electric potential is",
    options: ["Joule", "Volt", "Farad", "Ohm"],
    correct: "2",
    exptext: "✅ Potential is work per unit charge, which is joule per coulomb, called volt. 📌 Volt is joule per coulomb. ❌ Joule alone is the unit of work or energy."
  },
  35: {
    questext: "A positive charge always tends to move from",
    options: ["Lower potential to higher potential", "Zero potential to infinity", "The earth to a conductor only", "Higher potential to lower potential"],
    correct: "4",
    exptext: "✅ A positive charge moves from higher to lower potential. 📌 Charge flows downhill in potential. ❌ Lower to higher is the direction of movement of a negative charge."
  },
  36: {
    type: "concept", icon: "🔌", accent: "#92400e", pauseTimer: true,
    title: "Electric Dipole and Capacitor",
    html: `
      <p class="cp-lead">An <b>electric dipole</b> is a pair of equal and opposite point charges kept a very small distance apart. Its <b>dipole moment</b> is the product of one charge and the distance between the charges.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/24.png" alt="An electric dipole: a positive charge plus and a negative charge minus joined by a short a" data-caption="A dipole is a pair of equal and opposite charges a small distance apart." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A <b>capacitor</b> (or condenser) is a device that can store a large amount of charge without changing its size.</p>
      <div class="cp-formula" translate="no"><small>Capacitance</small>C = q ÷ V</div>
      <p class="cp-lead">The capacitance of a conductor is the ratio of the charge given to it and the change in its potential. Its unit is coulomb per volt, called the <b>farad</b>. The farad is a very large unit, so the practical unit is the microfarad, and one microfarad is equal to one millionth of a farad.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/25.png" alt="electronic capacitors on a circuit board photo" data-caption="Capacitors in many shapes and sizes are used in electronic circuits." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The farad is a unit of capacitance, not of charge. Charge is measured in coulomb.</div>
      <div class="cp-note exam">Unit of capacitance is farad. One microfarad is ten to the power minus six farad.</div>
    `
  },
  37: {
    questext: "The SI unit of capacitance is",
    options: ["Coulomb", "Henry", "Farad", "Weber"],
    correct: "3",
    exptext: "✅ Capacitance is charge per unit potential, measured in farad. 📌 Farad is for capacitors. ❌ Henry is the unit of inductance and weber of magnetic flux."
  },
  38: {
    questext: "One microfarad is equal to",
    options: ["One millionth of a farad", "One thousandth of a farad", "One million farad", "One billionth of a farad"],
    correct: "1",
    exptext: "✅ Micro means one millionth, so one microfarad is ten to the power minus six farad. 📌 Micro means millionth. ❌ One thousandth is the meaning of milli."
  },
  39: {
    type: "concept", icon: "🔩", accent: "#a855f7", pauseTimer: true,
    title: "Conductors, Insulators and Semiconductors",
    html: `
      <p class="cp-lead">Materials are divided into three kinds according to how well they carry electric charge. The difference comes from how many <u>free electrons</u> they have.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/26.png" alt="Three boxes showing a metal with many free electrons, an insulator with no free electrons " data-caption="Conductors have many free electrons, insulators none, semiconductors few." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Type</th><th>Free electrons</th><th>Examples</th></tr></thead><tbody><tr><td>Conductor</td><td>Many free electrons</td><td>Metals such as copper and silver</td></tr><tr><td>Insulator</td><td>No free electrons, so no conduction</td><td>Rubber, glass, plastic</td></tr><tr><td>Semiconductor</td><td>Few at normal temperature, more when the temperature rises</td><td>Silicon and germanium</td></tr></tbody></table>
      <p class="cp-lead">A semiconductor behaves like an insulator at low temperature, but when it is heated more electrons become free and it starts to conduct. That is why semiconductors are used to make computer chips and many other electronic devices.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/27.png" alt="silicon wafer semiconductor chip photo" data-caption="Silicon is the most common semiconductor material." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A semiconductor is not a conductor at all temperatures. It conducts only when enough electrons become free.</div>
      <div class="cp-note exam">Silicon and germanium are semiconductors. Metals are conductors. Rubber and glass are insulators.</div>
    `
  },
  40: {
    questext: "Which of the following is a semiconductor?",
    options: ["Copper", "Glass", "Gold", "Silicon"],
    correct: "4",
    exptext: "✅ Silicon is a semiconductor. 📌 Silicon and germanium are the two main semiconductors. ❌ Copper and gold are conductors and glass is an insulator."
  },
  41: {
    questext: "An insulator does not conduct electricity because it",
    options: ["Has many free electrons", "Has no free electrons", "Has many free protons", "Is always very hot"],
    correct: "2",
    exptext: "✅ Without free electrons no charge can flow. 📌 No free electrons, no current. ❌ Many free electrons belong to a conductor."
  },
  42: {
    type: "concept", icon: "〰️", accent: "#0891b2", pauseTimer: true,
    title: "Electric Current: Direct and Alternating",
    html: `
      <p class="cp-lead"><u>Electric current</u> is the flow of electric charge. Its SI unit is the ampere.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/28.png" alt="Two graphs: a flat horizontal line for direct current and a smooth wave above and below ze" data-caption="Direct current is steady; alternating current keeps changing direction." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A current whose magnitude and direction do not change with time is called <b>direct current</b>. A current whose magnitude changes continuously and whose direction changes again and again is called <b>alternating current</b>.</p>
      <table><thead><tr><th>Material</th><th>What carries the current</th></tr></thead><tbody><tr><td>Solid conductor</td><td>Flow of electrons</td></tr><tr><td>Liquid</td><td>Flow of ions and electrons</td></tr><tr><td>Semiconductor</td><td>Flow of electrons and holes</td></tr></tbody></table>
      <p class="cp-lead">An <b>inverter</b> is a device that converts direct current into alternating current. Batteries give direct current, so an inverter is needed to run home appliances from a battery during a power cut.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/29.png" alt="home inverter and battery photo" data-caption="An inverter changes battery direct current into alternating current." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The inverter converts direct current into alternating current. The opposite change, from alternating to direct current, is done by a rectifier.</div>
      <div class="cp-note exam">Unit of current is ampere. In semiconductors, electrons and holes carry the current.</div>
    `
  },
  43: {
    questext: "The device which converts direct current into alternating current is called",
    options: ["An inverter", "A rectifier", "A transformer", "A dynamo"],
    correct: "1",
    exptext: "✅ An inverter changes direct current into alternating current. 📌 Inverter means direct to alternating. ❌ A rectifier does the opposite."
  },
  44: {
    questext: "In a semiconductor, electric current flows due to the movement of",
    options: ["Protons and neutrons", "Neutrons only", "Electrons and holes", "Ions only"],
    correct: "3",
    exptext: "✅ In semiconductors both electrons and holes carry current. 📌 Semiconductor means electrons and holes. ❌ In liquids the carriers are ions."
  },
  45: {
    type: "concept", icon: "🚧", accent: "#65a30d", pauseTimer: true,
    title: "Resistance, Conductance and Resistivity",
    html: `
      <p class="cp-lead"><u>Resistance</u> is the opposition that a substance offers to the flow of electric current. It is shown by the letter R and its SI unit is the ohm.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/30.png" alt="A water pipe analogy: a narrow rough pipe resisting water flow and a wide smooth pipe lett" data-caption="A narrow pipe resists water flow, just as a thin wire resists current." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Conductance</b> is the reciprocal of resistance, and its unit is the mho, also called siemens. <b>Resistivity</b> is a property of the material, and its unit is ohm metre. Conductivity is the reciprocal of resistivity.</p>
      <table><thead><tr><th>Quantity</th><th>SI unit</th><th>Remark</th></tr></thead><tbody><tr><td>Resistance</td><td>Ohm</td><td>Depends on the length, area and material</td></tr><tr><td>Conductance</td><td>Mho or siemens</td><td>Reciprocal of resistance</td></tr><tr><td>Resistivity</td><td>Ohm metre</td><td>Depends only on material and temperature</td></tr></tbody></table>
      <p class="cp-lead">Resistivity depends on the nature and the temperature of the material. It does not depend on the length or the area of cross-section of the conductor. The resistivity of metals increases when the temperature rises.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/31.png" alt="coiled nichrome heating wire photo" data-caption="Resistance wire has high resistivity and is used in heating elements." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Resistance changes with the length and thickness of a wire, but resistivity does not. Resistivity belongs to the material.</div>
      <div class="cp-note exam">Resistivity of metals increases with temperature. Unit of conductance is mho.</div>
    `
  },
  46: {
    questext: "The resistivity of a metal, when its temperature rises,",
    options: ["Decreases", "Increases", "Stays the same", "Becomes zero"],
    correct: "2",
    exptext: "✅ In metals the resistivity increases with temperature. 📌 Hot metal resists more. ❌ Staying the same is wrong because temperature affects resistivity."
  },
  47: {
    questext: "Which of the following does NOT affect the resistivity of a material?",
    options: ["Nature of the material", "Temperature of the material", "Purity of the material", "Length of the conductor"],
    correct: "4",
    exptext: "✅ Resistivity does not depend on the length or the area of the conductor. 📌 Resistivity belongs to the material. ❌ Nature and temperature both change resistivity."
  },
  48: {
    type: "concept", icon: "🔗", accent: "#d946ef", pauseTimer: true,
    title: "Ohm's Law and Combination of Resistances",
    html: `
      <p class="cp-lead"><u>Ohm's law</u> says that if the temperature and other physical conditions stay the same, the current through a conductor is directly proportional to the potential difference across its ends.</p>
      <div class="cp-formula" translate="no"><small>Ohm's law</small>V = I × R</div>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/32.png" alt="Series circuit with three resistors in one loop, same current arrow, and a parallel circui" data-caption="In series the current is the same; in parallel the voltage is the same." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Point</th><th>Series</th><th>Parallel</th></tr></thead><tbody><tr><td>Equivalent resistance</td><td>R = R1 + R2 + R3</td><td>1/R = 1/R1 + 1/R2 + 1/R3</td></tr><tr><td>Current</td><td>Same through every resistor</td><td>Divides among the branches</td></tr><tr><td>Potential difference</td><td>Divides among the resistors</td><td>Same across every resistor</td></tr></tbody></table>
      <p class="cp-lead"><b>Example:</b> resistors of 2, 3 and 6 ohm in parallel give one divided by R equal to one half plus one third plus one sixth, which is 1, so the total resistance is 1 ohm. It is smaller than the smallest resistor.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/33.png" alt="ammeter and voltmeter circuit Ohm's law experiment photo" data-caption="A simple circuit with a battery, resistor, ammeter and voltmeter." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">In a parallel combination the total resistance is always smaller than the smallest resistance, never larger.</div>
      <div class="cp-note exam">Series means the same current. Parallel means the same potential difference.</div>
    `
  },
  49: {
    questext: "Consider the following statements about resistors:\n1. In a series combination, the same current flows through every resistor.\n2. In a parallel combination, the same current flows through every resistor.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Only 2", "Only 1", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Only statement 1 is correct. 📌 Series means same current; parallel means same voltage. ❌ In parallel the current divides among the branches."
  },
  50: {
    questext: "Three resistors of 2 ohm, 3 ohm and 6 ohm are connected in parallel. The equivalent resistance is",
    options: ["1 ohm", "11 ohm", "3 ohm", "6 ohm"],
    correct: "1",
    exptext: "✅ One over R equals one half plus one third plus one sixth, which is 1, so R is 1 ohm. 📌 Parallel resistance is always less than the smallest. ❌ 11 ohm is the series sum."
  },
  51: {
    type: "concept", icon: "🔋", accent: "#f43f5e", pauseTimer: true,
    title: "Electric Cell and Electromotive Force",
    html: `
      <p class="cp-lead">An <u>electric cell</u> is a device that changes chemical energy into electrical energy. Its working is based on the chemical effect of electric current.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/34.png" alt="A simple cell: two electrodes in a liquid with a wire, chemical energy to electrical energ" data-caption="A cell changes chemical energy into electrical energy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/35.png" alt="lead acid car battery and dry cell photo" data-caption="A dry cell is a primary cell; a car battery is a secondary cell." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Can it be recharged</th><th>Examples</th></tr></thead><tbody><tr><td>Primary cell</td><td>No, it cannot be charged again</td><td>Voltaic, Daniel and Leclanche cells</td></tr><tr><td>Secondary cell</td><td>Yes, it can be charged again and again</td><td>Acid and alkali accumulators</td></tr></tbody></table>
      <p class="cp-lead">The <b>electromotive force</b> of a cell is the work done by the cell to carry a positive unit charge from one of its terminals to the other. In spite of its name, electromotive force is work per unit charge, so it is measured in volts and it is not a force.</p>
      <div class="cp-note trap">Electromotive force is not a force. It is a measure of energy given to each unit of charge.</div>
      <div class="cp-note exam">Primary cells are Voltaic, Daniel and Leclanche. Secondary cells are accumulators.</div>
    `
  },
  52: {
    questext: "Which of the following is a secondary cell?",
    options: ["Voltaic cell", "Daniel cell", "Leclanche cell", "Lead acid accumulator"],
    correct: "4",
    exptext: "✅ A lead acid accumulator can be charged again and again, so it is a secondary cell. 📌 Accumulator means secondary. ❌ The other three are primary cells."
  },
  53: {
    questext: "The electromotive force of a cell is actually",
    options: ["A force measured in newton", "Work done per unit charge, measured in volt", "A current measured in ampere", "A resistance measured in ohm"],
    correct: "2",
    exptext: "✅ It is energy given to every unit of charge, which is measured in volts. 📌 The name says force but it is volts. ❌ Newton is the unit of force."
  },
  54: {
    type: "concept", icon: "🔥", accent: "#eab308", pauseTimer: true,
    title: "Joule's Law of Heating, Electric Power and Fuse",
    html: `
      <p class="cp-lead">When current flows through a conductor, it produces heat. <u>Joule's law of heating</u> tells us how much.</p>
      <div class="cp-formula" translate="no"><small>Joule's law of heating</small>H = I<sup>2</sup>Rt = (V<sup>2</sup> ÷ R) × t = VIt</div>
      <p class="cp-lead">This heating effect is used in an electric bulb, an electric kettle and a heater.</p>
      <p class="cp-lead"><b>Electric power</b> is the electrical energy produced or consumed per unit time. It is written as P = VI = I<sup>2</sup>R = V<sup>2</sup>÷R. A larger unit of electrical energy is the kilowatt hour, and one kilowatt hour is equal to 3.6 × 10<sup>6</sup> joule.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/36.png" alt="A wire with current flowing and heat waves, formula H = I squared R t, labelled current, r" data-caption="The heat produced depends on current squared, resistance and time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A <b>fuse</b> protects household appliances from a sudden surge of current. It is made of an alloy of tin and lead, with high resistance and a low melting point, and it is always connected in series. If the current becomes too large, the fuse wire melts and breaks the circuit.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/37.png" alt="household fuse wire cartridge photo" data-caption="A fuse wire melts and breaks the circuit when current is too high." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A fuse is connected in series, not in parallel. If it were in parallel it could not stop the current.</div>
      <div class="cp-note exam">Fuse wire has high resistance and a low melting point. One kilowatt hour is 3.6 × 10 to the power 6 joule.</div>
    `
  },
  55: {
    questext: "A fuse wire should have",
    options: ["High resistance and low melting point", "Low resistance and high melting point", "High resistance and high melting point", "Low resistance and low melting point"],
    correct: "1",
    exptext: "✅ It must heat up and melt quickly, which needs high resistance and a low melting point. 📌 A fuse should melt easily. ❌ A high melting point would let dangerous current continue."
  },
  56: {
    questext: "One kilowatt hour is equal to",
    options: ["3.6 × 10 to the power 3 joule", "3.6 × 10 to the power 4 joule", "3.6 × 10 to the power 6 joule", "3.6 × 10 to the power 9 joule"],
    correct: "3",
    exptext: "✅ One kilowatt hour is 1000 watt times 3600 seconds, which is 3.6 million joule. 📌 3.6 million joule. ❌ The other values are too small or too large."
  },
  57: {
    questext: "A fuse is made of an alloy of",
    options: ["Copper and zinc", "Tin and lead", "Iron and carbon", "Copper and tin"],
    correct: "2",
    exptext: "✅ Fuse wire is made of tin and lead, which melts easily. 📌 Fuse means tin and lead. ❌ Copper alloys have a high melting point."
  },
  58: {
    type: "concept", icon: "🧪", accent: "#0ea5a4", pauseTimer: true,
    title: "Chemical Effect of Electric Current and Electroplating",
    html: `
      <p class="cp-lead">When electric current passes through an acidic or basic solution, the solution breaks into positive and negative ions. This is the <u>chemical effect</u> of electric current, and the process is called <b>electrolysis</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/38.png" alt="A beaker of solution with two electrodes connected to a battery; positive ions moving to t" data-caption="Positive ions go to the cathode and negative ions go to the anode." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The positive ions move to the negative electrode, called the <b>cathode</b>, and the negative ions move to the positive electrode, called the <b>anode</b>.</p>
      <p class="cp-lead"><b>Electroplating</b> is the process of coating a base metal with a layer of a more expensive metal using electrolysis. Silver plating on spoons and gold plating on jewellery are examples.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/39.png" alt="silver plated spoons and gold plated jewellery photo" data-caption="Electroplated objects look like the costly metal but cost less." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The positive ions go to the negative electrode. Opposite charges attract.</div>
      <div class="cp-note exam">Electrolysis is the chemical effect of current. Electroplating coats a cheap metal with a costly one.</div>
    `
  },
  59: {
    questext: "The process of coating a base metal with a layer of a more expensive metal using electricity is called",
    options: ["Electrolysis", "Corrosion", "Evaporation", "Electroplating"],
    correct: "4",
    exptext: "✅ This process is electroplating. 📌 Plating means coating. ❌ Electrolysis is the general breaking up of a solution by current, not the coating itself."
  },
  60: {
    questext: "During electrolysis, the positive ions move towards the",
    options: ["Anode", "Neutral wire", "Cathode", "Voltmeter"],
    correct: "3",
    exptext: "✅ Positive ions move to the negative electrode, the cathode. 📌 Cat is for positive ions. ❌ The anode is the positive electrode, which attracts negative ions."
  },
  61: {
    type: "concept", icon: "🏠", accent: "#7c3aed", pauseTimer: true,
    title: "Domestic Electrification and Lightning Conductor",
    html: `
      <p class="cp-lead">Electricity reaches our houses through two wires, the <b>live wire</b> and the <b>neutral wire</b>. The neutral wire is earthed at the local substation.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/40.png" alt="A house wiring diagram: live wire, neutral wire and earth wire going to a socket, with the" data-caption="A household socket has live, neutral and earth connections." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A third wire, called the <b>earth wire</b>, is also used in the building for safety. If a fault happens, the extra current flows safely to the ground and not through a person.</p>
      <p class="cp-lead">A <b>lightning conductor</b> protects buildings. Electric discharge between charged clouds, or between a charged cloud and the earth, can damage houses. A lightning conductor is a metal rod fixed on top of a building and joined to the earth, so the charge flows safely into the ground.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/41.png" alt="lightning conductor rod on top of building photo" data-caption="A lightning rod leads lightning safely into the ground." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The earth wire does not carry current in normal use. It is only for safety.</div>
      <div class="cp-note exam">Three wires in a house are live, neutral and earth. Lightning conductors protect from electric discharge.</div>
    `
  },
  62: {
    questext: "The third terminal, called the earth, in domestic wiring is provided for",
    options: ["Safety of the building and its users", "Carrying the main current", "Reducing the electricity bill", "Increasing the voltage"],
    correct: "1",
    exptext: "✅ The earth wire is a safety path for any leakage current. 📌 Earth means safety. ❌ The live wire carries the main current."
  },
  63: {
    questext: "Lightning conductors are used to protect buildings from",
    options: ["Strong wind", "Earthquakes", "Floods", "Electric discharge between charged clouds and the earth"],
    correct: "4",
    exptext: "✅ The metal rod carries the lightning charge safely into the ground. 📌 Lightning rod means safe earthing. ❌ A lightning conductor cannot stop floods or earthquakes."
  },
  64: {
    type: "concept", icon: "🧲", accent: "#dc2626", pauseTimer: true,
    title: "Magnetism and Types of Magnets",
    html: `
      <p class="cp-lead">A <u>magnet</u> is a material that can attract iron objects. A freely hanging magnet always rests in the north-south direction.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/42.png" alt="natural magnetite lodestone rock attracting iron filings photo" data-caption="Lodestone is a natural magnet made of magnetite." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/43.png" alt="red horseshoe magnet and bar magnet photo" data-caption="Artificial magnets are made in many shapes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A natural magnet is an ore of iron called <b>magnetite</b> (Fe<sub>3</sub>O<sub>4</sub>), also called lodestone. A magnet prepared by people is an <b>artificial magnet</b>. Like poles repel each other and unlike poles attract each other.</p>
      <p class="cp-lead">A current-carrying coil wound over a soft iron core is called an <b>electromagnet</b>. Electromagnets are used in electric bells, telegraph receivers, telephones, transformers and dynamos.</p>
      <table><thead><tr><th>Type</th><th>Made of</th><th>Why</th></tr></thead><tbody><tr><td>Permanent magnet</td><td>Steel</td><td>Steel is hard to magnetise but once magnetised it is hard to demagnetise</td></tr><tr><td>Electromagnet or temporary magnet</td><td>Soft iron</td><td>Soft iron is easily magnetised and demagnetised</td></tr></tbody></table>
      <div class="cp-note trap">Do not swap the materials. Permanent magnets are made of steel and temporary magnets of soft iron.</div>
      <div class="cp-note exam">Natural magnet is magnetite or lodestone. Electromagnet means soft iron core with a current-carrying coil.</div>
    `
  },
  65: {
    questext: "A natural magnet is an ore of iron called",
    options: ["Bauxite", "Magnetite", "Haematite", "Pyrite"],
    correct: "2",
    exptext: "✅ Magnetite, also called lodestone, is a natural magnet. 📌 Magnetite means magnet. ❌ Bauxite is an ore of aluminium."
  },
  66: {
    questext: "Permanent magnets are made of ______ and electromagnets are made of ______.",
    options: ["Steel; soft iron", "Soft iron; steel", "Copper; aluminium", "Aluminium; copper"],
    correct: "1",
    exptext: "✅ Steel keeps its magnetism for a long time, and soft iron is easy to magnetise and demagnetise. 📌 Steel stays; soft iron switches. ❌ Copper and aluminium are not strongly magnetic."
  },
  67: {
    type: "concept", icon: "🧭", accent: "#2563eb", pauseTimer: true,
    title: "Properties of a Magnet",
    html: `
      <p class="cp-lead">A magnet has three important properties. Each one is easy to remember with an example.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/44.png" alt="A bar magnet attracting iron pins strongly at its two ends, with the centre attracting non" data-caption="The attraction of a magnet is strongest at its poles." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Property</th><th>Meaning</th></tr></thead><tbody><tr><td>Attractive property</td><td>A magnet attracts iron, steel, cobalt and nickel; the attraction is greatest at the poles</td></tr><tr><td>Directive property</td><td>A freely hanging magnet rests along the geographic north-south line</td></tr><tr><td>Poles exist in pairs</td><td>If a magnet is cut into two, north and south poles are never separated</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/45.png" alt="A bar magnet cut into two pieces, and each piece again has its own north and south poles." data-caption="Cutting a magnet never gives a single pole; every piece has two poles." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">This is why single magnetic poles, called monopoles, are not found. Each piece of a broken magnet becomes a smaller magnet with both a north and a south pole.</p>
      <div class="cp-note trap">Cutting a magnet does not separate its poles. You never get a piece with only a north pole.</div>
      <div class="cp-note exam">The three properties are attraction, direction and poles in pairs. Attraction is maximum at the poles.</div>
    `
  },
  68: {
    questext: "If a bar magnet is cut into two equal parts across its length, then",
    options: ["One piece has only a north pole", "One piece has only a south pole", "Each piece has both a north and a south pole", "The magnetism disappears"],
    correct: "3",
    exptext: "✅ Magnetic poles always exist in pairs. 📌 You cannot get a single pole. ❌ A single pole piece cannot be made."
  },
  69: {
    questext: "The attraction of a bar magnet is maximum at its",
    options: ["Centre", "Poles", "Middle third", "Surface far from the poles"],
    correct: "2",
    exptext: "✅ The attraction is strongest at the two poles. 📌 Poles pull the most. ❌ At the centre the pull is almost zero."
  },
  70: {
    type: "concept", icon: "🌍", accent: "#059669", pauseTimer: true,
    title: "Magnetic Field and the Earth's Magnetism",
    html: `
      <p class="cp-lead">The space around a magnet or a current-carrying wire, where its magnetic effect can be felt, is called a <u>magnetic field</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/46.png" alt="Magnetic field lines of a bar magnet: closed curves leaving the north pole and entering th" data-caption="Magnetic field lines leave the north pole and enter the south pole." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A <b>magnetic line of force</b> is an imaginary line along which a free north pole would move. A tangent at any point on the line gives the direction of the field there. The <b>magnetic flux</b> through a surface is the total number of lines of force passing normally through it, and its unit is the <b>weber</b>.</p>
      <p class="cp-lead">The earth behaves like a huge magnet and has its own magnetic field. The earth's magnetic field pushes aside the charged particles coming from space towards its poles, and it saves living beings from being harmed. A magnetic compass is a small magnetic needle that always points in the north-south direction.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/47.png" alt="Earth drawn as a bar magnet with field lines, the geographic north pole near the magnetic " data-caption="The earth acts like a giant bar magnet." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The unit of magnetic flux is the weber. The tesla is the unit of the magnetic field strength.</div>
      <div class="cp-note exam">Unit of magnetic flux is the weber. The earth's magnetic field protects living beings from charged particles from space.</div>
    `
  },
  71: {
    questext: "The SI unit of magnetic flux is",
    options: ["Tesla", "Henry", "Ohm", "Weber"],
    correct: "4",
    exptext: "✅ Magnetic flux is measured in weber. 📌 Weber means flux. ❌ Henry is the unit of inductance."
  },
  72: {
    questext: "The earth's magnetic field is important for living beings because it",
    options: ["Produces rain", "Reduces earthquakes", "Diverts harmful charged particles coming from space", "Increases the length of the day"],
    correct: "3",
    exptext: "✅ The magnetic field deflects charged particles from space towards the poles. 📌 The earth's magnetic field is a shield. ❌ It has nothing to do with rain or earthquakes."
  },
  73: {
    type: "concept", icon: "🌌", accent: "#0284c7", pauseTimer: true,
    title: "Magnetic Storm and Auroras",
    html: `
      <p class="cp-lead">A <u>magnetic storm</u> is a local disturbance in the earth's magnetic field, probably caused by lumps of charged particles coming from the Sun. It can damage telecommunication.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/48.png" alt="aurora borealis northern lights over snowy landscape photo" data-caption="The northern lights glow in the sky near the Arctic." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Near the Arctic Circle, the glowing lights in the sky are called <b>Aurora Borealis</b> or the northern lights. Near the Antarctic Circle, they are called <b>Aurora Australis</b> or the southern lights.</p>
      <table><thead><tr><th>Light</th><th>Region</th></tr></thead><tbody><tr><td>Aurora Borealis</td><td>Arctic Circle, in the north</td></tr><tr><td>Aurora Australis</td><td>Antarctic Circle, in the south</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/49.png" alt="aurora australis southern lights photo" data-caption="Aurora Australis is seen near Antarctica." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Borealis is for the north and Australis is for the south. Do not swap them.</div>
      <div class="cp-note exam">Magnetic storms come from charged particles from the Sun. Aurora Borealis is in the Arctic.</div>
    `
  },
  74: {
    questext: "Aurora Borealis is seen in the",
    options: ["Arctic region", "Antarctic region", "Equatorial region", "Tropical desert region"],
    correct: "1",
    exptext: "✅ Aurora Borealis is the northern lights seen in the Arctic region. 📌 Borealis means north. ❌ Aurora Australis is seen in the Antarctic region."
  },
  75: {
    questext: "Magnetic storms are probably caused by",
    options: ["Volcanic eruptions", "Lightning", "Ocean waves", "Lumps of charged particles coming from the Sun"],
    correct: "4",
    exptext: "✅ Charged particles from the Sun disturb the earth's magnetic field. 📌 Magnetic storm means the Sun. ❌ Volcanoes and lightning do not cause magnetic storms."
  },
  76: {
    type: "concept", icon: "📏", accent: "#ea580c", pauseTimer: true,
    title: "Galvanometer, Ammeter and Voltmeter",
    html: `
      <p class="cp-lead">A <u>moving coil galvanometer</u> is used to detect the presence and the direction of an electric current in a circuit.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/50.png" alt="analog ammeter and voltmeter dial meters photo" data-caption="An ammeter measures current and a voltmeter measures potential difference." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Instrument</th><th>Measures</th><th>Connected</th><th>Ideal resistance</th></tr></thead><tbody><tr><td>Ammeter</td><td>Electric current</td><td>In series</td><td>Zero</td></tr><tr><td>Voltmeter</td><td>Potential difference</td><td>In parallel</td><td>Infinite</td></tr></tbody></table>
      <p class="cp-lead">A galvanometer is changed into an ammeter by connecting a low resistance in parallel with it, and into a voltmeter by connecting a high resistance in series with it. The small parallel resistance that takes extra current is called a <b>shunt</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/51.png" alt="Two circuit diagrams: galvanometer with a small shunt resistor in parallel making an ammet" data-caption="Shunt in parallel makes an ammeter; a large series resistor makes a voltmeter." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The ammeter goes in series and the voltmeter goes in parallel. Swapping them can damage the instruments.</div>
      <div class="cp-note exam">Ammeter: low resistance shunt in parallel. Voltmeter: high resistance in series.</div>
    `
  },
  77: {
    questext: "An ammeter is always connected in",
    options: ["Parallel", "Series", "Either series or parallel", "A closed loop with the voltmeter"],
    correct: "2",
    exptext: "✅ An ammeter measures the full current, so it is connected in series. 📌 Ammeter, series. ❌ A voltmeter is connected in parallel."
  },
  78: {
    questext: "A galvanometer can be converted into a voltmeter by connecting",
    options: ["A high resistance in series", "A low resistance in parallel", "A capacitor in series", "A coil in parallel"],
    correct: "1",
    exptext: "✅ A high resistance in series makes it measure potential difference without drawing much current. 📌 Voltmeter means high resistance in series. ❌ A low resistance in parallel makes an ammeter."
  },
  79: {
    questext: "Consider the following statements about ideal instruments:\n1. The resistance of an ideal ammeter is zero.\n2. The resistance of an ideal voltmeter is zero.\nWhich of the statements given above is correct?",
    options: ["Both 1 and 2", "Only 2", "Only 1", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Only statement 1 is correct. 📌 Ammeter zero, voltmeter infinite. ❌ An ideal voltmeter has infinite resistance."
  },
  80: {
    type: "concept", icon: "🔬", accent: "#9333ea", pauseTimer: true,
    title: "Paramagnetic, Diamagnetic and Ferromagnetic Substances",
    html: `
      <p class="cp-lead">According to how they behave in a magnetic field, substances are of three kinds: paramagnetic, diamagnetic and ferromagnetic.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/52.png" alt="Three panels: paramagnetic atoms weakly lined up with the field, diamagnetic atoms weakly " data-caption="Three kinds of magnetic behaviour in a magnetic field." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Type</th><th>Behaviour</th><th>Examples</th></tr></thead><tbody><tr><td>Paramagnetic</td><td>Weakly magnetised in the direction of the field; drawn towards a strong field; magnetism decreases when temperature rises</td><td>Aluminium, platinum, chromium, manganese, oxygen</td></tr><tr><td>Diamagnetic</td><td>Weakly magnetised opposite to the field; pushed towards a weaker field; magnetism does not change with temperature</td><td>Gold, silver, zinc, copper, mercury, water</td></tr><tr><td>Ferromagnetic</td><td>Strongly magnetised in the direction of the field; magnetism decreases when temperature rises</td><td>Iron, nickel, cobalt</td></tr></tbody></table>
      <p class="cp-lead">At a particular temperature called the <b>Curie temperature</b>, a ferromagnetic substance loses its strong magnetism and becomes paramagnetic. The Curie temperature of iron is 770 degrees Celsius and of nickel is 358 degrees Celsius.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/53.png" alt="iron nickel cobalt metal samples photo" data-caption="Iron, nickel and cobalt are the common ferromagnetic metals." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">At the Curie temperature a ferromagnetic substance becomes paramagnetic, not diamagnetic.</div>
      <div class="cp-note exam">Ferromagnetic: iron, nickel and cobalt. Curie temperature of iron is 770 degrees Celsius.</div>
    `
  },
  81: {
    questext: "Which of the following is a diamagnetic substance?",
    options: ["Iron", "Copper", "Aluminium", "Cobalt"],
    correct: "2",
    exptext: "✅ Copper is weakly magnetised opposite to the field, so it is diamagnetic. 📌 Copper, gold, silver and water are diamagnetic. ❌ Aluminium is paramagnetic; iron and cobalt are ferromagnetic."
  },
  82: {
    questext: "At the Curie temperature, a ferromagnetic substance becomes",
    options: ["Diamagnetic", "A permanent magnet", "An insulator", "Paramagnetic"],
    correct: "4",
    exptext: "✅ Above the Curie temperature a ferromagnetic substance behaves as a paramagnetic substance. 📌 Ferro becomes para. ❌ Diamagnetic is wrong because heating does not reverse the nature."
  },
  83: {
    questext: "The Curie temperature of iron is",
    options: ["358 degrees Celsius", "100 degrees Celsius", "770 degrees Celsius", "1100 degrees Celsius"],
    correct: "3",
    exptext: "✅ Iron loses its ferromagnetism at 770 degrees Celsius. 📌 Iron 770, nickel 358. ❌ 358 degrees Celsius is the Curie temperature of nickel."
  },
  84: {
    type: "concept", icon: "🌀", accent: "#16a34a", pauseTimer: true,
    title: "Electromagnetic Induction, Faraday's Laws and Lenz's Law",
    html: `
      <p class="cp-lead">Whenever the magnetic flux linked with a circuit changes, an electromotive force is produced in it. This is called <u>electromagnetic induction</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/54.png" alt="A coil connected to a galvanometer with a bar magnet moving in and out; the needle deflect" data-caption="A moving magnet near a coil produces a current only while it moves." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Faraday's law</b> says that an induced electromotive force is produced whenever the magnetic flux linked with a circuit changes, and it lasts as long as the change in flux continues. If the magnet stops moving, the current stops.</p>
      <p class="cp-lead"><b>Lenz's law</b> says that the direction of the induced electromotive force or current is always such that it opposes the cause that produces it.</p>
      <table><thead><tr><th>Law</th><th>Statement in short</th></tr></thead><tbody><tr><td>Faraday's law</td><td>A changing magnetic flux induces an electromotive force, which lasts while the flux changes</td></tr><tr><td>Lenz's law</td><td>The induced current opposes the change that causes it</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/55.png" alt="Michael Faraday portrait photo" data-caption="Michael Faraday discovered electromagnetic induction." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A steady magnet at rest near a coil induces nothing. The flux must change.</div>
      <div class="cp-note exam">Direction of induced current: Lenz's law. Size of induced electromotive force: Faraday's law.</div>
    `
  },
  85: {
    questext: "The law stating that the direction of an induced current always opposes the cause producing it is",
    options: ["Lenz's law", "Ohm's law", "Coulomb's law", "Snell's law"],
    correct: "1",
    exptext: "✅ This is Lenz's law. 📌 Lenz means it opposes. ❌ Ohm's law connects voltage, current and resistance."
  },
  86: {
    questext: "An electromotive force is induced in a circuit whenever",
    options: ["The resistance of the circuit is high", "The circuit is kept at rest near a magnet", "The wire is made of copper", "The magnetic flux linked with the circuit changes"],
    correct: "4",
    exptext: "✅ A change in magnetic flux induces electromotive force. 📌 No change in flux, no induction. ❌ A magnet at rest gives no change in flux."
  },
  87: {
    type: "concept", icon: "🔄", accent: "#ca8a04", pauseTimer: true,
    title: "Eddy Currents, Self Induction and Mutual Induction",
    html: `
      <p class="cp-lead">When a piece of metal is placed in a changing magnetic field, currents are induced in it that swirl like whirlpools. These are called <u>eddy currents</u> or <b>Foucault currents</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/56.png" alt="induction cooktop heating pan photo" data-caption="Induction furnaces and cooktops heat metal using eddy currents." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Eddy currents are used in induction furnaces, induction motors, electric speedometers of vehicles and dead beat galvanometers. They are also used in diathermy for deep heat treatment of the human body.</p>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Unit</th></tr></thead><tbody><tr><td>Self induction</td><td>An electromotive force is induced in a circuit when the current in the same circuit changes</td><td>Henry</td></tr><tr><td>Mutual induction</td><td>An electromotive force is induced in one circuit when the current changes in a neighbouring circuit</td><td>Henry</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/57.png" alt="Two coils side by side; changing current in the first coil induces a current in the second" data-caption="A changing current in one coil induces a current in a neighbouring coil." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The unit of both self induction and mutual induction is the henry, not the weber.</div>
      <div class="cp-note exam">Eddy currents are also called Foucault currents. Unit of induction is the henry.</div>
    `
  },
  88: {
    questext: "The unit of self induction is",
    options: ["Weber", "Henry", "Tesla", "Farad"],
    correct: "2",
    exptext: "✅ Self induction is measured in henry. 📌 Henry means induction. ❌ Weber is for magnetic flux."
  },
  89: {
    questext: "Eddy currents are also known as",
    options: ["Foucault currents", "Faraday currents", "Ampere currents", "Lenz currents"],
    correct: "1",
    exptext: "✅ Eddy currents are also known as Foucault currents. 📌 Foucault means eddy. ❌ The other names are not used."
  },
  90: {
    type: "concept", icon: "📈", accent: "#db2777", pauseTimer: true,
    title: "Alternating Current",
    html: `
      <p class="cp-lead">An electric current whose magnitude and direction change continuously is called <u>alternating current</u>. The frequency of alternating current in India is 50 hertz, which means it changes direction 100 times in each second.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/58.png" alt="A sine wave graph of alternating current for one complete cycle with the peak value I0 and" data-caption="The wave of alternating current with peak and root mean square values." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The mean or average value of alternating current for one complete cycle is zero, because the positive half cancels the negative half.</p>
      <div class="cp-formula" translate="no"><small>Root mean square value</small>I<sub>rms</sub> = I<sub>0</sub> ÷ √2</div>
      <p class="cp-lead">Alternating current ammeters and voltmeters read the root mean square value, which is about 0.707 times the peak value.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/59.png" alt="power transmission pylons and mains electricity sockets photo" data-caption="Mains electricity is supplied as alternating current." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The average value of alternating current is zero over a full cycle, but its root mean square value is not zero.</div>
      <div class="cp-note exam">Frequency in India is 50 hertz. Root mean square value is peak value divided by root two.</div>
    `
  },
  91: {
    questext: "The frequency of alternating current supplied in India is",
    options: ["25 hertz", "60 hertz", "50 hertz", "100 hertz"],
    correct: "3",
    exptext: "✅ Alternating current in India has a frequency of 50 hertz. 📌 India means fifty. ❌ 60 hertz is used in the United States."
  },
  92: {
    questext: "The average value of alternating current over one complete cycle is",
    options: ["Equal to the peak value", "Zero", "Half of the peak value", "Equal to the root mean square value"],
    correct: "2",
    exptext: "✅ The positive and negative halves cancel, so the average is zero. 📌 Average zero, root mean square not zero. ❌ Root mean square value is peak divided by root two."
  },
  93: {
    questext: "The root mean square value of an alternating current with a peak value I0 is",
    options: ["I0 multiplied by root 2", "I0 divided by 2", "Twice I0", "I0 divided by root 2"],
    correct: "4",
    exptext: "✅ The root mean square value is the peak value divided by root two. 📌 Divide by root two. ❌ Multiplying by root two would make it larger than the peak."
  },
  94: {
    type: "concept", icon: "⚙️", accent: "#0d9488", pauseTimer: true,
    title: "Dynamo, Motor and Transformer",
    html: `
      <p class="cp-lead">These three machines work because of electromagnetism. Each one changes energy or voltage in a different way.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/60.png" alt="hand crank dynamo generator coil magnet photo" data-caption="A dynamo turns mechanical motion into electricity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Machine</th><th>What it does</th><th>Working principle</th></tr></thead><tbody><tr><td>Alternating current generator or dynamo</td><td>Changes mechanical energy into alternating current</td><td>Electromagnetic induction</td></tr><tr><td>DC motor</td><td>Changes electrical energy into mechanical energy</td><td>A current-carrying coil in a magnetic field feels a turning force</td></tr><tr><td>Transformer</td><td>Changes a low voltage to a high voltage and the reverse</td><td>Mutual induction</td></tr></tbody></table>
      <p class="cp-lead">A <b>step-up transformer</b> changes a low voltage into a high voltage. A <b>step-down transformer</b> changes a high voltage into a low voltage. A transformer works only on alternating current.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/61.png" alt="electric power transformer substation photo" data-caption="Transformers raise or lower voltage in power stations and substations." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A dynamo is not a motor. A dynamo makes electricity and a motor uses electricity.</div>
      <div class="cp-note exam">Dynamo: mechanical to electrical. Motor: electrical to mechanical. Transformer: mutual induction.</div>
    `
  },
  95: {
    questext: "A dynamo converts",
    options: ["Electrical energy into mechanical energy", "Chemical energy into electrical energy", "Mechanical energy into electrical energy", "Light energy into electrical energy"],
    correct: "3",
    exptext: "✅ A dynamo turns mechanical energy into electrical energy. 📌 Dynamo makes electricity. ❌ A motor changes electrical energy into mechanical energy."
  },
  96: {
    questext: "A transformer works on the principle of",
    options: ["Mutual induction", "Self induction", "Chemical effect of current", "Heating effect of current"],
    correct: "1",
    exptext: "✅ The changing current in the primary coil induces a voltage in the secondary coil. 📌 Transformer means mutual induction. ❌ Self induction is the effect on the same coil."
  },
  97: {
    questext: "An electric motor converts",
    options: ["Mechanical energy into electrical energy", "Chemical energy into heat", "Sound energy into electrical energy", "Electrical energy into mechanical energy"],
    correct: "4",
    exptext: "✅ A motor changes electrical energy into mechanical energy. 📌 Motor means motion. ❌ Changing mechanical energy into electrical energy is done by a dynamo."
  },
  98: {
    type: "concept", icon: "☢️", accent: "#b91c1c", pauseTimer: true,
    title: "Nuclear Reactor: Fission, Fuel and Chain Reaction",
    html: `
      <p class="cp-lead">A <u>nuclear reactor</u> is a device that contains and controls a steady nuclear chain reaction. The energy released is used to make steam, which runs turbines and produces electricity.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/62.png" alt="A uranium-235 nucleus hit by a slow neutron, splitting into two smaller nuclei with three " data-caption="A neutron splits a uranium nucleus and frees more neutrons." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The fuel is uranium-235 or plutonium-239. The fuel is made into solid rods called <b>fuel rods</b>. In fission, an atom splits and releases a large amount of energy as heat, along with extra neutrons. These extra neutrons can split more atoms, and this starts a <b>chain reaction</b>.</p>
      <p class="cp-lead">Slow neutrons, also called thermal neutrons, are much more likely to cause fission in uranium-235 than fast neutrons. In a reactor the number of neutrons is controlled, so the reaction is steady and safe.</p>
      <table><thead><tr><th>Reaction</th><th>Control</th><th>Result</th></tr></thead><tbody><tr><td>Controlled chain reaction</td><td>The number of neutrons is controlled</td><td>Steady energy for electricity in a reactor</td></tr><tr><td>Uncontrolled chain reaction</td><td>No control over the neutrons</td><td>Explosion of a nuclear bomb or atom bomb</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/63.png" alt="nuclear power plant cooling towers photo" data-caption="A nuclear power plant turns fission heat into electricity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A reactor does not explode like a bomb because its chain reaction is controlled.</div>
      <div class="cp-note exam">Fuel is uranium-235 or plutonium-239. Slow neutrons cause fission in uranium-235.</div>
    `
  },
  99: {
    questext: "The fuels used in a nuclear reactor are",
    options: ["Thorium-232 and radium", "Uranium-235 and plutonium-239", "Carbon-14 and sodium", "Cobalt-60 and hydrogen"],
    correct: "2",
    exptext: "✅ Uranium-235 and plutonium-239 are the fissionable fuels. 📌 Fuel means uranium and plutonium. ❌ Carbon-14 and cobalt-60 are not reactor fuels."
  },
  100: {
    questext: "An uncontrolled nuclear chain reaction leads to",
    options: ["An atom bomb explosion", "A steady supply of electricity", "A fall in temperature", "No energy at all"],
    correct: "1",
    exptext: "✅ Without control a chain reaction gives a huge sudden release of energy, as in an atom bomb. 📌 Uncontrolled means bomb. ❌ A steady supply needs control."
  },
  101: {
    questext: "Which neutrons are more likely to cause fission in uranium-235?",
    options: ["Fast neutrons", "Protons", "Alpha particles", "Slow neutrons"],
    correct: "4",
    exptext: "✅ Slow or thermal neutrons are more likely to cause fission. 📌 Slow neutrons are better. ❌ Fast neutrons tend to escape without causing fission."
  },
  102: {
    type: "concept", icon: "🏭", accent: "#4f46e5", pauseTimer: true,
    title: "Parts of a Nuclear Reactor",
    html: `
      <p class="cp-lead">A reactor is built from several parts, and each part has one clear job. <u>The core is the heart of the reactor.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/64.png" alt="Cutaway of a reactor: fuel rods in the core with moderator around them, control rods going" data-caption="The main parts of a nuclear reactor, from the core to the shield." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Part</th><th>Job</th><th>Material</th></tr></thead><tbody><tr><td>Fuel</td><td>Gives the fission energy</td><td>Uranium-235, plutonium-239</td></tr><tr><td>Moderator</td><td>Slows down fast neutrons</td><td>Water, heavy water, graphite</td></tr><tr><td>Control rods</td><td>Absorb neutrons and shut down or control the reaction</td><td>Cadmium, boron</td></tr><tr><td>Coolant</td><td>Carries heat away to make steam</td><td>Water, heavy water, liquid sodium, helium</td></tr><tr><td>Reflector</td><td>Surrounds the core and reduces the leakage of neutrons</td><td>Material around the core</td></tr><tr><td>Shield</td><td>Stops harmful radiation from coming out</td><td>Heavy steel or concrete</td></tr></tbody></table>
      <p class="cp-lead">The <b>core</b> is where fission takes place and it holds the fuel elements. The coolant moves the heat to a working fluid, which makes steam, and the steam drives the turbines that produce electricity.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/65.png" alt="nuclear reactor control rods and reactor core pool photo" data-caption="The core of a reactor is kept under water or coolant." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Control rods absorb neutrons, while moderators only slow them down. Do not mix them.</div>
      <div class="cp-note exam">Moderators: water, heavy water, graphite. Control rods: cadmium and boron. Shield: heavy steel or concrete.</div>
    `
  },
  103: {
    questext: "Which of the following is used as a moderator in a nuclear reactor?",
    options: ["Cadmium", "Boron", "Heavy water", "Uranium"],
    correct: "3",
    exptext: "✅ Heavy water slows down fast neutrons, so it is a moderator. 📌 Moderator means slow down. ❌ Cadmium and boron are control rods."
  },
  104: {
    questext: "The control rods of a nuclear reactor are made of",
    options: ["Steel", "Cadmium and boron", "Graphite", "Uranium"],
    correct: "2",
    exptext: "✅ Cadmium and boron absorb neutrons strongly. 📌 Control rods absorb neutrons. ❌ Graphite is a moderator and uranium is the fuel."
  },
  105: {
    questext: "In a nuclear reactor, the heat produced in the core is carried away by the",
    options: ["Moderator", "Control rods", "Shield", "Coolant"],
    correct: "4",
    exptext: "✅ The coolant carries the heat from the core to make steam. 📌 Coolant means carries heat. ❌ The shield only stops radiation."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a glowing glass prism splitting light into a rainbow, a small horseshoe magnet and a thin copper coil" },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/1.png": { t: "fig", about: "Ray diagram of a plane mirror: incident ray, dotted normal line, reflected ray, angle i and angle r marked equal." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"concave mirror and convex mirror side by side photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/2.png. A concave mirror curved inward next to a convex mirror curved outward.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/3.png": { t: "fig", about: "Two small diagrams: a concave mirror sending parallel light rays to one focus point, and a convex mirror spreading rays outward." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/4.png": { t: "fig", about: "A light ray going from air into glass, bending towards the normal; angle i in air and smaller angle r in glass labelled." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"pencil partly immersed in water glass looks bent photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/5.png. A pencil standing in a glass of water looks bent at the water surface.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/6.png": { t: "fig", about: "A white light ray entering a triangular glass prism and spreading into seven colours, violet at the bottom and red at the top, labelled." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rainbow over green hills photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/7.png. A full rainbow in the sky after a rain shower.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/8.png": { t: "fig", about: "Cross-section of one raindrop: sunlight enters, splits into colours, reflects at the back, and leaves toward the observer; the Sun is behind the observer." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/9.png": { t: "fig", about: "Starlight entering the atmosphere through layers of different density, bending slightly, with the star's apparent position shown above its real position." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"star trails or twinkling stars night sky photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/10.png. A night sky full of twinkling stars.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/11.png": { t: "fig", about: "Sunlight entering the atmosphere; blue light scattered strongly in all directions, red light passing straight; an observer looks up at a blue sky." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sunbeams through forest trees mist photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/12.png. Beams of sunlight made visible by dust and mist in the air.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/13.png": { t: "fig", about: "A ray inside glass hitting the glass-air boundary at a large angle and reflecting fully back into the glass, with the rarer air labelled above." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"cut diamond sparkling brilliance photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/14.png. A cut diamond sparkling brightly.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"optical fibre cable glowing ends close-up photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/15.png. The glowing ends of an optical fibre cable.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/16.png": { t: "fig", about: "Side view of a human eye with a labelled cornea, lens, retina, and a clear image focused exactly on the retina." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/17.png": { t: "fig", about: "Two eye diagrams: myopia with the image formed in front of the retina and a concave lens correcting it; hypermetropia with the image formed behind the retina and a convex lens correcting it." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"balloon rubbed on hair sticking to wall photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/18.png. A rubbed balloon sticking to a wall.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/19.png": { t: "fig", about: "Two point charges q1 and q2 at a distance r, with arrows for the force between them; labels: force is proportional to q1 times q2 and to one over r squared." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/20.png": { t: "fig", about: "Electric field lines: from a positive charge radiating outward, into a negative charge from all sides, and between a positive and a negative charge curving from plus to minus." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"iron filings pattern around bar magnet photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/21.png. Iron filings arranged along the lines around a bar magnet.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/22.png": { t: "fig", about: "Water-tank analogy: a high tank connected by a pipe to a low tank, water arrow flowing downhill, labelled high potential, low potential, charge flow." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"digital voltmeter measuring battery voltage photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/23.png. A voltmeter connected across a battery.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/24.png": { t: "fig", about: "An electric dipole: a positive charge plus and a negative charge minus joined by a short arrow with the distance labelled d." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"electronic capacitors on a circuit board photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/25.png. Different capacitors used in electronic circuits.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/26.png": { t: "fig", about: "Three boxes showing a metal with many free electrons, an insulator with no free electrons and a semiconductor with few free electrons that increase on heating." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"silicon wafer semiconductor chip photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/27.png. A polished silicon wafer used to make electronic chips.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/28.png": { t: "fig", about: "Two graphs: a flat horizontal line for direct current and a smooth wave above and below zero for alternating current." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"home inverter and battery photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/29.png. A home inverter with its battery.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/30.png": { t: "fig", about: "A water pipe analogy: a narrow rough pipe resisting water flow and a wide smooth pipe letting it flow easily, labelled high resistance, low resistance." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"coiled nichrome heating wire photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/31.png. A coil of resistance wire used in heaters.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/32.png": { t: "fig", about: "Series circuit with three resistors in one loop, same current arrow, and a parallel circuit with three branches, same voltage across each." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ammeter and voltmeter circuit Ohm's law experiment photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/33.png. A simple circuit used to test Ohm's law.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/34.png": { t: "fig", about: "A simple cell: two electrodes in a liquid with a wire, chemical energy to electrical energy arrow." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"lead acid car battery and dry cell photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/35.png. A dry cell next to a car battery.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/36.png": { t: "fig", about: "A wire with current flowing and heat waves, formula H = I squared R t, labelled current, resistance, time, heat produced." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"household fuse wire cartridge photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/37.png. A fuse that melts when the current is too large.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/38.png": { t: "fig", about: "A beaker of solution with two electrodes connected to a battery; positive ions moving to the negative electrode cathode, negative ions to the positive electrode anode." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"silver plated spoons and gold plated jewellery photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/39.png. Silver-plated spoons and gold-plated jewellery.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/40.png": { t: "fig", about: "A house wiring diagram: live wire, neutral wire and earth wire going to a socket, with the earth wire connected to the metal body of an appliance." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"lightning conductor rod on top of building photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/41.png. A lightning rod fixed on the top of a tall building.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"natural magnetite lodestone rock attracting iron filings photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/42.png. A piece of natural lodestone with iron filings stuck to it.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"red horseshoe magnet and bar magnet photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/43.png. A horseshoe magnet and a bar magnet.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/44.png": { t: "fig", about: "A bar magnet attracting iron pins strongly at its two ends, with the centre attracting none; poles labelled N and S." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/45.png": { t: "fig", about: "A bar magnet cut into two pieces, and each piece again has its own north and south poles." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/46.png": { t: "fig", about: "Magnetic field lines of a bar magnet: closed curves leaving the north pole and entering the south pole, with an arrow on each line." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/47.png": { t: "fig", about: "Earth drawn as a bar magnet with field lines, the geographic north pole near the magnetic south pole of the earth, and a compass needle." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/48.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"aurora borealis northern lights over snowy landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/48.png. Green northern lights glowing over a snowy landscape.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/49.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"aurora australis southern lights photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/49.png. Southern lights seen over the southern sky.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/50.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"analog ammeter and voltmeter dial meters photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/50.png. An analog ammeter next to a voltmeter.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/51.png": { t: "fig", about: "Two circuit diagrams: galvanometer with a small shunt resistor in parallel making an ammeter, and with a large resistor in series making a voltmeter." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/52.png": { t: "fig", about: "Three panels: paramagnetic atoms weakly lined up with the field, diamagnetic atoms weakly opposing the field, ferromagnetic atoms strongly lined up with the field." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/53.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"iron nickel cobalt metal samples photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/53.png. Samples of iron, nickel and cobalt metals.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/54.png": { t: "fig", about: "A coil connected to a galvanometer with a bar magnet moving in and out; the needle deflects only while the magnet moves." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/55.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Michael Faraday portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/55.png. Michael Faraday, the scientist who discovered electromagnetic induction.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/56.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"induction cooktop heating pan photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/56.png. A pan heated on an induction cooktop.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/57.png": { t: "fig", about: "Two coils side by side; changing current in the first coil induces a current in the second coil, labelled primary and secondary." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/58.png": { t: "fig", about: "A sine wave graph of alternating current for one complete cycle with the peak value I0 and the root mean square value marked, and the average value zero." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/59.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"power transmission pylons and mains electricity sockets photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/59.png. Power lines carrying alternating current to homes.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/60.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hand crank dynamo generator coil magnet photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/60.png. A small generator with a coil and a magnet.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/61.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"electric power transformer substation photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/61.png. A large transformer in an electric substation.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/62.png": { t: "fig", about: "A uranium-235 nucleus hit by a slow neutron, splitting into two smaller nuclei with three more neutrons and heat released; the neutrons go on to hit other nuclei." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/63.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"nuclear power plant cooling towers photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/63.png. A nuclear power plant with cooling towers.",
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/64.png": { t: "fig", about: "Cutaway of a reactor: fuel rods in the core with moderator around them, control rods going in from the top, coolant pipes leading to a steam generator, reflector around the core, thick concrete shield outside." },
  "images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/65.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"nuclear reactor control rods and reactor core pool photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Light_Electricity_Magnetism_and_Nuclear_Reactor/65.png. The glowing core of a research reactor under water."
});

/* CHANGE LOG
   - Curie temperature: the source says a paramagnetic substance becomes diamagnetic. It is a ferromagnetic substance that becomes paramagnetic, and the file now says this.
   - Coolant list: liquid oxygen was removed because it is not used as a coolant. Water, heavy water, liquid sodium and helium remain.
   - Faraday's law: the word loses was corrected to lasts (the induced electromotive force lasts as long as the flux changes).
   - Diamagnetic substances: they are weakly repelled by a strong field and move towards the weaker field region (the source says attracted towards a weak field). Paramagnetic substances move towards the stronger field.
   - Electricity is described as the flow of electric charge (carried by electrons in metals), not only the flow of electrons.
   - Conductance unit: mho is also written as siemens. Resistivity unit ohm metre was added.
   - Dynamo: the word Inverts was corrected to converts.
   - Electric potential: the unit joule per coulomb was named as volt.
   - Earth's magnetism: the pole of the earth near geographic north actually behaves as the south pole of the earth's magnet, so the text avoids calling it the magnetic North pole.
*/