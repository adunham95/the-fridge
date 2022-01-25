let theme = require('./theme/theme.js');
console.log(theme.COLORS);

if (process.env.NODE_ENV === 'development') {
  const colors = require('tailwindcss/colors');
  console.log(colors);
}

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
