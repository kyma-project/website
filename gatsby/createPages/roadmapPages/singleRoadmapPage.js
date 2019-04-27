const { resolve } = require("path");

const {
  generateCapabilitiesNavigation,
  generateMapOfDisplayNameToId,
} = require("./helpers");
const { ROADMAP_PATH_PREFIX } = require("../../constants");

module.exports = ({ createPage, capabilities }) => {
  const roadmapTemplate = resolve(
    __dirname,
    "../../../src/templates/Roadmap.tsx",
  );

  const capabilitiesNavigation = generateCapabilitiesNavigation(capabilities);
  const ids = generateMapOfDisplayNameToId(capabilities);

  capabilities.map(capability => {
    const path = `/${ROADMAP_PATH_PREFIX}`;

    createPage({
      path: path,
      component: roadmapTemplate,
      context: {
        capabilitiesNavigation,
        ids,
      },
    });
  });
};
