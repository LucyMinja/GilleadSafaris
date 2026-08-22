import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import DestinationDetail from '@/app/pages/DestinationDetail';
import { destinationData } from '@/app/data/destinations';

export function generateStaticParams() {
  return destinationData.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinationData.find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: `${dest.name} Gillead Safaris Tanzania`,
    description: dest.tagline,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinationData.find((d) => d.slug === slug);
  if (!dest) notFound();
  return (
    <Suspense>
      <DestinationDetail slug={slug} />
    </Suspense>
  );
}
