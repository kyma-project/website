import React from "react";
import {
  SingleRenderer,
  SingleRendererComponent,
} from "@kyma-project/documentation-component";
import { toKebabCase } from "@common/utils/toKebabCase";
import { headingPrefix } from "../render-engines/markdown/helpers";
import { types, hideTitleHeader } from "../constants";
import { StyledMarkdown, GroupHeader, DocumentHeader } from "./styled";

const Renderer: React.FunctionComponent<SingleRendererComponent> = ({
  source,
}) => {
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
  const id = toKebabCase(headingPrefix(source));

  return (
    <>
      {groupName && (
        <GroupHeader
          id={toKebabCase(groupName)}
          margin={Boolean(types.size - 1)}
        >
          {groupName}
        </GroupHeader>
      )}
      <StyledMarkdown>
        {title && <DocumentHeader id={id}>{title}</DocumentHeader>}
        {renderedContent}
      </StyledMarkdown>
    </>
  );
};

export const MarkdownSingleRenderer: SingleRenderer = {
  sourceType: ["markdown", "md"],
  component: Renderer,
};
