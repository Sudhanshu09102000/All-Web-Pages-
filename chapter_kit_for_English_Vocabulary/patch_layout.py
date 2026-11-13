#!/usr/bin/env python3
"""python patch_layout.py <existing_chapter.js> [more.js ...]
Moves the picture of every vocabulary word page to the top-right (beside the meaning cards) on PC/tablet,
and above the meaning, full width, on phones. Safe to run twice. Run patch_snippet3.py too (badge lookup)."""
import sys, re
BADGE = '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px">'
for f in sys.argv[1:]:
    t = open(f, encoding="utf-8", newline="").read()
    nl = "\r\n" if "\r\n" in t else "\n"
    L = t.replace("\r\n", "\n").split("\n")
    out, i, n = [], 0, 0
    while i < len(L):
        if L[i].strip() == '<div class="cp-vocab">' and i + 6 < len(L) and 'class="cp-fig"' in L[i + 6] and BADGE in L[i + 1]:
            ind = L[i][: len(L[i]) - len(L[i].lstrip())]
            acc = re.search(r"background:(#[0-9a-fA-F]{6})", L[i + 1]).group(1)
            alt = re.search(r'alt="([^"]*)"', L[i + 6]).group(1)
            src = re.search(r'src="([^"]*)"', L[i + 6]).group(1)
            badge = L[i + 1].replace('<span style="padding:4px 14px', '<span class="cp-pos" style="padding:4px 14px', 1)
            fig = (ind + '<div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;'
                   f'background:linear-gradient(135deg,{acc},{acc}77,#f6dc9577);box-shadow:0 14px 30px -14px {acc}99,0 2px 6px rgba(0,0,0,.12)">'
                   f'<img src="{src}" alt="{alt}" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:{acc}14"></div>')
            out += [L[i],
                    ind + '<div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">',
                    fig,
                    ind + '<div style="flex:1 1 300px;min-width:0">',
                    badge, L[i + 2], L[i + 3],
                    ind + '</div></div>',
                    L[i + 4], L[i + 5]]
            i += 7; n += 1
        else:
            out.append(L[i]); i += 1
    open(f, "w", encoding="utf-8", newline="").write(nl.join(out))
    print("patched %d word pages:" % n, f)
