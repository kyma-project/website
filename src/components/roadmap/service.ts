import { useRef, useEffect } from "react";
import createContainer from "constate";

import { Location } from "@common/types";
import { RoadmapPageContext, Capability } from "./types";

import { scrollToAnchor } from "@common/utils/index";

export interface RoadmapService extends Location {
  pageContext: RoadmapPageContext;
  capabilities: Capability[];
  isInitialRenderComplete: boolean;
}

const RoadmapService = (input: RoadmapService) => {
  const ticketsReference = useRef(null);

  const scrollToTickets = (): boolean => {
    const modalPathname = /roadmap\/[a-z]/;
    return (
      (modalPathname.test(input.location.pathname) ||
        Boolean(location.search)) &&
      !input.isInitialRenderComplete
    );
  };

  const scrollToTicketsReference = ({
    timeout,
    smooth = true,
  }: {
    timeout?: number;
    smooth?: boolean;
  }) => {
    if (ticketsReference.current) {
      scrollToAnchor({
        target: ticketsReference.current,
        timeout,
        smooth,
      })();
    }
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
    scrollToTickets,
    sortCapabilities,
    ticketsReference,
    scrollToTicketsReference,
  };
};

const { Provider, Context } = createContainer(RoadmapService);
export { Provider };
export default Context;
