import { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, X } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import type { Lodge } from './types';

export default function LodgeModal({ lodge, onClose }: { lodge: Lodge; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: 'rgba(10,5,2,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative w-full overflow-y-auto"
        style={{ maxWidth: '860px', maxHeight: '90vh', backgroundColor: '#faf7f4', borderRadius: '24px', boxShadow: '0 60px 120px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-5 right-5 z-20 flex items-center justify-center"
          style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.75)')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)')}
        >
          <X size={15} strokeWidth={2.5} />
        </button>

        <div className="grid grid-cols-3" style={{ height: '300px', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
          <div className="col-span-2 bg-cover bg-center" style={{ backgroundImage: `url(${lodge.img2})` }} />
          <div className="bg-cover bg-center" style={{ backgroundImage: `url(${lodge.img})`, borderLeft: '3px solid #faf7f4' }} />
        </div>

        <div style={{ padding: '36px 40px 36px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a694f', fontWeight: 700, marginBottom: '8px' }}>{lodge.type}</p>
          <div className="flex items-start justify-between gap-6 mb-3">
            <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.1 }}>
              {lodge.name}
            </h2>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '22px', color: '#d3ba8b', lineHeight: 1 }}>{lodge.price}</p>
              <p style={{ fontSize: '10px', color: 'rgba(44,24,16,0.38)', marginTop: '4px' }}>per person sharing</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6" style={{ fontSize: '12px', color: 'rgba(44,24,16,0.45)' }}>
            <span className="flex items-center gap-1.5"><MapPin size={11} style={{ color: '#d3ba8b' }} />{lodge.location}</span>
            <span className="flex items-center gap-1"><Star size={11} style={{ color: '#d3ba8b', fill: '#d3ba8b' }} /> {lodge.rating} / 5.0</span>
            <span style={{ color: '#8a694f' }}>{lodge.season}</span>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, #d3ba8b, transparent)', marginBottom: '24px' }} />

          <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#8a694f', marginBottom: '20px', lineHeight: 1.65 }}>
            "{lodge.highlight}"
          </p>

          <p style={{ fontSize: '14px', lineHeight: 1.95, color: '#5a5047', fontWeight: 300, marginBottom: '28px' }}>{lodge.desc}</p>

          <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a694f', fontWeight: 700, marginBottom: '10px' }}>Facilities</p>
          <p style={{ fontSize: '13px', color: '#5a5047', lineHeight: 1.8, marginBottom: '28px' }}>
            {lodge.amenities.join(' · ')}
          </p>

          <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a694f', fontWeight: 700, marginBottom: '10px' }}>Best For</p>
          <p style={{ fontSize: '13px', color: '#5a5047', lineHeight: 1.8, marginBottom: '32px' }}>
            {lodge.bestFor.join(', ')}
          </p>

          <div style={{ fontSize: '12px', color: 'rgba(44,24,16,0.55)', lineHeight: 1.75, marginBottom: '28px', paddingLeft: '16px', borderLeft: '2px solid #d3ba8b' }}>
            Accommodation is selected and confirmed by our team as part of your itinerary — at no extra cost to you.
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <SafariButton href="/booking" style={{ flex: 1, justifyContent: 'center' }}>
              Plan a Safari
            </SafariButton>
            <SafariButton onClick={onClose} variant="secondary" style={{ flexShrink: 0 }}>Back to Properties</SafariButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
