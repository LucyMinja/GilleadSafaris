'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

// PageTransition wraps pages in <AnimatePresence initial={false}>, which skips
// children's `initial` states. So each piece starts in its hidden state via
// `animate` and flips to visible after mount instead.
function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => { const id = requestAnimationFrame(() => setM(true)); return () => cancelAnimationFrame(id); }, []);
  return m;
}

// "Lens focus" hero text: each word starts blurred and loosely tracked, then
// pulls into sharp focus in sequence — like a camera finding focus on a scene.
// Used by every hero instead of the common fade-and-slide-up. "\n" in the
// text forces a line break. Non-string children render without the effect.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const HIDDEN_WORD = { opacity: 0, filter: 'blur(14px)', letterSpacing: '0.32em', scale: 1.06 };
const HIDDEN_SUB = { opacity: 0, filter: 'blur(6px)' };

export function FocusTitle({ text, delay = 0.25, style }: { text: ReactNode; delay?: number; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  const go = useMounted();
  if (typeof text !== 'string' || reduce) return <h1 style={style}>{typeof text === 'string' ? text.replace('\n', ' ') : text}</h1>;

  let i = 0;
  return (
    <h1 style={style} aria-label={text.replace('\n', ' ')}>
      {text.split('\n').map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi) => {
            const d = delay + i++ * 0.11;
            return (
              <motion.span
                key={wi}
                aria-hidden
                className="inline-block"
                initial={HIDDEN_WORD}
                animate={go ? { opacity: 1, filter: 'blur(0px)', letterSpacing: '0em', scale: 1 } : HIDDEN_WORD}
                transition={{ duration: 1.3, delay: d, ease: EASE }}
                style={{ marginRight: '0.26em', willChange: 'filter, letter-spacing' }}
              >
                {word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

// Subtitle words surface softly one after another once the title has settled,
// followed by a hairline that draws out from the centre.
export function FocusSubtitle({ text, delay = 0.9, style }: { text: string; delay?: number; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  const go = useMounted();
  if (reduce) return <p style={style}>{text}</p>;
  const words = text.split(' ');
  return (
    <>
      <p style={style} aria-label={text}>
        {words.map((w, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            initial={HIDDEN_SUB}
            animate={go ? { opacity: 1, filter: 'blur(0px)' } : HIDDEN_SUB}
            transition={{ duration: 0.7, delay: delay + i * 0.035, ease: 'easeOut' }}
            style={{ marginRight: '0.28em' }}
          >
            {w}
          </motion.span>
        ))}
      </p>
      <FocusRule delay={delay + words.length * 0.035 + 0.1} />
    </>
  );
}

export function FocusRule({ delay = 1.2 }: { delay?: number }) {
  const reduce = useReducedMotion();
  const go = useMounted();
  const hidden = { scaleX: 0, opacity: 0 };
  return (
    <motion.span
      aria-hidden
      className="block mx-auto mt-7"
      initial={reduce ? false : hidden}
      animate={go || reduce ? { scaleX: 1, opacity: 1 } : hidden}
      transition={{ duration: 1.1, delay, ease: EASE }}
      style={{ width: '64px', height: '1px', backgroundColor: 'rgba(255,255,255,0.7)', transformOrigin: 'center' }}
    />
  );
}
