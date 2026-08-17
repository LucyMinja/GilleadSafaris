import { Users } from 'lucide-react';
import type { FormState, FormErrors } from './types';
import type { safariOptions } from './safariOptions';
import { labelStyle } from './utils';

export default function GroupSizePicker({
  form,
  updateForm,
  selectedSafari,
}: {
  form: FormState;
  updateForm: (key: keyof FormState, value: string | number) => void;
  selectedSafari: (typeof safariOptions)[number] | undefined;
}) {
  const noErrors: FormErrors = {};
  return (
    <div>
      <p style={labelStyle(noErrors)}>
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
  );
}
