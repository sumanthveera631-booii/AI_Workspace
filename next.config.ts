


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "@react-three/drei",
      "recharts",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },

  reactStrictMode: true,

  compress: true,
};

export default nextConfig;