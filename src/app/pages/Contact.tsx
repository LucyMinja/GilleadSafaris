'use client';

import { useState, useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import ContactHero from './contact/ContactHero';
import OfficeSection from './contact/OfficeSection';
import FormSection from './contact/FormSection';
import MapSection from './contact/MapSection';

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
      <ContactHero heroRef={heroRef} bgY={bgY} textY={textY} heroOpacity={heroOpacity} />
      <OfficeSection />
      <FormSection form={form} sent={sent} onChange={update} onSubmit={handleSubmit} />
      <MapSection />
    </div>
  );
}
