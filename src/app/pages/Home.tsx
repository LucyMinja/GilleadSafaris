'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight, ChevronDown, Quote } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';

const destinations = [
  { name: 'Serengeti', tag: 'Endless Plains', desc: 'Where the horizon never ends and the herds never stop moving.', href: '/destinations/serengeti', img: '/images/956A3225.jpg' },
  { name: 'Ngorongoro', tag: 'The Crater', desc: 'A hidden world inside a volcano, teeming with life.', href: '/destinations/ngorongoro', img: '/images/956A4243.jpg' },
  { name: 'Zanzibar', tag: 'Island Paradise', desc: 'Turquoise water, white sand, and the scent of spice in the air.', href: '/destinations/zanzibar', img: '/images/nakupenda beachh.jpg' },
  { name: 'Kilimanjaro', tag: 'Roof of Africa', desc: 'Africa\'s highest point, rising straight out of the plains.', href: '/destinations/kilimanjaro', img: '/images/kilimanjaro-graded.jpg' },
  { name: 'Tarangire', tag: 'Elephant Country', desc: 'Ancient baobabs and the largest elephant herds in Tanzania.', href: '/destinations/tarangire', img: '/images/IMG_0227.jpg' },
];

const safaris = [
  { name: '3-Day Classic Serengeti Safari', days: '3 Days', href: '/safaris', img: '/images/956A2358.jpg' },
  { name: '8-Day Best of Northern Tanzania', days: '8 Days', href: '/safaris', img: '/images/956A2613.jpg' },
  { name: '4-Day Zanzibar Beach & Stone Town', days: '4 Days', href: '/safaris', img: '/images/stone town.jpg' },
  { name: '8-Day Wildebeest Migration', days: '8 Days', href: '/safaris', img: '/images/956A3701.jpg' },
  { name: '5-Day Selous & Mikumi', days: '5 Days', href: '/safaris', img: '/images/956A2192.jpg' },
  { name: '8-Day Tanzania Cultural Tour', days: '8 Days', href: '/safaris', img: '/images/bagamoyo.png' },
];

/* ── Shared carousel dot indicator ──────────────────────────── */
function CarouselDots({
  total, active, onGoTo,
  activeColor = '#8D694B',
  inactiveColor = 'rgba(109,103,83,0.3)',
}: {
  total: number;
  active: number;
  onGoTo: (i: number) => void;
  activeColor?: string;
  inactiveColor?: string;
}) {
  return (
    <div className="flex justify-center items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onGoTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          style={{
            width: i === active ? '28px' : '7px',
            height: '7px',
            borderRadius: '100px',
            backgroundColor: i === active ? activeColor : inactiveColor,
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), background-color 0.4s ease',
          }}
        />
      ))}
    </div>
  );
}

const testimonials = [
  { quote: 'An experience beyond anything I could have imagined. Gillead Safaris made every single moment magical.', name: 'Sarah M.', origin: 'United Kingdom' },
  { quote: 'Professional, warm, and deeply knowledgeable. We saw the Great Migration up close - truly once in a lifetime.', name: 'James & Linda', origin: 'United States' },
  { quote: 'From Arusha to Zanzibar, everything was perfectly arranged. Best money I have ever spent on travel.', name: 'Thomas K.', origin: 'Germany' },
];

/* ── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ backgroundColor: '#8D694B' }}>
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/4010927/4010927-hd_1280_720_30fps.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)' }} />

      {/* Bottom fade — bridges the hero's dark cinematic tone into About's beige
          background as a color transition, rather than a hard cut between sections */}
      <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(241,234,224,0.35) 80%, #F1EAE0 100%)' }} />

      <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ y: textY, opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }}>
          <h1 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(40px, 5.2vw, 70px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '0', color: '#ffffff', textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
            Some journeys bring you<br />back to life.
          </h1>
        </motion.div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.35)' }} strokeWidth={1} />
      </motion.div>
    </section>
  );
}

