import type { NextConfig } from "next";

/**@type {import('next').NextConfig}*/

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'res,cloudinary.com',
      }
    ]

  }
};

export default nextConfig;
