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

/* Field: General_Awareness · Subject: Static_GK · Chapter: Gharanas_of_Indian_Music · 18 concept pages (+ overview) · 25 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Gharanas of Indian Music",
    thumb: {
      image: "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/thumbnail.png",
      banner: "STATIC GK 2026",
      line1: "GHARANAS",
      line2: "OF INDIAN MUSIC",
      line3: "FOUNDERS AND STARS",
      badge: "FULL CLASS",
      ribbon: "FOUNDERS • FEATURES • SINGERS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Gharanas of Indian Music | Founder Tricks | Static GK",
      altTitles: ["All Hindustani Gharanas in One Class", "Gharana and Musician Match Trick"],
      description: "Gharana questions are sure marks in Static GK. In this class we learn the founder, speciality and famous musicians of each gharana, with the traps exams use.\n\n📌 IN THIS CLASS\n✅ Singing, tabla and Kathak gharanas\n✅ Founders and special features\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Basic idea\n\n👍 Like, share, subscribe.\n\n#SSCCGL #StaticGK #Gharana",
      tags: ["gharanas of india", "indian music gharanas", "hindustani gharanas", "gharana founder", "static gk", "ssc cgl static gk", "gwalior gharana", "kirana gharana", "patiala gharana", "agra gharana", "maihar gharana", "jaipur atrauli", "kathak gharanas", "tabla gharanas", "art and culture", "gk for competitive exams", "railway exam gk", "banking exam gk", "defence exam gk", "music gk", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "Static_GK tricks"],
      hashtags: ["SSCCGL", "StaticGK", "Gharana"],
      thumbText: "GHARANAS OF INDIA",
      pinnedComment: "📌 Which dance did you find hardest? Write the dance and state below 👇",
      communityPost: "🏛️ New class is live: Gharanas of Indian Music. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Basic idea",
      playlist: "Static GK — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple class on the gharanas of Indian music</u>. Exams ask who founded each gharana, what it is known for, and which famous musician belongs to which gharana.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>18</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>25</b><span>Questions</span></div>
        <div class="cp-stat"><b>~61 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Basic Idea</b><br>What a gharana is, and which gharanas belong to singing, tabla and Kathak.</li>
        <li><b>Singing Gharanas</b><br>Dagar, Gwalior, Kirana, Patiala, Mewati, Indore, Jaipur Atrauli, Rampur Sahaswan, Bhendi Bazar, Agra, Darbhanga and Dumraon, with founders and famous singers.</li>
        <li><b>Instrument and Dance Gharanas</b><br>Maihar for the sitar and sarod, Punjab, Delhi and Benaras for tabla, and the four Kathak gharanas.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Gharana questions in Static General Knowledge ask for founder, famous feature and famous musician, and these are easy marks once the pairs are learnt.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#4f46e5", pauseTimer: true,
    title: "Gharana — The Basic Idea",
    html: `
      <p class="cp-lead">A gharana is a <u>musical family or school whose style of singing or playing is passed from teacher to student</u> over many generations.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/1.png" alt="A tree: a founder at the top, then teacher to student arrows down to three generations, la" data-caption="A gharana is a line of teachers and students who share one style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/2.png" alt="Guru shishya parampara Indian classical music lesson photo" data-caption="A teacher passes a style to a student in the traditional guru and student way." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The word gharana comes from the Hindi word ghar, which means house or family. Each gharana is known for its own way of using the voice, ornaments and rhythm, and it is named after the place where it grew. Gharanas exist in singing, in instruments such as the tabla and in dance such as Kathak.</p>
      <table><thead><tr><th>Field</th><th>Gharanas</th></tr></thead><tbody><tr><td>Khayal singing</td><td>Gwalior, Agra, Kirana, Patiala, Jaipur Atrauli, Mewati, Indore</td></tr><tr><td>Dhrupad singing</td><td>Dagar, Darbhanga</td></tr><tr><td>Tabla</td><td>Delhi, Benaras, Punjab</td></tr><tr><td>Kathak</td><td>Lucknow, Jaipur, Raigarh, Benaras</td></tr><tr><td>Sitar and sarod</td><td>Maihar</td></tr></tbody></table>
      <div class="cp-note trap">A gharana is a style of a family, not a place of study. Two gharanas can teach the same raga in different ways.</div>
      <div class="cp-note exam">The Gwalior Gharana is the oldest Khayal gharana, and Kirana, Patiala and Agra are among the most asked.</div>
      <div class="cp-mnemonic">Think of a gharana as a family recipe: the same dish, but each family cooks it in its own way.</div>
    `
  },
  3: {
    questext: "The word gharana comes from which Hindi word?",
    options: ["Gaana", "Ghar", "Ghat", "Gharat"],
    correct: "2",
    exptext: "✅ Gharana comes from ghar, which means house or family. 📌 A gharana is a musical family. ❌ Gaana is tempting because it means singing, but the word comes from ghar."
  },
  4: {
    questext: "Which is the oldest gharana of Khayal singing?",
    options: ["Kirana", "Gwalior", "Agra", "Patiala"],
    correct: "2",
    exptext: "✅ The Gwalior Gharana is the oldest Khayal gharana. 📌 Gwalior is first, since it began in the time of Akbar. ❌ Agra is tempting because it is also old, but Gwalior is the earliest."
  },
  5: {
    type: "concept", icon: "🎶", accent: "#22c55e", pauseTimer: true,
    title: "Dagar Gharana",
    html: `
      <p class="cp-lead">The Dagar Gharana is <u>famous for Dhrupad, the oldest and most serious style of Hindustani singing</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/3.png" alt="Gundecha Brothers Dhrupad performance photo" data-caption="The Gundecha Brothers sing Dhrupad together in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/4.png" alt="Zia Mohiuddin Dagar Rudra Veena photo" data-caption="Ustad Zia Mohiuddin Dagar plays the Rudra Veena in the Dagar style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Dhrupad is a slow and deep style that has long, calm alap and uses a drum called the pakhawaj. The Dagar family has sung Dhrupad for many generations. Ustad Zia Mohiuddin Dagar made the Rudra Veena famous.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Famous for</td><td>Dhrupad</td></tr><tr><td>Famous musicians</td><td>Gundecha Brothers, Zia Mohiuddin Dagar</td></tr></tbody></table>
      <div class="cp-note trap">Dhrupad is older than Khayal. Questions use this to separate the Dagar Gharana from Khayal gharanas.</div>
      <div class="cp-note exam">Dagar Gharana equals Dhrupad, and the Gundecha Brothers are its modern face.</div>
    `
  },
  6: {
    questext: "The Dagar Gharana is famous for which style?",
    options: ["Dhrupad", "Khayal", "Thumri", "Tappa"],
    correct: "1",
    exptext: "✅ The Dagar Gharana is famous for Dhrupad. 📌 D for Dagar and D for Dhrupad. ❌ Khayal is tempting because most gharanas sing it, but the Dagar family sings Dhrupad."
  },
  7: {
    type: "concept", icon: "💃", accent: "#f59e0b", pauseTimer: true,
    title: "Kathak Gharanas",
    html: `
      <p class="cp-lead">Kathak, the classical dance of North India, has <u>four famous gharanas: Lucknow, Jaipur, Raigarh and Benaras</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/5.png" alt="Birju Maharaj Kathak Lucknow Gharana photo" data-caption="Pandit Birju Maharaj performs Kathak in the Lucknow style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/6.png" alt="Jaipur Gharana Kathak dance photo" data-caption="Kathak dancers perform fast footwork in the Jaipur style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Lucknow Gharana was founded by Ishwari Prasad and is known for grace and expression. Its famous artists are Birju Maharaj, Shambhu Maharaj, Lachhu Maharaj, Kalika Prasad and Manjari Chaturvedi. The Jaipur Gharana was founded by Bhanu Prasad Maharaj and is known for fast footwork.</p>
      <table><thead><tr><th>Gharana</th><th>Founder</th><th>Known for</th></tr></thead><tbody><tr><td>Lucknow</td><td>Ishwari Prasad</td><td>Grace and expression</td></tr><tr><td>Jaipur</td><td>Bhanu Prasad Maharaj</td><td>Fast footwork</td></tr><tr><td>Raigarh</td><td>Linked with the court of Raigarh</td><td>Rhythm and drum play</td></tr><tr><td>Benaras</td><td>Janaki Prasad</td><td>Kathak of Benaras</td></tr></tbody></table>
      <div class="cp-note trap">Lucknow style is soft and expressive, and Jaipur style is fast and rhythmic. Do not swap the two.</div>
      <div class="cp-note exam">Birju Maharaj belongs to the Lucknow Gharana, and Ishwari Prasad is its founder.</div>
    `
  },
  8: {
    questext: "Who is the founder of the Lucknow Gharana of Kathak?",
    options: ["Ishwari Prasad", "Janaki Prasad", "Birju Maharaj", "Bhanu Prasad Maharaj"],
    correct: "1",
    exptext: "✅ Ishwari Prasad founded the Lucknow Gharana. 📌 I for Ishwari and I for Initial. ❌ Birju Maharaj is tempting because he is the most famous Lucknow artist, but he was not the founder."
  },
  9: {
    questext: "Birju Maharaj belongs to which Kathak gharana?",
    options: ["Lucknow", "Raigarh", "Jaipur", "Benaras"],
    correct: "1",
    exptext: "✅ Birju Maharaj belonged to the Lucknow Gharana. 📌 Lucknow means grace, and Maharaj means master. ❌ Jaipur is tempting because it is also famous, but it was founded by Bhanu Prasad Maharaj."
  },
  10: {
    type: "concept", icon: "🏰", accent: "#ef4444", pauseTimer: true,
    title: "Gwalior Gharana",
    html: `
      <p class="cp-lead">The Gwalior Gharana is the <u>oldest gharana of Khayal singing</u>, and it began in the time of the Mughal emperor Akbar.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/7.png" alt="Gwalior Fort Madhya Pradesh photo" data-caption="Gwalior Fort stands in the city that gave its name to the oldest Khayal gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/8.png" alt="Vishnu Digambar Paluskar photo" data-caption="Vishnu Digambar Paluskar was a great singer of the Gwalior Gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The founders are Ustad Hassu Khan, Ustad Haddu Khan, Ustad Nathoo Khan and Nathan Pir Baksh. Its musicians include Raja Bhaiya Poonchwale, Krishnarao Shankar Pandit, Omkarnath Thakur, Veena Sahasrabuddhe, Vishnu Digambar Paluskar and Bade Mohammad Khan.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Rank</td><td>Oldest gharana of Khayal</td></tr><tr><td>Began in</td><td>Reign of Akbar</td></tr><tr><td>Founders</td><td>Hassu Khan, Haddu Khan, Nathoo Khan, Nathan Pir Baksh</td></tr><tr><td>Famous singers</td><td>Omkarnath Thakur, Vishnu Digambar Paluskar</td></tr></tbody></table>
      <div class="cp-note trap">Gwalior and Gwalior Fort are linked, but the gharana is the oldest for Khayal, not for Dhrupad.</div>
      <div class="cp-note exam">Gwalior equals the oldest Khayal gharana, and Akbar is the king linked with its start.</div>
    `
  },
  11: {
    questext: "The Gwalior Gharana began in the reign of which Mughal emperor?",
    options: ["Akbar", "Shah Jahan", "Babur", "Aurangzeb"],
    correct: "1",
    exptext: "✅ The Gwalior Gharana started during the reign of Akbar. 📌 Akbar and the oldest gharana go together. ❌ Shah Jahan is tempting because he loved arts, but the gharana began earlier."
  },
  12: {
    questext: "Which of the following is a musician of the Gwalior Gharana?",
    options: ["Bhimsen Joshi", "Bade Ghulam Ali Khan", "Pandit Jasraj", "Omkarnath Thakur"],
    correct: "4",
    exptext: "✅ Omkarnath Thakur belongs to the Gwalior Gharana. 📌 Remember O for Omkarnath and O for oldest. ❌ Bhimsen Joshi is tempting because he is famous, but he belongs to the Kirana Gharana."
  },
  13: {
    type: "concept", icon: "🎤", accent: "#8b5cf6", pauseTimer: true,
    title: "Kirana Gharana",
    html: `
      <p class="cp-lead">The Kirana Gharana, of Uttar Pradesh, is <u>known for its use of the sargam and the pure, steady note</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/9.png" alt="Bhimsen Joshi singing photo" data-caption="Pandit Bhimsen Joshi was the greatest singer of the Kirana Gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/10.png" alt="Gangubai Hangal singing photo" data-caption="Gangubai Hangal sings in the Kirana style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The gharana was founded by Ustad Abdul Karim Khan and Ustad Abdul Wahid Khan. It is named after the town of Kairana in Uttar Pradesh. Its great singers are Bhimsen Joshi, Sawai Gandharva, Gangubai Hangal, Prabha Atre, Manik Varma and Chhannulal Mishra.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>State</td><td>Uttar Pradesh</td></tr><tr><td>Known for</td><td>Sargam, which is the perfect note</td></tr><tr><td>Founders</td><td>Abdul Karim Khan and Abdul Wahid Khan</td></tr><tr><td>Famous singers</td><td>Bhimsen Joshi, Gangubai Hangal, Prabha Atre</td></tr></tbody></table>
      <div class="cp-note trap">Kirana is known for the pure note, while Patiala is known for fast taans. Do not mix them.</div>
      <div class="cp-note exam">Bhimsen Joshi received the Bharat Ratna in 2009, and Gangubai Hangal is another great name.</div>
    `
  },
  14: {
    questext: "Which gharana is known for its sargam and the pure, steady note?",
    options: ["Agra", "Gwalior", "Kirana", "Mewati"],
    correct: "3",
    exptext: "✅ The Kirana Gharana is known for sargam and the perfect note. 📌 Kirana and clear notes go together. ❌ Mewati is tempting because it is linked with a special form of singing, but that is the tarana."
  },
  15: {
    questext: "Bhimsen Joshi belongs to which gharana?",
    options: ["Kirana", "Patiala", "Gwalior", "Jaipur Atrauli"],
    correct: "1",
    exptext: "✅ Bhimsen Joshi belongs to the Kirana Gharana. 📌 K for Kirana and K for the king of voices. ❌ Jaipur Atrauli is tempting because it also has great singers, but Joshi is of Kirana."
  },
  16: {
    type: "concept", icon: "🌹", accent: "#ec4899", pauseTimer: true,
    title: "Patiala Gharana",
    html: `
      <p class="cp-lead">The Patiala Gharana is known for <u>three forms of singing: ghazal, khayal and thumri</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/11.png" alt="Bade Ghulam Ali Khan singing photo" data-caption="Ustad Bade Ghulam Ali Khan was the greatest singer of the Patiala Gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/12.png" alt="Begum Akhtar singing photo" data-caption="Begum Akhtar was a great singer of ghazal and thumri." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The gharana was founded by Mian Kallu and then made famous by Ustad Fateh Ali Khan and Ustad Ali Baksh Khan. It was inspired by four other gharanas: Delhi, Rewa, Gwalior and Jaipur. Its singers include Bade Ghulam Ali Khan, Begum Akhtar, Ajay Chakraborty, Naina Devi, Parveen Sultana, Lakshmi Shankar and Amanat Ali Khan.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Founder</td><td>Mian Kallu</td></tr><tr><td>Propounded by</td><td>Fateh Ali Khan and Ali Baksh Khan</td></tr><tr><td>Forms of singing</td><td>Ghazal, khayal and thumri</td></tr><tr><td>Famous singers</td><td>Bade Ghulam Ali Khan, Begum Akhtar, Parveen Sultana</td></tr></tbody></table>
      <div class="cp-note trap">Mian Kallu is the founder, but Fateh Ali Khan and Ali Baksh Khan are the ones who made it popular.</div>
      <div class="cp-note exam">Remember the three forms of Patiala: ghazal, khayal and thumri.</div>
    `
  },
  17: {
    questext: "Who is the founder of the Patiala Gharana?",
    options: ["Haddu Khan", "Alladiya Khan", "Amir Khan", "Mian Kallu"],
    correct: "4",
    exptext: "✅ Mian Kallu founded the Patiala Gharana. 📌 K for Kallu and K for the beginning. ❌ Alladiya Khan is tempting because he is also a founder, but of the Jaipur Atrauli Gharana."
  },
  18: {
    questext: "Begum Akhtar is a famous singer of which gharana?",
    options: ["Kirana", "Patiala", "Mewati", "Gwalior"],
    correct: "2",
    exptext: "✅ Begum Akhtar is linked with the Patiala Gharana. 📌 Patiala has ghazal, and she was the queen of ghazal. ❌ Mewati is tempting because it also has great singers, but it is known for tarana."
  },
  19: {
    type: "concept", icon: "🌾", accent: "#14b8a6", pauseTimer: true,
    title: "Mewati Gharana",
    html: `
      <p class="cp-lead">The Mewati Gharana is from Haryana, and it is <u>known for the tarana form of singing</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/13.png" alt="Pandit Jasraj singing photo" data-caption="Pandit Jasraj was the best known singer of the Mewati Gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/14.png" alt="Kala Ramnath violin performance photo" data-caption="Kala Ramnath plays the violin in the Mewati style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The gharana was founded by Ustad Ghagge Nazir Khan. The tarana is a fast piece with quick words, which is used for the middle part of a concert. Famous names are Pandit Jasraj, Maniram, Sanjeev Abhyankar, Kala Ramnath, Tripti Mukherjee and Ratan Mohan.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>State</td><td>Haryana</td></tr><tr><td>Known for</td><td>Tarana</td></tr><tr><td>Founder</td><td>Ghagge Nazir Khan</td></tr><tr><td>Famous singers</td><td>Pandit Jasraj, Maniram, Sanjeev Abhyankar</td></tr></tbody></table>
      <div class="cp-note trap">Mewati is linked with the tarana, while Kirana is linked with sargam. The two names sound close.</div>
      <div class="cp-note exam">Pandit Jasraj is the main face of the Mewati Gharana.</div>
    `
  },
  20: {
    questext: "Which gharana is known for the tarana form of singing?",
    options: ["Kirana", "Mewati", "Dagar", "Agra"],
    correct: "2",
    exptext: "✅ The Mewati Gharana is known for the tarana. 📌 M for Mewati and for the middle quick piece. ❌ Kirana is tempting because the names look alike, but it is known for sargam."
  },
  21: {
    type: "concept", icon: "🎻", accent: "#3b82f6", pauseTimer: true,
    title: "Maihar Gharana",
    html: `
      <p class="cp-lead">The Maihar Gharana was founded by <u>Ustad Alauddin Khan</u>, and it is the best known gharana for instruments such as the sitar and the sarod.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/15.png" alt="Maihar Madhya Pradesh town photo" data-caption="The town of Maihar in Madhya Pradesh gave its name to the gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/16.png" alt="Ali Akbar Khan sarod performance photo" data-caption="Ustad Ali Akbar Khan plays the sarod in the Maihar style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Alauddin Khan taught many great musicians. These are Pandit Ravi Shankar, Annapurna Devi, Nikhil Banerjee, Hariprasad Chaurasia, Ali Akbar Khan, Pannalal Ghosh and V. G. Jog.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Founder</td><td>Alauddin Khan</td></tr><tr><td>Students</td><td>Ravi Shankar, Annapurna Devi, Nikhil Banerjee</td></tr><tr><td>Students</td><td>Hariprasad Chaurasia, Ali Akbar Khan, Pannalal Ghosh, V. G. Jog</td></tr></tbody></table>
      <div class="cp-note trap">Maihar Gharana is for instruments, while Kirana and Patiala are for singing.</div>
      <div class="cp-note exam">Alauddin Khan is the guru of Ravi Shankar and Ali Akbar Khan.</div>
    `
  },
  22: {
    questext: "Who founded the Maihar Gharana?",
    options: ["Amir Khan", "Inayat Khan", "Alauddin Khan", "Alladiya Khan"],
    correct: "3",
    exptext: "✅ Ustad Alauddin Khan founded the Maihar Gharana. 📌 Maihar and Alauddin go together. ❌ Alladiya Khan is tempting because of the similar name, but he is the founder of Jaipur Atrauli."
  },
  23: {
    questext: "Which of the following is a student of the Maihar Gharana?",
    options: ["Bhimsen Joshi", "Begum Akhtar", "Bade Ghulam Ali Khan", "Hariprasad Chaurasia"],
    correct: "4",
    exptext: "✅ Hariprasad Chaurasia is a student of the Maihar Gharana. 📌 The Maihar students play instruments. ❌ Bade Ghulam Ali Khan is tempting because he is famous, but he belongs to Patiala."
  },
  24: {
    type: "concept", icon: "🌴", accent: "#f97316", pauseTimer: true,
    title: "Indore Gharana",
    html: `
      <p class="cp-lead">The Indore Gharana was founded by <u>Ustad Amir Khan</u>, and it is known for its slow, serious style.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/17.png" alt="Ustad Amir Khan singing photo" data-caption="Ustad Amir Khan founded the Indore Gharana, known for slow and deep singing." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/18.png" alt="Indore city Rajwada palace photo" data-caption="The Rajwada palace stands in Indore, which gave its name to the gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Amir Khan sang in a very slow, calm and deep way. His style is known as the Indore style. Other names on the list are Sultan Khan, Pandit Amarnath, Shankar Lal Mishra, Kalyan Banerjee and Purvi Mukherjee.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Founder</td><td>Amir Khan</td></tr><tr><td>Known for</td><td>Slow and serious singing</td></tr><tr><td>Musicians</td><td>Amarnath, Shankar Lal Mishra, Kalyan Banerjee, Purvi Mukherjee</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix up Amir Khan with Amir Khusrau. Amir Khan is a singer of the 20th century.</div>
      <div class="cp-note exam">Indore is linked with Amir Khan.</div>
    `
  },
  25: {
    questext: "The Indore Gharana was founded by whom?",
    options: ["Mian Kallu", "Alauddin Khan", "Amir Khan", "Haddu Khan"],
    correct: "3",
    exptext: "✅ Ustad Amir Khan founded the Indore Gharana. 📌 I for Indore and A for Amir. ❌ Alauddin Khan is tempting because he is also an Ustad, but he is linked with Maihar."
  },
  26: {
    type: "concept", icon: "🪔", accent: "#84cc16", pauseTimer: true,
    title: "Jaipur Atrauli Gharana",
    html: `
      <p class="cp-lead">The Jaipur Atrauli Gharana was founded by <u>Ustad Alladiya Khan</u>, and it is known for its rich variety of ragas.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/19.png" alt="Kishori Amonkar singing photo" data-caption="Kishori Amonkar sang in the Jaipur Atrauli style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/20.png" alt="Mallikarjun Mansur singing photo" data-caption="Mallikarjun Mansur was a great singer of the Jaipur Atrauli Gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The singers of this gharana include Kesarbai Kerkar, Mallikarjun Mansur, Vidyadhar Vyas, Vidyagauri Adkar, Bande Ali Khan, Pandit Lakshman Prasad and Kishori Amonkar.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Founder</td><td>Alladiya Khan</td></tr><tr><td>Singers</td><td>Kesarbai Kerkar, Mallikarjun Mansur, Kishori Amonkar</td></tr><tr><td>Singers</td><td>Vidyadhar Vyas, Vidyagauri Adkar, Lakshman Prasad</td></tr></tbody></table>
      <div class="cp-note trap">Alladiya Khan founded Jaipur Atrauli, while Alauddin Khan founded Maihar. The names look alike.</div>
      <div class="cp-note exam">Kishori Amonkar and Kesarbai Kerkar are famous women singers of this gharana.</div>
    `
  },
  27: {
    questext: "Kishori Amonkar belongs to which gharana?",
    options: ["Patiala", "Jaipur Atrauli", "Agra", "Gwalior"],
    correct: "2",
    exptext: "✅ Kishori Amonkar belongs to the Jaipur Atrauli Gharana. 📌 Kishori, Kesarbai and Alladiya are all part of one family. ❌ Patiala is tempting because it has many women singers, but she is not of it."
  },
  28: {
    type: "concept", icon: "🥁", accent: "#06b6d4", pauseTimer: true,
    title: "Punjab Gharana",
    html: `
      <p class="cp-lead">The Punjab Gharana is a <u>tabla gharana, famous for the great masters Ustad Alla Rakha and Ustad Zakir Hussain</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/21.png" alt="Ustad Alla Rakha tabla photo" data-caption="Ustad Alla Rakha plays the tabla in the Punjab style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/22.png" alt="Zakir Hussain tabla concert photo" data-caption="Ustad Zakir Hussain plays the tabla in the Punjab style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The gharana was founded by Lal Bhawani Singh. Its masters are Alla Rakha, Zakir Hussain, Nikhil Ghosh, Shafaat Ahmed Khan, Ustad Altaf Hussain, Ustad Ashfaque Hussain and Miyan Qadir Baksh.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Type</td><td>Tabla gharana</td></tr><tr><td>Founder</td><td>Lal Bhawani Singh</td></tr><tr><td>Masters</td><td>Alla Rakha, Zakir Hussain, Nikhil Ghosh, Qadir Baksh</td></tr></tbody></table>
      <div class="cp-note trap">Punjab Gharana is for the tabla, and it is not related to Punjabi folk songs.</div>
      <div class="cp-note exam">Alla Rakha and his son Zakir Hussain are the top names of the Punjab Gharana.</div>
    `
  },
  29: {
    questext: "Zakir Hussain belongs to which tabla gharana?",
    options: ["Benaras", "Delhi", "Lucknow", "Punjab"],
    correct: "4",
    exptext: "✅ Zakir Hussain belongs to the Punjab Gharana. 📌 His father Alla Rakha is a Punjab master. ❌ Benaras is tempting because it is another famous tabla gharana."
  },
  30: {
    type: "concept", icon: "🌸", accent: "#a855f7", pauseTimer: true,
    title: "Rampur Sahaswan Gharana",
    html: `
      <p class="cp-lead">The Rampur Sahaswan Gharana is a Khayal gharana <u>known for its strong, controlled voice and complex taans</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/23.png" alt="Rashid Khan singing photo" data-caption="Ustad Rashid Khan sang in the Rampur Sahaswan style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/24.png" alt="Rampur Raza Library Uttar Pradesh photo" data-caption="The Raza Library in Rampur, a city of music and learning." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The gharana was founded by Ustad Inayat Hussain Khan with Mehboob Khan. Its singers include Ghulam Mustafa Khan, Ustad Rashid Khan, Sadiq Hussain Khan, Ustad Nisar Khan, Zeeshan Khan and Abbas Khan.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Founders</td><td>Inayat Hussain Khan and Mehboob Khan</td></tr><tr><td>Singers</td><td>Ghulam Mustafa Khan, Rashid Khan</td></tr><tr><td>Singers</td><td>Sadiq Hussain Khan, Nisar Khan, Zeeshan Khan, Abbas Khan</td></tr></tbody></table>
      <div class="cp-note trap">Rampur Sahaswan is a Khayal gharana, but it is also linked with the Gwalior style.</div>
      <div class="cp-note exam">Ustad Rashid Khan is the best known recent singer of this gharana.</div>
    `
  },
  31: {
    questext: "Ustad Rashid Khan belongs to which gharana?",
    options: ["Agra", "Kirana", "Mewati", "Rampur Sahaswan"],
    correct: "4",
    exptext: "✅ Ustad Rashid Khan belongs to the Rampur Sahaswan Gharana. 📌 R for Rampur and R for Rashid. ❌ Kirana is tempting because many great singers belong to it."
  },
  32: {
    type: "concept", icon: "🕌", accent: "#e11d48", pauseTimer: true,
    title: "Benaras Gharana",
    html: `
      <p class="cp-lead">The Benaras Gharana is known in <u>three arts: Kathak, Khayal and tabla</u>, and each has its own founder.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/25.png" alt="Varanasi ghats Ganga photo" data-caption="The ghats of Varanasi, the city of the Benaras Gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/26.png" alt="Pandit Kishan Maharaj tabla photo" data-caption="Pandit Kishan Maharaj was a master of the Benaras tabla." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Janaki Prasad founded the Kathak style of Benaras. Pandit Gopal Mishra founded the Khayal style. Pandit Ram Sahai founded the tabla style. Great tabla masters are Pandit Kishan Maharaj, Pandit Anokhelal Mishra, Samta Prasad, Pandit Kanthe Maharaj, Gopal Misra and Hanuman Prasad Misra. Ustad Bismillah Khan, the shehnai master, is also linked with Benaras.</p>
      <table><thead><tr><th>Art</th><th>Founder</th></tr></thead><tbody><tr><td>Kathak</td><td>Janaki Prasad</td></tr><tr><td>Khayal</td><td>Pandit Gopal Mishra</td></tr><tr><td>Tabla</td><td>Pandit Ram Sahai</td></tr></tbody></table>
      <div class="cp-note trap">Benaras is a gharana of three arts, so check which art the question asks about.</div>
      <div class="cp-note exam">Pandit Ram Sahai is the founder of Benaras tabla.</div>
    `
  },
  33: {
    questext: "Who is the founder of the Benaras Gharana of tabla?",
    options: ["Gopal Mishra", "Ram Sahai", "Janaki Prasad", "Kishan Maharaj"],
    correct: "2",
    exptext: "✅ Pandit Ram Sahai founded the Benaras tabla. 📌 Ram for the tabla and Janaki for Kathak. ❌ Janaki Prasad is tempting because he is also a Benaras founder, but of Kathak."
  },
  34: {
    questext: "Janaki Prasad is the founder of which art in the Benaras Gharana?",
    options: ["Tabla", "Dhrupad", "Khayal", "Kathak"],
    correct: "4",
    exptext: "✅ Janaki Prasad founded the Kathak style of Benaras. 📌 Janaki goes with Kathak. ❌ Khayal is tempting because Benaras also has a Khayal style, but its founder is Gopal Mishra."
  },
  35: {
    type: "concept", icon: "🏙️", accent: "#10b981", pauseTimer: true,
    title: "Bhendi Bazar Gharana",
    html: `
      <p class="cp-lead">The Bhendi Bazar Gharana is of <u>Mumbai</u>, and it was founded by Ustad Chhajju Khan of Moradabad in Uttar Pradesh.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/27.png" alt="Lata Mangeshkar singing photo" data-caption="Lata Mangeshkar studied with a master of the Bhendi Bazar Gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/28.png" alt="Bhendi Bazar Mumbai street photo" data-caption="Bhendi Bazar is a busy market area in Mumbai." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>This gharana is known for its breath control, where a singer holds a note for a very long time. Its singers include Aman Ali Khan, Lata Mangeshkar, Anjanibai Malpekar and Sashikala Koratkar.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>City</td><td>Mumbai</td></tr><tr><td>Founder</td><td>Chhajju Khan</td></tr><tr><td>Musicians</td><td>Aman Ali Khan, Lata Mangeshkar, Anjanibai Malpekar</td></tr></tbody></table>
      <div class="cp-note trap">The founder came from Moradabad, but the gharana is named after Bhendi Bazar of Mumbai.</div>
      <div class="cp-note exam">Lata Mangeshkar is linked with the Bhendi Bazar Gharana through Aman Ali Khan.</div>
    `
  },
  36: {
    questext: "The Bhendi Bazar Gharana is linked with which city?",
    options: ["Delhi", "Mumbai", "Lucknow", "Kolkata"],
    correct: "2",
    exptext: "✅ The Bhendi Bazar Gharana belongs to Mumbai. 📌 Bhendi Bazar is a market area of Mumbai. ❌ Delhi is tempting because of Delhi Gharana, but this one is of Mumbai."
  },
  37: {
    type: "concept", icon: "🏞️", accent: "#eab308", pauseTimer: true,
    title: "Agra Gharana",
    html: `
      <p class="cp-lead">The Agra Gharana is a <u>blend of Khayal and Dhrupad-Dhamar</u>, and it comes from the old Nauhar Bani.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/29.png" alt="Faiyaz Khan singer photo" data-caption="Ustad Faiyaz Khan was the greatest singer of the Agra Gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/30.png" alt="Agra Taj Mahal photo" data-caption="The Taj Mahal in Agra, the city that gave its name to the gharana." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The gharana was founded by Haji Sujan Khan, and its singers are descendants of Nauhar Bani. Its famous names are Faiyyaz Khan, Malka Jaan, Latafat Hussain Khan, Dinkar Kakini, Vijay Kichlu, Lalita Rao and Ghagge Khuda Baksh.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Founder</td><td>Haji Sujan Khan</td></tr><tr><td>Style</td><td>Blend of Khayal and Dhrupad-Dhamar</td></tr><tr><td>Origin</td><td>Nauhar Bani</td></tr><tr><td>Musicians</td><td>Faiyyaz Khan, Malka Jaan, Ghagge Khuda Baksh</td></tr></tbody></table>
      <div class="cp-note trap">Agra mixes Khayal with Dhrupad-Dhamar, but Dagar is only Dhrupad.</div>
      <div class="cp-note exam">Haji Sujan Khan is the founder of the Agra Gharana, and Faiyyaz Khan is its most famous singer.</div>
    `
  },
  38: {
    questext: "The Agra Gharana is a blend of Khayal and which style?",
    options: ["Dhrupad-Dhamar", "Thumri", "Tappa", "Tarana"],
    correct: "1",
    exptext: "✅ The Agra Gharana mixes Khayal with Dhrupad-Dhamar. 📌 Agra is a blend of old and new. ❌ Tarana is tempting because it goes with Mewati."
  },
  39: {
    type: "concept", icon: "🏯", accent: "#64748b", pauseTimer: true,
    title: "Delhi Gharana",
    html: `
      <p class="cp-lead">The Delhi Gharana was founded by <u>Ustad Sidhar Khan Dhadi</u>, and it is one of the oldest and most respected tabla gharanas.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/31.png" alt="Delhi Red Fort photo" data-caption="The Red Fort in Delhi, the capital of the Mughal rulers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/32.png" alt="Tabla player close up hands photo" data-caption="A tabla player uses only the tips of the fingers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Ustad Sidhar Khan Dhadi is the founder, and Tanras Khan is a famous name linked with the gharana. The Delhi style is soft and uses delicate finger work.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Founder</td><td>Sidhar Khan Dhadi</td></tr><tr><td>Famous name</td><td>Tanras Khan</td></tr><tr><td>Art</td><td>Tabla</td></tr></tbody></table>
      <div class="cp-note trap">Delhi Gharana is a tabla gharana and the oldest one, so do not confuse it with Punjab.</div>
      <div class="cp-note exam">Remember Sidhar Khan Dhadi for Delhi.</div>
    `
  },
  40: {
    questext: "The Delhi Gharana of tabla was founded by whom?",
    options: ["Tanras Khan", "Ram Sahai", "Lal Bhawani Singh", "Sidhar Khan Dhadi"],
    correct: "4",
    exptext: "✅ Sidhar Khan Dhadi founded the Delhi Gharana. 📌 D for Dhadi and D for Delhi. ❌ Tanras Khan is tempting because he is also linked with Delhi, but he is not the founder."
  },
  41: {
    type: "concept", icon: "🛕", accent: "#c026d3", pauseTimer: true,
    title: "Darbhanga Gharana",
    html: `
      <p class="cp-lead">The Darbhanga Gharana is from <u>Bihar</u>, and it is a family of Dhrupad singers.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/33.png" alt="Darbhanga Raj Fort Bihar photo" data-caption="The Raj Fort of Darbhanga in Bihar, where the gharana grew." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/34.png" alt="Malik brothers Dhrupad Darbhanga photo" data-caption="Dhrupad singers of the Malik family perform in the Darbhanga style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The founders are Radha Krishna and Karta Ram. Its famous musicians include Ramchatur Malik, Premkumar Malik, Siyaram Tiwari and Vidur Mallick. The family is also known for the Khandar Vani and Gauhar Vani styles.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>State</td><td>Bihar</td></tr><tr><td>Founders</td><td>Radha Krishna and Karta Ram</td></tr><tr><td>Singers</td><td>Ramchatur Malik, Premkumar Malik, Siyaram Tiwari, Vidur Mallick</td></tr></tbody></table>
      <div class="cp-note trap">Darbhanga is in Bihar and sings Dhrupad, so it is not a Khayal gharana.</div>
      <div class="cp-note exam">Darbhanga and Dumraon are the two Bihar gharanas.</div>
    `
  },
  42: {
    questext: "The Darbhanga Gharana is linked with which state?",
    options: ["Haryana", "Uttar Pradesh", "Bihar", "Madhya Pradesh"],
    correct: "3",
    exptext: "✅ The Darbhanga Gharana belongs to Bihar. 📌 Darbhanga is a city of Bihar. ❌ Uttar Pradesh is tempting because many gharanas are there, but Darbhanga is in Bihar."
  },
  43: {
    type: "concept", icon: "🌾", accent: "#fb7185", pauseTimer: true,
    title: "Dumraon Gharana",
    html: `
      <p class="cp-lead">The Dumraon Gharana is a <u>musical family from Dumraon in Bihar</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/35.png" alt="Dumraon Raj Bihar Buxar photo" data-caption="The Dumraon Raj in Buxar district, Bihar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/36.png" alt="Dumraon Bismillah Khan birthplace Bihar photo" data-caption="Dumraon is also the birthplace of the shehnai master Ustad Bismillah Khan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The names linked with the Dumraon Gharana are Pandit Tilak Chand Choubey and Pandit Ghanarang Baba. Dumraon is in the Buxar district of Bihar, and the shehnai master Bismillah Khan was born there.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>State</td><td>Bihar</td></tr><tr><td>Musicians</td><td>Tilak Chand Choubey, Ghanarang Baba</td></tr></tbody></table>
      <div class="cp-note trap">Dumraon and Darbhanga are both in Bihar, so read the option carefully.</div>
      <div class="cp-note exam">Bismillah Khan was born in Dumraon.</div>
    `
  },
  44: {
    questext: "The Dumraon Gharana belongs to which state?",
    options: ["Rajasthan", "Punjab", "Bihar", "Uttar Pradesh"],
    correct: "3",
    exptext: "✅ Dumraon is in Bihar. 📌 Bismillah Khan was born there. ❌ Uttar Pradesh is tempting because Bismillah Khan lived in Varanasi."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gold-lined tanpura, a tabla pair and a subtle family-tree line in the background" },
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/1.png": { t: "fig", about: "A tree: a founder at the top, then teacher to student arrows down to three generations, labelled Founder, Student, Next generation." },
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Guru shishya parampara Indian classical music lesson photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/2.png. a teacher and student in a music lesson",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gundecha Brothers Dhrupad performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/3.png. the Gundecha Brothers singing",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Zia Mohiuddin Dagar Rudra Veena photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/4.png. Zia Mohiuddin Dagar with the Rudra Veena",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Birju Maharaj Kathak Lucknow Gharana photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/5.png. Birju Maharaj dancing Kathak",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jaipur Gharana Kathak dance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/6.png. Jaipur style Kathak dancers",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gwalior Fort Madhya Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/7.png. Gwalior Fort",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vishnu Digambar Paluskar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/8.png. Vishnu Digambar Paluskar",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhimsen Joshi singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/9.png. Bhimsen Joshi",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gangubai Hangal singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/10.png. Gangubai Hangal",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bade Ghulam Ali Khan singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/11.png. Bade Ghulam Ali Khan",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Begum Akhtar singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/12.png. Begum Akhtar",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pandit Jasraj singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/13.png. Pandit Jasraj",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kala Ramnath violin performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/14.png. Kala Ramnath",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Maihar Madhya Pradesh town photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/15.png. the town of Maihar",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ali Akbar Khan sarod performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/16.png. Ali Akbar Khan",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ustad Amir Khan singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/17.png. Ustad Amir Khan",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indore city Rajwada palace photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/18.png. the Rajwada palace of Indore",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kishori Amonkar singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/19.png. Kishori Amonkar",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mallikarjun Mansur singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/20.png. Mallikarjun Mansur",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ustad Alla Rakha tabla photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/21.png. Ustad Alla Rakha",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Zakir Hussain tabla concert photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/22.png. Zakir Hussain",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rashid Khan singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/23.png. Rashid Khan",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rampur Raza Library Uttar Pradesh photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/24.png. the Rampur Raza Library",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Varanasi ghats Ganga photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/25.png. the ghats of Varanasi",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pandit Kishan Maharaj tabla photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/26.png. Pandit Kishan Maharaj",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lata Mangeshkar singing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/27.png. Lata Mangeshkar",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhendi Bazar Mumbai street photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/28.png. Bhendi Bazar in Mumbai",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Faiyaz Khan singer photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/29.png. Faiyaz Khan",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Agra Taj Mahal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/30.png. the Taj Mahal in Agra",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Delhi Red Fort photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/31.png. the Red Fort in Delhi",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tabla player close up hands photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/32.png. tabla player hands",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Darbhanga Raj Fort Bihar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/33.png. Darbhanga Raj in Bihar",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Malik brothers Dhrupad Darbhanga photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/34.png. Dhrupad singers of Darbhanga",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dumraon Raj Bihar Buxar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/35.png. the Dumraon Raj palace",
  "images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dumraon Bismillah Khan birthplace Bihar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Gharanas_of_Indian_Music/36.png. the birthplace of Bismillah Khan"
});

/* CHANGE LOG
   - Darbhanga is written with the standard spelling (the map has Darbanga).
   - Zia Mohiuddin Dagar and Dhrupad are written with the standard spellings (the map has Zua and Drupads).
   - Bismillah Khan, a shehnai master, is described as linked with Benaras rather than listed as a tabla player.
   - Delhi Gharana is described as a tabla gharana founded by Sidhar Khan Dhadi.
   - Punjab Gharana is described as a tabla gharana and the Patiala and Rewa listing is kept as on the map.
*/