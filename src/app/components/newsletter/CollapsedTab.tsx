import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function CollapsedTab({ onExpand }: { onExpand: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      onClick={onExpand}
      className="fixed z-[200] flex items-center gap-2"
      style={{
        bottom: '20px',
        right: '20px',
        padding: '12px 18px',
        borderRadius: '100px',
        backgroundColor: '#8D694B',
        color: '#F1EAE0',
        border: '1px solid rgba(141,105,75,0.4)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
        cursor: 'pointer',
      }}
    >
      <Sparkles size={13} strokeWidth={2} />
      <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Join our list
      </span>
    </motion.button>
  );
}
