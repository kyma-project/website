"use strict";

require("source-map-support").install();
require("ts-node").register();

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
