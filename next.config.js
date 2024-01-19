/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "backend-kappa-eight-71.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
