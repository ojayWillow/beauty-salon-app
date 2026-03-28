'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export function FloatingNav({ navItems, className }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Just track whether user has scrolled at all — never hide, only style change
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-[5000] transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-rose-100'
          : 'bg-transparent',
        className
      )}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none' }}>
          <span className="navbar-logo">✦ Luxe Beauty</span>
        </a>

        {/* Nav links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2.4rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navItems.filter(n => !n.isAction).map((item, idx) => (
            <li key={idx}>
              <a
                href={item.link}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--transition)',
                  position: 'relative',
                  paddingBottom: '4px',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-rose-deep)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: cart + auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {navItems.filter(n => n.isCart).map((item, idx) => (
            <a key={idx} href={item.link} style={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'var(--color-muted)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {item.badge > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  background: 'var(--color-rose)', color: '#fff',
                  fontSize: '0.65rem', fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{item.badge}</span>
              )}
            </a>
          ))}

          {navItems.filter(n => n.isAction).map((item, idx) => (
            <a key={idx} href={item.link} className="btn btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.78rem' }}>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
