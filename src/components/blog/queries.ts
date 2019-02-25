import { graphql } from "gatsby";

export const PostFragment = graphql`
  fragment BlogPost on MarkdownRemark {
    id
    html
    htmlAst
    rawMarkdownBody
    excerpt(format: PLAIN)
    fields {
      slug
      date(formatString: "MMMM DD, YYYY")
    }
    frontmatter {
      title
      author {
        name
      }
      tags
      type
      releaseTag
    }
  }
`;
