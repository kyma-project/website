import React from "react";

import DocsContent from "./DocsContent.component";

import DocsContentProcessor from "./DocsContentProcessor";

import { DocsContentItem, DocsVersions } from "../types";

interface DocsContentContainerProps {
  content: DocsContentItem;
  version: string;
  versions: DocsVersions;
  assetsPath: string;
}

const DocsContentContainer: React.FunctionComponent<
  DocsContentContainerProps
> = ({ content, version, versions, assetsPath }) => {
  if (!content) {
    return null;
  }

  const { docs } = content;
  const newContent = { ...content };

  const { docsTypesLength } = new DocsContentProcessor(docs)
    .performDocsTypesLength()
    .result();

  return (
    <DocsContent
      content={newContent}
      docsTypesLength={docsTypesLength}
      assetsPath={assetsPath}
    />
  );
};

export default DocsContentContainer;
