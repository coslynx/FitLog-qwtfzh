/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fittrack-primary': '#4285F4', // FitTrack's brand primary color
        'fittrack-secondary': '#34A853', // FitTrack's brand secondary color
        'fittrack-tertiary': '#FBBC05', // FitTrack's brand tertiary color
        'fittrack-dark': '#202020', // A dark shade for contrast
        'fittrack-light': '#F5F5F5', // A light shade for background 
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};