# Components

Every component is a CSS class in `css/components.css` and a React component in `react/`. The React component only adds the class, so a page built with plain HTML, Tailwind, React or any other framework renders identically. Tailwind utilities may place a component (margin, width, grid position) but must not restyle it (color, type, radius, shadow).

## Button

```tsx
import { Button, buttonClass } from '@cartaflow/design-system/react';

<Button>Enviar carta</Button>
<Button variant="secondary" size="lg">Falar com vendas</Button>
<Link href="/precos" className={buttonClass({ variant: 'outline' })}>Ver preços</Link>
```

| | sm | md (default) | lg | xl |
|---|---|---|---|---|
| Height | 32 | 40 | 48 | 56 |
| Padding x | 12 | 16 | 20 | 24 |
| Font size | 14 | 15 | 16 | 17 |
| Icon | 16 | 18 | 20 | 20 |

| Variant | Use | Rule |
|---|---|---|
| `primary` | The single most important action in a view | One per view. Red. |
| `secondary` | Strong alternative (Marinho) | Pairs with primary, or leads when red would be too loud (platform toolbars). |
| `outline` | Secondary choices | Default for "Ver preços", "Cancelar". |
| `ghost` | Toolbars, tertiary actions | Needs context to be recognizable as a button. |
| `danger` | Destructive, irreversible actions | Crimson, always with a confirming sentence. |
| `link` | Inline actions inside text | Looks like a link, behaves like a button. |

States: hover (darker one step, 150 ms), press (scale 0.97, 100 ms), focus-visible (2 px Marinho ring, 2 px offset), disabled (45% opacity, `not-allowed`), loading (`aria-busy`, 75% opacity, label stays).
Rules: labels are 1 to 3 words, start with a verb, never wrap. Icon-only buttons need `aria-label`. Hero CTAs use `lg` or `xl`; platform UI uses `sm` or `md`. On a red brand band the primary button turns paper with red text automatically.

## Inputs and fields

```tsx
<Field id="cep" label="CEP" hint="Somente números" error={errors.cep}>
  <Input id="cep" inputMode="numeric" autoComplete="postal-code" aria-describedby={errors.cep ? 'cep-error' : 'cep-hint'} invalid={!!errors.cep} />
</Field>
```

- Heights 36 / 44 (default) / 52. Font 16 px. Padding x 14 px. Radius 10 px.
- Label above, always visible. Placeholder is an example (`00000-000`), never the label.
- Hint below in caption style. An error replaces the hint, in crimson with an icon and a full sentence ("Informe um CEP com 8 dígitos.").
- Validate on blur, not on every keystroke. Keep the user's input on error.
- Use the right `inputMode` and `autoComplete` (CEP, CPF, CNPJ, email, phone).
- Checkboxes and radios: native controls with `accent-color` red, 18 px, label on the right, whole row clickable.

## Card

`<Card>` paper-white, 1 px border, 14 px radius, 24 px padding. Props: `tone` (default, sunken, inverse, brand), `padding` (none, sm 16, md 24, lg 32), `interactive` (hover lift 2 px + `elevation-md`; put the link on the card's title and stretch it, so there is one tab stop).
Rules: no shadows on static cards. Do not nest cards; use a divider or `surface-sunken` inside instead. A grid of cards needs visual variety (one image, one tinted, one stat) or it should not be cards.

## Badge

Pill, 24 px (sm 20 px), 13 px semibold. Tones: neutral, brand, success, warning, danger, info. Use for status (Postada, Rascunho, Erro), plan labels and counts. A badge is not a button and never sits alone as the only status signal for color-blind users: the text is the status.

## Callout

`<Callout tone="warning" icon={<AlertTriangle />} title="Prazos">...</Callout>` A bordered, tinted panel with an icon. Tones: neutral, brand, info, success, warning, danger. Warning and danger render `role="alert"`. Use for limitations, notices and important caveats in docs and pricing.

## Stamp (selo)

`<Stamp>` perforated postage-stamp container with an inner frame line. Tones: brand (red, default), paper, navy. `tilt` rotates it -4 degrees for illustration. Content: a short label, a number, an OTP code, a plan name. One per viewport. Minimum size 64 x 64 px so the perforation reads.

## Waves

`<Waves />` the postmark cancellation lines as a 16 px decorative divider. `<Waves field />` fills its container as a background pattern at 6% opacity (position it absolutely behind content that has its own surface). Always decorative and `aria-hidden`.

## Section and Container

`<Section tone="subtle">` applies the vertical rhythm (64 / 96 px, compact 48 / 64) and the surface. Tones: default, subtle, sunken, inverse (Marinho band, pair with the reversed logo), brand (one per page).
`<Container width="content">` centers content at 1200 px (prose 680, wide 1320) with responsive gutters.

## Heading and Text

`<Heading as="h2" size="h1">` keeps the document outline semantic while choosing the visual size. One `h1` per page. Never skip levels in the HTML outline.
`<Text size="lead">` for intros, `body-sm` for platform UI, `caption` for metadata.

## Navigation bar

`.cf-nav` sticky material bar, 56 / 64 px. Links use `.cf-nav__link` (14 px medium, secondary color, primary on hover and `aria-current="page"`). At most 5 top-level links plus one primary button. Mobile: logo, primary action, menu button; the menu opens as a full-height sheet from the top.

## Code block

`.cf-code-block` always dark navy in both themes. Token classes: `tok-key`, `tok-string`, `tok-number`, `tok-keyword`, `tok-comment`, `tok-punct`. Include a copy button (ghost, sm, top-right) on every block over one line. Label the language above the block in caption style.

## Table

Wrap in `.cf-table-wrap`. `body-sm`, sunken header, hairline rows, tabular numbers, `data-align="end"` for numeric columns. Over 6 columns on mobile: switch to stacked cards, do not just scroll.

## Segmented control

`.cf-segmented` for 2 to 4 mutually exclusive options (monthly/annual, cURL/Node/Python). The selected item is a raised paper chip with `elevation-sm`. Use `aria-pressed` or `role="tab"` with `aria-selected`.

## Icons

Lucide (`lucide-react`), stroke 1.75, 16 / 20 / 24 px, `currentColor`. Pair with text whenever the meaning is not universal. Never draw custom icons; if Lucide lacks a glyph, use the closest one or text.
