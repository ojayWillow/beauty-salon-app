'use client';

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
        background: 'var(--color-warm-white)',
      }}
      className={className}
    >
      {/* Static base gradient — always visible, no JS needed */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          // Continuous rose-pink top → peach mid → warm cream bottom
          // Matches what we see locally and keeps colour consistent
          background: [
            'linear-gradient(175deg,',
            '  rgba(232, 160, 180, 0.55)  0%,',
            '  rgba(253, 232, 239, 0.80)  30%,',
            '  rgba(253, 246, 227, 0.70)  65%,',
            '  rgba(255, 250, 247, 0.95) 100%',
            ')',
          ].join(''),
        }}
      />

      {/* Animated aurora blobs layer */}
      <div className="aurora-layer" aria-hidden="true" />

      {/* Content above all layers */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {children}
      </div>
    </section>
  );
}
