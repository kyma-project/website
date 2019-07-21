import { GatsbyNode } from "gatsby";
import { createPages, onCreatePage } from "./pages";
import { onCreateNode } from "./nodes";
import { onCreateWebpackConfig } from "./webpack";

export const nodeAPI: GatsbyNode = {
  createPages,
  onCreatePage,
  onCreateNode,
  onCreateWebpackConfig,
};
