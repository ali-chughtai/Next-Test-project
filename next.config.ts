import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For static export (if needed)
  // output: 'export',
  
  /* existing config options */
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-production-domain.com'],
    },
  },
};

export default nextConfig;
