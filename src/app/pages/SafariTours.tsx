'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, MapPin, Check, X } from 'lucide-react';

const standardIncludes = [
  'Park & conservation fees',
  'Professional driver-guide',
  'Private 4x4 safari vehicle',
  'All accommodation as listed',
  'All meals as specified',
  'Drinking water on all days',
  'Roundtrip airport transfers',
  'All taxes & VAT',
];

const standardExcludes = [
  'International flights',
  'Tips for guides & staff',
  'Travel & medical insurance',
  'Personal expenses & souvenirs',
  'Tanzania visa fees',
];

const tours = [
  {
    id: 1,
    name: '1 Day Ngorongoro Crater Safari',
    duration: '1 Day',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Day Trip',
    groupLabel: 'Private safari',
    img: '/images/956A3279.jpg',
    highlight: 'Quick Escape',
    desc: 'A short, action-packed safari for travellers with limited time. Descend 600m into the Ngorongoro Crater for half-day game viewing among lion, elephant, wildebeest, zebra, hyena and buffalo, then visit the soda waters of Lake Magadi to see flamingos and hippos.',
    parks: ['Ngorongoro Crater', 'Lake Magadi'],
    itinerary: [
      { day: 'Day 1', title: 'Arusha – Ngorongoro Crater – Arusha', text: 'Depart Arusha at 5:00am via Mto wa Mbu and Karatu to the Ngorongoro Crater. Descend roughly 600m for a half-day game drive among lion, elephant, wildebeest, zebra, gazelle, hyena and buffalo, then visit Lake Magadi for flamingos and waterbirds before climbing back to the rim and returning to Arusha.' },
    ],
  },
  {
    id: 2,
    name: '3 Days Classic Serengeti Safari',
    duration: '3 Days / 2 Nights',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Classic',
    groupLabel: 'Private safari',
    img: '/images/956A2358.jpg',
    highlight: 'Popular Starter',
    desc: "A perfect introduction to Tanzania's safari country. Spend a full day exploring the endless plains of the Serengeti - home to lion, leopard, cheetah, elephant and, seasonally, the wildebeest migration - before a sunrise visit to the Ngorongoro Crater on your way back.",
    parks: ['Serengeti National Park', 'Ngorongoro Crater'],
    itinerary: [
      { day: 'Day 1', title: 'Arusha – Serengeti National Park', text: 'Pickup from your lodge in Arusha and drive to the Serengeti, with an afternoon game drive on arrival. Dinner and overnight at a lodge.' },
      { day: 'Day 2', title: 'Full Day Serengeti National Park', text: 'A full day game drive across the Serengeti plains - lion, leopard, elephant, cheetah, buffalo, zebra, wildebeest, eland, wild dog and crocodile.' },
      { day: 'Day 3', title: 'Ngorongoro Crater – Arusha', text: 'Early morning drive to Ngorongoro for a crater tour, then return to Arusha by late afternoon.' },
    ],
  },
  {
    id: 3,
    name: '4 Nights / 5 Days Northern Safari',
    duration: '5 Days / 4 Nights',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Classic',
    groupLabel: 'Private safari',
    img: '/images/elephantsafari.png',
    highlight: 'Northern Circuit',
    desc: "The highlights of Tanzania's northern circuit in one trip - Lake Manyara, Serengeti, Ngorongoro Crater and Tarangire - four parks renowned for wildlife density, tree-climbing lions and dramatic scenery.",
    parks: ['Lake Manyara', 'Serengeti', 'Ngorongoro', 'Tarangire'],
    itinerary: [
      { day: 'Day 1', title: 'Arusha – Lake Manyara', text: 'Lunch in Arusha, then drive to Lake Manyara National Park for an evening game drive - hippos, monkeys, tree-climbing lions, flamingos and rich birdlife.' },
      { day: 'Day 2', title: 'Manyara – Serengeti', text: 'Early breakfast and drive to the Serengeti, with afternoon game viewing - wildebeest, zebra, gazelle and lion.' },
      { day: 'Day 3', title: 'Serengeti – Ngorongoro', text: 'Morning game drive in the Serengeti, then transfer to the Ngorongoro Conservation Area for a half-day crater tour.' },
      { day: 'Day 4', title: 'Ngorongoro – Tarangire', text: 'Transfer to Tarangire National Park for an afternoon game drive - lesser kudu, eland, lion, gerenuk and iconic baobab trees.' },
      { day: 'Day 5', title: 'Tarangire – Arusha', text: 'Early morning game drive in Tarangire, then drive back to Arusha with game viewing en route.' },
    ],
  },
  {
    id: 4,
    name: '6 Days Best of Tanzania Safari',
    duration: '6 Days / 5 Nights',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Classic',
    groupLabel: 'Private safari',
    img: '/images/956A3309.jpg',
    highlight: 'Fan Favourite',
    desc: "Tanzania's most famous parks in one circuit - Tarangire, Serengeti, Ngorongoro and Lake Manyara. Offered year-round, this safari can be timed for the wildebeest calving season (December–April) or the Mara River crossings (July–October).",
    parks: ['Tarangire', 'Serengeti', 'Ngorongoro', 'Lake Manyara'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Arusha', text: 'Airport pickup and transfer to your lodge in Arusha for a trip briefing.' },
      { day: 'Day 2', title: 'Tarangire National Park', text: 'Drive to Tarangire - large herds of elephant, tree-climbing lions, baobab trees and the Tarangire River.' },
      { day: 'Day 3', title: 'Serengeti National Park', text: 'Drive to the Serengeti with a picnic lunch and game drive en route, following the Great Migration trails.' },
      { day: 'Day 4', title: 'Serengeti National Park', text: 'A full day game drive in the Serengeti - vast plains, abundant predators, and (seasonally) the wildebeest migration.' },
      { day: 'Day 5', title: 'Ngorongoro Conservation Area', text: "Game drive in the Ngorongoro Crater, the world's largest unbroken volcanic caldera." },
      { day: 'Day 6', title: 'Lake Manyara National Park – Arusha', text: 'Game drive at Lake Manyara - flamingos, pelicans, storks and tree-climbing lions - before returning to Arusha.' },
    ],
  },
  {
    id: 5,
    name: '8 Days Best of Northern Tanzania Safari',
    duration: '8 Days / 7 Nights',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Classic',
    groupLabel: 'Private safari',
    img: '/images/956A2613.jpg',
    highlight: 'In-Depth Safari',
    desc: "An in-depth northern circuit covering Tarangire, the Ngorongoro Crater, Olduvai Gorge, three days in the Serengeti, and Lake Manyara. An optional hot air balloon safari over the Serengeti plains is available as an add-on (from $546 per person).",
    parks: ['Tarangire', 'Ngorongoro', 'Olduvai Gorge', 'Serengeti', 'Lake Manyara'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Arusha', text: 'Airport pickup and transfer to your lodge in Arusha for a trip briefing.' },
      { day: 'Day 2', title: 'Tarangire National Park', text: 'Afternoon game drive among baobabs and acacia parkland - elephant, lion, leopard and seasonal migration of wildebeest, zebra, eland and oryx.' },
      { day: 'Day 3', title: 'Ngorongoro Conservation Area', text: 'Descend roughly 600m into the Ngorongoro Crater for an afternoon game drive - lion, elephant, rhino, buffalo and abundant plains game.' },
      { day: 'Day 4–6', title: 'Serengeti National Park', text: 'Three days exploring the Serengeti via Olduvai Gorge - over 35 species of plains game, predators including lion, cheetah, wild dog and hyena, and (seasonally) the Great Migration. Optional hot air balloon safari available (from $546pp, paid separately).' },
      { day: 'Day 7', title: 'Serengeti – Karatu', text: 'Morning game drive in the Serengeti, then drive to Karatu for the night.' },
      { day: 'Day 8', title: 'Lake Manyara National Park – Arusha', text: 'Morning game drive at Lake Manyara - Big Five territory and famous tree-climbing lions - before returning to Arusha.' },
    ],
  },
  {
    id: 6,
    name: '8 Days Wildebeest Migration River Crossing',
    duration: '8 Days / 7 Nights',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Migration',
    groupLabel: 'Private safari',
    img: '/images/956A4274.jpg',
    highlight: 'Migration Special',
    desc: 'Follow the Great Migration from Tarangire to the Mara River crossings in the northern Serengeti, with an optional hot air balloon flight (from $546pp), before finishing with the Ngorongoro Crater, Olduvai Gorge and Lake Manyara.',
    parks: ['Tarangire', 'Serengeti (Seronera, Kogatende, North Mara)', 'Ngorongoro', 'Olduvai Gorge & Laetoli', 'Lake Manyara'],
    itinerary: [
      { day: 'Day 1', title: 'Arusha – Tarangire National Park', text: 'Game drive in Tarangire - large elephant herds, tree-climbing lions and the iconic baobab "Tree of Life".' },
      { day: 'Day 2', title: 'Serengeti National Park (Seronera)', text: 'Drive to Central Serengeti, known for resident Big Five wildlife.' },
      { day: 'Day 3', title: 'Serengeti National Park', text: 'Full day game drive following the Great Migration trails across the Serengeti plains.' },
      { day: 'Day 4', title: 'Serengeti National Park (Kogatende)', text: 'Game drive in the Mara region viewing the Great Migration, with a chance of witnessing a Mara River crossing.' },
      { day: 'Day 5', title: 'Serengeti National Park (North Mara)', text: 'Continue viewing the migration in the far north of the Serengeti. Optional hot air balloon safari available (from $546pp, paid separately).' },
      { day: 'Day 6', title: 'Serengeti – Ngorongoro Conservation Area', text: 'Morning game drive, then transfer to Ngorongoro via the Olduvai Gorge museum and the Laetoli footprints (3.6 million years old).' },
      { day: 'Day 7', title: 'Ngorongoro Crater Tour', text: 'Early morning game drive inside the Ngorongoro Crater.' },
      { day: 'Day 8', title: 'Lake Manyara National Park – Arusha', text: 'Morning game drive at Lake Manyara, then return to Arusha or transfer to the airport for departure.' },
    ],
  },
  {
    id: 7,
    name: '5 Days Selous Game Reserve & Mikumi National Park',
    duration: '5 Days / 4 Nights',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Classic',
    groupLabel: 'Private safari',
    img: '/images/leopard.png',
    highlight: 'Southern Circuit',
    desc: 'Discover the Rufiji River by boat, encounter hippos and crocodiles in the Selous Game Reserve, then spot giraffe, buffalo, elephant, lion and leopard on game drives in Mikumi National Park. Departs from and returns to Dar es Salaam.',
    parks: ['Selous Game Reserve', 'Mikumi National Park'],
    itinerary: [
      { day: 'Day 1', title: 'Dar es Salaam – Selous Game Reserve', text: 'Pickup from your hotel in Dar es Salaam and drive to the Selous, arriving in time for game viewing and an evening boat safari on the Rufiji River.' },
      { day: 'Day 2–3', title: 'Selous Game Reserve', text: 'Two full days exploring the Selous by foot safari, vehicle game drive and Rufiji River boat trips - hippos, crocodiles and around 350 bird species.' },
      { day: 'Day 4', title: 'Selous – Mikumi National Park', text: 'Morning drive across the northern Selous to Mikumi - giraffe, buffalo, elephant, lion, leopard, zebra, wild dog and more, viewed from game drives and observation towers.' },
      { day: 'Day 5', title: 'Mikumi National Park – Dar es Salaam', text: 'Early morning game drive in Mikumi, then return to Dar es Salaam.' },
    ],
  },
  {
    id: 8,
    name: '6 Days Ruaha, Mikumi & Udzungwa National Park',
    duration: '6 Days / 5 Nights',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Classic',
    groupLabel: 'Private safari',
    img: '/images/Lionessrock.png',
    highlight: 'Off the Beaten Path',
    desc: "An off-the-beaten-path southern circuit through Mikumi National Park, the vast and unspoilt Ruaha National Park, and a waterfall hike in the Udzungwa Mountains. Departs from and returns to Dar es Salaam.",
    parks: ['Mikumi National Park', 'Ruaha National Park', 'Udzungwa Mountains'],
    itinerary: [
      { day: 'Day 1', title: 'Dar es Salaam – Mikumi National Park', text: 'Drive to Mikumi with a packed lunch, with game viewing en route - lion, eland, hartebeest, buffalo, wildebeest, giraffe, zebra, elephant and wild dog.' },
      { day: 'Day 2', title: 'Mikumi – Iringa', text: 'Sunrise game drive in Mikumi, then drive to Iringa via the Isimila Stone Age Site.' },
      { day: 'Day 3', title: 'Iringa – Ruaha National Park', text: 'Drive to Ruaha National Park - one of the largest and most unspoilt parks in Africa - with an afternoon game drive.' },
      { day: 'Day 4', title: 'Full Day Ruaha National Park', text: 'A full day of game viewing along the Great Ruaha River - hippo, crocodile, lion, leopard, wild dog, giraffe, elephant, cheetah and more.' },
      { day: 'Day 5', title: 'Ruaha – Udzungwa Mountains National Park', text: 'Early game drive in Ruaha, then drive to the Udzungwa Mountains with a packed lunch.' },
      { day: 'Day 6', title: 'Udzungwa – Dar es Salaam', text: 'Trek to the Sanje Waterfalls (180m, with views over the Kilombero Valley), then drive back to Dar es Salaam.' },
    ],
  },
  {
    id: 9,
    name: '4 Days Zanzibar Kendwa Beach & Stone Town Tour',
    duration: '4 Days / 3 Nights',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Beach & Zanzibar',
    groupLabel: 'Private tour',
    img: '/images/stone town.jpg',
    highlight: 'Beach Escape',
    desc: "Combine the history of Zanzibar's UNESCO-listed Stone Town with relaxation on the white sands of Kendwa Beach - a guided city tour, a spice plantation visit, and free time for snorkelling or scuba diving.",
    parks: ['Stone Town (UNESCO)', 'Spice Plantations', 'Kendwa Beach'],
    itinerary: [
      { day: 'Day 1', title: 'Airport Pickup – Stone Town', text: 'Arrive in Zanzibar and transfer to Stone Town, the historic heart of the island.' },
      { day: 'Day 2', title: 'Stone Town & Spice Plantation – Kendwa Beach', text: 'Guided tour of Stone Town - the House of Wonders, the Palace Museum, mosques and the Old Fort and famous carved doors - followed by a spice plantation tour, then drive to Kendwa Beach in the evening.' },
      { day: 'Day 3', title: 'Kendwa Beach', text: 'A free day to relax on the white sands of Kendwa Beach, with the option to go snorkelling or scuba diving.' },
      { day: 'Day 4', title: 'Kendwa Beach – Airport', text: 'Final morning at leisure on the beach before transferring to the airport for your departure.' },
    ],
  },
  {
    id: 10,
    name: '8 Days Tanzania Cultural Tour',
    duration: '8 Days / 7 Nights',
    price: 'On Request',
    priceNote: 'tailored quote',
    type: 'Cultural',
    groupLabel: 'Private tour',
    img: '/images/956A1769.jpg',
    highlight: 'Cultural Immersion',
    desc: "Immerse yourself in Tanzania's living cultures - stay with a Maasai community at Olpopongi, visit local schools and historic sites near Tengeru, hike Monduli Mountain, and meet the Hadzabe and Datoga peoples on the shores of Lake Eyasi - before finishing at the Ngorongoro Crater and Olduvai Gorge.",
    parks: ['Olpopongi Maasai Village', 'Monduli', 'Lake Eyasi', 'Ngorongoro & Olduvai Gorge', 'Mto wa Mbu'],
    itinerary: [
      { day: 'Day 1', title: 'Olpopongi Maasai Village', text: 'Arrive at Kilimanjaro International Airport and drive to the Olpopongi Maasai Village on the slopes of West Kilimanjaro, welcomed by the village chief.' },
      { day: 'Day 2', title: 'Olpopongi Maasai Village', text: 'A guided walking safari and bush excursion with Maasai warriors covering medicinal plants, traditional tools and fire-making, followed by an evening of traditional song and dance.' },
      { day: 'Day 3', title: 'Tengeru Cultural Tour – Arusha', text: 'Visit local primary schools, including a school for children with disabilities, and a historic WWII-era stone quarry site, before driving to Arusha for the night.' },
      { day: 'Day 4', title: 'Monduli Juu Cultural Walk', text: 'Drive to Monduli and walk through forest with an armed ranger, summiting Monduli Mountain for views of Kilimanjaro and Mount Meru.' },
      { day: 'Day 5', title: 'Lake Eyasi – Cultural Interaction', text: 'Drive to Lake Eyasi in the Rift Valley to meet the Datoga (Mang\'ati) tribe and explore the landscape with the Hadzabe bushmen.' },
      { day: 'Day 6', title: 'Lake Eyasi – Ngorongoro Conservation Area', text: 'An early morning hunting walk with the Hadzabe, then drive to the Ngorongoro Conservation Area with wildlife viewing en route.' },
      { day: 'Day 7', title: 'Olduvai Gorge & Maasai Village Visit', text: 'Visit a local Maasai village with an optional stop at Olduvai Gorge, the site of major early-human discoveries.' },
      { day: 'Day 8', title: 'Mto wa Mbu Cultural Tour – Arusha', text: 'A community-based cultural tour of Mto wa Mbu - local foods, walking and biking tours - before returning to Arusha.' },
    ],
  },
];

