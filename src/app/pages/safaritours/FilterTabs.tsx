import { useState } from 'react';
import { motion } from 'motion/react';
import { tourTypes } from './data';

export default function FilterTabs({
  activeType,
  onTabClick,
}: {
  activeType: string;
  onTabClick: (type: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className="sticky top-[88px] z-30 overflow-x-auto"
      style={{ backgroundColor: '#ffffff', borderBottom: '1px solid rgba(138,105,79,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', scrollbarWidth: 'none' } as React.CSSProperties}
    >
      <div className="flex items-stretch justify-center w-full" style={{ height: '60px' }}>
        {tourTypes.map((type) => (
          <button
            key={type}
            onClick={(e) => onTabClick(type, e)}
            className="relative shrink-0 flex items-center px-8"
            onMouseEnter={() => setHoveredTab(type)}
            onMouseLeave={() => setHoveredTab(null)}
            style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: activeType === type ? 700 : 400,
              fontFamily: "'Lato', sans-serif",
              color: activeType === type ? '#8a694f' : hoveredTab === type ? '#8a694f' : 'rgba(44,24,16,0.65)',
              backgroundColor: hoveredTab === type && activeType !== type ? 'rgba(138,105,79,0.07)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease, background-color 0.2s ease',
            }}
          >
            {type}
            {activeType === type && (
              <motion.div
                layoutId="tab-indicator-safaris"
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
