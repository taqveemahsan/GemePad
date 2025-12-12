/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Press Start 2P"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        neonPurple: '#c61ae7',
        neonGreen: '#3ef4c0',
        darkBg: '#0c0c1b',
        cardBg: '#13132a',
      },
      boxShadow: {
        neon: '0 0 25px rgba(198, 26, 231, 0.5)',
      },
    },
  },
  plugins: [],
}
