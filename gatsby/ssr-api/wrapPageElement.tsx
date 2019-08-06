import React from "react";
import { WrapPageElementNodeArgs } from "gatsby";
import { LayoutsWrapper } from "../../src/layouts";

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementNodeArgs): any => (
  <LayoutsWrapper {...props}>{element}</LayoutsWrapper>
);
