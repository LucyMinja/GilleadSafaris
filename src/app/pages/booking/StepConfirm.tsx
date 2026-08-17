import { Edit2 } from 'lucide-react';
import type { FormState } from './types';
import type { safariOptions } from './safariOptions';
import { formatDate } from './utils';

export default function StepConfirm({
  form,
  selectedSafari,
  goToStep,
}: {
  form: FormState;
  selectedSafari: (typeof safariOptions)[number] | undefined;
  goToStep: (i: number) => void;
}) {
  const cards = [
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
  ];

  return (
    <div>
      <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 400, color: '#000', marginBottom: '8px' }}>
        Review &amp; Submit
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
        Please check everything below before submitting your enquiry.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {cards.map(({ title, editStep, lines }) => (
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

      {form.specialRequests && (
        <div className="mb-6 p-5" style={{ backgroundColor: '#faf7f4', border: '1px solid #ede8e1', borderRadius: '14px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: '#d3ba8b', marginBottom: '8px' }}>
            Special Requests
          </p>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7 }}>{form.specialRequests}</p>
        </div>
      )}

      <div className="p-5 mb-2" style={{ backgroundColor: 'rgba(211,186,139,0.08)', border: '1px solid #ede8e1', borderRadius: '12px' }}>
        <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#666' }}>
          By submitting you agree to be contacted by Gillead Safaris Tanzania regarding your trip.
          This is a <strong style={{ color: '#1a1a1a' }}>non-binding enquiry</strong> — no payment is required at this stage.
          Our specialists will respond within 24 hours.
        </p>
      </div>
    </div>
  );
}
