let theme = require('./theme/theme.js');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...theme.COLORS,
      },
      maxHeight: {
        'half-screen': '50vh',
      },
      fontSize: {
        tiny: '.65rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
