import React from "react";

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
}) => (
  <>
    <Overview />
    <Capabilities pageContext={pageContext} capabilities={capabilities} />
    <Tickets capabilities={capabilities} location={location} />
  </>
);

export default RoadmapPage;
