import React from "react";

import { SlidesBanner } from "./components/SlidesBanner";
import CookiesBanner from "./components/CookiesBanner";
import BackToTop from "./components/BackToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { SlidesBannerProps } from "@typings/landingPage";
import { PreviewPageContext } from "@typings/common";

import { LayoutWrapper, Content } from "./styled";

interface DefaultLayoutProps {
  horizontalHeaderBg?: boolean;
  inDocsLayout?: boolean;
  slidesBanner?: SlidesBannerProps;
}

export const DefaultLayout: React.FunctionComponent<DefaultLayoutProps &
  PreviewPageContext> = ({
  horizontalHeaderBg = true,
  inDocsLayout = false,
  slidesBanner,
  inPreview = false,
  children,
}) => (
  <LayoutWrapper>
    {slidesBanner && <SlidesBanner {...slidesBanner} />}
    <CookiesBanner />
    <BackToTop inDocsLayout={inDocsLayout} />
    <Header horizontalBg={horizontalHeaderBg} hiddenNav={inPreview} />
    <Content>{children}</Content>
    <Footer />
  </LayoutWrapper>
);
