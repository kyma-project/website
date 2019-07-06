"use strict";

require("source-map-support").install();
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
});

const { onCreateWebpackConfig } = require("./webpack");
const { createPages, onCreatePage } = require("./pages");
const { onCreateNode } = require("./nodes");

module.exports = {
  onCreateWebpackConfig,
  createPages,
  onCreateNode,
  onCreatePage,
};
