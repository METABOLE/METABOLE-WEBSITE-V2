import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compress: true, // Enable gzip/brotli compression for Lighthouse
  // experimental: {
  //   esmExternals: 'loose',
  // },
  serverExternalPackages: ['@sanity/client', 'sanity'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://metabole.studio/:path*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'www.metabole.studio',
          },
        ],
      },
      {
        source: '/',
        destination: '/fr',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'accept-language',
            value: '(.*fr.*)',
          },
        ],
      },
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
