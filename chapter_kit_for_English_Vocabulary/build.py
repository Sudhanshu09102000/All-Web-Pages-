#!/usr/bin/env python3
"""build.py <Field> <Subject> <Chapter_Name> [parts_dir=parts] [out_root=.]
   Reads parts/meta.json (entry 1) + parts/p*.txt (shorthand), writes
   scripts/<Chapter_Name>/<Chapter_Name>.js (+ image_list.txt) and runs validate.js.
build.py --scan <file> [...]   list source-reference phrases ("as given in the notes" ...) with line numbers
build.py --fix  <file> [...]   remove the easy ones automatically (keeps a .bak copy), then list what is left
VOCABULARY MODE: if the parts files contain "@@V word | POS | accent | icon" entries, each word becomes one premium word page
   (meaning, Hindi meaning, synonyms, antonyms, 3 usage sentences, picture) followed by its 2 questions; the overview is automatic."""
import sys, os, re, json, glob, subprocess, shutil
HERE = os.path.dirname(os.path.abspath(__file__))

# ---- banned source-reference phrases (same rules as validate.js) ----
_LEAD = (r"(?:according to|as per|as given in|as given|given in|as mentioned in|mentioned in|as stated in|stated in|as written in|written in|"
         r"as described in|described in|as shown in|shown in|as listed in|listed in|as noted in|noted in|as taught in|taught in|"
         r"as discussed in|discussed in|based on|derived from|taken from|from|in|by|per|as in)")
_ART = r"(?:(?:the|your|our|these|this|those|my|given)\s+)?(?:(?:class|sir's|sir|lecture|study)\s+)?"
_NOUN = r"(?:notes?|book|textbook|text book|study material|given text|handout|lecture|pdf|given list|(?:word|vocabulary|vocab)\s+list)"
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
FIG = ('<div class="cp-fig"><img src="%s" alt="%s" data-caption="%s" style="display:block;width:100%%;max-width:420px;max-height:240px;'
       'height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>')
def figure(spec, where):
    p = [x.strip() for x in spec.split("|")]
    kind = p[0].lower()
    cap = ""
    if kind == "fig" and len(p) >= 2 and p[1]:
        v, alt = {"t": "fig", "about": p[1]}, p[1]
        if len(p) >= 3 and p[2]: cap = p[2]                      # I: fig | what to draw | caption
        else: cap = re.split(r"(?<=[.!?])\s", p[1])[0][:140]      # fallback: first sentence of the drawing brief
    elif kind == "real" and len(p) >= 2 and p[1]:
        v, alt = {"t": "real", "search": p[1]}, p[1]
        if len(p) >= 3 and p[2]: v["note"] = p[2]
        if len(p) >= 4 and p[3]: cap = p[3]                      # I: real | search | note | caption
        else: cap = (p[2] if len(p) >= 3 and p[2] else p[1])[:140]
    else: raise SystemExit("Bad I: line in '%s' (use  I: fig | what it shows | caption  or  I: real | search text | note | caption): %s" % (where, spec[:60]))
    cap = re.sub(r"\s+", " ", cap).strip()
    cap = cap[:1].upper() + cap[1:]
    if cap and cap[-1] not in ".!?)": cap += "."
    cap = ENT.sub("&amp;", re.sub(r'["<>]', "", cap))
    n = 1
    while ("%d.png" % n) in M.get("images", {}) or ("%d.png" % n) in AUTO: n += 1
    name = "%d.png" % n; AUTO[name] = v
    return FIG % (img + name, re.sub(r'["<>&]', "", alt)[:90], cap)

# ---- vocabulary helpers ----
import colorsys
USED_ACC = set()
def _auto_acc(i):
    k = i
    while True:
        r, g, b = colorsys.hls_to_rgb((k * 0.61803398875) % 1.0, 0.46, 0.70)
        hx = "#%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255))
        if hx not in USED_ACC: return hx
        k += 1
