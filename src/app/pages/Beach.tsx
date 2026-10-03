'use client';

import PageHero from '@/app/components/PageHero';
import RevealOnView from '@/app/pages/home/RevealOnView';
import { toursIn } from './safaritours/data';
import TourCard from './safaritours/TourCard';
import WhatsIncluded from './safaritours/WhatsIncluded';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// "Zanzibar" is what people search for, but the coast is several very
// different places — a quick guide so guests pick the right one.
const shores = [
  { name: 'Nungwi & Kendwa', where: 'North Zanzibar', text: 'Swimmable at any tide, with the best sunsets on the island. Lively, with plenty of restaurants.' },
  { name: 'Paje & Jambiani', where: 'East Zanzibar', text: 'Wide, white lagoon beaches where the tide goes out a long way. Kitesurfing, seaweed farms and a slower village pace.' },
  { name: 'Stone Town', where: 'West Zanzibar', text: 'The UNESCO-listed old town, with carved doors, spice markets and the Forodhani night food market. Best for one or two nights.' },
  { name: 'Mafia Island', where: 'South of Dar es Salaam', text: 'A protected marine park, whale sharks from October to March, and almost no crowds.' },
  { name: 'Pemba Island', where: 'North of Zanzibar', text: 'Green, hilly and rarely visited, with some of the best wall diving in East Africa.' },
];

export default function Beach() {
  const trips = toursIn('beach');

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Zanzibar & the Coast"
        subtitle="White sand, spice-scented old towns and warm Indian Ocean reefs. Stay on the beach, or finish your safari there."
        image="/images/px-zanzibar-aerial.jpg"
        imagePosition="center 45%"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10">
          {shores.map((s, i) => (
            <RevealOnView key={s.name} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} duration={0.7} delay={i * 0.06} ease={EASE} once={false} margin="-60px">
              <div className="pt-5" style={{ borderTop: '1px solid rgba(109,103,83,0.25)' }}>
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '20px', fontWeight: 600, color: '#6D6753', marginBottom: '4px' }}>{s.name}</p>
                <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '12px' }}>{s.where}</p>
                <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#6D6753', opacity: 0.85 }}>{s.text}</p>
              </div>
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
