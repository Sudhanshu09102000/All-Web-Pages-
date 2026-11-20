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
/* ── MISSING-IMAGE SNIPPET: when an image file is not uploaded yet, a card appears in its place: "Copy prompt" for AI diagrams, or "Copy search text" (Google Images) for real photos / real incidents ── */
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
    return typeof p === "string" ? p : (p.t === "thumb" ? T(p.accent, p.objects) : p.t === "real" ? p.search : F(p.about));
  }
  function isReal(src) {
    var p = (window.IMG_PROMPTS || {})[src];
    return !!p && typeof p === "object" && p.t === "real";
  }
  function noteOf(src) {
    var p = (window.IMG_PROMPTS || {})[src];
    return p && typeof p === "object" && p.t === "real" && p.note ? p.note : "";
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
    var lbl = s[0];
    if (b.getAttribute("data-real") && st === "idle") lbl = "Copy search text";
    else if (b.getAttribute("data-real") && st === "none") lbl = "No search text found";
    b.innerHTML = s[1] + '<span class="cpm-lbl">' + lbl + "</span>";
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
      '<span class="cpm-txt"><span class="cpm-title"></span>' +
      '<span class="cpm-sub"></span></span></div>' +
      '<code class="cpm-path"><span class="cpm-full"></span><span class="cpm-short"></span></code>';
    var real = isReal(src);
    box.querySelector(".cpm-title").textContent = real ? "Real photo needed" : "Image not added yet";
    box.querySelector(".cpm-sub").textContent = real
      ? "Search this text on Google Images, download a clear photo, then save it as:"
      : "Generate it with the prompt, then save it as:";
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
    if (real) btn.setAttribute("data-real", "1");
    setBtn(btn, "idle");
    if (real) {
      var st = document.createElement("div");
      st.className = "cpm-path";
      st.textContent = getPrompt(src) + (noteOf(src) ? "  —  " + noteOf(src) : "");
      box.appendChild(st);
    }
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

/* Field: General_Awareness · Subject: Geography · Chapter: Introduction_India_Location_and_Neighbours · 13 concept pages (+ overview) · 42 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🇮🇳", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — India: Location, Extent and Neighbours",
    thumb: {
      image: "images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/thumbnail.png",
      banner: "SSC CGL 2026 GEOGRAPHY",
      line1: "INDIA",
      line2: "LOCATION AND EXTENT",
      line3: "NEIGHBOURS AND BORDERS",
      badge: "FULL CLASS",
      ribbon: "MAPS • FACTS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "India Location, Extent and Neighbours | SSC CGL Geography",
      altTitles: ["Extreme Points, Standard Meridian and Tropic of Cancer in One Class", "India's Neighbours, Border Lengths and Boundary Lines Made Easy"],
      description: "India's location, extent and neighbours are the base of Indian Geography and they give you sure marks in every exam. In this class we learn the latitudes and longitudes, the extreme points, the standard meridian, the Tropic of Cancer, the largest and smallest states, the neighbouring countries with border lengths, the boundary lines, the channels and the areas that joined India after Independence.\n\n📌 IN THIS CLASS\n✅ Extreme points and extent\n✅ Standard meridian and time\n✅ Neighbours, borders and channels\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Location and extent\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Geography #India",
      tags: ["india location and extent", "india neighbouring countries", "india geography for ssc cgl", "standard meridian of india", "extreme points of india", "tropic of cancer states", "india border length", "indian geography short notes", "ssc cgl geography", "ssc cgl static gk", "geography mcq", "indian standard time", "palk strait adams bridge", "radcliffe mcmahon durand line", "eight nine ten degree channel", "largest and smallest states", "foreign ruled areas in india", "general awareness", "geo quiz", "SSC CGL", "Introduction India Locati"],
      hashtags: ["SSCCGL", "Geography", "India"],
      thumbText: "INDIA: LOCATION AND NEIGHBOURS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🗺️ New class is live: India's location, extent and neighbours. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Location and extent\n00:00 Extreme points\n00:00 States, union territories and zones\n00:00 Standard meridian\n00:00 Tropic of Cancer\n00:00 Largest and smallest\n00:00 Border and coastline facts\n00:00 Neighbouring countries\n00:00 Boundary lines\n00:00 Channels and straits\n00:00 Border lengths\n00:00 Foreign ruled areas\n00:00 Other important facts",
      playlist: "SSC CGL Geography — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on where India lies on the Earth, how far it spreads, and which countries are its neighbours</u>. These facts are asked again and again in Geography, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>42</b><span>Questions</span></div>
        <div class="cp-stat"><b>~68 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Location and Extent</b><br>In which half of the Earth India lies, between which latitudes and longitudes it spreads, and how long its distances and coastline are.</li>
        <li><b>Extreme Points of India</b><br>The farthest places of India in the north, south, east and west, and an easy way to avoid mixing them up.</li>
        <li><b>States, Union Territories and Zones</b><br>How many states and union territories India has, and how they are grouped into six zones.</li>
        <li><b>Standard Meridian and Indian Standard Time</b><br>Why India uses one common time, which line of longitude sets it, and how to calculate the time difference.</li>
        <li><b>Tropic of Cancer and Other Special Facts</b><br>The eight states on the Tropic of Cancer, where it crosses the standard meridian, and two special facts about the Indian Ocean and the Nilgiri hills.</li>
        <li><b>Largest and Smallest States and Union Territories</b><br>The biggest and smallest by land area and by number of people, without mixing the two.</li>
        <li><b>Border and Coastline Facts of the States</b><br>Uttar Pradesh and its neighbours, the four-state district, the coastal states and the special case of Puducherry.</li>
        <li><b>Neighbouring Countries</b><br>The Indian subcontinent, the seven land neighbours, the Palk Strait and Adam's Bridge.</li>
        <li><b>Boundary Lines</b><br>The Radcliffe Line, the McMahon Line and the Durand Line, and the countries each one separates.</li>
        <li><b>Channels and Straits</b><br>The Eight, Nine, Ten and Six Degree Channels, the Great Channel and the Coco Strait.</li>
        <li><b>Border Lengths with Neighbours</b><br>How long India's border is with each neighbour and how many states touch it.</li>
        <li><b>Foreign Ruled Areas Added to India after Independence</b><br>Which areas were ruled by Portugal and France and in which year each joined India.</li>
        <li><b>Other Important Facts about India</b><br>India's rank in the world by area, its share of the world population and the time gap between its two ends.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Questions on extreme points, the standard meridian, the Tropic of Cancer, border lengths and boundary lines come in almost every Geography paper, so these facts give you quick and sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🌏", accent: "#22c55e", pauseTimer: true,
    title: "Location and Extent",
    html: `
      <p class="cp-lead">India lies completely in the <b>northern hemisphere</b> and in the <b>eastern hemisphere</b>, so we call it a country of the <u>north-eastern hemisphere</u>.</p>
      <div class="cp-note tip">A hemisphere is one half of the Earth. The equator splits the Earth into northern and southern halves, and the prime meridian splits it into eastern and western halves. India is north of the equator and east of the prime meridian.</div>
      <table><thead><tr><th>What we measure</th><th>Value</th></tr></thead><tbody><tr><td>Latitudes of the mainland</td><td>8°4′ north to 37°6′ north</td></tr><tr><td>Longitudes of the mainland</td><td>68°7′ east to 97°25′ east</td></tr><tr><td>Distance from north to south</td><td>3,214 kilometres</td></tr><tr><td>Distance from east to west</td><td>2,933 kilometres</td></tr><tr><td>Coastline including the islands</td><td>approximately 7,517 kilometres</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/1.png" alt="Map of India showing its latitudes, longitudes and standard meridian" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Look at the numbers closely. The spread from north to south is about 29 degrees of latitude, and the spread from east to west is also about 29 degrees of longitude. Yet the north to south distance is longer. This happens because one degree of latitude is always about 111 kilometres, while one degree of longitude becomes shorter as we move away from the equator.</p>
      <div class="cp-note trap">The coastline of 7,517 kilometres counts the coast of the islands as well. The coast of the mainland alone is shorter.</div>
      <div class="cp-note exam">Questions often ask for the latitude and longitude limits and for the two distances, so keep these numbers in mind.</div>
      <div class="cp-mnemonic">Latitude goes from 8 to 37, and longitude goes from 68 to 97.</div>
    `
  },
  3: {
    questext: "Mainland India lies between which two latitudes?",
    options: ["8°4′ north and 37°6′ north", "6°45′ north and 35°6′ north", "8°4′ north and 35°6′ north", "6°45′ north and 37°6′ north"],
    correct: "1",
    exptext: "The mainland lies between 8°4′ north and 37°6′ north. Remember the pair 8 and 37. The value 6°45′ north is tempting, but it belongs to Indira Point on the Nicobar Islands, not to the mainland."
  },
  4: {
    questext: "Consider the following statements about the location of India:\n1. India lies completely in the northern hemisphere.\n2. India lies completely in the eastern hemisphere.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "Both statements are correct, because India is north of the equator and east of the prime meridian. Remember it as a north-eastern country. Choosing only one statement misses the other correct one."
  },
  5: {
    questext: "What is the distance between the eastern end and the western end of India?",
    options: ["3,214 kilometres", "3,033 kilometres", "2,714 kilometres", "2,933 kilometres"],
    correct: "4",
    exptext: "The distance from east to west is 2,933 kilometres. The distance from north to south is longer, at 3,214 kilometres. Many learners pick 3,214 because it is the better known number, but it measures the other direction."
  },
  6: {
    questext: "The approximate length of the coastline of India, including the island territories, is",
    options: ["6,100 kilometres", "7,517 kilometres", "8,118 kilometres", "5,689 kilometres"],
    correct: "2",
    exptext: "The coastline including the islands is approximately 7,517 kilometres. Remember the numbers 75 and 17. The figure of 6,100 kilometres is tempting, but it counts only the coast of the mainland."
  },
  7: {
    type: "concept", icon: "📍", accent: "#f59e0b", pauseTimer: true,
    title: "Extreme Points of India",
    html: `
      <p class="cp-lead">The extreme points are the farthest places of India in the north, south, east and west. They are asked in almost every paper.</p>
      <table><thead><tr><th>Direction</th><th>Extreme point</th><th>Where it is</th></tr></thead><tbody><tr><td>North</td><td>Indira Col</td><td>Siachen region of Ladakh</td></tr><tr><td>South</td><td>Indira Point (also called Pygmalion Point)</td><td>Great Nicobar Island</td></tr><tr><td>East</td><td>Kibithu</td><td>Arunachal Pradesh</td></tr><tr><td>West</td><td>Guhar Moti</td><td>Kutch district of Gujarat</td></tr></tbody></table>
      <p class="cp-lead">Indira Point is far away from the mainland. It lies on Great Nicobar Island in the Andaman and Nicobar Islands, and it is the southernmost point of the whole country.</p>
      <div class="cp-example">Example: If a question asks for the southernmost point of India, the answer is Indira Point. If it asks for the southernmost point of the mainland, the answer is Kanyakumari.</div>
      <div class="cp-note trap">Do not mix up the two Indira names. Indira Col is in the north and Indira Point is in the south.</div>
      <div class="cp-note exam">Expect a direct question such as "Which is the northernmost point of India?" or a match-type question that pairs each point with its direction.</div>
      <div class="cp-mnemonic">Col sounds like cold, so Indira Col is in the cold north. Point is down, so Indira Point is in the south.</div>
    `
  },
  8: {
    questext: "Which of the following is the northernmost point of India?",
    options: ["Indira Point", "Guhar Moti", "Indira Col", "Kibithu"],
    correct: "3",
    exptext: "Indira Col is the northernmost point of India. Remember that Col sounds like cold. Indira Point is tempting because it has the same first name, but it is in the far south."
  },
  9: {
    questext: "Indira Point, the southernmost point of India, lies on which island?",
    options: ["Little Andaman", "Car Nicobar", "Katchal Island", "Great Nicobar Island"],
    correct: "4",
    exptext: "Indira Point, also called Pygmalion Point, lies on Great Nicobar Island. Remember that it is the southern tip of the Nicobar group. Car Nicobar is tempting because it is better known, but it lies much farther north."
  },
  10: {
    questext: "Kibithu, the easternmost point of India, lies in which state?",
    options: ["Nagaland", "Arunachal Pradesh", "Manipur", "Mizoram"],
    correct: "2",
    exptext: "Kibithu is in Arunachal Pradesh, which is the easternmost state. Remember that the sun rises first in the east, and Arunachal Pradesh means land of the dawn-lit mountains. Nagaland is tempting because it is also in the east, but it is farther west."
  },
  11: {
    questext: "Consider the following statements about the extreme points of India:\n1. Guhar Moti, the westernmost point of India, lies in the Kutch district of Gujarat.\n2. Indira Col is the southernmost point of India.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "Only statement 1 is correct, because Guhar Moti is in the Kutch district of Gujarat. Remember Col means cold north. Statement 2 is wrong because Indira Col is the northernmost point, while Indira Point is in the south."
  },
  12: {
    type: "concept", icon: "🗺️", accent: "#ef4444", pauseTimer: true,
    title: "States, Union Territories and Zones",
    html: `
      <p class="cp-lead">India is a union of <b>28 states and 8 union territories</b>. A state has its own elected government, while a union territory is closely administered by the central government.</p>
      <p class="cp-lead">To study them easily, the country is divided into <u>six zones</u>. Each zone groups states that lie near each other.</p>
      <table><thead><tr><th>Zone</th><th>States and union territories</th></tr></thead><tbody><tr><td>East Zone</td><td>Bihar, Odisha, Jharkhand, West Bengal</td></tr><tr><td>West Zone</td><td>Rajasthan, Gujarat, Maharashtra, Goa, Dadra and Nagar Haveli and Daman and Diu</td></tr><tr><td>North Zone</td><td>Jammu and Kashmir, Ladakh, Himachal Pradesh, Punjab, Uttarakhand, Haryana, Uttar Pradesh, Delhi</td></tr><tr><td>South Zone</td><td>Andhra Pradesh, Karnataka, Kerala, Tamil Nadu, Telangana, Lakshadweep, Andaman and Nicobar Islands, Puducherry</td></tr><tr><td>Central Zone</td><td>Madhya Pradesh, Chhattisgarh</td></tr><tr><td>North-East Zone</td><td>Assam, Sikkim, Meghalaya, Tripura, Manipur, Mizoram, Nagaland, Arunachal Pradesh</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/2.png" alt="Political map of India with states and union territories" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">West Bengal belongs to the East Zone, not to the North-East Zone, even though it touches the north-eastern states. In this grouping Rajasthan is in the West Zone and Uttar Pradesh is in the North Zone.</div>
      <div class="cp-note exam">The numbers to remember are 28 states and 8 union territories. Odd-one-out questions on the zones are common.</div>
      <div class="cp-mnemonic">The Central Zone is the smallest group. It has only Madhya Pradesh and Chhattisgarh.</div>
    `
  },
  13: {
    questext: "How many states and union territories does India have at present?",
    options: ["29 states and 7 union territories", "28 states and 8 union territories", "27 states and 9 union territories", "30 states and 6 union territories"],
    correct: "2",
    exptext: "India has 28 states and 8 union territories. The count of 29 and 7 also adds up to 36, so it is easy to confuse. In the correct count, Jammu and Kashmir and Ladakh are union territories, not states."
  },
  14: {
    questext: "Which two states form the Central Zone of India?",
    options: ["Madhya Pradesh and Chhattisgarh", "Madhya Pradesh and Rajasthan", "Chhattisgarh and Odisha", "Uttar Pradesh and Madhya Pradesh"],
    correct: "1",
    exptext: "The Central Zone has only Madhya Pradesh and Chhattisgarh. Remember it as the smallest zone. Uttar Pradesh is tempting because it lies in the centre of the north, but it belongs to the North Zone."
  },
  15: {
    questext: "Which of the following states does not belong to the North-East Zone?",
    options: ["Mizoram", "Meghalaya", "West Bengal", "Tripura"],
    correct: "3",
    exptext: "West Bengal belongs to the East Zone. Remember that the North-East Zone has the eight states Assam, Sikkim, Meghalaya, Tripura, Manipur, Mizoram, Nagaland and Arunachal Pradesh. West Bengal is tempting because it touches this region."
  },
  16: {
    type: "concept", icon: "⏰", accent: "#8b5cf6", pauseTimer: true,
    title: "Standard Meridian and Indian Standard Time",
    html: `
      <p class="cp-lead">A <b>standard meridian</b> is one line of longitude that a country chooses to set the clock time for the whole country. India has chosen the <b>82°30′ east</b> line of longitude.</p>
      <p class="cp-lead">Why do we need it? The Sun rises earlier in the east than in the west. India is wide, so the Sun rises about two hours earlier at the eastern end than at the western end. If every place kept its own time, trains and offices would be confused, so one common time is used everywhere.</p>
      <div class="cp-formula" translate="no"><small>Time and longitude</small>Time difference in hours = longitude difference ÷ 15</div>
      <p class="cp-lead">The Earth turns 360 degrees in 24 hours, so it turns 15 degrees in one hour. The standard meridian is 82.5 degrees east of the line through Greenwich. Now 82.5 ÷ 15 = 5.5, so <u>Indian Standard Time is 5 hours 30 minutes ahead of Greenwich Mean Time</u>.</p>
      <p class="cp-lead">This line passes through <b>Mirzapur</b> in Uttar Pradesh. Some sources also name Naini near Prayagraj (Allahabad).</p>
      <div class="cp-note trap">The standard meridian is not the line of the capital, Delhi. It lies near the middle of the east to west spread of India, which keeps the time gap at both ends as small as possible.</div>
      <div class="cp-note exam">The longitude 82°30′ east, the city of Mirzapur and the gap of 5 hours 30 minutes are asked again and again.</div>
      <div class="cp-mnemonic">82 and a half, divided by 15, gives 5 and a half hours.</div>
    `
  },
  17: {
    questext: "Indian Standard Time is based on which line of longitude?",
    options: ["80°30′ east", "82°30′ east", "85°30′ east", "77°30′ east"],
    correct: "2",
    exptext: "Indian Standard Time is set by the 82°30′ east line of longitude. Remember it as 82 and a half. The line of 77°30′ east is tempting because Delhi lies near it, but Delhi is not the basis of the time."
  },
  18: {
    questext: "The standard meridian of India passes through which city of Uttar Pradesh?",
    options: ["Lucknow", "Varanasi", "Agra", "Mirzapur"],
    correct: "4",
    exptext: "The standard meridian passes through Mirzapur. Remember it as the Mirzapur line. Varanasi is tempting because it is close by, but the line does not pass through it."
  },
  19: {
    questext: "Indian Standard Time is ahead of Greenwich Mean Time by",
    options: ["4 hours 30 minutes", "5 hours", "5 hours 30 minutes", "6 hours 30 minutes"],
    correct: "3",
    exptext: "The gap is 5 hours 30 minutes, because 82.5 degrees divided by 15 degrees per hour is 5.5 hours. Remember it as 82 and a half divided by 15. The gap of 5 hours is tempting because it is a round number."
  },
  20: {
    type: "concept", icon: "🌞", accent: "#14b8a6", pauseTimer: true,
    title: "Tropic of Cancer and Other Special Facts",
    html: `
      <p class="cp-lead">The <b>Tropic of Cancer</b> is the line of latitude at <b>23°30′ north</b>. On 21 June the Sun at noon stands directly overhead on this line.</p>
      <p class="cp-lead">This line passes through <u>eight states</u> of India. We can learn them in order from west to east.</p>
      <table><thead><tr><th>Part of India</th><th>States on the Tropic of Cancer</th></tr></thead><tbody><tr><td>West and centre</td><td>Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh</td></tr><tr><td>East and north-east</td><td>Jharkhand, West Bengal, Tripura, Mizoram</td></tr></tbody></table>
      <p class="cp-lead">The standard meridian and the Tropic of Cancer cross each other in <b>Chhattisgarh</b>.</p>
      <div class="cp-note info">India is the only country after which an ocean, the Indian Ocean, has been named.</div>
      <div class="cp-note info">The Eastern Ghats and the Western Ghats meet in the Nilgiri hills.</div>
      <div class="cp-note trap">Odisha and Uttar Pradesh are not on the list, even though they are big states near the centre of the country. Odisha lies to the south of the line, and Uttar Pradesh lies to the north of it.</div>
      <div class="cp-note exam">The number eight and the crossing in Chhattisgarh are repeated often.</div>
      <div class="cp-mnemonic">Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram, in this order from west to east.</div>
    `
  },
  21: {
    questext: "The Tropic of Cancer passes through how many states of India?",
    options: ["8", "7", "9", "6"],
    correct: "1",
    exptext: "The Tropic of Cancer passes through eight states. Remember them from west to east, from Gujarat to Mizoram. The number seven is tempting because many learners forget one of the small eastern states."
  },
  22: {
    questext: "Through which of the following states does the Tropic of Cancer not pass?",
    options: ["Jharkhand", "Odisha", "Mizoram", "Chhattisgarh"],
    correct: "2",
    exptext: "Odisha is not on the Tropic of Cancer, because it lies to the south of the line. Remember the list from Gujarat to Mizoram. Jharkhand is tempting because it is also in the east, but the line does pass through it."
  },
  23: {
    questext: "The standard meridian and the Tropic of Cancer cross each other in which state?",
    options: ["Uttar Pradesh", "Madhya Pradesh", "Jharkhand", "Chhattisgarh"],
    correct: "4",
    exptext: "The two lines cross in Chhattisgarh. Remember that the standard meridian runs through Mirzapur in the north and then reaches Chhattisgarh. Madhya Pradesh is tempting because it lies next to it, but the crossing is in Chhattisgarh."
  },
  24: {
    questext: "The Eastern Ghats and the Western Ghats meet in which hills?",
    options: ["Aravalli", "Vindhya", "Nilgiri", "Satpura"],
    correct: "3",
    exptext: "The two Ghats meet in the Nilgiri hills. Remember that Nilgiri means blue mountains. The Vindhya and Satpura ranges are tempting because they are in central India, but they are not the meeting point."
  },
  25: {
    type: "concept", icon: "📏", accent: "#ec4899", pauseTimer: true,
    title: "Largest and Smallest States and Union Territories",
    html: `
      <p class="cp-lead">Two different things can be measured. The <b>area</b> tells us how much land a state covers, and the <b>population</b> tells us how many people live there. The largest in one is often not the largest in the other.</p>
      <table><thead><tr><th>Measure</th><th>Largest</th><th>Smallest</th></tr></thead><tbody><tr><td>State by area</td><td>Rajasthan</td><td>Goa</td></tr><tr><td>Union territory by area</td><td>Ladakh</td><td>Lakshadweep</td></tr><tr><td>State by population</td><td>Uttar Pradesh</td><td>Sikkim</td></tr><tr><td>Union territory by population</td><td>Delhi</td><td>Lakshadweep</td></tr></tbody></table>
      <p class="cp-lead">For example, Rajasthan is the biggest state by land, but Uttar Pradesh has many more people. Goa is the smallest state by land, but Sikkim has the smallest number of people.</p>
      <div class="cp-note trap">Do not answer Goa for both questions. Goa is the smallest by area, and Sikkim is the smallest by population. Lakshadweep is the smallest union territory on both counts.</div>
      <div class="cp-note exam">Questions usually pair the area and the population together, so learn the two columns side by side.</div>
      <div class="cp-mnemonic">Area means Rajasthan and Goa. People means Uttar Pradesh and Sikkim.</div>
    `
  },
  26: {
    questext: "Which is the largest state of India in terms of area?",
    options: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh"],
    correct: "3",
    exptext: "Rajasthan is the largest state by area. Remember that Rajasthan wins on land and Uttar Pradesh wins on people. Madhya Pradesh is tempting because it is also very large, but it is smaller than Rajasthan."
  },
  27: {
    questext: "Which state of India has the smallest population?",
    options: ["Sikkim", "Goa", "Mizoram", "Tripura"],
    correct: "1",
    exptext: "Sikkim has the smallest population among the states. Remember that Goa is smallest by area, not by people. Goa is the tempting choice because it is the smallest state on the map."
  },
  28: {
    questext: "Which is the largest union territory of India in terms of area?",
    options: ["Andaman and Nicobar Islands", "Ladakh", "Delhi", "Jammu and Kashmir"],
    correct: "2",
    exptext: "Ladakh is the largest union territory by area. Remember that it covers a huge cold desert region in the north. Andaman and Nicobar Islands is tempting because it is the best known island territory, but it is much smaller."
  },
  29: {
    questext: "Which union territory is the smallest in both area and population?",
    options: ["Puducherry", "Chandigarh", "Delhi", "Lakshadweep"],
    correct: "4",
    exptext: "Lakshadweep is the smallest on both counts. Remember that it is only a group of tiny islands. Chandigarh is tempting because it is a small city territory, but it is larger than Lakshadweep in area and in people."
  },
  30: {
    type: "concept", icon: "🧭", accent: "#3b82f6", pauseTimer: true,
    title: "Border and Coastline Facts of the States",
    html: `
      <p class="cp-lead"><b>Uttar Pradesh</b> shares its border with more states than any other state: <u>eight states and one union territory</u>, Delhi.</p>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>States that touch Uttar Pradesh</td><td>Uttarakhand, Himachal Pradesh, Haryana, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, Bihar</td></tr><tr><td>Longest border of Uttar Pradesh</td><td>With Madhya Pradesh</td></tr><tr><td>Shortest border of Uttar Pradesh</td><td>With Himachal Pradesh</td></tr><tr><td>District that touches four states</td><td>Sonbhadra of Uttar Pradesh</td></tr></tbody></table>
      <p class="cp-lead"><b>Sonbhadra</b> is the only district of India that touches the borders of four states: Chhattisgarh, Madhya Pradesh, Bihar and Jharkhand.</p>
      <p class="cp-lead">Now let us look at the sea coast. <u>Nine states and four union territories</u> have a coastline. <b>Gujarat</b> has the longest sea coastline, and <b>Goa</b> has the shortest.</p>
      <p class="cp-lead"><b>Puducherry</b> is a union territory that is spread across three states, because its four small parts lie inside Tamil Nadu, Kerala and Andhra Pradesh.</p>
      <div class="cp-note trap">Sonbhadra touches four states, but Uttar Pradesh as a whole touches eight. Do not mix up the two numbers.</div>
      <div class="cp-note exam">Questions often ask for the number of neighbours of Uttar Pradesh, the name of the Sonbhadra district and the states with the longest and shortest coast.</div>
      <div class="cp-mnemonic">Uttar Pradesh is the king of neighbours. Sonbhadra is the district where four states meet.</div>
    `
  },
  31: {
    questext: "How many states share a border with Uttar Pradesh?",
    options: ["6", "7", "8", "9"],
    correct: "3",
    exptext: "Uttar Pradesh shares its border with eight states and also with the union territory of Delhi. Remember that no other state touches so many states. The number nine is tempting because Delhi may be counted wrongly as a state."
  },
  32: {
    questext: "Sonbhadra district of Uttar Pradesh touches the borders of which set of states?",
    options: ["Chhattisgarh, Madhya Pradesh, Bihar and Odisha", "Chhattisgarh, Madhya Pradesh, Bihar and Jharkhand", "Rajasthan, Madhya Pradesh, Bihar and Jharkhand", "Chhattisgarh, Maharashtra, Bihar and Jharkhand"],
    correct: "2",
    exptext: "Sonbhadra touches Chhattisgarh, Madhya Pradesh, Bihar and Jharkhand. Remember it as the only four-state district. Odisha is tempting because it is near Jharkhand, but it does not touch Uttar Pradesh."
  },
  33: {
    questext: "Consider the following statements:\n1. Gujarat has the longest sea coastline among the states of India.\n2. Puducherry is a union territory that is spread across two states.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "Only statement 1 is correct. Remember that Gujarat has the longest coast and Goa the shortest. Statement 2 is wrong because Puducherry is spread across three states, namely Tamil Nadu, Kerala and Andhra Pradesh."
  },
  34: {
    type: "concept", icon: "🤝", accent: "#f97316", pauseTimer: true,
    title: "Neighbouring Countries",
    html: `
      <p class="cp-lead">Pakistan, Nepal, Bhutan, Bangladesh and India together form the <b>Indian subcontinent</b>. A subcontinent is a large landmass that is part of a continent but stands apart as a separate region. India is the largest country of South Asia in both area and population.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/3.png" alt="Map of the neighbouring countries of India" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">India has seven land neighbours: Pakistan, Afghanistan, China, Nepal, Bhutan, Bangladesh and Myanmar. Sri Lanka is a neighbour across the sea.</p>
      <p class="cp-lead">India and Sri Lanka are connected by the <b>Palk Strait</b>. <b>Adam's Bridge</b> lies between Tamil Nadu in India and Sri Lanka.</p>
      <div class="cp-note tip">A strait is a narrow stretch of sea that joins two larger seas and lies between two pieces of land.</div>
      <div class="cp-note trap">Adam's Bridge is a chain of shoals in the sea and not a real bridge built for traffic. Do not confuse it with the Palk Strait, which is the water passage itself.</div>
      <div class="cp-mnemonic">The Palk Strait is the passage of water, and Adam's Bridge is the line of stepping stones across it.</div>
    `
  },
  35: {
    questext: "Which of the following countries is not a part of the Indian subcontinent?",
    options: ["Pakistan", "Nepal", "Bhutan", "Myanmar"],
    correct: "4",
    exptext: "Myanmar is not counted in the Indian subcontinent, which has India, Pakistan, Nepal, Bhutan and Bangladesh. Remember the five countries. Myanmar is tempting because it is a neighbour of India, but being a neighbour does not make it part of the subcontinent."
  },
  36: {
    questext: "Adam's Bridge lies between Tamil Nadu of India and which country?",
    options: ["Maldives", "Indonesia", "Sri Lanka", "Myanmar"],
    correct: "3",
    exptext: "Adam's Bridge lies between Tamil Nadu and Sri Lanka. Remember it as the stepping stones across the Palk Strait. The Maldives is tempting because it is also an island neighbour, but it lies far to the south-west."
  },
  37: {
    questext: "Which strait separates India from Sri Lanka?",
    options: ["Strait of Malacca", "Palk Strait", "Strait of Hormuz", "Strait of Gibraltar"],
    correct: "2",
    exptext: "The Palk Strait lies between India and Sri Lanka. Remember Palk as the passage that joins India and Sri Lanka. The Strait of Malacca is tempting because it is also in the Indian Ocean region, but it lies between Malaysia and Indonesia."
  },
  38: {
    type: "concept", icon: "🧱", accent: "#84cc16", pauseTimer: true,
    title: "Boundary Lines",
    html: `
      <p class="cp-lead">Some famous boundary lines are named after the officials who drew them. Each line is linked with the countries it separates.</p>
      <table><thead><tr><th>Boundary line</th><th>Drawn by</th><th>What it separates</th></tr></thead><tbody><tr><td>Radcliffe Line</td><td>Sir Cyril Radcliffe, 1947</td><td>India and Pakistan, and India and Bangladesh</td></tr><tr><td>McMahon Line</td><td>Sir Henry McMahon, 1914</td><td>India and China</td></tr><tr><td>Durand Line</td><td>Sir Mortimer Durand, 1893</td><td>Afghanistan and Pakistan</td></tr></tbody></table>
      <p class="cp-lead">Radcliffe drew his line when India was divided in 1947. So it covers the western border with Pakistan and also the eastern border with Bangladesh, which was then East Pakistan.</p>
      <div class="cp-note trap">Many learners think the Durand Line is an Indian border because it was drawn in the time of British India. It lies between Afghanistan and Pakistan.</div>
      <div class="cp-note exam">The most common question simply asks you to match each line with the countries on its two sides.</div>
      <div class="cp-mnemonic">R is for Radcliffe and Pakistan, M is for McMahon and China, and D is for Durand and Afghanistan.</div>
    `
  },
  39: {
    questext: "Which boundary line separates India from Pakistan and from Bangladesh?",
    options: ["Radcliffe Line", "McMahon Line", "Durand Line", "Hindenburg Line"],
    correct: "1",
    exptext: "The Radcliffe Line separates India from Pakistan and Bangladesh. Remember R for Radcliffe and for the rival border. The McMahon Line is tempting because it is also an Indian border, but it is with China."
  },
  40: {
    questext: "The Durand Line separates Afghanistan from which country?",
    options: ["India", "China", "Iran", "Pakistan"],
    correct: "4",
    exptext: "The Durand Line separates Afghanistan and Pakistan. Remember D for Durand and Afghanistan. India is tempting because the line was drawn in the days of British India, but it is not an Indian border today."
  },
  41: {
    questext: "Consider the following statements about boundary lines:\n1. The Radcliffe Line separates India and Pakistan.\n2. The McMahon Line separates India and China.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "Both statements are correct. Remember Radcliffe with Pakistan and McMahon with China. Choosing Only 1 or Only 2 fails because each statement on its own is true."
  },
  42: {
    type: "concept", icon: "🌊", accent: "#06b6d4", pauseTimer: true,
    title: "Channels and Straits",
    html: `
      <p class="cp-lead">Between the islands of India and its neighbours there are several sea channels. A channel is a wide stretch of sea between two islands or land areas.</p>
      <table><thead><tr><th>Channel</th><th>What it separates</th></tr></thead><tbody><tr><td>Eight Degree Channel</td><td>Maldives and Minicoy (India)</td></tr><tr><td>Nine Degree Channel</td><td>Minicoy and the other Lakshadweep islands</td></tr><tr><td>Ten Degree Channel</td><td>Little Andaman and Nicobar</td></tr><tr><td>Six Degree Channel</td><td>Great Nicobar and Sumatra (Indonesia)</td></tr><tr><td>Great Channel</td><td>Indira Point and Indonesia</td></tr><tr><td>Coco Strait</td><td>Andaman Islands and Coco Islands (Myanmar)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/4.png" alt="Map of the Eight, Nine and Ten Degree Channels" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The number in the name is the line of latitude near which the channel lies. So the Ten Degree Channel lies farther north than the Eight Degree Channel and the Six Degree Channel.</p>
      <div class="cp-note trap">The Eight and Nine Degree Channels are in the Arabian Sea near Lakshadweep. The Ten Degree Channel is in the Bay of Bengal between the Andaman and Nicobar Islands. Do not swap them.</div>
      <div class="cp-note exam">Match-type questions pair each channel with the places it separates.</div>
      <div class="cp-mnemonic">Eight goes to the Maldives, nine goes to Lakshadweep, and ten goes to the Andaman and Nicobar Islands.</div>
    `
  },
  43: {
    questext: "The Ten Degree Channel separates which two island groups?",
    options: ["Lakshadweep and Maldives", "Andaman Islands and Nicobar Islands", "Minicoy and Lakshadweep", "Nicobar and Sumatra"],
    correct: "2",
    exptext: "The Ten Degree Channel separates the Andaman Islands from the Nicobar Islands. Remember ten goes to the Andaman and Nicobar Islands. The Nicobar and Sumatra pair is tempting, but that gap is the Six Degree Channel or the Great Channel."
  },
  44: {
    questext: "The Eight Degree Channel separates Minicoy Island of India from which country?",
    options: ["Maldives", "Sri Lanka", "Indonesia", "Myanmar"],
    correct: "1",
    exptext: "The Eight Degree Channel lies between Minicoy and the Maldives. Remember eight goes to the Maldives. Sri Lanka is tempting because it is also an island neighbour, but it is separated by the Palk Strait."
  },
  45: {
    questext: "The Coco Strait separates the Andaman Islands from the Coco Islands of which country?",
    options: ["Thailand", "Indonesia", "Bangladesh", "Myanmar"],
    correct: "4",
    exptext: "The Coco Islands belong to Myanmar, and the Coco Strait lies between them and the Andaman Islands. Remember Coco with Myanmar. Indonesia is tempting because the Great Channel leads to it, but that is a different passage."
  },
  46: {
    type: "concept", icon: "📐", accent: "#a855f7", pauseTimer: true,
    title: "Border Lengths with Neighbours",
    html: `
      <p class="cp-lead">India shares land borders of different lengths with its neighbours. <b>Bangladesh</b> has the longest border with India, and the lengths become shorter as we go down the table.</p>
      <table><thead><tr><th>Neighbouring country</th><th>Length of border (kilometres)</th><th>Number of Indian states touching it</th></tr></thead><tbody><tr><td>Bangladesh</td><td>4,096.7</td><td>5</td></tr><tr><td>China</td><td>3,488</td><td>5</td></tr><tr><td>Pakistan</td><td>3,323</td><td>4</td></tr><tr><td>Nepal</td><td>1,751</td><td>5</td></tr><tr><td>Myanmar</td><td>1,643</td><td>4</td></tr><tr><td>Bhutan</td><td>699</td><td>4</td></tr></tbody></table>
      <p class="cp-lead">The order from longest to shortest is Bangladesh, China, Pakistan, Nepal, Myanmar and Bhutan. Bhutan has the shortest border of all.</p>
      <div class="cp-note trap">Pakistan and China are often in the news, so learners guess that one of them has the longest border. In fact Bangladesh has the longest border, and China comes second.</div>
      <div class="cp-note exam">Questions ask for the longest border, the shortest border and the number of states that touch a neighbour.</div>
      <div class="cp-mnemonic">Learn the order as B, C, P, N, M, B: Bangladesh, China, Pakistan, Nepal, Myanmar, Bhutan.</div>
    `
  },
  47: {
    questext: "Which country shares the longest land border with India?",
    options: ["China", "Pakistan", "Bangladesh", "Nepal"],
    correct: "3",
    exptext: "Bangladesh shares the longest border, at 4,096.7 kilometres. Remember the order B, C, P, N, M, B. China is tempting because it is a huge neighbour, but its border is shorter, at 3,488 kilometres."
  },
  48: {
    questext: "Which of the following neighbours has the shortest land border with India?",
    options: ["Nepal", "Bhutan", "Myanmar", "Pakistan"],
    correct: "2",
    exptext: "Bhutan has the shortest border, at about 699 kilometres. Remember that Bhutan is the last name in the order. Myanmar is tempting because it is also a small border, but it is 1,643 kilometres long."
  },
  49: {
    questext: "Consider the following statements about the borders of India:\n1. The border of India with China is longer than its border with Pakistan.\n2. Myanmar shares its border with five Indian states.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "Only statement 1 is correct, because China has 3,488 kilometres and Pakistan has 3,323 kilometres. Remember that China comes second. Statement 2 is wrong because Myanmar touches four Indian states."
  },
  50: {
    type: "concept", icon: "🏛️", accent: "#e11d48", pauseTimer: true,
    title: "Foreign Ruled Areas Added to India after Independence",
    html: `
      <p class="cp-lead">When India became free in 1947, a few small areas were still ruled by two European countries, <b>Portugal</b> and <b>France</b>. They joined India one after another.</p>
      <table><thead><tr><th>Ruled by</th><th>Area</th><th>Year of joining India</th></tr></thead><tbody><tr><td>Portugal</td><td>Dadra and Nagar Haveli</td><td>1954</td></tr><tr><td>Portugal</td><td>Daman and Diu</td><td>1961</td></tr><tr><td>Portugal</td><td>Goa</td><td>1961</td></tr><tr><td>France</td><td>Chandannagar</td><td>1950</td></tr><tr><td>France</td><td>Puducherry, Karaikal, Mahe and Yanam</td><td>1954</td></tr></tbody></table>
      <p class="cp-lead">France handed over its areas peacefully. Portugal did not agree to leave Goa, Daman and Diu, so India sent its army in December 1961, and these areas joined the country.</p>
      <div class="cp-note tip">The army action of December 1961 is called Operation Vijay.</div>
      <div class="cp-note trap">Chandannagar joined earlier, in 1950, before the other French areas. Goa came last, in 1961, and not in 1954. Dadra and Nagar Haveli were Portuguese, even though they became free in 1954.</div>
      <div class="cp-note exam">Match-type questions pair the area with the ruling country and the year.</div>
      <div class="cp-mnemonic">France was finished by 1954, and Portugal left Goa, Daman and Diu in 1961.</div>
    `
  },
  51: {
    questext: "Which of the following areas was under French rule?",
    options: ["Goa", "Daman and Diu", "Dadra and Nagar Haveli", "Mahe"],
    correct: "4",
    exptext: "Mahe was under French rule, along with Puducherry, Karaikal, Yanam and Chandannagar. Remember that Goa, Daman, Diu and Dadra and Nagar Haveli were Portuguese. Goa is tempting because it is the best known foreign ruled area."
  },
  52: {
    questext: "In which year did Goa become a part of India after Portuguese rule?",
    options: ["1954", "1947", "1961", "1950"],
    correct: "3",
    exptext: "Goa joined India in 1961, together with Daman and Diu. Remember that Portugal left last. The year 1954 is tempting because the French areas and Dadra and Nagar Haveli joined then, but Goa came later."
  },
  53: {
    questext: "Consider the following statements:\n1. Yanam and Karaikal were under French rule.\n2. Daman and Diu were under French rule.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "Only statement 1 is correct, because Yanam and Karaikal were French areas. Remember that Daman and Diu went with Goa and were Portuguese. Statement 2 is wrong for that reason."
  },
  54: {
    type: "concept", icon: "🌍", accent: "#10b981", pauseTimer: true,
    title: "Other Important Facts about India",
    html: `
      <p class="cp-lead">India is the <b>seventh largest country</b> of the world by area. Here are the first seven countries in order.</p>
      <table><thead><tr><th>Rank by area</th><th>Country</th></tr></thead><tbody><tr><td>1</td><td>Russia</td></tr><tr><td>2</td><td>Canada</td></tr><tr><td>3</td><td>United States of America</td></tr><tr><td>4</td><td>China</td></tr><tr><td>5</td><td>Brazil</td></tr><tr><td>6</td><td>Australia</td></tr><tr><td>7</td><td>India</td></tr></tbody></table>
      <p class="cp-lead">About <b>17.5 percent</b> of the world's people live in India, which is almost one person in every six.</p>
      <p class="cp-lead">The time difference between the eastern end and the western end of India is <b>two hours</b>. This is why India needs one common standard time.</p>
      <div class="cp-note trap">Do not mix up the rank by area with the rank by population. The rank of seventh is for area only.</div>
      <div class="cp-note exam">Direct questions ask for the rank of India, and tricky ones ask which country is just above or below India.</div>
      <div class="cp-mnemonic">Russia, Canada, United States, China, Brazil, Australia, India: R, C, U, C, B, A, I.</div>
    `
  },
  55: {
    questext: "What is the rank of India in the world in terms of area?",
    options: ["Sixth", "Seventh", "Eighth", "Fifth"],
    correct: "2",
    exptext: "India is the seventh largest country by area. Remember the order R, C, U, C, B, A, I. The rank of sixth is tempting because Australia is just above India, but India comes after it."
  },
  56: {
    questext: "Which country ranks just above India in the world in terms of area?",
    options: ["Brazil", "China", "Canada", "Australia"],
    correct: "4",
    exptext: "Australia is sixth, which is just above India. Remember the order Russia, Canada, United States, China, Brazil, Australia. Brazil is tempting because it is also a large southern country, but it is fifth."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined outline map of India, a classic brass globe and a vintage compass" },
  "images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/1.png": { t: "real", search: "India map extent latitude longitude standard meridian 82°30′", note: "Map of India showing 8°4′ north, 37°6′ north, 68°7′ east, 97°25′ east, the two distances and the standard meridian." },
  "images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/2.png": { t: "real", search: "India political map 28 states 8 union territories", note: "Clear political map with every state and union territory named." },
  "images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/3.png": { t: "real", search: "India neighbouring countries map Pakistan China Nepal Bhutan Bangladesh Myanmar", note: "Map with India and each neighbouring country labelled, including Sri Lanka." },
  "images/General_Awareness/Geography/Introduction_India_Location_and_Neighbours/4.png": { t: "real", search: "8 degree 9 degree 10 degree channel map India", note: "Map of the Arabian Sea and Bay of Bengal with the Eight, Nine and Ten Degree Channels marked." }
});

/* CHANGE LOG
   - Count of states and union territories corrected to 28 states and 8 union territories (the book says 29 and 7).
   - Zone table: Jammu and Kashmir and Ladakh are listed separately, and Dadra and Nagar Haveli and Daman and Diu is shown as one union territory.
   - Largest union territory by area corrected to Ladakh (the book says Andaman and Nicobar Islands).
   - Indira Col is placed in the Siachen region of Ladakh (the book says Jammu and Kashmir).
   - Durand Line corrected: it separates Afghanistan and Pakistan (the book says India and Afghanistan).
   - Nilgiri fact corrected: the Eastern Ghats and the Western Ghats meet there (the book says the coasts meet).
   - Chandannagar year corrected to 1950 (the book says 1946).
   - Allahabad is written as Prayagraj (Allahabad); longitude 68.7 is written as 68°7′.
   - Bhutan added to the border table (699 kilometres, 4 states); the years of the three boundary lines and the name Operation Vijay were added.
   - The count of 17 border states is left out because it changed when Jammu and Kashmir and Ladakh became union territories; the other border counts are kept as in the book.
*/