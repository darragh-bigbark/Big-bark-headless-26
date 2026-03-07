import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'thebigbark.ie' },
      { protocol: 'https', hostname: 'cms.thebigbark.ie' },
      // Add your WP media hostname here if different from the main domain
    ],
  },
};

export default nextConfig;
