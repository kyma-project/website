import React from "react";

import ReactMarkdown from "@components/shared/ReactMarkdown";

const tabs = {
  replaceChildren: true,
  shouldProcessNode: (node: any) =>
    node.type === "tag" &&
    node.name === "div" &&
    node.attribs &&
    node.attribs.hasOwnProperty("tabs"),
  processNode: (node: any) =>
    node.children.map((child: any) => {
      if (child.type === "tag" && child.name === "details" && child.children) {
        return child.children.map((childDetails: any, index: number) => {
          if (
            childDetails.type === "tag" &&
            childDetails.name === "summary" &&
            childDetails.children.length === 1 &&
            childDetails.children[0].type === "text" &&
            childDetails.next.data
          ) {
            return null;

            // const summaryData = childDetails.children[0].data;
            // const markdownData = childDetails.next.data;

            // return (
            //   <div key={index}>
            //     <h3>{summaryData}</h3>
            //     <ReactMarkdown source={markdownData} />
            //   </div>
            // );
          }
        });
      }
    }),
};

export default tabs;
