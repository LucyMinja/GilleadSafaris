import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { steps } from './types';

export default function StepProgress({ step, goToStep }: { step: number; goToStep: (i: number) => void }) {
  return (
    <div
      className="sticky top-[96px] z-30"
      style={{ backgroundColor: 'rgba(241,234,224,0.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(109,103,83,0.15)' }}
    >
      <div className="max-w-[1000px] mx-auto px-6 lg:px-16">
        {/* Mobile: compact bar */}
        <div className="lg:hidden py-4">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', fontWeight: 700 }}>
              Step {step + 1} of {steps.length}
            </span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6D6753', opacity: 0.5 }}>
              {steps[step]}
            </span>
          </div>
          <div style={{ height: '3px', backgroundColor: 'rgba(109,103,83,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%', backgroundColor: '#8D694B', borderRadius: '2px' }}
            />
          </div>
        </div>

        {/* Desktop: numbered steps */}
        <div className="hidden lg:flex items-center justify-center gap-0 py-5">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => i < step && goToStep(i)}
                className="flex items-center gap-3 px-4 py-2 transition-all"
                style={{ color: i <= step ? '#8D694B' : '#6D6753', cursor: i < step ? 'pointer' : 'default' }}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center transition-all"
                  style={{
                    borderRadius: '50%',
                    border: i < step ? '1px solid #8D694B' : i === step ? '1.5px solid #8D694B' : '1px solid rgba(109,103,83,0.3)',
                    backgroundColor: i < step ? '#8D694B' : i === step ? 'rgba(141,105,75,0.12)' : 'transparent',
                  }}
                >
                  {i < step
                    ? <Check size={13} color="#ffffff" strokeWidth={2.5} />
                    : <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: i === step ? '#8D694B' : '#6D6753', opacity: i === step ? 1 : 0.5, fontWeight: i === step ? 700 : 400 }}>{i + 1}</span>
                  }
                </div>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: i === step ? 700 : 500, color: i === step ? '#6D6753' : i < step ? '#8D694B' : '#6D6753', opacity: i > step ? 0.5 : 1 }}>
                  {s}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className="w-10 h-px" style={{ backgroundColor: i < step ? '#8D694B' : 'rgba(109,103,83,0.2)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
