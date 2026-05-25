/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7B1C2E',
          light: '#9E2C41',
          dark: '#58111E',
          hover: '#9E2C41',
        },
        gold: {
          DEFAULT: '#C8992A',
          light: '#E2B23F',
          dark: '#A37A1D',
          hover: '#E2B23F',
        },
        cream: {
          DEFAULT: '#FFF8F5',
          light: '#FFFDFB',
        },
        blush: {
          DEFAULT: '#FDF0F0',
          dark: '#FCE7E7',
        },
        darkbrown: {
          DEFAULT: '#2C1A1A',
          light: '#4E3131',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'blush': '0 4px 20px rgba(123, 28, 46, 0.06)',
        'blush-md': '0 8px 30px rgba(123, 28, 46, 0.1)',
        'blush-lg': '0 15px 40px rgba(123, 28, 46, 0.12)',
        'gold-glow': '0 0 15px rgba(200, 153, 42, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
