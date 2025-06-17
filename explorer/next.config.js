/** @type {import('next').NextConfig;} */
const nextConfig = {
  reactStrictMode: true,
  // Enable experimental features for better optimization
  experimental: {
    optimizeCss: true,
  },
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'docs.autonomys.xyz',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'gateway.autonomys.xyz',
        port: '',
        pathname: '/file/**',
      },
    ],
  },
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // SVG loader
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })

    // GraphQL loader
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    return config
  },
  // Bundle analyzer (only in production builds)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer')({
          enabled: true,
        }))(),
      )
      return config
    },
  }),
}

module.exports = nextConfig
