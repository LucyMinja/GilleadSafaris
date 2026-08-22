import type { FormErrors, FormState } from './types';

// Returns tomorrow's date as YYYY-MM-DD in local time
export const getTomorrow = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Returns date after startDate as YYYY-MM-DD
export const getDayAfter = (date: string): string => {
  if (!date) return getTomorrow();
  const d = new Date(date + 'T00:00:00');
  d.setDate(d.getDate() + 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const addNights = (date: string, nights: number): string => {
  const d = new Date(date + 'T00:00:00');
  d.setDate(d.getDate() + nights);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Reads the night count straight from a duration string like
// "8 Days / 7 Nights" or "1 Day" — lets the Dates step auto-suggest a
// departure date that actually matches the itinerary the visitor picked,
// instead of leaving two unrelated date pickers for them to reconcile
// themselves.
export const parseNights = (duration: string): number | null => {
  const nightsMatch = duration.match(/(\d+)\s*Night/i);
  if (nightsMatch) return parseInt(nightsMatch[1], 10);
  const daysMatch = duration.match(/(\d+)\s*Day/i);
  if (daysMatch) return Math.max(0, parseInt(daysMatch[1], 10) - 1);
  return null;
};

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isValidPhone = (v: string) => !v.trim() || /^[+]?[\d\s\-().]{7,20}$/.test(v.trim());

export const formatDate = (date: string) =>
  date ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

// Shared input field styles
export const inputStyle = (
  key: string,
  errors: FormErrors,
  touched: Record<string, boolean>,
  form: FormState,
  forceValid?: boolean
): React.CSSProperties => {
  const hasError = !!errors[key];
  const isValid = forceValid || (touched[key] && !errors[key] && !!form[key as keyof FormState]);
  return {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '15px',
    color: '#6D6753',
    backgroundColor: '#ffffff',
    border: `1.5px solid ${hasError ? '#C0554B' : isValid ? '#5F8D6E' : 'rgba(109,103,83,0.25)'}`,
    borderRadius: '2px',
    padding: '13px 16px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };
};

export const labelStyle = (errors: FormErrors, key?: string): React.CSSProperties => ({
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '10px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: key && errors[key] ? '#C0554B' : '#8D694B',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  marginBottom: '10px',
});

export const validateStep = (s: number, form: FormState, tomorrow: string): FormErrors => {
  const errs: FormErrors = {};
  if (s === 0) {
    if (form.safari.length === 0) errs.safari = 'Please select at least one safari package to continue.';
    else if (form.safari.includes('custom') && !form.specialRequests.trim())
      errs.specialRequests = 'Please describe your dream safari so our team knows what to plan.';
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
  if (s === 3) {
    if (!form.consent) errs.consent = 'Please confirm you agree before submitting your enquiry.';
  }
  return errs;
};
