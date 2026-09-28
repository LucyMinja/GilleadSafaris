'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Images, ArrowRight } from 'lucide-react';
import RevealOnView from '@/app/pages/home/RevealOnView';
import WordLink from '@/app/components/WordLink';
import CoverImage from '@/app/components/CoverImage';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type Vignette = {
  eyebrow: string;
  headline: string;
  blurb: string;
  cta?: { label: string; href: string };
  quote?: boolean;
};

export default function StoryGallery({
  bigImages,
  bigVignette,
  secondary,
}: {
  bigImages: string[];
  bigVignette: Vignette;
  secondary?: { img: string; vignette: Vignette }[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (bigImages.length < 2) return;
    const t = setInterval(() => setActive((p) => (p + 1) % bigImages.length), 4200);
    return () => clearInterval(t);
  }, [bigImages.length]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-6 lg:pt-8 pb-6 lg:pb-8">
      <div className="text-center mb-10 lg:mb-14">
        <Link href="/gallery" className="inline-flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <Images size={13} strokeWidth={1.5} color="#8D694B" />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#8D694B' }}>View Full Gallery</span>
          <ArrowRight size={13} strokeWidth={1.5} color="#8D694B" />
        </Link>
      </div>

      {/* First pairing — order adjusted for mobile: Text then Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-center mb-24 lg:mb-32">
        {/* Text column — order-1 on mobile */}
        <RevealOnView
          className="lg:col-span-5 order-1 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          ease={EASE}
          once={false}
          margin="-100px"
        >
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '16px' }}>{bigVignette.eyebrow}</p>
          <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 2.3vw, 40px)', fontWeight: 300, color: '#6D6753', lineHeight: 1.05, marginBottom: '18px' }}>
            {bigVignette.headline}
          </h3>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', lineHeight: 1.8, color: '#6D6753', opacity: 0.9, marginBottom: bigVignette.cta ? '22px' : 0 }}>
            {bigVignette.blurb}
          </p>
          {bigVignette.cta && <WordLink href={bigVignette.cta.href}>{bigVignette.cta.label}</WordLink>}
        </RevealOnView>

        {/* Image column — order-2 on mobile */}
        <RevealOnView
          className="lg:col-span-7 order-2 lg:order-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          delay={0.1}
          ease={EASE}
          once={false}
          margin="-100px"
        >
          <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 34vw, 460px)', borderRadius: '2px' }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: EASE }}
              >
                <CoverImage src={bigImages[active]} priority />
              </motion.div>
            </AnimatePresence>
          </div>
        </RevealOnView>
      </div>

      {/* Second pairing — collage feel: reordered for mobile to show text then image */}
      {secondary && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16">
          <RevealOnView
            className="lg:col-span-5 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.8}
            ease={EASE}
            once={false}
            margin="-80px"
          >
            <div className="order-1">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '10px' }}>{secondary[0].vignette.eyebrow}</p>
              <h4 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 2.3vw, 40px)', fontWeight: 300, color: '#6D6753', lineHeight: 1.05, marginBottom: '10px' }}>{secondary[0].vignette.headline}</h4>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', lineHeight: 1.7, color: '#6D6753', opacity: 0.85, marginBottom: secondary[0].vignette.cta ? '16px' : '24px' }}>{secondary[0].vignette.blurb}</p>
              {secondary[0].vignette.cta && <div className="mb-6"><WordLink href={secondary[0].vignette.cta.href}>{secondary[0].vignette.cta.label}</WordLink></div>}
            </div>
            <div className="relative overflow-hidden order-2" style={{ height: 'clamp(260px, 26vw, 360px)', borderRadius: '2px' }}>
              <CoverImage src={secondary[0].img} alt={secondary[0].vignette.headline} />
            </div>
          </RevealOnView>

          <RevealOnView
            className="lg:col-span-5 lg:col-start-8 lg:mt-20 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.8}
            delay={0.12}
            ease={EASE}
            once={false}
            margin="-80px"
          >
            <div className="order-1">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '10px' }}>{secondary[1].vignette.eyebrow}</p>
              <h4 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 2.3vw, 40px)', fontWeight: 300, color: '#6D6753', lineHeight: 1.05, marginBottom: '10px' }}>{secondary[1].vignette.headline}</h4>
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontStyle: 'italic', fontSize: '16px', lineHeight: 1.7, color: '#6D6753', opacity: 0.75, marginBottom: '24px' }}>{secondary[1].vignette.blurb}</p>
            </div>
            <div className="relative overflow-hidden order-2" style={{ height: 'clamp(340px, 34vw, 460px)', borderRadius: '2px' }}>
              <CoverImage src={secondary[1].img} alt={secondary[1].vignette.headline} />
            </div>
          </RevealOnView>
        </div>
      )}
    </div>
  );
}
