'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '../../lib/api';
import { useLang } from '../../context/LanguageContext';
import t from '../../lib/translations';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLang();
  const tr = t[lang];

  useEffect(() => {
    API.get('/services')
      .then((res) => setServices(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const durationLabel = (mins) => {
    if (!mins) return '';
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}min` : `${h}h`;
  };

  return (
    <div style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem)' }}>
      <div className="section-header" style={{ marginBottom: '2.5rem' }}>
        <h1 className="section-title">{tr.services_title}</h1>
        <p className="section-desc">{tr.services_desc}</p>
      </div>

      {loading ? (
        <div className="cards-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '1.6rem', border: '1px solid var(--color-border)' }}>
              <div style={{ height: '20px', width: '60%', background: 'var(--color-rose-pale)', borderRadius: 4, marginBottom: '0.75rem', animation: 'shimmer 1.6s ease-in-out infinite', backgroundSize: '200% auto' }} />
              <div style={{ height: '14px', background: 'var(--color-rose-pale)', borderRadius: 4, marginBottom: '0.5rem', animation: 'shimmer 1.6s ease-in-out infinite', backgroundSize: '200% auto' }} />
              <div style={{ height: '14px', width: '75%', background: 'var(--color-rose-pale)', borderRadius: 4, marginBottom: '1rem', animation: 'shimmer 1.6s ease-in-out infinite', backgroundSize: '200% auto' }} />
              <div style={{ height: '36px', width: '35%', background: 'var(--color-rose-pale)', borderRadius: 'var(--radius-full)', animation: 'shimmer 1.6s ease-in-out infinite', backgroundSize: '200% auto' }} />
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'clamp(4rem, 8vw, 7rem) 2rem' }}>
          <p style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>💅</p>
          <p className="section-desc">{tr.no_services}</p>
        </div>
      ) : (
        <div className="cards-grid">
          {services.map((service) => (
            <div key={service._id} className="card" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 className="card-title" style={{ margin: 0 }}>{service.name}</h3>
                {service.duration && (
                  <span className="tag tag-rose">{durationLabel(service.duration)}</span>
                )}
              </div>
              <p className="card-description" style={{ flex: 1 }}>{service.description}</p>
              <div className="card-footer">
                <span className="card-price">€{service.price?.toFixed(2)}</span>
                <Link href="/auth/login" className="btn btn-primary" style={{ padding: '0.55rem 1.2rem', fontSize: '0.75rem' }}>
                  {tr.book_now}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
