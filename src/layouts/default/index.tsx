import React from "react";

import { SlidesBanner } from "./components/SlidesBanner";
import { SlidesBannerProps } from "@typings/landingPage";
import CookiesBanner from "./components/CookiesBanner";
import BackToTop from "./components/BackToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { LayoutWrapper, Content } from "./styled";

interface DefaultLayoutProps {
  horizontalHeaderBg?: boolean;
  inDocsLayout?: boolean;
}

export const DefaultLayout: React.FunctionComponent<DefaultLayoutProps> = ({
  horizontalHeaderBg = true,
  inDocsLayout = false,
  children,
}) => (
  <LayoutWrapper>
    <SlidesBanner />
    <CookiesBanner />
    <BackToTop inDocsLayout={inDocsLayout} />
    <Header horizontalBg={horizontalHeaderBg} />
    <Content>{children}</Content>
    <Footer />
  </LayoutWrapper>
);
