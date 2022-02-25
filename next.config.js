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

module.exports = withPWA({
  nextConfig,
  pwa: {
    dest: 'public',
    runtimeCaching,
    customWorkerDir: 'serviceworker',
  },
});
