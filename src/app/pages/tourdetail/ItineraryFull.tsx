import { Utensils, BedDouble } from 'lucide-react';
import RevealOnView from '@/app/pages/home/RevealOnView';
import type { Tour } from '../safaritours/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Full day-by-day itinerary for the detail page — unlike the short inline
// preview on the /safaris listing card, this includes Meals and
// Accommodation per day (pulled from the original site's real itineraries),
// which is exactly the detail the listing card doesn't have room for.
export default function ItineraryFull({ tour }: { tour: Tour }) {
  return (
    <div className="flex flex-col gap-10">
      {tour.itinerary.map((day, i) => (
        <RevealOnView
          key={day.day}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          duration={0.7}
          delay={i * 0.04}
          ease={EASE}
          once={false}
          margin="-60px"
          className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-x-8 gap-y-3"
        >
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', fontWeight: 700 }}>
            {day.day}
          </p>
          <div>
            <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '22px', fontWeight: 600, color: '#6D6753', marginBottom: '10px' }}>
              {day.title}
            </h3>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', lineHeight: 1.8, color: '#6D6753', marginBottom: '14px' }}>
              {day.text}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {day.meals && (
                <div className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.75 }}>
                  <Utensils size={12} strokeWidth={1.5} color="#8D694B" />
                  {day.meals}
                </div>
              )}
              {day.accommodation && (
                <div className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.75 }}>
                  <BedDouble size={12} strokeWidth={1.5} color="#8D694B" />
                  {day.accommodation}
                </div>
              )}
            </div>
          </div>
        </RevealOnView>
      ))}
    </div>
  );
}
