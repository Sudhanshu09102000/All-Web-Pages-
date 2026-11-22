#!/usr/bin/env python3
"""python patch_figrows.py <existing_chapter.js> [more.js ...]
For chapter files that were built BEFORE the image-row update: adds SNIPPET 4 (the row style) and puts every
run of 2+ consecutive images into one side-by-side row. Keeps a .bak copy. Safe to run twice."""
import sys, os, re, shutil
H = os.path.dirname(os.path.abspath(__file__))
sn = open(os.path.join(H, "snippets.txt"), encoding="utf-8").read()
s4 = sn[sn.index("/* ═══ SNIPPET 4"):sn.index("/* ═══ END SNIPPETS")].rstrip() + "\n\n"
FIG = r'<div class="cp-fig"><img [^>]*></div>'
RUN = re.compile(r"(?:%s)(?:\s*(?:%s))+" % (FIG, FIG))
def wrap(m):
    figs = re.findall(FIG, m.group(0)); n = len(figs)
    rows = -(-n // 4); size = -(-n // rows); out = []
    for i in range(0, n, size):
        c = figs[i:i + size]
        out.append(c[0] if len(c) == 1 else '<div class="cp-figrow n%d">' % len(c) + "".join('<div class="cp-figcell">%s</div>' % x for x in c) + "</div>")
    return "\n      ".join(out)
for f in sys.argv[1:]:
    t = open(f, encoding="utf-8", newline="").read(); nl = "\r\n" if "\r\n" in t else "\n"; t = t.replace("\r\n", "\n")
    if "cp-figrow" in t and "cpfr-style" in t: print("already done:", f); continue
    i = t.find("window.TEST_DATA")
    if i < 0: print("skipped (no TEST_DATA):", f); continue
    j = t.rfind("/* Field:", 0, i); i = j if j >= 0 else i
    head, body = t[:i], t[i:]
    if "cpfr-style" not in head: head += s4
    body, k = RUN.subn(wrap, body)
    shutil.copy(f, f + ".bak")
    open(f, "w", encoding="utf-8", newline="").write((head + body).replace("\n", nl)); print("patched: %s  (%d image rows)" % (f, k))
