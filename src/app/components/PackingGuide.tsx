'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { seasons } from './packingguide/data';
import SeasonTabs from './packingguide/SeasonTabs';
import SeasonHero from './packingguide/SeasonHero';
import CategoryAccordion from './packingguide/CategoryAccordion';
import CategoryDetail from './packingguide/CategoryDetail';
import BottomNotes from './packingguide/BottomNotes';

export default function PackingGuide() {
  const [activeSeason, setActiveSeason] = useState(0);
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const season = seasons[activeSeason];

  return (
    <section style={{ backgroundColor: '#8A694F', fontFamily: "'Lato', sans-serif" }}>
      <SeasonTabs
        activeSeason={activeSeason}
        onSelect={(i) => { setActiveSeason(i); setOpenCategory(0); }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={season.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <SeasonHero season={season} />

          <div className="px-6 lg:px-20 pt-8 pb-24 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <CategoryAccordion
                season={season}
                openCategory={openCategory}
                onToggle={(ci) => setOpenCategory(openCategory === ci ? null : ci)}
              />
              <CategoryDetail season={season} openCategory={openCategory} />
            </div>

            <BottomNotes />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
