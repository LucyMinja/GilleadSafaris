import RevealOnView from '@/app/pages/home/RevealOnView';
import ContactForm from './ContactForm';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FormState = { name: string; email: string; phone: string; subject: string; message: string };

export default function FormSection({
  form,
  sent,
  onChange,
  onSubmit,
}: {
  form: FormState;
  sent: boolean;
  onChange: (key: string, val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <RevealOnView
      className="lg:col-span-7"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      duration={0.8}
      delay={0.1}
      ease={EASE}
      once={false}
      margin="-80px"
    >
      <div className="p-8 lg:p-10" style={{ backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid rgba(109,103,83,0.12)' }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Get in Touch</p>
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 2.8vw, 36px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.2, marginBottom: '10px' }}>
          Send a Message
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', color: '#6D6753', opacity: 0.75, marginBottom: '32px', lineHeight: 1.7 }}>
          Our safari specialists will be in touch within 24 hours.
        </p>

        <ContactForm form={form} sent={sent} onChange={onChange} onSubmit={onSubmit} />
      </div>
    </RevealOnView>
  );
}
