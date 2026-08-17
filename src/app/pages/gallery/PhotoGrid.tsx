import { type RefObject, useState } from 'react';
import { motion } from 'motion/react';
import { categories, type Photo } from './data';

export default function PhotoGrid({
  contentRef,
  activeCategory,
  filtered,
  onTabClick,
  onSelect,
}: {
  contentRef: RefObject<HTMLDivElement | null>;
  activeCategory: string;
  filtered: Photo[];
  onTabClick: (cat: string) => void;
  onSelect: (p: Photo) => void;
}) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <section className="px-6 lg:px-16 py-12" style={{ backgroundColor: '#faf7f4' }}>
      <div
        className="sticky top-[88px] z-30 overflow-x-auto mb-10 -mx-6 lg:-mx-16"
        style={{ backgroundColor: '#ffffff', borderBottom: '1px solid rgba(138,105,79,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', scrollbarWidth: 'none' } as React.CSSProperties}
      >
        <div className="flex items-stretch justify-center" style={{ minWidth: 'max-content', width: '100%', height: '60px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={(e) => { onTabClick(cat); (e.currentTarget as HTMLButtonElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }}
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
                  layoutId="tab-indicator-gallery"
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: '2.5px', backgroundColor: '#8a694f', borderRadius: '2px 2px 0 0' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div ref={contentRef} className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((photo, i) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className="break-inside-avoid cursor-pointer group overflow-hidden relative"
            style={{ borderRadius: '12px', boxShadow: '0 3px 16px rgba(0,0,0,0.08)' }}
            onClick={() => onSelect(photo)}
          >
            <img
              src={photo.img}
              alt={photo.caption}
              className="w-full block transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundColor: '#8a694f' }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
