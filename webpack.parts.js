/**
 * Provides a small function-based interface to share common configs
 * accross environments.
 * Taken from https://survivejs.com/webpack/developing/composing-configuration/
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
exports.extractCSS = ({ include, exclude, use = [ {
  loader: 'css-loader',
  options: {
    // https://survivejs.com/webpack/styling/loading/#processing-css-loader-imports
    importLoaders: 1,
  },
},
'postcss-loader'] }) => {
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

          use: [MiniCssExtractPlugin.loader, ].concat(use),
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

        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // https://survivejs.com/webpack/styling/loading/#processing-css-loader-imports
              importLoaders: 1,
            },
          },
          'postcss-loader'
        ],
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


exports.devServer = ({ host, port } = { host: '0.0.0.0', port: '1337' }) => ({
  devServer: {
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
  },
});
