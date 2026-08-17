import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function DetailCTA({ destName }: { destName: string }) {
  return (
    <section className="py-20 px-6 text-center" style={{ backgroundColor: '#8a694f' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
        <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 400, color: '#ffffff', marginBottom: '14px' }}>
          Ready to visit {destName.split(' ')[0]}?
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', maxWidth: '440px', margin: '0 auto 36px' }}>
          Our team is based in Arusha and can arrange every detail of your trip.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/booking" className="inline-flex items-center gap-2 rounded-full px-10 py-4 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#ffffff', color: '#000000', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
            Plan Your Safari <ArrowUpRight size={13} strokeWidth={1.5} />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-10 py-4 hover:bg-white/10 transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#ffffff', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Ask a Question
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
