const { readFileSync } = require("fs");
const { resolve } = require("path");
const { safeLoad } = require("js-yaml");

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const path = resolve(__dirname, "../../content/banner/slides.yml");
  const file = readFileSync(path, "utf8");
  const data = safeLoad(file);
  const nodeContent = JSON.stringify(data);

  const nodeMeta = {
    id: createNodeId("banner-slides"),
    parent: null,
    children: [],
    internal: {
      type: `BannerSlides`,
      mediaType: `text/json`,
      content: nodeContent,
      contentDigest: createContentDigest(data),
    },
  };

  createNode({ ...data, ...nodeMeta });
};
