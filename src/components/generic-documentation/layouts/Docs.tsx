import React from "react";
import { Content, Renderers } from "@kyma-project/documentation-component";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";
import {
  DocsNavigation,
  DocsManifest,
  DocsContentItem,
  Specification,
} from "@typings/docs";

import {
  Navigation,
  linkSerializer,
  activeLinkChecker,
} from "../render-engines/markdown/navigation";
import { HeadersNavigation } from "../render-engines/markdown/headers-toc";
import { SpecificationList } from "../render-engines/markdown/specifications-list";

import { MobileNavButton } from "./components";

import { DOCS_ID } from "@common/constants";

import {
  DocsLayoutWrapper,
  TitleHeader,
  StickyWrapperLeftNav,
  StickyWrapperRightNav,
} from "./styled";
import { MarkdownWrapper } from "../styled";

export interface DocsLayoutProps {
  renderers: Renderers;
  navigation: DocsNavigation;
  manifest: DocsManifest;
  version: string;
  content: DocsContentItem;
  sourcesLength: number;
  docsVersionSwitcher: React.ReactNode;
  specifications?: Specification[];
  inPreview?: boolean;
}

export const DocsLayout: React.FunctionComponent<DocsLayoutProps> = ({
  renderers,
  navigation,
  version,
  content: { id: topic, type, displayName },
  sourcesLength,
  specifications,
  docsVersionSwitcher,
  inPreview,
}) => {
  const linkFn: linkSerializer = ({ group, id }) =>
    `/${!inPreview ? `docs/` : ""}${
      version ? `${version}/` : ""
    }${group}/${id}`;
  const activeLinkFn: activeLinkChecker = ({ group, id }) =>
    topic === id && type === group;

  return (
    <DocsLayoutWrapper>
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
                        docsVersionSwitcher={docsVersionSwitcher}
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
                id={DOCS_ID}
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
                      <HeadersNavigation>
                        <SpecificationList specifications={specifications} />
                      </HeadersNavigation>
                    </StickyWrapperRightNav>
                  )}
                </Sticky>
                <MobileNavButton orientation="right" iconName="anchor" />
              </Grid.Unit>
            </Grid.Row>
          </StickyContainer>
        </Grid.Container>
      </MarkdownWrapper>
    </DocsLayoutWrapper>
  );
};
