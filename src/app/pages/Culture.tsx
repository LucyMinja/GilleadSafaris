'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import CultureHero from './culture/CultureHero';
import CultureSections from './culture/CultureSections';
import CuisineSection from './culture/CuisineSection';
import CultureCTA from './culture/CultureCTA';

export default function Culture() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Lato', sans-serif" }}>
      <CultureHero heroRef={heroRef} bgY={bgY} textY={textY} heroOpacity={heroOpacity} />
      <CultureSections />
      <CuisineSection />
      <CultureCTA />
    </div>
  );
}
