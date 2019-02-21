const { BLOG_POST_DIR, DOCS_DIR } = require("../constants");

const onCreateNodeBlogPost = require("./blogPost");
const onCreateNodeDocs = require("./docs");

module.exports = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  switch (node.internal.type) {
    case "MarkdownRemark":
      const { relativePath } = getNode(node.parent);

      if (relativePath.startsWith(BLOG_POST_DIR)) {
        onCreateNodeBlogPost({ node, relativePath, createNodeField });
      }

      if (relativePath.startsWith(DOCS_DIR)) {
        onCreateNodeDocs({ node, relativePath, createNodeField });
      }

      return;
  }
};
