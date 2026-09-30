import { Check, X } from 'lucide-react';
import RevealOnView from '@/app/pages/home/RevealOnView';
import { standardIncludes, standardExcludes, trekkingIncludes, trekkingExcludes, type TourCategory } from './data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Rendered once for the whole page — every tour shares the same
// included/excluded list, so showing it per-card was pure redundancy.
// Climbs have their own list (crew, mountain gear, rescue fees) since the
// safari one (driver-guide, game-drive vehicle) doesn't apply on foot.
const HEADINGS: Record<TourCategory, string> = {
  safaris: "What's included, on every safari",
  trekking: "What's included, on every climb",
  beach: "What's included, on every trip",
};

export default function WhatsIncluded({ category = 'safaris' }: { category?: TourCategory }) {
  const includes = category === 'trekking' ? trekkingIncludes : standardIncludes;
  const excludes = category === 'trekking' ? trekkingExcludes : standardExcludes;
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-6 lg:pt-8 pb-20 lg:pb-28 text-center">
      <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 2.6vw, 36px)', fontWeight: 600, color: '#6D6753', marginBottom: '48px' }}>
        {HEADINGS[category]}
      </h2>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 max-w-[1300px] mx-auto text-left">
        <div
          className="hidden sm:block absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
          style={{ backgroundColor: 'rgba(109,103,83,0.18)' }}
        />
        <RevealOnView
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          ease={EASE}
          once={false}
          margin="-80px"
        >
          <p className="text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Included</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {includes.map((inc) => (
              <div key={inc} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753' }}>
                <Check size={13} color="#8D694B" className="shrink-0" /> {inc}
              </div>
            ))}
          </div>
        </RevealOnView>
        <RevealOnView
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          delay={0.1}
          ease={EASE}
          once={false}
          margin="-80px"
        >
          <p className="text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Not Included</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {excludes.map((exc) => (
              <div key={exc} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753', opacity: 0.55 }}>
                <X size={13} color="#6D6753" className="shrink-0" style={{ opacity: 0.5 }} /> {exc}
              </div>
            ))}
          </div>
        </RevealOnView>
      </div>
    </div>
  );
}
