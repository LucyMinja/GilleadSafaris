import { MapPin } from 'lucide-react';
import type { FormErrors, FormState } from './types';
import { inputStyle, labelStyle } from './utils';

export default function PersonalInfoExtra({
  form,
  updateForm,
  errors,
  touched,
}: {
  form: FormState;
  updateForm: (key: keyof FormState, value: string | number) => void;
  errors: FormErrors;
  touched: Record<string, boolean>;
}) {
  return (
    <>
      <div>
        <label style={labelStyle(errors, 'country') as React.CSSProperties}>
          <MapPin size={12} /> Country of Residence
        </label>
        <input
          type="text"
          value={form.country}
          onChange={(e) => updateForm('country', e.target.value)}
          style={inputStyle('country', errors, touched, form)}
          placeholder="United Kingdom"
          className="placeholder:text-[#ccc]"
        />
      </div>

      <div>
        <label style={labelStyle(errors, 'howHeard') as React.CSSProperties}>
          How did you hear about us?
        </label>
        <select
          value={form.howHeard}
          onChange={(e) => updateForm('howHeard', e.target.value)}
          style={{ ...inputStyle('howHeard', errors, touched, form), color: form.howHeard ? '#1a1a1a' : '#bbb' }}
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

      <div className="lg:col-span-2">
        <label style={labelStyle(errors, 'specialRequests') as React.CSSProperties}>
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
    </>
  );
}
