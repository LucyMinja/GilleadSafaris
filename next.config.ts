import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '10.10.10.13', '192.168.100.18'],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

