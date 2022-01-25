let theme = require('./theme/theme.js');
console.log(theme.COLORS);

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
    },
  },
  plugins: [],
};
