import React from "react";
import { WrapRootElementNodeArgs } from "gatsby";
import { RootWrapper } from "../../src/root";

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs): any => (
  <RootWrapper>{element}</RootWrapper>
);
