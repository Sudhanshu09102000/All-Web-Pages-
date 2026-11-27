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

/* Field: General_Awareness · Subject: Static_GK · Chapter: Important_Days · 12 concept pages (+ overview) · 37 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📅", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Important Days and Dates",
    thumb: {
      image: "images/General_Awareness/Static_GK/Important_Days/thumbnail.png",
      banner: "STATIC GK 2026",
      line1: "IMPORTANT DAYS",
      line2: "AND DATES",
      line3: "JAN TO DEC",
      badge: "FULL CLASS",
      ribbon: "NATIONAL • INTERNATIONAL • TRICKS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Important Days and Dates Jan to Dec | Static GK | SSC CGL",
      altTitles: ["All Important Days in One Class", "Important Days Tricks Month-wise"],
      description: "Important days are sure marks in Static GK. In this class we go month by month and learn the national and international days with their dates and the traps.\n\n📌 IN THIS CLASS\n✅ January to December\n✅ National and international days\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 January\n\n👍 Like, share, subscribe.\n\n#SSCCGL #StaticGK #ImportantDays",
      tags: ["important days", "important days and dates", "national days", "international days", "static gk", "ssc cgl static gk", "important days 2026", "days and dates", "month wise important days", "january important days", "important days tricks", "gk for competitive exams", "railway exam gk", "banking exam gk", "defence exam gk", "world days", "important dates", "days gk", "current affairs days", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "Important Days Static_"],
      hashtags: ["SSCCGL", "StaticGK", "ImportantDays"],
      thumbText: "IMPORTANT DAYS AND DATES",
      pinnedComment: "📌 Which dance did you find hardest? Write the dance and state below 👇",
      communityPost: "📅 New class is live: Important Days and Dates, month by month. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Basic idea",
      playlist: "Static GK — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple month-by-month class on the important national and international days</u>. Exams ask the exact date of a day, so we learn each month in order and also the traps.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>12</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>37</b><span>Questions</span></div>
        <div class="cp-stat"><b>~61 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>January and February</b><br>All the important national and international days of January and February, with the dates exams ask and the reason behind the main ones.</li>
        <li><b>March and April</b><br>All the important national and international days of March and April, with the dates exams ask and the reason behind the main ones.</li>
        <li><b>May and June</b><br>All the important national and international days of May and June, with the dates exams ask and the reason behind the main ones.</li>
        <li><b>July and August</b><br>All the important national and international days of July and August, with the dates exams ask and the reason behind the main ones.</li>
        <li><b>September and October</b><br>All the important national and international days of September and October, with the dates exams ask and the reason behind the main ones.</li>
        <li><b>November and December</b><br>All the important national and international days of November and December, with the dates exams ask and the reason behind the main ones.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Important Days is one of the most repeated topics in Static General Knowledge, and each question is a simple one-mark match of day and date.</div>
    `
  },
  2: {
    type: "concept", icon: "🎆", accent: "#f97316", pauseTimer: true,
    title: "January",
    html: `
      <p class="cp-lead">January holds many national days, and <u>the most asked are National Youth Day, Army Day, Voters Day and Martyrs' Day</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/1.png" alt="Swami Vivekananda statue National Youth Day photo" data-caption="Swami Vivekananda, whose birthday is celebrated as National Youth Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/2.png" alt="Indian Army Day parade photo" data-caption="Soldiers march at the Army Day parade in New Delhi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>English New Year and Global Family Day</td></tr><tr><td>4</td><td>World Braille Day</td></tr><tr><td>5</td><td>National Birds Day</td></tr><tr><td>6</td><td>World War Orphans Day</td></tr><tr><td>9</td><td>Pravasi Bharatiya Divas (Non-Resident Indians Day)</td></tr><tr><td>10</td><td>World Hindi Day</td></tr><tr><td>11</td><td>Death anniversary of Lal Bahadur Shastri</td></tr><tr><td>12</td><td>National Youth Day</td></tr><tr><td>15</td><td>Army Day</td></tr><tr><td>16</td><td>National Startup Day</td></tr><tr><td>23</td><td>Birthday of Netaji Subhas Chandra Bose</td></tr><tr><td>24</td><td>National Girl Child Day</td></tr><tr><td>25</td><td>National Voters Day and National Tourism Day</td></tr><tr><td>26</td><td>International Customs Day</td></tr><tr><td>27</td><td>International Holocaust Remembrance Day</td></tr><tr><td>28</td><td>Birthday of Lala Lajpat Rai and Data Protection Day</td></tr><tr><td>30</td><td>Martyrs' Day and World Leprosy Eradication Day</td></tr><tr><td>31</td><td>International Zebra Day</td></tr></tbody></table>
      <div class="cp-note trap">World Hindi Day is on 10 January, but Hindi Diwas is on 14 September. Questions often use both.</div>
      <div class="cp-note exam">National Youth Day marks the birthday of Swami Vivekananda, and Army Day marks the day General K. M. Cariappa became the first Indian Commander-in-Chief in 1949.</div>
      <div class="cp-note tip">Pravasi Bharatiya Divas, on 9 January, recalls the return of Mahatma Gandhi from South Africa in 1915.</div>
    `
  },
  3: {
    questext: "National Youth Day is observed on which date?",
    options: ["12 January", "15 January", "23 January", "25 January"],
    correct: "1",
    exptext: "✅ National Youth Day is on 12 January, the birthday of Swami Vivekananda. 📌 Think of the twelfth and youth power. ❌ 23 January is tempting because it is Netaji's birthday."
  },
  4: {
    questext: "Army Day is observed in India on which date?",
    options: ["26 January", "15 January", "30 January", "9 January"],
    correct: "2",
    exptext: "✅ Army Day is on 15 January, to honour General K. M. Cariappa, the first Indian Commander-in-Chief. 📌 15 is also the date of Independence Day in August. ❌ 26 January is tempting, but it is Republic Day."
  },
  5: {
    questext: "Consider the following statements about the days of January:\n1. Pravasi Bharatiya Divas is observed on 9 January.\n2. National Voters Day is observed on 25 January.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Nine is for Pravasi and twenty-five is for voters. ❌ \"Only 1\" is tempting because Pravasi Bharatiya Divas is better known."
  },
  6: {
    type: "concept", icon: "📚", accent: "#e11d48", pauseTimer: true,
    title: "February",
    html: `
      <p class="cp-lead">February is the month of <u>National Science Day, Mother Language Day and Coast Guard Day</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/3.png" alt="C. V. Raman scientist photo" data-caption="Sir C. V. Raman discovered the Raman Effect, which National Science Day remembers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/4.png" alt="Indian Coast Guard ship photo" data-caption="An Indian Coast Guard ship sails at sea." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>Indian Coast Guard Day</td></tr><tr><td>2</td><td>World Wetlands Day</td></tr><tr><td>4</td><td>World Cancer Day</td></tr><tr><td>6</td><td>International Day of Zero Tolerance for Female Genital Mutilation</td></tr><tr><td>6 to 12</td><td>International Development Week</td></tr><tr><td>8</td><td>Safer Internet Day</td></tr><tr><td>10</td><td>National Deworming Day and World Pulses Day</td></tr><tr><td>11</td><td>World Day of the Sick and International Day of Women and Girls in Science</td></tr><tr><td>21</td><td>International Mother Language Day</td></tr><tr><td>22</td><td>World Thinking Day</td></tr><tr><td>24</td><td>Central Excise Day</td></tr><tr><td>27</td><td>World Non-Governmental Organisation Day</td></tr><tr><td>28</td><td>National Science Day</td></tr></tbody></table>
      <div class="cp-note trap">World Wetlands Day is on 2 February because the Ramsar Convention on wetlands was signed on that date in 1971.</div>
      <div class="cp-note exam">National Science Day, on 28 February, honours Sir C. V. Raman's discovery of the Raman Effect in 1928.</div>
    `
  },
  7: {
    questext: "National Science Day is observed on which date?",
    options: ["21 February", "22 February", "28 February", "24 February"],
    correct: "3",
    exptext: "✅ National Science Day is on 28 February, for the Raman Effect. 📌 Raman found it on 28 February 1928. ❌ 21 February is tempting because it is International Mother Language Day."
  },
  8: {
    questext: "World Wetlands Day is observed on which date?",
    options: ["10 February", "4 February", "8 February", "2 February"],
    correct: "4",
    exptext: "✅ World Wetlands Day is on 2 February. 📌 Ramsar was signed on the second day of February. ❌ 4 February is tempting because it is World Cancer Day."
  },
  9: {
    questext: "International Mother Language Day is observed on which date?",
    options: ["21 February", "28 February", "1 February", "22 February"],
    correct: "1",
    exptext: "✅ International Mother Language Day is on 21 February. 📌 Twenty-one is the day language movement martyrs are recalled. ❌ 22 February is tempting because it is World Thinking Day."
  },
  10: {
    type: "concept", icon: "🌍", accent: "#14b8a6", pauseTimer: true,
    title: "March",
    html: `
      <p class="cp-lead">March days include <u>International Women's Day, World Water Day, National Safety Day and World Sparrow Day</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/5.png" alt="International Women's Day march photo" data-caption="Women gather at an International Women's Day event." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/6.png" alt="House sparrow bird photo" data-caption="A house sparrow, the bird that World Sparrow Day protects." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>Zero Discrimination Day</td></tr><tr><td>3</td><td>World Wildlife Day</td></tr><tr><td>4</td><td>National Safety Day</td></tr><tr><td>8</td><td>International Women's Day</td></tr><tr><td>Second Wednesday</td><td>No Smoking Day</td></tr><tr><td>10</td><td>Central Industrial Security Force Raising Day</td></tr><tr><td>14</td><td>Pi Day</td></tr><tr><td>15</td><td>World Consumer Rights Day</td></tr><tr><td>16</td><td>National Vaccination Day</td></tr><tr><td>20</td><td>International Day of Happiness and World Sparrow Day</td></tr><tr><td>21</td><td>World Forestry Day</td></tr><tr><td>22</td><td>World Water Day</td></tr><tr><td>23</td><td>World Meteorological Day</td></tr><tr><td>24</td><td>World Tuberculosis Day</td></tr></tbody></table>
      <div class="cp-note trap">World Consumer Rights Day is on 15 March, but National Consumer Rights Day of India is on 24 December.</div>
      <div class="cp-note exam">World Water Day is on 22 March, and World Tuberculosis Day is on 24 March, the day the tuberculosis germ was found in 1882.</div>
    `
  },
  11: {
    questext: "World Water Day is observed on which date?",
    options: ["21 March", "22 March", "23 March", "24 March"],
    correct: "2",
    exptext: "✅ World Water Day is on 22 March. 📌 Water, Meteorological and Tuberculosis follow one by one on 22, 23 and 24. ❌ 21 March is tempting because it is World Forestry Day."
  },
  12: {
    questext: "World Tuberculosis Day is observed on which date?",
    options: ["22 March", "23 March", "24 March", "10 March"],
    correct: "3",
    exptext: "✅ World Tuberculosis Day is on 24 March. 📌 It follows World Meteorological Day on 23 March. ❌ 23 March is tempting because it is the next day."
  },
  13: {
    questext: "National Safety Day is observed on which date?",
    options: ["16 March", "8 March", "14 March", "4 March"],
    correct: "4",
    exptext: "✅ National Safety Day is on 4 March. 📌 Safety first, and the fourth month begins soon. ❌ 16 March is tempting because it is National Vaccination Day."
  },
  14: {
    type: "concept", icon: "🏛️", accent: "#3b82f6", pauseTimer: true,
    title: "April",
    html: `
      <p class="cp-lead">April has <u>Civil Services Day, Panchayati Raj Day, World Heritage Day and Earth Day</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/7.png" alt="Panchayat meeting village India photo" data-caption="Villagers attend a panchayat meeting in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/8.png" alt="Earth Day planet climate photo" data-caption="The Earth is protected on World Earth Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>Odisha Foundation Day (Utkal Divas), April Fool's Day and start of Prevention of Blindness Week</td></tr><tr><td>2</td><td>World Autism Awareness Day</td></tr><tr><td>17</td><td>World Haemophilia Day</td></tr><tr><td>18</td><td>World Heritage Day</td></tr><tr><td>21</td><td>National Civil Services Day</td></tr><tr><td>22</td><td>World Earth Day</td></tr><tr><td>24</td><td>National Panchayati Raj Day</td></tr><tr><td>25</td><td>World Malaria Day</td></tr><tr><td>26</td><td>World Intellectual Property Day</td></tr><tr><td>28</td><td>World Day for Safety and Health at Work</td></tr></tbody></table>
      <div class="cp-note trap">Odisha was formed as a separate province on 1 April 1936, and this is celebrated as Odisha Foundation Day.</div>
      <div class="cp-note exam">National Panchayati Raj Day on 24 April marks the 73rd Constitutional Amendment, which came into effect in 1993. Civil Services Day on 21 April honours Sardar Vallabhbhai Patel's address of 1947.</div>
    `
  },
  15: {
    questext: "National Panchayati Raj Day is observed on which date?",
    options: ["24 April", "22 April", "21 April", "25 April"],
    correct: "1",
    exptext: "✅ National Panchayati Raj Day is on 24 April. 📌 It marks the constitutional status given to panchayats in 1993. ❌ 21 April is tempting because it is Civil Services Day."
  },
  16: {
    questext: "National Civil Services Day is observed on which date?",
    options: ["24 April", "21 April", "18 April", "26 April"],
    correct: "2",
    exptext: "✅ National Civil Services Day is on 21 April. 📌 Remember 21 for services and 24 for panchayats. ❌ 24 April is tempting because it is also an April day for governance."
  },
  17: {
    questext: "World Heritage Day is observed on which date?",
    options: ["22 April", "2 April", "18 April", "25 April"],
    correct: "3",
    exptext: "✅ World Heritage Day is on 18 April. 📌 It is a few days before Earth Day on 22 April. ❌ 22 April is tempting because it is World Earth Day."
  },
  18: {
    type: "concept", icon: "🌸", accent: "#10b981", pauseTimer: true,
    title: "May",
    html: `
      <p class="cp-lead">May is a busy month with <u>Labour Day, Press Freedom Day, Technology Day and Anti-Tobacco Day</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/9.png" alt="May Day Labour Day rally photo" data-caption="Workers gather on International Labour Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/10.png" alt="Pokhran nuclear test site photo" data-caption="Pokhran is the site of the nuclear tests that National Technology Day remembers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>International Labour Day, Maharashtra Day, Gujarat Day</td></tr><tr><td>3</td><td>World Press Freedom Day</td></tr><tr><td>First Tuesday</td><td>World Asthma Day</td></tr><tr><td>7</td><td>World Athletics Day</td></tr><tr><td>8</td><td>World Red Cross Day and World Thalassemia Day</td></tr><tr><td>Second Sunday</td><td>Mother's Day</td></tr><tr><td>9</td><td>Rabindranath Tagore Jayanti</td></tr><tr><td>11</td><td>National Technology Day</td></tr><tr><td>12</td><td>International Nurses Day</td></tr><tr><td>Full moon day</td><td>Buddha Jayanti or Buddha Purnima</td></tr><tr><td>17</td><td>World Telecommunication Day and World Hypertension Day</td></tr><tr><td>18</td><td>International Museum Day</td></tr><tr><td>21</td><td>National Anti-Terrorism Day and International Tea Day</td></tr><tr><td>22</td><td>International Day for Biological Diversity</td></tr><tr><td>25</td><td>World Thyroid Day</td></tr><tr><td>31</td><td>World No Tobacco Day</td></tr></tbody></table>
      <div class="cp-note trap">Maharashtra and Gujarat were formed on 1 May 1960. Buddha Purnima is not on a fixed date, because it follows the full moon in April or May.</div>
      <div class="cp-note exam">National Technology Day, on 11 May, marks the Pokhran nuclear tests of 1998. International Nurses Day, on 12 May, is the birthday of Florence Nightingale.</div>
    `
  },
  19: {
    questext: "National Technology Day is observed on which date?",
    options: ["31 May", "12 May", "21 May", "11 May"],
    correct: "4",
    exptext: "✅ National Technology Day is on 11 May, for the Pokhran tests of 1998. 📌 Eleven May, eleven tests days. ❌ 12 May is tempting because it is International Nurses Day."
  },
  20: {
    questext: "World No Tobacco Day is observed on which date?",
    options: ["31 May", "21 May", "17 May", "25 May"],
    correct: "1",
    exptext: "✅ World No Tobacco Day is on 31 May. 📌 It is the last day of May. ❌ 21 May is tempting because it is National Anti-Terrorism Day."
  },
  21: {
    questext: "Which state came into existence on 1 May 1960 along with Maharashtra?",
    options: ["Goa", "Gujarat", "Karnataka", "Punjab"],
    correct: "2",
    exptext: "✅ Gujarat and Maharashtra were created on 1 May 1960 when the Bombay State was split. 📌 Two states, one day. ❌ Goa is tempting because it is also on the western coast, but it joined India in 1961."
  },
  22: {
    type: "concept", icon: "☀️", accent: "#eab308", pauseTimer: true,
    title: "June",
    html: `
      <p class="cp-lead">June is the month of <u>World Environment Day, International Yoga Day and World Blood Donor Day</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/11.png" alt="International Yoga Day mass yoga photo" data-caption="People perform yoga together on International Yoga Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/12.png" alt="World Environment Day tree planting photo" data-caption="People plant a sapling on World Environment Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>World Milk Day</td></tr><tr><td>2</td><td>International Sex Workers' Day and Telangana Formation Day</td></tr><tr><td>3</td><td>World Bicycle Day</td></tr><tr><td>5</td><td>World Environment Day</td></tr><tr><td>7</td><td>World Food Safety Day</td></tr><tr><td>8</td><td>World Oceans Day</td></tr><tr><td>12</td><td>World Day Against Child Labour</td></tr><tr><td>14</td><td>World Blood Donor Day</td></tr><tr><td>20</td><td>World Refugee Day</td></tr><tr><td>21</td><td>International Yoga Day</td></tr><tr><td>23</td><td>International Olympic Day</td></tr><tr><td>27</td><td>Micro, Small and Medium Enterprises Day</td></tr><tr><td>29</td><td>National Statistics Day</td></tr></tbody></table>
      <div class="cp-note trap">World Environment Day is on 5 June, and World Oceans Day is on 8 June. They are close, so read the question carefully.</div>
      <div class="cp-note exam">International Yoga Day, on 21 June, was first held in 2015 after a proposal by India at the United Nations. Telangana became a state on 2 June 2014.</div>
    `
  },
  23: {
    questext: "International Yoga Day is observed on which date?",
    options: ["14 June", "5 June", "21 June", "23 June"],
    correct: "3",
    exptext: "✅ International Yoga Day is on 21 June, the longest day of the year in the north. 📌 It was first observed in 2015. ❌ 23 June is tempting because it is International Olympic Day."
  },
  24: {
    questext: "World Blood Donor Day is observed on which date?",
    options: ["12 June", "8 June", "20 June", "14 June"],
    correct: "4",
    exptext: "✅ World Blood Donor Day is on 14 June. 📌 It is the birthday of Karl Landsteiner, who found blood groups. ❌ 12 June is tempting because it is World Day Against Child Labour."
  },
  25: {
    questext: "Telangana Formation Day is observed on which date?",
    options: ["2 June", "1 June", "1 November", "26 January"],
    correct: "1",
    exptext: "✅ Telangana became a state on 2 June 2014. 📌 It is the newest state of India. ❌ 1 November is tempting because many states were formed on that date."
  },
  26: {
    type: "concept", icon: "⚔️", accent: "#ef4444", pauseTimer: true,
    title: "July",
    html: `
      <p class="cp-lead">July is short on dates, but <u>Doctors' Day, Population Day and Kargil Vijay Diwas</u> are often asked.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/13.png" alt="Kargil War Memorial Dras photo" data-caption="The Kargil War Memorial at Dras honours soldiers of the 1999 war." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/14.png" alt="Bengal tiger photo" data-caption="A Bengal tiger, the animal that International Tiger Day protects." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>National Doctors' Day, National Postal Worker Day and Chartered Accountants Day</td></tr><tr><td>11</td><td>World Population Day</td></tr><tr><td>26</td><td>Kargil Vijay Diwas</td></tr><tr><td>28</td><td>World Hepatitis Day and World Nature Conservation Day</td></tr><tr><td>29</td><td>International Tiger Day</td></tr></tbody></table>
      <div class="cp-note trap">Doctors' Day on 1 July honours Dr. Bidhan Chandra Roy, who was born and died on the same date.</div>
      <div class="cp-note exam">Kargil Vijay Diwas, on 26 July, marks the victory in the Kargil War of 1999.</div>
    `
  },
  27: {
    questext: "Kargil Vijay Diwas is observed on which date?",
    options: ["15 August", "26 July", "16 December", "15 January"],
    correct: "2",
    exptext: "✅ Kargil Vijay Diwas is on 26 July, for the victory of 1999. 📌 Kargil in July and Vijay Diwas in December are two different wars. ❌ 16 December is tempting because it is Vijay Diwas for 1971."
  },
  28: {
    questext: "World Population Day is observed on which date?",
    options: ["28 July", "1 July", "11 July", "29 July"],
    correct: "3",
    exptext: "✅ World Population Day is on 11 July. 📌 It was started in 1989 after the world reached five billion people. ❌ 29 July is tempting because it is International Tiger Day."
  },
  29: {
    questext: "National Doctors' Day in India honours which person?",
    options: ["Dr. B. R. Ambedkar", "Dr. S. Radhakrishnan", "Dr. A. P. J. Abdul Kalam", "Dr. Bidhan Chandra Roy"],
    correct: "4",
    exptext: "✅ National Doctors' Day honours Dr. Bidhan Chandra Roy. 📌 He was a physician and the Chief Minister of West Bengal. ❌ Dr. Radhakrishnan is tempting because of Teachers' Day, but that is on 5 September."
  },
  30: {
    type: "concept", icon: "🇮🇳", accent: "#a855f7", pauseTimer: true,
    title: "August",
    html: `
      <p class="cp-lead">August has <u>Quit India Day, Independence Day, National Sports Day and Handloom Day</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/15.png" alt="Hiroshima Peace Memorial photo" data-caption="The Hiroshima Peace Memorial stands for those killed by the atomic bomb." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/16.png" alt="Major Dhyan Chand hockey photo" data-caption="Major Dhyan Chand, whose birthday is celebrated as National Sports Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>6</td><td>Hiroshima Day</td></tr><tr><td>First Sunday</td><td>Friendship Day</td></tr><tr><td>7</td><td>National Handloom Day and National Javelin Day</td></tr><tr><td>8</td><td>Quit India Movement Day</td></tr><tr><td>9</td><td>Nagasaki Day and International Day of the World's Indigenous Peoples</td></tr><tr><td>12</td><td>International Youth Day and World Elephant Day</td></tr><tr><td>13</td><td>International Left-Handers Day and World Organ Donation Day</td></tr><tr><td>15</td><td>Independence Day of India</td></tr><tr><td>16</td><td>Parsi New Year</td></tr><tr><td>19</td><td>World Photography Day and World Humanitarian Day</td></tr><tr><td>20</td><td>World Mosquito Day and Sadbhavana Diwas</td></tr><tr><td>26</td><td>Women's Equality Day</td></tr><tr><td>29</td><td>National Sports Day</td></tr></tbody></table>
      <div class="cp-note trap">The bomb of Hiroshima on 6 August 1945 was called Little Boy, and the bomb of Nagasaki on 9 August was called Fat Man.</div>
      <div class="cp-note exam">National Sports Day, on 29 August, is the birthday of the hockey wizard Major Dhyan Chand. National Handloom Day, on 7 August, recalls the Swadeshi Movement of 1905.</div>
    `
  },
  31: {
    questext: "National Sports Day is observed on which date?",
    options: ["29 August", "20 August", "7 August", "26 August"],
    correct: "1",
    exptext: "✅ National Sports Day is on 29 August, the birthday of Major Dhyan Chand. 📌 He was the hockey wizard. ❌ 7 August is tempting because it is National Javelin Day."
  },
  32: {
    questext: "Quit India Movement Day is observed on which date?",
    options: ["9 August", "8 August", "15 August", "7 August"],
    correct: "2",
    exptext: "✅ The Quit India Movement was launched on 8 August 1942. 📌 It began at Gowalia Tank in Mumbai. ❌ 9 August is tempting because Gandhi was arrested on that date."
  },
  33: {
    questext: "Sadbhavana Diwas is observed on which date?",
    options: ["19 August", "26 August", "20 August", "12 August"],
    correct: "3",
    exptext: "✅ Sadbhavana Diwas is on 20 August, the birthday of Rajiv Gandhi. 📌 It is the day of goodwill. ❌ 19 August is tempting because it is World Photography Day."
  },
  34: {
    type: "concept", icon: "🍎", accent: "#84cc16", pauseTimer: true,
    title: "September",
    html: `
      <p class="cp-lead">September's important dates are <u>Teachers' Day, Hindi Diwas, Engineers' Day, Ozone Day and Peace Day</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/17.png" alt="Sarvepalli Radhakrishnan portrait photo" data-caption="Sarvepalli Radhakrishnan, whose birthday is celebrated as Teachers' Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/18.png" alt="Ozone layer Antarctica NASA photo" data-caption="The ozone layer is protected through World Ozone Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1 to 7</td><td>National Nutrition Week</td></tr><tr><td>5</td><td>International Day of Charity and Teachers' Day in India</td></tr><tr><td>8</td><td>International Literacy Day</td></tr><tr><td>10</td><td>World Suicide Prevention Day</td></tr><tr><td>14</td><td>World First Aid Day and Hindi Diwas</td></tr><tr><td>15</td><td>Engineers' Day in India and International Day of Democracy</td></tr><tr><td>16</td><td>World Ozone Day</td></tr><tr><td>21</td><td>International Day of Peace and World Alzheimer's Day</td></tr><tr><td>22</td><td>Rose Day (Welfare of Cancer Patients) and World Rhino Day</td></tr><tr><td>27</td><td>World Tourism Day</td></tr><tr><td>Last Thursday</td><td>World Maritime Day</td></tr></tbody></table>
      <div class="cp-note trap">Hindi Diwas is on 14 September, because Hindi was accepted as the official language in 1949. World Hindi Day is on 10 January.</div>
      <div class="cp-note exam">Teachers' Day, on 5 September, is the birthday of Dr. Sarvepalli Radhakrishnan, and Engineers' Day, on 15 September, is the birthday of Sir M. Visvesvaraya.</div>
    `
  },
  35: {
    questext: "Teachers' Day is celebrated in India on which date?",
    options: ["15 September", "5 October", "14 September", "5 September"],
    correct: "4",
    exptext: "✅ Teachers' Day is on 5 September, the birthday of Dr. Sarvepalli Radhakrishnan. 📌 World Teachers' Day is on 5 October. ❌ 5 October is tempting because it is the international date."
  },
  36: {
    questext: "Engineers' Day in India is observed on which date?",
    options: ["15 September", "14 September", "16 September", "5 September"],
    correct: "1",
    exptext: "✅ Engineers' Day is on 15 September, to honour Sir M. Visvesvaraya. 📌 It comes the day after Hindi Diwas. ❌ 14 September is tempting because it is Hindi Diwas."
  },
  37: {
    questext: "Consider the following statements about the days of September:\n1. World Ozone Day is observed on 16 September.\n2. International Day of Peace is observed on 21 September.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Ozone is on 16 and Peace is on 21. ❌ \"Only 1\" is tempting because the ozone date is better known."
  },
  38: {
    type: "concept", icon: "🕊️", accent: "#06b6d4", pauseTimer: true,
    title: "October",
    html: `
      <p class="cp-lead">October holds <u>Gandhi Jayanti, Air Force Day, United Nations Day and National Unity Day</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/19.png" alt="Mahatma Gandhi portrait photo" data-caption="Mahatma Gandhi, whose birthday is celebrated on 2 October." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/20.png" alt="Statue of Unity Gujarat photo" data-caption="The Statue of Unity honours Sardar Vallabhbhai Patel, whose birthday is National Unity Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>International Day of Older Persons</td></tr><tr><td>2</td><td>Gandhi Jayanti and International Day of Non-Violence</td></tr><tr><td>5</td><td>World Teachers' Day</td></tr><tr><td>8</td><td>Indian Air Force Day</td></tr><tr><td>9</td><td>World Postal Day</td></tr><tr><td>10</td><td>World Mental Health Day</td></tr><tr><td>11</td><td>International Day of the Girl Child</td></tr><tr><td>13</td><td>International Day for Disaster Risk Reduction</td></tr><tr><td>16</td><td>World Food Day</td></tr><tr><td>17</td><td>International Day for the Eradication of Poverty</td></tr><tr><td>20</td><td>World Statistics Day</td></tr><tr><td>24</td><td>United Nations Day and World Development Information Day</td></tr><tr><td>30</td><td>World Thrift Day</td></tr><tr><td>31</td><td>National Unity Day and Halloween Day</td></tr></tbody></table>
      <div class="cp-note trap">World Teachers' Day is on 5 October, but India's Teachers' Day is on 5 September.</div>
      <div class="cp-note exam">National Unity Day, on 31 October, is the birthday of Sardar Vallabhbhai Patel. Indian Air Force Day, on 8 October, marks the founding in 1932.</div>
    `
  },
  39: {
    questext: "Indian Air Force Day is observed on which date?",
    options: ["15 January", "8 October", "4 December", "9 October"],
    correct: "2",
    exptext: "✅ Air Force Day is on 8 October, to mark the force founded in 1932. 📌 Eight for the eighth of October. ❌ 4 December is tempting because it is Navy Day."
  },
  40: {
    questext: "National Unity Day is observed on the birthday of which leader?",
    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Subhas Chandra Bose"],
    correct: "3",
    exptext: "✅ National Unity Day, on 31 October, honours Sardar Patel. 📌 He united the princely states. ❌ Jawaharlal Nehru is tempting because Children's Day is also in the end of the year."
  },
  41: {
    questext: "United Nations Day is observed on which date?",
    options: ["31 October", "24 September", "10 October", "24 October"],
    correct: "4",
    exptext: "✅ United Nations Day is on 24 October, for the charter that came into force in 1945. 📌 The twenty-fourth of October. ❌ 31 October is tempting because it is National Unity Day."
  },
  42: {
    type: "concept", icon: "🧒", accent: "#0d9488", pauseTimer: true,
    title: "November",
    html: `
      <p class="cp-lead">November is the month of <u>Children's Day, Education Day, Constitution Day and the formation of many states</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/21.png" alt="Jawaharlal Nehru with children photo" data-caption="Jawaharlal Nehru, whose birthday is celebrated as Children's Day." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/22.png" alt="Constitution of India Samvidhan Sadan photo" data-caption="The Constitution of India was adopted on 26 November 1949." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>State formation day of Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, Haryana, Punjab, Chhattisgarh and Madhya Pradesh</td></tr><tr><td>6</td><td>International Day for Preventing the Exploitation of the Environment in War and Armed Conflict</td></tr><tr><td>7</td><td>Infant Protection Day and National Cancer Awareness Day</td></tr><tr><td>11</td><td>National Education Day</td></tr><tr><td>12</td><td>World Pneumonia Day</td></tr><tr><td>14</td><td>World Diabetes Day and Children's Day</td></tr><tr><td>19</td><td>International Men's Day, World Toilet Day and National Integration Day</td></tr><tr><td>25</td><td>International Day for the Elimination of Violence against Women</td></tr><tr><td>26</td><td>Constitution Day of India</td></tr><tr><td>29</td><td>International Day of Solidarity with the Palestinian People</td></tr></tbody></table>
      <div class="cp-note trap">Tamil Nadu, Karnataka and Kerala celebrate 1 November as their state day, but each reached its present form at a different time.</div>
      <div class="cp-note exam">National Education Day, on 11 November, is the birthday of Maulana Abul Kalam Azad. Constitution Day, on 26 November, marks the adoption of the Constitution in 1949.</div>
    `
  },
  43: {
    questext: "Children's Day is observed in India on which date?",
    options: ["14 November", "26 November", "11 November", "19 November"],
    correct: "1",
    exptext: "✅ Children's Day is on 14 November, the birthday of Jawaharlal Nehru. 📌 Chacha Nehru loved children. ❌ 19 November is tempting because it is National Integration Day."
  },
  44: {
    questext: "Constitution Day of India is observed on which date?",
    options: ["26 January", "26 November", "25 January", "14 November"],
    correct: "2",
    exptext: "✅ Constitution Day is on 26 November, for the adoption of the Constitution in 1949. 📌 The Constitution came into force on 26 January 1950. ❌ 26 January is tempting because it is Republic Day."
  },
  45: {
    questext: "National Education Day honours which leader?",
    options: ["Rajendra Prasad", "Dr. Sarvepalli Radhakrishnan", "Maulana Abul Kalam Azad", "Zakir Husain"],
    correct: "3",
    exptext: "✅ National Education Day, on 11 November, honours Maulana Abul Kalam Azad. 📌 He was the first Education Minister. ❌ Dr. Radhakrishnan is tempting because of Teachers' Day."
  },
  46: {
    type: "concept", icon: "🎄", accent: "#be123c", pauseTimer: true,
    title: "December",
    html: `
      <p class="cp-lead">December is full of <u>Navy Day, Armed Forces Flag Day, Human Rights Day, Vijay Diwas and Kisan Diwas</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/23.png" alt="Indian Navy warship photo" data-caption="An Indian Navy warship sails on the sea." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Important_Days/24.png" alt="Chaudhary Charan Singh farmer Kisan Diwas photo" data-caption="Chaudhary Charan Singh, whose birthday is celebrated as Kisan Diwas." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>1</td><td>World AIDS Day</td></tr><tr><td>2</td><td>National Pollution Control Day, World Computer Literacy Day and International Day for the Abolition of Slavery</td></tr><tr><td>3</td><td>International Day of Persons with Disabilities</td></tr><tr><td>4</td><td>Indian Navy Day</td></tr><tr><td>5</td><td>International Volunteer Day and World Soil Day</td></tr><tr><td>7</td><td>Armed Forces Flag Day and International Civil Aviation Day</td></tr><tr><td>9</td><td>International Anti-Corruption Day</td></tr><tr><td>10</td><td>Human Rights Day</td></tr><tr><td>11</td><td>International Mountain Day</td></tr><tr><td>14</td><td>National Energy Conservation Day</td></tr><tr><td>16</td><td>Vijay Diwas</td></tr><tr><td>18</td><td>Minorities Rights Day in India and International Migrants Day</td></tr><tr><td>19</td><td>Goa Liberation Day</td></tr><tr><td>20</td><td>International Human Solidarity Day</td></tr><tr><td>22</td><td>National Mathematics Day</td></tr><tr><td>23</td><td>Kisan Diwas</td></tr><tr><td>24</td><td>National Consumer Rights Day</td></tr><tr><td>25</td><td>National Good Governance Day in memory of Atal Bihari Vajpayee's birthday</td></tr><tr><td>26</td><td>Veer Bal Diwas</td></tr><tr><td>31</td><td>New Year's Eve</td></tr></tbody></table>
      <div class="cp-note trap">Vijay Diwas on 16 December marks the 1971 victory over Pakistan, while Kargil Vijay Diwas is on 26 July.</div>
      <div class="cp-note exam">Goa was freed from Portuguese rule on 19 December 1961. National Mathematics Day, on 22 December, is the birthday of Srinivasa Ramanujan.</div>
    `
  },
  47: {
    questext: "Indian Navy Day is observed on which date?",
    options: ["16 December", "8 October", "7 December", "4 December"],
    correct: "4",
    exptext: "✅ Navy Day is on 4 December, for the attack on Karachi harbour in 1971. 📌 Navy is four, four December. ❌ 7 December is tempting because it is Armed Forces Flag Day."
  },
  48: {
    questext: "National Mathematics Day honours which mathematician?",
    options: ["Srinivasa Ramanujan", "Aryabhata", "Brahmagupta", "Bhaskara"],
    correct: "1",
    exptext: "✅ National Mathematics Day, on 22 December, is the birthday of Srinivasa Ramanujan. 📌 Ramanujan was born in 1887. ❌ Aryabhata is tempting because he is also a famous mathematician, but he has no national day."
  },
  49: {
    questext: "Kisan Diwas is observed on the birthday of which leader?",
    options: ["Lal Bahadur Shastri", "Charan Singh", "Atal Bihari Vajpayee", "Rajiv Gandhi"],
    correct: "2",
    exptext: "✅ Kisan Diwas, on 23 December, is the birthday of Chaudhary Charan Singh. 📌 He was a leader of farmers. ❌ Atal Bihari Vajpayee is tempting because his birthday is on 25 December, as Good Governance Day."
  },
  50: {
    questext: "Goa Liberation Day is observed on which date?",
    options: ["26 December", "16 December", "19 December", "18 December"],
    correct: "3",
    exptext: "✅ Goa Liberation Day is on 19 December, for the freedom from Portuguese rule in 1961. 📌 Operation Vijay freed Goa. ❌ 16 December is tempting because it is Vijay Diwas for the 1971 war."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Static_GK/Important_Days/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a clean calendar page with a gold ring binding, a small globe and a subtle Indian flag ribbon" },
  "images/General_Awareness/Static_GK/Important_Days/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Swami Vivekananda statue National Youth Day photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/1.png. a statue of Swami Vivekananda",
  "images/General_Awareness/Static_GK/Important_Days/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian Army Day parade photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/2.png. soldiers at the Army Day parade",
  "images/General_Awareness/Static_GK/Important_Days/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"C. V. Raman scientist photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/3.png. Sir C. V. Raman",
  "images/General_Awareness/Static_GK/Important_Days/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian Coast Guard ship photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/4.png. a Coast Guard ship",
  "images/General_Awareness/Static_GK/Important_Days/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"International Women's Day march photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/5.png. women at an International Women's Day event",
  "images/General_Awareness/Static_GK/Important_Days/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"House sparrow bird photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/6.png. a house sparrow",
  "images/General_Awareness/Static_GK/Important_Days/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Panchayat meeting village India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/7.png. a village panchayat meeting",
  "images/General_Awareness/Static_GK/Important_Days/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Earth Day planet climate photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/8.png. the Earth from space",
  "images/General_Awareness/Static_GK/Important_Days/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"May Day Labour Day rally photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/9.png. workers at a Labour Day rally",
  "images/General_Awareness/Static_GK/Important_Days/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pokhran nuclear test site photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/10.png. a monument at Pokhran",
  "images/General_Awareness/Static_GK/Important_Days/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"International Yoga Day mass yoga photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/11.png. people doing yoga together",
  "images/General_Awareness/Static_GK/Important_Days/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"World Environment Day tree planting photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/12.png. people planting a tree",
  "images/General_Awareness/Static_GK/Important_Days/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kargil War Memorial Dras photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/13.png. the Kargil War Memorial",
  "images/General_Awareness/Static_GK/Important_Days/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bengal tiger photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/14.png. a Bengal tiger",
  "images/General_Awareness/Static_GK/Important_Days/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hiroshima Peace Memorial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/15.png. the Hiroshima Peace Memorial",
  "images/General_Awareness/Static_GK/Important_Days/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Major Dhyan Chand hockey photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/16.png. Major Dhyan Chand",
  "images/General_Awareness/Static_GK/Important_Days/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sarvepalli Radhakrishnan portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/17.png. Sarvepalli Radhakrishnan",
  "images/General_Awareness/Static_GK/Important_Days/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ozone layer Antarctica NASA photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/18.png. the ozone hole",
  "images/General_Awareness/Static_GK/Important_Days/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahatma Gandhi portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/19.png. Mahatma Gandhi",
  "images/General_Awareness/Static_GK/Important_Days/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Statue of Unity Gujarat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/20.png. the Statue of Unity",
  "images/General_Awareness/Static_GK/Important_Days/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jawaharlal Nehru with children photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/21.png. Jawaharlal Nehru with children",
  "images/General_Awareness/Static_GK/Important_Days/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Constitution of India Samvidhan Sadan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/22.png. the Constitution of India",
  "images/General_Awareness/Static_GK/Important_Days/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian Navy warship photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/23.png. an Indian Navy warship",
  "images/General_Awareness/Static_GK/Important_Days/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chaudhary Charan Singh farmer Kisan Diwas photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Important_Days/24.png. Chaudhary Charan Singh"
});

/* CHANGE LOG
   - National Tourism Day is written for 25 January (the map shows International Tourism Day).
   - Buddha Purnima is shown on the full moon day because its date changes each year (the map gives 16 May).
   - The Nagasaki bomb is named Fat Man (the map has Fat Boy).
   - World Maritime Day is written only as the last Thursday of September.
   - National Integration Day is placed on 19 November, which is the correct date (the map shows it under December).
   - National Mourning Day of Bangladesh is left out because it was removed in 2024.
*/