import React from "react";
import {
  SingleRenderer,
  SingleRendererComponent,
} from "@kyma-project/documentation-component";

import Link from "@components/shared/Link";
import { toKebabCase } from "@common/utils/toKebabCase";

import { headingPrefix } from "../render-engines/markdown/helpers";
import { types } from "../constants";
import { StyledMarkdown, GroupHeader, DocumentHeader } from "./styled";

const Renderer = (
  sourcesLength: number,
  firstSourceMetadata: {
    title: string;
    type: string;
  },
): React.FunctionComponent<SingleRendererComponent> => ({ source }) => {
  const renderedContent = source.data && source.data.renderedContent;
  const title =
    source.data && source.data.frontmatter && source.data.frontmatter.title;
  const type: string =
    source.data && source.data.frontmatter && source.data.frontmatter.type;

  let groupName: string | undefined;
  if (!types.has(type)) {
    groupName = type;
    types.add(type);
  }
  const isFirstSource =
    firstSourceMetadata.title === title && firstSourceMetadata.type === type;

  const groupHeaderId = toKebabCase(`${groupName}-${groupName}`);
  let groupHeader = !isFirstSource && groupName && (
    <GroupHeader id={groupHeaderId} marginTop={Boolean(types.size - 1)}>
      <Link.Hash to={groupHeaderId} anchorIcon={true}>
        {groupName}
      </Link.Hash>
    </GroupHeader>
  );
  if (!groupHeader) {
    groupHeader = <div id={groupHeaderId} />;
  }

  const documentHeaderId = toKebabCase(headingPrefix(source));
  const documentHeader =
    title && sourcesLength > 1 ? (
      <DocumentHeader id={documentHeaderId}>
        <Link.Hash to={documentHeaderId} anchorIcon={true}>
          {title}
        </Link.Hash>
      </DocumentHeader>
    ) : null;

  return (
    <>
      {groupHeader}
      <StyledMarkdown groupName={groupName}>
        {documentHeader}
        {renderedContent}
      </StyledMarkdown>
    </>
  );
};

export const MarkdownRenderer = (
  sourcesLength: number,
  firstSourceMetadata: {
    title: string;
    type: string;
  },
): SingleRenderer => ({
  sourceType: ["markdown", "md"],
  component: Renderer(sourcesLength, firstSourceMetadata),
});
