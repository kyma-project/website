import React from "react";
import {
  SingleRenderer,
  SingleRendererComponent,
} from "@kyma-project/documentation-component";
import { toKebabCase } from "@common/utils/toKebabCase";
import { headingPrefix } from "../render-engines/markdown/helpers";
import { StyledMarkdown, Header } from "./styled";

const Renderer: React.FunctionComponent<SingleRendererComponent> = ({
  source,
}) => {
  const renderedContent = source.data && source.data.renderedContent;
  const title =
    source.data && source.data.frontmatter && source.data.frontmatter.title;
  let type =
    source.data && source.data.frontmatter && source.data.frontmatter.type;
  const id = toKebabCase(`${headingPrefix(source)}-${title}`);

  type = type || title;
  const kebabCasedType = toKebabCase(type);

  return (
    <StyledMarkdown id={kebabCasedType}>
      {title && <Header id={id}>{title}</Header>}
      {renderedContent}
    </StyledMarkdown>
  );
};

export const MarkdownSingleRenderer: SingleRenderer = {
  sourceType: ["markdown", "md"],
  component: Renderer,
};
