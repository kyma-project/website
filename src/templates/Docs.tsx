import React from "react";

import Layout from "@components/layout/Layout";
import DocsPage from "@components/docs/DocsPage";

import { PageContext, IntlPageContext } from "@types";
import { Docs, DocsPageContext } from "@components/docs/types";

const DocsPageTemplate: React.FunctionComponent<
  PageContext<IntlPageContext & DocsPageContext>
> = ({ pageContext }) => {
  return (
    <Layout
      locale={pageContext.locale}
      pageTitle={`${pageContext.content.displayName} - Docs`}
    >
      <DocsPage pageContext={pageContext} />
    </Layout>
  );
};

export default DocsPageTemplate;
