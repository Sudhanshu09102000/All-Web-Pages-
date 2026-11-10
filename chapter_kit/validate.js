// node validate.js <file.js>  -> prints "OK ..." or the first few errors
const fs = require("fs"), vm = require("vm");
const file = process.argv[2], errs = [], E = (m) => errs.push(m);
const el = () => new Proxy(function () {}, { get: (t, k) => (k === "style" ? { setProperty() {} } : k === "textContent" ? "" : el()), apply: () => el() });
const sb = { console, setTimeout, document: { querySelectorAll: () => [], addEventListener() {}, createElement: el, documentElement: {}, body: el() }, navigator: {}, MutationObserver: undefined };
sb.window = sb; vm.createContext(sb);
try { vm.runInContext(fs.readFileSync(file, "utf8"), sb, { filename: file }); } catch (e) { console.log("LOAD ERROR: " + e.message); process.exit(1); }
const D = sb.TEST_DATA, P = sb.IMG_PROMPTS || {};
if (!D) { console.log("window.TEST_DATA missing"); process.exit(1); }
const keys = Object.keys(D).map(Number);
keys.forEach((k, i) => k !== i + 1 && E("numbering breaks at " + k));
const tag = /<[a-z!\/][^>]*>/i, used = new Set(), acc = {}, ans = { 1: 0, 2: 0, 3: 0, 4: 0 };
let nc = 0, nq = 0;
for (const k of keys) {
  const e = D[k];
  if (e.type === "concept") {
    nc++;
    if (!e.icon) E(k + ": no icon"); if (e.pauseTimer !== true) E(k + ": pauseTimer"); if (!e.accent) E(k + ": no accent");
    if (acc[e.accent]) E(k + ": accent repeats entry " + acc[e.accent]); acc[e.accent] = k;
    if (/cp-hl/.test(e.html)) E(k + ": cp-hl used");
    const lines = (e.html.match(/<(p|div|table|ul|ol|li|tr)[\s>]/g) || []).length; if (k > 1 && lines > 30) E(k + ": page too long");
    for (const m of e.html.matchAll(/src="([^"]+)"/g)) used.add(m[1]);
  } else {
    nq++;
    if (!e.questext || !e.exptext) E(k + ": empty questext/exptext");
    if (!Array.isArray(e.options) || e.options.length !== 4 || new Set(e.options.map((o) => o.trim().toLowerCase())).size !== 4) E(k + ": options not 4 distinct");
    if (!["1", "2", "3", "4"].includes(e.correct)) E(k + ": bad correct"); else ans[e.correct]++;
    if ([e.questext, e.exptext, ...(e.options || [])].some((s) => tag.test(s))) E(k + ": HTML tag in text");
    if (e.exptext && e.exptext.trim().split(/\s+/).length > 32) E(k + ": exptext too long");
  }
}
const e1 = D[1];
if (!e1 || e1.type !== "concept") E("entry 1 must be concept");
else {
  if (!e1.thumb || e1.thumb.burst !== "") E("thumb.burst must be \"\"");
  else used.add(e1.thumb.image);
  const t = e1.yt && e1.yt.tags; if (!t || t.join(", ").length !== 500) E("yt.tags length " + (t ? t.join(", ").length : "missing") + " != 500");
  if (t && t.some((x) => x.length > 30)) E("a tag is over 30 chars");
  ["title", "altTitles", "description", "hashtags", "thumbText", "pinnedComment", "communityPost", "chapters", "playlist"].forEach((f) => !(e1.yt || {})[f] && E("yt." + f + " missing"));
}
const ch = [...used].filter((p) => p.split("/").length >= 4);
ch.forEach((p) => !P[p] && E("no IMG_PROMPTS for " + p));
Object.keys(P).forEach((p) => !used.has(p) && E("IMG_PROMPTS not used: " + p));
if (ch.length > 4) E("more than 3 chapter images + thumbnail");
if (errs.length) { console.log("ERRORS (" + errs.length + "):\n" + errs.slice(0, 6).join("\n")); process.exit(1); }
console.log(`OK  concept pages (incl. overview)=${nc} questions=${nq} answers[1-4]=${ans[1]}/${ans[2]}/${ans[3]}/${ans[4]}`);
