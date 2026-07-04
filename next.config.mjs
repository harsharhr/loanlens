/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Calculator logic is pure client/server TS — no image optimization needed for v1.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
