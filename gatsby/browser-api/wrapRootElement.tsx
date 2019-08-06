import React from "react";
import { WrapRootElementBrowserArgs } from "gatsby";
import { RootWrapper } from "../../src/root";

import "../../static/css/fonts.css";
import "../../static/css/docsearch.min.css";

export const wrapRootElement = ({
  element,
}: WrapRootElementBrowserArgs): React.ReactNode => (
  <RootWrapper>{element}</RootWrapper>
);
