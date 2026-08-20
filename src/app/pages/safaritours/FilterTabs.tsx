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
      className="sticky top-[96px] z-30 overflow-x-auto"
      style={{ backgroundColor: '#F1EAE0', borderBottom: '1px solid rgba(109,103,83,0.14)', scrollbarWidth: 'none' } as React.CSSProperties}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex items-stretch" style={{ height: '64px' }}>
        {tourTypes.map((type) => (
          <button
            key={type}
            onClick={(e) => onTabClick(type, e)}
            className="relative shrink-0 flex items-center px-6 lg:px-7"
            onMouseEnter={() => setHoveredTab(type)}
            onMouseLeave={() => setHoveredTab(null)}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: activeType === type ? 700 : 500,
              color: activeType === type || hoveredTab === type ? '#8D694B' : '#6D6753',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {type}
            {activeType === type && (
              <motion.div
                layoutId="tab-indicator-safaris"
                className="absolute bottom-0 left-0 right-0"
                style={{ height: '2px', backgroundColor: '#8D694B' }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
