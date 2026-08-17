import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function SuccessState({ name }: { name: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
      <motion.p
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.1 }}
        style={{ fontSize: '32px', marginBottom: '10px' }}
      >
        🌿
      </motion.p>
      <p style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', color: '#6D6753', marginBottom: '6px' }}>
        Welcome, {name}.
      </p>
      <p style={{ fontSize: '12px', color: 'rgba(109,103,83,0.55)', lineHeight: 1.7 }}>
        Safari stories are on their way to your inbox.
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-1"
        style={{ marginTop: '10px', color: '#8D694B' }}
      >
        <Sparkles size={12} strokeWidth={2} />
        <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Karibu Tanzania</span>
        <Sparkles size={12} strokeWidth={2} />
      </motion.div>
    </motion.div>
  );
}
