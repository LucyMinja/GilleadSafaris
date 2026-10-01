'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Pause } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import SegmentIndicator from './SegmentIndicator';
import SlideCounter from './SlideCounter';
import MaskReveal from './MaskReveal';
import SlideImage from './SlideImage';
import PinHeader from './PinHeader';
import RevealOnView from './RevealOnView';
import { destinations } from './data';

/* One easing curve for the whole slide so the image and the text cascade
   read as one connected motion rather than separate pieces animating on
   their own clocks. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TEXT_DURATION = 0.65;
const TEXT_STAGGER = 0.12;

export default function Destinations() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = destinations.length;

  const goTo = (i: number) => {
    setActive(((i % total) + total) % total);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive(p => (p + 1) % total);
    }, 4500);
    return () => clearInterval(t);
  }, [paused, total]);

  const d = destinations[active];

  return (
    <section style={{ backgroundColor: '#F1EAE0' }}>
      <PinHeader>
        <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(30px, 3.6vw, 46px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px' }}>
          Discover Tanzania's wild places
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          From the wildebeest herds of the Serengeti to the white sand of Zanzibar, six parks and one archipelago each demand their own kind of trip — here's where to start.
        </p>
      </PinHeader>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pb-14 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 lg:items-center">
        <RevealOnView
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          ease={EASE}
          once={false}
          margin="-100px"
        >
          <div
            className="relative min-h-[190px] lg:min-h-[300px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence>
              <div key={active} className="absolute inset-x-0 top-0">
                <MaskReveal delay={0} duration={TEXT_DURATION} ease={EASE} style={{ marginBottom: '16px' }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#8D694B' }}>
                    {d.tag}
                  </p>
                </MaskReveal>
                <MaskReveal delay={TEXT_STAGGER} duration={TEXT_DURATION} ease={EASE} style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 2.3vw, 40px)', fontWeight: 300, color: '#6D6753', lineHeight: 1.05 }}>
                    {d.name}
                  </h3>
                </MaskReveal>
                <MaskReveal delay={TEXT_STAGGER * 2} duration={TEXT_DURATION} ease={EASE} style={{ marginBottom: '32px' }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 400, color: '#6D6753', lineHeight: 1.8, maxWidth: '360px' }}>
                    {d.desc}
                  </p>
                </MaskReveal>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: TEXT_DURATION, delay: TEXT_STAGGER * 3, ease: EASE } }}
                  exit={{ opacity: 0, y: 8, transition: { duration: TEXT_DURATION * 0.5, delay: 0, ease: EASE } }}
                  className="hidden lg:block"
                >
                  <SafariButton href={d.href}>
                    Explore {d.name}
                  </SafariButton>
                </motion.div>
              </div>
            </AnimatePresence>
          </div>

          {/* Prev/next arrows + counter are desktop-only — on mobile the indicator
              and a single generic "Explore" button sit below the image instead
              (see below), so a per-slide-changing control row up here would be redundant. */}
          <div className="hidden lg:flex items-center gap-4 mt-12">
            <button
              onClick={() => { setPaused(true); goTo(active - 1); }}
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-[2px] transition-colors duration-200 hover:bg-[#8D694B] hover:text-white hover:border-[#8D694B]"
              style={{ border: '1px solid rgba(109,103,83,0.3)', color: '#6D6753' }}
            >
              <ArrowRight size={14} strokeWidth={1.5} className="rotate-180" />
            </button>
            <button
              onClick={() => { setPaused(true); goTo(active + 1); }}
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-[2px] transition-colors duration-200 hover:bg-[#8D694B] hover:text-white hover:border-[#8D694B]"
              style={{ border: '1px solid rgba(109,103,83,0.3)', color: '#6D6753' }}
            >
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
            <SegmentIndicator total={total} active={active} paused={paused} onGoTo={goTo} color="#8D694B" trackColor="rgba(109,103,83,0.16)" />
            <SlideCounter active={active} total={total} color="#6D6753" />
          </div>
        </RevealOnView>

        <RevealOnView
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          delay={0.1}
          ease={EASE}
          once={false}
          margin="-100px"
        >
          <div
            className="relative overflow-hidden"
            style={{ height: 'clamp(360px, 42vw, 560px)', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.16)' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <SlideImage key={active} src={d.img} alt={d.name} paused={paused} zoomIn={active % 2 === 1} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 30%)' }} />
            <AnimatePresence>
              {paused && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-5 right-5 flex items-center gap-2 pointer-events-none"
                  style={{ backgroundColor: 'rgba(20,14,8,0.55)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '100px' }}
                >
                  <Pause size={10} strokeWidth={2} fill="currentColor" style={{ color: '#fff' }} />
                  <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff' }}>Paused</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile-only: indicator dots + a generic "Explore" button sit here,
              right under the image — no arrows (swipe/dots are enough on touch),
              and the button label stays constant instead of changing per slide. */}
          <div className="lg:hidden mt-6 flex flex-col items-center gap-6">
            <div className="w-full">
              <SegmentIndicator total={total} active={active} paused={paused} onGoTo={goTo} color="#8D694B" trackColor="rgba(109,103,83,0.16)" />
            </div>
            <SafariButton href={d.href}>
              Explore
            </SafariButton>
          </div>
        </RevealOnView>
      </div>

    </section>
  );
}
