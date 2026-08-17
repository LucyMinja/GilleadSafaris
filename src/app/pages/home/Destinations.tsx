'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import SegmentIndicator from './SegmentIndicator';
import { destinations } from './data';

export default function Destinations() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = destinations.length;

  const goTo = (i: number) => {
    const next = ((i % total) + total) % total;
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % total);
    }, 4500);
    return () => clearInterval(t);
  }, [paused, total]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-6%' : '6%', opacity: 0 }),
  };

  const d = destinations[active];

  return (
    <section style={{ backgroundColor: '#F1EAE0' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-8 text-center"
      >
        <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(30px, 3.6vw, 46px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15 }}>
          Discover Tanzania's wild places
        </h2>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pb-14 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 lg:items-center">
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '16px' }}>
                {d.tag}
              </p>
              <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.3vw, 48px)', fontWeight: 300, color: '#6D6753', lineHeight: 1.05, marginBottom: '20px' }}>
                {d.name}
              </h3>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 400, color: '#6D6753', lineHeight: 1.8, maxWidth: '360px', marginBottom: '32px' }}>
                {d.desc}
              </p>
              <SafariButton href={d.href}>
                Explore {d.name} <ArrowUpRight size={11} strokeWidth={1.5} />
              </SafariButton>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={() => { setPaused(true); goTo(active - 1); }}
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-[rgba(109,103,83,0.08)]"
              style={{ border: '1px solid rgba(109,103,83,0.3)', color: '#6D6753' }}
            >
              <ArrowRight size={14} strokeWidth={1.5} className="rotate-180" />
            </button>
            <button
              onClick={() => { setPaused(true); goTo(active + 1); }}
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-[rgba(109,103,83,0.08)]"
              style={{ border: '1px solid rgba(109,103,83,0.3)', color: '#6D6753' }}
            >
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
            <SegmentIndicator total={total} active={active} paused={paused} onGoTo={goTo} color="#8D694B" trackColor="rgba(109,103,83,0.16)" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden" style={{ height: 'clamp(360px, 42vw, 560px)', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.16)' }}>
            <AnimatePresence custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={d.img} alt={d.name} fill className="object-cover" unoptimized priority />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  );
}
