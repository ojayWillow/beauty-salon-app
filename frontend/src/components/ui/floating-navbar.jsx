'use client';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function FloatingNav({ navItems, className }) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      let direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-rose-200/20 rounded-full bg-white/80 dark:bg-black/80 shadow-lg backdrop-blur-md z-[5000] px-6 py-3 items-center justify-center space-x-6',
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={idx}
            href={navItem.link}
            className={cn(
              'relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-rose-500 text-sm font-medium transition-colors',
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
