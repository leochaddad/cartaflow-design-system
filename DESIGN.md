# Design System: CartaFlow (Selo)

The single source of truth for how CartaFlow looks, moves and speaks on every surface: website, platform, docs, emails, printed letters and envelopes. Humans and AI agents read this file before building anything. When this file and any other document disagree, this file wins.

Values live in `tokens/*.json` and compile to `dist/`. Never copy a hex code, size or duration into an app. Import the tokens.

---

## 0. The non-negotiables

1. **Tokens only.** Every color, size, radius, shadow, duration and z-index comes from a token. No raw hex, no `px` that is not on the scale, no Tailwind default palette (it is removed on purpose).
2. **Semantic over primitive.** Product code uses semantic tokens (`surface-page`, `text-secondary`, `action-primary`). Brand primitives (`red-600`, `navy-900`) are for illustration and the logo only.
3. **One accent.** Vermelhão red is the only accent. It means "act here" or "this is CartaFlow". It never decorates, never fills large areas except one brand band per page, and never signals an error.
4. **Paper and ink.** Surfaces and borders come from the warm Papel scale. Text and icons come from the cool Marinho/Tinta scale. Do not mix them up: no navy borders on paper, no warm gray text.
5. **One typeface.** Bricolage Grotesque for everything except code and OTP digits (system monospace). No second brand font, ever.
6. **Contrast is a build step.** `npm run check` fails if any text pair drops below WCAG AA in either theme. Do not ship around it.
7. **Both themes.** Every screen works in light and dark. Semantic tokens switch automatically; if you reach for `dark:` you are probably using the wrong token.
8. **The stamp is rare.** The perforated selo shape appears at most once per viewport: the logo, one hero badge, one verified state or one OTP code.
9. **Honest claims.** No delivery times, tracking, SLAs, international prices or guarantees unless the operations team confirmed them in writing.
10. **No em dashes** in any interface or marketing text, in either language.

---

## 1. Visual theme and atmosphere

**Postal, warm, exact.** CartaFlow turns digital content into physical letters, so the brand feels like good stationery handled by precise machinery: off-white paper, deep navy ink, one stamp-red accent, crisp edges, generous margins.

- **Density:** airy on marketing pages (large type, 96 px section rhythm), compact and calm in the platform (14 px UI text, 8 to 16 px gaps).
- **Personality:** Bricolage Grotesque's ink traps and optical sizing carry the warmth. Layout and color stay restrained so the type can speak.
- **Depth:** mostly flat, like paper on a desk. Separation comes from 1 px borders and surface tone. Shadows are reserved for things that float (menus, modals, a hovered card).
- **Motion:** quick and physical. Things respond on press, move with spring-like ease-out curves and never bounce unless a gesture threw them.
- **What it is not:** not Correios (no yellow, no Correios blue), not Nubank (no purple), not generic AI SaaS (no purple-blue gradients, no glassmorphism everywhere, no neon glows), not patriotic (no green and yellow).

---

## 2. Color palette and roles

### Brand palette

| Name | Hex | Role |
|---|---|---|
| **Vermelhão** (stamp red) | `#CC3421` | The single accent: primary actions, the stamp, key highlights. White text on it passes AA (5.1:1). |
| **Vermelhão escuro** | `#B32C1A` | Red *text* and links on light surfaces (5.8:1). Red-600 is too light for small text. |
| **Rosa carimbo** (postmark pink) | `#F4D4CC` | Text selection, soft brand tint borders. |
| **Marinho** (ink navy) | `#14213D` | Primary text, secondary buttons, the dark navy band, focus rings. |
| **Cinza tinta** (ink gray) | `#5B6275` | Secondary text (5.5:1 on paper). |
| **Papel postal** (postal paper) | `#F6F4EF` | The page background. Warm off-white, like envelope stock. |
| **Paper white** | `#FFFEFB` | Raised surfaces: cards, inputs, menus. |

Full scales (red 50 to 950, navy 50 to 975, paper 0 to 900, ink, and the four status hues) are in `docs/tokens.md`.