/* ── About ──────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="relative" style={{ backgroundColor: '#F1EAE0', overflow: 'hidden' }}>
      {/* Asymmetric composition — image sits left, text sits right; headline lives
          inside the text column (not spanning full width) so it reads as one
          composed block instead of a banner sitting over the page */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-20 pb-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 lg:items-center">
        {/* Image column — left, wider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="relative" style={{ width: '88%' }}>
            <div className="group relative overflow-hidden" style={{ height: 'clamp(400px, 38vw, 520px)', borderRadius: '4px' }}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]"
                style={{
                  backgroundImage: "url('/images/956A2613.jpg')",
                  backgroundColor: '#8D694B',
                }}
              />
              <div className="absolute inset-0 opacity-40 group-hover:opacity-90 transition-opacity duration-700" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
              <div className="absolute bottom-8 left-8 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100">
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(14px, 1.6vw, 18px)', fontStyle: 'italic', color: '#ffffff', lineHeight: 1.6, maxWidth: '280px' }}>
                  "Every sunrise here tells a different story - we just help you find yours."
                </p>
              </div>
            </div>

            {/* Floating guide photo — breaks out of the image box's bottom-right corner,
                tilted slightly like a kept Polaroid, leaning toward the text column */}
            <div
              className="absolute hidden md:block"
              style={{ width: '38%', bottom: '-56px', right: '-24px', transform: 'rotate(4deg)' }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', borderRadius: '6px', border: '6px solid #F1EAE0', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
                <Image src="/images/team/nic.png" alt="Nicanory, our reservation manager in Arusha" fill className="object-cover" unoptimized />
              </div>
              <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '13px', color: '#8D694B', textAlign: 'center', marginTop: '10px' }}>
                Nicanory, our team in Arusha
              </p>
            </div>
          </div>
        </motion.div>

        {/* Text column — right, narrower */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="lg:col-span-5"
          style={{ marginTop: 'clamp(20px, 3vw, 36px)' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
          </motion.h2>

          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '18px', fontWeight: 400 }}>
            Gillead Safaris began with a simple belief: that the people who grew up watching the sun rise over the Serengeti are the ones best placed to share it with you.
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '18px', fontWeight: 400 }}>
            We're a team of Arusha locals — guides, drivers, and planners — who have spent our lives among these plains, turning bucket-list dreams into real memories since 2020.
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '40px', fontWeight: 400 }}>
            Every itinerary starts with a conversation, not a template — where you want to go, how long you have, what you're hoping to see. We build the rest around that.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── What We Offer ──────────────────────────────────────────── */
const offerings = [
  { title: 'Into the Wild', img: '/images/956A2874.jpg', href: '/safaris' },
  { title: 'The Great Migration', img: '/images/956A3207.jpg', href: '/safaris' },
  { title: 'Meet the Maasai', img: '/images/Darajani_Market.jpg', href: '/culture' },
  { title: 'Zanzibar Shores', img: '/images/stone town.jpg', href: '/safaris' },
  { title: 'Off the Beaten Path', img: '/images/956A2236.jpg', href: '/safaris' },
];

// Bento layout — one featured tile + four smaller ones arranged around it.
// A static grid on purpose: the homepage already runs two other autoplaying
// carousels (Destinations, SafarisGrid) — a third one here just adds competing
// motion. This section reads calmer, and looks distinct from the carousels below it.
function WhatWeOffer() {
  return (
        <section className="pt-14 pb-20 lg:pt-20 lg:pb-28" style={{ backgroundColor: '#F1EAE0' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-8 text-center"
      >
        <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15 }}>
          Every kind of Tanzania experience
        </h2>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '20px' }}>
        {offerings.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
          >
            <Link
              href={item.href}
              className="group block h-full"
              style={{ textDecoration: 'none' }}
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: '18px',
                    minHeight: i === 0 ? 'clamp(440px, 42vw, 580px)' : 'clamp(230px, 22vw, 300px)',
                    flex: 1,
                    boxShadow: '0 10px 28px rgba(0,0,0,0.14)',
                    transition: 'box-shadow 0.4s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 22px 50px rgba(0,0,0,0.22)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.14)')}
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.img}')`, backgroundColor: '#8D694B' }} />
                  <div className="absolute bottom-2 left-5 right-5 flex items-end justify-between gap-3">
                    <p style={{ fontFamily: "'Newsreader', serif", fontSize: i === 0 ? 'clamp(20px, 2.2vw, 28px)' : 'clamp(14px, 1.4vw, 17px)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25, textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)' }}>
                      {item.title}
                    </p>
                    <div className="flex items-center gap-1.5" style={{ flexShrink: 0, paddingBottom: '3px' }}>
                      <span className="text-white transition-colors duration-300 group-hover:text-[#C9A97E]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textShadow: '0 2px 10px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)' }}>
                        Explore
                      </span>
                      <ArrowRight size={12} strokeWidth={2} className="text-white transition-all duration-300 group-hover:text-[#C9A97E] group-hover:translate-x-1" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.85)) drop-shadow(0 1px 2px rgba(0,0,0,0.9))' }} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Destinations ───────────────────────────────────────────── */
