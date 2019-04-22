const { resolve } = require("path");

const {
  generateCapabilitiesNavigation,
  generateMapOfDisplayNameToId,
} = require("./helpers");
const { ROADMAP_CAPABILITY_PATH_PREFIX } = require("../../constants");

module.exports = ({ createPage, capabilities }) => {
  const singleRoadmapTemplate = resolve(
    __dirname,
    "../../../src/templates/Roadmap.tsx",
  );

  const capabilitiesNavigation = generateCapabilitiesNavigation(capabilities);
  const ids = generateMapOfDisplayNameToId(capabilities);

  capabilities.map(capability => {
    const id = capability.node.frontmatter.id;
    const path = `/${ROADMAP_CAPABILITY_PATH_PREFIX}/${id}`;

    createPage({
      path: path,
      component: singleRoadmapTemplate,
      context: {
        id,
        capabilitiesNavigation,
        ids,
      },
    });
  });
};