### Semantic roles (light / dark)

| Role | Token | Light | Dark |
|---|---|---|---|
| Page | `surface-page` | Papel postal `#F6F4EF` | Night navy `#0B1324` |
| Alternate section | `surface-subtle` | `#FAF9F6` | `#0E1729` |
| Card, input, menu | `surface-raised` | `#FFFEFB` | `#101A2E` |
| Well, table header, inline code | `surface-sunken` | `#EFECE5` | `#070D1A` |
| Navy band (footer, dark feature band) | `surface-inverse` | Marinho `#14213D` | Marinho `#14213D` |
| Brand band (max one per page) | `surface-brand` | Vermelhão | Vermelhão |
| Soft red panel | `surface-brand-subtle` | `#FDF3F1` | `#261824` |
| Translucent nav | `surface-material` | paper at 78% + blur | navy at 72% + blur |
| Primary text | `text-primary` | Marinho | Paper |
| Secondary text | `text-secondary` | Cinza tinta | `#A9B0C0` |
| Disabled / decorative only | `text-tertiary` | `#8A90A0` | `#6E7790` |
| Links, red text | `text-link`, `text-brand` | `#B32C1A` | `#F07A63` |
| Hairline dividers | `border-subtle` | `#E6E2D9` | `#1A2640` |
| Card and table borders | `border-default` | `#DDD9D0` | `#24314F` |
| Outline buttons, hover borders | `border-strong` | `#C8C3B8` | `#34446A` |
| Form control outlines | `border-input` | `#918C82` (3.3:1) | `#5A6788` |
| Focus ring | `border-focus` | Marinho | Paper |

### Status colors

Status hues are deliberately distinct from the brand red. **Danger is crimson `#B42318`, not Vermelhão**, and it always comes with an icon and words. Success green `#17603C`, warning amber `#844A00`, info blue `#234786`, each with a `-subtle` background and `-border`.

### Color rules

- One `surface-brand` band per page at most. A second red block makes the page shout.
- Red never means "error" and crimson never means "click me".
- Color never carries meaning alone: a status also says it in text, a required field says "obrigatório", a chart legend has labels.
- Gradients: none in UI. The only allowed pattern is the postmark waves at 6 to 14% opacity.
- Photos and illustrations sit on `surface-raised` or `surface-sunken` with `radius-xl`, never edge to edge behind text.

---

## 3. Typography rules

**Typeface:** Bricolage Grotesque, variable, weights 400 to 800, optical size axis 12 to 96, self-hosted from `fonts/` (74 KB, the only font file). `font-optical-sizing: auto` stays on, so headlines get the tight ink-trapped cut and text sizes get the open one. **Mono:** system stack (`ui-monospace`, SF Mono, Menlo, Consolas), 0 KB.

### The type scale (the only allowed combinations)

| Style | Size | Line height | Tracking | Weight | Use |
|---|---|---|---|---|---|
| `display` | 44 to 72 px fluid | 1.00 | -0.035em | 800 | Hero headline, once per page |
| `h1` | 36 to 56 px fluid | 1.05 | -0.03em | 800 | Page title |
| `h2` | 28 to 40 px fluid | 1.10 | -0.025em | 700 | Section title |
| `h3` | 22 to 28 px fluid | 1.20 | -0.02em | 700 | Sub-section, feature title |
| `h4` | 20 px | 1.30 | -0.015em | 600 | Card title |
| `h5` | 17 px | 1.35 | -0.01em | 600 | Small title |
| `lead` | 20 px | 1.50 | -0.01em | 400 | Intro paragraph, max 2 per page |
| `body-lg` | 18 px | 1.60 | -0.005em | 400 | Long reading (docs, articles) |
| `body` | 16 px | 1.60 | 0 | 400 | Default |
| `body-sm` | 14 px | 1.50 | +0.003em | 400 | Platform UI, tables, helper text |
| `caption` | 13 px | 1.45 | +0.01em | 400 | Metadata, footnotes. Nothing smaller exists. |
| `label` | 14 px | 1.25 | 0 | 600 | Form labels, tabs, nav |
| `overline` | 12 px caps | 1.20 | +0.08em | 600 | Rare. Max once per page. Never above every section. |
| `code` | 14 px mono | 1.65 | 0 | 400 | Code, API keys, OTP digits |

