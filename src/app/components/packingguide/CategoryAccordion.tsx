import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { C, type Season } from './data';

export default function CategoryAccordion({
  season,
  openCategory,
  onToggle,
}: {
  season: Season;
  openCategory: number | null;
  onToggle: (i: number) => void;
}) {
  return (
    <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      {season.categories.map((cat, ci) => (
        <div key={cat.title} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            className="w-full flex items-center justify-between py-5 pr-8 text-left transition-colors duration-200"
            onClick={() => onToggle(ci)}
            style={{ color: openCategory === ci ? C.gold : 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span className="flex items-center gap-4">
              <span style={{ fontSize: '20px' }}>{cat.icon}</span>
              <span style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: openCategory === ci ? 600 : 400 }}>
                {cat.title}
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
                {cat.items.length} items
              </span>
            </span>
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              style={{ transform: openCategory === ci ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
            />
          </button>
          <AnimatePresence initial={false}>
            {openCategory === ci && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                style={{ overflow: 'hidden', listStyle: 'none', padding: 0, margin: 0, paddingBottom: '20px' }}
              >
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-2 pr-8"
                    style={{ fontSize: '13px', color: 'rgba(238,238,238,0.55)', lineHeight: 1.5 }}
                  >
                    <Check size={12} strokeWidth={2} style={{ color: C.gold, flexShrink: 0, marginTop: '3px' }} />
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
