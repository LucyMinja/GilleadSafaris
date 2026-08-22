'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const formSectionRef = useRef<HTMLDivElement>(null);
  const skipNextScroll = useRef(true);

  const selectedSafaris = safariOptions.filter((s) => form.safari.includes(s.id));
  const tomorrow = getTomorrow();

  const updateForm = (key: keyof FormState, value: string | number | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  // Some travellers know exactly which one itinerary they want; others are
  // choosing between a couple of options and want our team to help them
  // decide — so safari selection is a toggle-able set, not a single pick.
  const toggleSafari = (id: string) => {
    setForm((f) => ({
      ...f,
      safari: f.safari.includes(id) ? f.safari.filter((s) => s !== id) : [...f.safari, id],
    }));
    setErrors((e) => { const n = { ...e }; delete n.safari; return n; });
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

  const handleSubmit = () => {
    const errs = validateStep(step, form, tomorrow);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      touch('consent');
      return;
    }
    setSubmitted(true);
  };

  // A tour a visitor was already looking at (e.g. "Book This Safari" on its
  // own detail page) carries through via `?tour=<slug>` instead of landing
  // back on a blank step-1 grid they have to re-search — this was the
  // actual source of the "confusing" flow, not just the styling.
  useEffect(() => {
    const tourParam = searchParams.get('tour');
    if (!tourParam) return;
    const match = safariOptions.find((s) => s.id === tourParam);
    if (match) {
      setForm((f) => ({ ...f, safari: [match.id] }));
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skipNextScroll.current) {
      skipNextScroll.current = false;
      return;
    }
    const el = formSectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 160;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [step]);

  if (submitted) {
    return <SuccessScreen form={form} selectedSafaris={selectedSafaris} />;
  }

  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Book a Safari"
        subtitle="Tell us where you want to go, when you'd like to travel, and we'll craft the perfect Tanzania safari for you."
      />
      <StepProgress step={step} goToStep={goToStep} />

      <div ref={formSectionRef} className="max-w-[1000px] mx-auto px-6 lg:px-16 py-14 lg:py-16 scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28 }}
          >
            {step === 0 && (
              <StepSafari form={form} toggleSafari={toggleSafari} updateForm={updateForm} errors={errors} touched={touched} blurValidate={blurValidate} />
            )}
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
                selectedSafaris={selectedSafaris}
              />
            )}
            {step === 2 && (
              <StepPersonalInfo form={form} updateForm={updateForm} errors={errors} touched={touched} blurValidate={blurValidate} />
            )}
            {step === 3 && (
              <StepConfirm form={form} selectedSafaris={selectedSafaris} goToStep={goToStep} updateForm={updateForm} errors={errors} />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-12 pt-8" style={{ borderTop: '1px solid rgba(109,103,83,0.15)' }}>
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
            <SafariButton type="button" onClick={handleSubmit}>
              Submit Enquiry
            </SafariButton>
          )}
        </div>
      </div>
    </div>
  );
}
