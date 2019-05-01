const { resolve } = require("path");

const releases = require("../../../content/roadmap/tickets.json");

const {
  generateCapabilitiesNavigation,
  generateMapOfDisplayNameToId,
} = require("./helpers");
const { ROADMAP_PATH_PREFIX } = require("../../constants");

module.exports = ({ createPage, createRedirect, capabilities }) => {
  const roadmapTemplate = resolve(
    __dirname,
    "../../../src/templates/Roadmap.tsx",
  );

  const capabilitiesNavigation = generateCapabilitiesNavigation(capabilities);
  const ids = generateMapOfDisplayNameToId(capabilities);

  Object.keys(releases).map(release => {
    const capabilities = releases[release];

    Object.keys(capabilities).map(capability => {
      const tickets = capabilities[capability];

      tickets.map(ticket => {
        const path = `/${ROADMAP_PATH_PREFIX}/${ticket.repository.name}/${
          ticket.number
        }`;

        createRedirect({
          fromPath: path,
          redirectInBrowser: true,
          toPath: `${path}/`,
        });

        createPage({
          path: `${path}/`,
          component: roadmapTemplate,
          context: {
            capabilitiesNavigation,
            ids,
            ticket,
          },
        });
      });
    });
  });
};
