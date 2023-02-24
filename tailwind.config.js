/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        finamiBlue: '#6453DD',
        finamiBlueSecondary: '#968BE1',
        finamiRed: '#DC4545',
        finamiRedSecondary: '#E58585',
        finamiGreen: '#00926F',
        finamiGreenSecondary: '#00BB5D',
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
