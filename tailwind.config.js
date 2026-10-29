/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pramaan: {
          50: '#f0f6fa',
          100: '#dbe9f4',
          200: '#bcd7ec',
          300: '#8ebfe0',
          400: '#5ba1d0',
          500: '#3584be',
          600: '#256a9e',
          700: '#1f5580',
          800: '#1c4769',
          900: '#0f2942', // Deep navy
          950: '#091827', // Deepest slate navy
        },
        govTeal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
