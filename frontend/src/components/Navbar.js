'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-serif text-rose-600 font-bold">💄 Luxe Beauty</Link>
      <div className="flex items-center gap-6 text-sm">
        <Link href="/store" className="text-gray-600 hover:text-rose-500">Store</Link>
        <Link href="/services" className="text-gray-600 hover:text-rose-500">Services</Link>
        <Link href="/cart" className="relative text-gray-600 hover:text-rose-500">
          🛒 Cart
          {cartCount > 0 && <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
        </Link>
        {user ? (
          <>
            <Link href="/profile" className="text-gray-600 hover:text-rose-500">{user.name}</Link>
            <button onClick={logout} className="text-rose-500 hover:underline">Logout</button>
          </>
        ) : (
          <Link href="/auth/login" className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition">Login</Link>
        )}
      </div>
    </nav>
  );
}
