import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnjs.cloudflare.com",
        port: "",
        pathname: "/ajax/libs/leaflet/1.7.1/images/**",
        search: ""
      }
    ]
  }
}

export default nextConfig
