const { readFileSync } = require("fs");
const { resolve } = require("path");
const { safeLoad } = require("js-yaml");

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const path = resolve(
    __dirname,
    "../../content/early-adopters/early-adopters.yml",
  );
  const file = readFileSync(path, "utf8");
  const data = safeLoad(file);
  const nodeContent = JSON.stringify(data);

  const nodeMeta = {
    id: createNodeId("early-adopters"),
    parent: null,
    children: [],
    internal: {
      type: `EarlyAdopters`,
      mediaType: `text/json`,
      content: nodeContent,
      contentDigest: createContentDigest(data),
    },
  };

  createNode({ ...data, ...nodeMeta });
};
