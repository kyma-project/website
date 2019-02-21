const { DOCS_PATH_PREFIX, DOCS_FILENAME_REGEX } = require("../constants");

module.exports = ({ node, relativePath, createNodeField }) => {
  const match = DOCS_FILENAME_REGEX.exec(relativePath);
  const version = match[1];
  const id = match[2].split("/")[0];
  const fileName = match[3];

  let type = null;
  try {
    type = require(`../../content/docs/${version}/${id}/docs.config.json`).spec.type.toLowerCase();
  } catch (err) {
    console.error(err);
    return;
  }

  createNodeField({
    node,
    name: "docInfo",
    value: {
      id,
      type,
      version,
      fileName,
    },
  });

  const slug = `/${DOCS_PATH_PREFIX}/${version}/${type}/${id}`;
  createNodeField({
    node,
    name: "slug",
    value: slug,
  });
};
