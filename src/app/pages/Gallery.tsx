'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { id: 1, img: 'https://images.unsplash.com/photo-1464265686870-195dff2c55a0?w=800&h=600&fit=crop&auto=format', category: 'Wildlife', caption: 'Lion pride at dawn, Serengeti' },
  { id: 2, img: 'https://images.unsplash.com/photo-1728042107033-76b13feac547?w=800&h=1000&fit=crop&auto=format', category: 'Landscapes', caption: 'Giraffe silhouette at golden hour' },
  { id: 3, img: 'https://images.unsplash.com/photo-1430514625417-38e9c79c95c8?w=800&h=600&fit=crop&auto=format', category: 'Wildlife', caption: 'Cheetah in pursuit, Masai Mara' },
  { id: 4, img: 'https://images.unsplash.com/photo-1629290439635-80e8740a0c7d?w=800&h=1000&fit=crop&auto=format', category: 'Landscapes', caption: 'Mount Kilimanjaro at sunrise' },
  { id: 5, img: 'https://images.unsplash.com/photo-1741850821140-cbf6be551828?w=800&h=600&fit=crop&auto=format', category: 'Wildlife', caption: 'Lions and buffalo standoff' },
  { id: 6, img: 'https://images.unsplash.com/photo-1694860950114-0979b01c2615?w=800&h=600&fit=crop&auto=format', category: 'Zanzibar', caption: 'Traditional dhow, Zanzibar coast' },
  { id: 7, img: 'https://images.unsplash.com/photo-1741850820115-cc94b3bf8175?w=800&h=600&fit=crop&auto=format', category: 'Wildlife', caption: 'Elephant herd at Tarangire waterhole' },
  { id: 8, img: 'https://images.unsplash.com/photo-1517001170041-70a5966d5402?w=800&h=600&fit=crop&auto=format', category: 'Experiences', caption: 'Hot air balloon over the Serengeti plains' },
  { id: 9, img: 'https://images.unsplash.com/photo-1706611217212-c8f509f53a02?w=800&h=1000&fit=crop&auto=format', category: 'Accommodation', caption: 'Desert tented camp, luxury in the wild' },
  { id: 10, img: 'https://images.unsplash.com/photo-1673667618335-face21a8b1a8?w=800&h=600&fit=crop&auto=format', category: 'Wildlife', caption: 'Great Wildebeest Migration' },
  { id: 11, img: 'https://images.unsplash.com/photo-1580689402180-61f1ab9d6232?w=800&h=600&fit=crop&auto=format', category: 'Culture', caption: 'Maasai warriors in traditional dress' },
  { id: 12, img: 'https://images.unsplash.com/photo-1623743423143-23df3234ae5c?w=800&h=600&fit=crop&auto=format', category: 'Landscapes', caption: 'Acacia silhouettes at dusk' },
  { id: 13, img: 'https://images.unsplash.com/photo-1603703199669-a45d36f54918?w=800&h=600&fit=crop&auto=format', category: 'Landscapes', caption: 'Mountain silhouette at twilight' },
  { id: 14, img: 'https://images.unsplash.com/photo-1516109829485-81f3640777bb?w=800&h=1000&fit=crop&auto=format', category: 'Wildlife', caption: 'Lioness portrait, Ngorongoro Crater' },
  { id: 15, img: 'https://images.unsplash.com/photo-1741850826374-234124a31bf2?w=800&h=1000&fit=crop&auto=format', category: 'Accommodation', caption: 'Tented camp at twilight' },
  { id: 16, img: 'https://images.unsplash.com/photo-1616145306407-07b1ac571ee4?w=800&h=600&fit=crop&auto=format', category: 'Zanzibar', caption: 'Zanzibar beach, Indian Ocean' },
  { id: 17, img: 'https://images.unsplash.com/photo-1765706727592-e9309fbb210a?w=800&h=600&fit=crop&auto=format', category: 'Landscapes', caption: 'Giraffe at sunset, African plains' },
  { id: 18, img: 'https://images.unsplash.com/photo-1741850820302-64d2d4b9370e?w=800&h=1000&fit=crop&auto=format', category: 'Experiences', caption: 'Morning game drive vehicle' },
  { id: 19, img: 'https://images.unsplash.com/photo-1776610796148-47b53bcdfb98?w=800&h=600&fit=crop&auto=format', category: 'Wildlife', caption: 'Zebras beneath the acacia, Serengeti' },
  { id: 20, img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&h=600&fit=crop&auto=format', category: 'Landscapes', caption: 'Serengeti plains - the endless expanse' },
  { id: 21, img: 'https://images.unsplash.com/photo-1741850821329-95a6db240037?w=800&h=1000&fit=crop&auto=format', category: 'Wildlife', caption: 'African elephant close-up portrait' },
  { id: 22, img: 'https://images.unsplash.com/photo-1580867604157-92950a0a9daa?w=800&h=600&fit=crop&auto=format', category: 'Wildlife', caption: 'Lioness on the Serengeti dust' },
  { id: 23, img: 'https://images.unsplash.com/photo-1723643750330-c868b56af36f?w=800&h=600&fit=crop&auto=format', category: 'Experiences', caption: 'Sundowner gathering in the bush' },
  { id: 24, img: 'https://images.unsplash.com/photo-1761681362936-180b3f6874af?w=800&h=600&fit=crop&auto=format', category: 'Landscapes', caption: 'African sunrise over the savanna' },
];

