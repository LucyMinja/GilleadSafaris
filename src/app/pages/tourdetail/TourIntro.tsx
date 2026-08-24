import WordLink from '@/app/components/WordLink';
import RevealOnView from '@/app/pages/home/RevealOnView';
import CoverImage from '@/app/components/CoverImage';
import type { Tour } from '../safaritours/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Image + text pairing right under the hero — the same 7/5 split used by
// About/Destinations — so the page has one real photo moment and an
// actionable CTA before the reader ever reaches the itinerary grid, instead
// of dropping straight from the hero into a bare paragraph. Reuses the same
// photo already shown on the /safaris listing card rather than sourcing a
// new one, so the transition from card to detail page feels continuous.
export default function TourIntro({ tour }: { tour: Tour }) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-20 pb-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 lg:items-center">
      <RevealOnView
        className="lg:col-span-7"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        duration={0.8}
        ease={EASE}
        once={false}
        margin="-100px"
      >
        <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 36vw, 480px)', borderRadius: '4px' }}>
          <CoverImage src={tour.img} alt={tour.name} priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)' }} />
        </div>
      </RevealOnView>

      <RevealOnView
        className="lg:col-span-5"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        duration={0.8}
        delay={0.1}
        ease={EASE}
        once={false}
        margin="-100px"
      >
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 2.4vw, 38px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '20px' }}>
          {tour.highlight}
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '28px' }}>
          {tour.desc}
        </p>
        <WordLink href={`/booking?tour=${tour.slug}`}>Book This Safari</WordLink>
      </RevealOnView>
    </div>
  );
}
