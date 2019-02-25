// @ts-ignore
import htmlParser from "react-markdown/plugins/html-parser";

import tabs from "./Tabs";

const isValidNode = (node: any) => node.type !== "script";

export default htmlParser({
  isValidNode: isValidNode,
  processingInstructions: [
    // Tabs processing
    // tabs,
  ],
});
