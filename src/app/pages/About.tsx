'use client';

import PageHero from '@/app/components/PageHero';
import StorySection from './about/StorySection';
import ValuesSection from './about/ValuesSection';
import TeamSection from './about/TeamSection';
import AboutCTA from './about/AboutCTA';

export default function About() {
  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="About Gillead Safaris"
        subtitle="A Tanzanian-owned safari company built on honest service, deep local knowledge, and a genuine love for the wild places we call home."
        image="/images/IMG_1081.webp"
      />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />
    </div>
  );
}
