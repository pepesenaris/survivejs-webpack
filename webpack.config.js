const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, "dist"),
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
  parts.loadJavaScript({ include: PATHS.app }),
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
  parts.generateSourceMaps({ type: "source-map" }), // https://survivejs.com/webpack/building/source-maps/#conclusion
  {
    optimization: {
      splitChunks: {
        chunks: "initial",
      },
    },
  },
  parts.clean(PATHS.build),
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
  // https://survivejs.com/webpack/loading/javascript/#enabling-presets-and-plugins-per-environment
  process.env.BABEL_ENV = mode;

  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
