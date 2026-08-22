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
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Contact Us"
        subtitle="Our team is ready to plan your perfect Tanzania safari."
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-14">
        <OfficeSection />
        <FormSection form={form} sent={sent} onChange={update} onSubmit={handleSubmit} />
      </div>
      <MapSection />
    </div>
  );
}
