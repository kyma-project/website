import React from "react";
import { WrapRootElementNodeArgs } from "gatsby";
import { RootWrapper } from "../../src/root";

import "../../static/css/fonts.css";
import "../../static/css/docsearch.min.css";

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs): any => (
  <RootWrapper>{element}</RootWrapper>
);
