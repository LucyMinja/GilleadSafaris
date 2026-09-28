'use client';

import Image from 'next/image';
import SafariButton from '@/app/components/SafariButton';
import WordReveal from '@/app/components/WordReveal';
import CoverImage from '@/app/components/CoverImage';
import RevealOnView from './RevealOnView';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28" style={{ backgroundColor: '#F1EAE0' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 lg:items-center">
          {/* Image column — order-2 on mobile */}
          <RevealOnView
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            duration={0.8}
            ease={EASE}
            once={false}
            margin="-100px"
            className="order-2 lg:order-1 lg:col-span-7">
            <div className="relative mx-auto lg:mx-0" style={{ width: '88%' }}>
              <div className="group relative overflow-hidden" style={{ height: 'clamp(400px, 38vw, 520px)', borderRadius: '4px' }}>
                <CoverImage
                  src="/images/956A2613.webp"
                  priority
                  className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]"
                />
                <div className="absolute inset-0 opacity-40 group-hover:opacity-90 transition-opacity duration-700" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
                <div className="absolute bottom-8 left-8 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100">
                  <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(14px, 1.6vw, 18px)', fontStyle: 'italic', color: '#ffffff', lineHeight: 1.6, maxWidth: '280px' }}>
                    "Every sunrise here tells a different story - we just help you find yours."
                  </p>
                </div>
              </div>

              <div
                className="absolute hidden md:block"
                style={{ width: '38%', bottom: '-56px', right: '-24px', transform: 'rotate(4deg)' }}
              >
                <div className="group relative overflow-hidden" style={{ aspectRatio: '4/3', borderRadius: '6px', border: '6px solid #F1EAE0', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
                  <Image src="/images/team/nic.webp" alt="Nicanory, our reservation manager in Arusha" fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-0 right-0 px-2 text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100">
                    <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '12px', color: '#ffffff', lineHeight: 1.4 }}>
                      Nicanory, our team in Arusha
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnView>

          {/* Text column — order-1 on mobile */}
          <RevealOnView
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            duration={0.8}
            delay={0.1}
            ease={EASE}
            once={false}
            margin="-100px"
            className="order-1 lg:order-2 lg:col-span-5">
            <div style={{ marginTop: 'clamp(20px, 3vw, 36px)' }}>
              <h2
                className="text-center lg:text-left"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: 'clamp(30px, 3.6vw, 46px)',
                  fontWeight: 600,
                  color: '#6D6753',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  marginBottom: '24px',
                }}
              >
                We grew up here.
              </h2>

              <WordReveal
                text="Gillead Safaris began with a simple belief: that the people who grew up watching the sun rise over the Serengeti are the ones best placed to share it with you."
                baseDelay={0}
                className="justify-center lg:justify-start"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '18px', fontWeight: 400 }}
              />
              <WordReveal
                text="We're a team of professional driver-guides, trip planners, and safari specialists based in Arusha — trained for these parks, not just born near them — turning bucket-list dreams into real itineraries since 2020."
                baseDelay={0.5}
                className="justify-center lg:justify-start"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '18px', fontWeight: 400 }}
              />
              <WordReveal
                text="Every itinerary starts with a conversation, not a template — where you want to go, how long you have, what you're hoping to see. We build the rest around that."
                baseDelay={1.0}
                className="justify-center lg:justify-start"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '32px', fontWeight: 400 }}
              />

              <div className="flex justify-center lg:justify-start">
                <SafariButton href="/about">
                  Our Story
                </SafariButton>
              </div>
            </div>
          </RevealOnView>
      </div>
    </section>
  );
}
