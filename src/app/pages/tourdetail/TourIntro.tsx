import WordLink from '@/app/components/WordLink';
import RevealOnView from '@/app/pages/home/RevealOnView';
import { tourCategory, type Tour } from '../safaritours/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The trip's photo already fills the hero above, so the intro is
// typography-led rather than repeating it: headline + overview on the left,
// the route through the parks as a line of stops on the right.
export default function TourIntro({ tour }: { tour: Tour }) {
  const cta = { trekking: 'Book This Climb', beach: 'Book This Trip', safaris: 'Book This Safari' }[tourCategory(tour)];
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-20 pb-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
      <RevealOnView
        className="lg:col-span-7"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        duration={0.8}
        ease={EASE}
        once={false}
        margin="-100px"
      >
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(30px, 3vw, 46px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.1, marginBottom: '24px' }}>
          {tour.highlight}
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '28px' }}>
          {tour.desc}
        </p>
        <WordLink href={`/booking?tour=${tour.slug}`}>{cta}</WordLink>
      </RevealOnView>

      <RevealOnView
        className="lg:col-span-4 lg:col-start-9"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        duration={0.8}
        delay={0.1}
        ease={EASE}
        once={false}
        margin="-100px"
      >
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '18px' }}>
          The route · {tour.duration}
        </p>
        <ol className="relative list-none m-0 p-0">
          <span aria-hidden className="absolute left-[5px] top-2 bottom-2 w-px" style={{ backgroundColor: 'rgba(141,105,75,0.35)' }} />
          {tour.parks.map((park) => (
            <li key={park} className="relative pl-8 pb-5 last:pb-0">
              <span aria-hidden className="absolute left-0 top-[7px] w-[11px] h-[11px] rounded-full" style={{ backgroundColor: '#F1EAE0', border: '2px solid #8D694B' }} />
              <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '20px', fontWeight: 600, color: '#6D6753', lineHeight: 1.3 }}>{park}</span>
            </li>
          ))}
        </ol>
      </RevealOnView>
    </div>
  );
}
