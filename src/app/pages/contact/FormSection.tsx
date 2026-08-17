import { motion } from 'motion/react';
import ContactForm from './ContactForm';

type FormState = { name: string; email: string; phone: string; subject: string; message: string };

export default function FormSection({
  form,
  sent,
  onChange,
  onSubmit,
}: {
  form: FormState;
  sent: boolean;
  onChange: (key: string, val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <motion.section
      className="relative flex flex-col lg:flex-row-reverse"
      style={{ backgroundColor: '#ffffff' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
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

      <div className="flex-1 flex flex-col justify-center py-14 px-6 lg:py-20 lg:px-[6vw]">
        <div style={{ maxWidth: '520px', width: '100%' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '12px' }}>Get in Touch</p>
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.15 }}>
            Send a Message
          </h2>
          <p style={{ fontSize: '14px', color: '#8a7060', marginBottom: '36px', lineHeight: 1.7, fontWeight: 300 }}>
            Our safari specialists will be in touch within 24 hours.
          </p>

          <ContactForm form={form} sent={sent} onChange={onChange} onSubmit={onSubmit} />
        </div>
      </div>
    </motion.section>
  );
}
