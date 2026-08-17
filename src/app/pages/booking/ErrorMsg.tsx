import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import type { FormErrors } from './types';

export default function ErrorMsg({ field, errors }: { field: string; errors: FormErrors }) {
  return (
    <AnimatePresence>
      {errors[field] && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex items-start gap-1.5 mt-2"
          style={{ fontSize: '12px', color: '#d95f5f', lineHeight: 1.45 }}
        >
          <AlertCircle size={13} className="mt-0.5 shrink-0" />
          {errors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
