import React from "react";

import { PageContext } from "@typings/common";
import { RoadmapPageContext } from "@typings/roadmap";

import { Overview } from "./Overview";
import { Capabilities } from "./Capabilities";
import { Tickets } from "./Tickets";

import { useRoadmapService, useTicketsService } from "./Services";

const RoadmapView: React.FunctionComponent<PageContext<RoadmapPageContext>> = ({
  pageContext,
}) => (
  <useRoadmapService.Provider pageContext={pageContext}>
    <useTicketsService.Provider>
      <Overview />
      <Capabilities capabilities={pageContext.capabilities} />
      <Tickets />
    </useTicketsService.Provider>
  </useRoadmapService.Provider>
);

export default RoadmapView;
