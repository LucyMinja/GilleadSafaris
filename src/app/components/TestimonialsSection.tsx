'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'United States',
    image: 'https://images.unsplash.com/photo1667550469774295fd6849afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxNYWFzYWklMjBwZW9wbGUlMjBjdWx0dXJlJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb4.1.0&q=80&w=1080',
    rating: 5,
    tour: 'Great Migration Safari',
    testimonial: 'Absolutely incredible experience! The team at Gilleads Safaris made our dream safari come true. We witnessed the wildebeest migration up close and saw all of the Big Five. Our guide was knowledgeable, patient, and passionate about wildlife conservation.',
  },
  {
    name: 'Michael Chen',
    location: 'Singapore',
    image: 'https://images.unsplash.com/photo15213883166936a0e8d6f2327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxNYWFzYWklMjBwZW9wbGUlMjBjdWx0dXJlJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb4.1.0&q=80&w=1080',
    rating: 5,
    tour: 'Kilimanjaro Climbing',
    testimonial: 'Summiting Kilimanjaro was the achievement of a lifetime. The guides were experienced and ensured our safety every step of the way. The camping equipment was topnotch, and the support team was amazing. Highly recommend!',
  },
  {
    name: 'Emma & James Wilson',
    location: 'United Kingdom',
    image: 'https://images.unsplash.com/photo161643965969276fe2189b287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxaYW56aWJhciUyMGJlYWNoJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcwfDA&ixlib=rb4.1.0&q=80&w=1080',
    rating: 5,
    tour: 'Safari & Beach Paradise',
    testimonial: 'The perfect combination of adventure and relaxation! Four days of incredible wildlife viewing followed by five days on the pristine beaches of Zanzibar. Every detail was perfectly planned and executed. We can\'t wait to return!',
  },
  {
    name: 'Hans Mueller',
    location: 'Germany',
    image: 'https://images.unsplash.com/photo1528275286191fa6d2ec8298e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxNYWFzYWklMjBwZW9wbGUlMjBjdWx0dXJlJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcxfDA&ixlib=rb4.1.0&q=80&w=1080',
    rating: 5,
    tour: 'Photography Safari',
    testimonial: 'As a professional photographer, I had high expectations. Gilleads exceeded them all! We visited locations at golden hour, the guide understood photography needs, and I captured shots I only dreamed of. The portfolio from this trip is stunning.',
  },
  {
    name: 'The Anderson Family',
    location: 'Australia',
    image: 'https://images.unsplash.com/photo16948609501140979b01c2615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxaYW56aWJhciUyMGJlYWNoJTIwVGFuemFuaWF8ZW58MXx8fHwxNzgwODU2NDcwfDA&ixlib=rb4.1.0&q=80&w=1080',
    rating: 5,
    tour: 'Family Safari Adventure',
    testimonial: 'Traveling with kids (ages 7 and 10) can be challenging, but Gilleads made it seamless. Childfriendly accommodations, flexible schedules, and educational programs kept our children engaged and excited. Best family vacation ever!',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#1A1208] to-[#1A1208]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-[#e8d4b8]">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-[#d4a574] max-w-3xl mx-auto">
            Real experiences from real adventurers who trusted us with their African safari dreams
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="bg-[#2C1810] rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <Quote className="w-16 h-16 text-[#d4a574]/30 mb-6" />

                <div className="flex mb-6">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-[#d4a574] text-[#d4a574]" />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-[#e8d4b8] mb-8 leading-relaxed">
                  "{testimonials[currentIndex].testimonial}"
                </p>

                <div className="flex items-center space-x-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#d4a574]">
                    <ImageWithFallback
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xl text-[#e8d4b8]">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-[#d4a574]">
                      {testimonials[currentIndex].location}
                    </div>
                    <div className="text-[#8b6f47] text-sm">
                      {testimonials[currentIndex].tour}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#d4a574] hover:bg-[#c49563] text-[#1e1e22] p-4 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-12 bg-[#d4a574]' : 'w-2 bg-[#8b6f47] hover:bg-[#d4a574]/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              className="bg-[#d4a574] hover:bg-[#c49563] text-[#1e1e22] p-4 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-[#2C1810]/60 rounded-2xl">
            <div className="text-4xl text-[#d4a574] mb-2">4.9/5</div>
            <div className="text-[#e8d4b8]">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-[#2C1810]/60 rounded-2xl">
            <div className="text-4xl text-[#d4a574] mb-2">500+</div>
            <div className="text-[#e8d4b8]">Reviews</div>
          </div>
          <div className="text-center p-6 bg-[#2C1810]/60 rounded-2xl">
            <div className="text-4xl text-[#d4a574] mb-2">98%</div>
            <div className="text-[#e8d4b8]">Would Recommend</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
