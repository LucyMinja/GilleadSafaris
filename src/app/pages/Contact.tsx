'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send, Check } from 'lucide-react';

const offices = [
  {
    city: 'Arusha',
    country: 'Tanzania',
    address: 'Arusha, Tanzania',
    phone: '+255 753 959 375',
    email: 'info@gillieadsafaris.com',
    hours: 'Mon–Sat: 8:00am – 6:00pm EAT',
    img: 'https://images.unsplash.com/photo-1623743423143-23df3234ae5c?w=600&h=400&fit=crop&auto=format',
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', fontFamily: "'Lato', sans-serif" }}>
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1573160813959-7ea66e14e673?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>We're Here to Help</p>
            <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}>
              Contact Us
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '480px', margin: '0 auto' }}>
              Our Arusha-based team is ready to plan your perfect Tanzania safari.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 1 — Office info with diagonal image */}
      {offices.map((office) => (
        <motion.section
          key={office.city}
          className="relative flex flex-col lg:flex-row"
          style={{ backgroundColor: '#faf7f4' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Diagonal image panel */}
          <div
            className="group relative w-full lg:w-[50%] min-h-[300px] lg:min-h-[520px] flex-shrink-0 overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 160px) 100%, 0 100%)' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${office.img})`, backgroundColor: '#8a694f' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%)' }} />
          </div>

          {/* Info panel */}
          <div className="flex-1 flex flex-col justify-center py-14 px-6 lg:py-20 lg:px-[6vw]">
            <div style={{ maxWidth: '400px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '10px' }}>Our Office</p>
              <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.15, marginBottom: '28px' }}>
                {office.city}, {office.country}
              </h2>
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3" style={{ fontSize: '14px', color: '#5a5047' }}>
                  <MapPin size={15} className="text-[#d3ba8b] shrink-0 mt-0.5" /> {office.address}
                </div>
                <a href={`tel:${office.phone}`} className="flex items-center gap-3 transition-colors" style={{ fontSize: '14px', color: '#5a5047' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#8a694f')}
                  onMouseOut={e => (e.currentTarget.style.color = '#5a5047')}>
                  <Phone size={15} className="text-[#d3ba8b]" /> {office.phone}
                </a>
                <a href={`mailto:${office.email}`} className="flex items-center gap-3 transition-colors" style={{ fontSize: '14px', color: '#5a5047' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#8a694f')}
                  onMouseOut={e => (e.currentTarget.style.color = '#5a5047')}>
                  <Mail size={15} className="text-[#d3ba8b]" /> {office.email}
                </a>
                <div className="flex items-center gap-3" style={{ fontSize: '14px', color: '#5a5047' }}>
                  <Clock size={15} className="text-[#d3ba8b]" /> {office.hours}
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/gilleadsafaris' },
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/gillead_safaris_' },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-opacity hover:opacity-75"
                    style={{ fontSize: '11px', backgroundColor: 'rgba(211,186,139,0.1)', border: '1px solid rgba(211,186,139,0.3)', color: '#8a694f' }}>
                    <Icon size={13} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* Section 2 — Contact form with reversed diagonal image */}
      <motion.section
        className="relative flex flex-col lg:flex-row-reverse"
        style={{ backgroundColor: '#ffffff' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Diagonal image panel — reversed */}
        <div
          className="group relative w-full lg:w-[50%] min-h-[300px] lg:min-h-[620px] flex-shrink-0 overflow-hidden"
          style={{ clipPath: 'polygon(160px 0, 100% 0, 100% 100%, 0 100%)' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=900&fit=crop&auto=format)', backgroundColor: '#8a694f' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%)' }} />
        </div>

        {/* Form panel */}
        <div className="flex-1 flex flex-col justify-center py-14 px-6 lg:py-20 lg:px-[6vw]">
          <div style={{ maxWidth: '520px', width: '100%' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '12px' }}>Get in Touch</p>
            <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.15 }}>
              Send a Message
            </h2>
            <p style={{ fontSize: '14px', color: '#8a7060', marginBottom: '36px', lineHeight: 1.7, fontWeight: 300 }}>
              Our safari specialists will be in touch within 24 hours.
            </p>

            {sent ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="w-12 h-12 mb-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(211,186,139,0.18)' }}>
                  <Check size={20} className="text-[#d3ba8b]" />
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '24px', color: '#1a1a1a', marginBottom: '8px' }}>Message Sent</h3>
                <p style={{ fontSize: '14px', color: '#8a7060' }}>We'll reply to {form.email} within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', required: true },
                    { key: 'email', label: 'Email Address', type: 'email', required: true },
                    { key: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
                    { key: 'subject', label: 'Subject', type: 'text', required: false },
                  ].map(({ key, label, type, required }) => (
                    <div key={key}>
                      <label className="text-[#d3ba8b] mb-2 block" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</label>
                      <input
                        type={type}
                        required={required}
                        value={form[key as keyof typeof form]}
                        onChange={e => update(key, e.target.value)}
                        className="w-full outline-none placeholder:text-[#bbbbbb]"
                        style={{ fontSize: '13px', color: '#1a1a1a', backgroundColor: '#faf7f4', border: '1.5px solid rgba(211,186,139,0.3)', borderRadius: '10px', padding: '12px 16px', transition: 'border-color 0.2s' }}
                        onFocus={e => (e.currentTarget.style.borderColor = '#d3ba8b')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(211,186,139,0.3)')}
                        placeholder={label}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[#d3ba8b] mb-2 block" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Your Message</label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    className="w-full outline-none resize-none placeholder:text-[#bbbbbb]"
                    style={{ fontSize: '13px', color: '#1a1a1a', backgroundColor: '#faf7f4', border: '1.5px solid rgba(211,186,139,0.3)', borderRadius: '10px', padding: '12px 16px', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#d3ba8b')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(211,186,139,0.3)')}
                    placeholder="Tell us about your dream safari..."
                  />
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button type="submit" className="btn-primary">
                    Send Message <Send size={13} />
                  </button>
                  <span style={{ fontSize: '12px', color: 'rgba(44,24,16,0.4)' }}>or</span>
                  <Link href="/booking" style={{ fontSize: '13px', color: '#8a694f', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.06em' }}>
                    Plan a safari directly →
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* Map placeholder */}
      <section className="h-96 bg-white relative overflow-hidden">
        <iframe
          title="Arusha Tanzania Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=36.58,-3.40,36.74,-3.32&layer=mapnik&marker=-3.3869,36.6820"
          className="w-full h-full border-0"
          style={{ filter: 'invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.8)' }}
        />
        <div className="absolute inset-0 pointer-events-none border-t border-[#d3ba8b]/20" />
      </section>
    </div>
  );
}
