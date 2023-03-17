// const { join } = require('path');
const path = require('path');

module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    output: 'standalone',
    rewrites: () => {
      return [
        {
          source: '/api/:path*',
          destination: 'http://app:80/api/:path*', // Proxy to Backend
        },
      ];
    },
  };
  return nextConfig;
};
