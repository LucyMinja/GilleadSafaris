'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, MapPin, Clock, Maximize2 } from 'lucide-react';

const destinations = [
  {
    id: 1,
    slug: 'serengeti',
    name: 'Serengeti National Park',
    region: 'Northern Tanzania',
    tag: 'Most Visited',
    heroImg: '/images/956A4274.jpg',
    desc: "The world's greatest wildlife spectacle. Witness the Great Migration as over 1.5 million wildebeest thunder across the endless golden plains in search of rain-fed pasture.",
    highlights: ['Great Migration', 'Big Five', 'Hot Air Balloon', 'Endless Plains'],
    bestTime: 'June – October',
    size: '14,763 km²',
    animals: 'Lion · Cheetah · Leopard · Elephant · Buffalo',
    category: 'Safari',
  },
  {
    id: 2,
    slug: 'ngorongoro',
    name: 'Ngorongoro Conservation Area',
    region: 'Northern Tanzania',
    tag: 'UNESCO World Heritage',
    heroImg: '/images/956A3279.jpg',
    desc: "Descend into the world's largest intact volcanic caldera, a self-contained Eden teeming with wildlife at extraordinary density. The crater floor is a guaranteed Big Five encounter.",
    highlights: ['Volcanic Crater', 'Big Five', 'Black Rhino', 'Maasai Culture'],
    bestTime: 'Year-round',
    size: '8,292 km²',
    animals: 'Black Rhino · Lion · Elephant · Hippo · Flamingo',
    category: 'Safari',
  },
  {
    id: 3,
    slug: 'zanzibar',
    name: 'Zanzibar Archipelago',
    region: 'Indian Ocean Islands',
    tag: 'Beach & Culture',
    heroImg: '/images/nakupenda beachh.jpg',
    desc: 'An ancient spice island of white-sand beaches and turquoise waters. The UNESCO-listed Stone Town blends Arab, Indian, and African cultures into an intoxicating mosaic.',
    highlights: ['Stone Town', 'Spice Tours', 'Diving', 'Dolphin Watching'],
    bestTime: 'June – October',
    size: '2,643 km²',
    animals: 'Humpback Whale · Dolphin · Sea Turtle · Colobus Monkey',
    category: 'Beach',
  },
  {
    id: 4,
    slug: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    region: 'Northeastern Tanzania',
    tag: "Africa's Highest Peak",
    heroImg: '/images/kili.png',
    desc: 'The roof of Africa at 5,895 metres. Six distinct ecological zones from tropical rainforest to arctic summit make Kilimanjaro a unique trekking adventure unlike any other.',
    highlights: ['Uhuru Peak', 'Glaciers', 'Lemosho Route', 'Machame Route'],
    bestTime: 'Jan – Mar, Jun – Oct',
    size: '756 km²',
    animals: 'Colobus Monkey · Buffalo · Elephant · Leopard · Eagle',
    category: 'Trekking',
  },
  {
    id: 5,
    slug: 'tarangire',
    name: 'Tarangire National Park',
    region: 'Northern Tanzania',
    tag: 'Elephant Paradise',
    heroImg: '/images/elephantsafari.png',
    desc: 'Ancient baobab trees and the largest elephant herds in Tanzania. The Tarangire River is a lifeline attracting thousands of animals during the dry season.',
    highlights: ['Ancient Baobabs', 'Elephant Herds', 'Tree-Climbing Lions', 'Night Drives'],
    bestTime: 'June – October',
    size: '2,850 km²',
    animals: 'Elephant · Greater Kudu · Oryx · Wildebeest · Zebra',
    category: 'Safari',
  },
  {
    id: 6,
    slug: '',
    name: 'Lake Manyara National Park',
    region: 'Northern Tanzania',
    tag: 'Tree-Climbing Lions',
    heroImg: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1200&h=800&fit=crop&auto=format',
    desc: 'Famous for its tree-climbing lions and flamingo-fringed soda lake. A compact yet spectacular park that rewards visitors with extraordinary wildlife encounters.',
    highlights: ['Tree-Climbing Lions', 'Pink Flamingo', 'Treetop Walkway', 'Hot Springs'],
    bestTime: 'June – October',
    size: '648 km²',
    animals: 'Tree-Climbing Lion · Flamingo · Hippo · Elephant · Blue Monkey',
    category: 'Safari',
  },
  {
    id: 7,
    slug: '',
    name: 'Ruaha National Park',
    region: 'Southern Tanzania',
    tag: 'Off the Beaten Path',
    heroImg: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=800&fit=crop&auto=format',
    desc: "Tanzania's largest national park and best-kept secret. Rugged landscapes, the Great Ruaha River, and an astonishing density of wildlife with virtually no other visitors.",
    highlights: ['Wild Dogs', 'Huge Lion Prides', 'Remote Walks', 'No Crowds'],
    bestTime: 'June – November',
    size: '22,000 km²',
    animals: 'African Wild Dog · Lion · Elephant · Hippo · Sable Antelope',
    category: 'Safari',
  },
  {
    id: 8,
    slug: '',
    name: 'Selous Game Reserve',
    region: 'Southern Tanzania',
    tag: "Africa's Largest Reserve",
    heroImg: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&h=800&fit=crop&auto=format',
    desc: 'A UNESCO World Heritage Site the size of Switzerland. Boat safaris along the Rufiji River reveal hippos, crocodiles, and prolific birdlife alongside extraordinary big game.',
    highlights: ['Boat Safaris', 'Walking Safaris', 'Wild Dogs', 'Rufiji River'],
    bestTime: 'June – October',
    size: '54,600 km²',
    animals: 'African Wild Dog · Hippo · Crocodile · Elephant · Lion',
    category: 'Safari',
  },
  {
    id: 9,
    slug: 'arusha',
    name: 'Arusha National Park',
    region: 'Northern Tanzania',
    tag: 'Day Trip from Arusha',
    heroImg: '/images/colobusmonkey.png',
    desc: "Just 37km from Arusha town, this compact park combines game drives with walking safaris around Ngurdoto Crater, the seven Momella Lakes, and the slopes of Mount Meru — with Kilimanjaro visible on clear days.",
    highlights: ['Ngurdoto Crater', 'Momella Lakes', 'Mount Meru Climb', 'Walking Safaris'],
    bestTime: 'October – April (birding)',
    size: '137 km²',
    animals: 'Colobus Monkey · Giraffe · Buffalo · Hippo · Flamingo',
    category: 'Safari',
  },
];

