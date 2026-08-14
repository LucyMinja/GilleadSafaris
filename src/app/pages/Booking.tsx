'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Check, ArrowRight, ArrowLeft, Calendar, Users, MapPin,
  User, Mail, Phone, AlertCircle, CheckCircle2, Edit2,
} from 'lucide-react';

const steps = ['Safari', 'Dates & Guests', 'Personal Info', 'Confirm'];


const safariOptions = [
  { id: 'ngorongoro-1day', name: '1 Day Ngorongoro Crater Safari', duration: '1 Day', price: 'On Request', img: '/images/956A3279.jpg' },
  { id: 'serengeti-3day', name: '3 Days Classic Serengeti Safari', duration: '3 Days / 2 Nights', price: 'On Request', img: '/images/956A2358.jpg' },
  { id: 'northern-5day', name: '4 Nights / 5 Days Northern Safari', duration: '5 Days / 4 Nights', price: 'On Request', img: '/images/elephantsafari.png' },
  { id: 'tanzania-6day', name: '6 Days Best of Tanzania Safari', duration: '6 Days / 5 Nights', price: 'On Request', img: '/images/956A3309.jpg' },
  { id: 'northern-8day', name: '8 Days Best of Northern Tanzania Safari', duration: '8 Days / 7 Nights', price: 'On Request', img: '/images/956A2613.jpg' },
  { id: 'migration-8day', name: '8 Days Wildebeest Migration River Crossing', duration: '8 Days / 7 Nights', price: 'On Request', img: '/images/956A4274.jpg' },
  { id: 'selous-5day', name: '5 Days Selous Game Reserve & Mikumi National Park', duration: '5 Days / 4 Nights', price: 'On Request', img: '/images/leopard.png' },
  { id: 'ruaha-6day', name: '6 Days Ruaha, Mikumi & Udzungwa National Park', duration: '6 Days / 5 Nights', price: 'On Request', img: '/images/Lionessrock.png' },
  { id: 'zanzibar-4day', name: '4 Days Zanzibar Kendwa Beach & Stone Town Tour', duration: '4 Days / 3 Nights', price: 'On Request', img: '/images/stone town.jpg' },
  { id: 'cultural-8day', name: '8 Days Tanzania Cultural Tour', duration: '8 Days / 7 Nights', price: 'On Request', img: '/images/956A1769.jpg' },
  { id: 'custom', name: 'Custom / Bespoke Safari', duration: 'You choose', price: 'Get a quote', img: '/images/IMG_1068.jpg', desc: "Not seeing what you're after? Pick this, tell us your dates and group size, and add your ideas in the special requests box — our team will design and price an itinerary just for you." },
];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Returns tomorrow's date as YYYY-MM-DD in local time
const getTomorrow = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Returns date after startDate as YYYY-MM-DD
const getDayAfter = (date: string): string => {
  if (!date) return getTomorrow();
  const d = new Date(date + 'T00:00:00');
  d.setDate(d.getDate() + 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isValidPhone = (v: string) => !v.trim() || /^[+]?[\d\s\-().]{7,20}$/.test(v.trim());

type FormErrors = Record<string, string>;
type FormState = {
  safari: string; month: string; year: string;
  adults: number; children: number;
  startDate: string; endDate: string;
  firstName: string; lastName: string;
  email: string; phone: string;
  country: string; specialRequests: string; howHeard: string;
};

const EMPTY_FORM: FormState = {
  safari: '', month: '', year: '2026',
  adults: 2, children: 0,
  startDate: '', endDate: '',
  firstName: '', lastName: '',
  email: '', phone: '',
  country: '', specialRequests: '', howHeard: '',
};

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

  const formatDate = (date: string) =>
    date ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  const validateStep = (s: number): FormErrors => {
    const errs: FormErrors = {};
    if (s === 0) {
      if (!form.safari) errs.safari = 'Please select a safari package to continue.';
    }
    if (s === 1) {
      if (!form.startDate) {
        errs.startDate = 'Please select your arrival date.';
      } else if (form.startDate < tomorrow) {
        errs.startDate = 'Arrival date must be at least one day ahead — we cannot accept same-day or past bookings.';
      }
      if (form.endDate) {
        if (form.startDate && form.endDate <= form.startDate) {
          errs.endDate = 'Departure date must be the day after your arrival date or later.';
        }
      }
    }
    if (s === 2) {
      const fn = form.firstName.trim();
      if (!fn) errs.firstName = 'First name is required.';
      else if (fn.length < 2) errs.firstName = 'Please enter your full first name (at least 2 characters).';

      if (form.lastName.trim().length > 0 && form.lastName.trim().length < 2)
        errs.lastName = 'Please enter your full last name (at least 2 characters).';

      if (!form.email.trim()) errs.email = 'Email address is required.';
      else if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email address (e.g. name@example.com).';

      if (!isValidPhone(form.phone))
        errs.phone = 'Please enter a valid phone number (e.g. +1 234 567 8900).';
    }
    return errs;
  };

  const goToStep = (newStep: number) => {
    if (newStep > step) {
      const errs = validateStep(step);
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

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const blurValidate = (key: string) => {
    touch(key);
    const errs = validateStep(step);
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

  // Shared input field styles
  const inputStyle = (key: string, forceValid?: boolean): React.CSSProperties => {
    const hasError = !!errors[key];
    const isValid = forceValid || (touched[key] && !errors[key] && !!form[key as keyof FormState]);
    return {
      fontSize: '14px',
      color: '#1a1a1a',
      backgroundColor: '#ffffff',
      border: `1.5px solid ${hasError ? '#d95f5f' : isValid ? '#5fa876' : '#e8ddd4'}`,
      borderRadius: '10px',
      padding: '12px 16px',
      width: '100%',
      outline: 'none',
      transition: 'border-color 0.2s',
    };
  };



  const labelStyle = (key?: string): React.CSSProperties => ({
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: key && errors[key] ? '#d95f5f' : '#d3ba8b',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '8px',
  });

  // ── Success screen ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20" style={{ backgroundColor: '#faf7f4' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg"
        >
          {/* Icon */}
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

          {/* Confirmation details */}
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

  // ── Main booking form ────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: '#FFFFFF', fontFamily: "'Lato', sans-serif" }}>

      {/* Hero banner */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>Start Your Journey</p>
            <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}>
              Book a Safari
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '520px', margin: '0 auto' }}>
              Tell us where you want to go, when you'd like to travel, and we'll craft the perfect Tanzania safari for you.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Step progress — sticky */}
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

      {/* Form body */}
      <div ref={formSectionRef} className="max-w-5xl mx-auto px-6 lg:px-8 py-12 scroll-mt-24">

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28 }}
          >

            {/* ── Step 0: Choose Safari ──────────────────────────────────────── */}
            {step === 0 && (
              <div>
                <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 400, color: '#000', marginBottom: '8px' }}>
                  Choose Your Safari
                </h2>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px', lineHeight: 1.6 }}>
                  Select one of our set itineraries, or choose "Custom / Bespoke Safari" if you'd like our team to design a trip around your own ideas.
                </p>

                {/* Safari grid */}
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
                        onClick={() => {
                          updateForm('safari', safari.id);
                          if (errors.safari) setErrors((e) => { const n = { ...e }; delete n.safari; return n; });
                        }}
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

                {/* Safari selection error */}
                <ErrorMsg field="safari" errors={errors} />

                {/* Custom safari textarea */}
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
            )}

            {/* ── Step 1: Dates & Guests ─────────────────────────────────────── */}
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 400, color: '#000', marginBottom: '8px' }}>
                  Dates &amp; Group Size
                </h2>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>When would you like to travel?</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                  {/* Dates */}
                  <div>
                    <p style={labelStyle()}>
                      <Calendar size={13} /> Travel Dates
                    </p>

                    {/* Arrival */}
                    <div className="mb-4">
                      <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block' }}>
                        Arrival date <span style={{ color: '#d95f5f' }}>*</span>
                      </label>
                      <input
                        type="date"
                        value={form.startDate}
                        min={tomorrow}
                        onChange={(e) => {
                          const value = e.target.value;
                          const parsed = value ? new Date(value + 'T00:00:00') : null;
                          setForm((f) => ({
                            ...f,
                            startDate: value,
                            month: parsed ? months[parsed.getMonth()] : f.month,
                            year: parsed ? String(parsed.getFullYear()) : f.year,
                            endDate: f.endDate && f.endDate <= value ? '' : f.endDate,
                          }));
                          setErrors((e) => { const n = { ...e }; delete n.startDate; return n; });
                        }}
                        onBlur={() => blurValidate('startDate')}
                        className="w-full outline-none"
                        style={inputStyle('startDate', !errors.startDate && !!form.startDate && form.startDate >= tomorrow)}
                      />
                      {/* Hint */}
                      {!errors.startDate && (
                        <p style={{ fontSize: '11px', color: '#aaa', marginTop: '6px' }}>
                          Earliest available: {formatDate(tomorrow)}
                        </p>
                      )}
                      <ErrorMsg field="startDate" errors={errors} />
                    </div>

                    {/* Departure */}
                    <div>
                      <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block' }}>
                        Departure date <span style={{ color: '#aaa', fontSize: '11px' }}>(optional)</span>
                      </label>
                      <input
                        type="date"
                        value={form.endDate}
                        min={form.startDate ? getDayAfter(form.startDate) : getTomorrow()}
                        onChange={(e) => {
                          updateForm('endDate', e.target.value);
                        }}
                        onBlur={() => blurValidate('endDate')}
                        disabled={!form.startDate}
                        className="w-full outline-none"
                        style={{
                          ...inputStyle('endDate', !errors.endDate && !!form.endDate && form.startDate < form.endDate),
                          opacity: !form.startDate ? 0.45 : 1,
                          cursor: !form.startDate ? 'not-allowed' : 'pointer',
                        }}
                      />
                      {!form.startDate && (
                        <p style={{ fontSize: '11px', color: '#bbb', marginTop: '6px' }}>Select an arrival date first</p>
                      )}
                      <ErrorMsg field="endDate" errors={errors} />
                    </div>

                    {/* Duration display */}
                    <AnimatePresence>
                      {form.startDate && form.endDate && !errors.startDate && !errors.endDate && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="mt-4 flex items-center gap-2 px-4 py-3"
                          style={{ backgroundColor: 'rgba(95,168,118,0.08)', border: '1px solid rgba(95,168,118,0.25)', borderRadius: '10px' }}
                        >
                          <CheckCircle2 size={14} style={{ color: '#5fa876', flexShrink: 0 }} />
                          <p style={{ fontSize: '13px', color: '#3d7a52' }}>
                            {(() => {
                              const nights = Math.round(
                                (new Date(form.endDate + 'T00:00:00').getTime() - new Date(form.startDate + 'T00:00:00').getTime())
                                / (1000 * 60 * 60 * 24)
                              );
                              return `${nights} night${nights !== 1 ? 's' : ''} · ${formatDate(form.startDate)} → ${formatDate(form.endDate)}`;
                            })()}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Group size */}
                  <div>
                    <p style={labelStyle()}>
                      <Users size={13} /> Group Size
                    </p>
                    <div className="space-y-3">
                      {[
                        { key: 'adults' as const, label: 'Adults', sub: '18 years and over', min: 1 },
                        { key: 'children' as const, label: 'Children', sub: 'Under 18 years', min: 0 },
                      ].map(({ key, label, sub, min }) => (
                        <div
                          key={key}
                          className="flex items-center justify-between px-5 py-4"
                          style={{ border: '1px solid #f0e8dc', borderRadius: '12px', backgroundColor: '#fdfaf7' }}
                        >
                          <div>
                            <p style={{ fontSize: '14px', color: '#1a1a1a', fontWeight: 500 }}>{label}</p>
                            <p style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{sub}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => updateForm(key, Math.max(min, (form[key] as number) - 1))}
                              disabled={(form[key] as number) <= min}
                              className="w-9 h-9 flex items-center justify-center transition-all hover:bg-[#f0e8dc] disabled:opacity-30"
                              style={{ border: '1px solid #e8ddd4', borderRadius: '50%', color: '#8a694f', fontSize: '18px', lineHeight: 1 }}
                              aria-label={`Decrease ${label}`}
                            >−</button>
                            <span style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '22px', color: '#1a1a1a', width: '28px', textAlign: 'center', display: 'inline-block' }}>
                              {form[key] as number}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateForm(key, (form[key] as number) + 1)}
                              className="w-9 h-9 flex items-center justify-center transition-all hover:bg-[#f0e8dc]"
                              style={{ border: '1px solid #e8ddd4', borderRadius: '50%', color: '#8a694f', fontSize: '18px', lineHeight: 1 }}
                              aria-label={`Increase ${label}`}
                            >+</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Selected safari summary */}
                    {selectedSafari && (
                      <div
                        className="mt-6 p-5 flex items-start gap-4"
                        style={{ backgroundColor: 'rgba(211,186,139,0.1)', border: '1px solid #e8ddd4', borderRadius: '12px' }}
                      >
                        <div
                          className="w-12 h-12 shrink-0 rounded-lg bg-cover bg-center"
                          style={{ backgroundImage: `url(${selectedSafari.img})`, backgroundColor: '#8a694f' }}
                        />
                        <div>
                          <p style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '4px' }}>Selected</p>
                          <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '15px', color: '#1a1a1a', lineHeight: 1.3 }}>{selectedSafari.name}</p>
                          <p style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{selectedSafari.duration}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Personal Info ─────────────────────────────────────── */}
            {step === 2 && (

              <div>
                <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 400, color: '#000', marginBottom: '8px' }}>
                  Your Details
                </h2>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
                  We'll use these to prepare your personalised quote. Fields marked <span style={{ color: '#d95f5f' }}>*</span> are required.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">

                  {/* First name */}
                  <div>
                    <label style={labelStyle('firstName') as React.CSSProperties}>
                      <User size={12} /> First Name <span style={{ color: '#d95f5f' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => updateForm('firstName', e.target.value)}
                      onBlur={() => blurValidate('firstName')}
                      style={inputStyle('firstName')}
                      placeholder="Jane"
                      className="placeholder:text-[#ccc]"
                    />
                    <ErrorMsg field="firstName" errors={errors} />
                  </div>

                  {/* Last name */}
                  <div>
                    <label style={labelStyle('lastName') as React.CSSProperties}>
                      <User size={12} /> Last Name
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => updateForm('lastName', e.target.value)}
                      onBlur={() => blurValidate('lastName')}
                      style={inputStyle('lastName')}
                      placeholder="Doe"
                      className="placeholder:text-[#ccc]"
                    />
                    <ErrorMsg field="lastName" errors={errors} />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle('email') as React.CSSProperties}>
                      <Mail size={12} /> Email Address <span style={{ color: '#d95f5f' }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      onBlur={() => blurValidate('email')}
                      style={inputStyle('email')}
                      placeholder="jane@example.com"
                      className="placeholder:text-[#ccc]"
                      autoComplete="email"
                    />
                    <ErrorMsg field="email" errors={errors} />
                    {touched.email && !errors.email && form.email && (
                      <p className="flex items-center gap-1.5 mt-1.5" style={{ fontSize: '12px', color: '#5fa876' }}>
                        <CheckCircle2 size={12} /> Looks good
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle('phone') as React.CSSProperties}>
                      <Phone size={12} /> Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      onBlur={() => blurValidate('phone')}
                      style={inputStyle('phone')}
                      placeholder="+1 234 567 8900"
                      className="placeholder:text-[#ccc]"
                      autoComplete="tel"
                    />
                    <ErrorMsg field="phone" errors={errors} />
                    {!errors.phone && (
                      <p style={{ fontSize: '11px', color: '#aaa', marginTop: '6px' }}>
                        Include country code for WhatsApp contact
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label style={labelStyle('country') as React.CSSProperties}>
                      <MapPin size={12} /> Country of Residence
                    </label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => updateForm('country', e.target.value)}
                      style={inputStyle('country')}
                      placeholder="United Kingdom"
                      className="placeholder:text-[#ccc]"
                    />
                  </div>

                  {/* How did you hear */}
                  <div>
                    <label style={labelStyle('howHeard') as React.CSSProperties}>
                      How did you hear about us?
                    </label>
                    <select
                      value={form.howHeard}
                      onChange={(e) => updateForm('howHeard', e.target.value)}
                      style={{ ...inputStyle('howHeard'), color: form.howHeard ? '#1a1a1a' : '#bbb' }}
                    >
                      <option value="" disabled>Select one…</option>
                      <option value="google">Google Search</option>
                      <option value="tripadvisor">TripAdvisor</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="referral">Friend / Family referral</option>
                      <option value="travel-agent">Travel Agent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Special requests */}
                  <div className="lg:col-span-2">
                    <label style={labelStyle('specialRequests') as React.CSSProperties}>
                      Special Requests or Questions
                    </label>
                    <textarea
                      value={form.specialRequests}
                      onChange={(e) => updateForm('specialRequests', e.target.value)}
                      rows={4}
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
                      placeholder="Dietary requirements, mobility needs, special occasions, specific wildlife priorities..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 4: Confirm ───────────────────────────────────────────── */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 400, color: '#000', marginBottom: '8px' }}>
                  Review &amp; Submit
                </h2>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
                  Please check everything below before submitting your enquiry.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      title: 'Safari Package',
                      editStep: 0,
                      lines: [
                        { text: selectedSafari?.name || '—', bold: true },
                        { text: `${selectedSafari?.duration} · ${selectedSafari?.price}` },
                      ],
                    },
                    {
                      title: 'Travel Dates',
                      editStep: 1,
                      lines: [
                        { text: formatDate(form.startDate), bold: true },
                        { text: form.endDate ? `Until ${formatDate(form.endDate)}` : 'Return date not specified' },
                        form.startDate && form.endDate ? {
                          text: `${Math.round((new Date(form.endDate + 'T00:00:00').getTime() - new Date(form.startDate + 'T00:00:00').getTime()) / (1000 * 60 * 60 * 24))} nights`,
                          muted: true,
                        } : null,
                      ].filter(Boolean) as { text: string; bold?: boolean; muted?: boolean }[],
                    },
                    {
                      title: 'Group Size',
                      editStep: 1,
                      lines: [
                        { text: `${form.adults} adult${form.adults !== 1 ? 's' : ''}`, bold: true },
                        { text: form.children > 0 ? `${form.children} child${form.children !== 1 ? 'ren' : ''}` : 'No children' },
                      ],
                    },
                    {
                      title: 'Your Details',
                      editStep: 2,
                      lines: [
                        { text: `${form.firstName} ${form.lastName}`.trim(), bold: true },
                        { text: form.email },
                        { text: form.phone || '—', muted: !form.phone },
                        form.country ? { text: form.country, muted: true } : null,
                      ].filter(Boolean) as { text: string; bold?: boolean; muted?: boolean }[],
                    },
                  ].map(({ title, editStep, lines }) => (
                    <div
                      key={title}
                      className="p-5"
                      style={{ backgroundColor: '#faf7f4', border: '1px solid #ede8e1', borderRadius: '14px' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: '#d3ba8b' }}>
                          {title}
                        </p>
                        <button
                          onClick={() => goToStep(editStep)}
                          className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                          style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a694f' }}
                        >
                          <Edit2 size={10} /> Edit
                        </button>
                      </div>
                      <div className="space-y-0.5">
                        {lines.map((line, i) => (
                          <p
                            key={i}
                            style={{
                              fontFamily: line.bold ? "'DM Serif Display', sans-serif" : "'Lato', sans-serif",
                              fontSize: line.bold ? '15px' : '13px',
                              color: line.muted ? '#aaa' : line.bold ? '#1a1a1a' : '#555',
                              lineHeight: 1.5,
                            }}
                          >
                            {line.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Special requests if present */}
                {form.specialRequests && (
                  <div className="mb-6 p-5" style={{ backgroundColor: '#faf7f4', border: '1px solid #ede8e1', borderRadius: '14px' }}>
                    <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: '#d3ba8b', marginBottom: '8px' }}>
                      Special Requests
                    </p>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7 }}>{form.specialRequests}</p>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="p-5 mb-2" style={{ backgroundColor: 'rgba(211,186,139,0.08)', border: '1px solid #ede8e1', borderRadius: '12px' }}>
                  <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#666' }}>
                    By submitting you agree to be contacted by Gillead Safaris Tanzania regarding your trip.
                    This is a <strong style={{ color: '#1a1a1a' }}>non-binding enquiry</strong> — no payment is required at this stage.
                    Our specialists will respond within 24 hours.
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
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
            <button
              type="button"
              onClick={() => goToStep(step + 1)}
              className="btn-primary"
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} className="btn-primary">
              Submit Enquiry <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline error message component
function ErrorMsg({ field, errors }: { field: string; errors: FormErrors }) {
  return (
    <AnimatePresence>
      {errors[field] && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex items-start gap-1.5 mt-2"
          style={{ fontSize: '12px', color: '#d95f5f', lineHeight: 1.45 }}
        >
          <AlertCircle size={13} className="mt-0.5 shrink-0" />
          {errors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
