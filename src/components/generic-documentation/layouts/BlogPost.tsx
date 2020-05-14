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
}

export const BlogPostLayout: React.FunctionComponent<BlogPostLayoutProps> = ({
  renderers,
  postContent,
}) => (
  <CommunityLayoutWrapper>
    <MarkdownWrapper className="custom-markdown-styling">
      <Grid.Container className="grid-container" padding="0">
        <StickyContainer>
          <Grid.Row>
            <Grid.Unit df={2} md={1} sm={0} withoutPadding={true} />
            <Grid.Unit
              df={8}
              md={10}
              sm={12}
              className="grid-unit-content"
              withoutPadding={true}
            >
              {postContent(<Content renderers={renderers} />)}
            </Grid.Unit>
            <Grid.Unit df={2} md={1} sm={0} withoutPadding={true} />
          </Grid.Row>
        </StickyContainer>
      </Grid.Container>
    </MarkdownWrapper>
  </CommunityLayoutWrapper>
);
