import { C, seasons } from './data';

export default function SeasonTabs({
  activeSeason,
  onSelect,
}: {
  activeSeason: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="px-6 lg:px-20 pt-24 pb-8">
      <div className="max-w-7xl mx-auto">
        <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, marginBottom: '16px' }}>
          Practical Preparation
        </p>
        <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(32px,4vw,52px)', color: C.cream, fontWeight: 400, lineHeight: 1.15, marginBottom: '16px' }}>
          What to Pack by Season
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(238,238,238,0.45)', lineHeight: 1.8, maxWidth: '540px', marginBottom: '48px' }}>
          Tanzania's climate varies dramatically by season. Pack right and your safari will be effortless  pack wrong and the bush will remind you quickly.
        </p>

        <div className="flex flex-wrap gap-3 mb-0">
          {seasons.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onSelect(i)}
              className="relative transition-all duration-300"
              style={{
                padding: '10px 22px',
                border: `1px solid ${i === activeSeason ? C.gold : 'rgba(255,255,255,0.1)'}`,
                backgroundColor: i === activeSeason ? 'rgba(223,147,7,0.12)' : 'transparent',
                color: i === activeSeason ? C.gold : 'rgba(255,255,255,0.45)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: i === activeSeason ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {s.label}
              <span style={{ display: 'block', fontSize: '9px', letterSpacing: '0.04em', textTransform: 'none', opacity: 0.7, marginTop: '2px', fontWeight: 400 }}>
                {s.months}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
