import { Check, X } from 'lucide-react';
import type { Tour } from './data';
import { standardIncludes, standardExcludes } from './data';

export default function ItineraryIncludes({ tour }: { tour: Tour }) {
  return (
    <>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Itinerary</p>
      <div className="flex flex-col gap-4 mb-8">
        {tour.itinerary.map((day) => (
          <div key={day.day} className="flex gap-4">
            <div className="shrink-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8D694B', width: '64px' }}>
              {day.day}
            </div>
            <div>
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '15px', fontWeight: 600, color: '#6D6753', marginBottom: '4px' }}>{day.title}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', lineHeight: 1.75, color: '#6D6753', opacity: 0.85 }}>{day.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Included</p>
          <div className="flex flex-col gap-2.5">
            {standardIncludes.map((inc) => (
              <div key={inc} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753' }}>
                <Check size={12} color="#8D694B" className="shrink-0" /> {inc}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Not Included</p>
          <div className="flex flex-col gap-2.5">
            {standardExcludes.map((exc) => (
              <div key={exc} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.55 }}>
                <X size={12} color="#6D6753" className="shrink-0" style={{ opacity: 0.5 }} /> {exc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
