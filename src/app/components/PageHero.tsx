'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import CoverImage from './CoverImage';

// Single shared full-screen page hero — every interior page (Contact,
// Booking, About, Culture, Accommodation, SafariTours, Gallery,
// Destinations, destination detail) was rendering its own near-identical
// copy of this: same scroll-parallax setup, same layout, but each one
// hand-typed its own font-family, and 8 of the 9 used 'DM Serif Display' —
// a font this project has never actually loaded (only Newsreader + Plus
// Jakarta Sans are linked in layout.tsx), so those pages were silently
// rendering a generic fallback serif this whole time instead of matching
// the homepage. The background video, gradient layering, layout, and
// fonts here are the homepage Hero's, reused exactly — only the
// title/subtitle text is page-specific. One component now owns all of it,
// so every page hero moves and reads identically.
// Each page passes its own photo, matching the homepage's photo-led hero,
// so every hero is one compressed image relevant to that page.
export default function PageHero({
  title,
  subtitle,
  image = '/images/956A3309.webp',
  imagePosition,
}: {
  title: ReactNode;
  subtitle?: string;
  image?: string;
  imagePosition?: string;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-end justify-center overflow-hidden pb-[24vh]">
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <CoverImage src={image} alt="" priority sizes="100vw" position={imagePosition} />
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(241,234,224,0.35) 80%, #F1EAE0 100%)' }} />

      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
          <h1
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '20px',
              letterSpacing: '0',
              fontSize: 'clamp(38px, 4.8vw, 64px)',
              textShadow: '0 2px 16px rgba(0,0,0,0.4)',
              textWrap: 'balance',
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '17px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.82)',
                maxWidth: '540px',
                margin: '0 auto',
                fontWeight: 400,
              }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
