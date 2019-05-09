import React from "react";
import { graphql } from "gatsby";

import { AllMarkdownRemark, PageContext, IntlPageContext } from "@common/types";
import { Post, PostPageContext } from "@components/blog/types";

import Layout from "@components/layout/Layout";
import BlogPage from "@components/blog/BlogPage";

const RoadmapIndex: React.FunctionComponent<
  AllMarkdownRemark<Post> & PageContext<IntlPageContext>
> = ({
  data: {
    allMarkdownRemark: { edges = [] },
  },
  pageContext: { locale },
}) => {
  const nodes = edges.filter(edge => !!edge.node.fields.date);

  return (
    <Layout locale={locale} pageTitle="Blog">
      <BlogPage nodes={nodes} />
    </Layout>
  );
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
