'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const sections = [
  {
    id: 1,
    title: 'The Maasai — Warriors of the Plains',
    sub: 'Living Culture',
    img: 'https://images.unsplash.com/photo-1580689402180-61f1ab9d6232?w=1200&h=800&fit=crop&auto=format',
    desc: `The Maasai are synonymous with Tanzania. For centuries, these semi-nomadic pastoralists have roamed the savannas of East Africa in vivid red shukas, their livestock the measure of their wealth and status.

A visit to an authentic Maasai village — known as a boma — offers an intimate window into a culture that has coexisted with wildlife for millennia. Witness the adamu (jumping dance), learn about traditional medicine, and understand how these warriors track lion prides on foot.

Gillead Safaris partners only with villages that have chosen genuine cultural exchange over performance. Your visit directly benefits the community through fair compensation and educational fund contributions.`,
    facts: ['Population: 1.5 million across Tanzania & Kenya', 'The jumping dance (adamu) selects warriors', 'Cattle represent wealth and social status', 'A moran (warrior) must drink blood and milk ceremonially'],
    reverse: false,
  },
  {
    id: 2,
    title: 'Zanzibar Spice Island Heritage',
    sub: 'Stone Town & Swahili Coast',
    img: 'https://images.unsplash.com/photo-1620896712848-d05411ec91ec?w=1200&h=800&fit=crop&auto=format',
    desc: `Zanzibar's Stone Town is a living museum of Swahili civilization — a UNESCO World Heritage Site where Arab, Indian, Persian, and African cultures have been layered over a thousand years of trade into something entirely unique.

The narrow, winding alleyways reveal ornately carved wooden doors (the number of brass studs indicates the owner's wealth), hammams, merchant houses, and the haunting legacy of the Arab slave trade at the Old Slave Market.

Beyond Stone Town, Zanzibar's spice plantations produce cloves, vanilla, nutmeg, cinnamon, and black pepper. A guided spice tour connects food to origin in ways that permanently change how you experience flavour.`,
    facts: ['Stone Town declared UNESCO World Heritage in 2000', 'Over 30 spices grown on the island', 'Arabic, Portuguese, Omani, and British influences', 'The Zanzibar Chest is a famous literary landmark'],
    reverse: true,
  },
  {
    id: 3,
    title: 'The Hadzabe — Last Hunter-Gatherers',
    sub: 'Ancient Ways',
    img: 'https://images.unsplash.com/photo-1623743423143-23df3234ae5c?w=1200&h=800&fit=crop&auto=format',
    desc: `The Hadzabe people of the Lake Eyasi region are one of the last remaining hunter-gatherer communities on earth. They live much as their ancestors did 10,000 years ago — moving with the seasons, hunting with handmade bows, and gathering wild honey and berries.

A dawn walk with Hadzabe hunters is among the most extraordinary cultural experiences available anywhere in the world. They communicate through clicks (a phonemic feature shared with the Khoisan people of Southern Africa), read animal tracks in the dust, and build fires from a friction method mastered over millennia.

These encounters require sensitivity and are offered only to guests who engage with genuine respect. Photography is permitted only with individual consent.`,
    facts: ['One of the oldest languages on earth — using click consonants', 'Population: fewer than 1,300 people remain', 'No concept of land ownership', 'The men hunt; the women gather and prepare'],
    reverse: false,
  },
  {
    id: 4,
    title: 'Wildlife & Conservation Legacy',
    sub: "Tanzania's Guardianship",
    img: 'https://images.unsplash.com/photo-1741850821329-95a6db240037?w=1200&h=800&fit=crop&auto=format',
    desc: `Tanzania protects 38% of its total land area for conservation — more than any other African nation. This extraordinary commitment reflects a deep cultural relationship with wildlife that predates colonialism by thousands of years.

The Ngorongoro Conservation Area is a model of coexistence: Maasai pastoralists live within the world's greatest wildlife sanctuary, managing their cattle alongside buffalo, elephant, and lion in a balance refined over generations.

Gillead Safaris contributes directly to conservation through our Community Wildlife Fund, which supports anti-poaching ranger units, school programs teaching the value of wildlife, and habitat restoration across Northern Tanzania.`,
    facts: ['38% of Tanzania is protected conservation land', 'Over 4 million animals in the Serengeti ecosystem', 'The Ngorongoro Conservation Area — UNESCO designation 1979', 'Tanzanian rangers number over 10,000 across all parks'],
    reverse: true,
  },
];

