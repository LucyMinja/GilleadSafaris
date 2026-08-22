'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import RevealOnView from '@/app/pages/home/RevealOnView';
import { offices } from './data';
import { socials } from '@/app/components/footer/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Same quiet bordered-row + hover-arrow pattern as the homepage CTA's
// contact list — reused here rather than inventing a second "contact info"
// visual language for the same kind of data.
function InfoRow({ label, value, href, delay }: { label: string; value: string; href?: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const Tag = href ? motion.a : motion.div;

  return (
    <Tag
      ref={ref}
      href={href}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className="flex items-center justify-between py-5 group"
      style={{ borderBottom: '1px solid rgba(109,103,83,0.15)' }}
    >
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8D694B' }}>{label}</span>
      <span className={`flex items-center gap-2 ${href ? 'group-hover:text-[#8D694B] transition-colors' : ''}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', color: '#6D6753', textAlign: 'right' }}>
        {value}
        {href && <ArrowUpRight size={12} strokeWidth={1.5} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" style={{ color: '#8D694B' }} />}
      </span>
    </Tag>
  );
}

export default function OfficeSection() {
  const office = offices[0];

  return (
    <RevealOnView
      className="lg:col-span-5"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      duration={0.8}
      ease={EASE}
      once={false}
      margin="-80px"
    >
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Our Office</p>
      <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.2, marginBottom: '32px' }}>
        {office.city}, {office.country}
      </h2>

      <div className="mb-10" style={{ borderTop: '1px solid rgba(109,103,83,0.15)' }}>
        <InfoRow label="Address" value={office.address} delay={0} />
        <InfoRow label="Phone" value={office.phone} href={`tel:${office.phone}`} delay={0.06} />
        <InfoRow label="Email" value={office.email} href={`mailto:${office.email}`} delay={0.12} />
        <InfoRow label="Hours" value={office.hours} delay={0.18} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {socials.map(({ icon, label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-[#8D694B] transition-colors hover:bg-[#8D694B] hover:text-white"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', border: '1.5px solid #8D694B', borderRadius: '2px' }}>
            {icon} {label}
          </a>
        ))}
      </div>
    </RevealOnView>
  );
}
