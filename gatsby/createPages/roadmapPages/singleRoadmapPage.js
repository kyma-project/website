const { resolve } = require("path");

module.exports = ({ createPage, capabilities }) => {
  const singleRoadmapTemplate = resolve(
    __dirname,
    "../../../src/templates/Roadmap.tsx",
  );

  capabilities.map(capability => {
    const slug = capability.node.fields.slug;

    createPage({
      path: slug,
      component: singleRoadmapTemplate,
      context: {
        slug,
      },
    });
  })
};
