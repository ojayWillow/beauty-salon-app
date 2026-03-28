'use client';
import Link from 'next/link';
import { AuroraBackground } from '../components/ui/aurora-background';
import { FlipWords } from '../components/ui/flip-words';
import { motion } from 'framer-motion';

const flipWordsList = ['Elegance', 'Radiance', 'Confidence', 'You'];

export default function HomePage() {
  return (
    <>
      {/* ── Hero with Aurora ── */}
      <AuroraBackground className="hero aurora-hero">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center text-center"
          style={{ maxWidth: '860px', padding: '0 1.5rem' }}
        >
          <span className="hero-eyebrow">✦ Sandra Beauty Studio</span>

          <h1 className="hero-title" style={{ marginBottom: '0.2em' }}>
            Where Beauty Meets
          </h1>
          <h1 className="hero-title hero-flip-line">
            <FlipWords words={flipWordsList} duration={2600} className="text-gradient-rose-gold" />
          </h1>

          <p className="hero-subtitle" style={{ marginTop: '1.2rem' }}>
            Indulge in luxury treatments, curated products, and bespoke beauty experiences — designed exclusively for you.
          </p>

          <div className="hero-cta" style={{ marginTop: '2.4rem' }}>
            <Link href="/store" className="btn btn-primary">Shop Collection</Link>
            <Link href="/services" className="btn btn-outline">Explore Services</Link>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* ── Features Strip ── */}
      <section className="section" style={{ background: 'var(--color-cream)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Why Choose Us</span>
            <h2 className="section-title">The Sandra Difference</h2>
            <p className="section-desc">Every visit is a ritual. Every product is chosen with intention.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '✦', title: 'Expert Artisans', text: 'Our team trained at the finest beauty academies worldwide.' },
              { icon: '◈', title: 'Clean Formulas', text: 'Every product is vegan, cruelty-free, and sustainably sourced.' },
              { icon: '❋', title: 'Personalised Care', text: 'Bespoke consultations tailored to your skin type and lifestyle.' },
              { icon: '◇', title: 'Luxury Experience', text: 'From the moment you arrive, indulge in pure refinement.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="feature-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="feature-icon">{f.icon}</div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-text">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section">
        <div className="container">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-eyebrow" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Limited Time</span>
            <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>Book Your First Visit</h2>
            <p style={{ marginBottom: '2rem' }}>Enjoy 20% off your first treatment when you book online today.</p>
            <Link href="/services" className="btn" style={{ background: '#fff', color: 'var(--color-rose-deep)', padding: '0.9rem 2.4rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
