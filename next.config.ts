import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "127.0.0.1",
        protocol: "http",
        port: "8090",
        pathname: "*/**",
      },
    ],
  },
};

export default nextConfig;
