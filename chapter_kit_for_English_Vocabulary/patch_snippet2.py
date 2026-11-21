#!/usr/bin/env python3
"""python patch_snippet2.py <existing_chapter.js> [more.js ...]
Replaces SNIPPET 2 (missing-image card) and, in vocabulary files, SNIPPET 4 (word-page style) inside already-built
chapter files with the latest versions from snippets.txt. If a vocabulary file has no SNIPPET 4 yet, it is added.
Other snippets and all content are left untouched."""
import sys, os
H = os.path.dirname(os.path.abspath(__file__))
sn = open(os.path.join(H, "snippets.txt"), encoding="utf-8").read()
def snippet(n):
    a = sn.index("/* ═══ SNIPPET %d" % n)
    nxt = [sn.find(m, a + 5) for m in ("/* ═══ SNIPPET %d" % (n + 1), "/* ═══ END SNIPPETS")]
    return sn[a:min(x for x in nxt if x > 0)].rstrip()
def end_of(t, a, n):   # end of snippet n that starts at a: next snippet marker, else the file header / data
    c = [t.find(m, a + 5) for m in ("/* ═══ SNIPPET %d" % (n + 1), "/* Field:", "window.TEST_DATA")]
    return min(x for x in c if x > 0)
for f in sys.argv[1:]:
    t = open(f, encoding="utf-8").read(); nl = "\r\n" if "\r\n" in t else "\n"; t = t.replace("\r\n", "\n")
    done = []
    a = t.find("/* ═══ SNIPPET 2")
    if a < 0: print("skipped (SNIPPET 2 not found):", f); continue
    t = t[:a] + snippet(2) + "\n\n" + t[end_of(t, a, 2):].lstrip("\n"); done.append("2")
    if "vc-wrap" in t:
        a = t.find("/* ═══ SNIPPET 4")
        if a >= 0: t = t[:a] + snippet(4) + "\n\n" + t[end_of(t, a, 4):].lstrip("\n")
        else:
            i = t.find("/* Field:"); i = t.find("window.TEST_DATA") if i < 0 else i
            t = t[:i] + snippet(4) + "\n\n" + t[i:]
        done.append("4")
    open(f, "w", encoding="utf-8", newline="").write(t.replace("\n", nl)); print("patched snippet", "+".join(done), ":", f)
