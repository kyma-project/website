import React from "react";
import { graphql } from "gatsby";

import Layout from "@components/layout/Layout";
import RoadmapPage from "@components/roadmap/RoadmapPage";

import {
  MarkdownRemark,
  PageContext,
  IntlPageContext,
  Location,
} from "@common/types";
import { RoadmapPageContext, Capability } from "@components/roadmap/types";

const RoadmapPageTemplate: React.FunctionComponent<
  MarkdownRemark<Capability> &
    PageContext<IntlPageContext & RoadmapPageContext> &
    Location
> = ({
  data: {
    markdownRemark: { rawMarkdownBody, frontmatter, fields },
  },
  pageContext,
  location,
}) => (
  <Layout
    locale={pageContext.locale}
    pageTitle={`${frontmatter.displayName} - Roadmap`}
  >
    <RoadmapPage
      pageContext={pageContext}
      description={rawMarkdownBody}
      displayName={frontmatter.displayName}
      location={location}
    />
  </Layout>
);

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...Capability
    }
  }
`;

export default RoadmapPageTemplate;
