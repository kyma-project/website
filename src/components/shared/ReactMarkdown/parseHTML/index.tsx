import React from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import HtmlToReact from "html-to-react";
// @ts-ignore
import htmlParser from "react-markdown/plugins/html-parser";

import { tabs } from "./Tabs";

const isValidNode = (node: any) => node.type !== "script";
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

export default (headingPrefix: string) =>
  htmlParser({
    isValidNode,
    processingInstructions: [
      // Tabs processing
      tabs(headingPrefix),
      {
        // Anything else
        shouldProcessNode: (node: any) => true,
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ],
  });
