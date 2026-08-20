'use client';

import { notFound } from 'next/navigation';
import PageHero from '@/app/components/PageHero';
import { destinationData } from './destinationdetail/data';
import HistorySection from './destinationdetail/HistorySection';
import RelatedTours from './destinationdetail/RelatedTours';
import DetailCTA from './destinationdetail/DetailCTA';

export { destinationData };

export default function DestinationDetail({ slug }: { slug: string }) {
  const dest = destinationData.find((d) => d.slug === slug);
  if (!dest) notFound();

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        eyebrow={dest.region}
        eyebrowLines
        title={dest.name}
        subtitle={dest.tagline}
      />
      <HistorySection dest={dest} />
      <RelatedTours dest={dest} />
      <DetailCTA destName={dest.name} />
    </div>
  );
}
