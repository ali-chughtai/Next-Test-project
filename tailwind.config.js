/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'latin': ['latin', 'sans-serif'],
        'edu-hand': ['"Edu VIC WA NT Hand Pre"', 'cursive'],

      },
    },
  },
  plugins: [],
}