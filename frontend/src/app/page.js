'use client';
import Link from 'next/link';
import { AuroraBackground } from '../components/ui/aurora-background';
import { FlipWords } from '../components/ui/flip-words';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';
import { motion } from 'framer-motion';

const flipWordsList = ['Elegance', 'Radiance', 'Confidence', 'You'];

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Aurora Background */}
      <AuroraBackground className="min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="relative flex flex-col items-center justify-center px-4 text-center z-10"
        >
          <span className="hero-eyebrow">✦ Premium Beauty Studio</span>

          <h1 className="hero-title mt-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Where Beauty Meets{' '}
            <span className="text-rose-500">
              <FlipWords words={flipWordsList} duration={2800} />
            </span>
          </h1>

          <TextGenerateEffect
            words="Indulge in luxury treatments, curated products, and bespoke beauty experiences — designed exclusively for you."
            className="hero-subtitle mt-4 max-w-2xl text-base md:text-lg font-normal"
            filter={true}
            duration={0.4}
          />

          <div className="hero-cta mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/store" className="btn btn-primary">
              Shop Collection
            </Link>
            <Link href="/services" className="btn btn-outline">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </AuroraBackground>

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

      {/* CTA Banner */}
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
