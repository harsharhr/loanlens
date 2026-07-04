/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Calculator logic is pure client/server TS — no image optimization needed for v1.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'loanlens-phi.vercel.app',
          },
        ],
        destination: 'https://usemecalculator.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
