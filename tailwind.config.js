module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  mode: 'jit',
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'paper': '#f1e6d6'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
