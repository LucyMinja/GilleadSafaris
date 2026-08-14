'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

export function LegalHero({ eyebrow, title, updated }: { eyebrow: string; title: string; updated: string }) {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#8a694f' }}>
      <div className="absolute inset-0" style={{ background: 'lineargradient(135deg, rgba(0,0,0,0.15) 0%, transparent 60%)' }} />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-20 pt-44 pb-20 lg:pt-52 lg:pb-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: '28px', height: '1px', backgroundColor: '#d3ba8b' }} />
            <span style={{ fontFamily: "'Lato', sansserif", fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#d3ba8b' }}>
              {eyebrow}
            </span>
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', Georgia, sansserif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 400, color: '#ffffff', lineHeight: 1.1 }}>
            {title}
          </h1>
          <p style={{ fontFamily: "'Lato', sansserif", fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '20px' }}>
            Last updated: {updated}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 lg:mb-14"
    >
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, sansserif", fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 400, color: '#000000', marginBottom: '16px' }}>
        {title}
      </h2>
      <div
        className="legal-content"
        style={{ fontFamily: "'Lato', sansserif", fontSize: '15px', lineHeight: 1.95, color: '#555555', fontWeight: 300 }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function LegalPageWrapper({ children }: { children: ReactNode }) {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-20 lg:py-28 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </section>
  );
}
