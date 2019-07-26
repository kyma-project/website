import { CreateNodeArgs } from "gatsby";
import {
  BLOG_POST_DIR,
  DOCS_DIR,
  ROADMAP_CAPABILITIES_DIR,
  ROADMAP_TICKETS_DIR,
} from "../../constants";

import {
  onCreateBlogPostNode,
  onCreateDocsNode,
  onCreateRoadmapNode,
} from "./onCreateNode";

export const onCreateNode = async ({
  node,
  actions,
  getNode,
}: CreateNodeArgs) => {
  const { createNodeField } = actions;

  switch (node.internal.type) {
    case "MarkdownRemark":
      const { relativePath } = getNode(node.parent);

      if (relativePath.startsWith(BLOG_POST_DIR)) {
        onCreateBlogPostNode({ node, relativePath, createNodeField });
      }

      if (relativePath.startsWith(DOCS_DIR)) {
        onCreateDocsNode({ node, relativePath, createNodeField });
      }

      if (relativePath.startsWith(ROADMAP_CAPABILITIES_DIR)) {
        onCreateRoadmapNode.capability({ node, relativePath, createNodeField });
      }

      return;
  }
};
