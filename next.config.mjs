/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  typescript:{
    ignoreBuildErrors:true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
