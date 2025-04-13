import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com"],
  },
  async rewrites() {
    return [
      {
        source: "/Uploads/:path*",
        destination: "http://localhost:4000/Uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
