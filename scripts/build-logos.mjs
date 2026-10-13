// Generates every CartaFlow logo asset from logos/src/glyphs.json + the stamp geometry below.
// Usage: node scripts/build-logos.mjs
// Outputs (cleaned and rebuilt every run): logos/{svg,png,pdf,app-icon,favicon,social}
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import PDFDocument from 'pdfkit';
import SVGtoPDF from 'svg-to-pdfkit';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOGOS = path.join(ROOT, 'logos');
const G = JSON.parse(fs.readFileSync(path.join(LOGOS, 'src', 'glyphs.json'), 'utf8'));

// ---------- brand colors ----------
const C = {
  red: '#CC3421', // Vermelhão
  navy: '#14213D', // Marinho
  paper: '#F6F4EF', // Papel postal
  white: '#FFFEFB', // Paper white
  frame: mix('#FFFEFB', '#CC3421', 0.5), // 50% paper over red, solid
};

function mix(a, b, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return '#' + x.map((v, i) => Math.round(v * t + y[i] * (1 - t)).toString(16).padStart(2, '0')).join('').toUpperCase();
}

const SCHEMES = {
  primary: { kind: 'color', stamp: C.red, inner: C.white, frame: C.frame, word: C.navy },
  reversed: { kind: 'color', stamp: C.red, inner: C.white, frame: C.frame, word: C.paper },
  'mono-black': { kind: 'mono', color: '#000000' },
  'mono-white': { kind: 'mono', color: '#FFFFFF' },
  'mono-navy': { kind: 'mono', color: C.navy },
  'mono-red': { kind: 'mono', color: C.red },
};

// ---------- geometry helpers ----------
const n = (v) => +v.toFixed(3);

// Rectangle W x H with semicircular perforations of radius r cut into every edge.
// Hole centres are evenly spaced per edge with the same corner margin m on all four edges.
// One closed path walked clockwise; sweep-flag 0 bulges every arc into the stamp.
function stampBody(W, H, r, holesX, holesY, m) {
  const sx = (W - 2 * m) / (holesX - 1);
  const sy = (H - 2 * m) / (holesY - 1);
  const xs = Array.from({ length: holesX }, (_, i) => m + i * sx);
  const ys = Array.from({ length: holesY }, (_, i) => m + i * sy);
  let d = `M0 0`;
  for (const x of xs) d += `H${n(x - r)}A${r} ${r} 0 0 0 ${n(x + r)} 0`; // top, left -> right
  d += `H${W}`;
  for (const y of ys) d += `V${n(y - r)}A${r} ${r} 0 0 0 ${W} ${n(y + r)}`; // right, top -> bottom
  d += `V${H}`;
  for (const x of [...xs].reverse()) d += `H${n(x + r)}A${r} ${r} 0 0 0 ${n(x - r)} ${H}`; // bottom, right -> left
  d += `H0`;
  for (const y of [...ys].reverse()) d += `V${n(y + r)}A${r} ${r} 0 0 0 0 ${n(y - r)}`; // left, bottom -> top
  return d + 'Z';
}

function roundRect(x, y, w, h, rr) {
  return `M${n(x + rr)} ${n(y)}H${n(x + w - rr)}A${rr} ${rr} 0 0 1 ${n(x + w)} ${n(y + rr)}V${n(y + h - rr)}A${rr} ${rr} 0 0 1 ${n(x + w - rr)} ${n(y + h)}H${n(x + rr)}A${rr} ${rr} 0 0 1 ${n(x)} ${n(y + h - rr)}V${n(y + rr)}A${rr} ${rr} 0 0 1 ${n(x + rr)} ${n(y)}Z`;
}

// Transform a path's absolute/relative commands by scale + translate (SVGPathPen emits absolute commands).
function transformPath(d, s, tx, ty) {
  return d.replace(/([MLHVCSQTAZmlhvcsqtaz])([^MLHVCSQTAZmlhvcsqtaz]*)/g, (_, cmd, args) => {
    const nums = (args.match(/-?\d*\.?\d+(?:e-?\d+)?/g) || []).map(Number);
    const up = cmd.toUpperCase();
    if (cmd !== up && up !== 'Z') throw new Error('relative commands not expected in glyph paths');
    let out;
    if (up === 'H') out = nums.map((v) => n(v * s + tx));
    else if (up === 'V') out = nums.map((v) => n(v * s + ty));
    else if (up === 'Z') out = [];
    else out = nums.map((v, i) => n(i % 2 === 0 ? v * s + tx : v * s + ty));
    return up + out.join(' ');
  });
}

