'use client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import t from '../lib/translations';
import { FloatingNav } from './ui/floating-navbar';

export default function Navbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const { lang, toggle } = useLang();
  const tr = t[lang];

  const navItems = [
    { name: tr.nav_home,     link: '/' },
    { name: tr.nav_store,    link: '/store' },
    { name: tr.nav_services, link: '/services' },
    { name: '',              link: '/cart', isCart: true, badge: totalItems },
    {
      name: user ? user.name?.split(' ')[0] : tr.nav_signin,
      link: user ? '/profile' : '/auth/login',
      isAction: true,
    },
  ];

  return <FloatingNav navItems={navItems} brandName="✦ Sandra Beauty" lang={lang} onToggleLang={toggle} />;
}
