"use strict";

const register = require("react-server-dom-webpack/node-register");
register();
const babelRegister = require("@babel/register");

babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [["@babel/preset-react", { runtime: "automatic" }]],
  plugins: ["@babel/transform-modules-commonjs"],
});

const path = require("path");
const express = require("express");
const { readFileSync } = require("fs");
const { build } = require("./build");

const port = 3000;
const app = express();

app.get("/", async function (req, res) {
  const html = readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    "utf8",
  );
  res.send(html);
});

app.use(express.static(path.resolve(__dirname, "../dist")));

app.listen(port, async () => {
  await build();
  console.log(`Example app listening at http://localhost:${port}`);
});
