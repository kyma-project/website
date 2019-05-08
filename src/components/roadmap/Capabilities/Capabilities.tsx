import React from "react";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";

import Navigation from "@components/roadmap/Capabilities/Navigation";
import Content from "@components/roadmap/Capabilities/Content";

import ScrollSpy from "@common/state/useScrollSpy";

import { RoadmapPageContext, NavigationItem, Capability } from "../types";

import { Wrapper } from "./styled";

import {
  CAPABILITIES_SCROLL_SPY_ROOT,
  CAPABILITY_SCROLL_SPY_NODE,
} from "@components/roadmap/constants";

export const CapabilitiesWrapper: React.FunctionComponent = ({ children }) => (
  <Wrapper>
    <Grid.Container>
      <StickyContainer>
        <Grid.Row>
          <Grid.Unit df={3} md={1} withoutPadding={true}>
            <Sticky>
              {({ style }: any) => (
                <nav style={{ ...style, zIndex: 110 }}>
                  <Navigation />
                </nav>
              )}
            </Sticky>
          </Grid.Unit>
          <Grid.Unit df={9} md={11}>
            {children}
          </Grid.Unit>
        </Grid.Row>
      </StickyContainer>
    </Grid.Container>
  </Wrapper>
);

const Capabilities: React.FunctionComponent = () => {
  const scrollSpyProps = {
    nodeTypes: [CAPABILITY_SCROLL_SPY_NODE],
    rootElement: `#${CAPABILITIES_SCROLL_SPY_ROOT}`,
    offset: {
      capability: 0,
    },
  };

  return (
    <ScrollSpy.Provider {...scrollSpyProps}>
      <CapabilitiesWrapper>
        <Content />
      </CapabilitiesWrapper>
    </ScrollSpy.Provider>
  );
};

export default Capabilities;
