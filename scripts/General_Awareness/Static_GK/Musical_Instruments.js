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

/* Field: General_Awareness · Subject: Static_GK · Chapter: Musical_Instruments · 20 concept pages (+ overview) · 31 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎵", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Musical Instruments and Musicians",
    thumb: {
      image: "images/General_Awareness/Static_GK/Musical_Instruments/thumbnail.png",
      banner: "STATIC GK 2026",
      line1: "MUSICAL",
      line2: "INSTRUMENTS",
      line3: "MASTERS AND AWARDS",
      badge: "FULL CLASS",
      ribbon: "SITAR • TABLA • FLUTE • SHEHNAI",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Musical Instruments and Musicians | Static GK for SSC CGL",
      altTitles: ["Instrument and Musician Match Trick", "Indian Classical Instruments in One Class"],
      description: "Instrument and musician questions are sure marks in Static GK. In this class we learn each instrument, its great masters and the awards linked with them, with the traps exams use.\n\n📌 IN THIS CLASS\n✅ Four classes of instruments\n✅ Sitar, tabla, flute, shehnai and more\n✅ Awards and Grammy facts\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Classification\n\n👍 Like, share, subscribe.\n\n#SSCCGL #StaticGK #MusicalInstruments",
      tags: ["musical instruments", "indian musical instruments", "instruments and musicians", "static gk", "ssc cgl static gk", "ravi shankar sitar", "zakir hussain tabla", "bismillah khan shehnai", "hariprasad chaurasia", "santoor", "sarod", "tantu vadya", "sushir vadya", "avanaddha vadya", "ghana vadya", "art and culture", "gk for competitive exams", "railway exam gk", "banking exam gk", "defence exam gk", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "Musical Instrumen"],
      hashtags: ["SSCCGL", "StaticGK", "MusicalInstruments"],
      thumbText: "INSTRUMENTS AND MUSICIANS",
      pinnedComment: "📌 Which dance did you find hardest? Write the dance and state below 👇",
      communityPost: "🎵 New class is live: Musical Instruments and Musicians. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Basic idea",
      playlist: "Static GK — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple class on the musical instruments of India and the great musicians linked with each</u>. Exams ask which musician plays which instrument, and which award or album he or she won.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>20</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>31</b><span>Questions</span></div>
        <div class="cp-stat"><b>~71 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Classification</b><br>The four groups of instruments and the Indian and scientific names of each.</li>
        <li><b>String instruments</b><br>Sitar, sarod, sarangi, veena, Rudra Veena, violin, surbahar, guitar and Mohan Veena, with the masters of each.</li>
        <li><b>Wind instruments</b><br>Flute, shehnai, nadaswaram and harmonium, with famous players and awards.</li>
        <li><b>Percussion instruments</b><br>Tabla, pakhawaj, mridangam, ghatam and drums, with their masters.</li>
        <li><b>Awards and albums</b><br>Bharat Ratna, Padma awards and Grammy awards that exams link with these musicians.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Questions on musicians and instruments appear often in Static General Knowledge, and they are easy marks once the pair of person and instrument is learnt.</div>
    `
  },
  2: {
    type: "concept", icon: "🎼", accent: "#4f46e5", pauseTimer: true,
    title: "Classification of Musical Instruments",
    html: `
      <p class="cp-lead">Indian music divides all instruments into <u>four groups, depending on how the sound is made</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/1.png" alt="Four boxes: Tantu Vadya (string, chordophone), Sushir Vadya (wind, aerophone), Avanaddha V" data-caption="The four classes of instruments, with their Indian and scientific names." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/2.png" alt="Indian classical instruments sitar tabla flute shehnai photo" data-caption="Indian instruments such as the sitar, tabla and flute belong to different classes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>This system comes from the old Sanskrit text on drama, the Natya Shastra. Each group has an Indian name and a scientific name. A sitar makes sound from a vibrating string, a flute from vibrating air, a tabla from a stretched skin, and a bell or cymbal from its own solid body.</p>
      <table><thead><tr><th>Indian name</th><th>Scientific name</th><th>Sound comes from</th><th>Example</th></tr></thead><tbody><tr><td>Tantu Vadya</td><td>Chordophone</td><td>Vibrating strings</td><td>Sitar, sarod, veena</td></tr><tr><td>Sushir Vadya</td><td>Aerophone</td><td>Vibrating air</td><td>Flute, shehnai</td></tr><tr><td>Avanaddha Vadya</td><td>Membranophone</td><td>Stretched animal skin that is struck</td><td>Tabla, mridangam</td></tr><tr><td>Ghana Vadya</td><td>Idiophone</td><td>The solid body itself, when struck</td><td>Ghatam, cymbals</td></tr></tbody></table>
      <div class="cp-note trap">The santoor has strings that are struck with hammers, but it is still a string instrument. Do not call it a percussion instrument because of the hammers.</div>
      <div class="cp-note exam">Remember the word pairs: Tantu is string, Sushir is wind, Avanaddha is skin drum, and Ghana is solid.</div>
      <div class="cp-mnemonic">Tantu strings, Sushir sighs, Avanaddha skins, Ghana is solid.</div>
    `
  },
  3: {
    questext: "Which group of Indian instruments is called Sushir Vadya?",
    options: ["String instruments", "Skin drums", "Wind instruments", "Solid instruments"],
    correct: "3",
    exptext: "✅ Sushir Vadya means wind instruments, such as the flute and the shehnai. 📌 Sushir sounds like a sigh, which is air. ❌ String instruments is tempting, but those are called Tantu Vadya."
  },
  4: {
    questext: "Tabla and mridangam belong to which scientific class of instruments?",
    options: ["Chordophone", "Idiophone", "Aerophone", "Membranophone"],
    correct: "4",
    exptext: "✅ They have a stretched animal skin, so they are membranophones, called Avanaddha Vadya. 📌 Membrane means skin. ❌ Idiophone is tempting because the ghatam is also percussion, but it is solid clay without a skin."
  },
  5: {
    type: "concept", icon: "🎸", accent: "#22c55e", pauseTimer: true,
    title: "Sitar",
    html: `
      <p class="cp-lead">The sitar is the <u>best known string instrument of Hindustani music</u>, and its sound made Pandit Ravi Shankar famous across the world.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/3.png" alt="Sitar instrument Indian classical photo" data-caption="A sitar has a long neck, many frets and a large gourd at its base." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/4.png" alt="Pandit Ravi Shankar sitar performance photo" data-caption="Pandit Ravi Shankar plays the sitar on stage in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Pandit Ravi Shankar received the Bharat Ratna in 1999. He was the first Indian to receive a Grammy award, for the album West Meets East, in 1968, and he is known for winning many Grammy awards. Ustad Vilayat Khan and Ustad Imrat Khan belong to the Imdadkhani Gharana, a family style of playing.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Pandit Ravi Shankar</td><td>Bharat Ratna 1999, Grammy for West Meets East in 1968</td></tr><tr><td>Anushka Shankar</td><td>Daughter of Ravi Shankar</td></tr><tr><td>Vilayat Khan</td><td>Great sitar master of the Imdadkhani Gharana</td></tr><tr><td>Nikhil Banerjee</td><td>Famous sitar player of the Maihar style</td></tr><tr><td>Rajeeva Janardan</td><td>Player of the Imdadkhani Gharana</td></tr></tbody></table>
      <div class="cp-note trap">Ravi Shankar is linked with the sitar, but his guru, Ustad Alauddin Khan, is linked with the sarod.</div>
      <div class="cp-note exam">Ravi Shankar received the Bharat Ratna in 1999, and his Grammy was for the album West Meets East.</div>
      <div class="cp-note tip">Other sitar players on the list: Imrat Khan, Shahid Parvez, Budhaditya Mukherjee, Harishankar Bhattacharya, Arvind Parikh and Anupama Bhagwat.</div>
    `
  },
  6: {
    questext: "Pandit Ravi Shankar is famous for playing which instrument?",
    options: ["Sarod", "Shehnai", "Santoor", "Sitar"],
    correct: "4",
    exptext: "✅ Ravi Shankar was a sitar player and received the Bharat Ratna in 1999. 📌 Shankar and sitar both start with S. ❌ Sarod is tempting because his guru Alauddin Khan played it."
  },
  7: {
    questext: "Ravi Shankar was the first Indian to receive a Grammy award for which album?",
    options: ["Planet Drum", "A Meeting by the River", "West Meets East", "Call of the Valley"],
    correct: "3",
    exptext: "✅ West Meets East, made with violinist Yehudi Menuhin, won the Grammy in 1968. 📌 East and West met, so it was a world first. ❌ A Meeting by the River is tempting, but it won the Grammy for Vishwa Mohan Bhatt."
  },
  8: {
    type: "concept", icon: "🥁", accent: "#f59e0b", pauseTimer: true,
    title: "Tabla",
    html: `
      <p class="cp-lead">The tabla is a <u>pair of hand drums, the dayan and the bayan, and it is the main drum of Hindustani music</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/5.png" alt="Tabla pair dayan bayan Indian drums photo" data-caption="A tabla set has a smaller right drum and a larger left drum." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/6.png" alt="Zakir Hussain tabla performance photo" data-caption="Ustad Zakir Hussain plays the tabla at a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Ustad Zakir Hussain is the son of the tabla master Ustad Alla Rakha. He received the Padma Shri, the Padma Bhushan in 2002 and the Padma Vibhushan in 2023. At the Grammy awards of 2024 he won three awards, for the works Pashto, As We Speak and This Moment.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Ustad Alla Rakha</td><td>Father of Zakir Hussain, great tabla master</td></tr><tr><td>Zakir Hussain</td><td>Padma Bhushan 2002, Padma Vibhushan 2023, three Grammys in 2024</td></tr><tr><td>Nikhil Ghosh</td><td>Padma Bhushan awardee, father of Bickram Ghosh</td></tr><tr><td>Bickram Ghosh</td><td>Music composer and Indian classical player</td></tr><tr><td>Ananda Gopal Bandopadhyay</td><td>Benaras Gharana</td></tr></tbody></table>
      <div class="cp-note trap">Zakir Hussain is a tabla player, not a sitar player. Questions often swap the two famous names, Ravi Shankar and Zakir Hussain.</div>
      <div class="cp-note exam">Remember Padma Bhushan in 2002 and Padma Vibhushan in 2023 for Zakir Hussain.</div>
      <div class="cp-note tip">Other tabla players on the list: Anokhelal Mishra and Swapan Chaudhuri.</div>
    `
  },
  9: {
    questext: "Zakir Hussain, a famous tabla player, was awarded the Padma Vibhushan in which year?",
    options: ["2002", "2018", "2023", "2024"],
    correct: "3",
    exptext: "✅ Zakir Hussain received the Padma Vibhushan in 2023. 📌 The Padma Bhushan came first in 2002. ❌ 2002 is tempting because it is the year of his Padma Bhushan."
  },
  10: {
    questext: "Ustad Alla Rakha is the father of which famous musician?",
    options: ["Ravi Shankar", "Hariprasad Chaurasia", "Amjad Ali Khan", "Zakir Hussain"],
    correct: "4",
    exptext: "✅ Alla Rakha was the father of Zakir Hussain. 📌 Both are tabla masters. ❌ Amjad Ali Khan is tempting because he is also a son of a famous musician, but his father was Hafiz Ali Khan."
  },
  11: {
    type: "concept", icon: "🎶", accent: "#ef4444", pauseTimer: true,
    title: "Flute",
    html: `
      <p class="cp-lead">The Indian bamboo flute, called the bansuri, is <u>played by Lord Krishna in stories</u> and is the most famous wind instrument of Indian classical music.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/7.png" alt="Bansuri bamboo flute Indian photo" data-caption="A bansuri is a simple bamboo flute with six or seven holes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/8.png" alt="Hariprasad Chaurasia flute performance photo" data-caption="Pandit Hariprasad Chaurasia plays the long bamboo flute in concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Pandit Hariprasad Chaurasia received the Padma Bhushan in 1992 and the Padma Vibhushan in 2000. Pandit Pannalal Ghosh, whose other name was Amal Jyoti Ghosh, is seen as the pioneer who made the flute a concert instrument.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Hariprasad Chaurasia</td><td>Padma Bhushan 1992, Padma Vibhushan 2000</td></tr><tr><td>Pannalal Ghosh</td><td>Also known as Amal Jyoti Ghosh</td></tr><tr><td>Rakesh Chaurasia</td><td>Nephew and student of Hariprasad Chaurasia</td></tr><tr><td>Rajendra Prasanna</td><td>Flute and shehnai player</td></tr><tr><td>Prabhat Sharma</td><td>Flute player</td></tr></tbody></table>
      <div class="cp-note trap">Hariprasad Chaurasia and Ravi Shankar are both Pandits, but Chaurasia plays the flute and Shankar plays the sitar.</div>
      <div class="cp-note exam">Remember Padma Bhushan 1992 and Padma Vibhushan 2000 for the flute master.</div>
      <div class="cp-note tip">Other flute players on the list: Rajendra Kulkarni.</div>
    `
  },
  12: {
    questext: "Pandit Pannalal Ghosh, a pioneer of the concert flute, was also known by which name?",
    options: ["Nikhil Ghosh", "Bickram Ghosh", "Amal Jyoti Ghosh", "Tarun Ghosh"],
    correct: "3",
    exptext: "✅ Pannalal Ghosh was also called Amal Jyoti Ghosh. 📌 Pannalal is his well known name, and Amal Jyoti is the other. ❌ Nikhil Ghosh is tempting because he is also a Ghosh, but he is a tabla player."
  },
  13: {
    questext: "Hariprasad Chaurasia received the Padma Vibhushan in which year?",
    options: ["1992", "2023", "2002", "2000"],
    correct: "4",
    exptext: "✅ He received the Padma Vibhushan in 2000. 📌 His Padma Bhushan was in 1992. ❌ 1992 is tempting because it is the year of his earlier award."
  },
  14: {
    type: "concept", icon: "🎺", accent: "#8b5cf6", pauseTimer: true,
    title: "Shehnai",
    html: `
      <p class="cp-lead">The shehnai is a reed wind instrument, also called <u>Mangal Vadya</u> because it is played at weddings and auspicious events.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/9.png" alt="Shehnai instrument photo" data-caption="A shehnai is a pipe with a flared end and a double reed at the top." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/10.png" alt="Ustad Bismillah Khan shehnai performance photo" data-caption="Ustad Bismillah Khan plays the shehnai in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Ustad Bismillah Khan made the shehnai famous. He played the shehnai at the Red Fort on the first Independence Day. He received all four of the highest civilian awards of India: the Padma Shri, the Padma Bhushan, the Padma Vibhushan in 1980 and the Bharat Ratna in 2001.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Bismillah Khan</td><td>Played at the Red Fort on first Independence Day, Bharat Ratna 2001</td></tr><tr><td>Raghunath Prasanna</td><td>Also plays the flute</td></tr><tr><td>S. Ballesh</td><td>Shehnai player</td></tr><tr><td>Ali Ahmed</td><td>Shehnai player</td></tr><tr><td>Bageswari Quamar and Krishna Chaudhary</td><td>Shehnai players</td></tr></tbody></table>
      <div class="cp-note trap">Mangal Vadya is the other name of the shehnai, and its group is Sushir Vadya, which means wind instrument.</div>
      <div class="cp-note exam">Bismillah Khan: Padma Vibhushan 1980 and Bharat Ratna 2001. He was born in Bihar and was linked with Varanasi.</div>
    `
  },
  15: {
    questext: "Which musician played the shehnai at the Red Fort on the first Independence Day?",
    options: ["Ravi Shankar", "Zakir Hussain", "Bismillah Khan", "Amjad Ali Khan"],
    correct: "3",
    exptext: "✅ Ustad Bismillah Khan played the shehnai at the Red Fort. 📌 Shehnai means celebration. ❌ Ravi Shankar is tempting because he is more famous abroad, but he played the sitar."
  },
  16: {
    questext: "Bismillah Khan received the Bharat Ratna in which year?",
    options: ["1999", "2001", "1980", "2014"],
    correct: "2",
    exptext: "✅ Bismillah Khan received the Bharat Ratna in 2001. 📌 Ravi Shankar got it in 1999, so the shehnai master came two years later. ❌ 1980 is tempting because it is the year of his Padma Vibhushan."
  },
  17: {
    type: "concept", icon: "❄️", accent: "#14b8a6", pauseTimer: true,
    title: "Santoor",
    html: `
      <p class="cp-lead">The santoor is a <u>hammered string instrument with about a hundred strings</u>, and it is linked with the valley of Kashmir.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/11.png" alt="Santoor instrument Kashmir photo" data-caption="A santoor is a wooden box with many strings that are struck with two light hammers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/12.png" alt="Pandit Shivkumar Sharma santoor performance photo" data-caption="Pandit Shivkumar Sharma plays the santoor on stage in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Pandit Shivkumar Sharma brought the santoor to the world stage as a classical instrument. His son Rahul Sharma also plays it. The player strikes the strings with two small curved hammers, so the instrument looks like percussion but is a string instrument.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Shivkumar Sharma</td><td>Made the santoor famous as a classical instrument</td></tr><tr><td>Rahul Sharma</td><td>Son of Shivkumar Sharma</td></tr><tr><td>Bhajan Sopori</td><td>Santoor player from Kashmir</td></tr><tr><td>Tarun Bhattacharya</td><td>Sangeet Natak Akademi Award in 2018</td></tr><tr><td>Ulhas Bapat</td><td>Santoor player</td></tr></tbody></table>
      <div class="cp-note trap">The santoor is struck with hammers, but it is a string instrument, so its class is Tantu Vadya.</div>
      <div class="cp-note exam">Shivkumar Sharma and Rahul Sharma are a famous father and son pair of the santoor.</div>
    `
  },
  18: {
    questext: "Rahul Sharma is a famous player of which instrument?",
    options: ["Flute", "Sarod", "Santoor", "Tabla"],
    correct: "3",
    exptext: "✅ Rahul Sharma plays the santoor, like his father Shivkumar Sharma. 📌 Sharma family means santoor. ❌ Tabla is tempting because Zakir Hussain also follows his father, but Rahul Sharma plays the santoor."
  },
  19: {
    questext: "Tarun Bhattacharya, who received the Sangeet Natak Akademi Award in 2018, plays which instrument?",
    options: ["Sitar", "Santoor", "Shehnai", "Sarangi"],
    correct: "2",
    exptext: "✅ Tarun Bhattacharya is a santoor player. 📌 T for Tarun and T for the hammer tune of the santoor. ❌ Sitar is tempting because many Bengali musicians play it, but this artist plays the santoor."
  },
  20: {
    type: "concept", icon: "🪕", accent: "#ec4899", pauseTimer: true,
    title: "Sarod",
    html: `
      <p class="cp-lead">The sarod is a <u>fretless string instrument with a metal fingerboard</u>, and its great masters belong to the Maihar and Gwalior Bangash styles.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/13.png" alt="Sarod instrument photo" data-caption="A sarod has no frets and a shiny metal fingerboard." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/14.png" alt="Ustad Amjad Ali Khan sarod performance photo" data-caption="Ustad Amjad Ali Khan plays the sarod in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Ustad Alauddin Khan founded the Maihar Gharana and taught Ravi Shankar and his own son, Ustad Ali Akbar Khan. Ustad Amjad Ali Khan is the son of Ustad Hafiz Ali Khan. Rajeev Taranath was a disciple of Ali Akbar Khan.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Alauddin Khan</td><td>Founder of the Maihar Gharana</td></tr><tr><td>Ali Akbar Khan</td><td>Son and student of Alauddin Khan</td></tr><tr><td>Amjad Ali Khan</td><td>Son of Hafiz Ali Khan</td></tr><tr><td>Hafiz Ali Khan</td><td>Father of Amjad Ali Khan</td></tr><tr><td>Rajeev Taranath</td><td>Disciple of Ali Akbar Khan</td></tr></tbody></table>
      <div class="cp-note trap">The sarod has no frets, while the sitar has many frets. Questions use this difference.</div>
      <div class="cp-note exam">The Maihar Gharana is linked with Alauddin Khan, and he taught both Ravi Shankar and Ali Akbar Khan.</div>
      <div class="cp-note tip">Other sarod players on the list: Buddhadev Dasgupta.</div>
    `
  },
  21: {
    questext: "The Maihar Gharana was founded by which musician?",
    options: ["Hafiz Ali Khan", "Ali Akbar Khan", "Alauddin Khan", "Bundu Khan"],
    correct: "3",
    exptext: "✅ Ustad Alauddin Khan founded the Maihar Gharana. 📌 Maihar and Alauddin both have a strong sound. ❌ Ali Akbar Khan is tempting because he is his son and student, but not the founder."
  },
  22: {
    questext: "Rajeev Taranath was a disciple of which sarod master?",
    options: ["Amjad Ali Khan", "Ali Akbar Khan", "Buddhadev Dasgupta", "Hafiz Ali Khan"],
    correct: "2",
    exptext: "✅ Rajeev Taranath learnt from Ustad Ali Akbar Khan. 📌 Taranath means a student of the Ali Akbar style. ❌ Amjad Ali Khan is tempting because he is also a famous sarod player."
  },
  23: {
    type: "concept", icon: "🎻", accent: "#3b82f6", pauseTimer: true,
    title: "Sarangi",
    html: `
      <p class="cp-lead">The sarangi is a <u>bowed string instrument whose sound is close to the human voice</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/15.png" alt="Sarangi instrument Indian bowed photo" data-caption="A sarangi is played with a bow and has many strings under its main strings." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/16.png" alt="Pandit Ram Narayan sarangi performance photo" data-caption="Pandit Ram Narayan plays the sarangi in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Pandit Ram Narayan brought the sarangi from the role of a supporting instrument to the concert stage as a solo instrument. He received the Padma Vibhushan in 2005. Ustad Sultan Khan was another very famous player.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Ram Narayan</td><td>Padma Vibhushan 2005, took the sarangi to solo concerts</td></tr><tr><td>Sultan Khan</td><td>Famous sarangi master</td></tr><tr><td>Sabri Khan</td><td>Famous sarangi master</td></tr><tr><td>Bundu Khan</td><td>Sarangi master of the early period</td></tr></tbody></table>
      <div class="cp-note trap">The sarangi is played with a bow, like a violin, not with fingers on the strings like the sitar.</div>
      <div class="cp-note exam">Remember the pair: Pandit Ram Narayan and the Padma Vibhushan in 2005.</div>
      <div class="cp-note tip">Other sarangi players on the list: Shakoor Khan and Abdul Latif Khan.</div>
    `
  },
  24: {
    questext: "Pandit Ram Narayan is a famous player of which instrument?",
    options: ["Violin", "Flute", "Santoor", "Sarangi"],
    correct: "4",
    exptext: "✅ Ram Narayan was a master of the sarangi. 📌 Ram and sarangi both have R and S sounds that go together. ❌ Violin is tempting because both are bowed, but he played the sarangi."
  },
  25: {
    questext: "Ram Narayan received the Padma Vibhushan in which year?",
    options: ["2023", "2001", "2000", "2005"],
    correct: "4",
    exptext: "✅ Ram Narayan received the Padma Vibhushan in 2005. 📌 Think of five in 2005 for the sarangi's many strings. ❌ 2001 is tempting because several musicians received awards that year."
  },
  26: {
    type: "concept", icon: "🪔", accent: "#f97316", pauseTimer: true,
    title: "Veena",
    html: `
      <p class="cp-lead">The veena is an <u>ancient string instrument of India</u>, and the South Indian Saraswati Veena is linked with the Goddess of learning.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/17.png" alt="Saraswati Veena instrument photo" data-caption="A Saraswati Veena has a long neck and two gourds." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/18.png" alt="Samudragupta veena coin Gupta photo" data-caption="A coin of the Gupta king Samudragupta shows him playing the veena." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The king Samudragupta of the Gupta dynasty is shown playing the veena on his coins. The Mughal emperor Aurangzeb is said to have played it too, and so did the scientist and former President A. P. J. Abdul Kalam. Jayanthi Kumaresh plays the Saraswati Veena.</p>
      <table><thead><tr><th>Person</th><th>What to remember</th></tr></thead><tbody><tr><td>Samudragupta</td><td>Shown with a veena on his coins</td></tr><tr><td>Aurangzeb</td><td>Also played the veena</td></tr><tr><td>A. P. J. Abdul Kalam</td><td>Played the veena</td></tr><tr><td>S. Balachander</td><td>Famous veena player</td></tr><tr><td>Chitti Babu</td><td>Famous veena player</td></tr><tr><td>Jayanthi Kumaresh</td><td>Plays the Saraswati Veena</td></tr></tbody></table>
      <div class="cp-note trap">Samudragupta is known as the Napoleon of India, but his coins show him as a lover of music with a veena.</div>
      <div class="cp-note exam">The veena coin of Samudragupta is an important point in questions about the Gupta period.</div>
    `
  },
  27: {
    questext: "Which Gupta king is shown playing the veena on his coins?",
    options: ["Chandragupta Maurya", "Samudragupta", "Ashoka", "Harsha"],
    correct: "2",
    exptext: "✅ Samudragupta is shown playing the veena. 📌 Samudragupta is the Gupta king, and the veena coin is his. ❌ Harsha is tempting because he supported arts, but he did not rule in the Gupta period."
  },
  28: {
    questext: "Which former President of India played the veena?",
    options: ["Rajendra Prasad", "Pranab Mukherjee", "Sarvepalli Radhakrishnan", "A. P. J. Abdul Kalam"],
    correct: "4",
    exptext: "✅ A. P. J. Abdul Kalam played the veena. 📌 The scientist President played a string instrument. ❌ Sarvepalli Radhakrishnan is tempting because he was a scholar, but he was not a veena player."
  },
  29: {
    type: "concept", icon: "🌀", accent: "#84cc16", pauseTimer: true,
    title: "Rudra Veena",
    html: `
      <p class="cp-lead">The Rudra Veena is a large and deep-sounding string instrument, and it is mainly used for <u>Dhrupad, the oldest style of Hindustani music</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/19.png" alt="Rudra Veena instrument Dhrupad photo" data-caption="A Rudra Veena has a long tube with two large gourds." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/20.png" alt="Zia Mohiuddin Dagar Rudra Veena photo" data-caption="Ustad Zia Mohiuddin Dagar plays the Rudra Veena." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Rudra Veena is called the instrument of Lord Shiva, and its low tone suits the slow, serious notes of Dhrupad. Ustad Zia Mohiuddin Dagar of the Dagar family is the most famous player, and Ustad Asad Ali Khan was another great master.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Zia Mohiuddin Dagar</td><td>Great master of the Dagar family</td></tr><tr><td>Sadik Ali Khan</td><td>Rudra Veena player</td></tr><tr><td>Asad Ali Khan</td><td>Famous Rudra Veena master</td></tr></tbody></table>
      <div class="cp-note trap">The Rudra Veena is a Hindustani instrument, while the Saraswati Veena belongs to South India.</div>
      <div class="cp-note exam">The Dagar family is linked with Dhrupad and the Rudra Veena.</div>
    `
  },
  30: {
    questext: "The Rudra Veena is mainly used in which style of music?",
    options: ["Qawwali", "Thumri", "Ghazal", "Dhrupad"],
    correct: "4",
    exptext: "✅ The Rudra Veena is used for Dhrupad. 📌 Rudra means Shiva, and Dhrupad is the oldest style. ❌ Thumri is tempting because it is also classical, but it is a light style."
  },
  31: {
    type: "concept", icon: "🎷", accent: "#06b6d4", pauseTimer: true,
    title: "Nadaswaram",
    html: `
      <p class="cp-lead">The nadaswaram is a <u>very loud wind instrument of South India</u>, played at temples and weddings.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/21.png" alt="Nadaswaram instrument South India temple photo" data-caption="A nadaswaram is a long wooden pipe with a flared end." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/22.png" alt="Nadaswaram thavil wedding performance photo" data-caption="Nadaswaram and thavil players perform at a South Indian temple festival." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The nadaswaram is played with the thavil, a drum, and it is a symbol of auspicious events. It is the South Indian match of the north Indian shehnai, and it is longer and louder. T. N. Rajarathinam Pillai and Neeruswami Pillai were great masters.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>T. N. Rajarathinam Pillai</td><td>Great nadaswaram master</td></tr><tr><td>Neeruswami Pillai</td><td>Famous nadaswaram master</td></tr><tr><td>Sheikh Chinna Maulana</td><td>Famous nadaswaram master</td></tr></tbody></table>
      <div class="cp-note trap">The nadaswaram is a South Indian instrument, and the shehnai is North Indian. Both are played at weddings.</div>
      <div class="cp-note exam">Remember the pair: nadaswaram and thavil.</div>
    `
  },
  32: {
    questext: "The nadaswaram is a traditional wind instrument of which region?",
    options: ["North India", "South India", "Kashmir", "Bengal"],
    correct: "2",
    exptext: "✅ The nadaswaram belongs to South India. 📌 It is the South Indian shehnai. ❌ North India is tempting because the shehnai is there."
  },
  33: {
    type: "concept", icon: "🏺", accent: "#a855f7", pauseTimer: true,
    title: "Ghatam",
    html: `
      <p class="cp-lead">The ghatam is a <u>percussion instrument made from a clay pot</u>, and it is used in the music of South India.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/23.png" alt="Ghatam clay pot instrument photo" data-caption="A ghatam is a round clay pot played with the fingers and palms." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/24.png" alt="Vikku Vinayakram ghatam performance photo" data-caption="Vikku Vinayakram plays the ghatam in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The player hits the clay pot with fingers and palms. Because the pot has no skin on it, the ghatam belongs to the Ghana Vadya, the solid instruments. Vikku Vinayakram received the Padma Bhushan in 2014, and he also won a Grammy with the group Planet Drum in 1992.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Vikku Vinayakram</td><td>Padma Bhushan 2014</td></tr><tr><td>T. H. Vinayakram</td><td>Father of Vikku Vinayakram</td></tr><tr><td>E. M. Subramaniam</td><td>Kalaimamani 2000, Sangeet Natak Akademi Award 2011</td></tr></tbody></table>
      <div class="cp-note trap">The ghatam is a percussion instrument but it has no skin, so it is an idiophone and not a membranophone.</div>
      <div class="cp-note exam">Vikku Vinayakram is the best known ghatam player.</div>
    `
  },
  34: {
    questext: "The ghatam is made of which material?",
    options: ["Wood", "Clay", "Brass", "Bamboo"],
    correct: "2",
    exptext: "✅ A ghatam is a clay pot. 📌 Ghata means pot. ❌ Brass is tempting because many instruments are metal, but the ghatam is made of clay."
  },
  35: {
    questext: "Vikku Vinayakram, a master of the ghatam, received the Padma Bhushan in which year?",
    options: ["2000", "2011", "2014", "1992"],
    correct: "3",
    exptext: "✅ He received the Padma Bhushan in 2014. 📌 Think of the number 14 with the pot. ❌ 2011 is tempting because it is the year of E. M. Subramaniam's Sangeet Natak Akademi Award."
  },
  36: {
    type: "concept", icon: "🛢️", accent: "#e11d48", pauseTimer: true,
    title: "Pakhawaj",
    html: `
      <p class="cp-lead">The pakhawaj is a <u>barrel-shaped drum</u> that is used with Dhrupad and is seen as the older cousin of the tabla.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/25.png" alt="Pakhawaj drum instrument photo" data-caption="A pakhawaj is a long barrel-shaped drum with two faces." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/26.png" alt="Pakhawaj Dhrupad performance photo" data-caption="A pakhawaj player accompanies a Dhrupad singer on stage." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The pakhawaj has a deep, strong tone, and it was the main drum for old music styles before the tabla became common. It is played with both hands, and the tone is rich and low.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Pandit Bhavani Shankar</td><td>Famous pakhawaj player</td></tr><tr><td>Tota Ram Sharma</td><td>Famous pakhawaj player</td></tr><tr><td>Ustad Rahman Khan</td><td>Pakhawaj player</td></tr><tr><td>Kunal Patil</td><td>Pakhawaj player</td></tr><tr><td>Kelucharan Mohapatra</td><td>Odissi guru who also played the pakhawaj</td></tr></tbody></table>
      <div class="cp-note trap">The tabla is a pair of drums, but the pakhawaj is one long drum.</div>
      <div class="cp-note exam">The pakhawaj goes with Dhrupad, and Kelucharan Mohapatra is a great Odissi guru.</div>
    `
  },
  37: {
    questext: "Which drum is closely linked with the Dhrupad style?",
    options: ["Tabla", "Pakhawaj", "Dholak", "Ghatam"],
    correct: "2",
    exptext: "✅ The pakhawaj goes with Dhrupad. 📌 Pakhawaj is the old and deep drum. ❌ Tabla is tempting because it is more famous, but it goes with later styles."
  },
  38: {
    type: "concept", icon: "🥁", accent: "#10b981", pauseTimer: true,
    title: "Mridangam",
    html: `
      <p class="cp-lead">The mridangam is the <u>main drum of Carnatic music, the music of South India</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/27.png" alt="Mridangam drum instrument photo" data-caption="A mridangam is a barrel-shaped drum with two different ends." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/28.png" alt="Umayalpuram Sivaraman mridangam performance photo" data-caption="Umayalpuram Sivaraman plays the mridangam in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The mridangam looks like the pakhawaj, but it is lighter and is used with Carnatic music. Umayalpuram K. Sivaraman is a great master, and he is a Padma Vibhushan awardee.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Umayalpuram K. Sivaraman</td><td>Padma Vibhushan awardee</td></tr><tr><td>Guruvayur Dorai</td><td>Famous mridangam master</td></tr><tr><td>R. V. Raghavan</td><td>Mridangam player</td></tr><tr><td>Rajna Swaminathan</td><td>Mridangam player of the new generation</td></tr><tr><td>V. K. Sivaraman</td><td>Mridangam player</td></tr></tbody></table>
      <div class="cp-note trap">The mridangam belongs to South India, and the tabla belongs to North India.</div>
      <div class="cp-note exam">Mridangam, ghatam, violin and veena are used in Carnatic music.</div>
    `
  },
  39: {
    questext: "The mridangam is the main percussion instrument of which music style?",
    options: ["Hindustani", "Carnatic", "Folk of Punjab", "Ghazal"],
    correct: "2",
    exptext: "✅ The mridangam is the main drum of Carnatic music. 📌 Carnatic is of the south, like the mridangam. ❌ Hindustani is tempting because the tabla is its drum."
  },
  40: {
    type: "concept", icon: "🎻", accent: "#eab308", pauseTimer: true,
    title: "Violin",
    html: `
      <p class="cp-lead">The violin came from Europe but became <u>a major instrument of both Carnatic and Hindustani music</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/29.png" alt="Indian violin Carnatic performance photo" data-caption="A Carnatic violinist plays seated on the floor in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/30.png" alt="Lalgudi Jayaraman violin performance photo" data-caption="A famous violin master plays in a Carnatic concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>In India the violin is played while sitting, with its end resting near the foot. Dwaram Venkataswamy Naidu, V. G. Jog and Lalgudi Gopala Iyer are famous names. N. Rajam, Ragini Shankar and Nandini Shankar belong to a famous violin family.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Dwaram Venkataswamy Naidu</td><td>Famous violinist of South India</td></tr><tr><td>V. G. Jog</td><td>Famous violinist of Hindustani music</td></tr><tr><td>N. Rajam</td><td>Hindustani violin master</td></tr><tr><td>Ragini Shankar and Nandini Shankar</td><td>Violin sisters</td></tr><tr><td>T. N. Krishnan</td><td>Carnatic violin master</td></tr></tbody></table>
      <div class="cp-note trap">The violin is a foreign instrument, but both Indian styles use it, so do not call it only Carnatic.</div>
      <div class="cp-note exam">V. G. Jog is linked with the Hindustani violin.</div>
      <div class="cp-note tip">Other violin players on the list: Nagai Muralidharan and Mohanan Chandrashekhar.</div>
    `
  },
  41: {
    questext: "V. G. Jog is a famous player of which instrument?",
    options: ["Violin", "Sitar", "Santoor", "Flute"],
    correct: "1",
    exptext: "✅ V. G. Jog was a famous violin player of Hindustani music. 📌 Jog plays with a bow. ❌ Sitar is tempting because many Hindustani musicians play it."
  },
  42: {
    type: "concept", icon: "🥁", accent: "#64748b", pauseTimer: true,
    title: "Drums",
    html: `
      <p class="cp-lead">The drum set, brought from the West, is played in Indian music by <u>modern musicians</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/31.png" alt="Sivamani drummer performance photo" data-caption="Sivamani plays a drum set on stage." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/32.png" alt="Indian fusion drum kit concert photo" data-caption="A drum kit is used in Indian fusion and film music." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Sivamani is one of the best known drummers of India. Ananda Gopal Bandopadhyay and Shubhankar Banerjee are also linked with drums on the list of musicians.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Sivamani</td><td>Famous drummer</td></tr><tr><td>Ananda Gopal Bandopadhyay</td><td>Musician linked with drums</td></tr><tr><td>Shubhankar Banerjee</td><td>Drummer and percussion player</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse a drum kit with the tabla. The drum kit is a Western instrument.</div>
      <div class="cp-note exam">Sivamani is the best known name for drums.</div>
    `
  },
  43: {
    questext: "Sivamani is a famous musician in which field?",
    options: ["Drums", "Flute", "Shehnai", "Sarod"],
    correct: "1",
    exptext: "✅ Sivamani is a famous drummer. 📌 Sivamani and drums go together. ❌ Shehnai is tempting because it is also a famous instrument, but the player is a drummer."
  },
  44: {
    type: "concept", icon: "🎵", accent: "#c026d3", pauseTimer: true,
    title: "Surbahar",
    html: `
      <p class="cp-lead">The surbahar is a <u>large bass sitar</u> that is used to play slow, deep alap.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/33.png" alt="Surbahar instrument photo" data-caption="A surbahar is a large string instrument with a deep sound." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/34.png" alt="Ustad Imrat Khan surbahar performance photo" data-caption="Ustad Imrat Khan plays the surbahar in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Ustad Imrat Khan is the master of the surbahar. Annapurna Devi, the daughter of Alauddin Khan, also played it. Ustad Wahid Khan and Ustad Imdad Khan are other great names.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Imrat Khan</td><td>Master of the surbahar</td></tr><tr><td>Annapurna Devi</td><td>Daughter of Alauddin Khan</td></tr><tr><td>Wahid Khan</td><td>Surbahar player</td></tr><tr><td>Imdad Khan</td><td>Great master of the Imdadkhani Gharana</td></tr></tbody></table>
      <div class="cp-note trap">The surbahar looks like the sitar, but it is larger and has a deeper tone.</div>
      <div class="cp-note exam">Surbahar master: Ustad Imrat Khan.</div>
    `
  },
  45: {
    questext: "Who is known as the master of the surbahar?",
    options: ["Imrat Khan", "Vilayat Khan", "Amjad Ali Khan", "Bismillah Khan"],
    correct: "1",
    exptext: "✅ Ustad Imrat Khan is the surbahar master. 📌 Imrat and Surbahar both are linked. ❌ Vilayat Khan is tempting because he is his brother, but he played the sitar."
  },
  46: {
    type: "concept", icon: "🎸", accent: "#fb7185", pauseTimer: true,
    title: "Guitar",
    html: `
      <p class="cp-lead">The guitar was adopted into Indian classical music as <u>a slide guitar played in the Hindustani style</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/35.png" alt="Brij Bhushan Kabra slide guitar photo" data-caption="Brij Bhushan Kabra plays the Hawaiian guitar in the Indian style." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/36.png" alt="Indian slide guitar classical photo" data-caption="A slide guitar is played flat on the lap with a steel bar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Pandit Brij Bhushan Kabra introduced the guitar to Hindustani classical music. He received the Sangeet Natak Akademi Award in 2005.</p>
      <table><thead><tr><th>Player</th><th>What to remember</th></tr></thead><tbody><tr><td>Brij Bhushan Kabra</td><td>Sangeet Natak Akademi Award 2005</td></tr><tr><td>Thakur Chakrapani Singh</td><td>Guitar player</td></tr><tr><td>Tanmoy Mondal</td><td>Guitar player</td></tr></tbody></table>
      <div class="cp-note trap">The Indian classical guitar is played flat on the lap, not held like a Western guitar.</div>
      <div class="cp-note exam">Brij Bhushan Kabra is the key name for the guitar.</div>
    `
  },
  47: {
    questext: "Brij Bhushan Kabra is linked with which instrument?",
    options: ["Sitar", "Guitar", "Sarod", "Mridangam"],
    correct: "2",
    exptext: "✅ Brij Bhushan Kabra brought the guitar into Indian classical music. 📌 K for Kabra and K for the guitar's keys. ❌ Sitar is tempting because the guitar sounds like it."
  },
  48: {
    type: "concept", icon: "🌿", accent: "#2dd4bf", pauseTimer: true,
    title: "Mohan Veena",
    html: `
      <p class="cp-lead">The Mohan Veena is <u>a modified slide guitar created by Pandit Vishwa Mohan Bhatt</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/37.png" alt="Mohan Veena Vishwa Mohan Bhatt photo" data-caption="Pandit Vishwa Mohan Bhatt plays the Mohan Veena in a concert." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/38.png" alt="Mohan Veena instrument photo" data-caption="A Mohan Veena has many strings and a steel slide bar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Pandit Vishwa Mohan Bhatt won a Grammy in 1994 for the album A Meeting by the River. He received the Sangeet Natak Akademi Award in 1998 and the Padma Bhushan in 2017.</p>
      <table><thead><tr><th>Detail</th><th>Year</th></tr></thead><tbody><tr><td>Grammy for A Meeting by the River</td><td>1994</td></tr><tr><td>Sangeet Natak Akademi Award</td><td>1998</td></tr><tr><td>Padma Bhushan</td><td>2017</td></tr></tbody></table>
      <div class="cp-note trap">A Meeting by the River is the album of Vishwa Mohan Bhatt, and West Meets East is the album of Ravi Shankar.</div>
      <div class="cp-note exam">Remember 1994, 1998 and 2017 for Vishwa Mohan Bhatt.</div>
    `
  },
  49: {
    questext: "Which instrument was created by Pandit Vishwa Mohan Bhatt?",
    options: ["Mohan Veena", "Rudra Veena", "Surbahar", "Santoor"],
    correct: "1",
    exptext: "✅ He created the Mohan Veena. 📌 Mohan is in both names. ❌ Rudra Veena is tempting because it is also a veena, but it is a very old instrument."
  },
  50: {
    questext: "Vishwa Mohan Bhatt won a Grammy for which album?",
    options: ["West Meets East", "A Meeting by the River", "Planet Drum", "Pashto"],
    correct: "2",
    exptext: "✅ He won the Grammy in 1994 for A Meeting by the River. 📌 The river was a meeting place for two cultures. ❌ West Meets East is tempting because it is also a famous album, but it is by Ravi Shankar."
  },
  51: {
    type: "concept", icon: "🎹", accent: "#0ea5e9", pauseTimer: true,
    title: "Harmonium",
    html: `
      <p class="cp-lead">The harmonium is <u>a free-reed keyboard instrument that came to India from Europe</u> and became common in Indian music.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/39.png" alt="Harmonium instrument Indian photo" data-caption="A harmonium is a small box with keys, played with a hand bellows." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Static_GK/Musical_Instruments/40.png" alt="Harmonium accompaniment ghazal bhajan performance photo" data-caption="A singer plays a harmonium in a concert of devotional songs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Tulsidas Borkar is the best known harmonium master. All India Radio did not allow the harmonium on its programmes from 1940 until 1971.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Master</td><td>Tulsidas Borkar</td></tr><tr><td>Class</td><td>Wind instrument, Sushir Vadya</td></tr><tr><td>Origin</td><td>Europe</td></tr></tbody></table>
      <div class="cp-note trap">The harmonium has keys, but it makes sound with air, so it belongs to the wind class.</div>
      <div class="cp-note exam">Tulsidas Borkar is the main name linked with the harmonium.</div>
    `
  },
  52: {
    questext: "Tulsidas Borkar is a famous player of which instrument?",
    options: ["Harmonium", "Sarangi", "Tabla", "Sitar"],
    correct: "1",
    exptext: "✅ Tulsidas Borkar was a master of the harmonium. 📌 H for harmonium and for the hand bellows. ❌ Sarangi is tempting because it is also played in accompaniment."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Static_GK/Musical_Instruments/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gold-lined sitar, a tabla pair and a bamboo flute arranged elegantly with subtle musical notes" },
  "images/General_Awareness/Static_GK/Musical_Instruments/1.png": { t: "fig", about: "Four boxes: Tantu Vadya (string, chordophone), Sushir Vadya (wind, aerophone), Avanaddha Vadya (skin drum, membranophone), Ghana Vadya (solid, idiophone)." },
  "images/General_Awareness/Static_GK/Musical_Instruments/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian classical instruments sitar tabla flute shehnai photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/2.png. a group of Indian instruments",
  "images/General_Awareness/Static_GK/Musical_Instruments/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sitar instrument Indian classical photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/3.png. a sitar",
  "images/General_Awareness/Static_GK/Musical_Instruments/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pandit Ravi Shankar sitar performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/4.png. Ravi Shankar playing sitar",
  "images/General_Awareness/Static_GK/Musical_Instruments/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Tabla pair dayan bayan Indian drums photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/5.png. a pair of tabla",
  "images/General_Awareness/Static_GK/Musical_Instruments/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Zakir Hussain tabla performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/6.png. Zakir Hussain playing tabla",
  "images/General_Awareness/Static_GK/Musical_Instruments/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bansuri bamboo flute Indian photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/7.png. a bamboo flute",
  "images/General_Awareness/Static_GK/Musical_Instruments/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hariprasad Chaurasia flute performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/8.png. Hariprasad Chaurasia with flute",
  "images/General_Awareness/Static_GK/Musical_Instruments/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Shehnai instrument photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/9.png. a shehnai",
  "images/General_Awareness/Static_GK/Musical_Instruments/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ustad Bismillah Khan shehnai performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/10.png. Bismillah Khan playing shehnai",
  "images/General_Awareness/Static_GK/Musical_Instruments/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Santoor instrument Kashmir photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/11.png. a santoor",
  "images/General_Awareness/Static_GK/Musical_Instruments/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pandit Shivkumar Sharma santoor performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/12.png. Shivkumar Sharma playing santoor",
  "images/General_Awareness/Static_GK/Musical_Instruments/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sarod instrument photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/13.png. a sarod",
  "images/General_Awareness/Static_GK/Musical_Instruments/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ustad Amjad Ali Khan sarod performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/14.png. Amjad Ali Khan with sarod",
  "images/General_Awareness/Static_GK/Musical_Instruments/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sarangi instrument Indian bowed photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/15.png. a sarangi",
  "images/General_Awareness/Static_GK/Musical_Instruments/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pandit Ram Narayan sarangi performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/16.png. Ram Narayan playing sarangi",
  "images/General_Awareness/Static_GK/Musical_Instruments/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Saraswati Veena instrument photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/17.png. a Saraswati Veena",
  "images/General_Awareness/Static_GK/Musical_Instruments/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Samudragupta veena coin Gupta photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/18.png. a Samudragupta coin",
  "images/General_Awareness/Static_GK/Musical_Instruments/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rudra Veena instrument Dhrupad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/19.png. a Rudra Veena",
  "images/General_Awareness/Static_GK/Musical_Instruments/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Zia Mohiuddin Dagar Rudra Veena photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/20.png. Zia Mohiuddin Dagar with Rudra Veena",
  "images/General_Awareness/Static_GK/Musical_Instruments/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nadaswaram instrument South India temple photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/21.png. a nadaswaram",
  "images/General_Awareness/Static_GK/Musical_Instruments/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nadaswaram thavil wedding performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/22.png. nadaswaram and thavil players",
  "images/General_Awareness/Static_GK/Musical_Instruments/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ghatam clay pot instrument photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/23.png. a ghatam",
  "images/General_Awareness/Static_GK/Musical_Instruments/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vikku Vinayakram ghatam performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/24.png. Vikku Vinayakram playing ghatam",
  "images/General_Awareness/Static_GK/Musical_Instruments/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pakhawaj drum instrument photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/25.png. a pakhawaj",
  "images/General_Awareness/Static_GK/Musical_Instruments/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pakhawaj Dhrupad performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/26.png. a pakhawaj player",
  "images/General_Awareness/Static_GK/Musical_Instruments/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mridangam drum instrument photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/27.png. a mridangam",
  "images/General_Awareness/Static_GK/Musical_Instruments/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Umayalpuram Sivaraman mridangam performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/28.png. Umayalpuram Sivaraman playing mridangam",
  "images/General_Awareness/Static_GK/Musical_Instruments/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian violin Carnatic performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/29.png. an Indian violinist",
  "images/General_Awareness/Static_GK/Musical_Instruments/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lalgudi Jayaraman violin performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/30.png. a famous violin master",
  "images/General_Awareness/Static_GK/Musical_Instruments/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sivamani drummer performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/31.png. Sivamani drumming",
  "images/General_Awareness/Static_GK/Musical_Instruments/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian fusion drum kit concert photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/32.png. a drum kit on stage",
  "images/General_Awareness/Static_GK/Musical_Instruments/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Surbahar instrument photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/33.png. a surbahar",
  "images/General_Awareness/Static_GK/Musical_Instruments/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ustad Imrat Khan surbahar performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/34.png. Imrat Khan with surbahar",
  "images/General_Awareness/Static_GK/Musical_Instruments/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Brij Bhushan Kabra slide guitar photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/35.png. Brij Bhushan Kabra with guitar",
  "images/General_Awareness/Static_GK/Musical_Instruments/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian slide guitar classical photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/36.png. a slide guitar",
  "images/General_Awareness/Static_GK/Musical_Instruments/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mohan Veena Vishwa Mohan Bhatt photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/37.png. Vishwa Mohan Bhatt with Mohan Veena",
  "images/General_Awareness/Static_GK/Musical_Instruments/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mohan Veena instrument photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/38.png. a Mohan Veena",
  "images/General_Awareness/Static_GK/Musical_Instruments/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Harmonium instrument Indian photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/39.png. a harmonium",
  "images/General_Awareness/Static_GK/Musical_Instruments/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Harmonium accompaniment ghazal bhajan performance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Static_GK/Musical_Instruments/40.png. a harmonium player"
});

/* CHANGE LOG
   - The Maihar Gharana is linked with Alauddin Khan and Ali Akbar Khan only; Amjad Ali Khan belongs to the Gwalior Bangash style, and Hafiz Ali Khan was his father.
   - The surname spelling Vishwa Mohan Bhatt is used (the map has Vishwa Mohan Bhat).
   - Name spellings are standardised: Dwaram Venkataswamy Naidu, Neeruswami Pillai, T. N. Rajarathinam Pillai and E. M. Subramaniam.
   - Tabla, flute and violin entries keep the awards given on the map; only the well-checked years are used.
*/