import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import SafariButton from '@/app/components/SafariButton';
import WordLink from '@/app/components/WordLink';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FormState = { name: string; email: string; phone: string; subject: string; message: string };

const fields = [
  { key: 'name', label: 'Full Name', type: 'text', required: true },
  { key: 'email', label: 'Email Address', type: 'email', required: true },
  { key: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
  { key: 'subject', label: 'Subject', type: 'text', required: false },
] as const;

const inputStyle: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '15px',
  color: '#6D6753',
  backgroundColor: '#F1EAE0',
  border: '1.5px solid rgba(109,103,83,0.2)',
  borderRadius: '2px',
  padding: '13px 16px',
  transition: 'border-color 0.2s',
  width: '100%',
  outline: 'none',
};

export default function ContactForm({
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
  if (sent) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
          {/* Outward pulse ring, plays once on arrival */}
          <motion.div
            className="absolute inset-0"
            style={{ borderRadius: '50%', border: '1.5px solid #8D694B' }}
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: '#8D694B', borderRadius: '50%' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            <motion.svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="#ffffff"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
              />
            </motion.svg>
          </motion.div>
        </div>
        <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '24px', fontWeight: 600, color: '#6D6753', marginBottom: '8px' }}>Message Sent</h3>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753', opacity: 0.7 }}>We'll reply to {form.email} within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, type, required }) => (
          <div key={key}>
            <label className="mb-2 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B' }}>{label}</label>
            <input
              type={type}
              required={required}
              value={form[key as keyof FormState]}
              onChange={e => onChange(key, e.target.value)}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#8D694B')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(109,103,83,0.25)')}
              placeholder={label}
            />
          </div>
        ))}
      </div>
      <div>
        <label className="mb-2 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B' }}>Your Message</label>
        <textarea
          required rows={5}
          value={form.message}
          onChange={e => onChange('message', e.target.value)}
          className="resize-none"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = '#8D694B')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(109,103,83,0.25)')}
          placeholder="Tell us about your dream safari..."
        />
      </div>
      <div className="flex flex-wrap items-center gap-6 pt-2">
        <SafariButton type="submit">
          Send Message <Send size={13} />
        </SafariButton>
        <WordLink href="/booking">Plan a Safari Directly</WordLink>
      </div>
    </form>
  );
}
