import React from "react";

import { PageContext } from "@common/types";
import { DocsPageContext } from "@components/generic-documentation/types";
import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";

import { VersionSwitcher } from "./components";

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
    <GenericComponent
      pageContext={pageContext}
      layout={LayoutType.DOCS}
      docsVersionSwitcher={docsVersionSwitcher}
    />
  );
};

export default DocsView;
