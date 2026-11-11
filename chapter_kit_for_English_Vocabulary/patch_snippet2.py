#!/usr/bin/env python3
"""python patch_snippet2.py <existing_chapter.js> [more.js ...]
Replaces the old SNIPPET 2 inside already-built chapter files with the fixed one from snippets.txt."""
import sys, os
H = os.path.dirname(os.path.abspath(__file__))
sn = open(os.path.join(H, "snippets.txt"), encoding="utf-8").read()
new = sn[sn.index("/* ═══ SNIPPET 2"):sn.index("/* ═══ SNIPPET 3")].rstrip()
for f in sys.argv[1:]:
    t = open(f, encoding="utf-8").read(); nl = "\r\n" if "\r\n" in t else "\n"; t = t.replace("\r\n", "\n")
    a, td = t.find("/* ═══ SNIPPET 2"), t.find("window.TEST_DATA")
    if a < 0 or td < a: print("skipped (SNIPPET 2 not found):", f); continue
    b = a + t[a:td].rindex("})();") + len("})();")
    open(f, "w", encoding="utf-8", newline="").write((t[:a] + new + t[b:]).replace("\n", nl)); print("patched:", f)
