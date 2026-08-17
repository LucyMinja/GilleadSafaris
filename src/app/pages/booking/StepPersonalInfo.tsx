import { User, Mail, Phone, CheckCircle2 } from 'lucide-react';
import type { FormErrors, FormState } from './types';
import { inputStyle, labelStyle } from './utils';
import ErrorMsg from './ErrorMsg';
import PersonalInfoExtra from './PersonalInfoExtra';

export default function StepPersonalInfo({
  form,
  updateForm,
  errors,
  touched,
  blurValidate,
}: {
  form: FormState;
  updateForm: (key: keyof FormState, value: string | number) => void;
  errors: FormErrors;
  touched: Record<string, boolean>;
  blurValidate: (key: string) => void;
}) {
  return (
    <div>
      <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 400, color: '#000', marginBottom: '8px' }}>
        Your Details
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
        We'll use these to prepare your personalised quote. Fields marked <span style={{ color: '#d95f5f' }}>*</span> are required.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label style={labelStyle(errors, 'firstName') as React.CSSProperties}>
            <User size={12} /> First Name <span style={{ color: '#d95f5f' }}>*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => updateForm('firstName', e.target.value)}
            onBlur={() => blurValidate('firstName')}
            style={inputStyle('firstName', errors, touched, form)}
            placeholder="Jane"
            className="placeholder:text-[#ccc]"
          />
          <ErrorMsg field="firstName" errors={errors} />
        </div>

        <div>
          <label style={labelStyle(errors, 'lastName') as React.CSSProperties}>
            <User size={12} /> Last Name
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => updateForm('lastName', e.target.value)}
            onBlur={() => blurValidate('lastName')}
            style={inputStyle('lastName', errors, touched, form)}
            placeholder="Doe"
            className="placeholder:text-[#ccc]"
          />
          <ErrorMsg field="lastName" errors={errors} />
        </div>

        <div>
          <label style={labelStyle(errors, 'email') as React.CSSProperties}>
            <Mail size={12} /> Email Address <span style={{ color: '#d95f5f' }}>*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateForm('email', e.target.value)}
            onBlur={() => blurValidate('email')}
            style={inputStyle('email', errors, touched, form)}
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

        <div>
          <label style={labelStyle(errors, 'phone') as React.CSSProperties}>
            <Phone size={12} /> Phone / WhatsApp
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateForm('phone', e.target.value)}
            onBlur={() => blurValidate('phone')}
            style={inputStyle('phone', errors, touched, form)}
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

        <PersonalInfoExtra form={form} updateForm={updateForm} errors={errors} touched={touched} />
      </div>
    </div>
  );
}
