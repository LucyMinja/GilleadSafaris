'use client';

import PageHero from '@/app/components/PageHero';
import CoverImage from '@/app/components/CoverImage';
import RevealOnView from '@/app/pages/home/RevealOnView';
import { toursIn } from './safaritours/data';
import TourCard from './safaritours/TourCard';
import WhatsIncluded from './safaritours/WhatsIncluded';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// "Zanzibar" is what people search for, but the coast is several very
// different places — a quick guide so guests pick the right one.
const shores = [
  { name: 'Nungwi & Kendwa', img: '/images/px-lodge-nungwi-aerial.jpg', where: 'North Zanzibar', text: 'Swimmable at any tide, with the best sunsets on the island. Lively, with plenty of restaurants.' },
  { name: 'Paje & Jambiani', img: '/images/px-shore-paje.jpg', where: 'East Zanzibar', text: 'Wide, white lagoon beaches where the tide goes out a long way. Kitesurfing, seaweed farms and a slower village pace.' },
  { name: 'Stone Town', img: '/images/px-shore-stone-town.jpg', where: 'West Zanzibar', text: 'The UNESCO-listed old town, with carved doors, spice markets and the Forodhani night food market. Best for one or two nights.' },
  { name: 'Mafia Island', img: '/images/px-shore-mafia-whaleshark.jpg', where: 'South of Dar es Salaam', text: 'A protected marine park, whale sharks from October to March, and almost no crowds.' },
  { name: 'Pemba Island', img: '/images/px-shore-pemba-cove.jpg', where: 'North of Zanzibar', text: 'Green, hilly and rarely visited, with some of the best wall diving in East Africa.' },
];

export default function Beach() {
  const trips = toursIn('beach');

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Zanzibar & the Coast"
        subtitle="White sand, spice-scented old towns and warm Indian Ocean reefs. Stay on the beach, or finish your safari there."
        image="/images/px-zanzibar-dhow-sunset.jpg"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-16 text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.01em' }}>
          An hour's flight from the Serengeti
        </h2>
        <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          Most of our guests end their safari with a few days by the sea, and it's the easiest add-on in Tanzania. A daily flight connects Arusha and the Serengeti airstrips straight to Zanzibar. Take one of the trips below as it is, or tell us your dates and we'll build the beach days around your safari.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 600, color: '#6D6753', marginBottom: '28px' }}>
          Which shore is right for you
        </h3>
        {/* Photo cards: one image per shore with the name and line over it.
            Phones: two columns with the first card full width. */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {shores.map((s, i) => (
            <RevealOnView key={s.name} className={i === 0 ? 'col-span-2 lg:col-span-1' : ''} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} duration={0.7} delay={i * 0.06} ease={EASE} once={false} margin="-60px">
              <div className={`group relative overflow-hidden ${i === 0 ? 'aspect-[4/3] lg:aspect-[3/4.4]' : 'aspect-[3/4.4]'}`} style={{ borderRadius: '2px' }}>
                <CoverImage src={s.img} alt={s.name} sizes="(min-width: 1024px) 20vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 75%)' }} />
                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                  <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E9C99A', marginBottom: '6px' }}>{s.where}</p>
                  <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(19px, 1.6vw, 22px)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '8px' }}>{s.name}</p>
                  <p className="hidden sm:block" style={{ fontSize: '14px', lineHeight: 1.55, color: 'rgba(255,255,255,0.88)' }}>{s.text}</p>
                </div>
              </div>
              <p className="sm:hidden mt-2" style={{ fontSize: '15px', lineHeight: 1.55, color: '#6D6753' }}>{s.text}</p>
            </RevealOnView>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {trips.map((tour, i) => (
          <TourCard key={tour.id} tour={tour} index={i} />
        ))}
      </div>

      <WhatsIncluded category="beach" />
    </div>
  );
}
