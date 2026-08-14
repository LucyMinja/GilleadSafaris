'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { MapPin, Star, X, ArrowRight } from 'lucide-react';

type Lodge = {
  id: number;
  name: string;
  type: string;
  location: string;
  category: string;
  price: string;
  rating: number;
  img: string;
  img2: string;
  desc: string;
  amenities: string[];
  highlight: string;
  bestFor: string[];
  season: string;
};

const lodges: Lodge[] = [
  {
    id: 1,
    name: 'Serengeti Horizon Camp',
    type: 'Luxury Tented Camp',
    location: 'Central Serengeti',
    category: 'Tented Camps',
    price: 'From $680/night',
    rating: 5.0,
    img: 'https://images.unsplash.com/photo-1706611217212-c8f509f53a02?w=1200&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1741850826374-234124a31bf2?w=900&h=600&fit=crop&auto=format',
    desc: 'Sixteen spacious canvas tents with uninterrupted Serengeti views. Plunge pools, en-suite bathrooms, and gourmet bush dining under a canopy of stars. Each tent faces the open plains, giving you front-row seats to the drama of one of the world\'s greatest wildlife theatres.',
    amenities: ['Plunge Pool', 'En-Suite Bathroom', 'Bush Dining', 'Game Drives', 'Wi-Fi', 'Spa'],
    highlight: 'Closest camp to the Great Migration crossings',
    bestFor: ['Couples', 'Wildlife Lovers', 'First Safaris'],
    season: 'Year-round · Best Jun–Oct',
  },
  {
    id: 2,
    name: 'Ngorongoro Crater Lodge',
    type: 'Luxury Lodge',
    location: 'Crater Rim, Ngorongoro',
    category: 'Luxury Lodges',
    price: 'From $1,200/night',
    rating: 5.0,
    img: 'https://images.unsplash.com/photo-1723643750330-c868b56af36f?w=1200&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1595652974621-4a7a0b2caa14?w=900&h=600&fit=crop&auto=format',
    desc: 'Perched on the Crater rim with sweeping views into the caldera. Extraordinary colonial-meets-Maasai architecture, butler service, and private crater descents. Your suite overlooks the world\'s largest intact volcanic caldera — home to over 25,000 animals.',
    amenities: ['Crater Views', 'Butler Service', 'Private Descents', 'Fireplace', 'Helipad', 'Wine Cellar'],
    highlight: 'Only lodge with private crater access',
    bestFor: ['Honeymoons', 'Special Occasions', 'Luxury Seekers'],
    season: 'Year-round · Best Jan–Mar',
  },
  {
    id: 3,
    name: 'Zanzibar Pearl Beach Villa',
    type: 'Beach Resort',
    location: 'North Zanzibar',
    category: 'Beach Resorts',
    price: 'From $520/night',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1694860950114-0979b01c2615?w=1200&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1616145306407-07b1ac571ee4?w=900&h=600&fit=crop&auto=format',
    desc: "Ten private oceanfront villas on Zanzibar's most pristine beach. Infinity pools, water sports, spice tours, and Swahili-inspired fine dining. The perfect post-safari escape where the Indian Ocean meets centuries of island culture.",
    amenities: ['Private Beach', 'Infinity Pool', 'Water Sports', 'Spice Tours', 'Wi-Fi', 'Spa'],
    highlight: 'Voted Top 10 Zanzibar Resorts',
    bestFor: ['Couples', 'Post-Safari Extension', 'Families'],
    season: 'Jun–Oct & Dec–Feb',
  },
  {
    id: 4,
    name: 'Tarangire Treetops',
    type: 'Luxury Lodge',
    location: 'Tarangire National Park',
    category: 'Luxury Lodges',
    price: 'From $750/night',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1741850820115-cc94b3bf8175?w=1200&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1603703199669-a45d36f54918?w=900&h=600&fit=crop&auto=format',
    desc: 'Treehouses built into ancient baobab trees, elevated above the Tarangire ecosystem. Wake to elephant herds at the waterhole below your private deck. A truly unique bush experience — your room literally grows from a 600-year-old tree.',
    amenities: ['Treehouse Rooms', 'Elephant Viewing', 'Guided Walks', 'Pool', 'Sundowner Deck', 'Naturalist Guide'],
    highlight: 'Rooms built into 600-year-old baobabs',
    bestFor: ['Families', 'Unique Experiences', 'Wildlife Lovers'],
    season: 'Jun–Feb · Best Jul–Oct',
  },
  {
    id: 5,
    name: 'Ruaha River Lodge',
    type: 'Luxury Lodge',
    location: 'Ruaha National Park',
    category: 'Luxury Lodges',
    price: 'From $580/night',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1761078206756-68d3023f3021?w=900&h=600&fit=crop&auto=format',
    desc: "Twelve rock chalets above the Great Ruaha River — Tanzania's last true wilderness frontier. Walking safaris, boat activities, and extraordinary remoteness. One of the continent's most off-the-beaten-track luxury experiences.",
    amenities: ['River Views', 'Walking Safaris', 'Boat Trips', 'Pool', 'No Wi-Fi (Off-grid)', 'Star Beds'],
    highlight: 'Complete digital detox in true wilderness',
    bestFor: ['Adventurers', 'Off-Grid Travellers', 'Repeat Safari-Goers'],
    season: 'Jun–Nov',
  },
  {
    id: 7,
    name: 'Kuona Serengeti Lodge',
    type: 'Luxury Tented Lodge',
    location: 'Serengeti National Park',
    category: 'Tented Camps',
    price: 'Price on request',
    rating: 5.0,
    img: 'https://kostivinvestment.co.tz/kuona/images/tent.png',
    img2: 'https://kostivinvestment.co.tz/kuona/Photos/Single%20Unit%20(1).jpg',
    desc: 'Built within ancient kopjes using materials that echo the Serengeti\'s own landscape, Kuona — meaning "to see" in Swahili — offers a new way to witness Africa\'s wilderness. Luxury tented suites blend seamlessly into the terrain, with the Great Migration, lion territory, and timeless savanna as your horizon.',
    amenities: ['World-Class Spa', 'Sauna', 'À La Carte Dining', 'Game Drives', 'Creative Studio', 'Conservation Experiences'],
    highlight: 'Built into ancient kopjes — the Serengeti as it was meant to be seen',
    bestFor: ['Couples', 'Artists & Storytellers', 'Conservation Travellers'],
    season: 'Year-round · Best Jun–Oct',
  },
  {
    id: 6,
    name: 'Selous Migration Camp',
    type: 'Tented Camp',
    location: 'Selous Game Reserve',
    category: 'Tented Camps',
    price: 'From $490/night',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1603703199669-a45d36f54918?w=900&h=600&fit=crop&auto=format',
    desc: "A fly-in camp on the banks of the Rufiji River, deep in Africa's largest game reserve. Boat safaris, walking, and some of the continent's best wild dog sightings. Accessible only by light aircraft — the ultimate remote safari.",
    amenities: ['Boat Safaris', 'Walking Safaris', 'Wild Dog Tracking', 'Bush Meals', 'Fly-In Access', 'Stargazing'],
    highlight: 'Highest wild dog density in Africa',
    bestFor: ['Wildlife Enthusiasts', 'Remote Seekers', 'Photographers'],
    season: 'Jul–Nov',
  },
];

