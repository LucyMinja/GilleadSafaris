import Link from 'next/link';
import { motion } from 'motion/react';
import { Send, Check } from 'lucide-react';

type FormState = { name: string; email: string; phone: string; subject: string; message: string };

const fields = [
  { key: 'name', label: 'Full Name', type: 'text', required: true },
  { key: 'email', label: 'Email Address', type: 'email', required: true },
  { key: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
  { key: 'subject', label: 'Subject', type: 'text', required: false },
] as const;

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
        <div className="w-12 h-12 mb-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(211,186,139,0.18)' }}>
          <Check size={20} className="text-[#d3ba8b]" />
        </div>
        <h3 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '24px', color: '#1a1a1a', marginBottom: '8px' }}>Message Sent</h3>
        <p style={{ fontSize: '14px', color: '#8a7060' }}>We'll reply to {form.email} within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, type, required }) => (
          <div key={key}>
            <label className="text-[#d3ba8b] mb-2 block" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</label>
            <input
              type={type}
              required={required}
              value={form[key as keyof FormState]}
              onChange={e => onChange(key, e.target.value)}
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
          onChange={e => onChange('message', e.target.value)}
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
  );
}
