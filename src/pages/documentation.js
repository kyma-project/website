import React from "react";
import { Helmet } from "react-helmet";
import DocsContainer from "../components/docs/Docs.container";
import DefaultLayout from "../components/layout/DefaultLayout";
import { graphql } from "gatsby";

const DocsPage = ({ data }) => {
  const edges = data.allDirectory.edges || [];
  const versions = edges
    .map(edge => edge.node.relativePath)
    .sort()
    .reverse();

  return (
    <DefaultLayout pageId="documentation">
      <Helmet />
      <DocsContainer versions={versions} />
    </DefaultLayout>
  );
};

export default DocsPage;

export const pageQuery = graphql`
  query DocsVersions {
    allDirectory(
      filter: {
        relativePath: { regex: "/^[^/]+$/" }
        sourceInstanceName: { eq: "docs" }
      }
    ) {
      edges {
        node {
          relativePath
        }
      }
    }
  }
`;
