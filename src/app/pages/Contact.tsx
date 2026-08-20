'use client';

import { useState } from 'react';
import PageHero from '@/app/components/PageHero';
import OfficeSection from './contact/OfficeSection';
import FormSection from './contact/FormSection';
import MapSection from './contact/MapSection';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        eyebrow="We're Here to Help"
        title="Contact Us"
        subtitle="Our Arusha-based team is ready to plan your perfect Tanzania safari."
      />
      <OfficeSection />
      <FormSection form={form} sent={sent} onChange={update} onSubmit={handleSubmit} />
      <MapSection />
    </div>
  );
}
