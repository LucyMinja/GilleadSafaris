'use client';

import PageHero from '@/app/components/PageHero';
import SafariButton from '@/app/components/SafariButton';
import RevealOnView from '@/app/pages/home/RevealOnView';
import WordReveal from '@/app/components/WordReveal';
import FAQSection from '@/app/components/essentials/FAQSection';
import PackingGuide from '@/app/components/PackingGuide';
import { sections } from '@/app/pages/essentials/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Essentials() {
  return (
    <div>
      <PageHero
        title="Travel Essentials"
        subtitle="What to know before you go — seasons, entry requirements, health, and what to pack."
        image="/images/IMG_0227.webp"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-20 lg:pt-28 pb-16 flex flex-col gap-24 lg:gap-32">
        {sections.map((section) => (
          <FAQSection key={section.id} section={section} />
        ))}
      </div>

      <PackingGuide />

      <div style={{ backgroundColor: '#F1EAE0' }} className="pt-2 lg:pt-4 pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
        <div className="max-w-5xl mx-auto">
          <RevealOnView
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.7}
            ease={EASE}
            once={false}
            margin="-80px"
          >
            <WordReveal
              text="Still have questions? Every itinerary starts with a real conversation, not a template — and every question above is one we'd rather you ask now than discover on the ground. If something isn't covered here, our guides in Arusha are the ones who'll actually be with you, and they're glad to answer directly."
              once={false}
              className="justify-center"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 400, lineHeight: 1.8, color: '#6D6753', marginBottom: '32px' }}
            />
          </RevealOnView>
          <div className="flex justify-center">
            <SafariButton href="/contact">Ask Us Anything</SafariButton>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
