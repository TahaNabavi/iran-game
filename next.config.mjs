/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    // domains: ["*","lh3.googleusercontent.com", "shared.akamai.steamstatic.com","community.akamai.steamstatic.com"],
  },
  typescript:{
    ignoreBuildErrors:true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
