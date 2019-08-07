import React from "react";

import { PageContext } from "@common/types";
import { DocsPageContext } from "@components/generic-documentation/types";
import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";

const CommunityView: React.FunctionComponent<PageContext<DocsPageContext>> = ({
  pageContext,
}) => (
  <GenericComponent pageContext={pageContext} layout={LayoutType.COMMUNITY} />
);

export default CommunityView;
