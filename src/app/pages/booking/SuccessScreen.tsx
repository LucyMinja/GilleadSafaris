'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Calendar, Users, Mail } from 'lucide-react';
import type { FormState } from './types';
import type { safariOptions } from './safariOptions';
import { formatDate } from './utils';

export default function SuccessScreen({
  form,
  selectedSafaris,
}: {
  form: FormState;
  selectedSafaris: (typeof safariOptions)[number][];
}) {
  // This screen has no hero image behind it, so the nav's usual
  // scroll-driven transparency would leave pale text with nothing dark to
  // read against — force it solid the moment this screen mounts.
  useEffect(() => {
    window.dispatchEvent(new Event('gillead:force-nav-solid'));
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20" style={{ backgroundColor: '#F1EAE0' }}>
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
            className="w-20 h-20 flex items-center justify-center"
            style={{ backgroundColor: '#8D694B', borderRadius: '50%' }}
          >
            <Check size={34} color="#ffffff" strokeWidth={2.5} />
          </motion.div>
        </div>

        <div className="text-center mb-8">
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>
            Enquiry Submitted
          </p>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 600, color: '#6D6753', marginBottom: '16px', lineHeight: 1.2 }}>
            Safari Request Received
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', lineHeight: 1.8, color: '#6D6753', opacity: 0.85 }}>
            Thank you, <strong style={{ color: '#8D694B' }}>{form.firstName}</strong>. Our safari specialists will review
            your enquiry and contact you within 24 hours with a personalised itinerary and quote.
          </p>
        </div>

        <div className="overflow-hidden mb-4" style={{ border: '1px solid rgba(109,103,83,0.15)', borderRadius: '2px' }}>
          <div className="px-6 py-4" style={{ backgroundColor: '#8D694B' }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '4px' }}>
              Your Safari Enquiry
            </p>
            <div className="flex flex-col gap-0.5">
              {selectedSafaris.map((s) => (
                <p key={s.id} style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '18px', color: '#ffffff', fontWeight: 600 }}>
                  {s.name}
                </p>
              ))}
            </div>
          </div>
          <div className="px-6 py-5 flex flex-col gap-3" style={{ backgroundColor: '#ffffff' }}>
            <div className="flex items-center gap-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: '#6D6753' }}>
              <Calendar size={14} color="#8D694B" style={{ flexShrink: 0 }} />
              <span>
                {formatDate(form.startDate)}{form.endDate ? ` → ${formatDate(form.endDate)}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: '#6D6753' }}>
              <Users size={14} color="#8D694B" style={{ flexShrink: 0 }} />
              <span>
                {form.adults} adult{form.adults !== 1 ? 's' : ''}
                {form.children > 0 ? `, ${form.children} child${form.children !== 1 ? 'ren' : ''}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: '#6D6753' }}>
              <Mail size={14} color="#8D694B" style={{ flexShrink: 0 }} />
              <span>Confirmation sent to <strong style={{ color: '#6D6753' }}>{form.email}</strong></span>
            </div>
          </div>
        </div>

        <p className="text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.6, lineHeight: 1.7 }}>
          Need to change something?{' '}
          <a href="mailto:info@gillieadsafaris.com" style={{ color: '#8D694B', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            Email us directly
          </a>{' '}
          or call{' '}
          <a href="tel:+255753959375" style={{ color: '#8D694B', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            +255 753 959 375
          </a>
        </p>
      </motion.div>
    </div>
  );
}
