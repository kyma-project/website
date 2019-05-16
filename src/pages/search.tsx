import React from "react";
import { graphql } from "gatsby";

import Layout from "@components/layout/Layout";
import Search from "@components/search/Search";

import { PageContext, IntlPageContext } from "@common/types";

const IndexPage: React.FunctionComponent<PageContext<IntlPageContext>> = ({
  pageContext: { locale },
}) => (
  <Layout backToTopButton={false} locale={locale}>
    <Search />
  </Layout>
);

export default IndexPage;
