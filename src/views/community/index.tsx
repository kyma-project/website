import React from "react";

import { PageContext } from "@common/types";
import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";

import { DocsPageContext } from "@typings/docs";
import { PreviewPageContext } from "@typings/common";

const CommunityView: React.FunctionComponent<PageContext<
  DocsPageContext & PreviewPageContext
>> = ({ pageContext }) => (
  <GenericComponent pageContext={pageContext} layout={LayoutType.COMMUNITY} />
);

export default CommunityView;
