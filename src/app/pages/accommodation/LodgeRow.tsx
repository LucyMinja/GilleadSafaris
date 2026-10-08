'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Star } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import ExpandToggle from '@/app/components/ExpandToggle';
import RevealOnView from '@/app/pages/home/RevealOnView';
import CoverImage from '@/app/components/CoverImage';
import type { Lodge } from './types';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LodgeRow({ lodge, index }: { lodge: Lodge; index: number }) {
  const isReverse = index % 2 === 1;
  const [expanded, setExpanded] = useState(false);

  return (
    <RevealOnView
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      duration={0.85}
      ease={EASE}
      once={false}
      margin="-60px"
      className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 lg:items-center"
    >
      {/* Image column — order-2 on mobile so text always comes first */}
      <div className={`relative lg:col-span-7 order-2 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="relative" style={{ width: '88%', margin: isReverse ? '0 0 0 auto' : '0' }}>
          <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 34vw, 460px)', borderRadius: '4px' }}>
            <CoverImage src={lodge.img} alt={lodge.name} priority={index === 0} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)' }} />
          </div>
        </div>
      </div>

      {/* Text column — order-1 on mobile */}
      <div className={`lg:col-span-5 order-1 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`} style={{ marginTop: 'clamp(24px, 3vw, 0px)' }}>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', fontWeight: 700 }}>{lodge.type}</span>
          <span style={{ color: '#8D694B', fontSize: '10px', opacity: 0.5 }}>·</span>
          <span className="flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.75 }}>
            <MapPin size={11} strokeWidth={1.5} color="#8D694B" />{lodge.location}
          </span>
          <span className="flex items-center gap-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.75 }}>
            <Star size={11} strokeWidth={1.5} color="#8D694B" fill="#8D694B" /> {lodge.rating}
          </span>
        </div>

        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 2.3vw, 40px)', fontWeight: 300, color: '#6D6753', lineHeight: 1.05, marginBottom: '14px' }}>
          {lodge.name}
        </h2>

        <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontStyle: 'italic', fontSize: '16px', color: '#8D694B', marginBottom: '16px', lineHeight: 1.6 }}>
          {lodge.highlight}
        </p>

        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '24px' }}>
          {lodge.desc}
        </p>

        <div className="flex items-center gap-6 flex-wrap mb-2">
          <SafariButton href={`/booking?lodge=${encodeURIComponent(lodge.name)}`}>Ask About This Lodge</SafariButton>
          <ExpandToggle expanded={expanded} onClick={() => setExpanded((e) => !e)} openLabel="Read More" />
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="pt-6 flex flex-col gap-5">
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '8px' }}>Facilities</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753', opacity: 0.85, lineHeight: 1.75 }}>{lodge.amenities.join(' · ')}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '8px' }}>Best For</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753', opacity: 0.85, lineHeight: 1.75 }}>{lodge.bestFor.join(', ')}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '8px' }}>Season</p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753', opacity: 0.85, lineHeight: 1.75 }}>{lodge.season} · {lodge.price}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RevealOnView>
  );
}
