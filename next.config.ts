import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useCache: true,
    cacheLife: {
      seconds: {
        stale: 0,
        revalidate: 10,
        expire: 15,
      },
    },
  },
};

export default nextConfig;