// ---------- the stamp ----------
const W = 52, H = 64;
const FULL = {
  body: stampBody(W, H, 3.3, 6, 7, 5.0),
  frame: roundRect(6.85, 6.85, W - 13.7, H - 13.7, 2.15) + roundRect(8.35, 8.35, W - 16.7, H - 16.7, 0.65),
  c: glyphC(41, 26.35, 32.1),
};
const SIMPLE = {
  body: stampBody(W, H, 4.4, 3, 4, 8.6),
  frame: '',
  c: glyphC(53, 26.4, 32),
};

// the stamp's "c": font-size fs units, bbox centre placed at (cx, cy)
function glyphC(fs, cx, cy) {
  const s = fs / G.unitsPerEm;
  const b = G.c.bbox;
  const tx = cx - (b.x + b.width / 2) * s;
  const ty = cy - (b.y + b.height / 2) * s;
  return transformPath(G.c.path, s, tx, ty);
}

// stamp group at scale s, origin (x, y)
function stamp(geo, scheme, s = 1, x = 0, y = 0) {
  const t = `transform="translate(${n(x)} ${n(y)}) scale(${n(s)})"`;
  if (scheme.kind === 'mono') {
    return `<path ${t} fill="${scheme.color}" fill-rule="evenodd" d="${geo.body}${geo.frame}${geo.c}"/>`;
  }
  return `<g ${t}><path fill="${scheme.stamp}" d="${geo.body}"/>${geo.frame ? `<path fill="${scheme.frame}" fill-rule="evenodd" d="${geo.frame}"/>` : ''}<path fill="${scheme.inner}" d="${geo.c}"/></g>`;
}

// ---------- wordmark ----------
const WM = G.wordmark; // font units, baseline y=0, ink from bbox.y to bbox.y+height
function wordmark(fill, F, x, baseline) {
  const s = F / G.unitsPerEm;
  return `<path fill="${fill}" d="${transformPath(WM.path, s, x - WM.bbox.x * s, baseline)}"/>`;
}
const wordColor = (sc) => (sc.kind === 'mono' ? sc.color : sc.word);

// ---------- lockups (tight viewBoxes, font-size F = 100 units) ----------
const F = 100;
const sW = (h) => (h * W) / H;
const wmW = (WM.bbox.width * F) / G.unitsPerEm;
const wmTop = (WM.bbox.y * F) / G.unitsPerEm; // negative
const wmBottom = ((WM.bbox.y + WM.bbox.height) * F) / G.unitsPerEm;

function lockup(kind, schemeName, geo = FULL) {
  const sc = SCHEMES[schemeName];
  let w, h, body;
  if (kind === 'horizontal') {
    const sh = 1.38 * F, sw = sW(sh), gap = 0.29 * F;
    const centre = -0.31 * F; // optical centre between x-height band and ascenders
    const top = centre - sh / 2;
    w = sw + gap + wmW;
    h = sh;
    body = stamp(geo, sc, sh / H, 0, 0) + wordmark(wordColor(sc), F, sw + gap, -top);
  } else if (kind === 'vertical') {
    const sh = 1.6 * F, sw = sW(sh), gap = 0.35 * F;
    w = Math.max(wmW, sw);
    h = sh + gap + (wmBottom - wmTop);
    body = stamp(geo, sc, sh / H, (w - sw) / 2, 0) + wordmark(wordColor(sc), F, (w - wmW) / 2, sh + gap - wmTop);
  } else if (kind === 'mark' || kind === 'mark-simplified') {
    w = W; h = H;
    body = stamp(kind === 'mark' ? FULL : SIMPLE, sc, 1, 0, 0);
  } else if (kind === 'wordmark') {
    w = wmW; h = wmBottom - wmTop;
    body = wordmark(wordColor(sc), F, 0, -wmTop);
  }
  return { w: n(w), h: n(h), body };
}

