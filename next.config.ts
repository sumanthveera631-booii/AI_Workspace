


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
  },

  reactStrictMode: true,

  compress: true,
};

export default nextConfig;