'use client';

import PageHero from '@/app/components/PageHero';
import CultureSections from './culture/CultureSections';
import CuisineSection from './culture/CuisineSection';
import CultureCTA from './culture/CultureCTA';

export default function Culture() {
  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Culture & Heritage"
        subtitle="Tanzania is not just landscapes and wildlife. It is the Maasai warrior standing at sunset, the Hadzabe hunter reading the morning tracks, the spice-trader's carved door in Stone Town."
        image="/images/px-maasai-adumu.jpg"
        imagePosition="center 30%"
      />
      <CultureSections />
      <CuisineSection />
      <CultureCTA />
    </div>
  );
}
