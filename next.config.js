const { join } = require('path');

module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
      includePaths: [join(__dirname, 'styles')],
    },
    output: 'standalone',
    rewrites: ()=>{
      return [
        {
          source: '/api/:path*',
          destination: 'http://app:80/api/:path*' // Proxy to Backend
        },
      ]
    }
  };
  return nextConfig;
};
