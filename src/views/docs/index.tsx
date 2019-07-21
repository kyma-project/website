import React from "react";

import DocsPage from "@components/docs/DocsPage";

import { PageContext } from "@common/types";
import { DocsPageContext } from "@components/docs/types";
import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";

const DocsPageTemplate: React.FunctionComponent<
  PageContext<DocsPageContext>
> = ({ pageContext }) => (
  <GenericComponent pageContext={pageContext} layout={LayoutType.DOCS} />
);

export default DocsPageTemplate;
