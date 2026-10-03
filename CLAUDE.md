# Gillead Safaris

Next.js App Router site. Routes live in `/app` (root-level); actual component
code lives in `/src/app/...` — `@/*` maps to `./src/*` (see tsconfig paths).
Edit files under `src/app/pages/*.tsx` and `src/app/components/*.tsx`, not
`/app` directly (that dir is just route wiring).

## Container / alignment convention

Every non-full-bleed section (i.e. anything that isn't an intentional
edge-to-edge photo/video moment) aligns to the same `1400px` column so
section content lines up vertically as you scroll — e.g. a heading in one
section sits at the same left edge as the heading in the section above it.

Apply the max-width and the horizontal padding **on the same element**, and
the padding value must be **exactly `px-6 lg:px-16`** — not `px-8`, not
`lg:px-14`, not any other variant:

```tsx
<section style={{ backgroundColor: '#F1EAE0' }} className="py-20 lg:py-28">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-16 ...">
    {/* content */}
  </div>
</section>
```

**Vertical rhythm**: every section's top/bottom padding should also match —
currently **`py-20 lg:py-28`** — for the same reason as the horizontal
padding above (mismatched values look "roughly right" alone but create
uneven gaps between sections when you scroll). The one deliberate exception
is the About→WhatWeOffer transition, which is intentionally tighter
(About's `pb-10 lg:pb-14`, WhatWeOffer's `pt-6 lg:pt-8`) because About's
floating Polaroid photo already overflows below the section and provides
its own visual breathing room — adding full padding on top of that
overflow created a much bigger gap than intended. Don't "fix" that pair
back to the standard without checking the actual rendered gap first.

This has broken twice for two different reasons — check both when a section
looks misaligned against its neighbors:

1. **Double-applied padding**: putting padding on the `<section>` AND the
   max-width wrapper separately (section padding + wrapper's own centering
   margin stack), which pulls that section's content noticeably closer to
   the viewport edges than siblings on wide screens. Fix: padding lives on
   the `max-w-[1400px]` element only, never the outer `<section>`. (Stats,
   CTA, Testimonials all had this.)
2. **Inconsistent padding value**: every section must use the identical
   `px-6 lg:px-16` — a section using `px-8` or `lg:px-14` instead will be
   offset from its neighbors by however many pixels differ, even though
   both look "roughly right" in isolation. Grep for `px-6 lg:px-1` across
   `Home.tsx` and confirm every match is `px-16` if you touch any section's
   container. (WhatWeOffer and SafarisGrid both drifted to `lg:px-14`.)
3. **`justify-around` on a flex row of a few items**: this is a container-
   padding lookalike bug, not an actual padding bug — the padding can be
   pixel-identical to neighboring sections and the row will *still* look
   misaligned, because `justify-around` puts half a gap's worth of space
   before the first item and after the last, insetting them from the true
   container edge. If a row's first/last item needs to line up with text
   above or below it, use `justify-between` instead. (StatsStrip had this —
   diagnosed by measuring `getBoundingClientRect().left` on the first stat
   vs. the About heading in a live page, not by reading the className.)

The nav bar and footer are intentionally NOT part of this exercise yet —
they still use their own width (`px-6 lg:px-20` uncapped, and `max-w-7xl`
respectively). Don't change them for this without being asked; align new
homepage sections to `1400px`, matching About/WhatWeOffer/Destinations/
SafarisGrid/Testimonials/CTA. (There's no Stats section anymore — cut, it
was reading as generic filler rather than real credibility.)

## Design tokens

- Palette: Soft Beige `#F1EAE0` (background), Dark Olive `#6D6753` (text),
  Safari Brown `#8D694B` (accent/CTA). Defined in `src/styles/theme.css`.
  Site chrome (navbar, dropdowns, side menu, footer) uses the darker Deep
  Olive `--chrome: #4E493A` with white text; the active nav item is tan
  `#C9A97E` and the "Plan your safari" link is sunset orange `#E9A36B`.
  Chrome text sizes come from `src/app/components/chromeType.ts` (`navLabel`,
  `subLabel`, `chromeLink`, `chromeSmall`) — spread those instead of hand-setting
  font sizes in nav/menu/footer code.
