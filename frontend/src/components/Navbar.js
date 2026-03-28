'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FloatingNav } from './ui/floating-navbar';

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Store', link: '/store' },
  { name: 'Services', link: '/services' },
];

export default function Navbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const pathname = usePathname();

  return (
    <>
      {/* Floating Navbar (Aceternity) */}
      <FloatingNav
        navItems={[
          ...navItems,
          {
            name: user ? user.name?.split(' ')[0] : 'Sign In',
            link: user ? '/profile' : '/auth/login',
          },
        ]}
      />

      {/* Sticky fallback bar with cart icon (always visible) */}
      <nav className="navbar" style={{ paddingTop: '0.6rem', paddingBottom: '0.6rem' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="navbar-logo">✦ Luxe Beauty</span>
        </Link>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Cart Icon */}
        <Link
          href="/cart"
          aria-label="Cart"
          style={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'var(--color-muted)', transition: 'color var(--transition)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {totalItems > 0 && (
            <span style={{
              position: 'absolute', top: '-8px', right: '-8px',
              background: 'var(--color-rose)', color: '#fff',
              fontSize: '0.65rem', fontWeight: 700,
              borderRadius: 'var(--radius-full)',
              width: '18px', height: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </>
  );
}
