import React from "react";
import { graphql } from "gatsby";

import RoadmapPage from "@components/roadmap/RoadmapPage";

import {
  AllMarkdownRemark,
  PageContext,
  IntlPageContext,
  Location,
} from "@common/types";
import { isInitialRenderComplete } from "@common/utils/index";
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
  const isInitialRender: boolean = isInitialRenderComplete();

  return (
    <RoadmapPage
      pageContext={pageContext}
      capabilities={edges.map(cap => cap.node)}
      location={location}
      isInitialRenderComplete={isInitialRender}
    />
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
