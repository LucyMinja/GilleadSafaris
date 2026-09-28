'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import RevealOnView from '@/app/pages/home/RevealOnView';
import CoverImage from '@/app/components/CoverImage';
import type { EssentialsSection } from '@/app/pages/essentials/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FAQSection({ section }: { section: EssentialsSection }) {
  const isReverse = section.reverse;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 lg:items-start">
      {/* Image column — order-2 on mobile */}
      <RevealOnView
        className={`lg:col-span-5 order-2 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}
        initial={{ opacity: 0, x: isReverse ? 40 : -40 }}
        animate={{ opacity: 1, x: 0 }}
        duration={0.8}
        ease={EASE}
        once={false}
        margin="-80px"
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', borderRadius: '2px' }}>
          <CoverImage src={section.img} alt={section.title} />
        </div>
      </RevealOnView>

      {/* Text column — order-1 on mobile */}
      <div className={`lg:col-span-7 order-1 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`}>
        <RevealOnView
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          duration={0.7}
          ease={EASE}
          once={false}
          margin="-80px"
        >
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>
            {section.kicker}
          </p>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(30px, 3.4vw, 460px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '32px' }}>
            {section.title}
          </h2>
        </RevealOnView>

        <div className="flex flex-col gap-7">
          {section.items.map((item, i) => (
            <RevealOnView
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              duration={0.6}
              delay={i * 0.06}
              ease={EASE}
              once={false}
              margin="-60px"
            >
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#6D6753', marginBottom: '8px' }}>
                {item.q}
              </p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', lineHeight: 1.8, color: '#6D6753', opacity: 0.85 }}>
                {item.a}
              </p>
            </RevealOnView>
          ))}
        </div>

        {section.callout && (
          <div className="mt-8" style={{ padding: '22px 24px', backgroundColor: 'rgba(141,105,75,0.06)', borderRadius: '6px' }}>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '17px', fontWeight: 600, color: '#6D6753', marginBottom: '10px' }}>
              {section.callout.label}
            </p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', lineHeight: 1.7, color: '#6D6753', opacity: 0.75, marginBottom: '12px' }}>
              {section.callout.text}
            </p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.1em', fontWeight: 700, color: '#8D694B' }}>
              {section.callout.stat}
            </p>
          </div>
        )}

        {section.cta && (
          <Link
            href={section.cta.href}
            className="inline-flex items-center gap-2 mt-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#8D694B', textDecoration: 'none' }}
          >
            {section.cta.label} <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        )}
      </div>
    </div>
  );
}
