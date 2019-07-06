"use strict";

require("source-map-support").install();
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
});

const { config } = require("./config");
const { onCreateWebpackConfig } = require("./webpack");
const { createPages, onCreatePage } = require("./pages");
const { onCreateNode } = require("./nodes");

module.exports = {
  config,
  onCreateWebpackConfig,
  createPages,
  onCreateNode,
  onCreatePage,
};
