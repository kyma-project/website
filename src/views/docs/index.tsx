import React from "react";

import { PageContext } from "@common/types";
import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";

import { DocsPageContext } from "@typings/docs";
import { PreviewPageContext } from "@typings/common";

import { VersionSwitcher } from "./components";

const DocsView: React.FunctionComponent<PageContext<
  DocsPageContext & PreviewPageContext
>> = ({ pageContext }) => {
  const {
    version,
    versions,
    content: { id: topic },
    repoName,
  } = pageContext;

  console.log(pageContext);

  const docsVersionSwitcher = (
    <VersionSwitcher
      version={version}
      versions={versions}
      repoName={repoName}
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
