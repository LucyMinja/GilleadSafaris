// Makes small/medium/large WebP copies of every photo in public/images, so
// phones download a ~60 KB image instead of the full 500 KB+ original.
// Runs automatically before `npm run dev` / `npm run build` (see package.json).
// Only new or changed photos are processed, so repeat runs take ~1 second.
// Output: public/img/<name>-<width>.webp — referenced by CoverImage's srcset.
import { readdir, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';

export const WIDTHS = [640, 1280, 1920];
const SRC = 'public/images';
const OUT = 'public/img';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('[images] sharp not available — skipping (committed copies in public/img are used).');
  process.exit(0);
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
let made = 0;

for (const file of files) {
  const src = path.join(SRC, file);
  const base = file.replace(/\.[^.]+$/, '');
  const srcTime = (await stat(src)).mtimeMs;
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    const existing = await stat(out).catch(() => null);
    if (existing && existing.mtimeMs >= srcTime) continue;
    // Never upscale: a 1200px original still gets a "1920" file, just at 1200px.
    await sharp(src).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 72, effort: 5 }).toFile(out);
    made++;
  }
}
console.log(`[images] ${files.length} photos checked, ${made} sizes generated.`);
