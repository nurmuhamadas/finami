/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        activeMenu: '#3547ac',
      },
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      openSans: ['OpenSans', 'sans-serif'],
      serif: ['Lora', 'serif'],
    },
  },
  plugins: [require('flowbite/plugin')],
}
