'use client';

import Image from 'next/image';
import { useState } from 'react';

// Drop-in replacement for the old `<div style={{ backgroundImage: url(...) }} />`
// pattern used across the site. CSS background-images are never lazy-loaded
// by the browser — every one of those divs downloaded immediately regardless
// of scroll position. A real <img> (via next/image) gets native lazy
// loading for free. Also replaces the flat accent-color loading fallback
// with a blur-then-sharpen reveal once the image actually loads.
export default function CoverImage({
  src,
  alt = '',
  className = '',
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      onLoad={() => setLoaded(true)}
      className={`object-cover ${className}`}
      style={{
        backgroundColor: 'rgba(109,103,83,0.06)',
        filter: loaded ? 'blur(0px)' : 'blur(16px)',
        transition: 'filter 0.6s ease',
      }}
    />
  );
}
