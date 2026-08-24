'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import TiltCard from './TiltCard';
import PinHeader from './PinHeader';
import CoverImage from '@/app/components/CoverImage';
import { offerings } from './data';

function OfferCard({ item, i }: { item: (typeof offerings)[number]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
    >
      <Link
        href={item.href}
        className="group block h-full"
        style={{ textDecoration: 'none' }}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <TiltCard
            className="relative overflow-hidden"
            style={{
              borderRadius: '18px',
              minHeight: i === 0 ? 'clamp(440px, 42vw, 580px)' : 'clamp(230px, 22vw, 300px)',
              flex: 1,
              boxShadow: '0 10px 28px rgba(0,0,0,0.14)',
              transition: 'box-shadow 0.4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 22px 50px rgba(0,0,0,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.14)')}
          >
            <CoverImage src={item.img} alt={item.title} className="transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-2 left-5 right-5 flex items-end justify-between gap-3">
              <p style={{ fontFamily: "'Newsreader', serif", fontSize: i === 0 ? 'clamp(17px, 2.2vw, 28px)' : 'clamp(17px, 1.4vw, 17px)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25, textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)' }}>
                {item.title}
              </p>
              <div className="flex items-center gap-1.5" style={{ flexShrink: 0, paddingBottom: '3px' }}>
                <span className="text-white transition-colors duration-300 group-hover:text-[#C9A97E]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textShadow: '0 2px 10px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)' }}>
                  Explore
                </span>
                <ArrowRight size={12} strokeWidth={2} className="text-white transition-all duration-300 group-hover:text-[#C9A97E] group-hover:translate-x-1" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.85)) drop-shadow(0 1px 2px rgba(0,0,0,0.9))' }} />
              </div>
            </div>
          </TiltCard>
        </div>
      </Link>
    </motion.div>
  );
}

// Bento layout — one featured tile + four smaller ones arranged around it.
// A static grid on purpose: the homepage already runs two other autoplaying
// carousels (Destinations, SafarisGrid) — a third one here just adds competing
// motion. This section reads calmer, and looks distinct from the carousels below it.
// The header still gets the same pin-and-build mechanic as every other
// section (PinHeader) — the cards below keep their own staggered whileInView
// reveal, since scroll-scrubbing a whole grid of small repeated items
// doesn't read as a "build," it just looks unstable.
export default function WhatWeOffer() {
  return (
    <section className="pb-20 lg:pb-28" style={{ backgroundColor: '#F1EAE0' }}>
      <PinHeader>
        <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px' }}>
          Every kind of Tanzania experience
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          Big cat encounters at dawn, a Maasai village at midday, Stone Town's spice alleys by evening — Tanzania rewards travelers who mix wildlife, culture, and coast into one trip.
        </p>
      </PinHeader>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '20px' }}>
        {offerings.map((item, i) => (
          <OfferCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
