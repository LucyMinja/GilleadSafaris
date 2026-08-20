'use client';

import type { ReactNode } from 'react';
import RevealOnView from './RevealOnView';

// Plain in-flow fade-in, no artificial extra scroll height and no sticky
// pin. The earlier pin-and-hold version kept leaving real empty space
// before the content below it (wrapper height never quite matched content
// height across breakpoints) — this can't leave empty space because there's
// no artificial space added at all; the section is exactly as tall as its
// content, same as everywhere else on the site that works reliably.
export default function PinHeader({ children }: { children: ReactNode }) {
  return (
    <RevealOnView
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      duration={0.5}
      margin="-60px"
      className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-8 text-center"
    >
      {children}
    </RevealOnView>
  );
}
