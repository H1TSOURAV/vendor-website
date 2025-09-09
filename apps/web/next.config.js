/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  env: {
    GATEWAY_URL: process.env.GATEWAY_URL || 'http://localhost:4000'
  }
};
module.exports = nextConfig;
