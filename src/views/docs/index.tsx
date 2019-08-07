import React from "react";

import Grid from "@styled/Grid";
import { PageContext } from "@common/types";
import {
  DocsPageContext,
  DocsVersions,
} from "@components/generic-documentation/types";
import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";

import { VersionSwitcher } from "./components";
import { Toolbar } from "./styled";

const Wrapper: React.FunctionComponent = ({ children }) => (
  <Grid.Container padding="0">
    <Grid.Row>
      <Grid.Unit df={12}>{children}</Grid.Unit>
    </Grid.Row>
  </Grid.Container>
);

const DocsView: React.FunctionComponent<PageContext<DocsPageContext>> = ({
  pageContext,
}) => {
  const {
    version,
    versions,
    content: { id: topic, type: docsType },
  } = pageContext;

  const docsVersionSwitcher = (
    <VersionSwitcher
      version={version}
      versions={versions}
      docsType={docsType}
      topic={topic}
    />
  );

  return (
    <>
      <Toolbar>
        <Wrapper>{docsVersionSwitcher}</Wrapper>
      </Toolbar>
      <GenericComponent
        pageContext={pageContext}
        layout={LayoutType.DOCS}
        docsVersionSwitcher={docsVersionSwitcher}
      />
    </>
  );
};

export default DocsView;
