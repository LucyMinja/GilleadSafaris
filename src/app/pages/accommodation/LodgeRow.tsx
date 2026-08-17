import Link from 'next/link';
import { motion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';
import type { Lodge } from './types';

export default function LodgeRow({ lodge, index, onView }: { lodge: Lodge; index: number; onView: (l: Lodge) => void }) {
  const isReverse = index % 2 === 1;
  const textBg = index % 2 === 0 ? '#faf7f4' : '#ffffff';

  return (
    <motion.article
      className={`group relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
      style={{ backgroundColor: textBg }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative w-full lg:w-[50%] min-h-[300px] lg:min-h-[560px] flex-shrink-0 overflow-hidden"
        style={{
          clipPath: isReverse
            ? 'polygon(160px 0, 100% 0, 100% 100%, 0 100%)'
            : 'polygon(0 0, 100% 0, calc(100% - 160px) 100%, 0 100%)',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${lodge.img})`, backgroundColor: '#8a694f' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.28) 100%)' }} />
      </div>

      <div className="flex-1 flex flex-col justify-center py-14 px-6 lg:py-20 lg:px-[6vw]">
        <div style={{ maxWidth: '460px', width: '100%' }}>
          <div className="flex items-center gap-3 mb-5">
            <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a694f', fontWeight: 700 }}>{lodge.type}</span>
            <span style={{ color: '#d3ba8b', fontSize: '10px' }}>·</span>
            <span className="flex items-center gap-1" style={{ fontSize: '11px', color: 'rgba(44,24,16,0.45)' }}>
              <MapPin size={10} style={{ color: '#d3ba8b' }} />{lodge.location}
            </span>
          </div>

          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.01em' }}>
            {lodge.name}
          </h2>

          <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#8a694f', marginBottom: '16px', lineHeight: 1.65 }}>
            {lodge.highlight}
          </p>

          <p style={{ fontSize: '14px', lineHeight: 1.95, color: '#5a5047', fontWeight: 300, marginBottom: '32px' }}>
            {lodge.desc}
          </p>

          <div className="flex gap-3">
            <button onClick={() => onView(lodge)} className="btn-secondary">
              View Property
            </button>
            <Link href="/booking" className="btn-primary">
              Plan a Safari <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