### Type rules

- Tracking tightens as size grows and opens as it shrinks. Never set one letter-spacing for everything; the scale already does it.
- Emphasis uses weight (600/700) or `text-brand`, never italics in headlines, never a second family, never underline (underline means link).
- Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`. Body measure max 68 characters (`container-prose`, 680 px).
- Hero headline: max 2 lines on desktop. Hero subtext: max 20 words.
- Numbers that compare (prices, counts, OTP codes, tables) use tabular figures (`.cf-tabular`; tables do it automatically).
- Inputs are 16 px minimum so iOS never zooms.
- Weights in use: 400, 500 (nav links), 600, 700, 800. Nothing else.

---

## 4. Component stylings

Every component exists as a CSS class (`css/components.css`) and a React component (`@cartaflow/design-system/react`) rendering the same class. Full specs in `docs/components.md`.

- **Buttons:** softly rounded rectangles (`radius-md`, 10 px), never pills. Heights 32 / 40 / 48 / 56 px. Labels in weight 600, max 3 words, never wrapping. Variants: `primary` (Vermelhão, white text) for the single main action per view; `secondary` (Marinho, paper text); `outline` (strong border); `ghost`; `danger` (crimson); `link`. Feedback is immediate: scale 0.97 on press in 100 ms, color shift on hover in 150 ms. Focus ring: 2 px Marinho, 2 px offset.
- **Cards and containers:** paper-white (`surface-raised`) with a 1 px `border-default` hairline and `radius-lg` (14 px). Flat by default, like paper on a desk. Interactive cards lift 2 px and gain `elevation-md` on hover. Padding 16 / 24 / 32 px.
- **Inputs and forms:** paper-white fill, 1 px `border-input` outline (3.3:1), `radius-md`, 44 px tall by default (36 / 52 alternatives). Label always above in `label` style, never placeholder-as-label. Focus: border turns Marinho with a 1 px Marinho halo. Errors: crimson border plus an icon and a sentence below.
- **Badges:** small pills (`radius-full`), 24 px tall, 13 px semibold. Neutral, brand, success, warning, danger, info.
- **Stamp (selo):** the signature shape. A perforated postage-stamp edge with an inner frame line, made with CSS masks. Vermelhão with white text by default, also paper and navy. One per viewport. Optional -4 degree tilt for illustration only.
- **Postmark waves:** the wavy cancellation lines, used as a quiet divider (`cf-waves`) or a background field at 6% opacity. Decorative, never behind body text.
- **Code blocks:** always dark navy (`#0B1324`) in both themes, 14 px mono, `radius-lg`, 20 px padding, horizontal scroll. Syntax colors: keys soft blue, strings Rosa carimbo, keywords coral, comments ink gray.
- **Tables:** inside a bordered `radius-lg` wrapper, `body-sm`, sunken header row, hairline row dividers, tabular numbers, right-aligned numeric columns.
- **Navigation bar:** sticky, 56 px mobile / 64 px desktop, translucent `material` (78% paper + 16 px blur + saturation) with a hairline bottom border. The only translucent surface on the page.
- **Icons:** Lucide, stroke 1.75, sizes 16 / 20 / 24 px, color inherits the text. Never hand-drawn icons, never mixed icon sets, never filled and outline styles together.

---

## 5. Layout principles

