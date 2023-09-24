"use strict";
const path = require("path");
const rimram = require("rimraf");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");

async function build() {
  console.log("Start running webpack...");
  return new Promise((resolve, reject) => {
    const isProduction = process.env.NODE_ENV === "production";
    rimram.sync(path.resolve(__dirname, "../dist"));
    webpack(
      {
        mode: isProduction ? "production" : "development",
        devtool: isProduction ? "source-map" : "cheap-module-source-map",
        entry: [path.resolve(__dirname, "../app/_router.js")],
        output: {
          path: path.resolve(__dirname, "../dist"),
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              use: "babel-loader",
              exclude: /node_modules/,
            },
          ],
        },
        plugins: [
          new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, "./templates/index.html"),
          }),
          new ReactServerWebpackPlugin({ isServer: false }),
        ],
      },
      (err, stats) => {
        if (err) {
          console.error(err.stack || err);
          if (err.details) {
            console.error(err.details);
          }
          process.exit(1);
        }
        const info = stats.toJson();
        if (stats.hasErrors()) {
          console.log("Finished running webpack with errors.");
          info.errors.forEach((e) => console.error(e));
          process.exit(1);
        } else {
          console.log("Finished running webpack.");
          resolve();
        }
      },
    );
  });
}

exports.build = build;
