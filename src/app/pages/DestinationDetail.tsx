'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';

export const destinationData = [
  {
    slug: 'serengeti',
    name: 'Serengeti National Park',
    region: 'Northern Tanzania',
    heroImg: 'https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?w=1920&h=1080&fit=crop&auto=format',
    tagline: 'The endless plains where life plays out in full.',
    history: [
      'The name "Serengeti" comes from the Maasai word Siringet  meaning "the place where the land runs on forever." For thousands of years, Maasai pastoralists grazed their cattle across these plains alongside lion, elephant, and wildebeest, developing a coexistence with wildlife that shaped the entire ecosystem.',
      'In 1929, the British colonial government declared the area a partial game reserve, and in 1951 the Serengeti became Tanzania\'s first national park. The work of naturalists Bernhard and Michael Grzimek  whose 1959 film "Serengeti Shall Not Die" won an Academy Award  brought the park to global attention and helped establish its final boundaries.',
      'Today the Serengeti is recognised as one of the Seven Natural Wonders of Africa and a UNESCO World Heritage Site. Its 14,763 km² of savanna, woodland, and riverine forest sustain the largest terrestrial mammal migration on earth  over 1.5 million wildebeest, 500,000 gazelle, and 200,000 zebra moving in a continuous clockwise circuit in search of rain and grass.',
    ],
    facts: { size: '14,763 km²', bestTime: 'June – October', animals: 'Lion · Cheetah · Leopard · Elephant · Buffalo · Wildebeest' },
    highlights: ['Great Migration', 'Big Five', 'Hot Air Balloon Safaris', 'Kopjes & Rock Formations', 'Predator Concentrations'],
    relatedTours: [
      { id: 2, name: '3 Days Classic Serengeti Safari', duration: '3 Days / 2 Nights', img: '/images/956A2358.jpg' },
      { id: 4, name: '6 Days Best of Tanzania Safari', duration: '6 Days / 5 Nights', img: '/images/956A3309.jpg' },
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.jpg' },
      { id: 6, name: '8 Days Wildebeest Migration River Crossing', duration: '8 Days / 7 Nights', img: '/images/956A4274.jpg' },
    ],
  },
  {
    slug: 'ngorongoro',
    name: 'Ngorongoro Conservation Area',
    region: 'Northern Tanzania',
    heroImg: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&h=1080&fit=crop&auto=format',
    tagline: 'A world within a crater  ancient, intact, and unforgettable.',
    history: [
      'Ngorongoro Crater was formed around three million years ago when a giant volcano exploded and collapsed inward, creating one of the largest intact calderas on earth. The crater floor  roughly 260 km²  became a self-contained world, sheltering an extraordinary density of wildlife within its 600-metre-high walls.',
      'The Maasai people have lived alongside wildlife in the Ngorongoro highlands for centuries, grazing their cattle on the crater rim and the surrounding plains. When Tanzania\'s national park system was established in the 1950s, the Maasai retained rights within Ngorongoro  making it one of the only protected areas in the world where indigenous communities and wildlife share the same land.',
      'Declared a UNESCO World Heritage Site in 1979, Ngorongoro is also home to Olduvai Gorge  the "Cradle of Mankind"  where paleoanthropologist Louis Leakey discovered some of the oldest hominin fossils ever found, placing human origins in this very landscape.',
    ],
    facts: { size: '8,292 km²', bestTime: 'Year-round', animals: 'Black Rhino · Lion · Elephant · Hippo · Flamingo · Hyena' },
    highlights: ['Volcanic Caldera', 'Black Rhino Sightings', 'Big Five in One Day', 'Olduvai Gorge', 'Maasai Culture'],
    relatedTours: [
      { id: 1, name: '1 Day Ngorongoro Crater Safari', duration: '1 Day', img: '/images/956A3279.jpg' },
      { id: 4, name: '6 Days Best of Tanzania Safari', duration: '6 Days / 5 Nights', img: '/images/956A3309.jpg' },
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.jpg' },
    ],
  },
  {
    slug: 'zanzibar',
    name: 'Zanzibar Archipelago',
    region: 'Indian Ocean Islands',
    heroImg: 'https://images.unsplash.com/photo-1573160813959-7ea66e14e673?w=1920&h=1080&fit=crop&auto=format',
    tagline: 'A thousand years of trade, spice, and ocean breeze.',
    history: [
      'Zanzibar\'s story is one of the most layered in the world. For over a thousand years the island sat at the crossroads of Indian Ocean trade routes, drawing Arab merchants, Persian sailors, Indian traders, and Portuguese explorers  each leaving a mark on its language, architecture, food, and culture.',
      'In the 19th century, Zanzibar became the capital of the Omani Sultanate and one of the most important ports in East Africa  a centre for the clove trade and, tragically, the Arab slave trade. The old slave market in Stone Town  now a cathedral and memorial  bears silent witness to that history.',
      'British rule brought abolition in 1873, and in 1963 Zanzibar became independent before merging with Tanganyika to form Tanzania in 1964. Stone Town was designated a UNESCO World Heritage Site in 2000. Beyond the history, Zanzibar\'s beaches  Nungwi, Kendwa, Paje  rank among the finest in the world.',
    ],
    facts: { size: '2,643 km²', bestTime: 'June – October & Jan – February', animals: 'Humpback Whale · Dolphin · Sea Turtle · Red Colobus Monkey' },
    highlights: ['Stone Town UNESCO Heritage', 'Kendwa & Nungwi Beaches', 'Spice Farm Tours', 'Dolphin Watching', 'Swahili Cuisine'],
    relatedTours: [
      { id: 9, name: '4 Days Zanzibar Kendwa Beach & Stone Town Tour', duration: '4 Days / 3 Nights', img: '/images/stone town.jpg' },
      { id: 10, name: '8 Days Tanzania Cultural Tour', duration: '8 Days / 7 Nights', img: '/images/956A1769.jpg' },
    ],
  },
  {
    slug: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    region: 'Northern Tanzania',
    heroImg: 'https://images.unsplash.com/photo-1621414050946-1a8d2a9d7c5b?w=1920&h=1080&fit=crop&auto=format',
    tagline: "Africa's roof  a summit that changes everyone who climbs it.",
    history: [
      'Kilimanjaro is the highest free-standing mountain in the world, rising 5,895 metres above sea level from the surrounding plains of northern Tanzania. Its three volcanic cones  Kibo, Mawenzi, and Shira  were formed over a million years ago, and Kibo\'s crater still shows signs of geothermal activity.',
      'The Chagga people have lived on Kilimanjaro\'s fertile slopes for centuries, farming coffee, bananas, and maize in the rich volcanic soil. The mountain holds deep spiritual significance in their culture  it is home to their ancestors and the source of rivers that sustain entire communities.',
      'The first recorded summit was reached in 1889 by Hans Meyer and Ludwig Purtscheller. Today over 50,000 people attempt the climb each year via routes including the Lemosho, Machame, Marangu, and Rongai trails  each passing through five distinct climatic zones from tropical rainforest to arctic summit.',
    ],
    facts: { size: '756 km² (park)', bestTime: 'January – March & June – October', animals: 'Elephant · Buffalo · Leopard · Colobus Monkey · Sunbird' },
    highlights: ['Uhuru Peak at 5,895m', 'Five Climatic Zones', 'Glacier Views', 'Chagga Culture', 'Lemosho & Machame Routes'],
    relatedTours: [
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.jpg' },
      { id: 10, name: '8 Days Tanzania Cultural Tour', duration: '8 Days / 7 Nights', img: '/images/956A1769.jpg' },
    ],
  },
  {
    slug: 'tarangire',
    name: 'Tarangire National Park',
    region: 'Northern Tanzania',
    heroImg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&h=1080&fit=crop&auto=format',
    tagline: 'Ancient baobabs, elephant herds, and a river that never runs dry.',
    history: [
      'Tarangire takes its name from the Tarangire River  the only permanent water source in the region during Tanzania\'s long dry season. This single fact shapes the entire ecosystem: every dry season, thousands of animals converge on the riverbanks in one of the most dramatic wildlife concentrations in Africa.',
      'The park was established in 1970, covering 2,850 km² of savanna, woodland, and seasonal swamp. Its character is defined by two things  elephants and baobabs. Tarangire has one of the highest elephant densities in Tanzania, with herds of 300 or more a common sight during the dry season. The ancient baobab trees, some over 1,000 years old, give the landscape a primordial quality unlike any other park in East Africa.',
      'The park hosts exceptional birdlife  over 550 recorded species  making it a favourite among birding enthusiasts. The local Barbaig and Maasai communities have used the surrounding land for centuries, and their relationship with the wildlife corridors connecting Tarangire to the greater ecosystem remains critical to conservation.',
    ],
    facts: { size: '2,850 km²', bestTime: 'June – October', animals: 'Elephant · Lion · Leopard · Gerenuk · Oryx · Python' },
    highlights: ['Giant Elephant Herds', 'Ancient Baobab Trees', '550+ Bird Species', 'Swamp Wildlife', 'Dry Season Spectacle'],
    relatedTours: [
      { id: 3, name: '4 Nights / 5 Days Northern Safari', duration: '5 Days / 4 Nights', img: '/images/elephantsafari.png' },
      { id: 4, name: '6 Days Best of Tanzania Safari', duration: '6 Days / 5 Nights', img: '/images/956A3309.jpg' },
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.jpg' },
    ],
  },
  {
    slug: 'arusha',
    name: 'Arusha National Park',
    region: 'Northern Tanzania',
    heroImg: 'https://images.unsplash.com/photo-1623743423143-23df3234ae5c?w=1920&h=1080&fit=crop&auto=format',
    tagline: 'A wild gem hiding in plain sight  37km from the city.',
    history: [
      'Arusha National Park is the smallest but perhaps the most ecologically diverse park in Tanzania. Established in 1960 and covering just 137 km², it packs an extraordinary range of habitats into a compact space  from the forests of Ngurdoto Crater to the glittering Momella Lakes and the dramatic slopes of Mount Meru, Tanzania\'s second-highest peak at 4,566 metres.',
      'The park sits just 37km east of Arusha town  the safari capital of East Africa  making it the most accessible wilderness in the country. Despite its proximity to the city, Arusha receives a fraction of the visitors that flock to the Serengeti or Ngorongoro, preserving a quiet, intimate atmosphere that is increasingly rare in Tanzanian parks.',
      'The Momella Lakes, fed by underground streams from Mount Meru, attract large flocks of flamingo and other waterbirds. The forests shelter the striking black-and-white colobus monkey, while the open grasslands host giraffe, buffalo, zebra, and waterbuck. On clear days, Kilimanjaro is visible on the horizon  a reminder of the extraordinary landscapes that surround this small but remarkable park.',
    ],
    facts: { size: '137 km²', bestTime: 'October – April (birding)', animals: 'Colobus Monkey · Giraffe · Buffalo · Hippo · Flamingo · Leopard' },
    highlights: ['Ngurdoto Crater', 'Momella Lakes', 'Mount Meru Climb', 'Walking Safaris', 'Kilimanjaro Views'],
    relatedTours: [
      { id: 2, name: '3 Days Classic Serengeti Safari', duration: '3 Days / 2 Nights', img: '/images/956A2358.jpg' },
      { id: 3, name: '4 Nights / 5 Days Northern Safari', duration: '5 Days / 4 Nights', img: '/images/elephantsafari.png' },
      { id: 5, name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', img: '/images/956A2613.jpg' },
    ],
  },
];

export default function DestinationDetail({ slug }: { slug: string }) {
  const dest = destinationData.find((d) => d.slug === slug);
  if (!dest) notFound();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Lato', sans-serif" }}>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dest.heroImg})`, backgroundColor: '#8a694f', y: bgY }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.65) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)' }} />
        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div style={{ width: '28px', height: '1px', backgroundColor: '#d3ba8b' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#d3ba8b' }}>{dest.region}</span>
              <div style={{ width: '28px', height: '1px', backgroundColor: '#d3ba8b' }} />
            </div>
            <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(42px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px', textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}>
              {dest.name}
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', maxWidth: '540px', margin: '0 auto', fontStyle: 'italic', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}>
              {dest.tagline}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* History */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-80px' }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: '24px', height: '1px', backgroundColor: '#d3ba8b' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b' }}>History & Story</span>
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 400, color: '#000000', lineHeight: 1.2, marginBottom: '28px' }}>
              The story behind<br /><em style={{ color: '#8a694f' }}>{dest.name.split(' ')[0]}</em>
            </h2>
            <div className="space-y-5">
              {dest.history.map((para, i) => (
                <p key={i} style={{ fontSize: '15px', lineHeight: 2, color: '#444444', fontWeight: 300 }}>{para}</p>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-80px' }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Size', value: dest.facts.size },
                { label: 'Best Time to Visit', value: dest.facts.bestTime },
                { label: 'Wildlife', value: dest.facts.animals },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-4 p-5" style={{ backgroundColor: '#faf7f4', border: '1px solid #f0e8dc', borderRadius: '12px' }}>
                  <MapPin size={16} strokeWidth={1.5} style={{ color: '#d3ba8b', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '4px' }}>{label}</p>
                    <p style={{ fontSize: '14px', color: '#000000' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6" style={{ backgroundColor: '#8a694f', borderRadius: '14px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '14px' }}>Highlights</p>
              <ul className="space-y-2.5">
                {dest.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.88)' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#d3ba8b', flexShrink: 0 }} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related packages */}
      <section className="py-20 px-6 lg:px-20" style={{ backgroundColor: '#faf7f4' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-60px' }} transition={{ duration: 0.8 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: '24px', height: '1px', backgroundColor: '#d3ba8b' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b' }}>Safari Packages</span>
            </div>
            <div className="flex items-end justify-between">
              <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 400, color: '#000000' }}>
                Safaris that visit {dest.name.split(' ')[0]}
              </h2>
              <Link href="/safaris" className="hidden lg:inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
                style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8a694f' }}>
                All packages <ArrowUpRight size={13} strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dest.relatedTours.map((tour, i) => (
              <motion.div key={tour.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                <Link href={`/safaris?open=${tour.id}`} className="group block" style={{ textDecoration: 'none' }}>
                  <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #f0e8dc' }}>
                    <div className="relative overflow-hidden" style={{ height: '200px' }}>
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${tour.img})`, backgroundColor: '#8a694f' }} />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }} />
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                        <Clock size={11} style={{ color: '#d3ba8b' }} />
                        <span style={{ fontSize: '11px', color: '#d3ba8b' }}>{tour.duration}</span>
                      </div>
                    </div>
                    <div className="bg-white p-4">
                      <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '14px', color: '#000000', lineHeight: 1.4, marginBottom: '10px' }}>{tour.name}</p>
                      <span className="inline-flex items-center gap-1 transition-colors group-hover:text-[#8a694f]"
                        style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#aaaaaa' }}>
                        View details <ArrowUpRight size={10} strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center lg:hidden">
            <Link href="/safaris" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8a694f' }}>
              View all safari packages <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: '#8a694f' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 400, color: '#ffffff', marginBottom: '14px' }}>
            Ready to visit {dest.name.split(' ')[0]}?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', maxWidth: '440px', margin: '0 auto 36px' }}>
            Our team is based in Arusha and can arrange every detail of your trip.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/booking" className="inline-flex items-center gap-2 rounded-full px-10 py-4 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#ffffff', color: '#000000', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
              Plan Your Safari <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-10 py-4 hover:bg-white/10 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#ffffff', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              Ask a Question
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
