import React from "react";
import { Content, Renderers } from "@kyma-project/documentation-component";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";
import {
  DocsNavigation,
  DocsManifest,
  DocsContentItem,
  Specification,
  DocsNavigationElement,
} from "@typings/docs";

import {
  Navigation,
  linkSerializer,
  activeLinkChecker,
  ActiveState,
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
import to from "await-to-js";

export interface DocsLayoutProps {
  renderers: Renderers;
  navigation: DocsNavigationElement[];
  manifest: DocsManifest;
  version: string;
  content: DocsContentItem;
  pagePath: string;
  basePath: string;
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
  pagePath,
  basePath,
  sourcesLength,
  specifications,
  docsVersionSwitcher,
  inPreview,
}) => {
  const linkFn: linkSerializer = path => {
    return path.join("/");
    let out = `/${!inPreview ? `docs/` : ""}${
      version ? `${version}/` : ""
    }${path.join("/")}`;

    out = path.join("/");
    // tslint:disable-next-line:no-var-before-return
    return out;
  };
  const activeLinkFn: activeLinkChecker = path => {
    const toReduce = basePath.split("/").length;
    const newPagePath = pagePath
      .split("/")
      .slice(toReduce)
      .join("/");
    path = path.slice(toReduce);

    // const slug = `${!inPreview ? `docs/` : ""}${
    //   version ? `${version}/` : ""
    // }${path.join("/")}`;
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
                        basePath={basePath}
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
                {/*TODO: Tutaj jest renderowany content yay!*/}
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
