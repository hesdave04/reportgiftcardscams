/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/state-of-scams-2026-:state",
        destination: "/state-of-scams-2026/:state",
      },
    ];
  },
};
module.exports = nextConfig;
