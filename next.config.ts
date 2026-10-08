import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '10.10.10.6', '192.168.100.18' , '172.16.0.220'],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

