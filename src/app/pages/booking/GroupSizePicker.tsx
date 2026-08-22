import { Users } from 'lucide-react';
import type { FormState, FormErrors } from './types';
import type { safariOptions } from './safariOptions';
import { labelStyle } from './utils';

export default function GroupSizePicker({
  form,
  updateForm,
  selectedSafaris,
}: {
  form: FormState;
  updateForm: (key: keyof FormState, value: string | number | boolean) => void;
  selectedSafaris: (typeof safariOptions)[number][];
}) {
  const noErrors: FormErrors = {};
  return (
    <div>
      <p style={labelStyle(noErrors)}>
        <Users size={13} /> Group Size
      </p>
      <div className="flex flex-col gap-3">
        {[
          { key: 'adults' as const, label: 'Adults', sub: '18 years and over', min: 1 },
          { key: 'children' as const, label: 'Children', sub: 'Under 18 years', min: 0 },
        ].map(({ key, label, sub, min }) => (
          <div
            key={key}
            className="flex items-center justify-between px-5 py-4"
            style={{ border: '1px solid rgba(109,103,83,0.15)', borderRadius: '2px', backgroundColor: '#ffffff' }}
          >
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753', fontWeight: 600 }}>{label}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', color: '#6D6753', opacity: 0.55, marginTop: '2px' }}>{sub}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => updateForm(key, Math.max(min, (form[key] as number) - 1))}
                disabled={(form[key] as number) <= min}
                className="w-9 h-9 flex items-center justify-center transition-all hover:bg-[rgba(141,105,75,0.1)] disabled:opacity-30"
                style={{ border: '1px solid rgba(109,103,83,0.25)', borderRadius: '50%', color: '#8D694B', fontSize: '18px', lineHeight: 1 }}
                aria-label={`Decrease ${label}`}
              >−</button>
              <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '22px', fontWeight: 600, color: '#6D6753', width: '28px', textAlign: 'center', display: 'inline-block' }}>
                {form[key] as number}
              </span>
              <button
                type="button"
                onClick={() => updateForm(key, (form[key] as number) + 1)}
                className="w-9 h-9 flex items-center justify-center transition-all hover:bg-[rgba(141,105,75,0.1)]"
                style={{ border: '1px solid rgba(109,103,83,0.25)', borderRadius: '50%', color: '#8D694B', fontSize: '18px', lineHeight: 1 }}
                aria-label={`Increase ${label}`}
              >+</button>
            </div>
          </div>
        ))}
      </div>

      {selectedSafaris.length > 0 && (
        <div
          className="mt-6 p-5"
          style={{ backgroundColor: 'rgba(141,105,75,0.06)', border: '1px solid rgba(109,103,83,0.15)', borderRadius: '2px' }}
        >
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '10px' }}>
            {selectedSafaris.length > 1 ? `${selectedSafaris.length} Selected` : 'Selected'}
          </p>
          <div className="flex flex-col gap-2">
            {selectedSafaris.map((s) => (
              <div key={s.id}>
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '15px', fontWeight: 600, color: '#6D6753', lineHeight: 1.3 }}>{s.name}</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', color: '#6D6753', opacity: 0.6, marginTop: '1px' }}>{s.duration}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
