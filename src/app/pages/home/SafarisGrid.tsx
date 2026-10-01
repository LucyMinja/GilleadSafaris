'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import SafariButton from '@/app/components/SafariButton';
import WordLink from '@/app/components/WordLink';
import { toursIn } from '@/app/pages/safaritours/data';
import MaskReveal from './MaskReveal';
import CountUpDays from './CountUpDays';
import PinHeader from './PinHeader';
import CoverImage from '@/app/components/CoverImage';
import { safaris } from './data';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function SafariCard({ s, delay }: { s: (typeof safaris)[number]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const overlayRef = useRef(null);
  const overlayInView = useInView(overlayRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      <Link href={s.href} className="group block" style={{ textDecoration: 'none' }}>
        <div ref={overlayRef} className="relative overflow-hidden" style={{ borderRadius: '4px', aspectRatio: '4/3' }}>
          <CoverImage src={s.img} alt={s.name} className="transition-transform duration-700 group-hover:scale-105" />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: '#F1EAE0' }}
            initial={{ opacity: 1 }}
            animate={overlayInView ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.45, delay: delay + 0.1, ease: EASE }}
          />
        </div>
        <MaskReveal viewport delay={delay + 0.15} duration={0.5} ease={EASE} style={{ marginTop: '18px', marginBottom: '6px' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B' }}>
            <CountUpDays text={s.days} />
          </p>
        </MaskReveal>
        <MaskReveal viewport delay={delay + 0.22} duration={0.5} ease={EASE} style={{ marginBottom: '8px' }}>
          <h3 className="transition-colors duration-500 text-[#6D6753] group-hover:text-[#8D694B]"
            style={{ fontFamily: "'Newsreader',serif", fontSize: '20px', fontWeight: 600, lineHeight: 1.3 }}>
            {s.name}
          </h3>
        </MaskReveal>
        <MaskReveal viewport delay={delay + 0.29} duration={0.5} ease={EASE}>
          <p className="transition-colors duration-500 text-[#6D6753] group-hover:text-[#8D694B]"
            style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '17px', fontWeight: 400, lineHeight: 1.65, opacity: 0.85 }}>
            {s.desc}
          </p>
        </MaskReveal>
      </Link>
    </motion.div>
  );
}

export default function SafarisGrid() {
  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="pb-10 lg:pb-14">
      <PinHeader>
        <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(30px, 3.6vw, 46px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px' }}>
          Choose your Adventure
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          From a three-day taste of the Serengeti to an eight-day loop through four parks, each package below is a starting point we tailor around your dates and group size.
        </p>
      </PinHeader>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {safaris.map((s, i) => (
          <SafariCard key={s.name} s={s} delay={(i % 3) * 0.1} />
        ))}
      </div>

      {/* Only six trips fit here — point to the full lists, one per section,
          with live counts so they never go stale as trips are added. */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-wrap justify-center gap-x-10 gap-y-4 mt-14">
        <WordLink href="/safaris">All {toursIn('safaris').length} safaris</WordLink>
        <WordLink href="/trekking">{toursIn('trekking').length} Kilimanjaro &amp; treks</WordLink>
        <WordLink href="/beach">{toursIn('beach').length} beach holidays</WordLink>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex justify-center mt-10">
        <SafariButton href="/booking">
          Book a Safari
        </SafariButton>
      </div>
    </section>
  );
}
