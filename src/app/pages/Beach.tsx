'use client';

import PageHero from '@/app/components/PageHero';
import CoverImage from '@/app/components/CoverImage';
import RevealOnView from '@/app/pages/home/RevealOnView';
import { toursIn } from './safaritours/data';
import TourCard from './safaritours/TourCard';
import WhatsIncluded from './safaritours/WhatsIncluded';

export default function Beach() {
  const trips = toursIn('beach');

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Zanzibar & the Coast"
        subtitle="White sand, spice-scented old towns and warm Indian Ocean reefs. Stay on the beach, or finish your safari there."
        image="/images/px-zanzibar-dhow-sunset.jpg"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-16 text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.01em' }}>
          An hour's flight from the Serengeti
        </h2>
        <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          Most of our guests end their safari with a few days by the sea, and it's the easiest add-on in Tanzania. A daily flight connects Arusha and the Serengeti airstrips straight to Zanzibar. Take one of the trips below as it is, or tell us your dates and we'll build the beach days around your safari.
        </p>
      </div>


      <div className="flex flex-col">
        {trips.map((tour, i) => (
          <TourCard key={tour.id} tour={tour} index={i} />
        ))}
      </div>

      <WhatsIncluded category="beach" />
    </div>
  );
}
