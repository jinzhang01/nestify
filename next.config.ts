import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // ✅ Allow Google profile pictures
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  }, 
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // ⬅️ Increase limit (adjust as needed)
    },
  },
};

export default nextConfig;
