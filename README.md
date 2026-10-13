# CartaFlow Design System

Tokens, rules, components, fonts and every logo file for CartaFlow. The website, the platform, emails and printed letters all consume this package, so they stay identical.

**Start with [`DESIGN.md`](DESIGN.md).** It is the rulebook for humans and AI agents.

## What's inside

| Path | What |
|---|---|
| `DESIGN.md` | The rules: color roles, type scale, components, layout, motion, logo, voice, accessibility |
| `tokens/` | Source of truth in W3C design-token (DTCG) JSON: primitives, light and dark semantics, typography, component sizes |
| `dist/tokens.css` | CSS custom properties (`--cf-*`), light and dark (system preference or `data-theme`) |
| `dist/tailwind.css` | Tailwind v4 theme. Replaces Tailwind's defaults so only CartaFlow tokens exist |
| `dist/tokens.js` | Typed JS tokens and spring presets (for Motion, charts, canvas, emails) |
| `css/base.css` | Element defaults (focus, selection, reduced motion, text wrapping) |
| `css/components.css` | Framework-agnostic component classes (`cf-btn`, `cf-card`, `cf-stamp`, ...) |
| `css/fonts.css` | `@font-face` for non-Next.js consumers |
| `react/` | React components that render the same classes (Button, Card, Field, Stamp, Logo, ...) |
| `fonts/` | Bricolage Grotesque variable woff2, subset for Portuguese and English (74 KB, OFL) |
| `logos/` | Every logo: SVG, PNG, PDF, app icons, favicons, social images. See `logos/README.md` |
| `docs/` | `tokens.md` (generated reference), `components.md`, `content.md` (voice and claims) |

## Use it

```bash
npm install @cartaflow/design-system   # or a git/file dependency until it is published
```

**Next.js + Tailwind v4** (`app/globals.css`):

```css
@import 'tailwindcss';
@import '@cartaflow/design-system/tailwind.css';
@import '@cartaflow/design-system/base.css';
@import '@cartaflow/design-system/components.css';
```

```tsx
import localFont from 'next/font/local';
const brand = localFont({ src: '../node_modules/@cartaflow/design-system/fonts/BricolageGrotesque-Variable.woff2', variable: '--cf-font-brand', weight: '400 800', display: 'swap' });
// <html className={brand.variable}> and set --cf-font-family-sans: var(--cf-font-brand), ui-sans-serif, system-ui, sans-serif;
```

```tsx
import { Button, Card, Logo } from '@cartaflow/design-system/react';
<Button size="lg">Enviar carta</Button>
<div className="bg-raised border border-line rounded-lg p-6 text-fg-secondary">...</div>
```

**Any other stack:** link `dist/tokens.css`, `css/fonts.css`, `css/base.css`, `css/components.css` and use the `cf-` classes.

## Commands

```bash
npm run build        # tokens -> css/tailwind/js, contrast check, React logo data, React build, docs/tokens.md
npm run check        # WCAG AA contrast check of every semantic pair, both themes
npm run build:logos  # regenerate every logo file from logos/src/glyphs.json
open preview/index.html   # visual reference of tokens and components
```

## Rules for contributors

- Never edit `dist/` or generated files. Edit `tokens/` and rebuild.
- A new color, size or component needs a reason written in `DESIGN.md`.
- Semver: removing or renaming a token is MAJOR, adding is MINOR, adjusting a value is PATCH. Log it in `CHANGELOG.md`.

## Licenses

Code and brand assets: proprietary, CartaFlow. Bricolage Grotesque: SIL Open Font License 1.1 (`fonts/OFL.txt`).
