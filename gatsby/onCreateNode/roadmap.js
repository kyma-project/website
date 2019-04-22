const {
  ROADMAP_CAPABILITY_PATH_PREFIX,
  ROADMAP_TICKET_PATH_PREFIX,
  ROADMAP_CAPABILITY_FILENAME_REGEX,
} = require("../constants");

const capability = ({ node, relativePath, createNodeField }) => {
  const match = ROADMAP_CAPABILITY_FILENAME_REGEX.exec(relativePath);
  const type = match[1];

  createNodeField({
    node,
    name: "type",
    value: type,
  });

  const slug = `/${ROADMAP_CAPABILITY_PATH_PREFIX}/${type}`;
  createNodeField({
    node,
    name: "slug",
    value: slug,
  });
};

const ticket = ({ node, relativePath, createNodeField }) => {};

module.exports = { capability, ticket };
