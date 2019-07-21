import React from "react";
import { graphql } from "gatsby";

import { AllMarkdownRemark } from "@common/types";
import { Post } from "@components/blog/types";

import BlogPage from "@components/blog/BlogPage";

const RoadmapIndex: React.FunctionComponent<AllMarkdownRemark<Post>> = ({
  data: {
    allMarkdownRemark: { edges = [] },
  },
}) => {
  const nodes = edges.filter(edge => !!edge.node.fields.date);

  return <BlogPage nodes={nodes} />;
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
      edges {
        node {
          ...BlogPost
        }
      }
    }
  }
`;

export default RoadmapIndex;
