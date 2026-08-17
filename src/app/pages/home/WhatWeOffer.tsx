'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { offerings } from './data';

// Bento layout — one featured tile + four smaller ones arranged around it.
// A static grid on purpose: the homepage already runs two other autoplaying
// carousels (Destinations, SafarisGrid) — a third one here just adds competing
// motion. This section reads calmer, and looks distinct from the carousels below it.
export default function WhatWeOffer() {
  return (
    <section className="pt-14 pb-20 lg:pt-20 lg:pb-28" style={{ backgroundColor: '#F1EAE0' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-8 text-center"
      >
        <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15 }}>
          Every kind of Tanzania experience
        </h2>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '20px' }}>
        {offerings.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
          >
            <Link
              href={item.href}
              className="group block h-full"
              style={{ textDecoration: 'none' }}
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div
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
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.img}')`, backgroundColor: '#8D694B' }} />
                  <div className="absolute bottom-2 left-5 right-5 flex items-end justify-between gap-3">
                    <p style={{ fontFamily: "'Newsreader', serif", fontSize: i === 0 ? 'clamp(20px, 2.2vw, 28px)' : 'clamp(14px, 1.4vw, 17px)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25, textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)' }}>
                      {item.title}
                    </p>
                    <div className="flex items-center gap-1.5" style={{ flexShrink: 0, paddingBottom: '3px' }}>
                      <span className="text-white transition-colors duration-300 group-hover:text-[#C9A97E]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textShadow: '0 2px 10px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)' }}>
                        Explore
                      </span>
                      <ArrowRight size={12} strokeWidth={2} className="text-white transition-all duration-300 group-hover:text-[#C9A97E] group-hover:translate-x-1" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.85)) drop-shadow(0 1px 2px rgba(0,0,0,0.9))' }} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
