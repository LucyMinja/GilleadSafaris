import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Tour } from './data';

export default function TourCard({ tour, index, onSelect }: { tour: Tour; index: number; onSelect: (t: Tour) => void }) {
  const isReverse = index % 2 === 1;
  const textBg = index % 2 === 0 ? '#faf7f4' : '#ffffff';

  return (
    <motion.div
      className={`group relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} cursor-pointer`}
      style={{ backgroundColor: textBg, minHeight: 'auto' }}
      onClick={() => onSelect(tour)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative w-full lg:w-[52%] min-h-[280px] lg:min-h-[520px] flex-shrink-0 overflow-hidden ${isReverse ? 'clip-diag-l' : 'clip-diag-r'}`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${tour.img})`, backgroundColor: '#d3ba8b' }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:py-20 lg:px-[6vw]">
        <div style={{ maxWidth: '460px', width: '100%' }}>
          <div className="flex items-center gap-2 mb-4" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d3ba8b' }}>
            <MapPin size={10} /> {tour.parks[0]}{tour.parks.length > 1 ? ` + ${tour.parks.length - 1} more` : ''}
          </div>
          <h3 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.01em' }}>
            {tour.name}
          </h3>
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#5a5047', marginBottom: '20px', fontWeight: 300 }}>
            {tour.desc}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tour.parks.map((p) => (
              <span key={p} style={{ fontSize: '10px', letterSpacing: '0.04em', color: '#8a694f', backgroundColor: 'rgba(211,186,139,0.12)', padding: '3px 10px', borderRadius: '100px' }}>
                {p}
              </span>
            ))}
          </div>
          <div className="mb-8">
            <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a7060', marginBottom: '4px' }}>From</p>
            <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '32px', color: '#8a694f', lineHeight: 1 }}>{tour.price}</p>
            <p style={{ fontSize: '11px', color: '#8a7060', marginTop: '4px' }}>{tour.priceNote}</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary">
              View Details <ArrowUpRight size={11} strokeWidth={1.5} />
            </button>
            <Link href="/booking" className="btn-secondary" onClick={(e) => e.stopPropagation()}>
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
