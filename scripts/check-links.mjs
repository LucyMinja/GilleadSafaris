// Runs after `npm run build`. Scans every generated page in out/ and fails the
// build if any internal link, image or video points at something that doesn't
// exist — so a broken link can't reach Vercel unnoticed.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const OUT = 'out';
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = path.join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) pages.push(p); } };
walk(OUT);

const exists = (url) => {
  const clean = decodeURIComponent(url.split(/[?#]/)[0]).replace(/\/$/, '');
  if (clean === '') return true;
  return [clean, clean + '.html', clean + '/index.html'].some((c) => existsSync(path.join(OUT, c)));
};

const broken = new Map();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const refs = [...html.matchAll(/(?:href|src|poster)="(\/[^"]*)"/g), ...html.matchAll(/srcSet="([^"]+)"/gi)]
    .flatMap((m) => m[1].includes(',') || / \d+w/.test(m[1]) ? m[1].split(',').map((s) => s.trim().split(' ')[0]) : [m[1]])
    .filter((u) => u.startsWith('/') && !u.startsWith('//') && !u.startsWith('/_next/'));
  for (const u of refs) if (!exists(u)) broken.set(u, [...(broken.get(u) ?? []), page.replace(OUT, '')]);
}

if (broken.size) {
  console.error(`\n[links] ${broken.size} broken internal link(s):`);
  for (const [u, from] of broken) console.error(`  ${u}  (on ${[...new Set(from)].slice(0, 3).join(', ')})`);
  process.exit(1);
}
console.log(`[links] ${pages.length} pages checked — no broken internal links.`);