const types = ['All', 'Classic', 'Cultural', 'Beach & Zanzibar', 'Migration', 'Day Trip'];

export default function SafariTours() {
  const [activeType, setActiveType] = useState('All');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [selected, setSelected] = useState<(typeof tours)[0] | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const openId = searchParams.get('open');
    if (openId) {
      const match = tours.find((t) => t.id === Number(openId));
      if (match) setSelected(match);
    }
  }, [searchParams]);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (type: string) => {
    setActiveType(type);
    setTimeout(() => {
      if (contentRef.current) {
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 146;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 0);
  };
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const filtered = activeType === 'All' ? tours : tours.filter((t) => t.type === activeType);

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Lato', sans-serif" }}>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)' }} />
        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>Curated Experiences</p>
            <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}>
              Safari Tours
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '560px', margin: '0 auto' }}>
              Ten handcrafted itineraries across Tanzania's parks, beaches and cultures - every safari is tailor-made and quoted to suit your budget.
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
          {types.map((type) => (
            <button
              key={type}
              onClick={(e) => { handleTabClick(type); (e.currentTarget as HTMLButtonElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }}
              className="relative shrink-0 flex items-center px-8"
              onMouseEnter={() => setHoveredTab(type)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: activeType === type ? 700 : 400,
                fontFamily: "'Lato', sans-serif",
                color: activeType === type ? '#8a694f' : hoveredTab === type ? '#8a694f' : 'rgba(44,24,16,0.65)',
                backgroundColor: hoveredTab === type && activeType !== type ? 'rgba(138,105,79,0.07)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease, background-color 0.2s ease',
              }}
            >
              {type}
              {activeType === type && (
                <motion.div
                  layoutId="tab-indicator-safaris"
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: '2.5px', backgroundColor: '#8a694f', borderRadius: '2px 2px 0 0' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tours - full-width alternating rows with diagonal cuts */}
      <div ref={contentRef} className="flex flex-col">
        {filtered.map((tour, i) => {
          const isReverse = i % 2 === 1;
          const textBg = i % 2 === 0 ? '#faf7f4' : '#ffffff';
          return (
            <motion.div
              key={tour.id}
              className={`group relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} cursor-pointer`}
              style={{ backgroundColor: textBg, minHeight: 'auto' }}
              onClick={() => setSelected(tour)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image with diagonal cut */}
              <div
                className={`relative w-full lg:w-[52%] min-h-[280px] lg:min-h-[520px] flex-shrink-0 overflow-hidden ${isReverse ? 'clip-diag-l' : 'clip-diag-r'}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${tour.img})`, backgroundColor: '#d3ba8b' }}
                />
              </div>

              {/* Text panel */}
              <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:py-20 lg:px-[6vw]">
                <div style={{ maxWidth: '460px', width: '100%' }}>
                  <div className="flex items-center gap-2 mb-4" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d3ba8b' }}>
                    <MapPin size={10} /> {tour.parks[0]}{tour.parks.length > 1 ? ` + ${tour.parks.length - 1} more` : ''}
                  </div>
                  <h3 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    {tour.name}
                  </h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#5a5047', marginBottom: '20px', fontWeight: 300 }}>
                    {tour.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {tour.parks.map((p) => (
                      <span key={p} style={{ fontSize: '10px', letterSpacing: '0.04em', color: '#8a694f', backgroundColor: 'rgba(211,186,139,0.12)', padding: '3px 10px', borderRadius: '100px' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="mb-8">
                    <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a7060', marginBottom: '4px' }}>From</p>
                    <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '32px', color: '#8a694f', lineHeight: 1 }}>{tour.price}</p>
                    <p style={{ fontSize: '11px', color: '#8a7060', marginTop: '4px' }}>{tour.priceNote}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="btn-primary">
                      View Details <ArrowUpRight size={11} strokeWidth={1.5} />
                    </button>
                    <Link
                      href="/booking"
                      className="btn-secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tour detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: '#ffffff', borderRadius: '20px' }}
              onClick={(e) => e.stopPropagation()}>

              <div className="h-72 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${selected.img})`, backgroundColor: '#d3ba8b', borderRadius: '20px 20px 0 0' }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                <button className="absolute top-5 right-5 transition-colors" onClick={() => setSelected(null)}
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <X size={20} strokeWidth={1.5} />
                </button>
                <div className="absolute bottom-5 left-8">
                  <span style={{ backgroundColor: '#8a694f', color: '#ffffff', padding: '3px 12px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '100px' }}>
                    {selected.highlight}
                  </span>
                </div>
              </div>

              <div className="p-8 lg:p-10">
                <div className="flex items-start justify-between mb-5 gap-6">
                  <div>
                    <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '28px', fontWeight: 400, color: '#000000', marginBottom: '6px' }}>{selected.name}</h2>
                    <p style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d3ba8b' }}>{selected.duration} · {selected.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '20px', color: '#8a694f' }}>{selected.price}</p>
                    <p style={{ fontSize: '11px', color: '#888888' }}>{selected.priceNote}</p>
                  </div>
                </div>

                <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#333333', marginBottom: '28px' }}>{selected.desc}</p>

                {/* Itinerary */}
                <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '14px' }}>Itinerary</p>
                <div className="flex flex-col gap-4 mb-8">
                  {selected.itinerary.map((day) => (
                    <div key={day.day} className="flex gap-4">
                      <div className="shrink-0" style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a694f', width: '64px' }}>
                        {day.day}
                      </div>
                      <div>
                        <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '15px', color: '#000000', marginBottom: '4px' }}>{day.title}</p>
                        <p style={{ fontSize: '13px', lineHeight: 1.75, color: '#555555' }}>{day.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Includes / Excludes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '14px' }}>Included</p>
                    <div className="flex flex-col gap-2.5">
                      {standardIncludes.map((inc) => (
                        <div key={inc} className="flex items-center gap-2" style={{ fontSize: '13px', color: '#333333' }}>
                          <Check size={12} color="#8a694f" className="shrink-0" /> {inc}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '14px' }}>Not Included</p>
                    <div className="flex flex-col gap-2.5">
                      {standardExcludes.map((exc) => (
                        <div key={exc} className="flex items-center gap-2" style={{ fontSize: '13px', color: '#999999' }}>
                          <X size={12} color="#cccccc" className="shrink-0" /> {exc}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid #f0e8dc' }}>
                  <Link href="/booking" className="btn-primary">
                    Get a quote <ArrowUpRight size={12} strokeWidth={1.5} />
                  </Link>
                  <button onClick={() => setSelected(null)} className="btn-secondary">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
