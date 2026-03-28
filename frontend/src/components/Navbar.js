'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const pathname = usePathname();

  const linkClass = (href) =>
    `text-sm font-medium transition ${
      pathname === href ? 'text-rose-600' : 'text-gray-600 hover:text-rose-500'
    }`;

  return (
    <nav className="bg-white border-b border-rose-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="Luxe Beauty" className="text-rose-500">
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 14c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="14" cy="14" r="2" fill="currentColor"/>
          </svg>
          <span className="text-rose-600 font-serif text-lg font-semibold">Luxe Beauty</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/" className={linkClass('/')}>Home</Link>
          <Link href="/store" className={linkClass('/store')}>Store</Link>
          <Link href="/services" className={linkClass('/services')}>Services</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-rose-500 transition" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <Link href="/profile" className="text-sm bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition font-medium">
              {user.name?.split(' ')[0]}
            </Link>
          ) : (
            <Link href="/auth/login" className="text-sm bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition font-medium">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex gap-4 px-4 pb-2 border-t border-rose-50 pt-2">
        <Link href="/" className={`${linkClass('/')} text-xs`}>Home</Link>
        <Link href="/store" className={`${linkClass('/store')} text-xs`}>Store</Link>
        <Link href="/services" className={`${linkClass('/services')} text-xs`}>Services</Link>
      </div>
    </nav>
  );
}
