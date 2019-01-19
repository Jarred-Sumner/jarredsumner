const withMDX = require("@zeit/next-mdx")({
  extension: /\.mdx?$/
});

module.exports = withMDX({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  },
  pageExtensions: ["js", "jsx", "mdx"]
});
