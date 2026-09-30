import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { destinationData } from '@/app/data/destinations';
import { tours, tourHref } from '@/app/pages/safaritours/data';

export const dynamic = 'force-static';

const STATIC_ROUTES = [
  '',
  '/about',
  '/accommodation',
  '/booking',
  '/contact',
  '/culture',
  '/destinations',
  '/essentials',
  '/gallery',
  '/privacy-policy',
  '/cookie-policy',
  '/safaris',
  '/trekking',
  '/beach',
  '/sustainability',
  '/terms-conditions',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  const destinationEntries = destinationData.filter((d) => d.slug !== 'zanzibar' && d.slug !== 'kilimanjaro').map((d) => ({
    url: `${SITE_URL}/destinations/${d.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const tourEntries = tours.map((t) => ({
    url: `${SITE_URL}${tourHref(t)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...destinationEntries, ...tourEntries];
}
