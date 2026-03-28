'use client';
import Link from 'next/link';
import { AuroraBackground } from '../components/ui/aurora-background';
import { FlipWords } from '../components/ui/flip-words';
import { useLang } from '../context/LanguageContext';
import t from '../lib/translations';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <>
      <AuroraBackground className="hero aurora-hero">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center text-center"
          style={{ maxWidth: '860px', padding: '0 1.5rem' }}
        >
          <span className="hero-eyebrow">{tr.hero_eyebrow}</span>
          <h1 className="hero-title" style={{ marginBottom: '0.2em' }}>{tr.hero_line1}</h1>
          <h1 className="hero-title hero-flip-line">
            <FlipWords key={lang} words={tr.flip_words} duration={2600} className="text-gradient-rose-gold" />
          </h1>
          <p className="hero-subtitle" style={{ marginTop: '1.2rem' }}>{tr.hero_subtitle}</p>
          <div className="hero-cta" style={{ marginTop: '2.4rem' }}>
            <Link href="/store" className="btn btn-primary">{tr.hero_cta_shop}</Link>
            <Link href="/services" className="btn btn-outline">{tr.hero_cta_services}</Link>
          </div>
        </motion.div>
      </AuroraBackground>

      <section className="section" style={{ background: 'var(--color-cream)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{tr.features_eyebrow}</span>
            <h2 className="section-title">{tr.features_title}</h2>
            <p className="section-desc">{tr.features_desc}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '✦', title: tr.feature_1_title, text: tr.feature_1_text },
              { icon: '◈', title: tr.feature_2_title, text: tr.feature_2_text },
              { icon: '❋', title: tr.feature_3_title, text: tr.feature_3_text },
              { icon: '◇', title: tr.feature_4_title, text: tr.feature_4_text },
            ].map((f, i) => (
              <motion.div key={f.title} className="feature-box" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="feature-icon">{f.icon}</div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-text">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div className="cta-banner" initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="hero-eyebrow" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>{tr.cta_badge}</span>
            <h2 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>{tr.cta_title}</h2>
            <p style={{ marginBottom: '2rem' }}>{tr.cta_desc}</p>
            <Link href="/services" className="btn" style={{ background: '#fff', color: 'var(--color-rose-deep)', padding: '0.9rem 2.4rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{tr.cta_btn}</Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
