'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';

const C = { gold: '#DF9307', dark: '#3D2210', green: '#9D7354', cream: '#F5EDE0' };

const seasons = [
  {
    id: 'dry-cool',
    label: 'Long Dry Season',
    months: 'June – October',
    badge: 'Peak Safari',
    badgeColor: C.gold,
    weather: 'Cool mornings (8–15°C), warm afternoons (24–28°C), bone-dry, zero rain, dusty tracks.',
    wildlife: 'Best game viewing of the year  animals concentrate at water sources. Great Migration river crossings at Mara. Black rhino sightings in Ngorongoro.',
    heroImg: 'https://images.unsplash.com/photo-1741850821140-cbf6be551828?w=900&h=500&fit=crop&auto=format',
    categories: [
      {
        title: 'Clothing',
        icon: '👕',
        items: [
          'Thermal base layer for 5am game drives',
          'Fleece mid-layer or lightweight down jacket',
          '3–4 long-sleeve shirts in khaki, olive, sand, or grey',
          '2–3 lightweight trousers (zip-off styles are versatile)',
          'Shorts for warm afternoons',
          'Wide-brim hat (sun is intense even in cool weather)',
          'Buff or neck gaiter for dust',
          'Light windproof jacket for open vehicle drives',
        ],
      },
      {
        title: 'Footwear',
        icon: '👟',
        items: [
          'Sturdy closed-toe walking shoes or light hiking boots',
          'Sandals for camp relaxation',
          'Warm socks (mornings are genuinely cold)',
        ],
      },
      {
        title: 'Sun & Skin',
        icon: '☀️',
        items: [
          'SPF 50+ sunscreen  reapply every 2 hours on open vehicles',
          'UV-protective sunglasses (wraparound style)',
          'Lip balm with SPF',
          'Moisturiser (air is very dry)',
        ],
      },
      {
        title: 'Safari Essentials',
        icon: '🔭',
        items: [
          'Binoculars (8×42 recommended)',
          'Camera + extra batteries (cold drains them)',
          'Dust-proof bag for electronics',
          'Small daypack for game drives',
          'Headlamp or small torch',
          'Reusable water bottle (minimum 1.5L)',
        ],
      },
      {
        title: 'Health & Pharmacy',
        icon: '💊',
        items: [
          'Malaria prophylaxis (consult your doctor)',
          'DEET insect repellent 50%+',
          'Altitude medication if summiting Kilimanjaro',
          'Antihistamine for dust allergies',
          'Blister plasters for walking safaris',
          'Hand sanitiser',
        ],
      },
    ],
  },
  {
    id: 'hot-dry',
    label: 'Short Dry Season',
    months: 'January – February',
    badge: 'Calving Season',
    badgeColor: '#8A694F',
    weather: 'Hot and dry (30–35°C), minimal rain, intense sun. Short rains usually finish by December.',
    wildlife: 'Wildebeest calving season in southern Serengeti  500,000 calves born in 3 weeks. Excellent predator action. Fewer tourists than peak dry season.',
    heroImg: 'https://images.unsplash.com/photo-1695787841714-bc5acb2b23c5?w=900&h=500&fit=crop&auto=format',
    categories: [
      {
        title: 'Clothing',
        icon: '👕',
        items: [
          'Lightweight, breathable long-sleeve shirts (linen or moisture-wicking)',
          'Loose cotton or linen trousers',
          'Shorts for afternoons',
          'Wide-brim hat  this is non-negotiable in 35°C heat',
          'Light scarf for sun protection on open vehicles',
          'Swimwear for lodge pools',
          'One smart-casual outfit for dinner (no jacket needed)',
        ],
      },
      {
        title: 'Footwear',
        icon: '👟',
        items: [
          'Breathable mesh walking shoes or light boots',
          'Comfortable sandals',
          'Flip flops for pool areas',
        ],
      },
      {
        title: 'Sun & Skin',
        icon: '☀️',
        items: [
          'SPF 50+ sunscreen  highest priority item',
          'After-sun lotion or aloe vera gel',
          'UV-blocking sunglasses',
          'Cooling face mist',
          'Electrolyte sachets for hydration',
        ],
      },
      {
        title: 'Safari Essentials',
        icon: '🔭',
        items: [
          'Binoculars (essential for calving season plains)',
          'Camera with zoom lens (200–400mm for calving action)',
          'Cooling camera bag  heat can damage optics',
          'Extra memory cards',
          'Reusable water bottle minimum 2L  you will drink it all',
        ],
      },
      {
        title: 'Health & Pharmacy',
        icon: '💊',
        items: [
          'Malaria prophylaxis (high transmission season)',
          'DEET insect repellent',
          'Oral rehydration salts',
          'Heat rash powder or cream',
          'Sunstroke treatment kit',
        ],
      },
    ],
  },
  {
    id: 'long-rains',
    label: 'Long Rains',
    months: 'March – May',
    badge: 'Green Season',
    badgeColor: '#9D7354',
    weather: 'Heavy afternoon rains, lush vegetation, cool-humid (22–27°C), some roads may be challenging.',
    wildlife: 'Extraordinary photography light, empty parks, resident wildlife still present. Some camps close. Best for birdwatching  200+ migratory species present.',
    heroImg: 'https://images.unsplash.com/photo-1517001170041-70a5966d5402?w=900&h=500&fit=crop&auto=format',
    categories: [
      {
        title: 'Clothing',
        icon: '👕',
        items: [
          'Lightweight waterproof jacket (packable, not heavy)',
          'Quick-dry trousers and shirts',
          'Moisture-wicking base layers',
          'Extra changes of clothes  things take longer to dry',
          'Long-sleeve shirts for evening mosquitoes',
          'Warm layer for camp evenings (cooler after rain)',
        ],
      },
      {
        title: 'Footwear',
        icon: '👟',
        items: [
          'Waterproof hiking boots (Gore-Tex or similar)',
          'Rubber camp sandals you don\'t mind getting muddy',
          'Gaiters if doing walking safaris',
          'Extra socks  wet feet are a blister guarantee',
        ],
      },
      {
        title: 'Wet Weather Gear',
        icon: '🌧️',
        items: [
          'Packable rain poncho for game drives (hard sides vs. open vehicle)',
          'Waterproof dry bags for camera equipment',
          'Waterproof stuff sack for electronics',
          'Silica gel packets to keep camera bag dry',
        ],
      },
      {
        title: 'Safari Essentials',
        icon: '🔭',
        items: [
          'Binoculars with waterproof housing',
          'Camera rain cover or waterproof sleeve',
          'Polarising filter for dramatic cloud photography',
          'Microfibre towels (compact, fast-drying)',
          'Insect repellent (high density)',
        ],
      },
      {
        title: 'Health & Pharmacy',
        icon: '💊',
        items: [
          'Malaria prophylaxis (highest risk period)',
          'DEET 50%+ repellent (mandatory)',
          'Water purification tablets (backup)',
          'Anti-diarrhoeal medication',
          'Antifungal powder for feet',
          'Waterproof first-aid kit',
        ],
      },
    ],
  },
  {
    id: 'short-rains',
    label: 'Short Rains',
    months: 'November – December',
    badge: 'Shoulder Season',
    badgeColor: '#7A5C1E',
    weather: 'Intermittent afternoon showers (light compared to long rains), warm 26–30°C, green and scenic. Often sunny mornings.',
    wildlife: 'Migratory birds arrive from Europe. Calving preparation begins in late November. Beautiful green Serengeti with pink flamingos on alkaline lakes.',
    heroImg: 'https://images.unsplash.com/photo-1728042107033-76b13feac547?w=900&h=500&fit=crop&auto=format',
    categories: [
      {
        title: 'Clothing',
        icon: '👕',
        items: [
          'Mix of lightweight layers  mornings are pleasant, afternoons warm',
          'Light waterproof layer (showers are brief, usually 1–2 hours)',
          'Breathable long-sleeve shirts',
          'Light trousers and shorts',
          'Swimwear for lodge pools',
          'Smart-casual layer for Christmas/New Year dinners if travelling in December',
        ],
      },
      {
        title: 'Footwear',
        icon: '👟',
        items: [
          'Water-resistant walking shoes (waterproof not strictly necessary)',
          'Sandals for camp',
          'Lightweight boots if doing any walks',
        ],
      },
      {
        title: 'Sun & Rain',
        icon: '🌤️',
        items: [
          'SPF 50+ sunscreen (sun still intense between showers)',
          'Compact umbrella or packable poncho',
          'UV sunglasses',
          'Waterproof bag cover for daypack',
        ],
      },
      {
        title: 'Safari Essentials',
        icon: '🔭',
        items: [
          'Binoculars  excellent for bird migration season',
          'Bird field guide (East Africa species)',
          'Camera rain cover (precautionary)',
          'Extra memory cards',
          'Reusable water bottle',
        ],
      },
      {
        title: 'Health & Pharmacy',
        icon: '💊',
        items: [
          'Malaria prophylaxis',
          'DEET insect repellent',
          'Antihistamine (for seasonal allergies from flowering vegetation)',
          'Standard first-aid kit',
        ],
      },
    ],
  },
];

