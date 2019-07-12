import React from "react";

import Layout from "@components/layout/Layout";
import LandingPage from "@components/landingPage/LandingPage";

import { PageContext, IntlPageContext } from "@common/types";

const IndexPage: React.FunctionComponent<PageContext<IntlPageContext>> = ({
  pageContext: { locale },
}) => (
  <Layout horizontalHeaderBg={false} backToTopButton={false} locale={locale}>
    <LandingPage />
  </Layout>
);

export default IndexPage;
