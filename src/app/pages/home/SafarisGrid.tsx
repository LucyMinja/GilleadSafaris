'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import SafariButton from '@/app/components/SafariButton';
import WordLink from '@/app/components/WordLink';
import { tours, toursIn } from '@/app/pages/safaritours/data';
import MaskReveal from './MaskReveal';
import CountUpDays from './CountUpDays';
import PinHeader from './PinHeader';
import CoverImage from '@/app/components/CoverImage';
import { safaris } from './data';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Each card shows its tour's own photo, so no image is shown twice on the site.
const tourImg = (href: string) => tours.find((t) => href.endsWith('/' + t.slug))?.img;

function SafariCard({ s, delay }: { s: (typeof safaris)[number]; delay: number }) {
  const img = tourImg(s.href) ?? s.img;
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.05 });
  const overlayRef = useRef(null);
  const overlayInView = useInView(overlayRef, { once: true, amount: 0.05 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {/* Phones: compact row (square thumbnail + text) so all trips stay visible
          without a long stack of big cards. From sm up: the original card. */}
      <Link href={s.href} className="group flex items-start gap-4 sm:block" style={{ textDecoration: 'none' }}>
        <div ref={overlayRef} className="relative overflow-hidden shrink-0 w-[112px] h-[112px] sm:w-auto sm:h-auto sm:aspect-[4/3]" style={{ borderRadius: '4px' }}>
          <CoverImage src={img} alt={s.name} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: '#F1EAE0' }}
            initial={{ opacity: 1 }}
            animate={overlayInView ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.45, delay: delay + 0.1, ease: EASE }}
          />
        </div>
        <div className="min-w-0 flex-1 sm:mt-[18px]">
        <MaskReveal viewport delay={delay + 0.15} duration={0.5} ease={EASE} style={{ marginBottom: '6px' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B' }}>
            <CountUpDays text={s.days} />
          </p>
        </MaskReveal>
        <MaskReveal viewport delay={delay + 0.22} duration={0.5} ease={EASE} style={{ marginBottom: '8px' }}>
          <h3 className="transition-colors duration-500 text-[#6D6753] group-hover:text-[#8D694B]"
            style={{ fontFamily: "'Newsreader',serif", fontSize: '20px', fontWeight: 600, lineHeight: 1.3 }}>
            {s.name}
          </h3>
        </MaskReveal>
        <MaskReveal viewport delay={delay + 0.29} duration={0.5} ease={EASE}>
          <p className="transition-colors duration-500 text-[#6D6753] group-hover:text-[#8D694B] line-clamp-2 sm:line-clamp-none"
            style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '17px', fontWeight: 400, lineHeight: 1.55, opacity: 0.85 }}>
            {s.desc}
          </p>
        </MaskReveal>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SafarisGrid() {
  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="pb-10 lg:pb-14">
      <PinHeader>
        <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(30px, 3.6vw, 46px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px' }}>
          Choose your Adventure
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          From a three-day taste of the Serengeti to an eight-day loop through four parks, each package below is a starting point we tailor around your dates and group size.
        </p>
      </PinHeader>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {safaris.map((s, i) => (
          <SafariCard key={s.name} s={s} delay={(i % 3) * 0.1} />
        ))}
      </div>

      {/* Only six trips fit here — point to the full lists, one per section,
          with live counts so they never go stale as trips are added. */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mt-12 lg:mt-14">
        <p className="text-center mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B' }}>
          See every trip
        </p>
        {/* Phones & tablets: three boxed tiles. Laptops & desktops: word links. */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto lg:hidden">
          {[
            { href: '/safaris', n: toursIn('safaris').length, label: 'Safaris' },
            { href: '/trekking', n: toursIn('trekking').length, label: 'Treks' },
            { href: '/beach', n: toursIn('beach').length, label: 'Beach' },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col items-center justify-center py-4 sm:py-5 border transition-colors duration-300 hover:bg-[#8D694B] hover:border-[#8D694B]"
              style={{ borderColor: 'rgba(141,105,75,0.35)', borderRadius: '2px', textDecoration: 'none' }}
            >
              <span className="transition-colors text-[#6D6753] group-hover:text-white" style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 600, lineHeight: 1 }}>{c.n}</span>
              <span className="flex items-center gap-1 mt-2 transition-colors text-[#8D694B] group-hover:text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                {c.label} <ArrowRight size={12} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex justify-center gap-x-12">
          <WordLink href="/safaris">All {toursIn('safaris').length} safaris</WordLink>
          <WordLink href="/trekking">{toursIn('trekking').length} Kilimanjaro &amp; treks</WordLink>
          <WordLink href="/beach">{toursIn('beach').length} beach holidays</WordLink>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex justify-center mt-10">
        <SafariButton href="/booking">
          Book a Safari
        </SafariButton>
      </div>
    </section>
  );
}
