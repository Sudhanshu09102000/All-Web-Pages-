#!/usr/bin/env python3
"""build.py <Field> <Subject> <Chapter_Name> [parts_dir=parts] [out_root=.]
Reads  parts/meta.json (entry 1) + parts/p*.txt (shorthand), writes
scripts/<Chapter_Name>/<Chapter_Name>.js and runs validate.js."""
import sys, os, re, json, glob, subprocess
HERE = os.path.dirname(os.path.abspath(__file__))
if len(sys.argv) < 4: raise SystemExit("Usage: build.py <Field> <Subject> <Chapter_Name> [parts_dir] [out_root]")
field, subject, chap = sys.argv[1], sys.argv[2], sys.argv[3]
pdir = sys.argv[4] if len(sys.argv) > 4 else "parts"
root = sys.argv[5] if len(sys.argv) > 5 else "."
PAL = ["#22c55e","#f59e0b","#ef4444","#8b5cf6","#14b8a6","#ec4899","#3b82f6","#f97316","#84cc16","#06b6d4",
       "#a855f7","#e11d48","#10b981","#eab308","#0ea5e9","#d946ef","#64748b","#fb7185","#2dd4bf","#c026d3"]
ENT = re.compile(r"&(?!#?\w+;)")
esc = lambda s: ENT.sub("&amp;", s.strip())
J = lambda v: json.dumps(v, ensure_ascii=False)
OBJ = lambda d: "{\n" + ",\n".join("      %s: %s" % (k, J(v)) for k, v in d.items()) + "\n    }"

# ---- snippets (verbatim from snippets.txt) ----
sn = open(os.path.join(HERE, "snippets.txt"), encoding="utf-8").read()
a, b, c = sn.index("/* ═══ SNIPPET 1"), sn.index("/* ═══ SNIPPET 2"), sn.index("/* ═══ END SNIPPETS")
snip = sn[a:b].rstrip() + "\n\n" + sn[b:c].rstrip() + "\n"

# ---- shorthand parser ----
def concept(head, body, n):
    m = [x.strip() for x in head.split("|", 2)]
    icon, acc, title = (m + ["", "", ""])[:3] if len(m) == 3 else (m[0], "-", m[-1])
    if not acc.startswith("#"): acc = PAL[n % len(PAL)]
    out = []
    for ln in body:
        ln = ln.strip()
        if not ln: continue
        if ln.startswith("L:"):   out.append('<p class="cp-lead">%s</p>' % esc(ln[2:]))
        elif ln.startswith("M:"): out.append('<div class="cp-mnemonic">%s</div>' % esc(ln[2:]))
        elif ln.startswith("H:"): out.append(ln[2:].strip())
        elif ln.startswith("T:"):
            rows = [[esc(x) for x in r.split("|")] for r in ln[2:].split(";;")]
            t = "<table><thead><tr>" + "".join("<th>%s</th>" % x for x in rows[0]) + "</tr></thead><tbody>"
            t += "".join("<tr>" + "".join("<td>%s</td>" % x for x in r) + "</tr>" for r in rows[1:]) + "</tbody></table>"
            out.append(t)
        elif re.match(r"N\s+\w+:", ln):
            k, txt = ln[1:].split(":", 1)
            out.append('<div class="cp-note %s">%s</div>' % (k.strip(), esc(txt)))
        elif ln.startswith("<"): out.append(ln)
        else: raise SystemExit("Unknown line in concept '%s': %s" % (head.strip(), ln[:60]))
    html = "\n".join("      " + x for x in out)
    if "`" in html or "${" in html: raise SystemExit("backtick or ${ in html of '%s'" % title)
    return dict(kind="c", icon=icon, accent=acc, title=title.strip(), html=html)

def question(head, body):
    q, opts_txt, ans, exp = head.strip(), [], None, ""
    for ln in body:
        s = ln.strip()
        if s.startswith("ANS:"): ans = s[4:].strip()
        elif s.startswith("EXP:"): exp = s[4:].strip()
        elif s: opts_txt.append(s)
    parts = re.split(r"(?:^|\s)([1-4])\)\s+", " ".join(opts_txt))
    opts = [p.strip() for p in parts[2::2]]
    if len(opts) != 4 or ans not in list("1234"): raise SystemExit("Bad question: " + q[:60])
    return dict(kind="q", questext=q, options=opts, correct=ans, exptext=exp)

entries = []
for f in sorted(glob.glob(os.path.join(pdir, "p*.txt")), key=lambda p: int(re.sub(r"\D", "", os.path.basename(p)) or 0)):
    cur = None
    for ln in open(f, encoding="utf-8").read().replace("\r", "").split("\n"):
        if ln.startswith("@@"):
            if cur: entries.append(cur)
            cur = [ln[2:], []]
        elif cur is not None: cur[1].append(ln)
    if cur: entries.append(cur)
