import { motion } from 'motion/react';
import { cuisine } from './data';

export default function CuisineSection() {
  return (
    <section style={{ backgroundColor: '#faf7f4' }} className="py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-60px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-14">
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '16px' }}>Taste Tanzania</p>
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#000000', fontWeight: 400 }}>
            Flavours of East Africa
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cuisine.map((dish, i) => (
            <motion.div key={dish.name}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden"
              style={{ borderRadius: '14px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${dish.img})`, backgroundColor: '#8a694f' }} />
              </div>
              <div className="bg-white p-4">
                <h3 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '16px', color: '#000000', marginBottom: '6px', fontWeight: 500 }}>{dish.name}</h3>
                <p style={{ fontSize: '12px', color: '#555555', lineHeight: 1.6 }}>{dish.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
