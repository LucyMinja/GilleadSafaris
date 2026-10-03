import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import RevealOnView from '@/app/pages/home/RevealOnView';
import WordLink from '@/app/components/WordLink';
import CoverImage from '@/app/components/CoverImage';
import { tours, tourHref } from '@/app/pages/safaritours/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// A fixed 4-column grid leaves an unbalanced dead gap on the right when a
// destination only has 2 or 3 related tours — match the column count to
// how many cards there actually are instead (Tailwind needs the literal
// class strings present in source, so this can't be built from a template
// string).
const GRID_COLS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export default function RelatedTours({
  dest,
}: {
  dest: { name: string; relatedTours: { id: number; name: string; duration: string; img: string }[] };
}) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-20 lg:pt-28 pb-6 lg:pb-8">
      <RevealOnView
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        duration={0.7}
        ease={EASE}
        once={false}
        margin="-60px"
        className="flex items-end justify-between gap-4 mb-10 flex-wrap"
      >
        <div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '10px' }}>Safari Packages</p>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 38px)', fontWeight: 600, color: '#6D6753' }}>
            Safaris that visit {dest.name.split(' ')[0]}
          </h2>
        </div>
        <div className="hidden lg:block">
          <WordLink href="/safaris">All Packages</WordLink>
        </div>
      </RevealOnView>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${GRID_COLS[Math.min(dest.relatedTours.length, 4)]} gap-6`}>
        {dest.relatedTours.map((tour, i) => {
          // Image and link come from the tour itself, so each tour shows its
          // one photo everywhere instead of a hand-copied (and drifting) one.
          const real = tours.find((t) => t.id === tour.id);
          const img = real?.img ?? tour.img;
          const href = real ? tourHref(real) : '/safaris';
          return (
            <RevealOnView
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              duration={0.7}
              delay={i * 0.08}
              ease={EASE}
              once={false}
              margin="-40px"
            >
              <Link href={href} className="group block">
                <div className="relative overflow-hidden mb-4" style={{ height: '200px', borderRadius: '4px' }}>
                  <CoverImage src={img} alt={tour.name} sizes="(min-width: 1024px) 25vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                    <Clock size={11} strokeWidth={1.5} color="#F1EAE0" />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: '#F1EAE0' }}>{tour.duration}</span>
                  </div>
                </div>
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '17px', fontWeight: 600, color: '#6D6753', lineHeight: 1.35, marginBottom: '8px' }}>{tour.name}</p>
                <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-[#8D694B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6D6753', opacity: 0.7 }}>
                  View Details <ArrowUpRight size={11} strokeWidth={1.5} />
                </span>
              </Link>
            </RevealOnView>
          );
        })}
      </div>

      <div className="mt-10 text-center lg:hidden">
        <WordLink href="/safaris">View All Safari Packages</WordLink>
      </div>
    </div>
  );
}
