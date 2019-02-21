import React from "react";
// @ts-ignore
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";

import { DocsPageWrapper as Wrapper } from "./styled";

interface DocsPageWrapperProps {
  leftNavigation?: JSX.Element;
  content: JSX.Element;
  rightNavigation?: JSX.Element;
}

const DocsPageWrapper: React.FunctionComponent<DocsPageWrapperProps> = ({
  leftNavigation,
  content,
  rightNavigation,
}) => (
  <Wrapper>
    <Grid.Container>
      <StickyContainer>
        <Grid.Row>
          <Grid.Unit df={3} md={12}>
            <Sticky>
              {({ style }: any) => <div style={style}>{leftNavigation}</div>}
            </Sticky>
          </Grid.Unit>
          <Grid.Unit df={9} md={12}>
            {content}
          </Grid.Unit>
        </Grid.Row>
      </StickyContainer>
    </Grid.Container>
  </Wrapper>
);

export default DocsPageWrapper;
