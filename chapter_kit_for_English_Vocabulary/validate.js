// node validate.js <file.js>  -> prints "OK ..." or the first few errors
const fs = require("fs"), vm = require("vm");
const file = process.argv[2], errs = [], E = (m) => errs.push(m);
const el = () => new Proxy(function () {}, { get: (t, k) => (k === "style" ? { setProperty() {} } : k === "textContent" ? "" : el()), apply: () => el() });
const sb = { console, setTimeout, addEventListener() {}, removeEventListener() {}, getComputedStyle: () => ({ position: "static" }), document: { querySelectorAll: () => [], addEventListener() {}, getElementById: () => null, createElement: el, createTextNode: el, documentElement: {}, head: el(), body: el() }, navigator: {}, MutationObserver: undefined };
sb.window = sb; vm.createContext(sb);
try { vm.runInContext(fs.readFileSync(file, "utf8"), sb, { filename: file }); } catch (e) { console.log("LOAD ERROR: " + e.message); process.exit(1); }
const D = sb.TEST_DATA, P = sb.IMG_PROMPTS || {};
if (!D) { console.log("window.TEST_DATA missing"); process.exit(1); }
const keys = Object.keys(D).map(Number);
keys.forEach((k, i) => k !== i + 1 && E("numbering breaks at " + k));
const tag = /<[a-z!\/][^>]*>/i, used = new Set(), acc = {}, ans = { 1: 0, 2: 0, 3: 0, 4: 0 };
const LEAD = "(?:according to|as per|as given in|as given|given in|as mentioned in|mentioned in|as stated in|stated in|as written in|written in|as described in|described in|as shown in|shown in|as listed in|listed in|as noted in|noted in|as taught in|taught in|as discussed in|discussed in|based on|derived from|taken from|from|in|by|per|as in)";
const ART = "(?:(?:the|your|our|these|this|those|my|given)\\s+)?(?:(?:class|sir's|sir|lecture|study)\\s+)?";
const NOUN = "(?:notes?|book|textbook|text book|study material|given text|handout|lecture|pdf|given list|(?:word|vocabulary|vocab)\\s+list)";
const BAN = new RegExp("\\b" + LEAD + "\\s+" + ART + NOUN + "\\b"
  + "|\\b(?:the|these|this|our|your)\\s+(?:(?:class|sir's)\\s+)?(?:notes?|book|textbook|handout)\\s+(?:say|says|said|state|states|mention|mentions|give|gives|show|shows|describe|describes|call|calls)\\b"
  + "|\\bas\\s+per\\s+(?:sir|the teacher|teacher|madam|mam)\\b|\\bas\\s+sir\\s+(?:said|told|explained|taught)\\b|\\bas\\s+(?:discussed|taught|explained)\\s+in\\s+class\\b", "i");
