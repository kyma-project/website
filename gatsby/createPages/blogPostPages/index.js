const createSingleBlogPost = require("./singleBlogPost");

module.exports = async ({ graphql, createPage, createRedirect }) => {
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
  const posts = result.data.allMarkdownRemark.edges;

  createSingleBlogPost({ createPage, createRedirect, posts });
};
