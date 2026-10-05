// Runs after `npm run build`. Fails the build if any page shows the same
// photo twice (e.g. a hero image repeated beside the intro, or a related-tour
// card matching the page's own hero) — every photo on a page must be unique.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
const OUT = process.argv[2] || 'out'; const pages = [];
const walk = d => { for (const f of readdirSync(d)) { const p = path.join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) pages.push(p); } };
walk(OUT);
let n = 0;
for (const p of pages) {
  const html = readFileSync(p, 'utf8').replace(/<head>[\s\S]*?<\/head>/, '').replace(/<script[\s\S]*?<\/script>/g, '');
  const counts = {};
  // one count per <img> element (srcset variants of the same photo count once)
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const s = m[0].match(/\/(?:img|images)\/([^"' ,]+?)(?:-(?:640|1280|1920))?\.(?:webp|jpe?g|png)/); if (!s) continue;
    const k = decodeURIComponent(s[1]); if (/og2|logo/.test(k)) continue; counts[k] = (counts[k] || 0) + 1;
  }
  const d = Object.entries(counts).filter(([, c]) => c > 1);
  if (d.length) { n++; console.error(p.replace(OUT, ''), d.map(([k, c]) => `${k}×${c}`).join(' ')); }
}
if (n) { console.error(`\n[repeats] ${n} page(s) show the same photo more than once (listed above).`); process.exit(1); }
console.log(`[repeats] ${pages.length} pages checked — no photo repeats within a page.`);
