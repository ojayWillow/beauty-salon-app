'use client';
import { cn } from '../../lib/utils';

export function AuroraBackground({ children, className, ...props }) {
  return (
    <section
      className={cn('relative flex flex-col items-center justify-center overflow-hidden', className)}
      {...props}
    >
      {/* Aurora layers */}
      <div className="aurora-layer" aria-hidden="true" />
      {children}
    </section>
  );
}
