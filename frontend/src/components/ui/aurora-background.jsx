'use client';

// Pure inline styles — no Tailwind, no cn(), no className conflicts
// This ensures identical rendering locally and on Vercel SSR/production
export function AuroraBackground({ children, className = '' }) {
  return (
    <section
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // Solid warm-white base so there's never a flash of wrong colour
        background: 'var(--color-warm-white)',
        // Extra class allows .aurora-hero padding overrides from globals.css
      }}
      className={className}
    >
      {/* Layer 1: Static warm gradient base — always visible, no animation dependency */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: [
            'linear-gradient(160deg,',
            '  rgba(255,250,247,1)      0%,',
            '  rgba(253,232,239,0.85)  35%,',
            '  rgba(253,246,227,0.70)  70%,',
            '  rgba(255,250,247,0.90) 100%',
            ')',
          ].join(''),
        }}
      />

      {/* Layer 2: Animated aurora blobs */}
      <div className="aurora-layer" aria-hidden="true" />

      {/* Content sits above both layers */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {children}
      </div>
    </section>
  );
}
