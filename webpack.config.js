const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  devServer: {
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    //
    overlay: true,

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    // host: process.env.HOST, // Defaults to `localhost`
    // port: process.env.PORT, // Defaults to 8080
    // open: true, // Open the page in browser

    // Can be applied to webapp
    hot: true,
    inline: true,
    disableHostCheck: true,
    // host="0.0.0.0",
    // port=1337
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),
    new ErrorOverlayPlugin(),
  ],
};
