'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { notFound } from 'next/navigation';
import { destinationData } from './destinationdetail/data';
import DetailHero from './destinationdetail/DetailHero';
import HistorySection from './destinationdetail/HistorySection';
import RelatedTours from './destinationdetail/RelatedTours';
import DetailCTA from './destinationdetail/DetailCTA';

export { destinationData };

export default function DestinationDetail({ slug }: { slug: string }) {
  const dest = destinationData.find((d) => d.slug === slug);
  if (!dest) notFound();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Lato', sans-serif" }}>
      <DetailHero dest={dest} heroRef={heroRef} bgY={bgY} textY={textY} heroOpacity={heroOpacity} />
      <HistorySection dest={dest} />
      <RelatedTours dest={dest} />
      <DetailCTA destName={dest.name} />
    </div>
  );
}
