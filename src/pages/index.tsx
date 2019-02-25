import React from "react";
import { graphql } from "gatsby";

import Layout from "@components/layout/Layout";
import LandingPage from "@components/landingPage/LandingPage";

import { PageContext, IntlPageContext } from "@types";

const IndexPage: React.FunctionComponent<PageContext<IntlPageContext>> = ({
  pageContext: { locale },
}) => {
  return (
    <Layout horizontalHeaderBg={false} backToTopButton={false} locale={locale}>
      <LandingPage />
    </Layout>
  );
};

export default IndexPage;
