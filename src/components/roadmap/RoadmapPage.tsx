import React from "react";

import Grid from "@styled/Grid";

import Modal from "@components/roadmap/Modal/Modal";

import Navigation from "@components/roadmap/Navigation";

import { RoadmapPageContext, NavigationItem } from "./types";

interface RoadmapPageWrapperProps {
  navigationItems: NavigationItem[];
}

export const RoadmapPageWrapper: React.FunctionComponent<RoadmapPageWrapperProps> = ({ navigationItems, children }) => (
  <Grid.Container>
    <Grid.Row>
      <Grid.Unit df={3} md={0}>
        <Navigation items={navigationItems} />
      </Grid.Unit>
      <Grid.Unit df={9} md={12}>
        {children}
      </Grid.Unit>
    </Grid.Row>
  </Grid.Container>
);

interface RoadmapPageProps {
  pageContext: RoadmapPageContext;
}

const RoadmapPage: React.FunctionComponent<RoadmapPageProps> = ({
  pageContext: { capabilitiesNavigation },
}) => {
  return (
    <RoadmapPageWrapper navigationItems={capabilitiesNavigation}>
        
    </RoadmapPageWrapper>
  );
};

export default RoadmapPage;
