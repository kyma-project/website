import React from "react";
import { Content, Renderers } from "@kyma-project/documentation-component";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";
import {
  DocsNavigation,
  DocsManifest,
  DocsContentItem,
  DocsNavigationElement,
} from "@typings/docs";

import {
  Navigation,
  linkSerializer,
  activeLinkChecker,
  ActiveState,
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
  navigation: DocsNavigationElement[];
  manifest: DocsManifest;
  content: DocsContentItem;
  sourcesLength: number;
  inPreview?: boolean;
  basePath: string;
  pagePath: string;
}

export const CommunityLayout: React.FunctionComponent<CommunityLayoutProps> = ({
  renderers,
  navigation,
  content: { id: topic, type, displayName },
  sourcesLength,
  inPreview,
  pagePath,
  basePath,
}) => {
  const linkFn: linkSerializer = path => path.join("/");

  const activeLinkFn: activeLinkChecker = path => {
    const toReduce = basePath.split("/").length;
    const newPagePath = pagePath
      .split("/")
      .slice(toReduce)
      .join("/");
    path = path.slice(toReduce);

    const slug = path.join("/");
    if (newPagePath === slug) {
      return ActiveState.ACTIVE_DIRECT;
    }
    if (newPagePath.startsWith(slug)) {
      return ActiveState.ACTIVE_INDIRECT;
    }
    return ActiveState.INACTIVE;
  };
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
                        basePath={basePath}
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
