import React, { useContext } from "react";
import Tabs from "@components/shared/Tabs";
import Tab from "@components/shared/Tabs/Tab";
import { MarkdownComponent } from "@kyma-project/dc-markdown-render-engine/lib/MarkdownComponent";
import {
  MarkdownRenderEngineOptions,
  MarkdownParserPluginReturnType,
} from "@kyma-project/dc-markdown-render-engine";
import { toKebabCase } from "@common/utils/toKebabCase";
import {
  TabProvider,
  TabServiceProps,
} from "../../../../services/TabState.service";

let tabsCounter = 0;
const blockquoteRegex = /(^( *>).*?\n)/gm;
const orderedListRegex = /^( *[0-9])+.(.*)/gm;

export const tabsParserPlugin = (
  args: MarkdownRenderEngineOptions,
): MarkdownParserPluginReturnType => ({
  replaceChildren: true,
  shouldProcessNode: (node: any) =>
    node.type === "tag" &&
    node.name === "div" &&
    node.attribs &&
    node.attribs.hasOwnProperty("tabs"),
  processNode: (node: any) => {
    if (!node.children) {
      return null;
    }

    const children = node.children.map((child: any) => {
      if (child.type === "tag" && child.name === "details" && child.children) {
        return child.children.map((childDetails: any) => {
          if (
            childDetails.type === "tag" &&
            childDetails.name === "summary" &&
            childDetails.children.length === 1 &&
            childDetails.children[0].type === "text" &&
            childDetails.next &&
            childDetails.next.data
          ) {
            const label = childDetails.children[0].data;
            const source = childDetails.next.data
              .replace(
                blockquoteRegex,
                (blockquote: string) => `${blockquote}\n`,
              )
              .replace(
                orderedListRegex,
                (listElement: string) => `\n${listElement}\n`,
              );

            const kebabCasedLabel = toKebabCase(label) || "";
            const kebabCasedGroup = toKebabCase(node.attribs.name) || "";
            const tabData: TabServiceProps = {
              group: kebabCasedGroup,
              label: kebabCasedLabel,
            };

            return (
              <Tab
                key={kebabCasedLabel || `tabs-${tabsCounter}`}
                group={kebabCasedGroup}
                label={label}
              >
                <TabProvider {...tabData}>
                  <MarkdownComponent source={source} {...args} />
                </TabProvider>
              </Tab>
            );
          }
          return null;
        });
      }
    });

    return [<Tabs key={tabsCounter++}>{children}</Tabs>];
  },
});
