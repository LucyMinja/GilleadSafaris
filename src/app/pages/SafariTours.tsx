'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PageHero from '@/app/components/PageHero';
import { tours } from './safaritours/data';
import TourCard from './safaritours/TourCard';
import WhatsIncluded from './safaritours/WhatsIncluded';

export default function SafariTours() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Old links (footer, destination "related tours") used `?open=<id>` to
  // deep-link into an inline expand that no longer exists — redirect those
  // straight to the tour's own detail page instead.
  useEffect(() => {
    const openId = searchParams.get('open');
    if (openId) {
      const match = tours.find((t) => t.id === Number(openId));
      if (match) router.replace(`/safaris/${match.slug}`);
    }
  }, [searchParams, router]);

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Safari Tours"
        subtitle="Ten handcrafted itineraries across Tanzania's parks, beaches and cultures - every safari is tailor-made and quoted to suit your budget."
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-16 text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.01em' }}>
          A starting point, not a fixed package
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          Every itinerary below is a route our guides have actually driven, priced as a real starting point rather than a rigid menu. Tell us your dates, group size, and what you're hoping to see, and we'll adjust the pace, parks, and stops around you.
        </p>
      </div>

      <div className="flex flex-col">
        {tours.map((tour, i) => (
          <TourCard key={tour.id} tour={tour} index={i} />
        ))}
      </div>

      <WhatsIncluded />
    </div>
  );
}