const cuisine = [
  { name: 'Nyama Choma', desc: 'Roasted meat over open flame — the foundation of Tanzanian celebration', img: 'https://images.unsplash.com/photo-1741850820936-0ce266eccc13?w=600&h=400&fit=crop&auto=format' },
  { name: 'Pilau Rice', desc: 'Zanzibar spiced rice perfumed with cardamom, cloves, and cinnamon', img: 'https://images.unsplash.com/photo-1761078206756-68d3023f3021?w=600&h=400&fit=crop&auto=format' },
  { name: 'Ugali & Sukuma', desc: 'Stiff maize porridge with braised collard greens — the everyday staple', img: 'https://images.unsplash.com/photo-1623951581058-58138db08519?w=600&h=400&fit=crop&auto=format' },
  { name: 'Zanzibar Pizza', desc: 'A delicious street-food hybrid of Indian and African flavours from Forodhani', img: 'https://images.unsplash.com/photo-1694860950114-0979b01c2615?w=600&h=400&fit=crop&auto=format' },
];

export default function Culture() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Lato', sans-serif" }}>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580689402180-61f1ab9d6232?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>People & Heritage</p>
            <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}>
              Culture & Heritage
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '560px', margin: '0 auto' }}>
              Tanzania is not just landscapes and wildlife. It is the Maasai warrior standing at sunset, the Hadzabe hunter reading the morning tracks, the spice-trader's carved door in Stone Town.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Cultural sections — full-width alternating with diagonal cuts */}
      {sections.map((section, i) => {
        const isReverse = section.reverse;
        const textBg = i % 2 === 0 ? '#faf7f4' : '#ffffff';
        return (
          <section
            key={section.id}
            className={`relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            style={{ backgroundColor: textBg, minHeight: 'auto' }}
          >
            {/* Image with diagonal cut */}
            <motion.div
              className={`relative w-full lg:w-[54%] min-h-[420px] lg:min-h-[680px] flex-shrink-0 overflow-hidden ${isReverse ? 'clip-diag-l' : 'clip-diag-r'}`}
              initial={{ opacity: 0, x: isReverse ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${section.img})`,
                  backgroundColor: '#c4a882',
                  transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </motion.div>

            {/* Text panel */}
            <motion.div
              className="flex-1 flex flex-col justify-center px-6 py-12 lg:py-20 lg:px-[6vw]"
              initial={{ opacity: 0, x: isReverse ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ maxWidth: '460px', width: '100%' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>{section.sub}</p>
                <h2 style={{
                  fontFamily: "'DM Serif Display', sans-serif",
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: '#1a1a1a',
                  marginBottom: '28px',
                  letterSpacing: '-0.01em',
                }}>
                  {section.title}
                </h2>
                <div className="space-y-4 mb-10">
                  {section.desc.split('\n\n').map((para, j) => (
                    <p key={j} style={{ fontSize: '15px', lineHeight: 1.9, color: '#5a5047', fontWeight: 300 }}>{para}</p>
                  ))}
                </div>
                <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a694f', marginBottom: '14px' }}>Key Facts</p>
                <ul className="space-y-2.5">
                  {section.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3" style={{ fontSize: '13px', lineHeight: 1.6, color: '#5a5047' }}>
                      <span style={{ color: '#d3ba8b', flexShrink: 0, marginTop: '3px', fontSize: '16px' }}>·</span> {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>
        );
      })}

      {/* Cuisine */}
      <section style={{ backgroundColor: '#faf7f4' }} className="py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-60px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-14">
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '16px' }}>Taste Tanzania</p>
            <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#000000', fontWeight: 400 }}>
              Flavours of East Africa
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cuisine.map((dish, i) => (
              <motion.div key={dish.name}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden"
                style={{ borderRadius: '14px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${dish.img})`, backgroundColor: '#8a694f' }} />
                </div>
                <div className="bg-white p-4">
                  <h3 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '16px', color: '#000000', marginBottom: '6px', fontWeight: 500 }}>{dish.name}</h3>
                  <p style={{ fontSize: '12px', color: '#555555', lineHeight: 1.6 }}>{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1623743423143-23df3234ae5c?w=1920&h=600&fit=crop&auto=format)' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(138,105,79,0.75)' }} />
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 text-center px-6">
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>
            Experience Culture First-Hand
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 40px' }}>
            Our cultural add-ons can be woven into any safari itinerary. Ask us about Maasai village visits, Hadzabe hunting experiences, and Zanzibar spice tours.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/booking" className="btn-primary">
              Build Your Safari <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Ask a Question <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
