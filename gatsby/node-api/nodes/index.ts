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
  onCreateImagesAspectRatioNode,
  NodeType,
  copyAssets,
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
      const { relativePath, absolutePath } = getNode(node.parent);

      if (relativePath.startsWith(BLOG_POST_DIR)) {
        onCreateBlogPostNode({ node, relativePath, createNodeField });
        onCreateImagesAspectRatioNode({
          node,
          absolutePath,
          createNodeField,
          nodeType: NodeType.BLOG,
        });
      }
      if (relativePath.startsWith(DOCS_DIR)) {
        onCreateDocsNode({ node, relativePath, createNodeField });
        onCreateImagesAspectRatioNode({
          node,
          absolutePath,
          createNodeField,
          nodeType: NodeType.DOCS,
        });
      }
      if (relativePath.startsWith(COMMUNITY_PATH_PREFIX)) {
        onCreateCommunityNode({ node, relativePath, createNodeField });
        onCreateImagesAspectRatioNode({
          node,
          absolutePath,
          createNodeField,
          nodeType: NodeType.COMMUNITY,
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
