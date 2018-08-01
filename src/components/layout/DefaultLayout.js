import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SiteMetadata from "./SiteMetadata";
import styled from "styled-components";
import CookieMessageBanner from "../cookiee/CookieeMessageBanner";

const Wrapper = styled.main`
  width: 100%;
  margin: -60px auto 0;
  padding: 20px;
  max-width: 1200px;
`;

const DefaultLayout = ({ pageId, pageName, children }) => {
  return (
    <main
      className="content-layout"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <SiteMetadata pageId={pageId} pageName={pageName} />
      <CookieMessageBanner />
      <Header
        headerClassName="blog-header"
        logoClassName="sprite-icon--inverse"
      />
      <Wrapper>
        <div>{children}</div>
      </Wrapper>
      <Footer />
    </main>
  );
};

export default DefaultLayout;
