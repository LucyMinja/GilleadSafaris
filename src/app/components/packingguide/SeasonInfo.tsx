import { Lightbulb } from 'lucide-react';
import { proTip, type Season } from './data';

export default function SeasonInfo({ season }: { season: Season }) {
  return (
    <div className="mb-10">
      <div className="flex items-start gap-3 mb-5">
        <Lightbulb size={19} strokeWidth={1.5} color="#8D694B" style={{ flexShrink: 0, marginTop: '3px' }} />
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(18px, 2vw, 21px)', fontWeight: 600, color: '#8D694B', lineHeight: 1.5 }}>
          {proTip(0, season.id)}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {season.facts.map((fact) => (
          <div key={fact} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', color: '#6D6753', opacity: 0.85 }}>
            <div style={{ width: '4px', height: '4px', backgroundColor: '#8D694B', borderRadius: '50%', flexShrink: 0 }} />
            {fact}
          </div>
        ))}
      </div>
    </div>
  );
}
