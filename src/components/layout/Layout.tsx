import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";

import { ThemeProvider } from "@styled";
import { lightTheme } from "@styled/theme";
import GlobalStyles from "@styled/GlobalStyles";

import { GlobalState } from "@common/state";

import IntlProvider from "@common/i18n/Provider";

import SlidesBanner from "@components/layout/SlidesBanner/SlidesBanner";
import CookiesBanner from "@components/layout/CookiesBanner";
import Popup from "@components/layout/Popup";
import BackToTop from "@components/layout/BackToTop";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

import SiteMetadata from "@components/layout/SiteMetadata";

import { LayoutWrapper, Content } from "./styled";

interface LayoutProps {
  locale: string;
  pageTitle?: string;
  pageDescription?: string;
  mediaType?: string;
  horizontalHeaderBg?: boolean;
  backToTopButton?: boolean;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  locale,
  pageTitle = "",
  pageDescription = "",
  horizontalHeaderBg = true,
  children,
  backToTopButton = true,
}) => (
  <StaticQuery
    query={query}
    // tslint:disable-next-line jsx-no-lambda
    render={data => {
      const slidesProps = data.allBannerSlides.edges[0].node;

      return (
        <IntlProvider locale={locale}>
          <ThemeProvider theme={lightTheme}>
            <GlobalState>
              <GlobalStyles />
              <SiteMetadata
                pageTitle={pageTitle}
                pageDescription={pageDescription}
                siteMetadata={data.site.siteMetadata}
              />
              <LayoutWrapper>
                <ModalProvider>
                  <SlidesBanner {...slidesProps} />
                  <Popup />
                  <CookiesBanner />
                  {backToTopButton && <BackToTop />}
                  <Header horizontalBg={horizontalHeaderBg} />
                  <Content>{children}</Content>
                  <Footer />
                </ModalProvider>
              </LayoutWrapper>
            </GlobalState>
          </ThemeProvider>
        </IntlProvider>
      );
    }}
  />
);

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        twitterUsername
      }
    }
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

export default Layout;
