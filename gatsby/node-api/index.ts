import { GatsbyNode } from "gatsby";
import { createPages } from "./pages";
import { onCreateNode } from "./nodes";
import { onCreateWebpackConfig } from "./webpack";
import { sourceNodes } from "./nodes/markdown/schema";

export const nodeAPI: GatsbyNode = {
  createPages,
  onCreateNode,
  onCreateWebpackConfig,
  sourceNodes,
};
