"""Build the CartaFlow web font: Bricolage Grotesque, trimmed for speed.

Usage: python3 -I scripts/subset-font.py <BricolageGrotesque[opsz,wdth,wght].ttf> [out.woff2]

- pins wdth=100 (drops the width axis)
- limits wght to 400..800 when the instancer supports ranges
- keeps opsz 12..96 (optical sizes are part of the brand)
- subsets to Basic Latin + Latin-1 Supplement + a few typographic extras
- keeps layout features (kern, liga, tnum, ...)
"""
import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

src = Path(sys.argv[1])
out = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(__file__).resolve().parent.parent / "fonts" / "BricolageGrotesque-Variable.woff2"

font = TTFont(src)
axes = {a.axisTag: (a.minValue, a.defaultValue, a.maxValue) for a in font["fvar"].axes}
print("axes in source:", axes)

limits = {"wdth": 100}
try:
    limits["wght"] = (400, 800)
    font = instancer.instantiateVariableFont(font, limits)
    print("instanced wdth=100, wght=400..800")
except Exception as e:  # older fontTools without range support
    print("range limiting unsupported, keeping full wght:", e)
    font = TTFont(src)
    font = instancer.instantiateVariableFont(font, {"wdth": 100})

extras = "–—‘’“”…•·€←→↑↓✓"
unicodes = set(range(0x20, 0x7F)) | set(range(0xA0, 0x100)) | {ord(ch) for ch in extras}
cmap = font.getBestCmap()
missing = sorted(chr(u) for u in unicodes if u not in cmap and u >= 0x2000)
if missing:
    print("skipping glyphs not in font:", "".join(missing))
unicodes = {u for u in unicodes if u in cmap}

opts = subset.Options()
# default features (kern, liga, calt, mark, ...) plus the numeric/case ones the UI uses
opts.layout_features = list(subset.Options().layout_features) + ["tnum", "lnum", "pnum", "onum", "case", "frac", "zero", "ss01", "ss02"]
opts.notdef_outline = True
opts.glyph_names = False
opts.hinting = False
opts.flavor = "woff2"
sub = subset.Subsetter(options=opts)
sub.populate(unicodes=unicodes)
sub.subset(font)

out.parent.mkdir(parents=True, exist_ok=True)
font.flavor = "woff2"
font.save(out)
print(f"wrote {out} ({out.stat().st_size / 1024:.1f} KB)")
print("axes in output:", {a.axisTag: (a.minValue, a.defaultValue, a.maxValue) for a in font["fvar"].axes})
