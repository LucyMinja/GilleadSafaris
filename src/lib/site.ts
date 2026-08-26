// Single source of truth for the production domain. Update this one value
// when the site goes live — it feeds metadataBase, sitemap.ts, and robots.ts.
// Also flip `robots` in app/layout.tsx from 'noindex, nofollow' to 'index, follow',
// and change the `disallow: '/'` rule in app/robots.ts to `allow: '/'`.
export const SITE_URL = 'https://www.gilleadsafaris.com';
export const SITE_NAME = 'Gillead Safaris';
