'use client';

import { useState, useRef } from 'react';
import PageHero from '@/app/components/PageHero';
import { photos, type Photo, type Video } from './gallery/data';
import VideoSection from './gallery/VideoSection';
import PhotoGrid from './gallery/PhotoGrid';
import Lightbox from './gallery/Lightbox';
import VideoModal from './gallery/VideoModal';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [videoModal, setVideoModal] = useState<Video | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (cat: string) => {
    setActiveCategory(cat);
    setTimeout(() => {
      if (contentRef.current) {
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 0);
  };

  const filtered = activeCategory === 'All' ? photos : photos.filter((p) => p.category === activeCategory);
  const lightboxIdx = lightboxPhoto ? filtered.indexOf(lightboxPhoto) : -1;

  const goNext = () => {
    if (lightboxIdx < filtered.length - 1) setLightboxPhoto(filtered[lightboxIdx + 1]);
  };
  const goPrev = () => {
    if (lightboxIdx > 0) setLightboxPhoto(filtered[lightboxIdx - 1]);
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        eyebrow="Visual Stories"
        title="Gallery"
        subtitle="Twenty-four moments from Tanzania's most extraordinary wildlife and landscapes."
      />
      <VideoSection onSelect={setVideoModal} />
      <PhotoGrid
        contentRef={contentRef}
        activeCategory={activeCategory}
        filtered={filtered}
        onTabClick={handleTabClick}
        onSelect={setLightboxPhoto}
      />
      <Lightbox
        photo={lightboxPhoto}
        index={lightboxIdx}
        total={filtered.length}
        onClose={() => setLightboxPhoto(null)}
        onPrev={goPrev}
        onNext={goNext}
      />
      <VideoModal video={videoModal} onClose={() => setVideoModal(null)} />
    </div>
  );
}
