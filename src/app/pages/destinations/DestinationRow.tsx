'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import WordLink from '@/app/components/WordLink';
import MaskReveal from '@/app/pages/home/MaskReveal';
import RevealOnView from '@/app/pages/home/RevealOnView';
import WordReveal from '@/app/components/WordReveal';
import CoverImage from '@/app/components/CoverImage';
import type { Destination } from './data';

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function DestinationRow({ dest, index }: { dest: Destination; index: number }) {
  const isReverse = index % 2 === 0;
  const [hovered, setHovered] = useState(false);
  const storyHref = dest.slug ? `/destinations/${dest.slug}` : null;

  const imgWrapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgWrapRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-18px', '18px']);

  return (
    <RevealOnView
      id={dest.name.split(' ')[0].toLowerCase()}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      duration={1.1}
      ease={EASE}
      once={false}
      margin="0px"
      className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 lg:items-center"
    >
      <div className="contents" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* Image column — order-2 on mobile */}
        <div className={`relative lg:col-span-7 order-2 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <div ref={imgWrapRef} className="relative" style={{ width: '88%', margin: isReverse ? '0 0 0 auto' : '0' }}>
            <motion.div style={{ y: imgY }}>
              <ClickableWrap href={storyHref} className="relative block overflow-hidden" style={{ height: 'clamp(320px, 34vw, 460px)', borderRadius: '4px' }}>
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: hovered ? 1.06 : 1 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <CoverImage src={dest.heroImg} alt={dest.name} priority={index === 0} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }}
                  animate={{ opacity: hovered ? 0.85 : 0.4 }}
                  transition={{ duration: 0.5 }}
                />
              </ClickableWrap>
            </motion.div>
          </div>
        </div>

        {/* Text column — order-1 on mobile */}
        <div className={`lg:col-span-5 order-1 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`} style={{ marginTop: 'clamp(24px, 3vw, 0px)' }}>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B' }}>
              <MapPin size={11} strokeWidth={1.5} /> {dest.region}
            </div>
            {storyHref && (
              <WordLink href={storyHref}>
                Read the Story
              </WordLink>
            )}
          </div>

          <MaskReveal viewport once={false} duration={0.7} delay={0.1} style={{ marginBottom: '18px' }}>
            <ClickableWrap href={storyHref} className="block">
              <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                {dest.name}
              </h2>
            </ClickableWrap>
          </MaskReveal>

          <ClickableWrap href={storyHref} className="block">
            <WordReveal
              text={dest.desc}
              once={false}
              baseDelay={0.3}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, fontWeight: 400, marginBottom: '24px', color: hovered ? '#8D694B' : '#6D6753', transition: 'color 0.5s ease' }}
            />
          </ClickableWrap>

          <MaskReveal viewport once={false} duration={0.6} delay={0.6} style={{ marginBottom: '32px' }}>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {dest.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.85 }}>
                  <div style={{ width: '4px', height: '4px', backgroundColor: '#8D694B', borderRadius: '50%', flexShrink: 0 }} />
                  {h}
                </div>
              ))}
            </div>
          </MaskReveal>

          <MaskReveal viewport once={false} duration={0.6} delay={0.8}>
            <SafariButton href="/booking" variant="secondary">
              Plan a Safari Here
            </SafariButton>
          </MaskReveal>
        </div>
      </div>
    </RevealOnView>
  );
}

function ClickableWrap({
  href,
  children,
  className,
  style,
}: {
  href: string | null;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!href) return <div className={className} style={style}>{children}</div>;
  return (
    <Link href={href} className={className} style={{ textDecoration: 'none', ...style }}>
      {children}
    </Link>
  );
}
