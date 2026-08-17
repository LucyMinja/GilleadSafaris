import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import type { Tour } from './data';
import ItineraryIncludes from './ItineraryIncludes';

export default function TourModal({ tour, onClose }: { tour: Tour; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className="max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#ffffff', borderRadius: '20px' }}
        onClick={(e) => e.stopPropagation()}>

        <div className="h-72 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${tour.img})`, backgroundColor: '#d3ba8b', borderRadius: '20px 20px 0 0' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
          <button className="absolute top-5 right-5 transition-colors" onClick={onClose} style={{ color: 'rgba(255,255,255,0.7)' }}>
            <X size={20} strokeWidth={1.5} />
          </button>
          <div className="absolute bottom-5 left-8">
            <span style={{ backgroundColor: '#8a694f', color: '#ffffff', padding: '3px 12px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '100px' }}>
              {tour.highlight}
            </span>
          </div>
        </div>

        <div className="p-8 lg:p-10">
          <div className="flex items-start justify-between mb-5 gap-6">
            <div>
              <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '28px', fontWeight: 400, color: '#000000', marginBottom: '6px' }}>{tour.name}</h2>
              <p style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d3ba8b' }}>{tour.duration} · {tour.type}</p>
            </div>
            <div className="text-right shrink-0">
              <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '20px', color: '#8a694f' }}>{tour.price}</p>
              <p style={{ fontSize: '11px', color: '#888888' }}>{tour.priceNote}</p>
            </div>
          </div>

          <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#333333', marginBottom: '28px' }}>{tour.desc}</p>

          <ItineraryIncludes tour={tour} />

          <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid #f0e8dc' }}>
            <Link href="/booking" className="btn-primary">
              Get a quote <ArrowUpRight size={12} strokeWidth={1.5} />
            </Link>
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
