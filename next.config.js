const images = require("remark-images");
const emoji = require("remark-emoji");
const syntaxPlugin = require("./plugins/syntax");
const syntaxJSXPlugin = require("./plugins/syntaxJSX");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const withMDX = require("@zeit/next-mdx")({
  extension: /\.mdx?$/,
  options: {
    mdPlugins: [syntaxPlugin, images, emoji],
    hastPlugins: [syntaxJSXPlugin]
  }
});

module.exports = withMDX({
  webpack: (config, { isServer, dev }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== "FriendlyErrorsWebpackPlugin"
    );

    // add it back in with custom options
    if (dev && !isServer) {
      config.plugins.push(
        new FriendlyErrorsWebpackPlugin({ clearConsole: false })
      );
    }

    return config;
  },

  pageExtensions: ["js", "jsx", "mdx"]
});
