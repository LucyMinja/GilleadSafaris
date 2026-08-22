import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import WordLink from '@/app/components/WordLink';
import type { FormErrors, FormState } from './types';
import { safariOptions } from './safariOptions';
import ErrorMsg from './ErrorMsg';

export default function StepSafari({
  form,
  toggleSafari,
  updateForm,
  errors,
  touched,
  blurValidate,
}: {
  form: FormState;
  toggleSafari: (id: string) => void;
  updateForm: (key: keyof FormState, value: string | number | boolean) => void;
  errors: FormErrors;
  touched: Record<string, boolean>;
  blurValidate: (key: string) => void;
}) {
  return (
    <div>
      <div className="text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 600, color: '#6D6753', marginBottom: '10px' }}>
          Choose Your Safari
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', color: '#6D6753', opacity: 0.8, marginBottom: '32px', lineHeight: 1.7 }}>
          Pick one, or select a couple you're deciding between and our team will help you choose. Every itinerary is described in full elsewhere — click through if you want the details first.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {safariOptions.map((safari) => {
          const isSelected = form.safari.includes(safari.id);
          return (
            <div
              key={safari.id}
              className="flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors"
              style={{
                border: `1.5px solid ${isSelected ? '#8D694B' : 'rgba(109,103,83,0.15)'}`,
                borderRadius: '2px',
                backgroundColor: isSelected ? 'rgba(141,105,75,0.07)' : '#ffffff',
              }}
              onClick={() => toggleSafari(safari.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleSafari(safari.id)}
            >
              <div
                className="w-5 h-5 shrink-0 flex items-center justify-center mt-0.5"
                style={{
                  borderRadius: '3px',
                  border: isSelected ? 'none' : '1.5px solid rgba(109,103,83,0.3)',
                  backgroundColor: isSelected ? '#8D694B' : 'transparent',
                }}
              >
                {isSelected && <Check size={12} color="#ffffff" strokeWidth={3} />}
              </div>
              <div className="min-w-0">
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '16px', fontWeight: 600, color: isSelected ? '#8D694B' : '#6D6753', lineHeight: 1.3, marginBottom: '4px' }}>
                  {safari.name}
                </p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', color: '#6D6753', opacity: 0.6, marginBottom: safari.id === 'custom' ? 0 : '8px' }}>{safari.duration}</p>
                {safari.id !== 'custom' && (
                  <div onClick={(e) => e.stopPropagation()} style={{ display: 'inline-block' }}>
                    <WordLink href={`/safaris/${safari.id}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '10px' }}>
                      See What This Package Contains
                    </WordLink>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ErrorMsg field="safari" errors={errors} />

      <AnimatePresence>
        {form.safari.includes('custom') && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-8 p-6"
            style={{ backgroundColor: 'rgba(141,105,75,0.06)', border: '1px solid rgba(109,103,83,0.15)', borderRadius: '2px' }}
          >
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '18px', fontWeight: 600, color: '#6D6753', marginBottom: '6px' }}>
              Describe your dream safari <span style={{ color: '#C0554B' }}>*</span>
            </p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: '#6D6753', opacity: 0.75, marginBottom: '16px', lineHeight: 1.7 }}>
              Tell us anything useful — parks you'd like to visit, accommodation style, pace of travel, special interests, or budget range.
            </p>
            <textarea
              rows={5}
              value={form.specialRequests}
              onChange={(e) => updateForm('specialRequests', e.target.value)}
              onBlur={() => blurValidate('specialRequests')}
              className="w-full outline-none resize-none"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '15px', color: '#6D6753',
                backgroundColor: '#ffffff',
                border: `1.5px solid ${errors.specialRequests ? '#C0554B' : touched.specialRequests && form.specialRequests ? '#5F8D6E' : 'rgba(109,103,83,0.25)'}`,
                borderRadius: '2px', padding: '13px 16px',
                transition: 'border-color 0.2s',
              }}
              placeholder="e.g. 10 days, 2 adults, mix of Serengeti and Zanzibar, mid-range lodges, keen on big cats and birdwatching..."
            />
            <ErrorMsg field="specialRequests" errors={errors} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
