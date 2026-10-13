// Fails the build if any required text/background pair drops below WCAG AA in either theme.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const flat = JSON.parse(readFileSync(join(root, 'dist/tokens.json'), 'utf8'));

function rgb(c) {
  if (c.startsWith('#')) return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const m = c.match(/rgba?\(([^)]+)\)/);
  return m[1].split(',').slice(0, 3).map(Number);
}
const lum = (c) => rgb(c).map((v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const T = 'color.text.', S = 'color.surface.', A = 'color.action.', B = 'color.border.', ST = 'color.status.';
const pairs = [
  ...['primary', 'secondary'].flatMap((t) => ['page', 'subtle', 'raised', 'sunken'].map((s) => [T + t, S + s, 4.5])),
  [T + 'placeholder', S + 'raised', 4.5],
  [T + 'brand', S + 'page', 4.5], [T + 'brand', S + 'raised', 4.5], [T + 'link', S + 'page', 4.5], [T + 'link-hover', S + 'page', 4.5],
  [T + 'on-brand', A + 'primary', 4.5], [T + 'on-brand', A + 'primary-hover', 4.5], [T + 'on-brand', A + 'primary-active', 4.5],
  [T + 'on-brand', S + 'brand', 4.5],
  [A + 'on-secondary', A + 'secondary', 4.5], [A + 'on-secondary', A + 'secondary-hover', 4.5],
  [T + 'inverse', S + 'inverse', 4.5], [T + 'inverse-secondary', S + 'inverse', 4.5],
  [T + 'primary', S + 'brand-subtle', 4.5],
  ...['success', 'warning', 'danger', 'info'].flatMap((s) => [[ST + s, ST + s + '-subtle', 4.5], [ST + s, S + 'page', 4.5], [ST + s, S + 'raised', 4.5]]),
  [B + 'input', S + 'raised', 3], [B + 'input', S + 'page', 3], [B + 'focus', S + 'page', 3], [B + 'focus', S + 'raised', 3],
  [A + 'primary', S + 'page', 3],
];

let fail = 0;
for (const mode of ['light', 'dark']) {
  for (const [fg, bg, min] of pairs) {
    const r = ratio(flat[fg][mode], flat[bg][mode]);
    const ok = r >= min;
    if (!ok) fail++;
    if (!ok || process.argv.includes('--all')) console.log(`${ok ? 'ok  ' : 'FAIL'} ${mode.padEnd(5)} ${fg} on ${bg}: ${r.toFixed(2)} (min ${min})`);
  }
}
console.log(fail ? `\n${fail} contrast failures` : `All ${pairs.length * 2} contrast pairs pass.`);
process.exit(fail ? 1 : 0);
