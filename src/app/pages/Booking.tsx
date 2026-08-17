'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { EMPTY_FORM, steps, type FormErrors, type FormState } from './booking/types';
import { safariOptions } from './booking/safariOptions';
import { getTomorrow, validateStep } from './booking/utils';
import SuccessScreen from './booking/SuccessScreen';
import BookingHero from './booking/BookingHero';
import StepProgress from './booking/StepProgress';
import StepSafari from './booking/StepSafari';
import StepDates from './booking/StepDates';
import StepPersonalInfo from './booking/StepPersonalInfo';
import StepConfirm from './booking/StepConfirm';

export default function Booking() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const formSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textY = useTransform(scrollYProgress, [0, 0.8], ['0%', '45%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const selectedSafari = safariOptions.find((s) => s.id === form.safari);
  const tomorrow = getTomorrow();

  const updateForm = (key: keyof FormState, value: string | number) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const touch = (key: string) => setTouched((t) => ({ ...t, [key]: true }));

  const goToStep = (newStep: number) => {
    if (newStep > step) {
      const errs = validateStep(step, form, tomorrow);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        const keys = Object.keys(errs).reduce((acc, k) => ({ ...acc, [k]: true }), {});
        setTouched((t) => ({ ...t, ...keys }));
        return;
      }
    }
    setErrors({});
    setStep(newStep);
  };

  const blurValidate = (key: string) => {
    touch(key);
    const errs = validateStep(step, form, tomorrow);
    setErrors((prev) => {
      const next = { ...prev };
      if (errs[key]) next[key] = errs[key];
      else delete next[key];
      return next;
    });
  };

  useEffect(() => {
    const el = formSectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [step]);

  if (submitted) {
    return <SuccessScreen form={form} selectedSafari={selectedSafari} />;
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF', fontFamily: "'Lato', sans-serif" }}>
      <BookingHero heroRef={heroRef} bgY={bgY} textY={textY} heroOpacity={heroOpacity} />
      <StepProgress step={step} goToStep={goToStep} />

      <div ref={formSectionRef} className="max-w-5xl mx-auto px-6 lg:px-8 py-12 scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28 }}
          >
            {step === 0 && <StepSafari form={form} updateForm={updateForm} errors={errors} />}
            {step === 1 && (
              <StepDates
                form={form}
                setForm={setForm}
                updateForm={updateForm}
                errors={errors}
                setErrors={setErrors}
                touched={touched}
                blurValidate={blurValidate}
                tomorrow={tomorrow}
                selectedSafari={selectedSafari}
              />
            )}
            {step === 2 && (
              <StepPersonalInfo form={form} updateForm={updateForm} errors={errors} touched={touched} blurValidate={blurValidate} />
            )}
            {step === 3 && <StepConfirm form={form} selectedSafari={selectedSafari} goToStep={goToStep} />}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-10 pt-8" style={{ borderTop: '1px solid #f0e8dc' }}>
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            disabled={step === 0}
            className="btn-secondary disabled:opacity-0 disabled:pointer-events-none"
          >
            <ArrowLeft size={14} /> Back
          </button>

          {step < steps.length - 1 ? (
            <button type="button" onClick={() => goToStep(step + 1)} className="btn-primary">
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button type="button" onClick={() => setSubmitted(true)} className="btn-primary">
              Submit Enquiry <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
