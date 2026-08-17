import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#ffffff',
  border: '1.5px solid rgba(141,105,75,0.2)',
  borderRadius: '10px',
  padding: '12px 16px',
  fontSize: '13px',
  color: '#6D6753',
  outline: 'none',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

const focusIn = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = '#8D694B';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(141,105,75,0.1)';
};
const focusOut = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = 'rgba(141,105,75,0.2)';
  e.currentTarget.style.boxShadow = 'none';
};

export default function SubscribeForm({
  name,
  email,
  onNameChange,
  onEmailChange,
  onSubmit,
  onDismiss,
}: {
  name: string;
  email: string;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
    >
      <motion.p
        variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
        style={{ fontSize: '12px', color: 'rgba(109,103,83,0.6)', lineHeight: 1.7, marginBottom: '18px' }}
      >
        Wildlife dispatches, exclusive offers &amp; trip guides — straight to your inbox. No spam, ever.
      </motion.p>

      <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
        <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} style={{ position: 'relative' }}>
          <input
            type="text"
            required
            placeholder="First name"
            value={name}
            onChange={e => onNameChange(e.target.value)}
            style={inputStyle}
            onFocus={focusIn}
            onBlur={focusOut}
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} style={{ position: 'relative' }}>
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            style={inputStyle}
            onFocus={focusIn}
            onBlur={focusOut}
          />
        </motion.div>
        <motion.button
          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(141,105,75,0.35)' }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="flex items-center justify-center gap-2 w-full"
          style={{
            marginTop: '2px',
            backgroundColor: '#8D694B',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '13px 20px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            cursor: 'pointer',
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6D5540')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#8D694B')}
        >
          Subscribe <ArrowRight size={13} strokeWidth={2} />
        </motion.button>
      </form>

      <motion.button
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        onClick={onDismiss}
        style={{ marginTop: '12px', fontSize: '11px', color: 'rgba(109,103,83,0.35)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s', display: 'block', width: '100%', textAlign: 'center' }}
        onMouseOver={e => (e.currentTarget.style.color = '#8D694B')}
        onMouseOut={e => (e.currentTarget.style.color = 'rgba(109,103,83,0.35)')}
      >
        No thanks, I'll miss out
      </motion.button>
    </motion.div>
  );
}
