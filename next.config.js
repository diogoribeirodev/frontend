/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://backend-kappa-eight-71.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
