import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import type { Video } from './data';

export default function VideoModal({ video, onClose }: { video: Video | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button className="absolute top-4 right-4 text-[#7A5C45] hover:text-white p-2">
            <X size={24} />
          </button>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={video.url}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={video.title}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
