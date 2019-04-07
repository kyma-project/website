import React from "react";

import Layout from "@components/layout/Layout";
import NotFound from "@components/notFoundPage/NotFoundPage";

import { PageContext, IntlPageContext } from "@common/types";

const NotFoundPage: React.FunctionComponent<PageContext<IntlPageContext>> = ({
  pageContext: { locale },
}) => (
  <Layout
    locale={locale}
    pageTitle="404"
    horizontalHeaderBg={false}
    backToTopButton={false}
  >
    <NotFound />
  </Layout>
);

export default NotFoundPage;
