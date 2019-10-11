import React from "react";
import { Content, Renderers } from "@kyma-project/documentation-component";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";
import { DocsNavigation, DocsManifest, DocsContentItem } from "@typings/docs";

import {
  Navigation,
  linkSerializer,
  activeLinkChecker,
} from "../render-engines/markdown/navigation";
import { HeadersNavigation } from "../render-engines/markdown/headers-toc";

import { MobileNavButton } from "./components";

import {
  CommunityLayoutWrapper,
  TitleHeader,
  StickyWrapperLeftNav,
  StickyWrapperRightNav,
} from "./styled";
import { MarkdownWrapper } from "../styled";

export interface CommunityLayoutProps {
  renderers: Renderers;
  navigation: DocsNavigation;
  manifest: DocsManifest;
  content: DocsContentItem;
  sourcesLength: number;
  inPreview?: boolean;
}

export const CommunityLayout: React.FunctionComponent<CommunityLayoutProps> = ({
  renderers,
  navigation,
  content: { id: topic, type, displayName },
  sourcesLength,
  inPreview,
}) => {
  const linkFn: linkSerializer = ({ group, items, id }) =>
    `/${!inPreview ? `community/` : ""}${
      items.length > 1 ? `${group}/` : ""
    }${id}`;
  const activeLinkFn: activeLinkChecker = ({ group, id }) =>
    topic === id && type === group;

  return (
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
                      <Navigation
                        navigation={navigation}
                        linkFn={linkFn}
                        activeLinkFn={activeLinkFn}
                      />
                    </StickyWrapperLeftNav>
                  )}
                </Sticky>
                <MobileNavButton />
              </Grid.Unit>
              <Grid.Unit
                df={8}
                md={9}
                sm={12}
                className="grid-unit-content"
                withoutPadding={true}
              >
                <TitleHeader marginBottom={sourcesLength === 1}>
                  {displayName}
                </TitleHeader>
                <Content renderers={renderers} />
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
                      <HeadersNavigation />
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
};
