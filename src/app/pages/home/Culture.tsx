'use client';

import Link from 'next/link';
import CoverImage from '@/app/components/CoverImage';
import WordLink from '@/app/components/WordLink';
import { sections } from '../culture/data';
import RevealOnView from './RevealOnView';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// A taste of the Culture page — Maasai, Stone Town and Conservation, pulled
// straight from the Culture page's own data so the copy lives in one place.
// Each card jumps to its full section there. The Hadzabe story is left out
// on purpose: there's no real photo of the community yet, and its stand-in
// image (an ostrich) would read as a caption for the people on a card.
const stories = sections.filter((s) => [1, 2, 4].includes(s.id));

export default function Culture() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: '#F1EAE0' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-6 mb-12 lg:mb-14 lg:items-end">
          <h2 className="lg:col-span-5" style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(30px, 3.6vw, 46px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15 }}>
            The people behind the places
          </h2>
          <p className="lg:col-span-6 lg:col-start-7" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753' }}>
            A safari here isn't only wildlife. It's a morning with Maasai herders, an afternoon in Stone Town's carved-door alleys, and parks where people and wildlife have shared the land for generations. We arrange each visit directly with the community you meet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <RevealOnView
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              duration={0.8}
              delay={i * 0.1}
              ease={EASE}
              once={false}
              margin="-80px"
            >
              <Link href={`/culture#culture-${s.id}`} className="group block" style={{ textDecoration: 'none' }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', borderRadius: '4px' }}>
                  <CoverImage src={s.img} alt={s.title} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E9C99A', marginBottom: '10px' }}>
                      {s.sub}
                    </p>
                    <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '24px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2, marginBottom: '10px' }}>
                      {s.title.split(' — ')[0]}
                    </h3>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', lineHeight: 1.6, color: 'rgba(255,255,255,0.88)' }}>
                      {s.quote}
                    </p>
                  </div>
                </div>
              </Link>
            </RevealOnView>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <WordLink href="/culture">Explore Culture &amp; Heritage</WordLink>
        </div>
      </div>
    </section>
  );
}
