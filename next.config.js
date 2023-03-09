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
  };
  return nextConfig;
};
