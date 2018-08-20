import React from "react";
import { Switch, Route } from "react-router-dom";
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

  const pageName = "documentation";
  const renderDocs = props => (
    <Docs versions={versions} pageName={pageName} {...props} />
  );

  return (
    <Wrapper>
      <Switch>
        <Route exact path={`/${pageName}/`} render={renderDocs} />
        <Route exact path={`/${pageName}/:version/`} render={renderDocs} />
        <Route
          exact
          path={`/${pageName}/:version/:type/:id`}
          render={renderDocs}
        />
      </Switch>
    </Wrapper>
  );
};

export default DocsContainer;
