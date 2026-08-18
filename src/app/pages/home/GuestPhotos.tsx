import { motion } from 'motion/react';

// Two offset, framed photos — a magazine-spread collage rather than a
// full-bleed image (explicitly asked to avoid) or another carousel.
export default function GuestPhotos() {
  return (
    <div className="relative" style={{ height: 'clamp(420px, 46vw, 560px)' }}>
      <motion.div
        className="absolute overflow-hidden"
        style={{ top: 0, left: 0, width: '76%', height: '82%', borderRadius: '4px', boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/956A2097.jpg')", backgroundColor: '#8D694B' }} />
      </motion.div>
      <motion.div
        className="absolute overflow-hidden"
        style={{ bottom: 0, right: 0, width: '54%', height: '50%', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.28)', border: '6px solid #F1EAE0' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/nakupenda beachh.jpg')", backgroundColor: '#8D694B' }} />
      </motion.div>
    </div>
  );
}
