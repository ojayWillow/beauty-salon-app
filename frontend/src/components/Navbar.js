'use client';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FloatingNav } from './ui/floating-navbar';

export default function Navbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home',     link: '/' },
    { name: 'Store',    link: '/store' },
    { name: 'Services', link: '/services' },
    { name: '',         link: '/cart',  isCart: true, badge: totalItems },
    {
      name: user ? user.name?.split(' ')[0] : 'Sign In',
      link: user ? '/profile' : '/auth/login',
      isAction: true,
    },
  ];

  return <FloatingNav navItems={navItems} />;
}
