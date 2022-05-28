const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { withSentryConfig } = require('@sentry/nextjs');
const { withPlugins } = require('next-compose-plugins');
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

const PWAPluginOptions = {
  pwa: {
    dest: 'public',
    runtimeCaching,
    // disable: process.env.NODE_ENV !== 'production',
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

// console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'development') {
  module.exports = withPlugins([
    [withPWA, PWAPluginOptions],
    [withSentryConfig, sentryWebpackPluginOptions],
  ]);
} else {
  module.exports = nextConfig;
}
