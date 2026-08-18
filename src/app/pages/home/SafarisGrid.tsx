'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import MaskReveal from './MaskReveal';
import { safaris } from './data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Calm static grid, deliberately distinct from the Destinations carousel above —
// two auto-rotating carousels back to back read as redundant, so this one just sits still
// until scrolled into view, where each card reveals once rather than looping.
export default function SafarisGrid() {
  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="pt-14 pb-20 lg:pt-20 lg:pb-28">
            <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-8 text-center"
      >
        <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(30px, 3.6vw, 46px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px' }}>
          Choose your Adventure
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          From a three-day taste of the Serengeti to an eight-day loop through four parks, each package below is a starting point we tailor around your dates and group size.
        </p>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {safaris.map((s, i) => {
          const delay = (i % 3) * 0.1;
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay, ease: EASE }}
            >
              <Link href={s.href} className="group block" style={{ textDecoration: 'none' }}>
                <div className="relative overflow-hidden" style={{ borderRadius: '4px', aspectRatio: '4/3' }}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${s.img}')`, backgroundColor: '#8D694B' }} />
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: '#F1EAE0' }}
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: delay + 0.1, ease: EASE }}
                  />
                </div>
                <MaskReveal viewport delay={delay + 0.15} duration={0.5} ease={EASE} style={{ marginTop: '18px', marginBottom: '6px' }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B' }}>
                    {s.days}
                  </p>
                </MaskReveal>
                <MaskReveal viewport delay={delay + 0.22} duration={0.5} ease={EASE} style={{ marginBottom: '8px' }}>
                  <h3 className="transition-opacity group-hover:opacity-70"
                    style={{ fontFamily: "'Newsreader',serif", fontSize: '20px', fontWeight: 600, color: '#6D6753', lineHeight: 1.3 }}>
                    {s.name}
                  </h3>
                </MaskReveal>
                <MaskReveal viewport delay={delay + 0.29} duration={0.5} ease={EASE}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '14px', fontWeight: 400, color: '#6D6753', lineHeight: 1.65, opacity: 0.75 }}>
                    {s.desc}
                  </p>
                </MaskReveal>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex justify-center mt-12">
        <SafariButton href="/booking">
          Book a Safari <ArrowUpRight size={11} strokeWidth={1.5} />
        </SafariButton>
      </div>
    </section>
  );
}
