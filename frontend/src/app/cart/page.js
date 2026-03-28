'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import API from '../../lib/api';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!user) { router.push('/auth/login'); return; }
    setPlacing(true);
    setError('');
    try {
      await API.post('/orders', {
        items: items.map((i) => ({ product: i._id, quantity: i.quantity, price: i.price })),
        totalAmount: totalPrice,
      });
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-serif text-rose-600 mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-6">Thank you for your purchase. You can view your order in your profile.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/store" className="bg-rose-500 text-white px-5 py-2.5 rounded-full hover:bg-rose-600 transition text-sm">Continue Shopping</Link>
            <Link href="/profile" className="border border-rose-300 text-rose-500 px-5 py-2.5 rounded-full hover:bg-rose-50 transition text-sm">View Profile</Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <div className="text-6xl mb-4">🛍️</div>
          <h2 className="text-2xl font-serif text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Add some products to get started.</p>
          <Link href="/store" className="bg-rose-500 text-white px-5 py-2.5 rounded-full hover:bg-rose-600 transition text-sm">Browse Store</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif text-rose-600 mb-6">Your Cart</h1>
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">💄</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
              <p className="text-rose-600 text-sm font-medium">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-rose-300 transition text-lg leading-none">−</button>
              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-rose-300 transition text-lg leading-none">+</button>
            </div>
            <span className="text-gray-700 font-semibold w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-400 transition" aria-label="Remove">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-4 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl shadow p-5">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-800 text-lg border-t border-gray-100 pt-3 mb-4">
          <span>Total</span>
          <span className="text-rose-600">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={placing}
          className="w-full bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 transition font-medium disabled:opacity-60"
        >
          {placing ? 'Placing Order...' : user ? 'Place Order' : 'Sign In to Checkout'}
        </button>
      </div>
    </div>
  );
}
