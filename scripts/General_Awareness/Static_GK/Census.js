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

/* Field: General_Awareness · Subject: Static_GK · Chapter: Census_of_India · 9 concept pages (+ overview) · 24 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🧮", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Census of India",
    thumb: {
      image: "images/General_Awareness/Static_GK/Census_of_India/thumbnail.png",
      banner: "STATIC GK 2026",
      line1: "CENSUS 2011",
      line2: "HIGHEST • LOWEST",
      line3: "ALL KEY DATA",
      badge: "FULL CLASS",
      ribbon: "POPULATION • SEX RATIO • LITERACY",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Census of India 2011 | Highest and Lowest Tricks | Static GK",
      altTitles: ["Census 2011 Complete Static GK in One Class", "Census Tricks: Population, Sex Ratio, Literacy"],
      description: "Census questions are sure marks in Static GK. In this class we learn the data of Census 2011 with a simple order for each topic, so you can answer highest and lowest questions in seconds.\n\n📌 IN THIS CLASS\n✅ Population and growth rate\n✅ Sex ratio and child sex ratio\n✅ Literacy, density and rural-urban data\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Basic idea\n\n👍 Like, share, subscribe.\n\n#SSCCGL #StaticGK #Census",
      tags: ["census 2011", "census of india", "census 2011 static gk", "census tricks", "population of india", "sex ratio 2011", "literacy rate 2011", "population density india", "ssc cgl static gk", "static gk", "india census data", "highest lowest census", "child sex ratio", "growth rate 2011", "rural urban population", "census 2027", "gk for competitive exams", "railway exam gk", "banking exam gk", "defence exam gk", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "Census of India Static_GK Cens"],
      hashtags: ["SSCCGL", "StaticGK", "Census"],
      thumbText: "CENSUS 2011 TRICKS",
      pinnedComment: "📌 Which dance did you find hardest? Write the dance and state below 👇",
      communityPost: "🧮 New class is live: Census of India with highest and lowest tricks. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Basic idea",
      playlist: "Static GK — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple class on the Census of India, based on the figures of Census 2011</u>. Exams ask which state is highest or lowest in each measure, so we learn the numbers and the order in an easy way.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>9</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>24</b><span>Questions</span></div>
        <div class="cp-stat"><b>~42 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Basic Idea</b><br>What a census is, who conducts it, and the main dates, including Census 2027.</li>
        <li><b>Population and Growth Rate</b><br>The total population, the most and least populous places, and how fast the population grew.</li>
        <li><b>Children and Sex Ratio</b><br>The population aged 0 to 6 years, the sex ratio and the child sex ratio.</li>
        <li><b>Literacy</b><br>How many people can read and write, and which places lead or lag.</li>
        <li><b>Density and Rural-Urban Divide</b><br>How crowded each place is, and how many people live in villages and in towns.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Census questions are asked in almost every Static General Knowledge paper, and most of them ask for the highest or the lowest place, which is easy to learn.</div>
    `
  },
  2: {
    type: "concept", icon: "🧮", accent: "#4f46e5", pauseTimer: true,
    title: "Census — The Basic Idea",
    html: `
      <p class="cp-lead">A census is the official head count of all the people of a country. In India it is held <u>once every ten years</u>, and it gives the numbers that the government uses to plan schools, hospitals, jobs and seats in Parliament.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/1.png" alt="Census enumerator visiting house India photo" data-caption="A census enumerator records the details of a family at their home." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/2.png" alt="Timeline: 1872 first attempt, 1881 first regular census, 1951 first after Independence, 20" data-caption="The main dates in the history of the census of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The first attempt to count the people was made in 1872 during the time of Lord Mayo. The first regular census, in which the whole country was counted on the same date, was held in 1881 during the time of Lord Ripon. Since then it has been held every ten years.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Authority</td><td>Registrar General and Census Commissioner of India, under the Ministry of Home Affairs</td></tr><tr><td>Law</td><td>Census Act, 1948</td></tr><tr><td>First after Independence</td><td>1951</td></tr><tr><td>Census 2011</td><td>Fifteenth census and seventh after Independence</td></tr><tr><td>Census 2027</td><td>Sixteenth census, first digital census, with caste counted</td></tr></tbody></table>
      <div class="cp-note trap">The year 2011 is the fifteenth census of India but only the seventh census after Independence. Do not mix the two counts.</div>
      <div class="cp-note exam">The next census is Census 2027. Its reference date is 1 March 2027, and 1 October 2026 for snow-bound areas such as Ladakh. The census of 2021 was delayed because of the Covid-19 pandemic.</div>
      <div class="cp-mnemonic">Remember the order of 2011 numbers: population, growth, literacy, sex ratio, density.</div>
    `
  },
  3: {
    questext: "Which authority conducts the census of India?",
    options: ["Registrar General and Census Commissioner of India", "Reserve Bank of India", "Election Commission of India", "National Sample Survey Office"],
    correct: "1",
    exptext: "✅ The Registrar General and Census Commissioner works under the Ministry of Home Affairs and runs the census. 📌 Census means head count, and home affairs keeps the records. ❌ The National Sample Survey Office is tempting because it also collects data, but it only runs sample surveys."
  },
  4: {
    questext: "Consider the following statements about the census of India:\n1. The first regular census of India was held in 1881.\n2. Census 2011 was the seventh census after Independence.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Count 1951, 1961, 1971, 1981, 1991, 2001, 2011 to get seven. ❌ \"Only 1\" is tempting because 2011 is called the fifteenth census, but it is the seventh after Independence."
  },
  5: {
    type: "concept", icon: "👥", accent: "#22c55e", pauseTimer: true,
    title: "Population",
    html: `
      <p class="cp-lead">India had <u>1210.2 million people (1.21 billion) in 2011</u>, which was 17.5 percent of the population of the whole world.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/3.png" alt="Crowded street India population photo" data-caption="A crowded street in India shows the size of its population." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/4.png" alt="A bar picture: Male 623.7 million (51.54 percent) and Female 586.5 million (48.46 percent)" data-caption="Males formed a little more than half of the people of India in 2011." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Of the 1210.2 million people, 623.7 million were males and 586.5 million were females. Uttar Pradesh is the most populous state, and it has more people than most countries of the world. Sikkim has the fewest people among the states.</p>
      <table><thead><tr><th>Level</th><th>Highest</th><th>Lowest</th></tr></thead><tbody><tr><td>State</td><td>Uttar Pradesh, then Maharashtra, then Bihar</td><td>Sikkim, then Mizoram, then Arunachal Pradesh</td></tr><tr><td>Union Territory</td><td>Delhi</td><td>Lakshadweep</td></tr><tr><td>District</td><td>Thane (Maharashtra)</td><td>Dibang Valley (Arunachal Pradesh)</td></tr><tr><td>City</td><td>Mumbai</td><td>Kapurthala (Punjab)</td></tr></tbody></table>
      <div class="cp-note trap">Delhi is the biggest Union Territory (a region run directly by the central government), but it is not a state. Do not choose it as a state.</div>
      <div class="cp-note exam">The three most populous states, Uttar Pradesh, Maharashtra and Bihar, are asked often. Thane is the most populous district of India.</div>
    `
  },
  6: {
    questext: "Which state has the lowest population in India?",
    options: ["Sikkim", "Goa", "Mizoram", "Arunachal Pradesh"],
    correct: "1",
    exptext: "✅ Sikkim has the lowest population among the states. 📌 The order from the bottom is Sikkim, Mizoram, Arunachal Pradesh. ❌ Goa is tempting because it is small in area, but it has more people than Sikkim."
  },
  7: {
    questext: "Which is the most populous district of India according to Census 2011?",
    options: ["Mumbai", "Pune", "North 24 Parganas", "Thane"],
    correct: "4",
    exptext: "✅ Thane in Maharashtra is the most populous district. 📌 Mumbai is the top city, and Thane is the top district. ❌ Mumbai is tempting because it is a city, but the city and the district are different things."
  },
  8: {
    questext: "Consider the following statements about the population of India in 2011:\n1. India had about 17.5 percent of the world population.\n2. Lakshadweep is the Union Territory with the highest population.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Delhi has the highest and Lakshadweep has the lowest population among Union Territories. ❌ Statement 2 is wrong because it reverses this fact."
  },
  9: {
    type: "concept", icon: "📈", accent: "#f59e0b", pauseTimer: true,
    title: "Growth Rate",
    html: `
      <p class="cp-lead">The population of India grew by <u>17.64 percent between 2001 and 2011</u>, which added about 18.1 crore people.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/5.png" alt="A line chart of decadal growth with two points: 2001 about 21.5 percent and 2011 17.64 per" data-caption="Population growth slowed down in the ten years up to 2011." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/6.png" alt="Nagaland hills village photo" data-caption="A hill village in Nagaland, the state where the population fell between 2001 and 2011." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The growth rate is how fast the population rises in a period. The yearly rate was 1.64 percent. For men the ten-year growth was 17.19 percent, and for women it was 18.12 percent, so women grew faster than men.</p>
      <table><thead><tr><th>Level</th><th>Highest</th><th>Lowest</th></tr></thead><tbody><tr><td>State</td><td>Meghalaya (27.8 percent), then Arunachal Pradesh, then Bihar</td><td>Nagaland (minus 0.47 percent), then Kerala, then Goa</td></tr><tr><td>Union Territory</td><td>Dadra and Nagar Haveli (55.5 percent)</td><td>Not asked often</td></tr><tr><td>District</td><td>Kurung Kumey, Arunachal Pradesh (111 percent)</td><td>Longleng, Nagaland</td></tr></tbody></table>
      <div class="cp-note trap">Nagaland is the only state with a negative growth rate. Do not choose Kerala, which is the second lowest and still positive.</div>
      <div class="cp-note exam">Meghalaya has the fastest growth among states, and Dadra and Nagar Haveli is fastest among Union Territories.</div>
    `
  },
  10: {
    questext: "Which state had the highest decadal population growth rate in Census 2011?",
    options: ["Bihar", "Meghalaya", "Arunachal Pradesh", "Uttar Pradesh"],
    correct: "2",
    exptext: "✅ Meghalaya grew by 27.8 percent, the highest among states. 📌 The order is Meghalaya, Arunachal Pradesh, Bihar. ❌ Bihar is tempting because it is a populous state, but its growth rate was lower."
  },
  11: {
    questext: "Which state recorded a negative population growth rate between 2001 and 2011?",
    options: ["Kerala", "Goa", "Sikkim", "Nagaland"],
    correct: "4",
    exptext: "✅ Nagaland had a growth rate of minus 0.47 percent. 📌 Remember N for Negative and N for Nagaland. ❌ Kerala is tempting because it grows slowly, but its growth stayed positive."
  },
  12: {
    questext: "Consider the following statements about the growth rate in Census 2011:\n1. The decadal growth rate of India was 17.64 percent.\n2. Male growth was higher than female growth.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Neither 1 nor 2", "Only 1", "Both 1 and 2"],
    correct: "3",
    exptext: "✅ Only statement 1 is correct. 📌 Males grew by 17.19 percent and females by 18.12 percent. ❌ Statement 2 is wrong because female growth was higher."
  },
  13: {
    type: "concept", icon: "👶", accent: "#ef4444", pauseTimer: true,
    title: "Population Aged 0 to 6 Years",
    html: `
      <p class="cp-lead">Children between 0 and 6 years numbered <u>158.8 million in 2011, which was 13.1 percent of the total population</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/7.png" alt="A donut picture: 13.1 percent children aged 0 to 6 years, with 86.9 percent others." data-caption="Children up to six years of age formed about one in eight Indians." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/8.png" alt="Anganwadi children India photo" data-caption="Young children in an Anganwadi centre, the village centre for children up to six years." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Census counts the young children separately because the literacy rate and many schemes for children use this group. Bihar has the largest number of such children, because its overall population is large and its families are big. Lakshadweep has the fewest.</p>
      <table><thead><tr><th>Level</th><th>Highest</th><th>Lowest</th></tr></thead><tbody><tr><td>State or Union Territory</td><td>Bihar</td><td>Lakshadweep</td></tr><tr><td>District</td><td>Kupwara (Jammu and Kashmir)</td><td>Kolkata</td></tr></tbody></table>
      <div class="cp-note trap">Highest in number is not the same as highest in share. Questions here ask for the largest number of children.</div>
      <div class="cp-note exam">The share of children fell from 15.9 percent in 2001 to 13.1 percent in 2011.</div>
    `
  },
  14: {
    questext: "Which state has the highest population in the age group 0 to 6 years?",
    options: ["Uttar Pradesh", "Bihar", "Maharashtra", "Rajasthan"],
    correct: "2",
    exptext: "✅ Bihar has the highest child population of ages 0 to 6 as its share is the largest. 📌 Bihar is first in children, but Uttar Pradesh is first in total people. ❌ Uttar Pradesh is tempting because it is the largest state."
  },
  15: {
    questext: "Which district has the lowest child population aged 0 to 6 years?",
    options: ["Dibang Valley", "Kolkata", "Kupwara", "Thane"],
    correct: "2",
    exptext: "✅ Kolkata has the lowest child population among districts. 📌 Kupwara is the highest and Kolkata is the lowest. ❌ Dibang Valley is tempting because it has the fewest people, but Kolkata is the answer in this list."
  },
  16: {
    type: "concept", icon: "⚖️", accent: "#8b5cf6", pauseTimer: true,
    title: "Sex Ratio",
    html: `
      <p class="cp-lead">The sex ratio is <u>the number of females for every 1000 males</u>. In India it rose from 933 in 2001 to 943 in 2011.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/9.png" alt="A simple balance scale: 1000 males on one side and 943 females on the other, labelled Sex " data-caption="The sex ratio of 943 means 943 women for every 1000 men." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/10.png" alt="Kerala backwaters village women photo" data-caption="Kerala is the state with the highest sex ratio in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>A ratio below 1000 means fewer women than men. Kerala is the only large state with more women than men. Haryana has the lowest ratio among the states, which is why it is often asked in exams.</p>
      <table><thead><tr><th>Level</th><th>Highest</th><th>Lowest</th></tr></thead><tbody><tr><td>State</td><td>Kerala (1084), then Tamil Nadu (996)</td><td>Haryana (879), then Jammu and Kashmir (889)</td></tr><tr><td>Union Territory</td><td>Puducherry (1037)</td><td>Daman and Diu (618)</td></tr><tr><td>District</td><td>Mahe (Puducherry)</td><td>Daman</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix the sex ratio with the share of women. The sex ratio is measured per 1000 males.</div>
      <div class="cp-note exam">The ratio of 943 in 2011 is the highest since 1971, and Kerala has led the list for many censuses.</div>
      <div class="cp-mnemonic">Kerala is the Queen, Haryana is the Lowest.</div>
    `
  },
  17: {
    questext: "Which state has the highest sex ratio according to Census 2011?",
    options: ["Tamil Nadu", "Puducherry", "Odisha", "Kerala"],
    correct: "4",
    exptext: "✅ Kerala has 1084 females per 1000 males. 📌 Kerala is first and Tamil Nadu is second. ❌ Puducherry is tempting because it has 1037, but that is a Union Territory and not a state."
  },
  18: {
    questext: "Which Union Territory has the lowest sex ratio in India?",
    options: ["Daman and Diu", "Delhi", "Chandigarh", "Lakshadweep"],
    correct: "1",
    exptext: "✅ Daman and Diu has a ratio of 618, the lowest. 📌 Puducherry is highest and Daman and Diu is lowest. ❌ Delhi is tempting because its ratio is also low, but it is higher than 618."
  },
  19: {
    questext: "Consider the following statements about the sex ratio in 2011:\n1. The sex ratio of India was 943.\n2. Haryana has the lowest sex ratio among the states.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 India stands at 943 and Haryana at 879. ❌ \"Only 1\" is tempting because India's number is better known, but the Haryana fact is also true."
  },
  20: {
    type: "concept", icon: "🍼", accent: "#14b8a6", pauseTimer: true,
    title: "Child Sex Ratio (0 to 6 Years)",
    html: `
      <p class="cp-lead">The child sex ratio is the <u>number of girls for every 1000 boys aged 0 to 6 years</u>. It fell from 927 in 2001 to 919 in 2011.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/11.png" alt="Two bars: 2001 child sex ratio 927 and 2011 child sex ratio 919, with a downward arrow." data-caption="The number of girls per 1000 boys fell between 2001 and 2011." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/12.png" alt="Haryana girl child Beti Bachao Beti Padhao campaign photo" data-caption="A campaign encourages families to protect and educate the girl child." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>This is the only major measure in which India went down. The overall sex ratio improved, but the number of young girls fell. This is why the government started campaigns to save and educate the girl child.</p>
      <table><thead><tr><th>Level</th><th>Highest</th><th>Lowest</th></tr></thead><tbody><tr><td>State</td><td>Arunachal Pradesh (972), then Mizoram (970)</td><td>Haryana (834), then Punjab (846)</td></tr><tr><td>Union Territory</td><td>Andaman and Nicobar Islands (968)</td><td>Delhi (871)</td></tr><tr><td>District</td><td>Lahaul and Spiti, Himachal Pradesh (1013)</td><td>Jhajjar, Haryana (774)</td></tr></tbody></table>
      <div class="cp-note trap">Kerala leads the overall sex ratio, but Arunachal Pradesh leads the child sex ratio. Do not mix them.</div>
      <div class="cp-note exam">Haryana is lowest in both the overall and the child sex ratio among the states.</div>
    `
  },
  21: {
    questext: "Which state has the highest child sex ratio in Census 2011?",
    options: ["Kerala", "Arunachal Pradesh", "Haryana", "Tamil Nadu"],
    correct: "2",
    exptext: "✅ Arunachal Pradesh has 972 girls per 1000 boys aged 0 to 6. 📌 The leaders are Arunachal Pradesh, then Mizoram. ❌ Kerala is tempting because it leads in the overall sex ratio, but not in the child ratio."
  },
  22: {
    questext: "Which district has the lowest child sex ratio in India?",
    options: ["Jhajjar", "Lahaul and Spiti", "Kupwara", "Mahe"],
    correct: "1",
    exptext: "✅ Jhajjar in Haryana has the lowest child sex ratio. 📌 J for Jhajjar and J for the lowest. ❌ Lahaul and Spiti is tempting because it is a Himachal district, but it has the highest ratio."
  },
  23: {
    questext: "The child sex ratio of India changed from 927 in 2001 to what in 2011?",
    options: ["919", "943", "933", "927"],
    correct: "1",
    exptext: "✅ The child sex ratio fell to 919 in 2011. 📌 The overall ratio rose to 943 but the child ratio fell. ❌ 943 is tempting because it is the overall ratio."
  },
  24: {
    type: "concept", icon: "📚", accent: "#3b82f6", pauseTimer: true,
    title: "Literacy Rate",
    html: `
      <p class="cp-lead">The literacy rate of India rose from 64.83 percent in 2001 to <u>74.04 percent in 2011</u>, an increase of about 9.2 percentage points.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/13.png" alt="Three bars: Total 74.04 percent, Male 82.14 percent, Female 65.46 percent, with a gap labe" data-caption="Male literacy is higher than female literacy by 16.68 points." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/14.png" alt="Kerala school children classroom photo" data-caption="School children in a Kerala classroom, in the most literate state of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>A person is called literate if he or she is aged seven or above and can read and write with understanding in any language. The gap between male literacy (82.14 percent) and female literacy (65.46 percent) was 16.68 points.</p>
      <table><thead><tr><th>Level</th><th>Highest</th><th>Lowest</th></tr></thead><tbody><tr><td>State</td><td>Kerala (94 percent), then Mizoram (91.33 percent)</td><td>Bihar (61.8 percent), then Arunachal Pradesh (65.38 percent)</td></tr><tr><td>Union Territory</td><td>Lakshadweep (91.85 percent)</td><td>Dadra and Nagar Haveli (77.24 percent)</td></tr><tr><td>District</td><td>Serchhip, Mizoram</td><td>Alirajpur, Madhya Pradesh</td></tr></tbody></table>
      <div class="cp-note trap">Literacy is counted for people aged seven and above, not for the whole population.</div>
      <div class="cp-note exam">Kerala is first, and Bihar is last among the states. Serchhip in Mizoram is the most literate district.</div>
      <div class="cp-mnemonic">Kerala is Top, Bihar is Bottom.</div>
    `
  },
  25: {
    questext: "Which state has the highest literacy rate according to Census 2011?",
    options: ["Mizoram", "Goa", "Tripura", "Kerala"],
    correct: "4",
    exptext: "✅ Kerala has the highest literacy rate, about 94 percent. 📌 The order is Kerala, then Mizoram. ❌ Mizoram is tempting because it is a close second, but it is not first."
  },
  26: {
    questext: "Which district of India has the highest literacy rate?",
    options: ["Alirajpur", "Kolkata", "Thane", "Serchhip"],
    correct: "4",
    exptext: "✅ Serchhip in Mizoram has the highest literacy among districts. 📌 Serchhip is the top and Alirajpur is the bottom. ❌ Alirajpur is tempting because it is also asked often, but it has the lowest."
  },
  27: {
    questext: "Consider the following statements about literacy in Census 2011:\n1. The literacy rate of India was 74.04 percent.\n2. Female literacy was higher than male literacy.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Male literacy was 82.14 percent and female was 65.46 percent. ❌ Statement 2 is wrong because the gap was 16.68 points in favour of men."
  },
  28: {
    type: "concept", icon: "🏙️", accent: "#f97316", pauseTimer: true,
    title: "Population Density",
    html: `
      <p class="cp-lead">Population density is <u>the number of people living in one square kilometre</u>. India's density rose from 325 in 2001 to 382 in 2011.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/15.png" alt="Two bars: 2001 density 325 and 2011 density 382 persons per square kilometre." data-caption="India's density rose from 325 to 382 people per square kilometre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/16.png" alt="Delhi crowded market Chandni Chowk photo" data-caption="A crowded market in Delhi, the most densely populated Union Territory." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>A high density means that many people share a small area. Bihar is the most densely populated state, and Arunachal Pradesh is the least densely populated. Delhi is far ahead of every other region.</p>
      <table><thead><tr><th>Level</th><th>Highest</th><th>Lowest</th></tr></thead><tbody><tr><td>State</td><td>Bihar (1106), then West Bengal, then Kerala</td><td>Arunachal Pradesh (17), then Mizoram (52)</td></tr><tr><td>Union Territory</td><td>Delhi (11320)</td><td>Andaman and Nicobar Islands (46)</td></tr><tr><td>District</td><td>North East Delhi</td><td>Dibang Valley</td></tr></tbody></table>
      <div class="cp-note trap">Uttar Pradesh has the most people, but Bihar has the highest density. The two are different measures.</div>
      <div class="cp-note exam">Bihar is first in density, and Arunachal Pradesh is the lowest, with only 17 people per square kilometre.</div>
    `
  },
  29: {
    questext: "Which state has the highest population density?",
    options: ["Uttar Pradesh", "West Bengal", "Bihar", "Kerala"],
    correct: "3",
    exptext: "✅ Bihar has a density of 1106 people per square kilometre. 📌 Remember the order Bihar, West Bengal, Kerala. ❌ Uttar Pradesh is tempting because it has the most people, but its area is larger."
  },
  30: {
    questext: "Which state has the lowest population density in India?",
    options: ["Mizoram", "Sikkim", "Arunachal Pradesh", "Nagaland"],
    correct: "3",
    exptext: "✅ Arunachal Pradesh has only 17 people per square kilometre. 📌 It is mountainous and thinly populated. ❌ Mizoram is tempting because it is the second lowest, with 52."
  },
  31: {
    type: "concept", icon: "🏡", accent: "#84cc16", pauseTimer: true,
    title: "Rural and Urban Divide",
    html: `
      <p class="cp-lead">About <u>68.8 percent of Indians lived in rural areas and 31.2 percent in urban areas</u> in 2011, which means that two out of three Indians lived in villages.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/17.png" alt="A split bar: Rural 833.1 million (68.8 percent) and Urban 377.1 million (31.2 percent)." data-caption="Rural people were about twice as many as urban people in 2011." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Census_of_India/18.png" alt="Goa urban town street photo" data-caption="Goa is the most urbanised state, with more than 62 percent of its people in towns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Rural means people living in villages, and urban means people living in towns and cities. The rural population was 833.1 million and the urban population was 377.1 million.</p>
      <table><thead><tr><th>Group</th><th>Top 3</th><th>Bottom 3</th></tr></thead><tbody><tr><td>Rural population</td><td>Uttar Pradesh, Bihar, West Bengal</td><td>Sikkim, Mizoram, Goa</td></tr><tr><td>Urban population</td><td>Maharashtra, Uttar Pradesh, Tamil Nadu</td><td>Sikkim, Arunachal Pradesh, Mizoram</td></tr><tr><td>Rural share</td><td>Himachal Pradesh (89.9 percent), Bihar (88.7 percent), Assam (85.92 percent)</td><td>Not asked often</td></tr><tr><td>Urban share</td><td>Goa (62.17 percent), Tamil Nadu (48.3 percent), Kerala (47.7 percent)</td><td>Not asked often</td></tr></tbody></table>
      <div class="cp-note trap">Uttar Pradesh is first in rural numbers, but Maharashtra is first in urban numbers.</div>
      <div class="cp-note exam">Himachal Pradesh has the highest rural share, and Goa has the highest urban share.</div>
    `
  },
  32: {
    questext: "Which state has the highest percentage of urban population?",
    options: ["Tamil Nadu", "Kerala", "Maharashtra", "Goa"],
    correct: "4",
    exptext: "✅ Goa has 62.17 percent urban population. 📌 The order is Goa, Tamil Nadu, Kerala. ❌ Maharashtra is tempting because it has the highest urban number, but not the highest share."
  },
  33: {
    questext: "Which state has the highest rural population in numbers?",
    options: ["Bihar", "Uttar Pradesh", "West Bengal", "Himachal Pradesh"],
    correct: "2",
    exptext: "✅ Uttar Pradesh has the largest rural population. 📌 The order is Uttar Pradesh, Bihar, West Bengal. ❌ Himachal Pradesh is tempting because it has the highest rural share, but its numbers are small."
  },
  34: {
    questext: "Consider the following statements about rural and urban population:\n1. The rural population of India was about 68.8 percent in 2011.\n2. Maharashtra has the highest urban population in numbers.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Rural is 68.8 percent and Maharashtra leads in urban numbers. ❌ \"Only 1\" is tempting because the rural figure is better known."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Static_GK/Census_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a crowd of tiny people figures forming the outline of India, a magnifying glass and a rising bar chart" },
  "images/General_Awareness/Static_GK/Census_of_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Census enumerator visiting house India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Census_of_India/1.png. an enumerator noting details at a doorstep",
  "images/General_Awareness/Static_GK/Census_of_India/2.png": { t: "fig", about: "Timeline: 1872 first attempt, 1881 first regular census, 1951 first after Independence, 2011 fifteenth census, 2027 sixteenth census." },
  "images/General_Awareness/Static_GK/Census_of_India/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Crowded street India population photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Census_of_India/3.png. a crowded Indian street",
  "images/General_Awareness/Static_GK/Census_of_India/4.png": { t: "fig", about: "A bar picture: Male 623.7 million (51.54 percent) and Female 586.5 million (48.46 percent), with total 1210.2 million." },
  "images/General_Awareness/Static_GK/Census_of_India/5.png": { t: "fig", about: "A line chart of decadal growth with two points: 2001 about 21.5 percent and 2011 17.64 percent, and an arrow showing a fall." },
  "images/General_Awareness/Static_GK/Census_of_India/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nagaland hills village photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Census_of_India/6.png. a hill village in Nagaland",
  "images/General_Awareness/Static_GK/Census_of_India/7.png": { t: "fig", about: "A donut picture: 13.1 percent children aged 0 to 6 years, with 86.9 percent others." },
  "images/General_Awareness/Static_GK/Census_of_India/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Anganwadi children India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Census_of_India/8.png. young children at a village centre",
  "images/General_Awareness/Static_GK/Census_of_India/9.png": { t: "fig", about: "A simple balance scale: 1000 males on one side and 943 females on the other, labelled Sex ratio 2011 = 943." },
  "images/General_Awareness/Static_GK/Census_of_India/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kerala backwaters village women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Census_of_India/10.png. women in Kerala",
  "images/General_Awareness/Static_GK/Census_of_India/11.png": { t: "fig", about: "Two bars: 2001 child sex ratio 927 and 2011 child sex ratio 919, with a downward arrow." },
  "images/General_Awareness/Static_GK/Census_of_India/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Haryana girl child Beti Bachao Beti Padhao campaign photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Census_of_India/12.png. a campaign poster for girls",
  "images/General_Awareness/Static_GK/Census_of_India/13.png": { t: "fig", about: "Three bars: Total 74.04 percent, Male 82.14 percent, Female 65.46 percent, with a gap labelled 16.68." },
  "images/General_Awareness/Static_GK/Census_of_India/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kerala school children classroom photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Census_of_India/14.png. school children in Kerala",
  "images/General_Awareness/Static_GK/Census_of_India/15.png": { t: "fig", about: "Two bars: 2001 density 325 and 2011 density 382 persons per square kilometre." },
  "images/General_Awareness/Static_GK/Census_of_India/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Delhi crowded market Chandni Chowk photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Census_of_India/16.png. a crowded market in Delhi",
  "images/General_Awareness/Static_GK/Census_of_India/17.png": { t: "fig", about: "A split bar: Rural 833.1 million (68.8 percent) and Urban 377.1 million (31.2 percent)." },
  "images/General_Awareness/Static_GK/Census_of_India/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Goa urban town street photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Census_of_India/18.png. a town street in Goa"
});

/* CHANGE LOG
   - The fourth lowest urban population state is written as Arunachal Pradesh (the map shows Andhra Pradesh).
   - The spelling Anual is corrected to annual and Dibang Valley uses the standard spelling.
   - Figures for density, literacy and child sex ratio follow the commonly used Census 2011 tables; a few values differ slightly between provisional and final releases.
   - Census 2027 details are added: sixteenth census, first digital census, caste counted, reference date 1 March 2027.
*/