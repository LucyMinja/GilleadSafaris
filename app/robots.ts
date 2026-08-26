import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

// Site isn't live yet — block crawling entirely. When ready to go live, change
// `disallow: '/'` to `allow: '/'` here and flip the `robots` metadata in
// app/layout.tsx to 'index, follow'.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
