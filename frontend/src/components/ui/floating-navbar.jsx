'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

// No Tailwind dynamic classes — all styles are pure inline to survive Vercel production purge
export function FloatingNav({ navItems, brandName = '✦ Sandra Beauty', lang = 'lv', onToggleLang }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 5000,
    transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
    background: scrolled ? 'rgba(255, 250, 247, 0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(18px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
    boxShadow: scrolled ? '0 2px 24px rgba(201, 116, 143, 0.10)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(234, 213, 221, 0.7)' : '1px solid transparent',
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={navStyle}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none' }}>
          <span className="navbar-logo">{brandName}</span>
        </a>

        {/* Desktop nav links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2.4rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navItems.filter(n => !n.isAction && !n.isCart).map((item, idx) => (
            <li key={idx}>
              <a
                href={item.link}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.3s ease', paddingBottom: '4px' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-rose-deep)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: lang + cart + auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            title={lang === 'lv' ? 'Switch to English' : 'Pārslēgt uz Latviešu'}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', padding: '0.3rem 0.75rem', borderRadius: '9999px', border: '1.5px solid var(--color-border)', background: 'transparent', color: 'var(--color-rose-deep)', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-rose-pale)'; e.currentTarget.style.borderColor = 'var(--color-rose)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <span>{lang === 'lv' ? '🇱🇻' : '🇬🇧'}</span>
            <span>{lang === 'lv' ? 'LV' : 'EN'}</span>
          </button>

          {/* Cart */}
          {navItems.filter(n => n.isCart).map((item, idx) => (
            <a key={idx} href={item.link} style={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'var(--color-muted)', textDecoration: 'none' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {item.badge > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--color-rose)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, borderRadius: '9999px', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.badge}</span>
              )}
            </a>
          ))}

          {/* Auth */}
          {navItems.filter(n => n.isAction).map((item, idx) => (
            <a key={idx} href={item.link} className="btn btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.78rem' }}>
              {item.name}
            </a>
          ))}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            className="nav-hamburger"
          >
            <span style={{ width: '22px', height: '2px', background: 'var(--color-charcoal)', borderRadius: '2px', display: 'block' }} />
            <span style={{ width: '22px', height: '2px', background: 'var(--color-charcoal)', borderRadius: '2px', display: 'block' }} />
            <span style={{ width: '14px', height: '2px', background: 'var(--color-charcoal)', borderRadius: '2px', display: 'block' }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(255,250,247,0.98)', backdropFilter: 'blur(16px)', borderTop: '1px solid var(--color-border)', padding: '1rem clamp(1.5rem, 5vw, 4rem) 1.5rem' }}
        >
          {navItems.filter(n => !n.isCart).map((item, idx) => (
            <a key={idx} href={item.link} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.75rem 0', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-charcoal)', textDecoration: 'none', borderBottom: '1px solid var(--color-border)' }}>
              {item.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
