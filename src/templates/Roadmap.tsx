import React from "react";
import { graphql } from "gatsby";

import Layout from "@components/layout/Layout";
import RoadmapPage from "@components/roadmap/RoadmapPage";

import {
  AllMarkdownRemark,
  PageContext,
  IntlPageContext,
  Location,
} from "@common/types";
import { RoadmapPageContext, Capability } from "@components/roadmap/types";

const RoadmapPageTemplate: React.FunctionComponent<
  AllMarkdownRemark<Capability> &
    PageContext<IntlPageContext & RoadmapPageContext> &
    Location
> = ({
  data: {
    allMarkdownRemark: { edges = [] },
  },
  pageContext,
  location,
}) => {
  let isModal: boolean = false;
  if (window && (window as any).___GATSBYGRAM_INITIAL_RENDER_COMPLETE) {
    isModal = true;
  }

  return (
    <Layout locale={pageContext.locale} pageTitle="Roadmap">
      <RoadmapPage
        pageContext={pageContext}
        capabilities={edges.map(cap => cap.node)}
        location={location}
        isModal={isModal}
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/roadmap/capabilities/" } }
    ) {
      edges {
        node {
          ...Capability
        }
      }
    }
  }
`;

export default RoadmapPageTemplate;
