// https://unpkg.com/browse/tailwindcss@2.1.1/stubs/defaultConfig.stub.js
const fontSize = {}
Array.from({length: 30}).forEach((_, index) => {
  const key = 12 + index
  fontSize[key] = key + 'px'
})
module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.jsx', './src/**/*.js', './src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    spacing: {
      1: '8px',
      2: '12px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '48px',
    },
    extend: {
      fontSize,
      colors: {
        primary: {
          DEFAULT: '#ff0000',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
