import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo } from './data';

export default function Lightbox({
  photo,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo | null;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(20,14,8,0.95)' }}
          onClick={onClose}
        >
          <button className="absolute top-4 right-4 p-2 transition-colors hover:text-white" style={{ color: '#C9A97E' }} onClick={onClose}>
            <X size={24} strokeWidth={1.5} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 transition-colors hover:text-white disabled:opacity-20"
            style={{ color: '#C9A97E' }}
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            disabled={index === 0}
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 transition-colors hover:text-white disabled:opacity-20"
            style={{ color: '#C9A97E' }}
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            disabled={index === total - 1}
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>
          <div className="max-w-5xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img src={photo.img} alt={photo.caption} className="max-h-[80vh] w-auto mx-auto object-contain" style={{ borderRadius: '2px' }} />
            <p className="text-center mt-4" style={{ fontFamily: "'Newsreader', Georgia, serif", fontStyle: 'italic', fontSize: '15px', color: '#F1EAE0' }}>{photo.caption}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
