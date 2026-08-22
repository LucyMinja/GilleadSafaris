import { Edit2, Check } from 'lucide-react';
import type { FormErrors, FormState } from './types';
import type { safariOptions } from './safariOptions';
import { formatDate } from './utils';
import ErrorMsg from './ErrorMsg';

export default function StepConfirm({
  form,
  selectedSafaris,
  goToStep,
  updateForm,
  errors,
}: {
  form: FormState;
  selectedSafaris: (typeof safariOptions)[number][];
  goToStep: (i: number) => void;
  updateForm: (key: keyof FormState, value: string | number | boolean) => void;
  errors: FormErrors;
}) {
  const cards = [
    {
      title: selectedSafaris.length > 1 ? `${selectedSafaris.length} Safari Packages` : 'Safari Package',
      editStep: 0,
      lines: (selectedSafaris.length > 0
        ? selectedSafaris.map((s, i) => ({ text: `${s.name} · ${s.duration}`, bold: i === 0 }))
        : [{ text: '—', bold: true }]) as { text: string; bold?: boolean; muted?: boolean }[],
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
  ];

  return (
    <div>
      <div className="text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 600, color: '#6D6753', marginBottom: '10px' }}>
          Review &amp; Submit
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', color: '#6D6753', opacity: 0.8, marginBottom: '32px' }}>
          Please check everything below before submitting your enquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {cards.map(({ title, editStep, lines }) => (
          <div
            key={title}
            className="p-5"
            style={{ backgroundColor: '#ffffff', border: '1px solid rgba(109,103,83,0.15)', borderRadius: '2px' }}
          >
            <div className="flex items-center justify-between mb-3">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#8D694B' }}>
                {title}
              </p>
              <button
                onClick={() => goToStep(editStep)}
                className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8D694B' }}
              >
                <Edit2 size={10} /> Edit
              </button>
            </div>
            <div className="flex flex-col gap-0.5">
              {lines.map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: line.bold ? "'Newsreader', Georgia, serif" : "'Plus Jakarta Sans', sans-serif",
                    fontWeight: line.bold ? 600 : 400,
                    fontSize: line.bold ? '16px' : '14px',
                    color: line.muted ? '#6D6753' : '#6D6753',
                    opacity: line.muted ? 0.55 : line.bold ? 1 : 0.8,
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

      {form.specialRequests && (
        <div className="mb-6 p-5" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(109,103,83,0.15)', borderRadius: '2px' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#8D694B', marginBottom: '8px' }}>
            Special Requests
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: '#6D6753', opacity: 0.85, lineHeight: 1.75 }}>{form.specialRequests}</p>
        </div>
      )}

      <div className="p-5 mb-2" style={{ backgroundColor: 'rgba(141,105,75,0.06)', border: '1px solid rgba(109,103,83,0.15)', borderRadius: '2px' }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', lineHeight: 1.75, color: '#6D6753', opacity: 0.85, marginBottom: '16px' }}>
          By submitting you agree to be contacted by Gillead Safaris Tanzania regarding your trip.
          This is a <strong style={{ color: '#6D6753', opacity: 1 }}>non-binding enquiry</strong> — every itinerary is priced individually for your dates and group size, and no payment is required at this stage.
          Our specialists will respond within 24 hours.
        </p>

        <div
          className="flex items-start gap-3 cursor-pointer"
          onClick={() => updateForm('consent', !form.consent)}
          role="checkbox"
          aria-checked={form.consent}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && updateForm('consent', !form.consent)}
        >
          <div
            className="w-5 h-5 shrink-0 flex items-center justify-center mt-0.5"
            style={{
              borderRadius: '3px',
              border: form.consent ? 'none' : `1.5px solid ${errors.consent ? '#C0554B' : 'rgba(109,103,83,0.4)'}`,
              backgroundColor: form.consent ? '#8D694B' : '#ffffff',
            }}
          >
            {form.consent && <Check size={12} color="#ffffff" strokeWidth={3} />}
          </div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: '#6D6753', lineHeight: 1.5 }}>
            I agree to be contacted about this enquiry <span style={{ color: '#C0554B' }}>*</span>
          </p>
        </div>
        <ErrorMsg field="consent" errors={errors} />
      </div>
    </div>
  );
}
