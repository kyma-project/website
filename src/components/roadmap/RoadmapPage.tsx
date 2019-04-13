import React from "react";

import Grid from "@styled/Grid";

import Overview from "@components/roadmap/Overview";
import Capabilities from "@components/roadmap/Capabilities/Capabilities";

import { RoadmapPageContext, NavigationItem } from "./types";

interface RoadmapPageProps {
  pageContext: RoadmapPageContext;
  description: string;
}

const RoadmapPage: React.FunctionComponent<RoadmapPageProps> = ({
  pageContext: { capabilitiesNavigation },
  description,
}) => {
  return (
    <>
      <Overview />
      <Capabilities navigationItems={capabilitiesNavigation} description={description} />
    </>
  );
};

export default RoadmapPage;
