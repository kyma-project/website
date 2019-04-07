import { graphql } from "gatsby";

export const CapabilityFragment = graphql`
  fragment Capability on MarkdownRemark {
    rawMarkdownBody
    fields {
      slug
    }
    frontmatter {
      displayName
      epicsLabels
    }
  }
`;
