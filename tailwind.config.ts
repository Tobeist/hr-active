import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        paper: '#ffffff',
        gray: {
          50: '#fafafa',
          100: '#f4f4f4',
          300: '#d4d4d4',
          500: '#737373',
          700: '#404040'
        },
        alert: '#dc2626'
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', '-apple-system', 'sans-serif']
      },
      letterSpacing: {
        display: '0.02em',
        wider2: '0.18em',
        widest2: '0.22em'
      },
      animation: {
        pulseDot: 'pulseDot 1.5s infinite'
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' }
        }
      }
    }
  },
  plugins: []
};

export default config;
