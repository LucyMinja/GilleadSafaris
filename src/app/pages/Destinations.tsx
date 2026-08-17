'use client';

import { useState, useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { destinations } from './destinations/data';
import DestinationsHero from './destinations/DestinationsHero';
import FilterTabs from './destinations/FilterTabs';
import DestinationRow from './destinations/DestinationRow';
import BottomCTA from './destinations/BottomCTA';

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState('All');
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(cat);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setTimeout(() => {
      if (contentRef.current) {
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 0);
  };

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter((d) => d.category === activeCategory);

  return (
    <div style={{ backgroundColor: '#FFFFFF', fontFamily: "'Lato', sans-serif" }}>
      <DestinationsHero heroRef={heroRef} bgY={bgY} textY={textY} heroOpacity={heroOpacity} />
      <FilterTabs activeCategory={activeCategory} onTabClick={handleTabClick} />

      <div ref={contentRef} className="py-20">
        <div className="flex flex-col">
          {filtered.map((dest, i) => (
            <DestinationRow key={dest.id} dest={dest} index={i} />
          ))}
        </div>
      </div>

      <BottomCTA />
    </div>
  );
}
