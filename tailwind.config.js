/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#0F1115',
        surface: '#16181D',
        elevated: '#1C1F26',
        border: 'rgba(255, 255, 255, 0.07)',
        'border-soft': 'rgba(255, 255, 255, 0.04)',
        cream: '#FAFAF8',
        'warm-white': '#F5F4F0',
        nexa: {
          DEFAULT: '#00B3A4',
          light: '#4ECDC4',
          soft: '#9FD9D2',
          deep: '#008F84',
          muted: 'rgba(0, 179, 164, 0.15)',
        },
        aqua: {
          DEFAULT: '#5CC8BE',
          light: '#8ED9D2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        card: '0 8px 40px rgba(0, 0, 0, 0.35)',
        soft: '0 2px 16px rgba(0, 0, 0, 0.2)',
        pass: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
