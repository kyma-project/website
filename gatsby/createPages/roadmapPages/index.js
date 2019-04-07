const createSingleRoadmapPage = require("./singleRoadmapPage");

const { getCapabilities } = require("./helpers");

module.exports = async ({ graphql, createPage }) => {
  const capabilities = await getCapabilities(graphql);

  createSingleRoadmapPage({ createPage, capabilities });
};
