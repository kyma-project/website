import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import SlidesBanner from "./components/SlidesBanner";
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
}) => {
  const { allBannerSlides } = useStaticQuery(query);
  const slidesProps = allBannerSlides.edges[0].node;

  return (
    <LayoutWrapper>
      <SlidesBanner {...slidesProps} />
      <CookiesBanner />
      <BackToTop inDocsLayout={inDocsLayout} />
      <Header horizontalBg={horizontalHeaderBg} />
      <Content>{children}</Content>
      <Footer />
    </LayoutWrapper>
  );
};

const query = graphql`
  query DefaultLayoutQuery {
    allBannerSlides {
      edges {
        node {
          bannerDuration
          slides {
            text
            url
            startDate
            endDate
          }
        }
      }
    }
  }
`;
