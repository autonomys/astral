const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/nextjs',
  options: {
    builder: {
      useSWC: true, // Enables SWC support
    },
  },
  // core: {
  //   builder: "@storybook/builder-webpack5",
  // },
  // webpackFinal: async (config, { configType }) => {
  //   config.resolve.plugins = [
  //     new TsconfigPathsPlugin({
  //       configFile: path.resolve(__dirname, "../tsconfig.json"),
  //     }),
  //   ];

  //   return config;
  // },
}
