import { graphql } from "gatsby";

export const CapabilityFragment = graphql`
  fragment Capability on MarkdownRemark {
    rawMarkdownBody
    fields {
      slug
      type
    }
    frontmatter {
      displayName
      epicsLabels
    }
  }
`;
