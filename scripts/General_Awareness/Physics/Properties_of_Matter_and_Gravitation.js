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

/* Field: General_Awareness · Subject: General_Science · Chapter: Properties_of_Matter_and_Gravitation · 28 concept pages (+ overview) · 56 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌊", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Properties of Matter and Gravitation",
    thumb: {
      image: "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "FULL CLASS",
      line2: "MATTER + GRAVITATION",
      line3: "PHYSICS TRICKS",
      badge: "SCIENCE",
      ribbon: "ELASTICITY • FLUIDS • GRAVITY",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Properties of Matter & Gravitation | Physics for all Competitive Exams",
      altTitles: ["Pascal, Archimedes, Bernoulli & Gravitation in One Class", "Elasticity, Surface Tension, Satellites — Physics Full Class"],
      description: "Properties of matter and gravitation give easy marks in General Science. In this class you learn elasticity, fluids, pressure, buoyancy, surface tension, viscosity, Bernoulli's theorem, gravity, weight in a lift, satellites and escape velocity, step by step in simple words.\n\n📌 IN THIS CLASS\n✅ Stress, strain and the elastic limit\n✅ Pascal's law and Archimedes' principle\n✅ Surface tension and capillarity\n✅ Value of g, satellites and escape velocity\n✅ Practice questions after every page\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Physics #GeneralScience",
      tags: ["properties of matter", "gravitation physics", "physics for all exams", "SSC CGL physics", "general science physics", "elasticity stress strain", "pascal law", "archimedes principle", "surface tension", "capillarity", "viscosity stokes law", "bernoulli theorem", "magnus effect", "acceleration due to gravity", "weight in a lift", "escape velocity", "geostationary satellite", "polar satellite", "law of floatation", "atmospheric pressure", "fluid pressure", "terminal velocity", "physics tricks", "SSC CGL general science", "previous year questions"],
      hashtags: ["SSCCGL", "Physics", "GeneralScience"],
      thumbText: "MATTER + GRAVITATION",
      pinnedComment: "📌 Solve the questions after every page and write your score below 👇",
      communityPost: "🌊 New physics class is live: Properties of Matter and Gravitation. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Elasticity\n00:00 Fluids\n00:00 Gravitation",
      playlist: "Competitive exams General Science — Physics Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how solids, liquids and gases behave, and on how gravity holds the Moon, satellites and us together</u>. These two parts of physics give many easy and repeated questions in the Staff Selection Commission exam.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>28</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>56</b><span>Questions</span></div>
        <div class="cp-stat"><b>~112 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Matter and Solids</b><br>What matter is, and why a solid keeps its shape and its volume.</li>
        <li><b>Elasticity, Stress and Strain</b><br>Why a stretched wire comes back, how stress and strain are measured, and what happens at the elastic limit and the fracture point.</li>
        <li><b>Ductile, Brittle Materials and Elastic Fatigue</b><br>Why some wires stretch before they break, why glass snaps suddenly, and why old bridges are declared unsafe.</li>
        <li><b>Fluids, Density and Pressure</b><br>What a fluid is, how density and pressure are measured, and how atmospheric pressure is read with a barometer.</li>
        <li><b>Pascal's Law, Buoyancy and Floatation</b><br>How a hydraulic lift works, why objects feel lighter in water, and why ice and icebergs float.</li>
        <li><b>Surface Tension and Capillarity</b><br>Why raindrops are round, why soap cleans better, and why water climbs up a thin tube.</li>
        <li><b>Cohesion, Adhesion, Viscosity and Terminal Velocity</b><br>The pulling forces between molecules, the thickness of a liquid, and why raindrops fall slowly.</li>
        <li><b>Bernoulli's Theorem and the Magnus Effect</b><br>Why fast air has low pressure, why roofs fly off in storms, and why a spinning ball swerves.</li>
        <li><b>Gravitation and the Value of g</b><br>Newton's law of gravitation, and how the value of g changes with place, height and depth.</li>
        <li><b>Mass, Weight and the Lift</b><br>The difference between mass and weight, and what a weighing scale shows inside a moving lift.</li>
        <li><b>Satellites, Orbital and Escape Velocity</b><br>How satellites stay in orbit, which satellites are used for what, and how fast a rocket must go to leave the Earth.</li>
        <li><b>Practice</b><br>Questions after every page, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Archimedes' principle, Pascal's law, surface tension, Bernoulli's theorem, the weight in a lift and satellites are repeated again and again in General Science papers, so learning each idea well gives sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🧱", accent: "#22c55e", pauseTimer: true,
    title: "Matter and Solids",
    html: `
      <p class="cp-lead">Matter is anything that has <b>mass</b> and takes up <b>space</b>. It exists in three states: solid, liquid and gas.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/1.png" alt="ice cubes water steam three states of matter photo" data-caption="Ice, water and steam are the solid, liquid and gas states of the same matter." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A <u>solid</u> has a definite shape and a definite volume. The reason is that its molecules are packed very closely, so they cannot easily move away from their places.</p>
      <table><thead><tr><th>State</th><th>Shape</th><th>Volume</th><th>Molecules</th></tr></thead><tbody><tr><td>Solid</td><td>Definite</td><td>Definite</td><td>Very close together</td></tr><tr><td>Liquid</td><td>Takes the shape of its container</td><td>Definite</td><td>Close, but free to slide</td></tr><tr><td>Gas</td><td>Takes the shape of its container</td><td>Not definite</td><td>Far apart</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/2.png" alt="Three boxes side by side labelled Solid, Liquid and Gas, with dots packed in a neat grid, " data-caption="Molecules are packed in order in a solid, loosely in a liquid and far apart in a gas." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">A liquid has a fixed volume but no fixed shape. A gas has neither a fixed shape nor a fixed volume.</div>
      <div class="cp-note exam">Questions often ask which state of matter has a definite shape and volume. The answer is always the solid.</div>
    `
  },
  3: {
    questext: "Which state of matter has both a definite shape and a definite volume?",
    options: ["Gas", "Solid", "Liquid", "Plasma"],
    correct: "2",
    exptext: "✅ A solid has a definite shape and volume because its molecules are packed very closely. 📌 Solid means fixed in both. ❌ A liquid has a definite volume but takes the shape of its container."
  },
  4: {
    type: "concept", icon: "🔩", accent: "#f59e0b", pauseTimer: true,
    title: "Elasticity and Plasticity",
    html: `
      <p class="cp-lead"><b>Elasticity</b> is the property of a body by which it regains its original shape after the force that deformed it is removed. <b>Plasticity</b> is the opposite: the body does not regain its shape.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/3.png" alt="steel spring stretched and released photo" data-caption="A steel spring returns to its original length after the stretching force is removed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Property</th><th>What happens after the force is removed</th><th>Example</th></tr></thead><tbody><tr><td>Elasticity</td><td>The body returns to its original shape</td><td>Steel spring, quartz</td></tr><tr><td>Plasticity</td><td>The body stays deformed</td><td>Clay, putty, hot wax</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/4.png" alt="Two panels: a spring stretched then returning to normal length, and a lump of clay pressed" data-caption="A spring is elastic and returns to shape, while clay is plastic and stays pressed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A body that is more easily stretched is not more elastic. A body is more elastic if it comes back to its shape with a larger force.</div>
      <div class="cp-note exam">Quartz and phosphor bronze are almost perfectly elastic bodies. This fact is asked often.</div>
    `
  },
  5: {
    questext: "Which of the following is almost a perfectly elastic body?",
    options: ["Wet clay", "Putty", "Quartz", "Hot wax"],
    correct: "3",
    exptext: "✅ Quartz is almost perfectly elastic, so it regains its shape fully. 📌 Remember quartz and phosphor bronze together. ❌ Clay, putty and wax are plastic, so they stay deformed."
  },
  6: {
    questext: "The property of a body by which it does not regain its original shape after the deforming force is removed is called",
    options: ["Elasticity", "Plasticity", "Rigidity", "Viscosity"],
    correct: "2",
    exptext: "✅ This property is plasticity. 📌 Plastic means it stays in the new shape. ❌ Elasticity is the opposite, in which the body returns to its shape."
  },
  7: {
    type: "concept", icon: "📏", accent: "#ef4444", pauseTimer: true,
    title: "Strain",
    html: `
      <p class="cp-lead">When a force changes the length, volume or shape of a body, the fraction of this change is called <b>strain</b>. Strain is a ratio of two similar quantities, so it has <u>no unit</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/5.png" alt="A rod of original length L stretched by a small amount shown as delta L, with arrows and l" data-caption="Longitudinal strain is the extra length divided by the original length." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Type of strain</th><th>Meaning</th><th>Formula</th></tr></thead><tbody><tr><td>Longitudinal strain</td><td>Change in length per unit length</td><td>Change in length divided by original length</td></tr><tr><td>Volume strain</td><td>Change in volume per unit volume</td><td>Change in volume divided by original volume</td></tr><tr><td>Shearing strain</td><td>The angle through which the faces of the body are turned</td><td>Angle of shear</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Longitudinal strain</small>Strain = <span class="cp-frac"><i>ΔL</i><i>L</i></span></div>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/6.png" alt="A square block pushed sideways at the top so that it tilts by a small angle theta, labelle" data-caption="In shearing strain the top face slides sideways and the block tilts by a small angle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Strain has no unit and no dimension. If an option gives newton or pascal for strain, it is wrong.</div>
      <div class="cp-note exam">Remember three strains: longitudinal (length), volume (size) and shearing (shape).</div>
    `
  },
  8: {
    questext: "Which of the following physical quantities has no unit?",
    options: ["Stress", "Pressure", "Strain", "Force"],
    correct: "3",
    exptext: "✅ Strain is a ratio of two similar quantities, so it has no unit. 📌 Change divided by original gives a pure number. ❌ Stress and pressure are force per unit area and are measured in pascal."
  },
  9: {
    questext: "A wire of length 2 metres is stretched by 1 millimetre. What is the longitudinal strain?",
    options: ["0.0005", "0.002", "0.5", "0.05"],
    correct: "1",
    exptext: "✅ Strain is 0.001 metre divided by 2 metres, which is 0.0005. 📌 Always change the units to be the same first. ❌ 0.002 comes from dividing 2 by 1000 in the wrong way."
  },
  10: {
    type: "concept", icon: "💪", accent: "#8b5cf6", pauseTimer: true,
    title: "Stress",
    html: `
      <p class="cp-lead">The internal restoring force acting per unit area of cross-section of a deformed body is called <b>stress</b>. Its unit is newton per square metre, which is also called the pascal.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/7.png" alt="A metal wire hanging with a weight at the bottom, arrows showing force F and the cross-sec" data-caption="Stress is the force divided by the area of cross-section of the wire." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Normal stress</td><td>The force acts at right angles to the surface</td></tr><tr><td>Tangential stress</td><td>The force acts along the surface</td></tr><tr><td>Breaking stress</td><td>The smallest stress that breaks a wire</td></tr><tr><td>Limit of elasticity</td><td>The largest deforming force up to which a body stays elastic</td></tr></tbody></table>
      <p class="cp-lead">The ratio of stress to strain is called the <b>modulus of elasticity</b>. The modulus of elasticity of steel is more than that of copper, so springs are made of steel and not of copper.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/8.png" alt="hollow steel shaft cross section machine photo" data-caption="A hollow shaft needs a greater twisting force than a solid shaft of the same weight." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Twisting a hollow cylinder needs more torque than twisting a solid cylinder of the same material and mass. So a hollow shaft is stronger than a solid shaft.</div>
      <div class="cp-note exam">Springs are made of steel because steel has a higher modulus of elasticity than copper.</div>
    `
  },
  11: {
    questext: "Why are springs made of steel and not of copper?",
    options: ["Steel is cheaper than copper", "Steel is lighter than copper", "Steel conducts heat better", "Steel has a larger modulus of elasticity"],
    correct: "4",
    exptext: "✅ Steel has a larger modulus of elasticity, so it returns to its shape better than copper. 📌 Higher modulus means more elastic. ❌ Cost and weight are not the reason."
  },
  12: {
    questext: "Which of the following is correct for a hollow shaft and a solid shaft of the same material and mass?",
    options: ["A hollow shaft is stronger", "A solid shaft is stronger", "Both are equally strong", "A hollow shaft cannot be twisted"],
    correct: "1",
    exptext: "✅ A hollow shaft needs more torque to give the same twist, so it is stronger. 📌 Hollow bones and pipes use the same idea. ❌ Option 2 is the common wrong belief."
  },
  13: {
    type: "concept", icon: "📈", accent: "#14b8a6", pauseTimer: true,
    title: "Elastic Limit, Plastic Behaviour and Fracture Point",
    html: `
      <p class="cp-lead">When a wire is stretched slowly, it passes through three stages. First it is elastic, then it becomes plastic, and at last it breaks.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/9.png" alt="A stress-strain graph with the curve rising straight, bending at a point labelled Elastic " data-caption="A stress-strain curve showing the elastic limit, the plastic region and the fracture point." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Stage</th><th>What happens</th></tr></thead><tbody><tr><td>Elastic limit</td><td>The largest stress and strain up to which the wire stays elastic</td></tr><tr><td>Plastic behaviour</td><td>Beyond the elastic limit, strain grows very fast and the wire does not return to its natural length</td></tr><tr><td>Fracture point</td><td>The point at which the wire finally breaks</td></tr></tbody></table>
      <p class="cp-lead">Below the elastic limit, the wire comes back to its length when the pulling force is removed. Beyond it, a permanent stretch is left behind.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/10.png" alt="tensile test steel specimen broken at fracture photo" data-caption="A metal test piece breaks at the fracture point after it has been stretched too far." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix up the elastic limit with the fracture point. The elastic limit comes first, and the fracture point is the very last point.</div>
      <div class="cp-note exam">The order is elastic limit, then plastic behaviour, then fracture point.</div>
    `
  },
  14: {
    questext: "If a wire is stretched beyond its elastic limit and the force is removed, the wire will",
    options: ["Return to its natural length", "Become shorter than before", "Not come back to its natural length", "Break immediately"],
    correct: "3",
    exptext: "✅ Beyond the elastic limit the wire shows plastic behaviour, so it stays stretched. 📌 Past the limit means a permanent change. ❌ It does not break until the fracture point is reached."
  },
  15: {
    questext: "Which of the following is the correct order of the stages of a wire being stretched until it breaks?",
    options: ["Fracture point, elastic limit, plastic behaviour", "Plastic behaviour, elastic limit, fracture point", "Elastic limit, fracture point, plastic behaviour", "Elastic limit, plastic behaviour, fracture point"],
    correct: "4",
    exptext: "✅ The wire is first elastic, then plastic, and it breaks at the fracture point. 📌 Think: limit, change, break. ❌ The fracture point can never come before the plastic stage."
  },
  16: {
    type: "concept", icon: "🔨", accent: "#ec4899", pauseTimer: true,
    title: "Ductile and Brittle Materials",
    html: `
      <p class="cp-lead">Materials are named by how they behave between the elastic limit and the fracture point. A <b>ductile</b> material stretches a lot before it breaks, and a <b>brittle</b> material breaks soon after its elastic limit.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/11.png" alt="Two stress-strain curves: a long curve with a wide plastic region labelled Ductile, and a " data-caption="A ductile material has a long plastic stage, while a brittle material has a very short one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Material type</th><th>Behaviour</th><th>Examples</th></tr></thead><tbody><tr><td>Ductile</td><td>Large deformation between the elastic limit and the fracture point</td><td>Copper, aluminium, gold, steel wire</td></tr><tr><td>Brittle</td><td>Breaks soon after the elastic limit is crossed</td><td>Glass, cast iron, chalk</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/12.png" alt="thin copper wire drawn coil photo" data-caption="Ductile metals such as copper can be drawn into thin wires without breaking." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Only a ductile material can be drawn into wires. This is why copper and gold are used for wires and thin foils.</div>
      <div class="cp-note exam">Ductile means it can be stretched, and brittle means it breaks suddenly.</div>
    `
  },
  17: {
    questext: "A material that breaks soon after its elastic limit is crossed is called",
    options: ["Ductile", "Malleable", "Brittle", "Plastic"],
    correct: "3",
    exptext: "✅ Such a material is brittle, for example glass. 📌 Brittle breaks quickly. ❌ A ductile material stretches a lot before it breaks."
  },
  18: {
    type: "concept", icon: "🌉", accent: "#3b82f6", pauseTimer: true,
    title: "Elastic Fatigue",
    html: `
      <p class="cp-lead"><b>Elastic fatigue</b> is the loss of the elastic nature of a body when a deforming force acts on it again and again, with the direction changing each time.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/13.png" alt="old steel railway bridge photo" data-caption="Bridges carry a repeated load from traffic, which slowly weakens the metal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Because of elastic fatigue, a bridge becomes less elastic after a very long use. For this reason, old bridges are declared unsafe even if no crack is seen.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/14.png" alt="A bridge with a vehicle crossing again and again, and a small graph beside it showing elas" data-caption="Repeated loads reduce the elasticity of a material over many years." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note remember">A paper clip bent again and again becomes weak and finally breaks. This is a simple example of fatigue.</div>
      <div class="cp-note exam">Remember that long use of a bridge causes elastic fatigue, and so old bridges are declared unsafe.</div>
    `
  },
  19: {
    questext: "Old bridges are declared unsafe because of",
    options: ["Elastic fatigue", "Viscosity", "Surface tension", "Buoyancy"],
    correct: "1",
    exptext: "✅ Repeated loads cause elastic fatigue, which makes the metal less elastic. 📌 Fatigue means tired material. ❌ The other options have nothing to do with the strength of a solid."
  },
  20: {
    type: "concept", icon: "💧", accent: "#84cc16", pauseTimer: true,
    title: "Fluid and Fluid Density",
    html: `
      <p class="cp-lead">A <b>fluid</b> is a substance that begins to flow when an outside force acts on it. Liquids and gases are both fluids.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/15.png" alt="water pouring from jug into glass photo" data-caption="Water is a fluid, because it flows as soon as a force acts on it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Density</b> is the mass of a body present in one unit of its volume. It is a scalar quantity, and its unit is kilogram per cubic metre.</p>
      <div class="cp-formula" translate="no"><small>Density</small>ρ = <span class="cp-frac"><i>mass</i><i>volume</i></span></div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Density of water</td><td>1000 kilogram per cubic metre</td></tr><tr><td>Temperature of greatest density of water</td><td>4 degrees Celsius</td></tr><tr><td>Instrument for density of a liquid</td><td>Hydrometer</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/16.png" alt="hydrometer floating in liquid measuring density photo" data-caption="A hydrometer floats in a liquid and shows its density on a scale." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">A hydrometer works on the law of floatation. It sinks deeper in a light liquid and floats higher in a heavy liquid.</div>
      <div class="cp-note exam">Water has its greatest density at 4 degrees Celsius, not at 0 degrees Celsius.</div>
    `
  },
  21: {
    questext: "Which instrument is used to measure the density or relative density of a liquid?",
    options: ["Barometer", "Hydrometer", "Hygrometer", "Manometer"],
    correct: "2",
    exptext: "✅ A hydrometer measures the density of a liquid using the law of floatation. 📌 Hydro means water. ❌ A hygrometer measures humidity and a barometer measures air pressure."
  },
  22: {
    questext: "At which temperature is the density of water the greatest?",
    options: ["0 degrees Celsius", "2 degrees Celsius", "10 degrees Celsius", "4 degrees Celsius"],
    correct: "4",
    exptext: "✅ Water is densest at 4 degrees Celsius, where it is 1000 kilogram per cubic metre. 📌 Remember four for the greatest density. ❌ At 0 degrees Celsius water is lighter, which is why ice floats."
  },
  23: {
    type: "concept", icon: "⬇️", accent: "#06b6d4", pauseTimer: true,
    title: "Fluid Pressure",
    html: `
      <p class="cp-lead">The normal force exerted by a liquid per unit area of the surface it touches is called <b>fluid pressure</b>.</p>
      <div class="cp-formula" translate="no"><small>Fluid pressure</small>p = <span class="cp-frac"><i>F</i><i>A</i></span></div>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/17.png" alt="A box with a downward arrow labelled Force F pressing on a surface of area A, and a second" data-caption="The same force on a smaller area gives a larger pressure." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The unit of pressure is newton per square metre, which is called the <b>pascal</b>. If the area becomes smaller and the force stays the same, the pressure becomes larger.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/18.png" alt="sharp kitchen knife cutting vegetable photo" data-caption="A sharp knife has a very thin edge, so a small force gives a large pressure." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Everyday case</th><th>Reason</th></tr></thead><tbody><tr><td>Sharp knife cuts well</td><td>The edge has a small area, so the pressure is large</td></tr><tr><td>Broad straps on a school bag</td><td>The area is large, so the pressure on the shoulder is small</td></tr><tr><td>Nails have pointed ends</td><td>The tiny tip area gives a large pressure</td></tr></tbody></table>
      <div class="cp-note trap">Force and pressure are not the same. Force is measured in newton, and pressure is measured in pascal.</div>
      <div class="cp-note exam">One pascal is one newton per square metre.</div>
    `
  },
  24: {
    questext: "Why does a sharp knife cut better than a blunt knife?",
    options: ["Its area of contact is larger", "Its area of contact is smaller, so the same force gives more pressure", "It is much heavier", "It is always made of harder metal"],
    correct: "2",
    exptext: "✅ A sharp edge has a small area, so the same force gives a larger pressure. 📌 Small area means big pressure. ❌ The weight or the metal is not the main reason."
  },
  25: {
    questext: "Which of the following is the standard unit of pressure?",
    options: ["Newton", "Joule", "Watt", "Pascal"],
    correct: "4",
    exptext: "✅ The unit of pressure is the pascal, which is one newton per square metre. 📌 Pascal is the unit of pressure and the name of the law as well. ❌ Newton is the unit of force."
  },
  26: {
    type: "concept", icon: "🌍", accent: "#a855f7", pauseTimer: true,
    title: "Atmospheric Pressure",
    html: `
      <p class="cp-lead">The pressure exerted by the weight of the air above us is called <b>atmospheric pressure</b>. At sea level its value is about 101325 pascal, which is called one atmosphere.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/19.png" alt="A column of air rising from the ground to the top of the sky with an arrow pressing down, " data-caption="Atmospheric pressure is caused by the weight of the column of air above." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Pressure is also measured in other units, such as the <b>torr</b> and the <b>bar</b>. An <b>aneroid barometer</b> is a device that measures atmospheric pressure, and it is also used to find the height of a place above the sea.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/20.png" alt="aneroid barometer dial photo" data-caption="An aneroid barometer shows the air pressure on a dial and can also show the height of a place." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Air pressure falls as we go higher, so the same barometer can also be used as an altimeter in aircraft and by mountain climbers.</div>
      <div class="cp-note exam">The aneroid barometer measures atmospheric pressure and height. The mercury barometer measures only the pressure.</div>
    `
  },
  27: {
    questext: "An aneroid barometer is used to measure",
    options: ["Atmospheric pressure and the height of a place", "The humidity of air", "The temperature of air", "The density of a liquid"],
    correct: "1",
    exptext: "✅ An aneroid barometer measures air pressure, and since pressure changes with height it also shows altitude. 📌 Pressure goes down as height goes up. ❌ Humidity is measured with a hygrometer."
  },
  28: {
    questext: "Which of the following is a unit of atmospheric pressure?",
    options: ["Newton", "Decibel", "Bar", "Hertz"],
    correct: "3",
    exptext: "✅ The bar is a unit of pressure, and so are the torr and the pascal. 📌 Bar sounds like barometer. ❌ Newton measures force, decibel measures loudness and hertz measures frequency."
  },
  29: {
    type: "concept", icon: "🏗️", accent: "#e11d48", pauseTimer: true,
    title: "Pascal's Law",
    html: `
      <p class="cp-lead"><b>Pascal's law</b> says that the pressure applied anywhere on a confined fluid is passed on equally and without any loss to every part of the fluid and to the walls of the container.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/21.png" alt="A U-shaped hydraulic machine with a small piston on the left carrying force F1 over area A" data-caption="In a hydraulic lift a small force on a small piston gives a large force on a large piston." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-formula" translate="no"><small>Hydraulic lift</small><span class="cp-frac"><i>F1</i><i>A1</i></span> = <span class="cp-frac"><i>F2</i><i>A2</i></span></div>
      <table><thead><tr><th>Device</th><th>Working</th></tr></thead><tbody><tr><td>Hydraulic lift</td><td>Lifts a heavy car with a small push</td></tr><tr><td>Hydraulic press</td><td>Squeezes things with a very large force</td></tr><tr><td>Hydraulic brakes</td><td>Pressure passes through the brake oil to all the wheels</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/22.png" alt="hydraulic car lift garage photo" data-caption="A hydraulic lift uses Pascal's law to raise a heavy car with a small force." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The pressure is the same on both pistons, but the forces are not the same. The larger piston carries the larger force.</div>
      <div class="cp-note exam">Hydraulic lift, hydraulic press and hydraulic brakes all work on Pascal's law.</div>
    `
  },
  30: {
    questext: "Hydraulic brakes work on the principle of",
    options: ["Archimedes' principle", "Bernoulli's theorem", "Stokes' law", "Pascal's law"],
    correct: "4",
    exptext: "✅ The pressure on the brake oil is passed equally to every wheel, which is Pascal's law. 📌 Hydraulic means Pascal. ❌ Archimedes' principle is about floating bodies."
  },
  31: {
    questext: "In a hydraulic lift, a force of 10 newton acts on a piston of area 2 square centimetre. What force is obtained on a piston of area 100 square centimetre?",
    options: ["250 newton", "500 newton", "1000 newton", "50 newton"],
    correct: "2",
    exptext: "✅ The pressure is equal, so the force is 10 multiplied by 100 divided by 2, which is 500 newton. 📌 The force grows in the same ratio as the area. ❌ 1000 newton comes from multiplying by 100 and not dividing by 2."
  },
  32: {
    type: "concept", icon: "⬆️", accent: "#10b981", pauseTimer: true,
    title: "Buoyancy",
    html: `
      <p class="cp-lead">When a body is partly or fully inside a liquid, the liquid pushes it upward. This upward force is called the <b>buoyant force</b> or <b>upthrust</b>, and the property of fluids that causes it is called <b>buoyancy</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/23.png" alt="A block in water with a downward arrow labelled Weight and an upward arrow labelled Buoyan" data-caption="The weight pulls a body down, and the buoyant force pushes it up through the centre of buoyancy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The buoyant force is equal to the weight of the liquid pushed aside by the part of the body that is under the liquid. It acts at the centre of gravity of that displaced liquid, which is called the <b>centre of buoyancy</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/24.png" alt="person floating in swimming pool photo" data-caption="The buoyant force of water holds a floating person up." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The centre of buoyancy is the centre of gravity of the displaced liquid. It is not always the centre of gravity of the body.</div>
      <div class="cp-note exam">Buoyancy acts upward and equals the weight of the liquid displaced.</div>
    `
  },
  33: {
    questext: "The point at which the buoyant force acts on a body in a liquid is called the",
    options: ["Centre of gravity of the body", "Centre of pressure", "Centre of curvature", "Centre of buoyancy"],
    correct: "4",
    exptext: "✅ The buoyant force acts at the centre of buoyancy, which is the centre of gravity of the displaced liquid. 📌 Buoyant force acts at buoyancy centre. ❌ The centre of gravity of the body is where its weight acts."
  },
  34: {
    type: "concept", icon: "👑", accent: "#eab308", pauseTimer: true,
    title: "Archimedes' Principle",
    html: `
      <p class="cp-lead">When a body is partly or fully dipped in a liquid, it appears to lose some weight. <b>Archimedes' principle</b> says that this loss in weight is equal to the weight of the liquid displaced by the dipped part of the body.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/25.png" alt="A spring balance holding a stone in air showing 5 newton, and the same stone dipped in wat" data-caption="The stone loses 2 newton in water, which equals the weight of the water it pushes out." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-formula" translate="no"><small>Archimedes' principle</small>Loss of weight = Weight of liquid displaced = Volume dipped × Density of liquid × g</div>
      <table><thead><tr><th>What the loss depends on</th><th>Does it depend?</th></tr></thead><tbody><tr><td>Volume of the dipped part</td><td>Yes</td></tr><tr><td>Density of the liquid</td><td>Yes</td></tr><tr><td>Density of the body</td><td>No</td></tr><tr><td>Shape of the body</td><td>No</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/26.png" alt="Archimedes statue or eureka bath illustration photo" data-caption="Archimedes found this principle while he was in a bath, and the story is told as Eureka." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The loss in weight depends on the liquid and on the dipped volume. It does not depend on how heavy the body is.</div>
      <div class="cp-note exam">The loss in weight equals the weight of the liquid displaced.</div>
    `
  },
  35: {
    questext: "A body dipped in a liquid loses weight equal to",
    options: ["Its own weight", "The weight of the liquid displaced", "The weight of all the liquid in the container", "Half of its own weight"],
    correct: "2",
    exptext: "✅ The loss in weight equals the weight of the liquid pushed aside, which is Archimedes' principle. 📌 Loss equals displaced liquid weight. ❌ The total liquid in the container does not matter."
  },
  36: {
    questext: "Consider the following statements about Archimedes' principle:\n1. The loss in weight of a body in a liquid equals the weight of the liquid it displaces.\n2. The loss in weight depends only on the density of the body.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 The loss depends on the liquid and the dipped volume. ❌ Statement 2 is wrong because the density of the body does not decide the loss."
  },
  37: {
    type: "concept", icon: "🧊", accent: "#0ea5e9", pauseTimer: true,
    title: "Law of Floatation",
    html: `
      <p class="cp-lead">A body floats in a liquid when its weight is equal to the weight of the liquid displaced by its dipped part. For a floating body the centre of gravity and the centre of buoyancy must lie on the same straight line.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/27.png" alt="iceberg floating in sea photo" data-caption="Most of an iceberg is under the water and only the tip is seen above it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Ice floats because its density, 0.92 gram per cubic centimetre, is less than the density of water. When ice floats on water, 11/12 of it is under water and 1/12 is outside. In sea water, 8/9 of an iceberg is under water and 1/9 is outside.</p>
      <table><thead><tr><th>Floating body</th><th>Part under the liquid</th><th>Part outside</th></tr></thead><tbody><tr><td>Ice in water</td><td>11/12</td><td>1/12</td></tr><tr><td>Iceberg in sea water</td><td>8/9</td><td>1/9</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/28.png" alt="Two side by side beakers, one with an ice cube showing a small part above water labelled 1" data-caption="A small part of floating ice is above water, and the rest is below." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">It is easier to swim in sea water than in river water because sea water is denser and gives a greater buoyant force.</p>
      <div class="cp-note tip">The denser the liquid, the less of the body sinks into it. That is why a ship rises a little when it moves from a river to the sea.</div>
      <div class="cp-note exam">Remember the numbers 11/12 for ice in fresh water and 8/9 for an iceberg in sea water.</div>
    `
  },
  38: {
    questext: "When a piece of ice floats on water, what part of it is outside the water?",
    options: ["1/9", "11/12", "1/12", "1/2"],
    correct: "3",
    exptext: "✅ 11/12 of the ice is under water, so 1/12 is outside. 📌 Eleven under and one out of twelve. ❌ The fraction 1/9 belongs to an iceberg in sea water."
  },
  39: {
    questext: "It is easier to swim in sea water than in river water because sea water has",
    options: ["A smaller density", "A greater density, which gives a greater buoyant force", "A smaller surface tension", "A lower viscosity"],
    correct: "2",
    exptext: "✅ Sea water is denser, so the buoyant force on the swimmer is greater. 📌 More density means more upthrust. ❌ Surface tension and viscosity do not hold up a swimmer."
  },
  40: {
    questext: "What part of an iceberg is under the water of the sea?",
    options: ["11/12", "1/9", "1/12", "8/9"],
    correct: "4",
    exptext: "✅ In sea water, 8/9 of an iceberg is under water and only 1/9 is seen. 📌 Eight of nine is hidden. ❌ 11/12 is for ice floating in ordinary water."
  },
  41: {
    type: "concept", icon: "🔵", accent: "#d946ef", pauseTimer: true,
    title: "Surface Tension",
    html: `
      <p class="cp-lead"><b>Surface tension</b> is the property of a liquid by which it tries to make its free surface as small as possible, like a stretched skin.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/29.png" alt="water droplets on leaf spherical photo" data-caption="A drop takes a round shape because surface tension pulls its surface inward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">For a given amount of liquid, the smallest surface area is that of a sphere. This is why raindrops and small drops of mercury are round.</p>
      <table><thead><tr><th>Factor</th><th>Effect on surface tension</th></tr></thead><tbody><tr><td>Rise in temperature</td><td>Decreases it</td></tr><tr><td>Critical temperature</td><td>Becomes zero</td></tr><tr><td>Highly soluble impurity such as salt</td><td>Increases it</td></tr><tr><td>Less soluble impurity such as soap</td><td>Decreases it</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/30.png" alt="A graph with temperature on the horizontal axis and surface tension on the vertical axis, " data-caption="Surface tension falls as temperature rises and becomes zero at the critical temperature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Adding salt to water raises its surface tension, but adding soap or detergent lowers it.</div>
      <div class="cp-note exam">Raindrops are spherical because of surface tension.</div>
    `
  },
  42: {
    questext: "Raindrops are spherical because of",
    options: ["Viscosity", "Buoyancy", "Surface tension", "Atmospheric pressure"],
    correct: "3",
    exptext: "✅ Surface tension makes a liquid take the shape with the least surface, which is a sphere. 📌 Smallest skin means a ball. ❌ Viscosity is the resistance to flow, not the shape."
  },
  43: {
    questext: "When the temperature of a liquid rises, its surface tension",
    options: ["Decreases", "Increases", "Stays the same", "First increases and then falls"],
    correct: "1",
    exptext: "✅ The surface tension of a liquid decreases as the temperature increases. 📌 Hot means weak skin. ❌ It becomes zero at the critical temperature."
  },
  44: {
    type: "concept", icon: "🧼", accent: "#16a34a", pauseTimer: true,
    title: "Applications of Surface Tension",
    html: `
      <p class="cp-lead">Anything that changes the surface tension of water explains many daily facts. Soap, detergent and antiseptic liquids lower it, and salt raises it.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/31.png" alt="soap bubbles floating photo" data-caption="Soap lowers the surface tension of water, which lets thin bubbles form." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Everyday fact</th><th>Reason</th></tr></thead><tbody><tr><td>Soap solution cleans greasy clothes better</td><td>Its surface tension is less than that of pure water, so it spreads into the cloth</td></tr><tr><td>Warm soup tastes better</td><td>At high temperature the surface tension is low, so the soup spreads over the whole tongue</td></tr><tr><td>Antiseptic reaches tiny cracks of a wound</td><td>It has low surface tension</td></tr><tr><td>Kerosene sprinkled on a pond kills mosquito larvae</td><td>It lowers the surface tension, and the larvae sink and drown</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/32.png" alt="Two pond panels: larvae hanging from the water surface in clean water, and the larvae sink" data-caption="Larvae rest on the surface of clean water, but sink when kerosene lowers the surface tension." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Oil spreading over the surface of water also lowers its surface tension.</div>
      <div class="cp-note exam">Soap, detergent and antiseptic lower surface tension. Salt raises it.</div>
    `
  },
  45: {
    questext: "Kerosene oil is sprinkled on stagnant water to kill mosquito larvae because it",
    options: ["Increases the surface tension", "Decreases the surface tension, so the larvae sink", "Raises the temperature of the water", "Blocks the sunlight"],
    correct: "2",
    exptext: "✅ Kerosene lowers the surface tension, so the larvae cannot rest on the surface and they sink. 📌 Weaker skin means larvae drown. ❌ It does not heat the water."
  },
  46: {
    questext: "The addition of which of the following increases the surface tension of water?",
    options: ["Soap", "Detergent", "Antiseptic liquid", "Common salt"],
    correct: "4",
    exptext: "✅ Common salt dissolves well in water and raises its surface tension. 📌 Salt raises, soap lowers. ❌ Soap, detergent and antiseptic liquids all lower it."
  },
  47: {
    type: "concept", icon: "🌱", accent: "#d97706", pauseTimer: true,
    title: "Capillarity",
    html: `
      <p class="cp-lead">The rise or fall of a liquid in a very thin tube, called a <b>capillary tube</b>, is called <b>capillarity</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/33.png" alt="A thin glass tube dipped in water with the water level inside the tube higher than outside" data-caption="Water rises in a thin tube, while mercury falls in a thin tube." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Example of capillarity</th><th>How it works</th></tr></thead><tbody><tr><td>Blotting paper soaks ink</td><td>Its tiny pores act like capillary tubes</td></tr><tr><td>Oil rises in a lamp wick</td><td>The threads of the wick act like capillary tubes</td></tr><tr><td>Roots draw water from the soil</td><td>The root hairs lift the water by capillary action</td></tr><tr><td>Towel dries the body</td><td>The cotton threads soak up the water</td></tr><tr><td>Melted wax climbs the candle wick</td><td>The wick acts as a capillary</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/34.png" alt="oil lamp diya wick burning photo" data-caption="The oil climbs up the wick of a lamp by capillary action." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Farmers loosen the soil and break it into pieces. This breaks the tiny capillaries in the soil, so that water does not rise to the surface and dry out.</p>
      <div class="cp-note trap">In an artificial satellite there is no apparent weight, so water in a capillary tube rises all the way to the other end, however long the tube is.</div>
      <div class="cp-note exam">Blotting paper, lamp wick, root hairs, towel and candle wick are the standard examples of capillarity.</div>
    `
  },
  48: {
    questext: "Farmers loosen the soil in their fields in order to",
    options: ["Help water to rise faster", "Make the soil soft for roots", "Break the capillaries so that water is not lost from the soil", "Increase the temperature of the soil"],
    correct: "3",
    exptext: "✅ Loosening the soil breaks the capillaries, so the water stays below and is not lost. 📌 Break the tubes to save the water. ❌ The aim is to keep water, not to bring it up."
  },
  49: {
    questext: "If a capillary tube is dipped in water inside an artificial satellite, the water rises",
    options: ["Up to the other end of the tube, however long it is", "To the same height as on the Earth", "To half the height as on the Earth", "Not at all"],
    correct: "1",
    exptext: "✅ In a satellite the apparent weight is zero, so nothing pulls the water down and it rises to the end of the tube. 📌 No weight means no limit. ❌ On the Earth the weight of the water column stops it at a fixed height."
  },
  50: {
    type: "concept", icon: "🧲", accent: "#dc2626", pauseTimer: true,
    title: "Cohesive and Adhesive Forces",
    html: `
      <p class="cp-lead">Molecules attract each other. The pull between molecules of the <u>same</u> substance is called <b>cohesive force</b>. The pull between molecules of <u>different</u> substances is called <b>adhesive force</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/35.png" alt="Two panels: water molecules pulling on each other labelled Cohesive force, and water molec" data-caption="Cohesion acts between like molecules, and adhesion acts between unlike molecules." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Force</th><th>Between</th><th>Example</th></tr></thead><tbody><tr><td>Cohesive</td><td>Molecules of the same substance</td><td>Water with water, mercury with mercury</td></tr><tr><td>Adhesive</td><td>Molecules of different substances</td><td>Paper with gum, paper with ink</td></tr></tbody></table>
      <p class="cp-lead">When the adhesive force between a liquid and glass is larger than the cohesive force of the liquid, the liquid wets the glass and climbs up the tube. When the cohesive force is larger, as in mercury, the liquid does not wet the glass and its level falls.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/36.png" alt="water and mercury meniscus in glass tubes photo" data-caption="Water curves upward at the glass wall, while mercury curves downward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Cohesive and adhesive are easy to swap. Co means together, so cohesion is among the same molecules, and ad means towards another substance.</div>
      <div class="cp-note exam">Water rises and mercury falls in a glass capillary tube.</div>
    `
  },
  51: {
    questext: "The intermolecular force of attraction between molecules of different substances is called",
    options: ["Adhesive force", "Cohesive force", "Viscous force", "Gravitational force"],
    correct: "1",
    exptext: "✅ The pull between unlike molecules is adhesive force, for example gum on paper. 📌 Adhesive is for a different substance. ❌ Cohesive force acts between like molecules."
  },
  52: {
    type: "concept", icon: "🍯", accent: "#7c3aed", pauseTimer: true,
    title: "Viscosity",
    html: `
      <p class="cp-lead"><b>Viscosity</b> is the property of a liquid or a gas by which it opposes the relative motion between its different layers. The opposing force is called the <b>viscous force</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/37.png" alt="honey pouring from spoon slow flow photo" data-caption="Honey flows slowly because it has a high viscosity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Viscosity of a liquid is due to</td><td>The cohesive force between its molecules</td></tr><tr><td>Viscosity of a gas is due to</td><td>The movement of molecules from one layer to another</td></tr><tr><td>Viscosity of gases compared with liquids</td><td>Much less</td></tr><tr><td>Viscosity of solids</td><td>None</td></tr><tr><td>Viscosity of an ideal fluid</td><td>Zero</td></tr><tr><td>Unit of the coefficient of viscosity</td><td>Pascal second, also called decapoise</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/38.png" alt="A graph with temperature on the horizontal axis and viscosity on the vertical axis, showin" data-caption="When temperature rises, the viscosity of a liquid falls and the viscosity of a gas rises." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The temperature effect is opposite for liquids and gases. Heat makes a liquid thinner, but it makes a gas thicker.</div>
      <div class="cp-note exam">The coefficient of viscosity is written as the Greek letter eta.</div>
    `
  },
  53: {
    questext: "With a rise in temperature, the viscosity of a liquid and the viscosity of a gas respectively",
    options: ["Increase, increase", "Decrease, decrease", "Increase, decrease", "Decrease, increase"],
    correct: "4",
    exptext: "✅ The viscosity of a liquid decreases and that of a gas increases when heated. 📌 Liquid thins, gas thickens. ❌ The two do not change in the same way."
  },
  54: {
    questext: "The viscosity of an ideal fluid is",
    options: ["Infinite", "Equal to that of water", "Zero", "Equal to that of air"],
    correct: "3",
    exptext: "✅ An ideal fluid has no friction between its layers, so its viscosity is zero. 📌 Ideal means perfectly smooth flow. ❌ Water and air both have some viscosity."
  },
  55: {
    type: "concept", icon: "☔", accent: "#0d9488", pauseTimer: true,
    title: "Stokes' Law and Terminal Velocity",
    html: `
      <p class="cp-lead"><b>Stokes' law</b> says that the viscous force on a moving object depends on three things: the coefficient of viscosity of the fluid, the speed of the object and the size of the object.</p>
      <div class="cp-formula" translate="no"><small>Stokes' law for a sphere</small>F = 6 π η r v</div>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/39.png" alt="A small sphere falling through a tall jar of liquid with three arrows: weight down, buoyan" data-caption="A falling sphere is acted on by its weight, the buoyant force and the viscous force." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">When a small sphere falls through a long column of liquid, its speed first increases. The viscous force also increases with speed. At last the forces balance, and the sphere falls with a steady speed called the <b>terminal velocity</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/40.png" alt="raindrops falling rain on window photo" data-caption="Raindrops are tiny, so they reach only a small terminal velocity and do not hurt." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">The terminal velocity is proportional to the square of the radius. A very small raindrop has a very small terminal velocity, so rain does not hurt when it strikes us.</div>
      <div class="cp-note exam">When a liquid flows in a pipe, its speed is maximum near the axis and minimum near the walls.</div>
    `
  },
  56: {
    questext: "A small sphere falling through a long column of liquid finally moves with a constant velocity, which is called",
    options: ["Terminal velocity", "Escape velocity", "Orbital velocity", "Angular velocity"],
    correct: "1",
    exptext: "✅ The steady speed after the forces balance is the terminal velocity. 📌 Terminal means the last speed. ❌ Escape and orbital velocity belong to satellites."
  },
  57: {
    questext: "Raindrops do not hurt us when they strike the Earth because",
    options: ["Air has no weight", "Their radius is very small, so their terminal velocity is small", "They fall in a vacuum", "They are warm"],
    correct: "2",
    exptext: "✅ Tiny drops have a small terminal velocity, so they hit the ground slowly. 📌 Small radius means small speed. ❌ The air does not remove the weight, and there is no vacuum."
  },
  58: {
    type: "concept", icon: "🌪️", accent: "#db2777", pauseTimer: true,
    title: "Bernoulli's Theorem",
    html: `
      <p class="cp-lead"><b>Bernoulli's theorem</b> is about a liquid that flows smoothly and cannot be squeezed. It says that the total energy per unit volume stays constant, where the total is the sum of pressure energy, kinetic energy and potential energy.</p>
      <div class="cp-formula" translate="no"><small>Bernoulli's theorem</small>p + ½ρv² + ρgh = constant</div>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/41.png" alt="A horizontal pipe that is wide at both ends and narrow in the middle, with a fast arrow an" data-caption="Where the pipe is narrow the fluid moves fast and the pressure is low." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In simple words, when the speed of a fluid increases, its pressure decreases, and when the speed decreases, its pressure increases.</p>
      <table><thead><tr><th>Application</th><th>How it works</th></tr></thead><tbody><tr><td>Venturi tube</td><td>Measures the flow of a liquid from the pressure drop in the narrow part</td></tr><tr><td>Aspirator pump</td><td>Fast flowing water lowers the pressure and sucks air in</td></tr><tr><td>Roofs blown off in a storm</td><td>Fast wind above the roof lowers the pressure above, so the higher pressure below lifts the roof</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/42.png" alt="tin roof house damaged cyclone storm photo" data-caption="A strong storm can lift a light roof because the fast wind lowers the pressure above it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The roof is not pushed down by the wind. It is lifted by the higher pressure of still air underneath.</div>
      <div class="cp-note exam">The Venturi tube and the aspirator pump work on Bernoulli's theorem.</div>
    `
  },
  59: {
    questext: "The roofs of huts are blown off in a cyclone mainly because",
    options: ["The weight of the wind presses on them", "The wind heats the roof", "The air inside the hut becomes lighter by itself", "The fast wind above the roof lowers the pressure there, so a net upward force acts"],
    correct: "4",
    exptext: "✅ Fast air above the roof has low pressure, and the still air below pushes the roof upward. 📌 Fast air means low pressure. ❌ The wind does not press down, it lowers the pressure."
  },
  60: {
    questext: "The Venturi tube and the aspirator pump work on",
    options: ["Bernoulli's theorem", "Pascal's law", "Archimedes' principle", "Stokes' law"],
    correct: "1",
    exptext: "✅ Both use the fall in pressure where the fluid moves fast, which is Bernoulli's theorem. 📌 Narrow part, fast flow, low pressure. ❌ Pascal's law is about pressure in a closed fluid."
  },
  61: {
    type: "concept", icon: "🏏", accent: "#2563eb", pauseTimer: true,
    title: "Magnus Effect",
    html: `
      <p class="cp-lead">When a ball is thrown with a spin, it does not follow a straight path or a simple curve. It swerves sideways. This is called the <b>Magnus effect</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/43.png" alt="cricket swing bowler delivering ball photo" data-caption="A spinning cricket ball swerves in the air after the bowler releases it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The spin drags the air around the ball. On one side the dragged air moves in the same direction as the oncoming air, so the air there is faster and its pressure is lower. On the other side the pressure is higher. The ball is pushed towards the side of lower pressure, so its plane of motion changes.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/44.png" alt="A ball seen from above with a spin arrow, faster air on the top side labelled Low pressure" data-caption="A spinning ball is pushed towards the side where the air moves faster and the pressure is low." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The Magnus effect is explained by Bernoulli's theorem. It is not explained by Pascal's law.</div>
      <div class="cp-note exam">Swing bowling in cricket, spin in football and topspin in tennis are examples of the Magnus effect.</div>
    `
  },
  62: {
    questext: "The curving of the path of a spinning ball in air is called",
    options: ["Doppler effect", "Tyndall effect", "Magnus effect", "Compton effect"],
    correct: "3",
    exptext: "✅ A spinning ball swerves because of the Magnus effect. 📌 Magnus means spin and swerve. ❌ The Doppler effect is about sound frequency and the Tyndall effect is about scattering of light."
  },
  63: {
    questext: "The Magnus effect can be explained with the help of",
    options: ["Pascal's law", "Bernoulli's theorem", "Archimedes' principle", "Newton's law of cooling"],
    correct: "2",
    exptext: "✅ The spin makes the air faster on one side, and Bernoulli's theorem gives the lower pressure there. 📌 Fast air means low pressure. ❌ Pascal's law is for a confined liquid."
  },
  64: {
    type: "concept", icon: "🍎", accent: "#f97316", pauseTimer: true,
    title: "Gravitation and Newton's Law of Gravitation",
    html: `
      <p class="cp-lead">Every object in the universe attracts every other object because of its mass. This pull is called <b>gravitation</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/45.png" alt="Two spheres of mass m1 and m2 with arrows pulling each other and the distance r marked bet" data-caption="Two bodies pull each other with a force that depends on their masses and the distance between them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Newton's law of gravitation</b> says that the force between two point objects is directly proportional to the product of their masses and inversely proportional to the square of the distance between them.</p>
      <div class="cp-formula" translate="no"><small>Newton's law of gravitation</small>F = <span class="cp-frac"><i>G m1 m2</i><i>r²</i></span></div>
      <table><thead><tr><th>Fact</th><th>Value</th></tr></thead><tbody><tr><td>Universal gravitational constant G</td><td>6.67 × 10⁻¹¹ newton square metre per square kilogram</td></tr><tr><td>Nature of the force</td><td>Central and conservative</td></tr><tr><td>Strength</td><td>The weakest force in nature</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/46.png" alt="Isaac Newton portrait apple tree painting photo" data-caption="Isaac Newton gave the law of gravitation after thinking about a falling apple." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">If the distance between two bodies is doubled, the force becomes one fourth, not one half.</div>
      <div class="cp-note exam">Gravitational force is about 10³⁶ times smaller than the electrostatic force and about 10³⁸ times smaller than the nuclear force.</div>
    `
  },
  65: {
    questext: "What is the value of the universal gravitational constant G?",
    options: ["9.8 newton square metre per square kilogram", "6.67 × 10⁻⁹ newton square metre per square kilogram", "6.67 × 10⁻¹¹ newton square metre per square kilogram", "6.67 × 10¹¹ newton square metre per square kilogram"],
    correct: "3",
    exptext: "✅ The value of G is 6.67 × 10⁻¹¹ in the standard units. 📌 It is a very tiny number, which is why gravity is weak. ❌ 9.8 is the value of g, not G."
  },
  66: {
    questext: "Which is the weakest force in nature?",
    options: ["Gravitational force", "Electrostatic force", "Strong nuclear force", "Weak nuclear force"],
    correct: "1",
    exptext: "✅ Gravitational force is the weakest force in nature. 📌 It is small, but it acts over huge distances. ❌ The electrostatic force is about 10³⁶ times stronger."
  },
  67: {
    type: "concept", icon: "🌐", accent: "#64748b", pauseTimer: true,
    title: "Acceleration due to Gravity",
    html: `
      <p class="cp-lead">The steady acceleration given to a freely falling body by the pull of the Earth is called the <b>acceleration due to gravity</b>, written as g. Near the surface of the Earth its value is about 9.8 metre per second squared.</p>
      <div class="cp-formula" translate="no"><small>Acceleration due to gravity</small>g = <span class="cp-frac"><i>G M</i><i>R²</i></span></div>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/47.png" alt="The Earth as a slightly flattened sphere with the equatorial radius marked larger than the" data-caption="The Earth bulges at the equator, so g is smallest there and largest at the poles." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Factor</th><th>Effect on g</th></tr></thead><tbody><tr><td>Shape of the Earth</td><td>Largest at the poles and smallest at the equator</td></tr><tr><td>Rotation of the Earth</td><td>No effect at the poles, and the largest effect at the equator</td></tr><tr><td>Height above the surface</td><td>Decreases</td></tr><tr><td>Depth below the surface</td><td>Decreases, and becomes zero at the centre of the Earth</td></tr></tbody></table>
      <p class="cp-lead">The equatorial radius of the Earth is about 42 kilometres more than the polar radius. A larger distance from the centre means a smaller pull, so g is least at the equator.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/48.png" alt="A cross-section of the Earth with a line going down to the centre, and a graph showing g f" data-caption="The value of g is zero at the centre of the Earth and falls again above the surface." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Many students think g is largest at the centre of the Earth. It is actually zero there.</div>
      <div class="cp-note exam">Remember that g is maximum at the poles, minimum at the equator and zero at the centre of the Earth.</div>
    `
  },
  68: {
    questext: "The value of the acceleration due to gravity is zero at",
    options: ["The poles", "The equator", "The surface of the Earth", "The centre of the Earth"],
    correct: "4",
    exptext: "✅ At the centre, the pull of the Earth acts equally in all directions, so g is zero. 📌 Depth reduces g until it is zero. ❌ At the poles g is the largest."
  },
  69: {
    questext: "At which place on the Earth is the value of g the maximum?",
    options: ["The equator", "The poles", "The Tropic of Cancer", "The Tropic of Capricorn"],
    correct: "2",
    exptext: "✅ The Earth is flatter at the poles, so a body there is closer to the centre and g is larger. 📌 Poles are close, so g is big. ❌ The equator has the smallest g."
  },
  70: {
    questext: "As we go higher above the surface of the Earth and also deeper below the surface, the value of g respectively",
    options: ["Increases, increases", "Decreases, decreases", "Decreases, increases", "Increases, decreases"],
    correct: "2",
    exptext: "✅ The value of g decreases with height and also decreases with depth. 📌 Go away from the surface in either direction and g falls. ❌ Going deeper does not increase it."
  },
  71: {
    type: "concept", icon: "⚖️", accent: "#fb7185", pauseTimer: true,
    title: "Mass and Weight",
    html: `
      <p class="cp-lead">The <b>mass</b> of a body is the quantity of matter in it. The <b>weight</b> of a body is the force with which the Earth pulls it towards its centre.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/49.png" alt="spring balance and equal arm balance photo" data-caption="A spring balance measures weight, and an equal arm balance measures mass." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Mass</th><th>Weight</th></tr></thead><tbody><tr><td>Meaning</td><td>Quantity of matter</td><td>Force of attraction by the Earth</td></tr><tr><td>Type</td><td>Scalar</td><td>Vector</td></tr><tr><td>Unit</td><td>Kilogram</td><td>Newton</td></tr><tr><td>Measured by</td><td>Equal arm balance</td><td>Spring balance</td></tr><tr><td>Changes with place</td><td>No</td><td>Yes</td></tr><tr><td>Formula</td><td>Fixed</td><td>W = mg</td></tr></tbody></table>
      <p class="cp-lead">The <b>centre of gravity</b> of a body is the point at which the whole weight of the body appears to act. It can lie inside the body or outside the body, for example in a ring.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/50.png" alt="A ring with a dot at its centre in the empty space labelled Centre of gravity outside the " data-caption="The centre of gravity may lie inside the material of the body or outside it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A body has the same mass on the Moon and on the Earth, but its weight on the Moon is much less.</div>
      <div class="cp-note exam">Mass is a scalar and does not change. Weight is a vector and changes from place to place.</div>
    `
  },
  72: {
    questext: "Which of the following does not change from place to place?",
    options: ["Weight", "Acceleration due to gravity", "The force of the Earth on a body", "Mass"],
    correct: "4",
    exptext: "✅ Mass is the quantity of matter, so it stays the same everywhere. 📌 Mass is fixed, weight moves. ❌ Weight changes because g changes from place to place."
  },
  73: {
    questext: "The weight of a body is measured using a",
    options: ["Spring balance", "Equal arm balance", "Hydrometer", "Barometer"],
    correct: "1",
    exptext: "✅ A spring balance measures the force of gravity, which is the weight. 📌 Spring is for weight and equal arm is for mass. ❌ An equal arm balance compares masses."
  },
  74: {
    type: "concept", icon: "🛗", accent: "#2dd4bf", pauseTimer: true,
    title: "Weight in a Lift and on the Moon",
    html: `
      <p class="cp-lead">The weight that a spring balance shows is called the <b>apparent weight</b>. Inside a lift it can be different from the real weight mg, because the lift itself is moving with an acceleration a.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/51.png" alt="Four lifts in a row with a person standing on a weighing scale: one at rest, one going up " data-caption="The reading of a weighing scale changes with the motion of the lift." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Motion of the lift</th><th>Apparent weight</th></tr></thead><tbody><tr><td>At rest or at constant speed</td><td>mg, which is equal to the real weight</td></tr><tr><td>Accelerating upward</td><td>m(g + a), more than the real weight</td></tr><tr><td>Accelerating downward</td><td>m(g − a), less than the real weight</td></tr><tr><td>Falling freely</td><td>Zero, so the person feels weightless</td></tr></tbody></table>
      <p class="cp-lead">On the Moon, the mass and the radius are smaller than those of the Earth. So the value of g at the surface of the Moon is only one sixth of the value on the Earth.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/52.png" alt="astronaut on moon surface footprint photo" data-caption="Astronauts weigh only one sixth as much on the Moon as they do on the Earth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">In free fall the real weight does not become zero. Only the apparent weight becomes zero.</div>
      <div class="cp-note exam">Upward acceleration gives more weight, and downward acceleration gives less weight.</div>
    `
  },
  75: {
    questext: "A person standing in a lift that is accelerating upward feels his weight to be",
    options: ["Less than the real weight", "Equal to the real weight", "More than the real weight", "Zero"],
    correct: "3",
    exptext: "✅ The apparent weight is m(g + a), which is more than mg. 📌 Going up fast means feeling heavy. ❌ The weight is less only when the lift accelerates downward."
  },
  76: {
    questext: "If the cable of a lift breaks and the lift falls freely, the apparent weight of a person in it is",
    options: ["mg", "2mg", "mg divided by 2", "Zero"],
    correct: "4",
    exptext: "✅ In free fall a equals g, so m(g − g) is zero and the person feels weightless. 📌 Free fall means weightless. ❌ The real weight mg stays the same, but it is not felt."
  },
  77: {
    questext: "The value of the acceleration due to gravity on the surface of the Moon is",
    options: ["The same as on the Earth", "One sixth of that on the Earth", "Six times that on the Earth", "Zero"],
    correct: "2",
    exptext: "✅ The Moon has less mass and a smaller radius, so its g is one sixth of the Earth's value. 📌 Moon is one sixth. ❌ A body does not become weightless on the Moon."
  },
  78: {
    type: "concept", icon: "🛰️", accent: "#c026d3", pauseTimer: true,
    title: "Satellites",
    html: `
      <p class="cp-lead">A heavenly body that moves around a planet in a fixed path, called an orbit, is a <b>satellite</b>. The Moon is the natural satellite of the Earth, and the satellites that people launch are called artificial satellites.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/53.png" alt="PSLV rocket launch Sriharikota photo" data-caption="India launches its satellites with rockets such as the PSLV and the GSLV." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Satellite</th><th>Orbit and facts</th><th>Use</th></tr></thead><tbody><tr><td>Geostationary</td><td>Above the equator, time period 24 hours, height about 36000 kilometres, and it seems fixed in the sky</td><td>Communication, television and live telecast</td></tr><tr><td>Polar</td><td>Passes over the poles at a height of about 800 kilometres</td><td>Weather monitoring and mapping</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/54.png" alt="The Earth with an orbit ring above the equator holding a satellite labelled Geostationary," data-caption="A geostationary satellite circles over the equator, and a polar satellite circles over the poles." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A geostationary satellite takes 24 hours to go around the Earth, the same as the Earth takes to turn once. So it always stays above the same place.</p>
      <div class="cp-note trap">A geostationary satellite is not at rest. It moves, but at the same rate as the Earth turns, so it seems fixed.</div>
      <div class="cp-note exam">Remember the launching vehicles of India: the Polar Satellite Launch Vehicle (PSLV) and the Geosynchronous Satellite Launch Vehicle (GSLV).</div>
    `
  },
  79: {
    questext: "Which of the following are the launching vehicles of India for satellites?",
    options: ["Agni and Prithvi", "Nag and Akash", "PSLV and GSLV", "Trishul and Astra"],
    correct: "3",
    exptext: "✅ The PSLV and the GSLV are the satellite launch vehicles of India. 📌 The letters LV mean launch vehicle. ❌ Agni and Prithvi are missiles."
  },
  80: {
    questext: "Weather monitoring is mainly done with the help of",
    options: ["Polar satellites", "Geostationary satellites", "The Moon", "Rockets with no satellite"],
    correct: "1",
    exptext: "✅ Polar satellites pass over the poles at about 800 kilometres and watch moisture, pressure and clouds. 📌 Polar means weather. ❌ Geostationary satellites are used mainly for communication."
  },
  81: {
    questext: "Consider the following statements about a geostationary satellite:\n1. It moves in an orbit above the equator.\n2. Its time period is 12 hours.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Its time period is 24 hours, the same as the Earth. ❌ Statement 2 is wrong because 12 hours would not keep it above one place."
  },
  82: {
    type: "concept", icon: "🚀", accent: "#ea580c", pauseTimer: true,
    title: "Time Period, Orbital Velocity and Escape Velocity",
    html: `
      <p class="cp-lead">A satellite moving just above the surface of the Earth takes about 84.6 minutes to complete one revolution. Its speed in the orbit is the <b>orbital velocity</b>, and the least speed with which a body must be thrown to leave the Earth for ever is the <b>escape velocity</b>.</p>
      <div class="cp-formula" translate="no"><small>Orbital and escape velocity</small>v₀ = √(gR) and vₑ = √(2gR) = √2 × v₀</div>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/55.png" alt="The Earth with a satellite on a circle labelled Orbital velocity, and a rocket on a path l" data-caption="The escape velocity is the square root of 2 times the orbital velocity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Body</th><th>Escape velocity</th></tr></thead><tbody><tr><td>Earth</td><td>11.2 kilometres per second</td></tr><tr><td>Moon</td><td>2.4 kilometres per second</td></tr></tbody></table>
      <p class="cp-lead">The escape velocity does not depend on the mass, shape, size or direction of throw of the body. If the orbital velocity of a satellite is raised by about 41 percent, it becomes the escape velocity and the satellite leaves its orbit.</p>
      <div class="cp-fig"><img src="images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/56.png" alt="rocket launch Earth escape Saturn V Apollo photo" data-caption="A rocket must reach the escape velocity to leave the pull of the Earth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A heavier body does not need more escape velocity. The escape velocity is the same for a stone and for a rocket.</div>
      <div class="cp-note exam">The escape velocity of the Earth is 11.2 kilometres per second, and that of the Moon is 2.4 kilometres per second. It is also called the second cosmic velocity.</div>
    `
  },
  83: {
    questext: "What is the escape velocity of the Earth?",
    options: ["7.9 kilometres per second", "9.8 kilometres per second", "11.2 kilometres per second", "2.4 kilometres per second"],
    correct: "3",
    exptext: "✅ The escape velocity of the Earth is 11.2 kilometres per second. 📌 Eleven point two for the Earth and two point four for the Moon. ❌ 2.4 is the value for the Moon, and 9.8 is the value of g."
  },
  84: {
    questext: "The escape velocity from the Earth is how many times its orbital velocity?",
    options: ["2 times", "Square root of 2 times", "Half", "4 times"],
    correct: "2",
    exptext: "✅ The escape velocity is the square root of 2 times the orbital velocity. 📌 About 1.41 times. ❌ 2 times is the common mistake of forgetting the root."
  },
  85: {
    questext: "The escape velocity of a body from the Earth does not depend on",
    options: ["The mass of the Earth", "The radius of the Earth", "The value of g", "The mass of the body"],
    correct: "4",
    exptext: "✅ The escape velocity depends only on g and the radius of the Earth, not on the mass of the body. 📌 A stone and a rocket need the same speed. ❌ It does depend on the Earth's size and gravity."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a glass of water with a floating ice cube, a small blue Earth globe with an orbiting satellite, and a stretched metal spring" },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ice cubes water steam three states of matter photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/1.png. A clear photo showing ice, liquid water and steam together",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/2.png": { t: "fig", about: "Three boxes side by side labelled Solid, Liquid and Gas, with dots packed in a neat grid, loosely packed, and widely scattered." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"steel spring stretched and released photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/3.png. A coiled steel spring being stretched",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/4.png": { t: "fig", about: "Two panels: a spring stretched then returning to normal length, and a lump of clay pressed flat that stays flat, each with a label." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/5.png": { t: "fig", about: "A rod of original length L stretched by a small amount shown as delta L, with arrows and labels." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/6.png": { t: "fig", about: "A square block pushed sideways at the top so that it tilts by a small angle theta, labelled shear." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/7.png": { t: "fig", about: "A metal wire hanging with a weight at the bottom, arrows showing force F and the cross-section area A." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hollow steel shaft cross section machine photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/8.png. A hollow steel shaft shown in cross section",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/9.png": { t: "fig", about: "A stress-strain graph with the curve rising straight, bending at a point labelled Elastic limit, flattening in a region labelled Plastic behaviour, and ending at a point labelled Fracture point." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tensile test steel specimen broken at fracture photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/10.png. A steel test piece that has broken after being stretched",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/11.png": { t: "fig", about: "Two stress-strain curves: a long curve with a wide plastic region labelled Ductile, and a short curve ending soon after the elastic limit labelled Brittle." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"thin copper wire drawn coil photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/12.png. A coil of thin copper wire",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"old steel railway bridge photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/13.png. A large steel bridge with beams under load",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/14.png": { t: "fig", about: "A bridge with a vehicle crossing again and again, and a small graph beside it showing elasticity falling slowly as years pass." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"water pouring from jug into glass photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/15.png. A stream of water being poured into a glass",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hydrometer floating in liquid measuring density photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/16.png. A glass hydrometer floating in a tall jar of liquid",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/17.png": { t: "fig", about: "A box with a downward arrow labelled Force F pressing on a surface of area A, and a second box with the same force on a smaller area showing a longer arrow labelled More pressure." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sharp kitchen knife cutting vegetable photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/18.png. A sharp knife blade cutting through a vegetable",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/19.png": { t: "fig", about: "A column of air rising from the ground to the top of the sky with an arrow pressing down, labelled Weight of air above equals atmospheric pressure." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"aneroid barometer dial photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/20.png. A round aneroid barometer with a dial and a needle",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/21.png": { t: "fig", about: "A U-shaped hydraulic machine with a small piston on the left carrying force F1 over area A1, and a large piston on the right carrying force F2 over area A2, with the fluid in between." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hydraulic car lift garage photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/22.png. A car raised on a hydraulic lift in a garage",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/23.png": { t: "fig", about: "A block in water with a downward arrow labelled Weight and an upward arrow labelled Buoyant force, and a dot at the centre of the displaced water labelled Centre of buoyancy." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"person floating in swimming pool photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/24.png. A person floating on the surface of a swimming pool",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/25.png": { t: "fig", about: "A spring balance holding a stone in air showing 5 newton, and the same stone dipped in water showing 3 newton with the overflow water collected in a cup weighing 2 newton." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Archimedes statue or eureka bath illustration photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/26.png. A well known picture of Archimedes in his bath",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"iceberg floating in sea photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/27.png. A large iceberg floating in the sea with most of it under water",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/28.png": { t: "fig", about: "Two side by side beakers, one with an ice cube showing a small part above water labelled 1/12, and a sea scene with an iceberg tip labelled 1/9, the rest hidden in water." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"water droplets on leaf spherical photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/29.png. Round water droplets resting on a green leaf",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/30.png": { t: "fig", about: "A graph with temperature on the horizontal axis and surface tension on the vertical axis, a falling line reaching zero at a point marked Critical temperature." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"soap bubbles floating photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/31.png. Soap bubbles floating in the air",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/32.png": { t: "fig", about: "Two pond panels: larvae hanging from the water surface in clean water, and the larvae sinking after a layer of kerosene is spread." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/33.png": { t: "fig", about: "A thin glass tube dipped in water with the water level inside the tube higher than outside, and a second tube in mercury with the level lower inside." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"oil lamp diya wick burning photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/34.png. A burning oil lamp with its cotton wick",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/35.png": { t: "fig", about: "Two panels: water molecules pulling on each other labelled Cohesive force, and water molecules pulling on glass molecules labelled Adhesive force." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"water and mercury meniscus in glass tubes photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/36.png. A water meniscus curving up and a mercury meniscus curving down in glass tubes",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"honey pouring from spoon slow flow photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/37.png. Thick honey slowly pouring from a spoon",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/38.png": { t: "fig", about: "A graph with temperature on the horizontal axis and viscosity on the vertical axis, showing a falling line labelled Liquid and a rising line labelled Gas." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/39.png": { t: "fig", about: "A small sphere falling through a tall jar of liquid with three arrows: weight down, buoyant force up and viscous force up." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"raindrops falling rain on window photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/40.png. Raindrops falling in heavy rain",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/41.png": { t: "fig", about: "A horizontal pipe that is wide at both ends and narrow in the middle, with a fast arrow and a low-pressure label in the narrow part, and a slow arrow and a high-pressure label in the wide parts." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tin roof house damaged cyclone storm photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/42.png. A house whose tin roof has been blown off by a cyclone",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"cricket swing bowler delivering ball photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/43.png. A cricket bowler releasing a spinning ball",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/44.png": { t: "fig", about: "A ball seen from above with a spin arrow, faster air on the top side labelled Low pressure, slower air on the bottom side labelled High pressure, and a sideways arrow labelled Swerve." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/45.png": { t: "fig", about: "Two spheres of mass m1 and m2 with arrows pulling each other and the distance r marked between their centres." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Isaac Newton portrait apple tree painting photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/46.png. A well known painting of Isaac Newton",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/47.png": { t: "fig", about: "The Earth as a slightly flattened sphere with the equatorial radius marked larger than the polar radius, and g labelled Maximum at the poles and Minimum at the equator." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/48.png": { t: "fig", about: "A cross-section of the Earth with a line going down to the centre, and a graph showing g falling to zero at the centre and falling again outside the surface." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/49.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"spring balance and equal arm balance photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/49.png. A spring balance placed beside a pan balance",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/50.png": { t: "fig", about: "A ring with a dot at its centre in the empty space labelled Centre of gravity outside the material, and a solid ball with a dot inside labelled Centre of gravity inside." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/51.png": { t: "fig", about: "Four lifts in a row with a person standing on a weighing scale: one at rest, one going up faster, one going down faster, and one falling freely, each with an arrow and the scale reading." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/52.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"astronaut on moon surface footprint photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/52.png. An astronaut walking on the surface of the Moon",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/53.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"PSLV rocket launch Sriharikota photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/53.png. An Indian rocket lifting off with a satellite",
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/54.png": { t: "fig", about: "The Earth with an orbit ring above the equator holding a satellite labelled Geostationary, and a second ring passing over the north and south poles labelled Polar." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/55.png": { t: "fig", about: "The Earth with a satellite on a circle labelled Orbital velocity, and a rocket on a path leaving the Earth labelled Escape velocity, with the ratio root 2 written between them." },
  "images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/56.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rocket launch Earth escape Saturn V Apollo photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Properties_of_Matter_and_Gravitation/56.png. A large rocket leaving the launch pad"
});

/* CHANGE LOG
   - Matter is defined as anything that has mass and occupies space (the original said weight).
   - Shearing strain is the angle through which the faces of the body are turned, not a ratio written as angle change divided by angle.
   - Added the value of atmospheric pressure (about 101325 pascal) and the unit of Young's modulus.
   - Added the explanation of why mercury falls and water rises in a capillary tube (cohesive versus adhesive force), because only the examples were listed.
   - Rewrote the Magnus effect with its cause (a pressure difference on the two sides of a spinning ball); the original only said the plane of motion changes.
   - Added the height of a geostationary satellite (about 36000 kilometres).
   - Corrected the typing slips: liquid (not quid) and the effect of the Earth's rotation on g, which is zero at the poles and largest at the equator.
*/