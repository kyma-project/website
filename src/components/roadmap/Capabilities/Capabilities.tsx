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

interface CapabilitiesWrapperProps {
  pageContext: RoadmapPageContext;
}

export const CapabilitiesWrapper: React.FunctionComponent<
  CapabilitiesWrapperProps
> = ({ pageContext, children }) => (
  <Wrapper>
    <Grid.Container>
      <StickyContainer>
        <Grid.Row>
          <Grid.Unit df={3} md={0} withoutPadding={true}>
            <Sticky>
              {({ style }: any) => (
                <div style={{ ...style, zIndex: 110 }}>
                  <Navigation pageContext={pageContext} />
                </div>
              )}
            </Sticky>
          </Grid.Unit>
          <Grid.Unit df={9} md={12}>
            {children}
          </Grid.Unit>
        </Grid.Row>
      </StickyContainer>
    </Grid.Container>
  </Wrapper>
);

interface CapabilitiesProps {
  pageContext: RoadmapPageContext;
  capabilities: Capability[];
}

const Capabilities: React.FunctionComponent<CapabilitiesProps> = ({
  pageContext,
  capabilities,
}) => {
  const scrollSpyProps = {
    nodeTypes: [CAPABILITY_SCROLL_SPY_NODE],
    rootElement: `#${CAPABILITIES_SCROLL_SPY_ROOT}`,
    offset: {
      capability: 0,
    },
  };

  return (
    <ScrollSpy.Provider {...scrollSpyProps}>
      <CapabilitiesWrapper pageContext={pageContext}>
        <Content capabilities={capabilities} />
      </CapabilitiesWrapper>
    </ScrollSpy.Provider>
  );
};

export default Capabilities;
