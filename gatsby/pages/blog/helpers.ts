import { PostQL } from "./types";

export const getPosts = async (graphql: Function): Promise<PostQL[]> => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [fields___date] }
        filter: { fileAbsolutePath: { regex: "/blog/" } }
      ) {
        edges {
          node {
            fields {
              slug
              assetsPath
              postInfo {
                fileName
              }
            }
            frontmatter {
              title
              redirectFrom
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw new Error(result.errors);
  }

  return result.data.allMarkdownRemark.edges.map(
    (e: any) => e.node,
  ) as PostQL[];
};
