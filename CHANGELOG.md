# Changelog

## 1.2.0 (2026-10-13)

- Light is now the only active theme by default. The dark theme no longer follows the OS automatically; opt in with `data-theme="dark"` or `data-theme="system"`. The `dark:` Tailwind variant follows the same rule.

## 1.1.1 (2026-10-13)

- Fix: `cf-card--interactive` no longer resets text color, which made text invisible on `cf-card--inverse`.

## 1.1.0 (2026-10-13)

- New: `cf-code-tabs` (language tabs and copy button bar for code blocks).
- New: table row headers (`tbody th`) styled like cells.
- Fix: cards and code blocks can no longer widen a grid track on small screens.
- Logo wordmark color follows the theme and Marinho bands automatically (`--cf-logo-word`).
- Dark theme: `surface-inverse` stays Marinho so the reversed logo always works.

## 1.0.0 (2026-10-13)

- First release of the Selo identity: stamp logo in 4 lockups and 6 color schemes, app icons, favicons, social images.
- Tokens: Vermelhão, Marinho, Papel and Tinta palettes; light and dark semantic themes; 14 text styles; 4 px spacing grid; radii, elevation, motion, z-index, breakpoints.
- Outputs: CSS variables, Tailwind v4 theme, typed JS, React components, generated token reference.
- Bricolage Grotesque variable subset (74 KB).
- Automated WCAG AA contrast check for 78 color pairs.
