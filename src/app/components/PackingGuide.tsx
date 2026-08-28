'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { seasons } from './packingguide/data';
import SeasonTabs from './packingguide/SeasonTabs';
import SeasonInfo from './packingguide/SeasonInfo';
import CategoryGrid from './packingguide/CategoryGrid';
import BottomNotes from './packingguide/BottomNotes';

export default function PackingGuide() {
  const [activeSeason, setActiveSeason] = useState(0);
  const season = seasons[activeSeason];

  return (
    <section style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SeasonTabs activeSeason={activeSeason} onSelect={setActiveSeason} />

      <AnimatePresence mode="wait">
        <motion.div
          key={season.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <SeasonInfo season={season} />

          <div className="px-6 lg:px-16 pt-14 pb-24 max-w-[1400px] mx-auto">
            <CategoryGrid season={season} />

            <BottomNotes />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