function Destinations() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = destinations.length;

  const goTo = (i: number) => {
    const next = ((i % total) + total) % total;
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % total);
    }, 4500);
    return () => clearInterval(t);
  }, [paused, total]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-6%' : '6%', opacity: 0 }),
  };

  const d = destinations[active];

  return (
    <section style={{ backgroundColor: '#F1EAE0' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-20 pb-8 text-center"
      >
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.30em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '10px' }}>Destinations</p>
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(24px, 3.2vw, 44px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
          Discover Tanzania's wild places
        </h2>
      </motion.div>

      {/* Split layout — text syncs to the active destination on the left,
          a framed (not full-bleed) image carousel on the right */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pb-14 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 lg:items-center">
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '16px' }}>
                {d.tag}
              </p>
              <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(34px, 4.2vw, 56px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.05, marginBottom: '20px' }}>
                {d.name}
              </h3>
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontStyle: 'italic', fontSize: '19px', color: '#6D6753', lineHeight: 1.6, maxWidth: '420px', marginBottom: '32px' }}>
                {d.desc}
              </p>
              <SafariButton href={d.href}>
                Explore {d.name} <ArrowUpRight size={11} strokeWidth={1.5} />
              </SafariButton>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={() => { setPaused(true); goTo(active - 1); }}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-[rgba(109,103,83,0.08)]"
              style={{ border: '1px solid rgba(109,103,83,0.3)', color: '#6D6753' }}
            >
              <ArrowRight size={14} strokeWidth={1.5} className="rotate-180" />
            </button>
            <button
              onClick={() => { setPaused(true); goTo(active + 1); }}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-[rgba(109,103,83,0.08)]"
              style={{ border: '1px solid rgba(109,103,83,0.3)', color: '#6D6753' }}
            >
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
            <CarouselDots total={total} active={active} onGoTo={goTo} activeColor="#8D694B" inactiveColor="rgba(109,103,83,0.3)" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden" style={{ height: 'clamp(360px, 42vw, 560px)', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.16)' }}>
            <AnimatePresence custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={d.img} alt={d.name} fill className="object-cover" unoptimized priority />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pb-14 lg:pb-20 flex justify-end">
        <Link href="/destinations" className="inline-flex items-center gap-1.5 hover:opacity-60 transition-opacity"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B' }}>
          View all destinations <ArrowUpRight size={11} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}

/* ── Safaris ────────────────────────────────────────────────── */
// Calm static grid, deliberately distinct from the Destinations carousel above —
// two auto-rotating carousels back to back read as redundant, so this one just sits still.
function SafarisGrid() {
  return (
     <section style={{ backgroundColor: '#F1EAE0' }} className="pt-14 pb-20 lg:pt-20 lg:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto px-6 lg:px-16 flex items-end justify-between mb-10 flex-wrap gap-4"
      >
        <div>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '10px', letterSpacing: '0.30em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '10px' }}>Our Packages</p>
          <h2 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.1 }}>
            Choose your<br />adventure
          </h2>
        </div>
        <Link href="/safaris" className="inline-flex items-center gap-1.5 hover:opacity-60 transition-opacity"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B' }}>
          All safaris <ArrowUpRight size={11} strokeWidth={1.5} />
        </Link>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {safaris.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={s.href} className="group block" style={{ textDecoration: 'none' }}>
              <div className="relative overflow-hidden" style={{ borderRadius: '4px', aspectRatio: '4/3' }}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${s.img}')`, backgroundColor: '#8D694B' }} />
              </div>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B', marginTop: '18px', marginBottom: '6px' }}>
                {s.days}
              </p>
              <h3 className="transition-opacity group-hover:opacity-70"
                style={{ fontFamily: "'Newsreader',serif", fontSize: '20px', fontWeight: 600, color: '#6D6753', lineHeight: 1.3 }}>
                {s.name}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex justify-center mt-12">
        <SafariButton href="/booking">
          Book a Safari <ArrowUpRight size={11} strokeWidth={1.5} />
        </SafariButton>
      </div>
    </section>
  );
}

