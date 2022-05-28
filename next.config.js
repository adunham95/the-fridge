const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { withSentryConfig } = require('@sentry/nextjs');
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

const sentryWebpackPluginOptions = {
  silent: true,
};

// console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'development') {
  module.exports = withSentryConfig(
    withPWA({
      nextConfig,
      pwa: {
        dest: 'public',
        runtimeCaching,
      },
    }),
    sentryWebpackPluginOptions,
  );
} else {
  module.exports = nextConfig;
}
