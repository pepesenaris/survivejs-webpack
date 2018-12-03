/**
 * Provides a small function-based interface to share common configs
 * accross environments.
 * Taken from https://survivejs.com/webpack/developing/composing-configuration/
 */


exports.devServer = ({ host, port  } = {host: "0.0.0.0", port: "1337"}) => ({
    devServer: {
      stats: "errors-only",
      host, // Defaults to `localhost`
      port, // Defaults to 8080
      open: true,
      overlay: true,
    },
  });