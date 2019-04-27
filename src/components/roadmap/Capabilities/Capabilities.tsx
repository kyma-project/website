import React from "react";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";

import Navigation from "@components/roadmap/Capabilities/Navigation";
import Content from "@components/roadmap/Capabilities/Content";

import { RoadmapPageContext, NavigationItem, Capability } from "../types";

import { Wrapper } from "./styled";

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
}) => (
  <CapabilitiesWrapper pageContext={pageContext}>
    <Content capabilities={capabilities} />
  </CapabilitiesWrapper>
);

export default Capabilities;
