# Working in this repo

This is the CartaFlow design system. `DESIGN.md` is the rulebook; read it before any change.

- Edit `tokens/*.json`, never `dist/`. Run `npm run build` (it fails on contrast regressions).
- Logo files are generated: edit `scripts/build-logos.mjs` or `logos/src/glyphs.json`, then `npm run build:logos`.
- Component CSS lives in `css/components.css`; the React components in `react/` only add those classes.
- Bump the version and update `CHANGELOG.md` with every change.
- Release: commit everything (`dist/` included), then `npm run release` tags `v<version>` and pushes it. The apps install this repo from GitHub at `#semver:^1.x` and pick a release up with `npm run update:ds`; nothing reaches them until a tag is pushed. A MAJOR bump needs the range in each app's `package.json` changed by hand.
