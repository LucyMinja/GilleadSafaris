'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, useScroll, useTransform } from 'motion/react';
import { tours, type Tour } from './safaritours/data';
import SafariToursHero from './safaritours/SafariToursHero';
import FilterTabs from './safaritours/FilterTabs';
import TourCard from './safaritours/TourCard';
import TourModal from './safaritours/TourModal';

export default function SafariTours() {
  const [activeType, setActiveType] = useState('All');
  const [selected, setSelected] = useState<Tour | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const openId = searchParams.get('open');
    if (openId) {
      const match = tours.find((t) => t.id === Number(openId));
      if (match) setSelected(match);
    }
  }, [searchParams]);

  const heroRef = useRef<HTMLElement>(null);
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

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const filtered = activeType === 'All' ? tours : tours.filter((t) => t.type === activeType);

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Lato', sans-serif" }}>
      <SafariToursHero heroRef={heroRef} bgY={bgY} textY={textY} heroOpacity={heroOpacity} />
      <FilterTabs activeType={activeType} onTabClick={handleTabClick} />

      <div ref={contentRef} className="flex flex-col">
        {filtered.map((tour, i) => (
          <TourCard key={tour.id} tour={tour} index={i} onSelect={setSelected} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <TourModal tour={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
