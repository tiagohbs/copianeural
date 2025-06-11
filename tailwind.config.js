/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de cores do universo híbrido medieval-espacial
        cosmic: {
          purple: '#6B46C1',
          darkBlue: '#1E1B4B',
          lime: '#84CC16',
          gold: '#F59E0B'
        },
        alien: {
          glow: '#10B981',
          crystal: '#06B6D4',
          energy: '#8B5CF6'
        }
      },
      fontFamily: {
        'medieval': ['Cinzel', 'serif'],
        'tech': ['Orbitron', 'monospace']
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #10B981' },
          '100%': { boxShadow: '0 0 20px #10B981, 0 0 30px #10B981' }
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}