'use client';

import { notFound } from 'next/navigation';
import PageHero from '@/app/components/PageHero';
import { destinationData } from './destinationdetail/data';
import HistorySection from './destinationdetail/HistorySection';
import StoryGallery from './destinationdetail/StoryGallery';
import RelatedTours from './destinationdetail/RelatedTours';
import DetailCTA from './destinationdetail/DetailCTA';

export { destinationData };

export default function DestinationDetail({ slug }: { slug: string }) {
  const dest = destinationData.find((d) => d.slug === slug);
  if (!dest) notFound();

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        eyebrow={dest.region}
        eyebrowLines
        title={dest.name}
        subtitle={dest.tagline}
      />
      {/* HistorySection's opener and StoryGallery's first pairing each get
          their own photo — using the same one twice in a row down the page
          would read as a mistake, not a design choice. Destinations with
          only one verified real photo reuse it (nothing else honest to
          show), everyone else gets the second carousel frame here. */}
      <HistorySection dest={dest} img={dest.story.bigImages[dest.story.bigImages.length > 1 ? 1 : 0]} />
      <StoryGallery bigImages={dest.story.bigImages} bigVignette={dest.story.bigVignette} secondary={dest.story.secondary} />
      <RelatedTours dest={dest} />
      <DetailCTA destName={dest.name} />
    </div>
  );
}
