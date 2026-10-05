'use client';

import type { CSSProperties, ReactNode } from 'react';

// Hero headline with an "sunrise sweep": a band of light crosses the words
// (see .hero-sweep in globals.css).
// "\n" in the text forces a line break.
export default function HeroTitle({ text, style }: { text: ReactNode; style?: CSSProperties }) {
  return (
    <h1 className="hero-sweep" style={style}>
      {typeof text === 'string'
        ? text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)
        : text}
    </h1>
  );
}
