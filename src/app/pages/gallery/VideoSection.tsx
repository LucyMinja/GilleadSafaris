import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { videos, type Video } from './data';

export default function VideoSection({ onSelect }: { onSelect: (v: Video) => void }) {
  return (
    <section className="px-6 lg:px-16 py-16" style={{ backgroundColor: '#FFFFFF' }}>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '16px' }}>Visual Stories</p>
      <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: '#1a1a1a', marginBottom: '32px' }}>Safari Films</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, vi) => (
          <motion.div
            key={video.id}
            className="group cursor-pointer overflow-hidden"
            style={{ borderRadius: '14px', boxShadow: '0 4px 28px rgba(0,0,0,0.08)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: vi * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onSelect(video)}
          >
            <div className="relative overflow-hidden" style={{ height: '220px' }}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${video.thumb})`, backgroundColor: '#8a694f' }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 border-2 border-white/70 rounded-full flex items-center justify-center group-hover:border-[#d3ba8b] group-hover:bg-[#d3ba8b]/20 transition-all">
                  <Play size={20} className="text-white ml-1" />
                </div>
              </div>
            </div>
            <div className="p-5" style={{ backgroundColor: '#ffffff' }}>
              <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '16px', fontWeight: 300, color: '#1a1a1a' }}>{video.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
