/* eslint-disable */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const removeWebpackPlugins = require("react-app-rewire-unplug");
const { TypedCssModulesPlugin } = require("typed-css-modules-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const {
  override,
  fixBabelImports,
  addLessLoader,
  addBundleVisualizer,
  addWebpackPlugin
} = require("customize-cra");

const appBuild = path.resolve("build");

const proxyFile = path.resolve(__dirname, "proxy");

const removePlugins = () => config => {
  return removeWebpackPlugins(config, config.mode, {
    pluginNames: [
      // "HtmlWebpackPlugin",
      "MiniCssExtractPlugin",
      "InlineChunkHtmlPlugin",
      "ManifestPlugin",
      "GenerateSW"
    ],
    verbose: true
  });
};

const supportMjs = () => config => {
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto"
  });

  return config;
};

const webpackConfig = () => config => {
  config.optimization.splitChunks = {};
  config.optimization.runtimeChunk = false;
  config.devServer = {
    hot: true,
    compress: true,
    host: "127.0.0.1",
    localPort: 8080,
    open: true,
    overlay: { warnings: false, errors: true },
  };
  return config;
};

module.exports = {
  webpack: override(
    webpackConfig(),
    supportMjs(),
    removePlugins(),
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      cssModules: {
        localIdentName: "[path][name]__[local]--[hash:base64:5]",
      },
      modifyVars: {
        "text-color": "#000",
        "primary-color": "#f96d00",
      },
    }),
    addBundleVisualizer({}, true),
    addWebpackPlugin(
      new TypedCssModulesPlugin({
        globPattern: "src/**/*.css",
        camelCase: "dashesOnly"
      })
    ),
    addWebpackPlugin(
      new MiniCssExtractPlugin({
        ignoreOrder: true, // Enabled to remove warnings about conflicting order
        filename: path.join(
          process.env.npm_package_name,
          "css",
          `bundle.css`
        ),
        chunkFilename: path.join(
          process.env.npm_package_name,
          "css",
          "chunks",
          "[id].[contenthash].css"
        ),
      })
    ),
    addWebpackPlugin(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/locales",
            to: path.join(process.env.npm_package_name, "locales"),
          },
        ],
      })
    )
  ),

  paths(paths) {
    // paths.proxySetup = path.join(proxyFile, "setupProxy.js");
    paths.appBuild = appBuild;
    return paths;
  }
};
