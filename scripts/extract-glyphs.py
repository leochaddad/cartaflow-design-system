"""Outline the CartaFlow wordmark and the stamp's "c" into SVG path data.

Usage: python3 -I scripts/extract-glyphs.py <BricolageGrotesque[opsz,wdth,wght].ttf>

Writes logos/src/glyphs.json so scripts/build-logos.mjs never needs Python or the font.
Instance: wght=800, opsz=96, wdth=100. Shaping via hb-shape (kerning applied),
then a letter-spacing of -0.035em between glyphs. Coordinates are font units with y flipped
(y grows downward, baseline at y=0).
"""
import json
import subprocess
import sys
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

HB_SHAPE = "/opt/homebrew/bin/hb-shape"
LOCATION = {"wght": 800, "opsz": 96, "wdth": 100}
TRACKING = -0.035  # em
ROOT = Path(__file__).resolve().parent.parent

src = Path(sys.argv[1])
var = TTFont(src)
static = instancer.instantiateVariableFont(TTFont(src), LOCATION)
upem = static["head"].unitsPerEm
gs = static.getGlyphSet()
order = static.getGlyphOrder()
os2 = static["OS/2"]


def shape(text):
    variations = ",".join(f"{k}={v}" for k, v in LOCATION.items())
    out = subprocess.run(
        [HB_SHAPE, "--no-glyph-names", f"--variations={variations}", "--output-format=json", str(src), text],
        check=True, capture_output=True, text=True,
    ).stdout
    return json.loads(out)


def r(n):
    return round(n, 2)


def compact(d):
    """Round every number in a path to 2 decimals."""
    import re
    return re.sub(r"-?\d+\.\d+", lambda m: f"{float(m.group()):.2f}".rstrip("0").rstrip("."), d)


def outline(text, tracking=TRACKING):
    glyphs = shape(text)
    pen = SVGPathPen(gs)
    bounds = BoundsPen(gs)
    x = 0.0
    track = tracking * upem
    for i, g in enumerate(glyphs):
        name = order[g["g"]]
        dx, dy = g.get("dx", 0), g.get("dy", 0)
        # flip y: font y-up -> svg y-down, baseline at 0
        t = (1, 0, 0, -1, x + dx, -dy)
        gs[name].draw(TransformPen(pen, t))
        gs[name].draw(TransformPen(bounds, t))
        x += g["ax"] + (track if i < len(glyphs) - 1 else 0)
    xmin, ymin, xmax, ymax = bounds.bounds
    return {
        "text": text,
        "glyphs": [order[g["g"]] for g in glyphs],
        "path": compact(pen.getCommands()),
        "advance": r(x),
        "bbox": {"x": r(xmin), "y": r(ymin), "width": r(xmax - xmin), "height": r(ymax - ymin)},
    }


data = {
    "font": "Bricolage Grotesque",
    "location": LOCATION,
    "tracking_em": TRACKING,
    "unitsPerEm": upem,
    "ascender": static["hhea"].ascent,
    "descender": static["hhea"].descent,
    "xHeight": getattr(os2, "sxHeight", None),
    "capHeight": getattr(os2, "sCapHeight", None),
    "wordmark": outline("cartaflow"),
    "c": outline("c", tracking=0),
}

# measure real x-height from the "x" outline when OS/2 is not reliable
xb = BoundsPen(gs)
gs[static.getBestCmap()[ord("x")]].draw(xb)
data["xHeightMeasured"] = r(xb.bounds[3])

out = ROOT / "logos" / "src" / "glyphs.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(data, indent=2))
print("glyphs:", data["wordmark"]["glyphs"])
print("wordmark bbox:", data["wordmark"]["bbox"], "advance", data["wordmark"]["advance"])
print("c bbox:", data["c"]["bbox"], "xHeight", data["xHeight"], data["xHeightMeasured"], "upem", upem)