const videos = [
  { id: 1, thumb: 'https://images.unsplash.com/photo-1517001170041-70a5966d5402?w=800&h=450&fit=crop&auto=format', title: 'The Great Migration', duration: '4:32', url: 'https://www.youtube.com/embed/iIFumaXeWoA?autoplay=1' },
  { id: 2, thumb: 'https://images.unsplash.com/photo-1603703199669-a45d36f54918?w=800&h=450&fit=crop&auto=format', title: 'Serengeti at Sunrise', duration: '3:15', url: 'https://www.youtube.com/embed/DWBdHNJaugo?autoplay=1' },
  { id: 3, thumb: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&h=450&fit=crop&auto=format', title: 'A Day on Safari', duration: '6:48', url: 'https://www.youtube.com/embed/iqXKQf2BOSE?autoplay=1' },
];

const categories = ['All', 'Wildlife', 'Landscapes', 'Accommodation', 'Culture', 'Zanzibar', 'Experiences'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<(typeof photos)[0] | null>(null);
  const [videoModal, setVideoModal] = useState<(typeof videos)[0] | null>(null);
  const heroRef = useRef<HTMLElement>(null);
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
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const filtered = activeCategory === 'All' ? photos : photos.filter((p) => p.category === activeCategory);

  const lightboxIdx = lightboxPhoto ? filtered.indexOf(lightboxPhoto) : -1;

  const goNext = () => {
    if (lightboxIdx < filtered.length - 1) setLightboxPhoto(filtered[lightboxIdx + 1]);
  };
  const goPrev = () => {
    if (lightboxIdx > 0) setLightboxPhoto(filtered[lightboxIdx - 1]);
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', fontFamily: "'Lato', sans-serif" }}>
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>Visual Stories</p>
            <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}>
              Gallery
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '480px', margin: '0 auto' }}>
              Twenty-four moments from Tanzania's most extraordinary wildlife and landscapes.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Video section */}
      <section className="px-6 lg:px-16 py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '16px' }}>Visual Stories</p>
        <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: '#1a1a1a', marginBottom: '32px' }}>Safari Films</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, vi) => (
            <motion.div
              key={video.id}
              className="group cursor-pointer overflow-hidden"
              style={{ borderRadius: '14px', boxShadow: '0 4px 28px rgba(0,0,0,0.08)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: vi * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setVideoModal(video)}
            >
              <div
                className="relative overflow-hidden"
                style={{ height: '220px' }}
              >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${video.thumb})`, backgroundColor: '#8a694f' }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 border-2 border-white/70 rounded-full flex items-center justify-center group-hover:border-[#d3ba8b] group-hover:bg-[#d3ba8b]/20 transition-all">
                      <Play size={20} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5" style={{ backgroundColor: '#ffffff' }}>
                  <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '16px', fontWeight: 300, color: '#1a1a1a' }}>{video.title}</p>
                </div>
              </motion.div>
          ))}
        </div>
      </section>

      {/* Photo gallery */}
      <section className="px-6 lg:px-16 py-12" style={{ backgroundColor: '#faf7f4' }}>
        {/* Filter */}
        <div
          className="sticky top-[88px] z-30 overflow-x-auto mb-10 -mx-6 lg:-mx-16"
          style={{ backgroundColor: '#ffffff', borderBottom: '1px solid rgba(138,105,79,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', scrollbarWidth: 'none' } as React.CSSProperties}
        >
          <div className="flex items-stretch justify-center" style={{ minWidth: 'max-content', width: '100%', height: '60px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={(e) => { handleTabClick(cat); (e.currentTarget as HTMLButtonElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }}
                className="relative shrink-0 flex items-center px-8"
                onMouseEnter={() => setHoveredTab(cat)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: activeCategory === cat ? 700 : 400,
                  fontFamily: "'Lato', sans-serif",
                  color: activeCategory === cat ? '#8a694f' : hoveredTab === cat ? '#8a694f' : 'rgba(44,24,16,0.65)',
                  backgroundColor: hoveredTab === cat && activeCategory !== cat ? 'rgba(138,105,79,0.07)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease, background-color 0.2s ease',
                }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="tab-indicator-gallery"
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: '2.5px', backgroundColor: '#8a694f', borderRadius: '2px 2px 0 0' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style grid */}
        <div ref={contentRef} className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="break-inside-avoid cursor-pointer group overflow-hidden relative"
              style={{ borderRadius: '12px', boxShadow: '0 3px 16px rgba(0,0,0,0.08)' }}
              onClick={() => setLightboxPhoto(photo)}
            >
              <img
                src={photo.img}
                alt={photo.caption}
                className="w-full block transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: '#8a694f' }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Photo lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxPhoto(null)}
          >
            <button className="absolute top-4 right-4 text-[#7A5C45] hover:text-white p-2" onClick={() => setLightboxPhoto(null)}>
              <X size={24} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A5C45] hover:text-white p-2 disabled:opacity-20"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              disabled={lightboxIdx === 0}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A5C45] hover:text-white p-2 disabled:opacity-20"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              disabled={lightboxIdx === filtered.length - 1}
            >
              <ChevronRight size={32} />
            </button>
            <div className="max-w-5xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
              <img src={lightboxPhoto.img.replace('w=800', 'w=1400')} alt={lightboxPhoto.caption} className="max-h-[80vh] w-auto mx-auto object-contain" />
              <p className="text-center text-[#7A5C45] mt-4" style={{ fontSize: '13px', fontStyle: 'italic' }}>{lightboxPhoto.caption}</p>
              <p className="text-center text-[#B09070] mt-1" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{lightboxPhoto.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setVideoModal(null)}
          >
            <button className="absolute top-4 right-4 text-[#7A5C45] hover:text-white p-2">
              <X size={24} />
            </button>
            <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={videoModal.url}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={videoModal.title}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
