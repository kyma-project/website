import { CreateNodeArgs } from "gatsby";
import {
  BLOG_POST_DIR,
  DOCS_DIR,
  ROADMAP_CAPABILITIES_DIR,
  ROADMAP_TICKETS_DIR,
  COMMUNITY_PATH_PREFIX,
} from "../../constants";

import {
  onCreateBlogPostNode,
  onCreateDocsNode,
  onCreateCommunityNode,
  onCreateRoadmapNode,
  copyAssets,
  onCreateImagesSpecNode,
  NodeType,
  CopyAssetsNode,
} from "./onCreateNode";

export const onCreateNode = async ({
  node,
  actions,
  getNode,
}: CreateNodeArgs) => {
  const { createNodeField } = actions;

  switch (node.internal.type) {
    case "MarkdownRemark": {
      if (typeof node.parent !== "string") {
        console.error("node.parent is not a string");
        return;
      }
      const nodeParent = node.parent;
      const { relativePath, absolutePath } = getNode(nodeParent);

      if (typeof relativePath !== "string") {
        console.error("relativePath is not a string");
        return;
      }

      if (relativePath.startsWith(BLOG_POST_DIR)) {
        onCreateBlogPostNode({ node, relativePath, createNodeField });
      }

      if (typeof absolutePath !== "string") {
        console.error("absolutePath is not a string");
        return;
      }

      if (relativePath.startsWith(DOCS_DIR)) {
        onCreateDocsNode({ node, relativePath, createNodeField });
        onCreateImagesSpecNode({
          node,
          absolutePath,
          createNodeField,
          nodeType: NodeType.DOCS,
        });
      }
      if (relativePath.startsWith(COMMUNITY_PATH_PREFIX)) {
        onCreateCommunityNode({ node, relativePath, createNodeField });
        onCreateImagesSpecNode({
          node,
          absolutePath,
          createNodeField,
          nodeType: NodeType.DOCS,
        });
      }
      if (relativePath.startsWith(ROADMAP_CAPABILITIES_DIR)) {
        onCreateRoadmapNode.capability({ node, relativePath, createNodeField });
      }

      return;
    }
    case "File": {
      copyAssets(node as CopyAssetsNode);
      return;
    }
    default: {
      return;
    }
  }
};
