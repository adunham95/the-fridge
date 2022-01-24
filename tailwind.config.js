module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          '50': '#f2fbfd', 
          '100': '#e6f7fb', 
          '200': '#bfeaf5', 
          '300': '#99ddee', 
          '400': '#4dc4e2', 
          '500': '#00abd5', 
          '600': '#009ac0', 
          '700': '#0080a0', 
          '800': '#006780', 
          '900': '#005468',
      },
      },
    },
  },
  plugins: [],
}
