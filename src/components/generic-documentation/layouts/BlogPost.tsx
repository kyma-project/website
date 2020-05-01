import React from "react";
import { Content, Renderers } from "@kyma-project/documentation-component";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";

import { Navigation } from "../render-engines/markdown/navigation";
import { HeadersNavigation } from "../render-engines/markdown/headers-toc";

import { MobileNavButton } from "./components";

import {
  CommunityLayoutWrapper,
  StickyWrapperLeftNav,
  StickyWrapperRightNav,
} from "./styled";
import { MarkdownWrapper } from "../styled";

export interface BlogPostLayoutProps {
  renderers: Renderers;
  postContent: (content: React.ReactNode) => React.ReactNode;
  postSocial: React.ReactNode;
}

export const BlogPostLayout: React.FunctionComponent<BlogPostLayoutProps> = ({
  renderers,
  postContent,
  postSocial,
}) => (
  <CommunityLayoutWrapper>
    <MarkdownWrapper className="custom-markdown-styling">
      <Grid.Container className="grid-container" padding="0">
        <StickyContainer>
          <Grid.Row>
            <Grid.Unit
              df={2}
              md={0}
              className="grid-unit-navigation"
              withoutPadding={true}
            >
              <Sticky>
                {({ style }: any) => (
                  <StickyWrapperLeftNav style={{ ...style, zIndex: 200 }}>
                    {postSocial}
                  </StickyWrapperLeftNav>
                )}
              </Sticky>
            </Grid.Unit>
            <Grid.Unit
              df={8}
              md={9}
              sm={12}
              className="grid-unit-content"
              withoutPadding={true}
            >
              {postContent(<Content renderers={renderers} />)}
            </Grid.Unit>
            <Grid.Unit
              df={2}
              md={3}
              sm={0}
              className="grid-unit-toc-navigation"
              withoutPadding={true}
            >
              <Sticky>
                {({ style }: any) => (
                  <StickyWrapperRightNav style={{ ...style, zIndex: 200 }}>
                    <HeadersNavigation visibleOnScroll={true} />
                  </StickyWrapperRightNav>
                )}
              </Sticky>
              <MobileNavButton orientation="right" iconName="anchor" />
            </Grid.Unit>
          </Grid.Row>
        </StickyContainer>
      </Grid.Container>
    </MarkdownWrapper>
  </CommunityLayoutWrapper>
);
