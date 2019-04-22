import React from "react";

import Grid from "@styled/Grid";

import Overview from "@components/roadmap/Overview";
import Capabilities from "@components/roadmap/Capabilities/Capabilities";
import Tickets from "@components/roadmap/Tickets/Tickets";

import { RoadmapPageContext, NavigationItem } from "./types";

interface RoadmapPageProps {
  pageContext: RoadmapPageContext;
  location: any;
  displayName: string;
  description: string;
  id: string;
}

const RoadmapPage: React.FunctionComponent<RoadmapPageProps> = ({
  pageContext,
  location,
  displayName,
  description,
  id,
}) => (
  <>
    <Overview />
    <Capabilities
      pageContext={pageContext}
      description={description}
      pathName={location.pathname}
      displayName={displayName}
      id={id}
    />
    <Tickets />
  </>
);

export default RoadmapPage;
