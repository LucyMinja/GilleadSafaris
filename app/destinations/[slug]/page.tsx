import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import DestinationDetail from '@/app/pages/DestinationDetail';
import { destinationData } from '@/app/data/destinations';

// Zanzibar and Kilimanjaro now live in their own Beach / Trekking sections —
// send the old destination URLs there instead of keeping a duplicate page.
const MOVED: Record<string, string> = { zanzibar: '/beach', kilimanjaro: '/trekking' };

// Moved slugs are still generated: this site is a static export (no server),
// so an old URL only redirects if a page exists at it to do the redirecting.
export function generateStaticParams() {
  return destinationData.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinationData.find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: `${dest.name} — Gillead Safaris Tanzania`,
    description: dest.tagline,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (MOVED[slug]) redirect(MOVED[slug]);
  const dest = destinationData.find((d) => d.slug === slug);
  if (!dest) notFound();
  return (
    <Suspense>
      <DestinationDetail slug={slug} />
    </Suspense>
  );
}
