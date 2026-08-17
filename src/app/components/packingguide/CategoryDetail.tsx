import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { C, proTip, type Season } from './data';

export default function CategoryDetail({ season, openCategory }: { season: Season; openCategory: number | null }) {
  if (openCategory === null) return <div className="hidden lg:block pl-12 pt-4" />;

  const cat = season.categories[openCategory];

  return (
    <div className="hidden lg:block pl-12 pt-4">
      <motion.div
        key={`${season.id}-${openCategory}`}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: '16px' }}>
          {cat.icon} {cat.title}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {cat.items.map((item, idx) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="flex items-start gap-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px', color: 'rgba(238,238,238,0.65)', lineHeight: 1.6 }}
            >
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  border: `1px solid ${C.gold}`,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <Check size={10} strokeWidth={2.5} style={{ color: C.gold }} />
              </span>
              {item}
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 p-5" style={{ backgroundColor: 'rgba(223,147,7,0.06)', border: '1px solid rgba(223,147,7,0.15)' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, marginBottom: '8px' }}>
            Guide's Tip
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(238,238,238,0.5)', lineHeight: 1.7 }}>
            {proTip(openCategory, season.id)}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
