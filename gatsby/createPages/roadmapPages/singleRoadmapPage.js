const { resolve } = require("path");

const { generateCapabilitiesNavigation } = require("./helpers");

module.exports = ({ createPage, capabilities }) => {
  const singleRoadmapTemplate = resolve(
    __dirname,
    "../../../src/templates/Roadmap.tsx",
  );

  const capabilitiesNavigation = generateCapabilitiesNavigation(capabilities);

  capabilities.map(capability => {
    const slug = capability.node.fields.slug;

    createPage({
      path: slug,
      component: singleRoadmapTemplate,
      context: {
        slug,
        capabilitiesNavigation,
      },
    });
  });
};
