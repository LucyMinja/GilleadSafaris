import { MapPin, Clock } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import type { Tour } from '../safaritours/data';

// Quick-facts card that sits alongside the overview paragraph — duration,
// parks visited, and the price/quote block moved out of the listing card's
// layout since this page has its own dedicated space for it.
export default function TourFacts({ tour }: { tour: Tour }) {
  return (
    <div className="p-8" style={{ backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid rgba(109,103,83,0.12)' }}>
      <div className="flex items-center gap-2 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753' }}>
        <Clock size={14} strokeWidth={1.5} color="#8D694B" />
        {tour.duration}
      </div>

      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '10px' }}>Parks & Places</p>
      <div className="flex flex-col gap-2 mb-7">
        {tour.parks.map((p) => (
          <div key={p} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: '#6D6753' }}>
            <MapPin size={12} strokeWidth={1.5} color="#8D694B" />
            {p}
          </div>
        ))}
      </div>

      <div className="pt-6 mb-7" style={{ borderTop: '1px solid rgba(109,103,83,0.12)' }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '4px' }}>Price</p>
        <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '30px', fontWeight: 600, color: '#6D6753', lineHeight: 1 }}>{tour.price}</p>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753', opacity: 0.7, marginTop: '4px' }}>{tour.priceNote}</p>
      </div>

      <SafariButton href="/booking" className="w-full justify-center">
        Book Now
      </SafariButton>
    </div>
  );
}
