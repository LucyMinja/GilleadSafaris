'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { seasons } from './packingguide/data';
import SeasonHeading from './packingguide/SeasonHeading';
import SeasonSidebar from './packingguide/SeasonSidebar';
import SeasonInfo from './packingguide/SeasonInfo';
import CategoryGrid from './packingguide/CategoryGrid';
import BottomNotes from './packingguide/BottomNotes';

export default function PackingGuide() {
  const [activeSeason, setActiveSeason] = useState(0);
  const season = seasons[activeSeason];

  return (
    <section style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <SeasonHeading />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 lg:items-center">
        <div className="lg:col-span-3">
          <SeasonSidebar activeSeason={activeSeason} onSelect={setActiveSeason} />
        </div>

        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={season.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <SeasonInfo season={season} />
              <BottomNotes />
              <CategoryGrid season={season} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
