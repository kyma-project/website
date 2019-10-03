import React from "react";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";
import { useScrollSpy } from "@common/hooks";

import { Navigation } from "./Navigation";
import { CapabilityHeader } from "./CapabilityHeader";
import { CapabilityContent } from "./CapabilityContent";

import { Capability } from "@typings/roadmap";
import {
  CAPABILITIES_SCROLL_SPY_ROOT,
  CAPABILITY_SCROLL_SPY_NODE,
} from "@views/roadmap/constants";

import { Wrapper, ContentWrapper, CapabilityWrapper } from "./styled";

interface Props {
  capabilities: Capability[];
}

const CapabilitiesWrapper: React.FunctionComponent = ({ children }) => (
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

export const Capabilities: React.FunctionComponent<Props> = ({
  capabilities,
}) => {
  const scrollSpyProps = {
    nodeTypes: [CAPABILITY_SCROLL_SPY_NODE],
    rootElement: `#${CAPABILITIES_SCROLL_SPY_ROOT}`,
    offset: {
      capability: 0,
    },
  };

  const renderedcapabilities = capabilities.map(capability => (
    <CapabilityWrapper
      key={capability.frontmatter.id}
      id={capability.frontmatter.id}
      data-scrollspy-node-type={CAPABILITY_SCROLL_SPY_NODE}
    >
      <CapabilityHeader capability={capability} />
      <CapabilityContent capability={capability} />
    </CapabilityWrapper>
  ));

  return (
    <useScrollSpy.Provider {...scrollSpyProps}>
      <CapabilitiesWrapper>
        <ContentWrapper id={CAPABILITIES_SCROLL_SPY_ROOT}>
          {renderedcapabilities}
        </ContentWrapper>
      </CapabilitiesWrapper>
    </useScrollSpy.Provider>
  );
};
