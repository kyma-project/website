import { PostGQL } from "./types";
import { GraphQLFunction } from "../../../types";

export const getPosts = async (
  graphql: GraphQLFunction,
): Promise<PostGQL[]> => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [fields___date] }
        filter: { fileAbsolutePath: { regex: "/blog-posts/" } }
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
  ) as PostGQL[];
};
