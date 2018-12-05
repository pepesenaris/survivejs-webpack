const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
};

//  TODO: Use ErrorOverlay

const commonConfig = merge([
  {
    entry: {
      main: './src/index.js',
      main_1: './src/less/main_1.less',
      main_2: './src/less/main_2.less',
    },
  },
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
]);

const productionConfig = merge([
  parts.extractCSS({
    use: [parts.cssLoader(), parts.autoprefix()],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 10000,
      // name: "[name].[ext]",
      name: '[name].[ext]?[hash]',
    },
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
    // host: process.env.HOST || "0.0.0.0",
    // port: process.env.PORT || 1337,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
