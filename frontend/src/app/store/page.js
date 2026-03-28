'use client';
import { useState, useEffect } from 'react';
import API from '../../lib/api';
import { useCart } from '../../context/CartContext';

const CATEGORY_ICONS = {
  '':         '✦',
  skincare:   '◈',
  haircare:   '◇',
  makeup:     '◆',
  nails:      '◉',
  other:      '○',
};

const CATEGORY_LABELS = {
  '':         'All Products',
  skincare:   'Skincare',
  haircare:   'Haircare',
  makeup:     'Makeup',
  nails:      'Nails',
  other:      'Other',
};

const CATEGORY_BG = {
  skincare: 'linear-gradient(135deg, #fde8ef 0%, #fdf6e3 100%)',
  haircare: 'linear-gradient(135deg, #fdf6e3 0%, #fde8ef 100%)',
  makeup:   'linear-gradient(135deg, #f9e8f0 0%, #f3e8fd 100%)',
  nails:    'linear-gradient(135deg, #fde8ef 0%, #e8f0fd 100%)',
  other:    'linear-gradient(135deg, #f0fde8 0%, #fde8ef 100%)',
  default:  'linear-gradient(135deg, var(--color-rose-pale) 0%, var(--color-gold-pale) 100%)',
};

function ProductCard({ product, onAddToCart }) {
  const bg = CATEGORY_BG[product.category] || CATEGORY_BG.default;
  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="card-image-wrapper" style={{ background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
        {product.image ? (
          <img src={product.image} alt={product.name} width={400} height={300} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <circle cx="28" cy="28" r="22" stroke="var(--color-rose-light)" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="10" fill="var(--color-rose-light)" opacity="0.4" />
            <path d="M20 28c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8" stroke="var(--color-rose)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
        {product.category && (
          <span className="card-badge" style={{ textTransform: 'capitalize' }}>{product.category}</span>
        )}
      </div>
      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span className="card-category">{CATEGORY_LABELS[product.category] || 'Product'}</span>
        <h3 className="card-title">{product.name}</h3>
        {product.description && (
          <p className="card-description" style={{ flex: 1 }}>
            {product.description.length > 90 ? product.description.slice(0, 90) + '…' : product.description}
          </p>
        )}
        <div className="card-footer" style={{ marginTop: 'auto' }}>
          <span className="card-price">${Number(product.price).toFixed(2)}</span>
          <button className="btn btn-primary" style={{ padding: '0.55rem 1.2rem', fontSize: '0.75rem' }} onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const { addToCart } = useCart();
  const categories = ['', 'skincare', 'haircare', 'makeup', 'nails', 'other'];

  useEffect(() => {
    setLoading(true);
    API.get(`/products${category ? `?category=${category}` : ''}`)
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <>
      <header style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem)', background: 'linear-gradient(150deg, var(--color-warm-white) 0%, var(--color-rose-pale) 45%, var(--color-gold-pale) 100%)', textAlign: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 55% 60% at 15% 50%, rgba(201,116,143,0.13) 0%, transparent 70%), radial-gradient(ellipse 45% 55% at 85% 40%, rgba(201,169,110,0.10) 0%, transparent 70%)' }} />
        <span className="hero-eyebrow">✦ Sandra Beauty Collection</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--color-charcoal)', margin: '1rem auto 0.75rem', maxWidth: '640px', lineHeight: 1.2 }}>
          The Sandra <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, var(--color-rose) 0%, var(--color-gold) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Beauty</em> Edit
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
          Discover premium skincare, makeup, and haircare — every formula chosen for results and refinement.
        </p>
      </header>

      <main style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem)' }}>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted)', marginRight: '0.4rem' }}>Filter:</span>
          {categories.map((c) => {
            const active = category === c;
            return (
              <button key={c} onClick={() => setCategory(c)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: active ? 600 : 500, letterSpacing: '0.08em', textTransform: active ? 'uppercase' : 'capitalize', padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-full)', border: active ? '1.5px solid var(--color-rose)' : '1.5px solid var(--color-border)', background: active ? 'linear-gradient(135deg, var(--color-rose) 0%, var(--color-rose-deep) 100%)' : '#fff', color: active ? '#fff' : 'var(--color-muted)', cursor: 'pointer', transition: 'all var(--transition)', boxShadow: active ? 'var(--shadow-soft)' : 'none' }}>
                <span aria-hidden="true">{CATEGORY_ICONS[c]}</span>
                {CATEGORY_LABELS[c]}
              </button>
            );
          })}
        </div>

        {!loading && products.length > 0 && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '1.6rem', letterSpacing: '0.04em' }}>
            Showing <strong style={{ color: 'var(--color-charcoal)' }}>{products.length}</strong> {products.length === 1 ? 'product' : 'products'}{category ? ` in ${CATEGORY_LABELS[category]}` : ''}
          </p>
        )}

        {loading && (
          <div className="cards-grid">
            {[1,2,3,4].map((i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <div style={{ height: '200px', background: 'linear-gradient(90deg, var(--color-rose-pale) 25%, var(--color-gold-pale) 50%, var(--color-rose-pale) 75%)', backgroundSize: '200% auto', animation: 'shimmer 1.6s ease-in-out infinite' }} />
                <div style={{ padding: '1.4rem' }}>
                  <div style={{ height: '12px', width: '40%', background: 'var(--color-rose-pale)', borderRadius: 4, marginBottom: '0.6rem' }} />
                  <div style={{ height: '18px', width: '70%', background: 'var(--color-rose-pale)', borderRadius: 4, marginBottom: '0.5rem' }} />
                  <div style={{ height: '12px', width: '90%', background: 'var(--color-rose-pale)', borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="cards-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'clamp(4rem, 8vw, 7rem) 2rem' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-full)', background: 'var(--color-rose-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="13" stroke="var(--color-rose)" strokeWidth="1.5" />
                <path d="M10 16c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6" stroke="var(--color-rose)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-charcoal)', marginBottom: '0.6rem' }}>No products found</h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: '1.8rem', maxWidth: '34ch' }}>
              {category ? `We haven't added any ${CATEGORY_LABELS[category].toLowerCase()} products yet — check back soon.` : 'Our collection is being curated. Please check back shortly.'}
            </p>
            {category && (
              <button className="btn btn-outline" onClick={() => setCategory('')} style={{ padding: '0.7rem 2rem' }}>View All Products</button>
            )}
          </div>
        )}
      </main>
    </>
  );
}
