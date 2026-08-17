import { Check, X } from 'lucide-react';
import type { Tour } from './data';
import { standardIncludes, standardExcludes } from './data';

export default function ItineraryIncludes({ tour }: { tour: Tour }) {
  return (
    <>
      <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '14px' }}>Itinerary</p>
      <div className="flex flex-col gap-4 mb-8">
        {tour.itinerary.map((day) => (
          <div key={day.day} className="flex gap-4">
            <div className="shrink-0" style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a694f', width: '64px' }}>
              {day.day}
            </div>
            <div>
              <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '15px', color: '#000000', marginBottom: '4px' }}>{day.title}</p>
              <p style={{ fontSize: '13px', lineHeight: 1.75, color: '#555555' }}>{day.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '14px' }}>Included</p>
          <div className="flex flex-col gap-2.5">
            {standardIncludes.map((inc) => (
              <div key={inc} className="flex items-center gap-2" style={{ fontSize: '13px', color: '#333333' }}>
                <Check size={12} color="#8a694f" className="shrink-0" /> {inc}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '14px' }}>Not Included</p>
          <div className="flex flex-col gap-2.5">
            {standardExcludes.map((exc) => (
              <div key={exc} className="flex items-center gap-2" style={{ fontSize: '13px', color: '#999999' }}>
                <X size={12} color="#cccccc" className="shrink-0" /> {exc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
