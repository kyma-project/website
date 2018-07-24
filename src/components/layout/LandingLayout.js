import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SiteMetadata from "./SiteMetadata";

const LandingLayout = ({ pageId, pageName, children }) => {
  return (
    <main className="content-layout" style={{opacity: 0, visibility: "hidden"}}>
      <SiteMetadata pageId={pageId} pageName={pageName} />
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default LandingLayout;
