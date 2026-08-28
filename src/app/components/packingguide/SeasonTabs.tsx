import { C, seasons } from './data';

export default function SeasonTabs({
  activeSeason,
  onSelect,
}: {
  activeSeason: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pb-10 text-center">
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>
        Safari Essentials
      </p>
      <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(30px, 3.4vw, 46px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '16px' }}>
        What to Pack, by Season
      </h2>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', color: '#6D6753', opacity: 0.85, lineHeight: 1.8, maxWidth: '820px', margin: '0 auto 40px' }}>
        Tanzania's climate varies dramatically by season. Pack right and your safari will be effortless — pack wrong and the bush will remind you quickly.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {seasons.map((s, i) => {
          const isActive = i === activeSeason;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(i)}
              className="group"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: 'none',
                border: 'none',
                padding: '0 0 12px',
                cursor: 'pointer',
                borderBottom: isActive ? `2px solid ${C.gold}` : '2px solid transparent',
                color: isActive ? C.gold : '#6D6753',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = C.gold; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#6D6753'; }}
            >
              <span style={{ fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: isActive ? 700 : 600 }}>
                {s.label}
              </span>
              <span style={{ display: 'block', fontSize: '11px', marginTop: '3px', fontWeight: 400, opacity: 0.75 }}>
                {s.months}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
