import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock } from 'lucide-react';

export default function RelatedTours({
  dest,
}: {
  dest: { name: string; relatedTours: { id: number; name: string; duration: string; img: string }[] };
}) {
  return (
    <section className="py-20 px-6 lg:px-20" style={{ backgroundColor: '#faf7f4' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-60px' }} transition={{ duration: 0.8 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: '24px', height: '1px', backgroundColor: '#d3ba8b' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b' }}>Safari Packages</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 400, color: '#000000' }}>
              Safaris that visit {dest.name.split(' ')[0]}
            </h2>
            <Link href="/safaris" className="hidden lg:inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8a694f' }}>
              All packages <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dest.relatedTours.map((tour, i) => (
            <motion.div key={tour.id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <Link href={`/safaris?open=${tour.id}`} className="group block" style={{ textDecoration: 'none' }}>
                <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #f0e8dc' }}>
                  <div className="relative overflow-hidden" style={{ height: '200px' }}>
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${tour.img})`, backgroundColor: '#8a694f' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }} />
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                      <Clock size={11} style={{ color: '#d3ba8b' }} />
                      <span style={{ fontSize: '11px', color: '#d3ba8b' }}>{tour.duration}</span>
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '14px', color: '#000000', lineHeight: 1.4, marginBottom: '10px' }}>{tour.name}</p>
                    <span className="inline-flex items-center gap-1 transition-colors group-hover:text-[#8a694f]"
                      style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#aaaaaa' }}>
                      View details <ArrowUpRight size={10} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <Link href="/safaris" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8a694f' }}>
            View all safari packages <ArrowUpRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