const banCheck = (k, s) => { const m = typeof s === "string" && s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").match(BAN); if (m) E(k + ': banned phrase "' + m[0] + '" (never refer to notes, book or teacher; state the fact directly)'); };
const walk = (k, v) => typeof v === "string" ? banCheck(k, v) : v && typeof v === "object" ? Object.values(v).forEach((x) => walk(k, x)) : 0;
let nc = 0, nq = 0;
for (const k of keys) {
  const e = D[k];
  if (e.type === "concept") {
    nc++;
    if (!e.icon) E(k + ": no icon"); if (e.pauseTimer !== true) E(k + ": pauseTimer"); if (!e.accent) E(k + ": no accent");
    if (acc[e.accent]) E(k + ": accent repeats entry " + acc[e.accent]); acc[e.accent] = k;
    if (/cp-hl/.test(e.html)) E(k + ": cp-hl used");
    banCheck(k, e.title); banCheck(k, e.html);
    if (k > 1 && !/<img\s/i.test(e.html)) E(k + ": concept page has no image (add 2-3 I: lines)");
    for (const m of e.html.matchAll(/<img\b[^>]*>/gi)) {   // every image needs a short caption (shown under the image in the portal)
      if (/class="vc-img"/.test(m[0])) { const al = (m[0].match(/alt="([^"]*)"/i) || [])[1] || ""; if (al.length < 20) E(k + ": vocabulary picture needs an alt text"); continue; }
      const c = (m[0].match(/data-caption="([^"]*)"/i) || [])[1];
      if (!c) E(k + ": image without data-caption");
      else if (c.length < 12 || c.length > 160 || /^(figure|fig|image|img|diagram|photo|picture)\s*\d*\.?$/i.test(c.trim())) E(k + ": weak caption \"" + c.slice(0, 40) + "\" (12-160 chars, say what the picture shows)");
    }
    const lines = (e.html.match(/<(p|div|table|ul|ol|li|tr)[\s>]/g) || []).length; const isV = /class="vc-wrap"/.test(e.html);
    if (isV) {   // vocabulary word page: fixed structure + exactly 2 questions after it
      if ((e.html.match(/class="vc-n"/g) || []).length !== 3) E(k + ": word page needs exactly 3 usage sentences");
      if (!/class="vc-hl"/.test(e.html)) E(k + ": picture sentence has no highlighted word");
      if (!/vc-mean/.test(e.html) || !/vc-hi/.test(e.html) || !/vc-syn/.test(e.html)) E(k + ": word page misses meaning, Hindi meaning or synonyms");
      if (!/[\u0900-\u097F]/.test((e.html.match(/class="vc-t" lang="hi">([^<]*)</) || [])[1] || "")) E(k + ": Hindi meaning must be written in Devanagari");
      const a = D[k + 1], b = D[k + 2], c3 = D[k + 3];
      if (!a || !b || a.type === "concept" || b.type === "concept" || (c3 && c3.type !== "concept")) E(k + ": a word page must be followed by exactly 2 questions");
    }
    if (k > 1 && lines > (isV ? 130 : 70)) E(k + ": page too long");
    for (const m of e.html.matchAll(/src="([^"]+)"/g)) used.add(m[1]);
  } else {
    nq++;
    if (!e.questext || !e.exptext) E(k + ": empty questext/exptext");
    if (!Array.isArray(e.options) || e.options.length !== 4 || new Set(e.options.map((o) => o.trim().toLowerCase())).size !== 4) E(k + ": options not 4 distinct");
    if (!["1", "2", "3", "4"].includes(e.correct)) E(k + ": bad correct"); else ans[e.correct]++;
    if ([e.questext, e.exptext, ...(e.options || [])].some((s) => tag.test(s))) E(k + ": HTML tag in text");
    [e.questext, e.exptext, ...(e.options || [])].forEach((s) => banCheck(k, s));
    if (/following statements?|statements? given below/i.test(e.questext || "") && !/\n1\. .+\n2\. /.test(e.questext)) E(k + ": statement question needs each numbered statement on its own line (use S: lines)");
    if (e.exptext && e.exptext.trim().split(/\s+/).length > 60) E(k + ": exptext too long");
    if (/\boptions?\s*\(?[1-4a-d]\b/i.test(e.exptext || "")) E(k + ": explanation must not mention option numbers or letters (options are shuffled)");
  }
}
const e1 = D[1];
if (!e1 || e1.type !== "concept") E("entry 1 must be concept");
else {
  if (!e1.thumb || e1.thumb.burst !== "") E("thumb.burst must be \"\"");
  else used.add(e1.thumb.image);
  const t = e1.yt && e1.yt.tags; if (!t || t.join(", ").length !== 500) E("yt.tags length " + (t ? t.join(", ").length : "missing") + " != 500");
  if (t && t.some((x) => x.length > 30)) E("a tag is over 30 chars");
  walk(1, e1.title); walk(1, e1.html); walk(1, e1.thumb); walk(1, e1.yt);
  ["title", "altTitles", "description", "hashtags", "thumbText", "pinnedComment", "communityPost", "chapters", "playlist"].forEach((f) => !(e1.yt || {})[f] && E("yt." + f + " missing"));
}
const ch = [...used].filter((p) => p.split("/").length >= 5);
ch.forEach((p) => !P[p] && E("no IMG_PROMPTS for " + p));
Object.keys(P).forEach((p) => !used.has(p) && E("IMG_PROMPTS not used: " + p));
if (errs.length) { console.log("ERRORS (" + errs.length + "):\n" + errs.slice(0, 6).join("\n")); process.exit(1); }
console.log(`OK  concept pages (incl. overview)=${nc} questions=${nq} images=${ch.length} answers[1-4]=${ans[1]}/${ans[2]}/${ans[3]}/${ans[4]}`);