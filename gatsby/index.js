"use strict";

require("source-map-support").install();
require("ts-node").register();

const { config } = require("./config-api");
const { onCreateWebpackConfig } = require("./webpack-api");
const { createPages, onCreatePage, onCreateNode } = require("./node-api");

module.exports = {
  config,
  onCreateWebpackConfig,
  createPages,
  onCreateNode,
  onCreatePage,
};