const categories = ['All', 'Safari', 'Beach', 'Trekking'];

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
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

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter((d) => d.category === activeCategory);

  return (
    <div style={{ backgroundColor: '#FFFFFF', fontFamily: "'Lato', sans-serif" }}>

      {/* Page hero */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)' }} />
        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>Explore Tanzania</p>
            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#FFFFFF', marginBottom: '20px' }}>
              Destinations
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '520px', margin: '0 auto', fontWeight: 300 }}>
              Nine extraordinary places where wildlife, landscape, and culture converge into experiences that transform the way you see the world.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Filter tabs */}
      <div
        className="sticky top-[88px] z-30 overflow-x-auto"
        style={{ backgroundColor: '#ffffff', borderBottom: '1px solid rgba(138,105,79,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', scrollbarWidth: 'none' } as React.CSSProperties}
      >
        <div className="flex items-stretch justify-center w-full" style={{ height: '60px' }}>
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
                  layoutId="tab-indicator-destinations"
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: '2.5px', backgroundColor: '#8a694f', borderRadius: '2px 2px 0 0' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Destination list */}
      <div ref={contentRef} className="py-20">
        <div className="flex flex-col">
          {filtered.map((dest, i) => {
            const isReverse = i % 2 === 1;
            const textBg = i % 2 === 0 ? '#faf7f4' : '#ffffff';
            return (
              <motion.article
                key={dest.id}
                id={dest.name.split(' ')[0].toLowerCase()}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className={`group relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                style={{ backgroundColor: textBg, minHeight: 'auto' }}
              >
                {/* Photo side — diagonal clip */}
                <div
                  className="destination-photo-panel relative w-full lg:w-[50%] min-h-[300px] lg:min-h-[560px] flex-shrink-0 overflow-hidden"
                  style={{
                    clipPath: isReverse
                      ? 'polygon(160px 0, 100% 0, 100% 100%, 0 100%)'
                      : 'polygon(0 0, 100% 0, calc(100% - 160px) 100%, 0 100%)',
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${dest.heroImg})`, backgroundColor: '#d3ba8b' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.3) 100%)' }} />
                </div>

                {/* Text side */}
                <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:py-20 lg:px-[6vw]">
                  <div style={{ maxWidth: '460px', width: '100%' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1.5" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d3ba8b' }}>
                        <MapPin size={10} strokeWidth={1.5} /> {dest.region}
                      </div>
                      <span style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a694f', backgroundColor: 'rgba(138,105,79,0.1)', padding: '3px 10px', borderRadius: '100px', fontWeight: 600 }}>
                        {dest.tag}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "'DM Serif Display', Georgia, sans-serif", fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 300, color: '#1a1a1a', marginBottom: '18px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                      {dest.name}
                    </h2>
                    <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#5a5047', marginBottom: '28px', fontWeight: 300 }}>
                      {dest.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-8">
                      {dest.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2" style={{ fontSize: '12px', color: '#8a694f' }}>
                          <div style={{ width: '4px', height: '4px', backgroundColor: '#d3ba8b', borderRadius: '50%', flexShrink: 0 }} />
                          {h}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-5 mb-8" style={{ fontSize: '11px', color: '#888888' }}>
                      <div className="flex items-center gap-1.5">
                        <Clock size={11} strokeWidth={1.5} />
                        <span>{dest.bestTime}</span>
                      </div>
                      <span style={{ color: '#e0d4c8' }}>·</span>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 size={11} strokeWidth={1.5} />
                        <span>{dest.size}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {dest.slug && (
                        <Link
                          href={`/destinations/${dest.slug}`}
                          className="btn-primary"
                        >
                          Read the Story <ArrowUpRight size={11} strokeWidth={1.5} />
                        </Link>
                      )}
                      <Link href="/booking" className="btn-secondary">
                        Plan a Safari Here
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: '#FAF7F0', borderTop: '1px solid #F0E8DC' }} className="py-20 px-6 lg:px-20 text-center">
        <p style={{ fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '24px' }}>Ready to Go?</p>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, color: '#000000', marginBottom: '16px' }}>
          Let us plan your <em>perfect safari</em>
        </h2>
        <p style={{ fontSize: '15px', color: '#9D8070', marginBottom: '32px', fontWeight: 300 }}>
          Our Arusha-based team knows every park and trail. Get in touch today.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/booking" className="btn-primary">
            Start Planning <ArrowUpRight size={12} strokeWidth={1.5} />
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
