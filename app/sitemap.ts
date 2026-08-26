import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { destinationData } from '@/app/data/destinations';
import { tours } from '@/app/pages/safaritours/data';

export const dynamic = 'force-static';

const STATIC_ROUTES = [
  '',
  '/about',
  '/accommodation',
  '/booking',
  '/contact',
  '/culture',
  '/destinations',
  '/gallery',
  '/packing',
  '/privacy-policy',
  '/safaris',
  '/terms-conditions',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  const destinationEntries = destinationData.map((d) => ({
    url: `${SITE_URL}/destinations/${d.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const tourEntries = tours.map((t) => ({
    url: `${SITE_URL}/safaris/${t.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...destinationEntries, ...tourEntries];
}
