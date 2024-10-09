/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [{
          hostname: "**"
        }],
    },
    async rewrites() {
    return [
      {
        source: '/txhistory',
        destination: '/txhistory/deposit',
      },
    ]
  },

};

module.exports = nextConfig;
