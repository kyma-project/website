import React from "react";
import { Router } from "@reach/router";
import Docs from "./Docs.component";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 30px;
`;

const DocsContainer = ({ versions = [] }) => {
  if (versions.length === 0) {
    return null;
  }

  const pageName = "docs";

  const RenderDocs = props => (
    <Docs versions={versions} pageName={pageName} {...props} />
  );

  return (
    <Wrapper>
      <Router>
        <RenderDocs path={`/${pageName}`} />
        <RenderDocs path={`/${pageName}/:version`} />
        <RenderDocs path={`/${pageName}/:version/:type/:id`} />
      </Router>
    </Wrapper>
  );
};

export default DocsContainer;
