import { useRef, useEffect } from "react";
import { useLocation } from "react-use";
import createService from "constate";

import { RoadmapPageContext } from "@typings/roadmap";

import { scrollToAnchor, isInitialRenderComplete } from "@common/utils";

export interface RoadmapService {
  pageContext: RoadmapPageContext;
}

const RoadmapService = ({ pageContext }: RoadmapService) => {
  const { pathname, search } = useLocation();
  const ticketsReference = useRef(null);

  const scrollToTickets = (): boolean =>
    ((pathname && /roadmap\/[a-z]/.test(pathname)) || Boolean(search)) &&
    !isInitialRenderComplete();

  const scrollToTicketsReference = ({
    timeout,
    smooth = true,
  }: {
    timeout?: number;
    smooth?: boolean;
  } = {}) => {
    if (ticketsReference.current) {
      scrollToAnchor({
        target: ticketsReference.current,
        timeout,
        smooth,
      })();
    }
  };

  useEffect(() => {
    if (scrollToTickets()) {
      scrollToTicketsReference({ smooth: false });
    }
  }, []);

  return {
    ticketsReference,
    scrollToTickets,
    scrollToTicketsReference,
    pageContext,
  };
};

export const useRoadmapService = createService(RoadmapService);
