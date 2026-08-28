import { proTip, type Season } from './data';

export default function SeasonInfo({ season }: { season: Season }) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-10 text-center">
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-10">
        {season.facts.map((fact) => (
          <div key={fact} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.85 }}>
            <div style={{ width: '4px', height: '4px', backgroundColor: '#8D694B', borderRadius: '50%', flexShrink: 0 }} />
            {fact}
          </div>
        ))}
      </div>

      <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.4, maxWidth: '760px', margin: '0 auto' }}>
        {proTip(0, season.id)}
      </p>
    </div>
  );
}
