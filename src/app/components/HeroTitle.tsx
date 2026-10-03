'use client';

import type { CSSProperties, ReactNode } from 'react';

// Hero headline. Deliberately static for now — no entrance animation, no
// decorative rule. "\n" in the text forces a line break.
export default function HeroTitle({ text, style }: { text: ReactNode; delay?: number; style?: CSSProperties }) {
  if (typeof text !== 'string') return <h1 style={style}>{text}</h1>;
  return (
    <h1 style={style}>
      {text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
    </h1>
  );
}
