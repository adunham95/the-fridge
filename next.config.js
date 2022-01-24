const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const nextConfig = {
  reactStrictMode: true,
}

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV !== 'development'){
  module.exports = withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
  })
}
else{
  module.exports = nextConfig
}