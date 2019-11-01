import { PostGQL } from "./types";
import { GraphQLFunction } from "../../../types";

export const getPosts = async (
  graphql: GraphQLFunction,
  size?: number,
): Promise<PostGQL[]> => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [fields___date] }
        filter: { fileAbsolutePath: { regex: "/blog-posts/" } }
      ) {
        edges {
          node {
            id
            rawMarkdownBody
            excerpt(format: PLAIN)
            fields {
              slug
              assetsPath
              date(formatString: "MMMM DD, YYYY")
              postInfo {
                fileName
                year
                month
                day
              }
            }
            frontmatter {
              title
              author {
                name
              }
              tags
              type
              releaseTag
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

  const posts = result.data.allMarkdownRemark.edges
    .map((e: any) => e.node)
    .filter((node: any) => !!node.fields.date) as PostGQL[];

  return size ? posts.slice(0, size) : posts;
};
