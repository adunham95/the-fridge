const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/admin/org/editusergroup',
        destination: '/admin/org',
        permanent: true,
      },
    ];
  },
};

// console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'development') {
  module.exports = withPWA({
    nextConfig,
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
  });
} else {
  module.exports = nextConfig;
}
