/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  // safelist: every custom class from globals.css that is referenced
  // via className= anywhere in the app. Tailwind's purger cannot
  // statically detect these when they appear inside cn(), template
  // literals, or are passed as props — so we pin them here explicitly.
  safelist: [
    // Layout & hero
    'aurora-hero',
    'hero',
    'hero-eyebrow',
    'hero-title',
    'hero-subtitle',
    'hero-cta',
    'hero-flip-line',

    // Navbar
    'navbar-logo',
    'nav-hamburger',

    // Buttons
    'btn',
    'btn-primary',
    'btn-outline',
    'btn-gold',
    'btn-ghost',

    // Sections
    'section',
    'section-header',
    'section-eyebrow',
    'section-title',
    'section-desc',
    'container',

    // Cards
    'card',
    'cards-grid',
    'card-image-wrapper',
    'card-badge',
    'card-body',
    'card-category',
    'card-title',
    'card-description',
    'card-footer',
    'card-price',
    'card-price-old',

    // Features
    'feature-box',
    'feature-icon',
    'feature-title',
    'feature-text',

    // Tags
    'tag',
    'tag-rose',
    'tag-gold',

    // CTA & footer
    'cta-banner',
    'footer',
    'footer-logo',
    'footer-tagline',
    'footer-grid',
    'footer-heading',
    'footer-links',
    'footer-bottom',

    // Inputs
    'input',
    'label',

    // Aurora
    'aurora-layer',

    // Utility
    'text-gradient-rose-gold',
    'bg-rose-pale',
    'bg-gold-pale',
    'bg-cream',
    'border-rose',
    'divider-gold',
    'divider-gold-icon',

    // Animations
    'animate-fade-in-up',
    'animate-shimmer',

    // Testimonials
    'testimonial-card',
    'testimonial-stars',
    'testimonial-text',
    'testimonial-author',
    'testimonial-avatar',
    'testimonial-name',
    'testimonial-role',
  ],

  theme: {
    extend: {
      colors: {
        rose: { 500: '#f43f5e', 600: '#e11d48' },
        blush: { DEFAULT: '#fce4ec' },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      animation: {
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to:   { backgroundPosition: '350% 50%, 350% 50%' },
        },
      },
    },
  },
  plugins: [],
};
