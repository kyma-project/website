import React from "react";

import Tabs from "@components/shared/Tabs";
import Tab from "@components/shared/Tabs/Tab";
import ReactMarkdown from "@components/shared/ReactMarkdown";

let tabsCounter = 0;

export const tabs = {
  replaceChildren: true,
  shouldProcessNode: (node: any) =>
    node.type === "tag" &&
    node.name === "div" &&
    node.attribs &&
    node.attribs.hasOwnProperty("tabs"),
  processNode: (node: any) => {
    const children = node.children.map((child: any) => {
      if (child.type === "tag" && child.name === "details" && child.children) {
        return child.children.map((childDetails: any) => {
          if (
            childDetails.type === "tag" &&
            childDetails.name === "summary" &&
            childDetails.children.length === 1 &&
            childDetails.children[0].type === "text" &&
            childDetails.next.data
          ) {
            const summary = childDetails.children[0].data;
            const tabData = childDetails.next.data;

            return (
              <Tab
                key={summary.toLowerCase().replace(" ", "-")}
                label={summary}
              >
                <ReactMarkdown source={tabData} />
              </Tab>
            );
          }
        });
      }
    });

    return [<Tabs key={tabsCounter++}>{children}</Tabs>];
  },
};
