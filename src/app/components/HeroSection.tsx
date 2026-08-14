'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1751813233354-0e46f0b20591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxBZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHMlMjBsaW9ucyUyMGdpcmFmZmVzfGVufDF8fHx8MTc4MDg1NjQ2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Experience the Great Migration',
    subtitle: 'Witness nature\'s greatest spectacle in the Serengeti',
    cta: 'Explore Safaris',
  },
  {
    image: 'https://images.unsplash.com/photo-1511965675262-c4e1e6ac3f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb3VudCUyMEtpbGltYW5qYXJvJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Conquer Mount Kilimanjaro',
    subtitle: 'Summit Africa\'s highest peak — an adventure of a lifetime',
    cta: 'View Climbing Tours',
  },
  {
    image: 'https://images.unsplash.com/photo-1620896712848-d05411ec91ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxaYW56aWJhciUyMGJlYWNoJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Paradise in Zanzibar',
    subtitle: 'Pristine beaches and rich cultural heritage await',
    cta: 'Discover Zanzibar',
  },
  {
    image: 'https://images.unsplash.com/photo-1591290689629-8ad3a992b3b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWFzYWklMjBwZW9wbGUlMjBjdWx0dXJlJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Maasai Cultural Experience',
    subtitle: 'Immerse yourself in authentic traditions and heritage',
    cta: 'Cultural Tours',
  },
];

const SLIDE_DURATION = 6000;
const easeSmooth = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (paused) return;
    startRef.current = Date.now();
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      startRef.current = Date.now();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused, currentSlide]);

  const goTo = (index: number) => {
    setCurrentSlide((index + heroSlides.length) % heroSlides.length);
    startRef.current = Date.now();
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-[#1A1208]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: easeSmooth }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full overflow-hidden">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1.1, ease: 'linear' }}
              className="h-full w-full"
            >
              <ImageWithFallback
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Text overlay — persists across slides, only its content crossfades */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`eyebrow-${currentSlide}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: easeSmooth }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <MapPin className="w-6 h-6 text-[#d4a574]" />
              <span className="text-[#e8d4b8] uppercase tracking-widest text-sm">Tanzania, East Africa</span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: easeSmooth, delay: 0.05 }}
              className="text-5xl md:text-7xl lg:text-8xl mb-6 text-[#e8d4b8]"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: easeSmooth, delay: 0.1 }}
              className="text-xl md:text-2xl lg:text-3xl mb-10 text-[#d4a574]"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.button
              key={`cta-${currentSlide}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: easeSmooth, delay: 0.15 }}
              whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(212,165,116,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#d4a574] hover:bg-[#c49563] text-[#1e1e22] px-10 py-4 rounded-full text-lg shadow-lg"
            >
              {heroSlides[currentSlide].cta}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goTo(currentSlide - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={() => goTo(currentSlide + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Indicators with autoplay progress */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="relative h-2 w-12 rounded-full overflow-hidden bg-white/30"
          >
            {index === currentSlide && (
              <motion.span
                key={`progress-${currentSlide}-${paused}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? undefined : 1 }}
                transition={paused ? { duration: 0 } : { duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                className="absolute inset-0 bg-[#d4a574] origin-left"
                style={{ transformOrigin: 'left' }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
