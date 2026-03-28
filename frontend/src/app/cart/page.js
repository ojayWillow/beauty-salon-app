'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';
import t from '../../lib/translations';
import API from '../../lib/api';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const { lang } = useLang();
  const tr = t[lang];
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!user) { router.push('/auth/login'); return; }
    setPlacing(true); setError('');
    try {
      await API.post('/orders', {
        items: items.map((i) => ({ product: i._id, quantity: i.quantity, price: i.price })),
        totalAmount: totalPrice,
      });
      clearCart(); setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || tr.checkout_error);
    } finally { setPlacing(false); }
  };

  if (success) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-rose)', marginBottom: '0.75rem' }}>{tr.order_success_title}</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', maxWidth: '36ch', margin: '0 auto 2rem' }}>{tr.order_success_desc}</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/store" className="btn btn-primary">{tr.continue_shopping}</Link>
            <Link href="/profile" className="btn btn-outline">{tr.view_profile}</Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛍️</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-charcoal)', marginBottom: '0.75rem' }}>{tr.cart_empty_title}</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>{tr.cart_empty_desc}</p>
          <Link href="/store" className="btn btn-primary">{tr.browse_store}</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 2rem)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 300, color: 'var(--color-charcoal)', marginBottom: '2rem' }}>{tr.cart_title}</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.8rem' }}>
        {items.map((item) => (
          <div key={item._id} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-soft)', padding: '1.2rem 1.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: 'var(--color-rose-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>💄</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-charcoal)', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-rose)', fontWeight: 500 }}>€{item.price.toFixed(2)} {tr.each}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ width: '30px', height: '30px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-border)', background: 'none', color: 'var(--color-charcoal)', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all var(--transition)' }}>−</button>
              <span style={{ width: '24px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ width: '30px', height: '30px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-border)', background: 'none', color: 'var(--color-charcoal)', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all var(--transition)' }}>+</button>
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-rose-deep)', minWidth: '60px', textAlign: 'right' }}>€{(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(item._id)} aria-label="Remove" style={{ color: 'var(--color-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', transition: 'color var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = '#e11d48'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        ))}
      </div>

      {error && <div style={{ background: '#fff0f3', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.2rem', marginBottom: '1.2rem', fontSize: '0.88rem' }}>{error}</div>}

      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-soft)', padding: '1.6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.6rem' }}>
          <span>{tr.subtotal} ({items.reduce((s, i) => s + i.quantity, 0)} {tr.items})</span>
          <span>€{totalPrice.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-charcoal)', borderTop: '1px solid var(--color-border)', paddingTop: '0.9rem', marginBottom: '1.4rem' }}>
          <span>{tr.total}</span>
          <span style={{ color: 'var(--color-rose-deep)' }}>€{totalPrice.toFixed(2)}</span>
        </div>
        <button onClick={handleCheckout} disabled={placing} className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '0.85rem', justifyContent: 'center', opacity: placing ? 0.7 : 1 }}>
          {placing ? tr.placing_order : user ? tr.place_order : tr.signin_checkout}
        </button>
      </div>
    </div>
  );
}
