import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SiteMetadata from "./SiteMetadata";
import styled from "styled-components";

const Wrapper = styled.main`
  width: 100%;
  margin: -60px auto 0;
  padding: 15px;
  max-width: 1200px;
`;

const DefaultLayout = ({ pageId, pageName, children }) => {
  return (
    <main className="content-layout" style={{opacity: 0, visibility: "hidden"}}>
      <SiteMetadata pageId={pageId} pageName={pageName} />
      <Header />
      <Wrapper>
        <div>{children}</div>
      </Wrapper>
      <Footer />
    </main>
  );
};

export default DefaultLayout;
