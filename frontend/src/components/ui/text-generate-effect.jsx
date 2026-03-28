'use client';
import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

export function TextGenerateEffect({ words, className, filter = true, duration = 0.5 }) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ');

  useEffect(() => {
    animate(
      'span',
      { opacity: 1, filter: filter ? 'blur(0px)' : 'none' },
      { duration: duration, delay: stagger(0.2) }
    );
  }, [scope.current]);

  return (
    <div className={cn('font-bold', className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          <motion.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <motion.span
                key={word + idx}
                className="dark:text-white text-black opacity-0"
                style={{ filter: filter ? 'blur(10px)' : 'none' }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