def _rgb(h): h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
def _ink(c): return "#111" if (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255 > 0.6 else "#fff"
SCENE = ("Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, "
         "clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). "
         "It must show this single scene so clearly that a learner understands the word \"%s\" at a glance, without reading anything: %s "
         "Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. "
         "Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, "
         "exactly as written in the scene description, and spelled correctly.")
def reg(v):
    n = 1
    while ("%d.png" % n) in M.get("images", {}) or ("%d.png" % n) in AUTO: n += 1
    name = "%d.png" % n; AUTO[name] = v
    return name

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

def vocab(head, body, n):
    m = [x.strip() for x in head.split("|")]
    word = m[0]
    if not word: raise SystemExit("@@V needs a word")
    pos = (m[1] if len(m) > 1 and m[1] else "WORD").upper()
    acc = m[2] if len(m) > 2 else "-"
    icon = m[3] if len(m) > 3 and m[3] else "📝"
    if not re.fullmatch(r"#[0-9a-fA-F]{6}", acc): acc = _auto_acc(n)
    acc = acc.lower(); USED_ACC.add(acc)
    f = {"USE": []}
    for ln in body:
        s = ln.strip()
        if not s: continue
        mm = re.match(r"(MEAN|HI|SYN|ANT|USE|PIC|MEM|PRON):\s*(.*)$", s)
        if not mm: raise SystemExit("Unknown line in word '%s': %s" % (word, s[:60]))
        k, v = mm.group(1), mm.group(2).strip()
        if k == "USE": f["USE"].append(v)
        else: f[k] = v
    for k in ("MEAN", "HI", "SYN", "PIC"):
        if not f.get(k): raise SystemExit("word '%s': missing %s:" % (word, k))
    if len(f["USE"]) != 3: raise SystemExit("word '%s': exactly 3 USE: lines needed, found %d" % (word, len(f["USE"])))
    for u in f["USE"]:
        if "[[" not in u or "]]" not in u: raise SystemExit("word '%s': mark the word in every USE: line like [[%s]]" % (word, word))
    syn = [x.strip() for x in f["SYN"].split(";") if x.strip()]
    ant = [x.strip() for x in f.get("ANT", "").split(";") if x.strip()]
    if len(syn) < 2: raise SystemExit("word '%s': at least 2 synonyms (separate with ;)" % word)
    pic = [x.strip() for x in f["PIC"].split("|", 1)]
    pi, scene = (int(pic[0]), pic[1]) if len(pic) == 2 and pic[0].isdigit() else (1, pic[-1])
    if pi not in (1, 2, 3): raise SystemExit("word '%s': PIC number must be 1, 2 or 3" % word)
    plain = lambda t: re.sub(r"\[\[(.+?)\]\]", r"\1", t)
    bold = lambda t: re.sub(r"\[\[(.+?)\]\]", r"<b>\1</b>", esc(t))
    mark = lambda t: re.sub(r"\[\[(.+?)\]\]", r'<mark class="vc-hl">\1</mark>', esc(t))
    scene = scene.strip(); scene += "" if scene[-1:] in ".!?" else "."
    name = reg({"t": "scene", "word": word, "scene": scene})
    alt = re.sub(r'["<>&]', "", "Illustration of the word " + word + ": " + scene)[:140]
    rgb = _rgb(acc)
    ol = "".join('<li><span class="vc-n">%d</span><p class="vc-s">%s%s</p></li>' % (i, bold(u), ' <span class="vc-pic" title="Shown in the picture">🖼️</span>' if i == pi else "")
                 for i, u in enumerate(f["USE"], 1))
    chips = lambda L: '<ul class="vc-chips">' + "".join('<li class="vc-chip">%s</li>' % esc(x) for x in L) + "</ul>"
    out = ['<div class="vc-wrap"><div class="vc" style="--ar:%d,%d,%d;--ink:%s">' % (rgb + (_ink(rgb),)), '<div class="vc-main">',
           '<div class="vc-top"><span class="vc-pos">%s</span>%s</div>' % (esc(pos), ('<span class="vc-pron" translate="no">%s</span>' % esc(f["PRON"])) if f.get("PRON") else ""),
           '<div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">%s</p></div>' % esc(f["MEAN"])
           + '<div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">%s</p></div></div>' % esc(f["HI"]),
           '<div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div>%s</div>' % chips(syn)
           + (('<div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div>%s</div>' % chips(ant)) if ant else "") + "</div>",
           '<div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol>%s</ol></div>' % ol]
    if f.get("MEM"): out.append('<div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">%s</p></div>' % esc(f["MEM"]))
    out += ["</div>", '<div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="%s" alt="%s" loading="lazy"></figure>' % (img + name, alt),
            '<div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">%s</p></div></div>' % mark(f["USE"][pi - 1]),
            "</div></div>"]
    html = "\n".join("      " + x for x in out)
    if "`" in html or "${" in html: raise SystemExit("backtick or ${ in html of word '%s'" % word)
    return dict(kind="c", vocab=True, icon=icon, accent=acc, title=word[:1].upper() + word[1:], html=html)

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
a, b, d, c = (sn.index("/* ═══ SNIPPET 1"), sn.index("/* ═══ SNIPPET 2"), sn.index("/* ═══ SNIPPET 3"), sn.index("/* ═══ END SNIPPETS"))
e = sn.find("/* ═══ SNIPPET 4"); e = c if e < 0 else e
snip_base = sn[a:b].rstrip() + "\n\n" + sn[b:d].rstrip() + "\n\n" + sn[d:e].rstrip() + "\n"
snip_vocab = sn[e:c].rstrip() + "\n"

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
    if h.startswith("C"): items.append(concept(h[1:].strip(), body, len(items) + 1))
    elif h.startswith("V"): items.append(vocab(h[1:].strip(), body, len(items) + 1))
    else: items.append(question(h[1:].strip(), body))
nc, nq = sum(i["kind"] == "c" for i in items), sum(i["kind"] == "q" for i in items)
nw = sum(bool(i.get("vocab")) for i in items); VOC = nw > 0
if VOC:  # every word page is followed by exactly 2 questions; correct answers are spread evenly over 1-4
    for k, it in enumerate(items):
        if it.get("vocab"):
            nxt = items[k + 1:k + 4]
            if not (len(nxt) >= 2 and nxt[0]["kind"] == "q" and nxt[1]["kind"] == "q" and (len(nxt) < 3 or nxt[2]["kind"] == "c")):
                raise SystemExit("word '%s' must be followed by exactly 2 questions (@@Q)" % it["title"])
    TARGET, qi = [2, 4, 1, 3], 0
    for it in items:
        if it["kind"] != "q": continue
        t, c = TARGET[qi % 4], int(it["correct"]); qi += 1
        if c != t: it["options"][c - 1], it["options"][t - 1] = it["options"][t - 1], it["options"][c - 1]; it["correct"] = str(t)
snip = snip_base + ("\n" + snip_vocab if VOC else "")

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
if not M.get("roadmap") and VOC:
    wl = [i["title"] for i in items if i.get("vocab")]
    M["roadmap"] = [["Words %d to %d" % (s + 1, min(s + 5, len(wl))), ", ".join(wl[s:s + 5]) + ". For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions."] for s in range(0, len(wl), 5)]
road = "".join("        <li><b>%s</b><br>%s</li>\n" % (esc(t), esc(d)) for t, d in M["roadmap"])
mins = int(nw * 1.5 + nq * 0.5) if VOC else nc * 2 + nq
stat1 = ('<div class="cp-stat"><b>%d</b><span>Words</span></div>' % nw) if VOC else ('<div class="cp-stat"><b>%d</b><span>Concept pages</span></div>' % nc)
ov = f'''      <p class="cp-lead">{esc(M["lead"])}</p>
      <div class="cp-stats">
        {stat1}
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
    if v["t"] == "scene":  # picture for a vocabulary word: full prompt text
        ip.append('  %s: %s' % (J(img + name), J(SCENE % (v["word"], v["scene"]))))
        lst.append("%s | AI | picture for the word '%s': %s" % (name, v["word"], v["scene"])); continue
    body = ('t: "thumb", accent: %s, objects: %s' % (J(M["accent"]), J(v["objects"]))) if v["t"] == "thumb" else ('t: "fig", about: %s' % J(v["about"]))
    ip.append('  %s: { %s }' % (J(img + name), body))
    lst.append("%s | AI | %s" % (name, v["objects"] if v["t"] == "thumb" else v["about"]))
L.append("window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {\n" + ",\n".join(ip) + "\n});\n")
L.append("/* CHANGE LOG\n" + "\n".join("   - " + x for x in (M.get("changelog") or ["No corrections to the book's content."])) + "\n*/\n")
outdir = os.path.join(root, "scripts", chap); os.makedirs(outdir, exist_ok=True)
out = os.path.join(outdir, chap + ".js")
open(out, "w", encoding="utf-8").write(snip + "\n" + "\n".join(L))
open(os.path.join(outdir, "image_list.txt"), "w", encoding="utf-8").write("Save every image in  %s\n\n" % img + "\n".join(lst) + "\n")
nf, nr = sum(v["t"] in ("fig", "scene") for v in ALL.values()), sum(v["t"] == "real" for v in ALL.values())
print("written:", out, "| concepts", nc, "| questions", nq, "| images", len(ALL), "(AI %d, download %d, +thumbnail) | tags length" % (nf, nr), total())
r = subprocess.run(["node", os.path.join(HERE, "validate.js"), out], capture_output=True, text=True)
print((r.stdout + r.stderr).strip())