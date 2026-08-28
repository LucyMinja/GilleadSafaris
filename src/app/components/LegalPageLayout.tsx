'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

// Legal pages are reference documents, not marketing moments — the old
// version reused a full-bleed colored-block hero here, which read as an odd
// one-off next to every other page's video hero and pushed the actual text
// people came for below the fold for no reason. This is a slim, uniform
// document header instead: same cream background as the page body, a small
// wayfinding link back to the site, the title, and the revision date — done
// in one breath instead of a separate "hero moment." Since the background is
// light (no video/photo behind it), the nav needs to render solid from the
// first frame rather than the usual transparent-over-hero start.
export function LegalHero({ title, updated }: { title: string; updated: string }) {
  useEffect(() => {
    window.dispatchEvent(new Event('gillead:force-nav-solid'));
  }, []);

  return (
    <section style={{ backgroundColor: '#F1EAE0', borderBottom: '1px solid rgba(109,103,83,0.15)' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-20 pt-32 pb-10 lg:pt-40 lg:pb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', letterSpacing: '0.06em', color: '#8D694B', textDecoration: 'none', marginBottom: '20px' }}
          >
            <ArrowLeft size={13} strokeWidth={1.5} /> Back to site
          </Link>
          <h1 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(32px, 4.4vw, 48px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15 }}>
            {title}
          </h1>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.6, marginTop: '14px' }}>
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
      <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 600, color: '#6D6753', marginBottom: '16px' }}>
        {title}
      </h2>
      <div
        className="legal-content"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', lineHeight: 1.95, color: '#6D6753', opacity: 0.85, fontWeight: 400 }}
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
