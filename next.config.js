/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'out',
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
