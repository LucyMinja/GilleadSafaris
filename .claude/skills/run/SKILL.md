---
name: run
description: Launch and verify the Gillead Safaris Next.js app (App Router lives in /app, code in src/ via the @/ alias). Use for any homepage/component change.
---

# Running this project

- Dev server: `npm run dev` (Turbopack, port 3000). Start in background, confirm with `curl -sf http://localhost:3000`.
- Stop: `lsof -ti:3000 -sTCP:LISTEN | xargs -r kill`
- Routes are in `/app` (root-level, e.g. `/app/page.tsx`, `/app/layout.tsx`). Actual component code lives in `/src/app/...` — `@/*` maps to `./src/*` (see tsconfig paths). Edit files under `src/app/pages/*.tsx` and `src/app/components/*.tsx`, not `/app` directly (that dir is just route wiring + a couple of layout files).
- Styles: `src/styles/theme.css` (design tokens: `--background`, `--foreground`, `--primary`/accent, `.btn-primary`/`.btn-secondary`, base h1–h4). Google Fonts are loaded via a `<link rel="stylesheet">` in `app/layout.tsx` `<head>` — currently Newsreader (headings) + Plus Jakarta Sans (body). **Not** a CSS `@import`: Turbopack silently drops an external `@import` nested inside a locally-`@import`'d file, with no build error. `src/styles/fonts.css` is intentionally empty (just a comment) — don't put a font `@import` back in it.
- Images: `public/images/` — a large library of real, high-quality wildlife/landscape photography (files named like `956A####.jpg`), mixed in with some low-quality/generic stock PNGs. Prefer the `956A*` real photos over the illustration-style PNGs when swapping images. Some existing captions don't match their images (a known issue, not a rendering bug) — verify what's actually in a photo before trusting its filename/caption.

## Never run `npm run build` while the dev server is running

Both write to `.next/`, so a production build overwrites the dev server's
compiled CSS and the running site suddenly renders **unstyled** ("my CSS is
gone"). Either stop dev first, or build in a separate git worktree. To recover:
stop the dev server, `rm -rf .next`, then `npm run dev` again.

## Verification — match effort to the change

**Small tweaks (color/copy/spacing/single-element edits):** trust the edit. Don't launch a browser. The dev server compiling without error (check `/tmp/nextdev.log` or the terminal) is enough. Read the diff back if unsure.

**Structural changes (new sections, layout reflow, multi-file rebrand):** one Playwright screenshot pass is enough — a single script that navigates, scrolls through the page once, and screenshots each viewport. Don't re-launch the browser per fix; batch checks into one script run.

```bash
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 4 && curl -sf http://localhost:3000 >/dev/null && echo up
```

```js
// /tmp/shot.mjs — one pass, multiple scroll positions in a single browser session
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
// NOT 'networkidle' — the Hero has an autoplay looping <video>, which keeps
// network activity going forever and makes 'networkidle' hang/timeout. Use
// 'load' and a short explicit wait instead.
await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 20000 });
await page.waitForTimeout(1200);
for (const y of [0, 1200, 2400, 3600]) {
  await page.evaluate(v => window.scrollTo(0, v), y);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/shot-${y}.png` });
}
await browser.close();
```

Playwright/Chromium is already installed on this machine (`~/Library/Caches/ms-playwright`) — no need to reinstall each session, but the `playwright` npm package itself sometimes needs reinstalling in `/tmp` (`cd /tmp && npm install playwright --no-save`) since `/tmp` can get cleared between sessions.

**Verifying a font actually loaded** (not just that the `font-family` string appears in rendered HTML — that only proves the CSS *requests* it, not that it loaded): check for real network requests to `fonts.gstatic.com` via `page.on('response', ...)`, or `curl` the Google Fonts CSS URL directly and confirm it 200s. A silently-dropped font load has no build error and no visual crash — it just falls back to the next font in the stack, which can look deceptively close to correct.

Stop the dev server when done: `lsof -ti:3000 -sTCP:LISTEN | xargs -r kill`.
