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

/* Field: General_Awareness · Subject: Static_GK · Chapter: Festivals_of_India · 30 concept pages (+ overview) · 75 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎊", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Festivals of India, State by State",
    thumb: {
      image: "images/General_Awareness/Static_GK/Festivals_of_India/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "FESTIVALS",
      line2: "OF INDIA",
      line3: "STATE-WISE MAP",
      badge: "FULL CLASS",
      ribbon: "FAIRS • TRIBES • MCQ",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Festivals of India State-wise | Static GK Full Class for SSC CGL",
      altTitles: ["All Indian Festivals in One Class | Static GK Mind Map", "Fairs and Festivals of India with Tricks | SSC CGL"],
      description: "Festivals of India is a sure-shot Static GK topic. In this full class we go state by state and link every festival with its state, its tribe, its month and its place.\n\n📌 IN THIS CLASS\n✅ Bihu, Pongal, Onam, Hornbill, Rath Yatra and many more\n✅ Tribe-wise festivals of the North East\n✅ New Year festivals of India\n✅ Exam-style questions with simple explanations\n\n⏱️ CHAPTERS\nSee the chapter list in the pinned comment.\n\n👍 Like, share, subscribe.\n\n#SSCCGL #StaticGK #Festivals",
      tags: ["festivals of india", "indian festivals state wise", "static gk", "static gk for ssc cgl", "fairs and festivals of india", "festivals gk", "important festivals", "bihu festival", "pongal festival", "onam festival", "hornbill festival", "rath yatra", "north east festivals", "tribal festivals", "new year festivals of india", "ssc cgl gk", "general awareness", "competitive exams", "railway gk", "banking gk", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "full class", "tricks", "questions", "MCQ", "previous year questions", "Festivals of India Static_G"],
      hashtags: ["SSCCGL", "StaticGK", "Festivals"],
      thumbText: "FESTIVALS OF INDIA",
      pinnedComment: "📌 Which festival did you find the hardest? Write it below 👇",
      communityPost: "🎊 New class is live: Festivals of India, state by state. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Andhra Pradesh\n00:00 Arunachal Pradesh\n00:00 Assam\n00:00 Bihar\n00:00 Chhattisgarh\n00:00 Goa\n00:00 Gujarat\n00:00 Haryana\n00:00 Himachal Pradesh\n00:00 Jammu and Kashmir\n00:00 Jharkhand\n00:00 Karnataka\n00:00 Kerala\n00:00 Ladakh\n00:00 Madhya Pradesh\n00:00 Maharashtra\n00:00 Manipur\n00:00 Meghalaya\n00:00 Mizoram\n00:00 Nagaland\n00:00 Odisha\n00:00 Punjab\n00:00 Rajasthan\n00:00 Sikkim\n00:00 Tamil Nadu\n00:00 Telangana\n00:00 Tripura\n00:00 Uttarakhand\n00:00 West Bengal\n00:00 New Year Festivals of India",
      playlist: "Static GK — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, state-wise class on the fairs and festivals of India</u>, built from one big mind map. Festivals are a sure-shot topic of Static General Knowledge, so we will learn each one with its state, its meaning and one exam point.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>30</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>75</b><span>Questions</span></div>
        <div class="cp-stat"><b>~135 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Andhra Pradesh</b><br>Ugadi, the Telugu New Year, and the Jataras held for mother goddesses.</li>
        <li><b>Arunachal Pradesh</b><br>Which tribe celebrates Dree, Solung, Mopin, Losar and Sangken.</li>
        <li><b>Assam</b><br>The three Bihu festivals and the tribal festivals of the state.</li>
        <li><b>Bihar</b><br>Chhath, the Sonepur Cattle Fair and the festivals of Mithila.</li>
        <li><b>Chhattisgarh</b><br>Bastar Dussehra, Hareli, Pola and the tribal fairs.</li>
        <li><b>Goa</b><br>Shigmo, Carnival and the Christian feasts of the state.</li>
        <li><b>Gujarat</b><br>Rann Utsav, the Modhera Dance Festival and the old fairs.</li>
        <li><b>Haryana</b><br>The Surajkund Crafts Mela, Gugga Naumi and Pinjore.</li>
        <li><b>Himachal Pradesh</b><br>Minjar, Kullu Dussehra and the festivals of the hill valleys.</li>
        <li><b>Jammu and Kashmir</b><br>The Tulip Festival, the Shikara Festival and holy fairs.</li>
        <li><b>Jharkhand</b><br>Sarhul, Karam, Sohrai and the nature festivals of the tribes.</li>
        <li><b>Karnataka</b><br>Mahamastakabhisheka, Kambala, Karaga and Mysuru Dasara.</li>
        <li><b>Kerala</b><br>Onam, Vishu, Thrissur Pooram, Theyyam and the boat races.</li>
        <li><b>Ladakh</b><br>Hemis, Saka Dawa and Losar, the Buddhist festivals.</li>
        <li><b>Madhya Pradesh</b><br>The Tansen Music Festival, the Khajuraho Dance Festival and Bhagoria Haat.</li>
        <li><b>Maharashtra</b><br>Gudhi Padwa, Ganesh Chaturthi, Narali Purnima and Pola.</li>
        <li><b>Manipur</b><br>Lai Haraoba, Yaosang, Kang and the festivals of the Naga tribes.</li>
        <li><b>Meghalaya</b><br>The festivals of the Garo, Khasi and Jaintia tribes.</li>
        <li><b>Mizoram</b><br>The three Kut festivals and the farming year.</li>
        <li><b>Nagaland</b><br>The Hornbill Festival and the festivals of each Naga tribe.</li>
        <li><b>Odisha</b><br>Rath Yatra, Bali Jatra, Raja Parba and Nuakhai.</li>
        <li><b>Punjab</b><br>Baisakhi, Hola Mohalla and Lohri.</li>
        <li><b>Rajasthan</b><br>Pushkar Fair, the Desert Festival, Baneshwar Fair and Gangaur.</li>
        <li><b>Sikkim</b><br>Sakewa, Saga Dawa, Losar and Losung.</li>
        <li><b>Tamil Nadu</b><br>The four days of Pongal, Jallikattu, Mahamaham and the music festivals.</li>
        <li><b>Telangana</b><br>Bathukamma, the Medaram Jatara and Bonalu.</li>
        <li><b>Tripura</b><br>Kharchi Puja, Garia Puja, Bijhu and Hojagiri.</li>
        <li><b>Uttarakhand</b><br>Phool Dei, Harela, Bhitauli and Kandali.</li>
        <li><b>West Bengal</b><br>Poila Baisakh, Durga Puja, Gangasagar and the Poush Mela.</li>
        <li><b>New Year Festivals of India</b><br>A group chart of the New Year festivals of all the states.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on festivals ask you to match a festival with its state, its tribe, its month or its place. Learning them state by state, with a picture in your mind, helps you answer these questions in a few seconds.</div>
    `
  },
  2: {
    type: "concept", icon: "🌸", accent: "#f43f5e", pauseTimer: true,
    title: "Andhra Pradesh",
    html: `
      <p class="cp-lead">Andhra Pradesh begins its year with <b>Ugadi</b> and honours mother goddesses with big fairs called <b>Jataras</b>. <u>Learn each festival together with its meaning.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/1.png" alt="Ugadi pachadi six tastes Telugu New Year photo" data-caption="Ugadi pachadi, the six-taste dish of the Telugu New Year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/2.png" alt="A simple circle with six equal parts labelled Sweet, Sour, Salty, Bitter, Spicy, Tangy and" data-caption="The six tastes of Ugadi pachadi stand for the six feelings of life." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>A Jatara is a big fair held for a village or tribal goddess. People travel from many villages to offer prayers, food and music. Ugadi is different: it is the New Year, so families clean their homes, hang mango leaves on the door and eat a special dish with six tastes.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Ugadi</td><td>Telugu New Year in the month of Chaitra (March or April)</td></tr><tr><td>Durgamma Jatara</td><td>Fair for the mother goddess Durgamma</td></tr><tr><td>Yellama Jatara</td><td>Fair for the goddess Yellamma, also called Renuka</td></tr><tr><td>Visakha Utsav</td><td>Cultural festival of the port city of Visakhapatnam</td></tr><tr><td>Brahmotsavam</td><td>Nine-day festival of Lord Venkateswara at Tirumala</td></tr></tbody></table>
      <div class="cp-note trap">Ugadi is also celebrated in Telangana and in Karnataka (where it is called Yugadi), so do not link it with Andhra Pradesh alone.</div>
      <div class="cp-note exam">The six tastes of Ugadi pachadi are sweet, sour, salty, bitter, spicy and tangy. They teach that life brings both joy and sorrow.</div>
    `
  },
  3: {
    questext: "Which festival marks the New Year of the Telugu people in Andhra Pradesh?",
    options: ["Onam", "Ugadi", "Vishu", "Bihu"],
    correct: "2",
    exptext: "✅ Ugadi is the Telugu New Year, celebrated in the month of Chaitra. 📌 Ugadi means the start of a new age. ❌ Onam and Vishu belong to Kerala, and Bihu belongs to Assam."
  },
  4: {
    questext: "Consider the following statements about Ugadi:\n1. Ugadi is the harvest festival of Andhra Pradesh, celebrated in January.\n2. Ugadi is celebrated only in Andhra Pradesh and in no other state.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "4",
    exptext: "✅ Neither statement is correct. Ugadi is a New Year festival of March or April, and it is also celebrated in Telangana and Karnataka. 📌 Ugadi means New Year, and the harvest festival is Sankranti. ❌ Statement 1 mixes up the two festivals."
  },
  5: {
    type: "concept", icon: "🏔️", accent: "#22c55e", pauseTimer: true,
    title: "Arunachal Pradesh",
    html: `
      <p class="cp-lead">Arunachal Pradesh is a land of many tribes, so almost every tribe has its own festival for a <b>good harvest</b> or for the <b>New Year</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/3.png" alt="Dree festival Apatani tribe Ziro Arunachal photo" data-caption="Apatani people dressed in traditional clothes at the Dree festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/4.png" alt="Five boxes joined to five festival names: Apatani to Dree, Adi to Solung, Galo to Mopin, M" data-caption="Each tribe of the state is linked with its own festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The best way to learn this page is to link each festival with its tribe. The Apatani tribe of Ziro Valley celebrates Dree in July and prays for a good crop. The Adi tribe celebrates Solung in September after sowing. The Galo tribe celebrates Mopin in April to please the goddess of wealth and food.</p>
      <table><thead><tr><th>Festival</th><th>Tribe or group</th><th>Meaning</th></tr></thead><tbody><tr><td>Dree</td><td>Apatani</td><td>Prayer for a good harvest (July)</td></tr><tr><td>Solung</td><td>Adi</td><td>Farming festival (September)</td></tr><tr><td>Mopin</td><td>Galo</td><td>Spring festival where rice flour is smeared (April)</td></tr><tr><td>Losar</td><td>Monpa</td><td>Buddhist New Year of the Tawang region</td></tr><tr><td>Sangken</td><td>Khamti</td><td>Water festival and New Year (April)</td></tr><tr><td>Chalo Loku</td><td>Nocte</td><td>Harvest festival (December)</td></tr><tr><td>Pangsau Winter Festival</td><td>Changlang district</td><td>January festival held near the Pangsau Pass</td></tr></tbody></table>
      <div class="cp-note trap">Sangken (Khamti) and Losar (Monpa) are both Buddhist New Year festivals, but they belong to different tribes.</div>
      <div class="cp-note exam">Questions usually ask "which tribe celebrates which festival". Remember: Dree is Apatani, Solung is Adi and Mopin is Galo.</div>
    `
  },
  6: {
    questext: "Dree, a festival of prayer for a good harvest, is celebrated by which tribe of Arunachal Pradesh?",
    options: ["Adi", "Galo", "Monpa", "Apatani"],
    correct: "4",
    exptext: "✅ Dree is the festival of the Apatani tribe of Ziro Valley, held in July. 📌 Dree for Ziro, Solung for Adi. ❌ Adi celebrate Solung and Galo celebrate Mopin, so they are tempting but wrong."
  },
  7: {
    questext: "Which of the following pairs of festival and tribe is correctly matched?",
    options: ["Solung and Galo", "Mopin and Adi", "Sangken and Khamti", "Dree and Monpa"],
    correct: "3",
    exptext: "✅ Sangken is the water festival of the Khamti tribe. 📌 Solung belongs to Adi, Mopin to Galo and Dree to Apatani. ❌ Solung with Galo is wrong because Solung is an Adi festival."
  },
  8: {
    type: "concept", icon: "🌾", accent: "#f59e0b", pauseTimer: true,
    title: "Assam",
    html: `
      <p class="cp-lead">The biggest festival of Assam is <b>Bihu</b>, and it comes <u>three times in a year</u>, once for each stage of farming.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/5.png" alt="Bohag Bihu dance Assam dancers photo" data-caption="Dancers perform the Bihu dance in red and white Assamese clothes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/6.png" alt="A year wheel with three parts: April Bohag Bihu (sowing and New Year), October Kati Bihu (" data-caption="The three Bihu festivals follow the farming year of Assam." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Bihu follows the farmer's year. Bohag Bihu in April welcomes spring and the Assamese New Year. Kati Bihu in October is quiet, because the barns are almost empty; people light lamps in the paddy fields and before the tulsi plant. Magh Bihu in January is a big feast after the harvest, with bonfires and food.</p>
      <table><thead><tr><th>Festival</th><th>Other name or people</th><th>Meaning</th></tr></thead><tbody><tr><td>Bohag Bihu</td><td>Rongali Bihu</td><td>Assamese New Year and spring, in April</td></tr><tr><td>Magh Bihu</td><td>Bhogali Bihu</td><td>Harvest feast, in January</td></tr><tr><td>Kati Bihu</td><td>Kongali Bihu</td><td>Lamps in the paddy fields, in October</td></tr><tr><td>Ambubachi Mela</td><td>Kamakhya temple, Guwahati</td><td>Yearly fair in June</td></tr><tr><td>Ali-Ai-Ligang</td><td>Mising tribe</td><td>Sowing festival of February</td></tr><tr><td>Baishagu</td><td>Bodo tribe</td><td>Bodo New Year in April</td></tr><tr><td>Me-Dam-Me-Phi</td><td>Ahom people</td><td>Honouring ancestors on 31 January</td></tr><tr><td>Dehing Patkai Festival</td><td>Lekhapani, Tinsukia</td><td>Festival held in January</td></tr><tr><td>Rongker</td><td>Karbi people</td><td>Festival for health and a good crop</td></tr><tr><td>Baikho</td><td>Rabha tribe</td><td>Worship of the goddess of wealth for a good harvest</td></tr></tbody></table>
      <div class="cp-note trap">Kati Bihu is the "poor" Bihu (Kongali) because food stores are low. The feast Bihu is Magh Bihu (Bhogali).</div>
      <div class="cp-note exam">Majuli, in the river Brahmaputra, is the largest river island in the world and is famous for its Vaishnavite monasteries called satras.</div>
    `
  },
  9: {
    questext: "Consider the following statements about Bihu:\n1. Kati Bihu is also known as Kongali Bihu.\n2. Bohag Bihu marks the Assamese New Year.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Kati Bihu is Kongali Bihu, and Bohag Bihu falls in April as the New Year. 📌 Three Bihus: Bohag for sowing, Kati for growing, Magh for harvest. ❌ Neither is wrong, so the single options fail."
  },
  10: {
    questext: "The Ambubachi Mela of Assam is held at which temple?",
    options: ["Kamakhya temple", "Umananda temple", "Hayagriva Madhava temple", "Sivadol temple"],
    correct: "1",
    exptext: "✅ The Ambubachi Mela is held every June at the Kamakhya temple in Guwahati. 📌 Ambu means water and bachi means flow, linked with the monsoon and the earth. ❌ Umananda is a temple on an island of the Brahmaputra but hosts no such fair."
  },
  11: {
    questext: "Which Bihu of Assam is also called Bhogali Bihu?",
    options: ["Bohag Bihu", "Kati Bihu", "Rongali Bihu", "Magh Bihu"],
    correct: "4",
    exptext: "✅ Magh Bihu is Bhogali Bihu, the feast of January. 📌 Bhogali comes from bhog, which means enjoyment and food. ❌ Rongali Bihu is another name of Bohag Bihu, which is the New Year festival."
  },
  12: {
    type: "concept", icon: "☀️", accent: "#ef4444", pauseTimer: true,
    title: "Bihar",
    html: `
      <p class="cp-lead">The festivals of Bihar are linked with the <b>Sun</b>, with <b>rivers</b> and with the strong bond between brothers and sisters.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/7.png" alt="Chhath Puja devotees standing in river offering arghya photo" data-caption="Devotees offer prayers to the setting sun during Chhath Puja." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/8.png" alt="Sonepur cattle fair Bihar Harihar Kshetra photo" data-caption="The Sonepur fair is one of the largest cattle fairs in Asia." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Chhath is the main festival of Bihar. It is held six days after Diwali and lasts four days. Families stand in rivers or ponds and offer thanks to the Sun God and to Chhathi Maiya, first at sunset and then at sunrise. The Sonepur fair is held on the full moon of Kartik, near the meeting point of the Ganga and the Gandak.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Chhath</td><td>Four-day worship of the Sun God; offerings are made to the setting and the rising sun</td></tr><tr><td>Sama Chakeva</td><td>Mithila festival of November that celebrates the love of brother and sister</td></tr><tr><td>Bihula</td><td>Folk festival of the Bhagalpur region for the snake goddess Bishahari</td></tr><tr><td>Rajgir Dance Festival</td><td>Music and dance festival at Rajgir in the Nalanda district</td></tr><tr><td>Sonepur Cattle Fair</td><td>Month-long fair after Kartik Purnima, also called Harihar Kshetra Mela</td></tr></tbody></table>
      <div class="cp-note trap">In Chhath the first offering is made to the setting sun, not the rising sun. This surprises many learners.</div>
      <div class="cp-note exam">Sonepur is among the largest cattle fairs in Asia. It is held where the river Gandak joins the Ganga.</div>
    `
  },
  13: {
    questext: "Which festival of Bihar is dedicated to the Sun God and Chhathi Maiya?",
    options: ["Sama Chakeva", "Chhath", "Bihula", "Rajgir Dance Festival"],
    correct: "2",
    exptext: "✅ Chhath is the four-day worship of the Sun God and Chhathi Maiya. 📌 Chhath means the sixth day after Diwali. ❌ Sama Chakeva is for the love of brother and sister, not for the Sun."
  },
  14: {
    questext: "The Sonepur Cattle Fair of Bihar is held near the meeting point of the Ganga and which river?",
    options: ["Kosi", "Gandak", "Son", "Bagmati"],
    correct: "2",
    exptext: "✅ Sonepur lies where the Gandak joins the Ganga, and the fair is held after Kartik Purnima. 📌 Sonepur is on the Gandak. ❌ The Son is tempting because of the name, but Sonepur is not at its meeting point."
  },
  15: {
    type: "concept", icon: "🥁", accent: "#8b5cf6", pauseTimer: true,
    title: "Chhattisgarh",
    html: `
      <p class="cp-lead">The festivals of Chhattisgarh show <u>respect for farmers, farm animals and tribal gods</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/9.png" alt="Bastar Dussehra rath procession Jagdalpur photo" data-caption="The huge wooden chariot of Bastar Dussehra pulled by villagers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/10.png" alt="A horizontal bar showing 75 days with a small mark at the start and a bigger mark at the e" data-caption="Bastar Dussehra lasts seventy-five days, the longest Dussehra in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Bastar Dussehra is different from the Dussehra of the rest of India. It lasts 75 days and honours the goddess Danteshwari, the family deity of the tribes of Bastar. Ravana is not burnt. Instead, a huge wooden chariot is pulled through the town of Jagdalpur.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Bastar Dussehra</td><td>Seventy-five day festival for the goddess Danteshwari</td></tr><tr><td>Hareli</td><td>Festival of the first rains in Shravan; farmers worship their tools and cattle</td></tr><tr><td>Pola</td><td>Festival of bulls, when farmers thank their oxen</td></tr><tr><td>Karma</td><td>Tribal festival where the Karam tree is worshipped for a good harvest</td></tr><tr><td>Madai</td><td>Winter fairs of the Bastar region held for village deities</td></tr><tr><td>Goncha</td><td>Bastar festival in which a toy gun made of bamboo is fired</td></tr></tbody></table>
      <div class="cp-note trap">Bastar Dussehra is not about the death of Ravana. It honours the local goddess Danteshwari.</div>
      <div class="cp-note exam">Bastar Dussehra is known as the longest festival of its kind, with a duration of 75 days.</div>
    `
  },
  16: {
    questext: "For how many days does Bastar Dussehra last?",
    options: ["9 days", "10 days", "15 days", "75 days"],
    correct: "4",
    exptext: "✅ Bastar Dussehra lasts 75 days, the longest in India. 📌 Remember 75 and the goddess Danteshwari. ❌ Nine and ten days belong to Navratri and the Dussehra of other places."
  },
  17: {
    questext: "Hareli, which comes with the first rains, is mainly a festival of which group of people?",
    options: ["Farmers", "Fishermen", "Weavers", "Potters"],
    correct: "1",
    exptext: "✅ Hareli is a farmers' festival, when they worship ploughs, tools and cattle. 📌 Hareli comes from hariyali, which means greenery. ❌ Fishermen and weavers have different festivals, so they are wrong here."
  },
  18: {
    type: "concept", icon: "⛪", accent: "#14b8a6", pauseTimer: true,
    title: "Goa",
    html: `
      <p class="cp-lead">Goa mixes <b>Hindu spring festivals</b> with <b>Christian feasts</b>, so its calendar is full of colour, music and parades.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/11.png" alt="Basilica of Bom Jesus Old Goa feast Saint Francis Xavier photo" data-caption="The Basilica of Bom Jesus in Old Goa." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/12.png" alt="Shigmo festival Goa parade floats photo" data-caption="A colourful Shigmo parade in Goa." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Shigmo is the Goan spring festival, like Holi, with street parades and folk dances. The Feast of Saint Francis Xavier is held on 3 December at the Basilica of Bom Jesus in Old Goa, where the body of the saint is kept. Carnival comes just before the Christian season of Lent and has loud street parades.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Shigmo</td><td>Spring festival with parades, folk dance and colour</td></tr><tr><td>Carnival</td><td>Parades and floats before Lent, in February</td></tr><tr><td>Feast of Saint Francis Xavier</td><td>3 December, Basilica of Bom Jesus, Old Goa</td></tr><tr><td>Three Kings Feast</td><td>6 January, remembers the three wise men</td></tr><tr><td>Sao Jao</td><td>24 June, people jump into wells and wear leaf crowns</td></tr><tr><td>Bonderam</td><td>August festival of flags and mock fights on Divar Island</td></tr><tr><td>Sunburn</td><td>Electronic dance music festival that began in Goa</td></tr><tr><td>Grape Escapade</td><td>Festival of grapes and wine making</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse Shigmo (Hindu, spring) with Carnival (Christian, before Lent). Both have parades.</div>
      <div class="cp-note exam">The Basilica of Bom Jesus is a World Heritage Site and holds the remains of Saint Francis Xavier.</div>
    `
  },
  19: {
    questext: "The Feast of Saint Francis Xavier is celebrated in Goa on which date?",
    options: ["6 January", "24 June", "3 December", "15 August"],
    correct: "3",
    exptext: "✅ The feast is on 3 December at the Basilica of Bom Jesus. 📌 Remember 3 December, the last month of the year. ❌ 6 January is the Three Kings Feast, which is the tempting date."
  },
  20: {
    questext: "Bonderam, the festival of flags, is celebrated on which island of Goa?",
    options: ["Chorao Island", "Grande Island", "Divar Island", "Saint Jacinto Island"],
    correct: "3",
    exptext: "✅ Bonderam is held every August on Divar Island. 📌 Bonderam is the flag festival of Divar. ❌ Chorao is known for a bird sanctuary, not for this festival."
  },
  21: {
    type: "concept", icon: "🏜️", accent: "#ec4899", pauseTimer: true,
    title: "Gujarat",
    html: `
      <p class="cp-lead">Gujarat celebrates <b>dance, temples and fairs</b>, from the white desert of Kutch to the old Sun Temple of Modhera.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/13.png" alt="Rann Utsav Kutch white desert tent city photo" data-caption="The white desert of Kutch during the Rann Utsav." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/14.png" alt="Modhera Sun Temple dance festival stage photo" data-caption="Dancers perform in front of the Sun Temple at Modhera." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Rann Utsav is a winter festival in the Rann of Kutch, where visitors stay in a tent city on a huge salt desert and enjoy folk music and crafts. The Modhera Dance Festival is held in January, after the kite festival of Uttarayan, in front of the old Sun Temple at Modhera, in the Mehsana district.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Rann Utsav</td><td>Winter festival of the white desert in Kutch</td></tr><tr><td>Modhera Dance Festival</td><td>Classical dance in front of the Sun Temple, in January</td></tr><tr><td>Vautha Mela</td><td>Well-known livestock fair in Kartik, near the meeting of seven rivers</td></tr><tr><td>Madhavpur Mela</td><td>Fair near Porbandar that celebrates the wedding of Lord Krishna and Rukmini</td></tr><tr><td>Shamlaji Mela</td><td>Fair of Kartik in the Aravalli district for Lord Shamlaji</td></tr><tr><td>Navratri</td><td>Nine nights of Garba dance across the state</td></tr></tbody></table>
      <div class="cp-note trap">The Sun Temple of Modhera is in Gujarat. The Sun Temple of Konark is in Odisha, so keep them apart.</div>
      <div class="cp-note exam">Madhavpur is in the Porbandar district, and the fair there remembers the marriage of Rukmini and Krishna.</div>
    `
  },
  22: {
    questext: "The Rann Utsav is held in which region of Gujarat?",
    options: ["Kutch", "Saurashtra", "Kathiawar coast", "South Gujarat"],
    correct: "1",
    exptext: "✅ Rann Utsav is held in the white salt desert of Kutch in winter. 📌 Rann means a salt desert. ❌ Saurashtra is a different region and has no white desert."
  },
  23: {
    questext: "The Modhera Dance Festival is held in front of which temple?",
    options: ["Somnath Temple", "Dwarkadhish Temple", "Ambaji Temple", "Sun Temple"],
    correct: "4",
    exptext: "✅ The festival is held in front of the Sun Temple of Modhera in January. 📌 Modhera means the Sun Temple. ❌ Somnath is a Shiva temple on the coast and has no such dance festival."
  },
  24: {
    type: "concept", icon: "🎨", accent: "#3b82f6", pauseTimer: true,
    title: "Haryana",
    html: `
      <p class="cp-lead">Haryana is known for the world-famous <b>Surajkund Crafts Mela</b>, for snake-god worship and for its royal gardens at Pinjore.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/15.png" alt="Surajkund International Crafts Mela Faridabad photo" data-caption="Stalls and visitors at the Surajkund Crafts Mela near Faridabad." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/16.png" alt="Pinjore Gardens Yadavindra Gardens Panchkula photo" data-caption="The terraced Mughal-style garden at Pinjore, Panchkula." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Surajkund Crafts Mela is held every February in the town of Surajkund, near Faridabad. Craftspeople from many states and from other countries bring their handmade goods, and one state is chosen as the theme state each year. Gugga Naumi honours the folk hero Gugga Pir, who is believed to protect people from snakes.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Surajkund Mela</td><td>International crafts fair in February near Faridabad</td></tr><tr><td>Gugga Naumi</td><td>Day of Gugga Pir, the protector from snakes, in the month of Bhadrapada</td></tr><tr><td>Pinjore Heritage Festival</td><td>Music and culture festival in the Pinjore Gardens</td></tr><tr><td>Gangaur</td><td>Women pray to the goddess Gauri for a happy married life</td></tr></tbody></table>
      <div class="cp-note trap">Surajkund is in Haryana, near Faridabad, and not in Delhi, although it lies close to the capital.</div>
      <div class="cp-note exam">Surajkund means the Pond of the Sun. It has an old tank believed to have been built by a ruler of the Tomar dynasty.</div>
    `
  },
  25: {
    questext: "The Surajkund International Crafts Mela is held every year near which city of Haryana?",
    options: ["Gurugram", "Faridabad", "Ambala", "Karnal"],
    correct: "2",
    exptext: "✅ The fair is held in February at Surajkund, close to Faridabad. 📌 Surajkund is the Faridabad fair. ❌ Gurugram is also near Delhi, which makes it tempting."
  },
  26: {
    questext: "Gugga Naumi in Haryana is observed to honour which folk deity?",
    options: ["Teja Ji", "Gugga Pir", "Pabuji", "Ramdevji"],
    correct: "2",
    exptext: "✅ Gugga Naumi honours Gugga Pir, who is worshipped as a protector from snakes. 📌 Gugga for snakes. ❌ Ramdevji and Pabuji are folk deities of Rajasthan."
  },
  27: {
    type: "concept", icon: "🏞️", accent: "#f97316", pauseTimer: true,
    title: "Himachal Pradesh",
    html: `
      <p class="cp-lead">The festivals of Himachal Pradesh are linked with <b>seasons, crops and the hill gods</b> of the valleys.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/17.png" alt="Kullu Dussehra Dhalpur ground Raghunath rath procession photo" data-caption="The chariot of Lord Raghunath at the Kullu Dussehra." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/18.png" alt="Minjar fair Chamba procession Chowgan photo" data-caption="The Minjar fair procession in the town of Chamba." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Minjar is a week-long fair of Chamba held in the month of Shravan. Minjar means a tassel of maize, and people wear it on their clothes to thank the gods for the crop. Kullu Dussehra starts on Vijayadashami and lasts about seven days. Local deities from the valley are brought in procession to honour Lord Raghunath.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Minjar</td><td>Week-long fair of Chamba; maize tassels are worn</td></tr><tr><td>Halda</td><td>Winter festival of Lahaul, when pine torches are lit</td></tr><tr><td>Sair</td><td>Festival at the end of the rainy season, in autumn</td></tr><tr><td>Phulaich</td><td>Flower festival of Kinnaur in September</td></tr><tr><td>Kullu Dussehra</td><td>Starts on Vijayadashami; Lord Raghunath is the main deity</td></tr><tr><td>Chaitraul, Sazo, Pori</td><td>Other seasonal festivals of the hill valleys</td></tr></tbody></table>
      <div class="cp-note trap">Kullu Dussehra begins on Vijayadashami, when the Dussehra of the plains ends.</div>
      <div class="cp-note exam">Kullu Dussehra is celebrated in the Dhalpur Maidan, and Lord Raghunath is its chief deity.</div>
    `
  },
  28: {
    questext: "The Minjar fair, where people wear tassels of maize, is held in which town of Himachal Pradesh?",
    options: ["Kullu", "Shimla", "Mandi", "Chamba"],
    correct: "4",
    exptext: "✅ The Minjar fair is held in Chamba in the month of Shravan. 📌 Minjar means maize tassel. ❌ Kullu is tempting because it is known for Dussehra, not for Minjar."
  },
  29: {
    questext: "Kullu Dussehra in Himachal Pradesh is held in honour of which deity?",
    options: ["Lord Raghunath", "Lord Shiva", "Goddess Durga", "Lord Hanuman"],
    correct: "1",
    exptext: "✅ Lord Raghunath is the chief deity of the Kullu Dussehra. 📌 Raghunath means Lord Rama. ❌ Goddess Durga is tempting because of Dussehra, but she is not the main deity of Kullu."
  },
  30: {
    type: "concept", icon: "🌷", accent: "#84cc16", pauseTimer: true,
    title: "Jammu and Kashmir",
    html: `
      <p class="cp-lead">Jammu and Kashmir celebrates <b>spring flowers</b>, <b>boat life on the lake</b> and holy pilgrimages in the high mountains.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/19.png" alt="Tulip Garden Srinagar Zabarwan hills Dal Lake photo" data-caption="Rows of tulips in the Tulip Garden of Srinagar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/20.png" alt="Shikara boat Dal Lake Srinagar photo" data-caption="A decorated shikara boat floating on Dal Lake." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Tulip Festival is held every April in the Indira Gandhi Memorial Tulip Garden in Srinagar, which lies on the slope of the Zabarwan hills facing the Dal Lake. It is called the largest tulip garden in Asia. A shikara is the small wooden boat of Kashmir, and the Shikara Festival is held on the Dal Lake.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Tulip Festival</td><td>April, Srinagar, largest tulip garden in Asia</td></tr><tr><td>Shikara Festival</td><td>Boat festival on the Dal Lake</td></tr><tr><td>Kheer Bhawani Mela</td><td>Fair of Kashmiri Pandits at Tulmulla for a goddess, in the month of Jyeshtha</td></tr><tr><td>Amarnath Yatra</td><td>Pilgrimage to the ice lingam of Lord Shiva in the Shravan season</td></tr></tbody></table>
      <div class="cp-note trap">Hemis and Saka Dawa belong to Ladakh, not to Jammu and Kashmir, since Ladakh is a separate Union Territory.</div>
      <div class="cp-note exam">The Tulip Garden is named after Indira Gandhi and lies in Srinagar.</div>
    `
  },
  31: {
    questext: "The Tulip Festival, in the largest tulip garden of Asia, is held in which city?",
    options: ["Jammu", "Leh", "Srinagar", "Anantnag"],
    correct: "3",
    exptext: "✅ The garden is in Srinagar, facing the Dal Lake. 📌 Tulips with the Dal Lake mean Srinagar. ❌ Leh is in Ladakh and does not host this garden."
  },
  32: {
    questext: "The Kheer Bhawani Mela of Kashmir is held at which place?",
    options: ["Pahalgam", "Gulmarg", "Tulmulla", "Katra"],
    correct: "3",
    exptext: "✅ The Kheer Bhawani fair is held at the temple of Tulmulla, in the Ganderbal district. 📌 Kheer Bhawani means the goddess who accepts milk and rice pudding. ❌ Katra is the base for the Vaishno Devi pilgrimage and not for this fair."
  },
  33: {
    type: "concept", icon: "🌳", accent: "#06b6d4", pauseTimer: true,
    title: "Jharkhand",
    html: `
      <p class="cp-lead">Jharkhand celebrates <b>nature</b>: its trees, its flowers, its crops and its cattle.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/21.png" alt="Sarhul festival Jharkhand Sal flowers tribal dance photo" data-caption="Tribal dancers carrying Sal flowers at the Sarhul festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/22.png" alt="Sohrai wall painting Jharkhand tribal house photo" data-caption="A mud wall decorated with Sohrai paintings of animals and plants." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Sarhul is the spring festival of the Oraon and Munda tribes. The sal tree flowers in spring, and the tribe worships the village spirit under a sal tree. Karam is the festival of the Karam tree, where sisters pray for the safety of their brothers. Sohrai is a festival of cattle after Diwali, when mud walls are decorated with paintings.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Sarhul</td><td>Spring festival; worship of the sal tree</td></tr><tr><td>Karam</td><td>Worship of the Karam tree in Bhadrapada</td></tr><tr><td>Jawa</td><td>Festival of unmarried girls who grow barley seedlings</td></tr><tr><td>Bhagta Parab</td><td>Festival of Lord Shiva and Dharma in Chaitra</td></tr><tr><td>Rohini</td><td>First sowing festival of the farming year</td></tr><tr><td>Sohrai</td><td>Cattle festival with wall paintings</td></tr><tr><td>Tusu Parab</td><td>Harvest festival of Makar Sankranti sung by young girls</td></tr></tbody></table>
      <div class="cp-note trap">Karam is a festival of the Karam tree and of brothers and sisters, while Sarhul is the festival of the sal tree.</div>
      <div class="cp-note exam">Sohrai wall paintings and the Tusu songs are favourite points for folk culture questions.</div>
    `
  },
  34: {
    questext: "Sarhul, the spring festival of Jharkhand, is linked with the worship of which tree?",
    options: ["Sal", "Banyan", "Mango", "Neem"],
    correct: "1",
    exptext: "✅ Sarhul is the festival of the sal tree and the village spirit. 📌 Sarhul means the sal flower. ❌ Banyan is worshipped in other festivals, not in Sarhul."
  },
  35: {
    questext: "Tusu Parab of Jharkhand is celebrated at the time of which festival?",
    options: ["Diwali", "Holi", "Dussehra", "Makar Sankranti"],
    correct: "4",
    exptext: "✅ Tusu Parab is a harvest festival held at Makar Sankranti in January. 📌 Tusu songs are sung in winter. ❌ Diwali comes in October or November and is not linked with Tusu."
  },
  36: {
    type: "concept", icon: "🎭", accent: "#a855f7", pauseTimer: true,
    title: "Karnataka",
    html: `
      <p class="cp-lead">Karnataka celebrates <b>old empires</b>, <b>Jain pilgrimage</b> and <b>village sports</b> with festivals that every learner should link with a place.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/23.png" alt="Mahamastakabhisheka Shravanabelagola Bahubali statue photo" data-caption="The statue of Bahubali at Shravanabelagola." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/24.png" alt="Kambala buffalo race Karnataka slush paddy field photo" data-caption="A pair of buffaloes racing in a muddy paddy field." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Mahamastakabhisheka is held at Shravanabelagola, where the huge statue of Bahubali (Gommateshwara) is bathed with milk, water and flowers once every 12 years. Kambala is a race of buffaloes run in muddy paddy fields in the coastal districts of Udupi and Dakshina Kannada.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Hampi Utsav</td><td>Festival of the old Vijayanagara capital Hampi, on the Tungabhadra</td></tr><tr><td>Mahamastakabhisheka</td><td>Bathing of the Bahubali statue at Shravanabelagola every 12 years</td></tr><tr><td>Karaga</td><td>Festival of Bengaluru in Chaitra, for the goddess Draupadi</td></tr><tr><td>Kambala</td><td>Buffalo race in muddy fields of the coast</td></tr><tr><td>Gowri Habba</td><td>Worship of the goddess Gowri a day before Ganesh Chaturthi</td></tr><tr><td>Pattadakal Dance Festival</td><td>Dance festival at the temples of Pattadakal in January</td></tr><tr><td>Kailpodh</td><td>Harvest festival of the Kodava people of Kodagu</td></tr><tr><td>Ugadi</td><td>Kannada New Year (Yugadi)</td></tr><tr><td>Mysuru Dasara</td><td>State festival of ten days with the Jamboo Savari procession</td></tr></tbody></table>
      <div class="cp-note trap">Kambala is a race of buffaloes, not of bulls. Jallikattu of Tamil Nadu is the bull-taming sport.</div>
      <div class="cp-note exam">Mysuru Dasara is the Nada Habba, the state festival of Karnataka, with the goddess Chamundeshwari as the main deity.</div>
    `
  },
  37: {
    questext: "The Mahamastakabhisheka of the Bahubali statue at Shravanabelagola is held once in how many years?",
    options: ["6 years", "12 years", "4 years", "10 years"],
    correct: "2",
    exptext: "✅ The statue is bathed once every 12 years in this grand ceremony. 📌 Twelve years, like the Kumbh cycle. ❌ Four years is tempting but belongs to other events like the Olympic Games."
  },
  38: {
    questext: "Kambala, a famous sport of coastal Karnataka, is a race of which animal?",
    options: ["Bulls", "Buffaloes", "Horses", "Camels"],
    correct: "2",
    exptext: "✅ Kambala is a race of buffaloes in muddy paddy fields. 📌 Kambala means buffalo mud race. ❌ Bulls are tempting because of Jallikattu, but that is a sport of Tamil Nadu."
  },
  39: {
    questext: "The Karaga festival, held in the month of Chaitra, is celebrated in which city of Karnataka?",
    options: ["Mysuru", "Mangaluru", "Hubballi", "Bengaluru"],
    correct: "4",
    exptext: "✅ Karaga is the famous festival of Bengaluru in honour of the goddess Draupadi. 📌 Karaga is the Bengaluru festival. ❌ Mysuru is known for Dasara, which makes it the tempting wrong answer."
  },
  40: {
    type: "concept", icon: "🛶", accent: "#e11d48", pauseTimer: true,
    title: "Kerala",
    html: `
      <p class="cp-lead">Kerala is the land of <b>Onam</b>, <b>temple elephants</b> and <b>boat races</b>, and each of them is a favourite exam topic.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/25.png" alt="Thrissur Pooram elephants Vadakkunnathan temple Kudamattam photo" data-caption="Decorated elephants at the Thrissur Pooram." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/26.png" alt="Nehru Trophy Boat Race snake boats Alappuzha photo" data-caption="Snake boats racing during the Nehru Trophy Boat Race." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Onam is the state festival of Kerala. It welcomes the good King Mahabali and lasts ten days, from Atham to Thiruvonam in the month of Chingam. People draw flower carpets called Pookalam and eat a big feast called Sadya. The Vallam Kali is the race of snake boats during Onam.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Onam</td><td>Welcomes King Mahabali; flower carpet and the Sadya feast</td></tr><tr><td>Vishu</td><td>New Year of Kerala in the month of Medam; Vishukkani is the first sight</td></tr><tr><td>Thrissur Pooram</td><td>Temple festival at Vadakkunnathan temple with elephants and Kudamattam</td></tr><tr><td>Theyyam</td><td>Ritual dance of north Kerala, in Kannur and Kasaragod</td></tr><tr><td>Attukal Pongala</td><td>Women cook rice pudding at the Attukal temple of Thiruvananthapuram</td></tr><tr><td>Makaravilakku</td><td>Festival at Sabarimala on Makar Sankranti</td></tr><tr><td>Arattu</td><td>Holy bath procession of the deity, for example from the Padmanabhaswamy temple</td></tr><tr><td>Nishagandhi Festival</td><td>Dance and music festival in Thiruvananthapuram</td></tr><tr><td>Vallam Kali</td><td>Snake boat race, such as the Nehru Trophy Boat Race</td></tr></tbody></table>
      <div class="cp-note trap">Pongal is a festival of Tamil Nadu, but the Pongala of Attukal is a Kerala ritual. The name is similar, so check the state.</div>
      <div class="cp-note exam">The Attukal Pongala is known for the largest gathering of women for a religious ritual in the world.</div>
    `
  },
  41: {
    questext: "Onam, the state festival of Kerala, welcomes which legendary king?",
    options: ["King Mahabali", "King Rama", "King Bharata", "King Harishchandra"],
    correct: "1",
    exptext: "✅ Onam is the festival that welcomes the good king Mahabali. 📌 Mahabali visits his people once a year. ❌ King Rama belongs to Ayodhya and has no link with Onam."
  },
  42: {
    questext: "The Thrissur Pooram is held at which temple?",
    options: ["Guruvayur Temple", "Sabarimala Temple", "Vadakkunnathan Temple", "Padmanabhaswamy Temple"],
    correct: "3",
    exptext: "✅ The Thrissur Pooram is held at the Vadakkunnathan Temple, with elephants and the Kudamattam. 📌 Thrissur has the Vadakkunnathan. ❌ Guruvayur is also in Thrissur, so it is tempting, but the Pooram is not held there."
  },
  43: {
    questext: "Consider the following statements about the festivals of Kerala:\n1. Attukal Pongala is a ritual of women in Thiruvananthapuram.\n2. Vishu is the New Year festival of Kerala.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. The Attukal ritual is held in Thiruvananthapuram, and Vishu is the New Year of Kerala. 📌 Pongala for women, Vishu for New Year. ❌ Neither statement is false, so the single options fail."
  },
  44: {
    type: "concept", icon: "🙏", accent: "#10b981", pauseTimer: true,
    title: "Ladakh",
    html: `
      <p class="cp-lead">The festivals of Ladakh are <b>Buddhist</b>. They feature masked dances, prayers and a New Year in winter.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/27.png" alt="Hemis festival Ladakh cham mask dance monastery photo" data-caption="Monks in colourful masks dance at the Hemis festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/28.png" alt="A simple timeline with three marks: Saka Dawa in the fourth Tibetan month, Hemis in summer" data-caption="Three Buddhist festivals spread across the year in Ladakh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Hemis festival is held at the Hemis Monastery in June or July to mark the birth of Guru Padmasambhava, who spread Buddhism in the Himalayan region. Monks perform the masked cham dance. Saka Dawa remembers the birth, the enlightenment and the death of Gautama Buddha. Losar is the Ladakhi New Year.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Hemis</td><td>Masked dances for Guru Padmasambhava, in June or July</td></tr><tr><td>Saka Dawa</td><td>Month of the birth, enlightenment and death of Buddha</td></tr><tr><td>Losar</td><td>Buddhist New Year, celebrated in winter</td></tr><tr><td>Ladakh Festival</td><td>Cultural festival of September in Leh</td></tr></tbody></table>
      <div class="cp-note trap">Hemis is held at the Hemis Monastery, not at Leh Palace, even though Leh is the capital.</div>
      <div class="cp-note exam">Losar is also celebrated in Sikkim and Arunachal Pradesh, with a different local style.</div>
    `
  },
  45: {
    questext: "The Hemis festival of Ladakh is held to honour which Buddhist teacher?",
    options: ["Guru Padmasambhava", "Gautama Buddha", "Atisha", "Nagarjuna"],
    correct: "1",
    exptext: "✅ Hemis is held to mark the birth of Guru Padmasambhava. 📌 Hemis means masked dance for the Guru. ❌ Gautama Buddha is remembered at Saka Dawa and not at Hemis."
  },
  46: {
    questext: "Which festival of Ladakh marks the Buddhist New Year?",
    options: ["Hemis", "Saka Dawa", "Tulip Festival", "Losar"],
    correct: "4",
    exptext: "✅ Losar is the Buddhist New Year of Ladakh. 📌 Losar means new year in Tibetan. ❌ Saka Dawa remembers the life of Buddha and is not a New Year."
  },
  47: {
    type: "concept", icon: "🎶", accent: "#eab308", pauseTimer: true,
    title: "Madhya Pradesh",
    html: `
      <p class="cp-lead">Madhya Pradesh is the land of <b>music, dance and tribal fairs</b>, from Gwalior to Khajuraho.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/29.png" alt="Tansen Music Festival Gwalior Tansen tomb photo" data-caption="The Tansen Music Festival is held at Gwalior." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/30.png" alt="Khajuraho Dance Festival Chandela temples stage photo" data-caption="Classical dancers perform in front of the Khajuraho temples." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Tansen Music Festival is held every December in Gwalior in memory of the great singer Tansen, one of the nine gems of the court of Emperor Akbar. The Khajuraho Dance Festival is held in February in front of the Chandela temples. Bhagoria Haat is a tribal fair of the Bhil and Bhilala people in the week before Holi, where young people meet and choose partners.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Tansen Music Festival</td><td>December, Gwalior, in memory of Tansen</td></tr><tr><td>Khajuraho Dance Festival</td><td>February, in front of the Chandela temples</td></tr><tr><td>Bhagoria Haat</td><td>Tribal fair of the Bhil people before Holi</td></tr><tr><td>Lokrang</td><td>Folk art and dance festival of Bhopal, in January</td></tr><tr><td>Chethiyagiri Vihara Festival</td><td>November festival at Sanchi, when relics of Buddhist disciples are shown</td></tr><tr><td>Pachmarhi Utsav</td><td>Festival of the hill station of Pachmarhi in the Satpura range</td></tr><tr><td>Gangaur</td><td>Women worship the goddess Gauri, in the Nimar region</td></tr></tbody></table>
      <div class="cp-note trap">The Khajuraho temples were built by the Chandela rulers, not by the Guptas or the Cholas.</div>
      <div class="cp-note exam">Tansen was a singer at the court of Akbar and his tomb is in Gwalior, which is the place of the Tansen Samaroh.</div>
    `
  },
  48: {
    questext: "The Tansen Music Festival is held every year at which city of Madhya Pradesh?",
    options: ["Bhopal", "Gwalior", "Indore", "Ujjain"],
    correct: "2",
    exptext: "✅ It is held at Gwalior, where the tomb of Tansen stands. 📌 Tansen belongs to Gwalior. ❌ Bhopal is tempting because it is the capital, but it hosts Lokrang."
  },
  49: {
    questext: "The Khajuraho Dance Festival takes place near temples built by which dynasty?",
    options: ["Gupta", "Chandela", "Chola", "Pallava"],
    correct: "2",
    exptext: "✅ The Khajuraho temples were built by the Chandela dynasty. 📌 Chandela means Khajuraho. ❌ The Chola and Pallava rulers built temples in the south."
  },
  50: {
    questext: "Bhagoria Haat, a fair before Holi, is a festival of which tribe in Madhya Pradesh?",
    options: ["Santhal", "Toda", "Garo", "Bhil"],
    correct: "4",
    exptext: "✅ Bhagoria Haat is a fair of the Bhil and Bhilala tribes, held before Holi. 📌 Bhagoria belongs to the Bhils. ❌ Santhal, Toda and Garo live in other states."
  },
  51: {
    type: "concept", icon: "🐘", accent: "#0ea5e9", pauseTimer: true,
    title: "Maharashtra",
    html: `
      <p class="cp-lead">Maharashtra celebrates <b>the Marathi New Year</b>, <b>farm animals</b>, <b>the sea</b> and the great festival of <b>Lord Ganesha</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/31.png" alt="Lalbaugcha Raja Ganesh Chaturthi procession Mumbai photo" data-caption="A large Ganesha idol during the Ganesh Chaturthi procession." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/32.png" alt="Narali Purnima coconut offering sea Koli fishermen photo" data-caption="Fishermen offer coconuts to the sea on Narali Purnima." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Gudhi Padwa is the Marathi New Year, when a gudhi, a flag of cloth on a pole, is raised outside the house. Ganesh Chaturthi became a public festival through the efforts of Bal Gangadhar Tilak, who wanted to unite people against British rule. On Narali Purnima, fishermen offer a coconut to the sea god Varuna and start fishing again after the monsoon.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Gudhi Padwa</td><td>Marathi New Year in Chaitra</td></tr><tr><td>Vat Purnima</td><td>Women pray around the banyan tree for their husbands</td></tr><tr><td>Pola</td><td>Festival of bulls, in the month of Shravan</td></tr><tr><td>Narali Purnima</td><td>Coconut is offered to the sea god Varuna</td></tr><tr><td>Ganesh Chaturthi</td><td>Ten-day festival for Lord Ganesha</td></tr><tr><td>Kojagiri</td><td>Full moon night of Ashwin, also called Sharad Purnima</td></tr><tr><td>Vithoba festival</td><td>Wari to Pandharpur for Lord Vithoba</td></tr><tr><td>Elephanta Festival</td><td>Dance and music festival at the Elephanta Caves in Mumbai</td></tr><tr><td>Kala Ghoda Arts Festival</td><td>Art festival of Mumbai in February</td></tr><tr><td>Banganga Festival</td><td>Music festival at the Banganga tank in Mumbai</td></tr></tbody></table>
      <div class="cp-note trap">Pola is the festival of bulls and not of the Sun. Narali Purnima is for the sea and not for the Moon.</div>
      <div class="cp-note exam">Bal Gangadhar Tilak made Ganesh Chaturthi a public festival in 1893.</div>
    `
  },
  52: {
    questext: "On Narali Purnima, fishermen of Maharashtra offer a coconut to which deity?",
    options: ["Varuna", "Indra", "Agni", "Vayu"],
    correct: "1",
    exptext: "✅ Varuna is the god of the sea, and the coconut is offered to him. 📌 Narali means coconut. ❌ Indra is the god of rain and is tempting but wrong."
  },
  53: {
    questext: "Who made Ganesh Chaturthi a public festival in Maharashtra?",
    options: ["Gopal Krishna Gokhale", "Lala Lajpat Rai", "Bal Gangadhar Tilak", "Dadabhai Naoroji"],
    correct: "3",
    exptext: "✅ Bal Gangadhar Tilak began the public celebration in 1893 to unite people. 📌 Tilak made Ganesha public. ❌ Gokhale was a moderate leader and had no role in this festival."
  },
  54: {
    questext: "Consider the following statements about the festivals of Maharashtra:\n1. Gudhi Padwa is the Marathi New Year.\n2. Vat Purnima is a festival in which women worship the banyan tree.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Gudhi Padwa is the Marathi New Year, and on Vat Purnima women pray around the banyan tree. 📌 Padwa for New Year, Vat for banyan. ❌ Neither statement is false."
  },
  55: {
    type: "concept", icon: "🛕", accent: "#d946ef", pauseTimer: true,
    title: "Manipur",
    html: `
      <p class="cp-lead">The festivals of Manipur are linked with the <b>Meitei people</b>, with the <b>Naga tribes</b> and with the <b>seasons</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/33.png" alt="Lai Haraoba festival Manipur Meitei dance photo" data-caption="Meitei dancers at the Lai Haraoba festival of Manipur." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/34.png" alt="Yaosang festival Thabal Chongba Manipur photo" data-caption="Young people dance in a circle during Yaosang in Manipur." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Lai Haraoba means "the merry-making of the gods". It is a festival of the Meitei people to please the old forest gods. Dol Jatra is known in Manipur as Yaosang, a five-day festival that comes with Holi and has the Thabal Chongba folk dance. Lu Ngai Ni is the seed-sowing festival of the Naga tribes of Manipur.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Lai Haraoba</td><td>Merry-making of the gods by the Meitei people</td></tr><tr><td>Dol Jatra (Yaosang)</td><td>Five-day Holi festival with Thabal Chongba dance</td></tr><tr><td>Kang</td><td>Rath Yatra of Manipur, the chariot festival</td></tr><tr><td>Heikru Hidongba</td><td>Festival with a boat race, held in September</td></tr><tr><td>Gang Ngai</td><td>Festival of the Zeliangrong Nagas after the harvest</td></tr><tr><td>Lu Ngai Ni</td><td>Seed-sowing festival of the Naga tribes</td></tr><tr><td>Ningol Chakouba</td><td>Day when married daughters are invited home by their family</td></tr></tbody></table>
      <div class="cp-note trap">Yaosang is not a separate festival from Holi. It is the Manipuri form, and it runs for five days.</div>
      <div class="cp-note exam">Kang is the Manipuri name of Rath Yatra, held in Ashadha for Lord Jagannath.</div>
    `
  },
  56: {
    questext: "Lai Haraoba, the merry-making of the gods, is a festival of which people of Manipur?",
    options: ["Meitei", "Angami", "Garo", "Bodo"],
    correct: "1",
    exptext: "✅ Lai Haraoba is the festival of the Meitei people of Manipur. 📌 Lai means god. ❌ The Angami live in Nagaland, and the Garo in Meghalaya."
  },
  57: {
    questext: "In Manipur, the Dol Jatra festival is known by which name?",
    options: ["Cheiraoba", "Kang", "Ningol Chakouba", "Yaosang"],
    correct: "4",
    exptext: "✅ Yaosang is the Manipuri five-day festival that comes with Holi. 📌 Yaosang is the Holi of Manipur. ❌ Cheiraoba is the New Year of the Meitei people, which is why it is tempting."
  },
  58: {
    type: "concept", icon: "🥁", accent: "#64748b", pauseTimer: true,
    title: "Meghalaya",
    html: `
      <p class="cp-lead">Meghalaya has three main tribes, the <b>Garo</b>, the <b>Khasi</b> and the <b>Jaintia</b>, and each one has its own festivals.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/35.png" alt="Wangala hundred drums festival Garo dancers Tura photo" data-caption="Garo dancers play long drums at the Wangala festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/36.png" alt="Shad Suk Mynsiem Khasi dance Shillong women photo" data-caption="Khasi women dance in silver crowns at Shad Suk Mynsiem." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Wangala is the post-harvest festival of the Garo tribe, held in November, and it is also called the Hundred Drums Festival because so many drums are played. Shad Suk Mynsiem, the Dance of the Joyful Heart, is a spring festival of the Khasi people. Behdienkhlam is held at Jowai by the Jaintia people to drive away evil spirits and disease.</p>
      <table><thead><tr><th>Festival</th><th>Tribe</th><th>What to remember</th></tr></thead><tbody><tr><td>Wangala</td><td>Garo</td><td>Hundred Drums Festival, held in November after harvest</td></tr><tr><td>Shad Suk Mynsiem</td><td>Khasi</td><td>Dance of the Joyful Heart, held in April in Shillong</td></tr><tr><td>Nongkrem</td><td>Khasi</td><td>Thanksgiving dance held at Smit, near Shillong, in November</td></tr><tr><td>Behdienkhlam</td><td>Jaintia</td><td>July festival at Jowai that drives away disease</td></tr><tr><td>Strawberry Festival</td><td>State</td><td>Festival of the strawberry crop and local food</td></tr></tbody></table>
      <div class="cp-note trap">Wangala is a Garo festival, but Nongkrem and Shad Suk Mynsiem are Khasi festivals. Do not mix the three tribes.</div>
      <div class="cp-note exam">Smit is the place of the Nongkrem dance and is near Shillong.</div>
    `
  },
  59: {
    questext: "Wangala, also called the Hundred Drums Festival, is celebrated by which tribe of Meghalaya?",
    options: ["Khasi", "Garo", "Jaintia", "Mizo"],
    correct: "2",
    exptext: "✅ Wangala is the post-harvest festival of the Garo tribe. 📌 Wangala means a hundred drums for the Garo. ❌ Khasi festivals include Nongkrem and Shad Suk Mynsiem."
  },
  60: {
    questext: "Consider the following statements about the festivals of Meghalaya:\n1. Nongkrem is a festival of the Garo tribe.\n2. Shad Suk Mynsiem is called the Dance of the Joyful Heart.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. Shad Suk Mynsiem means Dance of the Joyful Heart. 📌 Nongkrem belongs to the Khasi. ❌ Statement 1 is wrong because Nongkrem is a Khasi festival."
  },
  61: {
    questext: "The Nongkrem dance festival is held at which place near Shillong?",
    options: ["Jowai", "Tura", "Cherrapunji", "Smit"],
    correct: "4",
    exptext: "✅ The Nongkrem dance festival is held at Smit near Shillong. 📌 Nongkrem for Smit. ❌ Jowai is the place of Behdienkhlam, which makes it tempting."
  },
  62: {
    type: "concept", icon: "🌿", accent: "#fb7185", pauseTimer: true,
    title: "Mizoram",
    html: `
      <p class="cp-lead">The festivals of Mizoram are called <b>Kut</b>, and each Kut is linked with a stage of the farming year.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/37.png" alt="Chapchar Kut festival Mizoram Cheraw bamboo dance photo" data-caption="Young Mizo dancers perform the bamboo Cheraw dance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/38.png" alt="A year circle with three marks: March Chapchar Kut, August or September Mim Kut, and Phawa" data-caption="The three Kut festivals mark three stages of the Mizo farming year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Kut means festival in the Mizo language. Chapchar Kut is the spring festival of March, held after the farmers have cleared the jungle for jhum (shifting) cultivation and before they sow the seeds. Mim Kut is celebrated after the harvest of maize, and people remember their dead relatives. Phawang Kut is a thanksgiving festival after the harvest.</p>
      <table><thead><tr><th>Festival</th><th>When</th><th>What to remember</th></tr></thead><tbody><tr><td>Chapchar Kut</td><td>March</td><td>Spring festival after the jungle is cleared; Cheraw dance</td></tr><tr><td>Mim Kut</td><td>August or September</td><td>Maize harvest and remembrance of the dead</td></tr><tr><td>Phawang Kut</td><td>After the harvest</td><td>Thanksgiving festival</td></tr></tbody></table>
      <div class="cp-note trap">Kut means festival, not harvest. All three of these festivals are called Kut.</div>
      <div class="cp-note exam">Chapchar Kut is the most famous Mizo festival, and the Cheraw (bamboo) dance is performed in it.</div>
    `
  },
  63: {
    questext: "Chapchar Kut, the spring festival of Mizoram, is celebrated after which activity?",
    options: ["Clearing the jungle for jhum cultivation", "Harvest of rice", "Sowing of maize", "End of the monsoon"],
    correct: "1",
    exptext: "✅ Chapchar Kut comes after the jungle is cleared for jhum cultivation. 📌 Chapchar means clearing time. ❌ Harvest festivals of Mizoram are Mim Kut and Phawang Kut."
  },
  64: {
    questext: "Mim Kut of Mizoram is connected with the harvest of which crop?",
    options: ["Rice", "Cotton", "Maize", "Tea"],
    correct: "3",
    exptext: "✅ Mim Kut is celebrated after the harvest of maize. 📌 Mim means maize. ❌ Rice is tempting, but its thanksgiving is Phawang Kut."
  },
  65: {
    type: "concept", icon: "🦅", accent: "#2dd4bf", pauseTimer: true,
    title: "Nagaland",
    html: `
      <p class="cp-lead">Nagaland is the <b>land of festivals</b>, because every Naga tribe has its own festival, and the biggest is the <b>Hornbill Festival</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/39.png" alt="Hornbill Festival Kisama Heritage Village Naga warriors photo" data-caption="Naga dancers in tribal dress at the Hornbill Festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/40.png" alt="Four tribe names joined to four festivals: Ao to Moatsu, Konyak to Aoleang, Angami to Sekr" data-caption="Naga tribes and the festivals each one celebrates." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Hornbill Festival is held every year from 1 to 10 December at the Kisama Heritage Village, near Kohima. It is called the Festival of Festivals because all Naga tribes take part. It was started in the year 2000 and is named after the hornbill, a bird that is very important in Naga folk tales.</p>
      <table><thead><tr><th>Festival</th><th>Tribe</th><th>What to remember</th></tr></thead><tbody><tr><td>Hornbill Festival</td><td>All Naga tribes</td><td>Festival of Festivals, held in December at Kisama</td></tr><tr><td>Moatsu Mong</td><td>Ao</td><td>Festival after sowing, held in May</td></tr><tr><td>Aoleang Monyu</td><td>Konyak</td><td>Spring festival of April, also the New Year of the tribe</td></tr><tr><td>Sekrenyi</td><td>Angami</td><td>Festival of purification held in February</td></tr><tr><td>Tsukhenyie</td><td>Chakhesang</td><td>Festival of the Chakhesang people (extra point)</td></tr></tbody></table>
      <div class="cp-note trap">Moatsu is an Ao festival of May, and Sekrenyi is an Angami festival of February. Do not swap the tribes.</div>
      <div class="cp-note exam">Nagaland is the land of festivals, and the Hornbill Festival is held at the Kisama Heritage Village, 12 kilometres from Kohima.</div>
    `
  },
  66: {
    questext: "The Hornbill Festival of Nagaland is held at which place?",
    options: ["Dimapur", "Mokokchung", "Kisama", "Wokha"],
    correct: "3",
    exptext: "✅ The Hornbill Festival is held at the Kisama Heritage Village near Kohima. 📌 Hornbill means Kisama. ❌ Dimapur is the biggest city, which is why it is tempting."
  },
  67: {
    questext: "Sekrenyi, the festival of purification held in February, belongs to which Naga tribe?",
    options: ["Angami", "Ao", "Konyak", "Sumi"],
    correct: "1",
    exptext: "✅ Sekrenyi is the festival of the Angami tribe. 📌 Sekrenyi means purification. ❌ Ao celebrate Moatsu and Konyak celebrate Aoleang."
  },
  68: {
    questext: "Consider the following statements about the festivals of Nagaland:\n1. Moatsu Mong is celebrated by the Angami tribe in December.\n2. The Hornbill Festival is held in the month of March.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "4",
    exptext: "✅ Neither statement is correct. Moatsu Mong is an Ao festival of May, and the Hornbill Festival is held in December. 📌 Moatsu is Ao, Hornbill is December. ❌ Both statements swap a tribe or a month."
  },
  69: {
    type: "concept", icon: "🛕", accent: "#c026d3", pauseTimer: true,
    title: "Odisha",
    html: `
      <p class="cp-lead">Odisha is known for the <b>Rath Yatra of Puri</b>, for its <b>sea trade past</b> and for the great <b>Sun Temple of Konark</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/41.png" alt="Puri Rath Yatra chariots Jagannath Balabhadra Subhadra photo" data-caption="The three huge chariots of the Puri Rath Yatra." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/42.png" alt="Konark Sun Temple chariot wheel photo" data-caption="A stone chariot wheel of the Konark Sun Temple." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Rath Yatra of Puri is held on the second day of the bright half of Ashadha. Lord Jagannath, his brother Balabhadra and his sister Subhadra ride in three huge chariots to the Gundicha temple. Bali Jatra of Cuttack remembers the old sea trade of Odisha with Bali and other islands, when merchants sailed in boats called boitas.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Rath Yatra</td><td>Puri, Ashadha. Chariots: Nandighosa (Jagannath), Taladhwaja (Balabhadra), Darpadalana (Subhadra)</td></tr><tr><td>Bali Jatra</td><td>Cuttack, Kartik Purnima, remembers the sea trade with Bali</td></tr><tr><td>Raja Parba</td><td>Three-day festival of June that honours Mother Earth</td></tr><tr><td>Nuakhai</td><td>Festival of eating new rice in western Odisha</td></tr><tr><td>Chhau Festival</td><td>Mask dance festival in Chaitra at Baripada</td></tr><tr><td>Kalinga Mahotsav</td><td>Cultural festival at Bhubaneswar</td></tr><tr><td>Konark Dance Festival</td><td>December festival at the Sun Temple, Konark</td></tr></tbody></table>
      <div class="cp-note trap">Odisha was earlier written as Orissa. The state is now called Odisha, so use the new name in answers.</div>
      <div class="cp-note exam">The chariot of Lord Jagannath is Nandighosa. The chariot of Balabhadra is Taladhwaja and that of Subhadra is Darpadalana.</div>
    `
  },
  70: {
    questext: "Bali Jatra, which remembers the old sea trade with Bali, is held at which place in Odisha?",
    options: ["Puri", "Cuttack", "Bhubaneswar", "Sambalpur"],
    correct: "2",
    exptext: "✅ Bali Jatra is held at Cuttack on the banks of the Mahanadi on Kartik Purnima. 📌 Bali Jatra is the Cuttack festival. ❌ Puri is famous for Rath Yatra, which makes it tempting."
  },
  71: {
    questext: "Nuakhai, the festival of western Odisha, is connected with eating which new grain?",
    options: ["Wheat", "Rice", "Maize", "Millet"],
    correct: "2",
    exptext: "✅ Nuakhai means eating new rice. 📌 Nua is new and khai is eat. ❌ Wheat is not the main crop of Odisha."
  },
  72: {
    questext: "What is the name of the chariot of Lord Jagannath in the Rath Yatra of Puri?",
    options: ["Taladhwaja", "Darpadalana", "Pushpaka", "Nandighosa"],
    correct: "4",
    exptext: "✅ The chariot of Lord Jagannath is Nandighosa. 📌 Nandighosa is the name for the Lord. ❌ Taladhwaja is the chariot of Balabhadra, and Darpadalana belongs to Subhadra."
  },
  73: {
    type: "concept", icon: "🌾", accent: "#ea580c", pauseTimer: true,
    title: "Punjab",
    html: `
      <p class="cp-lead">Punjab celebrates <b>harvest</b> and <b>Sikh history</b>, with festivals full of music, bonfires and bold courage.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/43.png" alt="Hola Mohalla Anandpur Sahib Nihang Sikh martial arts photo" data-caption="Nihang Sikhs show martial skills at Hola Mohalla." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/44.png" alt="Lohri bonfire Punjab celebration photo" data-caption="People dance around a bonfire on the night of Lohri." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Baisakhi falls on 13 April and is a harvest festival. It is also the day when Guru Gobind Singh founded the Khalsa Panth at Anandpur Sahib in 1699. Hola Mohalla is held at Anandpur Sahib a day after Holi, with displays of martial arts. Lohri is celebrated on the eve of Makar Sankranti with a bonfire, to mark the end of the winter.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Baisakhi</td><td>13 April, wheat harvest and the founding of the Khalsa Panth in 1699</td></tr><tr><td>Hola Mohalla</td><td>Day after Holi at Anandpur Sahib, with martial arts</td></tr><tr><td>Lohri</td><td>Bonfire night of January, on the eve of Makar Sankranti</td></tr><tr><td>Guru Parba</td><td>Birth day of Guru Nanak Dev on Kartik Purnima (Gurpurab)</td></tr></tbody></table>
      <div class="cp-note trap">Hola Mohalla is held a day after Holi and it has warrior displays. It is not a colour festival like Holi.</div>
      <div class="cp-note exam">Anandpur Sahib is the place of both the Khalsa Panth (Baisakhi 1699) and Hola Mohalla.</div>
    `
  },
  74: {
    questext: "Hola Mohalla is held every year at which place of Punjab?",
    options: ["Anandpur Sahib", "Amritsar", "Patiala", "Ludhiana"],
    correct: "1",
    exptext: "✅ Hola Mohalla is held at Anandpur Sahib, a day after Holi. 📌 Hola means attack and Mohalla means place for it. ❌ Amritsar is the holy city of the Golden Temple, but Hola Mohalla is not held there."
  },
  75: {
    questext: "On Baisakhi in 1699, Guru Gobind Singh founded which body?",
    options: ["Sikh Empire", "Akal Takht", "Khalsa Panth", "Golden Temple"],
    correct: "3",
    exptext: "✅ Guru Gobind Singh founded the Khalsa Panth at Anandpur Sahib on Baisakhi in 1699. 📌 Baisakhi equals Khalsa. ❌ The Akal Takht was founded earlier by Guru Hargobind."
  },
  76: {
    questext: "Consider the following statements about the festivals of Punjab:\n1. Lohri is celebrated with a bonfire on the eve of Makar Sankranti.\n2. Hola Mohalla includes displays of martial arts.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Lohri is a bonfire festival, and Hola Mohalla shows martial skills. 📌 Lohri for fire, Hola for warriors. ❌ Neither statement is false."
  },
  77: {
    type: "concept", icon: "🐪", accent: "#65a30d", pauseTimer: true,
    title: "Rajasthan",
    html: `
      <p class="cp-lead">Rajasthan is the land of <b>colourful fairs</b>. Most of its fairs fall on <u>Kartik Purnima</u> or in the cold winter months.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/45.png" alt="Pushkar Camel Fair Rajasthan camels and traders photo" data-caption="Camels and traders at the Pushkar Fair." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/46.png" alt="Jaisalmer Desert Festival Sam sand dunes turban tying photo" data-caption="Folk artists at the Desert Festival of Jaisalmer." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Pushkar Fair is held at Pushkar near Ajmer on Kartik Purnima, close to the only major temple of Lord Brahma. It is famous for the trade of camels. The Desert Festival is held in February in Jaisalmer on the full moon day. The Baneshwar Fair is held in Dungarpur in Magh, at the meeting place of the rivers Mahi and Som, and is called the Kumbh of the tribals.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Pushkar Fair</td><td>Kartik Purnima, Ajmer district, camels, temple of Lord Brahma</td></tr><tr><td>Desert Festival</td><td>February, Jaisalmer, sand dunes and folk music</td></tr><tr><td>Baneshwar Fair</td><td>Dungarpur, Magh Purnima, Kumbh of the tribals (Bhils)</td></tr><tr><td>Gangaur</td><td>Chaitra, women pray to the goddess Gauri</td></tr><tr><td>Nagaur Fair</td><td>Cattle fair at Nagaur in January or February, known for the Nagauri bulls</td></tr><tr><td>Kolayat Fair</td><td>Kartik Purnima, Bikaner, a holy bath in the lake of Kapil Muni</td></tr><tr><td>Chandrabhaga Fair</td><td>Kartik Purnima, Jhalawar, a holy bath in the river Chandrabhaga</td></tr><tr><td>Bundi Utsav</td><td>Cultural festival of Bundi</td></tr></tbody></table>
      <div class="cp-note trap">The Camel Festival belongs to Bikaner, and the Desert Festival belongs to Jaisalmer. Both are held in winter.</div>
      <div class="cp-note exam">The Pushkar Fair and the Sonepur Fair of Bihar are both held after Kartik Purnima, a very common pair in exams.</div>
    `
  },
  78: {
    questext: "The Pushkar Fair is held near the only major temple of which god?",
    options: ["Brahma", "Vishnu", "Shiva", "Indra"],
    correct: "1",
    exptext: "✅ Pushkar has the only major temple of Lord Brahma. 📌 Pushkar is Brahma's place. ❌ Vishnu and Shiva have many temples across India, so they are not unique."
  },
  79: {
    questext: "Which fair of Rajasthan is called the Kumbh of the tribals?",
    options: ["Nagaur Fair", "Pushkar Fair", "Kolayat Fair", "Baneshwar Fair"],
    correct: "4",
    exptext: "✅ The Baneshwar Fair of Dungarpur is called the Kumbh of the tribals, as many Bhil people gather there. 📌 Baneshwar is a fair of Bhil tribes. ❌ Pushkar is a camel fair, which is the tempting answer."
  },
  80: {
    questext: "The Desert Festival of Rajasthan is held in which city?",
    options: ["Bikaner", "Jaisalmer", "Jodhpur", "Barmer"],
    correct: "2",
    exptext: "✅ The Desert Festival is held at Jaisalmer in February. 📌 Desert goes with Jaisalmer. ❌ Bikaner holds the Camel Festival, which is tempting."
  },
  81: {
    type: "concept", icon: "🏔️", accent: "#0891b2", pauseTimer: true,
    title: "Sikkim",
    html: `
      <p class="cp-lead">Sikkim blends <b>Buddhist</b> and <b>Kirat (Rai)</b> traditions, so its festivals include both prayer and Earth worship.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/47.png" alt="Saga Dawa festival Gangtok Buddhist procession photo" data-caption="Monks carry sacred books in a Saga Dawa procession." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/48.png" alt="Sakewa Sakela Ubhauli dance Rai community photo" data-caption="Rai people perform a circle dance during Sakewa." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Sakewa (also called Sakela) is the festival of the Kirat Rai community, who worship the Earth and pray for a good crop. Saga Dawa is the holiest month of Buddhists in Sikkim, as it remembers the birth, the enlightenment and the death of Gautama Buddha. Losar is the Tibetan New Year.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Sakewa</td><td>Earth worship of the Kirat Rai community</td></tr><tr><td>Sonam Lochar</td><td>Farmers' New Year of the Tamang people, in January or February</td></tr><tr><td>Losung</td><td>Harvest festival and New Year of the Bhutia and Lepcha people, in December</td></tr><tr><td>Saga Dawa</td><td>Month of Buddha's birth, enlightenment and death</td></tr><tr><td>Losar</td><td>Tibetan New Year in February</td></tr><tr><td>Pang Lhabsol</td><td>Worship of Mount Kanchenjunga as the guardian deity</td></tr></tbody></table>
      <div class="cp-note trap">Saga Dawa is not a New Year. It is a religious month. Losar and Losung are the New Year festivals.</div>
      <div class="cp-note exam">Pang Lhabsol honours Mount Kanchenjunga, the third highest mountain in the world and the guardian deity of Sikkim.</div>
    `
  },
  82: {
    questext: "Sakewa, the festival of Earth worship, is celebrated mainly by which community of Sikkim?",
    options: ["Bhutia", "Rai", "Tibetan", "Lepcha"],
    correct: "2",
    exptext: "✅ Sakewa is the festival of the Kirat Rai community. 📌 Sakewa goes with Rai. ❌ Bhutia and Tibetan people celebrate Losar and Losung."
  },
  83: {
    questext: "Saga Dawa, a festival of Sikkim, remembers the birth, enlightenment and death of whom?",
    options: ["Guru Nanak", "Mahavira", "Shankaracharya", "Gautama Buddha"],
    correct: "4",
    exptext: "✅ Saga Dawa remembers the three great events of Gautama Buddha's life. 📌 Saga Dawa means the Buddha month. ❌ Mahavira belongs to Jainism, so he is tempting but wrong."
  },
  84: {
    type: "concept", icon: "🐂", accent: "#7c3aed", pauseTimer: true,
    title: "Tamil Nadu",
    html: `
      <p class="cp-lead">Tamil Nadu is the land of <b>Pongal</b>, <b>temple festivals</b> and <b>classical music and dance</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/49.png" alt="Pongal festival Tamil Nadu sweet pongal pot kolam photo" data-caption="A pot of Pongal boils over, a sign of good fortune." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/50.png" alt="Jallikattu bull taming Alanganallur Madurai photo" data-caption="A bull is held by young men during Jallikattu." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Pongal is the harvest festival of Tamil Nadu, held for four days in the month of Thai (January). Farmers thank the Sun, the rain and their cattle. The Tamil New Year, Puthandu, falls in April and is a separate festival. The Mahamaham is held once in 12 years at the Mahamaham tank in Kumbakonam, and it is called the Kumbh of the South.</p>
      <table><thead><tr><th>Day or festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Bhogi Pongal</td><td>Day 1: old things are thrown away and a bonfire is lit</td></tr><tr><td>Surya (Thai) Pongal</td><td>Day 2: the Sun is thanked, and rice is boiled until it overflows</td></tr><tr><td>Mattu Pongal</td><td>Day 3: cattle are worshipped; Jallikattu is held on this day</td></tr><tr><td>Kaanum Pongal</td><td>Day 4: family meetings and outings</td></tr><tr><td>Puthandu</td><td>Tamil New Year in April</td></tr><tr><td>Karthigai Deepam</td><td>Festival of lamps at Thiruvannamalai</td></tr><tr><td>Thaipusam</td><td>Festival of Lord Murugan, held at Palani and other temples</td></tr><tr><td>Mahamaham</td><td>Once in 12 years, Kumbakonam</td></tr><tr><td>Natyanjali</td><td>Dance festival at the Chidambaram temple of Lord Nataraja</td></tr><tr><td>Thiruvaiyaru Festival</td><td>Music festival for the saint Thyagaraja</td></tr><tr><td>Float Festival</td><td>Teppam festival of the Meenakshi temple, Madurai</td></tr></tbody></table>
      <div class="cp-note trap">Puthandu (New Year in April) is not Pongal (harvest in January). Jallikattu is held on Mattu Pongal, the third day.</div>
      <div class="cp-note exam">The Thyagaraja Aradhana is held every January at Thiruvaiyaru and is the most famous Carnatic music festival.</div>
    `
  },
  85: {
    questext: "Jallikattu, the bull-taming sport of Tamil Nadu, is held on which day of Pongal?",
    options: ["Mattu Pongal", "Bhogi Pongal", "Surya Pongal", "Kaanum Pongal"],
    correct: "1",
    exptext: "✅ Jallikattu is held on Mattu Pongal, the day of cattle. 📌 Mattu means cattle. ❌ Bhogi Pongal is the first day, when old things are burnt."
  },
  86: {
    questext: "The Mahamaham festival, held once in 12 years, takes place at which town?",
    options: ["Madurai", "Chidambaram", "Kumbakonam", "Thanjavur"],
    correct: "3",
    exptext: "✅ The Mahamaham is held at the Mahamaham tank in Kumbakonam. 📌 Mahamaham is the Kumbh of the South. ❌ Madurai is known for its Meenakshi temple and Float Festival."
  },
  87: {
    questext: "Consider the following statements about the festivals of Tamil Nadu:\n1. Thaipusam is a festival of Lord Murugan.\n2. Natyanjali is a dance festival held at the Chidambaram temple.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Thaipusam honours Lord Murugan, and Natyanjali is held at the Nataraja temple of Chidambaram. 📌 Murugan for Thai, Nataraja for dance. ❌ Neither is false."
  },
  88: {
    questext: "The Tamil New Year, Puthandu, falls in which month?",
    options: ["April", "January", "October", "August"],
    correct: "1",
    exptext: "✅ Puthandu falls around 14 April. 📌 Puthandu is mid-April. ❌ January is Pongal, which is the harvest festival and not the New Year."
  },
  89: {
    type: "concept", icon: "🌼", accent: "#db2777", pauseTimer: true,
    title: "Telangana",
    html: `
      <p class="cp-lead">Telangana celebrates <b>flowers</b>, <b>goddesses</b> and <b>the biggest tribal fair</b> in India.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/51.png" alt="Bathukamma festival Hyderabad flower stack women photo" data-caption="Women dance around a Bathukamma stack made of flowers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/52.png" alt="Medaram Sammakka Saralamma Jatara jaggery offering photo" data-caption="Crowds offer jaggery at the Medaram Jatara." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Bathukamma is the state festival of Telangana. Women stack local flowers in a cone shape, sing and dance around it for nine days, and then float it in a pond. The Medaram Jatara, also called the Sammakka Saralamma Jatara, is held once in two years in the Mulugu district. It is the biggest tribal festival of India and honours two tribal goddesses. Bonalu is a festival of the goddess Mahakali, where women offer food in pots called bonam.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Bathukamma</td><td>State festival; floral stack of nine days</td></tr><tr><td>Medaram Jatara</td><td>Held once in two years; tribal goddesses Sammakka and Saralamma</td></tr><tr><td>Bonalu</td><td>Month of Ashadha; offering of food to the goddess Mahakali</td></tr><tr><td>Sammaka Jatara</td><td>Another name for the Medaram fair</td></tr></tbody></table>
      <div class="cp-note trap">The Medaram Jatara is held every two years and not every year. The Kumbh Mela is held every twelve years.</div>
      <div class="cp-note exam">Bathukamma is a floral festival, and Bonalu is a goddess festival of Hyderabad and Secunderabad.</div>
    `
  },
  90: {
    questext: "Bathukamma, the state festival of Telangana, is a festival of which items?",
    options: ["Lamps", "Boats", "Kites", "Flowers"],
    correct: "4",
    exptext: "✅ Bathukamma is a festival of flowers stacked in a cone. 📌 Bathukamma is a flower goddess. ❌ Lamps belong to Karthigai Deepam and Diwali."
  },
  91: {
    questext: "How often is the Medaram (Sammakka Saralamma) Jatara held?",
    options: ["Every year", "Once in two years", "Once in six years", "Once in twelve years"],
    correct: "2",
    exptext: "✅ The Medaram Jatara is held once in two years and honours two tribal goddesses. 📌 Two goddesses, two years. ❌ Twelve years is the cycle of the Kumbh and the Mahamaham."
  },
  92: {
    questext: "Bonalu of Telangana is a festival in honour of which goddess?",
    options: ["Saraswati", "Mahakali", "Lakshmi", "Annapurna"],
    correct: "2",
    exptext: "✅ Bonalu is held for the goddess Mahakali, with offerings of food in pots. 📌 Bonam means food offering. ❌ Lakshmi is tempting but is worshipped on Diwali."
  },
  93: {
    type: "concept", icon: "🌺", accent: "#059669", pauseTimer: true,
    title: "Tripura",
    html: `
      <p class="cp-lead">Tripura celebrates <b>tribal gods</b> and <b>spring new years</b>, and its festivals are linked with the Tripuri, Reang and Chakma people.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/53.png" alt="Kharchi Puja Agartala Chaturdasha Devata temple photo" data-caption="Devotees gather at the Chaturdasha Devata temple during Kharchi Puja." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/54.png" alt="Hojagiri dance Reang women balancing pot bottle photo" data-caption="A Reang woman dances while balancing a pot on her head." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Kharchi Puja is held in July at the old Agartala temple of Chaturdasha Devata, the fourteen gods of the royal family of Tripura. Hojagiri is the dance of the Reang tribe, performed after the worship of the goddess Lakshmi, in which dancers balance pots and bottles on their heads. Bijhu is the New Year of the Chakma people at the end of Chaitra.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Kharchi Puja</td><td>July, fourteen gods, old Agartala</td></tr><tr><td>Garia Puja</td><td>April, worship of the god Garia for a good crop, by the Tripuri people</td></tr><tr><td>Bijhu</td><td>Chakma New Year at the end of Chaitra</td></tr><tr><td>Hojagiri</td><td>Dance of the Reang tribe after Lakshmi worship</td></tr></tbody></table>
      <div class="cp-note trap">Hojagiri belongs to the Reang tribe, while Bijhu belongs to the Chakma people. Do not swap them.</div>
      <div class="cp-note exam">Kharchi Puja honours the fourteen gods, which is why the temple is called Chaturdasha Devata.</div>
    `
  },
  94: {
    questext: "Kharchi Puja of Tripura is held in honour of how many deities?",
    options: ["14", "12", "9", "10"],
    correct: "1",
    exptext: "✅ Kharchi Puja honours the fourteen gods of the Chaturdasha Devata temple. 📌 Chaturdasha means fourteen. ❌ Twelve and nine are tempting numbers from other festivals."
  },
  95: {
    questext: "The Hojagiri dance, performed by balancing pots on the head, belongs to which tribe of Tripura?",
    options: ["Jamatia", "Chakma", "Halam", "Reang"],
    correct: "4",
    exptext: "✅ Hojagiri is the dance of the Reang tribe. 📌 Hojagiri is for Reang, and Bijhu is for Chakma. ❌ The Chakma celebrate Bijhu and not Hojagiri."
  },
  96: {
    type: "concept", icon: "🌼", accent: "#ca8a04", pauseTimer: true,
    title: "Uttarakhand",
    html: `
      <p class="cp-lead">The festivals of Uttarakhand are linked with <b>spring flowers</b>, <b>the monsoon</b> and the <b>sacred plants</b> of the hills.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/55.png" alt="Phool Dei festival Uttarakhand children flowers doorstep photo" data-caption="Children place spring flowers on a doorstep during Phool Dei." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/56.png" alt="Harela festival Kumaon green shoots planting photo" data-caption="Green shoots offered on Harela in the Kumaon hills." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Phool Dei is a spring festival on the first day of Chaitra. Children go from door to door and place flowers on the doorsteps, to wish every home good luck. Harela is a festival of Kumaon held in Shravan, when people plant seeds and wish for a green and good crop. Bhitauli is a Chaitra tradition in which brothers give gifts to their sisters.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Phool Dei</td><td>Chaitra Sankranti; flowers on doorsteps welcome spring</td></tr><tr><td>Harela</td><td>Shravan, Kumaon, symbol of greenery and a good crop</td></tr><tr><td>Bhitauli</td><td>Chaitra, brothers give gifts to sisters</td></tr><tr><td>Kandali</td><td>Festival of the Rung people of Pithoragarh, once in 12 years</td></tr><tr><td>Nanda Devi Raj Jat</td><td>Pilgrimage held once in 12 years for the goddess Nanda Devi</td></tr></tbody></table>
      <div class="cp-note trap">Kandali, Nanda Devi Raj Jat and the Kumbh Mela all follow a 12-year cycle, so be careful with the numbers.</div>
      <div class="cp-note exam">The Kandali plant blooms once in 12 years, and the festival of the Rung people of the Chaudas valley is based on it.</div>
    `
  },
  97: {
    questext: "Phool Dei in Uttarakhand is celebrated to welcome which season?",
    options: ["Winter", "The monsoon", "Spring", "Autumn"],
    correct: "3",
    exptext: "✅ Phool Dei is celebrated on the first day of Chaitra to welcome spring. 📌 Phool means flower. ❌ Harela is the monsoon festival, which is why the monsoon is tempting."
  },
  98: {
    questext: "The Kandali festival, held once in 12 years in the Pithoragarh district, belongs to which community?",
    options: ["Tharu", "Jaunsari", "Rung", "Raji"],
    correct: "3",
    exptext: "✅ The Kandali festival is celebrated by the Rung people of the Chaudas valley. 📌 Kandali plants bloom once in 12 years. ❌ The Tharu and the Jaunsari live in other parts of the region."
  },
  99: {
    type: "concept", icon: "🪔", accent: "#2563eb", pauseTimer: true,
    title: "West Bengal",
    html: `
      <p class="cp-lead">West Bengal celebrates the <b>Bengali New Year</b>, the <b>sacred Ganga</b>, <b>folk songs</b> and, above all, <b>Durga Puja</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/57.png" alt="Durga Puja Kolkata pandal idol dhunuchi photo" data-caption="A grand Durga idol inside a decorated pandal in Kolkata." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/58.png" alt="Poush Mela Santiniketan Baul singers photo" data-caption="Baul singers at the Poush Mela of Santiniketan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Poila Baisakh is the Bengali New Year, falling on 14 or 15 April, when traders open new account books in a ritual called Haal Khata. Durga Puja is held in the month of Ashwin and starts after Mahalaya. The Gangasagar Mela is held every year at Sagar Island, where the Ganga meets the Bay of Bengal, on Makar Sankranti. The Poush Mela is held at Santiniketan in the month of Poush.</p>
      <table><thead><tr><th>Festival</th><th>What to remember</th></tr></thead><tbody><tr><td>Poila Baisakh</td><td>Bengali New Year, 14 or 15 April, Haal Khata</td></tr><tr><td>Durga Puja</td><td>Ashwin month, after Mahalaya, ten days of worship</td></tr><tr><td>Gangasagar Mela</td><td>Makar Sankranti, Sagar Island, holy dip in the Ganga</td></tr><tr><td>Poush Mela</td><td>Santiniketan, December, started by Debendranath Tagore in 1894</td></tr><tr><td>Jamai Sashti</td><td>Day to honour the son-in-law, with a feast in Jyeshtha</td></tr><tr><td>Baul</td><td>Folk singers of Bengal; the Joydev Kenduli fair is famous for Baul songs</td></tr></tbody></table>
      <div class="cp-note trap">Poush Mela is held at Santiniketan near Bolpur, and not at Kolkata. It is linked with the Tagore family.</div>
      <div class="cp-note exam">Durga Puja in Kolkata was added to the Representative List of the Intangible Cultural Heritage of Humanity of the United Nations Educational, Scientific and Cultural Organization in 2021.</div>
    `
  },
  100: {
    questext: "The Gangasagar Mela of West Bengal is held on Makar Sankranti at which place?",
    options: ["Sagar Island", "Bishnupur", "Santiniketan", "Darjeeling"],
    correct: "1",
    exptext: "✅ The Gangasagar Mela is held at Sagar Island, where the Ganga joins the sea. 📌 Gangasagar means the Ganga meeting the sea. ❌ Santiniketan is the place of the Poush Mela."
  },
  101: {
    questext: "The Poush Mela is held every year at which place in West Bengal?",
    options: ["Kalyani", "Bishnupur", "Murshidabad", "Santiniketan"],
    correct: "4",
    exptext: "✅ The Poush Mela is held at Santiniketan, where the Visva-Bharati University is located. 📌 Poush for Tagore. ❌ Bishnupur is known for terracotta temples and for its own fair."
  },
  102: {
    questext: "Jamai Sashti is a festival of Bengal to honour which person?",
    options: ["Elder brother", "Son-in-law", "Teacher", "Neighbour"],
    correct: "2",
    exptext: "✅ Jamai Sashti honours the son-in-law, who is invited home for a feast. 📌 Jamai means son-in-law. ❌ Elder brother is tempting because of Bhai Phonta, which is a different festival."
  },
  103: {
    type: "concept", icon: "🎉", accent: "#dc2626", pauseTimer: true,
    title: "New Year Festivals of India",
    html: `
      <p class="cp-lead">Many states of India celebrate their own <b>New Year</b>, mostly in <u>March or April</u>. Learn them as a group, because exams love to match them.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/59.png" alt="A simple table with two columns, State and New Year festival, showing seven rows: Andhra P" data-caption="A quick chart of the New Year festival of seven states." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Festivals_of_India/60.png" alt="A calendar strip with two parts: March or April for Ugadi and Gudhi Padwa, and around 14 A" data-caption="The New Year festivals fall in two groups, March or April and mid-April." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>New Year in India follows the Sun or the Moon. Ugadi and Gudhi Padwa follow the Moon and fall at the start of Chaitra. The festivals that follow the Sun fall around 14 April, when the Sun enters a new sign of the zodiac. Losar is a Buddhist New Year that is celebrated in Ladakh, Sikkim and Arunachal Pradesh.</p>
      <table><thead><tr><th>Festival</th><th>State or people</th></tr></thead><tbody><tr><td>Ugadi</td><td>Andhra Pradesh, Telangana and Karnataka</td></tr><tr><td>Gudhi Padwa</td><td>Maharashtra</td></tr><tr><td>Puthandu</td><td>Tamil Nadu</td></tr><tr><td>Vishu</td><td>Kerala</td></tr><tr><td>Poila Baisakh</td><td>West Bengal</td></tr><tr><td>Bohag Bihu</td><td>Assam</td></tr><tr><td>Baisakhi</td><td>Punjab</td></tr><tr><td>Losar</td><td>Ladakh, Sikkim and the Monpa people of Arunachal Pradesh</td></tr><tr><td>Baishagu</td><td>Bodo people of Assam</td></tr></tbody></table>
      <div class="cp-note trap">Pongal is a harvest festival of January and not a New Year festival. Puthandu is the New Year of Tamil Nadu.</div>
      <div class="cp-note exam">Bohag Bihu, Poila Baisakh, Puthandu, Vishu and Baisakhi all fall around the middle of April.</div>
    `
  },
  104: {
    questext: "Which pair of festival and state is correctly matched?",
    options: ["Ugadi and Kerala", "Puthandu and Tamil Nadu", "Vishu and Maharashtra", "Gudhi Padwa and Assam"],
    correct: "2",
    exptext: "✅ Puthandu is the New Year of Tamil Nadu. 📌 Vishu for Kerala, Gudhi Padwa for Maharashtra. ❌ Ugadi belongs to the Telugu and Kannada people, not to Kerala."
  },
  105: {
    questext: "Which of the following is NOT a New Year festival?",
    options: ["Vishu", "Ugadi", "Gudhi Padwa", "Hornbill Festival"],
    correct: "4",
    exptext: "✅ The Hornbill Festival of Nagaland is a festival of all Naga tribes, held in December. 📌 Hornbill is a cultural festival. ❌ The other three are New Year festivals of different states."
  },
  106: {
    questext: "Bohag Bihu, Baisakhi and Poila Baisakh all fall in which month?",
    options: ["April", "January", "July", "October"],
    correct: "1",
    exptext: "✅ All three fall in April and are linked with the Sun entering a new sign. 📌 Mid-April is the solar New Year. ❌ January is the month of Magh Bihu, Lohri and Pongal."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Static_GK/Festivals_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a lit brass lamp, a bright rangoli pattern and a folded paper map of India" },
  "images/General_Awareness/Static_GK/Festivals_of_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ugadi pachadi six tastes Telugu New Year photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/1.png. a plate of Ugadi pachadi with neem flowers, jaggery and mango pieces",
  "images/General_Awareness/Static_GK/Festivals_of_India/2.png": { t: "fig", about: "A simple circle with six equal parts labelled Sweet, Sour, Salty, Bitter, Spicy, Tangy and the centre label Ugadi pachadi." },
  "images/General_Awareness/Static_GK/Festivals_of_India/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dree festival Apatani tribe Ziro Arunachal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/3.png. Apatani people in traditional dress at the Dree festival",
  "images/General_Awareness/Static_GK/Festivals_of_India/4.png": { t: "fig", about: "Five boxes joined to five festival names: Apatani to Dree, Adi to Solung, Galo to Mopin, Monpa to Losar, Khamti to Sangken." },
  "images/General_Awareness/Static_GK/Festivals_of_India/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bohag Bihu dance Assam dancers photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/5.png. Bihu dancers in red and white Assamese clothes",
  "images/General_Awareness/Static_GK/Festivals_of_India/6.png": { t: "fig", about: "A year wheel with three parts: April Bohag Bihu (sowing and New Year), October Kati Bihu (crop growing), January Magh Bihu (harvest feast)." },
  "images/General_Awareness/Static_GK/Festivals_of_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chhath Puja devotees standing in river offering arghya photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/7.png. devotees standing in water at sunset with offerings in bamboo baskets",
  "images/General_Awareness/Static_GK/Festivals_of_India/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sonepur cattle fair Bihar Harihar Kshetra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/8.png. the Sonepur fair ground with animals and visitors",
  "images/General_Awareness/Static_GK/Festivals_of_India/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bastar Dussehra rath procession Jagdalpur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/9.png. the huge wooden chariot pulled by villagers in Jagdalpur",
  "images/General_Awareness/Static_GK/Festivals_of_India/10.png": { t: "fig", about: "A horizontal bar showing 75 days with a small mark at the start and a bigger mark at the end, labelled Longest Dussehra." },
  "images/General_Awareness/Static_GK/Festivals_of_India/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Basilica of Bom Jesus Old Goa feast Saint Francis Xavier photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/11.png. the Basilica of Bom Jesus with crowds in December",
  "images/General_Awareness/Static_GK/Festivals_of_India/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shigmo festival Goa parade floats photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/12.png. colourful Shigmo parade with dancers and floats",
  "images/General_Awareness/Static_GK/Festivals_of_India/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rann Utsav Kutch white desert tent city photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/13.png. the white salt desert with tents and visitors",
  "images/General_Awareness/Static_GK/Festivals_of_India/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Modhera Sun Temple dance festival stage photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/14.png. the Sun Temple with dancers on the stage in front",
  "images/General_Awareness/Static_GK/Festivals_of_India/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Surajkund International Crafts Mela Faridabad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/15.png. the crafts fair ground with stalls and visitors",
  "images/General_Awareness/Static_GK/Festivals_of_India/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pinjore Gardens Yadavindra Gardens Panchkula photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/16.png. the terraced Mughal-style garden of Pinjore",
  "images/General_Awareness/Static_GK/Festivals_of_India/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kullu Dussehra Dhalpur ground Raghunath rath procession photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/17.png. the chariot of Lord Raghunath surrounded by hill deities",
  "images/General_Awareness/Static_GK/Festivals_of_India/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Minjar fair Chamba procession Chowgan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/18.png. the Minjar fair procession at the Chowgan of Chamba",
  "images/General_Awareness/Static_GK/Festivals_of_India/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tulip Garden Srinagar Zabarwan hills Dal Lake photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/19.png. rows of tulips in front of the Zabarwan hills",
  "images/General_Awareness/Static_GK/Festivals_of_India/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shikara boat Dal Lake Srinagar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/20.png. a decorated shikara boat on Dal Lake",
  "images/General_Awareness/Static_GK/Festivals_of_India/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sarhul festival Jharkhand Sal flowers tribal dance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/21.png. tribal dancers with Sal flowers at Sarhul",
  "images/General_Awareness/Static_GK/Festivals_of_India/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sohrai wall painting Jharkhand tribal house photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/22.png. a mud house wall painted with animals and plants",
  "images/General_Awareness/Static_GK/Festivals_of_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahamastakabhisheka Shravanabelagola Bahubali statue photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/23.png. the tall statue of Bahubali at Shravanabelagola",
  "images/General_Awareness/Static_GK/Festivals_of_India/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kambala buffalo race Karnataka slush paddy field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/24.png. a pair of buffaloes racing in a muddy paddy field",
  "images/General_Awareness/Static_GK/Festivals_of_India/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Thrissur Pooram elephants Vadakkunnathan temple Kudamattam photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/25.png. decorated elephants and people holding colourful umbrellas",
  "images/General_Awareness/Static_GK/Festivals_of_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nehru Trophy Boat Race snake boats Alappuzha photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/26.png. long snake boats racing on the Punnamada Lake",
  "images/General_Awareness/Static_GK/Festivals_of_India/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hemis festival Ladakh cham mask dance monastery photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/27.png. monks in colourful masks dancing in the courtyard",
  "images/General_Awareness/Static_GK/Festivals_of_India/28.png": { t: "fig", about: "A simple timeline with three marks: Saka Dawa in the fourth Tibetan month, Hemis in summer, Losar in winter." },
  "images/General_Awareness/Static_GK/Festivals_of_India/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tansen Music Festival Gwalior Tansen tomb photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/29.png. the Tansen Samaroh stage near the tomb of Tansen in Gwalior",
  "images/General_Awareness/Static_GK/Festivals_of_India/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Khajuraho Dance Festival Chandela temples stage photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/30.png. classical dancers in front of the Khajuraho temples",
  "images/General_Awareness/Static_GK/Festivals_of_India/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lalbaugcha Raja Ganesh Chaturthi procession Mumbai photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/31.png. a large Ganesha idol on a procession in Mumbai",
  "images/General_Awareness/Static_GK/Festivals_of_India/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Narali Purnima coconut offering sea Koli fishermen photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/32.png. fishermen offering a coconut to the sea",
  "images/General_Awareness/Static_GK/Festivals_of_India/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lai Haraoba festival Manipur Meitei dance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/33.png. Meitei dancers at the Lai Haraoba festival",
  "images/General_Awareness/Static_GK/Festivals_of_India/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Yaosang festival Thabal Chongba Manipur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/34.png. young people dancing in a circle at Yaosang",
  "images/General_Awareness/Static_GK/Festivals_of_India/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Wangala hundred drums festival Garo dancers Tura photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/35.png. Garo dancers with long drums in colourful dress",
  "images/General_Awareness/Static_GK/Festivals_of_India/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shad Suk Mynsiem Khasi dance Shillong women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/36.png. Khasi women in silver crowns and gold dress dancing",
  "images/General_Awareness/Static_GK/Festivals_of_India/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chapchar Kut festival Mizoram Cheraw bamboo dance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/37.png. young Mizo dancers doing the bamboo dance",
  "images/General_Awareness/Static_GK/Festivals_of_India/38.png": { t: "fig", about: "A year circle with three marks: March Chapchar Kut, August or September Mim Kut, and Phawang Kut after the harvest." },
  "images/General_Awareness/Static_GK/Festivals_of_India/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hornbill Festival Kisama Heritage Village Naga warriors photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/39.png. Naga dancers in tribal dress at Kisama",
  "images/General_Awareness/Static_GK/Festivals_of_India/40.png": { t: "fig", about: "Four tribe names joined to four festivals: Ao to Moatsu, Konyak to Aoleang, Angami to Sekrenyi, all tribes to Hornbill." },
  "images/General_Awareness/Static_GK/Festivals_of_India/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Puri Rath Yatra chariots Jagannath Balabhadra Subhadra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/41.png. the three huge chariots on the Grand Road of Puri",
  "images/General_Awareness/Static_GK/Festivals_of_India/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Konark Sun Temple chariot wheel photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/42.png. the stone chariot wheel of the Konark Sun Temple",
  "images/General_Awareness/Static_GK/Festivals_of_India/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hola Mohalla Anandpur Sahib Nihang Sikh martial arts photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/43.png. Nihang Sikhs showing martial skills at Anandpur Sahib",
  "images/General_Awareness/Static_GK/Festivals_of_India/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lohri bonfire Punjab celebration photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/44.png. people dancing around a Lohri bonfire in the evening",
  "images/General_Awareness/Static_GK/Festivals_of_India/45.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pushkar Camel Fair Rajasthan camels and traders photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/45.png. camels and traders at the Pushkar fair ground",
  "images/General_Awareness/Static_GK/Festivals_of_India/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jaisalmer Desert Festival Sam sand dunes turban tying photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/46.png. folk artists and a camel at the Jaisalmer Desert Festival",
  "images/General_Awareness/Static_GK/Festivals_of_India/47.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Saga Dawa festival Gangtok Buddhist procession photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/47.png. monks carrying holy books in a procession in Gangtok",
  "images/General_Awareness/Static_GK/Festivals_of_India/48.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sakewa Sakela Ubhauli dance Rai community photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/48.png. Rai people dancing in a circle in traditional dress",
  "images/General_Awareness/Static_GK/Festivals_of_India/49.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pongal festival Tamil Nadu sweet pongal pot kolam photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/49.png. a pot of boiling sweet Pongal with sugarcane and a kolam",
  "images/General_Awareness/Static_GK/Festivals_of_India/50.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jallikattu bull taming Alanganallur Madurai photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/50.png. young men trying to hold a running bull",
  "images/General_Awareness/Static_GK/Festivals_of_India/51.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bathukamma festival Hyderabad flower stack women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/51.png. women dancing around a tall stack of flowers",
  "images/General_Awareness/Static_GK/Festivals_of_India/52.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Medaram Sammakka Saralamma Jatara jaggery offering photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/52.png. crowds offering jaggery at the Medaram Jatara",
  "images/General_Awareness/Static_GK/Festivals_of_India/53.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kharchi Puja Agartala Chaturdasha Devata temple photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/53.png. devotees at the Chaturdasha Devata temple during Kharchi Puja",
  "images/General_Awareness/Static_GK/Festivals_of_India/54.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hojagiri dance Reang women balancing pot bottle photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/54.png. a Reang woman dancing while balancing a pot on her head",
  "images/General_Awareness/Static_GK/Festivals_of_India/55.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Phool Dei festival Uttarakhand children flowers doorstep photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/55.png. children placing flowers on a doorstep",
  "images/General_Awareness/Static_GK/Festivals_of_India/56.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Harela festival Kumaon green shoots planting photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/56.png. green shoots of wheat and barley placed in a basket",
  "images/General_Awareness/Static_GK/Festivals_of_India/57.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Durga Puja Kolkata pandal idol dhunuchi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/57.png. a large Durga idol inside a decorated pandal in Kolkata",
  "images/General_Awareness/Static_GK/Festivals_of_India/58.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Poush Mela Santiniketan Baul singers photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Festivals_of_India/58.png. Baul singers at the Poush Mela of Santiniketan",
  "images/General_Awareness/Static_GK/Festivals_of_India/59.png": { t: "fig", about: "A simple table with two columns, State and New Year festival, showing seven rows: Andhra Pradesh Ugadi, Maharashtra Gudhi Padwa, Tamil Nadu Puthandu, Kerala Vishu, West Bengal Poila Baisakh, Assam Bohag Bihu, Punjab Baisakhi." },
  "images/General_Awareness/Static_GK/Festivals_of_India/60.png": { t: "fig", about: "A calendar strip with two parts: March or April for Ugadi and Gudhi Padwa, and around 14 April for Puthandu, Vishu, Poila Baisakh, Bohag Bihu and Baisakhi." }
});

/* CHANGE LOG
   - The state name Orissa is written as Odisha, which is the current official name.
   - Min Kut is written as Mim Kut, the correct name of the maize harvest festival of Mizoram.
   - Medharam Jatra is written as Medaram Jatara, and Allukal Pongal as Attukal Pongala.
   - Mahamatsyaabhishake is written as Mahamastakabhisheka, the festival of the Bahubali statue at Shravanabelagola.
   - Karga is written as Karaga, Elephenta as Elephanta, Pachmarhi as Pachmarhi Utsav, Nishangandhi as Nishagandhi, and Makar Vilaku as Makaravilakku.
   - Moatsu-Ao is written as Moatsu Mong of the Ao tribe, and Hornbill is given with its place, Kisama.
   - Sonepur Cattle fair, Poush Mela and similar fairs are given with their place and month as extra exam points.
   - Bhagta Parba of Punjab, Ghadiya, Rasnawa and Pir Budhan of Madhya Pradesh, and Dombe Habba of Karnataka were left out because their meaning could not be confirmed.
   - Jammu and Kashmir and Ladakh are shown as separate Union Territories.
   - Extra exam points added: Kullu Dussehra, Kheer Bhawani Mela, Amarnath Yatra, Mysuru Dasara, Nanda Devi Raj Jat, Pang Lhabsol, Brahmotsavam and the Pongal days.
   - A final page on New Year festivals of India was added as a group revision.
*/