'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

// All Tailwind classes removed — pure inline styles to survive Vercel production purge
export function FlipWords({ words, duration = 3000, className = '' }) {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset to first word whenever language switches (words array changes)
  useEffect(() => {
    setCurrentWord(words[0]);
    setIsAnimating(false);
  }, [words]);

  const startAnimation = useCallback(() => {
    const idx = words.indexOf(currentWord);
    const next = words[idx + 1] !== undefined ? words[idx + 1] : words[0];
    setCurrentWord(next);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const t = setTimeout(startAnimation, duration);
      return () => clearTimeout(t);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)} mode="wait">
      <motion.div
        key={currentWord}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40, x: 40, filter: 'blur(8px)', scale: 2, position: 'absolute' }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        style={{
          display: 'inline-block',
          position: 'relative',
          zIndex: 10,
          textAlign: 'left',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        }}
        className={className}
      >
        {currentWord.split('').map((letter, index) => (
          <motion.span
            key={currentWord + index}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            style={{ display: 'inline-block' }}
          >
            {letter === ' ' ? '\u00a0' : letter}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