const categories = ['All', 'Luxury Lodges', 'Tented Camps', 'Beach Resorts'];

/* ─── Detail Modal ─── */
function LodgeModal({ lodge, onClose }: { lodge: Lodge; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: 'rgba(10,5,2,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative w-full overflow-y-auto"
        style={{ maxWidth: '860px', maxHeight: '90vh', backgroundColor: '#faf7f4', borderRadius: '24px', boxShadow: '0 60px 120px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-5 right-5 z-20 flex items-center justify-center"
          style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.75)')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)')}
        >
          <X size={15} strokeWidth={2.5} />
        </button>

        {/* Dual image header */}
        <div className="grid grid-cols-3" style={{ height: '300px', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
          <div className="col-span-2 bg-cover bg-center" style={{ backgroundImage: `url(${lodge.img2})` }} />
          <div className="bg-cover bg-center" style={{ backgroundImage: `url(${lodge.img})`, borderLeft: '3px solid #faf7f4' }} />
        </div>

        <div style={{ padding: '36px 40px 36px' }}>
          {/* Header */}
          <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a694f', fontWeight: 700, marginBottom: '8px' }}>{lodge.type}</p>
          <div className="flex items-start justify-between gap-6 mb-3">
            <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.1 }}>
              {lodge.name}
            </h2>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '22px', color: '#d3ba8b', lineHeight: 1 }}>{lodge.price}</p>
              <p style={{ fontSize: '10px', color: 'rgba(44,24,16,0.38)', marginTop: '4px' }}>per person sharing</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6" style={{ fontSize: '12px', color: 'rgba(44,24,16,0.45)' }}>
            <span className="flex items-center gap-1.5"><MapPin size={11} style={{ color: '#d3ba8b' }} />{lodge.location}</span>
            <span className="flex items-center gap-1"><Star size={11} style={{ color: '#d3ba8b', fill: '#d3ba8b' }} /> {lodge.rating} / 5.0</span>
            <span style={{ color: '#8a694f' }}>{lodge.season}</span>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, #d3ba8b, transparent)', marginBottom: '24px' }} />

          <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#8a694f', marginBottom: '20px', lineHeight: 1.65 }}>
            "{lodge.highlight}"
          </p>

          <p style={{ fontSize: '14px', lineHeight: 1.95, color: '#5a5047', fontWeight: 300, marginBottom: '28px' }}>{lodge.desc}</p>

          <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a694f', fontWeight: 700, marginBottom: '10px' }}>Facilities</p>
          <p style={{ fontSize: '13px', color: '#5a5047', lineHeight: 1.8, marginBottom: '28px' }}>
            {lodge.amenities.join(' · ')}
          </p>

          <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a694f', fontWeight: 700, marginBottom: '10px' }}>Best For</p>
          <p style={{ fontSize: '13px', color: '#5a5047', lineHeight: 1.8, marginBottom: '32px' }}>
            {lodge.bestFor.join(', ')}
          </p>

          <div style={{ fontSize: '12px', color: 'rgba(44,24,16,0.55)', lineHeight: 1.75, marginBottom: '28px', paddingLeft: '16px', borderLeft: '2px solid #d3ba8b' }}>
            Accommodation is selected and confirmed by our team as part of your itinerary — at no extra cost to you.
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              Plan a Safari <ArrowRight size={13} />
            </Link>
            <button onClick={onClose} className="btn-secondary" style={{ flexShrink: 0 }}>Back to Properties</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function Accommodation() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [selectedLodge, setSelectedLodge] = useState<Lodge | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleTabClick = (cat: string) => {
    setActiveCategory(cat);
    setTimeout(() => {
      if (contentRef.current) {
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 0);
  };

  const filtered = activeCategory === 'All' ? lodges : lodges.filter(l => l.category === activeCategory);

  return (
    <>
      <div style={{ backgroundColor: '#ffffff', fontFamily: "'Lato', sans-serif" }}>

        {/* Hero */}
        <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <motion.div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1595652974621-4a7a0b2caa14?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)' }} />
          <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '22px' }}>Where You Sleep</p>
              <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(52px, 9vw, 100px)', fontWeight: 400, lineHeight: 1.0, color: '#ffffff', marginBottom: '24px' }}>
                Accommodation
              </h1>
              <p style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.68)', maxWidth: '520px', margin: '0 auto' }}>
                Every property handpicked. Every stay intentional. From baobab treehouses to oceanfront villas.
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
            {categories.map(cat => (
              <button
                key={cat}
                onClick={e => { handleTabClick(cat); (e.currentTarget as HTMLButtonElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }}
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
                    layoutId="tab-indicator-accommodation"
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: '2.5px', backgroundColor: '#8a694f', borderRadius: '2px 2px 0 0' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Alternating lodge rows */}
        <div ref={contentRef} className="flex flex-col">
          {filtered.map((lodge, i) => {
            const isReverse = i % 2 === 1;
            const textBg = i % 2 === 0 ? '#faf7f4' : '#ffffff';
            return (
              <motion.article
                key={lodge.id}
                className={`group relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                style={{ backgroundColor: textBg }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image panel — diagonal clip */}
                <div
                  className="relative w-full lg:w-[50%] min-h-[300px] lg:min-h-[560px] flex-shrink-0 overflow-hidden"
                  style={{
                    clipPath: isReverse
                      ? 'polygon(160px 0, 100% 0, 100% 100%, 0 100%)'
                      : 'polygon(0 0, 100% 0, calc(100% - 160px) 100%, 0 100%)',
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${lodge.img})`, backgroundColor: '#8a694f' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.28) 100%)' }} />
                </div>

                {/* Text panel — no cards, pure typography */}
                <div className="flex-1 flex flex-col justify-center py-14 px-6 lg:py-20 lg:px-[6vw]">
                  <div style={{ maxWidth: '460px', width: '100%' }}>

                    {/* Type + location */}
                    <div className="flex items-center gap-3 mb-5">
                      <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a694f', fontWeight: 700 }}>{lodge.type}</span>
                      <span style={{ color: '#d3ba8b', fontSize: '10px' }}>·</span>
                      <span className="flex items-center gap-1" style={{ fontSize: '11px', color: 'rgba(44,24,16,0.45)' }}>
                        <MapPin size={10} style={{ color: '#d3ba8b' }} />{lodge.location}
                      </span>
                    </div>

                    {/* Name */}
                    <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.01em' }}>
                      {lodge.name}
                    </h2>

                    {/* Highlight — italic */}
                    <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#8a694f', marginBottom: '16px', lineHeight: 1.65 }}>
                      {lodge.highlight}
                    </p>

                    {/* Description */}
                    <p style={{ fontSize: '14px', lineHeight: 1.95, color: '#5a5047', fontWeight: 300, marginBottom: '32px' }}>
                      {lodge.desc}
                    </p>

                    {/* CTAs */}
                    <div className="flex gap-3">
                      <button onClick={() => setSelectedLodge(lodge)} className="btn-secondary">
                        View Property
                      </button>
                      <Link href="/booking" className="btn-primary">
                        Plan a Safari <ArrowRight size={12} />
                      </Link>
                    </div>

                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Info note */}
        <div className="py-10 px-6 lg:px-20 text-center" style={{ backgroundColor: '#faf7f4', borderTop: '1px solid rgba(138,105,79,0.1)' }}>
          <p style={{ fontSize: '13px', color: 'rgba(44,24,16,0.45)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
            These properties are shown for inspiration. When you book a safari with us, our team selects and confirms the right lodge for your dates, group size, and budget.
          </p>
        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedLodge && <LodgeModal lodge={selectedLodge} onClose={() => setSelectedLodge(null)} />}
      </AnimatePresence>
    </>
  );
}
