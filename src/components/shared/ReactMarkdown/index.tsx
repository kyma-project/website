import React, { ElementType } from "react";
import RM, { ReactMarkdownProps, NodeType } from "react-markdown";

import parseHtml from "./parseHTML";

import * as Components from "./components";
import {
  removeBlankLinesFromTabsBlock,
  replaceAllLessThanChars,
} from "./helpers";

let globalAssetsPath = "";

type Renderers = { [key in NodeType | "parsedHtml"]: ElementType };

interface ReactMarkdownAdditionalProps {
  headingPrefix?: string;
  assetsPath?: string;
  renderedFileName?: string;
  tabData?: {
    group: string;
    tab: string;
  };
}

const ReactMarkdown: React.FunctionComponent<ReactMarkdownProps &
  ReactMarkdownAdditionalProps> = ({
  source,
  escapeHtml = false,
  headingPrefix = "",
  assetsPath = "",
  renderedFileName = "",
  tabData = null,
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
      <Components.Heading
        {...props}
        headingPrefix={headingPrefix}
        tabData={tabData}
      />
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
      astPlugins={[parseHtml(headingPrefix)]}
    />
  );
};

export default ReactMarkdown;
