#!/usr/bin/env python3
"""python patch_snippet3.py <existing_chapter.js> [more.js ...]
Adds (or refreshes) SNIPPET 3 = the speaker button beside the word, in already-built chapter files.
Run patch_snippet2.py first if a file still has the old SNIPPET 2."""
import sys, os
H = os.path.dirname(os.path.abspath(__file__))
sn = open(os.path.join(H, "snippets.txt"), encoding="utf-8").read()
new = sn[sn.index("/* ═══ SNIPPET 3"):sn.index("/* ═══ END SNIPPETS")].rstrip() + "\n\n"
for f in sys.argv[1:]:
    t = open(f, encoding="utf-8").read(); nl = "\r\n" if "\r\n" in t else "\n"; t = t.replace("\r\n", "\n")
    def nxt(after):
        c = [i for i in (t.find("/* Field:", after), t.find("window.TEST_DATA = {", after)) if i >= 0]
        return min(c) if c else -1
    a = t.find("/* ═══ SNIPPET 3")
    if a >= 0:
        e = nxt(a)
        if e < 0: print("skipped (cannot find end of SNIPPET 3):", f); continue
        t = t[:a] + new + t[e:]; msg = "refreshed"
    else:
        s2 = t.find("/* ═══ SNIPPET 2")
        e = nxt(s2 if s2 >= 0 else 0)
        if s2 < 0 or e < 0: print("skipped (SNIPPET 2 / data block not found):", f); continue
        t = t[:e] + new + t[e:]; msg = "added"
    open(f, "w", encoding="utf-8", newline="").write(t.replace("\n", nl)); print(msg + ":", f)
