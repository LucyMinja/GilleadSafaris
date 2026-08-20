'use client';

import { useState, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import PageHero from '@/app/components/PageHero';
import { lodges } from './accommodation/lodges';
import type { Lodge } from './accommodation/types';
import CategoryTabs from './accommodation/CategoryTabs';
import LodgeRow from './accommodation/LodgeRow';
import LodgeModal from './accommodation/LodgeModal';

export default function Accommodation() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedLodge, setSelectedLodge] = useState<Lodge | null>(null);
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

  const filtered = activeCategory === 'All' ? lodges : lodges.filter(l => l.category === activeCategory);

  return (
    <>
      <div style={{ backgroundColor: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <PageHero
          eyebrow="Where You Sleep"
          title="Accommodation"
          subtitle="Every property handpicked. Every stay intentional. From baobab treehouses to oceanfront villas."
        />
        <CategoryTabs activeCategory={activeCategory} onTabClick={handleTabClick} />

        <div ref={contentRef} className="flex flex-col">
          {filtered.map((lodge, i) => (
            <LodgeRow key={lodge.id} lodge={lodge} index={i} onView={setSelectedLodge} />
          ))}
        </div>

        <div className="py-10 px-6 lg:px-20 text-center" style={{ backgroundColor: '#faf7f4', borderTop: '1px solid rgba(138,105,79,0.1)' }}>
          <p style={{ fontSize: '13px', color: 'rgba(44,24,16,0.45)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
            These properties are shown for inspiration. When you book a safari with us, our team selects and confirms the right lodge for your dates, group size, and budget.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedLodge && <LodgeModal lodge={selectedLodge} onClose={() => setSelectedLodge(null)} />}
      </AnimatePresence>
    </>
  );
}
