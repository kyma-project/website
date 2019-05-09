const createRoadmapPage = require("./roadmapPage");
const createModalPage = require("./modalPage");

const { getCapabilities } = require("./helpers");

module.exports = async ({ graphql, createPage, createRedirect }) => {
  const capabilities = await getCapabilities(graphql);

  createRoadmapPage({ createPage, createRedirect, capabilities });
  createModalPage({ createPage, createRedirect, capabilities });
};
