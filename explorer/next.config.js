/** @type {import('next').NextConfig;} */
const nextConfig = {
  reactStrictMode: true,
  // Enable experimental features for better optimization
  experimental: {
    optimizeCss: true,
    // Enable more aggressive optimizations
    optimizePackageImports: [
      '@nivo/core',
      '@nivo/line',
      '@nivo/bar',
      '@nivo/pie',
      'react-icons',
      'ethers',
      '@polkadot/extension-dapp',
      '@polkadot/react-identicon',
      'swiper',
    ],
    // Enable lazy compilation for better performance
    lazyCompilation: {
      entries: false,
      imports: true,
    },
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
  webpack: (config, { isServer, dev }) => {
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

      // Enable tree shaking and module concatenation
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        concatenateModules: true,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            // Separate vendor chunks for better caching
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            // Separate large libraries
            nivo: {
              test: /[\\/]node_modules[\\/]@nivo[\\/]/,
              name: 'nivo',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            polkadot: {
              test: /[\\/]node_modules[\\/]@polkadot[\\/]/,
              name: 'polkadot',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            ethers: {
              test: /[\\/]node_modules[\\/]ethers[\\/]/,
              name: 'ethers',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            swiper: {
              test: /[\\/]node_modules[\\/]swiper[\\/]/,
              name: 'swiper',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            reactIcons: {
              test: /[\\/]node_modules[\\/]react-icons[\\/]/,
              name: 'react-icons',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            // Separate form libraries
            forms: {
              test: /[\\/]node_modules[\\/](formik|yup)[\\/]/,
              name: 'forms',
              chunks: 'all',
              priority: 15,
            },
            // Separate chart libraries
            charts: {
              test: /[\\/]node_modules[\\/](d3|@nivo)[\\/]/,
              name: 'charts',
              chunks: 'all',
              priority: 15,
            },
            // Separate utility libraries
            utils: {
              test: /[\\/]node_modules[\\/](lodash|dayjs|clsx)[\\/]/,
              name: 'utils',
              chunks: 'all',
              priority: 15,
            },
          },
        },
      }
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
