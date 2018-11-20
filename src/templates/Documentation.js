import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import DocsRoot from "../components/docs/DocsRoot.component";
import DefaultLayout from "../components/layout/DefaultLayout";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 30px;
`;

const Documentation = ({ pageContext = {}, location }) => {
  const { displayName } = pageContext;

  return (
    <DefaultLayout pageName={displayName}>
      <Helmet />
      <Wrapper>
        <DocsRoot {...pageContext} location={location} />
      </Wrapper>
    </DefaultLayout>
  );
};

export default Documentation;
