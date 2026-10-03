'use client';

import { useState } from 'react';
import PageHero from '@/app/components/PageHero';
import { photos, type Photo } from './gallery/data';
import PhotoGrid from './gallery/PhotoGrid';
import Lightbox from './gallery/Lightbox';

export default function Gallery() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const lightboxIdx = lightboxPhoto ? photos.indexOf(lightboxPhoto) : -1;

  const goNext = () => {
    if (lightboxIdx < photos.length - 1) setLightboxPhoto(photos[lightboxIdx + 1]);
  };
  const goPrev = () => {
    if (lightboxIdx > 0) setLightboxPhoto(photos[lightboxIdx - 1]);
  };

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Gallery"
        subtitle="Real moments from Tanzania's most extraordinary wildlife and landscapes."
        image="/images/px-misty-giraffe.jpg"
        imagePosition="center 28%"
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-16 text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.01em' }}>
          Proof, not promises
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          A lion mid-yawn, an island seen from above, a market at dawn — nothing staged, nothing borrowed. This is the Tanzania you're actually signing up for.
        </p>
      </div>

      <PhotoGrid photos={photos} onSelect={setLightboxPhoto} />
      <Lightbox
        photo={lightboxPhoto}
        index={lightboxIdx}
        total={photos.length}
        onClose={() => setLightboxPhoto(null)}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
