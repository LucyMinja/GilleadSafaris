'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowDown } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import WordLink from '@/app/components/WordLink';
import MaskReveal from '@/app/pages/home/MaskReveal';
import RevealOnView from '@/app/pages/home/RevealOnView';
import WordReveal from '@/app/components/WordReveal';
import ItineraryIncludes from './ItineraryIncludes';
import type { Tour } from './data';

// Same gentler, evenly-paced curve as DestinationRow — the site's usual
// [0.22, 1, 0.36, 1] shoots to ~90% almost instantly then imperceptibly
// creeps the rest, which reads as "no animation" on a normal scroll.
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function TourCard({
  tour,
  index,
  expanded,
  onToggleExpand,
}: {
  tour: Tour;
  index: number;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  const isReverse = index % 2 === 1;
  const [hovered, setHovered] = useState(false);

  return (
    <RevealOnView
      id={`tour-${tour.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      duration={1.1}
      ease={EASE}
      once={false}
      margin="0px"
      className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 lg:items-center"
    >
      <div className="contents" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* Image column — alternates sides, same 7/5 split as About/Destinations */}
        <div className={`relative lg:col-span-7 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative" style={{ width: '88%', margin: isReverse ? '0 0 0 auto' : '0' }}>
            <button
              type="button"
              onClick={onToggleExpand}
              className="relative block w-full overflow-hidden"
              style={{ height: 'clamp(320px, 34vw, 460px)', borderRadius: '4px', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${tour.img})`, backgroundColor: '#8D694B' }}
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }}
                animate={{ opacity: hovered ? 0.85 : 0.4 }}
                transition={{ duration: 0.5 }}
              />
            </button>
          </div>
        </div>

        {/* Text column */}
        <div className={`lg:col-span-5 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`} style={{ marginTop: 'clamp(24px, 3vw, 0px)' }}>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B' }}>
              <MapPin size={11} strokeWidth={1.5} />
              {tour.parks[0]}{tour.parks.length > 1 ? ` + ${tour.parks.length - 1} more` : ''}
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.08em', color: '#6D6753', whiteSpace: 'nowrap' }}>
              {tour.duration}
            </span>
          </div>

          <MaskReveal viewport once={false} duration={0.7} delay={0.1} style={{ marginBottom: '18px' }}>
            <button type="button" onClick={onToggleExpand} className="block text-left" style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
              <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 38px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                {tour.name}
              </h2>
            </button>
          </MaskReveal>

          <button type="button" onClick={onToggleExpand} className="block text-left w-full" style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
            <WordReveal
              text={tour.desc}
              once={false}
              baseDelay={0.3}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, fontWeight: 400, marginBottom: '20px', color: hovered ? '#8D694B' : '#6D6753', transition: 'color 0.5s ease' }}
            />
          </button>

          <MaskReveal viewport once={false} duration={0.6} delay={0.6} style={{ marginBottom: '24px' }}>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {tour.parks.map((p) => (
                <div key={p} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.85 }}>
                  <div style={{ width: '4px', height: '4px', backgroundColor: '#8D694B', borderRadius: '50%', flexShrink: 0 }} />
                  {p}
                </div>
              ))}
            </div>
          </MaskReveal>

          <MaskReveal viewport once={false} duration={0.5} delay={0.75} style={{ marginBottom: '28px' }}>
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '4px' }}>From</p>
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '32px', fontWeight: 600, color: '#6D6753', lineHeight: 1 }}>{tour.price}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.7, marginTop: '4px' }}>{tour.priceNote}</p>
            </div>
          </MaskReveal>

          <MaskReveal viewport once={false} duration={0.6} delay={0.85}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <SafariButton href="/booking" onClick={(e) => e.stopPropagation()}>
                Book Now
              </SafariButton>
              <WordLink href="#" onClick={(e) => { e.preventDefault(); onToggleExpand(); }}>
                {expanded ? 'Show Less' : 'See the Full Safari Itinerary'}
              </WordLink>
            </div>
          </MaskReveal>
        </div>

        {/* Expanded itinerary — full width, plain in-flow expand (no sticky/
            scroll-locked mechanic; that's fragile across content lengths and
            breakpoints, an in-flow reveal is the robust version of the same idea). */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="lg:col-span-12 lg:order-3 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="pt-4 lg:pt-6" style={{ borderTop: '1px solid rgba(109,103,83,0.15)' }}>
                <div style={{ maxWidth: '780px' }}>
                  <ItineraryIncludes tour={tour} />
                </div>
                <button
                  type="button"
                  onClick={onToggleExpand}
                  className="inline-flex items-center gap-1.5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: '#8D694B', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Show Less <ArrowDown size={12} strokeWidth={2} style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RevealOnView>
  );
}
