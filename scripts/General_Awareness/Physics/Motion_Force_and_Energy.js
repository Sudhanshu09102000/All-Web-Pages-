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

/* Field: General_Awareness · Subject: Physics · Chapter: Motion_Force_and_Energy · 30 concept pages (+ overview) · 59 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🚀", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Motion, Force and Energy",
    thumb: {
      image: "images/General_Awareness/Physics/Motion_Force_and_Energy/thumbnail.png",
      banner: "SSC CGL 2026",
      line1: "PHYSICS BASICS",
      line2: "MOTION & FORCE",
      line3: "WORK & ENERGY",
      badge: "FULL CLASS",
      ribbon: "NEWTON • FRICTION • ENERGY",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Motion, Force, Friction and Energy | Physics for SSC CGL General Science",
      altTitles: ["Newton's Laws of Motion with Examples for SSC CGL", "Units, Speed, Velocity and Acceleration in One Class"],
      description: "Physics decides many easy marks in General Science. In this class we learn motion, force and energy step by step, in simple words, with the examples that come again and again in exams.\n\n📌 IN THIS CLASS\n✅ Units, speed, velocity and acceleration\n✅ Equations of motion and projectile motion\n✅ Circular motion and Newton's laws\n✅ Friction, work and energy\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Physics #GeneralScience",
      tags: ["ssc cgl physics", "newton laws of motion", "motion and force", "friction", "work and energy", "speed velocity acceleration", "units and measurement", "inertia examples", "general science physics", "physics for competitive exams", "projectile motion", "centripetal force", "momentum and impulse", "ssc cgl general science", "physics mcq", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "important questions", "Motion Force and Energy class"],
      hashtags: ["SSCCGL", "Physics", "GeneralScience"],
      thumbText: "MOTION FORCE ENERGY",
      pinnedComment: "📌 Try the questions and write your score in the comments 👇",
      communityPost: "⚡ New Physics class is live: Motion, Force, Friction and Energy. Solve the questions and share your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "SSC CGL General Science — Physics Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how things move, why they move, and how energy is stored and changed</u>. This is the foundation of Physics for the General Science section of the Staff Selection Commission exams.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>30</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>59</b><span>Questions</span></div>
        <div class="cp-stat"><b>~119 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Physical Quantities and Units</b><br>The difference between fundamental and derived quantities, and the seven base units you must remember.</li>
        <li><b>Rest, Motion, Speed, Velocity and Acceleration</b><br>How motion is described, why velocity differs from speed, and how acceleration measures a change in velocity.</li>
        <li><b>Equations of Motion and Projectile Motion</b><br>The three equations for steady acceleration, their graphs, and how a thrown body travels in a curve.</li>
        <li><b>Circular Motion and Circular Forces</b><br>Why a body moving in a circle needs a force towards the centre, and why the outward push is only apparent.</li>
        <li><b>Force and Newton's Laws</b><br>Force, inertia, momentum, impulse and the three laws of motion, with the everyday examples exams love.</li>
        <li><b>Friction</b><br>What causes friction, where it helps, how it is reduced, and the laws of limiting friction.</li>
        <li><b>Work and Energy</b><br>Work, kinetic and potential energy, the mass-energy relation, and how energy changes form.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> this chapter gives easy, direct questions every year, such as units, Newton's laws, inertia examples and energy changes. Learn the examples, and you can answer in seconds.</div>
    `
  },
  2: {
    type: "concept", icon: "⚖️", accent: "#22c55e", pauseTimer: true,
    title: "Physical Quantities",
    html: `
      <p class="cp-lead">A physical quantity is anything we can measure and use to describe the laws of physics, such as length, mass, time or force. <u>Some quantities stand alone, and some are built from others.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/1.png" alt="Two boxes side by side. Left box titled Fundamental quantities with Mass, Length, Time. Ri" data-caption="Fundamental quantities stand alone, while derived quantities are built from them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A <b>fundamental quantity</b> does not depend on any other physical quantity. A <b>derived quantity</b> depends on the fundamental ones. For example, speed is length divided by time, so speed is a derived quantity.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/2.png" alt="vernier caliper stopwatch weighing scale physics lab photo" data-caption="Common laboratory tools that measure the fundamental quantities of length, time and mass." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Speed, acceleration and force look basic, but they are derived quantities because each one is made from length, mass and time.</div>
      <div class="cp-note exam">Exam questions often give four quantities and ask you to pick the derived one.</div>
    `
  },
  3: {
    questext: "Which one of the following is a derived physical quantity?",
    options: ["Mass", "Length", "Acceleration", "Time"],
    correct: "3",
    exptext: "✅ Acceleration is derived because it is the change in velocity divided by time. 📌 A quantity made from two or more basic quantities is derived. ❌ Mass, length and time are tempting but they are fundamental."
  },
  4: {
    type: "concept", icon: "📏", accent: "#f59e0b", pauseTimer: true,
    title: "Units",
    html: `
      <p class="cp-lead">The unit of a physical quantity is the standard we use to measure it. Without a unit, a number such as 5 means nothing. <u>Units are of two kinds: fundamental units and derived units.</u></p>
      <table><thead><tr><th>Fundamental quantity</th><th>Fundamental unit</th><th>Symbol</th></tr></thead><tbody><tr><td>Mass</td><td>Kilogram</td><td>kg</td></tr><tr><td>Length</td><td>Metre</td><td>m</td></tr><tr><td>Time</td><td>Second</td><td>s</td></tr><tr><td>Temperature</td><td>Kelvin</td><td>K</td></tr><tr><td>Electric current</td><td>Ampere</td><td>A</td></tr><tr><td>Luminous intensity</td><td>Candela</td><td>cd</td></tr><tr><td>Amount of substance</td><td>Mole</td><td>mol</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/3.png" alt="Seven round badges in a row, each with a quantity and its unit: Mass kg, Length m, Time s," data-caption="The seven base units of measurement, each paired with the quantity it measures." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Derived units</b> are formed from the fundamental units. The unit of speed is metre per second, and the unit of acceleration is metre per second squared.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/4.png" alt="International Prototype Kilogram platinum iridium cylinder photo" data-caption="A platinum and iridium cylinder that was once the world standard for the kilogram." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The unit of temperature is kelvin, not degree Celsius. Candela is the unit of luminous intensity, not lumen.</div>
      <div class="cp-mnemonic">Kind Mothers Serve Kheer And Candy, Maybe — Kilogram, Metre, Second, Kelvin, Ampere, Candela, Mole.</div>
    `
  },
  5: {
    questext: "Which one is the unit of luminous intensity?",
    options: ["Lumen", "Candela", "Kelvin", "Ampere"],
    correct: "2",
    exptext: "✅ Candela is the unit of luminous intensity. 📌 Think of a candle giving light: candela. ❌ Lumen is the unit of total light flow, which is why it looks right but is wrong."
  },
  6: {
    questext: "Which one of the following is NOT a fundamental unit?",
    options: ["Kelvin", "Mole", "Newton", "Ampere"],
    correct: "3",
    exptext: "✅ Newton is the unit of force, so it is a derived unit made from kilogram, metre and second. 📌 The seven base units are kilogram, metre, second, kelvin, ampere, candela and mole. ❌ Kelvin, mole and ampere are all base units."
  },
  7: {
    questext: "Consider the following statements about units:\n1. The unit of amount of substance is mole.\n2. The unit of electric current is coulomb.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. The unit of electric current is ampere. 📌 Coulomb is the unit of charge, not of current. ❌ Statement 2 is wrong because it mixes up charge and current."
  },
  8: {
    type: "concept", icon: "🚗", accent: "#ef4444", pauseTimer: true,
    title: "Rest and Motion",
    html: `
      <p class="cp-lead">An object is at <b>rest</b> if its position does not change with time compared with its surroundings. It is in <b>motion</b> if its position changes. <u>Rest and motion are always described relative to something else.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/5.png" alt="car moving on straight highway road photo" data-caption="A car on a straight road is a simple example of rectilinear motion." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Type of motion</th><th>Meaning</th><th>Example</th></tr></thead><tbody><tr><td>Rectilinear</td><td>Motion along a straight line</td><td>Moving car on a straight road, motion under gravity</td></tr><tr><td>Angular</td><td>Motion along a circular path</td><td>A particle going on a circle, projectile motion, rotation of a machine shaft</td></tr><tr><td>Rotational</td><td>Motion of a body about its own axis</td><td>Motion of a fan</td></tr></tbody></table>
      <p class="cp-lead">If an object covers equal distances in equal intervals of time, it is in <b>uniform motion</b>. If it covers unequal distances in equal intervals of time, it is in <b>non-uniform motion</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/6.png" alt="Two number lines. Top line has equal jumps of 10 metres every second, labelled uniform mot" data-caption="Equal jumps in equal times show uniform motion; changing jumps show non-uniform motion." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A fan turning about its own axis shows rotational motion. A particle going round a circle shows angular motion. Do not mix the two.</div>
    `
  },
  9: {
    questext: "The motion of a fan is an example of",
    options: ["Rectilinear motion", "Angular motion", "Rotational motion", "Projectile motion"],
    correct: "3",
    exptext: "✅ A fan turns about its own axis, so its motion is rotational. 📌 Rotation means spinning on the spot. ❌ Angular motion is the tempting answer, but it describes a particle moving round a circle."
  },
  10: {
    questext: "Consider the following statements:\n1. The motion of a car on a straight road is rotational motion.\n2. The motion of a fan is rotational motion.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct, because a fan spins about its own axis. 📌 A car on a straight road moves in a straight line. ❌ Statement 1 is wrong because that motion is rectilinear."
  },
  11: {
    type: "concept", icon: "🏁", accent: "#8b5cf6", pauseTimer: true,
    title: "Speed",
    html: `
      <p class="cp-lead">Speed is the distance covered by a moving body in one unit of time. <u>Speed tells us how fast a body moves, and it has no direction.</u></p>
      <div class="cp-formula" translate="no"><small>Speed</small>Speed = <span class="cp-frac"><i>Distance travelled</i><i>Time taken</i></span></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/7.png" alt="car speedometer dashboard close up photo" data-caption="A speedometer shows the speed of a vehicle at one moment, in kilometres per hour." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">If a body travels equal distances with speeds v1 and v2, its average speed is the <b>harmonic mean</b> of the two speeds. If it travels for equal times with speeds v1 and v2, its average speed is the <b>arithmetic mean</b>.</p>
      <div class="cp-formula" translate="no"><small>Equal distances</small>v = <span class="cp-frac"><i>2 × v1 × v2</i><i>v1 + v2</i></span></div>
      <div class="cp-formula" translate="no"><small>Equal times</small>v = <span class="cp-frac"><i>v1 + v2</i><i>2</i></span></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/8.png" alt="Two road diagrams. Top road: two halves of 60 kilometres each at 40 and 60 kilometres per " data-caption="The same two speeds give different averages for equal distances and for equal times." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">When the distances are equal, never take the simple average of the speeds. For 40 and 60, the correct answer is 48, not 50.</div>
      <div class="cp-mnemonic">Equal Distance means Harmonic. Equal Time means Arithmetic.</div>
    `
  },
  12: {
    questext: "A car goes from one city to another at 40 kilometres per hour and returns by the same road at 60 kilometres per hour. What is its average speed for the whole journey?",
    options: ["50 kilometres per hour", "52 kilometres per hour", "45 kilometres per hour", "48 kilometres per hour"],
    correct: "4",
    exptext: "✅ The distances are equal, so use the harmonic mean: 2 × 40 × 60 ÷ 100 = 48. 📌 Equal distance means harmonic mean. ❌ 50 is tempting, but it is the simple average and is wrong here."
  },
  13: {
    questext: "A body travels for two equal times at 30 and 50 kilometres per hour. What is its average speed?",
    options: ["38 kilometres per hour", "40 kilometres per hour", "37.5 kilometres per hour", "42 kilometres per hour"],
    correct: "2",
    exptext: "✅ The times are equal, so use the arithmetic mean: (30 + 50) ÷ 2 = 40. 📌 Equal time means arithmetic mean. ❌ 37.5 is the harmonic mean, which is only for equal distances."
  },
  14: {
    type: "concept", icon: "🧭", accent: "#14b8a6", pauseTimer: true,
    title: "Velocity",
    html: `
      <p class="cp-lead">Velocity is the time rate of change of displacement. <u>Velocity is speed with a direction, so it is a vector quantity.</u></p>
      <div class="cp-formula" translate="no"><small>Velocity</small>Velocity = <span class="cp-frac"><i>Displacement</i><i>Time</i></span></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/9.png" alt="A start point A and an end point B. A curved path from A to B labelled distance 10 kilomet" data-caption="Distance follows the whole path, while displacement is the straight line from start to end." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td>Uniform velocity</td><td>Equal displacements in equal intervals of time</td></tr><tr><td>Non-uniform (variable) velocity</td><td>Unequal displacements in equal intervals of time</td></tr><tr><td>Average velocity</td><td>Total displacement divided by total time taken</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/10.png" alt="A round track. A runner starts at point S, goes once around and returns to S. Labels: dist" data-caption="After a full round trip the displacement is zero, so the average velocity is zero." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Displacement can be zero even when the distance is large. So the average velocity can be zero, but the average speed cannot.</div>
    `
  },
  15: {
    questext: "A runner completes one full round of a circular track and returns to the starting point. Her average velocity for the round is",
    options: ["equal to her average speed", "double her average speed", "zero", "infinite"],
    correct: "3",
    exptext: "✅ The displacement is zero because she ends where she began, so the average velocity is zero. 📌 Velocity needs displacement, not distance. ❌ Equal to average speed is wrong because speed uses distance."
  },
  16: {
    questext: "Velocity is the time rate of change of",
    options: ["distance", "speed", "acceleration", "displacement"],
    correct: "4",
    exptext: "✅ Velocity is displacement divided by time. 📌 Velocity goes with displacement; speed goes with distance. ❌ Distance is tempting, but it gives speed, not velocity."
  },
  17: {
    type: "concept", icon: "🚀", accent: "#ec4899", pauseTimer: true,
    title: "Acceleration",
    html: `
      <p class="cp-lead">Acceleration is the time rate of change of velocity. <u>It tells us how quickly the velocity of a body is changing.</u></p>
      <div class="cp-formula" translate="no"><small>Acceleration</small>Acceleration = <span class="cp-frac"><i>Change in velocity</i><i>Time taken</i></span></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/11.png" alt="car braking at red traffic light photo" data-caption="A braking car loses speed, which is a case of negative acceleration." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Acceleration is a vector quantity. Its unit is metre per second squared. Acceleration at one instant of time is called <b>instantaneous acceleration</b>. If the acceleration does not change with time, it is <b>constant acceleration</b>.</p>
      <table><thead><tr><th>Situation</th><th>Sign of acceleration</th></tr></thead><tbody><tr><td>Velocity increases with time</td><td>Positive</td></tr><tr><td>Velocity decreases with time</td><td>Negative, called deceleration or retardation</td></tr><tr><td>Acceleration does not change</td><td>Constant acceleration</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/12.png" alt="Three small panels. Panel 1: speed arrows growing longer, labelled positive. Panel 2: spee" data-caption="Growing, shrinking and steady velocity arrows show the three kinds of acceleration." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Deceleration and retardation are other names for negative acceleration.</div>
    `
  },
  18: {
    questext: "The unit of acceleration is",
    options: ["metre per second squared", "metre per second", "metre second", "newton"],
    correct: "1",
    exptext: "✅ Acceleration is change in velocity per unit time, so its unit is metre per second squared. 📌 Velocity is metre per second, and dividing by time adds one more second. ❌ Metre per second is the unit of velocity."
  },
  19: {
    questext: "Consider the following statements:\n1. Acceleration is a scalar quantity.\n2. Negative acceleration is also called retardation.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. Negative acceleration slows a body down and is called retardation. 📌 Acceleration has a direction, so it is a vector. ❌ Statement 1 is wrong because acceleration is not a scalar."
  },
  20: {
    type: "concept", icon: "📐", accent: "#3b82f6", pauseTimer: true,
    title: "Equations of Uniformly Accelerated Motion",
    html: `
      <p class="cp-lead">A body starts with initial velocity u and reaches final velocity v in time t. If its acceleration a is uniform and it covers distance s, three simple equations connect these quantities along a straight line.</p>
      <div class="cp-formula" translate="no"><small>Equations of motion</small>v = u + at<br>s = ut + ½at²<br>v² = u² + 2as</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/13.png" alt="A velocity against time graph: a straight line rising from u on the vertical axis to v at " data-caption="On a velocity-time graph the slope is acceleration and the area under the line is distance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Case</th><th>What changes</th></tr></thead><tbody><tr><td>Body falling freely under gravity</td><td>Replace a with g</td></tr><tr><td>Body thrown vertically upward</td><td>Replace a with minus g</td></tr></tbody></table>
      <table><thead><tr><th>Graph</th><th>Shape</th></tr></thead><tbody><tr><td>Velocity against time, uniform acceleration</td><td>Straight line inclined to the time axis</td></tr><tr><td>Position against time, uniform acceleration</td><td>Parabola</td></tr><tr><td>Acceleration against time, uniform acceleration</td><td>Straight line parallel to the time axis</td></tr><tr><td>Slope of the position-time graph</td><td>Gives velocity</td></tr><tr><td>Slope of the velocity-time graph</td><td>Gives acceleration</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/14.png" alt="Three small graphs side by side: position against time as a curve, velocity against time a" data-caption="Three graphs of the same uniformly accelerated body: a curve, a slanted line and a flat line." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Worked example. A car starts from rest and accelerates at 2 metres per second squared for 5 seconds. Then s = 0 + ½ × 2 × 25 = 25 metres and v = 10 metres per second.</div>
      <div class="cp-note trap">For a ball thrown upward, use minus g because gravity pulls against the upward motion and slows the ball.</div>
    `
  },
  21: {
    questext: "A car starts from rest and moves with a uniform acceleration of 2 metres per second squared. How far does it travel in 5 seconds?",
    options: ["10 metres", "50 metres", "25 metres", "20 metres"],
    correct: "3",
    exptext: "✅ Use s = ut + ½at² with u = 0: s = ½ × 2 × 25 = 25 metres. 📌 Starting from rest, the first term vanishes. ❌ 50 metres forgets the half in the formula."
  },
  22: {
    questext: "For a body in uniformly accelerated motion, the velocity-time graph is",
    options: ["a straight line inclined to the time axis", "a parabola", "a straight line parallel to the time axis", "a circle"],
    correct: "1",
    exptext: "✅ Velocity changes by equal amounts in equal times, so the graph is a straight inclined line. 📌 Its slope is the acceleration. ❌ A parabola belongs to the position-time graph."
  },
  23: {
    questext: "When a body is thrown vertically upward, in the equations of motion the acceleration a is replaced by",
    options: ["plus g", "minus g", "zero", "two g"],
    correct: "2",
    exptext: "✅ Gravity acts downward, opposite to the upward motion, so a becomes minus g. 📌 Up is positive, gravity is negative. ❌ Plus g is for a body falling downward."
  },
  24: {
    type: "concept", icon: "🎯", accent: "#f97316", pauseTimer: true,
    title: "Projectile Motion",
    html: `
      <p class="cp-lead">When a body is thrown at an angle to the horizontal (other than 90 degrees), it follows a curved, parabolic path under gravity. This path is called its <b>trajectory</b>, and the motion is called <b>projectile motion</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/15.png" alt="water jet fountain parabola arc photo" data-caption="Water thrown through the air follows a parabola, just like any projectile." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Example of projectile motion</th><th>Why it counts</th></tr></thead><tbody><tr><td>A bullet shot from a gun</td><td>It moves under gravity along a curve</td></tr><tr><td>A rocket after burn-out</td><td>Engine is off, only gravity acts</td></tr><tr><td>A bomb dropped from an aeroplane</td><td>It starts with the sideways speed of the plane</td></tr></tbody></table>
      <p class="cp-lead">Drop one ball from a height and, at the same moment, throw another ball sideways from the same height. Both balls reach the ground <u>at the same time</u>, but at different places.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/16.png" alt="Two balls at the same height. Left ball falls straight down, labelled dropped. Right ball " data-caption="The dropped ball and the sideways-thrown ball take the same time to reach the ground." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A sideways push does not change how fast a ball falls. Gravity alone decides the time of fall.</div>
    `
  },
  25: {
    questext: "Which one of the following is NOT an example of projectile motion?",
    options: ["A bullet shot from a gun", "A rocket after burn-out", "A bomb dropped from an aeroplane", "A car moving on a straight horizontal road"],
    correct: "4",
    exptext: "✅ A car on a straight road moves in a straight line and does not follow a parabolic path. 📌 Projectile means a curved path under gravity alone. ❌ The other three all follow a curve under gravity."
  },
  26: {
    questext: "One ball is dropped from a height and another ball is thrown horizontally from the same height at the same moment. Which statement is correct?",
    options: ["Both strike the ground at the same time but at different places", "The dropped ball strikes first", "The thrown ball strikes first", "Both strike the ground at the same place"],
    correct: "1",
    exptext: "✅ Both fall under the same gravity, so they take equal time, but the thrown ball also moves sideways. 📌 Sideways motion and falling are independent. ❌ The thrown ball does not take longer."
  },
  27: {
    type: "concept", icon: "🎡", accent: "#84cc16", pauseTimer: true,
    title: "Circular Motion",
    html: `
      <p class="cp-lead">The motion of an object along a circular path is called circular motion. If the speed stays constant, it is called <b>uniform circular motion</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/17.png" alt="Ferris wheel rotating at dusk photo" data-caption="The carriages of a Ferris wheel move in circular motion." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">At any point of the circle, the direction of motion is along the <b>tangent</b> to the circle at that point. In uniform circular motion the speed is constant, but the direction keeps changing, so the velocity and the acceleration both change.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/18.png" alt="A circle with four points. At each point a short arrow along the tangent, labelled velocit" data-caption="The velocity arrow touches the circle, while the acceleration arrow points to the centre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">In uniform circular motion the speed is constant, but the velocity is not, because its direction changes all the time.</div>
      <div class="cp-note exam">In non-uniform circular motion, the speed changes from point to point on the circular track.</div>
    `
  },
  28: {
    questext: "Which quantity remains constant in uniform circular motion?",
    options: ["Speed", "Velocity", "Acceleration", "Direction of motion"],
    correct: "1",
    exptext: "✅ Speed stays the same, while the direction keeps changing. 📌 Speed has no direction, so turning does not change it. ❌ Velocity changes because its direction changes."
  },
  29: {
    questext: "Consider the following statements:\n1. The direction of motion at any point of a circle is along the radius.\n2. In uniform circular motion the speed is constant.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 The direction of motion is along the tangent, which touches the circle. ❌ Statement 1 is wrong because the radius points to the centre, not along the motion."
  },
  30: {
    type: "concept", icon: "🎯", accent: "#06b6d4", pauseTimer: true,
    title: "Centripetal Acceleration",
    html: `
      <p class="cp-lead">In circular motion, an acceleration acts on the body towards the centre of the circle. It is called <b>centripetal acceleration</b>. <u>Its direction is always towards the centre of the circular path.</u></p>
      <div class="cp-formula" translate="no"><small>Centripetal acceleration</small>a = <span class="cp-frac"><i>v²</i><i>r</i></span></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/19.png" alt="A circle with a body at three positions. At each position a short arrow points straight to" data-caption="At every position of the circle, the centripetal acceleration points to the centre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">This acceleration does not change the speed of the body. It only turns the body, so the path stays circular.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/20.png" alt="hammer throw athlete spinning before release photo" data-caption="The wire pulls the heavy ball inward, giving it the acceleration needed to keep moving in a circle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Centripetal acceleration points to the centre, not along the direction of motion.</div>
    `
  },
  31: {
    questext: "The direction of centripetal acceleration is always",
    options: ["away from the centre", "along the tangent", "opposite to the velocity", "towards the centre of the circular path"],
    correct: "4",
    exptext: "✅ Centripetal means centre-seeking, so the acceleration points to the centre. 📌 Think of a string pulling the ball inward. ❌ Along the tangent is the direction of the velocity, not of the acceleration."
  },
  32: {
    type: "concept", icon: "💪", accent: "#a855f7", pauseTimer: true,
    title: "Force",
    html: `
      <p class="cp-lead">Force is an external push or pull that can change, or try to change, the state of rest or of uniform motion of a body. <u>Force makes things start moving, stop, speed up, slow down or change direction.</u></p>
      <table><thead><tr><th>System</th><th>Unit of force</th></tr></thead><tbody><tr><td>International System</td><td>Newton (N)</td></tr><tr><td>Centimetre-gram-second system</td><td>Dyne</td></tr><tr><td>Relation</td><td>1 newton = 10⁵ dyne</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/21.png" alt="A box on a floor with one arrow pushing it from the left labelled push, and another arrow " data-caption="A push and a pull are the two basic kinds of force." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">If the sum of all the forces acting on a body is zero, the body is said to be in <b>equilibrium</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/22.png" alt="tug of war evenly matched teams rope photo" data-caption="Two equal and opposite pulls cancel, and the rope stays in equilibrium." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Zero net force does not mean zero forces. Many forces can act on a body, and the body is still in equilibrium when they add up to zero.</div>
    `
  },
  33: {
    questext: "One newton is equal to how many dyne?",
    options: ["10³ dyne", "10⁷ dyne", "10⁵ dyne", "10² dyne"],
    correct: "3",
    exptext: "✅ One newton equals 10 to the power 5 dyne. 📌 A newton is the bigger unit; a dyne is a tiny force. ❌ 10 to the power 7 is the relation between joule and erg, so it is a tempting mix-up."
  },
  34: {
    questext: "A body is said to be in equilibrium when",
    options: ["only one force acts on it", "the sum of all forces acting on it is zero", "it is moving fast", "its mass is zero"],
    correct: "2",
    exptext: "✅ Equilibrium means all the forces add up to zero, so there is no net force. 📌 Balanced forces mean no change in motion. ❌ A single force would change the motion, so it cannot give equilibrium."
  },
  35: {
    type: "concept", icon: "🔄", accent: "#e11d48", pauseTimer: true,
    title: "Centripetal Force",
    html: `
      <p class="cp-lead">During circular motion, a force always acts on the body towards the centre of the circular path. This force is called <b>centripetal force</b>. <u>Without it, the body would fly off in a straight line.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/23.png" alt="A ball on a string whirled in a circle. An arrow along the string toward the hand, labelle" data-caption="Cut the string and the ball flies off along a straight tangent instead of circling." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Circular motion</th><th>What provides the centripetal force</th></tr></thead><tbody><tr><td>Vehicle turning on a curved road</td><td>Friction between the tyres and the road</td></tr><tr><td>Electron going round the nucleus</td><td>Electrostatic force of attraction</td></tr><tr><td>Earth going round the Sun</td><td>Gravitational force of attraction</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/24.png" alt="satellite orbiting earth artist view photo" data-caption="The pull of Earth supplies the centripetal force that keeps a satellite in orbit." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Always name the force that provides the centripetal force in each case, because this is a favourite exam question.</div>
    `
  },
  36: {
    questext: "In circular motion, the centripetal force acts",
    options: ["along the tangent", "towards the centre of the circular path", "away from the centre", "opposite to the direction of motion"],
    correct: "2",
    exptext: "✅ The centripetal force points to the centre and keeps the body on its circular path. 📌 Centre-seeking force. ❌ Away from the centre describes the apparent centrifugal force."
  },
  37: {
    type: "concept", icon: "🌀", accent: "#10b981", pauseTimer: true,
    title: "Centrifugal Force",
    html: `
      <p class="cp-lead">In circular motion we feel as if a force pushes us outward, opposite to the centripetal force. This is called <b>centrifugal force</b>. It is an <u>apparent force, also called a pseudo force</u>, because there is no real outside agent pushing us out.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/25.png" alt="Top view of a car turning left with a passenger inside. A bold arrow toward the left centr" data-caption="In a turning car, the passenger seems pushed outward, away from the centre of the turn." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The outward push is really the body trying to keep moving in a straight line because of its inertia.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/26.png" alt="playground merry go round children spinning photo" data-caption="Riders of a spinning merry-go-round feel an outward push, which is the centrifugal effect." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Centripetal force is a real force, but centrifugal force is only an apparent force.</div>
    `
  },
  38: {
    questext: "Centrifugal force is also called",
    options: ["a real attractive force", "the nuclear force", "the gravitational force", "a pseudo force"],
    correct: "4",
    exptext: "✅ Centrifugal force is only apparent, so it is called a pseudo force. 📌 Pseudo means false or not real. ❌ It does not come from any real attraction such as gravity."
  },
  39: {
    questext: "Consider the following statements:\n1. Centripetal force acts towards the centre of the circular path.\n2. Centrifugal force is a real force acting towards the centre.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Centrifugal means centre-fleeing, so it points outward. ❌ Statement 2 is wrong because centrifugal force is apparent and points away from the centre."
  },
  40: {
    type: "concept", icon: "🛣️", accent: "#eab308", pauseTimer: true,
    title: "Applications of Centripetal and Centrifugal Forces",
    html: `
      <p class="cp-lead">Many everyday things work because of these forces. <u>In each case, ask which force supplies the centripetal force.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/27.png" alt="cyclist leaning into a turn on road photo" data-caption="A cyclist leans from the vertical so that the turn can be made safely." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Situation</th><th>How the force acts</th></tr></thead><tbody><tr><td>Cyclist on a turn</td><td>Leans inward and slows down, moving on a path of larger radius</td></tr><tr><td>Banked road</td><td>The road is tilted at turns to give the needed centripetal force</td></tr><tr><td>Vehicle on a flat curved road</td><td>Friction between the tyres and the road acts as the centripetal force</td></tr><tr><td>Bucket of water whirled in a vertical circle</td><td>Water does not fall even at the top, because the outward force is equal to or greater than its weight</td></tr><tr><td>Electron round the nucleus</td><td>Electrostatic force of attraction</td></tr><tr><td>Earth round the Sun</td><td>Gravitational force of attraction</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/28.png" alt="milk cream separator dairy centrifuge photo" data-caption="In a spinning vessel, the lighter cream collects in the middle and the heavier milk moves outward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In a cream separator, the lighter cream particles feel less outward force than the heavier milk particles, so the two separate.</p>
      <div class="cp-note trap">A cyclist who turns without leaning or slowing down may skid, because friction alone may not give enough centripetal force.</div>
    `
  },
  41: {
    questext: "Cream is separated from milk in a dairy machine on the principle of",
    options: ["conduction", "refraction", "centrifugal action", "buoyancy"],
    correct: "3",
    exptext: "✅ A spinning vessel throws heavier milk particles outward while lighter cream stays near the axis. 📌 Spinning separates by weight. ❌ Buoyancy is tempting but the machine works by spinning, not by floating."
  },
  42: {
    questext: "For the revolution of the Earth round the Sun, the centripetal force is provided by",
    options: ["gravitational force of attraction", "friction", "electrostatic force", "magnetic force"],
    correct: "1",
    exptext: "✅ The gravitational pull between the Earth and the Sun keeps the Earth in its orbit. 📌 Planets use gravity. ❌ Electrostatic force is the one used by electrons round the nucleus."
  },
  43: {
    questext: "Roads are banked at turns in order to",
    options: ["increase friction between the tyres and the road", "reduce the weight of vehicles", "make the road cheaper", "provide the required centripetal force for taking a turn"],
    correct: "4",
    exptext: "✅ A tilted road supplies the centripetal force needed for the turn, so vehicles turn safely. 📌 Banking helps the turn. ❌ Increasing friction is tempting but is not the main reason for banking."
  },
  44: {
    type: "concept", icon: "🧱", accent: "#0ea5e9", pauseTimer: true,
    title: "Newton's First Law of Motion",
    html: `
      <p class="cp-lead">A body continues in its state of rest, or of uniform motion in a straight line, unless an external force acts on it. This law is based on <b>inertia</b>, so it is also called the <u>law of inertia</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/29.png" alt="ice hockey puck gliding on ice rink photo" data-caption="A puck on smooth ice keeps gliding because very little force acts to stop it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Inertia</b> is the property of a body by which it opposes any change in its state of rest or of uniform motion in a straight line. A heavier body has more inertia than a lighter one.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/30.png" alt="Two panels. Left: a ball at rest with a label stays at rest. Right: a ball rolling with an" data-caption="Without an outside force, a resting body stays at rest and a moving body keeps its steady motion." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Inertia is not a force. It is a property of every body, and its measure is the mass of the body.</div>
    `
  },
  45: {
    questext: "Newton's first law of motion is also known as the law of",
    options: ["gravitation", "action and reaction", "conservation of energy", "inertia"],
    correct: "4",
    exptext: "✅ The first law says a body keeps its state of rest or motion unless a force acts, which is inertia. 📌 First law means inertia. ❌ Action and reaction belongs to the third law."
  },
  46: {
    type: "concept", icon: "🚌", accent: "#d946ef", pauseTimer: true,
    title: "Inertia of Rest and Inertia of Motion",
    html: `
      <p class="cp-lead"><b>Inertia of rest</b> is the tendency of a resting body to stay at rest. <b>Inertia of motion</b> is the tendency of a moving body to keep moving. <u>Both are easy to see in a bus.</u></p>
      <table><thead><tr><th>Situation</th><th>Type of inertia</th><th>What happens</th></tr></thead><tbody><tr><td>A bus at rest suddenly starts</td><td>Inertia of rest</td><td>Passengers jerk backward</td></tr><tr><td>A running bus stops suddenly</td><td>Inertia of motion</td><td>Passengers jerk forward</td></tr><tr><td>A carpet is beaten with a stick</td><td>Inertia of rest</td><td>Dust particles come out</td></tr><tr><td>A passenger jumps out of a fast bus</td><td>Inertia of motion</td><td>The body keeps moving forward</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/31.png" alt="Two panels of a bus with passengers. Panel 1: bus starts, passengers lean backward. Panel " data-caption="Passengers lean backward when a bus starts and forward when it stops suddenly." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A passenger who jumps out of a fast bus should jump in the forward direction and run forward for a short distance. This keeps the body from falling.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/32.png" alt="man beating dusty carpet with stick photo" data-caption="The carpet moves, but the dust stays behind for a moment and then falls out." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The jerk is not a force pushing the passenger. The body simply tries to keep its old state while the bus changes its state.</div>
    `
  },
  47: {
    questext: "When a bus at rest suddenly starts, the passengers sitting in it jerk backward. This is due to",
    options: ["inertia of rest", "inertia of motion", "friction", "gravity"],
    correct: "1",
    exptext: "✅ The passengers were at rest and tend to stay at rest while the bus moves ahead. 📌 Start gives rest inertia. ❌ Inertia of motion applies when a moving bus stops suddenly."
  },
  48: {
    questext: "A passenger who jumps out of a rapidly moving bus is advised to",
    options: ["jump backward and stand still", "jump sideways and stand still", "jump in the forward direction and run forward for a short distance", "jump upward"],
    correct: "3",
    exptext: "✅ The body keeps the forward speed of the bus because of inertia of motion, so running forward avoids a fall. 📌 Match the bus direction. ❌ Standing still would make the feet stop while the body keeps moving."
  },
  49: {
    type: "concept", icon: "🏋️", accent: "#64748b", pauseTimer: true,
    title: "Momentum",
    html: `
      <p class="cp-lead">The momentum of a moving body is the product of its mass and its velocity. <u>A heavy or fast body has more momentum and is harder to stop.</u></p>
      <div class="cp-formula" translate="no"><small>Momentum</small>p = m × v</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/33.png" alt="A big truck and a small bicycle moving at the same speed. Under the truck a long bar label" data-caption="At the same speed, the truck carries far more momentum than the bicycle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Momentum is a vector quantity, and its unit is kilogram metre per second. For example, a body of mass 2 kilograms moving at 5 metres per second has momentum 10 kilogram metre per second.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/34.png" alt="loaded truck moving on highway photo" data-caption="A loaded truck has large momentum, so it needs a long distance to stop." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Momentum depends on both mass and velocity. A slow, very heavy body can have more momentum than a fast, very light one.</div>
    `
  },
  50: {
    questext: "The momentum of a moving body is equal to the product of its",
    options: ["mass and acceleration", "mass and distance", "force and time", "mass and velocity"],
    correct: "4",
    exptext: "✅ Momentum equals mass multiplied by velocity. 📌 Think of mv. ❌ Force multiplied by time is impulse, which is a different quantity."
  },
  51: {
    questext: "What is the momentum of a body of mass 2 kilograms moving with a velocity of 5 metres per second?",
    options: ["7 kilogram metre per second", "2.5 kilogram metre per second", "10 kilogram metre per second", "3 kilogram metre per second"],
    correct: "3",
    exptext: "✅ Momentum equals 2 × 5 = 10. 📌 Multiply, do not add. ❌ 7 comes from adding the two numbers, which is wrong."
  },
  52: {
    type: "concept", icon: "⚖️", accent: "#fb7185", pauseTimer: true,
    title: "Conservation of Linear Momentum",
    html: `
      <p class="cp-lead">The linear momentum of a system of particles stays <b>conserved</b> if the external force acting on the system is zero. <u>The total momentum before an event equals the total momentum after it.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/35.png" alt="A rocket drawn upright. A downward arrow from its tail labelled gas thrown backward. An up" data-caption="The rocket throws gas down, and the rocket gains an equal momentum upward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Rocket propulsion and the engine of a jet aeroplane work on this principle. In a rocket, the ejected gas exerts a forward force that helps in accelerating the rocket upward.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/36.png" alt="rocket lift off launch pad flames photo" data-caption="A launching rocket pushes hot gas downward and rises upward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Momentum is conserved only when no external force acts on the system. Inside forces cannot change the total.</div>
    `
  },
  53: {
    questext: "Rocket propulsion works on the principle of",
    options: ["conservation of energy", "Bernoulli's theorem", "conservation of linear momentum", "Archimedes principle"],
    correct: "3",
    exptext: "✅ The gas goes backward with some momentum, so the rocket gains an equal momentum forward. 📌 Rocket means momentum. ❌ Bernoulli's theorem deals with flowing liquids."
  },
  54: {
    questext: "The linear momentum of a system of particles remains conserved if",
    options: ["the external force acting on the system is zero", "the mass of the system is large", "the system is moving fast", "the system is at a height"],
    correct: "1",
    exptext: "✅ With zero external force, the total momentum cannot change. 📌 No outside force, no change in momentum. ❌ Mass or speed alone does not make momentum conserved."
  },
  55: {
    type: "concept", icon: "➡️", accent: "#2dd4bf", pauseTimer: true,
    title: "Newton's Second Law",
    html: `
      <p class="cp-lead">The rate of change of momentum of a body is directly proportional to the force applied on it. The change in momentum takes place in the direction of the applied force.</p>
      <div class="cp-formula" translate="no"><small>Second law</small>F = <span class="cp-frac"><i>Δp</i><i>Δt</i></span> = <span class="cp-frac"><i>m Δv</i><i>Δt</i></span> = ma</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/37.png" alt="Two carts pushed by the same arrow labelled same force. A light cart accelerates a lot, wi" data-caption="For the same push, a light body speeds up more than a heavy one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">This law gives the formula force equals mass times acceleration. For example, a body of mass 5 kilograms with acceleration 2 metres per second squared needs a force of 10 newton.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/38.png" alt="pushing empty and loaded shopping trolley supermarket photo" data-caption="A loaded trolley needs a bigger push than an empty one to get the same acceleration." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">One newton is the force that gives a mass of 1 kilogram an acceleration of 1 metre per second squared.</div>
    `
  },
  56: {
    questext: "A force acts on a body of mass 5 kilograms and gives it an acceleration of 2 metres per second squared. The force is",
    options: ["2.5 newton", "7 newton", "3 newton", "10 newton"],
    correct: "4",
    exptext: "✅ Force equals mass times acceleration, that is 5 × 2 = 10 newton. 📌 Force is ma. ❌ 7 comes from adding mass and acceleration, which is wrong."
  },
  57: {
    questext: "Consider the following statements about Newton's second law:\n1. The rate of change of momentum is directly proportional to the applied force.\n2. The change in momentum takes place opposite to the direction of the applied force.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 The change of momentum follows the force. ❌ Statement 2 is wrong because the change takes place in the same direction as the force."
  },
  58: {
    type: "concept", icon: "🔁", accent: "#c026d3", pauseTimer: true,
    title: "Newton's Third Law",
    html: `
      <p class="cp-lead">For every action there is an equal and opposite reaction, and both act on two different interacting objects. <u>A rocket is propelled by the principle of Newton's third law of motion.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/39.png" alt="A balloon with air rushing out of its mouth to the left, labelled action. The balloon movi" data-caption="The air pushed out one way drives the balloon the other way." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">When you push a wall, the wall pushes you back with an equal force. A swimmer pushes the water backward, and the water pushes the swimmer forward.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/40.png" alt="swimmer pushing water backward freestyle photo" data-caption="The swimmer pushes water back, and the water pushes the swimmer forward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Action and reaction act on two different bodies, so they never cancel each other.</div>
    `
  },
  59: {
    questext: "A rocket is propelled by the principle of",
    options: ["Newton's first law", "Newton's second law", "Newton's third law", "the law of gravitation"],
    correct: "3",
    exptext: "✅ The rocket pushes gas backward, and the gas pushes the rocket forward. 📌 Action and reaction. ❌ The second law gives the size of the force, not the pair of forces."
  },
  60: {
    questext: "The action force and the reaction force",
    options: ["act on the same body", "act on two different bodies", "are always unequal", "act in the same direction"],
    correct: "2",
    exptext: "✅ They are equal and opposite and act on two different bodies. 📌 Different bodies, so no cancelling. ❌ If they acted on one body, they would cancel, which they do not."
  },
  61: {
    type: "concept", icon: "💥", accent: "#16a34a", pauseTimer: true,
    title: "Impulse",
    html: `
      <p class="cp-lead">A large force acting on a body for a very short time, which produces a large change in its momentum, is called an <b>impulsive force</b>. <u>Impulse is force multiplied by the time for which it acts.</u></p>
      <div class="cp-formula" translate="no"><small>Impulse</small>Impulse = Force × Time = Change in momentum</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/41.png" alt="cricket fielder catching ball pulling hands back photo" data-caption="A fielder lowers his hands to increase the time over which the ball stops." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The unit of impulse is newton second. A fielder lowers his hands while catching a fast ball. This increases the time of contact, so a smaller force acts, and he is not hurt.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/42.png" alt="railway wagon buffers between train coaches photo" data-caption="Buffers lengthen the time of impact in jerks, so the damage becomes smaller." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">For the same change in momentum, a longer time of stopping means a smaller force.</div>
      <div class="cp-mnemonic">More time, less force.</div>
    `
  },
  62: {
    questext: "A cricket fielder lowers his hands while catching a fast ball because",
    options: ["the ball becomes lighter", "the ball gets faster", "the force needed is increased", "the time of impact is increased, so a smaller force acts"],
    correct: "4",
    exptext: "✅ A longer time of stopping means a smaller force for the same change in momentum. 📌 More time, less force. ❌ Increasing the force would hurt the hands."
  },
  63: {
    questext: "The unit of impulse is",
    options: ["newton second", "newton metre", "joule", "watt"],
    correct: "1",
    exptext: "✅ Impulse equals force multiplied by time, so its unit is newton second. 📌 Force times time. ❌ Newton metre is the unit of work or torque."
  },
  64: {
    questext: "Wagons of a train are provided with buffers in order to",
    options: ["increase speed", "reduce weight", "increase the time of impact in jerks and so decrease the damage", "increase friction"],
    correct: "3",
    exptext: "✅ Buffers increase the time of impact, so the force and the damage become smaller. 📌 Same idea as the fielder. ❌ Buffers do not change the weight or speed."
  },
  65: {
    type: "concept", icon: "🧲", accent: "#d97706", pauseTimer: true,
    title: "Friction",
    html: `
      <p class="cp-lead">Friction is a force that opposes the relative motion of two bodies when one body moves, or tries to move, over the surface of the other.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/43.png" alt="Two surfaces magnified. Tiny bumps on the top surface locked into tiny bumps on the bottom" data-caption="Seen closely, bumps and attraction at the touching points resist the sliding." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The cause of friction is the strong atomic or molecular forces of attraction acting between the two surfaces at the points of actual contact.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/44.png" alt="person pushing heavy box across floor photo" data-caption="Friction between the box and the floor resists the push." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Friction acts opposite to the relative motion or attempted motion, not opposite to the force of gravity.</div>
    `
  },
  66: {
    questext: "The cause of friction is",
    options: ["gravity", "magnetic force", "air pressure", "atomic or molecular forces of attraction between the surfaces at the points of contact"],
    correct: "4",
    exptext: "✅ Friction arises from attraction between atoms or molecules of the two surfaces where they touch. 📌 Contact attraction. ❌ Gravity pulls bodies down and is not the cause of friction."
  },
  67: {
    type: "concept", icon: "🛞", accent: "#dc2626", pauseTimer: true,
    title: "Uses of Friction",
    html: `
      <p class="cp-lead">Friction is a help in many places and a nuisance in others. <u>We increase it where we need grip and reduce it where we need smooth motion.</u></p>
      <table><thead><tr><th>Use or method</th><th>How friction works</th></tr></thead><tbody><tr><td>Walking, holding nuts and bolts, applying brakes</td><td>Friction is necessary to grip</td></tr><tr><td>Polishing, lubricants, ball bearings</td><td>These reduce friction</td></tr><tr><td>Ball bearing</td><td>Rolling balls reduce rotational friction and support loads</td></tr><tr><td>Tyres made of synthetic rubber</td><td>Large friction stops sliding at turns</td></tr><tr><td>Threading on tyres</td><td>Increases friction between tyre and road</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/45.png" alt="ball bearing steel balls inner outer ring close up photo" data-caption="A ball bearing uses small balls to reduce friction and support loads." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">When a pedal is applied to a bicycle, the friction on the rear wheel is in the forward direction, and on the front wheel it is in the backward direction.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/46.png" alt="tyre tread pattern close up photo" data-caption="Tyre grooves and rubber increase the grip between the tyre and the road." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/47.png" alt="A bicycle moving to the right. At the rear wheel an arrow pointing forward labelled fricti" data-caption="On a pedalled bicycle, friction pushes the rear wheel forward and the front wheel backward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not confuse the two wheels. For a pedalled bicycle, rear wheel friction is forward and front wheel friction is backward.</div>
    `
  },
  68: {
    questext: "Tyres are made of synthetic rubber because",
    options: ["it is cheap", "it is light", "its coefficient of friction is large", "it does not wear out"],
    correct: "3",
    exptext: "✅ Synthetic rubber has large friction with the road, so it stops sliding at turns. 📌 Rubber grips. ❌ Cheapness is not the reason."
  },
  69: {
    questext: "Friction can be decreased by",
    options: ["polishing the surfaces, using lubricants or using ball bearings", "making surfaces rough", "adding weight", "heating the surfaces"],
    correct: "1",
    exptext: "✅ Polishing, lubricants and ball bearings all reduce friction. 📌 Smooth and slippery means less friction. ❌ Rough surfaces increase friction."
  },
  70: {
    questext: "When a pedal is applied to a bicycle, the force of friction",
    options: ["is backward on both wheels", "is forward on the rear wheel and backward on the front wheel", "is forward on both wheels", "is zero on both wheels"],
    correct: "2",
    exptext: "✅ The rear wheel pushes backward on the road, so friction on it is forward. The front wheel only rolls, so friction on it is backward. 📌 Rear forward, front backward. ❌ Forward on both wheels is the tempting mistake."
  },
  71: {
    type: "concept", icon: "📘", accent: "#7c3aed", pauseTimer: true,
    title: "Laws of Limiting Friction",
    html: `
      <p class="cp-lead"><b>Limiting friction</b> is the maximum friction that can act between two surfaces before the body starts to slide. Four simple laws describe it.</p>
      <table><thead><tr><th>Law</th><th>Meaning</th></tr></thead><tbody><tr><td>1</td><td>It depends on the nature of the surfaces in contact and their state of polish</td></tr><tr><td>2</td><td>It acts along the surfaces in contact, in a direction opposite to the motion of the body</td></tr><tr><td>3</td><td>It is independent of the area of the surfaces in contact, as long as the normal reaction stays the same</td></tr><tr><td>4</td><td>It is directly proportional to the normal reaction between the two surfaces</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/48.png" alt="Two identical blocks, one lying on its large face and one on its small face, on the same f" data-caption="A block shows the same limiting friction whether it lies on a large or a small face." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Too much friction in machines causes loss of energy, and the machines are damaged in the end.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/49.png" alt="machine oil lubricating gears close up photo" data-caption="Lubricating oil reduces the friction loss in machine parts and protects them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Limiting friction does not depend on the area of contact. It depends on the normal reaction and the nature of the surfaces.</div>
    `
  },
  72: {
    questext: "The limiting friction between two surfaces is directly proportional to",
    options: ["the area of contact", "the speed of the body", "the volume of the body", "the normal reaction between the surfaces"],
    correct: "4",
    exptext: "✅ A larger normal reaction presses the surfaces more strongly, so limiting friction grows in the same ratio. 📌 Friction follows the normal reaction. ❌ Area of contact does not change limiting friction."
  },
  73: {
    questext: "Consider the following statements about limiting friction:\n1. The value of limiting friction depends upon the area of the surfaces in contact.\n2. Friction acts in a direction opposite to the direction of motion of the body.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Area does not matter, direction does. ❌ Statement 1 is wrong because limiting friction is independent of the area of contact."
  },
  74: {
    type: "concept", icon: "🛠️", accent: "#0d9488", pauseTimer: true,
    title: "Work",
    html: `
      <p class="cp-lead">Work is a scalar quantity. Its unit in the International System is the joule, and in the centimetre-gram-second system it is the erg. <u>One joule is equal to 10⁷ erg.</u></p>
      <div class="cp-formula" translate="no"><small>Work against gravity</small>W = m × g × h</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/50.png" alt="A person lifting a box of mass m up through height h, with a downward arrow mg and an upwa" data-caption="Lifting a body through a height needs work equal to mass times g times height." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Work is zero in two cases: when the body is not displaced at all, and when the body is displaced at right angles (90 degrees) to the direction of the force. For example, a coolie carrying a load on his head along a level platform does zero work against gravity.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/51.png" alt="porter carrying luggage on head railway platform photo" data-caption="The gravity force is downward while he moves sideways, so gravity does zero work." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Work done by the centripetal force in circular motion is zero, because the force is always at right angles to the displacement.</div>
    `
  },
  75: {
    questext: "Work done by a force is zero when the body is",
    options: ["displaced along the direction of the force", "displaced at right angles to the direction of the force", "displaced against the force", "heavy"],
    correct: "2",
    exptext: "✅ When the displacement is at 90 degrees to the force, no work is done. 📌 Work needs movement along the force. ❌ Movement along the force gives the maximum work."
  },
  76: {
    questext: "One joule is equal to",
    options: ["10⁷ erg", "10⁵ erg", "10³ erg", "10⁹ erg"],
    correct: "1",
    exptext: "✅ One joule equals 10 to the power 7 erg. 📌 Joule is the large unit, erg the small one. ❌ 10 to the power 5 is the relation between newton and dyne."
  },
  77: {
    questext: "The work done by the centripetal force in uniform circular motion is",
    options: ["positive", "negative", "zero", "infinite"],
    correct: "3",
    exptext: "✅ The centripetal force is at right angles to the displacement, so the work is zero. 📌 Right angle means no work. ❌ Positive work would increase the speed, but the speed stays the same."
  },
  78: {
    type: "concept", icon: "🔋", accent: "#db2777", pauseTimer: true,
    title: "Energy",
    html: `
      <p class="cp-lead">Energy is the capacity of a body to do work. It is a scalar quantity, and its unit in the International System is the joule. <u>Energy can be changed into work, and work into energy.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/52.png" alt="Two boxes. Left box: Energy, an arrow to the right labelled can do. Right box: Work, an ar" data-caption="Energy and work can change into each other with the help of a machine." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">There are two types of mechanical energy: <b>kinetic energy</b> and <b>potential energy</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/53.png" alt="hydroelectric dam water flowing spillway photo" data-caption="Stored water at a height has energy that can turn turbines." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Energy and work have the same unit, the joule, but they are not the same thing. Energy is the ability, and work is the transfer.</div>
    `
  },
  79: {
    questext: "Energy is a",
    options: ["vector quantity measured in newton", "scalar quantity measured in joule", "vector quantity measured in watt", "scalar quantity measured in newton second"],
    correct: "2",
    exptext: "✅ Energy has no direction, so it is a scalar, and its unit is the joule. 📌 Energy is scalar with the unit joule. ❌ Newton is the unit of force."
  },
  80: {
    type: "concept", icon: "🏃", accent: "#2563eb", pauseTimer: true,
    title: "Kinetic Energy",
    html: `
      <p class="cp-lead">The energy that a body has because of its motion is called its <b>kinetic energy</b>. <u>A moving body can do work, so it has energy.</u></p>
      <div class="cp-formula" translate="no"><small>Kinetic energy</small>K = ½ m v²</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/54.png" alt="Two bars. First bar: speed v, energy 1 unit. Second bar: speed 2v, energy 4 units. Label b" data-caption="Doubling the speed of a body makes its kinetic energy four times larger." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">For example, a body of mass 2 kilograms moving at 3 metres per second has kinetic energy ½ × 2 × 9 = 9 joule.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/55.png" alt="speeding train on track motion blur photo" data-caption="A fast, heavy train carries a very large amount of kinetic energy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Kinetic energy depends on the square of the speed. This is why a small rise in speed makes a large rise in energy.</div>
    `
  },
  81: {
    questext: "If the velocity of a moving body is doubled, its kinetic energy becomes",
    options: ["double", "half", "three times", "four times"],
    correct: "4",
    exptext: "✅ Kinetic energy depends on the square of velocity, so doubling velocity gives four times the energy. 📌 Square means two times two. ❌ Double is wrong because the speed is squared."
  },
  82: {
    questext: "The kinetic energy of a body of mass 2 kilograms moving at 3 metres per second is",
    options: ["6 joule", "9 joule", "18 joule", "3 joule"],
    correct: "2",
    exptext: "✅ Kinetic energy equals ½ × 2 × 3 × 3 = 9 joule. 📌 Half mass times speed squared. ❌ 18 comes from forgetting the half."
  },
  83: {
    type: "concept", icon: "⛰️", accent: "#ea580c", pauseTimer: true,
    title: "Potential Energy",
    html: `
      <p class="cp-lead">The energy that a body has because of its position or its shape (configuration) is called its <b>potential energy</b>. The gravitational potential energy of a body at height h is given by U = mgh.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/56.png" alt="A ball at the top of a tower labelled height h. A downward arrow labelled mg. A label besi" data-caption="A ball held at height h stores gravitational potential energy equal to m g h." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A stretched spring or a bent bow also stores potential energy because of its changed shape.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/57.png" alt="water stored in high mountain reservoir dam photo" data-caption="Water stored at a height holds potential energy that is later turned into electricity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">The higher a body is lifted, or the heavier it is, the more potential energy it stores.</div>
    `
  },
  84: {
    questext: "The gravitational potential energy of a body of mass m at a height h is given by",
    options: ["mgh", "½ mv²", "mg", "mv"],
    correct: "1",
    exptext: "✅ Potential energy at a height is mass times g times height. 📌 Say m, g, h. ❌ Half m v squared is kinetic energy."
  },
  85: {
    type: "concept", icon: "⚛️", accent: "#65a30d", pauseTimer: true,
    title: "Einstein's Mass-Energy Relation",
    html: `
      <p class="cp-lead">According to this relation, mass can be changed into energy, and energy into mass. When a mass Δm disappears, the energy produced is Δm times c squared, where c is the speed of light in vacuum.</p>
      <div class="cp-formula" translate="no"><small>Mass-energy relation</small>E = Δm × c²</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/58.png" alt="A tiny cube labelled small mass on the left. An arrow to the right to a huge flash labelle" data-caption="A very small mass changes into a very large amount of energy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">This is the basic idea behind the huge energy released in nuclear reactions.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/59.png" alt="Albert Einstein portrait photo" data-caption="Albert Einstein gave the famous relation that links mass and energy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">In this relation, c is the speed of light in vacuum, not the speed of sound.</div>
    `
  },
  86: {
    questext: "In Einstein's mass-energy relation E = Δm c², the symbol c stands for",
    options: ["the speed of sound", "the specific heat", "the speed of light in vacuum", "the charge of an electron"],
    correct: "3",
    exptext: "✅ In this relation c is the speed of light in vacuum. 📌 Light, not sound. ❌ The speed of sound is much smaller and plays no role here."
  },
  87: {
    type: "concept", icon: "♻️", accent: "#0891b2", pauseTimer: true,
    title: "Law of Conservation of Energy",
    html: `
      <p class="cp-lead">Energy can neither be created nor destroyed. It can only be changed from one form into another. <u>For conservative forces, the total mechanical energy at the start equals the total mechanical energy at the end.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/60.png" alt="A swinging pendulum. At the top of the swing a label potential energy maximum. At the bott" data-caption="In a swinging pendulum, potential and kinetic energy keep changing into each other." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Equipment</th><th>Energy transformed</th></tr></thead><tbody><tr><td>Dynamo</td><td>Mechanical energy into electrical energy</td></tr><tr><td>Candle</td><td>Chemical energy into light and heat energy</td></tr><tr><td>Microphone</td><td>Sound energy into electrical energy</td></tr><tr><td>Loudspeaker</td><td>Electrical energy into sound energy</td></tr><tr><td>Solar cell</td><td>Solar energy into electrical energy</td></tr><tr><td>Tube light</td><td>Electrical energy into light energy</td></tr><tr><td>Electric bulb</td><td>Electrical energy into light and heat energy</td></tr><tr><td>Battery</td><td>Chemical energy into electrical energy</td></tr><tr><td>Electric motor</td><td>Electrical energy into mechanical energy</td></tr><tr><td>Sitar</td><td>Mechanical energy into sound energy</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Motion_Force_and_Energy/61.png" alt="rooftop solar panels sunlight photo" data-caption="A solar cell changes the energy of sunlight into electrical energy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Microphone and loudspeaker do opposite jobs. A microphone changes sound into electricity, and a loudspeaker changes electricity into sound.</div>
      <div class="cp-mnemonic">Mic takes sound in, speaker puts sound out.</div>
    `
  },
  88: {
    questext: "A dynamo changes",
    options: ["electrical energy into mechanical energy", "chemical energy into electrical energy", "sound energy into electrical energy", "mechanical energy into electrical energy"],
    correct: "4",
    exptext: "✅ A dynamo is turned by a mechanical force and produces electricity. 📌 Dynamo makes electricity from motion. ❌ The first option describes an electric motor, which is the opposite."
  },
  89: {
    questext: "A microphone converts",
    options: ["electrical energy into sound energy", "sound energy into electrical energy", "light energy into electrical energy", "chemical energy into light energy"],
    correct: "2",
    exptext: "✅ A microphone takes sound and gives an electrical signal. 📌 Microphone means sound in. ❌ Electrical energy into sound is what a loudspeaker does."
  },
  90: {
    questext: "Consider the following statements:\n1. A solar cell converts solar energy into electrical energy.\n2. A loudspeaker converts sound energy into electrical energy.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 A speaker plays sound from an electrical signal. ❌ Statement 2 is wrong because a loudspeaker changes electrical energy into sound energy."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Physics/Motion_Force_and_Energy/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a polished steel pendulum balls row, a glowing rocket arc, and a thin gold-lined arrow showing force" },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/1.png": { t: "fig", about: "Two boxes side by side. Left box titled Fundamental quantities with Mass, Length, Time. Right box titled Derived quantities with Speed, Force, Acceleration. One arrow from left to right labelled built from." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"vernier caliper stopwatch weighing scale physics lab photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/2.png. A vernier caliper, a stopwatch and a weighing scale placed together.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/3.png": { t: "fig", about: "Seven round badges in a row, each with a quantity and its unit: Mass kg, Length m, Time s, Temperature K, Current A, Light cd, Substance mol." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"International Prototype Kilogram platinum iridium cylinder photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/4.png. The old metal cylinder that once defined the kilogram.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"car moving on straight highway road photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/5.png. A car travelling along a long straight road.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/6.png": { t: "fig", about: "Two number lines. Top line has equal jumps of 10 metres every second, labelled uniform motion. Bottom line has jumps of 5, 10 and 20 metres, labelled non-uniform motion." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"car speedometer dashboard close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/7.png. A car dashboard speedometer with the needle at a steady speed.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/8.png": { t: "fig", about: "Two road diagrams. Top road: two halves of 60 kilometres each at 40 and 60 kilometres per hour, answer 48. Bottom road: two hours, one at 40 and one at 60 kilometres per hour, answer 50." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/9.png": { t: "fig", about: "A start point A and an end point B. A curved path from A to B labelled distance 10 kilometres. A straight arrow from A to B labelled displacement 6 kilometres." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/10.png": { t: "fig", about: "A round track. A runner starts at point S, goes once around and returns to S. Labels: distance 400 metres, displacement 0, average velocity 0." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"car braking at red traffic light photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/11.png. A car slowing down with its brake lights glowing red at a signal.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/12.png": { t: "fig", about: "Three small panels. Panel 1: speed arrows growing longer, labelled positive. Panel 2: speed arrows shrinking, labelled negative or retardation. Panel 3: equal speed steps, labelled constant." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/13.png": { t: "fig", about: "A velocity against time graph: a straight line rising from u on the vertical axis to v at time t, with a shaded area under it labelled distance s." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/14.png": { t: "fig", about: "Three small graphs side by side: position against time as a curve, velocity against time as an inclined line, acceleration against time as a flat horizontal line." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"water jet fountain parabola arc photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/15.png. A fountain jet rising and falling in a smooth curved arc.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/16.png": { t: "fig", about: "Two balls at the same height. Left ball falls straight down, labelled dropped. Right ball follows a curve to the right, labelled thrown sideways. A dotted line at ground level shows both arrive together." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ferris wheel rotating at dusk photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/17.png. A large Ferris wheel with carriages moving along a circle.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/18.png": { t: "fig", about: "A circle with four points. At each point a short arrow along the tangent, labelled velocity. Another arrow at each point pointing to the centre, labelled acceleration." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/19.png": { t: "fig", about: "A circle with a body at three positions. At each position a short arrow points straight to the centre, labelled centripetal acceleration." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hammer throw athlete spinning before release photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/20.png. An athlete spinning with a heavy ball on a wire before the throw.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/21.png": { t: "fig", about: "A box on a floor with one arrow pushing it from the left labelled push, and another arrow pulling it from the right labelled pull." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tug of war evenly matched teams rope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/22.png. Two teams pulling a rope with equal strength, so the rope does not move.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/23.png": { t: "fig", about: "A ball on a string whirled in a circle. An arrow along the string toward the hand, labelled centripetal force. A dotted straight line from the ball along the tangent, labelled path if the string breaks." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"satellite orbiting earth artist view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/24.png. A satellite in orbit above the blue Earth.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/25.png": { t: "fig", about: "Top view of a car turning left with a passenger inside. A bold arrow toward the left centre of the turn labelled centripetal force. A dotted arrow pointing right labelled apparent centrifugal force." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"playground merry go round children spinning photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/26.png. Children holding on to a fast-spinning playground merry-go-round.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"cyclist leaning into a turn on road photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/27.png. A cyclist leaning inward while turning on a curved road.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"milk cream separator dairy centrifuge photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/28.png. A dairy machine spinning milk to separate the cream.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ice hockey puck gliding on ice rink photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/29.png. A hockey puck sliding smoothly across a smooth sheet of ice.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/30.png": { t: "fig", about: "Two panels. Left: a ball at rest with a label stays at rest. Right: a ball rolling with an arrow and label keeps moving in a straight line. Between them a label reads no push, no change." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/31.png": { t: "fig", about: "Two panels of a bus with passengers. Panel 1: bus starts, passengers lean backward. Panel 2: bus stops, passengers lean forward." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"man beating dusty carpet with stick photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/32.png. A person beating a hanging carpet with a stick, with dust flying out.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/33.png": { t: "fig", about: "A big truck and a small bicycle moving at the same speed. Under the truck a long bar labelled large momentum. Under the bicycle a short bar labelled small momentum." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"loaded truck moving on highway photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/34.png. A heavily loaded truck driving along a highway.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/35.png": { t: "fig", about: "A rocket drawn upright. A downward arrow from its tail labelled gas thrown backward. An upward arrow on the rocket labelled rocket moves forward." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rocket lift off launch pad flames photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/36.png. A rocket rising from the launch pad on a column of flame.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/37.png": { t: "fig", about: "Two carts pushed by the same arrow labelled same force. A light cart accelerates a lot, with a long arrow. A heavy cart accelerates a little, with a short arrow." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"pushing empty and loaded shopping trolley supermarket photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/38.png. A person pushing a shopping trolley loaded with groceries.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/39.png": { t: "fig", about: "A balloon with air rushing out of its mouth to the left, labelled action. The balloon moving to the right, labelled reaction." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"swimmer pushing water backward freestyle photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/40.png. A swimmer pulling the water behind with each stroke.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"cricket fielder catching ball pulling hands back photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/41.png. A cricket fielder drawing his hands back while taking a catch.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"railway wagon buffers between train coaches photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/42.png. Spring buffers between two railway wagons.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/43.png": { t: "fig", about: "Two surfaces magnified. Tiny bumps on the top surface locked into tiny bumps on the bottom surface. An arrow showing the push and an opposite arrow labelled friction." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"person pushing heavy box across floor photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/44.png. A person pushing a heavy box across a rough floor.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/45.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ball bearing steel balls inner outer ring close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/45.png. A steel ball bearing with its balls visible.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tyre tread pattern close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/46.png. The tread grooves of a vehicle tyre seen up close.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/47.png": { t: "fig", about: "A bicycle moving to the right. At the rear wheel an arrow pointing forward labelled friction forward. At the front wheel an arrow pointing backward labelled friction backward." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/48.png": { t: "fig", about: "Two identical blocks, one lying on its large face and one on its small face, on the same floor. Equal friction arrows on both. Label: same friction." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/49.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"machine oil lubricating gears close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/49.png. Oil being applied to metal gears of a machine.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/50.png": { t: "fig", about: "A person lifting a box of mass m up through height h, with a downward arrow mg and an upward displacement arrow h." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/51.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"porter carrying luggage on head railway platform photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/51.png. A porter walking on a level platform with luggage on his head.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/52.png": { t: "fig", about: "Two boxes. Left box: Energy, an arrow to the right labelled can do. Right box: Work, an arrow back to the left labelled can create." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/53.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hydroelectric dam water flowing spillway photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/53.png. Water rushing out of the gates of a large dam.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/54.png": { t: "fig", about: "Two bars. First bar: speed v, energy 1 unit. Second bar: speed 2v, energy 4 units. Label between: double the speed, four times the energy." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/55.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"speeding train on track motion blur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/55.png. A fast train rushing along its track.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/56.png": { t: "fig", about: "A ball at the top of a tower labelled height h. A downward arrow labelled mg. A label beside the ball labelled U equals m g h." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/57.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"water stored in high mountain reservoir dam photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/57.png. A large reservoir of water held high behind a dam wall.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/58.png": { t: "fig", about: "A tiny cube labelled small mass on the left. An arrow to the right to a huge flash labelled huge energy. A label above the arrow: multiplied by c squared." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/59.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Albert Einstein portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/59.png. A portrait of the scientist who gave the mass-energy relation.",
  "images/General_Awareness/Physics/Motion_Force_and_Energy/60.png": { t: "fig", about: "A swinging pendulum. At the top of the swing a label potential energy maximum. At the bottom a label kinetic energy maximum." },
  "images/General_Awareness/Physics/Motion_Force_and_Energy/61.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rooftop solar panels sunlight photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Motion_Force_and_Energy/61.png. Solar panels on a rooftop facing the sun."
});

/* CHANGE LOG
   - Average velocity is displacement divided by total time taken (the source line had the words reversed).
   - Unit symbols corrected to standard form: kilogram is kg and candela is cd.
   - Typing errors in the wording of the force definition and the statement about Newton's second law were silently corrected.
   - The formula for centripetal acceleration (v squared divided by r) and the explanation of work against gravity were added for completeness.
*/
