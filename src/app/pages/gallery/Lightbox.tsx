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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          <button className="absolute top-4 right-4 text-[#7A5C45] hover:text-white p-2" onClick={onClose}>
            <X size={24} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A5C45] hover:text-white p-2 disabled:opacity-20"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            disabled={index === 0}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A5C45] hover:text-white p-2 disabled:opacity-20"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            disabled={index === total - 1}
          >
            <ChevronRight size={32} />
          </button>
          <div className="max-w-5xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img src={photo.img.replace('w=800', 'w=1400')} alt={photo.caption} className="max-h-[80vh] w-auto mx-auto object-contain" />
            <p className="text-center text-[#7A5C45] mt-4" style={{ fontSize: '13px', fontStyle: 'italic' }}>{photo.caption}</p>
            <p className="text-center text-[#B09070] mt-1" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{photo.category}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