- **Grid:** 4 px base. Allowed spacing steps: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160 px. Nothing in between.
- **Containers:** content 1200 px, wide 1320 px (hero media, bento), prose 680 px (reading). Gutters 16 / 24 / 32 px at mobile / tablet / desktop.
- **Section rhythm:** 64 px vertical padding on mobile, 96 px on desktop (compact: 48 / 64). Consecutive sections alternate `surface-page` and `surface-subtle` or use a hairline, never both.
- **Stack gaps:** 8 px inside a control group, 16 px between related items, 24 px between groups, 40 to 64 px between a section heading block and its content.
- **Breakpoints:** 640, 768, 1024, 1280, 1536 px. Design mobile first; every layout collapses to one column below 768 px.
- **Radii by size:** controls 10 px, cards 14 px, large media and modals 20 px, badges and avatars full. Nested corners: inner radius = outer radius minus padding.
- **Elevation:** level 0 page; level 1 cards (border only); level 2 menus and popovers (`elevation-md`); level 3 modals and sheets (`elevation-xl` on `surface-overlay`); sticky nav uses material, not shadow.
- **Z-index:** only the named layers: base 0, raised 10, sticky 100, dropdown 200, overlay 300, modal 400, toast 500, tooltip 600.
- **Composition (marketing):** left-aligned heroes with a real visual on the right, not centered text over a blob. No three identical cards in a row. A page of 8 sections uses at least 4 different layout patterns. Hero top padding max 96 px.

---

## 6. Motion

| Token | Value | For |
|---|---|---|
| `duration-instant` | 100 ms | press feedback |
| `duration-fast` | 150 ms | hover, color |
| `duration-base` | 220 ms | dropdowns, small enters |
| `duration-slow` | 320 ms | sheets, modals |
| `duration-slower` | 480 ms | hero entrance only |
| `ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | anything entering or responding |
| `ease-standard` | cubic-bezier(0.2, 0, 0, 1) | state changes |
| `ease-in` | cubic-bezier(0.4, 0, 1, 1) | exits |
| springs | snappy 520/42, smooth 300/34, gentle 180/26 | Motion library, bounce 0 |

Rules (from Apple's fluid-interface principles): respond on press, not release; animate only `transform` and `opacity`; every animation is interruptible and starts from the current value; nothing loops forever; exits are faster than enters; `prefers-reduced-motion` replaces movement with short fades.

---

## 7. Logo

The logo is the stamp (selo) plus the `cartaflow` wordmark in lowercase Bricolage Grotesque ExtraBold, outlined. All files are in `logos/` (see `logos/README.md`).

- Lockups: horizontal (default), vertical, mark, mark-simplified (16 to 32 px), wordmark.
- Schemes: `primary` (on paper or white), `reversed` (on Marinho or darker), `mono-black`, `mono-white`, `mono-navy`, `mono-red`.
- Clear space: half the stamp width on every side. Minimum: horizontal 96 px wide, mark 16 px (use mark-simplified at 32 px and below).
- The name is written **CartaFlow** in text, **cartaflow** only inside the logo.
- Never rotate, recolor, outline, shadow, stretch or rearrange it. Never place `primary` on red or navy.

---

## 8. Voice and content

Full guide in `docs/content.md`. In short: Brazilian Portuguese first, natural and direct, "você", short sentences, verbs first on buttons ("Enviar carta", not "Clique aqui"). English pages are written for foreign companies, not translated. No em dashes, no exclamation marks in UI, no unconfirmed promises, no fake numbers.

---

## 9. Accessibility floor

WCAG 2.2 AA in both themes, enforced by `npm run check`. Visible focus on every interactive element. Targets at least 40 x 40 px (24 px minimum with spacing). Labels on every input. Icons that carry meaning have text or `aria-label`. Motion respects `prefers-reduced-motion`. Text scales with the user's browser size (rem everywhere).

---

## 10. Changing the system

1. Edit `tokens/*.json` (never `dist/`).
2. `npm run build` regenerates CSS, Tailwind theme, JS, React and `docs/tokens.md`, and fails on contrast regressions.
3. Bump the version (`MAJOR` when a token is removed or renamed, `MINOR` for additions, `PATCH` for value tweaks) and add a line to `CHANGELOG.md`.
4. Update the website and the platform in the same week. Divergence is a bug.
