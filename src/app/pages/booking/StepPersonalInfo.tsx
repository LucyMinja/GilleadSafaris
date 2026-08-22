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
  updateForm: (key: keyof FormState, value: string | number | boolean) => void;
  errors: FormErrors;
  touched: Record<string, boolean>;
  blurValidate: (key: string) => void;
}) {
  return (
    <div>
      <div className="text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 600, color: '#6D6753', marginBottom: '10px' }}>
          Your Details
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', color: '#6D6753', opacity: 0.8, marginBottom: '32px' }}>
          We'll use these to prepare your personalised quote. Fields marked <span style={{ color: '#C0554B' }}>*</span> are required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label style={labelStyle(errors, 'firstName') as React.CSSProperties}>
            <User size={12} /> First Name <span style={{ color: '#C0554B' }}>*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => updateForm('firstName', e.target.value)}
            onBlur={() => blurValidate('firstName')}
            style={inputStyle('firstName', errors, touched, form)}
            placeholder="Jane"
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
          />
          <ErrorMsg field="lastName" errors={errors} />
        </div>

        <div>
          <label style={labelStyle(errors, 'email') as React.CSSProperties}>
            <Mail size={12} /> Email Address <span style={{ color: '#C0554B' }}>*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateForm('email', e.target.value)}
            onBlur={() => blurValidate('email')}
            style={inputStyle('email', errors, touched, form)}
            placeholder="jane@example.com"
            autoComplete="email"
          />
          <ErrorMsg field="email" errors={errors} />
          {touched.email && !errors.email && form.email && (
            <p className="flex items-center gap-1.5 mt-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', color: '#5F8D6E' }}>
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
            autoComplete="tel"
          />
          <ErrorMsg field="phone" errors={errors} />
          {!errors.phone && (
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', color: '#6D6753', opacity: 0.55, marginTop: '6px' }}>
              Include country code for WhatsApp contact
            </p>
          )}
        </div>

        <PersonalInfoExtra form={form} updateForm={updateForm} errors={errors} touched={touched} />
      </div>
    </div>
  );
}
