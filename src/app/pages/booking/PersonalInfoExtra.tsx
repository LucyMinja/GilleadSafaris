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
  updateForm: (key: keyof FormState, value: string | number | boolean) => void;
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
        />
      </div>

      <div>
        <label style={labelStyle(errors, 'howHeard') as React.CSSProperties}>
          How did you hear about us?
        </label>
        <select
          value={form.howHeard}
          onChange={(e) => updateForm('howHeard', e.target.value)}
          style={{ ...inputStyle('howHeard', errors, touched, form), color: form.howHeard ? '#6D6753' : 'rgba(109,103,83,0.4)' }}
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
          className="w-full outline-none resize-none"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '15px', color: '#6D6753',
            backgroundColor: '#ffffff',
            border: '1.5px solid rgba(109,103,83,0.25)',
            borderRadius: '2px', padding: '13px 16px',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#8D694B')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(109,103,83,0.25)')}
          placeholder="Dietary requirements, mobility needs, special occasions, specific wildlife priorities..."
        />
      </div>
    </>
  );
}
