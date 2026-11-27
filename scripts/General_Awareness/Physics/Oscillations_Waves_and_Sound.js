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

/* Field: General_Awareness · Subject: Physics · Chapter: Oscillations_Waves_and_Sound · 21 concept pages (+ overview) · 42 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌊", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Oscillations, Waves and Sound",
    thumb: {
      image: "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/thumbnail.png",
      banner: "SSC CGL 2026",
      line1: "WAVES & SOUND",
      line2: "PENDULUM • ECHO",
      line3: "DOPPLER • SONAR",
      badge: "FULL CLASS",
      ribbon: "OSCILLATIONS • WAVES • SOUND",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Waves, Sound, Echo, Doppler Effect and SONAR | Physics for SSC CGL",
      altTitles: ["Simple Pendulum and SHM Tricks for SSC CGL", "Electromagnetic Waves and Discoverers in One Class"],
      description: "Waves and sound give easy marks in General Science. In this class we learn oscillations, waves and sound step by step, in simple words, with the facts that come again and again in exams.\n\n📌 IN THIS CLASS\n✅ Simple harmonic motion and the pendulum\n✅ Mechanical and electromagnetic waves\n✅ Echo, reverberation, Doppler effect and SONAR\n✅ Musical scale and the human ear\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Physics #Waves",
      tags: ["ssc cgl physics", "waves and sound", "simple pendulum", "simple harmonic motion", "doppler effect", "sonar full form", "echo and reverberation", "electromagnetic waves", "discoverers of em waves", "general science physics", "physics for competitive exams", "oscillations", "mechanical waves", "ultrasonic infrasonic", "human ear parts", "ssc cgl general science", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "Oscillations Waves and Sou"],
      hashtags: ["SSCCGL", "Physics", "Waves"],
      thumbText: "WAVES SOUND SONAR",
      pinnedComment: "📌 Try the questions and write your score in the comments 👇",
      communityPost: "🔊 New Physics class is live: Oscillations, Waves and Sound. Solve the questions and share your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "SSC CGL General Science — Physics Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on things that swing, waves that travel, and the sound we hear</u>. This chapter gives many direct questions in the General Science section.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>21</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>42</b><span>Questions</span></div>
        <div class="cp-stat"><b>~84 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Periodic and Oscillatory Motion</b><br>How repeating motions differ from to-and-fro motions, and what free and forced oscillations mean.</li>
        <li><b>Simple Harmonic Motion and the Simple Pendulum</b><br>What makes a motion simple harmonic, how energy changes along the swing, and what changes the time period of a pendulum.</li>
        <li><b>Damped and Resonant Oscillations</b><br>Why swings die down, and why a push at the right rhythm makes them grow.</li>
        <li><b>Waves and Their Types</b><br>Mechanical, longitudinal, transverse and electromagnetic waves, with the discoverers and properties to remember.</li>
        <li><b>Amplitude, Wavelength and Sound</b><br>How a wave is measured, the speed formula, and the three ranges of sound.</li>
        <li><b>Behaviour of Sound</b><br>Reflection, echo, reverberation, refraction and diffraction of sound.</li>
        <li><b>Music, Doppler's Effect, SONAR and the Ear</b><br>The musical scale, Dolby systems, how a moving source changes pitch, how SONAR finds the sea depth, and how the ear works.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on SONAR, echo, the Doppler effect, electromagnetic waves and pendulum clocks come again and again in the Staff Selection Commission exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🕰️", accent: "#22c55e", pauseTimer: true,
    title: "Periodic Motion",
    html: `
      <p class="cp-lead">A motion that repeats itself identically after a fixed interval of time is called a <b>periodic motion</b>. <u>The fixed interval is called the time period.</u></p>
      <table><thead><tr><th>Example</th><th>Why it is periodic</th></tr></thead><tbody><tr><td>Arms of a clock</td><td>They return to the same position again and again</td></tr><tr><td>Orbital motion of the Earth around the Sun</td><td>One full orbit repeats every year</td></tr><tr><td>Motion of a simple pendulum</td><td>It swings back to the same point after equal times</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/1.png" alt="analog wall clock minute hand close up photo" data-caption="Clock hands repeat the same positions after fixed times, so their motion is periodic." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/2.png" alt="A circle with the Sun at the centre and the Earth at four positions marked January, April," data-caption="The Earth returns to the same point on its orbit after a fixed time of one year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Periodic motion repeats after equal time, but it does not need to go to and fro. The Earth going round the Sun is periodic but not oscillatory.</div>
    `
  },
  3: {
    questext: "Which one of the following is an example of periodic motion?",
    options: ["A stone falling freely", "Orbital motion of the Earth around the Sun", "A bullet fired from a gun", "A ball rolling to a stop"],
    correct: "2",
    exptext: "✅ The Earth repeats its path round the Sun after a fixed time, so the motion is periodic. 📌 Repeats after equal time means periodic. ❌ A falling stone does not repeat."
  },
  4: {
    type: "concept", icon: "🎢", accent: "#f59e0b", pauseTimer: true,
    title: "Oscillatory Motion",
    html: `
      <p class="cp-lead">A periodic motion that takes place to and fro, or back and forth, about a fixed point is called <b>oscillatory motion</b>. For example, a simple pendulum and a loaded spring oscillate.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/3.png" alt="child on playground swing side view photo" data-caption="A swing moves to and fro about its lowest point, which is oscillatory motion." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Kind of oscillation</th><th>Meaning</th></tr></thead><tbody><tr><td>Free oscillation</td><td>A body oscillates with its own natural frequency, without the help of any external periodic force</td></tr><tr><td>Forced oscillation</td><td>A body oscillates with the help of an external periodic force whose frequency is different from the natural frequency of the body</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/4.png" alt="Two panels. Panel 1: a pendulum swinging alone, labelled free oscillation, own natural fre" data-caption="A free oscillation uses its own natural frequency, while a forced oscillation is driven from outside." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">All oscillatory motions are periodic, but not all periodic motions are oscillatory.</div>
    `
  },
  5: {
    questext: "A periodic motion taking place to and fro about a fixed point is called",
    options: ["rotational motion", "oscillatory motion", "projectile motion", "rectilinear motion"],
    correct: "2",
    exptext: "✅ To and fro motion about a fixed point is oscillatory motion. 📌 Think of a swing. ❌ Rotational motion is turning about an axis."
  },
  6: {
    questext: "When a body oscillates with the help of an external periodic force whose frequency is different from its natural frequency, the oscillation is called",
    options: ["free oscillation", "damped oscillation", "resonant oscillation", "forced oscillation"],
    correct: "4",
    exptext: "✅ An outside periodic force drives the body, so it is a forced oscillation. 📌 Forced means pushed from outside. ❌ Free oscillation has no outside force."
  },
  7: {
    type: "concept", icon: "🔩", accent: "#ef4444", pauseTimer: true,
    title: "Simple Harmonic Motion",
    html: `
      <p class="cp-lead">An oscillatory motion of constant amplitude and of a single frequency, under a restoring force whose size is proportional to the displacement and which always acts towards the mean position, is called <b>Simple Harmonic Motion</b> (SHM).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/5.png" alt="A block attached to a spring on a flat table. Three positions: left extreme, mean position" data-caption="The restoring force always points back to the mean position and grows with the displacement." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The farther the body is from the mean position, the stronger the force pulling it back. <u>This is why it keeps swinging with the same steady rhythm.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/6.png" alt="mass hanging on spring oscillating physics lab photo" data-caption="A loaded spring is a standard example of a body moving in simple harmonic motion." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">In simple harmonic motion the restoring force is proportional to the displacement, not to the speed.</div>
    `
  },
  8: {
    questext: "In simple harmonic motion, the restoring force is",
    options: ["constant", "proportional to the speed", "proportional to the displacement and directed towards the mean position", "zero at the extreme end"],
    correct: "3",
    exptext: "✅ The force grows with displacement and always points to the mean position. 📌 Pulled back harder when farther away. ❌ Zero at the extreme end is wrong because the force is largest there."
  },
  9: {
    type: "concept", icon: "📊", accent: "#8b5cf6", pauseTimer: true,
    title: "Characteristics of Simple Harmonic Motion",
    html: `
      <p class="cp-lead">The motion of a particle in simple harmonic motion looks different at the middle point and at the two ends. <u>Remember them as opposites.</u></p>
      <table><thead><tr><th>Quantity</th><th>At the mean position</th><th>At the extreme end</th></tr></thead><tbody><tr><td>Force on the particle</td><td>Zero</td><td>Restoring force is maximum</td></tr><tr><td>Acceleration</td><td>Zero</td><td>Maximum</td></tr><tr><td>Velocity</td><td>Maximum</td><td>Zero</td></tr><tr><td>Kinetic energy</td><td>Maximum</td><td>Zero</td></tr><tr><td>Potential energy</td><td>Zero</td><td>Maximum</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/7.png" alt="A swinging pendulum with three positions. At the centre, long arrow labelled maximum veloc" data-caption="A pendulum moves fastest at the centre and stops for an instant at each end." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/8.png" alt="newton's cradle steel balls swinging photo" data-caption="The swinging ball is fastest at the bottom and momentarily still at the top of its swing." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">At the mean position the acceleration is zero but the velocity is maximum. At the extreme end it is the other way round.</div>
      <div class="cp-mnemonic">Middle is Move, ends are Energy stored.</div>
    `
  },
  10: {
    questext: "When a particle executing simple harmonic motion passes through the mean position, its",
    options: ["kinetic energy is maximum", "acceleration is maximum", "potential energy is maximum", "velocity is zero"],
    correct: "1",
    exptext: "✅ At the mean position the speed is greatest, so the kinetic energy is greatest. 📌 Middle means fastest. ❌ Acceleration is maximum at the ends, not in the middle."
  },
  11: {
    questext: "Consider the following statements about a particle in simple harmonic motion at the extreme end:\n1. Its acceleration is maximum.\n2. Its velocity is maximum.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 At the extreme end the particle stops for a moment. ❌ Statement 2 is wrong because the velocity is zero there."
  },
  12: {
    type: "concept", icon: "⏳", accent: "#14b8a6", pauseTimer: true,
    title: "Simple Pendulum",
    html: `
      <p class="cp-lead">A heavy point mass hung from a rigid support by an elastic, inextensible string is called a <b>simple pendulum</b>.</p>
      <div class="cp-formula" translate="no"><small>Time period</small>T = 2π √(l ÷ g)</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/9.png" alt="A pendulum with string length l, a bob at the end, and a swing angle. Labels: length l, ti" data-caption="The time period depends on the length of the string and on the value of g." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Time period of a pendulum of infinite length</td><td>About 84.6 minutes</td></tr><tr><td>Second's pendulum</td><td>Time period 2 seconds, length nearly 100 centimetres</td></tr><tr><td>At greater height</td><td>g decreases, so the time period increases and a pendulum clock becomes slow</td></tr><tr><td>Metal wire heated</td><td>Length increases, so the time period also increases</td></tr><tr><td>Girl on a swing stands up</td><td>Effective length decreases, so the time period decreases</td></tr><tr><td>Space-ship</td><td>A pendulum clock cannot be used</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/10.png" alt="grandfather pendulum clock brass weight swinging photo" data-caption="A pendulum clock keeps time by the steady swing of its pendulum." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The time period does not depend on the mass of the bob. It depends on the length and on g.</div>
    `
  },
  13: {
    questext: "The time period of a second's pendulum is",
    options: ["1 second", "2 seconds", "4 seconds", "0.5 second"],
    correct: "2",
    exptext: "✅ A second's pendulum takes 2 seconds for one full swing, and its length is nearly one metre. 📌 One second each way. ❌ 1 second is only the time of one way."
  },
  14: {
    questext: "A pendulum clock is taken to the top of a high mountain. The clock will",
    options: ["run fast", "stop for ever", "run slow", "run correctly"],
    correct: "3",
    exptext: "✅ The value of g decreases with height, so the time period increases and the clock becomes slow. 📌 Less g means slower swing. ❌ Running fast would need a larger g."
  },
  15: {
    questext: "A girl is swinging on a swing. If she stands up on the swing, the time period of oscillation",
    options: ["increases", "stays the same", "becomes infinite", "decreases"],
    correct: "4",
    exptext: "✅ Standing raises her centre of mass, so the effective length decreases, and the time period decreases. 📌 Shorter pendulum, quicker swing. ❌ Increase would happen if the length grew."
  },
  16: {
    questext: "A pendulum clock cannot be used in a space-ship because",
    options: ["there is no effective gravity to drive the pendulum", "the clock becomes too heavy", "air is too dense", "the temperature is too low"],
    correct: "1",
    exptext: "✅ In a space-ship there is no effective gravity, so the pendulum does not swing. 📌 The pendulum needs g. ❌ Weight is not the issue; the missing gravity is."
  },
  17: {
    type: "concept", icon: "📉", accent: "#ec4899", pauseTimer: true,
    title: "Damped Harmonic Motion",
    html: `
      <p class="cp-lead">When there is friction, or any other force acting inside an oscillating system, the amplitude of the oscillation becomes smaller as time passes. This is called <b>damped harmonic motion</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/11.png" alt="A wave-like graph of displacement against time whose peaks get lower and lower, labelled a" data-caption="The swings of a damped oscillation get smaller and smaller until the motion stops." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A swing left alone slowly comes to rest, because air and friction take energy away from it.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/12.png" alt="playground swing slowing down stationary child photo" data-caption="Friction and air resistance slowly stop a swing that is left to move alone." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">In damped motion the frequency stays about the same, but the amplitude falls with time.</div>
    `
  },
  18: {
    questext: "The amplitude of an oscillating system decreases with time because of friction. This is called",
    options: ["forced oscillation", "resonant oscillation", "damped harmonic motion", "periodic motion"],
    correct: "3",
    exptext: "✅ Friction removes energy, so the swings get smaller, which is damping. 📌 Damp means weaken. ❌ Forced oscillation is driven from outside."
  },
  19: {
    type: "concept", icon: "📻", accent: "#3b82f6", pauseTimer: true,
    title: "Resonant Oscillations",
    html: `
      <p class="cp-lead">A body can oscillate with its own natural frequency, and an external periodic force can also push it. If the frequency of the outside push equals the natural frequency of the body, the oscillations become very large. These are called <b>resonant oscillations</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/13.png" alt="Two identical tuning forks side by side. The left one is struck with sound waves going tow" data-caption="A fork vibrates strongly when sound matching its own natural frequency reaches it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">This is why a child on a swing swings highest when pushed at just the right rhythm.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/14.png" alt="child pushed on swing at right moment photo" data-caption="Pushing in time with the swing builds up large oscillations, which is resonance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Resonance needs the outside frequency to be equal to the natural frequency. If the two are different, it is only forced oscillation.</div>
    `
  },
  20: {
    questext: "Resonance occurs when",
    options: ["the amplitude is zero", "the frequency of the external force equals the natural frequency of the body", "there is no external force", "friction is large"],
    correct: "2",
    exptext: "✅ When the outside frequency matches the natural frequency, the amplitude builds up. 📌 Match gives resonance. ❌ Large friction causes damping, not resonance."
  },
  21: {
    type: "concept", icon: "🌊", accent: "#f97316", pauseTimer: true,
    title: "Wave",
    html: `
      <p class="cp-lead">A wave is a disturbance that carries energy from one place to another <u>without carrying matter</u> with it.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/15.png" alt="ripples spreading on calm pond water photo" data-caption="Ripples carry energy outward, while the water itself only moves up and down." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Type of wave</th><th>Meaning</th></tr></thead><tbody><tr><td>Mechanical wave</td><td>Needs a material medium (solid, liquid or gas)</td></tr><tr><td>Non-mechanical wave</td><td>Does not need a medium</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/16.png" alt="A floating cork on water. Wave crests move to the right as arrows, while the cork only bob" data-caption="The wave moves forward, but each water particle only moves up and down about its own place." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">In a wave, energy travels but matter does not travel along with it.</div>
    `
  },
  22: {
    questext: "A wave is a disturbance that transfers",
    options: ["matter without energy", "both matter and energy", "charge only", "energy from one place to another without transporting matter"],
    correct: "4",
    exptext: "✅ A wave carries energy while the particles of the medium only vibrate about their places. 📌 Energy moves, matter stays. ❌ Transferring matter is what a flowing river does, not a wave."
  },
  23: {
    type: "concept", icon: "🎸", accent: "#84cc16", pauseTimer: true,
    title: "Mechanical Wave",
    html: `
      <p class="cp-lead">Waves that need a material medium (solid, liquid or gas) for their travel are called <b>mechanical waves</b>, or elastic waves. They are of two types: longitudinal waves and transverse waves.</p>
      <table><thead><tr><th>Type</th><th>How the particles vibrate</th><th>Example</th></tr></thead><tbody><tr><td>Longitudinal wave</td><td>Along the direction in which the wave travels</td><td>Sound waves</td></tr><tr><td>Transverse wave</td><td>At right angles to the direction in which the wave travels</td><td>Waves on strings under tension, waves on the surface of water</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/17.png" alt="Two rows. Top row: a coil spring with squeezed and stretched parts, arrow showing wave dir" data-caption="In a longitudinal wave particles move along the wave, and in a transverse wave they move across it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/18.png" alt="guitar string vibrating close up photo" data-caption="A plucked string carries a transverse wave along its length." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Sound is a longitudinal wave, even though a sketch of it often looks like a transverse wave.</div>
    `
  },
  24: {
    questext: "If the particles of the medium vibrate in the direction of propagation of the wave, the wave is called",
    options: ["a longitudinal wave", "a transverse wave", "an electromagnetic wave", "a stationary wave"],
    correct: "1",
    exptext: "✅ Vibration along the direction of travel makes the wave longitudinal. 📌 Longitudinal means along. ❌ A transverse wave vibrates at right angles to the direction of travel."
  },
  25: {
    questext: "Which one of the following is an example of a transverse wave?",
    options: ["Sound waves in air", "Compression waves in a spring", "Waves on the surface of water", "Ultrasonic waves"],
    correct: "3",
    exptext: "✅ Water surface waves move particles up and down across the direction of travel. 📌 Water ripples are transverse. ❌ Sound and ultrasonic waves are longitudinal."
  },
  26: {
    type: "concept", icon: "💡", accent: "#06b6d4", pauseTimer: true,
    title: "Non-mechanical Waves",
    html: `
      <p class="cp-lead">Waves that do not need a medium for their travel, which can even pass through a vacuum, are called <b>non-mechanical waves</b>, or electromagnetic waves. Light and heat are examples. <u>All electromagnetic waves are non-mechanical.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/19.png" alt="The Sun on the left, the Earth on the right, and an empty space between them with dotted w" data-caption="Light reaches us from the Sun across empty space, so it needs no medium." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">All electromagnetic waves are made of photons. Their wavelength range is from 10⁻¹⁴ metre to 10⁴ metre.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/20.png" alt="sunlight rays shining through clouds photo" data-caption="Sunlight is an electromagnetic wave that comes to us through empty space." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Light does not need a medium, but sound does. This is why we see the Sun but cannot hear any sound from space.</div>
    `
  },
  27: {
    questext: "Which of the following waves can travel through a vacuum?",
    options: ["Sound waves", "Light waves", "Waves on a string", "Water waves"],
    correct: "2",
    exptext: "✅ Light is an electromagnetic wave and needs no medium. 📌 Electromagnetic means no medium. ❌ Sound, string and water waves all need a medium."
  },
  28: {
    type: "concept", icon: "⚡", accent: "#a855f7", pauseTimer: true,
    title: "Properties of Electromagnetic Waves",
    html: `
      <p class="cp-lead">Electromagnetic waves are neutral (they carry no charge). They travel as transverse waves with the speed of light, and they carry energy and momentum. Their concept was introduced by <b>Maxwell</b>.</p>
      <table><thead><tr><th>Electromagnetic wave</th><th>Discoverer</th></tr></thead><tbody><tr><td>Gamma rays</td><td>Henri Becquerel</td></tr><tr><td>X-rays</td><td>Wilhelm Röntgen</td></tr><tr><td>Ultraviolet rays</td><td>Johann Ritter</td></tr><tr><td>Visible light</td><td>Newton</td></tr><tr><td>Infrared rays</td><td>William Herschel</td></tr><tr><td>Short radio waves (Hertzian waves)</td><td>Heinrich Hertz</td></tr><tr><td>Long radio waves</td><td>Guglielmo Marconi</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/21.png" alt="A horizontal bar of the spectrum from short wavelength on the left to long wavelength on t" data-caption="The electromagnetic spectrum runs from short gamma rays to long radio waves." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">These rays are not electromagnetic waves: cathode rays, canal rays, alpha rays, beta rays, sound waves and ultrasonic waves. Electromagnetic waves with wavelength about 10⁻³ metre to 10⁻² metre are called microwaves.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/22.png" alt="Wilhelm Röntgen X-ray hand photograph first X-ray image" data-caption="Röntgen discovered X-rays and took this early picture of a hand." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Alpha rays and beta rays are streams of particles, and cathode rays are streams of electrons. They are not electromagnetic waves.</div>
      <div class="cp-mnemonic">Not electromagnetic: Cathode, Canal, Alpha, Beta, Sound, Ultrasonic.</div>
    `
  },
  29: {
    questext: "X-rays were discovered by",
    options: ["Henri Becquerel", "Johann Ritter", "Heinrich Hertz", "Wilhelm Röntgen"],
    correct: "4",
    exptext: "✅ Wilhelm Röntgen discovered X-rays. 📌 Röntgen means X-rays. ❌ Becquerel is linked with gamma rays and Ritter with ultraviolet rays."
  },
  30: {
    questext: "Which of the following is NOT an electromagnetic wave?",
    options: ["Cathode rays", "Infrared rays", "Ultraviolet rays", "Gamma rays"],
    correct: "1",
    exptext: "✅ Cathode rays are a stream of electrons and are not electromagnetic waves. 📌 Streams of particles are not waves. ❌ Infrared, ultraviolet and gamma rays are all electromagnetic."
  },
  31: {
    questext: "The concept of electromagnetic waves was introduced by",
    options: ["Hertz", "Marconi", "Maxwell", "Newton"],
    correct: "3",
    exptext: "✅ James Clerk Maxwell introduced the idea of electromagnetic waves. 📌 M for Maxwell and for Magnetism. ❌ Hertz produced radio waves, but the concept came from Maxwell."
  },
  32: {
    questext: "Consider the following statements about electromagnetic waves:\n1. They carry electric charge.\n2. They travel as transverse waves.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Electromagnetic waves are neutral. ❌ Statement 1 is wrong because these waves carry no charge."
  },
  33: {
    type: "concept", icon: "📏", accent: "#e11d48", pauseTimer: true,
    title: "Amplitude and Wavelength",
    html: `
      <p class="cp-lead"><b>Amplitude</b> is the greatest displacement of a vibrating particle on either side of its mean position. <b>Wavelength</b> is the distance between two nearest particles of the medium that vibrate in the same phase. It is written with the Greek letter lambda (λ).</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/23.png" alt="A transverse wave drawn on axes. Double arrow from the middle line to a crest labelled amp" data-caption="Amplitude is measured from the middle line, and wavelength from crest to crest." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Wave</th><th>How wavelength is measured</th></tr></thead><tbody><tr><td>Transverse wave</td><td>Distance between two consecutive crests or two consecutive troughs</td></tr><tr><td>Longitudinal wave</td><td>Distance between two consecutive compressions or two consecutive rarefactions</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Wave speed</small>Velocity of wave = Frequency × Wavelength</div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/24.png" alt="slinky spring compression wave demonstration photo" data-caption="In a spring wave, the distance between two squeezed regions is one wavelength." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">For example, a wave of frequency 50 hertz and wavelength 2 metres has a speed of 50 × 2 = 100 metres per second.</div>
    `
  },
  34: {
    questext: "The velocity of a wave is equal to",
    options: ["frequency × wavelength", "frequency ÷ wavelength", "wavelength ÷ amplitude", "frequency + wavelength"],
    correct: "1",
    exptext: "✅ Wave speed equals frequency multiplied by wavelength. 📌 Speed is f times lambda. ❌ Dividing frequency by wavelength gives the wrong unit."
  },
  35: {
    questext: "A wave has a frequency of 50 hertz and a wavelength of 2 metres. Its speed is",
    options: ["25 metres per second", "52 metres per second", "48 metres per second", "100 metres per second"],
    correct: "4",
    exptext: "✅ Speed equals frequency times wavelength, that is 50 × 2 = 100 metres per second. 📌 Multiply the two. ❌ 25 comes from dividing, which is wrong."
  },
  36: {
    questext: "In a longitudinal wave, the wavelength is the distance between",
    options: ["two consecutive crests", "two consecutive compressions", "a compression and the next rarefaction", "two consecutive troughs"],
    correct: "2",
    exptext: "✅ In a longitudinal wave, two consecutive compressions (or two consecutive rarefactions) are one wavelength apart. 📌 Crests and troughs belong to transverse waves. ❌ A compression and the next rarefaction are only half a wavelength apart."
  },
  37: {
    type: "concept", icon: "🔊", accent: "#10b981", pauseTimer: true,
    title: "Sound",
    html: `
      <p class="cp-lead">Sound waves are mechanical longitudinal waves. They need a medium for their travel, and they <u>cannot pass through a vacuum</u>. When sound moves from one medium to another, its speed and wavelength change, but its frequency stays constant.</p>
      <table><thead><tr><th>Type of sound wave</th><th>Frequency range</th></tr></thead><tbody><tr><td>Infrasonic waves</td><td>0 to 20 hertz</td></tr><tr><td>Audible waves</td><td>20 to 20,000 hertz</td></tr><tr><td>Ultrasonic waves</td><td>Above 20,000 hertz</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/25.png" alt="A number line of frequency in hertz with three coloured bands: infrasonic below 20, audibl" data-caption="Human ears hear only the middle band, from 20 to 20,000 hertz." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/26.png" alt="astronaut spacewalk silence space photo" data-caption="In the vacuum of space there is no medium, so sound cannot travel." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Frequency stays the same when sound changes medium. Only its speed and wavelength change.</div>
    `
  },
  38: {
    questext: "Sound cannot travel through",
    options: ["steel", "water", "a vacuum", "air"],
    correct: "3",
    exptext: "✅ Sound needs a material medium, and a vacuum has none. 📌 No medium, no sound. ❌ Steel, water and air are all media for sound."
  },
  39: {
    questext: "Sound waves with a frequency above 20,000 hertz are called",
    options: ["ultrasonic waves", "audible waves", "infrasonic waves", "radio waves"],
    correct: "1",
    exptext: "✅ Waves above 20,000 hertz are ultrasonic. 📌 Ultra means beyond. ❌ Infrasonic waves are below 20 hertz."
  },
  40: {
    questext: "Consider the following statements about sound:\n1. Sound waves are transverse waves.\n2. Sound waves need a medium for their propagation.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Sound is longitudinal and needs a medium. ❌ Statement 1 is wrong because sound waves are longitudinal."
  },
  41: {
    type: "concept", icon: "📣", accent: "#eab308", pauseTimer: true,
    title: "Reflection of Sound",
    html: `
      <p class="cp-lead">The bouncing back of sound when it strikes a hard surface is called <b>reflection of sound</b>. The laws of reflection of light are also obeyed here. A megaphone, sound boards and an ear trumpet all work on the reflection of sound.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/27.png" alt="person shouting in mountain valley echo photo" data-caption="A shout that bounces back from a distant hillside is heard again as an echo." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Echo</td><td>The repetition of sound due to reflection</td></tr><tr><td>Persistence of hearing</td><td>About one tenth of a second</td></tr><tr><td>Minimum distance for an echo</td><td>About 17 metres</td></tr><tr><td>Reverberation</td><td>Sound lingering because of many reflections</td></tr><tr><td>Reverberation time</td><td>Time taken for the intensity to fall by a factor of 10⁶</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/28.png" alt="A person on the left, a wall on the right 17 metres away. A line going to the wall and bac" data-caption="For an echo, sound must travel to the wall and back within about one tenth of a second." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Sound-proof rooms are made of two layers of walls with a vacuum between them. When an auditorium is designed, care must be taken of the absorption and reflection of sound.</p>
      <div class="cp-note trap">Reverberation and echo are different. An echo is one clear repeat, while reverberation is many overlapping reflections.</div>
    `
  },
  42: {
    questext: "The minimum distance from a sound-reflecting surface needed to hear an echo is nearly",
    options: ["8 metres", "34 metres", "17 metres", "100 metres"],
    correct: "3",
    exptext: "✅ Sound needs one tenth of a second to go and return, so about 34 metres of travel, which is 17 metres each way. 📌 Half of 34. ❌ 34 metres is the total path, not the distance to the wall."
  },
  43: {
    questext: "The repetition of sound due to its reflection is called",
    options: ["reverberation", "refraction", "diffraction", "an echo"],
    correct: "4",
    exptext: "✅ A distinct repeated sound heard after reflection is an echo. 📌 One clear repeat means echo. ❌ Reverberation is a prolonged sound from many reflections."
  },
  44: {
    questext: "Reverberation of sound arises due to",
    options: ["multiple reflection of sound", "refraction of sound", "diffraction of sound", "absorption of sound"],
    correct: "1",
    exptext: "✅ Many reflections overlap and make the sound linger. 📌 Many reflections mean reverberation. ❌ Absorption reduces the sound instead of prolonging it."
  },
  45: {
    questext: "The time taken by reverberant sound to decrease its intensity by a factor of 10⁶ is called",
    options: ["echo time", "reverberation time", "time period", "persistence time"],
    correct: "2",
    exptext: "✅ This is the definition of reverberation time. 📌 Reverberation time measures how long sound lingers. ❌ The time period belongs to vibrations, not to room sound."
  },
  46: {
    type: "concept", icon: "🌫️", accent: "#0ea5e9", pauseTimer: true,
    title: "Refraction of Sound",
    html: `
      <p class="cp-lead">When a sound wave passes from one mechanical medium to another, it bends from its original path. This is called <b>refraction of sound</b>. <u>It happens because the speed of sound is different in different media.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/29.png" alt="A boundary line between air on top and water below. A sound ray arrives from the top-left," data-caption="A sound ray changes direction at the boundary between two media." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/30.png" alt="Three horizontal bars of different lengths for the speed of sound: air shortest, water lon" data-caption="Sound travels slowest in air, faster in water and fastest in steel." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Refraction happens because of the change in speed between the media, not because of the loudness of the sound.</div>
    `
  },
  47: {
    questext: "Refraction of sound takes place because",
    options: ["the sound becomes louder", "the frequency changes", "the speed of sound is different in different media", "the medium is moving"],
    correct: "3",
    exptext: "✅ A change in the speed of sound at the boundary of two media makes the wave bend. 📌 Different speed means bending. ❌ The frequency stays the same."
  },
  48: {
    type: "concept", icon: "🚪", accent: "#d946ef", pauseTimer: true,
    title: "Diffraction of Sound",
    html: `
      <p class="cp-lead">When sound waves from a vibrating source spread through a uniform medium, they bend around the edges of obstacles or openings. This bending is called <b>diffraction</b>. <u>Because sound waves bend broadly, we can hear a person even when we cannot see them.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/31.png" alt="A wall with a doorway. Sound waves arrive from the left as arcs, pass through the door and" data-caption="Sound spreads out after passing through an opening, so it reaches places that are out of sight." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/32.png" alt="ocean waves bending around harbour breakwater gap photo" data-caption="Waves spread out after a narrow gap in the same way that sound spreads after a doorway." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Diffraction is bending around edges. Do not mix it with refraction, which is bending at the boundary between two media.</div>
    `
  },
  49: {
    questext: "Bending of sound waves around the edges of an obstacle is called",
    options: ["reflection", "refraction", "reverberation", "diffraction"],
    correct: "4",
    exptext: "✅ Spreading of waves around edges is diffraction. 📌 Diffraction means around the corner. ❌ Refraction is the bending that comes from a change of medium."
  },
  50: {
    type: "concept", icon: "🎹", accent: "#64748b", pauseTimer: true,
    title: "Musical Scale",
    html: `
      <p class="cp-lead">In the theory of music, a musical scale is a set of musical notes whose frequencies are in simple ratios to one another. Sa, re, ga, ma, pa, dha, ni is one such scale, called the <b>diatonic scale</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/33.png" alt="A ladder of eight steps labelled Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa. A bracket on the side fr" data-caption="The interval between the first Sa and the next Sa is called an octave." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The interval from one Sa to the next Sa is called an <b>octave</b>, which means eight.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/34.png" alt="harmonium keyboard black and white keys close up photo" data-caption="Keys on a keyboard instrument give the notes of a musical scale." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The word octave means eight, and the notes Sa to Sa include eight steps.</div>
    `
  },
  51: {
    questext: "The interval from one Sa to the next Sa in a musical scale is called",
    options: ["a pitch", "a beat", "an octave", "a decibel"],
    correct: "3",
    exptext: "✅ The interval between two notes with the same name, one above the other, is an octave. 📌 Octave means eight. ❌ A beat is the throb heard when two close sounds mix."
  },
  52: {
    type: "concept", icon: "📼", accent: "#fb7185", pauseTimer: true,
    title: "Noise Reduction in Recording Media",
    html: `
      <p class="cp-lead">Five types of noise reduction system are used in recording media. Each one removes some amount of hiss from a recording.</p>
      <table><thead><tr><th>System</th><th>Noise reduction and use</th></tr></thead><tbody><tr><td>Dolby A</td><td>About 10 decibel, for professional recording studios</td></tr><tr><td>Dolby B</td><td>About 9 decibel, mainly for cassettes, simple and cheap</td></tr><tr><td>Dolby C</td><td>About 15 decibel</td></tr><tr><td>Dolby SR (Spectral Recording)</td><td>Up to 25 decibel at high frequencies, most aggressive and most expensive</td></tr><tr><td>Dolby S</td><td>About 10 decibel at low frequencies and up to 24 decibel at high frequencies, on some Hi-Fi and semi-professional equipment</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/35.png" alt="A bar chart with bars for Dolby A 10, Dolby B 9, Dolby C 15, Dolby SR 25 decibel, with the" data-caption="Dolby SR gives the strongest noise reduction among the systems." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/36.png" alt="audio cassette tape player close up photo" data-caption="Dolby B was developed mainly for noise reduction in cassette recordings." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Dolby B is the simpler and cheaper system for cassettes. Dolby SR is the strongest and the most expensive.</div>
    `
  },
  53: {
    questext: "Which Dolby system is the most aggressive noise reduction system, giving up to 25 decibel reduction?",
    options: ["Dolby A", "Dolby B", "Dolby C", "Dolby SR"],
    correct: "4",
    exptext: "✅ Dolby SR is the most aggressive and the most expensive, giving up to 25 decibel at high frequencies. 📌 SR means super strong. ❌ Dolby B and Dolby C give far less reduction."
  },
  54: {
    questext: "Dolby B noise reduction system was developed mainly for",
    options: ["professional studios", "radio broadcasts", "cassettes", "cinema halls"],
    correct: "3",
    exptext: "✅ Dolby B was developed for cassettes, and it was simple and cheap for consumers. 📌 B for cassette tapes. ❌ Dolby A was meant for professional recording studios."
  },
  55: {
    type: "concept", icon: "🚓", accent: "#2dd4bf", pauseTimer: true,
    title: "Doppler's Effect",
    html: `
      <p class="cp-lead">The apparent change in the frequency of a source because of the relative motion between the source and the observer is called <b>Doppler's effect</b>. <u>A siren sounds higher as it comes near and lower as it goes away.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/37.png" alt="An ambulance in the middle with a siren. In front of it waves drawn close together labelle" data-caption="Waves bunch up in front of a moving source and spread out behind it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Use of Doppler shift</th><th>Where it is used</th></tr></thead><tbody><tr><td>Police</td><td>To check overspeeding of vehicles</td></tr><tr><td>Airports</td><td>To guide aircraft</td></tr><tr><td>Medicine</td><td>To study heart and blood flow in different parts of the body</td></tr><tr><td>Astrophysics</td><td>To measure the velocities of planets and stars</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/38.png" alt="police radar speed gun measuring vehicle photo" data-caption="A radar gun uses the Doppler shift to find the speed of a passing vehicle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/39.png" alt="weather Doppler radar dome tower photo" data-caption="Weather and airport radars use the Doppler effect to track moving objects." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The real frequency of the source does not change. Only the frequency that the observer hears appears to change.</div>
    `
  },
  56: {
    questext: "The apparent change in the frequency of a source due to the relative motion between the source and the observer is called",
    options: ["the resonance effect", "the echo effect", "the Tyndall effect", "Doppler's effect"],
    correct: "4",
    exptext: "✅ This is the definition of Doppler's effect. 📌 Moving source means a changed pitch. ❌ Resonance needs matching frequencies and has nothing to do with motion."
  },
  57: {
    questext: "Doppler's effect is used by the police to",
    options: ["detect overspeeding of vehicles", "find stolen goods", "detect sound", "measure temperature"],
    correct: "1",
    exptext: "✅ A radar gun measures the Doppler shift of waves reflected from a moving vehicle, which gives the speed. 📌 Radar gun means Doppler. ❌ Temperature measurement uses other methods."
  },
  58: {
    questext: "Consider the following statements about applications of Doppler's effect:\n1. It is used to study heart and blood flow in different parts of the body.\n2. It is used by astrophysicists to measure the velocities of planets and stars.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Doppler measures motion, from blood to stars. ❌ Saying only one is correct overlooks that the shift works for both."
  },
  59: {
    type: "concept", icon: "🚢", accent: "#c026d3", pauseTimer: true,
    title: "SONAR",
    html: `
      <p class="cp-lead">SONAR stands for <b>Sound Navigation And Ranging</b>. It is used to measure the depth of the sea and to locate enemy submarines and shipwrecks.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/40.png" alt="A ship on the water surface sending a downward wave pulse to the sea bottom and a reflecte" data-caption="A pulse goes down, bounces back from the sea floor, and the time of return gives the depth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The transmitter of a sonar produces pulses of ultrasonic sound waves with a frequency of about 50,000 hertz. The reflected waves are received by the receiver.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/41.png" alt="ship sonar display screen seabed echo photo" data-caption="A sonar screen turns returning echoes into a picture of the sea floor." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Sonar uses ultrasonic sound, not radio waves. Radio waves do not travel well underwater.</div>
    `
  },
  60: {
    questext: "SONAR stands for",
    options: ["Sound Navigation And Ranging", "Sea Navigation And Ranging", "Sound Network And Radar", "Signal Navigation And Radio"],
    correct: "1",
    exptext: "✅ SONAR means Sound Navigation And Ranging. 📌 It uses sound. ❌ Sea Navigation is a tempting guess, but the first word is sound."
  },
  61: {
    questext: "SONAR works on the principle of",
    options: ["reflection of ultrasonic waves", "refraction of light", "the Doppler effect of light", "diffraction of radio waves"],
    correct: "1",
    exptext: "✅ A sonar sends ultrasonic pulses and times the echo. 📌 Send a pulse, hear the echo. ❌ Radio waves and light are not used."
  },
  62: {
    type: "concept", icon: "👂", accent: "#16a34a", pauseTimer: true,
    title: "Human Ear",
    html: `
      <p class="cp-lead">We hear with the help of an extremely sensitive organ called the ear. The ear has three parts: the outer ear, the middle ear and the inner ear.</p>
      <table><thead><tr><th>Part</th><th>Work</th></tr></thead><tbody><tr><td>Outer ear (pinna)</td><td>Collects sound from the surroundings</td></tr><tr><td>Middle ear</td><td>Transmits the amplified pressure variations of the sound wave to the inner ear</td></tr><tr><td>Inner ear</td><td>The cochlea turns pressure variations into electrical signals, which go to the brain through the auditory nerve</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/42.png" alt="A simple cross-section of the ear. Left to right: pinna, ear canal, middle ear, cochlea, a" data-caption="Sound enters through the pinna and ends as electrical signals travelling to the brain." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Physics/Oscillations_Waves_and_Sound/43.png" alt="human ear anatomy cross section diagram photo" data-caption="The three parts of the human ear, from the outer ear to the cochlea." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The pinna is the outer ear, and the cochlea is in the inner ear. Do not swap them.</div>
    `
  },
  63: {
    questext: "The outer ear, which collects sound from the surroundings, is called",
    options: ["cochlea", "pinna", "eardrum", "auditory nerve"],
    correct: "2",
    exptext: "✅ The outer ear is called the pinna and collects sound. 📌 Pinna is the part you can see. ❌ The cochlea is in the inner ear."
  },
  64: {
    questext: "In the inner ear, the pressure variations are turned into electrical signals by",
    options: ["the pinna", "the eardrum", "the auditory nerve", "the cochlea"],
    correct: "4",
    exptext: "✅ The cochlea turns pressure variations into electrical signals, and the auditory nerve carries them to the brain. 📌 Cochlea converts. ❌ The auditory nerve only carries the signals."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a brass pendulum, concentric glowing sound ripples, and a thin gold-lined sine wave" },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"analog wall clock minute hand close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/1.png. The hands of a clock moving round the dial.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/2.png": { t: "fig", about: "A circle with the Sun at the centre and the Earth at four positions marked January, April, July, October, with an arrow showing it returns to January after one year." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"child on playground swing side view photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/3.png. A child swinging back and forth on a playground swing.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/4.png": { t: "fig", about: "Two panels. Panel 1: a pendulum swinging alone, labelled free oscillation, own natural frequency. Panel 2: a pendulum with a hand pushing it regularly, labelled forced oscillation, outside push." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/5.png": { t: "fig", about: "A block attached to a spring on a flat table. Three positions: left extreme, mean position in the centre, right extreme. At each extreme an arrow pointing back to the centre labelled restoring force." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"mass hanging on spring oscillating physics lab photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/6.png. A weight hanging from a coil spring in a laboratory.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/7.png": { t: "fig", about: "A swinging pendulum with three positions. At the centre, long arrow labelled maximum velocity and a label kinetic energy maximum. At the left and right ends, labels velocity zero and potential energy maximum." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"newton's cradle steel balls swinging photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/8.png. A row of steel balls swinging back and forth.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/9.png": { t: "fig", about: "A pendulum with string length l, a bob at the end, and a swing angle. Labels: length l, time period T, g acts downward." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"grandfather pendulum clock brass weight swinging photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/10.png. A tall pendulum clock with its brass pendulum visible.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/11.png": { t: "fig", about: "A wave-like graph of displacement against time whose peaks get lower and lower, labelled amplitude decreases with time." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"playground swing slowing down stationary child photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/12.png. An empty swing hanging still after swinging for a while.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/13.png": { t: "fig", about: "Two identical tuning forks side by side. The left one is struck with sound waves going toward the right one, labelled same natural frequency. The right fork vibrates strongly, labelled resonance." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"child pushed on swing at right moment photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/14.png. A parent pushing a child on a swing in time with its motion.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ripples spreading on calm pond water photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/15.png. Circular ripples spreading across the surface of a pond.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/16.png": { t: "fig", about: "A floating cork on water. Wave crests move to the right as arrows, while the cork only bobs up and down in place, labelled cork stays, energy moves." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/17.png": { t: "fig", about: "Two rows. Top row: a coil spring with squeezed and stretched parts, arrow showing wave direction and particle motion along it, labelled longitudinal. Bottom row: a rope shaped like a wave with up-and-down particle arrows and a sideways wave arrow, labelled transverse." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"guitar string vibrating close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/18.png. A guitar string vibrating after being plucked.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/19.png": { t: "fig", about: "The Sun on the left, the Earth on the right, and an empty space between them with dotted wave lines, labelled light travels through empty space." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sunlight rays shining through clouds photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/20.png. Sunbeams streaming down through gaps in the clouds.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/21.png": { t: "fig", about: "A horizontal bar of the spectrum from short wavelength on the left to long wavelength on the right with labels: gamma rays, X-rays, ultraviolet, visible, infrared, microwaves, radio waves." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Wilhelm Röntgen X-ray hand photograph first X-ray image\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/22.png. The very first X-ray photograph of a human hand.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/23.png": { t: "fig", about: "A transverse wave drawn on axes. Double arrow from the middle line to a crest labelled amplitude. Double arrow from one crest to the next crest labelled wavelength." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"slinky spring compression wave demonstration photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/24.png. A coiled spring showing squeezed and stretched regions along it.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/25.png": { t: "fig", about: "A number line of frequency in hertz with three coloured bands: infrasonic below 20, audible from 20 to 20,000 with an ear icon, ultrasonic above 20,000." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"astronaut spacewalk silence space photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/26.png. An astronaut floating in space outside a spacecraft.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"person shouting in mountain valley echo photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/27.png. A person calling out in a wide mountain valley.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/28.png": { t: "fig", about: "A person on the left, a wall on the right 17 metres away. A line going to the wall and back, labelled sound goes 17 metres and returns, total 34 metres in about one tenth of a second." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/29.png": { t: "fig", about: "A boundary line between air on top and water below. A sound ray arrives from the top-left, bends at the boundary, and continues in water at a different angle. Labels: air, water, bends." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/30.png": { t: "fig", about: "Three horizontal bars of different lengths for the speed of sound: air shortest, water longer, steel longest. Labels: air, water, steel." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/31.png": { t: "fig", about: "A wall with a doorway. Sound waves arrive from the left as arcs, pass through the door and spread as curved arcs on the right side, reaching a person standing behind the wall." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ocean waves bending around harbour breakwater gap photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/32.png. Waves passing through a gap in a stone breakwater and spreading out behind it.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/33.png": { t: "fig", about: "A ladder of eight steps labelled Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa. A bracket on the side from the first Sa to the last Sa, labelled octave." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"harmonium keyboard black and white keys close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/34.png. The black and white keys of a harmonium keyboard.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/35.png": { t: "fig", about: "A bar chart with bars for Dolby A 10, Dolby B 9, Dolby C 15, Dolby SR 25 decibel, with the tallest bar for Dolby SR." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"audio cassette tape player close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/36.png. An old audio cassette inside a tape player.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/37.png": { t: "fig", about: "An ambulance in the middle with a siren. In front of it waves drawn close together labelled higher frequency. Behind it waves drawn far apart labelled lower frequency." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"police radar speed gun measuring vehicle photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/38.png. A police officer pointing a radar speed gun at traffic.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"weather Doppler radar dome tower photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/39.png. A large white dome of a weather radar on a tower.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/40.png": { t: "fig", about: "A ship on the water surface sending a downward wave pulse to the sea bottom and a reflected pulse back up. Labels: transmitter, receiver, ultrasonic pulse, echo." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ship sonar display screen seabed echo photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/41.png. A ship's screen showing echoes from the sea floor.",
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/42.png": { t: "fig", about: "A simple cross-section of the ear. Left to right: pinna, ear canal, middle ear, cochlea, auditory nerve, brain. Arrows show sound travelling inward." },
  "images/General_Awareness/Physics/Oscillations_Waves_and_Sound/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human ear anatomy cross section diagram photo\". Download a clear, suitable photo and save it as images/General_Awareness/Physics/Oscillations_Waves_and_Sound/43.png. A labelled cross-section of the human ear."
});

/* CHANGE LOG
   - Infrasonic waves are 0 to 20 hertz (the source line gave 0 to 20,000 hertz).
   - The first oscillation type, with the body moving at its own natural frequency and no outside force, is a free oscillation (the source line called it damped oscillation).
   - Spelling of discoverer names corrected (Herschel, Röntgen).
   - Typing errors in definitions of resonant oscillation and diffraction were silently corrected.
*/
