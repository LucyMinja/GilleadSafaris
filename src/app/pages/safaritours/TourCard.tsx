'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import WordLink from '@/app/components/WordLink';
import MaskReveal from '@/app/pages/home/MaskReveal';
import RevealOnView from '@/app/pages/home/RevealOnView';
import WordReveal from '@/app/components/WordReveal';
import CoverImage from '@/app/components/CoverImage';
import type { Tour } from './data';

// Same gentler, evenly-paced curve as DestinationRow — the site's usual
// [0.22, 1, 0.36, 1] shoots to ~90% almost instantly then imperceptibly
// creeps the rest, which reads as "no animation" on a normal scroll.
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function TourCard({ tour, index }: { tour: Tour; index: number }) {
  const isReverse = index % 2 === 1;
  const [hovered, setHovered] = useState(false);
  const href = `/safaris/${tour.slug}`;

  return (
    <RevealOnView
      id={`tour-${tour.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      duration={1.1}
      ease={EASE}
      once={false}
      margin="0px"
      className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 lg:items-center"
    >
      <div className="contents" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* Image column — order-2 on mobile */}
        <div className={`relative lg:col-span-7 order-2 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative" style={{ width: '88%', margin: isReverse ? '0 0 0 auto' : '0' }}>
            <Link
              href={href}
              className="relative block w-full overflow-hidden"
              style={{ height: 'clamp(320px, 34vw, 460px)', borderRadius: '4px' }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <CoverImage src={tour.img} alt={tour.name} priority={index === 0} />
              </motion.div>
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }}
                animate={{ opacity: hovered ? 0.85 : 0.4 }}
                transition={{ duration: 0.5 }}
              />
            </Link>
          </div>
        </div>

        {/* Text column — order-1 on mobile */}
        <div className={`lg:col-span-5 order-1 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`} style={{ marginTop: 'clamp(24px, 3vw, 0px)' }}>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B' }}>
              <MapPin size={11} strokeWidth={1.5} />
              {tour.parks.length} {tour.parks.length > 1 ? 'Destinations' : 'Destination'}
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.08em', color: '#6D6753', whiteSpace: 'nowrap' }}>
              {tour.duration}
            </span>
          </div>

          <MaskReveal viewport once={false} duration={0.7} delay={0.1} style={{ marginBottom: '18px' }}>
            <Link href={href} className="block" style={{ textDecoration: 'none' }}>
              <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 2.3vw, 40px)', fontWeight: 300, color: '#6D6753', lineHeight: 1.05 }}>
                {tour.name}
              </h2>
            </Link>
          </MaskReveal>

          <Link href={href} className="block w-full" style={{ textDecoration: 'none' }}>
            <WordReveal
              text={tour.desc}
              once={false}
              baseDelay={0.3}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, fontWeight: 400, marginBottom: '20px', color: hovered ? '#8D694B' : '#6D6753', transition: 'color 0.5s ease' }}
            />
          </Link>

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
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '4px' }}>Price</p>
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '32px', fontWeight: 600, color: '#6D6753', lineHeight: 1 }}>{tour.price}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', color: '#6D6753', opacity: 0.7, marginTop: '4px' }}>{tour.priceNote}</p>
            </div>
          </MaskReveal>

          <MaskReveal viewport once={false} duration={0.6} delay={0.85}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <SafariButton href={`/booking?tour=${tour.slug}`} onClick={(e) => e.stopPropagation()}>
                Book Now
              </SafariButton>
              <WordLink href={href}>View Full Itinerary</WordLink>
            </div>
          </MaskReveal>
        </div>
      </div>
    </RevealOnView>
  );
}
