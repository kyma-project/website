import { GatsbyNode } from "gatsby";
import { createPages } from "./pages";
import { onCreateNode } from "./nodes";
import { onCreateWebpackConfig } from "./webpack";

export const nodeAPI: GatsbyNode = {
  createPages,
  onCreateNode,
  onCreateWebpackConfig,
};
