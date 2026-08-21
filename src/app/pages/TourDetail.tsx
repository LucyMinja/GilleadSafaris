'use client';

import { notFound } from 'next/navigation';
import PageHero from '@/app/components/PageHero';
import SafariButton from '@/app/components/SafariButton';
import RevealOnView from '@/app/pages/home/RevealOnView';
import { tours } from '@/app/pages/safaritours/data';
import WhatsIncluded from '@/app/pages/safaritours/WhatsIncluded';
import ItineraryFull from '@/app/pages/tourdetail/ItineraryFull';
import TourFacts from '@/app/pages/tourdetail/TourFacts';
import TourIntro from '@/app/pages/tourdetail/TourIntro';
import RelatedTours from '@/app/pages/tourdetail/RelatedTours';

export { tours };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TourDetail({ slug }: { slug: string }) {
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) notFound();

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero eyebrow={tour.type} title={tour.name} subtitle={tour.duration} />

      <TourIntro tour={tour} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-6 lg:pt-8 pb-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
        <RevealOnView
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          duration={0.8}
          ease={EASE}
          once={false}
          margin="-80px"
        >
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '24px' }}>Full Itinerary</p>
          <ItineraryFull tour={tour} />
        </RevealOnView>

        <RevealOnView
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          duration={0.8}
          delay={0.1}
          ease={EASE}
          once={false}
          margin="-80px"
        >
          {/* top: 50% here would be a percentage of the sticky element's
              containing block — which gets its height from implicit grid
              row-stretch, not an explicit `height`, so the percentage can't
              resolve and browsers treat it as ~0 (the card was snapping
              flush to the top instead of centering). `vh` resolves against
              the viewport instead, sidestepping that — and native sticky
              already won't let the card scroll past the end of this column,
              so it releases at the last day for free. */}
          <div className="lg:sticky lg:top-[30vh]">
            <TourFacts tour={tour} />
          </div>
        </RevealOnView>
      </div>

      <WhatsIncluded />

      <RelatedTours tour={tour} all={tours} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pb-20 lg:pb-28 text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 600, color: '#6D6753', marginBottom: '16px' }}>
          Ready to plan this trip?
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', color: '#6D6753', opacity: 0.8, maxWidth: '520px', margin: '0 auto 32px' }}>
          Tell us your dates and group size, and our Arusha-based team will tailor this itinerary around you.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <SafariButton href="/booking">Plan Your Safari</SafariButton>
          <SafariButton href="/safaris" variant="secondary">Back to All Safaris</SafariButton>
        </div>
      </div>
    </div>
  );
}
