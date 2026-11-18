/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#183153',      // Deep Navy Blue
          secondary: '#4F78A8',    // Soft Blue
          background: '#F7F9FC',   // Off White
          surface: '#FFFFFF',      // White
          accent: '#4A9B91',       // Muted Teal
          accentHover: '#3c837b',
          darkSlate: '#263445',    // Main Text
          mutedGray: '#778397',    // Secondary Text
          border: '#E5EAF0',       // Light Gray Borders
          card: '#FFFFFF',
          hoverBg: '#EEF2F6',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(24, 49, 83, 0.05), 0 1px 2px rgba(24, 49, 83, 0.03)',
        'card': '0 4px 14px 0 rgba(24, 49, 83, 0.08)',
        'card-hover': '0 10px 25px -3px rgba(24, 49, 83, 0.12)',
        'modal': '0 20px 25px -5px rgba(24, 49, 83, 0.2), 0 10px 10px -5px rgba(24, 49, 83, 0.04)',
      }
    },
  },
  plugins: [],
}
