import React from "react";
import { Content, Renderers } from "@kyma-project/documentation-component";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";
import { DocsNavigation, DocsManifest } from "@components/docs/types";

import {
  Navigation,
  linkSerializer,
  activeLinkChecker,
} from "../render-engines/markdown/navigation";
import { HeadersNavigation } from "../render-engines/markdown/headers-toc";
import { DocsLayoutWrapper } from "./styled";
import { MarkdownWrapper } from "../styled";

export interface DocsLayoutProps {
  renderers: Renderers;
  navigation: DocsNavigation;
  manifest: DocsManifest;
  version: string;
}

export const DocsLayout: React.FunctionComponent<DocsLayoutProps> = ({
  renderers,
  navigation,
  manifest,
  version,
}) => {
  const linkFn: linkSerializer = ({ group, items, id }) =>
    `/docs/${version ? `${version}/` : ""}${group}/${id}`;
  const activeLinkFn: activeLinkChecker = ({ group, items, id, lastItem }) => {
    if (
      (lastItem === "docs" || /^((\d\.\d)|latest|master)$/.test(lastItem)) &&
      group === "root" &&
      id === "kyma"
    ) {
      return true;
    }
    return lastItem === id;
  };

  const sortedGroup: string[] = Object.keys(navigation).sort(
    (first, second) => {
      const firstData = first.toLowerCase();
      const secondData = second.toLowerCase();

      return firstData === "root" ? -1 : secondData === "root" ? 1 : 0;
    },
  );
  const sortedNavigation: DocsNavigation = {};
  Object.keys(navigation).map(key => {
    sortedNavigation[key] = navigation[key];
  });

  return (
    <DocsLayoutWrapper>
      <MarkdownWrapper className="custom-markdown-styling">
        <Grid.Container className="grid-container" padding="0">
          <StickyContainer>
            <Grid.Row>
              <Grid.Unit
                df={2}
                sm={0}
                className="grid-unit-navigation"
                withoutPadding={true}
              >
                <Sticky>
                  {({ style }: any) => (
                    <div style={{ ...style, zIndex: 200 }}>
                      <Navigation
                        navigation={sortedNavigation}
                        linkFn={linkFn}
                        activeLinkFn={activeLinkFn}
                      />
                    </div>
                  )}
                </Sticky>
              </Grid.Unit>
              <Grid.Unit
                df={7}
                sm={12}
                className="grid-unit-content"
                withoutPadding={true}
              >
                <Content renderers={renderers} />
              </Grid.Unit>
              <Grid.Unit
                df={3}
                sm={0}
                className="grid-unit-navigation"
                withoutPadding={true}
              >
                <Sticky>
                  {({ style }: any) => (
                    <div style={{ ...style, zIndex: 200 }}>
                      <HeadersNavigation />
                    </div>
                  )}
                </Sticky>
              </Grid.Unit>
            </Grid.Row>
          </StickyContainer>
        </Grid.Container>
      </MarkdownWrapper>
    </DocsLayoutWrapper>
  );
};
