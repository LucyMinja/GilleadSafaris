'use client';

import type { CSSProperties, ReactNode } from 'react';

// Hero headline with an "ink-in" entrance: the words first appear as a fine
// white outline, then fill with solid white (see .hero-ink in globals.css).
// "\n" in the text forces a line break.
export default function HeroTitle({ text, style }: { text: ReactNode; style?: CSSProperties }) {
  return (
    <h1 className="hero-ink" style={style}>
      {typeof text === 'string'
        ? text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)
        : text}
    </h1>
  );
}
