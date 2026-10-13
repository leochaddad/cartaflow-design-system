# CartaFlow brand font

`BricolageGrotesque-Variable.woff2` is the only typeface the website and the platform load. It is Bricolage Grotesque (SIL Open Font License 1.1, see `OFL.txt`), trimmed for speed by `scripts/subset-font.py`.

| | |
|---|---|
| File | `BricolageGrotesque-Variable.woff2` |
| Size | 74.3 KB (76,128 bytes) |
| Axes kept | `wght` 400 to 800, `opsz` 12 to 96 |
| Axes removed | `wdth`, pinned at 100 |
| Characters | Basic Latin (U+0020 to U+007E), Latin-1 Supplement (U+00A0 to U+00FF), plus – — ‘ ’ “ ” … • · € ← → ↑ ↓. Covers all of Portuguese and English. ✓ is not in the font. Use an icon instead. |
| Features | kern, locl, tnum, lnum, pnum, onum, case, frac/numr/dnom. Combining-mark features are dropped because Portuguese uses precomposed letters (ã, ç, é). |

Optical size (`opsz`) is part of the brand. Browsers set it automatically from the font size when `font-optical-sizing: auto` is on, which is the default. Don't turn it off. Display sizes get the tight, ink-trapped cut and text sizes get the open one.

Monospace text such as code and OTP codes uses the system stack (`ui-monospace, "SF Mono", Menlo, Consolas, monospace`). It costs 0 KB.

## Use it exactly like this

```css
@font-face {
  font-family: "Bricolage Grotesque";
  src: url("./BricolageGrotesque-Variable.woff2") format("woff2");
  font-weight: 400 800;
  font-style: normal;
  font-display: swap;
}
```

Preload it on every page, because it is the only font:

```html
<link rel="preload" href="/fonts/BricolageGrotesque-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

In Next.js, use `next/font/local` with this file. It handles the preload and builds a size-adjusted fallback, which prevents layout shift:

```ts
import localFont from "next/font/local";
export const brand = localFont({
  src: "../node_modules/@cartaflow/design-system/fonts/BricolageGrotesque-Variable.woff2",
  weight: "400 800",
  display: "swap",
  variable: "--font-brand",
});
```

## Rebuild

```sh
# download BricolageGrotesque[opsz,wdth,wght].ttf from github.com/google/fonts/tree/main/ofl/bricolagegrotesque
python3 -I scripts/subset-font.py "BricolageGrotesque[opsz,wdth,wght].ttf"
```
