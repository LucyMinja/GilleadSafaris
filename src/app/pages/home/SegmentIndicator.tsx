'use client';

/* ── Segmented progress indicator — replaces plain dots ──────── */
export default function SegmentIndicator({
  total,
  active,
  paused,
  duration = 4.5,
  onGoTo,
  color = '#8D694B',
  trackColor = 'rgba(109,103,83,0.16)',
}: {
  total: number;
  active: number;
  paused: boolean;
  duration?: number;
  onGoTo: (i: number) => void;
  color?: string;
  trackColor?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 flex-1">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onGoTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="relative flex-1 group py-2 -my-2"
          style={{ border: 'none', padding: '8px 0', cursor: 'pointer', background: 'none' }}
        >
          <span
            className="relative block overflow-hidden transition-transform duration-300 group-hover:scale-y-150"
            style={{ height: '2.5px', borderRadius: '100px', backgroundColor: trackColor }}
          >
            {i < active && (
              <span className="absolute inset-0" style={{ backgroundColor: color, borderRadius: '100px' }} />
            )}
            {i === active && (
              <span
                className="absolute inset-y-0 left-0 segment-fill"
                style={{
                  backgroundColor: color,
                  borderRadius: '100px',
                  boxShadow: `0 0 8px ${color}`,
                  animationDuration: `${duration}s`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              />
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
