'use client';

import PageHero from '@/app/components/PageHero';
import StorySection from './about/StorySection';
import StatsStrip from './about/StatsStrip';
import ValuesSection from './about/ValuesSection';
import TeamSection from './about/TeamSection';
import AboutCTA from './about/AboutCTA';

export default function About() {
  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        eyebrow="Our Story"
        title="About Gillead Safaris"
        subtitle="A Tanzanian-owned safari company built on honest service, deep local knowledge, and a genuine love for the wild places we call home."
      />
      <StorySection />
      <StatsStrip />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />
    </div>
  );
}
