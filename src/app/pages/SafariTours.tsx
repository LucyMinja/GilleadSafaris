'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHero from '@/app/components/PageHero';
import { tours } from './safaritours/data';
import FilterTabs from './safaritours/FilterTabs';
import TourCard from './safaritours/TourCard';

export default function SafariTours() {
  const [activeType, setActiveType] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const openId = searchParams.get('open');
    if (openId) {
      const match = tours.find((t) => t.id === Number(openId));
      if (match) {
        setExpandedId(match.id);
        setTimeout(() => {
          const el = document.getElementById(`tour-${match.id}`);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [searchParams]);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (type: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveType(type);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setTimeout(() => {
      if (contentRef.current) {
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 146;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 0);
  };

  const filtered = activeType === 'All' ? tours : tours.filter((t) => t.type === activeType);

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        eyebrow="Curated Experiences"
        title="Safari Tours"
        subtitle="Ten handcrafted itineraries across Tanzania's parks, beaches and cultures - every safari is tailor-made and quoted to suit your budget."
      />
      <FilterTabs activeType={activeType} onTabClick={handleTabClick} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-20 pb-4 lg:pb-6">
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '16px' }}>
          How These Work
        </p>
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.01em', maxWidth: '700px' }}>
          A starting point, not a fixed package
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '760px' }}>
          Every itinerary below is a route our guides have actually driven, priced as a real starting point rather than a rigid menu. Tell us your dates, group size, and what you're hoping to see, and we'll adjust the pace, parks, and stops around you.
        </p>
      </div>

      <div ref={contentRef} className="flex flex-col">
        {filtered.map((tour, i) => (
          <TourCard
            key={tour.id}
            tour={tour}
            index={i}
            expanded={expandedId === tour.id}
            onToggleExpand={() => setExpandedId((id) => (id === tour.id ? null : tour.id))}
          />
        ))}
      </div>
    </div>
  );
}
