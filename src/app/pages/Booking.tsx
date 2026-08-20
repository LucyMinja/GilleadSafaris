'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SafariButton from '@/app/components/SafariButton';
import PageHero from '@/app/components/PageHero';
import { EMPTY_FORM, steps, type FormErrors, type FormState } from './booking/types';
import { safariOptions } from './booking/safariOptions';
import { getTomorrow, validateStep } from './booking/utils';
import SuccessScreen from './booking/SuccessScreen';
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
    <div style={{ backgroundColor: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        eyebrow="Start Your Journey"
        title="Book a Safari"
        subtitle="Tell us where you want to go, when you'd like to travel, and we'll craft the perfect Tanzania safari for you."
      />
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
          <SafariButton
            type="button"
            onClick={() => goToStep(step - 1)}
            disabled={step === 0}
            variant="secondary"
            className="disabled:opacity-0 disabled:pointer-events-none"
          >
            Back
          </SafariButton>

          {step < steps.length - 1 ? (
            <SafariButton type="button" onClick={() => goToStep(step + 1)}>
              Continue
            </SafariButton>
          ) : (
            <SafariButton type="button" onClick={() => setSubmitted(true)}>
              Submit Enquiry
            </SafariButton>
          )}
        </div>
      </div>
    </div>
  );
}
