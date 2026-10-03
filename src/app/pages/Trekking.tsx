'use client';

import PageHero from '@/app/components/PageHero';
import RevealOnView from '@/app/pages/home/RevealOnView';
import { toursIn } from './safaritours/data';
import TourCard from './safaritours/TourCard';
import WhatsIncluded from './safaritours/WhatsIncluded';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Route comparison — the first question every Kilimanjaro enquiry asks is
// "which route?", so answer it on the page instead of in an email thread.
const routes = [
  { name: 'Machame', days: '6–7 days', sleep: 'Tents', traffic: 'Busy', bestFor: 'Scenery and a strong summit rate at a fair price' },
  { name: 'Lemosho', days: '7–8 days', sleep: 'Tents', traffic: 'Quiet, then moderate', bestFor: 'The best acclimatisation and the highest success rate' },
  { name: 'Marangu', days: '5–6 days', sleep: 'Huts', traffic: 'Busy', bestFor: 'Climbers who would rather sleep in huts than tents' },
  { name: 'Rongai', days: '6–7 days', sleep: 'Tents', traffic: 'Quiet', bestFor: 'Rainy-season climbs, since the north side stays drier' },
];

const labelStyle = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#8D694B' };

export default function Trekking() {
  const treks = toursIn('trekking');

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Kilimanjaro & Trekking"
        subtitle="Private climbs on Africa's highest peak and its neighbours, led by certified mountain guides from Moshi and Arusha."
        image="/images/kilimanjaro-graded.jpg"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-16 text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.01em' }}>
          5,895 metres, one step at a time
        </h2>
        <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          Most people who don't reach Uhuru Peak didn't lack fitness. They went up too fast. Every climb below builds in time to acclimatise, and our guides check your oxygen and pulse every morning and evening on the mountain. If you're unsure which route suits you, start with the comparison below.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        <RevealOnView initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} duration={0.8} ease={EASE} once={false} margin="-80px">
          <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 600, color: '#6D6753', marginBottom: '28px' }}>
            Choosing a Kilimanjaro route
          </h3>
          <div style={{ borderTop: '1px solid rgba(109,103,83,0.18)' }}>
            <div className="hidden md:grid grid-cols-12 gap-6 py-4" style={{ borderBottom: '1px solid rgba(109,103,83,0.18)' }}>
              <span className="col-span-2" style={labelStyle}>Route</span>
              <span className="col-span-2" style={labelStyle}>Length</span>
              <span className="col-span-2" style={labelStyle}>Sleeping</span>
              <span className="col-span-2" style={labelStyle}>Crowds</span>
              <span className="col-span-4" style={labelStyle}>Best for</span>
            </div>
            {routes.map((r) => (
              <div key={r.name} className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-1 py-5" style={{ borderBottom: '1px solid rgba(109,103,83,0.18)', color: '#6D6753', fontSize: '17px' }}>
                <span className="col-span-2 md:col-span-2" style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '20px', fontWeight: 600 }}>{r.name}</span>
                <span className="md:col-span-2">{r.days}</span>
                <span className="md:col-span-2">{r.sleep}</span>
                <span className="md:col-span-2">{r.traffic}</span>
                <span className="col-span-2 md:col-span-4" style={{ opacity: 0.85 }}>{r.bestFor}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#6D6753', opacity: 0.8, marginTop: '20px' }}>
            The best climbing months are January to mid-March and June to October. We can also run private climbs in the shoulder months if you don't mind some rain.
          </p>
        </RevealOnView>
      </div>

      <div className="flex flex-col">
        {treks.map((tour, i) => (
          <TourCard key={tour.id} tour={tour} index={i} />
        ))}
      </div>

      <WhatsIncluded category="trekking" />
    </div>
  );
}
