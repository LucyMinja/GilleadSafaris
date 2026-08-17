import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { steps } from './types';

export default function StepProgress({ step, goToStep }: { step: number; goToStep: (i: number) => void }) {
  return (
    <div
      className="sticky top-[88px] z-30"
      style={{ backgroundColor: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #f0e8dc' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Mobile: compact bar */}
        <div className="lg:hidden py-4">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8a694f', fontWeight: 600 }}>
              Step {step + 1} of {steps.length}
            </span>
            <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa' }}>
              {steps[step]}
            </span>
          </div>
          <div style={{ height: '3px', backgroundColor: '#f0e8dc', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%', backgroundColor: '#d3ba8b', borderRadius: '2px' }}
            />
          </div>
        </div>

        {/* Desktop: numbered steps */}
        <div className="hidden lg:flex items-center justify-center gap-0 py-5">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => i < step && goToStep(i)}
                className="flex items-center gap-3 px-4 py-2 transition-all rounded-lg"
                style={{ color: i <= step ? '#d3ba8b' : '#aaa', cursor: i < step ? 'pointer' : 'default' }}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center transition-all"
                  style={{
                    borderRadius: '50%',
                    border: i < step ? '1px solid #d3ba8b' : i === step ? '1.5px solid #8a694f' : '1px solid #e0e0e0',
                    backgroundColor: i < step ? '#d3ba8b' : i === step ? 'rgba(211,186,139,0.12)' : 'transparent',
                  }}
                >
                  {i < step
                    ? <Check size={13} className="text-white" strokeWidth={2.5} />
                    : <span style={{ fontSize: '11px', color: i === step ? '#8a694f' : '#aaa', fontWeight: i === step ? 600 : 400 }}>{i + 1}</span>
                  }
                </div>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: i === step ? 700 : 400, color: i === step ? '#1a1a1a' : i < step ? '#d3ba8b' : '#aaa' }}>
                  {s}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className="w-10 h-px" style={{ backgroundColor: i < step ? '#d3ba8b' : '#e8e0d8' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