export default function PackingGuide() {
  const [activeSeason, setActiveSeason] = useState(0);
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const season = seasons[activeSeason];

  return (
    <section style={{ backgroundColor: '#8A694F', fontFamily: "'Lato', sans-serif" }}>
      <div className="px-6 lg:px-20 pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, marginBottom: '16px' }}>
            Practical Preparation
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(32px,4vw,52px)', color: C.cream, fontWeight: 400, lineHeight: 1.15, marginBottom: '16px' }}>
            What to Pack by Season
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(238,238,238,0.45)', lineHeight: 1.8, maxWidth: '540px', marginBottom: '48px' }}>
            Tanzania's climate varies dramatically by season. Pack right and your safari will be effortless  pack wrong and the bush will remind you quickly.
          </p>

          {/* Season tabs */}
          <div className="flex flex-wrap gap-3 mb-0">
            {seasons.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setActiveSeason(i); setOpenCategory(0); }}
                className="relative transition-all duration-300"
                style={{
                  padding: '10px 22px',
                  border: `1px solid ${i === activeSeason ? C.gold : 'rgba(255,255,255,0.1)'}`,
                  backgroundColor: i === activeSeason ? 'rgba(223,147,7,0.12)' : 'transparent',
                  color: i === activeSeason ? C.gold : 'rgba(255,255,255,0.45)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: i === activeSeason ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {s.label}
                <span style={{ display: 'block', fontSize: '9px', letterSpacing: '0.04em', textTransform: 'none', opacity: 0.7, marginTop: '2px', fontWeight: 400 }}>
                  {s.months}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={season.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {/* Hero image + weather brief */}
          <div className="relative h-64 lg:h-80 overflow-hidden mx-6 lg:mx-20 mt-6 rounded-none">
            <img
              src={season.heroImg}
              alt={season.label}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.45)' }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-3">
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    backgroundColor: season.badgeColor,
                    color: '#fff',
                  }}
                >
                  {season.badge}
                </span>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                  {season.months}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: '640px', marginBottom: '8px' }}>
                <span style={{ color: C.gold, fontWeight: 500 }}>Weather: </span>{season.weather}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: '640px' }}>
                <span style={{ color: 'rgba(238,238,238,0.6)', fontWeight: 500 }}>Wildlife: </span>{season.wildlife}
              </p>
            </div>
          </div>

          {/* Packing categories accordion */}
          <div className="px-6 lg:px-20 pt-8 pb-24 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: category accordion */}
              <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                {season.categories.map((cat, ci) => (
                  <div
                    key={cat.title}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <button
                      className="w-full flex items-center justify-between py-5 pr-8 text-left transition-colors duration-200"
                      onClick={() => setOpenCategory(openCategory === ci ? null : ci)}
                      style={{ color: openCategory === ci ? C.gold : 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <span className="flex items-center gap-4">
                        <span style={{ fontSize: '20px' }}>{cat.icon}</span>
                        <span style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: openCategory === ci ? 600 : 400 }}>
                          {cat.title}
                        </span>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
                          {cat.items.length} items
                        </span>
                      </span>
                      <ChevronDown
                        size={14}
                        strokeWidth={1.5}
                        style={{
                          transform: openCategory === ci ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s',
                        }}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openCategory === ci && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          style={{ overflow: 'hidden', listStyle: 'none', padding: 0, margin: 0, paddingBottom: '20px' }}
                        >
                          {cat.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 py-2 pr-8"
                              style={{ fontSize: '13px', color: 'rgba(238,238,238,0.55)', lineHeight: 1.5 }}
                            >
                              <Check size={12} strokeWidth={2} style={{ color: C.gold, flexShrink: 0, marginTop: '3px' }} />
                              {item}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Right: full item list for active category */}
              <div className="hidden lg:block pl-12 pt-4">
                {openCategory !== null && (
                  <motion.div
                    key={`${season.id}-${openCategory}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: '16px' }}>
                      {season.categories[openCategory].icon} {season.categories[openCategory].title}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {season.categories[openCategory].items.map((item, idx) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="flex items-start gap-4 py-3"
                          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px', color: 'rgba(238,238,238,0.65)', lineHeight: 1.6 }}
                        >
                          <span
                            style={{
                              width: '20px',
                              height: '20px',
                              border: `1px solid ${C.gold}`,
                              borderRadius: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '2px',
                            }}
                          >
                            <Check size={10} strokeWidth={2.5} style={{ color: C.gold }} />
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Pro tip */}
                    <div
                      className="mt-8 p-5"
                      style={{ backgroundColor: 'rgba(223,147,7,0.06)', border: '1px solid rgba(223,147,7,0.15)' }}
                    >
                      <p style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, marginBottom: '8px' }}>
                        Guide's Tip
                      </p>
                      <p style={{ fontSize: '13px', color: 'rgba(238,238,238,0.5)', lineHeight: 1.7 }}>
                        {openCategory === 0 && season.id === 'dry-cool' && 'Layering is key in the dry season. Start with thermals at 5am, peel down by 10am. Earth tones blend with the dust  avoid bright colours that spook wildlife.'}
                        {openCategory === 0 && season.id === 'hot-dry' && 'Natural fabrics (linen, cotton) breathe far better than synthetics in 35°C heat. Light colours reflect sun rather than absorbing it.'}
                        {openCategory === 0 && season.id === 'long-rains' && 'Quick-dry fabrics are worth every penny in the wet season. Pack one extra shirt per day  you\'ll need it.'}
                        {openCategory === 0 && season.id === 'short-rains' && 'The short rains are unpredictable. Pack for both scenarios  a warm sunny morning and a dramatic afternoon downpour.'}
                        {openCategory === 1 && 'Closed-toe shoes are essential  thorns, roots, and insects make sandals a poor choice on bush walks. Your guides will notice.'}
                        {openCategory === 2 && 'Altitude on the crater rim means UV is stronger than at sea level. One hour of unprotected skin in the Ngorongoro midday sun can result in serious burn.'}
                        {openCategory === 3 && 'Binoculars transform game drives. The difference between 8× and 10× magnification is significant for distant predators. 42mm objective lens performs well in low dawn light.'}
                        {openCategory === 4 && 'Begin malaria prophylaxis at least 1–2 weeks before travel. Consult a travel health clinic for the most current recommendations for Tanzania.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { label: 'Luggage Allowance', text: 'Most charter flights within Tanzania allow 15kg of soft-sided luggage. Hard suitcases cannot fit in bush planes. We recommend a soft duffel bag.' },
                  { label: 'Laundry Service', text: 'All Gillead partner camps offer laundry service (usually same-day). You can travel lighter than you think  5 days of clothes is enough for a 10-day safari.' },
                  { label: 'What Not to Bring', text: 'Avoid camouflage clothing  it is illegal in some East African countries. Bright colours disturb wildlife. Leave your white sneakers at home.' },
                ].map(({ label, text }) => (
                  <div key={label}>
                    <p style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, marginBottom: '10px' }}>{label}</p>
                    <p style={{ fontSize: '13px', color: 'rgba(238,238,238,0.4)', lineHeight: 1.8 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
