const { default: theme } = require('./styles/theme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...theme.COLOR,
      },
    },
  },
  plugins: [],
};
