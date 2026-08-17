import { motion } from 'motion/react';
import { Check, Calendar, Users, Mail } from 'lucide-react';
import type { FormState } from './types';
import type { safariOptions } from './safariOptions';
import { formatDate } from './utils';

export default function SuccessScreen({
  form,
  selectedSafari,
}: {
  form: FormState;
  selectedSafari: (typeof safariOptions)[number] | undefined;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20" style={{ backgroundColor: '#faf7f4' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#8a694f' }}
          >
            <Check size={34} className="text-[#d3ba8b]" strokeWidth={2.5} />
          </motion.div>
        </div>

        <div className="text-center mb-8">
          <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '12px' }}>
            Enquiry Submitted
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '14px', lineHeight: 1.2 }}>
            Safari Request Received
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5a5047' }}>
            Thank you, <strong style={{ color: '#8a694f' }}>{form.firstName}</strong>. Our safari specialists will review
            your enquiry and contact you within 24 hours with a personalised itinerary and quote.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid #e8ddd4' }}>
          <div className="px-6 py-4" style={{ backgroundColor: '#8a694f' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
              Your Safari Enquiry
            </p>
            <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '17px', color: '#ffffff', fontWeight: 300 }}>
              {selectedSafari?.name}
            </p>
          </div>
          <div className="px-6 py-5 space-y-3" style={{ backgroundColor: '#ffffff' }}>
            <div className="flex items-center gap-3" style={{ fontSize: '13px', color: '#5a5047' }}>
              <Calendar size={14} className="text-[#d3ba8b] shrink-0" />
              <span>
                {formatDate(form.startDate)}{form.endDate ? ` → ${formatDate(form.endDate)}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-3" style={{ fontSize: '13px', color: '#5a5047' }}>
              <Users size={14} className="text-[#d3ba8b] shrink-0" />
              <span>
                {form.adults} adult{form.adults !== 1 ? 's' : ''}
                {form.children > 0 ? `, ${form.children} child${form.children !== 1 ? 'ren' : ''}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-3" style={{ fontSize: '13px', color: '#5a5047' }}>
              <Mail size={14} className="text-[#d3ba8b] shrink-0" />
              <span>Confirmation sent to <strong style={{ color: '#1a1a1a' }}>{form.email}</strong></span>
            </div>
          </div>
        </div>

        <p className="text-center" style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.6 }}>
          Need to change something?{' '}
          <a href="mailto:info@gillieadsafaris.com" style={{ color: '#8a694f', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            Email us directly
          </a>{' '}
          or call{' '}
          <a href="tel:+255753959375" style={{ color: '#8a694f', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            +255 753 959 375
          </a>
        </p>
      </motion.div>
    </div>
  );
}
