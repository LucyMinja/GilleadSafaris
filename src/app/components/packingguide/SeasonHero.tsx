import type { Season } from './data';

export default function SeasonHero({ season }: { season: Season }) {
  return (
    <div className="relative h-64 lg:h-80 overflow-hidden mx-6 lg:mx-20 mt-6 rounded-none">
      <img
        src={season.heroImg}
        alt={season.label}
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.45)' }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
        <div className="flex items-center gap-3 mb-3">
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              fontSize: '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              backgroundColor: season.badgeColor,
              color: '#fff',
            }}
          >
            {season.badge}
          </span>
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            {season.months}
          </span>
        </div>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: '640px', marginBottom: '8px' }}>
          <span style={{ color: '#DF9307', fontWeight: 500 }}>Weather: </span>{season.weather}
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: '640px' }}>
          <span style={{ color: 'rgba(238,238,238,0.6)', fontWeight: 500 }}>Wildlife: </span>{season.wildlife}
        </p>
      </div>
    </div>
  );
}