const svgDoc = (w, h, body, { pxW, pxH, title = 'CartaFlow' } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"${pxW ? ` width="${n(pxW)}" height="${n(pxH)}"` : ''} role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

// ---------- output helpers ----------
const rm = (p) => fs.rmSync(path.join(LOGOS, p), { recursive: true, force: true });
const write = (p, data) => {
  const f = path.join(LOGOS, p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, data);
};
const png = async (svg, file) => {
  const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  write(file, buf);
  return buf;
};
function pdf(svg, w, h, widthPt, file) {
  return new Promise((resolve) => {
    const heightPt = (h / w) * widthPt;
    const doc = new PDFDocument({ size: [widthPt, heightPt], margin: 0, info: { Title: 'CartaFlow logo', Author: 'CartaFlow' } });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => { write(file, Buffer.concat(chunks)); resolve(); });
    SVGtoPDF(doc, svg, 0, 0, { width: widthPt, height: heightPt, preserveAspectRatio: 'xMidYMid meet' });
    doc.end();
  });
}

// postmark waves pattern (navy at low opacity)
function waves(w, h, { gap = 56, amp = 11, len = 84, stroke = 4.5, opacity = 0.06, color = C.navy } = {}) {
  let d = '';
  for (let y = gap / 2; y < h + gap; y += gap) {
    d += `M${-len} ${y}`;
    for (let x = -len, k = 0; x < w + len; x += len / 2, k++) d += `Q${n(x + len / 4)} ${n(y + (k % 2 ? amp : -amp))} ${n(x + len / 2)} ${y}`;
  }
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-opacity="${opacity}"/>`;
}

// ---------- build ----------
const LOCKUPS = ['horizontal', 'vertical', 'mark', 'wordmark'];
const PNG_SIZES = {
  horizontal: [32, 64, 128, 256],
  wordmark: [32, 64, 128, 256],
  vertical: [128, 256, 512],
  mark: [16, 32, 48, 64, 128, 256, 512, 1024],
  'mark-simplified': [16, 32, 48, 64, 128, 256, 512, 1024],
};

async function main() {
  for (const d of ['svg', 'png', 'pdf', 'app-icon', 'favicon', 'social']) rm(d);
  const counts = {};
  const bump = (k) => (counts[k] = (counts[k] || 0) + 1);

  // SVG masters + PNG exports + PDFs
  for (const kind of [...LOCKUPS, 'mark-simplified']) {
    for (const scheme of Object.keys(SCHEMES)) {
      const { w, h, body } = lockup(kind, scheme);
      const svg = svgDoc(w, h, body);
      write(`svg/cartaflow-${kind}-${scheme}.svg`, svg); bump('svg');
      for (const px of PNG_SIZES[kind]) {
        await png(svgDoc(w, h, body, { pxW: (w / h) * px, pxH: px }), `png/${kind}/${scheme}/cartaflow-${kind}-${scheme}-${px}.png`);
        bump('png');
      }
      if (['horizontal', 'vertical', 'mark'].includes(kind)) {
        const widthPt = { horizontal: 283.46, vertical: 170.08, mark: 70.87 }[kind]; // 100 mm, 60 mm, 25 mm wide
        await pdf(svg, w, h, widthPt, `pdf/cartaflow-${kind}-${scheme}.pdf`); bump('pdf');
      }
    }
  }

  // App icons: full-bleed squares (platforms round them) + rounded variants for UI use
  const ICON = {
    paper: { bg: C.paper, scheme: SCHEMES.primary, ratio: 0.64 },
    red: { bg: C.red, scheme: { kind: 'mono', color: '#FFFFFF' }, ratio: 0.64 },
    navy: { bg: C.navy, scheme: SCHEMES.primary, ratio: 0.64 },
  };
  const iconSvg = (key, geo, { rounded = false, px } = {}) => {
    const { bg, scheme, ratio } = ICON[key];
    const S = 100, sh = S * (geo === SIMPLE ? ratio + 0.08 : ratio), sw = sW(sh);
    const rect = rounded ? `<rect width="${S}" height="${S}" rx="22.5" fill="${bg}"/>` : `<rect width="${S}" height="${S}" fill="${bg}"/>`;
    return svgDoc(S, S, rect + stamp(geo, scheme, sh / H, (S - sw) / 2, (S - sh) / 2), px ? { pxW: px, pxH: px } : {});
  };
  for (const key of Object.keys(ICON)) {
    write(`app-icon/cartaflow-app-icon-${key}.svg`, iconSvg(key, FULL)); bump('app-icon');
    write(`app-icon/cartaflow-app-icon-${key}-rounded.svg`, iconSvg(key, FULL, { rounded: true })); bump('app-icon');
    for (const px of [1024, 512, 256, 192, 180, 167, 152, 120, 96, 64, 48, 32]) {
      await png(iconSvg(key, px <= 48 ? SIMPLE : FULL, { px }), `app-icon/png/${key}/cartaflow-app-icon-${key}-${px}.png`); bump('app-icon');
    }
  }

  // Favicons
  const fav = (px) => svgDoc(64, 64, stamp(SIMPLE, SCHEMES.primary, 1, 6, 0), px ? { pxW: px, pxH: px } : {});
  write('favicon/favicon.svg', fav()); bump('favicon');
  const icoBufs = [];
  for (const px of [16, 32, 48]) {
    const buf = await sharp(Buffer.from(fav(px))).png().toBuffer();
    icoBufs.push(buf);
    if (px !== 48) { write(`favicon/favicon-${px}.png`, buf); bump('favicon'); }
  }
  write('favicon/favicon.ico', await pngToIco(icoBufs)); bump('favicon');
  await png(iconSvg('paper', FULL, { px: 180 }), 'favicon/apple-touch-icon.png'); bump('favicon');
  await png(iconSvg('paper', FULL, { px: 192 }), 'favicon/icon-192.png'); bump('favicon');
  await png(iconSvg('paper', FULL, { px: 512 }), 'favicon/icon-512.png'); bump('favicon');
  {
    // maskable: stamp diagonal kept inside the central 80% circle
    const S = 512, sh = 290, sw = sW(sh);
    const svg = svgDoc(S, S, `<rect width="${S}" height="${S}" fill="${C.paper}"/>` + stamp(FULL, SCHEMES.primary, sh / H, (S - sw) / 2, (S - sh) / 2), { pxW: S, pxH: S });
    await png(svg, 'favicon/icon-maskable-512.png'); bump('favicon');
  }
  write('favicon/mask-icon.svg', svgDoc(64, 64, stamp(SIMPLE, SCHEMES['mono-black'], 1, 6, 0))); bump('favicon');
  write('favicon/site.webmanifest', JSON.stringify({
    name: 'CartaFlow',
    short_name: 'CartaFlow',
    icons: [
      { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    theme_color: C.red,
    background_color: C.paper,
    display: 'standalone',
  }, null, 2) + '\n'); bump('favicon');

  // Social
  {
    const Wd = 1200, Hd = 630;
    const L = lockup('horizontal', 'primary');
    const lw = 560, lh = (L.h / L.w) * lw;
    const og = svgDoc(Wd, Hd, `<rect width="${Wd}" height="${Hd}" fill="${C.paper}"/>${waves(Wd, Hd)}<g transform="translate(${n((Wd - lw) / 2)} ${n((Hd - lh) / 2)}) scale(${n(lw / L.w)})">${L.body}</g>`, { pxW: Wd, pxH: Hd });
    write('social/og-default.svg', og); await png(og, 'social/og-default.png'); counts.social = 2;
    const av = (bg, scheme) => {
      const S = 1080, sh = 620, sw = sW(sh);
      return svgDoc(S, S, `<rect width="${S}" height="${S}" fill="${bg}"/>` + stamp(FULL, scheme, sh / H, (S - sw) / 2, (S - sh) / 2), { pxW: S, pxH: S });
    };
    const ap = av(C.paper, SCHEMES.primary), ar = av(C.red, { kind: 'mono', color: '#FFFFFF' });
    write('social/avatar-paper.svg', ap); await png(ap, 'social/avatar-paper.png');
    write('social/avatar-red.svg', ar); await png(ar, 'social/avatar-red.png');
    counts.social += 4;
  }

  console.log('built', counts);
}

main().catch((e) => { console.error(e); process.exit(1); });
