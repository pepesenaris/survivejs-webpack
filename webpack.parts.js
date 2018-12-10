/**
 * Provides a small function-based interface to share common configs
 * accross environments.
 * Taken from https://survivejs.com/webpack/developing/composing-configuration/
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

exports.cssLoader = () => ({
  loader: 'css-loader',
  options: {
    importLoaders: 1, // https://survivejs.com/webpack/styling/loading/#processing-css-loader-imports
  },
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  // options: {
  //   plugins: () => [require('autoprefixer')()],
  // },
});

/**
 *
 * Right now this is duplicating config... Let's see how can we evolve this.
 * I'll rather a bit of duplication for the sake of clarity
 */

/**
 *
 * https://www.npmjs.com/package/css-entry-webpack-plugin
 * Could be use to avoid generating useless scripts files for the css entries?
 */
exports.extractCSS = ({ include, exclude, use = [] }) => {
  // https://survivejs.com/webpack/styling/separating-css/#setting-up-minicssextractplugin
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [MiniCssExtractPlugin.loader].concat(use),
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ['style-loader', exports.cssLoader(), exports.autoprefix()],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});

exports.devServer = ({ host, port } = { host: '0.0.0.0', port: '1337' }) => ({
  devServer: {
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
  },
});

/**
 * Should we add svg or gif here? it's how it's done in webapp
 * Maybe gif yes, but svg uses another loader
 */
/**
 *  From https://survivejs.com/webpack/loading/images/
 * The configuration defaults to url-loader during development and uses both url-loader and file-loader
 * in production to maintain smaller bundle sizes. url-loader uses file-loader implicitly when limit is
 * set, and both have to be installed for the setup to work.
 */
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
      {
        // More options in https://survivejs.com/webpack/loading/images/#loading-svgs
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: "babel-loader",
      },
    ],
  },
});