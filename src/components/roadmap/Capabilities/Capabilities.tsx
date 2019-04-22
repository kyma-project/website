import React from "react";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";

import Navigation from "@components/roadmap/Capabilities/Navigation";
import Content from "@components/roadmap/Capabilities/Content";

import { NavigationItem } from "../types";

import { Wrapper } from "./styled";

interface CapabilitiesWrapperProps {
  navigationItems: NavigationItem[];
  pathName: string;
}

export const CapabilitiesWrapper: React.FunctionComponent<
  CapabilitiesWrapperProps
> = ({ navigationItems, children, pathName }) => (
  <Wrapper>
    <Grid.Container>
      <StickyContainer>
        <Grid.Row>
          <Grid.Unit df={3} md={0} withoutPadding={true}>
            <Sticky>
              {({ style }: any) => (
                <div style={{ ...style, zIndex: 110 }}>
                  <Navigation items={navigationItems} pathName={pathName} />
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
  navigationItems: NavigationItem[];
  pathName: string;
  displayName: string;
  description: string;
}

const Capabilities: React.FunctionComponent<CapabilitiesProps> = ({
  navigationItems,
  pathName,
  displayName,
  description,
}) => (
  <CapabilitiesWrapper navigationItems={navigationItems} pathName={pathName}>
    <Content description={description} displayName={displayName} />
  </CapabilitiesWrapper>
);

export default Capabilities;
