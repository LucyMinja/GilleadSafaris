import { motion } from 'motion/react';
import { X } from 'lucide-react';

export default function PopupHero({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="relative overflow-hidden" style={{ height: '220px' }}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=500&fit=crop&auto=format')" }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.08) 0%, rgba(20,10,4,0.82) 100%)' }} />

      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{ height: '3px', background: 'linear-gradient(90deg, #8D694B, #8D694B, #8D694B)', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 18 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDismiss}
        className="absolute top-4 right-4 flex items-center justify-center"
        style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'background-color 0.2s, transform 0.25s' }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)')}
      >
        <X size={13} strokeWidth={2.5} />
      </motion.button>

      <div className="absolute bottom-5 left-6 right-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{ fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '8px' }}
        >
          Gillead Safaris · Tanzania
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Newsreader', serif", fontSize: '26px', color: '#ffffff', lineHeight: 1.15, fontWeight: 600, margin: 0 }}
        >
          The wild is waiting.<br />
          Are you ready?
        </motion.h3>
      </div>
    </div>
  );
}