items = []
for h, body in entries:
    items.append(concept(h[1:].strip(), body, len(items) + 1) if h.startswith("C") else question(h[1:].strip(), body))
nc, nq = sum(i["kind"] == "c" for i in items), sum(i["kind"] == "q" for i in items)

# ---- entry 1 (overview) ----
M = json.load(open(os.path.join(pdir, "meta.json"), encoding="utf-8"))
img = "images/%s/%s/%s/" % (field, subject, chap)
tags, seen = [], set()
for t in M["yt"]["tags"]:
    if len(t) <= 30 and t.lower() not in seen: seen.add(t.lower()); tags.append(t)
words = chap.replace("_", " ")
pool = ["SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ",
        "previous year questions", "exam preparation", "important questions", "concept class", "one shot", "static GK"]
bases = [words, subject, words + " " + subject, subject + " " + words + " exam"]
def mk(n):
    for p in [x for x in pool + [bs + " " + sf for bs in bases for sf in ("tricks", "class", "MCQ", "notes", "questions", "for all exams")]]:
        if len(p) == n and p.lower() not in seen: return p
    for bs in bases * 2:
        s = (bs + " " + subject + " " + words + " exam preparation full class tricks questions")
        for off in range(0, 40, 3):
            w = s[off:off + n + 1].strip()
            w = w[:n] if len(w) >= n else w
            if len(w) == n and not w.endswith(" ") and not w.startswith(" ") and w.lower() not in seen: return w
    return ("x" * n)
total = lambda: len(", ".join(tags))
while total() > 500: tags.pop()
while total() < 500:
    gap = 500 - total()
    n = gap - 2 if gap <= 32 else next(k for k in range(30, 0, -1) if (gap - k - 2) not in (1, 2))
    t = next((p for p in pool if p.lower() not in seen and len(p) == n), None) if gap <= 32 else next((p for p in pool if p.lower() not in seen and gap - len(p) - 2 not in (1, 2)), None)
    t = t or mk(n); seen.add(t.lower()); tags.append(t)
assert total() == 500, total()
M["yt"]["tags"] = tags
th = dict(M["thumb"]); th = {"image": img + "thumbnail.png", **{k: v for k, v in th.items() if k not in ("image", "burst", "mode")}, "burst": "", "mode": "creator"}
road = "".join("        <li><b>%s</b><br>%s</li>\n" % (esc(t), esc(d)) for t, d in M["roadmap"])
mins = nc * 2 + nq
ov = f'''      <p class="cp-lead">{esc(M["lead"])}</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>{nc}</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>{nq}</b><span>Questions</span></div>
        <div class="cp-stat"><b>~{mins} min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
{road}      </ul>
      <div class="cp-note exam">{esc(M["exam"])}</div>'''

# ---- write file ----
L = ["/* Field: %s · Subject: %s · Chapter: %s · %d concept pages (+ overview) · %d questions */\n" % (field, subject, chap, nc, nq), "window.TEST_DATA = {"]
L.append('  1: {\n    type: "concept", icon: %s, accent: %s, pauseTimer: true,\n    title: %s,\n    thumb: %s,\n    yt: %s,\n    html: `\n%s\n    `\n  },'
         % (J(M["icon"]), J(M["accent"]), J(M["title"]), OBJ(th),
            OBJ(M["yt"]), ov))
for k, it in enumerate(items, 2):
    if it["kind"] == "c":
        L.append('  %d: {\n    type: "concept", icon: %s, accent: %s, pauseTimer: true,\n    title: %s,\n    html: `\n%s\n    `\n  },' % (k, J(it["icon"]), J(it["accent"]), J(it["title"]), it["html"]))
    else:
        L.append('  %d: {\n    questext: %s,\n    options: %s,\n    correct: %s,\n    exptext: %s\n  },' % (k, J(it["questext"]), J(it["options"]), J(it["correct"]), J(it["exptext"])))
L[-1] = L[-1].rstrip(",")
L.append("};\n")
ip = []
for name, v in M.get("images", {}).items():
    body = ('t: "thumb", accent: %s, objects: %s' % (J(M["accent"]), J(v["objects"]))) if v["t"] == "thumb" else ('t: "fig", about: %s' % J(v["about"]))
    ip.append('  %s: { %s }' % (J(img + name), body))
L.append("window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {\n" + ",\n".join(ip) + "\n});\n")
L.append("/* CHANGE LOG\n" + "\n".join("   - " + x for x in (M.get("changelog") or ["No corrections to the book's content."])) + "\n*/\n")
outdir = os.path.join(root, "scripts", chap); os.makedirs(outdir, exist_ok=True)
out = os.path.join(outdir, chap + ".js")
open(out, "w", encoding="utf-8").write(snip + "\n" + "\n".join(L))
print("written:", out, "| concepts", nc, "| questions", nq, "| tags length", total())
r = subprocess.run(["node", os.path.join(HERE, "validate.js"), out], capture_output=True, text=True)
print((r.stdout + r.stderr).strip())
