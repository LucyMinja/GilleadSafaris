'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import CoverImage from '@/app/components/CoverImage';
import { chromeSmall, subLabel } from '@/app/components/chromeType';

// "Cinematic stills" hero: Gillead's own photography cross-fades through the
// four things the company does, and the scene names along the bottom double
// as the way into each section. Replaces the 53 MB (later 3.7 MB) stock ocean
// clip. The first photo is the page's main image and loads immediately; the
// rest only load once the page has finished, so first paint stays fast.
const SCENES = [
  { label: 'Safari', img: '/images/956A3311.webp', alt: 'Migration herds of wildebeest and zebra filling the Serengeti plains', href: '/safaris', cta: 'Explore safaris' },
  { label: 'Kilimanjaro', img: '/images/kilimanjaro-graded.jpg', alt: 'Kilimanjaro rising above acacia and grazing zebra', href: '/trekking', cta: 'Climb Kilimanjaro' },
  { label: 'Zanzibar', img: '/images/nakupenda-beach.webp', alt: 'Turquoise water and a dhow at the Nakupenda sandbank, Zanzibar', href: '/beach', cta: 'Beach holidays' },
  { label: 'Culture', img: '/images/IMG_2493.webp', alt: 'Cattle herds grazing on the plains below the Rift escarpment', href: '/culture', cta: 'Meet the people' },
];
const SCENE_MS = 7000;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-15%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false); // load scenes 2–4 after the page
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the timer after a manual pick

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const go = () => setReady(true);
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => window.removeEventListener('load', go);
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % SCENES.length), SCENE_MS);
    return () => clearTimeout(t);
  }, [active, ready, reducedMotion, cycle]);

  const pick = (i: number) => { setActive(i); setCycle((c) => c + 1); };
  const scene = SCENES[active];

  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden" style={{ backgroundColor: 'var(--chrome)' }}>
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {SCENES.map((s, i) => (i === 0 || ready) && (
          <div
            key={s.img}
            className="absolute inset-0"
            aria-hidden={i !== active}
            style={{ opacity: i === active ? 1 : 0, transition: 'opacity 1.6s ease' }}
          >
            {/* Slow push-in while a scene is showing (skipped for reduced motion). */}
            <div
              className="absolute inset-0"
              style={{
                transform: i === active && !reducedMotion ? 'scale(1.08)' : 'scale(1)',
                transition: i === active ? `transform ${SCENE_MS + 1600}ms linear` : 'transform 0s 1.6s',
              }}
            >
              <CoverImage src={s.img} alt={s.alt} priority={i === 0} sizes="100vw" />
            </div>
          </div>
        ))}
      </motion.div>

      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.65) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(241,234,224,0.25) 70%, #F1EAE0 100%)' }} />

      <motion.div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-[30vh]" style={{ y: textY, opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }}>
          <h1 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(38px, 4.8vw, 64px)', fontWeight: 400, lineHeight: 1.15, color: '#ffffff', textShadow: '0 2px 16px rgba(0,0,0,0.4)', textWrap: 'balance' }}>
            Some journeys bring you<br />back to life.
          </h1>
          <Link
            href={scene.href}
            className="group inline-flex items-center gap-2 mt-7 text-white hover:text-[#E9A36B] transition-colors"
            style={{ ...subLabel, fontSize: '13px', textDecoration: 'none' }}
          >
            {scene.cta}
            <ArrowRight size={14} strokeWidth={1.75} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scene names = the way into each section; the line under the active
          one fills over the scene's 7 seconds. */}
      <nav aria-label="Featured experiences" className="absolute inset-x-0 bottom-10 sm:bottom-14">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-4 gap-3 sm:gap-8">
          {SCENES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => pick(i)}
              aria-current={i === active}
              className="text-left cursor-pointer"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <span className="block relative h-[2px] mb-3 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
                <span
                  key={i === active ? `${active}-${cycle}` : 'idle'}
                  className="absolute inset-y-0 left-0"
                  style={{
                    backgroundColor: '#FFFFFF',
                    width: i === active ? '100%' : '0%',
                    animation: i === active && ready && !reducedMotion ? `hero-fill ${SCENE_MS}ms linear` : undefined,
                  }}
                />
              </span>
              <span
                className="block transition-colors text-[10px] tracking-[0.06em] sm:text-[12px] sm:tracking-[0.14em] truncate"
                style={{ ...chromeSmall, fontSize: undefined, letterSpacing: undefined, textTransform: 'uppercase', fontWeight: 600, color: i === active ? '#FFFFFF' : 'rgba(255,255,255,0.55)' }}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </section>
  );
}
