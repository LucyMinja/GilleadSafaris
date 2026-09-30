'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import MagneticWrap from './MagneticWrap';
import RevealOnView from './RevealOnView';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const contacts = [
  { label: 'Phone', value: '+255 753 959 375', href: 'tel:+255753959375' },
  { label: 'Email', value: 'info@gilleadsafaris.com', href: 'mailto:info@gilleadsafaris.com' },
  { label: 'Location', value: 'Arusha, Tanzania', href: '/contact' },
];

function ContactRow({ label, value, href, delay }: { label: string; value: string; href: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className="flex items-center justify-between py-5 group"
      style={{ borderBottom: '1px solid rgba(109,103,83,0.15)' }}
    >
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8D694B' }}>{label}</span>
      <span className="flex items-center gap-2 group-hover:text-[#8D694B] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', color: '#6D6753' }}>
        {value}
        <ArrowUpRight size={12} strokeWidth={1.5} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ color: '#8D694B' }} />
      </span>
    </motion.a>
  );
}

export default function CTA() {
  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="pt-8 pb-20 lg:pt-10 lg:pb-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text column — order-1 on mobile */}
        <RevealOnView
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          ease={EASE}
          once={false}
          margin="-100px"
          className="order-1 lg:order-1"
        >
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '16px' }}>Start Planning</p>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.2, marginBottom: '18px' }}>
            Your Tanzania<br />adventure awaits
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', color: '#6D6753', lineHeight: 1.8, fontWeight: 400, marginBottom: '32px', maxWidth: '360px' }}>
            Contact us today and let our Arusha-based team design the perfect safari for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticWrap>
              <SafariButton href="/booking">
                Plan Your Safari
              </SafariButton>
            </MagneticWrap>
            <SafariButton href="tel:+255753959375" variant="secondary">
              Call Us
            </SafariButton>
          </div>
        </RevealOnView>

        {/* Info/Contacts column — order-2 on mobile */}
        <RevealOnView
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          delay={0.1}
          ease={EASE}
          once={false}
          margin="-100px"
          className="order-2 lg:order-2"
        >
          {contacts.map(({ label, value, href }, i) => (
            <ContactRow key={label} label={label} value={value} href={href} delay={i * 0.08} />
          ))}
        </RevealOnView>
      </div>
    </section>
  );
}
