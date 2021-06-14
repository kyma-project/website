import { SourceNodesArgs } from "gatsby";

export const sourceNodes = (args: SourceNodesArgs): any => {
  const { createTypes } = args.actions;
  const additionalFieldsSchema = `
      type MarkdownRemarkFrontmatter {
          displayName: String
          specifications: [String]
        }
      
      type DocInfo {
          id: String
          version: String
        }
      
      type Fields {
        docInfo: DocInfo
        slug: String
      }
        
      type MarkdownRemark implements Node {
        fields: Fields
        frontmatter: MarkdownRemarkFrontmatter
        fileAbsolutePath: String
      }`;

  createTypes(additionalFieldsSchema);
};
