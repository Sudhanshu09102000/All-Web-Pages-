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

/* Field: General_Awareness · Subject: Art_and_Culture · Chapter: Classical_Dances_Exponents · 10 concept pages (+ overview) · 46 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Classical Dances and Their Exponents",
    thumb: {
      image: "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "CLASSICAL DANCES",
      line2: "ALL EXPONENTS",
      line3: "STATIC GK",
      badge: "FULL CLASS",
      ribbon: "FACTS • EXPONENTS • TRICKS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Classical Dances of India & Exponents | Static GK for SSC CGL",
      altTitles: ["8 Classical Dances and Their Exponents in One Class", "Classical Dance Exponents Trick for All Exams"],
      description: "Classical dances and their exponents are sure-shot marks in Static GK. In this class you learn all eight dances, their states, elements, famous artists and organisations in a clear, simple way.\n\n📌 IN THIS CLASS\n✅ Facts, Lasya and Tandava\n✅ Bharatanatyam, Kuchipudi, Mohiniyattam, Kathakali\n✅ Odissi, Kathak, Manipuri, Sattriya\n✅ Dance organisations\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Facts\n\n👍 Like, share, subscribe.\n\n#SSCCGL #StaticGK #ClassicalDances",
      tags: ["classical dances of india", "classical dance exponents", "static gk", "static gk for ssc cgl", "bharatanatyam exponents", "kuchipudi exponents", "kathak exponents", "odissi exponents", "mohiniyattam", "kathakali", "manipuri dance", "sattriya dance", "indian art and culture", "dance and element trick", "ssc cgl gk", "railways gk", "banking gk", "dance organisations", "sangeet natak akademi", "competitive exams gk", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "Classical Dances Exponents A"],
      hashtags: ["SSCCGL", "StaticGK", "ClassicalDances"],
      thumbText: "CLASSICAL DANCES + EXPONENTS",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "💃 New class is live: Classical Dances and Exponents. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Facts\n00:00 Bharatanatyam\n00:00 Kuchipudi\n00:00 Mohiniyattam\n00:00 Kathakali\n00:00 Odissi\n00:00 Kathak\n00:00 Manipuri\n00:00 Sattriya\n00:00 Organisations",
      playlist: "Static GK — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the eight classical dances of India and the famous artists linked with each one</u>. Exponent names are asked again and again in Static General Knowledge, so we will learn them with clear patterns.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>10</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>46</b><span>Questions</span></div>
        <div class="cp-stat"><b>~66 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Facts About Classical Dances</b><br>The total number of classical dances, the old books that describe them, and the two natures of dance: Lasya and Tandava.</li>
        <li><b>Bharatanatyam</b><br>The fire dance of Tamil Nadu, its old names, how it was revived, and its most famous dancers.</li>
        <li><b>Kuchipudi</b><br>The earth dance of Andhra Pradesh, who gave it shape, and why it was first danced by Brahmin boys.</li>
        <li><b>Mohiniyattam</b><br>The air dance of Kerala, its soft and swaying style, and who brought it back to life.</li>
        <li><b>Kathakali</b><br>The story dance of Kerala, its five make-up types, and its main artists.</li>
        <li><b>Odissi</b><br>The water dance of Odisha, the pattern in its exponent names, and the leading dancers.</li>
        <li><b>Kathak</b><br>The dance of Uttar Pradesh with Persian touches, its royal patron, and the family of Maharaj artists.</li>
        <li><b>Manipuri</b><br>The gentle dance of Manipur, its Ras Leela, Sankirtana and martial forms.</li>
        <li><b>Sattriya</b><br>The Assam dance of the monasteries, and the year it became a classical dance.</li>
        <li><b>Dance Organisations</b><br>Which school or academy was set up by whom, where, and in which year.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions such as "Who is the exponent of which dance?", "Which dance symbolises which element?" and "Which institute was founded by whom?" come again and again in Staff Selection Commission papers. One clear page per dance makes them easy marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🎭", accent: "#22c55e", pauseTimer: true,
    title: "Facts About Classical Dances",
    html: `
      <p class="cp-lead">India has <b>eight classical dances</b>. <u>A dance is called classical when it follows the rules of the old Sanskrit book on performing arts and is taught through a strict teacher-to-student tradition.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/1.png" alt="Natya Shastra manuscript Bharata Muni illustration" data-caption="The Natya Shastra, the oldest book on Indian dance and drama." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/2.png" alt="Nataraja Shiva bronze statue Tandava pose museum" data-caption="Lord Shiva as Nataraja, the lord of Tandava dance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/3.png" alt="Two-column picture. Left column Lasya with label Feminine and Parvati, soft and graceful. " data-caption="Lasya is soft and graceful, while Tandava is strong and energetic." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The oldest book on dance is the <b>Natya Shastra</b>, written by the sage <b>Bharata Muni</b>. A later book, the <b>Abhinaya Darpana</b>, was written by <b>Nandikeshvara</b> and explains hand gestures and expressions. Because dance has two moods, a soft one and a strong one, we divide its nature into <b>Lasya</b> and <b>Tandava</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Total classical dances</td><td>Eight, recognised by the Sangeet Natak Akademi, the national academy of music, dance and drama</td></tr><tr><td>Main literary source</td><td>Natya Shastra by Bharata Muni</td></tr><tr><td>Another literary source</td><td>Abhinaya Darpana by Nandikeshvara</td></tr><tr><td>Lasya nature</td><td>Feminine, soft and graceful, linked with Goddess Parvati</td></tr><tr><td>Tandava nature</td><td>Masculine, strong and energetic, linked with Lord Shiva</td></tr><tr><td>Shaivite form</td><td>Dance related to Lord Shiva</td></tr><tr><td>Vaishnavite form</td><td>Dance related to Lord Vishnu</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> Bharatanatyam and Kathak use many strong, fast steps, so we link them with Tandava. Mohiniyattam is slow and swaying, so we link it with Lasya.</div>
      <div class="cp-note trap">Do not mix the two books. Natya Shastra belongs to Bharata Muni, and Abhinaya Darpana belongs to Nandikeshvara.</div>
      <div class="cp-note exam">The Sangeet Natak Akademi was set up in 1952. Sattriya of Assam was the last dance to be added to the list, in the year 2000, which made the total eight.</div>
      <div class="cp-mnemonic">Lasya = Ladies and Parvati. Tandava = Tough and Shiva.</div>
    `
  },
  3: {
    questext: "Who is the author of the Natya Shastra, the oldest Indian book on dance and drama?",
    options: ["Nandikeshvara", "Kalidasa", "Bharata Muni", "Patanjali"],
    correct: "3",
    exptext: "✅ Bharata Muni wrote the Natya Shastra. 📌 Remember Bharata and Natya go together. ❌ Nandikeshvara is tempting, but he wrote the Abhinaya Darpana."
  },
  4: {
    questext: "The Abhinaya Darpana, a book on gestures and expressions in dance, was written by which author?",
    options: ["Bharata Muni", "Nandikeshvara", "Jayadeva", "Vyasa"],
    correct: "2",
    exptext: "✅ Nandikeshvara wrote the Abhinaya Darpana. 📌 Natya Shastra belongs to Bharata, so the other book is Nandikeshvara's. ❌ Bharata Muni is wrong because he wrote the Natya Shastra."
  },
  5: {
    questext: "Consider the following statements about the nature of Indian dance:\n1. Lasya is a graceful, feminine style linked with Goddess Parvati.\n2. Tandava is a gentle style linked with Goddess Parvati.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Tandava is the strong style of Lord Shiva. ❌ Statement 2 is wrong because Tandava is not gentle and is not linked with Parvati."
  },
  6: {
    questext: "How many classical dances are recognised in India by the Sangeet Natak Akademi?",
    options: ["Six", "Seven", "Nine", "Eight"],
    correct: "4",
    exptext: "✅ Eight dances are recognised, after Sattriya was added in the year 2000. 📌 Seven older dances plus Sattriya make eight. ❌ Seven is wrong because it leaves out Sattriya."
  },
  7: {
    type: "concept", icon: "🪔", accent: "#f59e0b", pauseTimer: true,
    title: "Bharatanatyam",
    html: `
      <p class="cp-lead">Bharatanatyam is the classical dance of <b>Tamil Nadu</b>. <u>It symbolises Fire</u>, because its movements are sharp, bright and full of energy.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/4.png" alt="Bharatanatyam dancer araimandi pose stage photo" data-caption="A Bharatanatyam dancer in the half-sitting pose." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/5.png" alt="Rukmini Devi Arundale Kalakshetra portrait photo" data-caption="Rukmini Devi Arundale, who gave the dance its modern form." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/6.png" alt="Flow of six boxes left to right: Alarippu, Jatiswaram, Shabdam, Varnam, Padam, Tillana, wi" data-caption="The usual order of items in a Bharatanatyam recital." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>In the old days the dance was called <b>Sadir</b> and was performed by temple dancers known as <b>Devadasis</b>. It is an <b>Ekaharya</b> dance, which means one dancer plays many roles alone, so it is performed as a solo. Later, <b>Rukmini Devi Arundale</b> removed the bad name that had been attached to temple dancing, gave it the name Bharatanatyam and started the Kalakshetra school in Chennai in 1936. That is why she is called the mother of modern Bharatanatyam.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>State</td><td>Tamil Nadu</td></tr><tr><td>Element</td><td>Fire</td></tr><tr><td>Other names</td><td>Sadir, Dasiattam, Thevaradiyal, Parathaiyarattam</td></tr><tr><td>Style</td><td>Ekaharya, a solo dance</td></tr><tr><td>Performed in the past by</td><td>Devadasis in temples</td></tr><tr><td>Revived by</td><td>Rukmini Devi Arundale</td></tr><tr><td>Tanjore Quartet</td><td>Four brothers (Chinnayya, Ponnayya, Sivanandam, Vadivelu) who shaped the recital order</td></tr></tbody></table>
      <p><b>Famous exponents:</b> Alarmel Valli, Rukmini Devi Arundale, Padma Subrahmanyam, Meenakshi Sundaram Pillai, Mallika Sarabhai, Mrinalini Sarabhai, Bala Saraswati, Yamini Krishnamurthy, Leela Samson, Shanta Dhananjayan, V. P. Dhananjayan, Sonal Mansingh, Rama Vaidyanathan, Narthaki Nataraj, Urmila Satyanarayanan. Other names: Meenakshi Chittaranjan, M. K. Saroja, Radha Sridhar, Deepak Mazumdar and C. V. Chandrasekhar.</p>
      <div class="cp-note trap">Some dancers appear in two dances. Yamini Krishnamurthy and Mallika Sarabhai are linked with both Bharatanatyam and Kuchipudi, and Mrinalini Sarabhai is also linked with Kathakali. Read the question carefully.</div>
      <div class="cp-note exam">V. P. Dhananjayan and Shanta Dhananjayan are a famous husband and wife pair of Bharatanatyam. Bharatanatyam is a name that many people link with Bhava (feeling), Raga (music) and Tala (rhythm).</div>
      <div class="cp-mnemonic">Bharatanatyam = Burning Fire from Tamil Nadu.</div>
    `
  },
  8: {
    questext: "Which classical dance of Tamil Nadu symbolises the element Fire?",
    options: ["Kuchipudi", "Bharatanatyam", "Odissi", "Mohiniyattam"],
    correct: "2",
    exptext: "✅ Bharatanatyam symbolises Fire and belongs to Tamil Nadu. 📌 Bright, sharp movements match fire. ❌ Kuchipudi is wrong because it symbolises Earth."
  },
  9: {
    questext: "Which one of the following was an old name of Bharatanatyam?",
    options: ["Pung", "Ankiya Naat", "Sadir", "Bhaona"],
    correct: "3",
    exptext: "✅ Sadir was the old name of Bharatanatyam, danced by temple dancers. 📌 Sadir is the old, Bharatanatyam is the new name. ❌ Ankiya Naat and Bhaona belong to Assam."
  },
  10: {
    questext: "Which one of the following is NOT an exponent of Bharatanatyam?",
    options: ["Padma Subrahmanyam", "Alarmel Valli", "Birju Maharaj", "Leela Samson"],
    correct: "3",
    exptext: "✅ Birju Maharaj is a famous Kathak dancer. 📌 The Maharaj family means Kathak. ❌ The other three are well known Bharatanatyam dancers."
  },
  11: {
    questext: "Rukmini Devi Arundale, called the mother of modern Bharatanatyam, founded which school?",
    options: ["Darpana Academy", "Kathak Kendra", "Nalanda Nritya Kala Mahavidyalaya", "Kalakshetra"],
    correct: "4",
    exptext: "✅ Rukmini Devi Arundale founded Kalakshetra in Chennai. 📌 Kalakshetra means a field of art, and Rukmini Devi built it. ❌ Darpana Academy was founded by Mrinalini and Vikram Sarabhai."
  },
  12: {
    questext: "Consider the following statements about Bharatanatyam:\n1. It is an Ekaharya dance performed by a single dancer.\n2. In the past it was performed by Devadasis in temples.\n3. It symbolises the element Air.\nWhich of the statements given above are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Bharatanatyam is Fire, while Mohiniyattam is Air. ❌ Statement 3 is wrong because Bharatanatyam symbolises Fire, not Air."
  },
  13: {
    type: "concept", icon: "🌾", accent: "#ef4444", pauseTimer: true,
    title: "Kuchipudi",
    html: `
      <p class="cp-lead">Kuchipudi is the classical dance of <b>Andhra Pradesh</b>. <u>It symbolises Earth</u>, and it is named after the village Kuchipudi in the Krishna district.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/7.png" alt="Kuchipudi dancer stage performance photo" data-caption="A Kuchipudi dancer in bright traditional costume." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/8.png" alt="Tarangam Kuchipudi dance brass plate water pot photo" data-caption="Tarangam, the dance on a brass plate with a water pot." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/9.png" alt="Simple chain: Tirtha Narayana Yati, then Siddhendra Yogi, then Brahmin boys of Kuchipudi v" data-caption="How the Kuchipudi tradition passed from teacher to student." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Kuchipudi began as a dance drama about stories of Lord Krishna. <b>Tirtha Narayana Yati</b> gave it a musical form, and his disciple <b>Siddhendra Yogi</b> shaped it into the dance we know today. In the beginning only <b>Brahmin boys</b> performed it, and they even played the female roles. Later, women also began to learn it.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>State</td><td>Andhra Pradesh</td></tr><tr><td>Element</td><td>Earth</td></tr><tr><td>Link with Thanjavur</td><td>Related to the Bhagavata Mela temple theatre of Tanjore in Tamil Nadu</td></tr><tr><td>Modern form given by</td><td>Tirtha Narayana Yati</td></tr><tr><td>His disciple</td><td>Siddhendra Yogi</td></tr><tr><td>First performers</td><td>Brahmin boys</td></tr><tr><td>Famous item</td><td>Tarangam, a dance on a brass plate</td></tr><tr><td>Names ending in</td><td>Reddy, for example Raja Reddy and Radha Reddy</td></tr></tbody></table>
      <p><b>Famous exponents:</b> Vempati Chinna Satyam, Raja Reddy, Radha Reddy, Aparna Satyanarayanan, Lakshmi Narayan Shastri, Vedantam Satyanarayana Sarma, Swapna Sundari, Shobha Naidu, Haleem Khan, Yamini Krishnamurthy and Mallika Sarabhai.</p>
      <div class="cp-note trap">Kuchipudi and Bharatanatyam both come from the south, so many students mix them up. Remember: Kuchipudi is Andhra Pradesh and Earth, while Bharatanatyam is Tamil Nadu and Fire.</div>
      <div class="cp-note exam">Haleem Khan is a well-known Muslim Kuchipudi dancer. The mix of Lasya and Tandava, and the use of speech in the dance, make Kuchipudi look like a dance drama.</div>
      <div class="cp-mnemonic">Element order: Kuchipudi is Earth, Odissi is Water, Bharatanatyam is Fire, Mohiniyattam is Air.</div>
    `
  },
  14: {
    questext: "The classical dance Kuchipudi belongs to which state?",
    options: ["Kerala", "Odisha", "Andhra Pradesh", "Tamil Nadu"],
    correct: "3",
    exptext: "✅ Kuchipudi comes from Andhra Pradesh, from the village Kuchipudi. 📌 The dance is named after the village. ❌ Tamil Nadu is tempting, but that is the home of Bharatanatyam."
  },
  15: {
    questext: "Which classical dance symbolises the element Earth?",
    options: ["Odissi", "Mohiniyattam", "Bharatanatyam", "Kuchipudi"],
    correct: "4",
    exptext: "✅ Kuchipudi symbolises Earth. 📌 Earth, Water, Fire, Air are Kuchipudi, Odissi, Bharatanatyam, Mohiniyattam in that order. ❌ Odissi is wrong because it symbolises Water."
  },
  16: {
    questext: "In the beginning, Kuchipudi was performed only by whom?",
    options: ["Devadasis", "Brahmin boys", "Royal women", "Tribal groups"],
    correct: "2",
    exptext: "✅ Brahmin boys of the village performed it first. 📌 Think boys for Kuchipudi, Devadasis for Bharatanatyam. ❌ Devadasis are linked with the old Sadir dance."
  },
  17: {
    questext: "Which one of the following is NOT a Kuchipudi exponent?",
    options: ["Vempati Chinna Satyam", "Swapna Sundari", "Raja Reddy", "Kelucharan Mohapatra"],
    correct: "4",
    exptext: "✅ Kelucharan Mohapatra is the great teacher of Odissi. 📌 Mohapatra means Odissi. ❌ The other three are Kuchipudi artists."
  },
  18: {
    questext: "Consider the following statements about Kuchipudi:\n1. Siddhendra Yogi shaped the dance as a disciple of Tirtha Narayana Yati.\n2. Kuchipudi is performed only by women even today.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Teacher Tirtha Narayana, student Siddhendra. ❌ Statement 2 is wrong because Kuchipudi was first performed by boys, and today both men and women perform it."
  },
  19: {
    type: "concept", icon: "🌬️", accent: "#8b5cf6", pauseTimer: true,
    title: "Mohiniyattam",
    html: `
      <p class="cp-lead">Mohiniyattam is the classical dance of <b>Kerala</b>. <u>It symbolises Air</u>, because its steps are slow, smooth and swaying like a gentle breeze.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/10.png" alt="Mohiniyattam dancer white gold kasavu saree photo" data-caption="A Mohiniyattam dancer in white and gold costume." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/11.png" alt="Vallathol Narayana Menon Kerala Kalamandalam founder portrait" data-caption="Vallathol Narayana Menon, who revived the dance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/12.png" alt="Comparison picture: left side Bharatanatyam sharp straight lines, right side Mohiniyattam " data-caption="Bharatanatyam is sharp like fire; Mohiniyattam is smooth like air." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The name comes from <b>Mohini</b>, the beautiful female form that Lord Vishnu took in the old stories. The dance has <u>no sudden jerks</u>; the body moves in smooth, flowing waves. It is performed as a <b>solo dance by women</b>. The dance was almost lost, and <b>Vallathol Narayana Menon</b> revived it by setting up the Kerala Kalamandalam school in 1930.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>State</td><td>Kerala</td></tr><tr><td>Element</td><td>Air</td></tr><tr><td>Linked with</td><td>Mohini, the female form of Lord Vishnu</td></tr><tr><td>Style</td><td>No abrupt jerks, smooth and swaying</td></tr><tr><td>Performed by</td><td>Women as a solo dance</td></tr><tr><td>Hand gestures</td><td>24</td></tr><tr><td>Earliest reference</td><td>Vyavaharamala by Mazhamangalam Narayanan Namboodiri</td></tr><tr><td>Revived by</td><td>Vallathol Narayana Menon</td></tr></tbody></table>
      <p><b>Famous exponents:</b> Gopika Varma, Kanak Rele, Sunanda Nair, Jayaprabha Menon, Radha Dutta, Pallavi Krishnan and Kalyanikutty Amma.</p>
      <div class="cp-note trap">Mohiniyattam and Kathakali are both from Kerala and both were revived by Vallathol Narayana Menon. But Mohiniyattam is a soft solo dance of women, while Kathakali is a bold dance of men.</div>
      <div class="cp-note exam">Kalyanikutty Amma is called the mother of modern Mohiniyattam. Swathi Thirunal, the king of Travancore, supported this dance and wrote songs for it.</div>
      <div class="cp-mnemonic">Mohini = Moving like Air.</div>
    `
  },
  20: {
    questext: "Which classical dance symbolises Air and has smooth movements without sudden jerks?",
    options: ["Odissi", "Mohiniyattam", "Kathak", "Kuchipudi"],
    correct: "2",
    exptext: "✅ Mohiniyattam symbolises Air and has smooth, swaying movements. 📌 Air moves softly, so the dance is soft. ❌ Odissi is wrong because it symbolises Water."
  },
  21: {
    questext: "Mohiniyattam is related to which character from Hindu stories?",
    options: ["Parvati", "Mohini, the female form of Lord Vishnu", "Radha", "Sita"],
    correct: "2",
    exptext: "✅ Mohiniyattam takes its name from Mohini, the female form of Lord Vishnu. 📌 Mohini plus attam (dance) gives Mohiniyattam. ❌ Radha is linked with the Manipuri Ras Leela."
  },
  22: {
    questext: "Who revived Mohiniyattam and Kathakali by founding the Kerala Kalamandalam?",
    options: ["Rukmini Devi Arundale", "Vallathol Narayana Menon", "Kumudini Lakhia", "Birju Maharaj"],
    correct: "2",
    exptext: "✅ The poet Vallathol Narayana Menon revived both dances. 📌 Vallathol and Kerala go together. ❌ Rukmini Devi Arundale worked for Bharatanatyam."
  },
  23: {
    questext: "Which one of the following is a Mohiniyattam exponent?",
    options: ["Sonal Mansingh", "Sitara Devi", "Sunanda Nair", "Swapna Sundari"],
    correct: "3",
    exptext: "✅ Sunanda Nair is a known Mohiniyattam dancer. 📌 Kerala dancers include Gopika Varma and Kanak Rele too. ❌ Sonal Mansingh is linked with Odissi, Sitara Devi with Kathak and Swapna Sundari with Kuchipudi."
  },
  24: {
    type: "concept", icon: "🎭", accent: "#14b8a6", pauseTimer: true,
    title: "Kathakali",
    html: `
      <p class="cp-lead">Kathakali is the classical dance drama of <b>Kerala</b>. <u>The name means story play</u>: <i>katha</i> means story and <i>kali</i> means play.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/13.png" alt="Kathakali performer pacha green make-up photo" data-caption="A Kathakali artist with green face make-up and a large crown." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/14.png" alt="Kathakali kathi vesham knife make-up face photo" data-caption="A Kathakali villain with the knife-shaped kathi make-up." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/15.png" alt="Five colour boxes with labels: Pacha green for noble heroes, Kathi knife for evil, Kari bl" data-caption="The five main make-up types of Kathakali and what each shows." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Kathakali tells stories from the <b>Ramayana</b> and the <b>Mahabharata</b>. Traditionally it is <u>performed by men</u>, who also play the female roles. The dancers tell the story only with <b>24 hand gestures and nine facial expressions</b>, and they wear huge crowns and heavy face make-up. <b>Vallathol Narayana Menon</b> revived the art form in modern times.</p>
      <table><thead><tr><th>Make-up type (Vesham)</th><th>What it shows</th></tr></thead><tbody><tr><td>Pacha</td><td>Green, for noble and strong heroes</td></tr><tr><td>Thaadi</td><td>Beard, for special characters such as the white beard of Hanuman</td></tr><tr><td>Kari</td><td>Black, for forest dwellers and wild characters</td></tr><tr><td>Kathi</td><td>Knife, for evil characters</td></tr><tr><td>Minukku</td><td>Radiant, for women and sages</td></tr></tbody></table>
      <p><b>Famous exponents:</b> Mrinalini Sarabhai, P. V. Balakrishnan, Kottakkal Nandakumaran Nair, Milena Salvini, Kunchu Kurup and Gopi Nath.</p>
      <div class="cp-note trap">Kathakali is performed by men, while Mohiniyattam is performed by women. Both are from Kerala, so do not mix them up.</div>
      <div class="cp-note exam">The five main make-up types are asked often. Pacha means green, Kari means black, and Kathi means knife. Kerala Kalamandalam, set up in 1930, is the famous school for Kathakali. Milena Salvini was an Italian dancer who became a known Kathakali artist.</div>
      <div class="cp-mnemonic">PaThaKaKaMi = Pacha, Thaadi, Kari, Kathi, Minukku.</div>
    `
  },
  25: {
    questext: "Which classical dance of Kerala is based on stories of the Ramayana and the Mahabharata and is mostly performed by men?",
    options: ["Mohiniyattam", "Kuchipudi", "Kathakali", "Sattriya"],
    correct: "3",
    exptext: "✅ Kathakali is the male dance drama of Kerala. 📌 Katha (story) plus kali (play). ❌ Mohiniyattam is wrong because it is a dance of women."
  },
  26: {
    questext: "In Kathakali make-up, which type is used to show evil characters?",
    options: ["Pacha", "Minukku", "Kari", "Kathi"],
    correct: "4",
    exptext: "✅ Kathi, meaning knife, is used for evil characters. 📌 A knife is dangerous, so Kathi is the villain. ❌ Pacha is wrong because green shows noble heroes."
  },
  27: {
    questext: "In Kathakali make-up, the colour green is known as which type?",
    options: ["Kari", "Thaadi", "Minukku", "Pacha"],
    correct: "4",
    exptext: "✅ Pacha means green and shows noble, strong heroes. 📌 Pacha is the green make-up, and green stands for the noble hero. ❌ Kari is black and is used for forest dwellers."
  },
  28: {
    questext: "Which one of the following is a Kathakali exponent?",
    options: ["Kanak Rele", "Kunchu Kurup", "Gopika Varma", "Pallavi Krishnan"],
    correct: "2",
    exptext: "✅ Kunchu Kurup is a well-known Kathakali artist. 📌 Kunchu Kurup and Gopi Nath are male Kathakali names. ❌ The other three are Mohiniyattam dancers."
  },
  29: {
    questext: "Consider the following statements about Kathakali:\n1. It uses 24 hand gestures and nine facial expressions.\n2. Kari make-up is used to show noble heroes.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Green Pacha is for heroes, and black Kari is for forest dwellers. ❌ Statement 2 is wrong because noble heroes wear Pacha make-up."
  },
  30: {
    type: "concept", icon: "🌊", accent: "#ec4899", pauseTimer: true,
    title: "Odissi",
    html: `
      <p class="cp-lead">Odissi is the classical dance of <b>Odisha</b>. <u>It symbolises Water</u>, because its movements flow like waves and its body bends in soft curves.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/16.png" alt="Odissi dancer tribhanga pose stage photo" data-caption="An Odissi dancer in the graceful three-bend pose." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/17.png" alt="Konark Sun Temple dancer sculpture photo" data-caption="Dancing figures carved on the Konark Sun Temple walls." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/18.png" alt="Chart with two columns. Left: Names ending with Mohapatra. Right: Names ending with Mohant" data-caption="Many Odissi artists carry the surnames Mohapatra or Mohanty." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Odissi is one of the oldest dances that survive today. Old carvings in the Udayagiri and Khandagiri caves and on the Konark Sun Temple show its poses. In the past, temple dancers called <b>Maharis</b> performed it, and young boys called <b>Gotipuas</b> also danced in this style. Its famous posture is the <b>tribhanga</b>, where the body bends at the neck, waist and knee.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>State</td><td>Odisha</td></tr><tr><td>Element</td><td>Water</td></tr><tr><td>Surname clue</td><td>Names ending with Mohapatra or Mohanty</td></tr><tr><td>Temple dancers</td><td>Maharis</td></tr><tr><td>Famous posture</td><td>Tribhanga, the three-bend pose</td></tr><tr><td>Great teacher</td><td>Kelucharan Mohapatra</td></tr><tr><td>Famous poem used</td><td>Gita Govinda by Jayadeva</td></tr></tbody></table>
      <p><b>Famous exponents:</b> Kelucharan Mohapatra, Shagun Bhutani, Gangadhar Pradhan, Mohini Mudgal, Bijayani Shatpathy, Sanjukta Panigrahi, Sudhakar Sahoo, Sonal Mansingh and Sutapa Talukdar. <b>Other exponents:</b> Kiran Sehgal, Mayadhar Raut and Indrani Rahman.</p>
      <div class="cp-note trap">Sonal Mansingh is linked with both Bharatanatyam and Odissi, and Indrani Rahman is also a name seen in Odissi lists. If Odissi is asked, think of Odisha names first.</div>
      <div class="cp-note exam">A surname ending in Mohapatra or Mohanty is a strong clue for an Odissi artist. Sanjukta Panigrahi was the wife of Raghunath Panigrahi and a leading Odissi star.</div>
      <div class="cp-mnemonic">Odissi = Odisha = Ocean and Water.</div>
    `
  },
  31: {
    questext: "Which classical dance symbolises Water?",
    options: ["Kuchipudi", "Bharatanatyam", "Odissi", "Mohiniyattam"],
    correct: "3",
    exptext: "✅ Odissi symbolises Water. 📌 Odisha has a long sea coast, so think of waves. ❌ Kuchipudi is wrong because it symbolises Earth."
  },
  32: {
    questext: "Which one of the following is a famous Odissi exponent?",
    options: ["Birju Maharaj", "Kelucharan Mohapatra", "Padma Subrahmanyam", "Vempati Chinna Satyam"],
    correct: "2",
    exptext: "✅ Kelucharan Mohapatra was the great Odissi guru. 📌 A surname with Mohapatra or Mohanty means Odissi. ❌ Birju Maharaj is a Kathak master."
  },
  33: {
    questext: "Which one of the following dancers is NOT an Odissi artist?",
    options: ["Sanjukta Panigrahi", "Sonal Mansingh", "Sutapa Talukdar", "Sitara Devi"],
    correct: "4",
    exptext: "✅ Sitara Devi was a Kathak dancer. 📌 Devi, as a surname, points to Kathak or Manipuri in this chapter. ❌ The other three are linked with Odissi."
  },
  34: {
    questext: "In the old days, who performed Odissi in the temples of Odisha?",
    options: ["Brahmin boys", "Kathaks", "Maharis", "Devadasis of Tamil Nadu"],
    correct: "3",
    exptext: "✅ Temple dancers called Maharis performed Odissi. 📌 Mahari is the Odisha word for temple dancer. ❌ Brahmin boys are linked with Kuchipudi."
  },
  35: {
    questext: "Consider the following statements about Odissi:\n1. The tribhanga is a famous posture of Odissi with bends at three places.\n2. Odissi is the classical dance of Kerala.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Odissi comes from Odisha. ❌ Statement 2 is wrong because Kerala has Kathakali and Mohiniyattam."
  },
  36: {
    type: "concept", icon: "🪘", accent: "#3b82f6", pauseTimer: true,
    title: "Kathak",
    html: `
      <p class="cp-lead">Kathak is the classical dance of <b>North India</b>, mainly Uttar Pradesh. <u>It is the only classical dance that has Persian elements</u>, which came with the Mughal courts.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/19.png" alt="Kathak dancer chakkar spin stage photo" data-caption="A Kathak dancer spinning in a long flowing skirt." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/20.png" alt="Birju Maharaj Kathak performance photo" data-caption="Birju Maharaj, the best-known Kathak master of recent times." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/21.png" alt="Picture with three labels: Persian elements, Hindustani music, Thumri songs, all pointing " data-caption="Kathak uses Persian touches, Hindustani music and Thumri songs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The word Kathak comes from <i>katha</i>, a story, because wandering storytellers called Kathakas told stories through song and gesture. Later the dance moved to royal courts. <b>Wajid Ali Shah</b>, the last Nawab of Awadh, was a great patron of Kathak. The dance uses <b>Hindustani music</b>, and its songs are often <b>Thumri</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Region</td><td>Uttar Pradesh and North India</td></tr><tr><td>Music</td><td>Hindustani music, with Thumri songs</td></tr><tr><td>Special feature</td><td>Only classical dance with Persian elements</td></tr><tr><td>Patron</td><td>Wajid Ali Shah, last Nawab of Awadh</td></tr><tr><td>Gharanas</td><td>Lucknow, Jaipur and Banaras</td></tr><tr><td>Famous family</td><td>Maharaj family: Birju Maharaj, Lachhu Maharaj, Achhan Maharaj</td></tr></tbody></table>
      <p><b>Famous exponents:</b> Birju Maharaj, Lachhu Maharaj, Achhan Maharaj, Shovana Narayan, Sitara Devi, Kamini Asthana, Nalini Asthana, Narayan Prasad, Kalika Prasad, Ishwari Prasad, Vidya Gauri Adkar, Kumudini Lakhia, Aditi Mangaldas, Kumkum Dhar and Roshan Kumari. <b>Other exponents:</b> Gopi Krishna, Rani Karna, Geetanjali Lal and Maulik Shah.</p>
      <div class="cp-note trap">Kumudini Lakhia, Kumkum Dhar and Sitara Devi are Kathak dancers even though their names do not sound like it. Maharaj as a surname is also a strong Kathak clue.</div>
      <div class="cp-note exam">The three old schools of Kathak are called gharanas: Lucknow, Jaipur and Banaras. Kathak dancers wear ankle bells called ghungroo and spin in fast turns called chakkars.</div>
      <div class="cp-mnemonic">Kathak = Kings, Persian, Thumri.</div>
    `
  },
  37: {
    questext: "Which is the only classical dance of India that shows Persian elements?",
    options: ["Odissi", "Manipuri", "Kuchipudi", "Kathak"],
    correct: "4",
    exptext: "✅ Kathak shows Persian influence from the Mughal courts. 📌 Kings and courts mean Kathak. ❌ Odissi is a temple dance, so it does not carry that mix."
  },
  38: {
    questext: "Which Nawab of Awadh was a great patron of Kathak?",
    options: ["Asaf-ud-Daula", "Siraj-ud-Daulah", "Wajid Ali Shah", "Tipu Sultan"],
    correct: "3",
    exptext: "✅ Wajid Ali Shah, the last Nawab of Awadh, supported Kathak. 📌 Last Nawab, Awadh, Kathak. ❌ Siraj-ud-Daulah ruled Bengal, not Awadh."
  },
  39: {
    questext: "Which type of song is most closely linked with Kathak?",
    options: ["Borgeet", "Gita Govinda", "Sankirtana", "Thumri"],
    correct: "4",
    exptext: "✅ Thumri is the light song style used in Kathak. 📌 Thumri equals Kathak. ❌ Borgeet is the music of Sattriya."
  },
  40: {
    questext: "Which one of the following is NOT a Kathak dancer?",
    options: ["Shovana Narayan", "Birju Maharaj", "Sitara Devi", "Alarmel Valli"],
    correct: "4",
    exptext: "✅ Alarmel Valli is a Bharatanatyam dancer. 📌 Valli with Tamil roots points to Bharatanatyam. ❌ The other three are Kathak artists."
  },
  41: {
    questext: "Which Kathak teacher belonged to the famous Maharaj family?",
    options: ["Kelucharan Mohapatra", "Bipin Singh", "Lachhu Maharaj", "Guru Ghanakanta Bora"],
    correct: "3",
    exptext: "✅ Lachhu Maharaj was a Kathak master of the Maharaj family. 📌 Maharaj means Kathak. ❌ The other names belong to Odissi, Manipuri and Sattriya."
  },
  42: {
    type: "concept", icon: "🌸", accent: "#f97316", pauseTimer: true,
    title: "Manipuri",
    html: `
      <p class="cp-lead">Manipuri is the classical dance of <b>Manipur</b>. <u>It is a gentle, soft dance of the Vaishnavite form, where the dancer looks inward and the movements are smooth</u>, so it is called an introverted dance.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/22.png" alt="Manipuri Ras Leela dancers barrel skirt kumil photo" data-caption="Manipuri dancers in the stiff barrel-shaped skirt." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/23.png" alt="Pung Cholom drummers Manipur dance photo" data-caption="Pung Cholom, the drum dance of Manipur." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/24.png" alt="Four-box chart. Boxes: Ras Leela with Radha and Krishna, Sankirtana with Pung drum, Jagoi " data-caption="The main forms linked with Manipuri dance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Manipuri tells the love story of <b>Radha and Krishna</b> in the <b>Ras Leela</b>. King <b>Rajarshi Bhagyachandra</b> is called the propounder of the Ras Leela in the eighteenth century. The dance does not use heavy foot stamps, so it looks light and floating. <b>Rabindranath Tagore</b> brought it to Shantiniketan, which made it known across India.</p>
      <table><thead><tr><th>Form</th><th>Fact</th></tr></thead><tbody><tr><td>Ras Leela</td><td>Radha and Krishna; propounder Rajarshi Bhagyachandra</td></tr><tr><td>Sankirtana</td><td>Devotional singing and dance with the Pung drum</td></tr><tr><td>Jagoi and Cholom</td><td>Dance styles played with the Pung drum</td></tr><tr><td>Thang Ta</td><td>Martial dance of Manipur</td></tr><tr><td>Type</td><td>Introverted, Vaishnavite form</td></tr><tr><td>Exponents' name clue</td><td>Names ending with Devi</td></tr></tbody></table>
      <p><b>Famous exponents:</b> Guru Bipin Singh, the Jhaveri Sisters, Nirmala Mehta, Charu Mathur, Devyani Chalia, Rajkumar Singhajit Singh and Nileshwar Mukherjee.</p>
      <div class="cp-note trap">Radha and Krishna appear in the Manipuri Ras Leela, but this dance is Vaishnavite and gentle. Do not link Manipuri with the strong Tandava style.</div>
      <div class="cp-note exam">The Pung is the main drum of Manipuri. Thang Ta is a martial art of Manipur that is also danced. Many Manipuri women artists carry the title Devi in their names.</div>
      <div class="cp-mnemonic">Manipuri = Mild, Radha, Pung.</div>
    `
  },
  43: {
    questext: "Which classical dance is called an introverted type and is performed with the Ras Leela of Radha and Krishna?",
    options: ["Kathak", "Manipuri", "Odissi", "Kuchipudi"],
    correct: "2",
    exptext: "✅ Manipuri is a gentle, introverted Vaishnavite dance. 📌 Mild and Manipuri both start with M. ❌ Kathak is wrong because it uses fast, bold spins."
  },
  44: {
    questext: "Which king is called the propounder of the Manipuri Ras Leela?",
    options: ["Wajid Ali Shah", "Rajarshi Bhagyachandra", "Krishnadevaraya", "Ashoka"],
    correct: "2",
    exptext: "✅ Rajarshi Bhagyachandra created the Ras Leela form of Manipuri. 📌 Rajarshi is the royal sage of Manipur. ❌ Wajid Ali Shah is linked with Kathak."
  },
  45: {
    questext: "Which drum is used in the Manipuri Sankirtana and Cholom?",
    options: ["Chenda", "Tabla", "Mridangam", "Pung"],
    correct: "4",
    exptext: "✅ The Pung is the drum of Manipur. 📌 Pung belongs to Manipur. ❌ The Chenda is the drum of Kerala."
  },
  46: {
    questext: "Which one of the following is a martial art of Manipur that is also danced?",
    options: ["Gatka", "Thang Ta", "Kalaripayattu", "Chhau"],
    correct: "2",
    exptext: "✅ Thang Ta is the martial dance of Manipur. 📌 Thang Ta shows the same Ta ending as Manipur. ❌ Kalaripayattu belongs to Kerala."
  },
  47: {
    questext: "Which one of the following is a Manipuri exponent?",
    options: ["Guru Bipin Singh", "Kelucharan Mohapatra", "Birju Maharaj", "Leela Samson"],
    correct: "1",
    exptext: "✅ Guru Bipin Singh is a well-known Manipuri teacher. 📌 Singh of Manipur is a safe clue. ❌ Kelucharan Mohapatra is Odissi, and Birju Maharaj is Kathak."
  },
  48: {
    type: "concept", icon: "🏯", accent: "#84cc16", pauseTimer: true,
    title: "Sattriya",
    html: `
      <p class="cp-lead">Sattriya is the classical dance of <b>Assam</b>. <u>It was added as the eighth classical dance in the year 2000</u>, and it grew inside the Vaishnavite monasteries called Satras.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/25.png" alt="Sattriya dancer Assam Satra performance photo" data-caption="A Sattriya dancer in traditional Assamese silk costume." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/26.png" alt="Majuli Satra Assam monastery photo" data-caption="A Satra monastery on Majuli island in Assam." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/27.png" alt="Simple tree. Top: Srimanta Sankardeva. Branches: Ankiya Naat, Bhaona, Borgeet, Sattriya da" data-caption="Srimanta Sankardeva gave Assam plays, songs and the Sattriya dance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Sattriya was created by the saint <b>Srimanta Sankardeva</b>, a Vaishnavite, in the fifteenth and sixteenth centuries. He used it to tell the story of Lord Krishna. The dance is performed inside the monasteries as part of the plays called <b>Ankiya Naat</b>. A presentation of an Ankiya Naat is called <b>Bhaona</b>.</p>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>State</td><td>Assam</td></tr><tr><td>Founder</td><td>Srimanta Sankardeva</td></tr><tr><td>Theme</td><td>Lord Krishna, Vaishnavite form</td></tr><tr><td>Music</td><td>Borgeet</td></tr><tr><td>Dance numbers</td><td>Chali, Jhumura and Nadu Bhangi</td></tr><tr><td>Presentation of Ankiya Naat</td><td>Bhaona</td></tr><tr><td>Recognised as classical</td><td>In the year 2000</td></tr></tbody></table>
      <p><b>Famous exponents:</b> Jatin Goswami, Guru Ghanakanta Bora, Indira Bora, Sharodi Saikia, Meenakshi Medhi and Krishnakshi Kashyap.</p>
      <div class="cp-note trap">Ankiya Naat is the play, and Bhaona is its presentation. Do not mix them. Also remember that Sattriya is Vaishnavite, like Manipuri.</div>
      <div class="cp-note exam">Sattriya is the youngest classical dance on the list. Sangeet Natak Akademi gave it the status in the year 2000.</div>
      <div class="cp-mnemonic">Sattriya = Satra, Sankardeva, Sattriya joined in 2000.</div>
    `
  },
  49: {
    questext: "In which year was Sattriya recognised as a classical dance by the Sangeet Natak Akademi?",
    options: ["1952", "1990", "2000", "2010"],
    correct: "3",
    exptext: "✅ Sattriya was recognised in the year 2000. 📌 Sattriya is the youngest of the eight. ❌ 1952 is the year the Sangeet Natak Akademi was set up."
  },
  50: {
    questext: "Which saint is the creator of the Sattriya dance?",
    options: ["Tirtha Narayana Yati", "Siddhendra Yogi", "Vallathol Narayana Menon", "Srimanta Sankardeva"],
    correct: "4",
    exptext: "✅ Srimanta Sankardeva of Assam created Sattriya. 📌 Sankardeva and Satra both start with S. ❌ Siddhendra Yogi is linked with Kuchipudi."
  },
  51: {
    questext: "The presentation of Ankiya Naat of Assam is known by which name?",
    options: ["Bhaona", "Jhumura", "Borgeet", "Chali"],
    correct: "1",
    exptext: "✅ Bhaona is the presentation of Ankiya Naat. 📌 Play is Ankiya Naat, show is Bhaona. ❌ Jhumura and Chali are dance numbers."
  },
  52: {
    questext: "Consider the following statements about Sattriya:\n1. Its music is called Borgeet.\n2. It is a classical dance of Odisha.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Borgeet and Assam go together. ❌ Statement 2 is wrong because Sattriya belongs to Assam."
  },
  53: {
    type: "concept", icon: "🏫", accent: "#06b6d4", pauseTimer: true,
    title: "Dance Organisations",
    html: `
      <p class="cp-lead">Many schools and academies train classical dancers. <u>Exam questions ask who founded which school, where it is, and in which year.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/28.png" alt="Kalakshetra Foundation Chennai campus photo" data-caption="The Kalakshetra campus in Chennai, home of Bharatanatyam training." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/29.png" alt="Darpana Academy of Performing Arts Ahmedabad photo" data-caption="Darpana Academy of Performing Arts in Ahmedabad." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/30.png" alt="Map-like schematic, not a map: cities Chennai, Ahmedabad, New Delhi, Mumbai, Imphal as box" data-caption="Which city hosts which famous dance school." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Organisation</th><th>Details</th></tr></thead><tbody><tr><td>Sangeet Natak Akademi and Indian National School of Dance</td><td>Delhi; national centre for the performing arts</td></tr><tr><td>Kalakshetra</td><td>Chennai; founded by Rukmini Devi Arundale in 1936; she is the mother of modern Bharatanatyam</td></tr><tr><td>National Institute of Kathak (Kathak Kendra)</td><td>New Delhi; set up in 1964</td></tr><tr><td>Nehru Manipur Dance Academy</td><td>Imphal; set up in 1954</td></tr><tr><td>Govindji Nrityalaya</td><td>Manipur</td></tr><tr><td>Darpana Academy of Performing Arts</td><td>Ahmedabad; 1949; founded by Mrinalini Sarabhai and Vikram Sarabhai</td></tr><tr><td>Nalanda Nritya Kala Mahavidyalaya</td><td>Mumbai; founded by Kanak Rele</td></tr><tr><td>National Centre for the Performing Arts</td><td>Mumbai</td></tr><tr><td>Kalashram Kathak School</td><td>New Delhi; founded by Birju Maharaj</td></tr><tr><td>Kadam School of Dance and Music</td><td>Ahmedabad; 1967; founded by Kumudini Lakhia</td></tr></tbody></table>
      <div class="cp-note trap">Darpana Academy was founded by two people, Mrinalini Sarabhai and Vikram Sarabhai, while Kadam was founded by Kumudini Lakhia. Do not mix the Ahmedabad schools.</div>
      <div class="cp-note exam">Match the pairs: Kalakshetra with Rukmini Devi Arundale, Kadam with Kumudini Lakhia, Kalashram with Birju Maharaj, Nalanda with Kanak Rele, Darpana with the Sarabhai pair.</div>
      <div class="cp-mnemonic">Dance schools by city: Chennai Kalakshetra, Ahmedabad Darpana and Kadam, Delhi Kathak Kendra, Mumbai Nalanda.</div>
    `
  },
  54: {
    questext: "Who founded the Kalakshetra School of Dance in Chennai?",
    options: ["Mrinalini Sarabhai", "Kumudini Lakhia", "Birju Maharaj", "Rukmini Devi Arundale"],
    correct: "4",
    exptext: "✅ Rukmini Devi Arundale founded Kalakshetra in 1936. 📌 Rukmini equals modern Bharatanatyam. ❌ Mrinalini Sarabhai is linked with Darpana."
  },
  55: {
    questext: "In which city was the Darpana Academy of Performing Arts founded in 1949?",
    options: ["Chennai", "Ahmedabad", "Mumbai", "Imphal"],
    correct: "2",
    exptext: "✅ Darpana was founded in Ahmedabad by Mrinalini and Vikram Sarabhai. 📌 Darpana and Ahmedabad both have an A sound in the name. ❌ Chennai is the city of Kalakshetra."
  },
  56: {
    questext: "Which dance school was set up by the Kathak master Birju Maharaj in New Delhi?",
    options: ["Kadam", "Nalanda", "Kalashram", "Govindji Nrityalaya"],
    correct: "3",
    exptext: "✅ Kalashram was started by Birju Maharaj in New Delhi. 📌 Birju and Kalashram go together. ❌ Kadam was started by Kumudini Lakhia."
  },
  57: {
    questext: "Consider the following statements about dance organisations:\n1. The Nehru Manipur Dance Academy was set up in 1954 at Imphal.\n2. Kadam School of Dance and Music was founded by Kumudini Lakhia.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Imphal for Manipuri, Ahmedabad for Kadam. ❌ The other options wrongly call one of the correct facts false."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an elegant gold-lined classical dancer silhouette in a graceful mudra pose, a lit brass oil lamp and a few jasmine flowers" },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Natya Shastra manuscript Bharata Muni illustration\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/1.png. an old Natya Shastra manuscript page or statue of Bharata Muni",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nataraja Shiva bronze statue Tandava pose museum\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/2.png. the bronze Nataraja statue of Lord Shiva in Tandava pose",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/3.png": { t: "fig", about: "Two-column picture. Left column Lasya with label Feminine and Parvati, soft and graceful. Right column Tandava with label Masculine and Shiva, strong and energetic." },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bharatanatyam dancer araimandi pose stage photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/4.png. a dancer in the half-sitting araimandi pose with hand gesture",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rukmini Devi Arundale Kalakshetra portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/5.png. portrait of Rukmini Devi Arundale",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/6.png": { t: "fig", about: "Flow of six boxes left to right: Alarippu, Jatiswaram, Shabdam, Varnam, Padam, Tillana, with the heading Order of a Bharatanatyam recital." },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kuchipudi dancer stage performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/7.png. a Kuchipudi dancer in costume on stage",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tarangam Kuchipudi dance brass plate water pot photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/8.png. a dancer performing on the rim of a brass plate with a water pot",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/9.png": { t: "fig", about: "Simple chain: Tirtha Narayana Yati, then Siddhendra Yogi, then Brahmin boys of Kuchipudi village, then modern dancers." },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mohiniyattam dancer white gold kasavu saree photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/10.png. a Mohiniyattam dancer in white and gold costume",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vallathol Narayana Menon Kerala Kalamandalam founder portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/11.png. portrait of Vallathol Narayana Menon",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/12.png": { t: "fig", about: "Comparison picture: left side Bharatanatyam sharp straight lines, right side Mohiniyattam soft curved wave lines, with labels Sharp and Fire, Smooth and Air." },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kathakali performer pacha green make-up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/13.png. a Kathakali artist with green pacha face make-up and large headdress",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kathakali kathi vesham knife make-up face photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/14.png. a Kathakali villain character with kathi make-up",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/15.png": { t: "fig", about: "Five colour boxes with labels: Pacha green for noble heroes, Kathi knife for evil, Kari black for forest dwellers, Thaadi beard for special characters, Minukku radiant for women and sages." },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Odissi dancer tribhanga pose stage photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/16.png. an Odissi dancer in the tribhanga three-bend pose",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Konark Sun Temple dancer sculpture photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/17.png. dancing figures carved on the Konark Sun Temple",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/18.png": { t: "fig", about: "Chart with two columns. Left: Names ending with Mohapatra. Right: Names ending with Mohanty. Heading: Surname clues for Odissi artists." },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kathak dancer chakkar spin stage photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/19.png. a Kathak dancer spinning in a long flowing skirt",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Birju Maharaj Kathak performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/20.png. Birju Maharaj performing Kathak",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/21.png": { t: "fig", about: "Picture with three labels: Persian elements, Hindustani music, Thumri songs, all pointing to a central Kathak dancer." },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manipuri Ras Leela dancers barrel skirt kumil photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/22.png. Manipuri Ras Leela dancers in the barrel-shaped skirt",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pung Cholom drummers Manipur dance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/23.png. Pung Cholom drum dance of Manipur",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/24.png": { t: "fig", about: "Four-box chart. Boxes: Ras Leela with Radha and Krishna, Sankirtana with Pung drum, Jagoi and Cholom, Thang Ta martial art. Heading: Forms of Manipuri." },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sattriya dancer Assam Satra performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/25.png. a Sattriya dancer in traditional Assamese silk costume",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Majuli Satra Assam monastery photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/26.png. a Satra monastery on Majuli island in Assam",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/27.png": { t: "fig", about: "Simple tree. Top: Srimanta Sankardeva. Branches: Ankiya Naat, Bhaona, Borgeet, Sattriya dance." },
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kalakshetra Foundation Chennai campus photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/28.png. the campus of Kalakshetra in Chennai",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Darpana Academy of Performing Arts Ahmedabad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/29.png. Darpana Academy building in Ahmedabad",
  "images/General_Awareness/Art_and_Culture/Classical_Dances_Exponents/30.png": { t: "fig", about: "Map-like schematic, not a map: cities Chennai, Ahmedabad, New Delhi, Mumbai, Imphal as boxes linked to school names." }
});

/* CHANGE LOG
   - Bharatanatyam: the old name Sadir and the other temple-dance names are listed together, and the Tanjore Quartet is added as extra exam information.
   - Kuchipudi: the link to Bhagavata Mela is written as a related temple-theatre tradition of Thanjavur, because it is a separate but related tradition.
   - Kuchipudi: Siddhendra Yogi is placed as the artist who shaped the dance after Tirtha Narayana Yati.
   - Manipuri: the name written as Nimala Mehta is corrected to Nirmala Mehta; one unclear name (Aluna Kabuini) is left out because it could not be confirmed.
   - Sattriya: the names Bhupen Hazarika and Monogram Dutta are left out because they could not be confirmed as Sattriya exponents.
   - Organisations: National Institute of Performing Arts at Mumbai is written correctly as the National Centre for the Performing Arts; Nalanda Nritya Kala Mahavidyalaya is credited to Kanak Rele; Kalakshetra year 1936 and Kathak Kendra year 1964 are added.
   - Names with initials are written in full form where possible (for example Vallathol Narayana Menon, Kottakkal Nandakumaran Nair).
*/