/** @type {import('next').NextConfig;} */
const nextConfig = {
  reactStrictMode: true,
  // Enable experimental features for better optimization
  experimental: {
    optimizeCss: true,
    // Add modern optimizations
    optimizePackageImports: [
      '@polkadot/api',
      '@polkadot/util-crypto',
      '@nivo/core',
      '@nivo/line',
      '@nivo/bar',
      'swagger-ui-react',
      'lottie-web',
    ],
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
      // Add chunk optimization
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            polkadot: {
              test: /[\\/]node_modules[\\/](@polkadot)[\\/]/,
              name: 'polkadot-lib',
              priority: 10,
              enforce: true,
            },
            charts: {
              test: /[\\/]node_modules[\\/](@nivo)[\\/]/,
              name: 'chart-lib',
              priority: 9,
              enforce: true,
            },
            swagger: {
              test: /[\\/]node_modules[\\/](swagger-ui-react)[\\/]/,
              name: 'swagger-lib',
              priority: 8,
              enforce: true,
            },
            crypto: {
              test: /[\\/]node_modules[\\/](@polkadot\/util-crypto|@polkadot\/wasm-crypto)[\\/]/,
              name: 'crypto-lib',
              priority: 11,
              enforce: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      }
      config.resolve.fallback.fs = false
    }

    return config
  },
}

// Add bundle analyzer conditionally
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })
  module.exports = withBundleAnalyzer(nextConfig)
} else {
  module.exports = nextConfig
}
