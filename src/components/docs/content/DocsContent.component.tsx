import React from "react";

import ReactMarkdown from "@components/shared/ReactMarkdown";
import H from "@components/shared/H";
import Link from "@components/shared/Link";
import Separator from "@components/shared/Separator";

import { DocsContentItem, DocsContentDocs, DocsTypesLength } from "../types";
import { tokenize } from "@common/utils";
import { DOCS_SCROLL_SPY_ROOT } from "@common/constants";

import {
  DocsContentWrapper,
  DocsContentHeader,
  DocsContentAnchor,
  DocsContentDocsWrapper,
  DocsContentDocWrapper,
  DocsContentDocHeader,
} from "./styled";

interface DocsContentProps {
  content: DocsContentItem;
  docsTypesLength: DocsTypesLength;
  assetsPath: string;
}

const DocsContent: React.FunctionComponent<DocsContentProps> = ({
  content: { docs = [], displayName },
  docsTypesLength,
  assetsPath,
}) => {
  const contentId = tokenize(displayName);
  let lastType = "";

  const generateDoc = (doc: DocsContentDocs, index: number) => {
    const type = doc.type || doc.title;
    const tokenizedType = tokenize(type);
    const hash = `${tokenizedType}-${tokenize(doc.title)}`;
    const typeHash = `${tokenizedType}-${tokenizedType}`;

    const isFirstOfType = type !== lastType;
    lastType = type;

    const typeLength = docsTypesLength[type];

    return (
      <DocsContentDocWrapper key={index}>
        <DocsContentDocHeader>
          {isFirstOfType && typeLength && (
            <DocsContentAnchor
              id={typeHash}
              data-scrollspy-node-type="groupOfDocuments"
            />
          )}
          <Link.Hash to={hash} chainIcon>
            <H
              as="h3"
              id={hash}
              data-scrollspy-node-type={
                typeLength ? "document" : "groupOfDocuments"
              }
            >
              {doc.title}
            </H>
          </Link.Hash>
        </DocsContentDocHeader>
        <ReactMarkdown
          key={index}
          source={doc.source}
          escapeHtml={false}
          headingPrefix={hash}
          assetsPath={assetsPath}
        />
      </DocsContentDocWrapper>
    );
  };

  return (
    <DocsContentWrapper id={DOCS_SCROLL_SPY_ROOT}>
      <DocsContentHeader>
        <H as="h2">{displayName}</H>
      </DocsContentHeader>
      <DocsContentDocsWrapper>
        {docs.map((doc, index) => generateDoc(doc, index))}
      </DocsContentDocsWrapper>
    </DocsContentWrapper>
  );
};

export default DocsContent;
