import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        // pathname: '/my-bucket/**',
        search: "",
      },
      {
        protocol: "https",
        hostname: "t2fvlyekl4.ufs.sh",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
