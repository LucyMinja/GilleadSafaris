import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import type { FormErrors, FormState } from './types';
import { safariOptions } from './safariOptions';
import ErrorMsg from './ErrorMsg';

export default function StepSafari({
  form,
  updateForm,
  errors,
}: {
  form: FormState;
  updateForm: (key: keyof FormState, value: string | number) => void;
  errors: FormErrors;
}) {
  return (
    <div>
      <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 400, color: '#000', marginBottom: '8px' }}>
        Choose Your Safari
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px', lineHeight: 1.6 }}>
        Select one of our set itineraries, or choose "Custom / Bespoke Safari" if you'd like our team to design a trip around your own ideas.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {safariOptions.map((safari) => {
          const isSelected = form.safari === safari.id;
          return (
            <motion.div
              key={safari.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer overflow-hidden"
              style={{
                borderRadius: '14px',
                boxShadow: isSelected
                  ? '0 0 0 2px #8a694f, 0 8px 28px rgba(0,0,0,0.12)'
                  : '0 2px 16px rgba(0,0,0,0.07)',
                transition: 'box-shadow 0.2s',
              }}
              onClick={() => updateForm('safari', safari.id)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && updateForm('safari', safari.id)}
            >
              <div className="relative overflow-hidden" style={{ height: '160px' }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                  style={{ backgroundImage: `url(${safari.img})`, backgroundColor: '#8a694f', transform: isSelected ? 'scale(1.05)' : 'scale(1)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center"
                    style={{ borderRadius: '50%', backgroundColor: '#8a694f', border: '2px solid #d3ba8b' }}
                  >
                    <Check size={13} className="text-[#d3ba8b]" strokeWidth={2.5} />
                  </motion.div>
                )}
              </div>
              <div className="p-4" style={{ backgroundColor: isSelected ? '#fdf9f5' : '#ffffff' }}>
                <p style={{
                  fontFamily: "'DM Serif Display', sans-serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  color: isSelected ? '#8a694f' : '#1a1a1a',
                  marginBottom: '6px',
                  lineHeight: 1.4,
                }}>
                  {safari.name}
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{safari.duration}</span>
                  <span style={{ fontSize: '12px', color: '#d3ba8b', fontFamily: "'DM Serif Display', sans-serif" }}>{safari.price}</span>
                </div>
                {safari.desc && (
                  <p style={{ fontSize: '11px', color: '#8a7060', lineHeight: 1.6, marginTop: '8px', fontWeight: 300 }}>
                    {safari.desc}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <ErrorMsg field="safari" errors={errors} />

      <AnimatePresence>
        {form.safari === 'custom' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-8 p-6"
            style={{ backgroundColor: 'rgba(211,186,139,0.07)', border: '1px solid #e8ddd4', borderRadius: '14px' }}
          >
            <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '17px', color: '#000', marginBottom: '6px' }}>
              Describe your dream safari
            </p>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px', lineHeight: 1.7 }}>
              Tell us anything useful — parks you'd like to visit, accommodation style, pace of travel, special interests, or budget range.
            </p>
            <textarea
              rows={5}
              value={form.specialRequests}
              onChange={(e) => updateForm('specialRequests', e.target.value)}
              className="w-full outline-none resize-none placeholder:text-[#ccc]"
              style={{
                fontSize: '14px', color: '#1a1a1a',
                backgroundColor: '#fff',
                border: '1.5px solid #e8ddd4',
                borderRadius: '10px', padding: '12px 16px',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#d3ba8b')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e8ddd4')}
              placeholder="e.g. 10 days, 2 adults, mix of Serengeti and Zanzibar, mid-range lodges, keen on big cats and birdwatching..."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
