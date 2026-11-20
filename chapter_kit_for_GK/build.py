#!/usr/bin/env python3
"""build.py <Field> <Subject> <Chapter_Name> [parts_dir=parts] [out_root=.]
   Reads parts/meta.json (entry 1) + parts/p*.txt (shorthand), writes
   scripts/<Chapter_Name>/<Chapter_Name>.js (+ image_list.txt) and runs validate.js.
build.py --scan <file> [...]   list source-reference phrases ("as given in the notes" ...) with line numbers
build.py --fix  <file> [...]   remove the easy ones automatically (keeps a .bak copy), then list what is left"""
import sys, os, re, json, glob, subprocess, shutil
HERE = os.path.dirname(os.path.abspath(__file__))

# ---- banned source-reference phrases (same rules as validate.js) ----
_LEAD = (r"(?:according to|as per|as given in|as given|given in|as mentioned in|mentioned in|as stated in|stated in|as written in|written in|"
         r"as described in|described in|as shown in|shown in|as listed in|listed in|as noted in|noted in|as taught in|taught in|"
         r"as discussed in|discussed in|based on|derived from|taken from|from|in|by|per|as in)")
_ART = r"(?:(?:the|your|our|these|this|those|my|given)\s+)?(?:(?:class|sir's|sir|lecture|study)\s+)?"
_NOUN = r"(?:notes?|book|textbook|text book|study material|given text|handout|lecture)"
BAN_RE = re.compile(
    r"\b" + _LEAD + r"\s+" + _ART + _NOUN + r"\b"
    r"|\b(?:the|these|this|our|your)\s+(?:(?:class|sir's)\s+)?(?:notes?|book|textbook|handout)\s+(?:say|says|said|state|states|mention|mentions|give|gives|show|shows|describe|describes|call|calls)\b"
    r"|\bas\s+per\s+(?:sir|the teacher|teacher|madam|mam)\b|\bas\s+sir\s+(?:said|told|explained|taught)\b|\bas\s+(?:discussed|taught|explained)\s+in\s+class\b", re.I)

def hits(text):
    out = []
    for i, ln in enumerate(text.replace("\r", "").split("\n"), 1):
        plain = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", ln))
        m = BAN_RE.search(plain)
        if m: out.append((i, m.group(0), ln.strip()[:110]))
    return out

if len(sys.argv) > 1 and sys.argv[1] in ("--scan", "--fix"):
    fix, bad = sys.argv[1] == "--fix", 0
    F1 = re.compile(r"\s*[,;]\s*(?:" + BAN_RE.pattern + r")", re.I)
    F2 = re.compile(r"\s*\(\s*(?:" + BAN_RE.pattern + r")\s*\)", re.I)
    for f in sys.argv[2:]:
        t = open(f, encoding="utf-8", newline="").read()
        if fix:
            t2 = F2.sub("", F1.sub("", t))
            if t2 != t:
                shutil.copy(f, f + ".bak"); open(f, "w", encoding="utf-8", newline="").write(t2); t = t2; print("fixed:", f)
        for i, w, ln in hits(t):
            bad += 1; print("%s:%d  \"%s\"  | %s" % (f, i, w, ln))
    print("left to fix by hand: %d" % bad if bad else "no source-reference phrases found")
    raise SystemExit(1 if bad else 0)

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

# ---- stop early if the source files mention the book / notes ----
src = [f for f in sorted(glob.glob(os.path.join(pdir, "p*.txt"))) + [os.path.join(pdir, "meta.json")] if os.path.exists(f)]
bad = [(f, i, w, ln) for f in src for i, w, ln in hits(open(f, encoding="utf-8").read())]
if bad:
    print("BANNED source-reference phrases (state the fact directly, never mention notes/book/sir). Rewrite these lines:")
    for f, i, w, ln in bad[:12]: print("  %s:%d  \"%s\"  | %s" % (os.path.basename(f), i, w, ln))
    raise SystemExit(1)

M = json.load(open(os.path.join(pdir, "meta.json"), encoding="utf-8"))
img = "images/%s/%s/%s/" % (field, subject, chap)

# ---- images: "I:" lines are numbered automatically (1.png, 2.png ...) and registered ----
AUTO = {}
FIG = ('<div class="cp-fig"><img src="%s" alt="%s" style="display:block;width:100%%;max-width:420px;max-height:240px;'
       'height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>')
