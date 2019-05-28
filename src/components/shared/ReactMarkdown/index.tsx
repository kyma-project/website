import React, { ReactType } from "react";
import RM, { ReactMarkdownProps, NodeType } from "react-markdown";

import parseHtml from "./parseHTML";

import * as Components from "./components";
import {
  removeBlankLinesFromTabsBlock,
  replaceAllLessThanChars,
} from "./helpers";

let globalAssetsPath = "";

type Renderers = { [key in NodeType | "parsedHtml"]: ReactType };

interface ReactMarkdownAdditionalProps {
  headingPrefix?: string;
  assetsPath?: string;
  renderedFileName?: string;
}

const ReactMarkdown: React.FunctionComponent<
  ReactMarkdownProps & ReactMarkdownAdditionalProps
> = ({
  source,
  escapeHtml = false,
  headingPrefix = "",
  assetsPath = "",
  renderedFileName = "",
}) => {
  if (assetsPath) {
    globalAssetsPath = assetsPath;
  }

  let processedSource = replaceAllLessThanChars(source);
  processedSource = removeBlankLinesFromTabsBlock(processedSource);

  const renderers: Renderers = {
    root: Components.Root,
    text: Components.Text,
    break: Components.Break,
    paragraph: Components.Paragraph,
    emphasis: Components.Emphasis,
    strong: Components.Strong,
    thematicBreak: Components.ThematicBreak,
    blockquote: Components.BlockQuote,
    delete: Components.Delete,
    link: (props: any) => (
      <Components.Link {...props} assetsPath={globalAssetsPath} />
    ),
    image: (props: any) => (
      <Components.Image
        {...props}
        assetsPath={globalAssetsPath}
        renderedFileName={renderedFileName}
      />
    ),
    linkReference: Components.LinkReference,
    imageReference: Components.ImageReference,
    table: Components.Table,
    tableHead: Components.TableHead,
    tableBody: Components.TableBody,
    tableRow: Components.TableRow,
    tableCell: Components.TableCell,
    list: Components.List,
    listItem: Components.ListItem,
    definition: Components.Definition,
    heading: (props: any) => (
      <Components.Heading {...props} headingPrefix={headingPrefix} />
    ),
    inlineCode: Components.InlineCode,
    code: Components.Code,
    html: Components.HTML,
    virtualHtml: Components.VirtualHTML,
    parsedHtml: Components.ParsedHTML,
  };

  return (
    <RM
      source={processedSource}
      escapeHtml={escapeHtml}
      renderers={renderers}
      astPlugins={[parseHtml]}
    />
  );
};

export default ReactMarkdown;
