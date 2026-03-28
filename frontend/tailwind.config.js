/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: { 500: '#f43f5e', 600: '#e11d48' },
        blush: { DEFAULT: '#fce4ec' }
      },
      fontFamily: {
        serif: ['Georgia', 'serif']
      },
      animation: {
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to: { backgroundPosition: '350% 50%, 350% 50%' },
        },
      },
    }
  },
  plugins: []
};