def figure(spec, where):
    p = [x.strip() for x in spec.split("|")]
    kind = p[0].lower()
    if kind == "fig" and len(p) >= 2 and p[1]: v, alt = {"t": "fig", "about": p[1]}, p[1]
    elif kind == "real" and len(p) >= 2 and p[1]:
        v, alt = {"t": "real", "search": p[1]}, p[1]
        if len(p) >= 3 and p[2]: v["note"] = p[2]
    else: raise SystemExit("Bad I: line in '%s' (use  I: fig | what it shows  or  I: real | search text | note): %s" % (where, spec[:60]))
    n = 1
    while ("%d.png" % n) in M.get("images", {}) or ("%d.png" % n) in AUTO: n += 1
    name = "%d.png" % n; AUTO[name] = v
    return FIG % (img + name, re.sub(r'["<>&]', "", alt)[:90])

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
        elif ln.startswith("I:"): out.append(figure(ln[2:], title.strip()))
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
    q, opts_txt, ans, exp, stm, tail = head.strip(), [], None, "", [], ""
    for ln in body:
        s = ln.strip()
        if s.startswith("ANS:"): ans = s[4:].strip()
        elif s.startswith("EXP:"): exp = s[4:].strip()
        elif s.startswith("S:"): stm.append(s[2:].strip())      # statement line (numbered automatically)
        elif s.startswith("W:"): tail = s[2:].strip()           # closing line, e.g. "Which of the statements is correct?"
        elif s: opts_txt.append(s)
    if stm:  # statement-type: lead-in, then each numbered statement on its own line, then closing line
        q = q + "\n" + "\n".join("%d. %s" % (i, t) for i, t in enumerate(stm, 1)) + (("\n" + tail) if tail else "")
    elif tail: q = q + "\n" + tail
    parts = re.split(r"(?:^|\s)([1-4])\)\s+", " ".join(opts_txt))
    opts = [p.strip() for p in parts[2::2]]
    if len(opts) != 4 or ans not in list("1234"): raise SystemExit("Bad question: " + q[:60])
    return dict(kind="q", questext=q, options=opts, correct=ans, exptext=exp)

# ---- snippets (verbatim from snippets.txt) ----
sn = open(os.path.join(HERE, "snippets.txt"), encoding="utf-8").read()
a, b, c = sn.index("/* ═══ SNIPPET 1"), sn.index("/* ═══ SNIPPET 2"), sn.index("/* ═══ END SNIPPETS")
snip = sn[a:b].rstrip() + "\n\n" + sn[b:c].rstrip() + "\n"

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
ALL = {**M.get("images", {}), **AUTO}
ALL = dict(sorted(ALL.items(), key=lambda kv: (kv[0] != "thumbnail.png", int(re.sub(r"\D", "", kv[0]) or 0))))
ip, lst = [], []
for name, v in ALL.items():
    if v["t"] == "real":  # real photo / current-affairs image: no AI prompt, only a search text for the user
        txt = 'REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: "%s". Download a clear, suitable photo and save it as %s' % (v["search"], img + name)
        if v.get("note"): txt += ". " + v["note"]
        ip.append('  %s: %s' % (J(img + name), J(txt)))
        lst.append("%s | DOWNLOAD | search: %s%s" % (name, v["search"], (" | " + v["note"]) if v.get("note") else "")); continue
    body = ('t: "thumb", accent: %s, objects: %s' % (J(M["accent"]), J(v["objects"]))) if v["t"] == "thumb" else ('t: "fig", about: %s' % J(v["about"]))
    ip.append('  %s: { %s }' % (J(img + name), body))
    lst.append("%s | AI | %s" % (name, v["objects"] if v["t"] == "thumb" else v["about"]))
L.append("window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {\n" + ",\n".join(ip) + "\n});\n")
L.append("/* CHANGE LOG\n" + "\n".join("   - " + x for x in (M.get("changelog") or ["No corrections to the book's content."])) + "\n*/\n")
outdir = os.path.join(root, "scripts", chap); os.makedirs(outdir, exist_ok=True)
out = os.path.join(outdir, chap + ".js")
open(out, "w", encoding="utf-8").write(snip + "\n" + "\n".join(L))
open(os.path.join(outdir, "image_list.txt"), "w", encoding="utf-8").write("Save every image in  %s\n\n" % img + "\n".join(lst) + "\n")
nf, nr = sum(v["t"] == "fig" for v in ALL.values()), sum(v["t"] == "real" for v in ALL.values())
print("written:", out, "| concepts", nc, "| questions", nq, "| images", len(ALL), "(AI %d, download %d, +thumbnail) | tags length" % (nf, nr), total())
r = subprocess.run(["node", os.path.join(HERE, "validate.js"), out], capture_output=True, text=True)
print((r.stdout + r.stderr).strip())