- Fonts: Newsreader (headings/titles ONLY, variable weights 600/700/800 —
  no light weights imported on purpose, don't set anything under 600 on it)
  + Plus Jakarta Sans (body/paragraphs, 400/500/600/700). Loaded via a
  `<link rel="stylesheet">` in `app/layout.tsx` `<head>` — **not** a CSS
  `@import`. Turbopack silently drops an external `@import url(...)` when
  it's nested inside a locally-`@import`'d file (`src/styles/fonts.css` →
  `index.css`): it never appears in the compiled CSS bundle and no font
  request ever fires, with no build error to indicate anything's wrong — the
  page just silently falls back to Georgia. If you touch the font stack,
  edit the URL in both `app/layout.tsx` and the comment in
  `src/styles/fonts.css`, and verify with a real network check (`curl` the
  Google Fonts CSS URL, and confirm `fonts.gstatic.com` requests actually
  fire in the browser) rather than trusting that a font-family string
  appearing in rendered HTML means the font loaded.
  History: started as Playfair Display (too
  decorative/high-contrast, read as "wedding invitation"), tried Fraunces
  (too plain/normal per feedback), landed on Newsreader as the closest free
  match to a referenced boutique-hospitality serif (something in the
  Tiempos/Canela family, not available on Google Fonts) — quiet, classic,
  lower stroke contrast, warm rather than flashy. Serif is for titles only;
  never use it for body paragraphs — that's what made the Kuona-style
  reference site feel calm instead of like a novel.

## Type scale for body text

Reading text was sitting at 13–15px across the homepage, which read as
small/cramped. Standardized scale (applied across Home.tsx):

- **Eyebrow / label** (uppercase, tracked, e.g. "WHAT WE OFFER") — 10–11px.
  Fine as-is, these are intentionally tiny+tracked, not reading text. Use
  sparingly — About's own eyebrow label was removed because every section
  having an identical kicker-label-then-headline made the page feel templated.
- **Headers** (card/list titles — e.g. safari package names) — **20px**.
- **Body copy** (paragraphs people actually read — About intro, CTA blurb) —
  **18px**, line-height ~1.8.
- **Supporting text** (list item descriptions, card descriptions, contact
  values) — **17px**. Briefly tried 17/16 on request, reverted the same
  session — text on this page reads as small/cramped below this, which is
  the whole reason the scale got bumped up multiple times in the first
  place. Don't go lower without a real reason.
- **Display quotes/headings** — sized individually for impact (`clamp(...)`),
  not part of this scale.

Don't reintroduce sub-17px sizes for anything meant to be read as prose.

## Avoiding templated/"AI-generated" patterns

This came up repeatedly during the homepage rework — the individual patterns
below aren't wrong on their own (real editorial sites use them), but repeating
the *same* formula on every section is what reads as generated rather than
art-directed:

- Don't give every section an identical uppercase-eyebrow + big-serif-headline
  opener. Vary it, or drop the eyebrow where the headline/content already
  makes the section obvious.
- Don't default to a numbered 01/02/03 feature list for value props — it's
  the generic AI-marketing-copy move. Prefer something specific and voiced
  (a real quote from a named team member, a concrete anecdote) over an
  abstract bulleted list.
- Don't add a thin horizontal accent dash before every small label — it's
  a common generated-design tell. A label can stand on its own.
- When in doubt, tie content to something specific and real (an actual
  person, an actual place, an actual number) rather than generic marketing
  phrasing.
- Don't italicize + recolor one word/phrase inside an otherwise-plain
  headline (e.g. "We grew up **here**" with "here" in italic accent brown).
  Every homepage headline did this — removed per feedback: it reads as
  inconsistent, not intentional. A headline should be one weight, one
  color, one style throughout. If a headline needs emphasis, get it from
  word choice or a line break, not mixed typography within the same line.

## Images

`public/images/` has a large library of real, high-quality wildlife/landscape
photography (files named like `956A####.jpg`) mixed in with some low-quality
generic-stock PNGs (`leopard.png`, `elephantsafari.png`, `kili.png`, etc).
Prefer the `956A*` real photos over the illustration-style PNGs when swapping
images. Some existing image/caption pairings don't match (a real bug found
and partly fixed on the homepage, e.g. "Wildebeest Migration" was pointing at
a lion portrait) — verify what's actually in a photo before trusting its
filename or existing caption.

## Performance pipeline (keep the site light)

- **Photos**: put originals in `public/images/`. `scripts/optimize-images.mjs`
  runs automatically before `dev`/`build` (`predev`/`prebuild`) and writes
  640/1280/1920px WebP copies to `public/img/` (commit them — Vercel may not
  have `sharp`). Always render photos through `CoverImage` (it builds the
  `srcset`); pass `sizes` for anything narrower than ~60% of the screen
  (e.g. `sizes="33vw"` for 3-column cards).
- **Heroes**: the homepage keeps the ocean video (`HeroVideo`, self-hosted
  and compressed in `public/video/`: 1280px 3.7 MB / 768px 1.1 MB + poster —
  never the original 53 MB Pexels 4K stream). Every other page passes its own
  photo to `PageHero` via `image=` (+ `imagePosition` to keep a subject in
  frame for portrait shots). Inner-page heroes are curated Pexels photos
  (`public/images/px-*.jpg`, credited in `ATTRIBUTIONS.md`) chosen for a
  moody, cinematic, clearly-wild look; About and Contact deliberately keep
  Gillead's own guide/vehicle photos. Never use zoo/captive-animal photos.
- **Link check**: `scripts/check-links.mjs` runs after every build
  (`postbuild`) and fails it if any internal link/image in `out/` is broken.
- **Dependencies**: only lucide-react, motion, next, react, react-dom,
  tw-animate-css are used. Check usage before adding a library.

## Running / verifying

See `.claude/skills/run/SKILL.md`.
