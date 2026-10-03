'use client';

import { useEffect, useState } from 'react';

// Homepage background video, self-hosted and compressed (was a 53 MB 4K
// stream from Pexels). The 124 KB poster shows immediately; the video is
// only attached after the page has loaded, at 768px on phones (1.1 MB) or
// 1280px elsewhere (3.7 MB). Visitors who ask for reduced motion or data
// saving just keep the poster.
const POSTER = '/video/hero-poster.webp';

export default function HeroVideo() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const pick = () => setSrc(window.innerWidth < 768 ? '/video/hero-768.mp4' : '/video/hero-1280.mp4');
    if (document.readyState === 'complete') pick();
    else window.addEventListener('load', pick, { once: true });
    return () => window.removeEventListener('load', pick);
  }, []);

  return (
    <video
      key={src ?? 'poster'}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={POSTER}
      src={src ?? undefined}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ backgroundColor: '#4E493A' }}
    />
  );
}
