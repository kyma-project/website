"use strict";

require("source-map-support").install();
require("ts-node").register();

const { configAPI } = require("./config-api");
const { nodeAPI } = require("./node-api");

module.exports = {
  configAPI,
  nodeAPI,
};
