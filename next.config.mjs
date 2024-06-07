/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn-images-1.medium.com'],
    },
    eslint: {
        ignoreDuringBuilds: true,
      },
  };
  
  export default nextConfig;