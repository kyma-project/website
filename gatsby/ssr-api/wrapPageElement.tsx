import React from "react";
import { WrapPageElementNodeArgs } from "gatsby";
import { LayoutWrapper } from "../../src/layouts";

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementNodeArgs): any => (
  <LayoutWrapper {...props}>{element}</LayoutWrapper>
);
