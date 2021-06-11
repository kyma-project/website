import { PluginOptions, SourceNodesArgs } from "gatsby";

export const sourceNodes = (
  args: SourceNodesArgs,
  options: PluginOptions,
): any => {
  const { createTypes } = args.actions;
  const typeDef = `
        type MarkdownRemarkFrontmatter {
          displayName: String
          specifications: [String]
        }

        type MarkdownRemark implements Node {
            frontmatter: MarkdownRemarkFrontmatter
        }
    `;
  createTypes(typeDef);
};
