import React from "react";

import Tabs from "@components/shared/Tabs";
import Tab from "@components/shared/Tabs/Tab";
import ReactMarkdown from "@components/shared/ReactMarkdown";

import { toKebabCase } from "@common/utils";

let tabsCounter = 0;
const blockquoteRegex = /(^( *>).*?\n)/gm;
const orderedListRegex = /^( *[0-9])+.(.*)/gm;

export const tabs = (headingPrefix: string) => ({
  replaceChildren: true,
  shouldProcessNode: (node: any) =>
    node.type === "tag" &&
    node.name === "div" &&
    node.attribs &&
    node.attribs.hasOwnProperty("tabs"),
  processNode: (node: any) => {
    const children = node.children.map((child: any) => {
      if (
        !(child.type === "tag" && child.name === "details" && child.children)
      ) {
        return;
      }
      return child.children.map((childDetails: any) => {
        if (
          !(
            childDetails.type === "tag" &&
            childDetails.name === "summary" &&
            childDetails.children.length === 1 &&
            childDetails.children[0].type === "text" &&
            childDetails.next &&
            childDetails.next.data
          )
        ) {
          return null;
        }
        const summary = childDetails.children[0].data;
        const source = childDetails.next.data
          .replace(blockquoteRegex, (blockquote: string) => `${blockquote}\n`)
          .replace(
            orderedListRegex,
            (listElement: string) => `\n${listElement}\n`,
          );

        const trimmedSummary = toKebabCase(summary);
        const tabData = {
          group: toKebabCase(
            node.attribs.hasOwnProperty("name") && !!node.attribs.name
              ? node.attribs.name
              : "",
          ),
          tab: trimmedSummary,
        };

        return (
          <Tab
            key={trimmedSummary}
            label={summary}
            labelID={toKebabCase(summary)}
          >
            <ReactMarkdown
              tabData={tabData}
              source={source}
              headingPrefix={headingPrefix}
            />
          </Tab>
        );
      });
    });

    return [<Tabs key={tabsCounter++}>{children}</Tabs>];
  },
});
