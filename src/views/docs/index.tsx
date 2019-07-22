import React from "react";

import { PageContext } from "@common/types";
import { DocsPageContext } from "@components/docs/types";
import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";

const DocsView: React.FunctionComponent<PageContext<DocsPageContext>> = ({
  pageContext,
}) => <GenericComponent pageContext={pageContext} layout={LayoutType.DOCS} />;

export default DocsView;
