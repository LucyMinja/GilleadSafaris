'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Award, Heart, Leaf, Users } from 'lucide-react';

const values = [
  {
    icon: <Heart size={22} strokeWidth={1.5} />,
    title: 'Genuine Care',
    desc: 'Every itinerary is crafted with personal attention. We listen first and design second - your trip is never a template.',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&h=700&fit=crop&auto=format',
  },
  {
    icon: <Leaf size={22} strokeWidth={1.5} />,
    title: 'Conservation First',
    desc: "A portion of every booking supports Tanzania's anti-poaching rangers, community schools, and habitat restoration projects.",
    img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=900&h=700&fit=crop&auto=format',
  },
  {
    icon: <Award size={22} strokeWidth={1.5} />,
    title: 'Uncompromising Quality',
    desc: 'We handpick every lodge, driver, and guide. If we would not stay there ourselves, we will not recommend it to you.',
    img: 'https://images.unsplash.com/photo-1595652974621-4a7a0b2caa14?w=900&h=700&fit=crop&auto=format',
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    title: 'Community Benefit',
    desc: 'We partner only with local guides, community-owned camps, and villages that choose authentic cultural exchange.',
    img: 'https://images.unsplash.com/photo-1580689402180-61f1ab9d6232?w=900&h=700&fit=crop&auto=format',
  },
];

const team = [
  {
    name: 'Nicanory Erasto',
    role: 'Reservation Manager',
    bio: 'Nicanory oversees bookings and logistics for every safari, making sure vehicles, lodges, and permits are confirmed and ready well ahead of your arrival in Tanzania.',
    img: '/images/team/nic.png',
  },
  {
    name: 'Dr. Rose Mongi',
    role: 'Team Leader',
    bio: 'Rose leads the Gillead Safaris team, coordinating guides and office staff to keep every itinerary running smoothly from the moment you land to the moment you depart.',
    img: '/images/team/rose.png',
  },
  {
    name: 'Victor Mosses',
    role: 'Customer Consultant',
    bio: 'Victor works directly with guests to understand what they want from their trip, answering questions and tailoring each safari itinerary to their interests and budget.',
    img: '/images/team/vic.png',
  },
  {
    name: 'Faith',
    role: 'Sales and Marketing',
    bio: 'Faith is often the first point of contact for new guests, helping you explore our safari packages and find the right fit for your Tanzania adventure.',
    img: '/images/team/faith.png',
  },
];

const stats = [
  { value: '6+', label: 'Years operating' },
  { value: '4', label: 'Team members' },
  { value: '10', label: 'Safari packages' },
  { value: '2020', label: 'Established' },
];

export default function About() {
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
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>Our Story</p>
            <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}>
              About Gillead Safaris
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '560px', margin: '0 auto' }}>
              A Tanzanian-owned safari company built on honest service, deep local knowledge, and a genuine love for the wild places we call home.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Story section - full-width with diagonal cut */}
      <section className="relative flex flex-col lg:flex-row-reverse" style={{ backgroundColor: '#faf7f4', minHeight: 'auto' }}>
        {/* Image - diagonal cut on left side */}
        <motion.div
          className="relative w-full lg:w-[54%] min-h-[360px] lg:min-h-[720px] flex-shrink-0 overflow-hidden clip-diag-l"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/IMG_1068.jpg')",
              backgroundColor: '#c4a882',
              transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </motion.div>

        {/* Text panel */}
        <motion.div
          className="flex-1 flex flex-col justify-center py-12 px-6 lg:py-20 lg:px-[6vw]"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ maxWidth: '460px', width: '100%' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>Who We Are</p>
            <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 3.5vw, 50px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.15, marginBottom: '28px', letterSpacing: '-0.01em' }}>
              Tanzania's wildlife,<br /><em style={{ color: '#8a694f' }}>your adventure</em>
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.95, color: '#5a5047', marginBottom: '16px', fontWeight: 300 }}>
              Gillead Safaris is a safari and tour operation company based in Arusha, Tanzania - the gateway to Africa's greatest wildlife destinations. We were founded with a single belief: that extraordinary wildlife experiences should be accessible, honest, and deeply rooted in the communities they pass through.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.95, color: '#5a5047', marginBottom: '16px', fontWeight: 300 }}>
              Established in 2020, we have grown from a small team of two guides and a shared vehicle to a full-service operation with our own office in Arusha, a fleet of custom 4×4 safari vehicles, and a network of trusted lodge partners across Northern and Southern Tanzania.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.95, color: '#5a5047', marginBottom: '40px', fontWeight: 300 }}>
              Every itinerary we design is personal. We do not run group departures or cookie-cutter packages - we take the time to understand what you want from Tanzania and build a journey that reflects it.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/safaris" className="btn-primary">
                Our Safaris <ArrowUpRight size={11} strokeWidth={1.5} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats strip */}
      <section style={{ backgroundColor: '#8a694f' }} className="py-16 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 400, color: '#d3ba8b', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginTop: '8px' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values - alternating full-width rows with diagonal cuts */}
      <div style={{ backgroundColor: '#faf7f4' }}>
        <div className="text-center pt-24 pb-10 px-6">
          <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '16px' }}>What Drives Us</p>
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.2 }}>
            Our Values
          </h2>
        </div>
        {values.map((v, i) => {
          const isReverse = i % 2 === 1;
          const textBg = i % 2 === 0 ? '#faf7f4' : '#ffffff';
          return (
            <motion.div
              key={v.title}
              className={`relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              style={{ backgroundColor: textBg, minHeight: 'auto' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image band with diagonal cut */}
              <div
                className={`relative w-full lg:w-[38%] min-h-[240px] lg:min-h-[420px] flex-shrink-0 overflow-hidden ${isReverse ? 'clip-diag-l-sm' : 'clip-diag-r-sm'}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${v.img})` }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.3) 0%, rgba(20,10,4,0.7) 100%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-5 text-center px-10">
                    <div style={{ color: '#d3ba8b', opacity: 0.95 }}>{v.icon}</div>
                    <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              </div>
              {/* Text panel */}
              <div className="flex-1 flex flex-col justify-center py-10 px-6 lg:py-16 lg:px-[6vw]">
                <div style={{ maxWidth: '460px', width: '100%' }}>
                  <h3 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 300, color: '#1a1a1a', marginBottom: '16px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{v.title}</h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#5a5047', fontWeight: 300 }}>{v.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Team */}
      <section className="py-28 px-6 lg:px-20" style={{ backgroundColor: '#faf7f4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '16px' }}>The People Behind Your Safari</p>
            <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.2 }}>
              Meet the Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => {
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 60, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 32px rgba(0,0,0,0.08)' }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: '280px' }}
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <p style={{ fontSize: '13px', lineHeight: 1.85, color: '#5a5047', fontWeight: 300 }}>{member.bio}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <motion.div
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&h=600&fit=crop&auto=format)' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(138,105,79,0.8)' }} />
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 text-center px-6">
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>
            Ready to explore Tanzania?
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', maxWidth: '460px', margin: '0 auto 40px' }}>
            Let us build your perfect safari. Our Arusha-based team is ready to design an itinerary around you.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/booking" className="btn-primary">
              Start Planning <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
