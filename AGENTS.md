# Working in this repo

This is the CartaFlow design system. `DESIGN.md` is the rulebook; read it before any change.

- Edit `tokens/*.json`, never `dist/`. Run `npm run build` (it fails on contrast regressions).
- Logo files are generated: edit `scripts/build-logos.mjs` or `logos/src/glyphs.json`, then `npm run build:logos`.
- Component CSS lives in `css/components.css`; the React components in `react/` only add those classes.
- Bump the version and update `CHANGELOG.md` with every change.
