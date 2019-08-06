import React from "react";

import Grid from "@styled/Grid";
import { PageContext } from "@common/types";
import { DocsPageContext, DocsVersions } from "@components/docs/types";
// import {
//   GenericComponent,
//   LayoutType,
// } from "@components/generic-documentation";

import { VersionSwitcher } from "./components";
import { Toolbar } from "./styled";

interface WrapperProps {
  version: string;
  versions: DocsVersions;
  docsType: string;
  topic: string;
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({
  version,
  versions,
  docsType,
  topic,
}) => (
  <Grid.Container padding="0">
    <Grid.Row>
      <Grid.Unit df={12}>
        <VersionSwitcher
          version={version}
          versions={versions}
          docsType={docsType}
          topic={topic}
        />
      </Grid.Unit>
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

  return (
    <>
      <Toolbar>
        <Wrapper
          version={version}
          versions={versions}
          docsType={docsType}
          topic={topic}
        />
      </Toolbar>
      {/* <GenericComponent pageContext={pageContext} layout={LayoutType.DOCS} /> */}
    </>
  );
};

export default DocsView;
