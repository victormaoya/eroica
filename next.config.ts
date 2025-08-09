import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client', 'prisma'],
  // Ensure Prisma generates the client during build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins]
    }
    return config
  },
}

export default nextConfig
