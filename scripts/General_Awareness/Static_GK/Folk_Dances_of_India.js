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

/* Field: General_Awareness · Subject: Static_GK · Chapter: Folk_Dances_of_India · 29 concept pages (+ overview) · 43 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "💃", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Folk Dances of India",
    thumb: {
      image: "images/General_Awareness/Static_GK/Folk_Dances_of_India/thumbnail.png",
      banner: "STATIC GK 2026",
      line1: "FOLK DANCES",
      line2: "OF INDIA",
      line3: "STATE-WISE",
      badge: "FULL CLASS",
      ribbon: "DANCES • STATES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Folk Dances of India State-Wise | Static GK for SSC CGL",
      altTitles: ["All Folk Dances of India in One Class", "Folk Dance Tricks: Match Dance with State"],
      description: "Folk dances are sure-shot marks in Static GK. In this class we go state by state and learn the famous dance of each state, with the tribe, festival and the exam trap.\n\n📌 IN THIS CLASS\n✅ 28 states and their folk dances\n✅ Tribes, festivals and traps\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Basic idea\n\n👍 Like, share, subscribe.\n\n#SSCCGL #StaticGK #FolkDances",
      tags: ["folk dances of india", "folk dance state wise", "static gk", "ssc cgl static gk", "indian folk dances", "dance and state", "art and culture", "classical dances of india", "garba bihu lavani", "chhau dance", "theyyam", "kalbeliya", "cheraw bamboo dance", "sattriya", "folk dance tricks", "gk for competitive exams", "railway exam gk", "banking exam gk", "defence exam gk", "important dances", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "Folk Dances of India MCQ"],
      hashtags: ["SSCCGL", "StaticGK", "FolkDances"],
      thumbText: "FOLK DANCES OF INDIA",
      pinnedComment: "📌 Which dance did you find hardest? Write the dance and state below 👇",
      communityPost: "💃 New class is live: Folk Dances of India, state by state. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Basic idea",
      playlist: "Static GK — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, state-by-state class on the folk dances of India</u>. Every state has famous dances, and exam questions ask you to match the dance with its state, tribe or festival.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>29</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>43</b><span>Questions</span></div>
        <div class="cp-stat"><b>~101 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Basic Idea</b><br>What a folk dance is, how it differs from a classical dance, and which eight dances are classical.</li>
        <li><b>South India</b><br>Andhra Pradesh, Telangana, Karnataka, Kerala and Tamil Nadu: Kuchipudi lands, Theyyam, Yakshagana, Kavadi and more.</li>
        <li><b>West and Central India</b><br>Goa, Gujarat, Maharashtra, Rajasthan, Madhya Pradesh and Chhattisgarh: Garba, Lavani, Ghoomar, Panthi and more.</li>
        <li><b>North India</b><br>Haryana, Himachal Pradesh, Jammu and Kashmir, Uttar Pradesh and Uttarakhand: Nati, Rouf, Charkula and Chholiya.</li>
        <li><b>East India</b><br>Bihar, Jharkhand, Odisha and West Bengal: Karam, Chhau, Gotipua, Baul and Jat Jatin.</li>
        <li><b>North-East India</b><br>Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim and Tripura: Bihu, Cheraw, Wangala and Chham.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Static General Knowledge questions on folk dances are asked in almost every Staff Selection Commission Combined Graduate Level paper, and they are easy marks once the dance and state are matched.</div>
    `
  },
  2: {
    type: "concept", icon: "💃", accent: "#4f46e5", pauseTimer: true,
    title: "Folk Dance — The Basic Idea",
    html: `
      <p class="cp-lead">A folk dance is a dance that ordinary people of a region perform together, mostly during festivals, harvests, weddings and prayers. <u>For the exam, the real skill is to match each dance with its state.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/1.png" alt="Indian folk dance group performance colourful costumes photo" data-caption="Village dancers in bright costumes perform a folk dance during a festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/2.png" alt="Two columns: Folk dance (local people, festivals, simple steps, no strict rules) and Class" data-caption="Folk dances come from villages, while classical dances follow a fixed written grammar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Folk dances grow naturally out of daily life. People dance to thank nature for rain, to celebrate a good crop, or to worship a local god. Because of this, one state can have many folk dances, and the same dance name can even appear in two or three neighbouring states.</p>
      <table><thead><tr><th>Point</th><th>Folk dance</th><th>Classical dance</th></tr></thead><tbody><tr><td>Who performs</td><td>Ordinary community members</td><td>Trained dancers</td></tr><tr><td>Rules</td><td>Simple and local</td><td>Fixed grammar from the Natya Shastra</td></tr><tr><td>Where</td><td>Villages and festivals</td><td>Temples, courts and stages</td></tr></tbody></table>
      <div class="cp-note trap">The eight classical dances are Bharatanatyam, Kathak, Kathakali, Kuchipudi, Manipuri, Mohiniyattam, Odissi and Sattriya. Do not mix them up with folk dances such as Garba or Bihu.</div>
      <div class="cp-note exam">The Sangeet Natak Akademi (the national academy of music, dance and drama) recognises eight classical dances. Questions often ask which classical dance belongs to which state.</div>
      <div class="cp-mnemonic">Remember the pair: Kuchipudi is Andhra, Sattriya is Assam, Odissi is Odisha, Kathak is the north.</div>
    `
  },
  3: {
    questext: "Which of the following is a classical dance of India and not a folk dance?",
    options: ["Garba", "Bihu", "Sattriya", "Lavani"],
    correct: "3",
    exptext: "✅ Sattriya, from Assam, is one of the eight classical dances. 📌 Garba, Bihu and Lavani are all folk dances. ❌ Bihu is tempting because it is also from Assam, but it is a folk dance."
  },
  4: {
    questext: "Consider the following statements about folk dances:\n1. Folk dances are mostly performed by ordinary community members during festivals.\n2. Each folk dance follows a fixed grammar written in the Natya Shastra.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Fixed grammar belongs to classical dance. ❌ Statement 2 is wrong because folk dances follow simple local traditions."
  },
  5: {
    type: "concept", icon: "🪔", accent: "#22c55e", pauseTimer: true,
    title: "Andhra Pradesh",
    html: `
      <p class="cp-lead">Andhra Pradesh is the home of <u>Kuchipudi</u>, a classical dance, and of many lively folk forms that mix dance, drum and storytelling.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/3.png" alt="Burrakatha folk performance Andhra Pradesh photo" data-caption="A Burrakatha troupe tells a story through song, speech and drum beats." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/4.png" alt="Veeranatyam dance Andhra Pradesh photo" data-caption="Veeranatyam dancers perform a vigorous dance in honour of Lord Shiva." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Many dances here are linked to gods and local heroes. Veeranatyam is a strong, energetic dance offered to Lord Shiva in his fierce Virabhadra form. Burrakatha is a storytelling art in which the main performer plays a drum shaped like a tambura while the others support him.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Veeranatyam</td><td>Vigorous dance in honour of Lord Shiva</td></tr><tr><td>Burrakatha</td><td>Storytelling with songs and drums</td></tr><tr><td>Butta Bommalu</td><td>Dancers wear basket-like masks, called butta</td></tr><tr><td>Lambadi</td><td>Dance of the Banjara women in colourful dress</td></tr></tbody></table>
      <div class="cp-note trap">Bhamakalapam is a dance-drama linked to Kuchipudi, but Kuchipudi itself is a classical dance, not a folk dance.</div>
      <div class="cp-note exam">Kuchipudi is named after the village Kuchipudi in Andhra Pradesh. Siddhendra Yogi is credited with shaping this tradition.</div>
      <div class="cp-note tip">Other dances on the list for this state: Bhamakalapam, Bhimsa, Dappu, Bonalu and Kolattam.</div>
    `
  },
  6: {
    questext: "Butta Bommalu is a folk dance of which state?",
    options: ["Kerala", "Tamil Nadu", "Odisha", "Andhra Pradesh"],
    correct: "4",
    exptext: "✅ Butta Bommalu is a folk dance of Andhra Pradesh in which dancers wear basket-like masks. 📌 Think \"Butta\" means basket. ❌ Tamil Nadu is tempting because it also has many mask and puppet arts, but this dance is Andhra."
  },
  7: {
    questext: "Veeranatyam, a vigorous dance, is performed in honour of which deity?",
    options: ["Goddess Durga", "Lord Vishnu", "Lord Krishna", "Lord Shiva"],
    correct: "4",
    exptext: "✅ Veeranatyam honours Lord Shiva in his fierce form. 📌 \"Veera\" means brave, like the brave Virabhadra. ❌ Krishna is wrong because Krishna dances are mostly Raas forms."
  },
  8: {
    type: "concept", icon: "🏔️", accent: "#f59e0b", pauseTimer: true,
    title: "Arunachal Pradesh",
    html: `
      <p class="cp-lead">Arunachal Pradesh has many tribes, so its dances are <u>masked, ritual and closely tied to Buddhist and tribal beliefs</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/5.png" alt="Yak Chham mask dance Arunachal Pradesh Monpa photo" data-caption="Monpa dancers wear large yak masks for a ritual mask dance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/6.png" alt="Bardo Chham Sherdukpen mask dance photo" data-caption="Sherdukpen dancers wear animal masks for the Bardo Chham festival dance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Monpa and Sherdukpen tribes follow Buddhism, so their dances use colourful masks and tell stories of good winning over evil. Other tribes, such as the Adi, perform dances that celebrate farming and community life.</p>
      <table><thead><tr><th>Dance</th><th>Tribe or idea</th></tr></thead><tbody><tr><td>Aji Lamu</td><td>Dance of the Monpa tribe</td></tr><tr><td>Bardo Chham</td><td>Mask dance of the Sherdukpen tribe</td></tr><tr><td>Pasi Kongki</td><td>Dance of the Adi tribe</td></tr><tr><td>Wancho</td><td>Dance of the Wancho tribe</td></tr></tbody></table>
      <div class="cp-note trap">Chham means a masked Buddhist dance. It is performed in Arunachal, Sikkim and Himachal, so always check the full dance name before choosing a state.</div>
      <div class="cp-note exam">Bardo Chham belongs to the Sherdukpen tribe, and Aji Lamu belongs to the Monpa tribe.</div>
      <div class="cp-note tip">Other dances on the list for this state: Buiya, Chalo, Lion and Peacock, Yak Chham, Mask, Popir and Rikhampada.</div>
    `
  },
  9: {
    questext: "Bardo Chham is a mask dance of which tribe of Arunachal Pradesh?",
    options: ["Adi", "Nyishi", "Wancho", "Sherdukpen"],
    correct: "4",
    exptext: "✅ Bardo Chham is performed by the Sherdukpen tribe. 📌 Link \"Chham\" with masks and \"Sherdukpen\" with Buddhist traditions. ❌ Adi is tempting because Adi is a large tribe, but its famous dance is Pasi Kongki."
  },
  10: {
    type: "concept", icon: "🌾", accent: "#ef4444", pauseTimer: true,
    title: "Assam",
    html: `
      <p class="cp-lead">Assam is the land of <u>Bihu</u>, the most famous folk dance of the Northeast, and of Sattriya, one of the eight classical dances.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/7.png" alt="Bihu dance Assam Rongali Bihu photo" data-caption="Bihu dancers in traditional red and white dress welcome the Assamese new year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/8.png" alt="Bagurumba Bodo dance Assam photo" data-caption="Bodo women perform Bagurumba, known as the butterfly dance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Bihu is celebrated three times a year. Rongali or Bohag Bihu marks the new year and the sowing season in April. The Bihu dance has quick hand movements and strong hip movements, with drums called dhol and a pipe called pepa.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Bihu</td><td>Main Assamese festival dance, performed at Rongali Bihu</td></tr><tr><td>Bagurumba</td><td>Butterfly dance of the Bodo tribe</td></tr><tr><td>Bhortal</td><td>Dance with large cymbals</td></tr><tr><td>Deodhani</td><td>Dance linked to Goddess Manasa</td></tr><tr><td>Ali Aye Ligang</td><td>Spring festival dance of the Mising tribe</td></tr></tbody></table>
      <div class="cp-note trap">Bihu belongs to Assam and Bhangra belongs to Punjab. Both are harvest dances, so exams use them as a favourite confusion.</div>
      <div class="cp-note exam">Bagurumba is called the butterfly dance because the dancers move like butterflies in their colourful dress.</div>
      <div class="cp-note tip">Other dances on the list for this state: Jhumur.</div>
    `
  },
  11: {
    questext: "Bagurumba, known as the butterfly dance, belongs to which tribe of Assam?",
    options: ["Ahom", "Mising", "Karbi", "Bodo"],
    correct: "4",
    exptext: "✅ Bagurumba is a dance of the Bodo tribe. 📌 Picture butterfly wings in the dress. ❌ Mising is tempting, but the Mising tribe is known for the Ali Aye Ligang festival."
  },
  12: {
    questext: "Consider the following statements about the folk dances of Assam:\n1. Bihu is performed mainly during the Rongali Bihu festival in April.\n2. Deodhani is a dance linked to Goddess Manasa.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Remember Bihu for April and Deodhani for Manasa. ❌ \"Only 1\" is tempting because Bihu is more famous, but Deodhani is also a real Assamese dance."
  },
  13: {
    type: "concept", icon: "🌧️", accent: "#8b5cf6", pauseTimer: true,
    title: "Bihar",
    html: `
      <p class="cp-lead">Bihar's folk dances show <u>village life, monsoon prayers and the pain of migration</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/9.png" alt="Jat Jatin dance Bihar Mithila photo" data-caption="A couple performs Jat Jatin, a Bihar dance about the love of a man and woman." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/10.png" alt="Bidesia Bhikhari Thakur folk theatre photo" data-caption="Bidesia is a folk theatre form that tells of men who leave home for work." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Jat-Jatin is a dance of a couple, the Jat and the Jatin, who live apart and meet in the rainy season. Bidesia was made famous by the poet and playwright Bhikhari Thakur, who showed the sadness of families when men moved far away for work.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Jat Jatin</td><td>Love story of a couple in the monsoon</td></tr><tr><td>Bidesia</td><td>Folk theatre by Bhikhari Thakur</td></tr><tr><td>Jhijhia</td><td>Prayer dance for rain</td></tr><tr><td>Kajri</td><td>Monsoon dance and song</td></tr><tr><td>Paika</td><td>Warrior-style dance</td></tr></tbody></table>
      <div class="cp-note trap">Kajri is sung in Bihar and Uttar Pradesh in the rainy season, so check the other options carefully.</div>
      <div class="cp-note exam">Bhikhari Thakur is called the Shakespeare of Bhojpuri and is linked with Bidesia.</div>
      <div class="cp-note tip">Other dances on the list for this state: Dhibia, Jharni.</div>
    `
  },
  14: {
    questext: "Bidesia, a folk theatre form, is linked with which person?",
    options: ["Kalidasa", "Vidyapati", "Tulsidas", "Bhikhari Thakur"],
    correct: "4",
    exptext: "✅ Bidesia is linked with Bhikhari Thakur. 📌 Bidesia means \"outsider\", about men who go abroad for work. ❌ Vidyapati is tempting because he is from Mithila, but he is famous for poems."
  },
  15: {
    type: "concept", icon: "🌳", accent: "#14b8a6", pauseTimer: true,
    title: "Chhattisgarh",
    html: `
      <p class="cp-lead">Chhattisgarh has a rich tribal tradition, and its dances are <u>linked with forests, harvests and the Mahabharata</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/11.png" alt="Panthi dance Chhattisgarh Satnami photo" data-caption="Satnami dancers perform Panthi in honour of Guru Ghasidas." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/12.png" alt="Gaur Maria dance Bastar bison horn headgear photo" data-caption="Maria tribal dancers in Bastar wear headgear made with bison horns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Panthi is performed by the Satnami community in honour of the saint Guru Ghasidas. Pandavani tells the story of the Pandavas from the Mahabharata, and Teejan Bai made it famous across the world.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Panthi</td><td>Dance of the Satnami people for Guru Ghasidas</td></tr><tr><td>Pandavani</td><td>Mahabharata story singing, made famous by Teejan Bai</td></tr><tr><td>Gaur Maria</td><td>Dance with bison horn headgear</td></tr><tr><td>Gendi</td><td>Dance on tall wooden stilts</td></tr><tr><td>Suwa</td><td>Parrot dance performed by women</td></tr></tbody></table>
      <div class="cp-note trap">Karma is a famous dance in Chhattisgarh, but Karma is also performed in Jharkhand and Odisha.</div>
      <div class="cp-note exam">Teejan Bai received the Padma Vibhushan in 2019 for Pandavani.</div>
      <div class="cp-note tip">Other dances on the list for this state: Kaksar, Karma, Saila and Jhumar.</div>
    `
  },
  16: {
    questext: "Pandavani, a singing and storytelling art of the Mahabharata, belongs to which state?",
    options: ["Madhya Pradesh", "Chhattisgarh", "Uttar Pradesh", "Odisha"],
    correct: "2",
    exptext: "✅ Pandavani belongs to Chhattisgarh. 📌 Teejan Bai made it famous. ❌ Madhya Pradesh is tempting because Chhattisgarh was once part of it, but Pandavani is linked with Chhattisgarh."
  },
  17: {
    questext: "The Panthi dance of Chhattisgarh is performed in honour of which saint?",
    options: ["Sant Kabir", "Guru Nanak", "Guru Ghasidas", "Sant Ravidas"],
    correct: "3",
    exptext: "✅ The Satnami community performs Panthi for Guru Ghasidas. 📌 Panthi means \"of the path\" of the Satnami faith. ❌ Sant Kabir is tempting because Satnami ideas are close to his teaching."
  },
  18: {
    type: "concept", icon: "🏖️", accent: "#ec4899", pauseTimer: true,
    title: "Goa",
    html: `
      <p class="cp-lead">Goa's dances show a blend of <u>Konkani tradition and Portuguese influence</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/13.png" alt="Goa Fugdi dance women photo" data-caption="Goan women perform Fugdi in a circle during the Ganesh festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/14.png" alt="Goa Ghode Modni Shigmo festival photo" data-caption="Dancers perform Ghode Modni at the Shigmo spring festival in Goa." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Mando is a slow, graceful dance that tells of love and sadness, and it has Portuguese touches. Fugdi is danced by women in circles during the Ganesh festival. Ghode Modni is a warrior dance performed at the spring festival of Shigmo.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Mando</td><td>Slow love dance with Portuguese influence</td></tr><tr><td>Fugdi</td><td>Women dance in circles at Ganesh Chaturthi</td></tr><tr><td>Ghode Modni</td><td>Dance at Shigmo, the spring festival</td></tr><tr><td>Dekhni</td><td>Dance with Indian and Portuguese mix</td></tr><tr><td>Dhalo</td><td>Women dance in the month of Pausha</td></tr></tbody></table>
      <div class="cp-note trap">Goa's Dekhni and Mando show Portuguese influence, so do not confuse them with the Maharashtra dance Lavani.</div>
      <div class="cp-note exam">Shigmo is the spring festival of Goa, and Ghode Modni is performed during it.</div>
      <div class="cp-note tip">Other dances on the list for this state: Talgadi, Jagor, Tarangmel, Gonf, Sao Jao, Roamt and Kunbi.</div>
    `
  },
  19: {
    questext: "Mando is a folk dance of which state?",
    options: ["Karnataka", "Kerala", "Goa", "Maharashtra"],
    correct: "3",
    exptext: "✅ Mando is a graceful dance of Goa. 📌 Think of Goa's Portuguese past. ❌ Kerala is tempting because Kerala also had Portuguese contact, but Mando is Goan."
  },
  20: {
    type: "concept", icon: "🪘", accent: "#3b82f6", pauseTimer: true,
    title: "Gujarat",
    html: `
      <p class="cp-lead">Gujarat is famous for <u>Garba and Dandiya Raas</u>, the dances of the Navratri festival.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/15.png" alt="Garba dance Navratri Gujarat women photo" data-caption="Women perform Garba in a circle during the nine nights of Navratri." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/16.png" alt="Dandiya Raas Gujarat sticks dance photo" data-caption="Dandiya Raas dancers strike decorated sticks while moving in rhythm." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Garba is danced around a lamp or an image of Goddess Amba, and the dancers clap in circles. Dandiya Raas is danced with two sticks, which are struck in a rhythm, and it recalls the playful dances of Lord Krishna.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Garba</td><td>Navratri dance in honour of Goddess Amba</td></tr><tr><td>Dandiya Raas</td><td>Stick dance of Navratri</td></tr><tr><td>Tippani</td><td>Women of Saurashtra beat the floor with a wooden tool</td></tr><tr><td>Padhar</td><td>Dance of the fishermen near Nal Sarovar</td></tr><tr><td>Siddi Dhamal</td><td>Dance of the Siddi community</td></tr></tbody></table>
      <div class="cp-note trap">Garba is danced with hands and claps, while Dandiya Raas is danced with sticks. Exams use this difference.</div>
      <div class="cp-note exam">Bhavai is a folk theatre form of Gujarat, and Garba is the most famous Gujarati dance.</div>
      <div class="cp-note tip">Other dances on the list for this state: Hudo, Matukadi, Gop Raas, Lasya and Vinchhudo.</div>
    `
  },
  21: {
    questext: "Which dance of Gujarat is performed with two small sticks?",
    options: ["Garba", "Padhar", "Tippani", "Dandiya Raas"],
    correct: "4",
    exptext: "✅ Dandiya Raas uses two sticks. 📌 \"Dandiya\" means stick. ❌ Garba is tempting because both dances are for Navratri, but Garba is danced by clapping."
  },
  22: {
    questext: "Consider the following statements about the folk dances of Gujarat:\n1. Garba is performed during Navratri.\n2. Siddi Dhamal is a dance of Punjab.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Siddi Dhamal is of Gujarat. ❌ Statement 2 is wrong because the Siddi community lives in Gujarat."
  },
  23: {
    type: "concept", icon: "🌾", accent: "#f97316", pauseTimer: true,
    title: "Haryana",
    html: `
      <p class="cp-lead">Haryana's dances are <u>full of the energy of farming life, with songs of spring, fairs and local heroes</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/17.png" alt="Haryanvi Phag dance women photo" data-caption="Haryanvi women in bright dress perform a folk dance during a spring festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/18.png" alt="Four boxes joined to a centre label Haryana: Phag, Loor, Gugga, Daph." data-caption="Four important folk dances of Haryana around one centre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Phag is a dance of the farmers in the month of Phalguna, when the wheat crop is ripe. Loor is a dance of young girls in the same season. Gugga is performed in the memory of the folk hero Gugga Pir, who is also worshipped in Rajasthan and Punjab.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Phag</td><td>Farmers dance in Phalguna</td></tr><tr><td>Loor</td><td>Dance of young girls</td></tr><tr><td>Gugga</td><td>Dance in memory of Gugga Pir</td></tr><tr><td>Daph</td><td>Dance with a large frame drum</td></tr></tbody></table>
      <div class="cp-note trap">Jhumar is a dance of Haryana and also of Jharkhand and Chhattisgarh, so read the options with care.</div>
      <div class="cp-note exam">Phalguna is the spring month before Holi, and Phag and Dhamal belong to this season.</div>
      <div class="cp-note tip">Other dances on the list for this state: Dhamal, Manjira, Charkula, Jhumar and Khoria.</div>
    `
  },
  24: {
    questext: "Loor is a folk dance performed by whom in Haryana?",
    options: ["Old men", "Young girls", "Warriors", "Priests"],
    correct: "2",
    exptext: "✅ Loor is a dance of young girls in the spring season. 📌 Think of \"Loor\" as light girlish steps. ❌ Warriors is tempting because many Haryana dances are strong, but Loor is graceful."
  },
  25: {
    type: "concept", icon: "❄️", accent: "#84cc16", pauseTimer: true,
    title: "Himachal Pradesh",
    html: `
      <p class="cp-lead">Himachal Pradesh has <u>mountain dances in which villagers dance in rows and circles, and monasteries hold masked Chham dances</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/19.png" alt="Kullu Nati dance Himachal Pradesh photo" data-caption="Himachali villagers dance Nati in a long chain in the hills." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/20.png" alt="Chham mask dance Himachal monastery photo" data-caption="Lamas in colourful masks perform the Chham dance in a monastery." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Nati is the best known dance of the hill villages, especially around Kullu, and it is performed in a line or a circle. Chham is a masked dance of Buddhist monasteries that shows good defeating evil.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Nati</td><td>Best known hill dance of Himachal, Kullu region</td></tr><tr><td>Chham</td><td>Masked Buddhist dance</td></tr><tr><td>Chapeli</td><td>Dance of the hills with songs</td></tr><tr><td>Dangi</td><td>Dance of the Chamba area</td></tr></tbody></table>
      <div class="cp-note trap">Chham is not only a Himachal dance. It is performed in Sikkim and Arunachal too.</div>
      <div class="cp-note exam">In 2016 the Kullu Nati set a Guinness record as the largest folk dance gathering.</div>
      <div class="cp-note tip">Other dances on the list for this state: Dhaman, Cholamba, Shand, Jhora, Rakshasa and Kayang Mala.</div>
    `
  },
  26: {
    questext: "Nati is the best known folk dance of which state?",
    options: ["Rajasthan", "Punjab", "Uttarakhand", "Himachal Pradesh"],
    correct: "4",
    exptext: "✅ Nati is the best known folk dance of Himachal Pradesh. 📌 Think of the Kullu valley. ❌ Uttarakhand is tempting because both are hill states, but Nati is Himachali."
  },
  27: {
    type: "concept", icon: "🏔️", accent: "#06b6d4", pauseTimer: true,
    title: "Jammu and Kashmir",
    html: `
      <p class="cp-lead">Jammu and Kashmir has <u>dances that welcome spring, honour religious days and entertain with satire</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/21.png" alt="Rouf dance Kashmir women photo" data-caption="Kashmiri women perform Rouf in two lines on festive days." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/22.png" alt="Bhand Pather Kashmir folk theatre photo" data-caption="Bhand Pather is a Kashmiri folk theatre that uses humour and satire." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Rouf is danced by women in two rows, and they move in step while singing. Bhand Pather is not only a dance. It is a folk theatre of Kashmir in which actors use humour to point out the faults of society.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Rouf</td><td>Women's dance in two lines, linked with spring and Eid</td></tr><tr><td>Bhand Pather</td><td>Folk theatre with satire</td></tr><tr><td>Kud</td><td>Night dance for the local deity in Jammu</td></tr><tr><td>Dumhal</td><td>Men's dance of the Wattal tribe</td></tr></tbody></table>
      <div class="cp-note trap">Bhand Pather is a folk theatre, not a dance, so a question may ask which option is a theatre form.</div>
      <div class="cp-note exam">Rouf is an important women's dance of Kashmir, and Dumhal is a dance of the Wattal people.</div>
      <div class="cp-note tip">Other dances on the list for this state: Hikat, Damali and Dhumal.</div>
    `
  },
  28: {
    questext: "Bhand Pather is a traditional folk theatre of which region?",
    options: ["Goa", "Gujarat", "Bengal", "Kashmir"],
    correct: "4",
    exptext: "✅ Bhand Pather is a folk theatre of Kashmir. 📌 It uses humour to show the problems of society. ❌ Gujarat is tempting because Bhavai is its folk theatre, but Bhand Pather is Kashmiri."
  },
  29: {
    type: "concept", icon: "🔥", accent: "#a855f7", pauseTimer: true,
    title: "Jharkhand",
    html: `
      <p class="cp-lead">Jharkhand is a land of forests and tribes, so its dances are <u>linked to trees, crops and seasons</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/23.png" alt="Karam dance Jharkhand tribal photo" data-caption="Tribal dancers in Jharkhand perform Karam around the Karam tree branch." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/24.png" alt="Seraikela Chhau mask dance Jharkhand photo" data-caption="Chhau dancers wear painted masks in the Seraikela style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Karam is danced during the Karam festival, when people worship the Karam tree for good crops. Chhau is a martial dance that uses masks in the Seraikela style, and it shows stories from the epics.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Karam</td><td>Dance for the Karam tree and good crops</td></tr><tr><td>Chhau</td><td>Masked martial dance from Seraikela</td></tr><tr><td>Phagua</td><td>Dance of the Holi season</td></tr><tr><td>Jhumair</td><td>Dance of the Nagpuri area</td></tr></tbody></table>
      <div class="cp-note trap">Chhau is performed in three styles in Jharkhand, Odisha and West Bengal, and only the Mayurbhanj style is without masks.</div>
      <div class="cp-note exam">Chhau was added to the UNESCO list of intangible heritage in 2010.</div>
      <div class="cp-note tip">Other dances on the list for this state: Santhali, Hunta, Paika, Mundari and Domkach.</div>
    `
  },
  30: {
    questext: "Which Chhau style of dance is performed without masks?",
    options: ["Purulia", "Seraikela", "Mayurbhanj", "All use masks"],
    correct: "3",
    exptext: "✅ Mayurbhanj Chhau of Odisha is performed without masks. 📌 Mayurbhanj means \"face free\". ❌ Seraikela is tempting, but it uses beautiful masks."
  },
  31: {
    questext: "Consider the following statements about Chhau:\n1. Seraikela Chhau uses masks.\n2. Chhau was added to the UNESCO list in 2010.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Seraikela means masks and 2010 means UNESCO. ❌ \"Only 1\" is tempting, but UNESCO recognition is also true."
  },
  32: {
    type: "concept", icon: "🎭", accent: "#e11d48", pauseTimer: true,
    title: "Karnataka",
    html: `
      <p class="cp-lead">Karnataka's folk dances are <u>big, loud and ritual: drums, masks and night-long stage shows</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/25.png" alt="Yakshagana performance Karnataka photo" data-caption="Yakshagana actors wear tall crowns and bright makeup in a night-long show." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/26.png" alt="Dollu Kunitha drum dance Karnataka photo" data-caption="Dollu Kunitha dancers play large drums while they dance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Yakshagana is a night-long stage art of coastal Karnataka that mixes dance, music and speech. Dollu Kunitha is a drum dance of men who hang big drums from their shoulders and dance in fast circles.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Yakshagana</td><td>Night-long stage art of coastal Karnataka</td></tr><tr><td>Dollu Kunitha</td><td>Drum dance</td></tr><tr><td>Veeragase</td><td>Dance of the Veerashaiva community</td></tr><tr><td>Bhootha Aradhane</td><td>Spirit worship of the coast</td></tr><tr><td>Nagamandala</td><td>Snake worship ritual of the coast</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse Yakshagana of Karnataka with Kathakali of Kerala, since both use huge crowns and bright makeup.</div>
      <div class="cp-note exam">Yakshagana comes from the Udupi and Dakshina Kannada areas.</div>
      <div class="cp-note tip">Other dances on the list for this state: Bolak, Karga and Kamsale.</div>
    `
  },
  33: {
    questext: "Yakshagana is a traditional stage art of which state?",
    options: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
    correct: "3",
    exptext: "✅ Yakshagana belongs to Karnataka. 📌 Think \"Yaksha\" and the coast of Karnataka. ❌ Kerala is tempting because Kathakali looks similar, but Yakshagana is Kannada."
  },
  34: {
    questext: "Dollu Kunitha is a dance of which state?",
    options: ["Goa", "Maharashtra", "Kerala", "Karnataka"],
    correct: "4",
    exptext: "✅ Dollu Kunitha is a drum dance of Karnataka. 📌 \"Dollu\" means drum. ❌ Maharashtra is tempting because it has drum dances too, but this one is Kannada."
  },
  35: {
    type: "concept", icon: "🌴", accent: "#10b981", pauseTimer: true,
    title: "Kerala",
    html: `
      <p class="cp-lead">Kerala has <u>temple arts and ritual dances</u> in which stories, makeup and drums make a complete show.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/27.png" alt="Theyyam ritual dance Kerala Kannur photo" data-caption="A Theyyam performer wears a huge red costume in a North Kerala shrine." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/28.png" alt="Ottan Thullal Kerala performance photo" data-caption="An Ottan Thullal performer tells a satirical story through dance and speech." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Theyyam is a ritual dance of North Kerala in which the dancer becomes a god. Ottan Thullal was created by the poet Kunchan Nambiar, and it is a satirical solo dance with funny verses.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Theyyam</td><td>Ritual dance of North Kerala</td></tr><tr><td>Ottam Thullal</td><td>Satirical solo by Kunchan Nambiar</td></tr><tr><td>Thiruvathirakali</td><td>Group dance of women</td></tr><tr><td>Kolkali</td><td>Stick dance of Kerala</td></tr><tr><td>Chakyar Koothu</td><td>Storytelling art of the Chakyar people</td></tr></tbody></table>
      <div class="cp-note trap">Kathakali is a classical dance, while Theyyam and Thullal are folk or ritual arts.</div>
      <div class="cp-note exam">Kunchan Nambiar is known as the founder of Thullal and is called the poet of the common man.</div>
      <div class="cp-note tip">Other dances on the list for this state: Kaniyattam, Thappukali, Kaliyattam and Kooravarkali.</div>
    `
  },
  36: {
    questext: "Ottan Thullal was created by which poet?",
    options: ["Ezhuthachan", "Kunchan Nambiar", "Vallathol", "Swathi Thirunal"],
    correct: "2",
    exptext: "✅ Kunchan Nambiar created Thullal. 📌 Thullal is humorous and simple, like the common man. ❌ Vallathol is tempting because he helped Kathakali grow."
  },
  37: {
    questext: "Theyyam is a ritual dance mainly performed in which part of Kerala?",
    options: ["South Kerala", "Idukki", "Alappuzha", "North Kerala"],
    correct: "4",
    exptext: "✅ Theyyam is performed mainly in North Kerala. 📌 It is a dance in which the dancer becomes a god. ❌ Alappuzha is tempting because it has boat races and festivals, but Theyyam is northern."
  },
  38: {
    type: "concept", icon: "🌽", accent: "#eab308", pauseTimer: true,
    title: "Madhya Pradesh",
    html: `
      <p class="cp-lead">Madhya Pradesh is called the heart of India, and its dances are <u>shaped by tribes such as the Bhil and the Gond</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/29.png" alt="Bhagoria festival Bhil dance Madhya Pradesh photo" data-caption="Bhil villagers dance at the Bhagoria festival with drums." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/30.png" alt="Matki dance Malwa women photo" data-caption="Women of Malwa dance with earthen pots on their heads." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Bhagoria is a festival dance of the Bhil tribe, where young people meet at a fair and may choose a partner. Matki is a dance of Malwa in which women balance earthen pots on their heads. Maach is a folk theatre of the Malwa region.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Bhagoria</td><td>Festival dance of the Bhil tribe</td></tr><tr><td>Matki</td><td>Women dance with earthen pots</td></tr><tr><td>Maach</td><td>Folk theatre of Malwa</td></tr><tr><td>Jawara</td><td>Harvest dance</td></tr><tr><td>Khada Naach</td><td>Dance of Bundelkhand</td></tr></tbody></table>
      <div class="cp-note trap">Matki is a dance of the Malwa region, while Ghoomar is a dance of Rajasthan. Both use graceful turns.</div>
      <div class="cp-note exam">Maach is a folk theatre from the Malwa area of Madhya Pradesh.</div>
      <div class="cp-note tip">Other dances on the list for this state: Phulpati, Saila, Kaksar, Tertali and Ada.</div>
    `
  },
  39: {
    questext: "Maach is a folk theatre of which region of Madhya Pradesh?",
    options: ["Bundelkhand", "Malwa", "Baghelkhand", "Nimar"],
    correct: "2",
    exptext: "✅ Maach is a folk theatre of Malwa. 📌 Think \"Malwa and Maach\", both start with M. ❌ Bundelkhand is tempting because it has Khada Naach."
  },
  40: {
    questext: "Bhagoria is a festival dance of which tribe?",
    options: ["Gond", "Bhil", "Baiga", "Korku"],
    correct: "2",
    exptext: "✅ Bhagoria is a festival dance of the Bhil tribe. 📌 B for Bhagoria and B for Bhil. ❌ Gond is tempting because it is a larger tribe of the state."
  },
  41: {
    type: "concept", icon: "🎶", accent: "#0ea5e9", pauseTimer: true,
    title: "Maharashtra",
    html: `
      <p class="cp-lead">Maharashtra's folk arts are <u>loud, rhythmic and often built around drums, fishing life and heroic songs</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/31.png" alt="Lavani dance Maharashtra nine yard saree photo" data-caption="Lavani dancers in nine-yard sarees move quickly to the beat of the dholki." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/32.png" alt="Koli dance Mumbai fishermen photo" data-caption="Koli fisher folk dance in rows, as if they are rowing boats." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Lavani is a dance with fast steps and strong drum beats, and the dholki drum sets its pace. It is usually performed in the Tamasha theatre. The Koli dance belongs to the fishing community, and the dancers copy the movement of rowing a boat.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Lavani</td><td>Fast dance with dholki, part of Tamasha</td></tr><tr><td>Koli</td><td>Dance of the fishing community</td></tr><tr><td>Dhangari Gaja</td><td>Dance of the shepherd Dhangar community</td></tr><tr><td>Lezim</td><td>Dance with a small instrument called lezim</td></tr><tr><td>Povada</td><td>Songs that praise Shivaji</td></tr></tbody></table>
      <div class="cp-note trap">Lavani is Maharashtrian and Mando is Goan. Both have a graceful, storytelling style.</div>
      <div class="cp-note exam">Tamasha is the folk theatre of Maharashtra, and Lavani is its main dance form.</div>
      <div class="cp-note tip">Other dances on the list for this state: Natak, Mouni, Gafa.</div>
    `
  },
  42: {
    questext: "Which dance is the main part of the Tamasha folk theatre?",
    options: ["Garba", "Lavani", "Bihu", "Ghoomar"],
    correct: "2",
    exptext: "✅ Lavani is the main dance of Tamasha. 📌 Lavani and Maharashtra both have a strong rhythm. ❌ Ghoomar is tempting because it is also graceful, but it belongs to Rajasthan."
  },
  43: {
    questext: "The Koli dance of Maharashtra imitates which activity?",
    options: ["Farming", "Hunting", "Fishing and rowing", "Weaving"],
    correct: "3",
    exptext: "✅ Koli dancers copy the rowing of fishing boats. 📌 Koli means the fishing community. ❌ Farming is tempting because many folk dances celebrate crops, but Koli is a sea dance."
  },
  44: {
    type: "concept", icon: "⚔️", accent: "#d946ef", pauseTimer: true,
    title: "Manipur",
    html: `
      <p class="cp-lead">Manipur is a land of <u>drums, devotion and martial arts</u>, and it gave India the classical Manipuri dance.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/33.png" alt="Pung Cholom drum dance Manipur photo" data-caption="Pung Cholom dancers play drums while leaping and spinning." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/34.png" alt="Thang-ta martial art Manipur photo" data-caption="Thang-ta fighters show the sword and spear art of Manipur." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Lai Haroba is a festival of the Meitei people, in which the gods are welcomed with dances. Khamba Thoibi is a love story from the Moirang area, and it is shown through dance. Thang-ta is a martial art with the sword and the spear.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Lai Haroba</td><td>Festival dance of the Meitei people</td></tr><tr><td>Pung Cholom</td><td>Drum dance</td></tr><tr><td>Thang Ta</td><td>Martial art with sword and spear</td></tr><tr><td>Rasleela</td><td>Krishna dance, base of classical Manipuri</td></tr><tr><td>Khamba Thoibi</td><td>Love story of Moirang</td></tr></tbody></table>
      <div class="cp-note trap">Thang-ta is a martial art, but many exam options list it as a dance.</div>
      <div class="cp-note exam">Pung Cholom was added to the UNESCO intangible heritage list as part of Sankirtana of Manipur.</div>
      <div class="cp-note tip">Other dances on the list for this state: Dol Cholom, Nuao and Jagoi.</div>
    `
  },
  45: {
    questext: "Which martial art with the sword and the spear belongs to Manipur?",
    options: ["Kalaripayattu", "Gatka", "Thang-ta", "Silambam"],
    correct: "3",
    exptext: "✅ Thang-ta is the martial art of Manipur. 📌 Thang means sword and Ta means spear. ❌ Kalaripayattu is tempting, but it is of Kerala."
  },
  46: {
    questext: "Lai Haroba is a festival dance of which people?",
    options: ["Khasi", "Meitei", "Mizo", "Naga"],
    correct: "2",
    exptext: "✅ Lai Haroba is a festival of the Meitei people of Manipur. 📌 Lai means god. ❌ Khasi is tempting because they live in the Northeast, but they are in Meghalaya."
  },
  47: {
    type: "concept", icon: "🥁", accent: "#64748b", pauseTimer: true,
    title: "Meghalaya",
    html: `
      <p class="cp-lead">Meghalaya has <u>three main tribes, the Khasi, the Jaintia and the Garo, and each has its own famous festival dance</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/35.png" alt="Wangala hundred drums festival Garo photo" data-caption="Garo dancers beat long drums during the Wangala festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/36.png" alt="Shad Suk Mynsiem Khasi dance Shillong photo" data-caption="Khasi women in silver crowns dance at Shad Suk Mynsiem." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Wangala is the harvest festival of the Garo people, and it is called the hundred drums festival. Shad Suk Mynsiem of the Khasi is called the dance of the joyful heart. Behdeinkhlam is a Jaintia festival to drive away disease.</p>
      <table><thead><tr><th>Dance</th><th>Tribe</th></tr></thead><tbody><tr><td>Wangala</td><td>Garo</td></tr><tr><td>Shad Suk Mynsiem</td><td>Khasi</td></tr><tr><td>Behdeinkhlam</td><td>Jaintia</td></tr><tr><td>Nongkrem</td><td>Khasi</td></tr></tbody></table>
      <div class="cp-note trap">Wangala is a Garo festival, but Khasi dances are often used as options.</div>
      <div class="cp-note exam">Wangala is held in November to thank the Sun God, called Misi Saljong.</div>
      <div class="cp-note tip">Other dances on the list for this state: Shad Sukra.</div>
    `
  },
  48: {
    questext: "Wangala is the harvest festival of which tribe?",
    options: ["Khasi", "Jaintia", "Garo", "Mizo"],
    correct: "3",
    exptext: "✅ Wangala is the festival of the Garo people. 📌 Hundred drums means Wangala. ❌ Khasi is tempting because they have Shad Suk Mynsiem."
  },
  49: {
    type: "concept", icon: "🎋", accent: "#c026d3", pauseTimer: true,
    title: "Mizoram",
    html: `
      <p class="cp-lead">Mizoram is famous for <u>Cheraw, the bamboo dance</u>, which is a very popular exam topic.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/37.png" alt="Cheraw bamboo dance Mizoram photo" data-caption="Cheraw dancers step between moving bamboo poles in the rhythm of a beat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/38.png" alt="Four boxes joined to a centre label Mizoram: Cheraw, Khuallam, Chailam, Zangtalam." data-caption="Four important dances of Mizoram around one centre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>In Cheraw, dancers tap long bamboo poles on the ground, while others step between the poles. The dancers need to move fast, or the bamboo will strike their feet. Khuallam is a dance to welcome guests.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Cheraw</td><td>Bamboo dance</td></tr><tr><td>Khuallam</td><td>Dance to welcome guests</td></tr><tr><td>Chailam</td><td>Dance of the Mizo people</td></tr><tr><td>Zangtalam</td><td>Dance of the Mizo people</td></tr></tbody></table>
      <div class="cp-note trap">Bamboo dances also exist in Nagaland and Tripura, but Cheraw is the best known one and is linked to Mizoram.</div>
      <div class="cp-note exam">Cheraw is the most important dance of Mizoram.</div>
      <div class="cp-note tip">Other dances on the list for this state: Cheraw, Chhelam, Manch.</div>
    `
  },
  50: {
    questext: "Cheraw, the bamboo dance, belongs to which state?",
    options: ["Assam", "Nagaland", "Tripura", "Mizoram"],
    correct: "4",
    exptext: "✅ Cheraw is the bamboo dance of Mizoram. 📌 Think of dancers stepping between bamboo poles. ❌ Nagaland is tempting because it also has bamboo dances."
  },
  51: {
    type: "concept", icon: "🦅", accent: "#fb7185", pauseTimer: true,
    title: "Nagaland",
    html: `
      <p class="cp-lead">Nagaland has many tribes, and <u>each tribe has its own war dance, harvest dance and song</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/39.png" alt="Hornbill Festival Nagaland tribal dance photo" data-caption="Naga warriors in feather headgear dance at the Hornbill Festival in Kohima." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/40.png" alt="Naga tribal war dance Kohima photo" data-caption="Naga men perform a war dance with spears and shields." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Many of the dances are war dances, and the dancers wear feathers, beads and shells. The most famous event is the Hornbill Festival in December at Kisama near Kohima, where many tribes perform together.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Hornbill Festival</td><td>Biggest tribal festival of Nagaland</td></tr><tr><td>Rengma</td><td>Dance of the Rengma Naga</td></tr><tr><td>Zeilang</td><td>Dance of the Zeliang tribe</td></tr><tr><td>Alooyattu</td><td>Dance of the Konyak tribe</td></tr></tbody></table>
      <div class="cp-note trap">The Hornbill Festival is in Nagaland, but the Wangala festival is in Meghalaya.</div>
      <div class="cp-note exam">The Hornbill Festival is held every year from 1 to 10 December.</div>
      <div class="cp-note tip">Other dances on the list for this state: Changai, Bamboo, Chong.</div>
    `
  },
  52: {
    questext: "The Hornbill Festival is held in which state?",
    options: ["Mizoram", "Manipur", "Nagaland", "Arunachal Pradesh"],
    correct: "3",
    exptext: "✅ The Hornbill Festival is held in Nagaland. 📌 Hornbill is the bird of the Naga people. ❌ Arunachal is tempting because it also has tribal festivals."
  },
  53: {
    type: "concept", icon: "🛕", accent: "#2dd4bf", pauseTimer: true,
    title: "Odisha",
    html: `
      <p class="cp-lead">Odisha is the home of <u>Odissi</u>, one of the eight classical dances, and it also has colourful tribal dances.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/41.png" alt="Gotipua dance Odisha boys photo" data-caption="Gotipua boys, dressed as girls, perform acrobatic dance in Odisha." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/42.png" alt="Mayurbhanj Chhau Odisha photo" data-caption="Mayurbhanj Chhau dancers perform without masks in Odisha." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Gotipua is a dance in which young boys dress as girls and perform, and it is seen as the earlier form of Odissi. Mayurbhanj Chhau is a martial dance performed without masks.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Gotipua</td><td>Boys dressed as girls, early form of Odissi</td></tr><tr><td>Mayurbhanj Chhau</td><td>Martial dance without masks</td></tr><tr><td>Dalkhai</td><td>Women's dance from the Sambalpur region</td></tr><tr><td>Ranappa</td><td>Dance on stilts</td></tr><tr><td>Ghumra</td><td>Drum dance</td></tr></tbody></table>
      <div class="cp-note trap">Odissi is a classical dance, but Gotipua is a folk dance, so check the question.</div>
      <div class="cp-note exam">Odisha was earlier written as Orissa, and the state name was changed to Odisha in 2011.</div>
      <div class="cp-note tip">Other dances on the list for this state: Karma, Bhaga Nacha, Dandari.</div>
    `
  },
  54: {
    questext: "Gotipua is a dance in which dancers are who?",
    options: ["Old women", "Young boys dressed as girls", "Warriors", "Priests"],
    correct: "2",
    exptext: "✅ In Gotipua, young boys dress as girls. 📌 Gotipua is the base of Odissi. ❌ Warriors is tempting because Chhau is martial, but Gotipua is graceful."
  },
  55: {
    questext: "Which Chhau is performed without masks?",
    options: ["Seraikela Chhau", "Purulia Chhau", "Both of these", "Mayurbhanj Chhau"],
    correct: "4",
    exptext: "✅ Mayurbhanj Chhau is performed without masks. 📌 Mayurbhanj means \"face free\". ❌ Purulia is tempting because it is also famous, but it uses large masks."
  },
  56: {
    type: "concept", icon: "🏜️", accent: "#f43f5e", pauseTimer: true,
    title: "Rajasthan",
    html: `
      <p class="cp-lead">Rajasthan is the land of <u>Ghoomar, Kalbeliya and Terah Taali</u>, which are some of India's best known folk dances.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/43.png" alt="Ghoomar dance Rajasthan women photo" data-caption="Women in long skirts spin in a circle while performing Ghoomar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/44.png" alt="Kalbeliya dance Rajasthan Pushkar photo" data-caption="A Kalbeliya dancer in black dress moves like a snake." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Ghoomar is a graceful dance of women, who spin in long skirts, and it is danced at festivals such as Gangaur. Kalbeliya is a dance of the snake-charmer community, and the dancer moves like a snake. It was added to the UNESCO list in 2010.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Ghoomar</td><td>Graceful dance of women</td></tr><tr><td>Kalbeliya</td><td>Snake dance of the Kalbeliya community</td></tr><tr><td>Terah Taali</td><td>Dance with thirteen cymbals</td></tr><tr><td>Chari</td><td>Dance with brass pots on the head</td></tr><tr><td>Gangaur</td><td>Festival of Goddess Gauri</td></tr></tbody></table>
      <div class="cp-note trap">Ghoomar is Rajasthani and Matki is from Madhya Pradesh, but both use balance and turns.</div>
      <div class="cp-note exam">Terah Taali is performed by the Kamad community, who sit and strike cymbals tied to their body in honour of Baba Ramdevji.</div>
      <div class="cp-note tip">Other dances on the list for this state: Suisini.</div>
    `
  },
  57: {
    questext: "Kalbeliya is a dance of which community of Rajasthan?",
    options: ["Snake charmers", "Farmers", "Fishermen", "Weavers"],
    correct: "1",
    exptext: "✅ Kalbeliya is the dance of the snake charmers. 📌 The dancer moves like a snake. ❌ Farmers is tempting because many folk dances are of farmers, but Kalbeliya is not."
  },
  58: {
    questext: "Terah Taali is performed with what?",
    options: ["Thirteen cymbals", "Two sticks", "A sword", "Masks"],
    correct: "1",
    exptext: "✅ Terah Taali is performed with thirteen cymbals. 📌 Terah means thirteen. ❌ Two sticks is tempting because of Dandiya, but that is from Gujarat."
  },
  59: {
    type: "concept", icon: "🐉", accent: "#7c3aed", pauseTimer: true,
    title: "Sikkim",
    html: `
      <p class="cp-lead">Sikkim's dances show <u>Buddhist, Lepcha and Nepali traditions</u> in the shadow of Kanchenjunga.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/45.png" alt="Singhi Chham snow lion dance Sikkim photo" data-caption="Dancers in snow lion costumes perform Singhi Chham in Sikkim." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/46.png" alt="Kagyed Chham Sikkim monastery photo" data-caption="Monks in colourful masks perform Kagyed Chham in a Sikkim monastery." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Singhi Chham is the snow lion dance, which honours Mount Kanchenjunga. Kagyed Chham is a monastery dance performed before the new year to drive away evil. Maruni is a dance of the Nepali community.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Singhi Chham</td><td>Snow lion dance</td></tr><tr><td>Kagyed</td><td>Monastery masked dance</td></tr><tr><td>Maruni</td><td>Dance of the Nepali community</td></tr><tr><td>Chu Faat</td><td>Lepcha dance to honour Kanchenjunga</td></tr></tbody></table>
      <div class="cp-note trap">Singhi Chham is a snow lion dance, while Lion and Peacock belongs to Arunachal.</div>
      <div class="cp-note exam">The snow lion is the symbol of Sikkim.</div>
      <div class="cp-note tip">Other dances on the list for this state: Sikmari, Ghantu, Yakcham Zenzang, Zomal Lok.</div>
    `
  },
  60: {
    questext: "Singhi Chham is which dance of Sikkim?",
    options: ["Snow lion dance", "Bamboo dance", "Stick dance", "Pot dance"],
    correct: "1",
    exptext: "✅ Singhi Chham is the snow lion dance. 📌 Singhi means snow lion. ❌ Bamboo dance is tempting, but it is of Mizoram."
  },
  61: {
    type: "concept", icon: "🕉️", accent: "#0d9488", pauseTimer: true,
    title: "Tamil Nadu",
    html: `
      <p class="cp-lead">Tamil Nadu is the home of <u>Bharatanatyam</u> and of many strong folk dances for gods and heroes.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/47.png" alt="Kavadi Attam Tamil Nadu Murugan photo" data-caption="Devotees dance with decorated Kavadi in honour of Lord Murugan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/48.png" alt="Silambattam Tamil Nadu stick martial art photo" data-caption="Men practise Silambattam, a stick fighting art of Tamil Nadu." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Kavadi is danced by devotees of Lord Murugan, who carry a decorated wooden frame. Silambattam is a stick fighting art. Oyilattam means dance of beauty, and Kummi is a dance of women who clap their hands.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Kavadi</td><td>Devotion to Lord Murugan</td></tr><tr><td>Silambattam</td><td>Stick fighting dance</td></tr><tr><td>Oyilattam</td><td>Dance of beauty</td></tr><tr><td>Kummi</td><td>Women clap in a circle</td></tr><tr><td>Kudirai Attam</td><td>Horse dance</td></tr></tbody></table>
      <div class="cp-note trap">Kavadi is a Tamil Nadu dance for Murugan, but Lai Haroba is Manipur and Garba is Gujarat.</div>
      <div class="cp-note exam">Bharatanatyam is the classical dance of Tamil Nadu.</div>
      <div class="cp-note tip">Other dances on the list for this state: Kolattam, Devarattam.</div>
    `
  },
  62: {
    questext: "Kavadi Attam is danced in honour of which god?",
    options: ["Lord Murugan", "Lord Shiva", "Lord Ganesha", "Lord Vishnu"],
    correct: "1",
    exptext: "✅ Kavadi is danced for Lord Murugan. 📌 Kavadi means burden carried on shoulders. ❌ Lord Shiva is tempting because Murugan is Shiva's son."
  },
  63: {
    type: "concept", icon: "🔱", accent: "#ea580c", pauseTimer: true,
    title: "Telangana",
    html: `
      <p class="cp-lead">Telangana's best known festival dance is <u>Bonalu</u>, which honours Goddess Mahakali.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/49.png" alt="Bonalu festival Hyderabad women photo" data-caption="Women carry decorated Bonalu pots to honour the goddess in Telangana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/50.png" alt="Gusadi dance Gond tribe Telangana photo" data-caption="Gusadi dancers of the Gond tribe wear feathered headgear." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>During Bonalu, women carry pots of food on their heads as an offering to the goddess. Gusadi is a dance of the Gond tribe, and it is performed at Diwali time.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Bonalu</td><td>Festival of Goddess Mahakali</td></tr><tr><td>Gusadi</td><td>Gond tribal dance</td></tr><tr><td>Lambadi</td><td>Dance of the Banjara women</td></tr><tr><td>Mathuri</td><td>Tribal dance</td></tr></tbody></table>
      <div class="cp-note trap">Lambadi is danced by the Banjara women in both Telangana and Andhra Pradesh.</div>
      <div class="cp-note exam">Bonalu is the state festival of Telangana.</div>
      <div class="cp-note tip">Other dances on the list for this state: Ghimsa.</div>
    `
  },
  64: {
    questext: "Bonalu is a festival of which state?",
    options: ["Telangana", "Kerala", "Karnataka", "Odisha"],
    correct: "1",
    exptext: "✅ Bonalu is the festival of Telangana. 📌 Women carry pots for the goddess. ❌ Karnataka is tempting because it also has goddess festivals."
  },
  65: {
    type: "concept", icon: "🎍", accent: "#65a30d", pauseTimer: true,
    title: "Tripura",
    html: `
      <p class="cp-lead">Tripura's dances are <u>linked to the Reang, Tripuri and Chakma people and to their seasonal festivals</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/51.png" alt="Hojagiri dance Tripura Reang girls photo" data-caption="Reang girls balance on a pot while performing Hojagiri." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/52.png" alt="Bizhu Chakma festival dance Tripura photo" data-caption="Chakma dancers celebrate the new year at the Bizhu festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Hojagiri is a dance of the Reang people, in which girls balance bottles or lamps on their heads and move their lower body while standing on an earthen pot. Garia is a dance for the Garia festival in April.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Hojagiri</td><td>Reang girls on a pot</td></tr><tr><td>Garia</td><td>Festival dance of April</td></tr><tr><td>Bijhu</td><td>Chakma new year dance</td></tr><tr><td>Lebang</td><td>Tripuri dance</td></tr></tbody></table>
      <div class="cp-note trap">Hojagiri is of Tripura, but Cheraw is the bamboo dance of Mizoram.</div>
      <div class="cp-note exam">Hojagiri is the best known dance of Tripura.</div>
      <div class="cp-note tip">Other dances on the list for this state: Hai Hak, Mimata.</div>
    `
  },
  66: {
    questext: "Hojagiri is a dance of which state?",
    options: ["Mizoram", "Tripura", "Assam", "Manipur"],
    correct: "2",
    exptext: "✅ Hojagiri is a dance of the Reang people of Tripura. 📌 Girls balance on a pot. ❌ Mizoram is tempting because the Reang people also live there."
  },
  67: {
    type: "concept", icon: "🎪", accent: "#be123c", pauseTimer: true,
    title: "Uttar Pradesh",
    html: `
      <p class="cp-lead">Uttar Pradesh is the home of <u>Kathak</u>, and its folk arts are tied to Krishna, Rama and the rainy season.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/53.png" alt="Raslila Vrindavan Mathura photo" data-caption="Raslila dancers act out the stories of Lord Krishna in Braj." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/54.png" alt="Ramnagar Ramlila Varanasi photo" data-caption="The Ramnagar Ramlila is played over many days near Varanasi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Raslila is a Krishna dance of the Braj area. Charkula is a dance of women who balance a heavy wooden wheel with many lamps on their heads. Nautanki is a famous folk theatre, and Kanpur and Hathras are its centres.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Raslila</td><td>Krishna dance of Braj</td></tr><tr><td>Charkula</td><td>Women balance a wheel with lamps</td></tr><tr><td>Nautanki</td><td>Folk theatre</td></tr><tr><td>Ramlila</td><td>Play of the story of Rama</td></tr><tr><td>Kajri</td><td>Monsoon song and dance</td></tr></tbody></table>
      <div class="cp-note trap">Ramlila is a play and not a dance, and it is told through speech and song.</div>
      <div class="cp-note exam">Ramlila was added to the UNESCO list in 2008, and Charkula is a dance of the Braj area.</div>
      <div class="cp-note tip">Other dances on the list for this state: Dadra, Khyal.</div>
    `
  },
  68: {
    questext: "Charkula is a dance of which region?",
    options: ["Braj", "Malwa", "Bastar", "Bundelkhand"],
    correct: "1",
    exptext: "✅ Charkula is a dance of the Braj region of Uttar Pradesh. 📌 Women balance a wheel of lamps. ❌ Malwa is tempting because of Matki, which also balances pots."
  },
  69: {
    type: "concept", icon: "🏞️", accent: "#1d4ed8", pauseTimer: true,
    title: "Uttarakhand",
    html: `
      <p class="cp-lead">Uttarakhand's dances are <u>danced in the hills in lines, in circles and with swords</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/55.png" alt="Chholiya sword dance Kumaon photo" data-caption="Chholiya dancers hold swords and shields in the Kumaon hills." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/56.png" alt="Jhora dance Kumaon circle photo" data-caption="Villagers in Kumaon dance Jhora hand in hand in a circle." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Chholiya is a sword dance of Kumaon, performed at weddings by men with swords and shields. Jhora is danced by men and women in a circle. Chhapeli is a dance of couples.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Chholiya</td><td>Sword dance of Kumaon</td></tr><tr><td>Jhora</td><td>Circle dance of men and women</td></tr><tr><td>Chhapeli</td><td>Dance of couples</td></tr><tr><td>Thadya</td><td>Dance of Garhwal</td></tr></tbody></table>
      <div class="cp-note trap">Jhora is seen in Kumaon, but Nati is Himachali.</div>
      <div class="cp-note exam">Chholiya is a warrior dance of Kumaon, performed at weddings.</div>
      <div class="cp-note tip">Other dances on the list for this state: Tandi, Thandiya, Chamchari.</div>
    `
  },
  70: {
    questext: "Chholiya is a sword dance of which region?",
    options: ["Kumaon", "Garhwal", "Braj", "Malwa"],
    correct: "1",
    exptext: "✅ Chholiya is a sword dance of Kumaon. 📌 It is performed at weddings. ❌ Garhwal is tempting because it is the other part of Uttarakhand."
  },
  71: {
    type: "concept", icon: "🎭", accent: "#9333ea", pauseTimer: true,
    title: "West Bengal",
    html: `
      <p class="cp-lead">West Bengal has <u>Purulia Chhau, Baul and Gambhira</u>, which are some of its best known arts.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/57.png" alt="Purulia Chhau masks West Bengal photo" data-caption="Purulia Chhau dancers wear large painted masks in West Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Folk_Dances_of_India/58.png" alt="Baul singers West Bengal photo" data-caption="Baul singers play the ektara and dance in West Bengal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Purulia Chhau is a martial dance in which dancers wear large masks. Baul is a tradition of wandering singers who play the ektara, and it was added to the UNESCO list in 2005. Gambhira is a dance of Malda linked to Lord Shiva.</p>
      <table><thead><tr><th>Dance</th><th>What to remember</th></tr></thead><tbody><tr><td>Purulia Chhau</td><td>Martial dance with large masks</td></tr><tr><td>Baul</td><td>Wandering singers</td></tr><tr><td>Gambhira</td><td>Malda dance for Lord Shiva</td></tr><tr><td>Gajan</td><td>Festival for Lord Shiva</td></tr></tbody></table>
      <div class="cp-note trap">Purulia Chhau uses masks, but Mayurbhanj Chhau does not.</div>
      <div class="cp-note exam">Baul was recognised by UNESCO in 2005, and Chhau in 2010.</div>
      <div class="cp-note tip">Other dances on the list for this state: Bhadu, Ranpa, Tusu.</div>
    `
  },
  72: {
    questext: "Purulia Chhau belongs to which state?",
    options: ["Odisha", "West Bengal", "Jharkhand", "Bihar"],
    correct: "2",
    exptext: "✅ Purulia Chhau belongs to West Bengal. 📌 Purulia is a district of West Bengal. ❌ Jharkhand is tempting because Seraikela Chhau is there."
  },
  73: {
    questext: "Consider the following statements about Baul:\n1. Baul singers play the ektara.\n2. Baul belongs to Rajasthan.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Baul is of Bengal. ❌ Statement 2 is wrong because Baul is not Rajasthani."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a graceful silhouette of an Indian folk dancer in a swirling skirt, a few traditional drums and a subtle map outline of India" },
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian folk dance group performance colourful costumes photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/1.png. a group of village dancers in bright traditional costumes",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/2.png": { t: "fig", about: "Two columns: Folk dance (local people, festivals, simple steps, no strict rules) and Classical dance (trained dancers, temples and courts, fixed grammar, Natya Shastra)." },
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Burrakatha folk performance Andhra Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/3.png. a Burrakatha storytelling troupe with drums",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Veeranatyam dance Andhra Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/4.png. Veeranatyam dancers in costume",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Yak Chham mask dance Arunachal Pradesh Monpa photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/5.png. Monpa dancers in yak masks",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bardo Chham Sherdukpen mask dance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/6.png. Sherdukpen Bardo Chham dancers in masks",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bihu dance Assam Rongali Bihu photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/7.png. Bihu dancers in red and white dress",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bagurumba Bodo dance Assam photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/8.png. Bodo women performing Bagurumba",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jat Jatin dance Bihar Mithila photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/9.png. a Jat and Jatin couple dancing",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bidesia Bhikhari Thakur folk theatre photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/10.png. a Bidesia theatre performance",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Panthi dance Chhattisgarh Satnami photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/11.png. Satnami men performing Panthi dance",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gaur Maria dance Bastar bison horn headgear photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/12.png. Bastar dancers wearing bison horn headgear",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Goa Fugdi dance women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/13.png. Goan women performing Fugdi",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Goa Ghode Modni Shigmo festival photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/14.png. Ghode Modni dancers at Shigmo",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Garba dance Navratri Gujarat women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/15.png. women performing Garba in a circle",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dandiya Raas Gujarat sticks dance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/16.png. dancers with decorated sticks",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Haryanvi Phag dance women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/17.png. Haryanvi women performing a folk dance",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/18.png": { t: "fig", about: "Four boxes joined to a centre label Haryana: Phag, Loor, Gugga, Daph." },
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kullu Nati dance Himachal Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/19.png. dancers in Kullu Nati",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chham mask dance Himachal monastery photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/20.png. lamas performing Chham",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rouf dance Kashmir women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/21.png. Kashmiri women performing Rouf",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhand Pather Kashmir folk theatre photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/22.png. a Bhand Pather performance",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Karam dance Jharkhand tribal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/23.png. tribal people performing Karam dance",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Seraikela Chhau mask dance Jharkhand photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/24.png. Chhau dancers in masks",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Yakshagana performance Karnataka photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/25.png. Yakshagana actors in large headgear",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dollu Kunitha drum dance Karnataka photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/26.png. Dollu Kunitha dancers with drums",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Theyyam ritual dance Kerala Kannur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/27.png. Theyyam performer in red costume",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ottan Thullal Kerala performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/28.png. an Ottan Thullal performer",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhagoria festival Bhil dance Madhya Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/29.png. Bhil people dancing at Bhagoria",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Matki dance Malwa women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/30.png. women dancing with earthen pots",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lavani dance Maharashtra nine yard saree photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/31.png. Lavani dancers in nine yard sarees",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Koli dance Mumbai fishermen photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/32.png. Koli fisher folk dancing",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pung Cholom drum dance Manipur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/33.png. dancers playing pung drums",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Thang-ta martial art Manipur photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/34.png. Thang-ta fighters with sword and spear",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Wangala hundred drums festival Garo photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/35.png. Garo dancers with long drums",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shad Suk Mynsiem Khasi dance Shillong photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/36.png. Khasi dancers in traditional dress",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cheraw bamboo dance Mizoram photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/37.png. Cheraw dancers stepping between bamboo",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/38.png": { t: "fig", about: "Four boxes joined to a centre label Mizoram: Cheraw, Khuallam, Chailam, Zangtalam." },
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hornbill Festival Nagaland tribal dance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/39.png. Naga dancers in tribal dress",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Naga tribal war dance Kohima photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/40.png. Naga men in a war dance",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gotipua dance Odisha boys photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/41.png. Gotipua boys dressed as girls",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mayurbhanj Chhau Odisha photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/42.png. Chhau dancers without masks",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ghoomar dance Rajasthan women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/43.png. women spinning in Ghoomar",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kalbeliya dance Rajasthan Pushkar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/44.png. a Kalbeliya dancer in black dress",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/45.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Singhi Chham snow lion dance Sikkim photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/45.png. snow lion dancers",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kagyed Chham Sikkim monastery photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/46.png. Kagyed Chham in a monastery",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/47.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kavadi Attam Tamil Nadu Murugan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/47.png. devotees carrying Kavadi",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/48.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Silambattam Tamil Nadu stick martial art photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/48.png. men with long sticks",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/49.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bonalu festival Hyderabad women photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/49.png. women carrying Bonalu pots",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/50.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gusadi dance Gond tribe Telangana photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/50.png. Gusadi dancers with feathers",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/51.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hojagiri dance Tripura Reang girls photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/51.png. Reang girls in Hojagiri",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/52.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bizhu Chakma festival dance Tripura photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/52.png. Chakma dancers at Bizhu",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/53.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Raslila Vrindavan Mathura photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/53.png. Raslila dancers",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/54.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ramnagar Ramlila Varanasi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/54.png. a Ramlila stage show",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/55.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chholiya sword dance Kumaon photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/55.png. Chholiya dancers with swords",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/56.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jhora dance Kumaon circle photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/56.png. Kumaoni villagers in Jhora",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/57.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Purulia Chhau masks West Bengal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/57.png. Purulia Chhau dancers",
  "images/General_Awareness/Static_GK/Folk_Dances_of_India/58.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Baul singers West Bengal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Folk_Dances_of_India/58.png. Baul singers with ektara"
});

/* CHANGE LOG
   - Odisha is written with its current name (the map says Orissa).
   - Tripura is written with the correct spelling (the map says Tipura).
   - Yakshagana is written with the correct spelling (the map says Yakshgana).
   - Ali Aye Ligang is written with the correct spelling (the map says Ali Al Ligang).
   - Thiruvathirakali, Kolkali and Dumhal use the standard spellings, and Lion and Peacock is written in words.
*/