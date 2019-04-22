import React from "react";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";

import Navigation from "@components/roadmap/Capabilities/Navigation";
import Content from "@components/roadmap/Capabilities/Content";

import { RoadmapPageContext, NavigationItem } from "../types";

import { Wrapper } from "./styled";

interface CapabilitiesWrapperProps {
  pageContext: RoadmapPageContext;
  pathName: string;
  id: string;
}

export const CapabilitiesWrapper: React.FunctionComponent<
  CapabilitiesWrapperProps
> = ({ pageContext, children, pathName, id }) => (
  <Wrapper>
    <Grid.Container>
      <StickyContainer>
        <Grid.Row>
          <Grid.Unit df={3} md={0} withoutPadding={true}>
            <Sticky>
              {({ style }: any) => (
                <div style={{ ...style, zIndex: 110 }}>
                  <Navigation
                    pageContext={pageContext}
                    pathName={pathName}
                    id={id}
                  />
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
  pathName: string;
  displayName: string;
  description: string;
  id: string;
}

const Capabilities: React.FunctionComponent<CapabilitiesProps> = ({
  pageContext,
  pathName,
  displayName,
  description,
  id,
}) => (
  <CapabilitiesWrapper pageContext={pageContext} pathName={pathName} id={id}>
    <Content description={description} displayName={displayName} id={id} />
  </CapabilitiesWrapper>
);

export default Capabilities;
