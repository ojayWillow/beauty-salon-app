import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <span className="hero-eyebrow">✦ Premium Beauty Studio</span>
        <h1 className="hero-title">
          Where Beauty Meets <em>Elegance</em>
        </h1>
        <p className="hero-subtitle">
          Indulge in luxury treatments, curated products, and bespoke beauty experiences — designed exclusively for you.
        </p>
        <div className="hero-cta">
          <Link href="/store" className="btn btn-primary">Shop Collection</Link>
          <Link href="/services" className="btn btn-outline">Explore Services</Link>
        </div>
      </section>

      {/* Features Strip */}
      <section className="section" style={{ background: 'var(--color-cream)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Why Choose Us</span>
            <h2 className="section-title">The Luxe Difference</h2>
            <p className="section-desc">Every visit is a ritual. Every product is chosen with intention.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '✦', title: 'Expert Artisans', text: 'Our team trained at the finest beauty academies worldwide.' },
              { icon: '◈', title: 'Clean Formulas', text: 'Every product is vegan, cruelty-free, and sustainably sourced.' },
              { icon: '❋', title: 'Personalised Care', text: 'Bespoke consultations tailored to your skin type and lifestyle.' },
              { icon: '◇', title: 'Luxury Experience', text: 'From the moment you arrive, indulge in pure refinement.' },
            ].map((f) => (
              <div key={f.title} className="feature-box">
                <div className="feature-icon">{f.icon}</div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <span className="hero-eyebrow" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Limited Time</span>
            <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>Book Your First Visit</h2>
            <p style={{ marginBottom: '2rem' }}>Enjoy 20% off your first treatment when you book online today.</p>
            <Link href="/services" className="btn" style={{ background: '#fff', color: 'var(--color-rose-deep)', padding: '0.9rem 2.4rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
