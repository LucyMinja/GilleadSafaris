import { AnimatePresence, motion } from 'motion/react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import type { FormErrors, FormState } from './types';
import { months } from './types';
import type { safariOptions } from './safariOptions';
import { getTomorrow, getDayAfter, formatDate, inputStyle, labelStyle } from './utils';
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
  selectedSafari,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  updateForm: (key: keyof FormState, value: string | number) => void;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  touched: Record<string, boolean>;
  blurValidate: (key: string) => void;
  tomorrow: string;
  selectedSafari: (typeof safariOptions)[number] | undefined;
}) {
  return (
    <div>
      <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 400, color: '#000', marginBottom: '8px' }}>
        Dates &amp; Group Size
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>When would you like to travel?</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p style={labelStyle(errors)}>
            <Calendar size={13} /> Travel Dates
          </p>

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
              style={inputStyle('startDate', errors, touched, form, !errors.startDate && !!form.startDate && form.startDate >= tomorrow)}
            />
            {!errors.startDate && (
              <p style={{ fontSize: '11px', color: '#aaa', marginTop: '6px' }}>
                Earliest available: {formatDate(tomorrow)}
              </p>
            )}
            <ErrorMsg field="startDate" errors={errors} />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block' }}>
              Departure date <span style={{ color: '#aaa', fontSize: '11px' }}>(optional)</span>
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
              <p style={{ fontSize: '11px', color: '#bbb', marginTop: '6px' }}>Select an arrival date first</p>
            )}
            <ErrorMsg field="endDate" errors={errors} />
          </div>

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

        <GroupSizePicker form={form} updateForm={updateForm} selectedSafari={selectedSafari} />
      </div>
    </div>
  );
}
