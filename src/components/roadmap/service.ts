import { useRef, useEffect } from "react";
import createContainer from "constate";

import { Location } from "@common/types";
import { RoadmapPageContext, Capability } from "./types";

import { scrollToAnchor } from "@common/utils/index";

export interface RoadmapService extends Location {
  pageContext: RoadmapPageContext;
  capabilities: Capability[];
  isModal: boolean;
}

const RoadmapService = (input: RoadmapService) => {
  const ticketsReference = useRef(null);

  const scrollToTickets = () => {
    scrollToAnchor(ticketsReference.current)();
  };

  const sortCapabilities = () =>
    input.capabilities.sort((a, b) => {
      const orderA = a.frontmatter.displayName.toLowerCase();
      const orderB = b.frontmatter.displayName.toLowerCase();

      if (orderA > orderB) {
        return 1;
      } else if (orderA < orderB) {
        return -1;
      }
      return 0;
    });

  return {
    ...input,
    sortCapabilities,
    ticketsReference,
    scrollToTickets,
  };
};

const { Provider, Context } = createContainer(RoadmapService);
export { Provider };
export default Context;
