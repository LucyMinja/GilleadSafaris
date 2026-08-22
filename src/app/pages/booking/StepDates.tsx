import { AnimatePresence, motion } from 'motion/react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import type { FormErrors, FormState } from './types';
import { months } from './types';
import type { safariOptions } from './safariOptions';
import { getTomorrow, getDayAfter, addNights, parseNights, formatDate, inputStyle, labelStyle } from './utils';
import ErrorMsg from './ErrorMsg';
import GroupSizePicker from './GroupSizePicker';

export default function StepDates({
  form,
  setForm,
  updateForm,
  errors,
  setErrors,
  touched,
  blurValidate,
  tomorrow,
  selectedSafaris,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  updateForm: (key: keyof FormState, value: string | number | boolean) => void;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  touched: Record<string, boolean>;
  blurValidate: (key: string) => void;
  tomorrow: string;
  selectedSafaris: (typeof safariOptions)[number][];
}) {
  // With more than one package selected there's no single "the" duration to
  // suggest from, so the auto-fill only kicks in for a single, non-custom
  // pick — otherwise the two date fields just stay independent.
  const primarySafari = selectedSafaris.length === 1 ? selectedSafaris[0] : undefined;
  const knownNights = primarySafari && primarySafari.id !== 'custom' ? parseNights(primarySafari.duration) : null;

  return (
    <div>
      <div className="text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 600, color: '#6D6753', marginBottom: '10px' }}>
          Dates &amp; Group Size
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', color: '#6D6753', opacity: 0.8, marginBottom: '32px' }}>
          {knownNights
            ? `When would you like to travel? We've pre-filled ${knownNights} night${knownNights !== 1 ? 's' : ''} to match "${primarySafari!.name}" — adjust it if you'd like a different length.`
            : 'When would you like to travel?'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p style={labelStyle(errors)}>
            <Calendar size={13} /> Travel Dates
          </p>

          <div className="mb-4">
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.7, marginBottom: '8px', display: 'block' }}>
              Arrival date <span style={{ color: '#C0554B' }}>*</span>
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
                  // Auto-suggest a departure date matching the chosen
                  // safari's real length instead of leaving two disconnected
                  // pickers — only when the visitor hasn't already set their
                  // own end date, so this never overwrites a manual choice.
                  endDate: value && knownNights != null && !f.endDate
                    ? addNights(value, knownNights)
                    : f.endDate && f.endDate <= value ? '' : f.endDate,
                }));
                setErrors((e) => { const n = { ...e }; delete n.startDate; return n; });
              }}
              onBlur={() => blurValidate('startDate')}
              className="w-full outline-none"
              style={inputStyle('startDate', errors, touched, form, !errors.startDate && !!form.startDate && form.startDate >= tomorrow)}
            />
            {!errors.startDate && (
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', color: '#6D6753', opacity: 0.55, marginTop: '6px' }}>
                Earliest available: {formatDate(tomorrow)}
              </p>
            )}
            <ErrorMsg field="startDate" errors={errors} />
          </div>

          <div>
            <label style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#6D6753', opacity: 0.7, marginBottom: '8px', display: 'block' }}>
              Departure date <span style={{ color: '#6D6753', opacity: 0.5, fontSize: '12px' }}>(optional)</span>
            </label>
            <input
              type="date"
              value={form.endDate}
              min={form.startDate ? getDayAfter(form.startDate) : getTomorrow()}
              onChange={(e) => updateForm('endDate', e.target.value)}
              onBlur={() => blurValidate('endDate')}
              disabled={!form.startDate}
              className="w-full outline-none"
              style={{
                ...inputStyle('endDate', errors, touched, form, !errors.endDate && !!form.endDate && form.startDate < form.endDate),
                opacity: !form.startDate ? 0.45 : 1,
                cursor: !form.startDate ? 'not-allowed' : 'pointer',
              }}
            />
            {!form.startDate && (
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', color: '#6D6753', opacity: 0.45, marginTop: '6px' }}>Select an arrival date first</p>
            )}
            <ErrorMsg field="endDate" errors={errors} />
          </div>

          <AnimatePresence>
            {form.startDate && form.endDate && !errors.startDate && !errors.endDate && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 px-4 py-3"
                style={{ backgroundColor: 'rgba(95,141,110,0.08)', border: '1px solid rgba(95,141,110,0.3)', borderRadius: '2px' }}
              >
                <CheckCircle2 size={14} color="#5F8D6E" style={{ flexShrink: 0 }} />
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#3d6b4d' }}>
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

        <GroupSizePicker form={form} updateForm={updateForm} selectedSafaris={selectedSafaris} />
      </div>
    </div>
  );
}
