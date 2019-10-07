import { CreateNodeArgs } from "gatsby";
import {
  ADOPTERS_DIR,
  BLOG_POST_DIR,
  DOCS_DIR,
  ROADMAP_CAPABILITIES_DIR,
  ROADMAP_TICKETS_DIR,
  COMMUNITY_PATH_PREFIX,
} from "../../constants";

import {
  onCreateAdopterNode,
  onCreateBlogPostNode,
  onCreateDocsNode,
  onCreateCommunityNode,
  onCreateRoadmapNode,
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
      const { relativePath } = getNode(node.parent);

      if (relativePath.startsWith(ADOPTERS_DIR)) {
        onCreateAdopterNode({ node, relativePath, createNodeField });
      }
      if (relativePath.startsWith(BLOG_POST_DIR)) {
        onCreateBlogPostNode({ node, relativePath, createNodeField });
      }
      if (relativePath.startsWith(DOCS_DIR)) {
        onCreateDocsNode({ node, relativePath, createNodeField });
      }
      if (relativePath.startsWith(COMMUNITY_PATH_PREFIX)) {
        onCreateCommunityNode({ node, relativePath, createNodeField });
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
