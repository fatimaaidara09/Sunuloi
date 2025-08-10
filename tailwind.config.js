/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adapte selon ton dossier source
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f4ea',
          100: '#c0e0c9',
          300: '#70b572',
          500: '#2e7d32',
          700: '#23592d',
          900: '#144d2c',
        },
        secondary: {
          500: '#4caf50',
          700: '#388e3c',
        },
      },
    },
  },
  plugins: [],
};
