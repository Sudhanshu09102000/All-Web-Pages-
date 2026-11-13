#!/usr/bin/env python3
"""python patch_vocab_v2.py <existing_chapter.js> [more.js ...]
Upgrades already-built vocabulary files to the PREMIUM FIT-TO-SCREEN word-page layout:
  1. rewrites every word page (cp-vocab) into the new two-column markup (same words, meanings, pictures, sentences);
  2. adds / refreshes SNIPPET 4 (the layout styles + title-card shrinking) from snippets.txt.
Safe to run twice. Keeps CRLF/LF line endings. New builds (build.py) already produce this layout."""
import sys, os, re
H = os.path.dirname(os.path.abspath(__file__))
sn = open(os.path.join(H, "snippets.txt"), encoding="utf-8").read().replace("\r\n", "\n")
SNIP4 = sn[sn.index("/* ═══ SNIPPET 4"):sn.index("/* ═══ END SNIPPETS")].rstrip() + "\n\n"

def on_color(h):
    h = h.lstrip("#"); r, g, b = [int(h[i:i + 2], 16) for i in (0, 2, 4)]
    f = lambda c: (c / 255) / 12.92 if c / 255 <= .03928 else (((c / 255) + .055) / 1.055) ** 2.4
    return "#111" if .2126 * f(r) + .7152 * f(g) + .0722 * f(b) > .32 else "#fff"

PILL = re.compile(r'<span style="display:inline-block[^>]*>(.*?)</span>', re.S)
def build(body):
    acc = re.search(r'<span (?:class="cp-pos" )?style="padding:4px 14px[^>]*background:(#[0-9a-fA-F]{6})', body).group(1)
    img = re.search(r'<img src="([^"]+)" alt="([^"]*)"', body)
    pos = re.search(r'<span (?:class="cp-pos" )?style="padding:4px 14px[^>]*>(.*?)</span>', body, re.S).group(1)
    ipa = re.search(r'<span translate="no" style="opacity:\.75;font-style:italic">(.*?)</span>', body, re.S)
    mean = re.search(r'<p class="cp-lead" style="margin:0">(.*?)</p>', body, re.S).group(1)
    hindi = re.search(r'<p lang="hi"[^>]*>(.*?)</p>', body, re.S).group(1)
    syn = re.search(r'✅ Synonyms</div>(.*?)</div><div style="flex:1 1 210px', body, re.S).group(1)
    ant = re.search(r'↔️ Antonyms</div>(.*?)</div></div>', body, re.S).group(1)
    sents = re.findall(r'<span style="flex:none;width:24px[^>]*>(\d)</span><span>(.*?)</span></div>', body, re.S)
    syns, ants = PILL.findall(syn), PILL.findall(ant)
    if not (img and sents and len(sents) == 3 and syns): raise ValueError("unrecognised word page")
    tags = lambda L, c: "".join('<span class="vp-tag %s">%s</span>' % (c, x) for x in L)
    rows = "".join('<div class="vp-s"><span class="vp-n">%s</span><span class="vp-t">%s</span></div>' % (
        n, t.replace('<span title="shown in the picture">🖼️</span>', '<span class="vp-mark" title="shown in the picture">🖼️</span>').strip()) for n, t in sents)
    return ('\n      <div class="cp-vocab vp" style="--a:%s;--on:%s">'
            '<div class="vp-grid"><div class="vp-left">'
            '<div class="vp-meta"><span class="cp-pos vp-pos">%s</span>%s</div>'
            '<div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">%s</p></div>'
            '<div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">%s</p></div></div>'
            '<div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags">%s</div></div>'
            '<div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags">%s</div></div></div>'
            '<div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div>%s</div></div>'
            '<div class="vp-frame"><img src="%s" alt="%s"></div></div></div>\n    '
            % (acc, on_color(acc), pos, ('<span translate="no" class="vp-ipa">%s</span>' % ipa.group(1)) if ipa else "", mean, hindi,
               tags(syns, "syn"), tags(ants, "ant") or '<span class="vp-none">—</span>', rows, img.group(1), img.group(2)))

PAT = re.compile(r'(\n    html: `)(\s*<div class="cp-vocab">.*?)(`\n  \},)', re.S)
for f in sys.argv[1:]:
    t = open(f, encoding="utf-8", newline="").read(); nl = "\r\n" if "\r\n" in t else "\n"; t = t.replace("\r\n", "\n")
    n = [0, 0]
    def rep(m):
        try: out = m.group(1) + build(m.group(2)) + m.group(3); n[0] += 1; return out
        except Exception as e: n[1] += 1; print("  could not convert one page:", str(e)[:60]); return m.group(0)
    t = PAT.sub(rep, t)
    # SNIPPET 4: refresh if present, else insert right before the data block
    nxt = lambda after: min([i for i in (t.find("/* Field:", after), t.find("window.TEST_DATA = {", after)) if i >= 0] or [-1])
    a = t.find("/* ═══ SNIPPET 4")
    if a >= 0:
        e = nxt(a)
        if e < 0: print("skipped (cannot find end of SNIPPET 4):", f); continue
        t = t[:a] + SNIP4 + t[e:]; msg = "SNIPPET 4 refreshed"
    else:
        e = nxt(0)
        if e < 0: print("skipped (data block not found):", f); continue
        t = t[:e] + SNIP4 + t[e:]; msg = "SNIPPET 4 added"
    open(f, "w", encoding="utf-8", newline="").write(t.replace("\n", nl))
    print("%s: %d word pages upgraded, %d failed, %s" % (f, n[0], n[1], msg))
