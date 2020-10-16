const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const extractLESS = new MiniCssExtractPlugin("./dist/styles.css");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  watch: true,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: (modulePath) =>
          /node_modules/.test(modulePath) && !/reduxjs/.test(modulePath),
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }]],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime",
            ],
            sourceType: "unambiguous",
          },
        },
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    modules: ["./src", "node_modules"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.min.css",
      // filename: "[name].css",
      // chunkFilename: "[id].css",
      // ignoreOrder: true,
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};
