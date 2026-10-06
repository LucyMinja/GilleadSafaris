import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import RevealOnView from '@/app/pages/home/RevealOnView';
import CoverImage from '@/app/components/CoverImage';
import { tourCategory, tourHref, type Tour } from '../safaritours/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Other tours that share at least one park with this one — a real
// cross-link (like a real park in common) rather than an arbitrary "you
// might also like" grab. Park names aren't written identically across
// tours (e.g. "Serengeti" vs "Serengeti National Park" vs "Serengeti
// (Seronera, Kogatende, North Mara)"), so match loosely on substrings
// rather than requiring an exact string match.
function sharesPark(a: string[], b: string[]) {
  return a.some((pa) => b.some((pb) => pa.toLowerCase().includes(pb.toLowerCase().split(' ')[0]) || pb.toLowerCase().includes(pa.toLowerCase().split(' ')[0])));
}

export default function RelatedTours({ tour, all }: { tour: Tour; all: Tour[] }) {
  const related = all
    .filter((t) => t.id !== tour.id && tourCategory(t) === tourCategory(tour) && sharesPark(t.parks, tour.parks))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-6 lg:pt-8 pb-20 lg:pb-28 text-center">
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '10px' }}>Similar Trips</p>
      <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 2.6vw, 36px)', fontWeight: 600, color: '#6D6753', marginBottom: '32px' }}>
        {tourCategory(tour) === 'trekking' ? 'Other climbs on the same mountain' : tourCategory(tour) === 'beach' ? 'Other trips to the same shores' : 'Other safaris that visit the same parks'}
      </h2>
      <div className="swipe-row grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        {related.map((t, i) => (
          <RevealOnView
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.7}
            delay={i * 0.08}
            ease={EASE}
            once={false}
            margin="-40px"
          >
            <Link href={tourHref(t)} className="group block">
              <div className="relative overflow-hidden mb-4" style={{ height: '220px', borderRadius: '4px' }}>
                <CoverImage src={t.img} alt={t.name} sizes="(min-width: 640px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                  <Clock size={11} strokeWidth={1.5} color="#F1EAE0" />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: '#F1EAE0' }}>{t.duration}</span>
                </div>
              </div>
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '19px', fontWeight: 600, color: '#6D6753', lineHeight: 1.3, marginBottom: '8px' }}>{t.name}</p>
              <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-[#8D694B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6D6753', opacity: 0.7 }}>
                View Itinerary <ArrowUpRight size={12} strokeWidth={1.5} />
              </span>
            </Link>
          </RevealOnView>
        ))}
      </div>
    </div>
  );
}
