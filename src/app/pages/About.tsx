'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import AboutHero from './about/AboutHero';
import StorySection from './about/StorySection';
import StatsStrip from './about/StatsStrip';
import ValuesSection from './about/ValuesSection';
import TeamSection from './about/TeamSection';
import AboutCTA from './about/AboutCTA';

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Lato', sans-serif" }}>
      <AboutHero heroRef={heroRef} bgY={bgY} textY={textY} heroOpacity={heroOpacity} />
      <StorySection />
      <StatsStrip />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />
    </div>
  );
}
