import React, { useContext } from "react";
import Tabs from "@components/shared/Tabs";
import Tab from "@components/shared/Tabs/Tab";
import { MarkdownComponent } from "@kyma-project/dc-markdown-render-engine/lib/MarkdownComponent";
import {
  MarkdownRenderEngineOptions,
  MarkdownParserPluginReturnType,
} from "@kyma-project/dc-markdown-render-engine";
import { toKebabCase } from "@common/utils/toKebabCase";
import { TabProvider } from "../../../../services/TabState.service";

const TABS_PROPERTY = "tabs";
const TABS_NAME_PROPERTY = "name";
const TABS_GROUP_PROPERTY = "group";
const SUMMARY_LABEL_PROPERTY = "label";

let tabsCounter = 0;
const blockquoteRegex = /(^( *>).*?\n)/gm;
const orderedListRegex = /^( *[0-9])+.(.*)/gm;

function processTab(node: any, tabsName: string | undefined, args: any) {
  const condition: boolean =
    node.type === "tag" &&
    node.name === "summary" &&
    node.children.length === 1 &&
    node.children[0].type === "text" &&
    node.next &&
    node.next.data;

  if (!condition) {
    return null;
  }

  const label = node.children[0].data;
  let labelID: string | undefined = toKebabCase(label);
  if (node.attribs && node.attribs.hasOwnProperty(SUMMARY_LABEL_PROPERTY)) {
    labelID = toKebabCase(node.attribs[SUMMARY_LABEL_PROPERTY]);
  }

  const source = node.next.data
    .replace(blockquoteRegex, (blockquote: string) => `${blockquote}\n`)
    .replace(orderedListRegex, (listElement: string) => `\n${listElement}\n`);

  return (
    <Tab labelID={labelID as string} group={tabsName} label={label}>
      <TabProvider group={tabsName} label={labelID}>
        <MarkdownComponent source={source} {...args} />
      </TabProvider>
    </Tab>
  );
}

const processTabs = (args: any) => (node: any) => {
  if (!node.children) {
    return null;
  }

  let tabsName: string | undefined;
  if (node.attribs && node.attribs.hasOwnProperty(TABS_NAME_PROPERTY)) {
    tabsName = toKebabCase(node.attribs[TABS_NAME_PROPERTY]);
  }

  let tabsGroup: string | undefined;
  if (node.attribs && node.attribs.hasOwnProperty(TABS_GROUP_PROPERTY)) {
    tabsGroup = toKebabCase(node.attribs[TABS_GROUP_PROPERTY]);
  }

  const children = node.children.map((child: any) => {
    if (child.type === "tag" && child.name === "details" && child.children) {
      return child.children.map((childDetails: any) =>
        processTab(childDetails, tabsName, args),
      );
    }
  });

  // custom parser must return array of nodes
  // args is passed with headingPrefix and other necessary props for custom behavior on our site
  return [
    <Tabs name={tabsName} group={tabsGroup} key={tabsCounter++} {...args}>
      {children}
    </Tabs>,
  ];
};

export const tabsParserPlugin = (
  args: MarkdownRenderEngineOptions,
): MarkdownParserPluginReturnType => ({
  replaceChildren: true,
  shouldProcessNode: (node: any) =>
    node.type === "tag" &&
    node.name === "div" &&
    node.attribs &&
    node.attribs.hasOwnProperty(TABS_PROPERTY),
  processNode: processTabs(args),
});
