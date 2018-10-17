import React from "react";
import { Helmet } from "react-helmet";
import DocsContainer from "../components/docs/Docs.container";
import DefaultLayout from "../components/layout/DefaultLayout";
import { graphql } from "gatsby";
import compareVersions from "compare-versions";

const DocsPage = ({ data }) => {
  const edges = data.allDirectory.edges || [];
  const versions = edges
    .map(edge => edge.node.relativePath)
    .sort(compareVersions)
    .reverse();

  return (
    <DefaultLayout pageId="documentation">
      <Helmet />
      <DocsContainer latestVersion={versions[0]} versions={versions} />
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
