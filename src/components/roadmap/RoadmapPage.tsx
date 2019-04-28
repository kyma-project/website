import React, { useRef } from "react";

import Grid from "@styled/Grid";

import Overview from "@components/roadmap/Overview";
import Capabilities from "@components/roadmap/Capabilities/Capabilities";
import Tickets from "@components/roadmap/Tickets/Tickets";

import { Location } from "@common/types";
import { RoadmapPageContext, Capability, NavigationItem } from "./types";

interface RoadmapPageProps {
  pageContext: RoadmapPageContext;
  capabilities: Capability[];
  location: any;
}

const RoadmapPage: React.FunctionComponent<RoadmapPageProps> = ({
  pageContext,
  capabilities,
  location,
}) => {
  const ticketsReference = useRef(null);

  return (
    <>
      <Overview />
      <Capabilities
        pageContext={pageContext}
        capabilities={capabilities}
        ticketsReference={ticketsReference}
      />
      <div ref={ticketsReference}>
        <Tickets
          capabilities={capabilities}
          location={location}
          ticketsReference={ticketsReference}
        />
      </div>
    </>
  );
};

export default RoadmapPage;
