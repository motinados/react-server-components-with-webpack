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
const React = require("react");
const { renderToPipeableStream } = require("react-server-dom-webpack/server");
const { build } = require("./build");
const ServerRoot = require("../app/page").default;

const port = 3000;
const app = express();

app.get("/", async function (req, res) {
  const html = readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    "utf8",
  );
  res.send(html);
});

app.get("/rsc/*", async function (req, res) {
  const manifest = readFileSync(
    path.resolve(__dirname, "../dist/react-client-manifest.json"),
    "utf8",
  );
  const moduleMap = JSON.parse(manifest);
  const Page = React.createElement(ServerRoot);
  const { pipe } = renderToPipeableStream(Page, moduleMap);
  pipe(res);
});

app.use(express.static(path.resolve(__dirname, "../dist")));

app.listen(port, async () => {
  await build();
  console.log(`Example app listening at http://localhost:${port}`);
});
