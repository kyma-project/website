import React from "react";
import { WrapRootElementBrowserArgs } from "gatsby";
import { RootWrapper } from "../../src/root";

export const wrapRootElement = ({
  element,
}: WrapRootElementBrowserArgs): React.ReactNode => (
  <RootWrapper>{element}</RootWrapper>
);
