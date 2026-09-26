import { Sun, CloudRain } from 'lucide-react';
import { seasons } from './data';

const IS_DRY: Record<string, boolean> = { 'dry-cool': true, 'hot-dry': true, 'long-rains': false, 'short-rains': false };

// Same underline interaction as WordLink (see components/WordLink.tsx) —
// sits at partial width at rest, scales in smoothly on hover — just without
// the arrow, since these are list rows, not "go to" links.
export default function SeasonSidebar({
  activeSeason,
  onSelect,
}: {
  activeSeason: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="overflow-x-auto lg:overflow-visible" style={{ backgroundColor: '#FBF7F0', borderRadius: '12px' }}>
      <div className="flex lg:flex-col" style={{ minWidth: 'max-content' }}>
        {seasons.map((s, i) => {
          const isActive = i === activeSeason;
          const Icon = IS_DRY[s.id] ? Sun : CloudRain;
          const color = isActive ? '#6D6753' : '#8D694B';
          return (
            <button
              key={s.id}
              onClick={() => onSelect(i)}
              className="text-left flex-shrink-0"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                border: 'none',
                cursor: 'pointer',
                padding: '16px 18px',
                background: 'none',
                borderBottom: '1px solid rgba(109,103,83,0.12)',
              }}
              onMouseEnter={(e) => {
                if (isActive) return;
                const underline = e.currentTarget.querySelector<HTMLElement>('[data-underline]');
                if (underline) underline.style.transform = 'scaleX(1)';
              }}
              onMouseLeave={(e) => {
                if (isActive) return;
                const underline = e.currentTarget.querySelector<HTMLElement>('[data-underline]');
                if (underline) underline.style.transform = 'scaleX(0.4)';
              }}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} strokeWidth={1.5} color={color} style={{ flexShrink: 0 }} />
                <span>
                  <span style={{ position: 'relative', display: 'inline-block', fontSize: '13px', fontWeight: 700, color }}>
                    {s.label}
                    <span
                      data-underline
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: '-3px',
                        width: '100%',
                        height: '1.5px',
                        backgroundColor: color,
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0.4)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </span>
                  <span style={{ display: 'block', fontSize: '11px', marginTop: '3px', fontWeight: 400, color: '#6D6753', opacity: isActive ? 0.85 : 0.6 }}>
                    {s.months}
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
