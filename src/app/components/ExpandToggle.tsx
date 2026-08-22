'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Reusable expand/collapse trigger — a plain button (never a link/href),
// since it's for revealing more content on the same page, not navigating
// anywhere. Quiet underline-draw hover matching WordLink — the chevron
// just flips 180° to show open/closed state, no extra decoration.
export default function ExpandToggle({
  expanded,
  onClick,
  openLabel,
  closeLabel = 'Show Less',
  style,
}: {
  expanded: boolean;
  onClick: () => void;
  openLabel: string;
  closeLabel?: string;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-1.5"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#8D694B',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        ...style,
      }}
    >
      <span style={{ position: 'relative' }}>
        {expanded ? closeLabel : openLabel}
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-3px',
            width: '100%',
            height: '1.5px',
            backgroundColor: '#8D694B',
            transform: hovered ? 'scaleX(1)' : 'scaleX(0.4)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
          }}
        />
      </span>
      <motion.span
        animate={{ rotate: expanded ? 180 : 0, y: hovered ? 2 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ display: 'inline-flex' }}
      >
        <ChevronDown size={13} strokeWidth={2} />
      </motion.span>
    </button>
  );
}