/* ── Full-bleed parallax ────────────────────────────────────── */
function FullBleed() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} style={{ position: 'relative', height: '65vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div style={{ y, scale: 1.18, position: 'absolute', inset: 0 }}>
        <Image src="/images/956A3218.jpg" alt="Solitary acacia tree on the Serengeti plain" fill className="object-cover" unoptimized />
      </motion.div>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)' }} />
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '720px' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(20px, 3.2vw, 36px)', color: '#ffffff', fontWeight: 400, lineHeight: 1.65, fontStyle: 'italic', marginBottom: '28px' }}>
            "Travel is never a matter of money, but of courage - take the leap."
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Gillead Safaris, Tanzania</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Testimonials ───────────────────────────────────────────── */
function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="pt-14 pb-20 lg:pt-20 lg:pb-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-40px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '24px' }}>Guest Experiences</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-6"
        >
          <Quote size={28} strokeWidth={1.5} style={{ color: '#8D694B' }} />
        </motion.div>

        <div style={{ minHeight: '180px' }} className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(18px, 2.5vw, 28px)', color: '#6D6753', fontWeight: 400, lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px' }}>
                "{testimonials[active].quote}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center justify-center" style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#F1EAE0', border: '1px solid rgba(109,103,83,0.15)', fontFamily: "'Newsreader', serif", fontSize: '12px', color: '#8D694B' }}>
                  {testimonials[active].name.charAt(0)}
                </div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(109,103,83,0.55)' }}>
                  {testimonials[active].name} · {testimonials[active].origin}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="transition-all duration-300"
              style={{ width: i === active ? '24px' : '6px', height: '2px', backgroundColor: i === active ? '#8D694B' : 'rgba(109,103,83,0.2)', borderRadius: '2px' }} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="pt-14 pb-20 lg:pt-20 lg:pb-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-60px' }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '16px' }}>Start Planning</p>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.2, marginBottom: '18px' }}>
            Your Tanzania<br />adventure awaits
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', color: '#6D6753', lineHeight: 1.8, fontWeight: 400, marginBottom: '32px', maxWidth: '360px' }}>
            Contact us today and let our Arusha-based team design the perfect safari for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <SafariButton href="/booking">
              Plan Your Safari <ArrowUpRight size={11} strokeWidth={1.5} />
            </SafariButton>
            <SafariButton href="tel:+255753959375" variant="secondary">
              Call Us
            </SafariButton>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-60px' }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          {[
            { label: 'Phone', value: '+255 753 959 375', href: 'tel:+255753959375' },
            { label: 'Email', value: 'info@gillieadsafaris.com', href: 'mailto:info@gillieadsafaris.com' },
            { label: 'Location', value: 'Arusha, Tanzania', href: '/contact' },
          ].map(({ label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between py-5 group"
              style={{ borderBottom: '1px solid rgba(109,103,83,0.15)' }}
            >
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8D694B' }}>{label}</span>
              <span className="flex items-center gap-2 group-hover:text-[#8D694B] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', color: '#6D6753' }}>
                {value}
                <ArrowUpRight size={12} strokeWidth={1.5} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ color: '#8D694B' }} />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main style={{ backgroundColor: '#F1EAE0' }}>
      <Hero />
      <About />
      <WhatWeOffer />
      <Destinations />
      <SafarisGrid />
      <FullBleed />
      <Testimonials />
      <CTA />
    </main>
  );
}
