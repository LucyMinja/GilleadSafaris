import { useState } from 'react';
import { motion } from 'motion/react';
import { categories } from './data';

export default function FilterTabs({
  activeCategory,
  onTabClick,
}: {
  activeCategory: string;
  onTabClick: (cat: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className="sticky top-[88px] z-30 overflow-x-auto"
      style={{ backgroundColor: '#ffffff', borderBottom: '1px solid rgba(138,105,79,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', scrollbarWidth: 'none' } as React.CSSProperties}
    >
      <div className="flex items-stretch justify-center w-full" style={{ height: '60px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={(e) => onTabClick(cat, e)}
            className="relative shrink-0 flex items-center px-8"
            onMouseEnter={() => setHoveredTab(cat)}
            onMouseLeave={() => setHoveredTab(null)}
            style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: activeCategory === cat ? 700 : 400,
              fontFamily: "'Lato', sans-serif",
              color: activeCategory === cat ? '#8a694f' : hoveredTab === cat ? '#8a694f' : 'rgba(44,24,16,0.65)',
              backgroundColor: hoveredTab === cat && activeCategory !== cat ? 'rgba(138,105,79,0.07)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease, background-color 0.2s ease',
            }}
          >
            {cat}
            {activeCategory === cat && (
              <motion.div
                layoutId="tab-indicator-destinations"
                className="absolute bottom-0 left-0 right-0"
                style={{ height: '2.5px', backgroundColor: '#8a694f', borderRadius: '2px 2px 0 0' }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
