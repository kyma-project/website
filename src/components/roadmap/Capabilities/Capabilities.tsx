import React from "react";

import Grid from "@styled/Grid";

import Navigation from "@components/roadmap/Capabilities/Navigation";
import Content from "@components/roadmap/Capabilities/Content";

import { NavigationItem } from "../types";

interface CapabilitiesWrapperProps {
  navigationItems: NavigationItem[];
}

export const RoadmapPageWrapper: React.FunctionComponent<CapabilitiesWrapperProps> = ({ navigationItems, children }) => (
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

interface CapabilitiesProps {
  navigationItems: NavigationItem[];
  description: string;
}

const Capabilities: React.FunctionComponent<CapabilitiesProps> = ({
  navigationItems,
  description,
}) => {
  return (
    <RoadmapPageWrapper navigationItems={navigationItems}>
      <Content description={description} />
    </RoadmapPageWrapper>
  );
};

export default Capabilities;